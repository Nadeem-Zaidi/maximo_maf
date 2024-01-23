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

let servicerequestitem = {
    member: [
      {
        ticketid: '1000',
        description: 'Centrifugal Pump Oil Change',
        description_longdescription: 'Long description for Centrifugal Pump Oil Change',
		location: 'OFF303',
        location_longdescription: 'Long description for Office 303',
		assetnum: 'ASSET1',
		asset_description: 'Asset 1',
        siteid: 'BEDFORD',
        status: 'NEW',
        status_description: 'New',
        reportedpriority: 2,
        reportedpriority_description: 'High',
        reportdate: '2020-07-29T12:25:26-04:00',
		relatedwo: null
      },
      {
        ticketid: '1001',
        description: 'Different Pump Valve Change',
        description_longdescription: 'Long description for Different Pump Valve Change',
		location: 'OFF304',
        location_longdescription: 'Long description for Office 304',
		assetnum: 'ASSET12',
		asset_description: 'Asset 12',
        siteid: 'BEDFORD',
        status: 'NEW',
        status_description: 'New',
        reportedpriority: 2,
        reportedpriority_description: 'High',
        reportdate: '2020-08-29T12:25:26-04:00',
		relatedwo: null
	  },
      {
        ticketid: '1002',
        description: 'Yet Another Pump to Replace',
        description_longdescription: 'Long description for Yet Another Pump to Replace',
		location: 'OFF305',
        location_longdescription: 'Long description for Office 305',
		assetnum: 'ASSET123',
		asset_description: 'Asset 123',
        siteid: 'BEDFORD',
        status: 'CLOSED',
        status_description: 'Closed',
        reportedpriority: 4,
        reportedpriority_description: 'Low',
        reportdate: '2020-09-29T12:25:26-04:00',
		    relatedwoexists: true
	  }
	],
    href: 'oslc/os/mxapisr',
    responseInfo: {

    schema: {
      $schema: 'http://json-schema.org/draft-04/schema#',
      resource: 'MXAPISR',
      description: 'SR',
      pk: ['ticketid', 'siteid'],
      title: 'SR',
      type: 'object',
      $ref: 'http://localhost/maximo/oslc/jsonschemas/mxapisr',
      properties: {
        ticketid: {
          default: '&AUTOKEY&',
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Ticket Id',
          persistent: true,
          type: 'string',
          hasList: true,
          remarks: 'Identifies the Ticket.',
          maxLength: 25
        },
        description: {
          type: 'string'
        },
        description_longdescription: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        location_longdescription: {
          type: 'string'
        },
        assetnum: {
          type: 'string'
        },
        asset_description: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        status_description: {
          type: 'string'
        },
        reportedpriority: {
          type: 'number'
        },
        reportedpriority_description: {
          type: 'string'
        },
        reportdate: {
          type: 'string'
        }      
	  }
    }
  
    },
  };
  
  export default servicerequestitem;
  
