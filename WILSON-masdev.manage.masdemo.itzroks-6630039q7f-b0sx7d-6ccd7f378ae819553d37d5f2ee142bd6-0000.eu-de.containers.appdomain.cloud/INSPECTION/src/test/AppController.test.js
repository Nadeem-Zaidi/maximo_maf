/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import 'regenerator-runtime/runtime';
import AppController from '../AppController';
import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
  Device
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import statusitem from './data/statuses-json-data.js';
import domainitem from './data/domain-json-data.js';
import inspectionsInprogData from './data/inspections-data-inprog.js';
import BatchinprogData from './data/batch-data-inprog.js'

function newDatasource(data = inspectionsInprogData, name = 'inprog') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member'
  });
  const ds = new Datasource(da, {
    name: name
  });
  return ds;
}

function newBatchDatasource(data = BatchinprogData, name = 'assignedworkds'){
  const da = new JSONDataAdapter({
    src: data,
    items: 'member'
  });
  const ds = new Datasource(da, {
    name: name
  });
  return ds;
}

function newStatusDatasource(data = statusitem, name = 'dssynonymdomain') {
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

describe('getInspectionResultId', () => {
  it('without an inspectionresultid', () => {
    const controller = new AppController();
    let array = controller.getInspectionResultId();
    expect(array).toEqual([]);
  });

  it('without a valid inspectionresultid', () => {
    const controller = new AppController();
    let array = controller.getInspectionResultId(29);
    expect(array).toEqual([29]);

    array = controller.getInspectionResultId([29]);
    expect(array).toEqual([29]);

    array = controller.getInspectionResultId([29, 30]);
    expect(array).toEqual([29, 30]);
  });

  it('without a invalid inspectionresultid', () => {
    const controller = new AppController();
    let array = controller.getInspectionResultId('string');
    expect(array).toEqual([]);

    array = controller.getInspectionResultId(['string', 29, {}]);
    expect(array).toEqual([29]);
  });
});

describe('setupIncomingContext', () => {
  it('should call setCurrentPage', async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({name: 'execution_panel'});
    app.registerPage(page);
    // mock the setCurrentPage
    const mockSetPage = jest.fn();
    const origSetPage = app.setCurrentPage;
    app.setCurrentPage = mockSetPage;
    controller.setupMap = () =>{};
    app.registerController(controller);
    app.state.incomingContext = {
      page: 'execution_panel',
      inspectionresultid: 29,
      href:'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAxz',
      breadcrumb: {
        returnName: `Returning to techmobile`,
        enableReturnBreadcrumb: true
      }
    };
    await app.initialize();
    controller.onContextReceived()
    
    expect(mockSetPage.mock.calls[0][0].name).toBe('execution_panel');
    expect(mockSetPage.mock.calls[0][0].params.inspectionresultid).toEqual(
      29
    );
    expect(mockSetPage.mock.calls[0][0].params.editTrans).toEqual(undefined);
    app.setCurrentPage = origSetPage;
  });

  it('should call setupIncomingContext - with uid', async () => {
    const controller = new AppController();
    const app = new Application();
    // mock the setCurrentPage
    const mockSetPage = jest.fn();
    app.setCurrentPage = mockSetPage;
    controller.setupMap = () =>{};
    app.registerController(controller);
    app.state.incomingContext = {
      uid: 29,
      breadcrumb: {
        returnName: `Returning to techmobile`,
        enableReturnBreadcrumb: true
      }
    };

    await app.initialize();
    expect(mockSetPage.mock.calls[0][0].name).toBe('transition_page');
    expect(mockSetPage.mock.calls.length).toBe(1);
  });

  it('should call setupIncomingContext - with uid', async () => {
    const controller = new AppController();
    const app = new Application();
    // mock the setCurrentPage
    const mockSetPage = jest.fn();
    app.setCurrentPage = mockSetPage;
    controller.setupMap = () =>{};
    app.registerController(controller);
    app.state.incomingContext = {
      record:{ inspectionresultid: 29},
      href:'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAxz',
      breadcrumb: {
        returnName: `Returning to techmobile`,
        enableReturnBreadcrumb: true
      }
    };

    await app.initialize();
    expect(mockSetPage.mock.calls.length).toBe(1);
  });

  it('should not call setCurrentPage without inspectionresultid', async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({name: 'execution_panel'});
    app.registerPage(page);
    // mock the setCurrentPage
    const mockSetPage = jest.fn();
    const origSetPage = app.setCurrentPage;
    app.setCurrentPage = mockSetPage;

    app.registerController(controller);
    app.state.incomingContext = {
      page: 'execution_panel',
      breadcrumb: {
        returnName: `Returning to techmobile`,
        enableReturnBreadcrumb: true
      }
    };
    await app.initialize();
    //when creating a new Page setCurrentPage is called once
    //check if the mock call is related to creating this new Page only
    //and not related to the app initialization
    expect(mockSetPage.mock.calls.length).toBe(1);
    expect(mockSetPage.mock.calls[0][0].name).not.toBe('execution_panel');
    expect(mockSetPage.mock.calls[0][0].params).toBe(undefined);
    app.setCurrentPage = origSetPage;
  });
});

it('should call setupIncomingContext - with params', async () => {
  const controller = new AppController();
  const app = new Application();
  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.setupMap = () =>{};
  app.registerController(controller);
  app.state.incomingContext = {
    params:{
      inspectionresultid: 29,
      href:'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAxz'
    },
    breadcrumb: {
      returnName: `Returning to techmobile`,
      enableReturnBreadcrumb: true
    }
  };

  await app.initialize();
  expect(mockSetPage.mock.calls[0][0].name).toBe('transition_page');
  expect(mockSetPage.mock.calls.length).toBe(1);
});

it('should call setupIncomingContext - no params', async () => {
  const controller = new AppController();
  const app = new Application();
  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.setupMap = () =>{};
  app.registerController(controller);
  app.state.incomingContext = {
    breadcrumb: {
      returnName: `Returning to techmobile`,
      enableReturnBreadcrumb: true
    }
  };

  await app.initialize();
  expect(mockSetPage.mock.calls.length).toBe(0);
});

it('should call  setupIncomingContext - with editTrans', async () => {
  const controller = new AppController();
  const app = new Application();
  const page = new Page({name: 'execution_panel'});
  app.registerPage(page);
  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  const origSetPage = app.setCurrentPage;
  app.setCurrentPage = mockSetPage;
  controller.setupMap = () =>{};
  app.registerController(controller);
  app.state.incomingContext = {
    page: 'execution_panel',
    inspectionresultid: 29,
    editTrans: true,
    href:'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAxz',
    breadcrumb: {
      returnName: `Returning to techmobile`,
      enableReturnBreadcrumb: true
    }
  };
  await app.initialize();
  controller.onContextReceived()
  
  expect(mockSetPage.mock.calls[0][0].name).toBe('execution_panel');
  expect(mockSetPage.mock.calls[0][0].params.inspectionresultid).toEqual(
    29
  );
  expect(mockSetPage.mock.calls[0][0].params.editTrans).toEqual(true);
  app.setCurrentPage = origSetPage;
});

describe('_buildInspResultStatusSet', () => {
  it('returns correct array', async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    const allowedStates = {
      item: {
        allowedStates: {
          PENDING: [
            {
              maxvalue: 'PENDING',
              description: 'Pending',
              value: 'PENDING',
              defaults: true
            }
          ],
          INPROG: [
            {
              maxvalue: 'INPROG',
              description: 'In Progress',
              value: 'INPROG',
              defaults: true
            }
          ]
        },
        status_maxvalue: 'PENDING'
      }
    };

    const resultArr = [
      {
        id: 'INPROG',
        value: 'INPROG',
        description: 'In Progress',
        maxvalue: 'INPROG',
        _bulkid: 'INPROG'
      }
    ];
    const statusArr = controller._buildInspResultStatusSet(allowedStates);
    expect(statusArr).toEqual(resultArr);
  });
});

describe('changeResultStatus', () => {
  describe('for online', () => {
    it('with valid statusVal', async () => {
      const controller = new AppController();
      const app = new Application();
      app.registerController(controller);
      const inprogds = newDatasource();
      app.registerDatasource(inprogds);

      const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
      app.registerDatasource(dsDomain);

      let items = await inprogds.load();
      let invokeAction = sinon.stub(inprogds, 'invokeAction').returns(items[0]);
      await app.initialize();

      let option = {
        datasource: inprogds,
        item: inprogds.item,
        newStatus: 'COMPLETED'
      };

      await controller.changeResultStatus(option);
      expect(invokeAction.called).toBe(true);
      expect(invokeAction.displayName).toBe('invokeAction');
      expect(invokeAction.args.length).toBe(1);
    });

    it('with invalid statusVal', async () => {
      const controller = new AppController();
      const app = new Application();
      app.registerController(controller);
      const inprogds = newDatasource();
      app.registerDatasource(inprogds);

      const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
      app.registerDatasource(dsDomain);

      let items = await inprogds.load();
      let invokeAction = sinon.stub(inprogds, 'invokeAction').returns(items[0]);
      await app.initialize();

      let option = {
        datasource: inprogds,
        item: inprogds.item,
        newStatus: 'UNMATCHSTATUS'
      };

      await controller.changeResultStatus(option);
      expect(invokeAction.called).toBe(false);
      expect(invokeAction.args.length).toBe(0);
    });
  });

  describe('for offline', () => {
    it('with valid statusVal', async () => {
      let orginalDevice = Device.get().isMaximoMobile;
      Device.get().isMaximoMobile = true;
      const controller = new AppController();
      const app = new Application();
      app.registerController(controller);
      const inprogds = newDatasource();
      app.registerDatasource(inprogds);

      const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
      app.registerDatasource(dsDomain);

      let items = await inprogds.load();
      let invokeAction = sinon.stub(inprogds, 'invokeAction').returns(items[0]);
      await app.initialize();

      let option = {
        datasource: inprogds,
        item: inprogds.item,
        newStatus: 'COMPLETED'
      };

      await controller.changeResultStatus(option);
      expect(invokeAction.called).toBe(true);
      expect(invokeAction.displayName).toBe('invokeAction');
      expect(invokeAction.args.length).toBe(1);

      Device.get().isMaximoMobile = orginalDevice;
    });

    it('Batch change status with valid statusVal - Completed', async () => {
        let orginalDevice = Device.get().isMaximoMobile;
        Device.get().isMaximoMobile = true;
        const controller = new AppController();
        const app = new Application();
        const page = new Page({name: 'main'});
        app.registerPage(page);
        
        app.registerController(controller);
        const assignedworkds = newBatchDatasource();
        page.registerDatasource(assignedworkds)
        app.registerDatasource(assignedworkds);
        const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
        app.registerDatasource(dsDomain);
        const mockForceReload = jest.fn()
        let items = await assignedworkds.load();
        assignedworkds.forceReload = mockForceReload
        app.state.networkConnected = false;
        let invokeAction = sinon.stub(assignedworkds, 'invokeAction').returns(items[1]);
        await app.initialize();
  
        let option = {
          datasource: assignedworkds,
          item: assignedworkds.items[1],
          newStatus: 'COMPLETED'
        };
  
        await controller.changeResultStatus(option);
        expect(invokeAction.called).toBe(true);
        expect(invokeAction.displayName).toBe('invokeAction');
        expect(invokeAction.args.length).toBe(2);
  
        Device.get().isMaximoMobile = orginalDevice;
      });

      it('Batch change status with valid statusVal - not Completed', async () => {
        let orginalDevice = Device.get().isMaximoMobile;
        Device.get().isMaximoMobile = true;
        const controller = new AppController();
        const app = new Application();
        const page = new Page({name: 'main'});
        app.registerPage(page);
        
        app.registerController(controller);
        const assignedworkds = newBatchDatasource();
        page.registerDatasource(assignedworkds)
        app.registerDatasource(assignedworkds);
        const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
        app.registerDatasource(dsDomain);
        const mockForceReload = jest.fn()
        let items = await assignedworkds.load();
        assignedworkds.forceReload = mockForceReload
        app.state.networkConnected = false;
        let invokeAction = sinon.stub(assignedworkds, 'invokeAction').returns(items[3]);
        await app.initialize();
  
        let option = {
          datasource: assignedworkds,
          item: assignedworkds.items[3],
          newStatus: 'COMPLETED'
        };
  
        await controller.changeResultStatus(option);
        expect(invokeAction.called).toBe(true);
        expect(invokeAction.displayName).toBe('invokeAction');
        expect(invokeAction.args.length).toBe(2);
  
        Device.get().isMaximoMobile = orginalDevice;
      });

    it('with invalid statusVal', async () => {
      let orginalDevice = Device.get().isMaximoMobile;
      Device.get().isMaximoMobile = true;
      const controller = new AppController();
      const app = new Application();
      app.registerController(controller);
      const inprogds = newDatasource();
      app.registerDatasource(inprogds);

      const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
      app.registerDatasource(dsDomain);

      let items = await inprogds.load();
      let invokeAction = sinon.stub(inprogds, 'invokeAction').returns(items[0]);
      await app.initialize();

      let option = {
        datasource: inprogds,
        item: inprogds.item,
        newStatus: 'UNMATCHSTATUS'
      };

      await controller.changeResultStatus(option);
      expect(invokeAction.called).toBe(false);
      expect(invokeAction.args.length).toBe(0);

      Device.get().isMaximoMobile = orginalDevice;
    });
  });
});

it('_computeAsset returns correct value', async () => {
  const controller = new AppController();
  let computedValue = controller._computeAsset({
    assets: [{assetnum: 'Asset123'}]
  });
  expect(computedValue).toBe('Asset123');

  computedValue = controller._computeAsset({
    assets: [
      {
        assetnum: 'Asset123',
        description: 'Desc'
      }
    ]
  });
  expect(computedValue).toBe('Asset123 Desc');

  computedValue = controller._computeAsset({
    inspectionresult: null
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeAsset();
  expect(computedValue).toBeNull();
});

it('_computeLocation returns correct value', async () => {
  const controller = new AppController();

  let computedValue = controller._computeLocation({
    locations: [
      {
        location: 'Loc123',
        description: null
      }
    ]
  });
  expect(computedValue).toBe('Loc123');

  computedValue = controller._computeLocation({
    locations: [
      {
        location: 'Loc123',
        description: 'Location'
      }
    ]
  });
  expect(computedValue).toBe('Loc123 Location');

  computedValue = controller._computeLocation({
    inspectionresult: {
      locations: null
    }
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeLocation({
    inspectionresult: null
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeLocation();
  expect(computedValue).toBeNull();
});

it('it should test _isValidTransitionMaxVal()', async () => {
  const controller = new AppController();
  const app = new Application();
  app.registerController(controller);
  await app.initialize();

  //PENDING can change to INPROG
  let isValidTransition = controller._isValidTransitionMaxVal(
    'PENDING',
    'INPROG'
  );
  expect(isValidTransition).toBe(true);

  //PENDING can change to COMPLETED
  isValidTransition = controller._isValidTransitionMaxVal(
    'PENDING',
    'COMPLETED'
  );
  expect(isValidTransition).toBe(true);

  //INPROG can change to COMPLETED
  isValidTransition = controller._isValidTransitionMaxVal(
    'INPROG',
    'COMPLETED'
  );
  expect(isValidTransition).toBe(true);

  //CAN can't change status
  isValidTransition = controller._isValidTransitionMaxVal('CAN', 'PENDING');
  expect(isValidTransition).toBe(false);

  isValidTransition = controller._isValidTransitionMaxVal('CAN', 'INPROG');
  expect(isValidTransition).toBe(false);

  //COMPLETED can't change status
  isValidTransition = controller._isValidTransitionMaxVal(
    'COMPLETED',
    'PENDING'
  );
  expect(isValidTransition).toBe(false);

  isValidTransition = controller._isValidTransitionMaxVal(
    'COMPLETED',
    'INPROG'
  );
  expect(isValidTransition).toBe(false);
});

it('should call getReviewStatusValue()', async () => {
  const controller = new AppController();
  const app = new Application();
  app.registerController(controller);
  await app.initialize();

  let statusList = [
      {
        domainid: 'INSPRESULTSTATUS',
         maxvalue: 'INPROG',
          value: 'INPROG',
          valueid: 'INSPRESULTSTATUS|INPROG',
          defaults: 1
      },
      {
        domainid: 'INSPRESULTSTATUS',
         maxvalue: 'REVIEW',
          value: 'REVIEW',
          valueid: 'INSPRESULTSTATUS|REVIEW',
          defaults: 1
      }];

  let reviewStatus = controller.getReviewStatusValue(statusList);
  expect(reviewStatus).toEqual('REVIEW');
});