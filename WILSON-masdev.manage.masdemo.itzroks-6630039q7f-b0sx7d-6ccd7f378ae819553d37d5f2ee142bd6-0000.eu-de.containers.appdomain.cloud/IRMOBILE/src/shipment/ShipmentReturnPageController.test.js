import ShipmentReturnPageController from "./ShipmentReturnPageController";
import shipmentlistitem from "./test/shipment-list-json-data";
import shipmentlineitem from "./test/shipmentline-json-data";
import returnreceiptinputitem from "./test/shipmentreturnreceiptinput-json-data";
import returnreceiptinputrotatingitem from "./test/shipmentreturnreceiptinput-rotating-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newShipmentListDatasource(
  data = shipmentlistitem,
  name = "shipmentDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "shipmentnum",
    name: name,
  });

  return ds;
}

function newShipmentLineDatasource(
  data = shipmentlineitem,
  name = "shipmentlineDS"
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

function newReceiptinputDatasource(
  data = returnreceiptinputitem,
  name = "shipmentreturnrecjsonDS"
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

it("Return page test", async () => {
  let app = new Application();
  const shipmentactionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(shipmentactionpage);
  const shipmentreturnpage = new Page({
    name: "shipmentreturnpage",
    clearStack: false,
  });

  const shipmentDS = newShipmentListDatasource(shipmentlistitem, "shipmentDS");
  app.registerDatasource(shipmentDS);
  sinon.stub(shipmentDS, "load").returns([]);

  const shipmentreturnreceiptinputDS = newReceiptinputDatasource(
    { member: [] },
    "shipmentreturnrecjsonDS"
  );
  app.registerDatasource(shipmentreturnreceiptinputDS);

  const shipmentlineDS = newShipmentLineDatasource([], "shipmentlineitem");
  app.registerDatasource(shipmentlineDS);

  let shipmentreturnController = new ShipmentReturnPageController();
  await app.initialize();
  app.registerPage(shipmentreturnpage);
  shipmentreturnpage.registerController(shipmentreturnController);
  shipmentreturnController.pageInitialized(shipmentreturnpage, app);
  shipmentreturnController.pageResumed(shipmentreturnpage, app);

  shipmentreturnController.onAfterLoadData(shipmentreturnreceiptinputDS, []);
  shipmentreturnController.onAfterLoadData(shipmentlineDS, []);
  shipmentreturnController.onAfterLoadData(shipmentDS, []);

  shipmentreturnController.goBack();
});

it("Return page test saveReturn for web", async () => {
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

  let returnController = new ShipmentReturnPageController();
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

  const dspolist = newShipmentListDatasource(shipmentlistitem, "dspolist");
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  sinon.stub(dspolist, "load").returns(items);
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);

  const shipmentreturnrecjsonDS = newReceiptinputDatasource(
    { member: [] },
    "shipmentreturnrecjsonDS"
  );
  app.registerDatasource(shipmentreturnrecjsonDS);
  items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  sinon.stub(shipmentreturnrecjsonDS, "getSelectedItems").returns(items);
  sinon.stub(shipmentreturnrecjsonDS, "clearSelections");
  sinon.stub(shipmentreturnrecjsonDS, "getItems").returns(items);

  const shipmentDS = newShipmentListDatasource(shipmentlistitem, "shipmentDS");
  app.registerDatasource(shipmentDS);

  app.device.isMaximoMobile = false;
  returnController.pageResumed(returnpage, app);

  returnpage.state.containerTabSelected = 0;
  returnController.saveShipmentReturn();

  let data = {
    datasource: shipmentreturnrecjsonDS,
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

it("Return page test saveReturn rotating item validation", async () => {
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

  let returnController = new ShipmentReturnPageController();
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

  const dspolist = newShipmentListDatasource(shipmentlistitem, "dspolist");
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  sinon.stub(dspolist, "load").returns(items);
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);

  const shipmentreturnrecjsonDS = newReceiptinputDatasource(
    { member: [] },
    "shipmentreturnrecjsonDS"
  );
  app.registerDatasource(shipmentreturnrecjsonDS);
  items = JSON.parse(JSON.stringify(returnreceiptinputrotatingitem.member));
  sinon.stub(shipmentreturnrecjsonDS, "getSelectedItems").returns(items);
  sinon.stub(shipmentreturnrecjsonDS, "clearSelections");
  sinon.stub(shipmentreturnrecjsonDS, "getItems").returns(items);

  const shipmentDS = newShipmentListDatasource(shipmentlistitem, "shipmentDS");
  app.registerDatasource(shipmentDS);

  app.device.isMaximoMobile = false;
  returnController.pageResumed(returnpage, app);

  returnpage.state.containerTabSelected = 0;
  returnController.saveShipmentReturn();
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

  let returnController = new ShipmentReturnPageController();
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

  const dspolist = newShipmentListDatasource(shipmentlistitem, "dspolist");
  app.registerDatasource(dspolist);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  sinon.stub(dspolist, "load").returns(items);
  sinon.stub(dspolist, "getSelectedItems").returns(items);
  sinon.stub(dspolist, "clearSelections");
  sinon.stub(dspolist, "getItems").returns(items);

  const shipmentreturnrecjsonDS = newReceiptinputDatasource(
    { member: [] },
    "shipmentreturnrecjsonDS"
  );
  app.registerDatasource(shipmentreturnrecjsonDS);
  sinon.stub(shipmentreturnrecjsonDS, "getSelectedItems").returns([]);
  sinon.stub(shipmentreturnrecjsonDS, "clearSelections");
  sinon.stub(shipmentreturnrecjsonDS, "getItems").returns([]);

  const shipmentDS = newShipmentListDatasource(shipmentlistitem, "shipmentDS");
  app.registerDatasource(shipmentDS);

  app.device.isMaximoMobile = false;
  returnController.pageResumed(returnpage, app);

  returnpage.state.containerTabSelected = 0;
  returnController.saveShipmentReturn();
});

it("Return page test saveReturn for mobile", async () => {
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

  let shipmentReturnController = new ShipmentReturnPageController();
  await app.initialize();
  app.registerPage(returnpage);
  returnpage.registerController(shipmentReturnController);
  shipmentReturnController.pageInitialized(returnpage, app);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const shipmentDS = newShipmentListDatasource(shipmentlistitem, "shipmentDS");
  app.registerDatasource(shipmentDS);

  returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(shipmentDS, "load");
  let items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  sinon.stub(shipmentDS, "getSelectedItems").returns(items);
  sinon.stub(shipmentDS, "clearSelections");
  sinon.stub(shipmentDS, "getItems").returns(items);

  const shipmentreturnreceiptinputDS = newReceiptinputDatasource(
    { member: [] },
    "shipmentreturnrecjsonDS"
  );
  app.registerDatasource(shipmentreturnreceiptinputDS);
  items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  sinon.stub(shipmentreturnreceiptinputDS, "getSelectedItems").returns(items);
  sinon.stub(shipmentreturnreceiptinputDS, "clearSelections");
  sinon.stub(shipmentreturnreceiptinputDS, "getItems").returns(items);
  sinon.stub(shipmentreturnreceiptinputDS, "getWarnings").returns({
    receiptquantity: "abc",
  });
  items = JSON.parse(JSON.stringify(returnreceiptinputitem.member));
  let selected = items.filter((i) => i.itemnum === "11453");

  app.device.isMaximoMobile = true;
  shipmentReturnController.pageResumed(returnpage, app);

  shipmentReturnController.saveShipmentReturn();
  selected[0].qtyrequested = 3;
  shipmentReturnController.originalQty = { 1: 5, 2: "abc", 3: 0, 4: 4, 5: 1 };
  shipmentReturnController.saveShipmentReturn();
});
