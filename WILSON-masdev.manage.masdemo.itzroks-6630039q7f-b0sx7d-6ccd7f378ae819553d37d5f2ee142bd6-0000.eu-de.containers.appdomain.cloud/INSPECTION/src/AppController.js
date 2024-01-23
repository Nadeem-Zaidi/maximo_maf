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

import {Device, log} from '@maximo/maximo-js-api';
import {windowOrGlobal} from '@maximo/maximo-js-api/build/Constants';

import MaximoMapConfigurationLoader from '@maximo/map-component/build/ejs/framework/loaders/MaximoMapConfigurationLoader';
import MapConfigurationLoader from '@maximo/map-component/build/ejs/framework/loaders/MapConfigurationLoader';
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';

import StorageManager from '@maximo/map-component/build/ejs/framework/storage/StorageManager';
import LocalStorageManager from '@maximo/map-component/build/ejs/framework/storage/LocalStorageManager';
import FileSystemStorageManager from '@maximo/map-component/build/ejs/framework/storage/FileSystemStorageManager';
import InspectionsList from './components/common/InspectionsList';
import {STATUS} from './Constants';

const TAG = 'AppController';

class AppController {
  /**
   * App initialization lifecycle. Check for context and directs to the
   * page with the respective params on the context received.
   * @param {Object} app
   */

  applicationInitialized(app) {
    this.app = app;

    this.app.state.inspectionsList = new InspectionsList();
    if (sessionStorage.getItem('attachmentsInMemory')) {
      this.app.state.attachmentsInMemory = JSON.parse(sessionStorage.getItem('attachmentsInMemory')) ;
    } else {
      this.app.state.attachmentsInMemory = {};
    }

    MapConfigurationLoader.setImplementation(MaximoMapConfigurationLoader);

    //if mobile
    // storage implementation - filesystem
    let device = Device.get();
    let mobileContainerMode = device.isMaximoMobile;
    if (mobileContainerMode) {
      StorageManager.setImplementation(FileSystemStorageManager);
      this.app.state.assignedWhereClause = '';
    } else {
      StorageManager.setImplementation(LocalStorageManager);
      this.app.state.assignedWhereClause = 'status!=CAN';
    }

    //istanbul ignore next
    this.setupMap();

    this.setupIncomingContext();

    this.getSystemProperties();

    this.getMviSystemProperty();

    this.getStatusProperties(this.app);
    
    /* istanbul ignore next */
    if (!windowOrGlobal.Speech) {
      log.t(TAG, 'cordova Speech not injected');
      if (windowOrGlobal.parent.Speech) {
        windowOrGlobal.Speech = windowOrGlobal.parent.Speech;
        log.t(TAG, 'cordova Speech injected from parent');
      }
    }
    this.app.state.completedItems = {};
  }

  /**
   * Set map configuration
   */
  //istanbul ignore next
  setupMap() {
    this.mapPreloadAPI = new MapPreLoadAPI();
    this.mapPreloadAPI
      .validateMapConfiguration(this.app)
      .then(validMapConfiguration => {
        this.app.state.isMapValid = validMapConfiguration;
      })
      .catch(error => {
        this.app.state.isMapValid = false;
        log.t(TAG, 'validateMapConfiguration: ', error);
      });
  }

  /**
   * Function to get the Synonym Domains for Inspections
   */
  //istanbul ignore next
  async loadStatusSynonymDomain(){
    if (!this.app.state.inspectionStatusValues){
      await this.getInspStatusValues(this.app.findDatasource('synonymdomainDataInsp'));
      this.app.state.reviewStatusValue = this.getReviewStatusValue(this.app.state.inspectionStatusValues);
    }
  }

  /*******
  * Function to populate a state with the Inspection Status Values from SynonymDomain
  */

    async getInspStatusValues(datasource) {
      //istanbul ignore next
      let ds = datasource;
      this.app.state.inspectionStatusValues = await this.getInspStatus(ds);
  
    }
    //istanbul ignore next
    async getInspStatus(datasource) {
      let synonymDomainsDS = datasource;
      synonymDomainsDS.clearQBE();
      synonymDomainsDS.setQBE('domainid', 'INSPRESULTSTATUS');
      synonymDomainsDS.setQBE('defaults',true);
      let inspDomainStatus = await synonymDomainsDS.searchQBE();
      return inspDomainStatus;
    }
  
    /**
    * Function to populate a state with the Inspection Review Status Value from SynonymDomain
    */
    getReviewStatusValue(inspectionStatusValues) {
      let statusDomainValues = inspectionStatusValues;
      let reviewStatus = '';
      statusDomainValues.forEach((item) => {
        if (item.maxvalue.includes('REVIEW')) {
          reviewStatus = item.value;
        }
      });
      return reviewStatus;
    }


  /**
   * Function to get the System Properties
   */
  //istanbul ignore next
  async getSystemProperties() {
    try {
      this.app.state.savegeolocation = false;
      let savegeolocation = this.app.client.systemProperties['mxe.mobile.inspection.features.savegeolocation'];
      if (savegeolocation && savegeolocation === '1') {
        this.app.state.savegeolocation = true;
      }
    } catch (err) {
      log.e(TAG, 'Error: ' + err);
      log.i(TAG, 'Cannot load system properties.');
    }
  }

  /**
   * Function to get the System Properties for Status
   */
  async getStatusProperties(app) {
    this.app = app;
    try {
      //istanbul ignore next
      this.app.state.enablereview = false;
      //istanbul ignore next
      let enableReview = this.app.client.systemProperties['mxe.mobile.inspection.features.enablereview'];
      //istanbul ignore next
      if (enableReview && enableReview === '1') {
        this.app.state.enablereview = true;
      }
    } catch (err) {
      log.e(TAG, 'Error: ' + err);
      log.i(TAG, 'Cannot load system properties.');
    }
  }

  /**
   * Function to get the System Property for MVI
   */
  //istanbul ignore next
  async getMviSystemProperty() {
    try {
      this.app.state.mviIntegration = false;
      let mviIntegration = this.app.client.systemProperties['mxe.mobile.inspection.features.mviintegration'];
      if (mviIntegration && mviIntegration === '1') {
        this.app.state.mviIntegration = true;
      }
    } catch (err) {
      log.e(TAG, 'Error: ' + err);
      log.i(TAG, 'Cannot load system properties.');
    }
  }

  onContextReceived() {
    this.setupIncomingContext();
  }

  setupIncomingContext() {
    const incomingContext = this?.app?.state?.incomingContext;
    //istanbul ignore else
    if (incomingContext) {
      if (
        incomingContext.page &&
        incomingContext.inspectionresultid &&
        incomingContext.href
      ) {
        this.app.state.inspectionsList = new InspectionsList(
          incomingContext.href
        );
        this.app.setCurrentPage({
          name: incomingContext.page,
          resetScroll: true,
          params: {
            inspectionresultid: incomingContext.inspectionresultid,
            itemhref: incomingContext.href,
            editTrans: incomingContext.editTrans
          }
        });
      } else {
        if (incomingContext.uid) {
          this.app.setCurrentPage({
            name: 'transition_page',
            resetScroll: true,
            params: {
              isBatch: false,
              inspectionresultid: incomingContext.uid,
              editTrans: incomingContext.editTrans
            }
          });
        } else if (incomingContext.params) {
          this.app.setCurrentPage({
            name: 'transition_page',
            resetScroll: true,
            params: {
              isBatch: true,
              inspectionresultid: incomingContext.params.ids,
              itemhref: incomingContext.params.hrefs,
              editTrans: incomingContext.editTrans
            }
          });
          //istanbul ignore else
        } else if (incomingContext.href) {
          this.app.setCurrentPage({
            name: 'execution_panel',
            resetScroll: true,
            params: {
              itemhref: incomingContext.href,
              editTrans: incomingContext.editTrans
            }
          });
        }
      }
    }
  }

  /**
   * Format, filter and return all valid values as an array
   * @param {Number | Array} inspectionresultid - inspection result values
   * @returns {Array} array containing all valid inspection result ids
   */
  getInspectionResultId(inspectionresultid) {
    let inspectionResultIdArray = [];
    //istanbul ignore else
    if (inspectionresultid) {
      inspectionResultIdArray = Array.isArray(inspectionresultid)
        ? inspectionresultid
        : [inspectionresultid];
    }
    inspectionResultIdArray = inspectionResultIdArray.filter(item => {
      return typeof item === 'number';
    });
    return inspectionResultIdArray;
  }

  /**
   * clear the ds search;
   * @param {ds} is database name
   */
  async clearSearch(ds) {
    /* istanbul ignore else  */
    if (ds && ds.lastQuery.qbe && JSON.stringify(ds.lastQuery.qbe) !== '{}') {
      ds.clearQBE();
      await ds.searchQBE(undefined, true);
    }
  }

  async checkBatchStatus(option) {
    let parentOption = null;
    const ds = this.app.findDatasource('assignedworkds');

    if (ds === undefined) {
      return parentOption;
    }

    await ds.forceReload();

    //istanbul ignore next
    await ds.initializeQbe();
    ds.setQBE('referenceobject', 'PARENTWO');
    ds.setQBE('referenceobjectid', option.item.parent);

    //istanbul ignore next
    let batchRecord = await ds.searchQBE();
    const batchSiblins = batchRecord[0]?.batchlist?.filter(
      item => item.inspectionresultid !== option.item.inspectionresultid
    );

    await this.clearSearch(ds);
    if (
      batchSiblins?.every(batch => batch.status_maxvalue === option.newStatus)
    ) {
      parentOption = {
        item: batchRecord[0],
        datasource: ds,
        newStatus: option.newStatus
      };
      //istanbul ignore else
    } else if (
      batchSiblins?.every(
        batch =>
          batch.status_maxvalue !== STATUS.INPROG &&
          batch.status_maxvalue !== STATUS.PENDING
      ) &&
      batchSiblins?.some(batch => batch.status_maxvalue === STATUS.COMPLETED)
    ) {
      parentOption = {
        item: batchRecord[0],
        datasource: ds,
        newStatus: STATUS.COMPLETED
      };
    }
    return parentOption;
  }

  /**
   * For offline this function checks the inspresultstatus synonymdomain
   * to get all valid statuses for inspresultstatus object.
   * For online it checks the allowedstates.
   * Then it changes the inspectionresult status to the new external status value
   * @param {Object} option - Expects datasource, inspection result item and newStatus.
   * @returns {Promise} function to change inspection result status
   */
  async changeResultStatus(option) {
    let domainItem;
    let statusList;
    let device = Device.get();
    let maximoMobileContainerMode = device.isMaximoMobile;
    statusList = await this.buildStatusList(option);

    //istanbul ignore else
    if (statusList) {
      domainItem = statusList.find(item => item.maxvalue === option.newStatus);
      let isOffline = !this.app.state.networkConnected;
      //istanbul ignore else
      if (domainItem) {
        if (
          option.item.parent &&
          ['COMPLETED', 'CAN', 'REVIEW'].includes(option.newStatus) &&
          maximoMobileContainerMode &&
          isOffline
        ) {
          const parentOption = await this.checkBatchStatus(option);
          //istanbul ignore else
          if (parentOption) {
            await this.invokeChangeResultStatus(domainItem, parentOption);
            await parentOption.datasource.forceReload();
          }
        }
        return await this.invokeChangeResultStatus(domainItem, option);
      }
    }
  }

  /**
   * For offline this function checks the inspresultstatus synonymdomain
   * to get all valid statuses for inspresultstatus object.
   * For online it checks the allowedstates.
   * @param {Object} option - Expects inspection result item
   * @returns {Array} status array list
   */
  async buildStatusList(option) {
    let device = Device.get();
    let maximoMobileContainerMode = device.isMaximoMobile;

    let statusList;
    if (maximoMobileContainerMode) {
      statusList = await this.getOfflineInspResultStatusList(option);
    } else {
      statusList = this._buildInspResultStatusSet(option);
    }
    return statusList;
  }

  /**
   * Call changeResultStatus invokeAction to change the status of the inspectionresult
   * @param {Object} option - Expects domainItem with attributes from new status and datasource
   * @returns {Promise} function to change inspection result status
   */
  async invokeChangeResultStatus(domainItem, option) {
    let datasource = option.datasource;

    // istanbul ignore else
    const record = option.item;
    return datasource.invokeAction('changeResultStatusMobile', {
      record: record,
      parameters: {
        status: domainItem.value
      },
      waitForUpload: true,
      responseProperties: 'status, inspectionresultid',
      localPayload: {
        status: domainItem.value,
        status_maxvalue: domainItem.maxvalue,
        status_description: domainItem.description
      }
    });
  }

  /**
   * Build inspection result status list from allowed states.
   * @param {Object} allowedStates - allowed states object.
   * @returns {Array} status array
   */
  _buildInspResultStatusSet(evt) {
    let statusArr = [];
    const allowedStates = evt.item.allowedstates
      ? evt.item.allowedstates
      : evt.item.allowedStates;
    // istanbul ignore else
    if (allowedStates) {
      Object.entries(allowedStates).forEach(([key, value]) => {
        // istanbul ignore else
        if (value) {
          // istanbul ignore next
          value.forEach(statValue => {
            if (
              statValue.defaults &&
              this._isValidTransitionMaxVal(
                evt.item.status_maxvalue,
                statValue.maxvalue
              )
            ) {
              statusArr.push({
                id: statValue.value,
                value: statValue.value,
                maxvalue: statValue.maxvalue,
                description: statValue.description,
                _bulkid: statValue.value
              });
            }
          });
        }
      });
    }
    return statusArr;
  }

  /**
   * Build inspection result status list from inspection synonymdomain.
   * @param {Object} evt - inspection result object.
   * @returns {Array} status array
   */
  async getOfflineInspResultStatusList(evt) {
    let statusArr = [];
    let defOrg = evt.item?.orgid;
    let defSite = evt.item?.siteid;
    let synonymDomainsDS = this.app.findDatasource('synonymdomainDataInsp');

    synonymDomainsDS.clearState();
    await synonymDomainsDS.initializeQbe();
    synonymDomainsDS.setQBE('domainid', 'INSPRESULTSTATUS');
    synonymDomainsDS.setQBE('orgid', defOrg);
    synonymDomainsDS.setQBE('siteid', defSite);

    let filteredDomainValues = await synonymDomainsDS.searchQBE();

    // istanbul ignore next
    if (filteredDomainValues && filteredDomainValues.length < 1) {
      synonymDomainsDS.setQBE('orgid', '=', defOrg);
      synonymDomainsDS.setQBE('siteid', '=', 'null');
      filteredDomainValues = await synonymDomainsDS.searchQBE();

      // istanbul ignore next
      if (filteredDomainValues && filteredDomainValues.length < 1) {
        synonymDomainsDS.setQBE('orgid', '=', 'null');
        synonymDomainsDS.setQBE('siteid', '=', 'null');
        filteredDomainValues = await synonymDomainsDS.searchQBE();
      }
    }
    filteredDomainValues.forEach(element => {
      // istanbul ignore next
      if (
        evt.editTrans ||
        (element.value &&
          element.value !== evt.item.status &&
          element.defaults &&
          this._isValidTransitionMaxVal(
            evt.item.status_maxvalue,
            element.maxvalue
          ))
      ) {
        statusArr.push({
          id: element.value,
          value: element.value,
          description: element.description,
          defaults: element.defaults,
          maxvalue: element.maxvalue,
          _bulkid: element.value
        });
      }
    });
    return statusArr;
  }

  /**
   * Function to format the Asset Info
   * @param {object} item - Inspection Result item.
   */
  _computeAsset(item) {
    let assetinfo = null;
    if (item) {
      if (item.assets && item.assets[0].assetnum) {
        assetinfo = item.assets[0].description
          ? item.assets[0].assetnum + ' ' + item.assets[0].description
          : item.assets[0].assetnum;
      }
    }
    return assetinfo;
  }

  /**
   * Function to format the Location Info
   * @param {object} item - Inspection Result item.
   */
  _computeLocation(item) {
    let locationinfo = null;
    if (item) {
      if (item.locations && item.locations[0].location) {
        locationinfo = item.locations[0].description
          ? item.locations[0].location + ' ' + item.locations[0].description
          : item.locations[0].location;
      }
    }
    return locationinfo;
  }

  /**
   * This method checks status transition based on internal values.
   * @param from This the maxvalue (internal value) for current status.
   * @param to This the maxvalue (internal value) for status you want
   * to transition to.
   */
  _isValidTransitionMaxVal(from, to) {
    log.t(TAG, 'isValidTransition : from --> ' + from + ' to --> ' + to);
    let transitionMatrix = {
      CAN: [],
      COMPLETED: ['CAN'],
      INPROG: ['PENDING', 'COMPLETED', 'CAN', 'REVIEW'],
      PENDING: ['INPROG', 'COMPLETED', 'CAN'],
      REVIEW: ['COMPLETED', 'CAN']
    };

    if (!transitionMatrix[from] || transitionMatrix[from].indexOf(to) < 0) {
      // Not a valid transition ..
      log.t(TAG, 'isValidTransition : Not a valid transition .. ');
      return false;
    } else {
      // Is a valid transition ..
      log.t(TAG, 'isValidTransition : Is a valid transition .. ');
      return true;
    }
  }
}
export default AppController;
