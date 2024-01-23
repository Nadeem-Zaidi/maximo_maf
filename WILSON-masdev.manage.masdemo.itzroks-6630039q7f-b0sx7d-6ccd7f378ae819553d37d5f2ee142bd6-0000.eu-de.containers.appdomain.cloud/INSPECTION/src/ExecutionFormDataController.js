/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {log, Device} from '@maximo/maximo-js-api';
import {isGroupQuestion} from './components/common/utils';
import InspectionsList from './components/common/InspectionsList';
import {FIELDS} from './Constants';
import {
  UIBus
} from '@maximo/react-components';
 
const TAG = 'ExecutionFormDataController';
class ExecutionFormDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
 
    this.datasource.addIgnoreField(FIELDS.FORMATTED_GROUP_SEQ);
    this.datasource.addIgnoreField(FIELDS.COMPLETED);
    this.datasource.addIgnoreField(FIELDS.ID);
    this.datasource.addIgnoreField(FIELDS.INVALID);
    this.datasource.addIgnoreField(FIELDS.VISIBLE);
    this.datasource.addIgnoreField(FIELDS.REQUIRED);
    this.datasource.addIgnoreField(FIELDS.FILTERED);
    this.datasource.addIgnoreField(FIELDS.REJECTED);
    this.datasource.addIgnoreField(FIELDS.INFERENCESTATUS)
    this.datasource.addIgnoreField(FIELDS.NEWURL);

    this.datasource.on('invoke-action-failed', this.onInvokeActionFailed);
  }
 

  /**
   * handle the error on complete form
   * @param {*} datasource
   * @param {*} query
   */
   onInvokeActionFailed(ddatasource, action, error) {
   
    this.app.currentPage.state.summaryinprogress = false;
    this.app.currentPage.state.completeinprogress = false;
  }

  /**
   * Manually set query item url when it's not expected
   * Procedure created to fix GRAPHITE-37852
   * @param {*} datasource
   * @param {*} query
   */
  onBeforeLoadData(datasource, query) {
    const {inspectionsList} = this.app.state; 
 
    const inspListInstance =
      inspectionsList instanceof InspectionsList
        ? inspectionsList
        : new InspectionsList(
            inspectionsList?.queue,
            inspectionsList?.currentIndex
          );
 
    if (
      inspListInstance?.currentItem &&
      query.itemUrl !== inspListInstance.currentItem
    ) {
      log.w(TAG, `Setting query item url manually for not reflecting state`);
      query.itemUrl = inspListInstance.currentItem;
    }
  }
 
  /**
   * Maximo-datasource lifecycle
   * @param {*} datasource
   * @param {Array} items
   */
  onAfterLoadData(datasource, items) {
     /* istanbul ignore else  */
    if ( datasource.name==='executeInspections' && items){
      items.forEach( item => this.prepareQuestionsToMobilePlatform(item));
    }

    this.checkLoadingData(datasource,  items);
   
    // Set page title
    const newTitle = this.getPageTitle(this.app.state, datasource.item);
    /* istanbul ignore else  */
    if (newTitle) {
      this.owner.state.pageTitle = newTitle;
    }
  }
 
  prepareQuestionsToMobilePlatform(item) {
    /* istanbul ignore else  */
    if (!this.app.device?.isMobile) {
      return;
    }

    const removeDuplicate = (list=[], key) => {
      let temp = [];
      list.forEach( item =>{
        /* istanbul ignore else  */
        if (!temp.find(i => i[key] === item[key])){
          temp.push(item);
        }
      });
      return temp.length ? temp : undefined;
    }
    item.inspquestionsgrp =  removeDuplicate(item.inspquestionsgrp, 'inspquestionid');
    item.inspquestionsgrp.forEach(questionGroup =>{

       /* istanbul ignore else  */
      if (questionGroup.inspfield){
        questionGroup.inspfield = removeDuplicate(questionGroup.inspfield, 'inspfieldid');
        questionGroup.inspfield.forEach(inspfield =>{
          inspfield.inspfieldoption = removeDuplicate(inspfield.inspfieldoption, 'inspfieldoptionid');
        });
      }

       /* istanbul ignore else  */
      if (questionGroup.inspquestionchild) {
        questionGroup.inspquestionchild = removeDuplicate(questionGroup.inspquestionchild, 'inspquestionid');
        questionGroup.inspquestionchild.forEach(questionChild =>{
          questionChild.inspfield = removeDuplicate(questionChild.inspfield, 'inspfieldid');
        });
      }
      
    });
  }
   /**
   * Handle Maximo-datasource load
   * When coming from a different context, and there's no data loaded (on disconnected for example),
   * run a forceSync to load Inspections data
   * @param {*} datasource
   * @param {Array} items
   */
    async checkLoadingData(datasource, items) {
 
      let mobileContainerMode = Device.get()?.isMaximoMobile;
      let incomingContext = this?.app?.state?.incomingContext;
      if (
        mobileContainerMode &&
        incomingContext &&
        datasource.items.length === 0
       
      ) {
       /* istanbul ignore else  */
        if (datasource.name === 'executeInspections'
        && this.app.state.incomingContext
        && items.length === 0 && !this.owner.state.syncRequested) {
 
          this.owner.state.syncRequested = true;
 
          await datasource.forceSync();
        }

     //istanbul ignore next
     if (datasource.name === 'executeInspections' && datasource?.items?.length === 0) {
      let errorMessage =
        'This record is not on your device. Try again or wait until you are online.';
      /* istanbul ignore else  */
      if (this.app && this.app.pages) {
        const executionPanelPage = this.app.pages.find(
          page => page.name === 'execution_panel'
        );
        /* istanbul ignore else  */
        if (executionPanelPage) {
          executionPanelPage.error(
            this.app.getLocalizedLabel('record_not_on_device', errorMessage)
          );
        }
      }
    }
      }
 
      if (datasource.items[0]?.inspectionresultid) {
        let metersList = [];
        for (let item of items) {
          let metersItem = this._listAssetLocMeters(item);
          metersList = metersList.concat(metersItem);
        }
        this.owner.state.metersList = metersList;
        let delta = this.checkDelta(datasource);
        await this.pushNewResult(datasource, delta);
      }


       /* istanbul ignore else  */
    if ( datasource.name==='executeInspections'){
      UIBus.emit('inspections-load-form');
    }
 
    }
 
  /**
   * Define title after load of inspection
   * Checks the amount of inspections in the queue to set title
   * @param {Object} page
   * @returns {string} page title
   */
  getPageTitle({inspectionsList}, item) {
    return inspectionsList.size > 1
      ? this.app.getLocalizedLabel(
          'batch_inspections',
          'Batch inspection {0} of {1}',
          [inspectionsList.currentPosition, inspectionsList.size]
        )
      : item.computedPageTitle;
  }
 
  /**
   * Save the new inspfieldresults on datasource and
   * emit inspections-reload-field to reload the
   * attachment fields with the new
   * inspfieldresults created
   * @param {Object} datasource
   * @param {Array} delta array that contains all new inspfieldresults to be saved
   */
  async pushNewResult(datasource, delta) {
    if (delta.length) {
      let inspection = datasource.items[0];
      for (let i = 0; i < delta.length; i++) {
        //istanbul ignore next
        if (!inspection.inspfieldresult) {
          inspection.inspfieldresult = [];
        } 
        inspection.inspfieldresult.push(delta[i]);
      }
 
      try {
        UIBus.emit('inspection-block');
        await datasource.save();
        UIBus.emit('inspections-load-update');
      } catch (err) {
        //istanbul ignore next
        log.e(TAG, err);
      }
    }
  }
 
  /**
   * Compute an array containing new inspfieldresults fields
   * @param {Object} datasource
   * @returns {Array} array that contains all new inspfieldresults for the inspection result
   */
  checkDelta(datasource) {
    let app = null;
 
    //istanbul ignore else
    if (datasource.options.appResolver) {
      app = datasource.options.appResolver();
    }
    //istanbul ignore next
    const executor = app ? app.client.userInfo : undefined;
 
    let newAllResults = [];
    //istanbul ignore else
    if (datasource.items && datasource.items[0]) {
      let form = datasource.items[0];
      //istanbul ignore else
      if (Object.keys(form).length && form.inspquestionsgrp) {
        const inspquestionsgrp = form.inspquestionsgrp;
        for (const question of inspquestionsgrp) {
          if (isGroupQuestion(question)) {
            const inspquestionchild = question.inspquestionchild;
            if (inspquestionchild && inspquestionchild.length){
              for (const questionChild of inspquestionchild) {
                const fields = questionChild.inspfield;
                const newResults = this.findNewResult(form, fields, executor);
                //istanbul ignore else
                if (newResults && newResults.length) {
                  for (const result of newResults) {
                    newAllResults.push(result);
                  }
                }
              }
            }
           
          } else {
            const fields = question.inspfield;
            const newResults = this.findNewResult(form, fields, executor);
            //istanbul ignore else
            if (newResults && newResults.length) {
              for (const result of newResults) {
                newAllResults.push(result);
              }
            }
          }
        }
      }
    }
    return newAllResults;
  }
 
  /**
   * Compute an array containing inspfieldresults for field with type 'FU'
   * @param {Object} form datasource items
   * @param {Object} fields inspquestionsgrp or inspquestionchild
   * @param {Object} executor app.client.userInfo
   * @returns {Array} array that contains all new inspfieldresult for the field passed
   */
  findNewResult(form, fields, executor) {
    let newResults = [];
 
    //istanbul ignore next
    if (!executor) {
      this.app.toast('Missing executor');
      return;
    }
    //istanbul ignore else
    if (fields && fields.length) {
      const possibleFieldTypes = ['FU', 'SIG', 'MO', 'MOD'];
      for (const field of fields) {
        //istanbul ignore else    
      if (possibleFieldTypes.includes(field.fieldtype)) {
          //istanbul ignore else
          if (
            (form.inspfieldresult &&
              !form.inspfieldresult.some(
                item => item.inspfieldnum === field.inspfieldnum
              )) ||
            !form.inspfieldresult
          ) {
            newResults.push({
              inspformnum: form.inspformnum,
              revision: form.revision,
              resultnum: form.resultnum,
              orgid: form.orgid,
              siteid: form.siteid,
              enteredby: executor.personid,
              entereddate:  this.app.dataFormatter.convertDatetoISO(new Date()),
              inspquestionnum: field.inspquestionnum,
              inspfieldnum: field.inspfieldnum,
              inspfieldresultselection:[]
            });
          }
        }
      }
    }
    return newResults;
  }
 
  /**
   * Function to return a list of Meters from Inspection Assets and Locations
   * @param {object} item - Inspection Result item
   * @returns {Array} Array of items.
   */
  _listAssetLocMeters(item) {
    let metersList = [];
    let assetItem, assetMeter, locationItem, locationMeter;
    if (item.assets) {
      for (let i = 0; i < item.assets.length; i++) {
        assetItem = item.assets[i];
        //istanbul ignore else
        if (assetItem.assetmeter) {
          for (let j = 0; j < assetItem.assetmeter.length; j++) {
            // istanbul ignore else
            if (assetItem.assetmeter[j].active) {
              assetMeter = {
                ...assetItem.assetmeter[j],
                type: 'assetMeter'
              };
              metersList.push(assetMeter);
            }
          }
        }
      }
    }
    if (item.locations) {
      for (let i = 0; i < item.locations.length; i++) {
        locationItem = item.locations[i];
        if (locationItem.locationmeter) {
          for (let j = 0; j < locationItem.locationmeter.length; j++) {
            // istanbul ignore else
            if (locationItem.locationmeter[j].active) {
             locationMeter = {
                ...locationItem.locationmeter[j],
                type: 'locationMeter'
              };
              metersList.push(locationMeter);
            }
          }
        }
      }
    }
    return metersList;
  }
 
  /**
   * Computed title for Page
   * @param {object} item - Inspection Result item.
   */
  _computePageTitle(item) {
    let type = item.referenceobject;
    let name = null;
    if (type === 'PARENTWO') {
      name = this.app.getLocalizedLabel('batch_title', 'Batch');
    } else if (
      (type === 'WORKORDER' || type === 'WOACTIVITY') &&
      item.workorder &&
      item.workorder[0]
    ) {
      name = item.workorder[0].worktype
        ? item.workorder[0].worktype + ' ' + item.workorder[0].wonum
        : item.workorder[0].wonum;
    } else {
      name = this.app.getLocalizedLabel('inspections_title', 'Inspections');
    }
    return name;
  }
 
  /**
   * Computed title for Question Sliding drawer
   * @param {object} item - Inspection Result item.
   */
  _computeSlidingDrawerTitle(item) {
    let name = null;
    if (item.inspectionform) {
      name = `${item.inspectionform.name} `;
    }
 
    if (item.workorder && item.workorder[0]) {
      name += `${
        item.workorder[0].worktype
          ? item.workorder[0].worktype + ' ' + item.workorder[0].wonum
          : ''
      }`;
    }
    return name;
  }
 
  /**
   * Function to format the Asset Info
   * @param {object} item - Inspection Result item.
   */
  _computeAsset(item) {
    return this.app.callController('_computeAsset', item);
  }
 
  /**
   * Function to format the Location Info
   * @param {object} item - Inspection Result item.
   */
  _computeLocation(item) {
    return this.app.callController('_computeLocation', item);
  }

  /**
   * Computed label for the button (Complete or Review)
   * @param {object} item - Inspection Result item.
   */
   _computeButtonLabel(item) {
    let computedButtonLabel = null;
    
    if (this.app.state.enablereview && item.inspectionform.enablereview && (item.status_maxvalue === 'INPROG')){
      let reviewLabel = this.app.state.reviewStatusValue;
      computedButtonLabel = reviewLabel.charAt(0).toUpperCase() +  reviewLabel.slice(1).toLowerCase();
    } else {
      computedButtonLabel =  this.app.getLocalizedLabel('complete', 'Complete');
    }
    return computedButtonLabel;
  }






}
export default ExecutionFormDataController;
