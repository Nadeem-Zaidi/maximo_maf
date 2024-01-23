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
import 'regenerator-runtime/runtime';

class SRCommonController {

  /**
   * Function to open a sliding-drawer dialog to show comments
   * @param {*} event - event containing information about current item.
   */
  async openWorkLogDrawer(event) {
    let srDS = this.app.findDatasource('srDS');
    srDS.currentItem = event.item;
    const worklogDialogName = (this.page.name === "main")? "srIndexWorkLogDrawer" : "srWorkLogDrawer";
    this.page.state.defaultLogType = '!CLIENTNOTE!';
    await this.loadWorkLogComments();
    this.page.state.chatLogReadOnly = event.item.historyflag;
    this.page.showDialog(worklogDialogName);
    let schema = this.app.findDatasource('worklogDS').getSchemaInfo('logtype');
    // istanbul ignore else
    if (schema) {
      this.page.state.defaultLogType = schema.default;
    }
  }



  async loadWorkLogComments() {
    this.app.state.canLoad.worklog = true;
    let worklogDS = this.app.findDatasource('worklogDS');
    await worklogDS
      .forceReload()
      .then((response) => {
        this.page.state.chatLogGroupData = [];
        //istanbul ignore next
        if (response) {
          response.forEach((item) => {
            let chatItem = {
              createby: ((item.displayname)? item.displayname : item.createby),
              createdate: item.createdate,
              description: item.description,
              description_longdescription: item.description_longdescription,
            }
            this.page.state.chatLogGroupData.push(chatItem);
          });
        }
      });
  }



  /**
   * Method to add new work log record
   * @param {*} value The event sent from the button in chat-log
   * @returns Nothing
   */
  async saveWorkLog(value) {
    //istanbul ignore next
    if (!value || (!value.summary && !value.longDescription)) {
      return;
    }

    let worklogDS = await this.app.findDatasource("worklogDS");
    let worklog = await worklogDS.addNew();
    //istanbul ignore else
    if (value.summary) {
      worklog.description = value.summary;
    }
    //istanbul ignore else
    if (value.longDescription) {
      worklog.description_longdescription = value.longDescription;  
    }
    worklog.clientviewable = true;

    this.app.userInteractionManager.drawerBusy(true);
    this.page.state.chatLogLoading = true;

    try {
      await worklogDS.save();
      await this.loadWorkLogComments();
      this.updateWorkLogCount();
    } finally {
      this.page.state.chatLogLoading = false;
      this.app.userInteractionManager.drawerBusy(false);
    }
  }



  /**
   * This will update the comments count badge in SR details page
   */
  async updateWorkLogCount() {
    //istanbul ignore else
    if (this.page.name === "main") {
      let srDS = this.app.findDatasource("srDS");
      srDS.forceReload();
    } else {
      this.page.state.worklogCount++;
      this.app.state.refreshActiveRequests = true;
    }
  }



  /**
   * Redirects to attachments page.
   * @param {*} event Contains the item clicked
   */
  openAttachmentPage(event) {
    let srDS = this.app.findDatasource("srDS");
    srDS.currentItem = event.item;
    this.app.state.selectedSR = event.item;
    this.app.setCurrentPage({ name: 'attachments', params: { itemhref: event.item.href } });
  }

} export default SRCommonController;
