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


let woassetmeters = {
  member: [
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
      "newreading": "1",
      "computedMeterCurDate": "2025-03-22T00:00:00.000+05:30",
      "computedMeterCurTime": "2025-03-14T00:30:00+05:30"
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
  "href": "oslc/os/mxapiassetmeter",
  "responseInfo": {
    "totalPages": 1,
    "href": "oslc/os/mxapiassetmeter?oslc.select=metername%2Clastreading%2Cmeasureunitid%2Clastreadingdate%2Cassetnum%2Cactive%2Cnewreading%2Crollover%2Cremarks%2Cnewreadingdate%2Cmeter.description%2Cmeter.metertype%2Cmeter.domainid%2Cindex%2Chref%2Cassetmeterid%2Cdorollover%2Cpreviousreading%2Cpreviousreadingdate%2Cassetmeterdomain.value%2Cassetmeterdomain.description%2Creadingtype&oslc.pageSize=100&oslc.where=assetnum%3D%2213170%22&collectioncount=1&ignorecollectionref=1&relativeuri=1&lean=1&internalvalues=1",
    "totalCount": 6,
    "pagenum": 1
  }
};

export default woassetmeters;
