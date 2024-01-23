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
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.api.JdbcConnection;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51065 - [TECHMOBILE] Report work- Complete Work Order 
 */

public class CompleteWorkOrder extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(CompleteWorkOrder.class);
	public AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, woNum, woNum1, woNum2, labor;
	private WorkOrder newWorkOrder, newWorkOrder1, newWorkOrder2;
	public static LoginPage lp;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************CompleteWorkOrder*********************************");
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
		// Change WO status to Completed
		logger.info("Changing work order status to COMP");
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		maximoApi.changeStatus(newWorkOrder1, WoStatus.COMP.toString());
		maximoApi.changeStatus(newWorkOrder2, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify the user can complete work order from report work page", timeOut = 500000)
	public void completeWorkOrder() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		ReportWorkPage assignedReportWorkPage = new ReportWorkPage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);
		assignedWorkPage.search(woNum1);
		assignedWorkPage.openWorkOrderDetails();
		assignedWorkOrderDetailsPage.clickReportWorkButton();
		assignedReportWorkPage.completeWorkOrder();
		assertEquals("Work order " + woNum1 + " completed", assignedReportWorkPage.toastMessageDisplayed());
		assignedWorkPage.clickClearButton();
	}

	@Test(groups = {
			"mobile" },  description = "Verify while completing a WO, a toast/message is displayed which is for information only, if the asset is Down and WORKTYPE.PROMPTDOWN is checked", timeOut = 500000)
	public void downPromptMessage() throws Exception {
		try {
			MySchedulePage assignedWorkPage = new MySchedulePage(af);
			ReportWorkPage assignedReportWorkPage = new ReportWorkPage(af);
			WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);

			assignedWorkPage.search(woNum);
			assignedWorkPage.openWorkOrderDetails();
			String workOrderHeader = assignedWorkOrderDetailsPage
					.getTitle(assignedWorkOrderDetailsPage.workOrderHeaderText);
			assertEquals("Work order", workOrderHeader);
			logger.info("Change the asset status to Down");
			assignedWorkOrderDetailsPage.openAssetStatusDrawer();
			assignedWorkOrderDetailsPage.clickAssetDownButton();
			assignedWorkOrderDetailsPage.saveAssetStatus();
			assignedWorkOrderDetailsPage.clickReportWorkButton();
			assignedReportWorkPage.completeWorkOrder();
			assertEquals(
					"The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime.",
					assignedReportWorkPage.getSystemMsg());
			assignedReportWorkPage.closeSystemMsg();
			assignedReportWorkPage.completeWorkOrder();
			assertEquals("Work order " + woNum + " completed", assignedReportWorkPage.toastMessageDisplayed());
			assignedWorkPage.clickClearButton();
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
			logOut(maf);
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify work order status is changed to INPRG status defined in the maximo.mobile.completestatus system property when technician taps on Complete work button", timeOut = 500000)
	public void statusChange() throws Exception {
		updateSystemProperties();
		createDefaultObjects2();
		reLogin();

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		ReportWorkPage assignedReportWorkPage = new ReportWorkPage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);
		assignedWorkPage.search(woNum2);
		assignedWorkPage.openWorkOrderDetails();
		String workOrderHeader = assignedWorkOrderDetailsPage
				.getTitle(assignedWorkOrderDetailsPage.workOrderHeaderText);
		assertEquals("Work order", workOrderHeader);
		assignedWorkOrderDetailsPage.clickReportWorkButton();
		assignedReportWorkPage.completeWorkOrder();
		assertEquals("Work order " + woNum2 + " completed", assignedReportWorkPage.toastMessageDisplayed());
		assertEquals("In progress", assignedWorkPage.verifyChangedStatus());
	}

	protected void createDefaultObjects() throws Exception {
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
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
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

		// Create second Work Order
		logger.info("Creating a work order");
		woNum1 = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult1 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder1 = new Gson().fromJson(workOrderResult1, WorkOrder.class);
		newWorkOrder1.setWoNum(woNum1);
		newWorkOrder1.setDescription("WorkOrder for mobile automation test");
		newWorkOrder1.setSiteId(SetupData.SITEID);
		maximoApi.create(newWorkOrder1);
		logger.info("Work Order: " + woNum1);
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder1, WoStatus.APPR.toString());
		maximoApi.addAssignmentLabor(newWorkOrder1, labor);
		logger.info("Assignment added");
	}

	public void checkAssetDownPromptValue() {
		logger.info("Running SQL - Setting Organization settings");
		logger.info("Check the WORKTYPE.PROMPTDOWN value");
		jdbcConnection.executeUpdateSQL(
				"update MAXIMO.maxvars M set M.varvalue = '1' where M.varname = 'DOWNPROMPT' and M.orgid = '"+SetupData.ORGID+"'");
		jdbcConnection.teardown();
	}

	protected void updateSystemProperties() throws Exception {
		logger.info("Set the value of maximo.mobile.completestatus to INPRG");
		maximoApi.setProperty("maximo.mobile.completestatus", "COMMON", null, WoStatus.INPRG.toString());
		logger.info("maximo.mobile.completestatus " + maximoApi.getSystemProps("maximo.mobile.completestatus"));
		logger.info("Properties Set Successfully");
	}

	protected void createDefaultObjects2() throws Exception {
		// create a work order
		logger.info("Creating a work order");
		woNum2 = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult2 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder2 = new Gson().fromJson(workOrderResult2, WorkOrder.class);
		newWorkOrder2.setWoNum(woNum2);
		newWorkOrder2.setDescription("WorkOrder for mobile automation test");
		newWorkOrder2.setSiteId(SetupData.SITEID);
		maximoApi.create(newWorkOrder2);
		logger.info("Work Order: " + woNum2);
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder2, WoStatus.APPR.toString());
		maximoApi.addAssignmentLabor(newWorkOrder2, labor);
		logger.info("Assignment added");
	}

}
