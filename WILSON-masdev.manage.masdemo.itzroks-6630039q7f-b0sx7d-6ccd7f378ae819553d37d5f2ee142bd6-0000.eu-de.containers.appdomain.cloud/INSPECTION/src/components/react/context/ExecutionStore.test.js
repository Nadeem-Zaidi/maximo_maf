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

import executionStore from './ExecutionStore';
import {fieldResultSchema} from '../InspField/TestUtils';

afterEach(() => {
  executionStore.deleteFieldResultSchema();
});

it('without schema', () => {
  executionStore.setFieldResultSchema();
  let schema = executionStore.getFieldResultSchema();
  expect(schema).toBe(undefined);
});

it('with schema already set', () => {
  executionStore.setFieldResultSchema(fieldResultSchema);
  let schema1 = executionStore.getFieldResultSchema();
  executionStore.setFieldResultSchema(fieldResultSchema);
  let schema2 = executionStore.getFieldResultSchema();
  expect(schema1).toBe(schema2);
});

it('without numresponse', () => {
  executionStore.setFieldResultSchema(fieldResultSchema);
  const schema = JSON.parse(JSON.stringify(fieldResultSchema));

  //initial setup
  delete schema.properties.numresponse;

  let getSchema = executionStore.getFieldResultSchema();
  expect(Object.keys(getSchema).length).toBe(1);
});

it('should set field result schema', () => {
  executionStore.setFieldResultSchema(fieldResultSchema);
  let schema = executionStore.getFieldResultSchema();
  expect(schema.properties.numresponse.maxLength).toBe(16);
  expect(schema.properties.numresponse.max).toBe(9999999999999);

  expect(schema.properties.txtresponse.maxLength).toBe(250);
});

describe('test getProperty function', () => {
  it('without schema', () => {
    const property = executionStore.getProperty('txtresponse');
    expect(property).toBe(null);
  });

  it('with schema and valid property', () => {
    executionStore.setFieldResultSchema(fieldResultSchema);
    const property = executionStore.getProperty('txtresponse');
    expect(property).toBe(fieldResultSchema.properties.txtresponse);
  });

  it('with schema and invalid property', () => {
    executionStore.setFieldResultSchema(fieldResultSchema);

    let property = executionStore.getProperty(null);
    expect(property).toBe(null);

    property = executionStore.getProperty({});
    expect(property).toBe(null);

    property = executionStore.getProperty(100);
    expect(property).toBe(null);
  });
});

describe('test getAttribute function', () => {
  it('with valid attribute', () => {
    executionStore.setFieldResultSchema(fieldResultSchema);

    const attribute = executionStore.getAttribute('txtresponse', 'maxLength');
    expect(attribute).toBe(fieldResultSchema.properties.txtresponse.maxLength);
  });

  it('with invalid attribute', () => {
    let attribute = executionStore.getAttribute(null, 'maxLength');
    expect(attribute).toBe(null);

    attribute = executionStore.getAttribute({}, 'maxLength');
    expect(attribute).toBe(null);

    attribute = executionStore.getAttribute(100, 'maxLength');
    expect(attribute).toBe(null);
  });
});
