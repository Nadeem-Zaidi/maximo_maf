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

import {DataFormatter, log} from '@maximo/maximo-js-api';
import {mapSymbol, mapLegends} from './maps/MapUtils.js';
import 'regenerator-runtime/runtime';
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';

const TAG = 'InspListDataController';
class InspListDataController {

  constructor() {
    this.retrieveInspLegends.bind(this);
  }

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
    // istanbul ignore next
    this.mapPreloadAPI = new MapPreLoadAPI();
    
    if (this.app.state.savegeolocation && this.app.geolocation){
      // Update Geo Location
      this.app.geolocation.updateGeolocation();
      //set geolaction enabled state to false
      let geolocationState = this.app.geolocation.state;

      //istanbul ignore next
      if (geolocationState && ((geolocationState.latitude === 0 && geolocationState.longitude === 0) || geolocationState.hasError)) {
          geolocationState.enabled = false;
      } else {
          geolocationState.enabled = true;
      }
    }

    ds.addIgnoreField('computedButtonTheme');
    ds.addIgnoreField('computedCompletedDate');
    ds.addIgnoreField('computedQuestions');
    ds.addIgnoreField('computedTitle');
  }

  onBeforeLoadData(datasource, query) {
    //istanbul ignore next
    if(!datasource.items?.length) datasource.state.isFirst = true;
  }

  onAfterLoadData(dataSource, items) {
    items.forEach(
      function (item, i) {
        if (i === 0 && dataSource.state.isFirst) {
          item.computedButtonTheme = 'primary';
          dataSource.state.isFirst = false;
        }
        if (!item.computedButtonTheme) {
          item.computedButtonTheme = 'secondary';
        }
        item.computedTitle = this._computeTitle(item);
        item.computedCompletedDate = this._computeCompletedDate(item);
        item.computedQuestions = this._computeQuestionCount(item);
        if(item.isbatch){
          item._disabled = true;
        }
      }.bind(this)
    );

    let validMap = this.app.state.isMapValid;

    // istanbul ignore next
    if (
      items &&
      validMap &&
      this.app.device.isMaximoMobile &&
      this.owner.state.selectedSwitch === 1
    ) {
      // istanbul ignore next
      log.e(TAG, 'Loading offline data for Maps.');
      this.mapPreloadAPI.loadOfflineData(
        items,
        3,
        16,
        'plussgeojson',
        '4326',
        this.app,
        false
      );
    }
  }

  /**
   * Calculate the 'computedCompletedDate' attribute
   */
  _computeCompletedDate(item) {
    let date = null;
    // istanbul ignore else
    if ('inspresultstatus' in item && item.inspresultstatus.length) {
      const status = item.inspresultstatus[item.inspresultstatus.length - 1];
      date = status.changedate;
    }
    return date;
  }

  /**
   * Calculate the 'computedTitle' attribute
   */
  _computeTitle(item) {
    let type = item.referenceobject;
    let name = null;
    if (item.workorder && item.workorder[0] && type === 'PARENTWO') {
      name = item.workorder[0].description;
    } else {
      name = item.inspectionform.name;
    }
    return name;
  }

  /**
   * Calculates the 'computedWOTitle' attribute
   * @param {Object} item - datasource item
   * @returns {String | null} worktype + wonum depending on referenceobject attribute
   */
  _computeWOTitle(item) {
    let computedWorkOrder = null;

    if (item) {
      let wonum = this._computeWONum(item);
      let worktype = null;
      //istanbul ignore else
      if (item.workorder && item.workorder[0] && wonum) {
        worktype = item.workorder[0].worktype;
        computedWorkOrder = worktype ? worktype + ' ' + wonum : wonum;
      }
    }
    return computedWorkOrder;
  }

  /**
   * Calculates the 'computedWONum' attribute
   * @param {Object} item - datasource item
   * @returns {String | null} wonum depending on referenceobject attribute
   */
  _computeWONum(item) {
    let reference,
      wonum = null;
    if (item) {
      //istanbul ignore else
      if (item.referenceobject) {
        reference = item.referenceobject;
      }
      //istanbul ignore else
      if (item.workorder && item.workorder[0]) {
        //istanbul ignore else
        if (reference === 'WORKORDER' || reference === 'PARENTWO') {
          wonum = item.referenceobjectid;
        } else if (
          reference === 'WOACTIVITY' ||
          reference === 'MULTIASSETLOCCI'
        ) {
          wonum = item.parent ? item.parent : null;
        }
      }
    }

    return wonum;
  }

  /**
   * Calculates the 'computedHref' attribute
   * @param {Object} item - datasource item
   * @returns {String | null} Href parent Workorder attribute
   */
      _computeHref(item) {
        let reference,
          href = null;
        if (item) {
          //istanbul ignore else
          if (item.referenceobject) {
            reference = item.referenceobject;
          }
          //istanbul ignore else
          if (item.workorder && item.workorder[0]) {
            //istanbul ignore else
            if (reference === 'WORKORDER' || reference === 'PARENTWO') {
              href = item.workorder[0].href;
            } else if (
              reference === 'WOACTIVITY' ||
              reference === 'MULTIASSETLOCCI'
            ) {
              href = item.workorder[0].parent[0].href ? item.workorder[0].parent[0].href : null;
            }
          }
        }
  
        return href;
      }

  /**
   * Calculate the 'computedButtonLabel' attribute
   */
  _computeButtonLabel(item) {
    let buttonLabel = null;
    if (item.status_maxvalue === 'PENDING') {
      buttonLabel = this.app.getLocalizedLabel(
        'start_inspection',
        'Start inspection'
      );
    }
    if (item.status_maxvalue === 'INPROG') {
      buttonLabel = this.app.getLocalizedLabel(
        'resume_inspection',
        'Resume inspection'
      );
    }
    if (item.status_maxvalue === 'REVIEW') {
      let statusValue = this.app.state.reviewStatusValue;
      buttonLabel = statusValue.charAt(0).toUpperCase() +  statusValue.slice(1).toLowerCase();
    }
    if (item.status_maxvalue === 'COMPLETED' || item.status_maxvalue === 'CAN') {
      buttonLabel = this.app.getLocalizedLabel(
        'view_inspection',
        'View inspection'
      );
    }
    return buttonLabel;
  }

  /**
   * Concatenates item description to counter
   * @param {Object} item - DS item
   * @returns {String | null} question counter label
   */
  _computeQuestionCount(item) {
    let questionCounter = null;
    if (item && 'totalquestion' in item) {
      if (item.totalquestion === 1) {
        questionCounter = this.app.getLocalizedLabel(
          'question_counter_single',
          '{0} question',
          [item.totalquestion]
        );
      } else if (item.totalquestion > 1) {
        questionCounter = this.app.getLocalizedLabel(
          'question_counter',
          '{0} questions',
          [item.totalquestion]
        );
      }
    }
    return questionCounter;
  }

  /**
   * Check if duedate is overdue
   * @param {Object} item - Datasource item.
   * @returns {boolean} - True if duedate is overdue, false otherwise.
   */
  computedIsOverDue(item) {
    if (!item.duedate) return false;
    let due = new Date(item.duedate);
    if (isNaN(due)) return false;

    let today = new Date().toISOString();
    let result = DataFormatter.get().getDateDiff(due.toISOString(), today);

    let expression = result >= 1;
    return expression;
  }

  /**
   * Format duration
   * @param {Object} item - Datasource item.
   * @returns  {String | null} duration value
   */
  _computeDuration(item) {
    let duration = null;
    //istanbul ignore else
    if (item) {
      if (item.workorder && item.workorder[0]) {
        if (item.workorder[0].estdur) {
          const durationValue = DataFormatter.get().format(
            item.workorder[0].estdur,
            'hours',
            {type: 'DURATION_LONG'}
          );
          duration = this.app.getLocalizedLabel(
            'est_duration',
            'Estimated duration: {0}',
            [durationValue]
          );
        }
      }
    }
    return duration;
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
   * Format duration
   * @param {Object} item - Datasource item.
   * @returns  {String | null} duration value
   */
   _computePlussgeojson(item) {
    let validGeoInfo = null;
    let reference = null;

    //istanbul ignore else
    if (item) {
      const emptyGeo = null;
      //istanbul ignore else
      if (item.referenceobject) {
        reference = item.referenceobject;

        if (reference === 'WORKORDER' || reference === 'PARENTWO') {
          //istanbul ignore else
          if (item.workorder && item.workorder[0]) {
            validGeoInfo = item.workorder[0].autolocate
              ? item.workorder[0].autolocate
              : emptyGeo;
          }
        }
        if (reference === 'ASSET') {
          //istanbul ignore else
          if (item.assets && item.assets[0]) {
            validGeoInfo = item.assets[0].autolocate
              ? item.assets[0].autolocate
              : emptyGeo;
          }
        }
        if (reference === 'LOCATION') {
          //istanbul ignore else
          if (item.locations && item.locations[0]) {
            validGeoInfo = item.locations[0].autolocate
              ? item.locations[0].autolocate
              : emptyGeo;
          }
        }
      }
    }

    return validGeoInfo;
  }

  createInspSymbology(params) {
    let symbol = null;
    let features = params.features;
    // Is a Cluster
    if (features.length > 1) {
      symbol = mapSymbol('CLUSTER');
    } else {
      // Just a single feature
      let feature = features[0];
      let maximoAttributes = feature.get('maximoAttributes');

      //istanbul ignore else
      if (maximoAttributes && maximoAttributes.status) {
        let status = maximoAttributes.status;
        symbol = mapSymbol(status);
      }
    }
    return symbol;
  }

  
  retrieveInspLegends() {
    let app = this.app;
    return mapLegends(app);
  }

  /** Return inspection status on main list page.
   * @param {item} item
   * @return {status_description} string value
   */
  computedInspectionStatus(item) {
      let schedulePage;
      // istanbul ignore next
      if (this.app && this.app.pages) {
        schedulePage = this.app.pages.find((element) => {
          return (element.name === 'main') ? element : '';
        });
      }
  
      let self = this;
      let inspectionStatus = {
        label: item.status_description,
        type: 'cool-gray',
        action: true,
        onClick: () => {
          //istanbul ignore next
          if (schedulePage && schedulePage !== '') {
            schedulePage.callController('openChangeStatusDialog', {
              item: item,
              datasource: schedulePage.state.selectedDS,
              referencePage: 'main',
              selectedDatasource: self.datasource
            });
          }
        }
      };
      return [inspectionStatus];
    }
}
export default InspListDataController;
