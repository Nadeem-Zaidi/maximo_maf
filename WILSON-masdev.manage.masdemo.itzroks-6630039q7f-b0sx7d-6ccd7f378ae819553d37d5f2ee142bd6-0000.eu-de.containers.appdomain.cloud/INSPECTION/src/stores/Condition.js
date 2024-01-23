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

/**
 * Represent condition on its current state
 * This class is used to group source current response and visibility
 * once they come from different places in the data structure
 * A condition is active when its source is visible and
 * matches the expected response
 */

import {log} from '@maximo/maximo-js-api';

const TAG = 'Condition';

const defaultRejectionMessage =
  'The response does not satisfy the validation rule';

class Condition {
  constructor({
    srcfield: srcFieldNum,
    tgtfield: tgtFieldNum,
    srctxtresponse: matchingResponse,
    visible,
    required,
    number1,
    number2,
    operator1,
    operator2,
    inspectorfeedback,
    showmessage,
    requireaction,
    reject
  }) {
    const attributesModifiers = {visible, required};
    this.srcFieldNum = srcFieldNum;
    this.tgtFieldNum = tgtFieldNum;
    this.matchingResponse = matchingResponse; // Expected response
    this.attributesModifiers = attributesModifiers; // Attributes and values to apply
    this.currentSourceResponse = null;
    this.isSrcVisible = false;
    this.number1 = number1;
    this.number2 = number2;
    this.operator1 = operator1;
    this.operator2 = operator2;
    this.inspectorfeedback = inspectorfeedback;
    this.showmessage = showmessage;
    this.requireaction = requireaction;
    this.reject = reject;
  }

  set currentResponse(response) {
    this.currentSourceResponse = response;
  }

  set srcVisibility(isVisible) {
    this.isSrcVisible = isVisible;
  }

  get source() {
    return this.srcFieldNum;
  }

  get target() {
    return this.tgtFieldNum;
  }

  /**
   * Determine type of condition
   */
  get type() {
    return this.reject === true
      ? Condition.type.VALIDATION
      : Condition.type.CASCADE;
  }

  /**
   * @returns boolean
   */
  get hasResponse() {
    let response = this.currentSourceResponse;
    if (typeof response === 'string') {
      response = response.trim();
    } else if (typeof response === 'number') {
      response = !isNaN(response);
    } else if (Array.isArray(response)) {
      response = response.length;
    }
    return !!response;
  }

  get hasMatchingResponse() {
    let matchesCondition = false;

    //if there is two operators, currentSourceResponse must satisfy both at the same time
    if (this.operator1 && this.operator2) {
      matchesCondition =
        this.operationResult(
          this.currentSourceResponse,
          this.operator1,
          this.number1
        ) &&
        this.operationResult(
          this.currentSourceResponse,
          this.operator2,
          this.number2
        );
    } else if (this.operator1) {
      matchesCondition = this.operationResult(
        this.currentSourceResponse,
        this.operator1,
        this.number1
      );
    } else if (Array.isArray(this.currentSourceResponse)) {
      matchesCondition = this.currentSourceResponse.some(
        answer => this.validateFunction && this.validateFunction(this.matchingResponse) && (answer === this.matchingResponse)
      );
    } else {
      matchesCondition = this.validateFunction && this.validateFunction(this.matchingResponse) && (this.currentSourceResponse === this.matchingResponse);
    }
    return matchesCondition;
  }

  get active() {
    return this.hasMatchingResponse && this.isSrcVisible;
  }

  // A rejected field should non-empty response and should NOT match condition
  get isRejected() {
    return Boolean(
      this.type === Condition.type.VALIDATION &&
        !this.active &&
        this.hasResponse
    );
  }

  // Get feedback message depending on condition type
  get message() {
    let message;
    if (this.type === Condition.type.VALIDATION) {
      message = this.inspectorfeedback || defaultRejectionMessage;
    } else {
      message = this.inspectorfeedback;
    }
    return message;
  }

  /**
   * Cascade conditions has optionally message to display
   * Validation conditions must display message
   */
  shouldDisplayMessage() {
    //istanbul ignore else
    if (this.type === Condition.type.VALIDATION) {
      return this.isRejected;
    }
    return Boolean(this.active && this.showmessage && this.inspectorfeedback);
  }

  operationResult(response, operator, number) {
    let result = false;
    //istanbul ignore else
    if (typeof response === 'number') {
      switch (operator) {
        case '<':
          result = response < number;
          break;
        case '>':
          result = response > number;
          break;
        case '=':
          result = response === number;
          break;
        case '<=':
          result = response <= number;
          break;
        case '>=':
          result = response >= number;
          break;
        case '!=':
          result = response !== number;
          break;
        default:
          log.e(TAG, `Operator ${operator} not supported.`);
      }
    }
    return result;
  }

  toString() {
    return `
               Condition from source(${this.srcFieldNum}) 
               aiming(${this.tgtFieldNum}) 
               with expect response (${this.matchingResponse}) 
               is ${this.active ? 'active' : 'inactive'} for 
               has its source ${this.isSrcVisible ? 'visible' : 'not visible'}`;
  }
}

Condition.type = Object.freeze({
  VALIDATION: 0,
  CASCADE: 1
});

export default Condition;
