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

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  resource: 'mxapiinspectionres',
  description: 'Maximo API for Retrieving\u00a0Inspection\u00a0Result',
  pk: ['resultnum', 'orgid', 'siteid'],
  title: 'INSPECTIONRESULT',
  type: 'object',
  $ref: 'oslc/jsonschemas/mxapiinspectionres',
  properties: {
    inspectionresultid: {
      searchType: 'EXACT',
      maximum: 2.147483647e9,
      subType: 'BIGINT',
      title: 'Inspection Result Identification',
      persistent: true,
      type: 'integer',
      minimum: -2.147483648e9,
      remarks: 'Record identification',
      maxLength: 11
    },
    resultnum: {
      default: '&AUTOKEY&',
      searchType: 'WILDCARD',
      subType: 'UPPER',
      title: 'Inspection Result',
      persistent: true,
      type: 'string',
      remarks: 'The number of the inspection result.',
      maxLength: 12
    },
    referenceobject: {
      searchType: 'WILDCARD',
      subType: 'UPPER',
      title: 'Reference Object',
      persistent: true,
      type: 'string',
      remarks: 'Object that the Inspection result is attached to',
      maxLength: 20
    },
    orgid: {
      searchType: 'WILDCARD',
      subType: 'UPPER',
      title: 'Organization',
      persistent: true,
      type: 'string',
      remarks: 'Organization Identification',
      maxLength: 8
    },
    status_maxvalue: {type: 'string'},
    _rowstamp: {type: 'string'},
    duedate: {
      searchType: 'EXACT',
      subType: 'DATETIME',
      title: 'Due Date',
      persistent: true,
      type: 'string',
      remarks: 'The date that the inspection must be completed by.',
      maxLength: 10
    },
    inspectionform: {
      type: 'array',
      items: {
        definition: {
          subSchema: {
            $ref: 'oslc/jsonschemas/mxapiinspectionres/inspectionform'
          }
        },
        type: 'object'
      },
      cardinality: '',
      relation: 'INSPECTIONFORM'
    },
    referenceobjectid: {
      searchType: 'WILDCARD',
      subType: 'UPPER',
      title: 'Reference Object ID',
      persistent: true,
      type: 'string',
      remarks: 'Identifies the reference object.',
      maxLength: 25
    },
    siteid: {
      searchType: 'WILDCARD',
      subType: 'UPPER',
      title: 'Site',
      persistent: true,
      type: 'string',
      remarks: 'Site Identification',
      maxLength: 8
    },
    locations: {
      type: 'object',
      properties: {
        description: {
          searchType: 'WILDCARD',
          subType: 'ALN',
          title: 'Description',
          persistent: true,
          type: 'string',
          remarks:
            'Describes the storeroom location. To enter or view additional information, click the Long Description button.',
          maxLength: 100
        },
        location: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Location',
          persistent: true,
          type: 'string',
          remarks: 'Storeroom where the item is stored.',
          maxLength: 12
        }
      }
    },
    href: {type: 'string'},
    _id: {type: 'string'},
    asset: {
      type: 'object',
      properties: {
        assetnum: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Asset',
          persistent: true,
          type: 'string',
          remarks: 'Asset Number',
          maxLength: 25
        },
        description: {
          searchType: 'WILDCARD',
          subType: 'ALN',
          title: 'Description',
          persistent: true,
          type: 'string',
          remarks:
            'Describes the asset. To enter or view additional information, click the Long Description button.',
          maxLength: 100
        }
      }
    },
    workorder: {
      type: 'object',
      properties: {
        parent: {
          type: 'object',
          properties: {
            description: {
              searchType: 'WILDCARD',
              subType: 'ALN',
              title: 'Description',
              persistent: true,
              type: 'string',
              remarks:
                'Describes the work order. To enter or view additional information, click the Long Description button.',
              maxLength: 100
            },
            wonum: {
              default: '&AUTOKEY&',
              searchType: 'WILDCARD',
              subType: 'UPPER',
              title: 'Work Order',
              persistent: true,
              type: 'string',
              remarks: 'Identifies the work order.',
              maxLength: 25
            }
          }
        },
        istask: {
          searchType: 'EXACT',
          subType: 'YORN',
          title: 'Is Task',
          persistent: true,
          type: 'boolean',
          remarks:
            'Specifies whether the work order is a task. If the check box is selected, the work order is a task. If the check box is cleared, the work order is not a task.'
        },
        schedstart: {
          searchType: 'EXACT',
          subType: 'DATETIME',
          title: 'Scheduled Start',
          persistent: true,
          type: 'string',
          remarks: 'Date and time the work is scheduled to begin.',
          maxLength: 10
        },
        description: {
          searchType: 'WILDCARD',
          subType: 'ALN',
          title: 'Description',
          persistent: true,
          type: 'string',
          remarks:
            'Describes the work order. To enter or view additional information, click the Long Description button.',
          maxLength: 100
        },
        worktype: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Work Type',
          persistent: true,
          type: 'string',
          remarks:
            "Identifies the work order's type. Some example types are: preventive maintenance, corrective maintenance, emergency maintenace, capital project, and event report.",
          maxLength: 16
        },
        taskid: {
          searchType: 'EXACT',
          maximum: 2.147483647e9,
          subType: 'INTEGER',
          title: 'Task',
          persistent: true,
          type: 'integer',
          minimum: -2.147483648e9,
          remarks: 'Identifies the task.',
          maxLength: 11
        },
        wonum: {
          default: '&AUTOKEY&',
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Work Order',
          persistent: true,
          type: 'string',
          remarks: 'Identifies the work order.',
          maxLength: 25
        }
      }
    },
    status: {
      searchType: 'WILDCARD',
      subType: 'UPPER',
      title: 'Status',
      persistent: true,
      type: 'string',
      hasList: true,
      remarks:
        'Will contain the current inspection result status, controlled by the system',
      maxLength: 20
    }
  },
  required: [
    'createdate',
    'inspectionresultid',
    'referenceobject',
    'resultnum',
    'status'
  ]
};

export const members = [
  {
    inspectionresultid: 1,
    resultnum: '1001',
    referenceobject: 'ASSET',
    orgid: 'EAGLENA',
    status_maxvalue: 'INPROG',
    inspectionform: {
      inspectionformid: 11,
      name: 'Monthly Fire System Inspection 2'
    },
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiinspectionres/_A-',
    asset: {assetnum: '1001', description: 'Fire Extinguisher'},
    workorder: {parent: {}},
    status: 'INPROG'
  },
  {
    inspectionresultid: 2,
    resultnum: '1002',
    referenceobject: 'ASSET',
    orgid: 'EAGLENA',
    status_maxvalue: 'INPROG',
    inspectionform: {
      inspectionformid: 11,
      name: 'Monthly Fire System Inspection 2'
    },
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiinspectionres/_B-',
    asset: {assetnum: '1001', description: 'Fire Extinguisher'},
    workorder: {parent: {}},
    status: 'INPROG'
  },
  {
    inspectionresultid: 3,
    resultnum: '1003',
    referenceobject: 'ASSET',
    orgid: 'EAGLENA',
    status_maxvalue: 'INPROG',
    inspectionform: {
      inspectionformid: 11,
      name: 'Monthly Fire System Inspection 2'
    },
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiinspectionres/_C-',
    asset: {assetnum: '1001', description: 'Fire Extinguisher'},
    workorder: {parent: {}},
    status: 'INPROG',
    sequence: '1'
  },
  {
    inspectionresultid: 4,
    resultnum: '1004',
    referenceobject: 'ASSET',
    orgid: 'EAGLENA',
    status_maxvalue: 'INPROG',
    inspectionform: {
      inspectionformid: 11,
      name: 'Monthly Fire System Inspection 2'
    },
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiinspectionres/_C-',
    asset: {assetnum: '1001', description: 'Fire Extinguisher'},
    workorder: {parent: {}},
    status: 'INPROG'
  },
  {
    inspectionresultid: 5,
    resultnum: '1005',
    referenceobject: 'ASSET',
    orgid: 'EAGLENA',
    status_maxvalue: 'INPROG',
    inspectionform: {
      inspectionformid: 11,
      name: 'Monthly Fire System Inspection 2'
    },
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiinspectionres/_C-',
    asset: {assetnum: '1001', description: 'Fire Extinguisher'},
    workorder: {parent: {}},
    status: 'INPROG',
    sequence: '4'
  },
  {
    inspectionresultid: 5,
    resultnum: '1006',
    referenceobject: 'ASSET',
    orgid: 'EAGLENA',
    status_maxvalue: 'PENDING',
    defaults: true,
    inspectionform: {
      inspectionformid: 11,
      name: 'Monthly Fire System Inspection 3'
    },
    siteid: 'BEDFORD',
    href: 'oslc/os/mxapiinspectionres/_C-',
    asset: {assetnum: '1001', description: 'Fire Extinguisher'},
    workorder: {parent: {}},
    status: 'PENDING',
    sequence: '4'
  }
];

members.forEach(el => {
  el.duedate = new Date();
  el.allowedstates = {
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
  };
});

const inspectionsData = {
  member: members,
  href: 'oslc/os/mxapiinspectionres',
  responseInfo: {
    schema: schema,
    totalPages: 1,
    totalCount: 4,
    pagenum: 1
  }
};

export default inspectionsData;
