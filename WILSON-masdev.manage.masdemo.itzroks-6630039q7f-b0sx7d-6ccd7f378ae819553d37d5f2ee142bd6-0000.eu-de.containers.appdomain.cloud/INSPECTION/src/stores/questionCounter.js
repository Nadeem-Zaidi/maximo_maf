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
import { log } from '@maximo/maximo-js-api';

const TAG = 'questionCounter';

/**
 * Attributes
 */
const VIS_AT = 'visible';
const REQ_AT = 'required';
const COMP_AT = 'complete';
/**
 * invalid - Designed for questions that contains
 * fields of meters which are not compatible with for asset/location.
 */
const INV_AT = 'invalid'; 
/**
 * reject - Designed for questions that contains fields with validation
 * configure within conditions settings.
 */
const REJ_AT = 'reject';

/**
 * Map questions
 */
const questionsMap = new Map();

/**
 * Provide initial state
 * rejectedTotalCount - Amount of questions containing visible, valid field but invalid response
 * @returns {object} - initial counter object
 */
const getInitialState = () => ({
    completedCount: 0,
    totalCount: 0,
    requiredCompletedCount: 0,
    requiredTotalCount: 0,
    rejectedTotalCount: 0
});

/**
 * Counter state
 * - total questions
 * - total questions complete
 * - total required questions
 * - total required complete questions
 * - total rejected questions
 */
let state = getInitialState();

/**
 * Stores callback function
 */
let callback = null;

/**
 * Updates object counter
 * @param {*} acc - accumulated state
 * @param {*} curr - current 
 */
const reducer = (acc, curr) => {

    if (curr[VIS_AT] !== true) return acc;

    const newState = {...acc};

    newState.totalCount++;

    // istanbul ignore else
    if (curr[COMP_AT] === true) {
        newState.completedCount++;
    }

    // istanbul ignore else
    if (curr[REQ_AT] === true) {
        newState.requiredTotalCount++;

        // istanbul ignore else
        if(curr[COMP_AT] === true) {
            newState.requiredCompletedCount++;
        }
    }

    // istanbul ignore else
    if (curr[REJ_AT] === true) {
        newState.rejectedTotalCount++;
    }

    return newState;
}

/**
 * Reduce every question to a counter object
 * @param {Map} map - questions map
 * @returns {object} - counter
 */
const reduceQuestions = (map) => {
    let accumulator = getInitialState();

    for (let entry of map.values()) {
        accumulator = reducer(accumulator, entry);
    }

    return accumulator;
}

/**
 * Identify difference between each counter attribute 
 * from the provided object with current state
 * @param {object} newState - next counter state
 * @returns {boolean} - true if there's some difference
 */
const hasChanged = (newState) => {
    return Object.entries(newState).some(
        ([key, val]) => state[key] !== val
    );
}

/**
 * Enforce callback to be called only after certain time 
 * from the last time it was executed
 * @param {function} callback - function to be executed after delay
 * @param {number} wait - debounce delay
 * @returns {function} - closure with debounce callback
 */
const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}

/**
 * Process changes related to counter state
 * Computes a new state; 
 * Compares with current and;
 * Execute callback.
 */
const notifySubscribers = () => {

    const newState = reduceQuestions(questionsMap);

    // istanbul ignore else
    if (hasChanged(newState)) {
        state = newState;
        if (callback) {
            callback(newState);
        } else {
            log.e(TAG, 'No callback registered yet.');
        }
    }
}

/**
 * This manager exposes methods to interact with the counter state
 * It outputs object that represents the execution progress of inspection
 */
const questionCountManager = {

    /**
     * Aliases to expose attributes used
     */
    visibleAtt: VIS_AT,
    requireAtt: REQ_AT,
    completeAtt: COMP_AT,
    invalidAtt: INV_AT,
    rejectAtt: REJ_AT,

    /**
     * Assign callback reference to module
     * @param {func} cb - Callback for state changes
     * @returns {func} returns registered callback
     */
    callbackRegister: (cb) => {

        if (!cb || typeof cb !== "function") {
            log.e(TAG, 'Callback must be a valid function.');
            return callback;
        }

        if (!callback) {
            // Store callback reference provided with 200ms debounce
            callback = debounce(cb, 200);
        }

        return callback;
    },

    /**
     * Add/update map with question attributes
     * Execute callback if necessary
     */
    update: (questionId, attrs) => {
        questionsMap.set(questionId, attrs);
        notifySubscribers();
    },

    /**
     * Remove question from map
     * Execute callback if necessary
     */
    remove: (questionId) => {
        questionsMap.delete(questionId);
        notifySubscribers();
    }
}

export default questionCountManager;
