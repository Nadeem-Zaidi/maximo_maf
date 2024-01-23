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
      _rowstamp: "22801400",
      workorderid: 774,
      locationnum: 'OFF301',
      problem: {
        description: "Lift and Filling System",
        failurelist: {
          failurelist: 1005,
        },
      },
      failurecode: "PKG",
      failurereport: [
        {
          _rowstamp: "22801401",
          type_maxvalue: "PROBLEM",
          localref:
            "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA2Ng--/uxshowfailurereport/0-5521",
          failurecode: {
            description: "Lift and Filling System",
          },
          linenum: 1005,
          $alias_this_attr$failurecode: "LIFT",
          href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNTUyMQ--",
          type: "PROBLEM",
          type_description: "Problem",
        },
        {
          _rowstamp: "22801404",
          type_maxvalue: "CAUSE",
          localref:
            "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA2Ng--/uxshowfailurereport/1-5522",
          failurecode: {
            description: "Carton Spillage",
          },
          linenum: 1011,
          $alias_this_attr$failurecode: "SPILL",
          href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNTUyMg--",
          type: "CAUSE",
          type_description: "Cause",
        },
        {
          _rowstamp: "22801405",
          type_maxvalue: "REMEDY",
          localref:
            "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA2Ng--/uxshowfailurereport/2-5523",
          failurecode: {
            description: "Adjusted Timing of Lifter",
          },
          linenum: 1015,
          $alias_this_attr$failurecode: "TIMING",
          href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNTUyMw--",
          type: "REMEDY",
          type_description: "Remedy",
        },
      ],
      failure: {
        description: "Packaging Line Failures",
        failurelist: {
          failurelist: 1038,
        },
      },
      problemcode: "LIFT",
      href: "oslc/os/mxapiwodetail/_QkVERk9SRC8zMDA2Ng--",
      wonum: "1001",
      doclinkscount: "1001",
      assetnum: "1007",
      status: "APPR",
      status_maxvalue: "APPR",
      allowedstates: {
        COMP: [
          {
            defaults: true,
            description: "Completed",
            value: "COMP",
            maxvalue: "COMP",
          },
        ],
        INPRG: [
          {
            defaults: true,
            description: "Inprogress",
            value: "INPRG",
            maxvalue: "INPRG",
          },
        ],
      },
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      remarkdesc: "Lift and Filling System Remarks",
    },
  ],
  href: "oslc/os/mxapiwodetail",
  responseInfo: {
    schema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      resource: "MXAPIWODETAIL",
      description: "Maximo API for Work Orders with Plans and Reservations",
      pk: ["siteid", "wonum"],
      title: "WORKORDER",
      type: "object",
      $ref: "oslc/jsonschemas/mxapiwodetail",
      properties: {
        wonum: {
          default: "&AUTOKEY&",
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Work Order",
          persistent: true,
          type: "string",
          hasList: true,
          remarks: "Identifies the work order.",
          maxLength: 25,
        },
        remarkdesc: {
          hasList: true,
          id: "w4w33",
          maxLength: 30,
          name: "remarkdesc",
          remarks: "A comment about the reported failure.",
          searchType: "NONE",
          subType: "ALN",
          title: "Remarks",
          type: "string",
        },
        problem_code: {
          type: "string",
        },
        failure_class: {
          type: "string",
        },
        status: {
          type: "string",
        },
        date: {
          type: "string",
        },
        wpmaterial: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref:
                  "http://localhost/maximo/oslc/jsonschemas/mxapiwodetail/wpmaterial",
              },
            },
            type: "object",
          },
          cardinality: "MULTIPLE",
          relation: "SHOWPLANMATERIAL",
        },
        wptool: {
          type: "array",
          items: {
            definition: {
              subSchema: {
                $ref:
                  "http://localhost/maximo/oslc/jsonschemas/mxapiwodetail/wptool",
              },
            },
            type: "object",
          },
          cardinality: "MULTIPLE",
          relation: "SHOWPLANTOOL",
        },
        toolcount: {
          type: "number",
        },
        hidewostartbutton: {
          type: "bool",
        },
      },
    },
  },
};

export default workorderitem;
