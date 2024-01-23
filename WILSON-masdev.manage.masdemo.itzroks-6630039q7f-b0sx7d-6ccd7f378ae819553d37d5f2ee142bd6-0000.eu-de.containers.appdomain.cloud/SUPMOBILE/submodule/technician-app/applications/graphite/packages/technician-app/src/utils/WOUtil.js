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

/**
 * Opens Enter meter drawer for the corresponding workorder record.
 * @param  {Page} page current page object.
 * @param  {Object} item current item object
 * @param  {Array} parentDSItems meter parent datasource item
 * @param  {Datasource} assetMeterDs current assetmeter datasource
 * @param  {Datasource} locationMeterDs current locationmeter datasource
 * @param  {String} dialogName dialog name to open
 */
const openEnterReadingDrawer = async (
  page,
  item,
  parentDSItems,
  assetMeterDs,
  locationMeterDs,
  dialogName,
  readingType,
  app
) => {
  //reset newreading to undefined when transitioning into enter metering drawer
  assetMeterDs.items.forEach((element) => {
    if (element.newreading) {
      element.newreading = undefined;
      element.newreadingFlag = false;
    }
    // istanbul ignore if
    if (readingType === "old") {
      let date = new Date();
      element.computedMeterCurDate = date;
      element.computedMeterCurTime = date;
    }
  });
  locationMeterDs.items.forEach((element) => {
    if (element.newreading) {
      element.newreading = undefined;
      element.newreadingFlag = false;
    }

    // istanbul ignore if
    if (readingType === "old") {
      const date = new Date();
      element.computedMeterCurDate = date;
      element.computedMeterCurTime = date;
    }
  });
  // istanbul ignore next
  if (parentDSItems && parentDSItems.item) {
    if (parentDSItems.item.asset && parentDSItems.item.asset.length > 0) {
      let assetInfo = parentDSItems.item.asset[0];
      page.state.assetMeterHeader = assetInfo.description
        ? assetInfo.assetnum +
          " " +
          assetInfo.description
        : assetInfo.assetnum;
      page.state.currentAssetHref = assetInfo.href;
    }
    page.state.locationMeterHeader = getLocationName(item);

    page.state.oldReading = false;
    page.state.newReading = false;
    page.state.readingDrawerTitle = app.getLocalizedLabel(
      "new_meter_drawer_title",
      `Enter readings`
    );
    page.state.disableSave = true;
    page.state.useConfirmDialog = false;
    if (readingType === "old") {
      page.state.oldReading = true;
      page.state.readingDrawerTitle = app.getLocalizedLabel(
        "old_meter_drawer_title",
        `Enter old readings`
      );
      
      let woMultiAssetLocationds = app.findDatasource("woMultiAssetLocationds");
      if (dialogName === "update_multiMeterReading_drawer" && woMultiAssetLocationds) {
        let date = new Date();
        
        woMultiAssetLocationds.clearWarnings(woMultiAssetLocationds.item, "computedMeterCurDate");
        woMultiAssetLocationds.clearWarnings(woMultiAssetLocationds.item, "computedMeterCurTime"); 
        woMultiAssetLocationds.item.computedMeterCurDate = date;
        woMultiAssetLocationds.item.computedMeterCurTime = date;
      }
      
    } else {
      page.state.newReading = true;
    }
    
    //Setting state values to default
    page.state.rollOverData = [];
    page.state.invalidMeterTime = false;
    page.state.invalidMeterDate = false;
    page.state.invalidDateTime = false;
    page.state.hasErrorMsg = false;
    page.state.hasErrorMsgArr = [];
    page.state.hasAnyReadingError = false;
    page.state.meterid = undefined;
    assetMeterDs.clearWarnings(assetMeterDs.item, "computedMeterCurDate");
    assetMeterDs.clearWarnings(assetMeterDs.item, "computedMeterCurTime");
    if (app.findDatasource("dsnewreading")) {
      app.findDatasource("dsnewreading").clearSelections();
    }
    
    page.state.drawerName = dialogName;
    page.showDialog(dialogName);
  }
};

/**
 * Get Location name or description for particular workorder
 * @param  {Object} item location item
 * @returns {String} locationName location/description concatenated
 */
const getLocationName = (item) => {
  let locationName = null;
  //istanbul ignore else
  if (item && item.locationnum) {
    locationName = item.locationdesc
      ? item.locationnum + " " + item.locationdesc
      : item.locationnum;
    return locationName;
  }
  //istanbul ignore else
  if (item && item.location) {
    locationName = item.locationdesc
      ? item.location + " " + item.locationdesc
      : item.location;
    return locationName;
  }
};

/**
 * Get assetname or description for particular workorder
 * @param  {Object} item asset item
 * @returns {String} computedAssetNum asset/description concatenated
 */
const getAssetName = (item) => {
  let computedAssetNum = null;
  //istanbul ignore else
  if (item && item.assetnumber) {
    computedAssetNum = item.assetdesc
      ? item.assetnumber + " " + item.assetdesc
      : item.assetnumber;
    return computedAssetNum;
  }
  //istanbul ignore else
  if (item && item.assetnum) {
    computedAssetNum = item.assetdescription
      ? item.assetnum + " " + item.assetdescription
      : item.assetnum;
    return computedAssetNum;
  }
};

//istanbul ignore next
const onSaveDataFailed = () => {
  saveDataSuccessful = false;
}

/**
 * save new meter readings.
 * @param  {Object} changeObj changed meter object
 * @param  {Application} app application object
 * @param  {Datasource} assetMeterDs assetmeter datasource
 * @param  {Datasource} locationMeterDs locationmeter datasource
 */
const saveMeterReadings = async (
  changeObj,
  app,
  assetMeterDs,
  locationMeterDs,
  page
) => {
  try {
    app.userInteractionManager.drawerBusy(true);
    let dataFormatter = app.dataFormatter;
    if (
      assetMeterDs &&
      (
        assetMeterDs.name === "woassetmeters" ||
        assetMeterDs.name.includes("cds_tasklistMeterds.activeassetmeter") || 
        assetMeterDs.name.includes("cds_woMultiAssetLocationds.activeassetmeter")
      )
    ) {
      // istanbul ignore if
      if (assetMeterDs && assetMeterDs.items.length > 0) {
        for (let i = 0; i < assetMeterDs.items.length; i++) {
          let udpatedMeterObj = assetMeterDs.items[i];
          if (typeof udpatedMeterObj.newreading !== "undefined") {
            let newreadingDate = page.state.newReading
              ? udpatedMeterObj.computedMeterCurDate
              : assetMeterDs.item.computedMeterCurDate;
            let time = page.state.newReading
              ? udpatedMeterObj.computedMeterCurTime
              : assetMeterDs.item.computedMeterCurTime;

            if (page.state.oldReading) {
              if (
                assetMeterDs.name.includes("cds_tasklistMeterds.activeassetmeter") || 
                assetMeterDs.name.includes("cds_tasklistMeterds.activelocationmeter")
              ) {
                newreadingDate = app.findDatasource("tasklistMeterds").item.computedMeterCurDate;
                time = app.findDatasource("tasklistMeterds").item.computedMeterCurTime;
              }
              if (
                assetMeterDs.name.includes("cds_woMultiAssetLocationds.activeassetmeter") || 
                locationMeterDs.name.includes("cds_woMultiAssetLocationds.activelocationmeter")
              ) {
                newreadingDate = app.findDatasource("woMultiAssetLocationds").item.computedMeterCurDate;
                time = app.findDatasource("woMultiAssetLocationds").item.computedMeterCurTime;
              }
            }

            newreadingDate = dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(newreadingDate));
            time = time?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(time)) : '';

            newreadingDate.setHours(time?time.getHours():0);
            newreadingDate.setMinutes(time?time.getMinutes():0);
            newreadingDate.setMilliseconds(0);
            newreadingDate.setSeconds(0);

            // istanbul ignore if
            if (page.state.rollOverData && udpatedMeterObj.rollover) {
              page.state.rollOverData.forEach((element,index) => {
                if (element.item.assetmeterid === udpatedMeterObj.assetmeterid) {
                  if (page.state.rollOverData[index].dorollover) {
                    udpatedMeterObj.dorollover = true;
                  } else if (!page.state.rollOverData[index].dorollover) {
                    udpatedMeterObj.newreading = udpatedMeterObj.lastreading;
                  }
                }
              });
            }

            // istanbul ignore else
            if (udpatedMeterObj.newreading !== udpatedMeterObj.lastreading) {
              let newmeterreading = {
                assetmeterid: udpatedMeterObj.assetmeterid,
                assetnum: udpatedMeterObj.assetnum,
                dorollover: udpatedMeterObj.dorollover
                  ? udpatedMeterObj.dorollover
                  : false,
                inspector: app.client.userInfo.personid,
                isdelta: false,
                linearassetmeterid: 0,
                metername: udpatedMeterObj.metername,
                newreading: udpatedMeterObj.newreading,
                newreadingdate: newreadingDate,
                siteid: udpatedMeterObj.siteid,
                href: udpatedMeterObj.href,
              };

              let option = {
                responseProperties: "lastreading,newreading,newreadingdate",
                localPayload: newmeterreading,
                relationship: "activeassetmeter",
                useRecordHref: true,
                interactive: false,
              };

              let da = assetMeterDs.dataAdapter;
              da.options.query.interactive = 0;
              saveDataSuccessful = true;
              
              assetMeterDs.on('put-data-failed', onSaveDataFailed);
              try {
                let updatedResponse = await assetMeterDs.put(
                  newmeterreading,
                  option
                );
                // istanbul ignore next
                if (updatedResponse && saveDataSuccessful) {
                  assetMeterDs.items.forEach((element) => {
                    if (element.newreading) {
                      if (newmeterreading.assetmeterid === element.assetmeterid) {                        
                        element.newreading = newmeterreading.newreading;
                        element.newreadingdate = newmeterreading.newreadingdate;
                        
                        let newreadingdate = element.newreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(element.newreadingdate)) : '';
                        let lastreadingdate = element.lastreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(element.lastreadingdate)) : '';
                        
                        if (newreadingdate && lastreadingdate && (newreadingdate >= lastreadingdate)) {
                          element.lastreading = element.newreading;
                          element.lastreadingdate = element.newreadingdate;                          
                          element.computedReading = element.newreading;
                          element.computedReadingDate = element.newreadingdate;
                        } else if (newreadingdate && lastreadingdate && (newreadingdate < lastreadingdate)) {
                          element.computedReading = element.lastreading;
                          element.computedReadingDate = lastreadingdate;
                        } else if (newreadingdate && !lastreadingdate) {
                          element.computedReading = element.newreading;
                          element.computedReadingDate = element.newreadingdate;
                          element.lastreading = element.newreading;
                          element.lastreadingdate = element.newreadingdate;
                        } else {
                          element.computedReading = element.newreading;
                          element.computedReadingDate = element.newreadingdate;
                        }
                      element.newreadingFlag = true;
                    }
                    }
                  });
                }
              } finally {
                assetMeterDs.off('put-data-failed', onSaveDataFailed);
                page.state.useConfirmDialog = false;
              }
            }
          }
        }
      }
    }
    //Saving location meter readings
    if (
      locationMeterDs &&
      (
        locationMeterDs.name === "wolocationmeters" ||
        locationMeterDs.name.includes("cds_tasklistMeterds.activelocationmeter") ||
        locationMeterDs.name.includes("cds_woMultiAssetLocationds.activelocationmeter")
      )
    ) {
    // istanbul ignore if
      if (locationMeterDs && locationMeterDs.items.length > 0) {
        for (let j = 0; j < locationMeterDs.items.length; j++) {
          let udpatedLocMeterObj = locationMeterDs.items[j];

          // istanbul ignore if
          if (typeof udpatedLocMeterObj.newreading !== "undefined") {
            let newLocReadingDate = page.state.newReading
              ? udpatedLocMeterObj.computedMeterCurDate
              : assetMeterDs.item.computedMeterCurDate;
            let newLocationTime = page.state.newReading
              ? udpatedLocMeterObj.computedMeterCurTime
              : assetMeterDs.item.computedMeterCurTime;

            // istanbul ignore if
            if (page.state.oldReading === true)
            {
              if (locationMeterDs.name.includes("cds_woMultiAssetLocationds.activelocationmeter")) {
                newLocReadingDate = app.findDatasource("woMultiAssetLocationds").item.computedMeterCurDate;
                newLocationTime = app.findDatasource("woMultiAssetLocationds").item.computedMeterCurTime;
              } else if (locationMeterDs.name.includes("cds_tasklistMeterds.activelocationmeter")) {
                newLocReadingDate = app.findDatasource("tasklistMeterds").item.computedMeterCurDate;
                newLocationTime = app.findDatasource("tasklistMeterds").item.computedMeterCurTime;
              }
            }

            newLocReadingDate = dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(newLocReadingDate));
            newLocationTime = newLocationTime?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(newLocationTime)) : '';

            newLocReadingDate.setHours(newLocationTime?newLocationTime.getHours() : 0);
            newLocReadingDate.setMinutes(newLocationTime?newLocationTime.getMinutes() : 0);
            newLocReadingDate.setMilliseconds(0);
            newLocReadingDate.setSeconds(0);

            // istanbul ignore if
            if (page.state.rollOverData && udpatedLocMeterObj.rollover) {
              page.state.rollOverData.forEach((element,index) => {
                if (element.item.locationmeterid === udpatedLocMeterObj.locationmeterid) {
                  if (page.state.rollOverData[index].dorollover) {
                    udpatedLocMeterObj.dorollover = true;
                  } else if (!page.state.rollOverData[index].dorollover) {
                    udpatedLocMeterObj.newreading = udpatedLocMeterObj.lastreading;
                  }
                }
              });
            }

            // istanbul ignore else
            if (
              udpatedLocMeterObj.newreading !== udpatedLocMeterObj.lastreading
            ) {
              let newLocationMeterReading = {
                locationmeterid: udpatedLocMeterObj.locationmeterid,
                location: udpatedLocMeterObj.location,
                dorollover: udpatedLocMeterObj.dorollover
                  ? udpatedLocMeterObj.dorollover
                  : false,
                inspector: app.client.userInfo.personid,
                isdelta: false,
                linearassetmeterid: 0,
                metername: udpatedLocMeterObj.metername,
                newreading: udpatedLocMeterObj.newreading,
                newreadingdate: newLocReadingDate,
                href: udpatedLocMeterObj.href,
              };

              let option = {
                responseProperties: "lastreading,newreading,newreadingdate",
                localPayload: newLocationMeterReading,
                relationship: "activelocationmeter",
                useRecordHref: true,
              };

              try {
                app.userInteractionManager.drawerBusy(true);
                saveDataSuccessful = true;
                assetMeterDs.on('put-data-failed', onSaveDataFailed);
                let updatedResponse = await locationMeterDs.put(
                  newLocationMeterReading,
                  option
                );
                // istanbul ignore next
                if (updatedResponse && saveDataSuccessful) {
                  locationMeterDs.items.forEach((element) => {
                    if (element.newreading) {
                      if (
                        newLocationMeterReading.newreading &&
                        newLocationMeterReading.locationmeterid ===
                          element.locationmeterid
                      ) {
                        element.newreading = newLocationMeterReading.newreading;
                        element.newreadingdate = newLocationMeterReading.newreadingdate;

                        let newreadingdate = element.newreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(newLocationMeterReading.newreadingdate)) : '';
                        let lastreadingdate = element.lastreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(element.lastreadingdate)) : '';
                        
                        if (newreadingdate && lastreadingdate && (newreadingdate >= lastreadingdate)) {
                          element.lastreading = newLocationMeterReading.newreading;
                          element.lastreadingdate = element.newreadingdate;                          
                          element.computedReading = newLocationMeterReading.newreading;
                          element.computedReadingDate = newLocationMeterReading.newreadingdate;
                        } else if (newreadingdate && lastreadingdate && (newreadingdate < lastreadingdate)) {
                          element.computedReading = newLocationMeterReading.lastreading;
                          element.computedReadingDate = lastreadingdate;
                        } else if (newreadingdate && !lastreadingdate) {
                          element.computedReading = newLocationMeterReading.newreading;
                          element.computedReadingDate = element.newreadingdate;
                          element.lastreading = newLocationMeterReading.newreading;
                          element.lastreadingdate = element.newreadingdate;
                        } else {
                          element.computedReading = element.newreading;
                          element.computedReadingDate = element.newreadingdate;
                        }
                      }
                    }  
                  });
                }
              } finally {
                assetMeterDs.off('put-data-failed', onSaveDataFailed);
                page.state.useConfirmDialog = false;
              }
            }
          }
        }
      }
    }
  } finally {
    app.userInteractionManager.drawerBusy(false);
  }
};

/**
 * Open meter lookup with new readings on the basis of meter domainid.
 * @param  {Page} page current page object
 * @param  {Object} item current meter item object
 * @param  {Datasource} dnewreadingDS alndomain datasource
 * @param  {Datasource} assetMeterDS assetmeter datasource
 * @param  {Datasource} dialogName locationmeter datasource
 */
const openMeterLookup = async (
  page,
  item,
  dnewreadingDS,
  assetMeterDS,
  dialogName,
  isChild = false
) => {
  await dnewreadingDS.initializeQbe();
  
  dnewreadingDS.setQBE("domainid", "=", (isChild) ? item.measurepoint?.meter?.domainid : item.meter.domainid);
  let response = await dnewreadingDS.searchQBE();
  // istanbul ignore next
  if (response) {
    if (
      assetMeterDS.name === "woassetmeters" ||
      assetMeterDS.name.includes("cds_woMultiAssetLocationds.activeassetmeter")
    ) {
      dnewreadingDS.currentMeterid = item.assetmeterid;
      dnewreadingDS.currentAssetLocNum = item.assetnum;
      dnewreadingDS.isAssetMeter = true;
    } else {
      dnewreadingDS.currentMeterid = item.locationmeterid;
      dnewreadingDS.currentAssetLocNum = item.location;
      dnewreadingDS.isAssetMeter = false;
    }
    dnewreadingDS.CurrentMeterName = item.metername;
    dnewreadingDS.CurrentMeterhref = item.href;
    dnewreadingDS.siteid = item.siteid;

    page.state.updateCharecteristicMeterReadingItem = item;
    page.state.meterHeadername = item.metername;
    
    //Higlight the selected lookup item
    let selectedItem; 
    dnewreadingDS.items.forEach(item => {
      let meterObj = page.state.updateCharecteristicMeterReadingItem;
      let newreading = meterObj.newreading;
      let meterId = meterObj.assetmeterid || meterObj.locationmeterid;
      if (newreading && item.value === newreading && meterId === dnewreadingDS.currentMeterid) {
        selectedItem = item;
      }
    });
    
    dnewreadingDS.clearSelections();
    if (selectedItem) {
      dnewreadingDS.setSelectedItem(selectedItem, true);
    }
    if(isChild) {
      page.parent.showDialog(dialogName);
    } else {
      page.showDialog(dialogName);
    }
  }
};

/**
 * Validate reading data before submission.
 * @param  {Object} changeObj changed meter object
 * @param  {Object} self current page controller
 */
const validateMeterReadings = async (changeObj, self) => {
  self.page.state.hasErrorMsg = false;
  let dataFormatter = self.app.dataFormatter;
  try {
    if (changeObj) {
      let meterObj = changeObj.change.object;
      let newreadingDate;
      let time;
      // istanbul ignore else
      if (changeObj.item) {
        // istanbul ignore else
        if (self.page.state.newReading) {
          newreadingDate = dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
            changeObj.change.object.computedMeterCurDate
          ));
          time = dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
            changeObj.change.object.computedMeterCurTime
          ));
        }

        if (self.page.state.oldReading) {
          // istanbul ignore if
          if (
            changeObj.datasource.name.includes("cds_woMultiAssetLocationds.activeassetmeter") ||
            changeObj.datasource.name.includes("cds_woMultiAssetLocationds.activelocationmeter")
          ) {
            newreadingDate = self.app.findDatasource("woMultiAssetLocationds").item.computedMeterCurDate;
            time = self.app.findDatasource("woMultiAssetLocationds").item.computedMeterCurTime;
          } else if (
            changeObj.datasource.name.includes("cds_tasklistMeterds.activeassetmeter") ||
            changeObj.datasource.name.includes("cds_tasklistMeterds.activelocationmeter")
          ) {
            newreadingDate = self.app.findDatasource("tasklistMeterds").item.computedMeterCurDate;
            time = self.app.findDatasource("tasklistMeterds").item.computedMeterCurTime;
          } else {
            newreadingDate = self.app.findDatasource("woassetmeters").item.computedMeterCurDate;
            time = self.app.findDatasource("woassetmeters").item.computedMeterCurTime;
          }

          newreadingDate = newreadingDate? dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
            newreadingDate
          )) : '';
          time = time? dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(time)) : '';
        }
        
        // istanbul ignore else
        if (newreadingDate) {
          newreadingDate.setHours(time?time.getHours():0);
          newreadingDate.setMinutes(time?time.getMinutes():0);
          newreadingDate.setMilliseconds(0);
        }        
      }

      changeObj.newreadingDate = newreadingDate;
      let errorMessage = "";
      let newDate = changeObj.newreadingDate? dataFormatter.dateTimeToString(
        dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(changeObj.newreadingDate))
        ) : "";
      let lastReadingDate = meterObj.lastreadingdate? dataFormatter.dateTimeToString(
        dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(meterObj.lastreadingdate))
      ) : "";
      let lastReading = dataFormatter.parseNumber(
        meterObj.lastreading
      );
      
      // istanbul ignore else
      if (
        meterObj.meter &&
        meterObj.meter.metertype_maxvalue === "CONTINUOUS"
      ) {
        
        // istanbul ignore else
        if (!meterObj.rollover && self.page.state.newReading) {
          if (changeObj.newValue < lastReading) {
            let newValue = changeObj.newValue;

            errorMessage = `The new reading (${newValue}) entered on ${newDate} should be greater
            than the previous reading (${lastReading}) entered on (${lastReadingDate}).`;
            self.page.state.hasErrorMsg = true;
              self.page.error(
                self.app.getLocalizedLabel("meter_cont_error", errorMessage, [
                  newValue,
                  newDate,
                  lastReading,
                  lastReadingDate,
                ])
              );
            await pushMeterReadingErrors(changeObj, self.page);
            return;
          } else {
              await popMeterReadingErrors(changeObj, self.page);
            }
        }
        // istanbul ignore next
        if (!meterObj.rollover && !self.page.state.newReading &&
        (lastReadingDate && dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(changeObj.newreadingDate)) < dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(meterObj.lastreadingdate)))) {
          
          if (changeObj.newValue > lastReading) {
            let newValue = changeObj.newValue;
            errorMessage = `The new reading (${newValue}) entered on ${newDate} should be lesser
          than the previous reading (${lastReading}) entered on (${lastReadingDate}).`;
          self.page.state.hasErrorMsg = true;
            self.page.error(
              self.app.getLocalizedLabel("meter_cont_lesser_error", errorMessage, [
                newValue,
                newDate,
                lastReading,
                lastReadingDate,
              ])
            );
            await pushMeterReadingErrors(changeObj, self.page);
            return;
          } else {
            await popMeterReadingErrors(changeObj, self.page);
          }
        }
        // istanbul ignore next
        if (!meterObj.rollover && !self.page.state.newReading &&
          (lastReadingDate && dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(changeObj.newreadingDate)) > dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(meterObj.lastreadingdate)))) {
           
            if (changeObj.newValue < lastReading) {
              let newValue = changeObj.newValue;
  
              errorMessage = `The new reading (${newValue}) entered on ${newDate} should be greater
            than the previous reading (${lastReading}) entered on (${lastReadingDate}).`;
            self.page.state.hasErrorMsg = true;
              self.page.error(
                self.app.getLocalizedLabel("meter_cont_error", errorMessage, [
                  newValue,
                  newDate,
                  lastReading,
                  lastReadingDate,
                ])
              );
              await pushMeterReadingErrors(changeObj, self.page);
              return;
            } else {
              await popMeterReadingErrors(changeObj, self.page);
            }
        }

        // istanbul ignore else
        if (meterObj.rollover) {
          // istanbul ignore else
          if (changeObj.newValue > meterObj.rollover) {
            errorMessage = `Readings cannot exceed rollover values. The reading ${changeObj.newValue} is greater than the rollover point ${meterObj.rollover}.`;
            self.page.state.hasErrorMsg = true;
            self.page.error(
              self.app.getLocalizedLabel("rollover_error", errorMessage, [
                changeObj.newValue,
                meterObj.rollover,
              ])
            );
            await pushMeterReadingErrors(changeObj, self.page);
            return;
          } else {
            await popMeterReadingErrors(changeObj, self.page);
          }

          //istanbul ignore next
          if (changeObj.newValue < lastReading && (lastReadingDate && dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(changeObj.newreadingDate)) > dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(meterObj.lastreadingdate)))) {
            self.page.state.rollOverData.push(changeObj);
            self.page.state.meterid = changeObj.item.assetmeterid || changeObj.item.locationmeterid;
            self.page.state.meterData = {
              newReading: changeObj.newValue,
              lastReading: lastReading,
              meterName: meterObj.metername,
            };
            //setting Flag for rollover Diaolog
            self.isRollover = true;
            let dialogName = self.page.dialogs.find(
              (d) =>
                d.name === "multiMeterrollOverDialog" ||
                d.name === "rollOverDialog"
            )?.name;
            
            // istanbul ignore else
            if (self.page.state.drawerName === 'update_meterReading_drawer_detail') {
              dialogName = 'rollOverDialogDetail';
            }

            // istanbul ignore else
            if (self.page.state.drawerName === 'update_taskMeterReading_drawer_detail') {
              dialogName = 'taskRollOverDialogDetail';
            }

            self.page.showDialog(dialogName);
            return;
          }
        }
      }
    }
  } finally {
    // setting flag to false when meters are saved
    self.validatemeter = false;
    await enableDisableSaveBtn(self.page);
  }
};
/**
 * Get computedReading based on newreading/lastreading
 * @param  {Object} item meter item object
 * @returns {String} computed reading
 */
const computedReading = (item, app) => {
  let dataFormatter = app && app.dataFormatter;
  let newreadingdate = item.newreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(item.newreadingdate)) : '';
  let lastreadingdate = item.lastreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(item.lastreadingdate)) : '';
  
  //istanbul ignore else
  if (item) {
    //istanbul ignore else
    if (item.newreading) {
      // istanbul ignore if
      if (newreadingdate && lastreadingdate && (newreadingdate < lastreadingdate)) {
        item.computedReading = item.lastreading;
        item.computedReadingDate = lastreadingdate;
      } else if (newreadingdate && lastreadingdate && (newreadingdate >= lastreadingdate)) {
        item.computedReading = item.newreading;
        item.computedReadingDate = item.newreadingdate;
        item.lastreading = item.newreading;
        item.lastreadingdate = item.newreadingdate;
      } else if (newreadingdate && !lastreadingdate) {
        item.computedReading = item.newreading;
        item.computedReadingDate = item.newreadingdate;
        item.lastreading = item.newreading;
        item.lastreadingdate = item.newreadingdate;
      }
    } else if (item.lastreading) {
        item.computedReading = item.lastreading;
        item.computedReadingDate = lastreadingdate;
    }
  }
  return item.computedReading;
};

/**
 * close update meter dialog.
 * @param  {Object} self page controller object
 * @param  {Page} page current page object
 * @param  {Object} assetNumData asset object
 * @param  {Object} locationData location object
 * @param  {String} siteId siteid of meter parent item
 * @param  {String} dialogName dialog name to be closed
 */
const closeUpdateMeterDialog = async (
  self,
  page,
  assetNumData,
  locationData,
  siteId,
  dialogName,
  app
) => {
  app?.userInteractionManager.drawerBusy(true);
  //Do not refresh datasource until meters are saved
  // istanbul ignore next
  if (self.validatemeter) {
    window.setTimeout(() => {
      closeUpdateMeterDialog(
        self,
        page,
        assetNumData,
        locationData,
        siteId,
        dialogName
      );
    }, 50);
    return;
  }
  // istanbul ignore next
  if (dialogName === 'update_meterReading_drawer' && self.app.findPage("schedule")) {
    const schPage = self.app.findPage("schedule") || self.app.findPage("approvals");
    await schPage.callController('updateMeterDatasources',{
      assetNum: assetNumData,
      location: locationData,
      siteId: siteId,
    });
  } else if (dialogName === 'update_meterReading_drawer_detail' && self.app.findPage("workOrderDetails")) {
    await self.app.findPage("workOrderDetails").callController('updateMeterDatasourcesDetail',{
      assetNum: assetNumData,
      location: locationData,
      siteId: siteId,
    });
  } else if (dialogName === 'taskMeterChangeDialog' && self.app.findPage("tasks")) {
    await self.app.findPage("tasks").callController('updateMeterDatasources');
  } else {
    await self.updateMeterDatasources({
      assetNum: assetNumData,
      location: locationData,
      siteId: siteId,
      app
    });
  }
  
  app?.userInteractionManager.drawerBusy(false);
  page.state.useConfirmDialog = false;
  // istanbul ignore if
  if (app && app.currentPage) {
    app.currentPage.state.useConfirmDialog = false;
  }
  
  // istanbul ignore next
  if (page && page.findDialog(dialogName)) {
    page.findDialog(dialogName).closeDialog();
  }
};

/**
 * Validate date in drawer.
 * @param  {dateISO} date want to convert 
 * @param  {app} app current app object
 */
const getOnlyDatePart = (dateISO, app)  => {
  let dataFormatter = (app) ? app.dataFormatter : this.app.dataFormatter;
  let date = dataFormatter.convertISOtoDate(dateISO);
  date.setHours(0);
  date.setMinutes(0);
  date = dataFormatter.dateWithoutTimeZone(dataFormatter.convertDatetoISO(date));
  return date;
}

/**
 * Validate date in drawer.
 * @param  {app} app current app object
 * @param  {Page} page current page object
 * @param  {Object} datasource asset object
 */
const validateMeterDate = (app, page, datasource, callEnableDisable = true) => {
  let todayDate = new Date();
  page.state.resetDateTimeBtn = false;
  let dataFormatter = app.dataFormatter;
  todayDate = dataFormatter.convertISOtoDate(todayDate);
  let assetMeterds = app.findDatasource(datasource);

  if (!assetMeterds.item.computedMeterCurDate) {
    let errorMessage = app.getLocalizedLabel(
      "blank_meterdatetime_msg",
      "Date or time cannot be blank"
    );

    assetMeterds.setWarning(
      assetMeterds.item,
      "computedMeterCurDate",
      errorMessage
    );
    
    page.state.invalidMeterDate = true;
  } else {
    assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurDate");
    page.state.invalidMeterDate = false;
    
    let meterDateTime = dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
      assetMeterds.item.computedMeterCurDate
    ));
    let time = assetMeterds.item.computedMeterCurTime?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
      assetMeterds.item.computedMeterCurTime
    )) : '';
    meterDateTime.setHours(time?time.getHours():0);
    meterDateTime.setMinutes(time?time.getMinutes():0);
    
    meterDateTime.setSeconds(0);
    todayDate.setSeconds(0);
    meterDateTime.setMilliseconds(0);
    todayDate.setMilliseconds(0);
  
    assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurDate");
    page.state.invalidMeterDate = false;
    
    // istanbul ignore else
    if (getOnlyDatePart(meterDateTime, app) > getOnlyDatePart(todayDate, app)) {
      let errorMessage = app.getLocalizedLabel(
        "future_meterdatetime_msg",
        "Date or time of reading cannot be in the future"
      );
  
      assetMeterds.setWarning(
        assetMeterds.item,
        "computedMeterCurDate",
        errorMessage
      );
  
      page.state.invalidMeterDate = true;
      assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurTime");
    } else if (getOnlyDatePart(meterDateTime, app) === getOnlyDatePart(todayDate, app)) {
      validateMeterTime(app, page, datasource);
    } else if (meterDateTime < todayDate) {
      assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurDate");
      page.state.invalidMeterDate = false;
    } else {
      page.state.invalidMeterDate = false;
      assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurDate");
    }
  }

  //istanbul ignore if
  if (!page.state.invalidMeterTime && !page.state.invalidMeterDate) {
    page.state.invalidDateTime = false;
    if(!callEnableDisable) {
      page.state.disableSave = false;
    }
  } else {
    page.state.invalidDateTime = true;
    page.state.disableSave = true;
  }
  
  let hasAssetAnyNewReading = false; 
  let assetMeterDs = app.findDatasource("woassetmeters");
  let locationMeterDs = app.findDatasource("wolocationmeters");
  let hasLocationAnyNewReading = false; let hasAnyNewReading = false;
  
  // istanbul ignore else
  if (page.state.drawerName !== "update_multiMeterReading_drawer") {  
    if (assetMeterDs && assetMeterDs.items) {
      hasAssetAnyNewReading = assetMeterDs.items.some((item) => (item.newreading));
    }
    
    if (locationMeterDs && locationMeterDs.items) {
      hasLocationAnyNewReading = locationMeterDs.items.some((item) => (item.newreading));
    }
    
    hasAnyNewReading = hasAssetAnyNewReading || hasLocationAnyNewReading;
  }
  
  if (assetMeterds.name === 'woMultiAssetLocationds') {
    let assetMeterNewReading = false;let locationMeterNewReading = false;
    
    // istanbul ignore if
    if (page.state.assetMeterData.items.length > 0) {
      assetMeterNewReading = page.state.assetMeterData.items.some((item) => (item.newreading));
    }
    
    // istanbul ignore if
    if (page.state.locationMeterData.items.length > 0) {
      locationMeterNewReading = page.state.locationMeterData.items.some((item) => (item.newreading));
    }
    
    hasAnyNewReading = assetMeterNewReading || locationMeterNewReading;
  }
  
  if (hasAnyNewReading && callEnableDisable) {
    enableDisableSaveBtn(page);
  }
};

/**
 * Validate time in drawer.
 * @param  {app} app current app object
 * @param  {Page} page current page object
 * @param  {Object} datasource asset object
 */
const validateMeterTime = (app, page, datasource, callEnableDisable = true) => {
  let todayDate = new Date();
  page.state.resetDateTimeBtn = false;
  let dataFormatter = app.dataFormatter;
  todayDate = dataFormatter.convertISOtoDate(todayDate);
  let assetMeterds = app.findDatasource(datasource);
  
  //istanbul ignore next
  if (!assetMeterds.item.computedMeterCurTime) {
    let errorMessage = app.getLocalizedLabel(
      "blank_meterdatetime_msg",
      "Date or time cannot be blank"
    );

    assetMeterds.setWarning(
      assetMeterds.item,
      "computedMeterCurTime",
      errorMessage
    );
    
    page.state.invalidMeterTime = true;
  } else {
    assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurTime");
    page.state.invalidMeterTime = false;
    
    let meterDateTime = dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
      assetMeterds.item.computedMeterCurDate
    ));
    let time = assetMeterds.item.computedMeterCurTime?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(
      assetMeterds.item.computedMeterCurTime
    )) : '';
    
    meterDateTime.setHours(time?time.getHours() : 0);
    meterDateTime.setMinutes(time?time.getMinutes() : 0);
    meterDateTime.setSeconds(0);
    todayDate.setSeconds(0);
    meterDateTime.setMilliseconds(0);
    todayDate.setMilliseconds(0);
    assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurTime");
    page.state.invalidMeterTime = false;
    
    // istanbul ignore if
    if ((getOnlyDatePart(meterDateTime, app) === getOnlyDatePart(todayDate, app)) &&  meterDateTime > todayDate) {
      let errorMessage = app.getLocalizedLabel(
        "future_meterdatetime_msg",
        "Date or time of reading cannot be in the future"
      );
  
      assetMeterds.setWarning(
        assetMeterds.item,
        "computedMeterCurTime",
        errorMessage
      );
  
      page.state.invalidMeterTime = true;
      assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurDate");
    } else if (meterDateTime < todayDate) {
      assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurTime");
      page.state.invalidMeterTime = false;
    } else {
      page.state.invalidMeterTime = false;
      assetMeterds.clearWarnings(assetMeterds.item, "computedMeterCurTime");
    }  
  }
  
  // istanbul ignore next
    if (!page.state.invalidMeterTime && !page.state.invalidMeterDate) {
      page.state.invalidDateTime = false;
      if(!callEnableDisable) {
        page.state.disableSave = false;
      }
    } else {
      page.state.invalidDateTime = true;
      page.state.disableSave = true;
    }
  
  let hasAssetAnyNewReading = false; 
  let assetMeterDs = app.findDatasource("woassetmeters");
  let locationMeterDs = app.findDatasource("wolocationmeters");
  let hasLocationAnyNewReading = false; let hasAnyNewReading = false;
  
  //istanbul ignore else
  if (page.state.drawerName !== "update_multiMeterReading_drawer") {  
    if (assetMeterDs && assetMeterDs.items) {
      hasAssetAnyNewReading = assetMeterDs.items.some((item) => (item.newreading));
    }
    
    if (locationMeterDs && locationMeterDs.items) {
      hasLocationAnyNewReading = locationMeterDs.items.some((item) => (item.newreading));
    }
    
    hasAnyNewReading = hasAssetAnyNewReading || hasLocationAnyNewReading;
  }
  
  if (assetMeterds.name === 'woMultiAssetLocationds') {
    let assetMeterNewReading = false;let locationMeterNewReading = false;
    
    // istanbul ignore if
    if (page.state.assetMeterData.items.length > 0) {
      assetMeterNewReading = page.state.assetMeterData.items.some((item) => (item.newreading));
    }
    
    // istanbul ignore if
    if (page.state.locationMeterData.items.length > 0) {
      locationMeterNewReading = page.state.locationMeterData.items.some((item) => (item.newreading));
    }
    
    hasAnyNewReading = assetMeterNewReading || locationMeterNewReading;
  }
  
  if (hasAnyNewReading && callEnableDisable) {
    enableDisableSaveBtn(page);
  }
};

/**
 * Validate date in drawer.
 * @param  {app} app current app object
 * @param  {Page} page current page object
 * @param  {Object} datasource wo object
 * @param  {drawer} drawer drawer to open
 */
 const openWOHazardDrawer = async(app, page, object, drawer) => {  
  let wods = app.findDatasource("woDetailds");
  // istanbul ignore else
  if (wods) {
    await wods.load({
      noCache:true,
      itemUrl: object.item.href
    });
  }  
  // istanbul ignore else
  if (wods.item.splanreviewdate) {
    wods.item.splanreviewdate = app.dataFormatter.dateWithoutTimeZone(app.dataFormatter.convertISOtoDate(wods.item.splanreviewdate));
  }
  page.showDialog(drawer);
};


/**
 * Validate date in drawer.
 * @param  {app} app current app object
 * @param  {Page} page current page object
 * @param  {Object} datasource wo object
 * @param  {drawer} drawer drawer to open
 */
 const reviewSafetyPlan = async(app) => {  
  let wods = app.findDatasource("woDetailds");
  let reviewDate = app.dataFormatter.dateWithoutTimeZone(app.dataFormatter.convertISOtoDate(new Date()));
  
  let localPayload = {
    href:wods.item.href,
    splanreviewdate: reviewDate
    };
  
  let option = {
    responseProperties: "description,anywhererefid",
    localPayload : localPayload
   };
  
  let dataToUpdate = {splanreviewdate: reviewDate, href:wods.item.href};		
  await wods.update(dataToUpdate, option);
  
  await wods.forceReload();
  const schedulePage = app.findPage("schedule") ||  app.findPage("approvals");
  // istanbul ignore next
  if(schedulePage && schedulePage.state) { 
    let scheduleDs = schedulePage.state.selectedDs;
    let schedulePageDS = app.findDatasource(scheduleDs);  
    if (schedulePageDS) {
      await schedulePageDS.forceReload();
    }
  }  
	   // istanbul ignore if
  if (wods.item.splanreviewdate) {
    wods.item.splanreviewdate = app.dataFormatter.dateWithoutTimeZone(app.dataFormatter.convertISOtoDate(wods.item.splanreviewdate));
  }
  
  app.findDatasource('wodetails').load({
    noCache:true,
    itemUrl: wods.item.href
  });
};

/**
 * Push the reading errors.
 * @param  {changeObj} changeObj current object
 * @param  {page} page current page object
 */
 const pushMeterReadingErrors = async(changeObj, page) => {  
  let meterid = changeObj.change.object.assetmeterid || changeObj.change.object.locationmeterid;
  //istanbul ignore if
  if (page.state.hasErrorMsgArr) {
  // istanbul ignore if
    if (page.state.hasErrorMsgArr.length > 0) {
      page.state.hasErrorMsgArr.forEach((item) => {
        if ((item.meterid === meterid) && item.hasError === false) {
          item.hasError = true;
        } else {
          page.state.hasErrorMsgArr.push({"meterid": meterid , "hasError" : true});
        }
      });
    } else {
      page.state.hasErrorMsgArr.push({"meterid": meterid, "hasError" : true});
    }
  }
  
  await enableDisableSaveBtn(page);
};

/**
 * Remove the reading error
 * @param  {changeObj} changeObj current object
 * @param  {page} page current page object
 */
 const popMeterReadingErrors = async(changeObj, page) => {
  let meterid = changeObj.change.object.assetmeterid || changeObj.change.object.locationmeterid;
  // istanbul ignore if
  if (page.state.hasErrorMsgArr) {
    if (page.state.hasErrorMsgArr.length > 0) {
      page.state.hasErrorMsgArr.forEach((item) => {
        if ((item.meterid === meterid) && item.hasError === true) {
          item.hasError = false;
        }
      });
    } else {
      page.state.hasErrorMsgArr.push({"meterid": meterid, "hasError" : false});
    }
  }
  
  await enableDisableSaveBtn(page);
};

/**
 * Method to enable or disable the save button
 * @param  {page} page current page object
 */
 const enableDisableSaveBtn = async(page) => {
  if (page.state.hasErrorMsgArr && page.state.hasErrorMsgArr.length > 0) {
    page.state.hasAnyReadingError = page.state.hasErrorMsgArr.some((item) => (item.hasError));
  }
  
  if (page.state.invalidDateTime || page.state.hasAnyReadingError) {
    page.state.disableSave = true;
  } else {
    page.state.disableSave = false;
  }
};

/**
 * 
 * @param {*} workorder item passed to method to do all necessary calculation  
 * @returns cost object of workorder including tasks
 */
const computedEstTotalCost = (item) => {
  let woActivityLength = item.woactivity?.length;
  let newData = {
    estintlabcost: item.estintlabcost || 0,
    estintlabhrs: item.estintlabhrs || 0,
    estlabhrs: item.estlabhrs || 0,
    estmatcost: item.estmatcost || 0,
    estoutlabcost: item.estoutlabcost || 0,
    estoutlabhrs: item.estoutlabhrs || 0,
    estservcost: item.estservcost || 0,
    esttoolcost: item.esttoolcost || 0
  }
  if(item.woactivity?.length) {
    while(woActivityLength--) {
      newData.estintlabcost += parseFloat(item.woactivity[woActivityLength].estintlabcost);
      newData.estintlabhrs += parseFloat(item.woactivity[woActivityLength].estintlabhrs);
      newData.estlabhrs += parseFloat(item.woactivity[woActivityLength].estlabhrs);
      newData.estmatcost += parseFloat(item.woactivity[woActivityLength].estmatcost);
      newData.estoutlabcost += parseFloat(item.woactivity[woActivityLength].estoutlabcost);
      newData.estoutlabhrs += parseFloat(item.woactivity[woActivityLength].estoutlabhrs);
      newData.estservcost += parseFloat(item.woactivity[woActivityLength].estservcost);
      newData.esttoolcost += parseFloat(item.woactivity[woActivityLength].esttoolcost);
    }
  }
  const estimatedcost = {
    intlbrhrs: newData.estintlabhrs.toFixed(2),
    extlbrhrs: newData.estoutlabhrs.toFixed(2),
    intlbrcost: newData.estintlabcost.toFixed(2),
    extlbrcost: newData.estoutlabcost.toFixed(2),
    servicecost: parseFloat(newData.estservcost).toFixed(2),
    toolcost: parseFloat(newData.esttoolcost).toFixed(2),
    materialcost: parseFloat(newData.estmatcost).toFixed(2),
    totallbrhrs: parseFloat(newData.estintlabhrs + newData.estoutlabhrs).toFixed(2),
    totallbrcost: parseFloat(newData.estintlabcost + newData.estoutlabcost).toFixed(2),
    totalcost: (newData.estservcost + newData.esttoolcost + newData.estmatcost + newData.estintlabcost + newData.estoutlabcost).toFixed(2)
  };
  return estimatedcost;
}

const functions = {
  openEnterReadingDrawer,
  saveMeterReadings,
  getAssetName,
  getLocationName,
  openMeterLookup,
  validateMeterReadings,
  computedReading,
  closeUpdateMeterDialog,
  validateMeterDate,
  validateMeterTime,
  onSaveDataFailed,
  getOnlyDatePart,
  openWOHazardDrawer,
  reviewSafetyPlan,
  pushMeterReadingErrors,
  popMeterReadingErrors,
  enableDisableSaveBtn,
  computedEstTotalCost
};

let saveDataSuccessful = false;

export default functions;
