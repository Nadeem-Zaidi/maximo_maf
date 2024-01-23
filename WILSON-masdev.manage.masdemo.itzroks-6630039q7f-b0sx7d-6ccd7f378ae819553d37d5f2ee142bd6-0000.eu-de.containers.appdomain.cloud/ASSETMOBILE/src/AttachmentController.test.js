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
import assetDetailitem from './test/asset-detail-json-data';
import attachmentlistitem from './test/attachment-json-data';
import sinon from 'sinon';

function newDatasource(data = assetDetailitem, name = "assetAttachmentResourceDs") {
    const da = new JSONDataAdapter({
      src: assetDetailitem,
      items: 'member'
    });
  
    const ds = new Datasource(da, {
      idAttribute: 'assetAttachmentResourceDs',
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
    
    const ds = newDatasource(assetDetailitem, "assetAttachmentResourceDs");
    const ds2 = newDatasource(undefined, "attachmentListDS");
    page.registerDatasource(ds);
    page.registerDatasource(ds2);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    let forceReloadStub = sinon.stub(ds, 'forceReload');
    await ds.load({noCache:true, itemUrl: assetDetailitem.member[0].href});
    await ds.forceReload();
    controller.pageInitialized(page, app);
    
    expect(loadstub.called).toBe(true);
    expect(loadstub.args.length).toBe(1);
    expect(forceReloadStub.called).toBe(true);
    expect(loadstub.args[0][0].noCache).toBe(true);
    expect(loadstub.args[0][0].itemUrl).toBe(assetDetailitem.member[0].href);

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
      attachmentAssetnum: '2000',
    };
    app.registerPage(page);
    app.registerController(controller);
    const selectedDatasource = newDatasource(attachmentlistitem, 'attachmentListDS', 'member');
    const ds = newDatasource(assetDetailitem, "assetAttachmentResourceDs");
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
  it("should forceReload method not called if no attachment updated.", async () => {
    global.open = jest.fn();  
    const controller = new AttachmentController();    
    const app = new Application();
    const page = new Page({name: "attachments"});
    app.registerController(controller);
    app.registerPage(page);
    
    const ds = newDatasource(assetDetailitem, "assetAttachmentResourceDs");
    const ds2 = newDatasource(attachmentlistitem, "attachmentListDS" , 'member');
    page.registerDatasource(ds);
    page.registerDatasource(ds2);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    let forceReloadStub = sinon.stub(ds, 'forceReload');
    await ds.load({noCache:true, itemUrl: assetDetailitem.member[0].href});
    page.params.itemhref = assetDetailitem.member[0].href;
    controller.pageResumed(page, app);
    expect(loadstub.called).toBe(true);
    loadstub.restore();
    forceReloadStub.restore();
  });
  
  it("should forceReload method called after attachment updated.", async () => {
    global.open = jest.fn();  
    const controller = new AttachmentController();    
    const app = new Application();
    const page = new Page({name: "attachments"});
    page.state = {
      selectedDS: 'selectedDatasource',
      attachmentAssetnum: '2000',
    };
    
    app.registerController(controller);
    app.registerPage(page);
    page.params.itemhref = assetDetailitem.member[0].href;
    const ds = newDatasource(assetDetailitem, "assetAttachmentResourceDs");
    const selectedDatasource = newDatasource(attachmentlistitem, "attachmentListDS" , 'member');
    
    ds.forceReload = jest.fn();
    selectedDatasource.forceReload = jest.fn();
    page.registerDatasource(ds);
    page.registerDatasource(selectedDatasource);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    await ds.load({noCache:true, itemUrl: assetDetailitem.member[0].href});
    let assetItem = assetDetailitem.member[0].href.split("/").pop();
    sessionStorage.setItem('updated_asset_attachments', JSON.stringify([assetItem]));
    page.state = {
      selectedDS: 'selectedDatasource',
      attachmentAssetnum: '5',
    };
    controller.pageResumed(page, app);
    expect(page.state.attachmentAssetnum).toBe("5");
    expect(loadstub.called).toBe(true);
    loadstub.restore();
  }); 
