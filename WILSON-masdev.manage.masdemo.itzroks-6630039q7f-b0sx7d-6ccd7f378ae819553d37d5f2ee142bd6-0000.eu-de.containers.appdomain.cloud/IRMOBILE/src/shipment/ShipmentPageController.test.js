/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ShipmentPageController from "./ShipmentPageController";
import shipmentlistitem from "./test/shipment-list-json-data";
import shipmentlineitem from "./test/shipmentline-json-data";
import shipmentmatrectransitem from "./test/shipment-matrectrans-json-data";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

import sinon from "sinon";

function newDatasource(data = [], name = "defaultDS", idattr = "_id") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: idattr,
    name: name,
  });

  return ds;
}

it("shipment list page with default storeroom", async () => {
  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentPageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const dsshipmentlist = newDatasource(
    shipmentlistitem,
    "shipmentDS",
    "shipmentnum"
  );
  dsshipmentlist.options = {};
  const shipmentlineds = newDatasource(
    { item: [] },
    "shipmentlineDS",
    "shipmentlineid"
  );
  shipmentlineds.options = {};
  const shipmentMatrectransDS = newDatasource(
    { item: [] },
    "shipmentMatrectransDS",
    "matrectransid"
  );
  shipmentMatrectransDS.options = {};
  const shipmentassetinputDS = newDatasource(
    { item: [] },
    "shipmentassetinputDS",
    "localref"
  );
  shipmentassetinputDS.options = {};
  app.registerDatasource(dsshipmentlist);
  app.registerDatasource(shipmentlineds);
  app.registerDatasource(shipmentMatrectransDS);
  app.registerDatasource(shipmentassetinputDS);
  dsshipmentlist.childrenToLoad = [shipmentlineds];
  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
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
  await app.initialize();
  spController.pageInitialized(spPage, app);
  spController.pageResumed(spPage, app);

  let event = {
    shipmentnum: 1234,
  };
  spController.showShipmentActions(event);

  spController.goBack();
});

it("shipment list page without default storeroom", async () => {
  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentPageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const dsshipmentlist = newDatasource(
    shipmentlistitem,
    "shipmentDS",
    "shipmentnum"
  );
  dsshipmentlist.options = {};
  const shipmentlineds = newDatasource(
    { item: [] },
    "shipmentlineDS",
    "shipmentlineid"
  );
  shipmentlineds.options = {};
  const shipmentMatrectransDS = newDatasource(
    { item: [] },
    "shipmentMatrectransDS",
    "matrectransid"
  );
  shipmentMatrectransDS.options = {};
  const shipmentassetinputDS = newDatasource(
    { item: [] },
    "shipmentassetinputDS",
    "localref"
  );
  shipmentassetinputDS.options = {};
  app.registerDatasource(dsshipmentlist);
  app.registerDatasource(shipmentlineds);
  app.registerDatasource(shipmentMatrectransDS);
  app.registerDatasource(shipmentassetinputDS);
  dsshipmentlist.childrenToLoad = [shipmentlineds];

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
  await app.initialize();

  spController.pageInitialized(spPage, app);
  spController.pageResumed(spPage, app);

  let event = {
    shipmentnum: 1234,
  };
  spController.showShipmentActions(event);

  spController.goBack();
});

it("shipment list page goto detail", async () => {
  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentPageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const dsshipmentlist = newDatasource(
    shipmentlistitem,
    "shipmentDS",
    "shipmentnum"
  );
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  dsshipmentlist.options = {};
  const shipmentlineds = newDatasource([], "shipmentlineDS", "shipmentlineid");
  shipmentlineds.options = {};
  const shipmentMatrectransDS = newDatasource(
    [],
    "shipmentMatrectransDS",
    "matrectransid"
  );
  shipmentMatrectransDS.options = {};
  const shipmentassetinputDS = newDatasource(
    [],
    "shipmentassetinputDS",
    "localref"
  );
  shipmentassetinputDS.options = {};
  app.registerDatasource(dsshipmentlist);
  app.registerDatasource(shipmentlineds);
  app.registerDatasource(shipmentMatrectransDS);
  app.registerDatasource(shipmentassetinputDS);
  dsshipmentlist.childrenToLoad = [shipmentlineds];

  const mobileRecDs = newDatasource([], "mobileReceipts", "_id");
  app.registerDatasource(mobileRecDs);

  const shiprecds = newDatasource(
    [],
    "shipmentreceivejsonDS",
    "shipmentlineid"
  );
  app.registerDatasource(shiprecds);
  const shipinpds = newDatasource([], "shipmentinspectjsonDS", "_id");
  app.registerDatasource(shipinpds);
  const shipinpassetds = newDatasource([], "shipmentinspectassetjsonDS", "_id");
  app.registerDatasource(shipinpassetds);
  const shipreturnds = newDatasource([], "shipmentreturnrecjsonDS", "_id");
  app.registerDatasource(shipreturnds);
  const shipvoidds = newDatasource([], "shipmentvoidrecjsonDS", "_id");
  app.registerDatasource(shipvoidds);

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
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
  await app.initialize();
  spController.pageInitialized(spPage, app);
  spController.pageResumed(spPage, app);

  let event = {
    shipmentnum: 1234,
  };
  spController.showShipmentActions(event);

  spController.goBack();

  event = {
    type: "inspectCountNum",
    item: items[0],
  };
  spController.dataCache = {
    shipmentinspectpage: [{}],
  };
  spController.dataCache.shipmentinspectpage[0][items[0].href] = [];
  spController.gotoDetailActionPage(event);

  spController.onBeforeLoadData(dsshipmentlist);
  spController.onAfterLoadData(dsshipmentlist, []);
  shipmentlineds.dependsOn = dsshipmentlist;
  shipmentlineds.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  shipmentMatrectransDS.dependsOn = dsshipmentlist;
  shipmentMatrectransDS.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  shipmentassetinputDS.dependsOn = dsshipmentlist;
  shipmentassetinputDS.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  spController.onAfterLoadData(shipmentlineds, []);
  spController.onAfterLoadData(shipmentMatrectransDS, []);
  spController.onAfterLoadData(shipmentassetinputDS, []);
  spController.pageResumed(spPage, app);
});

it("shipment list page fake datasource copy", async () => {
  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentPageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const dsshipmentlist = newDatasource(
    shipmentlistitem,
    "shipmentDS",
    "shipmentnum"
  );
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  dsshipmentlist.options = {};
  const shipmentlineds = newDatasource([], "shipmentlineDS", "shipmentlineid");
  shipmentlineds.options = {};
  const shipmentMatrectransDS = newDatasource(
    [],
    "shipmentMatrectransDS",
    "matrectransid"
  );
  shipmentMatrectransDS.options = {};
  const shipmentassetinputDS = newDatasource(
    [],
    "shipmentassetinputDS",
    "localref"
  );
  shipmentassetinputDS.options = {};
  app.registerDatasource(dsshipmentlist);
  app.registerDatasource(shipmentlineds);
  app.registerDatasource(shipmentMatrectransDS);
  app.registerDatasource(shipmentassetinputDS);
  dsshipmentlist.childrenToLoad = [shipmentlineds];

  const mobileRecDs = newDatasource([], "mobileReceipts", "_id");
  app.registerDatasource(mobileRecDs);

  const shiprecds = newDatasource(
    [],
    "shipmentreceivejsonDS",
    "shipmentlineid"
  );
  app.registerDatasource(shiprecds);
  const shipinpds = newDatasource([], "shipmentinspectjsonDS", "_id");
  app.registerDatasource(shipinpds);
  const shipinpassetds = newDatasource([], "shipmentinspectassetjsonDS", "_id");
  app.registerDatasource(shipinpassetds);
  const shipreturnds = newDatasource([], "shipmentreturnrecjsonDS", "_id");
  app.registerDatasource(shipreturnds);
  const shipvoidds = newDatasource([], "shipmentvoidrecjsonDS", "_id");
  app.registerDatasource(shipvoidds);

  sinon.stub(mobileRecDs, "load");
  sinon.stub(dsshipmentlist, "load").returns(items);
  sinon.stub(dsshipmentlist, "getItems").returns(items);
  const shiplineItems = JSON.parse(JSON.stringify(shipmentlineitem.member));
  sinon.stub(shipmentlineds, "load").returns(shiplineItems);
  sinon.stub(shipmentlineds, "getItems").returns(shiplineItems);
  sinon.stub(shipmentassetinputDS, "load").returns([]);
  sinon.stub(shipmentassetinputDS, "getItems").returns([]);
  const shipmatrectransitems = JSON.parse(
    JSON.stringify(shipmentmatrectransitem.member)
  );
  sinon.stub(shipmentMatrectransDS, "load").returns(shipmatrectransitems);
  sinon.stub(shipmentMatrectransDS, "getItems").returns(shipmatrectransitems);
  sinon.stub(shipinpds, "load").returns([]);
  sinon.stub(shipinpassetds, "load").returns([]);
  sinon.stub(shiprecds, "load").returns([]);
  sinon.stub(shipreturnds, "load").returns([]);
  sinon.stub(shipvoidds, "load").returns([]);
  sinon.stub(spController, "getDatasourceCopy").callsFake((...args) => {
    if (args[0].includes("shipmentline")) {
      return shipmentlineds;
    } else if (args[0].includes("shipmentmatrectrans")) {
      return shipmentMatrectransDS;
    } else if (args[0].includes("shipmentassetinput")) {
      return shipmentassetinputDS;
    }
    return dsshipmentlist;
  });

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
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
  await app.initialize();
  spController.pageInitialized(spPage, app);
  spController.pageResumed(spPage, app);

  let event = {
    shipmentnum: 1234,
  };
  spController.showShipmentActions(event);

  spController.goBack();

  event = {
    type: "inspectCountNum",
    item: items[0],
  };
  spController.dataCache = {
    shipmentinspectpage: [{}],
  };
  spController.dataCache.shipmentinspectpage[0][items[0].href] = [];
  spController.gotoDetailActionPage(event);

  spController.onBeforeLoadData(dsshipmentlist);
  spController.onAfterLoadData(dsshipmentlist, []);
  shipmentlineds.dependsOn = dsshipmentlist;
  shipmentlineds.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  shipmentMatrectransDS.dependsOn = dsshipmentlist;
  shipmentMatrectransDS.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  shipmentassetinputDS.dependsOn = dsshipmentlist;
  shipmentassetinputDS.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  spController.onAfterLoadData(shipmentlineds, []);
  spController.onAfterLoadData(shipmentMatrectransDS, []);
  spController.onAfterLoadData(shipmentassetinputDS, []);
  spController.pageResumed(spPage, app);
});

it("shipment list page in mobile", async () => {
  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentPageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const dsshipmentlist = newDatasource(
    shipmentlistitem,
    "shipmentDS",
    "shipmentnum"
  );
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  dsshipmentlist.options = {};
  const shipmentlineds = newDatasource([], "shipmentlineDS", "shipmentlineid");
  shipmentlineds.options = {};
  const shipmentMatrectransDS = newDatasource(
    [],
    "shipmentMatrectransDS",
    "matrectransid"
  );
  shipmentMatrectransDS.options = {};
  const shipmentassetinputDS = newDatasource(
    [],
    "shipmentassetinputDS",
    "localref"
  );
  shipmentassetinputDS.options = {};
  app.registerDatasource(dsshipmentlist);
  app.registerDatasource(shipmentlineds);
  app.registerDatasource(shipmentMatrectransDS);
  app.registerDatasource(shipmentassetinputDS);
  dsshipmentlist.childrenToLoad = [shipmentlineds];

  const mobileRecDs = newDatasource([], "mobileReceipts", "_id");
  app.registerDatasource(mobileRecDs);

  const shiprecds = newDatasource(
    [],
    "shipmentreceivejsonDS",
    "shipmentlineid"
  );
  app.registerDatasource(shiprecds);
  const shipinpds = newDatasource([], "shipmentinspectjsonDS", "_id");
  app.registerDatasource(shipinpds);
  const shipinpassetds = newDatasource([], "shipmentinspectassetjsonDS", "_id");
  app.registerDatasource(shipinpassetds);
  const shipreturnds = newDatasource([], "shipmentreturnrecjsonDS", "_id");
  app.registerDatasource(shipreturnds);
  const shipvoidds = newDatasource([], "shipmentvoidrecjsonDS", "_id");
  app.registerDatasource(shipvoidds);

  sinon.stub(mobileRecDs, "load");
  sinon.stub(dsshipmentlist, "load").returns(items);
  sinon.stub(dsshipmentlist, "getItems").returns(items);
  const shiplineItems = JSON.parse(JSON.stringify(shipmentlineitem.member));
  sinon.stub(shipmentlineds, "load").returns(shiplineItems);
  sinon.stub(shipmentlineds, "getItems").returns(shiplineItems);
  sinon.stub(shipmentassetinputDS, "load").returns([]);
  sinon.stub(shipmentassetinputDS, "getItems").returns([]);
  sinon.stub(shipmentMatrectransDS, "load").returns([]);
  sinon.stub(shipmentMatrectransDS, "getItems").returns([]);
  sinon.stub(shipinpds, "load").returns([]);
  sinon.stub(shipinpassetds, "load").returns([]);
  sinon.stub(shiprecds, "load").returns([]);
  sinon.stub(shipreturnds, "load").returns([]);
  sinon.stub(shipvoidds, "load").returns([]);

  app.device.isMaximoMobile = true;
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
  await app.initialize();
  spController.pageInitialized(spPage, app);
  spController.pageResumed(spPage, app);

  let event = {
    shipmentnum: 1234,
  };
  spController.showShipmentActions(event);
  spController.goBack();

  event = {
    type: "inspectCountNum",
    item: items[0],
  };
  spController.dataCache = {
    shipmentinspectpage: [{}],
  };
  spController.dataCache.shipmentinspectpage[0][items[0].href] = [];
  spController.gotoDetailActionPage(event);

  event = {
    type: "voidCountNum",
    item: items[0],
  };
  spController.dataCache = {
    shipmentvoidpage: [{}],
  };
  spController.dataCache.shipmentvoidpage[0][items[0].href] = [];
  spController.gotoDetailActionPage(event);

  spController.pageResumed(spPage, app);
  spController.onBeforeLoadData(dsshipmentlist);
  spController.onAfterLoadData(dsshipmentlist, []);
  shipmentlineds.dependsOn = dsshipmentlist;
  shipmentlineds.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  spController.onAfterLoadData(shipmentlineds, []);
  spController.computedCounts(items[0], spController.sessionKey);
});

it("shipment list page session key", async () => {
  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  let app = new Application();
  let spController = new ShipmentPageController();
  app.registerController(spController);
  spPage.registerController(spController);
  app.registerPage(spPage);
  const dsshipmentlist = newDatasource(
    shipmentlistitem,
    "shipmentDS",
    "shipmentnum"
  );
  let items = JSON.parse(JSON.stringify(shipmentlistitem.member));
  dsshipmentlist.options = {};
  const shipmentlineds = newDatasource([], "shipmentlineDS", "shipmentlineid");
  shipmentlineds.options = {};
  const shipmentMatrectransDS = newDatasource(
    [],
    "shipmentMatrectransDS",
    "matrectransid"
  );
  shipmentMatrectransDS.options = {};
  const shipmentassetinputDS = newDatasource(
    [],
    "shipmentassetinputDS",
    "localref"
  );
  shipmentassetinputDS.options = {};
  app.registerDatasource(dsshipmentlist);
  app.registerDatasource(shipmentlineds);
  app.registerDatasource(shipmentMatrectransDS);
  app.registerDatasource(shipmentassetinputDS);
  dsshipmentlist.childrenToLoad = [shipmentlineds];

  const mobileRecDs = newDatasource([], "mobileReceipts", "_id");
  app.registerDatasource(mobileRecDs);

  const shiprecds = newDatasource(
    [],
    "shipmentreceivejsonDS",
    "shipmentlineid"
  );
  app.registerDatasource(shiprecds);
  const shipinpds = newDatasource([], "shipmentinspectjsonDS", "_id");
  app.registerDatasource(shipinpds);
  const shipinpassetds = newDatasource([], "shipmentinspectassetjsonDS", "_id");
  app.registerDatasource(shipinpassetds);
  const shipreturnds = newDatasource([], "shipmentreturnrecjsonDS", "_id");
  app.registerDatasource(shipreturnds);
  const shipvoidds = newDatasource([], "shipmentvoidrecjsonDS", "_id");
  app.registerDatasource(shipvoidds);

  sinon.stub(mobileRecDs, "load");
  sinon.stub(dsshipmentlist, "load").returns(items);
  sinon.stub(dsshipmentlist, "getItems").returns(items);
  const shiplineItems = JSON.parse(JSON.stringify(shipmentlineitem.member));
  sinon.stub(shipmentlineds, "load").returns(shiplineItems);
  sinon.stub(shipmentlineds, "getItems").returns(shiplineItems);
  sinon.stub(shipmentassetinputDS, "load").returns([]);
  sinon.stub(shipmentassetinputDS, "getItems").returns([]);
  const shipmatrectransitems = JSON.parse(
    JSON.stringify(shipmentmatrectransitem.member)
  );
  sinon.stub(shipmentMatrectransDS, "load").returns(shipmatrectransitems);
  sinon.stub(shipmentMatrectransDS, "getItems").returns(shipmatrectransitems);
  sinon.stub(shipinpds, "load").returns([]);
  sinon.stub(shipinpassetds, "load").returns([]);
  sinon.stub(shiprecds, "load").returns([]);
  sinon.stub(shipreturnds, "load").returns([]);
  sinon.stub(shipvoidds, "load").returns([]);

  app.device.isMaximoMobile = true;
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
  await app.initialize();
  spController.pageInitialized(spPage, app);
  spController.pageResumed(spPage, app);

  let event = {
    shipmentnum: 1234,
  };
  spController.showShipmentActions(event);
  spController.goBack();

  event = {
    type: "voidCountNum",
    item: items[0],
  };
  spController.dataCache = {
    shipmentvoidpage: [{}],
  };
  spController.dataCache.shipmentvoidpage[0][items[0].href] = [];

  spController.pageResumed(spPage, app);
  spController.onBeforeLoadData(dsshipmentlist);
  spController.onAfterLoadData(dsshipmentlist, []);
  shipmentlineds.dependsOn = dsshipmentlist;
  shipmentlineds.lastQuery = {
    selectedRecordHref: items[0].href,
  };
  spController.onAfterLoadData(shipmentlineds, []);
  for (let i = 0; i < 10; i++) {
    spController.dataLoadCompleted.push(i);
  }
  spController.computedCounts(items[0], spController.sessionKey);
});
