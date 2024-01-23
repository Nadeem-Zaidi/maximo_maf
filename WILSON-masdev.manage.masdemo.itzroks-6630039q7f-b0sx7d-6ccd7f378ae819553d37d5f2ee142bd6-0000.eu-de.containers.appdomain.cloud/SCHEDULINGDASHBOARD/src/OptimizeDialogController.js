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

const TAG = 'OptimizeDialogController';

const OPTIMIZER_PARAMETERS = [
  'cmatchskill',
  'cskdwindow',
  'ccalendarbreak',
  'crepairwindow',
  'venforceams',
  'venforceaos',
  'venforcelms',
  'venforcelos',
  'timelimit',
  'vprioritydir',
  'vperctavail',
  'cassigntimebuffer',
  'cincludepriority',
];

export default class OptimizeDialogController {
  constructor() {
    log.t(TAG, 'Created');
  }

  dialogInitialized(dialog) {
    log.t(TAG, 'Initialized');
    this.dialog = dialog;
    this.app = dialog.getApplication();
    this.page = this.app.findPage('scheduleDetails');
    this.page.state.refreshinterval = 10;
    this.page.state.optimizeScheduleChekboxOptions = [
      {
        id: 'updateCronCheckbox',
        label: this.app.getLocalizedLabel(
          'optimize_dialog_update_cron_option',
          'Update cron task settings with these values'
        ),
      },
    ];
    // instanbul ignore next
    window.setTimeout(() => {
      this.page.state.busy = false;
    }, 50);
  }

  dialogOpened() {
    log.t(TAG, 'Opened');
    this.page.state.updateCronChecked = false;
  }

  dialogClosed() {
    const ds = this.app.findDatasource('skdprojectscenarioDS');
    ds.forceReload();
    this.dialog.closeDialog();
  }

  async saveAndGoToOptimizeSchedulePage() {
    const ds = this.app.findDatasource('skdprojectscenarioDS');
    this.page.state.useConfirmDialog = false;
    if (this.page.state.updateCronChecked) {
      OPTIMIZER_PARAMETERS.forEach((fieldName) => {
        ds.item.skdreslevelparam[1][fieldName] =
          ds.item.skdreslevelparam[0][fieldName];
      });
    }

    const saveresponse = await ds.save();
    if (saveresponse && saveresponse.error) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_params_save_error',
          'Failed to save optimizer parameters'
        ),
        'error'
      );
      return;
    }

    const projectDS = this.app.findDatasource('skdprojectsDS');
    const option = {
      record: projectDS.item,
      parameters: {},
    };
    const response = await projectDS.invokeAction('runOptimization', option);
    const page = this.app.findPage('scheduleDetails');
    if (response && !response.error) {
      if (page) {
        page.state.optimizationstarted = true;
      }
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_success',
          `Optimization started for ${projectDS.item.projectname} schedule`
        ),
        'info'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_failure',
          'Failed to optimize'
        ),
        'error'
      );
    }
    this.app.setCurrentPage({
      name: 'optimizeSchedule',
      params: {
        href: this.page.state.runlatesthref,
        projectname: this.page.params.projectname,
        timelimit: ds.item.skdreslevelparam[0].timelimit,
        interval: this.page.state.refreshinterval,
        scheduletype: this.page.params.scheduletype,
        startdate: this.page.params.startdate,
        enddate: this.page.params.enddate,
        selectedTab: this.page.params.selectedTab,
        issuecount: this.page.params.issuecount,
        projectid: this.page.params.projectid,
      },
    });
  }

  handleCronChecked() {
    this.page.state.updateCronChecked = !this.page.state.updateCronChecked;
  }

  handleRefreshIntervalChange(evt) {
    this.page.state.refreshinterval = evt.target.value;
  }
}
