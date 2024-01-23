# Non-Transactional data on work order details page functionality

These test cases will verify non-transactional data displayed on work order details Technician web app, online and offline mode on mobile containers. These test cases will cover functionalities of following technician stories:

- GRAPHITE-21640: Enhance work order details with navigator component
- GRAPHITE-13478: Eli can see the information about who reported the work order
- GRAPHITE-25725: Eli should be able to see the read-only, non-transactional data on a WO in the mobile container
- GRAPHITE-13456: Eli can see the long description of his work order or task

**Design URL:**

- <https://ibm.invisionapp.com/share/XNO0MI0TFHY#/screens/319759220_Touchpoints_And_Tiles>
- <https://ibm.invisionapp.com/share/K2O046QCSDQ#/screens>
- <https://ibm.invisionapp.com/share/DTO041NW43X#/screens/319568403>
- <https://ibm.invisionapp.com/share/CVO052HE9M6#/screens/319578908_Tasks>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify that navigator icons are visible on Work Order details page and navigator tile is showing badge value on first load

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Add 4 attachments to work order, assign labor in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify navigator icons are visible at the bottom of the work order details page.
6. Verify that badge value is showing on navigator tiles e.g. on Attachments tile.
7. Click on Attachment tile.
8. Verify technician is navigated to attachment page.

**Result:**

- Navigator icons should be visible at the bottom of the work order details page like Attachments and Follow-up work order navigator icons.
- Badge value should be shown on first load on navigator tiles e.g. if there are 4 attachments in the work order then in the attachment navigator tile, the badge value should be shown as 4.
- Technician should be navigated to the attachment page from work order details page.

## Scenario 2 - Verify technician is navigated to follow-up page when technician clicks on Follow-up navigator tile

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Click on Follow-up tile.
6. Verify technician is navigated to follow-up page.

**Result:**

Technician should be navigated to the follow-up page from work order details page.

## Scenario 3 - Verify the availability of "Reported by", "Reported on" and "Contact" field on WO details page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify the availability of "Reported by", "Reported on" and "Contact" field on WO details page.

**Result:**

- "Reported by", "Reported on" and "Contact" field should be displayed on bottom of WO details page.
- The fields name should be displayed in grey color and font size should match with the approved design.
- Placeholder (-) should be displayed for reporter contact details when reporter doesn't have the contact information.
- Placeholder(-) should be displayed when "Reported by" doesn't have display name in maximo.

## Scenario 4 - Verify that ellipsis is added when reporter display name is very long so that name should not be overlapped with contact details

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify the "Reported by" value when reporter display name is very long.

**Result:**

Ellipsis should be added when reporter display name is very long and it should not be overlapped with contact details.

## Scenario 5 - Verify the reporter details on small screen size devices

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify the reporter details on WO details page.

**Result:**

Reporter details should be vertically aligned on WO details page.

## Scenario 6 - Verify that when lastname or firstname is removed from Reporter then verify reporter details on existing WO details page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify "Reported by" section.

**Result:**

"Reported by" value should be updated with updated display name on existing work orders.

## Scenario 7 - Verify the long description on the WO details page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order and add long description.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify long description.

**Result:**

- The long description should be displayed properly in WO details page.
- The Long description along with an icon to open Rich text editor should be displayed in the Details section on work order details page.

## Scenario 8 - Verify "Start work" button, scheduled start date and duration, Asset and location information and "Reported date", "Reported by" along with contact is displayed on work order details page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order and add asset/location to work order.
3. Enter Scheduled start date and duration.
4. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Verify that following data is displayed in work order details page: "Start work" button, Scheduled start date and duration, Asset and location information, "Reported date", "Reported by" along with contact information.

**Result:**

The following data should be displayed properly in work order details page:

- "Start Work" button.
- Scheduled start date and duration.
- Asset and location information.
- "Reported date", "Reported by" along with contact information.

## Scenario 9 - Verify if the "Long description" associated icon is clicked, then complete long description of the work order is opened in a large dialog/flyout and when the technician clicks on the back button flyout can be closed

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new work order and add a long description.
3. Assign labor/technician to work order in Assignments tab and approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition step 2 in "Assigned Work" filter.
4. Click chevron on the work order card to open wo details page.
5. Click on the "Long description" associated icon.
6. Click on back icon/button.

**Result:**

- The "Long description" of the work order should be opened in a large dialog/flyout where complete long description should be displayed.
- The "Long description" flyout should be closed when the technician clicks on back button.

## Scenario 10 - Verify all the above test scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Login to technician-app with the technician assigned to work order.
2. Navigate and perform above mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 11 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
