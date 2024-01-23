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

import sinon from 'sinon';
import newTestStub from './AppTestStub';
import {
  Application,
  JSONDataAdapter,
  Datasource,
  Page
} from '@maximo/maximo-js-api';
import assetLookupData from './data/asset-lookup-json-data.js';
import statusitem from './data/statuses-json-data.js';
import domainitem from './data/domain-json-data.js';
import CreateInspectionsPageController from '../CreateInspectionsPageController';

function newLookupDatasource(
  data,
  name = 'assetLookupDS',
  idAttribute = 'assetnum'
) {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member'
  });

  const ds = new Datasource(da, {
    idAttribute: idAttribute,
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

it('should set right state to asset and location', async () => {
  let initializeApp = newTestStub({
    currentPage: 'createInspection'
  });
  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];

  let ClearValueSpy = sinon.spy(controller, 'clearValue');
  controller.selectAsset({assetnum: 'asset', description: 'test'});

  let page = app.currentPage;
  expect(page.state.asset.assetnum).toBe('asset');
  expect(page.state.assetSelection).toBe('test (asset)');

  controller.selectAsset({assetnum: 'asset'});
  expect(page.state.assetSelection).toBe('asset');
  expect(page.state.locationSelection).toBe('No location selected');

  controller.selectLocation({location: 'location', description: 'test'});
  expect(page.state.locations.location).toBe('location');
  expect(page.state.locationSelection).toBe('test (location)');

  controller.selectLocation({location: 'location'});
  expect(page.state.locationSelection).toBe('location');
  expect(page.state.assetSelection).toBe('No asset selected');
  expect(ClearValueSpy.called).toBeTruthy();
});

it('should clear form selected', async () => {
  const controller = new CreateInspectionsPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  app.setCurrentPage(page);

  let loadSpy = sinon.spy(controller, 'clearValue');

  page.state.formSelection = '';
  page.state.inspForm = {};

  let parameter = 'formSelection';
  controller.clearValue(parameter);

  expect(JSON.stringify(page.state.inspForm)).toBe(undefined);
  expect(page.state.formSelection).toBe('Select a template');
  expect(loadSpy.callCount).toBe(1);
});

it('should getAssetorLocation ds', async () => {
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  };
  const assetDataDs = newLookupDatasource(
    assetLookupData,
    'assetLookupDS',
    'assetnum'
  );

  let controller = new CreateInspectionsPageController();
  let page = new Page();
  page.registerController(controller);
  page.registerDatasource(assetDataDs);
  app.registerPage(page);

  await app.initialize();
  controller.pageInitialized(page, app);

  let data = await controller.getAssetOrLocation(
    app,
    'assetLookupDS',
    'assetnum',
    '1008'
  );
  expect(data.length).toBe(1);
});

it('should set handle asset', async () => {
  let initializeApp = newTestStub({
    currentPage: 'createInspection'
  });
  let app = await initializeApp();
  app.client = {
    userInfo: {
      personid: 'ALVIN',
      defaultSite: 'BEDFORD'
    }
  };
  let controller = app.currentPage.controllers[0];
  let assetSelect = jest.fn();

  let mockedGetAsset = jest.fn((app, ds, object, value) => {
    if (value === '123') {
      return [{asset: '123'}];
    }
    return null;
  });

  controller.selectAsset = assetSelect;
  controller.getAssetOrLocation = mockedGetAsset;

  await controller.handleAsset({value: '123'});
  expect(mockedGetAsset).toHaveBeenCalled();
  expect(assetSelect).toHaveBeenCalled();
  await controller.handleAsset({value: 'test'});
  expect(app.currentPage.state.invalidAsset).toBeTruthy();

});

it('should set handle location', async () => {
  let initializeApp = newTestStub({
    currentPage: 'createInspection'
  });
  let app = await initializeApp();
  app.client = {
    userInfo: {
      personid: 'ALVIN',
      defaultSite: 'BEDFORD'
    }
  };
  let controller = app.currentPage.controllers[0];
  let locationSelect = jest.fn();

  let mockedGetlocation = jest.fn((app, ds, object, value) => {
    if (value === '123') {
      return [{location: '123'}];
    }
    return null;
  });

  controller.selectLocation = locationSelect;
  controller.getAssetOrLocation = mockedGetlocation;

  await controller.handleLocation({value: '123'});
  expect(mockedGetlocation).toHaveBeenCalled();
  expect(locationSelect).toHaveBeenCalled();
  await controller.handleLocation({value: 'test'});
  expect(app.currentPage.state.invalidLocation).toBeTruthy();
});

it('openDialog calls the showDialog', async () => {
  let initializeApp = newTestStub({
    currentPage: 'createInspection'
  });
  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];

  let openDialogSpy = sinon.spy(controller, 'openDialog');
  controller.openDialog('ASSET');
  expect(openDialogSpy.calledOnce).toBeTruthy();
});

it('showMapDialog should open the Dialog for the Map', async () => {
  let initializeApp = newTestStub({
    currentPage: 'createInspection'
  });
  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];

  let ClearValueSpy = sinon.spy(controller, 'clearValue');
  controller.selectAsset({assetnum: 'asset', description: 'test'});

  let page = app.currentPage;

  expect(ClearValueSpy.called).toBeTruthy();
  const mockOpenDialog = jest.fn(() => {
    page.showDialog('mapDialog');
  });
  controller.openMapDialog = mockOpenDialog;
  controller.openMapDialog(false);
  page.state.mapValueSelected = 'BR210';
  controller.selectValueFromMap();
  //For asset
  controller.openMapDialog(true);
  page.state.mapValueSelected = '7500';
  controller.selectValueFromMap();

  expect(mockOpenDialog).toHaveBeenCalled();
});

it('should clear cluster', async () => {
  const app = new Application();
  app.client = {
    userInfo: {
      defaultSite: 'BEDFORD'
    }
  };
  const assetMapDs = newLookupDatasource(
    assetLookupData,
    'assetMapDS',
    'assetnum'
  );

  const cluster = ['1008', '1009'];

  let controller = new CreateInspectionsPageController();
  let page = new Page();
  page.registerController(controller);
  page.registerDatasource(assetMapDs);
  app.registerPage(page);

  await app.initialize();
  controller.pageInitialized(page, app);

  let data = await controller.clusterFilter('assetnum', cluster, 'assetMapDS');
  expect(data.length).toBe(2);

  data = await controller.clusterFilter('assetnum', false, 'assetMapDS');
  expect(data).toBe(undefined);
});

it('should create an inspection on web device', async () => {
  let currentPage = ''

  const myApp = {
    state: {
      networkConnected: false
    },
    getLocalizedLabel: () => {},
    setCurrentPage: param => {
      currentPage = param.name;
    },
    dataFormatter:{
      convertDatetoISO: ()=> new Date()
    }
  };

  myApp.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertOrg: 'EAGLENA',
      insertSite: 'BEDFORD',
      personid: 'Wilson'
    }
  };

  let controller = new CreateInspectionsPageController();

  let newItem = {};
  let myPage = {
    datasources: {
      createInspectionDSAux: {
        item: {
          test: ''
        },
        load: () => {}
      },
      createInspectionDS: {
        save: () => {},
        load: () => {},
        resetState:() => {},
        getSchema: () => false,
        initializeQbe: () => {},
        item: newItem,
        addNew: () => {
          myPage.datasources.createInspectionDS.item = {
            href: 'TEMP/TEST',
            inspectionresultid: 123
          };
        }
      }
    },
    state: {
      inspForm: {
        inspformnum: '1008F',
        revision: 1,
        inspquestionsgrp: {},
        inspcascadeoption: {}
      },
      asset: {assetnum: '1008'},
      locations: {location: 'LOC1'}
    }
  };


  controller.pageInitialized(myPage, myApp);

  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  controller.app.findDatasource = () => dsDomain; 

  controller.clearValue('locations');

  await controller.saveAsPeding();

  expect(currentPage).toBe('main');
  expect(myPage.datasources.createInspectionDS.item.asset).toBe('1008');
  expect(myPage.datasources.createInspectionDS.item.assets).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.location).not.toBeDefined();
  expect(
    myPage.datasources.createInspectionDS.item.locations
  ).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.status).toBe('PENDING');
  expect(myPage.datasources.createInspectionDS.item.inspformnum).toBe('1008F');

  newItem = {};
  myPage.state.locations = {location: 'LOC1'};
  myPage.state.inspForm = {
    inspformnum: '44F',
    revision: 1,
    inspquestionsgrp: {}
  };
  controller.clearValue('asset');

  await controller.startInspection();

  expect(myPage.datasources.createInspectionDS.item.location).toBe('LOC1');
  expect(myPage.datasources.createInspectionDS.item.locations).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.assets).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.asset).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.status).toBe('INPROG');
  expect(myPage.datasources.createInspectionDS.item.inspformnum).toBe('44F');
});

it('should create an inspection on mobile device', async () => {
  let currentPage = ''
  
  const myApp = {
    device:{
     isMobile: true
    },
    state: {
      networkConnected: false
    },
    getLocalizedLabel: () => {},
    setCurrentPage: param => {
      currentPage = param.name;
    },
    dataFormatter:{
      convertDatetoISO: ()=> new Date()
    }
    
  };

  myApp.client = {
    userInfo: {
      defaultSite: 'BEDFORD',
      insertOrg: 'EAGLENA',
      insertSite: 'BEDFORD',
      personid: 'Wilson'
    }
  };

  let controller = new CreateInspectionsPageController();

  let newItem = {};
  let myPage = {
    datasources: {
      createInspectionDSAux: {
        item: {
          test: ''
        },
        load: () => {}
      },
      createInspectionDS: {
        save: () => {},
        load: () => {},
        resetState:() => {},
        getSchema: () => false,
        initializeQbe: () => {},
        item: newItem,
        addNew: () => {
          myPage.datasources.createInspectionDS.item = {
            href: 'TEMP/TEST',
            inspectionresultid: 123
          };
        }
      }
    },
    state: {
      inspForm: {
        inspformnum: '1008F',
        revision: 1,
        inspquestionsgrp: {},
        inspcascadeoption: {}
      },
      asset: {assetnum: '1008'},
      locations: {location: 'LOC1'}
    }
  };

  controller.pageInitialized(myPage, myApp);
  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  controller.app.findDatasource = () => dsDomain; 
  controller.clearValue('locations');
 
  await controller.saveAsPeding();

  expect(currentPage).toBe('main');
  expect(myPage.datasources.createInspectionDS.item.asset).toBe('1008');
  expect(myPage.datasources.createInspectionDS.item.assets).toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.location).not.toBeDefined();
  expect(
    myPage.datasources.createInspectionDS.item.locations
  ).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.status).toBe('PENDING');
  expect(myPage.datasources.createInspectionDS.item.inspformnum).toBe('1008F');

  newItem = {};
  myPage.state.locations = {location: 'LOC1'};
  myPage.state.inspForm = {
    inspformnum: '44F',
    revision: 1,
    inspquestionsgrp: {}
  };
  controller.clearValue('asset');

  await controller.startInspection();

  expect(myPage.datasources.createInspectionDS.item.location).toBe('LOC1');
  expect(myPage.datasources.createInspectionDS.item.locations).toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.assets).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.asset).not.toBeDefined();
  expect(myPage.datasources.createInspectionDS.item.status).toBe('INPROG');
  expect(myPage.datasources.createInspectionDS.item.inspformnum).toBe('44F');
});


