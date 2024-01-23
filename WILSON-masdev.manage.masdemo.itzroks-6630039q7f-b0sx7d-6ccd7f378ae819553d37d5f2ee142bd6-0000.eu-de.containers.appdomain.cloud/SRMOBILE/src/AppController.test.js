/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import 'regenerator-runtime/runtime';
import newTestStub from './test/AppTestStub';
import synonymData from './test/test-synonym-data.js';
import maxvarsData from './test/test-maxvars-data.js';

async function getApp() {
  let initializeApp = newTestStub({
    currentPage: 'main',
    datasources: {
      synonymdomainDS: {
        data: synonymData
      },
      defaultSetDs: {
        data: maxvarsData
      }
    },
    onNewApp: (app) => {
      app.client.systemProperties = {
        'sr.filter.site': '0',
        'sr.default.priority': '3',
        'sr.high.priority': '2'
      }
    }
  });
  let app = await initializeApp();
  return app;
}



describe("AppController", () => {

  it("can load app controller", async () => {
    const app = await getApp();
    const controller = app.controllers[0];
    let appInitSpy = jest.spyOn(controller, "applicationInitialized");
    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });
  
  it("can setupIncomingContext", async () => {
    const app = await getApp();
    const controller = app.controllers[0];

    //Test setupIncomingContext
    app.state.incomingContext = { href: "oslc/os/mxapisr/_U1IvMTE3Ng--" };
    controller.onContextReceived();
  });

  it("can load system properties", async () => {
    const app = await getApp();
    const controller = app.controllers[0];
    controller.loadSystemProperties();
  });

});
