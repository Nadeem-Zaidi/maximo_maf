import poListPageController from "./POListPageController";
import polistitem from "./test/po-list-json-data";
import polineitem from "./test/poline-json-data";
import assetinputitem from "./test/assetinput-json-data";
import assetreturnitem from "./test/assetreturn-json-data";

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

import sinon from "sinon";

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

it("PO List page loads empty", async () => {
  let app = new Application();
  const polistpage = new Page({
    name: "polist",
    clearStack: false,
  });

  let poListController = new poListPageController();
  await app.initialize();
  app.registerPage(polistpage);
  polistpage.registerController(poListController);

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  const polineDs = newPOLineDatasource(polineitem, "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);

  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);

  sinon.stub(mobileRecDs, "load");
  sinon.stub(mobileRotRecDs, "load");
  sinon.stub(dspolist, "load").returns([]);
  sinon.stub(dspolist, "getItems").returns([]);
  sinon.stub(polineDs, "load").returns([]);
  sinon.stub(polineDs, "getItems").returns([]);
  sinon.stub(poListController, "getDatasourceCopy").returns(dspolist);
  poListController.pageInitialized(polistpage, app);
  app.device.isMaximoMobile = false;
  app.client = {
    userInfo: {
      personid: "SAM",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: () => {
        return "CENTRAL";
      },
    },
  };
  poListController.pageResumed(polistpage, app);
});

it("PO List page loads in browser", async () => {
  let app = new Application();
  const polistpage = new Page({
    name: "polist",
    clearStack: false,
  });

  let poListController = new poListPageController();
  await app.initialize();
  app.registerPage(polistpage);
  polistpage.registerController(poListController);

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  let items = JSON.parse(JSON.stringify(polistitem.member));
  const polineDs = newPOLineDatasource(polineitem, "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);

  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);

  sinon.stub(mobileRecDs, "load");
  sinon.stub(mobileRotRecDs, "load");
  sinon.stub(dspolist, "load").returns(items);
  sinon.stub(dspolist, "getItems").returns(items);
  const polineItems = JSON.parse(JSON.stringify(polineitem.member));
  sinon.stub(polineDs, "load").returns(polineItems);
  sinon.stub(polineDs, "getItems").returns(polineItems);
  sinon.stub(poListController, "getDatasourceCopy").returns(dspolist);

  poListController.pageInitialized(polistpage, app);
  let event = {
    ponum: 1234,
  };
  app.device.isMaximoMobile = false;
  app.client = {
    userInfo: {
      personid: "SAM",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "" });
        });
      },
      login: function () {
        return new Promise((resolve) => {
          resolve(new Response("{status:0}", { status: 201 }));
        });
      },
      logout: function () {
        return new Promise((resolve) => {
          resolve(new Response("{status:0}", { status: 201 }));
        });
      },
    },
  };
  poListController.pageResumed(polistpage, app);
  poListController.showReceivingActions(event);
  event = {
    type: "rececount",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  event = {
    type: "inspectcount",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  event = {
    type: "returncount",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);

  poListController.onBeforeLoadData(dspolist);
  poListController.onAfterLoadData(dspolist, []);
  polineDs.dependsOn = dspolist;
  polineDs.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  poListController.onAfterLoadData(polineDs, []);
  poListController.onAfterLoadData(matrectransDs, []);
  poListController.onAfterLoadData(assetinputDs, []);
  poListController.onAfterLoadData(assetreturnDs, []);
});

it("PO List page loads in mobile", async () => {
  let app = new Application();
  const polistpage = new Page({
    name: "polist",
    clearStack: false,
  });

  let poListController = new poListPageController();
  await app.initialize();
  app.registerPage(polistpage);
  polistpage.registerController(poListController);

  const dspolist = newPOListDatasource(polistitem, "dspolist");
  app.registerDatasource(dspolist);
  let items = JSON.parse(JSON.stringify(polistitem.member));
  const polineDs = newPOLineDatasource(polineitem, "dspolistPoline");
  app.registerDatasource(polineDs);
  const matrectransDs = newMatrectransDatasource([], "dspolistMatrectrans");
  app.registerDatasource(matrectransDs);

  const assetinputDs = newAssetinputDatasource(assetinputitem, "assetinputDs");
  app.registerDatasource(assetinputDs);
  const assetreturnDs = newReturnDatasource(assetreturnitem, "assetreturnDs");
  app.registerDatasource(assetreturnDs);

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  const mobileRotRecDs = newMobileRotRecDatasource([], "mobileRotReceipts");
  app.registerDatasource(mobileRotRecDs);

  const receiptjsonDS = newReceiptjsonDatasource([], "receiptjsonDs");
  app.registerDatasource(receiptjsonDS);

  sinon.stub(mobileRecDs, "load");
  sinon.stub(mobileRotRecDs, "load");
  sinon.stub(dspolist, "load").returns(items);
  sinon.stub(dspolist, "getItems").returns(items);
  const polineItems = JSON.parse(JSON.stringify(polineitem.member));
  sinon.stub(polineDs, "load").returns(polineItems);
  sinon.stub(polineDs, "getItems").returns(polineItems);

  poListController.pageInitialized(polistpage, app);
  let event = {
    ponum: 1234,
  };
  app.device.isMaximoMobile = true;
  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "CENTRAL" });
        });
      },
      login: function () {
        return new Promise((resolve) => {
          resolve(new Response("{status:0}", { status: 201 }));
        });
      },
      logout: function () {
        return new Promise((resolve) => {
          resolve(new Response("{status:0}", { status: 201 }));
        });
      },
    },
  };
  poListController.pageResumed(polistpage, app);

  poListController.showReceivingActions(event);
  event = {
    type: "inspectCountNum",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  event = {
    type: "receiveCountNum",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  event = {
    type: "assetCountNum",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  event = {
    type: "returnCountNum",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  poListController.dataCache = {
    receiptpage: {},
  };
  poListController.dataCache.receiptpage[items[0].href] = [];
  event = {
    type: "receiptCountNum",
    item: items[0],
  };
  poListController.gotoDetailActionPage(event);
  poListController.getDatasourceCopy();
  poListController.computedCounts(items[0], "12345");
  poListController.goBack();
});
