/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import React from 'react';

import {mount} from 'enzyme';

import {generate} from '../../../test/TestUtils';

import FormExecution from './FormExecution';
import {Datasource, JSONDataAdapter} from '@maximo/maximo-js-api';
import questionCounter from '../../../stores/questionCounter';

const getDatasource = async (amount = 10) => {
  let dataSource = new Datasource(
    new JSONDataAdapter({src: generate(amount)}),
    {
      pageSize: 20,
      selectionMode: 'multiple',
      preLoad: true,
      query: {select: 'itemnum'}
    }
  );
  await dataSource.load();
  return dataSource;
};

const mockedAppResolver = () => {
  return {
    client: {userInfo: {}},
    getLocalizedLabel: () => {}
  };
};

const mockCallBackOnLoad = jest.fn();

const setup = async ({
  datasource,
  appResolver = mockedAppResolver,
  onLoad,
  onChange
} = {}) => {
  let testDS = datasource;
  if (!testDS) {
    testDS = await getDatasource();
  }

  if (appResolver) {
    testDS.options.appResolver = appResolver;
  }

  const wrapper = mount(
    <FormExecution
      id={`formExec1`}
      datasource={testDS}
      onChange={onChange}
      onLoad={mockCallBackOnLoad}
    />
  );
  return wrapper;
};

describe('FormExecution tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', async () => {
    let wrapper = await setup({onLoad: mockCallBackOnLoad});
    const container = wrapper.find('FormExecution');
    expect(container.length).toBe(1);

    let instance = container.instance();
    await instance.componentDidUpdate();
    expect(mockCallBackOnLoad.mock.calls).toHaveLength(1);
  });

  it('should render InspectionResult', async () => {
    const mockedDS = await getDatasource(3);
    let wrapper = await setup({datasource: mockedDS});
    wrapper.setProps({prop1: 1});
    wrapper.update();
    const container = wrapper.find('InspectionResult');
    expect(container.length).toBe(3);
  });

  it('should save when data gets updated', async () => {
    const addMockCallBack = jest.fn();
    const updateMockCallBack= jest.fn();
    const mockedDS = await getDatasource(3);
    mockedDS.add = addMockCallBack;
    mockedDS.update = updateMockCallBack;
    let wrapper = await setup({datasource: mockedDS});
    const container = wrapper.find('FormExecution');
    container.instance().state.inspfieldresultDS =   mockedDS;
    container.instance().updateDS({});
    await new Promise(r => setTimeout(r, 2000));
    expect(addMockCallBack.mock.calls).toHaveLength(1);
    expect(updateMockCallBack.mock.calls).toHaveLength(0);
  });

  it('should save when updateDS invoked', async () => {
    const mockCallBack = jest.fn();
    const mockedDS = await getDatasource(0);
    mockedDS.add = mockCallBack;
    let wrapper = await setup({datasource: mockedDS});
    wrapper.setProps({prop1: 1});
    wrapper.update();
    const container = wrapper.find('FormExecution');
    container.instance().state.inspfieldresultDS  = mockedDS;
    container.instance().updateDS({});
    await new Promise(r => setTimeout(r, 2000));
    expect(mockCallBack.mock.calls).toHaveLength(1);
  });

  it('should catch error for not sending executor', async () => {
    const ds = await getDatasource();
    expect(() => {
      const wrapper = mount(
        <FormExecution id={`formExec1`} datasource={ds} executor={null} />
      );
      wrapper.setProps({prop1: 1});
      wrapper.update();
    }).toThrowError();
  });

  it('should register counter callback method', async () => {
    const callbackRegisterSpy = jest.spyOn(questionCounter, 'callbackRegister');
    await setup();
    expect(callbackRegisterSpy).toHaveBeenCalled();
  });

  it('should display loading while updating', async () => {
    const mockedDS = await getDatasource(1);
    let wrapper = await setup({datasource: mockedDS});
    let loading = wrapper.find('InlineLoading');
    expect(loading.length).toBe(0);
    mockedDS.state.loading = true;
    wrapper.update();
    loading = wrapper.find('InlineLoading');
    expect(loading.length).toBe(1);
  });


  it('updateDS', async () => {

    let response =  {
      inspformnum: '1',
      revision: '1',
      resultnum: '1',
      orgid: 'ibm',
      siteid: 'test',
      inspfieldnum: '1',
      inspquestionnum: '1',
      txtresponse: 'test01',
      numresponse: null,
      enteredby:  'test',
      entereddate: new Date(),
      inspfieldresultselection: [],
      _rowstamp: 123
    };

    let wrapper = await setup();
    let formExecution = wrapper.find('FormExecution').instance();
    formExecution.getApp(formExecution.props.datasource).device ={isMobile :true};
    formExecution.componentDidUpdate();

    formExecution.state.inspfieldresultDS = {
      items: [{
        resultnum: 12
      }],
    }
    formExecution.app = {
      state: {
        loadingForm: false
      }
    }

    formExecution.createInspfieldresultDS();

    let tempResult;

    formExecution.state.inspfieldresultDS  =  {
      update: (item)=> {tempResult= item},
      add: (item)=> {tempResult= item}
    };
 
    await formExecution.updateDS(response);
    expect(tempResult._rowstamp).toBe(undefined);
    expect(tempResult.txtresponse).toBe(tempResult.txtresponse);

     response =  {
      href: 'http://test.ibm',
      inspformnum: '1',
      revision: '1',
      resultnum: '1',
      orgid: 'ibm',
      siteid: 'test',
      inspfieldnum: '1',
      inspquestionnum: '1',
      txtresponse: 'recordupdated',
      numresponse: null,
      enteredby:  'test',
      entereddate: new Date(),
      inspfieldresultselection: []
    };
 
   await formExecution.updateDS(response);
   expect(tempResult.txtresponse).toBe(tempResult.txtresponse);

   response =  {
    href: 'temp',
    inspformnum: '1',
    revision: '1',
    resultnum: '1',
    orgid: 'ibm',
    siteid: 'test',
    inspfieldnum: '1',
    inspquestionnum: '1',
    txtresponse: null,
    numresponse: null,
    enteredby:  'test',
    entereddate: new Date(),
    inspfieldresultselection: [{txtresponse:'op1'}]
  };
  await formExecution.updateDS(response);
  expect(tempResult.inspfieldresultselection[0].txtresponse).toBe(response.inspfieldresultselection[0].txtresponse);

});



it('updateDSWeb ', async () => {

    let response =  {
      inspformnum: '1',
      revision: '1',
      resultnum: '1',
      orgid: 'ibm',
      siteid: 'test',
      inspfieldnum: '1',
      inspquestionnum: '1',
      txtresponse: 'test01',
      numresponse: null,
      enteredby:  'test',
      entereddate: new Date(),
      inspfieldresultselection: [],
      _rowstamp: 123
    };

    let wrapper = await setup();
    let formExecution = wrapper.find('FormExecution').instance();

    formExecution.componentDidUpdate();
    let tempResult;

    
    formExecution.state.inspfieldresultDS = {
      update: (item)=> {tempResult= item},
      add: (item)=> {tempResult= item},
        item: {},
        items:[{
          inspformnum: '1',
          revision: '1',
          resultnum: '1',
          orgid: 'ibm',
          siteid: 'test',
          inspfieldnum: '1',
          inspquestionnum: '1',
          txtresponse: 'test01',
          numresponse: null,
          enteredby:  'test',
          entereddate: new Date(),
          inspfieldresultselection: []
        }]
    };
    
     await formExecution.updateDS(response);
     expect(tempResult.txtresponse).toBe(tempResult.txtresponse);

    response =  {
      href: 'temp',
      inspformnum: '1',
      revision: '1',
      resultnum: '1',
      orgid: 'ibm',
      siteid: 'test',
      inspfieldnum: '1',
      inspquestionnum: '1',
      txtresponse: 'recordupdated',
      numresponse: null,
      enteredby:  'test',
      entereddate: new Date(),
      inspfieldresultselection: []
    };

   await formExecution.updateDS(response);
   expect(tempResult.txtresponse).toBe(tempResult.txtresponse);

   response =  {
    href: 'temp',
    inspformnum: '1',
    revision: '1',
    resultnum: '1',
    orgid: 'ibm',
    siteid: 'test',
    inspfieldnum: '1',
    inspquestionnum: '1',
    txtresponse: null,
    numresponse: null,
    enteredby:  'test',
    entereddate: new Date(),
    inspfieldresultselection: [{txtresponse:'op1'}]
  };
    formExecution.updateDS(response);
    expect(tempResult.inspfieldresultselection[0].txtresponse).toBe(response.inspfieldresultselection[0].txtresponse);


  });
});
