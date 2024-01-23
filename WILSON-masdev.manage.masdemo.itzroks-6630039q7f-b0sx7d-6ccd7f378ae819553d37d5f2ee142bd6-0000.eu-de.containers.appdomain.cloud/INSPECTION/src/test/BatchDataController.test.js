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

import BatchDataController from "../BatchDataController";
import {
  Application,
  Datasource,
  JSONDataAdapter
} from '@maximo/maximo-js-api';
import assignedworkds from './data/allinspectionsds-data';
import batchDsSearchQbe from './data/batchds-search-qbe-data';
import sinon from 'sinon';
import batchds from './data/batchds-data';

function newDatasource(data, name) {
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

it('get should be called when datalists are loaded', async () => {
  const controller = new BatchDataController();
  const app = new Application();
  const mockFn = jest.fn();
  const getAssignedInspectionsFromBatchSpy = sinon.spy(controller, 'getAssignedInspectionsFromBatch');

  const assignWorkDs = newDatasource(assignedworkds, 'assignWorkDs');
  const batchDs = newDatasource(batchds, 'batchds');
  assignWorkDs.forceReload = mockFn;
  assignWorkDs.searchQBE = () => { return batchDsSearchQbe };
  assignWorkDs.setQBE = () => { };
  assignWorkDs.initializeQbe = () => { };
  controller.clearSearch = mockFn;
  assignWorkDs.registerController(controller);
  batchDs.registerController(controller);
  app.registerDatasource(assignWorkDs);
  app.registerDatasource(batchDs);
  app.pages = [{ datasources: { assignedworkds: assignWorkDs, batchds: batchDs } }];

  await app.initialize();

  controller.onAfterLoadData(null, null);
  expect(getAssignedInspectionsFromBatchSpy.calledOnce).toBe(true);
});

it('clearSearch function', async () => {
  const controller = new BatchDataController();
  const app = new Application();

  app.registerController(controller);

  const data = {
    item: [{
      name: 'ABC',
      id: '001'
    }],
    lastQuery: {
      qbe: '{}'
    },
    clearQBE: () => { },
    searchQBE: () => { }
  };

  await controller.clearSearch(data);
});

it('_computeWOTitle returns correct value', async () => {
  const controller = new BatchDataController();

  let computedValue = controller._computeWOTitle({
    workorder: [
      {
        description: 'Batch',
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  });
  expect(computedValue).toBe('PM 1234 Batch');

  computedValue = controller._computeWOTitle({
    workorder: [
      {
        description: 'Batch',
        wonum: '1234'
      }
    ]
  });
  expect(computedValue).toBe('1234 Batch');

  computedValue = controller._computeWOTitle({});
  expect(computedValue).toBeNull();


  computedValue = controller._computeWOTitle({
    workorder: [
      {
        worktype: 'PM',
        wonum: '1234'
      }
    ]
  });
  expect(computedValue).toBe('PM 1234 ');
});



it('_computeHideCompleted returns correct value', async () => {
  const controller = new BatchDataController();
  controller.app = {
    state: {
      completedItems: {}
    }
  };

  let computedValue = controller._computeHideCompleted({

    inspectionresultid: 1,
    status_maxvalue: 'COMPLETED'

  });
  expect(computedValue).toBe(false);

  computedValue = controller._computeHideCompleted(
    {
      inspectionresultid: 1,
      status_maxvalue: 'REVIEW'
    }
  );
  expect(computedValue).toBe(false);


  computedValue = controller._computeHideCompleted(
    {
      inspectionresultid: 1,
      status_maxvalue: 'TEST'
    }
  );
  expect(computedValue).toBe(true);


  controller.app = {
    state: {
      completedItems: {
        '1': 'COMPLETED'
      }
    }
  };
  computedValue = controller._computeHideCompleted(
    {
      status_maxvalue: 'TEST',
      inspectionresultid: 1
    }
  );
  expect(computedValue).toBe(false);
});



it('_computeHidePreview returns correct value', async () => {
  const controller = new BatchDataController();
  controller.app = {
    state: {
      completedItems: {}
    },
    device:{
      isMaximoMobile: true
    }
  };

  let computedValue = controller._computeHidePreview({

    inspectionresultid: 1,
    status_maxvalue: 'COMPLETED'

  });
  expect(computedValue).toBe(true);

  computedValue = controller._computeHidePreview(
    {
      inspectionresultid: 1,
      status_maxvalue: 'CAN'
    }
  );
  expect(computedValue).toBe(true);


  computedValue = controller._computeHidePreview(
    {
      inspectionresultid: 1,
      status_maxvalue: 'TEST'
    }
  );
  expect(computedValue).toBe(false);


  controller.app.device.isMaximoMobile = false;

  controller._computeHidePreview({

    inspectionresultid: 1,
    status_maxvalue: 'COMPLETED'

  });
  expect(computedValue).toBe(false);

  computedValue = controller._computeHidePreview(
    {
      inspectionresultid: 1,
      status_maxvalue: 'CAN'
    }
  );
  expect(computedValue).toBe(false);


  computedValue = controller._computeHidePreview(
    {
      inspectionresultid: 1,
      status_maxvalue: 'TEST'
    }
  );
  expect(computedValue).toBe(false);

  controller.app = {
    state: {
      completedItems: {
        '1': 'COMPLETED'
      }
    },
    device:{
      isMaximoMobile: true
    }
  };
  
  computedValue = controller._computeHidePreview(
    {
      status_maxvalue: 'TEST',
      inspectionresultid: 1
    }
  );
  expect(computedValue).toBe(true);


  controller.app = {
    state: {
      completedItems: {
        '1': 'CAN'
      }
    },
    device:{
      isMaximoMobile: true
    }
  };
  computedValue = controller._computeHidePreview(
    {
      status_maxvalue: 'TEST',
      inspectionresultid: 1
    }
  );
  expect(computedValue).toBe(true);
});
