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

let wpEditSettings = {
        member: [
          {
            _rowstamp: '330990',
            editasset: true,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVOQS9XQVBQUg--',
            editloc: true,
            orgid: 'EAGLENA',
            status: 'WAPPR'
          },
          {
            _rowstamp: '330991',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVOQS9XTUFUTA--',
            editloc: false,
            orgid: 'EAGLENA',
            status: 'WMATL'
          },
          {
            _rowstamp: '330992',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVOQS9XU0NI',
            editloc: false,
            orgid: 'EAGLENA',
            status: 'WSCH'
          },
          {
            _rowstamp: '330993',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVOQS9DT01Q',
            editloc: false,
            orgid: 'EAGLENA',
            status: 'COMP'
          },
          {
            _rowstamp: '330994',
            editasset: true,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVOQS9BUFBS',
            editloc: true,
            orgid: 'EAGLENA',
            status: 'APPR'
          },
          {
            _rowstamp: '330995',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVOQS9JTlBSRw--',
            editloc: false,
            orgid: 'EAGLENA',
            status: 'INPRG'
          },          {
            _rowstamp: '330996',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVTQS9XU0NI',
            editloc: false,
            orgid: 'EAGLESA',
            status: 'WSCH'
          },
          {
            _rowstamp: '330997',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVTQS9XTUFUTA--',
            editloc: false,
            orgid: 'EAGLESA',
            status: 'WMATL'
          },
          {
            _rowstamp: '330998',
            editasset: true,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVTQS9XQVBQUg--',
            editloc: true,
            orgid: 'EAGLESA',
            status: 'WAPPR'
          },
          {
            _rowstamp: '330999',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVTQS9JTlBSRw--',
            editloc: false,
            orgid: 'EAGLESA',
            status: 'INPRG'
          },
          {
            _rowstamp: '331000',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVTQS9DT01Q',
            editloc: false,
            orgid: 'EAGLESA',
            status: 'COMP'
          },
          {
            _rowstamp: '331001',
            editasset: true,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVTQS9BUFBS',
            editloc: true,
            orgid: 'EAGLESA',
            status: 'APPR'
          },
          {
            _rowstamp: '331002',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVVSy9XU0NI',
            editloc: false,
            orgid: 'EAGLEUK',
            status: 'WSCH'
          },
          {
            _rowstamp: '331003',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVVSy9XTUFUTA--',
            editloc: false,
            orgid: 'EAGLEUK',
            status: 'WMATL'
          },
          {
            _rowstamp: '331004',
            editasset: true,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVVSy9XQVBQUg--',
            editloc: true,
            orgid: 'EAGLEUK',
            status: 'WAPPR'
          },
          {
            _rowstamp: '331005',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVVSy9JTlBSRw--',
            editloc: false,
            orgid: 'EAGLEUK',
            status: 'INPRG'
          },
          {
            _rowstamp: '331006',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVVSy9DT01Q',
            editloc: false,
            orgid: 'EAGLEUK',
            status: 'COMP'
          },
          {
            _rowstamp: '331007',
            editasset: false,
            href: 'oslc/os/mxapiwpeditsetting/_RUFHTEVVSy9BUFBS',
            editloc: false,
            orgid: 'EAGLEUK',
            status: 'APPR'
          }
        ],
        href: 'oslc/os/mxapiwpeditsetting',
        responseInfo: {
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            resource: 'MXAPIWPEDITSETTING',
            description: 'Maximo API for WP Edit Settings',
            pk: [
              'orgid',
              'status'
            ],
            title: 'WPEDITSETTING',
            type: 'object',
            $ref: 'oslc/jsonschemas/mxapiwpeditsetting',
            properties: {
              _rowstamp: {
                type: 'string'
              },
              localref: {
                type: 'string'
              },
              editasset: {
                searchType: 'EXACT',
                subType: 'YORN',
                title: 'Asset',
                persistent: true,
                type: 'boolean',
                remarks: 'Specifies whether the asset can be edited when the work order is in the selected status. If the check box is selected, you can edit the work orders asset. If the check box is cleared, you cannot edit the work orders asset.'
              },
              _imagelibref: {
                type: 'string'
              },
              href: {
                type: 'string'
              },
              _id: {
                type: 'string'
              },
              editloc: {
                searchType: 'EXACT',
                subType: 'YORN',
                title: 'Location',
                persistent: true,
                type: 'boolean',
                remarks: 'Specifies whether the location can be edited when the work order is in the selected status. If the check box is selected, you can edit the work orders location. If the check box is cleared, you cannot edit the work orders location.'
              },
              orgid: {
                searchType: 'WILDCARD',
                subType: 'UPPER',
                title: 'Organization',
                persistent: true,
                type: 'string',
                remarks: 'Organization Identifier',
                maxLength: 8
              },
              status: {
                searchType: 'WILDCARD',
                subType: 'UPPER',
                title: 'Status',
                persistent: true,
                type: 'string',
                remarks: 'Status at which fields are editable. For each field in the row, select the check box to make the field editable when the work order is at the indicated status level. Clear the check box for each field to disable editing at that status level.',
                maxLength: 8
              }
            },
            required: [
              'editasset',
              'editloc',
              'orgid',
              'status'
            ]
          },
          totalPages: 1,
          href: 'oslc/os/mxapiwpeditsetting?oslc.select=orgid%2Cstatus%2Ceditasset%2Ceditloc&oslc.pageSize=40&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1',
          totalCount: 18,
          pagenum: 1
        }
	};

export default wpEditSettings;
