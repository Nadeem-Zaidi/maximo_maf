package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
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
import com.ibm.maximo.automation.mobile.api.json.Item;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.WpMaterial;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MaterialsAndToolsPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

/*GRAPHITE-51074:[TECHMOBILE] Get Reserved Items and report them as Actuals :14M,3TA,0A*/
public class ReservedItemsTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ReservedItemsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder, newWorkOrder1;
	private String woNum, woNum1, labor,labor1, location;
	private String itemNum;
	private String cardId = "cardtemplate1[0]_chevron";
	private String GL_ACCOUNT = "6000-200-000";
	public static LoginPage lp;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			labor1 = properties.getProperty("app.username1");
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
		maximoApi.changeStatus(newWorkOrder1, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" }, description = "Verify all selected reserved items are reported as actuals in \"Materials used\" section on \"Report work\" page when technician clicks on \"Get selected\"", timeOut = 300000)
	public void GetReservedTestFromMaterialsAndToolsPage() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		MaterialsAndToolsPage materialsAndTools = new MaterialsAndToolsPage(af);
		assertTrue(assignedWorkPage.search(woNum), "Fail : Search Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		// Wait for start work button enabled
		woDetails.startWorkButtonEnabled();
		// click on planned materials and tools touchpoint
		woDetails.clickMaterialAndToolTouchpoint();
		// Click on the 3 dots
		woDetails.clickMaterialAndToolMenu();
		// Click on Get Reserved items
		materialsAndTools.clickGetReservedItems();
		// Select the item by clicking on the checkbox
		materialsAndTools.checkboxClickOnGetReservedItems();
		// click on the get Selected button on top after checkbox selection
		materialsAndTools.clickGetSelected();
		// verify the get reserved items added
		assertEquals(materialsAndTools.verifyGetReservedItemsAddedInMaterials(), itemNum + " " + "item" + " " + itemNum,
				"Fail");
		// Logout
		logOut(af);
		// Relogin to enter different credentials
		reLoginWithDifferentCredentials();
	}

	@Test(groups = {
			"mobile" }, description = "Verify that \"Get reserved items >\" button under 3 dot menu in Materials used section on Report work page is either disabled or hidden when technician do not have permission for reporting reserved items as actuals", timeOut = 300000)
	public void newLogin() throws Exception {
		// create a work order
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		// Search the WO
		assertTrue(assignedWorkPage.search(woNum1), "Fail : Search Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		// Wait for start work button enabled
		workOrderDetailsPage.startWorkButtonEnabled();
		// Click on Report Page touch point
		workOrderDetailsPage.clickReportWorkButton();
		// Click on 3 dots at Material used section
		reportWorkPage.clickOn3Dotsbutton();
		// Verify that the get Reserved items it Disabled
		reportWorkPage.verifyGetReservedItemsDisabled();
	}

	@Test(groups = {
			"mobile" }, description = "Verify that \"Get reserved items >\" button under 3 dot menu in planned materials and tools drawer on WO details page is either disabled or hidden when technician do not have permission for reporting reserved items as actuals", timeOut = 300000)
	public void newLogin2() throws Exception {
		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		MaterialsAndToolsPage materialsAndTools = new MaterialsAndToolsPage(af);
		// Go back to the work order detail page
		reportWorkPage.clickBackChevron();
		// open the materials and tools touchpoint
		woDetails.clickMaterialAndToolTouchpoint();
		// Click on the 3 dots
		woDetails.clickMaterialAndToolMenu();
		// Verify that the get Reserved items it Disabled
		materialsAndTools.verifyGetReservedItemsDisabled();
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		// Create a work order
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("Get Reserved Items for Scenario8");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setGLAccount(GL_ACCOUNT);
		// newWorkOrder.setFlowControlled(true);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: " + newWorkOrder.getWoNum());
		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create Second Work Order
		logger.info("Creating second work order");
		String workOrderResult1 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder1 = new Gson().fromJson(workOrderResult1, WorkOrder.class);
		woNum1 = newWorkOrder1.getWoNum();
		newWorkOrder1.setDescription("WorkOrder for mobile automation test");
		newWorkOrder1.setSiteId(SetupData.SITEID);
		newWorkOrder1.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder1);
		logger.info("Work Order 2: {}" + woNum1);
		
		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder1, labor1);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder1, WoStatus.APPR.toString());

		// Creating the item
		logger.info("Creating an item");
		itemNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String itemResult = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item = new Gson().fromJson(itemResult, Item.class);
		item.setItemNum(itemNum);
		item.setDescription("item " + itemNum);
		maximoApi.create(item);
		logger.info("ItemNum::" + itemNum);
		// Creating storeroom
		logger.info("Creating a store room");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,type,itemtype,status,itemid&addschema=1");
		StoreRoom storeRoom = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		storeRoom.setDescription("StoreRoom " + location);
		storeRoom.setLocation(location);
		maximoApi.create(storeRoom);
		logger.info("storeRoom location::" + location);
		// Add Tool to StoreRoom
		maximoApi.addItemToStoreRoom(itemNum, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "100", SetupData.DFLTBIN, "", "", "0.0", "1.0", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added Item to StoreRoom successfully");
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
		// Adding item to Workorder
		logger.info("Adding wpmaterial");
		WpMaterial wpmaterial = new WpMaterial();
		wpmaterial.setItemNum(item.getItemNum());
		wpmaterial.setLocation(location);
		wpmaterial.setItemQty(1);
		wpmaterial.setRate(1);
		List<WpMaterial> WpMaterialArray = new ArrayList<WpMaterial>();
		WpMaterialArray.add(wpmaterial);
		newWorkOrder.setWpMaterial(WpMaterialArray);
		logger.info("Item updated to WO ");
		maximoApi.update(newWorkOrder);
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("WO Status Changed");
	}
}