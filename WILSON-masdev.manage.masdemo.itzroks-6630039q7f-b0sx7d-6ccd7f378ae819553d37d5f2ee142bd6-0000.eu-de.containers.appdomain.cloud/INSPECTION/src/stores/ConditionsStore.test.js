/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */


import conditionsStore, {Store} from './ConditionsStore';
import Condition from './Condition';

const getConditionTemplate = ({
  srcfield = '001',
  tgtfield = '002',
  srctxtresponse = 'somefoo',
  visible = true,
  required = false
} = {}) => ({
  srcfield: srcfield,
  tgtfield: tgtfield,
  srctxtresponse: srctxtresponse,
  visible: visible,
  required: required
});

const getConditionNumericTemplate = ({
  srcfield = '001',
  tgtfield = '002',
  srcnumresponse = 1,
  number1 = 0,
  visible = true,
  required = false,
  showmessage = false,
  inspectorfeedback = 'message',
  operator1 = '=',
  requireaction = false
} = {}) => ({
  srcfield: srcfield,
  tgtfield: tgtfield,
  srcnumresponse: srcnumresponse,
  visible: visible,
  required: required,
  showmessage: showmessage,
  inspectorfeedback: inspectorfeedback,
  operator1: operator1,
  number1: number1,
  requireaction: requireaction
});

const generateConditions = (amount = 5) => {
  const array = [];
  for (let i = 1; i <= amount; i++) {
    array.push(
      getConditionTemplate({srcfield: String(i), tgtfield: String(i + 1)})
    );
  }
  return array;
};

describe('test class', () => {
  let myStore;
  beforeEach(() => {
    myStore = new Store([]);
  });

  it('should initialize without parameters', () => {
    myStore.initiate();
    myStore.updateConditionsResponse();
    expect(myStore.getAll().length).toEqual(0);
  });

  it('should not accept single condition', () => {
    myStore.initiate('a');
    expect(myStore.getAll().length).toEqual(0);
  });

  it('should combine conditions with responses on initialization', () => {
    const field = {
      inspfieldnum: '001',
      visible: true
    };

    const condition = getConditionTemplate({
      srcfield: '001',
      tgtfield: '002',
      srctxtresponse: 'bar',
      visible: true,
      required: false
    });

    const response = {
      inspfieldnum: '001',
      txtresponse: 'bar'
    };

    myStore.initiate([condition], [response]);
    myStore.storeDefaults(field, ()=> true);

    const conditions = myStore.getAll();
    expect(conditions.length).toEqual(1);
    expect(conditions[0].active).toEqual(true);
  });

  it('condition instance can be stringified', () => {
    const cond1 = new Condition({
      srcfield: '001',
      tgtfield: '002',
      srctxtresponse: 'matchingResponse'
    });
    expect(cond1.toString()).toContain('matchingResponse');

    const cond2 = new Condition({
      srcfield: '002',
      tgtfield: '003',
      srctxtresponse: 'a'
    });
    cond2.currentResponse = 'a';
    cond2.srcVisibility = true;
    cond2.validateFunction = ()=> true;
    expect(cond2.active).toEqual(true);
    expect(cond2.toString()).toContain('is active');
  });
});

describe('use applyMutation', () => {
  it('should apply mutation of attributes registered', () => {
    const field = {};
    Store.applyMutation(field, {visible: true, someOtherAttribute: false});
    expect(field).toHaveProperty('visible', true);
    expect(field).not.toHaveProperty('someOtherAttribute');
  });

  it('should not throw error when no parameter provided', () => {
    expect(() => {
      Store.applyMutation();
    }).not.toThrow();
  });
});

it('should be instance of conditionsStore class', () => {
  expect(conditionsStore instanceof Store).toEqual(true);
});

it('should store conditions', () => {
  const rawConditions = generateConditions(2);
  conditionsStore.initiate(rawConditions);
  const conditions = conditionsStore.getAll();
  expect(conditions.length).toEqual(2);
  expect(conditions[0] instanceof Condition).toEqual(true);
});

it('should store default values of registered attributes', () => {
  conditionsStore.storeDefaults({visible: false, required: false});
  expect(conditionsStore.fieldDefaults.size).toEqual(0);
  const validField = {inspfieldnum: '1', visible: true};
  conditionsStore.storeDefaults(validField);
  expect(conditionsStore.fieldDefaults.size).toEqual(1);
  conditionsStore.getDefaults(validField.inspfieldnum);
});

it('should not throw error when field is not provided to store defaults', () => {
  expect(() => conditionsStore.storeDefaults()).not.toThrow();
});

it('should update response on conditions', () => {
  const field = {inspfieldnum: '2', visible: false};
  conditionsStore.storeDefaults(field, () => true);
  conditionsStore.updateResponse('1', 'somefoo');
  const conditionsBySource = conditionsStore.getAffectedBy('1');
  conditionsBySource[0].validateFunction =  () => true;
  expect(conditionsBySource.length).toEqual(1);
  expect(conditionsBySource[0].hasMatchingResponse).toEqual(true);
  expect(conditionsBySource[0].active).toEqual(true);
});

it('should apply conditions against field', () => {
  const field = {inspfieldnum: '2', visible: false};
  conditionsStore.processConditions(field);
  expect(field).toHaveProperty('visible', true);
});

it('should return null when field is not provided to process condition', () => {
  const mutation = conditionsStore.processConditions();
  expect(mutation).toEqual(null);
});

it('should apply defaults against field', () => {
  const field = {inspfieldnum: '2', visible: false};
  conditionsStore.storeDefaults(field);

  conditionsStore.updateResponse('1', '');
  field.visible = true;
  conditionsStore.processConditions(field);
  expect(field).toHaveProperty('visible', false);
});

it('should update response properly when switching conditionals', () => {
  //generate conditions
  const rawConditions = generateConditions(2);

  //add a condition to have two src conditional for the same tgtfield
  rawConditions.push(
    getConditionTemplate({
      srcfield: '1',
      tgtfield: '2',
      srctxtresponse: 'somefoo2',
      visible: true,
      required: true
    })
  );
  conditionsStore.initiate(rawConditions);

  //store defaults for both fields
  const field1 = {inspfieldnum: '1', visible: true};
  conditionsStore.storeDefaults(field1, ()=> true);
  const field2 = {inspfieldnum: '2', visible: false};
  conditionsStore.storeDefaults(field2, ()=> true);

  //match first conditional
  conditionsStore.updateResponse('1', 'somefoo');

  //match the second conditional
  conditionsStore.updateResponse('1', 'somefoo2');

  //check the targets conditional for field2
  const conditionsByTgt = conditionsStore.getAffects('2');

  expect(conditionsByTgt.length).toEqual(2);
  //first conditional should be not active
  //second conditional should be active
  expect(conditionsByTgt[0].hasMatchingResponse).toEqual(false);
  expect(conditionsByTgt[1].hasMatchingResponse).toEqual(true);
  expect(conditionsByTgt[0].active).toEqual(false);
  expect(conditionsByTgt[1].active).toEqual(true);
});
describe('use checkSideEffect', () => {
  it('should return payload with required changes from conditions - with feedback', () => {
    //generate conditions
    const rawConditions = [];

    //add a condition to have two src conditional for the same tgtfield
    rawConditions.push(
      getConditionNumericTemplate({
        srcfield: '1',
        tgtfield: '2',
        srcnumresponse: 0,
        visible: true,
        required: true,
        showmessage: 'true',
        inspectorfeedback: 'feedback'
      })
    );
    conditionsStore.initiate(rawConditions);
    let payload = null;
    //store defaults for both fields
    const field1 = {inspfieldnum: '1', visible: true};
    conditionsStore.storeDefaults(field1);
    const field2 = {inspfieldnum: '2', visible: false};
    conditionsStore.storeDefaults(field2);

    //match the second conditional
    payload = conditionsStore.checkSideEffect('1', 0);

    let conditionsByTgt = conditionsStore.getAffects('2');
    expect(payload).toEqual({
      1: {isSrc: true, message: ['feedback'], alerts: []}
    });
    expect(conditionsByTgt.length).toEqual(1);
    //first conditional should be active
    expect(conditionsByTgt[0].hasMatchingResponse).toEqual(true);
    expect(conditionsByTgt[0].active).toEqual(true);

    //match the second conditional
    payload = conditionsStore.checkSideEffect('1', 300);
    conditionsByTgt = conditionsStore.getAffects('2');

    expect(payload).toEqual({1: {isSrc: true, message: [], alerts: []}});
  });

  it('should return payload with required changes from conditions - with requireaction', () => {
    //generate conditions
    const rawConditions = [];
    let payload = null;

    //add a condition to have two src conditional for the same tgtfield
    rawConditions.push(
      getConditionNumericTemplate({
        srcfield: '1',
        tgtfield: '2',
        srcnumresponse: 0,
        visible: true,
        required: true,
        requireaction: true
      })
    );
    conditionsStore.initiate(rawConditions);

    //store defaults for both fields
    const field1 = {inspfieldnum: '1', visible: true};
    conditionsStore.storeDefaults(field1);
    const field2 = {inspfieldnum: '2', visible: false};
    conditionsStore.storeDefaults(field2);

    //match the second conditional
    payload = conditionsStore.checkSideEffect('1', 0);

    let conditionsByTgt = conditionsStore.getAffects('2');
    expect(payload).toEqual({
      1: {isSrc: true, requireaction: true, message: [], alerts: []}
    });
    expect(conditionsByTgt.length).toEqual(1);
    //first conditional should be active
    expect(conditionsByTgt[0].hasMatchingResponse).toEqual(true);
    expect(conditionsByTgt[0].active).toEqual(true);

    //match the second conditional
    payload = conditionsStore.checkSideEffect('1', 300);
    expect(payload).toEqual({
      1: {isSrc: true, requireaction: false, message: [], alerts: []}
    });
  });

  it('should return payload with required changes from conditions - with feedback and requireaction', () => {
    //generate conditions
    const rawConditions = [];
    let payload = null;

    //add a condition to have two src conditional for the same tgtfield
    rawConditions.push(
      getConditionNumericTemplate({
        srcfield: '1',
        tgtfield: '2',
        srcnumresponse: 0,
        operator1: '>',
        number1: 1,
        visible: true,
        required: true,
        showmessage: 'true',
        inspectorfeedback: 'feedback',
        requireaction: true
      })
    );

    rawConditions.push(
      getConditionNumericTemplate({
        srcfield: '1',
        tgtfield: '3',
        srcnumresponse: 0,
        operator1: '>',
        number1: 2,
        visible: true,
        required: true,
        showmessage: 'true',
        inspectorfeedback: 'feedback2'
      })
    );
    conditionsStore.initiate(rawConditions);

    //store defaults for both fields
    const field1 = {inspfieldnum: '1', visible: true, required: false};
    conditionsStore.storeDefaults(field1);
    const field2 = {inspfieldnum: '2', visible: false, required: false};
    conditionsStore.storeDefaults(field2);
    const field3 = {inspfieldnum: '3', visible: false, required: false};
    conditionsStore.storeDefaults(field3);

    //match the second conditional
    payload = conditionsStore.checkSideEffect('1', 3);

    expect(payload).toEqual({
      1: {
        isSrc: true,
        message: ['feedback', 'feedback2'],
        alerts: [],
        requireaction: true
      }
    });

    let conditionsByTgt = conditionsStore.getAffects('2');
    expect(conditionsByTgt.length).toEqual(1);
    //first conditional should be active
    expect(conditionsByTgt[0].hasMatchingResponse).toEqual(true);
    expect(conditionsByTgt[0].active).toEqual(true);
  });
});

describe('Test Multiple choice', () => {
  it('should prevail required attribute over visibility if condition (required) is active', () => {
    let conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'visible',
        visible: true,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'required',
        visible: true,
        required: true
      })
    ];

    let selectedOptions = ['visible', 'invisible', 'required'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
      condition.validateFunction =  () => true;
    }

    let result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(true);
  });

  it('should not prevail required attribute over visibility if condition (required) is inactive', () => {
    let conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'visible',
        visible: true,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'required',
        visible: true,
        required: true
      })
    ];

    let selectedOptions = ['visible', 'invisible', 'required'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
      condition.validateFunction =  () => true;
    }

    conditions[2].isSrcVisible = false;
    let result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(false);
    expect(result.attributesModifiers.visible).toEqual(true);
  });

  it('should prevail visible option over inivisible  if condition (visible) is active', () => {
    let conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'visible',
        visible: true,
        required: false
      })
    ];

    let selectedOptions = ['visible', 'invisible'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
      condition.validateFunction =  () => true;
    }

    let result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(false);
    expect(result.attributesModifiers.visible).toEqual(true);
  });

  it('should prevail inivisible option over visible if condition (visible) is inactive', () => {
    let conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'visible',
        visible: true,
        required: false
      })
    ];

    let selectedOptions = ['visible', 'invisible'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
      condition.validateFunction =  () => true;
    }

    conditions[1].isSrcVisible = false;
    conditions[1].validateFunction = ()=> true;
    let result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(false);
    expect(result.attributesModifiers.visible).toEqual(false);
  });

  it('should prevail none if all condition are inactive', () => {
    let conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      })
    ];

    let selectedOptions = ['invisible'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
    }

    conditions[0].isSrcVisible = false;
    let result = conditionsStore.getPriorityCondition(conditions);
    expect(result).toEqual(null);

    conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'visible',
        visible: true,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'required',
        visible: true,
        required: true
      })
    ];

    selectedOptions = ['visible1', 'invisible1', 'required1'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
    }

    result = conditionsStore.getPriorityCondition(conditions);
    expect(result).toEqual(null);
  });
});


describe('Test condition with domain ', () => {

  it('check if condition will work with invalid domains', () => {
    let conditions = [
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'visible',
        visible: true,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'required',
        visible: true,
        required: true
      }),
      new Condition({
        srcfield: '001',
        tgtfield: '002',
        srctxtresponse: 'invisible',
        visible: false,
        required: false
      }),
    ];

    let selectedOptions = ['visible', 'invisible', 'required'];
    for (let condition of conditions) {
      condition.isSrcVisible = true;
      condition.currentResponse = selectedOptions;
      condition.validateFunction =  () => false;
    }

   
    let result = conditionsStore.getPriorityCondition(conditions);
    expect(result).toBeNull();

    conditions[0].validateFunction =  () => true;
    result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(false);
    expect(result.attributesModifiers.visible).toEqual(false);


    conditions[1].validateFunction =  () => true;
    conditions[2].validateFunction =  () => true;
    result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(false);
    expect(result.attributesModifiers.visible).toEqual(true);
    expect(conditionsStore.hasActiveRejection('001')).toBe(false);

    conditions[3].validateFunction =  () => true;
    conditions[4].validateFunction =  () => true;
    result = conditionsStore.getPriorityCondition(conditions);
    expect(result.attributesModifiers.required).toEqual(true);
    expect(result.attributesModifiers.visible).toEqual(true);

  });
  
});
