# View the "Map functionality features" in work order details/list page, Waze and Apple applications

These test cases will verify the map functionalities and features in the technician web and mobile app. These test cases will cover the functionalities of following stories:

- GRAPHITE-12785: Eli can filter WOs on a map
- GRAPHITE-12697: Eli can access his WO details from the map
- GRAPHITE-27267: [split] Eli can navigate to his work order using Waze
- GRAPHITE-12484: Eli can navigate to his work order using Waze
- GRAPHITE-26571: [Split] From a map, Eli can see a summary of WOs and open as required
- GRAPHITE-12719: From a map, Eli can see a summary of WOs and open as required
- GRAPHITE-27244: [split] Eli can navigate to his work order using Apple Maps
- GRAPHITE-12397: Eli can navigate to his work order using Apple Maps
- GRAPHITE-27434: [split] Eli can access his map from the work order
- GRAPHITE-27880: [Split] Eli can work with maps in the container
- GRAPHITE-12763: Eli's map is preloaded for him
- GRAPHITE-12631: Eli can access his map from his work list
- GRAPHITE-12462: Eli can navigate to his work order using Google Maps
- GRAPHITE-13403: Eli should be able to create a work order from the map
- GRAPHITE-29164: Eli can select records from the map

**Design URLs:**

- <https://ibm.invisionapp.com/share/DXO0MP4NPUT#/screens/319760270>
- <https://ibm.invisionapp.com/share/DXO0MP4NPUT#/screens/319760271>
- <https://ibm.invisionapp.com/d/?redirHash=#/console/15360095/319560290/preview?scrollOffset=0>
- <https://developers.google.com/maps/documentation/urls/get-started#directions-action>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for updates' button in both online and offline modes.

## Scenario 1 - Verify user can see the list and a map selection option on his work list view

**Pre-condition:**

1. Work with mobile container.
2. Work in online mode.
3. When all data objects are loaded into map, change the device settings to offline mode.

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Verify user can see the list and a map selection option on his work list view.

**Result:**

The user can see the list and a map selection option on his work list view.

## Scenario 2 - Verify user can tap the map icon to open the Map view and can see his work list on the Map view and verify all the available data objects i.e. work orders/assets/locations are loaded on the Map

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon in the top right corner of the work order list page.

**Result:**

- Technician can tap the map icon to open the Map view.
- Technician should be able to view work list on the Map view.
- Technician should be able to view all the available data objects i.e. work orders/assets/locations are loaded on the map.
- Technician should be able to view each WO record in map list contains three attributes i.e. work type, WO number, work order description.

**Note:**
WO record in map list contains three attributes work type, WO number, work order description.

## Scenario 3 - Verify Technician can see his work list on the Map view

**Note:**

WO record in map list contains three attributes work type, WO number, work order description.

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon on the top right corner of the work order list page.

**Result:**

Technician should be able to view work list on the Map view and each WO record in map list contains three attributes i.e. work type, WO number, work order description.

## Scenario 4 - Verify when Technician taps on WO icon/pin(s) on the map, it filters the datalist and show only the work order(s) selected on the map

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon on the top right corner of the work order list page.
5. Click on WO icon/pins on the map.

**Result:**

Selecting work order icon/pin(s) on the map, should filter the datalist and show only the work order(s) selected on the map.

## Scenario 5 - Verify when technician taps on the WO in the map datalist, the corresponding WO should highlight the map icon

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon on the top right corner of the work order list page.
5. Search and click any work order in map datalist.

**Result:**

User should be able to view the corresponding WO map icon is highlighted in map.

## Scenario 6 - Verify when Technician taps on a cluster of WO icons on the map, it should filter the data list with the WOs in that cluster

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon on the top right corner of the work order list page.
5. Click on cluster of WO icons on the map.

**Result:**

The datalist should be filtered with all the WOs in that cluster which is clicked on the map.

## Scenario 7 - Verify Technician can search for WO in search bar in WO list Map view to see the work order in Map

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon in the top right corner of the work order list page.
5. Click on the WO record in map list view to navigate to the WO card.

**Result:**

Technician should be able to search for WO in search bar in WO list Map view to see the work order in Map.

## Scenario 8 - Verify Technician can tap on any WO in WO list Map view to see the work order summary card in Map and navigate to the WO details

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon in the top right corner of the work order list page.
5. Click on the WO record in map list view to navigate to the WO card.
6. Verify user can navigate to the summary card
7. Click on the WO summary card.
8. Verify user should be navigated to the WO details.

**Result:**

- Technician should be able to navigate to WO summary card from the WO list Map view.
- Technician should be able to navigate to WO details.

## Scenario 9 - Verify that all associated functions (highlighting primary actions, executing transactions etc.) in the WO details works properly in Map view

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon in the top right corner of the work order list page.
5. Verify user can tap the map icon to open the work order in map list view.
6. Click on the WO record in map list view to navigate to the WO summary card.
7. Click on the WO summary card to go to work order details page.

**Result:**

All associated functions (highlighting primary actions, executing transactions etc.) in the WO details should work properly in Map view.

## Scenario 10 - Verify tapping back button on the WO details will return user to the work order summary card on the Map view and tapping back on the summary card will return user to the work list on the Map view

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the map icon in the top right corner of the work order list page.
5. Verify user can tap the map icon to open the work order in map list view.
6. Click on the WO record in map list view to navigate to the WO summary card.
7. Tap on back button on WO summary card.
8. Verify User should be able to return back to the work list on the Map view.
9. Repeat steps 1 to 6.
10. Click on the WO summary card to go to WO details page.
11. Tap on back button on WO details page.

**Result:**

- Technician should be able to return back to the work order summary card on the Map view.
- Technician should be able to return back to the work list on the Map view.

## Scenario 11 - Verify Technician can switch to list view by tapping the list view icon on top right of the page

**Steps:**

1. Login as Technician.
2. Click on the "My Schedule".
3. Select "Assigned work"/"PMs due this week" filter option from the dropdown.
4. Click on the list view button on the work order list page.
5. Verify the user can tap the list view to open his list of work orders.

**Result:**

Technician can tap the list icon on the top right of the page to view work orders in list view.

**Note:**

Verify all the work list functionalities (work list, summary card, WO details page) work properly when technician changes Map view to work list view.

## Scenario 12 - Verify that "Start travel" button is displayed in the work order list page when WO has service address associated to it with latitude and longitude values

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1 and perform 'Live refresh'.
7. Go to service address app and create a new service address by adding the longitude and latitude.
8. Go to work order tracking, create a work order and associate the service address to it.
9. Add assignments for technician and approve the work order.

**Steps:**

1. Login to technician app and allow permission for location access.
2. Click on the "Assigned work".
3. Work order cards are loaded on the work order list page.
4. Search for the created work order.
5. Verify that "Start travel" button is displayed for work order.

**Result:**

Technician should be able to view "Start travel" button on the work order card.

## Scenario 13 - Verify that "Start travel" button is not displayed when service address is not specified on the work order

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1 and perform 'Live refresh'.
7. Go to service address app and create a new service address by adding the longitude and latitude.
8. Go to work order tracking, create a work order and do not associate the service address to it.
9. Add assignments for technician and approve the work order.

**Steps:**

1. Login to technician app and allow permission for location access.
2. Click on the "Assigned work".
3. Work order cards are loaded on the work order list page.
4. Search for any work order in work list which do not have service address associated to it.
5. Verify that "Start travel" button is not displayed on work order.

**Result:**

"Start travel" button should not be displayed on work order.

## Scenario 14 - Verify that "Start travel" button is not displayed when location access permission is not granted

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1 and perform 'Live refresh'.
7. Go to service address app and create a new service address by adding the longitude and latitude.
8. Go to work order tracking, create a work order and associate the service address to it.
9. Add assignments for technician and approve the work order.

**Steps:**

1. Login to technician app and do not allow permission for location access.
2. Click on the "Assigned work".
3. Work order cards are loaded on the work order list page.
4. Search for any work order in work list which do not have service address associated to it.
5. Verify that "Start travel" button is not displayed on work order.

**Result:**

"Start travel" button should not be displayed on work order.

## Scenario 15 - Verify that map icon is disabled for work order when Map feature is disabled in Maximo

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1 and perform 'Live refresh'.
7. Go to service address app and create a new service address by adding the longitude and latitude.
8. Go to work order tracking, create a work order and associate the service address to it.
9. Add assignments for technician and approve the work order.
10. Go to Map manager application, open the map, uncheck the 'Enable map' checkbox and save it.
11. Click on "Refresh" action so that changes are reflected immediately.

**Steps:**

1. Login to technician app and allow permission for location access.
2. Click on the "Assigned work".
3. Work order cards are loaded on the work order list page.
4. Search for the work order with service address.
5. Verify that map icon is disabled on the Work list page, Work order summary card and Work order details pages.

**Result:**

Map icon should be disabled on the Work list page, Work order summary card and Work order details pages.

**Note:**

Perform the scenario on iOS, android and windows devices.

## Scenario 16 - Verify that cached data objects (work orders/locations/assets) on the map are pre-loaded in Map view in the offline mode and technician can view, interact with his work on a map

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1 and perform 'Live refresh'.
7. Go to service address app and create a new service address by adding the longitude and latitude.
8. Go to work order tracking, create a work order and associate the service address to it.
9. Add assignments for technician and approve the work order.
10. Go to Map manager application, open the map, select the 'Enable map' checkbox and save it.
11. Click on "Refresh" action so that changes are reflected immediately.

**Steps:**

1. Login to technician app and allow permission for location access.
2. Click on the "Assigned work".
3. Work order cards are loaded on the work order list page.
4. Click on the map icon on the top right corner of the work order list page.
5. Technician should be able to see the data objects (work orders/locations/assets) on the map.
6. Switch device to airplane/offline mode.
7. Go back to WO list view and return to Map view.
8. Verify technician can view, interact with his work on a map in Map view in offline mode.

**Result:**

Technician should be able to view and interact with all the data objects which are pre-loaded in offline mode on the map.

**Note:**

Perform the scenario on iOS, android and windows devices in offline mode.

## Scenario 17 - Verify the property description and default value for 'mxe.mobile.navigation.ios' system property

**Steps:**

1. Login to Maximo classic application as admin.
2. Go to system properties.
3. Search 'mxe.mobile.navigation.ios' system property.
4. Verify the property description and default value for 'mxe.mobile.navigation.ios' system property.

**Result:**

The property description and default value for 'mxe.mobile.navigation.ios' system property should be "Specifies the map that opens when you tap Start travel. Valid values: AppleMaps, GoogleMaps, Waze." and "AppleMaps" respectively.

## Scenario 18 - Verify the property description and default value for 'mxe.mobile.navigation.android' system property

**Steps:**

1. Login to Maximo classic application as admin.
2. Go to system properties.
3. Search 'mxe.mobile.navigation.android' system property.
4. Verify the property description and default value for 'mxe.mobile.navigation.android' system property.

**Result:**

The property description and default value for 'mxe.mobile.navigation.android' system property should be "Specifies the map that opens when you tap Start travel. Valid values: AppleMaps, GoogleMaps, Waze." and "GoogleMaps" respectively.

## Scenario 19 - Verify the property description and default value for 'mxe.mobile.navigation.windows' system property

**Steps:**

1. Login to Maximo classic application as admin.
2. Go to system properties.
3. Search 'mxe.mobile.navigation.windows' system property.
4. Verify the property description and default value for 'mxe.mobile.navigation.windows' system property.

**Result:**

The property description and default value for 'mxe.mobile.navigation.windows' system property should be "Specifies the map that opens when you tap Start travel. Valid values: AppleMaps, GoogleMaps, Waze." and "GoogleMaps" respectively.

## Scenario 20 - Verify that technician is not navigated to default map app when technician taps on 'Start travel' button and 'mxe.mobile.travel.navigation' system property is set to 0

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 0.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Keep 'mxe.mobile.navigation.ios', 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' property values same as default values.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that required maps application is installed on respective device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is not navigated to default map application.

**Result:**

- Default map application shouldn't open either in app or browser when technician taps on 'Start travel' button and 'mxe.mobile.travel.navigation' system property is set to 0.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Perform the scenario on iOS, android and windows devices in mobile app and web app (all maximo supported browsers).

## Scenario 21 - Verify that technician is navigated to default map app when technician taps on 'Start travel' button, 'mxe.mobile.travel.navigation' system property is set to 1 and respective map app is installed on device

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Keep 'mxe.mobile.navigation.ios', 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' property values same as default values.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that required maps application is installed on respective device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to default maps application.

**Result:**

- Default map application should open when technician taps on 'Start travel' button i.e. Apple maps should open on iOS devices and Google maps on windows and android devices.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Perform the scenario on iOS, android and windows devices in mobile app and web app (all maximo supported browsers).

## Scenario 22 - Verify that technician is navigated to default map app in browser when technician taps on 'Start travel' button, 'mxe.mobile.travel.navigation' system property is set to 1 and respective map app is disabled/uninstalled on device

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Keep 'mxe.mobile.navigation.ios', 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' property values same as default values.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that required maps application is uninstalled/disabled on respective device.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to maps application in default browser on the device or ask for default maps application to be downloaded from app store.

**Result:**

- Technician should be navigated to maps application in default browser on the device or ask for default maps application to be downloaded from app store.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Perform the scenario on iOS, android and windows devices in mobile app and web app (all maximo supported browsers).
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property e.g. Chrome/Edge opens Google maps in browser even if AppleMaps is set in 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' properties.

## Scenario 23 - Verify that technician is navigated to Google maps app on iOS device when technician taps on 'Start travel' button, 'mxe.mobile.navigation.ios' system property is set to GoogleMaps

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Change 'mxe.mobile.navigation.ios' system property value to GoogleMaps.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that Google maps application is installed on iOS device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to Google maps application.

**Result:**

- If Google maps app is installed on iOS device then it should open.
- If Google maps app is not installed or disabled on iOS device then it should open Google maps in default browser.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property.

## Scenario 24 - Verify that technician is navigated to Waze app on iOS device when technician taps on 'Start travel' button, 'mxe.mobile.navigation.ios' system property is set to Waze

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Change 'mxe.mobile.navigation.ios' system property value to Waze.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that Waze application is installed on iOS device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to Waze application.

**Result:**

- If Waze app is installed on iOS device then it should open.
- If Waze app is not installed or disabled on iOS device then it should open Waze in default browser.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property.

## Scenario 25 - Verify that technician is navigated to Apple maps on android device when technician taps on 'Start travel' button, 'mxe.mobile.navigation.android' system property is set to AppleMaps

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Change 'mxe.mobile.navigation.android' system property value to AppleMaps.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to Apple maps application.

**Result:**

- Technician should be navigated to Apple maps app in default browser on android device.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property.
- Technician can set Duckduckgo as default search engine in default browser on device in order to be navigated to Apple maps otherwise it will re-direct to Google maps as Google is default search engine on Edge/Chrome.

## Scenario 26 - Verify that technician is navigated to Apple maps on windows device when technician taps on 'Start travel' button, 'mxe.mobile.navigation.windows' system property is set to AppleMaps

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Change 'mxe.mobile.navigation.windows' system property value to AppleMaps.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to Apple maps application.

**Result:**

- Technician should be navigated to Apple maps app in default browser on windows device.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property.
- Technician can set Duckduckgo as default search engine in default browser on device in order to be navigated to Apple maps otherwise it will re-direct to Google maps as Google is default search engine on Edge/Chrome.

## Scenario 27 - Verify that technician is navigated to map app and can see the route where point of origin is the technician current GPS location and the destination is the service address of the work order

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Keep 'mxe.mobile.navigation.ios', 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' property values same as default values.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that required maps application is installed on respective device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Verify that technician is navigated to default map application and can see the route where point of origin is the technician current GPS location and the destination is the service address of the work order.

**Result:**

- Default map application should open when technician taps on 'Start travel' button i.e. Apple maps should open on iOS devices and Google maps on windows and android devices.
- Technician should see the route where point of origin is the technician current GPS location and the destination is the service address of the work order.
- 'Start travel' button should change to 'Stop travel' button.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Perform the scenario on iOS, android and windows devices in mobile app and web app (all maximo supported browsers).
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property.

## Scenario 28 - Verify that technician can navigate back any time from map app to respective page in maximo mobile app from where the start travel request was initiated

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Keep 'mxe.mobile.navigation.ios', 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' property values same as default values.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that required maps application is installed on respective device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Search for the created work order.
4. Click on 'Start travel' button on the work order card.
5. Technician is navigated to default map application and can see the route where point of origin is the technician current GPS location and the destination is the service address of the work order.
6. Verify that technician can navigate back any time from map app to respective page in maximo mobile app from where the start travel request was initiated.

**Result:**

Technician should be able to navigate back any time from map app to respective page in maximo mobile app from where the start travel request was initiated.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Perform the scenario on iOS, android and windows devices in mobile app and web app (all maximo supported browsers).
- Browsers have their preferred maps application on device hence it is quite possible that browser opens their preferred maps application instead of maps application set in respective system property.

## Scenario 29 - Verify that map application opens but route is not displayed when device is in offline mode and offline maps are not downloaded on the device

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 1.
7. Change the system property "mxe.mobile.travel.prompt" value to 1.
8. Change the system property "mxe.mobile.travel.radius" value to 1.
9. Keep 'mxe.mobile.navigation.ios', 'mxe.mobile.navigation.android' and 'mxe.mobile.navigation.windows' property values same as default values.
10. Perform 'Live refresh'.
11. Go to service address app and create a new service address by adding the longitude and latitude.
12. Go to work order tracking, create a work order and associate the service address to it.
13. Add assignments for technician and approve the work order.
14. Make sure that pop-up is allowed and location access permission is granted on all maximo supported browsers on the device.
15. Make sure that required maps application is installed on respective device and location access permission is provided.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Switch device to offline/airplane mode.
4. Search for the created work order.
5. Click on 'Start travel' button on the work order card.
6. Verify that map application opens but route is not displayed.

**Result:**

The map application opens but route is not displayed when device is in offline mode and offline maps are not downloaded on the device.

**Note:**

- Perform the scenario on WO list as well as WO details pages.
- Perform the scenario on iOS, android and windows devices in mobile app and web app (all maximo supported browsers).
- If respective maps are already downloaded on the device then user should be able to see route with offline maps in offline mode too.

## Scenario 30 - Verify that the existing work orders and other layers coming from GIS are displayed when technician switches to Map view

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to service address app and create a new service address by adding the longitude and latitude.
6. Go to work order tracking, create a work order and associate the service address to it.
7. Add assignments for technician and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.

**Result:**

- Technician should be able to switch from WO list to Map view.
- Technician should be able to see the list of existing work orders and other layers coming from GIS in Map view.

## Scenario 31 - Verify that "Create work order +" menu button is displayed and opens when technician long presses on a location on the map

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. Long press on a location on the map.
5. Verify that "Create work order +" menu button is displayed on the map.
6. Click on "Create work order +" menu button.
7. Verify that "Create work order" page opens.

**Result:**

- "Create work order +" menu button should be displayed when technician long presses on a location on the map.
- "Create work order" page should open when technician taps on "Create work order +" menu button on a location on the map.

## Scenario 32 - Verify that when work order is saved, the selected position on the map is saved as work order service address location

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. Long press on a location on the map in order to display "Create work order +" menu button.
5. Click on "Create work order +" menu button to open "Create work order" page.
6. Fill necessary details and click on save button.
7. Verify that the selected position on the map is saved as work order service address location.

**Result:**

- The selected position on the map should be saved as work order service address location and can be verified in database as well as Maximo/Manage.
- The GPS touch-point should be displayed with check-mark on the work order details page of the created work order.
- The map touch-point should be displayed on work order details as well as on work order card on WO list or Map view.

## Scenario 33 - Verify that when work order is saved, clicking back button on WO details navigates technician back to the Map view but newly created work order is not available on map and work orders data list when filter is "Assigned work"

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. Long press on a location on the map in order to display "Create work order +" menu button.
5. Click on "Create work order +" menu button to open "Create work order" page.
6. Fill necessary details and click on save button.
7. Work order details page opens with details of newly created work order.
8. Click on back button.
9. Verify that technician navigates back to the Map view but newly created work order is not available on map and work orders data list when filter is "Assigned work".

**Result:**

The technician should navigate back to the Map view but newly created work order is not available on map and work orders data list when filter is "Assigned work".

## Scenario 34 - Verify that when work order is saved, clicking back button on WO details navigates technician back to the Map view displaying the pinpoint for the newly created work order on the map when filter is "Work created by me/Work created on device"

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. Switch filter to "Work created by me/Work created on device".
5. Long press on a location on the map in order to display "Create work order +" menu button.
6. Click on "Create work order +" menu button to open "Create work order" page.
7. Fill necessary details and click on save button.
8. Work order details page opens with details of newly created work order.
9. Click on back button.
10. Verify that technician navigates back to the Map view displaying the pinpoint for the newly created work order on the map.

**Result:**

- The technician should navigate back to the Map view displaying the pinpoint for the newly created work order on the map after saving the work order when filter is "Work created by me/Work created on device".
- The location of the work order on the map should be same as the location/position of the map where technician long pressed and created the work order.

## Scenario 35 - Verify that technician can select single or cluster/multiple WO pinpoint on the map and datalist is filtered to show the selected Single/Cluster work order only

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to service address app and create a new service address by adding the longitude and latitude.
6. Go to work order tracking, create multiple work orders and associate the same service address to these work orders.
7. Add assignments for technician and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. The pinpoints for the work orders are displayed on the map as well as cluster pinpoints are also displayed on the map.
5. Click on created WO Single/Cluster pinpoints on the map to select it.

**Result:**

- Technician should be able to select single/cluster work orders pinpoint on the map.
- Technician should be able to see single/cluster work orders pinpoint as highlighted on the map.
- The work orders data list in the Map view should be filtered to show the work orders selected in single/cluster only

## Scenario 36 - Verify that the WO datalist and map selection is reset to highlight the current work order only when technician expands and taps on map touch-point of a work order in datalist in Map view

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use the Service Address application" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to service address app and create multiple new service address by adding the longitude and latitude.
6. Go to work order tracking, create multiple work orders and associate the different service address to these work orders.
7. Add assignments for technician and approve the work orders.

**Steps:**

1. Login to technician app with the technician assigned to work orders and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. The pinpoints for the work orders are displayed on the map.
5. Click on one of the WO pinpoint on the map to select it.
6. Click on chevron icon to expand some other created work order in the work order data list.
7. Click on the map touch-point of expanded work order.
8. Verify that the WO data list and map selection is reset to highlight the current expanded work order only.

**Result:**

- Work order data list should be filtered and should display current expanded work order only but no other work orders.
- The map should reset and highlights only the current expanded work order pinpoint.
- The map should also reset to bring the highlighted work order pinpoint in view/focus.
- If technician de-selects the highlighted WO/cluster pinpoint on the map or taps the map icon on expanded work order again, the map and data list should reset and display all work orders without highlighting.

## Scenario 37 - Verify that "Create work order +" menu button is either disabled or hidden when technician long presses position/location on map and technician do not have permission for "Create New Work Order"(CREATENEWWO) sig option

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Create New Work Order"(CREATENEWWO) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Create New Work Order"(CREATENEWWO) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to technician app with the technician assigned to work order and allow permission for location access.
2. Click on "My Schedule" tile to open Assigned WO list.
3. Click on Map view icon besides WO list icon on top right of the Assigned WO list page.
4. Long press on a location on the map in order to display "Create work order +" menu button.
5. Verify that "Create work order +" menu button is either disabled or hidden.

**Results:**

The "Create work order +" menu button should be either disabled or hidden when technician long presses position/location on map and technician do not have permission for "Create New Work Order"(CREATENEWWO) sig option.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 38 - Verify that map icon is enabled for work order when Map feature is enabled in Maximo

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Organizations app.
3. Search and select the organization.
4. In Service address options, choose "Use an external or GIS address system" in Address master and "Latitude and longitude" in coordinates then click OK button.
5. Go to System properties.
6. Change the system property "mxe.mobile.travel.navigation" value to 0 and perform 'Live refresh'.
7. Go to service address app and create a new service address by adding the longitude and latitude.
8. Go to work order tracking, create a work order and associate the service address to it.
9. Add assignments for technician and approve the work order.
10. Go to Map manager application, open the map, check the 'Enable map' checkbox (if not) and save it.
11. Click on "Refresh" action so that changes are reflected immediately.

**Steps:**
1. Login to technician app and allow permission for location access.
2. Click on the "Assigned work".
3. Work order cards are loaded on the work order list page.
4. Search for the work order with service address.
5. Verify that map icon is enabled on the Work list page, Work order summary card and Work order details pages.

**Result:**

Map icon should be enabled on the Work list page, Work order summary card and Work order details pages.

**Note:**

Perform the scenario on iOS, android and windows devices.

## Scenario 39 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design

**Pre-condition:**

Pre-conditions as specified for above-mentioned test scenarios.

**Steps:**

Perform steps as specified for above-mentioned test scenarios.

**Result:**

The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.

## Scenario 40 - Verify the above scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 41 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
