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
    member: [
      {
        title: 'Centrifugal Pump Oil Change',
        description:
          'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
        problem_code: 'Unreported',
        failure_class: 'Pumps',
        status: 'Approved',
        date: 'March 16, 2020 8:30 AM to 1:30 PM',
        duration: '4 hours, 30 minutes',
        type: 'Scheduled data and duration',
        location: 'Main Boiler Room',
        number: '73',
        priority: '1',
        asset: 'Centrifugal Pump 100GPM/60FTHD'
      }
    ]
  };
  
  data.member.forEach((el, ind) => {
    el.wonum = ind;
  });
  
  export default data;
  
