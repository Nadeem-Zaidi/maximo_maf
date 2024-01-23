/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import 'regenerator-runtime/runtime';

class CountBookLineDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
    // istanbul ignore next
    ds.addIgnoreField('realinvptol');
    ds.addIgnoreField('realinvmtol');
    ds.addIgnoreField('accuracy');
    ds.addIgnoreField('notmatchindicator');
  }

  /**
   * Maximo-datasource lifecycle
   * @param {*} datasource
   * @param {Array} items
   */
  //  onAfterLoadData(datasource, items) {
  //   this.resetQBEData(datasource, items);
  // }

  /**
   * Handle Maximo-datasource load
   * For Counted items, in the beginning it should be 0, while the fake QBE should be cleared so that the result set includes all the records
   * This is only considered for mobile container (on disconnected for example),
   * run a clearQBE and searQBE to clear the fake QBE.
   * @param {*} datasource
   * @param {Array} items
   */
  //async resetQBEData(datasource, items) {
    // let isMobileContainer = this?.app?.state?.isMobileContainer;
    // log.d(TAG, "========resetQBEData=====================datasource.name=%o", datasource.name); 
    // log.d(TAG, "========resetQBEData=====================datasource.items.length=", datasource.items.length); 

    // // istanbul ignore else
    // if (
    //   isMobileContainer &&
    //   datasource.name === "countBookDetailDSCounted" &&
    //   !this.owner.state.clearQBERequested
    // ) {
    //   this.owner.state.clearQBERequested = true;

      // datasource.clearQBE();
      // datasource.setQBE('hasphyscnt', 1);  
      // let counteditems = await datasource.searchQBE();
      // //counteditems = await datasource.searchQBE();
      // for (var i = 0; i < counteditems.length; i++){   
      //   // istanbul ignore else
      //   if (counteditems[i].physcnt !== undefined && counteditems[i].physcnt !== null && this.app.state.counteditemidlist4countbook.indexOf(counteditems[i].countbooklineid) === -1) {
      //     this.app.state.counteditemidlist4countbook.push(counteditems[i].countbooklineid);
      //     this.app.state.counteditemvaluelist4countbook.push(counteditems[i].physcnt);
      //   } else if ((counteditems[i].physcnt === undefined || counteditems[i].physcnt === null) && this.app.state.notcountedcountbooklinesidlist.indexOf(counteditems[i].countbooklineid) === -1){
      //     this.app.state.notcountedcountbooklinesidlist.push(counteditems[i].countbooklineid);
      //   }
      // }
    //}
  //}
}
export default CountBookLineDataController;
