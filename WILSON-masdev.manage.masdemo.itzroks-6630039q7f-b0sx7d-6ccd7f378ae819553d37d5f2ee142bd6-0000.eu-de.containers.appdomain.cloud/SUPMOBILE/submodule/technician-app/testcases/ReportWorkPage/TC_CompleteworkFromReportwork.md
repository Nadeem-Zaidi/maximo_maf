# Complete work order functionality on "Report Work" page

These test cases will verify complete work order functionality from 'Report Work' page on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-16028: Eli can access the Report Work page
- GRAPHITE-21472: Eli can complete a work order from the report work page
- GRAPHITE-25701: Eli can complete work from the Report Work view in the mobile container
- GRAPHITE-34106: Eli is prompted about reporting downtime
- GRAPHITE-31775: Eli can capture physical signatures on a work order
- GRAPHITE-42373: Eli need to have server side definition on when to collect signatures
- GRAPHITE-42339: Eli needs to define a "custom" status for field completion
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-58816: Implement eSig callout on work order status change

**Design URL:**

- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319650258>
- <https://ibm.invisionapp.com/share/RSO01BZUFZ9#/screens/319643488>
- <https://ibm.invisionapp.com/share/YAO17D9VXR3#/screens/319975211_Required_Signatures>
- <https://www.figma.com/file/J6YHCXeCT5oH2c1n3BKPM5/Maximo-Mobile-Patterns?node-id=6532%3A269936&t=1oaffUAF658b7Zfs-0>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify the Report work touch-point button on the work order details page and "Report work" page opens after clicking on Report work touch-point

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Verify the "Report work" touch-point on the work order details page.
5. Click the "Report work" touch-point.
6. Click on the back button on report work page. 

**Results:**

- The "Report work" touch-point should be displayed on the work order details page.
- "Report work" page should be displayed after clicking on Report work touch-point.
- Header title and back arrow button should be displayed on "Report work" page.
- Technician should navigate back to the WO details page by tapping on back button on "Report work" page.

## Scenario 2 - Verify that the user can complete work from the 'Report work' page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the "Report work" touch-point.
5. Click on the "Complete work" button.
6. Verify work order status and toast message.

**Results:**

- The user should be able to complete the work order from the "Report work" page.
- The work order status should be changed to 'Completed'.
- The toast message should be displayed with message "Work order \<wonum\> completed".
- In case, work order is created in offline mode and it is not synced with Maximo then the toast message should be displayed with message "Work order completed".
- The technician should be navigated to WO list page when technician clicks on "Complete work" button.

## Scenario 3 - Verify while completing a WO, no toast/message is displayed if the asset is Down and WORKTYPE.PROMPTDOWN is unchecked

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order with work type e.g PM.
3. Create an asset and associate with the work order.
4. Add assignments for labor and approve WO.
5. Goto - Organizations > Work Order Options > Other Organization Options.
6. The Display Report Prompt upon WO Completion for Asset in "Down Status" should be unchecked.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO list and go to WO details page.
4. Change asset status to down if it is up.
5. Go to "Report work" page by clicking on "Report work" touch-point.
6. Click on "Complete work" button.
7. Verify that no toast/message is displayed and work order status is changed to completed successfully.

**Result:**

No toast/message should be displayed and work order status should change to completed successfully.

## Scenario 4 - Verify while completing a WO, a toast/message is displayed which is for information only, if the asset is Down and WORKTYPE.PROMPTDOWN is checked

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order with work type e.g PM.
3. Create an asset and associate with the work order.
4. Add assignments for labor and approve WO.
5. Goto - Organizations > Work Order Options > Other Organization Options.
6. The Display Report Prompt upon WO Completion for Asset in "Down Status" is unchecked.
7. Check the Display Report Prompt upon WO Completion for Asset in "Down Status".

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO list and go to WO details page.
4. Change asset status to down if it is up.
5. Go to "Report work" page by clicking on "Report work" touch-point.
6. Click on "Complete work" button.
7. Verify that a toast/message is displayed and technician can change the work order status to completed successfully.

**Result:**

- A toast/message should be displayed when technician tries to change the work order status to completed using "Complete work" button.
- The message displayed should be: "The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime."
- After closing the toast message, technician should be able to change the work order status to completed successfully.

## Scenario 5 - Verify while completing a WO, no toast/message is displayed, if the asset is Up and WORKTYPE.PROMPTDOWN is checked

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order with work type e.g PM.
3. Create an asset and associate with the work order.
4. Add assignments for labor and approve WO.
5. Goto - Organizations > Work Order Options > Other Organization Options.
6. The Display Report Prompt upon WO Completion for Asset in "Down Status" is unchecked.
7. Check the Display Report Prompt upon WO Completion for Asset in "Down Status".

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO list and go to WO details page.
4. Change asset status to up if it is already down.
5. Go to "Report work" page by clicking on "Report work" touch-point.
6. Click on "Complete work" button.
7. Verify that no toast/message is displayed and work order status is changed to completed successfully.

**Result:**

No toast/message should be displayed and work order status should change to completed successfully.

**Note:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.

## Scenario 6 - Verify signature prompt is displayed when technician tries to complete work order from report work page and system property for signature requirement is set for COMP status

**Pre-condition:**

1. Set "maximo.mobile.statusforphysicalsignature" property in system properties to include "COMP" status.
2. Login with Admin credentials in Maximo classic/Manage.
3. Go to work order tracking application.
4. Create a new work order and Assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with Technician app.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click on chevron on work order card to open work order details page.
6. Click on the report work touch-point to open report work page.
7. Click the complete button on top right corner of the page.
8. Verify signature pop up is prompted to the user and user can sign in the message box and save it.
9. Verify user is able to complete the work order.

**Result:**

- A signature prompt is displayed to user when user clicks on complete button from report work page.
- After providing the signature and saving it, technician should be able to change the work order status to completed successfully.
- An attachment of signature is saved in attachment section of the work order, which can be verified in maximo classic and user is unable to edit it once it is saved.
- The signature file attachment is added in attachment section and attachment count is updated.
- The name of the attachment contains name/description of status.
- The date and time when signature file was captured can be verified in db using ```select * from docinfo where document ='xyz'```.

## Scenario 7 - Verify while completing a WO, a toast/message is displayed before the signature prompt when work order has asset in "Down" status and WORKTYPE.PROMPTDOWN is checked

**Pre-condition:**

1. Set "maximo.mobile.statusforphysicalsignature" property in system properties to include "COMP" status.
2. Login to maximo/manage application as Admin.
3. Create a work order with work type e.g PM.
4. Create an asset and associate with the work order.
5. Add assignments for labor and approve WO.
6. Goto - Organizations > Work Order Options > Other Organization Options.
7. The Display Report Prompt upon WO Completion for Asset in "Down Status" is checked.
8. Check the Display Report Prompt upon WO Completion for Asset in "Down Status".

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO list and go to WO details page.
4. Change asset status to down if it is up.
5. Go to "Report work" page by clicking on "Report work" touch-point.
6. Click on "Complete work" button.
7. Verify that a toast/message is displayed and technician can change the work order status to completed successfully.

**Result:**

- A toast/message should be displayed when technician tries to change the work order status to completed using "Complete work" button.
- The message displayed should be: "The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime.".
- After closing the toast message, a signature prompt should be displayed to user.
- After providing the signature and saving it, technician should be able to change the work order status to completed successfully.
- An attachment of signature should also be saved in attachments section of the work order, which can be verified in maximo classic and user should unable to edit it once it is saved.

## Scenario 8 - Verify default value and property description of "maximo.mobile.completestatus" system property in maximo

**Steps:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to System properties app and search for "maximo.mobile.completestatus" system property.
3. Verify default value and property description for "maximo.mobile.completestatus" system property.

**Result:**

- The property description for "maximo.mobile.completestatus" system property should be "The status that the work order changes to when Complete work is tapped in Maximo Mobile".
- The default value for "maximo.mobile.completestatus" system property should be "COMP".

## Scenario 9 - Verify work order status is changed to custom status defined in the "maximo.mobile.completestatus" system property when technician taps on Complete work button

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Set "maximo.mobile.completestatus" system property to INPRG or custom status like FLDCOMP - "Field completed" which could be synonym of COMP status.
3. Create a work order.
4. Add assignments for labor and approve work order.

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-condition steps in work order list and go to work order details page.
4. Go to "Report work" page by clicking on "Report work" touch-point.
5. Click on "Complete work" button.
6. Verify work order status is changed to INPRG or custom status like FLDCOMP - "Field completed" defined in the "maximo.mobile.completestatus" system property.

**Result:**

The work order status should be changed to INPRG or custom status like FLDCOMP - "Field completed" defined in the "maximo.mobile.completestatus" system property.

## Scenario 10 - Verify an error message is displayed if custom status defined in the "maximo.mobile.completestatus" system property is same as work order current status when technician taps on Complete work button

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Set "maximo.mobile.completestatus" system property to INPRG value.
3. Create a work order.
4. Add assignments for labor and change work order status to "In progress".

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-condition steps in work order list and go to work order details page.
4. Go to "Report work" page by clicking on "Report work" touch-point.
5. Click on "Complete work" button.
6. Verify an error message is displayed if custom status defined in the "maximo.mobile.completestatus" system property is same as work order current status.

**Result:**

- An error message should be displayed if custom status defined in the "maximo.mobile.completestatus" system property is same as work order current status.
- The message displayed should be: "Could not change Work Order \<wonum\> status to INPRG. BMXAA0032E - The status that you selected is the same as the current status. Select a different status."

**Note:**

In mobile apps, the error message is displayed in error page post syncing with server.

## Scenario 11 - Verify an error message is displayed if custom status defined in the "maximo.mobile.completestatus" system property is not allowed depending on work order current status when technician taps on Complete work button

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Set "maximo.mobile.completestatus" system property to APPR value.
3. Create a work order.
4. Add assignments for labor and change work order status to "In progress".

**Steps:**

1. Login to Maximo mobile app with the technician credentials assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-condition steps in work order list and go to work order details page.
4. Go to "Report work" page by clicking on "Report work" touch-point.
5. Click on "Complete work" button.
6. Verify an error message is displayed if custom status defined in the "maximo.mobile.completestatus" system property is not allowed depending on work order current status.

**Result:**

- An error message should be displayed if custom status defined in the "maximo.mobile.completestatus" system property is not allowed depending on work order current status.
- The message displayed should be: "Could not change Work Order \<wonum\> status to APPR. BMXAA4679E - Work Order \<wonum\> must be of Waiting on Approval status, but it has a status of INPRG."

**Note:**

In mobile apps, the error message is displayed in error page post syncing with server.

## Scenario 12 - Verify that 'Complete work' button on Report work page is either disabled or hidden when technician do not have permission for "Complete work"(COMPWOBUTTON) sig option

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Complete work"(COMPWOBUTTON) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Complete work"(COMPWOBUTTON) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that 'Complete work' button on Report work page is either disabled or hidden.

**Results:**

The 'Complete work' button on Report work page should be either disabled or hidden when technician do not have permission for "Complete work"(COMPWOBUTTON) sig option.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 13 - Verify esignature prompt is displayed when technician tries to complete work order from report work page and system property for esignature requirement is set for COMP status

**Pre-condition:**

1. Set "maximo.mobile.esignatureenabled" property as 1 and "maximo.mobile.wostatusforesig" property in system properties to include "COMP" status.
2. Login with Admin credentials in Maximo classic/Manage.
3. Go to work order tracking application.
4. Create a new work order and Assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with Technician app.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click on chevron on work order card to open work order details page.
6. Click on the report work touch-point to open report work page.
7. Click the complete button on top right corner of the page.
8. Verify esignature pop up is prompted to the user and user can enter esig in the box and save it.
9. Verify user is able to complete the work order.

**Result:**

- A esignature prompt is displayed to user when user clicks on complete button from report work page.
- After providing the esignature and saving it, technician should be able to change the work order status to completed successfully.

## Scenario 14 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 15 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
