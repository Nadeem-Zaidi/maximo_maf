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

import { log, AppSwitcher } from '@maximo/maximo-js-api';

const TAG = 'ScheduleTablePageController';

export default class ScheduleTablePageController {
  constructor() {
    log.d(TAG, 'Created');
  }

  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
  }

  /* istanbul ignore next */
  async pageResumed() {
    const runDS = this.app.findDatasource('skdodmerunDS');

    await runDS.load({
      noCache: true,
    });
    await this.onReload(false);
  }

  /* eslint-disable */
  async loadApp(args = {}) {
    const appName = args.appName || 'SCHEDACM';
    const options = args.options ? args.options : {};
    const context = args.context ? args.context : {};
    const switcher = AppSwitcher.get();
    await switcher.gotoApplication(appName, context, options);
  }
  /* eslint-enable */

  async onReload(runDSreload = true) {
    const { selectedDatasource } = this.page.state;
    if (
      selectedDatasource === 'mySchedules' ||
      selectedDatasource === 'myCommitSchedules'
    ) {
      const runDS = this.app.findDatasource('skdodmerunDS');
      const projectDS = this.app.findDatasource(selectedDatasource);
      if (runDSreload) {
        await runDS.forceReload();
      }
      await projectDS.forceReload();
    }
  }
}
