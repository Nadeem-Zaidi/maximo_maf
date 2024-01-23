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

let multiassetlocitem = {
  member: [
    {
      "multilocationmetercount": 2,
      "multiid": 4102,
      "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/multiassetlocci/1-4102",
      "locationdesc": "Boiler Room Reciprocating Compressor",
      "assetdescription": "Reciprocating Compressor- Air Cooled/100 CFM",
      "_rowstamp": "4009101",
      "multiassetmetercount": 2,
      activeassetmeter: [
        {
          "lastreadingdate": "2020-10-30T14:04:09+05:30",
          "meter": {
            "metertype": "CHARACTERISTIC",
            "description": "Rail Meter - Guard rail loss",
            "metertype_maxvalue": "CHARACTERISTIC",
            "metertype_description": "Characteristic meter",
            "domainid": "RAIL_WEAR"
          },
          "active": true,
          "assetmeterdomain": {
            "value": "1/16"
          },
          "lastreading": "1/16",
          "previousreadingdate": "2020-10-30T14:04:09+05:30",
          "assetmeterid": 78,
          "_rowstamp": "8641066",
          "metername": "GUARD RAIL",
          "assetnum": "13170",
          "previousreading": "1/16",
          "href": "oslc/os/mxapiassetmeter/_MTMxNzAvMC9HVUFSRCBSQUlML0JFREZPUkQ-",
          "dorollover": false,
          "remarks": "saved",
          "newreading": "1"
        },
        {
          "lastreadingdate": "2020-10-30T14:13:47+05:30",
          "meter": {
            "metertype": "CHARACTERISTIC",
            "description": "Rail Meter - Head loss without gauge wear",
            "metertype_maxvalue": "CHARACTERISTIC",
            "metertype_description": "Characteristic meter",
            "domainid": "RAIL_WEAR"
          },
          "active": true,
          "assetmeterdomain": {
            "value": "1/2"
          },
          "lastreading": "1/2",
          "previousreadingdate": "2020-10-30T14:13:47+05:30",
          "assetmeterid": 27,
          "_rowstamp": "8643379",
          "metername": "HEAD LOSS1",
          "assetnum": "13170",
          "previousreading": "1/2",
          "href": "oslc/os/mxapiassetmeter/_MTMxNzAvMC9IRUFEIExPU1MxL0JFREZPUkQ-",
          "dorollover": false,
          "remarks": "saved"
        },
        {
          "lastreadingdate": "2020-09-14T16:21:00+05:30",
          "meter": {
            "metertype": "CONTINUOUS",
            "description": "Run Hours",
            "metertype_maxvalue": "CONTINUOUS",
            "metertype_description": "Continuous meter"
          },
          "active": true,
          "assetmeterdomain": {
            
          },
          "lastreading": "4",
          "previousreadingdate": "2020-09-14T16:21:00+05:30",
          "assetmeterid": 28,
          "_rowstamp": "4647859",
          "measureunitid": "HOURS",
          "readingtype_maxvalue": "DELTA",
          "metername": "RUNHOURS",
          "assetnum": "13170",
          "previousreading": "4",
          "href": "oslc/os/mxapiassetmeter/_MTMxNzAvMC9SVU5IT1VSUy9CRURGT1JE",
          "dorollover": false,
          "readingtype_description": "Incremental usage",
          "readingtype": "DELTA"
        },
        {
          "lastreadingdate": "2020-10-30T12:33:39+05:30",
          "meter": {
            "metertype": "GAUGE",
            "description": "Temperature in Celsius",
            "metertype_maxvalue": "GAUGE",
            "metertype_description": "Gauge meter"
          },
          "active": true,
          "assetmeterdomain": {
            
          },
          "lastreading": "234",
          "previousreadingdate": "2020-10-30T12:33:39+05:30",
          "assetmeterid": 30,
          "_rowstamp": "8620159",
          "measureunitid": "DEG C",
          "metername": "TEMP-C",
          "assetnum": "13170",
          "previousreading": "234",
          "href": "oslc/os/mxapiassetmeter/_MTMxNzAvMC9URU1QLUMvQkVERk9SRA--",
          "dorollover": false,
          "remarks": "saved"
        },
        {
          "lastreadingdate": "2020-10-30T12:35:56+05:30",
          "meter": {
            "metertype": "GAUGE",
            "description": "Temperature in Fahrenheit",
            "metertype_maxvalue": "GAUGE",
            "metertype_description": "Gauge meter"
          },
          "active": true,
          "assetmeterdomain": {
            
          },
          "lastreading": "999",
          "previousreadingdate": "2020-10-30T12:35:56+05:30",
          "assetmeterid": 29,
          "_rowstamp": "8620642",
          "measureunitid": "DEG F",
          "metername": "TEMP-F",
          "assetnum": "13170",
          "previousreading": "999",
          "href": "oslc/os/mxapiassetmeter/_MTMxNzAvMC9URU1QLUYvQkVERk9SRA--",
          "dorollover": false,
          "remarks": "saved"
        },
        {
          "lastreadingdate": "2020-10-30T14:09:52+05:30",
          "meter": {
            "metertype": "CHARACTERISTIC",
            "description": "Vibration",
            "metertype_maxvalue": "CHARACTERISTIC",
            "metertype_description": "Characteristic meter",
            "domainid": "HLM"
          },
          "active": true,
          "assetmeterdomain": {
            "description": "Low",
            "value": "Low"
          },
          "lastreading": "Low",
          "previousreadingdate": "2020-10-30T14:09:52+05:30",
          "assetmeterid": 77,
          "_rowstamp": "8642418",
          "metername": "VIBRATION",
          "assetnum": "13170",
          "previousreading": "Low",
          "href": "oslc/os/mxapiassetmeter/_MTMxNzAvMC9WSUJSQVRJT04vQkVERk9SRA--",
          "dorollover": false,
          "remarks": "saved"
        }
      ],
      "assetnum": "11300",
      "progress": false,
      "location": "BR300",
      "href": "http://childkey#V09SS09SREVSL01VTFRJQVNTRVRMT0NDSS80MTAy",
      "computedMeterCurDate": "2023-03-22T00:00:00.000+05:30",
      "computedMeterCurTime": "2023-03-14T00:30:00+05:30",
      activelocationmeter: [
        {
          "_rowstamp": "7047528",
          "lastreadingdate": "2020-10-09T20:00:29+05:30",
          "metername": "HEAD LOSS2",
          "locationmeterdomain": {
            "value": "1/2"
          },
          "meter": {
            "metertype": "CHARACTERISTIC",
            "description": "Rail Meter - Head loss with gauge wear",
            "metertype_maxvalue": "CHARACTERISTIC",
            "metertype_description": "Characteristic meter",
            "domainid": "RAIL_WEAR"
          },
          "locationmeterid": 1,
          "active": true,
          "location": "BPM3100",
          "locations": [
            {
              "localref": "oslc/os/mxapilocationmeter/_QlBNMzEwMC9IRUFEIExPU1MyL0JFREZPUkQ-/location/0-95",
              "description": "#1 Liquid Packaging Line",
              "type": "OPERATING",
              "status_maxvalue": "OPERATING",
              "_rowstamp": "4618437",
              "locationsid": 95,
              "pluscpmextdate": false,
              "disabled": false,
              "href": "http://childkey#TE9DQVRJT05NRVRFUi9MT0NBVElPTlMvQlBNMzEwMC9CRURGT1JE",
              "isdefault": false,
              "type_description": "Operating Location",
              "useinpopr": false,
              "status_description": "Operating",
              "type_maxvalue": "OPERATING",
              "pluscloop": false,
              "changeby": "MAXIMO",
              "exyorn5": false,
              "changedate": "1999-03-11T15:08:00+05:30",
              "isrepairfacility": false,
              "replacecost": 0.0,
              "orgid": "EAGLENA",
              "statusdate": "1999-03-11T15:08:00+05:30",
              "glaccount": "6400-300-???",
              "exyorn1": false,
              "exyorn2": false,
              "exyorn3": false,
              "exyorn4": false,
              "autowogen": false,
              "status": "OPERATING"
            }
          ],
          "href": "oslc/os/mxapilocationmeter/_QlBNMzEwMC9IRUFEIExPU1MyL0JFREZPUkQ-",
          "lastreading": "1/2",
          "remarks": "saved",
          "newreading": "1"
        },
        {
          "lastreadingdate": "2020-10-30T12:52:33+05:30",
          "meter": {
            "metertype": "GAUGE",
            "description": "Inlet Pressure",
            "metertype_maxvalue": "GAUGE",
            "metertype_description": "Gauge meter"
          },
          "active": true,
          "lastreading": "786",
          "_rowstamp": "8624544",
          "measureunitid": "PSI",
          "metername": "IN-PRESSUR",
          "locationmeterdomain": {
            
          },
          "locationmeterid": 3,
          "location": "BPM3100",
          "locations": [
            {
              "localref": "oslc/os/mxapilocationmeter/_QlBNMzEwMC9JTi1QUkVTU1VSL0JFREZPUkQ-/location/0-95",
              "description": "#1 Liquid Packaging Line",
              "type": "OPERATING",
              "status_maxvalue": "OPERATING",
              "_rowstamp": "4618437",
              "locationsid": 95,
              "pluscpmextdate": false,
              "disabled": false,
              "href": "http://childkey#TE9DQVRJT05NRVRFUi9MT0NBVElPTlMvQlBNMzEwMC9CRURGT1JE",
              "isdefault": false,
              "type_description": "Operating Location",
              "useinpopr": false,
              "status_description": "Operating",
              "type_maxvalue": "OPERATING",
              "pluscloop": false,
              "changeby": "MAXIMO",
              "exyorn5": false,
              "changedate": "1999-03-11T15:08:00+05:30",
              "isrepairfacility": false,
              "replacecost": 0.0,
              "orgid": "EAGLENA",
              "statusdate": "1999-03-11T15:08:00+05:30",
              "glaccount": "6400-300-???",
              "exyorn1": false,
              "exyorn2": false,
              "exyorn3": false,
              "exyorn4": false,
              "autowogen": false,
              "status": "OPERATING"
            }
          ],
          "href": "oslc/os/mxapilocationmeter/_QlBNMzEwMC9JTi1QUkVTU1VSL0JFREZPUkQ-",
          "remarks": "saved"
        },
        {
          "lastreadingdate": "2020-09-14T16:21:00+05:30",
          "meter": {
            "metertype": "CONTINUOUS",
            "description": "Odometer Reading in Miles",
            "metertype_maxvalue": "CONTINUOUS",
            "metertype_description": "Continuous meter"
          },
          "active": true,
          "lastreading": "9",
          "_rowstamp": "4648064",
          "measureunitid": "MILES",
          "readingtype_maxvalue": "DELTA",
          "metername": "ODOM-M",
          "locationmeterdomain": {
            
          },
          "locationmeterid": 2,
          "location": "BPM3100",
          "locations": [
            {
              "localref": "oslc/os/mxapilocationmeter/_QlBNMzEwMC9PRE9NLU0vQkVERk9SRA--/location/0-95",
              "description": "#1 Liquid Packaging Line",
              "type": "OPERATING",
              "status_maxvalue": "OPERATING",
              "_rowstamp": "4618437",
              "locationsid": 95,
              "pluscpmextdate": false,
              "disabled": false,
              "href": "http://childkey#TE9DQVRJT05NRVRFUi9MT0NBVElPTlMvQlBNMzEwMC9CRURGT1JE",
              "isdefault": false,
              "type_description": "Operating Location",
              "useinpopr": false,
              "status_description": "Operating",
              "type_maxvalue": "OPERATING",
              "pluscloop": false,
              "changeby": "MAXIMO",
              "exyorn5": false,
              "changedate": "1999-03-11T15:08:00+05:30",
              "isrepairfacility": false,
              "replacecost": 0.0,
              "orgid": "EAGLENA",
              "statusdate": "1999-03-11T15:08:00+05:30",
              "glaccount": "6400-300-???",
              "exyorn1": false,
              "exyorn2": false,
              "exyorn3": false,
              "exyorn4": false,
              "autowogen": false,
              "status": "OPERATING"
            }
          ],
          "href": "oslc/os/mxapilocationmeter/_QlBNMzEwMC9PRE9NLU0vQkVERk9SRA--",
          "readingtype_description": "Incremental usage",
          "readingtype": "DELTA"
        }
      ],
      "asset": [
        {
          "_rowstamp": "374050",
          "_imagelibref": "oslc/images/43",
          "assetnum": "11300",
          "description": "Reciprocating Compressor- Air Cooled/100 CFM",
          "href": "oslc/os/mxapiasset/_MTEzMDAvQkVERk9SRA--"
        }
      ]
    }
  ],
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/multiassetlocci",
  "responseInfo": {
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "resource": "MXAPIWODETAIL",
      "description": "WORKORDER/MULTIASSETLOCCI",
      "pk": [
        "multiid"
      ],
      "title": "WORKORDER/MULTIASSETLOCCI",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapiwodetail/multiassetlocci",
      "properties": {
        "asset.mxapiasset": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "remarks": "Asset Number",
                "maxLength": 25
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the asset. To enter or view additional information, click the Long Description button.",
                "maxLength": 100
              }
            }
          },
          "cardinality": "MULTIPLE"
        },
        "multiid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "MULTI ID",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Unique identifier",
          "maxLength": 11,
          "relation": "MULTIASSETLOCCI"
        },
        "activelocationmeter.mxapilocationmeter": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "lastreadingdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Last Reading Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date of last reading for this location meter.",
                "maxLength": 10
              },
              "meter": {
                "type": "object",
                "properties": {
                  "metertype": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Meter Type",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Maximo supports three types of meters: CONTINUOUS, GAUGE and CHARACTERISTIC.",
                    "maxLength": 25
                  },
                  "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Describes the meter group.The description can be up to 255 characters in length. To enter or view additional information, click the Long Description button.",
                    "maxLength": 100
                  },
                  "metertype_maxvalue": {
                    "type": "string"
                  },
                  "metertype_description": {
                    "type": "string"
                  },
                  "domainid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Domain",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Constraint defining what are valid values for this meter. A domain can be ALN, NUMERIC or from a value list.",
                    "maxLength": 18
                  }
                }
              },
              "active": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Active",
                "persistent": true,
                "type": "boolean",
                "remarks": "Is this location's meter available to accept manual or rolled down readings, or to be used in PM or CM work order generation?"
              },
              "lastreading": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Last Reading",
                "persistent": true,
                "type": "string",
                "remarks": "Last reading taken for this location meter",
                "maxLength": 18
              },
              "sequence": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "SMALLINT",
                "title": "Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Meter display sequence",
                "maxLength": 11
              },
              "measureunitid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Unit of Measure",
                "persistent": true,
                "type": "string",
                "remarks": "Measure unit for the meter when attached to this location, for example LITERS or RPM",
                "maxLength": 16
              },
              "readingtype_maxvalue": {
                "type": "string"
              },
              "metername": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Meter",
                "persistent": true,
                "type": "string",
                "remarks": "Identifier for the meter attached to the location, for example HOURS or KILOMETERS.",
                "maxLength": 10
              },
              "locationmeterdomain": {
                "type": "object",
                "properties": {
                  "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Value description",
                    "maxLength": 100
                  },
                  "value": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Value",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Value of the domain",
                    "maxLength": 254
                  }
                }
              },
              "locationmeterid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "LOCATIONMETERID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11
              },
              "siteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Site",
                "persistent": true,
                "type": "string",
                "remarks": "Site identifier for this LocationMeter.",
                "maxLength": 8
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "remarks": "Location to which the meter is attached",
                "maxLength": 12
              },
              "rollover": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Rollover",
                "persistent": true,
                "type": "number",
                "remarks": "Point at which the location's meter returns to the its mininum value.  Rollover applies to CONTINUOUS meters only.",
                "maxLength": 16
              },
              "readingtype_description": {
                "type": "string"
              },
              "readingtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reading Type",
                "persistent": true,
                "type": "string",
                "remarks": "reading type (CONTINUOUS or DELTA) for this LocationMeter. Location meter readings default to this LocationMeter's readingtype value.",
                "maxLength": 10
              },
              "remarks": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Remarks",
                "persistent": true,
                "type": "string",
                "remarks": "Additional information supplied by the user regarding the LocationMeter record.",
                "maxLength": 50
              }
            }
          },
          "cardinality": "UNDEFINED"
        },
        "localref": {
          "type": "string"
        },
        "locationdesc": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the storeroom location. To enter or view additional information, click the Long Description button.",
          "maxLength": 100
        },
        "inspectionresult.mxapiinspectionres": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "inspectionresultid": {
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
              "resultnum": {
                "default": "&AUTOKEY&",
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Inspection Result",
                "persistent": true,
                "type": "string",
                "remarks": "The number of the inspection result.",
                "maxLength": 12
              }
            }
          },
          "cardinality": ""
        },
        "assetdescription": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the asset. To enter or view additional information, click the Long Description button.",
          "maxLength": 100
        },
        "_rowstamp": {
          "type": "string"
        },
        "_imagelibref": {
          "type": "string"
        },
        "assetnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Asset",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "An asset that is associated with the work order.",
          "maxLength": 25,
          "relation": "MULTIASSETLOCCI"
        },
        "progress": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Mark Progress",
          "persistent": true,
          "type": "boolean",
          "remarks": "Select this check box when you finish working with the asset, location, or configuration item.",
          "relation": "MULTIASSETLOCCI"
        },
        "location": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Location",
          "persistent": true,
          "type": "string",
          "remarks": "Storeroom where the item is stored.",
          "maxLength": 12
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "activeassetmeter.mxapiassetmeter": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "lastreadingdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Last Reading Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date of the last reading for this meter.",
                "maxLength": 10
              },
              "meter": {
                "type": "object",
                "properties": {
                  "metertype": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Meter Type",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Maximo supports three types of meters: CONTINUOUS, GAUGE and CHARACTERISTIC.",
                    "maxLength": 25
                  },
                  "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Describes the meter group.The description can be up to 255 characters in length. To enter or view additional information, click the Long Description button.",
                    "maxLength": 100
                  },
                  "metertype_maxvalue": {
                    "type": "string"
                  },
                  "metertype_description": {
                    "type": "string"
                  },
                  "domainid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Domain",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Constraint defining what are valid values for this meter. A domain can be ALN, NUMERIC or from a value list.",
                    "maxLength": 18
                  }
                }
              },
              "active": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Active",
                "persistent": true,
                "type": "boolean",
                "remarks": "Is this asset's meter available to accept manual or rolled down readings, or to be used in PM or CM work order generation?"
              },
              "assetmeterdomain": {
                "type": "object",
                "properties": {
                  "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Value description",
                    "maxLength": 100
                  },
                  "value": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Value",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Value of the domain",
                    "maxLength": 254
                  }
                }
              },
              "lastreading": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Last Reading",
                "persistent": true,
                "type": "string",
                "remarks": "Last reading taken for this meter. This should be the same as the most recent meter reading. An asset that was used before it was added to the system will have an asset meter reading. The last meter reading for an existing asset can be used as the initial meter reading for that asset in the system.",
                "maxLength": 18
              },
              "assetmeterid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "ASSETMETERID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11
              },
              "sequence": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "SMALLINT",
                "title": "Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Meter display sequence",
                "maxLength": 11
              },
              "measureunitid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Unit of Measure",
                "persistent": true,
                "type": "string",
                "remarks": "Measure unit for the meter when attached to this asset, for example LITERS or RPM",
                "maxLength": 16
              },
              "readingtype_maxvalue": {
                "type": "string"
              },
              "metername": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Meter",
                "persistent": true,
                "type": "string",
                "remarks": "Identifier for the meter attached to the asset, for example HOURS or KILOMETERS.",
                "maxLength": 10
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "remarks": "Asset number to which the meter is attached",
                "maxLength": 25
              },
              "siteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Site",
                "persistent": true,
                "type": "string",
                "remarks": "Site identifier for this meter.",
                "maxLength": 8
              },
              "rollover": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Rollover",
                "persistent": true,
                "type": "number",
                "remarks": "Point at which the asset's meter returns to the its mininum value. Rollover applies to CONTINUOUS meters only.",
                "maxLength": 16
              },
              "readingtype_description": {
                "type": "string"
              },
              "readingtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reading Type",
                "persistent": true,
                "type": "string",
                "remarks": "reading type (CONTINUOUS or DELTA) for this meter.",
                "maxLength": 10
              },
              "remarks": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Remarks",
                "persistent": true,
                "type": "string",
                "remarks": "Additional information supplied by the user regarding the record.",
                "maxLength": 50
              }
            }
          },
          "cardinality": "UNDEFINED"
        }
      },
      "required": [
        "multiid",
        "progress"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/multiassetlocci?oslc.select=multiid%2Cassetnum%2Casset.description--assetdescription%2Clocation%2Clocation.location--location%2Clocation.description--locationdesc%2Cprogress%2Csiteid%2Crel.inspectionresult.mxapiinspectionres%7Binspectionresultid--inspresultid%2Cresultnum--inspresult%2Chref%7D%2CcomputedAssetLoc%2Cactiveassetmeter._dbcount--multiassetmetercount%2Cactivelocationmeter._dbcount--multilocationmetercount%2CcomputedMultiDisableMeter%2Crel.activeassetmeter.mxapiassetmeter%7Bmetername%2Clastreading%2Cmeasureunitid%2Clastreadingdate%2Cassetnum%2Cactive%2Cremarks%2Cnewreadingdate%2Cmeter.description%2Cmeter.metertype%2Cmeter.domainid%2Cindex%2Chref%2Cassetmeterid%2Cdorollover%2Cpreviousreading%2Cpreviousreadingdate%2Cassetmeterdomain.value%2Cassetmeterdomain.description%2Creadingtype%2Csiteid%2Csequence%2Cnewreading%2Crollover%2CnewreadingFlag%2Canywhererefid%7D%2Crel.activelocationmeter.mxapilocationmeter%7Bmetername%2Clastreading%2Cmeasureunitid%2Clastreadingdate%2Clocation%2Cactive%2Cnewreading%2Crollover%2Cremarks%2Cnewreadingdate%2Cmeter.description%2Cmeter.metertype%2Cmeter.domainid%2Cdomainid%2Chref%2Cindex%2Clocationmeterid%2Clocations%2Cpreviousreading%2Cpreviousreadingdate%2Clocationmeterdomain.value%2Clocationmeterdomain.description%2Creadingtype%2CnewreadingFlag%2Csiteid%2Cdorollover%2Csequence%2Canywhererefid%7D%2Crel.asset.mxapiasset%7Bassetnum%2Cdescription%7D&oslc.pageSize=100&oslc.orderBy=%2Bsequence&searchAttributes=assetnum%2Csequence&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 3,
    "pagenum": 1
  }
};
export default multiassetlocitem;
