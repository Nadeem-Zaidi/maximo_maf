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

let downTimeCode = {
	member: [
		{
			_rowstamp: '899598',
			valueid: 'DOWNCODE|ADJUST',
			description: 'Adjust',
			href: 'oslc/os/mxapialndomain/_RE9XTkNPREUvfk5VTEx_L35OVUxMfi9BREpVU1Q-',
			value: 'ADJUST',
			domainid: 'DOWNCODE',
		},
		{
			_rowstamp: '899596',
			valueid: 'DOWNCODE|BRKDWN',
			description: 'Breakdown',
			href: 'oslc/os/mxapialndomain/_RE9XTkNPREUvfk5VTEx_L35OVUxMfi9CUktEV04-',
			value: 'BRKDWN',
			domainid: 'DOWNCODE',
		},
		{
			_rowstamp: '899599',
			valueid: 'DOWNCODE|MINRSTOP',
			description: 'Minor Stop',
			href: 'oslc/os/mxapialndomain/_RE9XTkNPREUvfk5VTEx_L35OVUxMfi9NSU5SU1RPUA--',
			value: 'MINRSTOP',
			domainid: 'DOWNCODE',
		},
		{
			_rowstamp: '899597',
			valueid: 'DOWNCODE|SETUP',
			description: 'Setup',
			href: 'oslc/os/mxapialndomain/_RE9XTkNPREUvfk5VTEx_L35OVUxMfi9TRVRVUA--',
			value: 'SETUP',
			domainid: 'DOWNCODE',
		},
	],
	href: 'oslc/os/mxapialndomain',
	responseInfo: {
		totalPages: 1,
		href:
			'oslc/os/mxapialndomain?oslc.select=value%2Cvalueid%2Cdescription%2Cdomainid%2Csiteid%2Corgid&oslc.pageSize=100&oslc.where=domainid%3D%22DOWNCODE%22&searchAttributes=domainid&collectioncount=1&ignorecollectionref=1&relativeuri=1&lean=1&internalvalues=1',
		totalCount: 4,
		pagenum: 1,
		schema: {
			$schema: 'http://json-schema.org/draft-04/schema#',
			resource: 'MXAPIALNDOMAIN',
			description: 'Maximo API for Alndomain',
			pk: ['domainid', 'value', 'siteid', 'orgid'],
			title: 'ALNDOMAIN',
			type: 'object',
			$ref: 'oslc/jsonschemas/mxapialndomain',
			properties: {
				_rowstamp: {
					type: 'string',
				},
				valueid: {
					searchType: 'EXACT',
					subType: 'ALN',
					title: 'Value ID',
					persistent: true,
					type: 'string',
					remarks:
						'System generated unique identifier of the value in a domain, internal and cannot be modified.',
					maxLength: 300,
				},
				localref: {
					type: 'string',
				},
				_imagelibref: {
					type: 'string',
				},
				description: {
					searchType: 'WILDCARD',
					subType: 'ALN',
					title: 'Description',
					persistent: true,
					type: 'string',
					remarks: 'Value description',
					maxLength: 100,
				},
				siteid: {
					searchType: 'WILDCARD',
					subType: 'UPPER',
					title: 'Site',
					persistent: true,
					type: 'string',
					hasList: true,
					remarks: 'Identifier of the site for which the value is specified',
					maxLength: 8,
				},
				href: {
					type: 'string',
				},
				_id: {
					type: 'string',
				},
				value: {
					searchType: 'WILDCARD',
					subType: 'ALN',
					title: 'Value',
					persistent: true,
					type: 'string',
					remarks: 'Value of the domain',
					maxLength: 254,
				},
				domainid: {
					searchType: 'WILDCARD',
					subType: 'UPPER',
					title: 'Domain',
					persistent: true,
					type: 'string',
					remarks: 'Identifier of the domain',
					maxLength: 18,
				},
				orgid: {
					searchType: 'WILDCARD',
					subType: 'UPPER',
					title: 'Organization',
					persistent: true,
					type: 'string',
					hasList: true,
					remarks: 'Identifier of the organization for which the value is specified',
					maxLength: 8,
				},
			},
			required: ['domainid', 'value', 'valueid'],
		},
	},
};

export default downTimeCode;
