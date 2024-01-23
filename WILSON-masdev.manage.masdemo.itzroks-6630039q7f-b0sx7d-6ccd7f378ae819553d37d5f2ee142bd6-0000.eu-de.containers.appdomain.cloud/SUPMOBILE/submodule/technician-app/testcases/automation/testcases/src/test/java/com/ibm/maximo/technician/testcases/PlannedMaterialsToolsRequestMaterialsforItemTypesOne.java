package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.google.gson.Gson;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
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
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;

/**
 * Scenario 9 - Verify contents of planned materials and tools sliding drawer when multiple planned materials and tools are added to work order
 * https://jsw.ibm.com/browse/GRAPHITE-51071 - [TECHMOBILE] Planned Material and Tools touch point and Material request :44M,6TA,0A
 * 
 * Steps:
 * 1. Login to technician app with the technician assigned to work order.
 * 2. Click on "My Schedule" tile.
 * 3. Find the work order created in pre-condition steps in "Assigned Work" filter.
 * 4. Click on planned materials and tools touchpoint to open "Materials and tools" sliding drawer.
 * 5. Verify the contents of the planned materials and tools sliding drawer.
 * 
 * Result:
 * The contents of the planned materials and tools sliding drawer should be:
 * - Header title should be "Materials and tools".
 * - Cart icon for requesting materials should be displayed on extreme right of header. (WO details page only)
 * - Both Materials and Tools sections should be displayed.
 * - Materials section should display all planned items and materials associated with the work order.
 * - Tools section should display all planned tools associated with the work order.
 *
 * For each material, following fields should be displayed:
	- Item ID: WPMATERIAL.ITEMNUM
	- Description: WPMATERIAL.DESCRIPTION
	- Quantity: WPMATERIAL.ITEMQTY (font size 20px)
	- Storeroom: LOCATIONS.DESCRIPTION
	
 * For each tool, following fields should be displayed:
	- Tool ID: WPTOOL.ITEMNUM
	- Description: WPTOOL.DESCRIPTION
	- Quantity: WPTOOL.ITEMQTY (font size 20px)
	- Hours: WPTOOL.HOURS
	- Storeroom: LOCATIONS.DESCRIPTION
 * 
 * Tool Hours and Storeroom description should be displayed in separate lines for each Tool. Even if, Tool Hours is 0, it should be displayed in Tools section.
 * Verify this scenario for various combinations of data like having

	Quantity as zero, small integer, decimal, big/huge quantity etc.
	Store, Material and/or Tool description as large text, special characters etc.
	Hours as integer, having minutes data, large/high hours.
 * 
 * @author evelynmurasaki
 *
 */


public class PlannedMaterialsToolsRequestMaterialsforItemTypesOne extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(PlannedMaterialsToolsRequestMaterialsforItemTypesOne.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, woDescription, labor, location, locationDescription, assetDescription;
	private String itemNum, itemDescription, itemId, tool0, toolDescription0, tool1, toolDescription1, tool2, toolDescription2;
	private String materialDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
	private String cardId = "cardtemplate1[0]_chevron";
	
	
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************PlannedMaterialsToolsRequestMaterialsforItemTypesOne*********************************");
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

	@Test(groups = { "mobile" }, description = "Scenario 9 - Verify contents of planned materials and tools sliding drawer when multiple planned materials and tools are added to work order", timeOut = 820000)
	public void PlannedMaterialsToolsRequestMaterialsforItemTypes9() throws Exception {

		// Open work order details
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		
		logger.info("3. Find the work order created in pre-condition steps in \"Assigned Work\" filter.");
		assertTrue(assignedWorkPage.search(woNum), "Fail : Search Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		
		logger.info("4. Click on planned materials and tools touchpoint to open \"Materials and tools\" sliding drawer.");
		workOrderDetailsPage.clickMaterialAndToolTouchpoint();
		
		logger.info("Verify the contents of the planned materials and tools sliding drawer.");
		// Result:
		//	 * The contents of the planned materials and tools sliding drawer should be:
		//	 * - Header title should be "Materials and tools".
		logger.info("Header title should be \"Materials and tools");
		assertEquals("Materials and tools", workOrderDetailsPage.getMaterialsToolsSlidingDrawerHeaderLabel());
		
		//	 * - Cart icon for requesting materials should be displayed on extreme right of header. (WO details page only)
		logger.info("Cart icon for requesting materials should be displayed on extreme right of header.");
		workOrderDetailsPage.clickMaterialAndToolMenu();
		assertTrue(workOrderDetailsPage.isShoppingCartExist());
		workOrderDetailsPage.clickMaterialAndToolMenu();
		
		//	 * - Both Materials and Tools sections should be displayed.
		logger.info("Both Materials and Tools sections should be displayed.");
		assertEquals("Materials",workOrderDetailsPage.getMaterialsToolsSlidingDrawerMaterialsLabel());
		assertEquals("Tools",workOrderDetailsPage.getMaterialsToolsSlidingDrawerToolsLabel());
		
		//	 * - Materials section should display all planned items and materials associated with the work order.
		logger.info("Materials section should display all planned items and materials associated with the work order.");
		assertTrue(workOrderDetailsPage.isMaterialExist(woNum, itemNum, itemDescription, locationDescription, "1234567.45"));
		assertTrue(workOrderDetailsPage.isMaterialExist(woNum, null, materialDescription, null, "0"));
		
		//	 * - Tools section should display all planned tools associated with the work order.
		assertTrue(workOrderDetailsPage.isToolExist(woNum, tool0, toolDescription0, "123", "30", locationDescription, "123456.45"));
		assertTrue(workOrderDetailsPage.isToolExist(woNum, tool1, toolDescription1, null, "30", locationDescription, "0"));
		//tool2 created with no description on purpose
		assertTrue(workOrderDetailsPage.isToolExist(woNum, tool2, null, null, null, locationDescription, "123456.45"));

	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(25).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		assetDescription = AbstractAutomationFramework.randomString(100).toUpperCase();
		newAsset.setDescription(assetDescription);
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
		itemIdQueryFromDB();
		
		// item status change and rolldown
		logger.info("Item status change to Active");
		List<ItemChangeStatus> arr = new ArrayList<>();
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

	}

	protected String itemIdQueryFromDB() {
		String query = "select I.itemid from MAXIMO.item I where I.itemnum = '" + itemNum + "' and I.itemsetid= '" + SetupData.ITEMSET + "'";
		logger.info(query);
		Object[] resultsObjects = jdbcConnection.executeSQL(query);
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		itemId = resultArray1[0].toString();
		logger.info("itemId>" + itemId);
		return itemId;
	}


}
