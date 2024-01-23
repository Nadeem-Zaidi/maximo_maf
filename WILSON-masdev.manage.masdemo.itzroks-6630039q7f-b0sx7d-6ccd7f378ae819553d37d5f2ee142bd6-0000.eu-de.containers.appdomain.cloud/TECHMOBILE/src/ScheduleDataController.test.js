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

import ScheduleDataController from './ScheduleDataController';
import workorderitem from './test/wo-detail-json-data';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import WOUtil from './utils/WOUtil';

function newDatasource(data = workorderitem, name = 'selectedDatasource', field = 'member') {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name,
  });
  return ds;
}

function getFeatures(count, status) {
  let features = [];
  for (let i = 0; i < count; i++) {
    let feature = {
      get: (attr) => {
        if (attr === 'maximoAttributes') {
          return {
            uxsynonymdomain: {
              valueid: status
            }
          }
        }
        if (attr === 'geometry') {
          return {
            constructor: {
              name: 'point'
            }
          }
        }
      }
    }
    features.push(feature)
  }
  return features;
}

describe('computedDueDate and ComputedisOverDue', () => {
  const controller = new ScheduleDataController();
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let object = {schedfinish: today.toLocaleString()};
  let emptyObject = {};

  it('should return invalid date if no date or invalid date', () => {
    expect(controller.computedIsOverDue({schedfinish: '45/45/45'})).toBeFalsy();
  });

  it('should not be overdue', () => {
    let upToDate = new Date();
    upToDate.setDate(today.getDate() + 1);
    upToDate.setHours(0, 0, 0, 0);
    object = {schedfinish: upToDate};

    expect(controller.computedIsOverDue(object)).toBeFalsy();
  });

  it('should be overdue', () => {
    let overdue = new Date();
    overdue.setDate(today.getDate() - 1);
    overdue.setHours(0, 0, 0, 0);
    object.schedfinish = overdue;

    expect(controller.computedIsOverDue(object)).toBeTruthy();
  });

  it('should return false when no data is found', () => {
    expect(controller.computedIsOverDue(emptyObject)).toBeFalsy();
  });
});

it('computedWorkType returns right', async () => {
  const controller = new ScheduleDataController();

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

it('computedAssetNum returns right', async () => {
  const controller = new ScheduleDataController();

  let title = controller.computedAssetNum({
    assetnumber: 'I-95N', assetdesc: 'Mowing'
  });
  expect(title).toBe('I-95N Mowing');

  title = controller.computedAssetNum({
    assetnumber: 'I-95N'
  });
  expect(title).toBe('I-95N');
});

it('Validate Enable/Disable button for Materials and tools', async () => {
  let mockSetPage = jest.fn();
	global.open = jest.fn();

  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({ name: "schedule" });
  app.registerPage(page);
  app.registerController(controller);
  app.setCurrentPage = mockSetPage;

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  
  let disableMaterialsButton = controller.computedDisableButton({
    wonum: '1001',
    title: 'Centrifugal Pump Oil Change',
    description:
      'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
    toolcount: 1
  });

  expect(disableMaterialsButton).toBe(false);
  expect(page.state.isMatAndToolAvail).toBe(true);
});

it('Validate Enable/Disable button for Materials and tools', async () => {
  let mockSetPage = jest.fn();
	global.open = jest.fn();

  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({ name: "approvals" });
  app.registerPage(page);
  app.registerController(controller);
  app.setCurrentPage = mockSetPage;

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  
  let disableMaterialsButton = controller.computedDisableButton({
    wonum: '1001',
    title: 'Centrifugal Pump Oil Change',
    description:
      'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
    toolcount: 1
  });

  expect(disableMaterialsButton).toBe(false);
  expect(page.state.isMatAndToolAvail).toBe(true);
});


it('computedItemNum returns right', async () => {
  const controller = new ScheduleDataController();

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

it('Validate hide/show button for GaugeMeter', async () => {
  const controller = new ScheduleDataController();
  let hideMeterButtn = controller.computedDisableMeter({
    assetmetercount: 0,
    locationmetercount: 0
  });

  expect(hideMeterButtn).toBe(true);
});


it('accessWoCostData should return total', () => {
  const controller = new ScheduleDataController();
  jest.spyOn(WOUtil, "computedEstTotalCost").mockImplementation(() =>  {
    return {totalcost:"1995.50"}
  });
  expect(controller.accessWoCostData({})).toBe("1995.50");
});

it('Validate hide/show button for GaugeMeter', async () => {
  const controller = new ScheduleDataController();

  let hideMeterButtn = controller.computedDisableMeter({
    assetmetercount: 1,
    locationmetercount: 1

  });

  expect(hideMeterButtn).toBe(false);
});

it('computedTimerStatus function to show/hide button ', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({
    name: 'schedule'
  });

  app.client = {
    userInfo: {
      personId: 'SAM',
      labor: {
        laborcode: 'SAM'
      }
    }
  };

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  let hideStartButton = controller.computedTimerStatus({
    wonum: "1022",
    description: "13170 problem",
    labtrans: [
      {
        laborcode: "SAM",
        timerstatus_maxvalue: "ACTIVE",
        timerstatus: "ACTIVE",
        transtype: "TRAV",
        transtype_maxvalue: "WORK"
      },
    ],
  });
  expect(hideStartButton).toBe(true);

  hideStartButton = controller.computedTimerStatus({
    wonum: "1022",
    description: "13170 problem"
  });
  expect(hideStartButton).toBe(false);

  hideStartButton = controller.computedTimerStatus({
    wonum: '1022',
    description: '13170 problem',
    labtrans: [
      {
        laborcode: 'WILSON',
        timerstatus_maxvalue: 'ACTIVE',
        timerstatus: "ACTIVE",
        transtype: "WORK",
        transtype_maxvalue: "WORK"
      },
    ],
  });
  expect(hideStartButton).toBe(false);
});

it('lastLabTransType function return Transaction Type ', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({
    name: 'schedule'
  });

  app.client = {
    userInfo: {
      personId: 'SAM',
      labor: {
        laborcode: 'SAM'
      }
    }
  };

  app.state.defaultTravTrans = {
      value: 'TRAV',
      description: "Travel time"
  };

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  let lastLabTransTypeMethod = controller.lastLabTransType({
    wonum: "1022",
    description: "13170 problem",
    labtrans: [
      {
        laborcode: "SAM",
        timerstatus_maxvalue: "COMPLETED",
        timerstatus: "COMPLETED",
        transtype: "TRAV",
        transtype_maxvalue: "WORK"
      },
    ],
  });
  expect(lastLabTransTypeMethod).toBe('TRAV');

  lastLabTransTypeMethod = controller.lastLabTransType({
    wonum: "1022",
    description: "13170 problem",
    labtrans: [
      {
        laborcode: "SAM",
        timerstatus_maxvalue: "ACTIVE",
        timerstatus: "ACTIVE",
        transtype: "TRAV",
        transtype_maxvalue: "WORK"
      },
    ],
  });
  expect(lastLabTransTypeMethod).toBe('TRAV_ACTIVE');

  lastLabTransTypeMethod = controller.lastLabTransType({
    wonum: "1022",
    description: "13170 problem",
    labtrans: [
      {
        laborcode: "SAM",
        timerstatus_maxvalue: "ACTIVE",
        timerstatus: "ACTIVE",
        transtype: "WORK",
        transtype_maxvalue: "WORK"
      },
    ],
  });
  expect(lastLabTransTypeMethod).toBe('WORK');

  lastLabTransTypeMethod = controller.lastLabTransType({
    wonum: "1022",
    description: "13170 problem",
    labtrans: [
      {
        laborcode: "SAM",
        timerstatus_maxvalue: "COMPLETED",
        timerstatus: "COMPLETED",
        transtype: "WORK",
        transtype_maxvalue: "WORK"
      },
    ],
  });
  expect(lastLabTransTypeMethod).toBe('WORK');

  lastLabTransTypeMethod = controller.lastLabTransType({
    wonum: "1022",
    description: "13170 problem",
    labtrans: null,
  });
  expect(lastLabTransTypeMethod).toBe('');
});

it('onAfterLoadData', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({
    name: 'schedule'
  });
  app.registerPage(page);
  app.registerController(controller);
  const selectedDatasource = newDatasource(
    workorderitem,
    'selectedDatasource',
    'member'
  );
  app.registerDatasource(selectedDatasource);
  page.state = {
    selectedDS: 'selectedDatasource'
  };
  await app.initialize();
  await selectedDatasource.load();
  await controller.onAfterLoadData(
    selectedDatasource,
    selectedDatasource.items
  );
  expect(app.state.firstWO.length).toBe(4);
  expect(controller.isAllTaskComplete(selectedDatasource.items[0].woactivity)).toBe(true);
  expect(controller.isAllTaskComplete(selectedDatasource.items[1].woactivity)).toBe(false);
});


it('onAfterLoadData', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({
    name: 'approvals'
  });
  app.registerPage(page);
  app.registerController(controller);
  const selectedDatasource = newDatasource(
    workorderitem,
    'selectedDatasource',
    'member'
  );
  app.registerDatasource(selectedDatasource);
  page.state = {
    selectedDS: 'selectedDatasource'
  };
  await app.initialize();
  await selectedDatasource.load();
  await controller.onAfterLoadData(
    selectedDatasource,
    selectedDatasource.items
  );
  expect(app.state.firstWO.length).toBe(4);
  expect(controller.isAllTaskComplete(selectedDatasource.items[0].woactivity)).toBe(true);
  expect(controller.isAllTaskComplete(selectedDatasource.items[1].woactivity)).toBe(false);
});

it('computedWOStatusPriority function to display status and priority on workorder', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  app.registerPage(page);
  app.registerController(controller);
  
  let assetQuery = {
    'asset.wobyasset.orderBy' :'-statusdate',
    'asset.wobyasset.limit' : 4
  };
  const ds = newDatasource(workorderitem, 'woAssetLocationds');
  page.registerDatasource(ds);
  ds.options.query = assetQuery;
  let locQuery = {
    'locations.wobylocation.orderBy' : '-statusdate',
    'locations.wobylocation.limit' : 4
  };
  const locDs = newDatasource(workorderitem, 'woLocationds');
  page.registerDatasource(locDs);
  locDs.options.query = locQuery;
  
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  let item = controller.computedWOStatusPriority({
    status_description: "Approved"
  });

  expect(item[0].label).toEqual("Approved");
  expect(item[0].type).toEqual("cool-gray");

  item = controller.computedWOStatusPriority({
    wopriority: 2
  });
  item[0].onClick();
  expect(item[1].label).toEqual("Priority 2");
  expect(item[1].type).toEqual("dark-gray");

});


it('computedWOStatusPriority function to display status and priority on workorder', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({name: 'approvals'});
  app.registerPage(page);
  app.registerController(controller);
  
  let assetQuery = {
    'asset.wobyasset.orderBy' :'-statusdate',
    'asset.wobyasset.limit' : 4
  };
  const ds = newDatasource(workorderitem, 'woAssetLocationds');
  page.registerDatasource(ds);
  ds.options.query = assetQuery;
  let locQuery = {
    'locations.wobylocation.orderBy' : '-statusdate',
    'locations.wobylocation.limit' : 4
  };
  const locDs = newDatasource(workorderitem, 'woLocationds');
  page.registerDatasource(locDs);
  locDs.options.query = locQuery;
  
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);

  let item = controller.computedWOStatusPriority({
    status_description: "Approved"
  });

  expect(item[0].label).toEqual("Approved");
  expect(item[0].type).toEqual("cool-gray");

  item = controller.computedWOStatusPriority({
    wopriority: 2
  });

  expect(item[1].label).toEqual("Priority 2");
  expect(item[1].type).toEqual("dark-gray");

});

it('distanceGPSandServiceaddress function to calculate distance between two cordinates in Miles ', async () => {
  const controller = new ScheduleDataController();

  let distance = controller.distanceGPSandServiceaddress('28.6691', '77.4537', '36.7783', '119.4179', 'Miles');
  expect(distance).toBeTruthy();

});

it('distanceGPSandServiceaddress function to calculate distance between two cordinates in KM', async () => {
  const controller = new ScheduleDataController();

  let distance = controller.distanceGPSandServiceaddress('28.6691', '77.4537', '36.7783', '119.4179', 'KM');
  expect(distance).toBeTruthy();

});

it('distanceGPSandServiceaddress function to calculate distance between two cordinates in KM', async () => {
  const controller = new ScheduleDataController();

  let distance = controller.distanceGPSandServiceaddress('28.6691', '77.4537', '28.6691', '77.4537', 'KM');
  expect(distance).toBe(0);
});



it("computedWorkTypeStatus function to show/hide button when distance is in KM", async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  app.registerPage(page);
  app.state = {};
  app.client = {};

  app.state = {
    systemProp: {
      'mxe.mobile.travel.prompt': '1',
      'mxe.mobile.travel.radius': '1',
    },
  };

  app.client = {
    userInfo: {
      country: 'IN',
    },
  };
  app.geolocation.updateGeolocation();
  app.geolocation.state.longitude = 77;
  app.geolocation.state.latitude = 28;
  app.geolocation.state.enabled = true;

  app.registerController(controller);
  //await app.initialize();
  

  const selectedDatasource = newDatasource(
    workorderitem,
    'selectedDatasource',
    'member'
  );
  app.registerDatasource(selectedDatasource);
  page.state = {
    selectedDS: 'selectedDatasource'
  };

  controller.app = app;

  let event = {
    wonum: '1201',
    description: '13170 problem',
    serviceaddress: {
      longitudex: '36',
      latitudey: '119',
    },
  };

  let hideworktypeButton = controller.computedWorkTypeStatus(event);
  expect(hideworktypeButton).toBe(true);

});

it("computedWorkTypeStatus function to show/hide button when distance is in Miles", async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  app.registerPage(page);
  app.state = {};
  app.client = {};

  app.state = {
    systemProp: {
      'mxe.mobile.travel.prompt': '1',
      'mxe.mobile.travel.radius': '1',
    },
  };

  app.client = {
    userInfo: {
      country: 'US',
    },
  };

  app.geolocation.updateGeolocation();
  app.geolocation.state.longitude = 77;
  app.geolocation.state.latitude = 28;
  app.geolocation.state.enabled = true;

  app.registerController(controller);
  const selectedDatasource = newDatasource(
    workorderitem,
    'selectedDatasource',
    'member'
  );
  app.registerDatasource(selectedDatasource);
  page.state = {
    selectedDS: 'selectedDatasource',
  };
  controller.app = app;

  let event = {
    wonum: '1201',
    description: '13170 problem',
    serviceaddress: {
      longitudex: '36',
      latitudey: '119',
    },
  };

  let hideworktypeButton = controller.computedWorkTypeStatus(event);
  expect(hideworktypeButton).toBe(true);

});


it("computedWorkTypeStatus function to show/hide button when long-lat of serviceaddress is not defined ", async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  app.registerPage(page);
  app.state = {};
  app.client = {};

  app.state = {
    systemProp: {
      'mxe.mobile.travel.prompt': '0',
      'mxe.mobile.travel.radius': '1',
    },
  };

  app.client = {
    userInfo: {
      country: 'US',
    },
  };

  app.geolocation.updateGeolocation();
  app.geolocation.state.longitude = 77;
  app.geolocation.state.latitude = 28;
  app.geolocation.state.enabled = true;

  app.registerController(controller);
  const selectedDatasource = newDatasource(
    workorderitem,
    'selectedDatasource',
    'member'
  );
  app.registerDatasource(selectedDatasource);
  page.state = {
    selectedDS: 'selectedDatasource',
  };
  controller.app = app;

  let event = {
    wonum: '1201',
    description: '13170 problem',
    serviceaddress: {},

  };

  let hideworktypeButton = controller.computedWorkTypeStatus(event);
  expect(hideworktypeButton).toBe(false);

});

it('createWOSymbology single feature INPRG', async () => {
  let mapController = new ScheduleDataController();

    const app = new Application();
    app.registerController(mapController);
    mapController.app = app;
    await app.initialize();

    const mockgetLocalizedLabel = jest.fn();
    app.getLocalizedLabel = mockgetLocalizedLabel;

  let params = {features: getFeatures(1, 'WOSTATUS|INPRG'), legends: mapController.retrieveWOLegends(app)};
  let responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(1, 'WOSTATUS|CLOSE'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(1, 'WOSTATUS|APPR'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(1, 'WOSTATUS|WMATL'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('createWOSymbology single feature DONE', async() => {
  let mapController = new ScheduleDataController();
  const app = new Application();
  app.registerController(mapController);
  mapController.app = app;
  await app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  app.getLocalizedLabel = mockgetLocalizedLabel;
  const params = {features: getFeatures(1, 'DONE'), legends: mapController.retrieveWOLegends(app)};
  let responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('createWOSymbology many feature', async() => {
  let mapController = new ScheduleDataController();
  const app = new Application();
  app.registerController(mapController);
  mapController.app = app;
  await app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  app.getLocalizedLabel = mockgetLocalizedLabel;
  
  let params = {features: getFeatures(1, 'INPRG'), legends: mapController.retrieveWOLegends(app)};
  let responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(2, 'INPRG'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('computedReading returns expected data', async () => {
  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({name: 'schedule'});
  app.registerPage(page);
  
  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);
  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);
  
  let item = {
    newreading: 1000, newreadingdate: '5/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
  }
  
  controller.computedReading(item);
  expect(item.computedReading).toEqual(800);

  item = {lastreading: 500, lastreadingdate: '6/1/2020 8:00 PM'};
  controller.computedReading(item);
  expect(item.computedReading).toEqual(500);

  item = {
    newreading: 1000, newreadingdate: '9/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
  };
  controller.computedReading(item);
  expect(item.computedReading).toEqual(1000);
  
  item = {
    newreading: 1000, newreadingdate: '9/1/2020 8:00 PM', lastreading: 800
  };
  controller.computedReading(item);
  expect(item.computedReading).toEqual(1000);
});

it('computedMeterCurDate returns expected data', async () => {
  const controller = new ScheduleDataController();

  let date = controller.computedMeterCurDate({
    newreading: 1000, computedMeterCurDate: '5/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
  });
  
  date.setSeconds(0);
  date.setMilliseconds(0);
  
  let curDateTime = new Date();
  curDateTime.setSeconds(0);
  curDateTime.setMilliseconds(0);  
});

it('computedMeterCurTime returns expected data', async () => {
  const controller = new ScheduleDataController();

  let date = controller.computedMeterCurTime({
    newreading: 1000, computedMeterCurTime: '5/1/2020 8:00 PM', lastreading: 800, lastreadingdate: '8/1/2020 8:00 PM'
  });
  
  let datetime = new Date();
  expect(date).toEqual(datetime.getTime());
});

it('computedIsAssetLoc returns expected data', async () => {
  const controller = new ScheduleDataController();
  let res = controller.computedIsAssetLoc({
    assetnumber: '',assetdesc:'',locationnum:'',locationdesc:''
  });
  expect(res).toEqual(true);
}); 

it('Validate Enable/Disable button for Materials and tools', async () => {
  let mockSetPage = jest.fn();
	global.open = jest.fn();

  const controller = new ScheduleDataController();
  const app = new Application();
  const page = new Page({ name: "schedule" });
  app.registerPage(page);
  app.registerController(controller);
  app.setCurrentPage = mockSetPage;

  const ds = newDatasource(workorderitem, 'woDetailResource');
  page.registerDatasource(ds);
  await app.initialize();

  
  let disableMaterialsButton = controller.checkMatToolAvail([{
    wonum: '1001',
    title: 'Centrifugal Pump Oil Change',
    description:
      'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
    toolcount: 1,
    materialcount : 1
  }]);

  expect(disableMaterialsButton).toBe(true);

  disableMaterialsButton = controller.checkMatToolAvail([{
    wonum: '1001',
    title: 'Centrifugal Pump Oil Change',
    description:
      'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
    toolcount: 0,
    materialcount : 0
  }]);

  expect(disableMaterialsButton).toBe(false);
});
