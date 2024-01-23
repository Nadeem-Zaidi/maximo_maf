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
import CategoryCommonController from './CategoryCommonController';

class SubCategoryController extends CategoryCommonController {
  
    pageInitialized(page, app) {
        this.app = app;
        this.page = page;
        this.initFields();
    }
  
    initFields() {    
      this.app.state.selectedSubcategory = this.page.params.selectedSubcategoryId;
      this.app.state.subcategory = this.page.params.selectedSubcategorydesc;
      // this.page.sitefilteron = this.page.params.sitefilteron;
    }

   /**
   * Filter only selected category -subcategories.
   * And change the arrow based on has children /has type.
   */
    async pageResumed(page) {
      if (this.app.state.isback && !this.app.state.valuesaved) {
        this.app.findPage("createSR")?.controllers[0]?.discardAttachments();
      }
      
      let selectedSubCat = await this.app.state.selectedSubCategory;
      this.page.state.initLastSelectedID = selectedSubCat;
      this.page.state.initLastSelectedDesc = this.app.state.subcategory;
	    console.log("======Subcategory PageResumed - Begin - this.app.state.isback=", this.app.state.isback);
      console.log("======Subcategory PageResumed - Begin - this.app.state.selectedSubCategory=",selectedSubCat);
      console.log("======Subcategory PageResumed - Begin - this.app.state.currSubCategoryID=", this.app.state.currSubCategoryID);

      let subcategoryds = this.app.datasources.subcategoryds;
      if (subcategoryds.items.length === 0 && this.app.lastPage && this.app.lastPage.name !== 'newRequest') {
        await this.loadCategoryDS(selectedSubCat);
      }
      //update the select-end to  arrow icon if category still has type exist.
      this.updateIcon(subcategoryds.items);
      //clear selection if it is first time entering, if it is back, set selection.
      subcategoryds.clearSelections();
      if (this.app.state.isback){
        let selItem = {'classstructureid' : this.app.state.currSubCategoryID} ;
        subcategoryds.setSelectedItem(selItem, true);
        console.log("======Subcategory PageResumed - subcategoryds.setSelectedItem", selItem); 
        this.app.state.isUpdateFromBack = true;
      } else {
        this.app.state.isUpdateFromBack = false;
      }
    
    }

  /**
   * Go back to previose page.
   */
   async goBack() {
	    this.app.state.isback = true;
      this.app.state.isUpdateFromBack = true;
      this.app.state.navigateBack = true;
      if(this.app.state.pagelist.length>0){  
          let currentitem=this.app.state.pagelist.pop();
          this.app.state.backPageName = currentitem.pagename;
          console.log("======Subcategory goBack - backPageName=", this.app.state.backPageName);
          if (this.app.state.backPageName !== 'newRequest'){
            this.app.state.selectedSubCategory=currentitem.id;
            this.app.state.subcategory=currentitem.description;

            this.page.state.initLastSelectedID = currentitem.id;
            this.page.state.initLastSelectedDesc = currentitem.description;

            this.app.state.currSubCategoryID=currentitem.currID;
            this.app.state.currSubCategoryDesc=currentitem.currDesc;

            this.app.state.lastCurrSelectedID = currentitem.currID;
            this.app.state.lastCurrSelectedDesc = currentitem.currDesc;
          
            console.log("======Subcategory goBack - still on SubCategory Page");
            // Set item selected from history page. 
            let parent = await this.app.state.selectedSubCategory;
            let subcategoryds = await this.loadCategoryDS(parent);
            
            let selItem = {'classstructureid' : this.app.state.currSubCategoryID};
            console.log("======Subcategory goBack - still on SubCategory Page - this.app.state.currSubCategoryID=" + this.app.state.currSubCategoryID);
            await subcategoryds.setSelectedItem(selItem, true);
            console.log("Still in Subcategory Page, Length", this.app.state.pagelist.length);
            console.log("======Still in Subcategory Page, this.app.state.isback ", this.app.state.isback );
            await this.updateIcon(subcategoryds.items);
          
          } else {
            this.app.setCurrentPage({name: 'newRequest'});
            this.app.state.selectedTopCategory=currentitem.id;
            this.page.state.navigateBack = true;
          }
        }
	  }

  /**
   * Function to open a new layer of Subcategory
   * @param event should contain
   * the selected top subcategory item.
   */
    async subcategoryLayer(event) {
      if (!event.displayIcon) {
        return; //Ignore clicks while loading
      }
      const hasNextLevel = (event.displayIcon === 'carbon:arrow--right');

      /**first we need to record the current page, because we are leaving this page
      **push the current page paramters to the pagelist for goback to use.
      */
	    let id = this.app.state.selectedSubCategory;
      let description = this.app.state.subcategory;
      this.page.state.initLastSelectedID = this.app.state.selectedSubCategory;
      this.page.state.initLastSelectedDesc = this.app.state.subcategory;

      console.log("SubCategory - after clicking item and before updating - this.app.state.pagelist.length=", this.app.state.pagelist.length);
      console.log("SubCategory - after clicking item and before updating - *****event data :", event.classstructureid, event.classificationdesc);
  
      //Real action to handle open next page    
      let classstructureid = event.classstructureid;
      let classificationdesc = event.classificationdesc;

      this.app.state.lastCurrSelectedID = classstructureid;
      this.app.state.lastCurrSelectedDesc= classificationdesc;

      console.log("SubCategory - this.app.state.lastCurrSelectedID=", this.app.state.lastCurrSelectedID);
      console.log("SubCategory - this.app.state.lastCurrSelectedDesc=", this.app.state.lastCurrSelectedDesc);
      // Only updates selectedSubCategory when still goes to the subcategory page.
      this.app.state.selectedSubCategory = classstructureid; 
      this.app.state.subcategory = classificationdesc;

      if (this.app.state.isback){
        this.app.state.isUpdateFromBack = true; 
      } else {
        this.app.state.isUpdateFromBack = false; 
      }
      this.app.state.isback = false;  

		  this.app.state.pagelist.push({
        pagename: 'SubCategory',
        id: id,
        description: description,
        currID: classstructureid,
        currDesc: classificationdesc
      });

       //clear the previous filter
       let isSearch=this.app.datasources['subcategoryds'].lastQuery.searchText;
       // istanbul ignore else
       if(isSearch!==''){
         this.app.datasources['subcategoryds'].lastQuery.searchText="";
       }

      if (hasNextLevel) {
        let parent = this.app.state.selectedSubCategory;
        let subcategoryds = await this.loadCategoryDS(parent);
        if (subcategoryds.items.length > 0) {
          this.updateIcon(subcategoryds.items);
        } else {
          //If there is no child subcategory, then next level is a type
          let tkTemplateList;
          // istanbul ignore else
          if (this.app.datasources.typeValidationDS.items.length > 0) {
            tkTemplateList = await this.filterTypes(this.app.datasources.typeValidationDS.items); //Records were retrieved during validation, so let's reuse them
          } else {
            let typeValidationDS = this.app.datasources.typeValidationDS;
            await typeValidationDS.initializeQbe();
            typeValidationDS.setQBE("classstructureid", "=", parent);
            let typeItems = await typeValidationDS.searchQBE(undefined, true);
            tkTemplateList = await this.filterTypes(typeItems);
          }
          await this.app.datasources.tktemplatedsui.load({ src: tkTemplateList, noCache: true });
          this.app.state.selectedtkt = classificationdesc;  
          this.app.setCurrentPage({name: 'tktemp',params:{lastcategorydesc:classificationdesc}});
        }
      } else {
        this.page.state.navigateToCreateSRPage = true;
        this.app.setCurrentPage({name: 'createSR', params:{lastcategorydesc:classificationdesc}});
      } 
    }



  /**
   * Base Function of gotoDetails.
   */
  gotoDetails() {
    console.log("======This is the SubCategoryController.gotoDetails - this.app.state.isUpdateFromBack:", this.app.state.isUpdateFromBack);
    // When it's the first time going to subcategory page.
    //istanbul ignore else
    if (this.page.state.initLastSelectedID === ""){
      this.page.state.initLastSelectedID = this.app.state.selectedSubCategory;
      this.page.state.initLastSelectedDesc = this.app.state.subcategory;
    } 

    console.log("======>>>>>>This is the SubCategoryController.gotoDetails - this.page.state.initLastSelectedID:", this.page.state.initLastSelectedID);
    console.log("======>>>>>>This is the SubCategoryController.gotoDetails - this.app.state.lastCurrSelectedID:", this.app.state.lastCurrSelectedID);

   
    if (this.app.state.isUpdateFromBack){
      this.app.state.pagelist.push({
        pagename: 'SubCategory',
        isFromDescribleReq: 'Y',
        id: this.page.state.initLastSelectedID,
        description: this.page.state.initLastSelectedDesc,
        currID: this.app.state.lastCurrSelectedID,
        currDesc: this.app.state.lastCurrSelectedDesc
      });

      console.log("======This is the SubCategoryController.gotoDetails - data{pagename, isFromDescribleReq, id, description, currID, currDesc}:", 
      'SubCategory', 'Y', this.page.state.initLastSelectedID, this.page.state.initLastSelectedDesc, this.app.state.lastCurrSelectedID, this.app.state.lastCurrSelectedDesc); 
    } else {
      this.app.state.pagelist.push({
        pagename: 'SubCategory',
        isFromDescribleReq: 'Y',
        id: this.app.state.selectedSubCategory,
        description: this.app.state.subcategory
      });
      console.log("======This is the SubCategoryController.gotoDetails - data{pagename, isFromDescribleReq, id, description}:", 
      'SubCategory', 'Y', this.app.state.selectedSubCategory, this.app.state.subcategory);
    }
  
    this.app.setCurrentPage({name: 'createSR', params:{lastcategorydesc:''}});
    this.page.state.navigateToCreateSRPage = true;
  }



  async updateIcon(items){
    let parentClassIds = [];
    let ticketClassIds = [];
    let hasLoadedBefore = false;
    for (let i = 0; i < items.length; i++) {
      // istanbul ignore next
      if (this.app.state.subcatDisplayIcon[`${items[i].classstructureid}`]) {
        hasLoadedBefore = true;
        items[i].displayIcon = this.app.state.subcatDisplayIcon[`${items[i].classstructureid}`];
      } else if (items[i].haschildren) {
        parentClassIds.push(items[i].classstructureid);
      } else {
        ticketClassIds.push(items[i].classstructureid);
      };
    }

    // istanbul ignore if
    if (hasLoadedBefore) return;

    let categoryValidationDS = this.app.datasources.categoryValidationDS;
    await categoryValidationDS.initializeQbe();
    categoryValidationDS.setQBE("parent", "in", parentClassIds);
    let categoryItems = await categoryValidationDS.searchQBE(undefined, true);

    let typeValidationDS = this.app.datasources.typeValidationDS;
    await typeValidationDS.initializeQbe();
    typeValidationDS.setQBE("classstructureid", "in", ticketClassIds);
    let typeItems = await typeValidationDS.searchQBE(undefined, true);
    typeItems = await this.filterTypes(typeItems);

    //istanbul ignore next
    for (const item of items) {
      for (const categoryItem of categoryItems) {
        if (item.classstructureid === categoryItem.parent) {
          item.displayIcon = 'carbon:arrow--right';
          break;
        }
      }
      if (item.displayIcon === 'carbon:arrow--right') {
        if (!this.app.state.subcatDisplayIcon[`${item.classstructureid}`])
          this.app.state.subcatDisplayIcon[`${item.classstructureid}`] = item.displayIcon;
        continue;
      }
      for (const typeItem of typeItems) {
        if (item.classstructureid === typeItem.classstructureid) {
          item.displayIcon = 'carbon:arrow--right';
          break;
        }
      }
      if (!item.displayIcon) {
        item.displayIcon = "maximo:select--end";
      }
      if (!this.app.state.subcatDisplayIcon[`${item.classstructureid}`])
        this.app.state.subcatDisplayIcon[`${item.classstructureid}`] = item.displayIcon;
    }
  }

}
export default SubCategoryController;
