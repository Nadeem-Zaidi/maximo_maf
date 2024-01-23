import inspectDetailPageController from "./InspectDetailPageController";
import matreceiptinputitem from "./test/matreceiptinput-json-data";

import sinon from "sinon";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

function newMatrectransjsonDatasource(
  data = matreceiptinputitem,
  name = "matrectransjsonDS"
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

function newMatrectransDatasource(
  data = matreceiptinputitem,
  name = "dspolistMatrectrans"
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

it("Inspect detail page test", async () => {
  let app = new Application();
  const inspectpage = new Page({
    name: "inspectpage",
    clearStack: false,
  });
  app.registerPage(inspectpage);
  const inspectDetailpage = new Page({
    name: "inspectDetail",
    clearStack: false,
  });
  app.registerPage(inspectDetailpage);
  await app.initialize();

  let inspectDetailController = new inspectDetailPageController();
  inspectDetailpage.registerController(inspectDetailController);

  const matreceiptjsonDS = newMatrectransjsonDatasource(
    matreceiptinputitem,
    "matrectransjsonDS"
  );
  app.registerDatasource(matreceiptjsonDS);

  const matreceiptDS = newMatrectransDatasource(
    matreceiptinputitem,
    "dspolistMatrectrans"
  );
  app.registerDatasource(matreceiptDS);

  inspectDetailController.pageInitialized(inspectDetailpage, app);

  let items = JSON.parse(JSON.stringify(matreceiptinputitem.member));
  inspectDetailpage.params.id = 1;
  inspectDetailpage.params.matrectransid = "1000";
  inspectDetailpage.params.ponum = "1000";
  sinon.stub(matreceiptjsonDS, "load").returns(items);
  sinon.stub(matreceiptjsonDS, "getItems").returns(items);
  sinon.stub(matreceiptDS, "load").returns(items);
  sinon.stub(matreceiptDS, "getItems").returns(items);
  sinon.stub(matreceiptDS, "getChildDatasource").returns(matreceiptjsonDS);
  sinon.stub(inspectDetailpage, "findDatasource");
  sinon.stub(inspectDetailpage, "registerDatasource");

  inspectDetailController.pageResumed(inspectDetailpage, app);
  inspectDetailController.goBack();
  inspectDetailpage.state._currentItem = items[0];
  inspectDetailController.saveInspectDetail();
});
