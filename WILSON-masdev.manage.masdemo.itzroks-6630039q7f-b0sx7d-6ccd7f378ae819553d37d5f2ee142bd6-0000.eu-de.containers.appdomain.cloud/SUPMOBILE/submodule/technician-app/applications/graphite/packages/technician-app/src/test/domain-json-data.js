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

let statusitem = {
  "member": [
      {
          "numericdomain_collectionref": "http://localhost:9001/maximo/oslc/os/mxapidomain/_V09TVEFUVVM-/numdomainvalue",
          "_rowstamp": "174558",
          "alndomain_collectionref": "http://localhost:9001/maximo/oslc/os/mxapidomain/_V09TVEFUVVM-/alndomainvalue",
          "maxdomvalcond_collectionref": "http://localhost:9001/maximo/oslc/os/mxapidomain/_V09TVEFUVVM-/maxdomvalcond",
          "synonymdomain_collectionref": "http://localhost:9001/maximo/oslc/os/mxapidomain/_V09TVEFUVVM-/synonymdomain",
          "href": "http://localhost:9001/maximo/oslc/os/mxapidomain/_V09TVEFUVVM-",
          "maxtabledomain_collectionref": "http://localhost:9001/maximo/oslc/os/mxapidomain/_V09TVEFUVVM-/maxtabledomain",
          "domainid": "WOSTATUS"
      }
  ],
  "href": "http://localhost:9001/maximo/oslc/os/mxapidomain",
  "responseInfo": {
      "schema": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "resource": "MXAPIDOMAIN",
          "description": "Maximo API for Domain",
          "pk": [
              "domainid"
          ],
          "title": "MAXDOMAIN",
          "type": "object",
          "$ref": "http://localhost:9001/maximo/oslc/jsonschemas/mxapidomain",
          "properties": {
              "_rowstamp": {
                  "type": "string"
              },
              "localref": {
                  "type": "string"
              },
              "_imglibref": {
                  "type": "string"
              },
              "maxtabledomain": {
                  "type": "array",
                  "items": {
                      "definition": {
                          "subSchema": {
                              "$ref": "http://localhost:9001/maximo/oslc/jsonschemas/mxapidomain/maxtabledomain"
                          }
                      },
                      "type": "object"
                  },
                  "cardinality": "UNDEFINED",
                  "relation": "MAXTABLEDOMAIN"
              },
              "alndomain": {
                  "type": "array",
                  "items": {
                      "definition": {
                          "subSchema": {
                              "$ref": "http://localhost:9001/maximo/oslc/jsonschemas/mxapidomain/alndomain"
                          }
                      },
                      "type": "object"
                  },
                  "cardinality": "UNDEFINED",
                  "relation": "ALNDOMAINVALUE"
              },
              "numericdomain": {
                  "type": "array",
                  "items": {
                      "definition": {
                          "subSchema": {
                              "$ref": "http://localhost:9001/maximo/oslc/jsonschemas/mxapidomain/numericdomain"
                          }
                      },
                      "type": "object"
                  },
                  "cardinality": "UNDEFINED",
                  "relation": "NUMDOMAINVALUE"
              },
              "maxdomvalcond": {
                  "type": "array",
                  "items": {
                      "definition": {
                          "subSchema": {
                              "$ref": "http://localhost:9001/maximo/oslc/jsonschemas/mxapidomain/maxdomvalcond"
                          }
                      },
                      "type": "object"
                  },
                  "cardinality": "UNDEFINED",
                  "relation": "MAXDOMVALCOND"
              },
              "href": {
                  "type": "string"
              },
              "_id": {
                  "type": "string"
              },
              "domainid": {
                  "searchType": "WILDCARD",
                  "subType": "UPPER",
                  "title": "Domain",
                  "persistent": true,
                  "type": "string",
                  "remarks": "Domain Name",
                  "maxLength": 18
              },
              "synonymdomain": {
                  "type": "array",
                  "items": {
                      "definition": {
                          "subSchema": {
                              "$ref": "http://localhost:9001/maximo/oslc/jsonschemas/mxapidomain/synonymdomain"
                          }
                      },
                      "type": "object"
                  },
                  "cardinality": "UNDEFINED",
                  "relation": "SYNONYMDOMAIN"
              }
          },
          "required": [
              "domainid"
          ]
      },
      "href": "http://localhost:9001/maximo/oslc/os/mxapidomain?lean=1&oslc.select=domainid&oslc.where=domainid=%22WOSTATUS%22&addschema=1",
      "totalCount": 1
  }
};

export default statusitem;
