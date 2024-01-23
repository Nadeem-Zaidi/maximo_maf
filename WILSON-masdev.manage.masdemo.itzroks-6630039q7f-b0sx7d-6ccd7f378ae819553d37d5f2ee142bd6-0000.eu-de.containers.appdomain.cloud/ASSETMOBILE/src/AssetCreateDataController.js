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

import { log, Device } from "@maximo/maximo-js-api";
import "regenerator-runtime/runtime";
const TAG = "ASSETMANAGER";

class AssetCreateDataController {
  /**
   * defines fields to implement onCustomSaveTransition()
   * which is to avoid defaultSaveTransition defined at framework level
   * and uses save method implemented in controller itself.
   */
  constructor() {
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
    this.callDefaultSave = true;
  }

  pageInitialized(page, app) {
    log.t(TAG, "Asset create Page Initialized");
    this.app = app;
    this.page = page;
    this.page.state.isLocationAssetFocus = false;
    this.page.state.locationList = undefined;
    this.page.state.selectedAssetLocation = undefined;

    this.setDefaultValidationParams();
  }

  pageResumed() {
    this.app.pageStack = ["assetlist", "createasset"];
    this.page.state.selectedAssetLocation = undefined;

    this.page.state.isMobile = Device.get().isMaximoMobile;

    if (this.app.geolocation && this.page.state.isMobile) {
      // Update Geo Location
      this.app.geolocation.updateGeolocation();
    }

    this.setDefaultValidationParams();
    this.openNewAsset();
  }

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  setDefaultValidationParams() {
    this.page.state.hasAssetNumber = false;
    this.page.state.validFailureCode = true;
    this.page.state.validManufacture = true;
    this.page.state.validVendor = true;
    this.page.state.validType = true;
    this.page.state.validLocation = true;
    this.page.state.saveInProgress = false;

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
    const assetItem = this.page.datasources.dsCreateAsset.item;
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

  async validateAssetNumber() {
    const assetItem = this.app.findDatasource("dsCreateAsset").item;
    if (this.app.client) {
      assetItem.siteid = this.app.client.userInfo.insertSite;
    }


    if (assetItem.assetnum && this.hasValue("assetnum", assetItem.assetnum)) {
      this.page.state.hasAssetNumber = true;
      this.clearWarnings("assetnum");
    } else {
      this.page.state.hasAssetNumber = false;
    }

    this.updateSaveButtonVisibility();
  }

  async validateFailureCode() {
    const assetItem = this.app.findDatasource("dsCreateAsset").item;

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
    const assetItem = this.app.findDatasource("dsCreateAsset").item;;

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
    const assetItem = this.app.findDatasource("dsCreateAsset").item;;

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
    const assetItem = this.app.findDatasource("dsCreateAsset").item;

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
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.setWarning(dsCreateAsset.item, field, message);
    this.page.state.readOnlyState = true;
  }

  /**
   * Function to clear field warnings
   */
  clearWarnings(field) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.clearWarnings(dsCreateAsset.item, field);
  }

  updateSaveButtonVisibility() {
    const ds = this.page.datasources.dsCreateAsset;

    this.page.state.readOnlyState = !this.page.state.hasAssetNumber ||  !this.page.state.validType || !this.page.state.validManufacture || !this.page.state.validVendor || !this.page.state.validFailureCode || !this.page.state.validLocation;
  }

  /**
   * Function to open Create Asset page.
   */
  async openNewAsset() {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.clearChanges();

     /* istanbul ignore next */
    if (!dsCreateAsset.getSchema()) {
      // After coming back from humai, schema is missing, this line is used to retrieve schema again.
      await dsCreateAsset.initializeQbe();
    }

     /* istanbul ignore else */
    if (dsCreateAsset) {
      await dsCreateAsset.addNew();
    }

    let assetSpecificationDS = this.app.findDatasource("assetSpecificationCreateDS");
    if (assetSpecificationDS) {
      assetSpecificationDS.reset();
    }
  }

  /**
   * Function to create new asset.
   */
  async createAsset(evt) {
    let asset = evt.item;

    this.page.state.saveInProgress = true;
    const device = Device.get();

    // istanbul ignore else
    if (asset) {
      let assetCreateResource = this.app.findDatasource("dsCreateAsset");
      assetCreateResource.currentItem.siteid = this.app.client.userInfo.insertSite;
      assetCreateResource.currentItem.orgid = this.app.client.userInfo.insertOrg;
      assetCreateResource.currentItem.assetuid =  new Date().getTime();

      let assetSpecificationCreateDS = this.app.findDatasource("assetSpecificationCreateDS");
      if(assetSpecificationCreateDS && assetSpecificationCreateDS.items.length > 0) {
        let specDatas = assetSpecificationCreateDS.items;
        await this.updateSpecificationAttributes(specDatas);

        assetCreateResource.currentItem["assetspec"] = specDatas;
        assetCreateResource.currentItem["assetspeccount"] = specDatas.length;
        asset['classstructure'] = { 
          "hierarchypath": assetCreateResource.currentItem.hierarchypath, 
          "classstructureid": assetCreateResource.currentItem.classstructureid
        };
      }

      let synonymDS =  this.app.findDatasource("synonymdomainData");
      await synonymDS.initializeQbe();
      synonymDS.setQBE('domainid', '=', 'LOCASSETSTATUS');
      synonymDS.setQBE('maxvalue', '=', 'NOT READY');
      const notReadyStatusItem =  await synonymDS.searchQBE();

      // istanbul ignore else
      if(notReadyStatusItem.length > 0) {
        assetCreateResource.currentItem.status_description = notReadyStatusItem[0].description;
      }

      try {
        // istanbul ignore else
        if (this.callDefaultSave) {
          this.page.state.useConfirmDialog = false;
        }

        let response;
        this.saveDataSuccessful = true;
        assetCreateResource.on("save-data-failed", this.onSaveDataFailed);

        if(this.app.state.currentMapData?.coordinate?.length) {
          await this.saveLocation(assetCreateResource);
        }
        let interactive = { interactive: !this.page.state.isMobile};

        response = await assetCreateResource.save(interactive);
        this.page.state.saveInProgress = false;

         /* istanbul ignore next */
        if (response && assetCreateResource.currentItem) {
          let assetnum = assetCreateResource.currentItem.assetnum;
          let itemhref = assetCreateResource.currentItem.href;
          if (device.isMaximoMobile) {
            if (
              this.app.pageStack.length === 2 &&
              this.app.pageStack[1] === "createasset"
            ) {
              this.app.pageStack.push("assetlist");
            }
            this.app.setCurrentPage({
              name: "assetDetails",
              resetScroll: true,
              params: { assetnum: assetnum, href: itemhref },
            });
          } else {
            /* istanbul ignore next */
            if (response.items && response.items.length > 0) {
              if (
                this.app.pageStack.length === 2 &&
                this.app.pageStack[1] === "createasset"
              ) {
                this.app.pageStack.push("assetlist");
              }
              if (response.items[0].href) {
                this.app.setCurrentPage({
                  name: "assetDetails",
                  resetScroll: true,
                  params: {
                    assetnum: assetnum,
                    href: response.items[0].href,
                    siteid: response.items[0].siteid,
                  },
                });
              }
            }
          }
        }
      } catch (error) {
        /* istanbul ignore next */
        log.t(TAG, error);
      } finally {
         /* istanbul ignore else */
        if (this.callDefaultSave) {
          this.page.state.useConfirmDialog = true;
        }
        this.page.state.saveInProgress = false;
        assetCreateResource.off("save-data-failed", this.onSaveDataFailed);
      }
    }
  }

  /**
    * Function to save client location
   */
  async saveLocation(ds){
    const device = Device.get();
    let interactive = { interactive: !this.page.state.isMobile};
    let response;

    // istanbul ignore next
    if(this.app.state.currentMapData?.coordinate?.length) {
      const timeRef = new Date().getTime()
      const maxVars = await this.getMaxvars();
      let geoCoordinates = this.app.state.currentMapData.coordinate;
      
      const geoLatLong = this.setCoordinates();

      let autolocate = {
          coordinates: [geoLatLong?.[0], geoLatLong?.[1]],
          type: 'Point'	
      }

      /* istanbul ignore else */
      if(maxVars[0]?.varvalue === 'LATLONG') {
        geoCoordinates = geoLatLong
      }

      const newServiceAddressDs = this.app.findDatasource("newServiceAddressDS");
      let newAddressItem = await newServiceAddressDs.addNew();
      let addresscode = newAddressItem.addresscode;
      newAddressItem.longitudex = geoCoordinates[0];
      newAddressItem.latitudey = geoCoordinates[1];

      newAddressItem.siteid = ds.item.siteid;
      newAddressItem.orgid = this.app.client.userInfo.insertOrg;

      // Incase of mobile use timestamp as temporary address code
        // istanbul ignore else
        if (this.page.state.isMobile) {
          addresscode = Math.floor(new Date().getTime() / 1000);
          newAddressItem.addresscode = addresscode;
        }

        response = await newServiceAddressDs.save(interactive);
        ds.item.saddresscode = addresscode;
    }
    return interactive;
  }

  /**
   * Function to set the coordinates
   */
  setCoordinates(){
    const geoLatLong = this.app?.map?.convertCoordinates(
      this.app.state.currentMapData.coordinate,
      this.app.map.getBasemapSpatialReference(),
      'EPSG:4326'
    );
    return geoLatLong;
  }

  /**
   * Function to get maxvars item
   */
  async getMaxvars() {
    let maxVars = [];
    let orgDS = this.app.findDatasource('defaultSetDs');
    /* istanbul ignore else */
    if(orgDS.items && orgDS.items.length) {
      maxVars = orgDS.items[0].maxvars.filter(item => item.varname === 'COORDINATE')
    }
    return maxVars;
  }

  /**
   * set Asset value on scanning a barcode/QR code
   */
  handleAssetBarcodeScan(event) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    /* istanbul ignore next */
    if (event.value) {
      dsCreateAsset.item.assetnum = event.value;
    }
    this.validateAssetNumber();
  }

  /**
  * set Serial value on scanning a barcode/QR code
  */
  handleSerialBarcodeScan(event) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    /* istanbul ignore next */
    if (event.value) {
      dsCreateAsset.item.serialnum = event.value;
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
    this.page.showDialog('failureClassLookup');
  }

  chooseFailureCode(itemSelected) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.item.failurecode = itemSelected.computeFailureCode;
    dsCreateAsset.item.failurecodedesc = itemSelected.failurecode.description;

    // Clears warning and update save button visibility
    this.clearWarnings("failurecode");
    this.page.state.validFailureCode = true;
    this.updateSaveButtonVisibility();
  }

  chooseManufacturer(itemSelected) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.item.manufacturer = itemSelected.company;
    dsCreateAsset.item.manufacturername =  itemSelected.name;

    // Clears warning and update save button visibility
    this.clearWarnings("manufacturer");
    this.page.state.validManufacture = true;
    this.updateSaveButtonVisibility();
  }

  chooseVendor(itemSelected) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.item.vendor = itemSelected.company;
    dsCreateAsset.item.vendorname = itemSelected.name;

    // Clears warning and update save button visibility
    this.clearWarnings("vendor");
    this.page.state.validVendor = true;
    this.updateSaveButtonVisibility();
  }

  chooseType(itemSelected) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.item.assettype = itemSelected.value;

    this.clearWarnings("assettype");
    this.page.state.validType = true;
    this.updateSaveButtonVisibility();
  }

  async chooseClassification(itemSelected) {
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.item.classstructureid = itemSelected.classstructureid;
    dsCreateAsset.item.hierarchypath = itemSelected.hierarchypath;
    let specDatas = itemSelected.classspec;
    let assetSpecificationDS = this.app.findDatasource("assetSpecificationCreateDS");
    
    // istanbul ignore else
    if (assetSpecificationDS) {
      assetSpecificationDS.reset();
    }

     // istabul ignore next 
    if (specDatas && specDatas.length > 0) {
      await assetSpecificationDS.load({
        src: {
          member: specDatas,
        },
      });
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

  async chooseParent(itemSelected) {
    const assetItem = this.page.datasources.dsCreateAsset.item;
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
    this.page.showDialog('manufacturerLookup');
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
    this.page.showDialog('vendorLookup');
  }

   async openTypeLookup() {
    let ds = this.app.findDatasource("synonymdomainData");

    await ds.initializeQbe();
    ds.setQBE('domainid', '=', "ASSETTYPE");
    await ds.searchQBE();
    this.page.showDialog('typeLookup');
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


  
  /**
	 * Use to set the selected item..
	 * @param {item} asset item
	 */
  async chooseAssetItem(item) {
    this.clearWarnings("parent");
    let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
    dsCreateAsset.item["parentassetdesc"] = item.description;
    if(item && item.location){
      dsCreateAsset.item.location = item.location; 
      this.page.state.selectedAssetLocation = item.location;
    }else{
      this.page.state.selectedAssetLocation = undefined;
    }

    if(item?.locationdesc) {
      dsCreateAsset.item.locationdesc = item.locationdesc; 
    }
    await this.changeLoctionLookup();
}



chooseAssetLocation(item){
  this.clearWarnings("location");
  this.page.state.validLocation = true;
  let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
  dsCreateAsset.item.location = item.location;
  dsCreateAsset.item.locationdesc = item.description;
  this.updateSaveButtonVisibility();
}

async changeLoctionLookup(){
  let ds = this.app.findDatasource("locationLookupDS");
  await ds.initializeQbe();
  if(this.page.state.selectedAssetLocation){
    ds.setQBE('location', '=', this.page.state.selectedAssetLocation);
    this.page.state.locationList = await ds.searchQBE();
  }else{
    ds.clearQBE();
    this.page.state.locationList = await ds.searchQBE();
  }
}

async loadLocationLookup(){
  await this.changeLoctionLookup();
  this.page.showDialog('openLocationLookup');
}


handleLocationBarcodeScan(event) {
  let dsCreateAsset = this.app.findDatasource("dsCreateAsset");
  if (event.value) {   
    dsCreateAsset.item.location = event.value; 
  } 
  this.validateLocation();
}

async openClassificationLookup() {
  this.page.showDialog('openClassificationLookup');
}


}

export default AssetCreateDataController;