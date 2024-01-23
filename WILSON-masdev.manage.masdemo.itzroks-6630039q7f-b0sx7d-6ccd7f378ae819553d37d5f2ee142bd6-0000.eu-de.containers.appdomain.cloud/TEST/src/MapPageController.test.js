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

import MapPageController from './MapPageController';
import {Application, Page} from '@maximo/maximo-js-api';

it("should load work order list data with map", done => {
  global.open = jest.fn();
  const controller = new MapPageController();
  const app = new Application();
  const page = new Page({name: 'map'});
  const nextPage = new Page({name: 'schedule'});

  app.registerController(controller);
  app.registerPage(nextPage);
  app.registerPage(page);
  app.initialize().then(() => {
    window.setTimeout(() => {
      expect(app.currentPage).toBe(nextPage);
      expect(app.currentPage.state.selectedSwitch).toBe(1);
      done();
    }, 1);
  });
});

it("should load work order list data with map for approvals", done => {
  global.open = jest.fn();
  const controller = new MapPageController();
  const app = new Application();
  const page = new Page({name: 'map'});
  const nextPage = new Page({name: 'approvals'});

  app.registerController(controller);
  app.registerPage(nextPage);
  app.registerPage(page);
  app.initialize().then(() => {
    window.setTimeout(() => {
      expect(app.currentPage).toBe(nextPage);
      expect(app.currentPage.state.selectedSwitch).toBe(1);
      done();
    }, 1);
  });
});

it("should load work order list data if map not configurared", async() => {
  global.open = jest.fn();
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  const controller = new MapPageController();
  const app = new Application();
  const page = new Page({name: 'map'});
  const nextPage = new Page({name: 'schedule'});
  app.state.isMapValid = false;

  app.device = {isMaximoMobile : true};
  app.registerController(controller);
  app.registerPage(nextPage);
  app.registerPage(page);
  await app.initialize();
	await controller.pageResumed(page, app);
  jest.runAllTimers();
  expect(app.currentPage).toBe(nextPage);
  expect(app.currentPage.state.selectedSwitch).toBe(0);
});
