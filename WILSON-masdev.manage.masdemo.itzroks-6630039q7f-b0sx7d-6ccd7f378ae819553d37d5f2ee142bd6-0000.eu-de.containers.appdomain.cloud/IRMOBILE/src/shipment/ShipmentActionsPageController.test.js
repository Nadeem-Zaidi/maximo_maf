import ShipmentActionsPageController from "./ShipmentActionsPageController";
import shipmentlistitem from "./test/shipment-list-json-data";
import shipmentlineitem from "./test/shipmentline-json-data";
import matreceiptinputitem from "./test/shipment-matrectrans-json-data";
import assetinputitem from "../test/assetinput-json-data";

import sinon from "sinon";

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

const MATCOUNT = "matcount";
const SHIPRECCOUNT = "shipreccount";
const actionData = [
  {
    _id: 0,
    label: "0",
    countShow: true,
    count: 0,
    tagfield: SHIPRECCOUNT,
    tagstring: 0,
  },
  {
    _id: 1,
    label: "1",
    countShow: true,
    count: 0,
    tagfield: MATCOUNT,
    tagstring: 0,
  },
];

function newDatasource(data = {}, name = "shipmentactionListDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "items",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "_id",
    name: name,
  });

  return ds;
}

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

function newMatrectransDatasource(
  data = matreceiptinputitem,
  name = "shipmentMatrectransDS"
) {
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
function newShipmentReceiveDatasource(
  data = [],
  name = "shipmentreceivejsonDS"
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
function newShipmentInspectjsonDatasource(
  data = matreceiptinputitem,
  name = "shipmentinspectjsonDS"
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
function newShipmentAssetinputDatasource(
  data = assetinputitem,
  name = "shipmentassetinputDS"
) {
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
function newShipmentReturnjsonDatasource(
  data = matreceiptinputitem,
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
function newShipmentVoidrecjsonDatasource(
  data = [],
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
function newShipmentReceiptjsonDatasource(
  data = [],
  name = "shipmentreceiptjsonDs"
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
it("Action page loads in mobile", async () => {
  let app = new Application();
  const shipmentrecactionspage = new Page({
    name: "recactions",
    params: { href: "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let actionsPageController = new ShipmentActionsPageController();
  app.registerController(actionsPageController);
  const dsshipmentlist = newShipmentListDatasource(
    shipmentlistitem,
    "shipmentDS"
  );
  app.registerDatasource(dsshipmentlist);

  dsshipmentlist.childrenToLoad = [{ name: "abc" }];

  const assetinputDs = newShipmentAssetinputDatasource(
    assetinputitem,
    "shipmentassetinputDS"
  );
  app.registerDatasource(assetinputDs);
  const matreceiptDS = newMatrectransDatasource(
    matreceiptinputitem,
    "shipmentMatrectransDS"
  );
  app.registerDatasource(matreceiptDS);
  const shipmentlineDs = newShipmentLineDatasource(
    shipmentlineitem,
    "shipmentlineDS"
  );
  app.registerDatasource(shipmentlineDs);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);

  await app.initialize();
  app.registerPage(shipmentrecactionspage);
  shipmentrecactionspage.registerController(actionsPageController);
  actionsPageController.pageInitialized(shipmentrecactionspage, app);

  shipmentrecactionspage.state.matcount = 0;
  shipmentrecactionspage.state.shipreccount = 0;
  shipmentrecactionspage.state.assetcount = 0;

  const actionListDS = newDatasource(
    { items: actionData },
    "shipmentactionListDS"
  );

  shipmentrecactionspage.registerDatasource(actionListDS);
  await actionListDS.load();
  expect(actionListDS.getItems().length).toEqual(2);

  const actionListDS2 = newDatasource(
    { items: actionData },
    "shipmentactionListDS2"
  );

  shipmentrecactionspage.registerDatasource(actionListDS2);
  await actionListDS2.load();
  expect(actionListDS2.getItems().length).toEqual(2);

  shipmentrecactionspage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  app.device.isMaximoMobile = true;
  actionsPageController.pageResumed(shipmentrecactionspage, app);

  shipmentrecactionspage.state.matcount = 1;
  shipmentrecactionspage.state.shipreccount = 1;
  let event = {
    tagfield: "shipreccount",
  };
  // actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "matcount",
  };
  // actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "returncount",
  };
  // actionsPageController.gotoDetailActionPage(event);

  actionsPageController.goBack();
});

it("Action page loads in browser", async () => {
  let app = new Application();
  const shipmentrecactionspage = new Page({
    name: "recactions",
    params: { href: "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let actionsPageController = new ShipmentActionsPageController();
  app.registerController(actionsPageController);
  const shipmentlineDs = newShipmentLineDatasource(
    shipmentlineitem,
    "shipmentlineDS"
  );
  app.registerDatasource(shipmentlineDs);

  sinon.stub(shipmentlineDs, "load");
  sinon.stub(shipmentlineDs, "getItems").returns(shipmentlineitem.member);

  const matreceiptDS = newMatrectransDatasource(
    matreceiptinputitem,
    "shipmentMatrectransDS"
  );
  app.registerDatasource(matreceiptDS);
  const receivejsonDS = newShipmentReceiveDatasource(
    [],
    "shipmentreceivejsonDS"
  );
  app.registerDatasource(receivejsonDS);

  const inspectjsonDS = newShipmentInspectjsonDatasource(
    matreceiptinputitem,
    "shipmentinspectjsonDS"
  );
  app.registerDatasource(inspectjsonDS);

  const inspectassetjsonDS = newShipmentInspectjsonDatasource(
    matreceiptinputitem,
    "shipmentinspectassetjsonDS"
  );
  app.registerDatasource(inspectassetjsonDS);

  const assetinputDs = newShipmentAssetinputDatasource(
    assetinputitem,
    "shipmentassetinputDS"
  );
  app.registerDatasource(assetinputDs);
  const returnjsonDS = newShipmentReturnjsonDatasource(
    matreceiptinputitem,
    "shipmentreturnrecjsonDS"
  );
  app.registerDatasource(returnjsonDS);

  const voidjsonDS = newShipmentVoidrecjsonDatasource(
    [],
    "shipmentvoidrecjsonDS"
  );
  app.registerDatasource(voidjsonDS);

  const receiptjsonDS = newShipmentReceiptjsonDatasource(
    [],
    "shipmentreceiptjsonDs"
  );
  app.registerDatasource(receiptjsonDS);

  const dsshipmentlist = newShipmentListDatasource(
    shipmentlistitem,
    "shipmentDS"
  );
  app.registerDatasource(dsshipmentlist);
  dsshipmentlist.childrenToLoad = [voidjsonDS];
  await app.initialize();
  app.registerPage(shipmentrecactionspage);
  shipmentrecactionspage.registerController(actionsPageController);
  actionsPageController.pageInitialized(shipmentrecactionspage, app);

  shipmentrecactionspage.state.matcount = 0;
  shipmentrecactionspage.state.shipreccount = 0;

  const actionListDS = newDatasource(
    { items: actionData },
    "shipmentactionListDS"
  );
  shipmentrecactionspage.registerDatasource(actionListDS);
  await actionListDS.load();
  expect(actionListDS.getItems().length).toEqual(2);
  const actionListDS2 = newDatasource(
    { items: actionData },
    "shipmentactionListDS2"
  );
  shipmentrecactionspage.registerDatasource(actionListDS2);

  await actionListDS2.load();
  expect(actionListDS2.getItems().length).toEqual(2);

  shipmentrecactionspage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  app.device.isMaximoMobile = false;
  actionsPageController.pageResumed(shipmentrecactionspage, app);

  shipmentrecactionspage.state.matcount = 1;
  shipmentrecactionspage.state.shipreccount = 1;
  sinon.stub(receivejsonDS, "load");
  sinon.stub(receivejsonDS, "clearSelections");
  sinon.stub(receivejsonDS, "clearState");
  sinon.stub(inspectjsonDS, "load");
  sinon.stub(inspectjsonDS, "clearSelections");
  sinon.stub(inspectjsonDS, "clearState");
  sinon.stub(inspectassetjsonDS, "load");
  sinon.stub(inspectassetjsonDS, "clearSelections");
  sinon.stub(inspectassetjsonDS, "clearState");
  sinon.stub(returnjsonDS, "load");
  sinon.stub(returnjsonDS, "clearSelections");
  sinon.stub(returnjsonDS, "clearState");
  sinon.stub(voidjsonDS, "load");
  sinon.stub(voidjsonDS, "clearSelections");
  sinon.stub(voidjsonDS, "clearState");
  sinon.stub(assetinputDs, "load");
  sinon.stub(assetinputDs, "clearSelections");
  sinon.stub(assetinputDs, "clearState");
  sinon.stub(receiptjsonDS, "load");
  sinon.stub(receiptjsonDS, "clearSelections");
  sinon.stub(receiptjsonDS, "clearState");

  actionsPageController.onAfterLoadData(shipmentlineDs, []);
  actionsPageController.onAfterLoadData(matreceiptDS, []);
  actionsPageController.onAfterLoadData(dsshipmentlist, []);
  actionsPageController.onAfterLoadData(assetinputDs, []);

  let event = {
    tagfield: "shipreccount",
  };
  actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "matcount",
  };
  event = {
    tagfield: "shipreturncount",
  };
  actionsPageController.goBack();
});
