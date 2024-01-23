# Navigation from Technician to Inspection and back to Technician on work order details and tasks pages

These test cases will verify the navigation from Technician app to Inspections app and back to Technician app on work order details and tasks pages in web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-9537:  Eli can launch an inspection from his work order
- GRAPHITE-23196: Eli can get back to his work order from an inspection
- GRAPHITE-25700: Eli can get to a WO from an inspection
- GRAPHITE-13837: Eli can open inspections from a task

**Design URL:**

- <https://ibm.invisionapp.com/share/7QO0BFP5W8F#/screens/319643644_Launch_Inspections>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify un-availability of Inspection touchpoint on work order widget in WO details when user doesn't have permissions to access Inspections app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user doesn't have permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Verify that Inspection touchpoint is un-available on work order widget in WO details.

**Results:**

Inspection touchpoint should be un-available on work order widget in WO details.

## Scenario 2 - Verify un-availability/availibility of Inspection touchpoint on work order widget in WO details when user has permissions to access Inspections app and inspection form is unassigned/assigned assigned to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create two new work orders.
4. Do not assign any inspection form to the first work order.
5. Add labor in assignments tab and approve the first work order.
6. Make sure that assigned user has permissions to access Inspections app.
7. Assign an inspection form to the second work order.
8. Add labor in assignments tab and approve the second work order.
9. Make sure that assigned user has permissions to access Inspections app

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the first work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Verify that Inspection touchpoint is un-available on work order widget in WO details.
5. Search the second work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
6. Verify that Inspection touchpoint is available on work order widget in WO details.


**Results:**

- Inspection touchpoint should be un-available on work order widget in WO details for the first work order.
- Inspection touchpoint should be available on work order widget in WO details for the second work order.

## Scenario 3 - Verify that user is navigated to Inspections app and inspection form assigned to work order is displayed for conducting inspection when user taps on Inspection touchpoint

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click/Tap on Inspection touchpoint.
5. Verify that user is navigated to Inspections app and inspection form assigned to work order is displayed for conducting inspection.

**Results:**

User should be navigated to Inspections app and inspection form assigned to work order should be displayed for conducting inspection.

## Scenario 4 - Verify that there are no performance issues while switching to Inspections app from Technician app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click/Tap on Inspection touchpoint.
5. Technician is navigated to Inspections app and inspection form assigned to work order is displayed for conducting inspection.
6. Measure the response times for opening of inspection form in Inspections app.
7. Verify that there are no performance issues in opening of inspection form in Inspections app from Technician app.

**Results:**

There should be no performance issues in opening of inspection form in Inspections app from Technician app.

## Scenario 5 - Verify that user is navigated back to work order details page in Technician app when user clicks on back button on the inspection form page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click/Tap on Inspection touchpoint.
5. Technician is navigated to Inspections app and inspection form assigned to work order is displayed for conducting inspection.
6. Click on the back button from inspection form page for conducting inspection in Inspections app.
7. Verify that user is navigated back to work order details page in Technician app.

**Results:**

User should be navigated back to work order details page in Technician app when user clicks on back button on the inspection form page in Inspections app.

## Scenario 6 - Verify that user can return to Technician app using navigator from Inspections app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click/Tap on Inspection touchpoint.
5. Technician is navigated to Inspections app and inspection form assigned to work order is displayed for conducting inspection.
6. Search for the inspection which was assigned to work order in pre-condition steps in "Assigned Inspections" or "Pending" list.
7. Verify the Work order number is displayed on top right of the inspection card in the Inspections app.
8. Open navigator using 9 dot menu and tap on "My Schedule" tile.
9. Verify that user can return to Technician app using navigator and assigned WO list is displayed.

**Results:**

- Work order number should be displayed on top right of the inspection card in the Inspections app.
- User should be able to return to Technician app using navigator from Inspections app.
- The assigned WO list should be displayed to user.

## Scenario 7 - Verify that user is navigated to work order details page in Technician app when user clicks on work order number on the inspection card

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "Inspections" tile to open the list of assigned inspection forms for conducting inspections.
3. Search for the inspection which was assigned to work order in pre-condition steps in "Assigned Inspections" or "Pending" list.
4. Work order number is displayed on top right of the inspection card in the Inspections app.
5. Click on the work order number.
6. Verify that user navigates to work order details page in Technician app.

**Results:**

- User should be navigated to work order details page in Technician app when user clicks on work order number on the inspection card.
- The details for the work order should be correct on work order details page.

## Scenario 8 - Verify the user is navigated back to assigned inspections list page in Inspections app from work order details page in Technician app when user taps on back button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Assign an inspection form to the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "Inspections" tile to open the list of assigned inspection forms for conducting inspections.
3. Search for the inspection which was assigned to work order in pre-condition steps in "Assigned Inspections" or "Pending" list.
4. Work order number is displayed on top right of the inspection card in the Inspections app.
5. Click on the work order number and user navigates to work order details page in Technician app.
6. Click on back button on work order details page in Technician app.
7. Verify that user is navigated back to "Assigned inspections" list page in Inspections app.

**Results:**

User should be navigated back to "Assigned inspections" list page in Inspections app.

## Scenario 9 - Verify the availability of inspection touchpoint when task is marked completed

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and add planned task for the work order.
4. Assign an inspection form to the planned task for the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click on task touchpoint to open tasks page.
5. Expand the task having the assigned inspection form.
6. Verify that inspection touchpoint is displayed on the task record.
7. Click on Mark complete button on the task record.
8. Task is completed and expand the task record.
9. Verify that inspection touchpoint is displayed and clickable.

**Results:**

- Inspection touchpoint should be displayed on the task record when inspection form is assigned to a planned task for work order.
- Inspection touchpoint should be displayed and clickable when task is marked completed.

## Scenario 10 - Verify un-availability of Inspection touchpoint on work order task when user doesn't have permissions to access Inspections app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and add planned task for the work order.
4. Assign an inspection form to the planned task for the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user doesn't have permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click on task touchpoint to open tasks page.
5. Expand the task having the assigned inspection form.
6. Verify that inspection touchpoint is not displayed on the task record.

**Results:**

Inspection touchpoint should not be displayed on the task record when user doesn't have permissions to access Inspections app.

## Scenario 11 - Verify that user is navigated to inspection form page in Inspections app when user clicks on inspection touchpoint on work order planned task

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and add planned task for the work order.
4. Assign an inspection form to the planned task for the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click on task touchpoint to open tasks page.
5. Expand the task having the assigned inspection form.
6. Click on inspection touchpoint displayed on the task record.
7. Verify that user is navigated to inspection form page in Inspections app.

**Results:**

User should be navigated to inspection form page for conducting inspection in Inspections app when user clicks on inspection touchpoint on work order planned task.

## Scenario 12 - Verify that user is navigated back to work order tasks page in Technician app when user clicks on back button on inspection form page in Inspections app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and add planned task for the work order.
4. Assign an inspection form to the planned task for the work order.
5. Add labor in assignments tab and approve the work order.
6. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click on task touchpoint to open tasks page.
5. Expand the task having the assigned inspection form.
6. Click on inspection touchpoint displayed on the task record to navigate to inspection page in Inspections app.
7. Click on the back button on inspection form page in Inspections app.

**Results:**

User should be navigated back to work order tasks page in Technician app when user clicks on back button on inspection form page in Inspections app.

## Scenario 13 - Verify that user is able to add attachments to inspection forms in Maximo Mobile for EAM and '+' plus button to add attachments should be visible

**Pre-condition:**

1. On desktop, open the Maximo EAM URL in a browser and log in as a maximo user, eg. maxadmin
2. Navigate to Work Orders > Work Order Tracking
3. Search for Manage inspections forms.
4. Click on '+' icon create form.
5. Enter name and select type.
6. Add questions and under response fields select media-> file upload option. 
7. Enter question statement and select option(attachments).
8. Click on done button followed by save button.
9. Change draft status to active.
10. Navigate to work order tracking and create a new WO.
11. Assign the created inspection form to this WO.
12. Click on Work Order tab.
13. Under Common Actions, locate and click on Select Owner. The Select Owner window will be displayed.
14. Under Person Group, click on a group.
15. Add labor in assignments tab and approve the work order.
26. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click on the chevron icon and navugate to WO details page.
5. Click on inspections touchpoint.
6. Verify technician navigates to the inspections application.
7. Verify '+' icon to upload a file is present.

**Results:**

Inspection form should reflect '+' icon to upload attachment.

## Scenario 14 - Verify attachment is added on task inspection without any errors

**Pre-condition:**

1. On desktop, open the Maximo EAM URL in a browser and log in as a maximo user, eg. maxadmin
2. Navigate to Work Orders > Work Order Tracking
3. Search for Manage inspections forms.
4. Click on '+' icon create form.
5. Enter name and select type.
6. Add questions and under response fields select media-> file upload option. 
7. Enter question statement and select option(attachments).
8. Click on done button followed by save button.
9. Change draft status to active.
10. Navigate to work order tracking and create a new WO.
11. Add a task and assign inspoection form to that task created in the above steps.
12. Click on Work Order tab.
13. Under Common Actions, locate and click on Select Owner. The Select Owner window will be displayed.
14. Under Person Group, click on a group.
15. Add labor in assignments tab and approve the work order.
26. Make sure that assigned user has permissions to access Inspections app.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO Details.
4. Click on chevron and navigate to WO details page.
5. Click on task touchpoint.
6. Click on inspections touchpoint assosiated with task.
7. Verify technician navigates to the inspections application.
8. Verify '+' icon to upload a file is present and upload attachment.

**Results:**

Inspection form should reflect '+' icon to upload attachment and attachment should be uploaded successfully without any erros.

## Scenario 15 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Login to Maximo mobile app with the credentials of user assigned to work order.
2. Navigate to screens/pages/cards of above mentioned scenarios.
3. Verify UI of the cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.

**Results:**

- UI of the cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 16 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
