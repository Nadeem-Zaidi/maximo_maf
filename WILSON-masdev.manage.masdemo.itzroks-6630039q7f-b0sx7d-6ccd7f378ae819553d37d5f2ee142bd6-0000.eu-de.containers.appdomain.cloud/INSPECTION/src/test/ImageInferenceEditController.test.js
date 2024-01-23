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

import ImageInferenceEditController from '../ImageInferenceEditController';
import inspectionsInprogData from './data/inspections-data-inprog.js';
import {Application,Page,Datasource, JSONDataAdapter, Dialog} from '@maximo/maximo-js-api';

function newDatasource(data = inspectionsInprogData, name = 'inspfieldresult') {
  const da = new JSONDataAdapter({
    src: inspectionsInprogData,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'inspectionresultid',
    name: name
  });

  return ds;
}

it('open dialog should call changeToggle depending of updateDialog state', async () => {
  const controller = new ImageInferenceEditController();
  const app = new Application();
  const page = new Page({name: 'execution_panel'});
  controller.dialog = {closeDialog: ()=>{}};
  app.registerPage(page);
  page.registerController(controller);
  app.registerController(controller);

  app.setCurrentPage(page);

  await app.initialize();

  page.state.updateDialog = false;
  controller.dialogInitialized(page);
});

it('open dialog should call changeToggle depending of updateDialog state', async () => {
  const controller = new ImageInferenceEditController();
  const app = new Application();
  const page = new Page({name: 'execution_panel'});
  const dialog = new Dialog({name: 'test', configuration: {id: 'abc'}});
  const inspfieldresult = newDatasource();
 
  const mockCallBack = jest.fn();
  inspfieldresult.save = mockCallBack;
  app.registerDatasource(inspfieldresult);
  page.registerDialog(dialog)
  app.registerPage(page);
  page.registerController(controller);
  app.registerController(controller);
  dialog.registerController(controller);


  await app.initialize();
  app.setCurrentPage(page);

  page.state.updateDialog = false;
  controller.dialogInitialized(dialog);

  controller.saveEdit();
  expect(mockCallBack).toHaveBeenCalled();
});
it('test onClose', async () => {
  const controller = new ImageInferenceEditController();
  const inspfieldresult = {
    save : ()=>{},
    forceReload : ()=>{},
    state: {
      itemsChanged: false
    },
    item:{
      imageinference : 'test'
    }
  };
  const app = {
    currentPage :{
      state:{
        saveInProgress: false
      }
    },
    findDatasource: ()=>inspfieldresult,
    userInteractionManager: { }
  };
  controller.dialog = {closeDialog: ()=>{}};
  const mockCallBack = jest.fn();
  const mockShowUnsavedChanges = jest.fn().mockImplementation( () => {
    controller.app.currentPage.customSaveTransition();
  });


  inspfieldresult.save = mockCallBack;
  app.userInteractionManager.showUnsavedChanges =mockShowUnsavedChanges;
  controller.app = app;
  controller.dialogOpened();
  await controller.onClose();
  expect(mockShowUnsavedChanges).toHaveBeenCalledTimes(0);
  inspfieldresult.item.imageinference='test2';
  controller.onClose(); 
  expect(mockShowUnsavedChanges).toHaveBeenCalledTimes(1);
});