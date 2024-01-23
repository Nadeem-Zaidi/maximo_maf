package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

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
public class MultiAssetLocationTestSuiteOne extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(MultiAssetLocationTestSuiteOne.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, assetNum1, assetNum2, assetNum3, assetNum4, assetNum5, assetNum6, assetNum7, locationNum,
			labor, locationNum1, locationNum2, locationNum3, locationNum4, locationNum5, locationNum6, locationNum7,
			woNum, woNum1, woNum2, woNum3, woNum4;
	private List<WorkOrder> workOrderList;
	
	private static final String ASSET_DESCRIPTION = "Asset Description ";
	private static final String LOCATION_DESCRIPTION = "Location for mobile automation test ";
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************MultiAssetLocationTestSuiteOne*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			maximoApi = new MaximoApi();
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		workOrderList = new ArrayList<>();

		// Create Location
		createLocation();
		locationNum1 = locationNum;
		
		// Create Asset
		createAssetWithLocation(locationNum1);
		assetNum1 = assetNum;

		// Create Work Order with Asset and Location
		createWorkOrderWithAssetAndLocation(assetNum1, locationNum1);
		woNum1 = woNum;

		// Create Work Order without Asset or Location
		createWorkOrderWithAssetAndLocation(null, null);
		woNum2 = woNum;

		// Create Location
		createLocationWithDescription("Location for mobile automation test 1");
		locationNum2 = locationNum;
		createLocationWithDescription("Location for mobile automation test 2");
		locationNum3 = locationNum;
		createLocationWithDescription(null);
		locationNum4 = locationNum;

		// Create Multi Assets
		createAssetWithLocation(locationNum2);
		assetNum2 = assetNum;
		createAssetWithLocation(locationNum3);
		assetNum3 = assetNum;
		createAssetWithLocation(locationNum4);
		assetNum4 = assetNum;

		// Create Work Order with Multiple Assets
		createWorkOrderWithMultiAsset(assetNum2, assetNum3, assetNum4);
		woNum3 = woNum;

		// Create Location
		createLocationWithDescription("Location for mobile automation test 1");
		locationNum5 = locationNum;
		createLocationWithDescription("Location for mobile automation test 2");
		locationNum6 = locationNum;
		createLocationWithDescription(null);
		locationNum7 = locationNum;

		// Create Multi Assets
		createAssetWithLocation(locationNum5);
		assetNum5 = assetNum;
		createAssetWithLocation(locationNum6);
		assetNum6 = assetNum;
		createAssetWithLocation(locationNum7);
		assetNum7 = assetNum;

		// Create Work Order with Multiple Locations
		createWorkOrderWithMultiLocation(locationNum5, locationNum6, locationNum7);
		woNum4 = woNum;

		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		
		for(WorkOrder workOrder: workOrderList) {
			logger.info("Change Status to complete for Workorder " + workOrder.getWoNum());
			maximoApi.changeStatus(workOrder, WoStatus.COMP.toString());
		}
		
		//TODO : Complete WorkOrder which is created as testdata
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" }, description = "verify the asset and location and multi-asset/location on Work order details page", timeOut = 1100000)

	public void main() throws Exception {
		verifyAssetAndLocationOnWorkOrderDetailsPage();
		verifyAssetArrowsOnWorkOrderDetailsPage();
		verifyLocationInformationInMultiAssetOnWorkOrderDetailsPage();
		verifyAssetInformationInMultiLocationOnWorkOrderDetailsPage();
	}

	/**
	 * Verify the Asset and location description in Asset and location section on
	 * Work order details page
	 * 
	 * @throws Exception
	 */
	public void verifyAssetAndLocationOnWorkOrderDetailsPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetialspage = new WorkOrderDetailsPage(af);

		// Search the WO
		assignedWorkPage.search(woNum1);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Verify Asset and location section is displayed
		assertTrue(af.isElementExists(By.id(workOrderDetialspage.assetAndLocationSection)));
		logger.info("Asset and location section is correctly displayed.");
		// Verify Asset ID is displayed
		assertEquals(workOrderDetialspage.getAssetID(), assetNum1);
		logger.info("Asset ID is correctly displayed.");
		// Verify Asset Description is displayed
		assertEquals(workOrderDetialspage.getAssetDescription(), "Asset Description " + assetNum1);
		logger.info("Asset description is correctly displayed.");
		// Verify Location Description is displayed
		assertEquals(workOrderDetialspage.getLocationDescription(), "Location for mobile automation test");
		logger.info("Location description is correctly displayed.");

	}

	/**
	 * Verify the asset "Up/Down" state in Asset and location section if user has
	 * attached asset with work order
	 * 
	 * @throws Exception
	 */
	public void verifyAssetArrowsOnWorkOrderDetailsPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetialspage = new WorkOrderDetailsPage(af);

		// Verify Asset Arrow Up is displayed
		assertEquals(workOrderDetialspage.getAssetUpArrow(), "Up");
		logger.info("Asset Arrow Up is correctly displayed.");
		// Click on Asset Up or Down button
		workOrderDetialspage.clickAssetUpOrDownButton();
		// Click on Down button
		workOrderDetialspage.clickAssetDownButton();
		// Confirm asset status
		workOrderDetialspage.clickConfirmAssetStatusButton();
		// Verify Asset Arrow Up is displayed
		assertEquals(workOrderDetialspage.getAssetDownArrow(), "Down");
		logger.info("Asset Arrow Down is correctly displayed.");
		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Clear the search filter
		logger.info("Clear the search filter");
		assignedWorkPage.clickClearButton();
		// Search the WO
		assignedWorkPage.search(woNum2);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Verify Asset Arrow Up is not displayed
		assertFalse(af.isElementExists(By.id(workOrderDetialspage.assetUpArrow)));
		logger.info("Asset Arrow Up is NOT displayed correctly for " + woNum2);
		// Verify Asset Arrow Down is not displayed
		assertFalse(af.isElementExists(By.id(workOrderDetialspage.assetDownArrow)));
		logger.info("Asset Arrow Down is NOT displayed correctly for " + woNum2);

	}

	/**
	 * Verify location information in each multi asset record when multi asset
	 * records with location are added to work order
	 * 
	 * @throws Exception
	 */
	public void verifyLocationInformationInMultiAssetOnWorkOrderDetailsPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetialspage = new WorkOrderDetailsPage(af);

		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Clear the search filter
		logger.info("Clear the search filter");
		assignedWorkPage.clickClearButton();
		// Search the WO
		assignedWorkPage.search(woNum3);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Checking Multi Asset Location CI Sections
		for (int i = 0; i < 3; i++) {
			try {
				if (workOrderDetialspage.getMultiAssetLocationCIID(i).equals(assetNum4)) {
					if (i != 0) {
						// Opening
						workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum4);
						logger.info("Section Open");
					}
					// Assert Asset ID and Asset Description
					assertEquals(workOrderDetialspage.getMultiAssetLocationCIID(i), assetNum4);
					logger.info(assetNum4 + " Correctly displayed");
					assertEquals(workOrderDetialspage.getMultiAssetLocationCIDescription(i),
							"Asset Description " + assetNum4);
					logger.info("Asset Description " + assetNum4 + " Correctly displayed");
					// Assert Location ID and Location Description
					assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionID(), locationNum4);
					logger.info(locationNum4 + " Correctly displayed");
					assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionUnspecifiedDescription(), "-");
					logger.info("Location Description " + " - " + " Correctly displayed");
					// Closing
					workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum4);
					logger.info("Section Closed");
				} else {
					if (workOrderDetialspage.getMultiAssetLocationCIID(i).equals(assetNum3)) {
						
						// closing first section
						workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum4);
						logger.info("Section Close");
						
						
						if (i != 0) {
							// Opening
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum3);
							logger.info("Section Open");
						}
						// Assert Asset ID and Asset Description
						assertEquals(workOrderDetialspage.getMultiAssetLocationCIID(i), assetNum3);
						logger.info(assetNum3 + " Correctly displayed");
						assertEquals("Asset Description " + assetNum3,
								workOrderDetialspage.getMultiAssetLocationCIDescription(i));
						logger.info("Asset Description " + assetNum3 + " Correctly displayed");
						// Assert Location ID and Location Description
						assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionID(), locationNum3);
						logger.info(locationNum3 + " Correctly displayed");
						assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionDescription(),
								"Location for mobile automation test 2");
						logger.info("Location for mobile automation test 2" + " Correctly displayed");
						// Closing
						workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum3);
						logger.info("Section Closed");
					} else {
						if (workOrderDetialspage.getMultiAssetLocationCIID(i).equals(assetNum2)) {
							
							// closing first 2 sections
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum3);
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum4);
							logger.info("Section Close");
							
							if (i != 0) {
								// Opening
								workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum2);
								logger.info("Section Open");
							}
							// Asset Asset ID and Asset Description
							assertEquals(workOrderDetialspage.getMultiAssetLocationCIID(i), assetNum2);
							logger.info(assetNum2 + " Correctly displayed");
							assertEquals(workOrderDetialspage.getMultiAssetLocationCIDescription(i),
									"Asset Description " + assetNum2);
							logger.info("Asset Description " + assetNum2 + " Correctly displayed");
							// Assert Location ID and Location Description
							assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionID(), locationNum2);
							logger.info(locationNum2 + " Correctly displayed");
							assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionDescription(),
									"Location for mobile automation test 1");
							logger.info("Location for mobile automation test 1" + " Correctly displayed");
							// Closing
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum3, "assetnum", assetNum2);
							logger.info("Section Closed");
						}
					}
				}
			} catch (Exception e) {
				logger.info("No Asset was found");
			}
		}

	}

	/**
	 * Verify asset information in each multi location record which are added to
	 * work order
	 * 
	 * @throws Exception
	 */
	public void verifyAssetInformationInMultiLocationOnWorkOrderDetailsPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetialspage = new WorkOrderDetailsPage(af);

		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Clear the search filter
		logger.info("Clear the search filter");
		assignedWorkPage.clickClearButton();
		// Search the WO
		assignedWorkPage.search(woNum4);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Checking Multi Asset Location CI Sections
		for (int i = 0; i < 3; i++) {
			try {
				if (workOrderDetialspage.getMultiAssetLocationCIID(i).equals(assetNum7)) {
					if (i != 0) {
						// Opening
						workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum7);
						logger.info("Section Open");
					}
					// Assert Asset ID and Asset Description
					assertEquals(workOrderDetialspage.getMultiAssetLocationCIID(i), assetNum7);
					logger.info(assetNum7 + " Correctly displayed");
					assertEquals(workOrderDetialspage.getMultiAssetLocationCIDescription(i),
							"Asset Description " + assetNum7);
					logger.info("Asset Description " + assetNum7 + " Correctly displayed");
					// Assert Location ID and Location Description
					assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionID(), locationNum7);
					logger.info(locationNum7 + " Correctly displayed");
					assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionUnspecifiedDescription(), "-");
					logger.info("Location Description " + " - " + " Correctly displayed");
					// Closing
					workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum7);
					logger.info("Section Closed");
				} else {
					if (workOrderDetialspage.getMultiAssetLocationCIID(i).equals(assetNum6)) {
						
						// Closing first section
						workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum7);
						logger.info("Section close");
						
						if (i != 0) {
							// Opening
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum6);
							logger.info("Section Open");
						}
						// Assert Asset ID and Asset Description
						assertEquals(workOrderDetialspage.getMultiAssetLocationCIID(i), assetNum6);
						logger.info(assetNum6 + " Correctly displayed");
						assertEquals("Asset Description " + assetNum6,
								workOrderDetialspage.getMultiAssetLocationCIDescription(i));
						logger.info("Asset Description " + assetNum6 + " Correctly displayed");
						// Assert Location ID and Location Description
						assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionID(), locationNum6);
						logger.info(locationNum6 + " Correctly displayed");
						assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionDescription(),
								"Location for mobile automation test 2");
						logger.info("Location for mobile automation test 2" + " Correctly displayed");
						// Closing
						workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum6);
						logger.info("Section Closed");
					} else {
						if (workOrderDetialspage.getMultiAssetLocationCIID(i).equals(assetNum5)) {
							
							// Closing first 2 sections
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum7);
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum6);
							logger.info("Section close");
							
							
							if (i != 0) {
								// Opening
								workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum5);
								logger.info("Section Open");
							}
							// Asset Asset ID and Asset Description
							assertEquals(workOrderDetialspage.getMultiAssetLocationCIID(i), assetNum5);
							logger.info(assetNum5 + " Correctly displayed");
							assertEquals(workOrderDetialspage.getMultiAssetLocationCIDescription(i),
									"Asset Description " + assetNum5);
							logger.info("Asset Description " + assetNum5 + " Correctly displayed");
							// Assert Location ID and Location Description
							assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionID(), locationNum5);
							logger.info(locationNum5 + " Correctly displayed");
							assertEquals(workOrderDetialspage.getMultiAssetLocationCISectionDescription(),
									"Location for mobile automation test 1");
							logger.info("Location for mobile automation test 1" + " Correctly displayed");
							// Closing
							workOrderDetialspage.clickMultiAssetLocationCISection(woNum4, "assetnum", assetNum5);
							logger.info("Section Closed");
						}
					}
				}
			} catch (Exception e) {
				logger.info("No Asset was found");
			}
		}

	}

	/**
	 * Create Asset
	 * 
	 * @throws Exception
	 */
	public void createAsset() throws Exception {
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");

		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);

		newAsset.setAssetNum(assetNum);
		newAsset.setDescription(ASSET_DESCRIPTION + assetNum);
		newAsset.setSiteId(SetupData.SITEID);

		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);
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
		newAsset.setDescription(ASSET_DESCRIPTION + assetNum);
		newAsset.setSiteId(SetupData.SITEID);
		newAsset.setLocation(locationNum);
	
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);
	}

	/**
	 * Create Location
	 * 
	 * @throws Exception
	 */
	public void createLocation() throws Exception {
		// Create location
		logger.info("Creating a location");
		locationNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();

		newlocation.setLocationId(locationNum);
		newlocation.setDescription(LOCATION_DESCRIPTION);
		newlocation.setSiteId(SetupData.SITEID);
	
		maximoApi.create(newlocation);
		logger.info("location: {}" + locationNum);

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
	 * Create Work Order with Asset and Location
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderWithAssetAndLocation(String assetNum, String locationNum) throws Exception {
		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();

		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		
		// Add Workorder intoList for complete status
		workOrderList.add(newWorkOrder);

	}

	/**
	 * Create Work Order with Multiple Assets
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderWithMultiAsset(String multiAssetLocCI1, String multiAssetLocCI2, String multiAssetLocCI3)
			throws Exception {
		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Create Multiple Locations
		List<MultipleAssetsLocationsCIs> amalc = new ArrayList<MultipleAssetsLocationsCIs>();
		amalc.add(new MultipleAssetsLocationsCIs(multiAssetLocCI1, null, null));
		amalc.add(new MultipleAssetsLocationsCIs(multiAssetLocCI2, null, null));
		amalc.add(new MultipleAssetsLocationsCIs(multiAssetLocCI3, null, null));
		newWorkOrder.setMultiassetlocci(amalc);
		maximoApi.update(newWorkOrder);
		logger.info("Multiple Assets added");

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		
		// Add Workorder intoList for complete status
		workOrderList.add(newWorkOrder);

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
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Create Multiple Locations
		List<MultipleAssetsLocationsCIs> amalc = new ArrayList<MultipleAssetsLocationsCIs>();
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI1, null));
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI2, null));
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI3, null));
		newWorkOrder.setMultiassetlocci(amalc);
		maximoApi.update(newWorkOrder);
		logger.info("Multiple Locations added");

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		
		// Add Workorder intoList for complete status
		workOrderList.add(newWorkOrder);

	}

}
