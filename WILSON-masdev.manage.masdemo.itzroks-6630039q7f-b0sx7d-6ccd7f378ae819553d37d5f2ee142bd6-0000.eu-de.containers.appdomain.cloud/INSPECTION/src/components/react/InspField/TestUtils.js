/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

export const fieldTextInput = {
  fieldtype: 'TR',
  fieldtype_maxvalue: 'TR',
  inspfieldid: 1,
  visible: true,
  inspfieldnum: '2327', 
  inspquestionnum:'1234'
};

export const fieldSingleOption = {
  fieldtype: 'SO',
  fieldtype_maxvalue: 'SO',
  inspfieldid: 1,
  inspfieldoption: [
    {
      inspfieldoptionid: 1,
      description: 'description1'
    },
    {
      inspfieldoptionid: 2,
      description: 'description2'
    },
    {
      inspfieldoptionid: 3,
      description: 'description3'
    },
    {
      inspfieldoptionid: 4,
      description: 'description4'
    },
    {
      inspfieldoptionid: 5,
      description: 'description5'
    }
  ],
  visible: true
};

export const fieldMultipleChoice = {
  fieldtype: 'MO',
  fieldtype_maxvalue: 'MO',
  inspfieldid: 1,
  inspfieldoption: [
    {
      inspfieldoptionid: 1,
      description: 'description1'
    },
    {
      inspfieldoptionid: 2,
      description: 'description2',
      inspectorFeedback:'test2'
    },
    {
      inspfieldoptionid: 3,
      description: 'description3',
      inspectorFeedback:'test3'
    },
    {
      inspfieldoptionid: 4,
      description: 'description4'
    },
    {
      inspfieldoptionid: 5,
      description: 'description5'
    }
  ],
  visible: true
};


export const  fieldSingleChoiceSynonymDomain = {
  fieldtype: 'SOD',
  fieldtype_maxvalue: 'SOD',
  inspfieldid: 1,
  domain: [ {
    synonymdomain:[
      {
        inspfieldoptionid: 1,
        value: 'v1',
        description: 'description1'
      },
      {
        inspfieldoptionid: 2,
        description: 'description2',
        value: 'v2',
        inspectorFeedback:'test2'
      },
      {
        inspfieldoptionid: 3,
        description: 'description3',
        value: 'v3',
        inspectorFeedback:'test3'
      },
      {
        inspfieldoptionid: 4,
        value: 'v4',
        description: 'description4'
      },
      {
        inspfieldoptionid: 5,
        value: 'v5',
        description: 'description5'
      }
    ]
  }],
  visible: true
};

export const  fieldSingleChoiceALNDomain = {
  fieldtype: 'SOD',
  fieldtype_maxvalue: 'SOD',
  inspfieldid: 1,
  domain: [ {
    alndomainvalue:[
      {
        inspfieldoptionid: 1,
        value: 'v1',
        description: 'description1'
      },
      {
        inspfieldoptionid: 2,
        value: 'v2',
        description: 'description2',
        inspectorFeedback:'test2'
      },
      {
        inspfieldoptionid: 3,
        value: 'v3',
        description: 'description3',
        inspectorFeedback:'test3'
      },
      {
        inspfieldoptionid: 4,
        value: 'v4',
        description: 'description4'
      },
      {
        inspfieldoptionid: 5,
        value: 'v5'
      }
    ]
  }],
  visible: true
};

export const fieldMultipleChoiceALNDomain = {
  fieldtype: 'MOD',
  fieldtype_maxvalue: 'MOD',
  inspfieldid: 1,
  domain: [ {
    alndomainvalue:[
      {
        inspfieldoptionid: 1,
        value: 'v1',
        description: 'description1'
      },
      {
        inspfieldoptionid: 2,
        value: 'v2',
        description: 'description2',
        inspectorFeedback:'test2'
      },
      {
        inspfieldoptionid: 3,
        value: 'v3',
        description: 'description3',
        inspectorFeedback:'test3'
      },
      {
        inspfieldoptionid: 4,
        value: 'v4',
        description: 'description4'
      },
      {
        inspfieldoptionid: 5,
        value: 'v5'
      }
    ]
  }],
  visible: true
};

export const fieldMultipleChoiceSynonymDomain = {
  fieldtype: 'MOD',
  fieldtype_maxvalue: 'MOD',
  inspfieldid: 1,
  domain: [ {
    synonymdomain:[
      {
        inspfieldoptionid: 1,
        value: 'v1',
        description: 'description1'
      },
      {
        inspfieldoptionid: 2,
        description: 'description2',
        value: 'v2',
        inspectorFeedback:'test2'
      },
      {
        inspfieldoptionid: 3,
        description: 'description3',
        value: 'v3',
        inspectorFeedback:'test3'
      },
      {
        inspfieldoptionid: 4,
        value: 'v4',
        description: 'description4'
      },
      {
        inspfieldoptionid: 5,
        value: 'v5',
        description: 'description5'
      }
    ]
  }],
  visible: true
};

export const fieldDateInput = {
  fieldtype: 'DO',
  fieldtype_maxvalue: 'DO',
  inspfieldid: 1,
  visible: true
};

export const fieldDateTimeInput = {
  fieldtype: 'DT',
  fieldtype_maxvalue: 'DT',
  inspfieldid: 1,
  visible: true
};

export const fieldTimeInput = {
  fieldtype: 'TO',
  fieldtype_maxvalue: 'TO',
  inspfieldid: 1,
  visible: true
};

export const fieldNumberInput = {
  inspfieldnum: '2327', 
  fieldtype: 'SE',
  fieldtype_maxvalue: 'SE',
  inspfieldid: 1,
  visible: true
};

export const fieldResultSchema = {
  properties: {
    numresponse: {
      searchType: 'EXACT',
      scale: 2,
      subType: 'DECIMAL',
      title: 'Numeric Response',
      persistent: true,
      type: 'number',
      remarks: 'The provided numeric response to the form question',
      maxLength: 16,
      max: 9999999999999,
      relation: 'INSPFIELDRESULT'
    },
    txtresponse: {
      searchType: 'WILDCARD',
      subType: 'ALN',
      title: 'Text Response',
      persistent: true,
      type: 'string',
      remarks: 'The provided ALN response to the form question',
      maxLength: 250,
      relation: 'INSPFIELDRESULT'
    }
  }
};

export const fieldCharacteristicMeter = {
  fieldtype: 'MM',
  fieldtype_maxvalue: 'MM',
  inspfieldid: 1,
  metertype: 'CHARACTERISTIC',
  metertype_maxvalue: 'CHARACTERISTIC',
  alndomain: [
    {
      valueid: 'OILCOLOR|BROWN',
      description: 'Brown',
      value: 'BROWN'
    },
    {
      valueid: 'OILCOLOR|CLEAR',
      description: 'Clear',
      value: 'CLEAR'
    },
    {
      valueid: 'OILCOLOR|DBROWN',
      description: 'Dark Brown',
      value: 'DBROWN'
    },
    {
      valueid: 'OILCOLOR|LBROWN',
      description: 'Light Brown',
      value: 'LBROWN'
    },
    {
      valueid: 'OILCOLOR|RED',
      description: 'Red',
      value: 'RED'
    },
    {
      valueid: 'OILCOLOR|TURBID',
      description: 'Turbid',
      value: 'TURBID'
    }
  ]
};

export const fieldAttachmentInput = {
  fieldtype: 'FU',
  fieldtype_maxvalue: 'FU',
  inspfieldid: 1,
  visible: true
};

export const fieldSignatureInput = {
  fieldtype: 'SIG',
  fieldtype_maxvalue: 'SIG',
  inspfieldid: 1,
  visible: true
}

export const doclinkData = {
  member: [
    {
      href: './DevelopmentCodeChecklist.doc',
      localref:
        'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/0-255',
      describedBy: {
        identifier: '255',
        fileName: 'DevelopmentCodeChecklist.doc',
        upload: false,
        docType: 'Attachments',
        created: '2020-11-04T10:23:48-04:00',
        changeby: 'WILSON',
        format: {
          href: 'http://purl.org/NET/mediatypes/application/msword',
          label: 'application/msword'
        },
        show: false,
        description: 'MSWord Checklist',
        ownerid: 219,
        ownertable: 'WORKORDER',
        title: 'REVIEWDOC',
        copylinktowo: false,
        docinfoid: 237,
        urlType: 'FILE',
        createby: 'WILSON',
        attachmentSize: 227840,
        getlatestversion: true,
        printthrulink: true,
        modified: '2020-10-04T10:24:42-04:00',
        about:
          'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/meta/255',
        addinfo: false
      }
    },
    {
      href: './beach.mp4',
      localref:
        'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/2-275',
      describedBy: {
        identifier: '275',
        fileName: 'beach.mp4',
        upload: false,
        docType: 'Attachments',
        created: '2020-10-01T09:35:04-04:00',
        changeby: 'MAXADMIN',
        format: {
          href: 'http://purl.org/NET/mediatypes/video/mp4',
          label: 'video/mp4'
        },
        show: false,
        description: 'Sample beach video',
        ownerid: 219,
        ownertable: 'WORKORDER',
        title: 'Beach clip',
        copylinktowo: false,
        docinfoid: 257,
        urlType: 'FILE',
        createby: 'MAXADMIN',
        attachmentSize: 574823,
        getlatestversion: true,
        printthrulink: false,
        modified: '2020-10-05T09:35:58-04:00',
        about:
          'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/meta/275',
        addinfo: false
      }
    },
    {
      href: './pole.jpg',
      localref:
        'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/0-235',
      describedBy: {
        identifier: '235',
        fileName: 'utilitypole.jpg',
        upload: false,
        docType: 'Attachments',
        created: '2020-09-30T15:54:54-04:00',
        changeby: 'ED',
        format: {
          href: 'http://purl.org/NET/mediatypes/image/jpeg',
          label: 'image/jpeg'
        },
        show: false,
        description: 'Utility Pole',
        ownerid: 219,
        ownertable: 'WORKORDER',
        title: 'Power line pole',
        copylinktowo: false,
        docinfoid: 217,
        urlType: 'FILE',
        createby: 'ED',
        attachmentSize: 833614,
        getlatestversion: true,
        printthrulink: true,
        modified: '2020-09-30T15:54:54-04:00',
        about:
          'http://localhost:7001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks/meta/235',
        addinfo: false
      }
    }
  ],
  href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xMDQx/doclinks'
};

export const fieldContinuousMeter = {
  inspfieldnum: '2327', 
  inspquestionnum:'1234',
  fieldtype: 'MM',
  fieldtype_maxvalue: 'MM',
  inspfieldid: 1,
  metertype: 'CONTINUOUS',
  metertype_maxvalue:'CONTINUOUS',
  metername: 'CONTMT1'
};

export const fieldGaugeMeter = {
  inspfieldnum: '2327', 
  inspquestionnum:'1234',
  fieldtype: 'MM',
  fieldtype_maxvalue: 'MM',
  inspfieldid: 1,
  metertype: 'GAUGE',
  metertype_maxvalue:'GAUGE',
  metername: 'GAUGEMT2'
};
