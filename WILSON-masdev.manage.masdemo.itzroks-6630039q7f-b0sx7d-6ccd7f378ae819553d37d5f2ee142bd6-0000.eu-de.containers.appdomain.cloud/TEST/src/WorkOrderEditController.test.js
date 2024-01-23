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

import WorkOrderEditController from "./WorkOrderEditController";
import WOCreateEditUtils from "./utils/WOCreateEditUtils";
import {Application, Page, JSONDataAdapter, Datasource} from "@maximo/maximo-js-api";
import worktype from "./test/worktype-json-data";
import workorderitem from './test/wo-detail-json-data.js';
import wpeditsettings from './test/wp-edit-setting-json-data.js';
import sinon from 'sinon';
import wpmaterial from "./test/materials-json-data";
import statusitem from './test/statuses-json-data.js';
import SynonymUtil from './utils/SynonymUtil';
import woclassitem from './test/woclass-json-data.js';


function newDatasource(data = workorderitem, name = "dsWoedit") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: "wonum",
    name: name,
  });

  da.options.query = !da.options.query ? {} : da.options.query;
  da.options.query.interactive = null;
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
function newDatasource1(data, name = "wpEditSetting") {
	const da = new JSONDataAdapter({
		src: data,
		items: "member",
	});
	const ds = new Datasource(da, {
		idAttribute: "status",
		name: name,
	});
	return ds;
}

it("should loadRecord", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
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
    status: "APPR",
    locationnum : 'SHIPPING',
    locationdesc: 'Shipping and Receiving Department',
    schedfinish: "2021-06-04T05:18:00+05:30",
    schedstart: "2021-06-04T02:49:00+05:30",
    istask: false,
    wogroup: '1003',
    taskid: '103'
  };

  const workorder2 = {
    wonum: "1002",
    description: "Work Order desc",
    description_longdescription: "Work Order long desc",
    wopriority: 2,
    worktype: "CAL",
    orgid: "EAGLENA",
    status: "APPR",
    locationnum : 'SHIPPING',
    locationdesc: 'Shipping and Receiving Department',
    schedfinish: "2021-06-04T05:18:00+05:30",
    schedstart: "2021-06-04T02:49:00+05:30",
    istask: true,
    wogroup: '1002',
    taskid: '102'
  };

  const ds = newDatasource({ member: workorder }, "dsWoedit");
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  ds.baseQuery.select = 'wonum,description,description_longdescription,wopriority,worktype,locationnum,orgid,siteid,href,woclass';
  page.registerDatasource(ds);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);

  const ds1 = newDatasource(workorderitem, 'woDetailResource');
  app.registerDatasource(ds1);


  const ds2 = newDatasource(workorder2, 'woDetailResource2');
  app.registerDatasource(ds2);

  const wpEditSettingDS = newDatasource1(wpeditsettings, 'wpEditSettingDS');
  page.registerDatasource(wpEditSettingDS);
  let editSettingDS = sinon.stub(wpEditSettingDS, 'searchQBE');

  await app.initialize();
  controller.pageInitialized(page, app);
  await controller.loadRecord(EmptyWorkOrder);
  expect(page.state.workorderData.length).toEqual(0);
  await controller.loadRecord(workorder);
  expect(page.state.workorderData.length).toEqual(1);
  expect(page.state.workorderData[0].worktype).toBe("CAL");
  expect(editSettingDS.displayName).toBe('searchQBE');

  workorder.worktype = "";
  app.state.incomingContext = { page:'workOrderDetails',assetnum : '123232', site: 'testsite'};
  await controller.loadRecord(workorder);
  expect(page.state.workorderData.length).toEqual(1);
  expect(page.state.workorderData[0].worktype).toBe("");


  page.params = {followup: true};
  page.datasources.newWorkOrderds = {clearState: ()=>{},addNew: ()=>{}, resetState: () =>{}};
  await controller.loadRecord(workorder);
  expect(page.state.pageTitle).toEqual('Create follow-up WO');

  
  page.params.followup = false;
  workorder.worktype = "CAL";
  jest.spyOn(app, "callController").mockImplementation(() => "1001 Edit work order");
  await controller.loadRecord(workorder);
  expect(page.state.pageTitle).toEqual('1001 Edit work order');

  jest.spyOn(app, "callController").mockImplementation(() => "1002-102 Edit work order");
  await controller.loadRecord(workorder2);
  expect(page.state.pageTitle).toEqual('1002-102 Edit work order');
});

it("should open worktype dialog", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();

  const controller = new WorkOrderEditController();
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
			insertSite: 'BEDFORD',
      insertOrg: 'EAGLENA',
		}
  }

  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);
  await controller.openWorkTypeLookup(event);
  await expect(page.state.dialogOpened).toBeTruthy();
});

it("should return asset and location description", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  app.registerController(controller);
  app.registerPage(page);

  let workorder = {
    wonum: "1001",
    description: "Work Order desc",
    description_longdescription: "Work Order long desc",
    wopriority: 2,
    worktype: "CAL",
    orgid: "EAGLENA",
    assetnum: '12300',
    assetdesc: 'Electric cart',
    locationdesc: 'Shipping and Receiving Department',
    locationnum : 'SHIPPING'
  };

  await app.initialize();
  controller.pageInitialized(page, app);
  expect(controller.getAssetLocDesc(workorder.locationnum, workorder.locationdesc)).toEqual('SHIPPING Shipping and Receiving Department');
  delete workorder.locationdesc;
  expect(controller.getAssetLocDesc(workorder.locationnum, workorder.locationdesc)).toEqual('SHIPPING');

  let workOrder = {
    wonum: "1001",
    description: "Work Order desc",
    description_longdescription: "Work Order long desc",
    wopriority: 2,
    worktype: "CAL",
    orgid: "EAGLENA",
    assetnum: '12300',
    assetdesc: 'Electric cart',
    locationnum : 'SHIPPING'
  };

  expect(controller.getAssetLocDesc(workOrder.assetnum, workOrder.assetdesc)).toEqual('12300 Electric cart');
  delete workOrder.assetdesc;
  expect(controller.getAssetLocDesc(workOrder.assetnum, workOrder.assetdesc)).toEqual('12300');
});

it('updateAndSaveWorkOrder', async () => {

  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  const detailsPage = new Page({name: 'workOrderDetails'});

  const ds = newDatasource(workorderitem, 'woDetailResource');
  const ds2 = newDatasource(workorderitem, 'dsWoedit');
  const ds3 = newDatasource(workorderitem, 'newWorkOrderds');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");

  ds2.baseQuery = {
    select : 'wonum,description,description_longdescription,wopriority,worktype,woassetdesc,orgid,siteid,href,woclass'
  }

  await ds.load();
  await ds2.load();
  await ds3.load();
  await assetLookupDS.load();
  app.registerDatasource(ds);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  page.registerDatasource(ds3);
  app.registerDatasource(assetLookupDS);
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(detailsPage);

  let updatestub = sinon.spy(ds, 'update');  

  await app.initialize();
  controller.pageInitialized(page, app);
  controller.pageInitialized(detailsPage, app);

  let NoItemEvent = {
    page: {
      params: {followup: false},
      datasources: {
        dsWoedit : {
        }
      } 
    }
  }
  page.params.followup = false;
  
  let event = {
    page: page
  }
  page.state.editAssetsLocation = false;
  await controller.updateAndSaveWorkOrder(NoItemEvent);
  window.setTimeout(() => {
    expect(app.currentPage.name).toBe("woedit");
  }, 1);
  updatestub.restore();

  updatestub = sinon.stub(ds, 'update').resolves("success");
  page.datasources.dsWoedit.item.wonum = null;

  event = {
    page: page
  }
  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  page.state.useConfirmDialog = false;
  await controller.updateAndSaveWorkOrder(event);

  expect(updatestub.calledOnce).toBe(true);
  expect(updatestub.getCall(0).args[0]).not.toHaveProperty('wonum');
  window.setTimeout(() => {
    expect(app.currentPage.name).toBe("workOrderDetails");
  }, 50);
  page.params.followup = false;
});

it('updateAndSaveWorkOrder on fetching asset/location details', async () => {

  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  const detailsPage = new Page({name: 'workOrderDetails'});

  const ds = newDatasource(workorderitem, 'woDetailResource');
  const ds2 = newDatasource(workorderitem, 'dsWoedit');
  const ds3 = newDatasource(workorderitem, 'newWorkOrderds');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");

  ds2.baseQuery = {
    select : 'wonum,description,description_longdescription,wopriority,worktype,woassetdesc,orgid,siteid,href,woclass'
  }

  await ds.load();
  await ds2.load();
  await ds3.load();
  await assetLookupDS.load();
  app.registerDatasource(ds);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  page.registerDatasource(ds3);
  app.registerDatasource(assetLookupDS);
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(detailsPage);

  let updatestub = sinon.spy(ds, 'update');  

  await app.initialize();
  controller.pageInitialized(page, app);
  controller.pageInitialized(detailsPage, app);

  let NoItemEvent = {
    page: {
      params: {followup: false},
      datasources: {
        dsWoedit : {
        }
      } 
    }
  }
  page.params.followup = false;
  
  let event = {
    page: page
  }
  page.state.editAssetsLocation = true;
  controller.editAssetsLocation();
  const chooseLocationSpy = jest.spyOn(app,'findDatasource');
  
  await controller.updateAndSaveWorkOrder(NoItemEvent);
  expect(chooseLocationSpy).not.toBeCalled();
  
  window.setTimeout(() => {
    expect(app.currentPage.name).toBe("woedit");
  }, 1);
  updatestub.restore();

  updatestub = sinon.stub(ds, 'update').resolves("success");
  page.datasources.dsWoedit.item.wonum = null;

  event = {
    page: page
  }
  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  //page.state.editAssetsLocation = false;
  await controller.updateAndSaveWorkOrder(event);

  expect(updatestub.calledOnce).toBe(false);
  window.setTimeout(() => {
    expect(app.currentPage.name).not.toBe("workOrderDetails");
  }, 50);
  page.params.followup = false;
});



it('validate Fields', async () => {

  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});

  const ds = newDatasource(workorderitem, 'woDetailResource');
  const ds2 = newDatasource(workorderitem, 'dsWoedit');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");

  app.registerDatasource(ds);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  app.registerController(controller);
  app.registerPage(page);

  page.state.minPriority = 0;
  page.state.maxPriority = 999;

  await app.initialize();
  controller.pageInitialized(page, app);

  let items = await ds2.load();  
  items[0].wopriority=1000;

  await controller.validateFields();
  expect(page.state.readOnlyState).toBe(true);
  window.setTimeout(() => {
  expect(app.currentPage.name).toBe("woedit");
  }, 1);

  items[0].wopriority=1;
  items[0].schedstart='2020-11-02T00:00:00.000+05:30';
  items[0].schedfinish='2020-11-01T00:00:00.000+05:30';

  await controller.validateFields();
  expect(page.state.errorMessage).toBe('The start date must be before the finish date')
  window.setTimeout(() => {
  expect(app.currentPage.name).toBe("woedit");
  }, 1);

  items[0].estdur = -1;
  await controller.validateFields();
  expect(page.state.errorMessage).toBe('The duration should be positive value');
  window.setTimeout(() => {
  expect(app.currentPage.name).toBe("woedit");
  }, 1);

});

it('create follow up workorder', async () => {

  const controller = new WorkOrderEditController();
  const app = new Application();
  app.client = {
    userInfo: {personid: 'SAM'}
  }
  const page = new Page({name: 'woedit'});
  const woDetailsPage = new Page({name: 'workOrderDetails'});
  const relatedPage = new Page({name: 'relatedWorkOrder'});
  const ds = newDatasource(workorderitem, 'woDetailResource');
  
  const ds2 = newDatasource(workorderitem, 'dsWoedit');
  const newWODs = newDatasource(workorderitem, 'newWorkOrderds');
  const woDetailRelatedDS = newDatasource(workorderitem, 'woDetailRelatedWorkOrder');
  const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  
  // let synonymStub = 
  sinon.stub(SynonymUtil, 'getSynonym').returns({value: 'WAPPR',maxvalue: 'WAPPR',description: 'WAPPR'});
  woDetailsPage.registerDatasource(ds);

  page.registerDatasource(ds2);
  page.registerDatasource(newWODs);
  app.registerDatasource(synonymDS);
  app.registerDatasource(assetLookupDS);
  relatedPage.registerDatasource(woDetailRelatedDS);
  app.registerController(controller);
  app.registerPage(page);
  app.registerPage(woDetailsPage);
  app.registerPage(relatedPage);

  await ds.load();
  newWODs.baseQuery = {
    select : 'wonum,description,description_longdescription,wopriority,worktype,woassetdesc,orgid,siteid,href,woclass'
  }
  await newWODs.load();
  await woDetailRelatedDS.load();
  await assetLookupDS.load();
  await synonymDS.load();
  await app.initialize();
  
  controller.pageInitialized(page, app);
  page.params = {
    followup: true
  };
  await controller.updateAndSaveWorkOrder({page, datasources: {'dsWoedit': ds2}});

  ds2.item.assetnum = '12345';
  page.params = {
    followup: true
  };
  await controller.updateAndSaveWorkOrder({page, datasources: {'dsWoedit': ds2}});

  ds2.item.assetnum = '';
  ds2.item.locationnum = '';
  page.state.isMobile = true;
  page.params = {
    followup: true
  };
  await controller.updateAndSaveWorkOrder({page, datasources: {'dsWoedit': ds2}});
  page.params.followup = false
  window.setTimeout(() => {
  expect(app.currentPage.name).toBe("woedit");
  }, 500);
  page.state.isMobile = false;
});

it('it should be update on user confirmation dialog save when leaving page', async () => {

  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  const ds = newDatasource(workorderitem, 'dsWoedit');
  const ds1 = newDatasource(workorderitem, 'woDetailResource');
  ds.baseQuery.select = 'wonum,description,description_longdescription,wopriority,worktype,locationnum,orgid,siteid,href,woclass';
  page.registerDatasource(ds);
  app.registerDatasource(ds1);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  page.state.isMobile = true;
  controller.pageInitialized(page, app);

  let updateSpy = sinon.spy(controller,'updateAndSaveWorkOrder');

  controller.onCustomSaveTransition();
  expect(updateSpy.calledOnce).toBe(true);
  expect(updateSpy.getCall(0).args[0]).toStrictEqual({page: page});  
});

it("it should set saveDataSuccessful to false ", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.onUpdateDataFailed();
  expect(controller.saveDataSuccessful).toBe(false);      
});

it("it should set editorValue on change", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  let evt ={
    target: {
      content: "<p>Test</p>"
    }
  }
  controller.onEditorChange(evt);
  expect(page.state.editorValue).toBe(evt.target.content);      
});

it("it should set editorValue on save", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  const ds = newDatasource(workorderitem, 'dsWoedit');
  ds.baseQuery.select = 'wonum,description,description_longdescription,wopriority,worktype,locationnum,orgid,siteid,href,woclass';
  page.registerDatasource(ds);
  const ds1 = newDatasource(workorderitem, 'woDetailResource');
  app.registerDatasource(ds1);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  controller.onEditorSave();
  expect(page.state.editorValue).toBe(null);      
});

it("it should show saveDiscardDialog on dialog back", async () => {
  let mockedFn = jest.fn();
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  page.showDialog = mockedFn;
  app.registerController(controller);
  app.registerPage(page);
  page.state.editorValue = "<p>Test</p>"
  await app.initialize();

  controller.onCloseRichTextDialog();
  expect(page.showDialog.mock.calls.length).toEqual(1);   
});

it("it should close dialog and reset editorValue value", async () => {
  let mockedFn = jest.fn();
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  page.showDialog = mockedFn;
  const ds = newDatasource(workorderitem, 'dsWoedit');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  ds.baseQuery.select = 'wonum,description,description_longdescription,wopriority,worktype,locationnum,orgid,siteid,href,woclass';
  page.registerDatasource(ds);
  const ds1 = newDatasource(workorderitem, 'woDetailResource');
  app.registerDatasource(ds1);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  app.registerController(controller);
  app.registerPage(page);
  page.state.editorValue = "<p>Test</p>"
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
    locationnum : 'SHIPPING',
    locationdesc: 'Shipping and Receiving Department',
    schedfinish: "2021-06-04T05:18:00+05:30",
    schedstart: "2021-06-04T02:49:00+05:30"
  };
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'woedit'});
  const ds = newDatasource({ member: workorder }, "dsWoedit");
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");
  ds.baseQuery.select = 'wonum,description,description_longdescription,wopriority,worktype,locationnum,orgid,siteid,href,woclass';
  page.registerDatasource(ds);
  app.registerDatasource(assetLookupDS);
  app.registerDatasource(locationLookupDS);
  app.registerController(controller);
  page.state ={
    editorValue: "<p>Test</p>"
  }
  app.registerPage(page);
  
  await app.initialize();
  await ds.load();
  let evt = {
    datasource: ds
  }
  controller.setRichTextValue(evt);
  expect(ds.item.description_longdescription).toBe("<p>Test</p>");  
});

it("should set value on asset/location on input value change", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {
    assetnum: "10001",
    locationnum: "OFFICE101",
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
  const WOCreateEditUtilsStub = sinon
    .stub(WOCreateEditUtils, "getAssetOrLocation")
    .returns([{ assetnum: "10001", location: "OFFICE101" }]);
  await controller.onChangeAsset({item:evt,app:app});
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");

  await controller.onChangeLocation({item:evt,app:app});
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  page.name ='wocreate';
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSET", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETLOCATION", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSETGL", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  WOCreateEditUtilsStub.restore();
});

it("should set value on asset/location on input value change by user type", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  let evt = {
    assetnum: "10001",
    locationnum: "OFFICE101",
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
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  const chooseAssetSpy = jest.spyOn(controller,'chooseAsset');
  controller.findLocation();
  expect(chooseAssetSpy).not.toBeCalled();

  await controller.findLocation({ value: '10001'});
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  page.name ='wocreate';
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSET", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETLOCATION", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETASSETGL", item: evt },
  };
  controller.onUserConfirmationNo();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");

  const chooseLocationSpy = jest.spyOn(controller,'chooseLocation');
  await controller.findAsset(false);
  expect(chooseLocationSpy).not.toBeCalled();
});

it("Should call find asset", async() => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state = { isMobile: false };
  jest
    .spyOn(WOCreateEditUtils, "getAssetOrLocation").mockReturnValue([]);
  controller.editAssetsLocation();
  await controller.findAsset({ value: 'OFFICE101'})
  expect(page.state.isLocationAssetFocus).toBeFalsy();
});


it("should update page state of edit assets and location for manual value change", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.editAssetsLocation();
  expect(page.state.editAssetsLocation).toBeTruthy();
});


it("should update page state and call updateAndSaveWorkOrder if earlier save was clicked or if state is false then don't call create WO method", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  
  const ds = newDatasource(workorderitem, 'woDetailResource');
  const ds2 = newDatasource(workorderitem, 'dsWoedit');
  const ds3 = newDatasource(workorderitem, 'newWorkOrderds');
  const assetLookupDS = newDatasource(wpmaterial, "assetLookupDS");
  const locationLookupDS = newDatasource(wpmaterial, "locationLookupDS");

  ds2.baseQuery = {
    select : 'wonum,description,description_longdescription,wopriority,worktype,woassetdesc,orgid,siteid,href,woclass'
  }

  await ds.load();
  await ds2.load();
  await ds3.load();
  await assetLookupDS.load();
  app.registerDatasource(ds);
  app.registerDatasource(locationLookupDS);
  page.registerDatasource(ds2);
  page.registerDatasource(ds3);
  app.registerDatasource(assetLookupDS);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  page.state.editAssetsLocation = false;
  const updateAndSaveWorkOrderSpy = jest.spyOn(controller,'updateAndSaveWorkOrder');
  controller.callUpdateWorkOrder();
  expect(updateAndSaveWorkOrderSpy).not.toBeCalled();

  controller.editAssetsLocation();
  page.state.saveInProgress = true;
  const updatestub = sinon.stub(ds, 'update').resolves("success");
  page.datasources.dsWoedit.item.wonum = null;
  page.state.updateWorkorderItem = {
    page: {
      params: {followup: false},
      datasources: {
        dsWoedit : {
        }
      } 
    }
  }
  controller.callUpdateWorkOrder();
  expect(page.state.editAssetsLocation).toBeFalsy();
  expect(page.state.saveInProgress).toBeFalsy();
  expect(updateAndSaveWorkOrderSpy).toBeCalled();
  updatestub.restore();
});


it("should set value onUserConfirmationYes", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const dsCreateWo = newDatasource(workorderitem, "dsWoedit");
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
    isMobile: true,
    selectedItem: { action: "SETASSET", item: evt },
  };
  controller.onUserConfirmationYes();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETLOCATION", item: evt },
  };
  controller.onUserConfirmationYes();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
  page.state = {
    isMobile: true,
    selectedItem: { action: "SETLOCGL", item: evt },
  };
  controller.onUserConfirmationYes();
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("OFFICE101");
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("10001");
});

it("should open asset lookup", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  app.registerController(controller);
  app.currentPage = 'woedit';
  page.state = { parentPage: ''};
  app.setCurrentPage = mockSetPage;
  await app.initialize();
  controller.pageInitialized(page, app);
  controller.openAssetLookup();
  expect(app.state.parentPage).toEqual("woedit");
  expect(page.state.useConfirmDialog).toEqual(true);
});


it("should set value on asset on scanning barcode or QR code", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);  
  await app.initialize();
  controller.pageInitialized(page, app);  
  controller.handleAssetBarcodeScan({value: ''})
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual(undefined); 

  controller.handleAssetBarcodeScan({value: '9780201379624'})
  expect(page.findDatasource("dsWoedit").item.assetnum).toEqual("9780201379624");

});


it("should set value on location on scanning barcode or QR code", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  }
  const ds = newDatasource(workorderitem, "dsWoedit");
  page.registerDatasource(ds);
  app.registerDatasource(ds);
  app.registerController(controller);  
  await app.initialize();
  controller.pageInitialized(page, app);  
  controller.handleLocationBarcodeScan({value: ''})
  expect(page.findDatasource("dsWoedit").item.location).toEqual(undefined);
  controller.handleLocationBarcodeScan({value: '978020137963'})
  expect(page.findDatasource("dsWoedit").item.locationnum).toEqual("978020137963");  
   
});

it("should chooseAssetItem", async () => {
  const controller = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({ name: "woedit" });
  const ds = newDatasource(workorderitem, "dsWoedit");
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

