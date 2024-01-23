import {
  JSONDataAdapter,
  Application,
  Datasource,
  Dialog,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import OptimizeDialogController from '../OptimizeDialogController';

const projectItem = {
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

const projectScenarioItem = {
  member: [
    {
      id: 0,
      skdreslevelparam: [
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
          vperctavail: 100,
          cassigntimebuffer: 30,
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
          vperctavail: 100,
          cassigntimebuffer: 30,
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
    const page = new Page({ name: 'scheduleDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      projectItem,
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
      .returns({ _rowstamp: '986390', href: '' });

    const invokeAction = sinon.stub(skdprojectsDS, 'invokeAction').returns({});

    await controller.saveAndGoToOptimizeSchedulePage();

    expect(saveStub.called).toBe(true);
    expect(page.state.useConfirmDialog).toBe(false);
    expect(page.state.optimizationstarted).toBe(true);
    expect(invokeAction.called).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);

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

  it('toast notification after unsuccessful optimization', async () => {
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      projectItem,
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
    const page = new Page({ name: 'scheduleDetails' });
    const skdprojectscenarioDS = newDatasource(
      projectScenarioItem,
      'member',
      'id',
      'skdprojectscenarioDS'
    );
    const skdprojectsDS = newDatasource(
      projectItem,
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
    const page = new Page({ name: 'scheduleDetails' });
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
    const page = new Page({ name: 'scheduleDetails' });
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
    const page = new Page({ name: 'scheduleDetails' });
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
