/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import AttachmentDataController from './AttachmentDataController';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';

function newDatasource(data = {}, name = 'selectedDatasource', field = 'member') {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'ticketid',
    name: name,
  });
  return ds;
}

it('onDatasourceInitialized test ', async () => {
  const controller = new AttachmentDataController();
  const app = new Application();
  const page = new Page({
    name: 'main'
  });

  app.client = {
    userInfo: {
      personId: 'wilson'
    }
  };

  const ds = newDatasource({}, 'attachmentListDS');
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

});
