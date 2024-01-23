/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import InvBalDetailPageController from './InvBalDetailPageController';
import invBalancesDetailData from './test/test-invbalancedetail-data.js';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import newTestStub from './test/AppTestStub.js';

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

function adHocJSONDetailDatasource(data = invBalancesDetailData, name = 'mxapiinvbalds_json') {
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

function adHocCountedJSONDetailDatasource(data = invBalancesDetailData, name = 'mxapiinvbaldscounted_json') {
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

it('Load page with state.param_invbalancesid and can goback', async () => {
  let invBalDetailPageController = new InvBalDetailPageController(); 

  let app = new Application();

  const invBalDetailPage = new Page({
    name: 'invBalDetail',
    params: {invbalancesid: 382},
    clearStack: false
  });

  app.registerController(invBalDetailPageController);
  app.state.adhocds ="mxapiinvbalds_json";
  
  invBalDetailPage.registerController(invBalDetailPageController);

  
  invBalDetailPage.params.invbalancesid = undefined
  invBalDetailPage.state.param_invbalancesid =382

  const adhocDetailds = adHocJSONDetailDatasource(invBalancesDetailData, 'mxapiinvbalds_json');
  adhocDetailds.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invBalDetailPage.registerDatasource(adhocDetailds);

  const adhocDetailds_Counted = adHocCountedJSONDetailDatasource(invBalancesDetailData, 'mxapiinvbaldscounted_json');
  adhocDetailds_Counted.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invBalDetailPage.registerDatasource(adhocDetailds_Counted);

  const invbalancedetailds = newDetailDatasource(invBalancesDetailData, 'invbalancedetailds');
  invBalDetailPage.registerDatasource(invbalancedetailds);
  sinon.stub(invbalancedetailds, 'load');
  sinon.stub(invbalancedetailds, 'forceReload');
  invbalancedetailds.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invbalancedetailds.load = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  await invbalancedetailds.load({noCache:true});

  invBalDetailPage.findDatasource = sinon.spy(() => {
    return invbalancedetailds;
  }); 


  app.registerPage(invBalDetailPage);
  
  await app.initialize();

  expect(invBalDetailPageController.page).toBeTruthy();
  await invBalDetailPageController.pageInitialized(invBalDetailPage, app);
  await invBalDetailPageController.pageResumed(invBalDetailPage, app);

  app.setCurrentPage = sinon.spy(() => {
    return invbalancedetailds;
  });  

  invBalDetailPageController.goBack();

  invBalDetailPage.state.isFromReconcile = true;
  invBalDetailPageController.goBack();

});


it('Load page with param invbalancesid', async () => {
  let invBalDetailPageController = new InvBalDetailPageController(); 

  let app = new Application();

  const invBalDetailPage = new Page({
    name: 'invBalDetail',
    clearStack: false
  });

	invBalDetailPage.params = {
		invbalancesid: 388
	}
  app.state.adhocds ="mxapiinvbalds_json";

  app.registerController(invBalDetailPageController);
  invBalDetailPage.registerController(invBalDetailPageController);

  invBalDetailPage.params.invbalancesid = 382;

  const adhocDetailds = adHocJSONDetailDatasource(invBalancesDetailData, 'mxapiinvbalds_json');
  adhocDetailds.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invBalDetailPage.registerDatasource(adhocDetailds);

  const adhocDetailds_Counted = adHocCountedJSONDetailDatasource(invBalancesDetailData, 'mxapiinvbaldscounted_json');
  adhocDetailds_Counted.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invBalDetailPage.registerDatasource(adhocDetailds_Counted);

  const adhocInvBalanceDetailds = newDetailDatasource(invBalancesDetailData, 'invbalancedetailds');
  adhocInvBalanceDetailds.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invBalDetailPage.registerDatasource(adhocInvBalanceDetailds);

  app.registerPage(invBalDetailPage);

  await app.initialize();

  sinon.stub(adhocInvBalanceDetailds, 'load');
  sinon.stub(adhocInvBalanceDetailds, 'forceReload');
  await adhocInvBalanceDetailds.load({noCache:true});

  expect(invBalDetailPageController.page).toBeTruthy();
  await invBalDetailPageController.pageInitialized(invBalDetailPage, app);

  await invBalDetailPageController.pageResumed(invBalDetailPage, app);
  
});


it('Load page with AppTestStub', async () => {
  let initializeApp = newTestStub({
    currentPage: 'invBalDetail',
    datasources: {
      invbalancedetailds: {
        data: require('./test/test-invbalancedetail-data.js'),
      },
      invbaldetailjsonds: {
        data: require('./test/test-invbalancedetail-data.js'),
      }
    },
  });

  let app = await initializeApp();
  let page = app.currentPage;
  let invBalDetailPageController = new InvBalDetailPageController(); 
  page.registerController(invBalDetailPageController);
  page.params.invbalancesid = 382;
  app.state.adhocds ="mxapiinvbalds_json";

  sinon.stub(page.findDatasource('invBalDetailItemDS'), 'load');

  let invbalancedetailds = page.findDatasource('invbalancedetailds');
  invbalancedetailds.getItems = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  invbalancedetailds.load = sinon.spy(() => {
    return invBalancesDetailData.member;
  });
  sinon.stub(invbalancedetailds, 'forceReload');

  page.findDatasource = sinon.spy(() => {
    return invbalancedetailds;
  });  
 
  invbalancedetailds.currentItem = invBalancesDetailData.member[0];

  await invBalDetailPageController.pageInitialized(page, app);
  await invBalDetailPageController.pageResumed(page, app);

  page.params.isFromReconcile = true;
  await invBalDetailPageController.pageResumed(page, app);
});
