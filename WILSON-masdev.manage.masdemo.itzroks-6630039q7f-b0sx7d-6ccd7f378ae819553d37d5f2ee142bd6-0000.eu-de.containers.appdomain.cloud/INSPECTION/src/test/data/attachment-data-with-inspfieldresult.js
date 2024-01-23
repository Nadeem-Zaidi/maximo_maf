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

let attachmentDataWithInspfieldResult = {
  inspectionresultid: 416,
  inspquestionsgrp: [
    {
      inspquestionid: 690,
      inspfield: [
        {
          visible: true,
          inspfieldid: 670,
          fieldtype_maxvalue: 'FU',
          inspquestionnum: '1224',
          description: 'Upload an attachment',
          fieldtype_description: 'File upload',
          fieldtype: 'FU',
          inspfieldnum: '2327',
          required: false
        }
      ],
      hasld: false,
      inspquestionnum: '1224',
      description: 'ONE ATTACH',
      groupseq: 1
    }
  ],
  status_description: 'In Progress',
  resultnum: '1387',
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
  createdate: '2021-01-23T13:53:57-03:00',
  referenceobject: 'ASSET',
  inspfieldresult: [
    {
      inspfieldresultid: 1848,
      localref:
        'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMzg3L0JFREZPUkQ-/inspfieldresult/0-1848',
      resultnum: '1387',
      inspquestionnum: '1224',
      rolloverflag: false,
      orgid: 'EAGLENA',
      revision: 1,
      _rowstamp: '1427230',
      inspfieldresultnum: '2329',
      readconfirmation: false,
      siteid: 'BEDFORD',
      href:
        'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQRklFTERSRVNVTFQvMjMyNy8xMDE2LzEyMjQvRUFHTEVOQS8xMzg3LzEvQkVERk9SRA--',
      inspformnum: '1016',
      doclinks: [
        {
          href: './DevelopmentCodeChecklist.doc',
          localref:
            'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/0-255',
          describedBy: {
            identifier: '255',
            fileName: 'DevelopmentCodeChecklist.doc',
            upload: false,
            docType: 'Attachments',
            created: '2020-11-04T10:23:48-04:00',
            changeby: 'WILSON',
            format: {
              href: 'http://purl.org/NET/mediatypes/application/msword',
              label: 'application/msword'
            },
            show: false,
            description: 'MSWord Checklist',
            ownerid: 219,
            ownertable: 'WORKORDER',
            title: 'REVIEWDOC',
            copylinktowo: false,
            docinfoid: 237,
            urlType: 'FILE',
            createby: 'WILSON',
            attachmentSize: 227840,
            getlatestversion: true,
            printthrulink: true,
            modified: '2020-10-04T10:24:42-04:00',
            about:
              'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/meta/255',
            addinfo: false
          }
        }
      ],
      inspfieldnum: '2327'
    }
  ],
  orgid: 'EAGLENA',
  revision: 1,
  status_maxvalue: 'INPROG',
  _rowstamp: '1427225',
  inspectionform: {
    status_maxvalue: 'ACTIVE',
    status_description: 'Active',
    inspectionformid: 43,
    hasld: false,
    readconfirmation: false,
    name: 'ONE ATTACHMENT TEST',
    createdate: '2021-01-23T13:46:17-03:00',
    inspformnum: '1016',
    revision: 1,
    status: 'ACTIVE'
  },
  siteid: 'BEDFORD',
  href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMzg3L0JFREZPUkQ-',
  inspformnum: '1016',
  asset: [
    {
      assetnum: '12200',
      description: 'Overhead Crane #1'
    }
  ],
  status: 'INPROG'
};

export default attachmentDataWithInspfieldResult;
