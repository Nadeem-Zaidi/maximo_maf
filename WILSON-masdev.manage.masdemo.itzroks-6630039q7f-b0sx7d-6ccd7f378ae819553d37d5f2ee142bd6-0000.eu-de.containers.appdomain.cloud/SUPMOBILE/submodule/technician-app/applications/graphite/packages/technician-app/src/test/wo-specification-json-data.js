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

let woSpecification = {
    "member": [
      {
        "assetattrid": "ANOM TYP",
        "assetattributedesc": "Anomaly Type",
        "displaysequence": 1,
        "alnvalue": "10",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/0-48",
        "workorderspecid": 48
      },
      {
        "assetattrid": "B31G BP",
        "assetattributedesc": "Mod B31G BP",
        "displaysequence": 2,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/1-49",
        "numvalue": 15,
        "workorderspecid": 49
      },
      {
        "assetattrid": "B31G ERF",
        "datevalue": "2023-01-30T00:00:00+05:30",
        "assetattributedesc": "Mod B31G ERF",
        "displaysequence": 3,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/2-50",
        "workorderspecid": 50
      },
      {
        "assetattrid": "CLOCK",
        "assetattributedesc": "Position using clock face",
        "displaysequence": 4,
        "alnvalue": "20",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/3-51",
        "workorderspecid": 51
      },
      {
        "assetattrid": "INTEXT",
        "assetattributedesc": "Internal External",
        "displaysequence": 5,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/4-52",
        "workorderspecid": 52
      },
      {
        "assetattrid": "LENGTH",
        "measureunitid": "FEET",
        "assetattributedesc": "Length",
        "displaysequence": 6,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/5-53",
        "numvalue": 15.1,
        "workorderspecid": 53
      },
      {
        "assetattrid": "MAX DEP",
        "assetattributedesc": "Max Depth Percentage",
        "displaysequence": 7,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/6-54",
        "workorderspecid": 54
      },
      {
        "assetattrid": "WIDTH",
        "measureunitid": "IN",
        "assetattributedesc": "Width",
        "displaysequence": 8,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/7-55",
        "numvalue": 12.267,
        "workorderspecid": 55
      },
      {
        "assetattrid": "DEFECT",
        "assetattributedesc": "Defect ID",
        "displaysequence": 9,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/8-56",
        "workorderspecid": 56
      },
      {
        "assetattrid": "DESC",
        "assetattributedesc": "Description",
        "displaysequence": 10,
        "alnvalue": "10",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/9-57",
        "workorderspecid": 57
      },
      {
        "assetattrid": "HEIGHT",
        "measureunitid": "FEET",
        "displaysequence": 11,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec/10-63",
        "numvalue": 5,
        "workorderspecid": 63
      }
    ],
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec",
    "responseInfo": {
      "schema": {
        "resource": "WORKORDERSPEC",
        "pk": [
          "wonum",
          "siteid",
          "assetattrid",
          "section"
        ],
        "title": "WORKORDERSPEC",
        "type": "object",
        "properties": {
          "assetattrid": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Attribute",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Asset attribute identifier",
            "maxLength": 16
          },
          "measureunitid": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Unit of Measure",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Entered units",
            "maxLength": 16
          },
          "datevalue": {
            "searchType": "EXACT",
            "subType": "DATE",
            "title": "Date Value",
            "persistent": true,
            "type": "string",
            "remarks": "Date Value",
            "maxLength": 4
          },
          "_imglibref": {
            "type": "string"
          },
          "assetattributedesc": {
            "searchType": "WILDCARD",
            "subType": "ALN",
            "title": "Description",
            "persistent": true,
            "type": "string",
            "remarks": "Description of the classification attribute",
            "maxLength": 100
          },
          "alnvalue": {
            "searchType": "WILDCARD",
            "subType": "ALN",
            "title": "Alphanumeric Value",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Alphanumeric value for the attribute associated with the work order",
            "maxLength": 254
          },
          "displaysequence": {
            "searchType": "EXACT",
            "maximum": 2147483647,
            "subType": "SMALLINT",
            "title": "Display Sequence",
            "persistent": true,
            "type": "integer",
            "minimum": -2147483648,
            "remarks": "Display sequence",
            "maxLength": 11
          },
          "_id": {
            "type": "string"
          },
          "workorderspecid": {
            "searchType": "EXACT",
            "maximum": 2147483647,
            "subType": "BIGINT",
            "title": "Unique Id",
            "persistent": true,
            "type": "integer",
            "minimum": -2147483648,
            "remarks": "Unique Id",
            "maxLength": 11
          },
          "numvalue": {
            "searchType": "EXACT",
            "scale": 10,
            "subType": "DECIMAL",
            "title": "Numeric Value",
            "persistent": true,
            "type": "number",
            "hasList": true,
            "remarks": "Numeric value in entered units"
          }
        },
        "required": [
          "assetattrid",
          "displaysequence",
          "workorderspecid"
        ]
      },
      "totalPages": 1,
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNzQz/workorderspec?oslc.select=workorderspecid%2Cassetattrid%2Cmeasureunitid%2Cnumvalue%2Calnvalue%2Cdatevalue%2Cassetattribute.description--assetattributedesc%2Cdisplaysequence&oslc.pageSize=100&oslc.orderBy=%2Bdisplaysequence&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
      "totalCount": 11,
      "pagenum": 1
    }
  }

  export default woSpecification;