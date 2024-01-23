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

import {
    JSONDataAdapter
  } from '@maximo/maximo-js-api';


class AttachmentJSONDataAdapter extends JSONDataAdapter {
  async addAttachment(file) {

    let newRec = {};
      newRec.href = window.URL.createObjectURL(file.blob)
      newRec.localref = '';
      newRec.describedBy = {};
      newRec.describedBy.identifier = '';
      newRec.describedBy.fileName = file.name;
      newRec.describedBy.docType = 'Attachments';
      newRec.describedBy.created = new Date().toString();
      newRec.describedBy.changedBy = '';
      newRec.describedBy.format = {};
      newRec.describedBy.format.href = '';
      newRec.describedBy.format.label = file.type;
      newRec.describedBy.description =  file.name;
      newRec.describedBy.about = '';
      newRec.filedata =  await this._buildAttach(file);
      this.add(newRec);
      this.options.appResolver().state.attachCount = this.items.length;
    } 

    async deleteAttachment(record) {
      this.bulkDelete([record]);
      this.options.appResolver().state.attachCount = this.items.length;
    }

    async _buildAttach(file) {
        let base64result = await this._loadFile(file);
        return {
          //urltype: urlTypeValue, ISSUE IN MOCKED ENVS
          documentdata: base64result,
          doctype: 'Attachments',
          urlname: file.name
        };
      }
     
    async _loadFile(file) {
        let promise = new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.readAsDataURL(file.blob);
          reader.onload = () => {
            let base64result = reader.result.split(',')[1];
            resolve(base64result);
          };
        });
        return promise;
      }  
  }
  export default AttachmentJSONDataAdapter;
