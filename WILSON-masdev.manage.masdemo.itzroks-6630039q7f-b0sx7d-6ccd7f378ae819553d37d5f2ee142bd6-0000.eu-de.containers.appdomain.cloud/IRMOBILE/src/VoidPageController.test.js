import voidPageController from "./VoidPageController";
import voidreceiptinputitem from "./test/returnreceiptinput-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

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

function newVoidReceiptInputDatasource(
  data = voidreceiptinputitem,
  name = "voidrecjsonDs"
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

it("Void page test", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const voidpage = new Page({
    name: "voidpage",
    clearStack: false,
  });

  let voidController = new voidPageController();
  app.registerController(voidPageController);
  await app.initialize();
  app.registerPage(voidpage);
  voidpage.registerController(voidController);
  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");
  const voidreceiptinputDs = newVoidReceiptInputDatasource(
    voidreceiptinputitem,
    "voidrecjsonDs"
  );
  app.registerDatasource(voidreceiptinputDs);
  sinon.stub(voidreceiptinputDs, "load").returns(voidreceiptinputitem.member);
  sinon
    .stub(voidreceiptinputDs, "getSelectedItems")
    .returns(voidreceiptinputitem.member);
  sinon.stub(voidreceiptinputDs, "clearSelections");
  sinon
    .stub(voidreceiptinputDs, "getItems")
    .returns(voidreceiptinputitem.member);
  voidController.pageInitialized(voidpage, app);

  app.device.isMaximoMobile = true;
  voidpage.params.ponum = "1234";
  voidpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  voidController.pageResumed(voidpage, app);
  voidController.pagePaused(voidpage, app);
  voidController.goBack();
  app.device.isMaximoMobile = false;
  voidController.pageResumed(voidpage, app);
  voidController.pagePaused(voidpage, app);
  voidController.goBack();
});

it("Void page test saveVoid", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const voidpage = new Page({
    name: "voidpage",
    clearStack: false,
  });

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns(null);
  sinon.stub(mobileRecDs, "put").returns(null);
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const voidreceiptinputDs = newVoidReceiptInputDatasource(
    voidreceiptinputitem,
    "voidrecjsonDs"
  );
  app.registerDatasource(voidreceiptinputDs);
  sinon.stub(voidreceiptinputDs, "load").returns(voidreceiptinputitem.member);
  sinon
    .stub(voidreceiptinputDs, "getSelectedItems")
    .returns(voidreceiptinputitem.member);
  sinon.stub(voidreceiptinputDs, "clearSelections");
  sinon
    .stub(voidreceiptinputDs, "getItems")
    .returns(voidreceiptinputitem.member);

  let voidController = new voidPageController();
  await app.initialize();
  voidpage.params.ponum = "1234";
  voidpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  app.registerPage(voidpage);
  voidpage.registerController(voidController);
  voidController.pageInitialized(voidpage, app);
  voidController.pageResumed(voidpage, app);

  app.device.isMaximoMobile = false;
  voidController.saveVoid();
});

it("Void page test saveVoid2", async () => {
  let app = new Application();
  const actionpage = new Page({
    name: "recactions",
    clearStack: false,
  });
  app.registerPage(actionpage);
  const voidpage = new Page({
    name: "voidpage",
    clearStack: false,
  });

  const mobileRecDs = newMobileRecDatasource([], "mobileReceipts");
  app.registerDatasource(mobileRecDs);
  sinon.stub(mobileRecDs, "on");
  sinon.stub(mobileRecDs, "off");
  sinon.stub(mobileRecDs, "addNew").returns({});
  sinon.stub(mobileRecDs, "save").returns({});
  sinon.stub(mobileRecDs, "put").returns({});
  sinon.stub(mobileRecDs, "load").returns({});
  sinon.stub(mobileRecDs, "clearState");

  const voidreceiptinputDs = newVoidReceiptInputDatasource(
    voidreceiptinputitem,
    "voidrecjsonDs"
  );
  app.registerDatasource(voidreceiptinputDs);
  sinon.stub(voidreceiptinputDs, "load").returns(voidreceiptinputitem.member);
  const normalData = voidreceiptinputitem.member.filter(
    (item) => item.qtyrequested > 0
  );
  sinon.stub(voidreceiptinputDs, "getSelectedItems").returns(normalData);
  sinon.stub(voidreceiptinputDs, "clearSelections");
  sinon
    .stub(voidreceiptinputDs, "getItems")
    .returns(voidreceiptinputitem.member);

  let voidController = new voidPageController();
  await app.initialize();
  voidpage.params.ponum = "1234";
  voidpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
  app.registerPage(voidpage);
  voidpage.registerController(voidController);
  voidController.pageInitialized(voidpage, app);
  voidController.pageResumed(voidpage, app);

  app.device.isMaximoMobile = true;
  voidController.saveVoid();
});
