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

import MaterialsPageController from './MaterialsPageController';
import {Application, Page, JSONDataAdapter, Datasource} from '@maximo/maximo-js-api';

import workorderitem from './test/wo-planned-items-tools-json-data.js';

function newDatasource(data = workorderitem, name = 'pmduewolistDS',field='member') {
  const da = new JSONDataAdapter({
    src: workorderitem,
    items: field,
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name
  });

  return ds;
}


it("should load work order list data", async () => {
  const controller = new MaterialsPageController();
  const app = new Application();
  const page = new Page({name: 'materials'});
  const schedPage = new Page({name: 'schedule'});
  app.registerPage(schedPage);
  app.registerPage(page);

  schedPage.state = {selectedDS:"pmduewolistDS"};
  page.state = {selectedDS:"pmduewolistDS"};

  app.registerController(controller);
  const pmdueDS = newDatasource(workorderitem, 'pmduewolistDS','member');
  const jtoolsds = newDatasource({items:[]}, "jtoolsds",'wptool');
  const jmaterialsds = newDatasource({items:[]}, "jmaterialsds",'wpmaterial');
  schedPage.registerDatasource(pmdueDS);
  page.registerDatasource(jtoolsds);
  page.registerDatasource(jmaterialsds);
  await app.initialize();

  controller.pageInitialized(page, app);
  controller.pageResumed(page);


  let evt = {
    selectedItem:{
      id: 'pmduewolistDS'
    }
  }
  await pmdueDS.load();
  await controller.loadMaterialsToolsData(evt);

  expect(pmdueDS.dataAdapter.items.length).toBe(1);
});

it("should load work order list data", async () => {
  const controller = new MaterialsPageController();
  const app = new Application();
  const page = new Page({name: 'materials'});
  const schedPage = new Page({name: 'approvals'});
  app.registerPage(schedPage);
  app.registerPage(page);

  schedPage.state = {selectedDS:"pmduewolistDS"};
  page.state = {selectedDS:"pmduewolistDS"};

  app.registerController(controller);
  const pmdueDS = newDatasource(workorderitem, 'pmduewolistDS','member');
  const jtoolsds = newDatasource({items:[]}, "jtoolsds",'wptool');
  const jmaterialsds = newDatasource({items:[]}, "jmaterialsds",'wpmaterial');
  schedPage.registerDatasource(pmdueDS);
  page.registerDatasource(jtoolsds);
  page.registerDatasource(jmaterialsds);
  await app.initialize();

  controller.pageInitialized(page, app);
  controller.pageResumed(page);


  let evt = {
    selectedItem:{
      id: 'pmduewolistDS'
    }
  }
  await pmdueDS.load();
  await controller.loadMaterialsToolsData(evt);

  expect(pmdueDS.dataAdapter.items.length).toBe(1);
});

it("should store selected item", async () => {
  const controller = new MaterialsPageController();
  const app = new Application();
  const page = new Page({name: 'materials'});
  const schedPage = new Page({name: 'schedule'});
  app.registerPage(page);
  app.registerPage(schedPage);

  page.state = {selectedDS:"pmduewolistDS"};
  schedPage.state = {selectedDS:"pmduewolistDS"};

  app.registerController(controller);
  const pmdueDS = newDatasource(workorderitem, 'pmduewolistDS');
  const jtoolsds = newDatasource({items:[]}, "jtoolsds",'wptool');
  const jmaterialsds = newDatasource({items:[]}, "jmaterialsds",'wpmaterial');
  schedPage.registerDatasource(pmdueDS);
  page.registerDatasource(jtoolsds);
  page.registerDatasource(jmaterialsds);
  await app.initialize();

  controller.pageInitialized(page, app);
  controller.pageResumed(page);

  await pmdueDS.load();

  let materialsData = await jmaterialsds.load();

  jmaterialsds.setSelectedItem(materialsData[0],true);

  let evt ={
    datasource:'jmaterialsds'
  }

  controller.storeSelectedItem(evt)
  let selectedItemsId = page.state[page.state.selectedDS+evt.datasource];
  expect(selectedItemsId.length).toBe(1);
});

it('should send user back to last visited page', async () => {

  const controller = new MaterialsPageController();
  const app = new Application();

  const page = new Page({name: 'materials'});
  app.registerPage(page);

  const jtoolsds = newDatasource({items:[]}, "jtoolsds",'wptool');
  const jmaterialsds = newDatasource({items:[]}, "jmaterialsds",'wpmaterial');
  page.registerDatasource(jtoolsds);
  page.registerDatasource(jmaterialsds);

  let pageSetter = jest.fn();

  app.registerController(controller);
  await app.initialize();

  const originalSetter = app.setCurrentPage;
  app.setCurrentPage = pageSetter;

	controller.pageInitialized(page, app);
	
  controller.goBack();

	expect(pageSetter.mock.calls.length).toEqual(1);

  app.setCurrentPage = originalSetter;
});

it("should process materials and tools data", async () => {
  const controller = new MaterialsPageController();
  const app = new Application();
  const page = new Page({name: 'materials'});
  const schedPage = new Page({name: 'schedule'});
  app.registerPage(schedPage);
  app.registerPage(page);

  schedPage.state = {selectedDS:"pmduewolistDS"};
  page.state = {selectedDS:"pmduewolistDS"};

  app.registerController(controller);
  const pmdueDS = newDatasource(workorderitem, 'pmduewolistDS','member');
  const jtoolsds = newDatasource({items:[]}, "jtoolsds",'wptool');
  const jmaterialsds = newDatasource({items:[]}, "jmaterialsds",'wpmaterial');
  schedPage.registerDatasource(pmdueDS);
  page.registerDatasource(jtoolsds);
  page.registerDatasource(jmaterialsds);
  await app.initialize();

  controller.pageInitialized(page, app);
  controller.pageResumed(page);
  let items = await pmdueDS.load();
  
  await controller._processMaterialsTools(items);

  jmaterialsds.setSelectedItem(jmaterialsds.items[0],true);

  let evt ={
    datasource:'jmaterialsds'
  }

  controller.storeSelectedItem(evt)

  await controller._processMaterialsTools(items);

});


it("should process materials and tools data", async () => {
  const controller = new MaterialsPageController();
  const app = new Application();
  const page = new Page({name: 'materials'});
  const schedPage = new Page({name: 'approvals'});
  app.registerPage(schedPage);
  app.registerPage(page);

  schedPage.state = {selectedDS:"pmduewolistDS"};
  page.state = {selectedDS:"pmduewolistDS"};

  app.registerController(controller);
  const pmdueDS = newDatasource(workorderitem, 'pmduewolistDS','member');
  const jtoolsds = newDatasource({items:[]}, "jtoolsds",'wptool');
  const jmaterialsds = newDatasource({items:[]}, "jmaterialsds",'wpmaterial');
  schedPage.registerDatasource(pmdueDS);
  page.registerDatasource(jtoolsds);
  page.registerDatasource(jmaterialsds);
  await app.initialize();

  controller.pageInitialized(page, app);
  controller.pageResumed(page);
  let items = await pmdueDS.load();
  
  await controller._processMaterialsTools(items);

  jmaterialsds.setSelectedItem(jmaterialsds.items[0],true);

  let evt ={
    datasource:'jmaterialsds'
  }

  controller.storeSelectedItem(evt)

  await controller._processMaterialsTools(items);

});
