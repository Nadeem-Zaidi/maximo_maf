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
import newTestStub from './test/AppTestStub';
import mainPageData from './test/sr-mainpage-data.js'
import synonymData from './test/test-synonym-data.js'
import {Browser} from '@maximo/maximo-js-api/build/device/Browser';

async function getApp() {
  let initializeApp = newTestStub({
    currentPage: 'main',
    datasources: {
      srDS: {
        data: mainPageData
      },
      synonymdomainDS: {
        data: synonymData
      }
    },
    onNewApp: (app) => {
      app.client.systemProperties = {
        'sr.filter.site': '0',
        'sr.default.priority': '3',
        'sr.high.priority': '2'
      }
    }
  });
  let app = await initializeApp();
  app.client.userInfo = {
    defaultSite: "BEDFORD",
    personid: 'FITZ',
    displayname: "Fitz Cameron",
    primaryphone: "5582123456789",
    primaryemail: "fitzcam@srmobile.cn",
    location: {
      location:"PLANT-W1",
      siteid: "BEDFORD"
    }
  };
  // app.setCurrentPage = jest.fn();
  // app.currentPage.params = {
  //   href: "oslc/os/mxapisr/_U1IvMTAwOA--"
  // }
  return app;
}



it('should identify first user login', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  global.open = jest.fn();

  let firstLoginData = {
    date: undefined,
    isFirstLogIn: undefined
  }
  Browser.get().storeJSON('FirstLoginData', firstLoginData, false);
  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(true);

  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(false);

  firstLoginData = {
    date: '11/1/2020'
  }
  Browser.get().storeJSON('FirstLoginData', firstLoginData, false);
  controller.trackUserLogin(page);
  expect(page.state.firstLogin).toEqual(true);
});



it('add button click should send user to new request page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  await controller.openNewRequestPage();
});



it('card item click should send user to service request details', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }
  controller.showSRDetail(event);
});



it("should load completed and unsynced SR list data", async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  await controller.loadSRListData("completedrequests");
  await controller.loadSRListData("unsyncedrequests");
});



it("should be able to cancel SRs without related work orders", async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  
  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }

  await controller.showCancelSRdialog(event);
  await controller.cancelSR(event);

  //It will now enter logic to display error
  event.item.relatedwoexists = true;
  await controller.cancelSR(event);
});



it('should reset default state', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  controller.setDefaults();
  expect(page.state.selectedSwitch).toEqual(0);
});



it('should reload SRs if new usaved item exists in datasource', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);
  
  //Simulate that the newItems has something
  const srDS = app.findDatasource("srDS");
  srDS.__newItems = {
    item: srDS.item
  }

  //Call page resumed again to refresh items in datasource
  await controller.pageResumed(page);
});

it("should clear search when changing views on main list", async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];
  let srDS = app.findDatasource("srDS");

  srDS.clearState = jest.fn(() => srDS.state.currentSearch = "");

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  await controller.loadSRListData("activerequests");
  srDS.state.currentSearch = "TEST";
  await controller.loadSRListData("completedrequests");

  expect(srDS.clearState).toHaveBeenCalled();
  expect(srDS.state.currentSearch).toBe("");
});
