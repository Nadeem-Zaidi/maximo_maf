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

import ReserveMaterialsPageController from './ReserveMaterialsPageController';
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from '@maximo/maximo-js-api';

import workorderitem from './test/wo-detail-json-data.js';
import statusitem from './test/statuses-json-data.js';
import sinon from 'sinon';
import SynonymUtil from './utils/SynonymUtil';
import reservedItemRotatingAsset from './test/rotating-asset-data.js'

function newDatasource(data = workorderitem, name = 'workorderds') {
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

function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name,
  });

  return ds;
}

it('load records', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { disableReservedMaterialAction: true },
  });

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  const woMaterialResource = newDatasource(workorderitem, 'woMaterialResource');
  const woMaterialResourcejson = newDatasource(
    workorderitem,
    'woReservedMaterialJsonds'
  );

  const woReservedMaterialds = newDatasource(
    workorderitem,
    'woReservedMaterialds'
  );
  sinon.stub(woReservedMaterialds, 'initializeQbe');
  page.registerDatasource(woReservedMaterialds);
  page.registerDatasource(woMaterialResource);
  page.registerDatasource(woMaterialResourcejson);

  controller.loadPageResumed();
});

it('get selected items', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { disableReservedMaterialAction: true },
  });

  const woMaterialResource = newDatasource(workorderitem, 'woMaterialResource');
  const woReservedMaterialds = newDatasource(
    workorderitem,
    'woReservedMaterialJsonds'
  );
  sinon.stub(woReservedMaterialds, 'initializeQbe');
  page.registerDatasource(woReservedMaterialds);
  page.registerDatasource(woMaterialResource);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  let items = await woReservedMaterialds.load();

  sinon.stub(woReservedMaterialds, 'getSelectedItems').returns(items);

  controller.getSelectedItems();
  expect(page.state.disableReservedMaterialAction).toBe(false);
});

it('set selected items', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: {
      selectedReservedItems: {},
      disableReservedMaterialAction: false,
      loadingReserverMaterials: true,
      items: {},
      rotatingItemWithNoAsset: {}
    },
  });

  const woReservedMaterialds = newDatasource(
    workorderitem,
    'woReservedMaterialJsonds'
  );
  const reservedActualMaterialDs = newDatasource(
    workorderitem,
    'reservedActualMaterialDs'
  );
  const defaultSetDs = newStatusDatasource(statusitem, 'defaultSetDs');
  const synonymData = newStatusDatasource(statusitem, 'synonymdomainData');
  const woReservedItem = newDatasource(reservedItemRotatingAsset, 'reservedItemRotatingAssetDS');
  sinon.stub(woReservedMaterialds, 'clearState');
  sinon.stub(woReservedMaterialds, 'resetState');
  page.registerDatasource(woReservedMaterialds);
  page.registerDatasource(reservedActualMaterialDs);
  page.registerDatasource(defaultSetDs);
  app.registerDatasource(synonymData);
  
  page.registerDatasource(woReservedItem);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  let items = await woReservedMaterialds.load();
  page.state.selectedReservedItems = [items[0]];

  sinon
    .stub(SynonymUtil, 'getSynonymDomain')
    .returns({ value: 'ISSUE', maxvalue: 'ISSUE', description: 'ISSUE' });
  controller.setReservedItems();
  let item = [items[0]];
  item[0].isrotating = false;
  page.state.selectedReservedItems = item;

  controller.setReservedItems();
  expect(page.state.disableReservedMaterialAction).toBe(true);

  page.state.selectedReservedItems = [];
  controller.setReservedItems();
  expect(page.state.disableReservedMaterialAction).toBe(true);
});
