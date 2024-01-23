/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import "regenerator-runtime/runtime";
import { log } from "@maximo/maximo-js-api";

const TAG = "ReconcileDataController";
class ReconcileDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /**
   * Maximo-datasource lifecycle
   * @param {*} datasource
   * @param {Array} items
   */
  onAfterLoadData(datasource, items) {
    this.syncData(datasource, items);
  }

  /**
   * Handle Maximo-datasource load
   * Sync the reconcile data.
   * @param {*} datasource
   * @param {Array} items
   */
  
  async syncData(datasource, items) {
    // istanbul ignore else
    if (datasource.name === 'reconciledsmatched') {
      //this.app.state.reconcileloading = false;
    }
    /*
    // istanbul ignore else
    if (datasource.name === 'reconcileds4all') {
      let dsMismatched = this.owner.findDatasource('reconciledsmismatched');
      let dsMatched = this.owner.findDatasource('reconciledsmatched');
      let ds = this.owner.findDatasource('reconcileds4all');
      
      try {
        let action = 'previewReconcile';  
        //let dsItems = ds.getItems();    
        let selectedItems = ds.getItems();
        let idlist=[];
        for(let i=0; i < selectedItems.length; i++){ 
          idlist.push({invbalancesid:selectedItems[i].invbalancesid});
        }
        
        let data = [];
        data.push({invBalSetMbo:{"selection":idlist}})   
        let option = {
          parameters: data,
          headers: {
            'x-method-override': 'BULK',
          }
        };   
        await ds.invokeAction(
          action,
          option
        );
        //await ds.forceSync();
        await dsMismatched.forceSync();
        await dsMatched.forceSync();    
      } catch(error){
        // istanbul ignore next
        log.t(TAG, error);
      } finally{
        // istanbul ignore next
        //TODO
      }     
    }
    */
  }
}
export default ReconcileDataController;
