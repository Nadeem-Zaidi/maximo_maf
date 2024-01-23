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

import ReportWorkDataController from './ReportWorkDataController';
import { Application } from '@maximo/maximo-js-api';

it('computedItem should return correct value', async () => {
  const controller = new ReportWorkDataController();

  let title = controller.computedItem({
    itemnum: '6I-2499',
    description: 'Filter, Primary Air',
  });
  expect(title).toBe('6I-2499 Filter, Primary Air');

  title = controller.computedItem({
    itemnum: '6I-2499',
  });
  expect(title).toBe('6I-2499');

  title = controller.computedItem({
    description: 'Filter, Primary Air',
  });
  expect(title).toBe('Filter, Primary Air');
});

it('computedToolItem should return correct value', async () => {
  const controller = new ReportWorkDataController();

  let title = controller.computedToolItem({
    itemnum: '6I-2499',
    toolitem: {
      description: 'Filter, Primary Air',
    },
  });
  expect(title).toBe('Filter, Primary Air');

  title = controller.computedToolItem({
    itemnum: '6I-2499',
  });
  expect(title).toBe(null);

  title = controller.computedToolItem({
    toolitem: {
      description: 'Filter, Primary Air',
    },
  });
  expect(title).toBe('Filter, Primary Air');
});

it('computedItemDescription should return correct value', async () => {
  const controller = new ReportWorkDataController();

  let title = controller.computedItemDescription(
    '6I-2499',
    'Filter, Primary Air'
  );
  expect(title).toBe('6I-2499 Filter, Primary Air');

  title = controller.computedItemDescription('6I-2499');
  expect(title).toBe('6I-2499');

  title = controller.computedItemDescription('Filter, Primary Air');
  expect(title).toBe('Filter, Primary Air');
});

it('formattedLaborDate should return correct format date', async () => {
  const controller = new ReportWorkDataController();
  const app = new Application();
  await app.initialize();
  controller.onDatasourceInitialized('', '', app);

  let labTrans = {
    startdate : "2023-06-13T00:00:00+00:00",
    finishdate : "2023-06-14T00:00:00+00:00"
  };

  controller.formattedLaborDate(labTrans);
  expect(labTrans.computedstartdate).toBe('June 13, 2023');
  expect(labTrans.computedfinishdate).toBe('June 14, 2023');
});
