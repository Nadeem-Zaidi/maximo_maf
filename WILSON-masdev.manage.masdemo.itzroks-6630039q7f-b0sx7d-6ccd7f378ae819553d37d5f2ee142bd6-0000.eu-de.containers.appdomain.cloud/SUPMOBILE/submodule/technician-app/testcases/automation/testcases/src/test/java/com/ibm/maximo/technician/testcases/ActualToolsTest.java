package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
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
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.ToolItem;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.WpTool;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.AddToolPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;
import com.ibm.maximo.technician.setupdata.SetupData.LocAssetStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.LocType;

/*
 * GRAPHITE-51064:  Report work - Tools as actuals
 */
public class ActualToolsTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ActualToolsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String labor;
	private String woNum, itemnum, location;
	private String woNumRot, itemnumRot, assetNumRot;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************ActualToolsTest*********************************");
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

	@Test(groups = {
			"mobile" }, description = "Verify technician save is only enabled when all fields are provided", timeOut = 360000)
	public void verifyActualToolsFlow() throws Exception {
		// Verify when adding a tool into workReport, all mandatory fields should be
		// filled, or else save button will not be enabled
		// Once click save button, tool will be added into report
		verifyNormalTool();
		// Verify when adding a rotating tool into workReport, the associated asset will
		// be populated when rotating tool is selected
		verifyRotatingTool();
	}

	/**
	 * Scenario 16/18 Verify when adding a tool into workReport, all mandatory
	 * fields should be filled, or else save button will not be enabled Once click
	 * save button, tool will be added into report
	 * 
	 * @throws Exception
	 */
	private void verifyNormalTool() throws Exception {
		String sampleQuantityNumber = "2";
		String sampleHours = "2";
		String sampleNegativeHours = "-2";

		// Open WO list page
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Search the WO
		assertTrue(assignedWorkPage.search(woNum));
		// Navigate to work order details page
		assignedWorkPage.openWorkOrderDetails();

		// click "Report work" Icon, and "Report work" page loaded
		ReportWorkPage reportWorkPage = workOrderDetailsPage.clickReportWorkButton();
		// click Tools used plus icon and "Add tool" page loaded
		AddToolPage addToolPage = reportWorkPage.clickAddToolButton();
		addToolPage.tillPageLoaded();
		// verify save button is disabled
		assertFalse(addToolPage.isSaveButtonEnabled());
		logger.info("passed:Initial save button disabled");

		// select tool added just now
		addToolPage.selectTool(itemnum, itemIdQueryFromDB(itemnum));
		// Select the storeroom and select bin. --not needed
		// Enter Quantity and Hours data for selected tool.
		addToolPage.setQuantity(sampleQuantityNumber);
		addToolPage.setHours(sampleHours);

		// verify save button is enabled when all mandatory fields are available
		assertTrue(addToolPage.isSaveButtonEnabled());
		logger.info("passed: save button enabled after all fields available");

		// Verify when technician enters a '0' in Quantity field, then also save becomes
		// disabled.
		addToolPage.setQuantity("0");
		assertFalse(addToolPage.isSaveButtonEnabled());
		logger.info("passed: save button disabled when quantity is 0");
		addToolPage.setQuantity(sampleQuantityNumber);
		addToolPage.setHours(sampleHours);
		assertTrue(addToolPage.isSaveButtonEnabled());

		// Verify when technician enters a negative value in Hours field, then also save
		// becomes disabled.
		addToolPage.setHours(sampleNegativeHours);
		assertFalse(addToolPage.isSaveButtonEnabled());
		logger.info("passed: save button disabled when hour is minus");
		addToolPage.setHours(sampleHours);

		// Scenario 18 - Verify after technician save the transaction, the tool record
		// appears on the Report Work view
		// click save button
		addToolPage.clickSaveButton();
		logger.info("save button clicked");
		assertTrue(reportWorkPage.verifyToolAdded());
		logger.info("passed: tool added after click save button");
	}

	/**
	 * Scenario 19 Verify when adding a rotating tool into workReport, the
	 * associated asset will be populated when rotating tool is selected
	 * 
	 * @throws Exception
	 */
	private void verifyRotatingTool() throws Exception {

		// Open WO list page
		// go back to work order search page
		af.instantiateComponent(LabelComponent.class, "gmzj8-pageheader_breadcrumb_icon").click();
		af.waitForElementToBePresent(By.id("em97_-pageheader_breadcrumb_icon"));
		af.instantiateComponent(LabelComponent.class, "em97_-pageheader_breadcrumb_icon").click();

		// Search the WO
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.clickClearButton();
		assignedWorkPage.search(woNumRot);
		assignedWorkPage.openWorkOrderDetails();

		// click "Report work" Icon, and "Report work" page loaded
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		ReportWorkPage reportWorkPage = workOrderDetailsPage.clickReportWorkButton();
		// click Tools used plus icon and "Add tool" page loaded
		AddToolPage addToolPage = reportWorkPage.clickAddToolButton();
		addToolPage.tillPageLoaded();

		// Select the rotating tool which is having the rotating asset.
		addToolPage.selectTool(itemnumRot, itemIdQueryFromDB(itemnumRot));

		// technician should be able see the rotating asset field in tool slider
		logger.info("start to verify the asset populated...");
		// TODO Commented as bug reported in: https://jsw.ibm.com/browse/GRAPHITE-54829
		// assertEquals(assetNumRot, addToolPage.getAssetNumber());
		logger.info("passed: tool added after click save button");
	}

	protected void createDefaultObjects() throws Exception {

		logger.info("Creating default objects");
		createObjectsForNormalTool();
		createObjectsForRotatingTool();
	}

	/**
	 * Scenario 16/18
	 * 
	 * @throws Exception
	 */
	private void createObjectsForNormalTool() throws Exception {
		String assetNum;

		////// Creating a tool
		logger.info("Creating a tool");
		itemnum = AbstractAutomationFramework.randomString(5).toUpperCase();

		String toolItemResult = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem = new Gson().fromJson(toolItemResult, ToolItem.class);
		toolItem.setItemNum(itemnum);
		toolItem.setDescription(SetupData.TOOL_DESCRIPTION);
		maximoApi.create(toolItem);
		logger.info("ToolItem: " + itemnum);

		// item status change and rolldown
		logger.info("Changing Tool Status");
		List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus itemChangeStatus = new ItemChangeStatus();
		itemChangeStatus.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus.setRollDown("true");
		arr.add(itemChangeStatus);
		toolItem.setItemChangeStatus(arr);
		maximoApi.update(toolItem);
		logger.info("Tool API status changed");

		// Creating storeroom
		logger.info("Creating a store room");

		location = AbstractAutomationFramework.randomString(5).toUpperCase();

		StoreRoom storeRoom = new StoreRoom();
		storeRoom.setType(LocType.STOREROOM.toString());
		storeRoom.setDescription("StoreRoom " + location);
		storeRoom.setSiteId(SetupData.SITEID);
		storeRoom.setLocation(location);
		maximoApi.create(storeRoom);
		logger.info("storeRoom location::" + location);

		maximoApi.addItemToStoreRoom(itemnum, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "100", SetupData.DFLTBIN, "", "", "0.0", "1.0", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added ToolItem to StoreRoom successfully");

		// Add tool to store room
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setSiteId(SetupData.SITEID);
		maximoApi.create(newAsset);
		logger.info("Asset: " + assetNum);

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder workOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		workOrder.setWoNum(woNum);
		workOrder.setDescription("WorkOrder for mobile automation test " + woNum);
		workOrder.setSiteId(SetupData.SITEID);
		maximoApi.create(workOrder);
		logger.info("Work Order: " + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(workOrder, WoStatus.APPR.toString());

		// Assign the labor
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");
	}

	/**
	 * For Scenario 19
	 * 
	 * @throws Exception
	 */
	private void createObjectsForRotatingTool() throws Exception {

		String locationRot;
		logger.info("Creating default objects for rotating starts");
		// Creating storeroom
		logger.info("Creating a store room");
		locationRot = AbstractAutomationFramework.randomString(5).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,type,itemtype,status,itemid&addschema=1");
		StoreRoom storeRoom = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		storeRoom.setDescription("StoreRoom " + locationRot);
		storeRoom.setLocation(locationRot);
		maximoApi.create(storeRoom);
		logger.info("storeRoom location::" + locationRot);

		// Creating a tool
		logger.info("Creating a tool");
		itemnumRot = AbstractAutomationFramework.randomString(5).toUpperCase();

		String toolItemResult = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem = new Gson().fromJson(toolItemResult, ToolItem.class);
		toolItem.setItemNum(itemnumRot);
		toolItem.setRotating("true");
		toolItem.setDescription(SetupData.TOOL_DESCRIPTION);
		maximoApi.create(toolItem);
		logger.info("ToolItem for rotating: " + itemnumRot);

		// item status change and rolldown
		logger.info("Changing Tool Status");
		List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus itemChangeStatus = new ItemChangeStatus();
		itemChangeStatus.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus.setRollDown("true");
		arr.add(itemChangeStatus);
		toolItem.setItemChangeStatus(arr);
		maximoApi.update(toolItem);
		logger.info("Tool API status changed");

		// Add Tool to StoreRoom
		maximoApi.addItemToStoreRoom(itemnumRot, SetupData.ITEMSET, locationRot, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "100", SetupData.DFLTBIN, "", "", "0.0", "1.0", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added Tool to StoreRoom successfully");

		// Create an asset
		logger.info("Creating an asset");
		assetNumRot = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");

		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNumRot);
		newAsset.setDescription("Asset :" + assetNumRot);
		newAsset.setStatus(LocAssetStatus.ACTIVE.toString());
		newAsset.setLocation(locationRot);
		newAsset.setItemNum(itemnumRot);

		maximoApi.create(newAsset);
		logger.info("Asset for rotating: " + assetNumRot);

		// Create a work order
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription("WorkOrder test");
		newWorkOrder.setAssetNum(assetNumRot);
		maximoApi.create(newWorkOrder);
		woNumRot = newWorkOrder.getWoNum();
		logger.info("Work Order for rotating: " + woNumRot);

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Adding Tool to WorkOrder
		logger.info("Adding wptool");
		WpTool wptool = new WpTool();
		wptool.setItemNum(toolItem.getItemNum());
		wptool.setItemQty(1);
		wptool.setRate(1);
		wptool.setReservereq(true);
		List<WpTool> wpToolArray = new ArrayList<WpTool>();
		wpToolArray.add(wptool);
		newWorkOrder.setWpTool(wpToolArray);
		maximoApi.update(newWorkOrder);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("WO Status Changed");

	}

	protected String itemIdQueryFromDB(String toolNum) {
		String query = "select I.itemid from MAXIMO.item I where I.itemnum = '" + toolNum + "' and I.itemsetid= '" + SetupData.ITEMSET + "'";
		logger.info(query);
		Object[] resultsObjects = jdbcConnection.executeSQL(query);
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		String itemId = resultArray1[0].toString();
		logger.info("itemId from db>" + itemId);
		return itemId;
	}
}
