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

const TAG = 'DispatcherApp';

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, 'Dispatcher app is initialized');
  }

  goToDashboardPage() {
    this.app.setCurrentPage('dispatch');
  }

  async handlePublishScheduleInProgress() {
    const page = this.app.findPage('workItemDetails');

    this.app.showDialog('publishingInProgressDialog');

    const projectDS = this.app.findDatasource('skdprojectsDS');

    const option = {
      record: projectDS.item,
      parameters: {},
    };

    const response = await projectDS.invokeAction('publish', option);

    if (response && !response.error) {
      page.state.publishingCompleted = true;
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
      page.findDialog('publishingInProgressDialog').closeDialog();
    }
  }
}
export default AppController;
