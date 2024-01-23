import sinon from "sinon";
import ShipmentCommonUtil from "./ShipmentCommonUtil";
import matreceiptinputitem from "../test/shipment-matrectrans-json-data";
import shipmentlineitem from "../test/shipmentline-json-data";
import mobileitem from "../test/shipmentmobilerec-json-data";

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
  name = "shipmentMatrectransDS"
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

function newShipmentLineDatasource(
  data = shipmentlineitem,
  name = "shipmentlineDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "shipmentlineid",
    name: name,
  });

  return ds;
}

describe("ShipmentCommonUtil", () => {
  it("build items", async () => {
    let item = {
      siteid: "abc",
      revisionnum: 1,
      quantity: 1,
      asn: "abc",
    };
    // const assetItem = CommonUtil.buildAssetItem(item);
    // expect(assetItem.siteid).toEqual(item.siteid);
    // const inspectItem = ShipmentCommonUtil.buildShipInspectItem(item, 1, 1, 0);
    // expect(inspectItem.siteid).toEqual(item.siteid);
    const receiptItem = ShipmentCommonUtil.buildShipReceiptItem(
      item,
      "test desc",
      "testid",
      [],
      true
    );
    //expect(receiptItem.positeid).toEqual(item.siteid);
    const receiveItem = ShipmentCommonUtil.buildShipReceiveItem(item);
    expect(receiveItem.siteid).toEqual(item.siteid);

    // const returnvoidItem = ShipmentCommonUtil.buildShipReturnVoidItem(
    //   item,
    //   0,
    //   matreceiptinputitem.member[0],
    //   "testid"
    // );
    // console.log("***********item=",item);
    // expect(returnvoidItem.siteid).toEqual(item.siteid);

    ShipmentCommonUtil.calculateReturnQty({}, []);
    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        status_maxvalue: "COMP",
      },
      []
    );
    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "WINSP",
      },
      [],
      true
    );
    ShipmentCommonUtil.calculateReturnQty(
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
    ShipmentCommonUtil.calculateReturnQty(
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

    ShipmentCommonUtil.calculateReturnQty(
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

    const shipmentlineDs = newShipmentLineDatasource(
      shipmentlineitem,
      "shipmentlineDS"
    );
    const matreceiptDS = newMatrectransDatasource(
      matreceiptinputitem,
      "shipmentMatrectransDS"
    );
    const mobileRecDs = newMobileRecDatasource(mobileitem, "mobileReceipts");

    await shipmentlineDs.load();
    await matreceiptDS.load();
    await mobileRecDs.load();

    sinon.stub(shipmentlineDs, "getItems").returns(shipmentlineitem.member);
    sinon.stub(matreceiptDS, "getItems").returns(matreceiptinputitem.member);
    sinon.stub(mobileRecDs, "getItems").returns(mobileitem.member);

    ShipmentCommonUtil.computedOthersRemaining(
      {
        shipmentmatrectransds: matreceiptDS,
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      "1001"
    );
    ShipmentCommonUtil.computedRecInspRemaining(
      {
        shipmentmatrectransds: matreceiptDS,
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      shipmentlineitem.member[0]
    );
    ShipmentCommonUtil.computedRecInspRemaining(
      {
        shipmentmatrectransds: matreceiptDS,
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      shipmentlineitem.member[1]
    );
    ShipmentCommonUtil.computedRecInspRemaining(
      {
        shipmentmatrectransds: matreceiptDS,
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      shipmentlineitem.member[2]
    );
    ShipmentCommonUtil.getDatasourceCopy("test", matreceiptDS, {
      href: "href",
    });
    ShipmentCommonUtil.getDatasourceCopy("shipmentMatrectransDS", matreceiptDS);
    ShipmentCommonUtil.loadjsonds(matreceiptDS, {});
    ShipmentCommonUtil.resetDataSource(matreceiptDS);
  });
});
