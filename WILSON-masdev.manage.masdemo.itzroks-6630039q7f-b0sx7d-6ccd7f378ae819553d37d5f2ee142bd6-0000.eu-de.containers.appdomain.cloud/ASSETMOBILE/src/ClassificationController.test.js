/*
 * Licensed Materials - Property of IBM
 *
 * 5737-M60, 5737-M66
 *
 * (C) Copyright IBM Corp. 2021,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import ClassificationController from './ClassificationController';
import classificationData from './test/classificationdata';  
import filteredClassificationData from './test/filteredClassificationData-json-data';  
import {Application,Datasource,JSONDataAdapter,Page,} from "@maximo/maximo-js-api";

function newClassificationDS(
  data = classificationData,
  items = "member",
  idAttribute = "classstructureid",
  name = "classListDummyDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

function newFilteredClassificationData(
  data = filteredClassificationData,
  items = "member",
  idAttribute = "classstructureid",
  name = "filteredClassificationDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });
  return ds;
}

it('initializes datasource', async () => {
  global.open = jest.fn();

  const controller = new ClassificationController();
  const app = new Application();
  const page = new Page({ name: "createasset" }); 
  app.registerPage(page);
  app.registerController(controller);
  const classListDummyDS = newClassificationDS(classificationData, "classListDummyDS");
  app.registerDatasource(classListDummyDS);  
  await app.initialize();

  expect(classListDummyDS.dataAdapter.itemCount).not.toBe(0);
});

it('prepares classification data correctly', async () => { 
  const controller = new ClassificationController();
  const app = new Application();
  const page = new Page({ name: "createasset" }); 
  app.registerPage(page);
  app.registerController(controller);

  const filteredClassificationDS = newFilteredClassificationData(filteredClassificationData, "filteredClassificationDS");
  app.registerDatasource(filteredClassificationDS);  
  await app.initialize();

  expect(filteredClassificationDS.dataAdapter.itemCount).not.toBe(0);
});

it('It should filter the data for assets', async () => { 
  const controller = new ClassificationController();
  const app = new Application();
  const page = new Page({ name: "createasset" }); 
  const filteredClassificationDS = newFilteredClassificationData(filteredClassificationData, "filteredClassificationDS");
  app.registerPage(page);
  app.registerController(controller);
  controller.onDatasourceInitialized(filteredClassificationDS, "", app);

  app.registerDatasource(filteredClassificationDS);  
  await app.initialize();

  let listRes = controller.assetObjects({
    
      "useclassindesc": true,
      "parent": "1145",
      "classusewith": [
        {
          "objectname": "WOACTIVITY"
        },
        {
          "objectname": "SOLUTION"
        },
        {
          "objectname": "ASSET"
        },
        {
          "objectname": "PROBLEM"
        },
        {
          "objectname": "SR"
        },
        {
          "objectname": "WORELEASE"
        },
      ], 
  });  
  expect(listRes.length).toBe(undefined);  

});

it('It should convert from list to tree', async () => { 
  const controller = new ClassificationController();
  const app = new Application();
  const page = new Page({ name: "createasset" }); 
  app.registerPage(page);
  app.registerController(controller);
  
  await app.initialize();
  let listRes = controller.list_to_tree(classificationData);  
  expect(listRes).not.toBe(0); 

});

it('It should remove invalid classification', async () => { 
  const controller = new ClassificationController();
  const app = new Application();
  const page = new Page({ name: "createasset" }); 
  app.client = {
    userInfo: {
      personid: "SAM",
      defaultSite: 'BEDFORD',
    },
  };
  app.registerPage(page);
  app.registerController(controller);
  
  const classListDummyDS = newClassificationDS(classificationData, "classListDummyDS");
  app.registerDatasource(classListDummyDS);  
  await app.initialize();
  controller.onDatasourceInitialized(classListDummyDS,'wilson', app)

  let listRes = controller.filterInvalidClassifications(classificationData.member);  
  expect(listRes).not.toBe(classificationData.member);
});