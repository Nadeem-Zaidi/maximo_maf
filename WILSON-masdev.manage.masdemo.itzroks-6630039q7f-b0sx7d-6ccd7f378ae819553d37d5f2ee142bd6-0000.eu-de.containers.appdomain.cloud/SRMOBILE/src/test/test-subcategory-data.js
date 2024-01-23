/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

let subcategoryitem ={
    
    "member": [
        {
            "useclassindesc": true,
            "parent": "1138",
            "classstructureid": "1143",
            "classificationdesc": "HR",
            "show": true,
            "description": "Request for Service \\ HR",
            "classificationid": "204",
            "classusewith": [
                {
                    "objectname": "INCIDENT"
                },
                {
                    "objectname": "PROBLEM"
                },
                {
                    "objectname": "SOLUTION"
                },
                {
                    "objectname": "SR"
                },
                {
                    "objectname": "WOACTIVITY"
                },
                {
                    "objectname": "WORELEASE"
                }
            ],
            "_rowstamp": "767516",
            "sortorder": 1,
            "href": "oslc/os/mxapitkclass/_MTE0Mw--",
            "classstructureuid": 163,
            "haschildren": true
        },
        {
            "useclassindesc": true,
            "parent": "1138",
            "classstructureid": "1155",
            "classificationdesc": "Terminate Employee",
            "show": true,
            "description": "Request For Service\\HR\\Terminate Employee",
            "classificationid": "20403",
            "classusewith": [
                {
                    "objectname": "INCIDENT"
                },
                {
                    "objectname": "PROBLEM"
                },
                {
                    "objectname": "SOLUTION"
                },
                {
                    "objectname": "SR"
                },
                {
                    "objectname": "WOACTIVITY"
                },
                {
                    "objectname": "WORELEASE"
                }
            ],
            "_rowstamp": "767517",
            "sortorder": 2,
            "href": "oslc/os/mxapitkclass/_MTE1NQ--",
            "classstructureuid": 175,
            "haschildren": false
        },
        {
            "useclassindesc": true,
            "parent": "1138",
            "classstructureid": "1141",
            "classificationdesc": "Facility",
            "show": true,
            "description": "Request for Service \\ Facility",
            "classificationid": "202",
            "classusewith": [
                {
                    "objectname": "INCIDENT"
                },
                {
                    "objectname": "PROBLEM"
                },
                {
                    "objectname": "SOLUTION"
                },
                {
                    "objectname": "SR"
                },
                {
                    "objectname": "WOACTIVITY"
                },
                {
                    "objectname": "WORELEASE"
                }
            ],
            "_rowstamp": "767518",
            "sortorder": 3,
            "href": "oslc/os/mxapitkclass/_MTE0MQ--",
            "classstructureuid": 161,
            "haschildren": true
        },
        {
            "useclassindesc": true,
            "parent": "1138",
            "classstructureid": "1140",
            "classificationdesc": "IT",
            "show": true,
            "description": "Request for Service \\ IT",
            "classificationid": "201",
            "classusewith": [
                {
                    "objectname": "INCIDENT"
                },
                {
                    "objectname": "PROBLEM"
                },
                {
                    "objectname": "SOLUTION"
                },
                {
                    "objectname": "SR"
                },
                {
                    "objectname": "WOACTIVITY"
                },
                {
                    "objectname": "WORELEASE"
                }
            ],
            "_rowstamp": "767519",
            "sortorder": 4,
            "href": "oslc/os/mxapitkclass/_MTE0MA--",
            "classstructureuid": 160,
            "haschildren": true
        },
        {
            "useclassindesc": true,
            "parent": "1138",
            "classstructureid": "1154",
            "classificationdesc": "Transfer",
            "show": true,
            "description": "Request For Service\\HR\\Internal Transfer",
            "classificationid": "20402",
            "classusewith": [
                {
                    "objectname": "INCIDENT"
                },
                {
                    "objectname": "PROBLEM"
                },
                {
                    "objectname": "SOLUTION"
                },
                {
                    "objectname": "SR"
                },
                {
                    "objectname": "WOACTIVITY"
                },
                {
                    "objectname": "WORELEASE"
                }
            ],
            "_rowstamp": "767520",
            "sortorder": 5,
            "href": "oslc/os/mxapitkclass/_MTE0MA--",
            "classstructureuid": 174,
            "haschildren": false
        },
        {
            "useclassindesc": true,
            "parent": "1154",
            "classstructureid": "91154",
            "classificationdesc": "Transfer",
            "show": true,
            "description": "Child of Transfer",
            "classificationid": "920402",
            "classusewith": [
                {
                    "objectname": "SR"
                }
            ],
            "_rowstamp": "9767520",
            "sortorder": 6,
            "href": "oslc/os/mxapitkclass/_9MTE0MA--",
            "classstructureuid": 9174,
            "haschildren": false
        }
    ],
    "href": "oslc/os/mxapitkclass",
    "responseInfo": {
        "schema": {
            "resource": "MXAPITKCLASS",
            "description": "Maximo API for CLASSSTRUCTURE",
            "pk": [
                "classstructureid"
            ],
            "title": "CLASSSTRUCTURE",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapitkclass",
            "properties": {
                "useclassindesc": {
                    "searchType": "EXACT",
                    "subType": "YORN",
                    "title": "Use Classification",
                    "persistent": true,
                    "type": "boolean",
                    "remarks": "Use Classification in Generated  Description?"
                },
                "parent": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Parent Class Structure",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Parent Class Structure",
                    "maxLength": 20
                },
                "localref": {
                    "type": "string"
                },
                "classstructureid": {
                    "default": "&AUTOKEY&",
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Class Structure",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Class Structure identifier",
                    "maxLength": 20
                },
                "classificationdesc": {
                    "searchType": "NONE",
                    "subType": "ALN",
                    "title": "Classification Desc",
                    "type": "string",
                    "remarks": "The description for the classification entered in this classstructure object",
                    "maxLength": 254
                },
                "show": {
                    "default": true,
                    "searchType": "EXACT",
                    "subType": "YORN",
                    "title": "Show in Service Request Work Center",
                    "persistent": true,
                    "type": "boolean",
                    "remarks": "Indicates that the classification will appear in the self service request work center."
                },
                "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Describes the selected asset class structure.",
                    "maxLength": 254
                },
                "classificationid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Classification",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Classification ID of the node",
                    "maxLength": 192
                },
                "classusewith": {
                    "objectName": "CLASSUSEWITH",
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "objectname": {
                                "searchType": "WILDCARD",
                                "subType": "UPPER",
                                "title": "Use With",
                                "persistent": true,
                                "type": "string",
                                "remarks": "The Object/Area which the classification can be classified with",
                                "maxLength": 30
                            }
                        }
                    },
                    "cardinality": "MULTIPLE"
                },
                "_rowstamp": {
                    "type": "string"
                },
                "_imagelibref": {
                    "type": "string"
                },
                "siteid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Site",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Site Identifier",
                    "maxLength": 8
                },
                "sortorder": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "INTEGER",
                    "title": "Order",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Sort Order for Classifications.",
                    "maxLength": 11
                },
                "href": {
                    "type": "string"
                },
                "_id": {
                    "type": "string"
                },
                "classstructureuid": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "BIGINT",
                    "title": "CLASSSTRUCTUREUID",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Unique Identifier",
                    "maxLength": 11
                },
                "haschildren": {
                    "searchType": "EXACT",
                    "subType": "YORN",
                    "title": "Has Children",
                    "persistent": true,
                    "type": "boolean",
                    "remarks": "Does this node have child nodes?"
                }
            },
            "required": [
                "classificationid",
                "haschildren",
                "useclassindesc"
            ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapitkclass?oslc.select=classificationid%2Cclassificationdesc%2Cclassstructureid%2Cclassstructureuid%2Cdescription%2Chaschildren%2Cshow%2Csortorder%2Cuseclassindesc%2C_id%2C_imagelibref%2Csiteid%2Cparent%2Crel.classusewith%7Bobjectname%7D%2Chierarchypath%2CdisplayIcon&oslc.pageSize=100&oslc.where=parent%3D%221138%22%20and%20classusewith.objectname%3D%22SR%22&savedQuery=MOBILECLASSSTRUCTURE&oslc.orderBy=%2Bsortorder&searchAttributes=classificationdesc%2Cdescription%2Cparent&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
        "totalCount": 6,
        "pagenum": 1
    }
};
export default subcategoryitem;
