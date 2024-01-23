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
 * ExecutionStore
 * Store data used on execution page
 * ATTENTION: IT DOES NOT REACT TO CHANGES
 */
let store = {};

const storeManager = {
  /**
   * Set field result schema
   * @param {Object} schema - schema from datasource
   */
  setFieldResultSchema: schema => {
    if ('fieldResultSchema' in store) return;
    if (!schema) return;
    //istanbul ignore else
    if (schema.properties && schema.properties.numresponse) {
      schema.properties.numresponse.max =
        Math.pow(10, schema.properties.numresponse.maxLength - 3) - 1;
    }
    store.fieldResultSchema = schema;
  },

  /**
   * Get field result schema
   * @returns {Object} returns stored field result schema
   */
  getFieldResultSchema: () => {
    return store.fieldResultSchema;
  },

  /**
   * Delete field result schema
   */
  deleteFieldResultSchema: () => {
    store = {};
  },

  /**
   * Get property from schema
   * @param {String} propertyName - property name to look on schema
   * @returns {Object} property object if exists
   */
  getProperty(propertyName) {
    let property = null;
    const schema = this.getFieldResultSchema();

    if (typeof propertyName === 'string' && schema && schema.properties) {
      //istanbul ignore else
      if (schema.properties[propertyName]) {
        property = schema.properties[propertyName];
      }
    }
    return property;
  },

  /**
   * Get attribute from property object
   * @param {String} propertyName - property name to call getProperty function
   * @param {String} attributeName - attribute name to look on property object
   * @returns {Any} attribute value if exists
   */
  getAttribute(propertyName, attributeName) {
    let attribute = null;
    const property = this.getProperty(propertyName);

    if (
      property &&
      typeof attributeName === 'string' &&
      property[attributeName]
    ) {
      attribute = property[attributeName];
    }
    return attribute;
  }
};

export default storeManager;
