/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import InventoryUsageListPageController from "./InventoryUsageListPageController";
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
  const controller = new InventoryUsageListPageController();
  const page = new Page({
    name: "invUsageList",
    clearStack: false,
  });

  app.state.selectedInvUseDSName = "invUseDS";

  const invUsageDS = newDatasource(invuseListDS, "invUseDS");
  app.registerDatasource(invUsageDS);

  sinon.stub(invUsageDS, "load").returns(invuseListDS.member);
  sinon.stub(invUsageDS, "clearState");

  let appInitSpy = jest.spyOn(controller, "pageInitialized");

  app.registerPage(page);
  page.registerController(controller);

  const usagePage = new Page({
    name: "invUsage",
  });
  app.registerPage(usagePage);

  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  app.device.isMaximoMobile = false;
  controller.forceUpdateDatasource();
  app.device.isMaximoMobile = true;
  controller.forceUpdateDatasource();
  controller.gotoDetails(invuseListDS.member[0]);
  controller.goback();

  app.state.isBackFromInvUsePage = true;
  controller.setupPage();
});
