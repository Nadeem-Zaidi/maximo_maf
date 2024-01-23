/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ShipmentReceivePageController from "./ShipmentReceivePageController";
import matreceiptinputitem from "./test/shipment-matrecinput-json-data.js";

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
  name = "shipmentreceivejsonDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "shipmentlineid",
    name: name,
  });

  return ds;
}

it("Receive page test saveShipmentReceive", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentreceivepage = new Page({
    name: "shipmentreceivepage",
    params: { href: "oslc/os/mxapishipment/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let receiveController = new ShipmentReceivePageController();
  shipmentreceivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(shipmentreceivepage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentreceivejsonDS");
  app.registerDatasource(recds);
  let selected = copiedItem.member.filter((i) => i.itemnum === "11453");
  sinon.stub(recds, "getSelectedItems").returns(selected);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon.stub(recds, "getWarnings").returns({
    receiptquantity: "abc",
  });

  sinon
    .stub(shipmentreceivepage, "findDialog")
    .returns({ closeDialog: sinon.stub() });

  shipmentreceivepage.registerController(receiveController);
  receiveController.pageInitialized(shipmentreceivepage, app);
  shipmentreceivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(shipmentreceivepage, app);
  selected[0].receiptquantity = 1;
  receiveController.getSelectedItemsAndSaveShipmentReceive();

  let data = {
    datasource: recds,
    field: "receiptquantity",
    item: copiedItem.member[0],
    newValue: "abc",
  };
  receiveController.onValueChanged(data);
  data.newValue = 1000;
  receiveController.onValueChanged(data);
  data.newValue = 1;
  receiveController.onValueChanged(data);
});

it("Save item detail action test", async () => {
  let app = new Application();
  const shipmentreceivepage = new Page({
    name: "shipmentreceivepage",
    params: { href: "oslc/os/mxapishipment/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let receiveController = new ShipmentReceivePageController();
  shipmentreceivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(shipmentreceivepage);
  receiveController.pageInitialized(shipmentreceivepage, app);

  sinon
    .stub(shipmentreceivepage, "findDialog")
    .returns({ closeDialog: sinon.stub() });

  const item = [
    {
      receiptquantity: 5,
      receiptquantity_old: 5,
    },
  ];
  receiveController.onDrawerClose(item);
  receiveController.saveInputValue(item);
  item[0].receiptquantity = 1000;
  receiveController.saveInputValue(item);
  item[0].receiptquantity = 0;
  receiveController.saveInputValue(item);
  receiveController.onDrawerClose(item);
});

it("Receive page test saveShipmentReceive and validation", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentreceivepage = new Page({
    name: "shipmentreceivepage",
    clearStack: false,
  });
  let receiveController = new ShipmentReceivePageController();
  shipmentreceivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(shipmentreceivepage);
  receiveController.pageInitialized(shipmentreceivepage, app);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentreceivejsonDS");
  app.registerDatasource(recds);
  let selected = copiedItem.member.filter((i) => i.itemnum !== "11453");
  sinon.stub(recds, "getSelectedItems").returns(selected);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon.stub(recds, "getWarnings").returns({
    receiptquantity: "abc",
  });

  sinon
    .stub(shipmentreceivepage, "findDialog")
    .returns({ closeDialog: sinon.stub() });

  shipmentreceivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(shipmentreceivepage, app);
  receiveController.originalQty = { 1: 5, 2: "abc", 3: 0, 4: 4, 5: 1 };
  receiveController.getSelectedItemsAndSaveShipmentReceive();
  receiveController.updateRemainingItems(selected);
  sinon.stub(shipmentreceivepage, "showDialog");
  receiveController.openShipReceiveItemDetails();
});

it("Receive page test saveShipmentReceive empty quantity", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentreceivepage = new Page({
    name: "shipmentreceivepage",
    clearStack: false,
  });
  let receiveController = new ShipmentReceivePageController();
  shipmentreceivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(shipmentreceivepage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentreceivejsonDS");
  app.registerDatasource(recds);
  sinon.stub(recds, "getSelectedItems").returns(copiedItem.member);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon
    .stub(shipmentreceivepage, "findDialog")
    .returns({ closeDialog: sinon.stub() });

  receiveController.pageInitialized(shipmentreceivepage, app);
  shipmentreceivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(shipmentreceivepage, app);
  receiveController.getSelectedItemsAndSaveShipmentReceive();
});

it("Receive page test saveShipmentReceive empty selected", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentreceivepage = new Page({
    name: "shipmentreceivepage",
    clearStack: false,
  });
  let receiveController = new ShipmentReceivePageController();
  shipmentreceivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(shipmentreceivepage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentreceivejsonDS");
  app.registerDatasource(recds);
  sinon.stub(recds, "getSelectedItems").returns([]);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns([]);
  sinon.stub(recds, "load").returns([]);
  sinon
    .stub(shipmentreceivepage, "findDialog")
    .returns({ closeDialog: sinon.stub() });

  receiveController.pageInitialized(shipmentreceivepage, app);
  shipmentreceivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  receiveController.pageResumed(shipmentreceivepage, app);
  receiveController.getSelectedItemsAndSaveShipmentReceive();
});

it("Receive page test saveShipmentReceive on mobile device", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentreceivepage = new Page({
    name: "shipmentreceivepage",
    clearStack: false,
  });
  let receiveController = new ShipmentReceivePageController();
  shipmentreceivepage.registerController(receiveController);
  await app.initialize();
  app.registerPage(shipmentreceivepage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentreceivejsonDS");
  app.registerDatasource(recds);
  sinon.stub(recds, "getSelectedItems").returns(copiedItem.member);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon
    .stub(shipmentreceivepage, "findDialog")
    .returns({ closeDialog: sinon.stub() });

  receiveController.pageInitialized(shipmentreceivepage, app);
  shipmentreceivepage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  app.device.isMaximoMobile = true;
  receiveController.pageResumed(shipmentreceivepage, app);
  receiveController.getSelectedItemsAndSaveShipmentReceive();
});

it("select receiving action", async () => {
  const spPage = new Page({
    name: "shipment",
    params: { href: "oslc/os/mxapishipment/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentReceivePageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  await app.initialize();
  expect(spController.page).toBeTruthy();
  spController.pageInitialized(spController, app);
});

it("Shipment Receive page test goback", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);

  const receivepage = new Page({
    name: "shipmentreceivepage",
    clearStack: false,
  });

  let receiveController = new ShipmentReceivePageController();
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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentreceivejsonDS");
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
});
