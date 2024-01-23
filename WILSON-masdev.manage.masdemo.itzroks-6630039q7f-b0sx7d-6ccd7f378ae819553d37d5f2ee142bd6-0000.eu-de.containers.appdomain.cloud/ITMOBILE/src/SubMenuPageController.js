/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

class SubMenuPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
  }

  /**
   * Event handler to handle decision to select the Inventory receiving or the Shipment receiving
   *
   * @param {Object} args - Contains event with page property
   */
  subMenuListGoto(args) {
    let targPage = args;
    // istanbul ignore else
    if (targPage) {
      let gotoPage = this.app.findPage(targPage);
      if (gotoPage) {
        gotoPage.clearStack = true;
        gotoPage.params = {};
        this.app.setCurrentPage(gotoPage);
      }
    }
    return;
  }
}

export default SubMenuPageController;
