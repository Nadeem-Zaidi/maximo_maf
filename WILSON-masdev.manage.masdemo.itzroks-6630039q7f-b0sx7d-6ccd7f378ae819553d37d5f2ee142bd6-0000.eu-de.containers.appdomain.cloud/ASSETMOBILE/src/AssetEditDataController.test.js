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

import AssetEditDataController from "./AssetEditDataController";
import {Application, Page, JSONDataAdapter, Datasource, Device} from "@maximo/maximo-js-api";
import assetitem from "./test/asset-list-json-data";
import manufactures from "./test/manufacture-list-json-data";
import vendors from "./test/vendor-list-json-data";
import failureCode from "./test/failureCode-list-json-data";
import synonymData from './test/synonym-db-json-data';
import sinon from 'sinon';
import assettypes from "./test/type-list-json-data";
import location from "./test/location-json-data";
import classificationData from "./test/classificationdata";
import assetSpecItems from "./test/asset-spec-json-data";
import assetAttributedata from "./test/assetAttribute-json-data";

function newDatasource(data, name = "dsEditAsset") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: "assetnum",
    name: name,
  });

  return ds;
}


let setData = {
  member: [
    {
      assetuid: 127,
      _rowstamp: "858405",
      _imagelibref: "oslc/images/47",
      assetnum: "13110",
      description: "Feeder System With Long Desc",
      moddowntimehist_collectionref: "oslc/os/mxapiasset/_MTMxMTAvQkVERk9SRA--/moddowntimehist",
      href: "oslc/os/mxapiasset/_MTMxMTAvQkVERk9SRA--",
    }
  ]
};

it('should save edited Asset ', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  }
  const page = new Page({name: 'editasset'});
  
  const ds = newDatasource(assetitem , 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let updatedAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4"
    }
  };

  ds.currentItem = updatedAsset.item;
  let savestub = sinon.stub(ds, 'save').returns(true);

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.errorMessage = '';
  page.state.editAssetsLocation = false;
  //await expect(app.currentPage.name).toBe("editasset");

  await controller.updateAsset(updatedAsset);

  window.setTimeout(() => {
    expect(savestub.called).toBe(true);
    expect(savestub.displayName).toBe('save');
  }, 500);

  Device.get().isMaximoMobile = false;
  await controller.updateAsset(updatedAsset);
  window.setTimeout(() => {
    expect(savestub.called).toBe(true);
    expect(savestub.displayName).toBe('save');
  }, 500);
});


it("it should set saveDataSuccessful to false ", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({name: 'editasset'});
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  controller.onSaveDataFailed();
  expect(controller.saveDataSuccessful).toBe(false);      
});

it("it should set editorValue on change", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  let evt = {
    target: {
      content: "<p>Test</p>",
    },
  };
  controller.onEditorChange(evt);
  expect(page.state.editorValue).toBe(evt.target.content);
});

it("it should set editorValue on save", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();

  controller.onEditorSave();
  expect(page.state.editorValue).toBe(null);
});

it("it should show saveDiscardDialog on dialog back", async () => {
  let mockedFn = jest.fn();
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  page.showDialog = mockedFn;
  app.registerController(controller);
  app.registerPage(page);
  page.state.editorValue = "<p>Test</p>";
  app.lastPage = { name: "editasset" };
  await app.initialize();

  controller.onCloseRichTextDialog();
  expect(page.showDialog.mock.calls.length).toEqual(1);
});

it("it should close dialog and reset editorValue value", async () => {
  let mockedFn = jest.fn();
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  page.showDialog = mockedFn;
  app.registerController(controller);
  app.registerPage(page);
  page.state.editorValue = "<p>Test</p>";
  app.lastPage = { name: "editasset" };
  await app.initialize();

  controller.closeSaveDiscardDialog();
  expect(page.state.editorValue).toBe(null);
});

it("it should close dialog and reset editorValue value", async () => {
  
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  let evt = {
    datasource: ds,
  };
  controller.setRichTextValue(evt);
  expect(ds.item.description_longdescription).toBe("<p>Test</p>");
});

it("it should scan the Serial barcode and give value", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  let evt = {
    datasource: ds,
    value: 'dummy'
  };
  controller.handleSerialBarcodeScan(evt);
  expect(ds.item.serialnum).toBe(ds.item.serialnum);
});

it("it should validate proper value in the hasValue function", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  page.registerDatasource(ds);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  let evt = {
    datasource: ds,
    value: 'dummy'
  };
  expect(controller.hasValue("assetnum", "12344")).toBe(true);
  expect(controller.hasValue("assetnum", "")).toBe(false);
  expect(controller.hasValue(null, "123")).toBe(false);
});


it("it should set validManufacturer flag if value exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const manufactureDS = newDatasource(manufactures, 'dsManufacture');
  sinon.stub(manufactureDS, 'initializeQbe').returns(true);
  sinon.stub(manufactureDS, 'searchQBE').returns([manufactures.member[0]]);
  sinon.stub(manufactureDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(manufactureDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateManufacture();
  expect(page.state.validManufacture).toBe(true);
});

it("it should reset validManufacturer flag if value does not exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const manufactureDS = newDatasource(manufactures, 'dsManufacture');
  sinon.stub(manufactureDS, 'initializeQbe').returns(true);
  sinon.stub(manufactureDS, 'searchQBE').returns([]);
  sinon.stub(manufactureDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(manufactureDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateManufacture();
  expect(page.state.validManufacture).toBe(false);
});

it("it should set validVendor flag if value exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const vendorDS = newDatasource(vendors, 'dsVendor');
  sinon.stub(vendorDS, 'initializeQbe').returns(true);
  sinon.stub(vendorDS, 'searchQBE').returns([vendors.member[0]]);
  sinon.stub(vendorDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(vendorDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateVendor();
  expect(page.state.validVendor).toBe(true);
});

it("it should reset validVendor flag if value does not exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const vendorDS = newDatasource(vendors, 'dsVendor');
  sinon.stub(vendorDS, 'initializeQbe').returns(true);
  sinon.stub(vendorDS, 'searchQBE').returns([]);
  sinon.stub(vendorDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(vendorDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateVendor();
  expect(page.state.validVendor).toBe(false);
});

it("it should set validFailureCode flag if value exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const failureCodeDS = newDatasource(failureCode, 'dsFailureList');
  sinon.stub(failureCodeDS, 'initializeQbe').returns(true);
  sinon.stub(failureCodeDS, 'searchQBE').returns([failureCode.member[0]]);
  sinon.stub(failureCodeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(failureCodeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateFailureCode();
  expect(page.state.validFailureCode).toBe(true);
});

it("it should reset validFailureCode flag if value does not exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const failureCodeDS = newDatasource(failureCode, 'dsFailureList');
  sinon.stub(failureCodeDS, 'initializeQbe').returns(true);
  sinon.stub(failureCodeDS, 'searchQBE').returns([]);
  sinon.stub(failureCodeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(failureCodeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateFailureCode();
  expect(page.state.validFailureCode).toBe(false);
});

it("it should set validType flag if value exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const typeDS = newDatasource(assettypes, 'synonymdomainData');
  sinon.stub(typeDS, 'initializeQbe').returns(true);
  sinon.stub(typeDS, 'searchQBE').returns([assettypes.member[0]]);
  sinon.stub(typeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(typeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateType();
  expect(page.state.validType).toBe(true);
});

it("it should reset validType flag if value does not exists", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const typeDS = newDatasource(assettypes, 'synonymdomainData');
  sinon.stub(typeDS, 'initializeQbe').returns(true);
  sinon.stub(typeDS, 'searchQBE').returns([]);
  sinon.stub(typeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(typeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.validateType();
  expect(page.state.validType).toBe(false);
});

it("it should open Manufacture dialog", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  let mockedFn = jest.fn();
  page.showDialog = mockedFn;
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const synonymDS = newDatasource(synonymData, 'synonymdomainData');
  sinon.stub(synonymDS, 'initializeQbe').returns(true);
  sinon.stub(synonymDS, 'searchQBE').returns([synonymData.member[0]]);
  sinon.stub(synonymDS, 'setQBE').returns(true);

  const manufactureDS = newDatasource(manufactures, 'dsManufacture');
  sinon.stub(manufactureDS, 'initializeQbe').returns(true);
  sinon.stub(manufactureDS, 'searchQBE').returns([manufactures.member[0]]);
  sinon.stub(manufactureDS, 'setQBE').returns(true);

  app.registerDatasource(synonymDS);
  page.registerDatasource(ds);
  page.registerDatasource(manufactureDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  controller.openManufacturerLookup();
  expect(page.showDialog.mock.calls).toBeDefined();
});

it("it should open Vendor dialog", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  let mockedFn = jest.fn();
  page.showDialog = mockedFn;
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const synonymDS = newDatasource(synonymData, 'synonymdomainData');
  sinon.stub(synonymDS, 'initializeQbe').returns(true);
  sinon.stub(synonymDS, 'searchQBE').returns([synonymData.member[0]]);
  sinon.stub(synonymDS, 'setQBE').returns(true);
  app.registerDatasource(synonymDS);

  const vendorDS = newDatasource(manufactures, 'dsVendor');
  sinon.stub(vendorDS, 'initializeQbe').returns(true);
  sinon.stub(vendorDS, 'searchQBE').returns([manufactures.member[0]]);
  sinon.stub(vendorDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(vendorDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  controller.openVendorLookup();
  expect(page.showDialog.mock.calls).toBeDefined();
});

it("it should select failure code", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  let mockedFn = jest.fn();
  page.showDialog = mockedFn;
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const failureCodeDS = newDatasource(failureCode, 'dsFailureList');
  sinon.stub(failureCodeDS, 'initializeQbe').returns(true);
  sinon.stub(failureCodeDS, 'searchQBE').returns([failureCode.member[0]]);
  sinon.stub(failureCodeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(failureCodeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();

  controller.openFailureClassLookup();
  expect(page.showDialog.mock.calls).toBeDefined();

  const item = {
    failurecode: {
      failurecode: "404"
    }
  }

  const computeFailureCode = controller.computedFailureCode(item);
  const itemSelected = {
    computeFailureCode: computeFailureCode,
    failurecode: {
      failurecode: "PIPE",
      description: "Pipe Failure",
    }
  }

  await controller.chooseFailureCode(itemSelected);
  expect(ds.item.failurecode).toBe("404");
});

it("it should open Failure dialog", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  let mockedFn = jest.fn();
  page.showDialog = mockedFn;
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const failureCodeDS = newDatasource(failureCode, 'dsFailureList');
  sinon.stub(failureCodeDS, 'initializeQbe').returns(true);
  sinon.stub(failureCodeDS, 'searchQBE').returns([failureCode.member[0]]);
  sinon.stub(failureCodeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(failureCodeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  controller.openFailureClassLookup();
  expect(page.showDialog.mock.calls).toBeDefined();
});

it("it should open Type dialog", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  let mockedFn = jest.fn();
  page.showDialog = mockedFn;
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const typeDS = newDatasource(manufactures, 'synonymdomainData');
  sinon.stub(typeDS, 'initializeQbe').returns(true);
  sinon.stub(typeDS, 'searchQBE').returns([manufactures.member[0]]);
  sinon.stub(typeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(typeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  controller.openTypeLookup();
  expect(page.showDialog.mock.calls).toBeDefined();
});

it("it should select manufacturer", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const manufactureDS = newDatasource(manufactures, 'dsManufacture');
  sinon.stub(manufactureDS, 'initializeQbe').returns(true);
  sinon.stub(manufactureDS, 'searchQBE').returns([manufactures.member[0]]);
  sinon.stub(manufactureDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(manufactureDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();


  const itemSelected = {
    company: 'KJ'
  }
  await controller.chooseManufacturer(itemSelected);
  expect(ds.item.manufacturer).toBe("KJ");
});


it("it should select Vendor", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const vendorDS = newDatasource(vendors, 'dsVendor');
  sinon.stub(vendorDS, 'initializeQbe').returns(true);
  sinon.stub(vendorDS, 'searchQBE').returns([]);
  sinon.stub(vendorDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(vendorDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();


  const itemSelected = {
    company: 'KJ'
  }
  await controller.chooseVendor(itemSelected);
  expect(ds.item.vendor).toBe("KJ");
});

it("it should select Type", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const typeDS = newDatasource(vendors, 'synonymdomainData');
  sinon.stub(typeDS, 'initializeQbe').returns(true);
  sinon.stub(typeDS, 'searchQBE').returns([]);
  sinon.stub(typeDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(typeDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();

  const itemSelected = {
    value: 'BUS'
  }
  await controller.chooseType(itemSelected);
  controller.chooseAssetLocation({location:"loc-abc"});
  expect(ds.item.assettype).toBe("BUS");
});

it("it should select location", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns(location.member);
  sinon.stub(locationDS, 'setQBE').returns(true);
  
  page.registerDatasource(ds);
  page.registerDatasource(locationDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.chooseAssetItem(assetitem.member[0]);
  await controller.chooseParent(assetitem.member[0]);
  expect(ds.item.location).toBe(assetitem.member[0].location);
})

it("it should select Parent", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const synonymDS = newDatasource(synonymData, 'synonymdomainData');
  sinon.stub(synonymDS, 'initializeQbe').returns(true);
  sinon.stub(synonymDS, 'searchQBE').returns([synonymData.member[0]]);
  sinon.stub(synonymDS, 'setQBE').returns(true);
  app.registerDatasource(synonymDS);

  page.registerDatasource(ds);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();

  const itemSelected = {
    assetnum: 'AST101'
  }
  await controller.chooseParent(itemSelected);
  expect(ds.item.parent).toBe(undefined);
});

it("if should handle bar code scanner for location", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns(location.member);
  sinon.stub(locationDS, 'setQBE').returns(true);
  app.registerDatasource(locationDS);

  page.registerDatasource(ds);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  const itemSelected = {
    value: 'AST101'
  }
  controller.handleLocationBarcodeScan(itemSelected);
  expect(ds.item.location).toBe("AST101");
  controller.handleLocationBarcodeScan({});
});

it("it should select Parent with no location", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns(location.member);
  sinon.stub(locationDS, 'setQBE').returns(true);
  page.registerDatasource(ds);
  app.registerDatasource(locationDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  const itemSelected = {
    location: 'AST101'
  }
  await controller.chooseAssetItem(itemSelected);
  expect(ds.item.location).toBe("AST101");
});


it("verify validate location", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');

  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns(location.member);
  sinon.stub(locationDS, 'setQBE').returns(true);

  page.registerDatasource(ds);
  app.registerDatasource(locationDS);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  await controller.chooseAssetItem(assetitem.member[0]);
  await controller.validateLocation();
  expect(page.state.validLocation).toBe(true);
  
  await controller.chooseAssetItem(assetitem.member[0]);
  ds.item.location = "no-location";
  await controller.validateLocation();
  expect(page.state.validLocation).toBe(false);
})


it('should save updated Asset while selecting location different then parent asset ', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  }
  const page = new Page({name: 'createasset'});
  const parentDS = newDatasource(assetitem, 'dsParent');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns([location.member[1]]);
  sinon.stub(locationDS, 'setQBE').returns(true);
  
  const ds = newDatasource(assetitem , 'dsEditAsset');

  page.registerDatasource(ds);
  page.registerDatasource(parentDS);
  app.registerDatasource(locationDS);


  app.registerController(controller);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let newAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4"
    }
  };

  ds.currentItem = newAsset.item;
  let savestub = sinon.stub(ds, 'save').returns(true);

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.errorMessage = '';
  page.state.editAssetsLocation = false;

  let assetObj = JSON.parse(JSON.stringify(assetitem.member[0]));
  await controller.chooseAssetItem(assetObj);
  await controller.updateAsset(newAsset);
  expect(ds.item.location).toBe("OFF301");
  expect(ds.item.parent).toBe(undefined);
});


it('should save updated Asset while selecting location same as parent asset ', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  }
  const page = new Page({name: 'createasset'});
  const parentDS = newDatasource(assetitem, 'dsParent');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns([location.member[0]]);
  sinon.stub(locationDS, 'setQBE').returns(true);
  
  const ds = newDatasource(assetitem , 'dsEditAsset');

  page.registerDatasource(ds);
  page.registerDatasource(parentDS);
  app.registerDatasource(locationDS);


  app.registerController(controller);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let newAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4"
    }
  };

  ds.currentItem = newAsset.item;
  let savestub = sinon.stub(ds, 'save').returns(true);

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.errorMessage = '';
  page.state.editAssetsLocation = false;

  await controller.chooseAssetItem({});
  await controller.updateAsset(newAsset);
  expect(ds.item.location).toBe(undefined);
});

it("it should set parent asset and location on parent asset", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  const parentDS = newDatasource(assetitem, 'dsParent');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns([location.member[0]]);
  sinon.stub(locationDS, 'setQBE').returns(true);
  
  page.registerDatasource(ds);
  page.registerDatasource(parentDS);
  app.registerDatasource(locationDS);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.chooseAssetItem(assetitem.member[0]);
  await controller.chooseParent(assetitem.member[0]);
  await controller.changeLoctionLookup();
  expect(ds.item.location).toBe(undefined);
});
it("it should set parent location and single location in  lookup on parent asset selection", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  const parentDS = newDatasource(assetitem, 'dsParent');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns(location.member[0]);
  sinon.stub(locationDS, 'setQBE').returns(true);
  
  page.registerDatasource(ds);
  page.registerDatasource(parentDS);
  app.registerDatasource(locationDS);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();
  
  await controller.loadLocationLookup();
  expect(ds.item.location).toBe(assetitem.member[0].location);
});

it("it should update parent flag after invoke action", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const ds = newDatasource(assetitem, 'dsEditAsset');
  const parentDS = newDatasource(assetitem, 'dsParent');
  const locationDS = newDatasource(location, 'locationLookupDS');
  sinon.stub(locationDS, 'initializeQbe').returns(true);
  sinon.stub(locationDS, 'searchQBE').returns(location.member[0]);
  sinon.stub(locationDS, 'setQBE').returns(true);
  sinon.stub(ds, 'invokeAction').returns(true);
  
  page.registerDatasource(ds);
  page.registerDatasource(parentDS);
  app.registerDatasource(locationDS);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await ds.load();

  const item = {
    newLocation: "TEMPLOC",
    newSite: "BEDFORD2",
    newParent: "PARENT_ID"
  };

  controller.moveAsset(item);
  expect(page.state.parentUpdatedFailed).toBe(false);
});

it("it should set specification in asset for selected classification", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const editDs = newDatasource(assetitem, 'dsEditAsset');
  const dummySpecificationDs = newDatasource([], 'assetSpecificationEditTempDS');
  
  page.registerDatasource(editDs);
  page.registerDatasource(dummySpecificationDs);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await editDs.load();
  
  const itemSelected = classificationData.member[17];

  await controller.changeClassification(itemSelected);
  expect(dummySpecificationDs.items).toEqual(itemSelected.classspec);
});

it("it should not set specification in asset for classification, if classification do not have it", async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  const page = new Page({ name: "editasset" });
  const editDs = newDatasource(assetitem, 'dsEditAsset');
  const dummySpecificationDs = newDatasource([], 'assetSpecificationEditTempDS');
  
  page.registerDatasource(editDs);
  page.registerDatasource(dummySpecificationDs);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "editasset" };
  await app.initialize();
  await editDs.load();
  
  const itemSelected = classificationData.member[16];

  await controller.changeClassification(itemSelected);
  expect(dummySpecificationDs.items).toEqual(itemSelected.classspec);
});

it('should save edited Asset with classification ', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  }
  const page = new Page({name: 'editasset'});
  
  const ds = newDatasource(assetitem , 'dsEditAsset');
  const dummySpecificationDs = newDatasource([], 'assetSpecificationEditTempDS');
  const originalDs = newDatasource(assetSpecItems, 'assetSpecificationEditDSOriginal');

  const assetAttributeDS = newDatasource(assetAttributedata, 'assetAttributeDS');
  sinon.stub(assetAttributeDS, 'getItems').returns(assetAttributedata.member);
  sinon.stub(assetAttributeDS, 'initializeQbe').returns(true);
  sinon.stub(assetAttributeDS, 'searchQBE').returns([assetAttributedata.member[0]]);
  sinon.stub(assetAttributeDS, 'setQBE').returns(true);
  sinon.stub(assetAttributeDS, 'clearQBE').returns(true);

  page.registerDatasource(ds);
  page.registerDatasource(dummySpecificationDs);
  page.registerDatasource(originalDs);
  app.registerController(controller);
  app.registerDatasource(assetAttributeDS);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let updatedAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4"
    }
  };

  ds.currentItem = updatedAsset.item;
  let savestub = sinon.stub(ds, 'save').returns(true);
  sinon.stub(originalDs, 'deleteItems').returns(true);

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.errorMessage = '';
  page.state.editAssetsLocation = false;

  const itemSelected = classificationData.member[17];
  await controller.changeClassification(itemSelected);
 
  await controller.updateAsset(updatedAsset);
  expect(ds.currentItem.assetspec.length).toEqual(3);
  expect(ds.currentItem.assetspeccount).toEqual(3);
});

it('should return Asset Movement allowed true when user have permission and location is different than original location', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => true,
    findSigOption: (appName, sigoption) => true,
  }
  const page = new Page({name: 'editasset'});
  app.registerController(controller);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let updatedAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4",
        "location": "PT200"
    }
  };

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.assetOriginalLocation = 'PT100';

  const  assetMoved = await controller.checkAssetMoveAllowed(updatedAsset.item);
  expect(assetMoved).toEqual(true);
});

it('should return Asset Movement allowed false when user not have permission and location is different than original location', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => false,
    findSigOption: (appName, sigoption) => false,
  }
  const page = new Page({name: 'editasset'});
  app.registerController(controller);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let updatedAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4",
        "location": "PT200"
    }
  };

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.assetOriginalLocation = 'PT100';

  const  assetMoved = await controller.checkAssetMoveAllowed(updatedAsset.item);
  expect(assetMoved).toEqual(false);
});

it('should return Asset Movement allowed false when user have permission and location is same as original location', async () => {
  const controller = new AssetEditDataController();
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertSite: 'BEDFORD'
    }, 
    checkSigOption: (option) => false,
    findSigOption: (appName, sigoption) => false,
  }
  const page = new Page({name: 'editasset'});
  app.registerController(controller);
  app.registerPage(page);
  
  Device.get().isMaximoMobile = true;
  let updatedAsset = {
    item : {
        "assetid": "1134",
        "assetnum":"Asset 4",
        "siteid":"BEDFORD",
        "description":"New asset 4",
        "long_description":"Long new asset 4",
        "location": "PT200"
    }
  };

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.assetOriginalLocation = 'PT200';

  const  assetMoved = await controller.checkAssetMoveAllowed(updatedAsset.item);
  expect(assetMoved).toEqual(false);
});