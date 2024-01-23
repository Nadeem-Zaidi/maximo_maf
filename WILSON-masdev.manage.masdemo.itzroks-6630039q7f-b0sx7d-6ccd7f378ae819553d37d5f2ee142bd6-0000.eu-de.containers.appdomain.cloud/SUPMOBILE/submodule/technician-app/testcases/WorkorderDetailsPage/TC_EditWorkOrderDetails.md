# Edit work order details functionality on 'Work order details' page

These test cases will verify edit work order details functionality on 'Work order details' page on Technician web app, online and offline mode on mobile containers and the below mentioned test cases will cover the functionalities of following stories.

- Graphite-34759: Eli can see existing work order details of records he is about to edit
- Graphite-35297: Eli can see the edit icon on work order details
- Graphite-35594: Eli can see an asset/location on a work order to be edited
- Graphite-9510: Eli can edit work order details
- Graphite-37378: Eli can only update asset and location based on work plan edit rules
- Graphite-33670: Eli can specify an asset and location on a work order
- GRAPHITE-42428: Eli, when creating or editing a WO, wants to select Asset from a list/lookup
- GRAPHITE-42451: Eli, when creating or editing a WO, wants to select Locations from a list/lookup
- GRAPHITE-43175: When selecting an asset or location, Eli needs to confirm and update related information
- GRAPHITE-43228: Eli, when using MAS, should be able to use parts identification to find ASSETs
- GRAPHITE-43205: Eli should be able to scan and populate asset/location attribute
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-50896: Keep the WO number visible after pressing the "Edit" button inside a Work Order on the App
- GRAPHITE-44632: Add vendor and serial number in the asset lookup attribute

**Design URL:**

- <https://ibm.invisionapp.com/share/A9O0VW2DXEQ#/screens/319858582_Create-Edit_Work_Order>
- <https://ibm.invisionapp.com/d/main#/console/15363156/320158344/preview>
- <https://ibm.invisionapp.com/share/SBO0TZIZKY5#/screens/319836253_Selecting_Asset_And_Location>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify availability of edit icon button on work order details page and verify that clicking on the edit icon on work order details page new page is opened so that user can edit work order details

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add description, Long description, Priority, scheduled start and scheduled finish, Work type, Estimated duration,Asset and location to the work order.
4. Add a planned Labor to the work order.
5. Save the work order.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3.  Search for the newly created Work order in WO list and click on it to open WO details.
4. Verify the availability of edit icon button on Work order details page.
5. Click on edit icon in work order details page open a new page.
6. Verify a new page is opened.

**Result:**

- 'Edit icon' button should be available on work order details page.
- Technician should view placeholder values for priority, scheduled start, scheduled finish, work type, Asset and Location when there are no predefined values.
- When clicked on edit icon button on work order details page, A new page is opened and user can edit the fields in work order edit page.
- Work order number should be displayed with 'Edit work order' text as header/title of the edit work order page and is in read-only mode.
- Ellipsis should be displayed in the header with work order number and 'Edit work order' text as header/title on edit work order page when there is less space and there should be no text cut from sides.
- Description, Long description, Priority, scheduled start and scheduled finish, Work type, Estimated duration, Asset and Location should be editable.

**Note:**

To check placeholder values, craete a work order and don't add any values apart from description and verify the design.

## Scenario 2 - Verify the selected work type value is highlighted in work type lookup when the lookup is opened while editing the work type field and also after save operation is performed indicating that it is current value

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add Description, Long description, Priority, scheduled start and scheduled finish, Work type, Estimated duration, Asset and Location to the work order.
4. Add a planned Labor to the work order.
5. Save and approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page open a new page.
5. Go to work type attribute and click on chevron to open the work type lookup.
6. Select any work type value from Work type lookup.
7. Verify the selected work type value is highlighted in work type lookup.
8. The selected value is now displayed in work type field.
9. Click on work type in order to open the lookup again and then verify the value selected in previous step is highlighted in lookup.
10. Change/add value to Work type field using work type lookup.
11. Click on Save button to perform the save action and navigate back to WO details page.
12. Go back to work order edit page.
13. Verify work type value which was saved earlier is highlighted in the work type lookup indicating that it is current value.


**Result:**

- Technician should be able to view the selected work type value is highlighted in work type lookup.
- Work type value which was saved should be highlighted in the work type lookup indicating that it is current value.

## Scenario 3 - Verify the error message when work order priority is not a valid priority value between 0 and 999

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page open a new page.
5. Enter the Priority value over 999 or below 0.

**Result:**

" Enter a valid wopriority" error message should be displayed under the priority field.

## Scenario 4 - Verify error message when the scheduled finish is empty/date given is before the scheduled start date in WO edit page

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page open a new page.
5. In scheduled start and scheduled finish date fields enter the dates.
6. Verify the error message when scheduled finish date is not given.
7. Verify the error message when user specifies the scheduled finish date value before the scheduled start date.
8. Verify the error message when user specifies the scheduled start date value after the scheduled finish date.

**Result:**

"The start date must be before the finish date" error message should be displayed under the scheduled start field.

## Scenario 5 - Verify the 'Save' button is displayed in blue color with a check icon on work order details edit page in web

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page open a new page where user can edit the WO attributes.
5. Verify 'Save' button is displayed in blue color with a check icon in web.
6. For mobile, no blue checkmark is displayed. Tick icon is displayed to save the work order

**Result:**

'Save' button should be displayed in blue color with a check icon for web.

## Scenario 6 - Verify 'Save' button becomes disabled when there is a client side error message

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open a new page where user can edit the WO attributes.
5. Enter the invalid data in work order fields to generate client side error message.
6. Verify 'Save' button becomes disabled when there is a client side error message.

**Result:**

'Save' should be disabled when there is a client side error message.

## Scenario 7 - Verify the user can save the WO edit page with the new edits and when save action is performed, User is returned to the WO details view and the page is refreshed with the new data

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open a new page where user can edit the WO attributes.
5. Change/add values to Priority, Work order description, Long description, scheduled Start, scheduled finish, Estimated duration, Work type, Asset and location fields.
6. Click on Save button.

**Result:**

- Technician should be able to save the WO edit page with the new values.
- Technician should be navigated back to the WO details view with the page refreshed with the new data.

## Scenario 8 - Verify all the edits/changes made on the WO edit page are reflected on the work order details page

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page open a new page where user can edit the WO attributes.
5. Change/add values to Priority, Work order description, Long description, scheduled Start, scheduled finish, Estimated duration, Work type, Asset and Location fields.
6. Click on Save button to perform the save action and navigate back to WO details page.
7. Verify the Priority, Work order description, Long description, scheduled Start, scheduled finish, Estimated duration, Work type, Asset and Location values are modified as per the new changes.

**Result:**

Technician should be able to view Priority, Work order description, Long description, scheduled Start, scheduled finish, Estimated duration, Work type, Asset and Location values are modified/changed in WO details page.

## Scenario 9 - Verify that on the edit work order page, Technician can view and edit asset and location associated to the work order under Asset and Location section

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order with asset and location.
3. Add a planned Labor (Eli) to the work order.
4. Save the work order.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page open a new page where user can edit the WO attributes.
5. Verify Technician is able to view the asset and location on edit work order page.
6. Verify Technician is able to view the asset/location IDs and descriptions on edit work order page.
7. Verify Technician is able to view the placeholder text: Asset number and/or Location number on edit work order page when there is no asset or location.

**Result:**

- Technician should be able to see the existing values of asset and location on edit work order page.
- Technician should be able to edit/update asset and location value by entering asset and location, using asset and location search and barcode scanning.
- Technician should be able to view the water mark text: Asset number and/or Location number in their respective text boxes on edit work order details page.

## Scenario 10 - Verify that if the work order status is in a status allowed by WpEditSetting whereby either the asset or location can be changed

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order with asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open a new page where user can edit the WO asset and location attributes.
5. Verify that technician is able to view the asset/location text box in editable mode and can be edited/updated.

**Result:**

- Technician should be able to see the asset and location fields in editable mode and can be edited/updated.
- Technician should able to see the 3 dots and should be able to search the asset/location through filter the lookup or by scanning the barcode.

## Scenario 11 - Verify that if the work order status is in a status doesn't allowed by WpEditSetting whereby then the asset and location textbox field are in read only mode

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select "workorder options" from left panel and then select edit rules.
3. Uncheck the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status) if they are selected.
4. Create a work order with asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open a new page where user can edit the WO attributes.
5. Verify that technician is able to view the asset/location text box in read only mode and can't be edited/updated.

**Result:**

Technician should be able to see the asset and location field in read only mode and can't be edited/updated.

## Scenario 12 - Verify that user will get the system message if try to update the asset when asset and location are already associated with work order

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order with asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open work order edit page.
5. Go to 'Asset and location' section to update a new asset in asset field.
6. Click on 'Save' button to save the changes.

**Result:**

A pop-up system message "BMXAA4722E - The specified asset is not in current location. Do you want to update the location with this asset's location - XXXXX? If you don't want to apply changes to the location or asset, click close" should be displayed with 'Yes', 'No' and 'Close' buttons.

- Case 1: If user clicks on 'Yes' button then location should also be updated according to new asset.
- Case 2: If user clicks on 'No' button then only asset should be updated.
- Case 3: If user clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.
- Case 4: A system message should be displayed with error message if technician enters invalid asset/location 
Error message for invalid asset- "Asset XXXXX isn't a valid asset, or its status isn't an operating status (BMXAA0090)".
Error message for invalid location- "Location XXXXX isn't a valid location (BMXAA2661)".

## Scenario 13 - Verify different combination for adding asset and locations to edit work order

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order with asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open work order edit page.
5. Go to 'Asset and location' section and update the asset from same location in asset field.
6. Click on 'Save' button to save the changes.
7. Go to 'Asset and location' section and update the asset.Verify that user wouldn't get system message while updating the asset if the previous added asset isn't linked with any location.
8. Click on 'Save' button to save the changes.
9. Verify that user will get the system message if try to update the location when location and asset are already associated with work order.
10. Go to 'Asset and location' section to update a new location in location field.
11. Click on 'Save' button to save the changes.
12. Verify that user will get the system message if in edit rules only Location is allowed to update.
13. Search for the newly created Work order in WO list and click on it to open WO details.
14. Click on edit icon in work order details page to open work order edit page.
15. Go to 'Asset and location' section to update a new location in location field.
16. Click on 'Save' button to save the changes.


**Result:**

- Asset should be updated successfully.
- User should be able to update asset without any system pop-up message (If the previous added asset isn't linked with any location).
- If try to update the location when location and asset are already associated with work order-> A pop-up system message "BMXAA4721E - The specified location doesn't contain the current asset. Do you want to remove the current asset from the work order? If you don't want to apply changes to the location or asset, click close" should be displayed with 'Yes', 'No' and 'Close' buttons.

~ Case 1: If user clicks on 'Yes' button then asset should be removed from the work order according to new location.
~ Case 2: If user clicks on 'No' button then only location should be updated and no changes in asset.
~ Case 3: If user clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

- User will get the system message if in edit rules only Location is allowed to update.A pop-up system message "BMXAA4721E - The specified location doesn't contain the current asset. Do you want to remove the current asset from the work order? If you don't want to apply changes to the location or asset, click close" should be appeared with 'Yes', 'No' and 'Close' buttons.

~ Case 1: If user clicks on 'Yes' button then asset should be removed from the work order according to new location.
~ Case 2: If user clicks on 'No' button then only location should be updated and no changes in asset.
~ Case 3: If user clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 14 - Verify that user can add an asset to work order from edit work order page if there is no asset added in it

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order without asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open work order edit page.
5. Go to 'Asset and location' section and add a valid asset.
6. Click on 'Save' button to save the changes.

**Result:**

User should be able to add an asset to the work order.

## Scenario 15 - Verify that user can add a location to work order from edit work order page if there is no location added in it

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order without asset and location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open work order edit page.
5. Go to 'Asset and location' section and add a valid location.
6. Click on 'Save' button to save the changes.

**Result:**

User should be able to add location to the work order.

## Scenario 16 - Verify that technician can update an asset to work order from edit work order page using search i.e. by searching and filtering with various options displayed such as: Location, Vendor, Serial#, Type and Rotating Item

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order with asset only i.e. no location.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open work order edit page.
5. Go to 'Asset and location' section, Click on 3 dots for asset field and choose search icon.
6. Verify filter icon is displayed and clicking on filter icon, filter options are displayed.
7. Select the Type filter and verify only asset with "IT" value.

**Result:**

- Asset lookup with search icon should be displayed.
- After clicking on search icon, asset list should be displayed along with filter icon.
- Clicking on filter icon should display, various filter options such as: Location, Vendor, Serial#, Type and Rotating Item.
- When user selects any filter, the badge count increments and badge count on filter icon indicates the number of filters applied.
- After selecting the filters and clicking on done button, it should return the search results based on selected filter options.
- After clicking reset button it should clear all the filters applied and when user clicks on Done button, the badge count should be zero on filter icon.

## Scenario 17 - Verify that user can update location on work order from edit work order page using search i.e. by searching and filtering with various options displayed such as: Organization, Site, Status and Type

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Go to organization and select work order options from left panel and then select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status (Here taken example of approved work order status).
4. Create a work order with location only i.e. no asset.
5. Add a planned Labor (Eli) to the work order.
6. Save the work order.
7. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with Technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search for the newly created Work order in WO list and click on it to open WO details.
4. Click on edit icon in work order details page to open work order edit page.
5. Go to 'Asset and location' section, Click on 3 dots for location field and choose search icon.
6. Verify filter icon is displayed and clicking on filter icon, filter options are displayed.
7. Select the type filter and verify only location with "Operating" value.

**Result:**

- Location lookup with search icon should be displayed.
- After clicking on search icon, location list should be displayed along with filter icon below the "done" button.
- Clicking on filter icon should display, various filter options such as: Organization, Site, Status and Type.
- When user selects any filter, the badge count increments and badge count on filter icon indicates the number of filters applied.
- After selecting the filters and clicking on done button, it should return the search results based on selected filter options.

## Scenario 18 - Verify asset failure code and asset priority is updated in work order failure code and asset/location priority, when an asset with asset failure code,
 asset priority and location having location failure code and location priority is assosiated to the work order

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create an asset and change its status to operating.
3. Select value for "failure class" from the lookup e.g. VPN.
4. Add asset priority to 1.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Enter work order description, priority and save the work order.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu for asset.
7. Click on search and select asset created in pre-condition steps from asset lookup.
8. Location should be auto-populated which is same as associated with the selected asset.
9. Click on save button.

**Result:**

- Technician should able to save the work order and updated asset and location details should be displayed on work order details page.
- On report work page, failure code of work order should be displayed which is same as associated asset failure code.
- Asset priority should be updated in work order asset/location priority field which can be verified in database.

## Scenario 19 - Verify location failure code, location priority and location GL account is updated in work order failure code, asset/location priority and GL account when added asset doesn't have failure code and asset priority but location associated with asset has location failure code, location priority and GL account

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with GL account GL1, failure code as VPN, location priority as 1, type as operating and change status to active.
3. Create an asset, associate location created in step 2 and change it's status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Enter work order description, priority and save the work order.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu for asset.
7. Click on search and select asset created in pre-condition steps from asset lookup.
8. Location should be auto-populated which is same as associated with the selected asset.
9. Click on save button to save the work order.

**Result:**

- Technician should be able to save the work order, asset and location details should be displayed on work order details page.
- On report work page, failure code of work order should be displayed which is same as associated location failure code.
- Location priority should be updated in work order asset/location priority field which can be verified in database.
- Location's GL account should be updated in work order GL account field which can be verified in database.

## Scenario 20 - Verify system message while updating work order with a location which has associated asset different from the selected asset (selected location contains multiple assets)

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a location with GL account as Gl1, failure code as VPN, location priority as 1, type as operating and change it's status to active.
3. Create an asset, associate it to location created in step 2 and change it's status to operating.
4. Create another location with GL account as Gl2, failure code as Tumble, location priority as 2, type as operating and change it's status to active.
5. Create another asset with failure code, asset priority and associate it to location created in step 4 and change it's status to operating.
6. Create another asset with failure code, asset priority and associate it to location created in step 4 and change it's status to operating.

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on nine dot navigation menu.
3. Click on the 'Create work'/'+' button on navigator page.
4. Enter work order description, priority and save the work order.
5. Go to 'Asset and location' section and click on 3 dots menu for location.
6. Click on search and select first location created in pre-condition step 2 from location lookup.
7. Location field is populated with selected location and asset field is auto-populated with asset associated with selected location.
8. Click on save button to save the work order.
9. Click on edit icon on work order details page.
10. Change location field value to second location created in pre-condition step 4.
11. Click on save button to save the work order.
12. Verify System message is displayed.

**Result:**

- System message "BMXAA4721E - The specified location does not contain the current asset. Do you want to remove the current asset from the work order? If you do not want to apply changes to the location or asset, click Close." should be displayed.
  - Case 1:
    - a) If technician clicks on 'Yes' button then work order location should be updated to new selected location. Asset field will be cleared out and location failure code and location priority should be updated in work order.
    - b) If technician clicks on 'Yes' button then work order location should be updated to new selected location. Asset field will be cleared out and location failure code and location priority should be updated in work order. Now select asset from the filtered asset lookup and new asset failure code and asset priority (if not null) should be updated in work order failure code and asset/location priority.
  - Case 2: If technician clicks on 'No' button then location will be updated to new value and asset remains same. Work order failure code and asset/location priority should remain as it is.
  - Case 3: If technician clicks on 'Close' button then change request should be cancelled and pop-up message box should be closed.

## Scenario 21 - Verify that in MAS environment, for asset attribute, Identify option (camera) is displayed on mobile devices and mobile device camera opens when technician clicks on the "Identify" option (camera). Also, verify that "Identify" option (camera) is disabled in Maximo EAM environment

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with an asset with image which exists in the system.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
7. Verify "Identify" option is displayed.
8. Click on "Identify" option (camera).
9. Verify that mobile device camera opens.
10. Verify "Identify" option (camera) is disabled when performed smae steps for EAM enviornment.
11. "Identify" option (camera) is unavailable for "Location" attribute.

**Result:**

- "Identify" option should be displayed next to "Asset" field on edit work order details page.
- Mobile device camera should open when technician clicks on the "Identify" option (camera).
- Identify option (camera) should be disabled on Maximo EAM environment.
- "Identify" option (camera) should be unavailable for "Location" attribute.

## Scenario 22 - Verify technician can update asset attribute in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with an asset with image which exists in the system.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
7. Verify technician can update asset attribute in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset.
8. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
9. Click on "Identify" option (camera).
10. Verify "No results found" is displayed, if "Identify" (camera) is unable to identify the scanned asset.

**Result:**

- The asset attribute should be populated in asset field if asset is available in local device and "Identify" (camera) identifies the scanned asset.
- "No results found" should be displayed, if "Identify" (camera) is unable to identify the scanned asset.


## Scenario 23 - Verify that Scan button is displayed to scan asset using barcode or QR code for asset attribute for invalid and valid combinations

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with/without asset and location.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
7. Verify "Scan" option/button is displayed.
8. Click on "Scan" option/button.
9. Verify that mobile device camera opens.
10. Click on "Scan" option/button and scan a valid asset.
11. Verify "Asset" field is populated with scanned asset information if barcode/QR code scanner identifies the scanned asset.
12. Go to 'Asset and location' section and click on 3 dots menu next to "Asset" field.
13. Click on "Scan" option/button and scan an invalid asset.
14. Verify scanner times out and "Asset" field is not populated or changed if barcode/QR code scanner is unable to identify the scanned asset.


**Result:**

- Scan button should be displayed to scan asset using barcode or QR code for populating "Asset" field on work order details page.
- Mobile device camera should open to scan asset using barcode or QR code when technician clicks on the "Scan" button.
- The "Asset" field should be populated with scanned asset information if barcode/QR code scanner identifies the scanned asset.
- Scanner should timeout and "Asset" field should not be populated or changed if barcode/QR code scanner is unable to identify the scanned asset.

## Scenario 24 - Verify that Scan button is displayed to scan location using barcode or QR code for location attribute for valid and invalid combinations

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a work order with/without asset and location.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
7. Verify "Scan" option/button is displayed.
8. Click on "Scan" option/button.
9. Verify that mobile device camera opens.
10. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
11. Click on "Scan" option/button and scan a valid location.
12. Verify "Location" field is populated with scanned location information if barcode/QR code scanner identifies the scanned location.
13. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
14. Click on "Scan" option/button and scan an invalid location.
15. Verify scanner times out and "Location" field is not populated or changed if barcode/QR code scanner is unable to identify the scanned location.

**Result:**

- Scan button should be displayed to scan location using barcode or QR code for populating "Location" field on work order details page.
- Mobile device camera should open to scan location using barcode or QR code when technician clicks on the "Scan" button.
- The "Location" field should be populated with scanned location information if barcode/QR code scanner identifies the scanned location.
- Scanner should time out and "Location" field should not be populated or changed if barcode/QR code scanner is unable to identify the scanned location.

## Scenario 25 - Verify inactive location will not be displayed in location lookup, only Operating and Active location will be displayed

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Go to organization, select work order options from left pane and select edit rules.
3. Check the checkbox of 'Asset' and 'Location' for the required work order status e.g. "Approved".
4. Create a location l1 with "Inactive" Status.
5. Create a location l2 with "Active" Status.
6. Create a location l3 with "Operating" Status.
7. Add assignments for labor.
8. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on edit icon on work order details page.
6. Go to 'Asset and location' section and click on 3 dots menu next to "Location" field.
7. In location lookup, search an inactive location.
8. Verify no search results are displayed.

**Result:**

- Location l1 with "Inactive" status should not be displayed in location lookup.
- Location l2 and l3 should be be displayed in location lookup.

## Scenario 26 - Verify that edit pencil button to edit work order on "WO details" page is either disabled or hidden when technician do not have permission to edit work order

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Edit workorder"(EDITWO) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Edit workorder"(EDITWO) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Verify that edit pencil button to edit work order on "WO details" page is either disabled or hidden.

**Results:**

The edit pencil button to edit work order on "WO details" page should be either disabled or hidden when technician do not have permission to edit work order.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 27 - Verify all the above mentioned asset and location search related business validation test scenarios for scan and/or Identify (camera) options on Asset and Location fields

**Pre-condition:**

Pre-conditions as specified for asset and location search related business validation test scenarios.

**Steps:**

Perform steps as specified for asset and location search related business validation test scenarios.

**Result:**

The application should behave as per expectations for all asset and location search related business validation test scenarios for scan and/or Identify (camera) options on Asset and Location fields.

## Scenario 28 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design

**Steps:**

1. Login to Maximo mobile app with the Technician.
2. Click on "Technician" tile.
3. Click on nine dot navigation menu.
4. Click on the 'Create work button' on navigator page.
5. Navigate to newly created Work order page.
6. Verify UI of the new page for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.

**Result:**

- UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- Smart Input version of the components should be used.

## Scenario 29 - Verify all the above test cases in online and offline/disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in online and offline/disconnected mode on mobiles/tablets and other devices.
