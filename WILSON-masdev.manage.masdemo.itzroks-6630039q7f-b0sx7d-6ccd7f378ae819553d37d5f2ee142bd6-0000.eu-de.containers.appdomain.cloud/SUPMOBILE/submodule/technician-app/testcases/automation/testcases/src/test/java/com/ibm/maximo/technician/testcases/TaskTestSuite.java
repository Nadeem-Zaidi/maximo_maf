package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

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

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.TaskPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;
/*
 * GRAPHITE-47692: Eli should be able to mark as complete tasks in a work order
 * GRAPHITE-50897: Display Asset/Location on Task when different than Parent WO
 * GRAPHITE-50846: Eli should go to the report work page after finishing the last task
 */
 
public class TaskTestSuite extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(TaskTestSuite.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private WorkOrder newWorkOrder;
	private MaximoApi maximoApi;
	private String assetNum, woNum, labor, location, assetNum1, location1, maximoStytemProp;
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskTestSuite*********************************");
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

	@Test(groups = { "mobile" }, description = "Verify Task functionality", timeOut = 200000)
	public void taskFunctionality() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		TaskPage taskPage = new TaskPage(af);
		ReportWorkPage reprotWorkPage = new ReportWorkPage(af);
		// Scenario 1: Verify different asset and location on Task page
		logger.info("Scenario 1: Verify different asset and location on Task page");
		
		// Search the WO
		assignedWorkPage.search(woNum);
		// Navigate to Work Order Details page
		assignedWorkPage.openWorkOrderDetails();
		// Open Task Page
		workOrderDetailsPage.clickTaskButton();
		
		// Verify asset details on Task page are different from WO asset details
		assertEquals(assetNum1, taskPage.getAssetNum());
		logger.info("asset details on Task page are different from WO asset details");
		
		// Verify location details on Task page are different from WO location details
		assertEquals(location1, taskPage.getLocationNum());
		logger.info("location details on Task page are different from WO location details");
	
		// Verify asset icon
		assertEquals("carbon:asset", taskPage.getAssetIcon());
		logger.info("Verify asset icon");
		
		// Verify location icon
		assertEquals("carbon:location", taskPage.getLocationIcon());	
		logger.info("Verify location icon");	
		
		// Scenario 2: Verify user is able to mark tasks as Complete in a work order
		logger.info("Scenario 2: Verify user is able to mark tasks as Complete in a work order");
		
		// Verify that blue checkmark icon is displayed for the task when it is incomplete
		assertEquals("carbon:checkmark", taskPage.getBlueCheckmarkOnTaskPage(0));
		logger.info("blue checkmark icon is displayed for the task when it is incomplete");
		
		// Click on Change Status drawer
		taskPage.taskStatusChange();
		logger.info("Change Status drawer clicked");
		
		// Verify that technician marks a task completed
		taskPage.selectCompleteTaskStatus();
		logger.info("Task marked as completed");
		
		// Click on save button
		taskPage.saveStatusChange();
		
		// Verify that green checkmark icon is displayed for the task when technician marks that incomplete task as completed
		assertEquals("Carbon:checkmark--outline", taskPage.getGreenCheckmarkOnTaskPage(0));
		
		//click done button
		taskPage.clickDone();
		
		String maximoStytemProp = getSystemProps().toString();
		
		if(maximoStytemProp.equals("1")) {
			// Verify that the page should navigate to the report work page after the last task is completed and maximo.mobile.gotoreportwork should be 1
			assertEquals(true, reprotWorkPage.checkCurrentPage());
		}else {
			assertEquals(true, workOrderDetailsPage.checkCurrentPage());
		}
	}
	
	protected String getSystemProps() throws Exception {
		logger.info("Getting maximo system property : maximo.mobile.gotoreportwork");
		String resultsObjects = maximoApi.getSystemProps("maximo.mobile.gotoreportwork");  
//		JSONObject jsonObject = new JSONObject(resultsObjects.toString());
//		String maximoSysProp = jsonObject.getString("maximo.mobile.gotoreportwork");
		logger.info("maximo system property: {}", resultsObjects);
		return resultsObjects;
	}
	
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		
		// Create an asset for WO
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Asset.fakeAsset(assetNum));
		logger.info("Asset: {}" + assetNum);
			
		// Create a location for WO
		logger.info("Creating a location");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Location.fakeLocation(location));
		logger.info("Location: {}" + location);
		
		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		newWorkOrder = WorkOrder.fakeWorkOrder(woNum , assetNum, null, null, location);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		
		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
		
		// Create an asset for Task
		logger.info("Creating an asset");
		assetNum1 = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Asset.fakeAsset(assetNum1));
		logger.info("Task Asset: {}" + assetNum1);
				
		// Create a location for Task
		logger.info("Creating a location");
		location1 = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Location.fakeLocation(location1));
		logger.info("Task Location: {}" + location1);
	
		// Create Task
		logger.info("Task API Call started ");
		List<Task> arr = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("WorkOrder for mobile automation test");
		task.setOwnergroup(SetupData.OWNERGROUP);
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt("89087"));
		task.setStatus(WoStatus.WAPPR.toString());
		task.setAssetnum(assetNum1);
		task.setLocation(location1);
		arr.add(task);
		newWorkOrder.setWoactivity(arr);
		maximoApi.update(newWorkOrder);
		logger.info("Tasks added");
			
	}
}