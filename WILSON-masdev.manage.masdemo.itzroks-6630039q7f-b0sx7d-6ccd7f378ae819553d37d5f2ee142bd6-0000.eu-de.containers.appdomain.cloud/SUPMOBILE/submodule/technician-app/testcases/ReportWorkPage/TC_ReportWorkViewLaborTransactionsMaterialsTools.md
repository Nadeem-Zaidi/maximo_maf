# View labor transactions, used materials and tools functionalities on Report work page

These test cases will verify UI and fields displayed for labor transactions, used materials and tools records on Report work page on Technician web app, online and offline mode using mobile containers. These test cases will cover functionalities of following user stories:

- GRAPHITE-20907: Eli can see when there are no tools, items, or labor reported
- GRAPHITE-21617: Eli cannot enter a labor transaction on an unapproved WO
- GRAPHITE-16360: Eli can view his labor time
- GRAPHITE-16074: Eli can view actual materials
- GRAPHITE-16051: Eli can view actual tools
- GRAPHITE-34082: Eli can see reported labor transactions for other users
- GRAPHITE-35273: [Split] Eli can see reported labor transactions for other users
- GRAPHITE-50896: Keep the WO number visible after pressing the "Edit" button inside a Work Order on the App

**Design URL:**

- <https://ibm.invisionapp.com/share/RSO01BZUFZ9#/screens/319633583>
- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319631974>
- <https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319650258>
- <https://ibm.invisionapp.com/share/RSO01BZUFZ9#/319633583_3-Report_Work>
- <https://ibm.invisionapp.com/share/6RO0B5CWVB8#/screens/319646186_Report_Work>
- <https://ibm.invisionapp.com/share/37O12XN6NPX#/screens/319933658_Labor_For_Crews>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Labor section

## Scenario 1 - Verify Labor section is available on Report work page and the placeholder text when there is no record available for labor transaction

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify that Labor section is available on Report work page.
6.Verify the contents of Labor section and rendered UI.

**Results:**

- Labor section should be available on Report work page.
- Single white row should be displayed with left-aligned text "No labor time reported". There should be no UI/rendering issues.

## Scenario 2 - Verify un-availability of '+' button, edit pencil icon,  in Labor section to add labor time when work order status is waiting for approval, cancelled and closed.

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Change work order status to waiting for approval(WAPPR).
5. Click on Report work touch-point to open Report work page.
6. Verify that '+' button is un-available in Labor section.
7. Verify that edit pencil icon is un-available on started labor transaction in Labor section.
8. Repeat same steps with work order status to canceled(CAN) and closed(CLOSE).

**Results:**

- '+' button should be un-available in Labor section.
- Edit pencil icon should be un-available on started labor transaction in Labor section.

## Scenario 3 - Verify the fields/data displayed on each labor transaction record in Labor section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add an actual labor time record for assigned labor/technician.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify the contents of labor transaction record in Labor section.

**Results:**

The contents of each labor transaction record should be:

- Start date and time in bold. Only start date when time is not provided.
- End date and time - Only end date when time is not provided. Placeholder, in case, no end date and time is provided.
- Labor transaction type
- Regular hours/Duration in X hours Y minutes format

## Scenario 4 - Verify that technician can see all reported labor transactions of a work order and those are grouped by labor

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for multiple labors and approve the WO.
5. Add actual labor time records for multiple labors.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify that all reported labor transactions of a work order are displayed in Labor section and those are grouped by labor.

**Results:**

- All reported labor transactions of a work order should be displayed in Labor section.
- The labor transactions are grouped by labor.
- Labor/Person display name is displayed on group header.
- Tapping on expand/collapse button on header displays/hide the labor transactions for that labor.
- Display all labor transactions group by labor is default configuration for Labor section.

## Materials used section

## Scenario 5 - Verify Materials used section is available on Report work page and placeholder text when there is no record available in Materials used section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify that Materials used section is available on Report work page.
6. Verify the contents of materials used section.

**Results:**

- Materials used section should be available on Report work page.
- Single white row should be displayed with left-aligned text "No materials reported". There should be no UI/rendering issues.

## Scenario 6 - Verify all reported items and materials records are displayed in Materials used section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add actual reported items and materials in work order.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify that all reported items and materials records are displayed in Materials used section.

**Results:**

All reported items and materials records should be displayed in Materials used section.

## Scenario 7 - Verify the fields/data displayed for each reported items/materials record in Materials used section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add actual reported items and materials in work order.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify the contents of reported items/materials record in Materials used section.

**Results:**

The contents of each reported item/material record should be:

- Item ID and Item description or Material description.
- Storeroom description. Placeholder in case storeroom description is not provided.
- Quantity
- Transaction type (Issue or Return)

## Tools used section

## Scenario 8 - Verify Tools used section is available on Report work page and the placeholder text when there is no record available in Tools used section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify that Tools used section is available on Report work page.
6. Verify the contents of tools used section.

**Results:**

- Tools used section should be available on Report work page.
- Single white row should be displayed with left-aligned text "No tools reported". There should be no UI/rendering issues.

## Scenario 9 - Verify all reported tools records are displayed in Tools used section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add actual reported tools in work order.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify that all reported tools records are displayed in Tools used section.

**Results:**

All reported tools records should be displayed in Tools used section.

## Scenario 10 - Verify the fields/data displayed for each reported tools record in Tools used section

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add actual reported tools in work order.

**Steps:**

1. Launch the Maximo Mobile Technician app and login with assigned Technician/Labor.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify the contents of reported tools record in Tools used section.

**Results:**

The contents of each reported tool record should be:

- Tool ID (TOOLTRANS.ITEMNUM) and Tool Description (TOOLITEM.DESCRIPTION).
- Quantity (TOOLTRANS.TOOLQTY).
- Hours (TOOLTRANS.TOOLHRS).

## Generic scenarios (Applicable for all sections)

## Scenario 11 - Verify work order number is displayed with header on report work page and is in read-only mode and ellipsis is displayed with work order number on tasks page when there is less space

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click on chevron to open WO details page.
4. Click the "Report work" touch-point.
5. Verify the work order number is displayed with 'Report work' text as header/title of report work page and is in read-only mode.
6. Verify ellipsis is displayed in the header and is in read-only mode when there is less space.

**Result:**

- Work order number should be displayed on report work page in read-only mode. It cannot be edited or changed.
- Work order number should be displayed along with the header/title 'Report work'.
- Ellipsis should be displayed in the header with work order number and 'Report work' text as header/title on report work page when there is less space and there should be no text cut from sides.

## Scenario 12 - Verify that UI is displayed as per design

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add actual labor time, materials and/or tools as required.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Verify font, font size, color, style and rendering of the UI.

**Results:**

Rendered UI should match with the UI design of Labor, Materials used and Tools used sections on report work page.

## Scenario 13 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.
5. Add actual labor time, materials and/or tools as required.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on Report work touch-point to open Report work page.
5. Performs all above test scenarios in online and offline mode on mobile devices.

**Results:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.
