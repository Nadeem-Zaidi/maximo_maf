/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

// const MOBILEROTRECEIPTS = "mobileRotReceipts";

import { log } from "@maximo/maximo-js-api";
import PostRequestUtil from "./utils/ShipmentPostRequestUtil";
import ShipmentCommonUtil from "./utils/ShipmentCommonUtil";

const TAG = "ShipmentReceivePageController";
const ACTIONNAME_SHIPRECEIVE = "SHIPRECEIVE";
const MOBILERECEIPTS = "mobileReceipts";
const PUT_DATA_FAILED = "put-data-failed";
const reqField = "receiptquantity";
const EXCEED_QTY = "Exceed the quantity shipped.";
const LESS_THAN_0 = "A number great than 0 is expected.";

const SHIPMENTRECEIVEDS = "shipmentreceivejsonDS";
const SHIPMENTRECEIPTQUANTITY = "receiptquantity";

class ShipmentReceivePageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.shipreceivingDS = this.app.findDatasource(SHIPMENTRECEIVEDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);
    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);
    this.originalQty = {};
    this.shipreceivingDS.clearSelections();
    this.resetOriginalQty();
  }

  goBack() {
    // this.app.navigateBack();
    this.app.setCurrentPage({
      name: "shipmentactions",
      params: {
        href: this.page.params.href,
        shipmentnum: this.page.params.shipmentnum,
      },
    });
  }

  //istanbul ignore next
  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
  }

  onValueChanged({ datasource, item, field, oldValue, newValue }) {
    const name = datasource.name;
    // istanbul ignore else
    if (name === this.shipreceivingDS.name && field === reqField) {
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
      } else if (newValue > item.receiptquantity_old) {
        datasource.setWarning(item, reqField, exceedlimitMessage);
        item.invalid = true;
      } else {
        datasource.clearWarnings(item, reqField);
        item.invalid = false;
      }
    }
  }

  saveInputValue(items) {
    let item = items[0];
    if (isNaN(item.receiptquantity) || item.receiptquantity <= 0) {
      this.showToast("empty_selection", "warning", LESS_THAN_0);
    } else if (item.receiptquantity > item.receiptquantity_old) {
      this.showToast("empty_selection", "warning", EXCEED_QTY);
    } else {
      item.actualreceiptquantity = item.receiptquantity;
      this.page.findDialog("shiprecitemdetail").closeDialog();
    }
  }

  onDrawerClose(item) {
    item[0].receiptquantity = item[0].actualreceiptquantity
      ? item[0].actualreceiptquantity
      : item[0].receiptquantity_old;
    this.page.state.detailsargs = item;
  }

  async getSelectedItemsAndSaveShipmentReceive() {
    const selectedItems = this.shipreceivingDS.getSelectedItems();
    const validSelectedItems = selectedItems.filter((item) => !item.invalid);

    this.handleInvalidSelection(validSelectedItems, selectedItems);

    await this.saveShipmentReceive(validSelectedItems);
  }

  async saveShipmentReceive(validSelectedItems) {
    this.saveDataSuccessful = true;
    this.page.params.isfromdetail = false;
    this.isfromsave = true;
    this.page.updatePageLoadingState(true);

    let emptyquantity = true;
    let issuenum = 0;

    for (let selecteditem of validSelectedItems) {
      try {
        if (selecteditem.receiptquantity) {
          emptyquantity = false;
        } else {
          this.showToast(
            "emptyqty_msg",
            "error",
            "Received quantity can not be empty"
          );
          emptyquantity = true;
          break;
        }

        issuenum = await this.processReceipt(selecteditem, issuenum);
      } catch (error) /* istanbul ignore next */ {
        this.saveDataSuccessful = false;
        log.t(TAG, error);
      }
    }

    await this.loadReceipts();
    await this.handleSuccessfulReceiving(
      emptyquantity,
      issuenum,
      validSelectedItems
    );
    this.page.updatePageLoadingState(false);
    //istanbul ignore next
    this.page.findDialog("shiprecitemdetail").closeDialog();
  }

  async handleSuccessfulReceiving(emptyquantity, issuenum, validSelectedItems) {
    //istanbul ignore else
    if (this.saveDataSuccessful && !emptyquantity && !issuenum) {
      this.shipreceivingDS.clearSelections();
      this.showToast(
        "receive_done_msg",
        "success",
        `{0} material(s) received`,
        [validSelectedItems.length]
      );

      const requireInspected = validSelectedItems.filter(
        (item) => item.inspectionrequired
      );
      const matcount = requireInspected.length;

      //istanbul ignore else
      if (matcount > 0) {
        this.showToast(
          "to_inspect_msg",
          "info",
          `{0} material(s) are required to inspect`,
          [matcount]
        );
      }

      const { remainingItems, warnings } =
        this.updateRemainingItems(validSelectedItems);
      await ShipmentCommonUtil.loadjsonds(this.shipreceivingDS, remainingItems);
      this.restoreWarnings(warnings);
      this.resetOriginalQty();
    }
  }

  async processReceipt(selecteditem, issuenum) {
    let response = "";
    if (this.app.device.isMaximoMobile) {
      let newMXReceipt = await this.mobileReceipts.addNew();
      PostRequestUtil.setRealValues2AddedNewDSRec(
        selecteditem,
        ACTIONNAME_SHIPRECEIVE,
        newMXReceipt,
        this.app
      );
      response = await this.mobileReceipts.save();
      this.mobileReceipts.clearState();
    } else {
      const item = PostRequestUtil.setRealValues2Item(
        selecteditem,
        ACTIONNAME_SHIPRECEIVE,
        this.app
      );
      response = await this.mobileReceipts.put(item);
    }

    //istanbul ignore else
    if (!response) {
      issuenum++;
    }
    return issuenum;
  }

  handleInvalidSelection(validSelectedItems, selectedItems) {
    if (!validSelectedItems.length) {
      this.showToast(
        "empty_selection",
        "warning",
        "Please select valid items to save."
      );
      return;
    } else if (validSelectedItems.length !== selectedItems.length) {
      this.showToast(
        "contain_invalid",
        "warning",
        "The items with warnings would not be saved."
      );
    }
  }

  async loadReceipts() {
    //istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      await this.mobileReceipts.load({
        qbe: {},
        noCache: true,
        savedQuery: "CREATEDLOCALLY",
      });
    }
  }

  updateRemainingItems(validSelectedItems) {
    const savedIds = validSelectedItems.map((item) => item.shipmentlineid);
    const remainingItems = [];
    const warnings = {};
    let copied_originalQty = this.originalQty;

    this.shipreceivingDS.getItems().forEach((item) => {
      if (savedIds.includes(item.shipmentlineid)) {
        item.receiptquantity =
          copied_originalQty[item.shipmentlineid] - item.receiptquantity;
        //istanbul ignore else
        if (item.receiptquantity > 0) {
          item.receiptquantity_old = item.receiptquantity;
          remainingItems.push(item);
        }
      } else {
        remainingItems.push(item);
        //istanbul ignore else
        if (item.invalid) {
          warnings[item.shipmentlineid] =
            this.shipreceivingDS.getWarnings(item);
        }
      }
    });

    return { remainingItems, warnings };
  }

  restoreWarnings(warnings) {
    this.shipreceivingDS.getItems().forEach((item) => {
      //istanbul ignore else
      if (item.invalid && warnings[item.shipmentlineid]) {
        for (let key in warnings[item.shipmentlineid]) {
          const originalValue = item[key];
          item[key] = 0;
          item[key] = originalValue;
        }
      }
    });
  }

  resetOriginalQty() {
    this.shipreceivingDS.getItems().forEach((item) => {
      this.originalQty[item.shipmentlineid] = item.receiptquantity;
    });
  }

  showToast(key, type, defaultMessage, params) {
    const message = this.app.getLocalizedLabel(key, defaultMessage, params);
    this.app.toast(message, type);
  }

  //istanbul ignore next
  onSaveDataFailed() {
    // in mobile device, we use invokeAction, don't know why we get put failed msg
    //istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.saveDataSuccessful = false;
    }
  }

  openShipReceiveItemDetails(args) {
    this.page.state.detailsargs = args;
    this.page.showDialog("shiprecitemdetail");
  }
}

export default ShipmentReceivePageController;
