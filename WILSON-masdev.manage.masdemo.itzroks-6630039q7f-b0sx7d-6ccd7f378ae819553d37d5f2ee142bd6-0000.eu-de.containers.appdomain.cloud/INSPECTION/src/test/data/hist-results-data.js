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

const histResults = {
  inspectionresultid: 85,
  inspquestionsgrp: [
    {
      inspquestionid: 654,
      inspfield: [
        {
          visible: true,
          inspfieldid: 614,
          fieldtype_maxvalue: 'DT',
          inspquestionnum: '1028',
          description: 'Q1 F1- DATE AND TIME',
          fieldtype_description: 'Date and time',
          fieldtype: 'DT',
          inspfieldnum: '1183',
          required: false
        },
        {
          visible: true,
          inspfieldid: 615,
          fieldtype_maxvalue: 'DO',
          inspquestionnum: '1028',
          description: 'Q2- DATE',
          fieldtype_description: 'Date only',
          fieldtype: 'DO',
          inspfieldnum: '1185',
          required: false
        },
        {
          visible: true,
          inspfieldid: 616,
          fieldtype_maxvalue: 'TO',
          inspquestionnum: '1028',
          description: 'Q3- TIME',
          fieldtype_description: 'Time only',
          fieldtype: 'TO',
          inspfieldnum: '1187',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1028',
      description: 'Q1- DATE AND TIME',
      groupseq: 1
    },
    {
      inspquestionid: 655,
      inspfield: [
        {
          visible: true,
          inspfieldid: 617,
          fieldtype_maxvalue: 'SE',
          inspquestionnum: '1030',
          description: 'Q2 F1 - NUMBER',
          fieldtype_description: 'Single numeric entry',
          fieldtype: 'SE',
          inspfieldnum: '1201',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1030',
      description: 'Q2 - NUMBER',
      groupseq: 2
    },
    {
      inspquestionid: 656,
      inspfield: [
        {
          visible: true,
          inspfieldid: 618,
          fieldtype_maxvalue: 'SO',
          inspquestionnum: '1033',
          description: 'Q3 F1 - SINGLE CHOICE',
          inspfieldoption: [
            {
              requireaction: false,
              inspfieldoptionid: 1695,
              description: 'OPTION 1'
            },
            {
              requireaction: false,
              inspfieldoptionid: 1696,
              description: 'OPTION 2'
            }
          ],
          fieldtype_description: 'Single choice',
          fieldtype: 'SO',
          inspfieldnum: '1207',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1033',
      description: 'Q3 - SINGLE CHOICE',
      groupseq: 3
    },
    {
      inspquestionid: 657,
      inspfield: [
        {
          visible: true,
          inspfieldid: 619,
          fieldtype_maxvalue: 'TR',
          inspquestionnum: '1037',
          description: 'Q4 F1 - TEXT RESPONSE',
          fieldtype_description: 'Text response',
          fieldtype: 'TR',
          inspfieldnum: '1209',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1037',
      description: 'Q4 - TEXT RESPONSE',
      groupseq: 4
    }
  ],
  status_description: 'In Progress',
  resultnum: '1057',
  allowedstates: {
    CAN: [
      {
        valueid: 'INSPRESULTSTATUS|CAN',
        maxvalue: 'CAN',
        defaults: true,
        description: 'Canceled',
        siteid: '',
        value: 'CAN',
        orgid: ''
      }
    ],
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
  createdate: '2021-08-05T19:41:57-03:00',
  referenceobject: 'ASSET',
  histresults: [
    {
      inspectionresultid: 79,
      createdate: '2021-08-05T19:41:30-03:00',
      inspfieldresult: [
        {
          inspfieldresultid: 781,
          dateresponse: '2021-08-12T00:00:00-03:00',
          timeresponse: '1970-01-01T10:30:00-03:00',
          inspfieldnum: '1183'
        },
        {
          inspfieldresultid: 782,
          dateresponse: '2021-08-12T00:00:00-03:00',
          inspfieldnum: '1185'
        },
        {
          inspfieldresultid: 783,
          timeresponse: '1970-01-01T10:30:00-03:00',
          inspfieldnum: '1187'
        },
        {
          inspfieldresultid: 784,
          numresponse: 2,
          inspfieldnum: '1201'
        },
        {
          inspfieldresultid: 785,
          txtresponse: 'OPTION 1',
          inspfieldnum: '1207'
        },
        {
          inspfieldresultid: 786,
          txtresponse: 'FORM 1',
          inspfieldnum: '1209'
        }
      ]
    },
    {
      inspectionresultid: 81,
      createdate: '2021-08-05T19:41:40-03:00',
      inspfieldresult: [
        {
          inspfieldresultid: 802,
          dateresponse: '2021-08-08T00:00:00-03:00',
          timeresponse: '1970-01-01T11:00:00-03:00',
          inspfieldnum: '1183'
        },
        {
          inspfieldresultid: 787,
          inspfieldnum: '1207'
        }
      ]
    },
    {
      inspectionresultid: 83,
      createdate: '2021-08-05T19:41:49-03:00',
      inspfieldresult: [
        {
          inspfieldresultid: 788,
          dateresponse: '2021-08-11T00:00:00-03:00',
          inspfieldnum: '1185'
        },
        {
          inspfieldresultid: 791,
          timeresponse: '1970-01-01T10:30:00-03:00',
          inspfieldnum: '1187'
        }
      ]
    }
  ],
  orgid: 'EAGLENA',
  revision: 1,
  status_maxvalue: 'INPROG',
  _rowstamp: '1363799',
  inspectionform: {
    status_maxvalue: 'ACTIVE',
    status_description: 'Active',
    inspectionformid: 26,
    hasld: false,
    readconfirmation: false,
    name: 'ALL INPUTS',
    createdate: '2021-08-05T19:39:03-03:00',
    inspformnum: '1004',
    revision: 1,
    status: 'ACTIVE'
  },
  siteid: 'BEDFORD',
  href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDU3L0JFREZPUkQ-',
  inspformnum: '1004',
  asset: [
    {
      assetnum: '12200',
      description: 'Overhead Crane #1'
    }
  ],
  status: 'INPROG'
};

export default histResults;
