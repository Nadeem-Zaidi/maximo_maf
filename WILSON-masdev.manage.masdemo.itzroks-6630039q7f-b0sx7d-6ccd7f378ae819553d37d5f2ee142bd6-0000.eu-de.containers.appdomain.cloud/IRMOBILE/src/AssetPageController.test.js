import assetPageController from "./AssetPageController";
import polistitem from "./test/po-list-json-data";
import assetinputitem from "./test/assetinput-json-data";
import assetreturnitem from "./test/assetreturn-json-data";

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

function newAssetreturnDatasource(
  data = assetreturnitem,
  name = "assetreturnDs"
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

it("Asset page test", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const assetpage = new Page({
    name: "assetpage",
    clearStack: false,
  });
  sinon.stub(assetpage, "updatePageLoadingState");
  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);
  const poItems = JSON.parse(JSON.stringify(polistitem.member));
  const assetItems = JSON.parse(JSON.stringify(assetinputitem.member));
  sinon.stub(dspolist, "load").returns(poItems);
  sinon.stub(dspolist, "getItems").returns(poItems);
  sinon.stub(assetinputDs, "load").returns(assetItems);
  sinon.stub(assetinputDs, "getItems").returns(assetItems);

  let assetController = new assetPageController();
  await app.initialize();
  app.registerPage(assetpage);
  assetpage.registerController(assetController);
  assetController.pageInitialized(assetpage, app);
  assetController.pageResumed(assetpage, app);
  assetController.goBack();
});

it("Asset page test createAsset", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const assetpage = new Page({
    name: "assetpage",
    clearStack: false,
  });
  let assetController = new assetPageController();
  await app.initialize();
  app.registerPage(assetpage);
  assetpage.registerController(assetController);
  sinon.stub(assetpage, "updatePageLoadingState");
  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);

  const poItems = JSON.parse(JSON.stringify(polistitem.member));
  const assetItems = JSON.parse(JSON.stringify(assetinputitem.member));

  sinon.stub(dspolist, "load").returns(poItems);
  sinon.stub(dspolist, "getItems").returns(poItems);
  sinon.stub(dspolist, "invokeAction").returns({});
  sinon.stub(assetinputDs, "load").returns(assetItems);
  sinon.stub(assetinputDs, "getItems").returns(assetItems);
  sinon.stub(assetinputDs, "hasWarnings").returns(false);

  assetController.pageInitialized(assetpage, app);
  assetController.pageResumed(assetpage, app);
  assetController.onBeforeLoadData(dspolist);

  assetpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  await assetController.createAsset();
  assetController.validateInput(assetItems[1]);
  assetController.validateInput(assetItems[2]);
});

it("Asset page test createAsset2", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const assetpage = new Page({
    name: "assetpage",
    clearStack: false,
  });
  let assetController = new assetPageController();
  await app.initialize();
  app.registerPage(assetpage);
  assetpage.registerController(assetController);
  sinon.stub(assetpage, "updatePageLoadingState");
  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);
  const assetreturnDs = newAssetreturnDatasource(
    assetreturnitem,
    "assetreturnDs"
  );
  app.registerDatasource(assetreturnDs);
  const polineDs = newPOLineDatasource([], "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);

  const poItems = JSON.parse(JSON.stringify(polistitem.member));
  sinon.stub(dspolist, "load").returns(poItems);
  sinon.stub(dspolist, "getItems").returns(poItems);
  sinon.stub(dspolist, "invokeAction").returns({});
  sinon.stub(assetinputDs, "load").returns([]);
  sinon.stub(assetinputDs, "getItems").returns([]);

  assetController.pageInitialized(assetpage, app);
  assetController.pageResumed(assetpage, app);
  assetController.onBeforeLoadData(dspolist);

  assetpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";

  await assetController.createAsset();

  assetController.onAfterLoadData(dspolist, []);
  assetController.onAfterLoadData(assetinputDs, []);
  assetController.onAfterLoadData(assetreturnDs, []);
  assetController.onAfterLoadData(polineDs, []);
  assetController.onAfterLoadData(matrectransDs, []);
});
