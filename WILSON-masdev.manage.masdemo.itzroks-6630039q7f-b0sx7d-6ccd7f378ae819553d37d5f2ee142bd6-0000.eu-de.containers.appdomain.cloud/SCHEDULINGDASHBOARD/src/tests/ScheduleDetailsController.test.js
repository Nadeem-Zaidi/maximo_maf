import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import ScheduleDetailsController from '../ScheduleDetailsController';
import ISSUE_TYPE from '../model/issueType';

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

describe('ScheduleDetailsController', () => {
  it('gets issue titles string', () => {
    const mockGetLocalizedLabel = jest.fn();
    const item1 = {
      wogroup: 'BSTA1122',
      taskid: '3',
    };
    const item2 = {
      wogroup: 'BSTA1123',
    };
    const app = {
      getLocalizedLabel: mockGetLocalizedLabel,
    };

    const controller = new ScheduleDetailsController();
    controller.onDatasourceInitialized({}, {}, app);

    const issueTitle = controller.getIssueTitleString(item2);
    expect(issueTitle).toBe('BSTA1123');
    expect(mockGetLocalizedLabel).not.toHaveBeenCalled();

    controller.getIssueTitleString(item1);
    expect(mockGetLocalizedLabel).toHaveBeenCalled();
    expect(mockGetLocalizedLabel).toHaveBeenCalledWith(
      'schedule_issue_title',
      'BSTA1122 Task 3'
    );
    expect(mockGetLocalizedLabel).toHaveBeenCalledTimes(1);
  });

  describe('displays errors and warnings correctly', () => {
    const warningIssue = {
      type: ISSUE_TYPE.WARNING,
      title: 'FNL',
      message: 'Some warning message',
    };
    const errorIssue = {
      type: ISSUE_TYPE.ERROR,
      title: 'InfeasibleFNL',
      message: 'Error message placeholder',
    };

    it('groups errors and warnings', () => {
      const controller = new ScheduleDetailsController();
      expect(
        controller.computeErrorsAndWarnings({
          schedulingerrors: [{ issues: [warningIssue, errorIssue] }],
        })
      ).toEqual({
        errors: [{ issues: [warningIssue, errorIssue] }],
        warnings: [],
      });
    });

    it('show correct icon for issue', () => {
      const controller = new ScheduleDetailsController();
      expect(
        controller.computedIssueIcon({
          schedulingerrors: [{ issues: [errorIssue] }],
        })
      ).toEqual('carbon:error--filled');
      expect(
        controller.computedIssueIcon({
          schedulingerrors: [],
        })
      ).toEqual('');
    });

    it('hides the spacing between errors and warnings lists', () => {
      const controller = new ScheduleDetailsController();
      expect(
        controller.hideIssuesSpacing({
          schedulingerrors: [{ issues: [errorIssue] }],
        })
      ).toBe(true);
      expect(
        controller.hideIssuesSpacing({
          schedulingerrors: [{ issues: [warningIssue] }],
        })
      ).toBe(true);
      expect(
        controller.hideIssuesSpacing({
          schedulingerrors: [{ issues: [warningIssue, errorIssue] }],
        })
      ).toBe(true);
    });
  });

  it('displays resource ID if resource name is null', () => {
    const controller = new ScheduleDetailsController();
    const craftItem1 = {
      objectname: 'CRAFT',
      name: 'Craft used',
      resnamecraft: 'ELECT',
    };
    expect(controller.getResourceIDString(craftItem1)).toEqual('Craft used');

    const craftItem2 = {
      objectname: 'CRAFT',
      name: '',
      resnamecraft: 'ELECT',
    };
    expect(controller.getResourceIDString(craftItem2)).toEqual('ELECT');

    const crewItem1 = {
      objectname: 'AMCREWT',
      name: 'Crew used',
      resnamecrewtype: 'BSTWATER',
    };
    expect(controller.getResourceIDString(crewItem1)).toEqual('Crew used');

    const crewItem2 = {
      objectname: 'AMCREWT',
      name: '',
      resnamecrewtype: 'BSTWATER',
    };
    expect(controller.getResourceIDString(crewItem2)).toEqual('BSTWATER');

    const toolItem1 = {
      objectname: 'TOOLITEM',
      name: 'Tool Item used',
      resnametoolitem: 'BSTBTRUCK',
    };
    expect(controller.getResourceIDString(toolItem1)).toEqual('Tool Item used');

    const toolItem2 = {
      objectname: 'TOOLITEM',
      name: '',
      resnametoolitem: 'BSTBTRUCK',
    };
    expect(controller.getResourceIDString(toolItem2)).toEqual('BSTBTRUCK');
  });

  it('initialize app', () => {
    const controller = new ScheduleDetailsController();
    controller.onDatasourceInitialized({}, {}, { app: {} });

    expect(controller.app).toEqual({
      app: {},
    });
  });

  it.skip('page resumed', () => {
    const controller = new ScheduleDetailsController();

    controller.pageInitialized({
      state: { selectedTab: 0 },
      params: { selectedTab: 1 },
      app: {},
    });
    controller.pageResumed();
    expect(controller.page).toEqual({
      state: {
        selectedTab: 1,
      },
      params: {
        selectedTab: 1,
      },
      app: {},
    });
  });

  it('undo reloads datasource', () => {
    const controller = new ScheduleDetailsController();
    const ds = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);

    const forceReloadStub = sinon.stub(ds, 'forceReload');

    page.registerDatasource(ds);
    page.state.disableSaveButton = false;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);
    controller.onUndo();
    expect(forceReloadStub.called).toBe(true);
    expect(page.state.disableSaveButton).toBe(true);

    page.name = 'invalidPageName';
    page.state.disableSaveButton = false;
    controller.onUndo();
    expect(page.state.disableSaveButton).toBe(false);
  });

  it('Reload reloads datasource', async () => {
    const controller = new ScheduleDetailsController();
    const ds = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });
    app.toast = jest.fn();
    app.registerController(controller);
    app.registerPage(page);

    const forceReloadStub = sinon.stub(ds, 'forceReload');

    page.registerDatasource(ds);
    page.state.disableSaveButton = false;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);
    await controller.onReload();
    expect(forceReloadStub.called).toBe(true);
    expect(page.state.disableSaveButton).toBe(true);

    page.name = 'invalidPageName';
    page.state.disableSaveButton = false;
    await controller.onReload(true);
    expect(page.state.disableSaveButton).toBe(false);
  });

  it('toggle interruptible field', () => {
    const event = {
      item: {
        id: 'BSTA1125',
        interruptible: true,
        intshift: 'DAYS',
      },
    };
    const controller = new ScheduleDetailsController();
    controller.handleToggled(event);
    expect(event.item.intshift).toBe('DAYS');

    event.item.interruptible = false;
    controller.handleToggled(event);
    expect(event.item.intshift).toBe('');
  });

  it('save datasource success', async () => {
    const controller = new ScheduleDetailsController();
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    const projectsDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdprojectsDS'
    );

    const activityDS = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const forceReloadStub = sinon.stub(activityDS, 'forceReload');

    app.registerController(controller);
    app.registerPage(page);
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(activityDS, 'save')
      .returns({ _rowstamp: '986390', href: '' });
    page.registerDatasource(activityDS);
    page.registerDatasource(projectsDS);
    app.initialize();
    controller.onDatasourceInitialized({}, {}, app);

    await controller.onSave(true);
    expect(app.toast.mock.calls.length).toBe(1);
    expect(saveStub.called).toBe(true);
    expect(forceReloadStub.called).toBe(true);

    await controller.onSave(false);
    expect(app.toast.mock.calls.length).toBe(1);
  });

  it('save datasource failure', async () => {
    const controller = new ScheduleDetailsController();
    const ds = newDatasource(
      sampleItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'scheduleDetails' });

    app.registerController(controller);
    app.registerPage(page);
    app.toast = jest.fn();

    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ error: 'Error occurred' });

    page.registerDatasource(ds);
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);
    await controller.onSave(false);
    expect(app.toast.mock.calls.length).toBe(0);
    expect(saveStub.called).toBe(true);

    await controller.onSave();
    expect(app.toast.mock.calls.length).toBe(1);
  });
});
