# View the "Asset and location history" from work order details page

These test cases will verify the historical data of work orders performed for the asset/location added to the work order. Hence 'Asset and location history' page will show asset/location sections with "Asset/Location" number and description having the latest three status updated work orders performed for the asset/location by default on "Technician" web app, online and offline mode on mobile containers. These test cases will cover the functionalities of following stories:

- Graphite-31372: Eli can see his location work history
- GRAPHITE-10825: Eli can access his work history of an asset
- GRAPHITE-31535: Review Asset / Location history content
- GRAPHITE-56901: Eli wants to see details of Historical WO records

Design URLs:

- <https://ibm.invisionapp.com/share/7SO1F7CE9U3#/screens>
- <https://ibm.invisionapp.com/share/ENO0SYCJR36#/screens/319824647>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify unavailability of "Asset and location history" touchpoint on the asset and location widget in the WO details page for different combinations(No asset/location added, asset/location added)

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Do not associate any asset or location with the work order for first case.
4. Associate any asset or location with the work order for second case.
5. Add planned labor or add assignments for labor in work order.
6. Approve the work order.
7. Create three other work orders and associate the above created asset and location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Verify unavailability of "Asset and location history" touchpoint on the asset and location widget in the WO details page for case 1(No asset/location added).
5. Verify availability of "Asset and location history" touchpoint on the asset and location widget in the WO details page for case 2( asset/location added).

**Result:**

- "Asset and location history" touchpoint should be unavailable in Asset and location widget on WO details page.
- "Asset and location history" touchpoint should be available on work order details page in Asset and location widget.

## Scenario 2 - Verify the new page is launched with the historical work order data for both asset and location, when technician clicks on the "Asset and location history" touchpoint on work order details page. Also, verify unavailability of the "Asset and location history" touchpoint when there are no historical work orders for both asset and location

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders. All work order/s should be closed or completed.
7. Do not create any other work order having asset or location created in step 1(Perform this step only to check unavailibility of history touchpoint).

**Steps:availability of the "Asset and location history" touchpoint**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch a new page.
6. Verify availability of asset and location sections in "Asset and location history" page.

**Steps: unavailability of the "Asset and location history" touchpoint**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.

**Result:**

- Technician should be navigated to new page which contains historical work order data for both asset and location.
- The new page should open and the title of the page should be "Asset and location history".
- Latest First 3 work orders with completed or closed status should be display under asset history.
- Asset and location sections should be available on "Asset and location history" page.
- "Asset and location history" touchpoint should not be available on work order details page in Asset and location widget.

## Scenario 3 - Verify in "Asset and location history" page, the asset section contains Asset number and description as header along with three work orders with latest status update having that asset

**Pre-condition:**

1. Create an asset in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify the asset section in "Asset and location history" page.

**Result:**

Asset number and description should be displayed as header along with three work orders with latest status update having that asset in asset section.

## Scenario 4 - Verify in "Asset and location history" page, the location section contains location number and description along with three work orders with latest status update having that location

**Pre-condition:**

1. Create a location from maximo classic.
2. Create a work order in maximo classic.
3. Associate the created location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify the location section in "Asset and location history" page.

**Result:**

Location number and description should be displayed as header along with three work orders with latest status update having that location in location section.

## Scenario 5 - Verify work order records in both asset and location section display chevron to expand further if records are less than six months duration

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify that work order records in both asset and location sections are displayed with a chevron to expand further.

**Result:**

- Work order records in both asset and location sections should be displayed with a chevron to expand the work order.
- Work order records in both asset and location sections should not be displayed with a chevron to expand the work order if records are greater than six months duration.

## Scenario 6 - Verify work order records after clicking chevron to expand the work order in "Asset and location history" page.

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify that work order chevron when clicked, should open the work order details page for the historical WO record

**Result:**

- On clicking chevron in "Asset and location history" page it should open the work order details page for the historical WO record
- From the details page, when hitting back, user should return to the work history page in the originator work order.
- In the WO details page for the historical record, the work history touchpoint should be disabled.

## Scenario 7 - If the historical work order data is present in asset and/or location sections then verify that each work order record in either of the asset or location section displays 'work order number', 'description', 'worktype' and 'update date'

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify that each work order record in either of the asset or location section displays 'work order number', 'description', 'worktype' and 'update date'.

**Result:**

Each work order record in either of the asset or location section should display 'work order number', 'description', 'worktype' and 'update date'.

## Scenario 8 - Verify work order records in both asset and location section are read only i.e. no chevron is displayed to expand further

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify that work order records in both asset and location sections are read only i.e. no chevron is displayed to expand further.

**Result:**

Work order records in both asset and location sections should be read only i.e. no chevron should be displayed to expand the work order.

## Scenario 9 - Verify that the latest three status updated work orders are displayed in asset/location section if the asset/location has historical data to present

**Note:**

This is the default OOTB behavior and no maximum limit will be set in the application side to display the work order records.

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create four other work orders and associate the above created asset and location to those work orders.All work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify that the latest three status updated work orders (excluding the current one) are displayed in asset/location section.

**Result:**

The latest three status updated work order records having those asset and location should be displayed in asset sections.

## Scenario 10 - Verify the latest three historical work orders by status change (WORKORDER.STATUSDATE) that are not in CANCELLED status are displayed in asset and location sections irrespective of labor assigned to the work orders

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create four other work orders and associate the above created asset and location to those work orders.Any three work order/s should be closed or completed.
7. Assign different labors to these work orders and cancel one of these work orders.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify that latest three historical work orders by status change (WORKORDER.STATUSDATE) that are not in CANCELLED status are displayed in asset/location section.

**Result:**

- The latest three status updated work order records having those asset and location should be displayed in asset sections.
- Work order with cancelled status should not be displayed in both asset and location sections.
- The work orders are displayed irrespective of the labor assigned or worked on the work order.

## Scenario 11 - Verify if asset and location defined up to three work orders then "No work orders found" message is displayed in location section on "Asset and location history" page

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three work orders and associate  both asset and location to those work orders.These three work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify if asset and location defined up to three work orders then "No work orders found" message is displayed in location section.

**Result:**

"No work orders found" message should be displayed in location section on "Asset and location history" page.

## Scenario 12 - Verify if either of asset or location is not added to the work order then that section is not displayed on "Asset and location history" page

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset or location (not both) with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders.All work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Verify if either of asset or location is not added to the work order then that section is not displayed on "Asset and location history" page.

**Result:**

It should show the work orders for the asset in asset section, and the work orders for the location where the work order does not reference an asset then those work orders should be displayed in location section on "Asset and location history" page.

## Scenario 13 - Verify that by clicking on left chevron in header of "Asset and location history" page the technician navigates back to work order details page

**Pre-condition:**

1. Create an asset and location in maximo classic.
2. Create a work order in maximo classic.
3. Associate the created asset and location with the work order.
4. Add planned labor or add assignments for labor in work order.
5. Approve the work order.
6. Create three other work orders and associate the above created asset and location to those work orders.Any one  or more work order/s should be closed or completed.

**Steps:**

1. Login to Maximo mobile app with the technician.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-requisite step 2 in WO list and click it to open WO details.
4. Go to the Asset and location widget in Work order details page.
5. Click on "Asset and location history" touchpoint in Asset and location widget to launch "Asset and location history" page.
6. Click on left chevron in header of "Asset and location history" page.

**Result:**

Technician should be navigated back to work order details page.

## Scenario 14 - Verify all the above test scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Navigate and perform above mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 15 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
