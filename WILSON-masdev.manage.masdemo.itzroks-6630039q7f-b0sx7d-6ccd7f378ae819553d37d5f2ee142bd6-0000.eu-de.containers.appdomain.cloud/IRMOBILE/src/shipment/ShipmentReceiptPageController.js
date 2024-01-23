/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = "ShipmentReceiptPageController";

class ShipmentReceiptPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
  }

  goBack() {
    // this.app.navigateBack();
    this.app.setCurrentPage({
      name: "shipmentactions",
      params: {
        href: this.page.params.href,
        shipmentnum: this.page.params.shipmentnum,
      },
    });
  }
}

export default ShipmentReceiptPageController;
