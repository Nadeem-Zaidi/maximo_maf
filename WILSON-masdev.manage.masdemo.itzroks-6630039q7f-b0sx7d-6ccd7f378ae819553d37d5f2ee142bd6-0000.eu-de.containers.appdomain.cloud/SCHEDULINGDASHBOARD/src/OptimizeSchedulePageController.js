/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022, 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log } from '@maximo/maximo-js-api';
import moment from 'moment-timezone';

const TAG = 'OptimizeSchedulePageController';

export default class OptimizeSchedulePageController {
  extraWaitTime = 20;

  constructor() {
    log.d(TAG, 'Created');
  }

  formatFractionHours(skdodmeresourcesummary = []) {
    return skdodmeresourcesummary.map((resource) => {
      const { availablehours, loadhours } = resource;
      return {
        ...resource,
        availablehours: moment()
          .utc(new Date())
          .startOf('day')
          .add(availablehours, 'hours')
          .format('h:mm'),
        loadhours: moment()
          .utc(new Date())
          .startOf('day')
          .add(loadhours, 'hours')
          .format('h:mm'),
      };
    });
  }

  setExtraWaitTime(duration) {
    this.extraWaitTime = duration;
  }

  pageInitialized(page, app) {
    log.e(TAG, 'pageInitialized called for optimizeSchedule');
    this.page = page;
    this.app = app;
  }

  /* istanbul ignore next */
  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
  async pageResumed() {
    const runlatestDS = this.app.findDatasource('skdodmerunForOptimizeDS');
    const projectDS = this.app.findDatasource('skdprojectForOptimizeDS');
    const joptimizeAlertsDS = this.app.findDatasource('jOptimizeAlertsDS');
    const joptimizeSummaryDS = this.app.findDatasource('jOptimizeSummaryDS');

    this._resetDataSource(joptimizeAlertsDS);
    this._resetDataSource(joptimizeSummaryDS);
    runlatestDS.clearState();

    await projectDS.load({
      noCache: true,
      itemUrl: this.page.params.href,
    });

    const iterations = Math.round(
      (this.page.params.timelimit + this.extraWaitTime) /
        this.page.params.interval
    );

    log.e(TAG, 'pageResumed: calling load with iterations set to:', iterations);

    await runlatestDS.load({
      noCache: true,
    });

    if (
      !['PROCESSED', 'STOPPED', 'FAILED'].includes(
        runlatestDS.item.optimizationstatus
      )
    ) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < iterations; i += 1) {
        await new Promise((resolve) => {
          setTimeout(resolve, this.page.params.interval * 1000);
        });
        log.e(TAG, 'Loading runlatest for i=', i);
        await runlatestDS.load({
          noCache: true,
        });
        await joptimizeAlertsDS.load({
          src: runlatestDS.items[0].skdopascpsalert || [],
        });
        await joptimizeSummaryDS.load({
          src:
            this.formatFractionHours(
              runlatestDS.items[0].skdodmeresourcesummary
            ) || [],
        });
        if (
          ['PROCESSED', 'STOPPED', 'FAILED'].includes(
            runlatestDS.item.optimizationstatus
          )
        ) {
          log.e(TAG, 'optimization completed, stopping retries');
          break;
        }
      }
    }
    if (
      ['PROCESSED', 'STOPPED'].includes(runlatestDS.item.optimizationstatus)
    ) {
      await joptimizeAlertsDS.load({
        src: runlatestDS.items[0].skdopascpsalert || [],
      });

      await joptimizeSummaryDS.load({
        src:
          this.formatFractionHours(
            runlatestDS.items[0].skdodmeresourcesummary
          ) || [],
      });
    }
  }

  async onRefresh() {
    const runlatestDS = this.app.findDatasource('skdodmerunForOptimizeDS');
    const joptimizeAlertsDS = this.app.findDatasource('jOptimizeAlertsDS');
    const joptimizeSummaryDS = this.app.findDatasource('jOptimizeSummaryDS');
    this._resetDataSource(joptimizeAlertsDS);
    this._resetDataSource(joptimizeSummaryDS);
    await runlatestDS.forceReload();
    // istanbul ignore next
    if (
      ['PROCESSED', 'STOPPED'].includes(runlatestDS.item.optimizationstatus)
    ) {
      await joptimizeAlertsDS.load({
        src: runlatestDS.items[0].skdopascpsalert || [],
      });
      await joptimizeSummaryDS.load({
        src:
          this.formatFractionHours(
            runlatestDS.items[0].skdodmeresourcesummary
          ) || [],
      });
    }
  }

  /* eslint class-methods-use-this: "off" */
  _resetDataSource(ds) {
    ds.clearState();
    ds.resetState();
  }

  computeOptimizationStatusTag(item) {
    const colormap = new Map([
      ['PROCESSED', 'gray'],
      ['PROCESSING', 'blue'],
      ['STOPPED', 'gray'],
      ['STOPPING', 'blue'],
      ['FAILED', 'red'],
    ]);

    if (item.optimizationstatus) {
      return [
        {
          label: item.optimizationstatus,
          type: colormap.get(item.optimizationstatus),
        },
      ];
    }
    return null;
  }

  openOptimizationProgressDialog() {
    this.app.showDialog('optimizationProgressLog');
  }

  goToScheduleDetailsPage() {
    this.app.setCurrentPage({
      name: 'scheduleDetails',
      params: {
        scenario: this.page.params.href,
        projectname: this.page.params.projectname,
        projectid: this.page.params.projectid,
        scheduletype: this.page.params.scheduletype,
        issuecount: this.page.params.issuecount,
        selectedTab: this.page.params.selectedTab,
        startdate: this.page.params.startdate,
        enddate: this.page.params.enddate,
      },
    });
  }

  async stopOptimizationRun() {
    const projectDS = this.app.findDatasource('skdprojectForOptimizeDS');
    const option = {
      record: projectDS.item,
      parameters: {},
    };
    const response = await projectDS.invokeAction('finishSKDODMERUN', option);
    if (response && !response.error) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_stop_success',
          `Optimization stopped for ${projectDS.item.projectname} schedule`
        ),
        'info'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_stop_failure',
          'Failed to stop optimization'
        ),
        'error'
      );
    }
  }
}
