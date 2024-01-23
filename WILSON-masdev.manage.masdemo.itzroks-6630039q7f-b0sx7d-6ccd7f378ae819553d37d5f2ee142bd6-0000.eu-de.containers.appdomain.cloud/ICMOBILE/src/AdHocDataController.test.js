/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import AdHocDataController from './AdHocDataController';
import {
  Application,
  Datasource, 
  Device,
  JSONDataAdapter,
  Page
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import invbalanceitem from './test/test-invbalance-data';

function newDatasource(data = invbalanceitem, name = 'mxapiinvbalds') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });
  
  const cinvbalancesds = new Datasource(da, {
    idAttribute: 'invbalancesid',
    name: name,
  });
  
  return cinvbalancesds;
}

function newCountedDatasource(data = invbalanceitem, name = 'mxapiinvbaldscounted') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });
  
  const cinvbalancesds = new Datasource(da, {
    idAttribute: 'invbalancesid',
    name: name,
  });
  
  return cinvbalancesds;
}

it('onDatasourceInitialized test ', async () => {
  const controller = new AdHocDataController();
  const app = new Application();
  const page = new Page({
    name: 'adHoc'
  });

  const ds = newDatasource(invbalanceitem, 'mxapiinvbalds');
  ds.registerController(controller);
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);
}); 

