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

let nogroupAttachmentData = {
  inspectionresultid: 406,
  inspquestionsgrp: [
    {
      inspquestionid: 669,
      inspfield: [
        {
          visible: true,
          inspfieldid: 646,
          fieldtype_maxvalue: 'FU',
          inspquestionnum: '1145',
          description: 'Upload an attachment',
          fieldtype_description: 'File upload',
          fieldtype: 'FU',
          inspfieldnum: '1255',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1145',
      description: 'ATTACHMENT TEST',
      groupseq: 1
    },
    {
      inspquestionid: 670,
      inspfield: [
        {
          visible: true,
          inspfieldid: 647,
          fieldtype_maxvalue: 'FU',
          inspquestionnum: '1148',
          description: 'Upload an attachment',
          fieldtype_description: 'File upload',
          fieldtype: 'FU',
          inspfieldnum: '1257',
          required: false
        },
        {
          visible: true,
          inspfieldid: 6427,
          fieldtype_maxvalue: 'SE',
          inspquestionnum: '1149',
          description: 'number input',
          fieldtype_description: 'number',
          fieldtype: 'SE',
          inspfieldnum: '1258',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1148',
      description: 'ATTACHMENT TEST 2',
      groupseq: 2
    }
  ],
  status_description: 'In Progress',
  resultnum: '1377',
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
  createdate: '2021-01-23T01:47:13-03:00',
  referenceobject: 'ASSET',
  orgid: 'EAGLENA',
  revision: 1,
  status_maxvalue: 'INPROG',
  _rowstamp: '1413349',
  inspectionform: {
    status_maxvalue: 'ACTIVE',
    status_description: 'Active',
    inspectionformid: 26,
    hasld: false,
    readconfirmation: false,
    name: 'ATTACHMENT TEST',
    createdate: '2021-01-18T17:11:20-03:00',
    inspformnum: '1007',
    revision: 1,
    status: 'ACTIVE'
  },
  siteid: 'BEDFORD',
  href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMzc3L0JFREZPUkQ-',
  inspformnum: '1007',
  asset: [
    {
      assetnum: '12200',
      description: 'Overhead Crane #1'
    }
  ],
  status: 'INPROG'
};
export default nogroupAttachmentData;
