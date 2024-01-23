package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import org.json.JSONArray;
import org.json.JSONObject;
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
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.FailureReportingPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;

public class TaskWorkOrdersFailureInSubtaskOnlyTest extends TechnicianTest {

	private static final String cardId = "cardtemplate1[0]_chevron";
	private final Logger logger = LoggerFactory.getLogger(TaskWorkOrdersFailureInSubtaskOnlyTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, taskWoNum, labor, taskId = "10";
	private String failureCodeOriginalCode = "NETWORK";
	private String failureCodeOriginalDesc = "Network Issues";
	private String failureProblemOriginalCode = "NETWACC";
	private String failureDescNew = "CLEAN EQUIPMENT";

	/**
	 * GRAPHITE-51075 [TECHMOBILE] Task Work orders :17M,12TA,6A Test scenario 8
	 * 
	 * @param configPath
	 * @throws Exception
	 */
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskWorkOrdersFailureInSubtaskOnlyTest*********************************");
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
		// complete WO after testcase executed
		maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify on Task Work orders :17M,12TA,6A Scenario 8 Verify on clicking edit icon for failure, failure information related to parent work order is displayed for task work order on report work page", timeOut = 480000)
	public void taskFunctionality() throws Exception {

		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// record appears on the Report Work page
		logger.info(
				"Start Scenario 8 Verify on clicking edit icon for failure, failure information related to parent work order is displayed for task work order on report work page");

		// Search the task WO
		assertTrue(assignedWorkPage.search(taskWoNum));
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);

		// Click to open report work page.
		ReportWorkPage reportWorkPage = workOrderDetailsPage.clickReportWorkButton();

		// failure information related to parent work order should be displayed for task
		// work order.
		assertEquals(failureCodeOriginalDesc, reportWorkPage.getFailureClass());

		logger.info(
				"When user updates any failure code related information for task order, it should be updated for that particular task work order only and not for the parent work order or any other task.");
		// Click on edit icon for failure reporting
		FailureReportingPage failureReporting = reportWorkPage.edit();

		failureReporting.openFailureClassList();
		failureReporting.chooseFailureClassValue(0);
		// Choose Problem
		failureReporting.chooseProblemValue(0);
		// Choose Cause
		failureReporting.chooseCauseValue(0);
		// Choose Remedy
		failureReporting.chooseRemedyValue(0);
		failureReporting.save();
		assertEquals(failureDescNew, reportWorkPage.getFailureClass());

		reportWorkPage.clickBackChevron();
		workOrderDetailsPage.clickBackChevron();
		assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.clickClearButton();
		assertTrue(assignedWorkPage.search(woNum));
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);
		// Click to open report work page.
		reportWorkPage = workOrderDetailsPage.clickReportWorkButton();
		// Assert failure report, failure code of parent order SHOUNT NOT change
		assertEquals(failureCodeOriginalDesc, reportWorkPage.getFailureClass());
		logger.info("Passed: scenario 8");
	}

	/**
	 * Create all objects needed for testing via api calls
	 */
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects for normal case");

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType("PM");
		newWorkOrder.setFailureCode(failureCodeOriginalCode);
		newWorkOrder.setProblemCode(failureProblemOriginalCode);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order:" + woNum + " Created.");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, "APPR");
		// Assignment with labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arrTask = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("Task Description for mobile automation test");
		task.setOwnergroup(SetupData.OWNERGROUP);
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt(taskId));
		task.setStatus(WoStatus.WAPPR.toString());
		arrTask.add(task);
		newWorkOrder.setWoactivity(arrTask);
		maximoApi.update(newWorkOrder);

		logger.info("Tasks Created");

		String woActivityResult = maximoApi.retrieve(new WorkOrder(), "oslc.where=wogroup=%22" + woNum
				+ "%22%20and%20taskid=10&oslc.select=*&addid=1&internalvalues=1&ignorecollectionref=1");
		JSONObject resultObject = new JSONObject(woActivityResult);
		JSONArray resultArray = resultObject.getJSONArray("member");
		JSONObject workOrderObj = resultArray.getJSONObject(0);
		String woHref = workOrderObj.getString("href");

		WorkOrder taskWorkOrder = new Gson().fromJson(workOrderObj.toString(), WorkOrder.class);
		taskWorkOrder.setLocationUrl(woHref);

		taskWoNum = taskWorkOrder.getWoNum();
		logger.info("task workorder >>>>>>>>> " + taskWoNum);

		// Assign the labor
		maximoApi.addAssignmentLabor(taskWorkOrder, labor);
		logger.info("Assignment added to task workorder");

		// Change WO status to Approved
		logger.info("Changing task work order status to APPR");
		maximoApi.changeStatus(taskWorkOrder, WoStatus.APPR.toString());
	}

}
