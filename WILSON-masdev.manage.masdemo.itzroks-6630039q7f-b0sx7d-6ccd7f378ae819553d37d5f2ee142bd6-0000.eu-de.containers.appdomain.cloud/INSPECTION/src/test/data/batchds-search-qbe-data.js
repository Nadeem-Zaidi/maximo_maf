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

const batchDsSearchQbe =  [
  {
    parent: "1208",
    historyflag: false,
    resultnum: "1062",
    createdate: "2022-09-09T11:41:29-03:00",
    status_maxvalue: "PENDING",
    totalquestion: 1,
    allowedactions: {
      countnewnotf: {
        requestqueryparams: {
          notfosname: {
            default: "MXNOTIFICATION",
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      sigopgranted: {
        requestqueryparams: {
          app: {
            type: "string"
          },
          optionname: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      statuslist: {
        httpmethod: "GET",
        type: "system"
      },
      notify: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for notify action",
          type: "object",
          properties: {
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      snoozefromquery: {
        httpmethod: "POST",
        type: "system"
      },
      discardedit: {
        httpmethod: "POST",
        type: "system"
      },
      importfile: {
        httpmethod: "POST",
        type: "system"
      },
      unsubscribe: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for subscribe action",
          type: "object",
          properties: {
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      logapiaccess: {
        httpmethod: "POST",
        type: "system"
      },
      markasread: {
        httpmethod: "POST",
        type: "system"
      },
      lock: {
        httpmethod: "POST",
        type: "system"
      },
      removebookmark: {
        httpmethod: "POST",
        type: "system"
      },
      snooze: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for snooze action",
          type: "object",
          properties: {
            snoozetime: {
              default: 30,
              type: "integer"
            },
            snoozeunit: {
              type: "string"
            },
            snoozetillcondition: {
              type: "string"
            },
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      genreport: {
        requestqueryparams: {
          attachments: {
            default: false,
            type: "boolean",
            required: true
          },
          reportname: {
            type: "string",
            required: true
          },
          reportformat: {
            default: "pdf",
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      getlist: {
        requestqueryparams: {
          attribute: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      removefrommemory: {
        httpmethod: "POST",
        type: "system"
      },
      subscribe: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for subscribe action",
          type: "object",
          properties: {
            usernotftype: {
              type: "string"
            },
            pushuritemplate: {
              type: "string"
            },
            pushtag: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            pushtitle: {
              type: "string"
            },
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      candelete: {
        httpmethod: "GET",
        type: "system"
      },
      dismiss: {
        httpmethod: "POST",
        type: "system"
      },
      updateimage: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema if content-type = application/json",
          type: "object",
          properties: {
            imguri: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            mimetype: {
              type: "string"
            }
          }
        }
      },
      isesigneeded: {
        requestqueryparams: {
          optionname: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      islocked: {
        httpmethod: "GET",
        type: "system"
      },
      duplicate: {
        httpmethod: "GET",
        type: "system"
      },
      canadd: {
        httpmethod: "GET",
        type: "system"
      },
      addfromdoclib: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema if content-type = application/json",
          type: "object",
          properties: {
            imguri: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            mimetype: {
              type: "string"
            }
          }
        }
      },
      verifyesig: {
        httpmethod: "GET",
        type: "system"
      },
      bookmark: {
        httpmethod: "POST",
        type: "system"
      },
      logesig: {
        httpmethod: "POST",
        type: "system"
      },
      islockedbyme: {
        httpmethod: "GET",
        type: "system"
      },
      addimage: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema if content-type = application/json",
          type: "object",
          properties: {
            imguri: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            mimetype: {
              type: "string"
            }
          }
        }
      },
      activewfinstances: {
        httpmethod: "GET",
        type: "system"
      },
      deleteimage: {
        httpmethod: "POST",
        type: "system"
      },
      notifications: {
        requestqueryparams: {
          notfosname: {
            default: "MXNOTIFICATION",
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      listreports: {
        httpmethod: "GET",
        type: "system"
      }
    },
    _rowstamp: "2154757",
    assets: [
      {
        assetnum: "26000",
        description: "Motor Controlled Valve"
      }
    ],
    assetnumalias: "26000",
    inspectionform: {
      inspectionformid: 43,
      name: "GRAPHITE-52080",
      hasrequiredquestion: false
    },
    siteid: "BEDFORD",
    href: "oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDYyL0JFREZPUkQ-",
    inspectionresultid: 187,
    status_description: "Pending",
    allowedstates: {
      CAN: [
        {
          valueid: "INSPRESULTSTATUS|CAN",
          maxvalue: "CAN",
          defaults: true,
          description: "Canceled",
          siteid: "",
          value: "CAN",
          orgid: ""
        }
      ],
      REVIEW: [
        {
          valueid: "INSPRESULTSTATUS|REVIEW",
          maxvalue: "REVIEW",
          defaults: true,
          description: "Review",
          siteid: "",
          value: "REVIEW",
          orgid: ""
        }
      ],
      PENDING: [
        {
          valueid: "INSPRESULTSTATUS|PENDING",
          maxvalue: "PENDING",
          defaults: true,
          description: "Pending",
          siteid: "",
          value: "PENDING",
          orgid: ""
        }
      ],
      INPROG: [
        {
          valueid: "INSPRESULTSTATUS|INPROG",
          maxvalue: "INPROG",
          defaults: true,
          description: "In Progress",
          siteid: "",
          value: "INPROG",
          orgid: ""
        }
      ]
    },
    referenceobject: "WOACTIVITY",
    assetdesc: "Motor Controlled Valve",
    isbatch: false,
    orgid: "EAGLENA",
    sequence: 0,
    referenceobjectid: "T1092",
    locationalias: "MTP100",
    location: "MTP100",
    locations: [
      {
        description: "Materials Transfer Pipe",
        location: "MTP100"
      }
    ],
    locdesc: "Materials Transfer Pipe",
    workorder: [
      {
        parent: "1208",
        _rowstamp: "2154154",
        istask: true,
        href: "oslc/os/mxapiwodetail/_QkVERk9SRC9UMTA5Mg--",
        taskid: 20,
        estdur: 0,
        wonum: "T1092"
      }
    ],
    status: "PENDING",
    _bulkid: "187",
    computedTitle: "GRAPHITE-52080",
    computedWOTitle: "1208",
    computedWONum: "1208",
    computedButtonLabel: "View inspection",
    computedPendingDate: null,
    computedIsOverDue: false,
    computedQuestions: "1 question",
    computedDuration: null,
    computedAsset: "26000 Motor Controlled Valve",
    computedLocation: "MTP100 Materials Transfer Pipe",
    plussgeojson: null,
    computedInspectionStatus: [
      {
        label: "Pending",
        type: "cool-gray",
        action: true
      }
    ],
    computedButtonTheme: "primary"
  },
  {
    parent: "1208",
    historyflag: false,
    resultnum: "1060",
    createdate: "2022-09-09T11:41:29-03:00",
    status_maxvalue: "PENDING",
    totalquestion: 1,
    allowedactions: {
      countnewnotf: {
        requestqueryparams: {
          notfosname: {
            default: "MXNOTIFICATION",
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      sigopgranted: {
        requestqueryparams: {
          app: {
            type: "string"
          },
          optionname: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      statuslist: {
        httpmethod: "GET",
        type: "system"
      },
      notify: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for notify action",
          type: "object",
          properties: {
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      snoozefromquery: {
        httpmethod: "POST",
        type: "system"
      },
      discardedit: {
        httpmethod: "POST",
        type: "system"
      },
      importfile: {
        httpmethod: "POST",
        type: "system"
      },
      unsubscribe: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for subscribe action",
          type: "object",
          properties: {
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      logapiaccess: {
        httpmethod: "POST",
        type: "system"
      },
      markasread: {
        httpmethod: "POST",
        type: "system"
      },
      lock: {
        httpmethod: "POST",
        type: "system"
      },
      removebookmark: {
        httpmethod: "POST",
        type: "system"
      },
      snooze: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for snooze action",
          type: "object",
          properties: {
            snoozetime: {
              default: 30,
              type: "integer"
            },
            snoozeunit: {
              type: "string"
            },
            snoozetillcondition: {
              type: "string"
            },
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      genreport: {
        requestqueryparams: {
          attachments: {
            default: false,
            type: "boolean",
            required: true
          },
          reportname: {
            type: "string",
            required: true
          },
          reportformat: {
            default: "pdf",
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      events: {
        httpmethod: "GET",
        type: "system"
      },
      evalcondition: {
        requestqueryparams: {
          condition: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      countnew: {
        httpmethod: "GET",
        type: "system"
      },
      unlock: {
        httpmethod: "POST",
        type: "system"
      },
      getlist: {
        requestqueryparams: {
          attribute: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      removefrommemory: {
        httpmethod: "POST",
        type: "system"
      },
      subscribe: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema for subscribe action",
          type: "object",
          properties: {
            usernotftype: {
              type: "string"
            },
            pushuritemplate: {
              type: "string"
            },
            pushtag: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            pushtitle: {
              type: "string"
            },
            eventname: {
              type: "string",
              required: true
            }
          }
        }
      },
      candelete: {
        httpmethod: "GET",
        type: "system"
      },
      dismiss: {
        httpmethod: "POST",
        type: "system"
      },
      updateimage: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema if content-type = application/json",
          type: "object",
          properties: {
            imguri: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            mimetype: {
              type: "string"
            }
          }
        }
      },
      isesigneeded: {
        requestqueryparams: {
          optionname: {
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      islocked: {
        httpmethod: "GET",
        type: "system"
      },
      duplicate: {
        httpmethod: "GET",
        type: "system"
      },
      canadd: {
        httpmethod: "GET",
        type: "system"
      },
      addfromdoclib: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema if content-type = application/json",
          type: "object",
          properties: {
            imguri: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            mimetype: {
              type: "string"
            }
          }
        }
      },
      verifyesig: {
        httpmethod: "GET",
        type: "system"
      },
      bookmark: {
        httpmethod: "POST",
        type: "system"
      },
      logesig: {
        httpmethod: "POST",
        type: "system"
      },
      islockedbyme: {
        httpmethod: "GET",
        type: "system"
      },
      addimage: {
        httpmethod: "POST",
        type: "system",
        requestschema: {
          description: "Request Schema if content-type = application/json",
          type: "object",
          properties: {
            imguri: {
              type: "string"
            },
            endpointname: {
              type: "string"
            },
            mimetype: {
              type: "string"
            }
          }
        }
      },
      activewfinstances: {
        httpmethod: "GET",
        type: "system"
      },
      deleteimage: {
        httpmethod: "POST",
        type: "system"
      },
      notifications: {
        requestqueryparams: {
          notfosname: {
            default: "MXNOTIFICATION",
            type: "string",
            required: true
          }
        },
        httpmethod: "GET",
        type: "system"
      },
      listreports: {
        httpmethod: "GET",
        type: "system"
      }
    },
    _rowstamp: "2154811",
    assets: [
      {
        assetnum: "26000",
        description: "Motor Controlled Valve"
      }
    ],
    assetnumalias: "26000",
    inspectionform: {
      inspectionformid: 61,
      name: "teste1",
      hasrequiredquestion: false
    },
    siteid: "BEDFORD",
    href: "oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDYwL0JFREZPUkQ-",
    inspectionresultid: 185,
    status_description: "Pending",
    allowedstates: {
      CAN: [
        {
          valueid: "INSPRESULTSTATUS|CAN",
          maxvalue: "CAN",
          defaults: true,
          description: "Canceled",
          siteid: "",
          value: "CAN",
          orgid: ""
        }
      ],
      REVIEW: [
        {
          valueid: "INSPRESULTSTATUS|REVIEW",
          maxvalue: "REVIEW",
          defaults: true,
          description: "Review",
          siteid: "",
          value: "REVIEW",
          orgid: ""
        }
      ],
      PENDING: [
        {
          valueid: "INSPRESULTSTATUS|PENDING",
          maxvalue: "PENDING",
          defaults: true,
          description: "Pending",
          siteid: "",
          value: "PENDING",
          orgid: ""
        }
      ],
      INPROG: [
        {
          valueid: "INSPRESULTSTATUS|INPROG",
          maxvalue: "INPROG",
          defaults: true,
          description: "In Progress",
          siteid: "",
          value: "INPROG",
          orgid: ""
        }
      ]
    },
    referenceobject: "WOACTIVITY",
    assetdesc: "Motor Controlled Valve",
    isbatch: false,
    orgid: "EAGLENA",
    sequence: 0,
    referenceobjectid: "T1091",
    locationalias: "MTP100",
    location: "MTP100",
    locations: [
      {
        description: "Materials Transfer Pipe",
        location: "MTP100"
      }
    ],
    locdesc: "Materials Transfer Pipe",
    workorder: [
      {
        parent: "1208",
        _rowstamp: "2154151",
        istask: true,
        schedstart: "2022-09-09T11:41:44-03:00",
        href: "oslc/os/mxapiwodetail/_QkVERk9SRC9UMTA5MQ--",
        taskid: 10,
        estdur: 0,
        wonum: "T1091"
      }
    ],
    status: "PENDING",
    _bulkid: "185",
    computedTitle: "teste1",
    computedWOTitle: "1208",
    computedWONum: "1208",
    computedButtonLabel: "View inspection",
    computedPendingDate: null,
    computedIsOverDue: false,
    computedQuestions: "1 question",
    computedDuration: null,
    computedAsset: "26000 Motor Controlled Valve",
    computedLocation: "MTP100 Materials Transfer Pipe",
    autolocate: null,
    computedInspectionStatus: [
      {
        label: "Pending",
        type: "cool-gray",
        action: true
      }
    ],
    computedButtonTheme: "secondary"
    }
  ]
export default batchDsSearchQbe;
