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

import inspectionsDataCompleted from './data/inspections-data-completed';
import inspectionsDataPending from './data/inspections-data-pending';
import inspectionsDataInProg from './data/inspections-data-inprog';

it('sample data loads', () => {
  // we are just validating that all the data loads and is not null
  expect(inspectionsDataCompleted).not.toBeNull();
  expect(inspectionsDataPending).not.toBeNull();
  expect(inspectionsDataInProg).not.toBeNull();
});
