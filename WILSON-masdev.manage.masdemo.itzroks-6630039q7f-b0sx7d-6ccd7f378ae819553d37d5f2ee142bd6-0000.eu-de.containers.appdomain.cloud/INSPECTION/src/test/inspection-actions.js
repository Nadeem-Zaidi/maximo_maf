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

let data = {
    member: [
      {
        inspectionresultid: 29,
        status_description: 'Completed',
        inspformscript: [
            {
            "autoscript": "OSACTION.MXAPIINSPECTIONRES.DISPLAYMESSAGE"
            }
        ],
        inspfieldresult: [
            {
            "actionrequired": true
            }
        ],
        allowedactions: {
            ACTIONCREATEWO: {
                "impl": "OSACTION.MXAPIINSPECTIONRES.CREATEWO_NEW",
                "description": null,
                "type": "script"
            },
            ACTIONDISPLAYMESSAGE: {
                "impl": "OSACTION.MXAPIINSPECTIONRES.DISPLAYMESSAGE",
                "description": null,
                "type": "script"
            },
            ACTIONTEST: {
                "impl": "OSACTION.MXAPIINSPECTIONRES.TEST",
                "description": null,
                "type": null
            }
        }
      }]
    } 
    export default data;
