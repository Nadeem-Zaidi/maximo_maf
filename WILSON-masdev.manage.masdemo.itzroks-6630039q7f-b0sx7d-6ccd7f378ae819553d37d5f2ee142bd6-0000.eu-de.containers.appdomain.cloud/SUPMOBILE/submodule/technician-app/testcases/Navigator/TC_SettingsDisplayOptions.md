# Display options on Settings Button on Navigator

These test cases will verify display options in settings tile on Navigator and corresponding functionality for Technician app in online and offline modes on mobile containers.

These test cases will cover functionality of following user story:

- GRAPHITE-27293: [Split] Eli's tile/list settings are applied

**Design URL:**

- <https://ibm.invisionapp.com/share/VFO0E8LMJ82#/screens/319676253_Navigator_-_Settings>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify that technician can select the tile or list view for tablet in the app settings

**Pre-condition:**

App setting should be opened.

**Steps:**

Select the tile or list view format for tablet.

**Results:**

Technician should be able to select the tile or list view format for tablet.

## Scenario 2 - Verify that selected tile format for tablet in app setting is applied on work orders in Technician app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Open technician app in tablet with valid technician credentials.
2. Go to App settings.
3. Select Tile view format for tablet.
4. Click on "My Schedule" tile on navigator and open the list of work orders.
5. Search the work order and click chevron to open WO details page.
6. Check attachments and follow-up work.

**Results:**

Attachments and Follow-up work should appear in tile view.

## Scenario 3 - Verify that selected list format for tablet in app setting is applied on work orders in Technician app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Open technician app in tablet with valid technician credentials.
2. Go to App settings.
3. Select List view format for tablet.
4. Click on "My Schedule" tile on navigator and open the list of work orders.
5. Search the work order and click chevron to open WO details page.
6. Check attachments and follow-up work.

**Results:**

Attachments and Follow-up work should appear in list view.

## Scenario 4 - Verify that UI is displayed as per design

**Pre-condition:**

Pre-conditions as specified for above mentioned scenarios.

**Steps:**

Perform steps as specified for above mentioned scenarios.

**Results:**

Rendered UI should match with the UI design as specified in respective Design URL.

## Scenario 5 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned scenarios.

**Steps:**

Perform steps as specified for above mentioned scenarios.

**Results:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.
