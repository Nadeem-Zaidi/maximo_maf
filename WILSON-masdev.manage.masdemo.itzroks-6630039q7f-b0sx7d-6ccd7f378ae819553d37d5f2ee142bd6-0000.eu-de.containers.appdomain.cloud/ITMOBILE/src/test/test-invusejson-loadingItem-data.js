/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
const data = {
  member: [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      invuselinenum: 1,
      invuselineid: 1,
      requestnum: "1001",
      invreserveid: "1",
      calqty: 1,
      glcreditacct: "6000-200-000",
      gldebitacct: "6000-200-000",
      refwo: "1006",
      location: "test",
      item: [
        {
          rotating: true,
        },
      ],
      invreserve: [
        {
          requestedby: "MAXADMIN",
          requestnum: "1001",
          item: [
            {
              rotating: true,
              conditionenabled: false,
            },
          ],
          requireddate: "2023-08-11T10:13:02+08:00",
          siteid: "BEDFORD",
        },
      ],
    },
  ],
};
export default data;
