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
import worklogData from './test/sr-worklog-data.js'

async function getApp() {
  let initializeApp = newTestStub({
    currentPage: 'main',
    datasources: {
      srDS: {
        data: mainPageData
      },
      worklogDS: {
        data: worklogData
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
  return app;
}



it('should be able to open SR comments and add a new comment', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }
  await controller.openWorkLogDrawer(event);
  
  let value = {
    summary: "Testing 123",
    longDescription: "Testing 123 long description"
  }
  await controller.saveWorkLog(value);
});
