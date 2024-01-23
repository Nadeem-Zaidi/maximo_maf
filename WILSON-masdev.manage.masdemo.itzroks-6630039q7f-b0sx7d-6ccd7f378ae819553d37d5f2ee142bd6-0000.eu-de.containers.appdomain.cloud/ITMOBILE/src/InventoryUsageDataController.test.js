import InventoryUsageDataController from "./InventoryUsageDataController";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";
import invusageData from "./test/test-invusage-data";
import reservationsData from "./test/test-reservations-data";

function newDatasource(data = invusageData, name = "invusageData") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "invuseid",
    name: name,
  });

  return ds;
}

function newReserveDatasource(
  data = reservationsData,
  name = "reservationsListDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "invreserveid",
    name: name,
  });

  return ds;
}

it("loads InventoryUsageDataController", async () => {
  const controller = new InventoryUsageDataController();
  const app = new Application();
  const ds = newDatasource(invusageData, "invUseDS");
  ds.registerController(controller);
  app.registerDatasource(ds);

  app.allinvuses = [];
  app.allreserveditems = [
    {
      requestedby: "MAXADMIN",
      requestnum: "1001",
      item: [
        {
          rotating: false,
          conditionenabled: false,
        },
      ],
      requireddate: "2023-08-11T10:13:02+08:00",
      siteid: "BEDFORD",
    },
  ];

  const reservationsListDS = newReserveDatasource(
    reservationsData,
    "reservationsListDS"
  );
  reservationsListDS.registerController(controller);
  app.registerDatasource(reservationsListDS);

  await app.initialize();
  await ds.load();
  await reservationsListDS.load();

  //sinon.stub(reservationsListDS, "getItems").returns(reservationsData);
  //await ds.addNew();
  //await ds.save();

  //expect(controller.datasource).toBe(ds);
  expect(controller.app).toBe(app);

  controller.onAfterSaveData(ds, invusageData, true);

  app.allreserveditems = [
    {
      requestedby: "MAXADMIN",
      requestnum: "1001",
      item: [
        {
          rotating: false,
          conditionenabled: false,
        },
      ],
      requireddate: "2023-08-11T10:13:02+08:00",
      siteid: "BEDFORD123",
    },
  ];
  controller.onAfterSaveData(ds, invusageData, true);

  controller.computedStatusLabel({});
  controller.computedStatusLabel({ status: "STAGED" });
  controller.computedDueDate({
    invuseline: [{ invreserve: [{ requireddate: "" }] }],
  });
  controller.computedDueDate({
    invuseline: [
      { invreserve: [{ requireddate: "2011-02-18T13:40:47+00:00" }] },
      { invreserve: [{ requireddate: "2011-02-18T13:30:47+00:00" }] },
    ],
  });
  controller.computedFromStoreroom({});
  controller.computedShipmentlineCounts({});
  controller.computedShipmentlineCounts(invusageData.member[0]);
  controller.computedSplitBin({});
  controller.computedSplitBin({ frombin: "abc" });
  controller.computedSplitQuantity({});
  controller.computedSplitQuantity({ quantity: 1 });
  controller.computedAssetBin({});
  controller.computedAssetBin({ binnum: "abc" });
});
