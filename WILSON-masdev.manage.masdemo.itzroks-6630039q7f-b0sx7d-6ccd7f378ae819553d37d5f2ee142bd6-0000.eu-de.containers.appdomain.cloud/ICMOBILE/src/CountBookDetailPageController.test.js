/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import CountBookDetailPageController from './CountBookDetailPageController';
import countBookData from './test/test-countbook-data';
import countBookLineData from './test/test-countbookline-data';
import {Application, Datasource, JSONDataAdapter, Page, DisconnectedRESTConnection} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import domainitem from './test/domain-json-data.js';
import ICTestUtil from './utils/ICTestUtil';

it('Load page with countbooknum, goback, gotodetail, and switch tabs - when app.state.isMobileContainer is true', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);

  countBookDetailPage.state.dsinitialize = false;
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const newDetailDatasource4ALL4Web = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDSCounted_JSON');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDS_JSON');

  countBookDetailPage.countbookds4comp = countBookDS;

  let items = await countBookListResource.load();
  let items1 = countBookLineData.member;
  let items2 = countBookLineData.member;

  app.registerPage(countBookDetailPage);
  
  app.state.isMobileContainer = true;

  await app.initialize();

  expect(countBookDetailPageController.page).toBeTruthy();
  app.state.param_countbookallitmcount = '7';

  let itemsDetail = await newDetailDatasource4ALL.load();
  newDetailDatasource4ALL.dataAdapter.conn = DisconnectedRESTConnection.newInstance({ authenticator: null });
  
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  let event1 = items[4];
  let event2 =items2[1];

  app.state.selectedCountBookDesc = event1.description;
  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  app.state.param_countbookstatus = 'APPR'
  app.state.isback = false;
  
  await countBookDetailPageController.pageResumed(countBookDetailPage, app);

  // Tests updatePhyscnt with normal value.
  event2.physcnt = 100;
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  app.state.isback = true;

  countBookDetailPageController.switchToInProgressTab();
  countBookDetailPageController.switchToCountedTab();
  
  // Tests the case when all items were counted from maximo classic then countBookDetailResource is null
  await countBookDetailds.search('notexistvalue');
  app.state.countbookchanged = true;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;

  await countBookDetailPageController.pageResumed(countBookDetailPage, app);
 
  app.setCurrentPage = sinon.spy(() => {
    return countBookListResource;
  }); 
  
  countBookDetailPageController.gotoDetailsFromSelectedCountBookLine(event2.countbooklineid);

  countBookDetailds.__itemChanges =items1;
  countBookDetaildsCounted.__itemChanges =items1;
  countBookDetailPageController.goBack(); 
  countBookDetailPageController.undoDatasourceSystemChanges4AllDatasources();
});

it('Load page with countbooknum, goback, gotodetail, and switch tabs - when app.state.isMobileContainer is false', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);

  countBookDetailPage.state.dsinitialize = false;
  app.state.isMobileContainer = false;

  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web_Counted');
  
  countBookDetailPage.countbookds4comp = countBookDS;

  let items = await countBookListResource.load();
  let items1 = countBookLineData.member;
  let items2 = countBookLineData.member;

  app.registerPage(countBookDetailPage);
  await app.initialize();

  let event2 =items2[1];
  expect(countBookDetailPageController.page).toBeTruthy();
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  let event1 = items[4];
  
  app.state.selectedCountBookDesc = event1.description;
  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  app.state.param_countbookstatus = 'APPR'
  app.state.isback = false;
  
  await countBookDetailPageController.pageResumed(countBookDetailPage, app);

  // Tests updatePhyscnt with normal value.
  event2.physcnt = 100;
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  app.state.isback = true;

  countBookDetailPageController.switchToInProgressTab();
  countBookDetailPageController.switchToCountedTab();
  
  // Tests the case when all items were counted from maximo classic then countBookDetailResource is null
  await countBookDetailds.search('notexistvalue');
  app.state.countbookchanged = true;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  await countBookDetailPageController.pageResumed(countBookDetailPage, app);
 
  app.setCurrentPage = sinon.spy(() => {
    return countBookListResource;
  }); 
  countBookDetailPageController.gotoDetailsFromSelectedCountBookLine(event2.countbooklineid);

  countBookDetailds.__itemChanges =items1;
  countBookDetaildsCounted.__itemChanges =items1;
  countBookDetailPageController.goBack(); 

});


it('Test updatePhyscnt, savePhycnt, and related funcs, with app.state.isMobileContainer = true', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  app.state.counteditemidlist4countbook = [];
  app.state.counteditemvaluelist4countbook = [];
  app.state.counteditemdatelist4countbook = [];

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);

  app.state.isMobileContainer = true;
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  countBookDetailPage.state.dsinitialize = false;
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS'); 
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const newDetailDatasource4ALL4Web = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDSCounted_JSON');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDS_JSON');

  countBookDetailPage.countbookds4comp = countBookDS;

  newDetailDatasource4ALL.dataAdapter.totalCount=7;

  let items = await countBookListResource.load();
  let items1 = countBookLineData.member;  
  let items2 = countBookLineData.member;

  app.registerPage(countBookDetailPage);

  await app.initialize();

  let event2 =items2[1];
  let event3 =items2[2];
  
  expect(countBookDetailPageController.page).toBeTruthy();

  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  let event1 = items[4];
  
  app.state.selectedCountBookDesc = event1.description;
  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  app.state.param_countbookstatus = 'APPR'
  app.state.isback = false;
  
  // Tests updatePhyscnt with undefined value.
  event2.physcnt = undefined;
  await countBookDetailPageController.updatePhyscnt(event2);

  // Tests updatePhyscnt with empty string.
  event2.physcnt = '';
  await countBookDetailPageController.updatePhyscnt(event2);

  // Tests updatePhyscnt with normal value.
  event2.physcnt = 108;
  event2.physcntdate = "2022-04-11T09:56:31+08:00";
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;

  await countBookDetailPageController.updatePhyscnt(event2);

  await countBookDetailPageController.loadInCountedCBLineDS(countBookLineData.member);
  countBookDetailPageController.savePhyscnt(); 

  // Test Custom Save Dialog.
  countBookDetailPageController.onCustomSaveTransition();

  // Tests updatePhyscnt with empty counteditemidlist4countbook.
  app.state.counteditemidlist4countbook = [];
  app.state.counteditemvaluelist4countbook = [];
  app.state.counteditemdatelist4countbook = [];
  await countBookDetailPageController.updatePhyscnt(event2);

  // Tests savePhyscnt path - this.app.state.counteditemidlist4countbook.length===1
  countBookDetailPageController.savePhyscnt(); 

  // Tests update physcnt.
  event3.physcnt = 11; 
  event3.countbooklineid = 267;
  await countBookDetailPageController.updatePhyscnt(event3);

  // Tests updateCountedItemsValue path - app.state.isMobileContainer = true and this.app.state.counteditemidlist4countbook.length>1
  // this.app.state.notcountedcountbooklinesidlist.length = 0
  app.state.notcountedcountbooklinesidlist = [];
  await countBookDetailPageController.updatePhyscnt(event3);

  app.state.isback = true;

  countBookDetailPageController.savePhyscnt();

  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;

  countBookDetailPage.state.enablesave=true;
  countBookDetailPageController.completeCountbook();

  let allitems = [];
  for (let i = 0 ; i < 7; i++) {
    countBookLineData.member[0].hasphyscnt = 0;
    allitems.push(countBookLineData.member[i]);
  }
  await countBookDetailPageController.initializeItemsOnTab(allitems);

});


it('Test updatePhyscnt, savePhycnt, and related funcs, with app.state.isMobileContainer = false', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);

  app.state.isMobileContainer = false;
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  countBookDetailPage.state.dsinitialize = false;
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS'); 
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web_Counted');
  
  countBookDetailPage.countbookds4comp = countBookDS;

  newDetailDatasource4ALL.dataAdapter.totalCount=7;

  let items = await countBookListResource.load();
  let items1 = countBookLineData.member;  
  let items2 = countBookLineData.member;

  app.registerPage(countBookDetailPage);
  
  await app.initialize();

  let event2 =items2[1];
  let event3 =items2[2];
  
  expect(countBookDetailPageController.page).toBeTruthy();
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  let event1 = items[4];
  
  app.state.selectedCountBookDesc = event1.description;
  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;
  app.state.param_countbookstatus = 'APPR'
  app.state.isback = false;
  
  // Tests updatePhyscnt with undefined value.
  event2.physcnt = undefined;
  await countBookDetailPageController.updatePhyscnt(event2);

  // Tests updatePhyscnt with empty string.
  event2.physcnt = '';
  await countBookDetailPageController.updatePhyscnt(event2);

  // Tests updatePhyscnt with normal value.
  event2.physcnt = 100;
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;

  await countBookDetailPageController.updatePhyscnt(event2);

  await countBookDetailPageController.loadInCountedCBLineDS(countBookLineData.member);
  countBookDetailPageController.savePhyscnt(); 

  // Test Custom Save Dialog.
  countBookDetailPageController.onCustomSaveTransition();

  // Tests updatePhyscnt with empty counteditemidlist4countbook.
  app.state.counteditemidlist4countbook = [];
  app.state.counteditemvaluelist4countbook = [];
  app.state.counteditemdatelist4countbook = [];
  await countBookDetailPageController.updatePhyscnt(event2);

  // Tests savePhyscnt path - this.app.state.counteditemidlist4countbook.length===1
  countBookDetailPageController.savePhyscnt(); 

  // Tests update physcnt.
  event3.physcnt = 11; 
  await countBookDetailPageController.updatePhyscnt(event3);

  // Tests updateCountedItemsValue path - app.state.isMobileContainer = true and this.app.state.counteditemidlist4countbook.length>1
  // this.app.state.notcountedcountbooklinesidlist.length = 0
  app.state.notcountedcountbooklinesidlist = [];
  await countBookDetailPageController.updatePhyscnt(event3);

  app.state.isback = true;

  countBookDetailPageController.savePhyscnt();

  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
  app.state.param_countbooksiteid = event1.siteid;

  countBookDetailPage.state.enablesave=true;
  countBookDetailPageController.completeCountbook();

  let allitems = [];
  for (let i = 0 ; i < 7; i++) {
    allitems.push(countBookLineData.member[i]);
  }
   
  await countBookDetailPageController.initializeItemsOnTab(allitems);

});

it('Load onAfterLoadData with app.state.isMobileContainer = true', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  app.state.isMobileContainer = true;
  countBookDetailPage.state.dsinitialize = false;
  countBookDetailPage.state.allitems = [];
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS'); 
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const newDetailDatasource4ALL4Web = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDSCounted_JSON');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDS_JSON');

  countBookDetailPage.countbookds4comp = countBookDS;

  newDetailDatasource4ALL.dataAdapter.totalCount=7;
   
  app.registerPage(countBookDetailPage);
  await app.initialize();
  
  expect(countBookDetailPageController.page).toBeTruthy();

  app.state.param_countbookallitmcount = 0;
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  app.state.param_countbookallitmcount = 7;
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  await countBookDetailPageController.onAfterLoadData(newDetailDatasource4ALL, countBookLineData.member);

  await countBookDetailPageController.reloadDatasource();

  newDetailDatasource4ALL.lastQuery = {
    qbe: {lotnum: "lotnum"},
  };

  await countBookDetailPageController.onAfterLoadData(newDetailDatasource4ALL, countBookLineData.member);
  newDetailDatasource4ALL.lastQuery = {
    qbe: {binnum: "binnum"},
  };
  await countBookDetailPageController.onAfterLoadData(newDetailDatasource4ALL, countBookLineData.member);
});

it('Load onAfterLoadData with app.state.isMobileContainer = false', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);
  app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
  app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
  app.state.counteditemdatelist4countbook = ["2019-04-01T09:56:31+08:00", "2019-04-02T09:56:31+08:00", "2019-04-03T09:56:31+08:00","2019-04-04T09:56:31+08:00","2019-04-05T09:56:31+08:00","2019-04-06T09:56:31+08:00"];
  
  app.state.isMobileContainer = false;
  countBookDetailPage.state.dsinitialize = false;
  countBookDetailPage.state.allitems = [];
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web_Counted');

  countBookDetailPage.countbookds4comp = countBookDS;

  newDetailDatasource4ALL.dataAdapter.totalCount=7;

  let items = countBookLineData.member;
  let event3 =items[2];

  app.registerPage(countBookDetailPage);
  await app.initialize();
  
  expect(countBookDetailPageController.page).toBeTruthy();
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  countBookDetailPage.state.hasnewcount = true;
  await countBookDetailPageController.onAfterLoadData(newDetailDatasource4ALL, items);
});


it('Test match,  with app.state.isMobileContainer = true', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.registerController(countBookDetailPageController);
  app.state.countbookds = "countBookDSCounted_JSON";
  app.state.isMobileContainer = true;
  countBookDetailPage.state.dsinitialize = false;
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS'); 
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const newDetailDatasource4ALL4Web = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDSCounted_JSON');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDS_JSON');

  countBookDetailPage.countbookds4comp = countBookDS;

  app.registerPage(countBookDetailPage);
  
  await app.initialize();
  
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  let items2 = countBookLineData.member;
  // Tests computeMatch
  await countBookDetailPageController.computeMatch(items2[0]);
  await countBookDetailPageController.computeMatch(items2[1]);
  await countBookDetailPageController.computeMatch(items2[2]);
  await countBookDetailPageController.computeMatch(items2[3]);
  await countBookDetailPageController.computeMatch(items2[4]);
  await countBookDetailPageController.computeMatch(items2[5]);
});

it('Test validateInput, with app.state.isMobileContainer = true', async () => {
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    params: {countbookid: '101'},
    clearStack: false
  });

  app.state.param_countbooknum = '1008';
  app.state.param_countbooksiteid = 'BEDFORD';
  app.state.isMobileContainer = true;
  app.registerController(countBookDetailPageController);
  countBookDetailPage.registerController(countBookDetailPageController);

  const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
  const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
  const countBookDS = ICTestUtil.registerNewCBDatasourceOnPage(countBookDetailPage, countBookData, 'countBookDS'); 
  const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
  const newDetailDatasource4ALL4Web = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
  const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDSCounted_JSON');
  const countBookDetailds = ICTestUtil.registerNewDetailDatasource4JSON(countBookDetailPage, countBookLineData, 'countBookDetailDS_JSON');

  countBookDetailPage.countbookds4comp = countBookDS;
  
  let items2 = countBookLineData.member;

  app.registerPage(countBookDetailPage);

  await app.initialize();

  app.state.param_countbooknum = '1008';
  app.state.param_countbooksiteid = 'BEDFORD';
  newDetailDatasource4ALL.dataAdapter.totalCount=7;
  await countBookDetailPageController.pageInitialized(countBookDetailPage, app);

  let event2 =items2[5];

  countBookDetailPage.state.selectedTabIndex=0;
  event2.physcnt = 100;
  event2.rotating = true;
  countBookDetailPageController.validateInput(event2);

  countBookDetailPage.state.selectedTabIndex=1;
  event2.rotating = 0;
  countBookDetailPageController.validateInput(event2);
});