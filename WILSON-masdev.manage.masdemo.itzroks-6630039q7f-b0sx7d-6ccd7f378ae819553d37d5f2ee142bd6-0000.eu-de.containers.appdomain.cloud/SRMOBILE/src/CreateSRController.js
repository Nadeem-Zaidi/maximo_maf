/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';
import { transform } from 'ol/proj';

const TAG = "CreateSRController";

const fillColor = '#0F62FE';
const drawingColor = '#FFFFFF';
const fillPointColor = '#0F62FE';
let popcurrentitem;
const symbols = {
  ASSET: {
      OPERATING: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <title>pin-asset_operating</title>
       <g id="Asset-Operating,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
         <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-19" transform="translate(-19.949811, -7.500500)">
           <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
           <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
             <g id="Icon" transform="translate(3.500000, 3.500000)">
               <path d="M5.29375,0.874975163 C4.45472128,0.872144705 3.63329365,1.11553067 2.93125,1.575 L5.73125,4.375 C5.91963837,4.53573561 6.03516217,4.76571505 6.05163501,5.01280767 C6.06810785,5.25990028 5.98413463,5.50317952 5.81875,5.6875 C5.63442952,5.85288463 5.39115028,5.93685785 5.14405767,5.92038501 C4.89696505,5.90391217 4.66698561,5.78838837 4.50625,5.6 L1.61875,2.8 C1.11951572,3.53462158 0.859726721,4.4056788 0.875,5.29375 C0.884592331,7.7301739 2.8573261,9.70290767 5.29375,9.7125 C5.676812,9.71459577 6.05873115,9.67052818 6.43125,9.58125 L9.3625,12.5125 C10.2202673,13.3702672 11.6109827,13.3702672 12.46875,12.5125 C13.3265172,11.6547327 13.3265172,10.2640173 12.46875,9.40625 L9.5375,6.475 C9.62677818,6.10248115 9.67084577,5.720562 9.66875,5.3375 C9.69226288,4.1620923 9.24172771,3.02668212 8.41869376,2.18718749 C7.59565981,1.34769286 6.46939283,0.874764847 5.29375,0.874975163 Z M8.79375,5.29375 C8.79310815,5.60462573 8.74892903,5.91387958 8.6625,6.2125 L8.53125,6.69375 L8.88125,7.04375 L11.8125,9.975 C12.0648075,10.213864 12.2072847,10.5463108 12.20625,10.89375 C12.2162188,11.2429497 12.0722437,11.5788914 11.8125,11.8125 C11.5730327,12.0639407 11.2409776,12.20625 10.89375,12.20625 C10.5465224,12.20625 10.2144673,12.0639407 9.975,11.8125 L7.04375,8.88125 L6.69375,8.53125 L6.2125,8.6625 C5.91387958,8.74892903 5.60462573,8.79310815 5.29375,8.79375 C4.36409439,8.79116791 3.47110468,8.43083873 2.8,7.7875 C2.11369387,7.14172238 1.73231406,6.23594534 1.75,5.29375 C1.75060336,4.96849724 1.7947454,4.64478896 1.88125,4.33125 L3.80625,6.25625 C4.1348262,6.61380606 4.59321683,6.82444849 5.0785394,6.8409001 C5.56386198,6.85735171 6.0354648,6.67823449 6.3875,6.34375 C6.72198449,5.9917148 6.90110171,5.52011198 6.8846501,5.0347894 C6.86819849,4.54946683 6.65755606,4.0910762 6.3,3.7625 L4.375,1.8375 C4.65795066,1.74801218 4.95324634,1.70371783 5.25,1.70614727 C6.17965561,1.70883209 7.07264532,2.06916127 7.74375,2.7125 C8.41547307,3.40404607 8.79199921,4.32967283 8.79375,5.29375 L8.79375,5.29375 Z" id="Fill"></path>
             </g>
           </g>
           <g id="Oval-Copy" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
             <circle cx="49" cy="5" r="5"></circle>
           </g>
         </g>
       </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      OTHERS: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-asset_others</title>
     <g id="Asset-Others,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-17" transform="translate(-19.949811, -7.500500)">
         <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
         <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
           <g id="Icon" transform="translate(3.500000, 3.500000)">
             <path d="M5.2828125,10.5 C4.31631419,10.5 3.5328125,9.71649831 3.5328125,8.75 C3.5328125,7.78350169 4.31631419,7 5.2828125,7 C6.24931081,7 7.0328125,7.78350169 7.0328125,8.75 C7.03184785,9.71609846 6.24891096,10.4990353 5.2828125,10.5 L5.2828125,10.5 Z M5.2828125,7.875 C4.79956334,7.875 4.4078125,8.26675084 4.4078125,8.75 C4.4078125,9.23324916 4.79956334,9.625 5.2828125,9.625 C5.76606166,9.625 6.1578125,9.23324916 6.1578125,8.75 C6.15733017,8.26695077 5.76586173,7.87548233 5.2828125,7.875 L5.2828125,7.875 Z M13.125,2.625 C13.1240353,1.65890154 12.3410985,0.875964652 11.375,0.875 C11.0916011,0.876982072 10.8130413,0.948650362 10.563875,1.0836875 L3.3936875,4.7936875 C1.64323145,5.61312552 0.638649845,7.48480063 0.923226761,9.39649909 C1.20780368,11.3081976 2.71398595,12.8061184 4.62722069,13.0801766 C6.54045543,13.3542347 8.40657697,12.339374 9.216375,10.5844375 L12.93075,3.4094375 C13.0565876,3.16698574 13.1231576,2.89815665 13.125,2.625 Z M11.375,1.75 C11.8582492,1.75 12.25,2.14175084 12.25,2.625 C12.25,3.10824916 11.8582492,3.5 11.375,3.5 C10.8917508,3.5 10.5,3.10824916 10.5,2.625 C10.5004823,2.14195077 10.8919508,1.75048233 11.375,1.75 Z M9.63375,2.541 C9.632,2.5694375 9.625,2.596125 9.625,2.625 C9.62596465,3.59109846 10.4089015,4.37403535 11.375,4.375 C11.4034375,4.375 11.42925,4.368 11.45725,4.3666875 L9.562,8.0250625 C9.2487999,6.18692932 7.80679097,4.74825554 5.9679375,4.4393125 L9.63375,2.541 Z M5.25,12.25 C3.31700338,12.25 1.75,10.6829966 1.75,8.75 C1.75,6.81700338 3.31700338,5.25 5.25,5.25 C7.18299662,5.25 8.75,6.81700338 8.75,8.75 C8.74758952,10.6819973 7.18199729,12.2475895 5.25,12.25 L5.25,12.25 Z" id="Fill"></path>
           </g>
         </g>
         <g id="Oval-Copy" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
           <circle cx="49" cy="5" r="5"></circle>
         </g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      CLUSTER: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="33px" height="34px" viewBox="0 0 33 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-asset_cluster</title>
     <g id="Asset-Cluster,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="pin-cluster" transform="translate(-19.949811, -14.500500)">
         <path d="M40.1374606,15 L40.3009595,15.0016204 C46.7030983,15.0780787 51.9116061,20.2469999 52,26.6854172 C51.9973801,29.0976296 51.2355629,31.4444414 49.8276541,33.3952751 L49.6,33.6999626 L40,47.7290535 L37.4772299,44.043 L43.5782299,35.127 L43.7709613,34.8718027 C45.5004633,32.4970131 46.4368004,29.6327325 46.4399986,26.6880672 C46.373099,21.8032194 43.8845868,17.5325587 40.1374606,15 Z M44,26.6854172 C43.9973801,29.0976296 43.2355629,31.4444414 41.8276541,33.3952751 L41.6,33.6999626 L32,47.7290535 L22.4,33.6999626 C20.8467315,31.6912931 20.0027577,29.2245881 20,26.6854172 C20.0883939,20.2469999 25.2969017,15.0780787 31.6990405,15.0016204 L32,15.0017808 C38.5390824,14.9168599 43.910225,20.1463996 44,26.6854172 Z" id="Shape" fill="${fillColor}"></path>
         <g id="Number-or-icon?" transform="translate(21.500000, 17.000000)"></g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      }
  },
  LOCATION: {
      CLUSTER: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="33px" height="34px" viewBox="0 0 33 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-location-cluster</title>
     <g id="Location-Cluster,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="pin-cluster" transform="translate(-19.949811, -14.500500)">
         <path d="M40.1374606,15 L40.3009595,15.0016204 C46.7030983,15.0780787 51.9116061,20.2469999 52,26.6854172 C51.9973801,29.0976296 51.2355629,31.4444414 49.8276541,33.3952751 L49.6,33.6999626 L40,47.7290535 L37.4772299,44.043 L43.5782299,35.127 L43.7709613,34.8718027 C45.5004633,32.4970131 46.4368004,29.6327325 46.4399986,26.6880672 C46.373099,21.8032194 43.8845868,17.5325587 40.1374606,15 Z M44,26.6854172 C43.9973801,29.0976296 43.2355629,31.4444414 41.8276541,33.3952751 L41.6,33.6999626 L32,47.7290535 L22.4,33.6999626 C20.8467315,31.6912931 20.0027577,29.2245881 20,26.6854172 C20.0883939,20.2469999 25.2969017,15.0780787 31.6990405,15.0016204 L32,15.0017808 C38.5390824,14.9168599 43.910225,20.1463996 44,26.6854172 Z" id="Shape" fill="${fillColor}"></path>
         <g id="Number-or-icon?" transform="translate(21.500000, 17.000000)"></g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      OPERATING: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <title>pin-location_operating</title>
       <g id="Location-Operating,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
         <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-18" transform="translate(-19.949811, -7.500500)">
           <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
           <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
             <g id="Icon" transform="translate(3.500000, 3.500000)">
               <path d="M7,0.875 C3.61725591,0.875 0.875,3.61725591 0.875,7 C0.875,10.3827441 3.61725591,13.125 7,13.125 C10.3827441,13.125 13.125,10.3827441 13.125,7 C13.125,5.375549 12.4796894,3.81763128 11.331029,2.66897097 C10.1823687,1.52031065 8.624451,0.875 7,0.875 Z M7,12.25 C4.10050506,12.25 1.75,9.89949494 1.75,7 C1.75,4.10050506 4.10050506,1.75 7,1.75 C9.89949494,1.75 12.25,4.10050506 12.25,7 C12.25,9.89949494 9.89949494,12.25 7,12.25 L7,12.25 Z M7,4.375 C5.55025253,4.375 4.375,5.55025253 4.375,7 C4.375,8.44974747 5.55025253,9.625 7,9.625 C8.44974747,9.625 9.625,8.44974747 9.625,7 C9.625,5.55025253 8.44974747,4.375 7,4.375 Z" id="Fill"></path>
             </g>
           </g>
           <g id="Oval-Copy" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
             <circle cx="49" cy="5" r="5"></circle>
           </g>
         </g>
       </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      OTHERS: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-location_others</title>
     <g id="Location-Others,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-23" transform="translate(-19.949811, -7.500500)">
         <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
         <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
           <g id="Icon" transform="translate(3.500000, 3.500000)">
             <path d="M7,0.875 C3.61725591,0.875 0.875,3.61725591 0.875,7 C0.875,10.3827441 3.61725591,13.125 7,13.125 C10.3827441,13.125 13.125,10.3827441 13.125,7 C13.125,5.375549 12.4796894,3.81763128 11.331029,2.66897097 C10.1823687,1.52031065 8.624451,0.875 7,0.875 Z M7,12.25 C4.10050506,12.25 1.75,9.89949494 1.75,7 C1.75,4.10050506 4.10050506,1.75 7,1.75 C9.89949494,1.75 12.25,4.10050506 12.25,7 C12.25,9.89949494 9.89949494,12.25 7,12.25 L7,12.25 Z M7,4.375 C5.55025253,4.375 4.375,5.55025253 4.375,7 C4.375,8.44974747 5.55025253,9.625 7,9.625 C8.44974747,9.625 9.625,8.44974747 9.625,7 C9.625,5.55025253 8.44974747,4.375 7,4.375 Z" id="Fill"></path>
           </g>
         </g>
         <g id="Rectangle-Copy-3" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
           <rect x="44" y="0" width="10" height="10"></rect>
         </g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      }
  }
};

class CreateSRController {

  /**
   * The constructor of CreateSRController class
   */
  constructor() {
    this.memoizedSymbols = {};
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
   onSaveDataFailed() {
    this.saveDataSuccessful = false;
    this.app.state.pageLoading = false;
  }



  async pageInitialized(page, app) {
    this.page = page;
    this.app = app;
    this.app.state.pageLoading = true;

    this.initializeNewSrDatasource();
    this.initializeMap();
    this.initializeFields();
  }



  /**
   * This initializes the datasource that will receive the new SR.
   * At this point, we expect datasource to be empty.
   */
  async initializeNewSrDatasource() {
    //Remove required state of all sections
    this.page.state.detailrequiredState = false;
    this.page.state.contactrequiredState = false;
    this.page.state.locationrequiredState = false;
    this.page.state.assetrequiredState = false;
    this.page.state.addressrequiredState = false;

    let srDS = this.app.findDatasource("srDS");
    let schema = srDS.getSchema();
    //istanbul ignore if
    if (!schema) {
      // Force schema load
      schema = await srDS.dataAdapter.resolveSchema(
        null,
        srDS.options.query,
        true
      );
      srDS.setSchema(schema);
    }
    // istanbul ignore else 
    if (schema) {
      let requiredfield = schema.required; 
      // istanbul ignore else
      if (requiredfield) {
        // istanbul ignore else
        if(requiredfield.indexOf("description") >= 0 ){
          this.page.state.detailrequiredState =  true;
        }
        // istanbul ignore else
        if(requiredfield.indexOf("description_longdescription") >= 0 ){
          this.page.state.detailrequiredState =  true;
        }
        // istanbul ignore else
        if(requiredfield.indexOf("affectedperson") >=0){
          this.page.state.contactrequiredState =  true;
        }
        // istanbul ignore else
        if(requiredfield.indexOf("affectedemail") >=0){
          this.page.state.contactrequiredState =  true;
        }
        // istanbul ignore else
        if(requiredfield.indexOf("affectedphone") >=0){
          this.page.state.contactrequiredState =  true;
        }
        // istanbul ignore else
        if(requiredfield.indexOf("location") >=0){
          this.page.state.locationrequiredState =  true;
        }
        // istanbul ignore else
        if(requiredfield.indexOf("assetnum") >=0){
          this.page.state.assetrequiredState =  true;
        }
        // istanbul ignore if
        if(requiredfield.indexOf("formattedaddress") >=0){
          this.page.state.addressrequiredState = true;
        }
        // istanbul ignore if
        if(requiredfield.indexOf("streetaddress") >=0){
          this.page.state.addressrequiredState = true;
        }
        // istanbul ignore if
        if(requiredfield.indexOf("city") >=0){
          this.page.state.addressrequiredState = true;
        }
        // istanbul ignore if
        if(requiredfield.indexOf("stateprovince") >=0){
          this.page.state.addressrequiredState = true;
        }
      }
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async initializeMap() {
    try {
      this.mapPreloadAPI = new MapPreLoadAPI();
      //For the container we need to load everything here
      if (this.app.state.isMapValid && this.app.state.isMobileContainer) {
        const assetMapDS = this.page.datasources["assetMapDS"];
        if (!assetMapDS.state.hasData) {
          await assetMapDS.load();
          this.loadAssetJsonForMap();
        }
        const locationMapDS = this.page.datasources["locationMapDS"];
        if (!locationMapDS.state.hasData) {
          await locationMapDS.load();
          this.loadLocationJsonForMap();
        }
      }
    } catch (error) {
      //istanbul ignore next
      log.e(error);
    }
  }



  initializeFields() {   
    this.app.state.attachCount = 0; 
    this.page.state.lastcategorydesc = this.page.params.lastcategorydesc;
    if (this.app.client && this.app.client.userInfo){
      this.page.state.siteid = this.app.client.userInfo.defaultSite;
      this.page.state.orgid = this.app.client.userInfo.defaultOrg;
    }
    //istanbul ignore if
    if (this.app.state.isMobileContainer) {
      this.app.state.canLoad.doclinks = true;
    }
  }



  // istanbul ignore next
  async setInvalidState(isAsset) {
    let dsName = (isAsset)? "assetLookupDS" : "locationLookupDS";
    let attr = (isAsset)? "assetnum" : "location";
    let stateVar = (isAsset)? "hasInvalidAsset" : "hasInvalidLocation";
    let isInvalid = false;
    let value = this.app.findDatasource("srDS").item[attr];
    if (value && (value.trim() !== "")) {
      value = value.trim().toUpperCase();
      if (value !== this.page.state[attr]) {
        isInvalid = true;
        let ds = this.page.datasources[dsName];
        let items = ds.items;
        if (ds.state.currentSearch) {
          items = await ds.reset(ds.baseQuery);
        }
        ds.initializeQbe();
        ds.setQBE("assetnum", "=", value);
        await ds.searchQBE();
        isInvalid = !ds.items.length;
        if (!isInvalid) {
          if (isAsset) {  
            this.selectAsset(ds.item);
          } else {
            this.selectLocation(ds.item);
          }
        }  else {
          //Is invalid, but we want to support a scenario where the asset scanned or added is not in the lookup
          //on the device and it can still be processed on the insert when the SR is submitted.
          if (isAsset && this.app.state.isMobileContainer) {
            let newSr = this.app.findDatasource("srDS").item;
            this.page.state.assetnum = newSr.assetnum;
            this.page.state.assetdesc = "";
            isInvalid = false;
            this.loadHub();
            let label = this.app.getLocalizedLabel('assetNotFound', 'Asset not found');
            this.app.toast(label, 'info');
          }
        }
      }
    }
    this.page.state[stateVar] = isInvalid;
  }

  // istanbul ignore next	
  async setAddressState(stateVar) {
    let srDS = this.app.findDatasource("srDS");
	  this.page.state[stateVar] = srDS.item[stateVar];
    this.loadHub();
  }



  /**
   * Function to select contact person
   */
   async selectPerson(event) {
    let srDS = this.app.findDatasource("srDS");
    this.page.state.contactdetail= event.displayname;
    srDS.item["affectedpersonid"] = event.personid;
    srDS.item["affectedperson"] = event.personid;
    srDS.item["affectedusername"] = event.displayname;
    srDS.item["affectedphone"] = event.primaryphone;
    srDS.item["affectedemail"] = event.primaryemail;
    this.loadHub();

  }



  /**
   * Function to select a location
   */
   async selectLocation(item) {
    let srDS = this.app.findDatasource("srDS");
    srDS.item.location = item.location;
    srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
    srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;	   
    this.page.state.location = item.location;
    this.page.state.locationdesc = item.description;
    this.checkAssetMismatch(item.location);
    this.page.state.splitViewIndex = 4;
    this.loadHub();  
  }

  async checkAssetMismatch(location) {
    let assetnum = this.page.state.assetnum;
    let assetLookupDS = this.page.datasources['assetLookupDS'];
    assetLookupDS.initializeQbe();
    // istanbul ignore next
    if (assetnum) {
      assetLookupDS.setQBE('assetnum', '=', assetnum);
      await assetLookupDS.searchQBE();
      let assetLocation = assetLookupDS.item.location;
      assetLookupDS.clearSelections();
      assetLookupDS.clearState();
      if (location !== assetLocation) {
        this.page.state.dialogBMXMessage = this.app.getLocalizedLabel(
          "locationAssetMismatch",
          "The location you entered does not contain the current asset. Would you like to update the asset with the asset that resides in this location?"
        );
        this.page.showDialog("sysMsgAssetMismatchDialog");
        this.page.state.assetlocationmismatch = true;
      }
    }else{
      assetLookupDS.setQBE('location', '=', this.page.state.location);
      await assetLookupDS.searchQBE();
      if (assetLookupDS.items.length === 1) {
        let item = assetLookupDS.items[0];
        this.page.state.assetnum = item.assetnum;
        this.page.state.assetdesc = item.description;
        let srDS = this.app.findDatasource("srDS");
        srDS.item.assetnum = item.assetnum;
        srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
        srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;
        this.loadHub();
      }
      this.filterAssetMapByLocation();
    }
  }

  // istanbul ignore next
  async replaceMismatchedAsset() {
    let csyn = this.page.findDialog("sysMsgAssetMismatchDialog");
    if(csyn) {
      csyn.closeDialog();
    }
    let assetLookupDS = this.page.datasources['assetLookupDS'];
    assetLookupDS.initializeQbe();
    assetLookupDS.setQBE('location', '=', this.page.state.location);
    await assetLookupDS.searchQBE();
    let srDS = this.app.findDatasource("srDS");
    srDS.item.assetnum='';
    srDS.item.assetsiteid=''; 
    srDS.item.assetorgid='';
    this.page.state.assetnum = '';
    this.page.state.assetdesc = '';
    if (assetLookupDS.items.length === 1) {
      let item = assetLookupDS.items[0];
      this.page.state.assetnum = item.assetnum;
      this.page.state.assetdesc = item.description;
      srDS.item.assetnum = item.assetnum;
      srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
      srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;
    }
    assetLookupDS.clearSelections();
    assetLookupDS.clearState();
    this.page.state.splitViewIndex=4;
    this.loadHub();
    this.filterAssetMapByLocation();
  }

  // istanbul ignore next
  async filterAssetMapByLocation() {
    //Limit asset list in map based on location if map is enabled
    if (this.app.state.isMapValid) {
      let assetMapDS = this.page.datasources['assetMapDS'];
      assetMapDS.initializeQbe();
      assetMapDS.setQBE('location', '=', this.page.state.location);
      assetMapDS.searchQBE();
    }
  }

  // istanbul ignore next
  async handleLocationScan(event) {
    let found = false;
    let scannedValue = event.value;
    if (scannedValue) {
      scannedValue = scannedValue.trim().toUpperCase();
    } else {
      scannedValue = "";
    }
    let locationDS = this.page.datasources['locationLookupDS'];
    locationDS.initializeQbe();
    locationDS.setQBE('location', '=', scannedValue);
    await locationDS.searchQBE();
    for (let i = 0; i < locationDS.items.length; i++) {
      let item = locationDS.items[i];
      if(item.location === scannedValue) {
        found = true;
				this.selectLocation(item);
        break;
			}
    }
    if (!found) {
      let label = this.app.getLocalizedLabel('search_noSuggest', 'No results found');
      this.app.toast(label, 'error');
      //Even if no result is found we set the value anyway so user can decide what to do with what was read
      this.app.findDatasource("srDS").item.location = scannedValue; 
    }
    locationDS.resetState();
    await locationDS.searchQBE();
  }



  /**
   * Function to select an asset
   */
   async selectAsset(item) {
    let srDS = this.app.findDatasource("srDS");
    srDS.item.assetnum = item.assetnum;
    srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
    // istanbul ignore next
    srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;
    this.page.state.assetnum = item.assetnum;
    this.page.state.assetdesc = item.description;
    // istanbul ignore next
    if (this.page.state.location) {
      this.page.state.assetLocation = item.location;
      this.page.state.assetLocationDesc = item.locationdesc;
      this.checkLocationMismatch(item.location);
    } else {
      this.page.state.location = item.location;
      this.page.state.locationdesc = item.locationdesc;
      srDS.item.location = item.location;
    }
    this.page.state.splitViewIndex = 5;
    this.loadHub();
  }



  async enableAssetEdit(isEnabled) {
    this.page.state.isAssetEditEnabled = isEnabled;
    if (!isEnabled) { //Upon click erase button
      this.app.findDatasource("srDS").item.assetnum = "";
      this.resetAsset();
      this.loadHub();
    }
  }



  /**
   * Function to switch to next split-view page
   */
   async nextSplitViewPage(item) {
    let srListDS = this.page.datasources["SRListds"];
    let nextIndex = Number(this.page.state.splitViewIndex) + 1;
    // istanbul ignore if
    if (srListDS) {
      let itemsLength = (srListDS.dataAdapter.src)? srListDS.dataAdapter.src.items.length : srListDS.dataAdapter.items.length ;
      if (itemsLength > 0 && itemsLength < nextIndex) {
        nextIndex = 0;
      }
	  }
    this.page.state.splitViewIndex = nextIndex;
    this.loadHub();
  }

  /**
   * Function to switch to previous split-view page
   */
   async prevSplitViewPage(item) {
    this.page.state.splitViewIndex = Number(this.page.state.splitViewIndex) - 1;
    this.loadHub();
  }

  
  checkLocationMismatch(assetLocation) {
    let currentLocation = this.page.state.location;
    // istanbul ignore else
    if (currentLocation && assetLocation) {
      // istanbul ignore else
      if (currentLocation !== assetLocation) {
        this.page.state.dialogBMXMessage = this.app.getLocalizedLabel(
          "assetLocationMismatch",
          "The asset you selected does not reside in the current location. Would you like to update the location to the asset’s location?"
        );
        this.page.showDialog("sysMsgLocationMismatchDialog");
        this.page.state.assetlocationmismatch = true;
      }
    }
  }

  // istanbul ignore next
  async replaceMismatchedLocation() {
    let csyn = this.page.findDialog("sysMsgLocationMismatchDialog");
    if(csyn) {
      csyn.closeDialog();
    }
    this.page.state.location = this.page.state.assetLocation;
    this.page.state.locationdesc = this.page.state.assetLocationDesc;
    this.app.findDatasource("srDS").item.location = this.page.state.assetLocation;
    this.page.state.splitViewIndex=3;
    this.loadHub();
  }

  // istanbul ignore next
  async handleAssetScan(event) {
    let found = false;
    let scannedValue = event.value;
    if (scannedValue) {
      scannedValue = scannedValue.trim().toUpperCase();
    } else {
      scannedValue = "";
    }
    let assetDS = this.page.datasources['assetLookupDS'];
    assetDS.initializeQbe();
    assetDS.setQBE('assetnum', '=', scannedValue);
    await assetDS.searchQBE();
    for (let i = 0; i < assetDS.items.length; i++) {
      let item = assetDS.items[i];
      if(item.assetnum === scannedValue) {
        found = true;
				this.selectAsset(item);
        break;
			}
    }
    if (!found) {
      let label = this.app.getLocalizedLabel('assetNotFound', 'Asset not found');
      if (this.app.state.isMobileContainer) {
        this.app.toast(label, 'info');
        this.page.state.isAssetEditEnabled = true;
      } else {
        this.app.toast(label, 'error');
      }
      
      //Even if no result is found we set the value anyway so user can decide what to do with what was read
      this.app.findDatasource("srDS").item.assetnum = scannedValue; 
      this.page.state.assetnum = scannedValue;
    }
    assetDS.resetState();
    await assetDS.searchQBE();
  }
  


  async openPrevPage() {
    // Make sure that the dialog will be displayed
    this.page.state.useConfirmDialog = true;
    this.app.state.isback = true;
    if(this.app.state.pagelist.length>0 || this.app.state.valuesaved){ 
      // istanbul ignore else
      if(!this.app.state.valuesaved) {
        popcurrentitem=this.app.state.pagelist.pop();
      }
      let currentitem = popcurrentitem;
      // istanbul ignore else
      if(currentitem){
        this.app.state.backPageName = currentitem.pagename;
        this.app.state.isFromDescribleReq = currentitem.isFromDescribleReq;
        if (this.app.state.backPageName === 'SubCategory'){
          this.app.state.selectedSubCategory=currentitem.id;
          this.app.state.subcategory=currentitem.description;
          this.app.state.currSubCategoryID=currentitem.currID;
          this.app.state.currSubCategoryDesc=currentitem.currDesc;
          this.app.setCurrentPage({name: this.app.state.backPageName});
          console.log(">>>>>>Back to Subcategory Page from CreateSR page, this.app.state.lastCurrSelectedID=", this.app.state.lastCurrSelectedID);
          console.log(">>>>>>Back to Subcategory Page from CreateSR page, data{id, description, currID, currDesc}:", currentitem.id, currentitem.description, currentitem.currID, currentitem.currDesc);
          console.log("Back to Subcategory Page from CreateSR page, Length=", this.app.state.pagelist.length);
        } else if (this.app.state.backPageName === 'tktemp'){
          
          this.app.state.templateid=currentitem.id;
          
          this.app.setCurrentPage({name: this.app.state.backPageName,params:{lastcategorydesc:currentitem.description}});
          console.log("Back to Ticket Template Page from CreateSR page, Length=", this.app.state.pagelist.length);
        } else {
          this.app.setCurrentPage({name: this.app.state.backPageName});
          this.page.state.navigateBack = true;
          console.log("Go from CreateSR page back to the previous page - this.app.state.backPageName:", this.app.state.backPageName);
        } 
      }
    } else {
      this.app.setCurrentPage({name: 'newRequest'});
      this.page.state.navigateBack = true;
      console.log("Go back to the previous page - newRequest");
    }
    this.resetPageDatasources();
  }

  async pageResumed(page) { 
    await this.app.state.sysProp.filterSite; //Unit test fails if we remove this
    this.app.state.pageLoading = true;
    this.page.state.lastcategorydesc = this.page.params.lastcategorydesc;
    this.page.state.splitViewIndex = 0;
	
	if(page.params.href) {
		const srDS = this.app.findDatasource("srDS");
		await srDS.load({ noCache: true, itemUrl: this.page.params.href });
    this.page.state.srdescription = srDS.item['description_longdescription'];
    this.page.state.location = srDS.item['location'];
    this.page.state.assetnum = srDS.item['assetnum'];
    this.page.state.contactdetail = srDS.item['affectedperson'];
    this.page.state.formattedaddress = srDS.item.formattedaddress;
    this.page.state.streetaddress = srDS.item.streetaddress;
    this.page.state.city = srDS.item.city;
    this.page.state.stateprovince = srDS.item.stateprovince;
    if (srDS.currentItem?.ticketspec) {
      let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
      await newTicketSpecJDS.load({ src: srDS.currentItem.ticketspec });
    }
    this.loadHub();
    this.app.state.pageLoading = false;
    this.resetLocationQbe();
    this.resetAssetQbe();
    return;
  }
  
    await this.addNewServiceRequest();
    this.loadHub();
    this.app.state.valuesaved = false;
    this.page.state.canLoadLocationJsonMap = false;
    this.page.state.canLoadAssetJsonMap = false;
  }

  async gotoview(event) {
    var index  =  Number(event.viewindex);
    return this.page.state.splitViewIndex=index;
  } 

  async gotoviewBtn(viewindex) {
    var index =  Number(viewindex);
    return this.page.state.splitViewIndex=index;
  }

  async clearvalue(item) {
    item.value="";
    // istanbul ignore else
    if(item.viewindex === '3'){
      this.page.state.location="";
      this.page.state.locationdesc="";
      this.app.findDatasource("srDS").item["location"]="";
      let locationDS = this.page.datasources["locationLookupDS"];
      // istanbul ignore next
      if (locationDS) {
        locationDS.resetState();
        locationDS.clearState();
        locationDS.forceReload();
      }
      this.resetMapQbe("locationMapDS");
    } 
    // istanbul ignore else
    if(item.viewindex === '4'){
      this.page.state.assetnum="";
      this.page.state.assetdesc="";
      this.app.findDatasource("srDS").item["assetnum"]="";
      let assetDS = this.page.datasources["assetLookupDS"];
      // istanbul ignore next
      if (assetDS) {
        assetDS.resetState();
        assetDS.clearState();
        assetDS.forceReload();
      }
      this.resetMapQbe("assetMapDS");
      this.page.state.isAssetEditEnabled = false;
    }
    this.resetAssetQbe();
    // istanbul ignore next
    if(item.viewindex === '5'){
      this.page.state.latitudey="";
      this.page.state.longitudex="";
      this.page.state.formattedaddress="";
      this.page.state.streetaddress="";
      this.page.state.city="";
      this.page.state.stateprovince="";
    }
    this.loadHub();
  }

  // istanbul ignore next
  async resetMapQbe(dsName) {
    if (this.app.state.isMapValid) {
      let ds = this.page.datasources[dsName];
      ds.resetState();
      ds.clearState();
      ds.forceReload();
    }
    
  }

  async splitViewChanged() {
    this.page.state.splitViewIndex = 0;
  }



  async addNewServiceRequest() {
    // Resets invalid states for asset and location
    this.page.state.hasInvalidAsset = false;
    this.page.state.hasInvalidLocation = false;
    // We do not want false confirmation dialogs when add a new SR
    this.page.state.useConfirmDialog = false;
    // Reset the description unless the value was saved
    // istanbul ignore else
    if (!this.app.state.valuesaved) {
		  // Resets the state variable.
		  this.app.state.attachCount = 0; 
    	this.page.state.srdescription = "";
		  // Resets High Priority using default false value.
		  this.page.state.ishighpriority = false;
      // Resets service address
      this.page.state.formattedaddress = "";
      this.page.state.streetaddress = "";
      this.page.state.city = "";
      this.page.state.stateprovince = "";
      this.page.state.latitudey = "";
      this.page.state.longitudex = "";
      // Resets editability state of asset
      this.page.state.isAssetEditEnabled = false;
	  }
    let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
    let personDS = this.page.datasources['personDS'];

    
    if (this.app.client && this.app.client.userInfo && personDS) {
      
      let loctoservreq;

      await personDS.initializeQbe();
      personDS.setQBE("personid", "=", this.app.client.userInfo.personid);
      let currentUserArr = await personDS.searchQBE();

      // istanbul ignore next
      if (currentUserArr.length > 0) {
        loctoservreq = currentUserArr[0].loctoservreq;
      }
      
      // istanbul ignore else
      if (!this.app.state.valuesaved) {
        // Resets contact to the current user
        this.page.state.contactdetail =  this.app.client.userInfo.displayname;
      }

      // istanbul ignore else
      if (this.app.client.userInfo.location && !this.app.state.valuesaved) {
        // Resets Location and Asset Value.
		    // istanbul ignore else
        if (loctoservreq !== false) {
          this.page.state.location = this.app.client.userInfo.location.location;
          this.page.state.locationdesc = this.app.client.userInfo.location.description;
        } else {
          this.page.state.location = '';
          this.page.state.locationdesc = '';
        }
      }
      
      personDS.clearState();
      personDS.resetState();
    }
    this.resetLocationQbe();
    this.resetAsset();
        
    let srDS = this.app.findDatasource("srDS");

    // Register srDS to createSR page
    if (!this.page.getDatasource("srDS"))
      this.page.registerDatasource(srDS);

    // For some reason if forceReload or getSchema happens here for UT, it breaks the srListDS
    // istanbul ignore next
    if (!this.app.client.fakeClient) {
      if (srDS.getSchema()) {
        let requiredfield = srDS.getSchema().required;
        if (requiredfield) {
          this.page.state.detailrequiredState = (requiredfield.indexOf("description")>=0);
        }
      }
      // This avoids update_on_createuri error and
      // ensures the datasource is empty before add a SR
      //istanbul ignore else
      if (!this.app.state.isMobileContainer || !this.app.state.valuesaved) {
        await srDS.forceReload();
      }

      // istanbul ignore next
      if (this.app.state.isMobileContainer && !this.app.state.valuesaved) {
        let attachmentDS = this.app.findDatasource("attachmentDS");
        await attachmentDS.forceReload();
        attachmentDS.clearState();
        attachmentDS.resetState();
      }
    }
    
    // Call the api method to create the SR and any dependent objects such 
    // as ticketspec based on the selected template
    let templateid = this.page.params.templateid;
    // istanbul ignore else
    if (!templateid){
      templateid = '';
      newTicketSpecJDS.clearState();
      newTicketSpecJDS.resetState();
      newTicketSpecJDS.lastQuery = {};
    }

      srDS.options.selectedRecordHref = '';
	  
      //istanbul ignore else
      if (!this.app.state.isMobileContainer || !this.app.state.valuesaved) {
        await srDS.addNew({selectedRecordHref:""});
      }
	  
    //istanbul ignore if
    if(!srDS.item["status"]) {
      srDS.item["status"] = await this.app.state.synonym.newSRStatus.value;
    }
    //istanbul ignore if
    if(!srDS.item["class"]) {
      srDS.item["class"] = await this.app.state.synonym.srClass.value;
    }
		if(this.page.state.srdescription) {
			srDS.item["description_longdescription"] = this.page.state.srdescription;
		}
		if(this.page.state.location) {
			srDS.item["location"] = this.page.state.location;
		}
		if(this.page.state.formattedaddress) {
			srDS.item["formattedaddress"] = this.page.state.formattedaddress;
		}
		if(this.page.state.streetaddress) {
			srDS.item["streetaddress"] = this.page.state.streetaddress;
		}
		if(this.page.state.city) {
			srDS.item["city"] = this.page.state.city;
		}
		if(this.page.state.stateprovince) {
			srDS.item["stateprovince"] = this.page.state.stateprovince;
		}
    if(this.page.state.latitudey) {
			srDS.item["latitudey"] = this.page.state.latitudey;
		}
    if(this.page.state.longitudex) {
			srDS.item["longitudex"] = this.page.state.longitudex;
		}
      if (this.app.client && this.app.client.userInfo) {
        if (this.app.state.valuesaved) {
          srDS.item["reportedby"] = this.page.state.contactdetails.reportedbyid;
          srDS.item["reportedbyid"] = this.page.state.contactdetails.reportedbyid;
          srDS.item["reportedbyname"] = this.page.state.contactdetails.reportedbyname;
          srDS.item["reportedphone"] = this.page.state.contactdetails.reportedphone;
          srDS.item["reportedemail"] = this.page.state.contactdetails.reportedemail;
          srDS.item["affectedpersonid"] = this.page.state.contactdetails.affectedpersonid;
          srDS.item["affectedperson"] = this.page.state.contactdetails.affectedperson;
          srDS.item["affectedusername"] = this.page.state.contactdetails.affectedusername;
          srDS.item["affectedphone"] = this.page.state.contactdetails.affectedphone;
          srDS.item["affectedemail"] = this.page.state.contactdetails.affectedemail;
        } else {
          srDS.item["reportedby"] = this.app.client.userInfo.personid;
          srDS.item["reportedbyid"] = this.app.client.userInfo.personid;
          srDS.item["reportedbyname"] = this.app.client.userInfo.displayname;
          srDS.item["reportedphone"] = this.app.client.userInfo.primaryphone;
          srDS.item["reportedemail"] = this.app.client.userInfo.primaryemail;
          srDS.item["affectedpersonid"] = this.app.client.userInfo.personid;
          srDS.item["affectedperson"] = this.app.client.userInfo.personid;
          srDS.item["affectedusername"] = this.app.client.userInfo.displayname;
          srDS.item["affectedphone"] = this.app.client.userInfo.primaryphone;
          srDS.item["affectedemail"] = this.app.client.userInfo.primaryemail;
        }
      }
      if (templateid){
        srDS.item["templateid"] = templateid;
        /**Try to change the way of how to get followup questions */
        let mobiledstkspec= this.app.datasources["tktemplateds"];
        mobiledstkspec.clearState();
        mobiledstkspec.resetState();
        mobiledstkspec.lastQuery = {};
        await mobiledstkspec.initializeQbe();
        mobiledstkspec.setQBE('templateid', '=', templateid);      
        await mobiledstkspec.searchQBE();
        let newSRC = mobiledstkspec.item.tktemplatespec;
        this.page.state.classstructureid = mobiledstkspec.item.classstructureid;
        srDS.item["classstructureid"] = this.page.state.classstructureid;
        //handle ticket tech spec save
        //istanbul ignore next
        if (newSRC){
          for(let i=0; i < mobiledstkspec.item.tktemplatespec.length; i++){      
            newSRC[i].ticketid= srDS.item.ticketid;
            newSRC[i].refobjectid = srDS.item.ticketuid;
            newSRC[i].refobjectname = 'SR';  
            newSRC[i].ticketspecid = newSRC[i].tktemplatespecid;
            }
            srDS.item.ticketspec = newSRC;
        }  
        // istanbul ignore next
        if (!newSRC){
          newSRC = {};
        }
        //Bind the created ticketspec to a json datasource to display them on the UI 
        //for the user to enter their input    
        // istanbul ignore else
        if (newTicketSpecJDS) {
          newTicketSpecJDS.clearState();
          newTicketSpecJDS.resetState();
          newTicketSpecJDS.lastQuery = {};
          // istanbul ignore else
          if (newTicketSpecJDS && newTicketSpecJDS.dataAdapter) {
            // istanbul ignore else
            if (newTicketSpecJDS.dataAdapter.src) {
              newTicketSpecJDS.dataAdapter.src = newSRC;
            }
            // istanbul ignore else
            if (newTicketSpecJDS.dataAdapter.jsonResponse) {
              newTicketSpecJDS.dataAdapter.jsonResponse = newSRC;
            }
          }
          this.page.state.newTicketSpecSRC = newSRC;
          await newTicketSpecJDS.load({src: newSRC});
          // istanbul ignore else
          if(newTicketSpecJDS.state.itemCount){
            let req = false;
            newTicketSpecJDS.getItems().forEach(item => {
              // istanbul ignore else 
              if(item.mandatory){
                this.page.state.detailrequiredState = true;
                req = true;
              }
            });
            // istanbul ignore else  
            if(req)
              this.loadHub();       
          }
        }
      } else {
		  if(this.app.state.selectedSubCategory) {
			srDS.item["classstructureid"] = this.app.state.selectedSubCategory;
		  }
	  }

      // This is to make sure that Submit is disabled if description is required
      srDS.item["description"] = "";
      //istanbul ignore next
      if (!srDS.item["description_longdescription"]) {
        srDS.item["description_longdescription"] = "";
      }

      // istanbul ignore next
      if(this.app.state.selectedtkt) {
        // by default, populate description with the category summary
        srDS.item["description"] = this.app.state.selectedtkt;
      }
      // istanbul ignore next
      if(this.app.state.subcategory){
        srDS.item["description"] = this.app.state.subcategory;
      } else if (this.app.state.topcategorydesc) {
        srDS.item["description"] = this.app.state.topcategorydesc;
      }
      if (templateid) {
        let tktempds = this.app.datasources.tktempds;
        tktempds.initializeQbe();
        tktempds.setQBE('templateid', '=', templateid);
        await tktempds.searchQBE();
        let tktemp = tktempds.items[0];
        //istanbul ignore else
        if (tktemp.longinstructions) {
          this.page.state.instructions = tktemp.longinstructions;
        } else if (tktemp.instructions) {
          this.page.state.instructions = tktemp.instructions;
        }
        //istanbul ignore else
        if (tktemp.description) {
          srDS.item["description"] = tktemp.description;
        }
        //If ticket template has orgid, we need to set in SR to be able to apply the template
        //istanbul ignore next
        if (tktemp.orgid) {
          //We already filtered the templates by orgid, so it is the same as the one from user
          srDS.item["orgid"] = this.page.state.orgid;
          srDS.item["siteid"] = this.page.state.siteid;
        }
      }
    
    await this.discardAttachments();

    srDS.validateAll();
    this.app.state.pageLoading = false;
  }

  // For custom primary save button
  async onCustomSaveTransition(event) {
    this.app.state.valuesaved = true;
	// when save is selected, retain the description value.
	let srDS = this.app.findDatasource("srDS")
    // istanbul ignore else
    if(srDS) {
      this.page.state.srdescription = srDS.item['description_longdescription'];
      this.page.state.location = srDS.item['location'];
      this.page.state.assetnum = srDS.item['assetnum'];
	    this.page.state.contactdetail = srDS.item['affectedusername'];
      this.page.state.formattedaddress = srDS.item['formattedaddress'];
      this.page.state.streetaddress = srDS.item['streetaddress'];
      this.page.state.city = srDS.item['city'];
      this.page.state.stateprovince = srDS.item['stateprovince'];
      // istanbul ignore else
      if (srDS.item['latitudey']) {
        this.page.state.latitudey = srDS.item['latitudey'];
        this.page.state.longitudex = srDS.item['longitudex'];
      }
      this.page.state.contactdetails = {
        reportedbyid: srDS.item['reportedbyid'],
        reportedbyname: srDS.item['reportedbyname'],
        reportedphone: srDS.item['reportedphone'],
        reportedemail: srDS.item['reportedemail'],
        affectedpersonid: srDS.item['affectedpersonid'],
        affectedperson: srDS.item['affectedperson'],
        affectedusername: srDS.item['affectedusername'],
        affectedphone: srDS.item['affectedphone'],
        affectedemail: srDS.item['affectedemail']
      }
    }
    this.callDefaultSave = false;
    this.saveDataSuccessful = true;
    return {saveDataSuccessful: this.saveDataSuccessful, callDefaultSave: this.callDefaultSave};
  }

  async createServiceRequest(evt) {
    this.app.state.pageLoading = true;
    let canSubmit = true;
    let srCreateResource = this.app.findDatasource("srDS");
    let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
    let stateProvinceList = this.app.datasources['stateProvinceList'];
    let requiredfield = srCreateResource.getSchema().required;
    // istanbul ignore else
    if (requiredfield) {
      // istanbul ignore else
      if(requiredfield.indexOf("description") >= 0 && !srCreateResource.item["description"]){
        canSubmit=false;
      }
      // istanbul ignore else
      if(requiredfield.indexOf("description_longdescription") >= 0 && !srCreateResource.item["description_longdescription"]){
        canSubmit=false;
      }
      // istanbul ignore else
      if(requiredfield.indexOf("affectedperson") >=0 && !srCreateResource.item["affectedperson"]){
        // affectedusername isn't in schema?: if(requiredfield.indexOf("affectedusername") >=0 && !srCreateResource.item["affectedusername"]){
        canSubmit=false;
      }
      // istanbul ignore else
      if(requiredfield.indexOf("affectedemail") >=0 && !srCreateResource.item["affectedemail"]){
        canSubmit=false;
      }
      // istanbul ignore else
      if(requiredfield.indexOf("affectedphone") >=0 && !srCreateResource.item["affectedphone"]){
        canSubmit=false;
      }
      // istanbul ignore else
      if(requiredfield.indexOf("location") >=0 && !srCreateResource.item["location"]){
        canSubmit=false;
      }
      // istanbul ignore else
      if(requiredfield.indexOf("assetnum") >=0 && !srCreateResource.item["assetnum"]){
        canSubmit=false;
      }
    }
    if(newTicketSpecJDS.state.itemCount){
      newTicketSpecJDS.getItems().forEach(item => {
        // istanbul ignore else 
        if(item.mandatory){
          // istanbul ignore else
          if(item["assetattributedatatype_maxvalue"]==='ALN' && !item["alnvalue"]){
            canSubmit=false;
          }
          // istanbul ignore else
          if(item["assetattributedatatype_maxvalue"]==='NUMERIC' && !item["numvalue"]){
            canSubmit=false;
          }
          // istanbul ignore else
          if(item["assetattributedatatype_maxvalue"]==='DATE' && !item["datevalue"]){
            canSubmit=false;
          }
          // istanbul ignore else
          if(item["assetattributedatatype_maxvalue"]==='MAXTABLE' && !item["tablevalue"]){
            canSubmit=false;
          }
        }
      });
    }
	let spFound = false;
    if(stateProvinceList && srCreateResource.item["stateprovince"]){
      await stateProvinceList.load();
		
		stateProvinceList.getItems().forEach(item => {
			// istanbul ignore next 			
			if(item["value"]===srCreateResource.item["stateprovince"])	{
				spFound=true;
				return true;
			}
		});
    // istanbul ignore else
		if(canSubmit) canSubmit = spFound;
    }
    // istanbul ignore next
    if(!this.page.state.hasInvalidLocation) {
      await this.setInvalidState(false); //isAsset = false
    }
    // istanbul ignore next
    if(!this.page.state.hasInvalidAsset) {
      await this.setInvalidState(true); //isAsset = true
    }
    // istanbul ignore next
    if(this.page.state.hasInvalidLocation||this.page.state.hasInvalidAsset) {
      canSubmit=false;
    }
    if(!canSubmit){
      this.app.state.pageLoading = false;
	  let invalidStateProvince = (srCreateResource.item["stateprovince"] && !spFound);
      if (this.page.state.hasInvalidLocation||this.page.state.hasInvalidAsset||invalidStateProvince) {
        if (this.page.state.hasInvalidLocation) {
          let label = this.app.getLocalizedMessage("srmobile", "invalidLocation", "The location selected is invalid. Please review.");
          this.app.toast(label, "error");
        }
      // istanbul ignore else
      if (this.page.state.hasInvalidAsset) {
            let label = this.app.getLocalizedMessage("srmobile", "invalidAsset", "The asset selected is invalid. Please review.");
            this.app.toast(label, "error");
        }
		if(invalidStateProvince) {
            let label = this.app.getLocalizedMessage("srmobile", "invalidStateProvince", "The state/province selected is invalid. Please review.");
            this.app.toast(label, "error");
		}
      } else {
        this.page.showDialog('cannotSubmit');
      }
    }else{
	    this.createServiceRequestSubmit(true);
    }
  }

  async createServiceRequestSubmit(doSubmit){
  // istanbul ignore else
	if(doSubmit) {
    let srCreateResource = this.app.findDatasource("srDS");

    //Handle priority
    let reportedPriority = srCreateResource.item["reportedpriority"];
    //istanbul ignore else
    if (!reportedPriority) {
      if (this.page.state.ishighpriority) {
        reportedPriority = await this.app.state.sysProp.highPriority;
      } else {
        reportedPriority = await this.app.state.sysProp.defaultPriority;
      }
    }
    try {
      srCreateResource.item["reportedpriority"] = reportedPriority;
      if(this.page.state.location) {
        srCreateResource.item["location"] = this.page.state.location;
      }
      if(this.page.state.assetnum) {
        srCreateResource.item["assetnum"] = this.page.state.assetnum;
      }
	  //istanbul ignore next
      if(this.page.state.formattedaddress) {
        srCreateResource.item["formattedaddress"] = this.page.state.formattedaddress;
      }
	  //istanbul ignore next
      if(this.page.state.streetaddress) {
        srCreateResource.item["streetaddress"] = this.page.state.streetaddress;
      }
	  //istanbul ignore next
      if(this.page.state.city) {
        srCreateResource.item["city"] = this.page.state.city;
      }
	  //istanbul ignore next
      if(this.page.state.stateprovince) {
        srCreateResource.item["stateprovince"] = this.page.state.stateprovince;
      }
	  //istanbul ignore next
      if(this.page.state.latitudey) {
        srCreateResource.item["latitudey"] = this.page.state.latitudey;
      }
	  //istanbul ignore next
      if(this.page.state.longitudex) {
        srCreateResource.item["longitudex"] = this.page.state.longitudex;
      }
      /**if asset and location mismatch, user choose to keep the mismatch, set interactive=0 to avoild maximo side throw error message to ask user confirm again. */
	    //istanbul ignore next
      if(this.page.state.assetlocationmismatch){
        srCreateResource.options.query.interactive = 0;
      }else{
        srCreateResource.options.query.interactive = 1;
      }

      //If REPORTEDBYNAME (non-persistent) is missing, we set REPORTEDBYID (non-persistent) to REPORTEDBY (persistent)
      //istanbul ignore next
      if (!srCreateResource.item["reportedby"] && !srCreateResource.item["reportedbyname"]) {
        srCreateResource.item["reportedby"] = srCreateResource.item["reportedbyid"];
      }

      //DT197320 Error while creating an SR with location in Service Request
        // istanbul ignore next
        if(srCreateResource.item["location"] && srCreateResource.item["assetorgid"] === "" && srCreateResource.item["assetsiteid"] === ""){
          if(this.page.state.orgid && this.page.state.siteid){
            srCreateResource.item["assetorgid"] = this.page.state.orgid;
            srCreateResource.item["assetsiteid"] = this.page.state.siteid;
          }
        }
        //END OF DT

      // include Service Address information for saving SR
      srCreateResource.item.tkserviceaddress = {
        formattedaddress: this.page.state.formattedaddress,
        streetaddress: this.page.state.streetaddress,
        city: this.page.state.city,
        stateprovince: this.page.state.stateprovince,
        latitudey: this.page.state.latitudey,
        longitudex: this.page.state.longitudex,
        class: this.app.state.synonym.srClass.value,
      }

      this.page.state.noConfirm = true;
      this.page.state.useConfirmDialog = false;
      const isContainer = await this.app.state.isMobileContainer;

      //istanbul ignore next
      if(srCreateResource.item && srCreateResource.item.ticketspec)
      {
        let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
        srCreateResource.item.ticketspec = newTicketSpecJDS.items;
        for (let i=0; i < srCreateResource.item.ticketspec.length; i++) {
          let ticketSpec = srCreateResource.item.ticketspec[i];
          let remFromTicketSpec = [
            'templateid',
            'tktemplatespecid',
            '_rowstamp'
          ];
          if (!isContainer) {
            remFromTicketSpec.push('href');
          }
          remFromTicketSpec.forEach(e => Reflect.deleteProperty(ticketSpec, e));       
        }

      }
     
      this.app.state.refreshActiveRequests = true;

      //remove site tag to prevent try insert site again
      // istanbul ignore if	    
      if (srCreateResource.item.site){
        delete srCreateResource.item.site;
      } 

      let response;
      try {
        response = await srCreateResource.save();
      } catch(error) {
        //istanbul ignore next
        log.t(TAG, error);
      } finally {
        //istanbul ignore if
        if (response && response.error) {
          this.app.toast(null, "error", response.error.message, 5000, false, false);
          return;
        }
      }
	  
      //Call the upload logic for when on browser. On device, this is handled by attachment-list component
      //istanbul ignore else
      if (!this.app.state.isMobileContainer) {
        //create attachment for the new SR if there are files uploaded
        await this.uploadAttachments(response);
      }
      
      //Go to main page
      this.app.setCurrentPage({
        name: "main",
        resetScroll: true
      });
      //Display ticket created message
      let label = "";
      if (response?.items[0]?.ticketid) {
        label = this.app.getLocalizedLabel('srCreated_msg', 'Request {0} submitted', [response.items[0].ticketid]);
      } else {
        label = this.app.getLocalizedLabel('srCreated_nonumber_msg', 'Request submitted');
      }
      this.app.toast(label, 'success');
    } catch (error) {
      // istanbul ignore next
      log.t(TAG, error);
    } finally {
      srCreateResource.off('save-data-failed', this.onSaveDataFailed);     
      this.page.state.noConfirm = false;
      this.page.state.useConfirmDialog = true;
      this.app.state.pageLoading = false;
      this.resetPageDatasources();
    }

	}
  }



  async resetPageDatasources() {
    const lookups = [
      "assetLookupDS", 
      "assetMapDS", 
      "assetJsonMapDS", 
      "locationLookupDS",
      "locationDS", 
      "locationMapDS", 
      "locationHierarchyDS", 
      "locationJsonMapDS",
      "newTicketSpecJDS",
      "personDS",
      "srattchds"
    ];
    for (const lookup of lookups) {
      const ds = this.app.findDatasource(lookup);
      await ds.reset(ds.baseQuery, false);
      while(ds.dependentChildren.length > 0) {
        ds.dependentChildren.pop();
      }
    }
  }



  setContactPersonHubInfo() {
    let sr = this.app.findDatasource("srDS").item;
    this.page.state.srdescription = sr.description_longdescription;
    this.page.state.contactdetail = sr.affectedusername;
    let srListds = this.page.findDatasource('SRListds');
    //istanbul ignore else
    if (srListds.dataAdapter.src) {
      srListds.dataAdapter.src.items[0].value=this.page.state.srdescription;
      srListds.dataAdapter.src.items[1].value=this.page.state.contactdetail;
    } else {
      srListds.dataAdapter.items[0].value=this.page.state.srdescription;
      srListds.dataAdapter.items[1].value=this.page.state.contactdetail;
    }
  }

  //istanbul ignore next
  async drillInLocation(item){
    let ds = this.page.datasources["locationHierarchyDS"];
    ds.initializeQbe();
    if (ds.lastQuery) {
      ds.lastQuery.searchText = ""; //Clear text search on-drill-in
    }
    if (this.app.state.isMobileContainer){
      if (item) {
        ds.setQBE("parent", "=", item.location);
        ds.setQBE("primarysystem", true);
        ds.setQBE("systemid", "=", item.systemid);
      } else {
        ds.setQBE("parent", "!=", "*");
        ds.setQBE("primarysystem", true);
      }  
    }else {
      if (item) {
        ds.setQBE("LOCHIERLOCONLY.parent", "=", item.location);
        ds.setQBE("LOCHIERLOCONLY.LOCSYSTEM.primarysystem", "=true");
      } else {
        ds.setQBE("LOCHIERLOCONLY.parent", "=", "null");
        ds.setQBE("LOCHIERLOCONLY.LOCSYSTEM.primarysystem", "=true");
      }
    }
    await ds.searchQBE();
  }
    

  async loadHub(){
    let newList = [];
    // istanbul ignore else
    if (this.app.findDatasource("srDS")) {
      newList.push(
        {label: this.app.getLocalizedLabel('Details', 'Details'),
          value: this.page.state.srdescription,
          desc: "",
          requiredstate: this.page.state.detailrequiredState,
          closehide: true,
		  showvaluefield: false,
		  showbutton1field: true,
		  showdescfield: true,
          viewindex: "1"}
      );
    }
    newList.push(
       {label: this.app.getLocalizedLabel('ContactPerson', 'Contact person'),
        value: this.page.state.contactdetail,
        desc: "",
        requiredstate: this.page.state.contactrequiredState,
        closehide: true,
		showvaluefield: false,
		showbutton1field: true,
		showdescfield: true,
        viewindex: "2"}
    );
    newList.push(
      {label: this.app.getLocalizedLabel('Location', 'Location'),
      value: this.page.state.location,
      desc: this.page.state.locationdesc,
      requiredstate: this.page.state.locationrequiredState,
      closehide: !(this.page.state.location),
	  showvaluefield: false,
	  showbutton1field: true,
	  showdescfield: false,
      viewindex: "3"}
    );
    newList.push(
      {label: this.app.getLocalizedLabel('Asset', 'Asset'),
      value: this.page.state.assetnum,
      desc: this.page.state.assetdesc,
      requiredstate: this.page.state.assetrequiredState,
      closehide: !(this.page.state.assetnum),
	  showvaluefield: false,
	  showbutton1field: true,
	  showdescfield: false,
      viewindex: "4"}
    ); 
    newList.push(
      {label: this.app.getLocalizedLabel('ServiceAddress', 'Service Address'),
      value: this.page.state.formattedaddress,
      desc: (this.page.state.latitudey + " " + this.page.state.longitudex),
      requiredstate: this.page.state.addressrequiredState,
      closehide: !(this.page.state.formattedaddress || this.page.state.latitudey),
	  showvaluefield: false,
	  showbutton1field: true,
	  showdescfield: false,
      viewindex: "5"}
    ); 
    newList.push(
       {label: this.app.getLocalizedLabel('Attachment', 'Attachment'),
        value: "",
        desc: "",
        requiredstate: false,
        closehide: true,
		showvaluefield: true,
		showbutton1field: false,
		showdescfield: true,
        viewindex: "6"}
    );
    let newSRC = {items: newList};
    //let srListds = this.page.findDatasource('SRListds');
    let srListds = this.page.datasources['SRListds'];
    // istanbul ignore else
    if(srListds){
      srListds.clearState();
      srListds.resetState();
      srListds.lastQuery = {};
      srListds.dataAdapter.src = newSRC;
      srListds.load({src: newSRC});
      //Fill individual DSs
      let individualDsNames = ["SRListDetailsDS", "SRListContactDS", "SRListLocationDS", "SRListAssetDS", "SRListSaDS", "SRListAttachDS"];
      for (let i=0; i < individualDsNames.length; i++) {
        let individualItemArray = [];
        individualItemArray.push(newList[i]);
        let individualItemSrc = {items: individualItemArray};
        let individualDS = this.page.datasources[individualDsNames[i]];
        individualDS.load({src: individualItemSrc});
      }
      this.page.state.canLoadPage = true;
    }
  }



  async uploadAttachments(response) {    
    //istanbul ignore next
    if (!response) {
      return;
    }

    //Local custom datasource
    let srattchds = this.app.findDatasource("srattchds");
    let srattchdsItems = srattchds.getItems();

    if (srattchdsItems.length < 1) {
      return;
    }

    let srDS = this.app.findDatasource("srDS");
    await srDS.forceReload();

    let createdSrHref = response?.items[0]?.href;
    //istanbul ignore next
    if (createdSrHref) {
      srDS.options.selectedRecordHref = createdSrHref;
    }
    srDS.currentItem.doclinks = [];

    //Local custom datasource
    for (const item of srattchdsItems) {
      let attachmentsList = [];
      attachmentsList.push(item.filedata);
      let doc = {
        href: createdSrHref,
        doclinks: attachmentsList
      };
      await srDS.update(doc, {
        responseProperties: 'doclinks{*}',
        skipMerge: true
      }).catch((error) => {
        //istanbul ignore next
        this.app.toast(null, "error", error.message, 5000, false, false);
      });
    }

    srDS.options.selectedRecordHref = '';
  }



   // Resets the asset value and asset query where clause.
   async resetAsset(){
    // istanbul ignore next
    if(!this.app.state.valuesaved){
      this.page.state.assetnum = "";
      this.page.state.assetdesc = "";
      this.page.state.assetlocationmismatch = false;
    }
    this.resetAssetQbe(); 
  }

  async resetAssetQbe(){
    let assetLookupDS = this.page.datasources["assetLookupDS"];
    await assetLookupDS.initializeQbe();
    if (this.page.state.location) {
      assetLookupDS.setQBE('location', '=', this.page.state.location);
      await assetLookupDS.searchQBE();
    } else {
      assetLookupDS.clearState();
      assetLookupDS.resetState();
      assetLookupDS.lastQuery = {};
      assetLookupDS.state.currentSearch = "";
      assetLookupDS.forceReload();
    }
  }



  // Resets the location query where clause
  async resetLocationQbe() {
    let locationHierarchyDS = this.page.datasources["locationHierarchyDS"];
    let locationLookupDS = this.page.datasources["locationLookupDS"];
    await locationHierarchyDS.initializeQbe();
    await locationLookupDS.initializeQbe();
    locationHierarchyDS.lastQuery = {};
    locationLookupDS.lastQuery = {};
    locationHierarchyDS.state.currentSearch = "";
    locationLookupDS.state.currentSearch = "";
  }



  /**
   * Used to open dialog for maps
   * @param {string} isForAsset If true, opens map dialog in asset select mode, otherwise opens for location select mode
   */
  openMapDialog(isForAsset) {
    // istanbul ignore if
    if (!this.app.state.networkConnected) {
      let mapUnavailableOfflineErrorMsg = this.app.getLocalizedMessage("srmobile", "mapUnavailableOfflineError", "Maps can't be used while offline.");
      this.app.toast(mapUnavailableOfflineErrorMsg, "error");
      return;
    }
    this.page.state.mapIsForAsset = isForAsset;
    this.page.showDialog("mapDialog");
  }

  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  onMapInitialized(map) {
    this.app.map = map;
  }

  async loadAssetJsonForMap(extent) {
    let assetMapDS = this.page.datasources["assetMapDS"];
    // istanbul ignore if
    if(this.page.state.location){
      assetMapDS.setQBE('location', '=', this.page.state.location);
    }
    await assetMapDS.load({pageSize: 2000});
    let assetMapList = [];
    for (const item of assetMapDS.getItems()) {
      // istanbul ignore if
      if (item.autolocate && this.app.map) {
        let distanceCalculated = await this.calculateDistance(item);
        const geometry = this.app.map.parseGeometry(item.autolocate);
        const geometryCenter = this.app.map.getGeometryCenter(geometry);
        const coordinates = geometryCenter.getCoordinates();

        if (coordinates[1] > extent[1] && coordinates[1] < extent[3] && coordinates[0] > extent[0] && coordinates[0] < extent[2] ) {
          assetMapList.push({
            _id: item.assetuid,
            assetuid: item.assetuid,
            assetnum: item.assetnum,
            description: item.description,
            status_maxvalue: item.status_maxvalue,
            distance: distanceCalculated,
            autolocate: item.autolocate,
            latitudey: coordinates[1],
            longitudex: coordinates[0]
          })
        }
      }
    }
    this.page.state.canLoadAssetJsonMap = true;
    await this.page.datasources["assetJsonMapDS"].load({
      src: assetMapList
    });
  }

  // istanbul ignore next
  async loadLocationJsonForMap(extent) {
    let locationMapDS = this.page.datasources["locationMapDS"];
    let locationMapList = [];
    // istanbul ignore next
    for (const item of locationMapDS.getItems()) {
      // istanbul ignore if
      if (item.autolocate && this.app.map) {
        const geometry = this.app.map.parseGeometry(item.autolocate);
        const geometryCenter = this.app.map.getGeometryCenter(geometry);
        const coordinates = geometryCenter.getCoordinates();
        
        if (coordinates[1] > extent[1] && coordinates[1] < extent[3] && coordinates[0] > extent[0] && coordinates[0] < extent[2] ) {
          let distanceCalculated = await this.calculateDistance(item);
          locationMapList.push({
            _id: item.locationsid,
            locationsid: item.locationsid,
            location: item.location,
            description: item.description,
            status_maxvalue: item.status_maxvalue,
            distance: distanceCalculated,
            autolocate: item.autolocate,
            latitudey: coordinates[1],
            longitudex: coordinates[0]
          });
        }
      }
    }
    this.page.state.canLoadLocationJsonMap = true;
    await this.page.datasources["locationJsonMapDS"].load({
      src: locationMapList
    });
  }

    // istanbul ignore next
    async calculateDistance(item) {
      let distance = null;
      if (item.autolocate && this.app.map) {
  
        let geolocationState = this.app.geolocation.state;
        let userCoordinates = null;
        if (geolocationState && geolocationState.enabled && !geolocationState.hasError) {
          if (geolocationState.latitude === 0 && geolocationState.longitude === 0) {
            await this.app.geolocation.updateGeolocation();
          }
          userCoordinates = [geolocationState.longitude, geolocationState.latitude];
        }
        if (userCoordinates === null) {
          return null;
        }
  
        distance = this.app.map.getDistanceFromCoordsToGeometry(userCoordinates, item.autolocate);
      }
      return distance;
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
        const layerSymbols = symbols[layerName.toUpperCase()];
        const symbol = layerSymbols[maxState.toUpperCase()] || layerSymbols['OTHERS'];
        base64Symbol = Object.assign(
            {
                url:
                    'data:image/svg+xml;base64,' +
                    window.btoa(symbol.symbol),
                scale: 1
            },
            symbol.alignment
        );
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
  async handleMapMove(mapInfo) {
    const dsName = (this.page.state.mapIsForAsset) ? "assetMapDS" : "locationMapDS";
    const ds = this.page.datasources[dsName];
    if (ds.lastQuery) {
      ds.lastQuery.searchText = "";
    }
    if (!ds.state.hasData) {
      await ds.load();
    }
    await ds.initializeQbe();
    if (this.page.state.mapIsForAsset && this.page.state.location) {
      ds.setQBE('location', '=', this.page.state.location);
    }
    const coordinates = mapInfo.extent;
    let mapLayerName = (this.page.state.mapIsForAsset)? "ASSET" : "LOCATION";

    let itemSpatialReference = this.app.map.getLayerSpatialReference(mapLayerName);
    let basemapSpatialReference = this.app.map.getBasemapSpatialReference();

    const extentBottomLeft =  this.app.map.convertCoordinates(
      [coordinates[0], coordinates[1]],
      basemapSpatialReference,
      itemSpatialReference
    );
    const extentUpperRight =  this.app.map.convertCoordinates(
      [coordinates[2], coordinates[3]],
      basemapSpatialReference,
      itemSpatialReference
    );
      const extent = [extentBottomLeft[0], extentBottomLeft[1], extentUpperRight[0], extentUpperRight[1]];
    if (this.page.state.mapIsForAsset) {
      this.page.state.canLoadAssetJsonMap = true;
      this.loadAssetJsonForMap(extent);
    } else {
      this.page.state.canLoadLocationJsonMap = true;
      this.loadLocationJsonForMap(extent);
    }
  }




  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleMapClick(item) {
    if (
        item.hasFeature &&
        item.featuresAndLayers &&
        item.featuresAndLayers.length > 0
    ) {
        const layerName = item.featuresAndLayers[0].layer.get('layerName');
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
            const size =
                item.featuresAndLayers[0].feature.values_.features.length;
            const scale = 1 + 0.3 * Math.log(size);
            highlightSymbolCluster.scale = scale;
            let styleCluster = this.app.map.getNewStyle(
                highlightSymbolCluster
            );
            this.app.map.changeFeatureStyle(featureCluster, styleCluster, {
                layer: item.featuresAndLayers[0].layer
            });
            console.log(
                'It is a cluster with ',
                item.featuresAndLayers[0].feature.values_.features.length,
                ' features'
            );
            this.page.state.mapSelectDisabled=true; //Cannot set cluster as selection
            let label = this.app.getLocalizedLabel('mapClusterCannotBeSelected', 'A cluster is not a valid selection.');
            this.app.toast(label, 'error');
        } else {
            let feature = item.featuresAndLayers[0].feature;
            let maximoAttributes = feature.get('features')[0].get('maximoAttributes');
            const highlightSymbol = this.getHighLightSymbols(layerName, maximoAttributes.status_maxvalue);
            let style = this.app.map.getNewStyle(highlightSymbol);
            this.app.map.changeFeatureStyle(feature, style, {
                autoRestoreOnZoom: false,
                layer: item.featuresAndLayers[0].layer
            });
            this.page.state.mapValueSelected = maximoAttributes;
            this.page.state.mapSelectDisabled=false;
            this.selectItemInList(maximoAttributes);
        }
    } else {
        this.app.map.clearFeatureStyle();
        this.page.state.mapSelectDisabled=true;
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  selectItemInList(maximoAttributes) {
    const itemId = maximoAttributes._id;
    const dsName = (this.page.state.mapIsForAsset)? "assetJsonMapDS" : "locationJsonMapDS";
    let jsonMapDS = this.page.datasources[dsName];
    for (const item of jsonMapDS.getItems()) {
      if (item._id === itemId) {
        jsonMapDS.clearSelections();
        jsonMapDS.setSelectedItem(item, true);
        break;
      }
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleItemClick(item) {
    if (!item.autolocate || !this.app.map) {
      return;
    }

    this.app.map.clearFeatureStyle();

    let mapLayerName = (this.page.state.mapIsForAsset)? "ASSET" : "LOCATION";

    let itemGeometry = this.app.map.parseGeometry(item.autolocate);
    let center = this.app.map.getGeometryCenter(itemGeometry);
    let centerCoordinates = center.getCoordinates();
    let itemSpatialReference = this.app.map.getLayerSpatialReference(mapLayerName);
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
    }, 'geojson');

    if (
        feature &&
        feature.hasFeature &&
        feature.featuresAndLayers &&
        feature.featuresAndLayers.length > 0
    ) {
        let maximoAttributes = feature.featuresAndLayers[0].feature.get('maximoAttributes');

        const layerName = feature.featuresAndLayers[0].layer.get('layerName');
        const highlightSymbol = this.getHighLightSymbols(layerName, maximoAttributes.status_maxvalue);
        
        let style = this.app.map.getNewStyle(highlightSymbol);

        if (feature.featuresAndLayers.length > 0) {
            this.app.map.changeFeatureStyle(
                feature.featuresAndLayers[0].feature,
                style,
                { autoRestoreOnZoom: false }
            );
            if (this.page.state.mapIsForAsset) {
              this.page.state.canLoadAssetJsonMap = false;
            } else {
              this.page.state.canLoadLocationJsonMap = false;
            }
            this.app.map.centerTo(
                centerCoordinates[0],
                centerCoordinates[1],
                false
            );
        }

        this.page.state.mapValueSelected = item;
        this.page.state.mapSelectDisabled=false;
    }
  }



  /**
   * When the checkmark icon is clicked on map dialog
   */
  selectValueFromMap() {
    if (this.page.state.mapIsForAsset) {
      this.selectAsset(this.page.state.mapValueSelected);
    } else {
      this.selectLocation(this.page.state.mapValueSelected);
    }
    this.closeMapDialog();
  }

  closeMapDialog() {
    this.page.state.mapAssetValueSelected=null;
    this.page.state.mapLocationValueSelected=null;
    //istanbul ignore next 
    if (this.page && this.page.findDialog('mapDialog')) {
      this.page.findDialog('mapDialog').closeDialog();
      this.loadHub();
    }
  }

  /**
   * Reset the alndomain data using the doaminid from the asset attribute fro the lookup    
  */
   handleALNValueSmartLookupClick(event) {
    this.page.state.newALNTicketSpec = event.item;
    
    let alnDS = this.app.datasources["alndomainDS"];
    
    // istanbul ignore next
    if (alnDS && !event.item.assetattributedomainid){
      alnDS.clearState();
      alnDS.resetState();
      alnDS.lastQuery = {};
    }
   
    // istanbul ignore next
    if (alnDS && event.item.assetattributedomainid) {
      alnDS.initializeQbe();
      alnDS.setQBE('domainid', '=', event.item.assetattributedomainid); 
      alnDS.searchQBE();
    }
    
    this.page.showDialog("alnLookup");
  }

  /**
   * Function to select ALN value from the lookup
   */
  async selectALNValue(event) {
    this.page.state.newALNTicketSpec["alnvalue"] = event.value;
    this.loadHub();
  }



  handleALNValueStateProvinceLookupClick(event) {
    this.page.showDialog("stateProvinceLookup");
  }

  async selectStateProvinceValue(event) {
    let srDS = this.app.findDatasource("srDS");
    this.page.state["stateprovince"] = event.value;
		srDS.item["stateprovince"] = this.page.state.stateprovince;
    this.loadHub();
  }

  

  /**
   * Reset the table domain data using the doaminid from the asset attribute fro the lookup    
  */
  async handleTableValueSmartLookupClick(event) {
    this.page.state.newTableDomainTicketSpec = event.item;
    
    let tableDomainDS = this.app.datasources["tableDomainDS"];
    if (event.item.assetattributedomainid) {
      await tableDomainDS.initializeQbe();
      tableDomainDS.setQBE('domainid', '=', event.item.assetattributedomainid); 
      tableDomainDS.searchQBE();
    } else {
      tableDomainDS.clearState();
      tableDomainDS.resetState();
      tableDomainDS.lastQuery = {};
      tableDomainDS.state.currentSearch = "";
    }
    
    this.page.showDialog("tableDomainLookup");
  }

  /**
   * Function to select table domain value from the lookup
   */
  async selectTableValue(event) {
    this.page.state.newTableDomainTicketSpec["tablevalue"] = event.value;
    this.loadHub();
    let tableDomainDS = this.app.datasources["tableDomainDS"];
    tableDomainDS.lastQuery = {};
    tableDomainDS.state.currentSearch = "";
  }



  /**
   * Function to set description to be displayed in hub
   */
   async setHubDescription(event) {
    this.page.state.srdescription = this.app.findDatasource("srDS").item["description_longdescription"];
    this.loadHub();
  }



  /**
   * Save GPS latitude and longitude in service address
   */
  // istanbul ignore next
  saveGPSLocation() {
    let geolocation = this.app.geolocation;
    if (geolocation) {
      geolocation.on(
        'geolocation-updated',
        (location) => {
          let srDS = this.app.findDatasource("srDS");
          let deviceCoordinates = [location.longitude, location.latitude];
          if (this.app.state.maxvarCoordinate !== 'LATLONG') {
            deviceCoordinates = transform(deviceCoordinates, 'EPSG:4326', 'EPSG:3857');
            let obj = {
              geometry: {
                coordinates: deviceCoordinates,
                type: 'Point'
              },
              type: 'Feature'
            };
            srDS.item.autolocate = JSON.stringify(obj);
          }
          this.page.state.latitudey = srDS.item.latitudey = deviceCoordinates[1];
          this.page.state.longitudex = srDS.item.longitudex = deviceCoordinates[0];
          this.page.state.captureCoordinatesInProg = false;
          this.loadHub();
        },
        this
      );
      geolocation.on(
        'geolocation-error',
        (error) => {
          this.page.state.captureCoordinatesInProg = false;
          let label = this.app.getLocalizedLabel('mapRetrieveLocationError', 'There was an error to retrieve location.');
          this.app.toast(label, 'error', '');
          log.e(error);
        }
      );
      try {
        geolocation.updateGeolocation();
      } finally {
        geolocation.off('geolocation-updated');
        geolocation.off('geolocation-error');
      }
      this.page.state.captureCoordinatesInProg = true;
    }
  }

  getItemServiceAddress(item) {
    if (!item) {
      return null;
    }

    const serviceaddress = Array.isArray(item.serviceaddress) ? item.serviceaddress[0] : item.serviceaddress;

    if (!serviceaddress || isNaN(serviceaddress.latitudey) || isNaN(serviceaddress.longitudex)) {
      return null;
    }

    return serviceaddress
  }



  // istanbul ignore next
  async discardAttachments() {
    //If value is suposed to be saved, we do not discard SRs
    if (this.app.state.valuesaved) {
      return;
    }

    //Avoid new SR to have the attachments from previous SR
    if (this.app.state.isMobileContainer) {
      let attachmentDS = this.app.findDatasource("attachmentDS");
      for (let i=0; attachmentDS.items[i]; i++) {
        await attachmentDS.deleteAttachment(attachmentDS.items[i]);
      }
    } else {
      let srattchds = this.app.findDatasource("srattchds");
      if (srattchds && !this.app.state.valuesaved) {
        await srattchds.forceReload();
        srattchds.deleteItems(srattchds.getItems(),"");
        for (let i=0; srattchds.items[i]; i++) {
          await srattchds.deleteAttachment(srattchds.items[i]);
        }
      }
    }
  }

} export default CreateSRController;
