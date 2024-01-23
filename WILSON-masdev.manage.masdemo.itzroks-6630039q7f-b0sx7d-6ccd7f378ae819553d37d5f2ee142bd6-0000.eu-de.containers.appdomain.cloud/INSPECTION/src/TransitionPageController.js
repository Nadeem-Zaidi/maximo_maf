/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import InspectionsList from './components/common/InspectionsList';

class TransitionPageController {

  async pageResumed(page, app) {
    this.page = page;
    this.app = app;

    if (page.params.isBatch){
      this.app.state.inspectionsList = new InspectionsList(page.params.itemhref);
      setTimeout( ()=>{
        app.setCurrentPage({
          name: 'execution_panel',
          resetScroll: true,
          params: {
            inspectionresultid: page.params.inspectionresultid,
            itemhref: page.params.itemhref
          }
        });
      },50);
    } else {
      let ds = this.page.datasources.contextredirectds;
      await ds.load();
      let item = ds.items[0];
     
      //istanbul ignore if
      if (item.isbatch){
        this.app.pages[0].initialize();
        app.setCurrentPage({
          name: 'batch_details',
          resetScroll: true,
          params: {
            inspectionresultid: item.inspectionresultid,
            itemhref: item.href

          }
        });

      } else {
        app.setCurrentPage({
          name: 'execution_panel',
          resetScroll: true,
          params: {
            inspectionresultid: item.inspectionresultid,
            itemhref: item.href,
            forceStart: true,
            itemToLoad:item
          }
        });
      }
    }
    
  }
}

export default TransitionPageController;
