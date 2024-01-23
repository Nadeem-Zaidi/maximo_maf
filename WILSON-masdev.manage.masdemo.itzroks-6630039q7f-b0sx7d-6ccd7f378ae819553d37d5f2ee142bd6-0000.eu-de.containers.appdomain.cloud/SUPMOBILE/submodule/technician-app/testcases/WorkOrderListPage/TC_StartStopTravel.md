# Start travel and non-travel labor transactions functionality on WO list and WO details pages

These test cases will verify starting travel and non-travel labor transactions functionality on WO list and WO details pages for Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- Graphite-16784: Eli can start a non-travel work order
- Graphite-9516: Eli can select a work order to start travel
- Graphite-25842: Eli can select a work order to stop travel
- GRAPHITE-47153: Eli should not be able to start multiple timers at the same time
- GRAPHITE-33940: Review Start travel x Start work icons
- GRAPHITE-31463: When Eli taps Stop Travel, he should remain on the same page
- GRAPHITE-30902: Eli should go to the work details page after clicking on Start Work button in the list page

**Design URL:**

- <https://ibm.invisionapp.com/d/?redirHash=#/console/15360095/319573756/preview?scrollOffset=290>
- <https://ibm.invisionapp.com/share/WCO04JB7AHK#/screens>
- <https://ibm.invisionapp.com/share/8CO22AJFQH6#/screens>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify that "Start travel" button is not displayed when the organization does not use X and Y defined in the service address, geo-location tracking is turned off on the browser/device and when technician denies permission to use location services on browser/device

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto Organization app.
3. Click on the organization. Select the Organization.
4. Click on the service address options.
5. Select the radio button "Use an external or GIS address system".
6. Create a work order and associate the service address to it.
7. Add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on settings in the browser/device and turn the geo-location to OFF.
3. Deny permission to use location services on browser/devices.
4. Click on "My Schedule" tile to open the list of assigned work orders.
5. Verify that "Start travel" button is not displayed on work order cards.

**Result:**

The "Start travel" button should not be displayed on work order cards.

## Scenario 2 - Verify that "Start travel" button is displayed when the organization uses X and Y defined in the service address, when the geo-location on the browser/device is turned ON and when technician grants permission to use location services on browser/device

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Click on settings in the browser/device and turn the geo-location to ON.
2. Launch the Maximo Mobile application using technician credentials.
3. Grant permission to use location services on browser/devices.
4. Click on "My Schedule" tile to open the list of assigned work orders.
5. Verify that "Start travel" button is displayed on work order cards.

**Result:**

- "Start travel" button with "Start travel" label should be displayed on webapp and large screen devices. "Start travel" button without "Start travel" label should be displayed on small/mid screen devices.
- The icon on "Start travel" button should be "carbon:road".

## Scenario 3 - Verify that "Start travel" button is displayed when property mxe.mobile.travel.prompt is set to 1

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that "Start travel" button is displayed.

**Result:**

- "Start travel" button with "Start travel" label should be displayed on webapp and large screen devices. "Start travel" button without "Start travel" label should be displayed on small/mid screen devices.
- The icon on "Start travel" button should be "carbon:road".

## Scenario 4 - Verify that "Start work" button is displayed when property mxe.mobile.travel.prompt is set to 0

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Goto service address and create a new service address by adding the longitude and latitude.
4. Create a work order and associate the service address to it.
5. Add assignments for labor and approve the work order.
6. Goto Global properties and set the property mxe.mobile.travel.prompt=0.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that "Start work with timer" button is displayed.

**Result:**

- "Start work with timer" button with label "Start work" should be displayed on webapp and large screen devices. "Start work with timer" button without "Start work" label should be displayed on small/mid screen devices.
- The icon on "Start work with timer" button should be "maximo:start-work".

## Scenario 5 - Verify that "Start travel" button is displayed when technician region is set to UK (metric region), properties mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=1 and technician is more than 1 km away from work order service address

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the properties mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=1.
6. Set technician locale/region to be UK (metric region).

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that "Start travel" button is displayed if technician is more than 1 km away from work order service address.

**Result:**

- "Start travel" button should be displayed for all work orders where technician is more than 1 km away from work orders service address.
- "Start travel" button with "Start travel" label should be displayed on webapp and large screen devices. "Start travel" button without "Start travel" label should be displayed on small/mid screen devices.
- The icon on "Start travel" button should be "carbon:road".

## Scenario 6 - Verify that "Start travel" button is displayed when technician region is set to US (imperial region), properties mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=1 and technician is more than 1 mile away from work order service address

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the properties mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=1.
6. Set technician locale/region to be US (imperial region).

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that "Start travel" button is displayed if technician is more than 1 mile away from work order service address.

**Result:**

- "Start travel" button should be displayed for all work orders where technician is more than 1 mile away from work orders service address.
- "Start travel" button with "Start travel" label should be displayed on webapp and large screen devices. "Start travel" button without "Start travel" label should be displayed on small/mid screen devices.
- The icon on "Start travel" button should be "carbon:road".

## Scenario 7 - Verify technician can click on start travel button to start labor transaction of work type as "Travel time"

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the "Start travel" for the created work order.
4. Verify that work order status is changed to "In progress" and labor transaction is started with work type as "Travel time".

**Result:**

- The user can click on "Start travel" button.
- The labor transaction should start with work type of "Travel time".
- The work order status should be changed to "In progress" when MAXVARINPUT.STARTTIMERINPRG=1.

## Scenario 8 - Verify that "Start travel" button changes to "Stop travel" button when technician taps on "Start travel" button

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the "Start travel" for the created work order.
4. Verify that "Start travel" button changes to "Stop travel" button.

**Result:**

"Start travel" button should change to "Stop travel" button.

## Scenario 9 - Verify that "Start travel" or "Start work" button is displayed on work order card depending on the service address location is outside or inside the value set in property "mxe.mobile.travel.radius". Also, verify that "Stop travel" button is displayed when labor transaction is started with work type as "Travel time"

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Goto service address and create a new service address by adding the longitude and latitude.
4. Create a work order and associate the service address to it.
5. Add assignments for labor and approve the work order.
6. Goto Global properties and set the property mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=5.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the "Start travel" button for the created work order so that a new labor transaction is started with work type as "Travel time".
4. Click on "Stop travel" button.
5. Verify that "Start travel" or "Start work with timer" button is displayed on work order card depending on the service address location is outside or inside the value set in property "mxe.mobile.travel.radius".

**Result:**

- "Start travel" button is displayed on work order card if work order service address location is outside the value set in property "mxe.mobile.travel.radius".
- The icon on "Start travel" button should be "carbon:road".
- "Start work with timer" button is displayed on work order card if work order service address location is inside the value set in property "mxe.mobile.travel.radius".
- The icon on "Start work with timer" button should be "maximo:start-work".
- "Stop travel" button should be displayed when labor transaction is started with work type as "Travel time".

## Scenario 10 - Verify that "Pause work" button is not displayed on the work order list and details pages when labor transaction is started with work type as "Travel time"

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the "Start travel" button for the created work order so that a new labor transaction is started with work type as "Travel time".
4. Verify that "Stop travel" is primary button (blue color) for the first work order in the WO list and WO details.
5. Verify that technician can tap on "Stop travel" from the WO list and details pages.
6. Verify that "Pause work" button is not displayed on work order card and work order details.

**Result:**

- "Pause work" button should not be displayed on the work order list and details pages when labor transaction is started with work type as "Travel time".
- "Stop travel" should be primary button (blue color) for the first work order in the WO list and WO details.
- Technician should be able to tap on "Stop travel" from the WO list and details pages.

## Scenario 11 - Verify that technician stays on the same page on tapping the "send" button on Labor time confirm dialog (which opens after tapping "Stop travel" button) when "Confirm Time Calculated by Timer?" is checked in org system settings

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1.
6. Make sure "Confirm Time Calculated by Timer?" is checked in organization's system settings.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the "Start travel" button for the created work order so that a new labor transaction is started with work type as "Travel time".
4. Tap on "Stop travel" button from either from WO list card or WO details.
5. Labor time confirm dialog opens and click on send button.
6. Verify that technician stays on the same page i.e. WO list or WO details.

**Result:**

- Technician should be navigated to Labor section on the same page on tapping the "send" button on Labor time confirm dialog and not on "Report work" page.
- Labor transaction should be updated with the end date and time, duration, regular hours and travel time type information.

## Scenario 12 - Verify that technician stays on the same page on tapping "Stop travel" button when "Confirm Time Calculated by Timer?" is unchecked in organization's system settings

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Goto service address and create a new service address by adding the longitude and latitude.
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1.
6. Make sure "Confirm Time Calculated by Timer?" is unchecked in organization's system settings.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the "Start travel" button for the created work order so that a new labor transaction is started with work type as "Travel time".
4. Tap on "Stop travel" button from either from WO list card or WO details.
5. Verify that technician stays on the same page i.e. WO list or WO details on tapping the "Stop travel" button.

**Result:**

- Technician should stay on the same page i.e. WO list or WO details on tapping the "Stop travel" button.
- In Report work page, labor transaction record should be updated with the end date and time, duration, regular hours and travel time type information.

## Scenario 19 - Verify "Pause work" and "Stop work" buttons are displayed when technician clicks on the "Start work" button and distance between technician and service address < mxe.mobile.travel.radius

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a service address for work order with latitude and longitude (which is less than 700 miles from technician location).
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=700.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. "Start work" button is displayed for the created work order.
4. Click on "Start work" button from either the WO list or details page so that a new labor transaction is started.
5. Technician is navigated to WO details page when "Start work" button is clicked from WO list.
6. Verify "Pause work" and "Stop work" buttons are displayed on WO list and WO details pages.

**Result:**

"Pause work" and "Stop work" buttons should be displayed when technician clicks on the "Start work" button and distance between technician and service address < mxe.mobile.travel.radius.

## Scenario 13 - Verify "Start travel" button is displayed when technician clicks on the "Stop travel" button and distance between technician and service address > mxe.mobile.travel.radius

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a service address for work order with latitude and longitude (which is more than 600 miles from technician location).
3. Create a work order and associate the service address to it.
4. Add assignments for labor and approve the work order.
5. Goto Global properties and set the property mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=600.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. "Start travel" button is displayed for the created work order.
4. Click on "Start travel" button from either the WO list or details page so that a new labor transaction is started.
5. Tap on "Stop travel" from either the WO list or details page.
6. Verify "Start travel" button is displayed.

**Result:**

- "Start travel" button should be displayed when technician clicks on the "Stop travel" button and distance between technician and service address > mxe.mobile.travel.radius.
- "Start travel" button with "Start travel" label should be displayed on webapp and large screen devices. "Start travel" button without "Start travel" label should be displayed on small/mid screen devices.
- The icon on "Start travel" button should be "carbon:road".

## Scenario 14 - Verify that "Start work" button is displayed on the WO card in WO list and details when work order status is either of "Approved", "In progress", "Waiting on material", "Waiting on plant cond" and "Waiting to be scheduled"

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Set "maximo.mobile.usetimer" system property value to 1.
3. Create a new work order, add assignments for labor.
4. Change work order status to either of "Approved", "In progress", "Waiting on material", "Waiting on plant cond" and "Waiting to be scheduled".

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order in WO list page.
4. Verify that "Start work with timer" button is displayed on the WO card in WO list and details pages.
5. Verify that "Start work with timer" button has primary design(blue button) when work order is the first work order in WO list, otherwise it has the regular/secondary design.

**Result:**

- "Start work with timer" button should be displayed on the WO card in WO list and details when work order status is either of "Approved", "In progress", "Waiting on material", "Waiting on plant cond" and "Waiting to be scheduled".
- "Start work with timer" button with label "Start work" should be displayed on webapp and large screen devices. "Start work with timer" button without "Start work" label should be displayed on small/mid screen devices.
- "Start work with timer" button should have primary design(blue button) on the WO card in WO list and details when work order is the first work order in WO list, otherwise it has the regular/secondary design.
- The icon on "Start work with timer" button should be "maximo:start-work".

## Scenario 15 - Verify that "Start work" button is not displayed on WO details when the work order is in either of "Waiting on approval", "Completed", "Closed" or "Canceled" status

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a new work order, add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order in WO list page and click chevron to open WO details page.
4. Change the work order status to either of "Waiting on approval", "Completed", "Closed" or "Canceled".
5. Verify that "Start work" button is not displayed on WO details.

**Result:**

"Start work" button should not be displayed on WO details when the work order is in either of "Waiting on approval", "Completed", "Closed" or "Canceled" status.

## Scenario 16 - Verify "Pause work" and "Stop work" buttons are displayed when technician clicks on the "Start work" button on WO list or WO details

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a new work order, add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order in WO list page.
4. Click on the "Start work" button from work order card on work order list or work order details so that a new labor transaction is started.
5. Verify "Pause work" and "Stop work" buttons are displayed.

**Result:**

"Pause work" and "Stop work" buttons should be displayed when technician clicks on the "Start work" button on WO list or WO details.

## Scenario 17 - Verify work order status is changed to "In progress" when MAXVARINPUT.STARTTIMERINPRG=1 and technician starts a new labor transaction from WO list or WO details

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a new work order, add assignments for labor and approve the work order.
3. Go to Administration > Organizations. Search and click on organization.
4. Go to System Settings and enable the option "Automatically change the work order status to INPRG when user starts the Labor timer".

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order in WO list page.
4. Click on the "Start work" button from work order card on work order list or work order details so that a new labor transaction is started.
5. Verify work order status is changed to "In progress".

**Result:**

Work order status should change to "In progress" when MAXVARINPUT.STARTTIMERINPRG=1 and technician starts a new labor transaction from WO list or WO details.

## Scenario 18 - Verify work order status remains unchanged when MAXVARINPUT.STARTTIMERINPRG=0 and technician starts a new labor transaction from WO list or WO details

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a new work order, add assignments for labor and approve the work order.
3. Go to Administration > Organizations. Search and click on organization.
4. Go to System Settings and uncheck/disable the option "Automatically change the work order status to INPRG when user starts the Labor timer".

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order in WO list page.
4. Click on the "Start work" button from work order card on work order list or work order details so that a new labor transaction is started.
5. Verify work order status remains unchanged.

**Result:**

Work order status should remain unchanged when MAXVARINPUT.STARTTIMERINPRG=0 and technician starts a new labor transaction from WO list or WO details.

## Scenario 19 - Verify technician can see a new labor transaction record in 'Labor' section on 'Report Work' page when technician starts a new labor transaction from WO list or WO details

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Create a new work order, add assignments for labor and approve the work order.

**Steps:**

1. Launch the Maximo Mobile application using technician credentials.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Search for the work order in WO list page.
4. Click on the "Start work" button from work order card on work order list or work order details so that a new labor transaction is started.
5. Go to 'Report work' page.
6. Verify that a new labor transaction record is created in 'Labor' section.

**Result:**

A new labor transaction record should be created in 'Labor' section on the 'Report Work' page when technician starts a new labor transaction from WO list or WO details.

## Scenario 20 - Verify that technician can start only one timer at a time in mobile apps when "maximo.mobile.allowmultipletimers" system property is 0

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders and associate the service address.
4. Add assignments for labor and approve the work orders.
5. Make sure that none of the work orders assigned to technician/labor has started timer/labor transaction for him/her.
6. Set "maximo.mobile.allowmultipletimers" system property as 0.
7. Goto Global properties and set the property mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=1.

**Steps:**

1. Launch the Maximo Mobile app with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on "Start travel" button on the work order card.
4. Timer or labor transaction is started for the technician/labor.
5. Search another work order and tap on "Start travel" button on the work order card.
6. Verify that technician is unable to start second timer or labor transaction.

**Results:**

- Technician should be unable to start second timer or labor transaction when one timer is already started for the same technician.
- A popup message "Timer already started." should be displayed when technician tries to start second timer or labor transaction.

**Note:**

- Perform the above mentioned scenario from WO details page and it should work as expected.
- Perform the above mentioned scenario with combination of clicking "Start travel" and "Start work" buttons on different work orders.

## Scenario 21 - Verify that technician can start multiple timer at a time in mobile apps when "maximo.mobile.allowmultipletimers" system property is 1 and viceversa

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create multiple work orders and associate the service address.
4. Add assignments for labor and approve the work orders.
5. Make sure that none of the work orders assigned to technician/labor has started timer/labor transaction for him/her.
6. Set "maximo.mobile.allowmultipletimers" system property as 1.
7. Goto Global properties and set the property mxe.mobile.travel.prompt=1 and mxe.mobile.travel.radius=1.

**Steps:**

1. Launch the Maximo Mobile app with assigned technician credentials.
2. Click on "My Schedule" tile to open the list of work orders.
3. Search the work order and tap on "Start travel" button on the work order card.
4. Timer or labor transaction is started for the technician/labor.
5. Search another work order and tap on "Start travel" button on the work order card.
6. Verify that technician is unable to start second timer or labor transaction.

**Results:**

- Technician should be able to start multiple timer at a time in mobile apps.
- A popup message "Timer already started." should be displayed when technician tries to start second timer or labor transaction.

**Note:**

- Perform the above mentioned scenario from WO details page and it should work as expected.
- Perform the above mentioned scenario with combination of clicking "Start travel" and "Start work" buttons on different work orders.

## Scenario 22 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 23 - Verify all the above test cases in online and offline/disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in online and offline/disconnected mode on mobiles/tablets/browsers.
