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

let assetLookupData = {
  member: [
    {
      assetuid: 210,
      status_description: "Operating",
      locationglaccount: "6220-300-???",
      description: "Windows XP Operating System",
      locationdesc: "Office #301",
      childcount: 0,
      status_maxvalue: "OPERATING",
      _rowstamp: "26981",
      assetnum: "1008",
      siteid: "BEDFORD",
      location: "OFF301",
      href: "oslc/os/mxapiasset/_MTAwOC9CRURGT1JE",
      status: "OPERATING",
      priority: 2,
      failurecode: "PUMPS",
      failurelist: [
        {
          failurecode: {
            description: "Packaging Line Failures"
          },
          failurelist: 1038
        }
      ]
    },
    {
      assetuid: 211,
      status_description: "Operating",
      locationglaccount: "6220-300-???",
      description: "Laser printer (local)",
      locationdesc: "Office #301",
      childcount: 0,
      status_maxvalue: "OPERATING",
      _rowstamp: "26982",
      assetnum: "1009",
      siteid: "BEDFORD",
      location: "OFF301",
      href: "oslc/os/mxapiasset/_MTAwOS9CRURGT1JE",
      status: "OPERATING",
    },
    {
      status_description: "Operating",
      type_maxvalue: "OPERATING",
      description: "Circulation Fan #1- Main Office HVAC",
      type: "OPERATING",
      orgid: "EAGLENA",
      status_maxvalue: "OPERATING",
      _rowstamp: "132588",
      glaccount: "6210-350-???",
      locationsid: 213,
      siteid: "BEDFORD",
      location: "BR210",
      locpriority: 3,
      failurecode: 'HVAC',
      href: "oslc/os/mxapioperloc/_QlIyMTAvQkVERk9SRA--",
      asset: [
        {
          assetnum: "11210",
          description: "Circulation Fan- Centrifugal/ 20/000 CFM",
          location: "BR210",
          priority: 4,
        },
        {
          assetnum: "11211",
          description: "Motor Starter- Size 2/440v/3ph/60cy",
          location: "BR210",
          priority: 3,
        },
      ],
      type_description: "Operating Location",
      status: "OPERATING",
      failurelist: [
        {
          failurecode: {
            description: "Packaging Line Failures"
          },
          failurelist: 1038
        }
      ]
    },
  ],
  href: "oslc/os/mxapiasset",
  responseInfo: {
    schema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      resource: "MXAPIASSET",
      description: "Maximo API for Asset",
      pk: ["siteid", "assetnum"],
      title: "ASSET",
      type: "object",
      $ref: "oslc/jsonschemas/mxapiasset",
      properties: {
        serviceaddress: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref: "oslc/jsonschemas/mxapiasset/serviceaddress",
              },
            },
            type: "object",
          },
          cardinality: "",
          relation: "SERVICEADDRESS",
        },
        serialnum: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Serial #",
          persistent: true,
          type: "string",
          remarks: "Asset Serial Number",
          maxLength: 64,
        },
        localref: {
          type: "string",
        },
        downtimereport: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref: "oslc/jsonschemas/mxapiasset/downtimereport",
              },
            },
            type: "object",
          },
          cardinality: "UNDEFINED",
          relation: "DOWNTIMEREPORT",
        },
        moddowntimehist: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref: "oslc/jsonschemas/mxapiasset/moddowntimehist",
              },
            },
            type: "object",
          },
          cardinality: "UNDEFINED",
          relation: "MODDOWNTIMEHIST",
        },
        locationglaccount: {
          searchType: "WILDCARD",
          subType: "GL",
          title: "GL Account",
          persistent: true,
          type: "string",
          remarks: "Default GL Account",
          maxLength: 23,
        },
        description: {
          searchType: "WILDCARD",
          subType: "ALN",
          title: "Description",
          persistent: true,
          type: "string",
          remarks:
            "Describes the asset. To enter or view additional information, click the Long Description button.",
          maxLength: 100,
        },
        locationdesc: {
          searchType: "WILDCARD",
          subType: "ALN",
          title: "Description",
          persistent: true,
          type: "string",
          remarks:
            "Describes the storeroom location. To enter or view additional information, click the Long Description button.",
          maxLength: 100,
        },
        status_maxvalue: {
          type: "string",
        },
        _rowstamp: {
          type: "string",
        },
        _imagelibref: {
          type: "string",
        },
        assetnum: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Asset",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "Asset Number",
          maxLength: 25,
        },
        assetspec: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref: "oslc/jsonschemas/mxapiasset/assetspec",
              },
            },
            type: "object",
          },
          cardinality: "UNDEFINED",
          relation: "ASSETSPECCLASS",
        },
        siteid: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Site",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "Site Identifier",
          maxLength: 8,
        },
        href: {
          type: "string",
        },
        doclinks: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref: "oslc/jsonschemas/mxapiasset/doclinks",
              },
            },
            type: "object",
          },
          cardinality: "UNDEFINED",
          relation: "DOCLINKS",
        },
        assetuid: {
          searchType: "EXACT",
          maximum: 2147483647,
          subType: "BIGINT",
          title: "ASSETUID",
          persistent: true,
          type: "integer",
          minimum: -2147483648,
          remarks: "Unique Identifier",
          maxLength: 11,
        },
        status_description: {
          type: "string",
        },
        assetmeter: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref: "oslc/jsonschemas/mxapiasset/assetmeter",
              },
            },
            type: "object",
          },
          cardinality: "UNDEFINED",
          relation: "INT_ASSETMETER",
        },
        priority: {
          isEsigEnabled: true,
          searchType: "EXACT",
          maximum: 2147483647,
          subType: "INTEGER",
          title: "Priority",
          persistent: true,
          type: "integer",
          minimum: -2147483648,
          remarks: "Asset Priority - copied to Work Order when entered.",
          maxLength: 11,
        },
        glaccount: {
          searchType: "WILDCARD",
          subType: "GL",
          title: "GL Account",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "GL Account Code for the Asset",
          maxLength: 23,
        },
        failurecode: {
          isEsigEnabled: true,
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Failure Class",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "Indicates Top Level Failure Hierarchy",
          maxLength: 8,
        },
        location: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Location",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "Asset Location",
          maxLength: 12,
        },
        _id: {
          type: "string",
        },
        status: {
          default: "!NOT READY!",
          searchType: "WILDCARD",
          subType: "ALN",
          title: "Status",
          persistent: true,
          type: "string",
          hasList: true,
          remarks:
            "Status of the asset, for example, not ready, operating, or decommissioned.",
          maxLength: 20,
        },
      },
      required: ["assetnum", "assetuid", "siteid"],
    },
    nextPage: {
      href:
        "oslc/os/mxapiasset?pageno=2&searchAttributes=assetnum%2Cdescription%2Csiteid%2Cpriority%2Clocation.description%2Cserialnum%2Clocation.glaccount&ignorecollectionref=1&savedQuery=MOBILEASSET&oslc.select=glaccount%2Cassetuid%2Cassetnum%2Cdescription%2Csiteid%2Cpriority%2Clocation%2Cfailurecode%2Clocation.description--locationdesc%2C_imagelibref%2Cserialnum%2Cassetchildren%2Cchildren._dbcount--childcount%2Cstatus%2Clocation.glaccount--locationglaccount%2Cchildren._dbcount--childcount&internalvalues=1&lean=1&relativeuri=1&oslc.pageSize=40&collectioncount=1",
    },
    totalPages: 6,
    href:
      "oslc/os/mxapiasset?oslc.select=glaccount%2Cassetuid%2Cassetnum%2Cdescription%2Csiteid%2Cpriority%2Clocation%2Cfailurecode%2Clocation.description--locationdesc%2C_imagelibref%2Cserialnum%2Cassetchildren%2Cchildren._dbcount--childcount%2Cstatus%2Clocation.glaccount--locationglaccount%2Cchildren._dbcount--childcount&oslc.pageSize=40&savedQuery=MOBILEASSET&searchAttributes=assetnum%2Cdescription%2Csiteid%2Cpriority%2Clocation.description%2Cserialnum%2Clocation.glaccount&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    totalCount: 218,
    pagenum: 1,
  },
};

export default assetLookupData;
