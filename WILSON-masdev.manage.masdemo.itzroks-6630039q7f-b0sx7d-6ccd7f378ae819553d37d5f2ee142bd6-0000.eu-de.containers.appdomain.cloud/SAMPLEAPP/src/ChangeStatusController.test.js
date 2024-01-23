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

import ChangeStatusController from './ChangeStatusController' ;
import {Application, Page, JSONDataAdapter, Datasource} from '@maximo/maximo-js-api';
import statusitem from './test/statuses-json-data.js';
import workorderitem from "./test/wo-failure-report-json-data";

function newStatusDatasource (data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter ({
    src: statusitem,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource (da, {
    idAttribute: 'value',
    name: name,
  });

  return ds;
}
function newDatasource(data = workorderitem, items="member", idAttribute="wonum", name = "woDetailsReportWork") {
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

it('checkEsigRequired', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new ChangeStatusController();
	const app = new Application();
	const page = new Page({name: 'page'});
	page.registerController(controller);
	const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
	app.registerController(controller);
	const dsstatusDomainList = newStatusDatasource(statusitem, 'dsstatusDomainList');
	parentPage.registerDatasource(dsstatusDomainList);
	app.registerPage(page);
	await app.initialize();
	app.setCurrentPage = mockSetPage;
	page.parent.state.appVar = app;
	controller.dialogInitialized(page, app);
	app.state = {
		systemProp: {
		  'maximo.mobile.wostatusforesig': 'APPR,INPROG'
		}      
	  };
	page.state.selectedStatus = 'APPR';
	expect(controller.checkEsigRequired()).toBeTruthy();

	page.state.selectedStatus = 'WAPPR';
	expect(controller.checkEsigRequired()).toBeFalsy();
});

it('SelectStatus', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new ChangeStatusController();
	const app = new Application();
	const page = new Page({name: 'page'});
	page.registerController(controller);
	const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
	app.registerController(controller);
	const dsstatusDomainList = newStatusDatasource(statusitem, 'dsstatusDomainList');
	parentPage.registerDatasource(dsstatusDomainList);

	await app.initialize();
	let item = {'value':'APPR'};
	page.parent.datasources.dsstatusDomainList.setSelectedItem(item, true);

	app.setCurrentPage = mockSetPage;
	app.state = {
        systemProp: {
          'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR'
        },
      };
	page.parent.state.appVar = app;
	controller.dialogInitialized(page, app);
	await controller.selectStatus(item);
	expect(page.state.selectedStatus).toBeTruthy();
	expect(page.parent.state.disableDoneButton).toBe(false);
	controller.dialogOpened(page, app);
	expect(page.state.statusMemo).toBe('');

	page.parent.datasources.dsstatusDomainList.setSelectedItem(item, false);
	let item2 = { value: "APPR",'maxvalue':'APPR'};
	await controller.selectStatus(item2);
	expect(page.parent.state.disableDoneButton).toBe(true);
});

it('Set Status Memo', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new ChangeStatusController();
	const app = new Application();
	const page = new Page({name: 'page'});
	page.registerController(controller);
	const parentPage = new Page({name: 'parentPage'});

	page.parent = parentPage ;
    page.state.statusMemo='';
	app.registerController(controller);
	await app.initialize();

	let event = {'currentTarget':{'value':'Status Memo'}};
	app.setCurrentPage = mockSetPage;
	controller.dialogInitialized(page, app);
	await controller.setStatusMemo(event);
	expect(page.state.statusMemo).toBeTruthy();	
});
it("Validate onSignatureUpload", async () => {
	let mockSetPage = jest.fn();
	const controller = new ChangeStatusController();
	const app = new Application();
	const page = new Page({ name: "page" });
	page.registerController(controller);
	const parentPage = new Page({ name: "parentPage" });
  	page.parent = parentPage;
	app.registerController(controller);
	page.parent.state.appVar = app;
	page.parent.state.referencePage = "workOrderDetails";
	app.state = {'doclinksCountData': [] };
	controller.dialogInitialized(page, app);
	const woDetailResource = newDatasource(workorderitem, "member", "wonum", "woDetailResource");
    app.registerDatasource(woDetailResource);
    page.parent.state.woItem = await woDetailResource.load();
	await app.initialize();
	page.changeStatus = mockSetPage;
	let event = { currentTarget: { value: "Status Memo" } };
	await controller.onSignatureUpload(event);
	expect(app.state.doclinksCount).toBe('1001');
});

it('selectTaskStatus', async () => {
	let mockSetPage = jest.fn();
	global.open = jest.fn();

	const controller = new ChangeStatusController();
	const app = new Application();
	const page = new Page({name: 'page'});
	page.registerController(controller);
	const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
	app.registerController(controller);
	const taskstatusDomainList = newStatusDatasource(statusitem, 'taskstatusDomainList');
	parentPage.registerDatasource(taskstatusDomainList);

	await app.initialize();
	
	app.setCurrentPage = mockSetPage;
	app.state = {
        systemProp: {
          'maximo.mobile.statusforphysicalsignature': 'APPR,WAPPR'
        },
      };
	page.parent.state.appVar = app;
	let item = {'value':'APPR'};
	page.parent.datasources.taskstatusDomainList.setSelectedItem(item, true);
	controller.dialogInitialized(page, app);
	await controller.selectTaskStatus(item);
	expect(page.parent.state.selectedTaskStatus).toBeTruthy();
	expect(page.parent.state.disableDoneButton).toBe(false);
	
	let item1 = {'value':'APPR'};
	page.parent.datasources.taskstatusDomainList.setSelectedItem(item1, false);
	await controller.selectTaskStatus(item1);
	expect(page.parent.state.disableDoneButton).toBe(true);
});
