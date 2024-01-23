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

class BatchDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  onAfterLoadData(datasource, items) {
    this.getAssignedInspectionsFromBatch();
  }

  async getAssignedInspectionsFromBatch() {
    this.owner.state.loadingstatus = true;
    //istanbul ignore next
    const ds = this.app.pages[0].datasources.assignedworkds;
    const inspectionsDs = this.owner.datasources.batchds?.items
    await ds.forceReload();
    //TODO: find how to mock this.owner.datasources.batchds.items
    //istanbul ignore next
    if (inspectionsDs[0]) {
      await ds.initializeQbe();
      ds.setQBE('parent', inspectionsDs[0].referenceobjectid);
      let filteredDomainValues = await ds.searchQBE();
      await this.clearSearch(ds);
      if (Boolean(filteredDomainValues.length)){
        this.owner.state.inspections = filteredDomainValues;
        this.owner.state.currentHref = this.owner.params.itemhref;
      }
      this.owner.state.loadingstatus = false;

      return;
    }
    this.owner.state.loadingstatus = false;
    //istanbul ignore next
    return null;
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

  _computeWOTitle(item) {
    let workorderinfo = null;

    //istanbul ignore else
    if (item && item.workorder && item.workorder[0]) {
      workorderinfo = `${item.workorder[0].worktype ? item.workorder[0].worktype + ' ' : ''}${item.workorder[0].wonum ? item.workorder[0].wonum + ' ' : ''}${item.workorder[0].description ? item.workorder[0].description : ''}`;
    }
    return workorderinfo;
  }

  _computeHideCompleted(item) {
    let inspectionStaus = this.app.state.completedItems[item.inspectionresultid];

    //istanbul ignore else
    if (!inspectionStaus) {
      inspectionStaus = item.status_maxvalue;
    }

    return (inspectionStaus !== 'COMPLETED' && inspectionStaus !== 'REVIEW');
  }


  _computeHidePreview(item) {
    let inspectionStaus = this.app.state.completedItems[item.inspectionresultid];

    //istanbul ignore else
    if (!inspectionStaus) {
      inspectionStaus = item.status_maxvalue;
    }

    return (this.app.device.isMaximoMobile && (inspectionStaus === 'COMPLETED' || inspectionStaus === 'CAN'));
  }
}

export default BatchDataController;
