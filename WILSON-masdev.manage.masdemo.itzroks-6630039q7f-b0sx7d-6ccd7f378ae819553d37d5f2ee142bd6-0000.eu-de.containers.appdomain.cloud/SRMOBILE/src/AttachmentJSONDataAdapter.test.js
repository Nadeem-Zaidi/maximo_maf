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

import AttachmentJSONDataAdapter from './AttachmentJSONDataAdapter';
import attachmentlistitem from './test/test-attachment-data.js';


it('test addAttachment', async () => {
    let app = {state: {}};
    
    let adapter  = new AttachmentJSONDataAdapter({
        src: JSON.parse(JSON.stringify(attachmentlistitem)),
        items: 'member',
        schema: 'responseInfo.schema',
        appResolver: () => app
      });
      
      window.URL.createObjectURL = jest.fn();

      let txtFile = {
        name: 'test.txt',
        type: 'text/plain',
        blob: new Blob(["Hello world!"],{type:"text/plain"})
      }      
      await adapter.addAttachment(txtFile);
    
      await adapter.deleteAttachment(txtFile);
  });

  
