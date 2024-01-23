/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ShipmentInspectPageController from "./ShipmentInspectPageController";
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
  name = "shipmentinspectjsonDS"
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

it("Inspect page test saveShipmentInspect", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentinspectpage = new Page({
    name: "shipmentinspectpage",
    params: { href: "oslc/os/mxapishipment/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let inspectController = new ShipmentInspectPageController();
  shipmentinspectpage.registerController(inspectController);
  await app.initialize();
  app.registerPage(shipmentinspectpage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentinspectjsonDS");
  const assetrecds = newReceiptinputDatasource(
    copiedItem,
    "shipmentinspectassetjsonDS"
  );
  app.registerDatasource(recds);
  app.registerDatasource(assetrecds);
  let selected = copiedItem.member.filter((i) => i.itemnum === "11453");
  sinon.stub(recds, "getSelectedItems").returns(selected);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon.stub(recds, "getWarnings").returns({
    receiptquantity: "abc",
  });
  sinon.stub(assetrecds, "getSelectedItems").returns(selected);
  sinon.stub(assetrecds, "clearSelections");
  sinon.stub(assetrecds, "getItems").returns(copiedItem.member);
  sinon.stub(assetrecds, "load").returns(copiedItem.member);
  sinon.stub(assetrecds, "getWarnings").returns({
    receiptquantity: "abc",
  });

  sinon.stub(shipmentinspectpage, "showDialog");

  inspectController.pageInitialized(shipmentinspectpage, app);
  shipmentinspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  inspectController.pageResumed(shipmentinspectpage, app);
  selected[0].rejectqty = 1;
  selected[0].acceptedqty = 1;
  selected[0].rejectcode = "abc";
  inspectController.saveInspect();

  inspectController.pagePaused(shipmentinspectpage, app);
});

it("Inspect page test save and validation", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentinspectpage = new Page({
    name: "shipmeninspectpage",
    clearStack: false,
  });
  let inspectController = new ShipmentInspectPageController();
  shipmentinspectpage.registerController(inspectController);
  await app.initialize();
  app.registerPage(shipmentinspectpage);
  inspectController.pageInitialized(shipmentinspectpage, app);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentinspectjsonDS");
  const assetrecds = newReceiptinputDatasource(
    copiedItem,
    "shipmentinspectassetjsonDS"
  );
  app.registerDatasource(recds);
  app.registerDatasource(assetrecds);
  let selected = copiedItem.member.filter((i) => i.itemnum !== "11453");
  sinon.stub(recds, "getSelectedItems").returns(selected);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);
  sinon.stub(recds, "getWarnings").returns({
    receiptquantity: "abc",
  });
  sinon.stub(assetrecds, "getSelectedItems").returns(selected);
  sinon.stub(assetrecds, "clearSelections");
  sinon.stub(assetrecds, "getItems").returns(copiedItem.member);
  sinon.stub(assetrecds, "load").returns(copiedItem.member);
  sinon.stub(assetrecds, "getWarnings").returns({
    receiptquantity: "abc",
  });

  shipmentinspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  inspectController.pageResumed(shipmentinspectpage, app);
  inspectController.originalQty = { 1: 5, 2: "abc", 3: 0, 4: 4, 5: 1 };
  inspectController.setAccept(selected, { id: "abc-accept" });
  inspectController.setAccept(selected, { id: "abc-reject" });
  inspectController.saveInspect();
  sinon.stub(shipmentinspectpage, "showDialog");
  inspectController.showDetails({ type: "materials", item: selected });
  inspectController.showDetails({ type: "assets", item: selected });
  inspectController.changeContainerTab(1);
  inspectController.computedRotItemDisplay(selected);
  inspectController.saveInspect();
});

it("Inspect page test save empty selected", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentinspectpage = new Page({
    name: "shipmentinspectpage",
    clearStack: false,
  });
  let inspectController = new ShipmentInspectPageController();
  shipmentinspectpage.registerController(inspectController);
  await app.initialize();
  app.registerPage(shipmentinspectpage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentinspectjsonDS");
  const assetrecds = newReceiptinputDatasource(
    copiedItem,
    "shipmentinspectassetjsonDS"
  );
  app.registerDatasource(recds);
  app.registerDatasource(assetrecds);
  sinon.stub(recds, "getSelectedItems").returns([]);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);

  sinon.stub(assetrecds, "getSelectedItems").returns([]);
  sinon.stub(assetrecds, "clearSelections");
  sinon.stub(assetrecds, "getItems").returns(copiedItem.member);
  sinon.stub(assetrecds, "load").returns(copiedItem.member);

  sinon.stub(shipmentinspectpage, "closeAllDialogs");

  inspectController.pageInitialized(shipmentinspectpage, app);
  shipmentinspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  shipmentinspectpage.state.currentItem = { rejectcode: "abc" };
  inspectController.goBack();
  inspectController.pageResumed(shipmentinspectpage, app);
  inspectController.saveInspect();
  inspectController.onAfterLoadData(recds, matreceiptinputitem.member);
  inspectController.onAfterLoadData(assetrecds, matreceiptinputitem.member);
  inspectController.onDetailDone();
});

it("Inspect page test save on mobile device", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const shipmentinspectpage = new Page({
    name: "shipmentinspectpage",
    clearStack: false,
  });
  let inspectController = new ShipmentInspectPageController();
  shipmentinspectpage.registerController(inspectController);
  await app.initialize();
  app.registerPage(shipmentinspectpage);

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
  const recds = newReceiptinputDatasource(copiedItem, "shipmentinspectjsonDS");
  const assetrecds = newReceiptinputDatasource(
    copiedItem,
    "shipmentinspectassetjsonDS"
  );
  app.registerDatasource(recds);
  app.registerDatasource(assetrecds);

  sinon.stub(recds, "getSelectedItems").returns(copiedItem.member);
  sinon.stub(recds, "clearSelections");
  sinon.stub(recds, "getItems").returns(copiedItem.member);
  sinon.stub(recds, "load").returns(copiedItem.member);

  sinon.stub(assetrecds, "getSelectedItems").returns([]);
  sinon.stub(assetrecds, "clearSelections");
  sinon.stub(assetrecds, "getItems").returns(copiedItem.member);
  sinon.stub(assetrecds, "load").returns(copiedItem.member);

  inspectController.pageInitialized(shipmentinspectpage, app);
  shipmentinspectpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  app.device.isMaximoMobile = true;
  inspectController.pageResumed(shipmentinspectpage, app);
  inspectController.saveInspect();

  inspectController.onAfterLoadData(recds, []);

  let data = {
    datasource: recds,
    field: "acceptedqty",
    item: copiedItem.member[0],
    newValue: "5",
  };
  inspectController.onValueChanged(data);
  data.newValue = -1;
  inspectController.onValueChanged(data);
  data.newValue = 10;
  inspectController.onValueChanged(data);
  data.newValue = 0;
  inspectController.onValueChanged(data);
  copiedItem.member[0].inspectedqtydsply = 0;
  inspectController.onValueChanged(data);
  copiedItem.member[0].receiptquantity = "abc";
  inspectController.onValueChanged(data);
});
