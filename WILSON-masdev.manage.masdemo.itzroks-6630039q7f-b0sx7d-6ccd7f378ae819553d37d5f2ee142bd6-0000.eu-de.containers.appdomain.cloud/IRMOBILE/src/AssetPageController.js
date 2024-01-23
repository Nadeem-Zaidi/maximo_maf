/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = "AssetPageController";
const POLINEDS = "dspolistPoline";
const MATRECTRANSDS = "dspolistMatrectrans";
const POLISTDS = "dspolist";
const ASSETRETURNDS = "assetreturnDs";
const ASSETINPUTDS = "assetinputDs";

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

class AssetPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.dspolist = this.app.findDatasource(POLISTDS);
    this.assetinputDs = this.app.findDatasource(ASSETINPUTDS);
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.isfromsave = false;

    this.dsLoadedStatus = 0;
    this.dsLoadedValue = {};
    this.dsLoadedValue[POLISTDS] = POLISTDS_LOADED;
    this.dsLoadedValue[POLINEDS] = POLINEDS_LOADED;
    this.dsLoadedValue[MATRECTRANSDS] = MATRECTRANSDS_LOADED;
    this.dsLoadedValue[ASSETRETURNDS] = ASSETRETURNDS_LOADED;
    this.dsLoadedValue[ASSETINPUTDS] = ASSETINPUTDS_LOADED;

    this.dspolist.load({ noCache: true, itemUrl: this.page.params.href });
    this.page.state.cansave = true;
  }

  onBeforeLoadData(dataSource) {
    const dsName = dataSource.name;
    // istanbul ignore else
    if (dsName === POLISTDS) {
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
    // this.app.navigateBack();
    this.app.setCurrentPage({
      name: "recactions",
      params: {
        href: this.page.params.href,
        ponum: this.page.params.ponum,
      },
    });
  }

  async createAsset() {
    // get all items, we don't have checkbox to select
    let selectedItems = this.assetinputDs.getItems();
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
      let action = "createAssetsForIR";
      try {
        let option = {
          record: this.dspolist.getItems()[0],
          waitForUpload: true,
          parameters: {
            datalist: itemlist,
          },

          localPayload: {
            datalist: itemlist,
          },
          query: { interactive: false },
        };

        let response = await this.dspolist.invokeAction(action, option);

        //Display message
        //istanbul ignore else
        if (response) {
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
      this.dspolist.load({ noCache: true, itemUrl: this.page.params.href });
    }
  }

  validateInput(event) {
    const invalidinputMessage = this.app.getLocalizedLabel(
      "invalidinput",
      "Asset number should be unique."
    );
    let checkItems = this.assetinputDs.getItems();
    const assetMap = {};
    for (let i = 0; i < checkItems.length; i++) {
      // istanbul ignore else
      if (checkItems[i].assetnum) {
        assetMap[checkItems[i].href] = checkItems[i].assetnum;
      }
    }
    let haswarning = false;
    for (const key in assetMap) {
      // istanbul ignore else
      if (assetMap[key] === event.assetnum && key !== event.href) {
        haswarning = true;
        this.page.state.cansave = false;
        this.assetinputDs.addWarnings(this.assetinputDs.getId(event), {
          assetnum: invalidinputMessage,
        });
      }
    }
    // istanbul ignore else
    if (!haswarning) {
      this.assetinputDs.clearWarnings(event, "assetnum");
    }
    // istanbul ignore else
    if (!this.assetinputDs.hasWarnings()) {
      this.page.state.cansave = true;
    }
  }
}

export default AssetPageController;
