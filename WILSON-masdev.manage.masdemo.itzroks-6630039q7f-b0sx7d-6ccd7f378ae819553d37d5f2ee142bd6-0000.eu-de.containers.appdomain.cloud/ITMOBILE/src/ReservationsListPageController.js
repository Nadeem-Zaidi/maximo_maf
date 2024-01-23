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

const RESERVATIONSLISTDS = "reservationsListDS";
class ReservationsListPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.invUseDS = this.app.findDatasource(
      this.app.state.selectedInvUseDSName
    );
    this.reservationsListDS = this.app.findDatasource(RESERVATIONSLISTDS);
    //this.app.allinvuses_local = [];
    //this.app.allinvuses_onlyinvuse_length = 0;
  }

  //istanbul ignore next
  pageResumed(page, app) {
    this.app = app;
    this.page = page;
    this.page.updatePageLoadingState(true);

    this.page.state.addmoreitems = this.page.params.addmoreitems;
    this.page.state.usageItemUrl = this.page.params.itemUrl || null;
    this.page.state.computedPageTitle = this.page.state.addmoreitems
      ? this.app.getLocalizedLabel("addReservedItems", "Add reserved items")
      : this.app.getLocalizedLabel(
          "issuesReservedItems",
          "Issues reserved items"
        );

    this.page.state.computedActionButton = this.page.state.addmoreitems
      ? "Add"
      : "Select";

    // istanbul ignore else
    if (!this.page.state.addmoreitems) {
      // If not from inventory usage page.
      this.app.state.isFromReservedItemsPage = true;
      // clear changes when it is not from inventory add more
      this.invUseDS.clearChanges();
    }
    // reset selection and restore from this.page.params.reservedItemsInvUsage
    this.reservationsListDS.clearSelections();
    this.reservationsListDS.clearState();
    if (this.app.state.reservationLoaded) {
      this.page.state.reservedItemsInvUsage =
        this.page.params.reservedItemsInvUsage;
    }
    this.loadDatasource(false);
  }

  onAfterLoadData(dataSource, items) {
    // istanbul ignore else
    if (
      dataSource.name === RESERVATIONSLISTDS &&
      this.page.state.addmoreitems
    ) {
      let reservedItemsInvUsage = this.page.state.reservedItemsInvUsage;
      dataSource.getItems().forEach((item) => {
        item._disabled = false;
        // istanbul ignore else
        if (
          reservedItemsInvUsage.find(
            (itemInvUsage) => itemInvUsage.requestnum === item.requestnum
          )
        ) {
          dataSource.setSelectedItem(item, true);
          dataSource.setDisabled(item);
        }
      });
    }
  }

  async forceUpdateDatasource() {
    this.page.updatePageLoadingState(true);
    this.invUseDS.clearChanges();
    this.loadDatasource(true);
  }

  async loadDatasource(needForceSync) {
    if (!this.app.state.reservationLoaded || needForceSync) {
      // for mobile forceSync, we need to load all the data, not a single page
      await this.invUseDS.load({
        noCache: true,
        forceSync: needForceSync,
        itemUrl: null,
      });

      this.app.allinvuses = await this.getAllInvUseLines(
        this.invUseDS,
        needForceSync
      );

      // Needs to forcesync when force refresh.
      // for mobile forceSync, we need to load all the data, not a single page
      await this.reservationsListDS.load({
        noCache: true,
        forceSync: needForceSync,
        itemUrl: null,
      });

      this.app.allreserveditems = await this.getAllReservedItems(
        this.reservationsListDS,
        needForceSync
      );

      // load again to display
      await this.reservationsListDS.load({
        itemUrl: null,
      });

      this.app.state.reservationLoaded = true;
    } else {
      // forceReload
      await this.reservationsListDS.forceReload();
    }
    this.page.updatePageLoadingState(false);
  }

  /**
   * Gets all items even exceeding the page size.
   *
   */
  async getAllInvUseLines(datasource, forceSync) {
    let allitems = [];
    // FIXME: why do we need to use this.app.state.invUseDSTotalCount?
    let totalCount = !this.page.state.addmoreitems
      ? datasource?.dataAdapter.totalCount
      : this.app.state.invUseDSTotalCount;
    for (let i = 0; i < totalCount; i++) {
      // istanbul ignore next
      if (!datasource.isItemLoaded(i)) {
        if (this.page.state.addmoreitems) {
          datasource.clearState();
        }
        await datasource.load({
          start: i,
          forceSync: forceSync,
          noCache: true,
          itemUrl: null,
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

  /**
   * Loads all items even exceeding the page size.
   *
   */
  async getAllReservedItems(datasource, needForceSync) {
    let allitems = [];
    let totalCount = datasource?.dataAdapter.totalCount;
    for (let i = 0; i < totalCount; i++) {
      // istanbul ignore next
      if (!datasource.isItemLoaded(i)) {
        await datasource.load({
          start: i,
          forceSync: needForceSync,
        });
      }

      //istanbul ignore next
      if (datasource.get(i)) {
        let currentReservedItem = datasource.get(i);
        allitems.push({ ...currentReservedItem });
      }
    }

    return allitems;
  }

  /**
   * Handler for selected items from reservations list to Inventory Usage
   * @returns null
   */
  selectToIssue() {
    const reserveItems = this.app.findDatasource(RESERVATIONSLISTDS);
    const selectedItems = reserveItems?.getSelectedItems();

    this.page.state.selectedReservations = selectedItems;
    //istanbul ignore else
    if (selectedItems?.length) {
      this.openInventoryUsage(selectedItems);
    }
  }

  openInventoryUsage(items) {
    let isaddingmoreitems = this.page.state.addmoreitems ? true : false;
    this.app.setCurrentPage({
      name: "invUsage",
      resetScroll: true,
      params: {
        items: items,
        itemUrl: this.page.state.usageItemUrl,
        addingmoreitems: isaddingmoreitems,
        title: this.page.params.title,
        description: this.page.params.description,
      },
    });
  }

  goBack() {
    if (this.page.state.addmoreitems) {
      this.app.setCurrentPage({
        name: "invUsage",
        resetScroll: true,
        params: {
          itemUrl: this.page.state.usageItemUrl,
          addingmoreitems: true,
          description: this.page.params.description,
        },
      });
    } else {
      this.app.setCurrentPage({
        name: "main",
        resetScroll: true,
      });
    }
  }
}

export default ReservationsListPageController;
