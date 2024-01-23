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
const tkspecitem = {
        "member": [
            {
                "_rowstamp": "26845164",
                "tktemplateid": 50,
                "instructions": "Do as I say",
                "longinstructions": "Do as I say in long description",
                "description": "CLass1",
                "tktemplatespec": [
                    {
                        "classstructureid": "1334",
                        "changeby": "WILSON",
                        "class_description": "Service Request",
                        "tktemplatespecid": 4,
                        "assetattributedesc": "Max Weight Allowed",
                        "changedate": "2021-12-07T18:04:44-08:00",
                        "templateid": "1010",
                        "refobjectname": "TKTEMPLATE",
                        "mandatory": true,
                        "assetattributedatatype_description": "Numeric",
                        "orgid": "EAGLENA",
                        "assetattrid": "MAX WGT",
                        "measureunitid": "LBS",
                        "assetattributedatatype_maxvalue": "NUMERIC",
                        "refobjectid": 50,
                        "href": null,
                        "assetattributedatatype": "NUMERIC",
                        "class_maxvalue": "SR",
                        "class": "SR"
                    },
                    {
                        "classstructureid": "1334",
                        "changeby": "WILSON",
                        "class_description": "Service Request",
                        "tktemplatespecid": 5,
                        "assetattributedesc": "Aspect",
                        "changedate": "2021-12-07T18:04:44-08:00",
                        "templateid": "1010",
                        "refobjectname": "TKTEMPLATE",
                        "mandatory": true,
                        "assetattributedatatype_description": "Alphanumeric characters",
                        "orgid": "EAGLENA",
                        "assetattrid": "ALT NAME",
                        "assetattributedatatype_maxvalue": "ALN",
                        "refobjectid": 51,
                        "href": null,
                        "assetattributedatatype": "ALN",
                        "class_maxvalue": "SR",
                        "class": "SR"
                    },
                    {
                        "classstructureid": "1334",
                        "changeby": "WILSON",
                        "class_description": "Service Request",
                        "tktemplatespecid": 6,
                        "assetattributedesc": "Max Date",
                        "changedate": "2021-12-07T18:04:44-08:00",
                        "templateid": "1010",
                        "refobjectname": "TKTEMPLATE",
                        "mandatory": true,
                        "assetattributedatatype_description": "Date",
                        "orgid": "EAGLENA",
                        "assetattrid": "MAX DATE",
                        "assetattributedatatype_maxvalue": "DATE",
                        "refobjectid": 50,
                        "href": null,
                        "assetattributedatatype": "DATE",
                        "class_maxvalue": "SR",
                        "class": "SR"
                    },
                    {
                        "classstructureid": "1334",
                        "changeby": "WILSON",
                        "class_description": "Service Request",
                        "tktemplatespecid": 7,
                        "assetattributedesc": "Table Domain",
                        "changedate": "2023-06-16T18:04:44-08:00",
                        "templateid": "1010",
                        "refobjectname": "TKTEMPLATE",
                        "mandatory": true,
                        "assetattributedatatype_description": "Table Domain",
                        "orgid": "EAGLENA",
                        "assetattrid": "MAX TABLE",
                        "assetattributedatatype_maxvalue": "TABLE",
                        "refobjectid": 53,
                        "href": null,
                        "assetattributedatatype": "TABLE",
                        "class_maxvalue": "SR",
                        "class": "SR"
                    },
                    {
                        "classstructureid": "1334",
                        "changeby": "WILSON",
                        "class_description": "Service Request",
                        "tktemplatespecid": 8,
                        "assetattributedesc": "Table Domain",
                        "changedate": "2023-06-16T18:04:44-08:00",
                        "templateid": "1010",
                        "refobjectname": "TKTEMPLATE",
                        "mandatory": true,
                        "assetattributedatatype_description": "Table Domain",
                        "orgid": "EAGLENA",
                        "assetattrid": "MAX TABLE WITHDOMAIN",
                        "assetattributedomainid": "TABLEDOMAINID",
                        "assetattributedatatype_maxvalue": "TABLE",
                        "refobjectid": 54,
                        "href": null,
                        "assetattributedatatype": "TABLE",
                        "class_maxvalue": "SR",
                        "class": "SR"
                    }
                ],
                "href": "oslc/os/mxapitktemplate/_MTAxMA--",
                "templateid": "1010"
            }
        ],
        "href": "oslc/os/mxapitktemplate",
        "responseInfo": {
            "schema": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "resource": "MXAPITKTEMPLATE",
                "description": "Maximo API for TKTEMPLATE",
                "pk": [
                    "templateid"
                ],
                "title": "TKTEMPLATE",
                "type": "object",
                "$ref": "oslc/jsonschemas/mxapitktemplate",
                "properties": {
                    "_rowstamp": {
                        "type": "string"
                    },
                    "tktemplateid": {
                        "searchType": "EXACT",
                        "subType": "BIGINT",
                        "title": "TKTEMPLATEID",
                        "persistent": true,
                        "type": "integer",
                        "remarks": "Unique Identifier",
                        "maxLength": 19
                    },
                    "localref": {
                        "type": "string"
                    },
                    "_imglibref": {
                        "type": "string"
                    },
                    "description": {
                        "searchType": "TEXT",
                        "subType": "ALN",
                        "title": "Description",
                        "persistent": true,
                        "type": "string",
                        "remarks": "Describes the ticket template. To enter or view additional information, click the Long Description button.",
                        "maxLength": 100
                    },
                    "tktemplatespec": {
                        "type": "array",
                        "items": {
                            "definition": {
                                "subSchema": {
                                    "$ref": "oslc/jsonschemas/mxapitktemplate/tktemplatespec"
                                }
                            },
                            "type": "object"
                        },
                        "cardinality": "UNDEFINED",
                        "relation": "TKTEMPLATESPEC"
                    },
                    "href": {
                        "type": "string"
                    },
                    "_id": {
                        "type": "string"
                    },
                    "templateid": {
                        "default": "&AUTOKEY&",
                        "searchType": "WILDCARD",
                        "subType": "UPPER",
                        "title": "Template",
                        "persistent": true,
                        "type": "string",
                        "remarks": "Identifies the ticket template. This value must be unique for all ticket template records.",
                        "maxLength": 10
                    }
                },
                "required": [
                    "templateid",
                    "tktemplateid"
                ]
            },
            "totalPages": 1,
            "href": "oslc/os/mxapitktemplate?oslc.select=description%2Ctemplateid%2Ctktemplateid%2Crel.tktemplatespec%7B*%2Cassetattribute.description--assetattributedesc%2Cassetattribute.datatype--assetattributedatatype%2Cassetattribute.domainid--assetattributedomainid%7D&oslc.pageSize=40&oslc.where=templateid%3D%221010%22&savedQuery=SERVICEREQUESTTKTEMPLATE&searchAttributes=description%2Ctemplateid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
            "totalCount": 1,
            "pagenum": 1
        }
    }


export default tkspecitem;