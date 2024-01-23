const resourceOutput = [
  {
    Body: [
      {
        Items: [
          {
            Resource: 'Cindy Lou',
            'Resource type': '<div>CARP <p>FIRSTCLASS</p></div>',
            Run: [
              {
                Class: 'AssignedSlot',
                Duration: 2,
                Start: 1692367200000,
                href: null,
                resourceid: 'LOU',
                resourcename: 'Cindy Lou',
                shiftnum: 'DAY',
                worksite: 'BEDFORD',
              },
              {
                Class: 'AssignedSlot',
                Duration: 1.5,
                Start: 1692374400000,
                href: null,
                resourceid: 'LOU',
                resourcename: 'Cindy Lou',
                shiftnum: 'DAY',
                worksite: 'BEDFORD',
              },
            ],
            Shift: 'DAY',
            Utilization: '78%',
          },
          {
            Resource: 'Katherine Storm',
            'Resource type': '<div>MECH</div>',
            Run: [
              {
                Class: 'AssignedSlot',
                Duration: 2.5,
                Start: 1692453600000,
                href: null,
                resourceid: 'STORM',
                resourcename: 'Katherine Storm',
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
                Start: 1692453600000,
                href: null,
                resourceid: 'BSTOHL1',
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

export default resourceOutput;
