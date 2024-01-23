# Add unplanned tools used for the work functionality on report work page

These test cases will verify adding of unplanned tools used for the work functionality on 'Report work' page using Technician web app, online and offline mode on mobile containers. These test cases will cover functionalities of following user story:

- GRAPHITE-9514: Eli can enter unplanned tools used for the work
- GRAPHITE-46021: No warning of data loss on close of TOOLS entry
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

Design URL:

- <https://ibm.invisionapp.com/share/EUO0PJCB3FQ#/screens/319786915_2-_Unplanned_-_1>
- <https://ibm.invisionapp.com/share/FRO0PJF85AU#/screens/319786997_Unplanned_Materials_And_Tools>
- <https://ibm.invisionapp.com/share/SJO1IWGCYM2>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify '+' button is available and technician can tap it to add a tool in tools used section on report work page and default content on sliding drawer when technician taps on '+' icon in tools used section to add tool

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order with planned material and tool.
3. Add an assignment for labor (Eli) in the work order.
4. Change the status of work order to 'Approved'.
5. Click on '+' icon in tools used section to add unplanned tool used for work.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on work order to open the work order details page.
4. Click on report work touch point to open report work page.

**Result:**

Verify '+' icon should be displayed next to tools used section and clicking on it should open the sliding drawer to add unplanned tool used for work.
Various fields and their default contents displayed on sliding drawer for adding tool should be as below:

- Sliding drawer Header label is "Add tool" with X and blue check-mark buttons.
- Tool with forward arrow.
- Quantity with '-' and '+' icons and default value of 1.00.
- Hours with '-' and '+' icons and default value of 0.00.
- Task (if configured in app.xml).

## Scenario 2 - Verify technician can select a tool and the lookup contains the list of tools along with their description

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order with planned material and tool.
3. Add an assignment for labor (Eli) in the work order.
4. Change the status of work order to 'Approved'.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Click on forward arrow of Tool field.

**Result:**

- Verify technician can open tool lookup, which contains the tools and their description in tools list. Also technician should be able to select the tool from the lookup.
- Verify Tool is mandatory field and if it's value is not selected, technician should not be able to save the transaction i.e. check mark button should be disabled.
- Verify when technician selects tool from lookup, it displays tool number and description in Tool field.

## Scenario 3 - Verify the tool lookup is searchable and technician can scan a barcode

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order with planned material and tool.
3. Add an assignment for labor (Eli) in the work order.
4. Change the status of work order to 'Approved'.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page and click on report work touch point to open report work page.
4. Click on '+' icon to open "Add tool" sliding drawer.
5. Click on tool forward arrow to open the lookup and perform search using tool number and description.
6. Also, try to scan a tool barcode and verify search is performed.

**Result:**

- Verify technician should be able to search tool from lookup by tool name and description.
- Technician should be able to search tool by using barcode.

## Scenario 4 - Verify storeroom is auto-populated, when there is only one storeroom for that tool

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new tool and add that tool to a storeroom.
3. Create a work order with planned material and tool.
4. Add an assignment for labor (Eli) in the work order.
5. Change the status of work order to 'Approved'.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool created in above 'Pre-condition' steps from the tool list.

**Result:**

- Verify after selecting tool, storeroom is auto-populated and it displays location and it's description.
- The correct storeroom for the site (where tool is stored) should be displayed.

## Scenario 5 - Verify technician should be able to select storeroom if there are more than one storeroom associated with tool then storeroom lookup opens immediately after selecting the tool

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a new tool and add that tool to multiple storerooms.
3. Create a work order with planned material and tool.
4. Add an assignment for labor (Eli) in the work order.
5. Change the status of work order to 'Approved'.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool created in above 'Pre-condition' steps from the tool list.

**Result:**

- Verify after selecting tool, storeroom value doesn't auto-populate instead an option to select the storeroom from lookup should be enabled and a drawer is displayed immediately to select the storeroom.
- Verify Storeroom lookup should display location and its description. Also, the storeroom for that site is only displayed where tool is stored and technician is able to select the storeroom.
- Verify after selecting the storeroom, its location and description are displayed.

## Scenario 6 - When technician specify a storeroom, the bin field auto-populates if there is only one bin and the bin field should be blank with a placeholder when it is not available

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a tool with item number and description and add it to a storeroom with bin number.
3. Create WO, add assignment for labor (Eli) and add planned material and tool.
4. Change the status of WO as 'Waiting for material'.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom.

**Result:**

- Bin should be auto populated if there is only one bin with bin number, lot number and the current balance from the inventory record.
- Bin field value should not be auto populated and displayed with placeholder '-' value.
## Scenario 7 - Verify when technician specify a storeroom, the bin field is not filled and technician should be able to select if there are more than one bin and bin lookup opens immediately after selecting the storeroom

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with multiple bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom.

**Result:**

Verify after selecting the storeroom, technician should be displayed a bin lookup immediately and technician should be able to select bin from the bins in the list.

## Scenario 8 - Verify if there is more than one bin, then technician can select a bin from a lookup (MATUSETRANS.BINNUM). The bin lookup displays INVBALANCES.BINNUM, INVBALANCES.LOTNUM and INVBALANCES.CURBAL

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom.

**Result:**

- Verify technician should be able to select bin from bin lookup and bin lookup displays INVBALANCES.BINNUM, INVBALANCES.LOTNUM, and INVBALANCES.CURBAL.
- Verify after selecting bin the sliding drawer displays bin number lot number and the current balance.

## Scenario 9 - Verify technician can specify quantity (MATUSETRANS.POSITIVEQUANTITY). A value of 0 is not permitted. The default is 1.00. User can enter up to two decimal places. Also, Verify technician can specify Hours. A negative value is not permitted. The default value is 0:00

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom and then select bin.
8. Enter the value of Quantity.
9. Check the Hours field.

**Result:**

- Verify the default value of quantity should be 1.00.
- Verify technician should be able to enter the quantity of tool and can enter quantity up to two decimal places.
- Verify 0 and negative value is not permitted.
- Verify technician should be able to enter any decimal value greater than 0 in the QTY field.
- Verify the default value of Hours should be "0:00".
- Verify technician should be able to enter tool hours.
- Verify negative value is not permitted.

## Scenario 10 - Verify when technician re-select tool value then all other fields values get cleared from the drawer

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom and select bin.
8. Enter Quantity and Hours of tool.
9. Technician clicks on tool forward arrow button to select a different tool.
10. Verify all other field values.

**Result:**

- Values for storeroom and bin fields are filled with the values associated with the re-selected tool.
- Quantity and Hours fields are filled with their default values in the slider.

## Scenario 11 - Verify technician save is only enabled when technician have all the required information of the fields entered. If technician clear out a required field, the save button becomes disabled

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom and select bin.
8. Enter Quantity and Hours data for selected tool.

**Result:**

- Verify save button is enabled and able to save the data. Also, when technician clear out a required field e.g. clears out tool field, save button becomes disabled.
- Verify when technician enters a '0' in Quantity field, then also save becomes disabled.
- Verify when technician enters a negative value in Hours field, then also save becomes disabled.

## Scenario 12 - Verify after selecting all the data on tool drawer and click on 'X' button then there should not be any new add tool data entry displayed on report work page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom and select bin.
8. Enter valid Quantity and Hours data for selected tool.
9. Click on 'X' button.

**Result:**

Verify that there should not be any new tool data entry displayed on report work page as it was not saved.

## Scenario 13 - Verify after technician save the transaction, the tool record appears on the Report Work view

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon to open "Add tool" sliding drawer.
6. Select the tool.
7. Select the storeroom and select bin.
8. Enter valid Quantity and Hours data for selected tool.
9. Click on save button.

**Result:**

Verify that after saving the transaction, added tool data should be displayed correctly on report work page.

## Scenario 14 - Verify when the technician selected the rotating tool which is having the rotating asset then the rotating asset field is displayed

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a rotating tool and add it to storeroom.
3. Change the status to 'Active' with "Roll New Status to Organizations and Inventory?" checkbox checked.
4. Create a rotating asset and link it to the above created rotating tool.
5. Create a work order and add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the above created work order in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button of tools used to add tool on Report work page.
6. Select the rotating tool which is having the rotating asset.

**Result:**

When the technician selects the rotating tool which is having the rotating asset then technician should be able see the rotating asset field in tool slider.

## Scenario 15 - Verify technician can select a rotating asset from the rotating asset lookup and the lookup contains the ASSET.ASSETNUM and the ASSET.DESCRIPTION and is searchable

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a rotating tool and add it to storeroom.
3. Create a rotating asset and link it to the above created rotating tool.
4. Create a work order and add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the above created work order in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button of tools used to add tool on Report work page.
6. Select the rotating tool.
7. Click on forward arrow of Rotating asset to open the rotating asset lookup.
8. Verify technician can select a rotating asset and the lookup contains the ASSET.ASSETNUM and the ASSET.DESCRIPTION.
9. Search the rotating asset with their name and/or description on rotating asset lookup.

**Result:**

- Verify when technician select rotating asset, which contains the ASSET.ASSETNUM and the ASSET.DESCRIPTION then technician should be able to select the rotating asset from the lookup.
- Verify when technician selects a rotating tool, which has rotating asset associated with it then technician should be displayed with Rotating asset field lookup.
- Technician should be able to search Rotating asset from lookup by name and description.

## Scenario 16 - Verify storeroom is auto-populated, when there is only one storeroom for that rotating tool

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a rotating tool and add it to one storeroom.
3. Create a rotating asset and link it to the above created rotating tool.
4. Create a work order and add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite steps in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button to add tool on Report work page.
6. Select the rotating tool and rotating asset created in pre-condition steps.

**Result:**

Verify that storeroom should be auto populated, when there is only one storeroom for that rotating tool.

## Scenario 17 - Verify if there is no one to one relationship between storeroom and tool, then storeroom lookup is displayed to technician to select storeroom

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a rotating tool and add it to multiple storerooms.
3. Create a rotating asset and link it to the above created rotating tool.
4. Create a work order and add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite steps in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button to add tool on Report work page.
6. Select the rotating tool and rotating asset created in pre-condition steps.

**Result:**

- Verify that storeroom should not be auto populated if selected rotating tool is associated with multiple storerooms.
- Storeroom lookup should be displayed to select storeroom immediately.

## Scenario 18 - Verify rotating asset lookup is displayed to select rotating asset if multiple rotating assets are associated with rotating tool

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a rotating tool and add it to a storeroom.
3. Create multiple rotating assets and link those to the above created rotating tool.
4. Create a work order and add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite steps in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button to add tool on Report work page.
6. Select the rotating tool created in pre-condition steps.

**Result:**

Verify rotating asset lookup is displayed to select rotating asset if multiple rotating assets are associated with the selected rotating tool.

## Scenario 19 - Verify the functionality if rotating tool having multiple rotating assets is associated with multiple storerooms

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a rotating tool.
3. Create multiple rotating assets and link those to the above created rotating tool.
4. Add the rotating tool to multiple storerooms.
5. Create a work order and add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite steps in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button to add tool on Report work page.
6. Select the rotating tool created in pre-condition steps.

**Result:**

Verify that if rotating tool having multiple rotating assets is associated with multiple storerooms then technician should have to select the rotating asset and storeroom manually from respective lookups.

## Scenario 20 - Verify the functionality if rotating tool having single rotating asset and is associated with multiple storerooms

1. Login to maximo/manage application as admin.
2. Create a rotating tool.
3. Create a rotating asset and link it to the above created rotating tool.
4. Add the rotating tool to multiple storerooms.
5. Create a work order and add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite steps in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button to add tool on Report work page.
6. Select the rotating tool created in pre-condition steps.

**Result:**

Verify that if rotating tool having single rotating asset and is associated with multiple storerooms then technician should have to select the storeroom manually from respective lookup.

## Scenario 21 - Verify that the technician is unable to save unplanned tool used for work without filling data in required fields

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a tool with name, description and add it to storeroom.
3. Create a work order and add assignments for labor.
4. Approve the work order.

**Steps:**

1. Login to maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in Pre-Requisite steps in WO List and click it to open WO Details.
4. Click on Report Work touch-point to open Report work page.
5. Click on '+' button to add tool on Report work page.
6. Enter all mandatory fields.

**Result:**

Verify that when all the mandatory fields are filled then only technician should be able to save tool.

## Scenario 22 - Verify that dialog with save and discard options is not displayed when technician clicks on 'X' button without making any changes on tools sliding drawer

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and tools.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in 'Tools used' section on 'Report work' page to open sliding drawer to add a tool.
6. Click on 'X' button to close the sliding drawer.
7. Verify that dialog with save and discard options is not displayed.
8. Make changes to one or more fields on the tool sliding drawer.
9. Click on 'X' button to close the sliding drawer.
10. Verify that dialog with save and discard options is displayed.

**Result:**

- Dialog with save and discard options should not be displayed when technician clicks on 'X' button without making any changes on tools sliding drawer.
- Dialog with save and discard options should be displayed when technician clicks on 'X' button after making changes on tool sliding drawer.

## Scenario 23 - Verify that the tool record is saved with updated and valid values when technician clicks on 'Save' button on dialog and tool drawer fields are updated

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in 'Tools used' section on 'Report work' page to open sliding drawer to add a tool.
6. Make changes to one or more fields on the tool sliding drawer so that there is no validation error message.
7. Click on 'X' button to close the sliding drawer.
8. Click 'Save' button on dialog with save and discard options.
9. Verify that tool record is saved with updated values and saved tool is displayed in 'Tools used' section.

**Result:**

- Tool record should be saved with updated values.
- New saved tool record should be displayed in 'Tools used' section.
- Tool sliding drawer should be closed.

## Scenario 24 - Verify that tool record is not saved when technician clicks on 'Discard' button and tool drawer fields are updated

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in 'Tools used' section on 'Report work' page to open sliding drawer to add a tool.
6. Make changes to one or more fields on the tool sliding drawer so that there is no validation error message.
7. Click on 'X' button to close the sliding drawer.
8. Click 'Discard' button on dialog with save and discard options.
9. Verify that tool record is not saved and updated values are discarded along with tool sliding drawer is closed.

**Result:**

- Tool record should not be saved and updated values should be discarded.
- New tool record should not be displayed in 'Tools used' section.
- Tool sliding drawer should be closed.

## Scenario 25 - Verify that tool record is not saved when technician clicks on 'X' button on dialog with save/discard options and tool drawer fields are updated

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in 'Tools used' section on 'Report work' page to open sliding drawer to add a tool.
6. Make changes to one or more fields on the tool sliding drawer so that there is no validation error message.
7. Click on 'X' button to close the sliding drawer.
8. Click 'x' button on dialog with save and discard options.
9. Verify that tool record is not saved and tool drawer should remain open with updated field values.

**Result:**

- Tool record should not be saved.
- Tool drawer should remain open with updated field values.

## Scenario 26 - Verify that storeroom lookup is searchable

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '3 dots' button in 'Materials used' section on 'Report work' page then click on Add items button to open sliding drawer.
6. In sliding drawer, click on the chevron in Materials tile.
7. Select any Material from that and storeoom page will get opened.
8. In storeroom page, there is Search Bar to search Storeroom.

**Result:**
- User should be able to put search query in search text box and should be able to enter.
- User should be able to see correct search results according to query.

## Scenario 27 - Verify that the tool record is not saved with updated values when technician clicks on 'Save' button on dialog and tool drawer fields have validation error

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools, if required.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in 'Tools used' section on 'Report work' page to open sliding drawer to add a tool.
6. Make changes to one or more fields on the tool sliding drawer so that there is validation error message displayed on tool drawer e.g. providing negative values.
7. Click on 'X' button to close the sliding drawer.
8. Click 'Save' button on dialog with save and discard options.
9. Verify that tool hours record is not saved and tool sliding drawer is still open with updated field values.

**Result:**

Tool record should not be saved and tool sliding drawer should remain open with updated field values and validation error.

## Scenario 28 - Verify that tool record is not saved with updated values when technician clicks on 'Discard' button on dialog and tool drawer fields have validation error

**Pre-condition:**

1. Login to Maximo/Manage application as Admin.
2. Create a work order.
3. Add planned tasks.
4. Add planned items/materials and/or tools.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on '+' button in 'Tools used' section on 'Report work' page to open sliding drawer to add a tool.
6. Make changes to one or more fields on the tools sliding drawer so that there is validation error message displayed on tool drawer.
7. Click on 'X' button to close the sliding drawer.
8. Click 'Discard' button on dialog with save and discard options.
9. Verify that tool record is not saved and updated values are discarded along with tool sliding drawer is closed.

**Result:**

- Tool record should not be saved and updated values should be discarded.
- New tool record should not be displayed in 'Tools used' section.
- Tool sliding drawer should be closed.

## Scenario 29 - Verify that '+' button in 'Tools used' section on Report work page is either disabled or hidden when technician do not have permission for reporting unplanned actual tools

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Actual tools"(ACTUALTOOLS) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Actual tools"(ACTUALTOOLS) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that '+' button in 'Tools used' section on Report work page is either disabled or hidden.

**Results:**

The '+' button in 'Tools used' section on Report work page should be either disabled or hidden when technician do not have permission for reporting unplanned actual tools.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 30 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add tool to multiple storeroom with multiple bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login as Eli.
2. Click on the "My Schedule" to open WO list page.
3. Click on any work order to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on '+' icon on tools used to add tool.
6. Select the tool.
7. Select the storeroom and select bin.
8. Enter Quantity and Hours of tool.
9. Click on save button.

**Result:**

Verify UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.

## Scenario 31 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
