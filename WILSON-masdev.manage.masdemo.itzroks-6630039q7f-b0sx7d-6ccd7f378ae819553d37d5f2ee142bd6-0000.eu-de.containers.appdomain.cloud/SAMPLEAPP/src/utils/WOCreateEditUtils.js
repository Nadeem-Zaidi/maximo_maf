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
 * Return the valid asset or location
 * @param {app} is application object
 * @param {ds} is database name
 * @param {key} is attribute to be filtered
 * @param value is key value
 */
const getAssetOrLocation = async (app, ds, key, value) => {
  let lookupDs = app.findDatasource(ds);
  await lookupDs.initializeQbe();
  lookupDs.setQBE(key, "=", value);
  if (app.client){
    lookupDs.setQBE("siteid", "=", app.client.userInfo.defaultSite);
  }
  let items = await lookupDs.searchQBE();
  /* istanbul ignore else  */
  if (items.length <= 1) {
    await clearSearch(lookupDs);
  }
  return items;
};

/**
 * clear the ds search;
 * @param {ds} is database name
 */
const clearSearch = async (ds) => {
  /* istanbul ignore else  */
  if (ds && ds.lastQuery.qbe && JSON.stringify(ds.lastQuery.qbe) !== "{}") {
    ds.clearQBE();
    await ds.searchQBE(undefined, true);
  }
}

/**
 * validate GLAccount on Asset/location selection prompt bmx message 
 * when location's glaccount is different
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 * @param {action} string for comparison
 */
const validateGlAccount = (app, page, ds, item, action) => {
  if (
    ds.item.glaccount &&
    (item.locglaccount || item.glaccount) &&
    ds.item.glaccount !== (item.locglaccount || item.glaccount)
  ) {
    page.state.selectedItem = { action: action, item: item };
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "glConflictBmxLabel",
      "The location and asset combination you entered has different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination?"
    );
    /* istanbul ignore next  */
    window.setTimeout(() => {
      page.showDialog("sysMsgDialog_" + page.name);
    }, 100);
  } else {
    return true;
  }
}

/**
 * validate location on Asset/location selection prompt bmx message 
 * when location's glaccount is different
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 */
const validateLocation = (app, page, ds, item) => {
  if (
    (ds.item.location || ds.item.locationnum) &&
    item.location &&
    ((ds.item.location || ds.item.locationnum) !== item.location)
  ) {
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "assetConflictBmxLabel",
      `The specified asset is not in the current location. Do you want to update the location with this  asset's location - ${
        item.location || /* istanbul ignore next */""
      }?`,
      [item.location || /* istanbul ignore next */""]
    );
    page.state.selectedItem = { action: "SETASSET", item: item };
    page.showDialog("sysMsgDialog_" + page.name);
  } else {
    return true;
  }
}

/**
 * validate asset on Asset/location selection prompt bmx message 
 * when location's glaccount is different
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 */
const validateAsset = (app, page, ds, item) => {
  if (ds.item.assetnum && item.asset && item.asset.length === 1) {
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "locationConflictUpdateAssetBmxLabel",
      `The specified location does not contain the current asset. Do you want to update the asset with the asset that is in this new location - ${
        item.asset[0].assetnum || /* istanbul ignore next */""
      }?`,
      [item.asset[0].assetnum || /* istanbul ignore next */""]
    );
    page.state.selectedItem = { action: "SETLOCATION", item: item };
    page.showDialog("sysMsgDialog_" + page.name);
  } else {
    return true;
  }
}

/**
 * Setting priority and failure code.
 * @param {app} is application object
 * @param {ds} dsWoedit/dsCreateWo
 */
const setPriorityFailureCode = async (app, ds) => {
  let priority = "";
  let failureCode = "";
  let failureDesc = "";
  let failureList = ""
  let assetData;
  let locationData;
  /* istanbul ignore else  */
  if(ds && ds.item && ds.item.assetnum) {
    await resetDataSource(app, 'assetLookupDS');
    assetData = await getAssetOrLocation(
      app,
      "assetLookupDS",
      "assetnum",
      ds.item.assetnum
    );
  }
  /* istanbul ignore else  */
  if(assetData && assetData.length) {
    /* istanbul ignore else  */
    if(assetData[0].priority) {
      priority = assetData[0].priority
    }
    /* istanbul ignore else  */
    if(assetData[0].failurecode) {
      failureCode = assetData[0].failurecode
    }
    if(assetData[0].failurelist && assetData[0].failurelist.length) {
      failureList = assetData[0].failurelist[0].failurelist;
      failureDesc = (assetData[0].failurelist[0].failurecode && assetData[0].failurelist[0].failurecode.description) ? assetData[0].failurelist[0].failurecode.description : ''
    }
  }
  /* istanbul ignore else  */
  if(ds && ds.item && (ds.item.location || ds.item.locationnum) && (!priority || !failureCode)) {
    await resetDataSource(app,'locationLookupDS');
    locationData = await getAssetOrLocation(
      app,
      "locationLookupDS",
      "location",
      ds.item.location || ds.item.locationnum
    );
  }
  
  /* istanbul ignore else  */
  if(locationData && locationData.length) {
    /* istanbul ignore else  */
    if(locationData[0].locpriority && !priority) {
      priority = locationData[0].locpriority
    }
    /* istanbul ignore else  */
    if(locationData[0].failurecode && !failureCode) {
      failureCode = locationData[0].failurecode
    }
    /* istanbul ignore else  */
    if(!failureList && locationData[0].failurelist && locationData[0].failurelist.length) {
      failureList = locationData[0].failurelist[0].failurelist;
      failureDesc = (locationData[0].failurelist[0].failurecode && locationData[0].failurelist[0].failurecode.description) ? locationData[0].failurelist[0].failurecode.description : ''
    }
  }
  /* istanbul ignore else  */
  if(ds && ds.item) {
    /* istanbul ignore else */
    if(priority) {
      ds.item.assetlocpriority = priority;
    }
    /* istanbul ignore else */
    if(failureCode) {
      ds.item.failurecode = failureCode;
    }

    /* istanbul ignore else  */
    if(failureList) {
      ds.item['failuredescription'] = failureDesc;
      ds.item['failurelistid'] = failureList
    }
  }
}

/**
 * setting assetNum, priority, failurecode and location
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 */
const setAsset = (app, page, ds, item) => {
  let validAsset = page.state.isMobile ? validateGlAccount(app, page, ds, item, "SETASSETGL") : true;
  /* istanbul ignore else  */
  if (validAsset) {
    ds.item.assetnum = item.assetnum;
    ds.item.assetdesc = item.description;
    /* istanbul ignore else  */
    if (item.location) {
      if (page.name === "woedit" && (!ds.item.locationnum || page.state.isMobile )) {
        ds.item.locationnum = item.location;
      } else if (page.name === "createwo" && (!ds.item.location ||  page.state.isMobile )) {
        ds.item.location = item.location;
      }
      ds.item.locationdesc = item.locationdesc;
      /* istanbul ignore else  */
      if(page.state.isMobile || ((ds.item.locationnum === item.location && page.name === "woedit") || (ds.item.location === item.location && page.name === "createwo"))) {
        setGLAccount(app, page, ds, item);
      }
    }
  }
}

/**
 * Setting glaccount
 * @param {app} application object
 * @param {page} current page object
 * @param {ds} dsWoedit/dsCreateWo
 * @param {item} location/asset item
 * @param {action} on the basis of action set asset/location
 */
const setGLAccount = (app, page, ds, item, action) => {
  ds.item.glaccount = item.locglaccount || item.glaccount;
  /* istanbul ignore else  */
  if (action === "SETASSETGL") {
    setAsset(app, page, ds, item);
  } else if (action === "SETLOCGL") {
    setLocation(app, page, ds, item);
  }
}

/**
 * Setting location, priority, glaccount and failureCode after validating glAccount.
 * @param {app} application object
 * @param {page} current page object
 * @param {ds} dsWoedit/dsCreateWo
 * @param {item} location item
 */
const setLocation = (app, page, ds, item) => {
  let validGLAccount = page.state.isMobile ? validateGlAccount(app, page, ds, item, "SETLOCGL") : true;
  /* istanbul ignore else  */
  if (validGLAccount) {
    if(page.name === 'woedit') {
      ds.item.locationnum = item.location;
    } else {
      ds.item.location = item.location;
    }
    ds.item.locationdesc = item.description;
    /* istanbul ignore else  */
    if(page.name !== 'woedit' || page.state.isMobile) {
      setGLAccount(app, page, ds, item);
    }
    /* istanbul ignore next  */
    if (
      (!ds.item.assetnum && item.asset && item.asset.length === 1) ||
      (item.asset && item.asset.length === 1 && page.state.isMobile)
    ) {
      ds.item.assetnum = item.asset[0].assetnum;
      ds.item.assetdesc = item.asset[0].description;
    } else if (ds.item.assetnum && item.asset && item.asset.length > 1) {
      ds.item.assetnum = "";
      ds.item.assetdesc = "";
    }
  }
}

 /**
   * Open Log Type Lookup from WorkLog
   */
  const openWorkLogTypeLookup = async (page,ds,lookup) =>{
    ds.clearState();
    await ds.initializeQbe();
    ds.setQBE('domainid', '=', 'LOGTYPE');
    await ds.searchQBE();

    let selectedItem;
    let defaultType = page.state.initialDefaultLogType;

    if (defaultType) {
      selectedItem = ds.items.filter((item => defaultType.replace(/!/g, "") === item.value));
    }

    /* istanbul ignore else  */
    if (selectedItem && selectedItem[0]) {
      ds.setSelectedItem(selectedItem[0], true);
    }
    page.showDialog(lookup);
  }

  const resetDataSource = async (app, ds) => {
    let datasource = app.findDatasource(ds);
    await datasource.reset(datasource.baseQuery);
  };

const functions = {
  getAssetOrLocation,
  validateGlAccount,
  validateLocation,
  validateAsset,
  setPriorityFailureCode,
  setAsset,
  setGLAccount,
  setLocation,
  openWorkLogTypeLookup,
  clearSearch,
  resetDataSource
};

export default functions;
