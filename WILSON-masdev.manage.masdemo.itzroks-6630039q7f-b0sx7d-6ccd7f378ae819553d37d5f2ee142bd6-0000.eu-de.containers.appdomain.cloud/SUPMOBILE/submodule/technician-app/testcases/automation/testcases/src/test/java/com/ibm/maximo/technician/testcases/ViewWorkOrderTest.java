package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Random;

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
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-50896: Keep the WO number visible after pressing the "Edit" button inside a Work Order on the App
 */

public class ViewWorkOrderTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ViewWorkOrderTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private static final String ASSET_DESCRIPTION = "Asset Description ";
	private static final String WORKORDER_DESCRIPTION = "Work Order Description ";
	private String assetNum, woNum, labor, woType = WorkType.PM.toString();

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************ViewWorkOrderTest*********************************");		
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
			"mobile" },  description = "Verify user is able to go to detail in Work order page and it has correct title", timeOut = 500000)
	public void viewWorkOrderDetails() throws Exception {

		// Permission check in MySchedulePage Constructor then WO list page displayed
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		// Open work order detail page
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);
		assertTrue(assignedWorkPage.search(woNum));

		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();

		// click on Edit Work Order
		assignedWorkOrderDetailsPage.editWorkOrderDetails();
		// verify Work Order page title value
		String dynamicTitle = assignedWorkOrderDetailsPage.getTitle(assignedWorkOrderDetailsPage.woEditPageTitle);
		String expectedTitle = woNum + " Edit work order";
		assertEquals(expectedTitle, dynamicTitle);
		assignedWorkOrderDetailsPage.clickButton(assignedWorkOrderDetailsPage.workOrderBreadcrumb);
	}

	@Test(groups = {
			"mobile" },  description = "Verify user is able to go to detail in report page and it has correct title", timeOut = 500000)
	public void viewWorkOrderReport() throws Exception {

		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);

		assignedWorkOrderDetailsPage.clickReportWorkButton();
		// verify Report page title value
		String dynamicTitle = assignedWorkOrderDetailsPage.getTitle(assignedWorkOrderDetailsPage.reportWorkPageTitle);
		String expectedTitle =  woNum + " Report work";
		assertEquals(expectedTitle, dynamicTitle);
		assignedWorkOrderDetailsPage.clickButton(assignedWorkOrderDetailsPage.reportWorkBreadcrumb);

	}

	@Test(groups = {
			"mobile" },  description = "Verify user is able to go to detail in task page and it has correct title", timeOut = 500000)
	public void viewWorkOrderTask() throws Exception {
		// Open work order list page
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);

		// click on Task Work
		assignedWorkOrderDetailsPage.clickTaskButton();
		// verify Task page title value
		String dynamicTitle = assignedWorkOrderDetailsPage.getTitle(assignedWorkOrderDetailsPage.taskPageTitle);
		String expectedTitle = woNum + " Tasks";
		assertEquals(expectedTitle, dynamicTitle);
		assignedWorkOrderDetailsPage.clickButton(assignedWorkOrderDetailsPage.taskBreadcrumb);

		// Back to WO list view
		WorkOrderDetailsPage.clickBackWOList();
		Thread.sleep(2000);
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setDescription(ASSET_DESCRIPTION + assetNum);
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

		// Create a workorder
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription(WORKORDER_DESCRIPTION+assetNum);
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(woType);
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: {}" + woNum);

		// Add Tasks in WO
		logger.info("Task API Call started ");
		List<Task> arr = new ArrayList<Task>();
		Task task = new Task();
		Random rand = new Random();
		// Random float number
		task.setEstdur(rand.nextFloat()*(1000F-1F));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("Workorder for mobile automation test");
		task.setOwnergroup(SetupData.OWNERGROUP);
		task.setParentchgsstatus(true);
		// Random number between 0-999
		task.setTaskid(rand.nextInt(1000));
		task.setStatus(WoStatus.APPR.toString());
		arr.add(task);
		newWorkOrder.setWoactivity(arr);
		maximoApi.update(newWorkOrder);
		logger.info("Task added");
		
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
	}
}
