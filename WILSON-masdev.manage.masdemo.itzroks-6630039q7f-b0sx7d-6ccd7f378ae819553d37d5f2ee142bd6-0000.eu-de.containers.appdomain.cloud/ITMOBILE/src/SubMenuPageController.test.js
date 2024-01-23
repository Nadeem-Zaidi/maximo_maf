/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import SubMenuPageController from "./SubMenuPageController";
import {
  Application,
  Page
} from "@maximo/maximo-js-api";

it("submenu-data loads", async () => {
  let app = new Application();
  const subMenuPage = new Page({
    name: "subMenu",
    clearStack: false,
  });
  let subMenuPageController = new SubMenuPageController();
  subMenuPageController.pageResumed(subMenuPage, app);
});

it("subMenu show selected page", async () => {
  let controller = new SubMenuPageController();
  let reserveListController = new SubMenuPageController(); // just use same controller for .pageInitialized
  let app = new Application();

  const subMenuPage = new Page({
    name: "subMenu",
    clearStack: false,
  });

  const reserveListPage = new Page({
    name: "reservationsList",
    clearStack: false,
  });

  app.registerController(controller);
  app.registerController(reserveListController);

  subMenuPage.registerController(controller);
  reserveListPage.registerController(reserveListController);

  app.registerPage(subMenuPage);
  app.registerPage(reserveListPage);

  await app.initialize();
  expect(controller.page).toBeTruthy();
  controller.pageInitialized(subMenuPage, app);

  await controller.subMenuListGoto(reserveListPage.name);
  expect(reserveListController.page).toBeTruthy();
  reserveListController.pageInitialized(reserveListPage, app);

  await controller.subMenuListGoto("notexistpage");
});
