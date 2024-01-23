package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.google.gson.Gson;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Item;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;

import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.ToolItem;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.WpMaterial;
import com.ibm.maximo.automation.mobile.api.json.WpTool;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;

/**
 * Scenario 24 - Verify user can add multiple material request from the material request page by clicking on "+" button in material section
 * https://jsw.ibm.com/browse/GRAPHITE-51071 - [TECHMOBILE] Planned Material and Tools touch point and Material request :44M,6TA,0A
 * 
 * Pre-condition:
 * - Login to maximo/manage application as admin.
 * - Create a work order.
 * - Add planned items/materials and/or tools to work order.
 * - Assign labor/technician to work order in Assignments tab.
 * - Approve the work order.
 * - Create multiple items in item master, activate and add to a storeroom.
 * Steps:
 * 1. Login to technician app with the technician assigned to work order.
 * 2. Click on "My Schedule" tile.
 * 3. Find the work order created in pre-condition steps in "Assigned Work" filter and click on it to open WO details page.
 * 4. Click on planned materials and tools touchpoint to open "Materials and tools" sliding drawer.
 * 5. Click on shopping cart button to open "Material request" page.
 * 6. Click on the "+" button in Materials list section to open "Add item" sliding drawer.
 * 7. Click on '>' chevron in Item field to open item lookup.
 * 8. Search first item which was created in pre-condition steps, in item lookup and select it.
 * 9. Click on save/checkmark button on "Add item" sliding drawer.
 * 10. Click on the "+" button in Materials list section again to select another item and save it.
 * 11. Again click on "+" button in material list section, select another item and save it.
 * 12. Fill all the mandatory details in Request details section and click on send button.
 * 
 * Result:
 * - Three MR requests should be displayed in Material list section.
 * - For each material request in Material list section, Material name and description along with storeroom description is displayed. Also, value of quantity is displayed.
 * - Verify user should be able to successfully save the request i.e. for each MR record an associated MRLINE record is created in database after user has clicked the send button.
 * 
 * Scenario 28 - Verify each "Material request" will be an individual MR with a single MRLINE record and when technician requests a second item, a new MR with associated MRLINE is created
 * 
 * Steps:
 * 10. Provide values for Priority, "Required date" and "Drop to" fields.
 * 11. Click on Send button to save the Material request record.
 * 12. Repeat steps 6 to 11 in order to create new MR request for some other item.
 * 
 * Result:
 * - Each "Material request" should be an individual MR with a single MRLINE record and when technician requests a second item, a new MR with associated MRLINE should be created.
 * - All fields for each MR record and associated MR line record should be saved correctly. Refer previous scenario for fields details.
 * 
 * Scenario 31 - Verify material requests for the work order is displayed in the planned materials and tools sliding drawer
 * with following MR details: MRNUM, STATUS and REQUESTEDDATE, when technician has successfully submitted the MR
 * 
 * Technician is navigated to materials and tools sliding drawer.
 * Verify material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
 *
 * Result:
 *
 * After clicking on 'send' button, technician should be navigated to the materials and tools sliding drawer.
 * Material request created should be displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
 * MRNUM will be empty until material request is synced with the server.
 * 
 * Scenario 33 - Verify that the item sliding drawer is displayed with MR Line data in read only mode when technician clicks on chevron on each MR Line in material list section
 * 
 * Steps: 
 * 8. Material request created in previous steps is displayed with following fields: MRNUM, STATUS, REQUESTEDDATE with respective values.
 * 9. Click on the chevron next to the MR record on the materials and tools sliding drawer to open MR page.
 * 10. Click on chevron on each MR Line in material list section.
 * 11. Verify item sliding drawer is displayed with MR Line data in read only mode.
 * 
 * Result:
 * - The item sliding drawer should be displayed with MR Line data in read only mode.
 * - Item sliding drawer should have: Type, item number, description, storeroom, quantity, order unit, manufacturer and vendor fields with respective values.
 * 
 * Scenario 42 - Verify the Material request which is in a draft status, then user should be able to "delete" a material request in offline mode
 * 
 * 
 * @author evelynmurasaki @gabriel.bonamico
 *
 */


public class PlannedMaterialsToolsRequestMaterialsforItemTypesThree extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(PlannedMaterialsToolsRequestMaterialsforItemTypesThree.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, woDescription, labor, location, locationDescription, assetDescription;
	private String itemNum, itemDescription, itemId, tool0, toolDescription0, tool1, toolDescription1, tool2;
	private String itemNum1, itemDescription1, itemNum2, location2, itemNum3, itemDescription3;
	private String materialDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
	private String cardId = "cardtemplate1[0]_chevron";
	private String navigatorClick = "NavigatorMenuButton";
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************PlannedMaterialsToolsRequestMaterialsforItemTypesThree*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			maximoApi = new MaximoApi();
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));
			
			createDefaultObjects();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		logger.info(" * 1. Login to technician app with the technician assigned to work order.\n"
				+   " * 2. Click on \"My Schedule\" tile.");
		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		// Change WO status to Completed
		logger.info("Changing work order status to COMP");
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = { "mobile" }, description = "Scenarios 28, 31 and 33", timeOut = 860000)

	public void PlannedMaterialsToolsRequestMaterialsforItemTypesScenario24() throws Exception {

		// Open work order details
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);

		logger.info("3. Find the work order created in pre-condition steps in \"Assigned Work\" filter.");
		assertTrue(assignedWorkPage.search(woNum), "Fail : Search Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		
		logger.info("4. Click on planned materials and tools touchpoint to open \"Materials and tools\" sliding drawer.");
		workOrderDetailsPage.clickMaterialAndToolTouchpoint();
		
		logger.info("5. Click on shopping cart button to open \"Material request\" page.");
		workOrderDetailsPage.clickMaterialAndToolMenu();
		workOrderDetailsPage.clickShoppingCart();

		logger.info("6. Click on the \"+\" button in Materials list section to open \"Add item\" sliding drawer.");
		workOrderDetailsPage.clickAddMaterialIcon();
		
		logger.info("7. Click on '>' chevron in Item field to open item lookup.");
		workOrderDetailsPage.clickItemChevron();

		logger.info("8. Search first item which was created in pre-condition steps, in item lookup and select it.");
		workOrderDetailsPage.searchForItemAndSelectItem(itemNum1, itemIdQueryFromDB(itemNum1));
		workOrderDetailsPage.typeQuantityMaterialRequestAddItemSlidingDrawer("1.1");
		
		logger.info("9. Click on save/checkmark button on \"Add item\" sliding drawer.");
		workOrderDetailsPage.clickSaveAddItem();
		workOrderDetailsPage.requiredDateUnderRequiredDetailsOfMaterialRequest(2022, 10, 20);
		String priority1 = String.valueOf(AbstractAutomationFramework.randomInt());
		if (priority1.equals("0")) {
			priority1 = String.valueOf(AbstractAutomationFramework.randomInt());
		}
		workOrderDetailsPage.setPriorityOnMaterialRequest(String.valueOf(priority1));
		String droppoint1 = AbstractAutomationFramework.randomString(12).toUpperCase();
		workOrderDetailsPage.dropToMaterialRequest(droppoint1);
		workOrderDetailsPage.sendMaterialRequest();
		
		logger.info("10. Click on the \"+\" button in Materials list section again to select another item and save it.");
		//TODO remove duplicated clickMaterialAndToolMenu when defect is resolved: GRAPHITE-54876 - [Technician] - Mobile - Materials and Tools sliding drawer refreshes twice when you click on something
		Thread.sleep(9000);
		workOrderDetailsPage.clickMaterialAndToolMenu();
		workOrderDetailsPage.clickShoppingCart();
		workOrderDetailsPage.clickAddMaterialIcon();
		workOrderDetailsPage.clickItemChevron();
		//TODO  take a look at this method with defect GRAPHITE-54792 - [Technician] - Select Item Search field from Work Order Page > Materials and Tools > Request Materials > Add Item is pre-populated with previous entry
		workOrderDetailsPage.searchForItemAndSelectItem(itemNum2, itemIdQueryFromDB(itemNum2));
		workOrderDetailsPage.typeQuantityMaterialRequestAddItemSlidingDrawer("2.2");
		workOrderDetailsPage.clickSaveAddItem();
		workOrderDetailsPage.requiredDateUnderRequiredDetailsOfMaterialRequest(2022, 10, 21);
		String priority2 = String.valueOf(AbstractAutomationFramework.randomInt());
		if (priority2.equals("0")) {
			priority2 = String.valueOf(AbstractAutomationFramework.randomInt());
		}
		workOrderDetailsPage.setPriorityOnMaterialRequest(String.valueOf(priority2));
		String droppoint2 = AbstractAutomationFramework.randomString(12).toUpperCase();
		workOrderDetailsPage.dropToMaterialRequest(droppoint2);
		workOrderDetailsPage.sendMaterialRequest();
		
		logger.info("11. Again click on \"+\" button in material list section, select another item and save it.");
		//TODO remove duplicated clickMaterialAndToolMenu when defect is resolved: GRAPHITE-54876 - [Technician] - Mobile - Materials and Tools sliding drawer refreshes twice when you click on something
		Thread.sleep(3000);
		workOrderDetailsPage.clickMaterialAndToolMenu();
		workOrderDetailsPage.clickShoppingCart();
		workOrderDetailsPage.clickAddMaterialIcon();
		workOrderDetailsPage.clickItemChevron();
		//TODO  take a look at this method with defect GRAPHITE-54792 - [Technician] - Select Item Search field from Work Order Page > Materials and Tools > Request Materials > Add Item is pre-populated with previous entry
		workOrderDetailsPage.searchForItemAndSelectItem(itemNum3, itemIdQueryFromDB(itemNum3));
		workOrderDetailsPage.typeQuantityMaterialRequestAddItemSlidingDrawer("3.3");
		workOrderDetailsPage.clickSaveAddItem();
		
		logger.info("12. Fill all the mandatory details in Request details section and click on send button.");
		workOrderDetailsPage.requiredDateUnderRequiredDetailsOfMaterialRequest(2022, 10, 22);
		String priority3 = String.valueOf(AbstractAutomationFramework.randomInt());
		if (priority3.equals("0")) {
			priority3 = String.valueOf(AbstractAutomationFramework.randomInt());
		}
		workOrderDetailsPage.setPriorityOnMaterialRequest(String.valueOf(priority3));
		String droppoint3 = AbstractAutomationFramework.randomString(12).toUpperCase();
		workOrderDetailsPage.dropToMaterialRequest(droppoint3);
		workOrderDetailsPage.sendMaterialRequest();
		Thread.sleep(3000);
		/**
		 * Scenario 24:
		 * - Three MR requests should be displayed in Material list section.
		 * - For each material request in Material list section, Material name and description along with storeroom description is displayed. Also, value of quantity is displayed.
		 * - Verify user should be able to successfully save the request i.e. for each MR record an associated MRLINE record is created in database after user has clicked the send button.
		 * 
		 * Scenario 28:
		 * - Each "Material request" should be an individual MR with a single MRLINE record and when technician requests a second item, a new MR with associated MRLINE should be created.
		 * - All fields for each MR record and associated MR line record should be saved correctly. Refer previous scenario for fields details.
		 */
		logger.info("Three MR requests should be displayed in Material list section.");
		Thread.sleep(3000);
		String mrnum = workOrderDetailsPage.getMRNUM(woNum, itemNum3, location2);
		Thread.sleep(3000);
		String mrnum2 = workOrderDetailsPage.getMRNUM(woNum, itemNum2, location2);
		String mrnum3 = workOrderDetailsPage.getMRNUM(woNum, itemNum1, location);
		
		//Scenario 31 - Verify material requests for the work order is displayed in the planned materials and tools sliding drawer
		//with following MR details: MRNUM, STATUS and REQUESTEDDATE, when technician has successfully submitted the MR
		
		//getting values
		String[]MaterialRequest = workOrderDetailsPage.getRequestedMaterialListChevron(woNum, itemNum1, location);
		String[]MaterialRequest2 = workOrderDetailsPage.getRequestedMaterialListChevron(woNum, itemNum2, location2);
		String[]MaterialRequest3 = workOrderDetailsPage.getRequestedMaterialListChevron(woNum, itemNum3, location2);

		
		//asserting MRNUM, REQUESTEDDATE and STATUS 
		assertEquals(mrnum3, MaterialRequest[0]);
		assertEquals("10/20/22", MaterialRequest[1]);
		assertEquals("Draft", MaterialRequest[2]);
		
		assertEquals(mrnum2, MaterialRequest2[0]);
		assertEquals("10/21/22", MaterialRequest2[1]);
		assertEquals("Draft", MaterialRequest2[2]);
		
		assertEquals(mrnum, MaterialRequest3[0]);
		assertEquals("10/22/22", MaterialRequest3[1]);
		assertEquals("Draft", MaterialRequest3[2]);

		
		//Scenario 42 - Deleting second MR
		workOrderDetailsPage.clickRequestedMaterialListChevron(woNum, itemNum2, location2);
		workOrderDetailsPage.deleteRequest();
		af.waitForElementToBePresent(By.id("slidingwodetailsmaterials_headerLabel"));
		Thread.sleep(30000);
		assertFalse(workOrderDetailsPage.isMrExist(2));

	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		
		// Creating storeroom without description
		logger.info("Creating an storeroom");
		location2 = AbstractAutomationFramework.randomString(12).toUpperCase();
		String storeRoomResult2 = maximoApi.retrieve(new StoreRoom(),
				"lean=1&addid=1&action=system:new&ignorecollectionref=1");
		StoreRoom storeRoom2 = new Gson().fromJson(storeRoomResult2, StoreRoom.class);
		storeRoom2.setLocation(location2);

		maximoApi.create(storeRoom2);
		logger.info("storeRoom location: " + location2);
		
		// Creating the item with description and added to storeroom without description
		logger.info("Creating an item");
		itemNum3 = AbstractAutomationFramework.randomString(30).toUpperCase();
		String itemResult3 = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item3 = new Gson().fromJson(itemResult3, Item.class);
		item3.setItemNum(itemNum3);
		item3.setRotating(true);
		itemDescription3 = AbstractAutomationFramework.randomString(100).toUpperCase();
		item3.setDescription(itemDescription3);
		maximoApi.create(item3);
		logger.info("ItemNum: " + itemNum3);
		itemIdQueryFromDB(itemNum3);
		
		// item status change and rolldown
		logger.info("Item status change to Active");
		ItemChangeStatus itemChangeStatus5 = new ItemChangeStatus();
		List<ItemChangeStatus> arr = new ArrayList<>();
		itemChangeStatus5.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus5.setRollDown("true");
		arr.add(itemChangeStatus5);
		item3.setItemChangeStatus(arr);
		maximoApi.update(item3);
		logger.info("Item status changed");

		// add Item to StoreRoom
		maximoApi.addItemToStoreRoom(itemNum3, SetupData.ITEMSET, location2, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "1234567.45", SetupData.DFLTBIN, "", "", "0.0", "1234567.45", "0.0", "0", "0", "0.0", "0.0", "true");
		logger.info("added Item to StoreRoom successfully");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(25).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		assetDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
		newAsset.setDescription(assetDescription);
		newAsset.setManufacturer(SetupData.MANUFACTURER);
		newAsset.setItemNum(itemNum3);
		maximoApi.create(newAsset);
		logger.info("Asset: " + assetNum);

		// Create a work order
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		woDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
		newWorkOrder.setDescription(woDescription);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setGlaccount(SetupData.GLDEBITACCT);

		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: " + woNum);

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Creating storeroom
		logger.info("Creating an storeroom");
		location = AbstractAutomationFramework.randomString(12).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"lean=1&addid=1&action=system:new&ignorecollectionref=1");
		StoreRoom storeRoom = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		locationDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
		storeRoom.setDescription(locationDescription);
		storeRoom.setLocation(location);

		maximoApi.create(storeRoom);
		logger.info("storeRoom location: " + location);
		
		// Creating the item
		logger.info("Creating an item");
		itemNum = AbstractAutomationFramework.randomString(30).toUpperCase();
		String itemResult = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item = new Gson().fromJson(itemResult, Item.class);
		item.setItemNum(itemNum);
		itemDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
		item.setDescription(itemDescription);
		maximoApi.create(item);
		logger.info("ItemNum: " + itemNum);
		itemIdQueryFromDB(itemNum);
		
		// item status change and rolldown
		logger.info("Item status change to Active");
		ItemChangeStatus ics = new ItemChangeStatus();
		ics.setStatus(ItemStatus.ACTIVE.toString());
		ics.setRollDown("true");
		arr.add(ics);
		item.setItemChangeStatus(arr);
		maximoApi.update(item);
		logger.info("Item status changed");

		// add Item to StoreRoom
		maximoApi.addItemToStoreRoom(itemNum, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "1234567.45", SetupData.DFLTBIN, "", "", "0.0", "1234567.45", "0.0", "0", "0", "0.0", "0.0", "true");
		logger.info("added Item to StoreRoom successfully");

		
		logger.info("Adding item to wpmaterial");
		WpMaterial wpmaterial = new WpMaterial();
		wpmaterial.setLinetype(SetupData.LineType.ITEM.toString());
		wpmaterial.setItemNum(itemNum);
		wpmaterial.setItemQty(1234567.45);
		wpmaterial.setLocation(location);
		List<WpMaterial> wpMaterialArray = new ArrayList<WpMaterial>();
		wpMaterialArray.add(wpmaterial);
		
		logger.info("Adding material to wpmaterial");
		materialDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
		WpMaterial wpmaterial1 = new WpMaterial();
		wpmaterial1.setLinetype(SetupData.LineType.MATERIAL.toString());
		wpmaterial1.setDescription(materialDescription);
		wpmaterial1.setItemQty(0);
		wpMaterialArray.add(wpmaterial1);
		newWorkOrder.setWpMaterial(wpMaterialArray);
				
		// Creating a tool
		logger.info("Creating a tool");
		tool0 = AbstractAutomationFramework.randomString(30).toUpperCase();
		toolDescription0 = AbstractAutomationFramework.randomString(100).toUpperCase();

		String toolItemResult = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem = new Gson().fromJson(toolItemResult, ToolItem.class);
		toolItem.setItemNum(tool0);
		toolItem.setDescription(toolDescription0);
		maximoApi.create(toolItem);
		logger.info("ToolItem: " + tool0);

		// item status change and rolldown
		logger.info("Changing Tool Status");
		//List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus itemChangeStatus = new ItemChangeStatus();
		itemChangeStatus.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus.setRollDown("true");
		arr.add(itemChangeStatus);
		toolItem.setItemChangeStatus(arr);
		maximoApi.update(toolItem);
		logger.info("Tool API status changed");
		

		// Add Tool to StoreRoom
		maximoApi.addItemToStoreRoom(tool0, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "123456.45", SetupData.DFLTBIN, "", "", "0.0", "123456.45", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added Tool to StoreRoom successfully");

		// Adding Tool to Workorder
		logger.info("Adding wptool");
		WpTool wptool = new WpTool();
		wptool.setItemNum(toolItem.getItemNum());
		wptool.setItemQty(123456.45);
		wptool.setRate(1);
		wptool.setReservereq(true);
		wptool.setHours("123.5");
		List<WpTool> wpToolArray = new ArrayList<WpTool>();
		wpToolArray.add(wptool);
		
		//
		// Creating a tool
		logger.info("Creating a tool");
		tool1 = AbstractAutomationFramework.randomString(30).toUpperCase();
		toolDescription1 = AbstractAutomationFramework.randomString(100).toUpperCase();

		String toolItemResult1 = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem1 = new Gson().fromJson(toolItemResult1, ToolItem.class);
		toolItem1.setItemNum(tool1);
		toolItem1.setDescription(toolDescription1);
		maximoApi.create(toolItem1);
		logger.info("ToolItem: " + tool1);

		// item status change and rolldown
		logger.info("Changing Tool Status");
		//List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus itemChangeStatus1 = new ItemChangeStatus();
		itemChangeStatus1.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus1.setRollDown("true");
		arr.add(itemChangeStatus1);
		toolItem1.setItemChangeStatus(arr);
		maximoApi.update(toolItem1);
		logger.info("Tool API status changed");
		

		// Add Tool to StoreRoom
		maximoApi.addItemToStoreRoom(tool1, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "123456.45", SetupData.DFLTBIN, "", "", "0.0", "123456.45", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added Tool to StoreRoom successfully");

		// Adding Tool to Workorder
		logger.info("Adding wptool");
		WpTool wptool1 = new WpTool();
		wptool1.setItemNum(toolItem1.getItemNum());
		wptool1.setItemQty(0);
		wptool1.setRate(1);
		wptool1.setReservereq(true);
		wptool1.setHours("0.5");
		wpToolArray.add(wptool1);
		
		//
		// Creating a tool
		logger.info("Creating a tool");
		tool2 = AbstractAutomationFramework.randomString(30).toUpperCase();
		//creating tool2 without description on purpose to validate different fulfillment 
		//toolDescription2 = AbstractAutomationFramework.randomString(100).toUpperCase();

		String toolItemResult2 = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem2 = new Gson().fromJson(toolItemResult2, ToolItem.class);
		toolItem2.setItemNum(tool2);
		//toolItem2.setDescription(toolDescription2);
		maximoApi.create(toolItem2);
		logger.info("ToolItem: " + tool2);

		// item status change and rolldown
		logger.info("Changing Tool Status");
		//List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus itemChangeStatus2 = new ItemChangeStatus();
		itemChangeStatus2.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus2.setRollDown("true");
		arr.add(itemChangeStatus2);
		toolItem2.setItemChangeStatus(arr);
		maximoApi.update(toolItem2);
		logger.info("Tool API status changed");
		

		// Add Tool to StoreRoom
		maximoApi.addItemToStoreRoom(tool2, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "123456.45", SetupData.DFLTBIN, "", "", "0.0", "123456.45", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added Tool to StoreRoom successfully");

		// Adding Tool to Workorder
		logger.info("Adding wptool");
		WpTool wptool2 = new WpTool();
		wptool2.setItemNum(toolItem2.getItemNum());
		wptool2.setItemQty(123456.45);
		wptool2.setRate(1);
		wptool2.setReservereq(true);
		wpToolArray.add(wptool2);
		
		newWorkOrder.setWpTool(wpToolArray);
		maximoApi.update(newWorkOrder);
	
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("APPR WO");
		
		
		//Creating multiple items to be requested later
		
		// Creating the item with description and added to storeroom with description
		logger.info("Creating an item");
		itemNum1 = AbstractAutomationFramework.randomString(30).toUpperCase();
		String itemResult1 = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item1 = new Gson().fromJson(itemResult1, Item.class);
		item1.setItemNum(itemNum1);
		itemDescription1 = AbstractAutomationFramework.randomString(100).toUpperCase();
		item1.setDescription(itemDescription1);
		maximoApi.create(item1);
		logger.info("ItemNum: " + itemNum1);
		itemIdQueryFromDB(itemNum1);
		
		// item status change and rolldown
		logger.info("Item status change to Active");
		ItemChangeStatus itemChangeStatus3 = new ItemChangeStatus();
		itemChangeStatus3.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus3.setRollDown("true");
		arr.add(itemChangeStatus3);
		item1.setItemChangeStatus(arr);
		maximoApi.update(item1);
		logger.info("Item status changed");

		// add Item to StoreRoom
		maximoApi.addItemToStoreRoom(itemNum1, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "1234567.45", SetupData.DFLTBIN, "", "", "0.0", "1234567.45", "0.0", "0", "0", "0.0", "0.0", "true");
		logger.info("added Item to StoreRoom successfully");
		
		// Creating the item without description and added to storeroom without description
		logger.info("Creating an item");
		itemNum2 = AbstractAutomationFramework.randomString(30).toUpperCase();
		String itemResult2 = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item2 = new Gson().fromJson(itemResult2, Item.class);
		item2.setItemNum(itemNum2);
		maximoApi.create(item2);
		logger.info("ItemNum: " + itemNum2);
		itemIdQueryFromDB(itemNum2);
		
		// item status change and rolldown
		logger.info("Item status change to Active");
		ItemChangeStatus itemChangeStatus4 = new ItemChangeStatus();
		itemChangeStatus4.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus4.setRollDown("true");
		arr.add(itemChangeStatus4);
		item2.setItemChangeStatus(arr);
		maximoApi.update(item2);
		logger.info("Item status changed");

		// add Item to StoreRoom
		maximoApi.addItemToStoreRoom(itemNum2, SetupData.ITEMSET, location2, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "1234567.45", SetupData.DFLTBIN, "", "", "0.0", "1234567.45", "0.0", "0", "0", "0.0", "0.0", "true");
		logger.info("added Item to StoreRoom successfully");

	}

	protected String itemIdQueryFromDB(String itemnum) {
		String query = "select I.itemid from MAXIMO.item I where I.itemnum = '" + itemnum + "' and I.itemsetid= '" + SetupData.ITEMSET + "'";
		logger.info(query);
		Object[] resultsObjects = jdbcConnection.executeSQL(query);
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		itemId = resultArray1[0].toString();
		logger.info("itemId>" + itemId);
		return itemId;
	}


}
