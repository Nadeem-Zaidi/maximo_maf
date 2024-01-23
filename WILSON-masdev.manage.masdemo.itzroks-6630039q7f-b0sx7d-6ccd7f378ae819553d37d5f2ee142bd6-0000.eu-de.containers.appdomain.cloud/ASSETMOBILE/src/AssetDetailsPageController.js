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
const TAG = "AssetDetailsPageController";

class AssetDetailsPageController {
  pageInitialized(page, app) {
    log.t(TAG, "Page Initialized");
    this.app = app;
    this.page = page;
    this.setDefaultValidationParams();
  }

  /*
   * Method to resume the page
   */
  pageResumed() {
    if (this.app.pageStack.length === 1) {
      this.app.pageStack = ["assetlist", "assetDetails"];
    }

    this.page.state.noDataFoundErrMsg = false;
    this.page.state.assetType = "";
    this.page.state.latitudey = "";
    this.page.state.isMobile = Device.get().isMaximoMobile;
    this.page.state.locationavailable = false;
   
    if (!this.app.state.doclinksCountData) {
      this.app.state.doclinksCountData = {};
    }

    this.loadData();
  }

  async loadData() {
    const assetDetailsDS = this.app.findDatasource("assetDetailsDS");
    const assetSpecs = this.app.findDatasource("assetSpecificationDS");
    const serviceAddressDs = this.app.findDatasource("serviceAddressDS");
    let dsCurrentItem;

    if (this.page.params.href) {
      const items = await assetDetailsDS.load({
        noCache: true,
        itemUrl: this.page.params.href,
      });

      if(!assetDetailsDS.item || !assetDetailsDS.item.href){
        this.page.state.noDataFoundErrMsg = true;
        return false;
      }

      //istanbul ignore else
      if (assetSpecs) {
        await assetSpecs.load();
      }

      if (this.app.state.incomingContext) {
        this.app.state.incomingContext = null;
      }

      //istanbul ignore else
      if (items[0]) {
        // Cloned object as simultaneous operation on DB was making the DB empty.
        dsCurrentItem = { ...{}, ...items[0] };

        //istanbul ignore else
        if (dsCurrentItem) {
          //istanbul ignore next
          if (dsCurrentItem.assetspec) {
            assetDetailsDS.item.assetspeccount = dsCurrentItem.assetspec.length;
          }

          if (serviceAddressDs) {
            const items = serviceAddressDs.getItems();

            if (items.length > 0) {
              this.page.state.latitudey =
                items[0].latitudey != 0 && items[0].longitudex != 0 ? true : false;
            }
          }

          this.setDefaultValidationParams();

          this.page.state.parentAssetInfo = dsCurrentItem.parent && dsCurrentItem.parentassetdesc ? dsCurrentItem.parent + "  " + dsCurrentItem.parentassetdesc : dsCurrentItem.parent;

          let assetTypeSynonym = await this.setDetailTextWithCodeAndDesc(
            dsCurrentItem,
            "assettype",
            "assetType",
            "synonymdomainData",
            "value"
          );
          if (assetTypeSynonym && assetTypeSynonym.length > 0) {
            this.page.state.assetType =
              assetTypeSynonym[0].value + "  " + assetTypeSynonym[0].description;
          }

          this.setAddressData(dsCurrentItem);
        }
      }
    }
  }

  async setDetailTextWithCodeAndDesc(
    dsCurrentItem,
    assetDetailItem,
    stateKey,
    dataSource,
    queryField
  ) {
    if (dsCurrentItem && dsCurrentItem[assetDetailItem]) {
      this.page.state[stateKey] = "";
      let dataSourceQEB = this.app.findDatasource(dataSource);
      await dataSourceQEB.initializeQbe();
      dataSourceQEB.setQBE(
        queryField,
        "=",
        dsCurrentItem[assetDetailItem]
      );
      const result = await dataSourceQEB.searchQBE();
      return result;
    } else {
      return [];
    }
  }

  setDefaultValidationParams() {
    this.page.state.statusLoading = true;
    this.page.state.selectedStatus = "";
    this.page.state.statusMemo = "";
  }

  setAddressData(dsCurrentItem) {
    let serviceAddressFields = [
      "streetaddress",
      "addressline2",
      "addressline3",
      "city",
      "regiondistrict",
      "country",
      "stateprovince",
      "postalcode",
    ];
    this.page.state.serviceAddress = "";

    for (var i = 0; i < serviceAddressFields.length; i++) {
      if (
        
        dsCurrentItem &&
        dsCurrentItem.serviceaddress &&
        dsCurrentItem.serviceaddress[serviceAddressFields[i]]
      ) {
        this.page.state.serviceAddress +=
          "  " +
          dsCurrentItem.serviceaddress[serviceAddressFields[i]] +
          ", ";
      }
    }

    if (this.page.state.serviceAddress) {
      this.page.state.serviceAddress = this.page.state.serviceAddress.substring(
        0,
        this.page.state.serviceAddress.length - 2
      );
    }
  }

  /*
   * Opens the meter detail for the corresponding asset for detail page.
   */
  async openMeterdetailDrawer(event) {
    let assetmetersds = this.app.findDatasource("assetListDummyDS");
    let response = await assetmetersds.load({
      noCache: true,
      itemUrl: event.item.href,
    });
    // istanbul ignore next
    if (response) {
      this.page.state.assetMeterHeader = this.getAssetName(event.item);
      this.page.showDialog("assetmeterdetailsDrawer");
    }
  }

  /*
   * Opens the specification drawer for corresponding asset for detail page.
   */
  async openSpecificationDrawer(event) {
    await this.checkDataType(event);
    this.page.showDialog("assetspecificationDrawer");
  }

  async checkDataType(event) {
    let assetAttributeDS = this.app.findDatasource("assetAttributeDS");
    const assetSpecificationDS = this.page.findDatasource("assetSpecificationDS");
    const assetSpecItems = assetSpecificationDS.getItems();
    let specDS = this.app.state.specData;
    const foundClass = specDS && specDS.find(element => (element.classstructureid === event.item.classstructure.classstructureid || element.classstructureid === event.item.classstructureid));
    let classSpec = foundClass && foundClass.classspec;
    const specId = [];

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
      attributeMap[element.assetattrid] = element.datatype_maxvalue;
    });

    let requiredSpecId;

    let dup = [...[], ...assetSpecItems];
    dup.forEach((element) => {
      element.datatype_maxvalue = attributeMap[element.assetattrid];
      requiredSpecId = classSpec && classSpec.find(classSpecElement => classSpecElement.assetattrid === element.assetattrid);
      element.domainid = requiredSpecId && requiredSpecId['domainid'];
      element['_rowstamp'] = undefined;
      
       //istanbul ignore else
      if(element.assetattributedesc && element.measureunitid ){
        element.computedLabel = element.assetattributedesc + ` (${element.measureunitid})`;
      } else if (element.assetattributedesc){
        element.computedLabel = element.assetattributedesc;
      } else if (element.measureunitid){
        element.computedLabel = element.assetattrid + ` (${element.measureunitid})`;
      } else {
        element.computedLabel = element.assetattrid
      }
    });

    await this.app.datasources.assetSpecCombinedDS.load({
      src: {
        member: dup,
      },
    });
  }

  async openAssetStatusList() {
    this.setDefaultValidationParams();
    this.page.state.statusDialog = "assetStatusChangeDialog";
    let synonymDS = this.app.findDatasource("synonymdomainData");
    let statusListDS = this.app.findDatasource("assetStatusList");
    let dsAssetStatus = this.app.findDatasource("assetDetailsDS");
    this.page.state.statusLoading = false;
    synonymDS.clearQBE();
    await synonymDS.initializeQbe();
    synonymDS.setQBE("domainid", "=", "LOCASSETSTATUS");
    synonymDS.setQBE("maxvalue", "!=", "IMPORTED");

    await synonymDS.searchQBE();
    let list = synonymDS.items;

    function removeValue(item, index, arr) {
      //istanbul ignore next
      if (
        item.value === dsAssetStatus.currentItem.status ||
        item.description === dsAssetStatus.currentItem.status_description
      ) {
        arr.splice(index, 1);
        return true;
      }
      return false;
    }

    list.filter(removeValue);

    statusListDS.resetState();
    await statusListDS.load({ src: list, noCache: true });
    this.page.showDialog("assetStatusChangeDialog");
  }

  async selectStatus(itemSelected) {
    // Select the new asset status
    this.page.state.selectedStatus = itemSelected.value;
    //istanbul ignore else
    if (!itemSelected._selected) {
      this.page.state.selectedStatus = "";
    }
  }

  async changeStatus() {
    this.page.state.statusLoading = true;
    let dsAssetStatus = this.app.findDatasource("assetDetailsDS");
    let selectedStatus = this.page.state.selectedStatus;

    //istanbul ignore else
    if (selectedStatus) {
      let action = "changeStatus";
      let option = {
        record: dsAssetStatus.currentItem,
        parameters: {
          status: selectedStatus,
          rollToAllChildren: false,
          removeFromActiveRoutes: false,
          removeFromActiveSP: false,
          changePMStatus: false,
        },
        headers: {
          "x-method-override": "PATCH",
        },
        responseProperties: "status",
        localPayload: {
          status: selectedStatus,
          rollToAllChildren: false,
          removeFromActiveRoutes: false,
          removeFromActiveSP: false,
          changePMStatus: false,
        },
        query: { interactive: false },
        waitForUpload: true,
      };

      this.page.state.statusLoading = true;
      await dsAssetStatus.invokeAction(action, option);
      await dsAssetStatus.forceReload();

      const assetStatusDialog = this.page.findDialog("assetStatusChangeDialog");
      //istanbul ignore next
      if (assetStatusDialog) {
        await assetStatusDialog.closeDialog();
      }
      this.page.state.statusLoading = false;
    }
  }

  /**
   * Get assetname or description for particular asset
   * @param  {Object} item asset item
   * @returns {String} computedAssetNum asset/description concatenated
   */

  getAssetName = (item) => {
    let computedAssetNum = null;
    //istanbul ignore else
    if (item && item.assetnum) {
      computedAssetNum = item.description
        ? item.assetnum + " " + item.description
        : item.assetnum;
      return computedAssetNum;
    }
  };

  /**
   * Function to open edit work order page when click on edit icon
   */
  openAssetEditPage(event) {
    let assetItem = event.item;

    //istanbul ignore else
    if (assetItem && (assetItem.assetnum || assetItem.href)) {
      this.app.setCurrentPage({
        name: "editasset",
        resetScroll: true,
        params: {
          assetnum: assetItem.assetnum,
          href: assetItem.href,
        },
      });
    }
  }

  /**
   * Function to save device location.
   * @param {*} param
   */
  async captureLocation(param) {
    let interactive = { interactive: true };
    let interactive2 = { interactive: true };
    let response;
    let addresscode;

    let geolocationlong = this.app.geolocation.state.longitude;
    let geolocationlat = this.app.geolocation.state.latitude;

    // istanbul ignore else
    if (geolocationlat != 0 && geolocationlong != 0) {
      this.page.state.locationavailable = true;
      const serviceAddressDs = this.app.findDatasource("serviceAddressDS");
      const serviceAddressItems = serviceAddressDs.getItems();

      if (serviceAddressItems.length == 0) {
        const newServiceAddressDs = this.app.findDatasource(
          "newServiceAddressDS"
        );
        let newAddressItem = await newServiceAddressDs.addNew();
        addresscode = newAddressItem.addresscode;
        newAddressItem.longitudex = geolocationlong;
        newAddressItem.latitudey = geolocationlat;

        newAddressItem.siteid = param.datasource.item.siteid;
        newAddressItem.orgid = this.app.client.userInfo.insertOrg;

        // Incase of mobile use timestamp as temporary address code
        // istanbul ignore else
        if (this.page.state.isMobile) {
          addresscode = Math.floor(new Date().getTime() / 1000);
          newAddressItem.addresscode = addresscode;
        }

        response = await newServiceAddressDs.save(interactive);
        param.datasource.item.saddresscode = addresscode;
        response = await param.datasource.save(interactive2);
        await param.datasource.forceReload();
        await newServiceAddressDs.forceReload();

        this.page.state.latitudey = true;
        this.app.toast("Device location saved", "success");
      } else {
        const addressItem = serviceAddressItems[0];
        addressItem.longitudex = geolocationlong;
        addressItem.latitudey = geolocationlat;
        response = await serviceAddressDs.save(interactive);

        this.page.state.latitudey = true;
        this.app.toast("Device location saved", "success");
      }
    } else {
      this.app.toast("Device location not available", "error");
    }
  }

  /**
   * Function to save the specification data
   */
  async saveSpecification(event) {
    let interactive = { interactive: true };
    const assetSpecCombinedDS = this.app.findDatasource("assetSpecCombinedDS");
    const assetspecificationDrawer = this.page.findDialog("assetspecificationDrawer");
    
    //istanbul ignore else
    if (assetSpecCombinedDS) {
      let dsAssetDetail = this.app.findDatasource("assetDetailsDS");
      dsAssetDetail.item['assetspec'] = assetSpecCombinedDS.items;

      await dsAssetDetail.save(interactive);
      await dsAssetDetail.forceReload();
    }

    //istanbul ignore next
    if (assetspecificationDrawer) {
      await assetspecificationDrawer.closeDialog();
    }
  }

   /**
   * Redirects to attachments page.
   */
   showAttachmentPage(event) {
    this.app.setCurrentPage({
      name: 'attachments',
      params: { itemhref: event.item.href },
    });
  }

  async openSpecLookup(evt) {
    if(evt.item.datatype_maxvalue === "NUMERIC") {
      let ds = this.app.findDatasource("numericDomainDS");
      await ds.clearQBE();
      await ds.searchQBE();
      await ds.initializeQbe();
      ds.setQBE("domainid", "=", evt.item.domainid);
      await ds.searchQBE();

      evt.page.showDialog('assetSpecNumericDomainLookup');
      this.page.state.currentItem = evt.item;
    } else if(evt.item.datatype_maxvalue === "ALN") {
      let ds = this.app.findDatasource("alndomainData");
      await ds.clearQBE();
      await ds.searchQBE();
      await ds.initializeQbe();
      ds.setQBE("domainid", "=", evt.item.domainid);
      await ds.searchQBE();
      evt.page.showDialog('assetSpecDomainLookup');
      this.page.state.currentItem = evt.item;
    } else  {
      let ds = this.app.findDatasource("tableDomainDS");
      await ds.clearQBE();
      await ds.searchQBE();
      await ds.initializeQbe();
      ds.setQBE("domainid", "=", evt.item.domainid);
      await ds.searchQBE();
      evt.page.showDialog('assetSpecTableDomainLookup');
      this.page.state.currentItem = evt.item;
    }
  }

  async chooseAssetSpecDomain(itemSelected) {
    let updateValue = this.page.state.currentItem;
    let assetSpecCombinedDS = this.app.findDatasource("assetSpecCombinedDS");
    updateValue['alnvalue'] = itemSelected.value;
    assetSpecCombinedDS.items.push(updateValue)
  }

  async chooseAssetSpecNumDomain(itemSelected) {
    let updateValue = this.page.state.currentItem;
    let assetSpecCombinedDS = this.app.findDatasource("assetSpecCombinedDS");
    updateValue['numvalue'] = itemSelected.value;
    assetSpecCombinedDS.items.push(updateValue)
  }

  async chooseAssetSpecTableDomain(itemSelected) {
    let updateValue = this.page.state.currentItem;
    let assetSpecCombinedDS = this.app.findDatasource("assetSpecCombinedDS");
    updateValue['tablevalue'] = itemSelected.description;
    assetSpecCombinedDS.items.push(updateValue)
  }
  
}
export default AssetDetailsPageController;
