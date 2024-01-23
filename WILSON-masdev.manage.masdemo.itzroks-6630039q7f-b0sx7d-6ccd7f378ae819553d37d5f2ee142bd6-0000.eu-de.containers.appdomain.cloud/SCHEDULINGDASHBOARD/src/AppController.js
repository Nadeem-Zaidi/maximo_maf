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

/* eslint-disable no-console */
import { log } from '@maximo/maximo-js-api';

const TAG = 'SchedulerApp';

class AppController {
  app;

  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, 'Scheduler app is initialized');
  }

  goToOptimizeSchedulePage() {
    this.app.setCurrentPage('optimizeSchedule');
  }

  goToDashboardPage() {
    this.app.setCurrentPage('schedule');
  }

  async handlePublishScheduleInProgress() {
    const projectDS = this.app.findDatasource('skdprojectsDS');
    const option = {
      record: projectDS.item,
      parameters: {},
    };
    this.app.showDialog('publishingInProgressDialog');
    const response = await projectDS.invokeAction('publish', option);
    const page = this.app.findPage('scheduleDetails');
    if (response && !response.error) {
      if (page) {
        page.state.publishingcompleted = true;
      }
      this.app.toast(
        this.app.getLocalizedLabel(
          'publish_schedule_success',
          `You have successfully published the ${projectDS.item.projectname} schedule`
        ),
        'success'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'publish_schedule_failure',
          'Failed to publish'
        ),
        'error'
      );
      if (page) {
        page.findDialog('publishingInProgressDialog').closeDialog();
      }
    }
  }

  async showOptimizeDialog() {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    await unscheduledDS.forceReload();
    const page = this.app.findPage('scheduleDetails');
    if (page) {
      page.state.disableSaveButton = true;
    }
    this.app.showDialog('optimizeScheduleDialog');
  }

  async handleSaveAndShowOptimizeDialog() {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    const response = await unscheduledDS.save();
    if (response && !response.error) {
      const page = this.app.findPage('scheduleDetails');
      if (page) {
        page.state.disableSaveButton = true;
      }
      await unscheduledDS.forceReload();
      this.app.showDialog('optimizeScheduleDialog');
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'activities_save_error',
          'Failed to save record'
        ),
        'error'
      );
    }
  }
}
export default AppController;
