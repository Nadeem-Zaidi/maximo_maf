/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ReconcileDataController from './ReconcileDataController';
import {
  Application,
  Datasource, 
  JSONDataAdapter,
  Page
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import reconcileData from './test/test-reconcile-data.js';

function newReconcile4AllDatasource(data = reconcileData, name = 'reconcileds4all') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
      idAttribute: "invbalancesid",
      name: name
  });

  return ds;
}

function newMismatchedDatasource(data = reconcileData, name = 'reconciledsmismatched') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
      idAttribute: "invbalancesid",
      name: name
  });

  return ds;
}

function newMatchedDatasource(data = reconcileData, name = 'reconciledsmatched') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
      idAttribute: "invbalancesid",
      name: name
  });

  return ds;
}

it('onDatasourceInitialized test ', async () => {
  const controller = new ReconcileDataController();
  const app = new Application();
  const page = new Page({
    name: 'adHoc'
  });

  const ds = newReconcile4AllDatasource(reconcileData, 'reconcileds4all');
  ds.registerController(controller);
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);
}); 


it('onAfterLoadData should call syncData', async () => {
  const controller = new ReconcileDataController();
  const app = new Application();
  const page = new Page({
    name: 'adHoc'
  });

  page.state.clearQBERequested = false;
  const ds = newReconcile4AllDatasource(reconcileData, 'reconcileds4all');
  ds.searchQBE = sinon.spy(() => {
    return ds.items;
  }); 
  sinon.stub(ds, "invokeAction").returns(''); 
  
  ds.registerController(controller);
  page.registerDatasource(ds);
  app.registerDatasource(ds);

  const misMatchedDS = newMismatchedDatasource(reconcileData, 'reconciledsmismatched');
  sinon.stub(misMatchedDS, 'forceSync');
  misMatchedDS.registerController(controller);
  page.registerDatasource(misMatchedDS);
  app.registerDatasource(misMatchedDS);

  const matchedDS = newMatchedDatasource(reconcileData, 'reconciledsmatched');
  sinon.stub(matchedDS, 'forceSync');
  matchedDS.registerController(controller);
  page.registerDatasource(matchedDS);
  app.registerDatasource(matchedDS);

  app.registerPage(page);

  const checkSyncDataSpy = jest.spyOn(controller, 'syncData');

  await app.initialize();

  await matchedDS.load();
  

  expect(checkSyncDataSpy).toHaveBeenCalled();

});
