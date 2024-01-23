# Work log functionality test cases on work order list and work order details pages

These test cases will verify the UI, contents and various work log related functionalities on Technician web app, online and offline mode on mobile containers. These will cover functionalities of following user stories:

- GRAPHITE-25470: Eli can see and enter Work log in the mobile container
- GRAPHITE-11566: Eli can type a Work log note
- GRAPHITE-11047: Eli can access Work log from the WO card
- GRAPHITE-11070: Eli can access Work log from the WO details view
- GRAPHITE-43322: Eli can select a work log type when creating a log entry
- GRAPHITE-31727: Enable Long Description support for the Chat-Log component

**Design URL:**

- <https://ibm.invisionapp.com/share/BWO03SHYG98#/screens/319506777_Logs>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify technician can open "Work log" drawer on work order card view/list and details page

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Verify that "Work log" touch-point is available on the work order card view/list and work order details page.
5. Click on "Work log" touch-point on work order card to open "Work log" drawer.
6. Verify the text message displayed when there is no work log entry in the "Work log" drawer.

**Results:**

- "Work log" touch-point should be available on the work order card view/list and work order details page.
- Technician should be able to open "Work log" drawer on work order card view/list and details page.
- The text message "No notes to view" followed by "Be the first to add a note" (in next line) should be displayed when there is no work log entry in the "Work log" drawer.

## Scenario 2 - Verify the work log entries in the "Work log" drawer on work order list and details pages

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Verify that most recent work log entries are displayed at the bottom of the "Work log" drawer.

**Results:**

The most recent work log entries should be displayed at the bottom of the "Work log" drawer.

## Scenario 3 - Verify that the work log entries displayed are grouped by day/date and display name of the user (by whom the work log entries were created) is displayed at the top of the work log entries on work order list and details pages

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Enter any new note in 'Add a note' text box on "Work log" drawer.
6. Click on send button to create a new work log entry.
7. Add some more work log entries.
8. Verify work log entries displayed are grouped by day/date.
9. Verify that the display name of the user/technician is displayed at the top of the work log entry.

**Results:**

- Work log entries displayed should be grouped by day/date.
- The display name of the user (by whom the work log entries were created) should be displayed at the top of the work log entry on "Work log" drawer.

## Scenario 4 - Verify that technician can enter note summary, long description and work log type by clicking on expand button on work log drawer

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Start entering few characters in 'Add a note' text box on "Work log" drawer.
6. Click on expand option and navigate to next page.
7. Enter text in note summary upto 100 characters.
8. Enter long description in the rich text area.
9. Select work log type from dispalyed options. 
10. Check/uncheck visibility option.
11. Click on send note arrow at the top right corner.

**Results:**

- Technician should be able to enter maximum 100 characters in text box while adding a note.
- Technician should be able to enter text in the rich text area for long description. 
- Technician should be able to select work log.
- Technician should be able to select/deselect visibility option. 
- All the details should be saved and technician should be redirected to work log drawer page and view the new entry created on worklog page.

## Scenario 5 - Verify chevron icon is displayed when technician creates a new worklog record which contains long description record which further opens rich text viewer

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Start entering few characters in 'Add a note' text box on "Work log" drawer.
6. Click on expand option and navigate to next page.
7. Enter text in note summary upto 100 characters.
8. Enter long description in the rich text area.
9. Select work log type from dispalyed options. 
10. Check/uncheck visibility option.
11. Click on send note arrow at the top right corner.
12. Click on the chevron icon for the new entry created in the worklog list.

**Results:**

- All the details should be saved and technician should be redirected to work log drawer page. It should allow technician to click on the chevron icon which further opens rich text viewer.
- Technician should be able to view the text entered in the rich text viewer for long description and it should not be edited.

## Scenario 6 - Verify the save/discard popup is displayed when technician clicks on back button without saving the data entered in the fields

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.

2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Start entering few characters in 'Add a note' text box on "Work log" drawer.
6. Click on expand option and navigate to next page.
7. Enter text in note summary upto 100 characters.
8. Enter long description in the rich text area.
9. Select work log type from dispalyed options. 
10. Check/uncheck visibility option.
11. Click on back button.
12. Click on 'X' button
13. Verify save/discard popup is displayed on the screen.

**Results:**

- Save/discard popup should be displayed on the screen when technician clicks on 'X' button.
- If technician clicks on discard button, it should navigate to WO list page.
- If technician clicks on save button, the data should be saved and dispalyed in the worklog entries on worklog page.

## Scenario 7 - Verify that technician cannot delete or edit created worklogs from UI.

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Enter any new note in 'Add a note' text box on "Work log" drawer.
6. Click on send button to create a new work log entry.
7. Verify technician is unable to edit any worklogs from UI

**Results:**

Techncian should not be able to delete or edit created worklogs from UI.

## Scenario 8 - Verify that techncian can edit or delete created worklogs from classic.

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Enter any new note in 'Add a note' text box on "Work log" drawer.
6. Donot enter tthe work log type.
6. Click on send button to create a new work log entry.
7. Now, navigate to classic.
8. Open the work order create in pre-conditions.
9. Search for modify/delete worklog under more actions tab.
10. Expand the record and verify description and long description contains the complete note text.
11. Verify work log type is by default selected if techncian doesn't select any work log type.

**Results:**

- Techncian should be able to edit or delete created worklogs from classic and after deletion same count should be reflected on WO details and WO list page on worklog page.
- Description and long description should contain the complete note text and data in classic and technician application should match.
- CLIENTNOTE should be default work log type for the created work log record in classic.

## Scenario 9 - Verify same data is displayed on WO list and details page for worklog

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Enter any new note in 'Add a note' text box on "Work log" drawer.
6. Click on send button to create a new work log entry.
7. Verify that similar entries for worklog are displayed on WO list and details page for worklog.

**Results:**

Same data should be displayed on WO list and details page for worklog.

## Scenario 10 - Verify save button is by default disabled if any null/blank work log entry using send button

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Verify save button is by default disabled on worklog page till any data is entered by technician.

**Results:**

Technician should be unable to create null/blank work log entry. Also, save button should be by default disbaled.

## Scenario 11 - Verify that technician can enter work log entry using send key

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Enter any new note in 'Add a note' text box on "Work log" drawer using keyboard and hit send key.
6. Verify that a new work log entry is created on "Work log" drawer.

**Results:**

Technician should be able to add a new work log entry using send key on "Work log" drawer.

## Scenario 12 - Verify that technician can enter work log entry using voice-to-text on keyboard/keypad

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Click on voice-to-text button on keyboard/keypad to create a new work log entry.

**Results:**

Technician should be able to add a new work log entry using voice-to-text button on keyboard/keypad.

## Scenario 13 - Verify the work log type for the created work log entry in Maximo when technician selects a work log type from lookup and sends a new note

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to "My Schedule" and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on the "Work log" touch-point on work order list and/or work order details pages.
5. Click on the expand icon/button.
7. Select any of the work log type options e.g. "APPTNOTE - Appointment Note".
8. Enter any new note in 'Note summary' text box.
9. Click on send button to create a new work log entry.
10. Login to Maximo/Manage application as Admin.
11. Go to work order tracking app and search for work order created in pre-condition steps.
12. Open the work order and go to "Log" tab.
13. Verify that the "Type" column of the most recent work log entry matches the work log type option selected in "Select log type" lookup i.e. "APPTNOTE".

**Result:**

- The "Type" column of the most recent work log entry should match the work log type option selected in "Select log type" lookup i.e. "APPTNOTE".
- Perform the scenario by selecting all other work log type options from the "Select log type" lookup and should work as expected.

## Scenario 14 - Verify the above scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 15 - Verify all the above scenarios in online and offline/disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in online and offline/disconnected mode on mobiles/tablets/desktops.
