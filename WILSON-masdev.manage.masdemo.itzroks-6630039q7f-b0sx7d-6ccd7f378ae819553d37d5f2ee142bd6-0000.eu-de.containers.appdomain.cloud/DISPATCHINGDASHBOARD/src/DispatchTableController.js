/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/* eslint-disable no-console */
import { log } from '@maximo/maximo-js-api';
import SCHEDULE_TYPE from './model/scheduleType';

const TAG = 'DispatchTableController';

class DispatchTableController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
  async onAfterLoadData(dataSource, items) {
    // istanbul ignore next
    if (items.length === 0) {
      return;
    }

    if (
      !['myDispatchSchedules', 'myDispatchCommitSchedules'].includes(
        dataSource.name
      )
    ) {
      return;
    }

    const jdashboardKPIds = this.app.findDatasource('jdashboardKPIds');
    DispatchTableController.resetDataSource(jdashboardKPIds);

    const projectDS = this.app.findDatasource(dataSource.name);
    const runDS = this.app.findDatasource('skdodmerunDS');

    const projectRunIDs = projectDS.items.map(
      (projectItem) => projectItem.skdodmerunid
    );

    const kpiArray = [];
    let kpiValues;
    let totalPerformedTasks = 0;
    let totalUnperformedTasks = 0;
    let totalResourcesNum = 0;
    let totalResourceAvailableHours = 0;
    let totalResourceUtilizationHours = 0;
    let totalResourceUtilizationPrct = 0;

    runDS.forEach((item) => {
      if (projectRunIDs.includes(item.skdodmerunid)) {
        if (item.skdscenariorunkpi_run_global) {
          kpiValues = DispatchTableController.getDashboardKpiValues(
            item.skdodmerunid,
            item.skdscenariorunkpi_run_global
          );
          if (Object.values(kpiValues).includes(undefined)) {
            return;
          }
          totalPerformedTasks += kpiValues.performedTasks;
          totalUnperformedTasks += kpiValues.unperformedTasks;
          totalResourcesNum += kpiValues.resourcesNum;
          totalResourceUtilizationHours += kpiValues.resourceUtilizationHours;
          totalResourceAvailableHours += kpiValues.resourceAvailableHours;
        }
      }
    });

    if (totalResourceAvailableHours !== 0)
      totalResourceUtilizationPrct = Math.ceil(
        (totalResourceUtilizationHours / totalResourceAvailableHours) * 100
      );

    const totalEmergencyActivities =
      DispatchTableController.getDashboardEmergencyActivityKpi(projectDS);

    const dashboardKPIs = {
      unperformedTasks: totalUnperformedTasks,
      performedTasks: totalPerformedTasks,
      resourcesNum: totalResourcesNum,
      resourceUtilization: totalResourceUtilizationPrct,
      emergencies: totalEmergencyActivities,
    };
    if (
      !(
        totalUnperformedTasks === 0 &&
        totalPerformedTasks === 0 &&
        totalResourcesNum === 0 &&
        totalResourceUtilizationPrct === 0
      )
    ) {
      kpiArray.push(dashboardKPIs);
    }

    if (kpiArray.length !== 0) {
      await jdashboardKPIds.load({ src: kpiArray });
    }
  }

  getScheduleTypeLabel(item) {
    let label;
    switch (item.scheduletype) {
      case SCHEDULE_TYPE.RECURRING:
        if (item.skdpublish === true) {
          label = this.app.getLocalizedMessage(
            'dispatcherdashboard',
            'schedule_type_label_auto_publish',
            'Auto publish'
          );
        } else {
          label = this.app.getLocalizedMessage(
            'dispatcherdashboard',
            'schedule_type_label_auto_optimize',
            'Auto optimize'
          );
        }
        break;
      case SCHEDULE_TYPE.ONCE:
      case SCHEDULE_TYPE.IMMEDIATE:
        label = this.app.getLocalizedMessage(
          'dispatcherdashboard',
          'schedule_type_label_manual',
          'Manual'
        );
        break;
      default:
        label = '';
    }
    log.t(TAG, 'getScheduleTypeLabel: return label:', label);
    return label;
  }

  getUnscheduledTaskCount(projectItem) {
    const runds = this.app.findDatasource('skdodmerunDS');
    runds.load();
    let unperformedTaskCount = 0;
    runds.forEach((runItem) => {
      if (
        runItem.skdodmerunid === projectItem.skdodmerunid &&
        runItem.skdscenariorunkpi_run_global
      ) {
        const kpiValues = DispatchTableController.getDashboardKpiValues(
          runItem.skdodmerunid,
          runItem.skdscenariorunkpi_run_global
        );
        unperformedTaskCount = kpiValues.unperformedTasks;
      }
    });
    return unperformedTaskCount;
  }

  getResourceUtilization(projectItem) {
    const runds = this.app.findDatasource('skdodmerunDS');
    runds.load();
    let resourceUtilizationPrct = 0;
    runds.forEach((runItem) => {
      if (
        runItem.skdodmerunid === projectItem.skdodmerunid &&
        runItem.skdscenariorunkpi_run_global
      ) {
        const kpiValues = DispatchTableController.getDashboardKpiValues(
          runItem.skdodmerunid,
          runItem.skdscenariorunkpi_run_global
        );
        if (kpiValues.resourceAvailableHours !== 0)
          resourceUtilizationPrct = Math.ceil(
            (kpiValues.resourceUtilizationHours /
              kpiValues.resourceAvailableHours) *
              100
          );
      }
    });
    return resourceUtilizationPrct;
  }

  static getDashboardKpiValues(runId, kpiDataItems) {
    const kpis = kpiDataItems.reduce(
      (obj, item) => ({ ...obj, [item.kpiid]: item.kpivalue }),
      {}
    );
    return {
      skdodmerunid: runId,
      unperformedTasks: kpis.unperformedTasksNum,
      performedTasks: kpis.performedTasksNum,
      resourcesNum: kpis.resourcesNum,
      resourceAvailableHours: kpis.resourceAvailableHours,
      resourceUtilizationHours: kpis.resourceUtilizationHours,
    };
  }

  static resetDataSource(ds) {
    ds.clearState();
    ds.resetState();
  }

  static getDashboardEmergencyActivityKpi(projectDS) {
    let totalEmergencyActivities = 0;

    projectDS.items.forEach((item) => {
      if (item.skdactivityemergency) {
        totalEmergencyActivities += item.skdactivityemergency.length;
      }
    });
    return totalEmergencyActivities;
  }

  /* eslint class-methods-use-this: "off" */
  getEmergencyActivityCount(projectItem) {
    let emergencyActivityCount = 0;
    // istanbul ignore next
    if (projectItem.skdactivityemergency) {
      emergencyActivityCount = projectItem.skdactivityemergency.length;
    }
    return emergencyActivityCount;
  }
}

export default DispatchTableController;
