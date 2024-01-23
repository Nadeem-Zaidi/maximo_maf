# Eli can view his tasks as cards in a list display

These test cases will verify task work order functionality on 'Work order details/list' page on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionality of following user story:

- GRAPHITE-16216: Eli can view his tasks as cards in a list display
- GRAPHITE-50872: Task Assignment - WO+TaskID should be visible after pressing the "Edit" button

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify tasks work orders are displayed in work order list and work order number is 'ParentWO+"-"+TaskID' by default (When query ASSIGNEDWOLIST doesn't have the attribute ISTASK=0)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Verify the work orders list and search for the work order.

**Results:**

- Tasks work orders should also be displayed along with normal work orders in the work order list.
- The work order number for the task work order should be displayed as 'ParentWO+"-"+TaskID' on work order list card as well as work order details.

## Scenario 2 - Verify on Edit Work Order page and Report Work Page, work order number is 'ParentWO+"-"+TaskID' by default (When query ASSIGNEDWOLIST doesn't have the attribute ISTASK=0) for tasks work orders 

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Verify the work orders list and search for the work order.

**Results:**

- Tasks work orders should also be displayed along with normal work orders in the work order list.
- The work order number for the task work order should be displayed as 'ParentWO+"-"+TaskID' on work order list card as well as work order details.
- The work order number for the task work order should be displayed as 'ParentWO+"-"+TaskID' on work order edit page and Report Work page.

## Scenario 3 - Verify that task touch-point is not displayed for the task work order on work order details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and click chevron to open task work order details page.
4. Verify Task touch-point is not displayed on the work order details page for task work orders.

**Results:**

Task touch-point should not be displayed on the work order details page for task work orders.

## Scenario 4 - Verify that follow-up work Tile/Link is not displayed for the task work orders on work order details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and click chevron to open task work order details page.
4. Verify that follow-up work Tile/Link is not displayed for the task work orders on work order details page.

**Results:**

Follow-up work Tile/Link should not be displayed for the task work orders on work order details page.

## Scenario 5 - Verify no work type is displayed for the task work orders

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with a work type
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and click chevron to open task work order details page.
4. Verify no work type is displayed for the task work orders in both work order list and work order details pages.

**Results:**

Work type shouldn't be displayed for the task work orders in both work order list and work order details pages.

## Scenario 6 - Verify when user changes task to completed in the Parent work order then corresponding task work order
 will be removed from the work order list page and corresponding task in parent work order is marked completed

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the parent work order and click chevron to open work order details page.
4. Click on task touch-point and click on complete button for the task.
5. Go back to work order list page.
6. Verify corresponding task work order should not be displayed in work order list page.

**Results:**

- Task work order should be removed from the work order list page when the corresponding task is marked completed in the parent work order.
- Corresponding task in parent work order should be displayed as marked completed in task details page.

## Scenario 7 - Verify on clicking edit icon for failure, failure information related to parent work order is displayed for task work order on report work page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add failure code details to work order.
5. Create a task in the work order and add labor to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and click chevron to open task work order details page.
4. Open Report work page.
5. Click on edit icon for failure.
6. Verify on clicking edit icon for failure, failure information related to parent work order is displayed.

**Results:**

- On clicking edit icon for failure, failure information related to parent work order should be displayed for task work order.
- When user updates any failure code related information for task order, it should be updated for that particular task work order only and not for the parent work order or any other task.

## Scenario 8 - Verify Add labor, actual materials and tools functionality for task work order on report work page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and click chevron to open task work order details page.
4. Open Report work page.
5. Click on "+" icon to add actual labor, Materials and tools.
6. Verify various fields, provide required details and save.

**Results:**

- "+" icon should be displayed to add actual labor, materials and tools for a task work order on report work page.
- Task field should not be displayed on add actual labor, materials and tools sliding drawers.
- When user adds actual labor, materials and tools in any task work order, it should update details in actual labor, material and tools section of parent work order.
- When user adds any actual labor, materials and tools for parent work order(task field value is not provided), it should not be displayed in task work order report work page.

## Scenario 9 - Verify when user enters a work log in task work order then it is displayed in parent work order work log

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create a task in the work order.
5. Add labor corresponding to task.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and enter the work log for task work order.
4. Verify when user enters a work log in task work order then it is also displayed in parent work order work log.

**Results:**

- Parent work log should be updated when technician adds a work log entry in task work order.
- Task work order work log should not be updated when technician adds a work log entry in parent work order.

## Scenario 10 - Verify technician can enter/update the meter readings on a task work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order and add asset with characteristic meter associated with it.
4. Create a task in the work order.
5. Add labor corresponding to task.
6. Add the meter readings to work order.
7. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order and click chevron to open task work order details page.
4. Verify meter touch-point is displayed and technician is able to enter/update meter readings.

**Results:**

- Technician should be able to see meter touch-point on both task work order list and work order details pages.
- Technician should be able to update/enter meter readings from task work order and it should be updated in parent work order meter reading.
- Any meter reading updated in parent work order should also be updated in task work order meter readings.

## Scenario 11 - Verify planned materials and tools associated with the specific task in parent work order are only displayed in corresponding task work order and not for other task work orders

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Create multiple tasks in the work order.
5. Add labor corresponding to tasks.
6. Add planned items and material for the tasks.
7. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search for the task work order and click materials and tools touch-point.
4. Verify only planned materials and tools associated with that specific task in parent work order are displayed.

**Results:**

- Planned materials and tools associated with the specific task in parent work order should only be displayed in corresponding task work order.
- Planned materials and tools associated with the parent work order and other tasks should not be displayed.

## Scenario 12 - Verify data and touch-points related to asset, location, status, start/stop work, work log, priority, maps, meters, attachments, planned tools and material are displayed on work order list and details pages for task work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add asset, location, priority, maps, meters, service address, planned materials and tools, schedule start and end dates to work order.
5. Create a task in the work order and add labor to task.
6. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the task work order.
4. Verify data and touch-points related to asset, location, status, start/stop work, work log, priority, maps, meters, attachments, planned tools and material are displayed on work order list and details pages.

**Results:**

- The values of asset, location, status, priority, start/stop/pause buttons, service address/formatted address should be displayed on task work order list page.
- The touch-points for work log, meters, maps, planned material and tools should be displayed on task work order list and details pages.
- The task description and edit icon for task work order should be displayed on task work order details page.
- When technician updates information on edit task work order details page, it should only be updated for the task work order and there should be no changes in parent work order. For example, when user changes asset and location information in task work order then it should only be updated for task work order and not for parent work order.
- When technician updates task description on edit task work order details page, it should be updated for parent work order task description too.
- Attachments touch-point should be available on task work order details and when technician add/deletes any attachment in task work order, it should be updated in parent work order attachments section too.

## Scenario 13 - Verify only task work orders are displayed on work order list page when attribute istask=1 is configured in query clause for ASSIGNEDWOLIST

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Object structure.
3. Search for mxapiwodetail and go to query definition.
4. Search for assignedwolist and update query clause attribute istask=1.
5. Go to work order tracking application.
6. Create a new work order.
7. Create a task in the work order.
8. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Verify only task work orders are displayed on work order list page.

**Results:**

Only task work orders should be displayed in work order list and no normal work orders.

## Scenario 14 - Verify only normal work orders are displayed on work order list page when attribute istask=0 is configured in query clause for ASSIGNEDWOLIST

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Object structure.
3. Search for mxapiwodetail and go to query definition.
4. Search for assignedwolist and update query clause attribute istask=0.
5. Go to work order tracking application.
6. Create a new work order.
7. Create a task in the work order.
8. Add labor assignments and approve the work order.

**Steps:**

1. Launch the Maximo Mobile and Login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Verify only normal work orders are displayed on work order list page.

**Results:**

Only normal work orders should be displayed in work order list page and there should be no task work orders.

## Scenario 15 - Verify the above scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 16 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.