/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {log} from '@maximo/maximo-js-api';

const TAG = 'DialogController';

class DialogController {
  constructor() {
    log.t(TAG, 'Created');
  }

  dialogInitialized(dialog) {
    log.t(TAG, 'Initialized');
    this.dialog = dialog;
    this.app = dialog.getApplication();
  }

  dialogOpened() {
    let executionPanelPage = this.app.findPage('execution_panel');
    //istanbul ignore else
    if (executionPanelPage) {
      let pageState = executionPanelPage.state;
      if (pageState && pageState.updateDialog && pageState.tagGroupTogglesData1) {
        executionPanelPage.callController(
          'changeToggle',
          pageState.tagGroupTogglesData1
        );
        pageState.updateDialog = false;
      }
    }
  }
}

export default DialogController;
