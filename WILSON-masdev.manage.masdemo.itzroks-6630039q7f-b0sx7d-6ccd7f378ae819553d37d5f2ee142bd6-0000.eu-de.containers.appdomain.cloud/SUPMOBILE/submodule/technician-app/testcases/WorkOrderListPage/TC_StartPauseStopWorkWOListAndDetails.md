# Start, stop and pause work functionality on work order list and work order details pages

These test cases will verify start, stop and pause work functionalities on work order list and work order details pages for Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-20847: Eli can start the first WO on his list
- GRAPHITE-23592: [Split 20847] Eli can start the first WO on his list
- GRAPHITE-16964: Eli can pause his work
- GRAPHITE-16918: Eli can stop his work without confirming his time
- GRAPHITE-21449: From the details page, Eli can stop his work without confirming his time
- GRAPHITE-16941: Eli can stop and confirm his work time
- GRAPHITE-23695: [Split 16941]Eli can stop and confirm his work time
- GRAPHITE-42345: Eli needs to be able to start work without starting the timer
- GRAPHITE-47153: Eli should not be able to start multiple timers at the same time
- GRAPHITE-33940: Review Start travel x Start work icons
- GRAPHITE-30902: Eli should go to the work details page after clicking on Start Work button in the list page

**Design URL:**

- <https://ibm.invisionapp.com/share/WCO04JB7AHK#/screens>
- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319650959>
- <https://ibm.invisionapp.com/share/8CO22AJFQH6#/screens>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify availability and UI of the Start button on work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Go to work order tracking application.
4. Create multiple work orders.
5. Add assignments for labor and approve the work orders.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Verify availability and UI of the Start button on work order cards in work order list page.
4. Click chevron on the work order card to open work order details page.
5. Verify availability and UI of the Start button on the work order details page.

**Results:**

- "Start work with timer" button with label "Start work" should be displayed on webapp and large screen devices. "Start work with timer" button without "Start work" label should be displayed on small/mid screen devices.
- "Start work with timer" button should be available and is of primary(blue) button type on first work order card in work order list page.
- "Start work with timer" button should be available and is of secondary button type on other work order cards in work order list page.
- "Start work with timer" button should be available and is of primary(blue) button type on the work order details page.
- The icon on "Start work with timer" button should be "maximo:start-work".

## Scenario 2 - Verify that work order status is changed to "In progress" when STARTTIMERINPRG=1 and technician taps on Start button on work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
4. Go to work order tracking application.
5. Create multiple work orders.
6. Add assignments for labor and approve the work orders.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start button on the work order card.
4. Verify the work order status once Start button is tapped on work order card.
5. Go to work order list page, search another work order and click chevron on the work order card to open work order details page.
6. Tap on Start button on the work order details page.
7. Verify the work order status once Start button is tapped on work order details page.

**Results:**

Work order status should change to "In progress" when STARTTIMERINPRG=1 and technician taps on Start button on work order list and work order details pages.

## Scenario 3 - Verify that work order status is not changed to "In progress" when STARTTIMERINPRG=0 and technician taps on Start button on work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is un-checked/de-selected.
4. Go to work order tracking application.
5. Create multiple work orders.
6. Add assignments for labor and approve the work orders.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start button on the work order card.
4. Verify the work order status once Start button is tapped on work order card.
5. Go to work order list page, search another work order and click chevron on the work order card to open work order details page.
6. Tap on Start button on the work order details page.
7. Verify the work order status once Start button is tapped on work order details page.

**Results:**

Work order status shouldn't change to "In progress" when STARTTIMERINPRG=0 and technician taps on Start button on work order list and work order details pages.

## Scenario 4 - Verify that Stop and Pause button are displayed when technician taps on Start button on work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start button on the work order card.
4. Technician is navigated to work order details page.
5. Go to work order list page, verify the buttons on the work order card.
6. Search another work order and click chevron on the work order card to open work order details page.
7. Tap on Start button on the work order details page.
8. Verify the buttons once Start button is tapped on work order details page.

**Results:**

- Loading icon should be displayed when technician taps on Start button on work order list and work order details pages.
- Technician should be navigated to work order details page when Start button is tapped on work order card.
- Stop and Pause buttons should be displayed on work order card and work order details when technician taps on Start button.

## Scenario 5 - Verify that a new labor transaction is started for the logged in technician when technician taps on Start button on work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start button on the work order card.
4. Verify that a new labor transaction is started for the logged in technician and displayed in Labor section on report work page once Start button is tapped on work order card.
5. Go to work order list page, search another work order and click chevron on the work order card to open work order details page.
6. Tap on Start button on the work order details page.
7. Verify that a new labor transaction is started for the logged in technician and displayed in Labor section on report work page once Start button is tapped on work order details page.

**Results:**

- A new labor transaction should be started for the logged in technician and should be displayed in Labor section on report work page once Start button is tapped on work order list and work order details pages.
- Edit pencil icon button should be available on this labor transaction in order to edit it.

## Scenario 6 - Verify labor transaction is saved and technician stays at work order details page when technician clicks/taps on pause button from work order details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. Verify that technician stays at work order details page.
8. Go to Report work page.
9. Verify that labor transaction is saved.

**Results:**

Labor transaction should be saved and technician should stay at work order details page.

## Scenario 7 - Verify correctness of the contents of the saved labor transaction on Report work page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. Verify that technician stays at work order details page.
8. Go to Report work page.
9. Verify correctness of the contents of the saved labor transaction.

**Results:**

The contents of the saved labor transaction in Labor section should be correct and should have following data:

- Start date and time
- End date and time
- Regular hours (Difference between Start and End date and time)
- Labor transaction type

## Scenario 8 - Verify that Start button is displayed instead of Pause and Stop buttons on work order details page indicating that timer is stopped post saving of this labor transaction

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Go to work order tracking application.
4. Create multiple work orders.
5. Add assignments for labor and approve the work orders.
6. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
7. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on "Start work with timer" button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. Labor transaction is saved.
8. Verify availability of "Start work with timer" button instead of Pause and Stop buttons.

**Results:**

- "Start work with timer" button with label "Start work" should be displayed on webapp and large screen devices. "Start work with timer" button without "Start work" label should be displayed on small/mid screen devices.
- "Start work with timer" button should be displayed instead of Pause and Stop buttons indicating that timer is stopped post saving of this labor transaction.
- "Start work with timer" button should be blue in color indicating it as primary button, if it is first work order in work order list.
- The icon on "Start work with timer" button should be "maximo:start-work".

## Scenario 9 - Verify technician gets a dialog in order to confirm his time when he clicks/taps on pause button from work order details page and labor transaction is saved correctly and technician stays at work order details page when technician is ok with the contents of the dialog and clicks/taps on send button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. Verify that a dialog to confirm the technician time is displayed.
8. Verify the contents of the dialog.
9. Click/tap on Send button.
10. Verify technician stays at work order list page.
11. Go to Report work page.
12. Verify that labor transaction is saved correctly.

**Results:**

A dialog to confirm the technician time should be displayed and data should be correct. The dialog should contain following data:

- Start date and time
- End date and time
- Regular hours
- Labor transaction type
- Labor transaction should be saved and technician should stay at work order details page.
- The contents of the saved labor transaction in Labor section should be correct and same as displayed on the dialog.

## Scenario 10 - Verify technician is navigated to Report work page and Edit Labor drawer is displayed when technician is not ok with the contents of the dialog and clicks/taps on Edit Labor button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Verify technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Verify the contents of the Edit Labor drawer.

**Results:**

- Technician should be navigated to Report work page and Edit Labor drawer should be displayed.
- The contents of the fields on Edit Labor drawer for this labor transaction should be correct and populated with the data same as on the dialog.

## Scenario 11 - Verify labor transaction is not completed and timer keeps running when technician cancels the labor transaction from Edit Labor drawer post modification or no change of the data in the fields

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Technician cancels this labor transaction by clicking cancel button.
11. Verify labor transaction is not completed and timer keeps running.
12. Verify contents of this labor transaction in Labor section of Report work page.

**Results:**

- Labor transaction should not be completed and timer should keep running.
- Pause and Stop buttons should still be available on work order details pages.
- The contents of the saved labor transaction in Labor section on Report work page should be correct and should have data for following:

  - Start date and time
  - Transaction Type
  - Regular hours, End date and time should have placeholders

## Scenario 12 - Verify availability of edit pencil icon button on this labor transaction in Labor section of Report work page when technician cancels the labor transaction from Edit Labor drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Technician cancels this labor transaction by clicking cancel button.
11. Verify availability of edit pencil icon button on this labor transaction in Labor section of Report work page.

**Results:**

Edit pencil icon button should be available on this labor transaction in Labor section of Report work page in order to edit it.

## Scenario 13 - Verify labor transaction is completed and timer is stopped when technician make some modification in this labor transaction on Edit Labor drawer and clicks/taps on done button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Make modifications in the data which are valid as per business logic and validations.
11. Click/Tap on done button.
12. Verify labor transaction is completed and timer is stopped.
13. Verify contents of the saved labor transaction.

**Results:**

- Labor transaction should be completed and timer should be stopped.
- Edit pencil icon should be unavailable for this labor transaction in labor section of Report work page.
- Start button should be displayed instead of Pause and Stop buttons on work order list and work order details pages indicating that timer is stopped.
- The contents of this labor transaction should be correct and as per the modifications made on Edit labor drawer. Labor transaction should have data for following:

  - Start date and time
  - End date and time
  - Transaction Type
  - Regular hours

## Scenario 14 - Verify that all business logic and validations are performed on client side and working correctly on Edit Labor drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Pause button.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Make modifications in the data which are invalid as per business logic and validations.
11. Verify that all business logic and validations are performed on client side and working correctly.

**Results:**

All business logic and validations should be performed on client side and working correctly.

**Note:**

Refer TC_AddEditLaborTransaction.md file in order to perform all business logic and client side validations on Edit Labor drawer.

## Scenario 15 - Verify one technician shouldn’t be able to pause or stop labor transaction for other technician assigned to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for two different labors and approve the work orders.

**Steps:**

1. Launch the Maximo Mobile with assigned first technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Log out and login with second technician credentials.
7. Click on "My Schedule" tile to open the list of work orders.
8. Search the work order and verify that second technician still sees Start button.
9. Click/tap on Start button and starts the timer for second technician.
10. Log out and Login with first technician credentials again.
11. Click on "My Schedule" tile to open the list of work orders.
12. Search the work order and click/tap on Pause button.
13. Verify that first technician can pause/stop only his labor transaction and shouldn't be able to pause/stop other technician started labor transaction.

**Results:**

One technician shouldn't be able to pause or stop labor transaction for other technician assigned to work order.

**Note:**

Perform all pause button functionality scenarios when pause button is clicked on work order details page. All scenarios should work as expected.

## Scenario 16 - Verify labor transaction is saved and technician is navigated to Report work page when technician clicks/taps on stop button from work order list or work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. Verify that technician is navigated to Report work page.
8. Verify that labor transaction is saved.

**Results:**

Labor transaction should be saved and technician should be navigated to Report work page.

## Scenario 17 - Verify correctness of the contents of the saved labor transaction on Report work page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. Technician is navigated to Report work page.
8. Verify correctness of the contents of the saved labor transaction.

**Results:**

The contents of the saved labor transaction in Labor section should be correct and should have following data:

- Start date and time
- End date and time
- Regular hours (Difference between Start and End date and time)
- Labor transaction type

## Scenario 18 - Verify that "Start work with timer" button is displayed instead of Pause and Stop buttons on work order list and work order details pages indicating that timer is stopped post saving of this labor transaction

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Go to work order tracking application.
4. Create multiple work orders.
5. Add assignments for labor and approve the work orders.
6. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
7. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. Technician is navigated to Report work page.
8. Go back to work order details and work order list pages.
9. Verify availability of "Start work with timer" button instead of Pause and Stop buttons on work order details and work order list pages.

**Results:**

- "Start work with timer" button should be displayed instead of Pause and Stop buttons indicating that timer is stopped post saving of this labor transaction.
- "Start work with timer" button should be blue in color indicating it as primary button, if it is first work order in work order list.
- The icon on "Start work with timer" button should be "maximo:start-work".

## Scenario 19 - Verify "Complete work" button on Report work page when technician clicks/taps on stop button from work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is un-checked/de-selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. Technician is navigated to Report work page.
8. Verify "Complete work" button style on Report work page.

**Results:**

The "Complete work" button should be displayed in blue color(primary) on the top right of the Report work page.

## Scenario 20 - Verify Technician gets a dialog in order to confirm his time when he clicks/taps on stop button from work order list and work order details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. Verify that a dialog to confirm the technician time is displayed.
8. Verify the contents of the dialog.

**Results:**

A dialog to confirm the technician time should be displayed and data should be correct. The dialog should contain following data:

- Start date and time
- End date and time
- Regular hours
- Labor transaction type

## Scenario 21 - Verify labor transaction is saved correctly and technician is navigated to Report work page when technician is ok with the contents of the dialog and clicks/taps on send button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Send button.
9. Verify Technician is navigated to Report work page.
10. Verify that labor transaction is saved correctly.

**Results:**

- Labor transaction should be saved and technician should be navigated to Report work page.
- The contents of the saved labor transaction in Labor section should be correct and same as displayed on the dialog.

## Scenario 22 - Verify technician is navigated to Report work page and Edit Labor drawer is displayed when technician is not ok with the contents of the dialog and clicks/taps on Edit Labor button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Verify Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Verify the contents of the Edit Labor drawer.

**Results:**

- Technician should be navigated to Report work page and Edit Labor drawer should be displayed.
- The contents of the fields on Edit Labor drawer for this labor transaction should be correct and populated with the data same as on the dialog.

## Scenario 23 - Verify labor transaction is not completed and timer keeps running when technician cancels the labor transaction from Edit Labor drawer post modification or no change of the data in the fields

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Technician cancels this labor transaction by clicking cancel button.
11. Verify labor transaction is not completed and timer keeps running.
12. Verify contents of this labor transaction in Labor section of Report work page.

**Results:**

- Labor transaction should not be completed and timer should keep running.
- Pause and Stop buttons should still be available on work order card in work order list and work order details pages.
- The contents of the saved labor transaction in Labor section on Report work page should be correct and should have data for following:

  - Start date and time
  - Transaction Type
  - Regular hours, End date and time should have placeholders

## Scenario 24 - Verify availability of edit pencil icon button on this labor transaction in Labor section of Report work page when technician cancels the labor transaction from Edit Labor drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Technician cancels this labor transaction by clicking cancel button.
11. Verify availability of edit pencil icon button on this labor transaction in Labor section of Report work page.

**Results:**

Edit pencil icon button should be available on this labor transaction in Labor section of Report work page in order to edit it.

## Scenario 25 - Verify labor transaction is completed and timer is stopped when technician make some modification in this labor transaction on Edit Labor drawer and clicks/taps on done button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Make modifications in the data which are valid as per business logic and validations.
11. Click/Tap on done button.
12. Verify labor transaction is completed and timer is stopped.
13. Verify contents of the saved labor transaction.

**Results:**

- Labor transaction should be completed and timer should be stopped.
- Edit pencil icon should be unavailable for this labor transaction in labor section of Report work page.
- "Start work with timer" button should be displayed instead of Pause and Stop buttons on work order list and work order details pages indicating that timer is stopped.
- The contents of this labor transaction should be correct and as per the modifications made on Edit labor drawer. Labor transaction should have data for following:

  - Start date and time
  - End date and time
  - Transaction Type
  - Regular hours

## Scenario 26 - Verify that all business logic and validations are performed on client side and working correctly on Edit Labor drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure "Automatically change work order status to INPRG when a user starts a labor timer?" in organization's System settings is checked/selected.
6. Make sure "Confirm Time Calculated by Timer?" in organization's System settings is checked/selected.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order.
4. Click/Tap on Start button on the work order card to start the labor transaction timer.
5. Start button changes to Pause and Stop buttons and the technician is navigated to work order details page. Work order status changes to In Progress.
6. Click/tap on Stop button from work order details pages or go back and click Stop button from work order list.
7. A dialog to confirm the technician time is displayed.
8. Click/tap on Edit Labor button.
9. Technician is navigated to Report work page and Edit Labor drawer is displayed.
10. Make modifications in the data which are invalid as per business logic and validations.
11. Verify that all business logic and validations are performed on client side and working correctly.

**Results:**

All business logic and validations should be performed on client side and working correctly.

**Note:**

Refer TC_AddEditLaborTransaction.md file in order to perform all business logic and client side validations on Edit Labor drawer.

## Scenario 27 - Verify default value and property description of "maximo.mobile.usetimer" system property in Maximo

**Steps:**

1. Login to Maximo/Manage application as Admin.
2. Go to System properties app and search for "maximo.mobile.usetimer" system property.
3. Verify default value and property description for "maximo.mobile.usetimer" system property.

**Result:**

- The property description for "maximo.mobile.usetimer" system property should be "Specifies if Start work starts the timer. Set to 0 to only change status and not start the timer.".
- The default value for "maximo.mobile.usetimer" system property should be 1.

## Scenario 28 - Verify availability of "Start work without timer" button on work order card and work order details when work order current status is either of "Approved", "Waiting to be scheduled" or "Waiting for material" and "maximo.mobile.usetimer" system property value is 0

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Set "maximo.mobile.usetimer" system property value to 0.
3. Select the system property and perform live refresh.
4. Create a new work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in work order list.
4. Verify availability of "Start work without timer" button on work order card and work order details.

**Result:**

- "Start work without timer" button should be available on work order card and work order details pages.
- The icon on "Start work without timer" button should be "carbon:play".

**Note:**

Perform above scenario for work orders having current status as "Waiting to be scheduled" and "Waiting for material".

## Scenario 29 - Verify work order status is changed to "In progress" when technician clicks on "Start work without timer" button on work order card/details and "maximo.mobile.usetimer" system property value is 0

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Set "maximo.mobile.usetimer" system property value to 0.
3. Select the system property and perform live refresh.
4. Create a new work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in work order list.
4. Click on "Start work without timer" button on work order card and/or work order details page.

**Result:**

- The work order status should be changed to "In progress (INPRG)".
- "Start work without timer" button should be changed to "View" button on work order card.
- Technician should be navigated to work order details page on clicking "Start work without timer" button on work order card.
- There should be no "Start work without timer" or "View" button displayed on work order details page.
- There should be no new labor transaction record created in labor section on "Report work" page.

**Note:**

Perform above scenario for work orders having current status as "Waiting to be scheduled" and "Waiting for material".

## Scenario 30 - Verify availability of "View" button on work order card when work order current status is other than "Approved", "Waiting to be scheduled" or "Waiting for material" and "maximo.mobile.usetimer" system property value is 0

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Set "maximo.mobile.usetimer" system property value to 0.
3. Select the system property and perform live refresh.
4. Create a new work order.
5. Add assignments for labor and change work order status to "In progress".

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in work order list.
4. Verify availability of "View" button on work order card.

**Result:**

"View" button should be available on work order card.

**Note:**

Perform above scenario for work orders having current status other than "Approved", "Waiting to be scheduled" and "Waiting for material".

## Scenario 31 - Verify technician is navigated to work order details page when technician clicks on "View" button on work order card and "maximo.mobile.usetimer" system property value is 0

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Set "maximo.mobile.usetimer" system property value to 0.
3. Select the system property and perform live refresh.
4. Create a new work order.
5. Add assignments for labor and change work order status to "In progress".

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in work order list.
4. Click on "View" button on work order card.

**Result:**

- Technician should be navigated to work order details page.
- There should be no "View" or "Start work without timer" button on work order details page.

**Note:**

Perform above scenario for work orders having current status other than "Approved", "Waiting to be scheduled" and "Waiting for material".

## Scenario 32 - Verify un-availability of "View" button on work order details when work order current status is other than "Approved", "Waiting to be scheduled" or "Waiting for material" and "maximo.mobile.usetimer" system property value is 0

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Set "maximo.mobile.usetimer" system property value to 0.
3. Select the system property and perform live refresh.
4. Create a new work order.
5. Add assignments for labor and change work order status to "In progress".

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in work order list and click on chevron to open work order details page.
4. Verify un-availability of "View" or "Start work without timer" button on work order details page.

**Result:**

"View" or "Start work without timer" button should be un-available on work order details page.

**Note:**

Perform above scenario for work orders having current status other than "Approved", "Waiting to be scheduled" and "Waiting for material".

## Scenario 33 - Verify default value and property description of "maximo.mobile.allowmultipletimers" system property in Maximo

**Steps:**

1. Login to Maximo/Manage application as Admin.
2. Go to System properties app and search for "maximo.mobile.allowmultipletimers" system property.
3. Verify default value and property description for "maximo.mobile.allowmultipletimers" system property.

**Result:**

- The property description for "maximo.mobile.allowmultipletimers" system property should be "Allow multiple timers to be started in Mobile.".
- The default value for "maximo.mobile.allowmultipletimers" system property should be 1.

## Scenario 34 - Verify that technician can start only one timer at a time in mobile apps when "maximo.mobile.allowmultipletimers" system property is 0

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure that none of the work orders assigned to technician/labor has started timer/labor transaction for him/her.
6. Set "maximo.mobile.allowmultipletimers" system property as 0.

**Steps:**

1. Launch the Maximo Mobile app with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start work button on the work order card.
4. Timer or labor transaction is started for the technician/labor.
5. Go to work order list page, search another work order and tap on Start work button on the work order card.
6. Verify that technician is unable to start second timer or labor transaction.

**Results:**

- Technician should be unable to start second timer or labor transaction when one timer is already started for the same technician.
- A popup message "Timer already started." should be displayed when technician tries to start second timer or labor transaction.

**Note:**

Perform the above mentioned scenario by tapping Start work button from WO details page and it should work as expected.

## Scenario 35 - Verify that multiple work orders can have "In progress" status at a time in the WO list when "maximo.mobile.allowmultipletimers" system property is 0

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders.
4. Add assignments for labor and approve the work orders.
5. Make sure that none of the work orders assigned to technician/labor has started timer/labor transaction for him/her.
6. Set "maximo.mobile.allowmultipletimers" system property as 0.

**Steps:**

1. Launch the Maximo Mobile app with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start work button on the work order card.
4. Timer or labor transaction is started for the technician/labor.
5. Change the work order status to "In progress", if it is not changed by starting the timer.
6. Go to work order list page, search another work order and change the work order status to "In progress" without starting the timer.
7. Verify that technician is able to change the status of second work order to "In progress".

**Results:**

Technician should be able to change the status of second work order to "In progress" i.e. multiple work orders can have "In progress" status at a time in the WO list.

**Note:**

Perform the above mentioned scenario from WO details page and it should work as expected.

## Scenario 36 - Verify that a technician can start timer/labor transaction when other technician(s) has started timers/labor transactions and "maximo.mobile.allowmultipletimers" system property is 0

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a work order.
4. Add assignments for multiple labors and approve the work order.
5. Make sure that none of the assigned technician/labor has started timer/labor transaction.
6. Set "maximo.mobile.allowmultipletimers" system property as 0.

**Steps:**

1. Launch the Maximo Mobile app with first assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on Start work button on the work order card.
4. Timer or labor transaction is started for the technician/labor.
5. Launch the Maximo Mobile app with second assigned technician credentials.
6. Search the work order and tap on Start work button on the work order card.
7. Verify that technician is able to start timer or labor transaction.

**Results:**

Technician should be able to start timer or labor transaction when other technician(s) has already started timers/labor transactions.

**Note:**

Perform the above mentioned scenario from WO details page and it should work as expected.

## Scenario 37 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 38 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
