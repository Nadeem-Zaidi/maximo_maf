# Report asset downtime functionality on 'work order details' page

These test cases will verify that user can report an asset is down or up on 'work order details' page on Technician web app, online and offline mode on mobile containers. These test cases will cover functionalities of following user stories:

- GRAPHITE-9496: Eli can report an asset is down (view piece)
- GRAPHITE-35440: Eli can report an asset is down (save transaction)
- GRAPHITE-31775: Eli can capture physical signatures on a work order
- GRAPHITE-42373: Eli need to have server side definition on when to collect signatures
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

**Design URL:**

- <https://ibm.invisionapp.com/share/RYO0VVTWKQ7#/screens/319858544_Work_Order_-_Asset_Status_Up>
- <https://ibm.invisionapp.com/share/YAO17D9VXR3#/screens/319975211_Required_Signatures>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify availability of "status" and "up/down" touch-point in Asset section on work order details page to report the asset downtime and on clicking on 'Up/Down' touch-point opens sliding drawer to change the downtime status of Asset on work order details page


**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Verify that "asset status" and "up/down" touch-point is available in asset section on work order details page.
5. Click on 'up/down' touch-point in asset section on work order details page.
6. Verify that sliding drawer opens to change asset status.

**Result:**

- Asset downtime status i.e. "Up" with a up arrow is also displayed on WO details page in Asset section.
- 'Up/down' touch-point should be available in Asset section on work order details page.
- Sliding drawer should open to change the asset status.
- Various fields and their default contents displayed on sliding drawer for changing asset status should be as below:

- Sliding drawer Header label is "asset status" with X and blue check-mark buttons.
- "Current status" label.
- Displays current state of the asset highlighted with up, the date of the last status change. (DOWNTIMEREPORT.STATUSCHANGEDATE) i.e. the time when the status of asset was changed last in history.
- If status of Asset has never changed in history then blank value will be displayed with a "-" placeholder.

## Scenario 2 - Verify user can tap down icon if asset status is already up and verify the default content

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on down button.
6. Verify the user is able to change the asset status to down and verify the contents displayed after tapping down icon.

**Result:**

- "Downtime date" and "Time" fields should be displayed, with default value of Current date and time i.e. (DOWNTIMEREPORT.STATUSCHANGEDATE) are auto populated. It is a mandatory field.
- "Downtime code" option should be displayed to user and it's values are from ALNDOMAIN and user can select value from the lookup. It is an optional field.

## Scenario 3 - Verify when status is already up and after clicking down button and changing information in the fields, user again clicks the up button on sliding drawer. The fields should be removed and the current status should again displayed unchanged

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on down button.
6. Verify user is able to edit the downtime date and time.
7. Click on up button.

**Result:**

Fields should be removed and current status of the asset should be displayed as UP.

## Scenario 4 - Verify user can edit/select the value of Downtime date, time and Downtime code

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on down button.
6. Verify user is able to edit the downtime date and time.

**Result:**

- User should be able to enter/edit date value in Downtime date field.
- User should be able to enter/edit Downtime date to new value in a format depending on user locale.
- User should be able to edit/enter in time field in hh:mm format.
- User should be able to select the Downtime code from the lookup and Downtime code "Description" is displayed after selecting from the lookup.

## Scenario 5 - Verify after modifying the data in the sliding drawer fields when clicks on "X" button, no changes are done on previous status of the asset on work order details

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.
6. Enter the Report Down time.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on up button, when asset status is already down.
6. Modify values for time and date.
7. Click on "X" button.
8. Verify no changes are done on previous status of the asset on work order details.

**Result:**

- There should be no changes on previous status of the asset on work order details i.e. it should still show asset status as down.
- User should be navigated WO details page.

## Scenario 6 - Verify current asset status, if asset status is already down and verify the default content

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.
6. Enter the Report Down time.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on up button.
6. Verify the default contents.
7. Verify the user is able to change the asset status to up and verify the contents displayed after tapping down icon.

**Result:**

Various fields and their default contents displayed on sliding drawer for changing asset status should be as below:

- Sliding drawer Header label is "asset status" with X and blue check-mark buttons.
- "Current status" label.
- Displays current state of the asset highlighted as "down" with the date of the last status change.(DOWNTIMEREPORT.STATUSCHANGEDATE) i.e. down time which was set in pre-requisite step 6 will be displayed.

"Uptime date" and "Time" fields should be displayed, having default value of Current date and time auto populated. It is a mandatory field.

## Scenario 7 - Verify user can edit/change the value of "Uptime date" and "Time" field values

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.
6. Enter the Report Down time.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on up button.
6. Verify user is able to update the "Uptime date" and "Time" field values.

**Result:**

- User should be able to enter/update the Value in "Uptime date" field in format depending on user locale.
- User should be able to enter/update the time in "Time" field in HH:MM format.

## Scenario 8 - Verify asset widget is refreshed to show the new state after successfully saving the transaction

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on down button.
6. Enter downtime date and time e.g. 05/25/2021 and 10:30 AM(Current date and time).
7. Save it by clicking on tick button.

**Result:**

- Asset widget should be refreshed to show the new state after successfully saving the transaction with date of the last status change.
- Drawer should close back with the status updated when user clicks the blue button.

## Scenario 9 - Verify When reporting from down to up, the date/time must be after any previous downtime or uptime report dates

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on down button.
6. Enter downtime date and time e.g. 05/25/2021 and 10:30 AM(Current date and time).
7. Save it by clicking on tick button.
8. Click on up button.
9. Enter Uptime date and time e.g. 05/27/2021 and 10:00AM (future date and time).
10. Click on blue button and save it.
11. Again, Enter downtime date and time e.g. 05/24/2021 and 10:30 AM (i.e. Date and time less than previous downtime or uptime dates.)

**Result:**

- Error message "New asset status change date must be greater than change dates on all previous transactions for this asset." should be displayed to user.
- Blue button should be greyed out until user corrects the date and time.

## Scenario 10 - Verify when asset associated with work order is in "Down" status, WORKTYPE.PROMPTDOWN is checked and user tries to change the status to completed/closed

**Pre-condition:**

1. Set "maximo.mobile.statusforphysicalsignature" property in system properties to include "COMP" status.
2. Login with Admin credentials in Maximo classic/Manage.
3. Goto - Organizations > Work Order Options > Other Organization Options.
4. Goto asset application.
5. Create a new asset.
6. Go to work order tracking application.
7. Create a new work order, associate the asset, assign labor as technician and approve work order.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click on the work order and user lands on work order details page.
6. Click on the asset status button and change the asset status to "Down".
7. In the asset status sliding drawer, provide the status date and time and save it.
8. The asset status is changed to down(indicating as down arrow).
9. Click on report work button and user lands on report work button.
10. Click the complete button on top right corner of the page.
11. Verify user can not complete the work order as the asset status is 'Down'.

**Result:**

- A system message is displayed to user for asset down and after closing it, no signature prompt is displayed.
- The user can not complete the work order as the asset status is 'Down'.

## Scenario 11 - Verify when asset associated with work order is in "UP" status and user tries to change the status

**Pre-condition:**

1. Set "maximo.mobile.statusforphysicalsignature" property in system properties to include "COMP" status.
2. Login with Admin credentials in Maximo classic/Manage.
3. Change the status of the work order to Approved.
4. Goto asset application.
5. Create a new asset.
6. Go to work order tracking application.
7. Create a new work order, associate the asset and assign labor as technician.
8. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click on the work order and user lands on work order details page.
6. Click on the asset status button and change the asset status to "UP".
7. In the asset status sliding drawer, Provide the status date and time and save it.
8. The asset status is changed to UP (indicating as Up arrow).
9. Click on report work button and user lands on report work button.
10. Click the complete button on top right corner of the page.
11. Verify a signature pop up appears, provide the signature and save it.
12. Verify user can complete the work order as the asset status is UP.

**Result:**

- The asset downtime system message is not displayed. The signature popup is displayed to user.
- The work order status is changed to "Completed" when the user saves his signature.
- The signature file attachment is added in attachment section and attachment count is updated.
- The name of the attachment contains name/description of status.
- The date and time when signature file was captured can be verified in db using ```select * from docinfo where document ='xyz'```

## Scenario 12 - Verify that asset status (report downtime) touch-point on WO details page is either disabled or hidden when technician do not have permission to report downtime for assets

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Report Downtime"(REPDOWN) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Report Downtime"(REPDOWN) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, associate an operating asset to work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Verify that asset status (report downtime) touch-point in "Asset and location" section on WO details page is either disabled or hidden.

**Results:**

The asset status (report downtime) touch-point in "Asset and location" section on WO details page should be either disabled or hidden when technician do not have permission to report downtime for assets.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 13 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on 'up/down' button in asset section on work order details page.
5. Click on up button and verify the ui/Click on down button and verify the ui.

**Result:**

- UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- Smart Input version of the components should be used.

**Note:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.
