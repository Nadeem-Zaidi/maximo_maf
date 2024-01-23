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

import com.google.gson.Gson;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.AssetDetailsPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-50896: Keep the WO number visible after pressing the "Edit" button inside a Work Order on the App
 */

public class SwitchToAssetDetailsTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(SwitchToAssetDetailsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String assetNum, woNum, labor, woType = WorkType.PM.toString();

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************SwitchToAssetDetailsTest*********************************");
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
			"mobile" }, description = "Verify user is able to go to detail in Work order page and it has correct title", timeOut = 250000)
	public void viewWorkOrderDetails() throws Exception {

		// Open work order list page
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);
		AssetDetailsPage assetDetailsPage = new AssetDetailsPage(af);

		// Search the workorder
		assertTrue(assignedWorkPage.search(woNum), "Searched workorder was not found");

		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();

		// Click on Asset chevron to navigate to asset details page
		assignedWorkOrderDetailsPage.clickAssetChevronButton();
		String assetDescription = "Asset Description" + assetNum;
		assertEquals(assetDescription, assetDetailsPage.getTextAssetDescription());
		assertEquals("Asset", assetDetailsPage.getTitle(assetDetailsPage.pageTitle));
		// Navigate back to tech app to workorder details page
		assetDetailsPage.clickButton(assetDetailsPage.assetDetailBreadcrumb);
		String workorderDescription = "Work Order Description" + WorkType.PM.toString() + " " + woNum;
		assertEquals(WorkOrderDetailsPage.getTextWODescription(), workorderDescription);
		logger.info("Navigation back to work order details page in Technician app done correctly.");
		
		// Back to WO list view
		WorkOrderDetailsPage.clickBackWOList();
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setDescription("Asset Description");
		newAsset.setStatus("ACTIVE");
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

		// Create a workorder
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription("Work Order Description");
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
	}
}
