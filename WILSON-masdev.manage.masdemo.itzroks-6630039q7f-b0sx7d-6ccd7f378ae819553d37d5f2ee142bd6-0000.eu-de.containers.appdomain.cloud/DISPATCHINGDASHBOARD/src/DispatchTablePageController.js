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
import { AppSwitcher } from '@maximo/maximo-js-api';

export default class DispatchTablePageController {
  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
  }

  async pageResumed() {
    const runDS = this.app.findDatasource('skdodmerunDS');

    await runDS.load({
      noCache: true,
    });
    await this.onReload(false);
  }

  loadApp = async (args = {}) => {
    const appName = args.appName || 'RLASSIGN';
    const context = args.context || {};
    const options = args.options || {};
    const switcher = AppSwitcher.get();
    await switcher.gotoApplication(appName, context, options);
  };

  async onReload(runDSreload = true) {
    const { selectedDatasource } = this.page.state;
    if (
      selectedDatasource === 'myDispatchCommitSchedules' ||
      selectedDatasource === 'myDispatchSchedules'
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
