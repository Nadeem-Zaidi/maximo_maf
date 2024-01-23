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

import {Device,log} from '@maximo/maximo-js-api';
const TAG = 'RelatedWoController';

class RelatedWoController {
  pageInitialized(page, app) {
    log.t(TAG, 'Page Initialized');
    this.app = app;
    this.page = page;
  }

  /**
   * This method is called by clicking on create follow up work order button on
   * related work order page for specific work order accordingly.
   * @param {event} event
   */
  async createRelatedAndFollowUpWo(event) {    
    let woDtlPage = this.app.findPage('workOrderDetails');
    let woDetailds = woDtlPage.datasources['woDetailResource'];
    let workorder = woDetailds.item;
    this.app.setCurrentPage({name: 'woedit', resetScroll: true, params: {workorder, followup:true, href: workorder.href , wonum: workorder.wonum, siteid: workorder.siteid}});
    // istanbul ignore else
    if (this.app.currentPage) {
      this.app.currentPage.callController('loadRecord', workorder);
    }
  }

  /**
   * Redirects to work order detail page
   * @param {event} event
   */
  async showWoDetailPage(event) {
    this.app.setCurrentPage({
      name: "workOrderDetails",
      resetScroll: true,
      params: {wonum: event.item.wonum, siteid: event.item.siteid, href: event.item.href}
    });
  }

  /*
   * Method to resume the page and load related workorder datasource
   */
  //istanbul ignore next
  async pageResumed(page, app) {
    if(!page.params?.followupclickable){
      this.page.state.nonClickAble = true;
      this.page.state.clickAble = false;
    }else{
      this.page.state.nonClickAble = false;
      this.page.state.clickAble = true;
    }
    //to disable the chevron button in devices if we  create new workorder in devices
    if(page.params?.chevronDisable){
      this.page.state.wonum = undefined;
    }
    const woDetailResource = page.datasources['woDetailRelatedWorkOrder'];
    await woDetailResource.load({noCache:true, itemUrl: page.params.itemhref});
  }

  /*
   * Method for redirect to workorderdetails page on click of followup workorder
   */
  async openEditWo(event){
    let myWorkds;
    let device = Device.get();
    //to set the loading on button click
    this.page.state.loading = true;
    this.page.state.itemnum =  event.childitem.relatedreckey;
    /* istanbul ignore else */
    if(!device.isMaximoMobile){
      //this block will excute in case of web
      myWorkds= this.app.findDatasource('myworkDS');
      await myWorkds?.load();
    }else{
      //this block will excute in case of device because myworkDS datasource will not be availble in device
      myWorkds= this.app.findDatasource('myworkCreatedLocally');
      await myWorkds?.forceReload();
    }
    /* istanbul ignore next */
    await myWorkds?.initializeQbe();
    myWorkds?.setQBE('wonum', event.childitem.relatedreckey);
    myWorkds?.setQBE('siteid', event.item.siteid);
    let filteredDomainValues = await myWorkds?.searchQBE();
    /* istanbul ignore next */
    if(filteredDomainValues?.[0]?.href){
      // when will click on chveron button then current page will be set to workorderdetails and depth will be equal to 1 and after that chevron button will not be visible
      this.page.state.loading = false;
      this.app.setCurrentPage({
        name: "workOrderDetails",
        resetScroll: false,
        params: { href:filteredDomainValues[0].href, wonum: event.childitem.relatedreckey,depth:1},
        lastPage:"relatedWorkOrder",
        pushStack:true
      });  
    }
  }
}

export default RelatedWoController;
