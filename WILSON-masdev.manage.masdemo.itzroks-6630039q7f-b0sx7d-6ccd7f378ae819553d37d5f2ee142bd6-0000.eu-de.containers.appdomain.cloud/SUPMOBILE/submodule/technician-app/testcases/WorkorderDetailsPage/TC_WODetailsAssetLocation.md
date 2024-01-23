# View primary, multi-asset/location information, multi-asset/location meter touch point on work order details page

These test cases will verify the asset and location functionality and multi-asset/location meter touch point on 'Work order details' page on Technician web app, online and offline mode on mobile containers. It will also verify switching from technician app to asset manager app in order to view asset information and returning to technician functionality.

These test cases will cover functionalities of following user stories:

- GRAPHITE-13434: Eli can see summary asset details on his work order
- GRAPHITE-31655: Eli can view multiple assets on a work order
- GRAPHITE-36364: [Split-testing only] Eli can view multiple assets on a work order
- GRAPHITE-33216: Eli can view multiple locations on a work order
- GRAPHITE-33288: Eli can open inspections from multi-asset/location work orders
- GRAPHITE-33360: Eli can mark progress through multi-asset/location work orders
- GRAPHITE-33264: Eli can report meter readings on multi-asset/location work orders
- GRAPHITE-52180: Eli can see the asset Details, launching from Technician or Approvals app

**Design URL:**

- <https://ibm.invisionapp.com/share/FZO0Z3QA72D#/screens/319895286_Multiple_Assets_And_Locations>
- <https://ibm.invisionapp.com/share/DTO041NW43X#/screens/319568403>
- <https://ibm.invisionapp.com/share/K2O046QCSDQ#/screens>
- <https://ibm.invisionapp.com/share/K7O20DANU8B#/screens>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify the Asset and location section on work order details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and a location with this work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify the "Asset and location" section on work order details page.

**Results:**

"Asset and location" section should be displayed when user added asset or location with work order.

## Scenario 2 - Verify the Asset and location description in Asset and location section on Work order details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and a location with this work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify the details of asset and location in "Asset and location" section on work order details page.

**Results:**

Asset and location description should be displayed in "Asset and location" section on work order details page.

## Scenario 3 - Verify the asset "Up/Down" state in Asset and location section if user has attached asset with work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset with this work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify the "Up/Down" state in Asset and location section.

**Results:**

When asset is up, the arrow should points up and when the asset is down, the arrow points down. If there is no asset on the WO, then asset "Up/Down" state is not displayed.

## Scenario 4 - Verify "asset and location" section if user doesn't add any asset and location with work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Check asset and location on work order details page.

**Results:**

"Asset and location" section should not be displayed when user hasn't added any asset and location with work order.

## Scenario 5 - Verify the asset and location section on technician when added asset and location are removed from work order in Maximo classic

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and a location with this work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Go to Maximo classic and remove the added asset and location from the work order.
5. Verify asset and location information displayed on the work order details page.

**Results:**

Asset and location section on the work order details page will be removed on UI only after clicking "Check for updates" button on wo list page.

## Scenario 6 - Verify the image area when asset image is not added with asset

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset without image with this work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Check image area in "Asset and location" section on work order details page.

**Results:**

Image component should be displayed with image placeholder.

## Scenario 7 - Verify that asset image is displayed and there are no performance issues on WO details page in case of image size is large

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset with a large image and a location with this work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Check image area in "Asset and location" section on work order details page.

**Results:**

Asset image should be loaded properly and there should be no performance issues on WO details page.

## Scenario 8 - Verify that all multi asset records which are added to work order are displayed on wo details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Check the multiple asset records list on work order details page.

**Results:**

- All multi asset records which are added to work order are displayed under Asset and location section on wo details page.
- Asset icon, Asset ID and Asset description should be displayed in header of each multi asset record.
- If Asset Description is not provided then only Asset icon and Asset ID will be displayed.

## Scenario 9 - Verify that all multi location records which are added to work order are displayed on wo details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi location records without asset with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Check the multiple location records list on work order details page.

**Results:**

- All multi location records which are added to work order are displayed under Asset and location section on wo details page.
- Location icon, Location ID and Location description should be displayed in header of each multi location record.
- If Location Description is not provided then only Location icon and Location ID will be displayed.

## Scenario 10 - Only primary asset and location section is displayed and no multi asset/location data available when there are no multi asset or multi location records added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and location and make sure no multi asset or multi location records are added with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.

**Results:**

Only primary asset and location section should be displayed with asset and location information and no multi asset/location data should be displayed.

## Scenario 11 - Verify location information in each multi asset record when multi asset records with location are added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi assets with location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify the location information for each multiple asset record on work order details page.

**Results:**

- Location details (Location ID and location description) should be displayed when user expand each multiple asset record.
- Placeholder should be displayed for location which do not have location description.

## Scenario 12 - Verify location information in each multi asset record when multi asset records without location are added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset records without location information with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify the location information for each multiple asset record on work order details page.

**Results:**

Placeholder should be displayed for location ID and location description for each multi asset record without location information on work order details page.

## Scenario 13 - Verify asset information in each multi location record which are added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi location records without asset information with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify the asset information for each multi location record on work order details page.

**Results:**

Placeholder should be displayed for asset ID and asset description for each multi location record on work order details page.

## Scenario 14 - Verify "asset and location" section is displayed, when only asset or location is associated to the work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new asset and location.
4. Create a new work order.
5. Associate either asset or location to the work order.
6. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify "asset and location" section is displayed with respective associated asset or location information.

**Results:**

- "Asset and location" section should be displayed on WO details page along with associated asset or location information.
- Placeholder should be displayed for the asset or location which is not associated to the work order.
- Touch-points should be displayed according to the associated asset or location.

## Scenario 15 - Verify work order details page response time when 30-40 multi asset and/or multiple location records are added to work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add 30-40 multi asset records with or without location information and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Scroll the multi asset and multi location records or entire work order details page.

**Results:**

All multi asset/location records and/or entire work order details page should be loaded quickly.

## Scenario 16 - Verify scroll bar is displayed in multi asset/location so that all multi asset/location records are displayed within fix height and page is not required to scroll to see other sections

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify scroll bar is displayed in multi asset/location when multiple records are added to work order.

**Results:**

Scroll bar should be displayed in multi asset/location so that all multi asset/location records are displayed within fix height and page is not required to scroll to see other sections.

## Scenario 17 - Verify that all multi asset and/or multi location records are displayed in sequence/order they were added/displayed in Maximo classic

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify that all multi asset and/or multi location records are displayed in sequence/order they were added/displayed in Maximo classic.

**Results:**

All multi asset and/or multi location records should be displayed in sequence/order they were added/displayed in Maximo classic.

## Scenario 18 - Verify that Mark complete with a check-mark button is displayed on each multi asset and/or multi location record to mark progress

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify that Mark complete with a check-mark button is displayed on each multi asset and/or multi location record to mark progress.

**Results:**

- Mark complete with a check-mark button should be displayed on each multi-asset/location record to mark progress when the multi-asset/location record is expanded.
- First incomplete multi-asset/location record should be expanded automatically.

## Scenario 19 - Verify the changes and functionality when technician taps on Mark complete button on a multi-asset/location record

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Tap on Mark complete button on any multi-asset/location record.
5. Verify the changes and functionality on the multi-asset/location record.

**Results:**

- The next incomplete multi-asset/location record should be expanded automatically.
- It should set MULTIASSETLOCCI.PROGRESS=1 for that multi-asset/location record.
- It should close/collapse that multi-asset/location record.
- It should add a green check-mark next to the asset/location icon on the header of that multi-asset/location record.
- The mark complete button should change to Undo button on that multi-asset/location record.

## Scenario 20 - Verify the changes and functionality when technician taps on Undo button on a multi-asset/location record

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Tap on Mark complete button on any multi-asset/location record.
5. Expand that multi-asset/location record and tap on undo button.

**Results:**

- The first incomplete multi-asset/location record should be expanded.
- It should set MULTIASSETLOCCI.PROGRESS=0 for that multi-asset/location record.
- It should close/collapse that multi-asset/location record, if it is not first incomplete multi-asset/location record.
- It should remove green check-mark displayed next to the asset/location icon on the header of that multi-asset/location record.
- The Undo button should change to Mark complete button on that multi-asset/location record.

## Scenario 21 - Verify if there is an inspection form assigned to a multi asset/location record, the inspection touch-point is displayed on that record

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an inspection form and make it active.
3. Go to work order tracking application.
4. Create a new work order.
5. Add multi asset and/or multi location records with work order and associate inspection to it.
6. Add assignments for labor which has inspection application access along with technician access and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify an inspection touch-point is displayed for all multi asset/location records having associated inspection form.

**Results:**

Inspection touch-point should be displayed for all multi asset/location records having associated inspection form.

## Scenario 22 - Verify user is able to navigate to inspection page, when user click on inspection touch-point, if there is an inspection assigned to a multi asset/location record

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an inspection form and make it active.
3. Go to work order tracking application.
4. Create a new work order.
5. Add multi asset record with work order and associate inspection to it.
6. Add assignments for labor which has inspection application access along with technician access and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on inspection touch-point and verify after clicking on it, user is navigated to inspection form page.

**Results:**

User is navigated to inspection form page and inspection form is displayed.

## Scenario 23 - Verify user is able to navigate back to work order details page when user clicks on back arrow/button on inspection page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an inspection form and make it active.
3. Go to work order tracking application.
4. Create a new work order.
5. Add multi asset record with work order and associate inspection to it.
6. Add assignments for labor which has inspection application access along with technician access and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Click on inspection touch-point and user is navigated to inspection form page.
5. Click on back arrow/button on inspection page.
6. Verify user is navigated back to work order details page.

**Results:**

User is navigated back to work order details page successfully.

## Scenario 24 - Verify if technician user doesn't have access to inspection application then user will not see inspection touch-point on the multi asset/location record even though inspection is attached to multi asset/location record

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an inspection form and make it active.
3. Go to work order tracking application.
4. Create a new work order.
5. Add multi asset record with work order and associate inspection to it.
6. Add assignments for labor which has technician access only and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify inspection touch-point is not displayed on multi asset rows even when multi assets has inspection associated with them.

**Results:**

Inspection touch-point should not be displayed to user on multi asset rows.

## Scenario 25- Verify the meters touch-point is displayed when an asset with meters is added as multi-asset to work order

**Pre-condition:**

1. Create asset and associate meters to it.
2. Create a work order and associate the created asset to multiple asset/location section.
3. Add assignments for labor which has technician access only and approve the WO.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Click on search and Search the created work order.
4. Click on work order and user is navigated to work order details page.
5. Go to Asset and Location section.
6. Verify the meters touch-point is displayed on asset record in multiple asset/location data list section.
7. Click on meters touch-point on the asset.
8. Verify sliding drawer opens.

**Results:**

- Technician should be able to view meters touch-point icon on the multi asset/location record.
- When clicked on meter touch point, Technician should be able to open sliding drawer.

## Scenario 26 - Verify the meters touch-point is displayed when meters are associated to location (not asset) in multiple asset/location section and also verify sliding drawer opens when clicked on meter touch point

**Pre-condition:**

1. Create location and associate meters to it.
2. Create a work order and associate the created location to multiple asset/location section.
3. Add assignments for labor which has technician access only and approve the WO.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Click on search and Search the created work order.
4. Click on work order and user is navigated to work order details page.
5. Go to Asset and Location section of WO.
6. Verify the meters touch-point is displayed on location record on multiple asset/location data list section.
7. Click on meters touch-point on location record.
8. Verify sliding drawer opens.

**Results:**

- Technician should be able to view meters touch-point on the location in asset/location section of WO details page.
- When clicked on meter touch point, Technician should be able to open sliding drawer.

## Scenario 27 - Verify the meters touch-point is displayed, When assets and locations with meters are added to work order

**Pre-condition:**

1. Create asset & location and associate meters to these.
2. Associate the asset and location as well.
3. Create a work order, add the created asset & location to the work order on multiple asset/location section.
4. Add assignments for labor which has technician access only and approve the WO.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Click on search and Search the created work order.
4. Click on work order and user is navigated to work order details page.
5. Go to Asset and Location section of WO in work order details page.
6. Verify the meters touch-point is displayed in asset of WO details page.
7. Click on meters touch-point in asset/location section and Verify sliding drawer opens.

**Results:**

- Technician should be able to view meters touch-point icon is displayed on the location in asset/location section of WO details page.
- When clicked on meter touch point, Technician should be able to open sliding drawer.

## Scenario 28 - Verify the meters touch-point is not displayed when no meter is added to asset-location which are added as multi-asset/location to work order

**Pre-condition:**

1. Create asset and do not associate meters to it.
2. Goto Work order application.
3. Goto multiple asset/location section and click on new row and add the created asset.
4. Add assignments for labor which has technician access only and approve the WO.

**Steps:**

1. Login as technician assigned to work order.
2. Click on the "My Schedule".
3. Click on search and Search the created work order.
4. Click on work order and user is navigated to work order details page.
5. Go to Asset and Location section of WO in work order details page.
6. Verify the meters touch-point is not displayed in Assets and Location section of WO details page.

**Results:**

Technician will not be able to view meters touch-point icon on the asset in asset/location section of WO details page.

## Scenario 29 - Verify that UI is displayed as per design for all multi asset/location records

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset/location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.
4. Verify font, font size, color, style and rendering of the UI.

**Results:**

Rendered UI should match with the UI design of the multi asset/location records on work order details page.

## Scenario 30 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add multi asset and/or multi location records with work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click to open wo details page.

**Results:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.

## Scenario 31 - Verify that the meter touch-point functionality for each multi asset/location record on wo details page

**Pre-condition:**

As per pre-condition for each scenario in file TC_WODetailsAssetLocationMeters.md

**Steps:**

As per steps in each scenarios in file TC_WODetailsAssetLocationMeters.md

**Results:**

For each multiple asset and location record which has meter added to it run each and every scenario in file TC_WODetailsAssetLocationMeters.md

## Scenario 32 - Verify that right chevron is displayed on "Asset and location" section on WO details when asset details of primary asset associated with work order are already downloaded/available in mobile app and technician user has access to Asset manager app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an asset and change status to Active/Operating.
3. Add a service address, parent asset, asset image and classification/specifications to asset, if required.
4. Go to work order tracking application.
5. Create a new work order and associate the created asset to it.
6. Add assignments for labor who has Asset manager app access along with technician access and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with work technician and wait for support data to be downloaded.
2. Click on "My Schedule" tile in 9 dot menu to open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Verify that right chevron is displayed on "Asset and location" section on WO details.

**Results:**

- A right chevron should be displayed on "Asset and location" section on WO details when asset details of primary asset associated with work order are already downloaded/available in the mobile app and technician user has access to Asset manager app.
- If asset details of primary asset associated with work order is not already downloaded/available in mobile app and/or technician doesn't have access to Asset manager app then right chevron will not be displayed on "Asset and location" section.

**Note:**

Perform the scenario on Approvals app on WO details for a supervisor user having access to Asset manager app.

## Scenario 33 - Verify that technician navigates to Asset details in Asset manager app to view more information of work order asset when technician taps on right chevron displayed on "Asset and location" section on WO details

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an asset and change status to Active/Operating.
3. Add a service address, parent asset, asset image and classification/specifications to asset, if required.
4. Go to work order tracking application.
5. Create a new work order and associate the created asset to it.
6. Add assignments for labor who has Asset manager app access along with technician access and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with work technician and wait for support data to be downloaded.
2. Click on "My Schedule" tile in 9 dot menu to open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on the right chevron, displayed on "Asset and location" section on WO details.
5. Verify that technician navigates to Asset details in Asset manager app to view more information of work order asset.

**Results:**

- Technician should navigate to Asset details in Asset manager app to view more information of work order asset.
- The asset name, asset description, asset image, parent asset, service address, classification and specifications information should be correct and matches with the primary asset associated with the work order in technician app.

**Note:**

Perform the scenario on Approvals app on WO details for a supervisor user having access to Asset manager app.

## Scenario 34 - Verify that technician navigates back to WO details of same work order in technician app when technician taps on back arrow/button on Asset details in Asset manager app

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create an asset and change status to Active/Operating.
3. Add a service address, parent asset, asset image and classification/specifications to asset, if required.
4. Go to work order tracking application.
5. Create a new work order and associate the created asset to it.
6. Add assignments for labor who has Asset manager app access along with technician access and approve the work order.

**Steps:**

1. Launch the Maximo Mobile with work technician and wait for support data to be downloaded.
2. Click on "My Schedule" tile in 9 dot menu to open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on the right chevron, displayed on "Asset and location" section on WO details to navigate to Asset details in Asset manager app.
5. Click on back arrow/button on Asset details.
6. Verify that technician navigates back to WO details of same work order in technician app.

**Results:**

The technician should navigate back to WO details of same work order in technician app when technician taps on back arrow/button on Asset details in Asset manager app.

**Note:**

Perform the scenario on Approvals app on WO details for a supervisor user having access to Asset manager app.
