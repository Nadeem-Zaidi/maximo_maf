# Add, view and delete attachments functionality on 'Work order details' page

These test cases will verify add, view and delete attachments functionality on 'Work order details' page for Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-22497: Eli can open the attachments page
- GRAPHITE-23197: Eli can view attachments online on his work order
- GRAPHITE-16830: Eli can add attachments to his work order
- GRAPHITE-26531: Eli can view and upload attachments in the offline container
- GRAPHITE-40134: TS006587771 - Cannot delete attachments
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission
- GRAPHITE-33475: Eli can provide name and details for attachments that are being added to the WO


**Design URL:**

- <https://ibm.invisionapp.com/share/4BO08BSPJ7A#/screens/319617290_Attachments>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify that technician can see the "Attachments" tile/list item on the WO details page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an attachment to work order.
5. Add asset, location and tasks to which attachments are associated.
6. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Verify the "Attachments" tile/list item is displayed on the WO details page.
5. Verify the attachments count on the "Attachments" tile/list item.

**Results:**

- The technician should be able to see the "Attachments" tile/list item on the WO details page.
- The technician should be able to see the attachments count associated with work order on the "Attachments" tile/list item.
- The header/title of the page should be "Attachments" on the "Attachments" page.
- The message "No attachments found" should be displayed when no attachment is added.
- The attachments associated with the asset, location and tasks for the work order should be displayed on the "Attachments" page.

## Scenario 2 - Verify that the technician can see and open all the attachments on "Attachments" page and can navigate back to the WO details page from "Attachments" page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an attachment to work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on the attachments to open the attachments.
5. Click back button from the "Attachments" page.

**Results:**

- The technician should be able to see and open all the attachments on "Attachments" page.
- The technician should be able to navigate back to the WO details page.

## Scenario 3 - Verify the value DOCLINKS.DOCUMENT and DOCLINKS.DESCRIPTION is displayed for attachments

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add attachments to work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on the "Attachments" tile/list item and verify the values of DOCLINKS.DOCUMENT and DOCLINKS.DESCRIPTION for each listed attachment.

**Results:**

The values of DOCLINKS.DOCUMENT and DOCLINKS.DESCRIPTION for each listed attachment on "Attachments" page should be correct.

## Scenario 4 - Verify the preview of image file type for attachments, preview of video file type for attachments and the URL for attachments

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add attachments of image type to work order.
5. Add attachments of video type to work order.
6. Add attachments of URL type to work order.
7. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on the "Attachments" tile/list item.
5. Verify the preview for image type attachment and click on it.
6. Verify the preview for video type attachment and click on it.
7. Click on URL type attachment.

**Results:**

- The preview should be displayed for file type as "image" and clicking on it should open the image.
- The preview should be displayed for file type as "video" and clicking on it should open/play the video.
- The open URL icon should be displayed and clicking on it should open the URL in a new tab.

## Scenario 5 - Verify the document type file for attachments

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add attachments of document type to work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on the "Attachments" tile/list item.
5. Verify the document type file attachment and click on it.

**Results:**

The file/document should get download on the technician's device and technician should be able to view the file.

## Scenario 6 - Verify that technician can see '+' icon to add attachment and if technician tap on the icon, then the device native capability is open for taking and/or uploading photo

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Verify that '+' icon is present on top right of the page to add an attachment to work order.
6. Click on the '+' icon present on top right.

**Results:**

- '+' icon button should be present on top right of page to add an attachment to work order.
- Device native capability should be opened for taking and/or uploading photo.

## Scenario 7 - Verify that file size is compared with value specified in system property "mxe.doclink.maxfilesize" before allowing to upload the file

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Click on the '+' icon present on top right.
6. Browse and select the image/photo to attach.

**Results:**

- System property "mxe.doclink.maxfilesize" should be checked for the max file size before allowing to upload.
- If size is as per attachment business rule then system should allow to upload the file.
- It should display an appropriate error message from Maximo to prevent uploading the file if file size is large.

## Scenario 8 - Verify that file type/extension is checked with value specified in system property "mxe.doclink.doctypes.allowedFileExtensions" before allowing to upload the file. Also, verify that functionality if file type being uploaded isn't supported as per system property "mxe.doclink.doctypes.allowedFileExtensions"

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Click on the '+' icon present on top right.
6. Browse and select the file to attach.

**Results:**

- System should allow to upload only files with type/extension matching with that specified in system property "mxe.doclink.doctypes.allowedFileExtensions".
- The file type of the file being uploaded should be checked with the value specified in System property "mxe.doclink.doctypes.allowedFileExtensions".
- If file type is not supported then either file shouldn't be selectable or return an appropriate error message.

**Note:**

For photos and videos unsupported file types, it should return the appropriate message from Maximo to prevent uploading the file.

## Scenario 9 - Verify that technician is notified to cancel the upload before it is completed

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Click on the '+' icon present on top right.
6. Browse and select large image/photo/video/document to attach.

**Results:**

User should get the notification to cancel the file upload before it is completed.

## Scenario 10 - Verify that technician is displayed with attachment details page(File name and Description) after uploading the attachment

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Check the attachments list.
6. Click on the '+' icon present on top right.
7. Browse and select image/photo/video/document to attach.
8. On selecting file, sidebar drawer will appear with two different fields "File name" and "Description".
9. Click on save.
10. Notification will appear as "Attachment added".
10. List will re-render with provided "File name" and "Description"

**Results:**

- Attachment details page with "File name" and "description" should be prompted after the file is uploaded successfully.
- "File name" and "Description" added should be displayed on the attachments list page.
- Description limit is 255 characters.

## Scenario 11 - Verify that attachments list is updated with the new attachment information after the file is uploaded successfully and attachments count is updated on WO details page after the file is uploaded successfully

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on "My Schedule" tile and open the list of work orders.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Check the attachments list.
6. Click on the '+' icon present on top right.
7. Browse and select image/photo/video/document to attach.
8. Check the attachments list again.
9. Click on back button and check the attachments count on WO details page.

**Results:**

- Attachments list should be updated with the new attachment information after the file is uploaded successfully.
- Attachments count should increase by the number of new attachments added.

## Scenario 12 - Verify that a cross (X) button should be available with attached file to delete the attachment and notification message with undo button should be displayed after clicking on delete button for attached file

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an attachment to work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on the "My Schedule" to go to WO list page.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Verify that cross (X)/delete button is displayed with the attached file to delete the attachment.
6. Click on cross (X)/delete button of attached file to delete the attachment.

**Results:**

- A cross (X)/delete button should be available with attached file to delete the attachment.
- A notification message 'Deleting DOCKLINKS\ATTACHMENTS\File_Name' should be displayed to technician with undo button.

## Scenario 13 - Verify that deletion will cancel if technician clicks on 'Undo' button and viceversa

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add an attachment to work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on the "My Schedule" to go to WO list page.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Click on cross (X)/delete button of attached file to delete the attachment.
6. Click on 'Undo' button to cancel the deletion.
7. Click on "Attachments" tile/list item to go to "Attachments" page.
8. Click on cross (X)/delete button of attached file to delete the attachment.

**Results:**

- Deletion of attached file should be cancelled and file should continue to display in the attachments list.
- Selected file should be deleted if technician didn't click the 'Undo' button.
- It shouldn't be displayed in attachments list anymore.

## Scenario 14 - Verify that save/discard popup is dispalyed when technician clicks on back button from attachments page

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on the "My Schedule" to go to WO list page.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Verify that '+' icon is present on top right of the page to add an attachment to work order.
6. Click on the '+' icon present on top right.
7. Select any attachment and enter file name and description.
8. Click on back button.

**Results:**
Save/discard popup should be dispalyed when tcehnician clicks on back button from attachments page

## Scenario 15 - Verify the message displayed on "Attachments" page if all the attachments are deleted from work order

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add attachments to work order.
5. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician.
2. Click on the "My Schedule" to go to WO list page.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Click on cross (X)/delete button of attached file to delete the attachment.
6. Delete all attachments added to work order.
7. Verify the message displayed on the "Attachments" page.

**Results:**

A message 'No attachments available' should appear on "Attachments" page if all the attachments are deleted.

## Scenario 16 - Verify adding multiple attachments using camera while being offline mode

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician(Perform these steps in offline mode).
2. Click on the "My Schedule" to go to WO list page.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Using the camera take multiple pictures(5-6).
6. Turn on the device to online mode.
7. Sync the device.
8. Verify technician can view the count of attcahments attached in offline mode.

**Results:**

Technician should be able to view the different pictures for the number of attachments attached.

## Scenario 17 - Verify that on adding multiple big size attachments in offline mode, technician can sync and view in online mode.

**Pre-condition:**

1. Login with Admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the WO.

**Steps:**

1. Launch the Maximo Mobile with work technician(Perform these steps in offline mode).
2. Click on the "My Schedule" to go to WO list page.
3. Search the work order and click chevron to open WO details page.
4. Click on "Attachments" tile/list item to go to "Attachments" page.
5. Attach multiple big size photos/video/pdfs.
6. Turn on the device to online mode.
7. Sync the device.
8. Verify the attachments count and correct attachments display in the workorder.

**Results:**

Technician shoule be able to sync and view all the attached files in online mode.

## Scenario 18 - Verify that "+" buttons on "Attachments" page are either disabled or hidden when technician do not have permission to add attachments to work order

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Add attachments"(ADDATTACHMENTS) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Add attachments"(ADDATTACHMENTS) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 9 dots menu and go to "My Schedule" tile.
3. Find the work order created in pre-condition steps in WO list.
4. Click on chevron on work order card to open work order details page.
5. Click on "Attachments" tile/list item to go to "Attachments" page.
6. Verify that "+" buttons on "Attachments" page are either disabled or hidden.

**Results:**

The "+" buttons on "Attachments" page should be either disabled or hidden when technician do not have permission to add attachments to work order.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 19 - Verify all the above test cases in offline or disconnected mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Result:**

The application should behave as per expectations for all above mentioned scenarios in offline or disconnected mode on mobiles/tablets/desktops.
