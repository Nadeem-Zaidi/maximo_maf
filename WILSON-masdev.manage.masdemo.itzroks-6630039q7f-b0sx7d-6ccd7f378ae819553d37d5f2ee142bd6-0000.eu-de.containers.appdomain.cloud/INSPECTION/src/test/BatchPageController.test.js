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

import BatchPageController from '../BatchPageController'

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
  Device
} from '@maximo/maximo-js-api';
import inspectionsData, { members } from './data/inspections-data';
import batchlistds from './data/batchlistds-data'
import sinon from 'sinon';
import inspectionsCompletedData from './data/inspections-data-completed';

let controller = null;
let app = null;
let page = null;

beforeEach(() => {
  controller = new BatchPageController();
  app = new Application();
  page = new Page();

  page.registerController(controller);
  app.registerPage(page);
});

it('pageResumed shows toast when ids are not passed', async () => {
  // setup a mock application and register out controller
  const controller = new BatchPageController();
  const app = new Application();
  const page = new Page();

  let spyToast = sinon.spy(app, 'toast');

  const ds = newDatasource(inspectionsData, 'inspectionsData');
  page.registerController(controller);
  page.registerDatasource(ds);
  page.params.inspectionresultid = [1, 2, 3];
  app.registerPage(page);
  app.setCurrentPage(page);
  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');

  spyToast.restore();

  page.params.inspectionresultid = null;
  page.params.href = ['a', 'b', 'c'];
  app.registerPage(page);
  app.setCurrentPage(page);
  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');

  spyToast.restore();

  page.params.inspectionresultid = 1;
  page.params.href = null;
  app.registerPage(page);
  app.setCurrentPage(page);
  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');

  spyToast.restore();
});

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

it('should goBack to main page passing isBatch true when an inspection is completed in the batch', async () => {
  const mockFn = jest.fn();
  
  await app.initialize();
  app.state.completedItems = { 1: 'COMPLETED' }
  const ds = newDatasource(batchlistds, 'batchlistds');
  page.registerDatasource(ds);
  await ds.load();
  app.setCurrentPage = mockFn;
  controller.goBack();
  expect(mockFn).toHaveBeenCalled();
});

it('should change to execution page', async () => {
  const mockFn = jest.fn();
  await app.initialize();

  page.state.selectedDS = 'inspectionsData';
  const ds = newDatasource(inspectionsData, 'inspectionsData');
  page.registerDatasource(ds);

  app.setCurrentPage = mockFn;
  const newMembers = members.filter(i => !('sequence' in i));
  await controller.openBatchInspections(newMembers);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn.mock.calls[0][0].name).toBe('execution_panel');

  const { itemhref } = mockFn.mock.calls[0][0].params;
  expect(itemhref).toContain('oslc/os/mxapiinspectionres/_B-');
});

it('should order batch considering inspectionresultid', async () => {
  const mockFn = jest.fn();
  await app.initialize();

  page.state.selectedDS = 'inspectionsData';
  const ds = newDatasource(inspectionsData, 'inspectionsData');
  page.registerDatasource(ds);

  app.setCurrentPage = mockFn;
  await controller.openBatchInspections(members);

  const { itemhref } = mockFn.mock.calls[0][0].params;

  expect(itemhref[0]).toEqual(members[0].href);
});

it('should execute batch method when there is selection in DS', async () => {
  const mockFn = jest.fn();
  controller.openBatchInspections = mockFn;
  await app.initialize();
  Device.get.isMaximoMobile = false;
  page.state.inspections = [{ inspectionresultid: 1 }]

  await controller.openBatch({ href: 'oslc/os/mxapiinspectionres/_C-' });

  expect(mockFn).toHaveBeenCalled();
});

it('openInspectionInPreviewMode should callsetCurrentPage function', async () => {
  const setCurrentPageSpy = sinon.spy(app, 'setCurrentPage');
  const mockFn = jest.fn();
  await app.initialize();

  page.state.inspections = [{ inspectionresultid: 1 }]
  app.registerPage(page);

  await app.initialize();

  const itemMock = {
    inspectionresultid: 1,
    itemhref: 'href'
  }

  app.setCurrentPage = mockFn;

  controller.openInspectionInPreviewMode(itemMock);
  expect(setCurrentPageSpy.calledOnce).toBeTruthy()

});
