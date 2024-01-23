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

import WorkOrderDetailsController from "./WorkOrderDetailsController";
import ReportWorkPageController from "./ReportWorkPageController";
import SchedulePageController from "./SchedulePageController";
import WorkOrderEditController from "./WorkOrderEditController";
import wpmaterial from "./test/materials-json-data";
import attachmentlistitem from "./test/test-attachment-data.js";
import woassetmeters from './test/assetmeter-json-data.js';
import wocost from './test/wo-cost-json-data.js';
import jwocost from './test/wo-cost-total-json-data.js';
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
  AppSwitcher,
  MaximoAppSwitcher,
  Device,
  Dialog,
} from "@maximo/maximo-js-api";

import WOUtil from './utils/WOUtil';
import workorderitem from "./test/wo-detail-json-data.js";
import multiassetlocitem from "./test/wo-detail-multiassetloc-data.js";
import dsnewreading from "./test/alndomain-json-data.js";
import statusitem from "./test/statuses-json-data.js";
import sinon from "sinon";
import worLogItem from "./test/worklog-json-data.js";
import labor from "./test/labors-json-data";
import tasklist from "./test/task-list-json-data.js";
import downTimeCode from "./test/downtimecode-json-data.js";
import workordersingleitem from "./test/wo-detail-single-json-data.js";
import woSpecification from "./test/wo-specification-json-data.js";
import wolocationmeters from "./test/locationmeter-json-data";
import SynonymUtil from "./utils/SynonymUtil";
import assets from "./test/asset-json-data";

function newDatasourceNew(data = dsnewreading, name = "dsnewreading") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    name: name,
  });

  return ds;
}

function newDatasource(data = workorderitem, name = "workorderds") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "wonum",
    name: name,
  });

  ds.clearState = () => {};
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

function newDatasourceWorkLog(data = worLogItem, name = "woDetailsWorklogDs") {
  const da = new JSONDataAdapter({
    src: worLogItem,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    name: name,
  });

  return ds;
}

function newStatusDatasource(data = statusitem, name) {
  const da = new JSONDataAdapter({
    src: statusitem,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "value",
    name: name,
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

function newAssetLocationDatasource(
  data = workorderitem,
  name = "woAssetLocationds"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "wonum",
    name: name,
  });

  return ds;
}

function newTaskDatasource(data = tasklist, name = "woPlanTaskds") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });
  const ds = new Datasource(da, {
    idAttribute: "taskid",
    name: name,
  });
  return ds;
}

function newDatasource1(data, name = "downTimeReportAsset") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });
  const ds = new Datasource(da, {
    idAttribute: "downtime",
    name: name,
  });
  return ds;
}

function newLocDS(data = workorderitem, name = "woLocationds") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "wonum",
    name: name,
  });

  return ds;
}

function newTimerStatusDatasource(
  data = statusitem,
  name = "synonymdomainData"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "value",
    name: name,
  });

  return ds;
}

function materialDatasource(
  data = wpmaterial,
  idAttribute = "wonum",
  items = "member",
  name = "inventoryDS"
) {
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
it("Workorder estimated cost drawer should open", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const schedulePagecontroller = new SchedulePageController();

  const app = new Application();
  app.client = {
    userInfo: {
      baseCurrency: "USD"
    }
  };

  const page = new Page({ name: "approvals" });
  const dsWoDetailTotal = newWOCostDatasource(wocost, "dsWoDetailTotal");
  page.registerDatasource(dsWoDetailTotal);

  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);

  const woCost = newWOCostDatasource(wocost, "dsWoTotal");
  const jsondsWoTotal = newWOCostDatasource(jwocost, "jsondsWoTotal");
  jsondsWoTotal.getSchema = () => jwocost.responseInfo.schema;

  page.registerDatasource(jsondsWoTotal);
  page.registerDatasource(woCost);

  await woCost.load();
  await wodetails.load();
  let openWoTotalCostDrawerStub = sinon
    .stub(schedulePagecontroller, "openWoTotalCostDrawer")
    .returns({});

  app.registerPage(page);
  await app.initialize();

  app.registerController(controller);
  page.registerController(schedulePagecontroller);

  controller.pageInitialized(page, app);
  app.setCurrentPage = mockSetPage;

  await controller.openWoCostDrawer({ item: { href: "href" } });
  await expect(openWoTotalCostDrawerStub.called).toBe(true);
});
it("should open task page when clicking on task button on workorder details page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page();

  app.registerController(controller);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.navigateToTask({ wonum: 1000 });
  expect(page.state.navigateToTaskPage).toBeTruthy();
});

it("should not open task page if no href passed", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page();

  app.registerController(controller);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.navigateToTask();
  expect(page.state.navigateToTaskPage).not.toBeDefined();
});

it("should open report work page when clicking on report button on workorder details page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const reportWorkController = new ReportWorkPageController();
  const app = new Application();
  const page = new Page();
  const reportPage = new Page({ name: "report_work" });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcraftrate: { craft: "ELECT", skilllevel: "SECONDCLASS" } },
    },
  };
  const reportworkLabords = newDatasource(
    labor,
    "reportworkLabords",
    "labtransid",
    "reportworkLabords"
  );
  const woDetailsReportWork = newDatasource(
    labor,
    "woDetailsReportWork",
    "wonum",
    "woDetailsReportWork"
  );
  const synonymdomainData = newTimerStatusDatasource(
    statusitem,
    "synonymdomainData"
  );
  const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
  const reportworksSynonymData = newStatusDatasource(
    statusitem,
    "reportworksSynonymData"
  );
  const locationDS = newStatusDatasource(wolocationmeters, "locationDS");
  const inventoryDS = materialDatasource(wpmaterial, "member", "inventoryDS");
  const synonymDSData = newStatusDatasource(statusitem, "synonymDSData");
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  reportPage.registerDatasource(reportworkLabords);
  reportPage.registerDatasource(woDetailsReportWork);
  reportPage.registerDatasource(craftrate);
  reportPage.registerDatasource(reportworksSynonymData);
  reportPage.registerDatasource(locationDS);
  reportPage.registerDatasource(inventoryDS);
  reportPage.registerDatasource(synonymDSData);
  app.currentPage = reportPage;
  controller.pageInitialized(page, app);
  reportWorkController.pageInitialized(reportPage, app);
  await controller.navigateToReportWork({
    href: "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA2Ng--",
  });
  expect(page.state.navigateToReportWork).toBeTruthy();
});

it("should not open report work page if href passed but no current page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page();

  app.registerController(controller);

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.navigateToReportWork({
    href: "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA2Ng--",
  });
  expect(page.state.navigateToReportWork).not.toBeDefined();
});

it("should not open report work page if no href passed", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page();

  app.registerController(controller);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.navigateToReportWork();
  expect(page.state.navigateToReportWork).not.toBeDefined();
});

describe("getDrawerLabel function", () => {
  let fn;
  beforeAll(() => {
    const { getDrawerLabel } = new WorkOrderDetailsController();
    fn = getDrawerLabel;
  });

  it("should return tuple", () => {
    const item = {};
    expect(fn(item)).toHaveLength(2);
  });

  it("should return default materials and tools", () => {
    const item = {
      wonum: 1000,
    };
    expect(fn(item)).toEqual(["materialsAndToolsLabel", "Materials and tools"]);
  });

  it("should return Tools when only wptools provided", () => {
    const item = {
      wptool: [""],
    };
    expect(fn(item)).toEqual(["toolsLabel", "Tools"]);
  });

  it("should return Materials when only wpmaterials provided", () => {
    const item = {
      wpmaterial: [""],
    };
    expect(fn(item)).toEqual(["materialsLabel", "Materials"]);
  });

  it("should only consider whenever there is content for each category", () => {
    expect(fn({ wptool: [], wpmaterial: [""] })).toEqual([
      "materialsLabel",
      "Materials",
    ]);
    expect(fn({ wptool: [""], wpmaterial: [] })).toEqual([
      "toolsLabel",
      "Tools",
    ]);
    expect(fn({ wptool: [], wpmaterial: [] })).toEqual([
      "materialsAndToolsLabel",
      "Materials and tools",
    ]);
  });
});

it("should open materials page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  const synonDS = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(synonDS);
  app.registerController(controller);
  const ds = newDatasource(workorderitem, "workorderds");
  page.registerDatasource(ds);
  let items = await ds.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openMaterialToolDrawer({ item: items[0], datasource: ds, reload: true });

  expect(page.state.dialogLabel).toBe("Materials and tools");
});

it("should open materials page with Tools", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  const synonDS = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(synonDS);
  const ds = newDatasource(workorderitem, "workorderds");
  page.registerDatasource(ds);
  let items = await ds.load();
  await synonDS.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openMaterialToolDrawer({ item: items[1], datasource: ds });

  expect(page.state.dialogLabel).toBe("Tools");
});

it("should fail opening materials page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);
  const ds = newDatasource(workorderitem, "workorderds");
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(ds);
  page.registerDatasource(woDetailResource);
  let items = await ds.load();
  items[0].datasource = woDetailResource;
  items[0].item = '"oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAy';
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  try {
    controller.openMaterialToolDrawer(items[0], null);
    expect.fail("failed opening materials page");
  } catch (e) {
    // good
  }
});

it("Should save workLog item", async () => {
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  page.state = {
    initialDefaultLogType: "!CLIENTNOTE!"
  }
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerPage(page);
  app.registerController(controller);

  const ds = newDatasource(workorderitem, "woDetailResource");
  const ds2 = newDatasourceWorkLog(worLogItem, "woDetailsWorklogDs");
  let workLogModified = worLogItem;
  workLogModified.responseInfo.schema.properties.logtype.default = "!CLIENTNOTE!";
  const ds3 = newDatasourceWorkLog(workLogModified, 'woDetailsWorklogDs');
  const synonymdomainDs = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainDs);
  let updatestub = sinon.stub(ds2, "update");
  let forceloadstub = sinon.stub(ds2, "forceReload");

  page.registerDatasource(ds);
  page.registerDatasource(ds2);

  let items = await ds.load();

  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.openWorkLogDrawer({ item: items[1] });
  let event =  {
    summary: "Test Comment 2",
    longDescription: "abc",
    logType: { value: 'WORK' },
    visibility: true
  };

  await controller.saveWorkLog(event);
  expect(updatestub.called).toBe(true);
  expect(updatestub.displayName).toBe("update");
  expect(updatestub.args.length).toBe(1);

  expect(forceloadstub.called).toBe(true);
  expect(forceloadstub.displayName).toBe("forceReload");

  await controller.openWorkLogDrawer({ item: items[1] });
  page.state = { chatLogDescLength: 100 };
  await controller.saveWorkLog(event);

  updatestub.restore();
  forceloadstub.restore();
  sinon.stub(ds3, 'update');
  sinon.stub(ds3, 'forceReload');
  await controller.openWorkLogDrawer({item: items[0] });
  expect(page.state.initialDefaultLogType).toBe('!CLIENTNOTE!');
});

it("Should save workLog item", async () => {
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" }
    }
  };

  app.registerPage(page);
  app.registerController(controller);

  const ds = newDatasource(workorderitem, "woDetailResource");
  const ds2 = newDatasourceWorkLog(worLogItem, "woDetailsWorklogDs");
  const synonymdomainDs = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainDs);
  let updatestub = sinon.stub(ds2, "update");
  let forceloadstub = sinon.stub(ds2, "forceReload");

  page.registerDatasource(ds);
  page.registerDatasource(ds2);

  let items = await ds.load();

  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.openWorkLogDrawer({ item: items[1] });
  let event = "Test Comment 2";

  await controller.saveWorkLog(event);
  expect(updatestub.called).toBe(true);
  expect(updatestub.displayName).toBe("update");
  expect(updatestub.args.length).toBe(1);

  expect(forceloadstub.called).toBe(true);
  expect(forceloadstub.displayName).toBe("forceReload");

  event =
    "A long description is a way to provide long alternative text for non-text elements, such as images. Examples of suitable use of long description are charts, graphs, maps, infographics, and other complex images. Like alternative text, long description should be descriptive and meaningful.";

  await controller.openWorkLogDrawer({ item: items[1] });
  page.state = { chatLogDescLength: 100 };
  await controller.saveWorkLog(event);

  updatestub.restore();
  forceloadstub.restore();
});

it("should open save prompt on work log drawer validation", async () => {
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  page.state = {
    initialDefaultLogType: "!CLIENTNOTE!"
  }
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerPage(page);
  app.registerController(controller);

  const ds = newDatasource(workorderitem, "woDetailResource");
  const ds2 = newDatasourceWorkLog(worLogItem, "woDetailsWorklogDs");
  let workLogModified = worLogItem;
  workLogModified.responseInfo.schema.properties.logtype.default = "!CLIENTNOTE!";
  const synonymdomainDs = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainDs);

  page.registerDatasource(ds);
  page.registerDatasource(ds2);

  let items = await ds.load();

  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.openWorkLogDrawer({ item: items[1] });
  page.state = { chatLogDescLength: 100 };

  page.state.isWorkLogEdit = true;
  page.state.initialDefaultLogType = '!UPDATE!';
  page.state.workLogData = { summary: "abc", longDescription: "<p>test</p>", logType: {value: 'UPDATE'}, sendDisable: false };
  controller.workLogValidate({});
  page.state.isWorkLogEdit = false;
  controller.workLogValidate({});
  expect(page.findDialog('saveDiscardWorkLogDetail')).toBeDefined();

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

it("should open status page ", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const schedPage = new Page({ name: "schedule" });
  app.registerPage(schedPage);

  let item = {
    wonum: "SCRAP_2",
    status: "APPR",
    allowedstates: {
      COMP: [{ description: "Completed", value: "COMP" }],
      WAPPR: [{ description: "Waiting on Approval", value: "WAPPR" }],
    },
  };

  app.registerController(controller);
  const ds = newDatasource(workorderitem, "workorderds");
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);
  page.registerDatasource(ds);
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await app.initialize();

  let saveSpy = sinon.spy(controller, "openWoDtlChangeStatusDialog");
  await controller.openWoDtlChangeStatusDialog({
    item: item,
    loadDatasource: ds,
    datasource: "allDS",
    referencePage: "workOrderDetails",
  });
  expect(saveSpy.calledOnce).toEqual(true);
});

it("should navigate to schedulepage", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const schedulePagecontroller = new SchedulePageController();

  const app = new Application();

  const page = new Page({ name: "schedule" });
  const page1 = new Page({ name: 'report_work' });
  const ds = newDatasource(workorderitem, "workorderds");
  const wodetails = newDatasource(workorderitem, "wodetails");
  const todaywoassignedDS = newDatasource(undefined, "todaywoassignedDS");
  const pmduewolistDS = newDatasource(undefined, "pmduewolistDS");
  page.registerDatasource(ds);
  page.registerDatasource(wodetails);
  page.registerDatasource(todaywoassignedDS);
  page.registerDatasource(pmduewolistDS);
  page.registerController(schedulePagecontroller);
  let items = await ds.load();

  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  await app.initialize();

  app.registerController(controller);
  app.registerController(schedulePagecontroller);

  controller.pageInitialized(page, app);
  app.setCurrentPage = mockSetPage;
  
  await controller.openMeterReadingDrawer({item: undefined});
  expect(page.state.assetMeterHeader).toBe(undefined);
  
  await controller.openMeterReadingDrawer({ item: items[2], datasource: ds });
  expect(page.state.assetMeterHeader).toBe("13120 Bottom Sealing System");
});

it("Workorder startWOStopTimer with confirmlabtrans = 0", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const reportPage = new Page({ name: "report_work" });
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcraftrate: { craft: "ELECT" }, laborcode: "SAM" },
    },
  };

  app.state = {
    systemProp: {
      "maximo.mobile.usetimer": "1",
    },
  };

  const reportWorkLabords = newDatasource(statusitem, "reportworkLabords");
  reportPage.registerDatasource(reportWorkLabords);
  app.registerController(controller);
  reportWorkController.pageInitialized(app, reportPage);

  const ds = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(ds);

  const wodetails = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(wodetails);

  const laborDetailDS = newLaborDetailDatasource(labor, "woLaborDetailds");
  page.registerDatasource(laborDetailDS);

  let items = await wodetails.load();
  let invokeAction = sinon.stub(wodetails, "invokeAction").returns(items[0]);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "start",
  });

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(1);

  app.currentPage = reportPage;
  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "stop",
  });

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(2);

  controller.openNavigation = jest.fn();
  app.state = {
    systemProp: {
      "mxe.mobile.travel.navigation": "1",
      "maximo.mobile.usetimer": "1",
    },
    networkConnected: true,
  };

  wodetails.item.coordinate = "LATLONG";

  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "start",
    worktype: "travel",
  });
  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(3);
  expect(controller.openNavigation.mock.calls.length).toBe(1);

  controller.openNavigation = jest.fn();
  app.state = {
    systemProp: {
      "mxe.mobile.travel.navigation": "0",
      "maximo.mobile.usetimer": "1",
    },
  };

  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "start",
    worktype: "travel",
  });
  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(4);
  expect(controller.openNavigation.mock.calls.length).toBe(0);
  app.state = {
    systemProp: {
      "mxe.mobile.travel.navigation": "1",
      "maximo.mobile.usetimer": "1",
    },
  };

  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "start",
    worktype: "travel",
  });

  expect(controller.openNavigation.mock.calls.length).toBe(1);
});

it("Workorder startWOStopTimer with confirmlabtrans = 1", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const reportPage = new Page({ name: "report_work" });
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcraftrate: { craft: "ELECT" }, laborcode: "SAM" },
    },
  };

  app.state = {
    systemProp: {
      "maximo.mobile.usetimer": "1",
    },
  };

  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  const ds = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(ds);

  const laborDetailDS = newLaborDetailDatasource(labor, "woLaborDetailds");
  page.registerDatasource(laborDetailDS);

  const reportWorkLabords = newDatasource(statusitem, "reportworkLabords");
  reportPage.registerDatasource(reportWorkLabords);

  const wodetails = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(wodetails);

  const items = await wodetails.load();
  const invokeAction = sinon.stub(wodetails, "invokeAction").returns(items[0]);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  items[1].confirmlabtrans = "1";

  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "start",
  });

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(invokeAction.args.length).toBe(1);

  app.currentPage = reportPage;
  expect(laborDetailDS.item.finishdatetime).toBeUndefined();

  await controller.startWOStopTimer({
    item: items[1],
    datasource: wodetails,
    action: "stop",
  });
  expect(laborDetailDS.item.finishdatetime).toBeDefined();
});

it("Workorder onClickEditLabor", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const reportPage = new Page({ name: "report_work" });
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerController(controller);
  const ds = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(ds);

  const laborDetailDS = newLaborDetailDatasource(labor, "woLaborDetailds");
  page.registerDatasource(laborDetailDS);
  const wodetails = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(wodetails);

  const reportWorkLabords = newDatasource(statusitem, "reportworkLabords");
  reportPage.registerDatasource(reportWorkLabords);

  const items = await wodetails.load();

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  reportWorkController.pageInitialized(app, reportPage);

  app.currentPage = reportPage;
  await controller.onClickEditLabor({
    item: items[1],
    datasource: wodetails,
    action: "stop",
  });
  expect(mockSetPage.mock.calls.length).toBe(1);
});

it("Workorder onClickSendLabTrans", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const reportPage = new Page({ name: "report_work" });
  const reportWorkController = new ReportWorkPageController();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerController(controller);
  reportPage.registerController(reportWorkController);

  const ds = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(ds);

  const laborDetailDS = newLaborDetailDatasource(labor, "woLaborDetailds");
  page.registerDatasource(laborDetailDS);

  const wodetails = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(wodetails);

  const reportWorkLabords = newDatasource(statusitem, "reportworkLabords");
  reportPage.registerDatasource(reportWorkLabords);

  const items = await wodetails.load();

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  const savestub = sinon.stub(laborDetailDS, "save");

  app.currentPage = reportPage;
  await controller.onClickSendLabTrans({
    item: items[1],
    datasource: wodetails,
    action: "stop",
  });
  expect(savestub.called).toBe(true);
});

it("should send user to attachments page", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();

  let pageSetter = jest.fn();

  app.registerController(controller);
  await app.initialize();

  const originalSetter = app.setCurrentPage;
  app.setCurrentPage = pageSetter;

  controller.pageInitialized(new Page(), app);
  let event = {
    item: { href: "oslc/os/mxapiwodetail/_QkVERk9SRC81MTA1Nw--" },
  };
  controller.showAttachmentPage(event);

  expect(pageSetter.mock.calls.length).toEqual(1);

  expect(pageSetter.mock.calls[0][0].name).toEqual("attachments");

  app.setCurrentPage = originalSetter;
});

it("should send user to related work order page", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();

  let pageSetter = jest.fn();
  let event = {
    item: { href: "oslc/os/mxapiwodetail/_QkVERk9SRC81MTA1Nw--" },
  };

  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = pageSetter;

  controller.pageInitialized(new Page(), app);

  controller.showRelatedWOPage(event);

  expect(pageSetter.mock.calls.length).toEqual(1);

  expect(pageSetter.mock.calls[0][0].name).toEqual("relatedWorkOrder");
});

it("should navigate map view of a current work order", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const schedulePagecontroller = new SchedulePageController();

  const app = new Application();

  const page = new Page({ name: "schedule" });
  const ds = newDatasource(workorderitem, "workorderds");

  page.registerDatasource(ds);
  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);

  let items = await ds.load();

  app.registerPage(page);
  await app.initialize();

  app.registerController(controller);
  page.registerController(schedulePagecontroller);

  controller.pageInitialized(new Page(), app);
  app.setCurrentPage = mockSetPage;
  page.state.selectedDS = "workorderds";
  schedulePagecontroller.pageInitialized(page, app);

  await controller.handleMapPage({ item: items[2], datasource: ds });
  expect(page.state.selectedSwitch).toEqual(1);
});



it("should navigate map view of a current work order", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const schedulePagecontroller = new SchedulePageController();

  const app = new Application();

  const page = new Page({ name: "approvals" });
  const ds = newDatasource(workorderitem, "workorderds");

  page.registerDatasource(ds);
  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);

  let items = await ds.load();

  app.registerPage(page);
  await app.initialize();

  app.registerController(controller);
  page.registerController(schedulePagecontroller);

  controller.pageInitialized(new Page(), app);
  app.setCurrentPage = mockSetPage;
  page.state.selectedDS = "workorderds";
  schedulePagecontroller.pageInitialized(page, app);

  await controller.handleMapPage({ item: items[2], datasource: ds });
  expect(page.state.selectedSwitch).toEqual(1);
});

it("should open asset mismatch dialog or toast on workorder details page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);

  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);

  await woAssetLocationds.load();
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  app.toast = jest.fn();
  page.showDialog = jest.fn();
  await controller.handleAssetScan({ value: "13120" });
  await expect(app.toast.mock.calls.length).toBe(1);
  await controller.handleAssetScan({ value: "13121" });
  await expect(page.showDialog.mock.calls.length).toEqual(1);
});

it("should open barcode scanner after closing the mismatch dialog", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);

  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);

  const assetMisMatchDialog = new Dialog({
    name: "assetMisMatchDialog",
  });
  assetMisMatchDialog.closeDialog = jest.fn();
  page.showDialog = jest.fn();
  page.registerDialog(assetMisMatchDialog);

  await woAssetLocationds.load();
  await app.initialize();

  let event = { value: "mockval" };
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  controller.openBarcodeScanner(event);
  controller.pageInitialized(page);
  controller.openBarcodeScanner(event);
});

it("should open assist app with context", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  await app.initialize();
  controller.pageInitialized(new Page(), app);
  AppSwitcher.setImplementation(MaximoAppSwitcher, { app: app });
  const emitSpy = sinon.spy(app, "emit");

  const page = new Page({ name: "page" });
  const wodetailDS = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(wodetailDS);
  let items = await wodetailDS.load();

  // calling with an empty wo item
  controller.gotoAssistApp({ item: {} });
  sinon.assert.callCount(emitSpy, 1);

  // calling with appName but without options and context data
  controller.gotoAssistApp({ item: items[1] });
  sinon.assert.callCount(emitSpy, 2);
});

it("should load data on container mode", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page1 = new Page({ name: 'report_work' });

  app.registerController(controller);

  const detailDS = newDatasource(workorderitem, "woDetailResource");
  const synonymDS = newStatusDatasource(statusitem, "synonymdomainData");
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  const woPlanTaskDS = newTaskDatasource(tasklist, "woPlanTaskDetailds");
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  const assetDs = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  const locDs = newLocDS(workorderitem, "woLocationds");
  const mrDS = newDatasource(wpmaterial, "mrDS");
  let attachmentListWoDetailDS = newDatasource(
    attachmentlistitem,
    "attachmentListWoDetailDS",
    "member"
  );
  page.registerDatasource(mrDS);
  page.registerDatasource(detailDS);
  app.registerDatasource(synonymDS);
  app.registerDatasource(woDetailds);
  app.registerDatasource(woPlanTaskDS);
  page.registerDatasource(woServiceAddress);
  page.registerDatasource(assetDs);
  page.registerDatasource(locDs);
  app.registerDatasource(attachmentListWoDetailDS);
  let getDefaultExternalSynonymValue = sinon
    .stub(SynonymUtil, "getDefaultExternalSynonymValue")
    .returns("CAN");
  app.client = {
    userInfo: {
      insertOrg: "EAGLENA",
      insertSite: "BEDFORD",
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
    getUserProperty: () => {}
  };

  await app.initialize();
  app.registerPage(page1);

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  Device.get().isMaximoMobile = true;
  page1.state.fieldChangedManually = false;
  await controller.pageResumed(page, app);
  expect(
    page.datasources["woServiceAddress"].item.longitudex
  ).not.toBeDefined();
  expect(getDefaultExternalSynonymValue.called).toBe(true);
  expect(page.state.assetLocation).toBe(true);
});

it("should save longitude and latitude information in service address of workorder", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const wods = newDatasource(workorderitem, "woServiceAddress");

  page.registerDatasource(wods);
  app.registerController(controller);
  app.map = {
    getBasemapSpatialReference : () => {return true},
    convertCoordinates : () => {return true},
  };
  await app.initialize();
  controller.pageInitialized(page, app);
  let item = {}
  await controller.saveGPSLocation(item);
  expect(page.state.gpsLocationSaved).toBe(true);

  item.coordinate = 'XY';
  await controller.saveGPSLocation(item);
  expect(page.state.gpsLocationSaved).toBe(true);
});

it("work order edit", async () => {
  let mockedFn = jest.fn();
  const controller = new WorkOrderDetailsController();
  const editcontroller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const page3 = new Page({ name: "report_work" });

  const page2 = new Page({ name: "workOrderDetails" });
  const detailDS = newDatasource(workorderitem, "woDetailResource");

  let workorder = {
    item: { wonum: "1001", siteid: "BEDFORD", orgid: "EAGLENA" },
    datasource: "woDetailResource",
  };

 page.params = {
  wonum: "1001",
  istask: true,
  wogroup:"",
  taskid: "1452",
  wo:workorder.item
 }

 const workorder1 = {
  wonum: "1001",
  description: "Work Order desc",
  description_longdescription: "Work Order long desc",
  wopriority: 2,
  worktype: "CAL",
  orgid: "EAGLENA",
  status: "APPR",
  locationnum : 'SHIPPING',
  locationdesc: 'Shipping and Receiving Department',
  schedfinish: "2021-06-04T05:18:00+05:30",
  schedstart: "2021-06-04T02:49:00+05:30",
  istask: false,
  wogroup: '1003',
  taskid: '103'
};
  
  const ds = newDatasource({ member: workorder1 }, "dsWoedit");
  app.registerDatasource(ds);
  const synonymdomainData = newTimerStatusDatasource(
    statusitem,
    "synonymdomainData"
  );
  app.registerDatasource(synonymdomainData);
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page2.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  page2.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page2.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page2.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page2.registerDatasource(mrDS);
  page2.registerDatasource(detailDS);

  page.registerDatasource(woAssetLocationds);
  page.registerDatasource(woLocationds);
  page.registerDatasource(woDetailds);
  page.registerDatasource(woServiceAddress);
  page.registerDatasource(mrDS);
  page.registerDatasource(detailDS);

  app.client = {
    userInfo: {
      insertOrg: "EAGLENA",
      insertSite: "BEDFORD",
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  Device.get().isMaximoMobile = false;
  app.registerController(controller);
  app.registerController(editcontroller);
  app.registerPage(page2);
  app.registerPage(page);
  app.registerPage(page3);

  editcontroller.pageInitialized(page, app);
  controller.pageInitialized(page2, app);
  await app.initialize();

  page.callController = mockedFn;
  page.workOrderEdit = mockedFn;
  page3.state.fieldChangedManually = false;
});

it("should open Asset WorkOrder", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page2 = new Page({ name: "report_work" });
  const page1 = new Page({ name: "assetWorkOrder" });
  const detailDS = newDatasource(workorderitem, "woDetailResource");
  
  app.registerController(controller);
  page.registerDatasource(detailDS);
  page1.registerDatasource(detailDS);
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  woAssetLocationds.baseQuery.childFilters = [
    {
      "asset.wobyasset.where": 'status in ["COMP","CLOSE"]'
    }
  ]
  page.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  
  woLocationds.baseQuery.childFilters = [
    {
      "locations.wobylocation.where": 'status in ["COMP","CLOSE"]'
    }
  ]
  page.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  const synonymdomainData = newTimerStatusDatasource(
    statusitem,
    "synonymdomainData"
  );
  app.registerDatasource(synonymdomainData);

  page1.registerDatasource(woAssetLocationds);
  page1.registerDatasource(woLocationds);
  page1.registerDatasource(woDetailds);
  page1.registerDatasource(woServiceAddress);
  page1.registerDatasource(mrDS);

  app.registerPage(page);
  app.registerPage(page1);
  app.registerPage(page2);
  page2.state.fieldChangedManually = false;

  await app.initialize();

  controller.pageInitialized(page, app);
  let event = {
    item: {
      assetnum: "11200",
      description: "HVAC System- 50 Ton Cool Cap/ 450000 Btu Heat Cap",
      isrunning: false,
    },
  };
  page2.state.fieldChangedManually = false;
  const whereQuery = ["COMP","CLOSE"];
  controller.openAssetWorkOrder(event, whereQuery, whereQuery);
  expect(app.currentPage.name).toBe("assetWorkOrder");
});

it("should choose DownTimeCode", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  app.registerController(controller);

  await app.initialize();
  controller.pageInitialized(page, app);
  let event = {
    description: "Breakdown",
    value: "BRKDWN",
  };
  controller.chooseDownTimeCode(event);
  expect(page.state.downTimeCodeValue).toBe("BRKDWN");
  expect(page.state.downTimeCodeDesc).toBe("Breakdown");
});

it("should open DowntimeCode lookup", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  const ds = newStatusDatasource(downTimeCode, "downTimeCodeLookupDs");
  page.registerDatasource(ds);
  let loadstub = sinon.stub(ds, "searchQBE");

  app.registerController(controller);

  await app.initialize();
  controller.pageInitialized(page, app);
  let event = {
    page: page,
  };
  await controller.openDowntimeCodeLookup(event);
  expect(loadstub.called).toBe(true);
  expect(loadstub.displayName).toBe("searchQBE");
  loadstub.restore();
});

it("should handleToggled", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  page.state.upDownButtonGroupdata = [
    { id: "assetUpBtn", iconName: "carbon:arrow--up", toggled: true },
    { id: "assetDownBtn", iconName: "carbon:arrow--down", toggled: false },
  ];

  const ds = newDatasource([], "downTimeReportAsset");
  page.registerDatasource(ds);

  app.registerController(controller);

  await app.initialize();
  controller.pageInitialized(page, app);
  let event = {
    isrunning: true,
    item: {
      id: "assetDownBtn",
      label: undefined,
      toggled: false,
    },
  };
  controller.handleToggled(event);
  expect(page.state.hideUp).toBe(false);
  expect(page.state.hideDown).toBe(false);

  event.item.id = "assetUpBtn";

  controller.handleToggled(event);
  expect(page.state.hideUp).toBe(true);
  expect(page.state.hideDown).toBe(true);
  window.setTimeout(async () => {
    expect(page.state.disableSaveDowtimeButton).toBe(true);
  }, 50);

  event.isrunning = false;
  controller.handleToggled(event);
  expect(page.state.hideUp).toBe(false);
  expect(page.state.hideDown).toBe(true);
});

it("should setCurrentDateTime", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  const ds = newDatasource([], "downTimeReportAsset");
  page.registerDatasource(ds);
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  page.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);

  app.registerController(controller);

  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.setCurrentDateTime();

  expect(ds.items).not.toBeNull();
});

it("should open Asset DownTimeDrawer", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const ds = newDatasource(workordersingleitem, "woDetailResource");
  const ds1 = newDatasource([], "downTimeReportAsset");
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  page.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);

  app.client = {
    userInfo: {
      insertOrg: "EAGLENA",
      insertSite: "BEDFORD",
    },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  app.registerPage(page);
  page.registerDatasource(ds);
  page.registerDatasource(ds1);

  app.registerController(controller);

  const synonymdomainData = newTimerStatusDatasource(
    statusitem,
    "synonymdomainData"
  );
  app.registerDatasource(synonymdomainData);

  await app.initialize();
  controller.pageInitialized(page, app);

  let event = {
    item: {
      assetisrunning: true,
    },
  };
  await controller.openAssetDownTimeDrawer(event);

  expect(page.state.hideUp).toBe(true);
  expect(page.state.hideDown).toBe(true);
});

it("should update multi asset progress", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  let record = {
    assetItem: {
      progress: false,
      multiid: 4086,
      href: "http://childkey#V09SS09SREVSL01VTFRJQVNTRVRMT0NDSS80MDg2",
    },
  };

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  await multiAssetDs.load();
  app.registerDatasource(multiAssetDs);
  app.registerController(controller);

  await app.initialize();
  controller.pageInitialized(page, app);

  await controller.updateMultiAssetProgress(record);
  expect(page.state.progress).toBe(true);

  record.assetItem.progress = true;
  await controller.updateMultiAssetProgress(record);
  expect(page.state.progress).toBe(false);

  record = {};
  await controller.updateMultiAssetProgress(record);
  expect(page.state.progress).toBe(false);
});

it("should saveAssetDownTimeTransaction()", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page1 = new Page({ name: 'report_work' });
  const ds = newDatasource(workordersingleitem, "woDetailResource");
  const ds1 = newDatasource(
    [{ statuschangedate: "2021-07-02T11:36:07+05:30" }],
    "downTimeReportAsset"
  );
  const assetStatusDialog = new Dialog({
    name: "assetStatusDialog",
  });
  app.registerPage(page);
  app.registerPage(page1);
  assetStatusDialog.closeDialog = jest.fn();
  page.registerDialog(assetStatusDialog);
  page.registerDatasource(ds);
  page.registerDatasource(ds1);
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  page.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  page.state.downTimeCodeValue = "";
  app.registerController(controller);

  let items = await ds.load();
  await ds1.load();
  let invokeAction = sinon.stub(ds, "invokeAction").returns(items[0]);
  let forceReloadStub = sinon.stub(ds, "forceReload");
  page1.state.fieldChangedManually = false;
  await app.initialize();
  controller.pageInitialized(page, app);
  let event = {
    page: page,
  };
  await controller.saveAssetDownTimeTransaction(event);
  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe("invokeAction");
  expect(forceReloadStub.called).toBe(true);
  invokeAction.restore();
  forceReloadStub.restore();
});

it("should validateDownTimeDate()", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page1 = new Page({ name: 'report_work' });
  const ds = newDatasource(workordersingleitem, "woDetailResource");
  const ds1 = newDatasource1(
    [{ statuschangedate: "2021-07-01T11:36:07+05:30" }],
    "downTimeReportAsset"
  );
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  page.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  const assetStatusDialog = new Dialog({
    name: "assetStatusDialog",
  });
  app.registerPage(page);
  app.registerPage(page1);
  assetStatusDialog.closeDialog = jest.fn();
  page.registerDialog(assetStatusDialog);
  page.registerDatasource(ds);
  page.registerDatasource(ds1);
  page.state.downTimeCodeValue = "";
  page.state.lastStatusChangeDate = "2021-07-02T11:36:07+05:30";
  app.registerController(controller);

  await ds1.load();
  page1.state.fieldChangedManually = false;
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.validateDownTimeDate();
  expect(page.state.disableSaveDowtimeButton).toBe(true);

  controller.clearWarnings("statuschangedate");
  page.state.lastStatusChangeDate = "2021-06-29T11:36:07+05:30";
  controller.validateDownTimeDate();
  expect(page.state.disableSaveDowtimeButton).toBe(false);

  ds1.item.statuschangedate = "";
  controller.validateDownTimeDate();
  expect(page.state.disableSaveDowtimeButton).toBe(true);
  controller.clearWarnings("statuschangedate");
});

it("should onValueChanged()", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page1 = new Page({ name: 'report_work' });
  const ds = newDatasource(workordersingleitem, "woDetailResource");
  const ds1 = newDatasource1(
    [{ statuschangedate: "2021-07-01T11:36:07+05:30" }],
    "downTimeReportAsset"
  );
  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);
  const woLocationds = newLocDS(workorderitem, "woLocationds");
  page.registerDatasource(woLocationds);
  const woDetailds = newDatasource(workorderitem, "woDetailds");
  page.registerDatasource(woDetailds);
  const woServiceAddress = newDatasource(workorderitem, "woServiceAddress");
  page.registerDatasource(woServiceAddress);
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);

  const assetStatusDialog = new Dialog({
    name: "assetStatusDialog",
  });
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  assetStatusDialog.closeDialog = jest.fn();
  page.registerDialog(assetStatusDialog);
  page.registerDatasource(ds);
  page.registerDatasource(ds1);
  page.state.downTimeCodeValue = "";
  page.state.lastStatusChangeDate = "2021-07-02T11:36:07+05:30";
  app.registerController(controller);

  await ds1.load();
  await app.initialize();
  controller.pageInitialized(page, app);

  let evt = {
    field: "statuschangedate",
  };
  controller.onValueChanged(evt);
  expect(page.state.disableSaveDowtimeButton).toBe(true);
});

it("should invoke validateMeterReadings using onFocusReadings", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "workOrderDetails",
  });

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.state.useConfirmDialog = true;
  page.registerDatasource(ds);
  
  app.registerController(controller);
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    newreading: 12,
    "assetmeterid": 29,
    "metername": "TEMP-F",
    "location": "LOC1",
    lastreading: 20,
    lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
    meter: {metertype_maxvalue: 'CONTINUOUS'},
    dorollover: false
  };
  event.field = "computedMeterCurDate";
  let validateMeterReadingsStub = sinon.stub(
    controller,
    "validateMeterReadings"
  );
  // should invoke even if no value change.
  await controller.onFocusReadings(event);
  expect(validateMeterReadingsStub.called).toBe(true);

  validateMeterReadingsStub.reset();

  // should not invoke since onvalueChanged already invoked.
  page.state.readingChangeInvoked = true;
  await controller.onFocusReadings(event);
  expect(validateMeterReadingsStub.called).toBe(true);
});

it("saveMeterReadings for asset - gauge meters", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "workOrderDetails",
  });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerController(controller);
  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  
  page.state.assetMeterData = ds;
  page.registerDatasource(ds);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    field: "newreading",
    item: {
      assetnum: "13170",
      href:
        "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
    },
    newValue: 123,
    newreadingDate: new Date(),
    oldValue: undefined,
    datasource: {
      name: ds.name,
      items: ds.items
    },
    change: {
      object: {
        assetmeterid: 29,
        metername: "TEMP-F",
        dorollover: false,
      },
    },
  };

  // the dataadapter should have a query
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;

  page.state.newReading = true;
  await controller.onValueChanged(event);
  await controller.saveMeterReadings(event, app, ds);
  //expect(page.state.disableSave).toBe(false);
});

it("saveMeterReadings for location - gauge meters", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "workOrderDetails",
  });

  app.registerController(controller);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  await multiAssetDs.load();
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;
  page.registerDatasource(multiAssetDs);
  page.registerDatasource(ds2);
  await app.initialize();

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    field: "newreading",
    item: {
      location: "BPM3100",
      href:
        "http://localhost:3000/maximo/oslc/os/mxapilocationmeter/_VE9NQVNTMS8wLJE-FAKELOCATIONMETERRESTID",
    },
    newValue: 9,
    newreadingDate: new Date(),
    oldValue: undefined,
    datasource: {
      name: ds2.name,
      items:ds2.items
    },
    change: {
      object: {
        locationmeterid: 3,
        dorollover: false,
        metername: "IN-PRESSUR",
      },
    },
  };
  page.state.newReading = true;
  controller.onValueChanged(event);
  expect(page.state.disableSave).toBe(true);
});

it("saveMeterReadings for asset - continuous meters", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "page",
  });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };
  app.registerController(controller);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.registerDatasource(multiAssetDs);
  page.registerDatasource(ds);
  page.error = jest.fn();

  let updatestub = sinon.stub(ds, "update");
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    field: "newreading",
    item: {
      assetmeterid: 29,
      metername: "TEMP-F",
      assetnum: "13170",
      lastreading: 20,
      lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
      meter: { metertype_maxvalue: "CONTINUOUS" },
    },
    newValue: 12,
    oldValue: undefined,
    datasource: {
      name: ds.name,
      items:ds.items
    },
    change: {
      object: {
        assetmeterid: 29,
        metername: "TEMP-F",
        lastreading: 26,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: { metertype_maxvalue: "CONTINUOUS" },
      },
    },
  };

  controller.onValueChanged(event);
  expect(updatestub.called).toBe(false);
});

it("saveMeterReadings for location - continuous meters", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "page",
  });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerController(controller);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds;
  
  const activeassetmeterDS = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = activeassetmeterDS;
  
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  page.registerDatasource(ds);
  page.registerDatasource(activeassetmeterDS);
  page.error = jest.fn();

  let updatestub = sinon.stub(ds, "update");
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    field: "newreading",
    item: {
      assetmeterid: 29,
      metername: "TEMP-F",
      location: "LOC1",
      lastreading: 20,
      lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
      meter: { metertype_maxvalue: "CONTINUOUS" },
      dorollover: false,
    },
    newValue: 12,
    oldValue: undefined,
    datasource: {
      name: ds.name,
      items: ds.items
    },
    change: {
      object: {
        assetmeterid: 29,
        metername: "TEMP-F",
        lastreading: 20,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: { metertype_maxvalue: "CONTINUOUS" },
      },
    },
  };
  controller.onValueChanged(event);
  
  let event1 = {
    field: "newreading",
    item: {
      assetmeterid: 29,
      metername: "TEMP-F",
      location: "LOC1",
      lastreading: 20,
      lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
      meter: { metertype_maxvalue: "CONTINUOUS" },
      dorollover: false,
    },
    newValue: 12,
    oldValue: undefined,
    datasource: multiAssetDs,
    change: {
      object: {
        assetmeterid: 29,
        metername: "TEMP-F",
        lastreading: 20,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: { metertype_maxvalue: "CONTINUOUS" },
      },
    },
  };
  
  await controller.saveUpdateMeterDialog(event1);
  expect(updatestub.called).toBe(false);
});

it("saveMeterReadings - rollover readings", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "page",
  });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerController(controller);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.registerDatasource(ds);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  page.error = jest.fn();
  let event = {
    field: "newreading",
    item: {
      assetmeterid: 29,
      metername: "TEMP-F",
      assetnum: "13170",
    },
    oldValue: undefined,
    datasource: {
      name: ds.name,
      items:ds.items
    },
    change: {
      object: {
        assetmeterid: 29,
        metername: "TEMP-F",
        lastreading: 20,
        lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
        meter: { metertype_maxvalue: "CONTINUOUS" },
      },
    },
  };

  // the dataadapter should have a query
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;

  let saveReadingsStub = sinon.stub(controller, "saveMeterReadings");
  //no rollover set newvalue is less than last
  event.newValue = 12;
  event.change.object.newreading = 12;
  page.state.newReading = true;
  saveReadingsStub.reset();
  controller.validateMeterReadings();
  expect(saveReadingsStub.called).toBe(false);
  controller.onValueChanged(event);

  // no rollover but value is greater than last reading
  saveReadingsStub.reset();
  event.change.object.rollover = undefined;
  event.newValue = 21;
  event.change.object.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";
  page.state.rollOverData = [];
  page.state.rollOverData.push(event);
  await controller.saveRollOverReadings(true);
  expect(page.state.rollOverData[0].dorollover).toBe(true);
});

it("saveCharactersticMeterReading for asset", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };
  app.registerController(controller);
  const newreadingds = newDatasourceNew(dsnewreading, "multidsnewreading");
  newreadingds.isAssetMeter = true;
  newreadingds.currentMeterid = 30;
  newreadingds.currentAssetLocNum = "13170";
  newreadingds.CurrentMeterName = "TEMP-C";
  newreadingds.CurrentMeterhref =
    "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_MTMxNzAvQkVERkKSDJF929SRA--";

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.state.locationMeterData = ds2;

  page.registerDatasource(newreadingds);
  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    item: {
      value: 123,
      meter: { domainid: "RAIL_WEAR" },
      activeassetmeter: ds,
      activelocationmeter: ds2
    },
    change: {
      object: {
        assetmeterid: 29,
        metername: "TEMP-F",
        dorollover: false,
      }},
    datasource: ds,
  };

  // the dataadapter should have a query
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;
  page.state.invalidDateTime = true;
  await controller.openmultiMeterLookup(event);
  await controller.saveCharactersticMeterReading(event);
  expect(page.state.disableSave).toBe(true);
  
  page.state.invalidDateTime = false;
  await controller.openmultiMeterLookup(event);
  await controller.saveCharactersticMeterReading(event);
  expect(page.state.disableSave).toBe(false);
  
  page.state.newReading = true;
  await controller.onValueChanged(event);
});

it("saveCharacterStickMeter for location", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  app.client = {
    userInfo: {
      personid: "SAM",
      labor: { laborcode: "SAM" },
    },
  };

  app.registerController(controller);

  const newreadingds = newDatasourceNew(dsnewreading, "multidsnewreading");
  newreadingds.isAssetMeter = false;
  newreadingds.currentMeterid = 30;
  newreadingds.currentAssetLocNum = "13170";
  newreadingds.CurrentMeterName = "TEMP-C";
  newreadingds.CurrentMeterhref =
    "http://localhost:3000/maximo/oslc/os/mxapilocationmeter/_QlBNMzEwMC9IRUFEIExPU1MyL0JFREZPUkQ-";
  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.state.locationMeterData = ds2;
  page.registerDatasource(newreadingds);
  page.registerDatasource(ds);
  page.registerDatasource(ds2);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    item: {
      value: 123,
      meter: { domainid: "RAIL_WEAR" },
    },
    datasource: ds,
  };

  await controller.openmultiMeterLookup(event);
  controller.saveCharactersticMeterReading(event);
  expect(page.state.disableSave).toBe(false);
});

it("should open characterstic drawer page for asset meter", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);
  const dsnewreadingDs = newDatasourceNew(dsnewreading, "multidsnewreading");
  dsnewreadingDs.isAssetMeter = true;
  page.registerDatasource(dsnewreadingDs);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.registerDatasource(ds);
  let loadstub = sinon.stub(dsnewreadingDs, "searchQBE");

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    item: {
      assetmeterid: 78,
      metername: "GUARD RAIL",
      assetnum: "13170",
      meter: {
        domainid: "RAIL_WEAR",
      },
    },
    datasource: {
      name: ds.name,
    },
  };
  await controller.openmultiMeterLookup(event);
  expect(loadstub.called).toBe(true);
  expect(loadstub.displayName).toBe("searchQBE");
});

it("should open characterstic drawer page for location meter", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);
  const dsnewreadingDs = newDatasourceNew(dsnewreading, "multidsnewreading");
  dsnewreadingDs.isAssetMeter = false;
  page.registerDatasource(dsnewreadingDs);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.registerDatasource(ds);

  let loadstub = sinon.stub(dsnewreadingDs, "searchQBE");

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    item: {
      locationmeterid: 55,
      metername: "TEMP-F",
      assetnum: "BPM3100",
      meter: {
        domainid: "RAIL_WEAR",
      },
    },
    datasource: {
      name: ds.name,
    },
  };
  await controller.openmultiMeterLookup(event);
  expect(loadstub.called).toBe(true);
  expect(loadstub.displayName).toBe("searchQBE");
});

it("close update meter sliding drawer page with asset data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const woassetmetersDs = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = woassetmetersDs;

  const wolocationmetersDs = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = wolocationmetersDs;

  page.registerDatasource(woassetmetersDs);

  let assetloadstub = sinon.stub(woassetmetersDs, "load");
  let multiassetdsstub = sinon.stub(multiAssetDs, "searchQBE");
  
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    item: {
      siteid: "BEDFORD",
      asset: [
        {
          assetnum: "13170",
          description: "Top Sealer System",
        },
      ],
      wonum: "1202",
    },
    datasource: multiAssetDs,
  };

  await controller.closeUpdatemultiMeterDialog(event);
  expect(page.state.useConfirmDialog).toBe(true);

  assetloadstub.restore();
  multiassetdsstub.restore();
});

it("close update meter sliding drawer page with location data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  app.registerController(controller);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();

  const woassetmetersDs = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = woassetmetersDs;

  const wolocationmetersDs = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = wolocationmetersDs;
  page.registerDatasource(wolocationmetersDs);

  let locationloadstub = sinon.stub(wolocationmetersDs, "load");
  sinon.stub(multiAssetDs, "searchQBE");
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    item: {
      siteid: "BEDFORD",
      location: {
        description: "#1 Liquid Packaging Line",
        location: "BPM3100",
      },
      wonum: "1202",
    },
    datasource: multiAssetDs,
  };
  await controller.closeUpdatemultiMeterDialog(event);
  expect(page.state.useConfirmDialog).toBe(true);

  controller.closeUpdatemultiMeterDialog = jest.fn();
  controller.validatemeter = true;
  await controller.closeUpdatemultiMeterDialog(event);
  expect(controller.closeUpdatemultiMeterDialog).toHaveReturnedWith(undefined);

  locationloadstub.restore();
});

it("close first meter sliding drawer page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);

  let multiassetdsstub = sinon.stub(multiAssetDs, "searchQBE");
  let multiassetdsstub2 = sinon.stub(multiAssetDs, "initializeQbe");

  ///let items = await ds.load();
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let event = {
    page: page,
    datasource: multiAssetDs,
  };
  await controller.closeMeterDialog(event);
  expect(multiassetdsstub.called).toBe(true);
  expect(multiassetdsstub.displayName).toBe("searchQBE");
  expect(multiassetdsstub2.called).toBe(true);
  expect(multiassetdsstub2.displayName).toBe("initializeQbe");
  multiassetdsstub.restore();
});

it("should open enter meter sliding drawer page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "page",
  });
  app.registerController(controller);

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  let items = await multiAssetDs.load();
  const woassetmetersDs = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  const wolocationmetersDs = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  app.registerDatasource(woDetailResource);
  
  await woDetailResource.load();
  page.state.assetMeterData = woassetmetersDs;
  page.state.locationMeterData = wolocationmetersDs;
  page.registerDatasource(woassetmetersDs);
  page.registerDatasource(wolocationmetersDs);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await page.state.assetMeterData.load();
  await page.state.locationMeterData.load();

  await controller.openEnterReadingDrawer({
    item: items[0],
    datasource: multiAssetDs,
  });
  page.state.assetMeterData.items.forEach((element) => {
    expect(element.newreading);
  });
  page.state.locationMeterData.items.forEach((element) => {
    expect(element.newreading).toBe(undefined);
  });
  expect(page.state.locationMeterHeader).toBe("BR300 Boiler Room Reciprocating Compressor");
});

it("should open meter sliding drawer page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  let items = await multiAssetDs.load();
  const woassetmetersDs = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  const wolocationmetersDs = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = woassetmetersDs;
  page.state.locationMeterData = wolocationmetersDs;
  page.registerDatasource(woassetmetersDs);
  page.registerDatasource(wolocationmetersDs);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await controller.openMultiMeterReadingDrawer({
    item: items[0],
    datasource: multiAssetDs,
    app
  });
  expect(page.state.assetMeterHeader).toBe(
    "11300 Reciprocating Compressor- Air Cooled/100 CFM"
  );
  expect(page.state.locationMeterHeader).toBe(
    "BR300 Boiler Room Reciprocating Compressor"
  );
});

it("should open material request page", async () => {
  global.open = jest.fn();
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  app.registerController(controller);
  const ds = newDatasource(workorderitem, "workorderds");
  page.registerDatasource(ds);
  let items = await ds.load();
  let mritems = await mrDS.load();

  await app.initialize();

  const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");
  const slidingWodetailsMaterials = new Dialog({
    name: "slidingwodetailsmaterials",
  });
  slidingWodetailsMaterials.closeDialog = jest.fn();
  page.registerDialog(slidingWodetailsMaterials);

  controller.pageInitialized(page, app);
  await controller.openMaterialRequestPage({
    item: items[0],
    mritem: mritems[0],
  });
  sinon.assert.callCount(setCurrentPageSpy, 1);
});

it("should set LogType", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  let event = { value: "APPTNOTE", description: "Appointment Note" };
  controller.setWODetailsLogType(event);
  expect(page.state.WoDetailsDefaultLogType).toBe("APPTNOTE");
});

it("open reserve material page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  page.findDialog = jest.fn();

  controller.openReservedMaterials({
    item: { href: "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA1OA--" },
  });
  await expect(page.findDialog.mock.calls.length).toEqual(1);
});

it("it should set saveDataSuccessful to false ", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const page1 = new Page({ name: 'report_work' });

  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);

  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  await app.initialize();
  controller.onUpdateDataFailed();
  expect(controller.saveDataSuccessful).toBe(false);
});

it("it should closeAllDialogs", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page1 = new Page({ name: 'report_work' });
  const woWorkLogDrawer = new Dialog({
    name: "woWorkLogDrawer",
  });
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);
  page.registerDialog(woWorkLogDrawer);
  woWorkLogDrawer.closeDialog = jest.fn();
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  await app.initialize();
  controller.pageInitialized(page, app);
  controller._closeAllDialogs(page);
  expect(woWorkLogDrawer.closeDialog.mock.calls.length).not.toBeNull();
});

it("it should handleDeleteTransaction", async () => {
  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const page1 = new Page({ name: 'report_work' });
  const woWorkLogDrawer = new Dialog({
    name: "woWorkLogDrawer",
  });
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);

  const woAssetLocationds = newAssetLocationDatasource(
    workorderitem,
    "woAssetLocationds"
  );
  page.registerDatasource(woAssetLocationds);

  sinon.stub(woDetailResource, "load").returns([]);
  woDetailResource.currentItem = { href: "testhref" };
  page.registerDialog(woWorkLogDrawer);
  woWorkLogDrawer.closeDialog = jest.fn();
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(page1);
	page1.state.fieldChangedManually = false;
  let txn = {
    app: "Application",
    href: "testhref",
  };
  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.handleDeleteTransaction(txn);
  expect(woWorkLogDrawer.closeDialog.mock.calls.length).not.toBeNull();
});

it("should open date time meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);

  let multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  app.registerDatasource(multiAssetDs);

  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
});

it("should validate date in date time meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  app.registerController(controller);

  let multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  app.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;

  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);

  const woDetailds = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(woDetailds);

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  multiAssetDs.item.computedMeterCurDate = '';
  await controller.validateMeterDate();
  expect(page.state.invalidMeterDate).toBe(true);
  
  multiAssetDs.item.computedMeterCurDate = new Date();
  await controller.validateMeterDate();
  expect(page.state.invalidMeterDate).toBe(false);
  
  multiAssetDs.item.computedMeterCurDate = "2021-03-09T09:03:16+05:30";
  await controller.validateMeterDate();
  expect(page.state.invalidMeterDate).toBe(false);
});

it("should validate time in date time meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  app.registerController(controller);

  let multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  app.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;
  
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);

  const woDetailds = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(woDetailds);

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
    
  multiAssetDs.item.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";
  multiAssetDs.item.computedMeterCurTime = "2023-03-22T10:00:00.000+05:30";
  await controller.validateMeterTime(app, page, multiAssetDs);
  expect(page.state.invalidMeterTime).toBe(false);
});

it("should close date time meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });

  app.registerController(controller);

  let multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  app.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;

  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  page.registerDatasource(woDetailResource);

  const woDetailds = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(woDetailds);
  await woDetailds.load();

  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  multiAssetDs.item.computedMeterCurDate = '';
  await controller.validateMeterDate();
  expect(page.state.invalidMeterDate).toBe(true);
});

it("Make the reading editable", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.registerController(controller);
  const ds = newDatasource(workorderitem, "workorderds");
  page.registerDatasource(ds);
  await ds.load();

  app.registerController(controller);
  let multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  app.registerDatasource(multiAssetDs);

  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
});

it("update meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "workOrderDetails",
  });

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.registerDatasource(ds);
  
  await multiAssetDs.load();
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;
  page.registerDatasource(ds2);
  
  app.registerController(controller);
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    newreading: 12,
    "assetmeterid": 29,
    "metername": "TEMP-F",
    "location": "LOC1",
    lastreading: 20,
    lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
    meter: {metertype_maxvalue: 'CONTINUOUS'},
    dorollover: false,
    assetNum: "11200",
    app:app
  };
  
  await controller.updateMeterDatasources(event);
});

it("Onvalue changed on meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "workOrderDetails",
  });

  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  await multiAssetDs.load();
  const ds = multiAssetDs.getChildDatasource(
    "activeassetmeter",
    multiAssetDs.item
  );
  page.state.assetMeterData = ds;
  page.registerDatasource(ds);
  
  await multiAssetDs.load();
  const ds2 = multiAssetDs.getChildDatasource(
    "activelocationmeter",
    multiAssetDs.item
  );
  page.state.locationMeterData = ds2;
  page.registerDatasource(ds2);
  
  app.registerController(controller);
  await app.initialize();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let event = {
    newreading: 12,
    "assetmeterid": 29,
    "metername": "TEMP-F",
    "location": "LOC1",
    lastreading: 20,
    lastreadingdate: app.dataFormatter.dateTimeToString(new Date()),
    meter: {metertype_maxvalue: 'CONTINUOUS'},
    dorollover: false,
    assetNum: "11200"
  };
  
  page.state.useConfirmDialog = true;
  event.field = "computedMeterCurDate";
  await controller.onValueChanged(event);
  
  expect(page.state.useConfirmDialog).toBe(true);
});

it("update meter sliding drawer", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
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
  
  await controller.updateMeterDatasourcesDetail(event);  
});

it("Validate meter for date", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
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

  await controller.validateMeterDateDetail();
  expect(page.state.invalidMeterDate).toBe(true);
  
  page.state.invalidMeterTime = false;
  page.state.invalidMeterDate = false;
  await controller.validateMeterDateDetail();
  
  page.state.invalidMeterTime = true;
  page.state.invalidMeterDate = true;
  await controller.validateMeterDateDetail();
});

it("Validate meter for time", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'workorderds');
  page.registerDatasource(ds);
  await ds.load();
  
  app.registerController(controller);
  const  woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
  app.registerDatasource(woassetmetersDs);
  
  await woassetmetersDs.load();  
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  
  await woassetmetersDs.load();
  woassetmetersDs.item.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";;
  woassetmetersDs.item.computedMeterCurTime = "2023-03-22T10:00:00.000+05:30";
  await controller.validateMeterTimeDetail();
  expect(page.state.invalidMeterTime).toBe(false);
});

it("should open enter meter sliding drawer page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({
    name: "page"
  });

  app.registerController(controller);
  const ds = newDatasource(workorderitem, "woDetailds");
  app.registerDatasource(ds);

  const wodetails = newDatasource(workorderitem, "wodetails");
  page.registerDatasource(wodetails);
  
  const woDetailResource = newDatasource(workorderitem, "woDetailResource");
  app.registerDatasource(woDetailResource);  
  await woDetailResource.load();
  
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
  await app.findDatasource("wolocationmeters").load();
  await controller.openEnterReadingDrawerDetail({
    item: items[2],
    datasource: ds
  });
  app.findDatasource("woassetmeters").items.forEach((element) => {
    expect(element.newreading);
  });
  app.findDatasource("wolocationmeters").items.forEach((element) => {
    expect(element.newreading).toBe(undefined);
  });
  expect(page.state.locationMeterHeader).toBe("BPM3100 #1 Liquid Packaging Line");

});

it("close update meter sliding drawer page with asset data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
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
  await controller.closeUpdateMeterDialog(event,'','','','','',app);
  expect(page.state.useConfirmDialog).toBe(true);
});

it('should invoke validateMeterReadings using onFocusReadings', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
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
  await controller.onFocusReadingsDetail(event);
  expect(validateMeterReadingsStub.called).toBe(true);

  validateMeterReadingsStub.reset();
  page.state.readingChangeInvoked = true;
  await controller.onFocusReadingsDetail(event);
  expect(page.state.readingChangeInvoked).toBe(true);
});

it('saveMeterReadings - rollover readings', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
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
  
  const multiAssetDs = newDatasourceMultiAssetLoc(
    multiassetlocitem,
    "woMultiAssetLocationds"
  );
  page.registerDatasource(multiAssetDs);
  
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
        item:{computedMeterCurDate: new Date(), computedMeterCurTime: new Date()},
        newValue: 10
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
  
  await controller.saveUpdateMeterDialogDetail(event);
  
  event.change.object.rollover = true;
  event.newValue = 10;
  await controller.validateMeterReadings(event);
  page.state.rollOverData = [];
  page.state.rollOverData.push(event);
  await controller.saveRollOverReadingsDetail(true);
  expect(page.state.rollOverData[0].dorollover).toBe(true);
  await controller.saveRollOverReadingsDetail(false);
  expect(page.state.rollOverData[0].dorollover).toBe(false);
});

it("should open characterstic drawer page for asset meter", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({name: "page"});

  app.registerController(controller);


  const dsnewreadingDs = newDatasourceNew(dsnewreading, "dsnewreading");
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

  await controller.openMeterLookupDetail(event);
  expect(loadstub.called).toBe(true);
  expect(loadstub.displayName).toBe('searchQBE');
});


it('saveCharacterStickMeter for asset', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
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
  let event = {item:{
    value: 123,
    meter:{domainid:"RAIL_WEAR"}
  },datasource: ds}

  // the dataadapter should have a query 
  let da = ds.dataAdapter;
  da.options.query = !da.options.query ? {} : da.options.query;
  await controller.openMeterLookupDetail(event);
  await controller.saveCharactersticMeterReadingDetail(event);
  updatestub.restore();
});

it('should open Safety Plans page', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'woDetailds');
  app.registerDatasource(ds);
  let items = await ds.load();
  
  const woDetailResourceds = newDatasource(workorderitem, 'woDetailResource');
  app.registerDatasource(woDetailResourceds);
  await woDetailResourceds.load();
  
  let showDialogSpy = sinon.spy(page, 'showDialog'); 
  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openHazardDrawer({'item': items[0], 'datasource': ds});
  
  window.setTimeout(() => {
    expect(showDialogSpy.calledOnce).toBe(true);
    expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('wohazardDrawer');
  }, 500);
  
  
  ds.items[0].splanreviewdate = new Date();
  woDetailResourceds.items[0].splanreviewdate = new Date();
  await controller.openHazardDrawer({'item': items[0], 'datasource': ds});
  window.setTimeout(() => {
    expect(showDialogSpy.calledOnce).toBe(true);
    expect(showDialogSpy.getCall(0).args[0]).toStrictEqual('wohazardDrawer');
  }, 500);
});

it('should review Safety Plan', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const schedulePagecontroller = new SchedulePageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  page.registerController(schedulePagecontroller);
  const ds = newDatasource(workorderitem, 'woDetailResource');
  app.registerDatasource(ds);
  
  const woDetailds = newDatasource(workorderitem, 'woDetailds');
  app.registerDatasource(woDetailds);
  
  const wodetails = newDatasource(workorderitem, 'wodetails');
  app.registerDatasource(wodetails);
  
  await ds.load();
  await woDetailds.load();
  let updateAction = sinon.stub(woDetailds, "update");
  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  page.state.selectedDS = "workorderds";
  controller.pageInitialized(new Page(), app);
  schedulePagecontroller.pageInitialized(page, app);
  await controller.reviewSafetyPlan(app);
  
  expect(updateAction.called).toBe(true);
});


it('accessWoCostData should return total', () => {
  const controller = new WorkOrderDetailsController();
  jest.spyOn(WOUtil, "computedEstTotalCost").mockImplementation(() =>  {
    return {totalcost:"1995.50"}
  });
  expect(controller.accessWoCostData({})).toBe("1995.50");
});

it('should navigate to asset detail', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  const ds = newDatasource(workorderitem, 'woDetailResource');
  app.registerDatasource(ds);
  
  const assetLookupDS = newDatasource(assets, "assetLookupDS");
  app.registerDatasource(assetLookupDS);
  
  await ds.load();
  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  let loadAppFn = jest.fn();
  controller.loadApp = loadAppFn;
  await controller.getAssetDetails();
  await controller.navigateToAssetDetails();
  expect(loadAppFn.mock.calls.length).not.toBeLessThan(0);
});

it('clearCharacterMeterReaing for characterstic meter', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new WorkOrderDetailsController();
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

it("should call pagePause", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const mrDS = newDatasource(wpmaterial, "mrDS");
  page.registerDatasource(mrDS);
  const synonDS = newStatusDatasource(statusitem, "synonymdomainData");
  app.registerDatasource(synonDS);
  app.registerController(controller);
  const ds = newDatasource(workorderitem, "workorderds");
  page.registerDatasource(ds);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  jest.spyOn(page, "findDialog");
  await controller.pagePaused();

  expect(page.findDialog('woWorkLogDrawer')).toBeDefined();
});

it("should call showSpecifications", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderDetailsController();
  const app = new Application();
  const page = new Page({ name: "workOrderDetails" });
  const wodetails = newDatasource(workordersingleitem, "woDetailResource");
  const woSpec = newDatasource(woSpecification, "woSpecification");
  page.registerDatasource(wodetails);
  page.registerDatasource(woSpec);

  app.registerPage(page);
  await app.initialize();

  app.registerController(controller);

  controller.pageInitialized(page, app);
  app.setCurrentPage = mockSetPage;

  controller.showSpecifications();
  expect(page.findDialog('woSpecificationDrawer')).toBeDefined();
});
