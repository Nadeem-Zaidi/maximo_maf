/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import SchedulePageController from './SchedulePageController';
import ReportWorkPageController from './ReportWorkPageController';
import {Application, Page, JSONDataAdapter, Datasource, Device} from '@maximo/maximo-js-api';

import workorderitem from './test/wo-detail-json-data.js';
import statusitem from './test/statuses-json-data.js';
import domainitem from './test/domain-json-data.js';
import worLogItem from './test/worklog-json-data.js';
import wpmaterial from './test/materials-json-data';
import sinon from 'sinon';
import woassetmeters from './test/assetmeter-json-data.js';
import wolocationmeters from './test/locationmeter-json-data.js';
import dsnewreading from './test/alndomain-json-data.js';
import wolist from './test/wo-list-json-data.js';
import wocost from './test/wo-cost-json-data.js';
import jwocost from './test/wo-cost-total-json-data.js';
import labor from "./test/labors-json-data";
import {Browser} from '@maximo/maximo-js-api/build/device/Browser';
import WorkOrderDetailsController from './WorkOrderDetailsController';
import worktype from "./test/worktype-json-data";
import multiassetlocitem from "./test/wo-detail-multiassetloc-data.js";
import commonUtil from './utils/CommonUtil';

function newDatasourceGlobal(data = workorderitem, items = "member", idAttribute = "wonum", name = "woDetailsReportWork") {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });

  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });

  return ds;
}

function newDatasource(data = workorderitem, name = 'workorderds') {
  const da = new JSONDataAdapter({
    src: workorderitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name
  });

  return ds;
}

function newDatasourceWorkLog(data = worLogItem, name = 'woWorklogDs') {
  const da = new JSONDataAdapter({
    src: worLogItem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

function newDatasourceNewReading(data = dsnewreading, name = 'dsnewreading') {
  const da = new JSONDataAdapter({
    src: worLogItem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

function newDatasourceAssetMeter(data = woassetmeters, name = 'woassetmeters') {
  const da = new JSONDataAdapter({
    src: woassetmeters,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

function newDatasourceLocationMeter(data = wolocationmeters, name = 'wolocationmeters') {
  const da = new JSONDataAdapter({
    src: wolocationmeters,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

function newWOCostDatasource(data = wocost, name = 'dsWoTotal') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
      idAttribute: 'est',
      name: name
  });
  return ds;
}

function newWOListDatasource(data = wolist, name = 'todaywoassignedDS') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
      idAttribute: 'wonum',
      name: name
  });
  return ds;
}


function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
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

function newLaborDetailDatasource(data = labor, name = "woLaborDetailds") {
  const da = new JSONDataAdapter({
    src: data,
    items: "labordetails2",
  });

  const ds = new Datasource(da, {
    idAttribute: "labtransid",
    name: name,
  });

  return ds;
}

function newDatasourceMultiAssetLoc(
  data = multiassetlocitem,
  name = "woMultiAssetLocationds"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "multiid",
    name: name,
  });

  return ds;
}

function materialDatasource(data = wpmaterial, idAttribute = 'wonum', items = 'member', name = 'inventoryDS') {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

it('Empty data source should display message', async () => {});

it('Page should display list of cards', async () => {});

it('card item click should send user to work order details', async () => {
  let mockSetPage = jest.fn();
  const controller = new SchedulePageController();
  const woDetailscontroller = new WorkOrderDetailsController();
  const app = new Application();

  const page = new Page();
  const workOrderDetailPage = new Page({name: 'workOrderDetails'});

  app.registerController(controller);
  workOrderDetailPage.registerController(woDetailscontroller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  app.currentPage = workOrderDetailPage;

  controller.pageInitialized(page, app);

  controller.showWODetail({wonum: 1000, siteid: 'BEDFORD'});
  expect(mockSetPage.mock.calls.length).toEqual(1);
  expect(mockSetPage.mock.calls[0][0].name).toEqual('workOrderDetails');
  expect(mockSetPage.mock.calls[0][0].resetScroll).toEqual(true);
  expect(mockSetPage.mock.calls[0][0].params.wonum).toEqual(1000);
  expect(mockSetPage.mock.calls[0][0].params.siteid).toEqual('BEDFORD');
});

it('should open materials page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openDrawer({'item': items[0], 'datasource': ds});

  expect(page.state.dialogLabel).toBe('Materials and tools');

});

it('should open materials page with Tools', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openDrawer({'item': items[1], 'datasource': ds});

  expect(page.state.dialogLabel).toBe('Tools');

});

it('should fail opening materials page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  page.state = {
    initialDefaultLogType: "!CLIENTNOTE!"
  }

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  try {
    await controller.openDrawer(items[0], null);
    expect.fail('failed opening materials page');
  } catch (e) {
    // good
  }

});

it('should open worklog page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'wodetails');
  const woWorklogDs = newDatasourceWorkLog(worLogItem, 'woWorklogDs');
  const synonymdomainDs = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(ds);
  page.registerDatasource(woWorklogDs);
  app.registerDatasource(synonymdomainDs);
  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openWorkLogDrawer({'item': items[1]});
  expect(page.state.chatLogGroupData.length).toBe(1);
  expect(page.state.defaultLogType).toBe('!UPDATE!');
});

it('should open save prompt on work log drawer validation', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'wodetails');
  const woWorklogDs = newDatasourceWorkLog(worLogItem, 'woWorklogDs');
  const synonymdomainDs = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(ds);
  page.registerDatasource(woWorklogDs);
  app.registerDatasource(synonymdomainDs);
  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openWorkLogDrawer({'item': items[1]});

  page.state.isWorkLogEdit = true;
  page.state.initialDefaultLogType = '!UPDATE!';
  page.state.workLogData = { summary: "abc", longDescription: "<p>test</p>", logType: {value: 'UPDATE'}, sendDisable: false};
  controller.workLogValidate({});
  page.state.isWorkLogEdit = false;
  controller.workLogValidate({});
  expect(page.findDialog('saveDiscardWorkLog')).toBeDefined();

  app.client = { userInfo : { personid : "test" } };

  controller.saveWorkLogSaveDiscard();
  expect(page.findDialog('workLogDrawer')).toBeDefined();
  page.state.workLogData.sendDisable = true;
  controller.saveWorkLogSaveDiscard();
  controller.closeWorkLogSaveDiscard();
  expect(page.findDialog('workLogDrawer')).toBeDefined();

  controller.watchChatLogChanges({summary: "abc", longDescription: "<p>test</p>", logType: {value: 'UPDATE'}, sendDisable: false});
  await new Promise((r) => setTimeout(r, 600));
  expect(page.state.isWorkLogEdit).toBeTruthy();

  controller.watchChatLogChanges({summary: "abc", longDescription: "<p>test</p>", logType: {value: 'UPDATE'}, sendDisable: true});
  await new Promise((r) => setTimeout(r, 600));
  expect(page.state.isWorkLogEdit).toBeTruthy();

  controller.watchChatLogChanges({summary: "", longDescription: "", logType: {value: 'UPDATE'}, sendDisable: false, visibility: false});
  await new Promise((r) => setTimeout(r, 600));
  expect(page.state.isWorkLogEdit).toBeFalsy();
});

it('saveWorkLog', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  page.state = {
    initialDefaultLogType: "!CLIENTNOTE!"
  }
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);

  const ds = newDatasource(workorderitem, 'wodetails');
  const ds2 = newDatasourceWorkLog(worLogItem, 'woWorklogDs');
  let workLogModified = worLogItem;
  workLogModified.responseInfo.schema.properties.logtype.default = "!CLIENTNOTE!";
  const ds3 = newDatasourceWorkLog(workLogModified, 'woWorklogDs');
  const synonymdomainDs = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainDs);
  let updatestub = sinon.stub(ds2, 'update');
  let forceloadstub = sinon.stub(ds2, 'forceReload');

  page.registerDatasource(ds);
  page.registerDatasource(ds2);

  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  
  await controller.openWorkLogDrawer({'item': items[1], 'datasource': ds});
  expect(page.state.chatLogGroupData.length).toBe(1);
  let event = 'Test Comment 2';

  await controller.saveWorkLog(event);
  expect(updatestub.called).toBe(true);
  expect(updatestub.displayName).toBe('update');
  expect(updatestub.args.length).toBe(1);

  expect(forceloadstub.called).toBe(true);
  expect(forceloadstub.displayName).toBe('forceReload');

  event = 'A long description is a way to provide long alternative text for non-text elements, such as images. Examples of suitable use of long description are charts, graphs, maps, infographics, and other complex images. Like alternative text, long description should be descriptive and meaningful.';

	await controller.openWorkLogDrawer({'item': items[1], 'datasource': ds});
	page.state = {chatLogDescLength:100};
  await controller.saveWorkLog(event);

  updatestub.restore();
  forceloadstub.restore();

  sinon.stub(ds3, 'update');
  sinon.stub(ds3, 'forceReload');
  await controller.openWorkLogDrawer({'item': items[1], 'datasource': ds});
  expect(page.state.defaultLogType).toBe('!CLIENTNOTE!');
});

describe('getDrawerLabel function', () => {

  let fn;
  beforeAll(() => {
    const {getDrawerLabel} = new SchedulePageController();
    fn = getDrawerLabel;
  });

  it('should return tuple', () => {
    const item = {};
    expect(fn(item)).toHaveLength(2);
  });

  it('should return default materials and tools', () => {
    const item = {
      wonum: 1000
    };
    expect(fn(item)).toEqual(['materialsAndToolsLabel', 'Materials and tools']);
  });

  it('should return Tools when only wptools provided', () => {
    const item = {
      toolcount: 2
    };
    expect(fn(item)).toEqual(['toolsLabel', 'Tools']);
  });

  it('should return Materials when only wpmaterials provided', () => {
    const item = {
      materialcount: 2
    };
    expect(fn(item)).toEqual(['materialsLabel', 'Materials']);
  });

  it('should only consider whenever there is content for each category', () => {
    expect(fn({toolcount: 0, materialcount: 2})).toEqual(['materialsLabel', 'Materials']);
    expect(fn({toolcount: 1, materialcount: 0})).toEqual(['toolsLabel', 'Tools']);
    expect(fn({toolcount: 0, materialcount: 0})).toEqual(['materialsAndToolsLabel', 'Materials and tools']);
  });

});

it('should open status page anywhere mode', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  Device.get().isAnywhere = true;
 
  const travelScenarioData = { serviceaddress: {longitudex: 10, latitudey : 20}, labtrans: [{timerstatus_maxvalue: 'ACTIVE'}]}

  let item = {
    wonum: 'SCRAP_2', worktype:'CM', status: 'INPRG', status_maxvalue: 'INPRG', flowcontrolled:true, allowedstates: {
      "COMP": [{"description": "Completed", "value": "COMP", "maxvalue": "COMP"}],
      "WAPPR": [{"description": "Waiting on Approval", "value": "WAPPR", "maxvalue": "WAPPR"}]
    }
  };
  app.state = {
		woStatSigOptions: {
			"APPR" : "APPR", "CLOSE" : "CLOSE"
		}
	};
  app.state.woStatSigOptions = JSON.stringify(app.state.woStatSigOptions);
  app.client = {
    userInfo: {
      personid: "SAM",     
      },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  app.registerController(controller);
  
  const ds = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(ds);
  let loadstub = sinon.stub(ds, 'searchQBE');
  sinon.stub(commonUtil, "getOfflineAllowedStatusList")
      .returns([{"description": "Completed", "value": "COMP", "maxvalue": "COMP"},{"description": "Waiting on Approval", "value": "WAPPR", "maxvalue": "WAPPR"}]);

  const dsstatusDomainList = newStatusDatasource(statusitem, 'dsstatusDomainList');
  page.registerDatasource(dsstatusDomainList);
  const wodetails = newDatasource(workorderitem, "wodetails");
  app.registerDatasource(wodetails);
  const dsworktype = newStatusDatasource(worktype, "dsworktype");
  app.registerDatasource(dsworktype)
  await app.initialize();
  
  await dsworktype.load();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openChangeStatusDialog({'item': item, 'datasource': dsstatusDomainList, 'referencePage': 'workOrderDetails'});

  expect(page.state.woItem).not.toBe(undefined);

  Device.get().isMaximoMobile = true;
  await controller.openChangeStatusDialog({'item': item, 'datasource': dsstatusDomainList, 'referencePage': 'workOrderDetails'});

  expect(loadstub.displayName).toBe('searchQBE');

  delete item['worktype'];
  item.status = 'COMP'; 
  item.status_maxvalue = 'INPRG';
  item = {...item, ...travelScenarioData};
  await controller.openChangeStatusDialog({'item': item, 'datasource': dsstatusDomainList, 'referencePage': 'workOrderDetails'});

  Device.get().isMaximoMobile = false;
});

it('should open status page ', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  Device.get().isAnywhere = false;
  
  let item = {
    wonum: 'SCRAP_2', status: 'APPR', status_maxvalue: 'APPR', allowedstates: {
      "COMP": [{"description": "Completed", "value": "COMP", "maxvalue": "COMP"}],
      "WAPPR": [{"description": "Waiting on Approval", "value": "WAPPR", "maxvalue": "WAPPR"}]
    }
  };
  app.state = {
		woStatSigOptions:{
			"APPR" : "APPR",
			"CLOSE" : "CLOSE"
		}
	};
  app.state.woStatSigOptions = JSON.stringify(app.state.woStatSigOptions);
  app.client = {
    userInfo: {
      personid: "SAM",     
      },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };

  app.registerController(controller);

  const ds = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(ds);

  const dsstatusDomainList = newStatusDatasource(statusitem, 'dsstatusDomainList');
  page.registerDatasource(dsstatusDomainList);
  const woDetailds = newDatasource(workorderitem, "wodetails");
  app.registerDatasource(woDetailds);

  const ds1 = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds1);
  const dsworktype = newStatusDatasource(worktype, "dsworktype");
  app.registerDatasource(dsworktype)
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await ds1.forceReload();
  await controller.openChangeStatusDialog({'item': item, 'datasource': dsstatusDomainList, 'referencePage': 'workOrderDetails', 'selectedDatasource': ds1});

  expect(page.state.memoMaxLength).toEqual(50);
  expect(page.state.woItem).not.toBe(undefined);

});

it("should open meter sliding drawer page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(ds);

  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);

  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  const wolocationmetersDs = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(woassetmetersDs);
  app.registerDatasource(wolocationmetersDs);
    
  let items = await ds.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await controller.openMeterDrawer({item: items[2], datasource: ds});
});

it("should load work order list data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  const page1 = new Page({name: 'report_work'});

  const ds = newDatasource(workorderitem, "myworkDS");
  page.registerDatasource(ds);
  app.state = {
    incomingContext: {
      breadcrumb: {
        enableReturnBreadcrumb: true
      }
    },
    screen: {
      size: 'sm'
    }
  };
  page.state = {
    breadcrumbWidth: 68,
    selectedDS : 'myworkDS'
  }

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {
        laborcode: "SAM",
        laborcraftrate: {
          craft: "Electrician",
          skilllevel: "Electrician - 2nd Class",
        },
      },
      user: { logouttracking: { attemptdate: "2022-03-09T09:03:16+05:30" } },
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  app.registerPage(page1);
  app.registerController(controller);
  const overdueDS = newDatasource(workorderitem, 'overdueDS');
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  const pmduewolistDS = newDatasource(workorderitem, 'pmduewolistDS');
  page.registerDatasource(overdueDS);
  page.registerDatasource(todaywoassignedDS);
  page.registerDatasource(pmduewolistDS);
  await app.initialize();
  page1.state.fieldChangedManually = false;

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  let evt = {
    selectedItem: {
      id: 'Unspecified'
    }
  }

  await controller.loadWOListData(evt);

  expect(overdueDS.dataAdapter.itemCount).toBe(undefined);

  evt.selectedItem.id = 'overdueDS';

  await controller.loadWOListData(evt);

  expect(overdueDS.dataAdapter.itemCount).not.toBe(0);

  page.state.firstLogin = false;
  page.state.selectedSwitch = 0;
  app.state.networkConnected = true;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(overdueDS.dataAdapter.itemCount).not.toBe(0);

  let firstLoginData = {
    date: undefined,
    isFirstLogIn: undefined
  };
  Browser.get().storeJSON('FirstLoginData', firstLoginData, false);
  page.state.firstLogin = true;
  page.state.selectedSwitch = 0;
  app.state.networkConnected = true;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(overdueDS.dataAdapter.itemCount).not.toBe(0);

  page.state.firstLogin = false;
  page.state.selectedSwitch = 1;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(overdueDS.dataAdapter.itemCount).not.toBe(0);
  expect(page.state.breadcrumbWidth).toEqual(68);
});

it("Workorder startStopTimer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  app.state = {};
  const page = new Page({
    name: "schedule"
  });

  page.state = {'selectedDS': 'todaywoassignedDS'};
  const reportPage = new Page({
    name: 'report_work'
  });
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {laborcraftrate: {craft: 'ELECT'}, laborcode: 'SAM'}
    },
  };

  app.state = {
		systemProp: {
			'maximo.mobile.usetimer': '1'
		},
	};

  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  const ds = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(ds);

  const dsstatusDomainList = newStatusDatasource(statusitem, 'dsstatusDomainList');
  page.registerDatasource(dsstatusDomainList);

  const dsDomain = newStatusDatasource(domainitem, 'dsdomains');
  page.registerDatasource(dsDomain);

  const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetaildsOnSchedule');
  page.registerDatasource(laborDetailDS);

  const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
  reportPage.registerDatasource(reportWorkLabords);

  const woReportWorkDs = newDatasourceGlobal(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasourceGlobal(labor, "craftrate", "craft", "craftrate");
  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  const inventoryDS = newDatasourceGlobal(wpmaterial, 'member', 'wonum', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');

  reportPage.registerDatasource(woReportWorkDs);
  reportPage.registerDatasource(craftrate);
  reportPage.registerDatasource(reportworksSynonymData);
  reportPage.registerDatasource(inventoryDS);
  reportPage.registerDatasource(synonymDSData);
  reportPage.registerDatasource(locationDS);

  const wolistds = newDatasource(workorderitem, page.state.selectedDS);
  page.registerDatasource(wolistds);

  const wodetails = newDatasource(workorderitem, 'wodetails');
  page.registerDatasource(wodetails);


  let items = await wolistds.load();
  let invokeAction = sinon.stub(wolistds, "invokeAction").returns(items[0]);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  reportWorkController.pageInitialized(reportPage, app);

  await controller.startStopTimer({
    item: items[1],
    datasource: wolistds,
    'action': 'start',
    'worktype': 'work'
  });

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(1);

  app.currentPage = reportPage;
  await controller.startStopTimer({
    item: items[1],
    datasource: wolistds,
    'action': 'stop'
  });

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(2);

  controller.openNavigation = jest.fn();

  app.state = {
    systemProp: {
      'mxe.mobile.travel.navigation': '1','maximo.mobile.usetimer': '1'
    },
    networkConnected: true
  };

  wolistds.item.coordinate = 'LATLONG';

  await controller.startStopTimer({
    item: items[1],
    datasource: wolistds,
    'action': 'start',
    'worktype': 'travel'
  });
  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(3);
  expect(controller.openNavigation.mock.calls.length).toBe(1);

  app.state = {
    systemProp: {
      'mxe.mobile.travel.navigation': '0', 'maximo.mobile.usetimer': '1'
    }
  };

  controller.openNavigation = jest.fn();

  await controller.startStopTimer({
    item: items[1],
    datasource: wolistds,
    'action': 'start',
    'worktype': 'travel'
  });

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(4);
  expect(controller.openNavigation.mock.calls.length).toBe(0);


  app.state = {
    systemProp: {
      'mxe.mobile.travel.navigation': '1',
    },
    networkConnected: true
  };

  wolistds.item.coordinate = 'XY';

  await controller.startStopTimer({
    item: items[1],
    datasource: wolistds,
    'action': 'start',
    'worktype': 'travel'
  });
  expect(controller.openNavigation.mock.calls.length).toBe(0);
  
  
  app.state = {
    systemProp: {
      'mxe.mobile.travel.navigation': '1',
      'maximo.mobile.travel.allowmultipletimers': '1',
    },
    networkConnected: false
  };

  wolistds.item.coordinate = 'LATLONG';
  await controller.startStopTimer({
    item: items[1],
    datasource: wolistds,
    'action': 'start',
    'worktype': 'travel'
  });
  expect(controller.openNavigation.mock.calls.length).toBe(1);
});

it('Workorder startWOStopTimer with confirmlabtrans = 1', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: "page"
  });
  const reportPage = new Page({
    name: 'report_work'
  });

  page.state = {'selectedDS': 'todaywoassignedDS'};
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {laborcraftrate: {craft: 'ELECT'}, laborcode: 'SAM'}
    },
  };

  app.state = {
		systemProp: {
		  'maximo.mobile.usetimer': '1'
		},
	  };

  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  const ds = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(ds);

  const dsstatusDomainList = newStatusDatasource(statusitem, 'dsstatusDomainList');
  page.registerDatasource(dsstatusDomainList);

  const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetaildsOnSchedule');
  page.registerDatasource(laborDetailDS);

  const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
  reportPage.registerDatasource(reportWorkLabords);

  const wolistds = newDatasource(workorderitem, page.state.selectedDS);
  page.registerDatasource(wolistds);

  const wodetails = newDatasource(workorderitem, 'wodetails');
  page.registerDatasource(wodetails);

  const items = await wodetails.load();
  let invokeAction = sinon.stub(wolistds, "invokeAction").returns(items[0]);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  items[1].confirmlabtrans = '1';

  await controller.startStopTimer({item: items[1], datasource: wolistds, action: 'start'});

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe('invokeAction');
  expect(invokeAction.args.length).toBe(1);

  app.currentPage = reportPage;
  expect(laborDetailDS.item.finishdatetime).toBeUndefined();

  await controller.startStopTimer({item: items[1], datasource: wolistds, action: 'stop'});
  expect(laborDetailDS.item.finishdatetime).toBeDefined();
});

it('Workorder onClickEditLabor', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  const reportPage = new Page({name: 'report_work'});
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcode: 'SAM', laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}}
    }
  };

  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  const ds = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(ds);

  const wolistds = newDatasource(workorderitem, "dswolist");
  page.registerDatasource(wolistds);

  const wodetails = newDatasource(workorderitem, 'wodetails');
  page.registerDatasource(wodetails);

  const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetaildsOnSchedule');
  page.registerDatasource(laborDetailDS);

  const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
  reportPage.registerDatasource(reportWorkLabords);

  const woReportWorkDs = newDatasourceGlobal(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasourceGlobal(labor, "craftrate", "craft", "craftrate");
  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  const inventoryDS = newDatasourceGlobal(wpmaterial, 'member', 'wonum', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
  const laborDs = newDatasourceGlobal(labor, "labordetails", "labtransid", "laborDs");
  const labordetails = newDatasourceGlobal(labor, "labordetails", "labtransid", "reportworkLaborDetailds");

  reportPage.registerDatasource(woReportWorkDs);
  reportPage.registerDatasource(craftrate);
  reportPage.registerDatasource(reportworksSynonymData);
  reportPage.registerDatasource(inventoryDS);
  reportPage.registerDatasource(synonymDSData);
  reportPage.registerDatasource(locationDS);
  reportPage.registerDatasource(labordetails);
  app.registerDatasource(laborDs);
  app.registerDatasource(craftrate);

  const items = await wodetails.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  reportWorkController.pageInitialized(reportPage, app);

  app.currentPage = reportPage;
  await controller.onClickEditLabor({item: items[1], datasource: wodetails, action: 'stop'});
  expect(mockSetPage.mock.calls.length).toBe(1);
});

it('Workorder onClickSendLabTrans', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  const reportPage = new Page({name: 'report_work'});
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    },
  };

  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  const ds = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(ds);

  const wolistds = newDatasource(workorderitem, "dswolist");
  page.state = {'selectedDS': 'dswolist'};
  page.registerDatasource(wolistds);

  const wodetails = newDatasource(workorderitem, 'wodetails');
  page.registerDatasource(wodetails);

  const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetaildsOnSchedule');
  page.registerDatasource(laborDetailDS);
  
  const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
  reportPage.registerDatasource(reportWorkLabords);
  
  const woDetailsReportWork = newDatasourceGlobal(labor, "wodetails", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const reportworksSynonymData = newStatusDatasource(statusitem, 'reportworksSynonymData');
  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
  const itemsDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemsDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
    
  reportPage.registerDatasource(woDetailsReportWork);
  reportPage.registerDatasource(craftrate);
  
  reportPage.registerDatasource(reportworksSynonymData);    
  reportPage.registerDatasource(inventoryDS);
  reportPage.registerDatasource(locationDS);
  reportPage.registerDatasource(synonymDSData);
  app.registerDatasource(itemsDS);
  
  const items = await wodetails.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  reportWorkController.pageInitialized(reportPage, app);

  const savestub = sinon.stub(laborDetailDS, 'save');
  app.currentPage = reportPage;
  await controller.onClickSendLabTrans({item: items[1], datasource: wodetails, action: 'stop'});
  expect(savestub.called).toBe(true);
});

it('saveMeterReadings for asset - gauge meters', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: 'page'
  });
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);

  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  
  app.registerDatasource(ds);
  app.registerDatasource(ds2);
  
  sinon.stub(ds, 'put');
  sinon.stub(ds2, 'put');
  await ds.load();
  await ds2.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    field: "newreading",
    item: {
      "assetnum": "13170",
      "href": "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
      "computedMeterCurDate": "01/21/2022",
      "computedMeterCurTime": "01/21/2022 10:00:00"
    },
    newValue: 123,
    newreadingDate: new Date(),
    oldValue: undefined,
    datasource: {
      name: "woassetmeters",
      items: ds.items
    },
    change: {
      object: {
        "assetmeterid": 29,
        "metername": "TEMP-F",
        "dorollover": false,
        "computedMeterCurDate": "",
        "computedMeterCurTime": ""
      }
    },
     
  }

  // the dataadapter should have a query 
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;
  
  let da1 = ds2.dataAdapter;
  da1.options.query = !da1.options.query ? {} : da1.options.query;

  await controller.onValueChanged(event);
  expect(controller.validatemeter).toBe(true);
  
  expect(page.state.readingChangeInvoked).toBe(false);
  await controller.saveMeterReadings(event, app, ds);
  expect(page.state.disableSave).toBe(false);
  
  page.state.oldReading = true;
  await controller.saveMeterReadings(event);
});

it('saveMeterReadings for location - gauge meters', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: 'page'
  });
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);

  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  
  app.registerDatasource(ds);
  app.registerDatasource(ds2);
  await ds.load();
  await ds2.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    field: "newreading",
    item: {
      "location": "BPM3100",
      "href": "http://localhost:3000/maximo/oslc/os/mxapilocationmeter/_VE9NQVNTMS8wLJE-FAKELOCATIONMETERRESTID"
    },
    newValue: 9,
    newreadingDate: new Date(),
    oldValue: undefined,
    datasource: {
      name: "wolocationmeters",
      items: ds2.items
    },
    change: {
      object: {
        "locationmeterid": 3,
        "dorollover": false,
        "metername": "IN-PRESSUR",
      }
    }
  }

  await controller.onValueChanged(event);
  expect(controller.validatemeter).toBe(true);
});


it("should open enter meter sliding drawer page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: "page"
  });

  app.registerController(controller);
  const ds = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(ds);

  const wodetails = newDatasource(workorderitem, "wodetails");
  app.registerDatasource(wodetails);
  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  const wolocationmetersDs = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(woassetmetersDs);
  app.registerDatasource(wolocationmetersDs);

  await woassetmetersDs.load();   
  let items = await ds.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await app.findDatasource("woassetmeters").load();
  await controller.openEnterReadingDrawer({
    item: items[2],
    readingType: "new"
  });
  app.findDatasource("woassetmeters").items.forEach((element) => {
    expect(element.newreading);
  });
  app.findDatasource("wolocationmeters").items.forEach((element) => {
    expect(element.newreading).toBe(undefined);
  });
  expect(page.state.locationMeterHeader).toBe("Main Boiler Room");

});

it('saveMeterReadings for asset - continuous meters', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: 'page'
  });
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);
  app.registerPage(page);
  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(ds);
  
  const ds2 = newDatasourceAssetMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(ds2);
  
  let updatestub = sinon.stub(ds, 'update');
  await ds.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    field: "newreading",
    item: {
      "assetmeterid": 29,
      "metername": "TEMP-F",
      "assetnum": "13170",
      lastreading: 20,
      lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
      meter: {metertype_maxvalue: 'CONTINUOUS'},
      "computedMeterCurDate": "01/21/2022",
      "computedMeterCurTime": "01/21/2022 10:00:00"
    },

    newValue: 12,
    oldValue: undefined,
    datasource: {
      name: "woassetmeters",
      items: ds.items
    },
    change: {
      object: {
        "assetmeterid": 29,
        "metername": "TEMP-F",
        lastreading: 20,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: {metertype_maxvalue: 'CONTINUOUS'},
        "computedMeterCurDate": "",
        "computedMeterCurTime": ""
      }
    }
  }

  controller.onValueChanged(event);
  expect(updatestub.called).toBe(false);
});

it('saveMeterReadings for location - continuous meters', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: 'page'
  });
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);
  app.registerPage(page);
  
  
  const ds = newDatasourceAssetMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(ds);
  
  const ds2 = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(ds2);
    
  await ds.load();
  let updatestub = sinon.stub(ds, 'update');
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    field: "newreading",
    item: {
      "assetmeterid": 29,
      "metername": "TEMP-F",
      "location": "LOC1",
      lastreading: 20,
      lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
      meter: {metertype_maxvalue: 'CONTINUOUS'},
      dorollover: false
    },

    newValue: 12,
    oldValue: undefined,
    datasource: {
      name: "wolocationmeters",
      items: ds.items
    },
    change: {
      object: {
        "assetmeterid": 29,
        "metername": "TEMP-F",
        lastreading: 20,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: {metertype_maxvalue: 'CONTINUOUS'}
      }
    }
  }

  controller.onValueChanged(event);
  expect(updatestub.called).toBe(false);
});

it("should open characterstic drawer page for asset meter", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);


  const dsnewreadingDs = newDatasourceNewReading(dsnewreading, "dsnewreading");
  dsnewreadingDs.isAssetMeter = true;
  app.registerDatasource(dsnewreadingDs);
  let loadstub = sinon.stub(dsnewreadingDs, 'searchQBE');

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {

    item: {
      "assetmeterid": 78,
      "metername": "GUARD RAIL",
      "assetnum": "13170",
      "meter": {
        "domainid": "RAIL_WEAR"
      },

    },


    datasource: {
      name: "woassetmeters"
    }
  }

  await controller.openMeterLookup(event);
  expect(loadstub.called).toBe(true);
  expect(loadstub.displayName).toBe('searchQBE');
});

it("should open characterstic drawer page for location meter", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);


  const dsnewreadingDs = newDatasourceNewReading(dsnewreading, "dsnewreading");
  dsnewreadingDs.isAssetMeter = false;
  app.registerDatasource(dsnewreadingDs);
  let loadstub = sinon.stub(dsnewreadingDs, 'searchQBE');

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {

    item: {
      "locationmeterid": 55,
      "metername": "TEMP-F",
      "assetnum": "BPM3100",
      "meter": {
        "domainid": "RAIL_WEAR"
      },

    },

    datasource: {
      name: "wolocationmeters"
    }
  }

  await controller.openMeterLookup(event);
  expect(loadstub.called).toBe(true);
  expect(loadstub.displayName).toBe('searchQBE');
});

it('saveCharacterStickMeter for asset', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);

  const newreadingds = newDatasourceAssetMeter(dsnewreading, 'dsnewreading');
  newreadingds.isAssetMeter = true;
  newreadingds.currentMeterid = 30;
  newreadingds.currentAssetLocNum = "13170";
  newreadingds.CurrentMeterName = "TEMP-C";
  newreadingds.CurrentMeterhref = "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_MTMxNzAvQkVERkKSDJF929SRA--";
  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(newreadingds);
  app.registerDatasource(ds);
  app.registerDatasource(ds2);
  let updatestub = sinon.stub(ds, 'put');
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  // await controller.openWorkLogDrawer({'item': items[1], 'datasource': ds});
  // expect(page.state.chatLogGroupData.length).toBe(1);
  let event = {item:{
    value: 123,
    meter:{domainid:"RAIL_WEAR"}
  },datasource: ds}

  // the dataadapter should have a query 
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;
  await controller.openMeterLookup(event);
  await controller.saveCharactersticMeterReading(event);
  
  // expect(updatestub.called).toBe(true);
  // expect(updatestub.displayName).toBe('put');
  // expect(updatestub.args.length).toBe(1);

  // expect(forceloadstub.called).toBe(true);
  // expect(forceloadstub.displayName).toBe('load');

  updatestub.restore();
  //  forceloadstub.restore();
});

it('saveCharacterStickMeter for location', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);

  const newreadingds = newDatasourceAssetMeter(dsnewreading, 'dsnewreading');
  newreadingds.isAssetMeter = false;
  newreadingds.currentMeterid = 30;
  newreadingds.currentAssetLocNum = "13170";
  newreadingds.CurrentMeterName = "TEMP-C";
  newreadingds.CurrentMeterhref = "http://localhost:3000/maximo/oslc/os/mxapilocationmeter/_QlBNMzEwMC9IRUFEIExPU1MyL0JFREZPUkQ-";
  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  page.registerDatasource(newreadingds);
  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    value: 123,
  }

  await controller.saveCharactersticMeterReading(event);
  expect(page.state.disableSave).toBe(false);
});

it("close update meter sliding drawer page with asset data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);


  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);

  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    item: {
      siteid: "BEDFORD",
      asset: [
        {
          assetnum: "13170",
          description: "Top Sealer System"
        }
      ],
      wonum: "1202"
    }
  }
  await controller.closeUpdateMeterDialog(event);
  expect(page.state.useConfirmDialog).toBe(true);
});

it("close update meter sliding drawer page with location data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);


  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);

  const wolocationmetersDs = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  page.registerDatasource(wolocationmetersDs);
  let locationloadstub = sinon.stub(wolocationmetersDs, 'load');

  ///let items = await ds.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    item: {
      siteid: "BEDFORD",
      locationnum: "BPM3100",
      locationdesc: "#1 Liquid Packaging Line",       
      wonum: "1202"
    }
  }
  
  await controller.closeUpdateMeterDialog(event);

  expect(page.state.useConfirmDialog).toBe(true);

  controller.closeUpdateMeterDialog = jest.fn();
  controller.validatemeter = true;
  await controller.closeUpdateMeterDialog(event);
  expect(controller.closeUpdateMeterDialog).toHaveReturnedWith(undefined);
  
  

  locationloadstub.restore();
});

it('saveMeterReadings - rollover readings', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: 'page'
  });
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }

  app.registerController(controller);

  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(ds);
  
  const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(ds2);
  
  const wodetails = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(wodetails);
  sinon.stub(wodetails, 'forceReload');
  
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  page.error = jest.fn();
  page.state.newReading = true;
  let event = {
    field: "newreading",
    item: {
      "assetmeterid": 29,
      "metername": "TEMP-F",
      "assetnum": "13170",
      "newreadingDate": new Date()
    },
    oldValue: undefined,
    datasource: {
      name: "woassetmeters"
    },
    change: {
      object: {
        "assetmeterid": 29,
        "metername": "TEMP-F",
        lastreading: 20,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: {metertype_maxvalue: 'CONTINUOUS'},
        computedMeterCurDate: new Date(),
        computedMeterCurTime: new Date(),
        datasource:{item:{computedMeterCurDate: new Date(), computedMeterCurTime: new Date() }},
        item:{computedMeterCurDate: new Date(), computedMeterCurTime: new Date()}
      }
    }
  }

  // the dataadapter should have a query 
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;
  da.options.relationship = !da.options.relationship ? {} : da.options.relationship;
  
  // let da1 = ds2.dataAdapter;
  // da1 = da1.options.query = !da1.options.query ? {} : da1.options.query;
  // da1.options.relationship = !da1.options.relationship ? {} : da1.options.relationship;

  let saveReadingsStub = sinon.stub(controller, 'saveMeterReadings');
  //no rollover set newvalue is less than last
  event.newValue = 12;
  event.change.object.newreading = 12;
  await controller.onValueChanged(event.change.object);
  expect(saveReadingsStub.called).toBe(false);
  expect(event.change.object.newreading).toEqual(12);

  //rollover set
  event.change.object.rollover = 100;

  saveReadingsStub.reset();
  await controller.onValueChanged(event.change.object);
  expect(saveReadingsStub.called).toBe(false);

  saveReadingsStub.reset();
  await controller.validateMeterReadings();
  expect(saveReadingsStub.called).toBe(false);

  //value greater than rollover
  event.newValue = 900;
  event.change.object.newreading = 900;
  saveReadingsStub.reset();
  await controller.onValueChanged(event.change.object);
  expect(saveReadingsStub.called).toBe(false);
  expect(event.change.object.newreading).toEqual(900);

  //value greater than last reading
  event.newValue = 25;
  saveReadingsStub.reset();
  await controller.onValueChanged(event.change.object);
  expect(page.state.disableSave).toBe(false);
  
  await controller.saveUpdateMeterDialog(event);
  //expect(updatestub.called).toBe(false);

  // no rollover but value is greater than last reading
  saveReadingsStub.reset();
  event.change.object.rollover = undefined;
  event.newValue = 21;
  event.change.object.newreading = 10;
  await controller.validateMeterReadings(event);
  expect(page.state.disableSave).toBe(false);

  event.change.object.rollover = true;
  event.newValue = 10;
  await controller.validateMeterReadings(event);
  page.state.rollOverData = [];
  page.state.rollOverData.push(event);
  await controller.saveRollOverReadings(true);
  expect(page.state.rollOverData[0].dorollover).toBe(true);
  
  await controller.saveRollOverReadings(false);
  expect(page.state.rollOverData[0].dorollover).toBe(false);
  
  //await controller.saveRollOverReadings(false);
  //expect(page.state.rollOverData.dorollover).toBe(false);

  saveReadingsStub.reset();
  event.newValue = "invalid number";
  await controller.onValueChanged(event.change.object);
  expect(saveReadingsStub.called).toBe(false);
  
  page.state.oldReading = true;
  event.change.object.rollover = false;
  event.newValue = 10;
  event.newreadingDate = new Date();
  
  ds.item.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";
  ds.item.computedMeterCurTime = "2023-03-14T00:30:00+05:30";  
  await controller.validateMeterReadings(event);
  
  
  event.change.object.rollover = false;
  event.change.object.meter.metertype_maxvalue = "CONTINUOUS";
  event.newValue = 20;
  event.newValue = 10;
  page.state.hasErrorMsgArr = [];
  await controller.validateMeterReadings(event);
  expect(page.state.hasErrorMsgArr.length).toBe(1);
  
});

it('Hide/show Get Materials & tools button from the work order list page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {
        laborcode: "SAM",
        laborcraftrate: {
          craft: "Electrician",
          skilllevel: "Electrician - 2nd Class",
        },
      },
      user: { logouttracking: { attemptdate: "2022-03-09T09:03:16+05:30" } },
    },
  };

  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let firstLoginData = {
    date: undefined,
    isFirstLogIn: undefined
  }
  Browser.get().storeJSON('FirstLoginData', firstLoginData, false);
  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(true);

  firstLoginData = {
    date: '2023-03-09T09:03:16+05:30'
  }
  Browser.get().storeJSON('FirstLoginData', firstLoginData, false);

  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(false);

  firstLoginData = {
    date: '2021-03-09T09:03:16+05:30'
  }
  Browser.get().storeJSON('FirstLoginData', firstLoginData, false);
  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(true);
});

it('should open wocard on map view', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  const ds = newDatasource(workorderitem, 'workorderds');
  app.registerController(controller);
  await app.initialize();
  page.state = {'selectedDS': 'workorderds'};
  page.datasources = [ds];
  controller.pageInitialized(page, app);
  page.registerDatasource(ds);
  let event = {
    item: {
      wonum: '1201'
    },
    prevPage: 'schedulecardlist'
  }

  await controller.openWOCard(event);
  expect(page.state.showMapOverlay).toEqual(1);
  expect(page.state.previousPage).toEqual('schedulecardlist');
});

it('should render the page from where it came on map view', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  let page = new Page({name: 'schedule'});
  const page1 = new Page({ name: 'report_work' });
  const ds = newDatasource(workorderitem, 'workorderds');
  app.registerController(controller);
  await app.initialize();
  page.state = {'selectedDS': 'workorderds', 'previousPage': 'mapwolist'};
  page.datasources = [ds];
  controller.pageInitialized(page, app);
  page.registerDatasource(ds);
  let event = {
    item: {
      wonum: '1201'
    },
  }

  page.state = {'selectedDS': 'workorderds', 'previousPage': 'schedulecardlist'};
  await controller.openPrevPage(event);
  expect(page.state.selectedSwitch).toEqual(0);


  page = new Page({name: 'workOrderDetails'});
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  controller.pageInitialized(page, app);
  page.state = {'selectedDS': 'workorderds', 'previousPage': 'wodetail'};
  
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  page.registerDatasource(todaywoassignedDS);
  
  await controller.openPrevPage(event);
  expect(controller.app.currentPage.title).toEqual('workOrderDetails');
  expect(page.state.previousPage).toEqual('wodetail');

  page = new Page({name: 'workOrderDetails'});
  app.registerPage(page);
  controller.pageInitialized(page, app);
  page.state = {'selectedDS': 'workorderds', 'previousPage': 'wodetail', 'mapOriginPage': 'wodetail'};
  await controller.openPrevPage(event);
  expect(page.state.previousPage).toEqual('schedulecardlist');
});

it('should set height of wolist for mobile on map view', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});

  app.registerController(controller);
  await app.initialize();
  let device = Device.get();
  device.isMobile = true;

  controller.pageInitialized(page, app);
  expect(page.state.mapWOListHeight).toEqual('35%');
});

it('should open a map view of a work order from work order list page', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  page.state = {'selectedDS': 'todaywoassignedDS'};
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  page.registerDatasource(todaywoassignedDS);
  
  app.registerController(controller);
  await app.initialize();

  controller.pageInitialized(page, app);

  await controller.openMapPage(todaywoassignedDS);
  expect(page.state.selectedSwitch).toEqual(1);
});


it('should point workorder when open map', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  page.state = {'selectedDS': 'todaywoassignedDS'};
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  page.registerDatasource(todaywoassignedDS);

  app.registerController(controller);
  await app.initialize();
   
  controller.pageInitialized(page, app);
  app.map = true;

  const callControllerSpy = jest.spyOn(controller, "handleItemClick").mockImplementation(() => true);
  let item = {coordinate:'XY', 
             formattedaddress: "IBM Gift City",
             href: "oslc/os/mxapiwodetail/_QkVERk9SRC8xNDI4",
             autolocate: "{\"coordinates\":[6.529388579793247E-4,2.080922436000822E-4],\"type\":\"Point\"}",
             wonum: "428"
            }
  controller.openMap(item);
  expect(callControllerSpy).toBeCalled();
});

it('should reset datasource when switched to wo card list', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  page.state = {'selectedDS': 'workorderds'};

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  controller.pageInitialized(page, app);
  controller.showCardList();

  expect(page.state.showMapOverlay).toEqual(0);
});

it('should reset default state', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});

  app.registerController(controller);
  controller.pageInitialized(page, app);
  controller.setDefaults();
  expect(page.state.selectedSwitch).toEqual(0);
});

it('should get travel system properties', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  app.client = {
    userInfo: {
      personid: 'SAM',labor: {laborcode: 'SAM'}
    }
  }
  app.client.getSystemProperties = jest.fn();
  app.geolocation.updateGeolocation = jest.fn();

  app.registerController(controller);
  controller.pageInitialized(page, app);
  controller.getTravelSystemProperties();
  expect(app.client.getSystemProperties).toBeCalled();  
});

it('resets mapoverlay for map content when switched to map view', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  controller.pageInitialized(page, app);
  controller.showMapList();
  expect(page.state.showMapOverlay).toEqual(0);
});

it('should change work order status to approve',  async  () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page();

   const synonymStatusDS = newStatusDatasource();
  const woListDs = newWOListDatasource();
  const ds1 = newDatasource(undefined, "pmduewolistDS");
  page.registerDatasource(ds1);
  page.state.selectedSwitch = 1;
  page.state.showMapOverlay = 1;

  const mockSetPage = jest.fn();
  let invokeAction = sinon.stub(woListDs, "invokeAction").returns({});

  app.registerDatasource(synonymStatusDS);
  page.registerDatasource(woListDs);
  app.registerController(controller);

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  app.state = {
    systemProp: {
      'maximo.mobile.wostatusforesig': 'APPR,INPROG'
    },
  };
  controller.pageInitialized(page, app);
  await controller.changeWorkorderStatus({item: {href: 'href', workorderid: '12345'}, status: 'WOSTATUS|APPR'});
  expect(invokeAction.called).toBe(true);
});

it("Workorder estimated cost drawer should open", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.client = {
    userInfo: {
      baseCurrency: 'USD'
    }
  }

  app.registerController(controller);
  app.registerPage(page);
  const wodetails = newDatasource(workorderitem, "wodetails");
  await wodetails.load();
  page.registerDatasource(wodetails);

  const woCost = newWOCostDatasource(wocost, "dsWoTotal");
  const jsondsWoTotal = newWOCostDatasource(jwocost, "jsondsWoTotal");
  jsondsWoTotal.getSchema = () =>  jwocost.responseInfo.schema;

  await woCost.load();
  await jsondsWoTotal.load();

  page.registerDatasource(jsondsWoTotal);
  page.registerDatasource(woCost);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await controller.openWoTotalCostDrawer({item: {href: 'href'}});

  expect(page.state.woCostDrawerTitle).toEqual('Cost');
});

it('should set padding of wolist on talet on map view', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});

  app.registerController(controller);
  await app.initialize();
  let device = Device.get();
  device.isTablet = true;

  controller.pageInitialized(page, app);
  expect(page.state.mapPaddingRight).toEqual('1rem');
  expect(page.state.mapPaddingLeft).toEqual('0.5rem');
  expect(page.state.mapWOListHeight).toEqual('25%');
});

it('should set bottom of wolist on mobile on map view', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});

  app.registerController(controller);
  await app.initialize();
  let device = Device.get();

  controller.pageInitialized(page, app);
  expect(page.state.mapPaddingBottom).toEqual('calc(100vh - 9rem)');

  device.isMaximoMobile = true;
  controller.pageInitialized(page, app);
  expect(page.state.mapPaddingBottom).toEqual('calc(100vh - 5rem)');
});

it("should forceReload method called on the woCard of map view", async () => {
  global.open = jest.fn();  
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "schedule"});
  const page1 = new Page({ name: 'report_work' });
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  
  const ds = newDatasource(undefined, "todaywoassignedDS");
  const ds2 = newDatasource(undefined, "pmduewolistDS");
  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  page.state.selectedSwitch = 1;
  page.state.showMapOverlay = 1;
      
  await app.initialize();
  let forceReloadStubAssigned = sinon.stub(ds, 'forceReload');
  let forceReloadStub = sinon.stub(ds2, 'forceReload');
  await ds.forceReload();
  await ds2.forceReload();
  controller.pageInitialized(page, app);
  
  expect(forceReloadStubAssigned.called).toBe(true);
  expect(forceReloadStub.called).toBe(true);

  forceReloadStubAssigned.restore();
  forceReloadStub.restore();
});

it('should invoke validateMeterReadings using onFocusReadings', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({
    name: 'page'
  });
  
  app.registerController(controller);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    newreading: 12
  }

  let validateMeterReadingsStub = sinon.stub(controller, 'validateMeterReadings');
  // should invoke even if no value change.
  await controller.onFocusReadings(event);
  expect(validateMeterReadingsStub.called).toBe(true);

  validateMeterReadingsStub.reset();
  page.state.readingChangeInvoked = true;
  await controller.onFocusReadings(event);
  expect(page.state.readingChangeInvoked).toBe(true);

});

it('should set LogType', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({ name: 'schedulePage' });
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  let event = {value: 'APPTNOTE', description: 'Appointment Note'};
  controller.setLogType(event);
  expect(page.state.defaultLogType).toBe('APPTNOTE');
});

it("it should set saveDataSuccessful to false ", async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'SchedulePage'});
  const page1 = new Page({ name: 'report_work' });
  
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  page.registerDatasource(todaywoassignedDS);
  
  const pmduewolistDS = newDatasource(workorderitem, 'pmduewolistDS');
  page.registerDatasource(pmduewolistDS);
  
  await todaywoassignedDS.load();
  await pmduewolistDS.load();
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  await app.initialize();
  controller.onUpdateDataFailed();
  expect(controller.saveDataSuccessful).toBe(false);      
});


it("should open date time meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);
  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
});

it("Validate meter for date", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  await ds.load();
  
  app.registerController(controller);
  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  
  await woassetmetersDs.load();  
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await controller.validateMeterDate();
  expect(page.state.invalidMeterDate).toBe(true);
  
  page.state.invalidMeterTime = false;
  page.state.invalidMeterDate = false;
  await controller.validateMeterDate();
  
  page.state.invalidMeterTime = true;
  page.state.invalidMeterDate = true;
  await controller.validateMeterDate();
});

it("Validate meter for time", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  await ds.load();
  
  app.registerController(controller);
  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  
  const wolocationmetersDs = newDatasourceAssetMeter(woassetmeters, 'wolocationmeters');
  app.registerDatasource(wolocationmetersDs);
  
  await woassetmetersDs.load();
  await wolocationmetersDs.load(); 
  
  let multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  app.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  
  const ds1 = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds1;
  
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;
  
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
 
  await woassetmetersDs.load();
  woassetmetersDs.item.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";
  woassetmetersDs.item.computedMeterCurTime = "2023-03-22T10:00:00.000+05:30";
  await controller.validateMeterTime();
  expect(page.state.invalidMeterTime).toBe(false);
  
  woassetmetersDs.item.computedMeterCurDate = "";
  woassetmetersDs.item.computedMeterCurTime = "2023-03-22T10:00:00.000+05:30";
  await controller.validateMeterDate();
  expect(page.state.invalidDateTime).toBe(true);
  
  woassetmetersDs.item.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";
  woassetmetersDs.item.computedMeterCurTime = "";
  await controller.validateMeterTime();
  expect(page.state.invalidDateTime).toBe(true);
});

it("should close date time meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page", state:{"invalidDateTime": true}});

  app.registerController(controller);
  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  controller.closeMeterDateTimeDrawer = jest.fn();
  controller.validatemeter = true;
  await controller.closeMeterDateTimeDrawer();
  expect(controller.closeMeterDateTimeDrawer).toHaveReturnedWith(undefined);
});

it("update meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);


  const wodetails = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(wodetails);

  const wolocationmetersDs = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  app.registerDatasource(wolocationmetersDs);
  
  const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    item: {
      siteid: "BEDFORD",
      locationnum: "BPM3100",
      locationdesc: "#1 Liquid Packaging Line",       
      wonum: "1202"
    },
    assetNum:"13170",
    location: "BPM3100"
  }
  
  await controller.updateMeterDatasources(event)
  
});

it("it should handleDeleteTransaction", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: "schedule"});
  
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  app.registerDatasource(todaywoassignedDS);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  app.currentPage = page;
  controller.pageInitialized(page, app);
  
  page.state = {
    breadcrumbWidth: 68,
    selectedDS : 'todaywoassignedDS'
  }

  let txn = {
    app: "Application",
    href: "testhref",
  };
  
  await controller.handleDeleteTransaction(txn);
  
  // let txn1 = {
  //   app: "Applicationtest",
  //   href: "testhref",
  // };
  
  await controller.handleDeleteTransaction();
});

it('should open Safety Plans page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'woDetailds');
  app.registerDatasource(ds);
  let items = await ds.load();
  sinon.spy(page, 'showDialog'); 
  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openHazardDrawer({'item': items[0], 'datasource': ds});
  
  window.setTimeout(() => {
    expect(page.showDialog.calledOnce).toBe(true);
  }, 500);
});

it('should review Safety Plan', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'woDetailds');
  app.registerDatasource(ds);
  let updateAction = sinon.stub(ds, "update");
  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.reviewSafetyPlan(app);
  expect(updateAction.called).toBe(true);
});

it('should validate handleMapLongPress', async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  app.registerController(controller);
  app.client = {
    userInfo: {
      personid: "SAM",     
      },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  await app.initialize();
  let data = {
    coordinate: [12.1212121212,12.1212121212],
  };
  controller.pageInitialized(page, app);
  controller.handleMapLongPress(data);
  controller.goToCreateWoPage();
  expect(app.state.currentMapData.coordinate).not.toBe(undefined);
});

it('clearCharacterMeterReaing for characterstic meter', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});
  app.registerController(controller);

  const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  ds.newreading = 1/4;
  ds.metername = "HEAD LOSS 1";

  const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
  ds.newreading = 11/16;
  ds.metername = "HEAD LOSS 2";

  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
     item : ds,
     newreading : '',
  }
  await controller.clearCharacterMeterReaing(event);
  expect(event.item.newreading).toBe(event.newreading);
});

it("should not call forceSync ", async () => {
  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'SchedulePage'});
  const page1 = new Page({ name: 'report_work' });
  
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  page.registerDatasource(todaywoassignedDS);
  
  const pmduewolistDS = newDatasource(workorderitem, 'pmduewolistDS');
  page.registerDatasource(pmduewolistDS);  

  let syncSpy = sinon.spy(todaywoassignedDS, 'forceSync');
  let reloadSpy = sinon.spy(todaywoassignedDS, 'forceReload');
  
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(page1);
	app.state.refreshOnSubsequentLogin = false;
  page.state.selectedDS = 'todaywoassignedDS';
  await app.initialize();
  app.setCurrentPage = page;

  sinon.assert.notCalled(syncSpy);
  sinon.assert.calledOnce(reloadSpy);
});

it("should call pagePause", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  const ds = newDatasource(workorderitem, "myworkDS");
  page.registerDatasource(ds);
  app.state = {
    incomingContext: {
      breadcrumb: {
        enableReturnBreadcrumb: true
      }
    },
    screen: {
      size: 'sm'
    }
  };
  page.state = {
    breadcrumbWidth: 68,
    selectedDS : 'myworkDS'
  }

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {
        laborcode: "SAM",
        laborcraftrate: {
          craft: "Electrician",
          skilllevel: "Electrician - 2nd Class",
        },
      },
      user: { logouttracking: { attemptdate: "2022-03-09T09:03:16+05:30" } },
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  app.registerController(controller);
  const overdueDS = newDatasource(workorderitem, 'overdueDS');
  const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
  const pmduewolistDS = newDatasource(workorderitem, 'pmduewolistDS');
  page.registerDatasource(overdueDS);
  page.registerDatasource(todaywoassignedDS);
  page.registerDatasource(pmduewolistDS);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  jest.spyOn(page, 'findDialog');

  await controller.pagePaused();
  expect(page.findDialog('workLogDrawer')).toBeDefined();
});
