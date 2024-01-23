# Failure reporting functionality on "Report Work" page

These test cases will verify failure reporting functionality on "Report work" page for Technician web app, online and offline mode on mobile containers. These test cases will cover functionalities of following user stories:

- GRAPHITE-16097: Eli can view reported failures
- GRAPHITE-20805: Eli can report failures on a phone
- GRAPHITE-22551: (Split GRAPHITE-20805) Eli failure reports on a phone are integrated with split screen component
- GRAPHITE-20991: Eli can enter remarks against a failure
- GRAPHITE-16120: Eli can report failures on a tablet device
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-56627: Remark long description field in failure Report page for work orders in My schedule

**Design URLs:**

- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319650248>
- <https://ibm.invisionapp.com/share/RSO01BZUFZ9#/screens/319633583_3-Report_Work>
- <https://ibm.invisionapp.com/share/YAO17D9VXR3#/screens/319975211_Required_Signatures>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify "Failure" section is available on the "Report work" page and displays heading for Class, Problem, Cause, Remedy and details in the Failure section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Go to "Report work" page.
5. Verify technician can view Failure section on "Report work" page.
6. Verify technician can view Class, Problem, Cause, Remedy and Details headings in Failure section.
7. Verify failure class, problem, cause and remedy values in Failure section.

**Results:**

- Failure section should be available on the "Report work" page.
- Failure section should have the grey border layout with "Failure" heading and edit icon.
- Class, Problem, Cause, Remedy and Details headings should be displayed in the Failure section.
- "-" placeholder should be displayed for the failure class, Problem, Cause and Remedy.

## Scenario 2 - Verify that technician can select and save the failure class from a value list

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. Verify update/edit button is displayed in Failure section and technician can edit failure reporting data.
7. The failure class value list is displayed to technician.
8. Select the failure class from the list.

**Result:**

- Update/edit button should be displayed in Failure section and technician should be able to edit failure reporting data.
- The failure class selected from the value list should be auto saved.
- The problem field should be in focus and technician should see value list to select problem code.

## Scenario 3 - Verify that technician can select and save a problem code from a value list (only problem codes associated to selected failure class are displayed)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.

**Result:**

- The problem code selected from the value list should be auto saved.
- While selecting problem code for the first time the failure date/time is added according to the system date/time.
- The cause field should be in focus and technician should see value list to select cause code.

## Scenario 4 - Verify that technician can select and save cause code from value list (only causes associated to selected failure class and problem code are displayed)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.
8. The cause code value list is displayed and technician selects the cause code value from the list.

**Result:**

- The cause code selected from the value list should be auto saved.
- The remedy field should be in focus and technician should see value list to select remedy code.

## Scenario 5 - Verify that technician can select and save remedy code from a value list (only remedy codes associated to selected failure class, problem and cause codes are displayed)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.
8. The cause code value list is displayed and technician selects the cause code value from the list.
9. The remedy code value list is displayed and technician selects the remedy code value from the list.

**Result:**

- The remedy codes list associated with selected failure class, problem and cause codes should be displayed.
- The remedy code selected from the value list should be auto saved.

## Scenario 6 - Verify that when technician clears out or changes failure class or cause code then child fields are cleared out

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.
8. The cause code value list is displayed and technician selects the cause code value from the list.
9. The remedy code value list is displayed and technician selects the remedy code value from the list.
10. Change or remove the failure class.
11. Change or remove the cause field value.

**Result:**

- All child fields i.e. problem, cause and remedy fields should be cleared out.
- The remedy field should be cleared out.

## Scenario 7 - Verify technician should not be able to select remedy, cause, problem without selecting the first field- 'failure class' 

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. Verify technician is not able to select problem, cause, remedy without selecting the failure class.

**Result:**
 - Technician should not be able to select remedy, cause, problem without selecting the first field- 'failure class'. 
 - No chevron icon should be displayed for remedy, cause and problem when failure class is not selected.

 ## Scenario 8 - Verify the maximum limit for summary and description should not exceed the maxium length  defined

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the edit button in Failure section.
6. Click on details chevron.
7. Add text in remarks and description field.
8. Verify that Remarks and Description field maximum character count displayed in UI is 100 and 32000 respectively.

**Result:**

Remarks and Description field maximum character count displayed in UI shoule be 100 and 32000 characters respectively.

## Scenario 9 - Verify that technician navigates to Report work page on selecting failure class, cause, problem, remedy or any one from these and adding details (summary and description)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.
8. The cause code value list is displayed and technician selects the cause code value from the list.
9. The remedy code value list is displayed and technician selects the remedy code value from the list.
10. Also, technician can select any one value and proceed further to add summary and description in details section.

**Result:**

Technician should be navigated to Report work page on selecting failure class, cause, problem, remedy or any one from these and adding details (summary and description).

## Scenario 10 - Verify when technician selects values for failure class, problem, cause and remedy codes then failure data is displayed with corresponding descriptions

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.
8. The cause code value list is displayed and technician selects the cause code value from the list.
9. The remedy code value list is displayed and technician selects the remedy code value from the list.
10. Select the failure code values on right pane and verify that appropriate field is highlighted in the left pane.

**Result:**

- The Failure data i.e. failure class, problem, cause and remedy should be displayed with corresponding description of selected failure code values.
- Appropriate field in the left pane should be highlighted based on selecting failure codes in the right pane e.g. selecting problem code value on the right pane should highlight the problem code field in the left pane.
- Reopening the failure report drawer post selecting few fields for failure report, the next failure code field (which is blank) should be in focus. In above steps, the failure class and problem code fields already have values and when technician reopens the failure report drawer to update it, the cause field should be in focus.

## Scenario 11 - Verify that when technician clears out or changes problem code then child fields are cleared out

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. The problem code value list is displayed and technician selects the problem code value from the list.
8. The cause code value list is displayed and technician selects the cause code value from the list.
9. The remedy code value list is displayed and technician selects the remedy code value from the list.
10. Change or remove the problem field value.

**Result:**

All child fields i.e. cause and remedy fields should be cleared out.

## Scenario 12 - Verify when technician taps done at any point of time i.e. might tap done after entering the failure class but doesn't want to enter problem, cause or remedy codes

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. Technician taps on done button.

**Result:**

- Technician should be navigated to "Report work" page.
- The data which was selected for failure class should be displayed in the Failure section.
- All the other fields like problem, cause and remedy should display placeholder icon("-").

## Scenario 13 - Verify that tapping back button displays the latest failure report data on the "Report work" page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. The failure class value list is displayed and technician selects the failure class value from the list.
7. Click on back button.

**Result:**

Tapping back button should display the latest failure report data on the "Report work" page i.e. selected failure class data should be displayed as it is auto saved.

## Scenario 14 - Verify that remarks and description field maximum character count displayed in UI matches with respective field length in database/classic

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the edit button in Failure section.
6. Click on details chevron.
7. Add information along with remarks and description.
8. Verify that Remarks and Description field maximum character count displayed in UI matches with respective field length in database/classic

**Result:**

Remarks and Description field maximum character count displayed in UI should match with respective field length in database/classic.

## Scenario 15 - Verify that the remarks and description are saved when clicked on save button at top right corner.

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the edit button in Failure section.
6. Click on details chevron.
7. Add information along with remarks and description.
8. Verify that Remarks and Description fields are saved when clicked on save button at top right corner.

**Result:**

Remarks and Description fields should be saved when clicked on save button at top right corner.

## Scenario 16 - Verify the remarks date and time in database when technician enters the remarks first

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the update button in Failure section.
6. Add failure report information along with remarks.
7. Click on done button or de-focus from Remarks field.
8. Verify the remarks date and time in database/classic.

**Result:**

- Remarks field should be populated with the current system date/time and should be saved correctly in database/classic.

## Scenario 17 - Verify that technician can modify the existing failure remarks and description in details section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open work order details page.
4. Click on the "Report work" touch-point button.
5. Click on the edit button in Failure section.
6. Add failure report information along with remarks and description in details section.
7. Click on save button and navigate to failure section.
8. Click on done button.
8. Click on edit button in Failure section again.
9. Modify the remarks or description data and click on done button.
10. Verify that updated remarks are displayed in UI and saved in database correctly.

**Result:**

Updated remarks and description should be displayed in UI and saved in database correctly.

## Scenario 18 - Verify that edit pencil button in 'Failure' section on Report work page is either disabled or hidden when technician do not have permission for editing failure report

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Failure report"(FAILUREREP) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Failure report"(FAILUREREP) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that edit pencil button in 'Failure' section on Report work page is either disabled or hidden.

**Results:**

The edit pencil button in 'Failure' section on Report work page should be either disabled or hidden when technician do not have permission for editing failure report.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 19 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 20 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
