/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import CountBookListDataController from './CountBookListDataController';
import countBookData from './test/test-countbook-data';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';

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

it('Load page, goto detail page, and go back.', async () => {
  let countBookListDataController = new CountBookListDataController();

  let app = new Application();

  const countBookPage = new Page({
    name: 'countBook',
    clearStack: false
  });

  app.registerController(countBookListDataController);

  countBookPage.registerController(countBookListDataController);

  const countBookListds = newDatasource(countBookData, 'countBookListDS');
  app.registerDatasource(countBookListds);

  let items = await countBookListds.load();

  app.registerPage(countBookPage);
  await app.initialize();

  let event1 =items[0];
  app.state.param_countbooknum = '1001';
  app.state.param_countednumber = 5;
  countBookListDataController.computedCountedMessage(event1);
  countBookListDataController.computedCountedIcon(event1);
  countBookListDataController.computedTags(event1);
  countBookListDataController.computedOverdueMessage(event1);
  countBookListDataController.computedOverdueIcon(event1);
  countBookListDataController.showCBDetail(event1);

  
});


