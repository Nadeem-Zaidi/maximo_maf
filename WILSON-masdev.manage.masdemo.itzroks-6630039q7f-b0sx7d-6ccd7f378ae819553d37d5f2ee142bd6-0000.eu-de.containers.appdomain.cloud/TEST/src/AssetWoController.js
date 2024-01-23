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
const TAG = 'AssetWoController';

class AssetWoController {
  pageInitialized(page, app) {
    log.t(TAG, 'Page Initialized');
    this.app = app;
    this.page = page;
  }

  /*
   * Build Json DataSource on the basis of items for asset workOrder.
   * assetQuery and locationQuery should be an array of string like ["COMP", "CLOSE"] which is reading from datasource where attribute dynamically
   */
  async loadRecord(event, assetQueryList, locationQueryList) {
    const workOrderLimit = this.app.state.workorderLimit;
    let assetWorkOrderList = this.page.datasources['assetWorkOrderList'];
    let assetWo = [];
    this.page.assetNumDesc = '';
    this.page.locationNumDesc = '';

    let locationWorkOrderList = this.page.datasources['locationWorkOrderList'];
    let locationWo = [];


    //to get the Date before 6 month
    let d = new Date();
    d.setDate(d.getDate() - 180);
    let dataFormatter = this.app.dataFormatter;
    let currDate = dataFormatter.convertDatetoISO(d);

    let wobyAsset = this.assetLocationWO(event.item.wobyasset, event.woNum);
    // istanbul ignore else
    if(wobyAsset && wobyAsset.length) {
      let loopLimit =  0;
      for (let i = 0; i < wobyAsset.length; i++) {
        // istanbul ignore else
        if(wobyAsset[i].statusdate<currDate){
          this.page.state.woVal = wobyAsset[i].wonum;
          wobyAsset[i].hideChevron = true;
        }
        else{
          wobyAsset[i].hideChevron = false;
        }
        // Check if Status_maxvalue is same as where query parameter like COMP or CLOSE then it will be added to history page
        if (assetQueryList.includes(wobyAsset[i].status_maxvalue)) {
          assetWo.push({
            wonum: wobyAsset[i].wonum,
            description: wobyAsset[i].description,
            status: wobyAsset[i].status,
            status_maxvalue: wobyAsset[i].status_maxvalue,
            status_description: wobyAsset[i].status_description,
            worktype: wobyAsset[i].worktype,
            statusdate : wobyAsset[i].statusdate,
            computedWorkTypeWonum:this._computedWorkTypeWonum(wobyAsset[i]),
            siteid: wobyAsset[i].siteid,
            hideChevron : wobyAsset[i].hideChevron
          });
          loopLimit += 1;
          if (loopLimit === workOrderLimit) {
            break;
          }
        }
      }
      this.page.assetNumDesc = event.item.assetnum + ' ' + event.item.description;
    }
    let wobyLocation = this.assetLocationWO(event.locItem.wobylocation, event.woNum);
    // istanbul ignore else 
    if(wobyLocation && wobyLocation.length) {
      let loopLimit = 0;
     
      for (let i = 0; i < wobyLocation.length; i++) {
        // istanbul ignore else
        if(wobyLocation[i].statusdate<currDate){
          this.page.state.woVal = wobyLocation[i].wonum;
          wobyLocation[i].hideLocChevron = true;
        }
        else{
          wobyLocation[i].hideLocChevron = false;
        }
        // Check if Status_maxvalue is same as where query parameter like COMP or CLOSE then it will be added to history page
        if (locationQueryList.includes(wobyLocation[i].status_maxvalue) && this.checkWorkOrderUnique(wobyLocation[i].wonum, wobyLocation[i].siteid, assetWo)) {
          locationWo.push({
            wonum: wobyLocation[i].wonum,
            description: wobyLocation[i].description,
            status: wobyLocation[i].status,
            status_maxvalue: wobyLocation[i].status_maxvalue,
            status_description: wobyLocation[i].status_description,
            worktype: wobyLocation[i].worktype,
            statusdate: wobyLocation[i].statusdate,
            computedWorkTypeWonum: this._computedWorkTypeWonum(wobyLocation[i]),
            siteid: wobyLocation[i].siteid,
            hideLocChevron : wobyLocation[i].hideLocChevron
          });
          loopLimit += 1;
          if (loopLimit === workOrderLimit) {
            break;
          }
        }
      }
      this.page.locationNumDesc = event.locItem.location + ' ' + event.locItem.description;
    }

    this.page.state.isAsset = !event.item.assetnum || !wobyAsset?.length ? true : false;
    this.page.state.isLocation = !event.locItem.location || !wobyLocation?.length ? true : false;

    await assetWorkOrderList.load({ src: assetWo, noCache: true });
    await locationWorkOrderList.load({ src: locationWo, noCache: true });
  }

  /**
   * Function to return true or false based on verfy workOrderId present in array or not
   * @param {Number} workOrderId 
   * @param {Array} workOrderList 
   * @returns 
   */
  checkWorkOrderUnique(workOrderId, siteid, workOrderList) {
    return workOrderList.find((workOrder) => workOrder.wonum === workOrderId && workOrder.siteid === siteid) ? false : true;
  }

  /**
   * Function to return the asset/location work order history excluding current WO.
   * @param {Array} items should contain asset/location work order history.
   * @param {String} woNum should contain current work order number.
   */
  assetLocationWO(items, woNum) {
    // istanbul ignore else
    if(items && items.length) {
      let assetLocWO = items.filter((item => item.wonum !== woNum));
      return assetLocWO;
    }
  }

  /*
   * Compute workType and wonum combination.
   */
  _computedWorkTypeWonum(item) {
    let computedWorkType = null;

    //istanbul ignore else
    if (item && item.wonum) {
      item.worktype
        ? (computedWorkType = item.worktype + ' ' + item.wonum)
        : (computedWorkType = item.wonum);
    }
    return computedWorkType;
  }

   /*
   * This method will redirect to the workorder details page from Asset and Location history page when will click on chevron
   */
  async openAssetLocHstryDtlsPage(event){
    this.page.state.loading = true;
    this.page.state.wonumVal = event.item.wonum;
    
    let completedClosedDs = this.app.findDatasource('completedCloseDS');
    await completedClosedDs?.load();
    await completedClosedDs?.initializeQbe();
    completedClosedDs?.setQBE('wonum', event.item.wonum);
    completedClosedDs?.setQBE('siteid', event.item.siteid);
    let filteredCompClose = await completedClosedDs?.searchQBE();

    // istanbul ignore else
    if(filteredCompClose?.[0]?.href){
      this.page.state.loading = false;
      this.app.setCurrentPage({
        name: "workOrderDetails",
        resetScroll: false,
        params: { href:filteredCompClose[0].href, wonum: event.item.wonum,depth:1,lastPage :'assetWorkOrder'},
        lastPage :'assetWorkOrder',
        pushStack:true
      });
    }
   
  }
}

export default AssetWoController;
