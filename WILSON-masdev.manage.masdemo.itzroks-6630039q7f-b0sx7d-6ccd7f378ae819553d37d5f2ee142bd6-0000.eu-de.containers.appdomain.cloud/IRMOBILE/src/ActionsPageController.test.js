import ActionsPageController from "./ActionsPageController";
import polistitem from "./test/po-list-json-data";
import polineitem from "./test/poline-json-data";
import assetinputitem from "./test/assetinput-json-data";
import assetreturnitem from "./test/assetreturn-json-data";
import matrectransitem from "./test/matreceiptinput-json-data";
import returnreceiptinputitem from "./test/returnreceiptinput-json-data";
import sinon from "sinon";

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

const MATCOUNT = "matcount";
const RECCOUNT = "reccount";
const actionData = [
  {
    _id: 0,
    label: "0",
    countShow: false,
    count: 0,
    tagfield: RECCOUNT,
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

function newDatasource(data = {}, name = "actionListDS") {
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

function newMatrecjsonDatasource(
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

function newReceiveDatasource(data = [], name = "receivejsonDS") {
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

function newVoidrecjsonDatasource(data = [], name = "voidrecjsonDs") {
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

function newReceiptjsonDatasource(data = [], name = "receiptjsonDs") {
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

function newPOLineDatasource(data = polineitem, name = "dspolistPoline") {
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

it("Action page loads in mobile", async () => {
  let app = new Application();
  const recactionspage = new Page({
    name: "recactions",
    params: { href: "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let actionsPageController = new ActionsPageController();
  app.registerController(actionsPageController);
  await app.initialize();
  app.registerPage(recactionspage);
  recactionspage.registerController(actionsPageController);
  actionsPageController.pageInitialized(recactionspage, app);

  recactionspage.state.matcount = 0;
  recactionspage.state.reccount = 0;
  recactionspage.state.assetcount = 0;

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  const polineDs = newPOLineDatasource(polineitem, "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);

  const receivejsonDS = newReceiveDatasource([], "receivejsonDS");
  app.registerDatasource(receivejsonDS);
  const inspectjsonDS = newMatrecjsonDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(inspectjsonDS);
  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);

  const returnjsonDS = newReceiptinputDatasource(
    returnreceiptinputitem,
    "returnrecjsonDs"
  );
  app.registerDatasource(returnjsonDS);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);

  const voidjsonDS = newVoidrecjsonDatasource([], "voidrecjsonDs");
  app.registerDatasource(voidjsonDS);
  const receiptjsonDS = newReceiptjsonDatasource([], "receiptjsonDs");
  app.registerDatasource(receiptjsonDS);

  const actionListDS = newDatasource({ items: actionData }, "actionListDS");
  recactionspage.registerDatasource(actionListDS);
  await actionListDS.load();
  expect(actionListDS.getItems().length).toEqual(2);

  const actionListDS2 = newDatasource({ items: actionData }, "actionListDS2");
  recactionspage.registerDatasource(actionListDS2);
  await actionListDS2.load();
  expect(actionListDS2.getItems().length).toEqual(2);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);

  recactionspage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(dspolist, "load");
  sinon.stub(polineDs, "load");
  sinon.stub(polineDs, "getItems").returns(polineitem.member);
  sinon.stub(matrectransDs, "load");

  sinon.stub(receivejsonDS, "load");
  sinon.stub(receivejsonDS, "clearSelections");
  sinon.stub(receivejsonDS, "clearState");
  sinon.stub(inspectjsonDS, "load");
  sinon.stub(inspectjsonDS, "clearSelections");
  sinon.stub(inspectjsonDS, "clearState");
  sinon.stub(assetinputDs, "load");
  sinon.stub(assetinputDs, "clearSelections");
  sinon.stub(assetinputDs, "clearState");
  sinon.stub(returnjsonDS, "load");
  sinon.stub(returnjsonDS, "clearSelections");
  sinon.stub(returnjsonDS, "clearState");
  sinon.stub(assetreturnDs, "load");
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "clearState");
  sinon.stub(voidjsonDS, "load");
  sinon.stub(voidjsonDS, "clearSelections");
  sinon.stub(voidjsonDS, "clearState");
  sinon.stub(receiptjsonDS, "load");
  sinon.stub(receiptjsonDS, "clearSelections");
  sinon.stub(receiptjsonDS, "clearState");

  sinon.stub(actionListDS, "load");
  sinon.stub(actionListDS, "getItems").returns(actionData);
  sinon.stub(actionListDS2, "load");
  sinon.stub(actionListDS2, "getItems").returns(actionData);
  sinon.stub(mobileRecDs, "load");
  sinon.stub(mobileRotRecDs, "load");

  app.device.isMaximoMobile = true;
  actionsPageController.pageResumed(recactionspage, app);

  recactionspage.state.matcount = 1;
  recactionspage.state.reccount = 1;
  let event = {
    tagfield: "reccount",
  };
  actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "matcount",
  };
  actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "returncount",
  };
  actionsPageController.gotoDetailActionPage(event);

  actionsPageController.onAfterLoadData(dspolist, []);
  actionsPageController.onAfterLoadData(polineDs, []);
  actionsPageController.onAfterLoadData(matrectransDs, []);
  actionsPageController.onAfterLoadData(assetinputDs, []);
  actionsPageController.onAfterLoadData(assetreturnDs, []);

  actionsPageController.goBack();
});

it("Action page loads in browser", async () => {
  let app = new Application();
  const recactionspage = new Page({
    name: "recactions",
    params: { href: "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-" },
    clearStack: false,
  });
  let actionsPageController = new ActionsPageController();
  app.registerController(actionsPageController);
  await app.initialize();
  app.registerPage(recactionspage);
  recactionspage.registerController(actionsPageController);
  actionsPageController.pageInitialized(recactionspage, app);

  recactionspage.state.matcount = 0;
  recactionspage.state.reccount = 0;
  recactionspage.state.assetcount = 0;

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  const polineDs = newPOLineDatasource(polineitem, "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);

  const receivejsonDS = newReceiveDatasource([], "receivejsonDS");
  app.registerDatasource(receivejsonDS);
  const inspectjsonDS = newMatrecjsonDatasource(
    matrectransitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(inspectjsonDS);
  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);

  const returnjsonDS = newReceiptinputDatasource(
    returnreceiptinputitem,
    "returnrecjsonDs"
  );
  app.registerDatasource(returnjsonDS);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);

  const voidjsonDS = newVoidrecjsonDatasource([], "voidrecjsonDs");
  app.registerDatasource(voidjsonDS);
  const receiptjsonDS = newReceiptjsonDatasource([], "receiptjsonDs");
  app.registerDatasource(receiptjsonDS);

  const actionListDS = newDatasource({ items: actionData }, "actionListDS");
  recactionspage.registerDatasource(actionListDS);
  await actionListDS.load();
  expect(actionListDS.getItems().length).toEqual(2);

  const actionListDS2 = newDatasource({ items: actionData }, "actionListDS2");
  recactionspage.registerDatasource(actionListDS2);
  await actionListDS2.load();
  expect(actionListDS2.getItems().length).toEqual(2);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);

  recactionspage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  sinon.stub(dspolist, "load");
  sinon.stub(polineDs, "load");
  sinon.stub(polineDs, "getItems").returns(polineitem.member);
  sinon.stub(matrectransDs, "load");

  sinon.stub(receivejsonDS, "load");
  sinon.stub(receivejsonDS, "clearSelections");
  sinon.stub(receivejsonDS, "clearState");
  sinon.stub(inspectjsonDS, "load");
  sinon.stub(inspectjsonDS, "clearSelections");
  sinon.stub(inspectjsonDS, "clearState");
  sinon.stub(assetinputDs, "load");
  sinon.stub(assetinputDs, "clearSelections");
  sinon.stub(assetinputDs, "clearState");
  sinon.stub(returnjsonDS, "load");
  sinon.stub(returnjsonDS, "clearSelections");
  sinon.stub(returnjsonDS, "clearState");
  sinon.stub(assetreturnDs, "load");
  sinon.stub(assetreturnDs, "clearSelections");
  sinon.stub(assetreturnDs, "clearState");
  sinon.stub(voidjsonDS, "load");
  sinon.stub(voidjsonDS, "clearSelections");
  sinon.stub(voidjsonDS, "clearState");
  sinon.stub(receiptjsonDS, "load");
  sinon.stub(receiptjsonDS, "clearSelections");
  sinon.stub(receiptjsonDS, "clearState");

  sinon.stub(actionListDS, "load");
  sinon.stub(actionListDS, "getItems").returns(actionData);
  sinon.stub(actionListDS2, "load");
  sinon.stub(actionListDS2, "getItems").returns(actionData);
  sinon.stub(mobileRecDs, "load");
  sinon.stub(mobileRotRecDs, "load");

  app.device.isMaximoMobile = false;
  actionsPageController.pageResumed(recactionspage, app);

  recactionspage.state.matcount = 1;
  recactionspage.state.reccount = 1;
  let event = {
    tagfield: "reccount",
  };
  actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "matcount",
  };
  actionsPageController.gotoDetailActionPage(event);
  event = {
    tagfield: "returncount",
  };
  actionsPageController.gotoDetailActionPage(event);

  actionsPageController.onAfterLoadData(dspolist, []);
  actionsPageController.onAfterLoadData(polineDs, []);
  actionsPageController.onAfterLoadData(matrectransDs, []);
  actionsPageController.onAfterLoadData(assetinputDs, []);
  actionsPageController.onAfterLoadData(assetreturnDs, []);

  actionsPageController.goBack();
});
