package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import static org.testng.Assert.assertFalse;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;
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
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.DataListComponent;
import com.ibm.maximo.components.DataListItemComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51072:  Change status of WO
 */

public class ChangeStatusWOTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ChangeStatusWOTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, labor;
	private String statusDataList = "z4q5w_items_datalistWrapper";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************ChangeStatusWOTest*********************************");
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
			"mobile" }, description = " Validate available status options in change status drawer when work order status is \"Approved\" on WO list/details pages", timeOut = 300000)
	public void changeStatusofWOTest() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		
		logger.info("Validate list of available status");
		assignedWorkPage.search(woNum);
		assignedWorkPage.openWorkOrderDetails();
		woDetails.openWOStatusDrawer();
		assertEquals("Change status", woDetails.getChangeStatusDrawerHeader());
		DataListComponent list = af.instantiateComponent(DataListComponent.class, statusDataList);
		List<DataListItemComponent> items = list.getChildren();
		assertEquals(8, items.size());
		assertEquals("Canceled", items.get(0).getText());
		assertEquals("Closed", items.get(1).getText());
		assertEquals("Completed", items.get(2).getText());
		assertEquals("In progress", items.get(3).getText());
		assertEquals("Waiting on approval", items.get(4).getText());
		assertEquals("Waiting on material", items.get(5).getText());
		assertEquals("Waiting on plant cond", items.get(6).getText());
		assertEquals("Waiting to be scheduled", items.get(7).getText());		
	}

	@Test(groups = {
			"mobile" }, description = "Validate technician can enter a comment while changing WO status in WO list/WO details pages - Change it to INPRG", timeOut = 300000)
	public void enterCommentStatusChange() throws Exception {
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		
		logger.info("Validate user can enter comment while changing status");
		woDetails.selectStatus(WoStatus.INPRG);
		woDetails.addCommentWOStatusChange("Work Order WoStatus Changed");
		woDetails.saveStatusChange();
		assertEquals("In progress", woDetails.verifyChangedStatus());
		String workOrderHeader = woDetails.getTitle(woDetails.workOrderHeaderText);
		assertEquals("Work order", workOrderHeader);
	}

	@Test(groups = {
			"mobile" }, description = " Validate available status options in change status drawer when work order status is \"In progress\" on WO list/details pages", timeOut = 500000)
	public void inProgressStatusWO() throws Exception {
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		
		logger.info("Validate list of available status when WO in-progress");
		String workOrderHeader = woDetails.getTitle(woDetails.workOrderHeaderText);
		assertEquals("Work order", workOrderHeader);
		woDetails.openWOStatusDrawer();
		DataListComponent list = af.instantiateComponent(DataListComponent.class, statusDataList);
		List<DataListItemComponent> items = list.getChildren();
		assertEquals("Closed", items.get(0).getText());
		assertEquals("Completed", items.get(1).getText());
		assertEquals("Waiting on approval", items.get(2).getText());
		assertEquals("Waiting on material", items.get(3).getText());
		woDetails.closeStatusChangeDialog();
	}

	@Test(groups = {
			"mobile" }, description = "Change the value of \"maximo.mobile.statusforphysicalsignature\" property as \"WAPPR\" and verify signature prompt is displayed only for changing work order status as Waiting for approval", timeOut = 500000)
	public void signaturePrompt() throws Exception {
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);

		logger.info("Verify signature promt displayed");
		woDetails.openWOStatusDrawer();
		assertEquals("Change status", woDetails.getChangeStatusDrawerHeader());
		woDetails.selectStatus(WoStatus.WAPPR);
		woDetails.saveSignatureButton();
		assertEquals("Signature required", woDetails.signatureHeaderText());
		woDetails.signatureCancel();
	}

	@Test(groups = {
			"mobile" }, description = "Verify that work order might be moved out from the current view after changing WO status depending on business rules on WO list page", timeOut = 500000)
	public void statusChangetoComplete() throws Exception {
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		
		logger.info("Validate WO moved out from list after completed");
		assertEquals("Change status", woDetails.getChangeStatusDrawerHeader());
		woDetails.selectStatus(WoStatus.COMP);
		woDetails.saveStatusChange();
		assignedWorkPage.clickClearButton();
		assertFalse(assignedWorkPage.search(woNum), "Work order should not be visible");
		assignedWorkPage.clickClearButton();
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		this.updateSystemProperties();
		logger.info("setting system properties");
		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkOrder for mobile automation test");
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: " + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
	}

	protected void updateSystemProperties() throws Exception {
		// Set System Properties
		maximoApi.setProperty("maximo.mobile.statusforphysicalsignature", "COMMON", null, WoStatus.WAPPR.toString());
		logger.info("Properties Set Successfully");
	}
}
