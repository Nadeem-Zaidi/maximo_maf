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
import newTestStub from './test/AppTestStub';
import mainPageData from './test/sr-mainpage-data.js'
import worklogData from './test/sr-worklog-data.js'

async function getApp() {
  let initializeApp = newTestStub({
    currentPage: 'srDetails',
    datasources: {
      srDS: {
        data: mainPageData
      },
      worklogDS: {
        data: worklogData
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage = jest.fn();
  return app;
}


it('should update worklog count when comment added from SR details page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  await controller.updateWorkLogCount();

  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }
  await controller.openWorkLogDrawer(event);
});



it('should send user to attachments page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  let pageSetter = jest.fn();

  const originalSetter = app.setCurrentPage;
  app.setCurrentPage = pageSetter;

  await controller.pageInitialized(page, app);

  let event = {
    item: { href: 'oslc/os/mxapisr/_U1IvMTE3Ng--' },
  };
  controller.openAttachmentPage(event);

  expect(pageSetter.mock.calls.length).toEqual(1);
  expect(pageSetter.mock.calls[0][0].name).toEqual('attachments');

  app.setCurrentPage = originalSetter;
});



it('bring user back from attachments page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  page.params.doclinksCountOverridden = true;

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);
});
