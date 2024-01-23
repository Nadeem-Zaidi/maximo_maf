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
            "itemnum": "584-L0",
            "_rowstamp": "2301762",
            "item": {
                "description": "Lockwasher- 1/2 In"
            },
            "reconciled": false,
            "pre_curbalchange": -61,
            "physcnt": 4,
            "curbal": 65,
            "invbalancesid": 384,
            "nextphycntdate": "2022-04-15T11:04:40+08:00",
            "binnum": "A-7-3",
            "href": "oslc/os/mxapiinvbal/_QS03LTMvfk5VTEx_LzU4NC1MMC9TRVQxL0NFTlRSQUwvfk5VTEx_L0JFREZPUkQ-"
        },
        {
            "itemnum": "4-2100",
            "_rowstamp": "2301763",
            "item": {
                "description": "Washer, 1/2 In"
            },
            "reconciled": false,
            "pre_curbalchange": -920,
            "physcnt": 2,
            "curbal": 922,
            "invbalancesid": 388,
            "nextphycntdate": "2022-04-20T16:20:15+08:00",
            "binnum": "A-9-4",
            "href": "oslc/os/mxapiinvbal/_QS05LTQvfk5VTEx_LzQtMjEwMC9TRVQxL0NFTlRSQUwvfk5VTEx_L0JFREZPUkQ-"
        },
        {
            "itemnum": "6-0090",
            "_rowstamp": "2301764",
            "item": {
                "description": "Insert, Steel-T23U1-SS"
            },
            "reconciled": false,
            "pre_curbalchange": 47,
            "physcnt": 50,
            "curbal": 3,
            "invbalancesid": 390,
            "nextphycntdate": "2022-04-20T20:08:49+08:00",
            "binnum": "B-4-1",
            "href": "oslc/os/mxapiinvbal/_Qi00LTEvfk5VTEx_LzYtMDA5MC9TRVQxL0NFTlRSQUwvfk5VTEx_L0JFREZPUkQ-"
        },
        {
            "itemnum": "60-051",
            "_rowstamp": "2301765",
            "item": {
                "description": "Pin, Split- E-43"
            },
            "reconciled": false,
            "pre_curbalchange": 0,
            "physcnt": 3,
            "curbal": 3,
            "invbalancesid": 386,
            "nextphycntdate": "2022-04-20T20:18:27+08:00",
            "binnum": "A-4-7",
            "href": "oslc/os/mxapiinvbal/_QS00LTcvfk5VTEx_LzYwLTA1MS9TRVQxL0NFTlRSQUwvfk5VTEx_L0JFREZPUkQ-"
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
            "item": {
            "objectName": "ITEM",
            "type": "object",
            "properties": {
                "description": {
                "searchType": "TEXT",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Names or describes the inventory item. For additional information, click the Long Description button.",
                "maxLength": 100
                }
            }
            },
            "reconciled": {
            "searchType": "EXACT",
            "subType": "YORN",
            "title": "Reconciled",
            "persistent": true,
            "type": "boolean",
            "remarks": "Checking this box indicates if the record has been reconciled or not. Valid values for this field are Y (yes) or N (no)."
            },
            "localref": {
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
            "binnum": {
            "searchType": "WILDCARD",
            "subType": "ALN",
            "title": "Bin",
            "persistent": true,
            "type": "string",
            "remarks": "A unique identification code indicating the primary bin or storage location for the selected item or tool within a storeroom.",
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
            "pre_curbalchange": {
            "searchType": "EXACT",
            "scale": 2,
            "subType": "DECIMAL",
            "title": "Current Balance Change",
            "persistent": true,
            "type": "number",
            "remarks": "The balance change that will accure during reconciliation",
            "maxLength": 16
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
            "nextphycntdate": {
            "searchType": "EXACT",
            "subType": "DATETIME",
            "title": "Next Physical Count Date",
            "persistent": true,
            "type": "string",
            "remarks": "Next Physical Count Date",
            "maxLength": 10
            },
            "href": {
            "type": "string"
            },
            "_id": {
            "type": "string"
            }
        },
        "required": [
            "curbal",
            "itemnum",
            "physcnt",
            "reconciled"
        ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapiinvbal?oslc.select=itemnum%2Citem.description%2Cbinnum%2Cnextphycntdate%2Cphyscnt%2Cpre_curbalchange%2Creconciled%2Cinvbalancesid%2Ccurbal&oslc.pageSize=40&savedQuery=MOBILEINVCNTREC&oslc.orderBy=%2Bnextphycntdate&searchAttributes=itemnum%2Citem.description%2Cbinnum%2Cnextphycntdate&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
        "totalCount": 17,
        "pagenum": 1
    }
}
export default data;