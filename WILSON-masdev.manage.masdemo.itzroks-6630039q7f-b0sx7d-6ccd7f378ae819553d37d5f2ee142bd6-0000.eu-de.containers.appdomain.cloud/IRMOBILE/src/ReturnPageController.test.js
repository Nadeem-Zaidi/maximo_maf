import ReturnPageController from "./ReturnPageController";
import polistitem from "./test/po-list-json-data";
import assetreturnitem from "./test/assetreturn-json-data";
import assetinputitem from "./test/assetinput-json-data";
import returnreceiptinputitem from "./test/returnreceiptinput-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newPOListDatasource(data = polistitem, name = "dspolist") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "ponum",
    name: name,
  });

  return ds;
}

function newReturnDatasource(data = assetreturnitem, name = "assetreturnDs") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "localref",
    name: name,
  });

  return ds;
}

function newReceiptinputDatasource(
  data = returnreceiptinputitem,
  name = "returnrecjsonDs"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "_id",
    name: name,
  });

  return ds;
}

function newMobileRecDatasource(data = [], name = "mobileReceipts") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "_id",
    name: name,
  });

  return ds;
}

function newAssetinputDatasource(data = assetinputitem, name = "assetinputDs") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "localref",
    name: name,
  });

  return ds;
}

function newMatrectransDatasource(data = [], name = "dspolistMatrectrans") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "matrectransid",
    name: name,
  });

  return ds;
}

function newPOLineDatasource(data = [], name = "dspolistPoline") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "polineid",
    name: name,
  });

  return ds;
}

it("Return page test", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const returnpage = new Page({
    name: "returnpage",
    clearStack: false,
  });

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  sinon.stub(dspolist, "load").returns([]);

  const assetreturnDs = newReturnDatasource({ member: [] }, "assetreturnDs");
  app.registerDatasource(assetreturnDs);
  let items = [];
  sinon.stub(assetreturnDs, "getSelectedItems").returns(items);
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "getItems").returns(items);

  const returnreceiptinputDs = newReceiptinputDatasource(
    { member: [] },
    "returnrecjsonDs"
  );
  app.registerDatasource(returnreceiptinputDs);
  items = [];
  sinon.stub(returnreceiptinputDs, "getSelectedItems").returns(items);
  sinon.stub(returnreceiptinputDs, "clearSelections");
  sinon.stub(returnreceiptinputDs, "getItems").returns(items);

  const polineDs = newPOLineDatasource([], "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);
  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);

  let returnController = new ReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(returnController);
  returnController.pageInitialized(returnpage, app);
  returnController.pageResumed(returnpage, app);

  returnController.onAfterLoadData(assetreturnDs, []);
  returnController.onAfterLoadData(returnreceiptinputDs, []);
  returnController.onAfterLoadData(dspolist, []);
  returnController.onAfterLoadData(polineDs, []);
  returnController.onAfterLoadData(matrectransDs, []);
  returnController.onAfterLoadData(assetinputDs, []);

  returnController.changeContainerTab(1);
  returnController.pagePaused(returnpage, app);
  returnController.goBack();

  returnpage.state.containerTabSelected = 0;
  returnController.saveReturn();
});

it("Return page test saveReturn for Materials tab for web", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const returnpage = new Page({
    name: "returnpage",
    clearStack: false,
  });

  let returnController = new ReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(returnController);
  returnController.pageInitialized(returnpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns(null);
  sinon.stub(mobileRecDs, "put").returns(null);
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  let items = JSON.parse(JSON.stringify(polistitem.member));
  sinon.stub(dspolist, "load").returns(items);
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);

  const assetreturnDs = newReturnDatasource({ member: [] }, "assetreturnDs");
  app.registerDatasource(assetreturnDs);
  items = [];
  sinon.stub(assetreturnDs, "getSelectedItems").returns(items);
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "getItems").returns(items);

  const receiptinputDS = newReceiptinputDatasource(
    returnreceiptinputitem,
    "returnrecjsonDs"
  );
  app.registerDatasource(receiptinputDS);
  items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  sinon.stub(receiptinputDS, "load").returns(items);
  sinon.stub(receiptinputDS, "getSelectedItems").returns(items);
  sinon.stub(receiptinputDS, "clearSelections");
  sinon.stub(receiptinputDS, "getItems").returns(items);

  app.device.isMaximoMobile = false;
  returnController.pageResumed(returnpage, app);

  returnpage.state.containerTabSelected = 0;
  returnController.saveReturn();

  let data = {
    datasource: receiptinputDS,
    field: "qtyrequested",
    item: items[0],
    newValue: "abc",
  };
  returnController.onValueChanged(data);
  data.newValue = 100;
  returnController.onValueChanged(data);
  data.newValue = 1;
  returnController.onValueChanged(data);
});

it("Return page test saveReturn and validation", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const returnpage = new Page({
    name: "returnpage",
    clearStack: false,
  });

  let returnController = new ReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(returnController);
  returnController.pageInitialized(returnpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(dspolist, "load");
  let items = JSON.parse(JSON.stringify(polistitem.member));
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);
  sinon.stub(dspolist, "invokeAction").returns(items[0]);

  const assetreturnDs = newReturnDatasource({ member: [] }, "assetreturnDs");
  app.registerDatasource(assetreturnDs);
  sinon.stub(assetreturnDs, "getSelectedItems").returns(items);
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "load").returns(items);
  sinon.stub(assetreturnDs, "getItems").returns(items);

  const receiptinputDS = newReceiptinputDatasource(
    returnreceiptinputitem,
    "returnrecjsonDs"
  );
  app.registerDatasource(receiptinputDS);
  items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  let selected = items.filter((i) => i.itemnum !== "11453");
  sinon.stub(receiptinputDS, "load").returns(items);
  sinon.stub(receiptinputDS, "getSelectedItems").returns(selected);
  sinon.stub(receiptinputDS, "clearSelections");
  sinon.stub(receiptinputDS, "getItems").returns(items);
  sinon.stub(receiptinputDS, "getWarnings").returns({
    qtyrequested: "abc",
  });

  app.device.isMaximoMobile = false;
  returnpage.state.containerTabSelected = 1;
  returnController.pageResumed(returnpage, app);

  returnController.saveReturn();
});

it("Return page test saveReturn for Materials tab for mobile", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const returnpage = new Page({
    name: "returnpage",
    clearStack: false,
  });

  let returnController = new ReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(returnController);
  returnController.pageInitialized(returnpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(dspolist, "load");
  let items = JSON.parse(JSON.stringify(polistitem.member));
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);

  const assetreturnDs = newReturnDatasource({ member: [] }, "assetreturnDs");
  app.registerDatasource(assetreturnDs);
  items = [];
  sinon.stub(assetreturnDs, "getSelectedItems").returns(items);
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "getItems").returns(items);

  const receiptinputDS = newReceiptinputDatasource(
    returnreceiptinputitem,
    "returnrecjsonDs"
  );
  app.registerDatasource(receiptinputDS);
  items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  let selected = items.filter((i) => i.itemnum === "11453");
  sinon.stub(receiptinputDS, "load").returns(items);
  sinon.stub(receiptinputDS, "getSelectedItems").returns(selected);
  sinon.stub(receiptinputDS, "clearSelections");
  sinon.stub(receiptinputDS, "getItems").returns(items);

  app.device.isMaximoMobile = true;
  returnController.pageResumed(returnpage, app);

  returnpage.state.containerTabSelected = 0;
  returnController.saveReturn();
  selected[0].qtyrequested = 3;
  returnController.saveReturn();
});

it("Return page test saveReturn for Assets tab for web", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const returnpage = new Page({
    name: "returnpage",
    clearStack: false,
  });

  let returnController = new ReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(returnController);
  returnController.pageInitialized(returnpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  let items = JSON.parse(JSON.stringify(polistitem.member));
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  sinon.stub(dspolist, "load");
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);
  sinon.stub(dspolist, "invokeAction").returns(items[0]);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);
  items = JSON.parse(JSON.stringify(assetreturnitem.member));
  sinon.stub(assetreturnDs, "load").returns(items);
  sinon.stub(assetreturnDs, "getSelectedItems").returns(items);
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "getItems").returns(items);

  const returnreceiptinputDs = newReceiptinputDatasource(
    { member: [] },
    "returnrecjsonDs"
  );
  app.registerDatasource(returnreceiptinputDs);
  items = [];
  sinon.stub(returnreceiptinputDs, "getSelectedItems").returns(items);
  sinon.stub(returnreceiptinputDs, "clearSelections");
  sinon.stub(returnreceiptinputDs, "getItems").returns(items);

  app.device.isMaximoMobile = false;
  returnController.pageResumed(returnpage, app);
  returnpage.state.containerTabSelected = 1;
  returnController.saveReturn();
});

it("handleAssetSearch should call applyInMemoryFilter", async () => {
  // create the controller and verify that testTagGroupToggles
  // let clock = sinon.useFakeTimers();

  const controller = new ReturnPageController();
  const app = new Application();
  const page = new Page();

  const ds = newReturnDatasource(assetreturnitem, "assetreturnDs");

  let dsSpy = sinon.spy(ds, "applyInMemoryFilter");

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  page.datasources.assetreturnDs.add({
    itemnum: "P-896",
    description: "Rotary PD Pump, 100 GPM, Asceptic",
    href: "oslc/os/mxapipo/_MTA5OC8wL0JFREZPUkQ-/assetstoreturn/0",
    localref: "oslc/os/mxapipo/_MTA5OC8wL0JFREZPUkQ-/assetstoreturn/0",
  });

  controller.handleAssetSearch("test");

  expect(dsSpy.callCount).toBe(1);
});

it("filterAssets should always return true for respecting the conditions", async () => {
  const controller = new ReturnPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  expect(
    controller.filterAssets("test")({
      itemnum: "test0",
    })
  ).toBeTruthy();

  expect(
    controller.filterAssets("test")({
      tostoreloc: "test0",
    })
  ).toBeTruthy();

  expect(
    controller.filterAssets("test")({
      serialnum: "test0",
    })
  ).toBeTruthy();

  expect(
    controller.filterAssets("test")({
      itemnum: "test0",
    })
  ).toBeTruthy();
});

it("Return page test saveReturn for Assets tab for mobile", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const returnpage = new Page({
    name: "returnpage",
    clearStack: false,
  });

  let returnController = new ReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(returnController);
  returnController.pageInitialized(returnpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  let items = JSON.parse(JSON.stringify(polistitem.member));
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  sinon.stub(dspolist, "load");
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);
  sinon.stub(dspolist, "invokeAction").returns(items[0]);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);
  items = JSON.parse(JSON.stringify(assetreturnitem.member));
  sinon.stub(assetreturnDs, "load").returns(items);
  sinon.stub(assetreturnDs, "getSelectedItems").returns(items);
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "getItems").returns(items);

  const returnreceiptinputDs = newReceiptinputDatasource(
    { member: [] },
    "returnrecjsonDs"
  );
  app.registerDatasource(returnreceiptinputDs);
  items = [];
  sinon.stub(returnreceiptinputDs, "getSelectedItems").returns(items);
  sinon.stub(returnreceiptinputDs, "clearSelections");
  sinon.stub(returnreceiptinputDs, "getItems").returns(items);

  app.device.isMaximoMobile = true;
  returnController.pageResumed(returnpage, app);
  returnpage.state.containerTabSelected = 1;
  returnController.saveReturn();
});
