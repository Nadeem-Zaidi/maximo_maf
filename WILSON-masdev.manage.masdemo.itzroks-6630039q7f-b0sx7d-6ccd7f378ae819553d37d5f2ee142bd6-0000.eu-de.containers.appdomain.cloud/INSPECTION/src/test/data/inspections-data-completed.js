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

for (let i = 0; i < 5; i++) {
  let moreData = JSON.parse(JSON.stringify(origData));
  moreData.member.forEach(element => {
    element.resultnum = String.fromCharCode(65 + i) + element.resultnum;
    element._prefix = String.fromCharCode(65 + i);
    element.inspectionresultid = parseInt(
      String(i + 1) + element.inspectionresultid,
      10
    );
  });

  data.member.push(...moreData.member);
}

data.member.forEach(element => {
  element.status_maxvalue = 'COMPLETED';
  element.status_description = 'Completed';
  element.status = 'COMP';
  element.allowedstates = {
    DRAFT: [
      {
        valueid: 'INSPRESULTSTATUS|DRAFT',
        maxvalue: 'DRAFT',
        defaults: true,
        description: "Draft",
        siteid: '',
        value: 'DRAFT',
        orgid: ''
      }
    ],
    PENDING: [
      {
        valueid: 'INSPRESULTSTATUS|PENDING',
        maxvalue: 'PENDING',
        defaults: true,
        description: "Pending",
        siteid: '',
        value: 'PENDING',
        orgid: ''
      }
    ],
    INPROG: [
      {
        valueid: 'INSPRESULTSTATUS|INPROG',
        maxvalue: 'INPROG',
        defaults: true,
        description: "In Progress",
        siteid: '',
        value: 'INPROG',
        orgid: ''
      }
    ]
  };
});

export default data;
