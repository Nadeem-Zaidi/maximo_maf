package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotEquals;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.google.gson.Gson;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.JdbcConnection;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.MultipleAssetsLocationsCIs;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

// GRAPHITE-51073 - Multi asset and location and Corresponding touchpoints(Meters, Inspections)
public class MultiAssetLocationTestSuiteTwo extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(MultiAssetLocationTestSuiteTwo.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, locationNum, labor, locationNum1, locationNum2, locationNum3, woNum, woNum1, asset1, loc1,
			loc2, progress;
	private WorkOrder workOrder;

	public static JdbcConnection jdbcConnection;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************MultiAssetLocationTestSuiteTwo*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			maximoApi = new MaximoApi();
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));
			jdbcConnection = new JdbcConnection(properties.getProperty("system.maximoDBDriver"),
					properties.getProperty("system.maximoDBURL"), properties.getProperty("system.maximoDBUsername"),
					properties.getProperty("system.maximoDBPassword"));

		} catch (Exception e) {
			e.printStackTrace();
		}

		// Create Location
		createLocationWithDescription("Location for mobile automation test 1");
		locationNum1 = locationNum;
		createLocationWithDescription("Location for mobile automation test 2");
		locationNum2 = locationNum;
		createLocationWithDescription(null);
		locationNum3 = locationNum;

		// Create Multi Assets
		createAssetWithLocation(locationNum1);
		createAssetWithLocation(locationNum2);
		createAssetWithLocation(locationNum3);

		// Create Work Order with Multiple Locations
		createWorkOrderWithMultiLocation(locationNum1, locationNum2, locationNum3);
		woNum1 = woNum;

		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		
		logger.info("Change Status to complete for Workorder " + workOrder.getWoNum());
		maximoApi.changeStatus(workOrder, WoStatus.COMP.toString());
		
		//TODO : Complete WorkOrder which is created as testdata
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" }, description = "verify the asset and location and multi-asset/location on Work order details page", timeOut = 1400000)

	public void main() throws Exception {
		verifyMarkCompleteOnWorkOrderDetailsPage();
		verifyUndoOnWorkOrderDetailsPage();
	}

	/**
	 * Verify the changes and functionality when technician taps on Mark complete
	 * button on a multi-asset/location record
	 * 
	 * @throws Exception
	 */
	public void verifyMarkCompleteOnWorkOrderDetailsPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetialspage = new WorkOrderDetailsPage(af);

		// Search the WO
		assignedWorkPage.search(woNum1);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Getting the current Asset and Location ids from section opened
		asset1 = workOrderDetialspage.getMultiAssetLocationCIID(0);
		loc1 = workOrderDetialspage.getMultiAssetLocationCISectionID();
		// Click on Mark Complete
		workOrderDetialspage.clickMarkCompleteInMultiAssetLocationCISection();
		logger.info("Mark Complete clicked");
		// Verify the previous section is closed and next is open
		loc2 = workOrderDetialspage.getMultiAssetLocationCISectionID();
		assertNotEquals(loc1, loc2);
		logger.info("Next Section is now open");
		// Check MULTIASSETLOCCI.PROGRESS=1 for previous section
		selectProgressFromDataBase(loc1);
		assertEquals(progress, "1");
		logger.info("Location " + loc1 + " Progress is correctly set as 1");
		// Verify green check-mark next to the asset/location icon on the header of that
		// multi-asset/location record
		af.isElementExists(By.id("y8rea[0]"));
		logger.info("Green check-mark is correctly displayed");
		// The mark complete button should change to Undo button on that
		// multi-asset/location record.
		workOrderDetialspage.clickMultiAssetLocationCISection(woNum1, "assetnum", asset1);
		logger.info("Section Open");
		af.isElementExists(By.id(workOrderDetialspage.multiAssetLocationCISectionUndoButton));
		logger.info("Undo button is correctly displayed for " + asset1);

	}

	/**
	 * Verify the changes and functionality when technician taps on Mark complete
	 * button on a multi-asset/location record
	 * 
	 * @throws Exception
	 */
	public void verifyUndoOnWorkOrderDetailsPage() throws Exception {

		WorkOrderDetailsPage workOrderDetialspage = new WorkOrderDetailsPage(af);

		// Click on Undo
		workOrderDetialspage.clickUndoInMultiAssetLocationCISection();
		Thread.sleep(3000);
		// Check MULTIASSETLOCCI.PROGRESS=0 for previous section
		selectProgressFromDataBase(loc1);
		assertEquals(progress, "0");
		logger.info("Location " + loc1 + " Progress is correctly set as 0");
		// Verify green check-mark next to the asset/location icon on the header of that
		// multi-asset/location record
		assertFalse(af.isElementExists(By.id("y8rea[0]")));
		logger.info("Green check-mark is correctly NOT displayed");
		// The Undo button should change to Mark Complete button on that
		// multi-asset/location record.
		af.isElementExists(By.id(workOrderDetialspage.multiAssetLocationCISectionMarkCompleteButton));
		logger.info("Mark Complete button is correctly displayed for " + asset1);

	}

	/**
	 * Create Asset with Location
	 * 
	 * @throws Exception
	 */
	public void createAssetWithLocation(String locationNum) throws Exception {
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
	
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
	
		newAsset.setAssetNum(assetNum);
		newAsset.setSiteId(SetupData.SITEID);
		newAsset.setLocation(locationNum);
	
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

	}

	/**
	 * Create Location with Description
	 * 
	 * @throws Exception
	 */
	public void createLocationWithDescription(String description) throws Exception {
		// Create location
		logger.info("Creating a location");
		locationNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();
	
		newlocation.setLocationId(locationNum);
		newlocation.setDescription(description);
		newlocation.setSiteId(SetupData.SITEID);
	
		maximoApi.create(newlocation);
		logger.info("location: {}" + locationNum);

	}

	/**
	 * Create Work Order with Multiple Locations
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderWithMultiLocation(String multiAssetLocCI1, String multiAssetLocCI2,
			String multiAssetLocCI3) throws Exception {
		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		workOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		workOrder.setWoNum(woNum);
		workOrder.setSiteId(SetupData.SITEID);
		workOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(workOrder);
		logger.info("Work Order: {}" + woNum);

		// Create Multiple Locations
		List<MultipleAssetsLocationsCIs> amalc = new ArrayList<MultipleAssetsLocationsCIs>();
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI1, null));
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI2, null));
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI3, null));
		workOrder.setMultiassetlocci(amalc);
		maximoApi.update(workOrder);
		logger.info("Multiple Locations added");

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(workOrder, WoStatus.APPR.toString());
	}
	
	public void selectProgressFromDataBase(String record) throws Exception {
		Object[] resultsObjects = MultiAssetLocationTestSuiteTwo.jdbcConnection
				.executeSQL("select progress from multiassetlocci where location = '" + record + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		progress = resultArray1[0] + "";
	}

}
