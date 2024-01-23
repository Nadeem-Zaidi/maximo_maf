package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertTrue;
import static org.testng.AssertJUnit.assertEquals;

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
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.AssetMeter;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.Meter;
import com.ibm.maximo.automation.mobile.api.json.ServiceRequest;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.ToolItem;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.WpTool;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MetersPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.AverageMethod;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;
import com.ibm.maximo.technician.setupdata.SetupData.MaxDomain;
import com.ibm.maximo.technician.setupdata.SetupData.MeterType;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;

/*GRAPHITE-51075:[TECHMOBILE] Task Work orders :17M,12TA,10A*/
public class TaskWorkOrderVerifyInWorkOrderDetailsPage extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ReservedItemsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, taskWoNum, labor, location, srNum;
	int meterValue;
	private String itemNum;
	private String cardId = "cardtemplate1[0]_chevron";
	public static LoginPage lp;
	private int taskId = 10, Number = 3;
	private static final String LOCATION_DESCRIPTION = "Location for mobile automation test";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskWorkOrderVerifyInWorkOrderDetailsPage*********************************");
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
		// complete WO after testcase executed
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify data and touch-points related to asset, location, status, start/stop work, work log, priority, maps, meters, attachments, planned tools and material are displayed on work order list and details pages for task work order", timeOut = 300000)
	public void TaskOrderVerificationInWorkOrderDetails() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		// MaterialsAndToolsPage materialsAndTools = new MaterialsAndToolsPage(af);
		MetersPage metersPage = new MetersPage(af);
		assertTrue(assignedWorkPage.search(taskWoNum), "Fail : Task Work Order is not displayed");
		// Verify Meter value
		assignedWorkPage.clickMetersButton();
		assertEquals(metersPage.VerifyMeterValue(), "MC" + "" + meterValue);
		metersPage.cancel();
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		// Wait for start work button enabled
		woDetails.startWorkButtonEnabled();
		// Verify Planned Materials and Tools Touch point
		woDetails.verifyMaterialAndToolTouchpoint();
		// Verify Work Log Tools Touch point
		woDetails.verifyWorkLogTouchpoint();
		// Verify Edit icon touch point
		woDetails.verifyEditIconTouchpoint();
		// verify meter Touch point
		woDetails.isMeterExistInLabor();
		// Verify Task Description
		assertEquals(woDetails.getTaskOrderDescription(), "Task Description for mobile automation test"+woNum+"-"+taskId);
		// Verify Priority
		String actualStr = woDetails.getTextWOPriority();
		logger.info("WO Priority >" + actualStr);
		assertEquals(actualStr, "Priority " + Number);
		// Verify Asset
		String asset = woDetails.getTextWOAssetNum();
		logger.info("WO Asset Number >" + asset);
		assertEquals(asset, assetNum);
	}

	protected void createDefaultObjects() throws Exception {

		String result = maximoApi.retrieve(new Meter(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterCharacteristic = new Gson().fromJson(result, Meter.class);
		newMeterCharacteristic.setMetername("MC" + newMeterCharacteristic.getMeterid());
		logger.info("--------------" + newMeterCharacteristic.getMeterid());
		meterValue = newMeterCharacteristic.getMeterid();
		newMeterCharacteristic.setMetername("MC" + newMeterCharacteristic.getMeterid());
		newMeterCharacteristic.setMetertype(MeterType.CHARACTERISTIC.toString());
		newMeterCharacteristic.setDescription("my meter " + newMeterCharacteristic.getMeterid());
		newMeterCharacteristic.setDomainid(MaxDomain.RAIL_WEAR.toString());
		// Creates Meter CHARACTERISTIC
		maximoApi.create(newMeterCharacteristic);
		logger.info("CHARACTERISTIC Meter: {}" + newMeterCharacteristic.getMeterid());
		String resultGauge = maximoApi.retrieve(new Meter(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterGauge = new Gson().fromJson(resultGauge, Meter.class);
		newMeterGauge.setMetername("MG" + newMeterGauge.getMeterid());
		newMeterGauge.setMetertype(MeterType.GAUGE.toString());
		newMeterGauge.setDescription("my meter " + newMeterGauge.getMeterid());

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setDescription("Asset for mobile automation test");
		newAsset.setSiteId(SetupData.SITEID);
		List<AssetMeter> meterList = new ArrayList<AssetMeter>();
		AssetMeter assetMeterCharacteristic = new AssetMeter();
		assetMeterCharacteristic.setMetername(newMeterCharacteristic.getMetername());
		AssetMeter assetMeterGauge = new AssetMeter();
		assetMeterGauge.setMetername(newMeterGauge.getMetername());
		AssetMeter assetMeterContinuous = new AssetMeter();
		assetMeterContinuous.setAvgcalcmethod(AverageMethod.ALL.toString());
		assetMeterContinuous.setMetername(newMeterCharacteristic.getMetername());
		meterList.add(assetMeterCharacteristic);
		newAsset.setAssetMeter(meterList);
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

		// Create a location
		logger.info("Creating a location");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();
		newlocation.setLocationId(location);
		newlocation.setDescription(LOCATION_DESCRIPTION);
		newlocation.setSiteId(SetupData.SITEID);
		maximoApi.create(newlocation);
		logger.info("location: {}" + location);// Create service request
		srNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		ServiceRequest sr = ServiceRequest.fakeSr(srNum, null);
		sr.setSrClass("SR");
		sr.setStatus("NEW");
		sr.setDescription("Testing for workerorder ticket");
		maximoApi.create(sr);
		logger.info("service request number: {}" + srNum);

		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setGLAccount(SetupData.GLDEBITACCT);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWoPriority(Number);
		// newWorkOrder.setLocation(location);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Creating a tool
		logger.info("Creating a tool");
		itemNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String toolItemResult = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem = new Gson().fromJson(toolItemResult, ToolItem.class);
		toolItem.setItemNum(itemNum);
		toolItem.setDescription(SetupData.TOOL_DESCRIPTION);
		maximoApi.create(toolItem);
		logger.info("ToolItem: " + itemNum);

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

		// Adding Tool to Workorder
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

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arrTask = new ArrayList<>();
		Task task = new Task();
		task.setDescription("Task Description for mobile automation test");
		task.setTaskid(taskId);
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

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("WO Status Changed");
	}

}