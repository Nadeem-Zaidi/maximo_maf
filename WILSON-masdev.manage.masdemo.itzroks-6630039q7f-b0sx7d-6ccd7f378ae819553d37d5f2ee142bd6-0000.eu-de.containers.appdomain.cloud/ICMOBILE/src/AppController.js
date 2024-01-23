/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/* eslint-disable no-console */
import {Device, log} from "@maximo/maximo-js-api";

const TAG = "Inventory Counting app";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, "Inventory Counting app is initialized");

    let device = Device.get();
    this.app.state.isMobileContainer = device.isMaximoMobile || device.isMaximoMobileEmulation;
  }
}
export default AppController;
