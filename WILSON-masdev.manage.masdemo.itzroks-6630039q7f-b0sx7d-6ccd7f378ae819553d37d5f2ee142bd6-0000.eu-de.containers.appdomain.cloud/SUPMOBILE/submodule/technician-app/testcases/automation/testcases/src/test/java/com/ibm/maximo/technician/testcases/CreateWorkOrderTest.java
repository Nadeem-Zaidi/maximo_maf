package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
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
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.CreateWorkOrderPage;
import com.ibm.maximo.technician.page.ErrorPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51048 - [TECHMOBILE] Create Work Order 
 */

public class CreateWorkOrderTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(CreateWorkOrderTest.class);
	public AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, locationNum , labor;
	private int startYear = 2022, finishYear = 2030, startMonth = 8, startDate = 10, hour = 10, minute = 10;
	private String descriptionStr = "Description of WO";
	private String longDescriptionStr = "Long Description Added";
	private String assetdescription = "ASSET_1";
	private String assetdescriptionInvalid = "INVALID_ASSET_1";
	private WorkOrder newWorkOrder;
	private String LOCATION_DESCRIPTION = "INVALID_LOCATION_1";
	private String priority = "1";
	private String hrs = "20", min = "20";
	private String navigatorClick = "NavigatorMenuButton";
	private String navigatorErrorBadgeId = "navigator_errorbadge";

	private String invalidStatus = "BMXAA0090E - Asset INVALID_ASSET_1 is not a valid asset, or its status is not an operating status.";
	private String noErrorText = "No errors to correct.";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************CreateWorkOrderTest*********************************");
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
			login(af);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" }, description = "Verify the user can save the work order with the values in the required field and when save action is performed, User is taken to the WO details view and the page with all the values specified + Verify user can see the asset/location IDs and descriptions", timeOut = 300000)
	public void createWorkOrder() throws Exception {

		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		CreateWorkOrderPage createWO = new CreateWorkOrderPage(maf);

		// Click on plus icon on Navigator page
		createWO.getplusiconClick();

		// Click on Create Work Order
		createWO.selectCreateWO();

		// Enter Description in create WO
		createWO.insertDescriptionOfWorkOrder(descriptionStr);

		// Enter Long description
		createWO.enterLongDescription(longDescriptionStr);

		// Enter priority
		createWO.priorityEnter(priority);
		
		maf.scrollPage(1, 2);

		// Select Schedule start date and time
		createWO.scheduledStartDateAndTime(startYear, startMonth, startDate, hour, minute);

		// Select Schedule finish date and time
		createWO.scheduledFinishDateAndTime(finishYear, startMonth, startDate, hour, minute);

		// Enter Estimated Time
		createWO.estDurHrsLocator(hrs);
		createWO.estDurMinsLocator(min);

		// Click chevron to select work type
		createWO.changeWorkType(WorkType.CAL);

		// Verify that the asset record is found and selected
		assertTrue(createWO.searchForAssets(assetNum));

		// Verify that correct location record is found
		assertTrue(createWO.searchForLocation(locationNum));

		// Tap on Confirm work Order Creation button (check mark at the top of the page)
		createWO.clickWorkOrderCreate();

		// Assert to verify asset number displayed is correct
		assertEquals(assetNum, createWO.getAssetTextWOPage());
	}

	@Test(groups = {
			"mobile" }, description = "Verify when user enter the invalid asset value in asset field then error message is displayed", timeOut = 240000)
	public void invalidAssetError() throws Exception {

		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		CreateWorkOrderPage createWO = new CreateWorkOrderPage(maf);
		ErrorPage errorpage = new ErrorPage(maf);

		// Click on 9 dots(Navigator menu)
		errorpage.clickNavigatorMenu();

		// Click on plus icon
		createWO.getplusiconClick();

		// Click on Create Work Order
		createWO.selectCreateWO();

		// Enter Description in create WO
		createWO.insertDescriptionOfWorkOrder(assetdescriptionInvalid);

		// Insert description of asset
		errorpage.addAssetDescription(assetdescriptionInvalid);

		// Tap on Confirm work Order Creation button (check mark at the top of the page)
		createWO.clickWorkOrderCreate();
		
		
		com.ibm.maximo.automation.mobile.page.ErrorPage err = new com.ibm.maximo.automation.mobile.page.ErrorPage(maf);
		maf.switchToParentFrame();

		// Tap on Error page
		err.clickErrorBadge();
		
		//click open the transaction to verify the error message 
		err.clickTransactionChevron(true);
		
		//verify pop up displayed for invalid error message 
		assertEquals(invalidStatus, err.getErrorMessageTextForInvalidAsset());				
		
//		/*
//		 * Need to uncomment this once issue is resolved GRAPHITE-52351
//		 * 
//		 * 
//		 * // Verify that there's the message "Asset invalid_asset_1 is not a valid
//		 * asset // or its status is not an operating status"
//		 * assertEquals(invalidStatus, errorpage.getErrorMessageText());
//		 */
		
		//click open the transaction to verify the error message 
		err.clickTransactionChevron(true);
				
		//verify pop up displayed for invalid error message 
		assertEquals(invalidStatus, err.getErrorMessageTextForInvalidAsset());
		
		maf.changeToDefaultContext();

	}

	@Test(groups = {
			"mobile" }, description = "Verify that all newly created work order should be shown in 'Work created by me' view", timeOut = 300000)
	public void workOrderCreatedByMe() throws Exception {

		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		CreateWorkOrderPage createWO = new CreateWorkOrderPage(maf);
		ErrorPage errorpage = new ErrorPage(maf);
		AppSwitcher appSwitcher = new AppSwitcher(af);
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Called permission in constructor as unwanted permission page is coming.
		MySchedulePage ms = new MySchedulePage(af);

		// Tap on Navigator menu
		errorpage.clickNavigatorMenu();

		// Click on My Schedule
		appSwitcher.switchApp(App.MySchedule);

		// Open Work Orders created by me from dropdown
		createWO.openNativeDropdown(2);

		// Assert work order created is found in "WO created by me"
		assertEquals(true, assignedWorkPage.search(assetNum));

	}

	protected void createDefaultObjects() throws Exception {

		// Create an asset
				logger.info("Creating an asset");
				assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
				String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");

				Asset newAsset = new Gson().fromJson(assetResult, Asset.class);

				newAsset.setAssetNum(assetNum);
				newAsset.setDescription(assetdescription);
				newAsset.setSiteId(SetupData.SITEID);
				newAsset.setStatus(SetupData.LocAssetStatus.ACTIVE.toString());

				maximoApi.create(newAsset);
				logger.info("Asset: {}" + assetNum);

				// Create a location
				logger.info("Creating a location");
				locationNum = AbstractAutomationFramework.randomString(5).toUpperCase();
				Location newlocation = new Location();

				newlocation.setLocationId(locationNum);
				newlocation.setDescription(LOCATION_DESCRIPTION);
				newlocation.setSiteId(SetupData.SITEID);
				

				maximoApi.create(newlocation);
				logger.info("location: {}" + locationNum);
				
				
				// Create a workorder
				logger.info("Creating a work order");
				String workOrderResult = maximoApi.retrieve(new WorkOrder(),
						"addid=1&internalvalues=1&action=system:new&addschema=1");
				newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
				newWorkOrder.setDescription("WorkeOrder for mobile automation test");
				newWorkOrder.setAssetNum(assetNum);
				newWorkOrder.setWorkType(WorkType.PM.toString());
				newWorkOrder.setGLAccount(SetupData.GLDEBITACCT);
				maximoApi.create(newWorkOrder);
				woNum = newWorkOrder.getWoNum();
				logger.info("Work Order: {}" + woNum);

				// Change WO status to Approved
				logger.info("Changing work order status to APPR");
				maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

				// Assignment with labor maxadmin
				maximoApi.addAssignmentLabor(newWorkOrder, labor);
				logger.info("Assignment added");
	}

	public void switchAppByNavigator(String appName, AbstractAutomationFramework framework) throws Exception {
		this.af = framework;
		MobileAutomationFramework maf = (MobileAutomationFramework) af;
		maf.switchToParentFrame();
		logger.info("Wait for appName be enabled to click on it");
		// Wait for appName be enabled to click on it
		maf.waitForElementToBeEnabled(By.xpath("//*[text()='" + appName + "']/../../../../../.."),
				maf.DEFAULT_TIMEOUT_MS * 10);
		logger.info("Wait for appName Chevron be available to click on it");
		// Wait for appName Chevron be available to click on it
		maf.waitForElementToBePresent(By.xpath("//*[text()='" + appName + "']/../../../../div[3]/div/div[3]/div/div"),
				maf.DEFAULT_TIMEOUT_MS * 10);
		logger.info("All Apps Data Download has been completed");
	}

}