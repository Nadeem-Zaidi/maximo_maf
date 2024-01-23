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

import DialogController from '../DialogController';
import {Application, Page} from '@maximo/maximo-js-api';
import sinon from 'sinon';

it('open dialog should call changeToggle depending of updateDialog state', async () => {
    const controller = new DialogController();
    const app = new Application();
    const page = new Page({name: 'execution_panel'});
    let pageSpy = sinon.spy(page, 'callController');

    app.registerPage(page);
    page.registerController(controller);
    app.registerController(controller);

    app.setCurrentPage = page;

    await app.initialize();

    page.state.updateDialog = false;
    controller.dialogInitialized(page);
    controller.dialogOpened();
    //updateDialog false and no tagGroupTogglesData defined should not call changeToggle
    expect(pageSpy.calledOnce).toBeFalsy();

    page.state.tagGroupTogglesData1 = [
        {label: 'To do', attribute: 'toDo', selected: false},
        {label: 'Done', attribute: 'done', selected: false},
        {label: 'Required', attribute: 'required', selected: false}
    ];
    //updateDialog false and tagGroupTogglesData defined should not call changeToggle
    expect(pageSpy.calledOnce).toBeFalsy();
    controller.dialogInitialized(page);
    controller.dialogOpened();

    page.state.updateDialog = true;
    controller.dialogInitialized(page);
    controller.dialogOpened();
    //updateDialog true and no tagGroupTogglesData defined should call changeToggle
    expect(pageSpy.getCall(0).args[0]).toBe('changeToggle');
    expect(pageSpy.getCall(0).args[1]).toBe(page.state.tagGroupTogglesData1);
});
