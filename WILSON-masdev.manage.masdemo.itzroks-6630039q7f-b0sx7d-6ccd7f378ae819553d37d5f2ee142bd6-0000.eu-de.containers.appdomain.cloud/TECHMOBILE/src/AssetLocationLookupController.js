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

class AssetLocationLookupController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }
  /**
   * choose assetnum from lookup;
   */
  async chooseAssetItem(item) {
    let currentPage;
    // istanbul ignore else
    if (this.app.state.parentPage === "createwo") {
      currentPage = "createwo";
    } else if (this.app.state.parentPage === "woedit") {
      currentPage = "woedit";
    }
    let woPage = this.app.findPage(currentPage);
    // istanbul ignore else
    if (woPage) {
      this.app.setCurrentPage({
        name: currentPage,
        resetScroll: false,
      });
      // istanbul ignore else
      if (this.app.currentPage) {
        await this.app.currentPage.callController("chooseAsset", item);
      }
    }
  }
}
export default AssetLocationLookupController;
