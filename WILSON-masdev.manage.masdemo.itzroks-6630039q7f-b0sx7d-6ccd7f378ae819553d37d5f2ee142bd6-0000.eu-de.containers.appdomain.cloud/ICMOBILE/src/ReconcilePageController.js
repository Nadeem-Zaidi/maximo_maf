/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";

const TAG = 'ReconcilePageController';

class ReconcilePageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.page.state.mismatched_selected = true;
    this.page.state.matched_selected = false;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;
    this.app.state.reconcileloading = true;
    this.initialReconcileData();
  }

  switchToMismatchedTab(){
    this.page.state.reconcileds='reconciledsmismatched';
  }

  switchToMatchedTab(){
    this.page.state.reconcileds='reconciledsmatched';
  }

  /**
   * Event handler to show the detail balance information page for the selected item.
   *
   * @param {Object} args - Contains event with page property
   */
   gotoDetailsFromSelectedReconciliation(args) {
    this.app.setCurrentPage({name: 'invBalDetail', params: {href: args.href, invbalancesid:args.invbalancesid, itemnum:args.itemnum, isFromReconcile:true} });
  }

  goBack() {
    this.app.setCurrentPage({name: 'main'});
    this.app.state.reconcileback = true;
  }

  changeContainerTab(index) {
    this.page.state.containerTabSelected = index;
  }

  async initialReconcileData(){
    let dsMismatched = this.page.findDatasource('reconciledsmismatched');
    let dsMatched = this.page.findDatasource('reconciledsmatched');
    let ds = this.page.findDatasource('reconcileds4all');
    await ds.forceSync();
    try {
      let action = 'previewReconcile';  
      //let dsItems = ds.getItems();    
      let selectedItems = ds.getItems();
      let idlist=[];
      for(let i=0; i < selectedItems.length; i++){ 
        idlist.push({invbalancesid:selectedItems[i].invbalancesid});
      }

      let data = [];
      data.push({invBalSetMbo:{"selection":idlist}});
      let option = {
        parameters: data,
        headers: {
          'x-method-override': 'BULK',
        },
        waitForUpload: true
      };  
      await ds.invokeAction(
        action,
        option
      );
      await ds.forceSync();
      await dsMismatched.forceSync();
      await dsMatched.forceSync();
      // istanbul ignore else
      if ((dsMismatched.state.totalCount + dsMatched.state.totalCount) < ds.dataAdapter.totalCount){
        this.app.state.reconcileneedrefresh = true;
      }
    } catch(error){
      // istanbul ignore next
      log.t(TAG, error);
    } finally{
      // istanbul ignore next
      this.app.state.reconcileloading = false;    
    } 
 }

  async reloadDatasource(){
    this.app.state.reconcileloading = true;
    this.app.state.reconcileneedrefresh = false;
    // istanbul ignore else
    if (this.app.client && this.app.client.userInfo){
      this.initialReconcileData4AllData();
    }
  }

  async initialReconcileData4AllData(){
    let dsMismatched = this.page.findDatasource('reconciledsmismatched');
    let dsMatched = this.page.findDatasource('reconciledsmatched');
    let ds = this.page.findDatasource('reconcileds4all');
    await ds.forceSync();
    try {
      let action = 'previewReconcile4InventoryCounting';  
      let data = [];
      data.push({userinfo:this.app.client.userInfo});
      let option = {
        parameters: data,
        headers: {
          'x-method-override': 'BULK',
        },
        waitForUpload: true
      };  
      await ds.invokeAction(
        action,
        option
      );
      await ds.forceSync();
      await dsMismatched.forceSync();
      await dsMatched.forceSync();
      // istanbul ignore else
      if ((dsMismatched.state.totalCount + dsMatched.state.totalCount) < ds.dataAdapter.totalCount){
        this.app.state.reconcileneedrefresh = true;
      }
    } catch(error){
      // istanbul ignore next
      log.t(TAG, error);
    } finally{
      // istanbul ignore next
      this.app.state.reconcileloading = false;    
    } 
 }

  async applySelected(dsName){
    let ds = this.page.findDatasource(dsName);
    let selectedItems = ds.getSelectedItems();
    let idlist=[];
    for(let i=0; i < selectedItems.length; i++){ 
      idlist.push({invbalancesid:selectedItems[i].invbalancesid});
    }
    
    let data = [];
    data.push({invBalSetMbo:{"selection":idlist}})
    let option = {
      addid: 1,
      domainmeta: 1,
      parameters:data,
      headers: {
        'x-method-override': 'BULK',
      }
    };
    let action = 'reconcile';
    try {
      let response = await ds.invokeAction(
        action,
        option
      );
      
      await ds.forceReload();
      ds.clearSelections();
      // Display message
      let label = "";
      //istanbul ignore else
      if (response) {
          let label1 = this.app.getLocalizedLabel('reconcile_update_msg1', 'Successfully reconciled ');
          let label2 = this.app.getLocalizedLabel('reconcile_update_msg2', ' materials');
          label = label1+selectedItems.length+label2;
          this.app.toast(label, 'success');
      }
    } catch(error){
      // istanbul ignore next
      log.t(TAG, error);
    } finally{
      //TODO
    }    
  }

}
export default ReconcilePageController;
