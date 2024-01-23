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
import com.ibm.maximo.automation.mobile.api.json.Location;
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
 * GRAPHITE-51069: [TECHMOBILE] Edit work order page :71M,1TA,1A
 * 
 */

public class EditWorkOrderDetailsTest extends TechnicianTest {
	private static final String LOCATION_DESCRIPTION = "Location for mobile automation test";
	private static final String ASSET_DESCRIPTION = "Asset for mobile automation test";
	private static final String CHANGE_ASSET_DESCRIPTION = "Change Asset for mobile automation test";
	private static final String CHANGE_LOCATION_DESCRIPTION = "Change location for mobile automation test";
	private final Logger logger = LoggerFactory.getLogger(EditWorkOrderDetailsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String assetNum, woNum, labor, location, assetNumChange, changeLocation;

	private String descriptionStr = "Change Description of WO", longDesText = "enter edit long description",
			Number = "1";
	private int startYear = 2022, finishYear = 2030, startMonth = 8, startDate = 10, hour = 10, minute = 10;
	private String cardId = "cardtemplate1[0]_chevron";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************EditWorkOrderDetailsTest*********************************");
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
		logger.info("Changing work order status to COMP");
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" }, description = "Verify all the edits/changes made on the WO edit page are reflected on the work order details page", timeOut = 480000)
	public void editWOAndVerifyChangesOnWODetails() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		EditWorkOrderPage editWODetailsPage = new EditWorkOrderPage(af);

		// Search the WO
		assertEquals(true, assignedWorkPage.search(woNum));
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);

		workOrderDetailsPage.editWorkOrderDetails();

		editWODetailsPage.enterDescription(descriptionStr + woNum);
		editWODetailsPage.enterLongDescription(longDesText);
		editWODetailsPage.enterPriority(Number);
		editWODetailsPage.scheduledStartDateAndTime(startYear, startMonth, startDate, hour, minute);
		editWODetailsPage.scheduledFinishDateAndTime(finishYear, startMonth, startDate, hour, minute);
		editWODetailsPage.estimatedDuration(Number, Number);
		editWODetailsPage.changeWorkType(WorkType.CAL);
		editWODetailsPage.assetNumber(assetNumChange);
		editWODetailsPage.locationNumber(changeLocation);
		editWODetailsPage.saveEditedWODetails();

//		verify changes in WO details

		String actualString = WorkOrderDetailsPage.getTextWODescription();
		logger.info("WO Description >" + actualString);
		assertEquals(actualString, descriptionStr + woNum);

		String longDes = workOrderDetailsPage.getTextWOLongDescription();
		logger.info("WO Long Description >" + longDes);
		assertEquals(longDes, longDesText);

		String actualStr = workOrderDetailsPage.getTextWOPriority();
		logger.info("WO Priority >" + actualStr);
		assertEquals(actualStr, "Priority " + Number);

		String start = workOrderDetailsPage.getTextWOStart();
		logger.info("WO start >" + start);
		assertEquals(start, "August " + startDate + ", " + startYear);

		String finish = workOrderDetailsPage.getTextWOFinish();
		logger.info("WO finish >" + finish);
		assertEquals(finish, "August " + startDate + ", " + finishYear);

		String actualEstimated = workOrderDetailsPage.getTextWOEstimated();
		logger.info("WO Estimated >" + actualEstimated);
		assertEquals(actualEstimated, Number + " hour " + Number + " minute");

		String asset = workOrderDetailsPage.getTextWOAssetNum();
		logger.info("WO Asset Number >" + asset);
		assertEquals(asset, assetNumChange);

	  String assetChange = workOrderDetailsPage.getTextWOAssetName();
	  logger.info("WO Asset Name >" + assetChange); // assetNameChange
	  assertEquals(assetChange, CHANGE_ASSET_DESCRIPTION);
	  
	  String loc = workOrderDetailsPage.getTextWOLocationName();
	  logger.info("WO Location name >" + loc); assertEquals(loc,
	  CHANGE_LOCATION_DESCRIPTION);
	  
	  String actualType = workOrderDetailsPage.getTextWOType();
	  logger.info("WO Type >" + actualType.toString().trim());
	  assertEquals(actualType, WorkType.CAL.toString() + " " + woNum);
 
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");

		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);

		newAsset.setAssetNum(assetNum);
		newAsset.setDescription(ASSET_DESCRIPTION);
		newAsset.setSiteId(SetupData.SITEID);

		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

		// Create a location
		logger.info("Creating a location");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();

		newlocation.setLocationId(location);
		newlocation.setDescription(LOCATION_DESCRIPTION);
		newlocation.setSiteId(SetupData.SITEID);

		maximoApi.create(newlocation);
		logger.info("location: {}" + location);

		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		newWorkOrder.setLocation(location);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create an asset
		logger.info("Creating an asset");
		assetNumChange = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResultChange = maximoApi.retrieve(new Asset(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");

		Asset changeAsset = new Gson().fromJson(assetResultChange, Asset.class);

		changeAsset.setAssetNum(assetNumChange);
		changeAsset.setDescription(CHANGE_ASSET_DESCRIPTION);
		changeAsset.setSiteId(SetupData.SITEID);

		maximoApi.create(changeAsset);
		logger.info("changeAsset: {}" + assetNumChange);

		// Create a location
		logger.info("Creating a location");
		changeLocation = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location changelocation = new Location();

		changelocation.setLocationId(changeLocation);
		changelocation.setDescription(CHANGE_LOCATION_DESCRIPTION);
		changelocation.setSiteId(SetupData.SITEID);

		maximoApi.create(changelocation);
		logger.info("changeLocation: {}" + changeLocation);
	}
}
