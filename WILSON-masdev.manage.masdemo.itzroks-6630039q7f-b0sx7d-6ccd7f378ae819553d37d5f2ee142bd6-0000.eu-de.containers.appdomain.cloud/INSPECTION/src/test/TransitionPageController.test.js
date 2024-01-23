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

import 'regenerator-runtime/runtime';
import TransitionPageController from '../TransitionPageController';
import AppController from '../AppController';

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource
} from '@maximo/maximo-js-api';

import inspectionsInProgData from './data/inspections-data-inprog';

function newDatasource(data = inspectionsInProgData, name = 'testds') {
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

it('should call setCurrentPage', async () => {
  const controller = new AppController();
  const pageController = new TransitionPageController();
  const app = new Application();
  const page = new Page({name: 'transition_page'});

  const ds = newDatasource(inspectionsInProgData,'contextredirectds');
  page.registerDatasource(ds);

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  const origSetPage = app.setCurrentPage;
  app.setCurrentPage = mockSetPage;

  app.registerController(controller);
  page.registerController(pageController);

  await app.initialize();

  ds.load()
  
  page.params.inspectionresultid = 29

  await pageController.pageResumed(page,app);
  //when creating a new Page setCurrentPage is called once
  //check if the mock call is related to creating this new Page only
  //and not related to the app initialization
  expect(mockSetPage.mock.calls.length).toBe(1);
  expect(mockSetPage.mock.calls[0][0].name).toBe('execution_panel');
  expect(mockSetPage.mock.calls[0][0].params.inspectionresultid).toBe(29);
  app.setCurrentPage = origSetPage;
});

it('should call setCurrentPage - batch', async () => {
  const controller = new AppController();
  const pageController = new TransitionPageController();
  const app = new Application();
  const page = new Page({name: 'transition_page'});
 
  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  const origSetPage = app.setCurrentPage;
  app.setCurrentPage = mockSetPage;

  app.registerController(controller);
  page.registerController(pageController);

  await app.initialize();
  page.params = {isBatch:true, inspectionresultid: [29,30], itemhref: ['h1','h2']};
  jest.useFakeTimers();
  await pageController.pageResumed(page,app);
  jest.runAllTimers();
  //when creating a new Page setCurrentPage is called once
  //check if the mock call is related to creating this new Page only
  //and not related to the app initialization

  expect(mockSetPage.mock.calls.length).toBe(1);
  expect(mockSetPage.mock.calls[0][0].name).toBe('execution_panel');
  expect(mockSetPage.mock.calls[0][0].params.inspectionresultid[0]).toBe(29);
  expect(mockSetPage.mock.calls[0][0].params.inspectionresultid[1]).toBe(30);
  app.setCurrentPage = origSetPage;

});
