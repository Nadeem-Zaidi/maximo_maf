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

import * as mxJsApi from '@maximo/maximo-js-api';
import Condition from './Condition';

const getDefaultConditionParameter = () => ({
  srcfield: '001',
  tgtfield: '002',
  srctxtresponse: '',
  number1: 15
});

it('should provide source', () => {
  const cond = new Condition({srcfield: '101'});
  expect(cond.source).toBe('101');
});

it('should provide target', () => {
  const cond = new Condition({tgtfield: '287'});
  expect(cond.target).toBe('287');
});

it('should properly present itself as string', () => {
  const condition = new Condition({
    srcfield: '001',
    tgtfield: '002',
    srctxtresponse: 'myExpectedResponse'
  });
  const stringfiedCondition = condition.toString();
  expect(stringfiedCondition).toEqual(
    expect.stringMatching(/from source\(001\)/i)
  );
});

it('should provide the type of the object', () => {
  let condition = new Condition({reject: true});
  expect(condition.type).toBe(Condition.type.VALIDATION);
  condition = new Condition({});
  expect(condition.type).toBe(Condition.type.CASCADE);
});

it('should display message for rejected validation', () => {
  const condition = new Condition({
    srcfield: '001',
    tgtfield: '002',
    operator1: '>',
    number1: 10,
    reject: true
  });
  condition.srcVisibility = true;
  condition.currentResponse = 9;
  expect(condition.shouldDisplayMessage()).toBe(true);

  condition.currentResponse = 11;
  expect(condition.shouldDisplayMessage()).toBe(false);
});

it('should display message for cascade when response matches rule', () => {
  const condition = new Condition({
    srcfield: '001',
    tgtfield: '002',
    operator1: '>',
    number1: 10,
    showmessage: 1,
    inspectorfeedback: 'That was expected.'
  });
  condition.srcVisibility = true;
  condition.currentResponse = 11;
  expect(condition.shouldDisplayMessage()).toBe(true);

  condition.currentResponse = 10;
  expect(condition.shouldDisplayMessage()).toBe(false);
});

it('should get default message when no message provided for rejected validation', () => {
  const condition = new Condition({
    srcfield: '001',
    tgtfield: '002',
    operator1: '>',
    number1: 1,
    reject: true
  });
  condition.srcVisibility = true;
  condition.currentResponse = 0;
  expect(condition.message).toEqual(
    expect.stringMatching(/not satisfy the validation rule/i)
  );
});

it('should retrieve message for satisfied condition', () => {
  const condition = new Condition({
    srcfield: '001',
    tgtfield: '002',
    operator1: '>',
    number1: 10,
    showmessage: 1,
    inspectorfeedback: 'That was expected.'
  });
  condition.srcVisibility = true;
  condition.currentResponse = 11;
  expect(condition.message).toBe('That was expected.');
});

it('should confirm existence of response based on data type', () => {
  const condition = new Condition({});
  condition.currentResponse = 11;
  expect(condition.hasResponse).toBe(true);
  condition.currentResponse = '';
  expect(condition.hasResponse).toBe(false);
  condition.currentResponse = [];
  expect(condition.hasResponse).toBe(false);
  condition.currentResponse = [1, 2, 3];
  expect(condition.hasResponse).toBe(true);
});

describe('test hasMatchingResponse', () => {
  let condParams;

  beforeEach(() => {
    condParams = getDefaultConditionParameter();
  });

  it('should satisfy less than conditions', () => {
    let numericCond = new Condition({
      ...condParams,
      operator1: '<'
    });
    numericCond.currentResponse = 10;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 16;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should satisfy greater than conditions', () => {
    let numericCond = new Condition({...condParams, operator1: '>'});
    numericCond.currentResponse = 20;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 15;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should satisfy range conditions', () => {
    let numericCond = new Condition({
      ...condParams,
      number1: 15,
      number2: 20,
      operator1: '>',
      operator2: '<'
    });
    numericCond.currentResponse = 16;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = -1;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should satisfy equal conditions', () => {
    let numericCond = new Condition({...condParams, operator1: '='});
    numericCond.currentResponse = 15;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = -15;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should satisfy not equal conditions', () => {
    let numericCond = new Condition({...condParams, operator1: '!='});
    numericCond.currentResponse = 10;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 15;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should satisfy greater than or equal to conditions', () => {
    let numericCond = new Condition({...condParams, operator1: '>='});
    numericCond.currentResponse = 15;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 20;
    result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 14;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should satisfy greater than or equal to conditions', () => {
    let numericCond = new Condition({...condParams, operator1: '<='});
    numericCond.currentResponse = 15;
    let result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 10;
    result = numericCond.hasMatchingResponse;
    expect(result).toBeTruthy();

    numericCond.currentResponse = 16;
    result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
  });

  it('should log error for unknown operator', () => {
    let numericCond = new Condition({...condParams, operator1: 'a#1'});
    const logESpy = jest.spyOn(mxJsApi.log, 'e');
    numericCond.currentResponse = 15;
    const result = numericCond.hasMatchingResponse;
    expect(result).toBe(false);
    expect(logESpy).toHaveBeenCalled();
    logESpy.mockRestore();
  });
});
