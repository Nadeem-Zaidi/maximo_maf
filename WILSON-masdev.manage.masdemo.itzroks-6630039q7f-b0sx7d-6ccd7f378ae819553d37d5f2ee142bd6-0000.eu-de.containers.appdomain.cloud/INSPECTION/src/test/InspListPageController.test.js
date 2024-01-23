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

import 'regenerator-runtime/runtime';
import InspListPageController from '../InspListPageController';
import AppController from '../AppController';

import sinon from 'sinon';

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
  AppSwitcher,
  MaximoAppSwitcher,
  Device,
  Dialog
} from '@maximo/maximo-js-api';

import inspectionsCompletedData from './data/inspections-data-completed';
import inspectionsInProgData from './data/inspections-data-inprog';
import inspectionsPendData from './data/inspections-data-pending';
import inspectionsReviewData from './data/inspections-data-review';
import inspectionsData, { members } from './data/inspections-data';
import statusitem from './data/statuses-json-data.js';
import domainitem from './data/domain-json-data.js';

let allowedStates = {
  CAN: [
    {
      valueid: 'INSPRESULTSTATUS|CAN',
      maxvalue: 'CAN',
      defaults: true,
      description: 'Canceled',
      siteid: '',
      value: 'CAN',
      orgid: ''
    }
  ],
  COMPLETED: [
    {
      valueid: 'INSPRESULTSTATUS|COMPLETED',
      maxvalue: 'COMPLETED',
      defaults: true,
      description: 'Completed',
      siteid: '',
      value: 'COMPLETED',
      orgid: ''
    }
  ],
  INPROG: [
    {
      valueid: 'INSPRESULTSTATUS|INPROG',
      maxvalue: 'INPROG',
      defaults: true,
      description: 'In Progress',
      siteid: '',
      value: 'INPROG',
      orgid: ''
    }
  ],
  REVIEW: [
    {
      valueid: 'INSPRESULTSTATUS|REVIEW',
      maxvalue: 'REVIEW',
      defaults: true,
      description: 'For Review',
      siteid: '',
      value: 'REVIEW',
      orgid: ''
    }
  ]
};

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

function newStatusDatasource(
  data = statusitem,
  name = 'synonymdomainDataInsp'
) {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name
  });
  return ds;
}

let controller = null;
let app = null;
let page = null;

beforeEach(() => {
  controller = new InspListPageController();
  app = new Application();
  page = new Page();

  page.registerController(controller);
  app.registerPage(page);
});

it('should open status page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const appController = new AppController();

  let item = {
    inspectionresultid: 39,
    status: 'PENDING',
    status_maxvalue: 'PENDING',
    isbatch: true,
    allowedstates: allowedStates,
    inspectionform: { hasrequiredquestion: true }
  };

  app.registerController(controller);

  const ds = newStatusDatasource(statusitem, 'synonymdomainDataInsp');
  app.registerDatasource(ds);

  const dsstatusDomainList = newStatusDatasource(
    statusitem,
    'dsstatusDomainList'
  );

  page.registerDatasource(dsstatusDomainList);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  appController.buildStatusList = jest.fn();
  let statusArr = [
    {
      description: 'Canceled',
      id: 'CAN',
      maxvalue: 'CAN',
      value: 'CAN',
      _bulkid: 'CAN'
    },
    {
      description: 'Completed',
      id: 'COMPLETED',
      maxvalue: 'COMPLETED',
      value: 'COMPLETED',
      _bulkid: 'COMPLETED'
    },
    {
      description: 'In Progress',
      id: 'INPROG',
      maxvalue: 'INPROG',
      value: 'INPROG',
      _bulkid: 'INPROG'
    },
    {
      description: 'In Review',
      id: 'REVIEW',
      maxvalue: 'REVIEW',
      value: 'REVIEW',
      _bulkid: 'REVIEW'
    }
  ];
  app.callController = jest.fn(() => {
    return statusArr;
  });

  await controller.openChangeStatusDialog({
    item: item,
    datasource: dsstatusDomainList,
    referencePage: 'main'
  });

  expect(page.state.inspectionItem).not.toBe(undefined);
});

it('showInspection should change inspections status', async () => {
  let mockSetPage = jest.fn();
  const pageController = controller;
  const appController = new AppController();

  app.registerController(appController);
  page.registerController(pageController);
  const pendds = newDatasource(inspectionsPendData, 'pendingds');
  page.registerDatasource(pendds);

  const reviewds = newDatasource(inspectionsReviewData, 'reviewds');
  page.registerDatasource(reviewds);

  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  app.registerDatasource(dsDomain);

  let items = await pendds.load();
  let invokeAction = sinon.stub(pendds, 'invokeAction').returns(items[0]);
  await app.initialize();
  pageController.pageInitialized(page, app);
  page.state.selectedDS = 'pendingds';
  //let's pass an item
  const item = pendds.items[0];

  //showInspection should trigger invokeAction from datasource
  app.setCurrentPage = mockSetPage;
  await pageController.handleCardType(item);

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe('invokeAction');
  expect(invokeAction.args.length).toBe(1);
});

it('showInspection show selected page', async () => {
  const ds = newDatasource(inspectionsInProgData);
  page.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  // mock the invokeAction
  const mockInvokeAction = jest.fn();
  const origInvokeAction = ds.invokeAction;
  ds.invokeAction = mockInvokeAction;

  // mock the app.toast
  const mockToast = jest.fn();
  const origToast = app.toast;
  app.toast = mockToast;

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  const origSetPage = app.setCurrentPage;
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  //let's pass a item
  const item = ds.items[0];
  page.state.selectedDS = 'inspectionsInProgData';
  // call the show inspection with no selected items, should raise a message
  controller.showInspection(item);

  expect(mockSetPage.mock.calls[0][0].name).toBe('execution_panel');
  expect(mockSetPage.mock.calls[0][0].params.inspectionresultid).toEqual(29);

  app.toast = origToast;
  app.setCurrentPage = origSetPage;
  ds.invokeAction = origInvokeAction;
});

it('showInstructions shows toast when no selected items', async () => {
  await app.initialize();

  controller.pageInitialized(page, app);

  // mock the app.toast
  const toast = jest.fn();
  app.toast = toast;

  //let's pass a empty item
  const item = {};

  // call the show selected with no selected items, should raise a message
  controller.showInstructions(item);

  expect(toast.mock.calls[0][0]).toBe('Inspection result not found.');
});

it('showInstructions show selected page', async () => {
  const ds = newDatasource(inspectionsInProgData);
  page.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  // mock the setCurrentPage
  const mockshowDialog = jest.fn();
  page.showDialog = mockshowDialog;
  controller.pageInitialized(page, app);



  //let's pass a item
  const item = ds.items[0];

  // call the show inspection with no selected items, should raise a message
  controller.showInstructions(item);

  expect(page.state.instructions).toEqual({asset: "AssetTest",
    location: "LocationTest",
     longDesc: "long description",
     title: "Title Test",});
  expect(mockshowDialog).toHaveBeenCalled()

  controller.showInstructions(ds.items[1]);

  expect(page.state.instructions).toEqual({});

});

it('loadApp should invoke appswitcher method', async () => {
  await app.initialize();
  controller.pageInitialized(new Page(), app);
  AppSwitcher.setImplementation(MaximoAppSwitcher, { app: app });
  let switcher = AppSwitcher.get();
  const gotoApplication = sinon.spy(switcher, 'gotoApplication');

  // calling with argument data
  controller.loadApp({ appName: 'techmobile', options: {}, context: {} });
  sinon.assert.callCount(gotoApplication, 1);

  // calling without appName
  controller.loadApp();
  sinon.assert.callCount(gotoApplication, 1);

  // calling with appName but without options and context data
  controller.loadApp({ appName: 'techmobile' });
  sinon.assert.callCount(gotoApplication, 2);
});

it('should set hideBackButton to true when opening map-view with one record only', async () => {
  //inspectionsInProgData has one record only
  const ds = newDatasource(inspectionsInProgData, 'ds1');
  await ds.load();
  page.registerDatasource(ds);

  await app.initialize();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  page.state.selectedDS = 'ds1';

  let viewType = 'mapView';
  await controller.showDSList(viewType);
  //when there is only one record, should display card-group without back button
  expect(page.state.hideBackButton).toBeTruthy();
});

describe('load selected datasource', () => {
  let page, app, controller, sinonSpy;

  beforeEach(() => {
    controller = new InspListPageController();
    app = new Application();
    page = new Page();
    page.registerController(controller);
    app.registerPage(page);
  });

  afterEach(() => {
    sinonSpy.restore();
  });

  it('should execute loadSelectedDatasource on page initialized', async () => {
    sinonSpy = sinon.spy(controller, 'loadSelectedDatasource');
    await app.initialize();
    expect(sinonSpy.callCount).toBe(1);
  });

  it('should execute loadSelectedDatasource after changing dropdown selection', async () => {
    sinonSpy = sinon.spy(controller, 'loadSelectedDatasource');
    const ds = newDatasource(inspectionsPendData, 'ds1');
    page.registerDatasource(ds);

    const appController = new AppController();
    app.registerController(appController);
    app.state.networkConnected = true;

    await app.initialize();
    page.params.isBatch = true;
    controller.filterList();
    let evt = { selectedItem: { id: 'ds1', text: 'Alex N' } };
    controller.filterList(evt);
    expect(sinonSpy.callCount).toBe(2);
  });

  it('should force load the selected datasource on initialize', async () => {
    const ds = newDatasource(inspectionsPendData, 'assignedworktolist');
    sinonSpy = sinon.spy(ds, 'forceReload');
    page.registerDatasource(ds);
    page.state.selectedDS = 'assignedworktolist';
    await app.initialize();
    expect(sinonSpy.callCount).toBe(1);
  });
});

it('checkPanelToShow should update the showMapOverlay state', async () => {
  await app.initialize();

  let itemsCount = 0;
  controller.checkPanelToShow(itemsCount);
  expect(page.state.showMapOverlay).toBe(0);

  itemsCount = 1;
  controller.checkPanelToShow(itemsCount);
  expect(page.state.showMapOverlay).toBe(2);

  itemsCount = 10;
  controller.checkPanelToShow(itemsCount);
  expect(page.state.showMapOverlay).toBe(1);
});

it('showDSList should reset ds', async () => {
  const ds = newDatasource(inspectionsInProgData, 'ds1');
  page.registerDatasource(ds);

  await app.initialize();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  page.state.selectedDS = 'ds1';

  let viewType = 'listView';

  await controller.showDSList(viewType);
  expect(page.state.hideCountSearch).toEqual(false);

  viewType = '';
  await controller.showDSList(viewType);
  expect(page.state.hideCountSearch).toEqual(false);
});

it('showMapListCluster should filter ds and update states', async () => {
  const ds = newDatasource(inspectionsInProgData, 'ds1');
  page.registerDatasource(ds);

  const ds2 = newDatasource(inspectionsInProgData, 'jsonclusterinspectionsds');
  page.registerDatasource(ds2);

  await app.initialize();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  page.state.selectedDS = 'ds1';
  page.state.showClusterList = '';
  page.state.hideCountSearch = '';
  page.state.comeFromCluster = '';

  const checkPanelToShow = jest.spyOn(controller, 'checkPanelToShow');
  await controller.showMapListCluster([29]);
  expect(page.state.showClusterList).toEqual(true);
  expect(checkPanelToShow).toHaveBeenCalled();

  expect(page.state.showClusterList).toEqual(true);
  expect(page.state.hideCountSearch).toEqual(true);
  expect(page.state.comeFromCluster).toEqual(true);
});

it('showMapDialog should open the Dialog for the Map', async () => {
  await app.initialize();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let item = { inspectionresultid: '29' };
  let loadSpy = sinon.spy(page, 'showDialog');

  await controller.showMapDialog(item);

  expect(loadSpy.callCount).toBe(1);
});

it('pageInitialized should set state properties', async () => {
  await app.initialize();

  controller.pageInitialized(page, app);
  expect(page.state.mapListHeight).toEqual('40%');
  expect(page.state.mapHeight).toEqual('calc(100vh - 9.1rem)');
  expect(page.state.mapDialogHeight).toEqual('calc(100vh - 6rem)');
  expect(page.state.mapCardHeight).toEqual('auto');
  expect(page.state.mapCardScroll).toEqual(false);
  expect(page.state.mapPaddingRight).toEqual('1.5rem');
  expect(page.state.mapPaddingLeft).toEqual('1.5rem');
  expect(page.state.mapPaddingBottom).toEqual('0');

  Device.get().screen.size = 'md';
  controller.pageInitialized(page, app);
  expect(page.state.mapListHeight).toEqual('30%');
  expect(page.state.mapHeight).toEqual('calc(100vh - 9.1rem)');
  expect(page.state.mapDialogHeight).toEqual('calc(100vh - 6rem)');
  expect(page.state.mapCardHeight).toEqual('auto');
  expect(page.state.mapCardScroll).toEqual(false);
  expect(page.state.mapPaddingRight).toEqual('1rem');
  expect(page.state.mapPaddingLeft).toEqual('1rem');
  expect(page.state.mapPaddingBottom).toEqual('0');

  Device.get().screen.size = 'sm';
  controller.pageInitialized(page, app);
  expect(page.state.mapListHeight).toEqual('35%');
  expect(page.state.mapHeight).toEqual('calc(100vh - 5.1rem)');
  expect(page.state.mapCardHeight).toEqual('35%');
  expect(page.state.mapCardScroll).toEqual(true);
  expect(page.state.mapDialogHeight).toEqual('calc(100vh - 5.5rem)');
  expect(page.state.mapPaddingRight).toEqual('0');
  expect(page.state.mapPaddingLeft).toEqual('0');
  expect(page.state.mapPaddingBottom).toEqual('0');
});

it('mapDialogClose should set state and close the dialogmap', async () => {
  let dialogmap = new Dialog({
    name: 'dialogmap',
    configuration: {
      type: 'flyout'
    }
  });
  page.registerDialog(dialogmap);

  page.state.isMapOpen = true;

  const pendds = newDatasource(inspectionsPendData, 'pendingds');
  page.registerDatasource(pendds);

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.selectedDS = 'pendingds';

  await controller.mapDialogClose();
  expect(page.state.isMapOpen).toEqual(false);
});

it('showListFromCard should verify if it comes from cluster and run correct functions', async () => {
  const mockFn = jest.fn().mockImplementation(() => Promise.resolve());

  const tmp = controller.showMapListCluster;
  controller.showMapListCluster = mockFn;

  await app.initialize();

  page.state.comeFromCluster = true;
  const inspCluster = [29];
  page.state.inspectionsIdCluster = inspCluster;
  await controller.showListFromCard();

  expect(mockFn).toHaveBeenLastCalledWith(inspCluster);
  controller.showMapListCluster = tmp;
});

it('should execute batch method when there is selection in DS', async () => {
  const mockFn = jest.fn();
  controller.openBatchInspections = mockFn;
  await app.initialize();

  page.state.selectedDS = 'inspectionsData';
  const ds = newDatasource(inspectionsData, 'inspectionsData');
  page.registerDatasource(ds);
  await ds.load();
  ds.setSelectedById(1, true);
  ds.setSelectedById(2, true);

  expect(ds.getSelectedItems().length).toBe(2);
  await controller.openBatch({ href: 'oslc/os/mxapiinspectionres/_C-' });

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

it('should order batch considering sequence', async () => {
  const mockFn = jest.fn();
  await app.initialize();

  page.state.selectedDS = 'inspectionsData';
  const ds = newDatasource(inspectionsData, 'inspectionsData');
  page.registerDatasource(ds);

  app.setCurrentPage = mockFn;
  await controller.openBatchInspections(members);

  const { itemhref } = mockFn.mock.calls[0][0].params;

  expect(itemhref[0]).toEqual(members[2].href);
});

it('should call showInspection or changePage depending of item type', async () => {
  const ds = newDatasource(inspectionsInProgData);
  page.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  // mock the invokeAction
  const mockInvokeAction = jest.fn();
  const origInvokeAction = ds.invokeAction;
  ds.invokeAction = mockInvokeAction;

  // mock the app.toast
  const mockToast = jest.fn();
  const origToast = app.toast;
  app.toast = mockToast;

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  const origSetPage = app.setCurrentPage;
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  //let's pass a item
  const item = ds.items[0];
  page.state.selectedDS = 'inspectionsInProgData';
  item.isbatch = true;
  // call the show inspection with no selected items, should raise a message
  controller.handleCardType(item);

  expect(mockSetPage.mock.calls[0][0].name).toBe('batch_details');
  expect(mockSetPage.mock.calls[0][0].params.inspectionresultid).toEqual(29);

  app.toast = origToast;
  app.setCurrentPage = origSetPage;
  ds.invokeAction = origInvokeAction;
});

it('checkReviseItems should be called', async () => {
  const pageController = controller;
  const appController = new AppController();

  app.registerController(appController);
  page.registerController(pageController);
  const pendds = newDatasource(inspectionsPendData, 'pendingds');
  page.registerDatasource(pendds);

  const reviewds = newDatasource(inspectionsReviewData, 'inreviewds');
  page.registerDatasource(reviewds);

  let sinonSpy = sinon.spy(pageController, 'checkReviseItems');

  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  app.registerDatasource(dsDomain);

  await pendds.load();
  await reviewds.load();
  page.state.selectedDS = 'pendingds';
  page.state.showReviewItems = false;

  await app.initialize();

  pageController.pageInitialized(page, app);

  pageController.pageResumed(page, app);

  expect(sinonSpy.called).toBe(true);
});
