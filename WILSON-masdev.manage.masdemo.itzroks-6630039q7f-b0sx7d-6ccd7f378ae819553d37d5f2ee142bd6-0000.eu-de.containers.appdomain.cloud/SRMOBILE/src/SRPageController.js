/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import SRCommonController from './SRCommonController';
import { Browser } from '@maximo/maximo-js-api/build/device/Browser';
import 'regenerator-runtime/runtime';

class SRPageController extends SRCommonController {

  /**
   * This method is only ever called once.
   * @param {*} page 
   * @param {*} app 
   */
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.loadSRListData("activerequests");
  }



  // istanbul ignore next
  async pageResumed(page) {
    // If coming back from createSR page, register srDS back to main page
    if (this.app.findPage("createSR").findDatasource("srDS")) {
      delete this.page.datasources.srDS;
      this.page.registerDatasource(this.app.findDatasource("srDS"));

      if (this.app.findPage("createSR").params?.href) {
        this.page.findDatasource("srDS").clearState();
      }
    }

    this.trackUserLogin(page);
    let incomingContext = this.app.state.incomingContext;
    if (incomingContext && incomingContext.breadcrumb && incomingContext.breadcrumb.enableReturnBreadcrumb) {
      this.page.state.breadcrumbWidth = this.app.state.screen.size === 'sm' ? 68 : 50;
    }
    this.app.state.valuesaved = false;
    this.refreshRequestsInMainPage();
  }



  async refreshRequestsInMainPage() {
    const srDS = this.app.findDatasource("srDS");
    srDS.options.selectedRecordHref = "";
    if (this.app.state.refreshActiveRequests || srDS.__newItems) {
      this.app.state.pageLoading = true;
      try {
        await srDS.forceReload();
      } finally {
        this.app.state.pageLoading = false;
        this.app.state.refreshActiveRequests = false;
      }
    }
  }



  /*
   * Method to store and load the user login detail
   */
  trackUserLogin(page) {
    let browser = Browser.get();
    let firstLoginData = browser.loadJSON('FirstLoginData', false);
    let date = new Date();
    let newDate = date.toLocaleDateString();
    if (!firstLoginData || !firstLoginData.date) {
      firstLoginData = { 'date': newDate, 'isFirstLogIn': true };
    } else {
      if (firstLoginData.date === newDate) {
        firstLoginData.isFirstLogIn = false;
      } else {
        firstLoginData.date = newDate;
        firstLoginData.isFirstLogIn = true;
      }
    }
    browser.storeJSON('FirstLoginData', firstLoginData, false);
    page.state.firstLogin = firstLoginData.isFirstLogIn;
  }



  /**
   * Load Service Request list data on the basis of selection from dropdown.
   * @param {*} evt Dropdown item selected
   */
  async loadSRListData(arg) {
    if (this.app.datasources.srDS.state.currentSearch) {
      this.app.datasources.srDS.clearState();
    }

    switch (arg) {
      case "completedrequests":
        this.page.state.emptystring = this.app.getLocalizedLabel('noCompletedRequests', 'No completed requests');
        this.filterSrByStatus(this.app.state.synonym.completedSrStatusList);
        break;
      case "unsyncedrequests":
        this.page.state.emptystring = this.app.getLocalizedLabel('noUnsyncedRequests_text', 'No unsynced requests');
        this.loadUnsyncData();
        break;
      default: //activerequests
        this.page.state.emptystring = this.app.getLocalizedLabel('noActiveRequests_text', 'No active requests');
        this.filterSrByStatus(this.app.state.synonym.activeSrStatusList);
    }
  }



  async filterSrByStatus(qbeClause) {
    this.app.state.pageLoading = true;
    try {
      while(this.app.state.synonym.loading) {
        await this.retryWait(50);
      }
      let srDS = this.app.findDatasource("srDS");
      await srDS.initializeQbe();
      this.app.state.canLoad.sr = true;
      srDS.setQBE("status", "in", qbeClause);
      await srDS.searchQBE(undefined, true);
    } finally {
      this.app.state.pageLoading = false;
    }
  }

  retryWait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  /**
   * Loads data that was created in device but yet not sent to server
   */
  //istanbul ignore next
  async loadUnsyncData() {
    if (!this.app.state.isMobileContainer) {
      return;
    }
    let unsyncedData = await this.app.client.txManager.info.recordsWithTransactions();
    if (unsyncedData) {
      const unsyncedDataSize = unsyncedData.length;
      const newStatus = this.app.state.synonym.newSRStatus.description;
      let unsyncedDataList = [];
      for (let i = 0; i < unsyncedDataSize; i++) {
        let unsyncedTrans = unsyncedData[i].transactions;
        if (unsyncedTrans && unsyncedTrans[0].app === "srmobile" && unsyncedData[i].record.href.startsWith("TEMP_HREF")) {
          const label = this.app.getLocalizedLabel('srCreated_msg', 'Request {0} submitted', [(i + 1)]);
          let unsyncedDataRec = unsyncedData[i].record;
          unsyncedDataList.push({
            ticketid: label,
            ticketuid: unsyncedDataRec.ticketuid,
            status_description: newStatus,
            assetnum: unsyncedDataRec.assetnum,
            location: unsyncedDataRec.location,
            description: unsyncedDataRec.description,
            description_longdescription: unsyncedDataRec.description_longdescription
          });
        }
      }
      this.page.datasources["unsyncedrequests"].load({
        src: unsyncedDataList
      });
    }
  }



  async openNewRequestPage() {
    this.app.setCurrentPage({
      name: 'newRequest'
    });
  }



  /**
   * Redirects to details page
   * @param {Object} listItem - clicked item from list
   */
  showSRDetail(item) {
    // istanbul ignore else
    if (this.page.state.selectedDropdown !== 'unsyncedrequests') {
      this.app.state.selectedSR = item;
      this.app.setCurrentPage({
        name: 'srDetails',
        resetScroll: true,
        params: {
          firstLogin: this.page.state.firstLogin
        },
      });
    }
  }



  /**
   * This method is called by clicking on the cancel service request button on the service request list page
   */
  async showCancelSRdialog(evt) {
    this.app.state.selectedSR = evt.item;
    this.page.state.dialogBMXMessage = this.app.getLocalizedLabel(
      'confirmCancelSRlabel',
      'Do you want to cancel this Service Request?'
    );
    this.page.showDialog('sysMsgDialog_srpage');
  }



  /**
   * This method is invoked after getting confirmation from showCancelSR-Dialog
   * @param {*} evt 
   * @returns 
   */
  async cancelSR(evt) {

    //istanbul ignore else
    if (evt.item.relatedwoexists) {
      //Display message
      let label = this.app.getLocalizedLabel(
        'sr_cannot_cancel_msg',
        'Can not cancel. There are related work orders'
      );
      this.app.toast(label);
      return;
    }

    let sr = evt.item;
    let status = "CANCELLED";
    let synonymDomainsDS = this.app.findDatasource('synonymdomainDS');
    await synonymDomainsDS.initializeQbe();
    synonymDomainsDS.setQBE('domainid', '=', 'SRSTATUS');
    synonymDomainsDS.setQBE('valueid', '=', 'SRSTATUS|CANCELLED');
    const response = await synonymDomainsDS.searchQBE();
    //istanbul ignore else 
    if (response && response[0]) {
      status = response[0].value;
    }

    let option = {
      record: sr,
      parameters: {
        status: status,
      },
      responseProperties: 'status',
      localPayload: {
        status: status,
        status_maxvalue: 'CLOSED'
      },
      query: { interactive: false }
    };

    try {
      this.page.state.loadingcomp = true;

      let srDS = this.app.findDatasource("srDS");
      let response = await srDS.invokeAction('changeStatus', option);

      // istanbul ignore next
      if (response && response.status_maxvalue !== evt.item.status_maxvalue) {
        let label = "";
        if (evt.item.ticketid) {
          label = this.app.getLocalizedLabel('srCancelled_msg', 'Request {0} was cancelled', [evt.item.ticketid]);
        } else {
          label = this.app.getLocalizedLabel('srCancelled_nonumber_msg', 'Request was cancelled');
        }
        this.app.toast(label, 'success');
        await srDS.forceReload();
      }
    } finally {
      this.page.state.loadingcomp = false;
    }

  }



  /**
   * Sets default state
   */
  setDefaults() {
    this.page.state.selectedSwitch = 0;
  }

} export default SRPageController;
