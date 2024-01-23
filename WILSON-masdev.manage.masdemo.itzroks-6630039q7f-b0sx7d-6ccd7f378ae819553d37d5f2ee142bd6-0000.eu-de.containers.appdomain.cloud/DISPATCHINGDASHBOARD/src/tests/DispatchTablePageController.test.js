import {
  Application,
  Page,
  Datasource,
  JSONDataAdapter,
  AppSwitcher,
  MaximoAppSwitcher,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import DispatchTablePageController from '../DispatchTablePageController';
import sampleProjectItem from '../model/sampleProjectItem';

const projectItemValidRunID = {
  description: 'Boston Dispatch Schedule',
  scenarioname: 'BST_GS',
  skdprojectid: 89,
  name: 'BST_GS2',
  optimizationstatus: 'PROCESSED',
  skdodmerunid: 4,
  optimizationendtime: '2022-02-18T14:57:17+00:00',
  unscheduledcount: 0,
};

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

describe('DispatchTablePageController', () => {
  it('initialize page', async () => {
    const runds = newDatasource(
      { member: [{ skdodmerunid: 1 }] },
      'member',
      'id',
      'skdodmerunDS'
    );
    const controller = new DispatchTablePageController();
    const app = new Application();
    const page = new Page({ name: 'dispatch' });
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
    const controller = new DispatchTablePageController();
    const runds = newDatasource(
      { member: [{ skdodmerunid: 1 }] },
      'member',
      'id',
      'skdodmerunDS'
    );

    const app = new Application();
    const page = new Page({ name: 'dispatch' });
    const runDSLoadStub = sinon.stub(runds, 'load');
    app.registerController(controller);
    app.registerDatasource(runds);
    app.initialize();
    controller.pageInitialized(page, app);

    await controller.pageResumed();
    expect(runDSLoadStub.called).toBe(true);
  });

  it('invokes AppSwitcher when loadApp', async () => {
    const controller = new DispatchTablePageController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    AppSwitcher.setImplementation(MaximoAppSwitcher, { app });
    const switcher = AppSwitcher.get();
    const gotoApplicationSpy = jest.spyOn(switcher, 'gotoApplication');

    const loadAppArgs = {
      appName: 'Dispatcher',
      context: { context: 1 },
      options: { embedded: true },
    };
    controller.loadApp(loadAppArgs);
    expect(gotoApplicationSpy).toHaveBeenCalledWith(
      loadAppArgs.appName,
      loadAppArgs.context,
      loadAppArgs.options
    );

    controller.loadApp();
    expect(gotoApplicationSpy).toHaveBeenCalledWith('RLASSIGN', {}, {});

    expect(gotoApplicationSpy).toHaveBeenCalledTimes(2);
  });

  it('Reloads datasource', async () => {
    const controller = new DispatchTablePageController();
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
      'myDispatchSchedules'
    );
    const myCommitSchedulesDS = newDatasource(
      projectItemValidRunID,
      'member',
      'id',
      'myDispatchCommitSchedules'
    );

    const app = new Application();
    const page = new Page({ name: 'dispatch' });

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

    page.state.selectedDatasource = 'myDispatchSchedules';
    await controller.onReload();
    expect(mySchedulesForceReloadStub.called).toBe(true);
    expect(runDSForceReloadStub.called).toBe(true);

    page.state.selectedDatasource = 'myDispatchCommitSchedules';
    await controller.onReload();
    expect(myCommitSchedulesForceReloadStub.called).toBe(true);
  });

  it('Reloads datasource, but not runDS', async () => {
    const controller = new DispatchTablePageController();
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
      'myDispatchSchedules'
    );

    const app = new Application();
    const page = new Page({ name: 'dispatch' });

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

    page.state.selectedDatasource = 'myDispatchSchedules';
    await controller.onReload(false);
    expect(mySchedulesForceReloadStub.called).toBe(true);
    expect(runDSForceReloadStub.called).toBe(false);
  });
});
