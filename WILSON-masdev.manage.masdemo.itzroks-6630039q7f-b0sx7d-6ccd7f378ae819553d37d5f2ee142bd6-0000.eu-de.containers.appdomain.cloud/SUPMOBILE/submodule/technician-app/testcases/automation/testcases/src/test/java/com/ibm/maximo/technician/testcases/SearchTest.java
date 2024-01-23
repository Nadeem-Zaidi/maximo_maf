package com.ibm.maximo.technician.testcases;

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

import com.google.gson.Gson;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.CreateWorkOrderPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51049: View and Search work lists 3A
 * GRAPHITE-64716: [TECHMOBILE] View and Search work lists :18M,5TA,5A
 */
public class SearchTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(SearchTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder,newWorkOrder1;
	private String assetNum, woNum, woNum2, labor;
	private static final String ASSET_DESCRIPTION = "Asset Description ";
	private static final String WORKORDER_DESCRIPTION = "Work Order Description ";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************SearchTest*********************************");
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

	@Test(groups = { "mobile" },  description = "Search WO by Asset Number Description in a WO list", timeOut = 500000)
	public void searchForWorkOrderByAssetNumberDesc() throws Exception {
		// Permission check in MySchedulePage Constructor then WO list page displayed
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Verify user is able to search the work order with WORKORDER.ASSETNUM.DESCRIPTION
		assertTrue(assignedWorkPage.search(ASSET_DESCRIPTION + assetNum));

		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = { "mobile" },  description = "Search WO by description in a WO list", timeOut = 500000)
	public void searchForWorkOrderByDescription() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Verify user is able to search the work order with WORKORDER.DESCRIPTION
		assertTrue(assignedWorkPage.search(WORKORDER_DESCRIPTION + assetNum));

		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = { "mobile" },  description = "Verify user can view and search in a WO list by WO number", timeOut = 500000)
	public void searchForWorkOrderByWONumber() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Verify user is able to search the work order with WORKORDER.WONUM
		assertTrue(assignedWorkPage.search(woNum));

		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = { "priority2" },  description = "Verify user can view and search in a WO list by WO status", timeOut = 500000)
	public void searchForWorkOrderByStatus() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Verify user is able to search the work order with WORKORDER.STATUS
		assertTrue(assignedWorkPage.search(WoStatus.APPR.toString()));

		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = { "priority2" },  description = "Search WO by Asset Number in a WO list", timeOut = 500000)
	public void searchForWorkOrderByAssetNumber() throws Exception {
		// Permission check in MySchedulePage Constructor then WO list page displayed
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Verify user is able to search the work order with WORKORDER.ASSETNUM
		assertTrue(assignedWorkPage.search(assetNum));

		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = { "priority2" },  description = "Verify that user can search for the completed Work order in the 'Work order history' filter for mobile", timeOut = 500000)
	public void searchForCompletedWOInWOHistory() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		CreateWorkOrderPage createWO = new CreateWorkOrderPage(maf);

		// Open Work Order history from dropdown
		createWO.openNativeDropdown("Work order history");

		// Assert work order completed is found in "WorkOrder History"
		assertTrue(assignedWorkPage.search(woNum2));

		// Open Assigned Work from dropdown
		createWO.openNativeDropdown("Assigned work");
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
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		
		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create a 2nd workorder
		logger.info("Creating a work order 2");
		String workOrderResult2 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder1 = new Gson().fromJson(workOrderResult2, WorkOrder.class);
		newWorkOrder1.setDescription("WO Under History"+assetNum);
		newWorkOrder1.setSiteId(SetupData.SITEID);
		newWorkOrder1.setAssetNum(assetNum);
		newWorkOrder1.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder1);
		woNum2 = newWorkOrder1.getWoNum();
		logger.info("Work Order: {}" + woNum2);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder1, WoStatus.APPR.toString());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder1, labor);
		logger.info("Assignment added");

		logger.info("Changing work order status to COMP");
		maximoApi.changeStatus(newWorkOrder1, WoStatus.COMP.toString());
	}
}
