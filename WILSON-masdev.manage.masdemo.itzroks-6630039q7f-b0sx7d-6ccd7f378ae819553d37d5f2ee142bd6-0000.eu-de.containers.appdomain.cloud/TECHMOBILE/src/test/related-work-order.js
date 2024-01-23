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
      _rowstamp: "738138",
      relatetype_description: "Follow-up record",
      localref: "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/relatedrecord/0-331",
      relatedrecwo: {
        description: "Test Work order for Labor Transaction Amit 2",
      },
      relatedreckey: "1202",
      href: "http://childkey#V09SS09SREVSL1JFTEFURURSRUNPUkQvMzMx",
    },
  ],
  href: "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/relatedrecord",
  responseInfo: {
    schema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      resource: "MXAPIWODETAIL",
      description: "WORKORDER/RELATEDRECORD",
      pk: ["relatedrecordid"],
      title: "WORKORDER/RELATEDRECORD",
      type: "object",
      $ref: "oslc/jsonschemas/mxapiwodetail/relatedrecord",
      properties: {
        _rowstamp: {
          type: "string",
        },
        localref: {
          type: "string",
        },
        _imglibref: {
          type: "string",
        },
        relatedrecwo: {
          type: "object",
          properties: {
            description: {
              searchType: "TEXT",
              subType: "ALN",
              title: "Description",
              persistent: true,
              type: "string",
              remarks:
                "Describes the work order. To enter or view additional information, click the Long Description button.",
              maxLength: 100,
            },
          },
        },
        relatedreckey: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Related Record Key",
          persistent: true,
          type: "string",
          hasList: true,
          remarks:
            "Identifies the related ticket. Enter a value or click the Detail Menu button to select an option and retrieve a value.",
          maxLength: 10,
          relation: "RELATEDRECORD",
        },
        href: {
          type: "string",
        },
        _id: {
          type: "string",
        },
      },
      required: ["relatedreckey"],
    },
    totalPages: 1,
    href:
      "http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/relatedrecord?oslc.select=relatedreckey%2Crelatedrecwo.description%2Ccache.SYNDATA%3A_RELATETYPE_-relatetype&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    totalCount: 1,
    pagenum: 1,
  },
};

export default worLogItem;
