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

let assetStatusListData = {
    "member": [
        {
            "_rowstamp":"356655",
            "valueid":"LOCASSETSTATUS|ACTIVE",
            "maxvalue":"OPERATING",
            "defaults":false,
            "description":"Active",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvT1BFUkFUSU5HL35OVUxMfi9_TlVMTH4vQUNUSVZF",
            "value":"ACTIVE",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"356651",
            "valueid":"LOCASSETSTATUS|BROKEN",
            "maxvalue":"DECOMMISSIONED",
            "defaults":false,
            "description":"Broken",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvREVDT01NSVNTSU9ORUQvfk5VTEx_L35OVUxMfi9CUk9LRU4-",
            "value":"BROKEN",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"355892",
            "valueid":"LOCASSETSTATUS|DECOMMISSIONED",
            "maxvalue":"DECOMMISSIONED",
            "defaults":true,
            "description":"Decommissioned",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvREVDT01NSVNTSU9ORUQvfk5VTEx_L35OVUxMfi9ERUNPTU1JU1NJT05FRA--",
            "value":"DECOMMISSIONED",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"356482",
            "valueid":"LOCASSETSTATUS|IMPORTED",
            "maxvalue":"IMPORTED",
            "defaults":true,
            "description":"Imported from building model",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvSU1QT1JURUQvfk5VTEx_L35OVUxMfi9JTVBPUlRFRA--",
            "value":"IMPORTED",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"356652",
            "valueid":"LOCASSETSTATUS|INACTIVE",
            "maxvalue":"DECOMMISSIONED",
            "defaults":false,
            "description":"Inactive",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvREVDT01NSVNTSU9ORUQvfk5VTEx_L35OVUxMfi9JTkFDVElWRQ--",
            "value":"INACTIVE",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"356656",
            "valueid":"LOCASSETSTATUS|LIMITEDUSE",
            "maxvalue":"OPERATING",
            "defaults":false,
            "description":"Limited Use",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvT1BFUkFUSU5HL35OVUxMfi9_TlVMTH4vTElNSVRFRFVTRQ--",
            "value":"LIMITEDUSE",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"356653",
            "valueid":"LOCASSETSTATUS|MISSING",
            "maxvalue":"DECOMMISSIONED",
            "defaults":false,
            "description":"Missing",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvREVDT01NSVNTSU9ORUQvfk5VTEx_L35OVUxMfi9NSVNTSU5H",
            "value":"MISSING",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"355894",
            "valueid":"LOCASSETSTATUS|NOT READY",
            "maxvalue":"NOT READY",
            "defaults":true,
            "description":"Not Ready",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvTk9UIFJFQURZL35OVUxMfi9_TlVMTH4vTk9UIFJFQURZ",
            "value":"NOT READY",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"355893",
            "valueid":"LOCASSETSTATUS|OPERATING",
            "maxvalue":"OPERATING",
            "defaults":true,
            "description":"Operating",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvT1BFUkFUSU5HL35OVUxMfi9_TlVMTH4vT1BFUkFUSU5H",
            "value":"OPERATING",
            "domainid":"LOCASSETSTATUS"
         },
         {
            "_rowstamp":"356654",
            "valueid":"LOCASSETSTATUS|SEALED",
            "maxvalue":"DECOMMISSIONED",
            "defaults":false,
            "description":"Sealed",
            "href":"oslc/os/mxapisynonymdomain/_TE9DQVNTRVRTVEFUVVMvREVDT01NSVNTSU9ORUQvfk5VTEx_L35OVUxMfi9TRUFMRUQ-",
            "value":"SEALED",
            "domainid":"LOCASSETSTATUS"
         },
      
    ],
    "href": "oslc/os/mxapisynonymdomain",
    "responseInfo": {
        "schema":{
            "resource":"MXAPISYNONYMDOMAIN",
            "description":"Maximo API for Synonymdomain",
            "pk":[
               "domainid",
               "maxvalue",
               "value",
               "siteid",
               "orgid"
            ],
            "title":"SYNONYMDOMAIN",
            "type":"object",
            "$ref":"oslc\/jsonschemas\/mxapisynonymdomain",
            "properties":{
               "valueid":{
                  "searchType":"EXACT",
                  "subType":"ALN",
                  "title":"Value ID",
                  "persistent":true,
                  "type":"string",
                  "remarks":"System generated unique identifier of the value in a domain, internal and cannot be modified.",
                  "maxLength":256
               },
               "maxvalue":{
                  "searchType":"WILDCARD",
                  "subType":"ALN",
                  "title":"Internal Value",
                  "persistent":true,
                  "type":"string",
                  "remarks":"Internal maximo value",
                  "maxLength":50
               },
               "localref":{
                  "type":"string"
               },
               "description":{
                  "searchType":"WILDCARD",
                  "subType":"ALN",
                  "title":"Description",
                  "persistent":true,
                  "type":"string",
                  "remarks":"Description of the value",
                  "maxLength":256
               },
               "domainid":{
                  "searchType":"WILDCARD",
                  "subType":"UPPER",
                  "title":"Domain",
                  "persistent":true,
                  "type":"string",
                  "remarks":"Identifier of the domain",
                  "maxLength":18
               },
               "orgid":{
                  "searchType":"WILDCARD",
                  "subType":"UPPER",
                  "title":"Organization",
                  "persistent":true,
                  "type":"string",
                  "hasList":true,
                  "remarks":"Identifier of the org for which the domain value is specified",
                  "maxLength":8
               },
               "_rowstamp":{
                  "type":"string"
               },
               "defaults":{
                  "default":false,
                  "searchType":"EXACT",
                  "subType":"YORN",
                  "title":"Default",
                  "persistent":true,
                  "type":"boolean",
                  "remarks":"Is This The Default Value? (Y or N)"
               },
               "_imagelibref":{
                  "type":"string"
               },
               "siteid":{
                  "searchType":"WILDCARD",
                  "subType":"UPPER",
                  "title":"Site",
                  "persistent":true,
                  "type":"string",
                  "hasList":true,
                  "remarks":"Identifier of the site for which the domain value is specified",
                  "maxLength":8
               },
               "href":{
                  "type":"string"
               },
               "_id":{
                  "type":"string"
               },
               "value":{
                  "searchType":"WILDCARD",
                  "subType":"ALN",
                  "title":"Value",
                  "persistent":true,
                  "type":"string",
                  "remarks":"Synonym value",
                  "maxLength":50
               }
            },
            "required":[
               "domainid",
               "maxvalue",
               "value",
               "valueid"
            ]
         },
        "totalPages":1,
        "href":"oslc/os/mxapisynonymdomain?oslc.select=value%2Cdescription%2Cmaxvalue%2Cdomainid%2Cvalueid%2Csiteid%2Corgid%2Cdefaults&oslc.pageSize=100&oslc.where=domainid%3D%22LOCASSETSTATUS%22&savedQuery=MOBILEDOMAIN&searchAttributes=value%2Cdescription%2Cmaxvalue%2Cdomainid%2Cvalueid%2Csiteid%2Corgid%2Cdefaults&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
        "totalCount":10,
        "pagenum":1
    }
  };
  
  export default assetStatusListData;
  

