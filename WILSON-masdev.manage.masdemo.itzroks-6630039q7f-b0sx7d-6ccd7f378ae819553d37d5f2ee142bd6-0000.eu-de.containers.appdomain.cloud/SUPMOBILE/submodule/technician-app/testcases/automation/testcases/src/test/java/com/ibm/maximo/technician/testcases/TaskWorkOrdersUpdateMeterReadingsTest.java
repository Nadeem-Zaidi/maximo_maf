package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertFalse;
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
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.AssetMeter;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.LocationMeter;
import com.ibm.maximo.automation.mobile.api.json.Meter;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MetersPageWODetail;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.AverageMethod;
import com.ibm.maximo.technician.setupdata.SetupData.MaxDomain;
import com.ibm.maximo.technician.setupdata.SetupData.MeterType;
import com.ibm.maximo.technician.setupdata.SetupData.ReadingType;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

public class TaskWorkOrdersUpdateMeterReadingsTest extends TechnicianTest {

	private static final String cardId = "cardtemplate1[0]_chevron";
	private final Logger logger = LoggerFactory.getLogger(TaskWorkOrdersUpdateMeterReadingsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, woNumKey, taskWoNum, labor, taskId = "10";
	private String enterMeterValueFromTask = "123",enterMeterValueFromParentWO = "321";

	/**
	 * GRAPHITE-51075 [TECHMOBILE] Task Work orders :17M,12TA,6A Test scenario 11
	 * 
	 * @param configPath
	 * @throws Exception
	 */
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskWorkOrdersUpdateMeterReadingsTest*********************************");
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
			"mobile" },  description = "Verify on Task Work orders :17M,12TA,6A Scenario 11 Verify technician updates meter readings in task work order, it will be reflected in parent work order and vice versa ", timeOut = 480000)
	public void taskFunctionality() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// record appears on the Report Work page
		logger.info(
				"Scenario 11 Verify technician updates meter readings in task work order, it will be reflected in parent work order and vice versa ");
		
		// 1. Search the task work order
		assertTrue(assignedWorkPage.search(taskWoNum));
		// and click chevron to open task work order details page.
		assignedWorkPage.openCardDetails(cardId);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		
		// Verify meter touch-point is displayed and technician is able to enter/update meter readings.
		assertTrue(workOrderDetailsPage.isMeterExistInLabor());
		
		// click on Meters Icon
		MetersPageWODetail metersPage = workOrderDetailsPage.clickMetersButton();
		assertFalse(metersPage.checkMeterValueBeforeReading());
		assertTrue(metersPage.addMeterReadings(enterMeterValueFromTask));
		assertTrue(metersPage.checkMeterValueAfterReading(enterMeterValueFromTask));
		metersPage.cancel();
		workOrderDetailsPage.clickBackChevron();
		
		// 2. search again for parent work order, it should be updated in parent work order meter reading.

		assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.clickClearButton();
		assertTrue(assignedWorkPage.search(woNumKey));
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);
		workOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Verify meter touch-point is displayed and technician is able to enter/update meter readings.
		assertTrue(workOrderDetailsPage.isMeterExistInLabor());

		// click on Meters Icon
		metersPage = workOrderDetailsPage.clickMetersButton();
		assertTrue(metersPage.checkMeterValueAfterReading(enterMeterValueFromTask));
		assertTrue(metersPage.addMeterReadings(enterMeterValueFromParentWO));
		assertTrue(metersPage.checkMeterValueAfterReading(enterMeterValueFromParentWO));
		metersPage.cancel();
		workOrderDetailsPage.clickBackChevron();

		// 3. search task work order, Any meter reading updated in parent work order should also be updated in task work order meter readings.
		assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.clickClearButton();
		assertTrue(assignedWorkPage.search(taskWoNum));
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);
		workOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Verify meter touch-point is displayed and technician is able to enter/update meter readings.
		assertTrue(workOrderDetailsPage.isMeterExistInLabor());
		
		// click on Meters Icon
		metersPage = workOrderDetailsPage.clickMetersButton();
		assertTrue(metersPage.checkMeterValueAfterReading(enterMeterValueFromParentWO));

		logger.info("Passed: scenario 11 Verify technician updates meter readings");
	}

	/**
	 * Create objects for adding normal material flow
	 */
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		
		// Create meters
		String result = maximoApi.retrieve(new Meter(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterCharacteristic = new Gson().fromJson(result, Meter.class);

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

		// Creates Meter Gauge
		maximoApi.create(newMeterGauge);
		logger.info("GAUGE Meter: {}" + newMeterGauge.getMeterid());

		String resultContinuous = maximoApi.retrieve(new Meter(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterContinuous = new Gson().fromJson(resultContinuous, Meter.class);

		newMeterContinuous.setMetername("MCO" + newMeterContinuous.getMeterid());
		newMeterContinuous.setMetertype(MeterType.CONTINUOUS.toString());
		newMeterContinuous.setDescription("my meter " + newMeterContinuous.getMeterid());
		newMeterContinuous.setReadingtype(ReadingType.DELTA.toString());

		// Creates Meter CONTINUOUS
		maximoApi.create(newMeterContinuous);
		logger.info("CONTINUOUS Meter: {}" + newMeterContinuous.getMeterid());

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
		assetMeterContinuous.setMetername(newMeterContinuous.getMetername());
		
		meterList.add(assetMeterCharacteristic);
		meterList.add(assetMeterGauge);
		meterList.add(assetMeterContinuous);
		newAsset.setAssetMeter(meterList);

		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);
		
		// Create a location
		logger.info("Creating a location");
		String location = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();
		
		newlocation.setLocationId(location);
		newlocation.setDescription("location for mobile automation test");
		newlocation.setSiteId(SetupData.SITEID);

		List<LocationMeter> locationMeterList = new ArrayList<LocationMeter>();
		
		LocationMeter locationMeterCharacteristic = new LocationMeter();
		locationMeterCharacteristic.setMetername(newMeterCharacteristic.getMetername());
		
		LocationMeter locationMeterGauge = new LocationMeter();
		locationMeterGauge.setMetername(newMeterGauge.getMetername());
		
		LocationMeter locationMeterContinuous = new LocationMeter();
		locationMeterContinuous.setAvgcalcmethod(AverageMethod.ALL.toString());
		locationMeterContinuous.setMetername(newMeterContinuous.getMetername());
		
		locationMeterList.add(locationMeterCharacteristic);
		locationMeterList.add(locationMeterGauge);
		locationMeterList.add(locationMeterContinuous);
		newlocation.setLocationmeter(locationMeterList);

		maximoApi.create(newlocation);
		logger.info("location: {}" + location);		

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		woNumKey = "kwo" + woNum;
		newWorkOrder.setDescription("WorkeOrder for mobile automation test " + woNumKey);
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		newWorkOrder.setGlaccount(SetupData.GLDEBITACCT);
		newWorkOrder.setLocation(location);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order:" + woNum + " Created.");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		// Assignment with labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arrTask = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("Task Description for mobile automation test");
		task.setOwnergroup(SetupData.OWNERGROUP);
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt(taskId));
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
		logger.info("Changing task work order status to APPR");
		maximoApi.changeStatus(taskWorkOrder, WoStatus.APPR.toString());
	}
}
