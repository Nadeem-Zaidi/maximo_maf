/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/* eslint-disable no-console */

import { log } from "@maximo/maximo-js-api";
import CommonUtil from "./utils/CommonUtil";

const TAG = "POListPageController";

const POLINEDS = "dspolistPoline";
const MATRECTRANSDS = "dspolistMatrectrans";
const POLISTDS = "dspolist";
const MOBILE_RECEIPTS = "mobileReceipts";
const MOBILE_ROT_RECEIPTS = "mobileRotReceipts";
const ASSETRETURNDS = "assetreturnDs";

const RECEIPTDS = "receiptjsonDs";

const RECEIVEDS = "receivejsonDS";
const INSPECTINPUTDS = "matrectransjsonDS";
const ASSETINPUTDS = "assetinputDs";
const RETURNRECEIPTINPUTDS = "returnrecjsonDs";

const INSPECTCOUNT = "inspectCountNum";
const RECECOUNT = "receiveCountNum";
const ASSETCOUNT = "assetCountNum";
const RETURNCOUNT = "returnCountNum";
const RECEIPTCOUNT = "receiptCountNum";

const RECEIVE_PAGE = "receivepage";
const INSPECT_PAGE = "inspectpage";
const RETURN_PAGE = "returnpage";
const ASSET_PAGE = "assetpage";
const RECEIPT_PAGE = "receiptpage";

const POLISTDS_LOADED = 1;
const POLINEDS_LOADED = 2;
const MATRECTRANSDS_LOADED = 4;
const ASSETRETURNDS_LOADED = 8;
const ASSETINPUTDS_LOADED = 16;
const ALL_WATCHED_DS_LOADED =
  POLISTDS_LOADED |
  POLINEDS_LOADED |
  MATRECTRANSDS_LOADED |
  ASSETRETURNDS_LOADED |
  ASSETINPUTDS_LOADED;

const LOADING_AHEAD = 5;

class POListPageController {
  pageInitialized(page, app) {
    this.page = page;
    this.app = app;

    this.polistDS = app.findDatasource(POLISTDS);
    this.polineDS = app.findDatasource(POLINEDS);
    this.matrectransDS = app.findDatasource(MATRECTRANSDS);
    this.mobilerecDS = app.findDatasource(MOBILE_RECEIPTS);
    this.mobilerotrecDS = app.findDatasource(MOBILE_ROT_RECEIPTS);
    this.assetrtDS = app.findDatasource(ASSETRETURNDS);
    this.assetinputDS = app.findDatasource(ASSETINPUTDS);

    this.recds = app.findDatasource(RECEIVEDS);
    this.matds = app.findDatasource(INSPECTINPUTDS);
    this.materialrtds = app.findDatasource(RETURNRECEIPTINPUTDS);
    this.receiptds = app.findDatasource(RECEIPTDS);

    this.dsLoadedValue = {};
    this.dsLoadedValue[POLISTDS] = POLISTDS_LOADED;
    this.dsLoadedValue[POLINEDS] = POLINEDS_LOADED;
    this.dsLoadedValue[MATRECTRANSDS] = MATRECTRANSDS_LOADED;
    this.dsLoadedValue[ASSETRETURNDS] = ASSETRETURNDS_LOADED;
    this.dsLoadedValue[ASSETINPUTDS] = ASSETINPUTDS_LOADED;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.dataCache = {};
    this.dataCache[RECEIVE_PAGE] = {};
    this.dataCache[INSPECT_PAGE] = {};
    this.dataCache[ASSET_PAGE] = {};
    this.dataCache[RETURN_PAGE] = {};
    this.dataCache[RECEIPT_PAGE] = {};

    this.dsLoadedStatus = 0;

    this.checkDefaultStoreroomAndSetupPage();
  }

  async checkUser() {
    let myuserJson = await this.app.client.restclient.get("/myuser");
    return myuserJson?.defstoreroom;
  }

  async checkDefaultStoreroomAndSetupPage() {
    this.page.state.emptypolist = this.app.getLocalizedLabel(
      "no_po_found",
      "No purchase order found"
    );
    let canSetupPage =
      this.polistDS.getItems().length ||
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

  async setupPage() {
    // istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      const promisePool = [
        this.mobilerecDS.load({
          qbe: {},
          noCache: true,
          savedQuery: "CREATEDLOCALLY",
        }),
        // this.mobilerotrecDS.load({
        //   qbe: {},
        //   noCache: true,
        //   savedQuery: "CREATEDLOCALLY",
        // }),
      ];
      await Promise.all(promisePool);
    }
    this.polistDS.load({ noCache: true, itemUrl: null });
  }

  getDatasourceCopy(name, datasource, options) {
    return CommonUtil.getDatasourceCopy(name, datasource, options);
  }

  async computedCounts(poItem, sessionKey) {
    // log.d(TAG, "href: %s", poItem.href);
    // new datasource for POLINEDS and MATRECTRANSDS
    let newPOLineDS = this.getDatasourceCopy(
      `poline-${poItem.poid}`,
      this.polineDS,
      { notifyWhenParentLoads: false }
    );
    let newMatrectransDS = this.getDatasourceCopy(
      `matrectrans-${poItem.poid}`,
      this.matrectransDS,
      { notifyWhenParentLoads: false }
    );
    let newAssetrtDS = this.getDatasourceCopy(
      `assetrt-${poItem.poid}`,
      this.assetrtDS,
      { notifyWhenParentLoads: false }
    );
    let newAssetinputDS = this.getDatasourceCopy(
      `assetinput-${poItem.poid}`,
      this.assetinputDS,
      { notifyWhenParentLoads: false }
    );

    const polineItemUrl = [
      poItem.href,
      newPOLineDS.baseQuery.relationship,
    ].join("/");
    const matrectransItemUrl = [
      poItem.href,
      newMatrectransDS.baseQuery.relationship,
    ].join("/");
    const assetrtItemUrl = [
      poItem.href,
      newAssetrtDS.baseQuery.relationship,
    ].join("/");
    const assetinputItemUrl = [
      poItem.href,
      newAssetinputDS.baseQuery.relationship,
    ].join("/");

    let promisePool = [];
    if (this.dataCache[polineItemUrl]) {
      newPOLineDS = this.dataCache[polineItemUrl];
    } else {
      this.polistDS.currentItem = poItem;
      newPOLineDS.lastQuery.selectedRecordHref = poItem.href;
      promisePool.push(
        newPOLineDS.load({
          noCache: true,
        })
      );
    }
    if (this.dataCache[matrectransItemUrl]) {
      newMatrectransDS = this.dataCache[matrectransItemUrl];
    } else {
      this.polistDS.currentItem = poItem;
      newMatrectransDS.lastQuery.selectedRecordHref = poItem.href;
      promisePool.push(
        newMatrectransDS.load({
          noCache: true,
        })
      );
    }
    if (this.dataCache[assetrtItemUrl]) {
      newAssetrtDS = this.dataCache[assetrtItemUrl];
    } else {
      this.polistDS.currentItem = poItem;
      newAssetrtDS.lastQuery.selectedRecordHref = poItem.href;
      promisePool.push(
        newAssetrtDS.load({
          noCache: true,
        })
      );
    }
    if (this.dataCache[assetinputItemUrl]) {
      newAssetinputDS = this.dataCache[assetinputItemUrl];
    } else {
      this.polistDS.currentItem = poItem;
      newAssetinputDS.lastQuery.selectedRecordHref = poItem.href;
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
    newPOLineDS.items.forEach((item) => {
      promisePool.push(
        CommonUtil.computedRecInspRemaining(
          {
            matrectransds: newMatrectransDS,
            mobilerecds: this.mobilerecDS,
            mobilerotrecds: this.mobilerotrecDS,
            isMaximoMobile: this.app.device.isMaximoMobile,
          },
          item
        )
      );
    });

    promisePool.push(
      CommonUtil.computedOthersRemaining(
        {
          matrectransds: newMatrectransDS,
          mobilerecds: this.mobilerecDS,
          mobilerotrecds: this.mobilerotrecDS,
          isMaximoMobile: this.app.device.isMaximoMobile,
          polineitems: newPOLineDS.items,
        },
        poItem.ponum
      )
    );

    const results = await Promise.all(promisePool);
    const receiveList = [].concat.apply(
      [],
      results.map((result) => result[RECEIVE_PAGE] || [])
    );
    poItem[RECECOUNT] = receiveList.length;
    this.dataCache[RECEIVE_PAGE][poItem.href] = receiveList;

    const inspectList = [].concat.apply(
      [],
      results.map((result) => result[INSPECT_PAGE] || [])
    );
    poItem[INSPECTCOUNT] = inspectList.length;
    this.dataCache[INSPECT_PAGE][poItem.href] = inspectList;

    // const assetList = [].concat.apply(
    //   [],
    //   results.map((result) => result[ASSET_PAGE] || [])
    // );
    // poItem[ASSETCOUNT] = assetList.length;
    // this.dataCache[ASSET_PAGE][poItem.href] = assetList;

    poItem[ASSETCOUNT] = newAssetinputDS.items.length;

    const returnList = [].concat.apply(
      [],
      results.map((result) => result[RETURN_PAGE] || [])
    );
    // istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      poItem[RETURNCOUNT] = returnList.length + newAssetrtDS.items.length;
    } else {
      poItem[RETURNCOUNT] = returnList.length;
    }
    this.dataCache[RETURN_PAGE][poItem.href] = returnList;

    const receiptList = [].concat.apply(
      [],
      results.map((result) => result[RECEIPT_PAGE] || [])
    );
    poItem[RECEIPTCOUNT] = receiptList.length;
    this.dataCache[RECEIPT_PAGE][poItem.href] = receiptList;
    // istanbul ignore else
    if (sessionKey === this.sessionKey) {
      this.dataLoadCompleted.push(poItem.ponum);
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
    if (dsName === POLISTDS) {
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
    this.polistDS.getItems().forEach((item) => {
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
    if (this.dsLoadedValue[dsName]) {
      this.dsLoadedStatus |= this.dsLoadedValue[dsName];
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
          items: items,
        };
      }
    }
    // istanbul ignore else
    if (this.dsLoadedStatus === ALL_WATCHED_DS_LOADED) {
      // log.d(TAG, "cached data: %o", this.dataCache);
      this.onAfterAllLoaded(this.sessionKey);
      this.dsLoadedStatus = 0;
    }
  }

  /**
   * Redirects to details page
   */
  showReceivingActions(event) {
    // istanbul ignore else
    if (event && event.ponum) {
      this.sessionKey = new Date().getTime();
      this.app.setCurrentPage({
        name: "recactions",
        resetScroll: true,
        params: {
          ponum: event.ponum,
          href: event.href,
        },
      });
    }
  }

  async gotoDetailActionPage(event) {
    const options = {
      resetScroll: true,
      params: {
        ponum: event.item.ponum,
        href: event.item.href,
        setupdata: true,
      },
    };

    const nameMap = {};
    nameMap[RECECOUNT] = {
      page: RECEIVE_PAGE,
      datasource: this.recds,
      countShow: true,
    };
    nameMap[INSPECTCOUNT] = {
      page: INSPECT_PAGE,
      datasource: this.matds,
      countShow: true,
    };
    nameMap[RETURNCOUNT] = {
      page: RETURN_PAGE,
      datasource: this.materialrtds,
      countShow: false,
    };
    nameMap[RECEIPTCOUNT] = {
      page: RECEIPT_PAGE,
      datasource: this.receiptds,
      countShow: true,
    };
    nameMap[ASSETCOUNT] = {
      page: ASSET_PAGE,
      countShow: true,
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
      // istanbul ignore else
      if (cache && cache[event.item.href] && ds) {
        // log.d(TAG, "has cache: %o", cache[event.item.href]);
        await CommonUtil.loadjsonds(ds, cache[event.item.href]);
      }
      this.sessionKey = new Date().getTime();
      this.app.setCurrentPage(options);
    }
  }

  goBack() {
    this.app.setCurrentPage({ name: "receivingSelection" });
  }
}
export default POListPageController;
