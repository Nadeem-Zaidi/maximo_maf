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

import InspCompletionSummaryDataController from '../InspCompletionSummaryDataController';
import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page
} from '@maximo/maximo-js-api';

import inspectionsInProgData from './data/inspections-data-inprog';
import inspectionActionsData from './inspection-actions';

function newDatasource(data = inspectionsInProgData, name = 'testds') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'inspectionresultid',
    name: name
  });

  return ds;
}

it('_computeWOTitle returns correct value', async () => {
  const controller = new InspCompletionSummaryDataController();

  let computedValue = controller._computeWOTitle({
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  });
  expect(computedValue).toBe('PM 1234');

  computedValue = controller._computeWOTitle({
    workorder: [
      {
        wonum: '1234'
      }
    ]
  });
  expect(computedValue).toBe('1234');

  computedValue = controller._computeWOTitle({});
  expect(computedValue).toBeNull();
});

it('_computeAssetInfo returns correct value', async () => {
  const controller = new InspCompletionSummaryDataController();

  let computedValue = controller._computeAssetInfo({
    assets: [
      {
        assetnum: 'Asset123'
      }
    ]
  });
  expect(computedValue).toBe('Asset123');

  computedValue = controller._computeAssetInfo({
    assets: [
      {
        assetnum: 'Asset123',
        description: 'Desc'
      }
    ]
  });
  expect(computedValue).toBe('Asset123 Desc');

  computedValue = controller._computeAssetInfo({
    assets: null
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeAssetInfo();
  expect(computedValue).toBeNull();
});

it('_computeLocationInfo returns correct value', async () => {
  const controller = new InspCompletionSummaryDataController();

  let computedValue = controller._computeLocationInfo({
    locations: [
      {
        location: 'Loc123',
        description: null
      }
    ]
  });
  expect(computedValue).toBe('Loc123');

  computedValue = controller._computeLocationInfo({
    locations: [
      {
        location: 'Loc123',
        description: 'Location'
      }
    ]
  });
  expect(computedValue).toBe('Loc123 Location');

  computedValue = controller._computeLocationInfo({
    locations: null
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeLocationInfo();
  expect(computedValue).toBeNull();
});

it('should compute question counter value', async () => {
  const controller = new InspCompletionSummaryDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  const page = new Page();
  page.registerController(controller);
  app.registerPage(page);

  await app.initialize();

  await ds.load();

  let counter = controller._computeQuestionCount();
  expect(counter).toBeNull();

  counter = controller._computeQuestionCount({});
  expect(counter).toBeNull();

  counter = controller._computeQuestionCount({totalquestion: 0});
  expect(counter).toBeNull();

  counter = controller._computeQuestionCount({totalquestion: 10});

  // TODO how to inject Localized to expect '10 questions'
  expect(counter).toEqual(expect.stringMatching(/questions$/));

  counter = controller._computeQuestionCount({totalquestion: 1});

  // TODO how to inject Localized to expect '1 question'
  expect(counter).toEqual(expect.stringMatching(/question$/));
});

it('datasource initialize', async () => {
  // setup a mock application and register out controller
  const controller = new InspCompletionSummaryDataController();
  const app = new Application();
  const ds = newDatasource(inspectionActionsData);
  const page = new Page();
  page.registerController(controller);
  app.registerPage(page);
  ds.registerController(controller);
  app.registerDatasource(ds);
  await app.initialize();
  await ds.load();

  // let's verify that our controller has the datasource, app, and owner
  expect(controller.datasource).toBe(ds);
  expect(controller.app).toBe(app);
  // datasource is at the app level, so owner is the app
  expect(controller.owner).toBe(app);
});
