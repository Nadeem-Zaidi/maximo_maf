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

/* eslint-disable no-console */
import {log, Device, AppSwitcher, MASAPI} from '@maximo/maximo-js-api';
import MaximoMapConfigurationLoader from "@maximo/map-component/build/ejs/framework/loaders/MaximoMapConfigurationLoader";
import MapConfigurationLoader from "@maximo/map-component/build/ejs/framework/loaders/MapConfigurationLoader";
import StorageManager from "@maximo/map-component/build/ejs/framework/storage/StorageManager";
import LocalStorageManager from "@maximo/map-component/build/ejs/framework/storage/LocalStorageManager";
import FileSystemStorageManager from "@maximo/map-component/build/ejs/framework/storage/FileSystemStorageManager";
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';
import {Browser} from '@maximo/maximo-js-api/build/device/Browser';
import SynonymUtil from "./utils/SynonymUtil";
import DisconnectedFactory from '@maximo/maximo-js-api/build/platform/anywhere/schemas/DisconnectedSchemaFactory';
import commonUtil from "./utils/CommonUtil";
const TAG = 'TechnicianApp';

const isHumaiDebugMode=localStorage.getItem("humai_debug")==="true"

class AppController {
  applicationInitialized(app) {
    this.app = app;
    // Check if login user has permission to access Assist
    if (sessionStorage.getItem('isEamApp') === 'false'||isHumaiDebugMode) {   
      this.checkAssistPermission();
    }
    //istanbul ignore else
    if (Device.get().isMaximoMobile) {
      try {
        DisconnectedFactory.get().createIndex('MXAPIFAILURELIST', ['failurelist']); 
        DisconnectedFactory.get().createIndex('MXAPIFAILURELIST', ['parent', 'type']);
      } catch (e) {
        //Do nothing
        //istanbul ignore next
        log.e(TAG, 'Error creating indexes ', e);
      }
    }
    // Update the Default Map Configuration Loader
    MapConfigurationLoader.setImplementation(MaximoMapConfigurationLoader);
    if (Device.get().isMaximoMobile) {
			//Update the Default Storage Manager
			StorageManager.setImplementation(FileSystemStorageManager);
		} else {
			//Update the Default Storage Manager
			StorageManager.setImplementation(LocalStorageManager);
    }
    //istanbul ignore next
    try {
      this.mapPreloadAPI = new MapPreLoadAPI();
      //istanbul ignore next
      this.mapPreloadAPI.validateMapConfiguration(this.app)
      .then((validMapConfiguration) => {
        this.app.state.isMapValid = validMapConfiguration;
      })
      .catch( error => {
        this.app.state.isMapValid = false
        log.t(TAG, 'validateMapConfiguration: ', error);
      });
    } catch(error) {
      log.t(TAG, error);
    }
       
    this.setupIncomingContext();    
    // Going back to wolist page from wodetail page
    this.app.on('page-changed', (nextPage, prevPage) => {
      if (prevPage.name === 'workOrderDetails' && nextPage.name === 'schedule' && nextPage.state.previousPage === 'schedulecardlist' && nextPage.state.mapOriginPage === 'wodetail') {
        nextPage.callController("openPrevPage");
      }

      //Going Back to Follow Up WO from the Save Discard Dailog
      if (prevPage.name === 'relatedWorkOrder' && nextPage.name === 'schedule' && nextPage.resumed === true) {
        if(nextPage.state.previousPage === ""){
          nextPage.resumed = false;
          nextPage.state.previousPage = 'workOrderDetails';
          this.app.setCurrentPage({name: 'relatedWorkOrder', resetScroll: true, params: {itemhref: prevPage.params.itemhref}});
        }else{
          nextPage.state.previousPage = '';
        }
      }

       // Going back to woEditDetailsPage from schedule page on Discard
       if (prevPage.name === 'woedit' && nextPage.name === 'schedule') {
        this.app.setCurrentPage({
          name: "workOrderDetails",
          resetScroll: true,
          params: {
            wonum: prevPage.params.workorder.wonum,
            href: prevPage.params.workorder.href,
            siteid: prevPage.params.workorder.siteid
          }
        });
    }

      //istanbul ignore if
      if (prevPage.name === 'report_work' && nextPage.name === 'reserveMaterials' && prevPage.state.openedFrom !== 'reportwork') {
        this.app.setCurrentPage({name: 'workOrderDetails'});
        this.app.state.openedFrom = 'reportwork';
      }
    });
    // Open schedule page from navigator and set default state
    this.app.on('page-changing', (nextPage, prevPage) => {
      if (prevPage.name === 'schedule' && nextPage.name === 'schedule') {
        nextPage.callController('setDefaults');
      }
      if(prevPage.name === 'workOrderDetails') {
        prevPage.state.assetToOpen = '';
      }
    });

    if(isHumaiDebugMode){
      const switcher = AppSwitcher.get();
      switcher.registerApplication(
          'humai',
          'humai',
          'http://localhost:3000/#/'
      );
    }
    if (!this.app.device.isMaximoMobile) {
      commonUtil.getOfflineStatusList(app, app.client.userInfo.insertOrg, app.client.userInfo.insertSite);
    }
  }

  onContextReceived() {
    this.setupIncomingContext()
  }

  navigationItemClicked(item) {
    log.t(TAG, 'Clicked item', item);
    this.app.setCurrentPage({name: 'schedule'});
  }

  openMaterialsPage() {
    this.app.setCurrentPage({name: 'materials'});
  }

  /**
   * Get external value on the basis of internal value.
   */
  _getStatusExternalValue(statusArr, internalValue) {
    let externalValue;
    // istanbul ignore else
    if (statusArr && statusArr.length && internalValue) {
      for (let i = 0; i < statusArr.length; i++) {
        // istanbul ignore else
        if (statusArr[i].defaults && statusArr[i].maxvalue === internalValue) {
          externalValue = statusArr[i].value;
          break;
        }
      }
    }
    return externalValue;
  }

  /**
   * Build workorder staus list from allowed state.
   */
  _buildWoStatusSet(allowedStates) {
    let statusArr = [];
    if (allowedStates) {
      Object.entries(allowedStates).forEach(([key, value]) => {
        // istanbul ignore else
        if (value) {
          value.forEach((statValue) => {
            statusArr.push({
              id: statValue.value,
              value: statValue.value,
              description: statValue.description,
              defaults: statValue.defaults,
              maxvalue: statValue.maxvalue,
              _bulkid: statValue.value
            });
          });
        }
      });
    }
    return statusArr;
  }

  /**
    * @description update page title dynamically get value of worktype and wonum from url parameter
    * @param  {parameters} parameters parameters object contains object of page, label and labelValue
    */
  updatePageTitle (parameters) {
    const wonum = parameters.page.params.wonum || "";
    let pageTitle = '';
    if (parameters.page.params.istask && parameters.page.params.wogroup) {
      pageTitle = this.app.getLocalizedLabel(
        'wotask_' + parameters.label,
        `${parameters.page.params.wogroup}-${parameters.page.params.taskid} ${parameters.labelValue}`,
        [parameters.page.params.wogroup, parameters.page.params.taskid]
      );
    } else {
      pageTitle = this.app.getLocalizedLabel(
        parameters.label,
        `${wonum} ${parameters.labelValue}`,
        [wonum]
      );
    }
    return pageTitle;    
  }

    /**
   * Sets incoming context to navigate to workorder details page as per provided params
   */
  setupIncomingContext() {
    const incomingContext = this.app && this.app.state && this.app.state.incomingContext;
    
    if (incomingContext && incomingContext.editTrans) {
      incomingContext.page  = 'workOrderDetails';
    }

    if (incomingContext && incomingContext.page && ((incomingContext.wonum && incomingContext.siteid) || (incomingContext.href && !incomingContext.itemId))) {
      this.app.setCurrentPage({name:"schedule"});
      this.app.setCurrentPage({
        name: incomingContext.page,
        resetScroll: true,
        params: {wonum: incomingContext.wonum, siteid: incomingContext.siteid, href: incomingContext.href}
      });
    } else if(incomingContext && incomingContext.page && incomingContext.href && incomingContext.itemId) {
      this.app.setCurrentPage({
        name: incomingContext.page,
        resetScroll: true,
        params: { href: incomingContext.href,itemhref: incomingContext.href }
      });
    }
  }

  /**
   * Open iOS / Android Map
   * @param {option} option
   */
  async openNavigation(option) {
    log.t(TAG, "opening map");
    let device = Device.get();
    let platform = device?.platform.toLowerCase();   
    let url = "";
    let navigationIos = this.app.state.systemProp && this.app.state.systemProp["mxe.mobile.navigation.ios"];
    let navigationWindow = this.app.state.systemProp && this.app.state.systemProp["mxe.mobile.navigation.windows"];
    let navigationAndroid = this.app.state.systemProp && this.app.state.systemProp["mxe.mobile.navigation.android"];    
    
    navigationIos = navigationIos && navigationIos.toLowerCase();
    navigationWindow = navigationWindow && navigationWindow.toLowerCase();
    navigationAndroid = navigationAndroid && navigationAndroid.toLowerCase();

    if (platform === device.Constants.IOS.toLowerCase()) {
        url = this.getMapURLforDevice(navigationIos,option);
    } else if (platform === device.Constants.ANDROID.toLowerCase()) {        
        url =  this.getMapURLforDevice(navigationAndroid,option);     
    } else if ((platform ===  device.Constants.WINDOWS.toLowerCase()) || (platform ===  device.Constants.WINUI3.toLowerCase())) {
        url = this.getMapURLforDevice(navigationWindow,option);     
    }

    if (url !== "") {
      // istanbul ignore next
      if (!Device.get().isMaximoMobile) {
        Browser.get().openURL(url, "_system");
      } else {
        try {
          window.cordova.InAppBrowser.open(url, "_system", 'location=yes');
        } catch (error) {
          Browser.get().openURL(url, "_system");
        }
      }
    }
  }

  /**
   * Get description on the basis of internal value.
   */
  _getStatusDescription(statusArr, internalValue) {
    let description;
    // istanbul ignore else
    if (statusArr && statusArr.length && internalValue) {
      for (let i = 0; i < statusArr.length; i++) {
        // istanbul ignore else
        if (statusArr[i].defaults && statusArr[i].maxvalue === internalValue) {
            description = statusArr[i].description;
          break;
        }
      }
    }
    return description;
  }

  /**
   * Check whether the login MAS user has permission to access Assist
   * @returns true or false, assist is accessible for the login user
   */
  async checkAssistPermission() {
    let assistUrl = null;
    let isAccessible = false;
    const masUserProfile = await MASAPI.get().getUserProfile();
    // istanbul ignore next - can not test mas profile api call
    if (masUserProfile && masUserProfile.user) {
      const { workspaces } = masUserProfile.user;
      for (let workspaceId in workspaces) {
        const { applications } = workspaces[workspaceId];
        if (applications && applications['assist']) {
          const { href, role } = applications['assist'];
          assistUrl = href;
          if (role && role.length > 0 && role !== 'NO_ACCESS') {
            isAccessible = true;
            break;
          }
        }
      }
    }
    this.app.state.isAssistAccessible = isAccessible;
    // istanbul ignore next - can not test mas profile api call
    if (isAccessible && !Device.get().isMaximoMobile) {
      // register assist url if not running in maximo mobile container
      if (assistUrl != null) {
        if (!assistUrl.endsWith('/')) {
          assistUrl = assistUrl + '/';
        }
        let switcher = AppSwitcher.get();
        switcher.registerApplication(
          'assist',
          'Assist',
          `${assistUrl}technician`
        );
      }
    }
  }

  /* It is used to call TaskController completeWoTask function
   * @param {*} item 
   */
  completeTheTask(item){
    this.app.findPage("tasks").callController('completeWoTask', item);
  }

  /**
   * Call gotoAssistAppFromTask function with arguments
   * @param {*} event
   */
  gotoAssistAppFromTask(event) {
    const taskFields = [
      "description",
      "status",
      "status_description",
      "inspname"
    ];
    const item = event.item || {};
    //istanbul ignore else
    if (this.app) {
      let woDetailDS = this.app.findDatasource("woDetailds");
      let woItem = {};
      //istanbul ignore else
      if (woDetailDS && woDetailDS.items.length > 0) {
        woItem = { ...woDetailDS.item };
      }
      // set task field and value
      woItem["taskid"] = item.taskid;
      for (let i = 0; i < taskFields.length; i++) {
        let key = taskFields[i];
        if (item[key] != null) {
          woItem["task_" + key] = item[key];
        }
      }
      if (item.inspectionresult && item.inspectionresult.length > 0) {
        woItem["task_inspresult"] = item.inspectionresult[0].inspresult;
      }
      //istanbul ignore else
      if (woItem.failure && woItem.failure.description) {
        // flatten failure.description as failuredesc
        woItem["failuredesc"] = woItem.failure.description;
      }
      let woDetailsPage = this.app.findPage("workOrderDetails");
      const woFields = [
        "wonum",
        "title",
        "workorderid",
        "assetnum",
        "assetdesc",
        "assettype",
        "company",
        "failurecode",
        "failuredesc",
        "problemcode",
        "status",
        "status_description",
        "owner",
        "siteid",
        "href",
        "reportdate",
        "schedstart",
        "actstart",
        "targstartdate",
        "classificationid",
        "jpnum",
        "jpdesc",
        "taskid",
        "task_description",
        "task_status",
        "task_status_description",
        "task_inspname",
        "task_inspresult",
        "locationnum",
        "locationdesc"
      ];
      if (woDetailsPage && woDetailsPage.controllers.length > 0) {
        const { description, locationnum, failure, taskid } = woItem;
        let value = { wodesc: description };
        for (let i = 0; i < woFields.length; i++) {
          let key = woFields[i];
          if (woItem[key] != null) {
            value[key] = woItem[key];
          }
        }
        if (locationnum) {
          value.location = woItem.locationnum;
        }
        // istanbul ignore next
        if (failure && failure.description) {
          if (value.failuredesc == null) {
            value.failuredesc = failure.description;
          }
        }
        let type = taskid ? "mxwotask" : "mxwo";
        // maximo wo context passed to assist app
        let context = { type, value };
        this.loadApp({
          appName: "assist",
          context
        });
      } else {
        const { locationnum, description } = woItem;
        let value = { wodesc: description };
        // exclude unnecessary fields of wo item from context
        for (let i = 0; i < woFields.length; i++) {
          let key = woFields[i];
          if (woItem[key] != null) {
            value[key] = woItem[key];
          }
        }
        //istanbul ignore else
        if (locationnum) {
          value["location"] = woItem.locationnum;
        }
        let context = {
          type: "mxwotask",
          value
        };
        this.loadApp({ appName: "assist", context });
      }
    }
  }

  /* It is used to call TaskController openTaskLongDesc function
   * @param {*} item 
   */
  openTaskLongDesc(item){
    this.app.findPage("tasks").callController('openTaskLongDesc', item);
  }

  /**
   * Redirects to different application as per provided arguments.
   * @param {*} args 
   */
  loadApp(args = {}) {
    let appName = args.appName ? args.appName : undefined;
    let breadcrumbData = {returnName: `Returning to ${this.app.name}`, enableReturnBreadcrumb: true};
    if (!appName) {
      log.e(TAG,'loadApp : appName required for navigation.', args);
      return;
    }
    let options = args.options ? args.options : {canReturn: true};
    let context = args.context ? args.context : {};
    let switcher = AppSwitcher.get();
    context.breadcrumb = breadcrumbData;
    switcher.gotoApplication(appName, context, options);
  }

  /**
   * Check whether need to show prompt down message or not
   * @returns true or false
   */
  checkDownPrompt(evt) {
    if(evt.workorder.downprompt === '1') {
      let errorMessage = 'The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime.';
      evt.page.error(
        this.app.getLocalizedLabel("assetPromptDownMessage", errorMessage)
      );
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get URL on the basis of navigation property value.
   */
  getMapURLforDevice(navigationprop,option){
    let url = "";

    if (navigationprop === "applemaps") {
        url = Browser.get().appendUrl("http://maps.apple.com/", "saddr",  option.geolocationlat +"," +option.geolocationlong);
        url = Browser.get().appendUrl(url, "daddr",  option.serlat + "," + option.serlong);      
    }
    if (navigationprop === "waze") {
        url = Browser.get().appendUrl("https://waze.com/ul?navigate=yes", "ll",  option.serlat + "," + option.serlong);      
    }
    if (navigationprop === "googlemaps") {    
        url = Browser.get().appendUrl("https://www.google.com/maps/dir/?api=1","destination",option.serlat + "," + option.serlong);      
    }    
    return url;

  }
  /**
   * function return woactivity from workorder.
   * @param {page} is page object.
   * @param {app} is application object.
   * @param {woItem} is workorder item object.
   */
  async getWoActivity(page, app, woItem) {
    let taskList = [...woItem.woactivity];
    let woTaskList = [];
    let taskItems = [];
    let workTypeDs = app.findDatasource("dsworktype");
    const woInprgStatus = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', 'WOSTATUS|INPRG');
    let workType = [];

    /* istanbul ignore else */
    if(woItem.worktype) {
      workType = workTypeDs.items.filter(
        (item) => item.worktype === woItem.worktype
      );
    }
    taskList.forEach(async (item) => {
      let status = page.state.selectedStatus;
      let maxValue = page.state.selectedStatusMaxValue;
      let statusDescription = page.state.selectedStatusDescription;
      /* istanbul ignore else */
      if (['COMP', 'CLOSE', 'CAN'].includes(item.status_maxvalue)) {
        status = item.status;
        maxValue = item.status_maxvalue;
        statusDescription = item.status_description;
      }
      if(woItem.flowcontrolled) {
        if(item.taskid && !item.predessorwos && (item.status_maxvalue !== 'COMP' &&
        item.status_maxvalue !== 'CLOSE' &&
        item.status_maxvalue !== 'CAN' && item.status_maxvalue !== 'INPRG')) {
          if(!workType.length || (workType.length && !workType[0].startstatus_maxvalue) ) {
            status = woInprgStatus.value;
            maxValue = woInprgStatus.maxvalue;
            statusDescription = woInprgStatus.description;
          } else if(workType && workType.length && workType[0].startstatus && workType[0].startstatus_maxvalue === 'INPRG') {
            status = workType[0].startstatus;
            maxValue = workType[0].startstatus_maxvalue;
            statusDescription = workType[0].startstatus_description;
          } else {
            status = item.status;
            maxValue = item.status_maxvalue;
            statusDescription = item.status_description;
          }
        } else {
            status = item.status;
            maxValue = item.status_maxvalue;
            statusDescription = item.status_description;
          }
        }
        taskItems.push({
          ...item,
          status: status,
          status_maxvalue: maxValue,
          status_description: statusDescription,
        });
      });
    woTaskList = taskItems;
    return woTaskList;
  }

  /**
   * function return true/false whether all predessor task is complete or not.
   * @param {tasklist} is an array of tasks.
   * @param {item} is single task item.
   */
  validatePredessor(tasklist, item) {
    let tasks = [];
    if( item.status_maxvalue !== 'COMP' && item.predessorwos) {
      let taskids;
      if(item.predessorwos.includes('(')){
        taskids = this.getPredssorWoTask(item);
      }else{
        taskids = item.predessorwos.split(',');
      }
      tasks = tasklist.filter(item => item.taskid && taskids.includes(item.taskid.toString()) && item.status_maxvalue !== 'COMP');
    } else {
      return false;
    }
    return tasks.length  ? false : true;
  }

  /**
   * function return an array task ids.
   * @param {item} is single task item.
   */
  getPredssorWoTask(item) {
    const regex = /\d+(?=\))/g;
    const str = item.predessorwos;
    let m;
    let predessorTask =[];
    /* istanbul ignore else */
    if ((m = regex.exec(str)) !== null) {
        m.forEach((match) => {
          predessorTask.push(match)
        });
    }
    return predessorTask;
  }
}
export default AppController;
