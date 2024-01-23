const loader = (query) => {
  console.log('JSON Datasource LOADER', query);

  return Promise.resolve([
    {
      _id: 1,
      work_record: 'BSTA1133 (10)',
      issue: 'Utility pole damaged, electric line down',
      task: '3',
      description: 'Electrical and Mechanical Installation',
      duration: '1 hr',
      priority: '4',
      location: 'Plant A',
      date_assigned: '06/23/2022 at 11:48:10 AM',
      assigned_by: 'Auto',
      status: 'Dispatched',
    },
    {
      _id: 2,
      work_record: 'BSTA0092 (30)',
      issue: 'Utility line installation',
      task: '15',
      description: 'HVAC Installation',
      duration: '45 mins',
      priority: '6',
      location: 'Plant A',
      date_assigned: '06/23/2022 at 11:48:10 AM',
      assigned_by: 'Auto',
      status: 'In progress',
    },
    {
      _id: 3,
      work_record: 'BSTA1151 (20)',
      issue: 'Inspect tools, control drawings and renderings',
      task: '26',
      description: 'Utility Line Installation',
      duration: '4 hr',
      priority: '1',
      location: 'Plant B',
      date_assigned: '06/23/2022 at 11:48:10 AM',
      assigned_by: 'Mike Wilson',
      status: 'Dispatched',
    },
    {
      _id: 4,
      work_record: 'BSTA1098 (10)',
      issue: 'Electrical and mechanical installation',
      task: '31',
      description: 'HVAC Installation',
      duration: '8 hr',
      priority: '5',
      location: 'Plant B',
      date_assigned: '06/23/2022 at 11:48:10 AM',
      assigned_by: 'Auto',
      status: 'Dispatched',
    },
    {
      _id: 5,
      work_record: 'BSTA1151 (50)',
      issue: 'Install high range gamma meter',
      task: '66',
      description: 'HVAC Inspection',
      duration: '2 hr',
      priority: '7',
      location: 'Plant B',
      date_assigned: '06/23/2022 at 11:48:10 AM',
      assigned_by: 'Mike Wilson',
      status: 'Dispatched',
    },
  ]);
};

export default loader;