package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Item;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.WpMaterial;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MaterialsAndToolsPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

/*GRAPHITE-51075:[TECHMOBILE] Task Work orders :17M,12TA,10A*/
public class TaskWorkOrder extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ReservedItemsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder1;
	private WorkOrder newWorkOrder2;
	private String woNum, taskWoNum, labor, location,assetNum, woNum1,woNum2, taskWoNum1,taskWoNum2,taskId = "10";
	private String itemNum;
	private String cardId = "cardtemplate1[0]_chevron";
	private static final String WORKORDER_DESCRIPTION = "Parent Work Order ";
	private static final String TASK_DESCRIPTION = "Task Work Order ";
	public static LoginPage lp;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskWorkOrder*********************************");
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
		maximoApi.changeStatus(newWorkOrder1, WoStatus.COMP.toString());
		maximoApi.changeStatus(newWorkOrder2, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify planned materials and tools associated with the specific task in parent work order are only displayed in corresponding task work order and not for other task work orders", timeOut = 300000)
	public void GetTaskWorkOrders() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		MaterialsAndToolsPage materialsAndTools = new MaterialsAndToolsPage(af);
		assertTrue(assignedWorkPage.search(taskWoNum), "Fail : Task Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		// Wait for start work button enabled
		woDetails.startWorkButtonEnabled();
		// Click on Materials and Tools Touch point
		woDetails.clickMaterialAndToolTouchpoint();
		// Verify the Planned materials added
		assertEquals(materialsAndTools.verifyMaterialsAdded(), itemNum + " " + "item" + " " + itemNum,
				"Fail: Unable to find Materials");
		
		woDetails.clickSlidingDrawerCloseButton();
		woDetails.clickBackChevron();
		assignedWorkPage.clickClearButton();
	}
	
	
	//GRAPHITE-63817 : Task Work Order (Scenario 14)
	
	@Test(groups = {
		"priority2" },  description = "Verify Task Work Order Timer", timeOut = 300000)
	public void taskStartTimer() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);
		
		logger.info("Scenario 14:  Verify when technician starts the task work order from task work order list/details"
				+ " page then parent work order timer also gets started");
		
		// Searching task work order 1
		logger.info("Search task work order 1");
		assignedWorkPage.search(TASK_DESCRIPTION+woNum1);
		//Start work for Task work order 1
		logger.info("Start work for Task work order 1");
		assignedWorkPage.clickStartWorkButton();
		logger.info("Timer Started for Task Work order 1");
		logger.info("Current Page : " + assignedWorkOrderDetailsPage.getInfo());
		assignedWorkOrderDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
		assignedWorkPage.checkForUpdateButton();
		
		// Search parent work order 1
		logger.info("Search parent work order 1");
		assignedWorkPage.search(WORKORDER_DESCRIPTION+woNum1);
		//Check timer Started for parent Work Order
		logger.info("Check timer Started for parent Work Order 1");
		//Checking Stop Work button available
		assertEquals("carbon:stop", assignedWorkPage.getStopWorkButtonText());
		assignedWorkPage.clickClearButton();
		
		// Search parent work order 2
		logger.info("Search parent work order 2");
		assignedWorkPage.search(WORKORDER_DESCRIPTION+woNum2);
		//Start work for Parent work order 2
		logger.info("Start work for Parent work order 2");
		assignedWorkPage.clickStartWorkButton();
		logger.info("Timer Started for Parent Work order 2");
		logger.info("Current Page : " + assignedWorkOrderDetailsPage.getInfo());
		assignedWorkOrderDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
		assignedWorkPage.checkForUpdateButton();
		
		// Search task work order 2
		logger.info("Search task work order 2");
		assignedWorkPage.search(TASK_DESCRIPTION+woNum2);
		assignedWorkPage.openWorkOrderDetails();
		logger.info("Current Page : " + assignedWorkOrderDetailsPage.getInfo());
		// Check Timer is not started for task work order 2
		logger.info("Check Timer is not started for task work order 2");
		//Check Start Work button available if timer is not started
		assertEquals("maximo:start-work", assignedWorkOrderDetailsPage.getStartWorkTimerButtonIcon());
		assignedWorkOrderDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
	
	}	

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		
		//Update System Properties
		this.updateSystemProperties();
		
		//Create an Asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);
		
		// Create a work order
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("Task Work Orders");
		newWorkOrder.setSiteId(SetupData.SITEID);
		// newWorkOrder.setGLAccount(SetupData.GL_ACCOUNT);
		// newWorkOrder.setFlowControlled(true);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: " + newWorkOrder.getWoNum());

		// Assignment with labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
		
		//Create Second Work Order
		logger.info("Creating Second work order");
		String workOrderResult1 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder1 = new Gson().fromJson(workOrderResult1, WorkOrder.class);
		woNum1 = newWorkOrder1.getWoNum();
		newWorkOrder1.setDescription(WORKORDER_DESCRIPTION+woNum1);
		newWorkOrder1.setSiteId(SetupData.SITEID);
		newWorkOrder1.setGlaccount(SetupData.GLDEBITACCT);
		newWorkOrder1.setAssetNum(assetNum);
		newWorkOrder1.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder1);
		logger.info("Work Order: {}" + woNum1);
		
		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder1, labor);
		logger.info("Assignment added");
		
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder1, WoStatus.APPR.toString());		
		
		//Create Third Work Order
		logger.info("Creating Third work order");
		String workOrderResult2 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder2 = new Gson().fromJson(workOrderResult2, WorkOrder.class);
		woNum2 = newWorkOrder2.getWoNum();
		newWorkOrder2.setDescription(WORKORDER_DESCRIPTION+woNum2);
		newWorkOrder2.setSiteId(SetupData.SITEID);
		newWorkOrder2.setGlaccount(SetupData.GLDEBITACCT);
		newWorkOrder2.setAssetNum(assetNum);
		newWorkOrder2.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder2);
		logger.info("Work Order: {}" + woNum2);
		
		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder2, labor);
		logger.info("Assignment added");
		
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder2, WoStatus.APPR.toString());				
		
		// Create Task
		logger.info("Task API Call started ");
		List<Task> arrTask = new ArrayList<>();
		Task task = new Task();
		task.setDescription("Task Description for mobile automation test");
		task.setTaskid(Integer.parseInt("10"));
		task.setStatus(WoStatus.WAPPR.toString());
		arrTask.add(task);
		newWorkOrder.setWoactivity(arrTask);
		maximoApi.update(newWorkOrder);
		logger.info("Tasks Created");

		String woActivityResult = maximoApi.retrieve(new WorkOrder(), "oslc.where=wogroup=%22" + woNum
				+ "%22%20and%20taskid=10&oslc.select=*&addid=1&internalvalues=1&ignorecollectionref=1");
		JSONObject resultObject = new JSONObject(woActivityResult);
		JSONArray resultArray = resultObject.getJSONArray("member");
		JSONObject workOrderObj = resultArray.getJSONObject(0);
		String woHref = workOrderObj.getString("href");
		WorkOrder taskWorkOrder = new Gson().fromJson(workOrderObj.toString(), WorkOrder.class);
		taskWorkOrder.setLocationUrl(woHref);
		taskWoNum = taskWorkOrder.getWoNum();
		logger.info("task workorder >>>>>>>>> " + taskWoNum);

		// Assign the labor
		maximoApi.addAssignmentLabor(taskWorkOrder, labor);
		logger.info("Assignment added to task workorder");
		
		//Create Second Task
		logger.info("Task API Call started ");
		List<Task> arrTask1 = new ArrayList<>();
		Task task1 = new Task();
		task1.setEstdur(Float.parseFloat("1.5"));
		task1.setSiteid(SetupData.SITEID);
		task1.setDescription(TASK_DESCRIPTION+woNum1);
		task1.setOwnergroup(SetupData.OWNERGROUP);
		task1.setParentchgsstatus(true);
		task1.setTaskid(Integer.parseInt(taskId));
		task1.setStatus(WoStatus.WAPPR.toString());
		arrTask1.add(task1);
		newWorkOrder1.setWoactivity(arrTask1);
		maximoApi.update(newWorkOrder1);
		logger.info("Tasks 1 Created");
		
		//Create Third Task
		logger.info("Task API Call started ");
		List<Task> arrTask2 = new ArrayList<>();
		Task task2 = new Task();
		task2.setEstdur(Float.parseFloat("1.5"));
		task2.setSiteid(SetupData.SITEID);
		task2.setDescription(TASK_DESCRIPTION+woNum2);
		task2.setOwnergroup(SetupData.OWNERGROUP);
		task2.setParentchgsstatus(true);
		task2.setTaskid(Integer.parseInt(taskId));
		task2.setStatus(WoStatus.WAPPR.toString());
		arrTask2.add(task2);
		newWorkOrder2.setWoactivity(arrTask2);
		maximoApi.update(newWorkOrder2);
		logger.info("Tasks 3 Created");
		
		String woActivityResult1 = maximoApi.retrieve(new WorkOrder(), "oslc.where=wogroup=%22" + woNum1
				+ "%22%20and%20taskid=10&oslc.select=*&addid=1&internalvalues=1&ignorecollectionref=1");
		JSONObject resultObject1 = new JSONObject(woActivityResult1);
		JSONArray resultArray1 = resultObject1.getJSONArray("member");
		JSONObject workOrderObj1 = resultArray1.getJSONObject(0);
		String woHref1 = workOrderObj1.getString("href");

		WorkOrder taskWorkOrder1 = new Gson().fromJson(workOrderObj1.toString(), WorkOrder.class);
		taskWorkOrder1.setLocationUrl(woHref1);

		taskWoNum1 = taskWorkOrder1.getWoNum();
		logger.info("task workorder >>>>>>>>> " + taskWoNum1);

		// Assign the labor
		maximoApi.addAssignmentLabor(taskWorkOrder1, labor);
		logger.info("Assignment added to task workorder");

		// Change WO status to Approved
		logger.info("Changing task work order status to APPR");
		maximoApi.changeStatus(taskWorkOrder1, WoStatus.APPR.toString());
		
		String woActivityResult2 = maximoApi.retrieve(new WorkOrder(), "oslc.where=wogroup=%22" + woNum2
				+ "%22%20and%20taskid=10&oslc.select=*&addid=1&internalvalues=1&ignorecollectionref=1");
		JSONObject resultObject2 = new JSONObject(woActivityResult2);
		JSONArray resultArray2 = resultObject2.getJSONArray("member");
		JSONObject workOrderObj2 = resultArray2.getJSONObject(0);
		String woHref2 = workOrderObj2.getString("href");

		WorkOrder taskWorkOrder2 = new Gson().fromJson(workOrderObj2.toString(), WorkOrder.class);
		taskWorkOrder2.setLocationUrl(woHref2);

		taskWoNum2 = taskWorkOrder2.getWoNum();
		logger.info("task workorder >>>>>>>>> " + taskWoNum2);

		// Assign the labor
		maximoApi.addAssignmentLabor(taskWorkOrder2, labor);
		logger.info("Assignment added to task workorder");

		// Change WO status to Approved
		logger.info("Changing task work order status to APPR");
		maximoApi.changeStatus(taskWorkOrder2, WoStatus.APPR.toString());

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

		// Add item to StoreRoom
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

		String result = maximoApi.retrieve(new WorkOrder(),
				"&collectioncount=1&ignorecollectionref=1&relativeuri=1&lean=1&internalvalues=1&addid=1&internalvalues=1&oslc.select=wonum&oslc.where=wonum=%22"
						+ woNum + "%22");
		JsonParser jsonParser = new JsonParser();
		JsonObject teste = jsonParser.parse(result).getAsJsonObject();
		newWorkOrder = new Gson().fromJson(teste.get("member").getAsJsonArray().get(0).toString(), WorkOrder.class);
		newWorkOrder.setLocationUrl(maximoApi.getMaximoServer() + "/" + newWorkOrder.getHref());

		// Adding item to Workorder
		logger.info("Adding wpmaterial");
		WpMaterial wpmaterial = new WpMaterial();
		wpmaterial.setTaskID("10");
		wpmaterial.setItemNum(item.getItemNum());
		wpmaterial.setLocation(location);
		wpmaterial.setItemQty(1);
		wpmaterial.setRate(1);
		List<WpMaterial> WpMaterialArray = new ArrayList<WpMaterial>();
		WpMaterialArray.add(wpmaterial);
		newWorkOrder.setWpMaterial(WpMaterialArray);
		maximoApi.update(newWorkOrder);
		logger.info("Item updated to WO ");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("WO Status Changed");
	}
	
	protected void updateSystemProperties() throws Exception {
        //Set System Property Use Timer to 1
		maximoApi.setProperty("maximo.mobile.usetimer","COMMON",null,"1");
		logger.info("System Properties Set Successfully");
	}
}
