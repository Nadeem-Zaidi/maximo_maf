# Sorting WO list with different sort options as Priority, Status, Description, Asset, Location and WorkType

**Note:**

- In case of web app, all transactions are saved in database and refreshed on the UI in real time.
- In case of online mode on mobile containers, transactions are sent to the database for saving instantly but UI is not refreshed from database until 'Check Updates' button is clicked.
- In case of offline mode on mobile containers, transactions are queued for syncing to the database and synced to database once device is online. UI is not refreshed from database until 'Check Updates' button is clicked.
- All server side error messages will be displayed in error page on devices post syncing with server and tapping on 'Check Updates' button in both online and offline modes.

## Scenario 1 - Verify the sorting icon, default value of the badge, "+" button and badge count increase according to the sorting value selected

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that the sorting icon is present with badge count value to 1.
4. Click on the sorting icon.
5. Verify that the slider opens and by default priority sorting is selected with "+" button is present to add sorting values to the top.
6. Click on  any "+" button from the sort options.
7. Verify that the values are added to the top after clicking on the plus button.
8. Close the slider.
9. Verify that the badge count will be increased according to the sorting values selected.


**Result:**

- By default the value present in the sorting should be priority.
- Slider opens when clicked on the sorting icon.
- "+" button is visible in the sort options beside sorting values.
- Sorting value should be added when "+" button is clicked.
- The sorting should be present with badge value as 1 on the WO list page.
- Badge count should be increased according to the sorting value selected.

## Scenario 2 - Verify sorting functionality works as per the value selected 

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the sorting icon.
4. Select any value from sorting ex. Priority, Status, Description, Asset, Location and WorkType.
5. Verify that the WO displayed according to the sorting value selected on the WO list page.
6. Again click on the sorting icon .
7. Remove all the sorting values including priority.
8. Close the slider.
9. Verify that the pop-up icon is displayed with "Reset to the default or select at least one sort order." message with "Reset" and "select" buttons.
10. Click on select button and add one sorting value.
11. Click on the "Reset" button.
12. Verify that all the changes are gone and only priority value is present by default.

**Result:**

- WO should be displayed according to the sorting value selected on the WO list page.
- If no sorting value is selected , the pop-up should always display with "Reset" and "select" buttons.
- "Reset" button should undo all the changes.

**Note**

-The sorting original state will not be preserved when moved to different pages and then coming back .

## Scenario 3 - Verify the filter icon, default value when clicked on filter icon ,  badge count when filter selected after clicking on All or any records, and search should work according to the filter selected on the right side

**Pre-condition:**

1. Login with admin credentials in Maximo classic/Manage.
2. Go to work order tracking application.
3. Create a new work order.
4. Add assignments for labor and approve the work order.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to the work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Verify that the Filter icon is present.
4. Click on the Filter icon.
5. Verify that the Filter screen opens up and by default first Filter is selected.
6. Select Any filter value Asset, Location, Status and WorkType.
7. The data on the right side should be displayed as per the filter selected.
8. Click on All Records with any filter selected Asset, Location, Status and WorkType.
9. Verify that the badge count will be displayed according to the filter values selected. 
10. Remove all the filters selected by clicking on the cross icon.
11. Select All records/one record associated with all filters Asset, Location, Status and WorkType.
12. Click on Done button.
13. Verify user is navigated to the WO list page and badge count of the filters selected on the filter icon.
14. Verify that the values on the WO list page are according to the filter selected.

**Result:**

- Filter Icon should only be present in the WO list page.
- By default when filter page is opened, first filter is selected.
- Page opens up when clicked on the Filter icon.
- The data on the right side should be displayed as per the filter selected.
- The badge count should be displayed according to the filter values selected.
- Verify reset should work to undo the changes made.
- Cross icon should be clicked to remove the filtering.
- All records/one records with badge count will be visible with the filter selected.
- The filter icon should display the badge count according to the filters selected.
- The WO list page should display the values as per filters selected on the filters page.

**Note:**

- Verify the same in approvals application as well.

## Scenario 4 - Verify UI of the fonts, font sizes, color, text completeness, alignment, positioning etc. is correct and as per design on mobile and other small & large screen devices for all supported form factors

**Pre-condition:**

Pre-conditions as specified for above-mentioned test scenarios.

**Steps:**

1. Login to Maximo mobile app with the credentials of technician assigned to work order.
2. Click on "My Schedule" tile to open the list of assigned work orders.
3. Click on the sorting and filter icon one by one.
4. Verify UI for fonts, font sizes, font color, text completeness, alignment, positioning etc. is correct and as per design.
5. Navigate and perform above-mentioned test scenarios on mobile and other small screen devices for all supported form factors.

**Result:**

- UI of the  for fonts, font sizes, color, text completeness, alignment, positioning etc. should be correct and as per design.
- There should be no UI related issues.
- Drag and drop should work.
- up and down icon should be present with sorting values.
- plus icon should be present to add the sorting value to the top .
- FILTER
- Done button should be in the blue color , checkbox should be present to select filter values.
- Cross icon should be present .
- The application should behave as per expectations for all above-mentioned test scenarios on mobile and other small screen devices for all supported form factors.
- The UI should be as per design for respective form factor.

## Scenario 5 - Verify all the above test scenarios on mobile devices in online and offline mode

**Pre-condition:**

Pre-conditions as specified for above-mentioned test scenarios.

**Steps:**

Perform steps as specified for above-mentioned test scenarios.

**Results:**

The application should behave as per expectations for all above-mentioned test scenarios on mobile devices in online and offline mode.