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

import {createRef} from 'react';

/**
 * Store refs
 */
const inspfieldresultsRefMap = new Map();
const questionsRefMap = new Map();
const inspectionsRefMap = new Map();

/**
 * Manage Maps that hold references from inspection items,
 * such as form and questions.
 * This module manages the same reference of:
 * - questionRefMap (stores all questions reference)
 * - inspectionRefMap (stores all inspections reference)
 */
const refStore = {
  /**
   * Provide inspFieldResult ref
   * It can also create ref if it doesn't exist yet
   * @param {string} key - map identifier
   * @param {boolean} shouldCreate - flag to create ref if none was found
   * @returns {Object} - ref
   */
  getInspFieldResultRef: (key, shouldCreate = false) => {
    // istanbul ignore else
    if (shouldCreate && !inspfieldresultsRefMap.has(key)) {
      inspfieldresultsRefMap.set(key, createRef());
    }
    return inspfieldresultsRefMap.get(key);
  },

  /**
   * Delete ref entry from fieldsRefMap
   * @param {string} - map identifier
   * @returns {boolean} - true when success
   */
  removeInspFieldResultRef: key => {
    return inspfieldresultsRefMap.delete(key);
  },

  /**
   * Provide question ref
   * It can also create ref if it doesn't exist yet
   * @param {string} key - map identifier
   * @param {boolean} shouldCreate - flag to create ref if none was found
   * @returns {Object} - ref
   */
  getQuestionRef: (key, shouldCreate = false, test) => {
    // istanbul ignore else
    if (shouldCreate && !questionsRefMap.has(key)) {
      questionsRefMap.set(key, createRef());
    }
    return questionsRefMap.get(key);
  },

  /**
   * Delete ref entry from questionsRefMap
   * @param {string} - map identifier
   * @returns {boolean} - true when success
   */
  removeQuestionRef: key => {
    return questionsRefMap.delete(key);
  },

  /**
   * Provide inspection ref
   * It can also create ref if it doesn't exist yet
   * @param {string} key - map identifier
   * @param {boolean} shouldCreate - flag to create ref if none was found
   * @returns {Object} - ref
   */
  getInspectionRef: (key, shouldCreate = false) => {
    // istanbul ignore else
    if (shouldCreate && !inspectionsRefMap.has(key)) {
      inspectionsRefMap.set(key, createRef());
    }
    return inspectionsRefMap.get(key);
  },

  /**
   * Delete ref entry from inspectionsRefMap
   * @param {string} - map identifier
   * @returns {boolean} - true when success
   */
  removeInspectionRef: key => {
    return inspectionsRefMap.delete(key);
  },

  /**
   * For output purpose
   * Override object to string
   * @returns {string} - Object output
   */
  toString: () => {
    return `Ref store with ${questionsRefMap.size} question refs 
            and ${inspectionsRefMap.size} inspection refs`;
  }
};

export default refStore;
