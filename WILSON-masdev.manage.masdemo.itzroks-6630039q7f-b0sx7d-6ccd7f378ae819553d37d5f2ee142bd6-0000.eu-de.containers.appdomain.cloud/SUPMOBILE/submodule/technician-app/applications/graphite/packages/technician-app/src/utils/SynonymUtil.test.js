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

import { JSONDataAdapter, Datasource, Application } from '@maximo/maximo-js-api';
import SynonymUtil from './SynonymUtil';
import statusitem from '../test/statuses-json-data.js';

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

describe('SynonymUtil', () => {
  it('getSynonym test', async () => {
    const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const getSynonym = await SynonymUtil.getSynonym(synonymDS, 'TIMERSTATUS', 'TIMERSTATUS|ACTIVE');
    expect(getSynonym.value).toBe('ACTIVE');
  });
  it('getSynonym test', async () => {
    const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const getSynonym = await SynonymUtil.getSynonym(synonymDS, 'TIMERSTATUS', 'TIMERSTATUS|NONE');
    expect(getSynonym).toBeUndefined();
  });

  it('getExternalStatusList test', async () => {
    const app = new Application();
    // const page = new Page({name: 'page'});
    const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(synonymDS);
    app.client = {
      userInfo: {
        insertOrg: "EAGLENA",
        insertSite: "BEDFORD"
      }
    };
    const returnData = await SynonymUtil.getExternalStatusList(app, ['INPRG']);
    expect(returnData.length).toBe(1);
    expect(returnData[0]).toEqual('INPRG');
  });

  it('getDefaultExternalSynonymValue test', async () => {
    const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const getSynonym = await SynonymUtil.getDefaultExternalSynonymValue(synonymDS, 'LTTYPE', 'WORK');
    expect(getSynonym).toBe('WORK');
  });

  it('getSynonymDomain test', async () => {
    const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const getSynonym = await SynonymUtil.getSynonymDomain(synonymDS, 'LTTYPE', 'WORK');
    expect(getSynonym.maxvalue).toEqual('WORK');
  });

  it('getSynonymDomainByValue test', async () => {
    const synonymDS = newStatusDatasource(statusitem, 'synonymdomainData');
    const getSynonym = await SynonymUtil.getSynonymDomainByValue(synonymDS, 'LTTYPE', 'WORK', 'BEDFORD', 'EAGLENA');
    expect(getSynonym.maxvalue).toEqual('WORK');
  });
});
