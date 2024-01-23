/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2020, 2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


let data = {
  "member": [
    {
      "_rowstamp": "1282193",
      "creationdate": "2022-06-22T13:45:04-04:00",
      "clientcert": false,
      "apikey": "abcabcabc",
      "apikeytokenid": 5,
      "expiration": -1,
      "href": "oslc/os/mxapiapikey/12345",
      "userid": "MAXADMIN"
    },
    {
      "_rowstamp": "1853630",
      "creationdate": "2022-07-13T11:12:16-04:00",
      "clientcert": false,
      "apikey": "abcabcabc1",
      "apikeytokenid": 14,
      "expiration": -1,
      "href": "oslc/os/mxapiapikey/1234",
      "userid": "ANDY"
    }
  ],
  "href": "oslc/os/mxapiapikey",
  "responseInfo": {
    "href": "oslc/os/mxapiapikey"
  }
};
  
data.member.forEach(el => {
  el.duedate = new Date();
})

export default data;
  
