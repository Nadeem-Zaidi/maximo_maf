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

import WorkOrderCreateController from "./WorkOrderCreateController";
import WOCreateEditUtils from "./utils/WOCreateEditUtils";
import {Application, Page, JSONDataAdapter, Datasource, Device} from "@maximo/maximo-js-api";
import worktype from "./test/worktype-json-data";
import workorderitem from './test/wo-detail-json-data.js';
import statusitem from './test/statuses-json-data.js';
import woclassitem from './test/woclass-json-data.js';
import wpmaterial from "./test/materials-json-data";
// import assetLookupData from './test/asset-lookup-json-data.js';
import sinon from 'sinon';

function newDatasource(data, name = "dsCreateWo") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: "wonum",
    name: name,
  });

  return ds;
}

function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
      idAttribute: 'value',
      name: name
  });
  return ds;
}

function newWorktypeDatasource(data = woclassitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
      idAttribute: 'value',
      name: name
  });
  return ds;
}

let setData = {
	member: [
		{
			_rowstamp: "239020",
			itemsetid: "SET1",
			href: "oslc/os/mxapiorganization/_RUFHTEVOQQ--",
			orgid: "EAGLENA",
      maxvars: [
        {
          maxvarsid: 2255,
          orgid: "EAGLENA",
          varname: "COORDINATE",
          vartype: "ORG",
          varvalue: "LATLONG",
        },
        {
          maxvarsid: 541,
          orgid: "EAGLENA",
          varname: "CLOSENORECEIVEDPO",
          vartype: "ORG",
          varvalue: "0",
        }
      ]
		}
	]
};

it("should open create Workorder page", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);

  app.registerController(controller);
  app.registerPage(page);

  const EmptyWorkOrder = "";
  const workorder = {
    wonum: "1001",
    description: "Work Order desc",
    description_longdescription: "Work Order long desc",
    wopriority: 2,
    worktype: "CAL",
    orgid: "EAGLENA",
    location : {
      location : 'SHIPPING',
      description: 'Shipping and Receiving Department'
    },
    schedfinish: "2021-06-04T05:18:00+05:30",
    schedstart: "2021-06-04T02:49:00+05:30"
  };

  const ds = newDatasource({ member: workorder }, "dsCreateWo");
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds);

  //Device.get().isMaximoMobile = true;

  let addNewstub = sinon.stub(ds, 'addNew');
  app.lastPage = { name: "createwo" };
  await app.initialize();
  controller.pageInitialized(page, app);

  
  await controller.openNewWorkOrder(EmptyWorkOrder);
  expect(addNewstub.called).toBe(true);
	expect(addNewstub.displayName).toBe('addNew');
  app.state.incomingContext = { page:'createwo',assetnum : '123232', site: 'testsite'};
  await controller.openNewWorkOrder(EmptyWorkOrder);
  expect(app.state.incomingContext).toBe(null);
	addNewstub.restore();
  
});

it("should open worktype dialog", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page();
  app.client = {
		userInfo: {
		}
  }
  
  const synonymdomainData = newWorktypeDatasource(woclassitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);
  const dsworktype = newDatasource(worktype, "dsworktype");
  page.registerDatasource(dsworktype);
  await app.initialize();

  const event_without_org = {
    item: {
      description: "HVAC overheating",
      status: "WMATL",
      status_description: "Waiting on material",
      status_maxvalue: "WMATL",
      statusdate: "2021-03-09T16:08:51+05:30",
      wonum: "1228",
      worktype: "CM",
    },
  };
  
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openWorkTypeLookup(event_without_org);
  await expect(page.state.dialogOpened).toBeFalsy();

  const event = {
    item: {
      description: "HVAC overheating",
      status: "WMATL",
      status_description: "Waiting on material",
      status_maxvalue: "WMATL",
      statusdate: "2021-03-09T16:08:51+05:30",
      wonum: "1228",
      worktype: "CM",
      orgid: "EAGLENA",
      schedfinish: "2021-06-04T05:18:00+05:30",
      schedstart: "2021-06-04T02:49:00+05:30"
    },
  };

  app.client = {
		userInfo: {
			personid: 'SAM',
			insertSite: 'BADFORD',
      insertOrg: 'EAGLENA',
		}
  }

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openWorkTypeLookup(event);
  await expect(page.state.dialogOpened).toBeTruthy();
});

it('Save Work Order', async () => {

  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({name: 'createwo'});
  const ds2 = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);

  app.registerDatasource(ds2);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  app.registerController(controller);
  app.registerPage(page);
  Device.get().isMaximoMobile = true;
    let workorder = {item : {
      wonum: "1001",
      description: "Work Order desc",
      description_longdescription: "Work Order long desc",
      wopriority: 2,
      worktype: "CAL",
      orgid: "EAGLENA",
      assetnum: '12300',
      assetdesc: 'Electric cart',
      location : {
        location : 'SHIPPING',
        description: 'Shipping and Receiving Department'
      }
    }
     
   };

  let savestub = sinon.stub(ds2, 'save');

  let NoItemEvent = {
  }
  app.state.currentMapData = {
    coordinate: [12.12121212,12.12121212]
  }
  app.lastPage = { name: "createwo" };
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.errorMessage = '';
  page.state.editAssetsLocation = false;
  sinon.stub(controller,'getMaxvars').returns({maxVars:[{varvalue:'LATLONG'}]});
  await controller.createWorkorder(NoItemEvent);
  await expect(app.currentPage.name).toBe("createwo");

  await controller.createWorkorder(workorder);

  window.setTimeout(() => {
    expect(savestub.called).toBe(true);
    expect(savestub.displayName).toBe('save');
    expect(app.currentPage.name).toBe("workOrderDetails");
  }, 500);

  Device.get().isMaximoMobile = false;
  await controller.createWorkorder(workorder);
  window.setTimeout(() => {
    expect(savestub.called).toBe(true);
    expect(savestub.displayName).toBe('save');
    expect(app.currentPage.name).toBe("workOrderDetails");
  }, 500);

  page.state.errorMessage = 'Priority 1000 is not a valid priority value between 0 and 999';
  await controller.createWorkorder(workorder);
  expect(controller.saveDataSuccessful).toBe(false);
});

it('Do not Save Work Order', async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({name: 'createwo'});
  const ds2 = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);

  app.registerDatasource(ds2);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  app.registerController(controller);
  app.registerPage(page);
  Device.get().isMaximoMobile = true;

  let savestub = sinon.stub(ds2, 'save');

  let NoItemEvent = {
  }
  app.state.currentMapData = {
    coordinate: [12.12121212,12.12121212]
  }
  app.lastPage = { name: "createwo" };
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.errorMessage = '';
  page.state.editAssetsLocation = true;
  sinon.stub(controller,'getMaxvars').returns({maxVars:[{varvalue:'LATLONG'}]});
  await controller.createWorkorder(NoItemEvent);

  window.setTimeout(() => {
    expect(savestub.called).not.toBe(true);
    expect(savestub.displayName).not.toBe('save');
    expect(app.currentPage.name).not.toBe("workOrderDetails");
    expect(page.state.saveInProgress).toBeTruthy();
  }, 500);
});



it('validate Fields', async () => {

  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({name: 'createwo'});

  const ds2 = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  ds2.state.dataLoaded = true;
  app.registerDatasource(ds2);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);  
  page.state.minPriority = 0;
  page.state.maxPriority = 999;
  app.lastPage = { name: "createwo" };
  await app.initialize();
  
  controller.pageInitialized(page, app);

  let items = await ds2.load();  
  items[0].wopriority=1000;
  
  await controller.validateFields();
  expect(page.state.readOnlyState).toBe(true);
  window.setTimeout(() => {
  expect(app.currentPage.name).toBe("createwo");
  }, 1);

  items[0].wopriority=1;
  items[0].schedstart='2020-11-02T00:00:00.000+05:30';
  items[0].schedfinish='2020-11-01T00:00:00.000+05:30';

  await controller.validateFields();
  expect(page.state.errorMessage).toBe('The start date must be before the finish date')
  window.setTimeout(() => {
  expect(app.currentPage.name).toBe("createwo");
  }, 1);

  items[0].estdur = -1;
  await controller.validateFields();
  expect(page.state.errorMessage).toBe('The duration should be positive value');

  items[0].description = "";
  await controller.validateFields();
  expect(page.state.readOnlyState).toBe(true);
  window.setTimeout(() => {
    expect(app.currentPage.name).toBe("createwo");
    }, 1);

  items[0].worktype = "";
  await controller.validateFields();
  expect(page.state.readOnlyState).toBe(true);

});

 it("handle close of cretae workorder page", async () => {
   const controller = new WorkOrderCreateController();
   const app = new Application();
   const page = new Page({ name: "schedule" });
   const ds = newDatasource(workorderitem, 'dsCreateWo');
   const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
   const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
   app.registerDatasource(assetLookupDS);
   app.registerDatasource(locationLookupDS);
   page.registerDatasource(ds);
   const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
   app.registerDatasource(synonymdomainData);
   app.registerController(controller);
   app.registerPage(page);
   app.lastPage = { name: "createwo" };
   await app.initialize();
   controller.handleClose();
   expect(app.currentPage.name).toBe("schedule");       
 });

 it("it should set saveDataSuccessful to false ", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({name: 'createwo'});
  const ds = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  page.registerDatasource(ds);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "createwo" };
  await app.initialize();
  controller.onSaveDataFailed();
  expect(controller.saveDataSuccessful).toBe(false);      
});

it('it should be saved on user confirmation dialog save when leaving page', async () => {

  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({name: 'createwo'});
  const ds = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds);
  sinon.stub(ds, 'hasNewItems').returns(false);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "createwo" };
  await app.initialize();
  controller.pageInitialized(page, app);

  await ds.load();
  await assetLookupDS.load();
  let updateSpy = sinon.spy(controller,'createWorkorder');

  controller.onCustomSaveTransition();
  expect(updateSpy.calledOnce).toBe(true);
  expect(updateSpy.getCall(0).args[0]).toStrictEqual({item: ds.item});  
});
it("it should set editorValue on change", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "createwo" };
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
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  app.registerPage(page);
  app.lastPage = { name: "createwo" };
  await app.initialize();

  controller.onEditorSave();
  expect(page.state.editorValue).toBe(null);
});

it("it should show saveDiscardDialog on dialog back", async () => {
  let mockedFn = jest.fn();
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  page.showDialog = mockedFn;
  app.registerController(controller);
  app.registerPage(page);
  page.state.editorValue = "<p>Test</p>";
  app.lastPage = { name: "createwo" };
  await app.initialize();

  controller.onCloseRichTextDialog();
  expect(page.showDialog.mock.calls.length).toEqual(1);
});

it("it should close dialog and reset editorValue value", async () => {
  let mockedFn = jest.fn();
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, 'dsCreateWo');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  page.registerDatasource(ds);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.showDialog = mockedFn;
  app.registerController(controller);
  app.registerPage(page);
  page.state.editorValue = "<p>Test</p>";
  app.lastPage = { name: "createwo" };
  await app.initialize();

  controller.closeSaveDiscardDialog();
  expect(page.state.editorValue).toBe(null);
});

it("it should close dialog and reset editorValue value", async () => {
  const workorder = {
    wonum: "1001",
    description: "Work Order desc",
    description_longdescription: "Work Order long desc",
    wopriority: 2,
    worktype: "CAL",
    orgid: "EAGLENA",
    status: "APPR",
    locationnum: "SHIPPING",
    locationdesc: "Shipping and Receiving Department",
    schedfinish: "2021-06-04T05:18:00+05:30",
    schedstart: "2021-06-04T02:49:00+05:30",
  };
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource({ member: workorder }, "dsCreateWo");
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  ds.baseQuery.select =
    "wonum,description,description_longdescription,wopriority,worktype,locationnum,orgid,siteid,href,woclass";
  page.registerDatasource(ds);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerDatasource(synonymdomainData);
  app.registerController(controller);
  page.state = {
    editorValue: "<p>Test</p>",
  };
  app.registerPage(page);
  app.lastPage = { name: "createwo" };
  await app.initialize();
  await ds.load();
  let evt = {
    datasource: ds,
  };
  controller.setRichTextValue(evt);
  expect(ds.item.description_longdescription).toBe("<p>Test</p>");
});

it("should open asset lookup", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  app.registerController(controller);
  app.currentPage = "createwo";
  page.state = { parentPage: "" };
  app.setCurrentPage = mockSetPage;
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.openAssetLookup();
  expect(app.state.parentPage).toEqual("createwo");
  expect(page.state.useConfirmDialog).toEqual(true);
});

it("should set value on asset/location on input value change", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {
    assetnum: "10001",
    location: "OFFICE101",
    glaccount: "123456789",
    description: "Test-asset",
    priority: "1",
    asset: [
      {
        assetnum: "10001",
        location: "PLUS",
        priority: "1",
        failurecode: "class",
      },
    ],
  };
  page.state = { isMobile: false };
  let WOCreateEditUtilsstub = sinon
    .stub(WOCreateEditUtils, "getAssetOrLocation")
    .returns([{ assetnum: "10001", location: "OFFICE101" }]);
  await controller.onChangeAsset({item:evt, app:app});
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");

  await controller.onChangeLocation({item:evt,app:app});
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");

  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSET", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETLOCATION", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSETGL", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
  WOCreateEditUtilsstub.restore();
});

it("should set value on asset/location on input value change by user type", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {
    assetnum: "10001",
    location: "OFFICE101",
    glaccount: "123456789",
    description: "Test-asset",
    priority: "1",
    asset: [
      {
        assetnum: "10001",
        location: "PLUS",
        priority: "1",
        failurecode: "class",
      },
    ],
  };
  page.state = { isMobile: false };
  sinon
    .stub(WOCreateEditUtils, "getAssetOrLocation")
    .returns([{ assetnum: "10001", location: "OFFICE101" }]);
  controller.editAssetsLocation();
  await controller.findAsset({ value: 'OFFICE101'})
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");

  await controller.onChangeLocation({item:evt,app:app});
  await controller.findLocation({ value: '10001'});
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");

  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSET", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETLOCATION", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSETGL", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");

  const chooseAssetSpy = jest.spyOn(controller,'chooseAsset');
  await controller.findLocation(false);
  expect(chooseAssetSpy).not.toBeCalled();
});

it("should update page state of edist assets and location for manual value change", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.editAssetsLocation();
  expect(page.state.editAssetsLocation).toBeTruthy();
  expect(page.state.isLocationAssetFocus).toBeTruthy();
});

it("should update page state and call createWorkOrder if earlier save was clicked or if state is false then don't call create WO method", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  await app.initialize();
  controller.pageInitialized(page, app);

  page.state.editAssetsLocation = false;
  const createWorkorderSpy = jest.spyOn(controller,'createWorkorder');
  controller.callCreateWorkOrder();
  expect(createWorkorderSpy).not.toBeCalled();

  controller.editAssetsLocation();
  page.state.saveInProgress = true;
  page.state.createWorkorderItem = {}
  controller.callCreateWorkOrder();
  expect(page.state.editAssetsLocation).toBeFalsy();
  expect(page.state.saveInProgress).toBeFalsy();
  expect(createWorkorderSpy).toBeCalled();
});

it("should set value setLookUpValue", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const dsCreateWo = newDatasource(workorderitem, "dsCreateWo");
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  page.registerDatasource(dsCreateWo);
  app.registerDatasource(dsCreateWo);
  app.registerDatasource(assetLookupDS);
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  let evt = {
    assetnum: "10001",
    location: "OFFICE101",
    glaccount: "123456789",
    description: "Test-asset",
    priority: "1",
    asset: [
      {
        assetnum: "10001",
        location: "PLUS",
        priority: "1",
        failurecode: "class",
      },
    ],
  };
  page.state = {
    isMobile: false,
    selectedItem: { action: "SETASSET", item: evt },
  };
  controller.setLookUpValue();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: false,
    selectedItem: { action: "SETLOCATION", item: evt },
  };
  controller.setLookUpValue();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: false,
    selectedItem: { action: "SETLOCGL", item: evt },
  };
  controller.setLookUpValue();
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("OFFICE101");
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
});


it("should set value on asset on scanning barcode or QR code", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);  
  await app.initialize();
  controller.pageInitialized(page, app);  
  controller.handleAssetBarcodeScan({value: ''})
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual(undefined); 

  controller.handleAssetBarcodeScan({value: '9780201379624'})
  expect(page.findDatasource("dsCreateWo").item.assetnum).toEqual("9780201379624"); 
   
});


it("should set value on location on scanning barcode or QR code", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);  
  await app.initialize();
  controller.pageInitialized(page, app);  
  controller.handleLocationBarcodeScan({value: ''})
  expect(page.findDatasource("dsCreateWo").item.location).toEqual(undefined);
  controller.handleLocationBarcodeScan({value: '978020137963'})
  expect(page.findDatasource("dsCreateWo").item.location).toEqual("978020137963");
  
   
});

it("should call getMaxvars", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsCreateWo");
  const defaultSetDs = newStatusDatasource(setData, 'defaultSetDs');
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerDatasource(defaultSetDs);
  app.registerController(controller);
  await defaultSetDs.load();  
  await app.initialize();
  controller.pageInitialized(page, app);  
  let getMaxvars = await controller.getMaxvars();
  expect(getMaxvars.length).toBe(1);
});

it("should chooseAssetItem", async () => {
  const controller = new WorkOrderCreateController();
  const app = new Application();
  const page = new Page({ name: "createwo" });
  const ds = newDatasource(workorderitem, "dsCreateWo");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);  
  await app.initialize();
  controller.pageInitialized(page, app); 
  ds.item.assetnum ='';
  ds.item.location = '';
  const data = {assetnum :"7600", location : "XYZ"}
  controller.chooseAssetItem(data);
  expect(ds.item.assetnum).toEqual(data.assetnum);
  controller.chooseAsset(data);
});
