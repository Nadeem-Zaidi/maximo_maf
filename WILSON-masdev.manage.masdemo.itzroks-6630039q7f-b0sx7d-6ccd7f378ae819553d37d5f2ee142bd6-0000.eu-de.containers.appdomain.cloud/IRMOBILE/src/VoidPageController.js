/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import PostRequestUtil from "./utils/PostRequestUtil";
import CommonUtil from "./utils/CommonUtil";

const TAG = "VoidPageController";
const VOIDRECEIPTINPUTDS = "voidrecjsonDs";
const ACTIONNAME_VOIDRECEIPT = "VOIDRECEIPT";
const MOBILERECEIPTS = "mobileReceipts";

const PUT_DATA_FAILED = "put-data-failed";

class VoidPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.isfromsave = false;

    this.voidreceiptinputDs = this.app.findDatasource(VOIDRECEIPTINPUTDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);

    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);

    this.voidreceiptinputDs.clearSelections();
  }

  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
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

  async saveVoid() {
    this.page.updatePageLoadingState(true);
    this.isfromsave = true;
    this.saveDataSuccessful = true;

    let selectedItems = this.voidreceiptinputDs.getSelectedItems();
    let response = "";
    let issuenum = 0;
    let option = {
      headers: {
        "x-method-override": "SYNC",
        patchtype: "MERGE",
      },
    };
    let emptyquantity = true;

    for (let i = 0; i < selectedItems.length; i++) {
      try {
        let selecteditem = selectedItems[i];

        if (selecteditem.qtyrequested) {
          emptyquantity = false;
        } else {
          const message3 = this.app.getLocalizedLabel(
            "emptyqty_msg",
            "Quantity Due can not be empty"
          );
          this.app.toast(message3, "error");
          emptyquantity = true;
          break;
        }

        if (this.app.device.isMaximoMobile) {
          let newMXReceipt = await this.mobileReceipts.addNew();
          newMXReceipt._action = "Change";
          PostRequestUtil.setRealValues2AddedNewDSRec(
            selecteditem,
            ACTIONNAME_VOIDRECEIPT,
            newMXReceipt,
            this.app
          );
          response = await this.mobileReceipts.save(option);
          this.mobileReceipts.clearState();
        } else {
          const valuedItem = PostRequestUtil.setRealValues2Item(
            selecteditem,
            ACTIONNAME_VOIDRECEIPT,
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
      } catch (error) /* istanbul ignore next */ {
        this.saveDataSuccessful = false;
        log.t(TAG, "Got error sending POST Request %o", error);
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
    if (this.saveDataSuccessful && !emptyquantity && !issuenum) {
      this.voidreceiptinputDs.clearSelections();
      //Display message
      const msgid = "void_done_msg";
      const msgtext = "{0} receipt(s) voided";
      const message = this.app.getLocalizedLabel(msgid, msgtext, [
        selectedItems.length,
      ]);
      this.app.toast(message, "success");
      this.page.updatePageLoadingState(false);

      const savedIds = selectedItems.map((item) => item._id);
      const remainingItems = this.voidreceiptinputDs
        .getItems()
        .filter((item) => !savedIds.includes(item._id));
      await CommonUtil.loadjsonds(this.voidreceiptinputDs, remainingItems);
    }
    this.page.updatePageLoadingState(false);
  }

  //istanbul ignore next
  onSaveDataFailed() {
    //istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.saveDataSuccessful = false;
    }
  }
}

export default VoidPageController;
