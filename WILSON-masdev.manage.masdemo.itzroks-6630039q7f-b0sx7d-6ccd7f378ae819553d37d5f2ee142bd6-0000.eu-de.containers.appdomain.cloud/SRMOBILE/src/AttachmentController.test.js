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

import AttachmentController from './AttachmentController';
import { Application, Page, JSONDataAdapter, Datasource } from '@maximo/maximo-js-api';
import servicerequestitem from './test/sr-detail-json-data.js';
import attachmentlistitem from './test/test-attachment-data.js';
import sinon from 'sinon';

function newDatasource(data = servicerequestitem, name = "serviceRequestAttachmentResource") {
    const da = new JSONDataAdapter({
      src: servicerequestitem,
      items: 'member'
    });
  
    const ds = new Datasource(da, {
      idAttribute: 'serviceRequestAttachmentResource',
      name: name,
    });
  
    return ds;
  }

it("should load and forceReload method called", async () => {
    global.open = jest.fn();  
    const controller = new AttachmentController();    
    const app = new Application();
    app.state.canLoad = {
      doclinks: false
    }
    const page = new Page({name: "attachments"});
    app.registerController(controller);
    app.registerPage(page);
    
    const ds = newDatasource(servicerequestitem, "serviceRequestAttachmentResource");
    const ds2 = newDatasource(undefined, "attachmentListDS");
    page.registerDatasource(ds);
    page.registerDatasource(ds2);
        
    await app.initialize();
    let loadstub = sinon.stub(ds, 'load');
    let forceReloadStub = sinon.stub(ds, 'forceReload');
    await ds.load({noCache:true, itemUrl: servicerequestitem.member[1].href});
    await ds.forceReload();
    controller.pageInitialized(page, app);
    
    expect(loadstub.called).toBe(true);
    expect(loadstub.args.length).toBe(1);
    expect(forceReloadStub.called).toBe(true);
    expect(loadstub.args[0][0].noCache).toBe(true);
    expect(loadstub.args[0][0].itemUrl).toBe(servicerequestitem.member[1].href);

    loadstub.restore();
    forceReloadStub.restore();
  });

  it('onAfterLoadData', async () => {
    const controller = new AttachmentController();
    const app = new Application();

    const srDetailsPage = new Page({
      name: 'srDetails',
    });
    srDetailsPage.state = {
      doclinksCount: 0
    };
    srDetailsPage.params = {
      doclinksCountOverridden: true
    };
    app.registerPage(srDetailsPage);

    const page = new Page({
      name: 'attachments',
    });
    page.state = {
      selectedDS: 'selectedDatasource',
      attachmentTicketid: '2000',
    };
    app.registerPage(page);
    app.registerController(controller);    
    const selectedDatasource = newDatasource(attachmentlistitem, 'attachmentListDS', 'member');
    const srItem = newDatasource(servicerequestitem, "serviceRequestAttachmentResource");
    page.registerDatasource(selectedDatasource);
    page.registerDatasource(srItem);
    sinon.stub(srItem, 'load');
    sinon.stub(selectedDatasource, 'load');
    app.state.doclinksCountData = {};
    await app.initialize();
    await selectedDatasource.load();
    await controller.onAfterLoadData(selectedDatasource, selectedDatasource.items);

    if (app.state.doclinksCountData['2000']){
      expect(app.state.doclinksCountData['2000']).toBe(3);
    }
  });
