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
      title: 'Main Pump',
      description:
        'The centrifugal pump oil changed must be performed every 3 months to meet manufacturer warranty conditions. Perform the oil change according to the manufaturers recommended guidelines, which are documented in the steps...',
      install_date: 'January 16, 2017',
      status: 'Approved',
      est_end_of_life: '4 years',
      next_PM: '117 days',
      next_failure: '57 days',
      location: 'Main Boiler Room',
      service_address: '41 Service Road',
      number: '73',
      priority: '1',
      asset: 'Centrifugal Pump 100GPM/60FTHD',
      parent_asset: 'Main Flow Regulator',
      inspection_count: '12',
      maintenance_logs_count: '21',
      operating_entries_count: '8',
      failures_count: '11'
    }
  ]
};

data.member.forEach((el, ind) => {
  el.assetnum = ind;
});

export default data;
