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

class InspSummaryPageController {
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
}

export default InspSummaryPageController;
