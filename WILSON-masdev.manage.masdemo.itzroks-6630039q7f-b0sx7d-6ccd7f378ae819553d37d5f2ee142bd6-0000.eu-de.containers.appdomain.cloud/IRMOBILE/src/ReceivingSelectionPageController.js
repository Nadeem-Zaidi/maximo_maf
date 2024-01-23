/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
const SHIPMENTDS = "shipmentDS";
const SHIPMENTLINEDS = "shipmentlineDS";
const SHIPMENTMATRECTRANSDS = "shipmentMatrectransDS";
const SHIPMENTASSETINPUTDS = "shipmentassetinputDS";
const RECVACTIONDS = "receivingActionDS";
const ignoreChildren = [
  SHIPMENTLINEDS,
  SHIPMENTMATRECTRANSDS,
  SHIPMENTASSETINPUTDS,
];

class ReceivingSelectionPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.dsshipmentlist = app.findDatasource(SHIPMENTDS);
    this.shipmentlineds = app.findDatasource(SHIPMENTLINEDS);
    // remove ignore children ds from shipment childrenToLoad
    // istanbul ignore else
    if (this.dsshipmentlist.childrenToLoad) {
      this.dsshipmentlist.childrenToLoad =
        this.dsshipmentlist.childrenToLoad.filter(
          (item) => !ignoreChildren.includes(item.name)
        );
    }

    let actionList = [
      {
        _id: 0,
        label: this.app.getLocalizedLabel(
          "inventory_receiving",
          "Inventory receiving"
        ),
        page: "polist",
      },
      {
        _id: 1,
        label: this.app.getLocalizedLabel(
          "shipment_receiving",
          "Shipment receiving"
        ),
        page: "shipment",
      },
    ];

    let newSRC = { items: actionList };
    let receivingActionDS = this.page.findDatasource(RECVACTIONDS);
    // istanbul ignore else
    if (receivingActionDS) {
      receivingActionDS.clearState();
      receivingActionDS.resetState();
      receivingActionDS.lastQuery = {};
      receivingActionDS.dataAdapter.src = newSRC;
      receivingActionDS.load({ src: newSRC });
    }
  }

  /**
   * Event handler to handle decision to select the Inventory receiving or the Shipment receiving
   *
   * @param {Object} args - Contains event with page property
   */
  selectReceivingAction(args) {
    let targPage = args.page;
    // istanbul ignore else
    if (targPage) {
      let gotoPage = this.app.findPage(targPage);
      // istanbul ignore else
      if (gotoPage) {
        gotoPage.clearStack = true;
        this.app.setCurrentPage(gotoPage);
      }
    }
  }
}

export default ReceivingSelectionPageController;
