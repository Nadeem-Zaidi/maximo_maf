import {
  Application,
  Datasource,
  Page,
  JSONDataAdapter,
} from '@maximo/maximo-js-api';
import DispatchTableController from '../DispatchTableController';
import SCHEDULE_TYPE from '../model/scheduleType';
import optimizationRunItem from '../model/skdodmerunitem';
import sampleProjectItem from '../model/sampleProjectItem';

function newDatasource(
  data = sampleProjectItem,
  items = 'member',
  idAttribute = 'id',
  name = 'myDispatchCommitSchedules'
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

const projectItemInvalidRunID = {
  description: 'Boston Dispatch Schedule',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'BST_GS',
  optimizationstatus: 'PROCESSED',
  skdodmerunid: 2,
  optimizationendtime: '2022-02-18T14:57:17+00:00',
  unscheduledcount: 0,
};

const projectItemValidRunID2 = {
  description: 'Boston Dispatch Schedule',
  scenarioname: 'BST_GS',
  skdprojectid: 89,
  name: 'BST_GS2',
  optimizationstatus: 'PROCESSED',
  skdodmerunid: 4,
  optimizationendtime: '2022-02-18T14:57:17+00:00',
  unscheduledcount: 0,
};

const projectItemNoResourceHours = {
  description: 'Boston Dispatch Schedule',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'BST_GS',
  optimizationstatus: 'PROCESSED',
  skdodmerunid: 4,
  optimizationendtime: '2022-02-18T14:57:17+00:00',
  unscheduledcount: 0,
};

const projectItemWithEmergencies = {
  description: 'Boston Dispatch Schedule',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'BST_GS',
  optimizationstatus: 'PROCESSED',
  skdodmerunid: 1,
  optimizationendtime: '2022-02-18T14:57:17+00:00',
  unscheduledcount: 0,
  skdactivityemergency: [{ id: 'ASSIGNMENT_657_BEDFORD_EAGLENA' }],
};

describe('DispatchTableController', () => {
  let controller;
  const sampleItem = {
    description: 'Boston Dispatch Schedule',
    scenarioname: 'BST_GS',
    skdprojectid: 88,
    name: 'BST_GS',
    optimizationstatus: 'PROCESSED',
    optimizationendtime: '2022-02-18T14:57:17+00:00',
    unscheduledcount: 0,
  };
  beforeEach(async () => {
    controller = new DispatchTableController();
    const ds = new Datasource();
    const app = new Application();
    await app.initialize();
    controller.onDatasourceInitialized(ds, '', app);
  });

  describe('getScheduleTypeLabel', () => {
    const item = JSON.parse(JSON.stringify(sampleItem));
    it('should return the Auto publish label when schedule type is recurring and skdpublish is true', () => {
      const autoPublishLabel = controller.app.getLocalizedMessage(
        'dispatcherdashboard',
        'schedule_type_label_auto_publish',
        'Auto publish'
      );
      item.scheduletype = SCHEDULE_TYPE.RECURRING;
      item.skdpublish = true;
      const label = controller.getScheduleTypeLabel(item);
      expect(label).toBe(autoPublishLabel);
    });

    it('should return the Auto optimize label when schedule type is recurring and skdpublish is false', () => {
      const autoOptimizeLabel = controller.app.getLocalizedMessage(
        'dispatcherdashboard',
        'schedule_type_label_auto_optimize',
        'Auto optimize'
      );
      item.scheduletype = SCHEDULE_TYPE.RECURRING;
      item.skdpublish = false;
      const label = controller.getScheduleTypeLabel(item);
      expect(label).toBe(autoOptimizeLabel);
    });

    it('should return the Manual label when schedule type is once or immediate', () => {
      const manualLabel = controller.app.getLocalizedMessage(
        'dispatcherdashboard',
        'schedule_type_label_manual',
        'Manual'
      );
      item.scheduletype = SCHEDULE_TYPE.ONCE;
      let label = controller.getScheduleTypeLabel(item);
      expect(label).toBe(manualLabel);

      item.scheduletype = SCHEDULE_TYPE.IMMEDIATE;
      label = controller.getScheduleTypeLabel(item);
      expect(label).toBe(manualLabel);
    });
    it('should return the no label when schedule type is not recognised', () => {
      item.scheduletype = 'unknown';
      const label = controller.getScheduleTypeLabel(item);
      expect(label).toBe('');
    });
  });

  describe('onAfterLoadData', () => {
    it('dashboard KPIs should be fetched', async () => {
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemWithEmergencies,
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      const runitems = await runds.load();
      projectDS.load();
      const kpids = app.findDatasource('jdashboardKPIds');
      const kpiItems = await kpids.load();
      expect(kpids.items).toBeDefined();
      expect(runitems.length).toBe(2);
      expect(kpiItems.length).toBe(1);
      expect(kpiItems[0].unperformedTasks).toBe(14);
      expect(kpiItems[0].performedTasks).toBe(119);
      expect(kpiItems[0].resourcesNum).toBe(27);
      expect(kpiItems[0].resourceUtilization).toBe(12);
    });

    it('dashboard KPIs skipped if not all present', async () => {
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemValidRunID2,
        'member',
        'id',
        'myDispatchCommitSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      app.initialize();
      const runitems = await runds.load();
      projectDS.load();
      const kpids = app.findDatasource('jdashboardKPIds');
      const kpiItems = await kpids.load();
      expect(kpids.items).toBeDefined();
      expect(runitems.length).toBe(2);
      expect(kpiItems.length).toBe(1);
      expect(kpiItems[0].unperformedTasks === undefined).toBe(true);
      expect(kpiItems[0].performedTasks === undefined).toBe(true);
      expect(kpiItems[0].resourcesNum === undefined).toBe(true);
      expect(kpiItems[0].resourceUtilization === undefined).toBe(true);
    });

    it('dashboard KPIs - no matching runid', () => {
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemInvalidRunID,
        'member',
        'id',
        'myDispatchCommitSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      runds.load();
      projectDS.load();
      const kpiDS = app.findDatasource('jdashboardKPIds');
      expect(kpiDS.items).toBeDefined();
      expect(kpiDS.items.length).toBe(0);
    });

    it('dashboard KPIs  - no run KPIs', () => {
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemValidRunID,
        'member',
        'id',
        'myDispatchCommitSchedules'
      );

      const runds = newDatasource(
        { member: [{ skdodmerunid: 1 }] },
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      runds.load();
      projectDS.load();

      const kpiDS = app.findDatasource('jdashboardKPIds');
      expect(kpiDS.items).toBeDefined();
      expect(kpiDS.items.length).toBe(0);
    });

    it('dashboard KPIs - invalid project dataset name', async () => {
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemValidRunID,
        'member',
        'id',
        'invalidProject'
      );

      const runds = newDatasource(
        { member: [{ skdodmerunid: 1 }] },
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      runds.load();
      projectDS.load();

      const kpiDS = app.findDatasource('jdashboardKPIds');
      await kpiDS.load();
      expect(kpiDS.items).toBeDefined();
      expect(kpiDS.items.length).toBe(1);
      expect(kpiDS.items[0].unperformedTasks === undefined).toBe(true);
      expect(kpiDS.items[0].performedTasks === undefined).toBe(true);
      expect(kpiDS.items[0].resourcesNum === undefined).toBe(true);
      expect(kpiDS.items[0].resourceUtilization === undefined).toBe(true);
      expect(kpiDS.items[0].emergencies === undefined).toBe(true);
    });

    it('dashboard KPIs  - no projects', () => {
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        { member: [] },
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        { member: [{ skdodmerunid: 1 }] },
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      runds.load();
      projectDS.load();
      const kpiDS = app.findDatasource('jdashboardKPIds');
      expect(kpiDS.items).toBeDefined();
      expect(kpiDS.items.length).toBe(0);
    });
  });

  describe('getUnscheduledTaskCount', () => {
    it('should return the number of unscheduled tasks', async () => {
      const item = JSON.parse(JSON.stringify(projectItemValidRunID));
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemValidRunID,
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );

      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      await runds.load();
      const taskCount = controller.getUnscheduledTaskCount(item);
      expect(taskCount).toBe(14);
    });

    it('should return 0 when no matching run ID found', async () => {
      const item = JSON.parse(JSON.stringify(projectItemInvalidRunID));
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemInvalidRunID,
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );

      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      await runds.load();
      const taskCount = controller.getUnscheduledTaskCount(item);
      expect(taskCount).toBe(0);
    });
  });

  describe('getResourceUtilization', () => {
    it('should return the resource utilization percentage', async () => {
      const item = JSON.parse(JSON.stringify(projectItemValidRunID));
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemValidRunID,
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );

      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      await runds.load();
      const utilization = controller.getResourceUtilization(item);
      expect(utilization).toBe(12);
    });

    it('should return 0 if resourceAvailableHours is 0', async () => {
      const item = JSON.parse(JSON.stringify(projectItemNoResourceHours));
      const app = new Application();
      const page = new Page({ name: 'dispatch' });

      const projectDS = newDatasource(
        projectItemNoResourceHours,
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );

      const jdashboardKPIds = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'jdashboardKPIds'
      );

      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      await runds.load();
      const utilization = controller.getResourceUtilization(item);
      expect(utilization).toBe(0);
    });
  });

  describe('getEmergencyActivityCount', () => {
    it('should return the number of activities with emergency flag set', async () => {
      const item = JSON.parse(JSON.stringify(projectItemWithEmergencies));
      const app = new Application();
      const page = new Page({ name: 'schedule' });

      const projectDS = newDatasource(
        projectItemValidRunID,
        'member',
        'id',
        'myDispatchSchedules'
      );

      const runds = newDatasource(
        optimizationRunItem,
        'member',
        'id',
        'skdodmerunDS'
      );
      const jdashboardKPIds = newDatasource(
        sampleItem,
        'member',
        'id',
        'jdashboardKPIds'
      );
      app.registerController(controller);
      app.registerPage(page);
      app.registerDatasource(projectDS);
      app.registerDatasource(runds);
      app.registerDatasource(jdashboardKPIds);
      page.registerDatasource(projectDS);
      app.initialize();
      await runds.load();
      const emergencyCount = controller.getEmergencyActivityCount(item);
      expect(emergencyCount).toBe(1);
    });
  });
});
