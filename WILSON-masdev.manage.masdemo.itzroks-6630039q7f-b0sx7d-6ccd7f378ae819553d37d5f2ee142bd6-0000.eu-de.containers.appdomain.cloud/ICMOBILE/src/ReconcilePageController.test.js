/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ReconcilePageController from './ReconcilePageController';
import InvBalDetailPageController from './InvBalDetailPageController';
import reconcileData from './test/test-reconcile-data.js';
import reconcileDataMismatched from './test/test-reconcile-data-mismatched.js';
import reconcileDataMatched from './test/test-reconcile-data-matched.js';
import invBalancesDetailData from './test/test-invbalancedetail-data.js';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';

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

function newMismatchedDatasource(data = reconcileDataMismatched, name = 'reconciledsmismatched') {
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

function newMatchedDatasource(data = reconcileDataMatched, name = 'reconciledsmatched') {
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

function newDetailDatasource(data = invBalancesDetailData, name = 'invbalancedetailds') {
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

it('Load page, applySelected, goto detail page, and go back.', async () => {
  let controller = new ReconcilePageController();
  let invBalDetailPageController = new InvBalDetailPageController(); 

  let app = new Application();

  const reconcilePage = new Page({
    name: 'reconcile',
    clearStack: false
  });

  const invBalDetailPage = new Page({
    name: 'invBalDetail',
    params: {invbalancesid: '384'},
    clearStack: false
  });

  app.registerController(controller);
  app.registerController(invBalDetailPageController);
  controller.pageInitialized(reconcilePage, app);
  reconcilePage.registerController(controller);
  invBalDetailPage.registerController(invBalDetailPageController);
  
  
  const reconcileMismatchedds = newMismatchedDatasource(reconcileDataMismatched, 'reconciledsmismatched');
  reconcileMismatchedds.state.totalCount = 18;
  sinon.stub(reconcileMismatchedds, 'forceReload'); 
  sinon.stub(reconcileMismatchedds, 'forceSync'); 
  reconcilePage.registerDatasource(reconcileMismatchedds);
  await reconcileMismatchedds.load();
  
  const reconcileMatchedds = newMatchedDatasource(reconcileDataMatched, 'reconciledsmatched');
  reconcileMatchedds.state.totalCount = 6;
  sinon.stub(reconcileMatchedds, 'forceSync'); 
  reconcilePage.registerDatasource(reconcileMatchedds);
  await reconcileMatchedds.load();

  const reconcile4allds = newReconcile4AllDatasource(reconcileData, 'reconcileds4all');
  reconcile4allds.dataAdapter.totalCount = 56;
  reconcilePage.registerDatasource(reconcile4allds);  
  sinon.stub(reconcile4allds, 'forceSync'); 
  // await reconcile4allds.load();

  sinon.stub(reconcile4allds, "invokeAction").returns(''); 
  let items1 = await reconcile4allds.load();
  let event1 =items1[0];
  
 
  const invBalanceDetailds = newDetailDatasource(invBalancesDetailData, 'invbalancedetailds');
  sinon.stub(invBalanceDetailds, 'initializeQbe'); 
  sinon.stub(invBalanceDetailds, 'setQBE');
  reconcilePage.registerDatasource(invBalanceDetailds);
  
  app.registerPage(reconcilePage);
  app.registerPage(invBalDetailPage);
  
  await app.initialize();
  expect(controller.page).toBeTruthy();
  
  // Test catch error path.
  // controller.pageResumed(reconcilePage, app);
  app.state.reconcileback = true;

  // Test normal working path.
  //let invokeAction = sinon.stub(reconcile4allds, "invokeAction").returns(items[3]);
  controller.pageResumed(reconcilePage, app);
  app.setCurrentPage = sinon.spy(() => {
    return invBalanceDetailds;
  });  

  // Test Catching error
  controller.applySelected('reconciledsmismatched');
  reconcileMismatchedds.setSelectedItem(items1[0], true);

  // Test normal path without error.
  sinon.stub(reconcileMismatchedds, "invokeAction").returns(items1[0]);
  controller.applySelected('reconciledsmismatched');

  // Test methods for switch tabs.
  controller.switchToMismatchedTab();
  controller.switchToMatchedTab();
  controller.changeContainerTab(0);

  app.client = {
    userInfo: {
      personid: 'FITZ',
      displayname: "Fitz Cameron",
      primaryphone: "5582123456789",
      primaryemail: "fitzcam@srmobile.cn",
      location: {
        location:"PLANT-W1"
      }
    },
  };
  controller.reloadDatasource();
  
  // Test methods goto details/back.
	controller.gotoDetailsFromSelectedReconciliation(event1.invbalancesid);
  controller.goBack();
  
});


