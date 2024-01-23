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

class AttachmentsController {
    pageInitialized(page, app) {
        this.app = app;
        this.page = page;
      }
    /*
    * Method to resume the page and load work order attachment datasource
    */
    //istanbul ignore next
    async pageResumed(page) {
        this.page.state.addattachmentAccess = this.app.checkSigOption('MXAPIWODETAIL.ADDATTACHMENTS') ? true :false ;
        const workOrderAttachmentResource = page.datasources['workOrderAttachmentResource'];
        const attachmentListDS = page.datasources['attachmentListDS'];
        await workOrderAttachmentResource.load({noCache:true, itemUrl: page.params.itemhref});
        this.page.state.attachmentWonum = workOrderAttachmentResource.item.wonum;
        if (this.forceSyncNeeded(page.params.itemhref)) {
            await workOrderAttachmentResource.load({noCache: true, forceSync: true, itemUrl: page.params.itemhref});
        }
        attachmentListDS.clearState();
        attachmentListDS.forceReload();

    }

	onAfterLoadData(dataSource, items) {
		let self = this;
        //istanbul ignore else
		if (dataSource.name === 'attachmentListDS' && items) {
			self.app.state.doclinksCountData[this.page.state.attachmentWonum] = items.length;
		}
	}

    forceSyncNeeded(itemUrl) {
        const workOrderUID = itemUrl.split("/").pop();
        let workorderList = sessionStorage.getItem('updated_workorder_attachments');
        //istanbul ignore else
        if (!workorderList) {
            workorderList = "[]";
          }
        const workorderListJson = JSON.parse(workorderList);
        const index = workorderListJson.indexOf(workOrderUID);
        if (index > -1){
            //remove item from sessionstorage
            workorderListJson.splice(index, 1);
            sessionStorage.setItem('updated_workorder_attachments', JSON.stringify(workorderListJson));
            return true;
        } else return false;
    }
}
export default AttachmentsController;
