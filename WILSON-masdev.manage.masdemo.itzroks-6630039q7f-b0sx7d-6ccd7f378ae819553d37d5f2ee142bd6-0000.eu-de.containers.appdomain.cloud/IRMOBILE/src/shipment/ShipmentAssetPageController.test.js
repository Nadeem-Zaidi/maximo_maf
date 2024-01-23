import shipment_AssetPageController from "./ShipmentAssetPageController";
import shipment_listitem from "./test/shipment-list-json-data";
import shipment_assetinputitem from "./test/shipment-assetinput-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newShipmentListDatasource(
  data = shipment_listitem,
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

function newAssetinputDatasource(
  data = shipment_assetinputitem,
  name = "shipmentassetinputDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "href",
    name: name,
  });

  return ds;
}

function newMatrectransDatasource(data = [], name = "shipmentMatrectransDS") {
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

function newShipmentLineDatasource(data = [], name = "shipmentlineDS") {
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

it("Shipment Asset page test", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const assetpage = new Page({
    name: "shipmentassetpage",
    clearStack: false,
  });
  sinon.stub(assetpage, "updatePageLoadingState");
  const shipmentDS = newShipmentListDatasource(shipment_listitem, "shipmentDS");
  app.registerDatasource(shipmentDS);
  const shipmentLineDS = newShipmentLineDatasource(
    shipment_listitem,
    "shipmentlineDS"
  );
  app.registerDatasource(shipmentLineDS);
  const matrectransDs = newMatrectransDatasource([], "shipmentMatrectransDS");
  app.registerDatasource(matrectransDs);
  const assetinputDs = newAssetinputDatasource(
    shipment_assetinputitem,
    "shipmentassetinputDS"
  );
  app.registerDatasource(assetinputDs);
  const shipmentItems = JSON.parse(JSON.stringify(shipment_listitem.member));
  const assetItems = JSON.parse(JSON.stringify(shipment_assetinputitem.member));
  sinon.stub(shipmentDS, "load").returns(shipmentItems);
  sinon.stub(shipmentDS, "getItems").returns(shipmentItems);
  sinon.stub(assetinputDs, "load").returns(assetItems);
  sinon.stub(assetinputDs, "getItems").returns(assetItems);

  let assetController = new shipment_AssetPageController();
  await app.initialize();
  app.registerPage(assetpage);
  assetpage.registerController(assetController);
  assetController.pageInitialized(assetpage, app);
  assetController.pageResumed(assetpage, app);
  assetController.goBack();
});

it("Shipment Asset page test createAsset", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "shipmentactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const assetpage = new Page({
    name: "shipmentassetpage",
    clearStack: false,
  });
  let assetController = new shipment_AssetPageController();
  await app.initialize();
  app.registerPage(assetpage);
  assetpage.registerController(assetController);
  sinon.stub(assetpage, "updatePageLoadingState");
  const shipmentDS = newShipmentListDatasource(shipment_listitem, "shipmentDS");
  app.registerDatasource(shipmentDS);
  const shipmentLineDS = newShipmentLineDatasource(
    shipment_listitem,
    "shipmentlineDS"
  );
  app.registerDatasource(shipmentLineDS);
  const assetinputDs = newAssetinputDatasource(
    shipment_assetinputitem,
    "shipmentassetinputDS"
  );
  app.registerDatasource(assetinputDs);
  const matrectransDs = newMatrectransDatasource([], "shipmentMatrectransDS");
  app.registerDatasource(matrectransDs);

  const shipmentItems = JSON.parse(JSON.stringify(shipment_listitem.member));
  const assetItems = JSON.parse(JSON.stringify(shipment_assetinputitem.member));

  sinon.stub(shipmentDS, "load").returns(shipmentItems);
  sinon.stub(shipmentDS, "getItems").returns(shipmentItems);
  sinon
    .stub(shipmentDS, "invokeAction")
    .returns(shipment_assetinputitem.member);
  sinon.stub(assetinputDs, "load").returns(assetItems);
  sinon.stub(assetinputDs, "getItems").returns(assetItems);

  assetController.pageInitialized(assetpage, app);
  assetController.pageResumed(assetpage, app);
  assetController.onBeforeLoadData(shipmentDS);

  assetController.onAfterLoadData(shipmentDS, []);
  assetController.onAfterLoadData(assetinputDs, []);
  assetController.onAfterLoadData(shipmentLineDS, []);
  assetController.onAfterLoadData(matrectransDs, []);

  assetpage.params.href = "oslc/os/mxapishipment/_QkVERk9SRC9SLTEwMTc-";

  await assetController.createAsset();
});
