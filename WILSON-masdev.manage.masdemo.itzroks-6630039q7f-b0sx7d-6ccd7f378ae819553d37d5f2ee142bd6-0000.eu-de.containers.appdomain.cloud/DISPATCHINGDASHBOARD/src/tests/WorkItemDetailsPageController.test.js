import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import sampleProjectItem from '../model/sampleProjectItem';
import sampleActivityItem from './sampleData/sampleActivityItem';
import workorderitem from '../model/woDetailData';
import optimizationRunItem from '../model/skdodmerunitem';
import resourceItem from './sampleData/resource';
import resourceNoTypeItem from './sampleData/resourceNoType';
import resourceNoNameItem from './sampleData/resourceNoName';
import resourceNoTimeInfoItem from './sampleData/resourceNoTimeInfo';
import resourceNoDispViewItem from './sampleData/resourceNoDispView';
import resourceNoDispViewOuput from './sampleData/resourceNoDispViewOutput';
import resourceNoTypeOutput from './sampleData/resourceNoTypeOutput';
import resourceNoNameOutput from './sampleData/resourceNoNameOutput';
import resourceNoTimeInfoOutput from './sampleData/resourceNoTimeInfoOutput';
import resourceOutput from './sampleData/resourceOutput';
import WorkItemDetailsPageController from '../WorkItemDetailsPageController';

function newWoDatasource(data = workorderitem, name = 'woDetailds') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name,
  });

  return ds;
}

function newDatasource(
  data = sampleProjectItem,
  items = 'member',
  idAttribute = 'id',
  name = 'skdactivityunscheduledDS'
) {
  const da = new JSONDataAdapter({
    src: data,
    items,
  });
  const ds = new Datasource(da, {
    idAttribute,
    name,
  });
  return ds;
}

describe('WorkItemDetailsPageController', () => {
  describe('onRefresh', () => {
    it('shows success toast when succeeds in reloading datasource', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      controller.app = app;

      const findDatasourceSpy = jest
        .spyOn(controller.app, 'findDatasource')
        .mockImplementation(() => ({
          invokeAction: () => Promise.resolve({}),
          forceReload: () => Promise.resolve({}),
        }));

      jest
        .spyOn(controller.app, 'getLocalizedLabel')
        .mockImplementation((labelCode, labelText) => labelText);
      const toastSpy = jest.spyOn(controller.app, 'toast');

      await controller.onRefresh();

      expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
      expect(toastSpy).toHaveBeenCalledWith(
        'Record has been refreshed',
        'success'
      );
    });

    it('shows failure toast when fails to reload datasource', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      controller.app = app;

      const findDatasourceSpy = jest
        .spyOn(controller.app, 'findDatasource')
        .mockImplementation(() => ({
          invokeAction: () => Promise.resolve({ error: 'mock error' }),
        }));

      jest
        .spyOn(controller.app, 'getLocalizedLabel')
        .mockImplementation((labelCode, labelText) => labelText);
      const toastSpy = jest.spyOn(controller.app, 'toast');

      await controller.onRefresh();

      expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
      expect(toastSpy).toHaveBeenCalledWith('Failed to refresh', 'error');
    });
  });

  describe('optimize dialog', () => {
    let controller;
    let ds;
    let app;
    let page;

    beforeEach(() => {
      controller = new WorkItemDetailsPageController();
      ds = newDatasource(sampleProjectItem, 'member', 'id', 'skdprojectsDS');
      app = new Application();
      page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(ds);
    });

    it('Open optimize dialog', async () => {
      const skdprojectscenarioDS = newDatasource(
        {
          member: [
            {
              id: 0,
              skdspatialparam: [],
            },
          ],
        },
        'member',
        'id',
        'skdprojectscenarioDS'
      );

      await skdprojectscenarioDS.load();
      app.registerDatasource(skdprojectscenarioDS);
      await app.initialize();

      const dialogSpy = jest.spyOn(page, 'showDialog');
      controller.optimizeDialog();
      expect(dialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    });

    it('Dont open optimize dialog if "skdspatialparam" is not set ', async () => {
      const skdprojectscenarioDS = newDatasource(
        {
          member: [
            {
              id: 0,
            },
          ],
        },
        'member',
        'id',
        'skdprojectscenarioDS'
      );

      app.toast = jest.fn();
      await skdprojectscenarioDS.load();
      app.registerDatasource(skdprojectscenarioDS);
      await app.initialize();

      const dialogSpy = jest.spyOn(page, 'showDialog');
      controller.optimizeDialog();
      expect(dialogSpy).not.toHaveBeenCalledWith('optimizeScheduleDialog');
      await expect(app.toast.mock.calls.length).toBe(1);
    });
  });

  describe('lookup', () => {
    it('Should select item from the lookup', () => {
      const controller = new WorkItemDetailsPageController();
      jest.spyOn(controller, 'selectLookupItem').mockImplementation(() => {});

      controller.selectCraft([
        { craft: 'testCraft', skilllevel: 'testSkillLevel' },
      ]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        craft: 'testCraft',
        skilllevel: 'testSkillLevel',
      });

      controller.selectLabor([{ laborcode: 'testLaborCode' }]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        laborcode: 'testLaborCode',
      });

      controller.selectCrew([{ amcrew: 'testCrew' }]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        amcrew: 'testCrew',
      });

      controller.selectCrewType([{ amcrewtype: 'testCrewType' }]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        amcrewtype: 'testCrewType',
      });
    });

    it('Should not open lookup window', async () => {
      const woDetailds = newWoDatasource({}, 'woDetailDs');
      const crewTypeDs = newWoDatasource([], 'crewTypelookupDS');

      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 14 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });
      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      page.registerDatasource(woDetailds);
      page.registerDatasource(crewTypeDs);

      page.state.selectedAssignmentId = 11;
      await app.initialize();

      const showLookupSpy = jest.spyOn(controller.app, 'showLookup');
      const setLoadingLookupSpy = jest.spyOn(controller, 'setLoadingLookup');

      await skdactivityunscheduledDS.load();
      await woDetailds.load();

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'crewType_lookup',
      });
      await crewTypeDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).not.toHaveBeenCalled();

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'unknown_lookup',
      });
      await crewTypeDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).not.toHaveBeenCalled();
    });

    it('Should open lookup window', async () => {
      const woDetailds = newWoDatasource(workorderitem, 'woDetailDs');
      const crewTypeDs = newWoDatasource([], 'crewTypelookupDS');
      const crewLookupDs = newWoDatasource([], 'crewlookupDS');
      const craftlookupDS = newWoDatasource([], 'craftlookupDS');
      const laborlookupDS = newWoDatasource([], 'laborlookupDS');

      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 14 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      page.registerDatasource(woDetailds);
      page.registerDatasource(crewTypeDs);
      page.registerDatasource(crewLookupDs);
      page.registerDatasource(craftlookupDS);
      page.registerDatasource(laborlookupDS);

      page.state.selectedAssignmentId = 14;
      await app.initialize();

      const showLookupSpy = jest.spyOn(controller.app, 'showLookup');
      const setLoadingLookupSpy = jest.spyOn(controller, 'setLoadingLookup');

      await skdactivityunscheduledDS.load();
      await woDetailds.load();

      await controller.openLookup({ assignmentid: 14 });
      await laborlookupDS.load();
      expect(setLoadingLookupSpy).not.toHaveBeenCalled();
      expect(showLookupSpy).not.toHaveBeenCalled();

      await controller.openLookup({ lookupId: 'crewType_lookup' });
      await laborlookupDS.load();
      expect(setLoadingLookupSpy).not.toHaveBeenCalled();
      expect(showLookupSpy).not.toHaveBeenCalled();

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'crewType_lookup',
      });
      await crewTypeDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).toHaveBeenCalledWith('crewType_lookup');

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'crew_lookup',
      });
      await crewLookupDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).toHaveBeenCalledWith('crewType_lookup');

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'craft_lookup',
      });
      await craftlookupDS.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'craft');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'craft');
      expect(showLookupSpy).toHaveBeenCalledWith('craft_lookup');

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'labor_lookup',
      });
      await laborlookupDS.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'laborcode');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'laborcode');
      expect(showLookupSpy).toHaveBeenCalledWith('labor_lookup');
    });

    it('Should update assignment when item is selected from the lookup', async () => {
      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 123 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      await skdactivityunscheduledDS.load();

      page.state.selectedAssignmentId = 13;
      await app.initialize();

      expect(controller.selectLookupItem({ craft: 'TestCraft' })).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          craft: '',
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);

      page.state.selectedAssignmentId = 123;
      await app.initialize();

      expect(controller.selectLookupItem({ craft: 'TestCraft' })).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          computeChanged: true,
          craft: 'TestCraft',
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);
    });

    it('Should set loading attribute for lookup', async () => {
      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 123 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      await skdactivityunscheduledDS.load();

      page.state.selectedAssignmentId = 123;
      await app.initialize();

      expect(controller.setLoadingLookup(true, 'craft')).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          craft: '',
          craftLoading: true,
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);

      page.state.selectedAssignmentId = 444;
      await app.initialize();

      expect(controller.setLoadingLookup(true, 'craft')).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          craft: '',
          craftLoading: false,
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);
    });
  });

  it('transforms datasource for TreeGrid item has no name', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoNameItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Class: 'AssignedSlot',
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoNameOutput);
  });

  it('transforms datasource for TreeGrid item has no start or duration', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoTimeInfoItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Class: 'AssignedSlot',
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoTimeInfoOutput);
  });

  it('transforms datasource for TreeGrid item has no resource disp view data', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoDispViewItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Class: 'AssignedSlot',
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoDispViewOuput);
  });

  it('transforms datasource for TreeGrid item has no resource type', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoTypeItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Class: 'AssignedSlot',
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoTypeOutput);
  });

  it('transforms datasource for TreeGrid', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Class: 'AssignedSlot',
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });
    const otherDs = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'otherDataSource',
    });
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(activityDS);
    app.registerDatasource(otherDs);
    app.registerDatasource(resourceDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    otherDs.load();
    const otherData = app.findDatasource('otherDataSource');
    const otherDataItems = await otherData.load();
    expect(otherDataItems).toEqual([
      {
        Resource: 'Smith, Alan"',
        Run: [
          {
            Class: 'AssignedSlot',
            Start: '2023-06-29T00:00:00-15:00',
            Duration: 6,
            Text: 'Electrical and Mechanical',
          },
          {},
        ],
        Shift: 'Day',
        Site: 'Birmingham',
        _bulkid: '1',
        id: '1',
      },
    ]);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceOutput);
  });

  it('onAfterLoadData should stop early if datasource has no items', async () => {
    const controller = new WorkItemDetailsPageController();
    const dataAdapter = new JSONDataAdapter({
      src: [],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    ds.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual([]);
  });

  it('onAfterLoadData should set href for skdodmerunlatestDS', async () => {
    const controller = new WorkItemDetailsPageController();
    const updateLatestHrefSpy = jest.spyOn(controller, 'updateRunLatestHref');
    const page = new Page({ name: 'workItemDetails' });
    const expectedHref = 'oslc/mxapiskdproject/_QUNUMi9TUEFUSUFMX1RFU1Q--';
    page.params = { projectname: 'BST', scenario: expectedHref };
    controller.page = page;
    expect(page.state.runlatesthref).not.toBeDefined();
    await controller.onAfterLoadData(
      { name: 'skdodmerunlatestDS' },
      optimizationRunItem
    );
    expect(updateLatestHrefSpy).toHaveBeenCalled();
    expect(page.state.runlatesthref).toBe(expectedHref);
  });

  it('onAfterLoadData should update treegrid definition datasource', async () => {
    const controller = new WorkItemDetailsPageController();
    const dataAdapter = new JSONDataAdapter({
      src: [{ Toolbar: {}, Cols: [{}] }],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdef',
    });

    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    page.params = { startDate: '2023-11-13' };
    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    await ds.load();
    await controller.onAfterLoadData({ name: 'dispatchdef' }, {});

    expect(ds.items).toEqual([
      {
        Cols: [{ GanttZoomDate: 1699833600000 }],
        Toolbar: { DatePicker: '2023-11-13T00:00:00.000Z' },
        _bulkid: '0',
        _id: 0,
      },
    ]);
  });

  it('test the onValueChange', () => {
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const item = JSON.parse(JSON.stringify(sampleActivityItem));
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    page.state.disableSaveButton = true;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(item.computeChanged).toBe(true);
    expect(page.state.disableSaveButton).toBe(false);
  });

  it('test the onValueChange with other datasource', () => {
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const item = JSON.parse(JSON.stringify(sampleActivityItem));
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    page.state.disableSaveButton = true;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(item.computeChanged).toBeUndefined();
    expect(page.state.disableSaveButton).toBe(true);
  });

  it('goes to Dashboard page', async () => {
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();
    controller.app = app;
    controller.page = page;

    const setCurrentPageSpy = jest.spyOn(controller.app, 'setCurrentPage');
    controller.goToDashboardPage();
    expect(setCurrentPageSpy).toHaveBeenCalledWith('dispatch');
  });

  it('confirmation dialog saves when leaving page', async () => {
    const controller = new WorkItemDetailsPageController();
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    controller.app = app;
    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    await controller.onCustomSaveTransition();
    expect(saveStub.called).toBe(true);
    expect(app.toast.mock.calls.length).toBe(1);
  });

  it('confirmation dialog fails to save when leaving page', async () => {
    const controller = new WorkItemDetailsPageController();
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    controller.app = app;
    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ error: 'Error occurred' });

    await controller.onCustomSaveTransition();
    expect(saveStub.called).toBe(true);
    expect(app.toast.mock.calls.length).toBe(1);
  });
});
