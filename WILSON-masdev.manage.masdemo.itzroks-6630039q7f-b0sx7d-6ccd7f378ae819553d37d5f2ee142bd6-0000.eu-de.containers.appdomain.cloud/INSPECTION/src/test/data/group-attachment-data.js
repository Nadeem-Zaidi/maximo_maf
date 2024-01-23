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

let groupAttachmentData = {
  inspectionresultid: 386,
  inspquestionsgrp: [
    {
      inspquestionid: 675,
      hasld: false,
      groupid: 1,
      inspquestionnum: '1168',
      description: 'group 1',
      groupseq: 1,
      inspquestionchild: [
        {
          inspquestionid: 672,
          inspfield: [
            {
              visible: true,
              inspfieldid: 650,
              fieldtype_maxvalue: 'FU',
              inspquestionnum: '1156',
              description: 'Upload an attachment',
              fieldtype_description: 'File upload',
              fieldtype: 'FU',
              inspfieldnum: '1450',
              required: false
            }
          ],
          hasld: false,
          groupid: 1,
          inspquestionnum: '1156',
          description: 'attachment group 1',
          groupseq: 1.01
        }
      ]
    },
    {
      inspquestionid: 676,
      hasld: false,
      groupid: 2,
      inspquestionnum: '1172',
      description: 'group 2',
      groupseq: 2,
      inspquestionchild: [
        {
          inspquestionid: 674,
          inspfield: [
            {
              visible: true,
              inspfieldid: 651,
              fieldtype_maxvalue: 'FU',
              inspquestionnum: '1160',
              description: 'Upload an attachment',
              fieldtype_description: 'File upload',
              fieldtype: 'FU',
              inspfieldnum: '1063',
              required: false
            }
          ],
          hasld: false,
          groupid: 2,
          inspquestionnum: '1160',
          description: 'attachment group 1 (Copy)',
          groupseq: 2.01
        }
      ]
    }
  ],
  status_description: 'In Progress',
  resultnum: '1357',
  allowedstates: {
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
    PENDING: [
      {
        valueid: 'INSPRESULTSTATUS|PENDING',
        maxvalue: 'PENDING',
        defaults: true,
        description: 'Pending',
        siteid: '',
        value: 'PENDING',
        orgid: ''
      }
    ]
  },
  createdate: '2021-01-23T00:13:08-03:00',
  referenceobject: 'ASSET',
  orgid: 'EAGLENA',
  revision: 1,
  status_maxvalue: 'INPROG',
  _rowstamp: '1416646',
  inspectionform: {
    status_maxvalue: 'ACTIVE',
    status_description: 'Active',
    inspectionformid: 30,
    hasld: false,
    readconfirmation: false,
    name: 'ATTACHMENT +GROUP',
    createdate: '2021-01-20T13:46:45-03:00',
    inspformnum: '1009',
    revision: 1,
    status: 'ACTIVE'
  },
  siteid: 'BEDFORD',
  href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMzU3L0JFREZPUkQ-',
  inspformnum: '1009',
  asset: [
    {
      assetnum: '12200',
      description: 'Overhead Crane #1'
    }
  ],
  status: 'INPROG'
};

export default groupAttachmentData;
