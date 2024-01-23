# Flow Control - Work order and corresponding tasks status change functionality

These test cases will verify work order and corresponding tasks flow control functionality on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionality of following user stories:

- GRAPHITE-45237: Flow Control - Inherit status changes from the work order to the tasks
- GRAPHITE-45346: Flow Control - When completing the last task, WO should also be changed to COMP
- GRAPHITE-45259: Flow Control - when completing a task, others that have it as predecessor should be started
- GRAPHITE-45281: Flow Control - The work order cannot be completed until all tasks are completed

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify status of work order and associated tasks when work order is flow controlled and tasks don't have predecessor (WORKTYPE.STARTSTATUS is filled in)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks in the work order.
11. Add labor from assignments tab and approve the work order.
12. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in Pre-condition and click on "Start work" button or change work order status to "In progress".
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the work order status is updated to "In Progress" and status of both tasks/task work orders is "Approved".

**Results:**

- Status of the work order should be updated to "In progress" when work order is flow controlled.
- Status of both tasks/task work orders should be "Approved".
- Technician should not be able to see COMP or any of it's synonym status in change status lookup of the parent work order until both task work orders are marked completed.
- 'Complete work' button in the 'Report work' page of parent work order should be disabled until both task work orders are marked completed.
- Technician should be able to complete task1 and task2 in any order.
- The parent work order is completed automatically once both tasks/task work orders are marked completed.

## Scenario 2 - Verify that custom completed status is used instead of default COMP status when WORKTYPE.COMPLETESTATUS field is set to the custom completed status

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Domains application, search "wostatus" domain and add a new custom status "CUSTCOMP" which is synonym of Completed/COMP status.
3. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
4. Filter the records for "Work Order Class" value as "WORKORDER".
5. Expand record with "Work Type" as "EM".
6. In "Process Flow" section, select "Start Status" field value as "APPR".
7. Select "Complete Status" field value as "CUSTCOMP" and click OK button.
8. Go to work order tracking application.
9. Create a new work order with work type as "EM".
10. Select/Check the checkbox for "Under flow control?".
11. Create two planned tasks in the work order.
12. Add labor from assignments tab and approve the work order.
13. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in Pre-condition and click on "Start work" button or change work order status to "In progress".
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the work order status is updated to "In Progress" and status of both tasks/task work orders is "Approved".

**Results:**

- Status of the work order should be updated to "In progress" when work order is flow controlled.
- Status of both tasks/task work orders should be "Approved".
- Technician should not be able to see COMP or any of it's synonym status in change status lookup of the parent work order until both task work orders are marked completed using "CUSTCOMP" status.
- 'Complete work' button in the 'Report work' page of parent work order should be disabled until both task work orders are marked completed.
- Technician should be able to complete task1 and task2 in any order.
- The status of completed tasks/task work orders should be "CUSTCOMP" instead of default "COMP".
- The parent work order is completed automatically once both tasks/task work orders are marked completed.

## Scenario 3 - Verify status of work order and associated tasks when work order is flow controlled and tasks have predecessor (WORKTYPE.STARTSTATUS is filled in)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks in the work order.
11. Add task1 as the predecessor for task2.
12. Add labor from assignments tab and approve the work order.
13. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in Pre-condition and click on "Start work" button or change work order status to "In progress".
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the work order status is updated to "In Progress", task1 status is "Approved" and task2 status is "Waiting on Approval".

**Results:**

- Status of the work order should be updated to "In progress" when work order is flow controlled.
- Status of task1 should be "Approved" and status of task2 should be "Waiting on Approval".
- Technician should not be able to complete or change status of task2 and parent work order.
- Changing status of task1 to completed should change status of task2 to "Approved" automatically.
- Technician should not be able to see COMP or any of it's synonym status in change status lookup of the parent work order as task2 is yet to be completed.
- 'Complete work' button in the 'Report work' page of parent work order should be disabled as task2 is yet to be completed.
- Technician should be able to complete task2 once predecessor tasks are marked completed.
- The parent work order is completed automatically once both tasks/task work orders are marked completed.

## Scenario 4 - Verify status of work order and associated tasks when work order is not flow controlled and tasks doesn't have predecessor (WORKTYPE.STARTSTATUS is filled in)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Create two planned tasks in the work order.
10. Add labor from assignments tab and approve the work order.
11. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in Pre-condition and click on "Start work" button or change work order status to "In progress".
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the status of work order and both tasks/task work orders is updated to "In Progress".

**Results:**

- Status of the work order should be "In progress".
- Status of both tasks/task work orders should be "In Progress".
- 'Complete work' button in the 'Report work' page of parent work order should be enabled.
- Status of parent work order and both tasks/task work orders should be changed to "Completed".

## Scenario 5 - Verify status of work order and associated tasks when work order is not flow controlled and tasks have predecessor (WORKTYPE.STARTSTATUS is filled in)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CM".
5. In "Process Flow" section, select "Start Status" field value as "APPR".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CM".
9. Create two planned tasks in the work order.
10. Add task1 as the predecessor for task2.
11. Add labor from assignments tab and approve the work order.
12. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is checked/selected in system settings OR maximo.mobile.usetimer is set to 0 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in Pre-condition and click on "Start work" button or change work order status to "In progress".
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the status of work order and both tasks/task work orders is updated to "In Progress".

**Results:**

- Status of the work order should be "In progress".
- Status of both tasks/task work orders should be "In Progress".
- 'Complete work' button in the 'Report work' page of parent work order should be enabled.
- Status of parent work order and both tasks/task work orders should be changed to "Completed".

## Scenario 6 - Verify status of work order and associated tasks remains unchanged when work order is flow controlled and tasks doesn't have predecessor (WORKTYPE.STARTSTATUS is filled in)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CP".
5. In "Process Flow" section, select "Start Status" field value as "WSCH".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CP".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks in the work order.
11. Add task1 as the predecessor for task2.
12. Add labor from assignments tab and approve the work order.
13. Status of both tasks changes to "WSCH".
14. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is unchecked in system settings AND maximo.mobile.usetimer is set to 1 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in Pre-condition and click on "Start work" button.
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the status of work order and both tasks/task work orders remains unchanged.

**Results:**

- Status of work order should be "Approved".
- Status of both tasks/task work orders should be "WSCH".
- Technician should not be able to see COMP or any of it's synonym status in change status lookup of the parent work order until both task work orders are marked completed.
- 'Complete work' button in the 'Report work' page of parent work order should be disabled until both task work orders are marked completed.
- Technician should be able to complete task1 and task2 in any order.
- The parent work order is completed automatically once both tasks/task work orders are marked completed.

## Scenario 7 - Verify status of work order and associated tasks when work order is flow controlled and tasks have predecessor (WORKTYPE.STARTSTATUS is filled in)

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Organizations and open technician organization, click on "Work Order Options" and select "Work Type" option.
3. Filter the records for "Work Order Class" value as "WORKORDER".
4. Expand record with "Work Type" as "CP".
5. In "Process Flow" section, select "Start Status" field value as "WSCH".
6. Select "Complete Status" field value as "COMP" and click OK button.
7. Go to work order tracking application.
8. Create a new work order with work type as "CP".
9. Select/Check the checkbox for "Under flow control?".
10. Create two planned tasks in the work order.
11. Add task1 as the predecessor for task2.
12. Add labor from assignments tab and approve the work order.
13. Status of task1 changes to "WSCH" and status of task2 remains "WAPPR".
14. For technician organization in organizations app, make sure that "Automatically change work order status to INPRG when a user starts a labor timer?" is unchecked in system settings AND maximo.mobile.usetimer is set to 1 in system properties.

**Steps:**

1. Launch the Maximo Mobile app and login with assigned technician credentials.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order created in pre-condition and change work order status to "In progress".
4. Login with Admin credentials in Maximo classic/Manage.
5. Verify that the status of work order changes to "In progress" but status of both tasks/task work orders remains unchanged.

**Results:**

- Status of work order should be updated to "In progress".
- Status of task1 should be "WSCH" and task2 should be "WAPPR".
- Technician should not be able to see COMP or any of it's synonym status in change status lookup of the parent work order until both task work orders are marked completed.
- Technician should not be able to change status of task2 to any other status except cancelled.
- Technician completes task1 and after that only, task2 status changes to "WSCH" automatically.
- 'Complete work' button in the 'Report work' page of parent work order should be disabled until both task work orders are marked completed.
- Technician completes task2 and after that only, parent work order status changes to "Completed" automatically.

**Note:**

All above scenarios should work in similar way when changing work order status to other available statuses i.e. WMATL, WPCOND or WSCH.

## Scenario 8 - Verify the above scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 9 - Verify all the above scenarios in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
