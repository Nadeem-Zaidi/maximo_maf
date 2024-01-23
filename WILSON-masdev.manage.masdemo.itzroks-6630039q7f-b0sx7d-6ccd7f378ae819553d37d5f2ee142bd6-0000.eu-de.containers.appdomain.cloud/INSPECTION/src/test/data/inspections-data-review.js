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

import origData from './inspections-data-inprog';

let data = JSON.parse(JSON.stringify(origData));

data.member.length = 1;

data.member.forEach(element => {
  element._prefix = 'R ';
  element.status_maxvalue = 'REVIEW';
  element.status_description = 'Review';
  element.status = 'REVIEW';
  element.allowedstates = {
    COMPLETED: [
      {
        valueid: 'INSPRESULTSTATUS|COMPLETED',
        maxvalue: 'COMPLETED',
        defaults: true,
        description: 'Completed',
        siteid: '',
        value: 'COMPLETED',
        orgid: ''
      }
    ],
    DRAFT: [
      {
        valueid: 'INSPRESULTSTATUS|DRAFT',
        maxvalue: 'DRAFT',
        defaults: true,
        description: 'Draft',
        siteid: '',
        value: 'DRAFT',
        orgid: ''
      }
    ],
    INPROG: [
      {
        valueid: 'INSPRESULTSTATUS|INPROG',
        maxvalue: 'INPROG',
        defaults: true,
        description: 'In Progress',
        siteid: '',
        value: 'INPROG',
        orgid: ''
      }
    ]
  };
});

export default data;
