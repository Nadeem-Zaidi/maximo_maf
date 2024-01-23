/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {DataFormatter} from '@maximo/maximo-js-api';
import WOUtil from './utils/WOUtil';
const POINT_PROPS = {
  color: '',
  offsetx: 12,
  offsety: 43,
  width: 36,
  height: 50
};
const LINE_PROPS = {
  color: 5,
  width: 5
};
const POLYGON_PROPS = {
  color: 5,
  width: 5,
  fillcolor: '#C0C0C0'
};
const SYMBOLOGY_PROPS = {
  point: POINT_PROPS,
  linestring: LINE_PROPS,
  polygon: POLYGON_PROPS,
  multilinestring: LINE_PROPS,
  multipolygon: POLYGON_PROPS
};

class ScheduleDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;

     //update geolocation
     if (this.app.geolocation) {
      // Update Geo Location
      this.app.geolocation.updateGeolocation();
      //set geolaction enabled state to false
      let geolocationState = this.app.geolocation.state;
      //istanbul ignore next
      if (geolocationState && ((geolocationState.latitude === 0 && geolocationState.longitude === 0) || geolocationState.hasError)) {
          geolocationState.enabled = false;
      } else {
          geolocationState.enabled = true;
      }
    }

  }

  computedIsOverDue(item) {
    if (!item.schedfinish) return false;
    let due = new Date(item.schedfinish);
    if (isNaN(due)) return false;
    due.setHours(0, 0, 0, 0);
    let today = new Date().setHours(0, 0, 0, 0);
    // DO NOT USE manual calculations ; they fail in DST
    // Use the library tools
    let result = DataFormatter.get().getDateDiff(
      due.toISOString(),
      new Date(today).toISOString()
    );
    if (result >= 1) return true;
    else return false;
  }

  computedWorkType(item) {
    let computedWorkType = null;

    //istanbul ignore else
    if (item && item.wonum) {
      if(item.istask) {
        computedWorkType = item.wogroup + '-' + item.taskid
      } else {
        item.worktype
        ? (computedWorkType = item.worktype + ' ' + item.wonum)
        : (computedWorkType = item.wonum);
      }
    }
    return computedWorkType;
  }

  computedAssetNum(item) {
    let computedAssetNum = null;

    //istanbul ignore else
    if (item) {
      item.assetdesc
        ? (computedAssetNum =
          item.assetnumber + ' ' + item.assetdesc)
        : (computedAssetNum = item.assetnumber);
    }
    return computedAssetNum;
  }

  /**
   * Dynamically set the lastreading and lastreadingdate on the UI.
   * @param {*} item - meter record
   */
  computedReading(item) {
    let dataFormatter = this.app.dataFormatter;
    let newreadingdate = item.newreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(item.newreadingdate)) : '';
    let lastreadingdate = item.lastreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(item.lastreadingdate)) : '';
    
    if (item) {  
    //istanbul ignore else
      if (item.newreading) {
        if (newreadingdate && lastreadingdate && (newreadingdate < lastreadingdate)) {
          item.computedReading = item.lastreading;
          item.computedReadingDate = lastreadingdate;
          return item.computedReadingDate;
        } else if (newreadingdate && lastreadingdate && (newreadingdate >= lastreadingdate)) {
          item.computedReading = item.newreading;
          item.computedReadingDate = item.newreadingdate;
          item.lastreading = item.newreading;
          item.lastreadingdate = item.newreadingdate;
          return item.computedReadingDate;
        } else if (newreadingdate && !lastreadingdate) {
          item.computedReading = item.newreading;
          item.computedReadingDate = item.newreadingdate;
          item.lastreading = item.newreading;
          item.lastreadingdate = item.newreadingdate;
          return item.computedReadingDate;
        }
      } else if (item.lastreading) {
        item.computedReading = item.lastreading;
        item.computedReadingDate = lastreadingdate;
        return item.computedReadingDate;
      }
    }
  }
  
  computedMeterCurDate(item) {
    item.computedMeterCurDate = new Date();      
    return item.computedMeterCurDate;
  }
  
  computedMeterCurTime(item) {
    let date = new Date();
    item.computedMeterCurTime = date.getTime();    
    return item.computedMeterCurTime;
  }

  /**
   * Function to set the computedDisableButton state - used to show/hide the Materials button
   * @param {Object}  item - The Work Order selected.
   */
  computedDisableButton(item) {
    let page = this.app.findPage('schedule') || this.app.findPage("approvals");
    if(!page.state.isMatAndToolAvail && item && (parseInt(item.materialcount)>0 || parseInt(item.toolcount)>0)){
      page.state.isMatAndToolAvail = true;
    }  
    return !item.materialcount && !item.toolcount;
  }
 
  /**
   * Function to set the computedIsAssetLoc state - used to show/hide the asset and location placeholder on wo card
   * @param {Object}  item - The Work Order selected.
   */
  computedIsAssetLoc(item){
    return !item.assetnumber && !item.assetdesc && !item.locationnum && !item.locationdesc;
  }

  computedItemNum(item) {
    let computedItemNum = null;

    if (item) {
      item.itemnum && item.description
        ? (computedItemNum = item.itemnum + ' ' + item.description)
        : item.itemnum && !item.description
          ? (computedItemNum = item.itemnum)
          : (computedItemNum = item.description);
    }
    return computedItemNum;
  }

  /**
   * Show/hide the Gauge Meter button on workorder list page.  */

  computedDisableMeter(item) {
    return (!item.assetmetercount && !item.locationmetercount);
  }

  /**
   * Show/hide Start, Pause & Stop button on workorder list page. 
   * @param {item} item
   * @return {hideStartButton} bool value to hideStartButton 
   */
  computedTimerStatus(item) {
    let hideStartButton = false;
    if (item && item.labtrans && item.labtrans.length > 0) {
      let self = this;
      item.labtrans.forEach((member) => {
        if (member.timerstatus_maxvalue === "ACTIVE" && member.laborcode === self.app.client.userInfo.labor.laborcode) {
          hideStartButton = true;
        }
      });
    }
    return hideStartButton;
  }

  /**
   * This life-cycle method is handling the preparing the objects for 
   * Tools and Materials.
   */
  async onAfterLoadData(dataSource, items) {
    let page = this.app.findPage('schedule') || this.app.findPage("approvals");
    let app = this.app;
    let materialsPage = this.app.findPage("materials");
    /* istanbul ignore next */
    
    if (app.currentPage.name === 'materials' && materialsPage.state.selectedDS === dataSource.name) {
      materialsPage.callController('_processMaterialsTools', items);
    }
    /* istanbul ignore else */
    if (app.currentPage.name !== 'materials' && dataSource.name === page.state.selectedDS && items.length > 0) {
      this.app.state.firstWO = items[0].wonum;
      this.app.state.worktype = items[0].computedWorkTypeStatus;
      this.app.state.highlightStop = (this.app.state.worktype || this.owner.state.firstLogin) ? true : this.isAllTaskComplete(items[0].woactivity)
    }
    /* istanbul ignore else*/
    if(dataSource.name === page.state.selectedDS){ 
      page.state.dataSourceIntializationCount += 1;
      /* istanbul ignore if*/
      if(page.state.dataSourceIntializationCount > 1 && !this.checkMatToolAvail(items)){
        page.state.checkForUpdateButton = true;                      
      }
    }
  }
    /* Return materials or tools available for any workorder.
     * @param {items} workoorder items
     */
    checkMatToolAvail(items){
      let isMatToolAvail = false;
      if(items?.length>0){
        for(let i = 0; i< items.length;i++){
          if(items[i] && (parseInt(items[i].materialcount)>0 || parseInt(items[i].toolcount))>0){
            isMatToolAvail = true;
            break;
           }
        }
      }
     return isMatToolAvail;
    }
  

  /* Return workroder status and priority on workorder list page.
   * @param {item} item
   * @return {status_description} string value
   * @return {wopriority} number value 
   */
  computedWOStatusPriority(item) {
    let schedulePage;
    // istanbul ignore next
    if (this.app && this.app.pages) {
      const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
      schedulePage = this.app.pages.find((element) => {
        return (element.name === schPage) ? element : '';
      });
    }
    let valueDisable = this.app.checkSigOption('MXAPIWODETAIL.STATUS') ? false :true ;
    let self = this;
    let woStatus = {
      label: item.status_description,
      type: 'cool-gray',
      action: true,
      disabled: valueDisable,
      onClick: () => {
        //istanbul ignore next
        const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
        if (schedulePage && schedulePage !== '') {
          schedulePage.callController('openChangeStatusDialog', {
            item: item,
            datasource: schedulePage.state.selectedDS,
            referencePage: schPage,
            selectedDatasource: self.datasource
          });
        }
      }
    };

    if (item.wopriority !== null && item.wopriority !== "" && item.wopriority >=0) {
      return [woStatus,
        {
          label: this.app.getLocalizedLabel('priority_label', `Priority ${item.wopriority}`, [item.wopriority]),
          type: 'dark-gray',
          disabled: valueDisable,
        }];
    } else {
      return [woStatus];
    }
  }

  /**
   * Distance between users GPS location and
   * that of the x and y coordinates of service of the work order.
   */

  distanceGPSandServiceaddress(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      //istanbul ignore else  
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      //istanbul ignore else
      if (unit === 'KM') {
        dist = dist * 1.609344;
      }
      //istanbul ignore else
      if (unit === 'Miles') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  /**
   * show/hide start work or start travel button
   */
  computedWorkTypeStatus(item) {

    let isStartTravelWork = false;
  
    let travelPrompt = this.app.state.systemProp['mxe.mobile.travel.prompt'];
    let travelRadius = this.app.state.systemProp['mxe.mobile.travel.radius'];

    let geolocationlong = this.app.geolocation.state.longitude;
    let geolocationlat = this.app.geolocation.state.latitude;

    let serlong = item.serviceaddress ? item.serviceaddress.longitudex : '';
    let serlat = item.serviceaddress ? item.serviceaddress.latitudey : '';
    let unit;

    if (
      this.app.client.userInfo.country === 'US' ||
      this.app.client.userInfo.country === 'UK'
    ) {
      unit = 'Miles';
    } else {
      unit = 'KM';
    }

    //istanbul ignore next
    if (serlat === undefined || serlong === undefined || !travelPrompt || !this.app.geolocation.state.enabled || this.app.geolocation.state.hasPermissionError) {
      isStartTravelWork = false;
    } else {
      let distance = this.distanceGPSandServiceaddress(
        geolocationlat,
        geolocationlong,
        serlat,
        serlong,
        unit
      );

      //istanbul ignore else
      if (travelPrompt && travelPrompt === '1' && this.lastLabTransType(item) !== 'WORK' && (distance > parseFloat(travelRadius) || this.lastLabTransType(item) === 'TRAV_ACTIVE')) {
        isStartTravelWork = true;
      }
    }

    return isStartTravelWork;
  }

  accessWoCostData(item) {
    return WOUtil.computedEstTotalCost(item).totalcost;
  }

  /**
   * Pass Labor Transaction Array as Parameter
   * Will return last labor transaction state as below
   * Return "TRAV_ACTIVE" || "TRAV" || "WORK" || "" based on Last Labor Transaction 
   */
  lastLabTransType(item) {
    const defaultTravValue = this.app.state.defaultTravTrans?.value;
    const lastLabTransData = item.labtrans ? item.labtrans[item.labtrans.length - 1] : null;
    if (lastLabTransData?.transtype ===  defaultTravValue && lastLabTransData?.timerstatus_maxvalue === 'ACTIVE') {
      return 'TRAV_ACTIVE';
    } else if (lastLabTransData?.transtype === defaultTravValue && lastLabTransData?.timerstatus_maxvalue !== 'ACTIVE') {
      return defaultTravValue
    } else {
      return lastLabTransData ? lastLabTransData.transtype_maxvalue : "";
    }
  }

  /**
   * Highlight the stop/chevron button on the basis of task status
   */
  isAllTaskComplete(items) {
    let highlightStop = true;
    // istanbul ignore else
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        // istanbul ignore else
        if (items[i].status_maxvalue !== 'COMP') {
          highlightStop = false;
          break;
        }
      }
    }
    return highlightStop;
  }

  /**
   * Returns legends for the symbols/pins being used to display workorders on the map
   * urls here are used to define ui for pin/cluster on map
   */
  retrieveWOLegends(app) {
    const legends = {
      Cluster: {
        label: this.app.getLocalizedLabel('cluster', 'Cluster'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgMzMgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLWNsdXN0ZXI8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJwaW4tY2x1c3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5Ljk0OTgxMSwgLTE0LjUwMDUwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDAuMTM3NDYwNiwxNSBMNDAuMzAwOTU5NSwxNS4wMDE2MjA0IEM0Ni43MDMwOTgzLDE1LjA3ODA3ODcgNTEuOTExNjA2MSwyMC4yNDY5OTk5IDUyLDI2LjY4NTQxNzIgQzUxLjk5NzM4MDEsMjkuMDk3NjI5NiA1MS4yMzU1NjI5LDMxLjQ0NDQ0MTQgNDkuODI3NjU0MSwzMy4zOTUyNzUxIEw0OS42LDMzLjY5OTk2MjYgTDQwLDQ3LjcyOTA1MzUgTDM3LjQ3NzIyOTksNDQuMDQzIEw0My41NzgyMjk5LDM1LjEyNyBMNDMuNzcwOTYxMywzNC44NzE4MDI3IEM0NS41MDA0NjMzLDMyLjQ5NzAxMzEgNDYuNDM2ODAwNCwyOS42MzI3MzI1IDQ2LjQzOTk5ODYsMjYuNjg4MDY3MiBDNDYuMzczMDk5LDIxLjgwMzIxOTQgNDMuODg0NTg2OCwxNy41MzI1NTg3IDQwLjEzNzQ2MDYsMTUgWiBNNDQsMjYuNjg1NDE3MiBDNDMuOTk3MzgwMSwyOS4wOTc2Mjk2IDQzLjIzNTU2MjksMzEuNDQ0NDQxNCA0MS44Mjc2NTQxLDMzLjM5NTI3NTEgTDQxLjYsMzMuNjk5OTYyNiBMMzIsNDcuNzI5MDUzNSBMMjIuNCwzMy42OTk5NjI2IEMyMC44NDY3MzE1LDMxLjY5MTI5MzEgMjAuMDAyNzU3NywyOS4yMjQ1ODgxIDIwLDI2LjY4NTQxNzIgQzIwLjA4ODM5MzksMjAuMjQ2OTk5OSAyNS4yOTY5MDE3LDE1LjA3ODA3ODcgMzEuNjk5MDQwNSwxNS4wMDE2MjA0IEwzMiwxNS4wMDE3ODA4IEMzOC41MzkwODI0LDE0LjkxNjg1OTkgNDMuOTEwMjI1LDIwLjE0NjM5OTYgNDQsMjYuNjg1NDE3MiBaIiBpZD0iU2hhcGUiIGZpbGw9IiMzOTM5MzkiPjwvcGF0aD4KICAgICAgICAgICAgPGcgaWQ9Ik51bWJlci1vci1pY29uPyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEuNTAwMDAwLCAxNy4wMDAwMDApIj48L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
        offsetx: 12,
        offsety: 43,
        width: 33,
        height: 34,
        scale: 1
      },
      INPRG: {
        label: this.app.getLocalizedLabel('inprogress', 'In Progress'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfYWN0aXZlPC90aXRsZT4KICAgIDxnIGlkPSJXb3JrLW9yZGVyLC1tYXAtdmlldy0odXBkYXRlZC1zMzMpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFwLWljb25zLS0tc29saWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjkuMDAwMDAwLCAtMTg3OC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9InBpbi13b3JrLW9yZGVyX2FjdGl2ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA5LjAwMDAwMCwgMTg3MC40OTk1MDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMiw4IEMzOC42Mjc0MTcsOCA0NCwxMy4zNzI1ODMgNDQsMjAgTDQ0LDM2IEM0My45Mjk5NTQyLDM4LjMwMDIyNjcgNDMuMTc0ODk4OSw0MC41MjcwODQgNDEuODI5NjU1Nyw0Mi4zOTIyNDA3IEw0MS42LDQyLjY5OTcwMTYgTDMyLDU2LjcyODc5MjUgTDIyLjQsNDIuNjk5NzAxNiBDMjAuOTI0Mzk0OSw0MC43OTE0NjU1IDIwLjA4ODkyODQsMzguNDY5ODUyNSAyMC4wMDY3MDYzLDM2LjA2NTQ0MDEgTDIwLjAwNSwzNiBMMjAsMzYgTDIwLDIwIEMyMCwxMy4zNzI1ODMgMjUuMzcyNTgzLDggMzIsOCBaIiBpZD0iUGF0aCIgZmlsbD0iIzM5MzkzOSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDAgQzE4LjYyNzQxNywtMS4yMTc0MzY3NWUtMTUgMjQsNS4zNzI1ODMgMjQsMTIgTDI0LDE3IEwyNCwxNyBMMCwxNyBMMCwxMiBDOS42NDczMjMzOGUtMTYsNS4zNzI1ODMgNS4zNzI1ODMsMS4yMTc0MzY3NWUtMTUgMTIsMCBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktMTkiIGZpbGw9IiMyNEExNDgiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHktNCIgZmlsbD0iI0ZGRkZGRiIgY3g9IjEyIiBjeT0iMTAiIHI9IjQiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS41MDAwMDAsIDI1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJJY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjUwMDAwMCwgMy41MDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuMjkzNzUsMC44NzQ5NzUxNjMgQzQuNDU0NzIxMjgsMC44NzIxNDQ3MDUgMy42MzMyOTM2NSwxLjExNTUzMDY3IDIuOTMxMjUsMS41NzUgTDUuNzMxMjUsNC4zNzUgQzUuOTE5NjM4MzcsNC41MzU3MzU2MSA2LjAzNTE2MjE3LDQuNzY1NzE1MDUgNi4wNTE2MzUwMSw1LjAxMjgwNzY3IEM2LjA2ODEwNzg1LDUuMjU5OTAwMjggNS45ODQxMzQ2Myw1LjUwMzE3OTUyIDUuODE4NzUsNS42ODc1IEM1LjYzNDQyOTUyLDUuODUyODg0NjMgNS4zOTExNTAyOCw1LjkzNjg1Nzg1IDUuMTQ0MDU3NjcsNS45MjAzODUwMSBDNC44OTY5NjUwNSw1LjkwMzkxMjE3IDQuNjY2OTg1NjEsNS43ODgzODgzNyA0LjUwNjI1LDUuNiBMMS42MTg3NSwyLjggQzEuMTE5NTE1NzIsMy41MzQ2MjE1OCAwLjg1OTcyNjcyMSw0LjQwNTY3ODggMC44NzUsNS4yOTM3NSBDMC44ODQ1OTIzMzEsNy43MzAxNzM5IDIuODU3MzI2MSw5LjcwMjkwNzY3IDUuMjkzNzUsOS43MTI1IEM1LjY3NjgxMiw5LjcxNDU5NTc3IDYuMDU4NzMxMTUsOS42NzA1MjgxOCA2LjQzMTI1LDkuNTgxMjUgTDkuMzYyNSwxMi41MTI1IEMxMC4yMjAyNjczLDEzLjM3MDI2NzIgMTEuNjEwOTgyNywxMy4zNzAyNjcyIDEyLjQ2ODc1LDEyLjUxMjUgQzEzLjMyNjUxNzIsMTEuNjU0NzMyNyAxMy4zMjY1MTcyLDEwLjI2NDAxNzMgMTIuNDY4NzUsOS40MDYyNSBMOS41Mzc1LDYuNDc1IEM5LjYyNjc3ODE4LDYuMTAyNDgxMTUgOS42NzA4NDU3Nyw1LjcyMDU2MiA5LjY2ODc1LDUuMzM3NSBDOS42OTIyNjI4OCw0LjE2MjA5MjMgOS4yNDE3Mjc3MSwzLjAyNjY4MjEyIDguNDE4NjkzNzYsMi4xODcxODc0OSBDNy41OTU2NTk4MSwxLjM0NzY5Mjg2IDYuNDY5MzkyODMsMC44NzQ3NjQ4NDcgNS4yOTM3NSwwLjg3NDk3NTE2MyBaIE04Ljc5Mzc1LDUuMjkzNzUgQzguNzkzMTA4MTUsNS42MDQ2MjU3MyA4Ljc0ODkyOTAzLDUuOTEzODc5NTggOC42NjI1LDYuMjEyNSBMOC41MzEyNSw2LjY5Mzc1IEw4Ljg4MTI1LDcuMDQzNzUgTDExLjgxMjUsOS45NzUgQzEyLjA2NDgwNzUsMTAuMjEzODY0IDEyLjIwNzI4NDcsMTAuNTQ2MzEwOCAxMi4yMDYyNSwxMC44OTM3NSBDMTIuMjE2MjE4OCwxMS4yNDI5NDk3IDEyLjA3MjI0MzcsMTEuNTc4ODkxNCAxMS44MTI1LDExLjgxMjUgQzExLjU3MzAzMjcsMTIuMDYzOTQwNyAxMS4yNDA5Nzc2LDEyLjIwNjI1IDEwLjg5Mzc1LDEyLjIwNjI1IEMxMC41NDY1MjI0LDEyLjIwNjI1IDEwLjIxNDQ2NzMsMTIuMDYzOTQwNyA5Ljk3NSwxMS44MTI1IEw3LjA0Mzc1LDguODgxMjUgTDYuNjkzNzUsOC41MzEyNSBMNi4yMTI1LDguNjYyNSBDNS45MTM4Nzk1OCw4Ljc0ODkyOTAzIDUuNjA0NjI1NzMsOC43OTMxMDgxNSA1LjI5Mzc1LDguNzkzNzUgQzQuMzY0MDk0MzksOC43OTExNjc5MSAzLjQ3MTEwNDY4LDguNDMwODM4NzMgMi44LDcuNzg3NSBDMi4xMTM2OTM4Nyw3LjE0MTcyMjM4IDEuNzMyMzE0MDYsNi4yMzU5NDUzNCAxLjc1LDUuMjkzNzUgQzEuNzUwNjAzMzYsNC45Njg0OTcyNCAxLjc5NDc0NTQsNC42NDQ3ODg5NiAxLjg4MTI1LDQuMzMxMjUgTDMuODA2MjUsNi4yNTYyNSBDNC4xMzQ4MjYyLDYuNjEzODA2MDYgNC41OTMyMTY4Myw2LjgyNDQ0ODQ5IDUuMDc4NTM5NCw2Ljg0MDkwMDEgQzUuNTYzODYxOTgsNi44NTczNTE3MSA2LjAzNTQ2NDgsNi42NzgyMzQ0OSA2LjM4NzUsNi4zNDM3NSBDNi43MjE5ODQ0OSw1Ljk5MTcxNDggNi45MDExMDE3MSw1LjUyMDExMTk4IDYuODg0NjUwMSw1LjAzNDc4OTQgQzYuODY4MTk4NDksNC41NDk0NjY4MyA2LjY1NzU1NjA2LDQuMDkxMDc2MiA2LjMsMy43NjI1IEw0LjM3NSwxLjgzNzUgQzQuNjU3OTUwNjYsMS43NDgwMTIxOCA0Ljk1MzI0NjM0LDEuNzAzNzE3ODMgNS4yNSwxLjcwNjE0NzI3IEM2LjE3OTY1NTYxLDEuNzA4ODMyMDkgNy4wNzI2NDUzMiwyLjA2OTE2MTI3IDcuNzQzNzUsMi43MTI1IEM4LjQxNTQ3MzA3LDMuNDA0MDQ2MDcgOC43OTE5OTkyMSw0LjMyOTY3MjgzIDguNzkzNzUsNS4yOTM3NSBMOC43OTM3NSw1LjI5Mzc1IFoiIGlkPSJGaWxsIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      COMP: {
        label: this.app.getLocalizedLabel('completed', 'Completed'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfc3RvcDwvdGl0bGU+CiAgICA8ZyBpZD0iV29yay1vcmRlciwtbWFwLXZpZXctKHVwZGF0ZWQtczMzKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hcC1pY29ucy0tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5LjAwMDAwMCwgLTE5NDIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJwaW4td29yay1vcmRlcl9zdG9wIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAxOTM0LjQ5OTUwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLDggQzM4LjYyNzQxNyw4IDQ0LDEzLjM3MjU4MyA0NCwyMCBMNDQsMzYgQzQzLjkyOTk1NDIsMzguMzAwMjI2NyA0My4xNzQ4OTg5LDQwLjUyNzA4NCA0MS44Mjk2NTU3LDQyLjM5MjI0MDcgTDQxLjYsNDIuNjk5NzAxNiBMMzIsNTYuNzI4NzkyNSBMMjIuNCw0Mi42OTk3MDE2IEMyMC45MjQzOTQ5LDQwLjc5MTQ2NTUgMjAuMDg4OTI4NCwzOC40Njk4NTI1IDIwLjAwNjcwNjMsMzYuMDY1NDQwMSBMMjAuMDA1LDM2IEwyMCwzNiBMMjAsMjAgQzIwLDEzLjM3MjU4MyAyNS4zNzI1ODMsOCAzMiw4IFoiIGlkPSJQYXRoIiBmaWxsPSIjMzkzOTM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBMMjQsMTcgTDI0LDE3IEwwLDE3IEwwLDEyIEM5LjY0NzMyMzM4ZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iIzZGNkY2RiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0xMyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEuNyIgeD0iOC44NSIgeT0iNi44NSIgd2lkdGg9IjYuMyIgaGVpZ2h0PSI2LjMiIHJ4PSIyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      APPR: {
        label: this.app.getLocalizedLabel('approved', 'Approved'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfc3RhcnQ8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJNYXAtaWNvbnMtLS1zb2xpZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOS4wMDAwMDAsIC0xODE0LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0icGluLXdvcmstb3JkZXJfc3RhcnQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwOS4wMDAwMDAsIDE4MDYuNDk5NTAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzIsOCBDMzguNjI3NDE3LDggNDQsMTMuMzcyNTgzIDQ0LDIwIEw0NCwzNiBDNDMuOTI5OTU0MiwzOC4zMDAyMjY3IDQzLjE3NDg5ODksNDAuNTI3MDg0IDQxLjgyOTY1NTcsNDIuMzkyMjQwNyBMNDEuNiw0Mi42OTk3MDE2IEwzMiw1Ni43Mjg3OTI1IEwyMi40LDQyLjY5OTcwMTYgQzIwLjkyNDM5NDksNDAuNzkxNDY1NSAyMC4wODg5Mjg0LDM4LjQ2OTg1MjUgMjAuMDA2NzA2MywzNi4wNjU0NDAxIEwyMC4wMDUsMzYgTDIwLDM2IEwyMCwyMCBDMjAsMTMuMzcyNTgzIDI1LjM3MjU4Myw4IDMyLDggWiIgaWQ9IlBhdGgiIGZpbGw9IiMzOTM5MzkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMiwwIEMxOC42Mjc0MTcsLTEuMjE3NDM2NzVlLTE1IDI0LDUuMzcyNTgzIDI0LDEyIEwyNCwxNyBMMjQsMTcgTDAsMTcgTDAsMTIgQzkuNjQ3MzIzMzhlLTE2LDUuMzcyNTgzIDUuMzcyNTgzLDEuMjE3NDM2NzVlLTE1IDEyLDAgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTE5IiBmaWxsPSIjMEY2MkZFIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtQ29weS0yIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjExLjIxMzM1MTQgMTMuMzM1NTMzOSA4IDEwLjE4MTk4MDUgOS4wNjA2NjAxNyA5LjEyMTMyMDM0IDExLjE4MTk4MDUgMTEuMjQyNjQwNyAxNS40MjQ2MjEyIDcgMTYuNDg1MjgxNCA4LjA2MDY2MDE3Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      Wait: {
        label: this.app.getLocalizedLabel('waitappr', 'Waiting for Approval'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfd2FpdDwvdGl0bGU+CiAgICA8ZyBpZD0iV29yay1vcmRlciwtbWFwLXZpZXctKHVwZGF0ZWQtczMzKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hcC1pY29ucy0tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5LjAwMDAwMCwgLTIwMDYuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJwaW4td29yay1vcmRlcl93YWl0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAxOTk4LjQ5OTUwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLDggQzM4LjYyNzQxNyw4IDQ0LDEzLjM3MjU4MyA0NCwyMCBMNDQsMzYgQzQzLjkyOTk1NDIsMzguMzAwMjI2NyA0My4xNzQ4OTg5LDQwLjUyNzA4NCA0MS44Mjk2NTU3LDQyLjM5MjI0MDcgTDQxLjYsNDIuNjk5NzAxNiBMMzIsNTYuNzI4NzkyNSBMMjIuNCw0Mi42OTk3MDE2IEMyMC45MjQzOTQ5LDQwLjc5MTQ2NTUgMjAuMDg4OTI4NCwzOC40Njk4NTI1IDIwLjAwNjcwNjMsMzYuMDY1NDQwMSBMMjAuMDA1LDM2IEwyMCwzNiBMMjAsMjAgQzIwLDEzLjM3MjU4MyAyNS4zNzI1ODMsOCAzMiw4IFoiIGlkPSJQYXRoIiBmaWxsPSIjMzkzOTM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBMMjQsMTcgTDI0LDE3IEwwLDE3IEwwLDEyIEM5LjY0NzMyMzM4ZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iI0YxQzIxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi44OTQ0MjcyLDYuNzg4ODU0MzggTDE1LjI3NjM5MzIsMTEuNTUyNzg2NCBDMTUuNTIzMzgyNSwxMi4wNDY3NjQ5IDE1LjMyMzE1ODEsMTIuNjQ3NDM3OSAxNC44MjkxNzk2LDEyLjg5NDQyNzIgQzE0LjY5MDMyNDIsMTIuOTYzODU0OSAxNC41MzcyMTExLDEzIDE0LjM4MTk2NiwxMyBMOS42MTgwMzM5OSwxMyBDOS4wNjU3NDkyNCwxMyA4LjYxODAzMzk5LDEyLjU1MjI4NDcgOC42MTgwMzM5OSwxMiBDOC42MTgwMzM5OSwxMS44NDQ3NTQ5IDguNjU0MTc5MDgsMTEuNjkxNjQxOCA4LjcyMzYwNjgsMTEuNTUyNzg2NCBMMTEuMTA1NTcyOCw2Ljc4ODg1NDM4IEMxMS4zNTI1NjIxLDYuMjk0ODc1ODggMTEuOTUzMjM1MSw2LjA5NDY1MTU0IDEyLjQ0NzIxMzYsNi4zNDE2NDA3OSBDMTIuNjQwNzQxLDYuNDM4NDA0NDkgMTIuNzk3NjYzNSw2LjU5NTMyNjk4IDEyLjg5NDQyNzIsNi43ODg4NTQzOCBaIiBpZD0iVHJpYW5nbGUtQ29weS03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      Others: {
        label: this.app.getLocalizedLabel('others', 'Others'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfd2FpdDwvdGl0bGU+CiAgICA8ZyBpZD0iV29yay1vcmRlciwtbWFwLXZpZXctKHVwZGF0ZWQtczMzKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hcC1pY29ucy0tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5LjAwMDAwMCwgLTIwMDYuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJwaW4td29yay1vcmRlcl93YWl0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAxOTk4LjQ5OTUwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLDggQzM4LjYyNzQxNyw4IDQ0LDEzLjM3MjU4MyA0NCwyMCBMNDQsMzYgQzQzLjkyOTk1NDIsMzguMzAwMjI2NyA0My4xNzQ4OTg5LDQwLjUyNzA4NCA0MS44Mjk2NTU3LDQyLjM5MjI0MDcgTDQxLjYsNDIuNjk5NzAxNiBMMzIsNTYuNzI4NzkyNSBMMjIuNCw0Mi42OTk3MDE2IEMyMC45MjQzOTQ5LDQwLjc5MTQ2NTUgMjAuMDg4OTI4NCwzOC40Njk4NTI1IDIwLjAwNjcwNjMsMzYuMDY1NDQwMSBMMjAuMDA1LDM2IEwyMCwzNiBMMjAsMjAgQzIwLDEzLjM3MjU4MyAyNS4zNzI1ODMsOCAzMiw4IFoiIGlkPSJQYXRoIiBmaWxsPSIjMzkzOTM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBMMjQsMTcgTDI0LDE3IEwwLDE3IEwwLDEyIEM5LjY0NzMyMzM4ZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iI0YxQzIxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi44OTQ0MjcyLDYuNzg4ODU0MzggTDE1LjI3NjM5MzIsMTEuNTUyNzg2NCBDMTUuNTIzMzgyNSwxMi4wNDY3NjQ5IDE1LjMyMzE1ODEsMTIuNjQ3NDM3OSAxNC44MjkxNzk2LDEyLjg5NDQyNzIgQzE0LjY5MDMyNDIsMTIuOTYzODU0OSAxNC41MzcyMTExLDEzIDE0LjM4MTk2NiwxMyBMOS42MTgwMzM5OSwxMyBDOS4wNjU3NDkyNCwxMyA4LjYxODAzMzk5LDEyLjU1MjI4NDcgOC42MTgwMzM5OSwxMiBDOC42MTgwMzM5OSwxMS44NDQ3NTQ5IDguNjU0MTc5MDgsMTEuNjkxNjQxOCA4LjcyMzYwNjgsMTEuNTUyNzg2NCBMMTEuMTA1NTcyOCw2Ljc4ODg1NDM4IEMxMS4zNTI1NjIxLDYuMjk0ODc1ODggMTEuOTUzMjM1MSw2LjA5NDY1MTU0IDEyLjQ0NzIxMzYsNi4zNDE2NDA3OSBDMTIuNjQwNzQxLDYuNDM4NDA0NDkgMTIuNzk3NjYzNSw2LjU5NTMyNjk4IDEyLjg5NDQyNzIsNi43ODg4NTQzOCBaIiBpZD0iVHJpYW5nbGUtQ29weS03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      }
    };
    return legends;
  }

  /**
   * Change the symbol of feature depending on its data
   * (defines how the pins will show on map)
   */
  createWOSymbology(params) {
    const legends = params.legends;
    let features = params.features;
    let legend = {};
    let geometryType;
    // Is a Cluster
    if (features.length > 1) {
        legend = legends['Cluster'];
        geometryType = 'point';
    } else {
        // Just a single feature
        const feature = features[0];
        let maximoAttributes = feature.get('maximoAttributes');
        let status = maximoAttributes.uxsynonymdomain?.valueid;
        geometryType = feature
            .get('geometry')
            .constructor.name.toLowerCase();
        if (geometryType === 'point') {
          if (status && status.toUpperCase() === 'WOSTATUS|INPRG') {
            legend = legends['INPRG'];
          } else if (status && status.toUpperCase() === 'WOSTATUS|APPR') {
            legend = legends['APPR'];
          } else if (status && (status.toUpperCase() === 'WOSTATUS|CAN' || status.toUpperCase() === 'WOSTATUS|CLOSE' || status.toUpperCase() === 'WOSTATUS|COMP')) {
            legend = legends['COMP'];
          } else if (status && (status.toUpperCase() === 'WOSTATUS|WAPPR' || status.toUpperCase() === 'WOSTATUS|WMATL' || status.toUpperCase() === 'WOSTATUS|WPCOND')) {
            legend = legends['Wait'];
          } else {
            legend = legends['Others'];
          }
        }
    }
    const symbologyProps = SYMBOLOGY_PROPS[geometryType];
    let symbol = Object.assign({}, legend);

    if (symbologyProps) {
        symbologyProps.type = geometryType;
        symbol = Object.assign(legend, symbologyProps);
    }

    return symbol;
  }
}

export default ScheduleDataController;
