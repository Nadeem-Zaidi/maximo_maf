# Eli can add unplanned materials used from work order report work page

These test cases will verify technician is able to add materials on 'Report work' page on Technician web app, online and offline mode on mobile containers. These test cases will cover functionalities of following user stories:

- GRAPHITE-35322: Eli can enter unplanned materials used for the work
- GRAPHITE-36392: Eli can enter a rotating asset on an actual material
- GRAPHITE-41695: Eli can specify a task on a material actual report
- GRAPHITE-42939: Eli need to be able to inform item condition when reporting Materials in a work order (TS006498988)
- GRAPHITE-45989: [DUX] No warning of data loss on close of MATERIAL entry
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

**Design URLs:**

- <https://ibm.invisionapp.com/share/EUO0PJCB3FQ#/screens/319786915_2-_Unplanned_-_1>
- <https://ibm.invisionapp.com/share/FRO0PJF85AU#/screens/319786997_Unplanned_Materials_And_Tools>
- <https://ibm.invisionapp.com/share/SJO1IWGCYM2>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify 'Add items +' button is displayed in 3 dots menu and technician can tap the 'Add items +' button to add a material in 'Materials used' section on report work page and verify default contents

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.

**Result:**

- 'Add items +' menu button should be displayed in 3 dots menu to add actual material next to 'Materials used' section and clicking on it should open the add material sliding drawer.
- Various fields and their default contents displayed on sliding drawer for adding material should be as below:
- Sliding drawer header label is 'Add material' with X and check-mark buttons.
- Material.
- Quantity with '-' and '+' buttons and default value of '1.00'.
- Task(if tasks are added in WO)
- Transaction type.

## Scenario 2 - Verify technician can select a material and the lookup contains the ITEM.ITEMNUM and the ITEM.DESCRIPTION for a material record

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Click on material lookup and perform search using material number and description.
7. Try to scan a material barcode/QR code and verify search is performed.

**Result:**

- Technician should be able to open material lookup which contains the ITEM.ITEMNUM and the ITEM.DESCRIPTION and can select the material from the lookup.
- Material should be mandatory field and if its value is not selected, technician should not be able to save the transaction i.e. check mark button remains disabled.
- Technician should be able to search material from lookup by name and description.
- Technician should be able to search material by using barcode/QR code(if configured).

## Scenario 3 - Verify when technician selected material, the sliding drawer displays material/item number and description. Transaction type is also auto populated with default value 'Issue'

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open material sliding drawer and select material from the lookup.

**Result:**

- When technician selects item/material from lookup, it should display selected material/item number and description in Material field.
- After selecting the material, Transaction type field should be updated with Issue.

## Scenario 4 - Verify storeroom is auto-populated when there is only one storeroom for that material/item and for multiple storerooms technician should be able to select from the list of options

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.

**Result:**

- After selecting material, storeroom should be auto-populated and should display location and its description.
- The storeroom for technician site where item is stored should only be displayed.
- In case of multiple storerooms,after selecting material, storeroom value shouldn't auto-populate. An option to select the storeroom from lookup should be enabled and a drawer should be displayed immediately to select the storeroom.
- Storeroom lookup should display location and its description. The storerooms for technician site where item is stored should only be displayed.
- After selecting the storeroom, its location and description are displayed in storeroom field.

## Scenario 5 - When technician specify a storeroom, the bin field should be blank with a placeholder when bin information is unavailable. Also, when technician specify a storeroom, the bin field is auto-populates if there is only one bin. and is not auto-populated if multiple bins are associated for the item/material in the selected storeroom

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item ith item number and description and add it to storeroom without bin number.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom from lookup (in case of multiple storerooms).

**Result:**

- Bin field value should not be auto-populated and placeholder '-' value is displayed when bin information is unavailable.
- Bin field is auto populated with bin number, lot number and the current balance from the inventory record if there is only one bin associated with item/material for the selected storeroom.
- Bin lookup should open immediately after selecting the storeroom, if multiple bins are associated for the item/material in the selected storeroom.
- Technician should be able to select the bin from the bin lookup.

## Scenario 6 - Verify if there are multiple bins then bin lookup displays INVBALANCES.BINNUM, INVBALANCES.CURBAL and INVBALANCES.CONDITIONCODE for the selected item/material in the storeroom

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom from lookup (in case of multiple storerooms).

**Result:**

- Technician should be able to select bin from bin lookup and bin lookup should display INVBALANCES.BINNUM, INVBALANCES.CONDITIONCODE and INVBALANCES.CURBAL for the selected item/material in the storeroom.
- Selected bin number and condition code, if any, should be displayed in Bin field.

## Scenario 7 - Verify technician can specify quantity (MATUSETRANS.POSITIVEQUANTITY). The default value is '1.00'. Technician can enter up to two decimal places and 0 quantity is not permitted

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).

**Result:**

- The default value of quantity should be '1.00'.
- Technician should be able to enter the quantity of material and can enter quantity up to two decimal places.
- Zero and negative values should not be permitted.
- Technician should be able to enter any decimal value greater than '0'.

## Scenario 8 - Verify technician can select a task from task lookup when single or multiple planned tasks are added to work order

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add single or multiple planned tasks to work order.
3. Provide the task id and task description while adding tasks to work order.
4. Add item/material to storeroom with different bins.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter the quantity.
9. Click on the right chevron for Task to open task look up.

**Result:**

- All planned tasks should be displayed correctly in task lookup. Each task record should display task id and task description(if available).
- Technician should be able to select the task from the lookup.
- Technician selects the task record from the lookup. Selected task id and task description should be displayed in the Task field.

## Scenario 9 - Verify unavailability of chevron to open task lookup when planned task is not added to work order

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and do not add planned tasks to work order.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter the quantity.
9. Verify chevron to open task lookup is unavailable for Task field.

**Result:**

Chevron to open task lookup should be unavailable for Task field when planned task is not added to work order.

## Scenario 10 - Verify search functionality works correctly for task id and task description on Task lookup

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add single or multiple planned tasks to work order.
3. Provide the task id and task description while adding tasks to work order.
4. Add item/material to storeroom with different bins.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter the quantity.
9. Click on the right chevron for Task to open task look up.
10. Search the tasks by task id and/or task description in the task look up.
11. Verify that search result records count and task records information is correct and matches search criteria.

**Result:**

Search result records count and task records information should be correct and matches search criteria.

## Scenario 11 - Verify technician can view task id only in the task lookup and Task field post selecting the task record when task description is not provided for the planned task

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add single or multiple planned tasks to work order.
3. Provide the task id only while adding tasks to work order.
4. Add item/material to storeroom with different bins.
5. Add assignments for labor.
6. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter the quantity.
9. Click on the right chevron for Task to open task look up.
10. Select a task record from task lookup. Selected task id and task description displays in Task field.
11. Click on the right chevron for Task to re-open task look up.
12. Verify that the task record selected in previous steps is highlighted in the task lookup.

**Result:**

- Technician should be able to view only task id in the task look up records.
- Selecting the task record should display task id only in the Task field and placeholder should be displayed for task description.
- The task record selected in previous steps should be highlighted with blue mark in the task lookup.

## Scenario 12 - Verify technician can select a transaction type (MATUSETRANS.ISSUETYPE). The default transaction type is Issue and other is Return

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter quantity of material.
9. Click on right chevron on Transaction type field to open Transaction type lookup.

**Result:**

- Default transaction type should be Issue.
- Issue and Return should be displayed as transaction type lookup records.
- Technician should be able to select the transaction type of material as 'Return'.
- Return should be displayed in Transaction type field after technician selects the Return in lookup.

## Scenario 13 - Verify when technician deselects material value then all other field values get cleared from the drawer

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter quantity of material.
9. Technician clicks on right chevron to again select the item/material.
10. Verify all other field values.

**Result:**

Values for storeroom, bin, Transaction type fields should get cleared when technician opens the material lookup to select the new item/material.

## Scenario 14 - Verify save is enabled only when technician has entered all the required information. If technician clear out a required field, the save button becomes disabled

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter quantity of material and select transaction type.
9. Select task from task lookup (if planned tasks are associated with work order).
10. Click on save button.


**Result:**

- Save button should be enabled and technician should be able to save the data.
- When technician clears out a required field e.g. material field, save button should become disabled.
- When technician enters a '0' in quantity field, then also, save button should become disabled.
- After Saving the transaction, the material record should be displayed in 'Materials used' section on report work page.
- In case, any error is generated, it should be displayed on error page. An example is when technician enter quantity of material more than current balance in inventory.

## Scenario 15 - Verify that current balance of the material should be reduced from the inventory after adding material used when Transaction type is 'Issue'

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter quantity of material and select transaction type as 'Issue'.
9. Select task from task lookup (if planned tasks are associated with work order).
10. Click on save button.

**Result:**

After using actual material from the inventory, current balance in inventory should be reduced by the material quantity issued.

## Scenario 16 - Verify that current balance of the material should be increased in the inventory after adding material used when Transaction type is 'Return'

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Add item/material to storeroom with different bins.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Open the technician-app and login with technician credentials.
2. Click on the 'My Schedule'.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter quantity of material and select transaction type as 'Return'.
9. Select task from task lookup (if planned tasks are associated with work order).
10. Click on save button.

**Result:**

After returning actual material to the inventory, current balance in inventory should be increased by the material quantity returned.

## Scenario 17 - Verify when the technician selected the material which is having the rotating asset then the rotating asset field is displayed

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a rotating item and add it to storeroom.
4. Create an asset and link it to the rotating item.
5. Add rotating asset for material/item.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the material which is having the rotating asset then the rotating asset field is displayed.

**Result:**

When the technician selected the material which is having the rotating asset then technician should be able see the rotating asset field.

## Scenario 18 - Verify technician can select a rotating asset record and the lookup record contains the ASSET.ASSETNUM and the ASSET.DESCRIPTION

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number, item description and add it to storeroom.
4. Add rotating asset for material/item.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Select the item/material which has associated rotating assets.
7. Open rotating asset lookup and verify that the lookup record contains the ASSET.ASSETNUM and the ASSET.DESCRIPTION.
8. Perform search using rotating asset number and/or asset description.

**Result:**

- Rotating asset lookup should be displayed to technician to select rotating asset when technician selects a material/item which has rotating assets associated with it.
- Rotating asset lookup record should contain the ASSET.ASSETNUM and the ASSET.DESCRIPTION.
- Technician should be able to select the rotating asset from the lookup.
- Technician should be able to search Rotating asset from lookup by asset number and/or asset description.
- Search records count and data should be correct and matches search criteria.

## Scenario 19 - Verify storeroom is auto-populated when there is only one to one relationship between storeroom and selected material/item and viceversa

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number and description and add it to storeroom.
4. Add rotating asset for material/item.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Verify storeroom is auto-populated, when there is only a one to one relationship storeroom for that material/item.
7. Verify storeroom will not be auto-populated when there is one to many relationship between selected material/item and storerooms.

**Result:**

- Storeroom should be auto-populated, when technician selects one to one relationship material/item
- Storeroom should not be auto-populated when there is one to many relationship between selected material/item and storerooms.

## Scenario 20 - Verify material drawer functionality if selected material/item have one to one relationship with storeroom and have multiple associated rotating assets

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number and description and add it to storeroom.
4. Add multiple rotating assets for material/item.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Verify material drawer functionality if selected material/item have one to one relationship with storeroom and have multiple associated rotating assets.

**Result:**

If the selected material/item have one to one relationship with storeroom and have multiple associated rotating assets then technician should need to select rotating asset manually.

## Scenario 21 - Verify material drawer functionality if selected material/item have multiple associated storerooms and rotating assets

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number and description.
4. Add multiple rotating assets for material/item.
5. Add multiple storerooms for material/item.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Verify material drawer functionality if selected material/item have multiple associated storerooms and rotating assets.

**Result:**

If the selected material/item have multiple associated storerooms and rotating assets then technician should need to select storeroom and rotating asset manually.

## Scenario 22 - Verify material drawer functionality if selected material/item have multiple associated storerooms and have only one associated rotating asset

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number and description.
4. Add rotating asset for material/item.
5. Add multiple storerooms for material/item.
6. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Verify material drawer functionality if selected material/item have multiple associated storerooms and have only one associated rotating asset.

**Result:**

If the selected material/item have multiple associated storerooms and have only one associated rotating asset then technician should need to select storeroom manually.

## Scenario 23 - Verify that the technician is unable to save material used record without filling data in required fields

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number and description and add it to storeroom.
4. Add rotating asset for material/item.
5. Approve the work order.

**Steps:**

1. Login to maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Enter all the mandatory fields then only technician will be able to save material used record.

**Result:**

When all the mandatory fields are filled then only technician should be able to save the material used record.

## Scenario 24 - Verify the saved item/material used record in the Report work view

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create a material/item with item number and description and add it to storeroom.
4. Add rotating asset for material/item.
5. Approve the work order.

**Steps:**

1. Login to maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add material.
6. Enter all the mandatory fields and save the record.
7. Verify the saved material used record displayed in the Report work view.

**Result:**

Technician should be able to see the saved material used record in the report work page.

## Scenario 25 - Verify technician can add conditioned enabled item as actual material

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create two condition codes, first with 100% condition code rate and the second with 60% condition code rate.
4. Create a material/item with item number.
5. Check the condition code checkbox.
6. Add condition code for 100% and 60% rate for the item.
7. Add item to storeroom and change status to active.

**Steps:**

1. Login to maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add condition enabled item/material.
6. Enter all the mandatory fields and save the record.
7. Verify the record is displayed in the Report work view.

**Result:**

Technician should be able to add conditioned enabled item as actual material in the report work page.

## Scenario 26 - Verify technician can add conditioned enabled item as actual material which is stored in multiple bins and condition codes combination

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create two condition codes, first with 100% condition code rate and the second with 60% condition code rate.
4. Create a material/item with item number.
5. Check the condition code checkbox.
6. Add condition code for 100% and 60% rate for the item.
7. Add item to storeroom S1 with bin1 and bin2 with different condition codes and change status to active.

**Steps:**

1. Login to maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add condition enabled item/material.
6. Select conditioned enabled item from lookup and storeroom is auto populated.
7. Bin lookup is displayed and select a bin, condition code combination.
8. Click on done.

**Result:**

- Bin lookup should display bin records having different bins and condition codes combination.
- Technician should be able to add item stored in multiple bins and condition codes combination.

## Scenario 27 - Verify technician can add conditioned enabled rotating item as actual material which is stored in multiple bins and condition codes combination

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order and add planned tasks.
3. Create two condition codes, first with 100% condition code rate and the second with 60% condition code rate.
4. Create a material/item with item number.
5. Check the condition code and rotating checkbox.
6. Add condition code for 100% and 60% rate for the item.
7. Add item to storeroom S1 with bin1 and bin2 with different condition codes and change status to active.
8. Go to assets and create asset and link it to rotating item and change status to active.

**Steps:**

1. Login to maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open report work page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to add condition enabled item/material.
6. Select conditioned enabled item from lookup and storeroom is auto populated.
7. Bin lookup is displayed and select a bin, condition code combination.
8. Rotating asset is auto populated.
9. Click on done.

**Result:**

- Bin lookup should display bin records having different bins and condition codes combination.
- Technician should be able to add rotating item stored in multiple bins and condition codes combination.

## Scenario 28 - Verify that dialog with save and discard options is not displayed when technician clicks on 'X' button without making any changes on add material sliding drawer

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Click on 'X' button to close the sliding drawer.
7. Verify that dialog with save and discard options is not displayed.

**Result:**

Dialog with save and discard options should not be displayed when technician clicks on 'X' button without making any changes on add material sliding drawer.

## Scenario 29 - Verify that dialog with save and discard options is displayed when technician clicks on 'X' button after making changes on add material sliding drawer

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Click on 'X' button to close the sliding drawer.
7. Verify that dialog with save and discard options is displayed.

**Result:**

Dialog with save and discard options should be displayed when technician clicks on 'X' button after making changes on add material sliding drawer.

## Scenario 30 - Verify that the material record is saved with updated and valid values when technician clicks on 'Save' button on dialog and add material drawer fields are updated

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Make changes to one or more fields on the add material sliding drawer so that there is no validation error message.
7. Click on 'X' button to close the sliding drawer.
8. Dialog with save and discard options is displayed.
9. Click 'Save' button on dialog with save and discard options.
10. Verify that material record is saved with updated values and saved material record is displayed in 'Materials used' section.

**Result:**

- Material record should be saved with updated values.
- New saved material record should be displayed in 'Materials used' section.
- Add material sliding drawer should be closed.

## Scenario 31 - Verify that material record is not saved when technician clicks on 'Discard' button and add material sliding drawer fields are updated

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Make changes to one or more fields on the add material sliding drawer so that there is no validation error message.
7. Click on 'X' button to close the sliding drawer.
8. Dialog with save and discard options is displayed.
9. Click 'Discard' button on dialog with save and discard options.
10. Verify that material record is not saved and updated values are discarded along with add material sliding drawer is closed.

**Result:**

- Material record should not be saved and updated values should be discarded.
- New material record should not be displayed in 'Materials used' section.
- Add material31 sliding drawer should be closed.

## Scenario 32 - Verify that material record is not saved when technician clicks on 'X' button on dialog with save/discard options and add material drawer fields are updated

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Make changes to one or more fields on the add material sliding drawer so that there is no validation error message.
7. Click on 'X' button to close the sliding drawer.
8. Click 'X' button on dialog with save and discard options.
9. Verify that material record is not saved and add material drawer should remain open with updated field values.

**Result:**

- Material record should not be saved.
- Add material sliding drawer should remain open with updated field values.

## Scenario 33 - Verify that the material record is not saved with updated values when technician clicks on 'Save' button on dialog and add material drawer fields have validation error

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Make changes to one or more fields on the add material sliding drawer so that there is validation error message displayed on add material drawer e.g. providing negative values.
7. Click on 'X' button to close the sliding drawer.
8. Click 'Save' button on dialog with save and discard options.
9. Verify that material record is not saved and add material sliding drawer is still open with updated field values.

**Result:**

Material recor33d should not be saved and add material sliding drawer should remain open with updated field values and validation error.

## Scenario 34 - Verify that material record is not saved with updated values when technician clicks on 'Discard' button on dialog and add material drawer fields have validation error

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Make changes to one or more fields on the add material sliding drawer so that there is validation error message displayed on add material drawer.
7. Click on 'X' button to close the sliding drawer.
8. Click 'Discard' button on dialog with save and discard options.
9. Verify that material record is not saved and updated values are discarded along with add material sliding drawer is closed.

**Result:**

- Material record should not be saved and updated values should be discarded.
- New material record should not be displayed in 'Materials used' section.
- Add material sliding drawer should be closed.

## Scenario 35 - Verify that "Add items +" button under 3 dot menu in Materials used section on Report work page is either disabled or hidden when technician do not have permission for reporting unplanned actual items/materials

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Actual material"(ACTUALMATERIAL) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Actual material"(ACTUALMATERIAL) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that "Add items +" button under 3 dot menu in Materials used section on Report work page is either disabled or hidden.

**Results:**

"Add items +" button under 3 dot menu in Materials used section on Report work page should be either disabled or hidden when technician do not have permission for reporting unplanned actual items/materials.

**Note:**35

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 36 - Verify that 3 dot menu in Materials used section on Report work page is hidden when technician do not have permissions for reporting unplanned actual items/materials as well as reserved items as actuals

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Actual material"(ACTUALMATERIAL) and "Actual reserv"(ACTUALRESERV) sig options in MXAPIWODETAIL Object Structure are enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Actual material"(ACTUALMATERIAL) and "Actual reserv"(ACTUALRESERV) sig options in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Verify that 3 dot menu in Materials used section on Report work page is hidden.

**Results:**

The 3 dot menu in Materials used section on Report work page should be hidden when technician do not have permissions for reporting unplanned actual items/materials as well as reserved items as actuals.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 37 - Verify UI of the cards/pages/views for fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design

**Pre-condition:**

1. Login to maximo/manage application as Admin.
2. Create a work order.
3. Create a material/item with item number and description and add it to storeroom.
4. Add assignments for labor.
5. Approve the work order.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on report work touch point to open 'Report work' page.
5. Click on 'Add items +' menu button in 3 dot menu in 'Materials used' section to open sliding drawer to add material.
6. Select the material from the lookup.
7. Select the storeroom and select bin (in case of multiple storerooms/bins).
8. Enter quantity of material and select transaction type.
9. Select task from task lookup (if planned tasks are associated with work order).
10. Click on 'Save' button.

**Result:**

Verify UI of the cards/pages for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.

## Scenario 38  - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
