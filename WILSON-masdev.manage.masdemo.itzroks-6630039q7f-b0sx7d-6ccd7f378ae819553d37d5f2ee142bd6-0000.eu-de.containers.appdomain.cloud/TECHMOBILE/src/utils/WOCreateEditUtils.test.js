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

import { Application, JSONDataAdapter, Datasource } from "@maximo/maximo-js-api";
// import sinon from 'sinon';
import WOCreateEditUtils from "./WOCreateEditUtils";
import assetLookupData from "../test/asset-lookup-json-data.js";
import statusitem from '../test/statuses-json-data.js';

function newLookupDatasource(
  data,
  name = "assetLookupDS",
  idAttribute = "assetnum"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });

  return ds;
}


function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
    src: statusitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name
  });
  return ds;
}

describe("WOCreateEditUtils", () => {
  it("should getAssetOrLocation", async () => {
    const app = new Application();
    app.client = {
      userInfo: {
        defaultSite: "BEDFORD",
      },
    };
    const assetDataDs = newLookupDatasource(
      assetLookupData,
      "assetLookupDS",
      "assetnum"
    );
    app.registerDatasource(assetDataDs);

    let data = await WOCreateEditUtils.getAssetOrLocation(
      app,
      "assetLookupDS",
      "assetnum",
      "1008"
    );
    expect(data.length).toBe(1);
  });

  it("should setPriorityFailureCode", async () => {
    const app = new Application();
    app.client = {
      userInfo: {
        defaultSite: "BEDFORD",
      },
    };

    const assetDataDs = newLookupDatasource(
      assetLookupData,
      "assetLookupDS",
      "assetnum"
    );
    app.registerDatasource(assetDataDs);

    const locationDataDs = newLookupDatasource(
      assetLookupData,
      "locationLookupDS",
      "location"
    );
    app.registerDatasource(locationDataDs);

    let ds = {
      item: {
        assetnum: '1008'
      },
    };

    await WOCreateEditUtils.setPriorityFailureCode(app,ds);
    expect(ds.item.assetlocpriority).toBe(2);
    expect(ds.item.failurecode).toBe('PUMPS');

    ds = {
      item: {
        location: 'BR210'
      },
    };
    await WOCreateEditUtils.setPriorityFailureCode(app,ds);
    expect(ds.item.assetlocpriority).toBe(3);
    expect(ds.item.failurecode).toBe('HVAC');
  });

  it("should validateGlAccount", async () => {
    const app = new Application();

    let ds = {
      item: {
        glaccount: '6400-300-???'
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
    }

    let event = {
        glaccount: '6210-350-???'
    };
    const str = 'The location and asset combination you entered has different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination?'
    WOCreateEditUtils.validateGlAccount(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
  });

  it("should validateLocation", async () => {
    const app = new Application();

    let ds = {
      item: {
        location: 'BR210'
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
    }

    let event = {
      location: 'BR230'
    };
    const str = `The specified asset is not in the current location. Do you want to update the location with this  asset's location - ${event.location}?`
    WOCreateEditUtils.validateLocation(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
    event.location = '';
    expect(WOCreateEditUtils.validateLocation(app, page, ds, event)).toBe(true);
  });

  it("should validateAsset", async () => {
    const app = new Application();

    let ds = {
      item: {
        assetnum: '11240'
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
    }

    let event = {
      asset: [
        {
          assetnum: "11250",
          description: "Circulation Fan- Centrifugal/ 20/000 CFM",
          location: "BR200",
          priority: 4,
        }
      ]
    };
    const str = `The specified location does not contain the current asset. Do you want to update the asset with the asset that is in this new location - ${event.asset[0].assetnum}?`
    WOCreateEditUtils.validateAsset(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
    
    event.asset = [];
    expect(WOCreateEditUtils.validateAsset(app, page, ds, event)).toBe(true);
  });

  it("should setAsset", async () => {
    const app = new Application();

    let ds = {
      item: {
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
      name: 'woedit'
    }

    let event = {
      assetnum: '1877',
      location: 'FIELDSTAFF'
    };
    WOCreateEditUtils.setAsset(app, page, ds, event);
    expect(ds.item.assetnum).toBe('1877');
  });

  it("should setGLAccount", async () => {
    const app = new Application();

    let ds = {
      item: {
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
      name: 'woedit'
    }

    let event = {
      assetnum: '1877',
      location: 'FIELDSTAFF'
    };
    WOCreateEditUtils.setGLAccount(app, page, ds, event, 'SETASSETGL');
    expect(ds.item.assetnum).toBe('1877');
  });

  it("should open logtype lookup", async () => {
    const app = new Application();
    const page =  {
      state:{"initialDefaultLogType":"!CLIENTNOTE!"},
      showDialog: () => {},
      name: 'schedule'
    }
    const ds = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(ds);
    await WOCreateEditUtils.openWorkLogTypeLookup(page,ds);
    expect(app.findDatasource("synonymdomainData").item.value).not.toBeNull();

    page.state.initialDefaultLogType = '';
    await WOCreateEditUtils.openWorkLogTypeLookup(page,ds);
    expect(app.findDatasource("synonymdomainData").item.value).not.toBeNull();
  });

});
