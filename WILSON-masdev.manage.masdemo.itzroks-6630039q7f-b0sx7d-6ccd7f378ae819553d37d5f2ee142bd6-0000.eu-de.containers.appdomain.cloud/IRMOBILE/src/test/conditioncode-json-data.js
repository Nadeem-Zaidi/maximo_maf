let conditionitem = {
  member: [
    {
      itemnum: "11R22.5GS-5",
      _rowstamp: "110576",
      itemconditionid: 7,
      itemsetid: "SET1",
      href: "oslc/os/mxapiitemcondition/_MTEic3AiMzIvMTFSMjIuNUdTLTUvU0VUMQ--",
      conditioncode: "11/32",
    },
    {
      itemnum: "11R22.5GS-5",
      _rowstamp: "110575",
      itemconditionid: 6,
      itemsetid: "SET1",
      href: "oslc/os/mxapiitemcondition/_MTUic3AiMzIvMTFSMjIuNUdTLTUvU0VUMQ--",
      conditioncode: "15/32",
    },
    {
      itemnum: "11R22.5GS-5",
      _rowstamp: "110574",
      itemconditionid: 5,
      itemsetid: "SET1",
      href: "oslc/os/mxapiitemcondition/_OSJzcCIxNi8xMVIyMi41R1MtNS9TRVQx",
      conditioncode: "9/16",
    },
    {
      itemnum: "11R22.5GS-5",
      _rowstamp: "110577",
      itemconditionid: 8,
      itemsetid: "SET1",
      href: "oslc/os/mxapiitemcondition/_Q0FTSU5HLzExUjIyLjVHUy01L1NFVDE-",
      conditioncode: "CASING",
    },
  ],
  href: "oslc/os/mxapiitemcondition",
  responseInfo: {
    schema: {
      resource: "MXAPIITEMCONDITION",
      description: "OS for Condition",
      pk: ["itemnum", "conditioncode", "itemsetid"],
      title: "ITEMCONDITION",
      type: "object",
      $ref: "oslc/jsonschemas/mxapiitemcondition",
      properties: {
        itemnum: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Item ",
          persistent: true,
          type: "string",
          remarks: "Item associated with the condition code",
          maxLength: 30,
        },
        _rowstamp: {
          type: "string",
        },
        localref: {
          type: "string",
        },
        _imagelibref: {
          type: "string",
        },
        itemconditionid: {
          searchType: "EXACT",
          subType: "BIGINT",
          title: "ITEMCONDITIONID",
          persistent: true,
          type: "integer",
          remarks: "Unique Identifier",
          maxLength: 19,
        },
        itemsetid: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Set Identifier",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "Set identifier for the item.",
          maxLength: 8,
        },
        href: {
          type: "string",
        },
        _id: {
          type: "string",
        },
        conditioncode: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Condition Code",
          persistent: true,
          type: "string",
          hasList: true,
          remarks:
            'Condition code associated with the item. A condition code allows you to track the balance and value of each item. You can apply different rates to an item as its condition changes from use, such as from new to used. If you mark an item as condition enabled, you must assign at least one condition code to it. For each condition-enabled item, one condition code must have a ""full-value"" rate of 100%. Maximo uses this condition code as the reference point to calculate values for any other condition codes for this item. Each time the item is issued, transferred, or returned you specify the condition of the item based on codes you set up. Click the Detail Menu button to choose a condition code or go the Condition Codes application to create one.',
          maxLength: 30,
        },
      },
      required: ["conditioncode", "itemsetid"],
    },
    totalPages: 1,
    href: "oslc/os/mxapiitemcondition?oslc.select=conditioncode%2Citemnum%2Citemsetid%2Citemconditionid&oslc.pageSize=100&oslc.where=itemnum%3D%2211R22.5GS-5%22&searchAttributes=conditioncode&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    totalCount: 4,
    pagenum: 1,
  },
};

export default conditionitem;
