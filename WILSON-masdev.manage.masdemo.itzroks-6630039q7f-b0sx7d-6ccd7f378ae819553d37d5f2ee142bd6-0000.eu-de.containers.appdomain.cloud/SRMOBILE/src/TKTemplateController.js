/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import 'regenerator-runtime/runtime';

class TKTemplateController {
    pageInitialized(page, app) {
        this.app = app;
        this.page = page;

    }


    async gotoDetailsFromSelectedType() {
        console.log("======TKTemplate - *******gotoDetailsFromSelectedType >>>>>>>>:")
        let templateid;
        let tktemplatedsui = this.app.datasources['tktemplatedsui'];
        // istanbul ignore next
        if(tktemplatedsui && tktemplatedsui.getSelectedItems()[0]){
            templateid = tktemplatedsui.getSelectedItems()[0].templateid;
            tktemplatedsui.clearSelections();
        }
        this.app.state.isBack = false;
        this.app.setCurrentPage({name: 'createSR', params: {templateid:templateid,lastcategorydesc:this.page.params.lastcategorydesc} });
        this.page.state.navigateToCreateSRPage = true;
        console.log("======TKTemplate - gotoDetailsFromSelectedType - data{pagename, id, description}:", 
        'tktemp', templateid, this.page.params.lastcategorydesc);
        this.app.state.pagelist.push({
            pagename: 'tktemp',
            id: templateid,
            description: this.page.params.lastcategorydesc
        }); 
    }

    async gotoDetails() {
        console.log("This is the TKTemplateController.gotoDetails - this.app.state.templateid =" + this.app.state.templateid); 
        
        this.app.state.pagelist.push({
          pagename: 'tktemp',
          id: this.app.state.templateid,
          isFromDescribleReq: 'Y'
        });
        this.app.setCurrentPage({name: 'createSR', params: {templateid:'',lastcategorydesc:this.page.params.lastcategorydesc} });
        this.page.state.navigateToCreateSRPage = true;
    }

    /**
    * Go back to previose page.
    */
     goBack() {
        //this.app.setCurrentPage({name: 'newRequest'});
        //console.log("Go back to the previous page.");
        this.app.state.isback = true;
        this.app.state.isUpdateFromBack = true;
       // if(this.app.state.pagelist.length>0){  
            let currentitem=this.app.state.pagelist.pop();
            this.app.state.backPageName = currentitem.pagename;
        if (this.app.state.backPageName !== 'newRequest'){
            this.app.state.selectedSubCategory=currentitem.id;
            this.app.state.subcategory=currentitem.description;
            this.app.state.currSubCategoryID=currentitem.currID;
            this.app.state.currSubCategoryDesc=currentitem.currDesc;
            this.app.setCurrentPage({name: 'SubCategory'});
            console.log("Go back to Subcategory Page from TKTemplate, data:", this.app.state.backPageName, this.app.state.selectedSubCategory, this.app.state.subcategory, this.app.state.currSubCategoryID, this.app.state.currSubCategoryDesc);
            console.log("Go back to Subcategory Page from TKTemplate, Length", this.app.state.pagelist.length);
           // }
        } else {
            this.app.setCurrentPage({name: 'newRequest'});
            this.page.state.navigateBack = true;
            console.log("Go back to the previous page.");
        }

        //Clear datasource
        let checktktds = this.app.datasources['checktktds'];
        checktktds.clearState();
        checktktds.resetState();
        checktktds.forceReload();

	}

    async pageResumed(page){
       // if (!this.app.state.isback){
            this.app.datasources['checktktds'].clearSelections();
       // } else {
            console.log("======TKTemplate - pageResumed - back with templateid", this.app.state.templateid);
            // let selItem = {'templateid' : this.app.state.templateid} ;
            // this.app.datasources['checktktds'].setSelectedItem(selItem, true);
        //} 

        if (this.app.state.isback && !this.app.state.valuesaved) {
            this.app.findPage("createSR")?.controllers[0]?.discardAttachments();
        }
    }

}

export default TKTemplateController;
