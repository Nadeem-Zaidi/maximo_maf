/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import { log } from "@maximo/maximo-js-api";
import CommonUtil from "./utils/CommonUtil";

const TAG = "ReceiveDetailPageController";
const TOLOT = "tolot";
const SHELFLIFE = "shelflife";
const USEBY = "useby";
const CONDITIONCODE = "conditioncode";
const PACKINGSLIPNUM = "packingslipnum";
const REMARK = "remark";

class ReceiveDetailPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  goBack() {
    this.loadDetailData(this.receivedetailjsonDSorg);
    this.app.setCurrentPage({
      name: "receivepage",
      resetScroll: true,
      params: {
        setdata: false,
        ponum: this.page.params.ponum,
      },
    });
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.conditioncodeds = app.findDatasource("conditionLookupDS");
    this.receivedetailjsonDS = app.findDatasource("receiveDetailjsonds");
    this.receivedetailjsonDSorg = app.findDatasource("receiveDetailjsondsorg");
    this.receiveDS = app.findDatasource("receivejsonDS");
    this.dspolistPoline = app.findDatasource("dspolistPoline");
    // Adds logic for image display.
    // istanbul ignore else
    if (this.page.params.polinenum) {
      this.setupImageData();
    }

    this.setUpInitialDataSource();
  }

  async setUpInitialDataSource() {
    // istanbul ignore else
    if (this.page.params.polinenum) {
      const receivedItem = this.receiveDS
        .getItems()
        .find((item) => item.polinenum === this.page.params.polinenum);
      // istanbul ignore else
      if (receivedItem) {
        const newList = [];
        //istanbul ignore else
        if (receivedItem.lottype_maxvalue === "LOT") {
          newList.push({
            _id: 0,
            label: this.app.getLocalizedLabel("lot", "Lot"),
            field: TOLOT,
            value: receivedItem[TOLOT],
          });
          newList.push({
            _id: 1,
            label: this.app.getLocalizedLabel("shelf_life", "Shelf life(days)"),
            field: SHELFLIFE,
            value: receivedItem[SHELFLIFE],
          });
          newList.push({
            _id: 2,
            label: this.app.getLocalizedLabel(
              "expiration_date",
              "Expiration Date"
            ),
            field: USEBY,
            value: receivedItem[USEBY],
          });
        }
        //istanbul ignore else
        if (receivedItem[CONDITIONCODE]) {
          this.conditioncodeds.setQBE("itemnum", receivedItem.itemnum);
          await this.conditioncodeds.searchQBE();
          newList.push({
            _id: 3,
            label: this.app.getLocalizedLabel(
              "condition_code",
              "Condition Code"
            ),
            field: CONDITIONCODE,
            value: receivedItem[CONDITIONCODE],
          });
        }
        newList.push({
          _id: 4,
          label: this.app.getLocalizedLabel("packing_slip", "Packing slip #"),
          field: PACKINGSLIPNUM,
          value: receivedItem[PACKINGSLIPNUM],
        });
        newList.push({
          _id: 5,
          label: this.app.getLocalizedLabel("comment", "Comment"),
          field: REMARK,
          value: receivedItem[REMARK],
        });

        //istanbul ignore else
        if (this.receivedetailjsonDS) {
          await CommonUtil.loadjsonds(this.receivedetailjsonDS, newList);
          await CommonUtil.loadjsonds(this.receivedetailjsonDSorg, newList);
        }
        this.page.state.itemnum = receivedItem.itemnum;
        this.page.state.description = receivedItem.description;
      }
    }
  }

  async setupImageData() {
    try {
      const currentItemsFromPOLines = this.dspolistPoline.items.filter(
        (item) => item.polinenum === this.page.params.polinenum
      );

      this.page.state.hasItemFromPOLines = false;
      this.page.state.hasItemImagelibrefFromPOLines = false;
      const imageDSName = "childitemds4poline";
      //istanbul ignore else
      if (currentItemsFromPOLines && currentItemsFromPOLines.length > 0) {
        this.page.state.hasItemFromPOLines = true;
        //istanbul ignore else
        if (currentItemsFromPOLines[0].item[0]._imagelibref) {
          this.page.state.hasItemImagelibrefFromPOLines = true;
        }

        let ds = this.dspolistPoline.getChildDatasource(
          "item",
          currentItemsFromPOLines[0],
          { idAttribute: "itemid" }
        );
        ds.name = imageDSName;

        if (!this.page.findDatasource(ds.name)) {
          this.page.registerDatasource(ds);
        } else {
          this.page.datasources[ds.name] = ds;
        }
        await ds.load();
      }
    } catch (error) {
      // istanbul ignore next
      log.t(TAG, error);
    }
  }

  saveRecevieDetail() {
    //istanbul ignore else
    if (!this.receivedetailjsonDS.hasWarnings()) {
      this.loadDetailData(this.receivedetailjsonDS);
      this.app.setCurrentPage({
        name: "receivepage",
        resetScroll: true,
        params: {
          ponum: this.page.params.ponum,
          href: this.page.params.href,
          isfromdetail: true,
        },
      });
    }
  }

  validateInput(event) {
    const invalidinputMessage = this.app.getLocalizedLabel(
      "invalidconcode",
      "Invalid condition code."
    );
    const checkItems = this.conditioncodeds._lastItems;
    const codePool = [];
    checkItems.forEach((item) => {
      // istanbul ignore else
      if (item.itemconditionid) {
        codePool.push(item.conditioncode);
      }
    });
    if (codePool.includes(event.value)) {
      this.receivedetailjsonDS.clearWarnings(event, "value");
    } else {
      this.receivedetailjsonDS.addWarnings(
        this.receivedetailjsonDS.getId(event),
        { value: invalidinputMessage }
      );
    }
  }

  selectConditionCode(event) {
    this.receivedetailjsonDS.clearWarnings(
      this.receivedetailjsonDS.getItems()[0],
      "value"
    );
  }

  loadDetailData(ds) {
    const receiveitem = this.receiveDS
      .getItems()
      .find((item) => item.polinenum === this.page.params.polinenum);
    //istanbul ignore else
    if (receiveitem) {
      ds.getItems().forEach((item) => {
        // istanbul ignore else
        if (item.value !== undefined) {
          receiveitem[item.field] = item.value;
        }
      });
    }
  }
}
export default ReceiveDetailPageController;
