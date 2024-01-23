/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import VoiceController from '../VoicePageController';
import {
  Application,
  Page
} from '@maximo/maximo-js-api';

let controller = null;
let app = null;
let page = null;
let execution_panel_page = null;
beforeEach(() => {
  controller = new VoiceController();
  app = new Application();
  page = new Page();

  execution_panel_page = new Page({ id: 'execution_panel', name: 'execution_panel' });
  execution_panel_page.datasources = {
    executeInspections: {
      forceSync: () => { }
    }
  }
  page.registerController(controller);
  app.registerPage(page);
  app.registerPage(execution_panel_page)
});

it('pageInitialized', async () => {
  await app.initialize();

  page.state.callback.onConnecting();
  expect(page.state.isDisconnected).toBeFalsy();
  expect(page.state.isError).toBeFalsy();

  page.state.callback.onDisconnect('reason');
  expect(page.state.isDisconnected).toBeTruthy();
  expect(page.state.isError).toBeTruthy();

  page.state.callback.onNotReady(new Error());
  expect(page.state.isError).toBeTruthy();

  page.state.callback.onReceivedData({
    data: { body: { saved: true }}
  });

  page.state.callback.onError('name', 'message');
  expect(page.state.isError).toBeTruthy();
})

it('pageResumed', async () => {
  localStorage.setItem('serverUrl', 'https://fake.ivt.suite.maximo.com/');
  
  page.params.orgid = 'ABC';
  page.params.form_num = '1071';
  page.params.revision = '1';
  page.params.result_num = '1002';
  sessionStorage.setItem('access_token', 'token_abc_123');

  controller.pageResumed(page, app);
  expect(page.state.configs.server.params.sessionParam.orgId).toBe('ABC');
  expect(page.state.configs.server.params.sessionParam.formNum).toBe('1071');
  expect(page.state.configs.server.params.sessionParam.revision).toBe('1');
  expect(page.state.configs.server.params.sessionParam.resultNum).toBe('1002');
  expect(page.state.configs.server.headers['x-access-token']).toBe('token_abc_123');
})

it('pagePaused', async () => {
  await app.initialize();
  controller.pagePaused();
  expect(page.state.muted).toBe(true);
});

it('toggle', async () => {
  await app.initialize();
  controller.toggle();
  expect(page.state.muted).toBe(true);

  controller.toggle();
  expect(page.state.muted).toBe(false);
});
