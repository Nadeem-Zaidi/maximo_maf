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

import { log, ObjectUtil, wait, AppSwitcher ,Device} from '@maximo/maximo-js-api';

import {UIBus} from '@maximo/react-components';
import refStore from './stores/refStore';
import {
  isGroupQuestion,
  getMergedDateTimeValue
} from './components/common/utils';
import InspectionsList from './components/common/InspectionsList';
import { Permissions } from '@maximo/maximo-js-api';
import VoiceSDK from './components/react/Voice/sdk/voice-sdk';
import { STATUS } from './Constants'

const TAG = 'ExecutionFormPageController';

class ExecutionFormPageController {
  constructor() {
    log.d(TAG, 'created');
    this.checkFormLoaded.bind(this);
    this.editImage.bind(this);
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.app.state.isFormExecutionLoaded = false;
    this.page.state.defectCivilAccess = this.app.checkSigOption(
      'CIMOBILEDEFECT.READ'
    );
    //initialize meterList as empty array
    page.state.metersList = [];
  }

  async editImage(event) {
    const app  = event.app;
    const inspfieldresult = app.findDatasource('inspfieldresult');
    let temp = JSON.parse(JSON.stringify(event.LoadedObject));
    await inspfieldresult.load({
      src: temp,
      noCache: true
    });

    app.currentPage.state.activeImageRef = event.activeImageRef;
    app.state.LoadedObject = inspfieldresult.item;
    app.currentPage.showDialog('imageInferenceEdit');
  }


  loadApp(args = {}) {
    let appName = args.appName ? args.appName : undefined;
    let breadcrumbData = {
      returnName: this.app.getLocalizedLabel(
        'return_to_app',
        'Returning to {0}',
        [this.app.name]
      ),
      enableReturnBreadcrumb: true
    };
    if (!appName) {
      log.e(TAG, 'loadApp : appName required for navigation.', args);
      return;
    }
    let options = args.options ? args.options : { canReturn: true };
    //istanbul ignore next
    const currentLocation = args.locations?.length
      ? args.locations[0]
      : undefined;
    const currentAsset = args.asset?.length ? args.asset[0] : undefined;
    const page = args.page ? args.page : undefined;
    let context = { location: currentLocation, asset: currentAsset, page: page };
    let switcher = AppSwitcher.get();
    context.breadcrumb = breadcrumbData;
    switcher.gotoApplication(appName, context, options);
  }

  pageResumed(page, app) {
    log.d(TAG, 'pageResumed');
    UIBus.on('show-image-inference-edit', this.editImage);
    this.page = page;
    this.app = app;
    this.page.state.summaryinprogress = false;
    this.page.state.completeinprogress = false;
    this.app.state.loadingForm = true;

    let { inspectionsList } = this.app.state;
    this.page.state.editTrans = this.page.params.editTrans;

    if (
      app.state.incomingContext &&
      (app.state.incomingContext.uid || app.state.incomingContext.params)
    ) {
      app.pageStack[0] = 'main';
      app.state.incomingContext = '';
    }
    // Use href attribute as reference
    //istanbul ignore else
    if (this.page.params?.itemhref) {
      const paramsArray = Array.isArray(this.page.params.itemhref)
        ? this.page.params.itemhref
        : this.page.params.itemhref.split(',');
      if (this.page.params.forceReload) {
        let temp = [];
        temp.push(this.page.params.itemhref);
        this.app.state.inspectionsList = new InspectionsList(temp);
      } else if (!inspectionsList || !inspectionsList.isEqual?.(paramsArray)) {
        this.app.state.inspectionsList = new InspectionsList(paramsArray);
      }
    }

    // Sets default page title
    this.page.state.pageTitle = this.app.getLocalizedLabel(
      'inspections_title',
      'Inspections'
    );

    //reset filter
    //istanbul ignore else
    if (this.page.datasources && this.page.datasources.executeInspections) {
      this.page.datasources.executeInspections.clearInMemoryFilter();
    }

    //reset tagGroupToggles to default
    this.page.state.tagGroupTogglesData1 = [
      {
        label: this.app.getLocalizedLabel('to_do', 'To Do'),
        attribute: 'toDo',
        selected: false
      },
      {
        label: this.app.getLocalizedLabel('done', 'Done'),
        attribute: 'done',
        selected: false
      },
      {
        label: this.app.getLocalizedLabel('required', 'Required'),
        attribute: 'required',
        selected: false
      }
    ];

    log.t(TAG, 'Show Inspections', page.params.inspectionresultid, page.name);
    //istanbul ignore else
    if (!page.params.itemhref) {
      this.app.toast('Missing page parameter ids');
      return;
    }

    //istanbul ignore else
    if (page?.params?.forceStart && page.params?.itemToLoad) {
      this.startForm(page.params.itemToLoad);
    }

    // reset voice checking status
    this.page.state.isCheckingVoiceStatus = false;
    if (!this.app.state.isBackFromhVoiceInspection) {
      log.d(TAG, 'reset mic icon status');
      // reset mic icon status if not back from voice inspetion page (come from inpection list page)
      this.app.state.hideMicIcon = true;
      this.app.state.disableMicIcon = true;
    }
    this.page.state.keepSearch = false;

    if(this.page.datasources.executeInspections?.options?.selectedRecordHref){
      this.page.datasources.executeInspections.options.selectedRecordHref = null
    }

    this.page.datasources.executeInspections.load({itemUrl: this.app.state.inspectionsList.currentItem});
    
  }

  pagePaused() {
    log.d(TAG, 'pagePaused');

    UIBus.off('show-image-inference-edit', this.editImage);
   
    // leaving this page: clear voice related state
    this.app.state.isBackFromhVoiceInspection = false;
  }

  /**
   * Curry function to validate if item matches conditions
   * @param {Object} filterObj - attribute filter as key and boolean statement as key
   * @returns {Boolean} - true if matches, false otherwise
   */
  filterData(filterObj) {
    return item => {
      let shouldFilter = false;
      //first level, should always be visible
      if (
        (!item.inspquestionid && !item.inspfieldid) ||
        !Object.keys(filterObj).length
      ) {
        shouldFilter = true;
      }

      //if it is a group question, check the conditions on the children first
      else if (isGroupQuestion(item)) {
        if (
          item.inspquestionchild.some(child =>
            this.matchesConditions(child, filterObj)
          )
        ) {
          shouldFilter = true;
        }
      }

      //check the conditions on the current item
      else if (this.matchesConditions(item, filterObj)) {
        shouldFilter = true;
      }
      return shouldFilter;
    };
  }

  /**
   * Auxiliary method to validate if item matches conditions
   * @param {Object} item - item to be filtered
   * @param {Object} filterObj - attribute filter as key and boolean statement as key
   * @returns {Boolean} - true if matches, false otherwise
   */
  matchesConditions(item, filterObj) {
    let itMatches = true;
    return Object.keys(filterObj).every(key => {
      //visible undefined means it's visible
      if (key === 'visible' && item[key] === undefined) {
        itMatches = true;
      }
      //check for other filters
      else if (Boolean(item[key]) !== filterObj[key]) {
        itMatches = false;
      }
      return itMatches;
    });
  }

  /**
   * Handle changing toggle to toDo, done and required
   * @param {Array} tagGroupData - array containing the current tagGroupData
   * @param {Object} toggleData - object with new toggleData event
   */
  async changeToggle(tagGroupData, toggleData) {
    let inspectionsDS = this.page.datasources.executeInspections;
    //istanbul ignore else
    if (!this.page.state.keepSearch) {
      this.page.state.currentSearch = '';
    }
    let tags = tagGroupData;
    let toDoToggle = tagGroupData.find(element => element.attribute === 'toDo');
    let doneToggle = tagGroupData.find(element => element.attribute === 'done');
    let requiredToggle = tagGroupData.find(element => element.attribute === 'required');

    //toDo and done mutually exclusive
    //istanbul ignore else
    this.checkButtonsAndToggle(toggleData, toDoToggle, doneToggle, requiredToggle);

    //build the filterObj
    let filterObj = {};
    if (requiredToggle.selected) {
      filterObj = { ...filterObj, required: true, visible: true };
    }
    if (toDoToggle.selected) {
      filterObj = { ...filterObj, completed: false, visible: true };
    }
    if (doneToggle.selected) {
      filterObj = { ...filterObj, completed: true, visible: true };
    }

    await wait(200);
    inspectionsDS.applyInMemoryFilter(this.filterData(filterObj));
    //istanbul ignore else
    if (toggleData) {
      inspectionsDS.emit('inpections-apply-custom-filter', inspectionsDS);
    }

    this.page.state.tagGroupTogglesData1 = JSON.parse(JSON.stringify(tags));
    this.page.state.currentSearch = undefined;
  }

  checkButtonsAndToggle(toggleData, toDoToggle, doneToggle, requiredToggle) {
    //istanbul ignore else
    if (toggleData) {
      if (toggleData.attribute === 'toDo') {
        toDoToggle.selected = toggleData.selected;
        doneToggle.selected = false;
      } else if (toggleData.attribute === 'done') {
        doneToggle.selected = toggleData.selected;
        toDoToggle.selected = false;
      } else if (toggleData.attribute === 'required') {
        requiredToggle.selected = toggleData.selected;
      }
    }
  }

  setSearchParamState(e) {
    //istanbul ignore else
    if (e.target.value.length === 1) {
      const tagGroupData = this.page.state.tagGroupTogglesData1;
      let toDoToggle = tagGroupData.find(element => element.attribute === 'toDo');
      let doneToggle = tagGroupData.find(element => element.attribute === 'done');
      let requiredToggle = tagGroupData.find(element => element.attribute === 'required');
      const toggles = [toDoToggle, doneToggle, requiredToggle]
      this.page.state.keepSearch = true;
      this.deselectToggles(toggles, tagGroupData);
      this.page.state.keepSearch = false;
    }
  }

  deselectToggles(toggles, tagGroupData) {
    toggles.filter(t => t.selected === true);
    //istanbul ignore else
    if (toggles) {
      toggles.forEach(toggle => {
        toggle.selected = false;
        this.changeToggle(tagGroupData, toggle);
      });
    }
  }

  filterQuestion(searchQuery) {
    let groupsFiltered = [];
    return item => {
      //form name should always be visible
      if (!item.inspquestionid && !item.inspfieldid) {
        return true;
      }
      else if (isGroupQuestion(item)) {
        if (this.isDescriptionIncludesQueryParam(item, searchQuery)) {
          groupsFiltered.push(item.groupid)
          return true
        }
        else if (item.inspquestionchild.some(child => this.isDescriptionIncludesQueryParam(child, searchQuery))) {
          return true;
        }
      }
      else if (groupsFiltered.includes(item.groupid)) {
        return true;
      }
      else {
        return this.isDescriptionIncludesQueryParam(item, searchQuery)
      }
    }
  }

  isDescriptionIncludesQueryParam(item, searchQuery) {
    return item.description.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  }

  acceptAllItems() {
    return item => true;
  }

  async handleQuestionSearch(event) {
    let inspectionsDS = this.page.datasources.executeInspections;
    if (event === '') {
      inspectionsDS.applyInMemoryFilter(this.acceptAllItems());
    }
    else {
      await wait(200);
      inspectionsDS.applyInMemoryFilter(this.filterQuestion(event));
      inspectionsDS.emit('inpections-apply-custom-filter', inspectionsDS);
      this.page.state.currentSearch = event; 
    }
  }

  /**
   * Compute countLabel, disableCompletion states
   * depending on formData data
   * @param {Object} counter - Contains counter state
   * @param {number} counter.totalCount - Counter of all questions.
   * @param {number} counter.completedCount - Complete counter of totalCount.
   * @param {number} counter.requiredTotalCount - Counter of all required questions.
   * @param {number} counter.requiredCompletedCount - Complete counter of requiredTotalCount.
   */
  computeFieldChanges({
    completedCount,
    totalCount,
    requiredCompletedCount,
    requiredTotalCount,
    rejectedTotalCount
  }) {
    const hasRejection = Boolean(rejectedTotalCount);

    const missingRequired = requiredTotalCount
      ? requiredCompletedCount !== requiredTotalCount
      : false;

    this.page.state.disableCompletion = hasRejection || missingRequired;

    let device = Device.get();
    let size = device.screen.size;

    if (size === 'sm') {
      let mobileCount = requiredTotalCount
        ? requiredCompletedCount
        : completedCount;
      let mobileTotalCount = requiredTotalCount
        ? requiredTotalCount
        : totalCount;
      this.page.state.countLabel = this.app.getLocalizedLabel(
        'mobile_question_of_counter',
        '{0}/{1}',
        [mobileCount, mobileTotalCount]
      );
    } else {
      if (!requiredTotalCount) {
        this.page.state.countLabel = this.app.getLocalizedLabel(
          'question_of_counter',
          '{0} of {1}',
          [completedCount, totalCount]
        );
      } else {
        this.page.state.countLabel = this.app.getLocalizedLabel(
          'required_question_of_counter',
          '{0} required of {1}',
          [requiredCompletedCount, requiredTotalCount]
        );
      }
    }
  }

  /**
   * Update state updateDialog to true
   */
  updateDialog() {
    this.page.state.updateDialog = true;
    this.page.state.saveInProgress = false;
  }

  /**
   * Distinguishes the type of drawer to open
   * @param {Object} payload - Contains item type and id
   */
  openInformation(payload) {
    const { type, resultId, questionId, groupId} = payload;
    let drawerParameters = {
      item: { inspectionresultid: resultId, questionId: questionId, type: type, groupId: groupId}
    };
    if (type && type === 'question') {
      this.openQuestionInstructionsDrawer(drawerParameters);
    }
  }

  /**
   * Function to open a sliding-drawer dialog to show Instructions
   * @param event should contain
   * item - The InspectionResult
   */
  async openFormInstructionsDrawer(event) {
    const { inspectionresultid, href } = event.item;
    let ds = this.page.datasources.inspFormInformation;
    await ds.load({
      noCache: true,
      itemUrl: `${href}`
    });

    const inspection = ds.items.length ? ds.items[0] : null;

    //istanbul ignore next
    if (!inspection) {
      log.e(TAG, `Unable to filter inspection(${inspectionresultid})`);
      return;
    }

    this.page.state.computedTitle = inspection.computedFormName;
    this.page.state.computedAsset = this.page.datasources.executeInspections.item.computedAsset;
    this.page.state.computedLocation = this.page.datasources.executeInspections.item.computedLocation;
    this.page.state.computedLongDescription =
      inspection.computedLongDescription;
    this.page.showDialog('drawer2');
  }

  /**
   * Function to open a sliding-drawer dialog to show Instructions
   * @param {object} item - Contains the InspectionForm.
   */
  async openQuestionInstructionsDrawer(params) {
    const {inspectionresultid, questionId, groupId} = params.item;
    const currentItem = this.app?.state?.inspectionsList?.currentItem;
    let ds = this.page.datasources.inspFormInformation;
    await ds.load({
      noCache: true,
      itemUrl: `${currentItem}`
    });

    const inspection = ds.items.length ? ds.items[0] : null;

    let question = null;

    if (groupId) {
      const groupQuestion = inspection?.inspquestionsgrp?.length
        ? inspection.inspquestionsgrp.find(i => i.groupid === groupId)
        : null;

      question = groupQuestion?.inspquestionchild?.length
        ? groupQuestion?.inspquestionchild.find(
            i => i.inspquestionid === questionId
          )
        : null;
    } else {
      question = inspection?.inspquestionsgrp?.length
        ? inspection.inspquestionsgrp.find(i => i.inspquestionid === questionId)
        : null;
    }

    if (!question) {
      log.e(
        TAG,
        `Unable to filter question(${questionId}) from inspection(${inspectionresultid})`
      );
      return;
    }

    this.page.state.computedTitle = question.description;
    this.page.state.computedAsset =
      this.page.datasources.executeInspections.item.computedAsset;
    this.page.state.computedLocation =
      this.page.datasources.executeInspections.item.computedLocation;
    this.page.state.computedLongDescription =
      question.description_longdescription;

    this.page.showDialog('drawer2');
  }

  /**
   * Open the Completion Summary page of the inspection
   * @param {object} item - Inspection item.
   */
  showCompletionSummary(item) {
    this.page.state.summaryinprogress = true;
    if (!this.app.state.inspectionsList?.currentItem) {
      const paramhref = Array.isArray(this.page.params.itemhref)
        ? this.page.params.itemhref
        : this.page.params.itemhref?.split(',');
      this.app.state.inspectionsList = new InspectionsList(paramhref);
    }
    this.app.setCurrentPage({
      name: 'inspcompletionsummary',
      resetScroll: true,
      params: {
        isBatch: this.page.params.isBatch,
        isBatchPreview: this.page.params.isBatchPreview,
        inspectionresultid: item.inspectionresultid,
        itemhref: item.href
      }
    });
  }
  /**
   * Change inspectionresult status from 'INPROG' to 'COMPLETED'
   * And open the Completion Summary page of the inspection
   * @param {object} item - Inspection Result item.
   */
  async completeForm(item) {
    this.page.state.completeinprogress = true;
    const currentDS = this.page.datasources['executeInspections'];
    let newStatus = STATUS.COMPLETED;
    let formEnableReview = item.inspectionform?.enablereview ? true : false;

    //istanbul ignore if
    if (this.app.state.enablereview && formEnableReview && (item.status_maxvalue === STATUS.INPROG)) {
      newStatus = STATUS.REVIEW;
    }

    const controllerOption = {
      item: item,
      datasource: currentDS,
      newStatus: newStatus,
      editTrans: this.page.state.editTrans
    };
    let device = Device.get();
    let isMaximoMobile = device.isMaximoMobile;
    let isOffline = !this.app.state.networkConnected;
    let editTrans = this.page.state.editTrans ? this.page.state.editTrans : false;

    //istanbul ignore else
    if (editTrans || (item.status_maxvalue === STATUS.INPROG) || (item.status_maxvalue === STATUS.REVIEW)) {

      let transactionOk = await this.app.callController('changeResultStatus', controllerOption);
      if (!transactionOk || 'Error' in transactionOk) {
        this.page.state.completeinprogress = false;
        return;
      }
      if(!this.app.state.completedItems){
        this.app.state.completedItems = {};
      }
      this.app.state.completedItems[item.inspectionresultid] = newStatus;
      await currentDS.forceReload();
      let currentItemStatus = currentDS.items[0]?.status_maxvalue;
      //On online
      //when meter is valid, return warning with message it was saved successfully
      //when meter is invalid, return the response with status still INPROG

      //On offline
      //return response._responsedata
      //On offline we don't know if the user updated the form
      //so we will always search for Execution errors
      //istanbul ignore else
      if ((currentItemStatus === STATUS.INPROG) || (currentItemStatus === STATUS.REVIEW) || (isMaximoMobile && isOffline)) {
        const fieldErrorId = this.findExecutionErrors(currentDS);
        //istanbul ignore else
        if (fieldErrorId) {
          this.goToInspfieldresultItem(fieldErrorId, 'field');
          this.page.state.completeinprogress = false;
          return;
        }
      }
    }
    if (newStatus === STATUS.COMPLETED) {
      this.showCompletionSummary(currentDS.items[0]);
    }
    else if (newStatus === STATUS.REVIEW && this.page.params.isBatch === true) {
      this.handleBatchReviewExecution();
    }
    else {
      this.showInspList();
    }
  }

  handleBatchReviewExecution() {
    const inspList = this.app.state.inspectionsList;
    if (inspList.isLast) {
      this.showInspList();
    } else {
      this.goToNext();
    }
  }

  /**
  * Open the main page - Inspections List
  */
  showInspList() {
    let switcher = AppSwitcher.get();
    if (switcher.hasReturnToApp()) {
      switcher.returnToApplication();
    } else {
      let mainPage = this.app.findPage('main');
      if (mainPage) {
        mainPage.clearStack = true;
        this.app.setCurrentPage(mainPage);
      }
    }
  }

  /**
   * Move queue pointer
   * @params {Object} item record
   */
  goToNext(_) {
    const inspList = this.app.state.inspectionsList;

    if (!inspList.isLast) {
      inspList.next();
      this.page.state.completeinprogress = false;
      // Duplicate set value to be observed
      this.app.state.inspectionsList = null;
      this.app.state.inspectionsList = inspList;
      this.app.state.loadingForm = true;
      this.page.datasources.executeInspections.load({itemUrl: this.app.state.inspectionsList.currentItem});
    }
  }

  /**
   * Return the first field id presenting errors from completion process
   * Look for errors thrown by completion request
   * @param {Object} datasource
   * @returns {string | null} fieldId
   */
  findExecutionErrors(datasource) {
    let fieldId = null;
    const [firstItem] = datasource.items;

    for (let i = 0; i < firstItem.inspfieldresult?.length; i++) {
      //istanbul ignore else
      if (firstItem.inspfieldresult[i].errorflag === 1) {
        fieldId = firstItem.inspfieldresult[i].inspfieldresultid;
        break;
      }
    }
    return fieldId;
  }

  // istanbul ignore next
  _getPermissions() {
    return Permissions.get();
  }
  doVoiceInspection(params) {
    let permissions = this._getPermissions();
    let successCallback = (event) => {
      // istanbul ignore else
      if (event.denied.indexOf(permissions.RECORD_AUDIO) === -1) {
        log.i(TAG, "doVoiceInspection", "Granted microphone permission.");
        this.app.setCurrentPage({
          name: 'voice_inspection',
          params: params
        });
        log.t(TAG, "doVoiceInspection", "go to voice_inspection page, params: ", params);
      }
    };
    let errorCallback = (e) => {
      log.e(TAG, "doVoiceInspection", "request microphone permission met error:", e);
      this.app.toast('Request microphone permission met error.');
    };
    permissions.requestPermissions([permissions.RECORD_AUDIO], successCallback, errorCallback);
  }

  /**
   * Change inspectionresult status from STATUS.PENDING to STATUS.INPROG
   * And reload datasource
   * @param {object} item - Inspection Result item.
   */
  async startForm(item) {
    
    this.app.state.isFormExecutionLoaded = false;
    const controllerOption = {
      item: item,
      datasource: this.page.datasources['executeInspections'],
      newStatus: STATUS.INPROG
    };

    //istanbul ignore else
    if (item.status_maxvalue === STATUS.PENDING) {
      let device = Device.get();
      let isMaximoMobile = device.isMaximoMobile;
      let isNetworkDisconnected = !this.app.networkManager.state.networkConnected;

      this.app
        .callController('changeResultStatus', controllerOption)
        .then((response) => {
          //istanbul ignore next
          if (response && response._responsedata) {
            ObjectUtil.mergeDeep(item, response._responsedata);
          } else {
            ObjectUtil.mergeDeep(item, response);
          }
          //istanbul ignore else
          if (isMaximoMobile && isNetworkDisconnected) {
            //istanbul ignore next
            this.page.datasources['executeInspections'].forceReload();
          }
        })
        //istanbul ignore next
        .catch(err => {
          //istanbul ignore next
          log.e(TAG, err);
        });
    }
  }

  /**
   * Handler of questions click from navigator
   * Invokes method that scrolls to item
   * @param {Object} item - data list item.
   * @param {string} item.inspfieldresultid - inspfieldresult identifier.
   */
  goToInspfieldresultItem({ inspfieldresultid } = {}) {
    this.goToItem(inspfieldresultid, 'field');
  }

  /**
   * Handler of questions click from navigator
   * Invokes method that scrolls to item
   * @param {Object} item - data list item.
   * @param {string} item.inspquestionid - question identifier.
   */
  goToInspectionItem({ inspquestionid } = {}) {
    this.goToItem(inspquestionid);
  }

  /**
   * Handler of inspections click from navigator
   * Invokes method that scrolls to item
   * @param {Object} item - data list item.
   * @param {string} item.inspectionresultid - inspection result identifier.
   */
  goToInspection({ inspectionresultid } = {}) {
    this.goToItem(inspectionresultid, 'inspection');
  }

  /**
   * Scrolls to item provided
   * @param {string} id - item identifier
   * @param {string} type - type of item provided
   */
  async goToItem(id, type = 'question') {
    await this.clearQuestionSearch();
    let ref = null;
    switch (type) {
      case 'question':
        ref = refStore.getQuestionRef(id);
        break;
      case 'field':
        ref = refStore.getInspFieldResultRef(id);
        break;
      default:
        ref = refStore.getInspectionRef(id);
        break;
    }

    if (ref) {
      try {
        ref.current.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
        //istanbul ignore else
        if (type !== 'field') {
          this.closeQuestionsDrawer();
        }
      } catch (e) {
        log.e(TAG, e);
      }
    }
  }

  async clearQuestionSearch() {
    if (this.page.state.currentSearch) {
      let inspectionsDS = this.page.datasources.executeInspections;
      inspectionsDS.applyInMemoryFilter(this.acceptAllItems());
      inspectionsDS.emit('inpections-apply-custom-filter', inspectionsDS);
      this.page.state.currentSearch = undefined;
    }
  }

  /**
   * Close navigator drawer
   */
  closeQuestionsDrawer() {
    this.page.findDialog('drawer1').closeDialog();
  }

  /**
   * Function called from the FormExecution component
   */
  checkFormLoaded() {
    this.app.state.isFormExecutionLoaded = true;
    this.checkVoiceStatus();
  }

  /**
   * returns response type based on fieldtype
   * @param {String} fieldtype - inspfield response type
   * @param {String} metertype - inspfield meter type
   * @returns {String} - inspfield response type
   */
  getResponse(inspfield, inspfieldresult) {
    const { fieldtype, metertype_maxvalue } = inspfield;
    const {
      dateresponse,
      timeresponse,
      txtresponse,
      numresponse,
      inspfieldresultselection
    } = inspfieldresult ?? '';
    let responseString = '';
    let responseArray = [];
    if (inspfieldresultselection) {
      for (let item of inspfieldresultselection) {
        if (item.txtresponse && item.txtresponse !== '')
          responseArray.push(item.txtresponse);
      }
      responseArray.sort();
      responseString = responseArray.join(', ');
    }
    let types = {
      TR: txtresponse,
      SO: txtresponse,
      SOD: txtresponse,
      SE: numresponse,
      MM: metertype_maxvalue === 'CHARACTERISTIC' ? txtresponse : numresponse,
      MO: responseString,
      MOD: responseString,
      DO: dateresponse,
      DT: getMergedDateTimeValue(dateresponse, timeresponse),
      TO: timeresponse
    };
    return types[fieldtype] ?? '';
  }

  /**
   * returns format type based on fieldtype
   * @param {String} fieldtype - inspfield response type
   * @returns {String} - format
   */
  getFormat(fieldtype) {
    let types = {
      DO: 'date',
      DT: 'datetime',
      TO: 'time'
    };
    return types[fieldtype];
  }

  /**
   * Build previousInspectionResultsList json datasource
   * and open previousResultsDrawer sliding-drawer
   * @param {Object} inspfield - inspfield event item
   */
  async openPreviousResultsDrawer(inspfield) {
    let previousInspectionResultsList = this.page.datasources[
      'previousInspectionResultsList'
    ];
    let inspectionList = [];
    const { description, inspfieldnum } = inspfield;
    let histResults =
      this.page.datasources?.executeInspections?.item?.histresults || [];
    this.page.state.historicFieldDescription = description;

    //istanbul ignore else
    if (histResults.length) {
      for (const histResult of histResults) {
        const inspfieldresult = histResult.inspfieldresult?.find(
          item => item.inspfieldnum === inspfieldnum
        );
        const response = this.getResponse(inspfield, inspfieldresult);
        const format = this.getFormat(inspfield.fieldtype);

        inspectionList.push({
          fielddescription: description,
          createdate: histResult.createdate,
          inspectionresultid: histResult.inspectionresultid,
          inspfieldresult: {
            response,
            format
          }
        });
      }
    }
    await previousInspectionResultsList.load({
      src: inspectionList,
      noCache: true
    });
    this.page.showDialog('previousResultsDrawer');
  }

  /**
   * Check if user have voice role
   * Check backend services availability
   * NOTE: this method may be invoked multiple times during loading this page
   */
  async checkVoiceStatus() {
    // for local debugging >>>>>>>>>>>>>>>>>>>>>>>>
    // sessionStorage.setItem('assist_url', 'https://localhost/');
    // sessionStorage.setItem('assist_port', 3100);
    // sessionStorage.setItem('access_token', '');
    // sessionStorage.setItem('assist_apikey', '7aecb79c-a9d9-41c3-8692-86891d9d6d25-40502200ae475d84ab6bf36cc2cb082e75127ddd');
    // sessionStorage.setItem('tenant_id', 'masdev');
    // Device.get().isMaximoMobile = true;
    // for local debugging <<<<<<<<<<<<<<<<<<<<<<<<

    if (!Device.get().isMaximoMobile) {
      log.d(TAG, 'suspend checking voice status: voice inspection is only available on maximo mobile');
      return;
    }

    if (this.app.state.isBackFromhVoiceInspection) {
      log.d(TAG, 'suspend checking voice status: back from voice inspection page');
      // back from voice inspeciton: no need to check again, keep the as-is status of 'hideMicIcon' and 'disableMicIcon'

      if (this.app.state.needUpdateInspectionResult) {
        this.app.state.needUpdateInspectionResult = false;
        let executeInspections = this.app.findDatasource('executeInspections');
        //istanbul ignore next
        if (executeInspections) {
          log.d(TAG, 'inspection result updated, force sync datasoure.');
          await executeInspections.forceSync();
        }
      }
      return;
    }

    if (this.page.state.isCheckingVoiceStatus) {
      log.d(TAG, 'suspend checking voice status: already in processing');
      return;
    }

    // waiting for datasource to be loaded
    if (!this.page.datasources?.executeInspections?.item?.inspectionform) {
      log.d(TAG, 'suspend checking voice status: datasource is not loaded');
      return;
    }

    const inspectionform = this.page.datasources.executeInspections.item.inspectionform;

    // since this method will be invoked multiple times, set a guard flag at here to prevent redundant parallel checks.
    this.page.state.isCheckingVoiceStatus = true;

    // set state variables to default values (hide and disable microphone icon)
    this.app.state.hideMicIcon = true;
    this.app.state.disableMicIcon = true;

    // only go on checks when this is a voice enabled form
    if (!inspectionform.audioguided) {
      log.d(TAG, 'suspend checking voice status: this form is not voice enabled');
      return;
    }

    // the user has already passed server authorization before, we can show the mic icon to him.
    // e.g. switch between execution form pages
    if (this.app.state.isVoiceUser) {
      this.app.state.hideMicIcon = false;
    }

    // the mobile network is offline, no need to do further checks by now.
    if (!this.app.state.networkConnected) {
      log.d(TAG, 'suspend checking voice status: network is offline');
      return;
    }

    let assistUrl = sessionStorage.getItem('assist_url');
    //istanbul ignore else
    if (!assistUrl) {
      const serverUrl = localStorage.getItem('serverUrl') || '';
      const regex = /\.(.+?)\./g;
      const match = regex.exec(serverUrl);
      //istanbul ignore else
      if (match && match.length > 0) {
        assistUrl = serverUrl.replace('.' + match[1] + '.', '.assist.');
      }
    }

    const assistPort = sessionStorage.getItem('assist_port') || 443;
    const accessToken = sessionStorage.getItem('access_token') || '';
    const apiKey = sessionStorage.getItem('assist_apikey') || '';
    const tenantId = sessionStorage.getItem('tenant_id') || '';

    const configs = {
      server: {
        host: assistUrl,
        port: assistPort,
        ssl: true,
        params: {
          checkStatus: true,
          sessionType: 'mxinspect',
          sessionParam: {
            orgId: inspectionform.orgid,
            formNum: inspectionform.inspformnum,
            revision: inspectionform.revision
          },
          stt: {
            enabled: true
          }
        },
        headers: {
          'x-access-token': accessToken,
          'x-api-key': apiKey,
          'x-tenant-id': tenantId
        }
      },
      speak: {
        enabled: false
      },
      play: {
        enabled: false
      },
      record: {
        enabled: false
      }
    };

    const callback = {
      onReady: () => {
        // We can connect to gateway server and pass the servie health checks, 
        // so the user should be able to use the voice inspection feature.
        this.app.state.hideMicIcon = false;
        this.app.state.disableMicIcon = false;
        // set a flag to indicate this user has assist voice role
        this.app.state.isVoiceUser = true;
      },
      onNotReady: (name, message) => {
        if (name === 'AuthenticateError') {
          // authorization failed
          this.app.state.hideMicIcon = true;
          this.app.state.disableMicIcon = true;
          this.app.state.isVoiceUser = false;

        } else {
          // passed authorization but servcie is unavailable
          this.app.state.hideMicIcon = false;
          this.app.state.disableMicIcon = true;
          this.app.state.isVoiceUser = true;
        }
      }
    }

    // connect to voice gateway server
    this.voiceSdk = new VoiceSDK();
    this.voiceSdk.init(configs, callback).then(() => {
      this.voiceSdk.start();
    }).catch(() => { });
  }

  getVoiceSdk() {
    return this.voiceSdk;
  }

}

export default ExecutionFormPageController;
