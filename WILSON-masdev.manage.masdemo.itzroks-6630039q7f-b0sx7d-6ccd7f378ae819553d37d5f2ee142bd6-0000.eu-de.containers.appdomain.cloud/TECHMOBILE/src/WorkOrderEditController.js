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

import {log, Device} from "@maximo/maximo-js-api";
import SynonymUtil from './utils/SynonymUtil';
import WOCreateEditUtils from './utils/WOCreateEditUtils';
const TAG = "WorkOrderEditController";

class WorkOrderEditController {

  /**
   * defines fields to implement onCustomSaveTransition() 
   * which is to avoid defaultSaveTransition defined at framework level
   * and uses save method implemented in controller itself.
   */
  constructor() {
    this.onUpdateDataFailed = this.onUpdateDataFailed.bind(this);
    this.saveDataSuccessful = true;
    this.callDefaultSave = true;
  }

  pageInitialized(page, app) {
    log.t(TAG, "Work order edit Page Initialized");
    this.app = app;
    this.page = page;
    this.page.state.isLocationAssetFocus = false;
  }

  /**
   * If we get the data from the session then will fetch the data from the session and will call the loadRecord
   * If will get workorder data from the page params then will fetch the data from page params and will call the loadRecord
   */
  async pageResumed(){
    this.page.state.useConfirmDialog = true;
    this.page.state.isMobile = Device.get().isMaximoMobile;
    const savedWorkorder=sessionStorage.getItem('woedit_workorder');
    /* istanbul ignore if  */
    if(this.page?.params?.wo){
      await this.loadRecord(this.page?.params?.wo);
    }else if(savedWorkorder){
      await this.loadRecord(JSON.parse(savedWorkorder));
    }
  }

  /**
   * Function to load edit WorkOrder datasource..
   * @param {*} workorder
   */
  async loadRecord(workorder) {
    sessionStorage.removeItem('woedit_workorder');

    this.page.state.pageTitle = this.app.getLocalizedLabel('edit_work_order_label', 'Edit work order');
    this.page.state.followupWOCreated = false;
    if (this.page.params.followup) {
      this.page.state.pageTitle = this.app.getLocalizedLabel('create_followup_label', 'Create follow-up WO');
      let newWods = this.page.datasources["newWorkOrderds"];
      newWods.clearState();
      newWods.resetState();
      await newWods.addNew();
    }
    this.page.state.title = this.page.state.pageTitle;
    let dsWoedit = this.page.datasources["dsWoedit"];
    let dsWoEditSetting = this.app.findDatasource("wpEditSettingDS");
    let woEditResource = this.app.findDatasource("woDetailResource");
    let schema = woEditResource.getSchema();
    if (this.app.state.incomingContext && this.app.state.incomingContext.page === "workOrderDetails" && this.app.state.incomingContext.assetnum) {
      schema=JSON.parse(sessionStorage.getItem("woDetailResource_schema"));
      sessionStorage.removeItem('woDetailResource_schema');
      
      dsWoEditSetting.setSchema(JSON.parse(sessionStorage.getItem("dsWoEditSetting_schema")));
      sessionStorage.removeItem('dsWoEditSetting_schema');
    }
    if (this.page.params.followup) {
      this.page.state.useConfirmDialog = true;
    }
    dsWoedit.setSchema(schema);

    await dsWoEditSetting.initializeQbe();
    dsWoEditSetting.setQBE('orgid', '=', workorder.orgid);
    dsWoEditSetting.setQBE('status', '=', workorder.status_maxvalue);
    await dsWoEditSetting.searchQBE();

    let workorderData = [];
    /* istanbul ignore if  */
    if (workorder) {
      if (!this.page.params.followup) {
        this.page.state.pageTitle = this.app.callController('updatePageTitle', {page: this.page, label: 'edit_work_order', labelValue: 'Edit work order'});
      }
      let attributes= dsWoedit.baseQuery.select.split(',');
      let obj={};
      attributes.forEach((element) => {
        if (element === 'worktype') { 
          workorder[element] = workorder[element] || '';
          this.page.state.worktype = workorder[element];
        }
        
        /* istanbul ignore if  */
        if(this.page.params.followup && !(this.app.state.incomingContext && this.app.state.incomingContext.page === "workOrderDetails" && this.app.state.incomingContext.assetnum)) {
          if (element === 'schedstart' || element === 'schedfinish') {
            workorder[element] = '';
          }

          if (element === 'estdur') {
            workorder[element] = 0;
          }
        }
        obj[element] = workorder[element];
      });
      workorderData.push(obj);
    }
    this.page.state.workorderData = workorderData;
    dsWoedit.setSchema(this.page.params.woSchema);
    await dsWoedit.load({ src: workorderData, noCache: true });
    
    await WOCreateEditUtils.resetDataSource(this.app,'assetLookupDS');
    await WOCreateEditUtils.resetDataSource(this.app,'locationLookupDS');

    if (this.app.state.incomingContext && this.app.state.incomingContext.page === "workOrderDetails" && this.app.state.incomingContext.assetnum) {
      this.setIncomingContext();
    }
  }

  /**
   * Function to open WorkType lookup with preselected item
   */
  async openWorkTypeLookup(evt) {
    let defOrg = evt.item.orgid || this.app.client.userInfo.insertOrg;
    let typeDs = this.app.findDatasource("dsworktype");
    // istanbul ignore next
    if (typeDs && defOrg) {
      typeDs.clearState();
      await typeDs.initializeQbe();
      let woclass = evt.item.woclass;
      if(!woclass){
        let woclassRes = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'WOCLASS', 'WOCLASS|WORKORDER');
        if(woclassRes){
          woclass = woclassRes.value;
        }        
      }        
      typeDs.setQBE("woclass", "=", woclass);
      typeDs.setQBE("orgid", defOrg);
      await typeDs.searchQBE();
      let selectedItem;
      typeDs.items.forEach(item => {
        // istanbul ignore next
        if (item.worktype === this.page.state.worktype) {
          selectedItem = item;
        }
      });
      if (selectedItem) {
        typeDs.setSelectedItem(selectedItem, true);
      }
      this.page.showDialog("workTypeLookup");
      this.page.state.dialogOpened = true;
    }
  }

  /**
   * Function to return Asset and location descriptionn of a work order
   */
  getAssetLocDesc(woAssetLocNum, woAssetLocDescription) {
    let assetLocationDesc = null;
    if (woAssetLocDescription) {
      assetLocationDesc = woAssetLocNum + ' ' + woAssetLocDescription;
    } else {
      assetLocationDesc = woAssetLocNum;
    }
    return assetLocationDesc;
  }

  /**
   * This function called when click on any item in worktype lookup
   * @param {*} event 
   */
  // istanbul ignore next
  async selectWorkType(event){
    this.page.datasources.dsWoedit.item["worktype"] = event.worktype;
    this.page.state.worktype = event.worktype;
  }

  /**
   * Function to update work order
   * @param {event} event 
   */
  async updateAndSaveWorkOrder(event) {
    if(this.page.state.editAssetsLocation) {
      this.page.state.updateWorkorderItem = event;
      this.page.state.saveInProgress=true;
      if (this.page.state.isLocationAssetFocus) {
        return;
      }
    }
    this.page.state.saveInProgress=false;
    this.page.state.isLocationAssetFocus = false;
    
    let dsWoedit = event.page.datasources["dsWoedit"];
    /* istanbul ignore else */
    if(this.page.state.isMobile) {
      await WOCreateEditUtils.setPriorityFailureCode(this.app, dsWoedit);
    }
  
    if (event.page.params.followup) {
      await this.createFollowupWo(event);
    } else {
      await this.preparePayload(dsWoedit);
    }
  }

  /**
   * Prepare the payload
   *  Reflect.deleteProperty:-  It deletes a property from an object. It same as delete operator
   * */
     async preparePayload(dsWoedit){
      let workorder = dsWoedit.item ? { ...dsWoedit.item } : {};
      let dataToUpdate = { ...workorder };
    
      Object.keys(dataToUpdate).forEach(function (key) {
        if (
          dsWoedit.schema &&
          dsWoedit.schema.required &&
          dsWoedit.schema.required.includes(key) &&
          !dataToUpdate[key]
        ) {
          delete dataToUpdate[key];
        }
      });

      delete dataToUpdate.locationnum; 
      delete dataToUpdate.workorderid;
      delete dataToUpdate.wonum;

      let woEditResource = this.app.findDatasource("woDetailResource");
      let parentWo = woEditResource.item;
      //Setting the interactive to false on the basis isMobile
      woEditResource.dataAdapter.options.query.interactive = this.page.state.isMobile ? 0 : 1;
      // istanbul ignore next
      if (dataToUpdate) {
        let workAsset =
          woEditResource.item && woEditResource.item.assetnum
            ? woEditResource.item.assetnum
            : undefined;
        let workLocation =
          woEditResource.item && woEditResource.item.locationnum
            ? woEditResource.item.locationnum
            : undefined;

        let attributes = [];
        let responseProps = "";
        if (dsWoedit.baseQuery) {
          attributes = dsWoedit.baseQuery.select.split(",");
          responseProps = dsWoedit.baseQuery.select;
        }
        let localPayload = {};
        attributes.forEach((element) => {
          //DT208126 Maximo Mobile-Error is retained even after the record is corrected
          if (workorder[element] === null || workorder[element] === '') {
            workorder[element] = undefined;
          }
          //END OF DT
          localPayload[element] = workorder[element];
        });

        let option = {
          responseProperties: responseProps
        };
        if(dataToUpdate.failuredescription) {
          delete dataToUpdate.failuredescription
        }
        if(dataToUpdate.failurelistid) {
          delete dataToUpdate.failurelistid
        }
        
        if (workorder.assetnum !== workAsset){
          dataToUpdate.assetnum = workorder.assetnum ? workorder.assetnum : '';
          localPayload.assetnum = dataToUpdate.assetnum ? dataToUpdate.assetnum : '';
          localPayload.assetnumber = dataToUpdate.assetnum ? dataToUpdate.assetnum : '';
          localPayload.assetdesc = dataToUpdate.assetnum ? workorder.assetdesc : '';

          if (!dataToUpdate.assetnum) {
            localPayload.asset = [
              {
                _deleted: true,
              },
            ];
          }
         } else {
         Reflect.deleteProperty(dataToUpdate, 'assetnum');
         Reflect.deleteProperty(localPayload, 'assetnum');
         Reflect.deleteProperty(localPayload, 'assetnumber');
         Reflect.deleteProperty(localPayload, 'assetdesc');
        }
        //If locationnum changed include in the update, if not, remove it 
      if (workorder.locationnum !== workLocation) {
        dataToUpdate["location"] = workorder.locationnum ? workorder.locationnum : '';
        dataToUpdate["locationdesc"] = workorder.locationnum ? workorder.locationdesc : '';
        localPayload.locationnum = dataToUpdate["location"] ? dataToUpdate["location"] : '';
        localPayload.locationdesc = dataToUpdate["location"] ? workorder.locationdesc : '';
      } else {
        Reflect.deleteProperty(dataToUpdate, 'location');
        Reflect.deleteProperty(dataToUpdate, 'locationdesc');
        Reflect.deleteProperty(localPayload, 'locationnum');
        Reflect.deleteProperty(localPayload, 'locationdesc');
      }
        option.localPayload = localPayload;

        if( this.callDefaultSave ) {
          this.page.state.useConfirmDialog = false;
        }
        this.saveDataSuccessful = true;
        woEditResource.on('update-data-failed', this.onUpdateDataFailed);

        //Do not go for update if there is any client side error
        if (!this.page.state.errorMessage) {
         await woEditResource.update(dataToUpdate, option);
         window.setTimeout(() => {
          this.page.state.useConfirmDialog = false;
          this.navigateDtlsPage(parentWo);
          //DT189589 Incorrect Save Message when trying to edit Follow Up Work
          //this.page.state.useConfirmDialog = true;
        }, 50);
        } else {
          this.saveDataSuccessful = false;
        }
        
        woEditResource.off('update-data-failed', this.onUpdateDataFailed);
      }
    }

   /**
   * Navigate to details page
   * */
   navigateDtlsPage(parentWo){
    this.app.setCurrentPage({
      name: "workOrderDetails",
      resetScroll: true,
      params: {
        wonum: parentWo.wonum,
        href: parentWo.href,
        siteid: parentWo.siteid
      }
    });
  }
  
  /**
   * Update work order on user confirmation dialog save
   * */
  async onCustomSaveTransition() {
    this.callDefaultSave = false;
    await this.updateAndSaveWorkOrder({page: this.page});    
    return {saveDataSuccessful: this.saveDataSuccessful, callDefaultSave: this.callDefaultSave};
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
  let workorderDt = this.page.datasources.dsWoedit.uiRequired;
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
    let workorder= this.page.datasources.dsWoedit.items[0];
    let arrayListFieldsWithError = [];
    let errorMessage = "";
    let errorField = "";

    /* DT221877 - MASISMIG-42208 */
    if((this.uiRequired("description", workorder?.description !== undefined ? workorder?.description.trim() : workorder?.description))){
      arrayListFieldsWithError.push({"attributename":"description", "error":true});
      this.showWOWarnings("description", "");
    }else{
      arrayListFieldsWithError.push({"attributename":"description", "error":false});
      this.clearWarnings("description");
    }

    if(this.uiRequired("worktype", workorder.worktype)){
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
    let dsWoedit = this.page.datasources["dsWoedit"];
    dsWoedit.setWarning(dsWoedit.item, field, message);
  }

  /**
   * Function to clear field warnings
   */
  // istanbul ignore next
  clearWarnings(field) {
    let dsWoedit = this.page.datasources["dsWoedit"];
    dsWoedit?.clearWarnings(dsWoedit.item, field);
  }

  async UpdateTheParentWO() {
    const wodetailsDs = this.app.findDatasource("woDetailResource");
    let localPayload = { ...wodetailsDs.item };
    localPayload["hasfollowupwork"] = true;
    let option = {
      responseProperties: wodetailsDs.baseQuery.select,
      localPayload: localPayload
    };
    let dataToUpdate = { hasfollowupwork: true, href: wodetailsDs.item.href };
    wodetailsDs.on("update-data-failed", this.onUpdateDataFailed);
    await wodetailsDs.update(dataToUpdate, option);
    await wodetailsDs.forceReload();
  }

  /**
   * Creates a new follow-up work order.
   * @param {*} event 
   */
  async createFollowupWo(event) {
    this.page.state.saveInProgress= true;
    let newWods = this.app.findDatasource("newWorkOrderds");
    let woDtlPage = this.app.findPage('workOrderDetails');
    let parentWo = woDtlPage.datasources['woDetailResource'].item;
    let relatedPage = this.app.findPage('relatedWorkOrder');
    let relatedWOds = relatedPage.datasources["woDetailRelatedWorkOrder"];
    let relatedListDS = relatedPage.datasources["relatedrecwo"];
    let dsWoedit = this.app.findDatasource("dsWoedit");
    let internalStatus = await SynonymUtil.getDefaultExternalSynonymValue(this.app.findDatasource("synonymdomainData"), "WOSTATUS", "WAPPR");  
    let statusData = await SynonymUtil.getSynonymDomainByValue(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', internalStatus, parentWo.siteid, parentWo.orgid);
    let response;
    let synonymdomainData = this.app.datasources['synonymdomainData'];
    let relateTypeFUPData = await SynonymUtil.getSynonym(synonymdomainData, 'RELATETYPE', 'RELATETYPE|FOLLOWUP');
    let relateTypeOrgData = await SynonymUtil.getSynonym(synonymdomainData, 'RELATETYPE', 'RELATETYPE|ORIGINATOR');

    let attributes = [];
    /* istanbul ignore else */
    if (newWods && newWods.baseQuery) {
      attributes = newWods.baseQuery.select.split(","); 
    }

    //Remove workorderid and wonum before creating followup from parent WO ds.
    delete dsWoedit.item.workorderid;
    delete dsWoedit.item.wonum;

    attributes.forEach((element) => {
      newWods.item[element] = dsWoedit.item[element];
    });

    newWods.item.worktype = this.page.state.worktype;
    newWods.item.siteid = parentWo.siteid;
    newWods.item.orgid = parentWo.orgid;
    newWods.item.woclass = parentWo.woclass;
    newWods.item.origrecordid = parentWo.wonum;
    newWods.item.origrecordclass = parentWo.woclass;
    newWods.item.origwoid = parentWo.workorderid;
    newWods.item.assetnum = parentWo.assetnum;
    newWods.item.failurecode = parentWo.failurecode;
    newWods.item.owner = parentWo.owner;
    newWods.item.onbehalfof = parentWo.onbehalfof;
    newWods.item.location = parentWo.locationnum;
    newWods.item.locationnum = parentWo.locationnum;
    newWods.item.assetdesc = parentWo.assetdesc;
    newWods.item.assetnumber = parentWo.assetnumber;

    newWods.item.phone = this.app.client.userInfo.primaryphone;
    newWods.item.changeby = this.app.client.userInfo.personid;
    newWods.item.reportedby = this.app.client.userInfo.personid;
    newWods.item.changedate = new Date();
    newWods.item.reportdate = new Date();
    newWods.item.status = statusData.value;
    newWods.item.status_maxvalue = statusData.maxvalue;
    newWods.item.status_description = statusData.description;
    newWods.item.statusdate = new Date();
    newWods.item.anywhererefid = new Date().getTime();
    
    /* istanbul ignore else */
    if(this.page.state.isMobile) {
      /* istanbul ignore next */
      if(dsWoedit.item.failurecode) {
        newWods.item.failurecode = dsWoedit.item.failurecode;
      }
      /* istanbul ignore next */
      if(dsWoedit.item.assetlocpriority) {
        newWods.item.assetlocpriority = dsWoedit.item.assetlocpriority;
      }
    }

    let workAsset = parentWo && parentWo.assetnum ? parentWo.assetnum : undefined;
    let workLocation = parentWo && parentWo.locationnum ? parentWo.locationnum : undefined;

    // istanbul ignore else
    if (!dsWoedit.item.assetnum && !dsWoedit.item.locationnum) {
      newWods.item.assetnum = '';
      newWods.item["location"] = '';
    } else if (dsWoedit.item.assetnum !== workAsset || dsWoedit.item.locationnum !== workLocation) {
      newWods.item.assetnumber = dsWoedit.item.assetnum;
      newWods.item.assetnum = dsWoedit.item.assetnum;
      newWods.item["location"] = dsWoedit.item.locationnum;
      newWods.item["locationdesc"] = dsWoedit.item.locationdesc;
      newWods.item.assetdesc = dsWoedit.item.assetdesc;
    } else {
      newWods.item.assetnum = parentWo.assetnum;
      newWods.item.location = parentWo.locationnum;
      newWods.item.assetdesc = parentWo.assetdesc;
      newWods.item.assetnumber = parentWo.assetnumber;
    }
    
    //Setting the interactive to false
    newWods.dataAdapter.options.query.interactive = this.page.state.isMobile ? 0 : 1;
    
     // istanbul ignore next
    try {

      if ( this.callDefaultSave ) {
        this.page.state.useConfirmDialog = false;
      }
      this.saveDataSuccessful = true;
      newWods.on('save-data-failed', this.onUpdateDataFailed);

      //Do not go for save if there is any client side error
      if (!this.page.state.errorMessage) {      
        let localPayloadfup = {...newWods.item};        
        localPayloadfup["relatedwo"] = [{
          relatedwodesc: parentWo.description,
          relatetypedesc: relateTypeOrgData.description,
          relatedreckey: parentWo.wonum,
          href:parentWo.href
        }];
        
        let optionfup = {
          responseProperties: newWods.baseQuery.select,
          localPayload : localPayloadfup
        };
        
        newWods.__itemChanges = {};
        response = await newWods.save(optionfup);
      } else {
        this.saveDataSuccessful = false;
      }

      if ((response && this.saveDataSuccessful)  || (response.hasNewItems && response.items.length > 0)) {
        this.page.state.useConfirmDialog = false;
        if (relatedListDS.items.length === 0) {
          await this.UpdateTheParentWO();
        }
        //adding this condition to disable the chevron button of follow up work order in devices if workorder created in devices
        if (Device.get().isMaximoMobile) { this.page.stateChevronDisable = true;}
        this.app.toast(
          this.app.getLocalizedLabel(
            'relatedwo_created_msg',
            `Follow-up work created`
          ),
          'success'
        );
        
        //Update wo to add fup record
        if (Device.get().isMaximoMobile) {
          let localPayload = {
            href:parentWo.href,
            relatedwo: [
              {
                relatedwodesc: response.items[0].description,
                relatetypedesc: relateTypeFUPData.description,
                origrecordid: response.items[0].origrecordid,
                anywhererefid: response.items[0].anywhererefid,
              }],
            };
            
            let option = {
              responseProperties: "description,anywhererefid",
              localPayload : localPayload
            };
              
            let dataToUpdate = {description: parentWo.description, href:parentWo.href};		
            await relatedWOds.update(dataToUpdate, option);
        }
        this.page.state.saveInProgress = false;        
        this.app.setCurrentPage({name: 'relatedWorkOrder', resetScroll: true, params: {itemhref: parentWo.href,chevronDisable : this.page.stateChevronDisable}});
        //this.page.state.useConfirmDialog = true;
        
      }
      newWods.off('save-data-failed', this.onUpdateDataFailed);
    }
    catch (error) /* istanbul ignore next */ {
      log.t(TAG, error);
      this.app.setCurrentPage({name: 'relatedWorkOrder', resetScroll: true, params: {itemhref: parentWo.href}});
      this.page.state.useConfirmDialog = true;
      this.page.state.saveInProgress = false; 
    } finally {
      //this.page.state.useConfirmDialog = true;
      this.page.state.worktype = ''
    }
	}

  async setIncomingContext () {
    const context = this.app.state.incomingContext;

    this.page.datasources.dsWoedit.item["assetnum"] = context.assetnum;
    this.app.state.incomingContext = null;
    /*
    // TODO: search assetnum & description with assetuid
    let assetDS = await this.app.findDatasource("woDetailResource");
    await assetDS.initializeQbe();
    assetDS.setQBE('assetnum','=',context.assetnum);
    let assetData = await assetDS.searchQBE();
    if (assetData[0] && assetData[0].assetnum.length>0) {
      this.page.datasources.dsWoedit.item["woassetdesc"] = this.getAssetLocDesc(assetData[0].assetnum,assetData[0].description)
    }
    */
    this.onChangeAsset({
      item: this.page.datasources.dsWoedit.item,
      app: this.app,
    });
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
   onUpdateDataFailed() {
    this.saveDataSuccessful = false;
    this.page.state.saveInProgress = false; 
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
    /* istanbul ignore else  */
    if(this.page.state.editorValue !== null && this.page.state.editorValue !== undefined) {
      this.page.showDialog('saveDiscardDialog');
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
   * choose location from lookup;
   */
  async chooseLocation(item) {
    let dsWoedit = this.app.findDatasource("dsWoedit");
    let assetData = await WOCreateEditUtils.getAssetOrLocation(
      this.app,
      "assetLookupDS",
      "location",
      item.location
    );
    if(assetData.length > 0){
      item.asset = assetData;
    }
    let validAsset = this.page.state.isMobile ? WOCreateEditUtils.validateAsset(this.app, this.page, dsWoedit, item) : true;
    /* istanbul ignore else  */
    if (validAsset) {
      await WOCreateEditUtils.setLocation(this.app, this.page, dsWoedit, item);
    }
  }

  /**
   * open asset lookup;
   */
  async openAssetLookup() {
    this.page.state.useConfirmDialog = false;
    this.app.setCurrentPage({
      name: "assetLookup",
      resetScroll: false,
    });
    /* istanbul ignore else  */
    if(this.app.currentPage) {
      this.app.state.parentPage = "woedit";
    }
    this.page.state.useConfirmDialog = true;
  }

  /**
	 * Use to set the selected item..
	 * @param {item} workorder item
	 */
  chooseAssetItem(item) {
    let dsWoedit = this.app.findDatasource("dsWoedit");
    dsWoedit.item.assetnum = item.assetnum;
    this.chooseAsset(item);
  }

  /**
	 * Callback method after choose asset from lookup after validating location.
	 * @param {item} asset item
	 */
  async chooseAsset(item) {
    let dsWoedit = this.app.findDatasource("dsWoedit");
    let validLocation = this.page.state.isMobile ? WOCreateEditUtils.validateLocation(this.app, this.page, dsWoedit, item) : true;
    /* istanbul ignore else  */
    if (validLocation) {
      await WOCreateEditUtils.setAsset(this.app, this.page, dsWoedit, item);
    }
  }

  /**
   * set Asset/location value when user confirm Yes
   */
  onUserConfirmationYes() {
    let dsWoedit = this.app.findDatasource("dsWoedit");
    let selectedItem = this.page.state.selectedItem;
    /* istanbul ignore else  */
    if (selectedItem.action === "SETASSET") {
      WOCreateEditUtils.setAsset(this.app, this.page, dsWoedit, selectedItem.item);
    } else if (selectedItem.action === "SETLOCATION") {
      WOCreateEditUtils.setLocation(this.app, this.page, dsWoedit, selectedItem.item);
    } else if (
      selectedItem.action === "SETLOCGL" ||
      selectedItem.action === "SETASSETGL"
    ) {
      WOCreateEditUtils.setGLAccount(this.app, this.page, dsWoedit, selectedItem.item, selectedItem.action);
    }
  }

  /**
   * set Asset/location value when user confirm NO
   */
  onUserConfirmationNo() {
    let dsWoedit = this.app.findDatasource("dsWoedit");
    let selectedItem = this.page.state.selectedItem;
    /* istanbul ignore else  */
    if (selectedItem.action === "SETASSET") {
      dsWoedit.item.assetnum = selectedItem.item.assetnum;
    } else if (selectedItem.action === "SETLOCATION") {
      dsWoedit.item.locationnum = selectedItem.item.location;
    } else if (
      selectedItem.action === "SETLOCGL" ||
      selectedItem.action === "SETASSETGL"
    ) {
      dsWoedit.item.locationnum = selectedItem.item.location;
      if(selectedItem.item.assetnum) {
        dsWoedit.item.assetnum = selectedItem.item.assetnum
      }
      /* istanbul ignore else */
      /* istanbul ignore else  */
      if (selectedItem.item.asset && selectedItem.item.asset.length === 1) {
        dsWoedit.item.assetnum = selectedItem.item.asset[0].assetnum;
      }
    }
  }

  /**
   * set and validate asset on asset input field
   * getAssetOrLocation function just return a valid asset
   */
  async onChangeAsset(event) {
    /* istanbul ignore else  */
    if (event.item && event.item.assetnum && event.item.assetnum.trim()) {
      let asset = await WOCreateEditUtils.getAssetOrLocation(
        event.app, "assetLookupDS",
        "assetnum", event.item.assetnum
      );
      /* istanbul ignore else  */
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
    /* istanbul ignore else  */
    if (event.item && event.item.locationnum && event.item.locationnum.trim()) {
      let location = await WOCreateEditUtils.getAssetOrLocation(
        event.app, "locationLookupDS",
        "location",
        event.item.locationnum
      );
      /* istanbul ignore else  */
      if (location && location.length > 0) {
        this.chooseLocation(location[0]);
      }
    }else{
      let lookupDs = event.app.findDatasource("assetLookupDS");
      await WOCreateEditUtils.clearSearch(lookupDs);
    }
  }


  /**
   * search location on blur of assets input
   * @param {*} input value on blur
   */
   async findLocation(item) {
    if(!item?.value) {
      this.page.state.isLocationAssetFocus = false;
      return;
    }
    let assetData = await WOCreateEditUtils.getAssetOrLocation(
      this.app,
      "assetLookupDS",
      "assetnum",
      item.value
    );
    if(assetData.length === 1){
      await this.chooseAsset(assetData[0]);
    }
    
    this.page.state.editAssetsLocation = false;
    this.page.state.isLocationAssetFocus = false;
    this.callUpdateWorkOrder();
  }


  /**
   * search assets on blur of location input
   * @param {*} input value on blur
   */
   async findAsset(item) {
    if(!item?.value) { 
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
    if (assetData.length > 1) {
      this.page.datasources.dsWoedit.item.assetnum = "";
    }
    this.page.state.editAssetsLocation = false;
    this.page.state.isLocationAssetFocus = false;
    this.callUpdateWorkOrder();
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
   * If callUpdateWorkOrder method was called before and we were waiting for assets / location data
   * then after fetch of location / assets proceed with callUpdateWorkOrder and also
   * set editAssetsLocation and saveInProgress to false
   */
   callUpdateWorkOrder() {
    if(this.page.state.saveInProgress) {
      this.page.state.editAssetsLocation = false;
      this.page.saveInProgress = false;
      this.updateAndSaveWorkOrder(this.page.state.updateWorkorderItem);
    }
  }

  /**
   * set Asset value on scanning a barcode/QR code
   */
  handleAssetBarcodeScan(event) {
    let dsWoEdit = this.app.findDatasource("dsWoedit"); 
    if (event.value) {
      dsWoEdit.item.assetnum = event.value; 
    }
    this.onChangeAsset({"item":dsWoEdit.item, "app":this.app});  
  }

  /**
   * set Asset value on scanning a barcode/QR code
   */
  handleLocationBarcodeScan(event) {
    let dsWoEdit = this.app.findDatasource("dsWoedit"); 
    if (event.value) {     
      dsWoEdit.item.locationnum = event.value;
    } 
    this.onChangeLocation({"item":dsWoEdit.item, "app":this.app}); 
  }

}

export default WorkOrderEditController;
