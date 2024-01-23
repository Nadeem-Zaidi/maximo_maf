
/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
class InspCompletionSummaryPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.app.state.counteditemidlist = [];
    this.app.state.counteditemvaluelist = [];

    this.app.state.counteditemidlist4countbook = [];
    this.app.state.counteditemvaluelist4countbook = [];
    this.app.state.counteditemdatelist4countbook = [];

    let newList = [];  
      newList.push(
        { _id: 0,
          label: this.app.getLocalizedLabel('Countbooks', 'Count books'),
          page: 'countBook'}
      ); 
      newList.push(
        { _id: 1,
          label: this.app.getLocalizedLabel('Adhoccount', 'Ad hoc count'),
	        page: 'adHoc'}
      );  
     
    
    let newSRC = {items: newList};
    let subMenuListDS = this.page.findDatasource('subMenuListDS');
    // istanbul ignore else
    if(subMenuListDS){
      subMenuListDS.clearState();
      subMenuListDS.resetState();
      subMenuListDS.lastQuery = {};
      subMenuListDS.dataAdapter.src = newSRC;
      subMenuListDS.load({src: newSRC});
    }

    let newList2 = [];  
     
    newList2.push(
      { _id: 1,
        label: this.app.getLocalizedLabel('Reconciliation', 'Reconciliation'),
        page: 'reconcile'}
    ); 
    
    let newSRC2 = {items: newList2};
    let subMenuListDS2 = this.page.findDatasource('subMenuListDS2');
    // istanbul ignore else
    if(subMenuListDS2){
      subMenuListDS2.clearState();
      subMenuListDS2.resetState();
      subMenuListDS2.lastQuery = {};
      subMenuListDS2.dataAdapter.src = newSRC2;
      subMenuListDS2.load({src: newSRC2});
    }
  }

  /**
   * Event handler to handle decision to select the count book page or the adhoc page
   *
   * @param {Object} args - Contains event with page property
   */
  async subMenuListGoto(args) {
	let targPage = args.page;
	// istanbul ignore else
	if(targPage) {
      let gotoPage = this.app.findPage(targPage);
	  if(gotoPage) {
		gotoPage.clearStack = true;
		this.app.setCurrentPage(gotoPage);
	  }
	}
    return;
  }
}
export default InspCompletionSummaryPageController;
