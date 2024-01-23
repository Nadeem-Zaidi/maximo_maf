# Change work order status functionality on work order details/list page

These test cases will verify change work order status functionality on 'Work order details/list' page on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-21893: Eli can change the status of his work order on the WO details
- GRAPHITE-16601: Eli can change the status of his work order on his WO card
- GRAPHITE-18472: Eli view the available statuses on his work order
- GRAPHITE-19923: Eli can comment on a status change
- GRAPHITE-34106: Eli is prompted about reporting downtime
- GRAPHITE-31775: Eli can capture physical signatures on a work order
- GRAPHITE-42373: Eli need to have server side definition on when to collect signatures
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-58816: Implement eSig callout on work order status change

**Design URL:**

- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319592427>
- <https://ibm.invisionapp.com/share/YAO17D9VXR3#/screens/319975211_Required_Signatures>
- <https://www.figma.com/file/J6YHCXeCT5oH2c1n3BKPM5/Maximo-Mobile-Patterns?node-id=6532%3A269936&t=1oaffUAF658b7Zfs-0>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Validate available status options in change status drawer when work order status is "Approved" on WO list/details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.

**Results:**

The following status options should be available in the drawer with their appropriate acronyms:

- Canceled (CAN)
- Closed (CLOSE)
- Completed (COMP)
- In progress (INPRG)
- Waiting on approval (WAPPR)
- Waiting on material (WMATL)
- Waiting on plant cond (WPCOND)
- Waiting to be scheduled (WSCH)

## Scenario 2 - Validate available status options in change status drawer when work order status is "Completed" on WO list page and WO details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create two work orders.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the first work order.
4. Change the status of work order from WO list page to Completed.
5. Verify work order is removed from the list of 'Assigned work' filter.
6. Search the second work order.
7. Click on the chevron icon and navigate to WO details page.
8. Click the gray action tag besides the priority action tag to open the WO status drawer and change the WO status to Completed.
9. Verify technician navigate sto WO list page and completed WO id longer visible.

**Results:**

- Searched work order should not be present in the work order list. It should show under 'Work order history' filter with status as Completed.
- The following status option should be available in the drawer for 'Work order history' filter with their appropriate acronym:
    Closed (CLOSE)

## Scenario 3 - Validate available status options in change status drawer when work order status is "In progress" on WO list/details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and change the WO status to In progress.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.

**Results:**

The following status options should be available in the drawer with their appropriate acronyms:

- Closed (CLOSE)
- Completed (COMP)
- Waiting on approval (WAPPR)
- Waiting on material (WMATL)

## Scenario 4 - Validate available status options in change status drawer when work order status is "Canceled" on WO list page and WO details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and cancel the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order.
4. Change the WO status to cancelled from anywhere(WO list or WO details page)
5. Verify work order is not reflecting under 'Assigned work' filter.
6. Verify technician navigates to WO list page from WO details page(If status is changed from WO details page)

**Results:**

Searched work order should not be present in the work order list.

## Scenario 5 - Validate available status options in change status drawer when work order status is "Waiting on material" on WO list/details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and change WO status to "Waiting on material".

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.

**Results:**

The following status options should be available in the drawer with their appropriate acronyms:

- Canceled (CAN)
- Closed (CLOSE)
- Completed (COMP)
- In progress (INPRG)
- Waiting on approval (WAPPR)

## Scenario 6 - Validate available status options in change status drawer when work order status is "Waiting on plant cond" on WO list/details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and change the WO status to "Waiting on plant cond".

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.

**Results:**

The following status options should be available in the drawer with their appropriate acronyms:

- Approved (APPR)
- Canceled (CAN)
- Closed (CLOSE)
- Completed (COMP)
- In progress (INPRG)
- Waiting on approval (WAPPR)
- Waiting on material (WMATL)
- Waiting to be scheduled (WSCH)

## Scenario 7 - Validate available status options in change status drawer when work order status is "Waiting to be scheduled" on WO list/details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and change the WO status to "Waiting to be scheduled".

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.

**Results:**

The following status options should be available in the drawer with their appropriate acronyms:

- Approved (APPR)
- Canceled (CAN)
- Closed (CLOSE)
- Completed (COMP)
- In progress (INPRG)
- Waiting on approval (WAPPR)
- Waiting on material (WMATL)
- Waiting on plant cond (WPCOND)

## Scenario 8 - Validate available status options in change status drawer when work order status is "Waiting on approval" on WO list page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order.

**Results:**

Searched work order should not be present in the work order list.

## Scenario 9 - Validate available status options in change status drawer when work order status is "Waiting on approval" on WO details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create two new work orders.
4. Add assignments for labor for first workorder and don't approve the WO.
5. Add assignments for labor and approve the second WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the first work order.
4. Verify searched work order is not be present in the work order list.
5. Search the work order and click to open WO details page.
6. Click the gray action tag besides the priority action tag to open the WO status drawer.
7. Change WO status to "Waiting on approval".
8. Click the gray action tag besides the priority action tag again to open the WO status drawer.

**Results:**
- For first searched work order, it should not be present in the work order list.
- The following status options should be available in the drawer with their appropriate acronyms for second work order:

- Approved (APPR)
- Canceled (CAN)
- Closed (CLOSE)
- Completed (COMP)
- In progress (INPRG)
- Waiting on material (WMATL)
- Waiting on plant cond (WPCOND)
- Waiting to be scheduled (WSCH)

## Scenario 10 - Validate available status options in change status drawer when work order status is "Closed" on WO details/list page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create two new work orders.
4. Add assignments for labor and close the first WO.
5. Add assignments for labor and approve the second WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the first work order.
4. Search the second work order and click to open WO details page.
5. Click the gray action tag besides the priority action tag to open the WO status drawer.
6. Change WO status to Closed.
7. Verify user navigates to WO list page and there should be no status option available in the drawer for closed work order in 'Work order history' filter.

**Results:**

- Searched first work order should not be present in the work order list.
- There should be no status option available in the drawer for a closed work order.

## Scenario 11 - Validate technician can change work order status from work order card on WO List page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.

**Results:**

- The WO status drawer should open (technician can open status drawer by clicking on chevron as well as text within status action tag).
- When technician selects a new status option, the new status option should change to selected and Done button turns blue.
- When technician clicks Done button, the change status action is executed and technician should be brought back to the previous screen.
- The WO status should change to selected status.

**Note:** Perform above scenario for change WO status on work order details page too. If work order status is changed to completed, cancelled or closed on work order details page then user is navigated to WO list page and these work orders are no longer available in WO list.

## Scenario 12 - Validate that WO status is not updated/changed when technician cancels WO status change by clicking "X" on WO list/details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.
5. Select any new status option and click cancel(X) button.

**Results:**

The change status drawer should close and WO status should remain unchanged.

## Scenario 13 - Validate technician can enter a comment while changing WO status in WO list/WO details pages

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open WO details page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.
5. Select any new status option.
6. Enter comment in "Add a comment" field and click Done button.
7. Verify user cannot add more than 50 characters.

**Results:**

- The WO status should change to selected new status and comment is saved.
- Technician should not be allowed to enter more than 50 characters.
- Change status drawer should close and technician is brought back to previous page i.e. WO list/WO details page.

**Note:**

The length of the "Add a comment" field is set in the database, currently it is 50 characters.

## Scenario 14 - Verify that work order might be moved out from the current view after changing WO status depending on business rules on WO list page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order on WO list page.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.
5. Select new status option from either of Closed, Waiting on Approval, Canceled and Completed.
6. Enter comment in "Add a comment" field and click Done button.

**Results:**

Work order should be moved out from the current view after changing the WO status to either of Closed, Waiting on Approval, Canceled and Completed depending on business rules.

## Scenario 15 - Verify while changing WO status to Completed/Closed, no toast/message is displayed if the asset is Down and WORKTYPE.PROMPTDOWN is unchecked

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
5. Select the WO status option as Closed or Completed on change status drawer.
6. Click on Done button.
7. Verify that no toast/message is displayed and WO status is changed to completed/closed successfully.

**Result:**

No toast/message should be displayed and work order status should change to completed/closed successfully from WO list/details pages.

## Scenario 16 - Verify while changing WO status to Completed/Closed, a toast/message is displayed which is for information only, if the asset is Down and WORKTYPE.PROMPTDOWN is checked

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
5. Select the WO status option as Closed or Completed on change status drawer.
6. Verify that a toast/message is displayed.
7. Technician can change the work order status to completed/closed successfully by clicking Done button.

**Result:**

- A toast/message should be displayed when technician tries to change the work order status to completed/closed on WO list/details pages.
- The message displayed should be: "The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime."
- After closing the toast message, technician should be able to change the work order status to completed/closed successfully.

## Scenario 17 - Verify while changing WO status to Completed/Closed, no toast/message is displayed, if the asset is Up and WORKTYPE.PROMPTDOWN is checked

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
5. Select the WO status option as Closed or Completed on change status drawer.
6. Click on Done button.
7. Verify that no toast/message is displayed and WO status is changed to completed/closed successfully.

**Result:**

No toast/message should be displayed and work order status should change to completed/closed successfully from WO list/details pages.

## Scenario 18 - Verify signature prompt is not displayed by default, when user changes the status of any work order from wo list/details page/report work page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create 3 new work orders and assign labor as technician.
4. Change the status of the work orders to Approved .

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work orders.
5. Click chevron on the work order card to open work order details page.
6. Change the status of all the work orders to Waiting to be scheduled.
7. Change the status of first work order to "Waiting on Approval". Verify the signature pop up doesn't appear when the work order status is changed to "Waiting on Approval".
8. Change the status of second work order to "Approved". Verify the signature pop up doesn't appear when the work order status is changed to "Approved".
9. Change the status of third work order to "Completed". Verify the signature doesn't appear when the work order status is changed to "Completed".

**Result:**

Signature prompt is not displayed, when user changes the status of work order to any status available in status list.

### Scenario 19 - Change the value of "maximo.mobile.statusforphysicalsignature" property as "WAPPR" and verify signature prompt is displayed only for changing work order status as Waiting for approval

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto system properties.
3. Search for "maximo.mobile.statusforphysicalsignature" in the property name.
4. Enter the global value as "WAPPR".
5. Select the checkbox against the property, Save and Live refresh the property.
6. Go to work order tracking application.
7. Create a new work order and assign labor as technician.
8. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Waiting on Approval(WAPPR).
7. A 'signature required' pop up is displayed.

**Result:**

- Signature prompt should be displayed while changing the work order status to Waiting on Approval.
- Signature prompt shouldn't display while changing the work order status other than Waiting on Approval.

**Note:** Validate signature prompt is displayed for each valid work order status, by assigning the status values to "maximo.mobile.statusforphysicalsignature" property.

## Scenario 20 - Verify user has to provide a physical signature by drawing by finger/using pointing device/mouse in the signature box, when signature prompt appears

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Completed.
7. A 'signature required' pop up is displayed.

**Result:**

- User is able to provide a physical signature by drawing by finger/using pointing device/mouse in the signature box when signature prompts appears.
- User is able to change the status of wo after providing the signature and saving it.
- Signature file is added to attachment section and attachment count is incremented by 1 for WO, which can be verified by checking classic maximo.

## Scenario 21 - Verify when user click on "Cancel" button on the signature pop up, the status of the work order is not changed and user is navigated back to status lookup drawer

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Waiting to be scheduled.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Approved (APPR).
7. A 'signature required' pop up is displayed and provide the signature, click on "CANCEL" button.

**Result:**

- Status of the work order is not changed to Approved when user clicks on "Cancel" button on the signature prompt.
- The status remains as "Waiting to be scheduled".
- No signature file is added to attachment section and attachment count should not change.

## Scenario 22 - Verify, when user click on cross "x" button on the signature prompt, signature gets clear and save button becomes disabled and user is unable to change the status

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Waiting to be scheduled.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Approved (APPR).
7. A 'signature required' pop up is displayed and provide the signature, click on "x" button.

**Result:**

- Signature gets cleared/erased and save button becomes disabled.
- The technician should be unable to change the work order status without providing signature and saving it.

## Scenario 23 - Verify user is unable to change the status of work order when user doesn't provide the signature

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Completed.
7. A 'signature required' pop up is displayed.
8. Do not provide the signature in signature box.

**Result:**

Save button remains disabled on signature prompt until user provide physical signature and hence unable to change the status of work order.

## Scenario 24 - Verify attachment will contain date/time when signature was captured while changing the status of work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to "APPR,INPRG" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to In Progress(INPRG).
7. A 'signature required' prompt is displayed and provide the signature and save it.
8. Click on attachments tab and verify user can view the attachment.

**Result:**

- Signature file attachment should be added in attachment section and attachment count should also be updated.
- Name of the attachment should contain name/description of status.
- Date and time when signature file was captured can be verified in db using ```select * from docinfo where document ='xyz'```

## Scenario 25 - Verify user can delete the signature file attachment

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to "APPR,INPRG" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to In Progress(INPRG).
7. A 'signature required' prompt is displayed and provide the signature and save it.
8. Click on attachments tab and verify user can delete the attachment.

**Result:**

User should be able to delete the signature file attachment and attachment count should be decremented by 1.

## Scenario 26 - Verify signature prompt is displayed for all status change options available within the Technician app (my schedule, wo details page, report work page)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to include "APPR", "CAN","CLOSE", "INPRG", "WAPPR", "WMATL", "WPCOND", "WSCH" and "COMP" statuses.
3. Go to work order tracking application.
4. Create multiple work orders and assign labor.
5. Change status of all the work order to "Waiting to be scheduled".

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work orders.
7. For example, change the status of first work order to "Waiting on Approval". Verify the signature pop up appears when the work order status is changed to "Waiting on Approval".
8. For example, change the status of second work order to "Approved". Verify the signature pop up appears when the work order status is changed to "Approved".
9. Change the status of third work order to "Completed". Verify the signature pop up appears when the work order status is changed to "Completed".

**Result:**

- Signature prompt should be displayed when user changes the status of work order to any status available in status list.
- Also attachment count should be incremented whenever user is able to change status with signature prompt.

## Scenario 27 - Verify that status action tag on WO list and WO details pages is disabled when technician do not have permission to change status of work order

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Change Status"(STATUS) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Change Status"(STATUS) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Verify that status action tag on work order card in Assigned WO list is disabled.
5. Open WO details page and verify status action tag is disabled.

**Results:**

- The status action tag on WO list and WO details pages should be disabled when technician do not have permission to change status of work order.
- The current status of the work order should be displayed correctly.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 28 - Verify that APPR and synonyms of APPR are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to approved

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Approve Work Order"(APPR) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Approve Work Order"(APPR) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that APPR and synonyms of APPR options are not displayed.
6. Open WO details page and verify that APPR and synonyms of APPR options are not displayed in 'Change status' drawer.

**Results:**

APPR and synonyms of APPR should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to approved.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 29 - Verify that CAN and synonyms of CAN are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to canceled

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Cancel Work Order"(CANCEL) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Cancel Work Order"(CANCEL) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that CAN and synonyms of CAN options are not displayed.
6. Open WO details page and verify that CAN and synonyms of CAN options are not displayed in 'Change status' drawer.

**Results:**

CAN and synonyms of CAN should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to canceled.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 30 - Verify that CLOSE and synonyms of CLOSE are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to closed

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Close Work Order"(CLOSE) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Close Work Order"(CLOSE) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that CLOSE and synonyms of CLOSE options are not displayed.
6. Open WO details page and verify that CLOSE and synonyms of CLOSE options are not displayed in 'Change status' drawer.

**Results:**

CLOSE and synonyms of CLOSE should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to closed.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 31 - Verify that COMP and synonyms of COMP are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to completed

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Complete Work Order"(COMP) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Complete Work Order"(COMP) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that COMP and synonyms of COMP options are not displayed.
6. Open WO details page and verify that COMP and synonyms of COMP options are not displayed in 'Change status' drawer.

**Results:**

COMP and synonyms of COMP should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to completed.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 32 - Verify that INPRG and synonyms of INPRG are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to 'In progress'

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Initiate Work Order"(INIT) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Initiate Work Order"(INIT) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that INPRG and synonyms of INPRG options are not displayed.
6. Open WO details page and verify that INPRG and synonyms of INPRG options are not displayed in 'Change status' drawer.

**Results:**

INPRG and synonyms of INPRG should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to 'In progress'.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 33 - Verify that WSCH and synonyms of WSCH are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to 'Waiting to be scheduled'

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Waiting to be Scheduled"(WSCH) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Waiting to be Scheduled"(WSCH) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that WSCH and synonyms of WSCH options are not displayed.
6. Open WO details page and verify that WSCH and synonyms of WSCH options are not displayed in 'Change status' drawer.

**Results:**

WSCH and synonyms of WSCH should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of work order to 'Waiting to be scheduled'.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 34 - Verify that WAPPR and synonyms of WAPPR are not displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of an approved work order to 'Waiting on approval'

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Undo Approval of Work Order"(UNDOAPPR) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Undo Approval of Work Order"(UNDOAPPR) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order card in Assigned WO list.
4. Click on status action tag on work order card to open 'Change status' drawer.
5. Verify that WAPPR and synonyms of WAPPR options are not displayed.
6. Open WO details page and verify that WAPPR and synonyms of WAPPR options are not displayed in 'Change status' drawer.

**Results:**

WAPPR and synonyms of WAPPR should not be displayed in 'Change status' drawer on WO list and WO details pages when technician do not have permission to change status of an approved work order to 'Waiting on approval'.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 35 - Verify esignature prompt is not displayed by default, when user changes the status of any work order from wo list/details page/report work page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create 3 new work orders and assign labor as technician.
4. Change the status of the work orders to Approved .

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work orders.
5. Click chevron on the work order card to open work order details page.
6. Change the status of all the work orders to Waiting to be scheduled.
7. Change the status of first work order to "Waiting on Approval". Verify the esignature pop up doesn't appear when the work order status is changed to "Waiting on Approval".
8. Change the status of second work order to "Approved". Verify the esignature pop up doesn't appear when the work order status is changed to "Approved".
9. Change the status of third work order to "Completed". Verify the esignature doesn't appear when the work order status is changed to "Completed".

**Result:**

eSignature prompt is not displayed, when user changes the status of work order to any status available in status list.

## Scenario 36 - Verify that "maximo.mobile.wostatusforesig" and "maximo.mobile.esignatureenabled" property is defined in system properties

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.

**Steps:**

1. Goto system properties.
2. Search for "maximo.mobile.wostatusforesig" and "maximo.mobile.esignatureenabled" in the property name.
3. Verify various fields for "maximo.mobile.wostatusforesig" and "maximo.mobile.esignatureenabled" system property.

**Result:**

- The property "maximo.mobile.wostatusforesig" should be defined in system properties.
- The Description of the property should be "This defines for which Maximo status the esig will be prompted."
- The Default value of the property should be null/blank.
- The property "maximo.mobile.esignatureenabled" should be defined in system properties.
- The Description of the property should be "Is esig enabled for maximo mobile"
- - The Default value of the property should be null/blank.

### Scenario 37 - Change the value of "maximo.mobile.wostatusforesig" property as "WAPPR" and verify esignature prompt is displayed only for changing work order status as Waiting for approval

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto system properties.Search for "maximo.mobile.esignatureenabled" and set value 1.
3. Search for "maximo.mobile.wostatusforesig" in the property name.
4. Enter the global value as "WAPPR".
5. Select the checkbox against the property, Save and Live refresh the property.(Logout and login is required in technician if user login into app already)
6. Go to work order tracking application.
7. Create a new work order and assign labor as technician.
8. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Waiting on Approval(WAPPR).
7. A 'esignature required' pop up is displayed.

**Result:**

- eSignature prompt should be displayed while changing the work order status from Waiting on Approval.
- eSignature prompt shouldn't display while changing the work order status other than Waiting on Approval.

**Note:** Validate esignature prompt is displayed for each valid work order status, by assigning the status values to "maximo.mobile.wostatusforesig" property.

## Scenario 38 - Verify user has to provide an esignature by esigh in the esignature box, when esignature prompt appears

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.wostatusforesig" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Completed.
7. A 'esignature required' pop up is displayed.

**Result:**

- User is able to provide a esignature in the signature box when esignature prompts appears.
- User is able to change the status of wo after providing the correct esignature and saving it.

## Scenario 39 - Verify when user click on "Cancel" button on the esignature pop up, the status of the work order is not changed

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.wostatusforesig" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Waiting to be scheduled.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Approved (APPR).
7. A 'esignature required' pop up is displayed and provide the esignature, click on "CANCEL" button.

**Result:**

- Status of the work order is not changed to Approved when user clicks on "Cancel" button on the esignature prompt.
- The status remains as "Waiting to be scheduled".
- No esignature file is added to attachment section and attachment count should not change.

## Scenario 40 - Verify, when user click on cross "x" button on the esignature prompt, esignature gets clear and save button becomes disabled and user is unable to change the status

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.wostatusforesig" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Waiting to be scheduled.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Approved (APPR).
7. A 'esignature required' pop up is displayed and provide the esignature, click on "x" button.

**Result:**

- eSignature popup will be closed.
- The technician unable to change the work order status as esign is not applied.

## Scenario 41 - Verify user is unable to change the status of work order when user doesn't provide the esignature

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.wostatusforesig" property in system properties to "APPR,COMP" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to Completed.
7. A 'esignature required' pop up is displayed.
8. Do not provide the esignature in esignature box.

**Result:**

Save button remains disabled on esignature prompt until user provide esignature and hence unable to change the status of work order.

## Scenario 42 - Verify No attachment added when esignature was captured while changing the status of work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.wostatusforesig" property in system properties to "APPR,INPRG" value.
3. Go to work order tracking application.
4. Create a new work order and assign labor as technician.
5. Change the status of the work order to Approved.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work order to In Progress(INPRG).
7. A 'esignature required' prompt is displayed and provide correct esignature and save it.
8. Click on attachments tab and verify status of attachment.

**Result:**

- eSignature file attachment should not be added in attachment section and attachment count should not be updated.

## Scenario 43 - Verify esignature prompt is displayed for all status change options available within the Technician app (my schedule, wo details page, report work page)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.wostatusforesig" property in system properties to include "APPR", "CAN","CLOSE", "INPRG", "WAPPR", "WMATL", "WPCOND", "WSCH" and "COMP" statuses.
3. Go to work order tracking application.
4. Create multiple work orders and assign labor.
5. Change status of all the work order to "Waiting to be scheduled".

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work orders.
7. For example, change the status of first work order to "Waiting on Approval". Verify the esignature pop up appears when the work order status is changed to "Waiting on Approval".
8. For example, change the status of second work order to "Approved". Verify the esignature pop up appears when the work order status is changed to "Approved".
9. Change the status of third work order to "Completed". Verify the esignature pop up appears when the work order status is changed to "Completed".

**Result:**

- eSignature prompt should be displayed when user changes the status of work order to any status available in status list.

## Scenario 44 - Verify signature and esignature prompt is displayed for all status change options available within the Technician app (my schedule, wo details page, report work page) when both system properties are set.

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.statusforphysicalsignature" property in system properties to include "APPR", "CAN","CLOSE", "INPRG", "WAPPR", "WMATL", "WPCOND", "WSCH" and "COMP" statuses.
3. 2. Set "maximo.mobile.wostatusforesig" property in system properties to include "APPR", "CAN","CLOSE", "INPRG", "WAPPR", "WMATL", "WPCOND", "WSCH" and "COMP" statuses.
4. Go to work order tracking application.
5. Create multiple work orders and assign labor.
6. Change status of all the work order to "Waiting to be scheduled".

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Login to technician application with the assigned labor.
3. Click on "My Schedule" tile and open the list of work orders.
4. Search for the created work order.
5. Click chevron on the work order card to open work order details page.
6. Change the status of the work orders.
7. For example, change the status of first work order to "Waiting on Approval". Verify the signature and esignature pop up appears when the work order status is changed to "Waiting on Approval".
8. For example, change the status of second work order to "Approved". Verify the signature and esignature pop up appears when the work order status is changed to "Approved".
9. Change the status of third work order to "Completed". Verify the signature and esignature pop up appears when the work order status is changed to "Completed".

**Result:**

- Signature and esignature prompt should be displayed when user changes the status of work order to any status available in status list.
- Also attachment count should be incremented for physical signature only whenever user is able to change status with signature prompt.

## Scenario 45 - Verify that when present on the status change drwaer and switched to (MySchedule,Materials and Maps) from 9 dots ,that respective page should get open

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order.
4. Click the gray action tag besides the priority action tag to open the WO status drawer.
6. Click on the 9 dots (MySchedule,Materials and Maps).
7. Verify that the change status drawer should be redirected to the respective pages when clicked (MySchedule,Materials and Maps).

**Results:**

Change status drawer should be redirected to the respective pages when clicked (MySchedule,Materials and Maps). It should open the new state and not WO status drawer from previous side.

## Scenario 46 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 47 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.

**Note:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.
