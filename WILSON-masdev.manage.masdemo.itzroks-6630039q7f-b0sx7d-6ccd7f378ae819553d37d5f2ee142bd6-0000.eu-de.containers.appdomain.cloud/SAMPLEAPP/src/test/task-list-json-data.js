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

let tasklist = {
  "member": [
    {
      "activeassetmeter": [
        {"assetmeterid":80,"sequence":1,"_rowstamp":"2830447","metername":"HEAD LOSS1","meter":{"metertype":"CHARACTERISTIC","description":"Rail Meter - Head loss without gauge wear","metertype_maxvalue":"CHARACTERISTIC","metertype_description":"Characteristic meter","domainid":"RAIL_WEAR"},"assetnum":"R100","active":true,"siteid":"BEDFORD","assetmeterdomain":{},"href":"oslc/os/mxapiassetmeter/_UjEwMC8wL0hFQUQgTE9TUzEvQkVERk9SRA--","dorollover":false,"_bulkid":"80","computedReading":null,"computedReadingDate":null,"computedMeterCurDate":"2023-07-12T14:17:45.844Z","computedMeterCurTime":1689171465845},
        {"assetmeterid":81,"sequence":2,"_rowstamp":"2830448","metername":"HEAD LOSS2","meter":{"metertype":"CHARACTERISTIC","description":"Rail Meter - Head loss with gauge wear","metertype_maxvalue":"CHARACTERISTIC","metertype_description":"Characteristic meter","domainid":"RAIL_WEAR"},"assetnum":"R100","active":true,"siteid":"BEDFORD","assetmeterdomain":{},"href":"oslc/os/mxapiassetmeter/_UjEwMC8wL0hFQUQgTE9TUzIvQkVERk9SRA--","dorollover":false,"_bulkid":"81","computedReading":null,"computedReadingDate":null,"computedMeterCurDate":"2023-07-12T14:17:45.845Z","computedMeterCurTime":1689171465845},
        {"assetmeterid":82,"sequence":3,"_rowstamp":"2830449","metername":"BAD TIE","meter":{"metertype":"CHARACTERISTIC","description":"Observational meter used to support track inspections","metertype_maxvalue":"CHARACTERISTIC","metertype_description":"Characteristic meter","domainid":"BAD_TIE"},"assetnum":"R100","active":true,"siteid":"BEDFORD","assetmeterdomain":{},"href":"oslc/os/mxapiassetmeter/_UjEwMC8wL0JBRCBUSUUvQkVERk9SRA--","dorollover":false,"_bulkid":"82","computedReading":null,"computedReadingDate":null,"computedMeterCurDate":"2023-07-12T14:17:45.845Z","computedMeterCurTime":1689171465845}
      ],
      "activelocationmeter": [
        {
          "lastreadingdate": "2023-07-12T01:53:25-07:00",
          "meter": {
            "metertype": "CHARACTERISTIC",
            "description": "Rail Meter - Head loss without gauge wear",
            "metertype_maxvalue": "CHARACTERISTIC",
            "metertype_description": "Characteristic meter",
            "domainid": "RAIL_WEAR"
          },
          "active": true,
          "lastreading": "1",
          "domainid": "RAIL_WEAR",
          "previousreadingdate": "2023-07-12T01:53:25-07:00",
          "sequence": 1,
          "_rowstamp": "2943580",
          "metername": "HEAD LOSS1",
          "locationmeterdomain": {
            "description": "1 inch",
            "value": "1"
          },
          "locationmeterid": 21,
          "siteid": "BEDFORD",
          "location": "R100",
          "previousreading": "1",
          "locations": [
            {
              "localref": "oslc/os/mxapilocationmeter/_UjEwMC9IRUFEIExPU1MxL0JFREZPUkQ-/location/0-558",
              "description": "R-Location-100",
              "type": "OPERATING",
              "status_maxvalue": "OPERATING",
              "_rowstamp": "2831189",
              "locationsid": 558,
              "pluscpmextdate": false,
              "disabled": false,
              "href": "http://childkey#TE9DQVRJT05NRVRFUi9MT0NBVElPTlMvUjEwMC9CRURGT1JE",
              "isdefault": false,
              "type_description": "Operating Location",
              "useinpopr": false,
              "status_description": "Operating",
              "type_maxvalue": "OPERATING",
              "pluscloop": false,
              "changeby": "MAXADMIN",
              "changedate": "2023-07-11T06:27:47-07:00",
              "expectedlife": 0,
              "isrepairfacility": false,
              "replacecost": 0,
              "orgid": "EAGLENA",
              "statusdate": "2023-07-11T06:27:47-07:00",
              "autowogen": false,
              "plussisgis": false,
              "status": "OPERATING"
            }
          ],
          "href": "oslc/os/mxapilocationmeter/_UjEwMC9IRUFEIExPU1MxL0JFREZPUkQ-",
          "dorollover": false,
          "computedReading": "1",
          "computedReadingDate": "2023-07-12T08:53:25.000Z",
          "_bulkid": "21",
          "computedMeterCurDate": "2023-07-12T14:17:45.907Z",
          "computedMeterCurTime": 1689171465907
        },
        {
          "meter": {
            "metertype": "CHARACTERISTIC",
            "description": "Rail Meter - Head loss with gauge wear",
            "metertype_maxvalue": "CHARACTERISTIC",
            "metertype_description": "Characteristic meter",
            "domainid": "RAIL_WEAR"
          },
          "active": true,
          "domainid": "RAIL_WEAR",
          "sequence": 2,
          "_rowstamp": "2831192",
          "metername": "HEAD LOSS2",
          "locationmeterdomain": {
      
          },
          "locationmeterid": 22,
          "siteid": "BEDFORD",
          "location": "R100",
          "locations": [
            {
              "localref": "oslc/os/mxapilocationmeter/_UjEwMC9IRUFEIExPU1MyL0JFREZPUkQ-/location/0-558",
              "description": "R-Location-100",
              "type": "OPERATING",
              "status_maxvalue": "OPERATING",
              "_rowstamp": "2831189",
              "locationsid": 558,
              "pluscpmextdate": false,
              "disabled": false,
              "href": "http://childkey#TE9DQVRJT05NRVRFUi9MT0NBVElPTlMvUjEwMC9CRURGT1JE",
              "isdefault": false,
              "type_description": "Operating Location",
              "useinpopr": false,
              "status_description": "Operating",
              "type_maxvalue": "OPERATING",
              "pluscloop": false,
              "changeby": "MAXADMIN",
              "changedate": "2023-07-11T06:27:47-07:00",
              "expectedlife": 0,
              "isrepairfacility": false,
              "replacecost": 0,
              "orgid": "EAGLENA",
              "statusdate": "2023-07-11T06:27:47-07:00",
              "autowogen": false,
              "plussisgis": false,
              "status": "OPERATING"
            }
          ],
          "href": "oslc/os/mxapilocationmeter/_UjEwMC9IRUFEIExPU1MyL0JFREZPUkQ-",
          "dorollover": false,
          "_bulkid": "22",
          "computedReading": null,
          "computedReadingDate": null,
          "computedMeterCurDate": "2023-07-12T14:17:45.907Z",
          "computedMeterCurTime": 1689171465907
        }
      ],
      "status_maxvalue": "COMP",
      "_rowstamp": "1391348",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/0-604",
      "description": "Check tires, lights, horn, mirrors.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTEw",
      "_selected": "1",
      "workorderid": "1",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/0-604/doclinks",
        "member": [
          
        ]
      },
      "taskid": 10,
      "status": "COMP",
      "assetnum": "13117",
      "location": "BPM3100",
      "assetdescription": "Bottom Sealing System",
      "measurepoint": {
        "meter": {
          "metertype": "CHARACTERISTIC",
          "description": "Rail Meter - Head loss without gauge wear",
          "metertype_maxvalue": "CONTINUOUS",
          "metertype_description": "Characteristic meter",
          "domainid": "RAIL_WEAR"
        },
        "description": "Head Loss on Track 1",
        "assetnum": "11430",
        "asset": {
          "description": "Centrifugal Pump 100GPM/60FT HD"
        }
      }
    },
    {
      "status_maxvalue": "COMP",
      "_rowstamp": "1871741",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/1-320",
      "inspresultid": 59,
      "_selected": 2,
      "workorderid": 2,
      "description": "Check windshield wipers and steering.",
      "inspresult": "1005",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTIw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/1-320/doclinks",
        "member": [
          
        ]
      },
      "taskid": 20,
      "inspname": "Monthly Fire System Inspection 2",
      "status": "COMP",
      "observation": 5,
      "measurepoint": {
        "meter": {
          "metertype": "CHARACTERISTIC",
          "description": "Rail Meter - Head loss without gauge wear",
          "metertype_maxvalue": "CHARACTERISTIC",
          "metertype_description": "Characteristic meter",
          "domainid": "RAIL_WEAR"
        },
        "description": "Head Loss on Track 1",
        "assetnum": "11430",
        "asset": {
          "description": "Centrifugal Pump 100GPM/60FT HD"
        }
      }
    },
    {
      "status_maxvalue": "APPR",
      "_rowstamp": "1903038",
      "status_description": "Approved",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/2-279",
      "description": "Check key,seat, forward/reverse switches.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTMw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/2-279/doclinks",
        "member": [
          
        ]
      },
      "taskid": 30,
      "woflowcontrolled": true,
      'predessorwos':'10,30',
      "status": "APPR",
      "measurepoint": {
        "meter": {
          "metertype": "CHARACTERISTIC",
          "description": "Rail Meter - Head loss without gauge wear",
          "metertype_maxvalue": "CHARACTERISTIC",
          "metertype_description": "Characteristic meter",
          "domainid": "RAIL_WEAR"
        },
        "description": "Head Loss on Track 1"
      }
    },
    {
      "status_maxvalue": "COMP",
      "_rowstamp": "1903890",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/3-280",
      "description": "Check brakes, brake lights, and emergency brake.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTQw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/3-280/doclinks",
        "member": [
          
        ]
      },
      "taskid": 40,
      "status": "COMP"
    },
    {
      "status_maxvalue": "COMP",
      "_rowstamp": "2182186",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/4-468",
      "description": "Check battery. Add water as needed.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTUw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/4-468/doclinks",
        "member": [
          
        ]
      },
      "taskid": 50,
      "status": "COMP"
    },
    {
      "status_maxvalue": "COMP",
      "_rowstamp": "2229113",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/5-606",
      "description": "Check terminals and cables, battery charger.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTYw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/5-606/doclinks",
        "member": [
          
        ]
      },
      "taskid": 60,
      "status": "COMP"
    },
    {
      "status_maxvalue": "COMP",
      "_rowstamp": "2240355",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/6-605",
      "description": "Lubricate chain and check sprockets.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTcw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/6-605/doclinks",
        "member": [
          
        ]
      },
      "taskid": 70,
      "status": "COMP"
    },
    {
      "status_maxvalue": "COMP",
      "_rowstamp": "2302123",
      "status_description": "Completed",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/7-319",
      "description": "Repack wheel bearings. Grease steering chassis.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTgw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/7-319/doclinks",
        "member": [
          
        ]
      },
      "taskid": 80,
      "status": "COMP"
    },
    {
      "status_maxvalue": "APPR",
      "_rowstamp": "1411430",
      "status_description": "Approved",
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/8-318",
      "description": "Test-operate vehicle and check for safety.",
      "href": "http://childkey#V09SS09SREVSL1dPQUNUSVZJVFkvQkVERk9SRC8xMDIyLTkw",
      "doclinks": {
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity/8-318/doclinks",
        "member": [
          
        ]
      },
      "taskid": 90,
      "status": "APPR"
    }
  ],
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity",
  "responseInfo": {
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "resource": "MXAPIWODETAIL",
      "description": "WORKORDER/WOACTIVITY",
      "pk": [
        "siteid",
        "wonum"
      ],
      "title": "WORKORDER/WOACTIVITY",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapiwodetail/woactivity",
      "properties": {
        "status_description": {
          "type": "string"
        },
        "description_longdescription": {
          "searchType": "WILDCARD",
          "subType": "LONGALN",
          "title": "Details",
          "type": "string",
          "remarks": "Long Description for Work Order Description",
          "maxLength": 32000,
          "relation": "WOACTIVITY"
        },
        "localref": {
          "type": "string"
        },
        "description": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Summary",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the work. To enter or view additional information, click the Long Description button.",
          "maxLength": 100,
          "relation": "WOACTIVITY"
        },
        "inspresult": {
          "default": "&AUTOKEY&",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Inspection Result",
          "persistent": true,
          "type": "string",
          "remarks": "The number of the inspection result.",
          "maxLength": 12
        },
        "inspname": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Name",
          "persistent": true,
          "type": "string",
          "remarks": "Form Name",
          "maxLength": 200
        },
        "status_maxvalue": {
          "type": "string"
        },
        "_rowstamp": {
          "type": "string"
        },
        "_imagelibref": {
          "type": "string"
        },
        "inspresultid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "Inspection result  identification",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Record identification",
          "maxLength": 11
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "doclinks": {
          "type": "array",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "subType": "DOCLINKS",
            "type": "object",
            "properties": {
              "member": {
                "type": "array",
                "items": {
                  "definition": {
                    "subSchema": {
                      "$ref": "oslc/jsonschemas/mxapiwodetail/woactivity/doclinks/attachment"
                    }
                  },
                  "type": "object"
                }
              }
            }
          },
          "cardinality": "UNDEFINED",
          "relation": "DOCLINKS"
        },
        "taskid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Task",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Identifies the task.",
          "maxLength": 11,
          "relation": "WOACTIVITY"
        },
        "status": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Status",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Status of the work.",
          "maxLength": 16,
          "relation": "WOACTIVITY"
        }
      },
      "required": [
        "status"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDIy/woactivity?oslc.select=taskid%2Cdescription%2Cdescription_longdescription%2Cstatus%2Cstatus_description%2Cstatus_maxvalue%2Cinspectionform.name--inspname%2Cinspectionresult.resultnum--inspresult%2Cinspectionresult.inspectionresultid--inspresultid%2Cdoclinks%7B*%7D&oslc.pageSize=100&domaininternalwhere=status%3DINPRG%2CWAPPR%2CWMATL%2CAPPR%2CWSCH%2CWPCOND%2CCOMP&oslc.orderBy=%2Btaskid&searchAttributes=status%2Ctaskid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 9,
    "pagenum": 1
  }
};
export default tasklist;
