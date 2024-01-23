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

let workorderitem = {
	member: [
		{
			wonum: '1003',
			wptool: [
				{
					itemnum: 'LATHE',
					itemqty: 1,
					hours: 5,
          description: 'MACHINE TOOL LATHE',
					location: {},
					wpitemid: 381
        },
        {
					itemnum: 'LATHE2',
					itemqty: 1,
					hours: 5,
          location: {
            description: "Central Storeroom",
            location: "CENTRAL"
					},
					wpitemid: 382
        },
        {
					itemqty: 1,
          hours: 5,
          description: 'MACHINE TOOL LATHE',
          location: {
            description: "Central Storeroom",
            location: "CENTRAL"
					},
					wpitemid: 383
				}
			],
			wpmaterial: [
				{
					itemnum: '0-0031',
					itemqty: 1,
					hours: 5,
          description: 'MACHINE TOOL LATHE',
          location: {
            description: "Central Storeroom",
            location: "CENTRAL"
					},
					wpitemid: 378
        },
        {
					description: 'MACHINE TOOL LATHE2',
					itemqty: 1,
					hours: 5,
          location: {
            description: "Central Storeroom",
            location: "CENTRAL"
					},
					wpitemid: 379
        },
        {
					itemnum: '0-0032',
					itemqty: 1,
					hours: 5,
          location: {
            description: "Central Storeroom",
            location: "CENTRAL"
					},
					wpitemid: 380
				}
			],
			description: 'Check for Plumbing Problem',
		}
	],
	href: 'oslc/os/mxapiwodetail',
	responseInfo: {
		schema: {
			$schema: 'http://json-schema.org/draft-04/schema#',
			resource: 'MXAPIWODETAIL',
			description: 'WORKORDER',
			pk: ['siteid', 'wonum'],
			title: 'WORKORDER',
			type: 'object',
			$ref: 'http://localhost/maximo/oslc/jsonschemas/mxapiwodetail',
			properties: {
				wonum: {
					default: '&AUTOKEY&',
					searchType: 'WILDCARD',
					subType: 'UPPER',
					title: 'Work Order',
					persistent: true,
					type: 'string',
					hasList: true,
					remarks: 'Identifies the work order.',
					maxLength: 25,
				},
				title: {
					type: 'string',
				},
				description: {
					type: 'string',
				},
				problem_code: {
					type: 'string',
				},
				failure_class: {
					type: 'string',
				},
				status: {
					type: 'string',
				},
				date: {
					type: 'string',
				},

				wpmaterial: {
					type: 'array',
					items: {
						definition: {
							subSchema: {
								$ref: 'http://localhost/maximo/oslc/jsonschemas/mxapiwodetail/wpmaterial',
							},
						},
						type: 'object',
					},
					cardinality: 'MULTIPLE',
					relation: 'SHOWPLANMATERIAL',
				},
				wptool: {
					type: 'array',
					items: {
						definition: {
							subSchema: {
								$ref: 'http://localhost/maximo/oslc/jsonschemas/mxapiwodetail/wptool',
							},
						},
						type: 'object',
					},
					cardinality: 'MULTIPLE',
					relation: 'SHOWPLANTOOL',
				},
				toolcount: {
					type: 'number',
				},
				hideStartButton: {
					type: 'bool',
				},
			},
		},
	},
};

export default workorderitem;
