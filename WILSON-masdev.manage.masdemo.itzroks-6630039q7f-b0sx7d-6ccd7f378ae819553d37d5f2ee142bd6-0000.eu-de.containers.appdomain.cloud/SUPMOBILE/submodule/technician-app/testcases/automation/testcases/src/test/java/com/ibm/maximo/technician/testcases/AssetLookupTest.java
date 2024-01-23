package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

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
import com.ibm.maximo.technician.page.EditWorkOrderPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-44632 vendor and serial number in the asset lookup attribute
 */
public class AssetLookupTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(AssetLookupTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, woNum, labor;
	private WorkOrder newWorkOrder;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************AssetLookupTest*********************************");
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
			"mobile" }, description = "Verify user can report an asset is down or up on WO details page", timeOut = 800000)
	public void checkAssetLookup() throws Exception {
		// Search the work order
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		EditWorkOrderPage editWODetailsPage = new EditWorkOrderPage(af);

		assignedWorkPage.search(woNum);
		assignedWorkPage.openWorkOrderDetails();
		logger.info("WO Details page displayed");
		workOrderDetailsPage.editWorkOrderDetails();
		String dynamicTitle = workOrderDetailsPage.getTitle(workOrderDetailsPage.woEditPageTitle);
		String expectedTitle = woNum + " Edit work order";
		assertEquals(expectedTitle, dynamicTitle);
		logger.info("Title asserted");
		editWODetailsPage.searchForAssets();
		logger.info("search selected");
		editWODetailsPage.resetFilterButtonClick();
		assertEquals("Location", editWODetailsPage.locationLabelText());
		assertEquals("Rotating Item", editWODetailsPage.rotatingItemText());
		assertEquals("Serial #", editWODetailsPage.serialLabelText());
		assertEquals("Type", editWODetailsPage.typeLabelText());
		assertEquals("Vendor", editWODetailsPage.vendorTextMethod());

		editWODetailsPage.typeRecordSelectMethod();
		editWODetailsPage.filterPagebackButton();
		editWODetailsPage.isBadgeDisplayedforTypeNumber();
		editWODetailsPage.VendorSelectRecords();
		editWODetailsPage.filterPagebackButton();
		editWODetailsPage.isBadgeDisplayedforVendor();
		editWODetailsPage.resetFilterButtonClick();
		editWODetailsPage.filterPagebackButton();

	}

	/**
	 * Method to create work order and asset
	 * 
	 * @throws Exception
	 */
	protected void createDefaultObjects() throws Exception {

		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setSiteId(SetupData.SITEID);
		newAsset.setStatus("ACTIVE");
		maximoApi.create(newAsset);
		logger.info("Asset: " + assetNum);

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: " + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
	}

}
