/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = "CountBookDetailPageController";

class CountBookDetailPageController {
  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
    this.page.state.selectedTabIndex = 0;
    this.page.state.inprogress_selected = true;
    this.page.state.counted_selected = false;
    this.page.state.hasnewcount = false;
    this.countbookds4comp = this.page.findDatasource("countBookDS");
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    // istanbul ignore else
    if (!this.app.state.isback){
      this.app.state.countbookds = this.getCountBookDSName();
    }
    if (this.isOnCountedTab()){
      this.page.state.selectedTabIndex = 1;
    } else {
      this.page.state.selectedTabIndex = 0;
    }
    // Sets the flag to avoid dataloading before we set QBE.
    this.app.state.canLoadCBDS = false;
    // Sets the flag to avoid the tab shows the old records.
    this.app.state.countbooktabloading = true;

    this.app.state.notcountedcountbooklinesidlist = [];
    this.app.state.counteditemidlist4countbook = [];
    this.app.state.counteditemvaluelist4countbook = [];
    this.app.state.counteditemdatelist4countbook = [];
    this.page.state.counteditem_id_value_map_4countbook = new Map();
    this.page.state.counteditem_id_date_map_4countbook = new Map();
                    
    this.page.state.allitems = [];

    this.setUpInitialDataSource();
  }

  async setUpInitialDataSource() {
    //istanbul ignore else
    if (!this.page.state.isfromsave){
      await this.countbookds4comp.load({ noCache: true, itemUrl: this.page.params.href });
    }

    let maxstatus = 'APPR';
    this.page.state.showcomplete = true;
    this.page.state.completed = false;
    this.page.state.enablesave = false;
    this.page.state.isfromsave = false;
    let synonymDomainsDS = this.app.findDatasource("synonymdomainDS");
    //await synonymDomainsDS.initializeQbe();
    // synonymDomainsDS.setQBE("domainid", "=", "COUNTBOOKSTATUS");
    synonymDomainsDS.setQBE("valueid", "COUNTBOOKSTATUS|APPR");
    const response = await synonymDomainsDS.searchQBE();
    // const response = await synonymDomainsDS.load();
    //istanbul ignore else
    if (response && response[0]) {
      maxstatus = response[0].value;
    }
    //istanbul ignore else
    if (this.app.state.param_countbookstatus == maxstatus) {
      this.page.state.showcomplete = false;
    }

    // istanbul ignore else
    if (this.app.state.param_countbooknum) {
      this.app.state.canLoadCBDS = true;
      const countBookDetailALLResource = this.page.findDatasource(this.getDataSouceName_countBookDetailDSALL());

      if (!this.app.state.isback)
        countBookDetailALLResource.clearState();

      let allitems = [];
      if (this.app.state.isMobileContainer){
        // allitems = await countBookDetailALLResource.load();
        // allitems = await this.getAllItemsFromDataSource(countBookDetailALLResource, false);
        // istanbul ignore else
        if(countBookDetailALLResource.dataAdapter.conn){
          countBookDetailALLResource.dataAdapter.conn.setRequestTimeout(300000);
        }
        countBookDetailALLResource.setQBE("countbooknum", this.app.state.param_countbooknum);
        allitems = await countBookDetailALLResource.searchQBE();
        allitems = await this.getAllItemsFromDataSource(countBookDetailALLResource, false);
      } else {
        await countBookDetailALLResource.initializeQbe();
        countBookDetailALLResource.setQBE("hasphyscnt", "in", [0]);
        allitems = await countBookDetailALLResource.searchQBE();

        const countBookDetailALL4CountedResource = this.page.findDatasource("countBookDetailDSALL4Web_Counted");
        await countBookDetailALL4CountedResource.initializeQbe();
        countBookDetailALL4CountedResource.setQBE("hasphyscnt", 1);
        const counteditems = await countBookDetailALL4CountedResource.searchQBE();
        this.app.state.countbooktabloading = false;

        for (var args of counteditems) {    
          this.setStateIdValuesVariables(args);
        }
      }
      
      await countBookDetailALLResource.syncLookupDatasources(); 
      if (this.app.state.isMobileContainer){
        let cntBookItems = this.app.findDatasource("countBookListDS").items.filter((item) => item.countbooknum === this.app.state.param_countbooknum && item.siteid === this.app.state.param_countbooksiteid)
        let cntBookCountedNum = cntBookItems[0].counted;
        
        let cntBookLineItemsCountedNum = allitems.filter((item) => item.countbooknum === this.app.state.param_countbooknum && item.siteid === this.app.state.param_countbooksiteid && item.hasphyscnt === 1).length;
        let cntBookLineItems = allitems.filter((item) => item.countbooknum === this.app.state.param_countbooknum && item.siteid === this.app.state.param_countbooksiteid);

        // istanbul ignore next
        if (cntBookLineItems.length === 0 || cntBookCountedNum !== cntBookLineItemsCountedNum) {
          await this.reloadDatasource();
          await countBookDetailALLResource.syncLookupDatasources(); 
        } else if (this.page.state.needsetup) {
          await this.initializeItemsOnTab(allitems);
          this.app.state.isback = false;
        }
      } else {
        this.updateCountedItemsValue(false); 
      }
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
          let test = await datasource.load({start: i});
        }
      } 
      allitems.push(datasource.get(i));
    }
    return allitems;
  }

  /**
   * Filter the notcounted/counted items only after ds loads
   */
  async onAfterLoadData(dataSource, items) {
    // istanbul ignore else
    if (this.app.state.isMobileContainer && !this.page.state.isfromsave && dataSource.name === this.getDataSouceName_countBookDetailDSALL()) {
      for (var each of items) {
        this.page.state.allitems.push(each);
      }

      // istanbul ignore else
      if(dataSource.lastQuery.qbe  && (dataSource.lastQuery.qbe.binnum || dataSource.lastQuery.qbe.lotnum)){
        this.app.state.param_countbookallitmcount = 0;
      }
      // istanbul ignore else
      //if (this.page.state.allitems.length >= dataSource.dataAdapter.totalCount) {
      
      if (this.app.state.param_countbookallitmcount === 0 || (this.app.state.param_countbookallitmcount > 0 && this.page.state.allitems.length >= this.app.state.param_countbookallitmcount ))  {
        await this.initializeItemsOnTab(this.page.state.allitems);
        this.page.state.allitems = [];
      }
    }
    if (!this.app.state.isMobileContainer && this.page.state.hasnewcount){
      this.updateCountedItemsValue(true);
    }
  }

  async initializeItemsOnTab(items) {
    // istanbul ignore else
    if (this.app.state.param_countbooknum) {
      let param_value_countbooknum = this.app.state.param_countbooknum;
      let param_value_siteid = this.app.state.param_countbooksiteid;
      // istanbul ignore else
      let notCountedItems = items.filter(
        (item) => item.countbooknum === param_value_countbooknum && item.siteid === param_value_siteid && item.hasphyscnt === 0
      );

      let counteditems = items.filter(
        (item) => item.countbooknum === param_value_countbooknum && item.siteid === param_value_siteid && item.hasphyscnt === 1
      );

      await this.loadInProgressCBLineDS(notCountedItems);

      await this.loadInCountedCBLineDS(counteditems);

      this.app.state.countbooktabloading = false;

      // Get plus and minus tolerance limit defined in MAXVARS
      // istanbul ignore next
      if (notCountedItems[0]) {
        this.page.state.invptol = notCountedItems[0].invptol;
        this.page.state.invmtol = notCountedItems[0].invmtol;
      } else if (counteditems[0]) {
        this.page.state.invptol = counteditems[0].invptol;
        this.page.state.invmtol = counteditems[0].invmtol;
      }
    }
  }

  /**
   * Function to load CountBookLines
   * @param {items} CBLine items
   */
  async loadInProgressCBLineDS(items) {
    let cbLineItems = [];
    //istanbul ignore else
    if (items && items.length) {
      cbLineItems = items;
    }
    let cnLineList = this.page.findDatasource(this.getCountBookDSName());
    let prevSearch = this.app.state.isback ? cnLineList.state.currentSearch : undefined;
    cnLineList.clearState();
    let newCBLineItems = { cbLineItems: cbLineItems };
    await cnLineList.load({ noCache: true, src: newCBLineItems, searchText: prevSearch });
  }

  /**
   * Function to load CountBookLines
   * @param {items} CBLine items
   */
  async loadInCountedCBLineDS(items) {
    this.updateItemsIdValueMap(items);

    let cbLineItems = [];
    //istanbul ignore else
    if (items && items.length) {
      cbLineItems = items;
    }
    let cnLineList = this.page.findDatasource(this.getCountBookDSName4Counted());
    let prevSearch = this.app.state.isback ? cnLineList.state.currentSearch : undefined;
    cnLineList.clearState();
    let newCBLineItems = { cbLineItems: cbLineItems };
    await cnLineList.load({ noCache: true, src: newCBLineItems, searchText: prevSearch });
  }

  updateItemsIdValueMap(cbLineItems) {
    let tempMap = this.page.state.counteditem_id_value_map_4countbook;
    let tempMap4Date = this.page.state.counteditem_id_date_map_4countbook;
    cbLineItems.forEach((item, i) => {
      // istanbul ignore else
      if (!tempMap.has(cbLineItems[i].countbooklineid)) {
        tempMap.set(cbLineItems[i].countbooklineid, cbLineItems[i].physcnt);
        tempMap4Date.set(cbLineItems[i].countbooklineid, cbLineItems[i].physcntdate);
      }
    });
  }

  setItemIdValueIntoMap(cbLineItem) {
    // istanbul ignore else
    this.page.state.counteditem_id_value_map_4countbook.set(cbLineItem.countbooklineid, cbLineItem.physcnt);
    this.page.state.counteditem_id_date_map_4countbook.set(cbLineItem.countbooklineid, cbLineItem.physcntdate);
  }

  switchToInProgressTab() {
    this.app.state.countbookds = this.getCountBookDSName();
    this.page.state.selectedTabIndex = 0;
  }

  async switchToCountedTab() {
    this.app.state.countbookds = this.getCountBookDSName4Counted();
    this.page.state.selectedTabIndex = 1;
    if (!this.app.state.isMobileContainer && this.app.state.isback && this.app.state.counteditemidlist4countbook.length > 0){
      this.updateCountedItemsValue(false);
     }
  }

  async updatePhyscnt(args) {
    let currentDate = new Date();
    // istanbul ignore next
    if (args.haswarning || args.physcnt === undefined || args.physcnt === null || args.physcnt === "" || (args.rotating && (args.physcnt > 1 || args.physcnt < 0))) {
      return;
    } else if (
      this.app.state.countbookds === this.getCountBookDSName4Counted() &&
      this.page.state.counteditem_id_value_map_4countbook.has(args.countbooklineid) &&
      this.page.state.counteditem_id_value_map_4countbook.get(args.countbooklineid) === args.physcnt &&
      this.page.state.counteditem_id_date_map_4countbook.get(args.countbooklineid) === currentDate
    ) {
      return;
    }

    args.hasphyscnt = 1;
    args.physcntdate = currentDate;
    this.page.state.hasnewcount = true;

    // Checks if the input count matches the current balance
    this.computeMatch(args);

    // GRAPHITE-48681: Set reconcile on count book line = 1 when match =1
    // istanbul ignore else
    if (!args.rotating) {
      args.recon = args.match;
    }

    this.setStateIdValuesVariables(args);

    if (!this.app.state.isMobileContainer){
      this.updateCountedItemsValue(true);
    } else {
      // istanbul ignore else
      if (this.app.state.countbookds === "countBookDetailDS_JSON") {
        // Updates the json data source by removing an item from the in-progress tab and adding an item from the counted tab.
        await this.page.findDatasource("countBookDetailDS_JSON").deleteItem(args);
        await this.page.findDatasource("countBookDetailDSCounted_JSON").add(args);
      } 
      let allitems = await this.getAllItemsFromDataSource(this.page.findDatasource(this.getDataSouceName_countBookDetailDSALL()), false);
      let items2BeUpdated = allitems.filter((item) => item.countbooklineid === args.countbooklineid);
      // istanbul ignore else
      if (items2BeUpdated[0].physcnt !== args.physcnt || items2BeUpdated[0].physcntdate !== args.physcntdate) {
        // istanbul ignore else
        if (!args.rotating) {
          items2BeUpdated[0].recon = args.recon;
        }
        // istanbul ignore else
        if (items2BeUpdated[0].physcnt !== args.physcnt){
          items2BeUpdated[0].physcnt = args.physcnt;
        }
        // istanbul ignore else
        if (items2BeUpdated[0].physcntdate !== args.physcntdate) {
          items2BeUpdated[0].physcntdate = args.physcntdate;
        }
      }
    }

    // istanbul ignore else
    if (!this.page.state.completed && !this.page.state.enablesave) {
      //enable the Done button only the counted tab has items.
      this.page.state.enablesave = true;
    }
  }

  setStateIdValuesVariables(args){
    this.app.state.counteditemidlist4countbook.push(args.countbooklineid);
    this.app.state.counteditemvaluelist4countbook.push(args.physcnt);
    this.app.state.counteditemdatelist4countbook.push(args.physcntdate);
    this.setItemIdValueIntoMap(args);
  }

  async updateCountedItemsValue(refreshDS) {   
    if (this.app.state.counteditemidlist4countbook.length == 0) {
      return;
    }    
    var countedItemValueMap = new Map();  
    var countedItemDateMap = new Map();
    // Using loop to insert key/value in map    
    for(var i = (this.app.state.counteditemidlist4countbook.length-1); i>=0; i--){
      //istanbul ignore else
      if (!countedItemValueMap.has(this.app.state.counteditemidlist4countbook[i])){
        countedItemValueMap.set(this.app.state.counteditemidlist4countbook[i], this.app.state.counteditemvaluelist4countbook[i]);
        countedItemDateMap.set(this.app.state.counteditemidlist4countbook[i], this.app.state.counteditemdatelist4countbook[i]);
      }
    }

    const countBookDetailCountedResource = this.page.findDatasource('countBookDetailDSALL4Web_Counted');
    let counteditems = countBookDetailCountedResource.items;
    // istanbul ignore else
    if (refreshDS){
      const countBookDetailResource = this.page.findDatasource('countBookDetailDSALL4Web');
      countBookDetailResource.clearQBE();  
      if (this.app.state.counteditemidlist4countbook.length===1) {
        countBookDetailResource.setQBE('countbooklineid', '!=', this.app.state.counteditemidlist4countbook[0]); 
      } else {
        countBookDetailResource.setQBE('countbooklineid', '!=', '['+this.app.state.counteditemidlist4countbook.join(',')+']'); 
      }
      await countBookDetailResource.searchQBE(); 

      //await countBookDetailCountedResource.initializeQbe();
      countBookDetailCountedResource.clearQBE();
      countBookDetailCountedResource.setQBE('countbooklineid', 'in', this.app.state.counteditemidlist4countbook); 
      counteditems = await countBookDetailCountedResource.searchQBE(); 
    }

    for (let i = 0; i < counteditems.length; i++) {  
      counteditems[i].physcnt = countedItemValueMap.get(counteditems[i].countbooklineid);
      counteditems[i].physcntdate = countedItemDateMap.get(counteditems[i].countbooklineid);
      counteditems[i].hasphyscnt = 1;
      // Check if the input count match the current balance
      this.computeMatch(counteditems[i]);

      // GRAPHITE-48681: Set reconcile on count book line = 1 when match =1
      if (!counteditems[i].rotating) {
        counteditems[i].recon = counteditems[i].match;;
      }
    }
    //enable the Done button only the counted tab has items.
    // istanbul ignore else
    //  if(countBookDetailCountedResource.items.length > 0){
    //   this.page.state.enablesave = true;
    // } else{
    //   this.page.state.enablesave = false;
    // } 
    
  }

  goBack() {
    this.app.state.isback = true;
    this.page.state.needsetup = true;
    this.page.state.selectedTabIndex = 0;
    //clear the previous filter
    let countedds = this.page.findDatasource(this.getCountBookDSName4Counted());
    let countedisSearch = countedds.lastQuery.searchText;    
    let isSearch = this.page.findDatasource(this.getCountBookDSName()).lastQuery.searchText;

    // istanbul ignore next
    if (isSearch !== "" || countedisSearch !== "") {
      this.page.findDatasource(this.getCountBookDSName4Counted()).lastQuery.searchText = "";
      this.page.findDatasource(this.getCountBookDSName()).lastQuery.searchText = "";
    }

    //this.undoDatasourceSystemChanges4AllDatasources();
    this.app.setCurrentPage({ name: "countBook" });
    this.app.state.isback = true;
  }

  undoDatasourceSystemChanges4AllDatasources(){
    this.undoDatasourceSystemChanges(this.page.findDatasource(this.getCountBookDSName()));
    this.undoDatasourceSystemChanges(this.page.findDatasource(this.getCountBookDSName4Counted()));
    this.undoDatasourceSystemChanges(this.page.findDatasource(this.getDataSouceName_countBookDetailDS4Saving()));
  }

  undoDatasourceSystemChanges(ds) {
    // Resets the changes from system on smart input attribute physcnt
    // reset the original values for each item in __itemChanges
    Object.keys(ds.__itemChanges).forEach((itemId) => {
      let eachItem = ds.getById(itemId);
      // istanbul ignore next
      if (!this.app.state.isMobileContainer || (eachItem.physcnt === undefined || eachItem.physcnt === null || eachItem.physcnt === "")) {
        ds.undoItemChanges(eachItem);
      }
    });
  }

  /**
   * Event handler to show the detail balance information page for the selected count book line
   *
   * @param {Object} args - Contains event with page property
   */
  gotoDetailsFromSelectedCountBookLine(args) {
    this.page.state.needsetup = true;
    this.app.setCurrentPage({
      name: "countBookLineInvBalDetail",
      params: { href: args.href, countbooklineid: args.countbooklineid, itemnum: args.itemnum },
    });
  }

  /**
   * Check if the input count match the current balance
   *
   * @param {Object} args - Contains event with page property
   */
  async computeMatch(args) {
    // Get the plus tolerance limit, either from INVENTORY or from MAXVARS
    if (!isNaN(args.invinvptol)) {
      args.realinvptol = args.invinvptol;
    } else {
      args.realinvptol = args.invptol;
    }
    // } else {
    //   args.realinvptol = this.page.state.invptol;
    // }

    // Get the minus tolerance limit, either from INVENTORY or from MAXVARS
    if (!isNaN(args.invinvmtol)) {
      args.realinvmtol = args.invinvmtol;
    } else {
      args.realinvmtol = args.invmtol;
    }
    // else {
    //   args.realinvmtol = this.page.state.invmtol;
    // }
    // Compute Accuracy
    //istanbul ignore else
    if (args.curbal > 0) {
      args.accuracy = Math.round((args.physcnt / args.curbal) * 100).toFixed(2);
    } else if (args.curbal == 0) {
      if (args.physcnt == 0) {
        args.accuracy = 100;
      } else {
        args.accuracy = 0;
      }
    }

    //istanbul ignore else  
    if (args.accuracy == 100) {
      args.match = true;
    } else if (args.accuracy > 100) {
      if (args.accuracy - 100 > args.realinvptol) {
        args.match = false;
      } else {
        args.match = true;
      }
    } else if (args.accuracy < 100) {
      if (100 - args.accuracy > args.realinvmtol) {
        args.match = false;
      } else {
        args.match = true;
      }
    }
  }

  async savePhyscnt() {
    this.page.state.isfromsave = true;

    const countBookDetailALLDataSource = this.page.findDatasource(this.getDataSouceName_countBookDetailDS4Saving());

    try {
      let response = await countBookDetailALLDataSource.save({waitForUpload: true});

      //Display message
      let label = "";
      //istanbul ignore else
      if (response) {
        label = this.app.getLocalizedLabel("updatephyscnt_msg", "physical count saved");
        this.app.toast(label, "success");
        // istanbul ignore else
        if (this.page.state.enablesave) {
          //disable the save button after save successfully and enable the complete button.
          this.page.state.enablesave = false;
          this.page.state.showcomplete = true;
          this.app.state.param_countbookstatus = 'INPRG';
        }
      } 
      this.page.state.dsinitialized = false;
      this.page.state.needsetup = true;
      this.page.state.hasnewcount = false;
      let countedds = this.page.findDatasource(this.getCountBookDSName4Counted());
      this.app.state.param_countednumber = countedds.state.totalCount;

      //istanbul ignore else
      if (!this.app.state.isMobileContainer){
        this.undoDatasourceSystemChanges4AllDatasources();
      }

      //istanbul ignore else
      //if (!this.app.state.isMobileContainer){
      // await countBookDetailALLDataSource.forceSync();
      // await this.setUpInitialDataSource();
      //}
    } catch (error) {
      // istanbul ignore next
      log.t(TAG, error);
    } finally {
      //TODO
    }
  }

  async reloadDatasource(){
    const countBookAllDataResource = this.page.findDatasource(this.getDataSouceName_countBookDetailDSALL());
    await countBookAllDataResource.forceSync();
    let allitems = await this.getAllItemsFromDataSource(countBookAllDataResource, true);
    await this.initializeItemsOnTab(allitems);
  }

  async completeCountbook() {
    let cancomplete = true;
    // istanbul ignore else
    if (this.page.state.enablesave) {
      try {
        const saveDS = this.page.findDatasource(this.getDataSouceName_countBookDetailDS4Saving());
        saveDS.save();
        //disable the Done button after save successfully.
        this.page.state.enablesave = false;
      } catch (error) {
        // istanbul ignore next
        cancomplete = false;
        // istanbul ignore next
        log.t(TAG, error);
      }
    }
    // istanbul ignore else

    if (cancomplete) {
      // const countbook = this.page.findDatasource("countBookDS");
      // await countbook.initializeQbe();
      // countbook.setQBE("countbooknum", "=", this.app.state.param_countbooknum);
      // countbook.setQBE("siteid", "=", this.app.state.param_countbooksiteid);

      // await countbook.searchQBE();

      let status = "COMP";
      let synonymDomainsDS = this.app.findDatasource("synonymdomainDS");
      await synonymDomainsDS.initializeQbe();
      synonymDomainsDS.setQBE("valueid", "=", "COUNTBOOKSTATUS|COMP");
      const response = await synonymDomainsDS.searchQBE();
      let statusDescription;
      //istanbul ignore else
      if (response && response[0]) {
        status = response[0].value;
        statusDescription = response[0].description;
      }

      let option = {
        record: this.countbookds4comp.items[0],
        parameters: {
          status: status,
        },
        responseProperties: "status",
        localPayload: {
          status: status,
          status_maxvalue: "COMP",
          status_description: statusDescription,
        },
        query: { interactive: false },
      };

      try {
        let response = await this.countbookds4comp.invokeAction("changeStatus", option);

        // istanbul ignore else
        if (response && Array.isArray(response) && response.length > 0) {
          response = response[0]._responsedata;
        }

        //Display message
        let label = "";

        //istanbul ignore next
        if (response) {
          label = this.app.getLocalizedLabel("cntbkCompleted_label", "Count Book was completed");
          this.app.toast(label, "success");
          this.page.state.completed = true;
        }
      } catch (error) {
        // istanbul ignore next
        log.t(TAG, error);
      } finally {
        // istanbul ignore next
        //TODO
      }
    }
  }

  /**
   * Calls savePhyscnt() on user confirmation dialog save.
   * */
  async onCustomSaveTransition() {
    this.savePhyscnt();
    return { saveDataSuccessful: true, callDefaultSave: false };
  }

  validateInput(event) {
    const invalidinputMessage = this.app.getLocalizedLabel(
      'invalidinput',
      'Should be number 0 ~ 1!'
    );
    const exceedlimitMessage = this.app.getLocalizedLabel(
      'exceedlimit',
      'Exceed the allowable limit!'
    );
    let ds;
    
    if(this.page.state.selectedTabIndex == 1){
      ds = this.page.findDatasource(this.getCountBookDSName4Counted());
    }else{
      ds = this.page.findDatasource(this.getCountBookDSName());
    }
    // istanbul ignore next.
    if (event.rotating && (event.physcnt === "" || event.physcnt > 1 || event.physcnt < 0)) {
      ds.addWarnings(ds.getId(event), { physcnt: invalidinputMessage });
      event.errormsgtext = invalidinputMessage;
      event.haswarning = true;
    } else if(!event.rotating && (event.physcnt !== 0 && event.curbal >0 && (event.physcnt > 10*event.curbal || event.physcnt < (event.curbal/10)))){
      ds.addWarnings(ds.getId(event), { physcnt: exceedlimitMessage});      
      event.errormsgtext = exceedlimitMessage;
      event.haswarning = true;
    } else{
      ds.clearWarnings(event, "physcnt");
      event.haswarning = false;
    }
  }

  getDataSouceName_countBookDetailDSALL(){
    if (!this.app.state.isMobileContainer){
      return "countBookDetailDSALL4Web";
    } else {
      return "countBookDetailDSALL";
    }
  }

  getDataSouceName_countBookDetailDS4Saving(){
    if (!this.app.state.isMobileContainer){
      return "countBookDetailDSALL4Web_Counted";
    } else {
      return "countBookDetailDSALL";
    }
  }

  getCountBookDSName(){
    if (!this.app.state.isMobileContainer){
      return "countBookDetailDSALL4Web";
    } else {
      return "countBookDetailDS_JSON";
    }
  }

  getCountBookDSName4Counted(){
    if (!this.app.state.isMobileContainer){
      return "countBookDetailDSALL4Web_Counted";
    } else {
      return "countBookDetailDSCounted_JSON";
    }
  }

  isOnCountedTab(){
    if (this.app.state.countbookds === this.getCountBookDSName4Counted()){
      return true;
    } else {
      return false;
    }
  }
}

export default CountBookDetailPageController;
