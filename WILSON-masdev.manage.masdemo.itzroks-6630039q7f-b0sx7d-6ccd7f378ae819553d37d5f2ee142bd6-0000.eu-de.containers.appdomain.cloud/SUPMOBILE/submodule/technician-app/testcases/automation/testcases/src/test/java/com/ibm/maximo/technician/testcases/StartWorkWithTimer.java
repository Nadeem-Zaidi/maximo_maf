package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
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
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.google.gson.Gson;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-53319: Eli should be able to view start work (with timer) when travel is complete and when the configuration is set to track labor hours
 */


public class StartWorkWithTimer extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(StartWorkWithTimer.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, woNum, labor;
	private WorkOrder newWorkOrder;
	private	String woType = WorkType.PM.toString();
	private static final String ASSET_DESCRIPTION = "Asset for mobile automation test";
	private static final String WO_DESCRIPTION = "WorkeOrder for mobile automation test";
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************StartWorkWithTimer*********************************");
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
	
	@Test(groups = { "mobile" }, description = "Verify user is able to view start work order button with timer icon", timeOut = 300000)
	public void startWorkOrder() throws Exception {

		// Open work order list page
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetailsPage = new WorkOrderDetailsPage(af);
		// Search the work order
		assertTrue(assignedWorkPage.search(woNum), "Fail : Search Work Order is not displayed");
		// Click on selected workorder to open Work Order Details Page
		assignedWorkPage.openWorkOrderDetails();
		// Check if redirected to Work Order Details Page
		assertEquals("Work order", woDetailsPage.getInfo());
		logger.info("Current Page : " + woDetailsPage.getInfo());
		// Check for the Start Work button with timer on WO Details Page
		assertEquals("maximo:start-work", woDetailsPage.getStartWorkTimerButtonIcon());
		logger.info("START BUTTON ICON ON WO DETAILS PAGE : " + woDetailsPage.getStartWorkTimerButtonIcon());
		// Click Back to WO List Page
		woDetailsPage.clickBackWOList();
		// Start the work order
		assignedWorkPage.clickStartWorkButton();
		// Check if redirected to Work Order Details Page
		assertEquals("Work order", woDetailsPage.getInfo());
		logger.info("Current Page : " + woDetailsPage.getInfo());
	}

	
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
//		 Update System Properties
		this.updateSystemProperties();
		
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setDescription(ASSET_DESCRIPTION);
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

		// Create a workorder
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription(WO_DESCRIPTION);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assignment with labor wilson
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

	}
	
	protected void updateSystemProperties() throws Exception {
//		 Set System Properties
		maximoApi.setProperty("maximo.mobile.usetimer","COMMON",null,"1");
		logger.info("System Properties Set Successfully");
	}
}
