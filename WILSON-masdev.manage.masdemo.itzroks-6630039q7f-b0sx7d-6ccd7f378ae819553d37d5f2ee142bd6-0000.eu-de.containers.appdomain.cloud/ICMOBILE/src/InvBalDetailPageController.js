/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import moment from 'moment';

class InvBalDetailPageController {

  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
  }

  pageResumed(page, app) { 
    this.page = page;
    this.app = app;

    // istanbul ignore else
    if (this.page.state.param_invbalancesid === undefined || this.page.state.param_invbalancesid === null || this.page.state.param_invbalancesid === ''){
      return;
    }

    this.app.state.invbaldetailloading = true;
    this.page.state.isFromReconcile = this.page.params.isFromReconcile;

    this.setUpInitialDataSource();    
  }
  
  async setUpInitialDataSource(){
    const invDetailResource = this.page.findDatasource('invbalancedetailds');
    
    let detailItems = await invDetailResource.load({noCache:true, itemUrl: this.page.params.href});

    // istanbul ignore else
    if (detailItems[0]){
      this.page.state.allowblindcnt= detailItems[0].allowblindcnt;
      this.page.state.invbal_currentitem = detailItems[0];
    }

    let currentitemobj = this.page.state.invbal_currentitem;

    let calculatedValue = '';
    let binnumValue = '';
    let abctypeValue = '';
    let lotnumValue = '';
    let unitValue = '';
    let curbalValue = '';
    let physcntValue = '';
    let physcntdateValue = '';

   
    // istanbul ignore else
    if (currentitemobj){
      calculatedValue = currentitemobj.pre_calccurbal;
      binnumValue = currentitemobj.binnum;
      abctypeValue = currentitemobj.abctype;
      lotnumValue = currentitemobj.lotnum;
      unitValue = currentitemobj.issueunit;
      curbalValue  = currentitemobj.curbal;
      physcntValue  = currentitemobj.physcnt;

      // istanbul ignore else
      if (currentitemobj.physcntdate !== undefined) {
        physcntdateValue  = moment(currentitemobj.physcntdate).format('MM/DD/YYYY');
      }
      this.page.state.allowblindcnt=currentitemobj.allowblindcnt;

      const invBalDetailItemDS = this.page.findDatasource('invBalDetailItemDS');
      await invBalDetailItemDS.load({noCache:true, itemUrl: this.page.params.href});
      //this.updateImageDS();
    }

    let newList = [];
    if (this.page.state.isFromReconcile){
      newList.push(
        { _idx: 0,
          label: this.app.getLocalizedLabel('Calculated', 'Calculated'),
          value: calculatedValue}
      );
      newList.push(
        { _idx: 1,
          label: this.app.getLocalizedLabel('Balance', 'Balance'),
          value: curbalValue}
      );
      newList.push(
        { _idx: 2,
          label: this.app.getLocalizedLabel('Bin', 'Bin'),
          value: binnumValue}
      );
      newList.push(
        { _idx: 3,
          label: this.app.getLocalizedLabel('ABCType', 'ABC Type'),
          value: abctypeValue}
      );
      newList.push(
        { _idx: 4,
          label: this.app.getLocalizedLabel('Lot', 'Lot'),
          value: lotnumValue}
      );  
      newList.push(
        { _idx: 5,
          label: this.app.getLocalizedLabel('Unit', 'Unit'),
          value: unitValue}
      );       
      newList.push(
        { _idx: 6,
          label: this.app.getLocalizedLabel('Lastcount', 'Last count'),
        value: physcntValue}
      );     
      newList.push(
        { _idx: 7,
          label: this.app.getLocalizedLabel('Last count date', 'Last count date'),
        value: physcntdateValue}
      );   
    } else {
      newList.push(
        { _idx: 0,
          label: this.app.getLocalizedLabel('ABCType', 'ABC Type'),
          value: abctypeValue}
      );
      newList.push(
        { _idx: 1,
          label: this.app.getLocalizedLabel('Lot', 'Lot'),
          value: lotnumValue}
      );  
      newList.push(
        { _idx: 2,
          label: this.app.getLocalizedLabel('Unit', 'Unit'),
          value: unitValue}
      );  
      
      // istanbul ignore else
      if(this.page.state.allowblindcnt=='0'){
        newList.push(
          { _idx: 3,
            label: this.app.getLocalizedLabel('Balance', 'Balance'),
          value: curbalValue}
        );
        newList.push(
          { _idx: 4,
            label: this.app.getLocalizedLabel('Lastcount', 'Last count'),
          value: physcntValue}
        );     
        newList.push(
          { _idx: 5,
            label: this.app.getLocalizedLabel('Lastcountdate', 'Last count date'),
          value: physcntdateValue}
        );   
      }
    }
    let newSRC = {items: newList};
    let invDetailds = this.page.findDatasource('invbaldetailjsonds');
    // istanbul ignore else
    if(invDetailds){
      invDetailds.clearState();
      invDetailds.resetState();
      invDetailds.lastQuery = {};
      invDetailds.dataAdapter.src = newSRC;
      this.app.state.invbaldetailloading = false;
      invDetailds.load({src: newSRC});
    }
  }

  // async updateImageDS() {
  //   const invBalDetailItemDS = this.page.findDatasource('invBalDetailItemDS');
  //   await invBalDetailItemDS.forceSync();
  // }

  goBack() {
    this.app.state.isback = true;
    if (this.page.state.isFromReconcile){
      this.app.setCurrentPage({name: 'reconcile'});
    } else {
      this.app.setCurrentPage({name: 'adHoc'});
    }
  }

}

export default InvBalDetailPageController;
