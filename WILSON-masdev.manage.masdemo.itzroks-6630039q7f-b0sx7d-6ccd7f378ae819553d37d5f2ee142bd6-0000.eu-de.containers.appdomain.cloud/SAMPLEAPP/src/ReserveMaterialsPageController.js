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

import SynonymUtil from './utils/SynonymUtil';
import { Device } from '@maximo/maximo-js-api';

class ReserveMaterialsPageController {
  /**
   * Function to set flag for 'put-data-failed' event
   */

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  constructor() {
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
  }

  //istanbul ignore next
  onSaveDataFailed() {
    this.saveDataSuccessful = false;
  }

  pageResumed() {
    this.page.state.multipleStore = false;
    this.app.state.openedFrom = '';
    this.loadPageResumed();
  }

  async loadPageResumed() {
    this.page.state.disableReservedMaterialAction = true;
    this.page.state.loadingReserverMaterials = false;
    const woReservedMaterialds = this.app.findDatasource(
      'woReservedMaterialds'
    );
    const woDetailResource = this.app.findDatasource('woMaterialResource');
    if (woDetailResource) {
      await woDetailResource.load({
        noCache: true,
        itemUrl: this.page.params.href,
      });
    }
    // istanbul ignore if
    if (woReservedMaterialds) {
      await woReservedMaterialds.initializeQbe();
      await woReservedMaterialds.searchQBE(undefined, true);

      let jreserveds = this.app.findDatasource('woReservedMaterialJsonds');
      let actualMatDs = this.app.findDatasource('reservedActualMaterialDs');
      this.page.hasAnyReservedItemAdded = false;

      //Removed the added reserved items from the list in device only.
      if (Device.get().isMaximoMobile) {
        await actualMatDs.load();
        let allActualItems = [];

        for (let i = 0; i < actualMatDs.dataAdapter.totalCount; i++) {
          if (!actualMatDs.isItemLoaded(i)) {
            await actualMatDs.load({ start: i });
          }

          allActualItems.push(actualMatDs.get(i));
        }

        let tempitems = [];
        let tempMatcheditems = [];

        for (let i = 0; i < woReservedMaterialds.items.length; i++) {
          this.page.matched = false;
          allActualItems.forEach((item) => {
            if (
              item.invreserveid &&
              item.invreserveid === woReservedMaterialds.items[i].invreserveid
            ) {
              this.page.matched = true;
              tempMatcheditems.push(woReservedMaterialds.items[i]);
            }
          });

          if (!this.page.matched) {
            this.page.hasAnyReservedItemAdded = true;
            let isExists = tempitems.some(
              (item) =>
                item.invreserveid === woReservedMaterialds.items[i].invreserveid
            );
            if (!isExists) {
              tempitems.push(woReservedMaterialds.items[i]);
            }
          }
        }

        this._resetDataSource(jreserveds);
        if (this.page.hasAnyReservedItemAdded) {
          await jreserveds.load({ src: tempitems, noCache: true });
        } else if (
          tempMatcheditems.length > 0 &&
          tempMatcheditems.length === woReservedMaterialds.items.length
        ) {
          await jreserveds.load({ src: [], noCache: true }); //When all items added show no records
        } else {
          await jreserveds.load({
            src: woReservedMaterialds.items,
            noCache: true,
          });
        }
      } else {
        this._resetDataSource(jreserveds);
        await jreserveds.load({
          src: woReservedMaterialds.items,
          noCache: true,
        });
      }

      this.page.state.reserveItemCount = jreserveds.items.length;
      this.page.state.showRotatingAssetList = false;
      
    }
  }

  /**
   * Reset DS and set src to load.
   */
  _resetDataSource(ds) {
    ds.clearState();
    ds.resetState();
  }

  /*
   * Get the selected items
   */
  async getSelectedItems() {
    const woReservedMaterialds = this.app.findDatasource(
      'woReservedMaterialJsonds'
    );
    let selectedItems = woReservedMaterialds.getSelectedItems();
    this.page.state.selectedReservedItems = selectedItems;

    // istanbul ignore else
    if (selectedItems && selectedItems.length > 0) {
      this.page.state.disableReservedMaterialAction = false;
    } else {
      this.page.state.disableReservedMaterialAction = true;
    }
  }

  /**
   * Get Rotating Asset lookup value for rotating material
   */
  async setSelectedRotatingAsset(){
    this.page.state.rotatingItemWithAsset =  this.page.state.rotatingItemWithAsset ?? [];
    let rotatingItem = this.page.state.rotatingItemWithNoAsset;
    const reservedRotatingAsset = this.app.findDatasource('reservedItemRotatingAssetDS');
    let selectedAssetRotating = reservedRotatingAsset.getSelectedItems();
    // istanbul ignore next
    if(rotatingItem[0] && selectedAssetRotating.length > 0){
      let rotItem = rotatingItem[0];
      let rotAsset = selectedAssetRotating[0];
      rotItem.rotassetnum = rotAsset.assetnum;
      this.page.state.items.push(rotItem);
      rotatingItem.shift();
    }
    // istanbul ignore next
    if(rotatingItem.length === 0 && this.page.state.items.length > 0){
      this.sendReservedItems();
      reservedRotatingAsset.clearSelections();
    }else{
      this.page.state.labelRotatingAsset = rotatingItem[0].description;
      await reservedRotatingAsset.initializeQbe();
      reservedRotatingAsset.setQBE('itemnum', '=', rotatingItem[0].itemnum);
      reservedRotatingAsset.setQBE('location', '=', rotatingItem[0].location);
      await reservedRotatingAsset.searchQBE();
      this.page.state.showRotatingAssetList = true;
    }
  }

  async sendReservedItems(){
    let selectedResItems = this.page.state.items;
    let setDS = this.app.findDatasource('defaultSetDs');
    let synonymdomainData = this.app.findDatasource('synonymdomainData');
    let issueType = await SynonymUtil.getSynonymDomain(synonymdomainData, 'ISSUETYP', 'ISSUE');
    let reserveActualds = this.app.findDatasource('reservedActualMaterialDs');
    let reservedActualdsJson = this.page.findDatasource('woReservedMaterialJsonds');
    let itemsetid = null;
    //loop for selected rows
    let multiMatusetrans = [];
    // istanbul ignore next
    if(setDS && setDS.item['itemsetid']) {
			itemsetid = setDS.item['itemsetid'];
		}
    if (selectedResItems && selectedResItems.length > 0) {
    const onDataFailedHandler = this.onSaveDataFailed.bind(this);
    try {
      for (let i = 0; i < selectedResItems.length; i ++) {
        let matusetransTemp = {
          itemnum: selectedResItems[i].itemnum,
          storeloc: selectedResItems[i].location,
          binnum: selectedResItems[i].binnum,
          location: selectedResItems[i].oplocation,
          issuetype: issueType.maxvalue,
          positivequantity: selectedResItems[i].reservedqty,
          requestnum: selectedResItems[i].requestnum,
          description: selectedResItems[i].description,
          locdesc: selectedResItems[i].locationsdesc,
          invreserveid: selectedResItems[i].invreserveid,
          matusetransid: selectedResItems[i].invreserveid,
          orgid: reservedActualdsJson.orgid,
          restype: reservedActualdsJson.restype,
          siteid: selectedResItems[i].storelocsiteid,
          storelocsiteid: reservedActualdsJson.storelocsiteid,
          itemsetid:itemsetid
        };
  
        // istanbul ignore next
      if (selectedResItems[i].isrotating) {
        matusetransTemp.rotassetnum = selectedResItems[i].rotassetnum;
        matusetransTemp.location = selectedResItems[i].oplocation; 
      }
        multiMatusetrans.push(matusetransTemp);        
      }

      let option = {
        responseProperties: 'matrectransid,anywhererefid,requestnum',
        localpayload: multiMatusetrans
      };

      this.saveDataSuccessful = true;
      reserveActualds.on('put-data-failed', onDataFailedHandler);
      await reserveActualds.bulkAdd(multiMatusetrans, option);
    } catch(error) {
     
      //handle error
    } finally {
      this.page.state.loadingReserverMaterials = false;
      this.page.state.disableReservedMaterialAction = true;
      this.page.state.selectedReservedItems = null;
     
      // istanbul ignore next
      if (this.saveDataSuccessful) {
        
        this.app.toast(this.app.getLocalizedLabel('resevered_items',`Reserved items added`), 'success');
        
        reserveActualds.off('put-data-failed', onDataFailedHandler);
        this.app.setCurrentPage({name: 'report_work', params: {itemhref: this.page.params.href }});
      }
    }
  }
  }

  /*
   * Save the reserved items
   */
  async setReservedItems() {
    this.page.state.showRotatingAssetList = false;
    this.page.state.loadingReserverMaterials = true;
    this.page.state.rotatingItemWithNoAsset = [];
    this.page.state.items = [];
    let selectedResItems = this.page.state.selectedReservedItems;   
    //loop for selected rows
    if (selectedResItems && selectedResItems.length > 0) {
      for (let i = 0; i < selectedResItems.length; i ++) {
        if (selectedResItems[i].isrotating) {
          this.page.state.rotatingItemWithNoAsset.push(selectedResItems[i]);
          }
          else{
            this.page.state.items.push(selectedResItems[i]);
          }
        }
      }
      if(this.page.state.rotatingItemWithNoAsset.length === 0){
        this.sendReservedItems();
      }
      else{
        this.setSelectedRotatingAsset();
      }
    }  
}

export default ReserveMaterialsPageController;
