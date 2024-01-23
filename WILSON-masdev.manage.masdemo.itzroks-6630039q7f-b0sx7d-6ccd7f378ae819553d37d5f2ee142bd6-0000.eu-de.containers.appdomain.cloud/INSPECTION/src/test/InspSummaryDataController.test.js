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

import InspSummaryDataController from '../InspSummaryDataController';

it('_computeTitle returns correct value', async () => {
  const controller = new InspSummaryDataController();
  let title = controller._computeTitle({
    inspectionform: {
      name: 'inspformname'
    },
    referenceobject: 'PARENTWO',
    workorder: [{
        worktype: 'PM',
        wonum: '1234',
        description: 'wodescription'
    }]
  });
  expect(title).toBe('wodescription PM 1234');

  title = controller._computeTitle({
    inspectionform: {
      name: 'inspformname'
    }
  });
  expect(title).toBe('inspformname');

  title = controller._computeTitle({
    inspectionform: {
      name: ''
    }
  });
  expect(title).toBe('');

  title = controller._computeTitle({
    inspectionform: {
      name: ''
    },
    referenceobject: 'PARENTWO',
    workorder: [{
        wonum: '1234'
    }]
  });
  expect(title).toBe('1234');

  title = controller._computeTitle();
  expect(title).toBe('');

});

it('_computeAssetInfo returns correct value', async () => {
  const controller = new InspSummaryDataController();
  let assetinfo = controller._computeAssetInfo({
    assets: [{
      assetnum: 'ASSET1',
      description: 'Asset1 Desc'
    }]
  });
  expect(assetinfo).toBe('ASSET1 Asset1 Desc');

  assetinfo = controller._computeAssetInfo({
    assets: [{
      assetnum: 'ASSET1',
      description: ''
    }]
  });
  expect(assetinfo).toBe('ASSET1');

  assetinfo = controller._computeAssetInfo();
  expect(assetinfo).toBeNull();

  assetinfo = controller._computeAssetInfo({
    assets: [{
      assetnum: '',
      description: ''
    }]
  });
  expect(assetinfo).toBeNull();
});

it('_computeLocationInfo returns correct value', async () => {
  const controller = new InspSummaryDataController();
  let locationinfo = controller._computeLocationInfo({
    locations: [{
      location: 'LOCATION1',
      description: 'Location1 Desc'
    }]
  });
  expect(locationinfo).toBe('LOCATION1 Location1 Desc');

  locationinfo = controller._computeLocationInfo({
    locations: [{
      location: 'LOCATION1',
      description: ''
    }]
  });
  expect(locationinfo).toBe('LOCATION1');

  locationinfo = controller._computeLocationInfo();
  expect(locationinfo).toBeNull();

  locationinfo = controller._computeLocationInfo({
    locations: [{
      location: '',
      description: ''
    }]
  });
  expect(locationinfo).toBeNull();
});


