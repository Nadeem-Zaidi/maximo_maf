/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import "regenerator-runtime/runtime";
import { log, Device } from "@maximo/maximo-js-api";

const TAG = "AdHocDataController";
class AdHocDataController {
  constructor() {}

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
    // istanbul ignore next
    ds.addIgnoreField("notmatchindicator");
  }

  /**
   * Handle Maximo-datasource load
   * For Counted items, in the beginning it should be 0, while the fake QBE should be cleared so that the result set includes all the records
   * This is only considered for mobile container (on disconnected for example),
   * run a clearQBE and searQBE to clear the fake QBE.
   * @param {*} datasource
   * @param {Array} items
   */
  // async resetQBEData(datasource, items) {
  //   let isMobileContainer = this?.app?.state?.isMobileContainer;
  //   // let clearQBERequested = this?.owner?.state?.clearQBERequested;
  //   log.d(TAG, "========onAfterLoadData=====================datasource.name=%o", datasource.name); 
  //   log.d(TAG, "========onAfterLoadData=====================datasource.items.length=", datasource.items.length);  
  //   log.d(TAG, "========onAfterLoadData=====================this.app.state.allitemsidlist.length=", this.app.state.allitemsidlist.length);   
  //   if (
  //     isMobileContainer &&
  //     datasource.name === "mxapiinvbaldscounted" &&
  //     this.app.state.allitemsidlist.length > 0  &&
  //     !this.owner.state.clearQBERequested
  //   ) {
  //     this.owner.state.clearQBERequested = true;

  //     datasource.clearQBE();
  //     datasource.setQBE("invbalancesid", "=null");
  //     await datasource.searchQBE();
  //   }
  // }
}
export default AdHocDataController;
