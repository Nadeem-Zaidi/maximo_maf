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

import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';

const registerNewCBListDatasourceInApp = (app, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbookid",
    name: 'countBookListDS'
  });


  //const newDatasource = newCBListDatasource(dataSourceData, 'countBookListDS');
  return registerDataSourceInApp(app, ds, dataSourceData);
}

const registerNewCBDatasourceOnPage = (app, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbookid",
    name: 'countBookDS'
  });


  //const newDatasource = newCBDatasource(dataSourceData, 'countBookDS');
  return registerDataSourceOnPage(app, ds, dataSourceData);
}

const registerNewSynonymDatasourceInApp = (app, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: 'synonymdomainDS'
  });
   

  //const newDatasource = newSynonymStatusDatasource(dataSourceData, 'synonymdomainDS');
  return registerDataSourceInApp(app, ds, dataSourceData);
}

const registerNewDetailAllDatasource = (workOnPage, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbooklineid",
    name: dataSourceName
  });

  //const newDatasource = newDetailALLDatasource(dataSourceData, dataSourceName, 'member');
  return registerDataSourceOnPage(workOnPage, ds, dataSourceData);
}

const registerNewDetailDatasource = (workOnPage, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbooklineid",
    name: dataSourceName
  });
  //const newDatasource = newDetailDatasource(dataSourceData, dataSourceName, 'member');
  return registerDataSourceOnPage(workOnPage, ds, dataSourceData);
}

const registerNewDetailDatasource4JSON = (workOnPage, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbooklineid",
    name: dataSourceName
  });


  //const newDatasource = newDetailDatasource4JSON(dataSourceData, dataSourceName, 'member');
  return registerDataSourceOnPage(workOnPage, ds, dataSourceData);
}

const registerNewDetailDatasourceCounted = (workOnPage, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbooklineid",
    name: dataSourceName
  });

  //const newDatasource = newDetailDatasourceCounted(dataSourceData, dataSourceName, 'member');
  return registerDataSourceOnPage(workOnPage, ds, dataSourceData);
}

const registerNewDetailDatasourceCounted4JSON = (workOnPage, dataSourceData, dataSourceName) => {
  const da = new JSONDataAdapter({
    src: dataSourceData,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: "countbooklineid",
    name: dataSourceName
  });

  //const newDatasource = newDetailDatasourceCounted4JSON(dataSourceData, dataSourceName, 'member');
  return registerDataSourceOnPage(workOnPage, ds, dataSourceData);
}

const registerDataSourceOnPage = (workOnPage, dataSource, dataSourceData) => { 
  workOnPage.registerDatasource(dataSource);
  //app.registerDatasource(newDetailDatasource4ALL);
  let items1 = dataSourceData.member;
  dataSource.getById = sinon.spy(() => {
    return items1[1];
  }); 
  dataSource.save = sinon.spy(() => {
    return items1[1];
  });
  dataSource.load = sinon.spy(() => {
    return items1;
  });
  dataSource.undoItemChanges = sinon.spy(() => {
    return items1;
  });
  dataSource.getItems = sinon.spy(() => {
    return items1;
  });
  dataSource.get = sinon.spy(() => {
    return items1[1];
  });
  sinon.stub(dataSource, 'clearState');
  sinon.stub(dataSource, 'clearQBE');
  sinon.stub(dataSource, 'setQBE');
  sinon.stub(dataSource, 'deleteItem');
  sinon.stub(dataSource, 'add');
  sinon.stub(dataSource, 'initializeQbe');
  sinon.stub(dataSource, "invokeAction").returns(items1); 
  dataSource.searchQBE = sinon.spy(() => {
    return items1;
  }); 
  return dataSource;
}

const registerDataSourceInApp = (app, dataSource, dataSourceData) => { 
  app.registerDatasource(dataSource);
  //app.registerDatasource(newDetailDatasource4ALL);
  let items1 = dataSourceData.member;
  dataSource.getById = sinon.spy(() => {
    return items1[1];
  }); 
  dataSource.load = sinon.spy(() => {
    return items1;
  });
  dataSource.undoItemChanges = sinon.spy(() => {
    return items1;
  });
  dataSource.getItems = sinon.spy(() => {
    return items1;
  });
  dataSource.get = sinon.spy(() => {
    return items1[1];
  });
  sinon.stub(dataSource, 'clearState');
  sinon.stub(dataSource, 'clearQBE');
  sinon.stub(dataSource, 'setQBE');
  sinon.stub(dataSource, 'deleteItem');
  sinon.stub(dataSource, 'add');
  sinon.stub(dataSource, 'initializeQbe');
  sinon.stub(dataSource, "invokeAction").returns(items1); 
  dataSource.searchQBE = sinon.spy(() => {
    return items1;
  }); 
  return dataSource;

}


const functions = {
  registerNewCBListDatasourceInApp,
  registerNewCBDatasourceOnPage,
  registerNewSynonymDatasourceInApp,
  registerNewDetailAllDatasource,
  registerNewDetailDatasource,
  registerNewDetailDatasource4JSON,
  registerNewDetailDatasourceCounted,
  registerNewDetailDatasourceCounted4JSON,
  registerDataSourceOnPage
};

export default functions;
