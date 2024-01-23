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

import 'regenerator-runtime/runtime';
import { wait } from '@maximo/maximo-js-api';
import ExecutionFormPageController from '../ExecutionFormPageController';
import refStore from '../stores/refStore';
import AppController from '../AppController';

import {
  JSONDataAdapter,
  Datasource,
  Application,
  AppSwitcher,
  MaximoAppSwitcher,
  Page,
  log,
  Device
} from '@maximo/maximo-js-api';

import sinon from 'sinon';
import inspectionsCompletedData from './data/inspections-data-completed';
import inspectionsInProgData from './data/inspections-data-inprog';
import inspectionsPendData from './data/inspections-data-pending';
import histResults from './data/hist-results-data';

import {
  inspFormInstructions,
  formInfo,
  inspFormQuestionInfo
} from './data/instructions-data';
import statusitem from './data/statuses-json-data.js';
import domainitem from './data/domain-json-data.js';
import InspectionsList from '../components/common/InspectionsList';

function newDatasource(
  data = inspectionsCompletedData,
  name = 'testds',
  depends
) {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'inspectionresultid',
    name: name,
    query: {
      dependsOn: depends
    }
  });

  return ds;
}

function newStatusDatasource(data = statusitem, name = 'dssynonymdomain') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name
  });
  return ds;
}

it('updateDialog should change updateDialog state to true', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  controller.updateDialog();

  expect(page.state.updateDialog).toBeTruthy();
});

it('request permission when clicking VoiceInspectionButton', async () => {
  const controller = new ExecutionFormPageController();
  let mockSetCurrentPage = jest.fn();
  let mockToast = jest.fn();
  const app = {
    setCurrentPage: mockSetCurrentPage,
    toast: mockToast
  };
  controller.app = app;

  const requestPermissions = jest.fn().mockImplementationOnce((list, scb, _) => {
    let event = { denied: [] }
    scb(event);
  }).mockImplementationOnce((list, _, ecb) => {
    ecb();
  });
  controller._getPermissions = jest.fn().mockImplementation(() => {
    return {
      requestPermissions: requestPermissions,
      CAMERA: 'CAMERA',
      RECORD_AUDIO: 'RECORD_AUDIO',
    };
  });
  const params = { test };
  controller.doVoiceInspection(params);
  expect(mockSetCurrentPage).toHaveBeenCalledWith({
    name: 'voice_inspection',
    params: params
  });
  controller.doVoiceInspection();
  expect(mockToast).toHaveBeenCalledWith('Request microphone permission met error.');
});

it('filterData should always return true for respecting the conditions', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  //for root level (inspectionresult) should always return true
  expect(controller.filterData({})({ inspectionresultid: 1 })).toBeTruthy();

  //for second level (question group) should check the children
  expect(
    controller.filterData({ completed: true })({
      inspquestionid: 1,
      inspquestionchild: [{ completed: true }, { completed: false }]
    })
  ).toBeTruthy();
  expect(
    controller.filterData({ completed: true })({
      inspquestionid: 1,
      inspquestionchild: [{ completed: false }, { completed: false }]
    })
  ).toBeFalsy();

  //for third level (question) check the question
  expect(
    controller.filterData({ completed: true })({
      inspquestionid: 1,
      completed: true
    })
  ).toBeTruthy();
  expect(
    controller.filterData({ completed: true })({
      inspquestionid: 1,
      completed: false
    })
  ).toBeFalsy();

  //for forth level (field) check the field
  expect(
    controller.filterData({ completed: true })({ inspfieldid: 1, completed: true })
  ).toBeTruthy();
  expect(
    controller.filterData({ completed: true })({ inspfieldid: 1, completed: false })
  ).toBeFalsy();
});

it('matchesConditions should return true if it matches the conditions passed, otherwise false', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  //toDo condition
  let item = { completed: false };
  expect(controller.matchesConditions(item, { completed: false })).toBeTruthy();
  expect(controller.matchesConditions(item, { completed: true })).toBeFalsy();

  //done condition
  item = { completed: true };
  expect(controller.matchesConditions(item, { completed: true })).toBeTruthy();
  expect(controller.matchesConditions(item, { completed: false })).toBeFalsy();

  //required condition
  item = { required: true };
  expect(controller.matchesConditions(item, { required: true })).toBeTruthy();
  expect(controller.matchesConditions(item, { required: false })).toBeFalsy();

  //todo + required condition
  item = { completed: false, required: true };
  expect(
    controller.matchesConditions(item, { completed: false, required: true })
  ).toBeTruthy();
  expect(
    controller.matchesConditions(item, { completed: true, required: false })
  ).toBeFalsy();

  //done + required condition
  item = { completed: true, required: true };
  expect(
    controller.matchesConditions(item, { completed: true, required: true })
  ).toBeTruthy();
  expect(
    controller.matchesConditions(item, { completed: false, required: false })
  ).toBeFalsy();

  expect(controller.matchesConditions({}, { visible: false })).toBe(true);
});

it('changeToggle should call applyInMemoryFilter', async () => {
  // create the controller and verify that testTagGroupToggles
  // let clock = sinon.useFakeTimers();

  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsInProgData, 'executeInspections');
  let dsSpy = sinon.spy(ds, 'applyInMemoryFilter');

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 0,
    attribute: 'toDo',
    selected: true
  });

  await wait(200);
  expect(dsSpy.callCount).toBe(1);
});

it('toDo and done tagGroupToggles should be mutually exclusive', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsInProgData, 'executeInspections');

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 0,
    attribute: 'toDo',
    selected: true
  });
  expect(page.state.tagGroupTogglesData1[0].selected).toBe(true);
  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 1,
    attribute: 'done',
    selected: true
  });
  expect(page.state.tagGroupTogglesData1[0].selected).toBe(false);
  expect(page.state.tagGroupTogglesData1[1].selected).toBe(true);

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 0,
    attribute: 'toDo',
    selected: true
  });

  expect(page.state.tagGroupTogglesData1[0].selected).toBe(true);
  expect(page.state.tagGroupTogglesData1[1].selected).toBe(false);
});

it('testTagGroupToggles', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsInProgData, 'executeInspections');

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 0,
    attribute: 'toDo',
    selected: true
  });
  expect(page.state.tagGroupTogglesData1[0].selected).toBe(true);

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 0,
    attribute: 'toDo',
    selected: false
  });
  expect(page.state.tagGroupTogglesData1[0].selected).toBe(false);

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 1,
    attribute: 'done',
    selected: true
  });
  expect(page.state.tagGroupTogglesData1[0].selected).toBe(false);
  expect(page.state.tagGroupTogglesData1[1].selected).toBe(true);
  expect(page.state.tagGroupTogglesData1[2].selected).toBe(false);

  controller.changeToggle(page.state.tagGroupTogglesData1, {
    index: 2,
    attribute: 'required',
    selected: true
  });
  expect(page.state.tagGroupTogglesData1[0].selected).toBe(false);
  expect(page.state.tagGroupTogglesData1[1].selected).toBe(true);
  expect(page.state.tagGroupTogglesData1[2].selected).toBe(true);
});

it('pageResumed should call clearInMemoryFilter', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsInProgData, 'executeInspections');
  let dsSpy = sinon.spy(ds, 'clearInMemoryFilter');

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();
  expect(dsSpy.callCount).toBe(1);
});

it('pageResumed should rest tagGroupTogglesData1 state ', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);
  page.state.tagGroupTogglesData1 = [
    { label: 'To do', attribute: 'toDo', selected: true },
    { label: 'Done', attribute: 'done', selected: true },
    { label: 'Required', attribute: 'required', selected: true }
  ];
  app.setCurrentPage(page);

  await app.initialize();

  expect(page.state.tagGroupTogglesData1[0].selected).toBeFalsy();
  expect(page.state.tagGroupTogglesData1[1].selected).toBeFalsy();
  expect(page.state.tagGroupTogglesData1[2].selected).toBeFalsy();
});

it('handleQuestionSearch should call applyInMemoryFilter', async () => {
  // create the controller and verify that testTagGroupToggles
  // let clock = sinon.useFakeTimers();

  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsInProgData, 'executeInspections');
  let dsSpy = sinon.spy(ds, 'applyInMemoryFilter');

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  controller.handleQuestionSearch('test');

  await wait(200);
  expect(dsSpy.callCount).toBe(1);
});

it('handleQuestionSearch should return all inspections when e is empty', async () => {
  // create the controller and verify that testTagGroupToggles
  // let clock = sinon.useFakeTimers();

  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsInProgData, 'executeInspections');
  let dsSpy = sinon.spy(controller, 'acceptAllItems');

  page.registerController(controller);
  page.registerDatasource(ds);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  controller.handleQuestionSearch('');

  await wait(200);
  expect(dsSpy.callCount).toBe(1);
});

it('filterQuestion should always return true for respecting the conditions', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  //for root level (inspectionresult) should always return true
  expect(
    controller.filterQuestion('test')({
      inspectionresultid: 1
    })
  ).toBeTruthy();

  //for first level (question group) should check the group name
  expect(
    controller.filterQuestion('test')({
      description: 'test0', 
      inspquestionid: 1,
      inspquestionchild: [{ description: 'test1' }, { description: 'test2' }]
    })
  ).toBeTruthy();

  //for second level (question group) should check the children
  expect(
    controller.filterQuestion('test')({
      description: 'desc', 
      inspquestionid: 1,
      inspquestionchild: [{ description: 'test1' }, { description: 'test2' }]
    })
  ).toBeTruthy();

  //for first level should check the question
  expect(
    controller.filterQuestion('test')({
      inspquestionid: 1,
      groupid: 0,
      description: 'test1'
    })
  ).toBeTruthy();
});

it('setSearchParamState should set keepSearch state true and false', async () => {
  // create the controller and verify that testTagGroupToggles
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const mockFn = jest.fn();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  const e = {
    target: {
      value: 't',
    }
  }

  controller.changeToggle = mockFn;

  controller.setSearchParamState(e)

  expect(mockFn).toHaveBeenCalled();
});

it('setSearchParamState ', async () => {

});

it('pageResumed shows toast when ids are not passed', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  let spyToast = sinon.spy(app, 'toast');

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();

  // validate that a toast was shown, since no IDs were sent
  expect(spyToast.getCall(0).args[0]).toBe('Missing page parameter ids');

  spyToast.restore();
});

it('computeFieldChanges should completed count and total count from received event', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);

  await app.initialize();

  //if there is requiredTotalCount
  let formData = { requiredCompletedCount: 5, requiredTotalCount: 7 };
  controller.computeFieldChanges(formData);
  expect(page.state.countLabel).toBe('{0} required of {1}');
  expect(page.state.disableCompletion).toBeTruthy();

  //if there is requiredTotalCount and it equals requiredCompletionCount
  formData = { requiredCompletedCount: 8, requiredTotalCount: 8 };
  controller.computeFieldChanges(formData);
  expect(page.state.disableCompletion).toBeFalsy();

  //if there is not requiredTotalCount
  formData = { requiredCompletedCount: 0, requiredTotalCount: 0 };
  controller.computeFieldChanges(formData);
  expect(page.state.countLabel).toBe('{0} of {1}');
  expect(page.state.disableCompletion).toBeFalsy();

  let device = Device.get();
  device.screen.size = 'sm';

  //if there is requiredTotalCount
  formData = { requiredCompletedCount: 3, requiredTotalCount: 18 };
  controller.computeFieldChanges(formData);
  expect(page.state.countLabel).toBe('{0}/{1}');
  expect(page.state.disableCompletion).toBeTruthy();

  //if there is requiredTotalCount and it equals requiredCompletionCount
  formData = { requiredCompletedCount: 8, requiredTotalCount: 8 };
  controller.computeFieldChanges(formData);
  expect(page.state.countLabel).toBe('{0}/{1}');
  expect(page.state.disableCompletion).toBeFalsy();

  //if there is not requiredTotalCount
  formData = { requiredCompletedCount: 0, requiredTotalCount: 0 };
  controller.computeFieldChanges(formData);
  expect(page.state.countLabel).toBe('{0}/{1}');
  expect(page.state.disableCompletion).toBeFalsy();
});

it('should open the drawer for Instructions', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspFormQuestionInfo, 'inspFormInformation');
  const dsInsp = newDatasource(formInfo, 'executeInspections');

  ds.registerController(controller);
  dsInsp.registerController(controller);

  page.registerDatasource(ds);
  page.registerDatasource(dsInsp);

  await app.initialize();
  // await ds.load();
  // await dsInsp.load();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let drawerParameters = {
    item: { inspectionresultid: '1001', questionId: '001' }
  };
  let loadSpy = sinon.spy(page, 'showDialog');

  await controller.openQuestionInstructionsDrawer(drawerParameters);

  expect(loadSpy.callCount).toBe(1);
});

it('should open the Instructions drawer for questionschild', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspFormQuestionInfo, 'inspFormInformation');
  const dsInsp = newDatasource(formInfo, 'executeInspections');

  ds.registerController(controller);
  dsInsp.registerController(controller);

  page.registerDatasource(ds);
  page.registerDatasource(dsInsp);

  await app.initialize();
  // await ds.load();
  // await dsInsp.load();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let drawerParameters = {
    item: { inspectionresultid: '1001', questionId: '001', groupId: '001'}
  };
  let loadSpy = sinon.spy(page, 'showDialog');

  await controller.openQuestionInstructionsDrawer(drawerParameters);

  expect(loadSpy.callCount).toBe(1);
});

it('openInformation calls another function', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspFormQuestionInfo, 'inspFormInformation');
  const dsInsp = newDatasource(formInfo, 'executeInspections');

  ds.registerController(controller);
  dsInsp.registerController(controller);

  page.registerDatasource(ds);
  page.registerDatasource(dsInsp);

  await app.initialize();
  await ds.load();
  await dsInsp.load();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  await app.initialize();
  const openQuestionInstructionsDrawer = jest.spyOn(
    controller,
    'openQuestionInstructionsDrawer'
  );

  controller.openInformation({ type: 'question' });
  expect(openQuestionInstructionsDrawer).toHaveBeenCalled();

  controller.openInformation({ type: '' });
  expect(openQuestionInstructionsDrawer).toHaveBeenCalledTimes(1);
});

it('openFormInstructionsDrawer populates page states', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(formInfo, 'inspFormInformation');
  const dsInsp = newDatasource(inspFormInstructions, 'executeInspections');

  ds.registerController(controller);
  dsInsp.registerController(controller);

  page.registerDatasource(ds);
  page.registerDatasource(dsInsp);

  await app.initialize();

  await ds.load();
  await dsInsp.load();

  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let drawerParameters = { item: { inspectionresultid: '1001' } };

  page.setState({
    computedFormName: '',
    computedAsset: '',
    computedLocation: '',
    computedLongDescription: ''
  });

  await controller.openFormInstructionsDrawer(drawerParameters);

  expect(page.state.computedTitle).toBe('Form Instructions Question');
  expect(page.state.computedAsset).toBe('Asset123 AssetDesc');
  expect(page.state.computedLocation).toBe('');
  expect(page.state.computedLongDescription).toBe('<p>Instructions Form</p>');
});

it('openQuestionInstructionsDrawer populates page states', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspFormQuestionInfo, 'inspFormInformation');
  const dsInsp = newDatasource(inspFormInstructions, 'executeInspections');

  ds.registerController(controller);
  dsInsp.registerController(controller);

  page.registerDatasource(ds);
  page.registerDatasource(dsInsp);

  await app.initialize();
  await ds.load();
  await dsInsp.load();

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  let drawerParameters = {
    item: { inspectionresultid: '1001', questionId: '001' }
  };

  page.setState({
    computedFormName: '',
    computedAsset: '',
    computedLocation: '',
    computedLongDescription: ''
  });

  await controller.openQuestionInstructionsDrawer(drawerParameters);

  expect(page.state.computedTitle).toBe('Question1');
  expect(page.state.computedAsset).toBe('Asset123 AssetDesc');
  expect(page.state.computedLocation).toBe('');
  expect(page.state.computedLongDescription).toBe(
    '<p>Instructions Question1</p>'
  );
});

it('completeForm should change inspection status', async () => {
  const mockedDS = JSON.parse(JSON.stringify(inspectionsInProgData));
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();

  app.registerController(appController);
  page.registerController(pageController);
  const inprogds = newDatasource(mockedDS, 'executeInspections');
  page.registerDatasource(inprogds);

  app.registerPage(page);
  app.setCurrentPage(page);

  await inprogds.load();
  let invokeAction = jest
    .spyOn(inprogds, 'invokeAction')
    .mockImplementation(() => {
      page.datasources.executeInspections.items[0].status_maxvalue =
        'COMPLETED';
      mockedDS.member[0].status_maxvalue = 'COMPLETED';
    });

  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = inprogds.items[0];

  //completeForm should trigger invokeAction from datasource
  await pageController.completeForm(item);
  expect(invokeAction).toHaveBeenCalled();
});

it('completeForm should change inspection status to  REVIEW', async () => {
  const mockedDS = JSON.parse(JSON.stringify(inspectionsInProgData));
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();

  app.registerController(appController);
  page.registerController(pageController);

  const inprogds = newDatasource(mockedDS, 'executeInspections');
  page.registerDatasource(inprogds);

  app.registerPage(page);
  app.setCurrentPage(page);

  await inprogds.load();

  let invokeAction = jest
    .spyOn(inprogds, 'invokeAction')
    .mockImplementation(() => {
      page.datasources.executeInspections.items[0].status_maxvalue =
        'INPROG';
      mockedDS.member[0].status_maxvalue = 'INPROG';
    });

  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = inprogds.items[0];

  //completeForm should trigger invokeAction from datasource
  await pageController.completeForm(item);
  expect(invokeAction).toHaveBeenCalled();

});


it('completeForm should call showCompletionSummary', async () => {
  const mockds = JSON.parse(JSON.stringify(inspectionsInProgData));
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  app.registerController(appController);
  page.registerController(pageController);

  let showCompletionSpy = sinon.spy(pageController, 'showCompletionSummary');

  appController.changeResultStatus = jest.fn();
  app.callController = jest.fn(() => {
    page.datasources.executeInspections.items[0].status_maxvalue = 'COMPLETED';
    mockds.member[0].status_maxvalue = 'COMPLETED';
    return mockds.member[0];
  });

  const inprogds = newDatasource(mockds, 'executeInspections');
  page.registerDatasource(inprogds);
  await inprogds.load();

  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = inprogds.items[0];
  app.state.inspectionsList = [item.href];
  await pageController.completeForm(item);
  expect(showCompletionSpy.calledOnce).toEqual(true);
  showCompletionSpy.restore();
});

it('completeForm should call showInspList when setting status to REVIEW', async () => {
  const mockds = JSON.parse(JSON.stringify(inspectionsInProgData));
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  app.registerController(appController);
  page.registerController(pageController);

  let showInspListSpy = sinon.spy(pageController, 'showInspList');

  const inprogds = newDatasource(mockds, 'executeInspections');
  page.registerDatasource(inprogds);
  await inprogds.load();

  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = inprogds.items[0];
  app.state.inspectionsList = [item.href];
  app.state.enablereview = true;
  item.inspectionform.enablereview = true;

  appController.changeResultStatus = jest.fn();
  app.callController = jest.fn(() => {
    page.datasources.executeInspections.items[0].status_maxvalue = 'REVIEW';
    mockds.member[0].status_maxvalue = 'REVIEW';
    return mockds.member[0];
  });

  await pageController.completeForm(item);
  expect(showInspListSpy.calledOnce).toEqual(true);
  showInspListSpy.restore();
}); 


it('completeForm should call handleBatchReviewExecution when setting status to REVIEW and isBatch is true', async () => {
  const mockds = JSON.parse(JSON.stringify(inspectionsInProgData));
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  app.registerController(appController);
  page.registerController(pageController);

  let handleBatchReviewExecutionSpy = sinon.spy(pageController, 'handleBatchReviewExecution');
  const inprogds = newDatasource(mockds, 'executeInspections');
  page.registerDatasource(inprogds);
  await inprogds.load();

  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = inprogds.items[0];
  app.state.inspectionsList = new InspectionsList([
    'oslc/os/mxapiinspectionres/_A',
    'oslc/os/mxapiinspectionres/_B'
  ]);
  app.state.enablereview = true;
  page.params.isBatch = true;

  appController.changeResultStatus = jest.fn();
  app.callController = jest.fn(() => {
    page.datasources.executeInspections.items[0].status_maxvalue = 'REVIEW';
    mockds.member[0].status_maxvalue = 'REVIEW';
    return mockds.member[0];
  });

  await pageController.completeForm(item);
  expect(handleBatchReviewExecutionSpy.calledOnce).toEqual(true);
  handleBatchReviewExecutionSpy.restore();
});

it('completeForm should find field with error', async () => {
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  app.registerController(appController);
  page.registerController(pageController);
  let goToInspfieldresultItemSpy = sinon.spy(
    pageController,
    'goToInspfieldresultItem'
  );
  let showCompletionSpy = sinon.spy(pageController, 'showCompletionSummary');
  let answeredForm = {
    status_maxvalue: 'INPROG',
    inspfieldresult: [
      { inspfieldresultid: 1262 },
      { inspfieldresultid: 1263, errorflag: 1 }
    ],
    inspectionresultid: '1001',
    questionId: '001'
  };

  const inprogds = newDatasource(answeredForm, 'executeInspections');
  page.registerDatasource(inprogds);
  await inprogds.load();

  await app.initialize();
  pageController.pageInitialized(page, app);
  //let's pass an item
  const item = inprogds.items[0];

  appController.changeResultStatus = jest.fn();
  app.callController = jest.fn(() => {
    page.datasources.executeInspections.items[0].status_maxvalue = 'INPROG';
    answeredForm.status_maxvalue = 'INPROG';
    return answeredForm;
  });
  await pageController.completeForm(item);
  expect(showCompletionSpy.calledOnce).toEqual(false);
  expect(goToInspfieldresultItemSpy.calledOnce).toEqual(true);
});

it('completeForm should find field with error - mobile and offline mode', async () => {
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  app.registerController(appController);
  page.registerController(pageController);
  let originalDevice = Device.get().isMaximoMobile;
  Device.get().isMaximoMobile = true;
  let originalConnection = app.state.networkConnect;
  app.state.networkConnected = false;
  let goToInspfieldresultItemSpy = sinon.spy(
    pageController,
    'goToInspfieldresultItem'
  );

  let showCompletionSpy = sinon.spy(pageController, 'showCompletionSummary');
  let answeredForm = {
    status_maxvalue: 'INPROG',
    inspfieldresult: [
      { inspfieldresultid: 1262 },
      { inspfieldresultid: 1263, errorflag: 1 }
    ],
    inspectionresultid: '1001',
    questionId: '001'
  };

  const inprogds = newDatasource(answeredForm, 'executeInspections');
  page.registerDatasource(inprogds);
  await inprogds.load();

  await app.initialize();
  pageController.pageInitialized(page, app);
  //let's pass an item
  const item = inprogds.items[0];

  appController.changeResultStatus = jest.fn();
  app.callController = jest.fn(() => {
    page.datasources.executeInspections.items[0].status_maxvalue = 'COMPLETED';
    answeredForm.status_maxvalue = 'COMPLETED';
    return answeredForm;
  });

  await pageController.completeForm(item);
  expect(showCompletionSpy.calledOnce).toEqual(false);
  expect(goToInspfieldresultItemSpy.calledOnce).toEqual(true);

  Device.get().isMaximoMobile = originalDevice;
  app.state.networkConnected = originalConnection;
});

it('showCompletionSummary show selected page', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inspectionsCompletedData);
  ds.registerController(controller);
  page.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  // mock the invokeAction
  const mockInvokeAction = jest.fn();
  ds.invokeAction = mockInvokeAction;

  // mock the setCurrentPage
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  controller.pageInitialized(page, app);

  //let's pass a item
  const item = ds.items[0];

  // call the show inspection with no selected items, should raise a message
  controller.showCompletionSummary(item);

  expect(mockSetPage.mock.calls[0][0].name).toBe('inspcompletionsummary');
});

it('should close navigator drawer', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  const mockFn = jest.fn();

  const inspRef = refStore.getInspectionRef(1, true);
  const questionRef = refStore.getQuestionRef(2, true);
  const inspfieldresult = refStore.getInspFieldResultRef(3, true);

  page.registerController(controller); 
  app.registerPage(page);

  await app.initialize();

  let drawerCloserSpy = sinon.spy(controller, 'closeQuestionsDrawer');

  controller.clearQuestionSearch = mockFn; 
  await controller.goToInspection();
  await controller.goToInspectionItem();
  await controller.goToInspfieldresultItem();
  expect(drawerCloserSpy.calledOnce).toEqual(false);

  inspRef.current = { scrollIntoView: () => { } };
  questionRef.current = { scrollIntoView: () => { } };
  inspfieldresult.current = { scrollIntoView: () => { } };

  await controller.goToInspection({ inspectionresultid: 1 });
  expect(drawerCloserSpy.calledOnce).toEqual(true);

  await controller.goToInspectionItem({ inspquestionid: 2 });
  expect(drawerCloserSpy.calledTwice).toEqual(true);

  await controller.goToInspfieldresultItem({ inspfieldresultid: 3 });
  expect(drawerCloserSpy.calledTwice).toEqual(true);

  drawerCloserSpy.restore();
});

it('should log error when reference has not method to scroll into', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  const mockFn = jest.fn();

  refStore.getInspectionRef(3, true);

  page.registerController(controller);
  app.registerPage(page);

  await app.initialize();

  let logErrorSpy = sinon.spy(log, 'e');

  controller.clearQuestionSearch = mockFn; 
  await controller.goToInspection({ inspectionresultid: 3 });
  expect(logErrorSpy.calledOnce).toEqual(true);

  logErrorSpy.restore();
});

it('startForm should change inspections status', async () => {
  let mockSetPage = jest.fn();
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  app.registerController(appController);
  page.registerController(pageController);
  const pendds = newDatasource(inspectionsPendData, 'executeInspections');
  page.registerDatasource(pendds);

  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  app.registerDatasource(dsDomain);

  let items = await pendds.load();
  let invokeAction = sinon.stub(pendds, 'invokeAction').returns(items[0]);
  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = pendds.items[0];

  //startForm should trigger invokeAction from datasource
  app.setCurrentPage = mockSetPage;
  await pageController.startForm(item);

  expect(invokeAction.called).toBe(true);
  expect(invokeAction.displayName).toBe('invokeAction');
  expect(invokeAction.args.length).toBe(1);
});

it('startForm should change inspections status -- mobile', async () => {
  let mockSetPage = jest.fn();
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  let originalDevice = Device.get().isMaximoMobile;
  Device.get().isMaximoMobile = true;
  app.registerController(appController);
  page.registerController(pageController);
  const pendds = newDatasource(inspectionsPendData, 'executeInspections');
  page.registerDatasource(pendds);
  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  app.registerDatasource(dsDomain);
  let mockLoad = jest.fn()
  await pendds.load();
  pendds.forceReload = mockLoad()
  await app.initialize();
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = pendds.items[0];

  //startForm should trigger invokeAction from datasource
  app.setCurrentPage = mockSetPage;
  await pageController.startForm(item);

  expect(mockLoad).toHaveBeenCalled();
  Device.get().isMaximoMobile = originalDevice

});

it('should log error when no inspection was loaded to present instructions', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource({ member: [] }, 'inspFormInformation');

  ds.registerController(controller);
  page.registerDatasource(ds);

  await app.initialize();
  await ds.load();

  controller.pageInitialized(page, app);

  let drawerParameters = {
    item: { inspectionresultid: '1001', questionId: '001' }
  };

  let logErrorSpy = sinon.spy(log, 'e');

  await controller.openQuestionInstructionsDrawer(drawerParameters);

  expect(logErrorSpy.calledOnce).toEqual(true);
  logErrorSpy.restore();
});

it('should set next inspection while multiple execution', async () => {
  const controller = new ExecutionFormPageController();
  const ds = newDatasource(inspectionsInProgData, 'executeInspections');
  const app = new Application();
  const page = new Page();

  page.registerDatasource(ds);
  page.registerController(controller);
  app.registerPage(page);
  app.state.inspectionsList = new InspectionsList([
    'oslc/os/mxapiinspectionres/_A',
    'oslc/os/mxapiinspectionres/_B'
  ]);
  await app.initialize();

  await controller.goToNext();

  expect(app.state.inspectionsList.currentItem).toEqual(
    'oslc/os/mxapiinspectionres/_B'
  );

  page.params.itemhref = ['oslc/os/mxapiinspectionres/_C'];

  app.registerPage(page);
  app.setCurrentPage(page);

  expect(app.state.inspectionsList.isLast).toBe(true);
});

it('should set isFormExecutionLoaded to true', async () => {
  // Initialization
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  controller.checkFormLoaded();
  const isLoaded = app?.state?.isFormExecutionLoaded;
  expect(isLoaded).toBe(true);
});

it('should return correct response on getResponse function', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  let inspfield = { fieldtype: 'TR' };
  let inspfieldresult = {};
  let response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('');

  inspfield = { fieldtype: 'TR' };
  inspfieldresult = { txtresponse: 'txtresponse' };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('txtresponse');

  inspfield = { fieldtype: 'SO' };
  inspfieldresult = { txtresponse: 'txtresponse' };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('txtresponse');

  inspfield = { fieldtype: 'SE' };
  inspfieldresult = { numresponse: 100 };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe(100);

  inspfield = { fieldtype: 'MM', metertype: 'CHARACTERISTIC', metertype_maxvalue: 'CHARACTERISTIC'  };
  inspfieldresult = { txtresponse: 'txtresponse' };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('txtresponse');

  inspfield = { fieldtype: 'MM' };
  inspfieldresult = { numresponse: 'numresponse' };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('numresponse');

  inspfield = { fieldtype: 'DO' };
  inspfieldresult = { dateresponse: '2021-08-08T00:00:00-03:00' };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('2021-08-08T00:00:00-03:00');

  inspfield = { fieldtype: 'TO' };
  inspfieldresult = { timeresponse: '1970-01-01T11:00:00-03:00' };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('1970-01-01T11:00:00-03:00');

  inspfield = { fieldtype: 'DT' };
  inspfieldresult = {
    dateresponse: '2021-08-08T00:00:00-03:00',
    timeresponse: '1970-01-01T11:00:00-03:00'
  };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('2021-08-08T11:00:00-03:00');

  inspfield = { fieldtype: 'MO' };
  inspfieldresult = {
    inspfieldresultselection: [
      {
        txtresponse: '1'
      }
    ]
  };
  response = controller.getResponse(inspfield, inspfieldresult);
  expect(response).toBe('1');
});

it('should return correct format on getFormat function', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();

  let fieldtype = 'DT';
  let response = controller.getFormat(fieldtype);
  expect(response).toBe('datetime');

  fieldtype = 'DO';
  response = controller.getFormat(fieldtype);
  expect(response).toBe('date');

  fieldtype = 'TO';
  response = controller.getFormat(fieldtype);
  expect(response).toBe('time');
});

it('openPreviousResultsDrawer should load data into JSON datasource and open drawer', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  page.registerController(controller);
  const executeInspectionsDS = newDatasource(histResults, 'executeInspections');
  const histResultsDS = newDatasource({}, 'previousInspectionResultsList');

  page.registerDatasource(executeInspectionsDS);
  page.registerDatasource(histResultsDS);
  app.registerPage(page);

  let loadSpy = sinon.spy(page, 'showDialog');

  await app.initialize();
  await executeInspectionsDS.load();

  page.state.inspectionResultLimit = 5;
  const inspfield = {
    inspfieldnum: '1209',
    fieldtype: 'TR',
    description: 'Hello'
  };
  await controller.openPreviousResultsDrawer(inspfield);

  //page state should be receive field description
  expect(page.state.historicFieldDescription).toBe('Hello');

  //for this sample three results should be loaded into JSON datasource
  expect(page.datasources.previousInspectionResultsList.state.totalCount).toBe(
    3
  );

  //drawer should open
  expect(loadSpy.callCount).toBe(1);
});

it('pageResumed should run and update page title', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource({ member: [] }, 'executeInspections');
  ds.options = {...ds.options,
    selectedRecordHref: 'href'}
  page.registerController(controller);
  page.registerDatasource(ds);
  page.params.inspectionresultid = [1, 2, 3];
  page.params.itemhref = 'ExecutInpectionhref';

  page.params.itemToLoad = {};
  page.params.forceStart = true;
  app.registerPage(page);

  app.state.incomingContext = {
    page: 'workOrderDetails',
    wonum: 1022,
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx',
    breadcrumb: {
      returnName: 'Returning to inspection',
      enableReturnBreadcrumb: true
    },
    uid: 123,
  };
  await app.initialize();
  app.setCurrentPage(page);
  controller.pageResumed(page, app);
  expect(page.state.pageTitle).toBe('Inspections');
});



it('pageResumed should force update on inspectionsList', async () => {
  // setup a mock application and register out controller
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource({ member: [] }, 'executeInspections');

  page.registerController(controller);
  page.registerDatasource(ds);
  page.params.inspectionresultid = [1, 2, 3];
  page.params.itemhref = 'ExecutInpectionhref';

  page.params.itemToLoad = {};
  page.params.forceStart = true;
  page.params.forceReload = true;
  app.registerPage(page);

  app.state.incomingContext = {
    page: 'workOrderDetails',
    wonum: 1022,
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx',
    breadcrumb: {
      returnName: 'Returning to inspection',
      enableReturnBreadcrumb: true
    },
    uid: 123,
  };

  controller.pageResumed(page, app);

  expect(app.state.inspectionsList.currentItem).toBe('ExecutInpectionhref');
});

it('loadApp should invoke appswitcher method', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();

  await app.initialize();
  controller.pageInitialized(new Page(), app);
  AppSwitcher.setImplementation(MaximoAppSwitcher, { app: app });
  let switcher = AppSwitcher.get();
  const gotoApplication = sinon.spy(switcher, 'gotoApplication');

  // calling with argument data
  controller.loadApp({ appName: 'techmobile', options: {}, context: {} });
  sinon.assert.callCount(gotoApplication, 1);

  // calling without appName
  controller.loadApp();
  sinon.assert.callCount(gotoApplication, 1);

  // calling with appName but without options and context data
  controller.loadApp({ appName: 'techmobile' });
  sinon.assert.callCount(gotoApplication, 2);
});

it('pagePaused should reset voice checking variables', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();
  const ds = newDatasource({
    member: [
      {
        inspectionresultid: '1001',
        inspectionform: {
          audioguided: true
        }
      }
    ]
  }, 'executeInspections');
  page.registerDatasource(ds);

  controller.pageInitialized(page, app);
  controller.pagePaused(page, app);

  expect(app.state.isBackFromhVoiceInspection).toBe(false);
});

it('check voice status: normal', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource({
    member: [
      {
        inspectionresultid: '1001',
        inspectionform: {
          audioguided: true
        }
      }
    ]
  }, 'executeInspections');
  page.registerDatasource(ds);
  controller.pageInitialized(page, app);

  // not mobile
  Device.get().isMaximoMobile = false;
  controller.checkVoiceStatus();
  Device.get().isMaximoMobile = true;

  // back from voice inspection
  app.state.isBackFromhVoiceInspection = true;
  app.state.needUpdateInspectionResult = true;
  controller.checkVoiceStatus();
  app.state.isBackFromhVoiceInspection = false;
  app.state.needUpdateInspectionResult = false;

  // already in processing
  page.state.isCheckingVoiceStatus = true;
  await controller.checkVoiceStatus();
  page.state.isCheckingVoiceStatus = false;

  // datasource not load
  await controller.checkVoiceStatus();
  await ds.load();

  // missing serverUrl
  controller.checkVoiceStatus();
  localStorage.setItem('serverUrl', 'https://fake.ivt.suite.maximo.com/');

  // missing access_token
  await controller.checkVoiceStatus();
  sessionStorage.setItem('access_token', 'fake');
  page.state.isCheckingVoiceStatus = false;

  // network is offline
  app.state.isVoiceUser = true;
  app.state.networkConnected = false;
  await controller.checkVoiceStatus();
  app.state.isVoiceUser = false;
  app.state.networkConnected = true;
  page.state.isCheckingVoiceStatus = false;

  // normal
  await controller.checkVoiceStatus();

  const voiceSdk = controller.getVoiceSdk();
  voiceSdk._invokeSdkCallback('onReady', 'sessionId');
  voiceSdk._invokeSdkCallback('onNotReady', 'AuthenticateError');
  voiceSdk._invokeSdkCallback('onNotReady', 'OtherError');
});

it('check voice status: not enable voice', async () => {
  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource({
    member: [
      {
        inspectionresultid: '1001',
        inspectionform: {
          audioguided: false
        }
      }
    ]
  }, 'executeInspections');
  page.registerDatasource(ds);
  await ds.load();

  controller.pageInitialized(page, app);
  localStorage.setItem('serverUrl', 'https://fake.ivt.suite.maximo.com/');

  await controller.checkVoiceStatus();
  expect(page.state.isCheckingVoiceStatus).toBe(true);
});

it('startForm should change inspections status -- mobile--offline', async () => {
  let mockSetPage = jest.fn();
  const pageController = new ExecutionFormPageController();
  const appController = new AppController();
  const app = new Application();
  const page = new Page();
  let originalDevice = Device.get().isMaximoMobile;
  let originalConnection = app.state.networkConnect;
  app.state.networkConnected = false;

  Device.get().isMaximoMobile = true;
  app.registerController(appController);
  page.registerController(pageController);
  const pendds = newDatasource(inspectionsPendData, 'executeInspections');
  page.registerDatasource(pendds);
  const dsDomain = newStatusDatasource(domainitem, 'synonymdomainDataInsp');
  app.registerDatasource(dsDomain);
  let mockLoad = jest.fn()
  await pendds.load();
  pendds.forceReload = mockLoad()
  await app.initialize();
  app.state.networkConnected = false;
  pageController.pageInitialized(page, app);

  //let's pass an item
  const item = pendds.items[0];

  //startForm should trigger invokeAction from datasource
  app.setCurrentPage = mockSetPage;
  await pageController.startForm(item);

  expect(mockLoad).toHaveBeenCalled();
  Device.get().isMaximoMobile = originalDevice
  app.state.networkConnected = originalConnection;

});


it('showInspList show selected page', async () => {

  const controller = new ExecutionFormPageController();
  const app = new Application();
  const page = new Page();

  page.registerController(controller);
  app.registerPage(page);

  // setup a mock application and register out controller
  const mainPage = new Page({
    name: 'main',
    clearStack: false
  });
  mainPage.registerController(controller);

  await app.initialize();
  controller.showInspList();

  app.registerPage(mainPage);

  controller.showInspList();
  expect(controller.page).toBeTruthy();
});
