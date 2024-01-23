# Technician can identify features on the map

These test cases will verify the identify feature functionality on the Map. These will cover functionalities of following user story:

GRAPHITE-33916: Eli can identify features on a map

**Design URL:**

<https://ibm.invisionapp.com/share/D8O116HSFJP#/screens/319917596_Identify_Feature>

## Scenario 1 - Verify that 'Identify tool' button is displayed and activated upon tapping

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Verify that 'Identify tool' button is displayed on the tool bar in map view.
5. Click on 'Identify tool' button.
6. Verify that identify mode is activated.

**Results:**

- 'Identify tool' button should be displayed on the tool bar in map view.
- A blue border should be displayed around the map indicating that identify mode is activated.
- All existing displayed overlays should be hidden.
- User should be able to click on any area of the map to activate the identify operation.
- The list of work orders should not be displayed below map when identify mode is activated.

## Scenario 2 - Verify that a blue circle is displayed with the default size of 20 tolerance upon tapping on some area of the map

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on 'Identify tool' button to activate identify mode.
5. Click on some area of the map.
6. Verify that a blue circle is displayed with the default size of 20 tolerance on the map.

**Results:**

A blue circle should be displayed with the default size of 20 tolerance on the map.

## Scenario 3 - Verify that record count and list of features are displayed upon tapping on an area of the map having pins or layers (e.g "WP" icon or "Water Hydrant" icon etc.)

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on 'Identify tool' button to activate identify mode.
5. Click on an area of the map having pins or layers (e.g. "WP" icon or "Water Hydrant" icon etc).
6. Verify that record count and list of features in that area are displayed.

**Results:**

- Records count and list of features should be displayed upon tapping on an area of the map having pins or layers (e.g "WP" icon or "Water Hydrant" icon etc.).
- The Records count on top of the list and number of records in features list should match.
- Each record in the features list should have a short description and ID/Number.
- Each record in the features list should have a '?' icon at the right most end of the record to display feature details.
- A search bar should also be displayed on the top of the list in order to search for a specific record/feature in the list.
- Clicking on some other area of the map having pins or layers should refresh the list with the feature records in that area.

## Scenario 4 - Verify that the search functionality works correctly on the feature list records

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on 'Identify tool' button to activate identify mode.
5. Click on an area of the map having pins or layers (e.g. "WP" icon or "Water Hydrant" icon etc).
6. Records count and list of features in that area are displayed.
7. Search features with a specific text in search bar so that results are displayed.

**Results:**

The feature records result should match the search criteria.

## Scenario 5 - Verify that Layers are updated on the map view when added from classic

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Go to Map Manager 
3. Select existing map configuration 
4. Open Map services and click on New row.
5. Add Name, Url and order as Water Network, http://sampleserver6.arcgisonline.com/arcgis/rest/services/Water_Network/MapServer, 50.
6. Create at least an asset or location or work order with service address.
7. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
8. Assign labor/technician to work order in Assignments tab.
9. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on Layers icon present on the right corner.
5. Verify that added Water Network is present and enabled. 
6. Close Layers slider by clicking on the X icon 
7. Verify that Water Network lines will be present all over the map.

**Results:**

- The Layer details sliding drawer should open.
- Clicking on 'X' button should close the Layer details sliding drawer.

**Notes**
- The details can be updated with any type of Map services mentioned in the pre-requisite.

## Scenario 6 - Verify the identify feature functionality for a maximo object e.g. work order using map icon on the work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button on the work order card having service address to open map view.
4. Click on 'Identify tool' button to activate identify mode.
5. Click on work order pin on the map.
6. Verify that work order feature is displayed in the feature list.

**Results:**

- Work order feature should be displayed in the feature list.
- Work order feature record should display work order number, work order description and '?' icon.
- Clicking on '?' icon on work order feature record should open feature details drawer having various work order attributes and their values (e.g. Service address, wo number, wo status, wo description etc). The attribute values should be correct.

## Scenario 7 - Verify that Multiple color Wo Pin points should be displayed According to the status as : Completed ,Approved, Waiting for Approvals and in cluster

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on the Layers icon present on the right corner.
5. Click on the chevron present on the Work Order.
6. Verify details present on the slider with different colors as cluster in black, In progress in green, Approved in blue ,Completed in black, waiting for approval in yellow and others in yellow.

**Results:**

- Different colors should be present with different status which will be displayed on the map view.

## Scenario 8 - Verify when the Base map is disabled , the map view should become blank

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on the Layers icon present on the right corner.
5. Disable the BaseMap.
6. Close the Layers slider by clicking on the X icon.
7. Verify that Map becomes blank with only WO clusters present on it.

**Results:**

- The Map should go blank when basemap is disabled.

## Scenario 9 - Verify when clicked on Identify tool [+] and Highlight Color icon, when selected colours as Green ,blue ,red and yellow , then on maps all  clusters should be displayed in that colour only

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on the identity icon .
5. Click on the Highlight color icon which is on the left side of the hand icon.
6. Select any color.
7. Verify on the map that clusters are displayed on that selected color only.

**Results:**

- The clusters should be displayed in the color selected from the identity icon.

## Scenario 10 - Verify when navigated from Maps to My schedule page from 9 dots, My schedule page should get open

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map Manager is configured.
3. Create at least an asset or location or work order with service address.
4. In case, created work order doesn't have service address then associate the asset and/or location with service address to work order.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on map button in the top right corner of the page to open map view.
4. Click on the 9 dots.
5. Open My schedule.
6. Verify that user is navigated to the Wo list page.

**Results:**

- The navigation should work as per the above steps .

## Scenario 11 - Verify when map is disabled , and opened from 9 dots , it should be redirected to the WO list page (Myschedule).

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Make sure, Map is disabled by unchecking the "Enable map" on the Map manager page

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Verify that Map is disabled on the WO list page.
4. Click on the 9 dots.
5. Click on the Maps.
6. Verify that User should be navigated to the WO list page (My schedule page).

**Results:**

- The navigation should work as per the above steps .