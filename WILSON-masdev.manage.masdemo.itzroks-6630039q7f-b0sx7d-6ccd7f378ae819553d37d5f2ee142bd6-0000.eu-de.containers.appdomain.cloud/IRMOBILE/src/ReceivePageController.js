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

const TAG = "ReceivePageController";
const RECEIVEDS = "receivejsonDS";
const MOBILERECEIPTS = "mobileReceipts";
// const MOBILEROTRECEIPTS = "mobileRotReceipts";
const ACTIONNAME_RECEIVE = "RECEIVE";

const PUT_DATA_FAILED = "put-data-failed";

const RECEIPTQUANTITY = "receiptquantity";

class ReceivePageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.isfromsave = false;

    this.recds = app.findDatasource(RECEIVEDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);
    //this.mobileRotReceipts = app.findDatasource(MOBILEROTRECEIPTS);

    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);
    //this.mobileRotReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);

    this.originalQty = {};
    this.recds.clearSelections();
    this.resetOriginalQty();
  }

  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
    //this.mobileRotReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
  }

  resetOriginalQty() {
    this.recds.getItems().forEach((item) => {
      if (this.page.params.isfromdetail) {
        this.originalQty[item.polineid] = item.receiptquantity_old;
      } else {
        this.originalQty[item.polineid] = item.receiptquantity;
      }
    });
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

  async saveRecevie() {
    const selectedItems = this.recds.getSelectedItems();
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
    this.page.params.isfromdetail = false;
    this.page.updatePageLoadingState(true);
    this.isfromsave = true;

    let emptyquantity = true;
    let issuenum = 0;

    for (let i = 0; i < validSelectedItems.length; i++) {
      let selecteditem = validSelectedItems[i];

      try {
        if (selecteditem.receiptquantity) {
          emptyquantity = false;
        } else {
          let message3 = this.app.getLocalizedLabel(
            "emptyqty_msg",
            "Quantity Due can not be empty"
          );
          this.app.toast(message3, "error");
          emptyquantity = true;
          break;
        }
        let response = "";
        if (this.app.device.isMaximoMobile) {
          let newMXReceipt = await this.mobileReceipts.addNew();
          PostRequestUtil.setRealValues2AddedNewDSRec(
            selecteditem,
            ACTIONNAME_RECEIVE,
            newMXReceipt,
            this.app
          );
          response = await this.mobileReceipts.save();
          this.mobileReceipts.clearState();
        } else {
          const item = PostRequestUtil.setRealValues2Item(
            selecteditem,
            ACTIONNAME_RECEIVE,
            this.app
          );

          let href = "local/" + item.externalrefid;
          let option = {
            // localRecord: {
            //   href: href,
            // },
          };

          // if (item.rotating) {
          //   response = await this.mobileRotReceipts.put(item, option);
          // } else {
          response = await this.mobileReceipts.put(item, option);
          //}
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
    if (this.saveDataSuccessful && !emptyquantity && !issuenum) {
      this.recds.clearSelections();

      let message = this.app.getLocalizedLabel(
        "receive_done_msg",
        "{0} material(s) received",
        [validSelectedItems.length]
      );
      this.app.toast(message, "success");
      const requireInspected = validSelectedItems.filter(
        (item) => item.inspectionrequired
      );
      const matcount = requireInspected.length;

      //istanbul ignore else
      if (matcount > 0) {
        let message2 = this.app.getLocalizedLabel(
          "to_inspect_msg",
          "{0} material(s) are required to inspect",
          [matcount]
        );
        this.app.toast(message2, "info");
      }

      const savedIds = validSelectedItems.map((item) => item.polineid);
      const remainingItems = [];
      const warnings = {};
      let copied_originalQty = this.originalQty;
      this.recds.getItems().forEach((item) => {
        if (savedIds.includes(item.polineid)) {
          item.receiptquantity =
            copied_originalQty[item.polineid] - item.receiptquantity;
          //istanbul ignore else
          if (item.receiptquantity > 0) {
            item.receiptquantity_old = item.receiptquantity;
            remainingItems.push(item);
          }
        } else {
          remainingItems.push(item);
          //istanbul ignore else
          if (item.invalid) {
            warnings[item.polineid] = this.recds.getWarnings(item);
          }
        }
      });
      await CommonUtil.loadjsonds(this.recds, remainingItems);
      // restore warnings
      this.recds.getItems().forEach((item) => {
        //istanbul ignore else
        if (item.invalid && warnings[item.polineid]) {
          for (let key in warnings[item.polineid]) {
            // change the value to trigger validation
            const originalValue = item[key];
            item[key] = 0;
            item[key] = originalValue;
          }
        }
      });
      this.resetOriginalQty();
    }
    this.page.updatePageLoadingState(false);
  }

  //istanbul ignore next
  onSaveDataFailed() {
    // in mobile device, we use invokeAction, don't know why we get put failed msg
    //istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.saveDataSuccessful = false;
    }
  }

  gotoRecevieDetailPage(args) {
    this.app.setCurrentPage({
      name: "receiveDetail",
      params: {
        href: this.page.params.href,
        polinenum: args.polinenum,
        itemnum: args.itemnum,
        ponum: this.page.params.ponum,
      },
    });
  }

  onValueChanged({ datasource, item, field, oldValue, newValue }) {
    const name = datasource.name;
    // istanbul ignore else
    if (name === RECEIVEDS && field === RECEIPTQUANTITY) {
      const exceedlimitMessage = this.app.getLocalizedLabel(
        "exceedlimit",
        "Exceed the quantity ordered."
      );
      const expectedNumberMessage = this.app.getLocalizedLabel(
        "expectnumber",
        "A number great than 0 is expected."
      );
      if (isNaN(newValue) || newValue <= 0) {
        datasource.setWarning(item, RECEIPTQUANTITY, expectedNumberMessage);
        item.invalid = true;
      } else if (newValue > item.orderqty) {
        datasource.setWarning(item, RECEIPTQUANTITY, exceedlimitMessage);
        item.invalid = true;
      } else {
        datasource.clearWarnings(item, RECEIPTQUANTITY);
        item.invalid = false;
      }
    }
  }
}

export default ReceivePageController;
