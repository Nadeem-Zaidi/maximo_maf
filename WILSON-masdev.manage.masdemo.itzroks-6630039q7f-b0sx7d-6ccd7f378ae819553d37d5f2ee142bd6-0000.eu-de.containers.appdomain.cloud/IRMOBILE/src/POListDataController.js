/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/* eslint-disable no-console */

class POListDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /* Return po description and ponum on po list page.
   * @param {item} item
   * @return {description} string value
   * @return {ponum} string value
   */
  computedPODescription(item) {
    let description = "";
    // istanbul ignore else
    if (item.description !== null && typeof item.description !== "undefined")
      description = item.description;
    return item.ponum + " " + description;
  }

  computedVendorDescription(item) {
    let description = "";
    // istanbul ignore else
    if (item.vendordesc !== null && typeof item.vendordesc !== "undefined")
      description = item.vendordesc;
    return item.vendor + " " + description;
  }

  computedReceiptDescription(item) {
    let poReceipts = {
      label: item.receipts_description,
      type: "cool-gray",
    };
    // istanbul ignore else
    if (item.receipts_description) {
      return [poReceipts];
    }
  }

  computedPOLineCount(item) {
    if (item.polinecount <= 1) {
      return this.app.getLocalizedLabel("POLine", "{0} PO Line", [
        item.polinecount,
      ]);
    } else {
      return this.app.getLocalizedLabel("POLines", "{0} PO Lines", [
        item.polinecount,
      ]);
    }
  }

  initialCountNum() {
    return 0;
  }
}

export default POListDataController;
