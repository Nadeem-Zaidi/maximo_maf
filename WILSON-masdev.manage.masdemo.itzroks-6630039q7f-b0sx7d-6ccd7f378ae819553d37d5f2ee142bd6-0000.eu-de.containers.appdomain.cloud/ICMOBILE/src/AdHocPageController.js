/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = 'AdHocPageController';

class AdHocPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.page.state.inprogress_selected = true;
    this.page.state.counted_selected = false;
    this.page.state.selectedTabIndex = 0;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.app.state.adhocds = "mxapiinvbalds_json";
    this.page.state.selectedTabIndex = 0;
    // Sets the flag to avoid dataloading before we set QBE.
    this.app.state.canLoadAdhocDS = false;
    // Sets the flag to avoid the tab shows the old records.
    this.app.state.adhoctabloading = true;
    this.page.state.enablesave = false;
    this.page.state.dsinitialized = false;
    this.page.state.isfromsave = false;
    this.app.state.adhocupdated = false;

    this.app.state.allitemsidlist = [];
    this.page.state.counteditem_id_value_map_4adhoc = new Map();
    this.page.state.counteditem_id_date_map_4adhoc = new Map();
    this.page.state.allitems = [];
    this.app.state.loadcount = 0;
    
    this.setUpInitialDataSource();    
  }

  async setUpInitialDataSource(){
    this.app.state.canLoadAdhocDS = true;
    const adhocAllDataResource = this.page.findDatasource("mxapiinvbaldsall");
    await adhocAllDataResource.load();      
    const allitems = await this.getAllItemsFromDataSource(adhocAllDataResource, false);
    // For the scenario that no records found.
    // istanbul ignore else
    if (allitems.length === 0) {
      await this.initializeItemsOnTab4Adhoc(allitems);
    }
    await adhocAllDataResource.syncLookupDatasources();   
    // istanbul ignore else
    if (this.page.state.needsetup){ 
      await this.initializeItemsOnTab4Adhoc(allitems);
      this.app.state.isback = false;
    }
   
  }

  /**
   * Gets all items even exceeding the page size.
   * 
  */
  async getAllItemsFromDataSource(datasource, forceSync){
    let allitems = [];    
    for (let i = 0 ; i < datasource.dataAdapter.totalCount; i++) {
      // istanbul ignore else
      if (!datasource.isItemLoaded(i)) {
        if (forceSync){
          datasource.clearChanges();
          await datasource.load({start: i, noCache: true, forceSync: true});
        } else {
         await datasource.load({start: i});
        }
      }
      //istanbul ignore else
      if(datasource.get(i) === undefined){
        this.app.state.loadcount = i-1;
        break;
      }
      allitems.push(datasource.get(i));
      
    }
    return allitems;
  }

  /**
   * Maximo-datasource lifecycle
   * @param {*} datasource
   * @param {Array} items
   *
   * Filter the notcounted/counted items only after ds loads
   */
  async onAfterLoadData(dataSource, items) {
    // istanbul ignore else
    if (!this.page.state.isfromsave && dataSource.name === "mxapiinvbaldsall") {
      if (items.length){
        for (var each of items) {
          this.page.state.allitems.push(each);
        }
        //istanbul ignore else
        if (this.page.state.allitems.length >= dataSource.dataAdapter.totalCount || (this.app.state.loadcount >0 && this.page.state.allitems.length >= this.app.state.loadcount)) {  
          await this.initializeItemsOnTab4Adhoc(this.page.state.allitems);
          this.page.state.allitems = [];
        }
      } else {
        //istanbul ignore else
        if(this.page.state.allitems.length > 0){
          await this.initializeItemsOnTab4Adhoc(this.page.state.allitems);
          //this.page.state.allitems = [];
        }
      }
      
    } 
  }

  async initializeItemsOnTab4Adhoc(items){
    this.app.state.adhoctabloading  = false;
    await this.loadInProgressAdhocItemsDS(items);
    let initialCountedItem = [];
    await this.loadInCountedAdhocItemsDS(initialCountedItem);
  }

  /**
   * Function to load Adhoc items into Inprogress tab
   * @param {items} adhoc items
   */
   async loadInProgressAdhocItemsDS(items) {
    let adhocItems = [];
    //istanbul ignore else
    if (items && items.length) {
      adhocItems = items;
    }
    for (var each of adhocItems) {
      if (each.adjustedphyscnt !== undefined){
        each.adjustedphyscnt = undefined;
      }
    }
    const adhocAllDataResource = this.page.findDatasource("mxapiinvbaldsall");
    adhocAllDataResource.clearChanges();

    let adhocItemsList = this.page.findDatasource("mxapiinvbalds_json");
    adhocItemsList.clearState();
    let newAdhocItems = { adhocItems: adhocItems };
    await adhocItemsList.load({ noCache: true, src: newAdhocItems, searchText: adhocItemsList.state?.currentSearch });
  }

  /**
   * Function to load Adhoc items into counted tab
   * @param {items} adhoc items
   */
  async loadInCountedAdhocItemsDS(items) {
    this.updateItemsIdValueMap(items);

    let adhocItems = [];
    //istanbul ignore else
    if (items && items.length) {
      adhocItems = items;
    }
    let adhocItemsList = this.app.findDatasource("mxapiinvbaldscounted_json");
    adhocItemsList.clearState();
    let newAdhocItems = { adhocItems: adhocItems };
    await adhocItemsList.load({ noCache: true, src: newAdhocItems });
  }

  updateItemsIdValueMap(adhocItems) {
    let tempMap = this.page.state.counteditem_id_value_map_4adhoc;
    let tempDateMap = this.page.state.counteditem_id_date_map_4adhoc;
    adhocItems.forEach((item, i) => {
      // istanbul ignore else
      if (!tempMap.has(adhocItems[i].invbalancesid)) {
        tempMap.set(adhocItems[i].invbalancesid, adhocItems[i].adjustedphyscnt);
        tempDateMap.set(adhocItems[i].invbalancesid, adhocItems[i].adjustedphyscntdate);
      }
    });
  }

  setItemIdValueIntoMap(adhocItem) {
    // istanbul ignore else
    this.page.state.counteditem_id_value_map_4adhoc.set(adhocItem.invbalancesid, adhocItem.adjustedphyscnt);
    this.page.state.counteditem_id_date_map_4adhoc.set(adhocItem.invbalancesid, adhocItem.adjustedphyscntdate);
  }

  switchToInProgressTab(){
    this.app.state.adhocds='mxapiinvbalds_json';
    this.page.state.selectedTabIndex = 0;
    this.page.state.inprogress_selected = true;
    this.page.state.counted_selected = false;
  }

  switchToCountedTab(){
    this.app.state.adhocds='mxapiinvbaldscounted_json'; 
    this.page.state.selectedTabIndex = 1;  
    this.page.state.inprogress_selected = false;
    this.page.state.counted_selected = true;
  }

  /**
   * Event handler to show the detail balance information page for the selected item.
   *
   * @param {Object} args - Contains event with page property
   */
  gotoDetailsFromSelectedInvBal(args) {
    this.undoDatasourceSystemChanges4AllDatasources();
    this.page.state.needsetup = true;
    this.app.setCurrentPage({name: 'invBalDetail', params: {href: args.href, invbalancesid:args.invbalancesid, itemnum:args.itemnum, isFromReconcile:false} });
  }

  async updatePhyscnt(args){
    let currentDate = new Date();
    // istanbul ignore else
    if ( args.adjustedphyscnt < 0  || args.adjustedphyscnt === undefined || args.adjustedphyscnt === null || args.adjustedphyscnt === '') {
      return;
    } else if (
      this.app.state.adhocds === "mxapiinvbaldscounted_json" &&
      this.page.state.counteditem_id_value_map_4adhoc.has(args.invbalancesid) &&
      this.page.state.counteditem_id_value_map_4adhoc.get(args.invbalancesid) === args.adjustedphyscnt &&
      this.page.state.counteditem_id_date_map_4adhoc.get(args.invbalancesid) === currentDate
    ) {
      return;
    }
    
    this.app.state.adhocupdated = true;
    args.adjustedphyscntdate = currentDate;

    // Check if the input count match current balance
    if(args.adjustedphyscnt != args.curbal){
      args.notmatchindicator = true;
    } else {
      args.notmatchindicator = false;
    }

    this.setItemIdValueIntoMap(args);

    if(this.app.state.adhocds === "mxapiinvbalds_json"){
      // Updates the json data source by removing an item from the in-progress tab and adding an item from the counted tab.
      await this.page.findDatasource("mxapiinvbalds_json").deleteItem(args);
      await this.page.findDatasource("mxapiinvbaldscounted_json").add(args);
      //let counteditems = this.page.findDatasource("mxapiinvbaldscounted_json").getItems().push(args);   
      //counteditems.push(args);
      //await this.loadInCountedAdhocItemsDS(counteditems);  
    }   

    let allitems = await this.getAllItemsFromDataSource(this.page.findDatasource("mxapiinvbaldsall"), false);
    let items2BeUpdated = allitems.filter(
      item => item.invbalancesid === args.invbalancesid
    );
    // istanbul ignore else
    if (items2BeUpdated[0].adjustedphyscnt !== args.adjustedphyscnt) {
      items2BeUpdated[0].adjustedphyscnt = args.adjustedphyscnt;
    }
    // istanbul ignore else
    if (items2BeUpdated[0].adjustedphyscntdate !== args.adjustedphyscntdate) {
      items2BeUpdated[0].adjustedphyscntdate = args.adjustedphyscntdate;
    }

    this.page.state.enablesave = true;
  }

  goBack() {
    this.page.state.needsetup = true;
    this.app.state.isback = true;
    this.page.state.clearQBERequested = false;
    this.page.state.selectedTabIndex = 0;

    this.undoDatasourceSystemChanges4AllDatasources();
    
    this.app.setCurrentPage({name: 'main'});
  }

  undoDatasourceSystemChanges4AllDatasources(){
    this.undoDatasourceSystemChanges(this.page.findDatasource("mxapiinvbaldsall"));
    this.undoDatasourceSystemChanges(this.page.findDatasource("mxapiinvbalds_json"));
    this.undoDatasourceSystemChanges(this.page.findDatasource("mxapiinvbaldscounted_json"));
  }

  undoDatasourceSystemChanges(ds) {
    // Resets the changes from system on smart input attribute physcnt
    // reset the original values for each item in __itemChanges
    Object.keys(ds.__itemChanges).forEach((itemId) => {
      let eachItem = ds.getById(itemId);
      // istanbul ignore next
      if (eachItem.adjustedphyscnt === undefined || eachItem.adjustedphyscnt === null || eachItem.adjustedphyscnt === "") {
        ds.undoItemChanges(eachItem);
      }
    });
  }

  /**
   * Done click handler.
   * Saves the ad hoc item.
   */
  async saveHandler() {
    this.page.state.isfromsave = true;

    let invBalancesDataSource = this.page.findDatasource('mxapiinvbaldsall');

    try { 
      this.page.updatePageLoadingState(true);
      let response = await invBalancesDataSource.save({waitForUpload: true});
      //invBalancesDataSource.clearChanges();

      //istanbul ignore else
      if (response) {
          //Display message
          let label = this.app.getLocalizedLabel('updatephyscnt_msg', 'Items physical count saved');
          this.app.toast(label, 'success');
          this.page.state.enablesave = false;
      }

      this.page.state.dsinitialized = false;
      this.page.state.needsetup = true;
      // istanbul ignore else
      //if (!this.app.state.isMobileContainer){
      // await invBalancesDataSource.forceSync();
      //}
      this.app.state.adhocds = "mxapiinvbalds_json";
      this.page.state.selectedTabIndex = 0;
      this.page.state.inprogress_selected = true;
      this.page.state.counted_selected = false;
      this.app.state.adhocupdated = false;

      await this.setUpInitialDataSource();
      this.page.updatePageLoadingState(false);

    } catch(error) {
      // istanbul ignore next
      log.t(TAG, error);
    }
  }

  async reloadDatasource(){
    const adhocAllDataResource = this.page.findDatasource("mxapiinvbaldsall");
    await adhocAllDataResource.forceSync();
    let allitems = await this.getAllItemsFromDataSource(adhocAllDataResource, true);
    await this.initializeItemsOnTab4Adhoc(allitems);
  }

  changeContainerTab(index) {
    this.page.state.containerTabSelected = index;
  }

  /**
   * Calls savePhyscnt() on user confirmation dialog save.
   * */
  async onCustomSaveTransition() {
    this.saveHandler();    
    return {saveDataSuccessful:true, callDefaultSave: false};
  } 

  /*
  toggleConfirmDialog(useConfirmDialog) {
    page.state.useConfirmDialog = useConfirmDialog
  }
  */

}
export default AdHocPageController;
