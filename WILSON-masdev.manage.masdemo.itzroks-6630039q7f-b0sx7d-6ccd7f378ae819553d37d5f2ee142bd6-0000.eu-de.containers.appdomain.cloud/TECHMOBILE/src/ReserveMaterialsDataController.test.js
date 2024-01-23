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

import ReserveMaterialsDataController from './ReserveMaterialsDataController';
import workorderitem from './test/wo-detail-json-data';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';

function newDatasource(data = workorderitem, name = 'selectedDatasource', field = 'member') {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name,
  });
  return ds;
}

it('computedItemNum returns right', async () => {
  const controller = new ReserveMaterialsDataController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials'
  });

  app.client = {
    userInfo: {
      personId: 'SAM',
      labor: {
        laborcode: 'SAM'
      }
    }
  };

  const ds = newDatasource(workorderitem, 'woReservedMaterialds');
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  let title = controller.computedItemNum({
    itemnum: '6I-2499',
    description: 'Filter, Primary Air'
  });
  expect(title).toBe('6I-2499 Filter, Primary Air');

  title = controller.computedItemNum({
    itemnum: '6I-2499'
  });
  expect(title).toBe('6I-2499');

  title = controller.computedItemNum({
    description: 'Filter, Primary Air'
  });
  expect(title).toBe('Filter, Primary Air');

  title = controller.computedItemNum();
  expect(title).toBe(null);
});
