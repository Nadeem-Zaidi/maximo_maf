import sinon from "sinon";
import CommonUtil from "./CommonUtil";
import matreceiptinputitem from "../test/matrectrans-json-data";
import polineitem from "../test/poline-json-data";
import mobileitem from "../test/mobilerec-json-data";

import { Datasource, JSONDataAdapter } from "@maximo/maximo-js-api";

function newMobileRecDatasource(data = mobileitem, name = "mobileReceipts") {
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

function newPOLineDatasource(data = polineitem, name = "dspolistPoline") {
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

describe("CommonUtil", () => {
  it("build items", async () => {
    let item = {
      siteid: "abc",
      revisionnum: 1,
      quantity: 1,
      asn: "abc",
    };
    const assetItem = CommonUtil.buildAssetItem(item);
    expect(assetItem.siteid).toEqual(item.siteid);
    const inspectItem = CommonUtil.buildInspectItem(item, 1, 1, 0);
    expect(inspectItem.positeid).toEqual(item.siteid);
    const receiptItem = CommonUtil.buildReceiptItem(
      item,
      "test desc",
      "testid",
      [],
      true
    );
    //expect(receiptItem.positeid).toEqual(item.siteid);
    const receiveItem = CommonUtil.buildReceiveItem(item);
    expect(receiveItem.positeid).toEqual(item.siteid);
    const returnvoidItem = CommonUtil.buildReturnVoidItem(
      item,
      0,
      matreceiptinputitem.member[0],
      "testid"
    );
    expect(returnvoidItem.positeid).toEqual(item.siteid);

    CommonUtil.calculateReturnQty({}, []);
    CommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        status_maxvalue: "COMP",
      },
      []
    );
    CommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "WINSP",
      },
      [],
      true
    );
    CommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "WINSP",
      },
      [
        {
          receiptquantity: 2,
        },
      ],
      true
    );
    CommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "COMP",
      },
      [
        {
          receiptquantity: 2,
        },
      ],
      true
    );

    CommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        inspected: true,
        status_maxvalue: "WINSP",
        receiptquantity: 8,
      },
      [],
      true
    );

    const polineDs = newPOLineDatasource(polineitem, "dspolistPoline");
    const matreceiptDS = newMatrectransDatasource(
      matreceiptinputitem,
      "dspolistMatrectrans"
    );
    const mobileRecDs = newMobileRecDatasource(mobileitem, "mobileReceipts");

    await polineDs.load();
    await matreceiptDS.load();
    await mobileRecDs.load();

    sinon.stub(polineDs, "getItems").returns(polineitem.member);
    sinon.stub(matreceiptDS, "getItems").returns(matreceiptinputitem.member);
    sinon.stub(mobileRecDs, "getItems").returns(mobileitem.member);

    CommonUtil.computedOthersRemaining(
      {
        matrectransds: matreceiptDS,
        polineitems: polineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      "1022"
    );
    CommonUtil.computedRecInspRemaining(
      {
        matrectransds: matreceiptDS,
        polineitems: polineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      polineitem.member[0]
    );

    CommonUtil.getDatasourceCopy("test", matreceiptDS, { href: "href" });
    CommonUtil.getDatasourceCopy("dspolistMatrectrans", matreceiptDS);
    CommonUtil.loadjsonds(matreceiptDS, {});
    CommonUtil.resetDataSource(matreceiptDS);
  });
});
