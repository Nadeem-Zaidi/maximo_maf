/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import CountBookLineDataController from './CountBookLineDataController';
import {
  Application,
  Datasource, 
  JSONDataAdapter,
  Page
} from '@maximo/maximo-js-api';

import countbooklineitem from './test/test-countbookline-withphyscnt-data';

function newDatasource(data = countbooklineitem, name = 'countBookDetailDS') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });
  
  const countbooklineds = new Datasource(da, {
    idAttribute: 'countbooklineid',
    name: name,
  });
  
  return countbooklineds;
}

it('onDatasourceInitialized test ', async () => {
  const controller = new CountBookLineDataController();
  const app = new Application();
  const page = new Page({
    name: 'countBookDetail'
  });

  const ds = newDatasource(countbooklineitem, 'countBookDetailDS');
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);
});
