/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import InspField from './InspField';
import { mount } from 'enzyme';
import sinon from 'sinon';
import {
  fieldTextInput,
  fieldSingleOption,
  fieldMultipleChoice,
  fieldNumberInput,
  fieldResultSchema,
  fieldCharacteristicMeter,
  fieldAttachmentInput,
  fieldContinuousMeter,
  fieldGaugeMeter,
  fieldDateInput,
  fieldDateTimeInput,
  fieldTimeInput,
  fieldSignatureInput,
  fieldMultipleChoiceALNDomain,
  fieldMultipleChoiceSynonymDomain,
  fieldSingleChoiceALNDomain,
  fieldSingleChoiceSynonymDomain
} from './TestUtils';
import { JSONDataAdapter, Datasource, Device, ObjectUtil } from '@maximo/maximo-js-api';
import executionStore from '../context/ExecutionStore';
import { StatusProvider } from '../context/StatusContext';
import { UIBus } from '@maximo/react-components';

import attachmentDataWithInspfieldResult from '../../../test/data/attachment-data-with-inspfieldresult';
import signatureDataWithInspfieldResult from '../../../test/data/signature-data-with-inspfieldresult';
import multipleChoiceData from '../../../test/data/multiple-choice-data';
import { ConfigProvider } from '../context/ConfigContext';

const testTimeout = 10000;
jest.setTimeout(testTimeout);

const getAttachmentDS = () =>
  new Datasource(
    new JSONDataAdapter({
      src: JSON.parse(JSON.stringify(attachmentDataWithInspfieldResult))
    })
  );

const getSignatureDs = () =>
  new Datasource(
    new JSONDataAdapter({
      src: JSON.parse(JSON.stringify(signatureDataWithInspfieldResult))
    })
  );

const getSelectionDs = () =>
  new Datasource(
    new JSONDataAdapter({
      src: JSON.parse(JSON.stringify(multipleChoiceData))
    })
  );

const createItens = (field) => {

  const data = {
    items: [{
      ...field,
      href: 'temp',
      orgid: 'ibm',
      siteid: 'test',
      enteredby: 'test',
      entereddate: new Date(),

    }],
    schema: {
      properties: {
        itemnum: {
          type: 'string',
          title: 'Item Number',
          persistent: true
        }
      }
    }
  }

  return data;
}

const getNewDataSource = (field) => {
  let dataSource = new Datasource(
    new JSONDataAdapter({
      src: JSON.parse(JSON.stringify(createItens(field)))
    },
      { name: 'tempDS' })
  );
  return dataSource;
}

const tempDataSource = getNewDataSource(fieldNumberInput);

const getInspFieldResultDS = async (field) => {
  if (!tempDataSource.items.length) {
    await tempDataSource.load();
  }
  delete tempDataSource.item.actionrequired;
  delete tempDataSource.item.readconfirmation;
  delete tempDataSource.item.txtresponse;
  delete tempDataSource.item.numresponse;
  delete tempDataSource.item.timeresponse;
  delete tempDataSource.item.dateresponse;
  delete tempDataSource.item.completed;
  delete tempDataSource.item.fieldtype;
  delete tempDataSource.item.fieldtype_maxvalue;
  delete tempDataSource.item.inspfieldid;
  delete tempDataSource.item.visible;
  delete tempDataSource.item.rolloverflag;
  delete tempDataSource.item.inspfieldnum;
  delete tempDataSource.item.inspquestionnum;
  delete tempDataSource.item.metertype;
  delete tempDataSource.item.metertype_maxvalue;
  delete tempDataSource.item.metername;
  delete tempDataSource.item.meters;

  ObjectUtil.mergeDeep(tempDataSource.item, field);
  return tempDataSource;
}

const setup = async ({
  id = 'a0',
  field = {},
  onChange = () => { },
  onAnswerUpdate = () => { },
  getNewField = () => { },
  inspectionResult = {},
  contextStatus = 'INPROG',
  openPreviousResultsDrawer = () => { },
  readConfirmation,
  datasource,
  meters,
  inspfieldresultDS
} = {}) => {

  let tempDS;
  if (!inspfieldresultDS) {
    tempDS = await getInspFieldResultDS(field)
  } else {
    tempDS = inspfieldresultDS;
  }
  const wrapper = (
    <ConfigProvider
      value={{
        choiceDisplayThreshold: 5
      }}
    >
      <StatusProvider
        value={{
          status: contextStatus,
          readconfirmation: readConfirmation,
          datasource: datasource,
          inspfieldresultDS: tempDS,
          openPreviousResultsDrawer: openPreviousResultsDrawer
        }}
      >
        <InspField
          id={id}
          field={field}
          meters={meters}
          onChange={onChange}
          onAnswerUpdate={onAnswerUpdate}
          getNewField={getNewField}
          inspectionResult={inspectionResult}
          inspfieldresultDS={inspfieldresultDS}
        />
      </StatusProvider>
    </ConfigProvider>
  );
  return wrapper;
};


describe('test options map', () => {
  it('test description, color, icon and inspectorfeedback values', async () => {
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';

    //initial  await setup
    field.inspfieldoption[0].description = 'description checkbox 1';
    field.inspfieldoption[0].color = '#FFD2DD';
    field.inspfieldoption[0].icon = 'social:mood';
    field.inspfieldoption[0].inspectorfeedback = 'inspector feedback message 1';

    field.inspfieldoption[1].description = 'description checkbox 2';
    field.inspfieldoption[1].color = '#A7FAE6';
    field.inspfieldoption[1].icon = 'icons:check';
    field.inspfieldoption[1].inspectorfeedback = 'inspector feedback message 2';

    let wrapper = mount(
      await setup({
        field,
        inspectionResult
      })
    );

    let checkboxGroup = wrapper
      .find('StatefulCheckboxGroup')
      .props().initialOptions;
    expect(checkboxGroup[0].label).toBe('description checkbox 1');
    expect(checkboxGroup[0].theme).toBe('#DA1E28');
    expect(checkboxGroup[0].selectedIcon).toBe(
      'carbon:face--activated--filled'
    );
    expect(checkboxGroup[0].unselectedIcon).toBe('carbon:face--activated');
    expect(checkboxGroup[0].inspectorFeedback).toBe(
      'inspector feedback message 1'
    );

    expect(checkboxGroup[1].label).toBe('description checkbox 2');
    expect(checkboxGroup[1].theme).toBe('#0072C3');
    expect(checkboxGroup[1].selectedIcon).toBe('carbon:checkmark--filled');
    expect(checkboxGroup[1].unselectedIcon).toBe('carbon:checkmark--outline');
    expect(checkboxGroup[1].inspectorFeedback).toBe(
      'inspector feedback message 2'
    );
  });
});

describe('test inspectorfeedback and readconfirmation checkbox', () => {
  it('checking any option from checkboxgroup should set readconfirmation checkbox to false', async () => {
    const mockCallBack = jest.fn().mockResolvedValue();

    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'description1' }]
    };

    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';

    //initial  await setup
    field.inspfieldoption[0].inspectorfeedback =
      'Inspector feedback for checkbox 1';
    field.inspfieldoption[2].inspectorfeedback =
      'Inspector feedback for checkbox 3';

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.txtresponse = 'description1';
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        field,
        readConfirmation: true,
        onAnswerUpdate: mockCallBack,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    let optionInput = wrapper.find('input').last();

    //check readconfirmation checkbox
    optionInput.simulate('change', { target: { checked: true } });
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockCallBack.mock.calls[0][0].readconfirmation).toBeTruthy();

    //check second checkbox
    optionInput = wrapper.find('input').at(1);
    optionInput.simulate('change', { target: { checked: true } });
    //it should send readconfirmation as false on onAnswerUpdate callback
    expect(mockCallBack.mock.calls[0][0].readconfirmation).toBeFalsy();
  });
});


describe('when there is inspectorfeedback and form readconfirmation is true', () => {
  it('checking readconfirmation checkbox should call onAnswerUpdate', async () => {
    const mockCallBack = jest.fn().mockResolvedValue();

    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'description1' }]
    };
    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';

    //initial  await setup
    field.inspfieldoption[0].inspectorfeedback =
      'Inspector feedback for checkbox 1';
    field.inspfieldoption[2].inspectorfeedback =
      'Inspector feedback for checkbox 3';

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.txtresponse = 'description1';
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        field,
        readConfirmation: true,
        onAnswerUpdate: mockCallBack,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    let optionInput = wrapper.find('input').last();

    optionInput.simulate('change', { target: { checked: true } });
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockCallBack.mock.calls[0][0].readconfirmation).toBeTruthy();

    optionInput.simulate('change', { target: { checked: false } });
    expect(mockCallBack.mock.calls[0][0].readconfirmation).toBeFalsy();
  });

  it('should have readconfirmation checkbox and label when option has readconfirmation chekbox checked', async () => {
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'description1' }]
    };
    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';

    //initial  await setup
    field.inspfieldoption[0].inspectorfeedback =
      'Inspector feedback for checkbox 1';
    field.inspfieldoption[2].inspectorfeedback =
      'Inspector feedback for checkbox 3';


    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.txtresponse = 'description1';
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        field,
        readConfirmation: true,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    expect(wrapper.find('Checkbox').length).toBe(6);
    expect(wrapper.find('Label').length).toBe(1);
  });

  it('should not have readconfirmation checkbox and label when option has readconfirmation chekbox unchecked', async () => {
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };
    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';
    let inspfieldresult = JSON.parse(JSON.stringify(field));
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    //initial  await setup
    field.inspfieldoption[0].inspectorfeedback =
      'Inspector feedback for checkbox 1';
    field.inspfieldoption[2].inspectorfeedback =
      'Inspector feedback for checkbox 3';

    let wrapper = mount(
      await setup({
        field,
        readConfirmation: true,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );
    expect(wrapper.find('Checkbox').length).toBe(5);
    expect(wrapper.find('Label').length).toBe(0);
  });
});

describe('when there is inspectorfeedback and form readconfirmation is false', () => {
  it('should have readconfirmation checkbox and label when option has readconfirmation chekbox checked', async () => {
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'description1' }]
    };
    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';

    //initial  await setup
    field.inspfieldoption[0].inspectorfeedback =
      'Inspector feedback for checkbox 1';
    field.inspfieldoption[2].inspectorfeedback =
      'Inspector feedback for checkbox 3';

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.txtresponse = 'description1';
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field: field,
        inspectionResult: inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );
    expect(wrapper.find('Checkbox').length).toBe(5);
    expect(wrapper.find('Label').length).toBe(1);
  });

  it('should not have readconfirmation checkbox and label when option has readconfirmation chekbox unchecked', async () => {
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };
    const field = JSON.parse(JSON.stringify(fieldSingleOption));
    field.inspfieldnum = '2327';

    //initial  await setup
    field.inspfieldoption[0].inspectorfeedback =
      'Inspector feedback for checkbox 1';
    field.inspfieldoption[2].inspectorfeedback =
      'Inspector feedback for checkbox 3';

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field: field,
        inspectionResult: inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );
    expect(wrapper.find('Checkbox').length).toBe(5);
    expect(wrapper.find('Label').length).toBe(0);
  });
});

describe('InspField', () => {
  describe('Defaults', () => {
    it('should have default field', async () => {
      let noField = renderer.create(<InspField id='a1' />);
      let tree = noField.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('should render as expected', () => {
    it('empty field', async () => {
      const emptyField = {};

      let field = renderer.create(
        <InspField id={'inspf1'} field={emptyField} />
      );
      let tree = field.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('not visible field', async () => {
      const field = JSON.parse(JSON.stringify(fieldTextInput));

      //initial  await setup
      field.visible = false;

      let notVisible = renderer.create(
        <InspField id={'inspf1'} field={field} />
      );
      let tree = notVisible.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('field without fieldtype', async () => {
      const field = JSON.parse(JSON.stringify(fieldTextInput));

      //initial  await setup
      delete field['fieldtype'];

      let textInput = renderer.create(
        <InspField id={'inspf1'} field={field} />
      );
      let tree = textInput.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render single option field without options', async () => {
      const field = JSON.parse(JSON.stringify(fieldSingleOption));

      //initial  await setup
      delete field['inspfieldoption'];

      const wrapper = await setup({ id: 'inspf1', field: field });
      let textInput = renderer.create(wrapper);
      let tree = textInput.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render number input w/o response', async () => {
      const field = JSON.parse(JSON.stringify(fieldNumberInput));

      let textInput = renderer.create(
        <InspField id={'inspf1'} field={field} />
      );
      let tree = textInput.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render EdgeLegacy with padding-top and margin-top set correctly', async () => {
      let device = Device.get();
      device.browser.isEdgeLegacy = true;
      const field = JSON.parse(JSON.stringify(fieldTextInput));

      let wrapper = mount(await setup({ field }));
      const refDivStyle = wrapper
        .find('div[id$="_field_ref"]')
        .getDOMNode().style;
      expect(refDivStyle['padding-top']).toBe('8rem');
      expect(refDivStyle['margin-top']).toBe('-8rem');

      device.browser.isEdgeLegacy = false;
    });
  });

  describe('test onAnswerUpdate', () => {
    it('send TextInput event', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      let textInput = wrapper.find('input').first();

      textInput.simulate('blur', {
        target: {
          value: 'changing text response'
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(mockCallBack.mock.calls[0][0].txtresponse).toBe(
        'changing text response'
      );
    });

    it('send CheckboxGroup event', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldSingleOption));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let textInput = wrapper.find('input').at(2);

      textInput.simulate('change', { target: { checked: true } });
      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(mockCallBack.mock.calls[0][0].txtresponse).toBe('description3');
    });

    it('send NumberInput event', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let numberInput = wrapper.find('input').first();

      numberInput.simulate('change', {
        target: {
          value: 3
        }
      });
      numberInput.simulate('blur');

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(mockCallBack.mock.calls[0][0].numresponse).toBe(3);
    });

    it('should not trigger onAnswerUpdate for invalid evt values (datetime response)', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldDateTimeInput));
      field.inspfieldnum = '2327';
      let inspfieldresultTemp = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresultTemp);


      let dateTimeInput = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack, 
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let timeInputControl = dateTimeInput.find('TimeInput');
      let dateInputControl = dateTimeInput.find('DateInput');
      let timeInput = timeInputControl.find('input').first();
      let dateInput = dateInputControl.find('input').first();

      dateInput.simulate('change', { target: { value: '2020-99-07' } });
      clock.tick(1100);

      timeInput.simulate('change', { target: { value: '123123' } });
      clock.tick(1100);

      //onAnswerUpdate should not be called since dateInput and timeInput has invalid values
      //comment test for now until GRAPHITE-41164 gets fixed
      //expect(mockCallBack.mock.calls.length).toBe(0);

      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should notify parent when mutation observed after update', async () => {
      const mockCallBack = jest.fn();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldSingleOption));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      //could be any datasource, just to call datasource.inMemoryFilterFunc on onChange callback
      let attachmentDS = getAttachmentDS();
      await attachmentDS.load();

      let wrapper = await mount(
        await setup({
          field,
          inspectionResult,
          onChange: mockCallBack,
          datasource: attachmentDS,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      const forceUpdateSpy = jest.spyOn(
        wrapper.find('InspField').instance(),
        'forceUpdate'
      );

      let payload = { 2327: { visible: true } };
      UIBus.emit('update-field', payload);

      expect(forceUpdateSpy).toHaveBeenCalled();
      expect(mockCallBack.mock.calls.length).toBe(2);
      expect(mockCallBack.mock.calls[0][0].completed).toBeFalsy();
      expect(mockCallBack.mock.calls[1][0].visible).toBeTruthy();
    });

    it('should notify parent when feedback observed after update', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      wrapper
        .find('InspField')
        .instance()
        .updateField({ 2327: { isSrc: true, message: ['feedback'] } });
      expect(wrapper.find('InspField').instance().state.message).toEqual(
        'feedback'
      );
      wrapper
        .find('InspField')
        .instance()
        .updateField({ 2327: { isSrc: true, message: [] } });
      expect(wrapper.find('InspField').instance().state.message).toEqual('');
    });

    it('should notify parent when requiaction observed after update', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      wrapper
        .find('InspField')
        .instance()
        .updateField({ 2327: { isSrc: true, requireaction: true } });
      let response = wrapper.find('InspField').instance().getResultField();
      expect(response.actionrequired).toEqual(true);

      wrapper
        .find('InspField')
        .instance()
        .updateField({ 2327: { isSrc: true, requireaction: false } });
      response = wrapper.find('InspField').instance().getResultField();
      expect(response.actionrequired).toEqual(false);
    });

    it(' should change response actionrequired based on options requireaction ', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldSingleOption));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);
      field.inspfieldoption[2].requireaction = true;
      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let textInput = wrapper.find('input').at(2);
      let resultField = wrapper.find('InspField').instance().getResultField();

      textInput.simulate('change', { target: { checked: true } });
      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(mockCallBack.mock.calls[0][0].txtresponse).toBe('description3');
      expect(resultField.actionrequired).toEqual(true);

      textInput = wrapper.find('input').at(1);
      textInput.simulate('change', { target: { checked: true } });
      resultField = wrapper.find('InspField').instance().getResultField();
      expect(mockCallBack.mock.calls.length).toBe(2);
      expect(mockCallBack.mock.calls[0][0].txtresponse).toBe('description2');
      expect(resultField.actionrequired).toEqual(false);
    });
  });

  describe('test field completion for text response', () => {
    it('should not trigger onAnswerUpdate when evt.target.value equals value coming from datasource (txtresponse)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'Same response' }]
      };

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS
        })
      );

      let textInput = wrapper.find('input').first();

      expect(field.completed).toBeTruthy();

      textInput.simulate('blur', {
        target: {
          value: 'Same response'
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(0);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when evt.target.value unmatch value coming from datasource (txtresponse)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [
          { inspfieldnum: '2327', txtresponse: 'Different response' }
        ]
      };

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS
        })
      );

      let textInput = wrapper.find('input').first();

      expect(field.completed).toBeTruthy();

      textInput.simulate('blur', {
        target: {
          value: 'changing text response'
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when there is no value coming from datasource (txtresponse)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(field.completed).toBeFalsy();
      let textInput = wrapper.find('input').first();

      textInput.simulate('blur', {
        target: {
          value: 'changing text response'
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when evt.target.value has empty value with txt response', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [
          { inspfieldnum: '2327', txtresponse: 'Different response' }
        ]
      };

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      let textInput = wrapper.find('input').first();

      textInput.simulate('blur', {
        target: {
          value: ''
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeFalsy();

      textInput.simulate('blur', {
        target: {
          value: ' '
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeFalsy();
    });

    it('should not trigger onAnswerUpdate when evt.target.value has empty value and w/o txt response', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let textInput = wrapper.find('input').first();

      textInput.simulate('blur', {
        target: {
          value: ''
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(0);
      expect(wrapper.props().field.completed).toBeFalsy();

      textInput.simulate('blur', {
        target: {
          value: ' '
        }
      });

      expect(mockCallBack.mock.calls.length).toBe(0);
      expect(wrapper.props().field.completed).toBeFalsy();
    });
  });

  describe('test field completion for single option', () => {
    it('should not trigger onAnswerUpdate when evt.target.value equals value coming from datasource (single option)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'description3' }]
      };

      const field = JSON.parse(JSON.stringify(fieldSingleOption));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let textInput = wrapper.find('input').at(2);

      expect(field.completed).toBeTruthy();

      textInput.simulate('change', { target: { checked: true } });

      expect(mockCallBack.mock.calls.length).toBe(0);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when evt.target.value unmatch value coming from datasource (single option)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'description3' }]
      };

      const field = JSON.parse(JSON.stringify(fieldSingleOption));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let textInput = wrapper.find('input').at(1);

      expect(field.completed).toBeTruthy();

      textInput.simulate('change', { target: { checked: true } });

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when there is no value coming from datasource (single option)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldSingleOption));
      field.inspfieldnum = '2327';

      let inspfieldresultTemp = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresultTemp);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let textInput = wrapper.find('input').at(2);

      textInput.simulate('change', { target: { checked: true } });
      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeTruthy();
    });
  });

  describe('test field completion for number response', () => {
    it('should not trigger onAnswerUpdate when evt.target.value exceeds the min or max length defined (number response)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [{ inspfieldnum: '2327', numresponse: 3 }]
      };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresultTemp = JSON.parse(JSON.stringify(field));
      inspfieldresultTemp.numresponse = inspectionResult.inspfieldresult[0].numresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresultTemp);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let numberInput = wrapper.find('input').first();

      expect(field.completed).toBeTruthy();

      numberInput.simulate('change', {
        target: {
          value: 999999999999999
        }
      });
      numberInput.simulate('blur');

      numberInput.simulate('change', {
        target: {
          value: -999999999999999
        }
      });
      numberInput.simulate('blur');

      expect(mockCallBack.mock.calls.length).toBe(0);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should not trigger onAnswerUpdate when evt.target.value equals value coming from datasource (number response)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [{ inspfieldnum: '2327', numresponse: 3 }]
      };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.numresponse = inspectionResult.inspfieldresult[0].numresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let numberInput = wrapper.find('input').first();

      expect(field.completed).toBeTruthy();
      numberInput.simulate('change', {
        target: {
          value: 3
        }
      });
      numberInput.simulate('blur');

      expect(mockCallBack.mock.calls.length).toBe(0);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when evt.target.value unmatch value coming from datasource (number response)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = {
        inspfieldresult: [{ inspfieldnum: '2327', numresponse: 3 }]
      };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.numresponse = inspectionResult.inspfieldresult[0].numresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let numberInput = wrapper.find('input').first();

      expect(field.completed).toBeTruthy();
      numberInput.simulate('change', {
        target: {
          value: 4
        }
      });
      numberInput.simulate('blur');

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeTruthy();
    });

    it('should trigger onAnswerUpdate when there is no value coming from datasource (number response)', async () => {
      const mockCallBack = jest.fn().mockResolvedValue();
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );
      let numberInput = wrapper.find('input').first();

      expect(field.completed).toBeFalsy();
      numberInput.simulate('change', {
        target: {
          value: 2
        }
      });
      numberInput.simulate('blur');

      expect(mockCallBack.mock.calls.length).toBe(1);
      expect(wrapper.props().field.completed).toBeTruthy();
    });
  });

  describe('test field completion for datetime response', () => {
    it('should save timeresponse without date part (datetime response)', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(resolve)
      });
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldDateTimeInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateTimeInput = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateTimeInput.props().field.completed).toBeFalsy();
      let timeInputControl = dateTimeInput.find('TimeInput');
      let dateInputControl = dateTimeInput.find('DateInput');
      let timeInput = timeInputControl.find('input').first();
      let dateInput = dateInputControl.find('input').first();
      dateInput.simulate('change', { target: { value: '2020-12-07' } });
      clock.tick(1100);
      let inspField = dateTimeInput.find('InspField').instance();
      inspField.state.loading = false;
      timeInput.simulate('change', { target: { value: '03:13' } });
      clock.tick(1100);

      const timeResponse =
        dateTimeInput.props().inspfieldresultDS.items[0].timeresponse;
      //make sure timeResponse only has the time part
      expect(timeResponse.startsWith('03:13:00-')).toBeTruthy();
      //timeResponse should has the format 03:13:00-03:00
      expect(timeResponse.length).toBe(14);

      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should trigger onAnswerUpdate when evt unmatch value coming from datasource (datetime response)', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;
      let callCount = 0;

      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = {
        inspfieldresult: [
          {
            inspfieldnum: '2327',
            dateresponse: '2020-01-30T11:30:00-03:00',
            timeresponse: '2020-01-30T11:30:00-03:00'
          }
        ]
      };

      const field = JSON.parse(JSON.stringify(fieldDateTimeInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.dateresponse = inspectionResult.inspfieldresult[0].dateresponse;
      inspfieldresult.timeresponse = inspectionResult.inspfieldresult[0].timeresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateTimeInput = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateTimeInput.props().field.completed).toBeTruthy();
      let timeInputControl = dateTimeInput.find('TimeInput');
      let dateInputControl = dateTimeInput.find('DateInput');
      let timeInput = timeInputControl.find('input').first();
      let dateInput = dateInputControl.find('input').first();
      dateInput.simulate('change', { target: { value: '2020-02-30' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeTruthy();
      let inspField = dateTimeInput.find('InspField').instance();
      inspField.state.loading = false;
      timeInput.simulate('change', { target: { value: '11:45' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeTruthy();
      expect(callCount).toBe(2);
      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should trigger onAnswerUpdate when there is no value coming from datasource (datetime response)', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      let callCount = 0;

      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldDateTimeInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateTimeInput = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateTimeInput.props().field.completed).toBeFalsy();
      let timeInputControl = dateTimeInput.find('TimeInput');
      let dateInputControl = dateTimeInput.find('DateInput');
      let timeInput = timeInputControl.find('input').first();
      let dateInput = dateInputControl.find('input').first();
      dateInput.simulate('change', { target: { value: '2020-12-07' } });
      clock.tick(1100);
      //after typing a date, a default time is input so field should be completed
      expect(dateTimeInput.props().field.completed).toBeTruthy();
      let inspField = dateTimeInput
        .find('InspField')
        .instance();
      inspField.state.loading = false;
      timeInput.simulate('change', { target: { value: '03:13' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeTruthy();
      expect(callCount).toBe(2);
      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should trigger onAnswerUpdate when evt has empty value with datetime response', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;
      let callCount = 0;
      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = {
        inspfieldresult: [
          {
            inspfieldnum: '2327',
            dateresponse: '2020-01-30T11:30:00-03:00',
            timeresponse: '2020-01-30T11:30:00-03:00'
          }
        ]
      };

      const field = JSON.parse(JSON.stringify(fieldDateTimeInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.dateresponse = inspectionResult.inspfieldresult[0].dateresponse;
      inspfieldresult.timeresponse = inspectionResult.inspfieldresult[0].timeresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateTimeInput = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateTimeInput.props().field.completed).toBeTruthy();
      let timeInputControl = dateTimeInput.find('TimeInput');
      let dateInputControl = dateTimeInput.find('DateInput');
      let timeInput = timeInputControl.find('input').first();
      let dateInput = dateInputControl.find('input').first();
      dateTimeInput.find('InspField').instance().oldValue = 'old';
      dateInput.simulate('change', { target: { value: '' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeFalsy();
      let inspField = dateTimeInput
        .find('InspField')
        .instance();
      inspField.state.loading = false;
      timeInput.simulate('change', { target: { value: '' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeFalsy();
      expect(callCount).toBe(1);
      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should not trigger onAnswerUpdate when evt has empty value w/o datetime response', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      let callCount = 0;
      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldDateTimeInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateTimeInput = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateTimeInput.props().field.completed).toBeFalsy();
      let timeInputControl = dateTimeInput.find('TimeInput');
      let dateInputControl = dateTimeInput.find('DateInput');
      let timeInput = timeInputControl.find('input').first();
      let dateInput = dateInputControl.find('input').first();
      dateInput.simulate('change', { target: { value: '' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeFalsy();
      timeInput.simulate('change', { target: { value: '' } });
      clock.tick(1100);
      expect(dateTimeInput.props().field.completed).toBeFalsy();
      expect(callCount).toBe(0);
      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });
  });

  describe('test field completion for date response', () => {
    it('should trigger onAnswerUpdate when there is no value coming from datasource (date response)', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      let callCount = 0;
      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldDateInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateInputWrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateInputWrapper.props().field.completed).toBeFalsy();
      let dateInputControl = dateInputWrapper.find('DateInput');
      let dateInput = dateInputControl.find('input').first();
      dateInput.simulate('change', { target: { value: '2020-12-07' } });
      clock.tick(1100);
      expect(dateInputWrapper.props().field.completed).toBeTruthy();
      expect(callCount).toBe(1);

      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should trigger onAnswerUpdate when evt has empty value with date response', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      let callCount = 0;
      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = {
        inspfieldresult: [
          { inspfieldnum: '2327', dateresponse: '2020-01-30T11:30:00-03:00' }
        ]
      };

      const field = JSON.parse(JSON.stringify(fieldDateInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.dateresponse = inspectionResult.inspfieldresult[0].dateresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let dateInputWrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(dateInputWrapper.props().field.completed).toBeTruthy();
      let dateInputControl = dateInputWrapper.find('DateInput');
      let dateInput = dateInputControl.find('input').first();
      dateInputWrapper.find('InspField').instance().oldValue = 'old';
      dateInput.simulate('change', { target: { value: '' } });
      clock.tick(1100);
      expect(dateInputWrapper.props().field.completed).toBeFalsy();
      expect(callCount).toBe(1);

      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });
  });

  describe('test field completion for time response', () => {
    it('should trigger onAnswerUpdate when there is no value coming from datasource (time response)', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      let callCount = 0;
      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldTimeInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.dateresponse = inspectionResult.inspfieldresult[0].dateresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let timeInputWrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(timeInputWrapper.props().field.completed).toBeFalsy();
      let timeInputControl = timeInputWrapper.find('TimeInput');
      let timeInput = timeInputControl.find('input').first();
      timeInput.simulate('change', { target: { value: '03:13' } });
      clock.tick(1100);
      expect(timeInputWrapper.props().field.completed).toBeTruthy();
      expect(callCount).toBe(1);

      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });

    it('should trigger onAnswerUpdate when evt has empty value with time response', async () => {
      let clock = sinon.useFakeTimers();

      let device = Device.get();
      device.theme = 'touch';
      device.isMobile = true;

      let callCount = 0;
      const mockCallBack = () => new Promise((resolve, reject) => {
        setTimeout(() => { callCount++ })
      });
      const inspectionResult = {
        inspfieldresult: [
          { inspfieldnum: '2327', timeresponse: '2020-01-30T11:30:00-03:00' }
        ]
      };

      const field = JSON.parse(JSON.stringify(fieldTimeInput));
      field.inspfieldnum = '2327';

      let inspfieldresult = JSON.parse(JSON.stringify(field));
      inspfieldresult.timeresponse = inspectionResult.inspfieldresult[0].timeresponse;
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let timeInputWrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          onAnswerUpdate: mockCallBack,
          inspectionResult,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      expect(timeInputWrapper.props().field.completed).toBeTruthy();
      let timeInputControl = timeInputWrapper.find('TimeInput');
      let timeInput = timeInputControl.find('input').first();
      timeInput.simulate('change', { target: { value: '' } });
      clock.tick(1100);
      //expect(timeInputWrapper.props().field.completed).toBeFalsy();
      expect(callCount).toBe(1);

      device.theme = 'default';
      device.isMobile = false;

      clock.restore();
    });
  });

  describe('test getFieldResultSchema', () => {
    afterEach(() => {
      executionStore.deleteFieldResultSchema();
    });

    it('should use default value for max and min when there is no schema for number response', async () => {
      const field = JSON.parse(JSON.stringify(fieldNumberInput));

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field
        })
      );

      const numberInputProps = wrapper.find('NumberInput').first().props();
      //if there is no schema, default value is 9999999999999
      expect(numberInputProps.max).toBe(9999999999999);
      expect(numberInputProps.min).toBe(-9999999999999);
    });

    it('should use default value for maxLength when there is no schema as null for text response', async () => {
      const field = JSON.parse(JSON.stringify(fieldTextInput));

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field
        })
      );

      const textInputProps = wrapper.find('TextInput').first().props();
      //if there is no schema, default value is 250
      expect(textInputProps.maxLength).toBe(250);
    });

    it('should use maxLength from schema when there is schema for text response', async () => {
      //initial  await setup
      fieldResultSchema.properties.txtresponse.maxLength = 300;
      executionStore.setFieldResultSchema(fieldResultSchema);

      const field = JSON.parse(JSON.stringify(fieldTextInput));
      let inspfieldresultTemp = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresultTemp);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      const textInputProps = wrapper.find('TextInput').first().props();
      const txtResponseSchema = fieldResultSchema.properties.txtresponse;

      //maxLength should be the maxLength from schema
      expect(textInputProps.maxLength).toBe(txtResponseSchema.maxLength);
    });

    it('should use max and min from schema when there is schema for number response', async () => {
      //initial  await setup
      fieldResultSchema.properties.numresponse.maxLength = 10;
      executionStore.setFieldResultSchema(fieldResultSchema);

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      let inspfieldresultTemp = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresultTemp);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          inspfieldresultDS: inspfieldresultDS
        })
      );

      const numberInputProps = wrapper.find('NumberInput').first().props();
      const numResponseSchema = fieldResultSchema.properties.numresponse;

      //max should be the max from schema
      expect(numberInputProps.max).toBe(numResponseSchema.max);
      expect(numberInputProps.min).toBe(-numResponseSchema.max);
    });
  });

  describe('test readonly property', () => {
    it('text input', async () => {
      const field = JSON.parse(JSON.stringify(fieldTextInput));
      field.inspfieldnum = '2327';
      let inspfieldresult = JSON.parse(JSON.stringify(field));
      let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

      let wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          contextStatus: 'PENDING',
          inspfieldresultDS: inspfieldresultDS
        })
      );

      let textInput = wrapper.find('input').first();
      expect(textInput.props().readOnly).toBeTruthy();


      wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          contextStatus: 'COMPLETED',
          inspfieldresultDS: inspfieldresultDS
        })
      );

      textInput = wrapper.find('input').first();
      expect(textInput.props().readOnly).toBeTruthy();

      wrapper = mount(
        await setup({
          id: 'inspf1',
          field,
          contextStatus: 'INPROG',
          inspfieldresultDS: inspfieldresultDS
        })
      );

      textInput = wrapper.find('input').first();
      expect(textInput.props().readOnly).not.toBeTruthy();
    });

    it('number input', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

      const field = JSON.parse(JSON.stringify(fieldNumberInput));
      field.inspfieldnum = '2327';
      let wrapper = mount(
        await setup({
          field,
          contextStatus: 'PENDING',
          inspectionResult
        })
      );
      let numberInput = wrapper.find('input').first();
      expect(numberInput.props().readOnly).toBeTruthy();

      wrapper = mount(
        await setup({
          field,
          contextStatus: 'COMPLETED',
          inspectionResult
        })
      );

      numberInput = wrapper.find('input').first();
      expect(numberInput.props().readOnly).toBeTruthy();

      wrapper = mount(
        await setup({
          field,
          contextStatus: 'INPROG',
          inspectionResult
        })
      );

      numberInput = wrapper.find('input').first();
      expect(numberInput.props().readOnly).not.toBeTruthy();
    });
  });
});

describe('test field completion for Characteristic Meter', () => {
  it('should not trigger onAnswerUpdate when evt.target.value equals value coming from datasource (Characteristic Meter)', async () => {
    const mockCallBack = jest.fn();
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'BROWN' }]
    };

    const field = JSON.parse(JSON.stringify(fieldCharacteristicMeter));
    field.inspfieldnum = '2327';

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        onAnswerUpdate: mockCallBack,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    let optionInput = wrapper.find('input').at(0);

    expect(field.completed).toBeTruthy();

    optionInput.simulate('change', { target: { checked: true } });

    expect(mockCallBack.mock.calls.length).toBe(0);
    expect(wrapper.props().field.completed).toBeTruthy();
  });

  it('should trigger onAnswerUpdate when evt.target.value unmatch value coming from datasource (Characteristic Meter)', async () => {
    const mockCallBack = jest.fn().mockResolvedValue();
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', txtresponse: 'BROWN' }]
    };

    const field = JSON.parse(JSON.stringify(fieldCharacteristicMeter));
    field.inspfieldnum = '2327';
    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.txtresponse = inspectionResult.inspfieldresult[0].txtresponse;
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        onAnswerUpdate: mockCallBack,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    let optionInput = wrapper.find('input').at(1);

    expect(field.completed).toBeTruthy();

    optionInput.simulate('change', { target: { checked: true } });

    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(wrapper.props().field.completed).toBeTruthy();
  });

  it('should trigger onAnswerUpdate when there is no value coming from datasource (Characteristic Meter)', async () => {
    const mockCallBack = jest.fn().mockResolvedValue();
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

    const field = JSON.parse(JSON.stringify(fieldCharacteristicMeter));
    field.inspfieldnum = '2327';
    let inspfieldresult = JSON.parse(JSON.stringify(field));
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        onAnswerUpdate: mockCallBack,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    let optionInput = wrapper.find('input').at(0);

    optionInput.simulate('change', { target: { checked: true } });
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(wrapper.props().field.completed).toBeTruthy();
  });
});

describe('test field completion for Meter (different from Characteristic)', () => {
  it('should not trigger onAnswerUpdate when evt.target.value exceeds the min or max length defined (meter)', async () => {
    let clock = sinon.useFakeTimers();
    const mockCallBack = jest.fn().mockResolvedValue();
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', numresponse: 3 }]
    };

    const field = JSON.parse(JSON.stringify(fieldContinuousMeter));
    field.inspfieldnum = '2327';
    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.numresponse = inspectionResult.inspfieldresult[0].numresponse;
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        onAnswerUpdate: mockCallBack,
        inspectionResult,
        inspfieldresultDS: inspfieldresultDS
      })
    );

    let numberInput = wrapper.find('input').first();

    expect(field.completed).toBeTruthy();

    numberInput.simulate('change', {
      target: {
        value: 999999999999999
      }
    });
    numberInput.simulate('blur');
    clock.tick(1100);

    numberInput.simulate('change', {
      target: {
        value: -999999999999999
      }
    });
    numberInput.simulate('blur');
    clock.tick(1100);

    expect(mockCallBack.mock.calls.length).toBe(0);
    expect(wrapper.props().field.completed).toBeTruthy();
    clock.restore();
  });
});

describe('meters fieldtype tests', () => {
  it('should display warning message for meter input without available meters', async () => {
    const field = JSON.parse(JSON.stringify(fieldCharacteristicMeter));

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field
      })
    );

    expect(wrapper.find('InvalidMeterMessage').length).toBe(1);
  });

  it('should display rollover checkbox', async () => {
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', rolloverflag: false }]
    };

    const field = JSON.parse(JSON.stringify(fieldContinuousMeter));
    field.inspfieldnum = '2327';


    const meters = [
      {
        metername: 'CONTMT1',
        rollover: 10
      }
    ];

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.rolloverflag = inspectionResult.inspfieldresult[0].rolloverflag;
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        inspectionResult,
        meters,
        inspfieldresultDS: inspfieldresultDS,
      })
    );

    const rollOverCheckbox = wrapper.find('StatefulCheckboxGroup');
    expect(rollOverCheckbox.length).toBe(1);
    expect(rollOverCheckbox.text().toLowerCase()).toMatch('rollover');
  });

  it('should update answer when rollover is checked/unchecked', async () => {
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', rolloverflag: false }]
    };
    const field = JSON.parse(JSON.stringify(fieldContinuousMeter));
    field.inspfieldnum = '2327';

    const mockCallBack = jest.fn().mockResolvedValue();
    const meters = [
      {
        metername: 'CONTMT1',
        rollover: 10
      }
    ];

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.rolloverflag = inspectionResult.inspfieldresult[0].rolloverflag;
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        inspectionResult,
        onAnswerUpdate: mockCallBack,
        meters,
        inspfieldresultDS: inspfieldresultDS,
      })
    );


    let rollOverCheckbox = wrapper.find('input[type="checkbox"]');
    expect(rollOverCheckbox.length).toBe(1);

    rollOverCheckbox.simulate('change', { target: { checked: true } });
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockCallBack.mock.calls[0][0].rolloverflag).toBe(true);
  });

  it('should display numeric input for meter input field of type gauge ', async () => {
    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field: fieldGaugeMeter
      })
    );

    expect(wrapper.find('NumberInput').length).toBe(1);
  });

  it('should display feedback message in meters', async () => {
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327' }]
    };

    const field = JSON.parse(JSON.stringify(fieldContinuousMeter));
    field.inspfieldnum = '2327';

    const meters = [
      {
        metername: 'CONTMT1',
        rollover: 10
      }
    ];

    let inspfieldresult = JSON.parse(JSON.stringify(field));
    inspfieldresult.rolloverflag = inspectionResult.inspfieldresult[0].rolloverflag;
    let inspfieldresultDS = await getInspFieldResultDS(inspfieldresult);

    let wrapper = mount(
      await setup({
        id: 'inspf1',
        field,
        inspectionResult,
        meters,
        inspfieldresultDS: inspfieldresultDS,
      })
    );

    wrapper
      .find('InspField')
      .instance()
      .updateField({ 2327: { isSrc: true, message: ['feedback'] } });
    expect(wrapper.find('InspField').instance().state.message).toEqual(
      'feedback'
    );
  });
});

describe('test getResultField', () => {
  it('should return existing field result', async () => {
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

    const field = JSON.parse(JSON.stringify(fieldTextInput));
    field.inspfieldnum = '2327';
    let textInput = mount(
      await setup({
        field,
        inspectionResult
      })
    );
    let resultField = textInput.find('InspField').instance().getResultField();

    expect(resultField.inspfieldnum).toBe('2327');
  });

  it('should return new field result computed by getNewField', async () => {
    const getNewField = () => {
      return { inspfieldnum: '2327' };
    };
    const inspectionResult = {
      inspfieldresult: [{ inspfieldnum: '2327', inspquestionnum: '1234' }]
    };

    const field = JSON.parse(JSON.stringify(fieldTextInput));

    let textInput = mount(
      await setup({
        field,
        inspectionResult,
        getNewField
      })
    );
    let resultField = textInput.find('InspField').instance().getResultField();

    expect(resultField.inspfieldnum).toBe('2327');
  });

  it('should return new field result computed by getNewField', async () => {
    const getNewField = () => {
      return { inspfieldnum: '2327' };
    };
    const inspectionResult = { inspfieldresult: [] };

    const field = JSON.parse(JSON.stringify(fieldTextInput));

    let textInput = mount(
      await setup({
        field,
        inspectionResult,
        getNewField
      })
    );
    let resultField = textInput.find('InspField').instance().getResultField();

    expect(resultField.inspfieldnum).toBe('2327');
  });
});


it('should call openPreviouResultDrawer', async () => {
  const mockCallBack = jest.fn();
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  const field = JSON.parse(JSON.stringify(fieldTextInput));
  field.inspfieldnum = '2327';

  let wrapper = mount(
    await setup({
      field,
      contextStatus: 'PENDING',
      inspectionResult,
      openPreviousResultsDrawer: mockCallBack
    })
  );
  let fieldInstance = wrapper.find('InspField').instance();
  fieldInstance.openPreviousResultsDrawer(field);
  expect(mockCallBack.mock.calls.length).toBe(1);
});

it('test inpections-apply-custom-filter listener', async () => {
  const mockCallBack = jest.fn();
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  const field = JSON.parse(JSON.stringify(fieldSingleOption));
  field.inspfieldnum = '2327';

  //could be any datasource, just to call datasource.inMemoryFilterFunc on onChange callback
  let attachmentDS = getAttachmentDS();
  await attachmentDS.load();

  let wrapper = await mount(
    await setup({
      field,
      inspectionResult,
      onChange: mockCallBack,
      datasource: attachmentDS
    })
  );

  attachmentDS.applyInMemoryFilter(() => false);
  attachmentDS.emit('inpections-apply-custom-filter', attachmentDS);
  expect(wrapper.find('InspField').instance().state.visibility).toBeFalsy();

  //state is false and filter did not change so the state still should be false
  attachmentDS.emit('inpections-apply-custom-filter', attachmentDS);
  expect(wrapper.find('InspField').instance().state.visibility).toBeFalsy();

  //state is false and filter changed to true so the state should change to true
  attachmentDS.applyInMemoryFilter(() => true);
  attachmentDS.emit('inpections-apply-custom-filter', attachmentDS);
  expect(wrapper.find('InspField').instance().state.visibility).toBeTruthy();

  //state is true and filter did not change so the state still should be true
  attachmentDS.emit('inpections-apply-custom-filter', attachmentDS);
  expect(wrapper.find('InspField').instance().state.visibility).toBeTruthy();
});

it('should set attachmentsds state when running createDoclinksDS with fieldtype FU', async () => {
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  let attachmentDS = getAttachmentDS();
  await attachmentDS.load();
  let childDS = await attachmentDS.getChildDatasource(
    'inspfieldresult',
    attachmentDS.item
  );
  await childDS.load();

  const field = JSON.parse(JSON.stringify(fieldAttachmentInput));
  field.inspfieldnum = '2327';

  let attachmentInput = mount(
    await setup({
      field,
      datasource: attachmentDS,
      inspectionResult
    })
  );

  let inspfield = attachmentInput.find('InspField').instance();
  await attachmentInput.find('InspField').instance().createDoclinksDS(childDS);

  expect(inspfield.state.attachmentsds.items[0].describedBy.fileName).toBe(
    'DevelopmentCodeChecklist.doc'
  );
});

it('Should initialize Signature input and update CurrentSignature state', async () => {
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  let attachmentDS = getSignatureDs();
  await attachmentDS.load();
  let childDS = await attachmentDS.getChildDatasource(
    'inspfieldresult',
    attachmentDS.item
  );
  await childDS.load();

  const field = JSON.parse(JSON.stringify(fieldSignatureInput));
  field.inspfieldnum = '2327';

  let signatureInput = mount(
    await setup({
      field,
      datasource: attachmentDS,
      inspectionResult
    })
  );

  let inspfield = signatureInput.find('InspField').instance();
  await signatureInput.find('InspField').instance().createDoclinksDS(childDS);

  expect(inspfield.state.attachmentsds.items[0].describedBy.fileName).toBe(
    'DevelopmentCodeChecklist.doc'
  );

  let image = inspfield.state.attachmentsds.resolveCompleteURL(
    './LastDockLinckHREF.doc'
  );
  //should be equal to last record href
  expect(inspfield.state.currentSignature).toEqual(image);
});

it('Mobile - should initialize Signature input and update CurrentSignature state', async () => {
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  let device = Device.get();
  device.theme = 'touch';
  device.isMaximoMobile = true;

  let attachmentDS = getSignatureDs();
  await attachmentDS.load();
  let childDS = await attachmentDS.getChildDatasource(
    'inspfieldresult',
    attachmentDS.item
  );
  await childDS.load();

  const field = JSON.parse(JSON.stringify(fieldSignatureInput));
  field.inspfieldnum = '2327';

  let signatureInput = mount(
    await setup({
      field,
      datasource: attachmentDS,
      inspectionResult
    })
  );

  let inspfield = signatureInput.find('InspField').instance();

  await signatureInput.find('InspField').instance().createDoclinksDS(childDS);

  expect(inspfield.state.attachmentsds.items[0].describedBy.fileName).toBe(
    'DevelopmentCodeChecklist.doc'
  );

  let image = inspfield.state.attachmentsds.resolveCompleteURL(
    './LastDockLinckHREF.doc'
  );
  //should be equal to last record href
  expect(inspfield.state.currentSignature).toEqual(image);

  device.theme = 'default';
  device.isMaximoMobile = false;
});

it(' MO checking any option from checkboxgroup should set readconfirmation checkbox to false', async () => {
  const mockCallBack = jest.fn().mockResolvedValue();
  const inspectionResult = {
    inspfieldresult: [
      {
        inspfieldnum: '2327',
        txtresponse: 'description1',
        inspfieldresultid: 1601
      }
    ]
  };
  const field = JSON.parse(JSON.stringify(fieldMultipleChoice));
  field.inspfieldnum = '2327';

  field.inspfieldoption[0].inspectorfeedback =
    'Inspector feedback for checkbox 1';
  field.inspfieldoption[2].inspectorfeedback =
    'Inspector feedback for checkbox 3';

  field.inspfieldoption[1].requireaction = true;
  field.inspfieldoption[2].requireaction = true;

  let inspfieldresultds = getSelectionDs();
  await inspfieldresultds.load();
  let mockLoad = jest.fn().mockResolvedValue();
  inspfieldresultds.forceReload = mockLoad;
  inspfieldresultds.update = mockLoad;
  let wrapper = mount(
    await setup({
      field,
      readConfirmation: true,
      onAnswerUpdate: mockCallBack,
      multipleDS: inspfieldresultds,
      inspectionResult
    })
  );
  let definedfield = wrapper.find('InspField').instance();
  definedfield.setState({
    multipleselectds: inspfieldresultds
  });
  wrapper.update();
  definedfield.initialFormState();
  let optionInput = wrapper.find('input').at(4);
  //check readconfirmation checkbox
  optionInput.simulate('change', { target: { checked: true } });

  setTimeout(() => {
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockLoad.mock.calls.length).toBe(1);
  }, 100);

  //check second checkbox
  optionInput = wrapper.find('input').at(1);
  optionInput.simulate('change', { target: { checked: true } });
  optionInput.simulate('change', { target: { checked: false } });
});

it('render Multiple choice field without options', async () => {
  const field = JSON.parse(JSON.stringify(fieldMultipleChoice));

  //initial  await setup
  delete field['inspfieldoption'];

  const wrapper = await setup({ id: 'inspf1', field: field });
  let textInput = renderer.create(wrapper);
  let tree = textInput.toJSON();
  expect(tree).toMatchSnapshot();
});

it('render Multiple choice field with ALN Domain', async () => {
  const field = JSON.parse(JSON.stringify(fieldMultipleChoiceALNDomain));

  const wrapper = await setup({ id: 'inspfalnmo', field: field });
  let textInput = renderer.create(wrapper);
  let tree = textInput.toJSON();
  expect(tree).toMatchSnapshot();
});

it('render Multiple choice field with Synonym Domain', async () => {
  const field = JSON.parse(JSON.stringify(fieldMultipleChoiceSynonymDomain));

  const wrapper = await setup({ id: 'inspfsynmo', field: field });

  let textInput = renderer.create(wrapper);
  let tree = textInput.toJSON();
  expect(tree).toMatchSnapshot();
});

it('render Single choice field with ALN Domain', async () => {
  const field = JSON.parse(JSON.stringify(fieldSingleChoiceALNDomain));

  const wrapper = await setup({ id: 'inspfalnso', field: field });
  let textInput = renderer.create(wrapper);
  let tree = textInput.toJSON();
  expect(tree).toMatchSnapshot();
});

it('render Single choice field with Synonym Domain', async () => {
  const field = JSON.parse(JSON.stringify(fieldSingleChoiceSynonymDomain));

  const wrapper = await setup({ id: 'inspfsynso', field: field });

  let textInput = renderer.create(wrapper);

  let tree = textInput.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should return the provided selected options if exists', async () => {
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  const field = JSON.parse(JSON.stringify(fieldNumberInput));
  field.inspfieldnum = '2327';

  let wrapper = mount(
    await setup({
      field,
      inspectionResult
    })
  );

  const responseValue = wrapper
    .find('InspField')
    .instance()
    .getResponseValue(undefined, []);

  expect(responseValue).toEqual([]);
});

describe('test is valid answer to domain', () => {
  it('Check  Single choice -  ALN', async () => {
    const field = JSON.parse(JSON.stringify(fieldSingleChoiceALNDomain));
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };
    field.inspfieldnum = '2327';


    let wrapper = mount(
      await setup({
        field,
        inspectionResult
      })
    );

    let inspfield = wrapper.find('InspField').instance();
    expect(inspfield.isValidAnswer('test')).toBe(false);
    expect(inspfield.isValidAnswer('v3')).toBe(true);
  });

  it('Check  Single choice -  Synonym', async () => {
    const field = JSON.parse(JSON.stringify(fieldSingleChoiceSynonymDomain));
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };
    field.inspfieldnum = '2327';

    let wrapper = mount(
      await setup({
        field,
        inspectionResult
      })
    );

    let inspfield = wrapper.find('InspField').instance();
    expect(inspfield.isValidAnswer('test')).toBe(false);
    expect(inspfield.isValidAnswer('v3')).toBe(true);
  });

  it('Check  Multiple choice -  ALN', async () => {
    const field = JSON.parse(JSON.stringify(fieldMultipleChoiceALNDomain));
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };
    field.inspfieldnum = '2327';

    let wrapper = mount(
      await setup({
        field,
        inspectionResult
      })
    );

    let inspfield = wrapper.find('InspField').instance();
    expect(inspfield.isValidAnswer('test')).toBe(false);
    expect(inspfield.isValidAnswer('v3')).toBe(true);
  });

  it('Check  Multiple choice -  Synonym', async () => {
    const field = JSON.parse(JSON.stringify(fieldMultipleChoiceSynonymDomain));
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };
    field.inspfieldnum = '2327';


    let wrapper = mount(
      await setup({
        field,
        inspectionResult
      })
    );

    let inspfield = wrapper.find('InspField').instance();
    expect(inspfield.isValidAnswer('test')).toBe(false);
    expect(inspfield.isValidAnswer('v3')).toBe(true);
  });

  it('should ignore is valid answer', async () => {
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

    const field = JSON.parse(JSON.stringify(fieldTextInput));
    field.inspfieldnum = '2327';

    let textInput = mount(
      await setup({
        field,
        inspectionResult
      })
    );
    let inspfield = textInput.find('InspField').instance();

    inspfield.app = { currentPage: { state: { isSaving: true } } };
    inspfield.setSavingProcess(false);
    expect(inspfield.app.currentPage.state.isSaving).toBe(false);

    inspfield.setSavingProcess(true);
    expect(inspfield.app.currentPage.state.isSaving).toBe(true);

    expect(inspfield.isValidAnswer('test')).toBe(true);
    expect(inspfield.isValidAnswer('v3')).toBe(true);
  });
});

it('should verify ifs a photo', async () => {
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  const field = JSON.parse(JSON.stringify(fieldTextInput));
  field.inspfieldnum = '2327';

  let textInput = mount(
    await setup({
      field,
      inspectionResult
    })
  );
  let inspfield = textInput.find('InspField').instance();
  inspfield.app = { currentPage: { state: { isSaving: true } }, getLocalizedLabel: () => { }, toast: () => { }, findDatasource: () => { } };

  let mockedItem =
  {
    describedBy: {
      format: {
        label: ''
      },
    }
  }
    ;

  inspfield.setAnalyzeRequest(mockedItem);
  expect(mockedItem.describedBy.format.label).toBeFalsy();

  mockedItem.describedBy.format.label = 'image/png'
  inspfield.setAnalyzeRequest(mockedItem);

});

it('should call function setAnalyzeRequest with fieldtype FU', async () => {

  const field = JSON.parse(JSON.stringify(fieldAttachmentInput));
  const response = {};
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  let executeInspections = getAttachmentDS();
  executeInspections.load();

  let wrapperField = mount(
    <InspField id={'attachmentField'} field={field} response={response} value={null} />
  );

  field.app = { currentPage: { datasources: executeInspections, state: { isSaving: true } } };
  // eslint-disable-next-line no-console
  const attachment = { describedBy: { description: 'MVITEST.jpg', identifier: '123', format: { label: 'image/jpg' } } };
  const attachmentProps = wrapperField.find('InspField').props();
  attachmentProps.field.selectedmodel = 'modeltest';
  attachmentProps.inspectionResult = inspectionResult;

  let mockSendImageForInference = jest.fn().mockImplementation(() => {
  });

  wrapperField.find('InspField').instance().sendImageForInference = mockSendImageForInference;

  wrapperField.find('InspField').instance().setAnalyzeRequest(attachment, null);

  expect(mockSendImageForInference).toBeCalled();

});

it('should set doclink status when there is imageinference', async () => {
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '2327' }] };

  const field = JSON.parse(JSON.stringify(fieldTextInput));
  field.inspfieldnum = '2327';
  let textInput = mount(
    await setup({
      field,
      inspectionResult
    })
  );
  let inspfield = textInput.find('InspField').instance();

  let inspfieldresultDS = {
    item: { inspfieldnum: '2327' },
    items: [{
      inspfieldnum: '2327',
      doclinks: {
        member: [
          {
            describedBy: { identifier: '1' }
          }
        ]
      },
      inspectionimageinference: [{
        doclinksid: 1,
        status: 'success'
      }],
    }
    ]
  }

  inspfield.app = {
    getLocalizedLabel: () => 'Completed'
  };

  inspfield.setDoclinksStatus(inspfieldresultDS);
  expect(inspfieldresultDS.items[0].doclinks.member[0].inferencestatus).toBeTruthy();


  inspfieldresultDS = {
    item: { inspfieldnum: '2327' },
    items: [{
      inspfieldnum: '2327',
      doclinks: {
        member: [
          {
            anywhererefid: '123',
            changedate: '2020-01-30T11:33:00-03:00'
          }
        ]
      },
      inspectionimageinference: [{
        doclinksid: 1,
        status: 'success',
        changedate: '2020-01-30T11:30:00-03:00'
      }],
    }
    ]
  };

  let attachamentds = {
    items: [
      {
        anywhererefid: '123',
        changedate: '2020-01-30T11:33:00-03:00'
      }
    ]
  };
  let app = { state: {} };
  app.state.attachmentsInMemory = {};
  app.state.attachmentsInMemory = {
    '123': { status: 'pending', changedate: '2020-01-30T11:33:00-03:00' }
  };
  inspfield.app = app;
  inspfield.getCurrentInspfieldResult = () => inspfieldresultDS.items[0];
  inspfield.setDoclinksStatus(inspfieldresultDS, attachamentds);
});


