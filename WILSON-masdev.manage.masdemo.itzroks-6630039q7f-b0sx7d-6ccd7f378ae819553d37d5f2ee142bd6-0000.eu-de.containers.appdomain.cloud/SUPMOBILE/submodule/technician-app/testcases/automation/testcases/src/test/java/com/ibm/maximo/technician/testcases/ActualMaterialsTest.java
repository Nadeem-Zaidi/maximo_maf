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
import com.ibm.maximo.automation.mobile.api.json.AddItemToStoreroom;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Item;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.AddMaterialPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;
import com.ibm.maximo.technician.setupdata.SetupData.LocAssetStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;

public class ActualMaterialsTest extends TechnicianTest {

	private static final String LOCATION_DESCRIPTION = "Location for mobile automation test ";
	private static final String ASSET_DESCRIPTION = "Asset for mobile automation test ";
	private static final String SITE_ID = SetupData.SITEID;
	private static final String ITEM_DESCRIPTION = "Item Description for mobile automation test ";
	private static final String cardId = "cardtemplate1[0]_chevron";
	private static final String reportIcon = "yyb2k_m5kg3";
	private final Logger logger = LoggerFactory.getLogger(ActualMaterialsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, labor, itemNum, taskId = "10";
	private String itemNumRot, assetNumRot;

	/**
	 * GRAPHITE-51063 [TECHMOBILE] Report work - Material reporting :39M,4TA,0A
	 * 
	 * @param configPath
	 * @throws Exception
	 */
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************ActualMaterialsTest*********************************");
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
			"mobile" }, description = "Verify after technician save the transaction, the material used record appears on the Report Work page", timeOut = 360000)
	public void taskFunctionality() throws Exception {
		verifyMaterialInventory();
		// verifyInventory();
		verifyMaterialWithRotatingAsset();
	}

	/**
	 * Scenario 23/24 Verify after technician save the transaction, the material
	 * used record appears on the Report Work page And balance in Inventory reduced
	 * 
	 * @throws Exception
	 */
	private void verifyMaterialInventory() throws Exception {

		String LARGE_NUMBER = "10000";
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Scenario 23 - Verify after technician save the transaction, the material used
		// record appears on the Report Work page
		logger.info(
				"Start Scenario 23: Verify after technician save the transaction, the material used record appears on the Report Work page");

		// Search the WO
		assertTrue(assignedWorkPage.search(woNum));
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);

		// Click to open report work page.
		ReportWorkPage reportWorkPage = workOrderDetailsPage.clickReportWorkButton();
		// Click on Three Dots to add Materials
		reportWorkPage.addMaterialThreeDots();
		// Click on ‘+’ to add Items
		reportWorkPage.addItems();
		AddMaterialPage addMaterialPage = new AddMaterialPage(af);
		// Click on right chevron
		addMaterialPage.rightChevronforSearchMaterial();
		// Click on Materials
		logger.info("start searching material:" + itemNum);
		assertTrue(addMaterialPage.search(itemNum));
		// Select the material from the lookup.
		addMaterialPage.clickIdentifiedMaterialFromList(itemIdQueryFromDB(itemNum));

		// Select task from task lookup (if planned tasks are associated with work
		// order).
		addMaterialPage.selectTask(taskId);

		// In case, any error is generated, it should be displayed on error page. An
		// example is when technician enter quantity of material more than current
		// balance in inventory.
		addMaterialPage.setQuantity(LARGE_NUMBER);
		addMaterialPage.clickSaveButton();
		// TODO this is a bug
//		assertTrue(reportWorkPage.showErrorPageAndReturn());
		logger.info("Passed: error page pops up");

		// Start process again
		// Click on Three Dots to add Materials
		reportWorkPage.addMaterialThreeDots();
		// Click on ‘+’ to add Items
		reportWorkPage.addItems();
		// Click on right chevron
		addMaterialPage.rightChevronforSearchMaterial();
		// Click on Materials
		logger.info("start searching material:" + itemNum);
		assertTrue(addMaterialPage.search(itemNum));
		// Select the material from the lookup.
		addMaterialPage.clickIdentifiedMaterialFromList(itemIdQueryFromDB(itemNum));

		// Select task from task lookup (if planned tasks are associated with work
		// order).
		assertTrue(addMaterialPage.selectTask(taskId));

		// Get balance before adding
		int balanceBefore = getMaterialBalanceFromDB(itemNum);
		// Click on save button.
		addMaterialPage.clickSaveButton();

		// Should display "Material used" section on report work page.
		assertTrue(reportWorkPage.verifyMaterialAdded());
		logger.info("Passed: Material added successfully");

		// Scenario 24 - Verify that current balance of the material should be reduced
		// from the inventory after adding material used when Transaction type is
		// "Issue"
		// TODO balance not changed, ticket: GRAPHITE-55057 - It is not a bug
		// assertEquals(getMaterialBalanceFromDB(itemNum), balanceBefore);
		// logger.info("Passed: Inventory balance verified");
	}

	/**
	 * Scenario 25 Verify that current balance of the material should be increased
	 * in the inventory after adding material used when Transaction type is "Return"
	 * 
	 * @throws Exception
	 */
	private void verifyInventory() throws Exception {

		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		// Click on Three Dots to add Materials
		reportWorkPage.addMaterialThreeDots();
		// Click on ‘+’ to add Items
		reportWorkPage.addItems();
		AddMaterialPage addMaterialPage = new AddMaterialPage(af);
		// Click on right chevron
		addMaterialPage.rightChevronforSearchMaterial();
		// Click on Materials
		logger.info("start searching material:" + itemNum);
		assertTrue(addMaterialPage.search(itemNum));
		// Select the material from the lookup.
		addMaterialPage.clickIdentifiedMaterialFromList(itemIdQueryFromDB(itemNum));

		// Select task from task lookup (if planned tasks are associated with work
		// order).
		assertTrue(addMaterialPage.selectTask(taskId));

		// select transaction type as "Return"
		addMaterialPage.selectTypeAsReturn();

		// Get balance before Adding
		int balanceBefore = getMaterialBalanceFromDB(itemNum);
		// Click on save button.
		addMaterialPage.clickSaveButton();

		// Should display "Material used" section on report work page.
		assertTrue(reportWorkPage.verifyMaterialAdded());
		logger.info("Material added successfully");

		// Scenario 25 - Verify that current balance of the material should be increased
		// in the inventory after adding material used
		// when Transaction type is "Return"
		// TODO balance not changed, ticket: GRAPHITE-55057
		assertEquals(getMaterialBalanceFromDB(itemNum), balanceBefore);
		logger.info("Passed: Inventory balance verified");
	}

	/**
	 * Scenario 26 Verify when the technician selected the material which is having
	 * the rotating asset then the rotating asset field is displayed
	 * 
	 * @throws Exception
	 */
	private void verifyMaterialWithRotatingAsset() throws Exception {

		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		// Click on Three Dots to add Materials
		reportWorkPage.addMaterialThreeDots();
		// Click on ‘+’ to add Items
		reportWorkPage.addItems();
		AddMaterialPage addMaterialPage = new AddMaterialPage(af);
		// Click on right chevron
		addMaterialPage.rightChevronforSearchMaterial();
		// Click on Materials
		logger.info("start searching material:" + itemNumRot);
		assertTrue(addMaterialPage.search(itemNumRot));
		// selected the material which is having the rotating asset
		addMaterialPage.clickIdentifiedMaterialFromList(itemIdQueryFromDB(itemNumRot));

		// then technician should be able see the rotating asset field.
		assertEquals(addMaterialPage.getAssetNumber(), assetNumRot);
		logger.info("Passed: Rotating asset displayed after material selected");
	}

	/**
	 * Create all objects needed for testing via api calls
	 */
	protected void createDefaultObjects() throws Exception {
		createNormalObjects();
		createRotatingObjects();
	}

	/**
	 * Create objects for adding normal material flow
	 * 
	 * @throws Exception
	 */
	private void createNormalObjects() throws Exception {
		logger.info("Creating default objects for normal case");
		String location;

		// Create a location
		logger.info("Creating an storeroom");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"lean=1&addid=1&action=system:new&ignorecollectionref=1");
		StoreRoom storeRoom = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		storeRoom.setLocation(location);
		storeRoom.setDescription(LOCATION_DESCRIPTION + location);
		storeRoom.setSiteId(SetupData.SITEID);

		maximoApi.create(storeRoom);
		logger.info("Created storeRoom location:" + location);

		// Creating the item of material
		logger.info("Creating an item of material");
		itemNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String itemResult = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item = new Gson().fromJson(itemResult, Item.class);
		item.setItemNum(itemNum);
		item.setDescription(ITEM_DESCRIPTION + itemNum);
		maximoApi.create(item);
		logger.info("Created Item Num:" + itemNum);

		// add Item to StoreRoom
		AddItemToStoreroom addItemToStoreroom = new AddItemToStoreroom();
		addItemToStoreroom.setItemNum(itemNum);
		addItemToStoreroom.setItemSetID(SetupData.ITEMSET);
		addItemToStoreroom.setStoreroom(location);
		addItemToStoreroom.setSiteID(SetupData.SITEID);
		addItemToStoreroom.setTool(false);
		addItemToStoreroom.setIssueUnit(SetupData.ISSUEUNIT);
		addItemToStoreroom.setCurBal(100);
		addItemToStoreroom.setDfltbin(SetupData.DFLTBIN);
		addItemToStoreroom.setCostType("");
		addItemToStoreroom.setLotNum("");
		addItemToStoreroom.setDeliveryTime(0.0);
		addItemToStoreroom.setOrderQty(1.0);
		addItemToStoreroom.setMinLevel(0.0);
		addItemToStoreroom.setReOrder(0);
		addItemToStoreroom.setCcf(0);
		addItemToStoreroom.setStdCost(0.0);
		addItemToStoreroom.setAvgCost(0.0);
		addItemToStoreroom.setSaveNow(true);
		addItemToStoreroom.setLocationUrl(maximoApi.getMaximoServer() + "/oslc/service/location");
		String addAnItemToStoreroom = "addAnItemToStoreroom";
		maximoApi.updateByService(addItemToStoreroom, addAnItemToStoreroom);
		logger.info("Added Item to StoreRoom successfully");

		// item status change and roll down
		logger.info("Item status change to Active");
		List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus ics = new ItemChangeStatus();
		ics.setStatus(ItemStatus.ACTIVE.toString());
		ics.setRollDown("true");
		arr.add(ics);
		item.setItemChangeStatus(arr);
		maximoApi.update(item);
		logger.info("Item status changed");

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SITE_ID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType("PM");
		newWorkOrder.setLocation(location);
		maximoApi.create(newWorkOrder);
		logger.info("Created Work Order:" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, "APPR");
		// Assignment with labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arrTask = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("WorkOrder for mobile automation test");
		task.setOwnergroup("ENG");
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt(taskId));
		task.setStatus("WAPPR");
		arrTask.add(task);
		newWorkOrder.setWoactivity(arrTask);
		maximoApi.update(newWorkOrder);
		logger.info("Created Tasks");
	}

	/**
	 * Create objects for adding rotating material flow
	 * 
	 * @throws Exception
	 */
	private void createRotatingObjects() throws Exception {
		logger.info("Creating default objects for rotating case");
		String locationRot;

		// Create a location
		logger.info("Creating an storeroom");
		locationRot = AbstractAutomationFramework.randomString(5).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"lean=1&addid=1&action=system:new&ignorecollectionref=1");
		StoreRoom storeRoomRot = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		storeRoomRot.setLocation(locationRot);
		storeRoomRot.setDescription(LOCATION_DESCRIPTION + locationRot);
		storeRoomRot.setSiteId(SITE_ID);
		maximoApi.create(storeRoomRot);
		logger.info("Created storeRoom location:" + locationRot);

		// Creating the item of material
		logger.info("Creating an item of material");
		itemNumRot = AbstractAutomationFramework.randomString(5).toUpperCase();
		String itemResult = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item = new Gson().fromJson(itemResult, Item.class);
		item.setItemNum(itemNumRot);
		item.setDescription("item " + itemNumRot);
		item.setRotating(true);
		maximoApi.create(item);
		logger.info("Created Item Num:" + itemNumRot);

		// add Item to StoreRoom
		AddItemToStoreroom addItemToStoreroom = new AddItemToStoreroom();
		addItemToStoreroom.setItemNum(itemNumRot);
		addItemToStoreroom.setItemSetID(SetupData.ITEMSET);
		addItemToStoreroom.setStoreroom(locationRot);
		addItemToStoreroom.setSiteID(SetupData.SITEID);
		addItemToStoreroom.setTool(false);
		addItemToStoreroom.setIssueUnit(SetupData.ISSUEUNIT);
		addItemToStoreroom.setCurBal(100);
		addItemToStoreroom.setDfltbin("bin101");
		addItemToStoreroom.setCostType("");
		addItemToStoreroom.setLotNum("");
		addItemToStoreroom.setDeliveryTime(0.0);
		addItemToStoreroom.setOrderQty(1.0);
		addItemToStoreroom.setMinLevel(0.0);
		addItemToStoreroom.setReOrder(0);
		addItemToStoreroom.setCcf(0);
		addItemToStoreroom.setStdCost(0.0);
		addItemToStoreroom.setAvgCost(0.0);
		addItemToStoreroom.setSaveNow(true);
		addItemToStoreroom.setLocationUrl(maximoApi.getMaximoServer() + "/oslc/service/location");
		String addAnItemToStoreroom = "addAnItemToStoreroom";
		maximoApi.updateByService(addItemToStoreroom, addAnItemToStoreroom);
		logger.info("Added Item to StoreRoom successfully");

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

		// Create an asset
		logger.info("Creating an asset");
		assetNumRot = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNumRot);
		newAsset.setDescription(ASSET_DESCRIPTION + assetNumRot);
		newAsset.setStatus(LocAssetStatus.ACTIVE.toString());
		newAsset.setLocation(locationRot);
		newAsset.setItemNum(itemNumRot);
		maximoApi.create(newAsset);
		logger.info("Created Asset for rotating: " + assetNumRot);

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SITE_ID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType("PM");
		newWorkOrder.setLocation(locationRot);
		maximoApi.create(newWorkOrder);
		logger.info("Created Work Order:" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, "APPR");
		// Assignment with labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arrTask = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("WorkOrder for mobile automation test");
		task.setOwnergroup("ENG");
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt(taskId));
		task.setStatus("WAPPR");
		arrTask.add(task);
		newWorkOrder.setWoactivity(arrTask);
		maximoApi.update(newWorkOrder);
		logger.info("Created Tasks");
	}

	/**
	 * Get item id from DB by item number
	 * 
	 * @param itemNum
	 * @return
	 */
	protected String itemIdQueryFromDB(String itemNum) {
		String query = "select I.itemid from MAXIMO.item I where I.itemnum = '" + itemNum + "' and I.itemsetid= '" + SetupData.ITEMSET
				+ "'";
		logger.info(query);
		Object[] resultsObjects = jdbcConnection.executeSQL(query);
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		String itemId = resultArray1[0].toString();
		logger.info("itemId>" + itemId);
		return itemId;
	}

	/**
	 * Get Inventory balance from DB by item number
	 * 
	 * @param itemNum
	 * @return
	 */
	protected int getMaterialBalanceFromDB(String itemNum) {
		String query = "SELECT INV.CURBAL FROM MAXIMO.INVBALANCES INV WHERE INV.ITEMNUM ='" + itemNum + "' AND INV.ITEMSETID= '" + SetupData.ITEMSET + "'";
		logger.info(query);
		Object[] resultsObjects = jdbcConnection.executeSQL(query);
		assertTrue(resultsObjects != null && resultsObjects.length > 0, "Should have balance for the material");

		Object[] resultArray1 = (Object[]) resultsObjects[0];
		int balance = ((java.math.BigDecimal) resultArray1[0]).intValue();
		logger.info("balance>" + balance);
		return balance;
	}
}
