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

import RelatedWoDataController from "./RelatedWoDataController";
import {Application} from '@maximo/maximo-js-api';

it('should return description of relatedwork order', async () => {

    const controller = new RelatedWoDataController();
    const app = new Application();
    
    let event = {
      relatedreckey: '1005', relatedwodesc : "Follow up work order",
    };
  
    app.registerController(controller);
    app.initialize();
   
     let data = controller.computedRelatedRecordDesc(event); 
     expect(data).toBe("1005 Follow up work order");

     event = {
      relatedreckey: '1005'
    };
    data = controller.computedRelatedRecordDesc(event);
    expect(data).toBe("1005");

    event = {
      relatedwodesc : "Follow up work order",
    };
    data = controller.computedRelatedRecordDesc(event);
    expect(data).toBe("Follow up work order");

  });
