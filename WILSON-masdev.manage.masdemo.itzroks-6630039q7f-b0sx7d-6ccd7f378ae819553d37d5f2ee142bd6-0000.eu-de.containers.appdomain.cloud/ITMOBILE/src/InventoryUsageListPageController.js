/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import CommonUtil from "./utils/CommonUtil";

// const TAG = "InventoryUsageListPageController";

class InventoryUsageListPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed() {
    this.app.state.isFromReservedItemsPage = false;
    this.invUsageDS = this.app.findDatasource(
      this.app.state.selectedInvUseDSName
    );
    this.page.updatePageLoadingState(true);
    this.setupPage();
  }

  async setupPage() {
    this.invUsageDS.clearChanges();
    this.invUsageDS.clearState();
    if (this.app.state.isBackFromInvUsePage) {
      await this.invUsageDS.load({
        noCache: false,
        itemUrl: null,
      });
    } else {
      await this.invUsageDS.load({
        noCache: true,
        itemUrl: null,
      });
    }
    this.app.state.invUseDSTotalCount = this.invUsageDS.dataAdapter.totalCount;

    //istanbul ignore else
    if (!this.app.state.reservationLoaded) {
      this.app.allinvuses = await this.getAllInvUseLines(
        this.invUsageDS,
        this.app.state.invUseDSTotalCount
      );
    }
    this.app.state.isBackFromInvUsePage = false;
    this.page.updatePageLoadingState(false);
  }

  /**
   * Gets all items even exceeding the page size.
   *
   */
  async getAllInvUseLines(datasource, totalCount, forceSync) {
    let allitems = [];
    for (let i = 0; i < totalCount; i++) {
      // istanbul ignore next
      if (!datasource.isItemLoaded(i)) {
        await datasource.load({
          start: i,
          forceSync: forceSync,
        });
      }

      //istanbul ignore next
      if (datasource.get(i)?.invuseline) {
        for (let j = 0; j < datasource.get(i).invuseline.length; j++) {
          let invUseLineCoppied = CommonUtil.getCopiedInvUseLine(
            datasource.get(i).invuseline[j],
            datasource.get(i)
          );
          allitems.push(invUseLineCoppied);
        }
      }
    }
    return allitems;
  }

  async forceUpdateDatasource() {
    this.page.updatePageLoadingState(true);
    if (this.app.device.isMaximoMobile) {
      this.invUsageDS.clearChanges();
      await this.invUsageDS.load({
        noCache: true,
        forceSync: true,
        itemUrl: null,
      });
    } else {
      await this.invUsageDS.forceReload();
    }

    this.app.state.invUseDSTotalCount = this.invUsageDS.dataAdapter.totalCount;
    this.app.allinvuses = await this.getAllInvUseLines(
      this.invUsageDS,
      this.app.state.invUseDSTotalCount,
      this.app.device.isMaximoMobile
    );
    // load again to display
    await this.invUsageDS.load({
      itemUrl: null,
    });
    this.page.updatePageLoadingState(false);
  }

  gotoDetails(item) {
    this.app.setCurrentPage({
      name: "invUsage",
      params: {
        title: item.invusenum,
        description: item.description,
        itemUrl: item.href,
        addingmoreitems: false,
      },
    });
  }

  goback() {
    //this.app.navigateBack();
    this.app.setCurrentPage({
      name: "main",
      resetScroll: true,
    });
  }
}

export default InventoryUsageListPageController;
