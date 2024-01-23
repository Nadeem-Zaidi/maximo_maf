const resourceNoNameOutput = [
  {
    Body: [
      {
        Items: [
          {
            Resource: 'PORTER',
            Run: [
              {
                Class: 'AssignedSlot',
                Duration: 2,
                Start: 1692540000000,
                href: null,
                resourceid: 'PORTER',
                resourcename: 'Andrew Porter',
                shiftnum: 'DAY',
                worksite: 'BEDFORD',
              },
            ],
            Shift: 'DAY',
            Utilization: '78%',
          },
          {
            Resource: 'BSTOHL1',
            Run: [
              {
                Class: 'AssignedSlot',
                Duration: 6,
                Start: 1692540000000,
                href: null,
                resourceid: 'BSTOHL1',
                resourcename: 'Over Head Line Crew 1',
                shiftnum: 'DAY',
              },
            ],
            Shift: 'DAY',
            Utilization: '40%',
          },
        ],
      },
    ],
  },
];

export default resourceNoNameOutput;
