/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ReceivingSelectionPageController from "./ReceivingSelectionPageController";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

function newDatasource(data = "", name = "receivingTypeDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "label",
    name: name,
  });

  return ds;
}

function newShipmentListDatasource(data = {}, name = "shipmentDS") {
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

it("Receiving-data loads", async () => {
  let app = new Application();
  const receivingPage = new Page({
    name: "receivingSelection",
    clearStack: false,
  });
  const dsshipmentlist = newShipmentListDatasource({ items: [] }, "shipmentDS");
  app.registerDatasource(dsshipmentlist);
  let rController = new ReceivingSelectionPageController();
  app.registerController(rController);
  const receivingActionDS = newDatasource({ items: [] }, "receivingActionDS");
  receivingPage.registerDatasource(receivingActionDS);

  dsshipmentlist.childrenToLoad = [receivingActionDS];

  rController.pageInitialized(receivingPage, app);
  rController.pageResumed(receivingPage, app);
});

it("select receiving action", async () => {
  let app = new Application();
  const receivingPage = new Page({
    name: "receivingSelection",
    clearStack: false,
  });

  const spPage = new Page({
    name: "shipment",
    clearStack: false,
  });

  const poPage = new Page({
    name: "polist",
    clearStack: false,
  });

  const dsshipmentlist = newShipmentListDatasource({ items: [] }, "shipmentDS");
  app.registerDatasource(dsshipmentlist);
  dsshipmentlist.childrenToLoad = [];

  let rController = new ReceivingSelectionPageController();
  let spController = new ReceivingSelectionPageController(); // just use same controller for .pageInitialized
  let poController = new ReceivingSelectionPageController();

  app.registerController(rController);
  app.registerController(spController);
  app.registerController(poController);

  receivingPage.registerController(rController);
  spPage.registerController(spController);
  poPage.registerController(poController);

  app.registerPage(receivingPage);
  app.registerPage(spPage);
  app.registerPage(poPage);

  await app.initialize();
  expect(rController.page).toBeTruthy();
  rController.pageInitialized(receivingPage, app);

  rController.selectReceivingAction({ page: spPage.name });
  expect(spController.page).toBeTruthy();
  spController.pageInitialized(spPage, app);

  rController.selectReceivingAction({ page: poPage.name });
  expect(poController.page).toBeTruthy();
  poController.pageInitialized(poPage, app);

  rController.selectReceivingAction({ page: "notexistpage" });
});
