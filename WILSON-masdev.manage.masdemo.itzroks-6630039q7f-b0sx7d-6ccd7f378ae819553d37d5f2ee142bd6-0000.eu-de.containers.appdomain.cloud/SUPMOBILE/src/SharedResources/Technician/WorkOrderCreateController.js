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

import { log, Device } from "@maximo/maximo-js-api";
import SynonymUtil from './utils/SynonymUtil';
import WOCreateEditUtils from "./utils/WOCreateEditUtils";

const TAG = "WorkOrderCreateController";


class WorkOrderCreateController {
  /**
   * defines fields to implement onCustomSaveTransition()
   * which is to avoid defaultSaveTransition defined at framework level
   * and uses save method implemented in controller itself.
   */
  constructor() {
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
    this.callDefaultSave = true;
  }

  pageInitialized(page, app) {
    log.t(TAG, "Work order create Page Initialized");
    this.app = app;
    this.page = page;
    this.page.state.isLocationAssetFocus = false;
  }

  /**
   * Function to open Create WorkOrder page.
   */
  async openNewWorkOrder() {
    const dsCreateWo = this.page.datasources["dsCreateWo"];
    dsCreateWo.clearState();

    // After coming back from humai, schema is missing, this line is used to retrieve schema again.
    if(!dsCreateWo.getSchema()){
      await dsCreateWo.initializeQbe();
    }
    // istanbul ignore else
    if (dsCreateWo) {
      await this.prepareDefaultData(dsCreateWo);
    }
    // istanbul ignore else
    if (this.app.state.incomingContext && this.app.state.incomingContext.page === "createwo") {
      this.recoverFromSession(dsCreateWo);
    }

    // Reset Asset Lookup and Location Lookup
    await WOCreateEditUtils.resetDataSource(this.app,'assetLookupDS');
    await WOCreateEditUtils.resetDataSource(this.app,'locationLookupDS');
  }

  /** 
   * Function to set default data
   * If status data found then restore it
   * and apply default value in new WO from schema
   * @param dsCreateWo  create wo datasource to be passed
  */
  async prepareDefaultData(dsCreateWo) {
    const externalDomominValueId = await SynonymUtil.getDefExtSynonymValueIdWithOrgSite(
      this.app.findDatasource("synonymdomainData"),
      "WOSTATUS",
      "WAPPR",
      this.app.userInfo.defaultOrg,
      this.app.userInfo.defaultSite);	    
    const statusData = await SynonymUtil.getSynonym(
      this.app.findDatasource("synonymdomainData"),
      "WOSTATUS",
      externalDomominValueId
    );
    const newWo = await dsCreateWo.addNew();
    // istanbul ignore next
    if (statusData && newWo) {
      const currDate = new Date();
      const dataFormatter = this.app.dataFormatter;
      if (this.app.client){
        newWo.siteid = this.app.client.userInfo.insertSite;
        newWo.reportedby = this.app.client.userInfo.personid;
      }
      newWo.status = statusData.value;
      newWo.chargestore = false;
      newWo.status_description = statusData.description;
      newWo.status_maxvalue = statusData.maxvalue;
      newWo.statusdate = dataFormatter.convertDatetoISO(currDate);
      newWo.reportdate = dataFormatter.convertDatetoISO(currDate);
    }
    /* DT221877 - MASISMIG-42208*/
    dsCreateWo.item["description"] = dsCreateWo?.getSchema()?.properties?.description?.defaultValue|| "";
    dsCreateWo.item["worktype"] = dsCreateWo?.getSchema()?.properties?.worktype?.defaultValue || "";
    /* DT221877 - MASISMIG-42208*/
    dsCreateWo.item["schedstart"] =  dsCreateWo?.getSchema()?.properties?.schedstart?.defaultValue  || ""; 
    dsCreateWo.item["schedfinish"] = dsCreateWo?.getSchema()?.properties?.schedfinish?.defaultValue|| "";
    dsCreateWo.item["estdur"] =dsCreateWo?.getSchema()?.properties?.estdur?.defaultValue  || "0";
    dsCreateWo.item["wopriority"] = dsCreateWo?.getSchema()?.properties?.wopriority?.defaultValue|| "";
    dsCreateWo.item["assetnum"] =  dsCreateWo?.getSchema()?.properties?.assetnum?.defaultValue || "";
    dsCreateWo.item["location"] = dsCreateWo?.getSchema()?.properties?.location?.defaultValue  || "";
    this.app.state.parentPage = "";
  }

  /** 
   * Function to Fetch Data from Session
   * and set Context if state has incomingContext assetnum
   * @param dsCreateWo  create wo datasource to be passed
  */
  recoverFromSession(dsCreateWo) {
    const savedWorkorder = sessionStorage.getItem("createwo_workorder");
    // istanbul ignore if
    if (savedWorkorder) {
      const item = JSON.parse(savedWorkorder);
      Object.entries(item).forEach(
        ([key, value]) => {
          if(!["workorderid","_bulkid","href"].includes(key)){
            dsCreateWo.item[key] = value;
          }
        }
      );
      sessionStorage.removeItem("createwo_workorder");
    }
    if (this.app.state.incomingContext.assetnum) {
      this.setIncomingContext();
    }
 }

  /**
   * Function to set flag for 'save-data-failed' event
   */
  onSaveDataFailed() {
    this.saveDataSuccessful = false;
  }

  /**
   * Function to open WorkType lookup with preselected item
   */
  async openWorkTypeLookup(evt) {
    let defOrg = this.app.client.userInfo.insertOrg;
    let typeDs = this.app.findDatasource("dsworktype");

    if (typeDs && defOrg) {
      typeDs.clearState();
      let woclass = await SynonymUtil.getSynonym(
        this.app.findDatasource("synonymdomainData"),
        "WOCLASS",
        "WOCLASS|WORKORDER"
      );
      let selectedItem;
      // istanbul ignore next
      if (woclass) {
        await typeDs.initializeQbe();
        typeDs.setQBE("woclass", "=", woclass.value);
        typeDs.setQBE("orgid", defOrg);
        await typeDs.searchQBE();
      }
      typeDs.items.forEach(item => {
        // istanbul ignore next
        if (item.worktype === this.page.state.worktype) {
          selectedItem = item;
        }
      });
      // istanbul ignore next
      if (selectedItem) {
        typeDs.setSelectedItem(selectedItem, true);
      }
      this.page.showDialog("workTyLookup");
      this.page.state.dialogOpened = true;
    }
  }

  /**
   * Function to create new work order
   */
  async createWorkorder(evt) {
    /* istanbul ignore else */
    if(this.page.state.transactionInCourse && this.page.state.errorMessage === ""){
      log.d("Multiples click in create only first will be saved");
      return;
    }
    this.page.state.transactionInCourse = true;
    let workorder = evt.item;
    if(this.page.state.editAssetsLocation) {
      this.page.state.createWorkorderItem = evt;
      this.page.state.saveInProgress=true;
      /* istanbul ignore next */
      if (this.page.state.isLocationAssetFocus) {
        this.page.state.transactionInCourse = false;
        return;
      }
    }
    this.page.state.saveInProgress=false;
    this.page.state.isLocationAssetFocus = false;

    if (workorder) {
      let woCreateResource = this.page.datasources["dsCreateWo"];
      woCreateResource.item["locationnum"] = woCreateResource.item["location"];
      /* istanbul ignore else */
      if(this.page.state.isMobile) {
        await WOCreateEditUtils.setPriorityFailureCode(this.app, woCreateResource);
      }

      try {
        if (this.callDefaultSave) {
          this.page.state.useConfirmDialog = false;
        }
        let response;
        this.saveDataSuccessful = true;
        woCreateResource.on("save-data-failed", this.onSaveDataFailed);
        //Do not go for update if there is any client side error
        if (!this.page.state.errorMessage) {
         const interactive = await this.prepareDatatoUpdate(woCreateResource);
          response = await woCreateResource.save(interactive);
        } else {
          this.saveDataSuccessful = false;
        }
        // istanbul ignore next
        if (response && woCreateResource.currentItem) {
          this.navigateToDtlsPage(response,woCreateResource.currentItem);
        }
      } catch (error) {
        /* istanbul ignore next */
        log.t(TAG, error);
      } finally {
        if (this.callDefaultSave) {
          this.page.state.useConfirmDialog = true;
        }
        this.page.state.worktype = '';
        woCreateResource.off("save-data-failed", this.onSaveDataFailed);
        this.page.state.transactionInCourse = false;
      }
    }
  }

  /**
   * Function to navigate to Work order details page 
   * after work order save
   * In case of device siteId will not set in pageparams and data will be set from currentItem
   * In case of web siteid will set in pageparams and data will set from response
   */
  navigateToDtlsPage(response,currentItem){
    const device = Device.get();
    this.app.state.currentMapData = undefined;
    const itemwonum = currentItem.wonum;
    const itemhref = currentItem.href;
    /* istanbul ignore else */
    if (device.isMaximoMobile) {
      if (
        this.app.pageStack.length === 2 &&
        this.app.pageStack[1] === "createwo"
      ) {
        this.app.pageStack.push("schedule");
      }
      this.app.setCurrentPage({
        name: "workOrderDetails",
        resetScroll: true,
        params: { wonum: itemwonum, href: itemhref },
      });
    }  else {
      if (response.items && response.items.length > 0) {
        if (
          this.app.pageStack.length === 2 &&
          this.app.pageStack[1] === "createwo"
        ) {
          this.app.pageStack.push("schedule");
        }
        if (response.items[0].href) {
          this.app.setCurrentPage({
            name: "workOrderDetails",
            resetScroll: true,
            params: {
              wonum: response.items[0].wonum,
              siteid: response.items[0].siteid,
              href: response.items[0].href,
            },
          });
        }
      }
    }
  }

   /**
    * Function to prepare the data if there is no client side error
    * update autolocate information in case it's mobile device
    * else update woserviceaddress of item
    * if there is no client side error
   */
  async prepareDatatoUpdate(woCreateResource){
    const device = Device.get();
    let interactive = { interactive: !this.page.state.isMobile};
    // istanbul ignore else
    if(this.app.state.currentMapData?.coordinate?.length) {
      const timeRef = new Date().getTime()
      const maxVars = await this.getMaxvars();
      let geoCoordinates = this.app.state.currentMapData.coordinate;
      
      const geoLatLong = this.setCoordinates();

      let autolocate = {
          coordinates: [geoLatLong?.[0], geoLatLong?.[1]],
          type: 'Point'	
      }

      /* istanbul ignore else */
      if(maxVars[0]?.varvalue === 'LATLONG') {
        geoCoordinates = geoLatLong
      }

      /* istanbul ignore else */
      if(device.isMaximoMobile) {
        const serviceAddress = {
          "woserviceaddress": [
            {
              latitudey : geoCoordinates[1],
              longitudex:geoCoordinates[0],
              anywhererefid: timeRef
            }
          ]
        }
        interactive['localPayload'] = {
          ...woCreateResource.item,
          woserviceaddress: serviceAddress,
          autolocate: JSON.stringify(autolocate),
          serviceaddress: {
            latitudey : geoCoordinates[1],
            longitudex: geoCoordinates[0],
            anywhererefid: timeRef
          },
        }
        woCreateResource.item["woserviceaddress"] = [{
          longitudex: geoCoordinates[0],
          latitudey: geoCoordinates[1],
        }]
      } else {
        woCreateResource.item["woserviceaddress"][0].longitudex = geoCoordinates[0];
        woCreateResource.item["woserviceaddress"][0].latitudey = geoCoordinates[1];
      }
    }
    return interactive;
  }

   /**
   * Function to set the coordinates
   */
  setCoordinates(){
    const geoLatLong = this.app?.map?.convertCoordinates(
      this.app.state.currentMapData.coordinate,
      this.app.map.getBasemapSpatialReference(),
      'EPSG:4326'
    );
    return geoLatLong;
  }

  /**
   * Function to get maxvars item
   */
  async getMaxvars() {
    let maxVars = [];
    let orgDS = this.app.findDatasource('defaultSetDs');
    /* istanbul ignore else */
    if(orgDS.items && orgDS.items.length) {
      maxVars = orgDS.items[0].maxvars.filter(item => item.varname === 'COORDINATE')
    }
    return maxVars;
  }

  /**
   * Create work order on user confirmation dialog save
   * */
  async onCustomSaveTransition() {
    let dsCreateWo = this.page.datasources["dsCreateWo"];
    this.callDefaultSave = false;
    await this.createWorkorder({
      item: dsCreateWo.item,
    });
    return {
      saveDataSuccessful: this.saveDataSuccessful,
      callDefaultSave: this.callDefaultSave,
    };
  }

  /**
   * This function called when click on any item in worktype lookup
   * @param event  event.worktype value returned from lookup
   */
  // istanbul ignore next
  async selectWorkType(event) {
    this.page.datasources.dsCreateWo.item["worktype"] = event.worktype;
    this.page.state.worktype = event.worktype;
  }

  /**
   * function to close Create work order page.
   */
  handleClose() {
    this.app.setCurrentPage({ name: "schedule", resetScroll: true });
  }
  /*
   * Method to resume the page
   */
  pageResumed() {
    this.app.pageStack = ["schedule", "createwo"];
    this.page.state.isMobile = Device.get().isMaximoMobile;
    let addNew = true;
    /* istanbul ignore else */
    if(this.app.lastPage && this.app.lastPage.name && this.app.lastPage.name === 'assetLookup') {
      addNew = false;
    }
    /* istanbul ignore else */
    if (addNew) {
      this.openNewWorkOrder();
    }
  }

  /**
   * function called On calender datetime value changed
   */
  // istanbul ignore next
  onValueChanged() {
    this.page.state.errorMessage = this.validateFields();
  }
   /**
  * Function to validate if field is ui required and not has value on attribute
  * @param attributeName attribute name
  * @param attributeValue attribute value
  * @returns  true or false
  */
  // istanbul ignore next
  uiRequired(attributeName, attributeValue){
    if (attributeName === null){
      return false;
    }
    let fieldDontHasValue = attributeValue === undefined || attributeValue === "" ? true : false;
    let returnValue = false;
    let workorderDt = this.page.datasources.dsCreateWo.uiRequired;
    let workorderArray = Object.values(workorderDt)[0] !== undefined ? Object.values(workorderDt)[0] : undefined;
    if (workorderArray !== undefined){
     returnValue = workorderArray.find(data => data === attributeName) && fieldDontHasValue ? true : false;
     }
    return returnValue;
    }

  /**
   * Function to validate workorder fields
   */
 validateFields() {
  let workorder = this.page.datasources.dsCreateWo.item;
  let arrayListFieldsWithError = [];

  let errorMessage = "";
  let errorField = "";

  /* DT221877 - MASISMIG-42208 */
   if((this.uiRequired("description", workorder?.description !== undefined ? workorder.description.trim() : workorder?.description))){
    arrayListFieldsWithError.push({"attributename":"description", "error":true});
    this.showWOWarnings("description", "");
  }else{
    arrayListFieldsWithError.push({"attributename":"description", "error":false});
    this.clearWarnings("description");
  }

  if(this.uiRequired("worktype", workorder?.worktype)){
    arrayListFieldsWithError.push({"attributename":"worktype", "error":true});
  }else{
    arrayListFieldsWithError.push({"attributename":"worktype", "error":false});
    this.clearWarnings("worktype");
  }
  /* DT221877 - MASISMIG-42208 */ 

  //DT179992: Mobile, required fields not working
  let minEstimatedDuration = this.page.state.minEstimatedDuration ?? 0;

 if ((workorder.wopriority &&
    (workorder.wopriority < this.page.state.minPriority || workorder.wopriority > this.page.state.maxPriority))
    || (this.uiRequired("wopriority", workorder.wopriority)))
  {
    if((workorder.wopriority < this.page.state.minPriority || workorder.wopriority > this.page.state.maxPriority)) {
      errorMessage = this.app.getLocalizedLabel('priority_error_msg', `Priority ${workorder.wopriority} is not a valid priority value between ${this.page.state.minPriority} and ${this.page.state.maxPriority}`, [workorder.wopriority, this.page.state.minPriority, this.page.state.maxPriority]);
      errorField = "wopriority";
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
    }
    arrayListFieldsWithError.push({"attributename":"wopriority", "error":true});
  } else {
    this.clearWarnings("wopriority");
    arrayListFieldsWithError.push({"attributename":"wopriority", "error":false});
  } 

  if ((workorder.schedstart && workorder.schedfinish && workorder.schedstart > workorder.schedfinish)
       || ( this.uiRequired("schedstart", workorder.schedstart) ||  this.uiRequired("schedfinish",workorder.schedfinish))) 
    {
    errorMessage = this.app.getLocalizedLabel(
      `startdate_enddate_compare_msg`,
      `The start date must be before the finish date`
    );
    errorField = "schedstart";
    this.showWOWarnings(errorField, errorMessage);
    this.page.state.errorMessage = errorMessage;
    arrayListFieldsWithError.push({"attributename":"schedstart", "error":true});
    arrayListFieldsWithError.push({"attributename":"schedfinish", "error":true});
  } else {
    this.clearWarnings("schedstart");
    arrayListFieldsWithError.push({"attributename":"schedstart", "error":false});
    arrayListFieldsWithError.push({"attributename":"schedfinish", "error":false});
  }

  if (workorder.estdur < minEstimatedDuration
    || (this.uiRequired("estdur",workorder.estdur))) 
  {
    // istanbul ignore next
    minEstimatedDuration > 0? (errorMessage = this.app.getLocalizedLabel(
      `est_dur_msg`,
      `The duration should be greater then ${minEstimatedDuration}`, [minEstimatedDuration]
    )) : (errorMessage = this.app.getLocalizedLabel(
      `est_dur_msg`,
      `The duration should be positive value`
    ))
    errorField = "estdur";
    this.showWOWarnings(errorField, errorMessage);
    this.page.state.errorMessage = errorMessage;
    arrayListFieldsWithError.push({"attributename":"estdur", "error":true});
  } else {
    this.clearWarnings("estdur");
    arrayListFieldsWithError.push({"attributename":"estdur", "error":false});
  }

  if (arrayListFieldsWithError.find(data => data.error === true)){
    this.page.state.readOnlyState=true;
  }else{
    this.page.state.readOnlyState=false;
  }
  return errorMessage;
}

  /**
   * Function to set field warnings
   */
  // istanbul ignore next
  showWOWarnings(field, message) {
    let dsWoedit = this.page.datasources["dsCreateWo"];
    dsWoedit.setWarning(dsWoedit.item, field, message);
  }

  /**
   * Function to clear field warnings
   */
  // istanbul ignore next
  clearWarnings(field) {
    let dsWoedit = this.page.datasources["dsCreateWo"];
    dsWoedit.clearWarnings(dsWoedit.item, field);
  }

  /**
   * Set editorValue on the basis of content
   * @param {*} rich text editor on change event
   */
  onEditorChange(evt) {
    this.page.state.editorValue = evt.target.content;
  }

  /**
   * Reset editorValue on save perform from rich text editor save button
   */
  onEditorSave() {
    this.page.state.editorValue = null;
  }

  /**
   * Callback from dialog back button
   */
  onCloseRichTextDialog() {
    // istanbul ignore else
    if (
      this.page.state.editorValue !== null &&
      this.page.state.editorValue !== undefined
    ) {
      this.page.showDialog("saveDiscardDialogCreatePage");
    }
  }

  /**
   * Set long description value.
   * @param {*} workorder item and datasource as event
   */
  setRichTextValue(evt) {
    evt.datasource.item.description_longdescription = this.page.state.editorValue;
    this.onEditorSave();
  }

  /**
   * Reset editorValue on click discard button
   */
  closeSaveDiscardDialog() {
    this.onEditorSave();
  }
  /**
   * choose location from lookup
   * validateAsset function should be validated only on mobile platform.
   */
  async chooseLocation(item) {
    let dsCreateWo = this.app.findDatasource("dsCreateWo");
    let assetData = await WOCreateEditUtils.getAssetOrLocation(
      this.app,
      "assetLookupDS",
      "location",
      item.location
    );
    if(assetData.length > 0){
      item.asset = assetData;
    }
    let validAsset = this.page.state.isMobile
      ? WOCreateEditUtils.validateAsset(this.app, this.page, dsCreateWo, item)
      : true;
    /* istanbul ignore else */
    if (validAsset) {
      await WOCreateEditUtils.setLocation(this.app, this.page, dsCreateWo, item);
    }
  }

  /**
   * open asset lookup
   */
  openAssetLookup() {
    this.page.state.useConfirmDialog = false;
    this.app.setCurrentPage({
      name: "assetLookup",
      resetScroll: false,
    });
    /* istanbul ignore else */
    if (this.app.currentPage) {
      this.app.state.parentPage = "createwo";
    }
    this.page.state.useConfirmDialog = true;
  }

  async setIncomingContext () {
    const context = this.app.state.incomingContext;

    this.page.datasources.dsCreateWo.item["assetnum"] = context.assetnum;
    this.app.state.incomingContext = null;

    this.onChangeAsset({
      item: this.page.datasources.dsCreateWo.item,
      app: this.app,
    });
  }
  /**
   * set and validate asset on asset input field
   * getAssetOrLocation function just return a valid asset
   */
  async onChangeAsset(event) {
    /* istanbul ignore else */
    if (event.item && event.item.assetnum && event.item.assetnum.trim()) {
      let asset = await WOCreateEditUtils.getAssetOrLocation(
        event.app,
        "assetLookupDS",
        "assetnum",
        event.item.assetnum
      );
      /* istanbul ignore else */
      if (asset && asset.length > 0) {
        this.chooseAsset(asset[0]);
      }
    }
  }
  /**
   * set and validate location on location input field
   * getAssetOrLocation function just return a valid location
   */
  async onChangeLocation(event) {
    /* istanbul ignore else */
    if (event.item && event.item.location && event.item.location.trim()) {
      let location = await WOCreateEditUtils.getAssetOrLocation(
        event.app,
        "locationLookupDS",
        "location",
        event.item.location
      );
      /* istanbul ignore else */
      if (location && location.length > 0) {
        await this.chooseLocation(location[0]);
      }
    } else{
      let lookupDs = event.app.findDatasource("assetLookupDS");
      await WOCreateEditUtils.clearSearch(lookupDs);
    }
  }

  /**
   * search location on blur of assets input
   * @param {*} input value on blur
   */
   async findLocation(item) {
    if(!item.value) {
      this.page.state.isLocationAssetFocus = false;
      return;
    } 
    let assetData = await WOCreateEditUtils.getAssetOrLocation(
      this.app,
      "assetLookupDS",
      "assetnum",
      item.value
    );
    /* istanbul ignore else */ 
    if(assetData.length === 1){
      await this.chooseAsset(assetData[0]);
    }
    this.page.state.isLocationAssetFocus = false;
    this.callCreateWorkOrder();
  }


  /**
   * search assets on blur of location input
   * @param {*} input value on blur
   */
   async findAsset(item) {
    /* istanbul ignore else */
    if(!item.value) { 
      this.page.state.isLocationAssetFocus = false;
      return;
    };
    let assetData = await WOCreateEditUtils.getAssetOrLocation(
      this.app,
      "assetLookupDS",
      "location",
      item.value
    );
    if(assetData.length === 1){
     await this.chooseLocation(assetData[0]);
    }
     //istanbul ignore next
    if (assetData.length > 1) {
      this.page.datasources.dsCreateWo.item.assetnum = "";
    }
    this.page.state.isLocationAssetFocus = false;
    this.callCreateWorkOrder();
  }

  /**
   * Flag for user manually entered location or assets
   */
   editAssetsLocation() {
    this.page.state.isLocationAssetFocus = true;
    this.page.state.editAssetsLocation = true;
    this.clearWarnings('assetnum');
    this.clearWarnings('location');
  }

  /**
   * If createWorkOrder method was called before and we were waiting for assets / location data
   * then after fetch of location / assets proceed with createWorkOrder and also
   * set editAssetsLocation and saveInProgress to false
   */
   callCreateWorkOrder() {
    if(this.page.state.saveInProgress) {
      this.page.state.editAssetsLocation = false;
      this.page.saveInProgress = false;
      this.createWorkorder(this.page.state.createWorkorderItem);
    }
  }
  
   /**
	 * Use to set the selected item..
	 * @param {item} asset item
	 */
  chooseAssetItem(item) {
    let dsCreateWo = this.app.findDatasource("dsCreateWo");
    dsCreateWo.item.assetnum = item.assetnum;
    this.chooseAsset(item);
  }


  /**
   * choose the asset value form asset lookup;
   */
  async chooseAsset(item) {
    let dsCreateWo = this.app.findDatasource("dsCreateWo");
    let validLocation = this.page.state.isMobile
      ? WOCreateEditUtils.validateLocation(this.app, this.page,  dsCreateWo, item)
      : true;
    /* istanbul ignore else */ 
    if (validLocation) {
      await WOCreateEditUtils.setAsset(this.app, this.page, dsCreateWo, item);
    }
  }

  /**
   * set Asset/location value when user confirm Yes
   */
  setLookUpValue() {
    let dsCreateWo = this.app.findDatasource("dsCreateWo");
    let selectedItem = this.page.state.selectedItem;
    /* istanbul ignore else */
    if (selectedItem.action === "SETASSET") {
      WOCreateEditUtils.setAsset(this.app, this.page, dsCreateWo, selectedItem.item);
    } else if (selectedItem.action === "SETLOCATION") {
      WOCreateEditUtils.setLocation(this.app, this.page, dsCreateWo, selectedItem.item);
    } else if (selectedItem.action === "SETLOCGL" || selectedItem.action === "SETASSETGL") {
      WOCreateEditUtils.setGLAccount(this.app, this.page, dsCreateWo, selectedItem.item, selectedItem.action);
    }
  }

  /**
   * set Asset/location value when user confirm NO
   */
  onUserConfirmationNo() {
    let dsCreateWo = this.app.findDatasource("dsCreateWo");
    let selectedItem = this.page.state.selectedItem;
    /* istanbul ignore else */
    if (selectedItem.action === "SETASSET") {
      dsCreateWo.item.assetnum = selectedItem.item.assetnum;
    } else if (selectedItem.action === "SETLOCATION") {
      dsCreateWo.item.location = selectedItem.item.location;
    } else if (
      selectedItem.action === "SETLOCGL" ||
      selectedItem.action === "SETASSETGL"
    ) {
      dsCreateWo.item.location = selectedItem.item.location;
      /* istanbul ignore else */
      if(selectedItem.item.assetnum) {
        dsCreateWo.item.assetnum = selectedItem.item.assetnum
      }
      /* istanbul ignore else */
      if (selectedItem.item.asset && selectedItem.item.asset.length === 1) {
        dsCreateWo.item.assetnum = selectedItem.item.asset[0].assetnum;
      }
    }
  }

  /**
   * set Asset value on scanning a barcode/QR code
   */
  handleAssetBarcodeScan(event) {
    let dsCreateWo = this.app.findDatasource("dsCreateWo"); 
    if (event.value) {
      dsCreateWo.item.assetnum = event.value;
    }
    this.onChangeAsset({"item":dsCreateWo.item, "app":this.app});  
  }

  /**
   * set location value on scanning a barcode/QR code
   */
  handleLocationBarcodeScan(event) {
    let dsCreateWo = this.app.findDatasource("dsCreateWo");
    if (event.value) {   
      dsCreateWo.item.location = event.value; 
    }  
    this.onChangeLocation({"item":dsCreateWo.item, "app":this.app}); 
  }
}
export default WorkOrderCreateController;
