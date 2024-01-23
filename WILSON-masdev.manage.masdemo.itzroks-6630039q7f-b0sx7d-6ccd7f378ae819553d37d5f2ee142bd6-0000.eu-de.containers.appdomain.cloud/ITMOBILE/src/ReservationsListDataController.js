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
import "regenerator-runtime/runtime";
import CommonUtil from "./utils/CommonUtil";

class ReservationsListDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /**
   * Compute the 'computedDueDate' attribute
   */
  _computeDueDate(item) {
    if (item.requireddate) {
      return this.app?.dataFormatter
        ?.convertISOtoDate(item.requireddate)
        .toLocaleDateString();
    } else {
      return "";
    }
  }

  /**
   * Function called after loading the data
   * @param {dataSource} dataSource
   * @param {items} items
   */
  onAfterLoadData(dataSource, items) {
    //istanbul ignore else
    if (dataSource.name === "reservationsListDS" && items.length > 0) {
      //Set calqty attribute value
      items.forEach((reserveitem) => {
        let totalQtyUsed = 0;
        reserveitem.calqty = reserveitem.reservedqty;
        totalQtyUsed = CommonUtil.getTotalQtyUsed(reserveitem, this.app);
        reserveitem.calqty = reserveitem.reservedqty - totalQtyUsed;
      });
    }
  }
}
export default ReservationsListDataController;
