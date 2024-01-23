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

import DoclinksDataController from '../DoclinksDataController';

it('datasource initialize', async () => {
  // setup a mock application and register out controller
  const controller = new DoclinksDataController();
  const app = {name: 'testApp'};
  const page = {name: 'testPage'};
  const ds = {
    name: 'testDs',
    addIgnoreField: () => 'test'
  };

  controller.onDatasourceInitialized(ds,page,app);

  expect(controller.datasource).toBe(ds);
  expect(controller.app).toBe(app);
  expect(controller.owner).toBe(page);
});


it('datasource onAfterLoadData', async () => {
  // setup a mock application and register out controller
  const controller = new DoclinksDataController();
  let resut = false;
  const ds = {
    name: 'testDs',
    addIgnoreField: () => 'test',
    emit: ()=>{resut = true }
  };


  controller.onAfterLoadData(ds, {});
  expect(resut).toBe(true);
});