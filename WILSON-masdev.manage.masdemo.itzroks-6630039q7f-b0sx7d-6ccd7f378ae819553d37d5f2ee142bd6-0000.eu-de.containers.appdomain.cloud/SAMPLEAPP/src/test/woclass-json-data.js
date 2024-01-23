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

let woclassitem = {
	member: [
    {
      _rowstamp: '14303857',
      domainid: "WOCLASS",
      description: 'WORKORDER',
      value: 'WORKORDER',
      maxvalue: 'WORKORDER',
      orgid: 'EAGLENA',
      siteid: 'BEDFORD',      
      defaults: true
    }
  ],
  responseInfo: {schema:{
    href:
      'oslc/os/mxapidomain/_V09TVEFUVVM-/synonymdomain?oslc.select=value%2Cdescription&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1',
    $ref: 'oslc/jsonschemas/mxapidomain/synonymdomain',
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'MAXDOMAIN/SYNONYMDOMAIN',
    pk: ['domainid', 'maxvalue', 'value', 'siteid', 'orgid'],
    properties: {
      description: {
        searchType: 'WILDCARD',
        subType: 'ALN',
        title: 'Description',
        persistent: true,
        type: 'string'
      },
      href: {type: 'string'},
      localref: {type: 'string'},
      value: {
        searchType: 'WILDCARD',
        subType: 'ALN',
        title: 'Value',
        persistent: true,
        type: 'string'
      },
      maxvalue: {
        searchType: 'WILDCARD',
        subType: 'ALN',
        title: 'Value',
        persistent: true,
        type: 'string'
      },
      _imglibref: {type: 'string'},
      _rowstamp: {type: 'string'}
    },
    required: ['value'],
    resource: 'MXAPIDOMAIN',
    title: 'MAXDOMAIN/SYNONYMDOMAIN',
    type: 'object'
  }}
};

export default woclassitem;
