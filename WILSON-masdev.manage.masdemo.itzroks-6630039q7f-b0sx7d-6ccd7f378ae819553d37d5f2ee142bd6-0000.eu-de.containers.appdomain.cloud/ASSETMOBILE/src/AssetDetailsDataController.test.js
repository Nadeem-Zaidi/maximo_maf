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

import AssetDetailsDataController from "./AssetDetailsDataController";
import assetitem from "./test/asset-list-json-data.js";
import {Application,Datasource,JSONDataAdapter,Page, Device} from "@maximo/maximo-js-api";

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
    idAttribute: "computedParentAssetDescription",
    name: name,
  });
  return ds;
}

it("computedAssetStatus returns status", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetList" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetListDS");

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);

  let assetStatus = controller.computedAssetStatus({
    status_description: 'operating'
    
  });  
  expect(assetStatus[0].label ).toBe("operating");  

});


it('computedReading returns expected data', async () => {
  const controller = new AssetDetailsDataController();
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

it("computedVendor returns Vendor Details", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);

  let vendorName = controller.computedVendor({
    vendor: 'ELECTRON',
    vendorname: 'Electronic Super Supply'
    
  });  
  expect(vendorName).toBe("ELECTRON Electronic Super Supply");  

});

it("computedManufacturer returns Manufacturer Details", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);

  let manufacturerName = controller.computedManufacturer({
    manufacturer: 'ELECTRON',
    manufacturername: 'Electronic Super Supply'
    
  });  
  expect(manufacturerName).toBe("ELECTRON Electronic Super Supply"); 
}); 

it("computedFailurecode returns Failurecode Details", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);

  let detail = controller.computedFailurecode({
    failurecode: 'PUMP',
    failurecodedesc: 'Pump Failure'
    
  });  
  expect(detail).toBe("PUMP Pump Failure");  
});

it("computedLocation returns location Details", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);

  let detail = controller.computedLocation({
    location: 'SAN101',
    locationdesc: 'Sanitary Pipe Segment #101'
    
  });  
  expect(detail).toBe("SAN101 Sanitary Pipe Segment #101");  
});

it("computedDocLinksCount returns attachment counts after attachment added", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");
  Device.get ().isMaximoMobile = true;

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);


  app.state.doclinksCountData = { "29Aug23" : 9 }
  app.state.doclinksCountDataUpdated = true;

  let linkCount = controller.computedDocLinksCount({
    assetnum: '29Aug23',
    doclinks: {
      member: [{
        name: "image1"
      },{
        name: "image2"
      }]
    }
    
  });  
  expect(linkCount).toBe(9);  
});

it("computedDocLinksCount returns attachment counts from doclink on web", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");
  Device.get ().isMaximoMobile = false;

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);


  app.state.doclinksCountData = { "29Aug23" : 9 }
  app.state.doclinksCountDataUpdated = false;

  let linkCount = controller.computedDocLinksCount({
    assetnum: '29Aug23',
    doclinkscount: 2,
  });  
  expect(linkCount).toBe(2);  
});

it("computedDocLinksCount returns attachment counts from doclink on mobile", async () => {
  const controller = new AssetDetailsDataController();
  const app = new Application();
  const page = new Page({ name: "assetDetails" });
  app.registerPage(page);
  const ds = newDatasource(assetitem, "assetDetails");
  Device.get ().isMaximoMobile = true;

  page.registerDatasource(ds);
  app.initialize();
  controller.onDatasourceInitialized(ds, "", app);


  app.state.doclinksCountData = { "29Aug23" : 9 }
  app.state.doclinksCountDataUpdated = false;

  let linkCount = controller.computedDocLinksCount({
    assetnum: '29Aug23',
    doclinks: {
      member: [{
        name: "image1"
      },{
        name: "image2"
      },{
        name: "image3"
      }]
    }
    
  }); 
  expect(linkCount).toBe(3);  
});