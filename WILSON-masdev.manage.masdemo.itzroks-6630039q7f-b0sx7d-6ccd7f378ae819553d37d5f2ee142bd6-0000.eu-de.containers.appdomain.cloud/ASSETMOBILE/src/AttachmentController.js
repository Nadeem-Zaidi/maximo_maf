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
    * Method to resume the page and load Asset attachment datasource
    */
    async pageResumed(page) {
        this.page.state.addAttachmentAccess = this.app.checkSigOption('MXAPIASSET.ADDATTACHMENT') ? true :false ;
        const assetAttachmentResourceDs = page.datasources['assetAttachmentResourceDs'];
        const attachmentListDS = page.datasources['attachmentListDS'];
        await assetAttachmentResourceDs.load({noCache:true, itemUrl: page.params.itemhref});
        this.page.state.attachmentAssetnum = assetAttachmentResourceDs.item.assetnum;
        if (this.isAttachmentAvailable(page.params.itemhref)) {
            await assetAttachmentResourceDs.load({noCache: true, forceSync: true, itemUrl: page.params.itemhref});
        } 
        await attachmentListDS.forceReload();
 
    }

    onAfterLoadData(dataSource, items) {
        let self = this;
        //istanbul ignore else
        if (dataSource.name === 'attachmentListDS' && items) {
            self.app.state.doclinksCountData[this.page.state.attachmentAssetnum] = items.length;
            self.app.state.doclinksCountDataUpdated = true;
        }
    }

    isAttachmentAvailable(itemUrl) {
        const assetUID = itemUrl.split("/").pop();
        let assetList = sessionStorage.getItem('updated_asset_attachments');
        //istanbul ignore else
        if (!assetList) {
            assetList = "[]";
          }
        const assetListJson = JSON.parse(assetList);
        const index = assetListJson.indexOf(assetUID);
        if (index > -1){
            //remove item from sessionstorage
            assetListJson.splice(index, 1);
            sessionStorage.setItem('updated_asset_attachments', JSON.stringify(assetListJson));
            return true;
        } else {
            return false;
        }
    }
}
export default AttachmentsController;
