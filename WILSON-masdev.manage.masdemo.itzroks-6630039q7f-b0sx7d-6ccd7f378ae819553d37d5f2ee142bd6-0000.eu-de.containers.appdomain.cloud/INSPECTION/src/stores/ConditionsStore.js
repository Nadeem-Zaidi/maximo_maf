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

import {UIBus} from '@maximo/react-components';
import Condition from './Condition';

/**
 * TODO Map by Inspections Result. Currently each STORE is designated to the same inspections result. Filters may fail
 * This should hold the conditions state for querying purpose.
 * Based on response a condition could be active.
 *
 * Each condition should contain:
 * - id (inspcascadeoptionid)
 * - source (srcfield, optionally srcquestion)
 * - matching response (srctxtresponse)
 * - target (tgtfield, optionally tgtquestion)
 * - attributes and their values to be set (required: Boolean, visible: Boolean)
 * - active status
 */
class Store {
  constructor(initialState) {
    this.state = initialState;
    this.fieldDefaults = new Map();
  }

  /**
   * Store conditions and update active status
   * based on responses(fieldResults)
   * @param {Array} conditions - List of conditions
   * @param {Array} fieldResults - Responses
   */
  initiate(conditions = [], fieldResults = []) {
    this.setConditions(conditions);
    this.updateConditionsResponse(fieldResults);
    this.fieldDefaults = new Map();
  }

  /**
   * Update conditions based on responses
   * @param {Array} fieldResults - List of responses
   */
  updateConditionsResponse(fieldResults = []) {
     //istanbul ignore else
    if (!fieldResults) return;
    for (let fieldResult of fieldResults) {
      const srcResponse =
        fieldResult.txtresponse ||
        fieldResult.numresponse ||
        fieldResult?.inspfieldresultselection?.map(
          option => option.txtresponse
        );
      this.updateResponse(fieldResult.inspfieldnum, srcResponse);
    }
  }

  /**
   * Fetch conditions by source
   * @param {String} inspfieldnum - field identifier
   * @returns {Array} - Filtered list
   */
  getAffectedBy(inspfieldnum) {
    return this.state.filter(i => i.source === inspfieldnum);
  }

  /**
   * Fetch conditions by target
   * @param {String} inspfieldnum - field identifier
   * @returns {Array} - Filtered list
   */
  getAffects(inspfieldnum) {
    return this.state.filter(i => i.target === inspfieldnum);
  }

  /**
   * Retrieve list of conditions
   */
  getAll() {
    return this.state;
  }

  get hasConditions() {
    return Boolean(this.state.length);
  }

  /**
   * Populates store with conditions
   * @param {Array} conditions - Cascade options from form template
   */
  setConditions(conditions) {
     //istanbul ignore else
    if (!Array.isArray(conditions)) {
      return undefined;
    }
    this.state = !conditions.length
      ? []
      : conditions.map(item => new Condition({...item}));
  }

  /**
   * Update conditions response by source
   * @param {String} srcFieldNum - source field identifier
   * @param {String} srcResponse - source field answer
   */
  updateResponse(srcFieldNum, srcResponse) {
    //get all conditions on inspcascadeoption where srcFieldNum is the srcfield
    const sourceConditions = this.getAffectedBy(srcFieldNum);
     //istanbul ignore else
    if (sourceConditions.length) {
      let payload = {};
      let mutation = null;

      let appliedTargets = {};

      //iterate through all conditions
      for (let condition of sourceConditions) {
        condition.currentResponse = srcResponse;
        let target = this.fieldDefaults.get(condition.target);

         //istanbul ignore else
        if (appliedTargets[condition.target]) {
          continue;
        }
        //find the target field for this condition
        let targetField = target?.field;
         //istanbul ignore else
        if (targetField) {
          //get all active conditions for this target field

          let priorityCondition = this.getPriorityCondition(
            this.getAffects(targetField.inspfieldnum)
          );
          let allActiveConditions = [];
           //istanbul ignore else
          if (priorityCondition) {
            allActiveConditions.push(priorityCondition.attributesModifiers);
          }

          //if condition is active, just apply the mutation
          if (condition.active) {
            mutation = this.getMutation(targetField, allActiveConditions);
            appliedTargets[condition.target] = true;
          }
          //else condition is not active
          else {
            //check if there is any active condition and apply it
             //istanbul ignore else
            if (allActiveConditions.length) {
              mutation = this.getMutation(targetField, allActiveConditions);
            }
            //otherwise, mutate to defaults
            else {
              const fieldDefaults = this.getDefaults(targetField);
              // mutate to defaults
              mutation = this.getMutation(targetField, fieldDefaults);
            }
          }
          //apply the mutation, update the visibility and build the payload
          //istanbul ignore else
          if (mutation) {
            Store.applyMutation(targetField, mutation);
            this.updateVisibility(
              targetField.inspfieldnum,
              targetField.visible
            );
            payload[condition.tgtFieldNum] = mutation;
          }
        }
      }
      //emit update-field to update the target field
      if (Object.keys(payload).length) {
        UIBus.emit('update-field', payload);
      }
    }
  }

  /**
   * Get the priority condition.
   * @param {*} conditions  - source field conditions
   * @param {*} active  - flag to filter active conditions
   * @returns
   */
  getPriorityCondition(conditions) {
    let result = null;
    //istanbul ignore else
    if (conditions?.length) {
      for (let condition of conditions) {
        //istanbul ignore else
        if (!condition.active) {
          continue;
        }
        //istanbul ignore else
        if (!result) {
          result = condition;
        }
        if (
          result.attributesModifiers[Store.REQUIRED_ATTR] &&
          !condition.attributesModifiers[Store.REQUIRED_ATTR]
        ) {
          continue;
        } else if (
          result.attributesModifiers[Store.VISIBLE_ATTR] &&
          !condition.attributesModifiers[Store.VISIBLE_ATTR]
        ) {
          continue;
        } else {
          result = condition;
        }
      }
    }
    return result;
  }

  /**
   * Check if source field needs update
   * @param {String} srcFieldNum - source field identifier
   * @param {String} srcResponse - source field answer
   * @returns {Object} - return object if attributes to be changed
   */
  checkSideEffect(srcFieldNum, srcResponse) {
    let payload = {};
    //get all conditions on inspcascadeoption where srcFieldNum is the srcfield
    const sourceConditions = this.getAffectedBy(srcFieldNum);
     /* istanbul ignore else */
    if (sourceConditions.length) {
      let message = [];
      const alerts = [];
      let hasActiveRequireAction = false;
      const previousRequieredAction = sourceConditions.some(
        condition => condition.requireaction && condition.active
      );
      //iterate through all conditions
      for (let condition of sourceConditions) {
        condition.currentResponse = srcResponse;

        //verifies if payload already exist for current source field
        //istanbul ignore else
        if (!payload[condition.srcFieldNum]) {
          //creates payload with empty message
          payload[condition.srcFieldNum] = {
            message: message,
            alerts: alerts,
            isSrc: true
          };
        }

         //istanbul ignore else
        if (condition.shouldDisplayMessage()) {
          if (condition.type === Condition.type.VALIDATION) {
            alerts.push(condition.message);
          } else {
            message.push(condition.message);
          }
        }
        //istanbul ignore else
        if (condition.active && condition.requireaction) {
          hasActiveRequireAction = true;
        }
      }

       /* istanbul ignore else */
      if (previousRequieredAction !== hasActiveRequireAction) {
        payload[srcFieldNum] = {
          ...payload[srcFieldNum],
          requireaction: hasActiveRequireAction,
          isSrc: true
        };
      }
    }
    return payload;
  }

  hasActiveRejection(srcFieldNum) {
    const sourceConditions = this.getAffectedBy(srcFieldNum);

    const shouldReject = sourceConditions.some(
      condition => condition.isRejected
    );

    return shouldReject;
  }

  /**
   * Update conditions visibility by source
   * @param {String} srcFieldNum - source field identifier
   * @param {Boolean} srcVisibility - source field visible attribute value
   */
  updateVisibility(srcFieldNum, isVisible) {
    // Find conditions by src
    const sourceConditions = this.getAffectedBy(srcFieldNum);

    for (let condition of sourceConditions) {
      condition.srcVisibility = isVisible;
    }
  }

  /**
   * Diffs current attribute state with suggested
   * Determine if there's any mutation to happen based on expected
   * by conditions or defaults
   * @param {Object} inspfield - form field
   * @returns {Object | null} - Delta of attribute changes
   */
  getMutation(field, conditions) {
     //istanbul ignore else
    if (!field || !conditions) return null;

     //istanbul ignore else
    if (!Array.isArray(conditions)) {
      conditions = [conditions];
    }

    const attrDelta = {};

    for (let attribute of Store.attributes) {
      if (attribute in field) {
        const conditionedAttributeValue = conditions.some(
          item => item[attribute] === true
        );
        //istanbul ignore else
        if (field[attribute] !== conditionedAttributeValue) {
          attrDelta[attribute] = conditionedAttributeValue;
        }
      }
    }
    return Object.keys(attrDelta).length ? attrDelta : null;
  }

  /**
   * Store field default attributes if not stored
   * @param {Object} field - form field
   */
  storeDefaults(field , validateFunction) {
    if (!field) return;
    
    let conditions = this.getAffectedBy(field.inspfieldnum) || [];
    conditions.forEach(
      condition => {
        condition.validateFunction = validateFunction;
      });

    this.updateVisibility(field.inspfieldnum, field.visible);

    if (
      !(Store.keyAttribute in field) ||
      this.fieldDefaults.has(field[Store.keyAttribute])
    ) {
      return;
    }

    const defaults = {};
    for (let attribute of Store.attributes) {
      if (attribute in field) {
        defaults[attribute] = field[attribute];
      }
    }
    defaults.field = field;
    this.fieldDefaults.set(field[Store.keyAttribute], defaults);
  }

  /**
   * Retrieve field default attributes if stored
   * @param {Object} field - form field
   * @returns {Object} - field default attributes
   */
  getDefaults(field) {
    return this.fieldDefaults.get(field[Store.keyAttribute]);
  }

  /**
   * Determine if there's any mutation to happen based on conditions
   * Apply conditions when:
   * - Exist active conditions and there's mutation identified;
   * Mutates both from default to conditions and conditioned to defaults
   * @param {Object} field - form field
   * @returns {Object} - mutation identified
   */
  processConditions(field) {
    let mutation = null;

    if (!field || !this.hasConditions) return mutation;

    let priorityCondition = this.getPriorityCondition(
      this.getAffects(field.inspfieldnum)
    );
    let activeConditions = [];

    if (priorityCondition) {
      activeConditions.push(priorityCondition);
    }

    const activeConditionsToApply = activeConditions?.map(
      i => i.attributesModifiers
    );

    if (!activeConditionsToApply?.length) {
      const fieldDefaults = this.getDefaults(field);
      // mutate to defaults
      mutation = this.getMutation(field, fieldDefaults);
    } else {
      // mutate to conditons
      mutation = this.getMutation(field, activeConditionsToApply);
    }

    /* istanbul ignore else */
    if (mutation) {
      Store.applyMutation(field, mutation);
      /* istanbul ignore else */
      if (Store.VISIBLE_ATTR in mutation) {
        this.updateVisibility(field.inspfieldnum, mutation[Store.VISIBLE_ATTR]);
      }
    }
    return mutation;
  }

  /**
   * Update field attributes according to mutation object
   * @param {Object} field - form field
   * @param {Object} mutation - attributes and values to be mutate
   */
  static applyMutation(field = {}, mutation = {}) {
    for (let attribute of Store.attributes) {
      if (attribute in mutation && field[attribute] !== mutation[attribute]) {
        field[attribute] = mutation[attribute];
      }
    }
  }
}

Store.VISIBLE_ATTR = 'visible';
Store.REQUIRED_ATTR = 'required';
Store.attributes = [Store.VISIBLE_ATTR, Store.REQUIRED_ATTR];
Store.keyAttribute = 'inspfieldnum';

export {Store};
const ConditionsStore = new Store([]);
export default ConditionsStore;
