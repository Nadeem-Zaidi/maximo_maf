/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2021, 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


import ApiKeyPageController from './ApiKeyPageController';
import sinon from 'sinon';

import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page
} from '@maximo/maximo-js-api';
import testData from './test/test-data';

function newJSONDatasource(data = testData, uniqueid = 'testid', name = 'testds', itemsAttr = 'member', objectStructure) {
  const da = new JSONDataAdapter({
    src: data,
    items: itemsAttr,
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: uniqueid,
    name: name,
    query: {
      objectStructure
    }
  });

  return ds;
}

it('Test data is loaded when the page is initialized', async () => {
  const controller = new ApiKeyPageController();
  const app = new Application();
  const page = new Page({ name: 'main' });
  page.registerController(controller);
  app.registerPage(page);

  const ds = newJSONDatasource(testData, 'testData','apikeyds');
  let addNewStub = sinon.stub(ds, 'addNew');
  let saveStub = sinon.stub(ds, 'save');
  let deleteStub = sinon.stub(ds, 'delete');
  let forceReloadStub = sinon.stub(ds, 'forceReload');
  page.registerDatasource(ds);

  const ds2 = newJSONDatasource(testData, 'testData','useridlookupds');
  let clearSelectionsStub = sinon.stub(ds2, 'clearSelections');
  page.registerDatasource(ds2);

  await app.initialize();
  expect(controller.app).toBe(app);
  expect(controller.page).toBe(page);
  

  controller.handleCreateApiKey();
  expect(addNewStub.called).toBe(true);
  expect(clearSelectionsStub.called).toBe(true);

  await controller.handleCreateNewApiKey();
  expect(saveStub.called).toBe(true);
  expect(forceReloadStub.called).toBe(true);

  let event = {item:{href:'abc'}};
  await controller.handleDeleteApiKey(event);
  expect(deleteStub.called).toBe(true);
  expect(forceReloadStub.called).toBe(true);
});

