import {
  JSONDataAdapter,
  Application,
  Datasource,
  Dialog,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import ScheduleDetailsPageController from '../ScheduleDetailsPageController';

const sampleItem = {
  id: 'BSTA1125',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'Install Fuel Pump',
  duration: '100',
  sneconstraint: '2022-02-18T14:57:17+00:00',
  fnlconstraint: '2022-02-19T14:57:17+00:00',
  wopriority: 1,
  interruptible: false,
};

const sampleResourceItem = {
  id: 'CRAFT_ELECT',
  name: 'ELECTRICIAN',
  objectname: 'RESOURCEOBJ',
};

const sampleActivityItem = {
  name: 'test task 1',
  wopriority: 1,
  duration: 10.5,
  sneconstraint: '2023-11-14T00:00:00.00Z',
  fnlconstraint: '2023-11-16T00:00:00.00Z',
  interruptible: false,
  starttime: '2023-11-14T00:00:00.00Z',
  endtime: '2023-11-14T08:00:00.00Z',
  status: 'WAPPR',
  skdprojectid: 64,
  id: 'BSTA001',
};

const runLatestItem = {
  member: [
    {
      skdscenariorunkpi_run_global: [
        {
          kpiid: 'Objective',
          kpivalue: 0.0,
        },
        {
          kpiid: 'TurnAroundTimeCost',
          kpivalue: 1120.0,
        },
        {
          kpiid: 'earlyTasksHours',
          kpivalue: 0.0,
        },
        {
          kpiid: 'earlyTasksNum',
          kpivalue: 0.0,
        },
        {
          kpiid: 'lateTasksHours',
          kpivalue: 0.0,
        },
        {
          kpiid: 'lateTasksNum',
          kpivalue: 0.0,
        },
        {
          kpiid: 'outsideTwTasksHours',
          kpivalue: 0.0,
        },
        {
          kpiid: 'outsideTwTasksNum',
          kpivalue: 0.0,
        },
        {
          kpiid: 'performedTasksNum',
          kpivalue: 119.0,
        },
        {
          kpiid: 'performedTasksNumPrct',
          kpivalue: 89.47,
        },
        {
          kpiid: 'requestFulfillmentHoursPrct',
          kpivalue: 86.44,
        },
        {
          kpiid: 'resourceAvailableHours',
          kpivalue: 1857.0,
        },
        {
          kpiid: 'resourceRequestedHours',
          kpivalue: 241.5,
        },
        {
          kpiid: 'resourceUnperformedHours',
          kpivalue: 32.75,
        },
        {
          kpiid: 'resourceUtilizationHours',
          kpivalue: 208.75,
        },
        {
          kpiid: 'resourceUtilizationPrct',
          kpivalue: 11.24,
        },
        {
          kpiid: 'resourcesNum',
          kpivalue: 27.0,
        },
        {
          kpiid: 'tasksNum',
          kpivalue: 133.0,
        },
        {
          kpiid: 'tasksWithTwNum',
          kpivalue: 147.0,
        },
        {
          kpiid: 'toolsAvailableHours',
          kpivalue: 760.0,
        },
        {
          kpiid: 'toolsNum',
          kpivalue: 19.0,
        },
        {
          kpiid: 'toolsRequestedHours',
          kpivalue: 130.75,
        },
        {
          kpiid: 'toolsUnperformedHours',
          kpivalue: 18.0,
        },
        {
          kpiid: 'toolsUtilizationHours',
          kpivalue: 112.75,
        },
        {
          kpiid: 'toolsUtilizationPrct',
          kpivalue: 14.84,
        },
        {
          kpiid: 'turnAroundTimeDays',
          kpivalue: 4.29,
        },
        {
          kpiid: 'unperformedHoursPrct',
          kpivalue: 13.56,
        },
        {
          kpiid: 'unperformedTasksNum',
          kpivalue: 14.0,
        },
        {
          kpiid: 'unperformedTasksNumPrct',
          kpivalue: 10.53,
        },
      ],
    },
  ],
};

function newDatasource(
  data = sampleItem,
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

describe('ScheduleDetailsPageController', () => {
  it('initialize page', () => {
    const controller = new ScheduleDetailsPageController();
    controller.pageInitialized(
      {
        state: { selectedTab: 1 },
        params: { startTime: '2022-01-01', gridEnd: '2022-03-01' },
      },
      { app: {} }
    );

    expect(controller.page).toEqual({
      params: { startTime: '2022-01-01', gridEnd: '2022-03-01' },
      state: {
        publishingcompleted: false,
        optimizationstarted: false,
        selectedTab: 0,
        useConfirmDialog: true,
      },
    });
  });

  // describe('ScheduleDetailsPageController', () => {
  //   it('initialize page', () => {
  //     const controller = new ScheduleDetailsPageController();
  //     controller.pageInitialized({ state: { selectedTab: 1 } }, { app: {} }, { params: { startdate: '2022-01-05' } });

  //     expect(controller.page).toEqual({
  //       state: {
  //         selectedTab: 0,
  //         useConfirmDialog: true,
  //         startTime: '2022-01-05',
  //       },
  //     });
  //   });

  it('switches tab when scheduling issues link is clicked', () => {
    const controller = new ScheduleDetailsPageController();
    controller.page = {
      state: {
        selectedTab: 0,
        useConfirmDialog: true,
      },
    };
    expect(controller.page.state.selectedTab).toBe(0);

    controller.openSchedulingIssuesTab();
    expect(controller.page.state.selectedTab).toBe(2);
  });

  it('switches tab when resource leveling link is clicked from a resource utilization cell', async () => {
    const controller = new ScheduleDetailsPageController();
    controller.page = {
      state: {
        selectedTab: 0,
        useConfirmDialog: true,
        startTime: '2022-01-01',
        resourceid: 'CRAFT_MECH',
      },
    };
    expect(controller.page.state.selectedTab).toBe(0);
    expect(controller.page.state.startTime).toEqual('2022-01-01');
    expect(controller.page.state.resourceid).toEqual('CRAFT_MECH');

    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    controller.app = app;
    page.registerController(controller);
    page.registerDatasource(resourcelevelingDS);
    app.registerPage(page);

    const forceReloadLevStub = sinon.stub(resourcelevelingDS, 'forceReload');
    await app.initialize();
    controller.pageInitialized(page, app);

    controller.openResourceLevelingTab({
      startdate: '2022-02-01',
      resourceid: 'CRAFT_ELECT',
    });

    expect(controller.page.state.selectedTab).toBe(1);
    expect(controller.page.state.startTime).toEqual('2022-02-01');
    expect(controller.page.state.resourceid).toEqual('CRAFT_ELECT');
    expect(forceReloadLevStub.called).toBe(true);

    const args = {
      item: {
        createddate: '2022-03-01',
        resourceid: 'AMCREWT_BSTOHL',
      },
    };
    controller.openResourceLevelingTab(args);

    expect(controller.page.state.startTime).toEqual('2022-03-01');
    expect(controller.page.state.resourceid).toEqual('AMCREWT_BSTOHL');
    expect(forceReloadLevStub.called).toBe(true);
  });

  it('refresh reloads datasource', async () => {
    const controller = new ScheduleDetailsPageController();
    const activityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const resourceDS = newDatasource(
      sampleResourceItem,
      'member',
      'id',
      'resourceTypesDS'
    );

    const app = new Application();
    const page = new Page({
      name: 'scheduleDetails',
      state: { resourceid: 'CRAFT_ELECT' },
    });

    app.toast = jest.fn();
    app.registerController(controller);
    app.registerPage(page);
    const sandbox = sinon.createSandbox();
    let invokeAction = sandbox.stub(projectsDS, 'invokeAction').returns({});
    const forceReloadStub = sinon.stub(projectsDS, 'forceReload');
    page.registerDatasource(activityDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(resourceDS);

    page.state.disableSaveButton = false;

    await resourceDS.load();

    await app.initialize();
    await controller.onRefresh();

    expect(controller.page.state.resourceid).toEqual('CRAFT_ELECT');

    expect(app.toast.mock.calls.length).toBe(1);
    expect(forceReloadStub.called).toBe(true);
    expect(page.state.disableSaveButton).toBe(true);

    page.name = 'invalidPageName';
    page.state.disableSaveButton = false;
    await controller.onRefresh(false);
    expect(page.state.disableSaveButton).toBe(false);
    expect(app.toast.mock.calls.length).toBe(1);

    expect(invokeAction.called).toBe(true);
    sandbox.restore();
    invokeAction = sinon
      .stub(projectsDS, 'invokeAction')
      .returns({ error: 'Error occurred' });
    await controller.onRefresh(true);
    await expect(app.toast.mock.calls.length).toBe(2);
  });

  it('Optimize with changes and without', async () => {
    const controller = new ScheduleDetailsPageController();
    const ds = newDatasource(sampleItem, 'member', 'id', 'skdprojectsDS');
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
    page.registerDatasource(ds);

    page.state.disableSaveButton = true;
    await app.initialize();

    const dialogSpy = jest.spyOn(page, 'showDialog');
    controller.optimizeDialog();
    expect(dialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    expect(page.state.disableSaveButton).toBe(true);

    page.state.disableSaveButton = false;
    controller.optimizeDialog();
    expect(dialogSpy).toHaveBeenCalledWith(
      'optimizeScheduleWithoutSavingDialog'
    );
    expect(page.state.disableSaveButton).toBe(false);
  });

  it('onAfterLoadData - with KPI data', async () => {
    const controller = new ScheduleDetailsPageController();
    const runds = newDatasource(
      runLatestItem,
      'member',
      'id',
      'skdodmerunlatestDS'
    );
    const activityds = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jglobalKPIds = newDatasource(
      sampleItem,
      'member',
      'id',
      'jglobalKPIds'
    );
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(runds);
    app.registerDatasource(jglobalKPIds);
    page.registerDatasource(activityds);
    page.registerDatasource(projectsDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    runds.load();
    await controller.onAfterLoadData(runds, runds.items);
    expect(jglobalKPIds.items).toBeDefined();
  });

  it('onAfterLoadData - no KPI data', async () => {
    const controller = new ScheduleDetailsPageController();
    const runds = newDatasource(
      { member: [{}] },
      'member',
      'id',
      'skdodmerunlatestDS'
    );
    const activityds = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jglobalKPIds = newDatasource(
      sampleItem,
      'member',
      'id',
      'jglobalKPIds'
    );
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(runds);
    app.registerDatasource(jglobalKPIds);
    page.registerDatasource(activityds);
    page.registerDatasource(projectsDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    runds.load();
    controller.onAfterLoadData(runds, runds.items);

    expect(jglobalKPIds.items).not.toBe(undefined);
  });

  it('it should be saved on user confirmation dialog save when leaving page', async () => {
    const controller = new ScheduleDetailsPageController();
    const activityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const resourceDS = newDatasource(
      sampleResourceItem,
      'member',
      'id',
      'resourceTypesDS'
    );

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });
    const forceReloadStub = sinon.stub(projectsDS, 'forceReload');

    page.registerDatasource(activityDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(resourceDS);
    page.state.disableSaveButton = false;
    await app.initialize();

    await resourceDS.load();
    await controller.onCustomSaveTransition();

    expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
    expect(forceReloadStub.called).toBe(true);
    expect(page.state.disableSaveButton).toBe(true);

    page.name = 'invalidPageName';
    page.state.disableSaveButton = false;
    controller.onCustomSaveTransition();
    expect(page.state.disableSaveButton).toBe(false);
  });

  it('tests getDataListCellValueDateGridTimeSeries', () => {
    let event = {
      item: {
        assetnum: 'assetnum-0',
        skdresourceviewday: [
          {
            createddate: '2022-01-01',
            availablehrs: 73,
            skdresourceviewday_activity: [
              {
                wopriority: 7,
                critical: false,
                objectname: 'WORKORDER',
                endtime: '2023-03-14T07:00:00-04:00',
                starttime: '2023-03-14T07:00:00-04:00',
                refobjname: 'WORKORDER',
                interruptible: false,
                parentid: 'WORKORDER_7230_BEDFORD_EAGLENA',
                duration: 4.533333333,
                objrowstamp: 698359,
                milestone: false,
                skdprojectid: 95,
                name: 'HVAC inspection & preparation',
                modified: true,
                initialized: true,
                href: null,
                id: 'WORKORDER_7232_BEDFORD_EAGLENA',
                objectid: 174,
                status: 'WAPPR',
              },
              {
                critical: false,
                objectname: 'WORKORDER',
                endtime: '2023-03-14T07:00:00-04:00',
                starttime: '2023-03-14T07:00:00-04:00',
                refobjname: 'WORKORDER',
                interruptible: false,
                parentid: 'WORKORDER_7230_BEDFORD_EAGLENA',
                objrowstamp: 698359,
                milestone: false,
                skdprojectid: 95,
                name: 'HVAC inspection & preparation',
                modified: true,
                initialized: true,
                href: null,
                id: 'WORKORDER_7232_BEDFORD_EAGLENA',
                objectid: 174,
              },
            ],
          },
          { createddate: '2022-01-02', availablehrs: 3 },
          { createddate: '2022-01-03', availablehrs: 40 },
        ],
      },
      key: '2022-01-01T00:00:00.00Z',
      index: 1,
      resultKey: 'result2',
    };

    const controller = new ScheduleDetailsPageController();
    controller.getDataListCellValueDateGridTimeSeries(event);
    expect(event.result2.hoursAvailable).toBe(73);
    expect(event.result2.datalistval[0].tags).toStrictEqual([
      { label: 'P7', type: 'red' },
      { label: '4:32', type: 'blue' },
      { label: 'WAPPR', type: 'green' },
    ]);
    expect(event.result2.datalistval[1].tags).toStrictEqual([]);

    event = {
      item: {
        assetnum: 'assetnum-0',
        skdresourceviewday: [
          { createddate: '2022-01-01', hoursAvailable: 73 },
          { createddate: '2022-01-02', hoursAvailable: 3 },
          { createddate: '2022-01-03', hoursAvailable: 40 },
        ],
      },
      key: '2021-01-02T00:00:00.00Z',
      index: 1,
      resultKey: 'result2',
    };
    controller.getDataListCellValueDateGridTimeSeries(event);
    expect(event.result2.hoursAvailable).toBe(0);

    event.ds = new Map([
      [
        0,
        {
          skdresourceviewday: [
            { createddate: '2022-01-01T00:00:00.00Z', load: 73 },
          ],
        },
      ],
    ]);

    controller.getDataListCellValueDateGridTimeSeries(event);
    expect(event.result2.hoursUtilized).toBe('--');
  });

  it('tests resource level colours', () => {
    const event = { value: 96 };

    const controller = new ScheduleDetailsPageController();
    controller.resourceLevelingIsDarkGreen(event);
    expect(event.matches).toBe(true);
    controller.resourceLevelingIsMediumGreen(event);
    expect(event.matches).toBe(false);
    controller.resourceLevelingIsLightGreen(event);
    expect(event.matches).toBe(false);
  });

  it('tests open sliding drawer and successfully save activity', async () => {
    const controller = new ScheduleDetailsPageController();
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jresourceLevelingTaskDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projActivityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojActivityDS'
    );

    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );
    const event = {
      name: 'test task 1',
      wopriority: 1,
      duration: 2.5,
      sneconstraint: '2023-11-14T00:00:00.00Z',
      fnlconstraint: '2023-11-16T00:00:00.00Z',
      interruptible: false,
      starttime: '2023-11-14T00:00:00.00Z',
      endtime: '2023-11-14T08:00:00.00Z',
      status: 'WAPPR',
      skdprojectid: 64,
      id: 'BSTA001',
    };
    activityDS.searchQBE = () =>
      Promise.resolve([
        {
          name: 'test task 1',
          wopriority: 1,
          duration: 2.6,
          sneconstraint: '2023-11-14T00:00:00.00Z',
          fnlconstraint: '2023-11-16T00:00:00.00Z',
          interruptible: false,
          starttime: '2023-11-14T00:00:00.00Z',
          endtime: '2023-11-14T08:00:00.00Z',
          status: 'WAPPR',
          skdprojectid: 64,
          id: 'BSTA001',
        },
      ]);

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    app.toast = jest.fn();

    const options = {
      name: 'detailsSlidingDrawer',
      configuration: {
        appResolver: () => app,
      },
    };
    const slidingDrawerDialog = new Dialog(options);
    page.registerDialog(slidingDrawerDialog);
    const forceReloadLevStub = sinon.stub(resourcelevelingDS, 'forceReload');
    const dialogCloseStub = sinon.stub(slidingDrawerDialog, 'closeDialog');

    page.registerDatasource(projectsDS);
    app.registerDatasource(jresourceLevelingTaskDS);
    page.registerDatasource(projActivityDS);
    page.registerDatasource(activityDS);
    page.registerDatasource(resourcelevelingDS);

    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();

    const dialogSpy = jest.spyOn(page, 'showDialog');
    controller.openDetailsSlidingDrawer(event);
    expect(dialogSpy).toHaveBeenCalledWith(
      'detailsSlidingDrawer',
      expect.objectContaining({ name: 'test task 1' })
    );

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    await controller.saveActivityChanges();
    expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
    expect(forceReloadLevStub.called).toBe(true);
    expect(dialogCloseStub.called).toBe(true);
  });

  it('tests open sliding drawer and successfully updates endtime and saves activity', async () => {
    const controller = new ScheduleDetailsPageController();
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jresourceLevelingTaskDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projActivityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojActivityDS'
    );

    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );
    const event = {
      name: 'test task 1',
      wopriority: 1,
      duration: 10.5,
      sneconstraint: '2023-11-14T00:00:00.00Z',
      fnlconstraint: '2023-11-16T00:00:00.00Z',
      interruptible: false,
      starttime: '2023-11-14T00:00:00.00Z',
      endtime: '2023-11-14T08:00:00.00Z',
      status: 'WAPPR',
      skdprojectid: 64,
      id: 'BSTA001',
    };
    activityDS.searchQBE = () =>
      Promise.resolve([
        {
          name: 'test task 1',
          wopriority: 1,
          duration: 2.6,
          sneconstraint: '2023-11-14T00:00:00.00Z',
          fnlconstraint: '2023-11-16T00:00:00.00Z',
          interruptible: false,
          starttime: '2023-11-14T00:00:00.00Z',
          endtime: '2023-11-14T08:00:00.00Z',
          status: 'WAPPR',
          skdprojectid: 64,
          id: 'BSTA001',
        },
      ]);

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    app.toast = jest.fn();

    const options = {
      name: 'detailsSlidingDrawer',
      configuration: {
        appResolver: () => app,
      },
    };
    const slidingDrawerDialog = new Dialog(options);
    page.registerDialog(slidingDrawerDialog);
    const forceReloadLevStub = sinon.stub(resourcelevelingDS, 'forceReload');
    const dialogCloseStub = sinon.stub(slidingDrawerDialog, 'closeDialog');

    page.registerDatasource(projectsDS);
    app.registerDatasource(jresourceLevelingTaskDS);
    app.registerDatasource(projActivityDS);
    page.registerDatasource(activityDS);
    page.registerDatasource(resourcelevelingDS);
    app.registerDatasource(activityDS);

    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();

    const dialogSpy = jest.spyOn(page, 'showDialog');
    controller.openDetailsSlidingDrawer(event);
    expect(dialogSpy).toHaveBeenCalledWith(
      'detailsSlidingDrawer',
      expect.objectContaining({ name: 'test task 1' })
    );

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    await controller.saveActivityChanges();
    expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
    expect(forceReloadLevStub.called).toBe(true);
    expect(dialogCloseStub.called).toBe(true);
  });

  it('tests open sliding drawer and fail to save activity', async () => {
    const controller = new ScheduleDetailsPageController();
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jresourceLevelingTaskDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projActivityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojActivityDS'
    );

    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );
    const event = {
      name: 'test task 1',
      wopriority: 1,
      duration: 2.5,
      sneconstraint: '2023-11-14T00:00:00.00Z',
      fnlconstraint: '2023-11-16T00:00:00.00Z',
      interruptible: false,
      starttime: '2023-11-14T00:00:00.00Z',
      endtime: '2023-11-14T08:00:00.00Z',
      status: 'WAPPR',
      skdprojectid: 64,
      id: 'BSTA001',
    };

    activityDS.searchQBE = () =>
      Promise.resolve([
        {
          name: 'test task 1',
          wopriority: 1,
          duration: 2.6,
          sneconstraint: '2023-11-14T00:00:00.00Z',
          fnlconstraint: '2023-11-16T00:00:00.00Z',
          interruptible: false,
          starttime: '2023-11-14T00:00:00.00Z',
          endtime: '2023-11-14T08:00:00.00Z',
          status: 'WAPPR',
          skdprojectid: 64,
          id: 'BSTA001',
        },
      ]);

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    app.toast = jest.fn();

    const options = {
      name: 'detailsSlidingDrawer',
      configuration: {
        appResolver: () => app,
      },
    };
    const slidingDrawerDialog = new Dialog(options);
    page.registerDialog(slidingDrawerDialog);
    const forceReloadLevStub = sinon.stub(resourcelevelingDS, 'forceReload');
    const dialogCloseStub = sinon.stub(slidingDrawerDialog, 'closeDialog');

    page.registerDatasource(projectsDS);
    app.registerDatasource(jresourceLevelingTaskDS);
    page.registerDatasource(projActivityDS);
    page.registerDatasource(activityDS);
    page.registerDatasource(resourcelevelingDS);

    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();

    const dialogSpy = jest.spyOn(page, 'showDialog');
    controller.openDetailsSlidingDrawer(event);
    expect(dialogSpy).toHaveBeenCalledWith(
      'detailsSlidingDrawer',
      expect.objectContaining({ name: 'test task 1' })
    );

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ error: 'Error occurred' });

    await controller.saveActivityChanges();
    expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
    expect(forceReloadLevStub.called).toBe(true);
    expect(dialogCloseStub.called).toBe(true);
  });

  it('tests open sliding drawer and fail to find activity for save', async () => {
    const controller = new ScheduleDetailsPageController();
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jresourceLevelingTaskDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projActivityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojActivityDS'
    );

    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );
    const event = {
      name: 'test task 1',
      wopriority: 1,
      duration: 2.5,
      sneconstraint: '2023-11-14T00:00:00.00Z',
      fnlconstraint: '2023-11-16T00:00:00.00Z',
      interruptible: false,
      starttime: '2023-11-14T00:00:00.00Z',
      endtime: '2023-11-14T08:00:00.00Z',
      status: 'WAPPR',
      skdprojectid: 64,
      id: 'BSTA001',
    };

    activityDS.searchQBE = () => Promise.resolve([]);

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    app.toast = jest.fn();

    const options = {
      name: 'detailsSlidingDrawer',
      configuration: {
        appResolver: () => app,
      },
    };
    const slidingDrawerDialog = new Dialog(options);
    page.registerDialog(slidingDrawerDialog);
    const forceReloadLevStub = sinon.stub(resourcelevelingDS, 'forceReload');
    const dialogCloseStub = sinon.stub(slidingDrawerDialog, 'closeDialog');

    page.registerDatasource(projectsDS);
    app.registerDatasource(jresourceLevelingTaskDS);
    page.registerDatasource(projActivityDS);
    page.registerDatasource(activityDS);
    page.registerDatasource(resourcelevelingDS);

    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();

    const dialogSpy = jest.spyOn(page, 'showDialog');
    controller.openDetailsSlidingDrawer(event);
    expect(dialogSpy).toHaveBeenCalledWith(
      'detailsSlidingDrawer',
      expect.objectContaining({ name: 'test task 1' })
    );

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ error: 'Error occurred' });

    await controller.saveActivityChanges();
    expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(false);
    expect(forceReloadLevStub.called).toBe(false);
    expect(dialogCloseStub.called).toBe(true);
  });

  it('tests open sliding drawer where event name is undefined, workordernum used', async () => {
    const controller = new ScheduleDetailsPageController();
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jresourceLevelingTaskDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projActivityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojActivityDS'
    );

    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );
    const event = {
      wopriority: 1,
      duration: 2.5,
      sneconstraint: '2023-11-14T00:00:00.00Z',
      fnlconstraint: '2023-11-16T00:00:00.00Z',
      interruptible: false,
      starttime: '2023-11-14T00:00:00.00Z',
      endtime: '2023-11-14T08:00:00.00Z',
      status: 'WAPPR',
      skdprojectid: 64,
      id: 'BSTA001',
      workordernum: 'RFAB1218',
    };

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    app.toast = jest.fn();

    const options = {
      name: 'detailsSlidingDrawer',
      configuration: {
        appResolver: () => app,
      },
    };
    const slidingDrawerDialog = new Dialog(options);
    page.registerDialog(slidingDrawerDialog);

    page.registerDatasource(projectsDS);
    app.registerDatasource(jresourceLevelingTaskDS);
    page.registerDatasource(projActivityDS);
    page.registerDatasource(activityDS);
    page.registerDatasource(resourcelevelingDS);

    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();

    const dialogSpy = jest.spyOn(page, 'showDialog');
    controller.openDetailsSlidingDrawer(event);
    expect(dialogSpy).toHaveBeenCalledWith(
      'detailsSlidingDrawer',
      expect.objectContaining({ name: 'RFAB1218' })
    );
  });

  it('close sliding drawer on cancel', async () => {
    const controller = new ScheduleDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jresourceLevelingTaskDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    const event = {
      name: 'test task 1',
      wopriority: 1,
      duration: 2.5,
      sneconstraint: '2023-11-14T00:00:00.00Z',
      fnlconstraint: '2023-11-16T00:00:00.00Z',
      interruptible: false,
      starttime: '2023-11-14T00:00:00.00Z',
      status: 'WAPPR',
    };
    app.registerPage(page);
    page.registerDatasource(projectsDS);
    app.registerDatasource(jresourceLevelingTaskDS);

    const options = {
      name: 'detailsSlidingDrawer',
      configuration: {
        appResolver: () => app,
      },
    };
    const slidingDrawerDialog = new Dialog(options);
    page.registerDialog(slidingDrawerDialog);
    app.registerController(controller);
    await app.initialize();

    controller.openDetailsSlidingDrawer(event);

    const dialogCloseStub = sinon.stub(slidingDrawerDialog, 'closeDialog');

    controller.closeDetailsSlidingDrawer();
    expect(dialogCloseStub.called).toBe(true);
  });

  it('it should be saved on user confirmation dialog save when leaving page, but there was an error saving', async () => {
    const controller = new ScheduleDetailsPageController();
    const activityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const resourceDS = newDatasource(
      sampleResourceItem,
      'member',
      'id',
      'resourceTypesDS'
    );

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ error: 'Error occurred' });
    page.registerDatasource(activityDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(resourceDS);
    page.state.disableSaveButton = false;
    await app.initialize();
    await resourceDS.load();
    await controller.onCustomSaveTransition();

    await expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
  });

  it('get resource utilization cell value', () => {
    const controller = new ScheduleDetailsPageController();
    const expectedValue = {
      item: {
        skdresourceviewday: [
          {
            createddate: '2022-01-01',
            load: 100,
            resourceid: 1,
            availablehrs: 80,
            scheduledhrs: 20,
            utilization: 100,
          },
          {
            createddate: '2022-01-02',
            load: 90,
            utilization: 90,
          },
          {
            createddate: '2022-01-03',
            load: 80,
            utilization: 80,
          },
          {
            createddate: '2022-01-04',
            load: 70,
            utilization: 70,
          },
          {
            createddate: '2022-01-05',
            load: 110,
            utilization: 110,
          },
          {
            createddate: '2022-01-06',
            load: 0,
            utilization: 0,
          },
        ],
      },
      key: '2022-01-01',
      resultKey: 'Machinist',
    };

    const item = {
      skdresourceviewday: [
        {
          resourceid: 1,
          availablehrs: 80.0,
          createddate: '2022-01-01',
          load: 100,
          scheduledhrs: 20,
          utilization: 100,
        },
        { createddate: '2022-01-02', load: 90, utilization: 90 },
        { createddate: '2022-01-03', load: 80, utilization: 80 },
        { createddate: '2022-01-04', load: 70, utilization: 70 },
        { createddate: '2022-01-05', load: 110, utilization: 110 },
        { createddate: '2022-01-06', load: 0, utilization: 0 },
      ],
    };

    expect(
      controller.getResourceLoadCellValue({
        item,
        key: '2022-01-01',
        resultKey: 'Machinist',
      })
    ).toEqual({
      Machinist: {
        availablehrs: '20:00',
        backgroundColor: '#42BE65',
        createddate: '2022-01-01',
        hideText: true,
        load: '',
        resourceid: 1,
        scheduledhrs: '20:00',
        textColor: 'text-02',
        utilization: 100,
      },
      ...expectedValue,
    });

    expectedValue.key = '2022-01-02';
    expect(
      controller.getResourceLoadCellValue({
        item,
        key: '2022-01-02',
        resultKey: 'Machinist',
      })
    ).toEqual({
      Machinist: {
        availablehrs: 0,
        backgroundColor: '#70DC8C',
        createddate: '2022-01-02',
        hideText: true,
        load: '',
        scheduledhrs: 0,
        textColor: 'text-02',
        utilization: 90,
      },
      ...expectedValue,
    });

    expectedValue.key = '2022-01-03';
    expect(
      controller.getResourceLoadCellValue({
        item,
        key: '2022-01-03',
        resultKey: 'Machinist',
      })
    ).toEqual({
      Machinist: {
        availablehrs: 0,
        backgroundColor: '#A7F0BA',
        createddate: '2022-01-03',
        hideText: false,
        load: '80%',
        scheduledhrs: 0,
        textColor: 'text-02',
        utilization: 80,
      },
      ...expectedValue,
    });

    expectedValue.key = '2022-01-04';
    expect(
      controller.getResourceLoadCellValue({
        item,
        key: '2022-01-04',
        resultKey: 'Machinist',
      })
    ).toEqual({
      Machinist: {
        availablehrs: 0,
        backgroundColor: '#F1C21B',
        createddate: '2022-01-04',
        hideText: false,
        load: '70%',
        scheduledhrs: 0,
        textColor: 'text-02',
        utilization: 70,
      },
      ...expectedValue,
    });

    expectedValue.key = '2022-01-05';
    expect(
      controller.getResourceLoadCellValue({
        item,
        key: '2022-01-05',
        resultKey: 'Machinist',
      })
    ).toEqual({
      Machinist: {
        availablehrs: 0,
        backgroundColor: '#DA1E28',
        createddate: '2022-01-05',
        hideText: false,
        load: '110%',
        scheduledhrs: 0,
        textColor: 'text-04',
        utilization: 110,
      },
      ...expectedValue,
    });

    expectedValue.key = '2022-01-06';
    expect(
      controller.getResourceLoadCellValue({
        item,
        key: '2022-01-06',
        resultKey: 'Machinist',
      })
    ).toEqual({
      Machinist: {
        availablehrs: 0,
        backgroundColor: 'ui-02',
        createddate: '2022-01-06',
        hideText: true,
        load: '',
        scheduledhrs: 0,
        textColor: 'text-02',
        utilization: 0,
      },
      ...expectedValue,
    });
  });

  it('moves to next set of data', () => {
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const controller = new ScheduleDetailsPageController();

    const event = {
      startTime: '2022-01-05',
      timeSpan: '14D',
    };

    app.registerController(controller);
    app.registerPage(page);

    app.initialize();

    page.state.endTime = '';
    page.state.startTime = '';
    page.state.timeSpan = 0;
    controller.app = app;
    controller.moveNext(event);

    expect(page.state.startTime).toEqual('2022-01-05');
    expect(page.state.timeSpan).toEqual(event.timeSpan);
  });

  it('switches tab and reloads data source when resource leveling tab is clicked', async () => {
    const controller = new ScheduleDetailsPageController();
    controller.page = {
      state: {
        selectedTab: 0,
        startTime: '2022-01-01',
        resourceid: 'CRAFT_MECH',
      },
    };
    expect(controller.page.state.selectedTab).toBe(0);
    expect(controller.page.state.startTime).toEqual('2022-01-01');
    expect(controller.page.state.resourceid).toEqual('CRAFT_MECH');

    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const resourceDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceTypesDS'
    );
    const resourcelevelingDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLevelingDs'
    );
    const resourceloadDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'resourceLoadTableds'
    );
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    controller.app = app;
    page.registerController(controller);

    app.registerDatasource(projectsDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(resourceDS);
    page.registerDatasource(resourcelevelingDS);
    page.registerDatasource(resourceloadDS);
    app.registerPage(page);

    await resourceDS.load();
    const forceReloadLevStub = sinon.stub(resourcelevelingDS, 'forceReload');
    const forceReloadLoadStub = sinon.stub(resourceloadDS, 'forceReload');
    await app.initialize();
    controller.pageInitialized(page, app);

    controller.switchTabs({ selectedTab: 0 });
    expect(controller.page.state.selectedTab).toBe(0);
    expect(forceReloadLoadStub.called).toBe(true);

    controller.switchTabs({ selectedTab: 2 });
    expect(controller.page.state.selectedTab).toBe(2);
    expect(controller.page.state.resourceid).toEqual('BSTA1125');
    expect(forceReloadLevStub.called).toBe(true);
  });

  it('test the onValueChange function for unscheduled', () => {
    let newSampleItem = {
      id: 'BSTA1125',
      scenarioname: 'BST_GS',
      skdprojectid: 88,
      name: 'Install Fuel Pump',
      duration: '2',
      sneconstraint: '2022-02-19T14:57:17+00:00',
      fnlconstraint: '2022-02-20T14:57:17+00:00',
      wopriority: 1,
      interruptible: false,
    };

    let ds = newDatasource(
      newSampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    let item = JSON.parse(JSON.stringify(newSampleItem));
    const controller = new ScheduleDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
    page.registerDatasource(ds);
    page.state.disableSaveButton = false;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });

    expect(page.state.disableSaveButton).toBe(false);

    newSampleItem = {
      id: 'BSTA1125',
      scenarioname: 'BST_GS',
      skdprojectid: 88,
      name: 'Install Fuel Pump',
      duration: '-2',
      wopriority: 1,
      interruptible: false,
    };

    ds = newDatasource(
      newSampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    item = JSON.parse(JSON.stringify(newSampleItem));

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });

    expect(page.state.disableSaveButton).toBe(true);
  });

  it('test the onValueChange function for resource leveling json datasource', () => {
    let newSampleItem = {
      id: 'BSTA1125',
      scenarioname: 'BST_GS',
      skdprojectid: 88,
      name: 'Install Fuel Pump',
      duration: '1',
      sneconstraint: '2022-02-19T14:57:17+00:00',
      fnlconstraint: '2022-02-20T14:57:17+00:00',
      wopriority: 1,
      interruptible: false,
    };

    let ds = newDatasource(
      newSampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    let item = JSON.parse(JSON.stringify(newSampleItem));
    const controller = new ScheduleDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
    page.registerDatasource(ds);
    page.state.disableSaveButton = false;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });

    expect(page.state.disableSaveOnResourceLeveling).toBe(false);

    newSampleItem = {
      id: 'BSTA1125',
      scenarioname: 'BST_GS',
      skdprojectid: 88,
      name: 'Install Fuel Pump',
      duration: '-2',
      wopriority: 1,
      interruptible: false,
    };

    ds = newDatasource(
      newSampleItem,
      'member',
      'id',
      'jresourceLevelingTaskDS'
    );
    item = JSON.parse(JSON.stringify(newSampleItem));

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });

    expect(page.state.disableSaveOnResourceLeveling).toBe(true);

    page.name = 'invaldPageName';
    page.state.disableSaveOnResourceLeveling = true;

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(page.state.disableSaveOnResourceLeveling).toBe(true);
  });

  it('sets issue status and icon color when item updated', () => {
    const ds = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const item = JSON.parse(JSON.stringify(sampleItem));
    const controller = new ScheduleDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
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

    page.name = 'invaldPageName';
    page.state.disableSaveButton = true;

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(page.state.disableSaveButton).toBe(true);
  });

  it('does not set status for other datasources', () => {
    const ds = newDatasource(sampleItem, 'member', 'id', 'skdactivityDS');
    const item = JSON.parse(JSON.stringify(sampleItem));
    const controller = new ScheduleDetailsPageController();

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(item.computeChanged).toBeUndefined();
  });
});
