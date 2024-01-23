/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import ShipmentShipmentCommonUtil from "./utils/ShipmentCommonUtil";
import PostRequestUtil from "./utils/ShipmentPostRequestUtil";
import ShipmentCommonUtil from "./utils/ShipmentCommonUtil";
import { log } from "@maximo/maximo-js-api";

const TAG = "ShipmentReturnPageController";
const SHIPMENTLINEDS = "shipmentlineDS";
const SHIPMENTRETURNDS = "shipmentreturnrecjsonDS";
const SHIPMENTDS = "shipmentDS";
const MOBILERECEIPTS = "mobileReceipts";
// const SHIPMENTMATRECTRANSDS = "shipmentMatrectransDS";
const MATERIAL_ITEM_COUNT = "materialitemcount";
// const PUT_DATA_FAILED = "put-data-failed";
const ACTIONNAME_SHIPRETURN = "SHIPRETURN";

const SHIPMENTDS_LOADED = 1;
const SHIPMENTLINEDS_LOADED = 2;
// const SHIPMENTMATRECTRANSDS_LOADED = 4;
const SHIPMENTRETURNDS_LOADED = 32;
const WEB_ALL_WATCHED_DS_LOADED =
  SHIPMENTDS_LOADED |
  // SHIPMENTMATRECTRANSDS_LOADED |
  SHIPMENTLINEDS_LOADED |
  SHIPMENTRETURNDS_LOADED;

const reqField = "qtyrequested";
const shippedqty = "shippedqty";

class ShipmentReturnPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    // if (this.app.device.isMaximoMobile) {
    this.allDSWatched = SHIPMENTRETURNDS_LOADED;
    // } else {
    //   this.allDSWatched = WEB_ALL_WATCHED_DS_LOADED;
    // }

    this.dsLoadedValue = {};
    this.dsLoadedValue[SHIPMENTDS] = SHIPMENTDS_LOADED;
    this.dsLoadedValue[SHIPMENTLINEDS] = SHIPMENTLINEDS_LOADED;
    // this.dsLoadedValue[SHIPMENTMATRECTRANSDS] = SHIPMENTMATRECTRANSDS_LOADED;
    this.dsLoadedValue[SHIPMENTRETURNDS] = SHIPMENTRETURNDS_LOADED;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.isfromsave = false;

    this.dsshipmentlist = this.app.findDatasource(SHIPMENTDS);
    this.returnreceiptinputds = this.app.findDatasource(SHIPMENTRETURNDS);
    this.mobileReceipts = app.findDatasource(MOBILERECEIPTS);
    this.dsLoadedStatus = 0;

    page.state[MATERIAL_ITEM_COUNT] = `${
      this.returnreceiptinputds.getItems().length
    }`;
    this.setupdata();
  }

  onAfterLoadData(dataSource, items) {
    const nameMap = {};
    nameMap[SHIPMENTRETURNDS] = MATERIAL_ITEM_COUNT;

    const dsName = dataSource.name;
    const name = nameMap[dsName];

    // istanbul ignore else
    if (name) {
      this.page.state[name] = `${items.length}`;
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
    ShipmentShipmentCommonUtil.loadjsonds(
      this.returnreceiptinputds,
      this.returnreceiptinputds.getItems()
    );
    // istanbul ignore else
    if (!this.app.device.isMaximoMobile) {
      this.dsshipmentlist.load({
        noCache: true,
        itemUrl: this.page.params.href,
      });
    }
  }

  onValueChanged({ datasource, item, field, oldValue, newValue }) {
    const name = datasource.name;
    // istanbul ignore else
    if (name === SHIPMENTRETURNDS && field === reqField) {
      const exceedlimitMessage = this.app.getLocalizedLabel(
        "exceedlimit",
        "Exceed the quantity shipped."
      );
      const expectedNumberMessage = this.app.getLocalizedLabel(
        "expectnumber",
        "A number great than 0 is expected."
      );
      if (isNaN(newValue) || newValue <= 0) {
        datasource.setWarning(item, reqField, expectedNumberMessage);
        item.invalid = true;
      } else if (newValue > item.qtyrequested_old) {
        datasource.setWarning(item, reqField, exceedlimitMessage);
        item.invalid = true;
      } else {
        datasource.clearWarnings(item, reqField);
        item.invalid = false;
      }
    }
  }

  async saveShipmentReturn() {
    let selectedItems = this.returnreceiptinputds.getSelectedItems();
    this.returnItems = this.returnreceiptinputds.getItems();
    let validSelectedItems = selectedItems.filter((item) => !item.invalid);
    this.handleInvalidSelection(validSelectedItems, selectedItems);

    if (!this.saveDataSuccessful) {
      return;
    }

    let response = "";
    let issuenum = 0;
    let isRotating = false;

    this.page.updatePageLoadingState(true);
    this.isfromsave = true;

    this.totalCount = 0;
    try {
      for (let selecteditem of validSelectedItems) {
        if (selecteditem.rotating) {
          this.showToast(
            "emptyqty_msg",
            "error",
            "Rotating items cannot be returned"
          );
          isRotating = true;
          break;
        }
        response = await this.processItemReceipt(selecteditem, response);
        //istanbul ignore else
        if (!response) {
          issuenum = issuenum + 1;
        }
      }
    } catch (error) /* istanbul ignore next */ {
      this.saveDataSuccessful = false;
      log.t(TAG, "Got error sending POST Request %o", error);
    }

    await this.loadMaximoMobileReceipts();

    let dataReload = false;
    dataReload = await this.handleSuccessfulReturn(
      issuenum,
      validSelectedItems,
      dataReload,
      isRotating
    );
    //istanbul ignore else
    if (dataReload) {
      this.page.updatePageLoadingState(false);
    }
  }

  async handleSuccessfulReturn(
    issuenum,
    validSelectedItems,
    dataReload,
    isRotating
  ) {
    if (this.saveDataSuccessful && !isRotating && !issuenum) {
      this.showToast(
        "return_materials_done_msg",
        "success",
        `{0} material(s) returned`,
        [validSelectedItems.length]
      );
      this.updateRemainingItems(validSelectedItems);
      dataReload = true;
      return dataReload;
    }
  }

  async processItemReceipt(selecteditem, response) {
    if (this.app.device.isMaximoMobile) {
      let option = {
        headers: {
          "x-method-override": "SYNC",
          patchtype: "MERGE",
        },
      };
      let newMXReceipt = await this.mobileReceipts.addNew();
      newMXReceipt._action = "Change";
      PostRequestUtil.setRealValues2AddedNewDSRec(
        selecteditem,
        ACTIONNAME_SHIPRETURN,
        newMXReceipt,
        this.app
      );
      response = await this.mobileReceipts.save(option);
      this.mobileReceipts.clearState();
    } else {
      const valuedItem = PostRequestUtil.setRealValues2Item(
        selecteditem,
        ACTIONNAME_SHIPRETURN,
        this.app
      );
      let option = {
        headers: {
          "x-method-override": "SYNC",
        },
      };
      response = await this.mobileReceipts.put(valuedItem, option);
    }
    return response;
  }

  handleInvalidSelection(validSelectedItems, selectedItems) {
    if (validSelectedItems.length === 0) {
      this.showToast(
        "empty_selection",
        "warning",
        "Please select valid items to return."
      );
      this.saveDataSuccessful = false;
      return;
    }

    if (validSelectedItems.length !== selectedItems.length) {
      this.showToast(
        "contain_invalid",
        "warning",
        "The items with warnings would not be returned."
      );
    }

    this.saveDataSuccessful = true;
  }

  async loadMaximoMobileReceipts() {
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
    const warnings = {};
    const savedIds = validSelectedItems.map((item) => item._id);
    const remainingItems = [];

    this.returnreceiptinputds.getItems().forEach((item) => {
      if (savedIds.includes(item._id)) {
        item[reqField] = item.qtyrequested_old - item[reqField];
        item.qtyrequested_old = item[reqField];
        //istanbul ignore else
        if (item[reqField] > 0) {
          remainingItems.push(item);
        }
      } else {
        remainingItems.push(item);
        //istanbul ignore else
        if (item.invalid) {
          warnings[item._id] = this.returnreceiptinputds.getWarnings(item);
        }
      }
    });
    ShipmentCommonUtil.loadjsonds(this.returnreceiptinputds, remainingItems);
    this.restoreWarnings(warnings);
  }

  restoreWarnings(warnings) {
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
  }

  showToast(key, type, defaultMessage, params) {
    const message = this.app.getLocalizedLabel(key, defaultMessage, params);
    this.app.toast(message, type);
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
}
export { MATERIAL_ITEM_COUNT };
export default ShipmentReturnPageController;
