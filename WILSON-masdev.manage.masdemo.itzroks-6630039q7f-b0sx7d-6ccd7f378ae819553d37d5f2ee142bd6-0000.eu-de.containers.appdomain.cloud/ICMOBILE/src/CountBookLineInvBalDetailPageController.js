/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import moment from 'moment';

class CountBookLineInvBalDetailPageController {

  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
  }

  pageResumed(page, app) { 
    this.page = page;
    this.app = app;
    this.app.state.cntbooklinedetailloading = true;

    this.setUpInitialDataSource();    
  }

  async setUpInitialDataSource(){
    // istanbul ignore else
    if (this.page.params.countbooklineid){
      const countBookLineDetailResource = this.page.findDatasource('countBookDetailDS4MaterialDetail');
      let detailItems = await countBookLineDetailResource.load({noCache:true, itemUrl: this.page.params.href});

      let rotating = '';
      let assetnum = '';
      let abctypeValue = '';
      let lotnumValue = '';
      let unitValue = '';
      let curbalValue = '';
      let physcntValue = '';
      let physcntdateValue = '';
      
      // istanbul ignore else
      if (detailItems[0]){
        this.page.state.allowblindcnt= detailItems[0].allowblindcnt;
        this.page.state.countbookinvbal_currentitem = detailItems[0];
      }

      let currentitemobj = this.page.state.countbookinvbal_currentitem;

      // istanbul ignore else
      if (currentitemobj){
        rotating = currentitemobj.rotating;
        assetnum = currentitemobj.assetnum;;
        abctypeValue = currentitemobj.abctype;
        lotnumValue = currentitemobj.lotnum;
        unitValue = currentitemobj.issueunit;
        curbalValue  = currentitemobj.curbal;
        physcntValue  = currentitemobj.physcnt;
        // istanbul ignore else
        if (currentitemobj.physcntdate !== undefined) {
          physcntdateValue  = moment(currentitemobj.physcntdate).format('MM/DD/YYYY');  
        }

        const countBookDetailItemDS = this.page.findDatasource('countBookDetailItemDS');
        await countBookDetailItemDS.load({noCache:true, itemUrl: this.page.params.href});
        //this.updateImageDS();
      }

      let newList = [];  
      newList.push(
        { _id: 0,
          label: this.app.getLocalizedLabel('Rotating', 'Rotating'),
          value: rotating}
      ); 
      newList.push(
        { _id: 1,
          label: this.app.getLocalizedLabel('Asset', 'Asset'),
          value: assetnum}
      );
      newList.push(
        { _id: 2,
          label: this.app.getLocalizedLabel('Lot', 'Lot'),
          value: lotnumValue}
      );  
      newList.push(
        { _id: 3,
          label: this.app.getLocalizedLabel('Unit', 'Unit'),
          value: unitValue}
      );  
     
      // istanbul ignore else
    if(this.page.state.allowblindcnt=='0'){
        newList.push(
          { _id: 4,
            label: this.app.getLocalizedLabel('Balance', 'Balance'),
          value: curbalValue}
        ); 
        newList.push(
          { _id: 5,
            label: this.app.getLocalizedLabel('Last count', 'Last count'),
          value: physcntValue}
        );     
        newList.push(
          { _id: 6,
            label: this.app.getLocalizedLabel('Last count date', 'Last count date'),
          value: physcntdateValue}
        );   
      }
      let newSRC = {items: newList};
      let invDetailds = this.page.findDatasource('countbooklineinvbaldetailjsonds');
      // istanbul ignore else
      if(invDetailds){
        invDetailds.clearState();
        invDetailds.resetState();
        invDetailds.lastQuery = {};
        invDetailds.dataAdapter.src = newSRC;
        this.app.state.cntbooklinedetailloading = false;
        invDetailds.load({src: newSRC});
      }
    }
  }

  // async updateImageDS() {
  //   const countBookDetailItemDS = this.page.findDatasource('countBookDetailItemDS');
  //   await countBookDetailItemDS.forceSync();
  // }

  goBack() {
    this.app.state.isback = true;
    this.app.setCurrentPage({name: 'countBookDetail'});
  }

}

export default CountBookLineInvBalDetailPageController;
