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

import {HighlighetedSymbols, getMapDimension} from './maps/MapUtils';
 
import {log, Device} from '@maximo/maximo-js-api';
class CreateInspectionsPageController {
  constructor() {
    this.memoizedSymbols = {};
    this.getAssetOrLocation.bind(this);
    this.selectAsset.bind(this);
    this.selectValueFromMap.bind(this);
    this.clusterFilter.bind(this);
  }
 
  /**
   * Called once for the lifetime of the application.
   *
   * @param {import('@maximo/maximo-js-api').Page} page - Page instance.
   * @param {import('@maximo/maximo-js-api').Application} app - Application instance.
   */
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
 
    let device = Device.get();
    const {
      mapListHeight,
      mapHeight,
      mapDialogHeight,
      mapCardHeight,
      mapCardScroll,
      mapPaddingRight,
      mapPaddingLeft,
      mapPaddingBottom
    } = getMapDimension(device);
 
    this.page.state.mapListHeight = mapListHeight;
    this.page.state.mapHeight = mapHeight;
    this.page.state.mapDialogHeight = mapDialogHeight;
    this.page.state.mapCardHeight = mapCardHeight;
    this.page.state.mapCardScroll = mapCardScroll;
    this.page.state.mapPaddingRight = mapPaddingRight;
    this.page.state.mapPaddingLeft = mapPaddingLeft;
    this.page.state.mapPaddingBottom = mapPaddingBottom;
  }
 
  /**
   * Called every time the page is resumed, including the first time the page is created.
   *
   * @param {import('@maximo/maximo-js-api').Page} page - Page instance.
   * @param {import('@maximo/maximo-js-api').Application} app - Application instance.
   */
  pageResumed(page, app) {
    this.app = app;
    this.page = page;
    let auxDs = page.findDatasource('createInspectionDSAux');
 
    auxDs.load();
 
    // istanbul ignore next
    if (auxDs.item) {
      auxDs.item.asset = '';
      auxDs.item.location = '';
    }
 
    this.clearValue('asset');
    this.clearValue('locations');
    this.clearValue('formSelection');
    this.page.state.isCreating = false;
  }

  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  onMapInitialized(map) {
    this.app.map = map;
  }
 
  /**
   * should open pointed dialog
   * @param {String} dialogId
   */
  //istanbul ignore next
  openDialog(dialogId) {
    this.page.showDialog(dialogId);
  }
 
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  /**
   *
   * @param {*} layerName
   * @param {*} maxState
   */
  getHighLightSymbols(layerName, maxState) {
    let base64Symbol = null;
    if (
      this.memoizedSymbols[layerName] &&
      this.memoizedSymbols[layerName][maxState]
    ) {
      base64Symbol = this.memoizedSymbols[layerName][maxState];
    } else {
      const layerSymbols = HighlighetedSymbols[layerName.toUpperCase()];
      const symbol =
        layerSymbols[maxState.toUpperCase()] || layerSymbols['OTHERS'];
      base64Symbol = Object.assign({
        url: symbol.symbol,
        scale: 1,
        offsetx: 10,
        offsety: 40,
        width: 48,
        height: 40
      });
      if (this.memoizedSymbols[layerName]) {
        this.memoizedSymbols[layerName][maxState] = base64Symbol;
      } else {
        this.memoizedSymbols[layerName] = {
          maxState: base64Symbol
        };
      }
    }
    return base64Symbol;
  }
 
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleMapClick(item) {
    if (
      item.hasFeature &&
      item.featuresAndLayers &&
      item.featuresAndLayers.length > 0
    ) {
      const layer = item.featuresAndLayers[0].layer;
      const layerName = layer.get('layerName');
      if (!layerName) {
        log.i('Layer name is empty.');
        return;
      }
 
      if (
        item.featuresAndLayers[0].feature.values_.features &&
        item.featuresAndLayers[0].feature.values_.features.length > 1
      ) {
        let featureCluster = item.featuresAndLayers[0].feature;
        const highlightSymbolCluster = this.getHighLightSymbols(
          layerName,
          'cluster'
        );
 
        let clusterArray = item.featuresAndLayers[0].feature.values_.features;
        if (layerName === 'ASSET') {
          let assetCLuster = clusterArray.map(asset => {
            return asset.values_.maximoAttributes.assetnum;
          });
          this.clusterFilter('assetnum', assetCLuster, 'assetMapDS');
        } else if (layerName === 'LOCATION') {
          let locationCLuster = clusterArray.map(locations => {
            return locations.values_.maximoAttributes.location;
          });
          this.clusterFilter('location', locationCLuster, 'locationMapDS');
        }
 
        const size = item.featuresAndLayers[0].feature.values_.features.length;
        const scale = 1 + 0.3 * Math.log(size);
        highlightSymbolCluster.scale = scale;
        let styleCluster = this.app.map.getNewStyle(highlightSymbolCluster);
        this.app.map.changeFeatureStyle(featureCluster, styleCluster, {
          layer: item.featuresAndLayers[0].layer
        });
        this.page.state.mapSelectDisabled = true; //Cannot set cluster as selection
      } else if (
          item.featuresAndLayers[0].feature.values_.features ||
          layer.get('isMarkerLayer')
      ) {
          const isMarkerLayer = layer.get('isMarkerLayer');
        let feature = item.featuresAndLayers[0].feature;
          let maximoAttributes = isMarkerLayer
              ? feature.get('maximoAttributes')
              : feature.get('features')[0].get('maximoAttributes');
          const mainLayerName = isMarkerLayer
              ? layer.get('relatedLayer')
              : layerName;
        const highlightSymbol = this.getHighLightSymbols(
              mainLayerName,
              maximoAttributes.status_maxvalue
        );
        let style = this.app.map.getNewStyle(highlightSymbol);
        this.app.map.changeFeatureStyle(feature, style, {
          autoRestoreOnZoom: false,
          layer: item.featuresAndLayers[0].layer
        });
        this.page.state.mapValueSelected = maximoAttributes;
        this.page.state.mapSelectDisabled = false;
      }
    } else {
      this.app.map.clearFeatureStyle();
      let ds = this.page.state.mapIsForAsset ? 'assetMapDS' : 'locationMapDS';
      this.clearCluster(ds);
      this.page.state.mapSelectDisabled = true;
    }
  }
 
  async clusterFilter(key, cLuster, ds) {
    if (cLuster) {
      let lookupDs = this.page.findDatasource(ds);
      await lookupDs.initializeQbe();
      lookupDs.setQBE(key, 'in', cLuster);
      let items = await lookupDs.searchQBE();
      /* istanbul ignore else  */
      this.page.state.showClusterList = true;
 
      return items;
    }
  }
 
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  clearCluster(ds) {
    this.page.state.showClusterList = false;
    let lookupDs = this.page.findDatasource(ds);
    this.clearSearch(lookupDs);
    this.app.map.clearFeatureStyle();
  }
 
  /**
   * When the checkmark icon is clicked on map dialog
   */
  selectValueFromMap() {
    if (this.page.state.mapIsForAsset) {
      this.selectAsset(this.page.state.mapValueSelected);
      this.page.state.asset = this.page.state.mapValueSelected;
    } else {
      this.selectLocation(this.page.state.mapValueSelected);
      this.page.state.locations = this.page.state.mapValueSelected;
    }
    this.page.findDialog('assetSelect').closeDialog();
  }
 
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleItemClick(item) {
    if (!item.autolocate) {
      return;
    }

    let mapLayerName = this.page.state.mapIsForAsset ? 'ASSET' : 'LOCATION';
 
    let itemGeometry = JSON.parse(item.autolocate);
    let center = this.app.map.getGeometryCenter(itemGeometry);
    let centerCoordinates = center.getCoordinates();
    let itemSpatialReference =
      this.app.map.getLayerSpatialReference(mapLayerName);
    let basemapSpatialReference = this.app.map.getBasemapSpatialReference();
    if (itemSpatialReference !== basemapSpatialReference) {
      itemGeometry.coordinates = this.app.map.convertCoordinates(
        centerCoordinates,
        itemSpatialReference,
        basemapSpatialReference
      );
    }
 
    let feature = this.app.map.getFeatureByGeo(
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: centerCoordinates
        }
      },
      'geojson'
    );

    if (this.page.state.mapValueSelected === item) {
      this.app.map.clearFeatureStyle();
      this.page.state.mapSelectDisabled = true;
      this.page.state.mapValueSelected = {};
    } else if (
     feature &&
      feature.hasFeature &&
      feature.featuresAndLayers &&
      feature.featuresAndLayers.length > 0
    ) {
      let maximoAttributes =
        feature.featuresAndLayers[0].feature.get('maximoAttributes');
 
      const layerName = feature.featuresAndLayers[0].layer.get('layerName');
      const highlightSymbol = this.getHighLightSymbols(
        layerName,
        maximoAttributes.status_maxvalue
      );
 
      let style = this.app.map.getNewStyle(highlightSymbol);
 
      if (feature.featuresAndLayers.length > 0) {
        this.app.map.changeFeatureStyle(
          feature.featuresAndLayers[0].feature,
          style,
          {autoRestoreOnZoom: false}
        );
        this.app.map.centerTo(
          itemGeometry.coordinates[0],
          itemGeometry.coordinates[1],
          false
        );
      }
      this.page.state.mapSelectDisabled = false;
      this.page.state.mapValueSelected = item;
    }
  }
 
  // istanbul ignore next
  openMapDialog(isForAsset) {
    this.page.state.mapIsForAsset = isForAsset;
    this.page.state.showClusterList = false;
    // istanbul ignore next
    if (isForAsset) {
      let assetMapDS = this.page.datasources['assetMapDS'];
      assetMapDS.clearState();
      assetMapDS.resetState();
      assetMapDS.lastQuery.searchText = '';
      // istanbul ignore next
      /*       if(this.page.state.location){
        assetMapDS.setQBE('location', '=', this.page.state.location);
      }else{ */
      //understand better
    } else {
      let locationMapDS = this.page.datasources['locationMapDS'];
      // istanbul ignore next
      if (locationMapDS.lastQuery) {
        locationMapDS.clearState();
        locationMapDS.resetState();
        locationMapDS.lastQuery.searchText = '';
      }
    }
    this.page.showDialog('mapDialog');
  }
 
  /**
   * called when an Asset is selected from the lookup
   * should save selected asset to state
   * @param {Object} item is Asset
   */
  selectAsset(item) {
    this.page.state.invalidAsset = false;
    this.page.state.asset = item;
    this.clearValue('locations');
    this.page.state.assetSelection = item?.description
      ? `${item.description} (${item.assetnum})`
      : item.assetnum;
    this.page.state.locationSelection = this.app.getLocalizedLabel(
      'no_location_selected',
      'No location selected'
    );
    this.page.findDialog('assetSelect').closeDialog();
    this.checkRequerideFields();
  }
 
  /**
   * called when a location is selected from the lookup
   * should save selected location to state
   * @param {Object} item is Location
   */
  selectLocation(item) {
    this.page.state.invalidLocation = false;
    this.page.state.locations = item;
    this.clearValue('asset');
    this.page.state.locationSelection = item?.description
      ? `${item.description} (${item.location})`
      : item.location;
    this.page.state.assetSelection = this.app.getLocalizedLabel(
      'no_asset_selected',
      'No asset selected'
    );
    this.page.findDialog('locationSelect').closeDialog();
    this.checkRequerideFields();
  }
 
  /**
   * called when an Asset or location is selected from the lookup
   * should clear the value from location/Asset
   *
   * @param {String} type
   */
  clearValue(type) {
    this.page.state[type] = {};
 
    /* istanbul ignore else  */
    if (type === 'asset' || type === 'locations') {
      this.page.state.assetSelection = this.app.getLocalizedLabel(
        'select_asset',
        'Select an asset'
      );
      this.page.state.locationSelection = this.app.getLocalizedLabel(
        'select_location',
        'Select a location'
      );
 
      if (type === 'asset') {
        this.page.state.asset = undefined;
        if (this.page.datasources.createInspectionDSAux?.item) {
          this.page.datasources.createInspectionDSAux.item.asset = '';
          this.page.datasources.createInspectionDSAux.item.assetnum = '';
        }
      } else {
        this.page.state.locations = undefined;
        if (this.page.datasources.createInspectionDSAux?.item) {
          this.page.datasources.createInspectionDSAux.item.location = '';
        }
      }
    } else if (type === 'formSelection') {
      this.page.state.inspForm = undefined;
      this.page.state.formSelection = this.app.getLocalizedLabel(
        'select_template',
        'Select a template'
      );
    }
    this.checkRequerideFields();
  }
 
  /**
   * Return the valid asset or location
   * @param {app} is application object
   * @param {ds} is database name
   * @param {key} is attribute to be filtered
   * @param value is key value
   */
  async getAssetOrLocation(app, ds, key, value) {
    //istanbul ignore else
    if (value !== '') {
      let lookupDs = this.page.findDatasource(ds);
      await lookupDs.initializeQbe();
      lookupDs.setQBE(key, '=', value);
      lookupDs.setQBE('siteid', '=', app.client.userInfo.defaultSite);
      let items = await lookupDs.searchQBE();
      /* istanbul ignore else  */
      if (items.length <= 1) {
        await this.clearSearch(lookupDs);
      }
 
      return items;
    }
  }
 
  /**
   * clear the ds search;
   * @param {ds} is database name
   */
  async clearSearch(ds) {
    /* istanbul ignore else  */
    if (ds && ds.lastQuery.qbe && JSON.stringify(ds.lastQuery.qbe) !== '{}') {
      ds.clearQBE();
      await ds.searchQBE(undefined, true);
    }
  }
 
  async handleAsset(event) {
    //istanbul ignore else
    if (!!event?.value) {
      const item = await this.getAssetOrLocation(
        this.app,
        'assetLookupDS',
        'assetnum',
        event.value.toUpperCase()
      );
      if (item?.length) {
        this.selectAsset(item[0]);
      } else {
        this.page.state.invalidAsset = true;
      }
    }
  }
 
  /**
   * Should be trigged when a location value is scanned on barcode-button
   * @param {Object} event - event that contains location value
   */
  async handleLocation(event) {
    //istanbul ignore else
    if (!!event?.value) {
      const item = await this.getAssetOrLocation(
        this.app,
        'locationLookupDS',
        'location',
        event.value.toUpperCase()
      );
      if (item?.length) {
        this.selectLocation(item[0]);
      } else {
        this.page.state.invalidLocation = true;
      }
    }
  }
 
  /**
   * Should create a new inspection
   * @param {Object} status - inspection status
   */
  async createInspection(status) {
    this.page.state.isCreating = true;
    await this.page.datasources.createInspectionDS.resetState();
    if(!this.page.datasources.createInspectionDS.getSchema()){
      await this.page.datasources.createInspectionDS.initializeQbe() ;
    }
    await this.page.datasources.createInspectionDS.addNew();
    let newInspection = this.page.datasources.createInspectionDS.item;
    newInspection.referenceobject = this.page.state.asset
      ? 'ASSET'
      : 'LOCATIONS';
    newInspection.location = this.page.state?.locations?.location;
    newInspection.asset = this.page.state?.asset?.assetnum;
    newInspection.createdby = this.app.client.userInfo.personid;
    newInspection.orgid = this.app.client.userInfo.insertOrg;
    newInspection.siteid = this.app.client.userInfo.insertSite;
    newInspection.status = status.value;
    newInspection.revision = this.page.state.inspForm.revision;
    newInspection.inspformnum = this.page.state.inspForm.inspformnum;
    newInspection.createdate = this.app.dataFormatter.convertDatetoISO(new Date());
    this.preparePayloadToMobilePlatform(newInspection, status);
 
    await this.page.datasources.createInspectionDS.save();
    let result = this.page.datasources.createInspectionDS.item;
 
    if (status.maxvalue === 'INPROG') {
      this.app.setCurrentPage({
        name: 'execution_panel',
        resetScroll: true,
        params: {
          inspectionresultid: result.inspectionresultid,
          itemhref: result.href,
          forceStart: true,
          forceReload: true,
          itemToLoad: result
        }
      });
    } else {
      this.app.setCurrentPage({
        name: 'main',
        resetScroll: true
      });
    }
  }
 
  /**
   * Configure the payload to work on offiline mode
   *
   */
  preparePayloadToMobilePlatform(newInspection, status) { 
    /* istanbul ignore else  */
    if (!this.app.device?.isMobile) {
      return;
    }
    newInspection.status_maxvalue = status.maxvalue;
    /* istanbul ignore else  */
    if (this.page.state.inspForm.inspcascadeoption) {
      newInspection.inspcascadeoption = JSON.parse(
        JSON.stringify(this.page.state.inspForm.inspcascadeoption)
      );
    }
 
    newInspection.inspquestionsgrp = JSON.parse(
      JSON.stringify(this.page.state.inspForm.inspquestionsgrp)
    );
    newInspection.inspectionform = this.page.state.inspForm;
 
    /* istanbul ignore else  */
    if (newInspection.asset) {
      newInspection.assets = [];
      newInspection.assets.push(
        JSON.parse(JSON.stringify(this.page.state?.asset))
      );
    }
 
    /* istanbul ignore else  */
    if (newInspection.location) {
      newInspection.locations = [];
      newInspection.locations.push(
        JSON.parse(JSON.stringify(this.page.state?.locations))
      );
    }
  }
 
  /**
   * Should create and start new inspection
   */
  async startInspection() {
    let statusList = await this.getStatusList();
    let status = statusList.find(item => item.maxvalue === 'INPROG');
    await this.createInspection(status);
  }
 
  /**
   * Should create and set a new inspection as pending
   */
  async saveAsPeding() {
    let statusList = await this.getStatusList();
   let status = statusList.find(item => item.maxvalue === 'PENDING');
    await this.createInspection(status);
  }
 
  /**
   * get the status list
   * necessary only because mobile plataform
   */
  async getStatusList() {
    let synonymDomainsDS = this.app.findDatasource('synonymdomainDataInsp');
    await synonymDomainsDS.initializeQbe();
    synonymDomainsDS.setQBE('domainid', 'INSPRESULTSTATUS');
    synonymDomainsDS.setQBE('defaults', true);
    let filteredDomainValues = await synonymDomainsDS.searchQBE();
    return filteredDomainValues;
  }
 
  /**
   * Should verify if the save/start button can be enabled.
   */
  checkRequerideFields() {
    this.page.state.canCreate =
      (this.page.state.asset || this.page.state.locations) &&
      this.page.state.inspForm;
  }
  
  goBack() {
    this.app.setCurrentPage({ name: 'main' });
  }
  
}
export default CreateInspectionsPageController;
