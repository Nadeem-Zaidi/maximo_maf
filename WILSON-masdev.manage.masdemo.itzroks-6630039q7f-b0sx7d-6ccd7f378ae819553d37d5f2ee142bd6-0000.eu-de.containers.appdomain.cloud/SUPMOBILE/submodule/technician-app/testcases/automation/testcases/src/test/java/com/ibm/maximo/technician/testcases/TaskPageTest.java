package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.json.JSONObject;
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
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.TaskPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

/*
 * GRAPHITE-53319: Review Task Page Designs
 */

public class TaskPageTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(TaskPageTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String assetNum, woNum, labor, location, assetNum1, location1;
	private static final String TASK_TITLE = "Task For Mobile Automation";
	private static final String TASK_LONG_DESCRIPTION = " This is Task Page Design"
			+ "automation test to verify icons and functionalities on task page"
			+ "with asset icon location icon description "
			+ "and button with button description and icon name";
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskPageTest*********************************");
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

	@Test(groups = { "mobile" }, description = "Verify Task functionality", timeOut = 120000)
	public void taskFunctionality() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		TaskPage taskPage = new TaskPage(af);
				
				
		// Search the WO
		assignedWorkPage.search(woNum);
		// Navigate to Work Order Details page
		assignedWorkPage.openWorkOrderDetails();
		logger.info("Work Order Details Page Opened");
		// Open Task Page
		workOrderDetailsPage.clickTaskButton();
		logger.info("Task Icon Clicked");
				
		//Verify task page title is present
		assertEquals(woNum+" Tasks", taskPage.getTaskPageTitle());
		logger.info("Task Page Titled Found");
				
		//Verify Task page title is present at the top
		logger.info("Scenario 1: Verify Task page title is present at the top");
		
		//Verify Asset and location icons are present
			
		// Verify asset icon
		assertEquals("carbon:asset", taskPage.getAssetIcon());
		logger.info("Asset Icon are present");
				
		// Verify location icon
		assertEquals("carbon:location", taskPage.getLocationIcon());
		logger.info("Location icon are present");
				
       //Verify Long description present
        assertEquals(true, taskPage.getTaskLongDescription() != null || taskPage.getTaskLongDescription() != " ");
        logger.info("Long Description are present");
        
       //Navigate back to workorder details page
        taskPage.clickBackChevron();
      //Navigate back to workorder list page 
		workOrderDetailsPage.clickBackChevron();
	}
	
	protected String getSystemProps() throws Exception {
		logger.info("Getting maximo system property : maximo.mobile.gotoreportwork");
		String resultsObjects = maximoApi.getSystemProps("maximo.mobile.gotoreportwork");  
		JSONObject jsonObject = new JSONObject(resultsObjects.toString());
		String maximoSysProp = jsonObject.getString("maximo.mobile.gotoreportwork");
		logger.info("maximo system property: {}", maximoSysProp);
		return maximoSysProp;
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
	
		// Create Task 1
		logger.info("Task API Call started ");
		List<Task> arr = new ArrayList<>();
		Task task = new Task();
		task.setDescription(TASK_TITLE);
		task.setTaskid(Integer.parseInt("10"));
		task.setStatus(WoStatus.WAPPR.toString());
		task.setAssetnum(assetNum1);
		task.setLocation(location1);
		task.setLongDescription(TASK_LONG_DESCRIPTION);
		arr.add(task);
		newWorkOrder.setWoactivity(arr);
		maximoApi.update(newWorkOrder);
		logger.info("Tasks added");			
	}
}
