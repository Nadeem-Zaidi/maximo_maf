# Add and Edit labor transaction functionality on 'Report work' page

These test cases will verify add and Edit labor transaction functionality on 'Report work' page on Technician web app, online and offline mode on mobile containers.These test cases will cover the functionalities of following stories:

- GRAPHITE-16383: Eli can add his labor time
- GRAPHITE-23665: [Split 16383] Eli can add his labor time
- GRAPHITE-35595: Eli can specify a task on a labor actual report
- GRAPHITE-40406: No warning of data loss on close of labor entry
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

Design URLs:

- <https://ibm.invisionapp.com/d/main#/console/15363156/319738874/inspect>
- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319650253>
- <https://ibm.invisionapp.com/share/SJO1IWGCYM2#/screens>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify availability of '+' button in Labor section on 'Report work' page to add labor time and on clicking '+' button opens sliding drawer to add a labor time record for technician

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on Report Work touch-point to open 'Report work' page.
5. Verify that '+' button is available in Labor section on 'Report work' page to add labor time.
6. Click on '+' button in Labor section on 'Report work' page.
7. Verify that sliding drawer opens to add a labor time record.
8. Verify various fields displayed and their default contents.

**Result:**

- '+' button should be available in Labor section on 'Report work' page to add labor time.
- Sliding drawer should open to add a labor time record.
- Various fields and their default contents displayed on sliding drawer for adding labor time should be as below:

- Sliding drawer Header label is "Labor" with X and blue check-mark buttons.
- Labor with default value as logged in technician display name.
- Type with default value as "Actual work time".
- Start date with a date picker input field - Required and populated with current date.
- Start time with time picker.
- Hours duration field - Required and populated with default value as '0:00'.
- End date with a date picker input field.
- End time with time picker.
- Craft - Required and Populated with default craft of the labor.
- Skill level - Populated with default skill level of the labor and is read only field.
- Task - Default is blank.

**Note:** In case of Skill level is not defined for labor, a place holder should be displayed.

## Scenario 2 - Verify contents of the labor field lookup and Type field lookup while adding/editing a labor

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Verify labor field lookup contents are populated from the "laborcraftrate" table and and all unique labor codes from that table are populated in this lookup and their corresponding Person Display name is displayed in this lookup.
7. Verify Type field lookup contents are populated from the associated domain for validation.

**Result:**

- Labor field is auto populated with PERSON.DISPLAYNAME by default, i.e. logged in technician display name.
- All unique labors for that site should be populated in this labor lookup and their corresponding Person display name is displayed in each record. By default the record having logged in technician display name is highlighted in the lookup.
- Type field is work type (LABTRANS.TRANSTYPE). It's contents are populated from the associated domain for validation.

## Scenario 3 - Verify valid values for Hours field

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Verify valid values or business rules for Hours field.

**Result:**

Valid values for Hours field are:

- Negative values are permitted.
- Hours value shouldn't exceed the difference of the start and end date time. In case of larger value, a client side error message should popup.
- Positive hours less than the difference of the start and end date time are permitted.

## Scenario 4 - Verify valid values for Start and end date and time fields and associated calculations

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Verify valid values for Start date and time fields and associated calculations.
7. Verify valid values for End date and time fields and associated calculations.

**Result:**

Valid values for Start date and time fields and associated calculations:

- By default Start date is populated with current date and is required field.
- Start date and time checks MAXVARINPUT.LABTRANSTOLERANCE to see how many hours in the future a labor transaction is permitted. In case of date beyond this calculation, an error message should be displayed.
- Start date and time can't be later than End date and time. An error should popup, if Start date and time is later than end date and time.
- If regular hours and end date and time are provided and technician changes the Start date and time, the regular hours should be updated accordingly.

Valid values for End date and time fields and associated calculations:

- By default End date is not populated and it is not required field.
- End date and time checks MAXVARINPUT.LABTRANSTOLERANCE to see how many hours in the future a labor transaction is permitted. In case of date beyond this calculation, an error message should be displayed.
- End date and time can't be earlier than Start date and time. An error should popup, if End date and time is earlier than end date and time.
- If regular hours and start date and time are provided and technician changes the end date and time, the regular hours should be updated accordingly.

## Scenario 5 - Verify if two values of Start date and time, Hours, End date and time are provided then third value is calculated accordingly

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Enter two values of Start date and time, Hours, End date and time.
7. Verify that third value is calculated automatically and populated.

**Result:**

If two values of Start date and time, Hours, End date and time are provided then third value is calculated and populated automatically.

- If Technician fills start date time and hours then End date time is calculated and populated.
- If Technician fills start date time and End date time then hours is calculated and populated.
- If Technician fills end date time and hours then Start date time is calculated and populated.

## Scenario 6 - Verify Technician can override calculated hours by providing negative hours or hours less than difference of start date time and end date time

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Enter two values of Start date and time, Hours, End date and time so that third value is calculated automatically and populated.
7. Change Hours field to negative value or hours less than difference of start date time and end date time.

**Result:**

Technician should be able to override calculated hours by providing negative hours or hours less than difference of start date time and end date time.

## Scenario 7 - Verify contents and values of the Craft and skill level fields lookup while adding/editing a labor time record or after changing craft of the labor from lookup

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Verify Craft field lookup contents and show the records associated with the labor only.
7. Open Craft field lookup and select any new craft, skill level combination.

**Result:**

- The Craft lookup should display crafts (LABORCRAFTRATE.CRAFT_description) and associated skill level.
- The craft lookup should show only the crafts associated with the labor.
- The Craft and Skill level fields should change as per the selected craft and skill level combination.
- The craft field is required and cannot be empty.
- The skill level field is filled automatically and is read-only.

**Note:** In case of Skill level is empty for selected craft skill level combination, a place holder should be displayed for Skill level.

## Scenario 8 - Verify technician can select a task from task lookup when single or multiple planned tasks are added to work order

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order and add single or multiple planned tasks to work order.
3. Provide the task id and task description while adding tasks to work order.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the "My Schedule".
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on the right chevron for Task to open task look up.

**Result:**

- All planned tasks should be displayed correctly in task lookup. Each task record should display task id and task description(if available).
- Technician should be able to select the task from the lookup.
- Technician selects the task record from the lookup. Selected task id and task description should be displayed in the Task field.

## Scenario 9 - Verify unavailability of chevron to open task lookup when planned task is not added to work order

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order and do not add planned tasks to work order.
3. Add planned items/materials and/or tools, if required.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the "My Schedule".
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Verify chevron to open task lookup is unavailable for Task field.

**Result:**

Chevron to open task lookup should be unavailable for Task field when planned task is not added to work order.

## Scenario 10 - Verify search functionality works correctly for task id and task description on Task lookup. Also, verify technician can view task id only in the task lookup and Task field post selecting the task record when task description is not provided for the planned task

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order and add single or multiple planned tasks to work order.
3. Provide the task id and task description while adding tasks to work order.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the "My Schedule".
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on the right chevron for Task to open task look up.
7. Search the tasks by task id and/or task description in the task look up.
8. Verify that search result records count and task records information is correct and matches search criteria.

**Result:**

- Search result records count and task records information should be correct and matches search criteria.
- Technician should be able to view only task id in the task look up records.
- Selecting the task record should display task id only in the Task field and placeholder should be displayed for task description.

## Scenario 11 - Verify correct task record should be highlighted when technician re-opens the task lookup after a task is already selected in previous steps

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order and add single or multiple planned tasks to work order.
3. Provide the task id and task description while adding tasks to work order.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the "My Schedule".
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on the right chevron for Task to open task look up.
7. Select a task record from task lookup. Selected task id and task description displays in Task field.
8. Click on the right chevron for Task to re-open task look up.
9. Verify that the task record selected in previous steps is highlighted in the task lookup.

**Result:**

The task record selected in previous steps should be highlighted with blue mark in the task lookup.

## Scenario 12 - Verify Technician can cancel the labor time by clicking X button

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Enter valid values for various fields on the labor drawer.
7. Click X button to cancel the labor time.

**Result:**

Technician should be able to cancel the labor time by clicking X button.

## Scenario 13 - Verify Labor time record is not saved if technician click's Done i.e. check-mark button without filling data in required fields

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Enter valid values in some fields and keep one of the required fields empty.
7. Click on Done or blue check-mark button to save the labor time.

**Result:**

Labor time record shouldn't be saved and should instruct the technician to fill the required fields.

## Scenario 14 - Verify Labor time record is saved if technician click's Done i.e. check-mark button after filling data in required fields

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Enter valid values in some fields along with all required fields.
7. Click on Done or blue check-mark button to save the labor time.

**Result:**

Labor time record should be saved and record is displayed in the labor section of the 'Report work' page.

## Scenario 15 - Verify unavailability of edit pencil icon button for saved Labor time record

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Enter valid values in some fields along with all required fields.
7. Click on Done or blue check-mark button to save the labor time.
8. Verify that edit pencil icon button is unavailable for the saved labor time record.

**Result:**

Edit pencil icon button should be unavailable for the saved labor time record indicating it is view only.

## Scenario 16 - Verify availability of edit pencil icon button for started Labor time record

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order created in pre-condition steps in WO List.
4. Click on Start button to start a labor transaction either from WO List or WO Details page.
5. Click on Report Work Icon button on WO Details to open 'Report work' page.
6. Verify that a new labor transaction record is created in Labor section and edit pencil icon is available at the end of the record.

**Result:**

A new labor transaction record should be created in Labor section and it has edit pencil icon available at the end of the record indicating it is editable.

The Labor transaction has values

- Labor name
- Start date and time has current date and time values.
- End date and time is empty/place holder.
- Type is Actual work time.
- Hours is '0 hours'.
- Craft has default value.
- Skill has default value.
- Task is blank.

## Scenario 17 - Verify clicking on edit pencil button opens sliding drawer to modify started labor time record

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order created in pre-condition steps in WO List.
4. Click on Start button to start a labor transaction either from WO List or WO Details page.
5. Click on Report Work Icon button on WO Details to open 'Report work' page.
6. A new labor transaction record is created with edit pencil icon.
7. Verify that clicking edit pencil icon button opens labor drawer to modify started labor time record.
8. Verify that labor drawer fields are populated with existing data of the labor time record.

**Result:**

Labor drawer should open to modify started labor time record. The labor drawer fields should be populated with existing data of the labor time record.

**Note** Perform Scenario#2 to Scenario#15 to validate that the business rules are still applicable during modification of labor time record.

## Scenario 18 - Verify values of craft and skill level fields when technician changes the labor from the labor lookup

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on labor lookup to change the default labor to some other labor from the lookup.

**Result:**

- The value of labor should be updated as per selected labor from labor lookup.
- The Craft and skill field should be auto populated with the default value of craft and skill associated with the labor.

## Scenario 19 - Verify technician should be able to change craft and skill associated with the labor selected

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on labor lookup to change the default labor to some other labor from the lookup.
7. Default value of craft and skill fields are displayed of the selected labor.
8. Click on Craft lookup and choose any other craft associated with the labor except default craft.

**Result:**

User should be able to change the craft and skill combination of the labor to non default values and save successfully.

## Scenario 20 - Verify search functionality works correctly on labor lookup

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the "My Schedule".
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on the right chevron for Labor to open labor look up.
7. Search the labor records by labor code or labor display name in the labor look up.
8. Verify that search result records count and labor records information is correct and matches search criteria.

**Result:**

Search result records count and labor records information should be correct and matches search criteria.

## Scenario 21 - Verify search functionality works correctly on craft lookup

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the "My Schedule".
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on the right chevron for craft to open craft look up.
7. Search the craft records by craft id or craft description in the craft look up.
8. Verify that search result records count and craft records information is correct and matches search criteria.

**Result:**

Search result records count and craft records information should be correct and matches search criteria.

## Scenario 22 - Verify that dialog with save and discard options is not displayed when technician clicks on "X" button without making any changes on labor sliding drawer

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Click on "X" button to close the sliding drawer.
7. Verify that dialog with save and discard options is not displayed.

**Result:**

Dialog with save and discard options should not be displayed when technician clicks on "X" button without making any changes on labor sliding drawer.

## Scenario 23 - Verify that dialog with save and discard options is displayed when technician clicks on "X" button after making changes on labor sliding drawer

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Make changes to one or more fields on the labor sliding drawer.
7. Click on "X" button to close the sliding drawer.
8. Verify that dialog with save and discard options is displayed.

**Result:**

Dialog with save and discard options should be displayed when technician clicks on "X" button after making changes on labor sliding drawer.

## Scenario 24 - Verify that labor time record is saved with updated values when technician clicks on "Save" button on dialog and labor drawer fields have valid values

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Make changes to one or more fields on the labor sliding drawer so that there is no validation error message.
7. Click on "X" button to close the sliding drawer.
8. Click 'Save' button on dialog with save and discard options.
9. Verify that labor time record is saved with updated values and saved labor transaction is displayed in labor section.

**Result:**

- Labor time record should be saved with updated values.
- New saved labor transaction record should be displayed in labor section.
- Labor sliding drawer should be closed.

## Scenario 25 - Verify that labor time record is not saved and updated values are discarded when technician clicks on "Discard" button on dialog

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Make changes to one or more fields on the labor sliding drawer so that there is no validation error message.
7. Click on "X" button to close the sliding drawer.
8. Click 'Discard' button on dialog with save and discard options.
9. Verify that labor time record is not saved and updated values are discarded along with labor sliding drawer is closed.

**Result:**

- Labor time record should not be saved and updated values should be discarded.
- New labor transaction record should not be displayed in labor section.
- Labor sliding drawer should be closed.

## Scenario 26 - Verify that labor time record is not saved with updated values when technician clicks on "Save" button on dialog and labor drawer fields have validation error

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Make changes to one or more fields on the labor sliding drawer so that there is validation error message displayed on labor drawer e.g. providing future date and time.
7. Click on "X" button to close the sliding drawer.
8. Click 'Save' button on dialog with save and discard options.
9. Verify that labor time record is not saved and labor sliding drawer is still open with updated field values.

**Result:**

Labor time record is not saved/updated and labor sliding drawer is still open with updated field values.

## Scenario 27 - Verify that labor time record is not saved with updated values when technician clicks on "Discard" button on dialog and labor drawer fields have validation error

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in Labor section on 'Report work' page to open sliding drawer to add a labor time record.
6. Make changes to one or more fields on the labor sliding drawer so that there is validation error message displayed on labor drawer e.g. providing future date and time.
7. Click on "X" button to close the sliding drawer.
8. Click 'Discard' button on dialog with save and discard options.
9. Verify that labor time record is not saved and updated values are discarded along with labor sliding drawer is closed.

**Result:**

- Labor time record should not be saved and updated values should be discarded.
- New labor transaction record should not be displayed in labor section.
- Labor sliding drawer should be closed.

**Note:**

Perform all the above mentioned save and discard dialog related scenarios while editing an existing labor record. All scenarios should work as per expectations.

## Scenario 28 - Verify that '+' button in 'Labor' section on Report work page is either disabled or hidden when technician do not have permission for reporting actual labor transaction

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Actual labors"(ACTUALLABORS) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Actual labors"(ACTUALLABORS) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that '+' button in 'Labor' section on Report work page is either disabled or hidden.

**Results:**

The '+' button in 'Labor' section on Report work page should be either disabled or hidden when technician do not have permission for reporting actual labor transaction.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 29 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Navigate to screens/pages/cards of above mentioned scenarios.
3. Verify UI of the cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.

**Result:**

- UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- Smart Input version of the components should be used.
- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 30 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
