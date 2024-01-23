/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {log} from '@maximo/maximo-js-api';

const TAG = 'InspFormLookupController';

class InspFormLookupController {
  constructor() {
    log.t(TAG, 'Created');
  }

  dialogInitialized(dialog) {
    log.t(TAG, 'Initialized');
    this.dialog = dialog;
    this.app = dialog.getApplication();
    this.loadFormRecommended();
  }

  dialogOpened() {
    this.clearPreviousSearch();
    this.loadFormRecommended();

  }  

  /**
  * Load datasource for recommended form
  */
  async clearPreviousSearch() {
    let lookupDs = this.app.findDatasource('inspFormLookupDS');
    await this.clearSearch(lookupDs);
  }    

  /**
  * Load datasource for recommended form
  */
  async loadFormRecommended() {
    
    this.app.currentPage.state.showRecommended = false;
    let inspFormRecommendedDS = this.app.findDatasource('inspRecommendedFormLookupDS');
    await inspFormRecommendedDS.initializeQbe();
    let filteredForms = [];

    if (inspFormRecommendedDS.items.length){
      if (this.app.currentPage.state.asset?.assetnum){
        inspFormRecommendedDS.setQBE('objectname', 'ASSET');
        inspFormRecommendedDS.setQBE('objectid', this.app.currentPage.state.asset.assetnum);
        filteredForms = await inspFormRecommendedDS.searchQBE();

      } else if  (this.app.currentPage.state.locations?.location){
        inspFormRecommendedDS.setQBE('objectname', 'LOCATION');
        inspFormRecommendedDS.setQBE('objectid', this.app.currentPage.state.locations.location);    
        filteredForms = await inspFormRecommendedDS.searchQBE();

      } 
    }
    if (filteredForms?.length) {  
      this.app.currentPage.state.showRecommended = true;
    }

  }

  /**
  * Select Form to be used
  * @param {Object} item selected object
  */
  selectFormItem(item) {

    this.app.currentPage.state.inspForm = item;
    this.app.currentPage.state.formSelection = `${item.name}`;

    if (this.app.currentPage.controllers && this.app.currentPage.controllers[0] && this.app.currentPage.controllers[0].checkRequerideFields) {
      this.app.currentPage.controllers[0].checkRequerideFields(); 
    }
    
    this.app.currentPage.findDialog('slidingFormsLookup').closeDialog();
  }


  /**
  * Select Recommended Form to be used
  * @param {Object} item object
  */
  selectFormItemRecommended(item) {

    this.loadFormInfo(item.inspformnum);

  }

  /**
  * Load Information for the selected Form
  * @param {Object} item object
  */
  async loadFormInfo(value) {
    let lookupDs = this.app.findDatasource('inspFormLookupDS');
    let search = ''

    /* istanbul ignore else  */
    if(lookupDs.lastQuery.searchText !== ''){
      search = lookupDs.lastQuery.searchText
      lookupDs.lastQuery.searchText = ''
    }

    await lookupDs.initializeQbe();
    lookupDs.setQBE('inspformnum', value);
    let items = await lookupDs.searchQBE();
    this.app.currentPage.state.inspForm = '';
    this.app.currentPage.state.formSelection = '';

    /* istanbul ignore else  */
    if (items?.length <= 1) {
      lookupDs.lastQuery.searchText = search
      await this.clearSearch(lookupDs);
    }
    if (items?.length) {
      this.app.currentPage.state.inspForm = items[0];
      this.app.currentPage.state.formSelection = `${items[0].name}`;
    }
    this.app.currentPage.callController('checkRequerideFields');
    this.app.currentPage.findDialog('slidingFormsLookup').closeDialog();
  }

  /**
   * Clear the datasource search
   * @param {ds} is database name
   */
     async clearSearch(ds) {
      /* istanbul ignore else  */
      if (ds && ds.lastQuery.qbe && JSON.stringify(ds.lastQuery.qbe) !== '{}') {
        ds.clearQBE();
        await ds.searchQBE(undefined, true);
      }
    }

}

export default InspFormLookupController;
