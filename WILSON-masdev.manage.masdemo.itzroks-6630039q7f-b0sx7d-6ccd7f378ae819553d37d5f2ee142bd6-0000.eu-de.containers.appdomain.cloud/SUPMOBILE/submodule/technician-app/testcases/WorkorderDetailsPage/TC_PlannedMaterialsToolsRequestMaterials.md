# Planned materials & tools and request materials for item types functionality

These test cases will verify UI and contents of planned materials & tools and request materials for item types functionality for WO list and WO details pages on Technician web app, online and offline mode on mobile containers.

These test cases will cover functionalities of following user stories:

- GRAPHITE-10419: Eli can access planned materials and tools from his WO card
- GRAPHITE-10441: Eli can access planned materials and tools from his WO details view
- GRAPHITE-19527: Eli can see all the pertinent information relating to planned materials and tools
- GRAPHITE-31583: Eli can request materials for item types (view only)
- GRAPHITE-36394: Eli can save material requests for item types
- GRAPHITE-38558: Eli can create MRs with multiple materials
- GRAPHITE-36418: Eli can access material requests he has made
- GRAPHITE-38799: Eli should be able to delete the entire Material request
- GRAPHITE-38823: Eli can access material requests LINES for additional details
- GRAPHITE-38775: Eli should be able to delete a Material LINES from its Material request
- GRAPHITE-18345: Eli must not be able to access pages and actions where he does not have permission

Design URLs:

- <https://ibm.invisionapp.com/share/PHO03SD9VJY#/319495738_Planned_Materials_And_Tools>
- <https://ibm.invisionapp.com/share/NJO10TQHTRX#/screens/319914291_2-_Material_Request_-_Work_Order>
- <https://ibm.invisionapp.com/share/NJO10TQHTRX#/screens/319914293>
- <https://ibm.invisionapp.com/share/NJO10TQHTRX#/screens/319914291>
- <https://ibm.invisionapp.com/share/NJO10TQHTRX#/screens/319914313>
- <https://ibm.invisionapp.com/share/NJO10TQHTRX#/screens/319914314>

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check for Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check for Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check for Updates' button in both online and offline modes.

## Scenario 1 - Verify unavailability of planned materials and tools touch-point on WO list when no planned materials and tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Do not add planned items/materials and tools.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Verify that planned materials and tools touch-point is unavailable on work order card in WO list page.

**Result:**

Planned materials and tools touch-point should be unavailable on work order card in WO list page.

## Scenario 2 - Verify availability of planned materials and tools touch-point on WO details when no planned materials and tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Do not add planned items/materials and tools.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the work order to open wo details page.
5. Verify that planned materials and tools touch-point is available on WO details page.

**Result:**

- Planned materials and tools touch-point should be available on WO details page.
- It should appear on the left by default.

## Scenario 3 - Verify availability of planned materials and tools touch-point on WO list and WO details when at least one planned material and no planned tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items and materials.
4. Do not add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Verify that planned materials and tools touch-point is available on work order card in WO list and WO details pages.

**Result:**

- Planned materials and tools touch-point should be available on work order card in WO list and WO details pages.
- It should appear on the left by default.

## Scenario 4 - Verify availability of planned materials and tools touch-point on WO list and WO details when at least one planned tool and no planned materials are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Do not add planned items and materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Verify that planned materials and tools touch-point is available on work order card in WO list and WO details pages.

**Result:**

- Planned materials and tools touch-point should be available on work order card in WO list and WO details pages.
- It should appear on the left by default.

## Scenario 5 - Verify availability of planned materials and tools touch-point on WO list and WO details when multiple planned materials and tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items and/or materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Verify that planned materials and tools touch-point is available on work order card in WO list and WO details pages.

**Result:**

- Planned materials and tools touch-point should be available on work order card in WO list and WO details pages.
- It should appear on the left by default.

## Scenario 6 - Verify contents of planned materials and tools sliding drawer on WO details when no planned materials and tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Do not add planned items and/or materials.
4. Do not add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click the work order to open wo details page.
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Verify the contents of the planned materials and tools sliding drawer.

**Result:**

The contents of the planned materials and tools sliding drawer should be:

- Header title should be "Materials and tools".
- Cart icon for requesting materials should be displayed on extreme right of header.
- No materials and tools sections should be displayed.
- Message "No planned materials and tools to show" should be displayed.
- Sub message "Click the cart to request materials" should be displayed.

## Scenario 7 - Verify contents of planned materials and tools sliding drawer when only planned materials are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items and/or materials.
4. Do not add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Verify the contents of the planned materials and tools sliding drawer.

**Result:**

The contents of the planned materials and tools sliding drawer should be:

- Header title should be "Materials".
- Cart icon for requesting materials should be displayed on extreme right of header. (WO details page only)
- Only Materials section and no Tools section should be displayed. There should be no Materials sub header in Materials section.
- Materials section should display all planned items and materials associated with the work order.

For each material, following fields should be displayed:

- Item ID: WPMATERIAL.ITEMNUM
- Description: WPMATERIAL.DESCRIPTION
- Quantity: WPMATERIAL.ITEMQTY (font size 20px)
- Storeroom: LOCATIONS.DESCRIPTION

**Note:**

Verify this scenario for various combinations of data like having:

- Quantity as zero, small integer, decimal, big/huge quantity etc.
- Store and/or Material Description as large text, special characters etc.

## Scenario 8 - Verify contents of planned materials and tools sliding drawer when only planned tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Do not add planned items and materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Verify the contents of the planned materials and tools sliding drawer.

**Result:**

The contents of the planned materials and tools sliding drawer should be:

- Header title should be "Tools".
- Cart icon for requesting materials should be displayed on extreme right of header. (WO details page only)
- Only Tools section and no Materials section should be displayed. There should be no Tools sub header in Tools section.
- Tools section should display all planned tools associated with the work order.

For each tool, following fields should be displayed:

- Tool ID: WPTOOL.ITEMNUM
- Description: WPTOOL.DESCRIPTION
- Quantity: WPTOOL.ITEMQTY (font size 20px)
- Hours: WPTOOL.HOURS
- Storeroom: LOCATIONS.DESCRIPTION

**Note:**

Tool Hours and Storeroom description should be displayed in separate lines for each Tool. Even if, Tool Hours is 0, it should be displayed in Tools section.

Verify this scenario for various combinations of data like having

- Quantity as zero, small integer, decimal, big/huge quantity etc.
- Store and/or Tool description as large text, special characters etc.
- Hours as integer, having minutes data, large/high hours.

## Scenario 9 - Verify contents of planned materials and tools sliding drawer when multiple planned materials and tools are added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items and/or materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Verify the contents of the planned materials and tools sliding drawer.

**Result:**

The contents of the planned materials and tools sliding drawer should be:

- Header title should be "Materials and tools".
- Cart icon for requesting materials should be displayed on extreme right of header. (WO details page only)
- Both Materials and Tools sections should be displayed.
- Materials section should display all planned items and materials associated with the work order.
- Tools section should display all planned tools associated with the work order.

For each material, following fields should be displayed:

- Item ID: WPMATERIAL.ITEMNUM
- Description: WPMATERIAL.DESCRIPTION
- Quantity: WPMATERIAL.ITEMQTY (font size 20px)
- Storeroom: LOCATIONS.DESCRIPTION

For each tool, following fields should be displayed:

- Tool ID: WPTOOL.ITEMNUM
- Description: WPTOOL.DESCRIPTION
- Quantity: WPTOOL.ITEMQTY (font size 20px)
- Hours: WPTOOL.HOURS
- Storeroom: LOCATIONS.DESCRIPTION

**Note:**

Tool Hours and Storeroom description should be displayed in separate lines for each Tool. Even if, Tool Hours is 0, it should be displayed in Tools section.

Verify this scenario for various combinations of data like having

- Quantity as zero, small integer, decimal, big/huge quantity etc.
- Store, Material and/or Tool description as large text, special characters etc.
- Hours as integer, having minutes data, large/high hours.

## Scenario 10 - Verify upon clicking the "X" button on planned materials and tools sliding drawer, it closes and technician is brought back to WO list page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items and/or materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click "X" button on top left of the drawer.
6. Verify planned materials and tools sliding drawer closes and technician is brought back to WO list page.

**Result:**

Planned materials and tools sliding drawer should close and technician should be brought back to WO list page.

## Scenario 11 - Verify upon clicking the "X" button on planned materials and tools sliding drawer, it closes and WO details page is displayed

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items and/or materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click "X" button on top left of the drawer.
6. Verify planned materials and tools sliding drawer closes and WO details is displayed for the opened work order.

**Result:**

Planned materials and tools sliding drawer should close and WO details should be displayed for the opened work order.

## Scenario 12 - Verify that the shopping cart button on planned materials and tools drawer is not displayed when WO status is either of Waiting on approval, Completed, Closed or Canceled (or any synonyms)

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create multiple work orders.
3. Add planned items and/or materials.
4. Add planned tools.
5. Assign labor/technician to work order in Assignments tab.
6. Approve the work order.

**Steps:**

1. Login to technician app with the technician assigned to work orders.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Change the work order status to either of Waiting on approval, Completed, Closed or Canceled (or any synonyms).
5. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
6. Verify that the shopping cart button on planned materials and tools drawer is not displayed.

**Result:**

The shopping cart button on planned materials and tools drawer should not be displayed for work orders having WO status as either of Waiting on approval, Completed, Closed or Canceled (or any synonyms).

## Scenario 13 - Verify that on tapping the shopping cart button, the material request page opens

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to storeroom(s).

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button.
6. Verify that on clicking the shopping cart button, the material request page opens.

**Result:**

On clicking the shopping cart button, the material request page should open.

## Scenario 14 - Verify availability of '+' button to add an item to material request

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to storeroom(s).

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Verify availability of '+' button to add an item to material request.

**Result:**

'+' button should be available to add an item to material request.

## Scenario 15 - Verify contents of material request page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to storeroom(s).

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Verify contents of material request page.

**Result:**

Material request page should have following contents:

- "Material request" header title with back and disabled Send button.
- "Materials list" section with '+' button and "Add material" readonly placeholder.
- "Required date", Priority and "Drop to" fields.
- "Required date" and Priority are mandatory fields.

## Scenario 16 - Verify contents of "Add item" sliding drawer when technician taps on '+' button in Materials list section

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to storeroom(s).

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Verify contents of "Add item" sliding drawer.

**Result:**

"Add item" sliding drawer should have following contents:

- "Add item" header title with back and disabled checkmark button.
- "Type" field with value Item.
- "Item" field with placeholders for Item Id and Item Description and chevron to open Item lookup. It is mandatory field.
- "Quantity" numeric spinner with default value as "1.00". It is mandatory field.

## Scenario 17 - Verify search and selecting item functionality in item lookup

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to storeroom(s).

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Perform item search using item number and description. Search results should be correct.
9. Scan an item barcode/QR code and verify search can be performed using barcode/QR code scanner.
10. Verify technician can tap an item in the item lookup search results to select it.

**Result:**

- Technician should be able to search item using name and description as well as barcode/QR code scanner in the item lookup.
- Tapping on an item record in lookup results should select that item.

## Scenario 18 - Verify storeroom is auto-populated when there is only one storeroom associated with selected item

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Verify the fields displayed in "Add item" sliding drawer.

**Result:**

Storeroom should be auto-populated when there is only one storeroom associated with selected item.

"Add item" sliding drawer should have following contents:

- "Type" field with value Item.
- "Item" field with Item Id and Item Description for the selected item and chevron to open Item lookup. It is mandatory field.
- "Storeroom" field with Storeroom description of the storeroom associated with selected item and available quantity.
- "Quantity" numeric spinner with default value as "1.00". It is mandatory field.
- "Order unit" of the selected item.
- "Manufacturer" of the selected item. If manufacturer is not provided then placeholder is displayed.
- "Vendor" of the selected item. If vendor is not provided then placeholder is displayed.

## Scenario 19 - Verify storeroom lookup is displayed to select storeroom if multiple storerooms are associated with selected item

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to multiple storerooms.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Storeroom lookup opens and technician selects a storeroom.
10. Verify the fields displayed in "Add item" sliding drawer.

**Result:**

Storeroom lookup should be displayed to select storeroom if multiple storerooms are associated with selected item.

The storeroom lookup should have following contents:

- Item description as header title of the storeroom lookup.
- Search field to search the storeroom.
- Storeroom records with storeroom description and available item quantity in storeroom.

"Add item" sliding drawer should have following contents after selecting the item and storeroom:

- "Type" field with value Item.
- "Item" field with Item Id and Item Description for the selected item and chevron to open Item lookup. It is mandatory field.
- "Storeroom" field with Storeroom description of the selected storeroom associated with selected item and available quantity.
- "Quantity" numeric spinner with default value as "1.00". It is mandatory field.
- "Order unit" of the selected item.
- "Manufacturer" of the selected item. If manufacturer is not provided then placeholder is displayed.
- "Vendor" of the selected item. If vendor is not provided then placeholder is displayed.

## Scenario 20 - Verify various validation and business rules for the quantity field on "Add item" sliding drawer

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Verify various validation and business rules for the quantity field on "Add item" sliding drawer.

**Result:**

- The default value of quantity should be "1.00".
- Technician can enter the quantity up to two decimal places only.
- Client side validation error should be displayed in case zero or negative quantity is provided.

## Scenario 21 - Verify save/checkmark button is enabled only when all the mandatory fields are provided on "Add item" sliding drawer

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Assign labor/technician to work order in Assignments tab.
4. Approve the work order.
5. Create an item in item master, activate and add it to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Provide all mandatory fields value.

**Result:**

- Save/checkmark button should be enabled with blue color and technician should be able to save the item request.
- Clearing out any mandatory field or providing "0" or negative quantity should disable the save/checkmark button.

## Scenario 22 - Verify the contents of "Material request" page after adding/saving the item in Materials list section

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add it to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer.

**Result:**

The "Material request" page should have following contents:

- "Material request" header title with back and disabled Send button.
- "Materials list" section with '+' button and saved/added item with item ID, item description, storeroom description, quantity information.
- "Required date", Priority and "Drop to" fields.
- "Required date" and Priority are mandatory fields.

## Scenario 23 - Verify the contents of "Material request" page after technician adds a new item to Materials List section

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create multiple items in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search first item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer.
10. Click on the "+" button in Materials list section again to select another item and save it.

**Result:**

The existing item record in Materials list section should be replaced with the newly selected item record.

The "Material request" page should have following contents:

- "Material request" header title with back and disabled Send button.
- "Materials list" section with '+' button and newly saved/added item with item ID, item description, storeroom description, quantity information.
- "Required date", Priority and "Drop to" fields.
- "Required date" and Priority are mandatory fields.

## Scenario 24 - Verify user can add multiple material request from the material request page by clicking on "+" button in material section

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create multiple items in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search first item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer.
10. Click on the "+" button in Materials list section again to select another item and save it.
11. Again click on "+" button in material list section, select another item and save it.
12. Fill all the mandatory details in Request details section and click on send button.

**Result:**

- Three MR requests should be displayed in Material list section.
- For each material request in Material list section, Material name and description along with storeroom description is displayed. Also, value of quantity is displayed.
- Verify user should be able to successfully save the request i.e. for each MR record an associated MRLINE record is created in database after user has clicked the send button.

## Scenario 25 - Verify user can add multiple material request for same material from the material request section by clicking on "+" button

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create multiple items in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search first item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer.
10. Click on the "+" button in Materials list section again to select the same item and save it.
11. Fill all the mandatory details in Request details section and click on send button.

**Result:**

- Two MR requests should be displayed in Material list section.
- Verify user should be able to successfully save the request i.e. for each MR record an associated MRLINE record is created in database after user clicks on send button.

## Scenario 26 - Verify Send button is enabled only when all the mandatory fields are provided on Material Request page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add it to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer to add item record in "Materials list" section.
10. Provide valid values of Priority and "Required date" fields.

**Result:**

- Send button should be enabled with blue color when all the mandatory fields are provided on "Material request" page.
- Clearing out any mandatory field or providing invalid values in Priority and "Required date" fields should disable the send button.

## Scenario 27 - Verify various fields of MR and MR Line record when technician saves/sends the Material request successfully

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add it to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer to add item record in "Materials list" section.
10. Provide values for Priority, "Required date" and "Drop to" fields.
11. Click on Send button to save the Material request record.
12. Verify various fields value of MR record and associated MR Line record in UI, Maximo classic and/or database.

**Result:**

MR record with an associated MRLINE record should be created successfully as per the information provided by technician. Most of the other information should be defaulted based on the technician and the work order details.

The MR and MRLINE fields and their default behavior/validation should be as per below:

***MR Fields***

- MRNUM - Standard mobile numbering (NEW1 etc.) Server side processing provides official MRNUM.
- DESCRIPTION – This will be autogenerated as ‘Material Request for Work Order xxxx’.
- REQUESTEDBY – Defaults to Current User.
- REQUESTEDFOR – Defaults to Current User.
- *REQUIREDDATE – As provided by technician while creating MR.
- *PRIORITY – As provided by technician while creating MR.
- *DROPPOINT – As provided by technician while creating MR or placeholder/blank, if not provided.
- GLDEBITACCT – Defaults based on work order and server side rules for merging.
- WONUM – Default from workorder#. Must not be in status WAPPR, COMP, CLOSED, or CAN.
- LOCATION – Workorder’s location.
- ASSET – Workorder’s asset.
- SITEID – Work Order’s Site.
- ORGID – Work Order’s Org.
- STATUS – Defaults on core.
- STATUSDATE – defaults based on time of creation of MR record.

***MRLINE fields***

- MRNUM – Identifies the MR the MR line belongs to.
- MRLINENUM – The unique line item number for the MR – This will be auto numbered as 1.
- *LINETYPE – For this story, this defaults to item.
- *ITEMNUM – As provided by technician while creating MR Line.
- *DESCRIPTION – Displays read-only Description of the item. As provided by technician while creating MR Line.
- *MANUFACTURER – requires company lookup. Defaults to item's manufacturer in core. (It is Asset's Manufacturer that is associated to this Rotating Item)
- *MODELNUM – defaults to model number of item entered.
- *CATALOGCODE – defaults to the catalog code of item entered.
- *QTY – As provided by technician while creating MR Line.
- *ORDERUNIT – Defaults based on item, but user can modify (must be valid unit of measure).
- ISSUEUNIT – Defaults based on item server side.
- *CONVERSION- This will default based on storeroom. Editable if line type is Item or Tool. Read-Only otherwise.
- UNITCOST – Defaults (on core side) based on the ITEM/STORE/VENDOR defined.
- LINECOST – Calculated on core side.
- CURRENCYCODE – Defaults on core based on vendor.
- *VENDOR – requires a lookup – must be a vendor. (It is Asset's Vendor that is associated to this Rotating Item)
- *STORELOC - requires a lookup – must be a storeroom. Defaults based on user’s default storeroom. If the item does not exist in that storeroom, defaults to the item’s default storeroom.
- GLDEBITACCT – Defaults server side based on existing rules.
- INSPECTIONREQUIRED – Defaults (on core side) based on the ITEMNUM/VENDOR defined.
- REQUIREDDATE – Defaults from the header - MR record.
- ISDISTRIBUTED – Defaults to N.
- ATTACHMENTS – Defaults to N.

## Scenario 28 - Verify each "Material request" will be an individual MR with a single MRLINE record and when technician requests a second item, a new MR with associated MRLINE is created

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create multiple items in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the first item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer to add item record in "Materials list" section.
10. Provide values for Priority, "Required date" and "Drop to" fields.
11. Click on Send button to save the Material request record.
12. Repeat steps 6 to 11 in order to create new MR request for some other item.

**Result:**

- Each "Material request" should be an individual MR with a single MRLINE record and when technician requests a second item, a new MR with associated MRLINE should be created.
- All fields for each MR record and associated MR line record should be saved correctly. Refer previous scenario for fields details.

## Scenario 29 - Verify confirmation dialog for "Save or discard changes?" is displayed if technician has added an item to Materials List section and/or modified other data and clicks back button on "Material request" page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
7. Click on '>' chevron in Item field to open item lookup.
8. Search the item which was created in pre-condition steps, in item lookup and select it.
9. Click on save/checkmark button on "Add item" sliding drawer to add item record in "Materials list" section.
10. Provide values for Priority, "Required date" and/or "Drop to" fields.
11. Click on back button on "Material request" page.

**Result:**

A confirmation dialog for "Save or discard changes?" with Discard and Save buttons should be displayed. The details and functionality of the dialog should be:

- Dialog title should be "Save or discard changes?" with 'X' button.
- Dialog contents should be "To leave this page, you must first discard or save your changes." with Discard and Save buttons.
- Clicking Discard or 'X' button should not create the MR and MR Line record.
- Clicking Save button should create new MR and MR Line record as per the information provided while creating MR.

## Scenario 30 - Verify no confirmation dialog for "Save or discard changes?" is displayed if technician has not added/modified any data on "Material request" page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on back button on "Material request" page.

**Result:**

No confirmation dialog for "Save or discard changes?" should be displayed as technician has not added/modified any data on "Material request" page.

## Scenario 31 - Verify material requests for the work order is displayed in the planned materials and tools sliding drawer with following MR details: MRNUM, STATUS and REQUESTEDDATE, when technician has successfully submitted the MR

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer.
8. Verify material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.

**Result:**

- After clicking on 'send' button, technician should be navigated to the materials and tools sliding drawer.
- Material request created should be displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
- MRNUM will be empty until material request is synced with the server.

## Scenario 32 - Verify the material request page is displayed with MR record data in read only mode when technician clicks on chevron on MR record on the planned materials and tools sliding drawer

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer.
8. Material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
9. Click on the chevron next to the MR record on the materials and tools sliding drawer.
10. Verify that the material request page is displayed with MR record data in read only mode.

**Result:**

- The material request page should be displayed in read only mode.
- Each MR line should have: item number, description, quantity, storeroom and a right chevron.
- MR record should have REQUIREDDATE, PRIORITY and DROPPOINT in read only mode.

## Scenario 33 - Verify that the item sliding drawer is displayed with MR Line data in read only mode when technician clicks on chevron on each MR Line in material list section

 **Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer.
8. Material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
9. Click on the chevron next to the MR record on the materials and tools sliding drawer to open MR page.
10. Click on chevron on each MR Line in material list section.
11. Verify item sliding drawer is displayed with MR Line data in read only mode.

**Result:**

- The item sliding drawer should be displayed with MR Line data in read only mode.
- Item sliding drawer should have: Type, item number, description, storeroom, quantity, order unit, manufacturer and vendor fields with respective values.

## Scenario 34 - Verify technician is navigated back to the materials and tools sliding drawer when technician clicks on done or back chevron on MR page

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer.
8. Material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
9. Click on the chevron next to the MR record on the materials and tools sliding drawer to open MR page.
10. Click on done or back button on MR page.
11. Verify technician is navigated back to the materials and tools sliding drawer.

**Result:**

Technician should be navigated back to the materials and tools sliding drawer upon clicking on done or back chevron on MR page.

## Scenario 35 - Verify "No planned materials and tools to show" text is displayed on planned materials and tools sliding drawer when no planned materials or tools are added to work order and there is/are existing material requests added to work order

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Do not add any planned item/material and/or tool to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer and material request created in previous steps is displayed.
8. Verify "No planned materials and tools to show" text is displayed above the MR record on planned materials and tools sliding drawer.

**Result:**

"No planned materials and tools to show" text should be displayed above the MR record on planned materials and tools sliding drawer.

## Scenario 36 - Verify shopping cart button is not available on Planned materials and tools drawer if newly created work order is not synced with Maximo server (Applicable for mobile devices only in offline mode)

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with technician credentials on device.
2. Click on "My Schedule" tile.
3. Make device offline by enabling airplane mode on device.
4. Click on "+" button on navigator to open create work order page.
5. Provide description, priority and click save to create a new work order.
6. Open the newly created work order from "Work created locally" view.
7. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
8. Verify that shopping cart button is not displayed.

**Result:**

Shopping cart button should not be displayed on Planned materials and tools drawer as newly created work order is not synced with Maximo server yet.

## Scenario 37 - Verify the Material request which is in a draft status, then user should be able to "delete" a material request

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer.
8. Material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
9. Click on the chevron next to the MR record on the materials and tools sliding drawer in draft status.
10. User lands on Material request details page and verify "Delete request" button is displayed on MR details page.

**Result:**

- Verify user is displayed with "Delete request" button on the right bottom of the MR page in red color with a trash icon.
- Verify clicking on delete button, user should be able to delete the MR request successfully.
- Verify after deleting the MR request, when user go back to "Tools and Material" drawer, MR which was in draft status should be removed from the list.
- Also, verify that the status of MR request has been changed to "CANCEL" in Maximo.

## Scenario 38 - Verify user should be able to access the Material request lines submitted by the user for that work order on the sliding drawer for planned materials in read only, non-editable mode

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material list section and fill the details.
7. Again, Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
8. User is navigated to "Tools and Material" sliding drawer.
9. Click on the chevron icon next to material request created in step 7 on "Tools and Material" Sliding drawer.

**Result:**

- Verify user is navigated to material details page, displaying the MR lines data in "Material list" section and "Request detail" data in non editable mode.
- Verify for each MR line the following data is displayed, item id with description, storeroom description and quantity. Also, chevron icon is displayed besides each MR line.

## Scenario 39 - Verify clicking on chevron icon for Material request line, opens the MR line data details in read only, non-editable mode

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material list section and fill the details.
7. Again, Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
8. User is navigated to "Tools and Material" sliding drawer.
9. Click on the chevron icon next to material request created in step 7 on "Tools and Material" Sliding drawer.
10. User is navigated to MR details page and click on chevron icon next to MR line in "Material list" section.

**Result:**

- Verify, when user clicks on the chevron icon next to any MR line in "Material list" section, user is displayed MR line details in read only mode.
- Verify the following fields will be in read only mode Type, Item including description, Storeroom, Quantity, Order unit, Manufacturer, Vendor.

## Scenario 40 - Verify user should be able to delete the MR lines from the material request before submitting it to the server

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields .
7. Click on the chevron icon next to MR line.

**Result:**

- Verify user should be able to see a "Delete item" button at the bottom of the page with red font.
- Verify, clicking on "Delete item" delete the MR line from the "Material list" section.

## Scenario 41 - Verify once user has submitted the Material request to the server, user should not be able to delete MR line requests

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. User is navigated to "Tools and Material" sliding drawer.
8. Click on the chevron icon next to material request created in step 6 on "Tools and Material" Sliding drawer.
9. User is navigated to MR details page and click on chevron icon next to MR line in "Material list" section.

**Result:**

Verify "Delete item" button is not displayed on the Material request line details page. Hence, MR line can't be deleted from a MR submitted to server.

## Scenario 42 - Verify the Material request which is in a draft status, then user should be able to "delete" a material request in offline mode

**Pre-condition:**

1. Login to maximo/manage application as admin.
2. Create a work order.
3. Add planned items/materials and/or tools to work order.
4. Assign labor/technician to work order in Assignments tab.
5. Approve the work order.
6. Create an item in item master, activate and add to a storeroom.

**Steps:**

1. Login to technician app with the technician assigned to work order.
2. Click on "My Schedule" tile.
3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
4. Click on planned materials and tools touch-point to open "Materials and tools" sliding drawer.
5. Click on shopping cart button to open "Material request" page.
6. Click on "+" icon in material section and add material and also fill values in required fields and click on send button.
7. Technician is navigated to materials and tools sliding drawer.
8. Material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
9. Turn on airplane mode and application enters in offline mode.
10. Click on the chevron next to the MR record on the materials and tools sliding drawer in draft status.
11. User lands on the Material request details page and verify "Delete request" button is displayed on MR details page in offline mode.

**Result:**

Verify when the MR record is deleted, it should be removed immediately from the UI, however MR status in classic should be changed upon syncing with the server.

## Scenario 43 - Verify that "Request materials" button under 3 dot menu in planned materials and tools drawer on WO details page is either disabled or hidden when technician do not have permission to create material request

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Create MR"(CREATEMR) sig option in MXAPIWODETAIL Object Structure is enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permission for "Create MR"(CREATEMR) sig option in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on planned materials and tools touch point to open 'Materials and tools' sliding drawer.
5. Verify that "Request materials" button under 3 dot menu in planned materials and tools drawer on WO details page is either disabled or hidden.

**Results:**

The "Request materials" button under 3 dot menu in planned materials and tools drawer on WO details page should be either disabled or hidden when technician do not have permission to create material request.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 44 - Verify that 3 dot menu in planned materials and tools drawer on WO details page is hidden when technician do not have permissions for creating material request as well as reporting reserved items as actuals

**Pre-condition:**

1. Login to Maximo classic application as admin.
2. Go to Users application and search for technician user.
3. Open technician user and go to Security groups tab.
4. "Create MR"(CREATEMR) and "Actual reserv"(ACTUALRESERV) sig options in MXAPIWODETAIL Object Structure are enabled by default in TECHMOBILE security template. It can be verified using "Technician" tools and tasks in Applications tab for Technician security group.
5. Remove permissions for "Create MR"(CREATEMR) and "Actual reserv"(ACTUALRESERV) sig options in MXAPIWODETAIL Object Structure from each of the assigned security group to the technician user.
6. Create a new work order, add assignments for labor/technician and approve the work order.
7. Log off all users assigned to modified security groups or restart the maximo server.

**Steps:**

1. Login to Maximo mobile app with the technician assigned to work order.
2. Click on 'My Schedule' tile.
3. Search the work order and click on chevron on work order card to open the work order details page.
4. Click on planned materials and tools touch point to open 'Materials and tools' sliding drawer.
5. Verify that 3 dot menu in planned materials and tools drawer on WO details page is hidden.

**Results:**

The 3 dot menu in planned materials and tools drawer on WO details page should be hidden when technician do not have permissions for creating material request as well as reporting reserved items as actuals.

**Note:**

Please make sure to revert the permission to allowed once testing is completed.

## Scenario 45 - Verify all the above test scenarios on mobile and other small screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

1. Login to technician-app with the technician assigned to work order.
2. Navigate and perform above mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- The application should behave as per expectations for all above mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 46 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above mentioned test scenarios.

**Steps:**

Perform steps as specified for above mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above mentioned test scenarios on mobile devices in online and offline mode.
