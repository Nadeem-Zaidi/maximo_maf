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
let worklogDS = {
    "member": [
        {
            "anywhererefid": 1690386253258,
            "localref": "oslc/os/mxapisr/_U1IvODY0MTczNDE-/uxworklog/0-143",
            "createdate": "2023-07-26T12:47:24-03:00",
            "description": "Dhdhdhe",
            "clientviewable": true,
            "_rowstamp": "894655",
            "createby": "WILSON",
            "logtype": "CLIENTNOTE",
            "logtype_maxvalue": "CLIENTNOTE",
            "displayname": "Mike Wilson",
            "worklogid": 143,
            "href": "http://childkey#U1IvV09SS0xPRy8xNDM-",
            "logtype_description": "Client Note"
        },
        {
            "anywhererefid": 1690386253259,
            "localref": "oslc/os/mxapisr/_U1IvODY0MTczNDE-/uxworklog/1-145",
            "createdate": "2023-07-26T12:47:35-03:00",
            "description": "Xvxvvxvss",
            "clientviewable": true,
            "_rowstamp": "894666",
            "createby": "WILSON",
            "logtype": "CLIENTNOTE",
            "logtype_maxvalue": "CLIENTNOTE",
            "displayname": "Mike Wilson",
            "worklogid": 145,
            "href": "http://childkey#U1IvV09SS0xPRy8xNDU-",
            "logtype_description": "Client Note"
        }
    ],
    "href": "oslc/os/mxapisr/_U1IvODY0MTczNDE-/uxworklog",
    "responseInfo": {
        "schema": {
            "resource": "MXAPISR",
            "description": "SR/WORKLOG",
            "pk": [
                "worklogid"
            ],
            "title": "SR/WORKLOG",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapisr/worklog",
            "properties": {
                "modifyby": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Changed By",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Person who modified or changed",
                    "maxLength": 30,
                    "relation": "UXWORKLOG"
                },
                "anywhererefid": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "BIGINT",
                    "title": "Anywhere Ref ID",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Anywhere Reference ID",
                    "maxLength": 11,
                    "relation": "UXWORKLOG"
                },
                "description_longdescription": {
                    "searchType": "WILDCARD",
                    "subType": "LONGALN",
                    "title": "Details",
                    "type": "string",
                    "remarks": "Long description of the work log. To check spelling of text you enter, click the Long Description button next to the Summary field.",
                    "maxLength": 32000,
                    "relation": "UXWORKLOG"
                },
                "localref": {
                    "type": "string"
                },
                "createdate": {
                    "searchType": "EXACT",
                    "subType": "DATETIME",
                    "title": "Date",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Date on which the work log entry was created.",
                    "maxLength": 10,
                    "relation": "UXWORKLOG"
                },
                "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Summary",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Short description of the work log entry. To enter or view additional information, click the Long Description button.",
                    "maxLength": 100,
                    "relation": "UXWORKLOG"
                },
                "clientviewable": {
                    "default": false,
                    "searchType": "EXACT",
                    "subType": "YORN",
                    "title": "Viewable",
                    "persistent": true,
                    "type": "boolean",
                    "remarks": "Specifies whether a self-service user can view this work log entry. If the Viewable? check box is selected, or there is a Y in the Viewable? field, the user can view this entry. If the Viewable? check box is cleared, or there is an N in the Viewable? field, the user cannot view this work log entry.",
                    "relation": "UXWORKLOG"
                },
                "assignmentid": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "BIGINT",
                    "title": "Assignment",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Assignment Idenifier",
                    "maxLength": 11,
                    "relation": "UXWORKLOG"
                },
                "orgid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Organization",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Constraint Identifier of the organization",
                    "maxLength": 8,
                    "relation": "UXWORKLOG"
                },
                "langcode": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Language Code",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Language Column",
                    "maxLength": 4,
                    "relation": "UXWORKLOG"
                },
                "_rowstamp": {
                    "type": "string"
                },
                "createby": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Created By",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Person that created the work log entry.",
                    "maxLength": 30,
                    "relation": "UXWORKLOG"
                },
                "logtype": {
                    "default": "!CLIENTNOTE!",
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Type",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Type of work log entry. Enter a value or click the Select Value button.",
                    "maxLength": 16,
                    "relation": "UXWORKLOG"
                },
                "modifydate": {
                    "searchType": "EXACT",
                    "subType": "DATETIME",
                    "title": "Changed Date",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Date on which Work Log changed",
                    "maxLength": 10,
                    "relation": "UXWORKLOG"
                },
                "logtype_maxvalue": {
                    "type": "string"
                },
                "hasld": {
                    "default": false,
                    "searchType": "EXACT",
                    "subType": "YORN",
                    "title": "Has Long Description",
                    "persistent": true,
                    "type": "boolean",
                    "remarks": "Boolean flag to indicate if there is any long description for this record",
                    "relation": "UXWORKLOG"
                },
                "_imagelibref": {
                    "type": "string"
                },
                "recordkey": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Record",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Identifies the record for the work log entry.",
                    "maxLength": 10,
                    "relation": "UXWORKLOG"
                },
                "assignreplocid": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "BIGINT",
                    "title": "Assignment",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Assignment Idenifier",
                    "maxLength": 11,
                    "relation": "UXWORKLOG"
                },
                "siteid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Site",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Unique Identifier of the Site",
                    "maxLength": 8,
                    "relation": "UXWORKLOG"
                },
                "worklogid": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "BIGINT",
                    "title": "WorkLog ID",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Work Log Identifier",
                    "maxLength": 11,
                    "relation": "UXWORKLOG"
                },
                "href": {
                    "type": "string"
                },
                "_id": {
                    "type": "string"
                },
                "logtype_description": {
                    "type": "string"
                }
            },
            "required": [
                "createby",
                "createdate",
                "langcode",
                "modifyby",
                "modifydate",
                "recordkey"
            ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapisr/_U1IvODY0MTczNDE-/uxworklog?oslc.select=createdate%2Cdescription%2Cdescription_longdescription%2Ccreateby%2Clogtype%2Cclientviewable%2Cworklogid%2Canywhererefid%2Cperson.displayname--displayname&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
        "totalCount": 2,
        "pagenum": 1
    }
};

export default worklogDS;
