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

import InspectionInformationDataController from '../InspectionInformationDataController';

it('_computeFormName returns correct value', async () => {
  const controller = new InspectionInformationDataController();

  let computedValue = controller._computeFormName({
    inspectionform: {
      name: 'FormTest'
    }
  });
  expect(computedValue).toBe('FormTest');

  computedValue = controller._computeFormName({});
  expect(computedValue).toBeNull();

  computedValue = controller._computeFormName({
    name: 'FormTest'
  });
  expect(computedValue).toBe('FormTest');

  computedValue = controller._computeFormName({
    name: null
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeFormName();
  expect(computedValue).toBeNull();
});

it('_computeLongDescription returns correct value', async () => {
  const controller = new InspectionInformationDataController();

  let computedValue = controller._computeLongDescription({
    inspectionform: {
      description_longdescription: 'Instructions'
    }
  });
  expect(computedValue).toBe('Instructions');

  computedValue = controller._computeLongDescription({
    inspectionform: {
      description_longdescription: null
    }
  });
  expect(computedValue).toBeNull();

  computedValue = controller._computeLongDescription({});
  expect(computedValue).toBeNull();

  computedValue = controller._computeLongDescription();
  expect(computedValue).toBeNull();
});
