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

import CountBookDetailPageController from '../CountBookDetailPageController';
import countBookData from '../test/test-countbook-data';
import countBookLineData from '../test/test-countbookline-data';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import domainitem from '../test/domain-json-data.js';
import ICTestUtil from './ICTestUtil';

describe('ICTestUtil', () => {
  it('Check all the methods of ICTestUtil', async () => {
    let countBookDetailPageController = new CountBookDetailPageController(); 
    let app = new Application();
    const countBookDetailPage = new Page({
      name: 'countBookDetail',
      params: {countbookid: '101'},
      clearStack: false
    });
  
    app.registerController(countBookDetailPageController);
    countBookDetailPage.registerController(countBookDetailPageController);

    app.state.isMobileContainer = false;
    app.state.counteditemidlist4countbook = [267,268,269,270,271,272];
    app.state.counteditemvaluelist4countbook = [1, 2, 3, 4, 5, 6];
    
    countBookDetailPage.state.dsinitialize = false;
    
    const dsDomain = ICTestUtil.registerNewSynonymDatasourceInApp(app, domainitem, 'synonymdomainDS');
    const countBookListResource = ICTestUtil.registerNewCBListDatasourceInApp(app, countBookData, 'countBookListDS');
    const newDetailDatasource4ALL = ICTestUtil.registerNewDetailAllDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL');
    const countBookDetailds = ICTestUtil.registerNewDetailDatasource(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web');
    const countBookDetaildsCounted = ICTestUtil.registerNewDetailDatasourceCounted(countBookDetailPage, countBookLineData, 'countBookDetailDSALL4Web_Counted');
    
    expect(countBookListResource.getItems()).toBe(countBookData.member);
    expect(countBookListResource.undoItemChanges()).toBe(countBookData.member);
    expect(countBookListResource.getById()).toBe(countBookData.member[1]);
    expect(countBookListResource.get()).toBe(countBookData.member[1]);
    expect(countBookDetaildsCounted.undoItemChanges()).toBe(countBookLineData.member);

  });

});

 
