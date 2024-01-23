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

import AttachmentController from './AttachmentController';
import { Application, Page, JSONDataAdapter, Datasource } from '@maximo/maximo-js-api';
import workorderitem from './test/wo-detail-json-data.js';
import attachmentlistitem from './test/test-attachment-data.js';
import sinon from 'sinon';

function newDatasource(data = workorderitem, name = "workOrderAttachmentResource") {
    const da = new JSONDataAdapter({
      src: workorderitem,
      items: 'member'
    });
  
    const ds = new Datasource(da, {
      idAttribute: 'workOrderAttachmentResource',
      name: name,
    });
  
    return ds;
  }

it("should load and forceReload method called", async () => {
    global.open = jest.fn();  
    const controller = new AttachmentController();    
    const app = new Application();
    const page = new Page({name: "attachments"});
    app.registerController(controller);
    app.registerPage(page);
    
    const ds = newDatasource(workorderitem, "workOrderAttachmentResource");
    const ds2 = newDatasource(undefined, "attachmentListDS");
    page.registerDatasource(ds);
    page.registerDatasource(ds2);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    let forceReloadStub = sinon.stub(ds, 'forceReload');
    await ds.load({noCache:true, itemUrl: workorderitem.member[1].href});
    await ds.forceReload();
    controller.pageInitialized(page, app);
    
    expect(loadstub.called).toBe(true);
    expect(loadstub.args.length).toBe(1);
    expect(forceReloadStub.called).toBe(true);
    expect(loadstub.args[0][0].noCache).toBe(true);
    expect(loadstub.args[0][0].itemUrl).toBe(workorderitem.member[1].href);

    loadstub.restore();
    forceReloadStub.restore();
  });

  it('onAfterLoadData', async () => {
    const controller = new AttachmentController();
    const app = new Application();

    const page = new Page({
      name: 'attachments',
    });
    page.state = {
      selectedDS: 'selectedDatasource',
      attachmentWonum: '2000',
    };
    app.registerPage(page);
    app.registerController(controller);
    const selectedDatasource = newDatasource(attachmentlistitem, 'attachmentListDS', 'member');
    const ds = newDatasource(workorderitem, "workOrderAttachmentResource");
    page.registerDatasource(ds);
    app.registerDatasource(selectedDatasource);
    app.state.doclinksCountData = {};
    //await selectedDatasource.load();
    await app.initialize();
    await controller.onAfterLoadData(selectedDatasource, selectedDatasource.items);
    window.setTimeout(() => {
      expect(app.state.doclinksCountData["2000"]).toBe(4);
    },100);
  });
  it("should forceSync method not called if no attachment updated.", async () => {
    global.open = jest.fn();  
    const controller = new AttachmentController();    
    const app = new Application();
    const page = new Page({name: "attachments"});
    app.registerController(controller);
    app.registerPage(page);
    
    const ds = newDatasource(workorderitem, "workOrderAttachmentResource");
    const ds2 = newDatasource(attachmentlistitem, "attachmentListDS" , 'member');
    page.registerDatasource(ds);
    page.registerDatasource(ds2);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    let forceSyncStub = sinon.stub(ds, 'forceSync');
    await ds.load({noCache:true, itemUrl: workorderitem.member[1].href});
    page.params.itemhref = workorderitem.member[1].href;
    controller.pageResumed(page, app);
    expect(loadstub.called).toBe(true);
    loadstub.restore();
    forceSyncStub.restore();
  });
  
  it("should forceSync method called after attachment updated.", async () => {
    global.open = jest.fn();  
    const controller = new AttachmentController();    
    const app = new Application();
    const page = new Page({name: "attachments"});
    page.state = {
      selectedDS: 'selectedDatasource',
      attachmentWonum: '2000',
    };
    
    app.registerController(controller);
    app.registerPage(page);
    page.params.itemhref = workorderitem.member[1].href;
    const ds = newDatasource(workorderitem, "workOrderAttachmentResource");
    const selectedDatasource = newDatasource(attachmentlistitem, "attachmentListDS" , 'member');
    
    ds.forceSync = jest.fn();
    selectedDatasource.forceSync = jest.fn();
    page.registerDatasource(ds);
    page.registerDatasource(selectedDatasource);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    await ds.load({noCache:true, itemUrl: workorderitem.member[1].href});
    let woItem = workorderitem.member[1].href.split("/").pop();
    sessionStorage.setItem('updated_workorder_attachments', JSON.stringify([woItem]));
    page.state = {
      selectedDS: 'selectedDatasource',
      attachmentWonum: '5',
    };
    controller.pageResumed(page, app);
    expect(page.state.attachmentWonum).toBe("5");
    expect(loadstub.called).toBe(true);
    loadstub.restore();
  }); 
