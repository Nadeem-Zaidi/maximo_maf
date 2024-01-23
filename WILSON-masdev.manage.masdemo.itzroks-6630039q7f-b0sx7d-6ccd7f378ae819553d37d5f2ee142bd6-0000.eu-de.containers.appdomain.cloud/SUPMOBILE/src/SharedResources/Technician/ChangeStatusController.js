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

import {log, Device} from '@maximo/maximo-js-api';
import WOUtil from './utils/WOUtil';

const TAG = 'ChangeStatusController';

class ChangeStatusController {

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

  dialogOpened() {
    this.page.parent.state.disableDoneButton = true;
    this.page.state.selectedStatus = "";
    this.page.state.selectedStatusMaxValue = "";
    this.page.state.statusMemo = "";
    delete this.page.parent.state.appVar;
    log.t(TAG, 'dialogOpened : disableDoneButton --> ' + this.page.parent.state.disableDoneButton +
      " selectedStatus --> " + this.page.state.selectedStatus +
      " statusMemo --> " + this.page.state.statusMemo);
  }

  /*
   * Method to change the status. This is called from from the following pages:
   *    - Schedule Page
   *    - Work Detail Page
   */
  //istanbul ignore next
  async changeStatus() {

    let parentPage = this.page.parent;

    let selectedDSName = parentPage.state.referenceDS;
    let workorder = parentPage.state.woItem;
    let selectedStatus = this.page.state.selectedStatus;
    let referencePage;
    let hazardReviewedReq = this.app.state.systemProp && this.app.state.systemProp["maximo.mobile.safetyplan.review"];
    let woDetailDs = this.app.findDatasource("woDetailds");
    //Open wohazard if not reviewed
    if (workorder.wohazardcount > 0 && !woDetailDs.item.splanreviewdate && this.page.state.selectedStatusMaxValue === 'INPRG' && hazardReviewedReq === '1') {
      let label = this.app.getLocalizedLabel('safetyplanreview_status', 'You must review the safety plan before you change the status.');
      this.app.toast(label, 'error', null, null, false);
      await WOUtil.openWOHazardDrawer(this.app, this.app.findPage(parentPage.state.referencePage), {item: this.page.parent.state.woItem}, parentPage.state.referencePage === "schedule"? "slidingwohazard" : "wohazardDrawer");
      parentPage.findDialog(parentPage.state.statusDialog).closeDialog();
      return;
    }

    if (parentPage && (parentPage.state.referencePage === 'schedule' || parentPage.state.referencePage === 'approvals')) {
      referencePage = parentPage;
    } else {
      referencePage = this.app.pages.find((element) => {
        if (element.name === parentPage.state.referencePage) {
          return element;
        } else {
          return '';
        }
      });
    }
    log.t(TAG, "changeStatus : selectedStatus --> " + selectedStatus);
    let currDate = new Date();
    let dataFormatter = this.app.dataFormatter;

    if (selectedStatus) {
      log.t(
        TAG,
        "changeStatus : Page Item = " +
        parentPage.state.woItem.wonum +
        " selectedDSName --> " +
        selectedDSName +
        " Parent Page woItem --> " +
        parentPage.state.woItem.wonum
      );
      log.t(TAG, "changeStatus : currDate --> " + currDate);

      currDate = dataFormatter.convertDatetoISO(currDate);

      log.t(TAG, "changeStatus : currDate Formatted --> " + currDate);

      let currWODatasource = referencePage.datasources[selectedDSName];

      let action = 'changeStatus';
      let option = {
        record: workorder,
        parameters: {
          status: this.page.state.selectedStatus,
          statusdate: currDate,
          memo: this.page.state.statusMemo
        },
        headers: {
          'x-method-override': 'PATCH'
        },
        responseProperties: 'status',
        localPayload: {
          status: this.page.state.selectedStatus,
          status_maxvalue: this.page.state.selectedStatusMaxValue,
          status_description: this.page.state.selectedStatusDescription,
          statusdate: currDate,
        },
        query: {interactive: false},
        waitForUpload: true,
        esigCheck: 0
      };
      if(this.checkEsigRequired()) {
        option.esigCheck = 1;
      }
      if (workorder.woactivity && Device.get().isMaximoMobile) {
        let woTasks = await this.app.controllers[0].getWoActivity(this.page, this.app, workorder);
        if (woTasks.length){
          option.localPayload["woactivity"] = woTasks;
        }
      }
      try {
        parentPage.state.loadingstatus = true;
        await currWODatasource.invokeAction(action, option);

        await currWODatasource.forceReload();

        // Fetch DataSource associated with Schedule Page and reload ..       
        if (
          referencePage &&
          referencePage.name &&
          (referencePage.name === 'schedule' || referencePage.name === 'approvals')
        ) {
          // Refresh DS for workOrderDetails if initialized ..
          let woDetailResourceDS = this.app.findDatasource('woDetailResource');
          if (woDetailResourceDS) {
            await woDetailResourceDS.forceReload();
          }
        } else if (
          referencePage &&
          parentPage.name &&
          referencePage.name === "workOrderDetails"
        ) {
          // Refresh DS for schedule
          const schPage = this.app.findPage("schedule") || this.app.findPage('approvals');
          let woorkderListDS = this.app.findDatasource(schPage.state.selectedDS);
          if (woorkderListDS) {
            await woorkderListDS.forceReload();
          }
        }

        // Close the dialog .. this.page is the dialog's page, hence traverse to the parent page
        // and then call findDialog / closeDialog ..
        parentPage.findDialog(parentPage.state.statusDialog).closeDialog();

        //Navigate back to list page if status WO changed to COMP, CAN, CLOSE
        if (this.page.state.selectedStatusMaxValue === 'COMP' || this.page.state.selectedStatusMaxValue === 'CAN' || this.page.state.selectedStatusMaxValue === 'CLOSE') {
          const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
          this.app.setCurrentPage({name: schPage});
        }

      } finally {
        parentPage.state.loadingstatus = false;
      }
    }

  }

  /**
   * In system properties we would get list of flag on which we have to ask for eSigCheck
   * if current status matches in list we would pass esigCheck 1 and on based of it graphite component
   * will handle to show prompt of esig
   * @returns 1 or 0 (boolean numeric value)
   */
  checkEsigRequired() {
    const esigCheck = this.app.state.systemProp && this.app.state.systemProp["maximo.mobile.wostatusforesig"];
    const allowedSignature = esigCheck? esigCheck
      .split(',')
      .map((status) => status.trim()): [];
      const addEsig = allowedSignature.length > 0 &&
      allowedSignature.indexOf(this.page.state.selectedStatus) > -1;
    return (addEsig) ? 1 : 0;
  }


  selectStatus(item) {
    log.t(TAG, 'selectStatus : SelectStatus called .. ' + JSON.stringify(item));
    this.page.state.selectedStatus = item.value;
    this.page.state.selectedStatusMaxValue = item.maxvalue;
    this.page.state.selectedStatusDescription = item.description;
    this.page.parent.state.compDomainStatus = item.value + new Date().getTime();
    let workorder = this.page.parent.state.woItem;
    let allowedSignatureSystemProp = this.app.state.systemProp && this.app.state.systemProp["maximo.mobile.statusforphysicalsignature"];
   
    // istanbul ignore else
    if (allowedSignatureSystemProp) {
      let allowedSignature = allowedSignatureSystemProp
        .split(',')
        .map((status) => status.trim());

        this.page.parent.state.enableSignatureButton =
        allowedSignature.length > 0 &&
        allowedSignature.indexOf(item.value) > -1;
    }
    // istanbul ignore next
    if((item.maxvalue === 'COMP' || item.maxvalue === 'CLOSE') && workorder.assetisrunning === false && workorder.assetnumber && item._selected) {
      this.app.callController('checkDownPrompt',{workorder:workorder,page: this.page.parent});
    }
    if (this.page.parent.datasources.dsstatusDomainList && this.page.parent.datasources.dsstatusDomainList.state.selection.count > 0) {
      this.page.parent.state.disableDoneButton = false;
    } else {
      this.page.parent.state.disableDoneButton = true;
    }
  }

  setStatusMemo(event) {
    this.page.state.statusMemo = event.currentTarget.value;
    log.t(TAG, 'setStatusMemo : statusMemo --> ' + this.page.state.statusMemo);
  }

  /**
   * This method invokes change status API once signature is uploaded.
   */
  async onSignatureUpload() {
    await this.changeStatus();
    let woDetailResourceDS = this.app.findDatasource('woDetailResource');
    //istanbul ignore else
    if (woDetailResourceDS) {
      await woDetailResourceDS.forceReload();  
      this.app.state.doclinksCountData[woDetailResourceDS.item.wonum] = Device.get().isMaximoMobile ? woDetailResourceDS.item.doclinks.member.length : woDetailResourceDS.item.doclinkscount;
      this.app.state.doclinksCount = this.app.state.doclinksCountData[woDetailResourceDS.item.wonum];
    }
  }

  /**
   * This method invokes on task status selection.
   */
  selectTaskStatus(item) {
    log.t(TAG, 'selectStatus : SelectStatus called .. ' + JSON.stringify(item));
    this.page.parent.state.selectedTaskStatus = item;
    if (this.page.parent.datasources.taskstatusDomainList && this.page.parent.datasources.taskstatusDomainList.state.selection.count > 0) {
      this.page.parent.state.disableDoneButton = false;
    } else {
      this.page.parent.state.disableDoneButton = true;
    }
  }
}

export default ChangeStatusController;
