# View and pick/check-off Materials and Tools functionality

These test cases will verify the UI, contents and pick/check-off functionality on Materials and Tool page. These will cover functionalities of following user stories:

1. GRAPHITE-13064: Eli can check off and keep track of the planned materials and tools that were issued to him
2. GRAPHITE-22526: (Split GRAPHITE-13064) Eli can select all planned materials and tools that were issued to him
3. GRAPHITE-32436: Eli can see planned storeroom on tools with reservations

**Note:**

1. In case of web app, all transactions are saved in database and refreshed on the UI in real time.
2. In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
3. In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.

## Scenario 1 - Verify that Eli can view all the planned materials required in the list which are listed by work order and has assosiated work order description

**Pre-condition:**

1. Open the classic and create new work order with planned Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option.
4. Verify that Eli can view all the added planned materials required in the list.
5. Verify that Eli can see a reference to the associated work order description.

**Results:**

- Eli should be able to view all the planned materials required in the list.
- Each item/tool should be listed by work order.
- Eli should be able to see a reference to the associated work order description.

## Scenario 2 - Verify that Eli can select/deselect all items/tools on single tap/click and can check off anything that has been issued to him related to tools/items

**Pre-condition:**

1. Open the classic and create new work order with planned Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option.
4. Verify that Eli can select all items on single tap/click.
5. Verify that Eli can select all tools on single tap/click.
6. Verify that Eli can select/deselect all items.
7. Verify that Eli can check off anything that has been issued to him related to tools.

**Results:**

- Eli should be able to select all items after check the checkbox of "All Materials".
- Eli should be able to select all tools after check the checkbox of "All Tools".
- Eli should be able to select/deselect all items using checkbox "All Materials" or items individual checkbox.
- Eli should be able to check off anything that has been issued to him related to tools/materials.
- Materials and Tools should be ordered by WO, and in the same order as the WO view.

## Scenario 3 - Verify that Eli can see the item which displays the ID and description, storeroom and planned quantity

**Pre-condition:**

1. Open the classic and create new work order with planned Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option.
4. Verify that Eli can see the item which displays the ID and description.
5. Verify that Eli can see the storeroom.
6. Verify that Eli can see the planned quantity.

**Results:**

- Eli should be able to see the item ID and their description.
- Eli should be able to see the storeroom.
- Eli should be able to see the planned quantity.

## Scenario 4 - Verify that materials/tools section is not displayed if there is no material/tool

**Pre-condition:**

1. Open the classic and create new work order with Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that materials section not displayed if there is no material.
5. Verify that tools section not displayed if there is no tool.

**Results:**

- Materials section shouldn't be displayed if there is no material.
- Tools section shouldn't be displayed if there is no tool.
- A text "No planned materials or tools" should be displayed in case if there is no planned tool or material exist.

## Scenario 5 - Verify that user Eli can view all the planned tools which required in the list

**Pre-condition:**

1. Open the classic and create new work order with Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that user Eli can view all the planned tools which required in the list.

**Results:**

Eli should be able to view all the planned tools which required in the list.

## Scenario 6 - Verify that Eli can see a reference to the associated work order description related to tools

**Pre-condition:**

1. Open the classic and create new work order with Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that Eli can see a reference to the associated work order description related to tools.
5. Verify that Eli can see the tool which displays the ID and description.

**Results:**

- Eli should be able to see a reference to the associated work order description related to tools.
- Eli should be able to see the tool ID and their description.

## Scenario 7 - Verify that Eli can see the planned quantity of tools

**Pre-condition:**

1. Open the classic and create new work order with Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that Eli can see the planned quantity of tools.
5. Verify that Eli can see the tools hours.

**Results:**

- Eli should be able to see the planned quantity of tools.
- Eli should be able to see the tools hours.

## Scenario 8 - Verify that Eli can select/deselect all tools

**Pre-condition:**

1. Open the classic and create new work order with Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that Eli can select/deselect all tools.

**Results:**

Eli should be able to select/deselect all tools using checkbox "All tools" or tools individual checkbox.

## Scenario 9 - Verify that Eli can leave the page to go back to WO list page after click on "Done" button in case of tools/items

**Pre-condition:**

1. Open the classic and create new work order with Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that Eli can leave the page to go back to WO list page after click on "Done" button in case of tools.

**Results:**

Eli should leave the page to go back to WO list page after click on "Done" button in case of tools/items.

## Scenario 10 - Verify that list if technician performs refresh, re-login or leave the page and come back after some time. 

**Pre-condition:**

1. Open the classic and create new work order with Materials and Tools and assign the labor as "eli/sam".

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option to open "Materials and Tools" page.
4. Verify that list is refreshed if Eli change the view on the top of the page.
5. Verify that selection is still there if Eli logs out and re-login there.
6. Verify that selection is still there if Eli leaves the page and comes back, even after some time.

**Results:**

- List should be refreshed if Eli changed the view on the top of the page.
- Selection should be there if Eli logs out and re-login there.
- Selection should be still there if Eli leaves the page and comes back, even after some time.

## Scenario 11 - Verify that associated storeroom name in planned tools should be shown in tools section under "Materials and Tools"

**Pre-condition:**

1. Open classic and create a new tool and add storeroom in it.
2. Create new work order with planned Materials and Tools and assign the labor as "eli/sam".

**Note:** Above created tool should be added in created WO.

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option and check the above created tool under Tools section. Also check the added storeroom name shown under it.

**Results:**

Created above tool and associated storeroom name in that tool should be shown under Tools section in "Materials and Tools".

## Scenario 12 - Verify that associated storeroom name should be placed between the tool name and the hours in tools section under "Materials and Tools" and viceversa

**Pre-condition:**

1. Open classic and create a new tool and add storeroom in it.
2. Create new work order with planned Materials and Tools and assign the labor as "eli/sam".

**Note:** Above created tool should be added in created WO.

**Steps:**

1. Open Technician mobile with credential eli/sam.
2. Go to their navigator page after click on 9 dots.
3. Click on "Materials and Tools" option and check the above created tool under Tools section. Also check the added storeroom name shown under it.
4. Click on "Materials and Tools" option and check the above created tool under Tools section. Also check that no storeroom name should be shown under it.

**Results:**

- Created above tool and associated storeroom name in that tool should be shown under Tools section between the tool name and the hours in "Materials and Tools".
- Created above tool should be shown under Tools section in "Materials and Tools" but no storeroom name should be shown.

**Note:** Storeroom name should use the same font, weight and size as hours.
