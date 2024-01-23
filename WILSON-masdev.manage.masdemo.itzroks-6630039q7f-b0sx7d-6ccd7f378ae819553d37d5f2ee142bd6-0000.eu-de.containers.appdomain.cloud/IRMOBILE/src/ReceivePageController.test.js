import receivePageController from "./ReceivePageController";
import matreceiptinputitem from "./test/matreceiptinput-json-data";

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

function newReceiptinputDatasource(
  data = matreceiptinputitem,
  name = "receivejsonDS"
) {
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

it("Receive page test goback", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const receivedetailpage = new Page({
    name: "receiveDetail",
    clearStack: false,
  });
  app.registerPage(receivedetailpage);
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });

  let receiveController = new receivePageController();
  receivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(receivepage);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");

  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);
  sinon.stub(mobileRotRecDs, "on");
  sinon.stub(mobileRotRecDs, "off");

  const copiedItem = JSON.parse(JSON.stringify(matreceiptinputitem));
  const recds = newReceiptinputDatasource(copiedItem, "receivejsonDS");
  app.registerDatasource(recds);
  const items = copiedItem.member;
  sinon.stub(recds, "getSelectedItems").returns(items);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(items);
  sinon.stub(recds, "load").returns(items);
  sinon.stub(recds, "setWarning");
  sinon.stub(recds, "clearWarnings");

  receivepage.registerController(receiveController);
  receiveController.pageInitialized(receivepage, app);

  receivepage.params.isfromdetail = true;
  receiveController.pageResumed(receivepage, app);
  receiveController.pagePaused(receivepage, app);

  receiveController.goBack();
  let args = { localref: "testref" };
  receiveController.gotoRecevieDetailPage(args);
  let data = {
    datasource: recds,
    field: "receiptquantity",
    item: items[0],
    newValue: "abc",
  };
  receiveController.onValueChanged(data);
  data.newValue = 100;
  receiveController.onValueChanged(data);
  data.newValue = 1;
  receiveController.onValueChanged(data);
});

it("Receive page test saveRecevie", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const receivedetailpage = new Page({
    name: "receiveDetail",
    clearStack: false,
  });
  app.registerPage(receivedetailpage);
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  let receiveController = new receivePageController();
  receivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(receivepage);

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

  const copiedItem = JSON.parse(JSON.stringify(matreceiptinputitem));
  const recds = newReceiptinputDatasource(copiedItem, "receivejsonDS");
  app.registerDatasource(recds);
  let selected = copiedItem.member.filter((i) => i.itemnum === "11453");
  sinon.stub(recds, "getSelectedItems").returns(selected);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon.stub(recds, "getWarnings").returns({
    receiptquantity: "abc",
  });

  receivepage.registerController(receiveController);
  receiveController.pageInitialized(receivepage, app);
  receivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(receivepage, app);
  selected[0].receiptquantity = 1;
  receiveController.saveRecevie();
});

it("Receive page test saveRecevie and validation", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const receivedetailpage = new Page({
    name: "receiveDetail",
    clearStack: false,
  });
  app.registerPage(receivedetailpage);
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  let receiveController = new receivePageController();
  receivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(receivepage);
  receiveController.pageInitialized(receivepage, app);

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

  const copiedItem = JSON.parse(JSON.stringify(matreceiptinputitem));
  const recds = newReceiptinputDatasource(copiedItem, "receivejsonDS");
  app.registerDatasource(recds);
  let selected = copiedItem.member.filter((i) => i.itemnum !== "11453");
  sinon.stub(recds, "getSelectedItems").returns(selected);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon.stub(recds, "getWarnings").returns({
    receiptquantity: "abc",
  });

  receivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(receivepage, app);
  receiveController.saveRecevie();
});

it("Receive page test saveRecevie empty quantity", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  let receiveController = new receivePageController();
  receivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(receivepage);

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

  const copiedItem = JSON.parse(JSON.stringify(matreceiptinputitem));
  const recds = newReceiptinputDatasource(copiedItem, "receivejsonDS");
  app.registerDatasource(recds);
  sinon.stub(recds, "getSelectedItems").returns(copiedItem.member);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);

  receiveController.pageInitialized(receivepage, app);
  receivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(receivepage, app);
  receiveController.saveRecevie();
});

it("Receive page test saveRecevie empty selected", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  let receiveController = new receivePageController();
  receivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(receivepage);

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

  const copiedItem = JSON.parse(JSON.stringify(matreceiptinputitem));
  const recds = newReceiptinputDatasource(copiedItem, "receivejsonDS");
  app.registerDatasource(recds);
  sinon.stub(recds, "getSelectedItems").returns([]);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns([]);
  sinon.stub(recds, "load").returns([]);

  receiveController.pageInitialized(receivepage, app);
  receivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(receivepage, app);
  receiveController.saveRecevie();
});

it("Receive page test saveRecevie on mobile device", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  let receiveController = new receivePageController();
  receivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(receivepage);

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

  const copiedItem = JSON.parse(JSON.stringify(matreceiptinputitem));
  const recds = newReceiptinputDatasource(copiedItem, "receivejsonDS");
  app.registerDatasource(recds);
  sinon.stub(recds, "getSelectedItems").returns(copiedItem.member);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);

  receiveController.pageInitialized(receivepage, app);
  receivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  app.device.isMaximoMobile = true;
  receiveController.pageResumed(receivepage, app);
  receiveController.saveRecevie();
});
