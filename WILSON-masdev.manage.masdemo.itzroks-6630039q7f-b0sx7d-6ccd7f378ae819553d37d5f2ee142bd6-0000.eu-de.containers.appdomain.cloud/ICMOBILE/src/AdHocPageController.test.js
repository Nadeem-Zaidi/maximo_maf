/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import AdHocPageController from './AdHocPageController';
import InvBalDetailPageController from './InvBalDetailPageController';
import invBalancesData from './test/test-invbalance-data.js';
import invBalancesData2 from './test/test-invbalance-data-2.js';
import invBalancesDetailData from './test/test-invbalancedetail-data.js';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';

function newAllDatasource(data = invBalancesData, name = 'mxapiinvbaldsall') {
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

function newDatasource(data = invBalancesData, name = 'mxapiinvbalds_json') {
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

function newCountedDatasource(data = invBalancesData, name = 'mxapiinvbaldscounted_json') {
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

it('Load page, goto detail page, and go back.', async () => {
  let controller = new AdHocPageController();
  let invBalDetailPageController = new InvBalDetailPageController(); 

  let app = new Application();

  const adHocPage = new Page({
    name: 'adHoc',
    clearStack: false
  });
  
  const invBalDetailPage = new Page({
    name: 'invBalDetail',
    params: {invbalancesid: '382'},
    clearStack: false
  });

  app.registerController(controller);
  app.registerController(invBalDetailPageController);

  app.state.adhoctabloading = true;
  
  adHocPage.registerController(controller);
  invBalDetailPage.registerController(invBalDetailPageController);
 
  app.registerPage(adHocPage);
  app.registerPage(invBalDetailPage);
  
  let emptyitems = [];
  const adhocInvBalanceAllListds = newAllDatasource(invBalancesData2, 'mxapiinvbaldsall');
  adHocPage.registerDatasource(adhocInvBalanceAllListds);
  //app.registerDatasource(adhocInvBalanceAllListds);
  sinon.stub(adhocInvBalanceAllListds, 'setQBE');
  adhocInvBalanceAllListds.searchQBE = sinon.spy(() => {
    return invBalancesData2.member;
  }); 
  adhocInvBalanceAllListds.initializeQbe = sinon.spy(() => {
    return invBalancesData2.member;
  }); 
  adhocInvBalanceAllListds.getItems = sinon.spy(() => {
    return invBalancesData2.member;
  });
  adhocInvBalanceAllListds.load = sinon.spy(() => {
    return emptyitems;
  });
  adhocInvBalanceAllListds.get = sinon.spy(() => {
    return invBalancesData2.member[1];
  });
  
  const adhocInvBalanceListds = newDatasource(invBalancesData, 'mxapiinvbalds_json');
  adHocPage.registerDatasource(adhocInvBalanceListds);
  let event1 =invBalancesData.member[0];
  let event2 =invBalancesData.member[1];
  adhocInvBalanceListds.initializeQbe = sinon.spy(() => {
    return invBalancesData.member;
  }); 
  sinon.stub(adhocInvBalanceListds, 'setQBE');
  adhocInvBalanceListds.searchQBE = sinon.spy(() => {
    return items;
  }); 
  adhocInvBalanceListds.getItems = sinon.spy(() => {
    return invBalancesData.member;
  });
  adhocInvBalanceListds.load = sinon.spy(() => {
    return invBalancesData.member;
  });
  adhocInvBalanceListds.getById = sinon.spy(() => {
    return invBalancesData.member[0];
  }); 
  adhocInvBalanceListds.undoItemChanges = sinon.spy(() => {
    return invBalancesData.member;
  });
  let items = await adhocInvBalanceListds.load();
  
  const adhocInvBalanceCountedListds = newCountedDatasource(invBalancesData, 'mxapiinvbaldscounted_json');
  adHocPage.registerDatasource(adhocInvBalanceCountedListds);
  sinon.stub(adhocInvBalanceCountedListds, 'initializeQbe'); 
  sinon.stub(adhocInvBalanceCountedListds, 'setQBE'); 
  adhocInvBalanceCountedListds.searchQBE = sinon.spy(() => {
    return counteditems;
  }); 
  adhocInvBalanceCountedListds.getItems = sinon.spy(() => {
    return invBalancesData.member;
  });
  adhocInvBalanceCountedListds.load = sinon.spy(() => {
    return invBalancesData.member;
  });
  adhocInvBalanceCountedListds.getById = sinon.spy(() => {
    return invBalancesData.member[0];
  }); 
  adhocInvBalanceCountedListds.undoItemChanges = sinon.spy(() => {
    return invBalancesData.member;
  });
  let counteditems = await adhocInvBalanceCountedListds.load();

  const adhocInvBalanceDetailds = newDetailDatasource(invBalancesDetailData, 'invbalancedetailds_json');
  sinon.stub(adhocInvBalanceDetailds, 'initializeQbe'); 
  sinon.stub(adhocInvBalanceDetailds, 'setQBE');
  adhocInvBalanceDetailds.getItems = sinon.spy(() => {
    return invBalancesData.member;
  });
  adhocInvBalanceDetailds.getById = sinon.spy(() => {
    return invBalancesData.member[0];
  }); 
  adhocInvBalanceDetailds.undoItemChanges = sinon.spy(() => {
    return invBalancesData.member;
  });
  adHocPage.registerDatasource(adhocInvBalanceDetailds);
  
  app.state.allitemsidlist = [];
  adHocPage.state.allitems = [];

  await app.initialize();
  expect(controller.page).toBeTruthy();

  controller.pageInitialized(adHocPage, app);
  adHocPage.state.needsetup = true;
  controller.pageResumed(adHocPage, app);

  adhocInvBalanceAllListds.load = sinon.spy(() => {
    return invBalancesData2.member;
  });
  adhocInvBalanceAllListds.dataAdapter.totalCount=11;
  let items0 = await adhocInvBalanceAllListds.load();

  controller.pageResumed(adHocPage, app);

  let allitems = [];
  for (let i = 0 ; i < 7; i++) {
    allitems.push(invBalancesData2.member[i]);
  }
  
  await controller.getAllItemsFromDataSource(adhocInvBalanceAllListds);

  await controller.initializeItemsOnTab4Adhoc(allitems);

  await controller.reloadDatasource();

  controller.loadInCountedAdhocItemsDS(invBalancesData.member);
  controller.onAfterLoadData(adhocInvBalanceAllListds, []);
  controller.onAfterLoadData(adhocInvBalanceAllListds, invBalancesData.member);
  app.setCurrentPage = sinon.spy(() => {
    return adhocInvBalanceDetailds;
  });  

  const adhocInvBalanceAllListds2 = newAllDatasource([], 'mxapiinvbaldsall');
  adhocInvBalanceAllListds2.dataAdapter.totalCount=1;
  await controller.getAllItemsFromDataSource(adhocInvBalanceAllListds2);

  adHocPage.state.allitems.push(invBalancesData.member[0]);
  adHocPage.state.allitems.length = 1;  
  controller.onAfterLoadData(adhocInvBalanceAllListds2, '');

  app.state.loadcount = 1;
  adhocInvBalanceAllListds2.dataAdapter.totalCount=13;
  controller.onAfterLoadData(adhocInvBalanceAllListds2, invBalancesData.member);

  adhocInvBalanceAllListds2.dataAdapter.totalCount=0;
  controller.onAfterLoadData(adhocInvBalanceAllListds2, invBalancesData.member);

  app.state.adhocds = "mxapiinvbalds_json";
  event1.invbalancesid = event2.invbalancesid;
  controller.updatePhyscnt(event1);
  event1.adjustedphyscnt = 1;

  await controller.updatePhyscnt(event1);

  event2.adjustedphyscnt = '11';
  await controller.updatePhyscnt(event2);

  event2.adjustedphyscnt = 11;
  await controller.updatePhyscnt(event2);

  app.state.adhocds = "mxapiinvbaldscounted_json";
  app.state.isMobileContainer = false;
  event2.adjustedphyscnt = 11;
  await controller.updatePhyscnt(event2);

  event2.adjustedphyscnt = 101;
  app.state.isMobileContainer = true;
  app.state.allitemsidlist = [];
  await controller.updatePhyscnt(event2);

  app.state.isMobileContainer = false;
  sinon.stub(adhocInvBalanceAllListds, "save").returns(true);
  await controller.saveHandler();
  await controller.onCustomSaveTransition();

  controller.switchToInProgressTab();
  controller.switchToCountedTab();
  controller.changeContainerTab(0);
  
	controller.gotoDetailsFromSelectedInvBal(event1.invbalancesid);
  adhocInvBalanceListds.__itemChanges =invBalancesData2.member;
  adhocInvBalanceCountedListds.__itemChanges =invBalancesData2.member;
  controller.goBack();
});


