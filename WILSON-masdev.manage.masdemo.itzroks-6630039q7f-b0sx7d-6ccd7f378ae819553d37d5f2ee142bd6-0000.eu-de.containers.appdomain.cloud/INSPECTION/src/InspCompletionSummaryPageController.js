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

import {log} from '@maximo/maximo-js-api';
import {AppSwitcher} from '@maximo/maximo-js-api';
const TAG = 'InspCompletionSummaryPageController';

class InspCompletionSummaryPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    //istanbul ignore else
    if (!page.params.inspectionresultid || !page.params.itemhref) {
      this.app.toast('Missing page parameter ids');
      return;
    }
  }

  goBackToBatchDetailsPage() {
    this.app.setCurrentPage({
      name: 'batch_details',
      resetScroll: true,
      params: {
        isCompletedFromPreview: true
      }
    });
  }

  /**
   * Done click handler
   * Check if end of queue and determine next page
   */
  doneHandler() {
    const {
      state: {inspectionsList},
      setCurrentPage
    } = this.app;

    if (inspectionsList.isLast) {
      if (this.page.params.isBatchPreview){
        this.goBackToBatchDetailsPage();
      }
      else this.showInspList();
    } else {
      inspectionsList.next(); 
      setCurrentPage.call(this.app, {
        name: 'execution_panel',
        resetScroll: true
      });
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
        this.app.setCurrentPage({
          name: 'main',
          params: {
            isBatch: this.page.params.isBatch,
          }
        });
      }
    }
  }

  /**
   * Function to run the script action
   * When calling the invokeAction function (to send data to the server),
   * the issystemaction parameter should be set as true, so the "wsmethod" string is not included in the URL
   * waitForUpload parameter should be true to consolidate localStorage and remote storage to get back
   *
   * @param {Object} args - Contains inspection item and action to be executed
   */
  async takeAction(args) {
    let inspection = args.inspection;
    let action = args.action;
    let ds = this.page.datasources.inspcompletionsummaryds;
    try {
      const actionQueuedMessage = this.app.getLocalizedLabel(
        'action_queued',
        'Action was queued and will be executed during the synchronization.'
      );

      // parameters attribute ensures a POST request
      let actionResult = await ds.invokeAction(action, {
        issystemaction: true,
        responseProperties: 'inspectionresultid,displaymessage',
        record: inspection,
        waitForUpload: true,
        parameters: {},
        localPayload: {
          displaymessage: actionQueuedMessage
        }
      });

      // Gather reponse either from mobile connected and disconnected mode
      const itemResponse = actionResult?.[0]?._responsedata ?? actionResult;
      if (itemResponse?.displaymessage) {
        this.page.state.displayMessage = itemResponse.displaymessage;
      }

      this.app.toast(
        this.app.getLocalizedLabel(
          'action_executed',
          'The action was executed.'
        )
      );
      return;
    } catch (error) {
      log.e(TAG, error);
      this.app.toast(error.message);
    }
  }
}
export default InspCompletionSummaryPageController;
