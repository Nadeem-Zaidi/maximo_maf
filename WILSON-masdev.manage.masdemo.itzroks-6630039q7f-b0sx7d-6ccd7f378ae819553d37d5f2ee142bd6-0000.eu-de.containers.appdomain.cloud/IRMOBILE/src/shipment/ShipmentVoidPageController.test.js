import shipmentVoidPageController from "./ShipmentVoidPageController";
import voidreceiptinputitem from "./test/shipmentreturnreceiptinput-json-data";

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

function newVoidReceiptInputDatasource(
  data = voidreceiptinputitem,
  name = "shipmentvoidrecjsonDS"
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

it("Void page test", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const voidpage = new Page({
    name: "voidpage",
    clearStack: false,
  });

  let shipVoidController = new shipmentVoidPageController();
  app.registerController(shipmentVoidPageController);
  await app.initialize();
  app.registerPage(voidpage);
  voidpage.registerController(shipVoidController);
  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");
  const voidreceiptinputDs = newVoidReceiptInputDatasource(
    voidreceiptinputitem,
    "shipmentvoidrecjsonDS"
  );
  app.registerDatasource(voidreceiptinputDs);
  sinon.stub(voidreceiptinputDs, "load").returns(voidreceiptinputitem.member);
  sinon
    .stub(voidreceiptinputDs, "getSelectedItems")
    .returns(voidreceiptinputitem.member);
  sinon.stub(voidreceiptinputDs, "clearSelections");
  sinon
    .stub(voidreceiptinputDs, "getItems")
    .returns(voidreceiptinputitem.member);
  shipVoidController.pageInitialized(voidpage, app);

  app.device.isMaximoMobile = true;
  voidpage.params.shipmentlinenum = "1234";
  voidpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  shipVoidController.pageResumed(voidpage, app);
  shipVoidController.pagePaused(voidpage, app);
  shipVoidController.goBack();
  app.device.isMaximoMobile = false;
  shipVoidController.pageResumed(voidpage, app);
  shipVoidController.pagePaused(voidpage, app);
  shipVoidController.goBack();
  shipVoidController.openShipVoidReceiveItemDetails(
    voidreceiptinputitem.member[0]
  );
  shipVoidController.openShipVoidReceiveItemDetails(
    voidreceiptinputitem.member[1]
  );
});

it("Void page test getSelectedItemsAndSaveShipmentVoid", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const voidpage = new Page({
    name: "shipmentvoidpage",
    clearStack: false,
  });

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns(null);
  sinon.stub(mobileRecDs, "put").returns(null);
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const voidreceiptinputDs = newVoidReceiptInputDatasource(
    voidreceiptinputitem,
    "shipmentvoidrecjsonDS"
  );
  app.registerDatasource(voidreceiptinputDs);
  sinon.stub(voidreceiptinputDs, "load").returns(voidreceiptinputitem.member);
  sinon
    .stub(voidreceiptinputDs, "getSelectedItems")
    .returns(voidreceiptinputitem.member);
  sinon.stub(voidreceiptinputDs, "clearSelections");
  sinon
    .stub(voidreceiptinputDs, "getItems")
    .returns(voidreceiptinputitem.member);
  sinon.stub(voidpage, "findDialog").returns({ closeDialog: sinon.stub() });

  let shipVoidController = new shipmentVoidPageController();
  await app.initialize();
  voidpage.params.shipmentlinenum = "1234";
  voidpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  app.registerPage(voidpage);
  voidpage.registerController(shipVoidController);
  shipVoidController.pageInitialized(voidpage, app);
  shipVoidController.pageResumed(voidpage, app);
  voidpage.state.detailsargs = voidreceiptinputitem.member[0];
  app.device.isMaximoMobile = false;
  shipVoidController.closeItemDetail();
  shipVoidController.saveItemDetail();
  shipVoidController.getSelectedItemsAndSaveShipmentVoid();
});

it("Void page test getSelectedItemsAndSaveShipmentVoid2", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const voidpage = new Page({
    name: "voidpage",
    clearStack: false,
  });

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const voidreceiptinputDs = newVoidReceiptInputDatasource(
    voidreceiptinputitem,
    "shipmentvoidrecjsonDS"
  );
  app.registerDatasource(voidreceiptinputDs);
  sinon.stub(voidreceiptinputDs, "load").returns(voidreceiptinputitem.member);
  const normalData = voidreceiptinputitem.member.filter(
    (item) => item.qtyrequested > 0
  );
  sinon.stub(voidreceiptinputDs, "getSelectedItems").returns(normalData);
  sinon.stub(voidreceiptinputDs, "clearSelections");
  sinon
    .stub(voidreceiptinputDs, "getItems")
    .returns(voidreceiptinputitem.member);

  let shipVoidController = new shipmentVoidPageController();
  await app.initialize();
  voidpage.params.shipmentlinenum = "1234";
  voidpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  app.registerPage(voidpage);
  voidpage.registerController(shipVoidController);
  shipVoidController.pageInitialized(voidpage, app);
  shipVoidController.pageResumed(voidpage, app);

  app.device.isMaximoMobile = true;
  shipVoidController.getSelectedItemsAndSaveShipmentVoid();
});
