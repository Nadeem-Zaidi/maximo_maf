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

class SRDetailsController extends SRCommonController {

  /**
   * This method is only ever called once.
   * @param {*} page 
   * @param {*} app 
   */
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }



  /**
   * Method to resume the page and load service request details
   * @param {*} page 
   * @param {*} app 
   */
  async pageResumed(page, app) {
    page.state.gpsLocationSaved = false;
    //istanbul ignore next
    if (page.params.firstLogin) app.state.highlightStop = false;
    this.setCurrentSR();
    this.loadTagCounts();
    this.loadSpecifications();
    this.loadAssignedTo();
  }



  async setCurrentSR() {
    this.app.findDatasource("srDS").currentItem = this.app.state.selectedSR;
  }



  async loadTagCounts() {
    if (this.page.params.doclinksCountOverridden) {
      this.page.params.doclinksCountOverridden = false;
    } else {
      this.page.state.doclinksCount = this.app.state.selectedSR.computedDoclinksCount;
      this.page.state.worklogCount = this.app.state.selectedSR.computedWorklogCount;
    }
  }



  async loadSpecifications() {
    this.app.state.canLoad.ticketspec = true;
    let filteredItems = [];
    let srDetailSpecItems = await this.app.findDatasource("srSpecDS").forceReload();
    //istanbul ignore next
    if (srDetailSpecItems) {
      srDetailSpecItems.forEach((item) => {
        if (item.alnvalue || item.numvalue || item.tablevalue || item.datevalue) {
          filteredItems.push(item);
        }
      });
    }
    this.page.datasources["srDetailSpecDSui"].load({ src: filteredItems, noCache: true });
  }



  async loadAssignedTo() {
    this.app.state.canLoad.assignedto = true;
    this.app.findDatasource("srOwnerPersonDS").forceReload();
    this.app.findDatasource("srOwnerGroupDS").forceReload();
  }

} export default SRDetailsController;
