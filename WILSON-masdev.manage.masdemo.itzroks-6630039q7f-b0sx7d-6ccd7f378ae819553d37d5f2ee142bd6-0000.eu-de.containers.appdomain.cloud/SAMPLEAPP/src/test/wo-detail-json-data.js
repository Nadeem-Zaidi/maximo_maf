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
        worktype: 'CM',
        title: 'Centrifugal Pump Oil Change',
        description:
          'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
        problem_code: 'Unreported',
        failure_class: 'Pumps',
        status: 'Approved',
        date: 'March 16, 2020 8:30 AM to 1:30 PM',
        duration: '4 hours, 30 minutes',
        type: 'Scheduled data and duration',
        locationnum: 'Main Boiler Room',
        number: '73',
        priority: '1',
        worklog: [
          {
            "createby": "SAM766",
            "description_longdescription": "<span style=\"font-family: Arial, sans-serif; font-size: 12px; background-color: rgb(255, 255, 255);\">Test Comment</span><!-- RICH TEXT -->",
            "createdate": "2020-07-29T12:25:26-04:00",
            "description": "Test Comment",
          }
        ],
        wohazardprec: 
          {
            "description": "Hazardous materials",
          }
        ,
        wototal:[
          {
            "total": "Internal Labor Hours",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/0"
          },
          {
            "total": "External Labor Hours",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/1"
          },
          {
            "total": "Labor Hours",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/2"
          },
          {
            "total": "Internal Labor Cost",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 130.45,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/3"
          },
          {
            "total": "External Labor Cost",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/4"
          },
          {
            "total": "Labor Costs",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/5"
          },
          {
            "total": "Material Cost",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 850.0,
            "estatappr": 850.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/6"
          },
          {
            "total": "Tool Costs",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/7"
          },
          {
            "total": "Service Cost",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 0.0,
            "estatappr": 0.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/8"
          },
          {
            "total": "Total Cost",
            "act": 0.0,
            "exceeded": 0.0,
            "est": 850.0,
            "estatappr": 850.0,
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal/9"
          }
        ],
        confirmlabtrans: '0',
        woactivity : [
          {
            status_maxvalue: "COMP",
            status_description: "Completed",
            taskid: 10,
            estoutlabcost :0,
            estservcost :0,
            estoutlabhrs :0,
            estlabhrs :1,
            estmatcost :0,
            estintlabhrs :1,
            esttoolcost :0,
            estintlabcost :18,
            status: "COMP"
          }
        ],
        "assetnum": "13120",
        "location": "BPM3100",
        isrotating: true,
        reportedby: {
          primaryphone: '123456789'
        },
        wobylocation: [
          {
            status_maxvalue: "WAPPR",
            status_description: "Waiting on approval",
            description: "NWO-AS-5005",
            wonum: "1392",
            status: "WAPPR",
            statusdate: "2021-08-17T15:47:20+05:30",
          },
          {
            status_maxvalue: "WAPPR",
            status_description: "Waiting on approval",
            description: "[Auto - 634787] Work order with a description",
            worktype: "PM",
            wonum: "634787",
            status: "WAPPR",
            statusdate: "2021-08-09T13:08:57+05:30",
          },
          {
            status_maxvalue: "APPR",
            status_description: "Approved",
            description: "[Auto - 939232] Work order with a description",
            worktype: "PM",
            wonum: "939232",
            status: "APPR",
            statusdate: "2021-07-02T16:58:45+05:30",
          },
          {
            status_maxvalue: "WAPPR",
            status_description: "Waiting on approval",
            description: "Water on floor",
            wonum: "1131",
            status: "WAPPR",
            statusdate: "2004-10-06T15:30:34+05:30",
          },
        ],
        wobyasset: [
          {
            status_maxvalue: "WAPPR",
            status_description: "Waiting on approval",
            description: "NWO-AS-5005",
            wonum: "1392",
            status: "WAPPR",
            statusdate: "2021-08-17T15:47:20+05:30",
          },
          {
            status_maxvalue: "WAPPR",
            status_description: "Waiting on approval",
            description: "[Auto - 634787] Work order with a description",
            worktype: "PM",
            wonum: "634787",
            status: "WAPPR",
            statusdate: "2021-08-09T13:08:57+05:30",
          },
          {
            status_maxvalue: "APPR",
            status_description: "Approved",
            description: "[Auto - 939232] Work order with a description",
            worktype: "PM",
            wonum: "939232",
            status: "APPR",
            statusdate: "2021-07-02T16:58:45+05:30",
          },
          {
            status_maxvalue: "WAPPR",
            status_description: "Waiting on approval",
            description: "Water on floor",
            wonum: "1131",
            status: "WAPPR",
            statusdate: "2004-10-06T15:30:34+05:30",
          },
        ],
        failure:{
          description: 'Pump Failures'
        },
        labtrans: [
          {
          "labtransid": 100051,
          "timerstatus_maxvalue": "COMPLETE",
          },
          {
          "labtransid": 100059,
          "timerstatus_maxvalue": "ACTIVE",
          }
        ],
        relatedrecord:{
        anywhererefid: 1650254964763,
        href: "TEMP_HREF/1650254952745",
        origrecordid: "1380",
        relatedreckey: "",
        relatedrecwo: {description: "New wo1-fz3"},
        relatetype_description: "Follow-up record"},
        "asset": [{
          "isrunning": true,
          "assetnum": "13120",
          "description": "Bottom Sealing System",
          "assetdescription" : "Bottom Sealing System",
          "href" : "TEMP_HREF/1650254952745",
          }],
        href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA1OB--',
        splanreviewdate: null,
        wohazardcount: 1,
        allowedstates:{'INPRG' : {}},
        siteid: "BEDFORD"
      },
    {
      wonum: '1001',
      title: 'Centrifugal Pump Oil Change',
      description:
        'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
      problem_code: 'Unreported',
      failure_class: 'Pumps',
      status: 'Approved',
      date: 'March 16, 2020 8:30 AM to 1:30 PM',
      duration: '4 hours, 30 minutes',
      type: 'Scheduled data and duration',
      locationnum: 'Main Boiler Room',
      number: '73',
      priority: '1',
      asset: 'Centrifugal Pump 100GPM/60FTHD',
      wptool: [
        {
          "wonum": '1001',
          "itemqty": 1.0,
          "description": "ROCKWELL DRILL PRESS"
        },
      ],
      toolcount: 2,
      href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA1OA--',
      confirmlabtrans: '0',
      woactivity : [
        {
          status_maxvalue: "COMP",
          status_description: "Completed",
          taskid: 10,
          status: "COMP"
        },
        {
          status_maxvalue: "WAPPR",
          status_description: "Waiting on approval",
          taskid: 20,
          status: "WAPPR"
        }
      ],
      serviceaddress: {
        "country": "US",
        "latitudey": 36.7783,
        "city": "CALIFORNIA",
        "country_description": "United States",
        "longitudex": 119.4179,
        "stateprovince_description": "California",
        "stateprovince": "CA"
        },
        reportedby: {
          primaryphone: 123456789
        },
        splanreviewdate:null,
        wohazardcount: 1,
        allowedstates:{'INPRG' : {}}


  },
  {
  "serviceaddress": {
      "country": "US",
      "latitudey": 36.7783,
      "city": "CALIFORNIA",
      "country_description": "United States",
      "longitudex": 119.4179,
      "stateprovince_description": "California",
      "stateprovince": "CA"
      },
    "locationmetercount": 0,
    "description": "METER TEST",
    "wonum": "1201",
    "status_maxvalue": "APPR",
    "_rowstamp": "3735006",
    "siteid": "BEDFORD",
    "locationdesc": "#1 Liquid Packaging Line",
    "locationnum": "BPM3100",
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx",
    "asset": {
    "isrunning": true,
    "assetnum": "13120",
    "description": "Bottom Sealing System",
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx",
    },
    "assetdesc": "Bottom Sealing System",
    "assetnumber": "13120",
    "toolcount": 0,
    "assetmetercount": 5,
    "status": "APPR",
    activeassetmeter: [
      {
        lastreadingdate: '2020-09-15T20:48:30+05:30',
        metername: 'OILCOLOR',
        href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/activeassetmeter/0-30',
        lastreading: 'RED'
        },
    ],

    activelocationmeter: [
      {
        lastreadingdate: '2020-09-15T20:48:30+05:30',
        metername: 'RUNHOURS',
        href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/activelocationmeter/0-30',
        lastreading: '4'
        },
    ],
    },
    {
      status_maxvalue: 'WAPPR',
      status_description: 'Waiting on approval',
      workorderid: 133378,
      origrecordid: '1201',
      status: 'WAPPR',
      wonum: '1202'
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
        },
        reportedby: {
          type: 'object'
        },
        "wototal": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "total": {
                "searchType": "NONE",
                "subType": "ALN",
                "title": "Total",
                "type": "string",
                "remarks": "Total",
                "maxLength": 45
              },
              "act": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual",
                "type": "number",
                "remarks": "Actual",
                "maxLength": 11
              },
              "exceeded": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Exceeds Estimate by",
                "type": "number",
                "remarks": "The labor hours or costs that exceed the approved estimate.",
                "maxLength": 11
              },
              "est": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Current Estimate",
                "type": "number",
                "remarks": "Current Estimate",
                "maxLength": 11
              },
              "estatappr": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Approved Estimate",
                "type": "number",
                "remarks": "The estimated labor or costs at the time of work order approval.",
                "maxLength": 11
              }
            }
          },
        }
      },
      required: ['wonum']
    }
  
  
    },
  };
  
  export default workorderitem;
  
