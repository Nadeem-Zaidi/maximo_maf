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

import {log, AppSwitcher, Device, ObjectUtil} from '@maximo/maximo-js-api';
import InspectionsList from './components/common/InspectionsList.js';
import {highlightSymbol, getMapDimension} from './maps/MapUtils.js';
import {STATUS} from './Constants';

const TAG = 'InspListPageController';

class InspListPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.page.state.techmobileAccess =
      this.app.checkSigOption('TECHMOBILE.READ');

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

  //istanbul ignore next
  onMapInitialized(map) {
    this.app.map = map;
  }

  //istanbul ignore next
  async onMapInitializedDialog(map) {
    this.app.map = map;
    let inspectionSelected = this.page.state.inspIdForMap;

    if (inspectionSelected) {
      let ds = this.page.datasources[this.page.state.selectedDS];
      let items = await ds.load({noCache: true, itemUrl: inspectionSelected});

      this.page.state.isMapOpen = true;

      let item = items[0];
      if (item.plussgeojson) {
        this.handleItemDialog(item);
        this.page.state.showMapOverlay = 2;
        //Disabling the search for now
        this.page.state.hideCountSearch = true;
      }
    }
  }

  //istanbul ignore next
  pageResumed(page, app) {
    for (let datasource in page.datasources) {
      page.datasources[datasource].state.isFirst = true;
    }
    this.loadSelectedDatasource(page.state.selectedDS);
    this.checkReviseItems();
  }


  _refreshPageList(){
    this.loadSelectedDatasource(this.page.state.selectedDS);
  }


  /**
   * Dropdown change handler
   * @param {Object} selectedItem
   */
  filterList({selectedItem} = {}) {
    if (selectedItem) {
      this.loadSelectedDatasource(selectedItem.id);
    }
  }

  /**
   * Function to check the Sync state for the selected datasource
   * @param selectedDS
   * @returns
   */
  checkSyncStatus(selectedDS) {
    let dsSync = {
      assignedworkds: this.app.state.assignedworkdssync,
      pendingds: this.app.state.pendingdssync,
      inprogds: this.app.state.inprogdssync,
      inreviewds: this.app.state.inreviewdssync
    };
    if (sessionStorage.getItem('sync_inspds')) {
      dsSync = JSON.parse(sessionStorage.getItem('sync_inspds'));
    }
    return dsSync[selectedDS];
  }

  /**
   * Load data from datasource name
   * @param {String} dsName - Datasource name
   */
  async loadSelectedDatasource(dsName) {
    const selectedDS = this.app.findDatasource(dsName);
    if (selectedDS) {
      selectedDS.clearSelections();
      this.page.state.selectedDSMap = this.page.state.selectedDS;
      this.page.state.selectedDSCards = this.page.state.selectedDS;
      //istanbul ignore else
      if(this.page.params.isBatch){
        await selectedDS.forceReload();
      }

      let items = '';
      if (this.app.state.networkConnected) {
        
          let checkdssync = this.checkSyncStatus(this.page.state.selectedDS);

          if (checkdssync === '' || !checkdssync) {
            items = await selectedDS.forceReload();
            
            let dsSync = {};
            if (sessionStorage.getItem('sync_inspds')) {
              dsSync = JSON.parse(sessionStorage.getItem('sync_inspds'));
            } else {
              dsSync = {
                assignedworkds: this.app.state.assignedworkdssync,
                pendingds: this.app.state.pendingdssync,
                inprogds: this.app.state.inprogdssync,
                inreviewds: this.app.state.inreviewdssync
              };
            }

            // istanbul ignore next
            switch (this.page.state.selectedDS) {
              case 'assignedworktolist':
                this.app.state.assignedworkdssync = true;
                dsSync.assignedworkds = true;
                break;
              case 'pendingds':
                this.app.state.pendingdssync = true;
                dsSync.pendingds = true;
                break;
              case 'inprogds':
                this.app.state.inprogdssync = true;
                dsSync.inprogds = true;
                break;
              case 'inreviewds':
                this.app.state.inreviewdssync = true;
                dsSync.inreviewds = true;
                break;
              default:
                break;
            }
            sessionStorage.setItem('sync_inspds', JSON.stringify(dsSync));
          } else {
            // istanbul ignore next
            items = await selectedDS.forceReload();
          }

      } else {
        // istanbul ignore next
        items = await selectedDS.forceReload();
      }
      
      //REMOVED FROM DT DT243176
      // istanbul ignore next
      if (this.page.state.selectedDS === 'assignedworktolist'){
        // let externalStatusList = [];
        await this.app.callController('loadStatusSynonymDomain');
        // externalStatusList = this.getExternalStatusList(['INPROG', 'PENDING']);
        // await selectedDS.initializeQbe();
        // selectedDS.setQBE('status', 'in', externalStatusList );
        // items = await selectedDS.searchQBE();
      }
      this.checkPanelToShow(items?.length);
    }
  };

  /**
 * Method return external values based on provided internal values in an array.
 * @param {Array} internalStatusList 
 * @returns {Array} externalStatusList 
 */
  //istanbul ignore next
   getExternalStatusList(internalStatuses){
    let internalStatusList = internalStatuses;
    let inspectionDomainValues = this.app.state.inspectionStatusValues;
    let externalStatusList = [];

    inspectionDomainValues?.forEach((item) => {
      if (internalStatusList.includes(item.maxvalue) && item.defaults){
        externalStatusList.push(item.value);
      }
    });
    return externalStatusList;
  };

  /**
   * Change status if necessary and order inspections
   * Opens execution page with inspection list as parameter
   * @param {Array} selectedItems
   */
  async openBatchInspections(selectedItems) {
    const currentDsName = this.page.state.selectedDS;
    const currentDs = this.page.datasources[currentDsName];

    const defaultOption = {
      item: null,
      datasource: currentDs,
      newStatus: STATUS.INPROG
    };

    const pendingRecords = selectedItems.filter(
      i => i.status_maxvalue === STATUS.PENDING
    );

    for (const record of pendingRecords) {
      const controllerOption = {
        ...defaultOption,
        item: record
      };

      const response = await this.app.callController(
        'changeResultStatus',
        controllerOption
      );

      // TODO is the merge really necessary?
      ObjectUtil.mergeDeep(record, response);
    }

    // Indentifies inspections with sequence
    const sequencedInspections = selectedItems.filter(
      i => !Number.isNaN(Number(i?.sequence))
    );
    let inspectionresultid = [];
    let itemhref = [];

    if (!sequencedInspections.length) {
      // use selection order if no sequence found
      inspectionresultid = selectedItems.map(i => i.inspectionresultid);
      itemhref = selectedItems.map(i => i.href);
    } else {
      // Sort sequenced inspections by sequence attribute
      sequencedInspections.sort(
        (a, b) => Number(a.sequence) - Number(b.sequence)
      );
      // Remove selected items that belong sequenced array
      const notSequencedInspections = selectedItems.filter(
        i => !sequencedInspections.includes(i)
      );

      // Merge not sequenced with sequenced array
      inspectionresultid = [
        ...sequencedInspections.map(i => i.inspectionresultid),
        ...notSequencedInspections.map(i => i.inspectionresultid)
      ];
      itemhref = [
        ...sequencedInspections.map(i => i.href),
        ...notSequencedInspections.map(i => i.href)
      ];
    }

    this.app.state.inspectionsList = new InspectionsList(itemhref);

    this.changePage({
      page: 'execution_panel',
      inspectionresultid: inspectionresultid,
      itemhref: itemhref
    });

    this.mapDialogClose();
  }

  /**
   * Check if item is a Batch card or standard form
   *
   * @param {object} item - Inspection result item.
   */
  async handleCardType(item) {
    if (item.isbatch) {
      this.changePage({
        page: 'batch_details',
        inspectionresultid: item.inspectionresultid,
        itemhref: item.href
      });
    } else await this.showInspection(item);
  }

  /**
   * Change the status of the inspection
   *
   * @param {object} item - Inspection result item.
   */
  async showInspection(item) {
    const currentDs = this.page.state.selectedDS;

    const controllerOption = {
      item: item,
      datasource: this.page.datasources[currentDs],
      newStatus: STATUS.INPROG
    };

    if (item.status_maxvalue === STATUS.PENDING) {
      await this.app.callController('changeResultStatus', controllerOption);
    }

    this.app.state.inspectionsList = new InspectionsList(item.href);

    this.changePage({
      page: 'execution_panel',
      inspectionresultid: item.inspectionresultid,
      itemhref: item.href
    });
  }

  changePage({page, inspectionresultid, itemhref}) {
    this.app.setCurrentPage({
      name: page,
      resetScroll: true,
      params: {
        inspectionresultid: inspectionresultid,
        itemhref: itemhref
      }
    });

    this.mapDialogClose();
  }

  /**
   * Open the summary page of the inspection
   *
   * @param {object} item - Inspection item.
   */
  showInstructions(item) {

    if (!item || !item.inspectionresultid) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'missing_selection',
          'Inspection result not found.'
        )
      );
      this.page.state.instructions = {};
      return;
    }
    this.page.state.instructions = {
      asset: item.computedAsset,
      location: item.computedLocation,
      title: item.computedTitle,
      longDesc: item.inspectionform.description_longdescription
    };

    this.page.showDialog('instructionsDialog');
  }

  /**
   * Redirects to different application as per provided arguments.
   * @param {*} args
   */
  loadApp(args = {}) {
    let appName = args.appName ? args.appName : undefined;
    let breadcrumbData = {
      returnName: this.app.getLocalizedLabel(
        'return_to_app',
        'Returning to {0}',
        [this.app.name]
      ),
      enableReturnBreadcrumb: true
    };
    if (!appName) {
      log.e(TAG, 'loadApp : appName required for navigation.', args);
      return;
    }
    let options = args.options ? args.options : {canReturn: true};
    let context = args.context ? args.context : {};
    let switcher = AppSwitcher.get();
    context.breadcrumb = breadcrumbData;
    switcher.gotoApplication(appName, context, options);
  }

  /**
   * Function to check the map panel to be loaded
   */
  checkPanelToShow(items) {
    if (items > 0) {
      if (items === 1) {
        // Show the Map Overlay with the Inspection Card
        this.page.state.hideBackButton = true;
        this.page.state.showMapOverlay = 2;
      } else {
        // Show the Map Overlay with the List of Inspections
        this.page.state.showMapOverlay = 1;
      }
    } else {
      //Hide the Map Overlays
      this.page.state.showMapOverlay = 0;
    }
  }

  /**
   * Redirects to Inspections List on Map view
   */
  async showDSList(viewType) {
    let ds = null;
    if (viewType && viewType === 'listView') {
      this.page.state.hideCountSearch = false;
      ds = this.page.datasources[this.page.state.selectedDS];
      this.page.state.selectedDSCards = this.page.state.selectedDS;
    } else {
      //Map View
      this.page.state.hideCountSearch = false;
      this.page.state.selectedDSMap = this.page.state.selectedDS;
      ds = this.page.datasources[this.page.state.selectedDSMap];

      this.checkPanelToShow(ds.state.itemCount);
      this.page.state.comeFromCluster = false;
      this.page.state.showClusterList = false;
      //istanbul ignore next
      if (this.app.map) {
        this.app.map.clearFeatureStyle();
      }
    }
  }

  /**
   * Function to Show Cards List from the Panel Switch
   */
  async showMapListCluster(inspectionsIdList) {
    let ds = this.page.datasources[this.page.state.selectedDS];
    let totalItemsDS = null;

    // istanbul ignore else
    if (ds) {
      totalItemsDS = ds.state.totalCount;
    }

    // istanbul ignore next
    let clusterInspections = ds.dataWindows
      .getItems(0, totalItemsDS)
      .filter(item => {
        return inspectionsIdList.includes(item.inspectionresultid);
      });

    // istanbul ignore else
    if (clusterInspections) {
      await this.app.currentPage.datasources.jsonclusterinspectionsds.load({
        src: clusterInspections,
        noCache: true
      });
    }

    this.page.state.selectedDSMap = 'jsonclusterinspectionsds';
    this.page.state.showClusterList = true;
    this.page.state.inspectionsIdCluster = inspectionsIdList;
    this.page.state.hideCountSearch = true;
    this.page.state.comeFromCluster = true;
    this.checkPanelToShow(clusterInspections.length);
  }

  /**
   * Shows Inspection Card on Map view
   * @param {Object} item - clicked item from list
   */
  //istanbul ignore next
  async showInspMapCard(event) {
    this.page.state.hideBackButton = false;
    let inspectionId = [];
    // istanbul ignore else
    if (event.item && event.item.inspectionresultid) {
      inspectionId[0] = event.item.inspectionresultid;
    } else {
      if (event.inspectionresultid) {
        inspectionId[0] = event.inspectionresultid;
      }
    }

    if (inspectionId) {
      let ds = this.page.datasources[this.page.state.selectedDS];

      let totalItemsDS = ds.state.totalCount;
      let cardInspection = ds.dataWindows
        .getItems(0, totalItemsDS)
        .filter(item => {
          return inspectionId.includes(item.inspectionresultid);
        });
      let item = null;
      if (cardInspection) {
        item =
          await this.app.currentPage.datasources.jsoncardinspectionsds.load({
            src: cardInspection,
            noCache: true
          });
      }

      let recordsCountLabel = '';
      if (item.length === 1) {
        recordsCountLabel = this.app.getLocalizedLabel(
          'records_counter_single',
          '{0} record',
          [item.length]
        );
      }
      this.page.state.itemsCluster = recordsCountLabel;
      this.page.state.showMapOverlay = 2;
      this.page.state.hideCountSearch = true;
      this.page.state.selectedDSCards = 'jsoncardinspectionsds';
      this.handleItemClick(item[0]);
    }
  }

  /**
   * Function to handle the click event in the Map Icon
   * @param {Object} item - clicked icon in the Map
   */
  //istanbul ignore next
  handleMapClick(event) {
    if (
      event.hasFeature &&
      event.featuresAndLayers &&
      event.featuresAndLayers.length > 0
  ) {
      const layer = event.featuresAndLayers[0].layer;
      if (
        event.featuresAndLayers[0].feature.values_.features &&
        event.featuresAndLayers[0].feature.values_.features.length > 1
      ) {
         // handle cluster click
         let inspectionsOnMap =
         event.featuresAndLayers[0].feature.values_.features;
       let inspectionId;
       let inspectionsIdList = [];
       inspectionsOnMap.forEach(item => {
         if (item.values_.maximoAttributes.inspectionresultid) {
           inspectionId = item.values_.maximoAttributes.inspectionresultid;
           inspectionsIdList.push(inspectionId);
         }
        });
        //show cluster highlighted
        let feature = event.featuresAndLayers[0].feature;
        this.setIconStyle(feature, event.featuresAndLayers[0].layer, 'CLUSTER');

        let isHighlithted = this.app.map.isFeatureHighlighed(feature);
        if (isHighlithted) {
          this.showMapListCluster(inspectionsIdList);
        } else {
          this.showDSList();
        } 
      } else {
         // handle item click
         let feature = event.featuresAndLayers[0].feature;
         const isMarkerLayer = layer.get('isMarkerLayer');
         let inspection = isMarkerLayer
         ? feature.get('maximoAttributes')
         : feature.values_.features[0].values_.maximoAttributes;
         let status = null;
         if (inspection && inspection.status_maxvalue) {
           status = inspection.status_maxvalue;
         }

         this.setIconStyle(feature, event.featuresAndLayers[0].layer, status);
         let isHighlithted = this.app.map.isFeatureHighlighed(feature);
         if (isHighlithted) {
           this.showInspMapCard(inspection);
         } else {
           this.showListFromCard();
          }
      }
    } else {
        this.app.map.clearFeatureStyle();
        this.page.state.showClusterList = false;
        this.showDSList();
    }
    this.page.state.comeFromCluster = false;
  }

  /**
   * Function to highlight or to remove the highlight in the Map Pin
   * @param {String} feature
   * @param {String} layer
   * @param {String} Status - should be 'cluster' for cluster icons
   */
  //istanbul ignore next
  setIconStyle(feature, layerArg, status) {
    let highlightPinIcon = highlightSymbol(status);
    let style = this.app.map.getNewStyle(highlightPinIcon);
    this.app.map.changeFeatureStyle(feature, style, {
      layer: layerArg
    });
  }

  /**
   * Function to handle the click in the Inspection from the List - in the Overlay area
   * @param {*} item
   */
  // istanbul ignore next
  handleItemClick(item) {
    let status = item.status;
    let highlightIcon = highlightSymbol(status);

    let itemGeometry = JSON.parse(item.plussgeojson);
    let isFeatureGeoFormat = false

    if(itemGeometry.type === 'Feature'){
      isFeatureGeoFormat = true;
    }
    
    const originalCoordinates = isFeatureGeoFormat
      ? itemGeometry?.coordinates
      : itemGeometry?.geometry?.coordinates;
      
    if (originalCoordinates) {
      let itemSpatialReference =
        this.app.map.getLayerSpatialReference('Inspections');
      let basemapSpatialReference = this.app.map.getBasemapSpatialReference();
      if (itemSpatialReference !== basemapSpatialReference) {
        itemGeometry.coordinates = this.app.map.convertCoordinates(
          originalCoordinates,
          itemSpatialReference,
          basemapSpatialReference
        );
      }
      let feature = this.app.map.getFeatureByGeo(itemGeometry, 'geojson');
      let style = this.app.map.getNewStyle(highlightIcon);
      if (feature.featuresAndLayers.length > 0) {
        this.app.map.changeFeatureStyle(
          feature.featuresAndLayers[0].feature,
          style,
          {autoRestoreOnZoom: false}
        );
        this.app.map.centerTo(
          itemGeometry.coordinates[0],
          itemGeometry.coordinates[1] - 800,
          false
        );
      }
    }
  }

  /**
   * Function to show the Map Dialog
   * @param {*} item
   */
  showMapDialog(item) {
    //istanbul ignore else
    if (item && item.inspectionresultid) {
      this.page.state.inspIdForMap = item.href;
      this.page.showDialog('dialogmap');
    }
  }

  /**
   * Function to handle the Items in the Dialog for the Map
   * @param {*} item
   */
  //istanbul ignore next
  handleItemDialog(item) {
    let status = item.status;
    let highlightIcon = highlightSymbol(status);

    let itemGeometry = JSON.parse(item.plussgeojson);
    let isFeatureGeoFormat = false

    if(itemGeometry.type === 'Feature'){
      isFeatureGeoFormat = true;
    }

     if (itemGeometry && (itemGeometry.geometry.coordinates || itemGeometry.coordinates)) {
      
      let originalCoordinates = isFeatureGeoFormat ? itemGeometry.coordinates : itemGeometry.geometry.coordinates;

      let itemSpatialReference =
        this.app.map.getLayerSpatialReference('Inspections');
      let basemapSpatialReference = this.app.map.getBasemapSpatialReference();
      if (itemSpatialReference !== basemapSpatialReference) {
        itemGeometry.coordinates = this.app.map.convertCoordinates(
          originalCoordinates,
          itemSpatialReference,
          basemapSpatialReference
        );
      }
      let feature = this.app.map.getFeatureByGeo(itemGeometry, 'geojson');
      let style = this.app.map.getNewStyle(highlightIcon);
      if (feature.featuresAndLayers.length > 0) {
        this.app.map.changeFeatureStyle(
          feature.featuresAndLayers[0].feature,
          style,
          {autoRestoreOnZoom: false}
        );
        this.app.map.centerTo(
          itemGeometry.coordinates[0],
          itemGeometry.coordinates[1] - 600,
          false
        );
      }
    }
  }

  /**
   * Function to close the Dialog and clean the filter in the selected datasource
   */
  async mapDialogClose() {
    if (this.page.state.isMapOpen) {
      let ds = this.page.datasources[this.page.state.selectedDS];
      this.page.state.hideCountSearch = false;
      await ds.reset(ds.baseQuery);
      /*istanbul ignore next*/
      this.page.findDialog('dialogmap').closeDialog();
      this.page.state.isMapOpen = false;
    }
  }

  /**
   * Function to show the items list in the Overlay area when coming from the Card
   */
  showListFromCard() {
    let isComingFromCluster = this.page.state.comeFromCluster;
    // istanbul ignore else
    if (isComingFromCluster) {
      this.showMapListCluster(this.page.state.inspectionsIdCluster);
    } else {
      if (this.app.map) {
        this.app.map.clearFeatureStyle();
      }
      this.showDSList();
    }
  }

  /**
   * Method to open the Change Status slider-drawer. This is called from
   * main page.
   *
   * @param event should contain
   * item - The inspection result selected.
   * datasource - The Datasource for synonymdomain.
   * referencePage - The Page which calls this controller.
   *
   */
  async openChangeStatusDialog(event) {
    let statusArr = [];
    let device = Device.get();
    let anywhereContainerMode = device.isMaximoMobile;
    log.t(
      TAG,
      'openChangeStatusDialog : event --> ' +
        event.datasource +
        ' inspectionresultid --> ' +
        event.item.inspectionresultid +
        ' anywhereContainerMode --> ' +
        anywhereContainerMode
    );

    let historyFlag = event.item?.historyflag;
    let hasRequiredQuestion = event.item?.inspectionform?.hasrequiredquestion;
    const isbatch = event.item?.isbatch;

    statusArr = await this.app.callController('buildStatusList', event);

    //if it is not archived, add archived to status array
    //istanbul ignore else
    if (!historyFlag) {
      let archivedLabel = this.app.getLocalizedLabel('archived', 'Archived');
      statusArr.push({
        id: archivedLabel,
        value: archivedLabel.toUpperCase(),
        description: archivedLabel,
        maxvalue: 'ARCHIVED'
      });
    }
    //istanbul ignore else
    if (isbatch) {
      const shouldRemoveStatus = [
        STATUS.COMPLETED,
        STATUS.PENDING,
        STATUS.REVIEW,
        STATUS.INPROG
      ];
      statusArr = statusArr.filter(
        status => !shouldRemoveStatus.includes(status.maxvalue)
      );
    }

    //remove completed option if has required questions
    //istanbul ignore else
    if (hasRequiredQuestion || event.item.status_maxvalue === STATUS.INPROG) {
      statusArr = statusArr.filter(status => status.maxvalue !== STATUS.COMPLETED);
    }

    //remove Review option if the enablereview properties are disabled 
    //istanbul ignore else
    if ( !(this.app.state.enablereview && event.item.inspectionform.enablereview) ){
      statusArr = statusArr.filter(status => status.maxvalue !== STATUS.REVIEW);
    }
    
    log.t(
      TAG,
      'openChangeStatusDialog : statusArr --> ' + JSON.stringify(statusArr)
    );

    let statusLstDS = this.page.datasources['dsstatusDomainList'];
    statusLstDS.clearSelections();

    await statusLstDS.load({src: statusArr, noCache: true});

    this.page.state.disableDoneButton = true;
    this.page.state.inspectionItem = event.item;
    this.page.state.appVar = this.app;
    this.page.state.referenceDS = event.datasource;
    this.page.state.referencePage = event.referencePage;
    this.page.state.statusDialog = 'inspectionStatusChangeDialog';
    this.page.showDialog('inspectionStatusChangeDialog', {parent: this.page});
  }

  /**
   * Handler for selected items from inspection-card
   * Checks datasource selection and invoke page change
   * @returns null
   */
  openBatch() {
    const currentDs = this.page.state.selectedDS;
    const selectedItems = this.page.datasources[currentDs]?.getSelectedItems();
    if (selectedItems?.length) {
      this.openBatchInspections(selectedItems);
    }
  }

  /**
   * Function to populate the page.state.showReviewItems
   * If there are no items on Review status, then the menu option should be hidden
   * @returns null
   */
  async checkReviseItems() {
    this.page.state.showReviewItems = false;
    const reviseDS = this.page.datasources['inreviewds'];
    if (reviseDS) {
      let itemsReviseDS = await reviseDS.forceSync();
      //istanbul ignore next
      if (itemsReviseDS?.length > 0) {
        this.page.state.showReviewItems = true;
      }
    }
  }
}

export default InspListPageController;
