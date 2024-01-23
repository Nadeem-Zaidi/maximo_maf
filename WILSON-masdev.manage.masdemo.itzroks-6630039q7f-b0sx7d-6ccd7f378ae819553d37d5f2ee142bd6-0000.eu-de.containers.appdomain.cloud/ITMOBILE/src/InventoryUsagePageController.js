/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import { v4 as uuidv4 } from "uuid";

import CommonUtil from "./utils/CommonUtil";

const TAG = "InventoryUsagePageController";
const SPLIT_DRAWER = "invUsageLineSplitItem";
const DEL_INVUSELINE_CONFIRM_DIALOG = "sysMsgDialog_invuselinedel";
const INVUSE_SAVEERR_DIALOG = "sysMsgDialog_invuse_saveerr";
const INVUSE_SAVE_VALIDATION_ERR_DIALOG =
  "sysMsgDialog_invuse_saveValidationErr";
const QUANTITY_NOT_MATCH = "quantityNotMatch";
const QUANTITYNOTMATCH_MSG =
  "The sum of split quantities should equal to the quantity set in inventory usage line.";
const INVALID_INVUSE_LINES = "invalid_invuse_lines";
const INVALID_INVUSE_LINES_MSG =
  "(Usage lines - {0}) * From the Inventory Usage application, issue the inventory usage record to provide the missing information.";
const INVALIDLOT_DIALOG_TITLE = "invalidlot_dialog_title";
const INVALIDLOT_DIALOG_TITLE_MSG = "Invalid Lot";
const INVALID_LOT = "lotValueNotSet";
const INVALID_LOT_MSG = "The value of Lot is empty.";
const INVALID_INVUSE_LINES_LOT = "invalid_invuse_lines_lot";
const INVALID_INVUSE_LINES_LOT_MSG =
  "Usage lines - {0} - from the Inventory Usage application. Please set the missing Lot values.";
const INVALIDSPLIT_DIALOG_TITLE = "invalidSplit_dialog_title";
const INVALIDSPLIT_DIALOG_TITLE_MSG = "Invalid Split Account";
const INVALIDGLACCOUNT_DIALOG_TITLE = "invalidGLAccount_dialog_title";
const INVALIDGLACCOUNT_DIALOG_TITLE_MSG = "Invalid Charge Account";
const INVALID_GLACCOUNT = "invalidGLAccount";
const INVALID_GLACCOUNT_MSG =
  "Some inventory usage lines have missing or invalid charge account information and cannot be issued.";
const ONLY_SUPPORT_RESERVED_ITEMS = "onlySupportReservedItems";
const ONLY_SUPPORT_RESERVED_ITEMS_MSG =
  "Items without reservations must be issued from the Inventory Usage application.";
const INVUSESTATUS_SYNONYM_DOMAINID = "INVUSESTATUS";
const INVUSE_STATUS_COMP = "COMPLETE";

const INVALIDROTASSET_DIALOG_TITLE = "invalidRotAsset_dialog_title";
const INVALIDROTASSET_DIALOG_TITLE_MSG = "Invalid Rotating Asset";
const INVALID_ROTASSET = "invalidRotAsset";
const INVALID_ROTASSET_MSG =
  "Some inventory usage lines have missing or invalid rotating assets and cannot be issued.";
const INVALID_INVUSE_LINES_ROTASSET = "invalid_invuse_lines_rotasset";
const INVALID_INVUSE_LINES_ROTASSET_MSG =
  "Usage lines - {0} - from the Inventory Usage application. Please provide the missing information.";

class InventoryUsagePageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.invuselines = [];
  }

  pageResumed() {
    // entering this page, either new or modify existing, both are waiting to issue
    this.page.state.saveErr = null;
    this.page.state.isSaving = false;
    this.page.state.clearedAfterInitialLoading = false;
    this.page.state.assetrefreshing = false;
    this.page.state.issuedItem = false;
    let reserveditems = this.page.params?.items;
    this.page.state.title =
      this.page.params.title ||
      this.app.getLocalizedLabel("createInvUsage", "Create inventory usage");
    this.page.state.addingmoreitems = this.page.params.addingmoreitems;
    this.page.state.itemUrl = this.page.params.itemUrl || null;
    this.page.state.invUsageLineSplitItem = null;
    this.page.state.invUsageLineItem = null;
    this.page.state.currentInvUse = null;
    this.page.state.itemsInvUsage = [];
    this.page.state.readonlyState = false;
    //istanbul ignore else
    if (this.page.state.itemUrl) {
      this.page.state.invusagedesc =
        this.page.params.description === undefined
          ? ""
          : this.page.params.description;
      // coming from inventory usage list page, already saved, set draft to false
      this.page.state.draftInvUsage = false;
    }
    this.assetLookupDS = this.app.findDatasource("assetLookupDS");
    this.issuetoLookupDS = this.app.findDatasource("issuetoLookupDS");
    this.binLookupDS = this.page.datasources["inventbalDS"];
    this.invUsageDS = this.app.findDatasource(
      this.app.state.selectedInvUseDSName
    );
    this.invusagejsonds = this.page.findDatasource("jsoninusageDS");
    this.invsplitjsonDS = this.page.findDatasource("invsplitjsonDS");

    // reserveditems to this page are all not saved
    reserveditems?.forEach((item) => {
      item._notSaved = true;
    });
    this.setUpInitialDataSource(reserveditems);
  }

  async setUpInitialDataSource(reserveditems) {
    if (!this.page.state.itemUrl) {
      //it's a new Inventory Usage record

      if (!this.page.state.addingmoreitems) {
        // it's the first load for the record

        await this.invusagejsonds.load({ src: [], noCache: true }); //Clean the current json datasource

        await this.loadNewInventoryUsage(reserveditems); //load the items from reserveditems
      } else {
        //it's adding new items

        //load previous selected items and then the new selected reservedItems
        await this.updatePreviousSelectedItems(reserveditems);
      }
    } else {
      //it's an existing Inventory Usage record

      if (!this.page.state.addingmoreitems) {
        // it's the first load for the record

        //Clean the current json datasource
        await this.invusagejsonds.load({ src: [], noCache: true });
        const invUsageItem =
          (await this.invUsageDS?.load({
            noCache: true,
            itemUrl: this.page.state.itemUrl,
          })) || [];

        // filter out autocreated true in split item
        invUsageItem.forEach((invusage) => {
          invusage.invuseline?.forEach((invuseline) => {
            //istanbul ignore else
            if (invuseline.invuselinesplit) {
              invuseline.invuselinesplit = invuseline.invuselinesplit.filter(
                (split) => !split.autocreated
              );
              //istanbul ignore next
              if (!invuseline.invuselinesplit.length) {
                delete invuseline.invuselinesplit;
              }
            }
          });
        });

        this.updatePageInvUseLines(invUsageItem);
        this.page.state.currentInvUse = this.invUsageDS?.item;
        await this.loadAddNewItems(this.invuselines);
      } else {
        //it's adding new items
        await this.invUsageDS?.load({
          noCache: true,
          itemUrl: this.page.state.itemUrl,
        });
        this.page.state.currentInvUse = this.invUsageDS?.item;

        await this.updatePreviousSelectedItems(reserveditems);
      }
    }

    //istanbul ignore next
    if (this.page.state.currentInvUse?.status === "COMPLETE") {
      this.page.state.readonlyState = true;
    }

    this.computeEnableSave();
  }

  async updatePreviousSelectedItems(reservedItems) {
    let maxLineNum = 0;
    let newItemsArray = [];
    let previousjsonItems = this.invusagejsonds?.getItems();

    //istanbul ignore next
    this.invusagejsonds?.getItems()?.forEach((item) => {
      maxLineNum =
        item.invuselinenum >= maxLineNum ? item.invuselinenum : maxLineNum;
    });

    //istanbul ignore else
    if (reservedItems && reservedItems.length && previousjsonItems) {
      let previousnotsaveditems;

      reservedItems?.forEach((item) => {
        previousnotsaveditems = previousjsonItems.find(
          (temp) => temp.itemnum === item.itemnum
        );
        //istanbul ignore else
        if (!previousnotsaveditems) {
          newItemsArray.push(item);
        }
      });
    }

    //istanbul ignore else
    if (newItemsArray && newItemsArray.length) {
      for (let i = 0; i < newItemsArray.length; i++) {
        let newItemDS = await this.invusagejsonds.addNew();
        this.updateByCopyInfoFromInvReserve(
          newItemDS,
          newItemsArray[i],
          ++maxLineNum
        );
      }
    }
    this.page.state.itemsInvUsage =
      this.page.state.itemsInvUsage.concat(newItemsArray);
  }

  updatePageInvUseLines(invUsageItem) {
    // find invuseline in invusageDS
    let invuseline = [];
    let reserveitems = this.app.allreserveditems;
    invUsageItem.forEach((usageItem) => {
      //istanbul ignore else
      if (usageItem.invuseline && usageItem.invuseline.length) {
        invuseline = invuseline.concat(
          usageItem.invuseline.filter((item) => item.itemnum !== undefined)
        );

        for (let i = 0; i < usageItem.invuseline.length; i++) {
          //istanbul ignore else
          if (usageItem.invuseline[i].itemnum !== undefined) {
            for (
              let j = 0;
              j < usageItem.invuseline[i].invreserve?.length;
              j++
            ) {
              let invReserveCoppied = CommonUtil.getCopiedInvReserve(
                usageItem.invuseline[i].invreserve[j],
                usageItem
              );
              // istanbul ignore else
              if (
                reserveitems.filter(
                  (item) => item.invreserveid === invReserveCoppied.invreserveid
                ).length === 0
              ) {
                reserveitems.push(invReserveCoppied);
              }
            }
          }
        }
      }
    });
    let siteidValue = invUsageItem[0]?.siteid;
    //istanbul ignore else
    if (siteidValue && siteidValue !== undefined) {
      this.invuselines = invuseline.map((item) =>
        Object.assign(item, { siteid: siteidValue })
      );
    }
    //ithis.app.allreserveditems = reserveitems;
  }

  updateAppInvUseLines(usageItem, isAfterSave, hasResponseErrorOrNeed2AddBack) {
    // find invuseline in invusageDS
    let invuselines = this.app.allinvuses;

    //istanbul ignore else
    if (usageItem.invuseline && usageItem.invuseline.length) {
      for (let i = 0; i < usageItem.invuseline.length; i++) {
        //istanbul ignore else
        if (
          usageItem.invuseline[i].itemnum !== undefined &&
          usageItem.invuseline[i].itemnum !== ""
        ) {
          let invUseLineCoppied = CommonUtil.getCopiedInvUseLine(
            usageItem.invuseline[i],
            usageItem
          );
          // istanbul ignore else
          if (this.app.device.isMaximoMobile) {
            // For mobile, no invusenum for now and invuseid will be changed after save.
            //if (isAfterSave || !this.page.state.draftInvUsage || this.page.state.addingmoreitems) {
            //istanbul ignore next
            invuselines = invuselines.filter(
              (eachline) =>
                !(
                  (eachline.anywhererefid === undefined &&
                    eachline.invuseid === invUseLineCoppied.invuseid &&
                    eachline.invuselinenum ===
                      invUseLineCoppied.invuselinenum &&
                    eachline.siteid === invUseLineCoppied.siteid) ||
                  (eachline.anywhererefid !== undefined &&
                    eachline.anywhererefid === invUseLineCoppied.anywhererefid)
                )
            );
            //}
          } else {
            // Removes the temp invuseline in the array and then will push the saved persistent one.
            // For web version, we have to use invusenum because invuseid could be changed.
            //istanbul ignore next
            invuselines = invuselines.filter(
              (eachline) =>
                !(
                  eachline.invusenum === invUseLineCoppied.invusenum &&
                  eachline.invuselinenum === invUseLineCoppied.invuselinenum &&
                  eachline.siteid === invUseLineCoppied.siteid
                )
            );
          }
          //istanbul ignore else
          if (!hasResponseErrorOrNeed2AddBack) {
            // When got save error, no need to push back anything after cleaning the temp invuseline in the array.
            // For newly added one, just adde it. For existing one, replace with the latest.
            invuselines.push(invUseLineCoppied);
          }
        }
      }
    }

    this.app.allinvuses = invuselines;
  }

  async loadNewInventoryUsage(reserveditems) {
    this.page.state.draftInvUsage = true;
    this.page.state.invusagedesc = "";

    this.invusagejsonds.clearState();
    this.invusagejsonds.resetState();
    this.invusagejsonds.lastQuery = {};

    // copy a new reserveditems and change base it
    let invuselineList = [];
    let invuselinenumAux = 1;
    //istanbul ignore else
    if (reserveditems && reserveditems.length > 0) {
      reserveditems.forEach((item) => {
        let invuseline = this.updateByCopyInfoFromInvReserve(
          null,
          item,
          invuselinenumAux++
        );
        // Specific logic for unique id.
        invuseline._id = invuseline.invuselinenum;
        invuselineList.push(invuseline);
      });
      await this.invusagejsonds.load({
        src: invuselineList,
        noCache: true,
      });
    }
    this.page.state.itemsInvUsage = reserveditems;
  }

  /**
   * Copies InvReserve info into InvUseLine, referring to the logic from Maximo side.
   * */
  updateByCopyInfoFromInvReserve(createdItem, newOrReservedItem, numdefined) {
    const copiedCreatedItem = Object.assign({}, createdItem);
    let item = createdItem;

    if (createdItem === null || createdItem === undefined) {
      item = JSON.parse(JSON.stringify(newOrReservedItem));
    } else {
      for (let key in newOrReservedItem) {
        item[key] = newOrReservedItem[key];
      }
      for (let key in copiedCreatedItem) {
        item[key] = copiedCreatedItem[key];
      }
    }
    if (!this.page.state.addingmoreitems) {
      item.quantity = 1;
    } else {
      item.quantity = newOrReservedItem.quantity || 1;
    }

    item.description =
      newOrReservedItem.itemdesc || newOrReservedItem.description;
    item.computedDueDate =
      newOrReservedItem.computedDueDate ||
      this.computedDueDate(newOrReservedItem.invreserve || []);
    item.frombin = newOrReservedItem.binnum;
    item.fromstoreloc = newOrReservedItem.location;
    item.fromconditioncode = newOrReservedItem.conditioncode;
    item.location = newOrReservedItem.oplocation;
    item.siteid = newOrReservedItem.storelocsiteid;
    item.tositeid = newOrReservedItem.siteid;

    // istanbul ignore else
    if (
      newOrReservedItem.glaccount !== undefined &&
      newOrReservedItem.glaccount !== null
    ) {
      item.gldebitacct = newOrReservedItem.glaccount;
    }

    item.refwo = newOrReservedItem.wonum;

    item.invuselinenum = numdefined;

    // must remove unused fields
    const excludesFields = [
      "href",
      "_bulkid",
      "_dbid",
      "_rowstamp",
      "_selected",
    ];
    excludesFields.forEach((field) => {
      delete item[field];
    });
    return item;
  }

  computedDueDate(invreserve) {
    let dueDate = "";
    //istanbul ignore else
    if (invreserve && invreserve.length) {
      invreserve.forEach((reserve) => {
        //istanbul ignore else
        if (reserve.requireddate) {
          //istanbul ignore else
          if (!dueDate || reserve.requireddate < dueDate) {
            dueDate = reserve.requireddate;
          }
        }
      });
      //istanbul ignore next.
      dueDate = dueDate
        ? this.app.dataFormatter.convertISOtoDate(dueDate).toLocaleDateString()
        : "";
    }
    return dueDate;
  }

  async loadAddNewItems(reserveditems) {
    let previousSelected = this.page.state.itemsInvUsage;
    let newItemsArray = [];
    let currentApp = this.app;
    //istanbul ignore else
    if (reserveditems && reserveditems.length > 0) {
      let itemAlreadySelected = "";
      let allrsveditems = this.app.allreserveditems;

      reserveditems.forEach((item) => {
        itemAlreadySelected = false;
        //istanbul ignore else
        if (previousSelected) {
          itemAlreadySelected = previousSelected?.find(
            (itemPrevious) => itemPrevious.requestnum === item.requestnum
          );
        }
        //istanbul ignore else
        if (!itemAlreadySelected && item.itemnum !== undefined) {
          let invReservesRelated = allrsveditems.filter(
            (reserveditem) =>
              reserveditem.requestnum === item.requestnum &&
              reserveditem.siteid === item.siteid
          );

          //istanbul ignore else
          if (invReservesRelated[0]) {
            const totalQtyUsed = CommonUtil.getTotalQtyUsed(
              invReservesRelated[0],
              this.app,
              item.quantity
            );
            invReservesRelated[0].calqty =
              invReservesRelated[0].reservedqty - totalQtyUsed;
            item.calqty = invReservesRelated[0].calqty;
            item.computedDueDate = CommonUtil.computeDueDate(
              invReservesRelated[0].requireddate,
              currentApp
            );
          }
          // Specific logic for unique id.
          //istanbul ignore else
          if (!item._id) {
            item._id = item.invuselinenum;
          }
          newItemsArray.push(item);
        }
      });
    }
    let maxLineNum = 0;
    //istanbul ignore next
    this.invusagejsonds.getItems().forEach((item) => {
      maxLineNum =
        item.invuselinenum >= maxLineNum ? item.invuselinenum : maxLineNum;
    });
    await this.invusagejsonds.load({
      src: newItemsArray,
      noCache: true,
    });
    this.page.state.itemsInvUsage =
      this.page.state.itemsInvUsage.concat(newItemsArray);
  }

  async saveInventoryUsage(needsSave) {
    //istanbul ignore else
    if (needsSave === undefined || needsSave === null) {
      needsSave = true;
    }

    this.setSavingProcess(true);
    this.page.state.saveErr = null;
    this.page.state.saveValidationErr = null;

    // Only support reserved items now.
    if (!this.isReservedItems()) {
      this.page.state.saveErr = this.app.getLocalizedLabel(
        ONLY_SUPPORT_RESERVED_ITEMS,
        ONLY_SUPPORT_RESERVED_ITEMS_MSG
      );
      this.page.showDialog(INVUSE_SAVEERR_DIALOG);
      this.setSavingProcess(false);
      return false;
    }

    // validate lot with lottype is LOT
    let invalidLotLines = this.getLinesOfInvalidLot();
    //istanbul ignore else
    if (invalidLotLines.length > 0) {
      this.page.state.saveValidationErr_title = this.app.getLocalizedLabel(
        INVALIDLOT_DIALOG_TITLE,
        INVALIDLOT_DIALOG_TITLE_MSG
      );

      this.page.state.saveValidationErr = this.app.getLocalizedLabel(
        INVALID_LOT,
        INVALID_LOT_MSG
      );

      this.page.state.saveValidationErr_lineinfo = this.app.getLocalizedLabel(
        INVALID_INVUSE_LINES_LOT,
        INVALID_INVUSE_LINES_LOT_MSG,
        [invalidLotLines]
      );

      this.page.showDialog(INVUSE_SAVE_VALIDATION_ERR_DIALOG);
      this.setSavingProcess(false);
      return false;
    }

    // Split validation.
    let invalidLines = this.getLinesOfInvalidSplit();
    //istanbul ignore else
    if (invalidLines.length > 0) {
      this.page.state.saveValidationErr_title = this.app.getLocalizedLabel(
        INVALIDSPLIT_DIALOG_TITLE,
        INVALIDSPLIT_DIALOG_TITLE_MSG
      );

      this.page.state.saveValidationErr = this.app.getLocalizedLabel(
        QUANTITY_NOT_MATCH,
        QUANTITYNOTMATCH_MSG
      );

      //this.page.state.saveErr = this.page.state.saveValidationErr;

      this.page.state.saveValidationErr_lineinfo = this.app.getLocalizedLabel(
        INVALID_INVUSE_LINES,
        INVALID_INVUSE_LINES_MSG,
        [invalidLines]
      );

      this.page.showDialog(INVUSE_SAVE_VALIDATION_ERR_DIALOG);
      this.setSavingProcess(false);
      return false;
    }

    // GLAccount validataion.
    // invalidLines = this.getLinesOfInvalidGLAccount();
    // //istanbul ignore else
    // if (invalidLines.length > 0) {
    //   this.page.state.saveValidationErr_title = this.app.getLocalizedLabel(
    //     INVALIDGLACCOUNT_DIALOG_TITLE,
    //     INVALIDGLACCOUNT_DIALOG_TITLE_MSG
    //   );

    //   this.page.state.saveValidationErr = this.app.getLocalizedLabel(
    //     INVALID_GLACCOUNT,
    //     INVALID_GLACCOUNT_MSG
    //   );

    //   //this.page.state.saveErr = this.page.state.saveValidationErr;
    //   this.page.state.saveValidationErr_lineinfo = this.app.getLocalizedLabel(
    //     INVALID_INVUSE_LINES,
    //     INVALID_INVUSE_LINES_MSG,
    //     [invalidLines]
    //   );
    //   this.page.showDialog(INVUSE_SAVE_VALIDATION_ERR_DIALOG);
    //   this.setSavingProcess(false);
    //   return false;
    // }

    //validate Rotating Assets
    let invalidLinesRotatingAssets = this.validateRotatingAssets();

    if (invalidLinesRotatingAssets.length > 0) {
      this.page.state.saveValidationErr_title = this.app.getLocalizedLabel(
        INVALIDROTASSET_DIALOG_TITLE,
        INVALIDROTASSET_DIALOG_TITLE_MSG
      );

      this.page.state.saveValidationErr = this.app.getLocalizedLabel(
        INVALID_ROTASSET,
        INVALID_ROTASSET_MSG
      );

      this.page.state.saveValidationErr_lineinfo = this.app.getLocalizedLabel(
        INVALID_INVUSE_LINES_ROTASSET,
        INVALID_INVUSE_LINES_ROTASSET_MSG,
        [invalidLinesRotatingAssets]
      );
      this.page.showDialog(INVUSE_SAVE_VALIDATION_ERR_DIALOG);
      this.setSavingProcess(false);
      return false;
    }

    if (!needsSave) {
      this.setSavingProcess(false);
      return true;
    }

    let initialStatus = "ENTERED";
    let useType = "ISSUE";
    let synonymDomainsDS = this.app.findDatasource("synonymdomainDS");
    synonymDomainsDS.setQBE("valueid", "INVUSESTATUS|ENTERED");
    const response = await synonymDomainsDS.searchQBE();
    //istanbul ignore else
    if (response && response[0]) {
      initialStatus = response[0].value;
    }

    let synonymDomainsDS_type = this.app.findDatasource("synonymdomainDS_type");
    synonymDomainsDS_type.setQBE("valueid", "INVUSETYPE|ISSUE");
    const response2 = await synonymDomainsDS_type.searchQBE();
    //istanbul ignore else
    if (response2 && response2[0]) {
      useType = response2[0].value;
    }

    if (this.page.state.draftInvUsage) {
      //istanbul ignore else
      if (!this.invUsageDS.getSchema()) {
        await this.invUsageDS.initializeQbe();
      }
      let newInvUsage = await this.invUsageDS.addNew();

      newInvUsage.usetype = useType;
      newInvUsage.status = initialStatus;
      newInvUsage.fromstoreloc = this.invusagejsonds?.items[0]?.fromstoreloc;
      newInvUsage.orgid = this.invusagejsonds?.items[0]?.orgid;
      newInvUsage.siteid = this.invusagejsonds?.items[0]?.siteid;
      newInvUsage.description = this.page.state.invusagedesc;

      newInvUsage.invuseline = this.invusagejsonds.items;
    } else {
      this.invUsageDS.item.description = this.page.state.invusagedesc;
      this.invUsageDS.item.invuseline = this.invusagejsonds.items;

      // we have to set status field in changes to make api work, even there's no change on status
      //istanbul ignore else
      if (this.invUsageDS.__itemChanges) {
        const changes = this.invUsageDS.__itemChanges;
        for (let key in changes) {
          //istanbul ignore else
          if (!changes[key].status) {
            changes[key].status = [
              {
                name: "status",
                type: "update",
                newValue: this.invUsageDS.item.status,
                oldValue: this.invUsageDS.item.status,
                object: this.invUsageDS.item,
              },
            ];
          }
        }
      }
    }
    // for mobile remove _rowstamp in invuseline and invuselinesplit
    //istanbul ignore else
    if (this.app.device.isMaximoMobile && this.invUsageDS.item) {
      this.invUsageDS.item.invuseline?.forEach((line) => {
        delete line["_rowstamp"];
        line.invuselinesplit?.forEach((split) => {
          delete split["_rowstamp"];
        });
      });
    }
    return await this.triggerSaveProcess(this.invUsageDS);
  }

  /**
   * Function to validate : If it's a Rotating Item - needs an Asset Assigned
   */
  validateRotatingAssets() {
    let invalidLines = [];

    this.invusagejsonds.items.forEach((lineItem) => {
      let rotating = this.getRotating(lineItem);

      //istanbul ignore else
      if (rotating) {
        //istanbul ignore else
        if (!lineItem.invuselinesplit) {
          lineItem.displaycolor = "red60";
          invalidLines.push(lineItem.invuselinenum);
        }

        lineItem.invuselinesplit?.forEach((asset) => {
          //istanbul ignore else
          if (!asset.rotassetnum) {
            lineItem.displaycolor = "red60";
            invalidLines.push(lineItem.invuselinenum);
          }
        });
      }
    });
    return invalidLines;
  }

  /**
   * NOTICE: if the lineitem is from reserved item, it has item.rotating
   * if the lineitem is from saved invuseline item, it does not have item.rotating
   * check item[0].rotating or rotating from invreserve[0].item[0].rotating
   */
  getRotating(lineItem) {
    let rotating = false;
    //istanbul ignore else
    if (lineItem.item) {
      //istanbul ignore else
      if (lineItem.item.rotating) {
        rotating = lineItem.item.rotating;
      } else if (lineItem.item.length > 0) {
        rotating = lineItem.item[0].rotating;
      }
    } else if (lineItem.invreserve) {
      rotating = lineItem.invreserve[0].item[0].rotating;
    }

    return rotating;
  }

  getLinesOfInvalidLot() {
    let invalidLines = [];
    // check each invuseline for lottype is LOT and fromlot is empty
    this.invusagejsonds.items.forEach((lineItem) => {
      //istanbul ignore else
      if (
        (lineItem.lottype === "LOT" ||
          lineItem.item?.lottype === "LOT" ||
          lineItem.item[0]?.lottype === "LOT") &&
        !lineItem.fromlot
      ) {
        lineItem.displaycolor = "red60";
        invalidLines.push(lineItem.invuselinenum);
      }
    });
    return invalidLines;
  }

  getLinesOfInvalidSplit() {
    let invalidLines = [];
    // set autocreated field in split to false to make it work as expected
    this.invusagejsonds.items.forEach((lineItem) => {
      //istanbul ignore else
      if (lineItem.invuselinesplit && lineItem.invuselinesplit.length) {
        // check quantity
        let total = 0;
        lineItem.invuselinesplit.forEach((splitItem) => {
          const keepFields = [
            "quantity",
            "frombin",
            "rotassetnum",
            "itemsetid",
            "itemnum",
            "orgid",
          ];
          //istanbul ignore else
          if (splitItem.autocreated) {
            // FIXME: as we won't have autocreated true anymore, can be removed safely?
            for (let k in splitItem) {
              //istanbul ignore else
              if (!keepFields.includes(k)) {
                // delete fields href, localref, invuselinesplitid, etc
                delete splitItem[k];
              }
            }
            splitItem._addNew = true;
            splitItem.contentuid = uuidv4();
          } else {
            // do not calculate those with autocreated true
            total += splitItem.quantity;
          }
          splitItem.autocreated = false;
          splitItem.contentuid = splitItem.contentuid || uuidv4();
        });
        //istanbul ignore else
        if (total !== lineItem.quantity) {
          lineItem.displaycolor = "red60";
          invalidLines.push(lineItem.invuselinenum);
        }
      } else {
        lineItem.invuselinesplit = null;
        delete lineItem.invuselinesplit;
        // log.d(TAG, "line item: %o", lineItem);
      }
    });

    return invalidLines;
  }

  /**
   * GL Credit Account - not check for now.
   *
   * //lineItem.glcreditacct === undefined ||
   * //  lineItem.glcreditacct.indexOf("?") > 0 ||
   *
   * and at least one of the following fields populated
   *
   * 1. Asset (INVUSELINE.ASSETNUM)
   * 2. Location (INVUSELINE.LOCATION)
   * 3. WO (INVUSELINE.WONUM)
   * 4. Requisition (MR) (INVUSELINE.MRNUM)
   * 5. GL Debit Account (INVUSELINE.GLDEBITACCT)
   *
   */
  // getLinesOfInvalidGLAccount() {
  //   let invalidLines = [];
  //   // set autocreated field in split to false to make it work as expected
  //   this.invusagejsonds.items.forEach((lineItem) => {
  //     let rotating = this.getRotating(lineItem);

  //     //istanbul ignore else
  //     if (lineItem.requestnum === undefined &&
  //       ((!rotating &&
  //       lineItem.gldebitacct === undefined &&
  //       lineItem.assetnum === undefined &&
  //       lineItem.location === undefined) ||
  //       (rotating && lineItem.location === undefined))
  //     ) {
  //       lineItem.displaycolor = "red60";
  //       invalidLines.push(lineItem.invuselinenum);
  //     }
  //   });

  //   return invalidLines;
  // }

  isReservedItems() {
    let isReservedItems = true;
    // set autocreated field in split to false to make it work as expected
    for (let i = 0; i < this.invusagejsonds.items.length; i++) {
      let lineItem = this.invusagejsonds.items[i];
      if (lineItem.requestnum === undefined) {
        isReservedItems = false;
        break;
      }
    }

    return isReservedItems;
  }

  async triggerSaveProcess(ds) {
    //istanbul ignore else
    if (
      !this.page.state.draftInvUsage &&
      ds.item.description !== this.page.state.invusagedesc
    ) {
      ds.item.description = this.page.state.invusagedesc;
    }

    // Updates this.app.allinvuses. For newly added invuseline rec, no invuselineid defined
    this.updateAppInvUseLines(ds.currentItem, false);

    let response = await ds.save();

    if (response.error) {
      this.page.state.saveErr = response.error.message;
      //this.removeAppInvUseLines(ds.item);
    } else {
      this.page.state.saveErr = null;
      // update itemUrl
      this.page.state.itemUrl = ds.currentItem.href;
      this.page.params.description = this.page.state.invusagedesc;

      //istanbul ignore next
      const invUsageItem =
        (await ds?.load({
          noCache: true,
          itemUrl: this.page.state.itemUrl,
        })) || [];

      // filter out autocreated true in split item
      invUsageItem.forEach((invusage) => {
        invusage.invuseline?.forEach((invuseline) => {
          // set _notSaved false after saved
          invuseline._notSaved = false;
          //istanbul ignore else
          if (invuseline.invuselinesplit) {
            invuseline.invuselinesplit = invuseline.invuselinesplit.filter(
              (split) => !split.autocreated
            );
            //istanbul ignore next
            if (!invuseline.invuselinesplit.length) {
              delete invuseline.invuselinesplit;
            }
          }
        });
      });

      this.updatePageInvUseLines(invUsageItem);
      // update this.invusagejsonds

      // for mobile remove _rowstamp in invuseline
      //istanbul ignore else
      if (
        this.app.device.isMaximoMobile &&
        ds.currentItem.invuseline &&
        ds.currentItem.invuseline.length
      ) {
        ds.currentItem.invuseline.forEach((line) => {
          //istanbul ignore else
          if (line["_rowstamp"]) {
            delete line["_rowstamp"];
          }
          line.invuselinesplit?.forEach((split) => {
            //istanbul ignore else
            if (split["_rowstamp"]) {
              delete split["_rowstamp"];
            }
          });
        });
      }

      // update this.invusagejsonds
      let invuselineList = [];
      let oldInvUsageJSONItems = this.invusagejsonds.items;
      //istanbul ignore else
      ds.currentItem.invuseline?.forEach((invuseline) => {
        let eachitem = JSON.parse(JSON.stringify(invuseline));
        //istanbul ignore next
        let invReservesRelated = oldInvUsageJSONItems.filter(
          (item) =>
            item.requestnum === eachitem.requestnum &&
            (item.siteid === eachitem.siteid ||
              item.siteid === ds.currentItem.siteid)
        );
        //istanbul ignore else
        if (invReservesRelated[0]) {
          eachitem.siteid = invReservesRelated[0].siteid;
          eachitem.calqty = invReservesRelated[0].calqty;
          eachitem.computedDueDate = invReservesRelated[0].computedDueDate;
        }
        // Specific logic for unique id.
        // Needs to set _id because no this attribute when loading from db. Specific logic for unique id.
        eachitem._id = eachitem.invuselinenum;
        invuselineList.push(eachitem);
      });

      await this.invusagejsonds.load({
        src: invuselineList,
        noCache: true,
      });

      this.page.state.draftInvUsage = false;
      this.app.currentPage.state.enableSave = false;

      let label = this.app.getLocalizedLabel(
        "invusage_saved",
        "Inventory usage Saved."
      );
      this.app.toast(label, "success", "");
    }

    this.setSavingProcess(false);

    // Updates this.app.allinvuses. For newly added invuseline rec, remove it and add the created one.
    this.updateAppInvUseLines(ds.currentItem, true, response.error);
    this.invUsageDS.clearChanges();
    // no saveErr means save successfully
    return !this.page.state.saveErr;
  }

  async triggerDeleteProcess(ds, items) {
    //istanbul ignore next
    try {
      await ds.deleteItems(items);
    } catch (error) {
      log.t(TAG, error);
    } finally {
      this.setSavingProcess(false);
    }
  }

  /**
   * Notify the execution page that save operation is running or not
   * @param {Boolean} isSaving  - Flag to idicate if the save is running
   */
  setSavingProcess(isSaving) {
    //istanbul ignore else
    if (this.app?.currentPage?.state) {
      this.app.currentPage.state.isSaving = isSaving;
    }
  }

  /**
   * Validates input values.
   *
   */
  validateInput(event) {
    if (event.quantity === undefined || event.quantity === "") {
      // disable save and issue button if not set quantity
      this.app.currentPage.state.enableSave = false;
      this.app.currentPage.state.invalidInput = true;
      return;
    }

    // Validates input
    const exceedlimitMessage = this.app.getLocalizedLabel(
      "exceedreserved",
      "The number cannot exceed total reserved amount."
    );
    const expectedNumberMessage = this.app.getLocalizedLabel(
      "expectnumber",
      "Enter a number greater than zero."
    );

    if (isNaN(event.quantity) || event.quantity <= 0) {
      this.invusagejsonds.addWarnings(this.invusagejsonds.getId(event), {
        quantity: expectedNumberMessage,
      });
      event.errormsgtext = expectedNumberMessage;
      event.haswarning = true;
    } else if (event.quantity > event.calqty) {
      this.invusagejsonds.addWarnings(this.invusagejsonds.getId(event), {
        quantity: exceedlimitMessage,
      });
      event.errormsgtext = exceedlimitMessage;
      event.haswarning = true;
    } else {
      this.invusagejsonds.clearWarnings(event, "quantity");
      event.haswarning = false;
    }

    if (!event.haswarning) {
      this.computeEnableSave();
      this.app.currentPage.state.invalidInput = false;
    } else {
      // disable save and issue button if has warnings
      this.app.currentPage.state.enableSave = false;
      this.app.currentPage.state.invalidInput = true;
    }
  }

  /**
   * Check if the Record is able to be Saved or Not
   *      * @param {Boolean} enableSave  - Flag to idicate if the save is allowed
   */
  computeEnableSave() {
    if (this.page.state.draftInvUsage) {
      this.app.currentPage.state.enableSave =
        !!this.page.state.invusagedesc && !this.page.state.issuedItem;
    } else {
      this.app.currentPage.state.enableSave =
        !!this.page.state.invusagedesc &&
        !this.page.state.issuedItem &&
        (this.page.state.invusagedesc !== this.page.params.description ||
          this.hasRealChangesOnJSONDS()) &&
        !this.page.state.readonlyState;
    }
  }

  /**
   * Shows the confirmation dialog for delete.
   */
  showDelConfirmation(item) {
    this.page.state.selectedItem = item;
    this.page.state.dialogBMXMessage = this.app.getLocalizedLabel(
      "delConfirmBmxLabel",
      "Are you sure you want to delete the Item?"
    );

    // istanbul ignore next
    if (
      this.app.currentPage.state.enableSave &&
      this.page.state.currentInvUse !== null &&
      this.invUsageDS.item.invuseline?.filter(
        (existingitem) => existingitem.invuselinenum === item.invuselinenum
      ).length > 0
    ) {
      this.app.toast(
        this.app.getLocalizedLabel(
          "needSave",
          "You need to save the record before delete operation."
        ),
        "error"
      );
    } else {
      /* istanbul ignore next  */
      window.setTimeout(() => {
        this.page.showDialog(DEL_INVUSELINE_CONFIRM_DIALOG);
      }, 100);
    }
  }

  /**
   * Deletes invuseline when user confirm Yes.
   */
  async onUserConfirmationYes() {
    await this.removeLineItem(this.page.state.selectedItem);
  }

  /**
   * Deletes invuseline when user confirm No.
   */
  async onUserConfirmationNo() {
    this.page.findDialog(DEL_INVUSELINE_CONFIRM_DIALOG)?.closeDialog();
  }

  removePreviousSelected(item) {
    let itemsInvUsage = this.page.state.itemsInvUsage;
    //istanbul ignore else
    if (itemsInvUsage) {
      this.page.state.itemsInvUsage = itemsInvUsage.filter(
        (usageItem) => usageItem.requestnum !== item.requestnum
      );
    }
  }

  async removeLineItem(item) {
    this.setSavingProcess(true);
    const isMaximoMobile = this.app.device.isMaximoMobile;
    if (
      !this.page.state.draftInvUsage &&
      (this.app.device.isMaximoMobile || item.href !== undefined)
    ) {
      const currentInvUseLines = this.invuselines.filter(
        (eachInvUseLine) => eachInvUseLine.invuselinenum === item.invuselinenum
      );
      // istanbul ignore else
      if (currentInvUseLines && currentInvUseLines.length > 0) {
        const childInvUseLineDS = this.invUsageDS.getChildDatasource(
          "invuseline",
          this.invUsageDS.item,
          { idAttribute: "invuseid" }
        );
        await childInvUseLineDS.load();
        await this.triggerDeleteProcess(childInvUseLineDS, currentInvUseLines);
        // Updates this.invuselines
        this.invuselines = this.invuselines.filter(
          (eachline) => eachline.invuselinenum !== item.invuselinenum
        );
        // Updates this.app.allinvuses, mobile filter with anywhererefid
        this.app.allinvuses = this.app.allinvuses.filter(
          (eachline) =>
            (isMaximoMobile && eachline.anywhererefid !== item.anywhererefid) ||
            (!isMaximoMobile && eachline.invuselineid !== item.invuselineid)
        );
      }
    }

    // Prepares the data for json data source reload.
    const copiedInvUsageJSONItems = Object.assign(
      {},
      this.invusagejsonds.items.filter(
        (existingitem) => existingitem.invuselinenum !== item.invuselinenum
      )
    );
    let newItemsArray = [];
    for (let key in copiedInvUsageJSONItems) {
      newItemsArray.push(copiedInvUsageJSONItems[key]);
    }

    await this.invusagejsonds.deleteItem(item);
    // Reloads invusagejsonds to avoid the problem that sometimes all the unsaved invuselines were deleted.
    await this.invusagejsonds.load({
      src: newItemsArray,
      noCache: true,
    });
    this.removePreviousSelected(item);
    this.computeEnableSave();
    this.invUsageDS.clearChanges();
    this.setSavingProcess(false);
  }

  openSelectReservedItems() {
    this.app.setCurrentPage({
      name: "reservationsList",
      params: {
        addmoreitems: true,
        reservedItemsInvUsage: this.page.state.itemsInvUsage,
        itemUrl: this.page.state.itemUrl,
        title: this.page.state.currentInvUse?.invusenum,
        description: this.page.state.invusagedesc,
      },
    });
  }

  async closeInvUsagePage() {
    let name = "reservationsList";
    let params = {
      addmoreitems: false,
    };
    //istanbul ignore else
    if (!this.app.state.isFromReservedItemsPage && this.page.params.itemUrl) {
      this.app.state.isBackFromInvUsePage = true;
      name = "invUsageList";
      params = {
        addmoreitems: false,
      };
    }

    if (this.app.currentPage.state.enableSave) {
      // Display 'Save or Discard' dialog manually.
      this.showUnsavedChangesDialogManually(
        name,
        params,
        this.page.state.saveErr === null
      );
    } else {
      this.app.setCurrentPage({
        name: name,
        params: params,
      });
    }
  }

  showUnsavedChangesDialogManually(name, params, valid) {
    // istanbul ignore next
    let onAfterDiscard = () => {
      this.app.setCurrentPage({
        name: name,
        params: params,
      });
    };

    // istanbul ignore next
    let onAfterSave = () => {
      if (this.page.state.saveErr) {
        this.page.showDialog(INVUSE_SAVEERR_DIALOG);
      } else if (!this.page.state.saveValidationErr) {
        this.app.setCurrentPage({
          name: name,
          params: params,
        });
      }
    };

    this.app.userInteractionManager.showUnsavedChanges(
      this.app,
      this.page,
      onAfterSave,
      onAfterDiscard,
      // no callback after the x close button is clicked.
      null,
      this.app.isSavable() && valid
    );
  }

  async onCustomSaveTransition(event) {
    await this.saveInventoryUsage();
    // Not to call system defaultSave.
    return { saveDataSuccessful: true, callDefaultSave: false };
  }

  hasRealChangesOnJSONDS() {
    let invuselineChanged = false;
    const changes = this.invusagejsonds.__itemChanges;
    const fields = ["quantity", "issueto"];
    for (let key in changes) {
      for (let field of fields) {
        if (changes[key][field] !== undefined) {
          invuselineChanged = true;
          break;
        }
      }
    }

    return invuselineChanged || this.invsplitjsonDS.state.itemsChanged;
  }

  async openDetailsLineItem(item) {
    // set values from relation invreserve
    //istanbul ignore else
    if (item.issueto) {
      await this.issuetoLookupDS.initializeQbe();
      this.issuetoLookupDS.setQBE("personid", "=", item.issueto);
      const results = await this.issuetoLookupDS.searchQBE();
      item.issuetoDisplay =
        results && results.length ? results[0].displayname : "";
    }
    //istanbul ignore else
    if (item.invreserve && item.invreserve.length) {
      //istanbul ignore else
      if (
        !item.item &&
        item.invreserve[0].item &&
        item.invreserve[0].item.length
      ) {
        item.item = item.item || {};
        item.item.rotating = item.invreserve[0].item[0].rotating;
        item.item.conditionenabled =
          item.invreserve[0].item[0].conditionenabled;
      }
    }

    if (item.item !== undefined && item.item.length > 0) {
      item.item = item.item[0];
    }

    this.page.state.invUsageLineItem = item;
    // load invsplitjsonDS
    this.invsplitjsonDS.clearState();
    this.invsplitjsonDS.resetState();
    if (item.invuselinesplit && item.invuselinesplit.length) {
      await this.invsplitjsonDS.load({
        src: item.invuselinesplit,
        noCache: true,
      });
    } else {
      await this.invsplitjsonDS.load({
        src: [],
        noCache: true,
      });
    }

    this.page.showDialog("invUsageLineItemDetails");
  }

  async openIssuetoLookup() {
    // clear qbe for issuetoLookupDS
    this.issuetoLookupDS.clearSelections();
    this.issuetoLookupDS.clearState();
    await this.issuetoLookupDS.initializeQbe();
    await this.issuetoLookupDS.searchQBE();
    this.page.showDialog("issuetoLookup");
  }

  /**
   * Function to filter the Assets according to the parameters
   */
  async openAssetLookup() {
    let invUsageLineItem = this.page.state.invUsageLineItem;
    this.page.state.loadingAsset = true;
    //Filter asset
    await this.assetLookupDS.initializeQbe();
    this.assetLookupDS.setQBE("siteid", "=", invUsageLineItem.siteid);
    this.assetLookupDS.setQBE("itemnum", "=", invUsageLineItem.itemnum);
    this.assetLookupDS.setQBE("location", "=", invUsageLineItem.fromstoreloc);
    await this.assetLookupDS.searchQBE();
    this.assetLookupDS.clearSelections();

    const keyMap = {
      href: "splitHref",
      localref: "splitLocalref",
      anywhererefid: "anywhererefid",
      invuselinesplitid: "invuselinesplitid",
    };
    // use asset items in split to set selection for assetLookupDS
    const self = this;
    this.invsplitjsonDS.getItems().forEach((splitItem) => {
      // fill asset with splitjson fileds, especially for href, localref
      const assetItem = self.assetLookupDS.getItems().find((item) => {
        if (item.assetnum === splitItem.rotassetnum) {
          for (let key in keyMap) {
            // istanbul ignore else
            if (splitItem[key]) {
              item[keyMap[key]] = splitItem[key];
            }
          }
          return true;
        } else {
          return false;
        }
      });
      // istanbul ignore else
      if (assetItem) {
        assetItem._disabled = false;
        self.assetLookupDS.setSelectedItem(assetItem, true);
        self.assetLookupDS.setDisabled(assetItem);
      }
    });
    this.page.state.loadingAsset = false;
    this.page.showDialog("assetLookup");
  }

  /**
   * Use to set the selected item..
   * @param {item} Asset item
   */
  selectAssets() {
    this.chooseAsset();
  }

  deleteAsset(item) {
    this.invsplitjsonDS.deleteItem(item);
  }

  /**
   * Callback method after choose asset from lookup after validating location.
   * @param {item} asset item
   */
  async chooseAsset() {
    let selectedItems = this.assetLookupDS.getSelectedItems();

    selectedItems = selectedItems.map((item) => {
      const resultItem = {
        quantity: 1,
        frombin: item.binnum,
        rotassetnum: item.assetnum,
      };
      const keyMap = {
        splitHref: "href",
        splitLocalref: "localref",
        anywhererefid: "anywhererefid",
        invuselinesplitid: "invuselinesplitid",
      };
      for (let key in keyMap) {
        // istanbul ignore else
        if (item[key]) {
          resultItem[keyMap[key]] = item[key];
        }
      }
      return resultItem;
    });

    let currentItems = this.invsplitjsonDS.getItems();
    const newItems = [];

    if (currentItems && currentItems.length) {
      selectedItems?.forEach((item) => {
        let newSelectedItem = currentItems?.find((temp) => {
          if (temp.rotassetnum === item.rotassetnum) {
            return true;
          } else {
            return false;
          }
        });
        //istanbul ignore next
        if (!newSelectedItem) {
          newItems.push(item);
        }
      });
      const self = this;
      newItems.forEach(async (item) => {
        let newAsset = await self.invsplitjsonDS.addNew();
        for (let key in item) {
          newAsset[key] = item[key];
        }
      });
    } else {
      this.invsplitjsonDS?.clearChanges();
      this.invsplitjsonDS?.clearState();
      this.invsplitjsonDS.lastQuery = {};
      const self = this;
      selectedItems.forEach(async (item) => {
        let newAsset = await self.invsplitjsonDS.addNew();
        for (let key in item) {
          newAsset[key] = item[key];
        }
      });
    }
  }

  onDetailClose() {
    // close from detail sliding drawer chevron button

    // save invuselinesplit back to invuseline item
    this.page.state.invUsageLineItem.invuselinesplit =
      this.invsplitjsonDS.getItems();
    this.computeEnableSave();
  }

  async onSplitClose() {
    // close from split sliding drawer close button
    // restore previous state
    if (this.page.state.prevBin === null || this.page.state.prevQty === null) {
      await this.deleteSplit(true);
    } else {
      this.page.state.invUsageLineSplitItem.frombin = this.page.state.prevBin;
      this.page.state.invUsageLineSplitItem.quantity = this.page.state.prevQty;
    }
    this.page.state.invUsageLineSplitItem = null;
  }

  closeDrawer() {
    // display values do not update automatically when modified in mobile, update it manually
    this.page.state.invUsageLineSplitItem.displayedQuantity =
      this.app.getLocalizedLabel("splitQuantity", "Quantity: {0}", [
        this.page.state.invUsageLineSplitItem.quantity || 0,
      ]);
    this.page.state.invUsageLineSplitItem.displayedBin =
      this.app.getLocalizedLabel("splitBin", "From bin: {0}", [
        this.page.state.invUsageLineSplitItem.frombin ||
          this.app.getLocalizedLabel("notAvailable", "N/A"),
      ]);
    this.page.state.invUsageLineItem.frombin =
      this.page.state.invUsageLineItem.frombin ||
      this.page.state.invUsageLineSplitItem.frombin;
    this.page.state.invUsageLineSplitItem = null;
    // close split sliding drawer from delete/done
    this.app.userInteractionManager.removeDrawer(
      this.page.findDialogConfiguration(SPLIT_DRAWER)
    );
  }

  async deleteSplit(skipClose) {
    // delete current
    const items = this.invsplitjsonDS
      .getItems()
      .filter(
        (split) =>
          split.invuselinesplitid !==
          this.page.state.invUsageLineSplitItem.invuselinesplitid
      );
    this.invsplitjsonDS.clearState();
    this.invsplitjsonDS.resetState();
    await this.invsplitjsonDS.load({
      src: items,
      noCache: true,
    });
    // istanbul ignore else
    if (!skipClose) {
      this.closeDrawer();
    }
  }

  async configSplit(item) {
    // open sliding drawer for filling split item info
    if (!item) {
      item = await this.invsplitjsonDS.addNew();
      item.quantity = 0;
      item.frombin = this.page.state.invUsageLineItem.frombin;
      this.page.state.prevBin = null;
      this.page.state.prevQty = null;
    } else {
      this.page.state.prevBin = item.frombin;
      this.page.state.prevQty = item.quantity;
    }
    this.page.state.invUsageLineSplitItem = item;
    this.page.showDialog(SPLIT_DRAWER);
  }

  /**
   * Function to filter the Bin/Bins according to the parameters
   */
  async openBinLookup(splitItem) {
    let invUsageLineItem = this.page.state.invUsageLineItem;
    this.page.state.invUsageLineSplitItem = splitItem;
    //Filter Bin
    this.binLookupDS.clearSelections();
    await this.binLookupDS.initializeQbe();
    this.binLookupDS.setQBE("siteid", "=", invUsageLineItem.siteid);
    this.binLookupDS.setQBE("itemnum", "=", invUsageLineItem.itemnum);
    this.binLookupDS.setQBE("location", "=", invUsageLineItem.fromstoreloc);

    // istanbul ignore else
    if (invUsageLineItem.fromconditioncode) {
      this.binLookupDS.setQBE(
        "conditioncode",
        "=",
        invUsageLineItem.fromconditioncode
      );
    } else if (
      (invUsageLineItem.lottype === "LOT" ||
        invUsageLineItem.item?.lottype === "LOT" ||
        (invUsageLineItem.item?.length &&
          invUsageLineItem.item[0]?.lottype === "LOT")) &&
      invUsageLineItem.fromlot
    ) {
      this.binLookupDS.setQBE("lotnum", "=", invUsageLineItem.fromlot);
    }
    await this.binLookupDS.searchQBE();
    this.page.showDialog("binLookup");
  }

  chooseIssueto(evt) {
    // istanbul ignore else
    if (evt) {
      let invUsageLineItem = this.page.state.invUsageLineItem;
      invUsageLineItem.issuetoDisplay = evt.displayname;
      invUsageLineItem.issueto = evt.personid;
    }
  }

  /**
   * Function to choose the bin from lookup
   */
  chooseBinNumber(evt) {
    // istanbul ignore else
    if (evt) {
      // istanbul ignore else
      if (this.page.state.invUsageLineSplitItem) {
        this.page.state.invUsageLineSplitItem.frombin = evt.binnum;
        return;
      }
      let invUsageLineItem = this.page.state.invUsageLineItem;
      invUsageLineItem.frombin = evt.binnum;
    }
  }

  /**
   * Function to load possible lots
   */
  async loadLots() {
    const invUsageLineItem = this.page.state.invUsageLineItem;
    let lots = [];
    const lotsMap = {};

    this.binLookupDS.clearSelections();
    await this.binLookupDS.initializeQbe();
    this.binLookupDS.setQBE("siteid", "=", invUsageLineItem.siteid);
    this.binLookupDS.setQBE("itemnum", "=", invUsageLineItem.itemnum);
    this.binLookupDS.setQBE("location", "=", invUsageLineItem.fromstoreloc);
    await this.binLookupDS.searchQBE();

    //Populate the possible Lots
    this.binLookupDS?.getItems()?.forEach((item) => {
      if (item.lotnum) {
        // we only need unique lot in the list later
        lotsMap[item.lotnum] = item;
      }
    });
    // get unique lots
    lots = Object.values(lotsMap);

    const lotsFilteredByBinDS = this.page.datasources["lotsFilteredByBinDS"];
    lotsFilteredByBinDS.clearSelections();
    //istanbul ignore next
    await lotsFilteredByBinDS.load({
      src: lots,
      noCache: true,
    });
  }

  /**
   * Function to filter the Bin/Bins according to the parameters
   */
  openLotLookup() {
    this.loadLots();
    this.page.showDialog("lotLookup");
  }

  /**
   * Function to choose the lot from lookup
   */
  async chooseLotNumber(evt) {
    let invUsageLineItem = this.page.state.invUsageLineItem;
    // istanbul ignore else
    if (evt && invUsageLineItem.fromlot !== evt.lotnum) {
      invUsageLineItem.fromlot = evt.lotnum;
      // reset split
      delete invUsageLineItem.invuselinesplit;
      this.invsplitjsonDS.clearState();
      this.invsplitjsonDS.resetState();
      await this.invsplitjsonDS.load({
        src: [],
        noCache: true,
      });
      // check default frombin consistent with lot chosen
      const binItems = this.binLookupDS.getItems();
      const found = binItems?.find((item) => {
        // istanbul ignore next
        return (
          item.binnum === invUsageLineItem.frombin &&
          item.lotnum === invUsageLineItem.fromlot
        );
      });
      // istanbul ignore else
      if (!found) {
        invUsageLineItem.frombin = "";
      }
    }
  }

  /**
   * Function to Issue current Inventory Usage
   */
  async issueInventoryUsage() {
    let currentItem = this.invUsageDS.item;

    let needsSave = false;
    //istanbul ignore else
    if (
      !this.page.state.draftInvUsage &&
      this.invusagejsonds.state.itemsChanged
    ) {
      needsSave = true;
    }

    // For those invusage recs directly from Maximo side, we always need validation while not real save.
    const saveSuccess = await this.saveInventoryUsage(needsSave);
    // check save result, stop issue if save failed.
    //istanbul ignore else
    if (!saveSuccess) {
      return;
    }

    // Prepares options data - status
    let status = INVUSE_STATUS_COMP;
    let synonymDomainsDS = this.app.findDatasource("synonymdomainDS");
    await synonymDomainsDS.initializeQbe();
    synonymDomainsDS.setQBE(
      "valueid",
      "=",
      INVUSESTATUS_SYNONYM_DOMAINID.concat("|").concat(INVUSE_STATUS_COMP)
    );
    const response = await synonymDomainsDS.searchQBE();
    let statusDescription = "";

    //istanbul ignore else
    if (response && response[0]) {
      status = response[0].value;
      statusDescription = response[0].description;
    }

    // Prepares options data - date
    let currDate = new Date();
    let dataFormatter = this.app.dataFormatter;
    currDate = dataFormatter.convertDatetoISO(currDate);

    let option = {
      record: currentItem,
      parameters: {
        status: status,
      },
      localPayload: {
        status: status,
        status_maxvalue: INVUSE_STATUS_COMP,
        status_description: statusDescription,
        statusdate: currDate,
      },
      responseProperties: "status",
    };

    //istanbul ignore next
    try {
      let response = await this.invUsageDS.invokeAction(
        "changeInvuseStatus",
        option
      );

      // istanbul ignore else
      if (response && Array.isArray(response) && response.length > 0) {
        response = response[0]._responsedata;
      }
      //istanbul ignore next
      if (response) {
        if (!this.app.device.isMaximoMobile) {
          // Needs to remove the corresponding invuselines from this.app.allinvuses for web version.
          this.updateAppInvUseLines(currentItem, true, true);
        }

        let label = this.app.getLocalizedLabel(
          "invusage_issued",
          "Inventory usage Issued."
        );
        this.app.toast(label, "success", "");
        // after issue success set issuedItem to true to disable issue button
        this.page.state.issuedItem = true;
      }
      this.computeEnableSave();
    } catch (error) {
      // istanbul ignore next
      log.t(TAG, error);
    }
    this.setSavingProcess(false);
  }
}

export default InventoryUsagePageController;
