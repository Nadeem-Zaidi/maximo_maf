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

import AssetListPageController from "./AssetListPageController";
import {Application,Page,JSONDataAdapter,Datasource, Device} from "@maximo/maximo-js-api";
import { Browser } from "@maximo/maximo-js-api/build/device/Browser";
import assetitem from "./test/asset-list-json-data.js";
import assetmetersdata from "./test/assetmeter-json-data.js";
import AssetDetailsPageController from "./AssetDetailsPageController";

function newDatasource(data, name) {
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

it("should load Asset List Page list data", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new AssetListPageController();
  const app = new Application();
  const page = new Page({ name: "page" });
  const page1 = new Page({ name: "assetList" });

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
  const assetListDS = newDatasource(assetitem, "assetListDS");
  app.registerDatasource(assetListDS);
  const activeAssetListDS = newDatasource(assetitem, "activeAssetListDS");
  app.registerDatasource(activeAssetListDS);
  const newAssetListDS = newDatasource(assetitem, "newAssetListDS");
  app.registerDatasource(newAssetListDS);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  page.state.firstLogin = false;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(assetListDS.dataAdapter.itemCount).not.toBe(0);

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
  expect(assetListDS.dataAdapter.itemCount).not.toBe(0);

  page.state.firstLogin = false;
  page.state.selectedSwitch = 1;
  controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  expect(assetListDS.dataAdapter.itemCount).not.toBe(0);
});

it("Hide/show Get Asset List button from the Asset list page", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new AssetListPageController();
  const app = new Application();
  const page = new Page({ name: "page" });

  app.client = {
    userInfo: {
      personid: "SAM",
      labor: {
        laborcode: "SAM",
      },
      user: { logouttracking: { attemptdate: "2022-03-09T09:03:16+05:30" } },
    },
  };

  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let firstLoginData = {
    date: undefined,
    isFirstLogIn: undefined,
  };
  Browser.get().storeJSON("FirstLoginData", firstLoginData, false);
  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(true);

  firstLoginData = {
    date: "2023-03-09T09:03:16+05:30",
  };
  Browser.get().storeJSON("FirstLoginData", firstLoginData, false);

  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(false);

  firstLoginData = {
    date: "2021-03-09T09:03:16+05:30",
  };
  Browser.get().storeJSON("FirstLoginData", firstLoginData, false);
  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(true);
});

it('asset card item click should send user to asset details page', async () => {
  let mockSetPage = jest.fn();
  const controller = new AssetListPageController();
  const assetDetailsPagecontroller = new AssetDetailsPageController();
  const app = new Application();

  const page = new Page();
  const assetDetailsPage = new Page({name: 'assetDetails'});

  app.registerController(controller);
  assetDetailsPage.registerController(assetDetailsPagecontroller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  app.currentPage = assetDetailsPage;

  controller.pageInitialized(page, app);

  controller.showAssetDetail({assetnum: 11430, description: 'assettest'});
  expect(mockSetPage.mock.calls.length).toEqual(1);
  expect(mockSetPage.mock.calls[0][0].name).toEqual('assetDetails');
  expect(mockSetPage.mock.calls[0][0].resetScroll).toEqual(true);

  controller.showAssetDetail({assetnum: 11430});
  expect(mockSetPage.mock.calls[0][0].name).toEqual('assetDetails');
});

it('asset card item click should not send user to asset details page', async () => {
  let mockSetPage = jest.fn();
  const controller = new AssetListPageController();
  const assetDetailsPagecontroller = new AssetDetailsPageController();
  const app = new Application();

  const page = new Page();
  const assetDetailsPage = new Page({name: 'assetDetails'});

  app.registerController(controller);
  assetDetailsPage.registerController(assetDetailsPagecontroller);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  app.currentPage = assetDetailsPage;

  controller.pageInitialized(page, app);

  controller.showAssetDetail();
  expect(mockSetPage.mock.calls.length).toEqual(0);

});


it("should open meter sliding drawer page", async () => {
  let mockedFn = jest.fn();
  global.open = jest.fn();

  const controller = new AssetListPageController();
  const app = new Application();
 
  const page = new Page({ name: "assetList" }); 
  app.registerPage(page);
  app.registerController(controller);
  const ds1 = newDatasource(assetitem, "assetListDS"); 
  const ds = newDatasourceDummy(assetitem, "assetListDummyDS");  
  const activeAssetListDS = newDatasource(assetitem, "activeAssetListDS");
  app.registerDatasource(activeAssetListDS);
  const newAssetListDS = newDatasource(assetitem, "newAssetListDS");
  app.registerDatasource(newAssetListDS);
  app.registerDatasource(ds);
  app.registerDatasource(ds1);
  const assetmetersdatasource = newDatasourceAssetMeter(assetmetersdata, 'assetmetersdata');
  
  app.registerDatasource(assetmetersdatasource); 
  app.initialize(); 
  controller.pageInitialized(page, app);
  page.showDialog = mockedFn;
  await controller.openMeterDrawer({item: {href: "oslc/os/mxapiasset/_MTMxNzAvMC9HVUFSRCBSQUlML0JFREZPUkQ-"}, datasource: ds});
  expect(page.showDialog.mock.calls.length).toEqual(1); 

});


it('Should return asset name with description', async () => {
  const controller = new AssetListPageController();
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

it('should set padding of Asset list on talet on map view', async () => {
  const controller = new AssetListPageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});

  app.registerController(controller);
  await app.initialize();
  let device = Device.get();
  device.isTablet = true;

  controller.pageInitialized(page, app);
  expect(page.state.mapPaddingRight).toEqual('1rem');
  expect(page.state.mapPaddingLeft).toEqual('0.5rem');
  expect(page.state.mapAssetListHeight).toEqual('25%');
});

it('should set bottom of Asset list on mobile on map view', async () => {
  const controller = new AssetListPageController();
  const app = new Application();
  const page = new Page({name: 'schedule'});

  app.registerController(controller);
  await app.initialize();
  let device = Device.get();

  controller.pageInitialized(page, app);
  expect(page.state.mapPaddingBottom).toEqual('calc(100vh - 9rem)');

  device.isMaximoMobile = true;
  controller.pageInitialized(page, app);
  expect(page.state.mapPaddingBottom).toEqual('calc(100vh - 5rem)');
});

it('should validate handleMapLongPress', async () => {
  const controller = new AssetListPageController();
  const app = new Application();
  const page = new Page({name: 'page'});

  app.registerController(controller);
  app.registerController(controller);
  app.client = {
    userInfo: {
      personid: "SAM",     
      },
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  };
  await app.initialize();
  let data = {
    coordinate: [12.1212121212,12.1212121212],
  };
  controller.pageInitialized(page, app);
  controller.handleMapLongPress(data);
  controller.goToCreateAssetPage();
  expect(app.state.currentMapData.coordinate).not.toBe(undefined);
});



