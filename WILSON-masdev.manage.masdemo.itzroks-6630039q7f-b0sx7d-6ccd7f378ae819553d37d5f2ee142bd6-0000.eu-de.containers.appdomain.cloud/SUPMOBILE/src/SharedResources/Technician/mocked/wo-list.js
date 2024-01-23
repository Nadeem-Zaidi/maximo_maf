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

let data = {
  member: [{
      description: 'Centrifugal Pump Oil Change',
      longdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget velit aliquet sagittis id consectetur purus ut. Faucibus et molestie ac feugiat. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Varius sit amet mattis vulputate enim nulla. Amet consectetur adipiscing elit ut aliquam purus sit amet. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Purus sit amet volutpat consequat mauris nunc congue. Faucibus pulvinar elementum integer enim neque volutpat. Aliquet sagittis id consectetur purus ut faucibus. Viverra nam libero justo laoreet sit amet cursus. Lacus viverra vitae congue eu consequat ac felis donec et. Convallis convallis tellus id interdum velit laoreet id. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Eget mauris pharetra et ultrices neque. Posuere ac ut consequat semper viverra nam. A arcu cursus vitae congue mauris.',
      pm: 'PM 1006',
      priority: 1,
      duedate: '05/05/2020',
      asset: 'Centrifugal Pump 100GPM/60FTHD',
      location: 'Main Boiler Room',
      tel: '12345',
      addressline1: 'Empire State, 20 W 34th',
      addressline3:' New York, NY',
      statusColor: 'green',
      statusIcon: 'carbon:arrow--up',
      points: 73,
      pointsColor: 'yellow'
    },
    {
      description: 'Generator Overhaul',
      longdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      pm: 'PM 1006',
      priority: 2,
      duedate: '2021-07-06T04:25:00.000-07:00',
      asset: '11230 Emergency Generator',
      location: 'Main Boiler Room',
      tel: '54321',
      addressline1: '123 Main Street',
      addressline3:' Orlando, FL',
      statusColor: 'green',
      statusIcon: 'carbon:arrow--up',
      points: 85,
      pointsColor: 'green'
    },
    {
      description: 'Conveyor Overhaul',
      longdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      pm: 'PM 1020',
      priority: 2,
      duedate: '20/08/2020',
      asset: '13140 Conveyor System - Pkg. Dept.',
      location: 'Main Boiler Room',
      tel: '54321',
      addressline1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

      statusColor: 'red',
      statusIcon: 'carbon:arrow--down',
      points: 23,
      pointsColor: 'red'
    },
    {
      description: 'Conveyor Overhaul',
      longdescription: 'Conveyor Overhaul',
      pm: 'PM 1020',
      priority: 2,
      duedate: '06/06/2020',
      asset: '13140 Conveyor System - Pkg. Dept.',
      location: 'Main Boiler Room',
      tel: '54321',
      addressline1: 'Empire State, 20 W 34th',
      addressline3:' Orlando, FL',
      statusColor: 'red',
      statusIcon: 'carbon:arrow--down',
      points: 25,
      pointsColor: 'red'
    }
  ],
  responseInfo: {
    schema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      resource: "MXAPIWODETAIL",
      description: "Maximo API for Work Orders with Plans and Reservations",
      pk: [
        "siteid",
        "wonum"
      ],
      title: "WORKORDER",
      type: "object",
      $ref: "http://localhost:7001/maximo/oslc/jsonschemas/mxapiwodetail",
      totalCount: 2,
      pagenum: 1,
      required: [
        "siteid",
        "wonum",
      ],
      properties: {
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
        description: {
          searchType: "TEXT",
          subType: "ALN",
          title: "Description",
          persistent: true,
          type: "string",
          remarks: "Describes the work order. To enter or view additional information, click the Long Description button.",
          maxLength: 100
        },
        pm: {
          searchType: "TEXT",
          subType: "ALN",
          title: "PM",
          persistent: true,
          type: "string",
        },
        priority: {
          searchType: "EXACT",
          subType: "INTEGER",
          title: "Priority",
          persistent: true,
          type: "integer",
          remarks: "Identifies the importance of the work order, from 0-999, where 0 is the lowest priority and 999 is the highest.",
          maxLength: 12
        },
        duedate: {
          searchType: "TEXT",
          subType: "ALN",
          title: "Due date",
          persistent: true,
          type: "string",
        },
        asset: {
          searchType: "TEXT",
          subType: "ALN",
          title: "Asset description",
          persistent: true,
          type: "string",
          remarks: "Describes the asset. To enter or view additional information, click the Long Description button.",
          maxLength: 100
        },
        location: {
          searchType: "TEXT",
          subType: "ALN",
          title: "Location description",
          persistent: true,
          type: "string",
          remarks: "Describes the storeroom location. To enter or view additional information, click the Long Description button.",
          maxLength: 100
        }
      }
    }
  }
}

data.member.forEach((el, ind) => {
  el.wonum = ind;
  el.siteid = 'EAGLENA';
});

export default data;
