/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {log} from '@maximo/maximo-js-api';
import WOUtil from './utils/WOUtil';

const TAG = 'ChangeStatusController';

class TaskMeterController {

  dialogInitialized(page, app) {
    this.page = page;
    this.app = this.page.parent.state.appVar;
    delete this.page.parent.state.appVar;
    this.page.state.selectedStatus = "";
    this.page.state.selectedStatusMaxValue = "";
    this.page.state.statusMemo = "";
    log.t(TAG, 'dialogInitialized : disableDoneButton --> ' + this.page.parent.state.disableDoneButton +
      " selectedStatus --> " + this.page.state.selectedStatus +
      " statusMemo --> " + this.page.state.statusMemo);
  }

  /**
   * Default method which is called every time when dialog is opened
   * in this we get click item and set it's meter values and if meter value previously submitted 
   * then make it's input read only
   */
  async dialogOpened() {
    this.page.parent.state.disableDoneButton = true;
    this.page.state.selectedStatus = "";
    this.page.state.selectedStatusMaxValue = "";
    this.page.state.statusMemo = "";
    delete this.page.parent.state.appVar;
    const woPlanTaskDetailds = await  this.page.parent.getApplication().findDatasource('woPlanTaskDetailds');
    let selectedItem = woPlanTaskDetailds.items[0]?._selected
    woPlanTaskDetailds.items.forEach((item) => {
      // istanbul ignore else
      if(item.workorderid === selectedItem) {
        selectedItem = item;
      }
    });
    if(selectedItem?.measurementvalue || selectedItem?.observation) {
      this.page.parent.state.taskMeterDialogInit = true;
      selectedItem.newreading = selectedItem.measurementvalue || selectedItem.observation;
      const datevalue = selectedItem.measuredate || new Date(); // fail safe code in edge case classic side date value is not saved and only reading was saved
      selectedItem.computedMeterCurDate = WOUtil.getOnlyDatePart(datevalue, this.page.parent.getApplication());
      selectedItem.computedMeterCurTime = this.page.parent.getApplication().dataFormatter
        .convertISOtoDate(datevalue)
        .getTime();
    } else {
      selectedItem.newreading = null;
    }
    const selectedTaskList = this.page.datasources['woPlanTaskDetaildsSelected'];
    await selectedTaskList?.load({ noCache: true, src: selectedItem });
    this.page.parent.state.taskMeterDialogInit = false;
  }

  /**
   * empty meter reading value for character type reading on click of close button
   * @param {*} event - clicked event and it's item
   */
  async clearCharacterMeterReaing(event){
    //istanbul ignore else
    if(event && event.item) {
      event.item["newreading"] = event.newreading;
    }
    WOUtil.enableDisableSaveBtn(this.page);
  }

  /**
   * On click of right chevron open look up character meter reading
   * @param {*} event - click event and it's item
   */
  async openMeterLookup(event) {
    let dnewreadingDS = this.page.parent.getApplication().findDatasource("dsnewreading");
    await WOUtil.openMeterLookup(
      this.page,
      event.item,
      dnewreadingDS,
      event.datasource,
      "meterReadingLookupNew",
      true
    );
  }
}

export default TaskMeterController;
