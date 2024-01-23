

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

class DoclinksDataController {

  /**
   * onDatasourceInitialized.
   * @param {Datasource} ds
   * @param {Page} owner
   * @param {Application} app
   */
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
    
    ds.addIgnoreField('inferencestatus');
    ds.addIgnoreField('newurl');
  }  

  onAfterLoadData(datasource, items) {
    datasource.emit('inspections-reload-inspfield', datasource);
  }

}

export default DoclinksDataController;