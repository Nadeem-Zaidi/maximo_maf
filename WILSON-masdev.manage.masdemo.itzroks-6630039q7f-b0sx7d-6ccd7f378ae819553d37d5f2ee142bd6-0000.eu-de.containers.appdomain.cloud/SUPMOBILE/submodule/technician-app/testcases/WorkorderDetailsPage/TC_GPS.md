# GPS functionality on work order details page

This test case will verify gps functionality on work order details page.

## Scenario 1 - Verify that user can see the GPS icon on work order details page when GPS location is ON.

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, approve the WO and assign technician to owner.
5. Make the device GPS ON.

**Steps:** 

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Search that work order .
4. Go to work order details page.
5. Check the GPS icon on work order details page

**Results:**

GPS location button should be displayed on work order details page.

## Scenario 2 - Verify that user can see the GPS icon or not on work order details page when GPS location is Off.

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, approve the WO and assign technician to owner.
5. Make the device GPS Off.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Search that work order .
4. Go to work order details page.
5. Check the GPS icon on work order details page

**Results:**

GPS location button should not be displayed on work order details page.

## Scenario 3 - Verify that GPS location is saving or not add toast message when user click on GPS button and device location is On.Also, verify that the toast message and icon changes to the checked when GPS location would be saved.

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, approve the WO and assign technician to owner.
5. Make the device GPS ON.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Search that work order .
4. Go to work order details page.
5. Check the GPS icon on work order details page
6. Click on gps icon.
7. Check the checkmark icon over the gps touchpoint button.

**Results:**

- GPS location should be saved and "GPS location saved" toast message should be displayed.
- Checkmark icon should be displayed over the gps touchpoint.

## Scenario 4 - Verify that GPS location WOSERVICEADDRESS.LATITUDEY and WOSERVICEADDRESS.LONGITUDEX in DB when saved the location for any work order and also check the (x,y) value corrdinates in map

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, approve the WO and assign technician to owner.
5. ON the GPS of device.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Search that work order .
4. Go to work order details page.
5. Click on GPS icon on work order details page.
6. Go to DB and check the values.
7. Go system Map and check the values WOSERVICEADDRESS.LATITUDEY and WOSERVICEADDRESS.LONGITUDEX on map.

**Results:**

- Values should be saved into the Db table WOSERVICEADDRESS.LATITUDEY and WOSERVICEADDRESS.LONGITUDEX.
- Location on map should be showing correct as given in WOSERVICEADDRESS.LATITUDEY and WOSERVICEADDRESS.LONGITUDEX. 

## Scenario 5 - Verify that once user saved the location for any work order then user navigate to other page and come back to same work order.

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, approve the WO and assign technician to owner.
5. ON the GPS of device.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Search that work order .
4. Go to work order details page.
5. Click on GPS icon on work order details page.
6. Go to work order list page.
7. Again go to the same work order and check the GPS button

**Results:**

Checkmark icon should be displayed over the GPS touchpoint on WO details page.

## Scenario 6 - Verify the GPS location touchpoint on work order details if user update the work order service address location in classic.

**Pre-condition:**

1. Login with Admin.
2. Go to "Service Address".
3. Add a new address with latitude ad longitude details.
4. Go to work Order Tracking.
5. Create new work order.
6. Add assignment, approve the WO and assign technician to owner.
7. Add that service address with this work order.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Search that work order .
4. Go to work order details page.
5. Check the checkmark icon over the GPS touchpoint on work order details page.

**Results:**

Checkmark icon should be displayed over the GPS touchpoint on WO details page and location should be saved into db too.

## Scenario 7 - Verify that when user saved the location offline mode and then go to online and sync the data.

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, approve the WO and assign technician to owner.
5. On the GPS of device.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Go to "All" tab and open the list of work order.
3. Make the device Offline.
4. Search that work order.
5. Go to work order details page.
6. Click on GPS icon on work order details page.
7. Make the system online.
8. Search that work order once data sync properly.
9. Go to work order details page.
10. Check the checkmark over the GPS touchpoint.

**Results:**

Checkmark icon should be displayed over the GPS touchpoint on WO details page and value should be updated in db as well as in classic site.

## Scenario 8 - Verify if the captured GPS is displayed properly in the map 

**Pre-condition:**

1. Login with Admin.
2. Go to work Order Tracking.
3. Create new work order.
4. Add assignment, service address and approve the WO.
5. Assign technician to owner.
6. On the GPS of device.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Search the work order .
3. Go to work order details page.
4. Check the checkmark icon over the GPS touchpoint on work order details page.
5. Click on the map icon present on the work order details page.
6. Verify that the WO is displayed on the map when GPS is checked on the WO details Page.

**Results:**

WO should be displayed on the map when GPS is checked on the WO details Page.

