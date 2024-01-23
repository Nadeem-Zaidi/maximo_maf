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

import TaskController from './TaskController';
import { Application, Page, JSONDataAdapter, Datasource, Device, Dialog } from '@maximo/maximo-js-api';
import tasklist from './test/task-list-json-data.js';
import statusitem from './test/statuses-json-data.js';
import workorderitem from './test/wo-detail-json-data.js';
import SynonymUtil from "./utils/SynonymUtil";
import worktype from "./test/worktype-json-data";

import woassetmeters from './test/assetmeter-json-data.js';
import wolocationmeters from './test/locationmeter-json-data.js';
import multiassetlocitem from "./test/wo-detail-multiassetloc-data.js";
import sinon from 'sinon';

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

function newTaskDatasource(data = tasklist, name = 'woPlanTaskDetailds') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
      idAttribute: 'taskid',
      name: name
  });
  return ds;
}

function newWoDatasource(data = workorderitem, name = 'woDetailds') {
	const da = new JSONDataAdapter({
		src: workorderitem,
		items: 'member',
		schema: 'responseInfo.schema',
	});

	const ds = new Datasource(da, {
		idAttribute: 'wonum',
		name: name,
	});

	return ds;
}

function newDatasourceAssetMeter(data = woassetmeters, name = 'woassetmeters') {
	const da = new JSONDataAdapter({
	  src: woassetmeters,
	  items: 'member',
	  schema: 'responseInfo.schema'
	});
  
	const ds = new Datasource(da, {
	  name: name
	});
  
	return ds;
  }


function newDatasourceMultiAssetLoc(
	data = multiassetlocitem,
	name = "woMultiAssetLocationds"
  ) {
	const da = new JSONDataAdapter({
	  src: data,
	  items: "member",
	  schema: "responseInfo.schema",
	});
  
	const ds = new Datasource(da, {
	  idAttribute: "multiid",
	  name: name,
	});
  
	return ds;
  }
  
  function newDatasourceLocationMeter(data = wolocationmeters, name = 'wolocationmeters') {
	const da = new JSONDataAdapter({
	  src: wolocationmeters,
	  items: 'member',
	  schema: 'responseInfo.schema'
	});
  
	const ds = new Datasource(da, {
	  name: name
	});
  
	return ds;
  }
it('should open long description dialog', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskController();
	const app = new Application();
	const page = new Page();

	app.registerController(controller);
	await app.initialize();

	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	await controller.openTaskLongDesc({description_longdescription: "Long description"});
	expect(page.state.dialogOpend).toBeTruthy();	
});

it('should retain the position on the screen', async () => {
    let mockSetPage = jest.fn();
    global.scrollTo = jest.fn()
    const controller = new TaskController();
    const app = new Application();
    const page = new Page();
    app.registerController(controller);
    await app.initialize();
    app.setCurrentPage = mockSetPage;
    controller.pageInitialized(page, app);
    localStorage.setItem('scrollpos',0);
    await controller.getScrollPosition();
    let scrollPosition = localStorage.getItem('scrollpos');
    window.scrollTo(0,scrollPosition);
});

it('should not open long description dialog', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskController();
	const app = new Application();
	const page = new Page();

	app.registerController(controller);
	await app.initialize();

	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	await controller.openTaskLongDesc();
	expect(page.state.dialogOpend).not.toBeDefined();
});

it('pageResume test', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskController();
	const app = new Application();
	const page = new Page();
	const woDetailds = newWoDatasource(workorderitem, 'woDetailds');
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	taskDS.load();
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
	app.registerDatasource(synonymDS);
	app.registerController(controller);
	app.registerDatasource(woDetailds);
	app.registerDatasource(taskDS);
	app.client = {
		userInfo: {
			insertOrg: "EAGLENA",
			insertSite: "BEDFORD"
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	};
	let taskSearchStub = sinon.stub(taskDS, 'searchQBE');
	app.state.taskCount= 1;
	await app.initialize();
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	await controller.pageResumed(page, app);
	expect(taskSearchStub.called).toBe(false);
	Device.get().isMaximoMobile = true;
	app.state.taskCount= 0;
	await controller.pageResumed(page, app);
	expect(taskSearchStub.called).toBe(true);
});

it('should validate getWoTask', async () => {
	global.open = jest.fn();
	const controller = new TaskController();
	const app = new Application();
	const page = new Page();
	const woDetailds = newWoDatasource(workorderitem, 'woDetailds');
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds' , 'member');
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
	const dsworktype = newStatusDatasource(worktype, "dsworktype");
	app.registerDatasource(dsworktype);
	app.registerDatasource(synonymDS);
	app.registerController(controller);
	app.registerDatasource(woDetailds);
	app.registerDatasource(taskDS);
	await taskDS.load();
	await dsworktype.load();
	await woDetailds.load();
	await app.initialize();
	controller.pageInitialized(page, app);
	sinon.stub(SynonymUtil, "getSynonym").returns({ value: "COMP", maxvalue: "COMP", description: "COMP" });
	let selectedStatus = { value: "COMP", maxvalue: "COMP", description: "COMP" };
	let selectedItem = {
			status_maxvalue: "APPR",
			status_description: "Approed",
			taskid: 10,
			predessorwos: true,
			woflowcontrolled: true,
			status: "APPR",
		};
	Device.get().isMaximoMobile = true;
	let data = await controller.getWoTask(tasklist.member, selectedItem, selectedStatus);
	expect(data.length).not.toBeNull();
	tasklist.member[0].taskid=null;
	let data1 = await controller.getWoTask(tasklist.member, selectedItem, selectedStatus);
	expect(data1.length).not.toBeNull();
});

it('should open task status dialog', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskController();
	const app = new Application();
	const page = new Page();
	const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskstatusDomainList = newStatusDatasource(statusitem, 'taskstatusDomainList');
	page.registerDatasource(taskstatusDomainList);
	const ds = newStatusDatasource(statusitem, 'synonymdomainData');
	const woData = {...workorderitem};
  	woData.member[0].flowcontrolled = true;
	const woDetailds = newWoDatasource(woData, 'woDetailds');
  	app.registerDatasource(ds);
	app.registerDatasource(woDetailds);
	app.registerDatasource(taskDS);
	await woDetailds.load();
	await ds.load();
	const dsworktype = newWoDatasource(worktype, "dsworktype");
	app.registerDatasource(dsworktype);
	await dsworktype.load();
	app.registerController(controller);
	taskDS.load();
	await app.initialize();

	app.setCurrentPage = mockSetPage;
	jest.spyOn(app, "callController").mockImplementation(() => true);
	controller.pageInitialized(page, app);
	let event = {
		item : {
			status_maxvalue: "INPRG",
			status: "INPRG",
			orgid:'EAGLESA',
			siteid: 'BEDFORD',
			woflowcontrolled: true,
			worktype:'CM',
			predessorwos: '1201(20),1201(10)',
			allowedstates: {
			  COMP: [{ description: "Completed", value: "COMP" }],
			  WAPPR: [{ description: "Waiting on Approval", value: "WAPPR" }],
			},
		  }
	  };
	await controller.openChangeStatusDialog(event);
	expect(page.state.statusList).not.toBeNull();
	expect(page.state.disableDoneButton).toBeTruthy();
	
	delete woDetailds.item['worktype'];
	await controller.openChangeStatusDialog(event);
});


it("Validate meter for date", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({name: "page"});
  
	
	const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskstatusDomainList = newStatusDatasource(statusitem, 'taskstatusDomainList');
	page.registerDatasource(taskstatusDomainList);
	const ds = newStatusDatasource(statusitem, 'synonymdomainData');
	const woDetailds = newWoDatasource(workorderitem, 'woDetailds');
  	app.registerDatasource(ds);
	app.registerDatasource(woDetailds);
	app.registerDatasource(taskDS);
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
  
	await controller.validateMeterDate();
	expect(page.state.invalidMeterDate).toBe(true);
	
	page.state.invalidMeterTime = false;
	page.state.invalidMeterDate = false;
	await controller.validateMeterDate();
	
	page.state.invalidMeterTime = true;
	page.state.invalidMeterDate = true;
	await controller.validateMeterDate();
  });
  
  it("Validate meter for time", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({name: "page"});
  
	app.registerController(controller);
	const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskstatusDomainList = newStatusDatasource(statusitem, 'taskstatusDomainList');
	page.registerDatasource(taskstatusDomainList);
	const ds = newStatusDatasource(statusitem, 'synonymdomainData');
	const woDetailds = newWoDatasource(workorderitem, 'woDetailds');
  	app.registerDatasource(ds);
	app.registerDatasource(woDetailds);
	app.registerDatasource(taskDS);
  
	await ds.load();
	


	
	app.registerController(controller);
	const woassetmetersDs = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	app.registerDatasource(woassetmetersDs);
	
	const wolocationmetersDs = newDatasourceAssetMeter(woassetmeters, 'wolocationmeters');
	app.registerDatasource(wolocationmetersDs);
	
	await woassetmetersDs.load();
	await wolocationmetersDs.load(); 
	
	let multiAssetDs = newDatasourceMultiAssetLoc(
	  multiassetlocitem,
	  "woMultiAssetLocationds"
	);
	app.registerDatasource(multiAssetDs);
	await multiAssetDs.load();
	
	const ds1 = multiAssetDs.getChildDatasource(
	  "activeassetmeter",
	  multiAssetDs.item
	);
	page.state.assetMeterData = ds1;
	
	const ds2 = multiAssetDs.getChildDatasource(
	  "activelocationmeter",
	  multiAssetDs.item
	);
	page.state.locationMeterData = ds2;
	
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
   
	await woassetmetersDs.load();
	
	woassetmetersDs.item.computedMeterCurDate = "";
	woassetmetersDs.item.computedMeterCurTime = "2023-03-22T10:00:00.000+05:30";
	await controller.validateMeterDate();
	expect(page.state.invalidDateTime).toBe(true);
	
	woassetmetersDs.item.computedMeterCurDate = "2023-03-22T00:00:00.000+05:30";
	woassetmetersDs.item.computedMeterCurTime = "";
	await controller.validateMeterTime();
	expect(page.state.invalidDateTime).toBe(true);
  });

  it('computedMeterCurDate returns expected data', async () => {
	const controller = new TaskController();
  
	let date = controller.computedMeterCurDate({
	  newreading: 1000, computedMeterCurDate: '5/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
	});
	
	date.setSeconds(0);
	date.setMilliseconds(0);
	
	let curDateTime = new Date();
	curDateTime.setSeconds(0);
	curDateTime.setMilliseconds(0);
	
	expect(date).toEqual(curDateTime);
  });
  
  it('computedMeterCurTime returns expected data', async () => {
	const controller = new TaskController();
  
	let date = controller.computedMeterCurTime({
	  newreading: 1000, computedMeterCurTime: '5/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
	});
	let datetime = new Date();
	expect(date).toEqual(datetime.getTime());
  });


it('saveMeterReadings for asset - gauge meters', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');

	page.state.assetMeterData = ds;
	page.state.locationMeterData = ds2;
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	let event = {
	  field: "newreading",
	  item: {
		"assetnum": "13170",
		"href": "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
		"computedMeterCurDate": "01/21/2022",
		"computedMeterCurTime": "01/21/2022 10:00:00"
	  },
	  newValue: 123,
	  newreadingDate: new Date(),
	  oldValue: undefined,
	  datasource: {
		name: "woassetmeters",
		items: ds.items
	  },
	  change: {
		object: {
		  "assetmeterid": 29,
		  "metername": "TEMP-F",
		  "dorollover": false,
		  "computedMeterCurDate": "",
		  "computedMeterCurTime": ""
		}
	  },
	   
	}
  
	// the dataadapter should have a query 
	let da = ds.dataAdapter;
	da.options.query = !da.options.query ? {} : da.options.query;
	
	let da1 = ds2.dataAdapter;
	da1.options.query = !da1.options.query ? {} : da1.options.query;
  
	await controller.onValueChanged(event);
	expect(controller.validatemeter).toBe(true);
	
	await controller.saveUpdateMeterDialog(event, app, ds);
	expect(page.state.disableSave).toBe(false);
	
	page.state.oldReading = true;
	event.measurementvalue = 1;
	await controller.saveUpdateMeterDialog(event);
  });

  it('saveMeterReadings for asset - observation meters', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');

	page.state.assetMeterData = ds;
	page.state.locationMeterData = ds2;
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const selectedTask = {
		"member": [tasklist.member[2]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	let event = {
	  field: "newreading",
	  item: {
		"assetnum": "13170",
		"href": "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
		"computedMeterCurDate": "01/21/2022",
		"computedMeterCurTime": "01/21/2022 10:00:00"
	  },
	  newValue: 123,
	  newreadingDate: new Date(),
	  oldValue: undefined,
	  datasource: {
		name: "woassetmeters",
		items: ds.items
	  },
	  change: {
		object: {
		  "assetmeterid": 29,
		  "metername": "TEMP-F",
		  "dorollover": false,
		  "computedMeterCurDate": "",
		  "computedMeterCurTime": ""
		}
	  },
	   
	}
  
	// the dataadapter should have a query 
	let da = ds.dataAdapter;
	da.options.query = !da.options.query ? {} : da.options.query;
	
	let da1 = ds2.dataAdapter;
	da1.options.query = !da1.options.query ? {} : da1.options.query;
  
	await controller.onValueChanged(event);
	expect(controller.validatemeter).toBe(true);
	
	await controller.saveUpdateMeterDialog(event, app, ds);
	expect(page.state.disableSave).toBe(false);
	
	page.state.oldReading = true;
	event.measurementvalue = 1;
	await controller.saveUpdateMeterDialog(event);
  });

  it('saveMeterReadings for task close without save if already saved', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');

	page.state.assetMeterData = ds;
	page.state.locationMeterData = ds2;

	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const selectedTask = {
		"member": [tasklist.member[1]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	const taskMeterChangeDialog = new Dialog({
		name: "taskMeterChangeDialog",
		configuration: {
			type: "slidingDrawer"
		}
	});
	page.registerDialog(taskMeterChangeDialog);
	taskMeterChangeDialog.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	let event = {
	  field: "newreading",
	  item: {
		"assetnum": "13170",
		"href": "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
		"computedMeterCurDate": "01/21/2022",
		"computedMeterCurTime": "01/21/2022 10:00:00"
	  },
	  newValue: 123,
	  newreadingDate: new Date(),
	  oldValue: undefined,
	  datasource: {
		name: "woassetmeters",
		items: ds.items
	  },
	  change: {
		object: {
		  "assetmeterid": 29,
		  "metername": "TEMP-F",
		  "dorollover": false,
		  "computedMeterCurDate": "",
		  "computedMeterCurTime": ""
		}
	  },
	   
	}
  
	// the dataadapter should have a query 
	let da = ds.dataAdapter;
	da.options.query = !da.options.query ? {} : da.options.query;
	
	let da1 = ds2.dataAdapter;
	da1.options.query = !da1.options.query ? {} : da1.options.query;
  
	await controller.onValueChanged(event);
	expect(controller.validatemeter).toBe(true);
	
	await controller.saveUpdateMeterDialog(event, app, ds);
	expect(page.state.disableSave).toBe(false);
	
	page.state.oldReading = true;
	event.measurementvalue = 1;
	await controller.saveUpdateMeterDialog(event);
  });

it("should show proper asset details on open of meter slider on task", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);

	await controller.openMeterReadingDrawer({item: undefined});
	expect(page.state.assetMeterHeader).toBe(undefined);
	
	await controller.openMeterReadingDrawer({ item: taskDSSelected.items[0], datasource: taskDSSelected });
	expect(page.state.assetMeterHeader).toBe("11430 Centrifugal Pump 100GPM/60FT HD");

  });

  it("should call openTaskMeterReadingDrawer on task", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	page.state.selectedTaskId = 10;
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');

	page.state.assetMeterData = ds;
	page.state.locationMeterData = ds2;
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskListDS = newTaskDatasource(tasklist, 'tasklistMeterds');

	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskListDS);
	app.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);

	await controller.openTaskMeterReadingDrawer({item: undefined});
	expect(page.state.assetMeterHeader).toBe(undefined);
	
	await controller.openTaskMeterReadingDrawer({ item: taskDSSelected.items[0], datasource: taskListDS });
	expect(page.state.assetMeterHeader).toBe("13117 Bottom Sealing System");

  });


  it("should call openEnterTaskReadingDrawer on task", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	page.state.selectedTaskId = 10;
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');

	page.state.assetMeterData = ds;
	page.state.locationMeterData = ds2;
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskListDS = newTaskDatasource(tasklist, 'tasklistMeterds');

	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskListDS);
	app.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);

	await controller.openEnterTaskReadingDrawer({ item: taskDSSelected.items[0], readingType: "old" });
	expect(page.findDialog('update_taskMeterReading_drawer_detail')).toBeDefined();
  });


  it("should call onFocusReadings on task", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	page.state.selectedTaskId = 10;
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');

	page.state.assetMeterData = ds;
	page.state.locationMeterData = ds2;
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskListDS = newTaskDatasource(tasklist, 'tasklistMeterds');
	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskListDS);
	app.registerDatasource(taskDSSelected);
	
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);

	const meterObject = {
		lastreadingdate: "10/07/20220",
		lastreading: 50,
		meter: {
			metertype_maxvalue: "CONTINUOUS"
		},
		metername: "ABC",
		rollover: false,
		newreading: 40,
		newreadingdate: "11/07/2022",
		assetmeterid : 1
	}

	const meterObject2 = {
		lastreadingdate: "10/07/20220",
		lastreading: 50,
		meter: {
			metertype_maxvalue: "CONTINUOUS"
		},
		metername: "ABC",
		rollover: false,
		newreading: 40,
		newreadingdate: "11/07/2022"
	}

	await controller.onFocusReadings({ item: taskDSSelected.items[0], ...meterObject });
	expect(page.state.readingChangeInvoked).toBeTruthy();

	await controller.onFocusReadings({ item: taskDSSelected.items[0], ...meterObject2 });
	expect(page.state.readingChangeInvoked).toBeTruthy();

	await controller.clearCharacterMeterReaing({ item: taskDSSelected.items[0], ...meterObject });
	expect(page.state.disableSave).toBeTruthy();
	
	await controller.saveUpdateTaskMeterDialogDetail()
  });


it("saveCharactersticMeterReading for asset", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'wolocationmeters');
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	const taskMeterChangeDialog = new Dialog({
		name: "taskMeterChangeDialog",
	});
	page.registerDialog(taskMeterChangeDialog);
	taskMeterChangeDialog.registerDatasource(taskDSSelected);
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	let event = {
	  field: "newreading",
	  item: {
		"assetnum": "13170",
		"href": "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
		"computedMeterCurDate": "01/21/2022",
		"computedMeterCurTime": "01/21/2022 10:00:00"
	  },
	  newValue: 123,
	  newreadingDate: new Date(),
	  oldValue: undefined,
	  datasource: {
		name: "woassetmeters",
		items: ds.items
	  },
	  change: {
		object: {
		  "assetmeterid": 29,
		  "metername": "TEMP-F",
		  "dorollover": false,
		  "computedMeterCurDate": "",
		  "computedMeterCurTime": ""
		}
	  },
	   
	}
	jest.spyOn(page, 'findDialog');
	page.state.invalidDateTime = true;
	await controller.saveCharactersticMeterReading(event);
	expect(page.state.disableSave).toBe(true);
	
	page.state.invalidDateTime = false;
	await controller.saveCharactersticMeterReading(event);
	expect(page.state.disableSave).toBe(false);

	page.state.disableSave = true;
	controller.taskMeterChangeValidate({});
	page.state.disableSave = false;
	controller.taskMeterChangeValidate({});
	expect(page.findDialog('saveDiscardTaskMeter')).toBeDefined();
	
  });

  it("saveCharactersticMeterReading for task asset meter", async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();
  
	const controller = new TaskController();
	const app = new Application();
	const page = new Page({
	  name: 'page'
	});

	page.state = {
		updateCharecteristicMeterReadingItem: {
			newreading: null
		}
	}
	app.client = {
		userInfo: {
			personid: 'SAM',labor: {laborcode: 'SAM'}
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	}
  
	app.registerController(controller);
  
	const ds = newDatasourceAssetMeter(woassetmeters, 'woPlanTaskAssetMeters');
	const ds2 = newDatasourceLocationMeter(wolocationmeters, 'woPlanTasklocationMeters');
	
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const selectedTask = {
		"member": [tasklist.member[0]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');

	page.registerDatasource(ds);
	page.registerDatasource(ds2);
	
	app.registerDatasource(ds);
	app.registerDatasource(ds2);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	const taskMeterChangeDialog = new Dialog({
		name: "update_taskMeterReading_drawer_detail",
	});
	page.registerDialog(taskMeterChangeDialog);
	taskMeterChangeDialog.registerDatasource(taskDSSelected);
	sinon.stub(ds, 'put');
	sinon.stub(ds2, 'put');
	await ds.load();
	await ds2.load();
	await taskDS.load();
	await taskDSSelected.load();
	await app.initialize();
  
	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	let event = {
	  field: "newreading",
	  item: {
		"assetnum": "13170",
		"href": "http://localhost:3000/maximo/oslc/os/mxapiassetmeter/_VE9NQVNTMS8wLJE-FAKEASSETMETERRESTID",
		"computedMeterCurDate": "01/21/2022",
		"computedMeterCurTime": "01/21/2022 10:00:00"
	  },
	  newValue: 123,
	  newreadingDate: new Date(),
	  oldValue: undefined,
	  datasource: {
		name: "woPlanTaskAssetMeters",
		items: ds.items
	  },
	  change: {
		object: {
		  "assetmeterid": 29,
		  "metername": "TEMP-F",
		  "dorollover": false,
		  "computedMeterCurDate": "",
		  "computedMeterCurTime": ""
		}
	  }
	}
	jest.spyOn(page, 'findDialog');
	page.state.invalidDateTime = true;
	await controller.saveCharactersticMeterReadingDetail(event);
	expect(page.state.disableSave).toBe(true);
	
	page.state.invalidDateTime = false;
	await controller.saveCharactersticMeterReadingDetail(event);
	expect(page.state.disableSave).toBe(false);

	page.state.disableSave = true;
	controller.taskMeterLocChangeValidate({});
	page.state.disableSave = false;
	controller.taskMeterLocChangeValidate({});
	expect(page.findDialog('saveDiscardTaskAssetLocMeter')).toBeDefined();
	
  });

it('should select to change the task status', async () => {
	const controller = new TaskController();
	const app = new Application();
	const page = new Page();
	const wodetails = newWoDatasource(workorderitem, 'woDetailds');
	app.registerDatasource(wodetails);
	const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const taskstatusDomainList = newStatusDatasource(statusitem, 'taskstatusDomainList');
	page.registerDatasource(taskstatusDomainList);
	app.registerDatasource(taskDS);
	app.registerController(controller);
	await wodetails.load();
	await taskDS.load();
	taskDS.dependsOn = wodetails;
	await app.initialize();
	Device.get().isMaximoMobile = true;
	page.state.selectedTaskItem= {
		status_maxvalue: "COMP",
		status_description: "completed",
		taskid: 10,
		predessorwos: '1201(20),1201(10)',
		status: "COMP",
	};
	page.state.selectedTaskStatus= {
		status_maxvalue: "APPR",
		status_description: "Approed",
		status: "APPR",
	};
	sinon.stub(taskDS, "invokeAction").returns([{_responsedata: page.state.selectedTaskItem}]);
	const statusdrawer = new Dialog({
		name: "taskStatusChangeDialog",
	});
	page.registerDialog(statusdrawer);
	statusdrawer.closeDialog = jest.fn();
	controller.pageInitialized(page, app);
	await controller.changeWoTaskStatus();
	expect(page.state.disableButton).toBe(true);	
});

it('should redirect user to report page or workOrderDetails based on systemProp value of maximo.mobile.gotoreportwork', async () => {
	const mockSelectedWO = {
		page: 'workOrderDetails',
		wonum: 1022,
		siteid: 'BEDFORD',
		href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx',
	}
	const controller = new TaskController();
	const app = new Application();
	const page = new Page();
	app.registerController(controller);

	await app.initialize();

	const wodetails = newWoDatasource(mockSelectedWO, 'woDetailResource');
	await wodetails.load();
	app.registerDatasource(wodetails);
	
	controller.pageInitialized(page, app);

	await controller.redirectToAssetDetails();
	window.setTimeout(() => {
		expect(app.currentPage.name).toBe("assetDetails");
	}, 1);

	app.state = {
		systemProp: {
			'maximo.mobile.gotoreportwork': '0'
		},
	};
	
	await controller.redirectToWODetailsOrReport();
	window.setTimeout(() => {
		expect(app.currentPage.name).toBe("report_work");
	}, 1);

	app.state = {
		systemProp: {
			'maximo.mobile.gotoreportwork': '1'
		},
	};
	
	await controller.redirectToWODetailsOrReport();
	window.setTimeout(() => {
		expect(app.currentPage.name).toBe("workOrderDetails");
	}, 1);
});

it('should redirect user to report page if all task is either completed/cancelled/closed', () => {
	const mockSelectedWO = {
		page: 'workOrderDetails',
		wonum: 1022,
		siteid: 'BEDFORD',
		href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx',
	};
	
	const app = new Application();
	const controller = new TaskController();
	const page = new Page({name: 'page'});
	controller.pageInitialized(page, app);

	const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");
	controller.redirectToReportPage(mockSelectedWO, true);
	sinon.assert.callCount(setCurrentPageSpy, 1);
});

it('should redirect user to report page if all task is either completed/cancelled/closed and navigateToReportWork', async() => {
	const mockSelectedWO = {
		page: 'report_work',
		wonum: 1022,
		siteid: 'BEDFORD',
		href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx',
        itemhref: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx',
        worktype: '', 
        istask: true,
        wogroup: '',
        taskid: ''
	};
	const app = new Application();
	const controller = new TaskController();
	const page = new Page({name: 'report_work', state: {}});
	app.registerPage(page);
	controller.pageInitialized(page, app);
	const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");
	await controller.redirectToReportPage(mockSelectedWO, true);
	sinon.assert.callCount(setCurrentPageSpy, 1);
	expect(page.state.navigateToReportWork).toBeTruthy();
});
