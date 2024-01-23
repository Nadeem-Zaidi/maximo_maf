/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = "ShipmentAssetPageController";
const SHIPMENTDS = "shipmentDS";
const SHIPMENTLINEDS = "shipmentlineDS";
const SHIPMENT_MATRECTRANSDS = "shipmentMatrectransDS";
const SHIPMENT_ASSETINPUTDS = "shipmentassetinputDS";

const SHIPMENTDS_LOADED = 1;
const SHIPMENTLINDS_LOADED = 2;
const SHIPMEN_MATRECTRANSDS_LOADED = 4;
const SHIPMEN_ASSETINPUTDS_LOADED = 8;
const ALL_WATCHED_DS_LOADED =
  SHIPMENTDS_LOADED |
  SHIPMENTLINDS_LOADED |
  SHIPMEN_MATRECTRANSDS_LOADED |
  SHIPMEN_ASSETINPUTDS_LOADED;

class ShipmentAssetPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.shipmentDS = this.app.findDatasource(SHIPMENTDS);
    this.shipmentlineds = this.app.findDatasource(SHIPMENTLINEDS);
    this.shipmentmatrectrans = this.app.findDatasource(SHIPMENT_MATRECTRANSDS);
    this.shipment_assetinputDS = this.app.findDatasource(SHIPMENT_ASSETINPUTDS);
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.isfromsave = false;

    this.page.state.enablesave = false;

    this.dsLoadedStatus = 0;
    this.dsLoadedValue = {};
    this.dsLoadedValue[SHIPMENTDS] = SHIPMENTDS_LOADED;
    this.dsLoadedValue[SHIPMENTLINEDS] = SHIPMENTLINDS_LOADED;
    this.dsLoadedValue[SHIPMENT_MATRECTRANSDS] = SHIPMEN_MATRECTRANSDS_LOADED;
    this.dsLoadedValue[SHIPMENT_ASSETINPUTDS] = SHIPMEN_ASSETINPUTDS_LOADED;

    const requiredChildren = [
      this.shipmentlineds,
      this.shipmentmatrectrans,
      this.shipment_assetinputDS,
    ];
    // istanbul ignore else
    if (this.shipmentDS.childrenToLoad) {
      requiredChildren.forEach((ds) => {
        const dsToLoad = this.shipmentDS.childrenToLoad.find(
          (item) => item.name === ds.name
        );
        // istanbul ignore else
        if (!dsToLoad) {
          this.shipmentDS.childrenToLoad.push(ds);
        }
      });
    }

    this.shipmentDS.load({ noCache: true, itemUrl: this.page.params.href });
  }

  onBeforeLoadData(dataSource) {
    const dsName = dataSource.name;
    // istanbul ignore else
    if (dsName === SHIPMENTDS) {
      // show loading icon
      this.page.updatePageLoadingState(true);
    }
  }

  onAfterLoadData(dataSource, items) {
    const dsName = dataSource.name;
    // istanbul ignore else
    if (this.dsLoadedValue[dsName]) {
      this.dsLoadedStatus |= this.dsLoadedValue[dsName];
    }
    // istanbul ignore else
    if (this.dsLoadedStatus === ALL_WATCHED_DS_LOADED) {
      this.dsLoadedStatus = 0;
      this.page.updatePageLoadingState(false);
    }
  }

  goBack() {
    this.app.setCurrentPage({
      name: "shipmentactions",
      params: {
        href: this.page.params.href,
        shipmentnum: this.page.params.shipmentnum,
      },
    });
  }

  async createAsset() {
    // get all items, we don't have checkbox to select
    let selectedItems = this.shipment_assetinputDS.getItems();
    //istanbul ignore else
    if (selectedItems.length > 0) {
      this.page.updatePageLoadingState(true);
      this.isfromsave = true;
      let itemlist = [];
      for (let i = 0; i < selectedItems.length; i++) {
        const item = {};
        item.matrectransid = selectedItems[i].matrectransid;
        item.assetnum = selectedItems[i].assetnum;
        item.serialnum = selectedItems[i].serialnum;
        itemlist.push(item);
      }
      let action = "createAssetsForShipment";
      try {
        let option = {
          record: this.shipmentDS.getItems()[0],
          waitForUpload: true,
          parameters: {
            datalist: itemlist,
          },

          localPayload: {
            datalist: itemlist,
          },
          query: { interactive: false },
        };

        let response = await this.shipmentDS.invokeAction(action, option);

        //Display message
        //istanbul ignore else
        if (response) {
          this.page.state.enablesave = false;
          let message = this.app.getLocalizedLabel(
            "asset_done_ms",
            "{0} asset(s) created",
            [selectedItems.length]
          );
          this.app.toast(message, "success");
        }
      } catch (error) {
        // istanbul ignore next
        log.t(TAG, error);
      }
      this.page.updatePageLoadingState(false);
      this.shipmentDS.load({ noCache: true, itemUrl: this.page.params.href });
    }
  }
}

export default ShipmentAssetPageController;
