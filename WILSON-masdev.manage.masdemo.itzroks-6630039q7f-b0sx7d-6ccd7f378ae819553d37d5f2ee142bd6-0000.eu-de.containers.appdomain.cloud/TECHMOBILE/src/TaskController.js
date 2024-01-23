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

import {Device} from '@maximo/maximo-js-api';
import SynonymUtil from './utils/SynonymUtil';
import WOUtil from './utils/WOUtil';
import commonUtil from "./utils/CommonUtil";
class TaskController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.page.state.inspectionAccess = this.app.checkSigOption('INSPECTION.READ');
  }

  /*
   * Method to open the task long desc dialog.
   */
  openTaskLongDesc(item) {
    if (item) {
      this.page.state.taskLongDesc = item.description_longdescription;
      this.page.showDialog('planTaskLongDesc');
      this.page.state.dialogOpend = true;
    }
  }

  // Method to retain the scroll position
  async getScrollPosition(){
    let scrollPosition = localStorage.getItem('scrollpos');
    if(localStorage && localStorage.getItem('scrollpos') && scrollPosition){
      window.scrollTo(0,scrollPosition);
      localStorage.removeItem('scrollpos');
    }
  }

  /**
   * Call validateMeterDate method of WOUtil
   */
  validateMeterDate(ds) {
    const hasValue = ds?.datasource?.item?.observation !== undefined || ds?.datasource?.item?.measurementvalue !== undefined
    if(!hasValue){ 
      WOUtil.validateMeterDate(this.app, this.page, "woPlanTaskDetailds", hasValue);
    }
  }

  /**
   * Call validatemeterTime method of WOUtil
   */
  validateMeterTime(ds) {
    const hasValue = ds?.datasource?.item?.observation !== undefined || ds?.datasource?.item?.measurementvalue !== undefined
    if(!hasValue){
      WOUtil.validateMeterTime(this.app, this.page, "woPlanTaskDetailds", false);
    }
  }

  /**
   * Computer current date of device
   * @param {*} item 
   * @returns current date of device
   */
  computedMeterCurDate(item) {
    item.computedMeterCurDate = new Date();      
    return item.computedMeterCurDate;
  }
  
  /**
   * compute current time of device
   * @param {*} item 
   * @returns computerd current time
   */
  computedMeterCurTime(item) {
    let date = new Date();
    item.computedMeterCurTime = date.getTime();    
    return item.computedMeterCurTime;
  }

  /**
   * on click of meter reading drawer item open slider and set necessary value of variour items
   * and show slider in case meter type if not assigned show error message
   * @param {*} event 
   */
  openMeterReadingDrawer(event) {
    if (event.item) {
      this.page.state.assetMeterHeader = `${(event?.item?.measurepoint?.assetnum || '')} ${(event.item?.measurepoint?.asset?.description || '')}`;
      this.page.state.disableSave = true;
      event.datasource.items[0]._selected = event.item.workorderid;
      this.page.showDialog("taskMeterChangeDialog", { parent: this.page }, event.item);
    }
  }

  /**
   * saveUpdateMeterDialog is async method which primary is used to submit task meter value
   * in case value doesn't exists it will update meter value and reload task api else it will
   * close meter reading slide drawer only
   */
  async saveUpdateMeterDialog() {
    const woPlanTaskDetailds = await this.app.findDatasource("woPlanTaskDetailds")
    const item = await this.app.findDatasource('woPlanTaskDetaildsSelected').item;
    if(!item.measurementvalue && !item?.observation) { // update meter value and reload
      item.measurementvalue = item.newreading;
      item.measuredate = this.combineDateTime(item.computedMeterCurDate, item.computedMeterCurTime);
      item.inspector = this.app.client.userInfo.personid;
      let meterType;
      if(item.measurepoint.meter.metertype_maxvalue ==='CHARACTERISTIC') {
        meterType = {observation: item.newreading};
      } else {
        meterType = {measurementvalue: item.newreading}
      };
      let meterReading = {
        taskid:item.taskid,
        measuredate: this.combineDateTime(item.computedMeterCurDate, item.computedMeterCurTime),
        inspector: this.app.client.userInfo.personid,
        href: item.href,
        workorderid: item.workorderid,
        ...meterType
      };
      let option = {
        responseProperties: 'status'
      };
      await woPlanTaskDetailds.put(meterReading, option);
      this.validatemeter = false;
      await WOUtil.closeUpdateMeterDialog(
        this,
        this.page,
        '',
        '',
        '',
        "taskMeterChangeDialog",
        this.app
      );
    } else { // meter value already exists close slider
      this.validatemeter = false;
      this.page.findDialog('taskMeterChangeDialog').closeDialog();
    }
  }


  /**
   * Function to inject time part into dateISO and return dateTime object.
   * For ex: dt = 2020-12-15T00:00:00.000+05:30, time = 2020-12-14T03:00:00.000+05:30
   * And it will return as 2020-12-15T03:00:00.000+05:30
   */
  combineDateTime(dateISO, timeISO, app) {
    let dataFormatter = (app) ? app.dataFormatter : this.app.dataFormatter;
    let date = dataFormatter.convertISOtoDate(dateISO);
    let time = dataFormatter.convertISOtoDate(timeISO);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    return date;
  }

  /*
   * Method to complete the task.
   */
  //istanbul ignore next
  async completeWoTask(record) {
    const isFlowControlled = this.app.findDatasource('woDetailds')?.item?.flowcontrolled;
    let item = record.taskItem;
    localStorage.setItem('scrollpos', window.scrollY);
    // istanbul ignore else
    if (item) {
      this.page.state.disableButton = true;
      this.page.state.completeLoading = true;
      this.page.state.currentTask = item.taskid;
      let statusData;

      if (record.directlyCompleteWoTask) {
        statusData = await SynonymUtil.getSynonymDomain(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', record.status);
      } else {
        statusData = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', record.status);
      }
      if (statusData) {
        let taskds = this.app.findDatasource('woPlanTaskDetailds');
        let workTypeDs = this.app.findDatasource("dsworktype");
        let woDetailds = this.app.findDatasource("woDetailds");
        let woTasklist = await this.getWoTask(taskds.items, item, statusData);
        let task = {
          parameters: {
            status: statusData.value
          },
          record: {href: item.localref},
          responseProperties: 'status,status_maxvalue,workorderid',
          localPayload: {
            woactivity: [{
              href: item.href,
              status: statusData.value,
              status_maxvalue: statusData.maxvalue,
              status_description: statusData.description,
              workorderid: item.workorderid
            }],
            href: taskds.dependsOn.currentItem.href
          },
          waitForUpload: true
        };

        let incompTaskCount = [];
        let isMobile = Device.get().isMaximoMobile;
        // istanbul ignore else
        if (woTasklist && woTasklist.length && isFlowControlled && isMobile) {
          task.localPayload["woactivity"] = woTasklist;
          let lastTask = woTasklist.filter(item => item.taskid && item.status_maxvalue !== 'CLOSE' && item.status_maxvalue !== 'CAN' && item.status_maxvalue !== 'COMP');
          let workType = workTypeDs.items.filter(
            (item) => item.worktype === woDetailds.item.worktype
          );
          
          let defaultComp = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', 'WOSTATUS|COMP');
          if (!lastTask.length) {
            task.localPayload.status = workType.length && workType[0].completestatus ? workType[0].completestatus : defaultComp.value;
            task.localPayload.status_maxvalue =  workType.length && workType[0].completestatus ? workType[0].completestatus_maxvalue : defaultComp.maxvalue;
            task.localPayload.status_description =  workType.length && workType[0].completestatus ? workType[0].completestatus_description : defaultComp.description;
          }
        }
        try {
          let response = await taskds.invokeAction('changeStatus', task);

          if (response && Array.isArray(response) && response.length > 0) {
            response = response[0]._responsedata;
          }

          if (response) {
            item.status_maxvalue = response.status_maxvalue;

            if (taskds && taskds.items) {
              taskds.items.forEach((item) => {
                let status = item.status_maxvalue;
                if (item.taskid && status !== 'CLOSE' && status !== 'CAN' && status !== 'COMP') {
                  incompTaskCount.push(item._rowstamp);
                }
              });
            }

            if (incompTaskCount.length >= 1) {
              if (!this.app.state.networkConnected && Device.get().isMaximoMobile && incompTaskCount.length === 1) {
                this.page.state.itemToOpen = item.workorderid;
              } else {
                this.page.state.itemToOpen = '';
              }
              taskds.clearState();
              await woDetailds.load({noCache: true, itemUrl: this.page.params.href});
              await taskds.load();
              await this.getScrollPosition();
            }
            /* istanbul ignore else */
            if(!incompTaskCount.length) {
              await taskds.forceReload();
              this.page.state.itemToOpen = '';
              this.page.state.doneButtonDisabled = false;
            }
            const schPage = this.app.findPage("schedule") || this.app.findPage('approvals');
            let SchedulePageDS = this.app.findDatasource(schPage.state.selectedDS);
            if (SchedulePageDS) {
              await SchedulePageDS.forceReload();
            }

          }
        }catch (err) {
          //handle error
        }
      } else {
        this.app.toast(
          this.app.getLocalizedLabel(
            'fail_get_synonym',
            `Can not get the synonym data for WOSTATUS`,
            ['WOSTATUS']
          ),
          'error'
        );  
      }
      this.page.state.disableButton = false;
      this.page.state.completeLoading = false;
    }
  }

  /**
   * Method to navigate to asset details of asset app
   */
  async redirectToAssetDetails(item) {
    this.page.state.loadAssetData = true;
    try {
      this.page.state.loadAssetData = false;
      //istanbul ignore if
      if (item?.item?.href) {
        const context = {
          page: 'assetDetails',
          assetnum: item.item?.assetnum,
          siteid: this.page.state.currentAssetSite,
          href: item.item?.href,
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
   * Rediret user to report page or WODetails page base on
   * system property value of maximo.mobile.gotoreportwork
   */
  async redirectToWODetailsOrReport() {
    const woDetail = await this.app.findDatasource('woDetailResource');
    const redirctToReportAllowed = this.app.state.systemProp && parseInt(this.app.state.systemProp['maximo.mobile.gotoreportwork']);
    if(redirctToReportAllowed) {
      this.redirectToReportPage(woDetail.item);
    } else {
      this.app.setCurrentPage({name: 'workOrderDetails'});
    }
  }

  /**
   * 
   * @param {item} item of selected work order in detail page 
   */
  async redirectToReportPage(item) {
    this.app.setCurrentPage({ 
      name: 'report_work', 
      params: { 
        wonum: item.wonum, 
        itemhref: item.href, 
        worktype: item.worktype, 
        istask: item.istask,
        wogroup: item.wogroup,
        taskid: item.taskid
      } 
    });
    // istanbul ignore else
    if(this.app && this.app.currentPage) {
      this.page.state.navigateToReportWork = true;
    }
  }
  /**
   * function return tasks from workorder.
   * @param {taskLIst} is tasklist ds.
   * @param {selectedItem} is selected task object.
   * @param {selectedStatus} is changed item object.
   */
  async getWoTask(taskList, selectedItem, selectedStatus) {
    const isFlowControlled = this.app.findDatasource('woDetailds')?.item?.flowcontrolled;
    let workTypeDs = this.app.findDatasource("dsworktype");
    let woDetailds = this.app.findDatasource("woDetailds");
    let woWorkType = woDetailds.item.worktype;
    let workType = [];
    let woTaskList = [];
    let initialStatus = 'INPRG';
    /* istanbul ignore else */
    if(woWorkType) {
      workType = workTypeDs.items.filter(
        (item) => item.worktype === woDetailds.item.worktype
      );
    }
    let workTypeStartMaxVal = workType && workType.length && workType[0].startstatus ? workType[0].startstatus_maxvalue : /* istanbul ignore next */'';
    /* istanbul ignore next */
    if(workTypeStartMaxVal === 'APPR' || workTypeStartMaxVal === 'WSCH' || workTypeStartMaxVal === 'WMATL' || workTypeStartMaxVal === 'INPRG') {
      initialStatus = workType[0].startstatus;
    }

    let INPRGStatus = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', `WOSTATUS|${initialStatus}`);
    /* istanbul ignore else */
    if(taskList.length){
      const tempTaskList = taskList.map((item) => {
        /* istanbul ignore else */
        if(item.taskid) {
          /* istanbul ignore else */
          if(item.taskid === selectedItem.taskid) {
            return {
              ...item, 
              status: selectedStatus.value, 
              status_maxvalue : selectedStatus.maxvalue,
              status_description : selectedStatus.description
            };
          } else {
            return {
              ...item, 
              status: item.status, 
              status_maxvalue : item.status_maxvalue,
              status_description : item.status_description
            };
          }          
        }
        return item
      });

      woTaskList = tempTaskList.map((item) => {
        /* istanbul ignore else */
        if(item.taskid) {
          /* istanbul ignore next */
          if(isFlowControlled && item.predessorwos && item.taskid && item.taskid !== selectedItem.taskid) {
            let isComplitedPredessor =  this.app.callController('validatePredessor',tempTaskList,item);
            let setStatus = isComplitedPredessor && (workTypeStartMaxVal !== 'CAN' && workTypeStartMaxVal !== 'WAPPR');
            return {
              ...item, 
              status: setStatus ? INPRGStatus.value : item.status, 
              status_maxvalue : setStatus ? INPRGStatus.maxvalue : item.status_maxvalue,
              status_description : setStatus ? INPRGStatus.description : item.status_description
            };
          } else {
            return {
              ...item, 
              status: item.status, 
              status_maxvalue : item.status_maxvalue,
              status_description : item.status_description
            };
          }        
        }
        return item
      });
    }
    return woTaskList;
  }

  /**
   * Method invoked whenever page is visited. Check if maximoMobile will filter datasource with QBE approach.
   * @param {Object} page 
   * @param {Object} app 
   */
  async pageResumed(page, app) {
    page.state.loadingTasks = true;
    let pageTitle = app.callController('updatePageTitle', {page: page, label: 'tasks_title', labelValue: 'Tasks'});
    //istanbul ignore next
    if (!pageTitle) { // If title return null or empty then retrying to fetch title again because app load takes time in appController
      window.setTimeout(() => {
        pageTitle = app.callController('updatePageTitle', {page: page, label: 'tasks_title', labelValue: 'Tasks'});
        page.state.pageTitle = pageTitle;
      }, 1);
    } else { // If title return value then set to state
      page.state.pageTitle = pageTitle;
    }
    page.state.inspectionAccess = app.checkSigOption('INSPECTION.READ');
    let device = Device.get();
    page.state.itemToOpen = '';
    let woDetailds = app.findDatasource('woDetailds');

    //istanbul ignore next
    if(woDetailds.items.length === 0){
      await woDetailds.load({noCache: true, itemUrl: page.params.href});
    }

    this.page.state.doneButtonDisabled = true;
    /* istanbul ignore else */
    if(!app.state.taskCount) {
      this.page.state.doneButtonDisabled = false;
    }
    page.state.workorder = woDetailds.item;

    let taskDataSource = app.findDatasource('woPlanTaskDetailds'); 

    if (device.isMaximoMobile) {
      let externalStatusList = await SynonymUtil.getExternalStatusList(app, ['INPRG', 'WAPPR', 'WMATL', 'APPR', 'WSCH', 'WPCOND', 'COMP']);
      await taskDataSource.initializeQbe();
      taskDataSource.setQBE('status', 'in', externalStatusList);
      await taskDataSource.searchQBE(undefined, true);
    }
    else{
      await taskDataSource.forceReload();
    }

    //istanbul ignore next
    if(app.state.incomingContext && taskDataSource.items.length === 0) {
      woDetailds = app.findDatasource('woDetailds');
      if (this.app.state.refreshOnSubsequentLogin !== false) {
        await woDetailds.forceSync();
      }
      await taskDataSource.forceReload();
      if(taskDataSource.items.length === 0) {
        let errorMessage = 'This record is not on your device. Try again or wait until you are online.';
        page.error(
          this.app.getLocalizedLabel("record_not_on_device", errorMessage)
        );
      }
    }  
    
    if(this.app.checkSigOption('ASSETMOBILE.READ') && woDetailds?.item?.assetnum !== taskDataSource?.item?.assetnum){
      await this.getTaskAssetsHref(page.state.itemToOpen,taskDataSource,woDetailds);
    }
     this.page.state.loadingTasks = false;
  }

  /*
   * Method to open task status lookup from task page:
   */
  async openChangeStatusDialog(event) {
    let statusArr = [];
    const workTypeDs = this.app.findDatasource("dsworktype");
    const woDetailds = this.app.findDatasource("woDetailds");
    const taskds = this.app.findDatasource('woPlanTaskDetailds');
    const woWorkType = woDetailds.item.worktype;
    let workType = [];
    const isFlowControlled = this.app.findDatasource('woDetailds')?.item?.flowcontrolled;
    /* istanbul ignore else */
    if(woWorkType) {
      workType = workTypeDs.items.filter(
        (item) => item.worktype === woWorkType
      );
    }

    statusArr = await commonUtil.getOfflineAllowedStatusList(this.app, event, false);
    this.page.state.disableDoneButton = true;
    this.page.state.selectedTaskItem = event.item;
    let statusLstDS = this.page.datasources["taskstatusDomainList"];
    statusLstDS.clearSelections();

    // istanbul ignore else
    if(isFlowControlled) {
      let filterValues= []
      let maxVal = event.item.status_maxvalue;
      let workTypeStartMaxVal = workType && workType.length && workType[0].startstatus ? workType[0].startstatus_maxvalue : /* istanbul ignore next */'';
      let isAllPredessorComp = true;
      // istanbul ignore else
      if(event.item.predessorwos && maxVal !== 'COMP') {
        isAllPredessorComp = this.app.callController('validatePredessor', taskds.items, event.item);
      }
      /* istanbul ignore else */
      if(!woWorkType) {
        // istanbul ignore else
        if (maxVal !== 'COMP') {
          filterValues = ['WAPPR']
        }
        
        // istanbul ignore else
        if(maxVal === 'INPRG') {
          filterValues = ['WMATL', 'WAPPR']; 
        }
      } else if(woWorkType && workType && workType.length) {
        // istanbul ignore else
        if(workTypeStartMaxVal) {
          // istanbul ignore else
          if(workTypeStartMaxVal === 'APPR' || workTypeStartMaxVal === 'WMATL' || workTypeStartMaxVal === 'WSCH') {
            filterValues = ['WAPPR'];
            
            // istanbul ignore else
            if(!isAllPredessorComp) {
              filterValues = ['WAPPR','INPRG', 'WMATL', 'COMP', 'APPR', 'CLOSE', 'WSCH'];
            }
          }

          // istanbul ignore else
          if(workTypeStartMaxVal === 'INPRG' && (!isAllPredessorComp || (maxVal !== 'INPRG' && maxVal !== 'COMP'))) {
            filterValues = ['CLOSE', 'COMP', 'INPRG'];
          } else if(workTypeStartMaxVal === 'INPRG' && maxVal === 'INPRG') {
            filterValues = ['WMATL', 'WAPPR'];
          }
        }
      }
      /* istanbul ignore else */
      if(filterValues && filterValues.length) {
        statusArr = statusArr.filter(item => filterValues.indexOf(item.maxvalue) === -1);
      }
    }

    await statusLstDS.load({ src: statusArr, noCache: true });
    this.page.showDialog("taskStatusChangeDialog", { parent: this.page });
  }

  /*
   * Method to change the task status:
   */
  async changeWoTaskStatus() {
    let record = {
      taskItem: this.page.state.selectedTaskItem,
      status: `WOSTATUS|${this.page.state.selectedTaskStatus.value}`,
      directlyCompleteWoTask :false
    }
    try {
      await this.completeWoTask(record);
    } catch (error) {
      
    } finally {
      this.page.findDialog("taskStatusChangeDialog").closeDialog();
    }
  }

  /**
   * reload woPlanTaskDetailds on call of this method
   */
  async updateMeterDatasources() {
    let wodetailsDS = this.app.findDatasource("woPlanTaskDetailds");
    await wodetailsDS.forceReload();
  }

  /**
   * save value of Characterstic Meter and 
   * if updateCharecteristicMeterReadingItem is not defined let's define as empty array
   * @param {*} event if event exists as parameter
   */
  async saveCharactersticMeterReading(event) {
    //istanbul ignore else
    if (event) {
      if(!this.page.state.updateCharecteristicMeterReadingItem) {
        this.page.state.updateCharecteristicMeterReadingItem = [];
      }
      this.page.state.updateCharecteristicMeterReadingItem["newreading"] = event.value;
      const plantask = await this.page.findDialog('taskMeterChangeDialog').datasources['woPlanTaskDetaildsSelected']
      plantask.item['newreading'] = event.value;
      WOUtil.enableDisableSaveBtn(this.page);
    }
  }

  /**
  * Validate before closing sliding drawer.
  * @param {validateEvent} validateEvent
  */
  taskMeterChangeValidate(validateEvent) {
    if (!this.page.state.disableSave) {
      validateEvent.failed = true;
      this.page.showDialog('saveDiscardTaskMeter');
    } else {
      validateEvent.failed = false;
    }
  }

  /**
  * Call on click of discard prompt.
  */
  //istanbul ignore next
  async closeTaskMeter() {
    this.page.findDialog('taskMeterChangeDialog').closeDialog();
  }

  /**
  * Validate before closing sliding drawer.
  * @param {validateEvent} validateEvent
  */
  taskMeterLocChangeValidate(validateEvent) {
    if (!this.page.state.disableSave) {
      validateEvent.failed = true;
      this.page.showDialog('saveDiscardTaskAssetLocMeter');
    } else {
      validateEvent.failed = false;
    }
  }

  /**
  * Call on click of discard prompt.
  */
  //istanbul ignore next
  closeTaskAssetLocMeter() {
    this.page.findDialog('update_taskMeterReading_drawer_detail').closeDialog();
  }


  /**
 * on click of meter reading drawer item open slider and set necessary value of variour items
 * and show slider in case meter type if not assigned show error message
 * @param {*} event 
 */
  async openTaskMeterReadingDrawer(event) {
    const self = this;
    // istanbul ignore else
    if (event?.item) {
      const woPlanTaskDs = await this.app.findDatasource('tasklistMeterds');
      await woPlanTaskDs.initializeQbe();
      woPlanTaskDs.setQBE('taskid', '=', event.item?.taskid);
      const response = await woPlanTaskDs.searchQBE(undefined, true);

      // istanbul ignore else
      if (response) {
        const activeassetmeterData = woPlanTaskDs.getChildDatasource(
          'activeassetmeter',
          event.item,
          { idAttribute: 'assetmeterid' }
        );
        const assetMeterItems = await activeassetmeterData.load();
        assetMeterItems.forEach(function (item) {
          WOUtil.computedReading(item, self.app);
        });
        this.page.state.assetMeterData = activeassetmeterData;

        const activelocationmeterData = woPlanTaskDs.getChildDatasource(
          'activelocationmeter',
          event.item,
          { idAttribute: 'locationmeterid' }
        );
        const locationMeterItems = await activelocationmeterData.load();
        locationMeterItems.forEach(function (item) {
          WOUtil.computedReading(item, self.app);
        });
        this.page.state.locationMeterData = activelocationmeterData;
      }

      this.page.state.assetMeterHeader = WOUtil.getAssetName(event.item);
      this.page.state.locationMeterHeader = WOUtil.getLocationName(event.item);
      this.page.state.disableSave = true;
      this.page.state.selectedTaskId = event.item.taskid;
      await this.page.showDialog("taskMeterReadingDrawer", { parent: this.page }, event);
    }
  }

  /*
   * Opens Enter meter drawer for the corresponding task of work order.
   */
  async openEnterTaskReadingDrawer(event) { 
    const woPlanTaskDetailds = await this.app.findDatasource("tasklistMeterds")
    const item = woPlanTaskDetailds.items.find(item => item.taskid === this.page.state.selectedTaskId);
    const assetMeterDs = this.page.state.assetMeterData;
    const locationMeterDs = this.page.state.locationMeterData;

    await WOUtil.openEnterReadingDrawer(
      this.page,
      item,
      this.app.findDatasource('woPlanTaskDetailds'),
      assetMeterDs,
      locationMeterDs,
      'update_taskMeterReading_drawer_detail',
      event.readingType,
      this.app
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
   * invoke readings validation if user focus on the field.
   * @param {Object} event changed meter object
   */
  onFocusReadings(event) {
    //istanbul ignore else
    if (event.newreading) {
      const valType = typeof event.newreading;
      if (valType === 'number') {
        this.page.state.disableSave = false;
        //setting flag to true before save
        this.validatemeter = true;
        //setting default rollover flag to false
        this.isRollover = false;
        WOUtil.validateMeterReadings({
          change: { object: event },
          newValue: event.newreading,
          datasource: {
            name: event.assetmeterid? "cds_tasklistMeterds.activeassetmeter" : "cds_tasklistMeterds.activelocationmeter"
          },
          item: {
            href: event.href,
            assetnum: event.assetnum,
            location: event.location,
            assetmeterid: event.assetmeterid,
            locationmeterid: event.locationmeterid,
          },
          dorollover: event.dorollover,
        }, this);
        this.page.state.readingChangeInvoked = true;
      }
    }
  }

  /**
  * clear new characterstic meter readings.
  * @param {event} event return meter reading item with new reading
  */
  async clearCharacterMeterReaing(event){
    //istanbul ignore else
    if(event && event.item) {
      event.item["newreading"] = event.newreading;
    }
    WOUtil.enableDisableSaveBtn(this.page);
  }

  /**
  * Open meter lookup with new readings on the basis of meter domainid.
  * @param {event} event Lookup selection event
  */
  async openMeterTaskLookupDetail(event) {
    const dnewreadingDS = this.app.findDatasource('dsnewreading');
    await WOUtil.openMeterLookup(
      this.page,
      event.item,
      dnewreadingDS,
      event.datasource,
      'taskMeterReadingLookupDetail'
    );
  }


  /*
  * Save the meter data and close with update the data
  */
  async saveUpdateTaskMeterDialogDetail() {
    const woPlanTaskDs = await this.app.findDatasource("tasklistMeterds");
    const item = woPlanTaskDs.items.find(item => item.taskid === this.page.state.selectedTaskId);
    // istanbul ignore else
    if (!this.isRollover) {
      const assetNumData = item?.assetnum || undefined;
      const locationData = item?.location || undefined;
      const assetMeterDs = this.page.state.assetMeterData;
      const locationMeterDs = this.page.state.locationMeterData;

      // istanbul ignore next
      if (this.page.state.oldReading) {
        WOUtil.validateMeterDate(this.app, this.page, 'tasklistMeterds');
        WOUtil.validateMeterTime(this.app, this.page, 'tasklistMeterds');
      }

      // istanbul ignore next
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
          'update_taskMeterReading_drawer_detail',
          this.app
        );

        await this.app.findDatasource("woassetmeters").forceReload();
        await this.app.findDatasource("wolocationmeters").forceReload();
      }
    } else if (this.isRollover) {
      this.page.showDialog('taskRollOverDialogDetail');
      return;
    }
  }

  /**
   * Smart input on value changed handler
   */
  async onValueChanged(changeObj) {
    if (changeObj.datasource.name === 'woPlanTaskDetaildsSelected') {
      // istanbul ignore else
      if (changeObj.field === "newreading") {
        this.page.state.disableSave = true;
        this.validateMeterDate();
        this.validateMeterTime();
        const valType = typeof changeObj.newValue;
        // istanbul ignore else
        if (valType === "number" && changeObj.newValue) {
          //setting flag to true before save
          this.validatemeter = true;
          //setting default rollover flag to false
          this.isRollover = false;
          this.page.state.disableSave = this.page.state.taskMeterDialogInit;
        } else if (valType === "string" && !changeObj.newValue) {
          await WOUtil.popMeterReadingErrors(changeObj, this.page);
        } else {
          this.page.state.disableSave = true;
          this.page.state.useConfirmDialog = true;
        }
      }
    } else {
      if (
        this.page.state.useConfirmDialog &&
        (changeObj.field?.indexOf('computedMeterCurDate') > -1 ||
          changeObj.field?.indexOf('computedMeterCurTime') > -1)
      ) {
        this.page.state.useConfirmDialog = true;
      } else {
        this.page.state.useConfirmDialog = false;
      }
  
      // istanbul ignore else
      if (changeObj.field === 'statuschangedate') {
        this.validateDownTimeDate();
      }
      // istanbul ignore else
      if (
        changeObj.field === 'newreading' ||
        changeObj.field?.indexOf('newreading') > -1
      ) {
        let valType = typeof changeObj.newValue;
        // istanbul ignore else
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
  
        const assetMeterds = this.page.state.assetMeterData;
        const locationMeterDs = this.page.state.locationMeterData;
        let hasAssetAnyNewReading = false;
        let hasAnyNewReading = false;
        let hasLocationAnyNewReading = false;
  
        // istanbul ignore else
        if (this.page.state.drawerName !== 'update_taskMeterReading_drawer_detail') {
          // istanbul ignore else
          if (assetMeterds && assetMeterds.items) {
            hasAssetAnyNewReading = assetMeterds.items.some(
              (item) => item.newreading
            );
          } else if (locationMeterDs && locationMeterDs.items) {
            hasLocationAnyNewReading = locationMeterDs.items.some(
              (item) => item.newreading
            );
          }
  
          hasAnyNewReading = hasAssetAnyNewReading || hasLocationAnyNewReading;
        }
  
        // istanbul ignore if
        if (changeObj.datasource.name === 'woPlanTaskDetailds') {
          let assetMeterNewReading = false;
          let locationMeterNewReading = false;
          // istanbul ignore else
          if (this.page.state.assetMeterData.items.length > 0) {
            assetMeterNewReading = this.page.state.assetMeterData.items.some(
              (item) => item.newreading
            );
          } else if (this.page.state.locationMeterData.items.length > 0) {
            locationMeterNewReading = this.page.state.locationMeterData.items.some(
              (item) => item.newreading
            );
          }
  
          hasAnyNewReading = assetMeterNewReading || locationMeterNewReading;
        }
        // istanbul ignore if
        if (hasAnyNewReading) {
          await WOUtil.enableDisableSaveBtn(this.page);
          this.page.state.useConfirmDialog = true;
        } else {
          this.page.state.useConfirmDialog = false;
        }
  
        // istanbul ignore if
        if (hasAnyNewReading && !this.page.state.hasAnyReadingError) {
          this.page.state.readingChangeInvoked = false;
        } else {
          this.page.state.disableSave = true;
        }

        // istanbul ignore if
        if (this.page.state.newReading) {
          let date;
          // istanbul ignore else
          if (changeObj.item.activeassetmeter) {
            const activeAssetMeter = changeObj.item.activeassetmeter;
    
            // istanbul ignore next
            if (Array.isArray(activeAssetMeter)) {
              const assetMtr = activeAssetMeter.filter(
                (item) =>
                  item.newreading &&
                  item.assetmeterid === changeObj.change.object.assetmeterid
              );
    
              // istanbul ignore else
              if (
                assetMtr &&
                assetMtr[0] &&
                changeObj.newValue !== assetMtr[0].computedMeterCurDate
              ) {
                changeObj.oldValue = changeObj.newValue;
                date = new Date();
                const assetdtobj = {};
                assetdtobj.computedMeterCurDate = date;
                assetdtobj.computedMeterCurTime = date;
                Object.assign(assetMtr[0], assetdtobj);
              }
            }
          }
    
          // istanbul ignore else
          if (changeObj.item.activelocationmeter) {
            const activeLocationMeter = changeObj.item.activelocationmeter;
    
            // istanbul ignore next
            if (Array.isArray(activeLocationMeter)) {
              const locMtr = activeLocationMeter.filter(
                (item) =>
                  item.newreading &&
                  item.locationmeterid === changeObj.change.object.locationmeterid
              );
    
              // istanbul ignore else
              if (
                locMtr &&
                locMtr[0] &&
                changeObj.newValue !== locMtr[0].computedMeterCurDate
              ) {
                date = new Date();
                const locationdtobj = {};
                locationdtobj.computedMeterCurDate = date;
                locationdtobj.computedMeterCurTime = date;
                Object.assign(locMtr[0], locationdtobj);
              }
            }
          }
        }
      }
    }
  }

   /**
   * function to find and set asset href for selected workorder task.
   * @param {itemOpen} is selected work order.
   * @param {taskDs} is selected workorder task DS.
   * @param {woDetailsDs} is selected workorder DS.
   */
   async getTaskAssetsHref(itemOpen,taskDs,woDetailsDs){
    for(let i = 0; i<taskDs.items.length;i++){
       // istanbul ignore else
      if(taskDs.items[i]?.assetnum !== woDetailsDs?.item?.assetnum){

        this.page.state.currentAssetNum = taskDs.items[i].assetnum;
        this.page.state.currentAssetSite = taskDs.items[i]?.siteid;
        const assetListDS = this.app.findDatasource('assetLookupDS');

        await assetListDS?.initializeQbe();
        assetListDS?.setQBE('assetnum',this.page.state.currentAssetNum);
        assetListDS?.setQBE('siteid',this.page.state.currentAssetSite);
        const filteredAsset = await assetListDS?.searchQBE();
        //istanbul ignore if
        if(filteredAsset?.[0]?.href){
          taskDs.items[i].hasHref = true;
          taskDs.items[i].href = filteredAsset[0].href;
          this.page.state.currentTaskId =taskDs.items[i]?.taskid;
          this.page.state.assetAccess = filteredAsset[0]?.href;
        }else{
          taskDs.items[i].hasHref = false;
        }
       }
      }
    }

}

export default TaskController;
