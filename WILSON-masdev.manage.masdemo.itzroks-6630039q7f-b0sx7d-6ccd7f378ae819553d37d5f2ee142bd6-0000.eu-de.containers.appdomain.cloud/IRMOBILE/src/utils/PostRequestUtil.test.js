import sinon from "sinon";
import PostRequestUtil from "./PostRequestUtil";
import polistitem from "../test/po-list-json-data";
import matreceiptinputitem from "../test/matreceiptinput-json-data";
import returnPageController from "../ReturnPageController";
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
} from "@maximo/maximo-js-api";

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

function newReceiptinputDatasource(
  data = matreceiptinputitem,
  name = "receiptinputDS"
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

describe("PostRequestUtil", () => {
  it("Should return getItemsListAndBoolean and postRequest", async () => {
    const {
      RESTConnection: TestRESTConnection,
    } = require("@maximo/maximo-js-api");

    let conn = TestRESTConnection.newInstance({
      authenticator: null,
      baseUrl: "http://maxoslc.fakecorp.com/maximo",
    });

    let app = new Application();
    const returnpage = new Page({
      name: "returnpage",
      clearStack: false,
    });

    let returnController = new returnPageController();
    app.registerController(returnController);
    await app.initialize();
    app.registerPage(returnpage);
    returnpage.registerController(returnController);
    returnController.pageInitialized(returnpage, app);
    const dspolist = newPOListDatasource(polistitem, "dspolist");
    app.registerDatasource(dspolist);
    await dspolist.load();

    returnpage.params.href = "oslc/os/mxapipo/_MTAxNy8wL0JFREZPUkQ-";
    sinon.stub(dspolist, "load");

    const receiptinputDS = newReceiptinputDatasource(
      matreceiptinputitem,
      "receiptinputDS"
    );
    app.registerDatasource(receiptinputDS);
    let items = await receiptinputDS.load();

    sinon.stub(receiptinputDS, "load").returns(items);
    sinon.stub(receiptinputDS, "getSelectedItems").returns(items);

    app.client = {
      userInfo: {
        personid: "Wilson",
      },
      restclient: conn,
    };

    sinon.stub(conn, "getCSRFToken").returns("TEST0");
    sinon.stub(conn, "post").returns("DONE0");
    sinon.stub(receiptinputDS, "clearSelections");

    let itemlist = [];
    let href = "";

    let response = await PostRequestUtil.postRequest(
      itemlist,
      href,
      app,
      "PO/RECEIPTINPUT:RETURNRECEIPTINPUT"
    );
    expect(response).toEqual("DONE0");

    let response1 = await PostRequestUtil.postRequest(
      itemlist,
      href,
      app,
      null
    );
    expect(response1).toEqual("DONE0");

    const pools = [
      "ponum",
      "porevisionnum",
      "orgid",
      "siteid",
      "positeid",
      "polinenum",
      "itemnum",
      "itemsetid",
      "conditioncode",
      "linetype",
      "remark",
      "tolot",
      "lottype",
      "shelflife",
      "useby",
      "packingslipnum",
      "receiptquantity",
      "inspectionrequired",
      "rotating",
      "qtyrequested",
      "orgrcvexternalrefid",
      "receiptref",
      "acceptedqty",
      "rejectqty",
      "rejectcode",
    ];
    const selectedItem = {};
    pools.forEach((key) => {
      if (key && key !== "tolot") {
        selectedItem[key] = "abc";
      }
      if (key === "lottype") {
        selectedItem[key] = "LOT";
      }
    });
    app.state.networkConnected = false;
    PostRequestUtil.setRealValues2Item(selectedItem, "RECEIVE", app);
    PostRequestUtil.setRealValues2Item(selectedItem, "INSPECT", app);
    PostRequestUtil.setRealValues2Item(selectedItem, "RETURN", app);
    PostRequestUtil.setRealValues2Item(selectedItem, "VOIDRECEIPT", app);
  });
});
