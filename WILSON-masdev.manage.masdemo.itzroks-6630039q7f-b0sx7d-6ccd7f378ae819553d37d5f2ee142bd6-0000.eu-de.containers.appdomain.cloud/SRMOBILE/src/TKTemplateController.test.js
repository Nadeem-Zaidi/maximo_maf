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

import TKTemplateController from "./TKTemplateController";
import tktemp from './test/test-sr-tktemp-data.js';
//import sinon from 'sinon';
import {
  Datasource,
  Application,
  Page,
  JSONDataAdapter
} from '@maximo/maximo-js-api';
//import { truncate } from "fs";




function newDatasource(data = tktemp, name = 'checktktds') {
  const da = new JSONDataAdapter({
      src: data,
      items: 'member',
      schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
      idAttribute: "templateid",
      name: name
  });

  return ds;
}
  it("TKTemplateController", async () => {
    const controller = new TKTemplateController();
    const app = new Application();
    const page = new Page({ name: 'tktemp' });
    app.registerController(controller);
    app.registerPage(page);
    const ds = newDatasource(tktemp, 'checktktds');	
	  app.registerDatasource(ds);
    await app.initialize();
  });

  it("goback", async () => {
    const controller = new TKTemplateController();
    const app = new Application();
    const page = new Page({ name: 'tktemp' });
    app.registerController(controller);
    app.registerPage(page);
    const ds = newDatasource(tktemp, 'checktktds');	
	  app.registerDatasource(ds);
    
    await app.initialize();

    app.state.pagelist = [];
    app.state.isback = false;
    app.state.isUpdateFromBack = false;
    app.state.selectedTopCategory="";
    app.state.selectedSubCategory="";
    app.state.subcategory="";
    app.state.currSubCategoryID="";
    app.state.currSubCategoryDesc="";

    await controller.pageResumed(page, app);
  
    app.state.pagelist.push({
      pagename: 'newRequest',
      id: ''
    });
    controller.goBack();
    expect(app.state.isback).toBeTruthy();

    await controller.pageResumed(page, app);

    app.state.pagelist.push({
      pagename: 'SubCategory',
      id: '1143',
      description: 'HR',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });

    controller.goBack();
  });


  it("gotoDetails", async () => {
    const controller = new TKTemplateController();
    const app = new Application();
    const page = new Page('tktemp');
    app.registerController(controller);
    app.registerPage(page);
    const ds = newDatasource(tktemp, 'checktktds');	
	  app.registerDatasource(ds);
    await app.initialize();

    app.state.pagelist = [];

    await ds.load();    
    app.datasources.checktktds.toggleSelected(0);
    var viewindex = app.datasources.checktktds.getSelectedItems()[0].description;
    console.log("id=", viewindex);
    page.params.lastcategorydesc='Terminate Employee';
    controller.gotoDetails();
    controller.gotoDetailsFromSelectedType();

  });
  
