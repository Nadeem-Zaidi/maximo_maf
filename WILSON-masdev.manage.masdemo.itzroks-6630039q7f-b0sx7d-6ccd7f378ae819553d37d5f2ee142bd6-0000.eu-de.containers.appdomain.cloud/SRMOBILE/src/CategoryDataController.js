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
class CategoryDataController {

  onDatasourceInitialized(ds, app) {
    this.datasource = ds;
    this.app = app;
  }



  onAfterLoadData(ds, items) {
    // prevent "No Label" from being shown
    items.forEach((item) => {
      if (!item.classificationdesc) {
        item.classificationdesc = item.classificationid;
      }
      item.displayIcon = this.app.state.subcatDisplayIcon[`${item.classstructureid}`];
    });
    //istanbul ignore if
    if (this.app.state.isMobileContainer) {
      //This is required because navigator-with-search component
      //retrieves the items from dataAdapter.items instead of ds.items.
      //The dataAdapter.items is filled when we do a forceSync, 
      //but we cannot use that when we are offline.
      ds.dataAdapter.items = items;
    }
  }

} export default CategoryDataController;