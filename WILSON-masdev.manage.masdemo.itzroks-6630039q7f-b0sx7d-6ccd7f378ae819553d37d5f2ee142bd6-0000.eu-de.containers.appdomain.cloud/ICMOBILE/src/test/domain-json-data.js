/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
let domainitem = {
  member: [
    {
      _rowstamp: '923488',
      valueid: 'COUNTBOOKSTATUS|APPR',
      maxvalue: 'APPR',
      defaults: true,
      description: 'Approved',
      href:
        'oslc/os/mxapisynonymdomain/_SU5TUFJFU1VMVFNUQVRVUy9DQU4vfk5VTEx_L35OVUxMfi9DQU4-',
      value: 'APPR',
      domainid: 'COUNTBOOKSTATUS'
    },
    {
      _rowstamp: '482589',
      valueid: 'COUNTBOOKSTATUS|COMP',
      maxvalue: 'COMPLETED',
      defaults: true,
      description: 'Completed',
      href:
        'oslc/os/mxapisynonymdomain/_SU5TUFJFU1VMVFNUQVRVUy9DT01QTEVURUQvfk5VTEx_L35OVUxMfi9DT01QTEVURUQ-',
      value: 'COMPLETED',
      domainid: 'COUNTBOOKSTATUS'
    },
    {
      _rowstamp: '482588',
      valueid: 'COUNTBOOKSTATUS|INPROG',
      maxvalue: 'INPROG',
      defaults: true,
      description: 'In Progress',
      href:
        'oslc/os/mxapisynonymdomain/_SU5TUFJFU1VMVFNUQVRVUy9JTlBST0cvfk5VTEx_L35OVUxMfi9JTlBST0c-',
      value: 'INPROG',
      domainid: 'COUNTBOOKSTATUS'
    }
  ],
  href: 'oslc/os/mxapisynonymdomain',
  responseInfo: {
    schema: {
      $schema: 'http://json-schema.org/draft-04/schema#',
      resource: 'MXAPISYNONYMDOMAIN',
      description: 'Maximo API for Synonymdomain',
      pk: ['domainid', 'maxvalue', 'value', 'siteid', 'orgid'],
      title: 'SYNONYMDOMAIN',
      type: 'object',
      $ref: 'oslc/jsonschemas/mxapisynonymdomain',
      properties: {
        valueid: {
          searchType: 'EXACT',
          subType: 'ALN',
          title: 'Value ID',
          persistent: true,
          type: 'string',
          remarks:
            'System generated unique identifier of the value in a domain, internal and cannot be modified.',
          maxLength: 256
        },
        maxvalue: {
          searchType: 'WILDCARD',
          subType: 'ALN',
          title: 'Internal Value',
          persistent: true,
          type: 'string',
          remarks: 'Internal maximo value',
          maxLength: 50
        },
        localref: {
          type: 'string'
        },
        description: {
          searchType: 'WILDCARD',
          subType: 'ALN',
          title: 'Description',
          persistent: true,
          type: 'string',
          remarks: 'Description of the value',
          maxLength: 256
        },
        domainid: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Domain',
          persistent: true,
          type: 'string',
          remarks: 'Identifier of the domain',
          maxLength: 18
        },
        orgid: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Organization',
          persistent: true,
          type: 'string',
          hasList: true,
          remarks:
            'Identifier of the org for which the domain value is specified',
          maxLength: 8
        },
        _rowstamp: {
          type: 'string'
        },
        defaults: {
          default: false,
          searchType: 'EXACT',
          subType: 'YORN',
          title: 'Default',
          persistent: true,
          type: 'boolean',
          remarks: 'Is This The Default Value? (Y or N)'
        },
        _imagelibref: {
          type: 'string'
        },
        siteid: {
          searchType: 'WILDCARD',
          subType: 'UPPER',
          title: 'Site',
          persistent: true,
          type: 'string',
          hasList: true,
          remarks:
            'Identifier of the site for which the domain value is specified',
          maxLength: 8
        },
        href: {
          type: 'string'
        },
        _id: {
          type: 'string'
        },
        value: {
          searchType: 'WILDCARD',
          subType: 'ALN',
          title: 'Value',
          persistent: true,
          type: 'string',
          remarks: 'Synonym value',
          maxLength: 50
        }
      },
      required: ['defaults', 'domainid', 'maxvalue', 'value', 'valueid']
    },
    totalPages: 1,
    href:
      'oslc/os/mxapisynonymdomain?oslc.select=value%2Cmaxvalue%2Cdescription%2Cdomainid%2Cvalueid%2Csiteid%2Corgid%2Cdefaults&oslc.pageSize=40&oslc.where=domainid%20in%20%5B%22COUNTBOOKSTATUS%22%5D%20and%20domainid%3D%22COUNTBOOKSTATUS%22&searchAttributes=maxvalue%2Cdomainid%2Cvalueid%2Csiteid%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1',
    totalCount: 4,
    pagenum: 1
  }
};

export default domainitem;
