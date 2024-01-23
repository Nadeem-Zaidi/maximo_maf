/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
const data = {
  "member": [
    {
      "_rowstamp": "1404113",
      "numoverdue": 1,
      "countbooknum": "1001",
      "description": "Count Book 1001",
      "siteid": "BEDFORD",
      "href": "oslc/os/mxapicntbook/_MTAwMS9CRURGT1JE",
      "countbookid": 1,
      "counted": 10,
      "countbookallitmcount": 10,
      "status_description": "Approved",
      "latestdue": "2012-01-01T09:05:21+08:00",
      "lastcount": "2022-04-15T11:05:21+08:00"
    },
    {
      "_rowstamp": "1399170",
      "numoverdue": 6,
      "countbooknum": "1005",
      "counted": 2,
      "description": "new test count book",
      "siteid": "BEDFORD",
      "latestdue": "2022-06-13T21:00:23+08:00",
      "href": "oslc/os/mxapicntbook/_MTAwNS9CRURGT1JE",
      "countbookid": 61,
      "lastcount": "2022-04-22T21:08:04+08:00"
    },
    {
      "_rowstamp": "1503829",
      "numoverdue": 0,
      "countbooknum": "1006",
      "counted": 1,
      "description": "new test book 3",
      "siteid": "BEDFORD",
      "latestdue": "2022-04-20T20:18:27+08:00",
      "href": "oslc/os/mxapicntbook/_MTAwNi9CRURGT1JE",
      "countbookid": 81,
      "lastcount": "2022-04-20T20:18:27+08:00"
    },
    {
      "_rowstamp": "1917491",
      "numoverdue": 0,
      "countbooknum": "1007",
      "counted": 0,
      "description": "count book 1007",
      "siteid": "BEDFORD",
      "latestdue": "2011-03-11T14:36:26+08:00",
      "href": "oslc/os/mxapicntbook/_MTAwNy9CRURGT1JE",
      "countbookid": 101,
      "lastcount": "2011-03-11T14:36:26+08:00"
    },
    {
      "_rowstamp": "1917748",
      "numoverdue": 0,
      "countbooknum": "1008",
      "counted": 1,
      "description": "count book 1008",
      "siteid": "BEDFORD",
      "latestdue": "1999-04-11T09:56:31+08:00",
      "href": "oslc/os/mxapicntbook/_MTAwOC9CRURGT1JE",
      "countbookid": 102,
      "lastcount": "1999-04-11T09:56:31+08:00"
    }
  ],
  "href": "oslc/os/mxapicntbook",
  "responseInfo": {
    "schema": {
      "resource": "MXAPICNTBOOK",
      "description": "Maximo API for Count Books",
      "pk": [
        "siteid",
        "countbooknum"
      ],
      "title": "COUNTBOOK",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapicntbook",
      "properties": {
        "localref": {
          "type": "string"
        },
        "description": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Description of the count book.",
          "maxLength": 50
        },
        "latestdue": {
          "searchType": "NONE",
          "subType": "DATETIME",
          "title": "Due",
          "type": "string",
          "remarks": "The latest Due date from all the count lines.",
          "maxLength": 10
        },
        "lastcount": {
          "searchType": "NONE",
          "subType": "DATETIME",
          "title": "Last Count",
          "type": "string",
          "remarks": "The latest count date from all the count lines.",
          "maxLength": 10
        },
        "_rowstamp": {
          "type": "string"
        },
        "numoverdue": {
          "searchType": "NONE",
          "subType": "INTEGER",
          "title": "Number of Overdue",
          "type": "integer",
          "remarks": "The total count of all items in the count book which have a Due Date past the current date.",
          "maxLength": 12
        },
        "_imagelibref": {
          "type": "string"
        },
        "countbooknum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Count Book",
          "persistent": true,
          "type": "string",
          "remarks": "User-assigned count book number.",
          "maxLength": 8
        },
        "counted": {
          "searchType": "NONE",
          "subType": "INTEGER",
          "title": "Counted",
          "type": "integer",
          "remarks": "The number of lines that have a physical count entered. Items are on separate lines if they are rotating, or if they are in separate batches or bins.",
          "maxLength": 12
        },
        "siteid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Site",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the site.",
          "maxLength": 8
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "countbookid": {
          "searchType": "EXACT",
          "subType": "BIGINT",
          "title": "Unique Id",
          "persistent": true,
          "type": "integer",
          "remarks": "Unique Id",
          "maxLength": 19
        },
        "lastcountby": {
          "searchType": "NONE",
          "subType": "UPPER",
          "title": "Counted By",
          "type": "string",
          "remarks": "The user who recorded the last count from all the count lines.",
          "maxLength": 30
        },
        "countbookline": {
          "objectName": "COUNTBOOKLINE",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapicntbook/countbookline"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "COUNTBOOKALLITM"
        }
      },
      "required": [
        "countbooknum",
        "siteid"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapicntbook?oslc.select=siteid%2Ccountbookid%2Ccountbooknum%2Cdescription%2Clatestdue%2Clastcount%2Clastcountby%2Cnumoverdue%2Ccounted&oslc.pageSize=100&savedQuery=MOBILECNTBOOK&searchAttributes=siteid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 5,
    "pagenum": 1
  }
}
export default data;