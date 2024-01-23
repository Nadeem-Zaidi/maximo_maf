import {
  Application,
  Datasource,
  JSONDataAdapter,
  Page,
  AppSwitcher,
  MaximoAppSwitcher,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import ScheduleTablePageController from '../ScheduleTablePageController';
import sampleProjectItem from '../model/sampleProjectItem';

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

const projectItemValidRunID = {
  description: 'Boston Dispatch Schedule',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'BST_GS',
  optimizationstatus: 'PROCESSED',
  skdodmerunid: 1,
  optimizationendtime: '2022-02-18T14:57:17+00:00',
  unscheduledcount: 0,
};

describe('ScheduleTablePageController', () => {
  it('initialize page', async () => {
    const runds = newDatasource(
      { member: [{ skdodmerunid: 1 }] },
      'member',
      'id',
      'skdodmerunDS'
    );
    const controller = new ScheduleTablePageController();
    const app = new Application();
    const page = new Page({ name: 'schedule' });
    app.registerController(controller);
    app.registerDatasource(runds);

    app.initialize();
    controller.pageInitialized(page, app);
    controller.pageResumed();
    const rundsFromPage = app.findDatasource('skdodmerunDS');
    const rundsItems = await rundsFromPage.load();
    expect(rundsItems.length).toBe(1);
    expect(rundsItems[0].skdodmerunid).toBe(1);
  });

  it('resume page', async () => {
    const controller = new ScheduleTablePageController();
    const runds = newDatasource(
      { member: [{ skdodmerunid: 1 }] },
      'member',
      'id',
      'skdodmerunDS'
    );
    const mySchedulesDS = newDatasource(
      projectItemValidRunID,
      'member',
      'id',
      'mySchedules'
    );
    const app = new Application();
    const page = new Page({ name: 'schedule' });
    const mySchedulesForceReloadStub = sinon.stub(mySchedulesDS, 'forceReload');
    const runDSForceReloadStub = sinon.stub(runds, 'forceReload');
    const runDSLoadStub = sinon.stub(runds, 'load');
    app.registerController(controller);
    app.registerDatasource(runds);
    app.registerDatasource(mySchedulesDS);
    app.initialize();
    controller.pageInitialized(page, app);

    page.state.selectedDatasource = 'mySchedules';
    await controller.pageResumed();
    expect(mySchedulesForceReloadStub.called).toBe(true);
    expect(runDSLoadStub.called).toBe(true);
    expect(runDSForceReloadStub.called).toBe(false);
  });

  it('Reloads datasource', async () => {
    const controller = new ScheduleTablePageController();
    const runds = newDatasource(
      { member: [{ skdodmerunid: 1 }] },
      'member',
      'id',
      'skdodmerunDS'
    );

    const mySchedulesDS = newDatasource(
      projectItemValidRunID,
      'member',
      'id',
      'mySchedules'
    );
    const myCommitSchedulesDS = newDatasource(
      projectItemValidRunID,
      'member',
      'id',
      'myCommitSchedules'
    );

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.initialize();

    controller.pageInitialized(page, app);

    const mySchedulesForceReloadStub = sinon.stub(mySchedulesDS, 'forceReload');
    const myCommitSchedulesForceReloadStub = sinon.stub(
      myCommitSchedulesDS,
      'forceReload'
    );
    const runDSForceReloadStub = sinon.stub(runds, 'forceReload');
    page.registerDatasource(mySchedulesDS);
    page.registerDatasource(myCommitSchedulesDS);
    page.registerDatasource(runds);

    await controller.onReload(false);
    expect(mySchedulesForceReloadStub.called).not.toBe(true);
    expect(myCommitSchedulesForceReloadStub.called).not.toBe(true);
    expect(runDSForceReloadStub.called).toBe(false);

    page.state.selectedDatasource = 'mySchedules';
    await controller.onReload();
    expect(mySchedulesForceReloadStub.called).toBe(true);
    expect(runDSForceReloadStub.called).toBe(true);

    page.state.selectedDatasource = 'myCommitSchedules';
    await controller.onReload();
    expect(myCommitSchedulesForceReloadStub.called).toBe(true);
  });

  it('Reloads datasource, but not runDS', async () => {
    const controller = new ScheduleTablePageController();
    const runds = newDatasource(
      { member: [{ skdodmerunid: 1 }] },
      'member',
      'id',
      'skdodmerunDS'
    );

    const mySchedulesDS = newDatasource(
      projectItemValidRunID,
      'member',
      'id',
      'mySchedules'
    );

    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.initialize();

    controller.pageInitialized(page, app);

    const mySchedulesForceReloadStub = sinon.stub(mySchedulesDS, 'forceReload');
    const runDSForceReloadStub = sinon.stub(runds, 'forceReload');
    page.registerDatasource(mySchedulesDS);
    page.registerDatasource(runds);

    await controller.onReload(false);
    expect(mySchedulesForceReloadStub.called).not.toBe(true);
    expect(runDSForceReloadStub.called).toBe(false);

    page.state.selectedDatasource = 'mySchedules';
    await controller.onReload(false);
    expect(mySchedulesForceReloadStub.called).toBe(true);
    expect(runDSForceReloadStub.called).toBe(false);
  });
});

it('loadApp should invoke appswitcher method', async () => {
  const controller = new ScheduleTablePageController();
  const app = new Application();
  app.registerController(controller);
  await app.initialize();
  AppSwitcher.setImplementation(MaximoAppSwitcher, { app });
  const switcher = AppSwitcher.get();
  const gotoApplication = sinon.spy(switcher, 'gotoApplication');

  // calling with argument data
  controller.loadApp({ appName: 'SCHEDACM', options: {}, context: {} });
  sinon.assert.called(gotoApplication);

  // calling without appName
  controller.loadApp();
  sinon.assert.called(gotoApplication);

  // calling with appName but without options and context data
  controller.loadApp({ appName: 'SCHEDACM' });
  sinon.assert.called(gotoApplication);
});
