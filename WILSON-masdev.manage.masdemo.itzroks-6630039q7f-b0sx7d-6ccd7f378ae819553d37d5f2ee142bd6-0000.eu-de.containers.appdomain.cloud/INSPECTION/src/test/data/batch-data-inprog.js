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

let data = {
  member: [
    {
      inspectionresultid: 45,
      status_description: 'In Progress',
      resultnum: '1002',
      createdate: '2019-03-06T13:32:14-05:00',
      orgid: 'EAGLENA',
      status_maxvalue: 'INPROG',
      _rowstamp: '877592',
      referenceobject: 'PARENTWO',
      referenceobjectid: 'PARENT',
      batchlist: [
        {
          inspectionresultid: 46,
          status_maxvalue: 'INPROG',
          status_description: 'Inprogress',
          status: 'INPROG'
        },
        {
          inspectionresultid: 47,
          status_maxvalue: 'COMPLETED',
          status_description: 'Completed',
          status: 'COMPLETED'
        },
        {
          inspectionresultid: 48,
          status_maxvalue: 'COMPLETED',
          status_description: 'Completed',
          status: 'COMPLETED'
        }
      ],
      inspectionform: {
        inspectionformid: 11,
        name: 'Monthly Fire System Inspection 2'
      },
      parent: 'PARENT',
      inspquestionsgrp: [
        {
          inspquestionid: 291
        },
        {
          inspquestionid: 292
        }
      ],
      siteid: 'BEDFORD',
      locations: {},
      href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-',
      inspresultstatus: [
        {
          status_maxvalue: 'PENDING',
          _rowstamp: '877756',
          status_description: 'Pending',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/0-46',
          inspresultstatusid: 46,
          inspresultstatusnum: '1001',
          changeby: 'ALVIN',
          changedate: '2019-03-11T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMDEvRUFHTEVOQS9CRURGT1JE',
          status: 'PENDING'
        },
        {
          status_maxvalue: 'INPROG',
          _rowstamp: '877774',
          status_description: 'In Progress',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/1-64',
          inspresultstatusid: 64,
          inspresultstatusnum: '1019',
          changeby: 'ALVIN',
          changedate: '2019-03-19T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMTkvRUFHTEVOQS9CRURGT1JE',
          status: 'INPROG'
        }
      ],
      asset: {assetnum: '1001', description: 'Fire Extinguisher'},
      workorder: {parent: {}},
      status: 'INPROG',
      plussgeojson: `{"coordinates":[-88.15204381940423,41.77253992424687],"type":"Point"}`
    },
    {
      inspectionresultid: 46,
      status_description: 'In Progress',
      resultnum: '1002',
      createdate: '2019-03-06T13:32:14-05:00',
      referenceobject: 'ASSET',
      orgid: 'EAGLENA',
      status_maxvalue: 'INPROG',
      _rowstamp: '877592',
      inspectionform: {
        inspectionformid: 11,
        name: 'Monthly Fire System Inspection 2'
      },
      parent: 'PARENT',
      inspquestionsgrp: [
        {
          inspquestionid: 291
        },
        {
          inspquestionid: 292
        }
      ],
      siteid: 'BEDFORD',
      locations: {},
      href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-',
      inspresultstatus: [
        {
          status_maxvalue: 'PENDING',
          _rowstamp: '877756',
          status_description: 'Pending',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/0-46',
          inspresultstatusid: 46,
          inspresultstatusnum: '1001',
          changeby: 'ALVIN',
          changedate: '2019-03-11T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMDEvRUFHTEVOQS9CRURGT1JE',
          status: 'PENDING'
        },
        {
          status_maxvalue: 'INPROG',
          _rowstamp: '877774',
          status_description: 'In Progress',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/1-64',
          inspresultstatusid: 64,
          inspresultstatusnum: '1019',
          changeby: 'ALVIN',
          changedate: '2019-03-19T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMTkvRUFHTEVOQS9CRURGT1JE',
          status: 'INPROG'
        }
      ],
      asset: {assetnum: '1001', description: 'Fire Extinguisher'},
      workorder: {parent: {}},
      status: 'INPROG',
      autolocate: `{"coordinates":[-88.15204381940423,41.77253992424687],"type":"Point"}`
    },
    {
      inspectionresultid: 47,
      status_description: 'In Progress',
      resultnum: '1002',
      createdate: '2019-03-06T13:32:14-05:00',
      orgid: 'EAGLENA',
      status_maxvalue: 'INPROG',
      _rowstamp: '877592',
      referenceobject: 'PARENTWO',
      referenceobjectid: 'PARENT1',
      batchlist: [
        {
          inspectionresultid: 48,
          status_maxvalue: 'INPROG',
          status_description: 'Inprogress',
          status: 'INPROG',
        },
        {
          inspectionresultid: 49,
          status_maxvalue: 'CAN',
          status_description: 'Canceled',
          status: 'CAN',
          historyflag:true
        },
        {
          inspectionresultid: 50,
          status_maxvalue: 'COMPLETED',
          status_description: 'Completed',
          status: 'COMPLETED',
          historyflag:true
        }
      ],
      inspectionform: {
        inspectionformid: 11,
        name: 'Monthly Fire System Inspection 2'
      },
      parent: 'PARENT',
      inspquestionsgrp: [
        {
          inspquestionid: 291
        },
        {
          inspquestionid: 292
        }
      ],
      siteid: 'BEDFORD',
      locations: {},
      href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-',
      inspresultstatus: [
        {
          status_maxvalue: 'PENDING',
          _rowstamp: '877756',
          status_description: 'Pending',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/0-46',
          inspresultstatusid: 46,
          inspresultstatusnum: '1001',
          changeby: 'ALVIN',
          changedate: '2019-03-11T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMDEvRUFHTEVOQS9CRURGT1JE',
          status: 'PENDING'
        },
        {
          status_maxvalue: 'INPROG',
          _rowstamp: '877774',
          status_description: 'In Progress',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/1-64',
          inspresultstatusid: 64,
          inspresultstatusnum: '1019',
          changeby: 'ALVIN',
          changedate: '2019-03-19T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMTkvRUFHTEVOQS9CRURGT1JE',
          status: 'INPROG'
        }
      ],
      asset: {assetnum: '1001', description: 'Fire Extinguisher'},
      workorder: {parent: {}},
      status: 'INPROG',
      plussgeojson: `{"coordinates":[-88.15204381940423,41.77253992424687],"type":"Point"}`
    },
    {
      inspectionresultid: 48,
      status_description: 'In Progress',
      resultnum: '1002',
      createdate: '2019-03-06T13:32:14-05:00',
      referenceobject: 'ASSET',
      orgid: 'EAGLENA',
      status_maxvalue: 'INPROG',
      _rowstamp: '877592',
      inspectionform: {
        inspectionformid: 11,
        name: 'Monthly Fire System Inspection 2'
      },
      parent: 'PARENT1',
      inspquestionsgrp: [
        {
          inspquestionid: 291
        },
        {
          inspquestionid: 292
        }
      ],
      siteid: 'BEDFORD',
      locations: {},
      href: 'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-',
      inspresultstatus: [
        {
          status_maxvalue: 'PENDING',
          _rowstamp: '877756',
          status_description: 'Pending',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/0-46',
          inspresultstatusid: 46,
          inspresultstatusnum: '1001',
          changeby: 'ALVIN',
          changedate: '2019-03-11T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMDEvRUFHTEVOQS9CRURGT1JE',
          status: 'PENDING'
        },
        {
          status_maxvalue: 'INPROG',
          _rowstamp: '877774',
          status_description: 'In Progress',
          localref:
            'oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDAyL0JFREZPUkQ-/inspresultstatus/1-64',
          inspresultstatusid: 64,
          inspresultstatusnum: '1019',
          changeby: 'ALVIN',
          changedate: '2019-03-19T13:32:14-04:00',
          href: 'http://childkey#SU5TUEVDVElPTlJFU1VMVC9JTlNQUkVTVUxUU1RBVFVTLzEwMTkvRUFHTEVOQS9CRURGT1JE',
          status: 'INPROG'
        }
      ],
      asset: {assetnum: '1001', description: 'Fire Extinguisher'},
      workorder: {parent: {}},
      status: 'INPROG',
      autolocate: `{"coordinates":[-88.15204381940423,41.77253992424687],"type":"Point"}`
    },
    {
      referenceobjectid: 1234,
    },
  ],
  href: 'oslc/os/mxapiinspectionres',
  responseInfo: {
    schema: {
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
        parent: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Parent',
          persistent: true,
          type: 'string',
          remarks: 'Parent work order number.',
          maxLength: 25
        },
        status_description: {type: 'string'},
        localref: {type: 'string'},
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
        _imglibref: {type: 'string'},
        createdate: {
          default: '&SYSDATE&',
          searchType: 'EXACT',
          subType: 'DATETIME',
          title: 'Created Date',
          persistent: true,
          type: 'string',
          remarks: 'The date and time that the form was created.',
          maxLength: 10
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
        inspfieldresult: {
          type: 'array',
          items: {
            definition: {
              subSchema: {
                $ref: 'oslc/jsonschemas/mxapiinspectionres/inspfieldresult'
              }
            },
            type: 'object'
          },
          cardinality: '',
          relation: 'INSPFIELDRESULT'
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
        inspresultstatus: {
          type: 'array',
          items: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            resource: 'mxapiinspectionres',
            description: 'INSPECTIONRESULT/INSPRESULTSTATUS',
            pk: ['inspresultstatusnum', 'orgid', 'siteid'],
            title: 'INSPECTIONRESULT/INSPRESULTSTATUS',
            type: 'object',
            $ref: 'oslc/jsonschemas/mxapiinspectionres/inspresultstatus',
            properties: {
              status_description: {type: 'string'},
              localref: {type: 'string'},
              inspresultstatusnum: {
                default: '&AUTOKEY&',
                searchType: 'WILDCARD',
                subType: 'UPPER',
                title: 'Inspection Result Status Number',
                persistent: true,
                type: 'string',
                remarks: 'Composed Identifier For Inspection Result Status',
                maxLength: 12,
                relation: 'INSPRESULTSTATUS'
              },
              _imglibref: {type: 'string'},
              changeby: {
                searchType: 'WILDCARD',
                subType: 'UPPER',
                title: 'Change By',
                persistent: true,
                type: 'string',
                remarks: 'User who is changing the status',
                maxLength: 30,
                relation: 'INSPRESULTSTATUS'
              },
              memo: {
                searchType: 'WILDCARD',
                subType: 'ALN',
                title: 'Reason of the status change',
                persistent: true,
                type: 'string',
                remarks: 'Reason of the status change',
                maxLength: 100,
                relation: 'INSPRESULTSTATUS'
              },
              changedate: {
                searchType: 'EXACT',
                subType: 'DATETIME',
                title: 'Change Date',
                persistent: true,
                type: 'string',
                remarks: 'The date and time that the form was modified.',
                maxLength: 10,
                relation: 'INSPRESULTSTATUS'
              },
              status_maxvalue: {type: 'string'},
              _rowstamp: {type: 'string'},
              inspresultstatusid: {
                searchType: 'EXACT',
                maximum: 2.147483647e9,
                subType: 'BIGINT',
                title: 'Inspection result status identification',
                persistent: true,
                type: 'integer',
                minimum: -2.147483648e9,
                remarks: 'Record identification',
                maxLength: 11,
                relation: 'INSPRESULTSTATUS'
              },
              href: {type: 'string'},
              _id: {type: 'string'},
              status: {
                searchType: 'WILDCARD',
                subType: 'UPPER',
                title: 'Status',
                persistent: true,
                type: 'string',
                hasList: true,
                remarks: 'The status of the inspection result.',
                maxLength: 20,
                relation: 'INSPRESULTSTATUS'
              }
            },
            required: [
              'changeby',
              'changedate',
              'inspresultstatusid',
              'inspresultstatusnum',
              'status'
            ]
          },
          cardinality: '',
          relation: 'INSPRESULTSTATUS'
        },
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
    },
    totalPages: 1,
    href: 'oslc/os/mxapiinspectionres?oslc.select=siteid%2Corgid%2Cresultnum%2Creferenceobject%2Creferenceobjectid%2Cinspectionresultid%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20status%2Ccreatedate%2Cduedate%2Cinspectionform.name%2Cinspectionform.inspectionformid%2Casset.assetnum%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20asset.description%2Clocations.location%2Clocations.description%2Cworkorder.wonum%2Cworkorder.description%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20workorder.taskid%2Cworkorder.worktype%2Cworkorder.schedstart%2Cworkorder.istask%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20workorder.parent.wonum%2Cworkorder.parent.description%2Cinspresultstatus%7B*%7D%2Cparent&oslc.pageSize=20&oslc.where=status%3D%22INPROG%22&oslc.orderBy=%2Basset.assetnum&searchAttributes=inspectionform.name&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1',
    totalCount: 14,
    pagenum: 1
  }
};

data.member.forEach(el => {
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

export default data;
