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

import WorkOrderDataController from './WorkOrderDataController';
import { Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import workorderitem from './test/wo-detail-json-data.js';
import singleDetail from './test/wo-detail-single-json-data.js';
import ScheduleDataController from './ScheduleDataController';
import SchedulePageController from './SchedulePageController';
import tasklist from './test/task-list-json-data.js';
import worktype from "./test/worktype-json-data";
import sinon from 'sinon';
import WOUtil from './utils/WOUtil';
function newDatasource(data = workorderitem, name = 'woDetailResource') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name,
  });

  return ds;
}


function newListDatasource(data = workorderitem, name = 'dswolist') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name,
  });

  return ds;
}

it('Validate Enable/Disable button for Materials and tools', async () => {
  const controller = new WorkOrderDataController();

  let disableMaterialsButton = controller.computedDisableButton({
    wonum: '1001',
    title: 'Centrifugal Pump Oil Change',
    description:
      'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
    wptool: [
      {
        wonum: '1001',
        itemqty: 1.0,
        description: 'ROCKWELL DRILL PRESS'
      }
    ]
  });

  expect(disableMaterialsButton).toBe(false);

  let disableMaterialsButton1 = controller.computedDisableButton({
    wonum: '1001',
    title: 'Centrifugal Pump Oil Change',
    description:
      'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
    wpmaterial: [
      {
        wonum: '1001',
        itemqty: 1.0,
        description: 'ROCKWELL DRILL PRESS'
      }
    ]
  });

  expect(disableMaterialsButton1).toBe(false);

  let enableMaterialsButton = controller.computedDisableButton();

  expect(enableMaterialsButton).toBe(true);
});

it('computedItemNum returns right', async () => {
  const controller = new WorkOrderDataController();

  let title = controller.computedItemNum({
    itemnum: '6I-2499',
    description: 'Filter, Primary Air'
  });
  expect(title).toBe('6I-2499 Filter, Primary Air');

  title = controller.computedItemNum({
    itemnum: '6I-2499'
  });
  expect(title).toBe('6I-2499');

  title = controller.computedItemNum({
    description: 'Filter, Primary Air'
  });
  expect(title).toBe('Filter, Primary Air');
});


it('computedEstTotalCost should call WoUtil method', () => {
  const controller = new WorkOrderDataController();
  let computedEstTotalCost = sinon.spy(WOUtil,'computedEstTotalCost');
  controller.computedEstTotalCost({})
  expect(computedEstTotalCost.called).toBe(true);
});

it('accessWoCostData should return total', () => {
  
  const controller = new WorkOrderDataController();
  jest.spyOn(WOUtil, "computedEstTotalCost").mockImplementation(() =>  {
    return {totalcost:"1995.50"}
  });
  expect(controller.accessWoCostData({})).toBe("1995.50");
});

it("Validate hide/show button for GaugeMeter", async () => {
  const controller = new WorkOrderDataController();
  let hideMeterButtn = controller.computedDisableMeter({
    assetmetercount: 0,
    locationmetercount: 0,
  });

  expect(hideMeterButtn).toBe(true);
});

it("Validate hide/show button for GaugeMeter", async () => {
  const controller = new WorkOrderDataController();

  let hideMeterButtn = controller.computedDisableMeter({
    assetmetercount: 1,
    locationmetercount: 1,
  });

  expect(hideMeterButtn).toBe(false);
});

it('computedWorkType returns right', async () => {
  const controller = new WorkOrderDataController();

  let title = controller.computedWorkType({
    worktype: 'PM',
    wonum: '1022'
  });
  expect(title).toBe('PM 1022');

  title = controller.computedWorkType({
    wonum: '1022'
  });
  expect(title).toBe('1022');
});

it('computedWOTimerStatus function to show/hide button ', async () => {
	const controller = new WorkOrderDataController();
  const app = new Application();
  const page = new Page({
    name: 'workOrderDetails'
  });

  app.client = {
    userInfo :{
      personId : 'SAM',
      labor: {
        laborcode: 'SAM'
      }
    }
  };

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

	let hideWOStartButton = controller.computedWOTimerStatus({
		wonum: '1022',
		description: '13170 problem',
		labtrans: [
			{
				laborcode: 'SAM',
				timerstatus_maxvalue: 'ACTIVE',
			},
		],
	});
	expect(hideWOStartButton).toBe(true);

	hideWOStartButton = controller.computedWOTimerStatus({
		wonum: '1022',
		description: '13170 problem',
	});
  expect(hideWOStartButton).toBe(false);
  
  hideWOStartButton = controller.computedWOTimerStatus({
    wonum: '1022',
    description: '13170 problem',
    labtrans: [
      {
        laborcode: 'WILSON',
        timerstatus_maxvalue: 'ACTIVE',
      },
    ],
  });
  expect(hideWOStartButton).toBe(false);
});

it('computedWODtlStatusPriority function to display status and priority on workorder details page', async () => {
  const controller = new WorkOrderDataController();
	const app = new Application();
  const page = new Page({
    name: 'workOrderDetails'
  });

  const schPage = new Page({
    name: 'schedule'
  });
  app.registerPage(schPage);

  app.registerPage(page);
  app.registerController(controller);

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);

  await app.initialize();

  controller.onDatasourceInitialized(ds, '', app);
  await controller.computedWODtlStatusPriority({'item': {priority: 1}});

  // verfiy the work order status only
  let item = controller.computedWODtlStatusPriority({
    status_description: "Approved",
  });
  
  expect(item[0].label).toEqual("Approved");
  expect(item[0].type).toEqual("white");
  expect(item[0].action).toBe(true);
  
  // verfiy the work order status and priority
  item = controller.computedWODtlStatusPriority({
    status_description: "Approved",
    wopriority: 1
  });
  
  expect(item[0].label).toEqual("Approved");
  expect(item[0].type).toEqual("white");
  expect(item[1].label).toEqual("Priority 1");
  expect(item[1].type).toEqual("dark-gray");
});

it('should navigate to schedulepage datacontroller', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

  const controller = new WorkOrderDataController();
  const schedulePagecontroller = new SchedulePageController();
	const scheduleDatacontroller = new ScheduleDataController();
	
	const app = new Application();
	
  const page = new Page({ name: 'schedule' });
  app.registerPage(page);
  controller.app = app;
  
  
  const ds = newDatasource(workorderitem, 'woDetailResource');
  const listds = newListDatasource(workorderitem, 'dswolist');
  page.registerDatasource(ds); 
  page.registerDatasource(listds);
  
  let items = await ds.load();
	
	await app.initialize();
  page.registerController(controller);
  app.registerController(controller);
  page.registerController(schedulePagecontroller);
  app.registerController(schedulePagecontroller);
  page.registerController(scheduleDatacontroller);
  app.registerController(scheduleDatacontroller);
  app.setCurrentPage = mockSetPage;
	  
  let saveSpy = sinon.spy(controller, "computedWorkTypeButton");
  await controller.computedWorkTypeButton({'item': items[2], 'datasource': ds});
  expect(saveSpy.calledOnce).toEqual(true);
  	
});

it('computedAssetLoc returns right', async () => {
  const controller = new WorkOrderDataController();

  let title = controller.computedAssetLoc({
    assetnum: '12300'
  });
  
  expect(title).toBe('ASSET');

  title = controller.computedAssetLoc({
    assetnum: '',
    location: 'MTP100'
  });
  expect(title).toBe('LOCATION');
});


it("Validate hide/show meter touch point", async () => {
  const controller = new WorkOrderDataController();
  let hideMeterButtn = controller.computedMultiDisableMeter({
    multiassetmetercount: 0,
    multilocationmetercount: 0,
  });

  expect(hideMeterButtn).toBe(true);
});

it("Validate hide/show meter touch point", async () => {
  const controller = new WorkOrderDataController();

  let hideMeterButtn = controller.computedMultiDisableMeter({
    multiassetmetercount: 1,
    multilocationmetercount: 1,
  });

  expect(hideMeterButtn).toBe(false);
});

it('computedMeterCurDate returns expected data', async () => {
  const controller = new WorkOrderDataController();

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
  const controller = new WorkOrderDataController();

  let date = controller.computedMeterCurTime({
    newreading: 1000, computedMeterCurTime: '5/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
  });
  let datetime = new Date();
  expect(date).toEqual(datetime.getTime());
});

it('computedTaskStatus function to display status on task page', async () => {
  const controller = new WorkOrderDataController();
  const app = new Application();
  const page = new Page({name: 'tasks'});
  app.registerPage(page);
  app.registerController(controller);
  const ds = newDatasource(tasklist, 'woPlanTaskDetailds');
  app.registerDatasource(ds);
  await app.initialize();

  let item = controller.computedTaskStatus({
    status_description: "Approved"
  });

  expect(item[0].label).toEqual("Approved");
});

it('hideLockIcon function to show/hide lock/complete button on task page', async () => {
  
  const controller = new WorkOrderDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  const page2 = new Page({name: 'tasks'});
  app.registerPage(page);
  app.registerPage(page2);
  app.registerController(controller);
  const ds = newDatasource(tasklist, 'woPlanTaskDetailds');
  const ds2 = newDatasource(singleDetail, 'woDetailResource');
  const dsworktype = newDatasource(worktype, "dsworktype");
  const woData = {...workorderitem};
  woData.member[0].flowcontrolled = true;
  const wodetails = newDatasource(woData, 'woDetailds');
	app.registerDatasource(wodetails);
  app.registerDatasource(dsworktype);
  app.registerDatasource(ds);
  page.registerDatasource(ds2);
  await app.initialize();
  await wodetails.load();
  await dsworktype.load()
  await ds.load()
  await ds2.load()
  ds2.item.worktype = 'CM';

  let item = controller.hideLockIcon({
    status_description: "Approved",
    woflowcontrolled: true,
    worktype: 'CM'
  });

  expect(item).toEqual(true);
  ds2.item.worktype = '';
  item = controller.hideLockIcon({
    status_description: "Approved",
    woflowcontrolled: true
  });

  expect(item).toEqual(false);
});

it('show hide task asset or location when it different from parentWO', async () => {
  const controller = new WorkOrderDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  const page2 = new Page({name: 'tasks'});
  app.registerPage(page);
  app.registerPage(page2);
  app.registerController(controller);
  const ds = newDatasource(tasklist, 'woPlanTaskDetailds');
  const ds2 = newDatasource(singleDetail, 'woDetailResource');
  app.registerDatasource(ds);
  page.registerDatasource(ds2);
  await app.initialize();
  await ds.load()
  await ds2.load()

  ds2.item.assetnumber = '145';
  ds2.item.locationnum = 'DENMARK';
  let item = controller.computedParentAssetLocation({assetnum: "123",location: "UPS"});
  expect(item).toEqual(false);

  ds2.item.assetnumber = '';
  ds2.item.locationnum = '';
  item = controller.computedParentAssetLocation({assetnum: '',location: ''});
  expect(item).toEqual(true);

  ds2.item.assetnumber = "123";
  ds2.item.locationnum = '';
  item = controller.computedParentAssetLocation({assetnum: "123",location: ''});
  expect(item).toEqual(true);

  ds2.item.assetnumber = '';
  ds2.item.locationnum = "UPS";
  item = controller.computedParentAssetLocation({assetnum: '',location: "UPS"});
  expect(item).toEqual(true);

});

it('show hide task asset or location when it different from parentWO', async () => {
  const controller = new WorkOrderDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  const page2 = new Page({name: 'tasks'});
  app.registerPage(page);
  app.registerPage(page2);
  app.registerController(controller);
  const ds = newDatasource(tasklist, 'woPlanTaskDetailds');
  const ds2 = newDatasource(singleDetail, 'woDetailResource');
  app.registerDatasource(ds);
  page.registerDatasource(ds2);
  await app.initialize();
  await ds.load()
  await ds2.load()

  ds2.item.assetnumber = '';
  ds2.item.locationnum = "UPS";
  let item = controller.computedParentAssetLocation({assetnum: '',location: "UPS",description_longdescription:""});
  expect(item).toEqual(true);

  let data  = controller.computedBorderDisplay({assetnum: '',location: "UPS",description_longdescription:""});
  expect(data).toEqual(false);

  ds2.item.assetnumber = '123';
  ds2.item.locationnum = "UPS";
  item = controller.computedParentAssetLocation({assetnum: '157',location: "DENMARK",description_longdescription:""});
  expect(item).toEqual(false);

  data  = controller.computedBorderDisplay({assetnum: '157',location: "DENMARK",description_longdescription:""});
  expect(data).toEqual(false);

  
  ds2.item.assetnumber = '123';
  ds2.item.locationnum = "UPS";
  item = controller.computedParentAssetLocation({assetnum: '157',location: "DENMARK",description_longdescription:""});
  expect(item).toEqual(false);

  data  = controller.computedBorderDisplay({assetnum: '157',location: "DENMARK",description_longdescription:"Desc Added"});
  expect(data).toEqual(true);
});
