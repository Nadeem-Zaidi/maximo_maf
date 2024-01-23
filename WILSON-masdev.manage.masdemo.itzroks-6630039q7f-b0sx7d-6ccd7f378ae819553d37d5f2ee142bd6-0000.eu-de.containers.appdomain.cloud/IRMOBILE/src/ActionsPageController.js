/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import { log } from "@maximo/maximo-js-api";
import CommonUtil from "./utils/CommonUtil";

const TAG = "ActionsPageController";

const POLINEDS = "dspolistPoline";
const RECEIVEDS = "receivejsonDS";
const POLISTMATRECTRANSDS = "dspolistMatrectrans";
const MATRECTRANSDS = "matrectransjsonDS";
const ASSETINPUTDS = "assetinputDs";
const ASSETRETURNDS = "assetreturnDs";

const RETURNRECEIPTINPUTDS = "returnrecjsonDs";
const VOIDRECEIPTINPUTDS = "voidrecjsonDs";
const RECEIPTDS = "receiptjsonDs";
const POLISTDS = "dspolist";
const ACTIONLISTDS = "actionListDS";
const ACTIONLISTDS2 = "actionListDS2";
const MOBILERECEIPTS = "mobileReceipts";
const MOBILEROTRECEIPTS = "mobileRotReceipts";

const MATCOUNT = "matcount";
const RECCOUNT = "reccount";
const ASSETCOUNT = "assetcount";
const RETURNCOUNT = "returncount";
const VOIDCOUNT = "voidcount";
const RECEIPTCOUNT = "receiptcount";

const RECEIVE_PAGE = "receivepage";
const INSPECT_PAGE = "inspectpage";
const ASSET_PAGE = "assetpage";
const RETURN_PAGE = "returnpage";
const VOID_PAGE = "voidpage";
const RECEIPT_PAGE = "receiptpage";

const POLISTDS_LOADED = 1;
const POLINEDS_LOADED = 2;
const POLISTMATRECTRANSDS_LOADED = 4;
const ASSETRETURNDS_LOADED = 8;
const ASSETINPUTDS_LOADED = 16;
const ALL_WATCHED_DS_LOADED =
  POLISTDS_LOADED |
  POLINEDS_LOADED |
  POLISTMATRECTRANSDS_LOADED |
  ASSETRETURNDS_LOADED |
  ASSETINPUTDS_LOADED;

class ActionsPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.dsLoadedValue = {};
    this.dsLoadedValue[POLISTDS] = POLISTDS_LOADED;
    this.dsLoadedValue[POLINEDS] = POLINEDS_LOADED;
    this.dsLoadedValue[POLISTMATRECTRANSDS] = POLISTMATRECTRANSDS_LOADED;
    this.dsLoadedValue[ASSETRETURNDS] = ASSETRETURNDS_LOADED;
    this.dsLoadedValue[ASSETINPUTDS] = ASSETINPUTDS_LOADED;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    page.state.ponum = page.params.ponum;
    page.state.href = page.params.href;

    page.state[MATCOUNT] = 0;
    page.state[RECCOUNT] = 0;
    page.state[ASSETCOUNT] = 0;
    page.state[RETURNCOUNT] = 0;
    page.state[VOIDCOUNT] = 0;
    page.state[RECEIPTCOUNT] = 0;

    this.polineds = app.findDatasource(POLINEDS);
    this.polistmatrectrans = app.findDatasource(POLISTMATRECTRANSDS);
    this.recds = app.findDatasource(RECEIVEDS);
    this.matds = app.findDatasource(MATRECTRANSDS);
    this.assetinputds = app.findDatasource(ASSETINPUTDS);
    this.assetrtds = app.findDatasource(ASSETRETURNDS);
    this.materialrtds = app.findDatasource(RETURNRECEIPTINPUTDS);
    this.voidreceiptinputds = app.findDatasource(VOIDRECEIPTINPUTDS);
    this.receiptds = app.findDatasource(RECEIPTDS);
    this.dspolist = app.findDatasource(POLISTDS);
    this.actionds = app.findDatasource(ACTIONLISTDS);
    this.actionds2 = app.findDatasource(ACTIONLISTDS2);
    this.mobilerecds = app.findDatasource(MOBILERECEIPTS);
    this.mobilerotrecds = app.findDatasource(MOBILEROTRECEIPTS);

    this.dsLoadedStatus = 0;

    this.actionMenu(page);
  }

  updateCounts(names) {
    const dsPool = [this.actionds, this.actionds2];
    dsPool.forEach((ds) => {
      // istanbul ignore else
      if (ds) {
        ds.getItems().filter((item) => {
          const name = item.tagfield;
          // istanbul ignore else
          if (names.includes(name)) {
            item.count = this.page.state[name];
            // istanbul ignore else
            if (item.countShow) {
              item.tagstring = this.page.state[name];
              return true;
            }
          }
          return false;
        });
      }
    });
  }

  async onAfterAllLoaded() {
    log.i(TAG, "Event: All watched DS loaded");

    // do calculations here
    let promisePool = [];
    this.polineds.getItems().forEach((item) => {
      promisePool.push(
        CommonUtil.computedRecInspRemaining(
          {
            matrectransds: this.polistmatrectrans,
            mobilerecds: this.mobilerecds,
            mobilerotrecds: this.mobilerotrecds,
            isMaximoMobile: this.app.device.isMaximoMobile,
          },
          item
        )
      );
    });
    promisePool.push(
      CommonUtil.computedOthersRemaining(
        {
          matrectransds: this.polistmatrectrans,
          mobilerecds: this.mobilerecds,
          mobilerotrecds: this.mobilerotrecds,
          isMaximoMobile: this.app.device.isMaximoMobile,
          polineitems: this.polineds.getItems(),
        },
        this.page.params.ponum
      )
    );
    const results = await Promise.all(promisePool);

    const receiveList = [].concat.apply(
      [],
      results.map((result) => result[RECEIVE_PAGE] || [])
    );
    this.page.state[RECCOUNT] = receiveList.length;

    const inspectList = [].concat.apply(
      [],
      results.map((result) => result[INSPECT_PAGE] || [])
    );
    this.page.state[MATCOUNT] = inspectList.length;

    const returnList = [].concat.apply(
      [],
      results.map((result) => result[RETURN_PAGE] || [])
    );
    this.page.state[RETURNCOUNT] =
      returnList.length +
      (this.app.device.isMaximoMobile ? 0 : this.assetrtds.getItems().length);

    const voidList = [].concat.apply(
      [],
      results.map((result) => result[VOID_PAGE] || [])
    );
    this.page.state[VOIDCOUNT] = voidList.length;

    // const assetList = [].concat.apply(
    //   [],
    //   results.map((result) => result[ASSET_PAGE] || [])
    // );
    // this.page.state[ASSETCOUNT] = assetList.length;

    this.page.state[ASSETCOUNT] = this.assetinputds.getItems().length;

    const receiptList = [].concat.apply(
      [],
      results.map((result) => result[RECEIPT_PAGE] || [])
    );
    this.page.state[RECEIPTCOUNT] = receiptList.length;

    this.updateCounts([
      RECCOUNT,
      MATCOUNT,
      RETURNCOUNT,
      VOIDCOUNT,
      ASSETCOUNT,
      RECEIPTCOUNT,
    ]);

    promisePool = [
      CommonUtil.loadjsonds(this.recds, receiveList),
      CommonUtil.loadjsonds(this.matds, inspectList),
      CommonUtil.loadjsonds(this.materialrtds, returnList),
      CommonUtil.loadjsonds(this.voidreceiptinputds, voidList),
      CommonUtil.loadjsonds(this.receiptds, receiptList),
    ];
    await Promise.all(promisePool);

    // hide loading icon
    this.page.updatePageLoadingState(false);
  }

  onAfterLoadData(dataSource, items) {
    const dsName = dataSource.name;
    // istanbul ignore else
    if (this.dsLoadedValue[dsName]) {
      this.dsLoadedStatus |= this.dsLoadedValue[dsName];
      // istanbul ignore else
      if (this.dsLoadedStatus === ALL_WATCHED_DS_LOADED) {
        this.onAfterAllLoaded();
        this.dsLoadedStatus = 0;
      }
    }
  }

  goBack() {
    this.app.setCurrentPage({
      name: "polist",
    });
  }

  async actionMenu(page) {
    // show loading icon
    this.page.updatePageLoadingState(true);

    // istanbul ignore else
    if (this.actionds) {
      CommonUtil.resetDataSource(this.actionds);
      this.actionds.lastQuery = {};
      let actionitems = [
        {
          _id: 0,
          label: this.app.getLocalizedLabel("Receive", "Receive"),
          icon: "carbon:inventory-management",
          countShow: true,
          count: this.page.state[RECCOUNT],
          tagfield: RECCOUNT,
          tagstring: this.page.state[RECCOUNT],
        },
        {
          _id: 1,
          label: this.app.getLocalizedLabel("Inspect", "Inspect"),
          icon: "maximo:inspections",
          countShow: true,
          count: this.page.state[MATCOUNT],
          tagfield: MATCOUNT,
          tagstring: this.page.state[MATCOUNT],
        },
        {
          _id: 2,
          label: this.app.getLocalizedLabel("CreateAssets", "Create assets"),
          icon: "maximo:asset--add",
          countShow: true,
          count: page.state[ASSETCOUNT],
          tagfield: ASSETCOUNT,
          tagstring: page.state[ASSETCOUNT],
        },
        {
          _id: 3,
          label: this.app.getLocalizedLabel("Return", "Return"),
          icon: "carbon:movement",
          countShow: false,
          count: this.page.state[RETURNCOUNT],
          tagfield: RETURNCOUNT,
          tagstring: 0,
        },
      ];
      // istanbul ignore else
      if (this.app.device.isMaximoMobile) {
        actionitems.splice(2, 1);
      }
      await this.actionds.load({
        src: {
          items: actionitems,
        },
      });
    }

    // istanbul ignore else
    if (this.actionds2) {
      CommonUtil.resetDataSource(this.actionds2);
      this.actionds2.lastQuery = {};
      await this.actionds2.load({
        src: {
          items: [
            {
              _id: 1,
              label: this.app.getLocalizedLabel("Receipts", "Receipts"),
              icon: "carbon:receipt",
              countShow: false,
              count: 0,
              tagfield: RECEIPTCOUNT,
              tagstring: 0,
            },
            {
              _id: 2,
              label: this.app.getLocalizedLabel("Void", "Void"),
              icon: "carbon:error-outline",
              countShow: false,
              count: page.state[VOIDCOUNT],
              tagfield: VOIDCOUNT,
              tagstring: 0,
            },
          ],
        },
      });
    }

    // istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      const promisePool = [
        this.mobilerecds.load({
          qbe: {},
          noCache: true,
          savedQuery: "CREATEDLOCALLY",
        }),
        // this.mobilerotrecds.load({
        //   qbe: {},
        //   noCache: true,
        //   savedQuery: "CREATEDLOCALLY",
        // }),
      ];
      await Promise.all(promisePool);
    }

    this.dspolist.load({ noCache: true, itemUrl: page.params.href });
  }

  gotoDetailActionPage(event) {
    const options = {
      resetScroll: true,
      params: {
        ponum: this.page.state.ponum,
        href: this.page.state.href,
      },
    };

    const nameMap = {};
    nameMap[RECCOUNT] = {
      ds: [this.recds],
      page: RECEIVE_PAGE,
    };
    nameMap[MATCOUNT] = {
      ds: [this.matds],
      page: INSPECT_PAGE,
    };
    nameMap[ASSETCOUNT] = {
      ds: [this.assetinputds],
      page: ASSET_PAGE,
    };
    nameMap[RETURNCOUNT] = {
      ds: [this.assetrtds, this.materialrtds],
      page: RETURN_PAGE,
    };
    nameMap[VOIDCOUNT] = {
      ds: [this.voidreceiptinputds],
      page: VOID_PAGE,
    };
    nameMap[RECEIPTCOUNT] = {
      ds: [this.receiptds],
      page: RECEIPT_PAGE,
    };

    const name = Object.keys(nameMap).find(
      (key) => event.tagfield === key && this.page.state[key]
    );

    // istanbul ignore else
    if (name) {
      nameMap[name].ds.forEach((ds) => {
        ds.clearSelections();
      });
      options.name = nameMap[name].page;
      this.app.setCurrentPage(options);
    }
  }
}

export default ActionsPageController;
