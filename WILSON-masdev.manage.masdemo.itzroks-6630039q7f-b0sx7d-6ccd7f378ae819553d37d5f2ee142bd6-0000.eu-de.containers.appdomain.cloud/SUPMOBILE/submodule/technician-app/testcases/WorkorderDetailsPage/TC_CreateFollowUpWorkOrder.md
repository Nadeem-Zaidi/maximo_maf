# Create follow-up work order functionality

These test cases will verify create follow-up work order functionality on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-18227: Eli can create a follow up work order
- GRAPHITE-23718: [Split 18227] Eli can create a follow up work order
- GRAPHITE-33385: Eli can create a follow up work order
- GRAPHITE-31511: Eli wants to have same edit capabilities when creating Follow up WO
- GRAPHITE-43205: Eli should be able to scan and populate asset/location attribute
- GRAPHITE-47250: Follow up work order should be displayed in the FUP WO list before synching
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-11093: Follow up / related records should present the record class
- GRAPHITE-56867: Eli wants to see details of Follow Up work orders

**Design URL:**

- <https://ibm.invisionapp.com/share/8DO0BSWH3WX#/screens/319650954_wo_-_Row>
- <https://ibm.invisionapp.com/share/R6O0RCCS4YC#/screens/319804108_Create_New>
- <https://ibm.invisionapp.com/d/main#/console/15363156/320158344/preview>
- <https://www.figma.com/file/RAPUxZUIzaPZonCgW1udeP/Technician?node-id=228%3A25496>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify availability of "Follow-up work" list item/tile on work order details page and and verify availibility/unavailibility of badge count

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Verify availability of "Follow-up work" list item/tile.
6. Click on the work order card to open wo details page.
7. Verify unavailability of badge count on "Follow-up work" list item/tile.
8. Create a follow-up work order for this work order.
9. Verify availability of badge count on "Follow-up work" list item/tile and badge count value is 1.
10. Click on "Follow-up work" list item/tile.
11. Verify that "Follow-up work" page is displayed.

**Result:**

- "Follow-up work" list item/tile should be available on work order details page.
- Badge count should be unavailable on "Follow-up work" list item/tile as no follow-up/related work order is associated with the work order.
- Badge count should be available on "Follow-up work" list item/tile.
- Badge count value should be 1 as one follow-up work order is associated with the work order.
-"Follow-up work" page should be displayed when technician taps on "Follow-up work" list item/tile.
- "Create follow-up work" with "+" button should be available on the 'Follow-up work' page.

**Note:**

On small screen devices, only "+" button will be displayed and button label "Create follow-up work" will not be displayed.

## Scenario 2 - Verify contents of "Follow-up work" page when no follow-up/related work order is associated with the work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Verify contents of "Follow-up work" page.

**Result:**

The contents of the "Follow-up work" page should be:

- Header title should be "Follow-up work" with back chevron and Done(blue background with checkmark) buttons.
- "Related work orders" section with "Create follow-up work" button with "+" icon.
- Message "No related records." should be displayed.
- “Service requests” section.
- Message "No related records." should be displayed.

## Scenario 3 - Verify contents of "Follow-up work" page when follow-up/related work orders and Service request are associated with the work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.
4. Create a follow-up work order for this work order.
5. Create a Service request for this work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Verify contents of "Follow-up work" page.

**Result:**

The contents of the "Follow-up work" page should be:

- Header title should be "Follow-up work" with back chevron and Done(blue background with checkmark) buttons.
- "Related work orders" section with "Create follow-up work" button with "+" icon.
- Related work order record displaying follow-up work order - wonum, WO description and related record relationship as "Follow-up record".
- “Service requests” section with related work order record displaying service request created- Service request number, Service Description and related record relationship as ”Related” or “Follow-up record”.
- Related work order section and Service requests section have data in list view and read-only.

**Note:**

The contents of follow-up work page for the work order created in pre-condition step 4 should have:

- Related work order record displaying originating work order - wonum, WO description and related record relationship as "Originating record".

## Scenario 4 - Verify that technician is taken to the follow-up work list instead of work order list screen

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.
4. Create a follow-up work order for this work order.
5. Create a new Service request for this work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Enter the description.
7. Click on navigator and tap 'My Schedule'.
8. Verify save/discard popup is dispalyed.
9. click on save button.

**Result:**

Maximo Mobile application should take the user back to the Follow-up WO list screen.

## Scenario 4 - Verify that technician is able to create follow up if asset has large amount of associated work orders

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Confirm that asset on the WO where user is creating the follow up has a number of associated WO's that exceeds the fetch limit.
4. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Enter the description or other details if required.
7. Click on save and verify follow up record is created.

**Result:**

- Technician should not throw any error while creating follow-up work order. 
For example- "BMXAA7387E - While attempting to retrieve 21 of WORKORDER, the operation was terminated because the preset limit 20 was exceeded for retrieving WORKORDER into a single set. Reduce the number of selected objects for the operation." should not be dispalyed.

## Scenario 5 - Verify Originating record in follow-up WO page diplays in the newly created follow up

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button to create follow-up work order successfully.
9. Follow-up work order is created and displayed in "Related work orders" section.
10. Click on chevron icon and navigate to WO details page.
11. Again Click on "Follow-up work" list item/tile to open "Follow-up work" page.
12. Verify that originating record is dispalyed in follow-up work order.

**Result:**

User should not be able to move to workorder details page as there is no chevron icon displayed and it is an origniating record.

## Scenario 6 - Verify user can see follow up created in follow up page in expected time frame after sync at WO list page 

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button to create follow-up work order successfully.
9. Verify follow-up work order is created and displayed in "Related work orders" section in expecetd time and not take longer than usual to reflect under "Related work orders" section.

**Result:**

follow-up work order should be created and displayed in "Related work orders" section in expecetd time and should not take longer than usual to reflect under "Related work orders" section.

## Scenario 7 - Verify user can navigate to the details page of new follow-up created in expected time frame

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button to create follow-up work order successfully.
9. Follow-up work order is created and displayed in "Related work orders" section.
10. For web, chevron icon should be available immediately once user creates a new follow-up record.
10. Click on chevron icon and navigate to WO details page.
11. Verify user is able to navigate to details page of new follow-up record craeted without waiting for much longer time.
12. For mobile, chevron icon is disabled after follow-up record is created. 
13. Navigate to WO list page and click on 'check for updates' icon. 
14. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
15. Click on the work order card to open wo details page.
16. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
17. Verify that Chevron icon is now enabled and user can click on chevron icon to navigate to WO details page without taking longer time than usual.

**Result:**

- For web, chevron icon should be available immediately once user creates a new follow-up record and user should be able to navigate to WO details page without any performance issues in expected timeframe.
- For mobile, chevron icon should be available after syncing the records on WO list page and user should be able to navigate to WO details page without any performance issues in expected timeframe.

## Scenario 8 -  Verify user can edit the details page of created follow up WO with valid/invalid values

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page. 
8. Tap on Save button to create follow-up work order successfully.
9. Follow-up work order is created and displayed in "Related work orders" section.
10. Click on chevron icon and navigate to WO details page.
11. Click on edit icon.
12. Make some changes to the fields with valid and invalid combinations.
(For example- Inavalid priority, asset/location)

**Result:**

User should be able to edit the details page of created follow up WO with valid/invalid values.

## Scenario 9 - Verify that the badge count on "Follow-up work" list item/tile is sum of number of records in "Related work orders" section and Service Request section on "Follow-up work" page matches

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.
4. Create a follow-up work order for this work order.
5. Create a new Service request for this work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button.
9. Verify a toast message confirming that the follow-up work order created is displayed when technician taps the Save button.
10. Verify that the number of records in "Related work orders" section and Service requests section matches with the badge count value i.e. "3".

**Result:**

- A green background toast message "Follow-up work created" with 'x' and checkmark icons is displayed for two seconds at the top of the screen.
- The number of records in "Related work orders" section and Service requests section on "Follow-up work" page should match with the badge count value i.e. "3” on "Follow-up work" list item/tile.

## Scenario 10 - Verify contents of "Follow-up work" page when follow-up/related work orders is present but no Service request is associated with the work order and viceversa

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.
4. Create a follow-up work order for this work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Verify contents of "Follow-up work" page.

**Result:**

The contents of the "Follow-up work" page should be (follow-up/related work orders is present but no Service request is associated with the work orde):

- Header title should be "Follow-up work" with back chevron and Done(blue background with checkmark) buttons.
- "Related work orders" section with "Create follow-up work" button with "+" icon.
- Related work order record displaying follow-up work order - wonum, WO description and related record relationship as "Follow-up record".
- “Service requests” section.
- Message "No related records." should be displayed.

The contents of the "Follow-up work" page should be (follow-up/related work orders is not present but Service request is associated with the work order):

- Header title should be "Follow-up work" with back chevron and Done(blue background with checkmark) buttons.
- "Related work orders" section with "Create follow-up work" button with "+" icon.
- Message "No related records." should be displayed.
- “Service requests” section.
- Service requests” section with related work order record displaying service
request created- Service request number, Service Description and related record relationship as ”Related” or “Follow-up record”.

## Scenario 11 - Verify "Create follow-up work order" page is displayed to edit the content for the yet-to-be-created follow up work order when technician taps "Create follow-up work" button

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Work type, Asset, Location, Scheduled start, Scheduled finish and Estimated duration fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button.
7. Verify "Create follow-up work order" page is displayed to edit the content for the yet-to-be-created follow up work order.
8. Verify the contents of "Create follow-up work order" page.
9. Verify each field displayed in editable mode has a unique way of editing the field value.

**Result:**

"Create follow-up work order" page should be displayed to edit the content for the yet-to-be-created follow up work order.
"Create follow-up work order" page should have "Overview" and "Asset and location" sections. The contents of the "Create follow-up work order" page should be:

- Header title should be "Create follow-up work order" with back chevron and Save(blue text with checkmark) buttons.
- Description field should have same value as that of originating work order description and can be edited. This field should be blank if originating work order doesn't have description value.
- Long description field should have same value as that of originating work order Long description and can be edited. This field should have placeholder "-" if originating work order doesn't have Long description value.
- Priority field should have same value as that of originating work order Priority and can be edited. This field should have placeholder text "Enter 0 to 999" if originating work order doesn't have Priority value.
- "Scheduled start" and "Scheduled finish" fields should be blank/empty as these field values are not copied from originating work order.
- "Estimated duration" field should have default value as "0:00" with "-" and "+" spinner buttons. This field value is not copied from originating work order.
- "Work type" field should have same value as that of originating work order "Work type" field and can be edited. It should display value as "Select a type" if originating work order doesn't have "Work type" value.
- Asset and Location fields should have Asset number and Location value same as that of originating work order. Asset number and Location number placeholders should be displayed in these fields if originating work order doesn't have these field values.
- Parts identifier/Identify (camera) icon besides Asset field in 3 dot menu should be disabled for EAM. (Applicable for MAS env. only)
- Search and Scan options in 3 dot menu should be enabled for both Asset and Location fields.

Verify the below fields can be added/edited/validated in following ways:

- For adding/editing WORKORDER.DESCRIPTION, Technician can enter a work order description and should only be allowed to enter 100 characters.
- For adding/editing WORKORDER.LONGDESCRIPTION, Technician can open the long description Rich text component and enter the long description and save the value. The saved value should reflect in the Long description field after clicking back button on Rich Text component.
- Verify text content entered in different styles in long description Rich text component should be reflected as plain text when viewed in long description field.
- For adding/editing WORKORDER.WORKTYPE, Technician can select a work type from the work type lookup.
- For adding/editing WORKORDER.WOPRIORITY, Technician can enter/specify a work order priority between 0 and 999 or leave the field blank.
- For adding/editing WORKORDER.SCHEDSTART, Technician can specify the date/time with a date picker input field. It cannot be after the Scheduled finish.
- For adding/editing WORKORDER.SCHEDFINISH, Technician can specify the date/time with a date picker input field. It cannot be before the Scheduled start.
- For adding/editing WORKORDER.ESTDUR, Technician can enter the estimated duration value or use the spinner "+" and "-" controls (30 minutes duration step).
- For adding/editing WORKORDER.ASSETNUM, User can enter the asset number as well as use the asset search, parts identifier and bar/QR code scanning.
- For adding/editing WORKORDER.LOCATION, User can enter the location as well as use the location search and bar/QR code scanning.

**Note:**

To perform detailed validation test cases for these fields, please perform respective validation test cases from "TC_CreateWorkOrder.md" and "TC_EditWorkOrderDetails.md" files.

## Scenario 12 - Verify confirmation dialog for "Save or discard changes?" is displayed if technician has added/modified field values and clicks back button on "Create follow-up work order" page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields.
8. Click on back button on "Create follow-up work order" page.

**Result:**

A confirmation dialog for "Save or discard changes?" with Discard and Save buttons should be displayed. The details and functionality of the dialog should be:

- Dialog title should be "Save or discard changes?" with 'X' button.
- Dialog contents should be "To leave this page, you must first discard or save your changes." with Discard and Save buttons.
- Clicking 'X' button should close the dialog and technician should still be on "Create follow-up work order" page to make more changes and/or save it.
- Clicking Discard or 'X' button should discard the changes and new follow-up work order is not created.
- Clicking Save button should save the changes and creates new follow-up work order.

## Scenario 13 - Verify no confirmation dialog for "Save or discard changes?" is displayed if technician has not added/modified any data on "Create follow-up work order" page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Click on back button on "Create follow-up work order" page.

**Result:**

No confirmation dialog for "Save or discard changes?" should be displayed as technician has not added/modified any data on "Create follow-up work order" page.

## Scenario 14 - Verify that new follow-up work order is added to "Related work orders" section when follow-up work order is created

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button.
9. Verify that new follow-up work order is added to "Related work orders" section.

**Result:**

- A new follow-up work order should be added to "Related work orders" section.
- Follow-up work order record should display wonum, WO description and related record relationship as "Follow-up record".

## Scenario 15 - Verify various fields values of new follow-up work order when technician saves the follow-up work order successfully

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button to create follow-up work order successfully.
9. Verify various fields values of created follow-up work order in UI, Maximo classic and/or database.

**Result:**

A new follow-up work order should be created successfully as per the data provided by technician. Most of the other information should be defaulted based on the technician and the originating work order details.

The following fields should copy or default as follows:

- WONUM - Temporary until synced with the server. Post sync maximo generated work order number.
- STATUS - WAPPR
- STATUSDATE - This should default to the current system date/time.
- DESCRIPTION - As added/edited by technician or copied from originating work order
- ASSETNUM - As added/edited by technician or copied from originating work order
- LOCATION - As added/edited by technician or copied from originating work order
- CHANGEBY - Current User
- CHANGEDATE - Current System Date/Time
- WOPRIORITY - As added/edited by technician or copied from originating work order
- REPORTEDBY - Default Current User
- REPORTDATE - Current System Date/Time
- PHONE - Defaults based on Reported By
- FAILURECODE - Failure Class defaults based on the Asset on the Work Order
- ORGID - As per orgid linked to default insert site of Current User
- SITEID - As per Current User default insert site
- WOCLASS - Defined by maximo for work orders
- ONBEHALFOF - Copied from originating work order
- ORIGRECORDCLASS - From the creating work order
- ORIGRECORDID - From the creating work order
- ORIGWOID - From the creating work order
- OWNER - Copied from originating work order

## Scenario 16 - Verify the chevron icon is present for the follow-up work created which navigates user to WO details page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button to create follow-up work order successfully.
9. Follow-up work order is created and displayed in "Related work orders" section.
10. Click on chevron icon and navigate to WO details page.
11. Again Click on "Follow-up work" list item/tile to open "Follow-up work" page.
12. Verify no chevron icon is displayed for origniating record.

**Result:**

- Technician should be navigated to WO details page after clicking chevron button for the follow-up work order created
- Work order number should be same on follow-up work order page and WO details page.
- Chevron button should not be displayed for the parent WO.
- User should not be able to move to workorder details page as there is no chevron icon displayed and it is an origniating record.

## Scenario 17 - Verify technician is navigated back to Work order details page and badge count is updated with new value when Done or back button is clicked on the "Follow-up work" page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order with WO Description, Long description, Priority, Scheduled start, Scheduled finish, Estimated duration, Work type, Asset and Location fields.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Make required changes in "Create follow-up work order" page fields or leave as it is.
8. Tap on Save button to create follow-up work order successfully.
9. Create another follow-up work order.
10. Two follow-up work orders are created and displayed in "Related work orders" section.
11. Click on Done or back button.

**Result:**

- Technician is navigated back to Work order details page.
- The badge count on "Follow-up work" list item/tile should have new value and increased by two.

## Scenario 18 - Verify that on the "Create follow-up work order" page, Technician can view and edit asset and location associated to the work order under Asset and Location section

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order with asset and location.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created work order in WO list and click on it to open WO details.
4. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
5. Click on "Create follow-up work" button to open "Create follow-up work order" page.
6. Verify Technician is able to view the asset and location fields on "Create follow-up work order" page in editable mode.

**Result:**

- Technician should be able to see the existing values of asset and location on "Create follow-up work order" page.
- Technician should be able to add/edit/update asset and location value by entering asset and location, using asset and location search and barcode scanning.
- Technician should not be able to add/edit/update inactive location value by entering location, using asset and location search and barcode scanning.

## Scenario 19 - Verify if there is no data specified for asset and location, user can see the water mark text: Asset number and/or Location number in their respective fields. Also, verifywhen there is data specified for asset and location, user can see the asset/location IDs and descriptions

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order without asset and location.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created work order in WO list and click on it to open WO details.
4. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
5. Click on "Create follow-up work" button to open "Create follow-up work order" page.
6. Verify that the placeholder text: Asset number and/or Location number are displayed in their respective fields on "Create follow-up work order" page.
7. Create a work order with asset and location.
8. Click on "My Schedule" tile.
9. Search for the newly created work order in WO list and click on it to open WO details.
10. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
11. Click on "Create follow-up work" button to open "Create follow-up work order" page.
12. Verify Technician is able to view the asset/location IDs and descriptions on "Create follow-up work order" page.

**Result:**

- The placeholder text: Asset number and/or Location number should be displayed in their respective fields on "Create follow-up work order" page.
- Technician should be able to add/update asset and location field values and save the follow-up work order.
- Technician should be able to view the asset/location IDs and descriptions on "Create follow-up work order" page.

## Scenario 20 - Verify that user will get the system message if try to update the asset when asset and location are already associated with work order

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order with asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created work order in WO list and click on it to open WO details.
4. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
5. Click on "Create follow-up work" button to open "Create follow-up work order" page.
6. Go to 'Asset and location' section to update a new asset in asset field.
7. Click on 'Save' button to save the changes.

**Result:**

A pop-up system message "BMXAA4722E - The specified asset is not in current location. Do you want to update the location with this asset's location - XXXXX? If you don't want to apply changes to the location or asset, click close" should be displayed with 'Yes', 'No' and 'Close' buttons.

- Case 1: If user clicks on 'Yes' button then location should also be updated according to new asset.
- Case 2: If user clicks on 'No' button then only asset should be updated.
- Case 3: If user clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 21 - Verify asset failure code and asset priority is added in follow-up work order failure code and asset/location priority, when an asset with asset failure code and asset priority but no location associated is added to work order

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Select value for "failure class" from the lookup e.g. VPN.
4. Add asset priority to 1.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Enter work order description, priority and save the work order.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Go to 'Asset and location' section and click on 3 dots menu for asset.
8. Click on search and select asset created in pre-condition steps from asset lookup.
9. Click on save button.

**Result:**

- Technician should able to save the follow-up work order and updated asset details should be displayed on work order details page.
- On "Report work" page, failure code of follow-up work order should be displayed which is same as associated asset failure code.
- Asset priority should be updated in follow-up work order asset/location priority field which can be verified in database.

## Scenario 22 - Verify asset failure code and asset priority is updated in follow-up work order failure code and asset/location priority, when an asset is added with associated location having location failure code and location priority

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with failure code as VPN, location priority as 1, type as operating and change status to active.
3. Create an asset, associate location created in step 2 and change it's status to operating.
4. Select value for "failure class" from the lookup e.g. "Hardware".
5. Add asset priority to 2.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Enter work order description, priority and save the work order.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Go to 'Asset and location' section and click on 3 dots menu for asset.
8. Click on search and select asset created in pre-condition steps from asset lookup.
9. Location should be auto-populated which is same as associated with the selected asset.
10. Click on save button to save the work order.

**Result:**

- Technician should be able to save the follow-up work order, asset and location details should be displayed on work order details page.
- On "Report work" page, failure code of follow-up work order should be displayed which is same as associated asset failure code.
- Asset priority should be updated in follow-up work order asset/location priority field which can be verified in database.

## Scenario 23 - Verify system message while updating work order with an asset which is not in the selected location(with GL account)

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with GL account as Gl1, failure code as VPN, location priority as 1, type as operating and change it's status to active.
3. Create an asset, associate it to location created in step 2 and change it's status to operating.
4. Create another location with GL account as Gl2, failure code as Tumble, location priority as 2, type as operating and change it's status to active.
5. Create another asset, associate it to location created in step 4 and change it's status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Enter work order description, priority and save the work order.
5. Go to 'Asset and location' section and click on 3 dots menu for asset.
6. Click on search and select first asset created in pre-condition step 3 from asset lookup.
7. Asset field is populated with selected asset and location field is auto-populated with location associated with selected asset.
8. Click on save button to save the work order.
9. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
10. Click on "Create follow-up work" button to open "Create follow-up work order" page.
11. Change asset field value to second asset created in pre-condition step 5.
12. Click on save button to save the work order.
13. Verify System message is displayed.

**Result:**

- System message "BMXAA4722E - The specified asset is not in the current location. Do you want to update the location with this asset's location - l2? If you do not want to apply changes to the location or asset, click Close" should be displayed.
  - Case 1:
    - a) If technician clicks on 'Yes' button then another system message "BMXAA4510E - The location and asset combination you have entered would default a different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination? Clicking Cancel will return you with no changes" should be displayed and technician clicks on Yes. GL account Gl2 is updated in follow-up work order GL account, location should also be updated according to new asset. New asset failure code and asset priority (if not null) should be updated in follow-up work order.
    - b) If technician clicks on 'Yes' button then another system message "BMXAA4510E - The location and asset combination you have entered would default a different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination? Clicking Cancel will return you with no changes" should be displayed and technician click on No. GL account remains the same for follow-up work order i.e. GL1, location should also be updated according to new asset. New asset failure code and asset priority (if not null) should be updated in follow-up work order.
    - c) If technician clicks on 'yes' button then another system message "BMXAA4510E - The location and asset combination you have entered would default a different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination? Clicking Cancel will return you with no changes" should be displayed and and technician clicks on cancel. Change request should be cancelled and pop-up message box should be closed and nothing is updated.
  - Case 2: If technician clicks on 'No' button then asset will be updated to new value and location remains same. New asset failure code and asset priority (if not null) should be updated in follow-up work order.
  - Case 3: If technician clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 24 - Verify that in MAS environment, mobile device camera opens when technician clicks on the "Identify" option (camera) and "Identify" option (camera) is disabled in Maximo EAM environment

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with an asset with image which exists in the system.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
8. Verify "Identify" option is displayed.
9. Click on "Identify" option (camera).
10. Verify that mobile device camera opens.
11. Verify "Identify" option (camera) is disabled for Maximo EAM enviornment(perform same steps to verify this).

**Result:**

- "Identify" option should be displayed next to "Asset" field on "Create follow-up work order" page.
- Mobile device camera should open when technician clicks on the "Identify" option (camera).
- Identify option (camera) should be disabled on Maximo EAM environment.

## Scenario 25 - Verify technician can add/update asset attribute in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset and other combinations

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with an asset with image which exists in the system.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
8. Verify technician can add/update asset attribute in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset.
Click on "Create follow-up work" button to open "Create follow-up work order" page.
9. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
10. Click on "Identify" option (camera).
11. Verify "No results found" is displayed, if "Identify" (camera) is unable to identify the scanned asset.
12. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
13. Click on "Create follow-up work" button to open "Create follow-up work order" page.
14. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
15. Verify "Identify" option (camera) is unavailable.

**Result:**

- The asset attribute should be populated in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset.
- "No results found" should be displayed, if "Identify" (camera) is unable to identify the scanned asset.
- "Identify" option (camera) should be unavailable for "Location" attribute.

## Scenario 26 - Verify that Scan button is displayed to scan asset using barcode or QR code for asset attribute. Also, verify different combination with valid/invalid asset

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with/without asset and location.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
8. Verify "Scan" option/button is displayed.
9. Click on "Scan" option/button.
10. Verify that mobile device camera opens.
11. Click on "Scan" option/button and scan a valid asset.
12. Verify "Asset" field is populated with scanned asset information if barcode/QR code scanner identifies the scanned asset.
13. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
14. Click on "Scan" option/button and scan an invalid asset.
15. Verify scanner times out and "Asset" field is not populated or changed if barcode/QR code scanner is unable to identify the scanned asset.

**Result:**

- Scan button should be displayed to scan asset using barcode or QR code for populating "Asset" field on "Create follow-up work order" page.
- Mobile device camera should open to scan asset using barcode or QR code when technician clicks on the "Scan" button.
- The "Asset" field should be populated with scanned asset information if barcode/QR code scanner identifies the scanned asset.
- Scanner should time out and "Asset" field should not be populated or changed if barcode/QR code scanner is unable to identify the scanned asset.

## Scenario 27 - Verify that Scan button is displayed to scan location using barcode or QR code for location attribute. Also, verify combinations with valid/invalid location

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with/without asset and location.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Click on "Create follow-up work" button to open "Create follow-up work order" page.
7. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
8. Verify "Scan" option/button is displayed.
9. Click on "Scan" option/button.
10. Verify that mobile device camera opens.
11. Click on "Create follow-up work" button to open "Create follow-up work order" page.
12. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
13. Click on "Scan" option/button and scan a valid location.
14. Verify "Location" field is populated with scanned location information if barcode/QR code scanner identifies the scanned location.
15. Click on "Create follow-up work" button to open "Create follow-up work order" page.
16. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
17. Click on "Scan" option/button and scan an invalid location.
18. Verify scanner times out and "Location" field is not populated or changed if barcode/QR code scanner is unable to identify the scanned location.

**Result:**

- Scan button should be displayed to scan location using barcode or QR code for populating "Location" field on "Create follow-up work order" page.
- Mobile device camera should open to scan location using barcode or QR code when technician clicks on the "Scan" button.
- The "Location" field should be populated with scanned location information if barcode/QR code scanner identifies the scanned location.
- Scanner should time out and "Location" field should not be populated or changed if barcode/QR code scanner is unable to identify the scanned location.

## Scenario 28 - Verify that "Create follow-up work +" button on "Follow-up work" page is either disabled or hidden when technician do not have permission to create a follow-up work order

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Create followup workorder"(CREATEFUPWO) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Create followup workorder"(CREATEFUPWO) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Verify that "Create follow-up work +" button on "Follow-up work" page is either disabled or hidden.

**Results:**

The "Create follow-up work +" button on "Follow-up work" page should be either disabled or hidden when technician do not have permission to create a follow-up work order.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 29 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.
4. Create a follow-up work order for this work order.
5. Create a Service request for this work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click on the work order card to open wo details page.
5. Click on "Follow-up work" list item/tile to open "Follow-up work" page.
6. Verify UI of the new page for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.

**Result:**

- UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- Smart Input version of the components should be used.
- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 30 - Verify all the above test cases in online and offline/disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in online and offline/disconnected mode on mobiles/tablets and other devices.
