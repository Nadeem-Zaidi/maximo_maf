/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log, Device, UserInteractionManager } from "@maximo/maximo-js-api";

import "regenerator-runtime/runtime";
const TAG = "ASSETMANAGER";

class AssetEditDataController {
  /**
   * defines fields to implement onCustomSaveTransition()
   * which is to avoid defaultSaveTransition defined at framework level
   * and uses save method implemented in controller itself.
   */
  constructor() {
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.onInvokeActionFailed = this.onInvokeActionFailed.bind(this);
    this.saveDataSuccessful = true;
    this.callDefaultSave = true;
  }

  pageInitialized(page, app) {
    log.t(TAG, "Asset Edit Page Initialized");
    this.app = app;
    this.page = page;
    this.setDefaultValidationParams();

    this.page.state.hasAssetMovePersmission = this.app.checkSigOption('MXAPIASSET.MOVEASSET') ? true : false;
  }

  async pageResumed() {
    // istanbul ignore else
    if (this.app.pageStack.length === 1) {
      this.app.pageStack = ["assetlist", "assetDetails", "editasset"];
    }
    
    this.page.state.isMobile = Device.get().isMaximoMobile;
    this.setDefaultValidationParams();

    const dsEditAsset = this.app.findDatasource('dsEditAsset');
    dsEditAsset.clearState();
    dsEditAsset.resetState();
    
    if(this.page.params.href){
      await dsEditAsset.load({noCache:true, itemUrl: this.page.params.href});
    }
    this.page.state.assetOriginalLocation = dsEditAsset.currentItem?.location;
  }

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  setDefaultValidationParams() {
    this.page.state.validFailureCode = true;
    this.page.state.validManufacture = true;
    this.page.state.validVendor = true;
    this.page.state.validType = true;
    this.page.state.validLocation = true;
    this.page.state.saveInProgress = false;
    this.page.state.updateParentItem = null;

    this.updateSaveButtonVisibility();
  }

  hasValue(attributeName, attributeValue) {
    if (attributeName === null) {
      return false;
    }
    let fieldDontHasValue = attributeValue === undefined || attributeValue === "" ? true : false;
    let returnValue = fieldDontHasValue ? false : true;
    return returnValue;
  }

  async validateLocation(){
    const assetItem = this.page.datasources.dsEditAsset.item;
    let ds = this.app.findDatasource("locationLookupDS");
    await ds.initializeQbe();
    ds.setQBE('location', '=', assetItem.location);
    let items = await ds.searchQBE();
    if((this.page.state.selectedAssetLocation && assetItem.location) && 
        (assetItem.location !== this.page.state.selectedAssetLocation)){
      items = [];
    }
    else if((this.page.state.selectedAssetLocation && assetItem.location) && assetItem.location === this.page.state.selectedAssetLocation){
      items = [assetItem.location];
    }
    if(items.length > 0) {
      this.clearWarnings("location");

      this.page.state.validLocation = true;
    } else {
      const errorMessage = this.app.getLocalizedLabel(
        `location_invalid_msg`,
        `BMXAA0130E - location is not valid.`);
      const errorField = "location";
      this.showWarnings(errorField, errorMessage);

      this.page.state.validLocation = false;
    }

    this.updateSaveButtonVisibility();
  }

  async validateFailureCode() {
    const assetItem = this.app.findDatasource("dsEditAsset").item;

    let ds = this.app.findDatasource("dsFailureList");
    await ds.initializeQbe();
    ds.setQBE('parent', '=', 'null');
    ds.setQBE('failurecode.failurecode', '=', assetItem.failurecode);

    const items = await ds.searchQBE();
    if(items.length > 0) {
      this.clearWarnings("failurecode");

      this.page.state.validFailureCode = true;
    } else {
      const errorMessage = this.app.getLocalizedLabel(
        `failurecode_invalid_msg`,
        `BMXAA0130 - Failure code is not valid.`);
      const errorField = "failurecode";
      this.showWarnings(errorField, errorMessage);

      this.page.state.validFailureCode = false;
    }

    this.updateSaveButtonVisibility();
    
  }

  async validateManufacture() {
    const assetItem = this.app.findDatasource("dsEditAsset").item;;

    let ds = this.app.findDatasource("dsManufacture");
    await ds.initializeQbe();
    ds.setQBE('company', '=', assetItem.manufacturer);
    
    const items = await ds.searchQBE();

    if(items.length > 0) {
      this.clearWarnings("manufacturer");

      this.page.state.validManufacture = true;
    } else {
      const errorMessage = this.app.getLocalizedLabel(
        `manufacturer_invalid_msg`,
        `BMXAA0313 -  Manufacturer is not valid.`);
      const errorField = "manufacturer";
      this.showWarnings(errorField, errorMessage);

      this.page.state.validManufacture = false;
    }

    this.updateSaveButtonVisibility();
  }

  async validateVendor() {
    const assetItem = this.app.findDatasource("dsEditAsset").item;;

    let ds = this.app.findDatasource("dsVendor");
    await ds.initializeQbe();
    ds.setQBE('company', '=', assetItem.vendor);
    
    const items = await ds.searchQBE();

    if(items.length > 0) {
      this.clearWarnings("vendor");

      this.page.state.validVendor = true;
    } else {
      const errorMessage = this.app.getLocalizedLabel(
        `vendor_invalid_msg`,
        `BMXAA0313 - Vendor is not valid.`);
      const errorField = "vendor";
      this.showWarnings(errorField, errorMessage);

      this.page.state.validVendor = false;
    }

    this.updateSaveButtonVisibility();
  }
  
  async validateType() {
    const assetItem = this.app.findDatasource("dsEditAsset").item;

    let ds = this.app.findDatasource("synonymdomainData");
    await ds.initializeQbe();
    ds.setQBE('value', '=', assetItem.assettype);
    
    const items = await ds.searchQBE();

    if(items.length > 0) {
      this.clearWarnings("assettype");
      this.page.state.validType = true;
    } else {
      const errorMessage = this.app.getLocalizedLabel(
        `type_invalid_msg`,
        `BMXAA8284E - Type is not valid.`);
      const errorField = "assettype";
      this.showWarnings(errorField, errorMessage);

      this.page.state.validType = false;
    }

    this.updateSaveButtonVisibility();
  }

  /**
  * Function to set field warnings
  */
  showWarnings(field, message) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.setWarning(dsEditAsset.item, field, message);
    this.page.state.readOnlyState = true;
  }

  /**
   * Function to clear field warnings
   */
  clearWarnings(field) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.clearWarnings(dsEditAsset.item, field);
  }

  updateSaveButtonVisibility() {
    this.page.state.readOnlyState = !this.page.state.validType || !this.page.state.validManufacture || !this.page.state.validVendor || !this.page.state.validFailureCode || !this.page.state.validLocation;
  }

  /**
   * Function to update asset.
   */
  async updateAsset(evt) {
    let asset = evt.item;

    this.page.state.saveInProgress = true;
    const device = Device.get();

    // istanbul ignore else
    if (asset) {
      let assetEditResource = this.app.findDatasource("dsEditAsset");
      assetEditResource.currentItem.siteid = this.app.client.userInfo.insertSite;
      
      try {
        // istanbul ignore else
        if (this.callDefaultSave) {
          this.page.state.useConfirmDialog = false;
        }

        let response;
        this.saveDataSuccessful = true;
        assetEditResource.on("save-data-failed", this.onSaveDataFailed);

        if (this.checkAssetMoveAllowed(assetEditResource.currentItem)) {
          let moveResponse = await this.moveAsset(assetEditResource.currentItem);
          // istanbul ignore next
          if (moveResponse) {
            this.displayWarningPopup(moveResponse);
          }
        }

        if(this.page.state.classificationChanged) {
          await this.updateSpecification(assetEditResource.currentItem);
          this.page.state.classificationChanged = false;
          this.clearTempEditDS();
        }

        if (!this.page.state.parentUpdatedFailed) {
          let interactive = { interactive: !this.page.state.isMobile };
          response = await assetEditResource.save(interactive);
          this.page.state.saveInProgress = false;

          /* istanbul ignore next */
          if (response && assetEditResource.currentItem) {
            let assetnum = assetEditResource.currentItem.assetnum;
            let itemhref = assetEditResource.currentItem.href;
            if (device.isMaximoMobile) {
              this.app.pageStack.pop();
              this.app.setCurrentPage({
                name: "assetDetails",
                resetScroll: true,
                params: { assetnum: assetnum, href: itemhref },
              });
            } else {
              /* istanbul ignore next */
              if (response.items && response.items.length > 0) {
                this.app.pageStack.pop();
                if (response.items[0].href) {
                  this.app.setCurrentPage({
                    name: "assetDetails",
                    resetScroll: true,
                    params: {
                      assetnum: assetnum,
                      href: response.items[0].href
                    },
                  });
                }
              }
            }
          }
        }

      } catch (error) {
        /* istanbul ignore next */
        log.t(TAG, error);
      } finally {
        this.page.state.saveInProgress = false;
        /* istanbul ignore else */
        if (this.callDefaultSave) {
          this.page.state.useConfirmDialog = true;
        }
        assetEditResource.off("save-data-failed", this.onSaveDataFailed);
      }
    }
  }

  checkAssetMoveAllowed(assetItem) {
    let moveAllowed = false;
    moveAllowed = this.page.state.hasAssetMovePersmission && this.compareAssetLocation(assetItem);
    return moveAllowed;
  }


  compareAssetLocation(assetItem) {
    let locationUpdated = false;
    if(assetItem.location) {
      locationUpdated = this.page.state.assetOriginalLocation != assetItem.location;
    }
    return  locationUpdated;
  }

  displayWarningPopup(moveResponse) {
    const totalWarnings = moveResponse.warnings.length;
    const moveStatus = moveResponse.warnings[totalWarnings-1].key;
    const messageToDisplay = moveResponse.warnings[totalWarnings-1].message;

    // istanbul ignore next
    if(moveStatus !== 'AssetMoveWasSuccess') {
      if(!this.page.state.isMobile) {
       UserInteractionManager.get().error(messageToDisplay);
      }
    }
  }

  clearTempEditDS() {
    let assetSpecificationDS = this.app.findDatasource("assetSpecificationEditTempDS");
    if (assetSpecificationDS) {
      assetSpecificationDS.reset();
    }
  }

  async updateSpecification(currentItem) {
    let assetSpecificationDS = this.app.findDatasource("assetSpecificationEditTempDS");
    let assetSpecificationEditDSOriginal = this.app.findDatasource("assetSpecificationEditDSOriginal");
    
     /* istanbul ignore next */
    if (assetSpecificationEditDSOriginal && assetSpecificationEditDSOriginal.items.length > 0) {
      await assetSpecificationEditDSOriginal.deleteItems(assetSpecificationEditDSOriginal.items);
    }
    
     /* istanbul ignore else */
    if (assetSpecificationDS && assetSpecificationDS.items.length > 0) {
      let specDatas = assetSpecificationDS.items;
      await this.updateSpecificationAttributes(specDatas);
      
      currentItem["assetspec"] = specDatas;
      currentItem["classstructure"] = {
        "hierarchypath": currentItem['hierarchypath'],
        "classstructureid": currentItem['classstructureid']
      }
      currentItem.assetspeccount = currentItem["assetspec"].length;
    }
  }

  async updateSpecificationAttributes(assetSpecItems) {
    const specId = [];
    let assetAttributeDS = this.app.findDatasource("assetAttributeDS");

    if(assetSpecItems.length > 0 ) {
      assetSpecItems.forEach((element) => {
        specId.push(element.assetattrid);
      });

      assetAttributeDS.clearQBE();
      await assetAttributeDS.initializeQbe();
      assetAttributeDS.setQBE("assetattrid", "in", specId);
      await assetAttributeDS.searchQBE();

      let list = assetAttributeDS.items;
      const attributeMap = {};
      list.forEach((element) => {
        if(element['description']) {
          attributeMap[element.assetattrid] = element;
        }
      });
      
      assetSpecItems.forEach((element) => {
        element['anywhererefid'] = new Date().getTime() + Math.floor(Math.random() * 1000);
        element['linearassetspecid'] = 0;
        element['assetattributedesc']= attributeMap[element.assetattrid] ? attributeMap[element.assetattrid].description : ''; 
      });
    }
  }

  /**
  * set Serial value on scanning a barcode/QR code
  */
  handleSerialBarcodeScan(event) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    /* istanbul ignore next */
    if (event.value) {
      dsEditAsset.item.serialnum = event.value;
    }
    this.updateSaveButtonVisibility();
  }

  /**
   * Callback from dialog back button
   */
  onCloseRichTextDialog() {
    // istanbul ignore else
    if (
      this.page.state.editorValue !== null &&
      this.page.state.editorValue !== undefined
    ) {
      this.page.showDialog("saveDiscardDialogCreatePage");
    }
  }

  async openFailureClassLookup() {
    let ds = this.app.findDatasource("dsFailureList");
    await ds.initializeQbe();
    ds.setQBE('parent', '=', 'null');
    await ds.searchQBE();
    this.page.showDialog('failureClassLookupEdit');
  }

  chooseFailureCode(itemSelected) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item.failurecode = itemSelected.computeFailureCode;
    dsEditAsset.item.failurecodedesc = itemSelected.failurecode.description;

    // Clears warning and update save button visibility
    this.clearWarnings("failurecode");
    this.page.state.validFailureCode = true;
    this.updateSaveButtonVisibility();
  }

  chooseManufacturer(itemSelected) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item.manufacturer = itemSelected.company;
    dsEditAsset.item.manufacturername =  itemSelected.name;

    // Clears warning and update save button visibility
    this.clearWarnings("manufacturer");
    this.page.state.validManufacture = true;
    this.updateSaveButtonVisibility();
  }

  chooseVendor(itemSelected) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item.vendor = itemSelected.company;
    dsEditAsset.item.vendorname = itemSelected.name;

    // Clears warning and update save button visibility
    this.clearWarnings("vendor");
    this.page.state.validVendor = true;
    this.updateSaveButtonVisibility();
  }

  chooseType(itemSelected) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item.assettype = itemSelected.value;

    // Clears warning and update save button visibility
    this.clearWarnings("assettype");
    this.page.state.validType = true;
    this.updateSaveButtonVisibility();
  }

  async chooseParent(itemSelected) {
    const assetItem = this.page.datasources.dsEditAsset.item;
    if(this.page.state.locationList && this.page.state.locationList.length===1){
      let ds = this.app.findDatasource("locationLookupDS");
      assetItem.parent = undefined;
      await ds.initializeQbe();
      ds.clearQBE();
      this.page.state.locationList = await ds.searchQBE();
      assetItem.location = undefined; 
      this.page.state.selectedAssetLocation = undefined;
    }
    this.clearWarnings("parent");
  }

  async openManufacturerLookup() {
    let synonymDS =  this.app.findDatasource("synonymdomainData");
    await synonymDS.initializeQbe();
    synonymDS.setQBE('domainid', '=', 'COMPTYPE');
    synonymDS.setQBE('maxvalue', '=', 'M');
    const items =  await synonymDS.searchQBE();

    // istanbul ignore else
    if (items.length > 0) {
      let ds = this.app.findDatasource("dsManufacture");
      await ds.initializeQbe();
      ds.setQBE('type', '=', items[0].value);
      await ds.searchQBE();
    }
    this.page.showDialog('manufacturerLookupEdit');
  }

  async openVendorLookup() {
    let synonymDS = this.app.findDatasource("synonymdomainData");
    await synonymDS.initializeQbe();
    synonymDS.setQBE('domainid', '=', 'COMPTYPE');
    synonymDS.setQBE('maxvalue', '=', 'V');
    const items = await synonymDS.searchQBE();

     /* istanbul ignore else */
    if (items.length > 0) {
      let ds = this.app.findDatasource("dsVendor");
      await ds.initializeQbe();
      ds.setQBE('type', '=', items[0].value);
      await ds.searchQBE();
    }
    this.page.showDialog('vendorLookupEdit');
  }

   async openTypeLookup() {
    let ds = this.app.findDatasource("synonymdomainData");

    await ds.initializeQbe();
    ds.setQBE('domainid', '=', "ASSETTYPE");
    await ds.searchQBE();
    this.page.showDialog('typeLookupEdit');
  }


  /**
   * Set long description value.
   * @param {*} workorder item and datasource as event
   */
  setRichTextValue(evt) {
    evt.datasource.item.description_longdescription =
      this.page.state.editorValue;
    this.onEditorSave();
  }

  /**
   * Reset editorValue on click discard button
   */
  closeSaveDiscardDialog() {
    this.onEditorSave();
  }

  computedFailureCode(item) {
    return item.failurecode.failurecode;
  }
  
  /**
   * Set editorValue on the basis of content
   * @param {*} rich text editor on change event
   */
  onEditorChange(evt) {
    this.page.state.editorValue = evt.target.content;
  }

  /**
   * Reset editorValue on save perform from rich text editor save button
   */
  onEditorSave() {
    this.page.state.editorValue = null;
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
  onSaveDataFailed() {
    this.saveDataSuccessful = false;
  }

  onInvokeActionFailed() {
    this.page.state.parentUpdatedFailed = true;
  }

  
  /**
	 * Use to set the selected item..
	 * @param {item} asset item
	 */
  async chooseAssetItem(item) {
    this.page.state.updateParentItem = item;
    this.clearWarnings("parent");
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item["parentassetdesc"] = item.description;
    if (item && item.location) {
      dsEditAsset.item.location = item.location;
      this.page.state.selectedAssetLocation = item.location;
    } else {
      this.page.state.selectedAssetLocation = undefined;
    }

    if(item?.locationdesc) {
      dsEditAsset.item.locationdesc = item.locationdesc; 
    }
    await this.changeLoctionLookup();
  }

  chooseAssetLocation(item) {
    this.clearWarnings("location");
    this.page.state.validLocation = true;
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item.location = item.location;
    dsEditAsset.item.locationdesc = item.description;
    this.updateSaveButtonVisibility();
  }

  async changeClassification(itemSelected) {
    this.page.state.classificationChanged = true;
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    dsEditAsset.item.classstructureid = itemSelected.classstructureid;
    dsEditAsset.item.hierarchypath = itemSelected.hierarchypath;

    let assetSpecificationDS = this.app.findDatasource("assetSpecificationEditTempDS");
    if (assetSpecificationDS) {
      assetSpecificationDS.reset();
    }

    let specDatas = itemSelected.classspec;
    if (specDatas && specDatas.length > 0) {
      this.updateSpecIds(specDatas);

      await assetSpecificationDS.load({
        src: {
          member: specDatas,
        },
      });
    }
  }

  /**
    * This is just for backend compatibility.
    */
  updateSpecIds(specDatas) {
    /* istanbul ignore else */
    if (specDatas) {
      specDatas.forEach(spec => {
        spec['linearassetspecid'] = 0;
        spec['anywhererefid'] = new Date().getTime() + Math.floor(Math.random() * 1000);
        spec['_rowstamp']=  undefined;
      });
    }
  }

  async changeLoctionLookup() {
    let ds = this.app.findDatasource("locationLookupDS");
    await ds.initializeQbe();
    ds.setQBE('type', 'in', ['OPERATING','REPAIR','VENDOR']);
    this.page.state.locationList = await ds.searchQBE();
  }

  async loadLocationLookup(){
    await this.changeLoctionLookup();
    this.page.showDialog('openLocationLookupEdit');
  }


  handleLocationBarcodeScan(event) {
    let dsEditAsset = this.app.findDatasource("dsEditAsset");
    if (event.value) {   
      dsEditAsset.item.location = event.value; 
    } 
    this.validateLocation();
  }

  async moveAsset(assetItem) {
    let response;
    let currDate = new Date();
    let dataFormatter = this.app.dataFormatter;
    this.page.state.parentUpdatedFailed = false;

    if (assetItem.parent || assetItem.location) {
      currDate = dataFormatter.convertDatetoISO(currDate);
      let dsEditAsset = this.app.findDatasource("dsEditAsset");
      dsEditAsset.on("invoke-action-failed", this.onInvokeActionFailed);
      const assetItem = dsEditAsset.currentItem;

      let action = 'moveSingleAsset';
      let option = {
        record: assetItem,
        parameters: {
          newLocation: assetItem.location,
          newSite: assetItem.siteid,
          newParent: assetItem.parent
        },
        headers: {
          'x-method-override': 'PATCH'
        },
        responseProperties: 'status',
        localPayload: {
          newLocation: assetItem.location,
          newSite: assetItem.siteid,
          newParent: assetItem.parent
        },
        query: { interactive: true },
        waitForUpload: true
      };
      response  = await dsEditAsset.invokeAction(action, option);
    }
    return response;
  }

  async openClassificationLookupEdit() {
    this.page.state.classificationChanged = false;
    this.page.showDialog('openClassificationLookupEdit');
  }
}

export default AssetEditDataController;
