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

let failureCode = {
    "member": [
        {
            "_rowstamp":"92106",
            "failurecode":{
               "failurecode":"PROD",
               "description":"PRODUCTION FAILURES"
            },
            "href": "http://localhost/maximo/oslc/os/mxapifailurelist/_MjAyNi9FQUdMRU5B",
            "orgid":"EAGLENA"
         },
         {
            "_rowstamp":"92107",
            "failurecode":{
               "failurecode":"MOLD",
               "description":"MOLDING EQUIPMENT"
            },
            "href": "http://localhost/maximo/oslc/os/mxapifailurelist/_MjAyOC9FQUdMRU5B",
            "orgid":"EAGLENA"
         },
    ],
    "href": "http://localhost/maximo/oslc/os/mxapifailurelist",
    "responseInfo": {
        "href": "http://localhost/maximo/oslc/os/mxapifailurelist?oslc.select=failurelistid%2Cfailurecode.description%2Cfailurecode.failurecode%2CcomputeFailureCode%2Corgid%2Cparent&oslc.pageSize=100&oslc.where=parent!%3D%22*%22&savedQuery=FAILUREMOB&searchAttributes=failurecode.description%2Cfailurecode.failurecode&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1"
    }
};

export default failureCode;
