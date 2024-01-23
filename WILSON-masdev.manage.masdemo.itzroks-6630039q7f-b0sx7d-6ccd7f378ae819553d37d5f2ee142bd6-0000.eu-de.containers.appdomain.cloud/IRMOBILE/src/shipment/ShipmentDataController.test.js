import ShipmentDataController from "./ShipmentDataController";
import shipmentlistitem from "./test/shipment-list-json-data";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newDatasource(
  data = shipmentlistitem,
  name = "selectedDatasource",
  field = "member"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: "responseInfo.schema",
  });
  const ds = new Datasource(da, {
    idAttribute: "shipmentnum",
    name: name,
  });
  return ds;
}

it("ShipmentDataController test ", async () => {
  const controller = new ShipmentDataController();
  const app = new Application();
  const page = new Page({
    name: "main",
  });

  app.client = {
    userInfo: {
      personId: "wilson",
    },
  };

  const ds = newDatasource(shipmentlistitem, "poListResource");
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, "", app);
  expect(controller.initialCountNum()).toEqual(0);
});
