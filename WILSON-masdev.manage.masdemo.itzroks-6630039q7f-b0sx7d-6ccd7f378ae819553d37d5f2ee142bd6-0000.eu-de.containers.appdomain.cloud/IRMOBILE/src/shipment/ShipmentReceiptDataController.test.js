/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ShipmentReceiptDataController from "./ShipmentReceiptDataController";
import shipmentReceiptsJSONData from "./test/shipment-receipts-json-data";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";

function newDatasource(
  data = shipmentReceiptsJSONData,
  name = "shipmentreceiptjsonDs"
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

it("Datasource initialized", async () => {
  const controller = new ShipmentReceiptDataController();
  const app = new Application();
  const ds = newDatasource(shipmentReceiptsJSONData, "shipmentreceiptjsonDs");
  ds.registerController(controller);
  app.registerDatasource(ds);
  await app.initialize();
  await ds.load();

  expect(controller.datasource).toBe(ds);
  expect(controller.app).toBe(app);
});

it("Load data and execute _computeActualDate functions", async () => {
  const controller = new ShipmentReceiptDataController();
  const app = new Application();
  const ds = newDatasource(shipmentReceiptsJSONData, "shipmentreceiptjsonDs");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  let items = await ds.load();
  expect(items[0].shipmentnum).toBe("TSHIP1");
  expect(items[0].itemnum).toBe("0-0514");

  let computedDate = controller._computeActualDate(items[0]);
  expect(computedDate).toBeTruthy();

  computedDate = controller._computeActualDate(items[1]);
  expect(computedDate).toBe("");
});

it("Load data and execute _computeReceiptQuantity functions", async () => {
  const controller = new ShipmentReceiptDataController();
  const app = new Application();
  const ds = newDatasource(shipmentReceiptsJSONData, "shipmentreceiptjsonDs");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  let items = await ds.load();

  let computedQty = controller._computeReceiptQuantity(items[0]);
  expect(computedQty).toBe(5);

  computedQty = controller._computeReceiptQuantity(items[1]);
  expect(computedQty).toBe(4);

  computedQty = controller._computeReceiptQuantity(items[3]);
  expect(computedQty).toBe(1);
});

it("Load data and execute _computeAcceptedQty functions", async () => {
  const controller = new ShipmentReceiptDataController();
  const app = new Application();
  const ds = newDatasource(shipmentReceiptsJSONData, "shipmentreceiptjsonDs");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  let items = await ds.load();

  let computedQty = controller._computeAcceptedQty(items[0]);
  expect(computedQty).toBe(5);

  computedQty = controller._computeAcceptedQty(items[1]);
  expect(computedQty).toBe(2);

  computedQty = controller._computeAcceptedQty(items[2]);
  expect(computedQty).toBe("");
});

it("Load data and execute _computeStyle functions", async () => {
  const controller = new ShipmentReceiptDataController();
  const app = new Application();
  const ds = newDatasource(shipmentReceiptsJSONData, "shipmentreceiptjsonDs");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  let items = await ds.load();

  let computedStyle = controller._computeStyle(items[0]);
  expect(computedStyle).toBe("COMP");

  computedStyle = controller._computeStyle(items[3]);
  expect(computedStyle).toBe("SHIPRETURN");
});

it("Load data and execute _computeBadgeTags functions", async () => {
  const controller = new ShipmentReceiptDataController();
  const app = new Application();
  const ds = newDatasource(shipmentReceiptsJSONData, "shipmentreceiptjsonDs");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();
  let items = await ds.load();

  let computedStyle = controller._computeBadgeTags(items[0]);
  expect(computedStyle[0].label).toBe("COMP");

  computedStyle = controller._computeBadgeTags(items[3]);
  expect(computedStyle[0].label).toBe("RETURN");

  computedStyle = controller._computeBadgeTags(items[4]);
  expect(computedStyle[0].label).toBe("WINSP");
});
