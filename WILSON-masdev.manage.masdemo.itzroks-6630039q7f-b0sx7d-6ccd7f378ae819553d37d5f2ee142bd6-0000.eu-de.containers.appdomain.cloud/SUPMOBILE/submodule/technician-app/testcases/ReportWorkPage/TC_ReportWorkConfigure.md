# Configuration of tables, Complete work button status on Report work page - Developer machine only

These test cases will verify the easy configuration of tables, Complete work button status on Report work page using app.xml for Technician web app, online and offline mode on mobile containers. These test cases will be tested on developer machine only and will not be deployed to QA/Production servers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-32745: Moe can configure Report work page
- GRAPHITE-35180: [Split] Moe can configure Report work page

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.

## Scenario 1 - Verify that developer can easily add fields to any of the tables listed in the Report work view

**Pre-condition:**

1. Developer add fields to any of the tables for Failure Report, Labor, Materials and or Tool section in Report work page in app.xml file.
2. Technician application is deployed on developer local server and server is started.
3. Login with Admin credentials in Maximo classic/Manage of developer local server.
4. Go to work order tracking application.
5. Create a new work order.
6. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work view.
5. Verify that the newly added fields in tables are displayed and there is no rendering/UI issues.

**Results:**

The newly added fields in tables for Failure Report, Labor, Materials and or Tool section should be displayed and there are no rendering/UI issues.

## Scenario 2 - Verify that developer can easily modify the Complete work button in the Report work view to change work order status to another status or synonym

**Pre-condition:**

1. Developer changes the complete work button in Report work page to change work order status to another status or synonym in app.xml file.
2. Technician application is deployed on developer local server and server is started.
3. Login with Admin credentials in Maximo classic/Manage of developer local server.
4. Go to work order tracking application.
5. Create a new work order.
6. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work view.
5. Click the Complete Work button (developer can change label of this button too) on Report work page.
6. Verify that work order status is changed to another status or synonym as set by developer in app.xml file.

**Results:**

Work order status should be changed to another status or synonym as set by developer in app.xml file.
