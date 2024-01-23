/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import PostRequestUtil from "./utils/ShipmentPostRequestUtil";
import ShipmentCommonUtil from "./utils/ShipmentCommonUtil";

const TAG = "ShipmentVoidPageController";
const SHIPVOIDRECEIPTINPUTDS = "shipmentvoidrecjsonDS";
const ACTIONNAME_SHIPVOIDRECEIPT = "SHIPVOIDRECEIPT";
const MOBILERECEIPTS = "mobileReceipts";

const PUT_DATA_FAILED = "put-data-failed";

class ShipmentVoidPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.isfromsave = false;

    this.shipVoidReceiptInputDs = this.app.findDatasource(
      SHIPVOIDRECEIPTINPUTDS
    );
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);

    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);

    this.shipVoidReceiptInputDs.clearSelections();
  }

  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
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

  saveItemDetail() {
    this.page.findDialog("shipvoidrecitemdetail").closeDialog();
  }

  closeItemDetail() {
    this.page.state.detailsargs.remark = this.page.originalremark;
    this.page.findDialog("shipvoidrecitemdetail").closeDialog();
  }

  async getSelectedItemsAndSaveShipmentVoid() {
    let selectedItems = this.shipVoidReceiptInputDs.getSelectedItems();
    await this.saveShipmentVoid(selectedItems);
  }

  async saveShipmentVoid(selectedItems) {
    this.page.updatePageLoadingState(true);
    this.saveDataSuccessful = true;

    let response = "";
    let issuenum = 0;
    let option = {
      headers: {
        "x-method-override": "SYNC",
        patchtype: "MERGE",
      },
    };
    let emptyquantity = true;

    for (let selecteditem of selectedItems) {
      try {
        if (selecteditem.qtyrequested) {
          emptyquantity = false;
        } else {
          this.showToast(
            "emptyqty_msg",
            "error",
            "Quantity received can not be empty"
          );
          emptyquantity = true;
          break;
        }

        issuenum = await this.processReceipt(
          selecteditem,
          response,
          option,
          issuenum
        );
      } catch (error) /* istanbul ignore next */ {
        this.saveDataSuccessful = false;
        log.t(TAG, "Got error sending POST Request %o", error);
      }
    }

    await this.loadRecepits();

    await this.handleSuccessfulVoid(emptyquantity, issuenum, selectedItems);
    this.page.updatePageLoadingState(false);
  }

  async handleSuccessfulVoid(emptyquantity, issuenum, selectedItems) {
    if (this.saveDataSuccessful && !emptyquantity && !issuenum) {
      this.shipVoidReceiptInputDs.clearSelections();
      this.showToast("void_done_msg", "success", `{0} receipt(s) voided`, [
        selectedItems.length,
      ]);
      this.page.updatePageLoadingState(false);

      const savedIds = selectedItems.map((item) => item._id);
      const remainingItems = this.shipVoidReceiptInputDs
        .getItems()
        .filter((item) => !savedIds.includes(item._id));
      await ShipmentCommonUtil.loadjsonds(
        this.shipVoidReceiptInputDs,
        remainingItems
      );
    }
  }

  showToast(key, type, defaultMessage, params) {
    const message = this.app.getLocalizedLabel(key, defaultMessage, params);
    this.app.toast(message, type);
  }

  async loadRecepits() {
    if (this.app.device.isMaximoMobile) {
      await this.mobileReceipts.load({
        qbe: {},
        noCache: true,
        savedQuery: "CREATEDLOCALLY",
      });
    }
  }

  async processReceipt(selecteditem, response, option, issuenum) {
    if (this.app.device.isMaximoMobile) {
      let newMXReceipt = await this.mobileReceipts.addNew();
      newMXReceipt._action = "Change";
      PostRequestUtil.setRealValues2AddedNewDSRec(
        selecteditem,
        ACTIONNAME_SHIPVOIDRECEIPT,
        newMXReceipt,
        this.app
      );
      response = await this.mobileReceipts.save(option);
      this.mobileReceipts.clearState();
    } else {
      const valuedItem = PostRequestUtil.setRealValues2Item(
        selecteditem,
        ACTIONNAME_SHIPVOIDRECEIPT,
        this.app
      );
      option = {
        headers: {
          "x-method-override": "SYNC",
        },
      };
      response = await this.mobileReceipts.put(valuedItem);
    }
    //istanbul ignore else
    if (!response) {
      issuenum++;
    }
    return issuenum;
  }

  //istanbul ignore next
  onSaveDataFailed() {
    //istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.saveDataSuccessful = false;
    }
  }

  openShipVoidReceiveItemDetails(args) {
    this.page.state.detailsargs = args;
    if (this.page.state.detailsargs.remark) {
      this.page.originalremark = this.page.state.detailsargs.remark;
    } else {
      this.page.originalremark = "";
    }
    this.page.showDialog("shipvoidrecitemdetail");
  }
}

export default ShipmentVoidPageController;
