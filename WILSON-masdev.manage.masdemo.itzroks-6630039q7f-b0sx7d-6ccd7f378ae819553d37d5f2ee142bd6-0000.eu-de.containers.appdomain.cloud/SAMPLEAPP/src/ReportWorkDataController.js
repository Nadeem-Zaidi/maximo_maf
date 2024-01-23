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

class ReportWorkDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.app = app;
  }
  
  /**
   * Function to get the itemnum and description for materials
   */
  computedItem(item) {
    return this.computedItemDescription(item.itemnum, item.description);
  }

  /**
   * Function to get the itemnum and description for tools
   */
  computedToolItem(item) {
    let description = null;
    if (item.toolitem && item.toolitem.description) {
      description = item.toolitem.description;
    }
    return description;
  }

  /**
   * Common function to get the combination of itemnum and description
   */
  computedItemDescription(itemnum, description) {
    let computedItem = null;
    //istanbul ignore next
    if (itemnum && description) {
      computedItem = itemnum + ' ' + description;
    } else if (itemnum) {
      computedItem = itemnum;
    } else {
      computedItem = description;
    }
    return computedItem;
  }

  /*
   * Format date without timezone 
   */
  formattedLaborDate(item) {
    item.computedstartdate = item.startdate && this.app.dataFormatter.dateToString(item.startdate, "MMMM DD, YYYY");
    item.computedfinishdate = item.finishdate && this.app.dataFormatter.dateToString(item.finishdate, "MMMM DD, YYYY");
  }
}

export default ReportWorkDataController;
