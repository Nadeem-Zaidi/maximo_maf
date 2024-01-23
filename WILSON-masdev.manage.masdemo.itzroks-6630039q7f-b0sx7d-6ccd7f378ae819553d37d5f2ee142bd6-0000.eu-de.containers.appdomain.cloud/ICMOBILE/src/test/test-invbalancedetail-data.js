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
      "itemnum": "230-00",
      "_rowstamp": "566963",
      "binnum": "A",
      "lotnum": "L-A",
      "allowblindcnt": "0",
      "physcntdate": "1995-07-07T14:42:00+08:00",
      "physcnt": 0,
      "curbal": 1,
      "invbalancesid": 382,
      "pre_curbalchange": -9,
      "abctype_description": "Type A",
      "href": "oslc/os/mxapiinvbal/_QS02LTIvfk5VTEx_LzIzMC0wMC9TRVQxL0NFTlRSQUwvfk5VTEx_L0JFREZPUkQ-",
      "abctype": "A",
      "issueunit": "EACH"
    }
  ],
  "href": "oslc/os/mxapiinvbal",
  "responseInfo": {
    "schema": {
      "resource": "MXAPIINVBAL",
      "description": "Maximo API for Inventory Balance",
      "pk": [
        "itemnum",
        "location",
        "binnum",
        "lotnum",
        "conditioncode",
        "siteid",
        "itemsetid"
      ],
      "title": "INVBALANCES",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapiinvbal",
      "properties": {
        "localref": {
          "type": "string"
        },
        "allowblindcnt": {
          "type": "string"
        },
        "physcnt": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Physical Count",
          "persistent": true,
          "type": "number",
          "remarks": "The number of this item or tool logged the last time a physical count was performed at this location.",
          "maxLength": 16
        },
        "lotnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Lot",
          "persistent": true,
          "type": "string",
          "remarks": "Lot number of the item or tool, if it exists in a lot.",
          "maxLength": 8
        },
        "inventory": {
          "objectName": "INVENTORY",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiinvbal/inventory"
              }
            },
            "type": "object"
          },
          "cardinality": "UNDEFINED",
          "relation": "INVENTORY"
        },
        "issueunit": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Issue Unit",
          "persistent": true,
          "type": "string",
          "remarks": "Standard quantity by which the item is issued from the storeroom, such as each or roll. Click the Select Value button to view a list of valid issue units.",
          "maxLength": 16
        },
        "itemnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Item",
          "persistent": true,
          "type": "string",
          "remarks": "A unique identification number for an item in inventory in the selected storeroom.",
          "maxLength": 30
        },
        "_rowstamp": {
          "type": "string"
        },
        "_imagelibref": {
          "type": "string"
        },
        "physcntdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Physical Count Date",
          "persistent": true,
          "type": "string",
          "remarks": "The date of the last physical count at this location.",
          "maxLength": 10
        },
        "curbal": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Current Balance",
          "persistent": true,
          "type": "number",
          "remarks": "The current number of this item or tool at this location.",
          "maxLength": 16
        },
        "invbalancesid": {
          "searchType": "EXACT",
          "subType": "BIGINT",
          "title": "INVBALANCESID",
          "persistent": true,
          "type": "integer",
          "remarks": "Unique Identifier",
          "maxLength": 19
        },
        "abctype_description": {
          "type": "string"
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "abctype": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "ABC Type",
          "persistent": true,
          "type": "string",
          "remarks": "ABC analysis in Inventory lets you quickly identify which inventory items represent your company's greatest investment in terms of monetary value and turnover rate. The ABC Type value for a item is determined by running an ABC Analysis report, which multiplies the current YTD issued quantity by the last cost of the item. The items are then sorted in descending order of the dollar value reached by this calculation.",
          "maxLength": 1
        }
      },
      "required": [
        "curbal",
        "itemnum",
        "physcnt"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiinvbal?oslc.select=itemnum%2Cinventory.abctype--abctype%2Clotnum%2Cinventory.issueunit--issueunit%2Ccurbal%2Cphyscnt%2Cphyscntdate%2Cinvbalancesid%2Cmaxvar.allowblindcnt&oslc.pageSize=40&oslc.where=invbalancesid%3D382&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 1,
    "pagenum": 1
  }
}
export default data;