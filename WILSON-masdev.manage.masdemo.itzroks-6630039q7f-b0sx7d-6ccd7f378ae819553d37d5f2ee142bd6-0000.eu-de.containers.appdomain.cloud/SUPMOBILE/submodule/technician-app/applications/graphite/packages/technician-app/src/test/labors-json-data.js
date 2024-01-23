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

let labor = {
  domain: [
    {
      domainid: "LTTYPE"
    }
  ],
  synonymdomain: [
    {
      value: "work",
      maxvalue: "work",
      description: "work"
    }
  ],
  craftrate: [
    {
      craft: "ELECT",
      skillleveldata: "SECONDCLASS",
      defaultcraft: true
    }
  ],
  labordetails: [
    {
      labtransid: "1234",
      startdate: "2020-10-22T00:00:00-04:00",
      transtype: "work",
      transtype_description: "desc",
      finishdate: "2020-10-22T00:00:00-04:00",
      regularhrs: "",
      starttime: "2020-10-30T01:00:00-04:00",
      finishtime: "2020-10-30T01:00:00-04:00"
    }
  ],
  labordetails1: [
    {
      labtransid: "1234",
      transtype: "work",
      transtype_description: "desc",
      startdate: "2020-10-22T00:00:00-04:00",
      finishdate: "2020-10-22T00:00:00-04:00",
      regularhrs: "hours",
      starttime: "01:10:00",
      finishtime: "01:15:00"
    }
  ],
  labordetails2: [
    {
      labtransid: "1234",
      transtype: "work",
      transtype_description: "desc",
      startdate: "2020-10-22T00:00:00-04:00",
      regularhrs: "hours",
      starttime: "01:10:00",
      labtrans: [
        {
          transtype: "work",
          transtype_description: "desc",
          startdate: "2020-10-22T00:00:00-04:00",
          regularhrs: "hours",
          timerstatus: "ACTIVE"
        }
      ]
    }
  ],
  reportworkLabords: [
    {
      labtransid: "1234",
      startdate: "2020-10-22T00:00:00-04:00",
      transtype: "work",
      laborcode: "SAM"
    }
  ],
  wodetails: [
    {
      workorderid: "1234",
      wonum: "1234",
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNTUyMQ--",
      labtranstolerance: "0:00",
      status_maxvalue:"APPR",
      status: "APPR"
    }
  ],
  labordata: [
    {
      laborcodedesc: "Hank Adams",
      _rowstamp: "8767877",
      personid: "ADAMS",
      href: "oslc/os/mxapilabor/_QURBTVMvRUFHTEVOQQ--",
      laborid: 140,
      orgid: "EAGLENA",
      laborcode: "ADAMS"
    },
    {
      laborcodedesc: "Rebecca Allen",
      _rowstamp: "130927",
      personid: "ALLEN",
      href: "oslc/os/mxapilabor/_QUxMRU4vRUFHTEVOQQ--",
      laborid: 15,
      orgid: "EAGLENA",
      laborcode: "ALLEN"
    }
  ]
};

export default labor;
