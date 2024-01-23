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

let worktype = {
	member: [{
		"_rowstamp": "327799",
		"wtypedesc": "Corrective Maintenance",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "CM",
		"href": "oslc/os/mxapiworktype/_MQ--",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA",
		"startstatus" : "APPR",
		"startstatus_maxvalue" : "APPR",
		"completestatus":"COMP",
		"completestatus_maxvalue" : "COMP",
	}, {
		"_rowstamp": "327800",
		"wtypedesc": "Emergency Maintenance",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "EM",
		"href": "oslc/os/mxapiworktype/_Mg--",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA",
		"startstatus" : "WMATL",
		"startstatus_maxvalue" : "WMATL",
		"completestatus":"COMP",
		"completestatus_maxvalue" : "COMP",
	}, {
		"_rowstamp": "327801",
		"wtypedesc": "Event Report",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "EV",
		"href": "oslc/os/mxapiworktype/_Mw--",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA"
	}, {
		"_rowstamp": "327802",
		"wtypedesc": "Preventive Maintenance",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "PM",
		"href": "oslc/os/mxapiworktype/_NA--",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA"
	}, {
		"_rowstamp": "327803",
		"wtypedesc": "Capital Project",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "CP",
		"href": "oslc/os/mxapiworktype/_NQ--",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA",
		"startstatus" : "WSCH",
		"startstatus_maxvalue" : "WSCH",
		"completestatus":"COMP",
		"completestatus_maxvalue" : "COMP",
	}, {
		"_rowstamp": "327814",
		"wtypedesc": "Calibration",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "CAL",
		"href": "oslc/os/mxapiworktype/_MTk-",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA"
	}, {
		"_rowstamp": "327815",
		"wtypedesc": "Calibration",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "PMCAL",
		"href": "oslc/os/mxapiworktype/_MjM-",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA"
	}, {
		"_rowstamp": "327816",
		"wtypedesc": "Calibration",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "EMCAL",
		"href": "oslc/os/mxapiworktype/_Mjc-",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA"
	}, {
		"_rowstamp": "327817",
		"wtypedesc": "Calibration",
		"woclass": "WORKORDER",
		"woclass_maxvalue": "WORKORDER",
		"worktype": "CMCAL",
		"href": "oslc/os/mxapiworktype/_MzE-",
		"woclass_description": "Work Order",
		"orgid": "EAGLENA"
	}],
	"href": "oslc/os/mxapiworktype",
	"responseInfo": {
		"schema": {
			"$schema": "http://json-schema.org/draft-04/schema#",
			"resource": "MXAPIWORKTYPE",
			"description": "Work Type",
			"pk": ["worktypeid"],
			"title": "WORKTYPE",
			"type": "object",
			"$ref": "oslc/jsonschemas/mxapiworktype",
			"properties": {
				"_rowstamp": {
					"type": "string"
				},
				"localref": {
					"type": "string"
				},
				"wtypedesc": {
					"searchType": "WILDCARD",
					"subType": "ALN",
					"title": "Description",
					"persistent": true,
					"type": "string",
					"remarks": "Describes the work order's type. To enter or view additional information, click the Long Description button.",
					"maxLength": 50
				},
				"woclass": {
					"searchType": "WILDCARD",
					"subType": "UPPER",
					"title": "Work Order Class",
					"persistent": true,
					"type": "string",
					"hasList": true,
					"remarks": "Class of the work order whose type you are defining, for example, activity, change, release, or work order.",
					"maxLength": 16
				},
				"_imagelibref": {
					"type": "string"
				},
				"woclass_maxvalue": {
					"type": "string"
				},
				"worktype": {
					"searchType": "WILDCARD",
					"subType": "UPPER",
					"title": "Work Type",
					"persistent": true,
					"type": "string",
					"remarks": "Defines the type for the selected class of work order. For example, for a release, work types are significant, major, or minor. For a change, work types are delta, full, or package. For a work order, work types are corrective maintenance, capital project, emergency maintenance, event report, and preventive maintenance. You also can define work types for any of work order class. For each type, you can set prompt information.",
					"maxLength": 5
				},
				"href": {
					"type": "string"
				},
				"_id": {
					"type": "string"
				},
				"woclass_description": {
					"type": "string"
				},
				"orgid": {
					"searchType": "WILDCARD",
					"subType": "UPPER",
					"title": "Organization",
					"persistent": true,
					"type": "string",
					"remarks": "Organization Identifier",
					"maxLength": 8
				}
			},
			"required": ["orgid", "woclass", "worktype"]
		},
		"totalPages": 1,
		"href": "oslc/os/mxapiworktype?oslc.select=worktype%2Cwtypedesc%2Cwoclass%2Corgid&oslc.pageSize=100&oslc.where=woclass%3D%22WORKORDER%22%20and%20orgid%3D%22%25EAGLENA%25%22&searchAttributes=wtypedesc%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
		"totalCount": 9,
		"pagenum": 1
	}
}

export default worktype;
