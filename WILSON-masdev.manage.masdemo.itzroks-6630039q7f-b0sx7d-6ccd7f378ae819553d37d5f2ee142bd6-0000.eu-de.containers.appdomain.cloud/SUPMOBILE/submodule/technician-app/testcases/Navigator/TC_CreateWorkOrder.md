# Create work order functionality on technician 'Navigator' page

These test cases will verify create work order functionality from the 'Navigator' page on Technician web app, online and offline mode on mobile containers and the below mentioned test cases will cover the functionalities of following stories:

- GRAPHITE-27954: Eli can create a work order
- GRAPHITE-41786: Eli wants to inform Asset and Location during WO creation
- GRAPHITE-42428: Eli, when creating or editing a WO, wants to select Asset from a list/lookup
- GRAPHITE-42451: Eli, when creating or editing a WO, wants to select Locations from a list/lookup
- GRAPHITE-43175: When selecting an asset or location, Eli needs to confirm and update related information
- GRAPHITE-43228: Eli, when using MAS, should be able to use parts identification to find ASSETs
- GRAPHITE-43205: Eli should be able to scan and populate asset/location attribute
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-44632: Add vendor and serial number in the asset lookup attribute

**Design URL:**

- <https://ibm.invisionapp.com/share/R6O0RCCS4YC#/screens/319804108_Create_New>
- <https://ibm.invisionapp.com/d/main#/console/15363156/320158344/preview>
- <https://ibm.invisionapp.com/share/SBO0TZIZKY5#/screens/319836253_Selecting_Asset_And_Location>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify technician is navigated to Create work order page when technician taps/clicks on '+' icon button followed by Create work order button and able to view the place holders values in the work order attributes when there are no values for the attributes (Should be displayed as per the design)

**Steps:**

1. Login to Maximo mobile app.
2. Click on nine dot navigation menu.
3. Verify the availability of '+' icon button on page.
4. Click on the 'Create work button' on navigator page.
5. Created Work order page opens.
6. Verify Create work order page contains mentioned work order attributes (Description, Long description, Priority, Scheduled start and Scheduled finish, Work type, Estimated duration, Asset and location) can be viewed and edited.
7. Verify for Technician is able to view the place holders values in the work order attributes.

**Result:**

- '+' icon with button action should be available on navigator page and technician should be navigated to Create work order page.
- Create work order page should open with the work order attributes in the editable format with no values.
- Technician should view placeholder values for priority, Scheduled start, Scheduled finish, work type, Asset and Location when there are no values

## Scenario 2 - Verify 'Save' button becomes disabled when there is a client side error message or when values are not entered to create work order fields

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to newly created Work order page where user can edit the WO attributes.
6. Enter the invalid data in work order fields to generate client side error message.
7. Verify 'Save' button becomes disabled when there is a client side error message.

**Result:**

- 'Save' should be disabled when there is a client side error message.
- 'Save' button should be disbaled when no data is entered in the create WO fields. 

## Scenario 3 - Verify the user can save the work order with the values in the required field and when save action is performed, User is taken to the WO details view and the page with all the values specified. Also, on clicking back button(OR DISCARD OPTION) then technician is returned to WO list page

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Click on back button to open 'Save or discard changes?' page.
6. Click on 'Discard' button.
7. Click on nine dot navigation menu.
8. Click on the 'Create work button' on navigator page and navigate to created Work order page.
9. Add values to Priority, Work order description, Long description, Scheduled Start, Scheduled finish, Estimated duration, Work type, Asset and location fields.
10. Click on Save button to create a new work order and page navigate to newly created work order details page.
11. Click on back button. 

**Result:**

- WO list page should be opened after click on 'Discard' button.
- Technician should be able to create a new work order with the values.
- Technician should be taken to the WO details view with the page refreshed with the new data and if for some of the fields the value is not provided before save then placeholder "-" will be displayed for those fields in WO details page.
- Page should be navigated to work order list page.

## Scenario 4 - Verify save/discard prompt functionality when user clicks on back button on Create Work order page

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Add values to Priority, Work order description, Long description, Scheduled Start, Scheduled finish, Estimated duration, Work type, Asset and location fields.
6. Click on back button.
7. Verify save/discard prompt is displayed on the screen.
8. Click the discard button.
9. Verify techncian navigates to WO list page. 
10. Click on nine dot navigation menu.
11. Click on the 'Create work button' on navigator page.
12. Navigate to created Work order page.
13. Add some values to the work order fields- Priority, description etc
14. Click on back button.
15. Click on save button.
16. Verify work order is created and techncian navigates to WO list page.

**Result:**

Technician should be navigated to WO List page on clicking discard/save button on Create work order page. 

## Scenario 5 - Verify the error message when work order priority is not a valid priority value between 0 and 999

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to newly created Work order page.
6. Enter the Priority value over 999 or below 0.

**Result:**

"Enter a valid woproperty." error message should be displayed under the priority field.

## Scenario 6 - Verify error message when the scheduled finish is empty/date given is before the Scheduled start date in create work order page

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to newly created Work order page.
6. In scheduled start and scheduled finish date fields enter the dates.
7. Verify the error message when Scheduled finish date is not given.
8. Verify the error message when user specifies the Scheduled finish date value before the Scheduled start date.
9. Verify the error message when user specifies the Scheduled start date value after the Scheduled finish date.

**Result:**

"The start date must be before the finish date" error message should be displayed under the scheduled start field.

## Scenario 7 - Verify that technician can add an asset to work order from create work order page using search i.e. by searching and filtering with various options displayed such as: Location, Vendor, Serial#, Type and Rotating Item

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a valid asset and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section, Click on 3 dots for asset field and choose search icon.
4. Verify filter icon is displayed and clicking on filter icon, filter options are displayed.
5. Select the Type filter and verify only asset with "IT" value.
6. Click on reset button and verify it resets the selected filter.

**Result:**

- Asset lookup with search icon should be displayed.
- After clicking on search icon, asset list should be displayed along with filter icon.
- Clicking on filter icon should display, various filter options such as: Location, Vendor, Serial#, Type and Rotating Item.
- When user selects any filter, the badge count increments and badge count on filter icon indicates the number of filters applied.
- After selecting the filters and clicking on done button, it should return the search results based on selected filter options.
- After clicking reset button it should clear all the filters applied and when user clicks on Done button, the badge count should be zero on filter icon.

## Scenario 8 - Verify that user can add an location to work order from create work order page using search i.e. by searching and filtering with various options displayed such as: Organization, Site, Status and Type

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a valid location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section, Click on 3 dots for location field and choose search icon.
4. Verify filter icon is displayed and clicking on filter icon, filter options are displayed.
5. Select the type filter and verify only location with "Operating" value.

**Result:**

- Location lookup with search icon should be displayed.
- After clicking on search icon, location list should be displayed along with filter icon below the "done" button.
- Clicking on filter icon should display, various filter options such as: Organization, Site, Status and Type.
- When user selects any filter, the badge count increments and badge count on filter icon indicates the number of filters applied.
- After selecting the filters and clicking on done button, it should return the search results based on selected filter options.

## Scenario 9 - Verify that technician can add an asset to work order from create work order page using asset search/lookup

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a valid asset and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section, Click on 3 dots for asset field and choose search icon.
4. Search the assets which are present in repository from asset lookup.
5. Click on 'Save' button to save the changes.

**Result:**

- User Should be able to search asset from asset search/lookup with asset id and description.
- User should be able to search asset using barcode/QR code scanning.
- Search results should also consider selected filter options.
- User should be able to see the asset id and description displayed on work order page after clicking on save button.

## Scenario 10 - Verify that user can add a location to work order from create work order page using location search/lookup which has single associated asset then asset should be auto-populated and reflected on wo details page after clicking the save button

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a valid location l1 and change it's status to operating.
3. Create valid location l2 and change it's status to "Inactive".
4. Create a valid asset and associate with a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section, Click on 3 dots for location field and choose search icon.
4. Search the locations which are present in repository from location lookup.
5. Click on 'Save' button to save the changes.
6. Click on back button and navigate to 'Asset and location' and type the location number to which single asset is already associated.
7. Click on 'Save' button to save the changes.

**Result:**

- User should not be able to search location l2 after search in location lookup.
- User should be able to search location l1 from location search/lookup with location id and description which have only status in Operating and Active status.
- User should be able to search location l1 using barcode/QR code scanning.
- Search results should also consider selected filter options.
- User should be able to see location l1 on the work order details page when save button is clicked.
- The typed location number along with associated asset should automatically be populated in asset field and technician should be able to save the work order.
- Asset and location number should be added and visible on wo details page.
- If location has multiple assets then the asset field should not be autopopulated.

## Scenario 11 - Verify that when user add asset, which has associated location then after clicking the save button, location should also be displayed on wo details page

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a valid asset and associate with a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section and select an asset from asset lookup to which location is already associated.
4. Click on 'Save' button to save the changes.

**Result:**

The selected asset number along with associated location should automatically be populated in location field and technician should be able to save the work order.

## Scenario 12 - Verify that when user type asset number, then location should be auto-populated and reflected on wo details page after clicking the save button

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a valid asset and associate with a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Click on create new work order and enter details.
4. Go to 'Asset and location' and type the asset number.
5. Click on 'Save' button to save the changes.

**Result:**

- The typed asset number along with associated location should automatically be populated in location field and technician should be able to save the work order.
- Asset and location number should be added and visible on wo details page.

## Scenario 13 - Verify that when there is data provided for asset and location, user can see the asset/location IDs and descriptions, after user clicks the save button

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Create a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section and add a valid asset through asset lookup to which location is already associated.
4. Click on 'Save' button to save the changes.

**Result:**

Technician should be able to view the added asset/location IDs and descriptions on work order details page after saving the work order.

## Scenario 14 - Verify that user can add a location and asset together to work order from create work order page

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Create a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section and add a valid asset and valid location using asset and location search/lookup.
4. Click on 'Save' button to save the changes.

**Result:**

Technician should be able to view the added asset/location IDs and descriptions on work order details page after saving the work order.

## Scenario 15 - Verify system message is displayed when user selects the location which is not associated with that asset from create work order page

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Create a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section and select an asset from asset lookup which has location linked to it.
4. Change the location field value by selecting some other location from the location lookup.
5. Click on 'Save' button to save the changes.

**Result:**

System message "BMXAA4721E - The specified location does not contain the current asset. Do you want to remove the current asset from the work order? If you do not want to apply changes to the location or asset, click Close." should be displayed to technician.

- Case 1: Clicking on Yes, should remove the asset value and save the record according to new location.
- Case 2: Clicking on No, should update the location and asset which was selected.
- Case 3: Clicking on Close, should not update location and original value of asset and location is saved.

## Scenario 16 - Verify system message is displayed when user selects the asset which is not associated with that location from create work order page

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Create a location and change its status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Go to 'Asset and location' section and select a location from location lookup which has asset linked to it.
4. Change the asset field value by selecting some other asset from the asset lookup.
5. Click on 'Save' button to save the changes.

**Result:**

System message "BMXAA4722E - The specified asset is not in the current location. Do you want to update the location with this asset's location - xxxx? If you do not want to apply changes to the location or asset, click Close." should be displayed to technician.

- Case 1: If technician clicks on 'Yes' button then location should also updated accordingly to new asset.
- Case 2: If technician clicks on 'No' button then only asset should be updated.
- Case 3: If technician clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 17 - Verify when user enter the invalid asset/location value in asset field then error message is displayed

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on 9 dots and click on "+" icon on top right corner to create new work order.
3. Go to 'Asset and location' section and enter invalid asset value in asset field.
4. Verify error message for asset and user should not be able to save work order.
5. Go to 'Asset and location' section and enter invalid location value in location field.
6. Verify error message for location and user should not be able to save work order.

**Result:**

- Error message "Asset "xxxx" is not a valid asset, or its status is not an operating status. (BMXAA0090)" should be displayed.
- Error message "Location XXXXXXXX is not a valid location. (BMXAA2661)" should be displayed.

## Scenario 18 - Verify 'Reported by', 'Reported on' and 'contact' fields are reflected on WO Details page

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. nder responsibility section, enter the details for reported by,reported on and contact. 
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the Technician
2. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
3. Verify the 'Reported By', 'Reported on' and contact fields display the values entered on the work order.

**Result:**

'Reported By', 'Reported on' and contact fields should display the values entered on the work order.

Note- Labor and Reported by details can be different as well. 

## Scenario 19 - Verify technician is taken to the work order details screen instead of the work order list on interaction with navigator

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create an asset and associate with the work order.
4. Assign WO to technician user.
5. Add assignments for labor and approve WO.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite setup/steps in WO List and click it to open WO Details.
4. Click on edit icon to edit work order.
5. Make some changes to the existing fields in work order but don't click on save.
6. Click on nine dot navigation menu.
7. Click on "My Schedule" tile.
8. Verify save/discard prompt is displayed.
9. Click on discard button.
10. Verify technician is navigated to WO Details page and not WO list page.

**Result:**
Technician should be navigated to the work order details screen instead of the work order list on interaction with navigator

## Scenario 20 - Verify that all newly created work order should be shown in 'Work created by me' view

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to created Work order page.
6. Add values to Priority, Work order description, Long description, Scheduled Start, Scheduled finish, Estimated duration, Work type, Asset and location fields.
7. Click on Save button to create a new work order and page navigate to newly created work order details page.
8. Click on back button.
9. Select the "Work created by me" from dropdown.
10. Check the newly created work order in 'Work created by me' view.

**Result:**

Newly created work order should be shown in 'Work created by me' view.

## Scenario 21 - Verify work order can be created without entering any data on create work order page after clicking on 'Save' button and work order status should always be 'Waiting on approval (WAPPR)'

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to created Work order page and don't add any values in the fields.
6. Click on Save button to create a new work order and page navigate to newly created work order details page.

**Result:**

- Work order should be created without any data with temporary id.
- Place holders should be displayed for all fields for which data is not provided.
- Newly created work order status should always be 'Waiting on approval (WAPPR)'.

## Scenario 22 - Verify on configuring maximo default timezone in classic and device then work order create default date and time appears as set timezone

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Click on profile icon.
3. Click on default information.
4. Enter Timezone eg : US/Arizona.
5. Click on OK/Sve button.
6. Set Mobile device timezone as US/Arizona.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on '+' icon and create a new WO.
5. Enter Scheduled start and end date then verify time will be selected by default as per the set timezone.

**Result**
Time should be selected by default as per the current time zone configured in the device for schedule start and end .

## Scenario 23 - Verify newly created work order should display Reported By field with Display name of the Current User on WO details page

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to created Work order page.
6. Add values to Priority, Work order description, Long description, Scheduled Start, Scheduled finish, Estimated duration, Work type, Asset and location fields.
7. Click on Save button to create a new work order and page navigate to newly created work order details page.
8. Check Reported By field value at the bottom of details page.

**Result:**

Newly created work order should display Reported By field value as Display name of the current user and Reported date field value as 'Current System Date/Time'.

## Scenario 24 - Verify that technician shouldn't be able to insert tasks, planned labor and materials or tools on newly created work order

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to created Work order page.
6. Check that technician isn't able to insert tasks, planned labor and materials or tools.

**Result:**

Technician shouldn't be able to insert tasks, planned labor and materials or tools on newly created work order.

## Scenario 25 - Verify that on container a temporary number will be used to reference the work order and once this work order is transmitted to the server, a new and permanent work order number will be created

**Steps:**

1. Login to Maximo mobile app with the Technician on device.
2. Click on nine dot navigation menu.
3. Click on the 'Create work button' on navigator page.
4. Navigate to created Work order page.
5. Add values to Priority, Work order description, Long description, Scheduled Start, Scheduled finish, Estimated duration, Work type, Asset and location fields.
6. Click on Save button to create a new work order and page navigate to newly created work order details page.
7. Check and record the temporary work order id and their description.
8. Sync the work order to the server to get the permanent work order number.
9. Check the WO isn't shown in 'Work created by me' filter.
10. Go to classic and search the created order with their description.
11. Add labor to newly created WO and change the status to Approved.
12. Check the permanent assigned work order number in 'Assigned work' filter.

**Result:**

On container a temporary number should be used to reference the work order and once this work order synced to the server, a permanent work order number should be assigned and that number should be searched under 'Assigned work' filter.

**Note:**

The above steps should be for both offline/online mode.

## Scenario 26 - Verify asset failure code, asset priority and location GL account is updated in work order failure code, asset/location priority and GL account, when an asset is added with associated location having location failure code, location priority and GL account

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with GL account GL1, failure code as VPN, location priority as 1, type as operating and change status to active.
3. Create an asset, associate location created in step 2 and change it's status to operating.
4. Select value for "failure class" from the lookup e.g. "Hardware".
5. Add asset priority to 2.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu for asset.
5. Click on search and select asset created in pre-condition steps from asset lookup.
6. Location should be auto-populated which is same as associated with the selected asset.
7. Click on save button to save the work order.

**Result:**

- Technician should be able to save the work order, asset and location details should be displayed on work order details page.
- On report work page, failure code of work order should be displayed which is same as associated asset failure code.
- Asset priority should be updated in work order asset/location priority field which can be verified in database.
- Location's GL account should be updated in work order GL account field which can be verified in database.

## Scenario 27 - Verify if the selected location contain multiple assets, the asset field in the work order is cleared and while displaying the asset lookup, it should filter the lookup results based on the selected location only

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with GL account, failure code as VPN, location priority as 1, type as operating and change it's status to active.
3. Create an asset, associate it to location created in step 2 and change it's status to operating.
4. Create another asset, associate it to location created in step 2 and change it's status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu for location.
5. Click on search and select location created in pre-condition steps from location lookup.
6. Verify asset field value is not auto-populated.
7. Click on 3 dots menu for asset and click on search.
8. Verify the asset lookup results are filtered based on the selected location.

**Result:**

- Asset field value should not be auto populated as selected location contains multiple assets.
- Asset lookup results should filter based on the selected location and should show the two assets created/associated in pre-condition steps only.
  - Case 1: If technician selects first asset from the asset lookup, the selected asset's failure code and priority should be updated in work order failure code and asset/location priority (It is applicable when those are not null in selected asset, if null then location's failure code and priority are added to work order).
  - Case 2: If technician selects second asset from the asset lookup, the selected asset's failure code and priority should be updated in work order failure code and asset/location priority (It is applicable when those are not null in selected asset, if null then location's failure code and priority are added to work order).
- In both cases, Location's GL account should be updated in work order GL account field which can be verified in database.

## Scenario 28 - Verify system message while updating work order with an asset which is not in the selected location(with GL account)

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with GL account as Gl1, failure code as VPN, location priority as 1, type as operating and change it's status to active.
3. Create an asset, associate it to location created in step 2 and change it's status to operating.
4. Create another location with GL account as Gl2, failure code as Tumble, location priority as 2, type as operating and change it's status to active.
5. Create another asset, associate it to location created in step 4 and change it's status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu for asset.
5. Click on search and select first asset created in pre-condition step 3 from asset lookup.
6. Asset field is populated with selected asset and location field is auto-populated with location associated with selected asset.
7. Change asset field value to second asset created in pre-condition step 5.
8. Click on save button to save the work order.
9. Verify System message is displayed.

**Result:**

- System message "BMXAA4722E - The specified asset is not in the current location. Do you want to update the location with this asset's location - l2? If you do not want to apply changes to the location or asset, click Close" should be displayed.
  - Case 1:
    - a) If technician clicks on 'Yes' button then another system message "BMXAA4510E - The location and asset combination you have entered would default a different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination? Clicking Cancel will return you with no changes" should be displayed and technician clicks on Yes. GL account Gl2 is updated in work order GL account, location should also be updated according to new asset. New asset failure code and asset priority (if not null) should be updated in work order.
    - b) If technician clicks on 'Yes' button then another system message "BMXAA4510E - The location and asset combination you have entered would default a different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination? Clicking Cancel will return you with no changes" should be displayed and technician click on No. GL account remains the same for work order i.e. GL1, location should also be updated according to new asset. New asset failure code and asset priority (if not null) should be updated in work order.
    - c) If technician clicks on 'yes' button then another system message "BMXAA4510E - The location and asset combination you have entered would default a different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination? Clicking Cancel will return you with no changes" should be displayed and and technician clicks on cancel. Change request should be cancelled and pop-up message box should be closed and nothing is updated.
  - Case 2: If technician clicks on 'No' button then asset will be updated to new value and location remains same. New asset failure code and asset priority (if not null) should be updated in work order.
  - Case 3: If technician clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 29 - Verify asset/location failure code and asset/location priority is updated in work order failure code and asset/location priority and GL account
when an asset added doesn't have failure code and asset priority but location associated with asset has location failure code,
 location priority and GL account

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Select value for "failure class" from the lookup e.g. VPN.
4. Add asset priority to 1.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu.
5. Click on search and select asset created in pre-condition steps from asset lookup.
6. Location should be auto-populated which is same as associated with the selected asset.
7. Click on save button to save the work order.

**Result:**

- Technician should be able to save the work order, asset and location details should be displayed on work order details page.
- On report work page, failure code of work order should be displayed which is same as associated asset and location failure code.
- Asset and Location priority should be updated in work order asset/location priority field which can be verified in database.
- Asset and Location's GL account should be updated in work order GL account field which can be verified in database.

## Scenario 30 - Verify system message while updating work order with a location which has associated asset different from the selected asset (selected location contain single or multiple asset)

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with failure code as VPN, location priority as 1, type as operating and change it's status to active.
3. Create an asset, associate it to location created in step 2 and change it's status to operating.
4. Create another location with GL account as Gl2, failure code as Tumble, location priority as 2, type as operating and change it's status to active.
5. Create another asset with failure code, asset priority and associate it to location created in step 4 and change it's status to operating.
6. Create another asset with failure code, asset priority and associate it to location created in step 4 and change it's status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu for location.
5. Click on search and select first location created in pre-condition step 2 from location lookup.
6. Location field is populated with selected location and asset field is auto-populated with asset associated with selected location.
7. Change location field value to second location created in pre-condition step 4.
8. Click on save button to save the work order.
9. Verify System message is displayed.

**Result:**

- System message "BMXAA4721E - The specified location does not contain the current asset. Do you want to remove the current asset from the work order? If you do not want to apply changes to the location or asset, click Close." should be displayed.
  - Case 1:
    - a) If technician clicks on 'Yes' button then work order location should be updated to new selected location. Asset field will be cleared out and location failure code and location priority should be updated in work order.
    - b) If technician clicks on 'Yes' button then work order location should be updated to new selected location. Asset field will be cleared out and location failure code and location priority should be updated in work order. Now select asset from the filtered asset lookup and new asset failure code and asset priority (if not null) should be updated in work order failure code and asset/location priority.
  - Case 2: If technician clicks on 'No' button then location will be updated to new value and asset remains same. Work order failure code and asset/location priority should remain as it is.
  - Case 3: If technician clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.
Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 31 - Verify that in MAS environment, for asset attribute, Identify option (camera) is displayed on mobile devices and camera opens when technician clicks on the "Identify" option (camera)

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
5. Verify "Identify" option is displayed.
6. Click on "Identify" option (camera).
7. Verify that mobile device camera opens.

**Result:**

"Identify" option should be displayed next to "Asset" field on create work order page and mobile device camera should open when technician clicks on the "Identify" option (camera).

## Scenario 32 - Verify that "Identify" option (camera) is disabled in Maximo EAM environment

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
5. Verify "Identify" option (camera) is disabled.

**Result:**

Identify option (camera) should be disabled on Maximo EAM environment.

## Scenario 33 - Verify asset attribute is populated in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset and viceversa

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
5. Click on "Identify" option (camera).
6. Verify asset attribute is populated in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset.
7. Click on "Identify" option (camera).
8. Verify "No results found" is displayed, if "Identify" (camera) is unable to identify the scanned asset.

**Result:**

- The asset attribute should be populated in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset.
- "No results found" should be displayed, if "Identify" (camera) is unable to identify the scanned asset.

## Scenario 34 - Verify that "Identify" option (camera) is unavailable for "Location" attribute

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
5. Verify "Identify" option (camera) is unavailable.

**Result:**

"Identify" option (camera) should be unavailable for "Location" attribute.

## Scenario 35 - Verify that mobile device camera opens to scan asset using barcode or QR code when technician clicks on the "Scan" button

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
5. Verify "Scan" option/button is displayed.
6. Click on "Scan" option/button.
7. Verify that mobile device camera opens.

**Result:**

Mobile device camera should open to scan asset using barcode or QR code when technician clicks on the "Scan" button.

## Scenario 36 - Verify "Asset" field is populated with scanned asset information if barcode/QR code scanner identifies the scanned asset and viceversa

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
5. Click on "Scan" option/button and scan a valid asset.
6. Verify "Asset" field is populated with scanned asset information if barcode/QR code scanner identifies the scanned asset.
7. Click on "Scan" option/button and scan an invalid asset.
8. Verify scanner times out and "Asset" field is not populated or changed if barcode/QR code scanner is unable to identify the scanned asset.

**Result:**

- The "Asset" field should be populated with scanned asset information if barcode/QR code scanner identifies the scanned asset.
- Scanner should time out and "Asset" field should not be populated or changed if barcode/QR code scanner is unable to identify the scanned asset.

## Scenario 37 - Verify that mobile device camera opens to scan location using barcode or QR code when technician clicks on the "Scan" button

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
5. Verify "Scan" option/button is displayed.
6. Click on "Scan" option/button.
7. Verify that mobile device camera opens.

**Result:**

- Scan button should be displayed to scan location using barcode or QR code for populating "Location" field on "Create work order" page.
- Mobile device camera should open to scan location using barcode or QR code when technician clicks on the "Scan" button.

## Scenario 38 - Verify "Location" field is populated with scanned location information if barcode/QR code scanner identifies the scanned location and viceversa

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
5. Click on "Scan" option/button and scan a valid location.
6. Verify "Location" field is populated with scanned location information if barcode/QR code scanner identifies the scanned location.
7. Click on "Scan" option/button and scan an invalid location.
8. Verify scanner times out and "Location" field is not populated or changed if barcode/QR code scanner is unable to identify the scanned location.

**Result:**

- The "Location" field should be populated with scanned location information if barcode/QR code scanner identifies the scanned location.
- Scanner should time out and "Location" field should not be populated or changed if barcode/QR code scanner is unable to identify the scanned location.

## Scenario 39 - Verify that "Create work order +" menu button is either disabled or hidden when technician taps on '+' button and technician do not have permission for "Create New Work Order"(CREATENEWWO) sig option

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Create New Work Order"(CREATENEWWO) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Create New Work Order"(CREATENEWWO) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Tap on "9 dot" icon on Navigator.
3. Tap on '+' button.
4. Verify that "Create work order +" menu button is disabled or hidden.

**Results:**

The "Create work order +" menu button should be either disabled or hidden when technician taps on '+' button and technician do not have permission for "Create New Work Order"(CREATENEWWO) sig option.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 40 - Verify created work orders are reflected after clicking 'Check for updates' button when techncian switches from offline to online mode

**Steps:**

1. Login to Maximo mobile app with the Technician in offline mode.
2. Click on 9 dots and click on "+" icon on top right corner.
3. Click on create new work order and enter details.
4. Now, turn on the device internet (online mode).
5. Verify that the data should be automatically synched when switched online.
5. Click on 'Check for updates' button.
6. Verify WO/data is fetched and synced properly and user will be able to search WO.

**Result:**
- The WO/data should be automatically synched when switched from offline to online.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 41 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and all fileds are displaying as per the approved design

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to newly created Work order page.
6. Verify UI of the new page for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and displaying as per approved design for this functionality.

**Result:**

- UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design approved.
- There should be no UI related issues.
- Smart Input version of the components should be used.

## Scenario 42 - Verify all the above test cases in online and offline/disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in online and offline/disconnected mode on mobiles/tablets and other devices.
