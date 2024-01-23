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

import { async } from "@maximo/map-component/build/ejs/framework/OfflineAreaHandler";
import AssetListDataController from "./AssetListDataController";
import assetitem from "./test/asset-list-json-data.js";
import {Application,Datasource,JSONDataAdapter,Page,} from "@maximo/maximo-js-api";

function newDatasource(
  data = assetitem,
  name = "assetListDS",
  field = "member"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: "responseInfo.schema",
  });
  const ds = new Datasource(da, {
    idAttribute: "assetnum",
    name: name,
  });
  return ds;
}

function getFeatures(count, status) {
  let features = [];
  for (let i = 0; i < count; i++) {
    let feature = {
      get: (attr) => {
        if (attr === 'maximoAttributes') {
          return {
            status_maxvalue: 'Not Ready'
          }
        }
        if (attr === 'geometry') {
          return {
            constructor: {
              name: 'point'
            }
          }
        }
      }
    }
    features.push(feature)
  }
  return features;
}

it("computedAssetDescription returns right", async () => {
  const controller = new AssetListDataController();
  const app = new Application();
  const page = new Page({ name: "assetList" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetListDS");

  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, "", app);

  let title = controller.computedAssetDescription({
    assetnum: "6I-2499",
    description: "Filter, Primary Air",
  });
  expect(title).toBe("6I-2499 Filter, Primary Air");

  title = controller.computedAssetDescription({
    assetnum: "6I-2499",
  });
  expect(title).toBe("6I-2499");

  title = controller.computedAssetDescription({
    description: "Filter, Primary Air",
  });
  expect(title).toBe("Filter, Primary Air");
});

it('Validate hide/show button for Meter', async () => {
  const controller = new AssetListDataController();
  let hideMeterButtn = controller.computedDisableMeter({
    assetmetercount: 0   
  });

  expect(hideMeterButtn).toBe(true);
});

it('Validate hide/show button for Meter', async () => {
  const controller = new AssetListDataController();
  let hideMeterButtn = controller.computedDisableMeter({
    assetmetercount: 1    
  });

  expect(hideMeterButtn).toBe(false);
});


it('computedReading returns expected data', async () => {
  const controller = new AssetListDataController();
  const app = new Application();
  const page = new Page({name: 'assetList'});
  app.registerPage(page);
   const ds = newDatasource(assetitem, "assetListDS");
  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);
  
  let item = {
    lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
  } 
  let date = controller.computedReading(item); 
  let datereading = new Date(date).toDateString();
 
  expect(datereading).toEqual("Sat Aug 01 2020");
  item = {
    lastreading: 800
  }
  date = controller.computedReading(item);  
  expect(date).toEqual("");

});

it('createSymbology single feature NOT_READY', async () => {
  let assetListDataController = new AssetListDataController();
  assetListDataController.app = new Application();
  await assetListDataController.app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  assetListDataController.app.getLocalizedLabel = mockgetLocalizedLabel;

  const params = {
      features: getFeatures(1, 'NOT_READY'),
      legends: assetListDataController.retrieveAssetLegends()
  };
  let responseJson = assetListDataController.createAssetSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('createSymbology single feature OPERATING', async() => {
  let assetListDataController = new AssetListDataController();
  assetListDataController.app = new Application();
  await assetListDataController.app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  assetListDataController.app.getLocalizedLabel = mockgetLocalizedLabel;

  const params = {
      features: getFeatures(1, 'OPERATING'),
      legends: assetListDataController.retrieveAssetLegends()
  };
  let responseJson = assetListDataController.createAssetSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('createSymbology many feature', async() => {
  let assetListDataController = new AssetListDataController();
  assetListDataController.app = new Application();
  await assetListDataController.app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  assetListDataController.app.getLocalizedLabel = mockgetLocalizedLabel;

  const params = {
      features: getFeatures(2, 'Cluster'),
      legends: assetListDataController.retrieveAssetLegends()
  };
  let responseJson = assetListDataController.createAssetSymbology(params);
  expect(responseJson).not.toBeNull();
});
