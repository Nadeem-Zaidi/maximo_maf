# Scanner functionality on 'Work order Details' page

These test cases will verify scanning of 'Bar' code and 'QR' code functionality on asset in 'Work order details' page on Technician web app, online and offline mode on mobile containers.

- GRAPHITE-29141 -  Verify that Eli can scan QR code
- GRAPHITE-18250 -  Eli can scan an asset to confirm he is working at the right asset
- GRAPHITE-26508 - [Split] Eli can see the icon to scan an asset to confirm he is working at the right asset

Design URL: <https://ibm.invisionapp.com/share/S8O0BSX39UW#/screens/319652511_confirm_Asset_Touchpoint>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- Create a asset in classic and goto <https://www.the-qrcode-generator.com/> and generate the QR code with the created work order or asset. These will be applicable for all the test.

## Scenario 1 - Verify availability of scanner button on asset and location section in work order details page

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create an asset.
3. Create a work order.
4. Associate the created asset to the work order.
5. Add assignments for labor.
6. Approve the work order.
7. Using a third party application, Generate the QR code for the above work oder.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile, User lands on the work order list page.
3. Click on created work order and user lands on the work order details page.
4. Scroll down to the asset and location section.
5. Verify the availability of scanner button in asset and location section in work order details page.
6. Click on scanner button.
7. Verify that the camera is opened when clicked on the scanner button.

**Result:**

- 'Scanner' button should be available on asset and location section in work order details page.
- When clicked on scanner button in asset and location section, The camera is opened and user can scan the asset.

## Scenario 2 - When the QR code of the asset is scanned, Verify that a toast message "Asset confirmed" is displayed on the top of the page

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create an asset.
3. Create a work order.
4. Associate the created asset to the work order.
5. Add assignments for labor.
6. Approve the work order.
7. Using a third party application, Generate the QR code for the above work oder.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile, User lands on the work order list page.
3. Click on created work order and user lands on the work order details page.
4. Scroll down to the asset and location section.
5. Click on scanner button.
6. Point the scanner to the generated QR code.
7. When scanned QR code is matched with the assigned asset then Verify that user is able to see the toast message "Asset confirmed" on the top of the page.

**Result:**

When scanned QR code matches with the assigned asset in the work order then, A toast message "Asset confirmed" is displayed on the top of the page.

## Scenario 3 - Verify that the scanner touch point is not available in asset and location section when asset is not associated to the work order

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile, User lands on the work order list page.
3. Click on created work order and user lands on the work order details page.
4. Scroll down to the asset and location section.
5. Verify that scanner touch point is not available in the asset and location section in work order details page.

**Result:**

Scanner touch point is not available in the asset and location section.

## Scenario 4 - When user scans an invalid format or corrupted or not supported format. Verify that scanner continues to scan and user has to close the scanner in order to scan another QR code

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a asset.
3. Create a work order and do not add the created asset to it.
4. Add assignments for labor.
5. Approve the work order.
6. Using a third party application, Generate an invalid or not supported format of QR code for the asset or location.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile, User lands on the work order list page.
3. Click on search icon, User can view the scanner button on it.
4. Click on scanner button, The camera is opened for scanning.
5. Point the camera on the created 'QR code'.
6. When the invalid or not supported QR code of the asset or location is scanned, Verify that the scanner continues to scan and user has to close the scanner in order to scan another QR code.

**Result:**

When invalid or not supported QR code is scanned, Scanner continues to scan and user has to close the scanner in order to scan another QR code.

## Scenario 5 - Verify that asset scan icon is clickable or not and also verify the scanner screen when click on asset scan icon

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work and assign the created asset to work order.

**Steps:**

1. Login the Technician app.
2. Click on created work order on work order list page.
3. Click on Asset scan icon.

**Result:**

- Asset scan icon should be clickable and barcode scanner screen should open and webcam should open.
- Back button should be displayed on top left of scanner screen.

## Scenario 6 - Verify that barcode scan functionality and also verify that when asset mismatch with given barcode after scanning the barcode

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work order and assign the created asset to work order.
4. Create the barcode for asset

**Steps:**

1. Login the Technician app.
2. Click on created work order on work order list page.
3. Click on Asset scan icon.
4. Scan the barcode.
5. Click on back button.
6. Create a different barcode from asset and scan the barcode. Also, check when asset mismatch with barcode with its contents.
7. Click on Asset scan icon.
8. Scan the barcode.
9. Dialog will open because barcode and asset both are different as per pre-requisite.
10. Then click on "Scan asset" button.

**Result:**

1. If barcode successfully scanned then asset then user should get the proper response.(Result for step 4)
2. User should be redirect on work order details page.(Result for step 5)
3. Asset mismatch dialog should be open.(Result for steps 6-9)
- Asset mismatch(heading) and cross button on left of header.
- Asset scanned(left side).
- Asset on work order(right side).
- Error icon.
- Check these things(Important notes for user).
- If you cannot identify the correct asset, contact your supervisor.
- BMX error.
- Scan asset button (blue color).
- Ok button.
- (X) close button.
4. User again should redirect on barcode scan screen. (Result for step 10)

## Scenario 7 - Verify that when user click on Ok button, X button and correct barcode on asset mismatch dialog

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work order and assign the created asset to work order.
4. Create a different barcode from asset.

**Steps:**

1. Login the Technician app.
2. Click on created work order on work order list page.
3. Click on Asset scan icon.
4. Scan the barcode.
5. Dialog will open because barcode and asset both are different as per pre-requisite.
6. Then click on "Ok" button.
7. Click on Asset scan icon.
8. Scan the barcode.
9. Dialog will open because barcode and asset both are different as per pre-requisite.
10. Then click on "X" button.
11. Click on Asset scan icon.
12. Scan with any other barcode.
13. Dialog will open because barcode and asset both are different as per pre-requisite.
14. Then click on "Scan asset" button on dialog.
15. Scan with correct barcode again.

**Result:**

- User again should redirect on work order details page.(Result for steps 4-10)
- Barcode should be match with asset which assign with work order and a toast message should be displayed "Asset Confirmed".(Result for steps 11-15)

## Scenario 8 - Verify that user scanned with correct barcode and also when user try to scan asset again once user already scanned once

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work order and assign the created asset to work order.
4. Create an barcode for above created asset.

**Steps:**

1. Login the Technician app.
2. Click on created work order on work order list page.
3. Click on Asset scan icon.
4. Scan the barcode.
5. Barcode scanned successfully.
6. Click on scan touchpoint button try to scan again.

**Result:**

- Barcode should be match with asset which assign with work order and a toast message should be displayed "Asset Confirmed".(Result for steps 1-5)
- Barcode should be match with asset which assign with work order when user try to scan the again and a toast message should be displayed "Asset Confirmed".(Result for step 6)

## Scenario 9 - Verify the UI of the cards/pages/views for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small screen devices for all supported form factors

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work order and assign the created asset to work order.
4. Create the barcode for asset.

**Steps:**

1. Login to techMobile app with the technician assigned to work order.
2. Navigate to screens/pages/cards of above mentioned scenarios.
3. Verify UI of the cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.

**Result:**

- The cards/pages for fonts, font sizes, font color, text completeness, alignment, positioning etc. are correct and as per design.
- The application should behave as per expectations for all above mentioned scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 10 - Verify the test cases from Serial number 1 to 20 in offline or disconnected mode

**Pre-condition:**

1. Login Classic site.
2. Go to asset and create a new asset.
3. Create a new work order and assign the created asset to work order.
4. Create the barcode for asset.

**Steps:**

1. Login to techMobile app with the technician assigned to work order.
2. Navigate and perform above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.

**Result:**

- The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
