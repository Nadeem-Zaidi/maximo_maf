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

import InspCompletionSummaryPageController from '../InspCompletionSummaryPageController';
import {
  JSONDataAdapter,
  Datasource,
  Application,
  AppSwitcher,
  Page
} from '@maximo/maximo-js-api';
import sinon from 'sinon';

import inspectionsInProgData from './data/inspections-data-inprog';
import InspectionsList from '../components/common/InspectionsList';

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

let app, page, controller;

beforeEach(() => {
  controller = new InspCompletionSummaryPageController();
  app = new Application();
  page = new Page();

  page.registerController(controller);
  app.registerPage(page);
});

it('pageResumed shows toast when ids are not passed', async () => {
  // setup a mock application and register out controller
  let spyToast = sinon.spy(app, 'toast');

  const ds = new Datasource(new JSONDataAdapter(), {
    idAttribute: 'inspectionresultid',
    name: 'inspcompletionsummaryds'
  });

  page.registerDatasource(ds);
  page.params.inspectionresultid = [1, 2, 3];
  app.setCurrentPage(page);

  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');
  expect(page.state.displayMessage).toBeUndefined();
  spyToast.restore();
});

it('should get next from queue and return to execution page', async () => {
  const mockFnNext = jest.fn();
  const mockFnSetPage = jest.fn();
  const queue = new InspectionsList([1, 2]);

  await app.initialize();

  app.state.inspectionsList = queue;
  queue.next = mockFnNext;
  app.setCurrentPage = mockFnSetPage;

  controller.doneHandler();

  // Expect next method to be called
  expect(mockFnNext).toHaveBeenCalled();
  // Expect setpage with execution_panel as parameter
  expect(mockFnSetPage).toHaveBeenCalled();

  mockFnNext.mockRestore();
  mockFnSetPage.mockRestore();
});

it('doneHandler should call goBackToBatchDetailsPage when isBatchPreview is true', async () => {
  const mockFnNext = jest.fn();
  const mockFnSetPage = jest.fn();
  const mockFnGoBackToBatchDetailsPage = jest.fn();
  const queue = new InspectionsList([1]);

  await app.initialize();

  app.state.inspectionsList = queue;
  // queue.next = mockFnNext;
  app.setCurrentPage = mockFnSetPage;
  page.params.isBatchPreview = true;

  controller.doneHandler();

  app.setCurrentPage = mockFnSetPage;

  // Expect GoBackToBatchDetailsPage with execution_panel as parameter and isBatchPreview
  expect(mockFnSetPage).toHaveBeenCalled();  

  mockFnNext.mockRestore();
  mockFnSetPage.mockRestore();
  mockFnGoBackToBatchDetailsPage.mockRestore();
});

it('showInspList show selected page', async () => {
  // setup a mock application and register out controller
  const mainPage = new Page({
    name: 'main',
    clearStack: false
  });

  mainPage.registerController(controller);

  await app.initialize();
  controller.showInspList();

  app.registerPage(mainPage);

  controller.showInspList();
  expect(controller.page).toBeTruthy();
});

it('showInspList should call returnToApplication when there is context', async () => {
  app.appSwitcher.state.returnToAppData = 'TECHMOBILE';
  let switcher = AppSwitcher.get();
  const returnApp = sinon.spy(switcher, 'returnToApplication');
  app.setCurrentPage(page);
  await app.initialize();

  // returnToApplication should be called
  controller.showInspList();
  expect(returnApp.called).toBe(true);
});

it('takeAction calls invokeAction', async () => {
  // setup a mock application and register out controller
  const ds = newDatasource(inspectionsInProgData, 'inspcompletionsummaryds');

  ds.registerController(controller);
  page.registerDatasource(ds);

  await app.initialize();
  let result = await ds.load({
    objectStructure: 'mxapiinspectionres'
  });

  app.setCurrentPage(page);
  controller.pageInitialized(page, app);

  // mock the invokeAction
  let mockInvokeAction = await jest.fn().mockImplementation(() => {
    let actionResult = {displaymessage: 'Hello World'};
    return actionResult;
  });

  ds.invokeAction = mockInvokeAction;

  //let's pass a item
  const inspection = result[0];

  let args = {inspection: inspection, action: 'DISPLAYMESSAGE'};

  controller.takeAction(args);

  expect(mockInvokeAction).toBeCalled();

  mockInvokeAction = await jest.fn().mockImplementation(() => {
    let actionResult = {};
    return actionResult;
  });

  ds.invokeAction = mockInvokeAction;

  controller.takeAction(args);

  expect(mockInvokeAction).toBeCalled();
});

it('takeAction calls invokeAction and throws an error', async () => {
  // setup a mock application and register out controller
  const ds = newDatasource(inspectionsInProgData, 'inspcompletionsummaryds');

  ds.registerController(controller);
  page.registerDatasource(ds);

  await app.initialize();
  let result = await ds.load({
    objectStructure: 'mxapiinspectionres'
  });

  app.setCurrentPage(page);
  controller.pageInitialized(page, app);

  //let's pass a item
  const inspection = result[0];
  let args = {inspection: inspection, action: 'DISPLAYMESSAGE'};

  let mockInvokeActionError = await jest
    .fn()
    .mockRejectedValue(new Error('Action error'));

  ds.invokeAction = mockInvokeActionError;

  controller.takeAction(args);

  expect(mockInvokeActionError).toBeCalled();
});
