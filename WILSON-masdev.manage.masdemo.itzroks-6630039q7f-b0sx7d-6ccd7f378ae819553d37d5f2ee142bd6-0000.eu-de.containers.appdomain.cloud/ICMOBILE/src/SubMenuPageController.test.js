/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import SubMenuPageController from './SubMenuPageController';
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource
} from '@maximo/maximo-js-api';

function newDatasource(data ='', name = 'subMenuListDS') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
      idAttribute: 'label',
      name: name
  });

  return ds;
}

it('submenu-data loads', async () => {
  let app = new Application();
  const subMenuPage = new Page({
    name: 'subMenu',
    clearStack: false
  });
  let subMenuPageController = new SubMenuPageController(); 
  const subMenuListDS = newDatasource({items:[]}, 'subMenuListDS');
  subMenuPage.registerDatasource(subMenuListDS);
  const subMenuListDS2 = newDatasource({items:[]}, 'subMenuListDS2');
  subMenuPage.registerDatasource(subMenuListDS2);
  subMenuPageController.pageResumed(subMenuPage, app);
});

it('subMenu show selected page', async () => {
  let controller = new SubMenuPageController();
  let cbController = new SubMenuPageController(); // just use same controller for .pageInitialized
  let ahController = new SubMenuPageController();
  let app = new Application();

  const subMenuPage = new Page({
    name: 'subMenu',
    clearStack: false
  });

  const countBookPage = new Page({
    name: 'countBook',
    clearStack: false
  });

  const adHocPage = new Page({
    name: 'adHoc',
    clearStack: false
  });

  app.registerController(controller);
  app.registerController(cbController);
  app.registerController(ahController);
  
  subMenuPage.registerController(controller);
  countBookPage.registerController(cbController);
  adHocPage.registerController(ahController);

  app.registerPage(subMenuPage);
  app.registerPage(countBookPage);
  app.registerPage(adHocPage);
  
  await app.initialize();
  expect(controller.page).toBeTruthy();
  controller.pageInitialized(subMenuPage, app);
  
  await controller.subMenuListGoto({ page: countBookPage.name });
  expect(cbController.page).toBeTruthy();
  cbController.pageInitialized(countBookPage, app);
  
  await controller.subMenuListGoto({ page: adHocPage.name });
  expect(ahController.page).toBeTruthy();
  ahController.pageInitialized(adHocPage, app);
  
  await controller.subMenuListGoto({ page: "notexistpage" });
});
