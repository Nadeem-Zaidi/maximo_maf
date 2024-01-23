/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import PostRequestUtil from "./utils/ShipmentPostRequestUtil";
import CommonUtil from "./utils/ShipmentCommonUtil";

const TAG = "ShipmentInspectPageController";

const SHIPINSPECTDS = "shipmentinspectjsonDS";
const SHIPINSPECTASSETDS = "shipmentinspectassetjsonDS";
const MOBILERECEIPTS = "mobileReceipts";
const ACTIONNAME_SHIPINSPECT = "SHIPINSPECT";
const CHANGE = "Change";

const ASSET_ITEM_COUNT = "assetitemcount";
const MATERIAL_ITEM_COUNT = "materialitemcount";

const QUANTITY = "quantity";
const RECEIPT_QUANTITY = "receiptquantity";
const ACCEPTEDQTY = "acceptedqty";
const REJECTQTY = "rejectqty";
const INSPECTEDQTYDSPLY = "inspectedqtydsply";
const REJECTCODE = "rejectcode";
const ITEMNUM = "itemnum";
const ITEMDESCRIPTION = "itemdescription";
const SLD = "shipmentinspectDetails";

const PUT_DATA_FAILED = "put-data-failed";

const MATERIALINSPECTDS_LOADED = 1;
const ASSETINSPECTDS_LOADED = 2;
const ALL_WATCHED_DS_LOADED = MATERIALINSPECTDS_LOADED | ASSETINSPECTDS_LOADED;

class ShipmentInspectPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.totalCount = 0;
    this.page.state.containerTabSelected = 0;

    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);

    this.allDSWatched = ALL_WATCHED_DS_LOADED;
    this.dsLoadedValue = {};
    this.dsLoadedValue[SHIPINSPECTDS] = MATERIALINSPECTDS_LOADED;
    this.dsLoadedValue[SHIPINSPECTASSETDS] = ASSETINSPECTDS_LOADED;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.currentItem = null;

    this.shipinpds = app.findDatasource(SHIPINSPECTDS);
    this.shipinpassetds = app.findDatasource(SHIPINSPECTASSETDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);
    //this.mobileRotReceipts = app.findDatasource(MOBILEROTRECEIPTS);

    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);
    //this.mobileRotReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);

    this.shipinpds.clearSelections();
    this.shipinpassetds.clearSelections();

    this.dsLoadedStatus = 0;
    this.originalMaterialQty = {};
    this.originalAssetQty = {};
    page.state[ASSET_ITEM_COUNT] = "0";
    page.state[MATERIAL_ITEM_COUNT] = "0";
    this.totalCount = 0;
    this.resetMateriaOriginalQty();
    this.resetAssetOriginalQty();
    this.setupdata();
  }

  async setupdata() {
    this.page.updatePageLoadingState(true);
    const promisePool = [];
    promisePool.push(
      CommonUtil.loadjsonds(this.shipinpds, this.shipinpds.getItems())
    );
    promisePool.push(
      CommonUtil.loadjsonds(this.shipinpassetds, this.shipinpassetds.getItems())
    );
    await Promise.all(promisePool);
  }

  resetMateriaOriginalQty() {
    this.shipinpds.getItems().forEach((item) => {
      this.originalMaterialQty[item._id] = item;
    });
  }

  resetAssetOriginalQty() {
    this.shipinpassetds.getItems().forEach((item) => {
      this.originalAssetQty[item._id] = item;
    });
  }

  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
    //this.mobileRotReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
  }

  onAfterLoadData(dataSource, items) {
    const nameMap = {};
    nameMap[SHIPINSPECTDS] = MATERIAL_ITEM_COUNT;
    nameMap[SHIPINSPECTASSETDS] = ASSET_ITEM_COUNT;

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

  goBack() {
    this.app.setCurrentPage({
      name: "shipmentactions",
      params: {
        href: this.page.params.href,
        shipmentnum: this.page.params.shipmentnum,
      },
    });
  }

  setAccept(item, event) {
    // check accept or reject
    // istanbul ignore else
    if (event && event.id) {
      const splits = event.id.split("-");
      if (splits[splits.length - 1] === "accept") {
        // accept:
        item[ACCEPTEDQTY] = item[INSPECTEDQTYDSPLY];
        item[REJECTQTY] = 0;
      } else {
        // reject:
        item[ACCEPTEDQTY] = 0;
        item[REJECTQTY] = item[INSPECTEDQTYDSPLY];
      }
    }
  }

  changeContainerTab(index) {
    this.page.state.containerTabSelected = index;
  }

  async saveInspect() {
    let issuenum = 0;
    let currentTabDS = null;
    let theOtherTabDS = null;

    if (this.page.state.containerTabSelected) {
      // asset tab
      currentTabDS = this.shipinpassetds;
      theOtherTabDS = this.shipinpds;
    } else {
      // material tab
      currentTabDS = this.shipinpds;
      theOtherTabDS = this.shipinpassetds;
    }
    const selectedItems = currentTabDS.getSelectedItems();
    const validSelectedItems = selectedItems.filter((item) => !item.invalid);
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

    this.saveDataSuccessful = true;
    this.page.updatePageLoadingState(true);

    for (let i = 0; i < validSelectedItems.length; i++) {
      let selecteditem = validSelectedItems[i];

      try {
        let response = "";
        let option = {
          headers: {
            "x-method-override": "SYNC",
            patchtype: "MERGE",
          },
        };
        if (this.app.device.isMaximoMobile) {
          let newMXReceipt = await this.mobileReceipts.addNew();
          newMXReceipt._action = CHANGE;
          PostRequestUtil.setRealValues2AddedNewDSRec(
            selecteditem,
            ACTIONNAME_SHIPINSPECT,
            newMXReceipt,
            this.app
          );
          response = await this.mobileReceipts.save(option);
          this.mobileReceipts.clearState();
        } else {
          const item = PostRequestUtil.setRealValues2Item(
            selecteditem,
            ACTIONNAME_SHIPINSPECT,
            this.app
          );

          //let href = "local/" + item.externalrefid;
          option = {
            headers: {
              "x-method-override": "SYNC",
            },
          };

          response = await this.mobileReceipts.put(item, option);
        }

        //istanbul ignore else
        if (!response) {
          issuenum = issuenum + 1;
        }
      } catch (error) /* istanbul ignore next */ {
        this.saveDataSuccessful = false;
        log.t(TAG, error);
      }
    }

    //istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      await this.mobileReceipts.load({
        qbe: {},
        noCache: true,
        savedQuery: "CREATEDLOCALLY",
      });
    }

    //istanbul ignore else
    if (this.saveDataSuccessful && !issuenum) {
      // Display message
      currentTabDS.clearSelections();
      let message = this.app.getLocalizedLabel(
        "inspect_done_msg",
        "{0} item(s) inspected",
        [validSelectedItems.length]
      );
      this.app.toast(message, "success");

      const savedIds = validSelectedItems.map((item) => item._id);
      const remainingItems = [];
      const warnings = {};
      currentTabDS.getItems().forEach((item) => {
        if (savedIds.includes(item._id)) {
          const totalCount =
            Number(item[ACCEPTEDQTY]) + Number(item[REJECTQTY]);
          item[QUANTITY] = Number(item[RECEIPT_QUANTITY]);
          item[RECEIPT_QUANTITY] = Number(item[INSPECTEDQTYDSPLY]) - totalCount;
          item[ACCEPTEDQTY] = item[RECEIPT_QUANTITY];
          item[INSPECTEDQTYDSPLY] = item[RECEIPT_QUANTITY];
          item[REJECTQTY] = 0;
          //istanbul ignore else
          if (item[RECEIPT_QUANTITY] > 0) {
            remainingItems.push(item);
          }
        } else {
          remainingItems.push(item);
          //istanbul ignore else
          if (item.invalid) {
            warnings[item._id] = currentTabDS.getWarnings(item);
          }
        }
      });
      await CommonUtil.loadjsonds(currentTabDS, remainingItems);
      // restore warnings
      currentTabDS.getItems().forEach((item) => {
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
      // also load the other tab ds to trigger total count
      await CommonUtil.loadjsonds(theOtherTabDS, theOtherTabDS.getItems());
    }
    this.page.updatePageLoadingState(false);
  }

  onDetailDone() {
    const item = this.page.state.currentItem;
    item[REJECTCODE] = this.page.state.rejectCode;
    item[REJECTQTY] = Number(this.page.state.rejectQty);
    this.page.closeAllDialogs();
  }

  showDetails({ type, item }) {
    this.page.state.type = type;
    this.page.state.currentItem = item;
    this.page.state.rejectCode = item[REJECTCODE];
    this.page.state.rejectQty = item[REJECTQTY];
    this.page.state.itemnum = item[ITEMNUM];
    this.page.state.itemdescription = item[ITEMDESCRIPTION];
    this.page.showDialog(SLD);
  }

  onValueChanged({ datasource, item, field, oldValue, newValue }) {
    const name = datasource.name;
    const watchedFields = [ACCEPTEDQTY, REJECTQTY];
    const watchedDatasources = [SHIPINSPECTDS];
    //istanbul ignore else
    if (watchedDatasources.includes(name) && watchedFields.includes(field)) {
      // check accept and reject and total count
      const receiptQty = Number(item[INSPECTEDQTYDSPLY]) || 0;
      const theOtherField = watchedFields.find(
        (currentField) => currentField !== field
      );
      const isNewValueNaN = isNaN(newValue) || !String(newValue).trim().length;
      newValue = Number(newValue) || 0;
      const theOtherValue = Number(item[theOtherField]) || 0;
      const totalQty = newValue + theOtherValue;
      item.invalid = false;
      if (newValue < 0 || isNewValueNaN) {
        datasource.setWarning(
          item,
          field,
          this.app.getLocalizedLabel(
            "allowednumber",
            "A number great or equal than 0 is allowed."
          )
        );
        item.invalid = true;
      } else if (totalQty > receiptQty) {
        datasource.setWarning(
          item,
          field,
          this.app.getLocalizedLabel(
            "invalidinput",
            "The sum of the accepted quantity and the rejected quantity is greater than the quantity to be inspected."
          )
        );
        item.invalid = true;
      } else if (!newValue && !theOtherValue) {
        datasource.setWarning(
          item,
          field,
          this.app.getLocalizedLabel(
            "invalidinput2",
            "The accepted quantity and the rejected quantity cannot be zero at the same time."
          )
        );
        item.invalid = true;
      } else {
        watchedFields.forEach((watchedField) => {
          datasource.clearWarnings(item, watchedField);
        });
        item.invalid = false;
      }
    }
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

  computedRotItemDisplay(item) {
    let computedRotItem = null;
    computedRotItem = this.app.getLocalizedLabel(
      "computed_rotating_item_display",
      "{0} / ({1})",
      [item.itemnum, item.rotassetnum]
    );
    return computedRotItem;
  }
}

export default ShipmentInspectPageController;
