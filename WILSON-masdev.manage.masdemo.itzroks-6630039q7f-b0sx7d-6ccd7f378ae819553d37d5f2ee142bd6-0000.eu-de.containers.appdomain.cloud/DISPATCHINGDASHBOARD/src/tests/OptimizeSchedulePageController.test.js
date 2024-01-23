import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import sampleProjectItem from '../model/sampleProjectItem';
import OptimizeSchedulePageController from '../OptimizeSchedulePageController';

function newDatasource(
  data = sampleProjectItem,
  items = 'member',
  idAttribute = 'id',
  name = 'skdactivityForOptimizeDS'
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

const optimizeSummaryItem = {
  member: [
    {
      lvl: 0,
      availablehours: 0,
      skillname: 'BSTBTRUCK_SET1',
      shiftname: 'DAYS',
      loadhours: 0,
    },
  ],
};

const optimizeAlertItem = {
  member: [
    {
      severity: 'WARNING',
      alerttype: 'DurationOverThreshold',
      message: 'Work order has long duration',
    },
  ],
};

const runLatestItemProcessing = {
  member: [
    {
      optimizationstatus: 'PROCESSING',
    },
  ],
};

const runLatestItemProcessed = {
  member: [
    {
      optimizationstatus: 'PROCESSED',
      skdodmeresourcesummary: [
        {
          lvl: 0,
          availablehours: 0,
          skillname: 'BSTBTRUCK_SET1',
          shiftname: 'DAYS',
          loadhours: 0,
        },
      ],
      skdopascpsalert: [
        {
          severity: 'WARNING',
          alerttype: 'DurationOverThreshold',
          message: 'Work order has long duration',
        },
      ],
    },
  ],
};

const runLatestItemProcessedNoSummary = {
  member: [
    {
      optimizationstatus: 'PROCESSED',
      skdopascpsalert: [
        {
          severity: 'WARNING',
          alerttype: 'DurationOverThreshold',
          message: 'Work order has long duration',
        },
      ],
    },
  ],
};

describe('OptimizeSchedulePageController', () => {
  it('pageResumed will retry', async () => {
    const controller = new OptimizeSchedulePageController();
    controller.extraWaitTime = 0;
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );

    const runDS = newDatasource(
      runLatestItemProcessing,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );

    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );

    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    page.params.timelimit = 2;
    page.params.interval = 1;
    const projectLoadStub = sinon.stub(projectsDS, 'load');

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(projectsDS);
    page.registerDatasource(runDS);
    app.registerDatasource(runDS);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);

    const rundsLoadSpy = jest.spyOn(runDS, 'load');
    const jSummarySpy = jest.spyOn(jOptimizeSummaryDS, 'load');
    const jAlertSpy = jest.spyOn(jOptimizeSummaryDS, 'load');
    await app.initialize();
    await controller.pageResumed();

    expect(projectLoadStub.called).toBe(true);
    expect(rundsLoadSpy).toHaveBeenCalledTimes(6);
    expect(jSummarySpy).toHaveBeenCalledTimes(4);
    expect(jAlertSpy).toHaveBeenCalledTimes(4);
  });

  it('pageResumed will load alerts and summary for PROCESSED state', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );
    const runDS = newDatasource(
      runLatestItemProcessed,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );

    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );

    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    page.params.timelimit = 2;
    page.params.interval = 1;
    const projectLoadStub = sinon.stub(projectsDS, 'load');

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(projectsDS);
    page.registerDatasource(runDS);
    app.registerDatasource(runDS);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);

    const rundsLoadSpy = jest.spyOn(runDS, 'load');
    const jSummarySpy = jest.spyOn(jOptimizeSummaryDS, 'load');
    const jAlertSpy = jest.spyOn(jOptimizeSummaryDS, 'load');
    await app.initialize();
    await controller.pageResumed();

    expect(projectLoadStub.called).toBe(true);
    expect(rundsLoadSpy).toHaveBeenCalledTimes(2);
    expect(jSummarySpy).toHaveBeenCalled();
    expect(jAlertSpy).toHaveBeenCalled();
  });

  it('pageResumed will load alerts, summary empty for PROCESSED state', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );
    const runDS = newDatasource(
      runLatestItemProcessedNoSummary,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );

    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );

    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    page.params.timelimit = 2;
    page.params.interval = 1;
    const projectLoadStub = sinon.stub(projectsDS, 'load');

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(projectsDS);
    page.registerDatasource(runDS);
    app.registerDatasource(runDS);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);

    const rundsLoadSpy = jest.spyOn(runDS, 'load');
    const jSummarySpy = jest.spyOn(jOptimizeSummaryDS, 'load');
    const jAlertSpy = jest.spyOn(jOptimizeSummaryDS, 'load');
    await app.initialize();
    await controller.pageResumed();

    expect(projectLoadStub.called).toBe(true);
    expect(rundsLoadSpy).toHaveBeenCalledTimes(2);
    expect(jSummarySpy).toHaveBeenCalled();
    expect(jAlertSpy).toHaveBeenCalled();
  });

  it('onRefesh will reload data', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );

    const runds = newDatasource(
      runLatestItemProcessed,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );

    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );

    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });

    const rundsLoadSpy = jest.spyOn(runds, 'forceReload');

    app.registerController(controller);
    app.registerPage(page);
    app.registerDatasource(runds);
    page.registerDatasource(projectsDS);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);
    await app.initialize();
    controller.onRefresh();
    expect(rundsLoadSpy).toHaveBeenCalled();
  });

  it('correct status tag is generated', () => {
    const controller = new OptimizeSchedulePageController();

    const processedItem = {
      optimizationstatus: 'PROCESSED',
    };
    const processingItem = {
      optimizationstatus: 'PROCESSING',
    };
    const failedItem = {
      optimizationstatus: 'FAILED',
    };
    const noStatusItem = {
      NotOptimizationstatus: 'NONE',
    };
    let tag;
    tag = controller.computeOptimizationStatusTag(processingItem);
    expect(JSON.stringify(tag[0])).toContain('blue');

    tag = controller.computeOptimizationStatusTag(processedItem);
    expect(JSON.stringify(tag[0])).toContain('gray');

    tag = controller.computeOptimizationStatusTag(failedItem);
    expect(JSON.stringify(tag[0])).toContain('red');

    tag = controller.computeOptimizationStatusTag(noStatusItem);
    expect(tag).toBeNull();
  });

  it('goes to  Schedule details page', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );
    const runds = newDatasource(
      runLatestItemProcessed,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );
    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );
    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    app.registerController(controller);

    controller.app = app;
    app.registerPage(page);
    page.registerDatasource(projectsDS);
    page.registerDatasource(runds);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);
    await app.initialize();

    const setCurrentPageSpy = jest.spyOn(controller.app, 'setCurrentPage');
    controller.goToWorkItemDetailsPage();
    expect(setCurrentPageSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'workItemDetails' })
    );
  });

  it('opens the optimization progress log dialog', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );
    const runds = newDatasource(
      runLatestItemProcessed,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );
    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );
    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    app.registerController(controller);

    controller.app = app;
    app.registerPage(page);
    page.registerDatasource(projectsDS);
    page.registerDatasource(runds);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);

    await app.initialize();

    const showDialogSpy = jest.spyOn(controller.app, 'showDialog');
    await controller.openOptimizationProgressDialog();
    await expect(showDialogSpy).toHaveBeenCalledWith('optimizationProgressLog');
  });

  it('invokes optimization stop request - success', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );
    const runds = newDatasource(
      runLatestItemProcessed,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );
    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );
    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    app.registerController(controller);
    app.registerPage(page);
    app.registerDatasource(projectsDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(runds);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);
    await app.initialize();
    app.toast = jest.fn();
    const invokeAction = sinon.stub(projectsDS, 'invokeAction').returns({});

    await controller.stopOptimizationRun();
    expect(invokeAction.called).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);
  });

  it('invokes optimization stop request - failure', async () => {
    const controller = new OptimizeSchedulePageController();
    const projectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectForOptimizeDS'
    );
    const runds = newDatasource(
      runLatestItemProcessed,
      'member',
      'id',
      'skdodmerunForOptimizeDS'
    );
    const jOptimizeAlertsDS = newDatasource(
      optimizeAlertItem,
      'member',
      'id',
      'jOptimizeAlertsDS'
    );

    const jOptimizeSummaryDS = newDatasource(
      optimizeSummaryItem,
      'member',
      'id',
      'jOptimizeSummaryDS'
    );
    const app = new Application();
    const page = new Page({ name: 'optimizeSchedule' });
    app.registerController(controller);
    app.registerPage(page);
    app.registerDatasource(projectsDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(runds);
    page.registerDatasource(jOptimizeSummaryDS);
    page.registerDatasource(jOptimizeAlertsDS);
    await app.initialize();
    app.toast = jest.fn();
    const invokeAction = sinon
      .stub(projectsDS, 'invokeAction')
      .returns({ error: 'Error occurred' });

    await controller.stopOptimizationRun();
    expect(invokeAction.called).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);
  });

  it('formats fractional hours to hh:mm ', () => {
    const controller = new OptimizeSchedulePageController();
    expect(
      controller.formatFractionHours([
        {
          lvl: 0,
          availablehours: 254,
          skillname: 'CAB',
          shiftname: 'DAYS',
          loadhours: 18.75,
        },
      ])
    ).toStrictEqual([
      {
        availablehours: '2:00',
        loadhours: '6:45',
        lvl: 0,
        shiftname: 'DAYS',
        skillname: 'CAB',
      },
    ]);
  });
});
