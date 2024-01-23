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

const TAG = "InspectPageController";

const MATRECTRANSDS = "matrectransjsonDS";
const MOBILERECEIPTS = "mobileReceipts";
//const MOBILEROTRECEIPTS = "mobileRotReceipts";
const ACTIONNAME_INSPECT = "INSPECT";

const RECEIPT_QUANTITY = "receiptquantity";
const ACCEPTEDQTY = "acceptedqty";
const REJECTQTY = "rejectqty";
const INSPECTEDQTYDSPLY = "inspectedqtydsply";

const PUT_DATA_FAILED = "put-data-failed";

class InspectPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.matds = this.app.findDatasource(MATRECTRANSDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);
    //this.mobileRotReceipts = app.findDatasource(MOBILEROTRECEIPTS);
    this.gotresponse = false;

    this.mobileReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);
    //this.mobileRotReceipts.on(PUT_DATA_FAILED, this.onSaveDataFailed);

    this.matds.clearSelections();
  }

  pagePaused(page, app) {
    this.mobileReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
    //this.mobileRotReceipts.off(PUT_DATA_FAILED, this.onSaveDataFailed);
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

  async saveInspect() {
    let issuenum = 0;
    const selectedItems = this.matds.getSelectedItems();
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
          newMXReceipt._action = "Change";
          PostRequestUtil.setRealValues2AddedNewDSRec(
            selecteditem,
            ACTIONNAME_INSPECT,
            newMXReceipt,
            this.app
          );
          response = await this.mobileReceipts.save(option);
          this.mobileReceipts.clearState();
        } else {
          const item = PostRequestUtil.setRealValues2Item(
            selecteditem,
            ACTIONNAME_INSPECT,
            this.app
          );

          //let href = "local/" + item.externalrefid;
          option = {
            headers: {
              "x-method-override": "SYNC",
            },
          };

          // if (item.rotating === true) {
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
    if (this.saveDataSuccessful && !issuenum) {
      // Display message
      this.gotresponse = true;
      this.matds.clearSelections();
      let message = this.app.getLocalizedLabel(
        "inspect_done_msg",
        "{0} item(s) inspected",
        [validSelectedItems.length]
      );
      this.app.toast(message, "success");

      const savedIds = validSelectedItems.map((item) => item._id);
      const remainingItems = [];
      const warnings = {};
      this.matds.getItems().forEach((item) => {
        if (savedIds.includes(item._id)) {
          const totalCount =
            Number(item[ACCEPTEDQTY]) + Number(item[REJECTQTY]);
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
            warnings[item._id] = this.matds.getWarnings(item);
          }
        }
      });
      await CommonUtil.loadjsonds(this.matds, remainingItems);
      // restore warnings
      this.matds.getItems().forEach((item) => {
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
    }
    this.page.updatePageLoadingState(false);
  }

  onValueChanged({ datasource, item, field, oldValue, newValue }) {
    const name = datasource.name;
    const watchedFields = [ACCEPTEDQTY, REJECTQTY];
    //istanbul ignore else
    if (name === MATRECTRANSDS && watchedFields.includes(field)) {
      const receiptQty = Number(item[RECEIPT_QUANTITY]) || 0;
      const theOtherField = watchedFields.find(
        (currentField) => currentField !== field
      );
      const isNewValueNaN = isNaN(newValue);
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
            "The sum of the accepted quantity and the rejected quantity is greater than the quantity to be inspected for the PO line."
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
          this.matds.clearWarnings(item, watchedField);
        });
        item.invalid = false;
      }
    }
  }

  checkInputValues({ item, field }) {
    const converted = Number(item[field]) || 0;
    if (converted < 0) {
      item[field] = 0;
    } else {
      item[field] = converted;
    }
  }

  gotoInspectDetailPage(args) {
    this.app.setCurrentPage({
      name: "inspectDetail",
      params: {
        href: this.page.params.href,
        description: args.description,
        itemnum: args.itemnum,
        ponum: this.page.params.ponum,
        id: args.id,
      },
    });
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
}

export default InspectPageController;
