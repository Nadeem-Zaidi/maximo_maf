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


import InspFormLookupController from '../InspFormLookupController';
import {
  Application,
  JSONDataAdapter,
  Datasource,
  Page,
  Dialog
} from '@maximo/maximo-js-api';

const formData = {
  form: [
    {
      inspectionformid: 85,
      name: 'FormTest1',
      inspformnum: '1002',
      status: 'ACTIVE'
    },
    {
      inspectionformid: 12,
      name: 'Bridge Inspection Report',
      inspformnum: '1011',
      status: 'ACTIVE'
    }
  ]
};

const recommended = {
  formRecommended: [
    {
    inspformnum: '1002',
    objectname: 'ASSET',
    objectid: 'ASSET1',
    name: 'FormName'
   }
  ]
};

function newLookupDatasource(
  data,
  name = 'formLookupDS',
  idAttribute = 'inspformnum'
) {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member'
  });
  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name
  });
  return ds;
}

function newDatasource(data, name = 'inspRecommendedFormLookupDS') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'inspectionformid',
    name: name
  });

  return ds;
}


describe('InspFormLookupController', () => {

  it('clearPreviousSearch', async () => {
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page();

    page.registerController(controller);
    app.registerController(controller);
    app.registerPage(page);
    app.setCurrentPage(page);

    const inspFormLookupDS = newLookupDatasource(formData, 'inspFormLookupDS', 'inspformnum');
    page.registerDatasource(inspFormLookupDS);
  
    const mockFn = jest.fn();
    controller.clearSearch = mockFn;

    const inspRecommendedFormLookupDS = newDatasource(recommended, 'inspRecommendedFormLookupDS');
    app.registerDatasource(inspRecommendedFormLookupDS);
    await inspRecommendedFormLookupDS.load();

    controller.dialogInitialized(page);

    controller.dialogOpened();

    await controller.clearPreviousSearch();
    //expect(mockFn).toHaveBeenCalled();
  }); 

  it('loadFormRecommended for an Asset', async () => {
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page({name: 'page'});
    app.registerController(controller);

    await app.initialize();
    app.setCurrentPage(page);

    const recommendedFormAsset = [
      {
      inspectionformid: 85,
      name: 'FormTest1',
      inspformnum: '1002',
      objectname: 'ASSET',
      objectid: 'ASSET1',
      status: 'ACTIVE'
     }
    ];
    const formRecommendedDs = newDatasource(recommendedFormAsset);
    formRecommendedDs.registerController(controller);
    app.registerDatasource(formRecommendedDs);
   
    app.registerPage(page);
    app.setCurrentPage(page);

    await app.initialize();
    controller.dialogInitialized(page, app);
    await formRecommendedDs.load();

    const asset = {
      assetnum: 'ASSET1',
      description: 'Asset1 Desc'
    }; 

    const locations = {
      location: '',
      description: ''
    };

    page.state.asset = asset;
    page.state.locations = locations;
    page.state.showRecommended = false;

    await controller.loadFormRecommended();
    expect(page.state.showRecommended).toBe(true);
  });

  it('loadFormRecommended for a Location', async () => {
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page({name: 'page'});
    app.registerController(controller);

    await app.initialize();
    app.setCurrentPage(page);

    const recommendedFormLocation = [
      {
      inspectionformid: 85,
      name: 'FormTest1',
      inspformnum: '1002',
      objectname: 'LOCATION',
      objectid: 'LOC123',
      status: 'ACTIVE'
     }
    ];
    
    const formRecommendedDs = newDatasource(recommendedFormLocation);
    formRecommendedDs.registerController(controller);
    app.registerDatasource(formRecommendedDs);
   
    app.registerPage(page);
    app.setCurrentPage(page);

    await app.initialize();
    controller.dialogInitialized(page, app);
    await formRecommendedDs.load();


    const asset = {
      assetnum: '',
      description: ''
    }; 

    const locations = {
      location: 'LOC123',
      description: 'LOC123 Description'
    }; 

    page.state.asset = asset;
    page.state.locations = locations;
    page.state.showRecommended = false;
    
    await controller.loadFormRecommended();
    expect(page.state.showRecommended).toBe(true);
  });

  it('selectFormItem', async () => {
      
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page();

    page.registerController(controller);
    app.registerController(controller);
    app.registerPage(page);
    app.setCurrentPage(page);

    const inspRecommendedFormLookupDS = newDatasource(recommended, 'inspRecommendedFormLookupDS');
    app.registerDatasource(inspRecommendedFormLookupDS);
    await inspRecommendedFormLookupDS.load();

    await app.initialize();

    const slidingFormsLookup = new Dialog({
      name: "slidingFormsLookup",
    });
    page.registerDialog(slidingFormsLookup);

    slidingFormsLookup.closeDialog = jest.fn();

    const formItem = {
      name: 'FormTest1',
      inspformnum: '1002'
    }; 

    page.state.inspForm = '';
    page.state.formSelection = '';
    app.setCurrentPage(page);

    controller.dialogInitialized(page);
    controller.selectFormItem(formItem);

    expect(page.state.formSelection).toEqual('FormTest1');
  });

  it('loadFormInfo', async () => {
    
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page();

    page.registerController(controller);
    app.registerPage(page);
    app.setCurrentPage(page);
  
    const inspFormLookupDS = newLookupDatasource(formData, 'inspFormLookupDS', 'inspformnum');
    inspFormLookupDS.searchQBE=()=>Promise.resolve(formData.form);
    app.registerDatasource(inspFormLookupDS);
    await inspFormLookupDS.load();

    const inspRecommendedFormLookupDS = newDatasource(recommended, 'inspRecommendedFormLookupDS', 'inspformnum');
    app.registerDatasource(inspRecommendedFormLookupDS);
    await inspRecommendedFormLookupDS.load();
    
    await app.initialize();

    const slidingFormsLookup = new Dialog({
      name: "slidingFormsLookup",
    });
    page.registerDialog(slidingFormsLookup);

    slidingFormsLookup.closeDialog = jest.fn();

    page.state.inspForm = '';
    page.state.formSelection = '';
    app.setCurrentPage(page);

    controller.dialogInitialized(page, app);

    await controller.loadFormInfo('1002');

    expect(page.state.formSelection).toEqual('FormTest1');

  });

  it('loadFormInfo - no data returned from datasource', async () => {
    
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page();

    page.registerController(controller);
    app.registerPage(page);
    app.setCurrentPage(page);
  
    const data = {
      form: [{
          inspectionformid: 85,
          name: 'FormTest1',
          inspformnum: '1002'
      }],
      searchQBE : () =>{},
      clearSearch : () =>{}
    };

    const inspFormLookupDS = newLookupDatasource(data, 'inspFormLookupDS', 'inspformnum');
    app.registerDatasource(inspFormLookupDS);
    await inspFormLookupDS.load();

    const inspRecommendedFormLookupDS = newDatasource(recommended, 'inspRecommendedFormLookupDS');
    app.registerDatasource(inspRecommendedFormLookupDS);
    await inspRecommendedFormLookupDS.load();
    
    await app.initialize();

    const slidingFormsLookup = new Dialog({
      name: "slidingFormsLookup",
    });
    page.registerDialog(slidingFormsLookup);

    slidingFormsLookup.closeDialog = jest.fn();

    page.state.inspForm = '';
    page.state.formSelection = '';
    app.setCurrentPage(page);

    controller.dialogInitialized(page, app);

    await controller.loadFormInfo('1234');

    expect(page.state.formSelection).toEqual('');

  });


  it('selectFormItemRecommended', async () => {
    
    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page();

    page.registerController(controller);
    app.registerController(controller);
    app.registerPage(page);
    app.setCurrentPage(page);

    const mockFn = jest.fn();
    controller.loadFormInfo = mockFn;
    await app.initialize();

    const item = {
      name: 'FormTest1',
      inspformnum: '1002'
    }; 

    controller.selectFormItemRecommended(item);

    expect(mockFn).toHaveBeenCalled();

  });

  it('clearSearch function', async () => {

    const controller = new InspFormLookupController();
    const app = new Application();
    const page = new Page();

    page.registerController(controller);
    app.registerController(controller);
    app.registerPage(page);
    app.setCurrentPage(page);

    const data = {
      item: [{
        name: 'ABC',
        id: '001'
      }], 
      lastQuery : {
        qbe: '{}'
      }, 
      clearQBE : () =>{},
      searchQBE : () =>{}
    };
    
    await controller.clearSearch(data);


  });
  
  })



