/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import CommonUtil from "./utils/ShipmentCommonUtil";

const TAG = "ShipmentPageController";

const SHIPMENTDS = "shipmentDS";
const SHIPMENTLINEDS = "shipmentlineDS";
const SHIPMENTMATRECTRANSDS = "shipmentMatrectransDS";
const SHIPMENTASSETINPUTDS = "shipmentassetinputDS";
const SHIPRECEIVEDS = "shipmentreceivejsonDS";
const SHIPINSPECTDS = "shipmentinspectjsonDS";
const SHIPINSPECTASSETDS = "shipmentinspectassetjsonDS";
const SHIPRETURNDS = "shipmentreturnrecjsonDS";
const SHIPVOIDDS = "shipmentvoidrecjsonDS";
const SHIPRECEIPTDS = "shipmentreceiptjsonDs";
const MOBILE_RECEIPTS = "mobileReceipts";

const SELECTION_PAGE = "receivingSelection";
const ACTION_PAGE = "shipmentactions";
const RECEIVE_PAGE = "shipmentreceivepage";
const INSPECT_PAGE = "shipmentinspectpage";
const RETURN_PAGE = "shipmentreturnpage";
const ASSET_PAGE = "shipmentassetpage";
const RECEIPT_PAGE = "shipmentreceiptpage";
const VOID_PAGE = "shipmentvoidpage";

const INSPECTCOUNT = "inspectCountNum";
const RECECOUNT = "receiveCountNum";
const ASSETCOUNT = "assetCountNum";
const RETURNCOUNT = "returnCountNum";
const RECEIPTCOUNT = "receiptCountNum";
const VOIDCOUNT = "voidCountNum";

const SHIPMENTLISTDS_LOADED = 1;
const ASSETINPUTDS_LOADED = 2;
const ALL_WATCHED_DS_LOADED = SHIPMENTLISTDS_LOADED;

const LOADING_AHEAD = 5;

const ignoreChildren = [SHIPMENTLINEDS, SHIPMENTMATRECTRANSDS];

class ShipmentPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.dsLoadedValue = {};
    this.dsLoadedValue[SHIPMENTDS] = SHIPMENTLISTDS_LOADED;
    // this.dsLoadedValue[SHIPMENTASSETINPUTDS] = ASSETINPUTDS_LOADED;
  }

  async checkUser() {
    let myuserJson = await this.app.client.restclient.get("/myuser");
    return myuserJson?.defstoreroom;
  }

  async checkDefaultStoreroomAndSetupPage() {
    this.page.state.emptypolist = this.app.getLocalizedLabel(
      "no_shipment_found",
      "No shipment found"
    );
    let canSetupPage =
      this.dsshipmentlist.getItems().length ||
      this.app.client.userInfo.defaultStoreroom;
    // istanbul ignore else
    if (!this.app.client.userInfo.defaultStoreroom) {
      this.app.client.userInfo.defaultStoreroom = await this.checkUser();
      // istanbul ignore else
      if (!this.app.client.userInfo.defaultStoreroom) {
        // Needs to set default storeroom for the login user in Maximo.
        let message = this.app.getLocalizedLabel(
          "default_storeroom_not_defined_msg",
          "Please set default storeroom for the login user in Maximo."
        );
        this.app.toast(message, "info");
        this.page.state.emptypolist = this.app.getLocalizedLabel(
          "no_storeroom_configured",
          "No storeroom configured for this user"
        );
      }
    }
    // istanbul ignore else
    if (canSetupPage) {
      this.setupPage();
    }
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.mobilerecDS = app.findDatasource(MOBILE_RECEIPTS);
    this.dsshipmentlist = app.findDatasource(SHIPMENTDS);
    this.shipmentlineds = app.findDatasource(SHIPMENTLINEDS);
    this.shiprecds = app.findDatasource(SHIPRECEIVEDS);
    this.shipinpds = app.findDatasource(SHIPINSPECTDS);
    this.shipinpassetds = app.findDatasource(SHIPINSPECTASSETDS);
    this.shipreturnds = app.findDatasource(SHIPRETURNDS);
    this.shipvoidds = app.findDatasource(SHIPVOIDDS);
    this.shipassetinputds = app.findDatasource(SHIPMENTASSETINPUTDS);
    this.shipmentmatrectrans = app.findDatasource(SHIPMENTMATRECTRANSDS);
    this.shipreceiptds = app.findDatasource(SHIPRECEIPTDS);

    this.dataCache = {};
    this.dataCache[RECEIVE_PAGE] = [];
    this.dataCache[INSPECT_PAGE] = [];
    this.dataCache[ASSET_PAGE] = [];
    this.dataCache[RETURN_PAGE] = [];
    this.dataCache[RECEIPT_PAGE] = [];
    this.dataCache[VOID_PAGE] = [];

    // remove ignore children ds from shipment childrenToLoad
    // istanbul ignore else
    if (this.dsshipmentlist.childrenToLoad) {
      this.dsshipmentlist.childrenToLoad =
        this.dsshipmentlist.childrenToLoad.filter(
          (item) => !ignoreChildren.includes(item.name)
        );
    }

    this.checkDefaultStoreroomAndSetupPage();
  }

  getDatasourceCopy(name, datasource, options) {
    return CommonUtil.getDatasourceCopy(name, datasource, options);
  }

  async computedCounts(shipItem, sessionKey) {
    // new datasource for SHIPMENTLINE and MATRECTRANSDS
    let newShipmentLineDS = this.getDatasourceCopy(
      `shipmentline-${shipItem.shipmentid}`,
      this.shipmentlineds,
      { notifyWhenParentLoads: false }
    );
    let newMatrectransDS = this.getDatasourceCopy(
      `shipmentmatrectrans-${shipItem.shipmentid}`,
      this.shipmentmatrectrans,
      { notifyWhenParentLoads: false }
    );
    let newAssetinputDS = this.getDatasourceCopy(
      `shipmentassetinput-${shipItem.shipmentid}`,
      this.shipassetinputds,
      { notifyWhenParentLoads: false }
    );

    const shipmentlineItemUrl = [
      shipItem.href,
      newShipmentLineDS.baseQuery.relationship,
    ].join("/");
    const matrectransItemUrl = [
      shipItem.href,
      newMatrectransDS.baseQuery.relationship,
    ].join("/");
    const assetinputItemUrl = [
      shipItem.href,
      newAssetinputDS.baseQuery.relationship,
    ].join("/");

    let promisePool = [];
    if (this.dataCache[shipmentlineItemUrl]) {
      newShipmentLineDS = this.dataCache[shipmentlineItemUrl];
    } else {
      this.dsshipmentlist.currentItem = shipItem;
      newShipmentLineDS.lastQuery.selectedRecordHref = shipItem.href;
      promisePool.push(
        newShipmentLineDS.load({
          noCache: true,
        })
      );
    }
    if (this.dataCache[matrectransItemUrl]) {
      newMatrectransDS = this.dataCache[matrectransItemUrl];
    } else {
      this.dsshipmentlist.currentItem = shipItem;
      newMatrectransDS.lastQuery.selectedRecordHref = shipItem.href;
      promisePool.push(
        newMatrectransDS.load({
          noCache: true,
        })
      );
    }
    if (this.dataCache[assetinputItemUrl]) {
      newAssetinputDS = this.dataCache[assetinputItemUrl];
    } else {
      this.dsshipmentlist.currentItem = shipItem;
      newAssetinputDS.lastQuery.selectedRecordHref = shipItem.href;
      promisePool.push(
        newAssetinputDS.load({
          noCache: true,
        })
      );
    }

    // istanbul ignore else
    if (promisePool.length) {
      await Promise.all(promisePool);
    }

    promisePool = [];
    newShipmentLineDS.items.forEach((item) => {
      promisePool.push(
        CommonUtil.computedRecInspRemaining(
          {
            shipmentmatrectransds: newMatrectransDS,
            mobilerecds: this.mobilerecDS,
            isMaximoMobile: this.app.device.isMaximoMobile,
          },
          item
        )
      );
    });

    promisePool.push(
      CommonUtil.computedOthersRemaining(
        {
          shipmentmatrectransds: newMatrectransDS,
          mobilerecds: this.mobilerecDS,
          mobilerotrecds: this.mobilerotrecds,
          isMaximoMobile: this.app.device.isMaximoMobile,
          shipmentlineitems: newShipmentLineDS.items,
        },
        shipItem.shipmentnum
      )
    );

    const results = await Promise.all(promisePool);
    // log.d(TAG, "result: %s: %s: %o", shipItem.shipmentnum, shipItem.href, results);
    const receiveList = [].concat.apply(
      [],
      results.map((result) => result[RECEIVE_PAGE] || [])
    );
    shipItem[RECECOUNT] = receiveList.length;
    // istanbul ignore else
    if (!this.dataCache[RECEIVE_PAGE].length) {
      this.dataCache[RECEIVE_PAGE][0] = {};
    }
    this.dataCache[RECEIVE_PAGE][0][shipItem.href] = receiveList;

    const inspectList = [].concat.apply(
      [],
      results.map((result) => result[INSPECT_PAGE] || [])
    );
    shipItem[INSPECTCOUNT] = inspectList.length;
    // istanbul ignore else
    if (!this.dataCache[INSPECT_PAGE].length) {
      this.dataCache[INSPECT_PAGE][0] = {};
      this.dataCache[INSPECT_PAGE][1] = {};
    }
    this.dataCache[INSPECT_PAGE][0][shipItem.href] = inspectList.filter(
      (item) => !item.rotating
    );
    this.dataCache[INSPECT_PAGE][1][shipItem.href] = inspectList.filter(
      (item) => item.rotating
    );

    shipItem[ASSETCOUNT] = newAssetinputDS.items.length;

    const returnList = [].concat.apply(
      [],
      results.map((result) => result[RETURN_PAGE] || [])
    );
    shipItem[RETURNCOUNT] = returnList.length;
    // istanbul ignore else
    if (!this.dataCache[RETURN_PAGE].length) {
      this.dataCache[RETURN_PAGE][0] = {};
    }
    this.dataCache[RETURN_PAGE][0][shipItem.href] = returnList;

    const receiptList = [].concat.apply(
      [],
      results.map((result) => result[RECEIPT_PAGE] || [])
    );
    shipItem[RECEIPTCOUNT] = receiptList.length;
    // istanbul ignore else
    if (!this.dataCache[RECEIPT_PAGE].length) {
      this.dataCache[RECEIPT_PAGE][0] = {};
    }
    this.dataCache[RECEIPT_PAGE][0][shipItem.href] = receiptList;

    const voidList = [].concat.apply(
      [],
      results.map((result) => result[VOID_PAGE] || [])
    );
    shipItem[VOIDCOUNT] = voidList.length;
    // istanbul ignore else
    if (!this.dataCache[VOID_PAGE].length) {
      this.dataCache[VOID_PAGE][0] = {};
    }
    this.dataCache[VOID_PAGE][0][shipItem.href] = voidList;

    // istanbul ignore else
    if (sessionKey === this.sessionKey) {
      this.dataLoadCompleted.push(shipItem.shipmentnum);
      // istanbul ignore else
      if (
        this.hideLoadingAhead &&
        this.dataLoadCompleted.length > LOADING_AHEAD
      ) {
        // hide loading icon before all finished
        this.page.updatePageLoadingState(false);
        this.hideLoadingAhead = false;
      }
    } else {
      log.d(TAG, "session key diff, skip...");
    }
  }

  onBeforeLoadData(dataSource) {
    const dsName = dataSource.name;
    // istanbul ignore else
    if (dsName === SHIPMENTDS) {
      this.sessionKey = new Date().getTime();
      this.dataLoadCompleted = [];
      this.hideLoadingAhead = true;
      // show loading icon
      this.page.updatePageLoadingState(true);
    }
  }

  async onAfterAllLoaded(sessionKey) {
    log.i(TAG, "all watched ds loaded");
    const promisePool = [];
    this.dsshipmentlist.getItems().forEach((item) => {
      // log.d(TAG, "item href: %s", item.href);
      promisePool.push(this.computedCounts(item, sessionKey));
    });
    await Promise.all(promisePool);
    // istanbul ignore else
    if (sessionKey === this.sessionKey) {
      // hide loading icon
      this.page.updatePageLoadingState(false);
    }
  }

  onAfterLoadData(dataSource, items) {
    const dsName = dataSource.name;
    // istanbul ignore else
    if (
      dataSource.dependsOn &&
      dataSource.lastQuery &&
      dataSource.lastQuery.selectedRecordHref
    ) {
      // cache this item
      const key = [
        dataSource.lastQuery.selectedRecordHref,
        dataSource.baseQuery.relationship,
      ].join("/");
      this.dataCache[key] = {
        name: dsName,
        items: items,
      };
    }
    // istanbul ignore else
    if (this.dsLoadedValue[dsName]) {
      this.dsLoadedStatus |= this.dsLoadedValue[dsName];
    }
    // istanbul ignore else
    if (this.dsLoadedStatus === ALL_WATCHED_DS_LOADED) {
      // log.d(TAG, "cached data: %o", this.dataCache);
      this.onAfterAllLoaded(this.sessionKey);
      this.dsLoadedStatus = 0;
    }
  }

  async setupPage() {
    // istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      const promisePool = [
        this.mobilerecDS.load({
          qbe: {},
          noCache: true,
          savedQuery: "CREATEDLOCALLY",
        }),
      ];
      await Promise.all(promisePool);
    }
    this.dsshipmentlist.load({ noCache: true, itemUrl: null });
  }

  goBack() {
    this.app.setCurrentPage({ name: SELECTION_PAGE });
  }

  async gotoDetailActionPage(event) {
    const options = {
      resetScroll: true,
      params: {
        shipmentnum: event.item.shipmentnum,
        href: event.item.href,
      },
    };

    const nameMap = {};
    nameMap[RECECOUNT] = {
      page: RECEIVE_PAGE,
      datasource: [this.shiprecds],
      countShow: true,
    };
    nameMap[INSPECTCOUNT] = {
      page: INSPECT_PAGE,
      datasource: [this.shipinpds, this.shipinpassetds],
      countShow: true,
    };
    nameMap[RETURNCOUNT] = {
      page: RETURN_PAGE,
      datasource: [this.shipreturnds],
      countShow: false,
    };
    nameMap[RECEIPTCOUNT] = {
      page: RECEIPT_PAGE,
      datasource: [this.shipreceiptds],
      countShow: false,
    };
    nameMap[ASSETCOUNT] = {
      page: ASSET_PAGE,
      datasource: [this.shipassetinputds],
      countShow: true,
    };
    nameMap[VOIDCOUNT] = {
      page: VOID_PAGE,
      datasource: [this.shipvoidds],
      countShow: false,
    };

    const name = Object.keys(nameMap).find((key) => {
      if (nameMap[key].countShow) {
        return event.type === key && event.item[key];
      } else {
        return event.type === key;
      }
    });

    // istanbul ignore else
    if (name) {
      options.name = nameMap[name].page;
      const ds = nameMap[name].datasource;
      const cache = this.dataCache[options.name];
      for (let index = 0; index < ds.length; index++) {
        // istanbul ignore else
        if (cache && cache[index] && cache[index][event.item.href]) {
          // log.d(TAG, "has cache: %s: %o", index, cache[index][event.item.href]);
          await CommonUtil.loadjsonds(ds[index], cache[index][event.item.href]);
        }
      }

      this.sessionKey = new Date().getTime();
      this.app.setCurrentPage(options);
    }
  }

  showShipmentActions(event) {
    // istanbul ignore else
    if (event && event.shipmentnum) {
      this.sessionKey = new Date().getTime();
      this.app.setCurrentPage({
        name: ACTION_PAGE,
        resetScroll: true,
        params: {
          shipmentnum: event.shipmentnum,
          href: event.href,
        },
      });
    }
  }
}

export default ShipmentPageController;
