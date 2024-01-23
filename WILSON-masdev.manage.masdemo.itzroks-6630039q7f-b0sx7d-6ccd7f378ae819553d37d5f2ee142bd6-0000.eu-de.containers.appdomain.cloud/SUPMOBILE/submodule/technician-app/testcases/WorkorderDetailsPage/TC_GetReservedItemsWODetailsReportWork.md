# Get reserved items and report as actuals functionality from "WO details" and "Report work" pages

These test cases will verify "Get reserved items" and report those items as actuals functionality from "Planned materials and tools" touch-point on "WO details" and "Materials used" section on "Report work" pages using Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-43251: Eli should be able to report Actual materials from Reservations
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

**Design URL:**

- <https://ibm.invisionapp.com/share/VEO1QAH4D79#/screens>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify contents of planned materials and tools sliding drawer on WO details page

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add planned items.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Verify the contents of the planned materials and tools sliding drawer.

**Result:**

The contents of the planned materials and tools sliding drawer should be:

- Header title should be "Materials and tools".
- "Shopping cart"/"Request materials" and "Get reserved items" button should be displayed on extreme right of header or within a 3 dot menu.
- Both Materials and Tools sections should be displayed.
- Materials section should display all planned items and materials associated with the work order.
- Tools section should display all planned tools associated with the work order.

For each material, following fields should be displayed:

- Item ID: WPMATERIAL.ITEMNUM
- Description: WPMATERIAL.DESCRIPTION
- Quantity: WPMATERIAL.ITEMQTY (font size 20px)
- Storeroom: LOCATIONS.DESCRIPTION

For each tool, following fields should be displayed:

- Tool ID: WPTOOL.ITEMNUM
- Description: WPTOOL.DESCRIPTION
- Quantity: WPTOOL.ITEMQTY (font size 20px)
- Hours: WPTOOL.HOURS
- Storeroom: LOCATIONS.DESCRIPTION

**Note:**

Tool Hours and Storeroom description should be displayed in separate lines for each Tool. Even if, Tool Hours is 0, it should be displayed in Tools section.

Verify this scenario for various combinations of data like having

- Quantity as zero, small integer, decimal, big/huge quantity etc.
- Store, Material and/or Tool description as large text, special characters etc.
- Hours as integer, having minutes data, large/high hours.

## Scenario 2 - Verify unavailability of "Get reserved items" button when work order status is "Waiting for approval"

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add planned items with/without reservations.
4. Add planned tools with/without reservations.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Change work order status to "Waiting for approval".
6. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
7. Verify "Get reserved items" button is unavailable on planned materials and tools sliding drawer.

**Result:**

"Get reserved items" button should be unavailable on planned materials and tools sliding drawer.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 3 - Verify availability of "Get reserved items" button when work order status is "Approved", "In progress" (or any synonyms)

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add planned items with/without reservations.
4. Add planned tools with/without reservations.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Verify "Get reserved items" button is displayed on extreme right of header or within a 3 dot menu on planned materials and tools sliding drawer.
7. Close the planned materials and tools sliding drawer and change work order status to "In progress".
8. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
9. Verify "Get reserved items" button is displayed on extreme right of header or within a 3 dot menu on planned materials and tools sliding drawer.

**Result:**

"Get reserved items" button should be displayed on extreme right of header or within a 3 dot menu on planned materials and tools sliding drawer.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 4 - Verify contents of "Reserved items" page when technician clicks on "Get reserved items" button and no planned items are added or reserved. Also, verify when planned items are added or reserved

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add planned items without reservations or do not add any planned item.
4. Add planned tools with/without reservations.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Click on "Get reserved items" button to open "Reserved items" page.
7. Verify the contents of the "Reserved items" page.

**Result:**

The contents of the "Reserved items" page should be(when planned items are not added or reserved):

- Header title should be "Reserved items" with back button.
- Work order description is displayed below the header.
- "No reserved items." message.

The contents of the "Reserved items" page should be(when planned items are added or reserved):

- Header title should be "Reserved items" with back button and disabled "Get selected" button.
- Work order description is displayed below the header.
- Record for each reserved planned item with Item id, Item description, Storeroom, reserved quantity information and a checkbox to select the record.
- No reserved tool should be displayed.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 5 - Verify technician can select one or more reserved items on "Reserved items" page

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add one or more planned items with reservations.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Click on "Get reserved items" button to open "Reserved items" page.
7. Verify technician can select the checkbox for reserved item records.

**Result:**

Technician should be able to select the checkbox for one or more reserved items on "Reserved items" page.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 6 - Verify "Get selected" button is enabled when technician selects at least one reserved item on "Reserved items" page

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add one or more planned items with reservations.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Click on "Get reserved items" button to open "Reserved items" page.
7. Select checkbox for one or more reserved item records.
8. Verify "Get selected" button is enabled.

**Result:**

"Get selected" button should be enabled when technician selects at least one reserved item on "Reserved items" page.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 7 - Verify all selected reserved items are reported as actuals in "Materials used" section on "Report work" page when technician clicks on "Get selected" button

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add one or more planned items with reservations.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Click on "Get reserved items" button to open "Reserved items" page.
7. Select checkbox for one or more reserved item records.
8. Click "Get selected" button.
9. Verify all selected reserved items are reported as actuals in "Materials used" section on "Report work" page.

**Result:**

- Technician should be navigated to "Report work" page.
- Each selected reserved planned item record should be reported as actuals in "Materials used" section on "Report work" page.
- The planned reserved items details should match with the details of items reported as actuals in "Materials used" section on "Report work" page.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 8 - Verify that current balance of the respective items in inventory is reduced by reserved quantity when reserved items are reported as actuals

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add one or more planned items with reservations.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Click on "Get reserved items" button to open "Reserved items" page.
7. Select checkbox for one or more reserved item records.
8. Click "Get selected" button to report selected reserved items as actuals.
9. Verify that current balance of the respective items is reduced by reserved quantity in Maximo/Manage inventory app.

**Result:**

The current balance of the respective reserved planned items in inventory should be reduced by reserved quantity when reserved items are reported as actuals.

**Note:**

Verify this scenario for "Get reserved items" button on "Materials used" section on "Report work" page too.

## Scenario 9 - Verify technician is navigated back to the materials and tools sliding drawer when technician clicks on back chevron on "Reserved items" page

**Pre-condition:**

1. Login to Maximo/Manage application as admin.
2. Create a work order.
3. Add one or more planned items with reservations.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the chevron on the work order card to open WO details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Click on "Get reserved items" button to open "Reserved items" page.
7. Click back button on "Reserved items" page.

**Result:**

Technician should be navigated back to the materials and tools sliding drawer when technician clicks on back chevron on "Reserved items" page.

**Note:**

Verify that in this scenario technician should be navigated to "Report work" page when technician clicks back button on "Reserved items" page and "Reserved items" page was opened using "Get reserved items" button on "Report work" page.

## Scenario 10 - Verify that "Get reserved items >" button under 3 dot menu in Materials used section on Report work page is either disabled or hidden when technician do not have permission for reporting reserved items as actuals

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Actual reserv"(ACTUALRESERV) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Actual reserv"(ACTUALRESERV) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that "Get reserved items >" button under 3 dot menu in Materials used section on Report work page is either disabled or hidden.

**Results:**

The "Get reserved items >" button under 3 dot menu in Materials used section on Report work page should be either disabled or hidden when technician do not have permission for reporting reserved items as actuals.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 11 - Verify that "Get reserved items >" button under 3 dot menu in planned materials and tools drawer on WO details page is either disabled or hidden when technician do not have permission for reporting reserved items as actuals

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Actual reserv"(ACTUALRESERV) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Actual reserv"(ACTUALRESERV) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on planned materials and tools touch point to open 'Materials and tools' sliding drawer.
5. Verify that "Get reserved items >" button under 3 dot menu in planned materials and tools drawer on WO details page is either disabled or hidden.

**Results:**

The "Get reserved items >" button under 3 dot menu in planned materials and tools drawer on WO details page should be either disabled or hidden when technician do not have permission for reporting reserved items as actuals.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 12 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Perform steps as specified for above mentioned test scenarios.
2. Navigate and perform above mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 13 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
