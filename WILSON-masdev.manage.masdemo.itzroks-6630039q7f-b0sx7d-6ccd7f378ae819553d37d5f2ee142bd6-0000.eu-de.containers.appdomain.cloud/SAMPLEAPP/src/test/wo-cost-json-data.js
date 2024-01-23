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

let wocost = {"member": [
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
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal",
  "responseInfo": {
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "resource": "WOTOTAL",
      "title": "WOTOTAL",
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
          "remarks": "Actual"
        },
        "exceeded": {
          "searchType": "NONE",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Exceeds Estimate by",
          "type": "number",
          "remarks": "The labor hours or costs that exceed the approved estimate."
        },
        "_imagelibref": {
          "type": "string"
        },
        "est": {
          "searchType": "NONE",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Current Estimate",
          "type": "number",
          "remarks": "Current Estimate"
        },
        "estatappr": {
          "searchType": "NONE",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Approved Estimate",
          "type": "number",
          "remarks": "The estimated labor or costs at the time of work order approval."
        },
        "_id": {
          "type": "string"
        }
      }
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMTM4/wototal?oslc.select=total%2Cact%2Cexceeded%2Cest%2Cestatappr&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 10,
    "pagenum": 1
  }};
  
  export default wocost; 
