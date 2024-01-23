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

let worLogItem = {
	member: [
		{
			_rowstamp: '2431665',
			createby: 'Sam Murphy',
			createdate: '2020-09-07T15:08:41+05:30',
			description: 'Test Comment',
			href: 'oslc/os/mxapiworklog/_MjM5',
			logtype: 'CLIENTNOTE'
		},
	],
	href: 'oslc/os/mxapiworklog',
	responseInfo: {
		schema: {
			$schema: 'http://json-schema.org/draft-04/schema#',
			resource: 'MXAPIWORKLOG',
			description: 'Maximo API for Worklog',
			pk: ['worklogid'],
			title: 'WORKLOG',
			type: 'object',
			$ref: 'oslc/jsonschemas/mxapiworklog',
			properties: {
				_rowstamp: {
					type: 'string',
				},
				logtype: {
					default: '!UPDATE!',
					searchType: 'WILDCARD',
					subType: 'UPPER',
					title: 'Type',
					persistent: true,
					type: 'string',
					hasList: true,
					remarks: 'Type of work log entry. Enter a value or click the Select Value button.',
					maxLength: 16,
					relation: 'WOWORKLOG'
				},
				createby: {
					searchType: 'WILDCARD',
					subType: 'ALN',
					title: 'Name',
					persistent: true,
					type: 'string',
					remarks:
						'A nick name or a friendly name that this person can be identified with.This field is automatically populated when values are entered in the First Name and/or Last Name fields.',
					maxLength: 62,
				},
				description_longdescription: {
					searchType: 'WILDCARD',
					subType: 'LONGALN',
					title: 'Details',
					type: 'string',
					remarks:
						'Long description of the work log. To check spelling of text you enter, click the Long Description button next to the Summary field.',
					maxLength: 32000,
				},
				localref: {
					type: 'string',
				},
				_imglibref: {
					type: 'string',
				},
				createdate: {
					searchType: 'EXACT',
					subType: 'DATETIME',
					title: 'Date',
					persistent: true,
					type: 'string',
					remarks: 'Date on which the work log entry was created.',
					maxLength: 10,
				},
				description: {
					searchType: 'WILDCARD',
					subType: 'ALN',
					title: 'Summary',
					persistent: true,
					type: 'string',
					remarks:
						'Short description of the work log entry. To enter or view additional information, click the Long Description button.',
					maxLength: 100,
				},
				href: {
					type: 'string',
				},
				_id: {
					type: 'string',
				},
				logtype_maxvalue: {
					type : 'string'
				},
				logtype_description: {
					type : 'string'
				}
			},
			required: ['createdate'],
		},
		totalPages: 1,
		href:
			'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA1OA--?ignorecollectionref=1&action=wsmethod%3AgetWorkLog&internalvalues=1&responseos=MXAPIWORKLOG&viewSR=false&lean=1&oslc.select=createdate%2Cdescription%2Cdescription_longdescription%2Cperson.displayname--createby&relativeuri=1&oslc.pageSize=100&collectioncount=1&addschema=1',
		totalCount: 1,
		pagenum: 1,
	},
};

export default worLogItem;
