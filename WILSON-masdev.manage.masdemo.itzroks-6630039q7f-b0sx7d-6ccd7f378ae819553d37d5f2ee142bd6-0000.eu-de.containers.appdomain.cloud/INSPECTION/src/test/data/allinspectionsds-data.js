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

const allinspectionsds = {
    member: [
      {
        parent: "1209",
        historyflag: false,
        resultnum: "1063",
        createdate: "2022-09-13T18:06:01-03:00",
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
          addimage: {
            httpmethod: "POST",
            requestheaders: {
            },
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
        _rowstamp: "2184676",
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
        href: "oslc/os/mxapiinspectionres/_RUFHTEVOQS8xMDYzL0JFREZPUkQ-",
        inspectionresultid: 197,
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
          COMPLETED: [
            {
              valueid: "INSPRESULTSTATUS|COMPLETED",
              maxvalue: "COMPLETED",
              defaults: true,
              description: "Completed",
              siteid: "",
              value: "COMPLETED",
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
        referenceobjectid: "T1093",
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
            parent: "1209",
            _rowstamp: "2184754",
            istask: true,
            schedstart: "2022-09-13T18:06:15-03:00",
            href: "oslc/os/mxapiwodetail/_QkVERk9SRC9UMTA5Mw--",
            taskid: 10,
            estdur: 0,
            wonum: "T1093"
          }
        ],
        status: "PENDING"
      }
    ],
    href: "oslc/os/mxapiinspectionres",
    responseInfo: {
      schema: {
        resource: "MXAPIINSPECTIONRES",
        description: "Object Structure for Inspection result on new framework",
        pk: [
          "resultnum",
          "orgid",
          "siteid"
        ],
        title: "INSPECTIONRESULT",
        type: "object",
        $ref: "oslc/jsonschemas/mxapiinspectionres",
        properties: {
          parent: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Parent",
            persistent: true,
            type: "string",
            remarks: "Parent work order number.",
            maxLength: 25
          },
          historyflag: {
            default: false,
            searchType: "EXACT",
            subType: "YORN",
            title: "History flag",
            persistent: true,
            type: "boolean",
            remarks: "Flag attribute to denote the inspection result is archived"
          },
          localref: {
            type: "string"
          },
          resultnum: {
            default: "&AUTOKEY&",
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Inspection Result",
            persistent: true,
            type: "string",
            remarks: "The number of the inspection result.",
            maxLength: 12
          },
          createdate: {
            default: "&SYSDATE&",
            searchType: "EXACT",
            subType: "DATETIME",
            title: "Created Date",
            persistent: true,
            type: "string",
            remarks: "The date and time that the form was created.",
            maxLength: 10
          },
          inspfieldresult: {
            objectName: "INSPFIELDRESULT",
            type: "array",
            items: {
              definition: {
                subSchema: {
                  $ref: "oslc/jsonschemas/mxapiinspectionres/inspfieldresult"
                }
              },
              type: "object"
            },
            cardinality: "",
            relation: "INSPFIELDRESULT"
          },
          status_maxvalue: {
            type: "string"
          },
          _rowstamp: {
            type: "string"
          },
          assets: {
            objectName: "ASSET",
            type: "array",
            items: {
              type: "object",
              properties: {
                autolocate: {
                  searchType: "WILDCARD",
                  subType: "CLOB",
                  title: "GeoJSON",
                  persistent: true,
                  type: "string",
                  remarks: "GeoJSON representation of the record geometry",
                  maxLength: 999999
                },
                assetnum: {
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Asset",
                  persistent: true,
                  type: "string",
                  remarks: "Asset Number",
                  maxLength: 25
                },
                description: {
                  searchType: "TEXT",
                  subType: "ALN",
                  title: "Description",
                  persistent: true,
                  type: "string",
                  remarks: "Describes the asset. To enter or view additional information, click the Long Description button.",
                  maxLength: 100
                },
                assetmeter: {
                  objectName: "ASSETMETER",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      readingtype_maxvalue: {
                        type: "string"
                      },
                      metername: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Meter",
                        persistent: true,
                        type: "string",
                        hasList: true,
                        remarks: "Identifier for the meter attached to the asset, for example HOURS or KILOMETERS.",
                        maxLength: 10
                      },
                      active: {
                        searchType: "EXACT",
                        subType: "YORN",
                        title: "Active",
                        persistent: true,
                        type: "boolean",
                        remarks: "Is this asset's meter available to accept manual or rolled down readings, or to be used in PM or CM work order generation?"
                      },
                      rollover: {
                        searchType: "EXACT",
                        scale: 2,
                        subType: "DECIMAL",
                        title: "Rollover",
                        persistent: true,
                        type: "number",
                        remarks: "Point at which the asset's meter returns to the its mininum value. Rollover applies to CONTINUOUS meters only.",
                        maxLength: 16
                      },
                      readingtype_description: {
                        type: "string"
                      },
                      readingtype: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Reading Type",
                        persistent: true,
                        type: "string",
                        hasList: true,
                        remarks: "reading type (CONTINUOUS or DELTA) for this meter.",
                        maxLength: 10
                      },
                      lastreading: {
                        searchType: "WILDCARD",
                        subType: "ALN",
                        title: "Last Reading",
                        persistent: true,
                        type: "string",
                        hasList: true,
                        remarks: "Last reading taken for this meter. This should be the same as the most recent meter reading. An asset that was used before it was added to the system will have an asset meter reading. The last meter reading for an existing asset can be used as the initial meter reading for that asset in the system.",
                        maxLength: 18
                      }
                    }
                  },
                  cardinality: "MULTIPLE"
                }
              }
            },
            cardinality: ""
          },
          assetnumalias: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Asset",
            persistent: true,
            type: "string",
            remarks: "Asset Number",
            maxLength: 25
          },
          _imagelibref: {
            type: "string"
          },
          inspectionform: {
            objectName: "INSPECTIONFORM",
            type: "object",
            properties: {
              inspectionformid: {
                searchType: "EXACT",
                subType: "BIGINT",
                title: "INSPECTIONFORMID",
                persistent: true,
                type: "integer",
                remarks: "Unique Identifier",
                maxLength: 19
              },
              name: {
                searchType: "WILDCARD",
                subType: "ALN",
                title: "Name",
                persistent: true,
                type: "string",
                remarks: "Form Name",
                maxLength: 200
              },
              hasrequiredquestion: {
                searchType: "NONE",
                subType: "YORN",
                title: "Has required question",
                type: "boolean",
                remarks: "Attribute to denote the inspection form has required question or not"
              }
            }
          },
          siteid: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Site",
            persistent: true,
            type: "string",
            remarks: "Site Identification",
            maxLength: 8
          },
          href: {
            type: "string"
          },
          inspectionresultid: {
            searchType: "EXACT",
            subType: "BIGINT",
            title: "Inspection result  identification",
            persistent: true,
            type: "integer",
            remarks: "Record identification",
            maxLength: 19
          },
          status_description: {
            type: "string"
          },
          referenceobject: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Reference Object",
            persistent: true,
            type: "string",
            remarks: "Object that the Inspection result is attached to",
            maxLength: 20
          },
          batchlist: {
            objectName: "INSPECTIONRESULT",
            type: "array",
            items: {
              type: "object",
              properties: {
                inspectionresultid: {
                  searchType: "EXACT",
                  subType: "BIGINT",
                  title: "Inspection result  identification",
                  persistent: true,
                  type: "integer",
                  remarks: "Record identification",
                  maxLength: 19
                },
                status_maxvalue: {
                  type: "string"
                },
                status_description: {
                  type: "string"
                },
                asset: {
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Asset",
                  persistent: true,
                  type: "string",
                  remarks: "Identification of the equipment that this inspection result is attached",
                  maxLength: 25
                },
                inspfieldresult: {
                  objectName: "INSPFIELDRESULT",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      errormessage: {
                        searchType: "WILDCARD",
                        subType: "ALN",
                        title: "Error Message",
                        persistent: true,
                        type: "string",
                        remarks: "Error message captured from Maximo when errorflag=1",
                        maxLength: 2000
                      },
                      inspfieldresultid: {
                        searchType: "EXACT",
                        subType: "BIGINT",
                        title: "Inspection Field Result Id",
                        persistent: true,
                        type: "integer",
                        remarks: "Record Identification",
                        maxLength: 19
                      },
                      anywhererefid: {
                        searchType: "EXACT",
                        subType: "BIGINT",
                        title: "Anywhere Ref ID",
                        persistent: true,
                        type: "integer",
                        remarks: "Anywhere Reference ID",
                        maxLength: 19
                      },
                      resultnum: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Result Id",
                        persistent: true,
                        type: "string",
                        remarks: "Record Identification",
                        maxLength: 12
                      },
                      dateresponse: {
                        searchType: "EXACT",
                        subType: "DATE",
                        title: "Date Time Response",
                        persistent: true,
                        type: "string",
                        remarks: "Date Time response for the inspection result.",
                        maxLength: 4
                      },
                      timeresponse: {
                        searchType: "EXACT",
                        subType: "TIME",
                        title: "Time Only Response",
                        persistent: true,
                        type: "string",
                        remarks: "Time only response for the inspection result.",
                        maxLength: 3
                      },
                      inspquestionnum: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Inspection Form Question",
                        persistent: true,
                        type: "string",
                        remarks: "Composed Identifier For Inspection Form Question",
                        maxLength: 12
                      },
                      actionrequired: {
                        default: false,
                        searchType: "EXACT",
                        subType: "YORN",
                        title: "Action required",
                        persistent: true,
                        type: "boolean",
                        remarks: "Require actions based on questions responses"
                      },
                      numresponse: {
                        searchType: "EXACT",
                        scale: 2,
                        subType: "DECIMAL",
                        title: "Numeric Response",
                        persistent: true,
                        type: "number",
                        remarks: "The provided numeric response to the form question",
                        maxLength: 16
                      },
                      rolloverflag: {
                        default: false,
                        searchType: "EXACT",
                        subType: "YORN",
                        title: "Rollover Flag",
                        persistent: true,
                        type: "boolean",
                        remarks: "Rollover flag used for continuous meters"
                      },
                      orgid: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Organization",
                        persistent: true,
                        type: "string",
                        remarks: "Organization Identification",
                        maxLength: 8
                      },
                      revision: {
                        searchType: "EXACT",
                        subType: "INTEGER",
                        title: "Current Form Revision",
                        persistent: true,
                        type: "integer",
                        remarks: "Current Form Revision",
                        maxLength: 12
                      },
                      plussgeojson: {
                        searchType: "WILDCARD",
                        subType: "CLOB",
                        title: "GeoJSON",
                        persistent: true,
                        type: "string",
                        remarks: "GeoJSON representation of the record geometry",
                        maxLength: 999999
                      },
                      inspfieldresultnum: {
                        default: "&AUTOKEY&",
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Inspection Result Field Number",
                        persistent: true,
                        type: "string",
                        remarks: "Composed Identifier For Inspection Result Field",
                        maxLength: 12
                      },
                      txtresponse: {
                        searchType: "WILDCARD",
                        subType: "ALN",
                        title: "Text Response",
                        persistent: true,
                        type: "string",
                        remarks: "The provided ALN response to the form question",
                        maxLength: 250
                      },
                      readconfirmation: {
                        default: false,
                        searchType: "EXACT",
                        subType: "YORN",
                        title: "Read Confirmation",
                        persistent: true,
                        type: "boolean",
                        remarks: "Confirm that the Inspector read the feedback"
                      },
                      errorflag: {
                        searchType: "EXACT",
                        subType: "INTEGER",
                        title: "Error Flag",
                        persistent: true,
                        type: "integer",
                        remarks: "Processing status, 0 for pending, 1 for error, 2 for processed",
                        maxLength: 12
                      },
                      siteid: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Site",
                        persistent: true,
                        type: "string",
                        remarks: "Site Identification",
                        maxLength: 8
                      },
                      inspformnum: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Inspection Form",
                        persistent: true,
                        type: "string",
                        remarks: "Foreign key from Inspection Form",
                        maxLength: 12
                      },
                      inspfieldnum: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Inspection Question Field",
                        persistent: true,
                        type: "string",
                        remarks: "Composed Identifier For Inspection Question Field",
                        maxLength: 12
                      }
                    }
                  },
                  cardinality: ""
                },
                status: {
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Status",
                  persistent: true,
                  type: "string",
                  hasList: true,
                  remarks: "Will contain the current inspection result status, controlled by the system",
                  maxLength: 20
                }
              }
            },
            cardinality: ""
          },
          assetdesc: {
            searchType: "TEXT",
            subType: "ALN",
            title: "Description",
            persistent: true,
            type: "string",
            remarks: "Describes the asset. To enter or view additional information, click the Long Description button.",
            maxLength: 100
          },
          isbatch: {
            default: false,
            searchType: "EXACT",
            subType: "YORN",
            title: "Is Batch Inspection",
            persistent: true,
            type: "boolean",
            remarks: "Identify when the result is a batch inspection"
          },
          orgid: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Organization",
            persistent: true,
            type: "string",
            remarks: "Organization Identification",
            maxLength: 8
          },
          sequence: {
            searchType: "EXACT",
            subType: "INTEGER",
            title: "Sequence",
            persistent: true,
            type: "integer",
            remarks: "Work order sequence.",
            maxLength: 12
          },
          duedate: {
            searchType: "EXACT",
            subType: "DATETIME",
            title: "Due Date",
            persistent: true,
            type: "string",
            remarks: "The date that the inspection must be completed by.",
            maxLength: 10
          },
          referenceobjectid: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Reference Object ID",
            persistent: true,
            type: "string",
            remarks: "Identifies the reference object.",
            maxLength: 25
          },
          locationalias: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Location",
            persistent: true,
            type: "string",
            remarks: "Storeroom where the item is stored.",
            maxLength: 12
          },
          location: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Location",
            persistent: true,
            type: "string",
            remarks: "Identification of the location that this inspection result is attached",
            maxLength: 12
          },
          locations: {
            objectName: "LOCATIONS",
            type: "array",
            items: {
              type: "object",
              properties: {
                autolocate: {
                  searchType: "WILDCARD",
                  subType: "CLOB",
                  title: "GeoJSON",
                  persistent: true,
                  type: "string",
                  remarks: "GeoJSON representation of the record geometry",
                  maxLength: 999999
                },
                description: {
                  searchType: "TEXT",
                  subType: "ALN",
                  title: "Description",
                  persistent: true,
                  type: "string",
                  remarks: "Describes the storeroom location. To enter or view additional information, click the Long Description button.",
                  maxLength: 100
                },
                location: {
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Location",
                  persistent: true,
                  type: "string",
                  hasList: true,
                  remarks: "Storeroom where the item is stored.",
                  maxLength: 12
                },
                locationmeter: {
                  objectName: "LOCATIONMETER",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      readingtype_maxvalue: {
                        type: "string"
                      },
                      metername: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Meter",
                        persistent: true,
                        type: "string",
                        hasList: true,
                        remarks: "Identifier for the meter attached to the location, for example HOURS or KILOMETERS.",
                        maxLength: 10
                      },
                      active: {
                        searchType: "EXACT",
                        subType: "YORN",
                        title: "Active",
                        persistent: true,
                        type: "boolean",
                        remarks: "Is this location's meter available to accept manual or rolled down readings, or to be used in PM or CM work order generation?"
                      },
                      rollover: {
                        searchType: "EXACT",
                        scale: 2,
                        subType: "DECIMAL",
                        title: "Rollover",
                        persistent: true,
                        type: "number",
                        remarks: "Point at which the location's meter returns to the its mininum value.  Rollover applies to CONTINUOUS meters only.",
                        maxLength: 16
                      },
                      readingtype_description: {
                        type: "string"
                      },
                      readingtype: {
                        searchType: "WILDCARD",
                        subType: "UPPER",
                        title: "Reading Type",
                        persistent: true,
                        type: "string",
                        hasList: true,
                        remarks: "reading type (CONTINUOUS or DELTA) for this LocationMeter. Location meter readings default to this LocationMeter's readingtype value.",
                        maxLength: 10
                      },
                      lastreading: {
                        searchType: "WILDCARD",
                        subType: "ALN",
                        title: "Last Reading",
                        persistent: true,
                        type: "string",
                        hasList: true,
                        remarks: "Last reading taken for this location meter",
                        maxLength: 18
                      }
                    }
                  },
                  cardinality: "UNDEFINED"
                }
              }
            },
            cardinality: ""
          },
          _id: {
            type: "string"
          },
          locdesc: {
            searchType: "TEXT",
            subType: "ALN",
            title: "Description",
            persistent: true,
            type: "string",
            remarks: "Describes the storeroom location. To enter or view additional information, click the Long Description button.",
            maxLength: 100
          },
          workorder: {
            type: "array",
            items: {
              resource: "mxapiwodetail",
              description: "Maximo API for Work Orders with Plans and Reservations",
              pk: [
                "siteid",
                "wonum"
              ],
              title: "WORKORDER",
              type: "object",
              $ref: "oslc/jsonschemas/mxapiwodetail",
              properties: {
                wptool: {
                  objectName: "WPTOOL",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/wptool"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "SHOWPLANTOOL"
                },
                parent: {
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Parent WO",
                  persistent: true,
                  type: "string",
                  hasList: true,
                  remarks: "Parent of the work order shown in the Work Order field. When this field is blank, the work order in the Work Order field is a top-level work order. To assign a work order to a parent, select Assign to New Parent from the Select Action menu.",
                  maxLength: 25
                },
                localref: {
                  type: "string"
                },
                servrectrans: {
                  objectName: "SERVRECTRANS",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/servrectrans"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "UXSHOWACTUALSERVICE"
                },
                failurereport: {
                  objectName: "FAILUREREPORT",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/failurereport"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "UXSHOWFAILUREREPORT"
                },
                moddowntimehist: {
                  objectName: "MODDOWNTIMEHIST",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/moddowntimehist"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "UNDEFINED",
                  relation: "MODDOWNTIMEHIST"
                },
                description: {
                  searchType: "TEXT",
                  subType: "ALN",
                  title: "Description",
                  persistent: true,
                  type: "string",
                  remarks: "Describes the work order. To enter or view additional information, click the Long Description button.",
                  maxLength: 100
                },
                tooltrans: {
                  objectName: "TOOLTRANS",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/tooltrans"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "UXSHOWACTUALTOOL"
                },
                _rowstamp: {
                  type: "string"
                },
                _imagelibref: {
                  type: "string"
                },
                istask: {
                  searchType: "EXACT",
                  subType: "YORN",
                  title: "Is Task",
                  persistent: true,
                  type: "boolean",
                  remarks: "Specifies whether the work order is a task. If the check box is selected, the work order is a task. If the check box is cleared, the work order is not a task."
                },
                href: {
                  type: "string"
                },
                matusetrans: {
                  objectName: "MATUSETRANS",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/matusetrans"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "UXSHOWACTUALMATERIAL"
                },
                doclinks: {
                  objectName: "DOCLINKS",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/doclinks"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "DOCLINKS"
                },
                taskid: {
                  searchType: "EXACT",
                  subType: "INTEGER",
                  title: "Task",
                  persistent: true,
                  type: "integer",
                  remarks: "Identifies the task.",
                  maxLength: 12
                },
                invreserve: {
                  objectName: "INVRESERVE",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/invreserve"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "MXINTINVRES"
                },
                estdur: {
                  searchType: "EXACT",
                  scale: 0,
                  subType: "DURATION",
                  title: "Duration",
                  persistent: true,
                  type: "number",
                  remarks: "Estimated remaining number of hours needed to complete the work.",
                  maxLength: 8
                },
                mr: {
                  objectName: "MR",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/mr"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "MR"
                },
                assignment: {
                  objectName: "ASSIGNMENT",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/assignment"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "SHOWASSIGNMENT"
                },
                wpmaterial: {
                  objectName: "WPMATERIAL",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/wpmaterial"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "SHOWPLANMATERIAL"
                },
                worktype: {
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Work Type",
                  persistent: true,
                  type: "string",
                  hasList: true,
                  remarks: "Identifies the work order's type. Some example types are: preventive maintenance, corrective maintenance, emergency maintenace, capital project, and event report.",
                  maxLength: 5
                },
                wpservice: {
                  objectName: "WPSERVICE",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/wpservice"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "SHOWPLANSERVICE"
                },
                multiassetlocci: {
                  objectName: "MULTIASSETLOCCI",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/multiassetlocci"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "MULTIASSETLOCCI"
                },
                wonum: {
                  default: "&AUTOKEY&",
                  searchType: "WILDCARD",
                  subType: "UPPER",
                  title: "Work Order",
                  persistent: true,
                  type: "string",
                  hasList: true,
                  remarks: "Identifies the work order.",
                  maxLength: 25
                },
                relatedrecord: {
                  objectName: "RELATEDRECORD",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/relatedrecord"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "RELATEDRECORD"
                },
                autolocate: {
                  searchType: "WILDCARD",
                  subType: "CLOB",
                  title: "GeoJSON",
                  persistent: true,
                  type: "string",
                  remarks: "GeoJSON representation of the record geometry",
                  maxLength: 999999
                },
                wplabor: {
                  objectName: "WPLABOR",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/wplabor"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "SHOWPLANLABOR"
                },
                labtrans: {
                  objectName: "LABTRANS",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/labtrans"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "UXSHOWACTUALLABOR"
                },
                schedstart: {
                  searchType: "EXACT",
                  subType: "DATETIME",
                  title: "Scheduled Start",
                  persistent: true,
                  type: "string",
                  remarks: "Date and time the work is scheduled to begin.",
                  maxLength: 10
                },
                woserviceaddress: {
                  objectName: "WOSERVICEADDRESS",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/woserviceaddress"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "SERVICEADDRESS"
                },
                _id: {
                  type: "string"
                },
                worklog: {
                  objectName: "WORKLOG",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/worklog"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "",
                  relation: "WOWORKLOG"
                },
                woactivity: {
                  objectName: "WOACTIVITY",
                  type: "array",
                  items: {
                    definition: {
                      subSchema: {
                        $ref: "oslc/jsonschemas/mxapiwodetail/woactivity"
                      }
                    },
                    type: "object"
                  },
                  cardinality: "MULTIPLE",
                  relation: "WOACTIVITY"
                }
              },
              required: [
                "estdur",
                "istask"
              ]
            }
          },
          status: {
            searchType: "WILDCARD",
            subType: "UPPER",
            title: "Status",
            persistent: true,
            type: "string",
            hasList: true,
            remarks: "Will contain the current inspection result status, controlled by the system",
            maxLength: 20
          }
        },
        required: [
          "referenceobject",
          "status"
        ]
      },
      totalPages: 1,
      href: "oslc/os/mxapiinspectionres?oslc.select=siteid%2Corgid%2Cresultnum%2Clocation%2Creferenceobject%2Creferenceobjectid%2Cinspectionresultid%2Cstatus%2Cstatus_maxvalue%2Cstatus_description%2Ccreatedate%2Cduedate%2Callowedactions%2Cisbatch%2Crel.batchlist%7Ballowedstates%2Cinspectionresultid%2Casset%2Chref%2Cstatus%2Crel.inspfieldresult%7Binspfieldresultid%2Cerrorflag%2Cerrormessage%2Cinspfieldnum%2Cinspfieldresultnum%2Cinspformnum%2Cinspquestionnum%2Corgid%2Cresultnum%2Crevision%2Csiteid%2Ctxtresponse%2Cnumresponse%2Cdateresponse%2Ctimeresponse%2Creadconfirmation%2Crolloverflag%2Cdoclinks%7B*%7D%2Cinspfieldresultselection%7Btxtresponse%2Cinspfieldresultselectionid%2Canywhererefid%7D%2Canywhererefid%2Cactionrequired%2Cautolocate%7D%7D%2Cinspectionform.name%2Cinspectionform.inspectionformid%2Cinspectionform.hasrequiredquestion%2Cinspectionform.inspquestionunit._dbcount--totalquestion%2Csequence%2Cassets.assetnum--assetnumalias%2Cassets.description--assetdesc%2Crel.assets%7Bassetnum%2C%20description%2C%20autolocate%2C%20rel.assetmeter%7Bmetername%2Cactive%2Crollover%2Clastreading%2Creadingtype%7D%7D%2Clocations.location--locationalias%2Clocations.description--locdesc%2Crel.locations%7Blocation%2C%20description%2C%20autolocate%2C%20rel.locationmeter%7Bmetername%2Cactive%2Crollover%2Clastreading%2Creadingtype%7D%7D%2Crel.workorder.mxapiwodetail%7Bwonum%2C%20description%2C%20taskid%2C%20worktype%2C%20schedstart%2C%20istask%2C%20estdur%2C%20autolocate%2C%20parent%7Bwonum%2C%20description%7D%2C%20href%7D%2Callowedstates%2Cinspresultstatus%7Bhref%2C_bulkid%7D%2Cparent%2Chistoryflag%2CcomputedTitle%2CcomputedWOTitle%2CcomputedWONum%2CcomputedButtonLabel%2CcomputedCompletedDate%2CcomputedIsOverDue%2CcomputedQuestions%2CcomputedDuration%2CcomputedAsset%2CcomputedLocation%2Cautolocate%2CcomputedInspectionStatus&oslc.pageSize=100&savedQuery=ASSIGNEDWORKTODAY&oslc.orderBy=%2Bduedate&searchAttributes=resultnum%2Clocation%2Creferenceobjectid%2Cstatus%2Cinspectionform.name%2Cassets.assetnum%2Cassets.description%2Clocations.location%2Clocations.description&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
      totalCount: 1,
      pagenum: 1
    }
}

export default allinspectionsds;
  
