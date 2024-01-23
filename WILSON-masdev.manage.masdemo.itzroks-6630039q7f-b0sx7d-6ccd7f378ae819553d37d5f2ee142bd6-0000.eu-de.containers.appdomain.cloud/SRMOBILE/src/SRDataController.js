/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

class SRDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }



  onBeforeLoadData(datasource, query) {
    // if the page is not in a loading state, it means we are in a forceSync and we need to reset the QBE state
    // istanbul ignore next
    if (query.start === 0 && !this.app.state.pageLoading && !datasource.state.isInsideForceSync) {
      datasource.state.isInsideForceSync = true;
      query.qbe = {};
      datasource.clearQBE();
    }
  }



  async onAfterLoadData(datasource, items, query) {
    // istanbul ignore next
    if (datasource.state.isInsideForceSync) {
      let srMainPage = this.app.currentPage;
      switch (srMainPage.state.selectedDropdown) {
        case "completedrequests":
          srMainPage.controllers[0].filterSrByStatus(this.app.state.synonym.completedSrStatusList);
          break;
        default: //activerequests
          srMainPage.controllers[0].filterSrByStatus(this.app.state.synonym.activeSrStatusList);
      }
      delete datasource.state.isInsideForceSync;
    }

    //Call the computed data after load instead in attribute computed-function to avoid undefined occurrences.
    for (const item of items) {
      item.computedSRStatusPriority = this.computedSRStatusPriority(item);
      item.computedSRDescription = this.computedSRDescription(item);
    }
  }



  /**
   * Return SR status and priority on sr list page.
   * @param {item} item Current item to format status and priority strings
   * @return {status_description} string value
   * @return {reportedpriority_description} string value 
   */
  computedSRStatusPriority(item) {

    let srStatus = {
      label: item.status_description,
      type: 'cool-gray'
    };

    if (item.reportedpriority_description) {
      return [srStatus,
        {
          label: item.reportedpriority_description,
          type: 'dark-gray'
        }];
    } else {
      return [srStatus];
    }
  }



  /**
   * Return SR description and ticketid on sr list page.
   * @param {item} item Current item to concatenate string
   * @return String value concatenation of description, blank space and ticketid
   */
  computedSRDescription(item) {
    let description = "";
    // istanbul ignore else
    if(item.description !== null && typeof item.description !== "undefined")
      description = item.description;
    return description + " " + item.ticketid;
	
  }



  //istanbul ignore next
  async loading() {
    const ds = this.datasource;
    if (!ds.state.loading && ds.name === 'unsyncedrequests' && ds.hasCacheExpired()) {
      this.owner.controllers[0].loadUnsyncData();
    }
  }



  /**
   * Calculates the count of comments for the SR
   * @param {*} item Current item to calculate count
   * @returns A positive number of 0 or more
   */
  computedWorklogCount(item) {
    let countFromServer = item.worklogcount;
    let countFromDS = 0;
    // if (this.app.state.isMobileContainer) {
    //   let worklogDS = this.app.findDatasource("worklogDS");
    //   countFromDS = worklogDS.state.itemCount;
    // }
    return Math.max(countFromServer, countFromDS);
  }



  /**
   * Calculates the count of attachments for the SR
   * @param {*} item Current item to calculate count
   * @returns A positive number of 0 or more
   */
  computedDoclinksCount(item) {
    let countFromServer = item.doclinkscount;
    let countFromDS = 0;
    // if (this.app.state.isMobileContainer) {
    //   let attachmentDS = this.app.findDatasource("attachmentDS");
    //   countFromDS = attachmentDS.state.itemCount;
    // }
    return Math.max(countFromServer, countFromDS);
  }

} export default SRDataController;
