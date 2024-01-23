/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import PostRequestUtil from "./utils/PostRequestUtil";
import CommonUtil from "./utils/CommonUtil";

const TAG = "ReturnPageController";

const POLISTDS = "dspolist";
const POLINEDS = "dspolistPoline";
const MATRECTRANSDS = "dspolistMatrectrans";
const ASSETRETURNDS = "assetreturnDs";
const ASSETINPUTDS = "assetinputDs";
const RETURNRECEIPTINPUTDS = "returnrecjsonDs";
const ASSET_ITEM_COUNT = "assetitemcount";
const MATERIAL_ITEM_COUNT = "materialitemcount";
const ACTIONNAME_RETURN = "RETURN";
const MOBILERECEIPTS = "mobileReceipts";

const PUT_DATA_FAILED = "put-data-failed";

const POLISTDS_LOADED = 1;
const POLINEDS_LOADED = 2;
const MATRECTRANSDS_LOADED = 4;
const ASSETRETURNDS_LOADED = 8;
const ASSETINPUTDS_LOADED = 16;
const RETURNRECEIPTINPUTDS_LOADED = 32;
const WEB_ALL_WATCHED_DS_LOADED =
  POLISTDS_LOADED |
  POLINEDS_LOADED |
  MATRECTRANSDS_LOADED |
  ASSETRETURNDS_LOADED |
  ASSETINPUTDS_LOADED |
  RETURNRECEIPTINPUTDS_LOADED;

const reqField = "qtyrequested";
const orderField = "orderqty";
const EXCEED_QTY = "Exceed the quantity shipped.";
const LESS_THAN_0 = "A number great than 0 is expected.";

class ReturnPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.totalCount = 0;
    this.page.state.containerTabSelected = 0;

    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    if (this.app.device.isMaximoMobile) {
      this.allDSWatched = RETURNRECEIPTINPUTDS_LOADED;
    } else {
      this.allDSWatched = WEB_ALL_WATCHED_DS_LOADED;
    }

    this.dsLoadedValue = {};
    this.dsLoadedValue[POLISTDS] = POLISTDS_LOADED;
    this.dsLoadedValue[POLINEDS] = POLINEDS_LOADED;
    this.dsLoadedValue[MATRECTRANSDS] = MATRECTRANSDS_LOADED;
    this.dsLoadedValue[ASSETINPUTDS] = ASSETINPUTDS_LOADED;
    this.dsLoadedValue[RETURNRECEIPTINPUTDS] = RETURNRECEIPTINPUTDS_LOADED;
    this.dsLoadedValue[ASSETRETURNDS] = ASSETRETURNDS_LOADED;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.isfromsave = false;

    this.dspolist = this.app.findDatasource(POLISTDS);
    this.assetreturnds = this.app.findDatasource(ASSETRETURNDS);
    this.returnreceiptinputds = this.app.findDatasource(RETURNRECEIPTINPUTDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);

    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);
    this.originalQty = {};
    this.dsLoadedStatus = 0;

    page.state[ASSET_ITEM_COUNT] = "0";
    page.state[MATERIAL_ITEM_COUNT] = `${
      this.returnreceiptinputds.getItems().length
    }`;
    this.totalCount = 0;
    this.resetOriginalQty();
    this.setupdata();
    this.page.state.currentSearch = undefined;
    this.page.state.searched = false;
  }

  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
  }

  resetOriginalQty() {
    this.returnreceiptinputds.getItems().forEach((item) => {
      this.originalQty[item._id] = item[reqField];
    });
  }

  onAfterLoadData(dataSource, items) {
    const nameMap = {};
    nameMap[RETURNRECEIPTINPUTDS] = MATERIAL_ITEM_COUNT;
    nameMap[ASSETRETURNDS] = ASSET_ITEM_COUNT;

    const dsName = dataSource.name;
    const name = nameMap[dsName];

    // istanbul ignore else
    if (name) {
      this.page.state[name] = `${items.length}`;
      this.totalCount += items.length;
    }
    // istanbul ignore else
    if (this.dsLoadedValue[dsName]) {
      this.dsLoadedStatus |= this.dsLoadedValue[dsName];
      // istanbul ignore else
      if (this.dsLoadedStatus === this.allDSWatched) {
        this.dsLoadedStatus = 0;
        this.page.updatePageLoadingState(false);
      }
    }
  }

  setupdata() {
    this.page.updatePageLoadingState(true);
    CommonUtil.loadjsonds(
      this.returnreceiptinputds,
      this.returnreceiptinputds.getItems()
    );
    // istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.dspolist.load({ noCache: true, itemUrl: this.page.params.href });
    }
  }

  onValueChanged({ datasource, item, field, oldValue, newValue }) {
    const name = datasource.name;
    // istanbul ignore else
    if (name === RETURNRECEIPTINPUTDS && field === reqField) {
      const exceedlimitMessage = this.app.getLocalizedLabel(
        "exceedlimit",
        EXCEED_QTY
      );
      const expectedNumberMessage = this.app.getLocalizedLabel(
        "expectnumber",
        LESS_THAN_0
      );
      if (isNaN(newValue) || newValue <= 0) {
        datasource.setWarning(item, reqField, expectedNumberMessage);
        item.invalid = true;
      } else if (newValue > item[orderField]) {
        datasource.setWarning(item, reqField, exceedlimitMessage);
        item.invalid = true;
      } else {
        datasource.clearWarnings(item, reqField);
        item.invalid = false;
      }
    }
  }

  goBack() {
    this.assetreturnds.applyInMemoryFilter(this.acceptAllItems());
    // this.app.navigateBack();
    this.app.setCurrentPage({
      name: "recactions",
      params: {
        href: this.page.params.href,
        ponum: this.page.params.ponum,
      },
    });
  }

  async saveReturn() {
    let msgid = "";
    let msgtext = "";
    let selectedItems = [];

    //istanbul ignore else
    if (!this.page.state.containerTabSelected) {
      msgid = "return_materials_done_msg";
      msgtext = "{0} material(s) returned";
      selectedItems = this.returnreceiptinputds.getSelectedItems();
    } else if (this.page.state.containerTabSelected === 1) {
      msgid = "return_assets_done_msg";
      msgtext = "{0} asset(s) returned";
      selectedItems = this.assetreturnds.getSelectedItems();
    }
    let validSelectedItems = selectedItems.filter((item) => !item.invalid);
    if (!validSelectedItems.length) {
      this.app.toast(
        this.app.getLocalizedLabel(
          "empty_selection",
          "Please select valid items to save."
        ),
        "warning"
      );
      return;
    } else if (validSelectedItems.length !== selectedItems.length) {
      this.app.toast(
        this.app.getLocalizedLabel(
          "contain_invalid",
          "The items with warnings would not be saved."
        ),
        "warning"
      );
    }

    let response = "";
    let issuenum = 0;
    let option = {
      headers: {
        "x-method-override": "SYNC",
        patchtype: "MERGE",
      },
    };

    this.page.updatePageLoadingState(true);
    this.isfromsave = true;
    this.saveDataSuccessful = true;

    this.totalCount = 0;
    try {
      if (this.page.state.containerTabSelected === 1) {
        const itemlist = [];
        validSelectedItems.forEach((selectedItem) => {
          const item = {};
          item.assetnum = selectedItem.assetnum;
          itemlist.push(item);
        });
        this.assetreturnds.clearSelections();
        const action = "returnAssetsForIR";
        option = {
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

        response = await this.dspolist.invokeAction(action, option);
      } else {
        for (let i = 0; i < validSelectedItems.length; i++) {
          let selecteditem = validSelectedItems[i];

          if (this.app.device.isMaximoMobile) {
            let newMXReceipt = await this.mobileReceipts.addNew();
            newMXReceipt._action = "Change";
            PostRequestUtil.setRealValues2AddedNewDSRec(
              selecteditem,
              ACTIONNAME_RETURN,
              newMXReceipt,
              this.app
            );
            response = await this.mobileReceipts.save(option);
            this.mobileReceipts.clearState();
          } else {
            const valuedItem = PostRequestUtil.setRealValues2Item(
              selecteditem,
              ACTIONNAME_RETURN,
              this.app
            );
            option = {
              headers: {
                "x-method-override": "SYNC",
              },
            };

            response = await this.mobileReceipts.put(valuedItem, option);
          }
          //istanbul ignore else
          if (!response) {
            issuenum = issuenum + 1;
          }
        }
      }
    } catch (error) /* istanbul ignore next */ {
      this.saveDataSuccessful = false;
      log.t(TAG, "Got error sending POST Request %o", error);
    }

    //istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      await this.mobileReceipts.load({
        qbe: {},
        noCache: true,
        savedQuery: "CREATEDLOCALLY",
      });
    }

    let dataReload = false;
    //istanbul ignore else
    if (this.saveDataSuccessful) {
      if (
        (this.page.state.containerTabSelected === 1 && response) ||
        !issuenum
      ) {
        let message = this.app.getLocalizedLabel(msgid, msgtext, [
          validSelectedItems.length,
        ]);
        this.app.toast(message, "success");
        const promisePool = [];
        if (!this.app.device.isMaximoMobile) {
          promisePool.push(
            this.dspolist.load({
              noCache: true,
              itemUrl: this.page.params.href,
            })
          );
        }
        const warnings = {};
        if (this.page.state.containerTabSelected === 0) {
          const savedIds = validSelectedItems.map((item) => item._id);
          const remainingItems = [];
          this.returnreceiptinputds.getItems().forEach((item) => {
            if (savedIds.includes(item._id)) {
              item[reqField] = this.originalQty[item._id] - item[reqField];
              //istanbul ignore else
              if (item[reqField] > 0) {
                remainingItems.push(item);
              }
            } else {
              remainingItems.push(item);
              // record warnings
              //istanbul ignore else
              if (item.invalid) {
                warnings[item._id] =
                  this.returnreceiptinputds.getWarnings(item);
              }
            }
          });
          promisePool.push(
            CommonUtil.loadjsonds(this.returnreceiptinputds, remainingItems)
          );
        } else {
          // record warnings
          const items = this.returnreceiptinputds.getItems();
          items.forEach((item) => {
            //istanbul ignore else
            if (item.invalid) {
              warnings[item._id] = this.returnreceiptinputds.getWarnings(item);
            }
          });
          promisePool.push(
            CommonUtil.loadjsonds(this.returnreceiptinputds, items)
          );
        }
        await Promise.all(promisePool);
        // restore warnings
        this.returnreceiptinputds.getItems().forEach((item) => {
          //istanbul ignore else
          if (item.invalid && warnings[item._id]) {
            for (let key in warnings[item._id]) {
              // change the value to trigger validation
              const originalValue = item[key];
              item[key] = 0;
              item[key] = originalValue;
            }
          }
        });
        this.resetOriginalQty();
        dataReload = true;
      }
    }
    //istanbul ignore else
    if (!dataReload) {
      this.page.updatePageLoadingState(false);
    }
  }

  changeContainerTab(index) {
    this.page.state.containerTabSelected = index;
  }

  /**
   * Function to set flag for 'put-data-failed' event
   */
  //istanbul ignore next
  onSaveDataFailed() {
    //istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.saveDataSuccessful = false;
    }
  }

  acceptAllItems() {
    return (asset) => true;
  }

  async handleAssetSearch(searchQuery) {
    this.assetreturnds.applyInMemoryFilter(this.filterAssets(searchQuery));
    this.page.state.currentSearch = searchQuery;
    this.page.state.searched = true;
  }

  includesSearchQuery(asset, prop, searchQuery) {
    return asset[prop] && asset[prop].toLowerCase().includes(searchQuery);
  }

  filterAssets(searchQuery) {
    const loweredSearchQuery = searchQuery.toLowerCase();

    return (asset) =>
      this.includesSearchQuery(asset, "assetnum", loweredSearchQuery) ||
      this.includesSearchQuery(asset, "description", loweredSearchQuery) ||
      this.includesSearchQuery(asset, "tostoreloc", loweredSearchQuery) ||
      this.includesSearchQuery(asset, "serialnum", loweredSearchQuery) ||
      this.includesSearchQuery(asset, "itemnum", loweredSearchQuery);
  }
}

export { ASSET_ITEM_COUNT, MATERIAL_ITEM_COUNT };
export default ReturnPageController;
