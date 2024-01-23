/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = "ReceiptPageController";

class ReceiptPageController {
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
      name: "recactions",
      params: {
        href: this.page.params.href,
        ponum: this.page.params.ponum,
      },
    });
  }
}

export default ReceiptPageController;
