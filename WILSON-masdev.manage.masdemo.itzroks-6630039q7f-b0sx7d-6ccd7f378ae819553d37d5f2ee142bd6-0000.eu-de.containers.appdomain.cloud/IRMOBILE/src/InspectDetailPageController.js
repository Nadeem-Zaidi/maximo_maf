/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
const TAG = "InspectDetailPageController";
const MATRECTRANSDS = "matrectransjsonDS";

class InspectDetailPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  async goBack() {
    let item = this.matds
      .getItems()
      .find((matitem) => matitem.href === this.page.state._orghref);
    //istanbul ignore else
    if (item) {
      item.rejectcode = this.page.state._orgcode;
      item.remark = this.page.state._orgremark;
    }

    this.app.setCurrentPage({
      name: "inspectpage",
      params: {
        ponum: this.page.params.ponum,
        href: this.page.params.href,
      },
    });
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.matds = app.findDatasource(MATRECTRANSDS);
    page.state.itemnum = page.params.itemnum;
    page.state.description = page.params.description;

    page.state._currentItem = this.matds
      .getItems()
      .find((item) => item._id === page.params.id);
    page.state._orgcode = page.state._currentItem.rejectcode;
    page.state._orgremark = page.state._currentItem.remark;
    page.state._orghref = page.state._currentItem.href;
  }

  async saveInspectDetail() {
    // data already changed to original ds item
    this.app.setCurrentPage({
      name: "inspectpage",
      resetScroll: true,
      params: {
        ponum: this.page.params.ponum,
        href: this.page.params.href,
      },
    });
  }
}

export default InspectDetailPageController;
