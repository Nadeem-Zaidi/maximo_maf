/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import CommonUtil from "./utils/ShipmentCommonUtil";
const TAG = "ShipmentActionsPageController";

const SHIPMENTLINEDS = "shipmentlineDS";
const SHIPRECEIVEDS = "shipmentreceivejsonDS";
const SHIPINSPECTDS = "shipmentinspectjsonDS";
const SHIPINSPECTASSETDS = "shipmentinspectassetjsonDS";
const SHIPRETURNDS = "shipmentreturnrecjsonDS";
const SHIPVOIDDS = "shipmentvoidrecjsonDS";
const SHIPASSETINPUTDS = "shipmentassetinputDS";
const SHIPMENTMATRECTRANSDS = "shipmentMatrectransDS";
const SHIPACTIONLISTDS = "shipmentactionListDS";
const SHIPACTIONLISTDS2 = "shipmentactionListDS2";
const SHIPMENTDS = "shipmentDS";
const SHIPRECEIPTDS = "shipmentreceiptjsonDs";
const SHIPMOBILERECEIPTS = "mobileReceipts";

const SHIPINPCOUNT = "shipinpcount";
const SHIPRECCOUNT = "shipreccount";
const SHIPASSETCOUNT = "shipassetcount";
const SHIPRETURNCOUNT = "shipreturncount";
const SHIPVOIDCOUNT = "shipvoidcount";
const SHIPRECEIPTCOUNT = "shipreceiptcount";

const SHIPRECEIVE_PAGE = "shipmentreceivepage";
const SHIPINSPECT_PAGE = "shipmentinspectpage";
const SHIPASSET_PAGE = "shipmentassetpage";
const SHIPRETURN_PAGE = "shipmentreturnpage";
const SHIPVOID_PAGE = "shipmentvoidpage";
const SHIPRECEIPT_PAGE = "shipmentreceiptpage";

const SHIPMENTDS_LOADED = 1;
const SHIPMENTLINEDS_LOADED = 2;
const SHIPMENTMATRECTRANSDS_LOADED = 4;
const SHIPMENTASSETINPUTDS_LOADED = 8;
const ALL_WATCHED_DS_LOADED =
  SHIPMENTDS_LOADED |
  SHIPMENTLINEDS_LOADED |
  SHIPMENTMATRECTRANSDS_LOADED |
  SHIPMENTASSETINPUTDS_LOADED;

class ShipmentActionsPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.dsLoadedValue = {};
    this.dsLoadedValue[SHIPMENTDS] = SHIPMENTDS_LOADED;
    this.dsLoadedValue[SHIPMENTLINEDS] = SHIPMENTLINEDS_LOADED;
    this.dsLoadedValue[SHIPMENTMATRECTRANSDS] = SHIPMENTMATRECTRANSDS_LOADED;
    this.dsLoadedValue[SHIPASSETINPUTDS] = SHIPMENTASSETINPUTDS_LOADED;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    page.state.shipmentnum = page.params.shipmentnum;
    page.state.href = page.params.href;
    page.state[SHIPINPCOUNT] = 0;
    page.state[SHIPRECCOUNT] = 0;
    page.state[SHIPASSETCOUNT] = 0;
    page.state[SHIPRETURNCOUNT] = 0;
    page.state[SHIPVOIDCOUNT] = 0;
    page.state[SHIPRECEIPTCOUNT] = 0;

    this.actionds = app.findDatasource(SHIPACTIONLISTDS);
    this.actionds2 = app.findDatasource(SHIPACTIONLISTDS2);
    this.shipmentlineds = app.findDatasource(SHIPMENTLINEDS);
    this.dsshipmentlist = app.findDatasource(SHIPMENTDS);
    this.shiprecds = app.findDatasource(SHIPRECEIVEDS);
    this.shipinpds = app.findDatasource(SHIPINSPECTDS);
    this.shipinpassetds = app.findDatasource(SHIPINSPECTASSETDS);
    this.shipreturnds = app.findDatasource(SHIPRETURNDS);
    this.shipvoidds = app.findDatasource(SHIPVOIDDS);
    this.shipassetinputds = app.findDatasource(SHIPASSETINPUTDS);
    this.shipmentmatrectrans = app.findDatasource(SHIPMENTMATRECTRANSDS);
    this.shipreceiptds = app.findDatasource(SHIPRECEIPTDS);
    this.shipmobilerecds = app.findDatasource(SHIPMOBILERECEIPTS);

    const requiredChildren = [
      this.shipmentlineds,
      this.shipmentmatrectrans,
      this.shipassetinputds,
    ];
    // istanbul ignore else
    if (this.dsshipmentlist.childrenToLoad) {
      requiredChildren.forEach((ds) => {
        const dsToLoad = this.dsshipmentlist.childrenToLoad.find(
          (item) => item.name === ds.name
        );
        // istanbul ignore else
        if (!dsToLoad) {
          this.dsshipmentlist.childrenToLoad.push(ds);
        }
      });
    }

    this.dsLoadedStatus = 0;
    this.actionMenu(page);
  }

  goBack() {
    this.app.setCurrentPage({
      name: "shipment",
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
          count: this.page.state[SHIPRECCOUNT],
          tagfield: SHIPRECCOUNT,
          tagstring: false,
        },
        {
          _id: 1,
          label: this.app.getLocalizedLabel("Inspect", "Inspect"),
          icon: "maximo:inspections",
          countShow: true,
          count: this.page.state[SHIPINPCOUNT],
          tagfield: SHIPINPCOUNT,
          tagstring: false,
        },
        {
          _id: 2,
          label: this.app.getLocalizedLabel("CreateAssets", "Create assets"),
          icon: "maximo:asset--add",
          countShow: true,
          count: page.state[SHIPASSETCOUNT],
          tagfield: SHIPASSETCOUNT,
          tagstring: false,
        },
        {
          _id: 3,
          label: this.app.getLocalizedLabel("Return", "Return"),
          icon: "carbon:movement",
          countShow: true,
          count: this.page.state[SHIPRETURNCOUNT],
          tagfield: SHIPRETURNCOUNT,
          tagstring: false,
        },
      ];
      //istanbul ignore else
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
              tagfield: SHIPRECEIPTCOUNT,
              tagstring: false,
            },
            {
              _id: 2,
              label: this.app.getLocalizedLabel("Void", "Void"),
              icon: "carbon:error-outline",
              countShow: true,
              count: page.state[SHIPVOIDCOUNT],
              tagfield: SHIPVOIDCOUNT,
              tagstring: false,
            },
          ],
        },
      });
    }
    this.dsshipmentlist.load({ noCache: true, itemUrl: page.state.href });
  }

  gotoDetailActionPage(event) {
    const options = {
      resetScroll: true,
      params: {
        shipmentnum: this.page.state.shipmentnum,
        href: this.page.state.href,
      },
    };

    const nameMap = {};
    nameMap[SHIPRECCOUNT] = {
      ds: [this.shiprecds],
      page: SHIPRECEIVE_PAGE,
    };

    nameMap[SHIPINPCOUNT] = {
      ds: [this.shipinpds, this.shipinpassetds],
      page: SHIPINSPECT_PAGE,
    };

    nameMap[SHIPASSETCOUNT] = {
      ds: [this.shipassetinputds],
      page: SHIPASSET_PAGE,
    };

    nameMap[SHIPRETURNCOUNT] = {
      ds: [this.shipreturnds],
      page: SHIPRETURN_PAGE,
    };

    nameMap[SHIPVOIDCOUNT] = {
      ds: [this.shipvoidds],
      page: SHIPVOID_PAGE,
    };

    nameMap[SHIPRECEIPTCOUNT] = {
      ds: [this.shipreceiptds],
      page: SHIPRECEIPT_PAGE,
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

  async onAfterAllLoaded() {
    log.i(TAG, "Event: All watched DS loaded");

    // do calculations here
    let promisePool = [];
    this.shipmentlineds.getItems().forEach((item) => {
      promisePool.push(
        CommonUtil.computedRecInspRemaining(
          {
            shipmentmatrectransds: this.shipmentmatrectrans,
            mobilerecds: this.shipmobilerecds,
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
          shipmentmatrectransds: this.shipmentmatrectrans,
          mobilerecds: this.shipmobilerecds,
          mobilerotrecds: this.mobilerotrecds,
          isMaximoMobile: this.app.device.isMaximoMobile,
          shipmentlineitems: this.shipmentlineds.getItems(),
        },
        this.page.state.shipmentnum
      )
    );
    const results = await Promise.all(promisePool);

    const shipreceiveList = [].concat.apply(
      [],
      results.map((result) => result[SHIPRECEIVE_PAGE] || [])
    );
    this.page.state[SHIPRECCOUNT] = shipreceiveList.length;
    const shipinspectList = [].concat.apply(
      [],
      results.map((result) => result[SHIPINSPECT_PAGE] || [])
    );
    this.page.state[SHIPINPCOUNT] = shipinspectList.length;

    const shipreturnList = [].concat.apply(
      [],
      results.map((result) => result[SHIPRETURN_PAGE] || [])
    );
    this.page.state[SHIPRETURNCOUNT] = shipreturnList.length;
    // +
    // (this.app.device.isMaximoMobile ? 0 : this.assetrtds.getItems().length);

    const shipvoidList = [].concat.apply(
      [],
      results.map((result) => result[SHIPVOID_PAGE] || [])
    );
    this.page.state[SHIPVOIDCOUNT] = shipvoidList.length;

    // const shipassetList = [].concat.apply(
    //   [],
    //   results.map((result) => result[ASSET_PAGE] || [])
    // );
    // this.page.state[ASSETCOUNT] = assetList.length;

    this.page.state[SHIPASSETCOUNT] = this.shipassetinputds.getItems().length;

    const shipreceiptList = [].concat.apply(
      [],
      results.map((result) => result[SHIPRECEIPT_PAGE] || [])
    );
    this.page.state[SHIPRECEIPTCOUNT] = shipreceiptList.length;

    this.updateCounts([
      SHIPRECCOUNT,
      SHIPINPCOUNT,
      SHIPRETURNCOUNT,
      SHIPVOIDCOUNT,
      SHIPASSETCOUNT,
      SHIPRECEIPTCOUNT,
    ]);

    // istanbul ignore next
    const shipinspectMaterialList = shipinspectList.filter(
      (item) => !item.rotating
    );
    // istanbul ignore next
    const shipinspectAssetList = shipinspectList.filter(
      (item) => item.rotating
    );

    promisePool = [
      CommonUtil.loadjsonds(this.shiprecds, shipreceiveList),
      // split the data for shipinpds and shipinpassetds
      CommonUtil.loadjsonds(this.shipinpds, shipinspectMaterialList),
      CommonUtil.loadjsonds(this.shipinpassetds, shipinspectAssetList),
      CommonUtil.loadjsonds(this.shipreturnds, shipreturnList),
      CommonUtil.loadjsonds(this.shipvoidds, shipvoidList),
      CommonUtil.loadjsonds(this.shipreceiptds, shipreceiptList),
    ];
    await Promise.all(promisePool);

    // hide loading icon
    this.page.updatePageLoadingState(false);
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
}

export default ShipmentActionsPageController;
