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

const OPTIMIZER_PARAMETERS = [
  'cmatchskill',
  'cskdwindow',
  'ccalendarbreak',
  'venforceams',
  'venforceaos',
  'venforcelms',
  'venforcelos',
  'timelimit',
  'vprioritydir',
  'cassigntimebuffer',
  'cincludepriority',
  'cmatchworkzone',
  'matchlaborassignment',
  'csecworkzone',
  'sendmulticraft',
  'cincludetraveltime',
  'cassigntimebuffer',
  'cperctbuffer',
];

export default class OptimizeDialogController {
  dialogInitialized(dialog) {
    this.dialog = dialog;
    this.app = dialog.getApplication();
    this.page = this.app.findPage('workItemDetails');
    this.page.state.refreshinterval = 10;
    this.page.state.redirect = true;
  }

  dialogOpened() {
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
        ds.item.skdspatialparam[1][fieldName] =
          ds.item.skdspatialparam[0][fieldName];
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
    this.app.showDialog('optimizationInProgressDialog');
    const projectDS = this.app.findDatasource('skdprojectsDS');
    const option = {
      record: projectDS.item,
      parameters: {},
    };
    const response = await projectDS.invokeAction('runOptimization', option);
    this.page.findDialog('optimizationInProgressDialog').closeDialog();
    if (response && !response.error) {
      if (this.page?.name === 'workItemDetails') {
        this.page.state.optimizationstarted = true;
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

    if (this.page.state.redirect) {
      this.app.setCurrentPage({
        name: 'optimizeSchedule',
        params: {
          href: this.page.state.runlatesthref,
          projectname: this.page.params.projectname,
          timelimit: ds.item.skdspatialparam[0].timelimit,
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
  }

  handleCronChecked() {
    this.page.state.updateCronChecked = !this.page.state.updateCronChecked;
  }

  handleRefreshIntervalChange(evt) {
    this.page.state.refreshinterval = evt.target.value;
  }
}
