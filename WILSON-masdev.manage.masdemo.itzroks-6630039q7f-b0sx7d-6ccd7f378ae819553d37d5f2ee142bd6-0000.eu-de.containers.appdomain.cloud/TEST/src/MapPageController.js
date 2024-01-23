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

import {log} from '@maximo/maximo-js-api';
const TAG = 'MapPageController';

class MapPageController {
  pageInitialized(page, app) {
    log.t(TAG, 'Map Page Initialized');
    this.app = app;
    this.page = page;
  }  
  /*
   * Method to resume the page
   */
  async pageResumed(page, app) {
    const isMobileTimer = (app.device.isMaximoMobile) ? 3000 : 1000; 
    window.setTimeout(() => {
      const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
      this.app.setCurrentPage({name:schPage});
      this.app.currentPage.state.selectedSwitch = 1;
      // If map is not configured or valid then user will redirect to list view
      // istanbul ignore else
      if(!this.app.state.isMapValid) {
        window.setTimeout(() => {
          this.app.currentPage.state.selectedSwitch = 0;
        }, isMobileTimer);
      }
    }, 1);
  }
}
export default MapPageController;
