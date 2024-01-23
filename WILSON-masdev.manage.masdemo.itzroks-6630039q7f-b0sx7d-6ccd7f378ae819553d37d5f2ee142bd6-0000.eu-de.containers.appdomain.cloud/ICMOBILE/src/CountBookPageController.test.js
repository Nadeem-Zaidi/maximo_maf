/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import CountBookPageController from './CountBookPageController';
import CountBookDetailPageController from './CountBookDetailPageController';
import countBookData from './test/test-countbook-data';
import countBookLineData from './test/test-countbookline-data';
import domainitem from './test/domain-json-data.js';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import { log } from "@maximo/maximo-js-api";

function newDatasource(data = countBookData, name = 'countBookListDS') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
      idAttribute: "countbookid",
      name: name
  });

  return ds;
}
function newStatusDatasource(data = domainitem, name = 'synonymdomainDS') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name
  });
  return ds;
}

it('Load page, goto detail page, and go back.', async () => {
  let countBookController = new CountBookPageController();
  let countBookDetailPageController = new CountBookDetailPageController(); 

  let app = new Application();

  const countBookPage = new Page({
    name: 'countBook',
    clearStack: false
  });

  const countBookDetailPage = new Page({
    name: 'countBookDetail',
    clearStack: false
  });

  // app.registerController(countBookController);
  // app.registerController(countBookDetailPageController);


  countBookPage.registerController(countBookController);
  countBookDetailPage.registerController(countBookDetailPageController);
  countBookDetailPage.state.dsinitialize = false;

  const countBookListds = newDatasource(countBookData, 'countBookListDS');
  app.registerDatasource(countBookListds);
  countBookListds.load = sinon.spy(() => {
    return countBookData.member;
  });

  let items = await countBookListds.load();

  app.state.counteditemidlist4countbook = [];
  app.state.counteditemvaluelist4countbook = [];
  app.state.param_countbooknum = '1008';
  app.state.param_countbooksiteid = 'BEDFORD';
  const countBookDetailds = newDatasource(countBookLineData, 'countBookDetailDS');
  countBookDetailds.load = sinon.spy(() => {
    return countBookLineData.member;
  });
  app.registerDatasource(countBookDetailds);

  app.registerPage(countBookPage);
  app.registerPage(countBookDetailPage);

  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDS');
  dsDomain.load = sinon.spy(() => {
    return domainitem.member;
  });
  const syndomain = await dsDomain.load();
  dsDomain.searchQBE = sinon.spy(() => {
    return syndomain;
  });
  app.registerDatasource(dsDomain);
  
  await app.initialize();
  expect(countBookController.page).toBeTruthy();
  countBookController.pageInitialized(countBookPage, app);
  
  app.setCurrentPage = sinon.spy(() => {
    return countBookDetailds;
  });  

  let event1 =items[0];
  app.state.selectedCountBookDesc = event1.description;
  app.state.param_countbookid = event1.countbookid;
  app.state.param_countbooknum = event1.countbooknum;
	//countBookController.countBookListGoto(event1);

  app.setCurrentPage = sinon.spy(() => {
    return countBookListds;
  }); 
  countBookController.goBack();
  
});


