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
import 'regenerator-runtime/runtime';

class ReservationsListIssueDataController {

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
      return this.app?.dataFormatter?.convertISOtoDate(item.requireddate).toLocaleDateString();
    } else {
      return '';
    }
  }

}
export default ReservationsListIssueDataController;