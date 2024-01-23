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

class InspCompletionSummaryDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  onAfterLoadData(dataSource, items) {
    this._collectAllowedActions(items);

    // Get item
    const item = dataSource.item;
    this.owner.state.displayMessage = item?.displaymessage;
  }

  /**
   * Function to collect the allowed script actions for the current Inspection record
   * @param items
   */
  async _collectAllowedActions(items) {
    let actiontemp;
    let allowedactions = [];
    let inspfieldresult;
    let isActionRequired;
    
    items.forEach(function(item, i) {

      inspfieldresult = item.inspfieldresult;
      isActionRequired = false;
      if (inspfieldresult){
        isActionRequired = inspfieldresult.some(elem => elem.actionrequired === true);
      }
   
      if (isActionRequired){
        let actions = item.allowedactions
          ? Object.entries(item.allowedactions)
          : [];
        let inspformscript = item.inspformscript;
        if (inspformscript) {
          actions.forEach(action => {
            if (action[1].type === 'script') {
              for (let i = 0; i < inspformscript.length; i++) {
                if (inspformscript[i].autoscript === action[1].impl) {
                  actiontemp = {
                    action: action[0],
                    actioncomplete: inspformscript[i].autoscript,
                    description: action[1].description
                  };
                  allowedactions.push(actiontemp);
                }
              }
            }
          });
        }
      }
    });
    if (this.app.currentPage.datasources.actionsds) {
      await this.app.currentPage.datasources.actionsds.load({
        src: allowedactions,
        noCache: true
      });
    }
  }

  /**
   * Formats the 'computedTitle' attribute
   */
  _computeWOTitle(item) {
    let workorderinfo = null;
    if (item && item.workorder && item.workorder[0]) {
      if (item.workorder[0].worktype) {
        workorderinfo =
          item.workorder[0].worktype + ' ' + item.workorder[0].wonum;
      } else {
        workorderinfo = item.workorder[0].wonum;
      }
    }
    return workorderinfo;
  }

  /**
   * Formats the 'assetInfo' attribute
   */
  _computeAssetInfo(item) {
    let assetinfo = null;
    if (item) {
      if (item.assets && item.assets[0] && item.assets[0].assetnum) {
        assetinfo = item.assets[0].description
          ? item.assets[0].assetnum + ' ' + item.assets[0].description
          : item.assets[0].assetnum;
      }
    }
    return assetinfo;
  }

  /**
   * Formats the 'locationInfo' attribute
   */
  _computeLocationInfo(item) {
    let locationinfo = null;
    if (item) {
      if (item.locations && item.locations[0] && item.locations[0].location) {
        locationinfo = item.locations[0].description
          ? item.locations[0].location + ' ' + item.locations[0].description
          : item.locations[0].location;
      }
    }
    return locationinfo;
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
}

export default InspCompletionSummaryDataController;
