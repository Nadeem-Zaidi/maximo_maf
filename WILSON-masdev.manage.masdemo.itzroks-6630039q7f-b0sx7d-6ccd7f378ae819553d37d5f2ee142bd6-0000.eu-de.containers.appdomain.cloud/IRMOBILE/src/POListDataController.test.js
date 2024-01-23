import POListDataController from "./POListDataController";
import polistitem from "./test/po-list-json-data";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newDatasource(
  data = polistitem,
  name = "selectedDatasource",
  field = "member"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: "responseInfo.schema",
  });
  const ds = new Datasource(da, {
    idAttribute: "ponum",
    name: name,
  });
  return ds;
}

it("POListDataController test ", async () => {
  const controller = new POListDataController();
  const app = new Application();
  const page = new Page({
    name: "main",
  });

  app.client = {
    userInfo: {
      personId: "wilson",
    },
  };

  const ds = newDatasource(polistitem, "poListResource");
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, "", app);
  expect(controller.initialCountNum()).toEqual(0);

  expect(
    controller.computedPODescription({
      description: "Desc",
      ponum: "123",
    })
  ).toEqual("123 Desc");

  expect(
    controller.computedVendorDescription({
      vendordesc: "Vendor Desc",
      vendor: "vendor123",
    })
  ).toEqual("vendor123 Vendor Desc");

  controller.computedReceiptDescription({
    receipts_description: "description",
  });

  expect(
    controller.computedPOLineCount({
      polinecount: "1",
    })
  ).toEqual("{0} PO Line");

  expect(
    controller.computedPOLineCount({
      polinecount: "10",
    })
  ).toEqual("{0} PO Lines");
});
