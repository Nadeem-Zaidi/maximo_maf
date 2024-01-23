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
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.FailureReportingPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51061: Report work - Failure reporting
   GRAPHITE-65683: Report work- Failure reporting
 */

public class FailureReportTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(FailureReportTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String labor;
	private WorkOrder newWorkOrder;
	private static final String WORKORDER_DESCRIPTION = "Work Order Description ";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************FailureReportTest*********************************");
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
			"mobile" }, description = "Verify technician should not be able to select remedy, cause, problem without selecting the first field failure class", timeOut = 500000)
	public void addFailureReport() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		FailureReportingPage failureReporting = new FailureReportingPage(af);

		// Search the work order
		assertEquals(true, assignedWorkPage.search(woNum));
		// Navigate to work order details page
		assignedWorkPage.openCardDetails("cardtemplate1[0]_chevron");
		// Click on Report Work touch-point
		woDetails.clickReportWorkButton();
		// Click on edit icon for failure reporting
		reportWorkPage.edit();
		assertFalse(failureReporting.isProblemChevronNotExist(),
				"Problem chevron cannot be selected as it is not available");
		assertFalse(failureReporting.isCauseChevronNotExist(),
				"Cause chevron cannot be selected as it is not available");
		assertFalse(failureReporting.isRemedyChevronNotExist(),
				"Remedy chevron cannot be selected as it is not available");
		failureReporting.save();
	}

	@Test(groups = {
			"mobile" }, description = "Verify user is able to perform failure reporting functionality on Report work page", timeOut = 4800000)
	public void modifyFailureReport() throws Exception {
		ReportWorkPage reportWorkPage = new ReportWorkPage(af);
		FailureReportingPage failureReporting = new FailureReportingPage(af);

		reportWorkPage.edit();
		// Choose Failure class
		failureReporting.openFailureClassList();
		failureReporting.chooseFailureClassValue(1);
		// Choose Problem
		failureReporting.chooseProblemValue(0);
		// Choose Cause
		failureReporting.chooseCauseValue(0);
		// Choose Remedy
		failureReporting.chooseRemedyValue(0);
		// Add Summary
		failureReporting.addSummary("Mobile Test 1: Summary");
		// Add Description
		failureReporting.addDescription("Mobile Test 1: Description");
		// Click on Save button
		failureReporting.save();
		logger.info("Verify that when technician clears out or changes problem code then child fields are cleared out");
		// Click on the edit button
		reportWorkPage.edit();
		// Clear Problem value
		failureReporting.closeProblemValue();
		// Assert Cause value is removed
		assertFalse(failureReporting.checkChildFieldIsRemoved("nzw8m[2]"), "Is Cause value cleared");
		// Assert Remedy value is removed
		assertFalse(failureReporting.checkChildFieldIsRemoved("nzw8m[3]"), "Is Remedy value cleared");
		// Click on Save
		failureReporting.save();
		logger.info("Verify after saving, latest failure report data is displayed on the Report work page");
		// Assert updated failure report
		assertEquals("Boiler Failures", reportWorkPage.getFailureClass());
		logger.info("Verify that technician can modify the existing failure Summary");
		// Click on edit icon for failure reporting
		reportWorkPage.edit();
		// close failure class
		failureReporting.closeFailureClass();
		// Choose Failure class
		failureReporting.openFailureClassList();
		failureReporting.chooseFailureClassValue(1);
		// Choose Problem
		failureReporting.chooseProblemValue(0);
		// Choose Cause
		failureReporting.chooseCauseValue(0);
		// Choose Remedy
		failureReporting.chooseRemedyValue(0);
		// Add new summary
		failureReporting.addSummary("Mobile Test 2: Summary can be modified");
		// Click on Save button
		failureReporting.save();
		logger.info("Verify after saving, latest failure report data is displayed on the Report work page");
		// Assert updated failure report
		assertEquals("Boiler Failures", reportWorkPage.getFailureClass());
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create a workorder
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription(WORKORDER_DESCRIPTION);
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
