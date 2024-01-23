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

import AssetDetailsPageController from "./AssetDetailsPageController";
import {Application,Page,JSONDataAdapter,Datasource,Device} from "@maximo/maximo-js-api";
import { Browser } from "@maximo/maximo-js-api/build/device/Browser";
import assetitem from "./test/asset-list-json-data.js";
import assetmetersdata from "./test/assetmeter-json-data.js";
import assetStatusListData from "./test/asset-status-list-json-data";
import location from "./test/location-json-data";
import failureCode from "./test/failureCode-list-json-data";
import synonymData from "./test/synonym-db-json-data";
import manufacture from "./test/manufacture-list-json-data";
import vendor from "./test/vendor-list-json-data";
import sinon from 'sinon';
import assetSpecItems from "./test/asset-spec-json-data";
import assetAttributedata from "./test/assetAttribute-json-data";
import assetSpecCombinedData from "./test/asset-combiedSpec-json-data";
import assetSpecLookupItems from "./test/asset-spec-lookup-json-data";

function newAssetSpecCombinedDatasource(
  data = assetSpecCombinedData,
  items = "member",
  idAttribute = "assetattrid",
  name = "newAssetSpecCombinedDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

function newAssetAttributeDatasource(
  data = assetAttributedata,
  items = "member",
  idAttribute = "assetattrid",
  name = "newAssetAttributeDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

function newAssetSpecDatasource(
  data = assetSpecItems,
  items = "member",
  idAttribute = "classstructureid",
  name = "newAssetSpecDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

function newDatasource(
  data = assetitem,
  items = "member",
  idAttribute = "assetnum",
  name = "assetDetailsDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

function newDatasourceAssetsys(data, name) {
  const da = new JSONDataAdapter({
      src: data,
      items: "member",
    });
    const ds = new Datasource(da, {
      idAttribute: "assetnum",
      name: name,
    });
  
    return ds;
  }

function assetDetailDataSource(data, name = "assetDetailsDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: "assetnum",
    name: name,
  });

  return ds;
}


function newDatasourceAssetMeter(data = assetmetersdata, name = 'assetmetersdata') {
  const da = new JSONDataAdapter({
    src: assetmetersdata,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}


function newDatasourceAssetSpec(data = assetSpecItems, name = 'assetSpecItems') {
  const da = new JSONDataAdapter({
    src: assetSpecItems,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

function newAssetSpecLookUpDS(data, name = 'alndomainData') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

function newDatasourceDummy(
  data = assetitem,
  items = "member",
  idAttribute = "assetnum",
  name = "assetListDummyDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}
function newDatasourceAssetStatusList(data = assetStatusListData, name = 'assetStatusListData') {
  const da = new JSONDataAdapter({
    src: assetStatusListData,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}


function newDatasourceServiceAddress(
  data = assetitem,
  items = "member",
  idAttribute = "assetnum",
  name = 'serviceAddressDS'
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

function newDatasourceNewSRAddress(
  data = assetitem,
  items = "member",
  idAttribute = "assetnum",
  name = 'newServiceAddressDS'
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

it("it should fill up asset detail fields using setDetailTextWithCodeAndDesc function", async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  const ds = assetDetailDataSource(assetitem, 'assetDetailsDS');
  page.params = { href: 'oslc/os/mxapiasset/_MTAwOC9CRURGT1JE' }

  const synoData = assetDetailDataSource(synonymData, 'synonymdomainData');
  sinon.stub(synoData, 'initializeQbe').returns(true);
  sinon.stub(synoData, 'searchQBE').returns([synonymData.member[0]]);
  sinon.stub(synoData, 'setQBE').returns(true);

  const manufacturerDS = assetDetailDataSource(manufacture, 'dsManufacture');
  sinon.stub(manufacturerDS, 'initializeQbe').returns(true);
  sinon.stub(manufacturerDS, 'searchQBE').returns([manufacture.member[0]]);
  sinon.stub(manufacturerDS, 'setQBE').returns(true);

  const vendorDS = assetDetailDataSource(vendor, 'dsVendor');
  sinon.stub(vendorDS, 'initializeQbe').returns(true);
  sinon.stub(vendorDS, 'searchQBE').returns([vendor.member[0]]);
  sinon.stub(vendorDS, 'setQBE').returns(true);

  const locationDs = assetDetailDataSource(location, 'locationLookupDS');
  sinon.stub(locationDs, 'initializeQbe').returns(true);
  sinon.stub(locationDs, 'searchQBE').returns([location.member[0]]);
  sinon.stub(locationDs, 'setQBE').returns(true);

  const failureList = assetDetailDataSource(location, 'dsFailureList');
  sinon.stub(failureList, 'initializeQbe').returns(true);
  sinon.stub(failureList, 'searchQBE').returns([failureCode.member[0]]);
  sinon.stub(failureList, 'setQBE').returns(true);

  const serviceAddressLisDs = newDatasourceServiceAddress(assetitem, 'serviceAddressDS');
  sinon.stub(serviceAddressLisDs, 'getItems').returns([
    {
      latitudey: 20,
      longitudex: 40
    }
  ]);
  page.registerDatasource(serviceAddressLisDs);
  
  page.registerDatasource(ds);
  page.registerDatasource(synoData);
  page.registerDatasource(manufacturerDS);
  page.registerDatasource(vendorDS);
  page.registerDatasource(locationDs);
  page.registerDatasource(failureList);

  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "assetDetails" };
  await app.initialize();
  await ds.load();
  
  controller.pageResumed();

  await controller.loadData();
  expect(page.state.assetType).toEqual("NULL  No Timer is being used for this Labor Transaction");
  expect(page.state.latitudey).toBe(true);
});

it("should load Asset Details page data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "page"});
  const page1 = new Page({ name: "assetDetailsDS"});

  app.state = {
    incomingContext: {
      breadcrumb: {
        enableReturnBreadcrumb: true,
      },
    },
    screen: {
      size: "sm",
    },
  };


  app.registerPage(page1);
  app.registerController(controller);
  const assetDetailsDS = newDatasource(assetitem, "assetDetailsDS");
  const assetSpecificationDS = newDatasourceAssetMeter(assetitem, "assetSpecificationDS");
  
  app.registerDatasource(assetDetailsDS);
  app.registerDatasource(assetSpecificationDS);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  page.params={href : "oslc/os/mxapiasset/_MTAwOC9CRURGT1JE"};
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  page.state.firstLogin = false;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(assetDetailsDS.dataAdapter.itemCount).not.toBe(0);

  let firstLoginData = {
    date: undefined,
    isFirstLogIn: undefined,
  };
  Browser.get().storeJSON("FirstLoginData", firstLoginData, false);
  page.state.firstLogin = true;
  page.state.selectedSwitch = 0;
  app.state.networkConnected = true;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(assetDetailsDS.dataAdapter.itemCount).not.toBe(0);

  page.state.firstLogin = false;
  page.state.selectedSwitch = 1;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(assetDetailsDS.dataAdapter.itemCount).not.toBe(0);
  expect(assetSpecificationDS.dataAdapter.itemCount).not.toBe(0);
});

it("should open meter sliding drawer page", async () => {
  let mockedFn = jest.fn();
  global.open = jest.fn();

  const controller = new AssetDetailsPageController();
  const app = new Application();
 
  const page = new Page({ name: "assetList" }); 
  app.registerPage(page);
  app.registerController(controller);
  const ds1 = newDatasource(assetitem, "assetListDS"); 
  const ds = newDatasourceDummy(assetitem, "assetListDummyDS");  
  app.registerDatasource(ds);
  app.registerDatasource(ds1);
  const assetmetersdatasource = newDatasourceAssetMeter(assetmetersdata, 'assetmetersdata');
  
  app.registerDatasource(assetmetersdatasource); 
  app.initialize(); 
  controller.pageInitialized(page, app);

  await ds.load();
  page.showDialog = mockedFn;

  await controller.openMeterdetailDrawer({item: {href: "oslc/os/mxapiasset/_MTMxNzAvMC9HVUFSRCBSQUlML0JFREZPUkQ-"}, datasource: ds});
  expect(page.showDialog.mock.calls.length).toEqual(1); 
});

it('Should return asset name with description', async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({name: 'assetList'});
  app.registerPage(page);
   const ds = newDatasource(assetitem, "assetListDS");
  page.registerDatasource(ds);
  await app.initialize();
 
  
  let item = {
    description: "Fire Extinguisher", 
    assetnum: "11430"
  } 
  let header = controller.getAssetName(item);  
 
  expect(header).toEqual("11430 Fire Extinguisher");
  item = {    
    assetnum: "11430"
  } 
  header = controller.getAssetName(item);  
  expect(header).toEqual("11430");
 
});

it('edit item click should send user to edit asset details page', async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: 'assetDetails' });
  const ds = newDatasource(assetitem, "assetDetailsDS");
  page.registerDatasource(ds);
  app.registerPage(page);

  await app.initialize();
  expect(app).toBeDefined();

  controller.pageInitialized(page, app);

  let mockSetPage = jest.fn();
  app.currentPage = 'assetDetails';
  app.setCurrentPage = mockSetPage;
  
  const event = {
    item: {
      assetnum: "1234",
      href: "oslc/dsddssdd"
    }
  }
  controller.openAssetEditPage(event);
  expect(mockSetPage.mock.calls.length).toEqual(1);
  expect(mockSetPage.mock.calls[0][0].name).toEqual('editasset');
  expect(mockSetPage.mock.calls[0][0].resetScroll).toEqual(true);
});

it('mock methods and set state of location and address', async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "assetDetailsDS"});

  
  const assetDetailsDS = newDatasource(assetitem, "assetDetailsDS");
  const assetSpecificationDS = newDatasourceAssetMeter(assetitem, "assetSpecificationDS");

  app.registerDatasource(assetDetailsDS);
  app.registerDatasource(assetSpecificationDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  await assetDetailsDS.load();
  

  app.setCurrentPage = mockSetPage;
  page.params={href : "oslc/os/mxapiasset/_MTAwOC9CRURGT1JE"};
  controller.pageInitialized(page, app);
  let assetDetail = {item:assetitem.member[1]};

  await controller.setAddressData(assetDetail);
  expect(page.state.serviceAddress).toBeDefined();

  assetDetail.item.serviceaddress = null;
  await controller.setAddressData(assetDetail);
  expect(page.state.serviceAddress).toBe("");
});

it("should open asset status sliding drawer", async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  let mockedFn = jest.fn();
  const synonymDS = newDatasourceAssetsys(assetStatusListData, 'synonymdomainData');
  const assetstatusListDS = newDatasourceAssetsys(assetStatusListData, 'assetStatusList');
  const ds = newDatasource(assetitem, 'assetDetailsDS');
  sinon.stub(synonymDS, 'initializeQbe').returns(true);
  sinon.stub(synonymDS, 'searchQBE').returns([assetStatusListData.member[0]]);
  sinon.stub(synonymDS, 'setQBE').returns(true);
  page.registerDatasource(synonymDS);
  page.registerDatasource(assetstatusListDS);
  page.registerDatasource(ds);
  page.showDialog = mockedFn;
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  await controller.openAssetStatusList({item: {href: "oslc/os/mxapiasset/_TE9DQVNTRVRTVEFUVVMvT1BFUkFUSU5HL35OVUxMfi9_TlVMTH4vQUNUSVZF"}, datasource: synonymDS});
  expect(page.showDialog.mock.calls.length).toEqual(1);
});

it('on selecting the status', async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  const ds = newDatasource(assetitem, 'dsCreateAsset');

  const dsstatusList = newDatasourceAssetsys(assetStatusListData, 'synonymdomainData');
  sinon.stub(dsstatusList, 'initializeQbe').returns(true);
  sinon.stub(dsstatusList, 'searchQBE').returns([]);
  sinon.stub(dsstatusList, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(dsstatusList);
  app.registerController(controller);
  page.state = {
    selectedStatus: "Not Ready",
  };
  app.registerPage(page);
  await app.initialize();
  await ds.load();

  let itemSelected = {
    value: "ACTIVE",
    _selected: true
  }
  await controller.selectStatus(itemSelected);
  expect(page.state.selectedStatus).toBe("ACTIVE");

  itemSelected = {
    value: "ACTIVE",
    _selected: false
  }
  await controller.selectStatus(itemSelected);
  expect(page.state.selectedStatus).toBe("");
});

it("should change status and close drawer", async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  let mockedFn = jest.fn();

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  sinon.stub(ds, 'invokeAction');
  sinon.stub(ds, 'forceReload');
  page.registerDatasource(ds);

  page.findDialog = mockedFn;
  
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  page.state = {
    selectedStatus: "ACTIVE",
    statusLoading: true
  };

  controller.changeStatus();
  expect(page.state.statusLoading).toBe(true);
});

it("should update location", async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application({
    geolocation: {
      state: {
        longitude: 0,
        latitude: 0
      }
    }});
  const page = new Page({ name: "assetDetails" });


  const dummyServiceAddress = [{
    addresscode: 12,
    longitudex: 13,
    latitudey: 25
  }]

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  sinon.stub(ds, 'invokeAction');
  sinon.stub(ds, 'forceReload');
  page.registerDatasource(ds);


  const ds1 = newDatasourceServiceAddress(assetitem, 'serviceAddressDS');
  sinon.stub(ds1, 'getItems').returns(dummyServiceAddress);
  page.registerDatasource(ds1);


  const ds2 = newDatasourceNewSRAddress(assetitem, 'newServiceAddressDS');
  sinon.stub(ds2, 'addNew').returns(dummyServiceAddress);
  page.registerDatasource(ds2);

  const assetSpecificationDS = newDatasource(assetitem, "assetSpecificationDS");
  sinon.stub(assetSpecificationDS, 'getItems').returns(dummyServiceAddress);
  app.registerDatasource(assetSpecificationDS);


  app.registerController(controller);
  app.registerPage(page);
  
  await app.initialize();

  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }
  }

  app.geolocation.state.longitude = 10
  app.geolocation.state.latitude = 15;
  
  controller.captureLocation({ item: 'dummyItem', datasource: ds });
  expect(page.state.locationavailable).toBe(true);
});


it("should capture new location", async () => {
  const controller = new AssetDetailsPageController();
  const app = new Application({
    geolocation: {
      state: {
        longitude: 0,
        latitude: 0
      }
    }});
  const page = new Page({ name: "assetDetails" });


  const dummyServiceAddress = [{
    addresscode: 12,
    longitudex: 13,
    latitudey: 25
  }]

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  sinon.stub(ds, 'invokeAction');
  sinon.stub(ds, 'forceReload');
  page.registerDatasource(ds);

  const ds1 = newDatasourceServiceAddress(assetitem, 'serviceAddressDS');
  sinon.stub(ds1, 'getItems').returns([]);
  page.registerDatasource(ds1);

  const ds2 = newDatasourceNewSRAddress(assetitem, 'newServiceAddressDS');
  sinon.stub(ds2, 'addNew').returns(dummyServiceAddress);
  page.registerDatasource(ds2);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  page.state = {
    isMobile: true,
  };

  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }
  }

  app.geolocation.state.longitude = 10
  app.geolocation.state.latitude = 15;
  
  controller.captureLocation({ item: 'dummyItem', datasource: ds });
  expect(page.state.locationavailable).toBe(true);
});

it("should check the Datatype of specification", async () => {
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  const controller = new AssetDetailsPageController();

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  page.registerDatasource(ds);

  const assetSpecDS = newAssetSpecDatasource(assetSpecItems, 'newAssetSpecDS');
  sinon.stub(assetSpecDS, 'getItems').returns([]);
  page.registerDatasource(assetSpecDS);

  const assetSpecificationDS = newDatasourceAssetSpec(assetSpecItems, "assetSpecificationDS");
  page.registerDatasource(assetSpecificationDS);

  const assetAttributeDS = assetDetailDataSource(assetAttributedata, 'assetAttributeDS');
  sinon.stub(assetAttributeDS, 'getItems').returns(assetAttributedata.member);

  const assetSpecCombinedDS = newDatasourceAssetsys(assetSpecCombinedData, 'assetSpecCombinedDS');
  
  app.registerDatasource(assetSpecCombinedDS);
  app.registerDatasource(assetAttributeDS);
  
  app.registerPage(page);
  app.registerController(controller);
  await app.initialize();
  await assetSpecDS.load();
  await assetSpecificationDS.load();
  await assetAttributeDS.load();
  controller.pageInitialized(page, app);
  controller.openSpecificationDrawer();


  app.state = {
    specData: [{
      "useclassindesc": true,
      "hierarchypath": "PIPELINE",
      "classstructureid": "1004",
      "classificationdesc": "Oil & Gas Pipeline",
      "show": true,
      "description": "Oil & Gas Pipeline",
      "classspec": [
          {
              "assetattrid": "MATERIAL",
              "lineartype_description": "Start measure not equal to end measure",
              "lineartype_maxvalue": "LINEAR",
              "classstructureid": "1332",
              "applydownhier": false,
              "continuous": false,
              "assetattributeid": 16,
              "lineartype": "LINEAR",
              "href": null,
              "classspecid": 486,
              "domainid": "MATERIAL",
              "orgid": "EAGLENA"
          },
          {
              "assetattrid": "PRESSURE",
              "measureunitid": "PSI",
              "lineartype_description": "Start measure not equal to end measure",
              "lineartype_maxvalue": "LINEAR",
              "classstructureid": "1332",
              "applydownhier": false,
              "continuous": false,
              "assetattributeid": 338,
              "lineartype": "LINEAR",
              "href": null,
              "classspecid": 488
          }
      ],
      "classificationid": "PIPELINE",
      "classusewith": [
          {
              "objectname": "ASSET"
          },
          {
              "objectname": "FEATURES"
          }
      ],
      "_rowstamp": "48866",
      "href": "oslc/os/mxapitkclass/_MTMzMg--",
      "classstructureuid": 409,
      "haschildren": false,
      "_bulkid": "1332"
  },
   {
      "useclassindesc": true,
      "hierarchypath": "BREAKER",
      "classstructureid": "1322",
      "classificationdesc": "Substation Breaker",
      "show": true,
      "description": "Substation Breaker",
      "classspec": [
          {
              "assetattrid": "CAPACITY",
              "classstructureid": "1322",
              "applydownhier": false,
              "continuous": false,
              "assetattributeid": 9,
              "href": null,
              "classspecid": 418,
              "orgid": "EAGLENA"
          },
          
          {
              "assetattrid": "YEAR",
              "classstructureid": "1322",
              "applydownhier": false,
              "continuous": false,
              "assetattributeid": 106,
              "href": null,
              "classspecid": 420,
              "orgid": "EAGLENA"
          }
      ],
      "classificationid": "BREAKER",
      "classusewith": [
          {
              "objectname": "ASSET"
          }
      ],
      "_rowstamp": "48867",
      "href": "oslc/os/mxapitkclass/_MTMyMg--",
      "classstructureuid": 365,
      "haschildren": false,
      "_bulkid": "1322"
  }],
  };

  const item = { 
        "hierarchypath": "SEAL \\ OIL",
        "description": "Seal oil PUMP",
        "classstructure": {
          "hierarchypath": "SEAL \\ OIL",
          "classstructureid": "1004"
        }
    }
  

  await controller.checkDataType({item: item, datasource: assetAttributeDS});

});

it("Should save the specification", async () => {


  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  const controller = new AssetDetailsPageController();

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  page.registerDatasource(ds);

  const assetSpecDS = newAssetSpecDatasource(assetSpecItems, 'newAssetSpecDS');
  let updatedAssetSpec = {
    item : [
      {
          "assetattrid": "SIZE",
          "_rowstamp": "1594351",
          "localref": "oslc/os/mxapiasset/_MTE0NDAvQkVERk9SRA--/ASSETSPECCLASS/0-2259",
          "assetspecid": 2259,
          "classstructureid": "1001",
          "assetattributedesc": "Size",
          "displaysequence": 1,
          "href": "http://childkey#QVNTRVQvQVNTRVRTUEVDL1NJWkUvMTE0NDAvMC9_TlVMTH4vQkVERk9SRA--",
          "linearassetspecid": 0,
          "numvalue": 11,
          "_bulkid": "1594351",
          "datatype_maxvalue": "NUMERIC"
      }
  ]
  };
  assetSpecDS.currentItem = updatedAssetSpec.item;
  let savestub = sinon.stub(assetSpecDS, 'save').returns(true);
  sinon.stub(assetSpecDS, 'getItems').returns(assetSpecItems);

  page.registerDatasource(assetSpecDS);

  const assetSpecificationDS = newDatasourceAssetMeter(assetitem, "assetSpecificationDS");
  page.registerDatasource(assetSpecificationDS);

  const assetSpecCombinedDS = newDatasourceAssetsys(assetSpecCombinedData, 'assetSpecCombinedDS');
  sinon.stub(assetSpecCombinedDS, 'getItems').returns(assetSpecCombinedData.member);

  app.registerDatasource(assetSpecCombinedDS);
  
  app.registerPage(page);
  app.registerController(controller);
  
  await app.initialize();
  await assetSpecDS.load();
  await assetSpecificationDS.load();
  controller.pageInitialized(page, app);
  await controller.saveSpecification();

  

  window.setTimeout(() => {
    expect(savestub.called).toBe(true);
    expect(savestub.displayName).toBe('save');
  }, 500);

  Device.get().isMaximoMobile = false;
  window.setTimeout(() => {
    expect(savestub.called).toBe(true);
    expect(savestub.displayName).toBe('save');
  }, 500);
})

it("it should open Spec lookup dialog", async () => {
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  const controller = new AssetDetailsPageController();

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  page.registerDatasource(ds);

  const assetSpecLookupDS = newAssetSpecLookUpDS(assetSpecLookupItems, 'alndomainData');
  sinon.stub(assetSpecLookupDS, 'clearQBE').returns(true);
  sinon.stub(assetSpecLookupDS, 'initializeQbe').returns(true);
  sinon.stub(assetSpecLookupDS, 'searchQBE').returns(true);
  sinon.stub(assetSpecLookupDS, 'setQBE').returns(true);

  const numAssetSpecLookupDS = newAssetSpecLookUpDS(assetSpecLookupItems, 'numericDomainDS');
  sinon.stub(numAssetSpecLookupDS, 'clearQBE').returns(true);
  sinon.stub(numAssetSpecLookupDS, 'initializeQbe').returns(true);
  sinon.stub(numAssetSpecLookupDS, 'searchQBE').returns(true);
  sinon.stub(numAssetSpecLookupDS, 'setQBE').returns(true);

  const tableAssetSpecLookupDS = newAssetSpecLookUpDS(assetSpecLookupItems, 'tableDomainDS');
  sinon.stub(tableAssetSpecLookupDS, 'clearQBE').returns(true);
  sinon.stub(tableAssetSpecLookupDS, 'initializeQbe').returns(true);
  sinon.stub(tableAssetSpecLookupDS, 'searchQBE').returns(true);
  sinon.stub(tableAssetSpecLookupDS, 'setQBE').returns(true);

  app.registerDatasource(assetSpecLookupDS);
  app.registerDatasource(numAssetSpecLookupDS);
  app.registerDatasource(tableAssetSpecLookupDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  await app.initialize();
  
  let itemSelected = {
      "datatype_maxvalue": "NUMERIC"
  }
  await controller.openSpecLookup({
    item: itemSelected, page: {
      showDialog: () => {} 
    }
  });

  itemSelected = {
      "datatype_maxvalue": "ALN"
  }
  await controller.openSpecLookup({
    item: itemSelected, page: {
      showDialog: () => {} 
    }
  });

  expect(page.state.currentItem).toBe(itemSelected);

  itemSelected = {
    "datatype_maxvalue": "TABLE"
  }
  await controller.openSpecLookup({
    item: itemSelected, page: {
      showDialog: () => {} 
    }
  });

  expect(page.state.currentItem).toBe(itemSelected);
});

it("it should select arrtibute for spec", async () => {
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  const controller = new AssetDetailsPageController();

  const ds = newDatasource(assetitem, 'assetDetailsDS');
  page.registerDatasource(ds);

  const assetSpecCombinedDS = newDatasourceAssetsys(assetSpecCombinedData, 'assetSpecCombinedDS');
  sinon.stub(assetSpecCombinedDS, 'getItems').returns(assetSpecCombinedData.member);

  const assetSpecLookupDS = newAssetSpecLookUpDS(assetSpecLookupItems, 'alndomainData');
  sinon.stub(assetSpecLookupDS, 'clearQBE').returns(true);
  sinon.stub(assetSpecLookupDS, 'initializeQbe').returns(true);
  sinon.stub(assetSpecLookupDS, 'searchQBE').returns(true);
  sinon.stub(assetSpecLookupDS, 'setQBE').returns(true);

  app.registerDatasource(assetSpecCombinedDS);


  page.registerDatasource(assetSpecLookupDS);
  app.registerController(controller);
  
  page.state = {
    currentItem: {
      alnvalue: '',
      numvalue: '',
      tablevalue: ''
    },
  };
  
  app.registerPage(page);
  await app.initialize();
  
  let itemSelected = {
    value: 'Speed'
  }
  await controller.chooseAssetSpecDomain(itemSelected);
  expect(page.state.currentItem.alnvalue).toBe('Speed');

  itemSelected = {
    value: 3
  }
  await controller.chooseAssetSpecNumDomain(itemSelected);
  expect(page.state.currentItem.numvalue).toBe(3);

  itemSelected = {
    description: "AAAAA"
  }
  await controller.chooseAssetSpecTableDomain(itemSelected);
  expect(page.state.currentItem.tablevalue).toBe("AAAAA");
});