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

import {log, Device} from '@maximo/maximo-js-api';
const TAG = 'FailureDetailsPageController';

class FailureDetailsPageController {
  pageInitialized(page, app) {
    log.t(TAG, 'Page Initialized');
    this.app = app;
    this.page = page;
  }

  /*
   * Method to resume the page
   */
  //istanbul ignore next
  async pageResumed() {
    log.t(TAG, 'Page Resumed ..');
    this.page.dsFailureList = this.app.findDatasource('dsFailureList');
    this.page.state.failureInprogressCount = 0;
  }

  async loadRecord(){
    const workorder = this.page.params.workorder ;
    this.page.state.workorder = workorder ;
    this.page.state.deletFailReportList = [];
    const failureLstDS = this.page.datasources['dsfailureDetailsList'];
    let reportWorkPage = this.app.findPage('report_work');

    // istanbul ignore else
    if (reportWorkPage && reportWorkPage !== '' && reportWorkPage.datasources['woDetailsReportWork']) {
        this.page.woDetailsReportWorkDS = reportWorkPage.datasources['woDetailsReportWork'];
    }
    
    log.t(TAG, 'loadRecord :: woDetailsReportWorkDS items --> ' + this.page.woDetailsReportWorkDS.items); 
    failureLstDS.clearSelections();

    const placeHolderValues =[{title: this.app.getLocalizedLabel('fail_class_placeholder', 'Failure class'), type: 'FAILURECLASS', type_maxvalue: 'FAILURECLASS'},
                            {title: this.app.getLocalizedLabel('problem_placeholder', 'Problem'), type: 'PROBLEM', type_maxvalue: 'PROBLEM'}, 
                            {title: this.app.getLocalizedLabel('cause_placeholder', 'Cause'), type: 'CAUSE', type_maxvalue: 'CAUSE'},
                            {title: this.app.getLocalizedLabel('remedy_placeholder', 'Remedy'), type: 'REMEDY', type_maxvalue: 'REMEDY'},
                            {title: this.app.getLocalizedLabel('details_placeholder', 'Details'), type: 'Details', type_maxvalue: 'Details'}
                          ];

    let failureListArr = await this.failureListCreation(workorder, placeHolderValues);
    
    //istanbul ignore else
    if(Device.get().isMaximoMobile) {
      let enableIndexCheck = true;
      failureListArr.forEach((element, index) => {
        if((element.type_maxvalue === 'FAILURECLASS' && workorder.failureclassdelete) || (element.type_maxvalue === 'PROBLEM' && workorder.problemdelete) ||
        (element.type_maxvalue === 'CAUSE' && workorder.causedelete) || (element.type_maxvalue === 'REMEDY' && workorder.remedydelete)){
          failureListArr[index].description = '';
          failureListArr[index].failurecode = '';
          failureListArr[index].failurelist = '';
          failureListArr[index].readonly = true;
          //istanbul ignore else
          if(enableIndexCheck) {
            failureListArr[index].readonly = false;
            enableIndexCheck = false;
          }
        }
      });
    }
  
    //get the Details data from failureListArr and changed it's readonly flag to false to allow user to click on it directly
    failureListArr[failureListArr.length-1].readonly = false;
    failureListArr =[...failureListArr];
    await failureLstDS.load({src: failureListArr, noCache:true});
    this.page.state.failureListArr = failureListArr;
    
    this.page.state.wofaildate = workorder.faildate;

    this.resetFailureList(failureListArr);

    // set previously set remark and long description
    this.page.state.failureRemark = workorder.remarkdesc ? workorder.remarkdesc : /*istanbul ignore next*/'';
    this.page.state.failureRemarkLongDesc = workorder.remarkdesc_longdescription || '';

    // set maximum length of remark text-area through checking datasource schema
    const workorderDS = this.page.woDetailsReportWorkDS;
    // istanbul ignore else
    if (workorderDS) {
      const remarkDescMaxLength = workorderDS.getFieldSize('remarkdesc');
      const remarkLongDescMaxLength = workorderDS.getFieldSize('remarkdesc_longdescription');
      // istanbul ignore else
      if (remarkDescMaxLength !== -1) {
        this.page.state.failureRemarkMaxLength = remarkDescMaxLength;
      }
      // istanbul ignore else
      if (remarkLongDescMaxLength !== -1) {
        this.page.state.failureRemarkLongDescMaxLength = remarkLongDescMaxLength;
      }
    }
  }

  /**
   * Method for preparing and creting failure List and return the same.'
   * @param {workorder} workorder - Pass workorder object from page param data.
   * @param {placeHolderValues} placeHolderValues - Placeholder Array for failure data.
   */
  async failureListCreation(workorder, placeHolderValues) {
    let failureListArr = [];

    let setReadonly = false ;
    let parent = '' ;

    if (workorder && workorder.failurecode && workorder.failurecode.length > 0){
      failureListArr.push({
        title: placeHolderValues[0].title,
        failurecode: workorder.failurecode,
        description: workorder.failure.description,
        failurelistid: 0,
        failurelist: workorder.failure.failurelist.failurelist,
        type: placeHolderValues[0].type,
        type_description: placeHolderValues[0].title,
        type_maxvalue: placeHolderValues[0].type_maxvalue,
        parent: '',
        orgid: workorder.orgid,
        readonly: false,
        href: workorder.href
      })
      parent = workorder.failure.failurelist.failurelist;
    } else {
      failureListArr.push({'title':placeHolderValues[0].title,
        failurelistid: 0,
        failurelist: '',
        type: placeHolderValues[0].type,
        type_description: placeHolderValues[0].title,
        type_maxvalue: placeHolderValues[0].type_maxvalue,  
        failurecode:'',
        description:'',
        parent: '',
        orgid: workorder.orgid,
        readonly: false
      });
      setReadonly = true ;
    }

    let problem;
    let i = 1;

    // check there is problem on failurereport. 
    if (workorder && workorder.failurecode && workorder.failurereport) {
      problem = workorder.failurereport.find((failurereport) => (failurereport.type_maxvalue === 'PROBLEM'));
    }
      
    // if there is no problem on failurereport, it assumes that problem set on offline mode.
    // istanbul ignore else
    if (!problem) {
      if (workorder && workorder.problemcode && workorder.problemcode.length > 0) {
        // istanbul ignore next
        failureListArr.push({
          title: placeHolderValues[1].title,
          failurecode: workorder.problemcode,
          description: workorder.problem.description,
          failurelistid: 1,
          failurelist: workorder.problem.failurelist.failurelist,
          type: placeHolderValues[1].type,
          type_description: placeHolderValues[1].title,
          type_maxvalue: placeHolderValues[1].type_maxvalue,
          parent: parent,
          orgid: workorder.orgid,
          readonly: false,
          href: workorder.href
        });
        // istanbul ignore next
        parent = workorder.problem.failurelist.failurelist;
      } else {
        failureListArr.push({'title':placeHolderValues[1].title,
          failurelistid: 1,
          failurelist: '',
          type: placeHolderValues[1].type,
          type_description: placeHolderValues[1].title,
          type_maxvalue: placeHolderValues[1].type_maxvalue,  
          failurecode:'',
          description:'',
          parent: parent,
          orgid: workorder.orgid,
          readonly: setReadonly
        });
        setReadonly = true;
      }
      i = 2;
    }

    // istanbul ignore else
    if (workorder) {
      // istanbul ignore else
      if (workorder.failurereport) {
        const failurelists = [];
        workorder.failurereport.forEach((failurereport) => {
          failurelists.push(failurereport.linenum);
        });

        // get failure information from failure list because there is no failure list information when failure is set on offline mode.
        let dsfailureList = this.page.dsFailureList;
        await dsfailureList.initializeQbe();
        dsfailureList.setQBE('failurelist', 'in', failurelists);
        const failures = await dsfailureList.searchQBE();

        workorder.failurereport.forEach((failurereport) => {
          // ignore deleted record on offline mode.
          // istanbul ignore else
          if (failurereport._action !== "delete") {
            const failure = failures.find((f) => f.failurelist === failurereport.linenum);
            let recordIndex = failureListArr.findIndex((record) => (record.type_maxvalue === failurereport.type_maxvalue));

            /* istanbul ignore if */
            if (failure) {
              // update failure information if failure type already exist in array
              if(recordIndex !== -1) {
                failureListArr[recordIndex].failurecode = failure.failurecode.failurecode;
                failureListArr[recordIndex].description = failure.failurecode.description;
                failureListArr[recordIndex].failurelist = failure.failurelist;
                failureListArr[recordIndex].type = failure.type;
                failureListArr[recordIndex].type_description = failure.type_description;
                failureListArr[recordIndex].type_maxvalue = failure.type_maxvalue;
                failureListArr[recordIndex].href = failurereport.href;
                failureListArr[recordIndex].readonly = false;
              }else {
                failureListArr.push({
                  title: failurereport.type_description,
                  failurecode: failure.failurecode.failurecode,
                  description: failure.failurecode.description,
                  failurelistid: i,
                  failurelist: failure.failurelist,
                  type: failure.type,
                  type_description: failure.type_description,
                  type_maxvalue: failure.type_maxvalue,
                  orgid: workorder.orgid,
                  parent: parent,
                  href: failurereport.href,
                  readonly: false 
                });
                i++;
              }
              parent = failure.failurelist ;
            }
          }
        });
      }
      
      while(i < 5) {
        failureListArr.push({
          title: placeHolderValues[i].title,
          failurelistid: i,
          failurelist: '',
          type: placeHolderValues[i].type,
          type_description: placeHolderValues[i].title,
          type_maxvalue: placeHolderValues[i].type_maxvalue,
          failurecode:'',
          description:'',
          orgid: workorder.orgid,
          parent: parent,
          readonly: i=== failureListArr.length -1 ? false:setReadonly
        });
        parent = '';
        setReadonly = true ;
        i++;
      }
    }

    return failureListArr;
  }

  // istanbul ignore next
  selectFailureDetails(item){
    log.t(TAG, 'selectFailureDetails : event.item --> ' + JSON.stringify(item));
  }

  async openFailureList(event){
    log.t(TAG, 'openFailureList : event.item --> ' + JSON.stringify(event));
    // istanbul ignore next
    if (!this.page.state.isFailureSaved && !this.page.state.isfailurelistloaded && this.page.state.failureInprogressCount > 0) {
      log.t(TAG, 'exit openFailureList: --> ');
      return;
    }    
    let failureLstDS = this.page.datasources['dsfailureDetailsList'];
    let selectedItem = event.item ;
    this.page.state.selectedFailCode = event ;
    const dsSelectingFailureList = this.page.datasources['dsSelectingFailureList'];
    
    let dsfailureList = this.page.dsFailureList;
    try {      
      dsfailureList.state.loading = false;
      this.page.state.isfailurelistloaded = false;
      await dsfailureList.initializeQbe();
      // istanbul ignore else
      if (selectedItem && !selectedItem.readonly) {
        if (selectedItem.type_maxvalue && selectedItem.type_maxvalue === 'FAILURECLASS') {
          dsfailureList.setQBE('parent','=', 'null');
          dsfailureList.setQBE('type','=', 'null');
        } else {
          dsfailureList.setQBE('parent', '=', selectedItem.parent);
          dsfailureList.setQBE('type', '=', selectedItem.type);
        }
          const failrures = await dsfailureList.searchQBE(undefined, true);
        // create new list for display
          await dsSelectingFailureList.load({ src: failrures, noCache: true });
          this.page.state.isfailurelistloaded = true;
      }

    } catch (error) {
      // istanbul ignore next
      this.page.state.isfailurelistloaded = false;
    } finally {
    // istanbul ignore next
    if (!event.noViewChange) {
      if (event.index === 0) {
        this.page.state.splitViewIndex = 1;
      } else {
        this.page.state.splitViewIndex = event.index + 1;
      }
    }

    // istanbul ignore else
    if(event.item.failurecode) {
      dsSelectingFailureList.setSelectedById(selectedItem.failurelist, true);
    }

    // istanbul ignore next
    if(event.index !== undefined && event.index < failureLstDS.items.length) {
      failureLstDS.items[event.index]._selected = true;
      failureLstDS.setSelectedItem(failureLstDS.items[event.index], true);
      this.page.state.hideDoneBtn = this.page.state.splitViewIndex > 0 && Device.get().screen.size === 'sm' ? true : false;
      if(event.index === 4 && Device.get().isMaximoMobile){
        this.page.state.hideDoneBtn = false;
      }
    }
  }
  }

  async updateAndSaveFailureList(event){
    log.t(TAG, 'updateFailureList : event.item --> ' + JSON.stringify(event));
    // istanbul ignore next
    if (this.page.state.isFailureSaved && !this.page.state.isfailurelistloaded) {
      log.t(TAG, 'exit updateFailureList :--> ');
      return;
    }
    this.page.state.isFailureSaved = false;   
    let failureListArray = this.page.state.failureListArr ;
    let selectedID = this.page.state.selectedFailCode.item.failurelistid ;
    let selectedFailureCode = this.page.state.selectedFailCode.item.failurecode ;
    let failureLstDS = this.page.datasources['dsfailureDetailsList'];
    let selectedFailList ;

    //istanbul ignore next  
    selectedFailList = event.item || event;

    // istanbul ignore else
    if(selectedFailureCode !== selectedFailList.failurecode.failurecode){
      let failLstElement ;
      let tempFailLstElement;
      let elementFound = false ;
      for(let i=0; i < failureListArray.length ; i++){
        if(failureListArray[i].failurelistid === selectedID){
          failLstElement = failureListArray[i] ;
          elementFound = true ;
        }
        if(elementFound){

          // ************
          // Need to add it to Delete Array if href exists
          // istanbul ignore else
          if(failureListArray[i].href){
            tempFailLstElement = {};
            tempFailLstElement.failurelist    = failureListArray[i].failurelist ;
            tempFailLstElement.failurecode    =  failureListArray[i].failurecode ;
            tempFailLstElement.description    = failureListArray[i].description ;
            tempFailLstElement.href           = failureListArray[i].href;
            tempFailLstElement.type           = failureListArray[i].type;
            tempFailLstElement.failurelistid  = failureListArray[i].failurelistid ;
            tempFailLstElement.type_maxvalue  = failureListArray[i].type_maxvalue;
            this.page.state.deletFailReportList.push(tempFailLstElement);
          }
          // ************
          failureListArray[i].failurelist = '';
          failureListArray[i].failurecode = '';
          failureListArray[i].description = '';
        }
      }

      failLstElement.failurecode = selectedFailList.failurecode.failurecode ;
      failLstElement.failurelist = selectedFailList.failurelist ;
      failLstElement.description = selectedFailList.failurecode.description ;
      failLstElement._bulkid     = selectedFailList.failurecode.failurecode ;
      
      let respHref = '';
      let readOnly = false ;
      let parentFailList ;
      failureListArray.splice(selectedID,1,failLstElement);
        failureListArray.forEach((element) => {
          element.readonly = readOnly;
          // istanbul ignore else
          if(!element.failurecode){
            readOnly = true ;
          }
          element.parent = parentFailList;
          parentFailList = element.failurelist ;
        });

      let response = await this._saveFailureReport(failLstElement);
      // istanbul ignore next
      if(response) {
        failLstElement.href = response;
      }
      // istanbul ignore else
      if (this.page.state.isFailureSaved) {
        log.t(TAG, 'updateFailureList : After Add --> ' + respHref);

        log.t(TAG, 'updateFailureList : failureListArr Updated Item ID--> ' + failLstElement.failurelistid );
        // istanbul ignore else
        if(failLstElement.failurelistid < 4){
          this.openFailureList({"item" : failureListArray[failLstElement.failurelistid +1], "index":selectedID + 1});
        } else {
          // istanbul ignore else
          if(selectedID === failureListArray.length-1 && Device.get().screen.size === 'sm') {
            this.page.state.splitViewIndex = 0;
            this.page.state.hideDoneBtn = false;
          }
        }  

        //get the Details data from failureListArr and changed it's readonly flag to false to allow user to click on it directly
        failureListArray[failureListArray.length-1].readonly = false;
        failureListArray =[...failureListArray];     
        await failureLstDS.load({src: failureListArray, noCache:true});
        this.page.state.failureListArr = failureListArray ;

        // istanbul ignore next
        if(selectedID !== undefined && failureLstDS.items.length > 0 && selectedID < 3) {
          failureLstDS.items[selectedID + 1]._selected = true;
          failureLstDS.setSelectedItem(failureLstDS.items[selectedID + 1], true);
        }

      }
    }
  }

  deleteFailureList(event) {
    log.t(TAG, 'deleteFailureList : event.item --> ' + JSON.stringify(event));
    this.page.state.selectedFailCode = '';
    let failureListArray = this.page.state.failureListArr;
    let selectedID = event.item.failurelistid;
    let failureLstDS = this.page.datasources['dsfailureDetailsList'];
    let failLstElement = {};
    let elementFound = false ;
    
    log.t(TAG, 'updateFailureList : failureListArr Before Delete --> ' + JSON.stringify(failureListArray));
    
    for(let i=0; i < failureListArray.length ; i++){
      failLstElement = {};
      if(failureListArray[i].failurelistid === selectedID){
        failLstElement.failurelist    = failureListArray[i].failurelist ;
        failLstElement.failurecode    =  failureListArray[i].failurecode ;
        failLstElement.description    = failureListArray[i].description ;
        failLstElement.href           = failureListArray[i].href;
        failLstElement.type           = failureListArray[i].type;
        failLstElement.type_maxvalue  = failureListArray[i].type_maxvalue;
        failLstElement.failurelistid  = failureListArray[i].failurelistid ;

        this.page.state.deletFailReportList.push(failLstElement);
        elementFound = true ;
      }else{
        // Delete all subsequent failreports which are synched with Maximo ..
        if(elementFound) {
          failLstElement.failurelist    = failureListArray[i].failurelist ;
          failLstElement.failurecode    =  failureListArray[i].failurecode ;
          failLstElement.description    = failureListArray[i].description ;
          failLstElement.href           = failureListArray[i].href;
          failLstElement.type           = failureListArray[i].type;
          failLstElement.type_maxvalue  = failureListArray[i].type_maxvalue;
          failLstElement.failurelistid  = failureListArray[i].failurelistid ;
          this.page.state.deletFailReportList.push(failLstElement);
        }
        // ******************
      }
      if(elementFound){
        failureListArray[i].failurelist = '';
        failureListArray[i].failurecode = '';
        failureListArray[i].description = '';
        failureListArray[i].href = '';
      }
    }

    this._deleteFailureReport();

    let readOnly = false ;
    let parentFailList ;
    failureListArray.forEach((element) => {
      element.readonly = readOnly;
      // istanbul ignore else
      if (!element.failurecode){
        readOnly = true;
      };
      element.parent = parentFailList;
      parentFailList = element.failurelist ;
    });
    
    //get the Details data from failureListArr and changed it's readonly flag to false to allow user to click on it directly
    failureListArray[failureListArray.length-1].readonly = false;
    failureListArray =[...failureListArray];
    failureLstDS.load({src: failureListArray, noCache:true});
    this.page.state.failureListArr = failureListArray ;

    let noViewChange = Device.get().screen.size === 'sm';
    this.openFailureList({'item':failureListArray[event.index],'noViewChange':noViewChange,'index':event.index}); 
  }

  // istanbul ignore next
  _deleteFailureReport(){
    
    let workorder = this.page.params.workorder ;
    let deleteList = this.page.state.deletFailReportList ;
    let tempItem = {};
    tempItem.wonum = workorder.wonum ;
    tempItem.href = workorder.href ;
    tempItem.siteid = workorder.siteid ;
    let woDS = this.page.woDetailsReportWorkDS ; 
    let tempFailRep;
    let tempFailureReport = [] ;
    let failClassToBeDel = false ;
    let offlineDelete = [];
    let failurePayloadData = [];

    let option = {
      responseProperties: 'wonum,failurereport',
      deleteRecord: true,
      localPayload: {
        href: workorder.href,
        failurereport: failurePayloadData
      }
    }
        
    if (deleteList && deleteList.length > 0) {
      deleteList.forEach((element) => {
        offlineDelete.push(element.type_maxvalue);
        if(element.type_maxvalue && element.type_maxvalue === 'FAILURECLASS'){
          tempItem.failurecode = '';
          failClassToBeDel = true;
        }else if(!failClassToBeDel){
          tempFailRep = {}
          tempFailRep.failurecode = element.failurecode ;
          tempFailRep.href = element.href ;
          tempFailRep._action = "delete";
          tempFailureReport.push(tempFailRep);
          if(element.type_maxvalue === 'PROBLEM') {
            tempItem.problemcode = '';
            option.localPayload.problemcode = '';
            option.localPayload.problem = {
              description: '',
              failurelist: {failurecode: ''}
            }
          }
        }
      });

      if(Device.get().isMaximoMobile) {

        if(failClassToBeDel) {
          option.localPayload.failureclassdelete = true;
          option.localPayload.problemdelete = true;
          option.localPayload.causedelete = true;
          option.localPayload.remedydelete = true;
        }else if(offlineDelete.includes("PROBLEM")) {
          option.localPayload.problemdelete = true;
          option.localPayload.causedelete = true;
          option.localPayload.remedydelete = true;
        }else if(offlineDelete.includes("CAUSE")) {
          option.localPayload.causedelete = true;
          option.localPayload.remedydelete = true;
        } else {
          option.localPayload.remedydelete = true;
        }

        if(tempFailureReport.length === 0) {
          option.localPayload.failurecode = '';
          option.localPayload.failure = { description: ''};
          option.localPayload.problemcode = '';
          option.localPayload.problem = {
            description: '',
            failurelist: {failurecode: ''}
          }
          if(woDS.item.failureReport){
            woDS.item.failurereport.forEach((existing) => {
              failurePayloadData.push({href: existing.href, anywhererefid: existing.anywhererefid, _deleted: true});
            });
          }  
        }else {
          tempFailureReport.forEach((element) => {
            if(woDS.item.failurereport && woDS.item.failurereport.length > 0) {
              woDS.item.failurereport.forEach((existing) => {
                if((typeof existing.failurecode === 'object' && existing.failurecode.failurecode === element.failurecode) || existing.failurecode === element.failurecode) {
                  element.anywhererefid = existing.anywhererefid;
                  element.href = existing.href;
                  failurePayloadData.push({href: existing.href, anywhererefid: existing.anywhererefid, _deleted: true});
                }
              });
            }
          });
        }
      }

      option.localPayload.failurereport = failurePayloadData;
      tempItem.failurereport = tempFailureReport;

      log.t(TAG, '_deleteFailureReport :updatdList :  delete updateDS items  --> ' + JSON.stringify(tempItem));
      
      this.page.state.failureInprogressCount += 1;
      // istanbul ignore next
      woDS.update(tempItem, option);
      this.page.state.failureInprogressCount -= 1;
      this.page.state.deletFailReportList= [];
    }
}

  // istanbul ignore next
  async _saveFailureReport(failureReport){
    log.t(TAG, '_saveFailureReport :updatdList :  add or update updateDS items  --> ' + JSON.stringify(failureReport));
    
    let workorder = this.page.params.workorder ;
    let tempItem ;
    let woDS = this.page.woDetailsReportWorkDS ; 
    let tempFailRep = {};
    let tempFailureReport = [] ;
    let respHref ;
    let response ;
   
    tempItem = {};
    tempItem.wonum = workorder.wonum ;
    tempItem.href = workorder.href ;
    tempItem.siteid = workorder.siteid ;
    // istanbul ignore next
    let option = {
      localPayload:{href: workorder.href},
      responseProperties: 'failurereport,anywhererefid'
    }
    
    if (failureReport.type_maxvalue === 'FAILURECLASS') {
      tempItem.failurecode = failureReport.failurecode;
      tempItem.failure = {
        description: failureReport.description,
        failurelist: {
          failurelist: failureReport.failurelist
        }
      };
    } else if (failureReport.type_maxvalue === 'PROBLEM') {
      tempItem.problemcode = failureReport.failurecode;
      tempItem.problem = {
        description: failureReport.description,
        failurelist: {
          failurelist: failureReport.failurelist
        }
      };
      if (woDS.currentItem.problem) this.page.state.problemchanged = true;
      if (!workorder.faildate || workorder.faildate === '') {
        tempItem.faildate = this.app.dataFormatter.convertDatetoISO(new Date());
        this.page.state.wofaildate = tempItem.faildate;
      }
    } 
    else {
      if (failureReport.failurecode && failureReport.failurecode !== ""
        && failureReport.type_maxvalue !== "FAILURECLASS") {
        await woDS.forceReload(); // needed to update the failurereportid values on the failure report list
        let tempFailRep = {
          linenum: failureReport.failurelist,
          failurecode: failureReport.failurecode,
          type: failureReport.type,
          type_description: failureReport.type_description,
          type_maxvalue: failureReport.type_maxvalue,
          anywhererefid: new Date().getTime()
        };
        if (woDS.currentItem?.failurereport && woDS.currentItem?.failurereport?.length >= failureReport.failurelistid) {
          tempFailRep.failurereportid =
            woDS.currentItem.failurereport[failureReport.failurelistid - 1]?.failurereportid;
        }
        if (this.page.state.problemchanged && woDS.currentItem.failurereport?.length >= failureReport.failurelistid) {
          let deleteFailureReport = {
            failurecode: woDS.currentItem.failurereport[failureReport.failurelistid - 1].failurecode,
            href: woDS.currentItem.failurereport[failureReport.failurelistid - 1].href,
            _action: "delete",
          };
          const deleteoption = { ...option };
          deleteoption.localPayload = { ...option.localPayload, ...tempItem };
          tempItem.failurereport = deleteFailureReport;
          await woDS.update(tempItem, deleteoption);
        }
        if (failureReport.href) {
          tempFailRep.href = failureReport.href;
        }
        tempFailureReport.push(tempFailRep);
      }
    }

    tempItem.failurereport = tempFailureReport;

    if(Device.get().isMaximoMobile) {
      if(failureReport.type_maxvalue === 'FAILURECLASS') {
        option.localPayload.failureclassdelete = false;
      }else if(failureReport.type_maxvalue === "PROBLEM") {
        option.localPayload.problemdelete = false;
      }else if(failureReport.type_maxvalue === "CAUSE") {
        option.localPayload.causedelete = false;
      } else {
        option.localPayload.remedydelete = false;
      }
      option.localPayload = {...option.localPayload, ...tempItem};
    }

    log.t(TAG, '_saveFailureReport :updatdList :  add or update updateDS items  --> ' + JSON.stringify(tempItem));
    
    this.page.state.failureInprogressCount += 1;
    response = await woDS.update(tempItem ,option);
    this.page.state.failureInprogressCount -= 1;
    this.page.state.isFailureSaved = true;
    log.t(TAG, '_saveFailureReport :updatdList :  add or update response  --> ' + JSON.stringify(response));

    let failureReportResponse;

    // istanbul ignore next
    if (failureReport.type_maxvalue !== "FAILURECLASS" && failureReport.type_maxvalue !== "PROBLEM" &&
    this.page.datasources.dsfailureDetailsList.getItems()[failureReport.failurelistid]?.failurecode) {
    failureReportResponse = response.failurereport[failureReport.failurelistid - 1].failurereportid;
  }


    // istanbul ignore next
    if (failureReportResponse) {
      tempItem.failurereport[0].failurereportid = failureReportResponse.failurereportid;
      option.localPayload.failurereport[0].failurereportid = failureReportResponse.failurereportid;
    }

    if(response && response.failurereport){
      response.failurereport.forEach((element) => {
        if(element.type_maxvalue === tempFailRep.type_maxvalue){
          respHref = element.href ;
        }
      });
    }    

    return respHref;
  }

  async doneFailureEdit(){
    //Do not go back until items get deleted
    // istanbul ignore next
    if(this.page.state.failureInprogressCount > 0) {
      this.page.state.savingData = true;
      window.setTimeout(() => {
        this.doneFailureEdit();
      }, 50)
      return;
    }
    this.page.state.savingData = false;
    let workorder = this.page.params.workorder;
    this.app.setCurrentPage({
      name: "report_work",
      params: {
        wonum: workorder.wonum,
        itemhref: workorder.href,
        istask: workorder.istask,
        wogroup: workorder.wogroup,
        taskid: workorder.taskid,
      },
    });   
    // istanbul ignore else
    if(this.app.currentPage) {
      this.page.state.navigateToReportWork = true;
    }
  }

  /**
   * Callback method for when the text-area for remark is changed.'
   */
  setRemarks(event) {
    const curValue = event.currentTarget.value;
    this.page.state.failureRemark = curValue;
    log.t(TAG, 'setRemarks : failureRemark --> ' +  this.page.state.failureRemark);
    this.page.changeRemark = true;
  }

  /**
   * Callback method for when the text-area loses focus.'
   */
  async saveRemarks() {
    const workorder = this.page.params.workorder;
    const workorderDS = this.page.woDetailsReportWorkDS; 

    let item = {
      href : workorder.href,
      wonum : workorder.wonum,
      siteid: workorder.siteid,
      remarkdesc: this.page.state.failureRemark
    }

    let option = {
      responseProperties: workorderDS.baseQuery.select
    };

    // istanbul ignore else
    if (this.page.changeRemark) {
      try {
        this.page.state.failureInprogressCount += 1;
        await workorderDS.update(item,option);
        this.page.changeRemark = false;
      } catch(e) {
        /* istanbul ignore next */
        log.t(TAG, 'Error on saving remark : ' + e);
      }
      finally {
        this.page.state.failureInprogressCount -= 1;
      }

      log.t(TAG, 'saveRemarks : failureRemark --> ' +  this.page.state.failureRemark);  
    }

    return;
  }

  /**
   * Reset to previous state of the selection/list
   */
  resetFailureList(failureListArray) {
    let event= {};
    let elementFound = false;
    let noViewChange = Device.get().screen.size === 'sm';
    // istanbul ignore else
    if(failureListArray) {
      for(let i = 0; i < failureListArray.length; i++) {
        // istanbul ignore else
        if(failureListArray[i].failurecode === '') {
          event.item = failureListArray[i];
          elementFound = true;
          break;
        }
      }
    }

    // istanbul ignore next
    if(!elementFound && failureListArray) {
      event.item = failureListArray[0];
    }
    this.openFailureList({'item':event.item,'index':event.item.failurelistid,'noViewChange':noViewChange});
  }

  /**
   * Update split view state
   */

  // istanbul ignore next
  updateViewState(evt) {
    this.page.state.hideDoneBtn = evt > 0 && Device.get().screen.size === 'sm' ? false : true;
    this.page.state.splitViewIndex = 0;
  }

  /**
   * Callback method for when the text-area for Long Description is changed.'
   */
       setLongDesc(event) {
        const curValue = event.currentTarget.value;
        this.page.state.failureRemarkLongDesc = curValue;
        log.t(TAG, 'setLongDesc : failureRemark --> ' +  this.page.state.failureRemarkLongDesc);
        this.page.changeLongRemark = true;
      }

  /**
   * Callback method for when the text-area loses focus.'
   */
   async saveLongDesc() {
    const workorder = this.page.params.workorder;
    const workorderDS = this.page.woDetailsReportWorkDS; 

    if(! workorder) return; 
    
    let item = {
      href : workorder.href,
      wonum : workorder.wonum,
      siteid: workorder.siteid,
      remarkdesc: this.page.state.failureRemark,
      remarkdesc_longdescription : this.page.state.failureRemarkLongDesc
    }

    let option = {
      responseProperties: workorderDS.baseQuery.select
    };

    // istanbul ignore else
    if (this.page.changeLongRemark) {
      try {
        this.page.state.failureInprogressCount += 1;
        await workorderDS.update(item,option);
        this.page.changeLongRemark = false;
      } catch(e) {
        /* istanbul ignore next */
        log.t(TAG, 'Error on saving remark : ' + e);
      }
      finally {
        this.page.state.failureInprogressCount -= 1;
      }

      log.t(TAG, 'saveRemarks : failureRemark --> ' +  this.page.state.failureRemarkLongDesc);  
    }

    return;
  }
  
}

export default FailureDetailsPageController;
