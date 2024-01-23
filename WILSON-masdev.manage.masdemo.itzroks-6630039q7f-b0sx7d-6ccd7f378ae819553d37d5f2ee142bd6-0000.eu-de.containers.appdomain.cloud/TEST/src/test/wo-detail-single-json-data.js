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

let workorderitem = {
    member: [
      {
        wonum: '1000',
        title: 'Centrifugal Pump Oil Change',
        description:
          'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
        problem_code: 'Unreported',
        failure_class: 'Pumps',
        status: 'Approved',
        date: 'March 16, 2020 8:30 AM to 1:30 PM',
        duration: '4 hours, 30 minutes',
        type: 'Scheduled data and duration',
        location: 'Main Boiler Room',
        number: '73',
        priority: '1',
        asset: 'Centrifugal Pump 100GPM/60FTHD',
        classificationid: "PIPE_LEAK",
        workorderspec: [
          {
            "assetattrid": "ANOM TYP",
            "assetattributedesc": "Anomaly Type",
            "displaysequence": 1,
            "alnvalue": "10",
            "workorderspecid": 48
          },
          {
            "assetattrid": "B31G BP",
            "assetattributedesc": "Mod B31G BP",
            "displaysequence": 2,
            "numvalue": 15,
            "workorderspecid": 49
          },
          {
            "assetattrid": "B31G ERF",
            "datevalue": "2023-01-30T00:00:00+05:30",
            "assetattributedesc": "Mod B31G ERF",
            "displaysequence": 3,
            "workorderspecid": 50
          },
          {
            "assetattrid": "CLOCK",
            "assetattributedesc": "Position using clock face",
            "displaysequence": 4,
            "alnvalue": "20",
            "workorderspecid": 51
          },
          {
            "assetattrid": "INTEXT",
            "assetattributedesc": "Internal External",
            "displaysequence": 5,
            "workorderspecid": 52
          },
          {
            "assetattrid": "LENGTH",
            "measureunitid": "FEET",
            "assetattributedesc": "Length",
            "displaysequence": 6,
            "numvalue": 15.1,
            "workorderspecid": 53
          },
          {
            "assetattrid": "MAX DEP",
            "assetattributedesc": "Max Depth Percentage",
            "displaysequence": 7,
            "workorderspecid": 54
          },
          {
            "assetattrid": "WIDTH",
            "measureunitid": "IN",
            "assetattributedesc": "Width",
            "displaysequence": 8,
            "numvalue": 12.267,
            "workorderspecid": 55
          },
          {
            "assetattrid": "DEFECT",
            "assetattributedesc": "Defect ID",
            "displaysequence": 9,
            "workorderspecid": 56
          },
          {
            "assetattrid": "DESC",
            "assetattributedesc": "Description",
            "displaysequence": 10,
            "alnvalue": "10",
            "workorderspecid": 57
          },
          {
            "assetattrid": "HEIGHT",
            "measureunitid": "FEET",
            "displaysequence": 11,
            "numvalue": 5,
            "workorderspecid": 63
          }
        ],
        worklog: [
          {
            "createby": "SAM766",
            "description_longdescription": "<span style=\"font-family: Arial, sans-serif; font-size: 12px; background-color: rgb(255, 255, 255);\">Test Comment</span><!-- RICH TEXT -->",
            "createdate": "2020-07-29T12:25:26-04:00",
            "description": "Test Comment",
          }
        ],
        confirmlabtrans: '0',
        woactivity : [
          {
            status_maxvalue: "COMP",
            status_description: "Completed",
            taskid: 10,
            status: "COMP"
          }
        ],
        "assetnum": "13120",
        moddowntimehist: [
          {
            "endcode_description": "Breakdown",
            "startwonum": "51057",
            "startcode_description": "Breakdown",
            "startdate": "2021-05-12T16:21:10+05:30",
            "orgid": "EAGLENA",
            "downtime": 0,
            "endcode": "BRKDWN",
            "enddate": "2021-05-12T16:35:23+05:30",
            "startcode": "BRKDWN",
            "assetnum": "12700",
            "siteid": "BEDFORD",
            "endwonum": "51057",
            "endoperational": "1",
            "href": null,
            "startoperational": "1"
            }
        ]

      },
    ],
    href: 'oslc/os/mxapiwodetail',
    responseInfo: {

    schema: {
      $schema: 'http://json-schema.org/draft-04/schema#',
      resource: 'MXAPIWODETAIL',
      description: 'WORKORDER',
      pk: ['siteid', 'wonum'],
      title: 'WORKORDER',
      type: 'object',
      $ref: 'http://localhost/maximo/oslc/jsonschemas/mxapiwodetail',
      properties: {
        wonum: {
          default: '&AUTOKEY&',
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Work Order',
          persistent: true,
          type: 'string',
          hasList: true,
          remarks: 'Identifies the work order.',
          maxLength: 25
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        problem_code: {
          type: 'string'
        },
        failure_class: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        date: {
          type: 'string'
        },

        wpmaterial: {
          type: 'array',
          items: {
            definition: {
              subSchema: {
                $ref:
                  'http://localhost/maximo/oslc/jsonschemas/mxapiwodetail/wpmaterial'
              }
            },
            type: 'object'
          },
          cardinality: 'MULTIPLE',
          relation: 'SHOWPLANMATERIAL'
        },
        wptool: {
          type: 'array',
          items: {
            definition: {
              subSchema: {
                $ref:
                  'http://localhost/maximo/oslc/jsonschemas/mxapiwodetail/wptool'
              }
            },
            type: 'object'
          },
          cardinality: 'MULTIPLE',
          relation: 'SHOWPLANTOOL',
        },
        toolcount: {
          type: 'number'
        },
        hideStartButton:{
          type: 'bool'
        },
        wostatusmemo:{
          maxLength: 50
        }
      }
    }
  
  
    },
  };
  
  export default workorderitem;
  
