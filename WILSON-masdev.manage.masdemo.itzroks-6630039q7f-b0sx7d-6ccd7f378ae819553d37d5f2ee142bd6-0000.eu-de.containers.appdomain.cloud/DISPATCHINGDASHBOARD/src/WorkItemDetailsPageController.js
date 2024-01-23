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

const TAG = 'WorkItemDetailsPageController';

export default class WorkItemDetailsPageController {
  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
    this.page.state.publishingCompleted = false;
    this.page.state.dispatchloaded = false;
    this.page.state.useConfirmDialog = false;
    this.page.state.disableSaveButton = true;

    const ds1 = this.app.findDatasource('skdactivityunscheduledDS');
    const da = ds1.dataAdapter;

    // eslint-disable-next-line no-underscore-dangle
    if (!da.bulkPut._override) {
      /* istanbul ignore next */
      da.bulkPut = (records, options) =>
        this.bulkPut(records, options, ds1, da);
      // eslint-disable-next-line no-underscore-dangle
      da.bulkPut._override = true;
      ds1.addIgnoreField('craftLoading');
    }
  }

  /* istanbul ignore next */
  /* eslint no-underscore-dangle: ["error", { "allow": ["_bulkid", "_rowstamp"] }] */
  /* eslint no-unused-vars: "off" */
  async bulkPut(records, options, ds, da) {
    const ds1 = this.app.findDatasource('skdactivityunscheduledDS');
    const assignmentDs = this.app.findDatasource('assignmentDs');
    const assignmentIds = [];
    // find the actual assignment ID
    // there's probably a better way to do this
    ds1.forEach((r) => {
      const rec = records.find((rr) => rr._bulkid === r._rowstamp);
      if (rec) {
        assignmentIds.push(r.assignmentid);
        rec.assignmentid = r.assignmentid;
      }
    });
    assignmentDs.clearQBE();
    if (assignmentIds.length === 1) {
      assignmentDs.setQBE('assignmentid', `=${assignmentIds[0]}`);
    } else if (records.length > 1) {
      assignmentDs.setQBE('assignmentid', assignmentIds);
    } else {
      // not sure
    }
    const items = await assignmentDs.searchQBE();
    // copy our modified fields into the loaded items
    records.forEach((r) => {
      const item = assignmentDs.getById(r.assignmentid);
      Object.keys(r).forEach((k) => {
        if (k.startsWith('_')) return;
        if (k === 'href') return;
        item[k] = r[k];
      });
    });
    // save the items
    const response = await assignmentDs.save();
    return response;
  }

  /* istanbul ignore next */
  pageResumed() {
    this.page.state.updateCronChecked = false;
    this.page.state.publishingCompleted = false;
    this.page.state.dispatchloaded = false;
    this.page.state.disableSaveButton = true;
    this.page.state.useConfirmDialog = false;

    const projectDS = this.app.findDatasource('skdprojectsDS');
    const dispatchdefDS = this.app.findDatasource('dispatchdef');

    projectDS.load({
      noCache: true,
      itemUrl: this.page.params.scenario,
    });

    dispatchdefDS.load({
      noCache: true,
    });
  }

  onDatasourceInitialized(ds, owner, app) {
    this.app = app;
  }

  updateRunLatestHref(dataSourceName) {
    if (dataSourceName !== 'skdodmerunlatestDS') {
      return;
    }

    this.page.state.runlatesthref = this.page.params.scenario;
  }

  async onRefresh() {
    const projectDS = this.app.findDatasource('skdprojectsDS');

    const refreshResponse = await projectDS.invokeAction('refresh', {
      record: projectDS.item,
      parameters: {},
    });

    if (refreshResponse && !refreshResponse.error) {
      await projectDS.forceReload();
      this.app.toast(
        this.app.getLocalizedLabel(
          'refresh_success',
          'Record has been refreshed'
        ),
        'success'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel('refresh_failure', 'Failed to refresh'),
        'error'
      );
    }
  }

  optimizeDialog() {
    const skdprojectscenarioDS = this.app.findDatasource(
      'skdprojectscenarioDS'
    );
    if (skdprojectscenarioDS.item.skdspatialparam) {
      this.page.showDialog('optimizeScheduleDialog');
    } else {
      log.e(TAG, 'optimizeDialog: skdspatialparam is not set');
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_dialog_open_error',
          'Failed to open the Optimize dialog'
        ),
        'error'
      );
    }
  }

  updateDateToTreeGridFormat = (runItem = []) => {
    const updatedRunItem = [];
    runItem.forEach((item) => {
      const newItem = JSON.parse(JSON.stringify(item));
      if (item.start) {
        newItem.Start = Date.parse(item.start);
        delete newItem.start;
      }
      if (item.duration) {
        newItem.Duration = item.duration;
        delete newItem.duration;
      }
      newItem.Class = 'AssignedSlot';
      updatedRunItem.push(newItem);
    });
    return updatedRunItem;
  };

  async updateTreegridDefinitionDs() {
    const dispatchdef = this.app.findDatasource('dispatchdef');
    const newData = JSON.parse(JSON.stringify(dispatchdef.items));
    const { startDate } = this.page.params;
    newData[0].Toolbar.DatePicker = new Date(startDate.split('T')[0]);
    newData[0].Cols[0].GanttZoomDate = new Date(startDate).setUTCSeconds(0);
    await dispatchdef.load({
      src: newData,
    });
  }

  /* eslint-disable no-param-reassign */
  onValueChanged({ datasource, item }) {
    if (
      datasource.name === 'skdprojectscenarioDS' ||
      datasource.name === 'skdactivityunscheduledDS'
    ) {
      item.computeChanged = true;
    }
    if (datasource.name === 'skdactivityunscheduledDS') {
      this.page.state.disableSaveButton = false;
      this.page.state.useConfirmDialog = true;
    }
  }

  selectLookupItem = (assignmentValues) => {
    const workItemDetailsPage = this.app.findPage('workItemDetails');
    const skdactivityunscheduledDS = this.app.findDatasource(
      'skdactivityunscheduledDS'
    );
    return skdactivityunscheduledDS.items.map((item) => {
      if (
        item.assignmentid === workItemDetailsPage.state.selectedAssignmentId
      ) {
        const newItem = item;
        Object.keys(assignmentValues).forEach((assignmentAttribute) => {
          newItem[assignmentAttribute] = assignmentValues[assignmentAttribute];
        });
        return { ...newItem };
      }
      return item;
    });
  };

  selectCraft = (event) => {
    const { craft, skilllevel } = event[0];
    this.selectLookupItem({ craft, skilllevel });
  };

  selectLabor = (event) => {
    this.selectLookupItem({ laborcode: event[0].laborcode });
  };

  selectCrew = (event) => {
    this.selectLookupItem({ amcrew: event[0].amcrew });
  };

  selectCrewType = (event) => {
    this.selectLookupItem({ amcrewtype: event[0].amcrewtype });
  };

  setLoadingLookup = (loading, getListName) => {
    const loadingAttribute = `${getListName}Loading`;
    const workItemDetailsPage = this.app.findPage('workItemDetails');
    const skdactivityunscheduledDS = this.app.findDatasource(
      'skdactivityunscheduledDS'
    );

    const updatedAssignments = skdactivityunscheduledDS.items.map((item) => {
      const newItem = item;
      newItem[loadingAttribute] =
        item.assignmentid === workItemDetailsPage.state.selectedAssignmentId
          ? loading
          : false;
      return newItem;
    });

    return updatedAssignments;
  };

  openLookup = async ({ assignmentid, lookupId }) => {
    if (!lookupId || !assignmentid) {
      return;
    }

    const woDetailDs = this.app.findDatasource('woDetailDs');
    const workItemDetailsPage = this.app.findPage('workItemDetails');
    let getListName;
    let lookupDsName;

    switch (lookupId) {
      case 'crewType_lookup':
        getListName = 'amcrewtype';
        lookupDsName = 'crewTypelookupDS';
        break;
      case 'crew_lookup':
        getListName = 'amcrew';
        lookupDsName = 'crewlookupDS';
        break;
      case 'craft_lookup':
        getListName = 'craft';
        lookupDsName = 'craftlookupDS';
        break;
      case 'labor_lookup':
        getListName = 'laborcode';
        lookupDsName = 'laborlookupDS';
        break;
      default:
        break;
    }

    this.setLoadingLookup(true, getListName);
    workItemDetailsPage.state.selectedAssignmentId = assignmentid;

    const lookupDS = this.app.findDatasource(lookupDsName);

    const woDetailRecords = await woDetailDs.load({
      where: `assignment.assignmentId=${assignmentid}`,
    });

    if (woDetailRecords.length && woDetailRecords[0].assignment.length) {
      await lookupDS.load({
        lookup: getListName,
        itemUrl: woDetailRecords[0].assignment[0].localref,
      });
      this.app.showLookup(lookupId);
    }
    this.setLoadingLookup(false, getListName);
  };

  async onAfterLoadData(dataSource, items) {
    if (items.length === 0) {
      return;
    }
    this.updateRunLatestHref(dataSource.name);

    if (dataSource.name === 'dispatchdef') {
      this.updateTreegridDefinitionDs();
    } else if (dataSource.name === 'resourceDispatchDs') {
      const dispatchdata = this.app.findDatasource('dispatchdata');
      const updatedGridItems = [];

      items.forEach((item) => {
        let resourceItem;
        let resourceType;
        const utilization = `${item.utilization}%`;

        if (item.refobjname === 'LABOR') {
          resourceItem = !item.name
            ? item.resourcelabor[0].laborcode
            : item.name;
          if (
            item.restype &&
            item.resourcelabor[0].laborcraftratedefault?.skilllevel
          ) {
            resourceType = `<div>${item.restype} <p>${item.resourcelabor[0].laborcraftratedefault.skilllevel}</p></div>`;
          } else if (item.restype) {
            resourceType = `<div>${item.restype}</div>`;
          }
          updatedGridItems.push({
            Resource: resourceItem,
            'Resource type': resourceType,
            Shift: item.shiftnum,
            Utilization: utilization,
            Run: this.updateDateToTreeGridFormat(item.skdresourcedispview),
          });
        } else {
          resourceItem = !item.name ? item.resourceamcrew[0].amcrew : item.name;
          updatedGridItems.push({
            Resource: resourceItem,
            'Resource type': item.restype,
            Utilization: utilization,
            Shift: item.shiftnum,
            Run: this.updateDateToTreeGridFormat(item.skdresourcedispview),
          });
        }
      });

      const dataIsConverted =
        updatedGridItems.length && updatedGridItems[0].Body;
      /* istanbul ignore next */
      if (!dataIsConverted) {
        await dispatchdata.load({
          src: { Body: [{ Items: updatedGridItems }] },
        });
      }
      this.page.state.dispatchloaded = true;
    }
  }

  goToDashboardPage() {
    this.page.state.redirect = false;
    this.app.setCurrentPage('dispatch');
  }

  async onCustomSaveTransition() {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    const response = await unscheduledDS.save();
    if (response && !response.error) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'activities_save_success',
          'Record has been saved'
        ),
        'success'
      );
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
