/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import InspSummaryPageController from '../InspSummaryPageController';
import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page
} from '@maximo/maximo-js-api';
import sinon from 'sinon';

import inspectionsInProgData from './data/inspections-data-inprog';

function newDatasource(data = inspectionsInProgData, name = 'testds') {
  const da = new JSONDataAdapter({
    src: inspectionsInProgData,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'inspectionresultid',
    name: name
  });

  return ds;
}

it('pageResumed shows toast when ids are not passed', async () => {
  // setup a mock application and register out controller
  const controller = new InspSummaryPageController();
  const app = new Application();
  const page = new Page();

  let spyToast = sinon.spy(app, 'toast');

  const ds = new Datasource(new JSONDataAdapter(), {
    idAttribute: 'inspectionresultid',
    name: 'name'
  });

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');

  spyToast.restore();
});

it('pageResumed loads page with page params correcly', async () => {
  const ds = new Datasource(new JSONDataAdapter(), {
    idAttribute: 'inspectionresultid',
    name: 'name'
  });

  let item = await ds.load();
  ds.item.inspectionresultid = '10';

  expect(item).not.toBe(0);
});

it('pageResumed shows toast when ids are not passed', async () => {
  // setup a mock application and register out controller
  const controller = new InspSummaryPageController();
  const app = new Application();
  const page = new Page();

  let spyToast = sinon.spy(app, 'toast');

  const ds = newDatasource(inspectionsInProgData, 'inspectionsummary');
  page.registerController(controller);
  page.registerDatasource(ds);
  page.params.inspectionresultid = [1, 2, 3];
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');

  spyToast.restore();
});
