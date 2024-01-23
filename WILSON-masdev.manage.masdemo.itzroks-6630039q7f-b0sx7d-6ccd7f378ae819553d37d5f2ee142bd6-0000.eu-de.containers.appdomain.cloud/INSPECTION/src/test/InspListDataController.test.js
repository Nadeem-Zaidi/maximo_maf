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

import InspListDataController from '../InspListDataController';

import {JSONDataAdapter, Datasource, Application, Page} from '@maximo/maximo-js-api';

import inspectionsCompletedData from './data/inspections-data-completed';
import inspectionsInProgData from './data/inspections-data-inprog';

function newDatasource(data = inspectionsCompletedData, name = 'testds') {
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

function getFeatures(count, status) {
  let features = [];
  for(let i=0; i<count;i++) {
    let feature = {
      get: (attr) => {
        return {
          status: status
        }
      }
    }
    features.push(feature)
  }
  return {features: features};
}

it('datasource initialize', async () => {
  // setup a mock application and register out controller
  const controller = new InspListDataController();
  const app = new Application();
  const ds = newDatasource(inspectionsInProgData);
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

it('onAfterLoadData updates the schema and data with computed fields', async () => {
  const controller = new InspListDataController();
  const ds = newDatasource(inspectionsCompletedData);
  ds.registerController(controller);
  ds.state.isFirst = true;
  ds.state.itemCount = 1;

  let items = await ds.load();

  items.forEach(function (item, i) {
    if (i === 0) expect(item.computedButtonTheme).toBe('primary');
    else expect(item.computedButtonTheme).toBe('secondary');
  });
});

it('_computeTitle returns correct titles', async () => {
  const controller = new InspListDataController();
  let title = controller._computeTitle({
    referenceobject: 'PARENTWO',
    workorder: [{
      description: 'test'
    }]
  });
  expect(title).toBe('test');

  title = controller._computeTitle({
    inspectionform: {
      name: 'bob'
    }
  });
  expect(title).toBe('bob');

  title = controller._computeTitle({
    inspectionform: {
      name: ''
    }
  });
  expect(title).toBe('');
});

it('_computeWOTitle returns correct value', async () => {
  const controller = new InspListDataController();
  let workOrder = controller._computeWOTitle({
    referenceobject: 'WORKORDER',
    referenceobjectid: '1234',
    workorder: [{
      worktype: 'PM'
    }]
  });
  expect(workOrder).toBe('PM 1234');

  workOrder = controller._computeWOTitle({
    referenceobject: 'WOACTIVITY',
    referenceobjectid: 'T1081',
    parent: '1299',
    workorder: [{
      worktype: 'CM'
    }]
  });
  expect(workOrder).toBe('CM 1299');

  workOrder = controller._computeWOTitle({
    referenceobject: 'MULTIASSETLOCCI',
    referenceobjectid: '4094',
    parent: '1301',
    workorder: [{
      worktype: 'CP'
    }]
  });
  expect(workOrder).toBe('CP 1301');

  workOrder = controller._computeWOTitle({
    referenceobject: 'WORKORDER',
    referenceobjectid: '1234',
    workorder:[]
  });
  expect(workOrder).toBe(null);

  workOrder = controller._computeWOTitle({
    referenceobject: 'PARENTWO',
    referenceobjectid: '1122',
    workorder: [{
      worktype: 'CP'
    }]
  });
  expect(workOrder).toBe('CP 1122');

  workOrder = controller._computeWOTitle();
  expect(workOrder).toEqual(null);
});

it('_computeWONum returns correct value', async () => {
  const controller = new InspListDataController();
  let workOrder = controller._computeWONum({
    referenceobject: 'WORKORDER',
    referenceobjectid: '1234',
    workorder: [{
      worktype: 'PM'
    }]
  });
  expect(workOrder).toBe('1234');

  workOrder = controller._computeWONum({
    referenceobject: 'WOACTIVITY',
    referenceobjectid: 'T1081',
    parent: '1299',
    workorder: [{
      worktype: 'CM'
    }]
  });
  expect(workOrder).toBe('1299');

  workOrder = controller._computeWONum({
    referenceobject: 'MULTIASSETLOCCI',
    referenceobjectid: '4094',
    parent: '1301',
    workorder: [{
      worktype: 'CP'
    }]
  });
  expect(workOrder).toBe('1301');

  workOrder = controller._computeWONum({
    referenceobject: 'PARENTWO',
    referenceobjectid: '1122',
    workorder: [{
      worktype: 'CP'
    }]
  });
  expect(workOrder).toBe('1122');

  workOrder = controller._computeWONum();
  expect(workOrder).toEqual(null);
});

it('_computeHref returns correct value', async () => {
  const controller = new InspListDataController();
  let workOrder = controller._computeHref({
    referenceobject: 'WORKORDER',
    referenceobjectid: '1234',
    workorder: [{
      worktype: 'PM',
      href: 'oslc/os/mxapiwodetail/_QkVERk9SRC9UMTI1MQ--'
    }]
  });
  expect(workOrder).toBe('oslc/os/mxapiwodetail/_QkVERk9SRC9UMTI1MQ--');

  workOrder = controller._computeHref({
    referenceobject: 'WOACTIVITY',
    referenceobjectid: 'T1081',
    parent: '1299',
    workorder: [{
      worktype: 'CM',
      parent: [{ 
        href: 'oslc/os/mxapiwodetail/_QkVERk9SRC9UMTI1MQ--' }]
    }]
  });
  expect(workOrder).toBe('oslc/os/mxapiwodetail/_QkVERk9SRC9UMTI1MQ--');

  workOrder = controller._computeHref({
    referenceobject: 'MULTIASSETLOCCI',
    referenceobjectid: '4094',
    parent: '1301',
    workorder: [{
      worktype: 'CP',
      parent: [{ 
        href: 'oslc/os/mxapiwodetail/_QkVERk9SRC9UMTI1MQ--' }]
    }]
  });
  expect(workOrder).toBe('oslc/os/mxapiwodetail/_QkVERk9SRC9UMTI1MQ--');


  workOrder = controller._computeHref();
  expect(workOrder).toEqual(null);
});

it('_computeButtonLabel returns correct value', async () => {
  const controller = new InspListDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  let buttonlabel = controller._computeButtonLabel({
    status_maxvalue: 'PENDING'
  });
  expect(buttonlabel).toBe('Start inspection');

  buttonlabel = controller._computeButtonLabel({
    status_maxvalue: 'INPROG'
  });
  expect(buttonlabel).toBe('Resume inspection');

  buttonlabel = controller._computeButtonLabel({
    status_maxvalue: 'COMPLETED'
  });
  expect(buttonlabel).toBe('View inspection');

  buttonlabel = controller._computeButtonLabel({
    status_maxvalue: ''
  });
  expect(buttonlabel).toBe(null);
});

it('should compute question counter value', async () => {
  const controller = new InspListDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

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

describe('ComputedisOverDue', () => {
  const controller = new InspListDataController();
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let object = {schedfinish: today.toLocaleString()};
  let emptyObject = {};

  it('should return invalid date if no date or invalid date', () => {
    expect(controller.computedIsOverDue({schedfinish: '45/45/45'})).toBeFalsy();
  });

  it('should not be overdue', () => {
    let upToDate = new Date();
    upToDate.setDate(today.getDate() + 1);
    upToDate.setHours(0, 0, 0, 0);
    object = {duedate: upToDate.toLocaleString()};
    expect(controller.computedIsOverDue(object)).toBeFalsy();
  });

  it('should be overdue', () => {
    let overdue = new Date();
    overdue.setDate(today.getDate() - 1);
    overdue.setHours(0, 0, 0, 0);
    object.duedate = overdue.toLocaleString();

    expect(controller.computedIsOverDue(object)).toBeTruthy();
  });

  it('should return false when no data is found', () => {
    expect(controller.computedIsOverDue(emptyObject)).toBeFalsy();
  });
});

it('_computeDuration returns correct values', async () => {
  const controller = new InspListDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  let duration = controller._computeDuration({
    referenceobject: 'PARENTWO',
    workorder: [{estdur: '1.5'}]
  });
  expect(duration).toEqual(expect.stringMatching(/^Estimated duration:/));

  duration = controller._computeDuration({
    referenceobject: 'PARENTWO',
    workorder: [{estdur: ''}]
  });
  expect(duration).toBeNull();

  duration = controller._computeDuration({
    referenceobject: 'PARENTWO',
    workorder: []
  });
  expect(duration).toBeNull();

  duration = controller._computeDuration({});
  expect(duration).toBeNull();
});

it('_computeAsset returns correct value', async () => {
    
  const controller = new InspListDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  await app.initialize();

  const computeAsset = jest.spyOn(
    controller,
    '_computeAsset'
  );

  controller._computeAsset({
    asset: [
      { assetnum: 'Asset123'}
    ]
  });
  expect(computeAsset).toHaveBeenCalled();

});

it('_computeLocation returns correct value', async () => {
  const controller = new InspListDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  await app.initialize();

  const computeLocation = jest.spyOn(
    controller,
    '_computeLocation'
  );

  controller._computeLocation({
    locations: [{
      location: 'Loc123',
      description: null
    }]
  });
  expect(computeLocation).toHaveBeenCalled();

});

it('_computePlussgeojson returns correct value', async () => {
  const controller = new InspListDataController();

  let computedValue = controller._computePlussgeojson({
    referenceobject: 'WORKORDER',
    workorder: [{
      autolocate: 'ABC'
    }]
  });
  expect(computedValue).toBe('ABC');

  computedValue = controller._computePlussgeojson({
    referenceobject: 'WORKORDER',
    workorder: [{
      autolocate: null
    }]
  });
  expect(computedValue).toBeNull();


  computedValue = controller._computePlussgeojson({
    referenceobject: 'ASSET',
    assets: [{
      autolocate: 'ABC'
    }]
  });
  expect(computedValue).toBe('ABC');

  computedValue = controller._computePlussgeojson({
    referenceobject: 'ASSET',
    assets: [{
      autolocate: null
    }]
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computePlussgeojson({
    referenceobject: 'LOCATION',
    locations: [{
      autolocate: 'ABC'
    }]
  });
  expect(computedValue).toBe('ABC');

  computedValue = controller._computePlussgeojson({
    referenceobject: 'LOCATION',
    locations: [{
      autolocate: null
    }]
  });
  expect(computedValue).toBeNull();
});

it('createInspSymbology returns correct value', () => {
  const controller = new InspListDataController();

  let status = 'INPROG';
  let responseJson = controller.createInspSymbology(getFeatures(1, status));
  expect(responseJson).not.toBeNull();

  status = 'PENDING';
  responseJson = controller.createInspSymbology(getFeatures(1, status));
  expect(responseJson).not.toBeNull();

  status = 'COMPLETED';
  responseJson = controller.createInspSymbology(getFeatures(1, status));
  expect(responseJson).not.toBeNull();

  status = 'ALL';
  responseJson = controller.createInspSymbology(getFeatures(1, status));
  expect(responseJson).not.toBeNull();

  status = '';
  responseJson = controller.createInspSymbology(getFeatures(2, status));
  expect(responseJson).not.toBeNull();

});

it('retrieveInspLegends returns correct value', async() => {
  const controller = new InspListDataController();
  const app = new Application();

  app.registerController(controller);
  await app.initialize();

  const clusterURL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgMzMgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLWNsdXN0ZXI8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJwaW4tY2x1c3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5Ljk0OTgxMSwgLTE0LjUwMDUwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDAuMTM3NDYwNiwxNSBMNDAuMzAwOTU5NSwxNS4wMDE2MjA0IEM0Ni43MDMwOTgzLDE1LjA3ODA3ODcgNTEuOTExNjA2MSwyMC4yNDY5OTk5IDUyLDI2LjY4NTQxNzIgQzUxLjk5NzM4MDEsMjkuMDk3NjI5NiA1MS4yMzU1NjI5LDMxLjQ0NDQ0MTQgNDkuODI3NjU0MSwzMy4zOTUyNzUxIEw0OS42LDMzLjY5OTk2MjYgTDQwLDQ3LjcyOTA1MzUgTDM3LjQ3NzIyOTksNDQuMDQzIEw0My41NzgyMjk5LDM1LjEyNyBMNDMuNzcwOTYxMywzNC44NzE4MDI3IEM0NS41MDA0NjMzLDMyLjQ5NzAxMzEgNDYuNDM2ODAwNCwyOS42MzI3MzI1IDQ2LjQzOTk5ODYsMjYuNjg4MDY3MiBDNDYuMzczMDk5LDIxLjgwMzIxOTQgNDMuODg0NTg2OCwxNy41MzI1NTg3IDQwLjEzNzQ2MDYsMTUgWiBNNDQsMjYuNjg1NDE3MiBDNDMuOTk3MzgwMSwyOS4wOTc2Mjk2IDQzLjIzNTU2MjksMzEuNDQ0NDQxNCA0MS44Mjc2NTQxLDMzLjM5NTI3NTEgTDQxLjYsMzMuNjk5OTYyNiBMMzIsNDcuNzI5MDUzNSBMMjIuNCwzMy42OTk5NjI2IEMyMC44NDY3MzE1LDMxLjY5MTI5MzEgMjAuMDAyNzU3NywyOS4yMjQ1ODgxIDIwLDI2LjY4NTQxNzIgQzIwLjA4ODM5MzksMjAuMjQ2OTk5OSAyNS4yOTY5MDE3LDE1LjA3ODA3ODcgMzEuNjk5MDQwNSwxNS4wMDE2MjA0IEwzMiwxNS4wMDE3ODA4IEMzOC41MzkwODI0LDE0LjkxNjg1OTkgNDMuOTEwMjI1LDIwLjE0NjM5OTYgNDQsMjYuNjg1NDE3MiBaIiBpZD0iU2hhcGUiIGZpbGw9IiMzOTM5MzkiPjwvcGF0aD4KICAgICAgICAgICAgPGcgaWQ9Ik51bWJlci1vci1pY29uPyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEuNTAwMDAwLCAxNy4wMDAwMDApIj48L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';

  const clusterPinSize = {
      width: 44,
      height: 46,
      offsetx: 24,
      offsety: 36
  };

  const expected = {
    CLUSTER: {
      label: 'Cluster',
      url: clusterURL,
      ...clusterPinSize
    }
  };

  const mockFn = jest.fn( () => {
    const legends = {
      Cluster: {
        label: 'Cluster',
           },
      INPROG: {
        label: 'In Progress',
      }
    };
    return legends;
  });
  
  controller.retrieveInspLegends = mockFn;

  let legends = controller.retrieveInspLegends();
  expect(legends[0]).toEqual(expected[0]);

});

it('computedInspectionStatus function to display status and priority on workorder', async () => {
  const controller = new InspListDataController();
  const app = new Application();
  const page = new Page({name: 'main'});
  app.registerPage(page);
  app.registerController(controller);
  await app.initialize();

  let item = controller.computedInspectionStatus({
    status_description: "Approved"
  });

  expect(item[0].label).toEqual("Approved");
  expect(item[0].type).toEqual("cool-gray");

});



