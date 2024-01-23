/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log, JSONDataAdapter, Datasource } from '@maximo/maximo-js-api';
import moment from 'moment-timezone';

const TAG = 'ScheduleDetailsPageController';

export default class ScheduleDetailsPageController {
  constructor() {
    log.d(TAG, 'Created');
  }

  pageInitialized(page, app) {
    this.page = page;
    this.page.params = page.params;
    this.page.state.selectedTab = 0;
    this.page.state.useConfirmDialog = true;
    this.page.state.publishingcompleted = false;
    this.page.state.optimizationstarted = false;
    this.page.state.startTime = this.page.params.startdate;
    this.page.state.gridEnd = this.page.params.enddate;
    this.app = app;
  }

  /* istanbul ignore next */
  pageResumed() {
    this.page.state.tasksWithIssues = this.page.params.issuecount || '-';
    this.page.state.selectedTab = this.page.params.selectedTab;
    this.page.state.disableSaveButton = true;
    this.page.state.updateCronChecked = false;
    this.page.state.useConfirmDialog = false;
    this.page.state.publishingcompleted = false;
    this.page.state.optimizationstarted = false;
    this.page.state.startTime = this.page.params.startdate;
    this.page.state.disableSaveOnResourceLeveling = true;

    if (this.page.params.nodata === 'false') {
      this.page.params.nodata = false;
    }

    const projectDS = this.app.findDatasource('skdprojectsDS');

    projectDS.load({
      noCache: true,
      itemUrl: this.page.params.scenario,
    });
  }

  onDatasourceInitialized(ds, owner, app) {
    this.app = app;
  }

  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
  async onAfterLoadData(dataSource, items) {
    // istanbul ignore next
    if (dataSource.name === 'skdodmerunlatestDS') {
      this.page.state.useConfirmDialog = true;
      this.page.state.runlatesthref = this.page.params.scenario;

      const runlatestDS = this.app.findDatasource('skdodmerunlatestDS');
      const jglobalKPIds = this.app.findDatasource('jglobalKPIds');
      if (items.length === 0) {
        this._resetDataSource(jglobalKPIds);
        await jglobalKPIds.load({ src: [] });
        return;
      }
      const kpiData = runlatestDS.items[0].skdscenariorunkpi_run_global;

      const kpiArray = [];
      let kpiItem;

      if (kpiData !== undefined) {
        kpiItem = this._buildKpiItem(kpiData);
        kpiArray.push(kpiItem);
        this.page.state.tasksWithIssues = kpiItem.unperformedTasks;
      }

      this._resetDataSource(jglobalKPIds);
      await jglobalKPIds.load({ src: kpiArray });
    }
  }

  /* eslint class-methods-use-this: "off" */
  _buildKpiItem(kpiDataItems) {
    let unperformedTasksNumVal;
    let performedTasksNumVal;
    let resourceUtilizationPrctVal;
    let resourcesNumVal;

    kpiDataItems.forEach((item) => {
      if (item.kpiid === 'unperformedTasksNum') {
        unperformedTasksNumVal = item.kpivalue;
      } else if (item.kpiid === 'performedTasksNum') {
        performedTasksNumVal = item.kpivalue;
      } else if (item.kpiid === 'resourceUtilizationPrct') {
        resourceUtilizationPrctVal = Math.ceil(item.kpivalue);
      } else if (item.kpiid === 'resourcesNum') {
        resourcesNumVal = item.kpivalue;
      }
    });
    const newObj = {
      unperformedTasks: unperformedTasksNumVal,
      performedTasks: performedTasksNumVal,
      resourceUtilization: resourceUtilizationPrctVal,
      resourcesNum: resourcesNumVal,
    };
    return newObj;
  }

  /**
   * Reset DS and set src to load.
   */

  /* eslint class-methods-use-this: "off" */
  _resetDataSource(ds) {
    ds.clearState();
    ds.resetState();
  }

  openSchedulingIssuesTab() {
    this.page.state.selectedTab = 2;
  }

  async onRefresh(showRecordHasBeenRefreshed = true) {
    const page = this.app.findPage('scheduleDetails');
    if (page) {
      page.state.disableSaveButton = true;
    }
    const projectDS = this.app.findDatasource('skdprojectsDS');
    const resourceDS = this.app.findDatasource('resourceTypesDS');

    this.page.state.resourceid = resourceDS.items[0].id;

    if (showRecordHasBeenRefreshed) {
      const refreshResponse = await projectDS.invokeAction('refresh', {
        record: projectDS.item,
        parameters: {},
      });

      if (refreshResponse && !refreshResponse.error) {
        await projectDS.forceReload();
        this.app.toast(
          this.app.getLocalizedLabel(
            'activities_refresh_success',
            'Record has been refreshed'
          ),
          'success'
        );
      } else {
        this.app.toast(
          this.app.getLocalizedLabel(
            'activities_refresh_failure',
            'Failed to refresh'
          ),
          'error'
        );
      }
    } else {
      await projectDS.forceReload();
    }
  }

  optimizeDialog() {
    const page = this.app.findPage('scheduleDetails');
    const dialogName = page.state.disableSaveButton
      ? 'optimizeScheduleDialog'
      : 'optimizeScheduleWithoutSavingDialog';
    page.showDialog(dialogName);
  }

  resourceLevelingIsDarkGreen(event) {
    const { value } = event;
    event.matches = value >= 95 && value <= 100;
  }

  resourceLevelingIsMediumGreen(event) {
    const { value } = event;
    event.matches = value >= 90 && value <= 95;
  }

  resourceLevelingIsLightGreen(event) {
    const { value } = event;
    event.matches = value >= 80 && value <= 90;
  }

  openDetailsSlidingDrawer(event) {
    const jresourceLevelingTaskDS = this.app.findDatasource(
      'jresourceLevelingTaskDS'
    );
    this._resetDataSource(jresourceLevelingTaskDS);
    const newTaskObj = {
      name: event.name ? event.name : event.workordernum,
      wopriority: event.wopriority,
      duration: event.duration,
      sneconstraint: event.sneconstraint,
      fnlconstraint: event.fnlconstraint,
      interruptible: event.interruptible,
      starttime: event.starttime,
      status: event.status,
      id: event.id,
      skdprojectid: event.skdprojectid,
    };
    jresourceLevelingTaskDS.load({ src: newTaskObj });
    const page = this.app.findPage('scheduleDetails');
    page.state.disableSaveOnResourceLeveling = true;
    page.showDialog('detailsSlidingDrawer', {
      name: newTaskObj.name,
    });
  }

  closeDetailsSlidingDrawer() {
    const page = this.app.findPage('scheduleDetails');
    page.findDialog('detailsSlidingDrawer').closeDialog();
  }

  showSaveSuccessToast() {
    this.app.toast(
      this.app.getLocalizedLabel(
        'activities_save_success',
        'Record has been saved'
      ),
      'success'
    );
  }

  showSaveErrorToast() {
    this.app.toast(
      this.app.getLocalizedLabel(
        'activities_save_error',
        'Failed to save record'
      ),
      'error'
    );
  }

  showToastBasedOnResponse(response) {
    if (response && !response.error) {
      log.e(TAG, 'response is:', response);
      this.showSaveSuccessToast();
    } else {
      this.showSaveErrorToast();
    }
  }

  async saveActivityChanges() {
    const jresourceLevelingTaskDS = this.app.findDatasource(
      'jresourceLevelingTaskDS'
    );
    const activitiesDS = this.app.findDatasource('skdactivityDS');
    await activitiesDS.initializeQbe();
    activitiesDS.setQBE('id', '=', jresourceLevelingTaskDS.item.id);
    const activityItems = await activitiesDS.searchQBE();
    if (activityItems?.length) {
      activityItems[0].duration = jresourceLevelingTaskDS.item.duration;
      activityItems[0].wopriority = jresourceLevelingTaskDS.item.wopriority;
      activityItems[0].sneconstraint =
        jresourceLevelingTaskDS.item.sneconstraint;
      activityItems[0].fnlconstraint =
        jresourceLevelingTaskDS.item.fnlconstraint;
      activityItems[0].starttime = jresourceLevelingTaskDS.item.starttime;
      const calculatedEndTime = moment(activityItems[0].starttime)
        .add(activityItems[0].duration, 'h')
        .toISOString();
      activityItems[0].endtime = calculatedEndTime;

      activityItems[0].interruptible =
        jresourceLevelingTaskDS.item.interruptible;

      const option = {
        responseProperties: 'id',
      };
      const response = await activitiesDS.save(option);
      this.showToastBasedOnResponse(response);
      const resLevelingDS = this.app.findDatasource('resourceLevelingDs');
      resLevelingDS.forceReload();
    } else {
      this.showSaveErrorToast();
    }
    this._resetDataSource(jresourceLevelingTaskDS);
    const page = this.app.findPage('scheduleDetails');
    page.findDialog('detailsSlidingDrawer').closeDialog();
  }

  async onCustomSaveTransition() {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    const response = await unscheduledDS.save();
    this.showToastBasedOnResponse(response);
    await this.onRefresh(false);
  }

  getDataListCellValueDateGridTimeSeries(event) {
    const { item, key, resultKey } = event;
    if (event.ds) {
      let headerval = moment(key.split('T')[0]).format('ddd, MMM D');
      // istanbul ignore next
      if (event?.ds?.get(0)) {
        headerval = event.ds
          .get(0)
          .skdresourceviewday.find(
            (asset) => asset.createddate.split('T')[0] === key.split('T')[0]
          )?.load;
        event[resultKey] = {
          hoursUtilized: headerval || '--',
          key: moment(key.split('T')[0]).format('ddd, MMM D'),
        };
      }
    } else {
      const val = item.skdresourceviewday.find(
        (asset) => asset.createddate.split('T')[0] === key.split('T')[0]
      )?.availablehrs;
      let datalist = item.skdresourceviewday.find(
        (asset) => asset.createddate.split('T')[0] === key.split('T')[0]
      )?.skdresourceviewday_activity;

      datalist = datalist?.map((listItem) => {
        const listItemTags = [];

        if (listItem.wopriority && typeof listItem.wopriority !== 'undefined') {
          listItemTags.push({
            label: `P${listItem.wopriority}`,
            type: 'red',
          });
        }
        if (listItem.duration) {
          listItemTags.push({
            label: moment()
              .startOf('day')
              .add(listItem.duration, 'minutes')
              .format('m:ss'),
            type: 'blue',
          });
        }
        if (listItem.status) {
          listItemTags.push({ label: listItem.status, type: 'green' });
        }
        return {
          tags: listItemTags,
          ...listItem,
        };
      });

      const getDatalistDsName = `datalistds${key
        .split('T')[0]
        .replace(/-/g, '')}`;
      const dynamicDS = new Datasource(
        new JSONDataAdapter({
          src: datalist || [],
          idAttribute: '_rowstamp',
        }),
        {
          selectionMode: 'single',
          name: getDatalistDsName,
          pageSize: 10,
        }
      );
      /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["event"] }] */
      const color = val >= 60 ? 'support-02' : '#f1c21b';
      event[resultKey] = {
        color: val >= 30 ? color : 'support-01',
        hoursAvailable: !val ? 0 : val,
        datasource: dynamicDS,
        datalistval: datalist,
        key: moment(key.split('T')[0]).format('ddd, MMM D'),
      };
    }
  }

  getResourceLoadCellValue = (event) => {
    const { item, key, resultKey } = event;
    const val = item.skdresourceviewday.find(
      (ass) => ass.createddate.split('T')[0] === key.split('T')[0]
    )?.load;
    let backgroundColor = 'ui-02';
    if (val > 100) {
      backgroundColor = '#DA1E28';
    } else if (val >= 95) {
      backgroundColor = '#42BE65';
    } else if (val >= 90) {
      backgroundColor = '#70DC8C';
    } else if (val >= 80) {
      backgroundColor = '#A7F0BA';
    } else if (val > 0) {
      backgroundColor = '#F1C21B';
    }

    // istanbul ignore next
    const {
      availablehrs: availVal,
      scheduledhrs: schVal,
      resourceid,
    } = item.skdresourceviewday.find(
      (ass) => ass.createddate.split('T')[0] === key.split('T')[0]
    ) || [];

    const createddate = key.split('T')[0];

    const hideText = !val || val === 0 || (val > 80 && val <= 100);
    /* eslint no-param-reassign: "error" */
    /* eslint-disable no-constant-condition */
    // istanbul ignore next
    event[resultKey] = {
      backgroundColor,
      load: hideText ? '' : `${val}%`,
      textColor: val > 100 ? 'text-04' : 'text-02',
      hideText,
      utilization: !val ? 0 : val,
      scheduledhrs: !schVal
        ? 0
        : moment().startOf('day').add(schVal, 'minutes').format('m:ss'),
      availablehrs: !availVal
        ? 0
        : moment().startOf('day').add(availVal, 'minutes').format('m:ss'),
      resourceid,
      createddate,
    };
    return event;
  };

  moveNext(event) {
    const page = this.app.findPage('scheduleDetails');
    // istanbul ignore next
    if (page) {
      page.state.startTime = event.startTime;
      page.state.timeSpan = event.timeSpan;
    }
  }

  openResourceLevelingTab(args) {
    this.page.state.selectedTab = 1;

    if (args.startdate) {
      this.page.state.startTime = args.startdate;
      this.page.state.resourceid = args.resourceid;
    } else {
      this.page.state.startTime = args.item.createddate;
      this.page.state.resourceid = args.item.resourceid;
    }

    const resLevelingDS = this.app.findDatasource('resourceLevelingDs');
    resLevelingDS.forceReload();
  }

  switchTabs(args) {
    if (args.selectedTab === 0) {
      this.page.state.startTime = this.page.params.startdate;
      this.page.state.selectedTab = args.selectedTab;

      const resourceLoadDS = this.app.findDatasource('resourceLoadTableds');
      resourceLoadDS.forceReload();
    } else {
      const resourceDS = this.app.findDatasource('resourceTypesDS');
      this.page.state.resourceid = resourceDS.items[0].id;
      this.page.state.selectedTab = args.selectedTab;

      const resLevelingDS = this.app.findDatasource('resourceLevelingDs');
      resLevelingDS.forceReload();
    }

    // istanbul ignore next
    if (this.page.params.nodata === 'false') {
      this.page.params.nodata = false;
    }
  }

  /* eslint class-methods-use-this: "off" */
  /* eslint-disable no-param-reassign */
  onValueChanged({ datasource, item }) {
    if (
      ['skdactivityunscheduledDS', 'jresourceLevelingTaskDS'].includes(
        datasource.name
      )
    ) {
      if (datasource.name === 'skdactivityunscheduledDS') {
        item.computeChanged = true;
        item.modified = true;
      }
      const page = this.app.findPage('scheduleDetails');
      const validDates =
        (!item.sneconstraint && !item.fnlconstraint) ||
        new Date(item.sneconstraint) < new Date(item.fnlconstraint);
      const validDuration = Number(item.duration) >= 0;

      if (page && validDuration && validDates) {
        if (datasource.name === 'skdactivityunscheduledDS') {
          page.state.disableSaveButton = false;
        } else {
          page.state.disableSaveOnResourceLeveling = false;
        }
      } else if (page) {
        if (datasource.name === 'skdactivityunscheduledDS') {
          page.state.disableSaveButton = true;
        } else {
          page.state.disableSaveOnResourceLeveling = true;
        }
      }
    }
  }
}
