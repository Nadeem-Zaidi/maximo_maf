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

import AppController from "./AppController";
import {Application, Device} from "@maximo/maximo-js-api";
import sinon from 'sinon';
import StorageManager from "@maximo/map-component/build/ejs/framework/storage/StorageManager";

describe("AppController", () => {
  it("loads controller", async () => {
    const controller = new AppController();
    let appInitSpy = jest.spyOn(controller, "applicationInitialized");
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });
});

it("Validate setup incoming context with assetnum", async () => {
  const controller = new AppController();
  let appInitSpy = jest.spyOn(controller, "applicationInitialized");
  const app = new Application();
  app.registerController(controller);
  const setupIncomingContext = sinon.spy(controller, 'setupIncomingContext');
  app.state.incomingContext = {
    page: 'assetDetails',
    href: 'oslc/os/mxapiasset/_QkVERk9SRC8xMjIx',
    assetnum: '26000',
  };
  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  expect(controller.app).toBe(app);
  sinon.assert.callCount(setupIncomingContext, 1);
});

it("Validate setup incoming context without assetnum", async () => {
  const controller = new AppController();
  let appInitSpy = jest.spyOn(controller, "applicationInitialized");
  const app = new Application();
  app.registerController(controller);
  const setupIncomingContext = sinon.spy(controller, 'setupIncomingContext');
  app.state.incomingContext = {
    page: 'assetDetails',
    href: 'oslc/os/mxapiasset/_QkVERk9SRC8xMjIx'
  };
  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  expect(controller.app).toBe(app);
  sinon.assert.callCount(setupIncomingContext, 1);
});

it('checks if implementation setting for LocalStorageManager in MaximoMobile is successful', async () => {
  StorageManager.setImplementation = jest.fn();
  const controller = new AppController ();
  const app = new Application ();
  Device.get ().isMaximoMobile = true;
  app.registerController (controller);
  await app.initialize ();
  expect(StorageManager.setImplementation.mock.calls.length).toEqual(1);
  Device.get ().isMaximoMobile = false;
});
