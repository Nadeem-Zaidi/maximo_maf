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
import WOUtil from './utils/WOUtil';
class WorkOrderDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }
  
  /**
   * Function to set the computedDisableButton state - used to show/hide the Materials button
   *  - The Work Order selected.
   */
  computedDisableButton(item) {
    if (item) {
      return (
        !(item.wpmaterial && item.wpmaterial.length) &&
        !(item.wptool && item.wptool.length)
      );
    }
    return true;
  }

  computedItemNum(item) {
    let computedItemNum = null;
    //istanbul ignore next
    if (item) {
      if (item.itemnum && item.description) {
        computedItemNum = item.itemnum + ' ' + item.description;
      } else {
        if (item.itemnum) {
          computedItemNum = item.itemnum;
        } else {
          computedItemNum = item.description;
        }
      }
    }
    return computedItemNum;
  }

  /**
   * show/hide the Gauge Meter button for Work Order selected. */  
  computedDisableMeter(item) {
    return (!item.assetmetercount && !item.locationmetercount);
  }

  /**
   * show/hide the Gauge Meter button for Work Order selected. */  
   computedMultiDisableMeter(item) {
    return (!item.multiassetmetercount && !item.multilocationmetercount);
  }
  
  computedWorkType(item) {
    let computedWorkType = null;

    //istanbul ignore else
    if (item && item.wonum) {
      //istanbul ignore if
      if(item.istask) {
        computedWorkType = item.wogroup + '-' + item.taskid
      } else {
        item.worktype
        ? (computedWorkType = item.worktype + ' ' + item.wonum)
        : (computedWorkType = item.wonum);
      }
    }
    return computedWorkType;
  }

  /**
   * Show/hide Start, Pause & Stop button on workorder list page. 
   * @param {item} item
   * @return {hideStartButton} bool value to hideStartButton 
   */
  computedWOTimerStatus(item) {
		let hideWOStartButton = false;
		if (item.labtrans && item.labtrans.length > 0) {
      let self = this;
      hideWOStartButton = item.labtrans.some((member) => member.timerstatus_maxvalue === 'ACTIVE' && member.laborcode === self.app.client.userInfo.labor.laborcode);
      hideWOStartButton = hideWOStartButton ? true : false;
		}
		return hideWOStartButton;
  }
  
  /**
   * Function to display WO status and priority on work order details page.
   */
   computedWODtlStatusPriority(item) {
    let schedulePage;
    let woDtlPage;
    //istanbul ignore next

    // DT214200 Addign the initialze to Maximo Mobile to resolve :: Unable to change status for work orders created without ever visiting the work order list.

    if(this.app && this.app.pages) {
      const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
      schedulePage = this.app.pages.find((element) => {
        return (element.name === schPage) ? element : '';
      });
      if( !schedulePage.initialized){
        schedulePage.initialize();
      }
    woDtlPage = this.app.findPage('workOrderDetails');
    }

    // DT214200 close.

    let valueDisable = this.app.checkSigOption('MXAPIWODETAIL.STATUS') ? false :true ;
    //istanbul ignore next
    let woStatus = {
      label: item.status_description, 
      type: 'white', 
      action: true,
      disabled: valueDisable, 
      onClick: ()=>{
        if(schedulePage && woDtlPage && woDtlPage.datasources['woDetailResource']) {
          schedulePage.callController('openChangeStatusDialog', {
            item: item,
            datasource: woDtlPage.datasources['woDetailResource'].name,
            referencePage: 'workOrderDetails',
            selectedDatasource: woDtlPage.datasources['woDetailResource']
          });
        }
      }
    };

    if(item.wopriority !== null && item.wopriority !== "" && item.wopriority >=0){
      return [woStatus,
      {
        label: this.app.getLocalizedLabel('priority_label', `Priority ${item.wopriority}`, [item.wopriority]),
        type: 'dark-gray',
        disabled: valueDisable,
      }
     ];
    } else {
      return [woStatus];
    }
  }

/**
   *  value to decide whetehr to show or hide start work or start travel.
   */  
  computedWorkTypeButton(item) {
    let isTravel = false;    
    if (this.app && this.app.pages) {
      
      // istanbul ignore next
      let schedulePage = this.app.pages.find((element) => {
        if (element.name === 'schedule' || element.name === 'approval') {            
            return element;
          }else{
            return '';
          }
      });
       // istanbul ignore next
      if (schedulePage) {              
        let scheduleDataController = schedulePage.datasources.dswolist;
        if (scheduleDataController) {
          isTravel = scheduleDataController.callController("computedWorkTypeStatus", item);
        }
        return isTravel;
      }
      
    }
  }

  computedEstTotalCost(item) {
    return WOUtil.computedEstTotalCost(item)
  }

  accessWoCostData(item) {
    return this.computedEstTotalCost(item).totalcost;
  }

  /**
   * Function called after loading the data
   * @param {dataSource} dataSource 
   * @param {items} items 
   */
  //istanbul ignore next
  async onAfterLoadData(dataSource, items) {
    let incompleteItems = [];
    let page = this.app.findPage("tasks");
    page.state.itemToOpen = page.state.itemToOpen ? page.state.itemToOpen : '';
    if (dataSource.name === 'woPlanTaskDetailds' && items.length) {
      items.forEach((item) => {
        let status = item.status_maxvalue;
        if (item.taskid && (this.app.currentPage.name ==='workOrderDetails' || this.app.currentPage.name === 'tasks') && status !== 'COMP' && status !== 'CLOSE' && status !== 'CAN') {
          incompleteItems.push(item);
        }
        if (this.app.currentPage.name === 'tasks' && page.state.itemToOpen === '' && status !== 'CLOSE' && status !== 'CAN' && status !== 'COMP') {
          page.state.itemToOpen = item.workorderid;
        }
        //istanbul ignore if
        if(this.app.currentPage.name !=='schedule'){
          item.hideLockIcon = this.hideLockIcon(item);
        }
        item.computedTaskStatus = this.computedTaskStatus(item);
        item.computedPredecessorString = this.computedPredecessorString(item);
      });  
    this.app.state.taskCount = incompleteItems.length;
    }

    //Filter the assets on basis of not null
    if (dataSource.name === 'woMultiAssetLocationds' && items.length) {
      await dataSource.initializeQbe();
      await dataSource.searchQBE();
      
      //Set assetToOpen attribute value
      let detailsPage = this.app.findPage("workOrderDetails");
      detailsPage.state.assetToOpen = detailsPage.state.assetToOpen ? detailsPage.state.assetToOpen : '';

      if(detailsPage.state.assetToOpen === '') {
        items.forEach((item) => {
          let progress = item.progress;
          if (!progress && this.app.currentPage.name === 'workOrderDetails' && detailsPage.state.assetToOpen === '') {
            detailsPage.state.assetToOpen = item.multiid;
          }
        });
      }
    }
  }

  /**
   * Return ASSET if assetnum found else LOCATION
   * @param {items} item
   */
  computedAssetLoc(item) {
    let computedAssetLoc = (item && item.assetnum) ? 'ASSET' : 'LOCATION';
    return computedAssetLoc;
  }
  
  computedMeterCurDate(item) {
    item.computedMeterCurDate = new Date();      
    return item.computedMeterCurDate;
  }
  
  computedMeterCurTime(item) {
    let date = new Date();
    item.computedMeterCurTime = date.getTime();    
    return item.computedMeterCurTime;
  }

  
  /* Return workroder status and priority on workorder list page.
   * @param {item} item
   * @return {status_description} string value
   * @return {wopriority} number value 
   */
  computedTaskStatus(item) {
    let tasksPage;
    let taskDS;
    //istanbul ignore next
    if(this.app) {
      tasksPage = this.app.findPage('tasks');
      taskDS = this.app.datasources['woPlanTaskDetailds'];
    }

    //istanbul ignore next
    let woStatus = {
      label: item.status_description, 
      type: 'warm-gray', 
      action: true, 
      onClick: ()=>{
        if(tasksPage && taskDS) {
          tasksPage.callController('openChangeStatusDialog', {
            item: item,
            datasource: taskDS.name,
            referencePage: 'tasks',
            selectedDatasource: taskDS
          });
        }
      }
    };
    return [woStatus];
  }

  /**
   * Return whether to show lock or complete button
   * @param {item} task item
   */
  hideLockIcon(item) {
    let workTypeDs = this.app.findDatasource("dsworktype");
    let woDetailds = this.app.findDatasource("woDetailResource");
    let taskDS = this.app.datasources['woPlanTaskDetailds'];
    let woWorkType = woDetailds.item.worktype;
    let workType = [];
    const isFlowControlled = this.app.findDatasource('woDetailds')?.item?.flowcontrolled;
    //istanbul ignore else
    if(woWorkType) {
      workType = workTypeDs.items.filter(
        (item) => item.worktype === woWorkType
      );
    }
    if(isFlowControlled) { 
      let isCompletedPredecessor = this.app.callController('validatePredessor', taskDS.items, item);
      //istanbul ignore if
      if(!isCompletedPredecessor && item.predessorwos && item.status_maxvalue !== 'COMP') {
        return false;
      }
      //istanbul ignore else
      if(workType && workType.length) {
        //istanbul ignore if
        if(workType[0].startstatus && workType[0].startstatus_maxvalue === 'COMP') {
          return false
        }
        if(workType[0].startstatus && workType[0].startstatus_maxvalue !== 'INPRG') {
          return true;
        }
      }
      //istanbul ignore else
      if(woDetailds.item.status_maxvalue !== 'INPRG') {
        return false
      }
      return true;
    } else {
      return true
    }
  }

  /**
   * Return whether true and false when the task asset or location different from parentWO.
   * @param {item} task item
   */
  computedParentAssetLocation(item) {
    let woDetailds = this.app.findDatasource("woDetailResource");
    let workorder = woDetailds.item;
    
    //istanbul ignore else
    if(item && item.assetnum && item.location && workorder.assetnumber && workorder.locationnum){
      let parent_asset = (item.assetnum && (item.assetnum !== workorder.assetnumber));
      let parent_location = (item.location && (item.location !== workorder.locationnum));
      //istanbul ignore else
      if(parent_asset || parent_location){
        return false
      } else {
        return true;
      }
    }
    else if(item && !item.assetnum && !item.location && !workorder.assetnumber && !workorder.locationnum) {
      return true;
    }
    else if(item && !item.assetnum && item.location && !workorder.assetnumber && workorder.locationnum ){
      if(item.location !== workorder.locationnum){
        return false;
      }
      else{
        return true;
      }
    }
    else if(item && item.assetnum && !item.location && workorder.assetnumber && !workorder.locationnum ){
      if(item.assetnum !== workorder.assetnumber){
        return false;
      }
      else{
      return true;
      }
    }
    else{
      return false;
    }
  }

  /**
   * Return predessorwos as a string
   * @param {item} task item
   */
  computedPredecessorString(item) {
    let str = '';
    if(item.status_maxvalue !== 'COMP' && item.predessorwos) { 
      let taskids;
      //istanbul ignore if
      if(item.predessorwos.includes('(')) {
        taskids = this.app.callController('getPredssorWoTask',item);
      } else {
        taskids = item.predessorwos.split(',');
      }
      //istanbul ignore else
      if(taskids && taskids.length) {
        return taskids.toString();
      }
    } else {
      return str;
    }
  }

   /**
   * Return boolean value to show or hide border
   * @param {item} task item
   */
  computedBorderDisplay(item){
    //istanbul ignore else
    if((!item.computedParentAssetLocation && !item.description_longdescription) || (item.computedParentAssetLocation && item.description_longdescription) || (item.computedParentAssetLocation && !item.description_longdescription)){
      return false;
    }
    return true;
  }
}

export default WorkOrderDataController;
