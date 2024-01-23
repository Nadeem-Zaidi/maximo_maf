# Technician app Tiles and Buttons functionality on Navigator

These test cases will verify various Technician app specific Tiles and buttons functionality of Navigator on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-10715: Eli can access his schedule from the navigator
- GRAPHITE-34059: Navigator enhancement for creating work
- GRAPHITE-35204: [Split] Navigator enhancement for creating work
- GRAPHITE-17206: Change app footer to IBM Maximo Mobile
- GRAPHITE-26651: [Split] Eli can access mobile web apps and global navigator
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

**Design URL:**

- <https://ibm.invisionapp.com/share/R6O0RCCS4YC#/screens/319804108_Create_New>
- <https://ibm.invisionapp.com/share/GWO03RKN9S8#/319560782_Navigator>
- <https://ibm.invisionapp.com/d/#/console/15357293/319462469/preview>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify that Technician Tiles are displayed on Navigator

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and a location with this work order.
5. Add planned items, materials and/or tools.
6. Add service address information in work order.
7. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile and login with assigned work technician/labor.
2. Tap on "9 dot" icon on Navigator.
3. Verify the Technician tiles displayed on Navigator.

**Results:**

Technician tiles which should be displayed on Navigator are mentioned- My Schedule, Materials & Tools and Map.

## Scenario 2 - Verify that tapping on "My Schedule" opens the WO List with "Assigned work" filter

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and a location with this work order.
5. Add planned items, materials and/or tools.

**Steps:**

1. Launch the Maximo Mobile and login with assigned work technician/labor.
2. Tap on "9 dot" icon on Navigator.
3. Verify the Technician tiles displayed on Navigator.
4. Verify that WO List with "Assigned work" filter opens.

**Results:**

WO List with "Assigned work" filter should open.

## Scenario 3 - Verify that tapping on "Materials & Tools" opens the planned materials and tools list with "Assigned work" filter

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an asset and a location with this work order.
5. Add planned items, materials and/or tools.
6. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile and login with assigned work technician/labor.
2. Tap on "9 dot" icon on Navigator.
3. Tap on "Materials & Tools" tile on Navigator.
4. Verify that planned materials and tools list with "Assigned work" filter opens so that technician can pick/checkout planned materials and tools.

**Results:**

Planned materials and tools list with "Assigned work" filter should open so that technician can pick/checkout planned materials and tools.

## Scenario 4 - Verify that tapping on "Map" opens the WO list with "Assigned work" filter in map view

**Pre-condition:**

1. Map should be configured in Maximo classic/Manage.
2. Login with Admin credentials in Maximo classic/Manage.
3. Go to work order tracking application.
4. Create a new work order.
5. Add an asset and a location with this work order.
6. Add service address information in work order.
7. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile and login with assigned work technician/labor.
2. Tap on "9 dot" icon on Navigator.
3. Tap on "Map" tile on Navigator.
4. Verify that WO list with "Assigned work" filter opens in map view.

**Results:**

WO list with "Assigned work" filter should open in map view.

## Scenario 5 - Verify that user can view Technician, Inspections and other mobile apps in Maximo classic under "Work Orders -> Role Based Applications" provided that user's security group has access to all those applications  

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to Security Groups and provide access for Inspections, Technician and other mobile apps to Technician security group.
3. Assign Technician security group to Eli/Sam user.  
4. Logout from Maximo classic.

**Steps:**

1. Launch the Maximo classic and login with assigned work technician/labor i.e. Eli/Sam.
2. Go to "Work Orders -> Role Based Applications".
3. Verify the various mobile application menu items.  

**Results:**

- User should be able to view Technician, Inspections and other mobile apps menu items as per the access provided in user security group.
- Respective mobile app menu item should not be displayed if user doesn't have access to that mobile app in the security group.
- Clicking on each of those mobile apps menu items should launch the respective mobile app in browser.

## Scenario 6 - Verify that "Create work order +" menu button is either disabled or hidden when technician taps on '+' button and technician do not have permission for "Create New Work Order"(CREATENEWWO) sig option

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

## Scenario 7- Verify correct filter is displayed when technician navigates from ‘My Schedule’, ‘Materials and Tools’ and ‘Map’ by clicking on navigator

**Steps**

1. Login to technician app with the technician assigned to work order.
2. Tap on "9 dot" icon on Navigator.
3. Tap on "My Schedule" tile on Navigator.
4. Verify that WO list with 'Assigned work' filter opens in my schedule view and change the filter to any of the one options available(ex: PM's due this week)
5. Tap on "9 dot" icon on Navigator.
6. Tap on "Maps" tile on Navigator.
7. Verify that changed filter option is reflected in Maps same as that of My Schedule.
8. Tap on "9 dot" icon on Navigator.
9. Tap on Material & Tools tile on Navigator.
10. Verify Material & Tools reflect 'Asigned work' filter by default.
11. Change the filter option to some other (ex-PM's due this week)
12. Tap on "9 dot" icon on Navigator and click on My schedule or Maps.
13. Again tap on "9 dot" icon on Navigator and click on Material & Tools tile on Navigator.
14. Verify previous filter state is retained and reflecting without resetting to Assigned work.

**Results**
- My schedule and Maps page should show same filter when technician switches from one view to other and it should not reset the filter. By default filter should be 'Assigned work'. 
- Tools and Material should retain its previously selected filter and by default show 'Assigned work'.

## Scenario 8- Verify in oflline mode, Maximo Mobile for EAM displays three menus ‘My Schedule’, ‘Materials and Tools’ and ‘Map’

**Steps**
1. Login to technician app with the technician assigned to work orde and wait for all the components to be loaded and activated.
2. Close the application and set the device to offline mode (Ex: airplane mode) for a while.
3. Log back in to Maximo Mobile for EAM.

**Results**
‘My Schedule’, ‘Materials and Tools’ and ‘Map’ menus should be visible in the main menu view and no single menu called as ‘Technician’.

## Scenario 9 - Verify that UI is displayed as per design

**Pre-condition:**

Pre-conditions as specified for above mentioned scenarios.

**Steps:**

Perform steps as specified for above mentioned scenarios.

**Results:**

Rendered UI should match with the UI design as specified in respective Design URL.

## Scenario 10 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned scenarios.

**Steps:**

Perform steps as specified for above mentioned scenarios.

**Results:**

All test scenarios should work as per expectations on mobile devices in online and offline mode.
