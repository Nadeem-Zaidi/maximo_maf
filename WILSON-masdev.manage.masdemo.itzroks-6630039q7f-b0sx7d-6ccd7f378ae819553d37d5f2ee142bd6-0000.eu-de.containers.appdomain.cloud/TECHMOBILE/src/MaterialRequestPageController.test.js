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

import MaterialRequestPageController from './MaterialRequestPageController';
import { Application, Page, JSONDataAdapter, Datasource, Dialog} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import SynonymUtil from "./utils/SynonymUtil";
import workorderitem from './test/wo-failure-report-json-data';
import statusitem from './test/statuses-json-data';
import wpmaterial from './test/materials-json-data';
import wolocationmeters from './test/locationmeter-json-data';

function materialDatasource(data = wpmaterial, idAttribute = 'wonum', items = 'member', name = 'inventoryListDS') {
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
function newDatasource(
	data = workorderitem,
	items = 'member',
	idAttribute = 'wonum',
	name = 'woMaterialRequestResource'
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
function newStatusDatasource(data = statusitem, name = 'materialRequestSynonymDS') {
	const da = new JSONDataAdapter({
		src: statusitem,
		items: 'member',
		schema: 'responseInfo.schema',
	});
	const ds = new Datasource(da, {
		idAttribute: 'value',
		name: name,
	});
	return ds;
}
function newSetIdDatasource(data = statusitem, name = 'defaultSetDs') {
	const da = new JSONDataAdapter({
		src: data,
		items: 'member'
	});
	const ds = new Datasource(da, {
		idAttribute: 'value',
		name: name,
	});
	return ds;
}

let setData = {
	member: [
		{
			_rowstamp: "239020",
			itemsetid: "SET1",
			href: "oslc/os/mxapiorganization/_RUFHTEVOQQ--",
			orgid: "EAGLENA"
		}
	]
};

  it('test the page-changing event is fired on application initialization', async () => {
	let mockedFn = jest.fn();
	let app = new Application();
	let controller = new MaterialRequestPageController();

	let nextPage = new Page({ name: 'workOrderDetails' });
	let prevPage = new Page({ name: 'materialRequest' });
	app.registerPage(prevPage);
	app.registerPage(nextPage);
	app.registerController(controller);
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymDSData = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	prevPage.registerDatasource(mrLineDS);
	app.registerDatasource(synonymdomainData);
	prevPage.registerDatasource(synonymDSData);
	prevPage.registerDatasource(inventoryDS);
	prevPage.registerDatasource(woMaterialRequestResource);
	prevPage.registerDatasource(itemListDS);
	await app.initialize();
	await app.emit('page-changing', nextPage, prevPage);
	nextPage.showDialog = mockedFn;
	nextPage.slidingwodetailsmaterials = mockedFn;
	nextPage.showDialog('slidingwodetailsmaterials');
	expect(nextPage.slidingwodetailsmaterials.mock.calls.length).toBe(1);
  });

it('should load material request page data', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.registerPage(page);
	app.registerController(controller);
	
	const mrLineDS = materialDatasource(wpmaterial, 'member','itemnum', 'mrLineDS'); 
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
    const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const setDS = newSetIdDatasource(setData, 'defaultSetDs');
	const mrLineDsJson = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDsJson');
	page.registerDatasource(mrLineDsJson);
	app.registerDatasource(setDS);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(itemListDS);
	page.registerDatasource(mrLineDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(materialRequestSynonymDS);
	
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA',
			insertOrg: 'EAGLENA'
		},
		checkSigOption: (option) => true,
    	findSigOption: (appName, sigoption) => true,
	};
	
	page.state.multipleStore = false;
	page.params.mr = '';
	await app.initialize();
	controller.pageInitialized(page, app);
	controller.loadRecords=jest.fn();
	controller.loadMrLineDs=jest.fn();
	controller.pageResumed(page);
	await controller.loadRecords(page);
	expect(page.state.synonymData).not.toBeNull();
});

it('should load material request page data with incoming context', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.registerPage(page);
	app.registerController(controller);
	const mrLineDS = materialDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDS'); 
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
    const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDsJson = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDsJson');
	page.registerDatasource(mrLineDsJson);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(itemListDS);
	page.registerDatasource(mrLineDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(materialRequestSynonymDS);
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			insertOrg: 'EAGLENA'
		},
		checkSigOption: (option) => true,
    	findSigOption: (appName, sigoption) => true,
	};
	
	let setDS = newSetIdDatasource(setData, 'defaultSetDs');
	app.registerDatasource(setDS);
	page.state.multipleStore = false;
	page.params.mr = '';
	await app.initialize();
	app.state.incomingContext = { page: 'materialRequest', itemnum : '123232', itemsetid:'SET1'};
	controller.pageInitialized(page, app);
	controller.loadRecords=jest.fn();
	controller.loadMrLineDs=jest.fn();
	controller.pageResumed(page);
	await controller.loadRecords(page);
	expect(page.state.synonymData).not.toBeNull();
	expect(page.state.itemnum).toEqual(undefined);
	app.state.incomingContext=null;
	await controller.loadRecords(page);
});

it('should handle incoming context returned from Parts Identifier',async()=>{
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	controller.loadRecords=jest.fn();
	controller.loadMrLineDs=jest.fn();
	controller.openMaterialListDrawer=jest.fn();
	controller.chooseItem=jest.fn();
    const itemListDS = materialDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	itemListDS.searchQBE=()=>Promise.resolve(wpmaterial.wpmaterial);
	const mrLineListDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const woMaterialRequestResource = newDatasource(workorderitem, 'member', 'itemnum', 'woMaterialRequestResource');
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');

	page.registerDatasource(materialRequestSynonymDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(mrLineDS);
	page.registerDatasource(itemListDS);
	page.registerDatasource(mrLineListDS);
	app.state.incomingContext = { page: 'materialRequest', itemnum : '20778', itemsetid:'SET1'};
	sessionStorage.setItem("mrLineListDS_item",JSON.stringify({qty:10}))
	sessionStorage.setItem("mrLineDS_item",JSON.stringify({"droppoint":"my droppoint","priority":44,"requireddate":"2012-02-02"}))
	sessionStorage.setItem("mrLineDsJson_items",JSON.stringify(wpmaterial))
	const mrLineList = {};
	mrLineList["description"] = "Centeral storeroom";
	mrLineList["storeloc_desc"] = "Centeral storeroom";
	mrLineList['storeLocation'] = 'CENTRAL';
	mrLineList['quantity'] = '1';
	mrLineList["mrlineid"] = 1011;
	sessionStorage.setItem("mrLineLists",JSON.stringify([mrLineList]))
	controller.pageInitialized(page, app);
	await controller.setIncomingContext();
	expect(controller.openMaterialListDrawer).toHaveBeenCalledTimes(1);
	expect(controller.page.state.mrLineLists).toStrictEqual([mrLineList]);
	const loadMrLineDsParam={...wpmaterial};
	delete loadMrLineDsParam["_selected"]
	page.params.mr = {'mrnum': '1001'};
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			insertOrg: 'EAGLENA'
		},
	};
	expect(controller.loadMrLineDs).toHaveBeenCalledWith(wpmaterial);
	expect(controller.chooseItem).toHaveBeenCalledWith(wpmaterial.wpmaterial[0]);
	expect(sessionStorage.getItem("mrLineListDS_item")).toBeNull();
	expect(sessionStorage.getItem("mrLineDS_item")).toBeNull();
	expect(sessionStorage.getItem("mrLineDsJson_items")).toBeNull();
	expect(sessionStorage.getItem("mrLineLists")).toBeNull();
	expect(controller.page.state.disableAction).toBeTruthy();
	expect(controller.page.datasources.mrLineListDS.item['qty']).toBe(10);
	expect(controller.page.datasources.mrLineDS.item['droppoint']).toBe("my droppoint");
	expect(controller.page.datasources.mrLineDS.item['priority']).toBe(44);
	expect(controller.page.datasources.mrLineDS.item['requireddate']).toBe("2012-02-02");

	await controller.LoadPageResumed()
	expect(controller.loadRecords).toHaveBeenCalledTimes(1);
	expect(controller.app.state.incomingContext).toBeNull();
})

it("should load mr in LoadPageResumed", async ()=>{
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	const woMaterialRequestResource = newDatasource(workorderitem, 'member', 'itemnum', 'woMaterialRequestResource');
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	mrLineDS.searchQBE=()=>Promise.resolve([{"mrline":{ itemnum: 1000 },"droppoint":"my droppoint","priority":44,"requireddate":"2012-02-02"}]);

	page.registerDatasource(mrLineDS);
	page.registerDatasource(materialRequestSynonymDS);
	page.registerDatasource(woMaterialRequestResource);
	page.params.mr = {'mrnum': '1001'};
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			insertOrg: 'EAGLENA'
		},
	};
	controller.loadRecords=jest.fn();
	controller.loadMrLineDs=jest.fn();

	controller.pageInitialized(page, app);

	await controller.LoadPageResumed();
	expect(controller.loadMrLineDs).toHaveBeenCalledWith({ itemnum: 1000 });
})

it('Open the openMaterialsDrawer()', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const woReportWorkDs = newDatasource(workorderitem, 'member', 'wonum', 'mrLineListDS');
	page.registerDatasource(woReportWorkDs);
    const ds = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS);
	app.registerDatasource(synonymdomainData);
	app.registerDatasource(ds);
	let loadstub = sinon.stub(ds, 'searchQBE');
	app.registerController(controller);
	await app.initialize();
	controller.pageInitialized(page, app);
    
	controller.openMaterialListDrawer({ page: page, app: app }, app, page);
	expect(page.state.saveAction).toBe(false);
	expect(page.state.disableAction).toBe(false);
	expect(loadstub.displayName).toBe('searchQBE');
});

it('should open items lookup for asset meter', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'page' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
    const synonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
    const itemListDS = materialDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS);
	app.registerDatasource(synonymdomainData);
    page.registerDatasource(itemListDS);
	page.registerDatasource(synonymDS);
    let itemList = sinon.stub(itemListDS, 'searchQBE');
	app.registerController(controller);
	await app.initialize();

	app.setCurrentPage = mockSetPage;
	controller.pageInitialized(page, app);
	let event = { page: page, app: app}
	await controller.openItemListLookup(event);
    expect(itemList.displayName).toBe('searchQBE');
});

it('should Open the openStoreRoomLookup()', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const locationListDS = newDatasource(wolocationmeters, 'member', 'location', 'locationListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(locationListDS);

	app.registerController(controller);
	await app.initialize();
	controller.pageInitialized(page, app);
	let evt = { page: page, app: app };
	locationListDS.item.location = 'CENTRAL';

	await controller.openStoreRoomListLookup(evt);
	expect(page.datasources['locationListDS'].item.location).toEqual('CENTRAL');
});

it('Choose chooseItem from lookup', async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	page.showDialog = showDialog;
	const mrLineDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const itemConditionDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemConditionDS');
	page.registerDatasource(itemConditionDS);
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	mrLineDS.item.mrline = { itemnum: 1000 };
	page.registerDatasource(mrLineDS);
	page.registerDatasource(inventoryDS);
	app.registerController(controller);
	sinon.stub(itemConditionDS, "clearState");
	await app.initialize();
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultSite: 'BADFORD',
		},
	};
	let evt = {
		itemnum: '10001',
		description: 'Test-material',
        asset : {'manufacturer':'ATI',vendor:'PLUS'}
	};
	controller.pageInitialized(page, app);
	controller.chooseItem(evt);
	expect(page.state.itemnum).toEqual('10001');
});

it('Choose chooseItem from lookup - humai integration', async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	controller.setStoreRoom=jest.fn();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	page.state.mrLineList={};
	page.showDialog = showDialog;
	const mrLineDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const itemConditionDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemConditionDS');
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(itemConditionDS);
	mrLineDS.item.mrline = { itemnum: 1000 };
	page.registerDatasource(mrLineDS);
	app.registerController(controller);
	sinon.stub(itemConditionDS, "clearState");
	await app.initialize();
	let evt = {
		itemnum: '10001',
		description: 'Test-material',
        asset : {'manufacturer':'ATI',vendor:'PLUS'}
	};
	controller.pageInitialized(page, app);
	await controller.chooseItem(evt);
	expect(page.state.itemnum).toEqual('10001');
});

it('Choose StoreRoom from lookup', async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	page.showDialog = showDialog;
	const mrLineDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(inventoryDS);
	mrLineDS.item.mrline = { location: 'CENTRAL' };
	page.registerDatasource(mrLineDS);
	app.registerController(controller);
	page.state.mrLineList = {};
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultSite: 'BADFORD',
		},
	};
	await app.initialize();
	let evt = {
		itemnum: '10001',
		description: 'Test-material',
		location: 'CENTRAL'
	};
	controller.pageInitialized(page, app);
	controller.chooseStoreRoom(evt);
	expect(page.state.storeloc).toEqual('CENTRAL');
});

it('verify the setStoreRoom()', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	const inventoryDS = materialDatasource(wpmaterial, 'wpmaterial','itemnum', 'inventoryListDS');
	const synonymDSData = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const locationDS = newDatasource(wolocationmeters, 'member', 'location', 'locationListDS');
    const mrLineDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	page.registerDatasource(mrLineDS);
	page.registerDatasource(synonymDSData);
	page.registerDatasource(locationDS);
	page.registerDatasource(inventoryDS);
	sinon.stub(inventoryDS, "searchQBE");
	sinon.stub(mrLineDS, "searchQBE");
	let locationList = sinon.stub(locationDS, 'searchQBE');
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultSite: 'BADFORD',
		},
	};
	app.registerController(controller);
	await app.initialize();
	controller.pageInitialized(page, app); 
	await controller.setStoreRoom();
	expect(locationList.displayName).toBe('searchQBE');
	page.state.itemnum = '11111';
	page.state.synonymData = null;
	
	await controller.setStoreRoom();
	expect(locationList.displayName).toBe('searchQBE');
})

it('verify mrRequest function', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.registerPage(page);
	const workOrderDetailsPage = new Page({name: 'workOrderDetails'});
	app.registerPage(workOrderDetailsPage);
	workOrderDetailsPage.showDialog = jest.fn();
	const mrLineDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineDS');
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const woMaterialRequestResource = newDatasource(workorderitem, 'member', 'itemnum', 'woMaterialRequestResource');
	const itemListDS = materialDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	let inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const setDS = newSetIdDatasource(setData, 'defaultSetDs');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	app.registerDatasource(synonymdomainData);
	app.registerDatasource(setDS);
	page.registerDatasource(inventoryDS);
	page.registerDatasource(itemListDS);
	page.registerDatasource(materialRequestSynonymDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(mrLineDS);
	app.registerController(controller);
	
	await app.initialize();
	page.state.isSavedMaterial = true;
	
	controller.pageInitialized(page, app);
	let forceReloadStub = sinon.stub(mrLineDS, 'forceReload');
	const putAction = sinon.stub(mrLineDS, "put");
	page.state.mrLineList = {};
	page.state.itemnum = '1001';
	page.state.mrLineList["description"] = "Centeral storeroom";
	page.state.mrLineList["storeloc_desc"] = "Centeral storeroom";
	page.state.mrLineList['storeLocation'] = 'CENTRAL';
	page.state.mrLineList['quantity'] = '1';
	page.state.mrLineList["mrlineid"] = 1011;
	page.state.mrlineid = 1011;
	page.state.mrLineLists = [page.state.mrLineList];
	controller.LoadPageResumed= jest.fn();
	controller.loadRecords = jest.fn();
	controller.loadMrLineDs=jest.fn();
	controller.saveDataSuccessful = true;
	await controller.mrRequest({ page: page, app: app });
	expect(page.state.loadingMaterialRequest).toEqual(false);
	expect(putAction.called).toBe(true);
	expect(putAction.displayName).toBe('put');
	expect(putAction.args.length).toBe(1);
	expect(forceReloadStub.displayName).toBe('forceReload');
	putAction.restore();
	forceReloadStub.restore();
});

it('Choose requestMaterialLine', async () => {
	let showDialog = jest.fn();
	let mockedFn = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	page.showDialog = showDialog;
	const itemListDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(itemListDS);
	app.registerController(controller);
	page.state.isMrLineAdded = '';
	page.state.mrLineList = {};
	page.state.itemnum = '1001';
	page.state.mrLineList["description"] = "Centeral storeroom";
	page.state.mrLineList["storeloc_desc"] = "Centeral storeroom";
	page.state.mrLineList['storeLocation'] = 'CENTRAL';
	page.state.mrLineList['quantity'] = '1';
	page.state.mrLineList["mrlineid"] = 1011;
	page.state.mrlineid = 1011;
	page.state.mrLineLists = [page.state.mrLineList];
	page.state.editLookup = true;
	const AddItemDrawer = new Dialog({
		name: "AddItemDrawer",
	});
	page.registerDialog(AddItemDrawer);
	AddItemDrawer.closeDialog = jest.fn();
	await app.initialize();
	controller.pageInitialized(page, app);
	controller.loadMrLineDs = mockedFn;
	controller.validateMrRequest = mockedFn;
	controller.requestMaterialLine({ page: page, app: app });
	expect(page.state.description).toEqual('1001 Centeral storeroom');
	expect(page.state.storeLocation).toEqual('CENTRAL');
	expect(controller.loadMrLineDs.mock.calls.length).not.toBeNull();
	expect(controller.validateMrRequest.mock.calls.length).not.toBeNull();
});

it('Verify validateMrLines function', async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	page.showDialog = showDialog;
	const itemListDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	itemListDS.item.mrline = { itemnum: '10001', storeloc: 'CENTRAL', qty: 1 };
	page.registerDatasource(itemListDS);
	app.registerController(controller);
	page.state.mrLineList = {};
	await app.initialize();
	controller.pageInitialized(page, app);
	controller.validateMrLines({ page: page, app: app });
	expect(page.state.disableAction).toEqual(false);
});

it('Verify validateMrRequest function', async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	page.showDialog = showDialog;
	const itemListDS = newDatasource(workorderitem, 'member', 'itemnum', 'mrLineDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	app.registerDatasource(synonymdomainData);
	itemListDS.item.mrline = { itemnum: '10001', storeloc: 'CENTRAL', qty: 1 };
	page.registerDatasource(itemListDS);
	app.registerController(controller);
	page.state.mrLineList = { itemnum: '10001' };
	await app.initialize();
	controller.pageInitialized(page, app);
	controller.validateMrRequest({ page: page, app: app });
	expect(page.state.disableMrRequestAction).toEqual(true);
});

it('Verify setOrderUnit function', async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	page.showDialog = showDialog;
	const itemListDS = newDatasource(wpmaterial, 'wpmaterial', 'itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(itemListDS);
	app.registerController(controller);
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultSite: 'BADFORD',
		},
	};
	page.state.itemnum = '20778';
	page.state.storeloc = 'CENTRAL';
	controller.pageInitialized(page, app);
	controller.setOrderUnit();
});

it('Verify loadMrLineDs function', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDsJson');
	const itemConditionDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemConditionDS');
	let inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(inventoryDS);
	page.registerDatasource(itemListDS);
	sinon.stub(itemListDS, "clearState");
	sinon.stub(itemConditionDS, "clearState");
	app.registerController(controller);
	//await inventoryDS.load();
	await app.initialize();
	controller.pageInitialized(page, app);
	const items = [
		{
			description: "12 Volt Battery",
			wonum: "EB12",
		}
	]
	await controller.loadMrLineDs(items);
	expect(itemListDS.dataAdapter.items.length).toBe(1);
});

it('Verify viewMrline function', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineListDS');
	let inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(inventoryDS);
	page.registerDatasource(itemListDS);
	app.registerController(controller);
	await app.initialize();
	controller.pageInitialized(page, app);
	let evt = {
		item: itemListDS.item,
		datasource: itemListDS,
	};
	await controller.viewMrline(evt);
	expect(page.state.editLookup).toEqual(true);
	page.params.mr = {'mrnum': '1001'};
	await controller.viewMrline(evt);
	expect(page.state.editLookup).toEqual(false);
	expect(page.state.mrlineid).toEqual('');
});

it('Verify onCustomSaveTransition function', async () => {
	let mockedFn = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineListDS');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(inventoryDS);
	page.registerDatasource(itemListDS);
	app.registerController(controller);
	await app.initialize();
	controller.pageInitialized(page, app);
	controller.mrRequest = mockedFn;	
	await controller.onCustomSaveTransition();
	expect(controller.mrRequest.mock.calls.length).not.toBeNull();
});


it('should load material request page data', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.registerPage(page);

	app.registerController(controller);
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const locationListDS = newStatusDatasource(wolocationmeters, 'locationListDS');
    const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const mrLineDsJson = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDsJson');
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA',
			insertOrg: 'EAGLENA'
		},
		checkSigOption: (option) => true,
		findSigOption: (appName, sigoption) => true,
	};
	const setDS = newSetIdDatasource(setData, 'defaultSetDs');
	app.registerDatasource(setDS);
	await setDS.load();
	page.registerDatasource(mrLineDsJson);
	page.registerDatasource(inventoryDS);
	page.registerDatasource(itemListDS);
	page.registerDatasource(mrLineDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(materialRequestSynonymDS);
	app.registerDatasource(synonymdomainData);
	page.state.multipleStore = false;
	page.params.mr = '';
	let SynonymDS = sinon.stub(materialRequestSynonymDS, 'searchQBE');
	page.registerDatasource(locationListDS);
	await app.initialize();
	controller.pageInitialized(page, app);
	controller.loadMrLineDs=jest.fn();
	await controller.pageResumed(page);
	await controller.loadRecords(page);
	expect(page.state.synonymData).not.toBeNull();
	expect(SynonymDS.displayName).toBe('searchQBE');
});

it('should deleteMaterialLine', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.registerPage(page);

	app.registerController(controller);
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const workOrderDetailsPage = new Page({ name: "workOrderDetails25" });
	app.registerPage(workOrderDetailsPage);
	workOrderDetailsPage.showDialog = jest.fn();
	const mrDS = newDatasource(wpmaterial, "member", "itemnum", "mrDS");
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const mrLineDsJson = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDsJson');
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const materialRequestSynonymDS = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	app.registerDatasource(synonymdomainData);
	page.registerDatasource(inventoryDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(mrLineDsJson);
	page.registerDatasource(itemListDS);
	page.registerDatasource(materialRequestSynonymDS);
	workOrderDetailsPage.registerDatasource(mrDS);
	page.registerDatasource(mrLineDS);
	sinon.stub(mrLineDsJson, "clearState");
	let loadMrLineDs = sinon.stub(controller, 'loadMrLineDs');
	let validateMrRequest = sinon.stub(controller, 'validateMrRequest');
	page.params.mr = '{}';
	page.state.mrLineList = {};
	page.state.itemnum = '1001';
	page.state.mrLineList["description"] = "Centeral storeroom";
	page.state.mrLineList["storeloc_desc"] = "Centeral storeroom";
	page.state.mrLineList['storeLocation'] = 'CENTRAL';
	page.state.mrLineList['quantity'] = '1';
	page.state.mrLineList["mrlineid"] = 1011;
	page.state.mrlineid = 1011;
	page.state.mrLineLists = [page.state.mrLineList];
	const AddItemDrawer = new Dialog({
		name: "AddItemDrawer",
	});
	page.registerDialog(AddItemDrawer);
	AddItemDrawer.closeDialog = jest.fn();
	await app.initialize();
	controller.pageInitialized(page, app);
	let evt = {
		page: page,
		app: page
	}

	await controller.deleteMaterialLine(evt);
	expect(page.state.mrLineLists.length).toBe(0);
	expect(page.state.isMrLineAdded).toBe(false);
	expect(loadMrLineDs.called).toBe(true);
	expect(validateMrRequest.called).toBe(true);
});

it('should delete requested MR', async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: 'materialRequest' });
	app.registerPage(page);
	app.registerController(controller);
	const workOrderDetailsPage = new Page({ name: "workOrderDetails" });
	app.registerPage(workOrderDetailsPage);
	workOrderDetailsPage.showDialog = jest.fn();
	const mrDS = newDatasource(wpmaterial, "member", "itemnum", "mrDS");
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const inventoryDS = materialDatasource(wpmaterial, 'member','itemnum', 'inventoryListDS');
	const synonymDSData = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	page.registerDatasource(synonymDSData);
	page.registerDatasource(mrLineDS);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(inventoryDS);
	workOrderDetailsPage.registerDatasource(mrDS);
	page.registerDatasource(itemListDS);
	app.client = {
		userInfo: {
			personid: 'SAM',
			defaultStoreroom: 'UPS',
			defaultOrg: 'EAGLENA'
		},
	};
	const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
	const setDS = newSetIdDatasource(setData, 'defaultSetDs');	
	page.state.multipleStore = false;
	page.params.mr = "{'mrnum':'1001'}";
	sinon.stub(SynonymUtil, 'getDefaultExternalSynonymValue').returns('CAN');
	let updatestub = sinon.spy(mrDS, "update"); 
	sinon.stub(itemListDS, "searchQBE");
	await app.initialize();
	app.registerDatasource(synonymdomainData);
	app.registerDatasource(setDS);
	controller.pageInitialized(page, app);
	await controller.deleteMrRequest(page);
	expect(updatestub.calledOnce).toBe(true);
    expect(updatestub.getCall(0).args[0]).toHaveProperty("status");
});
it('test the openConditionCodeLookup', async () => {
	let mockedFn = jest.fn();
	let app = new Application();
	let controller = new MaterialRequestPageController();
	let page = new Page({ name: 'materialRequest' });
	app.registerPage(page);
	app.registerController(controller);
	const mrLineDsJson = newDatasource(wpmaterial, 'member', 'itemnum', 'mrLineDsJson');
	const itemListDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemListDS');
	const woMaterialRequestResource = newDatasource(wpmaterial, 'member', 'itemnum', 'woMaterialRequestResource');
	const synonymDSData = newStatusDatasource(statusitem, 'materialRequestSynonymDS');
	const mrLineDS = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS);
	page.registerDatasource(synonymDSData);
	page.registerDatasource(woMaterialRequestResource);
	page.registerDatasource(itemListDS);
	page.registerDatasource(mrLineDsJson);
	await app.initialize();
	page.showDialog = mockedFn;
	let evt = { page: page, app: app };
	page.showDialog("conditionCodeLookup");
	controller.openConditionCodeLookup(evt);
});
it("select condition code from lookup", async () => {
	let showDialog = jest.fn();
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: "materialRequest" });
	page.showDialog = showDialog;
	const mrLineDS = newDatasource(workorderitem,"member","itemnum","mrLineListDS");
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	const itemConditionDS = newDatasource(wpmaterial,"member","itemnum","itemConditionDS");
	page.registerDatasource(itemConditionDS);
	page.registerDatasource(mrLineDS1);
	mrLineDS.item.mrline = { itemnum: 1000 };
	page.registerDatasource(mrLineDS);
	app.registerController(controller);
	sinon.stub(itemConditionDS, "clearState");
	page.state.mrLineList = {};
	await app.initialize();
	let evt = {
		conditioncode: "10001",
		description: "Test-material",
		asset: { manufacturer: "ATI", vendor: "PLUS" },
	};
	controller.pageInitialized(page, app);
	controller.selectConditionCode(evt);
	expect(page.state.mrLineList['conditioncode']).toEqual("10001");
	expect(page.state.mrLineList["conditioncode_desc"]).toEqual("Test-material");
});
it("Verify loadConditionCodeDS function", async () => {
	const controller = new MaterialRequestPageController();
	const app = new Application();
	const page = new Page({ name: "materialRequest" });
	const itemListDS = newDatasource(wpmaterial,"member","itemnum","itemConditionDS");
	const itemConditionDS = newDatasource(wpmaterial,"member","itemnum","itemConditionDS");
	const mrLineDS1 = newDatasource(wpmaterial, "member", "itemnum", "mrLineDS");
	page.registerDatasource(mrLineDS1);
	page.registerDatasource(itemListDS);
	sinon.stub(itemListDS, "clearState");
	sinon.stub(itemConditionDS, "clearState");
	app.registerController(controller);
	await app.initialize();
	controller.pageInitialized(page, app);
	page.state.mrLineList = {};
	const items = [
		{
		description: "12 Volt Battery",
		wonum: "EB12",
		},
	];
	await controller.loadConditionCodeDS(items);
	expect(itemListDS.dataAdapter.items.length).toBe(1);
});
