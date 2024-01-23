const resourceItem = {
  member: [
    {
      restype: 'CARP',
      refobjname: 'LABOR',
      resourcelabor: [
        {
          laborcraftratedefault: {
            skilllevel: 'FIRSTCLASS',
          },
          laborcode: 'LOU',
        },
      ],
      skdresourcedispview: [
        {
          resourceid: 'LOU',
          worksite: 'BEDFORD',
          href: null,
          resourcename: 'Cindy Lou',
          shiftnum: 'DAY',
          start: '2023-08-18T14:00:00+00:00',
          duration: 2,
        },
        {
          resourceid: 'LOU',
          worksite: 'BEDFORD',
          href: null,
          resourcename: 'Cindy Lou',
          shiftnum: 'DAY',
          start: '2023-08-18T16:00:00+00:00',
          duration: 1.5,
        },
      ],
      objectname: 'CRAFT',
      name: 'Cindy Lou',
      initialized: false,
      utilization: 78,
      href: 'oslc/os/mxapiskdproject/_R0FOQVQxLzEwMTE-/SKDRESOURCE/1',
      shiftnum: 'DAY',
      id: 'LOU_EAGLENA',
      restypedesc: 'Carpenter',
      objectid: 63,
    },
    {
      restype: 'MECH',
      refobjname: 'LABOR',
      resourcelabor: [
        {
          laborcraftratedefault: {},
          laborcode: 'LOU',
        },
      ],
      skdresourcedispview: [
        {
          resourceid: 'STORM',
          worksite: 'BEDFORD',
          href: null,
          resourcename: 'Katherine Storm',
          shiftnum: 'DAY',
          start: '2023-08-19T14:00:00+00:00',
          duration: 2.5,
        },
      ],
      objectname: 'CRAFT',
      name: 'Katherine Storm',
      initialized: false,
      utilization: 78,
      href: 'oslc/os/mxapiskdproject/_R0FOQVQxLzEwMTE-/SKDRESOURCE/2',
      shiftnum: 'DAY',
      id: 'STORM_EAGLENA',
      restypedesc: 'Mechanic',
      objectid: 10,
    },
    {
      refobjname: 'AMCREW',
      resourceamcrew: [
        {
          amcrew: 'BSTOHL1',
        },
      ],
      skdresourcedispview: [
        {
          duration: 6,
          resourceid: 'BSTOHL1',
          start: '2023-08-19T14:00:00+00:00',
          href: null,
        },
      ],
      objectname: 'AMCREWT',
      initialized: false,
      utilization: 40,
      href: 'oslc/os/mxapiskdproject/_R0FOQVQxLzEwMTE-/SKDRESOURCE/3',
      shiftnum: 'DAY',
      id: 'BSTOHL1_BSTOHL_EAGLENA',
      restypedesc: 'Over Head Line Crew',
      objectid: 18,
    },
  ],
};

export default resourceItem;
