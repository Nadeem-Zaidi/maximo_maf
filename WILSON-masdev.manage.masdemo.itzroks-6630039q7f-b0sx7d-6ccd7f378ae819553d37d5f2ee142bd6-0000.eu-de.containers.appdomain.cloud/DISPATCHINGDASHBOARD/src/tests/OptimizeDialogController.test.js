import {
  JSONDataAdapter,
  Application,
  Datasource,
  Dialog,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import OptimizeDialogController from '../OptimizeDialogController';
import sampleProjectItem from '../model/sampleProjectItem';

const projectScenarioItem = {
  member: [
    {
      id: 0,
      skdspatialparam: [
        {
          cmatchskill: false,
          cskdwindow: true,
          ccalendarbreak: false,
          crepairwindow: false,
          venforceams: false,
          venforceaos: false,
          venforcelms: false,
          venforcelos: false,
          timelimit: 30,
          vprioritydir: 'ASCENDING',
          cassigntimebuffer: 30,
          cincludepriority: 1,
          cmatchworkzone: false,
          matchlaborassignment: false,
          csecworkzone: false,
          sendmulticraft: false,
          cincludetraveltime: false,
          cperfbuffer: 20,
        },
        {
          cmatchskill: false,
          cskdwindow: true,
          ccalendarbreak: false,
          crepairwindow: false,
          venforceams: false,
          venforceaos: false,
          venforcelms: false,
          venforcelos: false,
          timelimit: 300,
          vprioritydir: 'ASCENDING',
          cassigntimebuffer: 30,
          cincludepriority: 1,
          cmatchworkzone: false,
          matchlaborassignment: false,
          csecworkzone: false,
          sendmulticraft: false,
          cincludetraveltime: false,
          cperfbuffer: 20,
        },
      ],
    },
  ],
};

function newDatasource(
  data = projectScenarioItem,
  items = 'member',
  idAttribute = 'id',
  name = 'skdprojectDS'
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

describe('OptimizeDialogController', () => {
  it('save optimization parameters and invoke optimizer', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    page.state.updateCronChecked = true;
    page.state.optimizationstarted = false;
    app.registerPage(page);

    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeWaitOptions = {
      name: 'optimizationInProgressDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeDialog = new Dialog(options);
    const optimizeWaitDialog = new Dialog(optimizeWaitOptions);
    page.registerDialog(optimizeDialog);
    page.registerDialog(optimizeWaitDialog);
    const controller = new OptimizeDialogController();
    app.registerController(controller);

    controller.dialogInitialized(optimizeDialog);
    controller.dialogOpened();
    expect(page.state.updateCronChecked).toBe(false);

    await skdprojectscenarioDS.load();
    app.registerDatasource(skdprojectscenarioDS);
    app.registerDatasource(skdprojectsDS);
    await app.initialize();
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(skdprojectscenarioDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    const invokeAction = sinon.stub(skdprojectsDS, 'invokeAction').returns({});
    const setCurrentPageStub = sinon.stub(app, 'setCurrentPage').returns({});

    await controller.saveAndGoToOptimizeSchedulePage();

    expect(saveStub.called).toBe(true);
    expect(page.state.useConfirmDialog).toBe(false);
    expect(page.state.optimizationstarted).toBe(true);
    expect(invokeAction.called).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);
    expect(setCurrentPageStub.called).toBe(true);

    page.state.updateCronChecked = true;
    await controller.saveAndGoToOptimizeSchedulePage();
    expect(saveStub.called).toBe(true);
    expect(page.state.useConfirmDialog).toBe(false);
    expect(invokeAction.called).toBe(true);
    expect(page.state.optimizationstarted).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(2);

    page.name = 'invaldPageName';
    page.state.optimizationstarted = false;
    await controller.saveAndGoToOptimizeSchedulePage();
    expect(invokeAction.called).toBe(true);
    expect(page.state.optimizationstarted).toBe(false);
  });

  it('save optimization parameters and invoke optimizer, no redirect', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    page.state.updateCronChecked = true;
    page.state.optimizationstarted = false;
    app.registerPage(page);

    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeWaitOptions = {
      name: 'optimizationInProgressDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeDialog = new Dialog(options);
    const optimizeWaitDialog = new Dialog(optimizeWaitOptions);
    page.registerDialog(optimizeDialog);
    page.registerDialog(optimizeWaitDialog);
    const controller = new OptimizeDialogController();
    app.registerController(controller);

    controller.dialogInitialized(optimizeDialog);
    controller.dialogOpened();
    expect(page.state.updateCronChecked).toBe(false);

    await skdprojectscenarioDS.load();
    app.registerDatasource(skdprojectscenarioDS);
    app.registerDatasource(skdprojectsDS);
    await app.initialize();
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(skdprojectscenarioDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    const invokeAction = sinon.stub(skdprojectsDS, 'invokeAction').returns({});
    const setCurrentPageStub = sinon.stub(app, 'setCurrentPage').returns({});

    page.state.redirect = false;
    await controller.saveAndGoToOptimizeSchedulePage();
    expect(saveStub.called).toBe(true);
    expect(page.state.useConfirmDialog).toBe(false);
    expect(page.state.optimizationstarted).toBe(true);
    expect(invokeAction.called).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);
    expect(setCurrentPageStub.called).toBe(false);
  });

  it('toast notification after unsuccessful optimization', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    page.state.updateCronChecked = true;
    app.registerPage(page);

    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeWaitOptions = {
      name: 'optimizationInProgressDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeDialog = new Dialog(options);
    const optimizeWaitDialog = new Dialog(optimizeWaitOptions);

    page.registerDialog(optimizeDialog);
    page.registerDialog(optimizeWaitDialog);
    const controller = new OptimizeDialogController();
    app.registerController(controller);

    controller.dialogInitialized(optimizeDialog);
    controller.dialogOpened();
    expect(page.state.updateCronChecked).toBe(false);

    await skdprojectscenarioDS.load();
    app.registerDatasource(skdprojectscenarioDS);
    app.registerDatasource(skdprojectsDS);
    await app.initialize();
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(skdprojectscenarioDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    const invokeAction = sinon
      .stub(skdprojectsDS, 'invokeAction')
      .returns({ error: 'Error occurred' });

    await controller.saveAndGoToOptimizeSchedulePage();

    expect(saveStub.called).toBe(true);
    expect(page.state.useConfirmDialog).toBe(false);
    expect(invokeAction.called).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);

    page.name = 'invaldPageName';
    page.state.optimizationstarted = false;
    await controller.saveAndGoToOptimizeSchedulePage();
    expect(invokeAction.called).toBe(true);
    expect(page.state.optimizationstarted).toBe(false);
  });

  it('toast notification after unsuccessful save', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      sampleProjectItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    page.state.updateCronChecked = true;
    app.registerPage(page);

    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };

    const optimizeDialog = new Dialog(options);
    page.registerDialog(optimizeDialog);
    const controller = new OptimizeDialogController();
    app.registerController(controller);

    controller.dialogInitialized(optimizeDialog);
    controller.dialogOpened();
    expect(page.state.updateCronChecked).toBe(false);

    await skdprojectscenarioDS.load();
    app.registerDatasource(skdprojectscenarioDS);
    app.registerDatasource(skdprojectsDS);
    await app.initialize();
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(skdprojectscenarioDS, 'save')
      .returns({ error: 'Error occurred' });
    const invokeAction = sinon.stub(skdprojectsDS, 'invokeAction').returns({});

    await controller.saveAndGoToOptimizeSchedulePage();

    expect(saveStub.called).toBe(true);
    expect(invokeAction.called).toBe(false);
    await expect(app.toast.mock.calls.length).toBe(1);
  });

  it('close dialog forces reload', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );

    page.state.updateCronChecked = true;
    app.registerPage(page);

    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };
    const optimizeDialog = new Dialog(options);
    page.registerDialog(optimizeDialog);
    const controller = new OptimizeDialogController();
    app.registerController(controller);
    await app.initialize();

    controller.dialogInitialized(optimizeDialog);
    await skdprojectscenarioDS.load();
    app.registerDatasource(skdprojectscenarioDS);
    const dialogCloseStub = sinon.stub(optimizeDialog, 'closeDialog');

    controller.dialogClosed();
    expect(dialogCloseStub.called).toBe(true);
  });

  it('test handleCronChecked', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    app.registerPage(page);
    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };
    const optimizeDialog = new Dialog(options);
    page.registerDialog(optimizeDialog);

    const controller = new OptimizeDialogController();
    controller.dialogInitialized(optimizeDialog);
    app.registerController(controller);
    app.registerPage(page);
    await app.initialize();

    page.state.updateCronChecked = true;
    controller.handleCronChecked();
    expect(page.state.updateCronChecked).toBe(false);

    page.state.updateCronChecked = false;
    controller.handleCronChecked();
    expect(page.state.updateCronChecked).toBe(true);
  });

  it('test handleRefreshIntervalChange', async () => {
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    app.registerPage(page);
    const options = {
      name: 'optimizeDialog',
      configuration: {
        appResolver: () => app,
      },
    };
    const optimizeDialog = new Dialog(options);
    page.registerDialog(optimizeDialog);

    const controller = new OptimizeDialogController();
    controller.dialogInitialized(optimizeDialog);
    app.registerController(controller);
    app.registerPage(page);
    await app.initialize();

    page.state.refreshinterval = 10;
    controller.handleRefreshIntervalChange({ target: { value: 5 } });
    expect(page.state.refreshinterval).toBe(5);
  });
});
