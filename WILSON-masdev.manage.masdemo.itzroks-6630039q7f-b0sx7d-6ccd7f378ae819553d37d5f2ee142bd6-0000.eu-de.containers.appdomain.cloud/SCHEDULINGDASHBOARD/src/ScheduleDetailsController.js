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

const TAG = 'ScheduleDetailsController';

export default class ScheduleDetailsController {
  constructor() {
    log.d(TAG, 'Created');
  }

  onDatasourceInitialized(ds, owner, app) {
    this.app = app;
  }

  getIssueTitleString(item) {
    if (!item.taskid) {
      return item.wogroup;
    }

    return this.app.getLocalizedLabel(
      'schedule_issue_title',
      `${item.wogroup} Task ${item.taskid}`
    );
  }

  computeErrorsAndWarnings = (item) => {
    const errorsAndWarnings = { errors: [], warnings: [] };
    item.schedulingerrors.forEach((issue) => {
      // TODO: type not available yet
      /*
      if (issue.type === ISSUE_TYPE.ERROR) {
        errorsAndWarnings.errors.push(issue);
      }
      if (issue.type === ISSUE_TYPE.WARNING) {
        errorsAndWarnings.warnings.push(issue);
      }
      */
      errorsAndWarnings.errors.push(issue);
    });
    return errorsAndWarnings;
  };

  computedIssueIcon(item) {
    return this.computeErrorsAndWarnings(item).errors.length
      ? 'carbon:error--filled'
      : '';
  }

  hideIssuesSpacing(item) {
    return (
      this.computeErrorsAndWarnings(item).errors.length === 0 ||
      (this.computeErrorsAndWarnings(item).errors.length > 0 &&
        this.computeErrorsAndWarnings(item).warnings.length === 0)
    );
  }

  async onReload() {
    const page = this.app.findPage('scheduleDetails');
    if (page) {
      page.state.disableSaveButton = true;
    }
    const activityDS = this.app.findDatasource('skdactivityunscheduledDS');
    await activityDS.forceReload();
  }

  onUndo() {
    this.onReload();
  }

  async onSave(showSaveNotification = true) {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    const response = await unscheduledDS.save();
    if (response && !response.error) {
      log.e(TAG, 'response is:', response);
      if (showSaveNotification) {
        this.app.toast(
          this.app.getLocalizedLabel(
            'activities_save_success',
            'Record has been saved'
          ),
          'success'
        );
      }
      this.onReload();
    } else if (showSaveNotification) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'activities_save_error',
          'Failed to save record'
        ),
        'error'
      );
    }
  }

  /* eslint class-methods-use-this: "off" */
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["event"] }] */
  handleToggled(event) {
    if (event.item.interruptible === false) {
      event.item.intshift = '';
    }
  }

  getResourceIDString(item) {
    let resourceIDName;
    if (item.objectname === 'AMCREWT') {
      resourceIDName = item.name ? item.name : item.resnamecrewtype;
    } else if (item.objectname === 'CRAFT') {
      resourceIDName = item.name ? item.name : item.resnamecraft;
    } else {
      // objectname will be 'TOOLITEM'
      resourceIDName = item.name ? item.name : item.resnametoolitem;
    }

    return resourceIDName;
  }
}
