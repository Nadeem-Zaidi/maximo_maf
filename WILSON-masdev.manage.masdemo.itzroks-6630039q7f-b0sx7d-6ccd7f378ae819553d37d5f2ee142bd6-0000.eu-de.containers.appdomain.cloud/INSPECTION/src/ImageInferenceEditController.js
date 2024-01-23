/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log } from '@maximo/maximo-js-api';
import {UIBus} from '@maximo/react-components';



const TAG = 'ImageInferenceEditController';

class ImageInferenceEditController {
  constructor() {
    log.t(TAG, 'Created');
  }

  dialogInitialized(dialog) {
    log.t(TAG, 'Initialized');
    this.dialog = dialog;
    this.app = dialog.getApplication();
  }
   
  async saveEdit() {
    this.app.currentPage.state.saveInProgress = true;
    const inspfieldresult = this.app.findDatasource('inspfieldresult');
    inspfieldresult.save();
    UIBus.emit('save-mvi-update', inspfieldresult.item);
    this.dialog?.closeDialog();
  }

  dialogOpened(){
    const inspfieldresult = this.app.findDatasource('inspfieldresult');
    this.app.currentPage.state.currentimage = JSON.stringify(inspfieldresult.item);
  }

  onClose() {
    let inspfieldresult = this.app.findDatasource("inspfieldresult");
    const getChangedDatasources = this.app.getChangedDatasources;
    const tempSave = this.saveEdit.bind(this);
    //istanbul ignore next
    this.app.getChangedDatasources = () => [];
    let temp = JSON.stringify(inspfieldresult.item);
    if (temp !== this.app.currentPage.state.currentimage) {
      this.app.currentPage.customSaveTransition = async () => {
        tempSave();
        this.app.currentPage.state.saveInProgress = false;
        return { saveDataSuccessful: true };

      };
      //istanbul ignore next
      this.app.userInteractionManager.showUnsavedChanges(this.app, this.app.currentPage, () => { this.app.getChangedDatasources = getChangedDatasources }, async () => { await inspfieldresult.forceReload(); this.app.getChangedDatasources = getChangedDatasources }, () => { this.app.getChangedDatasources = getChangedDatasources }, true);
    }
  }

}

export default ImageInferenceEditController;
