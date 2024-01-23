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

import RelatedWoController from './RelatedWoController';
import WorkOrderEditController from "./WorkOrderEditController";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from '@maximo/maximo-js-api';
import workorderitem from './test/wo-detail-json-data.js';
import relatedRecord from './test/related-work-order.js';
import sinon from 'sinon';

function newDatasource(data = workorderitem, name = "workorderds") {
  const da = new JSONDataAdapter({
    src: workorderitem,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name,
  });

  return ds;
}

function newDatasourceRelatedRecord(
  data = relatedRecord,
  name = 'relatedWorkOrderDs'
) {
  const da = new JSONDataAdapter({
    src: relatedRecord,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

it('Create related and follow up work order', async () => {
  global.open = jest.fn();

  const controller = new RelatedWoController();
  const woEditController = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'page'});
  const workOrderDetailsPage = new Page({name: 'workOrderDetails'});
  const woDetailResourceDS = newDatasource(workorderitem, 'woDetailResource');
  app.registerPage(workOrderDetailsPage);

  workOrderDetailsPage.registerDatasource(woDetailResourceDS);
  app.client = {
    userInfo: {
      personid: 'SAM',
    },
  };

  app.registerController(controller);
  app.registerController(woEditController);

  const wodetails = newDatasource(workorderitem, 'woDetailRelatedWorkOrder');

  wodetails.controllers.push(new RelatedWoController());
  page.registerDatasource(wodetails);

  await wodetails.load();
  
  await app.initialize();

  controller.pageInitialized(page, app);
  app.currentPage = {callController: ()=>{}};
  const invokeLoadRecord = sinon.stub(app.currentPage, 'callController');
  const ds = newDatasourceRelatedRecord(relatedRecord, 'relatedWorkOrderDs');
  page.registerDatasource(ds);

  ds.dependsOn = wodetails;
  let pageSetter = jest.fn();
  app.setCurrentPage = pageSetter;
  let evt = {
    item: wodetails.item,
    datasource: wodetails,
  };

  await controller.createRelatedAndFollowUpWo(evt);
  expect(invokeLoadRecord.called).toBe(true);

});

it('should send user to work order detail page', async () => {
  const controller = new RelatedWoController();
  const app = new Application();

  let pageSetter = jest.fn();
  let event = {
    item: {wonum: '1001', siteid: 'BEDFORD'},
  };

  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = pageSetter;

  controller.pageInitialized(new Page(), app);

  controller.showWoDetailPage(event);

  expect(pageSetter.mock.calls.length).toEqual(1);

  expect(pageSetter.mock.calls[0][0].name).toEqual('workOrderDetails');
});

it('should send open work order details page', async () => {

  global.open = jest.fn();
  const controller = new RelatedWoController();
  const app = new Application();
  const page = new Page({name: 'relatedWorkOrder'});

  let event = {
    item: {wonum: '1001', siteid: 'BEDFORD',href:'oslc/os/mxapiwodetail/_QkVERk9SRC8xNDI4'},
    childitem: {relatedreckey: '1005'},
  };

  app.registerController(controller);
  app.initialize();
  controller.pageInitialized(page, app);
 
  await controller.openEditWo(event);
  expect(page.state.loading).toEqual(true);

});
