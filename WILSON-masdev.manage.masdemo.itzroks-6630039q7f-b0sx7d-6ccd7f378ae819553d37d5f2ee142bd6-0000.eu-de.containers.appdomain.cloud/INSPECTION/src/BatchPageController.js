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

import {ObjectUtil} from '@maximo/maximo-js-api';
import InspectionsList from './components/common/InspectionsList.js';
import {STATUS} from './Constants';

class BatchPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    //istanbul ignore next
    if (
      app.state.incomingContext &&
      (app.state.incomingContext.uid || app.state.incomingContext.params)
    ) {
      app.pageStack[0] = 'main';
      app.state.incomingContext = '';
    }

    //istanbul ignore else
    if (
      !page.params.isCompletedFromPreview &&
      (!page.params.inspectionresultid || !page.params.itemhref)
    ) {
      this.app.toast('Missing page parameter ids');
      return;
    }
  }

  goBack() {
    let inspResultIds = this.page.datasources.batchlistds.items.map(
      i => i.inspectionresultid
    );
    let isBatch = inspResultIds.some(key =>
      Object.keys(this.app.state.completedItems).includes(key.toString())
    );
    this.app.setCurrentPage({
      name: 'main',
      params: {isBatch: isBatch}
    });
  }

  async openBatchInspections(inspections) {
    const currentDs = this.page.datasources.batchlistds;

    const defaultOption = {
      item: null,
      datasource: currentDs,
      newStatus: 'INPROG'
    };

    const pendingRecords = inspections.filter(
      i => i.status_maxvalue === STATUS.PENDING
    );

    for (const record of pendingRecords) {
      const controllerOption = {
        ...defaultOption,
        item: record
      };

      const response = await this.app.callController(
        'changeResultStatus',
        controllerOption
      );

      // TODO is the merge really necessary?
      ObjectUtil.mergeDeep(record, response);
    }
    let inspectionresultid = [];
    let itemhref = [];

    const sortedInspections = inspections.sort(
      (a, b) => Number(a.inspectionresultid) - Number(b.inspectionresultid)
    );
    // use selection order if no sequence found
    inspectionresultid = sortedInspections.map(i => i.inspectionresultid);
    itemhref = sortedInspections.map(i => i.href);

    this.app.state.inspectionsList = new InspectionsList(itemhref);

    this.app.setCurrentPage({
      name: 'execution_panel',
      resetScroll: true,
      params: {
        isBatch: true,
        inspectionresultid,
        itemhref
      }
    });
  }

  /**
   * Handler for selected items from inspection-card
   * Checks datasource selection and invoke page change
   * @returns null
   */
  async openBatch() {
    this.page.state.loadingstatus = true;
    const inspections = this.page.state.inspections;
    //istanbul ignore next
    if (inspections) {
      const completeStatusList = [STATUS.COMPLETED, STATUS.CAN, STATUS.REVIEW];
      const incompleteInspections = inspections.filter(i => !completeStatusList.includes(i.status_maxvalue));
      let inspList = null;
      //istanbul ignore else
      if (incompleteInspections?.length) {
        inspList = incompleteInspections;
      }
      else if (inspections.every(i => i.status_maxvalue === STATUS.COMPLETED)) {
        inspList = inspections;
      }
      else if (inspections.every(i => i.status_maxvalue === STATUS.REVIEW || i.status_maxvalue === STATUS.COMPLETED)) {
        inspList = inspections.filter(i => i.status_maxvalue === STATUS.REVIEW);
      }
      this.openBatchInspections(inspList);
      this.page.state.loadingstatus = false;
    } else{
      //istanbul ignore next
      this.app.toast(
        'To complete this action, the related work order must first be assigned to you.',
        'error',null,null,false
      );
      //istanbul ignore next
      this.page.state.loadingstatus = false;
    }
  }

  openInspectionInPreviewMode(item) {
    const inspections = this.page.state.inspections;
    let previewedItem = null;
    //istanbul ignore else
    if (inspections) {
      previewedItem = inspections.find(inspection => inspection.inspectionresultid === item.inspectionresultid);
      this.app.setCurrentPage({
        name: 'execution_panel',
        resetScroll: true,
        params: {
          isBatchPreview: true,
          inspectionresultid: previewedItem.inspectionresultid,
          itemhref: previewedItem.href
        }
      });
    }else{
      //istanbul ignore next
      this.app.toast(
        'To complete this action, the related work order must first be assigned to you.',
        'error',null,null,false);
    }

  }
}

export default BatchPageController;
