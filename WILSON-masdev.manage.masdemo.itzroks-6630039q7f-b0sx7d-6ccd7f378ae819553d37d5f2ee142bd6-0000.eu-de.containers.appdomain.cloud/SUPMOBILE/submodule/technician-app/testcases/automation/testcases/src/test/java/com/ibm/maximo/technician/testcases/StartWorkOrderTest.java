package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;
import java.util.ArrayList;
import java.util.List;

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
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.automation.mobile.api.json.ServiceAddress;
import com.ibm.maximo.automation.mobile.api.json.WoServiceAddress;
import com.google.gson.Gson;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-45390: Eli should be able to start a work order
 * GRAPHITE-52226: Eli should go to the work details page after clicking on Start Work button in the list page
 * GRAPHITE-64786: [TECHMOBILE] Start Stop Travel :26M,3TA,3A
 */

public class StartWorkOrderTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(StartWorkOrderTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	public static LoginPage lp;
	private WorkOrder newWorkOrder;
	private WorkOrder newWorkOrder2;
	private String assetNum, woNum, woNum2, labor;
	private static final String ASSET_DESCRIPTION = "Asset for mobile automation test";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************StartWorkOrder*********************************");
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
		maximoApi.changeStatus(newWorkOrder2, WoStatus.COMP.toString());				
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = { "mobile" } , description = "Verify user is able to start the work order, Start Travel and Stop Travel", timeOut = 300000)
	public void startWorkOrder() throws Exception {

		// Open work order list page
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetailsPage = new WorkOrderDetailsPage(af);
		// Search the work order
		assertEquals(true, assignedWorkPage.search(woNum2));
		// Start the work order
		assignedWorkPage.clickStartWorkButton();
		// Check if redirected to Work Order Details Page
		assertEquals("Work order", woDetailsPage.getInfo());
		// Check for the Stop button on WO Details Page
		assertEquals("carbon:stop", woDetailsPage.getStopWorkButtonText());
		// Back to Order List Page
		WorkOrderDetailsPage.clickBackWOList();
		// Clear Search Result
		assignedWorkPage.clickClearButton();
		Thread.sleep(2000);
		// Search work order 2
		assertEquals(true, assignedWorkPage.search(woNum));
		// Click Start Travel
		assignedWorkPage.clickStartTravelButton();
		// Check if Redirected to Work ORder Details page
		assertEquals("Work order", woDetailsPage.getInfo());
		// Check for the Stop Travel button on WO Details Page
		assertEquals("carbon:stop", woDetailsPage.getStopTravelButtonText());
		// Click Stop Travel
		woDetailsPage.clickStopTravelButton();
		// Click Send Button
		woDetailsPage.clickSendButton();
		// Check if Redirected to Work ORder Details page
		assertEquals("Work order", woDetailsPage.getInfo());
		// Click Back Chevron
		woDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
	}
	
	@Test(groups = { "priority2" } , description = "Verify Start Travel Button is displayed when property mxe.mobile.travel.prompt is set to 1", timeOut = 300000)
	public void startWorkOrderTravel() throws Exception {

		//Verify Start Stop Travel
		
		logger.info("Verify that Start travel button is displayed when property mxe.mobile.travel.prompt is set to 1");
		// Open work order list page
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetailsPage = new WorkOrderDetailsPage(af);
		// Search the work order
		assertEquals(true, assignedWorkPage.search(woNum));
		// Check for the Start travel button on the searched work order
		assertEquals("carbon:road", assignedWorkPage.getStartTravelButtonText());
		// Click Start Travel
		assignedWorkPage.clickStartTravelButton();
		// Check if Redirected to Work ORder Details page
		assertEquals("Work order", woDetailsPage.getInfo());
		// Click Back Chevron
		woDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = { "priority2" } , description = "Verify that Start travel button changes to Stop travel button when technician taps on Start travel button", timeOut = 300000)
	public void stopWorkOrderTravel() throws Exception {

		// Open work order list page
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetailsPage = new WorkOrderDetailsPage(af);
		
		logger.info("Verify that Start travel button changes to Stop travel button when technician taps on Start travel button");
		// Search the work order
		assertEquals(true, assignedWorkPage.search(woNum));
		// Click Start Travel
		assignedWorkPage.clickStartTravelButton();
		// Check if Redirected to Work ORder Details page
		assertEquals("Work order", woDetailsPage.getInfo());
		// Check for the Stop Travel button on WO Details Page
		assertEquals("carbon:stop", woDetailsPage.getStopTravelButtonText());
		// Click Stop Travel
		woDetailsPage.clickStopTravelButton();
		// Click Send Button
		woDetailsPage.clickSendButton();
		// Click Back Chevron
		woDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
	}
	
	@Test(groups = { "priority2" } , description = "Verify that Start travel button changes to Start work button when property mxe.mobile.travel.prompt is set to 0", timeOut = 300000)
	public void startTravelDisable() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetailsPage = new WorkOrderDetailsPage(af);
		
		// Search the work order
		assertEquals(true, assignedWorkPage.search(woNum));
		// Check for the Start travel button on the searched work order
		assertEquals("carbon:road", assignedWorkPage.getStartTravelButtonText());
		
		logger.info("Setting property mxe.mobile.travel.prompt to 0");
		// Update System Property
		this.updateSystemProperties("disable");
		logOut(af);
		reLogin();
		
		logger.info("Verify that Start work button is displayed on same work order when property mxe.mobile.travel.prompt is set to 0");
		assignedWorkPage.search(woNum);
		assignedWorkPage.openWorkOrderDetails();
		// Check if redirected to Work Order Details Page
		assertEquals("Work order", woDetailsPage.getInfo());
		logger.info("Current Page : " + woDetailsPage.getInfo());
		// Check for the Start Work button with timer on WO Details Page
		assertEquals("maximo:start-work", woDetailsPage.getStartWorkTimerButtonIcon());
		
		// Click Back Chevron
		woDetailsPage.clickBackChevron();
		assignedWorkPage.clickClearButton();
	}


	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		// Update System Properties
		this.updateSystemProperties("enable");

		// Create a Service Address
		logger.info("Creating a Service Address");
		String serAddResult = maximoApi.retrieve(new ServiceAddress(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		ServiceAddress newSerAdd = new Gson().fromJson(serAddResult, ServiceAddress.class);
		newSerAdd.setLatitudeY(SetupData.LATITUDEY);
		newSerAdd.setLongitudeX(SetupData.LONGITUDEX);
		newSerAdd.setDescription(SetupData.ADDRESSTITLE);
		maximoApi.create(newSerAdd);
		logger.info("Service Address Created :" + newSerAdd.getAddressCode());

		// Link Service Address
		logger.info("Link Service Address with Work Order");
		List<WoServiceAddress> serviceAddressList = new ArrayList<WoServiceAddress>();
		WoServiceAddress newWoServiceAddress = new WoServiceAddress();
		newWoServiceAddress.setsAddressCode(newSerAdd.getAddressCode());
		serviceAddressList.add(newWoServiceAddress);
		logger.info("Service Address Linked to Work Order");

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
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		newWorkOrder.setGLAccount(SetupData.GLDEBITACCT);
		newWorkOrder.setWoServiceAddress(serviceAddressList);
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create Work Order 2
		logger.info("Creating a work order 2");
		String workOrderResult2 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder2 = new Gson().fromJson(workOrderResult2, WorkOrder.class);
		newWorkOrder2.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder2.setAssetNum(assetNum);
		newWorkOrder2.setWorkType(WorkType.PM.toString());
		newWorkOrder2.setGLAccount(SetupData.GLDEBITACCT);
		maximoApi.create(newWorkOrder2);
		woNum2 = newWorkOrder2.getWoNum();
		logger.info("Work Order: {}" + woNum2);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder2, WoStatus.APPR.toString());

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder2, labor);
		logger.info("Assignment added");

	}

	protected void updateSystemProperties(String travel) throws Exception {
		// Set System Properties
		if(travel == "enable") {
			maximoApi.setProperty("mxe.mobile.travel.radius", "COMMON", null, "1");
			maximoApi.setProperty("mxe.mobile.travel.prompt", "COMMON", null, "1");
			logger.info("enable travel");
		}
		else {
			maximoApi.setProperty("mxe.mobile.travel.radius", "COMMON", null, "0");
			maximoApi.setProperty("mxe.mobile.travel.prompt", "COMMON", null, "0");
			logger.info("disable travel");
		}
		logger.info("System Properties Set Successfully");
	}

}
