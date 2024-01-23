/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ReservationsListPageController from "./ReservationsListPageController";
import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page,
} from "@maximo/maximo-js-api";
import reservationsListDS from "./test/test-reservations-data";
import invuseListDS from "./test/test-invusage-data";

import sinon from "sinon";

function newDatasource(data = reservationsListDS, name = "reservationsListDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    invuseid: "invuseid",
    name: name,
  });

  return ds;
}

it("Page initialized", async () => {
  const app = new Application();
  let controller = new ReservationsListPageController();
  let page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  let appInitSpy = jest.spyOn(controller, "pageInitialized");

  const ds = newDatasource(reservationsListDS, "reservationsListDS");
  ds.registerController(controller);
  app.registerDatasource(ds);
  const invuseds = newDatasource(invuseListDS, "invUseDS");
  invuseds.registerController(controller);
  app.registerDatasource(invuseds);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});

  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
});

it("Page loading", async () => {
  const app = new Application();
  let controller = new ReservationsListPageController();
  let page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const ds = newDatasource(reservationsListDS, "reservationsListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  app.registerDatasource(invuseds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});

  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  app.state.selectedInvUseDSName = "invUseDS";
  controller.pageResumed(page, app);
});

it("selectToIssue function returns a set of items and calls the invUsage Page", async () => {
  const controller = new ReservationsListPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(reservationsListDS, "reservationsListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns([]);
  sinon.stub(invuseds, "forceReload").returns([]);

  sinon.stub(ds, "getSelectedItems").returns(reservationsListDS.member[0]);
  sinon.stub(ds, "load").returns(reservationsListDS.member);
  sinon.stub(ds, "clearSelections");
  ds.getSelectedItems().length = 1;

  app.registerPage(page);
  app.setCurrentPage(page);
  let appSpy = jest.spyOn(controller, "selectToIssue");

  await app.initialize();
  await ds.load();

  controller.selectToIssue();
  expect(appSpy.mock.calls).toHaveLength(1);

  // ds.setSelected(1, true);
  controller.selectToIssue();
  expect(appSpy).toHaveBeenCalled();
});

it("openInventoryUsage should callsetCurrentPage function", async () => {
  const controller = new ReservationsListPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(reservationsListDS, "reservationsListDS");
  ds.registerController(controller);
  app.registerDatasource(ds);

  app.state.selectedInvUseDSName = "invUseDS";

  const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");
  const mockFn = jest.fn();

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  const itemMock = {
    invusenum: "1234",
    description: "Item test",
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
  };

  app.setCurrentPage = mockFn;
  page.state.addmoreitems = true;

  controller.openInventoryUsage(itemMock);
  expect(setCurrentPageSpy.calledOnce).toBeTruthy();
});

it("expect loadDatasource functions to have been called", async () => {
  const controller = new ReservationsListPageController();
  const app = new Application();
  const page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});
  sinon.stub(invuseds, "isItemLoaded").returns(false);
  sinon.stub(invuseds, "get").returns(invuseListDS.member[0]);

  invuseds.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds.dataAdapter.totalCount = 1;

  const ds = newDatasource(reservationsListDS, "reservationsListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");

  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  app.device.isMaximoMobile = true;

  app.state.reservationLoaded = false;
  page.state.addmoreitems = true;
  await controller.loadDatasource(true);

  await controller.forceUpdateDatasource();

  app.state.reservationLoaded = true;
  page.state.addmoreitems = false;
  await controller.loadDatasource(false);

  await controller.getAllReservedItems();
  //expect(clearSelectionsSpy).toHaveBeenCalled();
  //expect(forceReloadSpy).toHaveBeenCalled();
});

it("loadDatasource with this.app.device.isMaximoMobile = true", async () => {
  const controller = new ReservationsListPageController();
  const app = new Application();
  const page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns(invuseListDS);
  sinon.stub(invuseds, "isItemLoaded").returns(false);
  sinon.stub(invuseds, "get").returns(invuseListDS.member[0]);

  invuseds.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds.dataAdapter.totalCount = 1;

  const invuseds_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  page.registerController(controller);
  app.registerDatasource(invuseds_local);

  sinon.stub(invuseds_local, "load").returns({});
  sinon.stub(invuseds_local, "forceReload").returns(invuseListDS);
  sinon.stub(invuseds_local, "isItemLoaded").returns(false);
  sinon.stub(invuseds_local, "get").returns(invuseListDS.member[0]);

  invuseds_local.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds_local.dataAdapter.totalCount = 1;

  const ds = newDatasource(reservationsListDS, "reservationsListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "getItems").returns(reservationsListDS.member);
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");

  app.device.isMaximoMobile = true;

  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();
  await controller.loadDatasource(false);

  const mockFn = jest.fn();
  app.setCurrentPage = mockFn;
  const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");

  page.state.addmoreitems = true;
  controller.goBack();
  expect(setCurrentPageSpy.calledOnce).toBeTruthy();

  page.state.addmoreitems = false;
  controller.goBack();
  expect(setCurrentPageSpy.calledTwice).toBeTruthy();

  page.state.addmoreitems = true;
  page.state.reservedItemsInvUsage = reservationsListDS.member;
  controller.onAfterLoadData(ds, reservationsListDS);
});
