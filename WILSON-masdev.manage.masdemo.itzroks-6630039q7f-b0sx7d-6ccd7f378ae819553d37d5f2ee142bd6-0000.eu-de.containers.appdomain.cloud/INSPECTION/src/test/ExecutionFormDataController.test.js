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

import ExecutionFormDataController from '../ExecutionFormDataController';

import {
  JSONDataAdapter,
  Datasource,
  Device,
  Application,
  log
} from '@maximo/maximo-js-api';

import inspectionsCompletedData from './data/inspections-data-completed';
import inspectionsInProgData from './data/inspections-data-inprog';
import nogroupAttachmentData from './data/nogroup-attachment-data';
import groupAttachmentData from './data/group-attachment-data';
import attachmentDataWithInspfieldResult from './data/attachment-data-with-inspfieldresult';

import sinon from 'sinon';
import InspectionsList from '../components/common/InspectionsList';

function newDatasource(data = inspectionsCompletedData, name = 'testds') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'inspectionresultid',
    name: name
  });

  return ds;
}

it('datasource initialize', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormDataController();
  const app = new Application();
  const ds = newDatasource(inspectionsInProgData);
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();

  // let's verify that our controller has the datasource, app, and owner
  expect(controller.datasource).toBe(ds);
  expect(controller.app).toBe(app);
  // datasource is at the app level, so owner is the app
  expect(controller.owner).toBe(app);
});

it('should properly set itemUrl from ds and log warning', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();
  app.state.inspectionsList = new InspectionsList(['href-test-url']);

  const ds = newDatasource(inspectionsInProgData);

  const logWarningSpy = sinon.spy(log, 'w');

  ds.registerController(controller);
  app.registerDatasource(ds);
  await app.initialize();
  await ds.load({itemUrl: 'href-null'});

  expect(logWarningSpy.callCount >= 1).toBe(true);

  logWarningSpy.restore();
});

it('_computePageTitle returns correct value', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();

  let pageTitle = controller._computePageTitle({
    referenceobject: 'WOACTIVITY',
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  });
  expect(pageTitle).toBe('PM 1234');

  pageTitle = controller._computePageTitle({
    referenceobject: 'WOACTIVITY',
    workorder: [
      {
        worktype: '',
        wonum: '1234'
      }
    ]
  });
  expect(pageTitle).toBe('1234');

  pageTitle = controller._computePageTitle({
    referenceobject: 'WORKORDER',
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  });
  expect(pageTitle).toBe('PM 1234');

  pageTitle = controller._computePageTitle({
    referenceobject: 'WORKORDER',
    workorder: [
      {
        worktype: '',
        wonum: '1234'
      }
    ]
  });
  expect(pageTitle).toBe('1234');

  pageTitle = controller._computePageTitle({
    referenceobject: 'PARENTWO',
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  });
  expect(pageTitle).toBe('Batch');

  pageTitle = controller._computePageTitle({
    referenceobject: 'ASSET',
    workorder: [{}]
  });
  expect(pageTitle).toBe('Inspections');

  pageTitle = controller._computePageTitle({});
  expect(pageTitle).toBe('Inspections');
});

it('_computeSlidingDrawerTitle returns correct value', async () => {
  const controller = new ExecutionFormDataController();
  let item = {
    inspectionform: {
      name: 'Monthly Fire System Inspection'
    },
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  };
  let slidingDrawerTitle = controller._computeSlidingDrawerTitle(item);
  expect(slidingDrawerTitle).toBe('Monthly Fire System Inspection PM 1234');

  slidingDrawerTitle = controller._computeSlidingDrawerTitle({});
  expect(slidingDrawerTitle).toBe(null);
});

it('_computeAsset returns correct value', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  await app.initialize();

  const computeAsset = jest.spyOn(controller, '_computeAsset');

  controller._computeAsset({
    asset: [{assetnum: 'Asset123'}]
  });
  expect(computeAsset).toHaveBeenCalled();
});

it('_computeLocation returns correct value', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  await app.initialize();

  const computeLocation = jest.spyOn(controller, '_computeLocation');

  controller._computeLocation({
    locations: [
      {
        location: 'Loc123',
        description: null
      }
    ]
  });
  expect(computeLocation).toHaveBeenCalled();
});

it('_listAssetLocMeters returns the list of meters for assets/locations', async () => {
  const controller = new ExecutionFormDataController();
  let metersList = controller._listAssetLocMeters({
    asset: [
      {
        assetnum: '11470',
        assetmeter: [
          {
            metername: 'oilcolor'
          }
        ]
      }
    ],
    locations: [
      {
        location: 'loc1',
        locationmeter: [
          {
            metername: 'runhours'
          }
        ]
      }
    ]
  });
  expect(metersList).toBeTruthy();

  metersList = controller._listAssetLocMeters({
    asset: [
      {
        assetnum: '11470'
      }
    ]
  });
  expect(metersList).toEqual([]);

  metersList = controller._listAssetLocMeters({
    locations: [
      {
        location: 'loc1'
      }
    ]
  });
  expect(metersList).toEqual([]);

  metersList = controller._listAssetLocMeters({});
  expect(metersList).toEqual([]);
});

test('_listAssetLocMeters should consider only active meters', () => {
  const controller = new ExecutionFormDataController();
  const mockedData = {
    assets: [
      {
        assetmeter: [
          {
            active: true,
            name: 'A'
          }
        ]
      }
    ],
    locations: [
      {
        locationmeter: [
          {
            name: 'B'
          }
        ]
      }
    ]
  };
  expect(controller._listAssetLocMeters(mockedData)).toHaveLength(1);
});

test('_listAssetLocMeters should include rollover attribute', () => {
  const controller = new ExecutionFormDataController();
  const mockedData = {
    locations: [
      {
        locationmeter: [
          {
            name: 'C',
            active: true,
            rollover: 1500
          }
        ]
      }
    ]
  };

  const result = controller._listAssetLocMeters(mockedData);
  expect(result).toHaveLength(1);
  expect(result[0]).toHaveProperty('rollover');
});

it('should return new array calling checkDelta function - no group attachment', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource(nogroupAttachmentData, 'executeInspections');
  app.client = {
    userInfo: {
      personid: 'ALVIN'
    }
  };
  app.registerController(controller);

  const mockedAppResolver = () => {
    return {
      client: {userInfo: {}},
      getLocalizedLabel: () => {}
    };
  };

  ds.options.appResolver = mockedAppResolver;

  await ds.load();
  await app.initialize();
  controller.app = {
    dataFormatter:{
      convertDatetoISO: ()=> new Date()
    }
  };

  let array = controller.checkDelta(ds);
  expect(array.length).toBe(2);
  expect(array[0].inspfieldnum).toBe('1255');
  expect(array[1].inspfieldnum).toBe('1257');
});

it('should return new array calling checkDelta function - group attachment', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource(groupAttachmentData, 'executeInspections');
  app.client = {
    userInfo: {
      personid: 'ALVIN'
    }
  };
  app.registerController(controller);

  const mockedAppResolver = () => {
    return {
      client: {userInfo: {}},
      getLocalizedLabel: () => {}
    };
  };

  ds.options.appResolver = mockedAppResolver;

  await ds.load();
  await app.initialize();

  controller.app = {
    dataFormatter:{
      convertDatetoISO: ()=> new Date()
    }
  };

  controller.checkDelta(ds);
  let array = controller.checkDelta(ds);
  expect(array.length).toBe(2);
  expect(array[0].inspfieldnum).toBe('1450');
  expect(array[1].inspfieldnum).toBe('1063');
});

it('should call save when delta exists', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource(
    attachmentDataWithInspfieldResult,
    'executeInspections'
  );
  app.client = {
    userInfo: {
      personid: 'ALVIN'
    }
  };
  app.registerController(controller);

  const mockedAppResolver = () => {
    return {
      client: {userInfo: {}},
      getLocalizedLabel: () => {}
    };
  };

  ds.options.appResolver = mockedAppResolver;

  await ds.load();
  await app.initialize();

  let delta = [
    {
      inspformnum: '1009',
      revision: 1,
      resultnum: '1357',
      orgid: 'EAGLENA',
      siteid: 'BEDFORD',
      entereddate: '2021-02-08T13:33:48.141Z',
      inspquestionnum: '1156',
      inspfieldnum: '1450'
    },
    {
      inspformnum: '1009',
      revision: 1,
      resultnum: '1357',
      orgid: 'EAGLENA',
      siteid: 'BEDFORD',
      entereddate: '2021-02-08T13:33:48.141Z',
      inspquestionnum: '1160',
      inspfieldnum: '1063'
    }
  ];
  const saveMockCallBack = jest.fn();
  const emitMockCallBack = jest.fn();
  const forceReloadMock = jest.fn();

  ds.save = saveMockCallBack;
  ds.emit = emitMockCallBack;
  ds.forceReload = forceReloadMock;

  controller.app = app;
  controller.app.findDatasource = () => ds;
  await controller.pushNewResult(ds, delta);
  //save is called once
  expect(saveMockCallBack.mock.calls.length).toBe(1);
});

it('should display batch title when multiple execution', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();

  let title = controller.getPageTitle(
    {inspectionsList: ['A']},
    {href: 'A', computedPageTitle: 'insp'}
  );
  expect(title).toMatch(/insp/);

  const mockedState = {
    inspectionsList: new InspectionsList(['0', '2', 'A', '4'])
  };
  title = controller.getPageTitle(mockedState, {href: 'A'});
  expect(title).toMatch(/Batch inspection/);
});

it('checkLoadingData should call forceSync when coming from mobile device', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const data = {
        items: [],
  };
  const ds = newDatasource(data, 'executeInspections');
  ds.registerController(controller);
  app.registerDatasource(ds);

  app.registerController(controller);
    app.state.incomingContext = {
      page: 'execution_panel',
      inspectionresultid: 29,
      href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAxz',
      breadcrumb: {
        returnName: `Returning to techmobile`,
        enableReturnBreadcrumb: true
      }
    };
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;

  app.state.inspectionsList = null;
  app.state.syncRequested = false;
  Device.get().isMaximoMobile = true;

  await app.initialize();

  const mockedAppResolver = (ds) => {
    return data;
  };
  ds.forceSync = mockedAppResolver;
  
  let forceSyncSpy = sinon.stub(ds, 'forceSync');

  await controller.checkLoadingData(ds, []);

  expect(forceSyncSpy.called).toBe(true);
});

it('onAfterLoadData should call checkLoadingData', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  const checkLoadingDataSpy = jest.spyOn(controller, 'checkLoadingData');

  await app.initialize();

  await ds.load();

  expect(checkLoadingDataSpy).toHaveBeenCalled();

});

it('onAfterLoadData should call prepareQuestionsToMobilePlatform', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();
  app.device = {isMobile: true};
  const ds = newDatasource(inspectionsCompletedData,'executeInspections');
  ds.registerController(controller);
  app.registerDatasource(ds);

  const checkLoadingDataSpy = jest.spyOn(controller, 'prepareQuestionsToMobilePlatform');

  await app.initialize();

  await ds.load();

  expect(checkLoadingDataSpy).toHaveBeenCalled();

});

it('check if there is duccplicated questions / fields ', async () => {
  const controller = new ExecutionFormDataController();
  controller.app = {device:{isMobile: true} };

  let inspectionresult = {
    inspquestionsgrp :[
      {
        inspquestionid: 291
      },
      {
        inspquestionid: 292
      },
      {
        inspquestionid: 291
      }
    ]
  };

  controller.prepareQuestionsToMobilePlatform(inspectionresult);
  expect(inspectionresult.inspquestionsgrp.length).toBe(2);

  inspectionresult = {
    inspquestionsgrp :[
      {
        inspquestionid: 291,
        inspfield:[
          {inspfieldid:1},
          {inspfieldid:2},
          {inspfieldid:1}
        ]
      },
      {
        inspquestionid: 292,
        inspfield:[
          {inspfieldid:1},
          {inspfieldid:2},
          {inspfieldid:3}
        ]
      }
    ]
  };

  controller.prepareQuestionsToMobilePlatform(inspectionresult);
  expect(inspectionresult.inspquestionsgrp.length).toBe(2);
  expect(inspectionresult.inspquestionsgrp[0].inspfield.length).toBe(2);
  expect(inspectionresult.inspquestionsgrp[1].inspfield.length).toBe(3);

  inspectionresult = {
    inspquestionsgrp :[
      {
        inspquestionid: 291,
        inspquestionchild:[
                {inspquestionid:1,
                  inspfield:[
                    {inspfieldid:1},
                    {inspfieldid:2},
                    {inspfieldid:3}
                  ]
                },
                { inspquestionid:2,
                  inspfield:[
                    {inspfieldid:1},
                    {inspfieldid:2},
                    {inspfieldid:1}
                  ]
                },
                {inspquestionid:1}
        ]
      },

      {
        inspquestionid: 292,
        inspquestionchild:[
          {inspquestionid:1},
          {inspquestionid:2},
          {inspquestionid:3}
        ]
      }
    ]
  };

  controller.prepareQuestionsToMobilePlatform(inspectionresult);
  expect(inspectionresult.inspquestionsgrp[0].inspquestionchild.length).toBe(2);
  expect(inspectionresult.inspquestionsgrp[1].inspquestionchild.length).toBe(3);
  expect(inspectionresult.inspquestionsgrp[0].inspquestionchild[0].inspfield.length).toBe(3);
  expect(inspectionresult.inspquestionsgrp[0].inspquestionchild[1].inspfield.length).toBe(2);



  inspectionresult = {
    inspquestionsgrp :[
      {
        inspquestionid: 291
      },
      {
        inspquestionid: 292
      },
      {
        inspquestionid: 291
      }
    ]
  };
  controller.app = {device:{isMobile: false} };
  controller.prepareQuestionsToMobilePlatform(inspectionresult);
  expect(inspectionresult.inspquestionsgrp.length).toBe(3);
});


it('_computeButtonLabel returns correct value', async () => {
  const controller = new ExecutionFormDataController();
  const app = new Application();

  const ds = newDatasource();
  ds.registerController(controller);
  app.registerDatasource(ds);

  app.state.enablereview = "false";
  await app.initialize();

  let item = {
	status_maxvalue: 'INPROG',
    inspectionform: {
      name: 'Monthly Fire System Inspection',
	  enablereview: false
    },
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  };

  let buttonLabel = controller._computeButtonLabel(item);
  expect(buttonLabel).toBe('Complete');

  app.state.enablereview = true;
  item.inspectionform.enablereview = true;
  app.state.reviewStatusValue = 'REVIEW';

  buttonLabel = controller._computeButtonLabel(item);
  expect(buttonLabel).toBe('Review');


});
