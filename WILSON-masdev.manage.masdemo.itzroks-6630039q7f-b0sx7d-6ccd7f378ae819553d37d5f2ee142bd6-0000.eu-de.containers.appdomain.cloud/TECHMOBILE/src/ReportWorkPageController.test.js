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

import ReportWorkPageController from "./ReportWorkPageController";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource, Device,
  Dialog
} from "@maximo/maximo-js-api";
import workorderitem from "./test/wo-failure-report-json-data";
import labor from "./test/labors-json-data";
import sinon from 'sinon';
import statusitem from './test/statuses-json-data';
import failurelist from './test/failurelist-json-data';
import wpmaterial from './test/materials-json-data';
import wolocationmeters from './test/locationmeter-json-data';
import invbalances from './test/invbal-json-data ';
import woassetmeters from './test/assetmeter-json-data';
import toolDetail from './test/tools-json-data';
import toolInventory from './test/tool-inventory-json-data';
import toolLocation from "./test/tool-location-json-data";
import SynonymUtil from './utils/SynonymUtil';

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
function newDatasource(data = workorderitem, items = "member", idAttribute = "wonum", name = "woDetailsReportWork") {
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

function newDatasource1(data, name = "inventbalDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: "idAttribute",
    name: name,
  });

  return ds;
}

function newStatusDatasource(data = statusitem, name = 'reportworksSynonymData') {
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

function newTimerStatusDatasource(data = statusitem, name = 'synonymdomainData') {
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

let singleAsset = {
  member: [
    {
      assetnum: "R ASSET1",
      description: "Testing tool",
      href: "oslc/os/mxapiasset/_UiBBU1NFVDEvQkVERk9SRA--",
      itemnum: "TOOL1",
      location: "PKG",
      siteid: "BEDFORD",
      _rowstamp: "4387136"
    }
  ]
};

let singleBin = {
  member: [
    {
      itemnum: "TORCH",
      _rowstamp: "932187",
      curbal: 2.0,
      invbalancesid: 848,
      binnum: "Tools",
      lotnum: "",
      siteid: "BEDFORD",
      location: "CENTRAL",
      href: "oslc/os/mxapiinvbal/_VG9vbHMvfk5VTEx_L1RPUkNIL1NFVDEvQ0VOVFJBTC9_TlVMTH4vQkVERk9SRA--"
    }
  ]
};

let singleBlankBin = {
  member: [
    {
      itemnum: "TORCH",
      _rowstamp: "932187",
      curbal: 2.0,
      invbalancesid: 848,
      binnum: "",
      lotnum: "",
      siteid: "BEDFORD",
      location: "CENTRAL",
      href: "oslc/os/mxapiinvbal/_VG9vbHMvfk5VTEx_L1RPUkNIL1NFVDEvQ0VOVFJBTC9_TlVMTH4vQkVERk9SRA--"
    }
  ]
};

let multiBin = {
  member: [
    {
      itemnum: "TORCH",
      _rowstamp: "932187",
      curbal: 2.0,
      invbalancesid: 848,
      binnum: "Tools",
      siteid: "BEDFORD",
      location: "CENTRAL",
      href: "oslc/os/mxapiinvbal/_VG9vbHMvfk5VTEx_L1RPUkNIL1NFVDEvQ0VOVFJBTC9_TlVMTH4vQkVERk9SRA--"
    },
    {
      itemnum: "TORCH",
      _rowstamp: "932188",
      curbal: 2.0,
      invbalancesid: 843,
      binnum: "D-2-5",
      siteid: "BEDFORD",
      location: "CENTRAL",
      href: "oslc/os/mxapiinvbal/_VG9vbHMvfk5VTEx_L1RPUkNIL1NFVDEvQ0VOVFJBTC9_TlVMTH4vQkVERk9SRA--"
    }
  ]
};

let singleLocation = {
  member: [
    {
      _rowstamp: "132642",
      description: "Packaging Dept. Storeroom",
      siteid: "BEDFORD",
      location: "PKG",
      href: "oslc/os/mxapilocations/_UEtHL0JFREZPUkQ-"
    }
  ]
};

let taskDetail = {
  member: [
    {
      description: "scheduling",
      href: "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC9UMTA4MA--",
      localref: "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjEx/woactivity/1-133366",
      status: "APPR",
      status_description: "Approved",
      status_maxvalue: "APPR",
      taskid: 10,
      parent: '1202',
      workorderid: 'WO120210'
    },
    {
      description: "scheduling",
      href: "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC9UMTA4MA--",
      localref: "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjEx/woactivity/1-133366",
      status: "APPR",
      status_description: "Approved",
      status_maxvalue: "APPR",
      taskid: 20,
      parent: '1202',
      workorderid: 'WO120220'
    }
  ]
};

let toolJson = {
  member: [
    {
      itemid: 282,
      item_itemnum: "TORCH",
      item_description: "OXYGEN ACETYLENE CUTTING UNITS",
      href: "oslc/os/mxapitoolitem/_VE9SQ0gvU0VUMQ--",
      _rowstamp: "94666",
      rotassetnum: "",
      toolhrs: 2,
      item_toolqty: 3,
      storeloc: "CENTRAL",
    },
  ],
};

let materialJson = {
  member: [
    {
      item_itemnum: "ROTATING ITEM",
      assetnum: "1007",
      storeloc: "CENTRAL",
      item_positivequantity: 0,
    },
  ],
};


it("should load work order data with failure report", async () => {
  let setFailureReportData = jest.fn();

  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}}
    }
  };
  app.registerController(controller);

  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);

  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
  const itemsDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemsDS');

  const woReportWorkDs = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const reportWorkActualMaterialDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  const materialDs = newDatasource(workorderitem, 'member', 'wonum', 'reportWorkMaterialDetailDs');

  page.registerDatasource(craftrate);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(inventoryDS);
  page.registerDatasource(synonymDSData);
  page.registerDatasource(locationDS);
  page.registerDatasource(reportWorkActualMaterialDs);
  page.registerDatasource(materialDs);
  app.registerDatasource(itemsDS);

  app.registerPage(page);
  await app.initialize();

  controller.setFailureReportData = setFailureReportData;
  app.state = {
    systemProp: {
      'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR'
    },
  };
  controller.pageInitialized(page, app);

  reportworksSynonymData.load();
  app.state.incomingContext = {page: 'report_work', itemnum: '123232', itemsetid:'SET1'};
  sinon.stub(SynonymUtil, 'getSynonym').returns({value: 'WAPPR', maxvalue: 'WAPPR', description: 'WAPPR'});

  page.registerDatasource(itemsDS);
  controller.loadRecord();
  expect(page.state.causeValue).toEqual("");
  expect(page.state.remedyValue).toEqual("");
  expect(page.state.itemnum).toEqual(undefined);
  return woReportWorkDs.forceReload().then(() => {
    expect(controller.setFailureReportData).toHaveBeenCalledTimes(1);
    expect(setFailureReportData.mock.calls[0][0]).toEqual(workorderitem.member);
  });
});

it("should set cause and remedy in page state when record is passed", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});

  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const woDetailsReportWork = newDatasource(wpmaterial, "wodetails", "wonum", "woDetailsReportWork");
  const craftRate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  failureListDS.load();
  app.registerDatasource(failureListDS);
  app.registerController(controller);
  app.registerPage(page);
  page.dsFailureList = failureListDS;
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(woDetailsReportWork);
  page.registerDatasource(craftRate);

  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  await app.initialize();
  controller.pageInitialized(page, app);

  expect(page.state.causeValue).toEqual(undefined);
  expect(page.state.remedyValue).toEqual(undefined);
  await controller.setFailureReportData(workorderitem.member);
  expect(page.state.causeValue).toEqual("Carton Spillage");
  expect(page.state.remedyValue).toEqual("Adjusted Timing of Lifter");
});

it("should set cause and remedy in page state in container mode", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});

  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const woDetailsReportWork = newDatasource(wpmaterial, "wodetails", "wonum", "woDetailsReportWork");
  const craftRate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  failureListDS.load();
  app.registerDatasource(failureListDS);
  app.registerController(controller);
  app.registerPage(page);
  page.dsFailureList = failureListDS;
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(woDetailsReportWork);
  page.registerDatasource(craftRate);
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };

  Device.get().isMaximoMobile = true;

  await app.initialize();
  controller.pageInitialized(page, app);

  expect(page.state.causeValue).toEqual(undefined);
  expect(page.state.remedyValue).toEqual(undefined);
  await controller.setFailureReportData(workorderitem.member);
  expect(page.state.causeValue).toEqual("Carton Spillage");
  expect(page.state.remedyValue).toEqual("Adjusted Timing of Lifter");

  workorderitem.member[0].causedelete = true;
  workorderitem.member[0].remedydelete = true;

  await controller.setFailureReportData(workorderitem.member);
  expect(page.state.causeValue).toEqual('');
  expect(page.state.remedyValue).toEqual('');

  workorderitem.member[0].failurereport = undefined;
  await controller.setFailureReportData(workorderitem.member);
  expect(page.state.failureClassValue).toEqual('Packaging Line Failures');
  Device.get().isMaximoMobile = false;
});

it("should not set cause and remedy in page state when no record passed", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  app.registerDatasource(failureListDS);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(woDetailsReportWork);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.setFailureReportData();
  expect(page.state.causeValue).toEqual('');
  expect(page.state.remedyValue).toEqual('');
});

it("it should set saveDataSuccessful to false ", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const labordetails = newDatasource(labor, "labordetails1", "labtransid", "reportworkLaborDetailds");
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'wonum', 'reportWorkActualToolsDetailDs');
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(labordetails);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(wodetails);
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "report_work" };
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.onSaveDataFailed();
  expect(controller.saveDataSuccessful).toBe(false);      
});

it('Verify onCustomSaveTransition function', async () => {
	let mockedFn = jest.fn();
	const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
		userInfo: {
			personid: 'SAM',
      insertSite: 'BEDFORD',
			labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
		},
	};
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const woDetailsReportWork = newDatasource(wpmaterial, "wodetails", "wonum", "woDetailsReportWork");
  const labordetails = newDatasource(labor, "labordetails1", "labtransid", "reportworkLaborDetailds");
	const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
	const tooldetailDs = newDatasource(workorderitem, 'member', 'wonum', 'reportWorkActualToolsDetailDs');
	const woReportWorkDs = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDs');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(woDetailsReportWork);
	page.registerDatasource(labordetails);
	page.registerDatasource(craftrate);
	page.registerDatasource(tooldetailDs);
	page.registerDatasource(woReportWorkDs);
	app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);
  controller.pageInitialized(page, app);

  page.state = { callMethodAction: 'LABOR' };
  controller.saveLaborTransaction = mockedFn;	
	await app.initialize();
  await controller.onCustomSaveTransition();
  
  page.state = { callMethodAction: 'TOOL' };
  page.state.disableToolAction = false;
  controller.saveToolDetail = mockedFn;	
	await app.initialize();
  await controller.onCustomSaveTransition();

  page.state = { callMethodAction: 'TOOL' };
  page.state.disableToolAction = true;
  let value1 = await controller.onCustomSaveTransition();
  expect(value1.saveDataSuccessful).toBe(true);
  expect(value1.callDefaultSave).toBe(false);

  page.state = { callMethodAction: 'MATERIAL' };
  page.state.disableAction = false;
  controller.saveMaterialTransaction = mockedFn;	
	await app.initialize();
  await controller.onCustomSaveTransition();

  page.state = { callMethodAction: 'MATERIAL' };
  page.state.disableAction = true;
  let value2 = await controller.onCustomSaveTransition();
  expect(value2.saveDataSuccessful).toBe(true);
  expect(value2.callDefaultSave).toBe(false);

  page.state = { callMethodAction: 'LABOR' };
  page.state.errorMessage = true;
  controller.saveLaborTransaction = mockedFn;	
	await app.initialize();
  await controller.onCustomSaveTransition();
});

it("Open the labor time drawer in update mode", async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  page.showDialog = showDialog;

  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);

  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const labordetails = newDatasource(labor, "labordetails", "labtransid", "reportworkLaborDetailds");
  const laborDs = newDatasource(labor, "labordetails", "labtransid", "laborDs");
  const woDetailsReportWork = newDatasource(wpmaterial, "wodetails", "wonum", "woDetailsReportWork");
  const taskLookupDS = newDatasource(taskDetail, 'member', 'taskid', 'woTaskds');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(labordetails);
  page.registerDatasource(woDetailsReportWork);
  app.registerDatasource(laborDs);
  page.registerDatasource(taskLookupDS);

  await woDetailsReportWork.load();
  let labtrans = await labordetails.load();
  sinon.stub(labordetails, "addNew").returns(labtrans);
});

it("Open the labor time drawer in add mode", async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work", state: {action: 'add'}});
  page.showDialog = showDialog;

  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'},
      displayName: 'Sam Murphy'
    }
  };
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  const synonymdomainData = newTimerStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);

  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const labordetails = newDatasource(labor, "labordetails", "labtransid", "reportworkLaborDetailds");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
  const laborDs = newDatasource(labor, "labordetails", "labtransid", "laborDs");
  const taskLookupDS = newDatasource(taskDetail, 'member', 'taskid', 'woTaskds');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);

  page.registerDatasource(inventoryDS);
  page.registerDatasource(synonymDSData);
  page.registerDatasource(locationDS);
  page.registerDatasource(craftrate);
  page.registerDatasource(labordetails);
  page.registerDatasource(woDetailsReportWork);
  page.registerDatasource(reportworkLabords);
  app.registerDatasource(laborDs);
  app.registerDatasource(craftrate);
  page.registerDatasource(taskLookupDS);
  sinon.stub(reportworkLabords, "clearState");
  await woDetailsReportWork.load();
  let labtrans = await labordetails.load();
  sinon.stub(labordetails, "addNew").returns(labtrans[0]);
  app.state = {
    systemProp: {
      'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR'
    },
  };
  controller.pageInitialized(page, app);
  await controller.openReportTimeDrawer({action: 'add'});
  expect(woDetailsReportWork.items.length).toEqual(1);
  expect(page.state.disableButton).toBe(false);

  await controller.loadAndOpenReportTimeDrawer({action: 'update', item: {personid: 'SAM'}});

  app.state.networkConnected = false;
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: ''}, laborcode: 'SAM'},
      displayName: 'Sam Murphy'
    }
  };
  controller.pageInitialized(page, app);
  controller.openReportTimeDrawer({action: 'add'});

  app.state.networkConnected = true;
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: '', skilllevel: ''}, laborcode: 'SAM'},
      displayName: 'Sam Murphy'
    }
  };
  controller.pageInitialized(page, app);
  controller.openReportTimeDrawer({action: 'add'});
});

it("Validate the time", async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work", state: {action: 'add'}});
  page.showDialog = showDialog;

  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);

  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const labordetails = newDatasource(labor, "labordetails", "labtransid", "reportworkLaborDetailds");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(labordetails);
  page.registerDatasource(woDetailsReportWork);
  controller.pageInitialized(page, app);

  await woDetailsReportWork.load();
  let labtrans = await labordetails.load();
  sinon.stub(labordetails, "addNew").returns(labtrans);


  controller.validateRegularHrs({'page': page, 'app': app});

  expect(woDetailsReportWork.items.length).toEqual(1);
});

it("Validate the regular hours with string", async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work", state: {action: 'add'}});
  page.showDialog = showDialog;

  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);


  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const labordetails = newDatasource(labor, "labordetails1", "labtransid", "reportworkLaborDetailds");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(labordetails);
  page.registerDatasource(woDetailsReportWork);

  await woDetailsReportWork.load();
  let labtrans = await labordetails.load();
  sinon.stub(labordetails, "addNew").returns(labtrans);

  controller.pageInitialized(page, app);
  labordetails.item.starttime = '2020-12-14T00:30:00+05:30';
  labordetails.item.startdate = '2020-12-14T00:00:00.000+05:30';
  labordetails.item.finishtime = '';
  labordetails.item.finishdate = '';
  labordetails.item.regularhrs = 1;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.finishdate = '2020-10-23T00:00:00.000+05:30';
  labordetails.item.finishtime = '';
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.startdate = '2020-10-23T00:00:00.000+05:30';
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.startdate = '2020-10-23T00:00:00.000+05:30';
  labordetails.item.starttime = '';
  labordetails.item.regularhrs = '';
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.startdate = '';
  labordetails.item.starttime = '';
  labordetails.item.finishtime = '2020-10-30T01:00:00+05:30';
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.startdate = '2020-11-02T00:00:00.000+05:30';
  labordetails.item.starttime = '2020-10-30T01:00:00+05:30';
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T01:00:00+05:30';
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T01:00:00+05:30';
  labordetails.item.startdate = '2020-10-24T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T02:00:00-04:00';
  labordetails.item.finishdate = '2020-10-23';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T01:00:00+05:30';
  labordetails.item.startdate = '2020-10-23T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T02:00:00+05:30';
  labordetails.item.finishdate = '2020-10-24T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-10-23T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2020-10-23T00:00:00.000+05:30';
  labordetails.item.regularhrs = 2;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-10-22T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2020-10-23T00:00:00.000+05:30';
  labordetails.item.regularhrs = 2;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-10-22T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2020-11-20T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T17:00:00+05:30';
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2020-12-03T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T17:30:00+05:30';
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T01:30:00+05:30';
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = null;
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T01:30:00+05:30';
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T01:00:00+05:30';
  labordetails.item.finishdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T01:30:00+05:30';
  labordetails.item.startdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.finishtime = '2021-02-06T23:00:00+05:30';
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-03T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2020-12-10T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-03T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T08:00:00+05:30';
  labordetails.item.finishdate = '2020-12-10T00:00:00.000+05:30';
  labordetails.item.regularhrs = 1;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-03T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T20:00:00+05:30';
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-03T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2020-12-02T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-30T05:00:00+05:30';
  labordetails.item.startdate = '2020-10-03T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-30T06:00:00+05:30';
  labordetails.item.finishdate = '2020-10-03T00:00:00.000+05:30';
  labordetails.item.regularhrs = -4;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-12-03T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2022-01-01T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = null;
  labordetails.item.finishtime = '2022-01-01T20:00:00.000+05:30';
  labordetails.item.finishdate = null;
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = null;
  labordetails.item.startdate = '2020-10-03T00:00:00.000+05:30';
  labordetails.item.finishtime = null;
  labordetails.item.finishdate = '2019-10-03T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-03T02:00:00.000+05:30';
  labordetails.item.startdate = '2020-10-03T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-03T01:00:00.000+05:30';
  labordetails.item.finishdate = '2019-10-03T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  controller.validateRegularHrs({'page': page, 'app': app});

  labordetails.item.starttime = '2020-10-03T02:00:00.000+05:30';
  labordetails.item.startdate = '2020-10-03T00:00:00.000+05:30';
  labordetails.item.finishtime = '2020-10-03T01:00:00.000+05:30';
  labordetails.item.finishdate = '2019-10-03T00:00:00.000+05:30';
  labordetails.item.regularhrs = null;
  page.state.dateTimeFieldsChanged = true;
  controller.validateRegularHrs({'page': page, 'app': app});

  controller.combineDateTime("2020-12-14T00:00:00.000+05:30", "2020-12-14T05:00:00+05:30");

  controller.calculateLaborDateTime("2020-12-14T00:00:00.000+05:30", "2020-12-14T05:00:00+05:30", 2);

  controller.calculateLaborDateTime("2020-12-14T07:00:00.000+05:30", "2020-12-14T05:00:00+05:30", 2, true);

  let datetime3 = controller.getOnlyDatePart("2020-12-14T05:00:00+05:30");
  expect(datetime3).toContain('T00:00:00');

  let datetime4 = controller.getMinutes("2020-12-14T05:00:00");
  expect(datetime4).toEqual(300);
});


it("Add labor transaction", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  const schedulepage = new Page({name: "schedule"});
  const reportTimeDrawer = new Dialog({
    name: 'reportTimeDrawer'
  });

  page.registerDialog(reportTimeDrawer);
  app.registerPage(page);
  app.registerPage(schedulepage);

  page.showDialog = jest.fn();
  reportTimeDrawer.closeDialog = jest.fn();
  page.state = {action: 'add'}
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'},
      defaultSite: 'BEDFORD'
    }
  };
  app.registerController(controller);
  await app.initialize();

  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  page.registerDatasource(synonymDSData);

  let craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const labordetails = newDatasource(labor, "labordetails1", "labtransid", "reportworkLaborDetailds");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const synonymdomainData = newTimerStatusDatasource(statusitem, 'synonymdomainData');
  let jreportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "jreportworkLabords");
  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const locationDS = newDatasource(wolocationmeters, 'member', 'location', 'locationDS');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(locationDS);
  page.registerDatasource(inventoryDS);
  app.registerDatasource(synonymdomainData);
  page.registerDatasource(craftrate);
  page.registerDatasource(labordetails);
  page.registerDatasource(woDetailsReportWork);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(jreportworkLabords);

  let labtrans = await labordetails.load();
  await jreportworkLabords.load();
  sinon.stub(labordetails, "addNew").returns(labtrans);

  controller.pageInitialized(page, app);
  let sarchQBEStubLaborType = sinon.stub(reportworksSynonymData, 'searchQBE').callThrough();
  await controller.loadRecord();
  labordetails.item.regularhrs = 0;
  expect(sarchQBEStubLaborType.displayName).toBe('searchQBE');
  await controller.saveLaborTransaction({'page': page, 'app': app});

  let updateAction = sinon.stub(labordetails, "update");
  let putAction = sinon.stub(labordetails, "put");

  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(true);

  updateAction.restore();
  updateAction = sinon.stub(labordetails, "update");
  craftrate.item.defaultcraft = true;
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(true);

  updateAction.restore();
  updateAction = sinon.stub(labordetails, "update");
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(true);
  updateAction.restore();
 
  page.state = {action: 'add', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(putAction.called).toBe(true);
  putAction.restore();
  
  putAction = sinon.stub(labordetails, "put");
  page.state = {action: 'add', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  labordetails.item.finishdate = '';
  labordetails.item.finishtime = '';
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(putAction.called).toBe(true);
  putAction.restore();

  updateAction = sinon.stub(labordetails, "update");
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  labordetails.item.finishdate = '2020-10-20';
  labordetails.item.finishtime = '05:00';
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(false);
  updateAction.restore();

  updateAction = sinon.stub(labordetails, "update");
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  labordetails.item.startdate = '';
  labordetails.item.starttime = '';
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(false);
  updateAction.restore();

  updateAction = sinon.stub(labordetails, "update");
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);
  labordetails.item.startdate = '';
  labordetails.item.starttime = '';
  labordetails.item.regularhrs = 1;
  controller.pageInitialized(page, app);
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(false);
  updateAction.restore();

  updateAction = sinon.stub(labordetails, "update");
  let orginalMobile = Device.get().isMaximoMobile;
  Device.get().isMaximoMobile = true;
  const detailPage = new Page({name: "wodetails"});
  const woDetailResource = newDatasource(workorderitem, "member", "wonum", "woDetailResource");
  detailPage.registerDatasource(woDetailResource);
  app.registerPage(detailPage);
  Device.get().isMaximoMobile = orginalMobile;
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  labordetails.item.finishdate = '2020-10-20T00:00:00';
  labordetails.item.finishtime = '2020-10-20T05:00:00';
  await controller.saveLaborTransaction({'page': page, 'app': app});
  expect(updateAction.called).toBe(false);
  updateAction.restore();

  await app.initialize();
  app.state.networkConnected = false;
  page.state = {action: 'update', craftdata: {craft: "ELECT", skilllevel: "SECONDCLASS", rate: 10}};
  controller.pageInitialized(page, app);

  labordetails.item.finishdate = '2020-10-20T00:00:00';
  labordetails.item.finishtime = '2020-10-20T05:00:00';
  await controller.saveLaborTransaction({'page': page, 'app': app});

  controller.selectCraftSkill({skillleveldescdata: 'SECONDCLASS', craft: "ELECT", rate: 10, skillleveldata: 'ELECT'});
  controller.selectCraftSkill({skillleveldescdata: 'SECONDCLASS', craft: "ELECT", rate: 10});
  
  //Validate if there is no skilllevel exist
  craftrate.item.skillleveldata = undefined;
  app.state = {
    systemProp: {
      'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR'
    },
  };
  controller.loadRecord();
  expect(page.datasources['craftrate'].item.skillleveldata).toBe(undefined);

  //Validate if there is no defaultcraft exist
  craftrate.item.defaultcraft = false;
  controller.loadRecord();
  expect(page.datasources['craftrate'].item.defaultcraft).toBe(false);

  craftrate.item.craft = "ELECT";
  craftrate.item.skillleveldata = "SECONDCLASS";
  page.state = {craft: "ELECT", skilllevel: "SECONDCLASS"};
  controller.pageInitialized(page, app);
  controller.openCraftSkillLookup({'page': page, 'app': app, 'openLookup': true});
  expect(page.datasources['craftrate'].item.skillleveldata).toEqual("SECONDCLASS");

  craftrate.item.craft = "ELECT";
  craftrate.item.skillleveldata = undefined;
  page.state = {craft: "ELECT", skilllevel: undefined};
  controller.pageInitialized(page, app);
  controller.openCraftSkillLookup({'page': page, 'app': app, 'openLookup': true});
  expect(page.datasources['craftrate'].item.skillleveldata).toBe(undefined);

  page.state = {transTypeValue: "WORK", transTypeDesc: "Actual work time"};
  controller.pageInitialized(page, app);
  controller.openTransTypeLookup({'page': page, 'app': app});

  let exists = false;
  exists = controller.checkLaborAlreadyExists([{
    "labtransid": "1234",
    "startdate": "2020-10-22T00:00:00-04:00",
    "transtype": "work",
    "laborcode": "SAM"
  }], 'SAM');
  expect(exists).toBeTruthy();

  exists = controller.checkLaborAlreadyExists([{
    "labtransid": "1234",
    "startdate": "2020-10-22T00:00:00-04:00",
    "transtype": "work",
    "laborcode": "SAM"
  }], 'ELI');
  expect(exists).toBe(false);

  page.state = {groupedByLabor: true};
  app.registerPage(page);
  app.registerPage(schedulepage);
  controller.pageInitialized(page, app);
  controller.onAfterLoadData({"name": 'reportworkLabords'}, [{
    "labtransid": "1234",
    "startdate": "2020-10-22T00:00:00-04:00",
    "transtype": "work",
    "laborcode": "SAM"
  }]);
  expect(jreportworkLabords.items).not.toBe(undefined);

  controller.onAfterLoadData({"name": 'reportworkLabords'}, []);
  expect(jreportworkLabords.items).not.toBe(undefined);
});

it("Choose transaction type", async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  page.showDialog = showDialog;
  page.state = {action: 'add'}
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  page.registerDatasource(synonymDSData);
  const labordetails = newDatasource(labor, "labordetails1", "labtransid", "reportworkLaborDetailds");
  page.registerDatasource(labordetails);
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  page.registerDatasource(woDetailsReportWork);
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  await labordetails.load();

  page.state = {transTypeVal: "", transTypeDesc: ''};
  controller.pageInitialized(page, app);
  controller.chooseTransType({value: "WORK", description: 'WORK'});
  controller.chooseTransType();
});

it("should openFailureList details passed", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  const page1 = new Page({name: "failureDetails"});
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  let workorder = {'item': {'wonum': 'SCRAP_4', 'siteid': 'BEDFORD', 'orgid': 'EAGLENA'}};
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetailsreportwork = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);

  page1.registerDatasource(reportworksSynonymData);
  app.registerDatasource(synonymdomainData);
  page1.registerDatasource(craftrate);
  page1.registerDatasource(inventoryDS);
  page1.registerDatasource(synonymDSData);
  page1.registerDatasource(locationDS);

  app.registerController(controller);
  page1.registerDatasource(reportworkLabords);
  page1.registerDatasource(wodetailsreportwork);
  app.registerPage(page);
  app.registerPage(page1);
  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.openFailureDetails(workorder);
  expect(page1.state.navigateToFailureDetails).toBeTruthy();
});


it("validate EndDateTime before save", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});

  app.registerPage(page);

  page.state = {dateTimeRemoved: true};
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);

  const reportworkLaborDetailds = newDatasource(labor, "labordetails1", "labtransid", "reportworkLaborDetailds");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(reportworkLaborDetailds);
  page.registerDatasource(woDetailsReportWork);

  woDetailsReportWork.item.labtranstolerance = 0;
  reportworkLaborDetailds.item.startdate = '2021-02-19T00:00:00';
  reportworkLaborDetailds.item.starttime = '2021-02-19T05:00:00';
  reportworkLaborDetailds.item.regularhrs = 30;

  controller.validateEndDateTime({'page': page, 'app': app}, app, page);

  reportworkLaborDetailds.item.startdate = '2021-02-19T00:00:00';
  reportworkLaborDetailds.item.starttime = '2021-02-19T05:00:00';
  reportworkLaborDetailds.item.regularhrs = 17;

  controller.validateEndDateTime({'page': page, 'app': app});
});


it('Open the openMaterialsDrawer()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData); 
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'wonum', 'reportWorkMaterialDetailDs');
  const itemsDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemsDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const taskLookupDS = newDatasource(taskDetail, 'member', 'taskid', 'woTaskds');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);

  page.registerDatasource(craftrate);
  page.registerDatasource(woReportWorkDs);
  app.registerDatasource(itemsDS);
  page.registerDatasource(synonymDSData);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  app.registerController(controller);
  page.registerController(taskLookupDS);

  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  await controller.openMaterialsDrawer({page: page, app: app}, app, page);
  expect(page.state.isSavedMaterial).toBe(true);
  expect(page.state.saveAction).toBe(true);
  expect(page.state.disableAction).toBe(true);
});

it('Open the openMaterialLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };

  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);  
  const itemsDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemsDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(itemsDS);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};
  itemsDS.item.itemnum = '20778';

  await controller.openMaterialLookup(evt);
  expect(page.datasources['itemsDS'].item.itemnum).toEqual('20778');
});

it('Open the openStoreRoomLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };

  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);  
  const locationDS = newDatasource(wolocationmeters, 'member', 'location', 'locationDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(locationDS);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};
  locationDS.item.location = 'CENTRAL';

  await controller.openStoreRoomLookup(evt);
  expect(page.datasources['locationDS'].item.location).toEqual('CENTRAL');
});

it('Open the openBinLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BADFORD',
    },
  };
  const inventbalDS = newDatasource(invbalances, 'member', 'binnum', 'inventbalDS');
  page.registerDatasource(inventbalDS);
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};
  inventbalDS.item.binnum = '6-7-8';

  await controller.openBinLookup(evt);
  expect(page.datasources['inventbalDS'].item.binnum).toEqual('6-7-8');
});

it('Open the openTransactionTypeLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  app.registerDatasource(synonymdomainData);
  
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  page.registerDatasource(craftrate);
  page.registerDatasource(synonymDSData);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};
  synonymDSData.item.transType = 'ISSUE';

  await controller.openTransactionTypeLookup(evt);
  expect(page.datasources['synonymDSData'].item.transType).toEqual('ISSUE');
});

it('verify the setStoreRoom()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerPage(page);
  const inventbalDS = newDatasource(invbalances, 'member', 'binnum', 'inventbalDS');
  page.registerDatasource(inventbalDS);

  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  const locationDS = newDatasource(toolLocation, 'member', 'location', 'locationDS');
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  page.registerDatasource(craftrate);
  page.registerDatasource(inventoryDS);
  app.registerDatasource(synonymDSData);
  page.registerDatasource(locationDS);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  app.registerController(controller);
  sinon.stub(inventoryDS, "searchQBE");
  await woReportWorkDs.load();
  await locationDS.load();
  await wodetails.load();
  await synonymDSData.load();
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};
  await controller.setStoreRoom(evt);
});

it('verify the setBinNumber()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BADFORD',
    },
  };
  const inventbalDS = newDatasource(invbalances, 'member', 'binnum', 'inventbalDS');
  page.registerDatasource(inventbalDS);

  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(inventoryDS);
  page.registerDatasource(synonymDSData);
  page.registerDatasource(locationDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};
  await controller.setBinNumber(evt);
});

it('Choose transactionType lookup', async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  page.showDialog = showDialog;
  page.state = {action: 'add'};
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'},
    },
  };
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  const labordetails = newDatasource(labor, 'labordetails1', 'labtransid', 'reportworkLaborDetailds');
  page.registerDatasource(labordetails);
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  page.registerDatasource(woReportWorkDs);
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);

  await woReportWorkDs.load();

  page.state = {transTypeVal: '', transTypeDesc: ''};
  controller.pageInitialized(page, app);
  controller.chooseTransactionType({value: 'WORK', description: 'WORK'});
  expect(page.datasources['reportWorkMaterialDetailDs'].item.transtype).toEqual('WORK');
  expect(page.datasources['reportWorkMaterialDetailDs'].item.transtype_description).toEqual('WORK');
});

it('Choose chooseMaterial', async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'},
    },
  };
  page.showDialog = showDialog;
  const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
  page.registerDatasource(inventoryDS);
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt = {
    itemnum: '10001',
    description: 'Test-material',
  };

  controller.pageInitialized(page, app);
  controller.chooseMaterial(evt);
  expect(page.state.itemnum).toEqual('10001');
});

it('Choose chooseStoreRoom', async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  page.showDialog = showDialog;
  const binNumberDS = newDatasource(invbalances, 'member', 'binnum', 'inventbalDS');
  page.registerDatasource(binNumberDS);
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  const rotatingAssetDS = newDatasource(woassetmeters, 'member', 'assetnum', 'rotatingAssetDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(woReportWorkDs1);
  page.registerDatasource(craftrate);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt = {
    itemnum: '10001',
    location: 'CENTRAL',
    description: 'central-storeroom',
  };
  controller.pageInitialized(page, app);
  controller.chooseStoreRoom(evt);
  expect(page.state.storeloc).toEqual('CENTRAL');
});

it('Choose chooseBinNumber', async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  page.showDialog = showDialog;
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt = {
    itemnum: '10001',
    binnum: '2-3-4',
    curbal: '123',
    conditioncode: 'NEW',
  };
  controller.pageInitialized(page, app);
  controller.chooseBinNumber(evt);
  expect(page.datasources['reportWorkMaterialDetailDs'].item.binnum).toEqual('2-3-4');
  expect(page.datasources['reportWorkMaterialDetailDs'].item.conditioncode).toEqual('NEW');
});

it('Choose validateMaterial', async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  page.showDialog = showDialog;
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  page.registerDatasource(wodetails);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(reportworkLabords);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.validateMaterial({page: page, app: app});
  expect(page.state.disableAction).toEqual(true);
});

it('Choose validateMaterial for Rotating asset', async () => {
  let showDialog = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  page.showDialog = showDialog;
  page.state.isRotating = true;
  const woReportWorkDs = newDatasource(materialJson, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const woReportWorkDs1 = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  page.registerDatasource(wodetails);
  page.registerDatasource(woReportWorkDs);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(woReportWorkDs1);
  const rotatingAssetDS = newDatasource1(singleAsset, 'rotatingAssetDS');
  page.registerDatasource(rotatingAssetDS);
  app.registerController(controller);
  app.registerPage(page);
  
  await woReportWorkDs1.load();
  await wodetails.load();
  await woReportWorkDs.load();
  await rotatingAssetDS.load();
  
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.validateMaterial({page: page, app: app});
  expect(page.state.disableAction).toEqual(false);

  woReportWorkDs.items[0].assetnum = undefined;
  controller.validateMaterial({page: page, app: app});
  expect(page.state.disableAction).toEqual(true);
});

it('validate saveMaterialTransaction', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkMaterialDetailDs');
  await woReportWorkDs.load();
  page.registerDatasource(woReportWorkDs);
  const matListds = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  await matListds.load();
  page.registerDatasource(matListds);

  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  page.registerDatasource(reportworkLabords);
  let forceReloadStub = sinon.stub(woReportWorkDs, 'forceReload');
  let forceReloadStubListDs = sinon.stub(matListds, 'forceReload');
  app.registerController(controller);

  const materialsDrawer = new Dialog({name: "materialsDrawer"});
  page.registerDialog(materialsDrawer);
  page.showDialog = jest.fn();
  materialsDrawer.closeDialog = jest.fn();

  app.registerPage(page);
  await app.initialize();
  page.state.isSavedMaterial = true;
  page.state.saveAction = true;
  controller.pageInitialized(page, app);
  controller.saveMaterialTransaction({page: page, app: app});
  expect(page.state.loadingSaveMaterial).toEqual(true);
  expect(page.state.isSavedMaterial).toEqual(false);
  expect(forceReloadStub.displayName).toBe('forceReload');
  expect(forceReloadStubListDs.displayName).toBe('forceReload');
  forceReloadStub.restore();
  forceReloadStubListDs.restore();
});

it("validate setCraftSkill", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});

  app.registerPage(page);

  page.state = {laborCode: 'ELI'};
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}}
    }
  };
  app.registerController(controller);


  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const labordetails = newDatasource(labor, "labordetails", "labtransid", "reportworkLaborDetailds");
  let craftRateStub = sinon.stub(craftrate, 'searchQBE');
  page.registerDatasource(craftrate);
  page.registerDatasource(labordetails);

  await app.initialize();
  controller.pageInitialized(page, app);

  await controller.setCraftSkill();
  expect(craftRateStub.called).toBe(true);
});

it("validate selectLabor", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerPage(page);
  app.registerController(controller);

  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymDSData);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const labordetails = newDatasource(labor, "labordetails", "labtransid", "reportworkLaborDetailds");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(craftrate);
  page.registerDatasource(labordetails);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;

  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {
    laborcode: 'ELI',
    displayname: 'Eli Richards'
  }

  await controller.selectLabor(evt);
  expect(page.state.laborCode).toBe('ELI');
});

it("validate openLaborLookup", async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    },
  };
  app.registerPage(page);

  page.state = {laborCode: 'ADAMS', laborCodeDesc: 'Hank Adams'};
  app.registerController(controller);


  const laborDs = newDatasource(labor, "labordata", "laborid", "laborDs");
  let laborDstub = sinon.stub(laborDs, 'searchQBE');
  page.registerDatasource(laborDs);

  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(wodetails);
  await app.initialize();
  controller.pageInitialized(page, app);

  let evt = {
    orgid: 'EAGLENA',
    page: page
  }
  await controller.openLaborLookup(evt);
  expect(laborDstub.called).toBe(true);
});


it('Open the RotatingAssetLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    },
  };
  const rotatingAssetDS = newDatasource(woassetmeters, 'member', 'assetnum', 'rotatingAssetDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(reportworkLabords);
  app.registerController(controller);
  rotatingAssetDS.item.assetnum = '13170';
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  controller.openRotatingAssetLookup({page: page, app: app});
  expect(page.datasources['rotatingAssetDS'].item.assetnum).toEqual('13170');
});

it('Choose chooseRotatingAsset', async () => {
  let showDialog = jest.fn();
  let validateMaterial = jest.fn();
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    },
  };
  page.showDialog = showDialog;
  controller.validateMaterial = validateMaterial;
  const rotatingAssetDS = newDatasource(workorderitem, 'member', 'assetnum', 'reportWorkMaterialDetailDs');
  page.registerDatasource(rotatingAssetDS);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt = {
    assetnum: '10001',
    description: 'test description',
  };
  controller.pageInitialized(page, app);
  controller.chooseRotatingAsset(evt);
  expect(page.datasources['reportWorkMaterialDetailDs'].item.assetnum).toEqual('10001');
  expect(page.datasources['reportWorkMaterialDetailDs'].item.asset_description).toEqual('test description');
  expect(controller.validateMaterial.mock.calls.length).toBe(1);
});

it('verify the getRotatingAsset()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    },
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  page.registerDatasource(synonymDSData);
  const rotatingAssetDS = newDatasource(woassetmeters, 'member', 'assetnum', 'rotatingAssetDS');
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualMaterialDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);
  page.registerDatasource(craftrate);
  page.registerDatasource(wodetails);
  page.registerDatasource(reportworkLabords);  
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(woReportWorkDs);
  app.registerController(controller);
  app.registerPage(page);
  await woReportWorkDs.load();
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.getRotatingAsset();
  expect(page.state.rotatingAsset).toEqual(true);
});

it("should give error while completing the workorder", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "page"});
  const schedPage = new Page({name: "schedule"});

  page.state = {
    reportWorkPrompt: {}
  };

  app.registerPage(page);
  app.registerPage(schedPage);

  app.client = {
    userInfo: {
      personid: "SAM",
    },
  };

  app.registerController(controller);

  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");

  page.registerDatasource(wodetails);

  const getAppsSpy = jest.spyOn(page, "getApplication").mockImplementation(() => app);
  const callControllerSpy = jest.spyOn(app, "callController").mockImplementation(() => true);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let evt = {
    item: {
      downprompt: "1",
      assetisrunning: false,
      assetnumber: '1001'
    },
    datasource: wodetails
  }

  let response = await controller.completeWorkorder(evt);
  expect(response).toBe(false);
  getAppsSpy.mockRestore();
  callControllerSpy.mockRestore();
});

it('Open the ToolsDrawer', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  let showDialogSpy = sinon.spy(page, 'showDialog');
  let resetDataSpy = sinon.spy(controller, 'resetToolStoreBinAsset');
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'wonum', 'reportWorkActualToolsDetailDs');
  const toolDS = newDatasource(toolDetail, 'member', 'itemnum', 'toolDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  const taskLookupDS = newDatasource(taskDetail, 'member', 'taskid', 'woTaskds');
  page.registerDatasource(taskLookupDS);
  page.registerDatasource(woReportWorkDs);
  app.registerDatasource(toolDS);
  app.registerController(controller);
  app.registerPage(page);
  let tooltrans = await woReportWorkDs.load();
  sinon.stub(woReportWorkDs, "addNew").returns(tooltrans[0]);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.openToolsDrawer();

  expect(woReportWorkDs.item['item_itemnum']).toEqual('');
  expect(woReportWorkDs.item['item_description']).toEqual('');
  expect(woReportWorkDs.item['item_toolqty']).toEqual(1);
  expect(woReportWorkDs.item['toolhrs']).toEqual(1);
  expect(woReportWorkDs.item['task_id']).toEqual('');
  expect(woReportWorkDs.item['task_description']).toEqual('');
  expect(page.state.itemnum).toBe(false);
  expect(page.state.disableToolAction).toBe(true);
  expect(resetDataSpy.calledOnce).toBe(true);
  expect(woReportWorkDs.item['storeloc_desc']).toEqual('');
  expect(woReportWorkDs.item['storeloc']).toEqual('');
  expect(woReportWorkDs.item['binnum']).toEqual('');
  expect(woReportWorkDs.item['lotnum']).toEqual('');
  expect(woReportWorkDs.item['assetnum']).toEqual('');
  expect(woReportWorkDs.item['asset_description']).toEqual('');
  expect(page.state.storeloc).toEqual('');
  expect(page.state.binnum).toBe(false);
  expect(page.state.rotatingAsset).toBe(false);
  expect(showDialogSpy.calledOnce).toBe(true);
  expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('toolsDrawer');
});

it('Open the ToolsLookup', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  let showDialogSpy = sinon.spy(page, 'showDialog');
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};

  await controller.openToolsLookup(evt);
  expect(showDialogSpy.calledOnce).toBe(true);
  expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('toolLookup');
});

it('chooseTool', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  const toolLookupDialog = new Dialog({
    name: 'toolLookup'
  });
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  app.registerPage(page);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  await synonymdomainData.load();
  let setToolStoreSpy = sinon.spy(controller, 'setToolStore');
  const toolDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const inventoryDS = newDatasource1(toolInventory, 'inventoryDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  page.registerDatasource(wodetails);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(toolDS);
  page.registerDatasource(inventoryDS);
  toolLookupDialog.closeDialog = jest.fn();
  page.registerDialog(toolLookupDialog);
  app.registerController(controller);
  await app.initialize();
  let evt = {
    itemnum: 'LATHE',
    description: 'MACHINE TOOL LATHE',
  };
  controller.pageInitialized(page, app);
  controller.chooseTool(evt);
  expect(page.state.itemnum).toEqual('LATHE');
  expect(toolDS.item['item_itemnum']).toEqual(evt.itemnum);
  expect(toolDS.item['item_description']).toEqual(evt.description);
  expect(setToolStoreSpy.calledOnce).toBe(true);
});

it('verify the setToolStore() for multiple storerooms', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  let resetToolStoreBinAssetSpy = sinon.spy(controller, 'resetToolStoreBinAsset');
  let openToolStoreLookupSpy = sinon.spy(controller, 'openToolStoreLookup');
  page.state.itemnum = 'PURGE';

  const inventoryDS = newDatasource1(toolInventory, 'inventoryDS');
  const locationDS = newDatasource(toolLocation, 'member', 'location', 'locationDS');
  const woToolDataDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  page.registerDatasource(woDetailsReportWork);
  page.registerDatasource(craftrate);
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  page.registerDatasource(synonymDSData);  
  await synonymDSData.load();
  await woDetailsReportWork.load();
  await inventoryDS.load();
  await locationDS.load();
  let inventorydsStub = sinon.stub(inventoryDS, 'searchQBE');
  let inventorydsStub2 = sinon.stub(inventoryDS, 'initializeQbe');
  let locationdsStub2 = sinon.stub(locationDS, 'initializeQbe');
  page.registerDatasource(inventoryDS);
  page.registerDatasource(locationDS);
  page.registerDatasource(woToolDataDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  await controller.setToolStore();
  expect(inventorydsStub.called).toBe(true);
  expect(inventorydsStub.displayName).toBe('searchQBE');
  expect(inventorydsStub2.called).toBe(true);
  expect(inventorydsStub2.displayName).toBe('initializeQbe');
  expect(locationdsStub2.called).toBe(true);
  expect(locationdsStub2.displayName).toBe('initializeQbe');
  expect(page.state.multipleLocations).toBe(true);
  expect(resetToolStoreBinAssetSpy.calledOnce).toBe(true);
  expect(openToolStoreLookupSpy.calledOnce).toBe(true);
  expect(openToolStoreLookupSpy.getCall(0).args[0]).toStrictEqual(controller);
});

it('verify the setToolStore() for single location', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  let setToolBinSpy = sinon.spy(controller, 'setToolBinNumber');
  page.state.itemnum = 'PURGE';
  const inventoryDS = newDatasource1(toolInventory, 'inventoryDS');
  const locationDS = newDatasource(singleLocation, 'member', 'location', 'locationDS');
  const woToolDataDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const binNumberDS = newDatasource(invbalances, 'member', 'binnum', 'inventbalDS');
  await inventoryDS.load();
  await locationDS.load();
  let inventorydsStub = sinon.stub(inventoryDS, 'searchQBE');
  let inventorydsStub2 = sinon.stub(inventoryDS, 'initializeQbe');
  let locationdsStub = sinon.stub(locationDS, 'initializeQbe');
  let locationdsStub2 = sinon.stub(locationDS, 'clearQBE');

  page.registerDatasource(inventoryDS);
  page.registerDatasource(locationDS);
  page.registerDatasource(woToolDataDS);
  page.registerDatasource(binNumberDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  await controller.setToolStore();
  expect(inventorydsStub.called).toBe(true);
  expect(inventorydsStub.displayName).toBe('searchQBE');
  expect(inventorydsStub2.called).toBe(true);
  expect(inventorydsStub2.displayName).toBe('initializeQbe');
  expect(locationdsStub.called).toBe(true);
  expect(locationdsStub.displayName).toBe('initializeQbe');
  expect(locationdsStub2.called).toBe(true);
  expect(locationdsStub2.displayName).toBe('clearQBE');
  expect(page.state.multipleLocations).toBe(false);
  expect(page.state.storeloc).toEqual(singleLocation.member[0].location);
  expect(woToolDataDS.item['storeloc_desc']).toEqual(singleLocation.member[0].description);
  expect(woToolDataDS.item['storeloc']).toBe(singleLocation.member[0].location);
  expect(setToolBinSpy.calledOnce).toBe(true);
});

it('verify the setToolStore() -- no tool inventory data', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  let resetDataSpy = sinon.spy(controller, 'resetToolStoreBinAsset');
  page.state.itemnum = 'PURGE';
  let blanktoolInventory = [];
  const inventoryDS = newDatasource1(blanktoolInventory, 'inventoryDS');
  let inventorydsStub = sinon.stub(inventoryDS, 'searchQBE');
  let inventorydsStub2 = sinon.stub(inventoryDS, 'initializeQbe');
  const woToolDataDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  page.registerDatasource(inventoryDS);
  page.registerDatasource(woToolDataDS);
  app.registerController(controller);
  await inventoryDS.load();
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolStore();

  expect(inventorydsStub.called).toBe(true);
  expect(inventorydsStub.displayName).toBe('searchQBE');
  expect(inventorydsStub2.called).toBe(true);
  expect(inventorydsStub2.displayName).toBe('initializeQbe');
  expect(resetDataSpy.calledOnce).toBe(true);
  expect(page.state.multipleLocations).toBe(false);
});

it('chooseToolStoreRoom', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  let resetDataSpy = sinon.spy(controller, 'resetToolBinData');
  let setToolBinSpy = sinon.spy(controller, 'setToolBinNumber');
  let setToolRotAssetSpy = sinon.spy(controller, 'setToolRotatingAsset');
  const toolDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const binNumberDS = newDatasource(invbalances, 'member', 'binnum', 'inventbalDS');
  const rotatingAssetDS = newDatasource1(singleAsset, 'rotatingAssetDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const toolStoreDialog = new Dialog({
    name: 'toolStoreRoomLookup'
  });
  toolStoreDialog.closeDialog = jest.fn();
  page.registerDialog(toolStoreDialog);
  page.registerDatasource(toolDS);
  page.registerDatasource(binNumberDS);
  page.registerDatasource(rotatingAssetDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt = {
    itemnum: '10001',
    location: 'CENTRAL',
    description: 'central-storeroom',
  };
  controller.pageInitialized(page, app);

  controller.chooseToolStoreRoom(evt);
  expect(toolDS.item.storeloc_desc).toEqual(evt.description);
  expect(toolDS.item.storeloc).toEqual(evt.location);
  expect(page.state.storeloc).toEqual(evt.location);
  expect(resetDataSpy.calledOnce).toBe(true);
  expect(setToolBinSpy.calledOnce).toBe(true);
  expect(setToolRotAssetSpy.calledOnce).toBe(true);
});

it('Open the ToolStoreLookup', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymdomainData = newTimerStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  let showDialogSpy = sinon.spy(page, 'showDialog');
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};

  await controller.openToolStoreLookup(evt);
  expect(showDialogSpy.calledOnce).toBe(true);
  expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('toolStoreRoomLookup');
});

it('chooseToolBinNumber', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymdomainData = newTimerStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  let setToolRotAssetSpy = sinon.spy(controller, 'setToolRotatingAsset');
  const toolDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const rotatingAssetDS = newDatasource(woassetmeters, 'member', 'assetnum', 'rotatingAssetDS');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  await failureListDS.load();
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  const toolBinDialog = new Dialog({
    name: 'toolBinLookup'
  });
  toolBinDialog.closeDialog = jest.fn();
  page.registerDialog(toolBinDialog);
  page.registerDatasource(toolDS);
  page.registerDatasource(rotatingAssetDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt = {
    itemnum: '10001',
    binnum: '2-3-4',
    lotnum: '1.5',
  };
  controller.pageInitialized(page, app);

  controller.chooseToolBinNumber(evt);
  expect(toolDS.item.binnum).toEqual(evt.binnum);
  expect(toolDS.item.lotnum).toEqual(evt.lotnum);
  expect(page.state.binnum).toEqual(evt.binnum);
  expect(setToolRotAssetSpy.calledOnce).toBe(true);

  evt = {
    itemnum: '10001',
    binnum: '',
    lotnum: '',
  };

  controller.chooseToolBinNumber(evt);
  expect(toolDS.item.binnum).toEqual('');
  expect(toolDS.item.lotnum).toEqual('');
  expect(page.state.binnum).toEqual('');
  expect(setToolRotAssetSpy.calledTwice).toBe(true);
});

it('Open the ToolBinLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymdomainData);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  let showDialogSpy = sinon.spy(page, 'showDialog');
  app.registerController(controller);
  await synonymdomainData.load();
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};

  await controller.openToolBinLookup(evt);
  expect(showDialogSpy.calledOnce).toBe(true);
  expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('toolBinLookup');
});

it('verify the setToolBinNumber() -- no invbal data', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  let resetBinSpy = sinon.spy(controller, 'resetToolBinData');
  let blankInvbal = [];
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  page.state.itemnum = 'TORCH';
  page.state.storeloc = 'CENTRAL';
  const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
  page.registerDatasource(synonymDSData);
  const inventbalDS = newDatasource1(blankInvbal, 'inventbalDS');
  let inventorydsStub = sinon.stub(inventbalDS, 'initializeQbe');
  const synonymdomainData = newTimerStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  const woToolDataDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  page.registerDatasource(inventbalDS);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const woDetailsReportWork = newDatasource(labor, "wodetails", "wonum", "woDetailsReportWork");
  page.registerDatasource(woDetailsReportWork);
  page.registerDatasource(craftrate);
  page.registerDatasource(woToolDataDS);
  app.registerController(controller);
  app.registerPage(page);
  await inventbalDS.load();
  await woDetailsReportWork.load();
  await synonymDSData.load();
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolBinNumber();

  expect(inventorydsStub.called).toBe(true);
  expect(inventorydsStub.displayName).toBe('initializeQbe');
  expect(resetBinSpy.calledOnce).toBe(true);
});

it('verify the setToolBinNumber() -- single bin case', async () => {
  const controller = new ReportWorkPageController();
  let setToolRotAssetSpy = sinon.spy(controller, 'setToolRotatingAsset');
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  page.state.itemnum = 'TORCH';
  page.state.storeloc = 'CENTRAL';
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymdomainData);
  let inventbalDS = newDatasource1(singleBin, 'inventbalDS');
  let rotatingAssetDS = newDatasource1(singleBin, 'rotatingAssetDS');
  let inventoryinitStub = sinon.stub(inventbalDS, 'initializeQbe');
  let inventoryclearStub = sinon.stub(inventbalDS, 'clearQBE');
  const woReportWorkDs = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  await inventbalDS.load();
  await synonymdomainData.load();
  page.registerDatasource(inventbalDS);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(woReportWorkDs);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolBinNumber();

  expect(inventoryinitStub.called).toBe(true);
  expect(inventoryinitStub.displayName).toBe('initializeQbe');
  expect(inventoryclearStub.called).toBe(true);
  expect(inventoryclearStub.displayName).toBe('clearQBE');
  expect(woReportWorkDs.item.binnum).toEqual(singleBin.member[0].binnum);
  expect(woReportWorkDs.item.lotnum).toEqual(singleBin.member[0].lotnum);
  expect(page.state.binnum).toEqual(singleBin.member[0].binnum);
  expect(page.state.multipleBins).toEqual(false);
  expect(setToolRotAssetSpy.calledOnce).toBe(true);
});

it('verify the setToolBinNumber() -- single blank bin case', async () => {
  const controller = new ReportWorkPageController();
  let setToolRotAssetSpy = sinon.spy(controller, 'setToolRotatingAsset');
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  page.state.itemnum = 'TORCH';
  page.state.storeloc = 'CENTRAL';
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymdomainData);
  let inventbalDS = newDatasource1(singleBlankBin, 'inventbalDS');
  let rotatingAssetDS = newDatasource1(singleBlankBin, 'rotatingAssetDS');
  let inventoryinitStub = sinon.stub(inventbalDS, 'initializeQbe');
  let inventoryclearStub = sinon.stub(inventbalDS, 'clearQBE');
  const woReportWorkDs = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  await inventbalDS.load();
  await synonymdomainData.load();
  page.registerDatasource(inventbalDS);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(woReportWorkDs);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolBinNumber();

  expect(inventoryinitStub.called).toBe(true);
  expect(inventoryinitStub.displayName).toBe('initializeQbe');
  expect(inventoryclearStub.called).toBe(true);
  expect(inventoryclearStub.displayName).toBe('clearQBE');
  expect(woReportWorkDs.item.binnum).toEqual(singleBlankBin.member[0].binnum);
  expect(woReportWorkDs.item.lotnum).toEqual(singleBlankBin.member[0].lotnum);
  expect(page.state.binnum).toEqual(singleBlankBin.member[0].binnum);
  expect(page.state.multipleBins).toEqual(false);
  expect(setToolRotAssetSpy.calledOnce).toBe(true);
});

it('setToolBinNumber() --verify the multibin case', async () => {
  const controller = new ReportWorkPageController();
  let openBinLookupSpy = sinon.spy(controller, 'openToolBinLookup');
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  page.state.itemnum = 'TORCH';
  page.state.storeloc = 'CENTRAL';
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymDSData);
  let inventbalDS = newDatasource1(multiBin, 'inventbalDS');
  let inventoryinitStub = sinon.stub(inventbalDS, 'initializeQbe');
  let inventoryclearStub = sinon.stub(inventbalDS, 'clearQBE');
  const woReportWorkDs = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDs');
  await inventbalDS.load();
  await synonymDSData.load();
  page.registerDatasource(inventbalDS);
  page.registerDatasource(woReportWorkDs);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolBinNumber();

  expect(inventoryinitStub.called).toBe(true);
  expect(inventoryinitStub.displayName).toBe('initializeQbe');
  expect(inventoryclearStub.called).toBe(true);
  expect(inventoryclearStub.displayName).toBe('clearQBE');
  expect(page.state.multipleBins).toEqual(true);
  expect(openBinLookupSpy.calledOnce).toBe(true);
});

it('chooseToolRotatingAsset', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymDSData);
  const toolDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  const toolAssetDialog = new Dialog({
    name: 'toolRotatingAssetLookup'
  });
  toolAssetDialog.closeDialog = jest.fn();
  page.registerDialog(toolAssetDialog);
  page.registerDatasource(toolDS);
  app.registerController(controller);
  await synonymDSData.load();
  app.registerPage(page);
  await app.initialize();
  let evt = {
    assetnum: '1001',
    description: 'Rotating Asset',
  };
  controller.pageInitialized(page, app);

  controller.chooseToolRotatingAsset(evt);
  expect(toolDS.item.assetnum).toEqual(evt.assetnum);
  expect(toolDS.item.asset_description).toEqual(evt.description);
  expect(page.state.rotatingAsset).toBe(true);
});

it('verify the setToolRotatingAsset() -- no rotating assets', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  let resetAssetSpy = sinon.spy(controller, 'resetToolAssetData');
  let blankRotAsset = [];
  page.state.itemnum = 'TORCH';
  page.state.storeloc = 'CENTRAL';
  page.state.itemnum = 'B1';
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymDSData);
  const rotatingAssetDS = newDatasource1(blankRotAsset, 'rotatingAssetDS');
  let rotassetdsStub = sinon.stub(rotatingAssetDS, 'initializeQbe');
  const woToolDataDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);  
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(woToolDataDS);
  app.registerController(controller);
  await rotatingAssetDS.load();
  await synonymDSData.load();
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolRotatingAsset();

  expect(rotassetdsStub.called).toBe(true);
  expect(rotassetdsStub.displayName).toBe('initializeQbe');
  expect(resetAssetSpy.calledOnce).toBe(true);
});

it('verify the setToolRotatingAsset() -- single rotating asset', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
      defaultSite: 'BEDFORD'
    },
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  page.registerDatasource(synonymDSData);
  const rotatingAssetDS = newDatasource(singleAsset, 'member', 'assetnum', 'rotatingAssetDS');
  let rotassetinitStub = sinon.stub(rotatingAssetDS, 'initializeQbe');
  let rotassetclearStub = sinon.stub(rotatingAssetDS, 'clearQBE');
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  page.registerDatasource(wodetails);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(woReportWorkDs);
  app.registerController(controller);
  await synonymDSData.load();
  await rotatingAssetDS.load();
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolRotatingAsset();

  expect(rotassetinitStub.called).toBe(true);
  expect(rotassetinitStub.displayName).toBe('initializeQbe');
  expect(rotassetclearStub.called).toBe(true);
  expect(rotassetclearStub.displayName).toBe('clearQBE');
  expect(woReportWorkDs.item.assetnum).toEqual(singleAsset.member[0].assetnum);
  expect(woReportWorkDs.item.asset_description).toEqual(singleAsset.member[0].description);
  expect(page.state.rotatingAsset).toEqual(true);
  expect(page.state.multipleRotatingAsset).toEqual(false);
});

it('verify the setToolRotatingAsset() -- multiasset', async () => {
  const controller = new ReportWorkPageController();
  let resetAssetSpy = sinon.spy(controller, 'resetToolAssetData');
  let openAssetLookupSpy = sinon.spy(controller, 'openToolRotatingAssetLookup');
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  let rotatingAssetDS = newDatasource(woassetmeters, 'member', 'assetnum', 'rotatingAssetDS');
  let rotassetinitStub = sinon.stub(rotatingAssetDS, 'initializeQbe');
  let rotassetclearStub = sinon.stub(rotatingAssetDS, 'clearQBE');
  const woReportWorkDs = newDatasource(workorderitem, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  page.registerDatasource(wodetails);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(rotatingAssetDS);
  page.registerDatasource(woReportWorkDs);
  app.registerController(controller);
  app.registerPage(page);
  await rotatingAssetDS.load();
  await synonymDSData.load();
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setToolRotatingAsset();

  expect(rotassetinitStub.called).toBe(true);
  expect(rotassetinitStub.displayName).toBe('initializeQbe');
  expect(rotassetclearStub.called).toBe(true);
  expect(rotassetclearStub.displayName).toBe('clearQBE');
  expect(page.state.multipleRotatingAsset).toEqual(true);
  expect(resetAssetSpy.calledOnce).toBe(true);
  expect(openAssetLookupSpy.calledOnce).toBe(true);
});

it('Open the ToolRotatingAssetLookup()', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  failureListDS.load();
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  let showDialogSpy = sinon.spy(page, 'showDialog');
  app.registerController(controller);
  await synonymDSData.load();
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {page: page, app: app};

  controller.openToolRotatingAssetLookup(evt);
  expect(showDialogSpy.calledOnce).toBe(true);
  expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('toolRotatingAssetLookup');
});

it('Open the Task Lookup', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const taskLookupDS = newDatasource(taskDetail, 'member', 'taskid', 'woTaskds');
  page.registerDatasource(taskLookupDS);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  failureListDS.load();

  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  page.state = {wonum: '1202'};
  let evt = {page: page, app: app};
  let showDialogSpy = sinon.spy(evt.page, 'showDialog');
  controller.pageInitialized(page, app);
  await taskLookupDS.load();
  await wodetails.load();
  await synonymDSData.load();

  page.state.selectedTaskItem = taskLookupDS.items[0];

  await controller.getWoTasks();
  await controller.openTaskLookup(evt);
  expect(showDialogSpy.calledOnce).toBe(true);
  expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('toolTaskLookup');
});

it('chooseTask', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
    userInfo: {
      personid: 'SAM',
	    defaultSite: 'BEDFORD',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const toolDS = newDatasource(toolDetail, 'member', 'itemnum', 'reportWorkActualToolsDetailDs');
  const labordetails = newDatasource(labor, "labordetails", "labtransid", "reportworkLaborDetailds");
  const materialDS = newDatasource(wpmaterial, "member", "itemnum", "reportWorkMaterialDetailDs");
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const failureListDS = newDatasource(failurelist, "member", "failurelist", "dsFailureList");
  app.registerDatasource(failureListDS);
  page.dsFailureList = failureListDS;
  page.registerDatasource(craftrate);
  page.registerDatasource(wodetails);
  page.registerDatasource(reportworkLabords);
  page.registerDatasource(toolDS);
  page.registerDatasource(labordetails);
  page.registerDatasource(materialDS);
  app.registerController(controller);
  
  const toolTaskLookup = new Dialog({name: "toolTaskLookup"});
  page.registerDialog(toolTaskLookup);
  page.showDialog = jest.fn();
  toolTaskLookup.closeDialog = jest.fn();

  app.registerPage(page);
  await app.initialize();
  let evt = {
    taskid: '10',
    description: 'scheduling',
    workorderid: 'WO1202'
  };
  controller.pageInitialized(page, app);

  controller.chooseTask(evt);
  expect(toolDS.item.task_id).toEqual(evt.taskid);
  expect(toolDS.item.task_description).toEqual(evt.description);
  expect(page.state.taskid).toEqual(evt.workorderid);
  expect(labordetails.item.taskid).toEqual(evt.taskid);
  expect(materialDS.item.task_id).toEqual(evt.taskid);
});

it('validate saveToolDetail', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const toolDS = newDatasource1(toolJson, "reportWorkActualToolsDetailDs");
  await toolDS.load();
  page.registerDatasource(toolDS);
  const toolListDS = newDatasource1(toolJson, "reportWorkActualToolsDs");
  await toolListDS.load();
  page.registerDatasource(toolListDS);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  let forceReloadStub = sinon.stub(toolDS, 'forceReload');
  let forceReloadStubListDs = sinon.stub(toolListDS, 'forceReload');
  const putAction = sinon.stub(toolDS, "put");
  const toolsDrawer = new Dialog({name: "toolsDrawer"});
  page.registerDialog(toolsDrawer);
  page.showDialog = jest.fn();
  toolsDrawer.closeDialog = jest.fn();
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.saveToolDetail({page: page, app: app});
  expect(page.state.isCalledOnce).toBe(true);
  expect(page.state.loadingToolDetail).toBe(false);
  expect(putAction.called).toBe(true);
  expect(putAction.displayName).toBe('put');
  expect(forceReloadStub.called).toBe(true);
  expect(forceReloadStub.displayName).toBe('forceReload');
  expect(forceReloadStubListDs.displayName).toBe('forceReload');
  putAction.restore();
  forceReloadStub.restore();
  forceReloadStubListDs.restore();
});

it('Choose validateToolData', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const toolDs = newDatasource1(toolJson, "reportWorkActualToolsDetailDs");
  page.registerDatasource(toolDs);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.validateToolData({page: page, app: app});
  expect(page.state.disableToolAction).toBe(false);
});

it('Choose validateToolData --negative case', async () => {
  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  app.client = {
    userInfo: {
      personid: 'SAM',
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}}
    }
  };
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const toolDs = newDatasource1(toolJson, "reportWorkActualToolsDetailDs");
  page.registerDatasource(toolDs);
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  page.registerDatasource(reportworkLabords);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  page.registerDatasource(wodetails);
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.isRotating = true;
  await controller.validateToolData({page: page, app: app});
  expect(page.state.disableToolAction).toBe(true);
});

it("open reserve material page", async () => {
	let mockSetPage = jest.fn();

	const controller = new ReportWorkPageController();
	const app = new Application();
	const page = new Page({name: "page"});

	await app.initialize();  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	
	await controller.openReservedMaterials({item:{href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA1OA--'}});
	await expect(mockSetPage.mock.calls.length).toEqual(1);
});

it("should complete workorder", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "report_work"});
  const schedPage = new Page({name: "schedule"});

  app.registerPage(page);
  app.registerPage(schedPage);

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };

  app.registerController(controller);
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const wolist = newDatasource(workorderitem, "member", "wonum", "dswolist");
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  page.registerDatasource(craftrate);

  page.registerDatasource(wodetails);
  page.registerDatasource(wolist);

  let items = await wodetails.load();
  let invokeAction = sinon.stub(wodetails, "invokeAction").returns(items[0]);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  app.state = {
    systemProp: {
      'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR',
      'maximo.mobile.wostatusforesig': 'APPR,INPROG'
    },
  };
  controller.pageInitialized(page, app);

  let evt = {
    item: wodetails.item,
    datasource: wodetails,
    status:'APPR'
  }

  await controller.completeWorkorder(evt);

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(1);
});

it("should complete workorder in anywhere mode", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: "page"});
  const schedPage = new Page({name: "schedule"});

  let anyWhereDefault = Device.get().isMaximoMobile;

  Device.get().isMaximoMobile = true;

  app.registerPage(page);
  app.registerPage(schedPage);

  app.client = {
    userInfo: {
      personid: "SAM",
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };

  app.registerController(controller);
  const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymDSData);
  const wodetails = newDatasource(workorderitem, "member", "wonum", "woDetailsReportWork");
  const wolist = newDatasource(workorderitem, "member", "wonum", "dswolist");

  const reportworksSynonymData = newStatusDatasource(statusitem, "reportworksSynonymData");
  page.registerDatasource(reportworksSynonymData);

  page.registerDatasource(wodetails);
  page.registerDatasource(wolist);
  app.state = {
    systemProp: {
      'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR',
      'maximo.mobile.wostatusforesig': 'APPR,INPROG'
    },
  };
  let items = await wodetails.load();
  let invokeAction = sinon.stub(wodetails, "invokeAction").returns(items[0]);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let evt = {
    item: wodetails.item,
    datasource: wodetails,
    status: 'COMP'
  }

  await controller.completeWorkorder(evt);

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(1);
  Device.get().isMaximoMobile = anyWhereDefault;

  Device.get().isMaximoMobile = false;
  await controller.completeWorkorder(evt);
  expect(invokeAction.called).toBe(true);
});

it("should test onCloseDrawer", async () => {

	const controller = new ReportWorkPageController();
	const app = new Application();
	const page = new Page({name: "page"});
  page.state = {
    errorMessage: true
  }
	await app.initialize();  
	controller.pageInitialized(page, app);
	
  let evt = {
    page: page
  }
	controller.onCloseDrawer(evt);
  expect(page.state.useConfirmDialog).toBe(true)
});


it("Should call reload labor", async() => {
	const controller = new ReportWorkPageController();
  const app = new Application();
  const page = new Page({name: 'report_work'});
  app.client = {
		userInfo: {
			personid: 'SAM',
      insertSite: 'BEDFORD',
			labor: {laborcraftrate: {craft: 'ELECT', skilllevel: 'SECONDCLASS'}, laborcode: 'SAM'}
		},
	};
  const reportworkLabords = newDatasource(labor, "reportworkLabords", "labtransid", "reportworkLabords");
  const woDetailResource = newDatasource(workorderitem, "member", "wonum", "woDetailResource");
  const wolistds = newDatasource(workorderitem, "dswolist");
  page.registerDatasource(wolistds);
  page.registerDatasource(reportworkLabords);
  app.registerDatasource(woDetailResource);
  app.registerController(controller);
  app.registerPage(page);
  controller.pageInitialized(page, app);
	await app.initialize();
  const evt = {
    app: app,
    page: page
  }
  await controller.reloadLabor(evt, reportworkLabords, wolistds, woDetailResource);
  expect(page.state.loadinglabor).toBe(false);
});