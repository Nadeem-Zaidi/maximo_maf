# View, enter new and old readings for primary asset/location meters on work order list and details page

These test cases will verify the meter functionality in asset and location section on 'Work order details' page on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-20975: Eli accesses meters from the asset and location widget
- GRAPHITE-9517: Eli can quickly access meter readings
- GRAPHITE-22713: Eli can quickly enter continuous meter readings with roll overs
- GRAPHITE-20774: Eli can quickly enter continuous meter readings with no roll over
- GRAPHITE-23661: [Split 20774] Eli can quickly enter continuous meter readings with no roll over
- GRAPHITE-22495: Eli can quickly enter gauge meter readings
- GRAPHITE-23616: [Split 22495] Eli can quickly enter gauge meter readings
- GRAPHITE-9509: Eli can quickly enter characteristic meter readings
- GRAPHITE-40410: [DUX] Confirm the revised meter designs are implemented
- GRAPHITE-56719: Record Measurements with Work order tasks
- GRAPHITE-56739: Record Observations with Work order tasks
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

**Design URL:**

- GRAPHITE-20975: <https://ibm.invisionapp.com/share/FZO0Z3QA72D#/screens/319895286_Multiple_Assets_And_Locations>
- GRAPHITE-9517: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603167>
- GRAPHITE-22713: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603168>
- GRAPHITE-20774: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603168>
- GRAPHITE-23661: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603168>
- GRAPHITE-22495: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603168>
- GRAPHITE-23616: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603168>
- GRAPHITE-9509: <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319603168>
- GRAPHITE-40410: <https://jsw.ibm.com/secure/attachment/4229979/image.png>
- GRAPHITE-56719: <https://www.figma.com/file/RAPUxZUIzaPZonCgW1udeP/Technician?node-id=725%3A42842&t=GanqPGA8vupeyBjh-0>
- GRAPHITE-56739: <https://www.figma.com/file/RAPUxZUIzaPZonCgW1udeP/Technician?node-id=725%3A42842&t=GanqPGA8vupeyBjh-0>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for updates' button in both online and offline modes.

## Scenario 1 - Verify that the meters touch-point is displayed in 'Assets and locations' section on WO details page when meter is associated with WO asset and/or location

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Search newly created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Verify that the meters touch-point is displayed in WO details page.
7. Verify that the meters touch-point is not displayed when meter is not assosiated with asset or location.

**Results:**

- The meters touch-point should be displayed in 'Assets and locations' section on WO details page when meter is associated with WO asset and/or location.
- The meters touch-point shouldn't be displayed in 'Assets and locations' section on WO details page when no meter is associated with WO asset and location.

**Note:**

Perform this scenario on WO list and WO details by associating asset/location and removing asset/location from meters.

## Scenario 2 - Verify that meters sliding drawer is displayed when technician taps on the meter touch-point and also validate the asset and location names as the section headers on the meters sliding drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open WO details page.
6. Click on meters touch-point.
7. Verify that meters sliding drawer is displayed.
8. Verify asset and location names as the header section in the meters sliding drawer.
9. Verify the 'new meter reading(+)' and 3 dot menu buttons are displayed on the header in meters sliding drawer.
10. Click on 3 dot menu and verify 'Enter old readings(>)' button is displayed.
11. Verify the asset meters are present in the asset section and location meters are present in the Location section.
12. Verify that technician can close the sliding drawer by clicking on the X.

**Results:**

- The meters sliding drawer should be displayed when technician taps on the meter touch-point.
- Asset and Location names appear as headers in the meters sliding drawer.
- The 'new meter reading(+)' and 3 dot menu buttons should be displayed on the header in meters sliding drawer.
- 'Enter old readings' button should be displayed when technician clicks on the 3 dot menu button.
- Asset section has the asset meters and Location section has the location meters.
- Technician should be able to close the sliding drawer by clicking on the X.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 3 - Verify that asset section is not displayed on meters sliding drawer when meters are not associated with WO asset or asset is not added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and do not associate meter to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Verify that the asset section is not displayed in meters sliding drawer.
8. Verify that location meters are displayed in the Location section.

**Results:**

- The asset section should not be displayed in meters sliding drawer.
- Only Location section with the location meters should be displayed in the meters sliding drawer.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 4 - Verify that location section is not displayed on meters sliding drawer when meters are not associated with WO location or location is not added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and do not associate meter to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Verify that the location section is not displayed in meters sliding drawer.
8. Verify that asset meters are displayed in the Asset section.

**Results:**

- The location section should not be displayed in meters sliding drawer.
- Only Asset section with the asset meters should be displayed in the meters sliding drawer.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).


## Scenario 5 - Verify the meter fields displayed in the asset and location meters on the meters sliding drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Verify the fields displayed in the asset and location meters.

**Results:**

Asset and location meters display the following fields:

- Meter Name, unit of Measure Description/ID, date and time of the last reading and the meter reading value.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 6 - Click on new meter reading button(+) and verify 'Enter readings' sliding drawer is opened

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+) and verify 'Enter readings' sliding drawer is opened.

**Results:**

- 'Enter readings' sliding drawer should be opened when technician clicks on new meter reading button(+).
- Save/checkmark button should be disabled.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 7 - Verify save/checkmark button is enabled when technician enters a valid meter reading in any of the associated meter

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+) and enter a valid meter reading in any of associated meter.
8. Verify 'Save/checkmark' button is enabled.

**Results:**

- Save/checkmark button should be enabled when technician enters a valid meter reading in any of the associated meter.
- Save/checkmark button should be disabled again when technician remove meter readings from all associated meters.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 8 - Verify 'Save/checkmark' button is disabled when technician enters an invalid meter reading in any of the associated meter

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate continuous meters with rollover value to it.
3. Go to location, create a location and associate continuous meters with rollover value to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+) and enter an invalid meter reading in any of associated continuous meter with rollover value e.g. enter meter reading greater than the roll over value (or) enter new meter reading value less than the last meter reading.
8. Verify an error message is displayed and 'Save/checkmark' button is disabled.

**Results:**

'Save/checkmark' button should be disabled when technician enters an invalid meter reading in any of the associated meter.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 9 - Verify save and discard dialog is displayed when technician clicks on close(X) button without saving entered meter readings

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+) and enter a valid meter reading.
8. Click on close(X) button.
9. Verify save and discard dialog is displayed.
10. Click on various buttons on save and discard dialog.

**Results:**

- Save and discard dialog should be displayed when technician clicks on close(X) button without saving entered meter readings.
- Entered meter readings are saved successfully and technician is navigated back to meters sliding drawer, if technician clicks 'Save' button.
- Entered meter readings are discarded and technician is navigated back to meters sliding drawer, if technician clicks 'Discard' button.
- Entered meter readings are displayed as it is and technician stays on 'Enter readings' sliding drawer, if technician clicks 'x' button.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).


**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 10 - Verify that exact date and time when meter reading is entered in the field is captured when technician clicks on 'Save' button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+) and enter a valid meter reading.
8. Click on Save/checkmark button.
9. Verify that exact date and time when meter reading is entered in the field is captured.

**Results:**

- Exact date and time when meter reading is entered in the field should be captured when technician clicks on 'Save' button.
- It should be displayed on meters sliding drawer along with entered meter reading value for the meter.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 11 - Verify that different date and time values are saved for the meter readings for different meters depending on the entered reading date and time in the fields

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+) and enter a valid meter reading.
8. Wait for a minute and enter a valid meter reading for a different meter.
9. Click on Save/checkmark button.
10. Verify date and time captured are different for these entered meter readings for these meters.

**Results:**

- Different date and time values should be saved for the meter readings for different meters depending on the entered reading date and time in the fields.
- It should be displayed on meters sliding drawer along with entered meter reading value for the meters.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 12 - Verify date and time fields are available for entering old meter readings on 'Enter old readings' drawer and technician can save past meter readings on 'Enter old readings' drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on 3 dot menu and click on 'Enter old readings' button.
8. Enter date and time which is prior to the last meter reading or later than last meter reading but prior to current date and time.
9. Enter valid meter reading. Click on save/checkmark button.
10. Verify technician can save past meter readings on 'Enter old readings' drawer.


**Results:**

- Date and time fields should be available for entering old meter readings on 'Enter old readings' drawer.
- Date and time fields should be displayed with current date and time by default.
- Technician should be able to save past meter readings (reading date and time which is prior to 
the last meter reading or later than last meter reading but prior to current date and time) on 'Enter old readings' drawer.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 13 - Verify technician can not save old meter readings without date and time or with date and time in future on 'Enter old readings' drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on 3 dot menu and click on 'Enter old readings' button.
8. Remove default date and time or enter date and time in future.
9. Enter meter reading.
10. Verify technician can not save old meter readings without date and time or with date and time in future.

**Results:**

Technician shouldn't be able to save old meter readings without date and time or with date and time in future on 'Enter old readings' drawer.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 14 - Verify that technician can save the meter readings when current reading is more than last meter reading for continuous meter on 'Enter readings' drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate continuous meters to it.
3. Go to location, create a location and associate continuous meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on meters touch-point on work order card to open meters sliding drawer.
6. Click on new meter reading button(+) and enter a valid meter reading more than the last meter reading.
7. Verify that technician can save the meter readings when current reading is more than last meter reading for continuous meter.

**Results:**

Technician should be able to save the meter readings when current reading is more than last meter reading for continuous meter.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 15 - Verify that technician can't save the meter readings when entered reading is less than last meter reading for continuous meter without rollover value set

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate continuous meters without rollover value to it.
3. Go to location, create a location and associate continuous meters without rollover value to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on meters touch-point on work order card to open meters sliding drawer.
6. Click on new meter reading button(+) and enter a meter reading less than the last meter reading.
7. Verify that technician can't save the meter readings when entered reading is less than last meter reading for continuous meter without rollover value set.

**Results:**

- System should not allow technician to save the meter readings when entered reading is less than last meter reading for continuous meter without rollover value set.
- An error message should be displayed.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 16 - Verify that technician can save the meter readings when entered reading is less than last meter reading for continuous meter with rollover value set

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate continuous meters with rollover value to it.
3. Go to location, create a location and associate continuous meters with rollover value to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on meters touch-point on work order card to open meters sliding drawer.
6. Click on new meter reading button(+) and enter a meter reading less than the last meter reading.
7. Verify that technician can save the meter readings when entered reading is less than last meter reading for continuous meter with rollover value set.

**Results:**

- A popup message stating that entered meter reading is less than the last meter reading and whether it is a rollover reading with Yes/No button should be displayed.
- Entered value should be accepted for the meter if technician clicks on Yes button.
- Entered value should be discarded for the meter if technician clicks on No button.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 17 - Verify that technician can't save meter reading which is more than rollover value for continuous meter

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate continuous meters with rollover value to it.
3. Go to location, create a location and associate continuous meters with rollover value to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on meters touch-point on work order card to open meters sliding drawer.
6. Click on new meter reading button(+) and enter a meter reading more than the meter rollover value.
7. Verify that technician can't save the meter readings when entered reading is more than the meter rollover value for continuous meter.

**Results:**

- System should not allow technician to enter/save more than meter rollover value. Rollover value should be highest value which can be accepted for continuous meter.
- An error message should be displayed stating that 'Readings cannot exceed rollover values. The entered meter reading is greater than the rollover point value'.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 18 - Verify technician can not save old meter readings when date and time is later than last meter reading but value is less than the last meter reading on 'Enter old readings' drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate continuous meters to it.
3. Go to location, create a location and associate continuous meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter.
5. Click on the chevron on work order card to open work order details page.
6. Click on meters touch-point to open meters sliding drawer.
7. Click on new meter reading button(+), enter a valid meter reading and save it.
8. Click on 3 dot menu and click on 'Enter old readings' button.
9. Enter date and time later than last meter reading.
10. Enter meter reading less than last meter reading.
11. Verify technician can not save old meter readings when date and time is later than last meter reading but value is less than the last meter reading.

**Results:**

Technician shouldn't be able to save old meter readings when date and time is later than last meter reading but value is less than the last meter reading on 'Enter old readings' drawer.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 19 - Verify that new/old meter readings are displayed when new/old meter readings are added to meters in meter group and meter group is associated with asset or location in the work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate high number of meters to it.
3. Go to location, create a location and associate high number of meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Add new or old meter readings for the meters associated with asset and location of the work order.
6. Verify that new/old meter readings are added to meters in meter group.
7. Verify that meters are displayed as scrollable list for entering new or old meter readings in the sliding drawer.

**Results:**

- New/old meter readings should be added to meters in meter group when meter group is associated with asset or location in the work order.
- New/old meter readings can be verified in Maximo classic/Manage for the meters in the meters group.
- The meters should be displayed as scrollable list for entering new or old meter readings in the sliding drawer.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 20 - Verify that meters are listed in the same order as in Maximo and the fields ASSETMETER/LOCATIONMETER.METERNAME and ASSETMETER/LOCATIONMETER.MEASUREUNITID are displayed on the sliding drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
6. Verify that meters are listed in the same order as in Maximo and the fields ASSETMETER/LOCATIONMETER.METERNAME and ASSETMETER/LOCATIONMETER.MEASUREUNITID are displayed on the sliding drawer.

**Results:**

- The meters should be listed in the same order as in Maximo.
- The fields ASSETMETER/LOCATIONMETER.METERNAME and ASSETMETER/LOCATIONMETER.MEASUREUNITID should be displayed on the sliding drawer for entering new/old meter readings.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 21 - Verify that the METER.METERTYPE is not displayed on the meters sliding drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Verify that METER.METERTYPE is not displayed on the meters sliding drawer.
6. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
7. Verify that METER.METERTYPE is not displayed on the sliding drawer for entering new/old meter readings.

**Results:**

The METER.METERTYPE should not be displayed on the meters sliding drawer as well as sliding drawer for entering new/old meter readings.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 22 - Verify that new meter readings are saved in ASSETMETER/LOCATIONMETER.NEWREADING field

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) on meters drawer.
6. Enter new meter reading and save it.
7. Verify that the new meter readings are saved in ASSETMETER/LOCATIONMETER.NEWREADING field.

**Results:**

The new meter readings should be saved in ASSETMETER/LOCATIONMETER.NEWREADING field.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 23 - Verify that new meter reading date and time is saved in ASSETMETER/LOCATIONMETER.NEWREADINGDATE and is current system date and time

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate meters to it.
3. Go to location, create a location and associate meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) on meters drawer.
6. Enter new meter reading and save it.
7. Verify that new meter reading date and time is saved in ASSETMETER/LOCATIONMETER.NEWREADINGDATE and is current system date and time.

**Results:**

The new meter reading date and time should be saved in ASSETMETER/LOCATIONMETER.NEWREADINGDATE and should be current system date and time.

**Note:**

Perform the scenario on WO list and WO details for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 24 - Verify various information related to meter reading field for Gauge meter while entering new/old meter readings

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to asset, create an asset and associate gauge meters to it.
3. Go to location, create a location and associate gauge meters to it.
4. Associate asset to the location.
5. Go to work order tracking application.
6. Create a new work order.
7. Add created asset and location with work order.
8. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
6. Click on the field to enter reading for a gauge meter.
7. Verify various information related to meter reading field for gauge meter.

**Results:**

- The meter entry field for a gauge meter should be numeric field which supports decimal point.
- The unit of measure should be displayed besides the gauge meter name.
- A numeric keypad should be displayed when the field is in focus.
- The entered meter reading should be saved when the technician taps submit on the keypad.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 25 - Verify the contents of the lookup for the characteristic meter values while entering old/new meter readings

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to domains app and add multiple ALN options for characteristic meter.
3. Go to asset, create an asset and associate characteristic meters to it.
4. Go to location, create a location and associate characteristic meters to it.
5. Associate asset to the location.
6. Go to work order tracking application.
7. Create a new work order.
8. Add created asset and location with work order.
9. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
6. Click on right chevron (>) on the characteristic meter to open lookup for the characteristic meter values.
7. Verify the contents of the lookup for the characteristic meter values.

**Results:**

- The lookup header/title should be the characteristic meter name.
- The lookup should display all ALN domain options (along with their description) setup as characteristic meter values with total number of records.
- The lookup should have back button to go back to new/old meter reading entry drawer.
- Previously selected lookup option should be shown highlighted. No option should be highlighted in case lookup option is not selected yet.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 26 - Verify that selecting any characteristic meter reading option closes the characteristic meter lookup and selected value is displayed on the new/old meter reading entry drawer for the characteristic meter

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to domains app and add multiple ALN options for characteristic meter.
3. Go to asset, create an asset and associate characteristic meters to it.
4. Go to location, create a location and associate characteristic meters to it.
5. Associate asset to the location.
6. Go to work order tracking application.
7. Create a new work order.
8. Add created asset and location with work order.
9. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
6. Click on right chevron (>) on the characteristic meter to open lookup for the characteristic meter values.
7. Select the appropriate characteristic meter value option.
8. Verify that characteristic meter lookup closes and selected value is displayed on the new/old meter reading entry drawer for the characteristic meter.
9. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
10. Click on right chevron (>) on the characteristic meter to open lookup for the characteristic meter values.
11. Click on the back button.
12. Verify that characteristic meter lookup closes and there is no change in the characteristic meter value on the new/old meter reading entry drawer.
13. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
14. Click on right chevron (>) on the characteristic meter to open lookup for the characteristic meter values.
15. Select the appropriate characteristic meter value option.
16. The characteristic meter lookup closes and selected value is displayed on the new/old meter reading entry drawer for the characteristic meter.
17. Click on blue tick mark/save button on the new/old meter reading entry drawer to save the selected characteristic meter reading.
18. Verify that new/old meter reading entry drawer closes and technician is navigated back to the meters drawer with latest/new characteristic meter value displayed as read only.


**Results:**

- The characteristic meter lookup should close and selected value should be displayed on the new/old meter reading entry drawer for the characteristic meter.
- The characteristic meter lookup should close and there should be no change in the characteristic meter value on the new/old meter reading entry drawer.
- The selected characteristic meter reading value is saved and it is displayed as read only with saved date and time on meters drawer in case of new characteristic meter reading.
- The selected characteristic meter reading value is saved and it needs to be verified in Maximo classic/Manage or database in case of old characteristic meter reading value.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 27 - Verify that correct domain options are displayed in lookup for the characteristic meter on the new/old meter reading entry drawer when multiple characteristic meters are added to the work order asset and/or location

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to domains app and add different multiple ALN options for multiple characteristic meters.
3. Go to asset, create an asset and associate characteristic meters to it.
4. Go to location, create a location and associate characteristic meters to it.
5. Associate asset to the location.
6. Go to work order tracking application.
7. Create a new work order.
8. Add created asset and location with work order.
9. Add assignments for labor and approve the work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on meters touch-point on work order card on WO list page to open meters sliding drawer.
5. Click on new meter reading button(+) or 'Enter old readings' menu button in 3 dot menu on meters sliding drawer.
6. Click on right chevron (>) on the first characteristic meter to open lookup for the characteristic meter values.
7. Verify that correct domain options are displayed in lookup for the first characteristic meter.
8. Click back button.
9. Click on right chevron (>) on the other characteristic meters to open lookup for the characteristic meter values.
10. Verify that correct domain options are displayed in lookup for the all the characteristic meters.

**Results:**

The correct domain options should be displayed in lookup for the characteristic meter on the new/old meter reading entry drawer when multiple characteristic meters are added to the work order asset and/or location.

**Note:**

Perform the scenario on WO list and WO details.

## Scenario 28 - Verify the above scenarios for multi asset and location meters

**Pre-condition:**

1. Pre-conditions as specified for above mentioned test scenarios.
2. Associate the asset and location with meters to the multi asset and location section of the work order in the Maximo classic application.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Search the work order in the 'Assigned work' filter.
4. Click on chevron on work order card to open work order details.
5. Go to multi asset and location section and click on meters touch-point.
6. Validate all the above meters scenarios for each multi asset and location record.

**Results:**

The above meters scenarios should work correctly for each multi asset and location record.

**Note:**

Perform the scenarios on WO details for different types of meters (Continuous, Characteristic and/or Gauge) in multi asset and location records.

## Scenario 29 - Record Measurement : Verify the "Conduct a measurement" field and Meter Icon is not present by keeping Measurement Point/field Value blank.(GAUGE METER)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by keeping Measurement Value/Point blank in "Work Reference Information"
5. Assign Labor
6. Change status to Approved .

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Verify that "Conduct a Measurement" field  and Meter icon  should not be visible.

**Results:**

Validate "Conduct a Measurement" field should not be present on the Tasks Page
Validate Meter Icon is not present until Measurement Point is not present .

## Scenario 30 - Record Measurement : Verify when Measurement point and Value is entered , the date , time and Measurement Value should be in the read only mode .(GAUGE METER)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by selecting Measurement point .
5. Enter Measurement Value in numerics (NOTE:Only Numeric value is allowed)
6. Click on Save and date will appear in the Measurement Date
7. Assign Labor
8. Change status to Approved .

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Click on the Meter Icon
7. Slider will be opened .
8. Verify date , time and Measurement value is in the Ready only Mode .

**Results:**

Date , Time and Measurement value should be in the ready only mode.

## Scenario 31 - Record Measurement : Verify Asset associated with the Measurement point should also be displayed in the Meter slider details on the Technician App.(GAUGE METER)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by selecting Measurement point .
5. Enter Measurement Value in numerics
6. Click on Save and date will appear in the Measurement Date
7. Assign Labor
8. Change status to Approved

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Click on the Meter Icon
7. Slider will be opened .
8. Verify that the Asset displayed is same as mentioned in the Measurement Point selection in the classic Application.

**Results:**

Assets value should be displayed inside the meter slider in the Technician App which should be same as mentioned in the Measurement point
condition Monitoring.

## Scenario 32 - Record Measurement : Verify Measurement Value can be entered in the Technician App under Meter Slider when it's left blank in Measurement Value from classic App.(GAUGE METER)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by keeping Measurement Value/Point blank in "Work Reference Information"
5. Assign Labor
6. Change status to Approved .

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Click on the Meter Icon
7. Slider will be opened .
8. Enter numeric value in the Measurement Value (NOte:Alphabets are disabled)
9. Click on the Save
10. Verify that the Measurement value is taken and date, time, Measurement Value will be in the Read only mode.

**Results:**

Error should be displayed when entered numeric value which is more than mentioned in the conditional Monitoring.
Measurement Value, date and time will be convered to read only mode .

## Scenario 33 - Record Measurement : Verify the "Conduct a measurement" field and Meter Icon is present .(GAUGE METER)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by selecting Measurement point .
5. Enter Measurement Value in numerics (NOTE:Only Numeric value is allowed)
6. Click on Save and date will appear in the Measurement Date
7. Assign Labor
8. Change status to Approved .

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Verify that "Conduct a Measurement" field and Meter Icon should be visible.

**Results:**

Validate "Conduct a Measurement" field should be present on the Tasks Page.
Validate Meter Icon is present on the Tasks Page.

## Scenario 34 - Record Observations  : Verify Observation Value is displayed in Technician app when selected CHARACTERISTIC Meter

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by selecting Measurement point(CHARACTERISTIC meter) Work Reference Information.
5. Select Observation
6. Click on Save and date will appear in the Measurement Date
7. Assign Labor
8. Change status to Approved .

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Click on the Meter icon and Meter Slider will open.
7. Verify Observation value is present which will be same as selected in the Classic App tasks .

**Results:**

Observation value will be displayed  in the Meter Icon Slider on the Tasks Page

## Scenario 35 - Record Observations  : Verify Observation Value can se selected from the Technician app .(CHARACTERISTIC Meter)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create New Work Order .
4. Go to Plans and create task by selecting Measurement point(CHARACTERISTIC meter) Work Reference Information.
5. Click on Save and date will appear in the Measurement Date
7. Assign Labor
8. Change status to Approved .

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Go to task created in the precondtion.
6. Click on the Meter icon and Meter Slider will open.
7. Select Observation Value.
8. Click on Save

**Results:**

Observation Value can be selected from the Techincian App
After Selection , date , time and value should be in the read only mode .

## Scenario 36 - Verify that meter touch-point is disabled on WO list, WO details for primary and multi asset/location when technician doesn't have permission to enter meter readings

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Create multiple type of meters.
3. Create an asset and associate meters to it.
4. Create a location and associate meters to it.
5. Go to work order tracking app, create a work order and associate the created asset, location as primary and/or multi asset/location.
6. Add assignments for technician and approve the work order.
7. Go to 'Users' application and search for assigned technician user.
8. Open technician user and go to Security groups tab.
9. Remove permission for "Enter readings" for MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
10. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order in WO list.
4. Verify that meter touch-point is disabled.
5. Open WO details page and verify that meter touch-point is disabled in primary and multi asset/location sections.

**Results:**

The meter touch-point should be disabled on WO card on WO list, primary and multi asset/location sections on WO details when technician doesn't have permission to enter meter readings.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 37 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 38 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
