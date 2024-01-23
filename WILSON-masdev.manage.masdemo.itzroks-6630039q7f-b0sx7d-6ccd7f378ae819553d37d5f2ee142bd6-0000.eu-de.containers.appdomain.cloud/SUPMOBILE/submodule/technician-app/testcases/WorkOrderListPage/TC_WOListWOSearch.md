# Search functionality on 'Work order List' page

These test cases will verify search functionality on 'Work order list' page on Technician web app, online and offline mode on mobile containers.

- GRAPHITE-21426 - Eli can search a work order view
- GRAPHITE-29141 - Verify that Eli can scan QR code
- GRAPHITE-37567 - Eli should dynamically load and list the queries in the dropdown

Design URL: <https://ibm.invisionapp.com/share/M5O0MHY9SYQ#/screens/319760826_Search_Work_Order>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- Create a work order in classic and goto <https://www.the-qrcode-generator.com/> and generate the QR code with the created work order. These will be applicable for all the bar code and QR code test cases.

## Scenario 1 - Verify that user Eli can tap the search button and enter a query in the search field/bar and verify the total counts of number of work orders displayed on Work Order list page

**Pre-condition:**

1. Work Order list page should be opened.
2. Search bar/field should be opened.

**Steps:**

1. Tap on the "Search" button.
2. Enter a query in the search bar/field.
3. Check the number of records of work order on top left of work order list page.

**Result:**

- Search bar should be opened after tap on search button.
- User Eli should be able to enter a query in the search field.
- Total counts of work orders should be displayed on Work Order list page at the top left.

## Scenario 2 - Verify that user Eli can able to search the work order with WORKORDER.WORKTYPE, WORKORDER.WOPRIORITY,  WORKORDER.LOCATION_Description and WORKORDER.WOSERVICEADDRESS.FORMATTEDADDRESS attribute value

**Pre-condition:**

1. Search bar/field should be opened.

**Steps:**

1. Enter the query related to WORKORDER.WORKTYPE attribute value in search field.
2. Tap on search button.
3. Enter the query related to WORKORDER.WOPRIORITY attribute value in search field.
4. Tap on search button.
5. Enter the query related to WORKORDER.LOCATION_Description attribute value in search field.
6. Tap on search button.
7. Enter the query related to WORKORDER.WOSERVICEADDRESS.FORMATTEDADDRESS attribute value in search field.
8. Tap on search button.

**Result:**

- Results should be fetched and displayed based on entered query as WORKORDER.WORKTYPE attribute value and according to result work order record count should also be updated.
- Results should be fetched and displayed based on entered query as WORKORDER.WOPRIORITY attribute value and according to result work order record count should also be updated.
- Results should be fetched and displayed based on entered query as WORKORDER.LOCATION_Description attribute value and according to result work order record count should also be updated.
- Results should be fetched and displayed based on entered query as WORKORDER.WOSERVICEADDRESS.FORMATTEDADDRESS attribute value and according to result work order record count should also be updated.

## Scenario 3 - Verify that user Eli can able to search the work order with WORKORDER.WONUM attribute value

**Pre-condition:**

1. Search bar/field should be opened.

**Steps:**

1. Enter the query related to WORKORDER.WONUM attribute value in search field.
2. Tap on search button.

**Result:**

Results should be fetched and displayed based on entered query as WORKORDER.WONUM attribute value and according to result work order record count should also be updated.

## Scenario 4 - Verify that user Eli can able to search the work order with WORKORDER.STATUS attribute value

**Pre-condition:**

1. Search bar/field should be opened.

**Steps:**

1. Enter the query related to WORKORDER.STATUS attribute value in search field.
2. Tap on search button.

**Result:**

Results should be fetched and displayed based on entered query as WORKORDER.STATUS attribute value and according to result work order record count should also be updated.

## Scenario 5 - Verify that user Eli can able to search the work order with WORKORDER.DESCRIPTION attribute value

**Pre-condition:**

1. Search bar/field should be opened.

**Steps:**

1. Enter the query related to WORKORDER.DESCRIPTION attribute value in search field.
2. Tap on search button.

**Result:**

Results should be fetched and displayed based on entered query as WORKORDER.DESCRIPTION attribute value and according to result work order record count should also be updated.

## Scenario 6 - Verify that user Eli can able to search the work order with WORKORDER.ASSETNUM.DESCRIPTION attribute value

**Pre-condition:**

1. Search bar/field should be opened.

**Steps:**

1. Enter the query related to WORKORDER.ASSETNUM.DESCRIPTION attribute value in search field.
2. Tap on search button.

**Result:**

Results should be fetched and displayed based on entered query as WORKORDER.ASSETNUM.DESCRIPTION attribute value and according to result work order record count should also be updated.

## Scenario 7 - Verify that user Eli can able to search the work order with WORKORDER.ASSETNUM attribute value

**Pre-condition:**

1. Search bar/field should be opened.

**Steps:**

1. Enter the query related to WORKORDER.ASSETNUM attribute value in search field.
2. Tap on search button.

**Result:**

Results should be fetched and displayed based on entered query as WORKORDER.ASSETNUM attribute value and according to result work order record count should also be updated.

## Scenario 8 - Verify that user can search for the completed Work order in the 'Work order history' filter for mobile 

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add planned tools and materials required for the work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order and mark status as completed.
4. Click on the filter dropdown and select 'work order history'.
5. Verify search bar is dispalyed.
6. Search for the completed work order in search bar which were closed with in six months and if same type of asset/location attached with multiple open work orders.

**Result:**

User should be able to search for Work order in the work order history filter for mobile and it should have status as 'Completed' which were closed with in six months and if same type of asset attached with multiple work orders.

## Scenario 9 - Verify that user can search for the completed Work order in the 'PM's due this week' filter for mobile 

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add planned tools and materials required for the work order.
5. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the filter dropdown and select 'PM's due this week' filter.
4. Verify search bar is dispalyed.
5. Verify that 'PM's due this week' reflects the open WO's assigned to the current user where the work type is PM and scheduled start date is smaller than current date+7.

**Result:**

'PM's due this week' should reflect the open WO's assigned to the current user where the work type is PM and scheduled start date is smaller than current date+7.

## Scenario 10 - Verify that user can search for 'Work created on device' and 'Work created by me' on web.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Tap on "9 dot" icon on Navigator.
3. Click on the 'Create work button' on navigator page.
4. Add values to Priority, Work order description, Long description, Scheduled Start, Scheduled finish, Estimated duration, Work type, Asset and location fields.
5. Click on Save button to create a new work order and page navigate to newly created work order details page.
6. Verify user can search for work order in 'Work created on device' and 'Work created by me' on web.

**Result:**

User should be able to search for work order in 'Work created on device' and 'Work created by me' on web.

## Scenario 11 - Verify that search should be cleared when switching filters(assigned work/ work created by me or device/work order history/PMs due this week)

**Pre-condition:**

Search result should be opened.

**Steps:**

1. Delete/Clear the entered query from search field/bar.
2. Tap on search button.
3. Enter any work order number and switch filter from one to other.

**Result:**

Search result should be cleared when switching views to home Work order list page. Also result count should be modified.

## Scenario 12 - Verify the scanner button on search bar in work order list page and Verify camera is opened and user can scan 'QR code' of the work order by clicking on the scanner button in search bar
**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.
5. Using a third party application, Generate the QR code for the above work order.
6. Barcode scanning is default currently. The technician app must be configured to support QR scanning.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile, User lands on the work order list page.
3. Click on search icon.
4. Verify the availability of scanner button on search bar.
5. Click on scanner button.
6. Verify that the camera is opened when clicked on the scanner button.
6. Point the camera on the created 'QR code'.
7. Verify that QR code of the work order is scanned and work order is displayed in the search results.

**Result:**

- 'Scanner' button should be available on search bar in work order list page.
- When clicked on scanner button on search bar, The camera is opened and user can scan the work order or assets and location.
- The user is able to scan the 'QR code' of the work order and work order should be fetched and displayed based on entered query as WORKORDER.WONUM attribute value and according to result work order record count should also be updated.

## Scenario 13 - Verify that the user can scan 'QR code' of the asset,location, invalid format or corrupted or not supported format by clicking on the scanner button in search bar

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create an asset.
3. Create a work order and add the created asset to it.
4. Add assignments for labor.
5. Approve the work order.
6. Using a third party application, Generate the QR code for the asset.
7. Barcode scanning is default currently. The technician app must be configured to support QR scanning

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile, User lands on the work order list page.
3. Click on search icon, User can view the scanner button on it.
4. Click on scanner button, The camera is opened for scanning.
5. Point the camera on the created 'QR code'.
6. Verify that QR code of the asset is scanned and asset is displayed in the search results.
7. When the QR code of the asset or location is scanned, Verify that the search will not return any results as the asset or location is not associated to any work order.
8. When the invalid or not supported QR code of the asset or location is scanned, Verify that the scanner continues to scan and user has to close the scanner in order to scan another QR code.

**Result:**

- The user is able to scan the 'QR code' of the asset by clicking on the scanner button in search bar.
- The user is able to scan the 'QR code' of the location by clicking on the scanner button in search bar.
- When invalid or not supported QR code is scanned, Scanner continues to scan and user has to close the scanner in order to scan another QR code.
- The search will not return any results as the asset or location is not associated to any work order.
## Scenario 14 - Verify that user Eli can clear the search

**Pre-condition:**

1. Search result should be opened.

**Steps:**

1. Delete/Clear the entered query from search field/bar.

**Result:**

User Eli should be able to clear the entered query from search field/bar.

## Scenario 15 - Verify that options with sigoption defined will be displayed based on their security group settings (Case 1 - Grant Access checkbox checked) in dropdown on work order list page of technician

**Pre-condition:**

1. Login Classic site.
2. Go to security group.
3. Check the security group TECHNICIAN --> Object Structure --> MXAPIWODETAIL --> 'My Work Orders' is created.
4. Check the check box of 'Grant Access?'.

**Steps:**

1. Login to techMobile app with the technician user for which security group grant access.
2. Click on to 'My Schedule' tile to go to work order list page.
3. Click on dropdown and check the option 'My Work Orders' option in the dropdown list.

**Result:**

'My Work Orders' option should be visible in the dropdown list based on options with sigoption defined in their security group setting.

## Scenario 16 - Verify that options with sigoption defined wouldn't be displayed based on their security group settings (Case 2 - Grant Access checkbox unchecked) in dropdown on work order list page of technician. Also, verify options without sigoption defined should always be presented in dropdown on work order list page of technician like 'Assigned work'

**Pre-condition:**

1. Login Classic site.
2. Go to security group.
3. Check the security group TECHNICIAN --> Object Structure --> MXAPIWODETAIL --> 'My work orders' is created.
4. Check the check box of 'Grant Access?' for 'My Work Orders'.
5. Unchecked the check box of 'Grant Access?'.

**Steps:**

1. Login to techMobile app with the technician user for which security group grant access.
2. Click on to 'My Schedule' tile to go to work order list page.
3. Click on dropdown and check the option 'My work orders' option in the dropdown list.
4. Click on dropdown and check the option 'Assigned work' option in the dropdown list.
5. Click on dropdown and select the 'My Work Orders' option in the dropdown list.

**Result:**
- By default check box of 'Grant Access?' for 'My Work Orders' should be unchecked.
- 'Assigned work' option should always be visible in the dropdown list.
- 'My work orders' option shouldn't be visible in the dropdown list based on options with sigoption defined in their security group setting.

## Scenario 17 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work order and assign the created asset to work order.
4. Create the barcode or QR code for asset.

**Steps:**

1. Login to techMobile app with the technician assigned to work order.
2. Navigate to screens/pages/cards of above mentioned scenarios.
3. Verify UI of the cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.
4. Navigate and perform above mentioned scenarios on mobile and other small screen devices for all supported form factors.


**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.

## Scenario 18 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work assign the asset with it.
4. Create the barcode or QR code for asset.
5. Barcode scanning is default currently. The technician app must be configured to support QR scanning

**Steps:**

1. Login to techMobile app with the technician assigned to work order.
2. Navigate and perform above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.