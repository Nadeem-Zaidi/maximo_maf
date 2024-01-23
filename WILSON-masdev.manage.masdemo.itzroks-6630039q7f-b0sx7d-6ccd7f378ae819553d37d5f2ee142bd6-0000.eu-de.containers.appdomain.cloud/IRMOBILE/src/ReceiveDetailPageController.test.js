import receiveDetailPageController from "./ReceiveDetailPageController";
import matreceiptinputitem from "./test/matreceiptinput-json-data";
import receiveDetaildata from "./test/receiveDetail-json-data";
import conditioncodeitem from "./test/conditioncode-json-data";
import polineitem from "./test/poline-json-data";
import childitem from "./test/child-item-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newReceiptDetailDatasource(
  data = receiveDetaildata,
  name = "receiveDetailjsonds"
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

function newPOLinesDatasource(data = polineitem, name = "dspolistPoline") {
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

function newChildItemDatasource(data = childitem, name = "childDataSource") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "itemid",
    name: name,
  });

  return ds;
}

function newReceivejsonDatasource(
  data = matreceiptinputitem,
  name = "receivejsonDS"
) {
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

function newConditionCodeDatasource(
  data = conditioncodeitem,
  name = "conditionLookupDS"
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

it("Receive detail page display image", async () => {
  let app = new Application();
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  app.registerPage(receivepage);
  const receiveDetailpage = new Page({
    name: "receiveDetail",
    clearStack: false,
  });

  const receivedetailjsonds = newReceiptDetailDatasource(
    receiveDetaildata,
    "receiveDetailjsonds"
  );
  receiveDetailpage.registerDatasource(receivedetailjsonds);
  let itemsDetail = await receivedetailjsonds.load();
  const receivejsonDS = newReceivejsonDatasource(
    matreceiptinputitem,
    "receivejsonDS"
  );
  app.registerDatasource(receivejsonDS);
  let item = await receivejsonDS.load();

  const receivedetailjsondsorg = newReceiptDetailDatasource(
    receiveDetaildata,
    "receiveDetailjsondsorg"
  );
  receiveDetailpage.registerDatasource(receivedetailjsondsorg);
  await receivedetailjsondsorg.load();

  const conditionDS = newConditionCodeDatasource(
    conditioncodeitem,
    "conditionLookupDS"
  );
  app.registerDatasource(conditionDS);
  await conditionDS.load();

  const polinesDS = newPOLinesDatasource(polineitem, "dspolistPoline");
  app.registerDatasource(polinesDS);

  const childItemDS = newChildItemDatasource(childitem, "childDataSource");
  app.registerDatasource(childItemDS);

  await app.initialize();
  app.registerPage(receiveDetailpage);
  let receiveDetailController = new receiveDetailPageController();
  receiveDetailpage.registerController(receiveDetailController);
  receiveDetailController.pageInitialized(receiveDetailpage, app);

  receiveDetailpage.params.polinenum = 2;
  receiveDetailpage.params.ponum = "1022";
  sinon.stub(receivedetailjsonds, "load").returns(itemsDetail);
  sinon.stub(receivedetailjsonds, "getItems").returns(itemsDetail);
  sinon.stub(receivedetailjsonds, "hasWarnings").returns(false);
  sinon.stub(receivedetailjsonds, "clearWarnings");
  let items = JSON.parse(JSON.stringify(polineitem.member));
  sinon.stub(polinesDS, "load").returns(items);
  sinon.stub(polinesDS, "getItems").returns(items);
  sinon.stub(polinesDS, "getChildDatasource").returns(childItemDS);

  sinon.stub(receivejsonDS, "load").returns(item);
  sinon.stub(receivejsonDS, "getItems").returns(item);
  sinon.stub(conditionDS, "setQBE");
  sinon.stub(conditionDS, "searchQBE");

  receiveDetailpage.state.hasItemFromPOLines = false;
  receiveDetailpage.state.hasItemImagelibrefFromPOLines = false;

  receiveDetailController.pageResumed(receiveDetailpage, app);
  // Needs to call pageResumed the 2nd time to get into the else code for child data source.
  receiveDetailController.pageResumed(receiveDetailpage, app);
});

it("Receive detail page test saveRecevieDetail 1", async () => {
  let app = new Application();
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  app.registerPage(receivepage);
  const receiveDetailpage = new Page({
    name: "receiveDetail",
    clearStack: false,
  });

  const receivedetailjsonds = newReceiptDetailDatasource(
    receiveDetaildata,
    "receiveDetailjsonds"
  );
  receiveDetailpage.registerDatasource(receivedetailjsonds);
  let itemsDetail = await receivedetailjsonds.load();
  const receivejsonDS = newReceivejsonDatasource(
    matreceiptinputitem,
    "receivejsonDS"
  );
  app.registerDatasource(receivejsonDS);
  let item = await receivejsonDS.load();

  const receivedetailjsondsorg = newReceiptDetailDatasource(
    receiveDetaildata,
    "receiveDetailjsondsorg"
  );
  receiveDetailpage.registerDatasource(receivedetailjsondsorg);
  await receivedetailjsondsorg.load();

  const conditionDS = newConditionCodeDatasource(
    conditioncodeitem,
    "conditionLookupDS"
  );
  app.registerDatasource(conditionDS);
  await conditionDS.load();

  await app.initialize();
  app.registerPage(receiveDetailpage);
  let receiveDetailController = new receiveDetailPageController();
  receiveDetailpage.registerController(receiveDetailController);
  receiveDetailController.pageInitialized(receiveDetailpage, app);

  receiveDetailpage.params.polinenum = 1;
  receiveDetailpage.params.ponum = "1000";
  sinon.stub(receivedetailjsonds, "load").returns(itemsDetail);
  sinon.stub(receivedetailjsonds, "getItems").returns(itemsDetail);
  sinon.stub(receivedetailjsonds, "hasWarnings").returns(false);
  sinon.stub(receivedetailjsonds, "clearWarnings");
  sinon.stub(receivejsonDS, "load").returns(item);
  sinon.stub(receivejsonDS, "getItems").returns(item);
  sinon.stub(conditionDS, "setQBE");
  sinon.stub(conditionDS, "searchQBE");

  receiveDetailController.pageResumed(receiveDetailpage, app);
  receiveDetailController.goBack();

  receiveDetailController.saveRecevieDetail();
  let event2 = { value: "11/32" };
  receiveDetailController.validateInput(event2);
  receiveDetailController.selectConditionCode(event2);
  receiveDetailController.validateInput({ value: "10/10" });
});

it("Receive detail page test saveRecevieDetail 2", async () => {
  let app = new Application();
  const receivepage = new Page({
    name: "receivepage",
    clearStack: false,
  });
  app.registerPage(receivepage);
  const receiveDetailpage = new Page({
    name: "receiveDetail",
    clearStack: false,
  });

  const receivedetailjsonds = newReceiptDetailDatasource(
    receiveDetaildata,
    "receiveDetailjsonds"
  );
  receiveDetailpage.registerDatasource(receivedetailjsonds);
  let itemsDetail = await receivedetailjsonds.load();

  const receivedetailjsondsorg = newReceiptDetailDatasource(
    receiveDetaildata,
    "receiveDetailjsondsorg"
  );
  receiveDetailpage.registerDatasource(receivedetailjsondsorg);
  await receivedetailjsondsorg.load();

  itemsDetail = itemsDetail.filter((i) => i._id === 4 || i._id === 5);
  const receivejsonDS = newReceivejsonDatasource(
    matreceiptinputitem,
    "receivejsonDS"
  );
  app.registerDatasource(receivejsonDS);
  let item = await receivejsonDS.load();

  const conditionDS = newConditionCodeDatasource(
    conditioncodeitem,
    "conditionLookupDS"
  );
  app.registerDatasource(conditionDS);
  await conditionDS.load();

  await app.initialize();
  app.registerPage(receiveDetailpage);
  let receiveDetailController = new receiveDetailPageController();
  receiveDetailpage.registerController(receiveDetailController);
  receiveDetailController.pageInitialized(receiveDetailpage, app);

  item = item.filter((i) => i.itemnum === "P-896");
  receiveDetailpage.params.polinenum = 1;
  sinon.stub(receivedetailjsonds, "load").returns(itemsDetail);
  sinon.stub(receivedetailjsonds, "hasWarnings").returns(false);
  sinon.stub(receivedetailjsonds, "clearWarnings");
  sinon.stub(receivejsonDS, "load").returns(item);
  sinon.stub(receivejsonDS, "getItems").returns(item);
  sinon.stub(conditionDS, "setQBE");
  sinon.stub(conditionDS, "searchQBE");

  receiveDetailController.pageResumed(receiveDetailpage, app);
  receiveDetailController.saveRecevieDetail();
});
