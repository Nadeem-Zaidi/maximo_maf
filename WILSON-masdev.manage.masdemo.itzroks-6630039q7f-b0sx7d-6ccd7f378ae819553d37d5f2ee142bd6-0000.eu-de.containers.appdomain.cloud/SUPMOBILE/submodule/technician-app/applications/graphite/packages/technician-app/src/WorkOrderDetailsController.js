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

import { log, Device, ShellCommunicator } from '@maximo/maximo-js-api';
import WOTimerUtil from './utils/WOTimerUtil';
import WOUtil from './utils/WOUtil';
import SynonymUtil from './utils/SynonymUtil';

const TAG = 'WorkOrderDetailsController';

class WorkOrderDetailsController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    ShellCommunicator.get().on(
      'TRANSACTION_UNDONE',
      this.handleDeleteTransaction.bind(this)
    );
  }

  /**
   * Method implemented in controller itself.
   */
  constructor() {
    this.onUpdateDataFailed = this.onUpdateDataFailed.bind(this);
    this.saveDataSuccessful = true;
  }


  /**
   * Function to open a sliding-drawer dialog to show Work Log for the Work Order with Long Description in Expanded View
   * @param event - should contain
   * event - event containing information about current item.
   * datasource - The Synonymdata Datasource to filter logType
   * item - The Work ORder Selected
   */
  async openWorkLogDrawer(event) {
    // Initialized Loader on Button when Work Log Drawer Icon Clicked
    this.page.state.chatLogLoading = true;
    // Filter Logtype data from synonydomain Datasource which passed in Chat-log Component
    const synonymDs = this.app.datasources["synonymdomainData"];
    synonymDs.clearState();
    await synonymDs.initializeQbe();
    synonymDs.setQBE('domainid', '=', 'LOGTYPE');
    await synonymDs.searchQBE();

    this.page.state.WoDetailsWorkLogItem = event.item;
    this.page.state.WoDetailsDefaultLogType = '!CLIENTNOTE!';
    await this.page.datasources['woDetailsWorklogDs'].load().then((response) => {
      this.page.state.chatLogGroupData = response;
    });

    let woWorklogDs = this.page.datasources['woDetailsWorklogDs'];
    // istanbul ignore if
    if (Device.get().isMaximoMobile && woWorklogDs.options.query.relationship) {
      //Get schema of childdatasource.
      woWorklogDs.schema =
        woWorklogDs.dependsOn.schema.properties[
          Object.entries(woWorklogDs.dependsOn.schema.properties)
            .filter(
              (item) =>
                item[1].relation &&
                item[1].relation.toUpperCase() ===
                  woWorklogDs.options.query.relationship.toUpperCase()
            )
            .map((obj) => obj[0])[0]
        ].items;
    }

    let schemaLogType = woWorklogDs.getSchemaInfo('logtype');
    let schemaDescription = woWorklogDs.getSchemaInfo('description');

    // istanbul ignore else
    if (schemaLogType) {
      this.page.state.WoDetailsDefaultLogType = schemaLogType.default;
      this.page.state.initialDefaultLogType = schemaLogType.default;
    }

    // istanbul ignore else
    if (schemaDescription) {
      this.page.state.chatLogDescLength = schemaDescription.maxLength;
    }

    // Open Work Log Drawer once all Data Loaded
    this.page.showDialog('woWorkLogDrawer');
    // Stop Loading of Chat Log Icon touchpoint once all data loaded
    this.page.state.chatLogLoading = false;
  }
  /** 
   * Opens the cost drawer for the corresponding workorder.
   * @param {Object} event workorder item
   */
   async openWoCostDrawer(event) {
    if (this.app && this.app.pages) { 
      let approvalPage = this.app.findPage("approvals");

      // istanbul ignore else
      if (approvalPage) {
        approvalPage.callController("openWoTotalCostDrawer", event); 
      }
    }
  }

  accessWoCostData(item) {
    return WOUtil.computedEstTotalCost(item).totalcost;
  }


  navigateToTask(item) {
    if (item && item.wonum) {
      this.app.setCurrentPage({
        name: 'tasks',
        params: { wonum: item.wonum, href: item.href },
      });
      this.page.state.navigateToTaskPage = true;
    }
  }

  /*
   * Method to open the report work page on basis of workorder
   */
  navigateToReportWork(item) {
    if (this.app && this.page && item && item.href) {
      this.app.setCurrentPage({
        name: 'report_work',
        params: { 
          wonum: item.wonum, 
          itemhref: item.href, 
          istask: item.istask,
          wogroup: item.wogroup,
          taskid: item.taskid
        },
      });
      if (this.app.currentPage) {
        this.page.state.navigateToReportWork = true;
      }
    }
  }

  /*
   * Method to resume the page and load work order detail datasource
   */
  //istanbul ignore next
  async pageResumed(page, app) {
    // Page.state.isMobile Set True if accessing from Mobile Device
    if(page.params?.lastPage==='assetWorkOrder'){
      page.state.historyDisable = page.params?.depth===1
    }else{
      page.state.historyDisable = false;
    }
    page.state.isMobile = Device.get().isMaximoMobile;
    let reportWork = this.app.findPage('report_work');
    reportWork.state.fieldChangedManually = false;
    const woDetailResource = page.datasources['woDetailResource'];
    const device = Device.get();
    page.state.inspectionAccess = app.checkSigOption('INSPECTION.READ');
    page.state.meterAccess = app.checkSigOption('MXAPIWODETAIL.ENTERREADINGS');
    page.state.woeditaAccess = app.checkSigOption('MXAPIWODETAIL.EDITWO');
    page.state.statusAccess = app.checkSigOption('MXAPIWODETAIL.STATUS');
    page.state.accessRepdpwn = app.checkSigOption('MXAPIWODETAIL.REPDOWN');
    page.state.reserveitemAccess = app.checkSigOption(
      'MXAPIWODETAIL.ACTUALRESERV'
    );
    page.state.createMaterialAccess = app.checkSigOption(
      'MXAPIWODETAIL.CREATEMR'
    );
    page.state.assetAccess = null;
    this.page.state.currentWOAssetHref = null;

    page.state.gpsLocationSaved = false;

    if (page.params.firstLogin) app.state.highlightStop = false;
    page.state.loading = true;
    page.state.loadedLog = true;
    /*
     * Syncing the woDetailResource while coming back from offline to online mode
     */
    if (this.page.state.disConnected && this.app.state.networkConnected && this.app.state.refreshOnSubsequentLogin !== false) {
      await woDetailResource.load({
        noCache: true,
        forceSync: true,
        itemUrl: page.params.href,
      });
      this.page.state.disConnected = false;
    } else {
      await woDetailResource.load({ noCache: true, itemUrl: page.params.href });
    }
    /* VGARMATZ, tentative removal based on recommendation from TomR in slack - Creating a PR
        https://ibm-watson-iot.slack.com/archives/GNFER73HV/p1671684227096289?thread_ts=1671650671.303129&cid=GNFER73HV

    woDetailResource.forceSync();
    woDetailResource.forceReload();
    */
    let woDetailds = app.findDatasource('woDetailds');
    await woDetailds?.load({ noCache: false, itemUrl: page.params.href });
    if (woDetailds) {
      if (
        woDetailResource.item.relatedrecord &&
        woDetailResource.item.relatedrecordcount !==
          woDetailResource.item.relatedrecord.length
      ) {
        woDetailResource.item.relatedrecordcount =
          woDetailResource.item.relatedrecord.length;
      }
    }
    page.state.loading = false;

    if (app.state.incomingContext && woDetailResource.items.length === 0) {
      const loadParams = {
        noCache: true,
        itemUrl: page.params.href,
      }
      if(this.app.state.refreshOnSubsequentLogin !== false) {
        loadParams['forceSync'] = true;
      }
      await woDetailResource.load(loadParams);
      if (woDetailResource.items.length === 0) {
        let errorMessage =
          'This record is not on your device. Try again or wait until you are online.';
        page.error(
          this.app.getLocalizedLabel('record_not_on_device', errorMessage)
        );
      }
    }

    let wonum = this.page.datasources['woDetailResource'].item.wonum;
    this.app.state.taskCountData = this.app.state.taskCountData
      ? this.app.state.taskCountData
      : {};
    if (!app.state.doclinksCountData) {
      app.state.doclinksCountData = {};
    }
    if (!app.state.doclinksCountData[wonum]) {
      app.state.doclinksCountData[wonum] = device.isMaximoMobile
        ? woDetailResource.item.doclinks &&
          woDetailResource.item.doclinks.member.length
        : woDetailResource.item.doclinkscount;
    }

    //Reload the attachment list
    if (device.isMaximoMobile) {
      let attachmentListWoDetailDS = app.findDatasource(
        'attachmentListWoDetailDS'
      );
      await attachmentListWoDetailDS.forceReload();
      app.state.doclinksCountData[wonum] =
        attachmentListWoDetailDS.items.length;
    }

    app.state.doclinksCount = app.state.doclinksCountData[wonum]
      ? app.state.doclinksCountData[wonum]
      : undefined;
      
    page.state.loadedLog = false;
    // Load rowsSelected prop from sessionStorage
    let selectedDisplayOption = this.app.client?.getUserProperty('displayOption');
    if (selectedDisplayOption) {
      page.state.rowsSelected = selectedDisplayOption.rowsSelected;
    }

    //Show the chechmark if service address exists on location touchpoint
    let serviceAdress = this.page.datasources['woServiceAddress'];
    if (
      serviceAdress &&
      serviceAdress.item.longitudex &&
      serviceAdress.item.latitudey
    ) {
      this.page.state.gpsLocationSaved = true;
    }
    //DT178612 GPS checkmark not displayed
    //istanbul ignore next
    else if(woDetailds){
      if(woDetailds.item.woserviceaddress){
        woDetailds.item.woserviceaddress.forEach((address) => {
          if(address.longitudex && address.latitudey){
            this.page.state.gpsLocationSaved = true;
          }else if(address.geoData){
            let geoData = address.geoData;
            if(geoData.latitudey && geoData.longitudex){
              this.page.state.gpsLocationSaved = true;
            }
          }
        })
      }
    }

    let mrStatus = await SynonymUtil.getDefaultExternalSynonymValue(
      this.app.findDatasource('synonymdomainData'),
      'MRSTATUS',
      'CAN'
    );
    const mrDS = this.page.datasources['mrDS'];
    if (mrDS) {
      await mrDS.initializeQbe();
      mrDS.setQBE('status', '!=', mrStatus);
      await mrDS.searchQBE();
    }

    let assetDataSource = page.datasources['woAssetLocationds'];
    let locDatasource = page.datasources['woLocationds'];

    if (assetDataSource) {
      await assetDataSource.load();
      let assetItem = assetDataSource.item;
      page.state.assetLocation = true;
      if (woDetailResource.item.assetnum && this.app.checkSigOption('ASSETMOBILE.READ')) {
        if (
          assetItem &&
          assetItem.wobyasset && 
          assetItem.wobyasset.filter(item => ['COMP','CLOSE'].includes(item.status_maxvalue)).length > 0
        ) {
          page.state.assetLocation = false;
        }
        
      //Get the href of the asset (Transactional Asset Data)
      const transAssetDs =  this.app.findDatasource('assetLookupDS');
      await transAssetDs?.load();
      const woDetailResourceNew = this.app.findDatasource('woDetailResource');
      await transAssetDs?.initializeQbe();
      transAssetDs?.setQBE('assetnum', woDetailResourceNew.item.assetnum);
      transAssetDs?.setQBE('siteid', woDetailResourceNew.item.siteid);
      const filteredCompClose = await transAssetDs?.searchQBE();

      if(filteredCompClose?.[0]?.href){
          this.page.state.currentWOAssetHref = filteredCompClose?.[0]?.href;
          this.page.state.assetAccess = filteredCompClose?.[0]?.href;
      }
      }
    }
    if (locDatasource) {
      await locDatasource.load();
      let locItem = locDatasource.item;
      if (woDetailResource.item.locationnum) {
        if (
          locItem &&
          locItem.wobylocation && 
          locItem.wobylocation.filter(item => ['COMP','CLOSE'].includes(item.status_maxvalue)).length > 0
        ) {
          page.state.assetLocation = false;
        }
      }
    }

    page.state.loading = false;

    //conditions to display the date and time with a local timzezone.
    if (woDetailResource.item.schedstart) {
      await this.setLocaleTime('schedstart');
    }
    if (woDetailResource.item.schedfinish) {
      await this.setLocaleTime('schedfinish');
    }
    if (woDetailResource.item.reportdate) {
      await this.setLocaleTime('reportdate');
    }

    //Open the tools/material drawer if navigated back from reserve item page or MR page
    if (app.lastPage) {
      if (
        (app.lastPage.name === 'reserveMaterials' &&
          this.app.state.openedFrom === '') ||
        app.lastPage.name === 'materialRequest'
      ) {
        this.openMaterialToolDrawer({
          item: woDetailResource.item,
          datasource: woDetailResource,
          reload: false
        });
      }
    }

    let allowedSignatureSystemProp = this.app.state.systemProp && this.app.state.systemProp["maximo.mobile.statusforphysicalsignature"];

    if (allowedSignatureSystemProp) {
      let allowedSignature = allowedSignatureSystemProp
        .split(",")
        .map((status) => status.trim());
      let selected_status_is_inprg = allowedSignature.indexOf("INPRG") > -1 ? "INPRG" : "APPR";
      this.page.state.enableSignatureButton =
        allowedSignature.length > 0 &&
        allowedSignature.indexOf(selected_status_is_inprg) > -1;
      this.page.state.compDomainStatus = selected_status_is_inprg + new Date().getTime();
    }

  }


  async pagePaused() {
    this.page.findDialog('woWorkLogDrawer')?.closeDialog();
    this.page.findDialog('slidingwodetailsmaterials')?.closeDialog();
    this.page.findDialog('openChangeStatusDialog')?.closeDialog(); 
    this.page.findDialog('wohazardDrawer')?.closeDialog(); 
    this.app?.findPage("schedule")?.findDialog('woStatusChangeDialog')?.closeDialog();   
      
  }
  /**
   * Compute sliding drawer title
   * Return array to be used in localized label
   * @param {Object} item datasource item
   * @returns {Array} tuple with label id and fallback label
   */
  getDrawerLabel({ wptool = null, wpmaterial = null }) {
    const hasTools = wptool && wptool.length;
    const hasMaterial = wpmaterial && wpmaterial.length;

    let label = ['materialsAndToolsLabel', 'Materials and tools'];
    if (hasTools && !hasMaterial) {
      label = ['toolsLabel', 'Tools'];
    }
    if (hasMaterial && !hasTools) {
      label = ['materialsLabel', 'Materials'];
    }
    return label;
  }

  /**
   * Function to open a sliding-drawer dialog to show Materials and Tools for the Work Order
   * @param event should contain
   * item - The Work Order selected.
   * datasource - The Datasource to filter Materials and Tools listed in the Dialog.
   */
  async openMaterialToolDrawer(event) {
    if (event?.reload) {
      await event.datasource.load({ itemUrl: event.item.href });
    }
    const [labelId, fallback] = this.getDrawerLabel(event.item);
    this.page.state.dialogLabel = this.app.getLocalizedLabel(labelId, fallback);
    this.page.showDialog('slidingwodetailsmaterials');
  }

  /**
   * Function to open material request page the Work Order
   * @param event should contain
   * item - The Work Order selected.
   */
  async openMaterialRequestPage(event) {
    this.app.setCurrentPage({
      name: 'materialRequest',
      params: { href: event.item.href, mr: event.mritem },
    });
    this.page.findDialog('slidingwodetailsmaterials').closeDialog();
  }

  /**
  * Validate before closing sliding drawer.
  * @param {validateEvent} validateEvent
  */
  workLogValidate(validateEvent) {
    if (this.page.state.isWorkLogEdit) {
      validateEvent.failed = true;
      this.page.showDialog('saveDiscardWorkLogDetail');
    } else {
      validateEvent.failed = false;
    }
  }

  assetStatusValidate(){
    //istanbul ignore next
    if (this.page.state.hideUp && this.page.state.hideDown) {
       return;
    } else {
      this.page.showDialog('saveDiscardassetDialog');
    }
  }

  closeAssetStatusDialog(){
    //istanbul ignore next
    this.page.findDialog('assetStatusDialog').closeDialog();
  }

  /**
  * This method calls when click save button on save discard prompt.
  */
  saveWorkLogSaveDiscard() {
    // Save Entered Data to chat Log
    if (!this.page.state.workLogData?.sendDisable) {
      this.saveWorkLog(this.page.state.workLogData);
    }
  }

  /**
  * This method calls when click discard button on save discard prompt.
  */
  closeWorkLogSaveDiscard() {
    // Close Work Log Drawer
    this.page.findDialog('woWorkLogDrawer')?.closeDialog();
  }

  /**
  * This method is called when any changes done on work log screen and return value as Object with all field value.
  * @param {value} value
  */
  watchChatLogChanges(value) {
    // Clear Debounce Timeout
    clearTimeout(this.page.state.workLogChangeTimeout);
    // Set Debounce Timeout
    this.page.state.workLogChangeTimeout = setTimeout(() => {
      if (value?.summary || value?.longDescription || value?.logType?.value !== this.page.state.initialDefaultLogType?.replace(/!/g, "") || value?.visibility) {
        this.page.state.isWorkLogEdit = true;
        this.page.state.workLogData = value;
        // Clear Debounce Timeout
        clearTimeout(this.page.state.workLogChangeTimeout);
      } else {
        this.page.state.isWorkLogEdit = false;
        this.page.state.workLogData = null;
        // Clear Debounce Timeout
        clearTimeout(this.page.state.workLogChangeTimeout);
      }
    }, 500);
  }

  /*
   * Method to add new work log
   */
  async saveWorkLog(value) {
    let longDescription = value.longDescription;
    let summary = value.summary;
    let longType = value.logType?.value? value.logType.value : this.page.state.WoDetailsDefaultLogType;
    let woDetailsWorklogDs = this.page.datasources['woDetailsWorklogDs'];
    
    let workLog = {
      createby: this.app.client.userInfo.personid,
      createdate: new Date(),
      logtype: longType,
      description: summary,
      anywhererefid: new Date().getTime(),
      description_longdescription: longDescription,
      clientviewable: value.visibility
    };

    let option = {
      responseProperties:
        'anywhererefid,createdate,description,description_longdescription,person.displayname--createby,logtype',
      localPayload: {
        createby:
          this.app.client.userInfo.displayName ||
          this.app.client.userInfo.personid,
        createdate: new Date(),
        description: summary,
        logtype: longType,
        anywhererefid: workLog.anywhererefid,
        description_longdescription: longDescription,
      },
    };
    let response;
    try {
      this.app.userInteractionManager.drawerBusy(true);
      this.page.state.chatLogLoading = true;
      this.saveDataSuccessful = true;

      woDetailsWorklogDs.on('update-data-failed', this.onUpdateDataFailed);
      response = await woDetailsWorklogDs.update(workLog, option);
      // istanbul ignore if
      if (response) {
        woDetailsWorklogDs.off('update-data-failed', this.onUpdateDataFailed);
      }

      this.page.state.chatLogGroupData = await this.page.datasources[
        'woDetailsWorklogDs'
      ].forceReload();
    } catch {
    } finally {
      this.app.userInteractionManager.drawerBusy(false);
      this.page.state.chatLogLoading = false;
      //Reset default Logtype
      let schemaLogType = this.page.datasources[
        'woDetailsWorklogDs'
      ].getSchemaInfo('logtype');
      // istanbul ignore else
      if (schemaLogType) {
        this.page.state.WoDetailsDefaultLogType = schemaLogType.default;
      }
    }
    //If no error happen then re-open the drawer
    // istanbul ignore else
    if (this.saveDataSuccessful) {
      this.page.showDialog('woWorkLogDrawer');
    }
    
  }

  /*
   * Method to open the Change Status slider-drawer.
   * @param event should contain
   * item - The Work Order selected.
   * datasource - The Datasource for synonymdomain.
   */
  async openWoDtlChangeStatusDialog(event) {
    log.t(
      TAG,
      'openChangeStatusDialog : event --> ' +
        event.datasource +
        ' wonum --> ' +
        event.item.wonum
    );

    let schedulePage = this.app.pages.find((element) => {
      // istanbul ignore else
      if (element.name === 'schedule' || element.name === 'approval') {
        return element;
      } else {
        return '';
      }
    });
    //istanbul ignore else
    if (schedulePage && schedulePage !== '') {
      schedulePage.callController('openChangeStatusDialog', event);
      this.page.state.navigateToSchedulePage = true;
    }
  }

  /*
   * Opens the meter details  on basis of workorder
   */
  openMeterReadingDrawer(event) {
    if (event.item) {
      this.page.state.assetMeterHeader = WOUtil.getAssetName(event.item);
      this.page.state.locationMeterHeader = WOUtil.getLocationName(event.item);

      //istanbul ignore if
      if (event.item.asset && event.item.asset.length > 0) {
        this.page.state.currentAssetHref = event.item.asset[0].href;
      }

      this.page.showDialog('meterReadingDrawerDetail');
    }
  }

  /**
* This method is called by clicking on start work or stop work button on work order detail page
* and start/stop timer for specific work order accordingly.
* @param {event} event
*/
  //istanbul ignore next
  async openSignatureDialog(event) {
    let workorder = event.item;

    let woDetailds = this.app.findDatasource("wodetails");
    await woDetailds.load({ noCache: true, itemUrl: workorder.href });
    this.app.userInteractionManager.openSignature(
      imageData => {
        log.t(TAG, "base64 image" + imageData);
      }
      ,
      {
        imageFormat: null,
        primaryIcon: null,
        secondaryIcon: null,
        heading: null,
        primaryButtonSaveText: null,
        secondaryButtonDiscardText: null,
        signatureLabel: null,
        filename: this.page.state.compDomainStatus,
        datasource: this.app.findDatasource("signatureAttachment"),
        onUpload: this.onUpload.bind(this),
      })
  }

  /**
* This method invokes complete work API once image is uploaded.
*/
  //istanbul ignore next
  async onUpload() {
    //During Start work it will not wait for the API response
    let woDetailResourceDS = this.app.findDatasource("woDetailResource");
    //istanbul ignore else
    if (woDetailResourceDS) {
      // await woDetailResourceDS.forceReload();
      this.app.state.doclinksCountData[woDetailResourceDS.item.wonum] = Device.get().isMaximoMobile ? woDetailResourceDS.item.doclinks.member.length : woDetailResourceDS.item.doclinkscount;
      this.app.state.doclinksCount = this.app.state.doclinksCountData[woDetailResourceDS.item.wonum];
    }

    const workorder = {
      item: woDetailResourceDS.item,
      datasource: woDetailResourceDS,
      action: "start",
      worktype: "work"
    }
    await this.startWOStopTimer(workorder);
  }


  /**
   * This method is called by clicking on start work or stop work button on work order detail page
   * and start/stop timer for specific work order accordingly.
   * @param {event} event
   */
  async startWOStopTimer(event) {
    const woDetailResource = this.page.datasources['woDetailResource'];
    const woLaborDetailDS = this.page.datasources['woLaborDetailds'];

    this.page.state.currentItem = event.item.wonum;

    /**
     * changing the disConnected flag when starting WO in Offline
     */
    if (!this.app.state.networkConnected) this.page.state.disConnected = true; 

    await WOTimerUtil.clickStartStopTimer(
      this.app,
      this.page,
      event,
      event.worktype,
      woDetailResource,
      woLaborDetailDS,
      'woConfirmLabTime'
    );
  }

  /**
   * This method is called by clicking edit labor button on confirm dialog.
   */
  async onClickEditLabor() {
    let wodetails = this.page.datasources['woDetailResource'];
    const woLaborDetailDS = this.page.datasources['woLaborDetailds'];
    woLaborDetailDS.item.wonum = wodetails.item.wonum;
    await WOTimerUtil.clickEditLabor(
      this.app,
      wodetails.item.href,
      woLaborDetailDS.item
    );
  }

  /**
   * This method is called by clicking send button on confirm dialog.
   * @param {event} event
   */
  async onClickSendLabTrans(event) {
    const woDetailResource = this.page.datasources['woDetailResource'];
    const woLaborDetailDS = this.page.datasources['woLaborDetailds'];
    await WOTimerUtil.clickSendLabTrans(
      this.app,
      this.page,
      event.action,
      woDetailResource,
      woLaborDetailDS
    );

    //Update the wo list after start/stop WO
    //istanbul ignore next
    if (this.app.findPage('schedule')) {
      let schedPage = this.app.findPage('schedule') || this.app.findPage("approvals");
      const wolistds = this.app.findDatasource(schedPage.state.selectedDS);
      let response = await wolistds.forceReload();
      schedPage.state.woItems = response;
    }
  }

  /**
   * Redirects to attachments page.
   */
  showAttachmentPage(event) {
    this.app.setCurrentPage({
      name: 'attachments',
      params: { itemhref: event.item.href },
    });
  }

  /**
   * Redirects to Related work order page.
   */
  showRelatedWOPage(event) {
    this.page.state.clickable = this.page.params?.depth===1;
    this.app.setCurrentPage({
      name: 'relatedWorkOrder',
      params: { itemhref: event.item.href ,followupclickable : this.page.state.clickable},
      pushStack:true
    });
  }

  /**
   * Open Specification Drawer.
   */
  async showSpecifications() { 
    const woSpecification = this.page.datasources['woSpecification'];
    await woSpecification.load({ noCache: true});
    //istanbul ignore next
    this.page.showDialog('woSpecificationDrawer');
  }

  /**
   * Switch to Assist application with context
   */
  gotoAssistApp(event) {
    log.t(TAG, 'gotoAssistApp', event.item);
    const item = event.item || {};
    const woFields = [
      'wonum',
      'title',
      'workorderid',
      'assetnum',
      'assetdesc',
      'assettype',
      'company',
      'failurecode',
      'failuredesc',
      'problemcode',
      'status',
      'status_description',
      'owner',
      'siteid',
      'href',
      'reportdate',
      'schedstart',
      'actstart',
      'targstartdate',
      'classificationid',
      'jpnum',
      'jpdesc',
      'taskid',
      'task_description',
      'task_status',
      'task_status_description',
      'task_inspname',
      'task_inspresult',
      'locationnum',
      'locationdesc',
    ];
    const { description, locationnum, failure, taskid } = item;
    let value = { wodesc: description };
    for (let i = 0; i < woFields.length; i++) {
      let key = woFields[i];
      if (item[key] != null) {
        value[key] = item[key];
      }
    }
    if (locationnum) {
      value.location = item.locationnum;
    }
    // istanbul ignore next
    if (failure && failure.description) {
      if (value.failuredesc == null) {
        value.failuredesc = failure.description;
      }
    }
    let type = taskid ? 'mxwotask' : 'mxwo';
    // maximo wo context passed to assist app
    let context = { type, value };
    this.app.emit('loadApp', {
      appName: 'assist',
      context,
    });
  }

  /**
   * Function to load card view of a selected work order on map-overlay
   */
  async handleMapPage(event) {
    let schedPage = this.app.findPage('schedule') || this.app.findPage("approvals");
    //istanbul ignore else
    if (schedPage) {
      schedPage.state.selectedSwitch = 1;
      schedPage.state.mapOriginPage = 'wodetail';
      schedPage.state.previousPage = 'wodetail';
      this.app.setCurrentPage(schedPage);
      schedPage.callController('openWOCard', event);
    }
  }

  /**
   * Function to display asset mismatch dialog or confirmation toast based on barcode scanned value.
   */
  async handleAssetScan(event) {
    this.page.state.assetScanValue = event.value
      ? event.value
      : this.app.getLocalizedLabel('unknown', 'Unknown');
    let woAssetLocationds = await this.page.datasources[
      'woAssetLocationds'
    ].load();

    if (this.page.state.assetScanValue === woAssetLocationds[0].assetnum) {
      let label = this.app.getLocalizedLabel(
        'asset_confirmed',
        'Asset confirmed'
      );
      this.app.toast(label, 'success');
    } else {
      this.page.showDialog('assetMisMatchDialog');
    }
  }

  /**
   * Close asset mismatch dialog.
   */
  async closeMisMatchDialog() {
    // istanbul ignore next
    if (this.page) {
      this.page.findDialog('assetMisMatchDialog').closeDialog();
    }
  }

  /**
   * Open barcode scanner after closing the dialog.
   */
  openBarcodeScanner(event) {
    this.closeMisMatchDialog();
    this.handleAssetScan(event);
  }

  /*
   * Method to open the asset workOrder history.
   */
  openAssetWorkOrder(event) {
    // Fetch where property value from asset and location datasource
    const assetWhereQuery = this.page.datasources['woAssetLocationds'].baseQuery.childFilters[0]['asset.wobyasset.where'];
    const locationWhereQuery = this.page.datasources['woLocationds'].baseQuery.childFilters[0]['locations.wobylocation.where'];
    const assetQueryList = assetWhereQuery.slice(assetWhereQuery.indexOf('[') + 1, assetWhereQuery.indexOf(']') - 1).replace(/['"]+/g, '').split(',');
    const locationQueryList = locationWhereQuery.slice(locationWhereQuery.indexOf('[') + 1, locationWhereQuery.indexOf(']') - 1).replace(/['"]+/g, '').split(',');

    this.app.setCurrentPage({ name: 'assetWorkOrder' });
    // istanbul ignore else
    if (this.app.currentPage) {
      this.app.currentPage.callController('loadRecord', event, assetQueryList, locationQueryList);
    }
  }

  /*
   * Save GPS latitude and longitude in service address of the workorder.
   */
  async saveGPSLocation(item) {
    let geolocationlong = this.app.geolocation.state.longitude;
    let geolocationlat = this.app.geolocation.state.latitude;

    let geoData = {};
    // if coordinate type XY then first covert it to LAT LANG
    if(item?.coordinate === 'XY' && this.app.map) {
      const coordinates = this.app.map.convertCoordinates(
        [geolocationlong, geolocationlat],
        'EPSG:4326',
        this.app.map.getBasemapSpatialReference()
      )
      geoData = {
        latitudey: coordinates?.[1],
        longitudex: coordinates?.[0],
      };
    } else {
      geoData = {
        latitudey: geolocationlat,
        longitudex: geolocationlong,
      };
    }

    await this.page.datasources['woServiceAddress'].update(geoData, {
      responseProperties: 'wonum',
      localPayload: {
        geoData,
      },
    });

    item.autolocate = `{"coordinates":[${geoData.longitudex},${geoData.latitudey}],"type":"Point"}`;

    const dsWoDetails = this.app.findDatasource('woDetailResource');
    await dsWoDetails?.initializeQbe();
    dsWoDetails?.setQBE('wonum', item.wonum);
    const dsWoDetailsSearch = await dsWoDetails?.searchQBE(undefined, false);
    if(dsWoDetailsSearch && dsWoDetailsSearch[0]) {
      dsWoDetailsSearch[0].autolocate = `{"coordinates":[${geoData.longitudex},${geoData.latitudey}],"type":"Point"}`;
    }

    let label = this.app.getLocalizedLabel(
      'gps_location_saved',
      'Device location saved'
    );
  
    this.app.toast(label, 'success', '');
    this.page.state.gpsLocationSaved = true;
  }
  /**
   * Function to open edit work order page when click on edit icon
   * Passing current workorder details in page params to get the current work order details on edit page
   */
  workOrderEdit(event) {
    let workorder = event.item;
    let woSchema = this.app.findDatasource(event.datasource).getSchema();
     // istanbul ignore next
    if (workorder && (workorder.wonum || workorder.href)) {
      this.app.state.woDetail = {
        page: 'workOrderDetails',
        wonum: this.page.params.wonum,
        siteid: this.page.params.siteid,
        href: this.page.params.href,
      };
      this.app.setCurrentPage({
        name: 'woedit',
        resetScroll: true,
        params: { 
          workorder, woSchema ,
          wonum: workorder.wonum,
          istask: workorder.istask,
          wogroup: workorder.wogroup,
          taskid: workorder.taskid,
          wo:event.item
        },
      });
    }
  }

  /*
   * Opens the asset down time drawer on basis of workorder asset
   */
  async openAssetDownTimeDrawer(event) {
    let device = Device.get();
    let offlineModDowntime = [];
    let anywhereContainerMode = device.isMaximoMobile;
    let woDetailDs = this.page.datasources['woDetailResource'];
    let modDownTime = woDetailDs.item.moddowntimehist;
    this.page.state.upDownButtonGroupdata = [
      {
        id: 'assetUpBtn',
        iconName: 'carbon:arrow--up',
        toggled: event.item.assetisrunning,
      },
      {
        id: 'assetDownBtn',
        iconName: 'carbon:arrow--down',
        toggled: !event.item.assetisrunning,
      },
    ];

    let statusdate = '';
    // istanbul ignore next
    if (modDownTime && modDownTime.length) {
      // istanbul ignore else
      if (anywhereContainerMode) {
        offlineModDowntime = modDownTime.filter(
          (item) => item.savedFromDevice === true
        );
      }

      if (
        offlineModDowntime &&
        offlineModDowntime.length &&
        anywhereContainerMode
      ) {
        statusdate = modDownTime[modDownTime.length - 1].startdate;
      } else {
        if (modDownTime[0].enddate) {
          statusdate = modDownTime[0].enddate;
        } else {
          statusdate = modDownTime[0].startdate;
        }
      }
    }
    this.page.state.lastStatusChangeDate = statusdate;

    this.page.state.hideUp = true;
    this.page.state.hideDown = true;
    this.page.state.disableSaveDowtimeButton = true;
    this.page.state.downTimeCodeValue = '';
    this.page.state.downTimeCodeDesc = '';
    await this.setCurrentDateTime();
    this.page.showDialog('assetStatusDialog');
  }

  /*
   * Set current Date/Time
   */
  async setCurrentDateTime() {
    let downTimeReportAsset = this.page.datasources['downTimeReportAsset'];
    let downTimeData = [
      {
        statuschangedate: this.app.dataFormatter.convertDatetoISO(new Date()),
      },
    ];
    await downTimeReportAsset.load({ src: downTimeData, noCache: true });
  }

  /*
   * Functions that support to display the local timezone
   */
  // istanbul ignore next 
  async setLocaleTime(date_value) {
    const woDetailResource = this.page.datasources['woDetailResource'];

    const localeString = new Date(
      `${woDetailResource.item[date_value]}`
    ).toString();

    const new_date_value = this.app.dataFormatter.convertDatetoISO(
      localeString
    );

    woDetailResource.item[date_value] = new_date_value;
  }
  /*
   * Switch between up and down state
   */
  handleToggled(evt) {
    this.page.state.hideUp = false;
    this.page.state.hideDown = false;
    const id = evt.item.id;
    for (
      let index = 0;
      index < this.page.state.upDownButtonGroupdata.length;
      index++
    ) {
      const element = this.page.state.upDownButtonGroupdata[index];

      if (id === 'assetDownBtn' && evt.isrunning) {
        this.page.state.hideUp = false;
        this.page.state.hideDown = false;
        // istanbul ignore next
        window.setTimeout(() => {
          this.validateDownTimeDate();
        }, 50);
      } else if (id === 'assetUpBtn' && !evt.isrunning) {
        this.page.state.hideUp = false;
        this.page.state.hideDown = true;
        // istanbul ignore next
        window.setTimeout(() => {
          this.validateDownTimeDate();
        }, 50);
      } else {
        this.page.state.hideUp = true;
        this.page.state.hideDown = true;
        // istanbul ignore next
        window.setTimeout(() => {
          this.page.state.disableSaveDowtimeButton = true;
        }, 50);
      }

      // istanbul ignore else
      if (element.id === id) {
        element.toggled = evt.item.toggled;
        break;
      }
    }
  }

  /**
   * Function to open Down time lookup
   */
  async openDowntimeCodeLookup(evt) {
    let downTimeCodeLookup = evt.page.datasources['downTimeCodeLookupDs'];
    await downTimeCodeLookup.initializeQbe();
    downTimeCodeLookup.setQBE('domainid', '=', 'DOWNCODE');
    downTimeCodeLookup.searchQBE();
    evt.page.showDialog('downTimeCodeLookup');
  }

  /**
   * Function to choose Down time code
   */
  chooseDownTimeCode(evt) {
    // istanbul ignore else
    if (evt) {
      this.page.state.downTimeCodeValue = evt.value;
      this.page.state.downTimeCodeDesc = evt.description;
    }
  }

  /*
   * Method to update the multi asset progress
   */
  async updateMultiAssetProgress(record) {
    let item = record.assetItem;
    // istanbul ignore else
    if (item) {
      this.page.state.currentAsset = item.multiid;
      this.page.state.assetToOpen = '';
      let woMultiAssetLocationds = this.app.findDatasource(
        'woMultiAssetLocationds'
      );
      let asset = {
        progress: !item.progress,
        href: item.href,
      };
      let option = {
        responseProperties: 'progress',
        localPayload: {
          progress: !item.progress,
          href: item.href,
        },
      };
      await woMultiAssetLocationds.update(asset, option);
      await woMultiAssetLocationds.forceReload();
      this.page.state.progress = !item.progress;

      let incompAssetCount = [];
      // istanbul ignore else
      if (woMultiAssetLocationds && woMultiAssetLocationds.items) {
        woMultiAssetLocationds.items.forEach((item) => {
          // istanbul ignore else
          if (item.progress === false) {
            incompAssetCount.push(item._rowstamp);
          }
        });
      }
      // istanbul ignore else
      if (incompAssetCount.length >= 1) {
        woMultiAssetLocationds.clearState();
        await woMultiAssetLocationds.load();
      }
    }
  }

  /**
   * Smart input on value changed handler
   */
  async onValueChanged(changeObj) {
    // istanbul ignore else
    if (
      this.page.state.useConfirmDialog &&
      (changeObj.field?.indexOf('computedMeterCurDate') > -1 ||
        changeObj.field?.indexOf('computedMeterCurTime') > -1)
    ) {
      this.page.state.useConfirmDialog = true;
    } else {
      this.page.state.useConfirmDialog = false;
    }

    if (changeObj.field === 'statuschangedate') {
      this.validateDownTimeDate();
    }
    // istanbul ignore else
    if (
      changeObj.field === 'newreading' ||
      changeObj.field?.indexOf('newreading') > -1
    ) {
      let valType = typeof changeObj.newValue;
      if (valType === 'number') {
        //setting flag to true before save
        this.validatemeter = true;
        //setting default rollover flag to false
        this.isRollover = false;
      }

      // istanbul ignore next
      if (!changeObj.newValue) {
        await WOUtil.popMeterReadingErrors(changeObj, this.page);
      }

      let assetMeterds = this.app.findDatasource('woassetmeters');
      let locationMeterDs = this.app.findDatasource('wolocationmeters');
      let hasAssetAnyNewReading = false;
      let hasAnyNewReading = false;
      let hasLocationAnyNewReading = false;

      if (this.page.state.drawerName !== 'update_multiMeterReading_drawer') {
        if (assetMeterds && assetMeterds.items) {
          hasAssetAnyNewReading = assetMeterds.items.some(
            (item) => item.newreading
          );
        }

        if (locationMeterDs && locationMeterDs.items) {
          hasLocationAnyNewReading = locationMeterDs.items.some(
            (item) => item.newreading
          );
        }

        hasAnyNewReading = hasAssetAnyNewReading || hasLocationAnyNewReading;
      }

      // istanbul ignore if
      if (changeObj.datasource.name === 'woMultiAssetLocationds') {
        let assetMeterNewReading = false;
        let locationMeterNewReading = false;

        if (this.page.state.assetMeterData.items.length > 0) {
          assetMeterNewReading = this.page.state.assetMeterData.items.some(
            (item) => item.newreading
          );
        }

        if (this.page.state.locationMeterData.items.length > 0) {
          locationMeterNewReading = this.page.state.locationMeterData.items.some(
            (item) => item.newreading
          );
        }

        hasAnyNewReading = assetMeterNewReading || locationMeterNewReading;
      }
      // istanbul ignore if
      if (hasAnyNewReading || hasLocationAnyNewReading) {
        await WOUtil.enableDisableSaveBtn(this.page);
        this.page.state.useConfirmDialog = true;
      } else {
        this.page.state.useConfirmDialog = false;
      }

      // istanbul ignore if
      if (
        (hasAnyNewReading || hasLocationAnyNewReading) &&
        !this.page.state.hasAnyReadingError
      ) {
        this.page.state.readingChangeInvoked = false;
      } else {
        this.page.state.disableSave = true;
      }
    }

    if (this.page.state.newReading) {
      let date;
      if (changeObj.item.activeassetmeter) {
        let activeAssetMeter = changeObj.item.activeassetmeter;

        // istanbul ignore next
        if (Array.isArray(activeAssetMeter)) {
          let assetMtr = activeAssetMeter.filter(
            (item) =>
              item.newreading &&
              item.assetmeterid === changeObj.change.object.assetmeterid
          );

          if (
            assetMtr &&
            assetMtr[0] &&
            changeObj.newValue !== assetMtr[0].computedMeterCurDate
          ) {
            changeObj.oldValue = changeObj.newValue;
            date = new Date();
            let assetdtobj = {};
            assetdtobj.computedMeterCurDate = date;
            assetdtobj.computedMeterCurTime = date;
            Object.assign(assetMtr[0], assetdtobj);
          }
        }
      }

      if (changeObj.item.activelocationmeter) {
        let activeLocationMeter = changeObj.item.activelocationmeter;

        // istanbul ignore next
        if (Array.isArray(activeLocationMeter)) {
          let locMtr = activeLocationMeter.filter(
            (item) =>
              item.newreading &&
              item.locationmeterid === changeObj.change.object.locationmeterid
          );

          if (
            locMtr &&
            locMtr[0] &&
            changeObj.newValue !== locMtr[0].computedMeterCurDate
          ) {
            date = new Date();
            let locationdtobj = {};
            locationdtobj.computedMeterCurDate = date;
            locationdtobj.computedMeterCurTime = date;
            Object.assign(locMtr[0], locationdtobj);
          }
        }
      }
    }
  }

  /**
   * Validate down time date
   */
  validateDownTimeDate() {
    let downTimeReportAsset = this.page.datasources['downTimeReportAsset'];
    let dataFormatter = this.app.dataFormatter;
    let statusChangeDate = downTimeReportAsset.item['statuschangedate'];
    let errorMessage = '';
    let errorField = '';

    if (
      downTimeReportAsset.currentItem != null &&
      downTimeReportAsset.getWarning(
        downTimeReportAsset.currentItem,
        'statuschangedate'
      )
    ) {
      this.page.state.disableSaveDowtimeButton = true;
      this.clearWarnings('statuschangedate');
      return;
    }

    if (statusChangeDate === '') {
      errorMessage = this.app.getLocalizedLabel(
        'assetStatusDateRequired',
        'Status Date is required.'
      );
      errorField = 'statuschangedate';
      this.showDownTimeWarning(errorField, errorMessage);
      this.page.state.disableSaveDowtimeButton = true;
      return errorMessage;
    } else {
      this.page.state.disableSaveDowtimeButton = false;
      this.clearWarnings('statuschangedate');
    }

    // istanbul ignore else
    if (this.page.state.lastStatusChangeDate) {
      if (
        dataFormatter.convertISOtoDate(statusChangeDate).getTime() <=
        dataFormatter
          .convertISOtoDate(this.page.state.lastStatusChangeDate)
          .getTime()
      ) {
        this.page.state.disableSaveDowtimeButton = true;
        errorMessage = this.app.getLocalizedLabel(
          'assetStatusDateCompare',
          'New asset status change date must be greater than change dates on all previous transactions for this asset.'
        );
        errorField = 'statuschangedate';
        this.showDownTimeWarning(errorField, errorMessage);
        return errorMessage;
      } else {
        this.page.state.disableSaveDowtimeButton = false;
        this.clearWarnings('statuschangedate');
      }
    }
  }

  /**
   * Function to set field warnings
   */
  // istanbul ignore next
  showDownTimeWarning(field, message) {
    let downTimeReportAsset = this.page.datasources['downTimeReportAsset'];
    downTimeReportAsset.setWarning(downTimeReportAsset.item, field, message);
  }

  /**
   * Function to clear field warnings
   */
  // istanbul ignore next
  clearWarnings(field) {
    let downTimeReportAsset = this.page.datasources['downTimeReportAsset'];
    downTimeReportAsset.clearWarnings(downTimeReportAsset.item, field);
  }

  /**
   * Save asset dowtime
   */
  async saveAssetDownTimeTransaction(evt) {
    let downTimeReportAsset = evt.page.datasources['downTimeReportAsset'];
    let woDetailDs = evt.page.datasources['woDetailResource'];
    let action = 'downtimereport';
    let option = {
      objectStructure: 'mxapiwodetail',
      parameters: {
        statuschangedate: downTimeReportAsset.item.statuschangedate,
        statuschangecode: evt.page.state.downTimeCodeValue || '',
        operational: '1',
      },
      record: woDetailDs.item,
      responseProperties: 'moddowntimehist{*}',
      localPayload: {
        statuschangedate: downTimeReportAsset.item.statuschangedate,
        assetisrunning: !woDetailDs.item.assetisrunning,
        moddowntimehist: [
          {
            startdate: downTimeReportAsset.item.statuschangedate,
            savedFromDevice: true,
          },
        ],
      },
    };

    try {
      evt.page.state.loadingreportdowntimebtn = true;
      await woDetailDs.invokeAction(action, option);
      await woDetailDs.forceReload();
    } finally {
      evt.page.state.loadingreportdowntimebtn = false;
      evt.page.findDialog('assetStatusDialog').closeDialog();
    }
  }

  /**
   * Open meter reading sliding drawer on click of meter touchpoint
   * @param  {Object} event current multiassetlocci object
   */
  async openMultiMeterReadingDrawer(event) {
    let multids = this.page.datasources['woMultiAssetLocationds'];
    this.page.state.multiid = event.item.multiid;
    await multids.initializeQbe();
    multids.setQBE('multiid', '=', event.item.multiid);
    let response = await multids.searchQBE(undefined, true);
    //istanbul ignore else
    if (response) {
      this.page.state.assetMeterHeader = WOUtil.getAssetName(event.item);
      this.page.state.locationMeterHeader = WOUtil.getLocationName(event.item);
      //istanbul ignore else
      if (response && response[0].asset && response[0].asset.length > 0) {
        this.page.state.currentAssetHref = response[0].asset[0].href;
      }
      let activeassetmeterData = multids.getChildDatasource(
        'activeassetmeter',
        event.item,
        { idAttribute: 'assetmeterid' }
      );
      let assetMeterItems = await activeassetmeterData.load();

      let self = this;
      //istanbul ignore next
      assetMeterItems.forEach(function (item) {
        WOUtil.computedReading(item, self.app);
      });
      this.page.state.assetMeterData = activeassetmeterData;
      let activelocationmeterData = multids.getChildDatasource(
        'activelocationmeter',
        event.item,
        { idAttribute: 'locationmeterid' }
      );
      let locationMeterItems = await activelocationmeterData.load();
      //istanbul ignore next
      locationMeterItems.forEach(function (item) {
        WOUtil.computedReading(item, self.app);
      });
      this.page.state.locationMeterData = activelocationmeterData;
      this.page.showDialog('multiMeterReadingDrawer');
    }
  }

  /**
   * Opens Enter meter drawer for the corresponding multiasset record.
   * @param  {Object} event current multiassetlocci item/datasource object
   */
  async openEnterReadingDrawer(event) {
    //reset newreading to undefined when transitioning into enter metering drawer
    let assetMeterDs = this.page.state.assetMeterData;
    let locationMeterDs = this.page.state.locationMeterData;

    await this.clearValues(assetMeterDs);

    await WOUtil.openEnterReadingDrawer(
      this.page,
      event.item,
      this.app.findDatasource('woDetailResource'),
      assetMeterDs,
      locationMeterDs,
      'update_multiMeterReading_drawer',
      event.readingType,
      this.app
    );
  }

  /**
   * close meter dialog.
   * @param  {Object} event current multiassetlocci item/datasource object
   */
  async closeMeterDialog(event) {
    await event.datasource.initializeQbe();
    event.datasource.clearQBE();
    await event.datasource.searchQBE(undefined, true);

    // istanbul ignore next
    if (event.page && event.page.findDialog('multiMeterReadingDrawer')) {
      event.page.findDialog('multiMeterReadingDrawer').closeDialog();
    }
  }

  /**
   * close update meter dialog.
   * @param  {Object} event current multiassetlocci item/datasource object
   */
  async saveUpdateMeterDialog(event) {
    //istanbul ignore else
    if (!this.isRollover) {
      //Get the updated info of asset and location against the selected multiid
      let multids = event.datasource;
      this.page.state.showSaveDialog = true;

      //istanbul ignore else
      if (multids && multids.item) {
        let assetNumData =
          multids.item.asset && multids.item.asset.length > 0
            ? multids.item.asset[0].assetnum
            : undefined;
        let locationData = multids.item.location
          ? multids.item.location
          : undefined;

        //Call save on button click
        let assetMeterDs = this.page.state.assetMeterData;
        let locationMeterDs = this.page.state.locationMeterData;

        //istanbul ignore if
        if (this.page.state.oldReading) {
          this.validateMeterDate();
          this.validateMeterTime();
        }

        //istanbul ignore else
        if (
          !this.page.state.invalidDateTime &&
          !this.page.state.hasAnyReadingError
        ) {
          await WOUtil.saveMeterReadings(
            {},
            this.app,
            assetMeterDs,
            locationMeterDs,
            this.page
          );

          this.validatemeter = false;
          await WOUtil.closeUpdateMeterDialog(
            this,
            this.page,
            assetNumData,
            locationData,
            event.item.siteid,
            'update_multiMeterReading_drawer',
            this.app
          );
        }
      }
    } else if (this.isRollover) {
      this.page.showDialog('multiMeterrollOverDialog');
      return;
    }
  }

  /*
   * save meter on discard save dialog.
   */
  //istanbul ignore next
  async onCustomSaveTransition(event) {
    //istanbul ignore else
    if (!this.isRollover) {
      let multids;
      let assetMeterDs;
      let locationMeterDs;
      let assetNumData;
      let locationData;
      let drawer;
      if (this.page.state.drawerName === 'update_multiMeterReading_drawer') {
        //istanbul ignore if
        if (this.page.state.oldReading) {
          this.validateMeterDate();
          this.validateMeterTime();
        }
        multids = this.app.findDatasource('woMultiAssetLocationds');
        assetNumData =
          multids.item.asset && multids.item.asset.length > 0
            ? multids.item.asset[0].assetnum
            : undefined;
        locationData = multids.item.location
          ? multids.item.location
          : undefined;

        //Call save on button click
        assetMeterDs = this.page.state.assetMeterData;
        locationMeterDs = this.page.state.locationMeterData;
        drawer = 'update_multiMeterReading_drawer';
      } else {
        assetMeterDs = this.app.findDatasource('woassetmeters');
        locationMeterDs = this.app.findDatasource('wolocationmeters');

        assetNumData = assetMeterDs.item.assetnum || undefined;
        locationData = locationMeterDs.item.locationnum || undefined;
        drawer = 'update_meterReading_drawer_detail';

        //istanbul ignore if
        if (this.page.state.oldReading) {
          this.validateMeterDateDetail();
          this.validateMeterTimeDetail();
        }
      }

      //Re open the meter dialog if has any error
      if (
        this.page.state.invalidDateTime ||
        this.page.state.hasAnyReadingError
      ) {
        window.setTimeout(() => {
          this.page.showDialog(drawer);
          if (drawer === 'update_multiMeterReading_drawer') {
            multids.state.itemsChanged = true;
          }
        }, 500);

        return true;
      }

      if (
        !this.page.state.invalidDateTime &&
        !this.page.state.hasAnyReadingError
      ) {
        WOUtil.saveMeterReadings(
          {},
          this.app,
          assetMeterDs,
          locationMeterDs,
          this.page
        );

        await WOUtil.closeUpdateMeterDialog(
          this,
          this.page,
          assetNumData,
          locationData,
          assetMeterDs.item.siteid,
          drawer,
          this.app
        );
      }
    } else if (this.isRollover) {
      window.setTimeout(() => {
        this.page.showDialog(this.page.state.drawerName);
        if (this.page.state.drawerName === 'update_multiMeterReading_drawer') {
          this.app.findDatasource(
            'woMultiAssetLocationds'
          ).state.itemsChanged = true;
        }
      }, 500);
      this.page.showDialog(
        this.page.state.drawerName === 'update_multiMeterReading_drawer'
          ? 'multiMeterrollOverDialog'
          : 'rollOverDialogDetail'
      );

      return true;
    }
  }

  /*
   * close meter dialog.
   */
  async closeUpdatemultiMeterDialog() {
    this.page.state.useConfirmDialog = true;
  }

  /**
   * Reset multiassetlocci, asset/location meter datasources
   * @param  {Object} inputData asset/location object
   */
  async updateMeterDatasources(inputData) {
    //istanbul ignore else
    let wodetailsDS = this.page.datasources['woMultiAssetLocationds'];
    await wodetailsDS.initializeQbe();
    wodetailsDS.clearQBE();
    await wodetailsDS.searchQBE(undefined, true);
    let self = this;
    //istanbul ignore else
    if (inputData.assetNum) {
      let assetMeterDS = this.page.state.assetMeterData;
      let assetMeterItems = await assetMeterDS.load();

      //istanbul ignore next
      if (assetMeterItems) {
        assetMeterItems.forEach(function (item) {
          WOUtil.computedReading(item, self.app);
        });
      }
    }
    //istanbul ignore else
    if (inputData.location) {
      let locationMeterDS = this.page.state.locationMeterData;
      let locationMeterItems = await locationMeterDS.load();
      //istanbul ignore next
      if (locationMeterItems) {
        locationMeterItems.forEach(function (item) {
          WOUtil.computedReading(item, self.app);
        });
      }
    }
  }

  /**
   * Open meter lookup with new readings on the basis of meter domainid.
   * @param  {Oject} event changed meter object
   */
  async openmultiMeterLookup(event) {
    let dnewreadingDS = this.page.datasources.multidsnewreading;
    await WOUtil.openMeterLookup(
      this.page,
      event.item,
      dnewreadingDS,
      event.datasource,
      'multiMeterReadingLookup'
    );
  }

  /**
   * save new characterstic meter readings.
   * @param  {Object} event changed meter object
   */
  async saveCharactersticMeterReading(event) {
    //istanbul ignore else
    if (event) {
      this.page.state.updateCharecteristicMeterReadingItem['newreading'] =
        event.value;

      WOUtil.enableDisableSaveBtn(this.page);
    }
  }

  /**
   * Validate reading data before submission.
   * @param {Object} changeObj changed meter object
   */
  validateMeterReadings(changeObj) {
    WOUtil.validateMeterReadings(changeObj, this);
  }

  /**
   * Save rollover readings based on user confirmation.
   * @param {*} userConfirmation true or false based on user input
   */
  async saveRollOverReadings(userConfirmation) {
    this.isRollover = false;
    //istanbul ignore else
    if (
      this.page.state.rollOverData &&
      this.page.state.rollOverData.length > 0
    ) {
      let self = this;
      self.page.state.rollOverData.forEach((element, index) => {
        //istanbul ignore else
        if (
          element.item.assetmeterid === self.page.state.meterid ||
          element.item.locationmeterid === self.page.state.meterid
        ) {
          //istanbul ignore else
          if (userConfirmation) {
            self.page.state.rollOverData[index].dorollover = true;
          } else {
            self.page.state.rollOverData[index].dorollover = false;
            return;
          }
        }
      });
      this.page.state.meterid = undefined;
    }
  }

  /**
   * save new meter readings.
   * @param  {Object} changeObj changed meter object
   */
  async saveMeterReadings(changeObj) {
    let assetMeterDs = this.page.state.assetMeterData;
    let locationMeterDs = this.page.state.locationMeterData;
    WOUtil.saveMeterReadings(
      changeObj,
      this.app,
      assetMeterDs,
      locationMeterDs,
      this.page
    );
  }

  /**
   * invoke readings validation if user focus on the field.
   * @param {Object} event changed meter object
   */
  onFocusReadings(event) {
    //istanbul ignore else
    if (event.newreading) {
      this.validateMeterReadings({
        change: { object: event },
        newValue: event.newreading,
        datasource: {
          name: event.assetmeterid
            ? this.page.state.assetMeterData.name
            : this.page.state.locationMeterData.name,
        },
        item: {
          href: event.href,
          assetnum: event.assetnum,
          location: event.location,
          assetmeterid: event.assetmeterid,
          locationmeterid: event.locationmeterid,
        },
        dorollover: event.dorollover,
      });
    }
  }

  /**
   * Set the Log Type from the Lookup
   */
  async setWODetailsLogType(event) {
    this.page.state.WoDetailsDefaultLogType = event.value;
  }

  /** Function to open reserve material page.
   * @param event should contain
   * item - The Work Order selected.
   */
  async openReservedMaterials(event) {
    this.app.setCurrentPage({
      name: 'reserveMaterials',
      params: { href: event.item.href, wonum: event.item.wonum },
    });
    this.page.findDialog('slidingwodetailsmaterials')?.closeDialog();
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
  onUpdateDataFailed() {
    this.saveDataSuccessful = false;
  }

  /**
   * closing all dialogs of workorder detail page
   */
  _closeAllDialogs(page) {
    /* istanbul ignore else */
    if (page && page.dialogs && page.dialogs.length) {
      page.dialogs.map((dialog) => page.findDialog(dialog.name).closeDialog());
    }
  }

  /**
   * Handle Delete transaction
   */
  async handleDeleteTransaction(event) {
    //istanbul ignore else
    if (
      event.app === this.app.name &&
      (this.app.currentPage.name === this.page.name ||
        this.app.lastPage.name === this.page.name)
    ) {
      const woDetailResource = this.page.datasources['woDetailResource'];
      //See of the detail page's record is the same one that had the transaction deleted.
      /* istanbul ignore else */
      if (
        woDetailResource &&
        woDetailResource.currentItem &&
        woDetailResource.currentItem.href === event.href
      ) {
        let records = await woDetailResource.load({
          noCache: true,
          itemUrl: woDetailResource.currentItem.href,
        });

        //If no record was returned then the work order was removed so redirect the user to the schedule page.
        /* istanbul ignore else */
        if (!records || records.length === 0) {
          this._closeAllDialogs(this.page);
          const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
          this.app.setCurrentPage({ name: schPage, resetScroll: true });
        }
      } else if (
        this.app.currentPage.name !== this.page.name &&
        this.app.currentPage.getMainDatasource() &&
        this.app.currentPage.getMainDatasource().currentItem &&
        this.app.currentPage.getMainDatasource().currentItem.href === event.href
      ) {
        await this.app.currentPage
          .getMainDatasource()
          .load({ noCache: true, itemUrl: event.href });
      }

      let schedPage = this.app.findPage('schedule') || this.app.findPage("approvals");
      // istanbul ignore if
      if (schedPage) {
        schedPage.state.woItems = await this.app
          .findDatasource(schedPage.state.selectedDS)
          .forceReload();
      }
    }
  }

  validateMeterDate() {
    WOUtil.validateMeterDate(this.app, this.page, 'woMultiAssetLocationds');
  }

  validateMeterTime() {
    WOUtil.validateMeterTime(this.app, this.page, 'woMultiAssetLocationds');
  }

  /*
   * Opens Enter meter drawer for the corresponding workorder record.
   */
  async openEnterReadingDrawerDetail(event) {
    let assetMeterDs = this.app.findDatasource('woassetmeters');
    let locationMeterDs = this.app.findDatasource('wolocationmeters');

    await this.clearValues(assetMeterDs);

    await WOUtil.openEnterReadingDrawer(
      this.page,
      event.item,
      this.app.findDatasource('woDetailResource'),
      assetMeterDs,
      locationMeterDs,
      'update_meterReading_drawer_detail',
      event.readingType,
      this.app
    );
  }

  async clearValues(datasource) {
    datasource?.items?.forEach((value) => {
      if (value.newreading) {
        value.newreading = "";
        value.newreadingFlag = false;
      }
      datasource.clearWarnings(value, "newreading");
    });
  }
  /*
   * 
   Close the meter drawer
   */
  async closeUpdateMeterDialog(event) {
    let assetMeterDs = this.app.findDatasource("woassetmeters");
    this.page.state.useConfirmDialog = true;
    await this.clearValues(assetMeterDs);
  }

  /*
   * Handle the on blur event handle the validation
   */
  onFocusReadingsDetail(event) {
    //istanbul ignore else
    if (event.newreading) {
      let valType = typeof event.newreading;
      //istanbul ignore else
      if (valType === 'number') {
        this.page.state.disableSave = false;
        //setting flag to true before save
        this.validatemeter = true;
        //setting default rollover flag to false
        this.isRollover = false;
        this.validateMeterReadings({
          change: { object: event },
          newValue: event.newreading,
          datasource: {
            name: event.assetmeterid ? 'woassetmeters' : 'wolocationmeters',
          },
          item: {
            href: event.href,
            assetnum: event.assetnum,
            location: event.location,
            assetmeterid: event.assetmeterid,
            locationmeterid: event.locationmeterid,
          },
          dorollover: event.dorollover,
        });

        this.page.state.readingChangeInvoked = true;
      }
    }
  }

  /*
   * Save the meter data and close with update the data
   */
  async saveUpdateMeterDialogDetail() {
    let item = this.app.findDatasource('woDetailds').item;
    //istanbul ignore else
    if (!this.isRollover) {
      let assetNumData =
        item.asset && item.asset.length > 0
          ? item.asset[0].assetnum
          : undefined;
      let locationData = item.locationnum ? item.locationnum : undefined;

      //Call save on button click
      let assetMeterDs = this.app.findDatasource('woassetmeters');
      let locationMeterDs = this.app.findDatasource('wolocationmeters');

      //istanbul ignore if
      if (this.page.state.oldReading) {
        this.validateMeterDateDetail();
        this.validateMeterTimeDetail();
      }

      //istanbul ignore else
      if (
        !this.page.state.invalidDateTime &&
        !this.page.state.hasAnyReadingError
      ) {
        await WOUtil.saveMeterReadings(
          {},
          this.app,
          assetMeterDs,
          locationMeterDs,
          this.page
        );

        this.validatemeter = false;
        await WOUtil.closeUpdateMeterDialog(
          this,
          this.page,
          assetNumData,
          locationData,
          item.siteid,
          'update_meterReading_drawer_detail',
          this.app
        );
      }
    } else if (this.isRollover) {
      this.page.showDialog('rollOverDialogDetail');
      return;
    }
  }

   /*
   * clear new characterstic meter readings.
   */
   async clearCharacterMeterReaing(event){
       //istanbul ignore else
      if(event && event.item) {
        event.item["newreading"] = event.newreading;
      }
      WOUtil.enableDisableSaveBtn(this.page);
  }

  /*
   * Open meter lookup with new readings on the basis of meter domainid.
   */
  async openMeterLookupDetail(event) {
    let dnewreadingDS = this.app.findDatasource('dsnewreading');
    await WOUtil.openMeterLookup(
      this.page,
      event.item,
      dnewreadingDS,
      event.datasource,
      'meterReadingLookupDetail'
    );
  }

  /*
   * save new characterstic meter readings.
   */
  async saveCharactersticMeterReadingDetail(event) {
    //istanbul ignore else
    if (event) {
      //istanbul ignore else
      if (this.page.state.updateCharecteristicMeterReadingItem) {
        this.page.state.updateCharecteristicMeterReadingItem['newreading'] =
          event.value;
      }

      WOUtil.enableDisableSaveBtn(this.page);
    }
  }

  /**
   * Save rollover readings based on user confirmation.
   * @param {*} userConfirmation
   */
  async saveRollOverReadingsDetail(userConfirmation) {
    this.isRollover = false;
    //istanbul ignore else
    if (
      this.page.state.rollOverData &&
      this.page.state.rollOverData.length > 0
    ) {
      let self = this;
      self.page.state.rollOverData.forEach((element, index) => {
        if (
          element.item.assetmeterid === self.page.state.meterid ||
          element.item.locationmeterid === self.page.state.meterid
        ) {
          if (userConfirmation) {
            self.page.state.rollOverData[index].dorollover = true;
          } else {
            self.page.state.rollOverData[index].dorollover = false;
            return;
          }
        }
      });
      this.page.state.meterid = undefined;
    }
  }

  /*
   * Update the meter datasources after it saved and closed
   */
  async updateMeterDatasourcesDetail(inputData) {
    if (!Device.get().isMaximoMobile) {
      let wodetailsDS = this.app.findDatasource('woDetailds');
      await wodetailsDS.forceReload();
    }

    //istanbul ignore else
    if (inputData.assetNum) {
      let assetMeterDS = this.app.findDatasource('woassetmeters');
      await assetMeterDS.load();
    }

    //istanbul ignore else
    if (inputData.location) {
      let locationMeterDS = this.app.findDatasource('wolocationmeters');
      await locationMeterDS.load();
    }
  }

  /*
   * Validate the date
   */
  validateMeterDateDetail() {
    WOUtil.validateMeterDate(this.app, this.page, 'woassetmeters');
  }

  /*
   * Validate the time
   */
  validateMeterTimeDetail() {
    WOUtil.validateMeterTime(this.app, this.page, 'woassetmeters');
  }

  /*
   * Open Safety Drawer
   */
  async openHazardDrawer(event) {
    WOUtil.openWOHazardDrawer(this.app, this.page, event, 'wohazardDrawer');
  }

  /**
   * Review the safetyplan
   */
  async reviewSafetyPlan() {
    await WOUtil.reviewSafetyPlan(this.app);
    this.app
      .findDatasource('woDetailResource')
      .load({ noCache: true, itemUrl: this.page.params.href });
  }
  
  /**
   * Method to get the asset details and href of asset
   */
  async getAssetDetails() {
    const assetLookupDS = this.app.findDatasource('assetLookupDS');
    const woDetailResource = this.app.findDatasource('woDetailResource');

    try {
      await assetLookupDS.load();

      assetLookupDS.initializeQbe();
      assetLookupDS.setQBE('assetnum', '=', woDetailResource.item.assetnum);
      assetLookupDS.setQBE('siteid', '=', woDetailResource.item.siteid);
      let filteredDomainValues = await assetLookupDS.searchQBE();
      assetLookupDS.clearSelections();
      assetLookupDS.clearState();

      //istanbul ignore if
      if (filteredDomainValues.length > 0) {
        this.page.state.currentWOAssetHref = filteredDomainValues[0].href;
        this.page.state.assetAccess =
          this.page.state.currentWOAssetHref &&
          this.app.checkSigOption('ASSETMOBILE.READ');
      }
    } catch {
    } finally {
      //istanbul ignore next
      this.page.state.assetAccess =
        this.page.state.currentWOAssetHref &&
        this.app.checkSigOption('ASSETMOBILE.READ');
    }
  }

  /**
   * Method to navigate to asset details of asset app
   */
  async navigateToAssetDetails() {
    this.page.state.loadAssetData = true;
    const woDetailResource = this.app.findDatasource('woDetailResource');

    try {
      this.page.state.loadAssetData = false;
      //istanbul ignore else
      if (this.page.state.currentWOAssetHref) {
        let context = {
          page: 'assetDetails',
          assetnum: woDetailResource.item.assetnum,
          siteid: woDetailResource.item.siteid,
          href: this.page.state.currentWOAssetHref,
        };
        this.app.callController('loadApp', {
          appName: 'assetmobile',
          context,
        });
      }
    } catch {
    } finally {
      this.page.state.loadAssetData = false;
    }
  }

/**
   * Method to navigate to Calibration Pages
   */
  //istanbul ignore next
  navigateToCalibration(item) {
    if (item && item.wonum) {
      this.app.setCurrentPage({
        name: 'mobcaldslist',
        params: { wonum: item.wonum, href: item.href },
      });
    }
  }

}

export default WorkOrderDetailsController;
