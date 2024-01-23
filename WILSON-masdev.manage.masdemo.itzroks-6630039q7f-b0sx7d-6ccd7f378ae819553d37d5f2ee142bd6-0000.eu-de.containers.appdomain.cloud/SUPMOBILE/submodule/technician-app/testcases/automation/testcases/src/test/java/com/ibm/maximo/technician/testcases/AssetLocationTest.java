package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;

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
import com.ibm.maximo.automation.mobile.api.JdbcConnection;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.components.TimeInputComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51057: Report Asset Status/Downtime
 */
public class AssetLocationTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(AssetLocationTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private JdbcConnection jdbcConnection;
	private String assetNum, woNum, labor;
	private int year = 2023, futureMonth = 12, futureDate = 15, hrs = 2, mins = 10, preMonth = 8, preDate = 25, expectYear = 23;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************AssetLocationTest*********************************");		
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
			jdbcConnection = new JdbcConnection(properties.getProperty("system.maximoDBDriver"),
						properties.getProperty("system.maximoDBURL"), properties.getProperty("system.maximoDBUsername"),
						properties.getProperty("system.maximoDBPassword"));
			checkAssetDownPromptValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = { "mobile" }, description = "Verify user can report an asset is down or up on WO details page", timeOut = 1000000)
	public void checkAssetDowntimeStatus() throws Exception {
		// Search the work order
		MySchedulePage assignedWorkPage = new MySchedulePage(af);		
		assignedWorkPage.search(woNum);

		// Navigate to WO details page
		assignedWorkPage.openCardDetails("cardtemplate1[0]_chevron");
		
		logger.info("Verify clicking on 'Up/Down' touch-point opens sliding drawer to change the downtime status of asset");
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		woDetails.openAssetStatusDrawer();
		
		// Change the asset status to Down
		woDetails.clickAssetDownButton();
		
		logger.info("Verify user is able to edit the downtime date and time");
		woDetails.enterAssetStatusDate(year, futureMonth, futureDate);
		woDetails.enterAssetStatusTime(hrs, mins);
	
		TextInputComponent date = af.instantiateComponent(TextInputComponent.class, "eynwp_date");
		logger.info("Asset status date: " + date.getContents());
		assertEquals(futureMonth + "/" +futureDate + "/"+expectYear, date.getContents());	

		TimeInputComponent time = af.instantiateComponent(TimeInputComponent.class, "eynwp_time");
		logger.info("Asset status time: " + time.getTimeInput());	
		assertEquals("0"+hrs + ":" + mins, time.getTimeInput());	
		
		logger.info("Verify fields are removed when user again clicks the Up button");
		woDetails.clickAssetUpButton();
	    assertFalse(woDetails.validateFields(), "Fields are not removed when user clicks the Up button again.");
		
		// Close asset status drawer
		woDetails.closeAssetStatusDrawer();
			
		logger.info("Verify current status of asset should displayed Up (unchanged) in asset section");
		assertEquals("Up", woDetails.getAssetUpStatus());
	
		// Change the asset status to Down
		woDetails.openAssetStatusDrawer();			
		woDetails.clickAssetDownButton();			
		woDetails.saveAssetStatus();
		
		logger.info("Verify asset widget is refreshed to the new state after successfully saving the transaction");
		assertEquals("Down", woDetails.getAssetDownStatus());
		
		// Change the asset status to Up
		woDetails.openAssetStatusDrawer();			
		woDetails.clickAssetUpButton();	
		woDetails.enterAssetStatusDate(year, futureMonth, futureDate);
		woDetails.saveAssetStatus();

		logger.info("Verify error message when date/time is not after previous downtime or uptime report dates");
		woDetails.openAssetStatusDrawer();	
		woDetails.clickAssetDownButton();	
		woDetails.enterAssetStatusDate(year, preMonth, preDate);	
		assertEquals("New asset status change date must be greater than change dates on all previous transactions for this asset.", woDetails.getErrorMsg());
		woDetails.enterAssetStatusDate(year, futureMonth, futureDate);
		woDetails.saveAssetStatus(); 
		
		logger.info("Verify user cannot complete the work order when asset status is Down and WORKTYPE.PROMPTDOWN is checked");
		woDetails.clickReportWorkButton();
		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		reportWorkPage.completeWorkOrder();
		assertEquals("The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime.", reportWorkPage.getSystemMsg());
		reportWorkPage.closeSystemMsg();
	}
	
	/**
	 * Method to create work order and asset
	 * 
	 * @throws Exception
	 */
	protected void createDefaultObjects() throws Exception {
		logger.info("Setting system properties");
		updateSystemProperties();
		
		logger.info("Creating default objects");
		
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setSiteId(SetupData.SITEID);
		maximoApi.create(newAsset);
		logger.info("Asset: " + assetNum);

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
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
	
	/**
	 * Method to update the maximo.mobile.statusforphysicalsignature property to COMP
	 * 
	 * @throws Exception
	 */
	protected void updateSystemProperties() throws Exception {
		logger.info("Set the value of maximo.mobile.statusforphysicalsignature to COMP");
		maximoApi.setProperty("maximo.mobile.statusforphysicalsignature", "COMMON", null, WoStatus.COMP.toString());
		logger.info("Properties set successfully");
	}
	
	/**
	 * Method to check asset down prompt Value
	 * 
	 */
	public void checkAssetDownPromptValue() {
		logger.info("Running SQL - Setting Organization settings");
		logger.info("Check the WORKTYPE.PROMPTDOWN value");
		jdbcConnection.executeUpdateSQL("update MAXIMO.maxvars M set M.varvalue = '1' where M.varname = 'DOWNPROMPT' and M.orgid = '"+SetupData.ORGID+"'");
		jdbcConnection.teardown();
	}
}

