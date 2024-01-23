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

/**
 * Controller for inspectionStatusChangeDialog sliding-drawer
 * This controller is used to handle the change of an inspection status
 */

import { log, ObjectUtil } from '@maximo/maximo-js-api';

const TAG = 'ChangeStatusController';

class ChangeStatusController {
  dialogInitialized(page, app) {
    this.page = page;
    this.app = this.page.parent.state.appVar;
    delete this.page.parent.state.appVar;
    this.page.state.selectedStatus = '';
    this.page.state.selectedMaxStatus = '';
    log.t(
      TAG,
      'dialogInitialized : disableDoneButton --> ' +
      this.page.parent.state.disableDoneButton +
      ' selectedStatus --> ' +
      this.page.state.selectedStatus
    );
  }

  dialogOpened() {
    this.page.parent.state.disableDoneButton = true;
    this.page.state.selectedStatus = '';
    this.page.state.selectedMaxStatus = '';
    delete this.page.parent.state.appVar;
    log.t(
      TAG,
      'dialogOpened : disableDoneButton --> ' +
      this.page.parent.state.disableDoneButton +
      ' selectedStatus --> ' +
      this.page.state.selectedStatus
    );
  }

  /**
   * clear the ds search;
   * @param {ds} is database name
   */
  async clearSearch(ds) {
    /* istanbul ignore else  */
    if (ds && ds.lastQuery.qbe && JSON.stringify(ds.lastQuery.qbe) !== '{}') {
      ds.clearQBE();
      await ds.searchQBE(undefined, true);
    }
  }

  async archiveBatch(inspection) {
    const ds = this.page.parent.datasources.assignedworkds;
    await ds.forceReload();

    //istanbul ignore next
    await ds.initializeQbe();
    ds.setQBE('referenceobject', 'PARENTWO');
    ds.setQBE('referenceobjectid', inspection.parent);

    //istanbul ignore next
    let batchRecord = await ds.searchQBE();
    await this.clearSearch(ds);
    const batchSiblins = batchRecord[0]?.batchlist?.filter(
      item => item.inspectionresultid !== inspection.inspectionresultid
    );

    if (batchSiblins?.every(batch => batch.historyflag === true)) {
      batchRecord[0].historyflag = true;

      await ds.save();
      await ds.forceReload();
      /* istanbul ignore else  */
    } else if (
      batchSiblins?.every(
        batch =>
          batch.status_maxvalue === 'COMPLETED' ||
          batch.historyflag === true ||
          batch.status_maxvalue === 'CAN'
      )
    ) {
      try {
        this.page.state.loadingstatus = true;
        const parentOption = {
          item: batchRecord[0],
          datasource: ds,
          newStatus: 'COMPLETED'
        };
        //istanbul ignore next
        await this.app.callController('changeResultStatus', parentOption);
      } finally {
        this.page.state.loadingstatus = false;
      }
    }
  }

  async checkSiblingsAndCancelBatchParent(inspection, selectedDatasource) {
    log.t(TAG, 'changeStatus : selectedStatus --> ' + this.page.state.selectedStatus);
    await selectedDatasource.forceReload();

    //istanbul ignore else
    if (inspection) {
      await selectedDatasource.initializeQbe();
      selectedDatasource.setQBE('parent', inspection.parent);
      let siblings = await selectedDatasource.searchQBE();
      await this.clearSearch(selectedDatasource);

      //istanbul ignore else
      if (!siblings.length) {
        await selectedDatasource.initializeQbe();
        selectedDatasource.setQBE('referenceobjectid', inspection.parent);
        let batchParent = await selectedDatasource.searchQBE();
        await this.clearSearch(selectedDatasource);
        
        //istanbul ignore else
        if(batchParent.length){
          const controllerOption = {
            item: batchParent[0],
            datasource: selectedDatasource,
            newStatus: this.page.state.selectedMaxStatus
          };
  
          const response = await this.callChangeResultStatus(controllerOption);
  
          ObjectUtil.mergeDeep(batchParent, response);
        }
      }
    }
  }

  async callChangeResultStatus(controllerOption) {
    return await this.app.callController(
      'changeResultStatus',
      controllerOption
    );
  }

  async cancelBatchChildren(inspection) {
    log.t(TAG, 'changeStatus : selectedStatus --> ' + this.page.state.selectedStatus);
    let selectedDatasource = this.app.pages[0].datasources.assignedworkds;

    const defaultOption = {
      item: null,
      datasource: selectedDatasource,
      newStatus: this.page.state.selectedMaxStatus
    };
    await selectedDatasource.forceReload();
    //istanbul ignore else
    if (inspection) {
      await selectedDatasource.initializeQbe();
      selectedDatasource.setQBE('parent', inspection.referenceobjectid);
      let filteredRecords = await selectedDatasource.searchQBE();

      for (const record of filteredRecords) {
        const controllerOption = {
          ...defaultOption,
          item: record
        };

        const response = await this.callChangeResultStatus(controllerOption);

        ObjectUtil.mergeDeep(record, response);
      }

      await this.clearSearch(selectedDatasource);
    }
  }

  async archiveBatchChildren(inspection) {
    let page = this.page.parent;
    let selectedDSName = page.state.referenceDS;
    let selectedStatus = this.page.state.selectedStatus;

    log.t(TAG, 'changeStatus : selectedStatus --> ' + selectedStatus);
    let selectedDatasource = page.datasources[selectedDSName];

    await selectedDatasource.forceReload();
    //istanbul ignore else
    if (inspection) {
      await selectedDatasource.initializeQbe();
      selectedDatasource.setQBE('parent', inspection.referenceobjectid);
      await selectedDatasource.searchQBE();
      //istanbul ignore else
      if (selectedDatasource.items) {
        for (const record of selectedDatasource.items) {
          record.historyflag = true;
        }
        await selectedDatasource.save();
      }
      await this.clearSearch(selectedDatasource);
    }
  }
  /*
   * Method to change the status. This is called from from the following pages:
   *    - Main page
   */
  //istanbul ignore next
  async changeStatus() {
    let page = this.page.parent;

    let selectedDSName = page.state.referenceDS;
    let inspection = page.state.inspectionItem;
    let selectedStatus = this.page.state.selectedStatus;
    let selectedMaxStatus = this.page.state.selectedMaxStatus;

    log.t(TAG, 'changeStatus : selectedStatus --> ' + selectedStatus);
    let selectedDatasource = page.datasources[selectedDSName];

    if (selectedMaxStatus === 'ARCHIVED') {
      if (inspection.parent) await this.archiveBatch(inspection);
      if (inspection.isbatch) await this.archiveBatchChildren(inspection);
      inspection.historyflag = true;
      try {
        page.state.loadingstatus = true;
        await selectedDatasource.save();
        await selectedDatasource.forceReload();
        page.findDialog(page.state.statusDialog).closeDialog();
      } catch (error) {
        log.t(TAG, error);
      } finally {
        page.state.loadingstatus = false;
      }
    } else {
      log.t(
        TAG,
        'changeStatus : Page Item = ' +
        inspection.inspectionresultid +
        ' selectedDSName --> ' +
        selectedDSName +
        ' Parent Page inspectionItem --> ' +
        inspection.inspectionresultid
      );
      try {
        page.state.loadingstatus = true;
        const option = {
          item: inspection,
          datasource: selectedDatasource
        };
        const domainItem = {
          value: this.page.state.selectedStatus,
          maxvalue: this.page.state.selectedMaxStatus,
          description: this.page.state.selectedStatusDescription
        };
        if (inspection.isbatch) await this.cancelBatchChildren(inspection);
        await this.app.callController(
          'invokeChangeResultStatus',
          domainItem,
          option
        );

        await selectedDatasource.forceReload();
 
        if (inspection.parent){
          await this.checkSiblingsAndCancelBatchParent(inspection, selectedDatasource)
          await selectedDatasource.forceReload();
        }

        // Close the dialog .. this.page is the dialog's page, hence traverse to the parent page
        // and then call findDialog / closeDialog ..
        this.page.parent.controllers[0]._refreshPageList();

        page.findDialog(page.state.statusDialog).closeDialog();
      } finally {
        page.state.loadingstatus = false;
      }
    }
  }

  /**
   * Compute some page states related to status to be used on the changeStatus method
   * @param {Object} item selected status object
   */
  selectStatus(item) {
    log.t(TAG, 'selectStatus : SelectStatus called .. ' + JSON.stringify(item));
    this.page.state.selectedStatus = item.value;
    this.page.state.selectedMaxStatus = item.maxvalue;
    this.page.state.selectedStatusDescription = item.description;
    if (
      this.page.parent.datasources.dsstatusDomainList &&
      this.page.parent.datasources.dsstatusDomainList.state.selection.count > 0
    ) {
      this.page.parent.state.disableDoneButton = false;
    } else {
      this.page.parent.state.disableDoneButton = true;
    }
  }
}

export default ChangeStatusController;
