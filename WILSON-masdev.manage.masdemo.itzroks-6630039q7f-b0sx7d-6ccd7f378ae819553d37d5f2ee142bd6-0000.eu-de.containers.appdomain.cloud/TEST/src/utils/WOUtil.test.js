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

import sinon from 'sinon';
import WOUtil from './WOUtil';
import workorderitem from '../test/wo-detail-json-data.js';
import multiassetlocitem from '../test/wo-detail-multiassetloc-data.js';
import { Application} from '@maximo/maximo-js-api';

describe('WOUtil', () => {
  it('should return computedReading', async () => { 
    const app = new Application();
    await app.initialize();
    
    let item = {
      newreading: 1000, newreadingdate: '5/1/2020 8:00 PM', lastreadingdate: '4/1/2020 8:00 PM'
    };
    let computedReadingSpy = sinon.spy(WOUtil,'computedReading');
    let reading = WOUtil.computedReading(item, app);
    expect(computedReadingSpy.called).toBe(true);
    expect(computedReadingSpy.args[0][0].computedReading).toEqual(1000);
    expect(computedReadingSpy.args[0][0].computedReadingDate).toEqual('5/1/2020 8:00 PM');
    expect(computedReadingSpy.args[0][0].lastreading).toEqual(1000);
    expect(reading).toEqual(1000);
    computedReadingSpy.restore();

    item = {
      lastreading: 500, lastreadingdate: '6/1/2020 8:00 PM'
    };
    computedReadingSpy = sinon.spy(WOUtil,'computedReading');
    reading = WOUtil.computedReading(item, app);
    expect(computedReadingSpy.called).toBe(true);
    let lastreadingdate = app.dataFormatter.dateTimeToString(computedReadingSpy.args[0][0].computedReadingDate);    
    expect(lastreadingdate).toEqual("06/01/2020 8:00 PM");
    expect(computedReadingSpy.args[0][0].computedReading).toEqual(500);
    expect(reading).toEqual(500);
    
    item = {
      newreading: 500, newreadingdate: '6/1/2020 8:00 PM'
    };
    
    reading = WOUtil.computedReading(item, app);
    expect(computedReadingSpy.called).toBe(true);
    let newreadingdate = app.dataFormatter.dateTimeToString(computedReadingSpy.args[0][0].computedReadingDate);
    expect(newreadingdate).toEqual('06/01/2020 8:00 PM');
    expect(computedReadingSpy.args[0][0].computedReading).toEqual(500);
    expect(reading).toEqual(500);
  });

  it('Should return location name with description', async () => {
    let item = multiassetlocitem.member[0];
    let location = WOUtil.getLocationName(item);
    expect(location).toEqual('BR300 Boiler Room Reciprocating Compressor');
    
    delete item.locationdesc;
    location = WOUtil.getLocationName(item);
    expect(location).toEqual('BR300');
    
    item = workorderitem.member[2];
    location = WOUtil.getLocationName(item);
    expect(location).toEqual('BPM3100 #1 Liquid Packaging Line');

    delete item.locationdesc;
    location = WOUtil.getLocationName(item);
    expect(location).toEqual('BPM3100');
  });

  it('Should return asset name with description', async () => {
    let item = multiassetlocitem.member[0]; 
    let asset = WOUtil.getAssetName(item);
    expect(asset).toEqual('11300 Reciprocating Compressor- Air Cooled/100 CFM');

    delete item.assetdescription;
    asset = WOUtil.getAssetName(item);
    expect(asset).toEqual('11300');
    
    item = workorderitem.member[2];
    asset = WOUtil.getAssetName(item);
    expect(asset).toEqual('13120 Bottom Sealing System');

    delete item.assetdesc;
    asset = WOUtil.getAssetName(item);
    expect(asset).toEqual('13120');
  });
  

});

 
