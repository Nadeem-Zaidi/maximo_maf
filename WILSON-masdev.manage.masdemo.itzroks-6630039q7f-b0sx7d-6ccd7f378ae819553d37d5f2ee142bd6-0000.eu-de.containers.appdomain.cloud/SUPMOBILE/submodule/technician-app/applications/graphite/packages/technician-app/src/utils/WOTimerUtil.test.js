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

import { Application, Page, JSONDataAdapter, Datasource, Device } from '@maximo/maximo-js-api';
import sinon from 'sinon';
import WOTimerUtil from './WOTimerUtil';
import CommonUtil from './CommonUtil';
import ReportWorkPageController from '../ReportWorkPageController';

import workorderitem from '../test/wo-detail-json-data.js';
import labor from "../test/labors-json-data";
import statusitem from '../test/statuses-json-data.js';
import wpmaterial from '../test/materials-json-data';
import wolocationmeters from '../test/locationmeter-json-data';

function newDatasource(data = workorderitem, name = 'workorderds') {
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

function newLaborDetailDatasource(data = labor, name = "woLaborDetailds") {
  const da = new JSONDataAdapter({
    src: data,
    items: "labordetails2",
  });

  const ds = new Datasource(da, {
    idAttribute: "labtransid",
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

function newDatasourceNew(data = workorderitem, items = "member", idAttribute = "wonum", name = "woDetailsReportWork") {
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

function materialDatasource(data = wpmaterial, idAttribute = 'wonum', items = 'member', name = 'inventoryDS') {
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

describe('WOTimerUtil', () => {
  it('computedTimerStatus function to show/hide button ', async () => {
    let hideStartButton = WOTimerUtil.computedTimerStatus({
      wonum: '1022',
      description: '13170 problem',
      labtrans: [
        {
          laborcode: 'SAM',
          timerstatus: 'Active',
          timerstatus_maxvalue: 'ACTIVE',
        },
      ],
    }, 'SAM');
    expect(hideStartButton).toBe(true);

    hideStartButton = WOTimerUtil.computedTimerStatus({
      wonum: '1022',
      description: '13170 problem',
      labtrans: [
        {
          laborcode: 'SAM',
          timerstatus: 'Complete',
          timerstatus_maxvalue: 'COMPLETE',
        }
      ]
    }, 'SAM');
    expect(hideStartButton).toBe(false);
  });

  const defaultSetDs = {
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
            varname: "CONFIRMLABTRANS",
            vartype: "ORG",
            varvalue: "1"
          }
        ]
      }
    ]
  };

  function newDefaultSetDataSource(data = defaultSetDs, name = "defaultSetDs") {
    const da = new JSONDataAdapter({
      src: data,
      items: 'member',
    });
  
    const ds = new Datasource(da, {
      idAttribute: "itemsetid",
      name: 'defaultSetDs',
    });
  
    return ds;
  };

  it('openConFirmLabTimeDialog', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();
  
    const app = new Application();
    const page = new Page({ name: 'page', state: {} });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    const ds = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(ds);    

    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);
  
    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerController(reportWorkController);
    reportPage.registerDatasource(reportWorkLabords);

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };

    app.setCurrentPage = mockSetPage;
    app.currentPage = reportPage;
    expect(laborDetailDS.item.finishdatetime).toBeUndefined();
    await WOTimerUtil.openConFirmLabTimeDialog(app, page, laborDetailDS, 'stop', 'woConfirmLabTime', 'work');
    expect(laborDetailDS.item.finishdatetime).toBeDefined();
    expect(page.state.woactionType).toEqual('work');

    const defaultSetDs = newDefaultSetDataSource();
    app.registerDatasource(defaultSetDs);
    await defaultSetDs.load();

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);
    
    app.state.networkConnected = false;
    Device.get().isMaximoMobile = true;
  
    let event = {
      field: "newreading",
      item: {
       confirmlabtrans: undefined,
      },
      action : 'stop',
      serviceaddress: {

      }
    };
    await WOTimerUtil.clickStartStopTimer(app, page, event, 'work', wodetails, laborDetailDS, "woConfirmLabTimeOnSchedule");
    expect(laborDetailDS.item.finishdatetime).toBeDefined();
  });

  it('openConFirmLabTimeDialog without synonym data', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();
  
    const app = new Application();
    const page = new Page({ name: 'page', state: {} });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    const ds = newStatusDatasource({}, 'synonymdomainData');
    app.registerDatasource(ds);
    
    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);
  
    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerController(reportWorkController);
    reportPage.registerDatasource(reportWorkLabords);

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };

    app.setCurrentPage = mockSetPage;
    app.currentPage = reportPage;
    
    await WOTimerUtil.openConFirmLabTimeDialog(app, page, laborDetailDS, 'stop', 'woConfirmLabTime', '');
    expect(laborDetailDS.item.finishdatetime).toBeUndefined();
    expect(page.state.woactionType).toBeUndefined();
  });

  it('openConFirmLabTimeDialog with type Travel', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();
  
    const app = new Application();
    const page = new Page({ name: 'page', state: {} });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    const ds = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(ds);
    
    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);
  
    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerController(reportWorkController);
    reportPage.registerDatasource(reportWorkLabords);

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };

    app.setCurrentPage = mockSetPage;
    app.currentPage = reportPage;
    expect(laborDetailDS.item.finishdatetime).toBeUndefined();
    await WOTimerUtil.openConFirmLabTimeDialog(app, page, laborDetailDS, 'stop', 'woConfirmLabTime', 'travel');
    expect(laborDetailDS.item.finishdatetime).toBeDefined();
    expect(page.state.woactionType).toEqual('travel');
  });

  it('startStopTimer', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();
  
    const app = new Application();
    const page = new Page({ name: 'page' });
    const reportPage = new Page({ name: 'report_work' });
    const woDetailsPage = new Page({ name: 'workOrderDetails'});
    const reportWorkController = new ReportWorkPageController();

    const ds = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(ds);
    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);
  
    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {laborcraftrate: {craft: 'ELECT'}, laborcode: 'SAM'}
      },
    };
    
    app.state = {
      systemProp: {
        'maximo.mobile.usetimer': '1',
        'maximo.mobile.allowmultipletimers': '0',
        'maximo.mobile.wostatusforesig': 'APPR,INPROG'
      },
    };

    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');    
    reportPage.registerController(reportWorkController);
    reportPage.registerDatasource(reportWorkLabords);

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);
    
    const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
    app.registerDatasource(todaywoassignedDS);
  
    const items = await wodetails.load();
    await todaywoassignedDS.load();
    if(todaywoassignedDS.items && todaywoassignedDS.items[0].labtrans) {
      todaywoassignedDS.items[0].labtrans[1].timerstatus_maxvalue = "COMPLETE";
    }

    const invokeAction = sinon.stub(wodetails, 'invokeAction').returns(items[0]);
    await app.initialize();
  
    app.setCurrentPage = mockSetPage;

    items[1].allowedstates = {      
        "COMP": [{"description": "Completed", "value": "COMP", "maxvalue": "COMP"}],
        "WAPPR": [{"description": "Waiting on Approval", "value": "WAPPR", "maxvalue": "WAPPR"}],
        "INPRG": [{"description": "In progress", "value": "INPRG", "maxvalue": "INPRG"}]
    };
  
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
  
    expect(invokeAction.called).toBe(true);
    expect(invokeAction.displayName).toBe('invokeAction');
    expect(invokeAction.args.length).toBe(1);
  
    app.currentPage = reportPage;

    const loadAction = sinon.stub(reportWorkController, 'loadRecord');
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'stop', actionType: 'work'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
    expect(loadAction.called).toBe(false);
  
    items[1].starttimerinprg = '1';
    items[1].status_maxvalue = 'APPR'
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
    expect(loadAction.called).toBe(false);

    app.state = {
      systemProp: {
        'maximo.mobile.usetimer': '0',
        'maximo.mobile.allowmultipletimers': '1',
        'maximo.mobile.wostatusforesig': 'APPR,INPROG'
      },
    };
    Device.get().isMaximoMobile = false;
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
    expect(loadAction.called).toBe(false);

    app.currentPage = woDetailsPage;
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
    expect(app.currentPage).toBe(woDetailsPage);
    expect(loadAction.called).toBe(false);
  });

  it('startStopTimerWithoutSynonym', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();
  
    const app = new Application();
    const page = new Page({ name: 'page' });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    const ds = newStatusDatasource({}, 'synonymdomainData');
    app.registerDatasource(ds);

    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);
    
    const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
    app.registerDatasource(todaywoassignedDS);
    
    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {laborcraftrate: {craft: 'ELECT'}, laborcode: 'SAM'}
      },
    };

    app.state = {
      systemProp: {
        'maximo.mobile.usetimer': '1',
        'maximo.mobile.allowmultipletimers': '0'
      },
    };

    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');    
    reportPage.registerController(reportWorkController);
    reportPage.registerDatasource(reportWorkLabords);

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);
  
    const items = await wodetails.load();
    await todaywoassignedDS.load();

    const toastAction = sinon.stub(app, 'toast');
    await app.initialize();
    app.setCurrentPage = mockSetPage; 
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start'}, wodetails, 'WORK', 'Actual work time');
    expect(toastAction.called).toBe(true);
  });

  it('clickSendLabTrans stop from work button', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();

    const app = new Application();
    const page = new Page({ name: 'page', state: { woactionType: 'work' } });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };

    reportPage.registerController(reportWorkController);

    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);

    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerDatasource(reportWorkLabords);
    
    await app.initialize();

    app.setCurrentPage = mockSetPage;

    const savestub = sinon.stub(laborDetailDS, 'save');

    app.currentPage = reportPage;
    reportWorkController.pageInitialized(reportPage, app);
    
    const woDetailsReportWork = newDatasourceNew(labor, "wodetails", "wonum", "woDetailsReportWork");
    const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
    const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
    const reportworksSynonymData = newStatusDatasource(statusitem, 'reportworksSynonymData');
    const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
    const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
    const itemsDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemsDS');
    const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
    
    reportPage.registerDatasource(woDetailsReportWork);
    reportPage.registerDatasource(craftrate);
    reportPage.registerDatasource(reportworksSynonymData);
    
    reportPage.registerDatasource(inventoryDS);
    reportPage.registerDatasource(locationDS);
    reportPage.registerDatasource(synonymDSData);
  
    app.registerDatasource(synonymdomainData);    
    app.registerDatasource(itemsDS);
    
    await WOTimerUtil.clickSendLabTrans(app, page, 'stop', wodetails, laborDetailDS);	
    expect(savestub.called).toBe(true);
  });

  it('clickSendLabTrans stop from travel button', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();

    const app = new Application();
    const page = new Page({ name: 'page', state: { woactionType: 'travel' } });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };

    reportPage.registerController(reportWorkController);

    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);

    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerDatasource(reportWorkLabords);
    
    await app.initialize();

    app.setCurrentPage = mockSetPage;

    const savestub = sinon.stub(laborDetailDS, 'save');

    app.currentPage = reportPage;
    reportWorkController.pageInitialized(reportPage, app);
    
    const woDetailsReportWork = newDatasourceNew(labor, "wodetails", "wonum", "woDetailsReportWork");
    const synonymdomainData = newStatusDatasource(statusitem, 'synonymdomainData');
    const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");
    const reportworksSynonymData = newStatusDatasource(statusitem, 'reportworksSynonymData');
    const inventoryDS = materialDatasource(wpmaterial, 'member', 'inventoryDS');
    const locationDS = newStatusDatasource(wolocationmeters, 'locationDS');
    const itemsDS = newDatasource(wpmaterial, 'member', 'itemnum', 'itemsDS');
    const synonymDSData = newStatusDatasource(statusitem, 'synonymDSData');
    
    reportPage.registerDatasource(woDetailsReportWork);
    reportPage.registerDatasource(craftrate);
    reportPage.registerDatasource(reportworksSynonymData);
    
    reportPage.registerDatasource(inventoryDS);
    reportPage.registerDatasource(locationDS);
    reportPage.registerDatasource(synonymDSData);
  
    app.registerDatasource(synonymdomainData);    
    app.registerDatasource(itemsDS);
    
    await WOTimerUtil.clickSendLabTrans(app, page, 'stop', wodetails, laborDetailDS);	
    expect(savestub.called).toBe(true);
  });

  it('clickSendLabTrans pause', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();

    const app = new Application();
    const page = new Page({ name: 'page', state: { woactionType: 'work' }});
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };
    
    reportPage.registerController(reportWorkController);

    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);

    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerDatasource(reportWorkLabords);
    
    const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData'); 
    const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate"); 
    reportPage.registerDatasource(craftrate);
    await app.initialize();

    app.setCurrentPage = mockSetPage;
    app.registerDatasource(synonymDSData);

    const savestub = sinon.stub(laborDetailDS, 'save');

    await WOTimerUtil.clickSendLabTrans(app, page, 'pause', wodetails, laborDetailDS);	
    expect(savestub.called).toBe(true);
    expect(mockSetPage.mock.calls.length).toBe(0);
  });

  it('clickEditLabor', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();

    const app = new Application();
    const page = new Page({ name: 'page' });
    const reportPage = new Page({ name: 'report_work' });
    const reportWorkController = new ReportWorkPageController();

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {
          laborcode: 'SAM'
        }
      },
    };

    const reportWorkLabords = newDatasource(statusitem, 'reportworkLabords');
    reportPage.registerController(reportWorkController);
    reportPage.registerDatasource(reportWorkLabords);
    
    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);
    const items = await wodetails.load();

    await app.initialize();

    app.setCurrentPage = mockSetPage;
    app.currentPage = reportPage;
    reportWorkController.pageInitialized(reportPage, app);

    const woDetailsReportWork = newDatasourceNew(labor, "wodetails", "wonum", "woDetailsReportWork");
    const synonymDSData = newStatusDatasource(statusitem, 'synonymdomainData');
    const craftrate = newDatasource(labor, "craftrate", "craft", "craftrate");

    reportPage.registerDatasource(woDetailsReportWork);
    reportPage.registerDatasource(craftrate);
    app.registerDatasource(synonymDSData);
    await synonymDSData.load();
    await WOTimerUtil.clickEditLabor(app, items[1].href, items[1]);	
    expect(mockSetPage.mock.calls.length).toBe(1);
  });

  it('removeSecondsFromTimeString test', async () => {
    const time1 = '11:22:33';
    const result1 = WOTimerUtil.removeSecondsFromTimeString(time1);
    expect(result1).toBe('11:22:00');
    const time2 = '2021-02-04T11:22:33';
    const result2 = WOTimerUtil.removeSecondsFromTimeString(time2);
    expect(result2).toBe('2021-02-04T11:22:00');
    const time3 = '2021-02-04T11:22:33+09:00';
    const result3 = WOTimerUtil.removeSecondsFromTimeString(time3);
    expect(result3).toBe('2021-02-04T11:22:00+09:00');
  });
  
  it('open the hazard drawer when starting workorder', async () => {
    let mockSetPage = jest.fn();
    global.open = jest.fn();

    const app = new Application();
    const page = new Page({ name: 'page' });

    const ds = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(ds);
    const laborDetailDS = newLaborDetailDatasource(labor, 'woLaborDetailds');
    page.registerDatasource(laborDetailDS);

    app.client = {
      userInfo: {
        personid: 'SAM',
        labor: {laborcraftrate: {craft: 'ELECT'}, laborcode: 'SAM'}
      },
    };

    app.state = {
      systemProp: {
        'maximo.mobile.usetimer': '1',
        'maximo.mobile.allowmultipletimers': '1',
        'maximo.mobile.safetyplan.review' : '1'
      },
    };

    const wodetails = newDatasource(workorderitem, 'woDetailResource');
    page.registerDatasource(wodetails);
    app.registerDatasource(wodetails);
    
    const woDetailds = newDatasource(workorderitem, 'woDetailds');
    app.registerDatasource(woDetailds);
    
    const todaywoassignedDS = newDatasource(workorderitem, 'todaywoassignedDS');
    app.registerDatasource(todaywoassignedDS);

    const items = await wodetails.load();
    await app.initialize();
    sinon.spy(page, 'showDialog'); 

    sinon.stub(CommonUtil, "getOfflineAllowedStatusList")
      .returns([{"description": "Inprogress", "value": "INPRG", "maxvalue": "INPRG"}, {"description": "Completed", "value": "COMP", "maxvalue": "COMP"},{"description": "Waiting on Approval", "value": "WAPPR", "maxvalue": "WAPPR"}]);

    app.setCurrentPage = mockSetPage;
    items[1].status_maxvalue = 'APPR';  
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start', worktype: 'work'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
    expect(page.showDialog.calledOnce).toBe(false);

    app.state.systemProp['maximo.mobile.usetimer'] = '0';
    await WOTimerUtil.startStopTimer(app, page, {item: items[1], datasource: wodetails, action: 'start', worktype: 'work'}, wodetails, laborDetailDS, 'WORK', 'Actual work time');
    expect(page.state.workloading).toBe(false);
  });

});
