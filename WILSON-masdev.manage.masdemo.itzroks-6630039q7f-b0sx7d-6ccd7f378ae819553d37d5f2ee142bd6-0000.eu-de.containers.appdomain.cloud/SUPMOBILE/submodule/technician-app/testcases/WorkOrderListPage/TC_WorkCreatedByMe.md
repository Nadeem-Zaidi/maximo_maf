# "Work created by me" or "Work created on device" filter functionality on "My Schedule" page

These test cases will verify the list of work orders that are created by logged in technician under "Work created by me" view/filter on Technician webapp. It will list all work orders created by the technician in maximo.

These test cases will also verify the list of work orders that are created by logged in technician under "Work created on device" view/filter on Technician mobile app containers in online and offline mode. It will list all work orders created by the technician on that device only.

These test cases will cover functionalities of following user stories:

- GRAPHITE-34695: Eli can see work that he has created
- GRAPHITE-35234: [Split] Eli can see work that he has created

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify availability of "Work created by me" filter on work order list page for Technician webapp and "Work created on device" filter on work order list page for Technician mobile containers

**Steps:**

1. Login to technician webapp with the technician credentials.
2. Click on "My Schedule" tile.
3. Click on top left filter/view on WO list page.
4. Verify that "Work created by me" view option is available i web.
5. Verify that "Work created on device" view option is available in mobile.

**Result:**

"Work created by me" view option should be available in top left filter on work order list page in web.
"Work created on device" view option should be available in top left filter on work order list page in mobile.

## Scenario 2 - Verify that all work orders displayed in "Work created by me" view are reported by logged in technician only (Technician webapp only)

**Pre-condition:**

1. Login to maximo classic/manage with the technician credentials.
2. Go to "work order tracking" app.
3. Create multiple new work orders.

**Steps:**

1. Login to technician webapp with the technician credentials.
2. Click on "My Schedule" tile.
3. Select "Work created by me" view in top left filter on WO list page.
4. Verify the work order cards displayed on WO list page.

**Result:**

The above created work order cards should be displayed in "Work created by me" view and all WOs in the list are reported by logged in technician only.

## Scenario 3 - Verify that all work orders displayed in "Work created on device" view are reported by logged in technician on that mobile device only and no existing work orders are downloaded from server (Technician mobile containers only)

**Pre-condition:**

Delete/uninstall and reinstall maximo mobile app so that it is fresh install on the device.

**Steps:**

1. Login to technician container app with the technician credentials.
2. Click on "My Schedule" tile.
3. Select "Work created on device" view in top left filter on WO list page.
4. No work orders should be displayed in the list as no work orders are downloaded from maximo server.
5. Click on "+" button on navigator to open create work order page.
6. Provide description, priority and click save to create a new work order.
7. Refresh the "Work created on device" view or click on "Check updates" button.
8. Verify that newly created work order is displayed in "Work created on device" view.

**Result:**

- The above newly created work order card should be displayed in "Work created on device" view.
- WO cards reported by logged in technician on that mobile device are only displayed.
- No existing work orders reported by logged in technician are downloaded from server.

## Scenario 4 - Verify that work orders with status other than CLOSE/CAN/COMP are displayed in "Work created by me" filter/view (Technician webapp only)

**Pre-condition:**

1. Login to maximo classic/manage with the technician credentials.
2. Go to "work order tracking" app.
3. Create multiple new work orders.
4. Change WO status so that there is at least one work order for each possible status in maximo.

**Steps:**

1. Login to technician webapp with the technician credentials.
2. Click on "My Schedule" tile.
3. Select "Work created by me" view in top left filter on WO list page.
4. Verify the work order cards displayed on WO list page.

**Result:**

- All work orders with status other than CLOSE/CAN/COMP should be displayed.
- No work order with status as CLOSE/CAN/COMP should be displayed.

## Scenario 5 - Verify that work order is removed from "Work created by me" filter/view when work order status is changed to either of CLOSE/CAN/COMP (Technician webapp and containers)

**Pre-condition:**

1. Login to maximo classic/manage with the technician credentials.
2. Go to "work order tracking" app.
3. Create multiple new work orders.

**Steps:**

1. Login to technician webapp with the technician credentials.
2. Click on "My Schedule" tile.
3. Select "Work created by me" view in top left filter on WO list page.
4. Verify the work order cards are displayed on WO list page.
5. Change WO status to either of CLOSE/CAN/COMP.
6. Verify that work order is removed from "Work created by me" filter/view.
7. Click on "My Schedule" tile.
8. Click on "+" button on navigator to open create work order page.
9. Provide description, priority and click save to create a new work order.
10. Select "Work created on device" view in top left filter on WO list page.
11. The newly created work order is displayed in "Work created on device" view.
12. Change WO status to either of CLOSE/CAN/COMP.
13. Verify that work order is removed from "Work created on device" filter/view.

**Result:**

Work order should be removed from "Work created by me" filter/view when WO status is changed to CLOSE/CAN/COMP for both webapp and mobile containers.

## Scenario 6 - Verify that the work order created on device or web is available in "Work created by me" filter/view in browsers upon syncing with the maximo server

**Steps:**

1. Login to technician container app with the technician credentials.
2. Click on "My Schedule" tile.
3. Click on "+" button on navigator to open create work order page.
4. Provide description, priority and click save to create a new work order.
5. Select "Work created on device" view in top left filter on WO list page.
6. The newly created work order is displayed in "Work created on device" view.
7. Click "Check updates" button so that the newly created work order is synced with maximo server and Maximo generated WO# is assigned to work order.
8. Login to technician webapp with the technician credentials.
9. Click on "My Schedule" tile.
10. Select "Work created by me" view in top left filter on WO list page.
11. Search for maximo generated WO# in the WO cards list.

**Result:**

- The work order created on device should be available in "Work created by me" filter/view in browsers upon syncing with the maximo server.
- Work orders created on mobile should be reflected in web under same filter and viceversa.

## Scenario 7 - Verify all the above test scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Login to technician-app with the technician assigned to work order.
2. Navigate and perform above mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 8 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
