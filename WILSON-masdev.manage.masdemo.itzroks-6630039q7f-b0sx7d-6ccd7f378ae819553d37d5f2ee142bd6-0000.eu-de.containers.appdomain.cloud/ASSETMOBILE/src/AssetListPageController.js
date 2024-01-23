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
import { Browser } from "@maximo/maximo-js-api/build/device/Browser";
import MapPreLoadAPI from "@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI";
import "regenerator-runtime/runtime";
const TAG = "AssetListPageController";


//symbol for highlighting asset pin on map
let highlightedNotReady = {
  url:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iIzBGNjJGRSIvPg0KPHBhdGggZD0iTTMyIDIzLjI1QzMwLjI2OTQgMjMuMjUgMjguNTc3NyAyMy43NjMyIDI3LjEzODggMjQuNzI0NkMyNS42OTk4IDI1LjY4NjEgMjQuNTc4MyAyNy4wNTI3IDIzLjkxNjEgMjguNjUxNUMyMy4yNTM4IDMwLjI1MDQgMjMuMDgwNSAzMi4wMDk3IDIzLjQxODEgMzMuNzA3QzIzLjc1NTggMzUuNDA0NCAyNC41ODkxIDM2Ljk2MzUgMjUuODEyOCAzOC4xODcyQzI3LjAzNjUgMzkuNDEwOSAyOC41OTU2IDQwLjI0NDMgMzAuMjkzIDQwLjU4MTlDMzEuOTkwMyA0MC45MTk1IDMzLjc0OTYgNDAuNzQ2MiAzNS4zNDg1IDQwLjA4MzlDMzYuOTQ3MyAzOS40MjE3IDM4LjMxMzkgMzguMzAwMiAzOS4yNzU0IDM2Ljg2MTJDNDAuMjM2OCAzNS40MjIzIDQwLjc1IDMzLjczMDYgNDAuNzUgMzJDNDAuNzQ3NCAyOS42ODAyIDM5LjgyNDcgMjcuNDU2MSAzOC4xODQzIDI1LjgxNTdDMzYuNTQzOSAyNC4xNzUzIDM0LjMxOTggMjMuMjUyNiAzMiAyMy4yNVpNMzIgMzkuNUMzMC4wMTA5IDM5LjUgMjguMTAzMiAzOC43MDk4IDI2LjY5NjcgMzcuMzAzM0MyNS4yOTAyIDM1Ljg5NjggMjQuNSAzMy45ODkxIDI0LjUgMzJDMjQuNSAzMC4wMTA5IDI1LjI5MDIgMjguMTAzMiAyNi42OTY3IDI2LjY5NjdDMjguMTAzMiAyNS4yOTAyIDMwLjAxMDkgMjQuNSAzMiAyNC41VjMyTDM3LjMwMDggMzcuMzAwOUMzNi42MDU2IDM3Ljk5ODUgMzUuNzc5NCAzOC41NTE5IDM0Ljg2OTggMzguOTI5M0MzMy45NjAxIDM5LjMwNjcgMzIuOTg0OCAzOS41MDA2IDMyIDM5LjVaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=",
  color: "",
  offsetx: 12,
  offsety: 43,
  width: 64,
  height: 64,
  scale: 1,
  zIndex: 9999
};

let  highlightedOperating = {
  url:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iIzBGNjJGRSIvPg0KPHBhdGggZD0iTTMwLjExNzIgMzdMMjQuNDkyMiAzMS4zNzVMMjUuMzc1OSAzMC40OTEyTDMwLjExNzIgMzUuMjMxOEwzOC42MDg0IDI2Ljc0MTJMMzkuNDkyMiAyNy42MjVMMzAuMTE3MiAzN1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==",
  color: "",
  offsetx: 12,
  offsety: 43,
  width: 64,
  height: 64,
  scale: 1,
  zIndex: 9999
};

let  highlightedDecommissioned = {
  url:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iIzBGNjJGRSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy4yNSAzMkMyMy4yNSAyNy4xMjUgMjcuMTI1IDIzLjI1IDMyIDIzLjI1QzM2Ljg3NSAyMy4yNSA0MC43NSAyNy4xMjUgNDAuNzUgMzJDNDAuNzUgMzYuODc1IDM2Ljg3NSA0MC43NSAzMiA0MC43NUMyNy4xMjUgNDAuNzUgMjMuMjUgMzYuODc1IDIzLjI1IDMyWk0yNC41IDMyQzI0LjUgMzYuMTI1IDI3Ljg3NSAzOS41IDMyIDM5LjVDMzYuMTI1IDM5LjUgMzkuNSAzNi4xMjUgMzkuNSAzMkMzOS41IDI3Ljg3NSAzNi4xMjUgMjQuNSAzMiAyNC41QzI3Ljg3NSAyNC41IDI0LjUgMjcuODc1IDI0LjUgMzJaTTMyIDMzTDM1LjM3NSAzNi4zNzVMMzYuMzc1IDM1LjM3NUwzMyAzMkwzNi4zNzUgMjguNjI1TDM1LjM3NSAyNy42MjVMMzIgMzFMMjguNjI1IDI3LjYyNUwyNy42MjUgMjguNjI1TDMxIDMyTDI3LjYyNSAzNS4zNzVMMjguNjI1IDM2LjM3NUwzMiAzM1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==",
  color: "",
  offsetx: 12,
  offsety: 43,
  width: 64,
  height: 64,
  scale: 1,
  zIndex: 9999
};

//symbol for highlighting asset cluster on map
let highlightSymbolCluster = {
  url:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iIzBGNjJGRSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNiA0OEgyMEMxNy43OTA5IDQ4IDE2IDQ2LjIwOTEgMTYgNDRWMjBDMTYgMTcuNzkwOSAxNy43OTA5IDE2IDIwIDE2SDQ0QzQ2LjIwOTEgMTYgNDggMTcuNzkwOSA0OCAyMFY0NEM0OCA0Ni4yMDkxIDQ2LjIwOTEgNDggNDQgNDhIMzhMMzIgNTRMMjYgNDhaTTM4LjQxNDIgNDlINDRDNDYuNzYxNCA0OSA0OSA0Ni43NjE0IDQ5IDQ0VjIwQzQ5IDE3LjIzODYgNDYuNzYxNCAxNSA0NCAxNUgyMEMxNy4yMzg2IDE1IDE1IDE3LjIzODYgMTUgMjBWNDRDMTUgNDYuNzYxNCAxNy4yMzg2IDQ5IDIwIDQ5SDI1LjU4NThMMzIgNTUuNDE0MkwzOC40MTQyIDQ5WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K",
  color: "",
  offsetx: 12,
  offsety: 43,
  width: 64,
  height: 64,
  scale: 0.5,
  text: {
    offsetXPercentage: 0.31,
    offsetYPercentage: 0.15,
    scalePercentage: 1.25
  },
  zIndex: 9999
};

class AssetListPageController {
  pageInitialized(page, app) {
    log.t(TAG, "Page Initialized");
    this.app = app;
    this.page = page;

    const evt = {
      selectedItem : {
        id: 'activeAssetListDS'
      }
    }

    this.configureMap();
    this.loadAssetListData(evt);
  }

  configureMap() {
    try {
      this.mapPreloadAPI = new MapPreLoadAPI();
    } catch (error) {
      log.t(TAG, error);
    }

    let device = Device.get();
    this.page.state.mapAssetListHeight = "35%";
    if (device.isTablet || device.isIpad) {
      this.page.state.mapPaddingRight = "1rem";
      this.page.state.mapPaddingLeft = "0.5rem";
      this.page.state.mapAssetListHeight = "25%";
      this.page.state.mapAssetCardHeight = "40%";
    }
    this.page.state.mapPaddingBottom = "calc(100vh - 9rem)";
    if (device.isMaximoMobile) {
      this.page.state.mapPaddingBottom = "calc(100vh - 5rem)";
      this.page.state.mapAssetCardHeight = "50%";
    }
  }

  /*
   * Method to resume the page
   */
  async pageResumed() {
    this.page.state.isMobile = Device.get().isMaximoMobile;
    this.app.state.doclinksCountDataUpdated = false
    
    if (this.app.state.selectedListDS === undefined) {
      this.app.state.selectedListDS = 'activeAssetListDS';
    }

    if (this.app.geolocation && this.page.state.isMobile) {
      // Update Geo Location
      this.app.geolocation.updateGeolocation();
    }

    let assetListDS = this.app.findDatasource(this.app.state.selectedListDS);
    this.trackUserLogin(this.page);

    //On firstLogin the assetlist should get synced with server
    if (this.page.state.firstLogin && this.app.state.networkConnected  && this.app.state.refreshOnSubsequentLogin !== false) {
      await assetListDS.forceSync();
    } else {
      await assetListDS.forceReload();
    }
  }

  /*
   * Load Asset list data on the basis of selection from dropdown.
   */
  async loadAssetListData(evt) {
    this.page.state.showMapOverlay = 0;

    //istanbul ignore else
    if (evt.selectedItem.id !== "Unspecified") {
      this.app.state.selectedListDS = evt.selectedItem.id;

      let seldatasource = this.app.findDatasource(evt.selectedItem.id);
      //istanbul ignore else
      if (seldatasource) {
        seldatasource.clearState();
        seldatasource.resetState();
        await seldatasource.load({ noCache: true, itemUrl: "" });
      }
    }
  }

  /*
   * Method to store and load the user login detail
   */
  trackUserLogin(page) {
    let browser = Browser.get();
    let firstLoginData = browser.loadJSON("FirstLoginData", false);
    let firstLogoutDate =
      this.app.client &&
      this.app.client.userInfo.user.logouttracking.attemptdate;
    let newDate = this.app.dataFormatter.convertISOtoDate(new Date());
    if (!firstLoginData || !firstLoginData.date) {
      firstLoginData = { date: newDate, isFirstLogIn: true };
    } else {
      if (
        this.app.dataFormatter.convertISOtoDate(firstLoginData.date) >
        this.app.dataFormatter.convertISOtoDate(firstLogoutDate)
      ) {
        firstLoginData.isFirstLogIn = false;
      } else {
        firstLoginData.date = newDate;
        firstLoginData.isFirstLogIn = true;
      }
    }
    browser.storeJSON("FirstLoginData", firstLoginData, false);
    page.state.firstLogin = firstLoginData.isFirstLogIn;
  }

  /**
   * Redirects to details page
   * @param {Object} listItem - clicked item from list
   */
  showAssetDetail(item) {
    /* istanbul ignore else */
    if (item && item.assetnum) {
      this.app.setCurrentPage({
        name: "assetDetails",
        resetScroll: true,
        params: {
          assetnum: item.assetnum,
          href: item.href,
        },
      });
    }
  }

  /*
   * Opens the meter detail for the corresponding asset.
   */
  async openMeterDrawer(event) {   
    let assetmetersds = this.app.findDatasource("assetListDummyDS");
    let response = await assetmetersds.load({
      noCache: true,     
      itemUrl: event.item.href,
    });
    // istanbul ignore next
    if (response) {
        this.page.state.assetMeterHeader = this.getAssetName(event.item);          
        this.page.showDialog("assetmeterReadingDrawer");
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
   * Called when map is initialized
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  onMapInitialized(map) {
    this.app.map = map;

    if (!!this.page.state.mapHighlightedItem) {
      this.handleItemClick(this.page.state.mapHighlightedItem);
      this.page.state.mapHighlightedItem = "";
    }
  }

  /**
   * Filters datalist on the basis of pin/cluster being clicked
   * @param {*} item item record (asset record) for the pin/cluster being clicked
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async handleMapClick(item) {
    let maximoAttributes;
    let datasource = this.app.findDatasource(this.page.state.selectedDS);
    if (
      item.hasFeature &&
      item.featuresAndLayers &&
      item.featuresAndLayers.length > 0
    ) {
        const layer = item.featuresAndLayers[0].layer;
      if (
        item.featuresAndLayers[0].feature.values_.features &&
        item.featuresAndLayers[0].feature.values_.features.length > 1
      ) {
        let size = item.featuresAndLayers[0].feature.values_.features.length;
        let featureCluster = item.featuresAndLayers[0].feature;
        let styleCluster = this.app.map.getClusterStyle(highlightSymbolCluster, size);
        this.app.map.changeFeatureStyle(
          featureCluster, 
          styleCluster, 
          {
            layer: item.featuresAndLayers[0].layer,
            autoHideOriginalStyle: false
          }
        );

        let assetNums = [];
        let features = featureCluster.values_.features;
        maximoAttributes = features[0].get("maximoAttributes");
        let layerds = item.featuresAndLayers[0].layer.get('datasource');
        if (layerds) {
          for (let i = 0; i < features.length; i++) {
            assetNums.push(features[i].get("maximoAttributes").assetnum);
          }
          await datasource.initializeQbe();
          datasource.setQBE("assetnum", "in", assetNums);
          datasource.setQBE("siteid", "=", maximoAttributes.siteid);
          await datasource.searchQBE(undefined, true);
        } else {
          datasource.clearQBE();
          await datasource.searchQBE(undefined, true);
        }
      } else {
        
        const isMarkerLayer = layer.get('isMarkerLayer');
        let feature = item.featuresAndLayers[0].feature;
        let style ;
        const singleFeature = isMarkerLayer ? feature : feature.get('features')[0];
        maximoAttributes = singleFeature.get("maximoAttributes");
        let currentStatus = maximoAttributes.status_maxvalue;
        if (currentStatus && currentStatus.toUpperCase() === 'NOT READY') {
          style = this.app.map.getNewStyle(highlightedNotReady);
        } else if (currentStatus && (currentStatus.toUpperCase() === 'OPERATING' || currentStatus.toUpperCase() === 'ACTIVE')) {
          style = this.app.map.getNewStyle(highlightedOperating);
        } else if (currentStatus && (
          currentStatus.toUpperCase() === 'DECOMMISSIONED' || 
            currentStatus.toUpperCase() === 'BROKEN' || 
            currentStatus.toUpperCase() === 'INACTIVE' ||
            currentStatus.toUpperCase() === 'MISSING' || 
            currentStatus.toUpperCase() === 'SEALED' ||
            currentStatus.toUpperCase() === 'LIMITEDUSE' || 
            currentStatus.toUpperCase() === 'IMPORTED' )) {
            style = this.app.map.getNewStyle(highlightedDecommissioned);
        } 
       
        this.app.map.changeFeatureStyle(feature, style, {
          autoRestoreOnZoom: false,
                layer: item.featuresAndLayers[0].layer,
        });
        if (
          (feature.values_ &&
          feature.values_.features &&
          feature.values_.features.length > 0) || isMarkerLayer
        ) {
          const singleFeature = isMarkerLayer ? feature : feature.get('features')[0];
          maximoAttributes = singleFeature.get("maximoAttributes");
          datasource.setQBE('assetnum', '=', maximoAttributes.assetnum);
          datasource.searchQBE();  
        }
      }
    } else {
      this.page.state.showMapOverlay = 0;
      this.app.map.clearFeatureStyle();
      datasource.clearQBE();
      await datasource.searchQBE(undefined, true);
      await this.resetDatasource();
    }
  }

  // istanbul ignore next
  async resetDatasource() {
    let datasource =  this.app.findDatasource(this.page.state.selectedDS);
    await datasource.reset(datasource.baseQuery);
  }

  /**
   * Callback method from map when we do longpress
   * @param {{
   *  coordinate: number[]
   * }} data
   */
  handleMapLongPress(data) {    
    // istanbul ignore else
    if (typeof data === 'object' && data.coordinate) {
      this.app.state.currentMapData = data;
    }
  }

  /**
   * Highlights the pin on map for the record which was clicked in datalist
   * @param {*} item record for the item which was clicked in datalist
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleItemClick(item) {
    let currentStatus = item.status_maxvalue
    if(!item.autolocate) {
      this.app.map.clearFeatureStyle();
      return;
    }
    let itemGeometry = this.app.map.parseGeometry(item.autolocate);
    let center = this.app.map.getGeometryCenter(itemGeometry);
    let centerCoordinates = center.getCoordinates();
    let itemSpatialReference = this.app.map.getLayerSpatialReference("ASSETS_Status");
    let basemapSpatialReference = this.app.map.getBasemapSpatialReference();
    if (itemSpatialReference !== basemapSpatialReference) {
      centerCoordinates = this.app.map.convertCoordinates(
        centerCoordinates,
        itemSpatialReference,
        basemapSpatialReference
      );
    }
    let feature = this.app.map.getFeatureByGeo({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: centerCoordinates
      }
    }, "geojson");
    let style ;
    if (currentStatus && currentStatus.toUpperCase() === 'NOT READY') {
      style = this.app.map.getNewStyle(highlightedNotReady);
    } else if (currentStatus && (currentStatus.toUpperCase() === 'OPERATING' || currentStatus.toUpperCase() === 'ACTIVE')) {
      style = this.app.map.getNewStyle(highlightedOperating);
    } else if (currentStatus && (
      currentStatus.toUpperCase() === 'DECOMMISSIONED' || 
        currentStatus.toUpperCase() === 'BROKEN' || 
        currentStatus.toUpperCase() === 'INACTIVE' ||
        currentStatus.toUpperCase() === 'MISSING' || 
        currentStatus.toUpperCase() === 'SEALED' ||
        currentStatus.toUpperCase() === 'LIMITEDUSE' || 
        currentStatus.toUpperCase() === 'IMPORTED' )) {
        style = this.app.map.getNewStyle(highlightedDecommissioned);
    } 
     
    if (feature.featuresAndLayers.length > 0) {
      this.app.map.changeFeatureStyle(
        feature.featuresAndLayers[0].feature,
        style,
        { autoRestoreOnZoom: false }
      );
      this.app.map.centerTo(
        centerCoordinates[0],
        centerCoordinates[1],
        false
      );
    }
  }

  /**
   * Redirects to Asset Card on Map view
   * @param {Object} item - clicked item from list
   */
   // ignoring as for map openlayers cannot be emulated
  // istanbul ignore next
  async openAssetCard(event) {
    if (event.item) {
      this.page.state.selectedSwitch = 1;
      let datasource = this.app.findDatasource(this.page.state.selectedDS);
      await datasource.load({ itemUrl: event.item.href });
      this.page.state.showMapOverlay = 1;
      this.page.state.previousPage = event.prevPage;
      // istanbul ignore next
      if (!this.app.map) {
        setTimeout(() => {
          this.openMap(event);
        }, 2000);
      } else {
        this.openMap(event);
      }
    }
  }

   // ignoring as for map openlayers cannot be emulated
   // istanbul ignore next
  openMap(event) {
    if (this.app.map) {
      this.handleItemClick(event.item);
    }
    
    this.page.state.mapHighlightedItem = event.item;
  }

  /**
   * Redirects to Asset List on Map view
   * @param {Object} item - clicked item from list
   */
  async openPrevPage(event) {
    // istanbul ignore else
    // istanbul ignore next
    // ignoring as for map openlayers cannot be emulated
    if (this.page.state.previousPage === "mapassetlist") {
      this.page.state.showMapOverlay = 0;
      this.app.map.clearFeatureStyle();
      await this.resetDatasource();
    }
  }

  /**
   * Set create Asset create page
   */
  goToCreateAssetPage() {
    // istanbul ignore else
    if (this.app.state.currentMapData) {
      this.app.setCurrentPage({
        name: 'createasset',
        resetScroll: false,
      });
    }
  }
}
export default AssetListPageController;