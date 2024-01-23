import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import AppController from '../AppController';

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

describe('AppController', () => {
  it('loads controller', async () => {
    const controller = new AppController();
    const appInitSpy = jest.spyOn(controller, 'applicationInitialized');
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });
  it('goes to Optimize Schedule page', async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);

    await app.initialize();

    const setCurrentPageSpy = jest.spyOn(controller.app, 'setCurrentPage');
    controller.goToOptimizeSchedulePage();
    expect(setCurrentPageSpy).toHaveBeenCalledWith('optimizeSchedule');
  });

  it('goes to Dashboard page', async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);

    await app.initialize();

    const setCurrentPageSpy = jest.spyOn(controller.app, 'setCurrentPage');
    controller.goToDashboardPage();
    expect(setCurrentPageSpy).toHaveBeenCalledWith('schedule');
  });

  it('opens the optimization dialog and discards changes', async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const ds = newDatasource(
      controller.sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    app.registerController(controller);
    app.registerDatasource(ds);
    app.registerPage(page);
    await app.initialize();

    page.state.disableSaveButton = false;
    const showDialogSpy = jest.spyOn(controller.app, 'showDialog');
    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ _rowstamp: '986390', href: '' });
    await controller.showOptimizeDialog();
    expect(saveStub.called).toBe(false);
    await expect(showDialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    expect(page.state.disableSaveButton).toBe(true);

    page.name = 'invaldPageName';
    page.state.disableSaveButton = false;
    await controller.showOptimizeDialog();
    expect(saveStub.called).toBe(false);
    await expect(showDialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    expect(page.state.disableSaveButton).toBe(false);
    expect(showDialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
  });

  it('opens the optimization dialog after successful saving', async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const ds = newDatasource(
      controller.sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    app.registerController(controller);
    app.registerDatasource(ds);
    app.registerPage(page);
    await app.initialize();

    page.state.disableSaveButton = false;
    const showDialogSpy = jest.spyOn(controller.app, 'showDialog');
    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ _rowstamp: '986390', href: '' });
    await controller.handleSaveAndShowOptimizeDialog();
    expect(saveStub.called).toBe(true);
    await expect(showDialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    expect(page.state.disableSaveButton).toBe(true);

    page.name = 'invaldPageName';
    page.state.disableSaveButton = false;
    await controller.handleSaveAndShowOptimizeDialog();
    expect(saveStub.called).toBe(true);
    await expect(showDialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    expect(page.state.disableSaveButton).toBe(false);
  });

  it('opens toast on unsuccessful save', async () => {
    const controller = new AppController();
    const app = new Application();
    const ds = newDatasource(
      controller.sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    app.registerController(controller);
    app.registerDatasource(ds);
    app.toast = jest.fn();
    await app.initialize();

    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ error: 'Error occurred' });
    await controller.handleSaveAndShowOptimizeDialog();
    await expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
  });

  it('opens the Publishing in progress dialog after successful publish', async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const projectsDS = newDatasource(
      controller.sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    app.registerController(controller);
    app.registerDatasource(projectsDS);
    app.registerPage(page);
    app.toast = jest.fn();
    await app.initialize();

    const invokeAction = sinon.stub(projectsDS, 'invokeAction').returns({});
    const showDialogSpy = jest.spyOn(controller.app, 'showDialog');
    await controller.handlePublishScheduleInProgress();
    expect(invokeAction.called).toBe(true);
    expect(showDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
    expect(page.state.publishingcompleted).toBe(true);
    await expect(app.toast.mock.calls.length).toBe(1);

    page.name = 'invaldPageName';
    page.state.publishingcompleted = false;
    await controller.handlePublishScheduleInProgress();
    expect(invokeAction.called).toBe(true);
    expect(showDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
    expect(page.state.publishingcompleted).toBe(false);
  });

  it('toast notification after unsuccessful publish', async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    const projectsDS = newDatasource(
      controller.sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    app.registerController(controller);
    app.registerDatasource(projectsDS);
    app.registerPage(page);
    app.toast = jest.fn();
    // eslint-disable-next-line
    page.findDialog = jest.fn(() => {
      return { closeDialog: () => {} };
    });
    await app.initialize();

    page.state.publishingcompleted = false;
    const invokeAction = sinon
      .stub(projectsDS, 'invokeAction')
      .returns({ error: 'Error occurred' });
    const showDialogSpy = jest.spyOn(controller.app, 'showDialog');
    const findDialogSpy = jest.spyOn(page, 'findDialog');
    await controller.handlePublishScheduleInProgress();
    expect(invokeAction.called).toBe(true);
    expect(showDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
    expect(findDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
    page.state.publishingcompleted = false;
    await expect(app.toast.mock.calls.length).toBe(1);

    page.name = 'invaldPageName';
    await controller.handlePublishScheduleInProgress();
    expect(invokeAction.called).toBe(true);
    expect(showDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
    expect(findDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
  });
});
