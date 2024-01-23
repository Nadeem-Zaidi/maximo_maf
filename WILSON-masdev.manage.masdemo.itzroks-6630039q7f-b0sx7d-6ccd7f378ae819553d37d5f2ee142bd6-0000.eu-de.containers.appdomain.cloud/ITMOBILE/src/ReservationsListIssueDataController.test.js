/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import ReservationsListIssueDataController from './ReservationsListIssueDataController';
import reservationsData from './test/test-reservations-data';
import {Application, Datasource, JSONDataAdapter} from '@maximo/maximo-js-api';

function newDatasource(data = reservationsData, name = 'reservationsListDS') {
    const da = new JSONDataAdapter({
        src: data,
        items: 'member',
        schema: 'responseInfo.schema',
    });
  
    const ds = new Datasource(da, {
        idAttribute: "invreserveid",
        name: name
    });
  
    return ds;
}


it('Datasource initialized', async () => {
    const controller = new ReservationsListIssueDataController();
    const app = new Application();
    const ds = newDatasource(reservationsData, 'reservationsListDS');
    ds.registerController(controller);
    app.registerDatasource(ds);
    await app.initialize();
    await ds.load();

    expect(controller.datasource).toBe(ds);
    expect(controller.app).toBe(app);
});

it('Load data and execute _computeDueDate functions', async () => {
    const controller = new ReservationsListIssueDataController();
    const app = new Application();
    const reservationsListDS = newDatasource(reservationsData, 'reservationsListDS');
    reservationsListDS.registerController(controller);
    app.registerDatasource(reservationsListDS);
   
    await app.initialize();
    let items = await reservationsListDS.load();
    expect(items[0].itemnum).toBe('0-0031');

    let computedDate = controller._computeDueDate(items[0]);
    expect(computedDate).toBeTruthy();

    computedDate = controller._computeDueDate(items[1]);
    expect(computedDate).toBe('');
  });