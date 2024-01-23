# View work order card data, blue button work flow and multiple views/filter functionality on work order list page

These test cases will verify the view work order card data, blue button work flow and multiple views/filter functionality on work order list page for Technician webapp and mobile containers in online and offline mode.

These test cases will cover functionalities of following user stories:

- GRAPHITE-27122: Eli can use the materials and tools prompt in the container
- GRAPHITE-13108: Eli is prompted to pick up his planned materials and tools
- GRAPHITE-18437: Eli can see the WO status description, type, WO num and asset num
- GRAPHITE-18823: Eli can access his mobile app, and access multiple views
- GRAPHITE-21425: Enable blue button work flow
- GRAPHITE-31487: When there are no work orders on the list, the Get Materials and Tools blue button should not be displayed

**Design URL:**

<https://ibm.invisionapp.com/share/4XNZN6QSQ5C#/screens/319592426_change_Status_Button>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify that blue button prompt to pick up materials and tools is displayed if Tools or Material is associated 
with the work order and the technician login to the application

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add planned tools and materials required for the work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that blue button prompt to pick up materials and tools is displayed.

**Result:**

- Blue button prompt to pick up materials and tools should be displayed when technician login into the application first time in a day.
- The text on the blue button prompt should be "Get materials & tools".
- The info icon should be displayed and is left aligned.
- Clicking on prompt to pick up materials and tools should navigate technician to materials and tools page/view.

## Scenario 2 - Verify that blue button flow functionality is not applied to the work orders card in the WO list when materials and tools prompt is displayed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add planned tools or material required for the work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order for the first time in the day.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is displayed.
4. Verify that blue button flow functionality is not applied to the work orders card in the WO list.

**Result:**

- Blue button flow functionality should not be applied to the work orders card in the WO list when materials and tools prompt is displayed.
- The buttons (Start and Stop work/travel or chevron) on the first work order cars should not be in primary style (highlighted in blue color).

## Scenario 3 - Verify that blue button prompt to pick up materials and tools is not displayed again when technician navigates away from the WO list page, it only displays when technician login into the application 
again in the day

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add planned tools or material required for the work order.
5. Add assignments for labor and approve the work order.
**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is displayed.
4. Click chevron on any work order card in the WO list to open work order details page.
5. Click back button on work order details page to navigate back to WO list page.
6. Verify that blue button prompt to pick up materials and tools is not displayed on WO list page.
7. Log out and re-login into application with same technician credentials.
8. Verify that blue button prompt to pick up materials and tools is displayed on the WO list page.

**Result:**

- Blue button prompt to pick up materials and tools should not be displayed again when technician navigates away from the WO list page.
- Blue button prompt to pick up materials and tools should be displayed when technician login into the application again in the day.

## Scenario 4 - Verify if Tools and Materials is not associated with any WO in the WO list page or if WO list is empty then blue button prompt to pick up materials and tools is not displayed when technician login into the application 
 
**Pre-condition:**
 
1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Do not add planned tools and material required for the labor.
5. Add assignments for labor and approve the work order.
 
**Steps:**
 
1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that blue button prompt to pick up materials and tools is not displayed when technician login into the application.
 
**Result:**
 
- Blue button prompt to pick up materials and tools should not be displayed when technician login into the application if Tools or Materials is not associated with any WO in the WO list page.
- Blue button prompt to pick up materials and tools should not be displayed when technician login into the application if WO list page is empty.

## Scenario 5 - Verify that "Start work" and "Stop work" button is primary button (highlighted in blue color) for the first work order card 
on WO list page when blue button prompt to pick up materials and tools is not displayed

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Do not add planned tools or material required for the labor.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is not displayed.
4. Verify that "Start work" button is primary button (highlighted in blue color) for the first work order card on WO list page.
5. Click on the "Start work" button on the first work order card on the WO list page.
6. Verify that "Stop work" button is primary button (highlighted in blue color) for the first work order card on WO list page.

**Result:**

- "Start work" button should be primary button (highlighted in blue color) for the first work order card on WO list page when blue button prompt to pick up materials and tools is not displayed.
- "Stop work" button should be primary button (highlighted in blue color) for the first work order card (which is already started) when blue button prompt to pick up materials and tools is not displayed.

## Scenario 6 - Verify that chevron icon(>) is primary button (highlighted in blue color) for the first work order card on WO list page when work order has incomplete tasks

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add planned tasks to the work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is not displayed.
4. Verify that chevron icon(>) is primary button (highlighted in blue color) for the first work order card on WO list page.

**Result:**

Chevron icon(>) should be primary button (highlighted in blue color) for the first work order card on WO list page when work order has incomplete tasks.

## Scenario 7 - Verify that task touch-point is primary button (highlighted in blue color) on WO details page when work order has incomplete tasks

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multiple planned tasks to the work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is not displayed.
4. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO details.
5. Click on task touchpoint.
6. Verify that first task out of multiple tasks will be expanded by default and should have a blue checkmark displayed. 

**Result:**

First task out of multiple tasks should be expanded by default on Tasks page and should have a blue checkmark displayed when work order has incomplete tasks.. 

## Scenario 8 - Verify that "Start work" button is primary button on WO details page when there are either no planned task or incomplete task associated with work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is not displayed.
4. Search the work order created in pre-condition steps in WO list and click chevron on work order card to open WO details.
5. Verify that "Start work" button is primary button on WO details page.

**Result:**

"Start work" button should be primary button on WO details page when there are either no planned task or incomplete task associated with work order.

## Scenario 9 - Verify that "Stop work" button is primary button (highlighted in blue color) on WO details page when work order is already started and there are either no planned task or incomplete task associated with work order

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Blue button prompt to pick up materials and tools is not displayed.
4. Search the work order created in pre-condition steps in WO list page.
5. Click on "Start work" button and click chevron on work order card to open WO details.
6. Verify that "Stop work" button is primary button (highlighted in blue color) on WO details page.

**Result:**

"Stop work" button should be primary button (highlighted in blue color) on WO details page when work order is already started and there are either no planned task or incomplete task associated with work order.

## Scenario 10 - Verify the available dropdown options/filters on WO list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify the available dropdown options/filters on WO list page.

**Result:**

The available dropdown options/filters on WO list page should be:

- Assigned work
- PM's due this week
- Work created by me
- Work order history

**Note:**

In mobile containers on devices, "Work created by me" should be displayed as "Work created on device".

## Scenario 11 - Verify that work orders which are assigned to logged in technician are only displayed in "Assigned work" filter on WO list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Create first work order with work type as "CAL" and priority as 1.
3. Create second work order with work type as "PM" and priority as 2.
4. Add assignments for same labor to both work orders.
5. Approve these work orders.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work orders.
2. Click on "My Schedule" tile to open the list of work orders.
3. "Assigned work" filter option is selected by default.
4. Verify that work orders which are assigned to logged in technician are only displayed in "Assigned work" filter on WO list page.

**Result:**

- Work orders which are assigned to logged in technician should be only displayed as WO cards in "Assigned work" filter on WO list page.
- "Assigned work" filter option should be selected by default.
- All the WO cards should be displayed in high to low priority order (0 is highest and 999 is lowest priority).
- Work orders with WAPPR, CAN, CLOSE or COMP status should not be displayed in the assigned work order list.

## Scenario 12 - Verify that work orders which are assigned to logged in technician, work type as PM and due within a week are only displayed in "PM's due this week" filter on WO list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Create first work order with work type as "CAL", Scheduled finish date as "today+3days" and priority as 1.
3. Create second work order with work type as "PM", Scheduled finish date as "today+5days" and priority as 2.
4. Create third work order with work type as "PM", Scheduled finish date as "today+7days" and priority as 3.
5. Add assignments for same labor and approve these work orders.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work orders.
2. Click on "My Schedule" tile to open the list of work orders.
3. Click on dropdown icon and select "PM's due this week" filter option.
4. Verify that work orders which are assigned to logged in technician, work type as PM and due within a week are only displayed in "PM's due this week" filter.

**Result:**

- "PM's due this week" view is displayed on WO list page.
- Work orders which are assigned to logged in technician, work type as PM and due within a week are only displayed in "PM's due this week" filter on WO list page.
- All the WO cards should be displayed in high to low priority order (0 is highest and 999 is lowest priority).
- Work orders with WAPPR, CAN, CLOSE or COMP status should not be displayed in the "PM's due this week" work order list.

## Scenario 13 - Verify that the work orders are refreshed when technician switches view/filter option on WO list page

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Create first work order with work type as "CAL", Scheduled finish date as "today+3days" and priority as 1.
3. Create second work order with work type as "PM", Scheduled finish date as "today+5days" and priority as 2.
4. Create third work order with work type as "PM", Scheduled finish date as "today+7days" and priority as 3.
5. Add assignments for same labor and approve these work orders.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work orders.
2. Click on "My Schedule" tile to open the list of work orders.
3. Click on dropdown icon and select "PM's due this week" filter option.
4. Verify that the work orders are refreshed when technician switches view.

**Result:**

Work orders should be refreshed when technician switches view/filter option on WO list page.

## Scenario 14 - Verify that work order status description, work order type, WO num and asset num are displayed on the work order card in WO list and details view

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with work order type and asset associated to it.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order created in pre-condition steps in WO list page.
4. Verify that work order status description, work order type, WO num and asset num are displayed on the work order card.
5. Click chevron on work order card to open WO details page.
6. Verify that work order status description, work order type, WO num and asset num are displayed on the work order details page.

**Result:**

Work order status description, work order type, WO num and asset num should be displayed on the work order card in WO list and details view.

## Scenario 15 - Verify work orders show 'Overdue since: xx days ago, month date, year' for all work order created before the current date

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order with work order type and asset associated to it.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work orders that are created before the current date.
4. Verify work orders show Overdue since: xx days ago, Month date, year for all work order created before the current date.

**Result:**

Work orders should show Overdue since: xx days ago, Month date, year for all work order created before the current date.

## Scenario 16 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small & large screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Navigate to screens/pages/cards of above mentioned scenarios.
4. Verify UI of the cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.
5. Navigate and perform above mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- Smart Input version of the components should be used.
- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 17 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
