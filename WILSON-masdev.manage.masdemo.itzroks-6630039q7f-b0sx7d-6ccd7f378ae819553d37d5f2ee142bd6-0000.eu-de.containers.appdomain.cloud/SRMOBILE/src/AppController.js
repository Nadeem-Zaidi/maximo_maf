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

/* eslint-disable no-console */
import {Device,log} from "@maximo/maximo-js-api";

import MaximoMapConfigurationLoader from '@maximo/map-component/build/ejs/framework/loaders/MaximoMapConfigurationLoader';
import MapConfigurationLoader from '@maximo/map-component/build/ejs/framework/loaders/MapConfigurationLoader';
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';

import StorageManager from '@maximo/map-component/build/ejs/framework/storage/StorageManager';
import LocalStorageManager from '@maximo/map-component/build/ejs/framework/storage/LocalStorageManager';
import FileSystemStorageManager from '@maximo/map-component/build/ejs/framework/storage/FileSystemStorageManager';

const TAG = "SRMOBILE";

/**
 * The controller for the application.
 * This class is used to interaction with the Application lifecycle, and to handle user events from the Application.
 *
 * Events that you want to handler across pages might be handled here.
 */
class AppController {

  /**
   * Called automatically during the Application initialization lifecyle.
   *
   * @param {Application} app - Application instance.
   */
  applicationInitialized(app) {
    this.app = app;
    this.app.state.isback = false;

    //Update the Default Storage Manager
    let device = Device.get();
    this.app.state.isMobileContainer = device.isMaximoMobile || device.isMaximoMobileEmulation;
    
    /* istanbul ignore next */
    if (this.app.state.isMobileContainer) {
        StorageManager.setImplementation(FileSystemStorageManager);
    } else {
        StorageManager.setImplementation(LocalStorageManager);
    }

    this.loadSynonymValues();
    this.loadSystemProperties();
    this.loadMaxVars();
    this.initializeMap();
    this.app.state.subcatDisplayIcon = {};
    log.i(TAG, "Application is initialized");
  }



  /**
   * Sets incoming context to navigate to workorder details page as per provided params
   */
  //istanbul ignore next
  setupIncomingContext() {
    const incomingContext = this.app && this.app.state && this.app.state.incomingContext;

	if (incomingContext && incomingContext.editTrans)
	{
		this.app.setCurrentPage(
			{ 	
				name: 'createSR', 
				resetScroll: true, 
				params:	{href: incomingContext.href}
			}
		);
	}
  }

  onContextReceived() {
    this.setupIncomingContext()
  }

  initializeMap() {
    try {
      // Update the Default Map Configuration Loader
      MapConfigurationLoader.setImplementation(MaximoMapConfigurationLoader);
      this.mapPreloadAPI = new MapPreLoadAPI();
      /* istanbul ignore next */
      this.mapPreloadAPI
        .validateMapConfiguration(this.app)
        .then(validMapConfiguration => {
          this.app.state.isMapValid = validMapConfiguration;
        })
        .catch( error => {
          this.app.state.isMapValid = false
          log.e(TAG, 'validateMapConfiguration: ', error);
        })
      log.i(TAG, "Map validation check returned " + this.app.state.isMapValid);
    } catch (err) {
      /* istanbul ignore next */
      log.e(TAG, "Error: " + err);
      /* istanbul ignore next */
      log.i(TAG, "Cannot initialize map configuration.");
    }
  }



  async loadSynonymValues() {
    this.app.state.synonym.loading = true;
    try {
      this.app.state.synonym.activeSrStatusList = [];
      this.app.state.synonym.completedSrStatusList = [];
      let synonymDS = this.app.findDatasource("synonymdomainDS");
      await synonymDS.initializeQbe();
      synonymDS.setQBE("domainid", "in", ["SRSTATUS", "TKCLASS"]);
      await synonymDS.searchQBE().then((response) => {
        response.forEach((element) => {
          if (element.domainid === "TKCLASS" && element.maxvalue === "SR" && element.defaults) {
            this.app.state.synonym.srClass = {
              value: element.value,
              description: element.description
            }
          }
          if (element.domainid === "SRSTATUS") {
            switch(element.maxvalue) {
              case "NEW":
                this.app.state.synonym.activeSrStatusList.push(element.value);
                if (element.defaults) {
                  this.app.state.synonym.newSRStatus = {
                    value: element.value,
                    description: element.description
                  }     
                }
                break;
              case "INPROG":
              case "PENDING":
              case "QUEUED":
                this.app.state.synonym.activeSrStatusList.push(element.value);
                break;
              default:
                this.app.state.synonym.completedSrStatusList.push(element.value);
            }
          }
        });
      });
    } finally {
      this.app.state.synonym.loading = false;
    }
  }



  async loadSystemProperties() {
    try {
      this.app.state.sysProp.filterSite = Number(this.app.client.systemProperties['sr.filter.site']);
      this.app.state.sysProp.defaultPriority = this.app.client.systemProperties['sr.default.priority'];
      this.app.state.sysProp.highPriority = this.app.client.systemProperties['sr.high.priority'];
      this.app.state.sysProp.defaultClassstructure = this.app.client.systemProperties['sr.default.classstructureid'];
    } catch (err) {
      log.e(TAG, "Error: " + err);
      log.i(TAG, "Cannot load system properties. Will use default values in app.xml");
    }
  }



  async loadMaxVars() {
    try {
      let orgDS = this.app.findDatasource('defaultSetDs');
      await orgDS.load();
      //istanbul ignore next
      if(orgDS.items && orgDS.items.length) {
        this.app.state.maxvarCoordinate = orgDS.items[0].maxvars.filter(item => item.varname === 'COORDINATE')[0]?.varvalue;
      }
    } catch (err) {
      log.e(TAG, "Error: " + err);
      log.i(TAG, "Cannot load maxvar values for organization. Will use default values in app.xml");
    }
  }

}
export default AppController;
