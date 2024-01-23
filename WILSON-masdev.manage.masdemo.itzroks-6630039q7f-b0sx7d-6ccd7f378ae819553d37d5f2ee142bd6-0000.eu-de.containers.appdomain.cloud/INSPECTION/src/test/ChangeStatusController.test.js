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

import ChangeStatusController from '../ChangeStatusController';
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource
} from '@maximo/maximo-js-api';
import statusitem from './data/statuses-json-data.js';
import BatchinprogData from './data/batch-data-inprog.js';
import sinon from 'sinon';

import AppController from '../AppController';

function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
    src: statusitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name
  });

  return ds;
}

function newBatchDatasource(data = BatchinprogData, name = 'assignedworkds') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member'
  });
  const ds = new Datasource(da, {
    name: name
  });
  return ds;
}

it('SelectStatus', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new ChangeStatusController();
  const app = new Application();
  const page = new Page({name: 'page'});
  page.registerController(controller);
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage;
  app.registerController(controller);
  const dsstatusDomainList = newStatusDatasource(
    statusitem,
    'dsstatusDomainList'
  );
  parentPage.registerDatasource(dsstatusDomainList);

  await app.initialize();
  let item = {value: 'APPR'};
  page.parent.datasources.dsstatusDomainList.setSelectedItem(item, true);

  app.setCurrentPage = mockSetPage;
  controller.dialogInitialized(page, app);
  await controller.selectStatus(item);
  expect(page.state.selectedStatus).toBeTruthy();
  expect(page.parent.state.disableDoneButton).toBe(false);
  controller.dialogOpened(page, app);

  page.parent.datasources.dsstatusDomainList.setSelectedItem(item, false);

  await controller.selectStatus(item);
  expect(page.parent.state.disableDoneButton).toBe(true);
});

it('Archive Parent Test - not all siblings archieved', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const appController = new AppController();

  const controller = new ChangeStatusController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.registerController(appController);
  page.registerController(controller);
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage;
  app.registerPage(page);
  app.registerPage(parentPage);
  const dsstatusDomainList = newStatusDatasource(
    statusitem,
    'dsstatusDomainList'
  );
  parentPage.registerDatasource(dsstatusDomainList);

  app.registerController(controller);
  const assignedworkds = newBatchDatasource();
  page.registerDatasource(assignedworkds);
  app.registerDatasource(assignedworkds);

  const mockForceReload = jest.fn();
  let items = await assignedworkds.load();
  assignedworkds.forceReload = mockForceReload;
  const mockedFn = jest.fn();
  await app.initialize();
  app.callController = mockedFn;
  let callController = sinon.stub(app, 'callController').returns(items[3]);

  page.parent.state.appVar = app;

  let item = assignedworkds.items[1];
  app.setCurrentPage = mockSetPage;
  controller.dialogInitialized(page, app);

  await controller.archiveBatch(item);
  expect(callController.called).toBe(true);
  expect(callController.displayName).toBe('callController');
});

it('Archive Parent Test - all siblings archieved', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const appController = new AppController();

  const controller = new ChangeStatusController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.registerController(appController);
  page.registerController(controller);
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage;
  app.registerPage(page);
  app.registerPage(parentPage);
  const dsstatusDomainList = newStatusDatasource(
    statusitem,
    'dsstatusDomainList'
  );
  parentPage.registerDatasource(dsstatusDomainList);

  app.registerController(controller);
  const assignedworkds = newBatchDatasource();
  page.registerDatasource(assignedworkds);
  app.registerDatasource(assignedworkds);

  const mockForceReload = jest.fn();
  let items = await assignedworkds.load();
  assignedworkds.forceReload = mockForceReload;

  await app.initialize();

  let callSave = sinon.stub(assignedworkds, 'save').returns(items[3]);

  page.parent.state.appVar = app;

  let item = assignedworkds.items[3];
  app.setCurrentPage = mockSetPage;
  controller.dialogInitialized(page, app);

  await controller.archiveBatch(item);
  expect(callSave.displayName).toBe('save');

  await await controller.archiveBatch({});
  expect(callSave.args.length).toBe(1);
});

it('Archive Children Test', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const appController = new AppController();

  const controller = new ChangeStatusController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.registerController(appController);
  page.registerController(controller);
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage;
  app.registerPage(page);
  app.registerPage(parentPage);
  const dsstatusDomainList = newStatusDatasource(
    statusitem,
    'dsstatusDomainList'
  );
  parentPage.registerDatasource(dsstatusDomainList);

  app.registerController(controller);
  const assignedworkds = newBatchDatasource();
  page.registerDatasource(assignedworkds);
  app.registerDatasource(assignedworkds);

  const mockForceReload = jest.fn();
  await assignedworkds.load();
  
  await app.initialize();

  page.parent.state.appVar = app;
  
  let item = assignedworkds.items[0];
  app.setCurrentPage = mockSetPage;
  controller.dialogInitialized(page, app);
  let mockedClear = jest.fn()
  controller.clearSearch = mockedClear
  assignedworkds.forceReload = mockForceReload;
  let selectedDatasource =  assignedworkds
  page.parent.state.referenceDS = 'assignedworkds'
  //this.page.state.selectedStatus;
  selectedDatasource.forceReload = mockForceReload
  await controller.archiveBatchChildren(item);

  expect(mockedClear).toHaveBeenCalled();

})

it('Cancel parent Test', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const appController = new AppController();

  const controller = new ChangeStatusController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.registerController(appController);
  page.registerController(controller);
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage;
  app.registerPage(page);
  app.registerPage(parentPage);
  const dsstatusDomainList = newStatusDatasource(
    statusitem,
    'dsstatusDomainList'
  );
  parentPage.registerDatasource(dsstatusDomainList);

  app.registerController(controller);
  const assignedworkds = newBatchDatasource();
  page.registerDatasource(assignedworkds);
  app.registerDatasource(assignedworkds);

  const mockForceReload = jest.fn();
  await assignedworkds.load();
  
  await app.initialize();

  page.parent.state.appVar = app;
  
  let item = assignedworkds.items[0];
  app.setCurrentPage = mockSetPage;
  controller.dialogInitialized(page, app);
  let mockedClear = jest.fn()
  controller.clearSearch = mockedClear
  assignedworkds.forceReload = mockForceReload;
  let selectedDatasource =  assignedworkds
  page.parent.state.referenceDS = 'assignedworkds'
  //this.page.state.selectedStatus;
  selectedDatasource.forceReload = mockForceReload
  await controller.cancelBatchChildren(item);

  expect(mockedClear).toHaveBeenCalled();

});

it('Cancel children Test', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const appController = new AppController();

  const controller = new ChangeStatusController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.registerController(appController);
  page.registerController(controller);
  app.registerPage(page);

  app.registerController(controller);
  const assignedworkds = newBatchDatasource();
  page.registerDatasource(assignedworkds);
  app.registerDatasource(assignedworkds);

  const mockForceReload = jest.fn();
  await assignedworkds.load();
  
  await app.initialize();

  page.parent.state.appVar = app;
  
  let item = {parent: 1234}
  app.setCurrentPage = mockSetPage;
  controller.dialogInitialized(page, app);
  let mockedClear = jest.fn()
  controller.clearSearch = mockedClear
  assignedworkds.forceReload = mockForceReload;
  let selectedDatasource =  assignedworkds
  selectedDatasource.forceReload = mockForceReload
  await controller.checkSiblingsAndCancelBatchParent(item, selectedDatasource);

  expect(mockedClear).toHaveBeenCalled();

});
