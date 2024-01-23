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


let assetmetersdata = {
  member: [
    {
      "lastreadingdate": "2022-10-30T14:04:09+05:30",
      "metername": "RUNHOURS",
      "measureunit": {
        "description":"Hours"      
      },      
      "lastreading": "1/16",     
      "assetmeterid": 78,
      "_rowstamp": "8641066",      
      "measureunitid": "FT",      
      "href": "oslc/os/mxapiasset/_MTMxNzAvMC9HVUFSRCBSQUlML0JFREZPUkQ-",
      
      "computedReadingDate": "2022-03-22T00:00:00.000+05:30"      
    },
    {
      "lastreadingdate": "2022-10-30T14:04:09+05:20",
      "metername": "O-PRESSURE",
      "measureunit": {
        "description":"psi"      
      },      
      "lastreading": "1/16",     
      "assetmeterid": 78,
      "_rowstamp": "8641066",      
      "measureunitid": "PSI",      
      "href": "oslc/os/mxapiasset/_MTMxNzAvMC9HVUFSRCBSQUlML0JFREZPUkQ-",
      
      "computedReadingDate": "2022-03-22T00:00:00.000+05:30"   
    },
    
  ],
  "href": "oslc/os/mxapiasset",
  "responseInfo": {
    "totalPages": 1,
    "href": "oslc/os/mxapiasset/_MTE0MzAvQkVERk9SRA--/int_assetmeter?oslc.select=metername%2Clastreading%2Cmeasureunitid%2Clastreadingdate%2Cindex%2Chref%2Cassetmeterid%2Csequence%2CcomputedReadingDate%2Cmeter.measureunit.description--unitdescription&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&lean=1&internalvalues=1",
    "totalCount": 6,
    "pagenum": 1
  }
};

export default assetmetersdata;
