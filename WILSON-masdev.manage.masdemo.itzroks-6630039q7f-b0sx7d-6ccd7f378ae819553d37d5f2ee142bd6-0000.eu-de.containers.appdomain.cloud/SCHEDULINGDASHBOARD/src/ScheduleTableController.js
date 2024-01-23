/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log } from '@maximo/maximo-js-api';
import SCHEDULE_TYPE from './model/scheduleType';

const TAG = 'ScheduleTableController';

class ScheduleTableController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
  async onAfterLoadData(dataSource, items) {
    // istanbul ignore next
    const jdashboardKPIds = this.app.findDatasource('jdashboardKPIds');
    ScheduleTableController.resetDataSource(jdashboardKPIds);
    if (items.length === 0) {
      return;
    }

    if (!['mySchedules', 'myCommitSchedules'].includes(dataSource.name)) {
      return;
    }

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
      log.e(TAG, 'runDS item.skdodmerunid:', item.skdodmerunid);
      if (projectRunIDs.includes(item.skdodmerunid)) {
        log.e(TAG, 'found match. Store KPIs of this id:', item.skdodmerunid);

        if (item.skdscenariorunkpi_run_global) {
          kpiValues = ScheduleTableController.getDashboardKpiValues(
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

    const dashboardKPIs = {
      unperformedTasks: totalUnperformedTasks,
      performedTasks: totalPerformedTasks,
      resourcesNum: totalResourcesNum,
      resourceUtilization: totalResourceUtilizationPrct,
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

  getUnscheduledTaskCount(projectItem) {
    const runds = this.app.findDatasource('skdodmerunDS');
    runds.load();
    let unperformedTaskCount = 0;
    runds.forEach((runItem) => {
      if (
        runItem.skdodmerunid === projectItem.skdodmerunid &&
        runItem.skdscenariorunkpi_run_global
      ) {
        const kpiValues = ScheduleTableController.getDashboardKpiValues(
          runItem.skdodmerunid,
          runItem.skdscenariorunkpi_run_global
        );
        unperformedTaskCount = kpiValues.unperformedTasks;
      }
    });
    return unperformedTaskCount;
  }

  getDurationString(item) {
    let durationStr = '';

    if (item.duration !== null)
      durationStr = this.app.getLocalizedLabel(
        'duration_label',
        `${item.duration} days`,
        [item.duration]
      );
    return durationStr;
  }

  getScheduleTypeLabel(item) {
    let label;
    switch (item.scheduletype) {
      case SCHEDULE_TYPE.RECURRING:
        if (item.skdpublish === true) {
          label = this.app.getLocalizedMessage(
            'schedulingdashboard',
            'schedule_type_label_auto_publish',
            'Auto publish'
          );
        } else {
          label = this.app.getLocalizedMessage(
            'schedulingdashboard',
            'schedule_type_label_auto_optimize',
            'Auto optimize'
          );
        }
        break;
      case SCHEDULE_TYPE.ONCE:
      case SCHEDULE_TYPE.IMMEDIATE:
        label = this.app.getLocalizedMessage(
          'schedulingdashboard',
          'schedule_type_label_manual',
          'Manual'
        );
        break;
      default:
        label = '';
    }
    return label;
  }
}

export default ScheduleTableController;
