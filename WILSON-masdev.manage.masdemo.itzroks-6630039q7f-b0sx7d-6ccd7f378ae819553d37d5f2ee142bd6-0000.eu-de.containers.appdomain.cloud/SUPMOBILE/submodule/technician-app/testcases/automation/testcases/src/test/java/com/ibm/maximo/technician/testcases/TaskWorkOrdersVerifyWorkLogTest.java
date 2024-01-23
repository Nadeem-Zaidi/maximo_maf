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
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkLogPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

public class TaskWorkOrdersVerifyWorkLogTest extends TechnicianTest {

	private final Logger logger = LoggerFactory.getLogger(TaskWorkOrdersVerifyWorkLogTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, woNumKey, taskWoNum, labor, taskId = "10";
	private String tasWokLog = "This is a test note from task WO Log.";
	private String parnetWoLog = "This is a test note from parent WO Log.";

	/**
	 * GRAPHITE-51075 [TECHMOBILE] Task Work orders :17M,12TA,6A Test scenario 10
	 * 
	 * @param configPath
	 * @throws Exception
	 */
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskWorkOrdersVerifyWorkLogTest*********************************");
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

	@Test(groups = { "mobile" },  description = "Verify on Task Work orders :17M,12TA,6A scenario 10 - Verify when user enters a work log in task work order then it is displayed in parent work order work log", timeOut = 400000)
	public void taskFunctionality() throws Exception {
		
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkLogPage workLogPage = new WorkLogPage(af);
		logger.info(
				"Scenario 10 - Verify when user enters a work log in task work order then it is displayed in parent work order work log");

		// Search the task work order
		assertTrue(assignedWorkPage.search(taskWoNum));
		// click work log touch point
		assignedWorkPage.clickWorkLogTouchpoint();
		// enter the work log for task work order.
		workLogPage.addANote(tasWokLog);
		workLogPage.closeDrawer();
		// Clear Search Result
		assignedWorkPage.clickClearButton();
		
		// search parent work order
		assignedWorkPage.search(woNumKey);
		// click work log touch point
		assignedWorkPage.clickWorkLogTouchpoint();
		workLogPage.chatLogTextInputAreaPresent();
		// Verify when user enters a work log in task work order then it is also displayed in parent work order work log.
		assertEquals(tasWokLog,assignedWorkPage.getWorkLogOnWoListPage());

		// Add work log in parent WO
		// Add work log in the text area
		workLogPage.addANote(parnetWoLog);
		workLogPage.closeDrawer();
		// Clear Search Result
		assignedWorkPage.clickClearButton();
		// search task work order
		assignedWorkPage.search(taskWoNum);
		// click work log touch point
		assignedWorkPage.clickWorkLogTouchpoint();
		workLogPage.chatLogTextInputAreaPresent();
		// Verify Task work order work log should not be updated when technician adds a work log entry in parent work order.
		assertFalse(workLogPage.hasSecondWorkLogOnWoListPage());
		
		workLogPage.closeDrawer();
		// Clear Search Result
		assignedWorkPage.clickClearButton();
	}

	/**
	 * Create objects for adding normal material flow
	 */
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		woNumKey = "kwo" + woNum;
		newWorkOrder.setDescription("WorkeOrder for mobile automation test " + woNumKey);
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		newWorkOrder.setGlaccount(SetupData.GLDEBITACCT);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order:" + woNum + " Created.");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
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
