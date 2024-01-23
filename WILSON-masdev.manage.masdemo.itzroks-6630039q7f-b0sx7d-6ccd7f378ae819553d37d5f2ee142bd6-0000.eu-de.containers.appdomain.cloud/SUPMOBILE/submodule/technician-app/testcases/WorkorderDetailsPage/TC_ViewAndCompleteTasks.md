# View and complete tasks functionality on work order details page

These test cases will verify the UI, contents and various tasks related functionalities on Technician web app, online and offline mode on mobile containers. These will cover functionalities of following user stories:

- GRAPHITE-13733: Eli can access his tasks from the WO
- GRAPHITE-11851: Eli can see his tasks
- GRAPHITE-17229: Eli's next incomplete task is opened for him automatically
- GRAPHITE-13881: Eli can complete a task
- GRAPHITE-16807: Eli can see his attachments on a task
- GRAPHITE-18319: Eli does not need to see cancelled or closed tasks
- GRAPHITE-13456: Eli can see the long description of his work order or task
- GRAPHITE-47086: Eli needs the task view to indicate flow controlled actions (redesign)
- GRAPHITE-45215: Eli needs the Allow status changes for tasks
- GRAPHITE-47108: Eli needs an enhanced "Complete task" option to better support flow control
- GRAPHITE-50896: Keep the WO number visible after pressing the "Edit" button inside a Work Order on the App
- GRAPHITE-50897: Display Asset/Location on Task when different than Parent WO
- GRAPHITE-50846: Eli should go to the report work page after finishing the last task
- GRAPHITE-57906: Review Task page to match the correct designs
- GRAPHITE-61527: Add meter readings when using routes with tasks

**Design URL:**

- <https://ibm.invisionapp.com/share/BWO03SHYG98#/screens/319506777_Logs>
- <https://ibm.invisionapp.com/share/ZAO1YCQ4FJ9#/screens>
- <https://www.figma.com/file/RAPUxZUIzaPZonCgW1udeP/Technician-%26-Assets?node-id=1505%3A67613&t=YDUEHIF0HaxX8U7h-1>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify the availability of task/tasks touch-point and badge count when incomplete planned task is associated with work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify the availability of task/tasks touch-point and badge count.

**Results:**

Task touch-point should be displayed with badge count as 1 or 3 as per the added tasks from classic.

## Scenario 2 - Verify the task touch-point and badge color

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify the color of task touch-point and badge over it.

**Results:**

Task touch-point should be displayed in light blue color and badge in black color.

## Scenario 3 - Verify unavailability of task touch-point when no planned task is associated with work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify unavailability of task touch-point.

**Results:**

Task touch-point should not be displayed when no planned task is associated with work order.

## Scenario 4 - Verify unavailability of badge count on task touch-point when all planned tasks associated with work order are marked completed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 3 new tasks to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Mark all associated tasks as completed.
7. Go back to WO details page.
8. Verify unavailability of badge count on task touch-point.

**Results:**

Badge count on task touch-point should not be displayed when all planned tasks associated with work order are marked completed.

## Scenario 5 - Verify the task touch-point and badge count when one out of four planned tasks associated with work order is marked completed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 4 new tasks to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The task touch-point is displayed with badge count as 4.
6. Click on task touch-point to open tasks list page.
7. Mark one of the associated tasks as completed.
8. Go back to WO details page.
9. Verify the task touch-point and badge count.

**Results:**

Task touch-point should be displayed with badge count updated to 3.

## Scenario 6 - Verify that first incomplete task is expanded by default

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 5 new tasks to work order and mark first 2 tasks as completed.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify that first incomplete task is expanded by default.

**Results:**

The first incomplete task should be expanded by default.

## Scenario 7 - Verify that when technician marks a task completed, the next incomplete task is expanded automatically

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 3 new tasks to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Click on "Mark complete" button on first expanded task.
7. Verify that the next incomplete task is expanded automatically.

**Results:**

The next incomplete task should be expanded automatically when technician marks a task as completed.

## Scenario 8 - Verify that task details are hidden when technician marks any incomplete task as completed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 3 new tasks for work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Click on "Mark complete" button on first expanded task.
7. Verify that task details are hidden for first task.

**Results:**

The task details should hide when technician marks any incomplete task as completed.

## Scenario 9 - Verify that task details are expanded when technician marks the last incomplete task as completed in task list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Added 3 new tasks for work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Mark the first two tasks as completed so that only last task is incomplete.
7. Expand the last task in the task list and click on "Mark complete" button.
8. Verify that task details are still expanded for last task.

**Results:**

The task details should remain expanded when technician marks the last incomplete task as completed when all other tasks are already completed.

## Scenario 10 - Verify that checkmark touch-point is displayed on task list page when technician has permission(by default) to mark an incomplete task as completed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task for work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Expand any incomplete task and verify that checkmark touch-point is displayed.

**Results:**

Checkmark touch-point should be displayed for incomplete tasks on task list page when technician has permission(by default) to mark an incomplete task as completed.

## Scenario 11 - Verify that green checkmark icon is displayed for the task when technician marks that incomplete task as completed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task for work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Expand any incomplete task in the task list and click on checkmark touch-point.
7. Verify that green checkmark icon is displayed for the task in order to indicate that task is completed.

**Results:**

Green checkmark icon should be displayed for the completed tasks.

## Scenario 12 - Verify the badge count value on task touch-point when technician marks an incomplete task as completed in tasks list

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 5 new tasks to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The badge count value on task touch-point is displayed as 5.
6. Click on task touch-point to open tasks list page.
7. Mark two task records as completed in the tasks list.
8. Click on back button and verify the badge count value on the task touch-point.

**Results:**

The badge count value on the task touch-point should change to 3.

## Scenario 13 - Verify the badge count value on task touch-point when administrator/supervisor marks an incomplete task as completed in Maximo classic/Manage

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 5 new tasks to work order and approve it.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The badge count value on task touch-point is displayed as 5.
6. Login with admin credentials in Maximo classic/Manage.
7. In work order tracking application, search and open the above mentioned work order and go to Plans tab.
8. Mark 1 task as "completed".
9. Login to Maximo mobile app with the technician assigned to work order and click on "Check updates" button on WO list.
10. Find the work order card and click on chevron on work order card to open WO details page.
11. Verify the badge count value on the task touch-point.
12. Click on task touch-point to open tasks list page and verify the respective task is marked completed.

**Results:**

- The badge count value on the task touch-point should change to 4.
- Green check-mark icon should be displayed for completed task.

## Scenario 14 - Verify availability/un-availability of checkmark touch-point for tasks in different statuses i.e. APPR, WAPPR, INPRG, COMP, CLOSE, WMATL, CAN and WSCH

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 8 new tasks to work order and approve it.
5. Change the tasks statuses to APPR, WAPPR, INPRG, COMP, CLOSE, WMATL, CAN and WSCH respectively.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify the badge count value on task touch-point.
6. Click on task touch-point to open tasks list page.
7. Verify the availability/un-availability of checkmark touch-point for tasks in different statuses.

**Results:**

- The badge count value on the task touch-point should be 5.
- Checkmark touch-point should be displayed for tasks with APPR, WAPPR, INPRG, WMATL and WSCH statuses.
- Checkmark touch-point button should not be displayed for task with COMP status.
- Tasks with CLOSE and CAN statuses shouldn't be displayed on the task list page.

## Scenario 15 - Verify that the technician can view and open attachments associated with task in tasks list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task to work order.
5. Associate attachments with the added task.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The badge count value on task touch-point is 1.
6. Click on task touch-point to open tasks list page.
7. Verify that the technician can view and open attachments associated with task.

**Results:**

The technician should be able to view and open attachments associated with task.

## Scenario 16 - Verify that the value of DOCLINKS.DOCUMENT and DOCLINKS.DESCRIPTION is displayed for attachments on tasks list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task to work order.
5. Associate attachments with the added task.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The badge count value on task touch-point is 1.
6. Click on task touch-point to open tasks list page.
7. Verify that the value of DOCLINKS.DOCUMENT and DOCLINKS.DESCRIPTION is displayed for each associated attachment on tasks list page.

**Results:**

The values of DOCLINKS.DOCUMENT and DOCLINKS.DESCRIPTION for each associated attachment should be displayed on tasks list page.

## Scenario 17 - Verify that preview is displayed of image,video,url,document file type attachment on tasks list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task to work order.
5. Associate image,video,url,document file type attachment with the added task one by one.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The badge count value on task touch-point is 1.
6. Click on task touch-point to open tasks list page.
7. Verify that preview is displayed of image,video,URL,document file type attachment and click on it.

**Results:**

- The preview of image associated with task should be displayed and image file should open on clicking it.
- The preview for video associated with task should be displayed with the play icon and video should play on clicking it.
- The open URL icon should be displayed for URL type attachment associated with task and clicking it, should open the URL in a new tab.
- The document type attachment associated with task should be displayed.
- The document file should get downloaded on the technician's device when technician clicks on it and can be viewed in associated application.

## Scenario 18 - Verify availability of task touch-point on WO details when there is at least one incomplete planned task for work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add a new task to work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify availability of task touch-point on WO details page.

**Results:**

Task touch-point should be available on WO details page along with a badge count value indicating number of incomplete tasks.

## Scenario 19 - Verify unavailability of task touch-point on WO details when all planned tasks added to work order are in cancelled/closed status

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add multiple new tasks to work order.
5. Change the status of all tasks to cancelled/closed by repeating all the steps.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify unavailability of task touch-point on WO details page.

**Results:**

-Task touch-point should be unavailable on WO details page when all planned tasks added to work order are in cancelled status.
-Task touch-point should be unavailable on WO details page when all planned tasks added to work order are in closed status.

## Scenario 20 - Verify that all planned tasks which are either in cancelled or closed status are not displayed in task list and tasks in other statuses are displayed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add 10 new tasks to work order.
5. Change the status of 6 tasks to any status except cancelled or closed and mark remaining 4 tasks as closed or cancelled.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.

**Results:**

The planned 4 tasks which are either in cancelled or closed status should not be displayed in tasks list and remaining 6 tasks in other statuses should be displayed in tasks list.

## Scenario 21 - Verify that 'Long description' of work order is displayed in Details section on WO details page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify that 'Long description' of work order is displayed in Details section on WO details page.

**Results:**

'Long description' of work order with ellipses along with maximize icon should be displayed in Details section on WO details page.

## Scenario 22 - Verify that complete long description of the work order is displayed in a large dialog/flyout when technician clicks on maximize icon/button and is navigated to the WO details page when clicked on the back button from long description page 

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. 'Long description' of work order is displayed with ellipses along with maximize icon.
6. Click on maximize icon/button associated with long description of work order.
7. Verify that complete long description of the work order is displayed in a large dialog/flyout.
8. Click on back button on 'Long description' dialog/flyout.
9. Verify that 'Long description' dialog/flyout is closed and system is navigated to WO details page.

**Results:**

-The complete 'Long description' of the work order should be displayed without ellipsis in a large dialog/flyout when technician clicks on maximize icon/button.
-'Long description' dialog/flyout should be closed and system should be navigated to WO details page when technician clicks on the back button.

## Scenario 23 - Verify that placeholder text (-) is displayed in Details section when there is no long description added to work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order without long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Verify that placeholder text (-) is displayed in Details section.

**Results:**

The placeholder text (-) in place of long description and associated maximize icon should be displayed in Details section of the work order when there is no long description added to work order.

## Scenario 24 - Verify that no action is performed when technician clicks on placeholder text(-)

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order without long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. The placeholder text(-) in place of long description and associated maximize icon is displayed in Details section.
6. Click on placeholder text(-).

**Results:**

No action should be performed when technician clicks on placeholder text(-).

## Scenario 25 - Verify that 'Long description' is not displayed under the task on tasks list when there is no long description added to the task

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order, add a task without long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify that 'Long description' is not displayed under the task on tasks list.

**Results:**

Long description shouldn't be displayed under the task on tasks list when there is no long description added to the task.

## Scenario 26 - Verify that the 'Long description' of added task in work order is displayed under task on tasks list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with task having long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify that the 'Long description' of added task in work order is displayed under task on tasks list page.

**Results:**

'Long description' of the task with ellipsis along with maximize icon should be displayed under task on tasks list page.

## Scenario 27 - Verify that complete long description of the task is displayed in a large dialog/flyout when technician clicks on maximize icon/button under task on tasks list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with task having long description and assign a labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. 'Long description' of task is displayed with ellipses along with maximize icon.
7. Click on maximize icon/button associated with long description of task.
8. Verify that complete long description of the task is displayed in a large dialog/flyout.

**Results:**

The complete 'Long description' of the task should be displayed without ellipsis in a large dialog/flyout when technician clicks on maximize icon/button under task on tasks list page.

## Scenario 28 - Verify the UI elements on task page when work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks with long description, attachments and inspection forms added to tasks.
11. Add labor in Assignments tab and approve the work order.
12. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.

**Results:**

- Done button should be displayed at the bottom of the task page and should be primary button (highlighted in blue color) only when all the tasks are marked completed.
- Assistance button should be displayed to the top right of task page. It should never be primary button and will always be secondary button.
- The Assistance label shouldn't be displayed on mobile or small screen devices but will be displayed on tablet devices.
- First incomplete task should be expanded by default on task page, it should display task details as follows:
  - It should display task id, task description(if any) of first incomplete task, a checkmark button highlighted in blue (primary button) as part of blue button flow signifying that task should be marked completed by clicking on it and up/down chevron indicating task is expanded/collapsed.
  - First row should display status tag showing current status of the first incomplete task.
  - Next row should display long description of the task with maximize icon(if any).
  - Next row should display associated inspection along with inspection touch-point(if any).
  - Next each row should display individual attachments as subsequent rows with preview/play/open/download capabilities depending on the type of attachment(if any).
- Next incomplete task i.e second task should be collapsed and have secondary Checkmark touch-point as it is independent of first task. The Checkmark touch-point button should be enabled.
- All incomplete tasks can be expanded by clicking expand icon to display the task details associated with the task.
- All completed tasks (if any) should always be collapsed with green checkmark icon.

**Note:**

Assistance button will not be displayed in EAM environment. It will be displayed in MAS environment when Assist app is deployed in the environment.

## Scenario 29 - Verify that first incomplete task on task list page is always expanded and has checkmark touch-point as primary button when work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks with long description, attachments and inspection form added to tasks.
11. Add labor in Assignments tab and approve the work order.
12. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.

**Results:**

- First incomplete task should be expanded by default. Checkmark touch-point should be highlighted in blue (primary button) as part of blue button flow signifying that task should be marked completed by clicking on it. Tasks details should be as follows:
  - First row should display task status tag with current status of the task as "In progress". The task status can be "In progress" either by changing the status from status tag manually or automatically due to task being under flow control.
  - Next row should display long description of the task with maximize icon(if any).
  - Next row should display associated inspection along with inspection touch-point(if any). External navigation such as navigation to inspections and returning to task page should be enabled and work correctly.
  - Next each row should display individual attachments as subsequent rows with preview/play/open/download capabilities depending on the type of attachment(if any).
  - There should be 16px gap after an active task and 8px gap after locked tasks as per design in invision.

## Scenario 30 - Verify that dependent tasks are locked and collapsed when parent task is yet to be completed and work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create three planned tasks - task 1, task 2 and task 3 with long description, attachments and inspection form added to tasks.
11. Add task 1 as the predecessor of task 2.
12. Add labor in Assignments tab and approve the work order.
13. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.

**Results:**

- First incomplete task (task 1) should be expanded by default. Checkmark touch-point should be highlighted in blue (primary button) as part of blue button flow signifying that task should be marked completed by clicking on it.
- All dependent incomplete tasks(task 2) for which predecessor tasks are not completed yet, should have a lock icon. These tasks will be collapsed but can be expanded using expand/collapse icon.
- Task id and task description without checkmark touch-point(for task 2) should be displayed for locked task. Task details for dependent task when expanded should be as follows:
  - First row should display the predecessor task id needed to be completed to unlock the dependent task i.e. for task 2 it should display "Complete task 1 first."
  - Next row should display long description of the task with maximize icon(if any).
  - Next row should display associated inspection along with inspection touch-point(if any). External navigation such as navigation to inspections and returning to task page should be disabled by making the inspections touch-point as disabled/greyed.
  - Next each row should display individual attachments as subsequent rows with preview/play/open/download capabilities depending on the type of attachment(if any). However external navigation should be disabled for attachments too.
- Clicking checkmark touch-point for predecessor task (task 1) should make the predecessor task completed. The completed task should be collapsed and a green checkmark should be displayed for that task (task 1).
- The dependent task(task 2) should be expanded automatically, lock icon and "Complete task 1 first." message should be removed. Primary checkmark touch-point(blue color) is added to the task (task 2) to perform next logical action as part of blue button flow. External navigation should be enabled as dependent task(task 2) is unlocked. Status tag should be displayed for dependent task(task 2) with current status of task as Approved.

## Scenario 31 - Verify that multiple tasks can be active at the same time when work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create three planned tasks - task 1, task 2 and task 3 with long description, attachments and inspection form added to tasks.
11. Add task 1 as the predecessor of task 2.
12. Add labor in Assignments tab and approve the work order.
13. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.

**Results:**

- First independent incomplete task (task 1) should be expanded by default. Checkmark touch-point should be highlighted in blue (primary button) as part of blue button flow signifying that task should be marked completed by clicking on it.
- Second independent incomplete task (task 3) should be collapsed by default. Checkmark touch-point should be of kind secondary (light blue) and enabled/active.
- All dependent incomplete tasks(task 2) for which predecessor tasks(task 1) are not completed yet, should have a lock icon.

## Scenario 32 - Verify that completed tasks are collapsed when work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks with long description, attachments and inspection form added to tasks.
11. Add task 1 as the predecessor of task 2.
12. Add labor in Assignments tab and approve the work order.
13. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Click on primary checkpoint touch-point on first incomplete task i.e. task 1.

**Results:**

- Clicking checkmark touch-point for predecessor task (task 1) should make the predecessor task completed. The completed task should be collapsed and a green checkmark should be displayed for that task (task 1).
- The dependent task(task 2) should be expanded automatically, lock icon and "Complete task 1 first." message should be removed.
- Primary checkmark touch-point(blue color) is added to the task (task 2) to perform next logical action as part of blue button flow.
- External navigation should be enabled as dependent task(task 2) is unlocked.
- Status tag should be displayed for dependent task(task 2) with current status of task as "Approved".
- Clicking the checkmark touch-point for dependent task(task 2) completes the task. Technician can also change the task status to completed using status tag. The completed task 2 should also be collapsed and and a green checkmark should be displayed for that task.
- Done button should be primary button now to perform next logical action as part of blue button flow.
- Clicking on Done button, navigates technician to report work page.

## Scenario 33 - Verify the UI elements on task list page when work order is not flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM" but make sure to keep the checkbox for "Under flow control?" as unchecked.
9. Create two planned tasks with long description, attachments and inspection form added to tasks.
10. Add labor in Assignments tab and approve the work order.
11. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.

**Results:**

- Done button should be displayed at the bottom of the task page and should be primary button (highlighted in blue color) only when all the tasks are marked completed.
- Assistance button should be displayed to the top right of task page. It should never be primary button and will always be secondary button.
- The Assistance label shouldn't be displayed on mobile or small screen devices but will be displayed on tablet devices.
- First incomplete task should be expanded by default on task page, it should display task details as follows:
  - It should display task id, task description(if any) of first incomplete task, a checkmark button in light blue (secondary button) with dark blue border and up/down chevron indicating task is expanded/collapsed.
  - First row should display status tag showing current status of the first incomplete task.
  - Next row should display long description of the task with maximize icon(if any).
  - Next row should display associated inspection along with inspection touch-point(if any).
  - Next each row should display individual attachments as subsequent rows with preview/play/open/download capabilities depending on the type of attachment(if any).
- Next incomplete task i.e second task should be collapsed and have secondary Checkmark touch-point as it is independent of first task. The checkmark touch-point button should be enabled/active.
- All incomplete tasks can be expanded by clicking expand icon to display the task details associated with the task.
- All incomplete tasks can be completed in any sequence and no lock icon should be displayed on any of the task.
- All completed tasks (if any) should always be collapsed with green checkmark icon.

**Note:**

Assistance button will not be displayed in EAM environment. It will be displayed in MAS environment when Assist app is deployed in the environment.

## Scenario 34 - Validate the available status options in change status drawer when first task status is "Approved" and work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM" but make sure to keep the checkbox for "Under flow control?" as unchecked.
9. Create two planned tasks with long description, attachments and inspection form added to tasks.
10. Add labor in Assignments tab and approve the work order.
11. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page. First task status is "Approved".
6. Click on status action tag for first task to open change status drawer.
7. Verify available status options in change status drawer.

**Results:**

The following status options should be available in the change status drawer with their appropriate acronyms:

- Canceled (CAN)
- Closed (CLOSE)
- Completed (COMP)
- In progress (INPRG)
- Waiting on material (WMATL)
- Waiting on plant cond (WPCOND)
- Waiting to be scheduled (WSCH)

## Scenario 35 - Validate the available status options in change status drawer when first task status is "In Progress" and work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM" but make sure to keep the checkbox for "Under flow control?" as unchecked.
9. Create two planned tasks with long description, attachments and inspection form added to tasks.
10. Add labor in Assignments tab and approve the work order.
11. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page. First task status is "Approved".
6. Click on status action tag for first task to open change status drawer and change task status to "In progress".
7. Click on status action tag for first task again and verify available status options in change status drawer.

**Results:**

The following status options should be available in the change status drawer with their appropriate acronyms:

- Closed (CLOSE)
- Completed (COMP)
- Canceled (CAN)
- Waiting on material (WMATL)

## Scenario 36 - Validate the available status options in change status drawer when first task status is "Waiting on material" and work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM" but make sure to keep the checkbox for "Under flow control?" as unchecked.
9. Create two planned tasks with long description, attachments and inspection form added to tasks.
10. Add labor in Assignments tab and approve the work order.
11. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page. First task status is "Approved".
6. Click on status action tag for first task to open change status drawer and change task status to "Waiting on material".
7. Click on status action tag for first task again and verify available status options in change status drawer.

**Results:**

The following status options should be available in the change status drawer with their appropriate acronyms:

- Closed (CLOSE)
- Completed (COMP)
- Canceled (CAN)
- In progress (INPRG)

## Scenario 37 - Verify that there is no change in style of task touch-point/button when task status is changed to "In progress"/"Waiting on material" and work order is flow controlled

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM" but make sure to keep the checkbox for "Under flow control?" as unchecked.
9. Create two planned tasks with long description, attachments and inspection form added to tasks.
10. Add labor in Assignments tab and approve the work order.
11. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Find the work order created in pre-condition steps in WO list and click 'Start work' button on work order card or change work order status to 'In progress'.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page. First task status is "Approved".
6. Click on status action tag for first task to open change status drawer and change task status to "In progress" or "Waiting on material".
7. Verify that there is no change in style of task touch-point/button.

**Results:**

There should be no change in style of task touch-point/button when task status is changed to "In progress"/"Waiting on material". It should still follow the blue button flow.

## Scenario 38 - Verify the Work Order number is displayed with header on task page and is in read-only mode

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with work type.
4. Add a new task to work order.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Search the work order and click on chevron to open WO details page.
4. Click on the task touch-point.
5. Verify the work order number is displayed with 'Tasks' text as header/title of the edit work order page and is in read-only mode.

**Results:**

- Work order number should be displayed on task page in read-only mode. It cannot be edited or changed.
- Work order number should be displayed along with the header 'Tasks'.

## Scenario 39 - Verify ellipsis is displayed with work order number on tasks page when there is less space

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. WoNum value should be atleast 5 digits.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron to open WO details page.
4. Click on the tasks touch-point.
5. Verify ellipsis is displayed in the header and is in read-only mode when there is less space.

**Result:**

Ellipsis should be displayed in the header with work order number and 'Tasks' text as header/title on tasks page when there is less space and there should be no text cut from sides.


## Scenario 40 - Verify asset and location information on task when asset and location associated with task are different from primary asset and location on the work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Add different asset and location from parent work order to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.

**Results:**

Asset icon, asset id, asset description and location description associated with the task should be displayed on task record.

**Note:**

Perform above scenario in following cases:

- Different asset and location are associated with work order and task.
- Same asset but different location are associated with work order and task.
- Same location but different asset are associated with work order and task.
- Asset and location are not associated with work order but asset and location are associated with task.
- Asset is not associated with work order but asset and location are associated with task.
- Location is not associated with work order but asset and location are associated with task.

## Scenario 41 - Verify asset and location information is displayed on task page when assosiated with a work order 

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Add same asset as primary asset of work order and add location to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.
7. Verify assset and location icon present on tasks page.

**Results:**

- Asset icon, asset id, location icon and location id associated with the task should be displayed on task record.
- Chevron icon should be displayed for asset and location which routes to asset page.

## Scenario 42 - Verify asset and location information on task when asset associated with task is same as primary asset on the work order but location is not associated with task

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Add same asset as primary asset of work order but do not add any location to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.

**Results:**

- Asset icon, asset id and asset description associated with the task should be displayed on task record.
- Placeholder(-) for location description should be displayed on task record.

## Scenario 43 - Verify asset and location information section on task is not displayed when asset and location associated with task are same as primary asset and location on the work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Add same asset and location as primary asset and location of the work order to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information section is not displayed on the task record.

**Results:**

Asset and location information section should not be displayed on the task record.

**Note:**

Perform above scenario in following cases:

- Same asset and location are associated with both work order and task.
- Asset and location are not associated with both work order and task.
- Same asset and no location associated with both work order and task.
- Same location and no asset associated with both work order and task.

## Scenario 44 - Verify asset and location information on task when location associated with task is same but asset is different from primary asset on the work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Add same location as primary location of work order but different asset from primary asset of work order to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.

**Results:**

Asset icon, asset id, asset description and location description associated with the task should be displayed on task record.

## Scenario 45 - Verify asset and location information on task when location associated with task is same as primary location on the work order but asset is not associated with task

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Add same location as primary location of work order but do not add any asset to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.

**Results:**

- Asset icon and location description associated with the task should be displayed on task record.
- Placeholder(-) for asset id and asset description should be displayed on task record.

## Scenario 46 - Verify asset and location information on task when both asset and location are not associated with task and primary asset and location are associated with work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Add asset and location to work order.
5. Add a task to work order.
6. Do not add any asset or location to the task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.

**Results:**

- Asset icon should be displayed on task record.
- Placeholder(-) for asset id, asset description and location description should be displayed on task record.

**Note:**

Perform above scenario in following cases:

- Asset and location are associated with work order but both asset and location are not associated with task.
- Only asset and no location is associated with work order but both asset and location are not associated with task.
- Only location and no asset is associated with work order but both asset and location are not associated with task.

## Scenario 47 - Verify asset and location information on task when asset and location is associated with task but primary asset and location are not associated with the work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Do not add any asset or location to work order.
5. Add a task to work order.
6. Add asset and location to task.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu, go to 'My Schedule' and wait till all the data is downloaded.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open WO details page.
5. Click on task touch-point to open tasks list page.
6. Verify asset and location information on the task record.

**Results:**

Asset icon, asset id, asset description and location description associated with the task should be displayed on task record.

## Scenario 48 - Verify technician navigates to Report work page when done button on tasks page is clicked and the value of "maximo.mobile.gotoreportwork" system property is set to 1

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Create two planned tasks.
5. Add labor in Assignments tab and approve the work order.
6. In the system properties, search for system property "maximo.mobile.gotoreportwork" and set it's value to 1.
7. Select the property and perform live refresh.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on chevron on work order card to open WO details page.
4. Click on task touch-point to open tasks list page.
5. Complete task 1 by clicking on checkmark touch-point on the task.
6. Complete task 2 by clicking on checkmark touch-point on the task.
7. Click on Done button.

**Results:**

- Done button should be primary button when all the tasks are completed to perform next logical action as part of blue button flow.
- Clicking on Done button, technician should navigate to report work page.

## Scenario 49 - Verify technician navigates to Work order details page when done button on tasks page is clicked and the value of "maximo.mobile.gotoreportwork" system property is set to 0

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and assign a labor.
4. Create two planned tasks.
5. Add labor in Assignments tab and approve the work order.
6. In the system properties, search for system property "maximo.mobile.gotoreportwork" and set it's value to 0.
7. Select the property and perform live refresh.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on chevron on work order card to open WO details page.
4. Click on task touch-point to open tasks list page.
5. Complete task 1 by clicking on checkmark touch-point on the task.
6. Complete task 2 by clicking on checkmark touch-point on the task.
7. Click on Done button.

**Results:**

- Done button should be primary button when all the tasks are completed to perform next logical action as part of blue button flow.
- Clicking on Done button, technician should navigate to work order details page.


## Scenario 50 - Verify unavailability/availability of "Asset and location with meter reading" touchpoint on the asset and location widget on task page for different combinations(asset/location)

**Pre-condition:**

1. Create 3 asset with Meter (Asset-GUAGE-METER/Asset-CHAR-METER/Asset-CON-METER) and 3 location with Meter (Loc-GUAGE-METER/Loc-CHAR-METER/Loc-CON-METER) in maximo classic.
2. Create a work order as WO1 in maximo classic with asset(Asset-CON-METER) and location (Loc-CON-METER).
   Create a one more workorder as WO2 in maximo classic with asset and location.
4. Create 10 Task with different combinations of asset ,location for above Workorder WO1 
   Create 2 Task with different combinations of asset ,location for above Workorder WO2
  as per table below
![image](https://media.github.ibm.com/user/392956/files/8ee97171-afa3-44c4-afcb-814efc8de9e6)
4. Change status to Approve WO
5. Add planned labor or add assignments for labor in work order.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. From the top left dropdown on the page, select the 'Assigned work' filter.
4. Goto the created work order in the 'Assigned work' filter - WO1 and Wo2 
5. Click on the chevron on work order card to open WO details page.
6. Click on task touch-point.
Base on combinations table asset,location,meter icon,measurement then meter reading or measurement point will be displayed or not displayed.
![image](https://media.github.ibm.com/user/392956/files/e2c40dd0-f6b3-4c3d-8628-997803949064)
7. Verify that meters sliding drawer is displayed.
8. Verify asset and location names as the header section in the meters sliding drawer.
9. Verify the 'new meter reading(+)' and 3 dot menu buttons are displayed on the header in meters sliding drawer.
10. Click on 3 dot menu and verify 'Enter old readings(>)' button is displayed.
11. Verify the asset meters are present in the asset section and location meters are present in the Location section.
12. Verify that technician can close the sliding drawer by clicking on the X.
13. Enter Meter reading or measurement reading as per table and save it.

**Results:**

- The meters sliding drawer should be displayed when technician taps on the meter touch-point.
- Asset and Location names appear as headers in the meters sliding drawer.
- The 'new meter reading(+)' and 3 dot menu buttons should be displayed on the header in meters sliding drawer.
- 'Enter old readings' button should be displayed when technician clicks on the 3 dot menu button.
- Asset section has the asset meters and Location section has the location meters.
- Technician should be able to close the sliding drawer by clicking on the X.
- Whenever Measurement mark in task then Conduct Measurement is displayed instead of Meter reading.

**Note:**

Perform the scenario for different types of meters(Continuous, Characteristic and/or Gauge).

## Scenario 51 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The cards/pages/drawers for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.

## Scenario 52 - Verify the above scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 53 - Verify all the above scenarios in online and offline/disconnected mode on devices

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.

**Note:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.
