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

/**
 * Test data to provide ALN domain values
 */

/* istanbul ignore next */
export const domainOptions = [
  {
    alndomainid_localized: '1,507',
    _rowstamp: '1242',
    valueid: 'BAD_TIE|2 consecutive',
    description: '2 consecutive defective ties',
    _id: 'BAD_TIE-~NULL~-~NULL~-2_consecutive',
    value: '2 consecutive',
    alndomainid: 1507
  },
  {
    alndomainid_localized: '1,508',
    _rowstamp: '1243',
    valueid: 'BAD_TIE|3 consecutive',
    description: '3 consecutive defective ties',
    _id: 'BAD_TIE-~NULL~-~NULL~-3_consecutive',
    value: '3 consecutive',
    alndomainid: 1508
  },
  {
    alndomainid_localized: '1,509',
    _rowstamp: '1244',
    valueid: 'BAD_TIE|4 wthin 39 ft',
    description: '4 defective ties within 39 feet',
    _id: 'BAD_TIE-~NULL~-~NULL~-4_wthin_39_ft',
    value: '4 wthin 39 ft',
    alndomainid: 1509
  },
  {
    alndomainid_localized: '1,510',
    _rowstamp: '1245',
    valueid: 'BAD_TIE|6 within 39 ft',
    description: '6 defective ties within 39 feet',
    _id: 'BAD_TIE-~NULL~-~NULL~-6_within_39_ft',
    value: '6 within 39 ft',
    alndomainid: 1510
  },
  {
    alndomainid_localized: '1,511',
    _rowstamp: '1246',
    valueid: 'BAD_TIE|Joint tie - center & shoulder',
    description: 'The center and one of the two shoulder ties is defective',
    _id: 'BAD_TIE-~NULL~-~NULL~-Joint_tie_-_center_&_shoulder',
    value: 'Joint tie - center & shoulder',
    alndomainid: 1511
  },
  {
    alndomainid_localized: '1,512',
    _rowstamp: '1247',
    valueid: 'BAD_TIE|Supported joint',
    description: '2 of 3 ties in a supported joint are defective',
    _id: 'BAD_TIE-~NULL~-~NULL~-Supported_joint',
    value: 'Supported joint',
    alndomainid: 1512
  }
];

/* istanbul ignore next */
const lookupData = {
  maxtype_description: 'AlphaNumeric',
  maxtype: 'ALN',
  internal: 0,
  description: 'Observation for rail inspection of ties (sleepers)',
  scale: 0,
  _rowstamp: '218518',
  domaintype: 'ALN',
  length_localized: '50',
  maxdomainid: 720,
  scale_localized: '0',
  internal_description:
    'The domain is not internal, can be modified and is localizable',
  maxdomainid_localized: '720',
  length: 50,
  alndomain: domainOptions,
  internal_localized: '0',
  domaintype_description: 'AlphaNumeric Domain',
  _id: 'BAD_TIE'
};

export default lookupData;
