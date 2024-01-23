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

import TaskMeterController from './TaskMeterController';
import { Application, Page, JSONDataAdapter, Datasource } from '@maximo/maximo-js-api';
import tasklist from './test/task-list-json-data.js';
import statusitem from './test/statuses-json-data.js';

import woassetmeters from './test/assetmeter-json-data.js';
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
        name: name,
        load: ()=>{}
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

it('should open long description dialog', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskMeterController();
	const app = new Application();
    const parentPage = new Page({name: 'parentPage'});
	const page = new Page();
    page.parent = parentPage ;
    

	app.registerController(controller);
	await app.initialize();
    page.parent.state.appVar = app;

	app.setCurrentPage = mockSetPage;
	await controller.dialogInitialized(page, app);
	expect(page.state.statusMemo).toBe("");	
});

it('Initalise and open dialog', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskMeterController();
	const app = new Application();
	const parentPage = new Page({name: 'parentPage'});
	const page = new Page();
    page.parent = parentPage ;
	

    const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	await taskDS.load();
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const selectedTask = {
		"member": [tasklist.member[0]]
	}
    
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');
    
	app.registerDatasource(synonymDS);
    app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
	app.client = {
		userInfo: {
			insertOrg: "EAGLENA",
			insertSite: "BEDFORD"
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	};
	app.state.taskCount= 1;
    await taskDSSelected.load();
	await app.registerController(controller);
	await app.initialize();
	page.parent.state.appVar = app;
    jest.spyOn(page.parent, "getApplication").mockImplementation(() => app);

	app.setCurrentPage = mockSetPage;
    await controller.dialogInitialized(page, app);
	await controller.dialogOpened(page, app);

	expect(page.parent.state.disableDoneButton).toBe(true);
});


it('Initalise and open dialog in disable state if meter value exists', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskMeterController();
	const app = new Application();
	const parentPage = new Page({name: 'parentPage'});
	const page = new Page();
    page.parent = parentPage ;
	

    const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const selectedTask = {
		"member": [tasklist.member[1]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');
	app.registerDatasource(synonymDS);
    app.registerDatasource(taskDSSelected);
	app.client = {
		userInfo: {
			insertOrg: "EAGLENA",
			insertSite: "BEDFORD"
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	};
	app.state.taskCount= 1;
	await taskDS.load();
    await taskDSSelected.load();
	app.registerController(controller);
	await app.initialize();
	page.parent.state.appVar = app;
    jest.spyOn(page.parent, "getApplication").mockImplementation(() => app);
    jest.spyOn(app, "findDatasource").mockImplementation(() => taskDSSelected);

	app.setCurrentPage = mockSetPage;
    await controller.dialogInitialized(page, app);
	await controller.dialogOpened(page, app);
	expect(page.parent.state.disableDoneButton).toBe(true);
});

it('Initalise and open dialog in disable state if meter value exists', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new TaskMeterController();
	const app = new Application();
	const parentPage = new Page({name: 'parentPage'});
	const page = new Page();
    page.parent = parentPage ;
	

    const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const selectedTask = {
		"member": [tasklist.member[2]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');
	app.registerDatasource(synonymDS);
    app.registerDatasource(taskDSSelected);
	app.client = {
		userInfo: {
			insertOrg: "EAGLENA",
			insertSite: "BEDFORD"
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	};
	app.state.taskCount= 1;
	await taskDS.load();
    await taskDSSelected.load();
	app.registerController(controller);
	await app.initialize();
	page.parent.state.appVar = app;
    jest.spyOn(page.parent, "getApplication").mockImplementation(() => app);
    jest.spyOn(app, "findDatasource").mockImplementation(() => taskDSSelected);

	app.setCurrentPage = mockSetPage;
    await controller.dialogInitialized(page, app);
	await controller.dialogOpened(page, app);
	expect(page.parent.state.disableDoneButton).toBe(true);
});

it('clearCharacterMeterReaing for characterstic meter', async () => {
    let mockSetPage = jest.fn();
	const controller = new TaskMeterController();
	const app = new Application();
	const parentPage = new Page({name: 'parentPage'});
	const page = new Page();
    page.parent = parentPage ;
	

    const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	taskDS.load();
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const selectedTask = {
		"member": [tasklist.member[0],tasklist.member[3]]
	}
	const taskDSSelected = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');
	app.registerDatasource(synonymDS);
	app.registerDatasource(taskDS);
	app.registerDatasource(taskDSSelected);
    const ds = newDatasourceAssetMeter(woassetmeters, 'woassetmeters');
    ds.newreading = 1/4;
    ds.metername = "HEAD LOSS 1";

    page.registerDatasource(ds);
	app.client = {
		userInfo: {
			insertOrg: "EAGLENA",
			insertSite: "BEDFORD"
		},
		checkSigOption : (option) => true,
		findSigOption : (appName, sigoption) => true
	};
	app.state.taskCount= 1;
    taskDSSelected.load();
	app.registerController(controller);
	await app.initialize();
	page.parent.state.appVar = app;
    jest.spyOn(page.parent, "getApplication").mockImplementation(() => app);

	app.setCurrentPage = mockSetPage;
    await controller.dialogInitialized(page, app);

    let event = {
       item : ds,
       newreading : '',
    }
    await controller.clearCharacterMeterReaing(event);
    expect(event.item.newreading).toBe(event.newreading);
  });

  it("should open characterstic drawer page for asset meter", async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();
  
    const controller = new TaskMeterController();
    const app = new Application();
    const parentPage = new Page({name: 'parentPage'});
	const page = new Page();
    page.parent = parentPage ;
	const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const taskDS = newTaskDatasource(tasklist, 'woPlanTaskDetailds');
	taskDS.load();
    
    const selectedTask = {
		"member": [tasklist.member[0],]
	}
	app.registerDatasource(synonymDS);
	app.registerDatasource(taskDS);
    app.registerController(controller);
    
    const dsnewreadingDs = newTaskDatasource(selectedTask, 'woPlanTaskDetaildsSelected');
    dsnewreadingDs.isAssetMeter = true;
    app.registerDatasource(dsnewreadingDs);
    let loadstub = sinon.stub(dsnewreadingDs, 'searchQBE');
  
    await app.initialize();
    jest.spyOn(page.parent, "getApplication").mockImplementation(() => app);
    jest.spyOn(app, "findDatasource").mockImplementation(() => dsnewreadingDs);
    app.setCurrentPage = mockSetPage;
    controller.dialogInitialized(page, app);
    let event = {
  
      item: {
        "assetmeterid": 78,
        "metername": "GUARD RAIL",
        "assetnum": "13170",
        "meter": {
          "domainid": "RAIL_WEAR"
        },
  
      },
  
  
      datasource: {
        name: "woassetmeters"
      }
    }
  
    await controller.openMeterLookup(event);
    expect(loadstub.called).toBe(true);
    expect(loadstub.displayName).toBe('searchQBE');
  });
