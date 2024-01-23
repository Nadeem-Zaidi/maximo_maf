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
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-0031",
          requestnum: "1001",
          siteid: "BEDFORD",
          _rowstamp: "1234",
          item: [
            {
              lottype: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [
            {
              autocreated: true,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              _rowstamp: "123",
              _blkid: 1234,
            },
            {
              autocreated: false,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              _rowstamp: "123",
              _blkid: 1235,
            },
          ],
        },
      ],
      lotnum: "123",
      lottype: "lot",
      binnum: "123",
    },
  ],
};
export default data;
