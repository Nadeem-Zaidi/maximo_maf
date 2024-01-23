import inspectPageController from "./InspectPageController";
import matrectransitem from "./test/matreceiptinput-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

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

function newMobileRotRecDatasource(data = [], name = "mobileRotReceipts") {
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

function newMatrectransDatasource(
  data = matrectransitem,
  name = "matrectransjsonDS"
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

it("Inspect page resume test", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });

  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const inspectdetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectdetailpage);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  const matrectransDs = newMatrectransDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(matrectransDs);
  const items = JSON.parse(JSON.stringify(matrectransitem.member));

  sinon.stub(matrectransDs, "load").returns(items);
  sinon.stub(matrectransDs, "getSelectedItems").returns(items);
  sinon.stub(matrectransDs, "getItems").returns(items);
  sinon.stub(matrectransDs, "clearSelections");

  let inspectController = new inspectPageController();
  await app.initialize();
  app.registerPage(inspectpage);
  inspectpage.registerController(inspectController);
  inspectController.pageInitialized(inspectpage, app);
  inspectController.pageResumed(inspectpage, app);
  inspectController.goBack();
  inspectController.pagePaused(inspectpage, app);
  let args = { href: items[0].href };
  inspectController.gotoInspectDetailPage(args);
});

it("Inspect page test saveInspect", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const inspectdetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectdetailpage);

  let inspectController = new inspectPageController();
  await app.initialize();
  app.registerPage(inspectpage);
  inspectpage.registerController(inspectController);
  inspectController.pageInitialized(inspectpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  let matrectransDs = newMatrectransDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(matrectransDs);
  const items = JSON.parse(JSON.stringify(matrectransitem.member));
  let selected = items.filter((i) => i.itemnum === "PUMP100");

  inspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(matrectransDs, "load").returns(items);
  sinon.stub(matrectransDs, "getSelectedItems").returns(selected);
  sinon.stub(matrectransDs, "getItems").returns(items);
  sinon.stub(matrectransDs, "clearSelections");

  inspectController.pageResumed(inspectpage, app);

  inspectController.gotresponse = true;

  app.device.isMaximoMobile = true;
  await inspectController.saveInspect();

  selected[0].receiptquantity = 1;
  app.device.isMaximoMobile = false;
  await inspectController.saveInspect();
});

it("Inspect page test saveInspect and validation", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const inspectdetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectdetailpage);

  let inspectController = new inspectPageController();
  await app.initialize();
  app.registerPage(inspectpage);
  inspectpage.registerController(inspectController);
  inspectController.pageInitialized(inspectpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  let matrectransDs = newMatrectransDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(matrectransDs);
  const items = JSON.parse(JSON.stringify(matrectransitem.member));
  let selected = items.filter((i) => i.itemnum !== "PUMP100");

  inspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(matrectransDs, "load").returns(items);
  sinon.stub(matrectransDs, "getSelectedItems").returns(selected);
  sinon.stub(matrectransDs, "getItems").returns(items);
  sinon.stub(matrectransDs, "clearSelections");
  sinon.stub(matrectransDs, "getWarnings").returns({
    receiptquantity: "abc",
  });

  inspectController.pageResumed(inspectpage, app);

  inspectController.gotresponse = true;

  app.device.isMaximoMobile = true;
  await inspectController.saveInspect();

  selected[0].receiptquantity = 1;
  app.device.isMaximoMobile = false;
  await inspectController.saveInspect();
});

it("Inspect page test saveInspect2", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const inspectdetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectdetailpage);

  let inspectController = new inspectPageController();
  await app.initialize();
  app.registerPage(inspectpage);
  inspectpage.registerController(inspectController);
  inspectController.pageInitialized(inspectpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns(null);
  sinon.stub(mobileRecDs, "put").returns(null);
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  let matrectransDs = newMatrectransDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(matrectransDs);
  const items = JSON.parse(JSON.stringify(matrectransitem.member));

  inspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(matrectransDs, "load").returns(items);
  sinon.stub(matrectransDs, "getSelectedItems").returns(items);
  sinon.stub(matrectransDs, "clearSelections");
  sinon.stub(matrectransDs, "setWarning");
  sinon.stub(matrectransDs, "clearWarnings");

  inspectController.pageResumed(inspectpage, app);

  inspectController.gotresponse = true;

  app.device.isMaximoMobile = true;
  await inspectController.saveInspect();
  let data = {
    datasource: matrectransDs,
    field: "acceptedqty",
    item: items[0],
    newValue: "abc",
  };
  inspectController.onValueChanged(data);
  data.newValue = 0;
  inspectController.onValueChanged(data);
  data.newValue = 1;
  inspectController.onValueChanged(data);
  data.newValue = 1;
  data.item = {
    ...items[0],
    receiptquantity: "abc",
  };
  inspectController.onValueChanged(data);
  data.newValue = 1;
  data.field = "rejectqty";
  inspectController.onValueChanged(data);
  inspectController.checkInputValues({ item: items[1], field: "acceptedqty" });
  inspectController.checkInputValues({ item: items[2], field: "acceptedqty" });

  app.device.isMaximoMobile = false;
  await inspectController.saveInspect();
});

it("Inspect page test saveInspect3", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const inspectdetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectdetailpage);

  let inspectController = new inspectPageController();
  await app.initialize();
  app.registerPage(inspectpage);
  inspectpage.registerController(inspectController);
  inspectController.pageInitialized(inspectpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns(null);
  sinon.stub(mobileRecDs, "put").returns(null);
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  let matrectransDs = newMatrectransDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(matrectransDs);
  const items = JSON.parse(JSON.stringify(matrectransitem.member));

  inspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(matrectransDs, "load").returns([]);
  sinon.stub(matrectransDs, "getSelectedItems").returns([]);
  sinon.stub(matrectransDs, "clearSelections");
  sinon.stub(matrectransDs, "setWarning");
  sinon.stub(matrectransDs, "clearWarnings");

  inspectController.pageResumed(inspectpage, app);

  inspectController.gotresponse = true;

  app.device.isMaximoMobile = true;
  await inspectController.saveInspect();
  let data = {
    datasource: matrectransDs,
    field: "acceptedqty",
    item: items[0],
    newValue: "abc",
  };
  inspectController.onValueChanged(data);
  inspectController.checkInputValues({ item: items[1], field: "acceptedqty" });

  app.device.isMaximoMobile = false;
  await inspectController.saveInspect();
});

it("Inspect page test datasource load", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const inspectdetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectdetailpage);

  let inspectController = new inspectPageController();

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  const matrectransDs = newMatrectransDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  sinon.stub(matrectransDs, "load").returns([]);
  sinon.stub(matrectransDs, "getSelectedItems").returns([]);
  sinon.stub(matrectransDs, "getItems").returns([]);
  sinon.stub(matrectransDs, "clearSelections");
  app.registerDatasource(matrectransDs);

  await app.initialize();
  app.registerPage(inspectpage);
  inspectpage.registerController(inspectController);
  inspectController.pageInitialized(inspectpage, app);

  inspectController.pageResumed(inspectpage, app);
});
