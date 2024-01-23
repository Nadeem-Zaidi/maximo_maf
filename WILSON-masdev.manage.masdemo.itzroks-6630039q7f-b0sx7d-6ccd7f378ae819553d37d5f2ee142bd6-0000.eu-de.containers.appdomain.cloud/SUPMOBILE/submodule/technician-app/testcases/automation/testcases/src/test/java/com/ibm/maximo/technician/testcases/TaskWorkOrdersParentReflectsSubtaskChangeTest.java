package com.ibm.maximo.technician.testcases;

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
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

public class TaskWorkOrdersParentReflectsSubtaskChangeTest extends TechnicianTest {

	private static final String cardId = "cardtemplate1[0]_chevron";
	private final Logger logger = LoggerFactory.getLogger(TaskWorkOrdersParentReflectsSubtaskChangeTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, woNumKey, taskWoNum, labor, labor2, taskId = "10";

	/**
	 * GRAPHITE-51075 [TECHMOBILE] Task Work orders :17M,12TA,6A Test scenario 9
	 * 
	 * @param configPath
	 * @throws Exception
	 */
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TaskWorkOrdersParentReflectsSubtaskChangeTest*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			labor2 = properties.getProperty("app.username1");
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
			"mobile" },  description = "Verify on Task Work orders :17M,12TA,6A scenario 9 - Verify Add labor, actual materials and tools functionality for task work order on report work page", timeOut = 480000)
	public void taskFunctionality() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);

		// record appears on the Report Work page
		logger.info(
				"Scenario 9 - Verify Add labor, actual materials and tools functionality for task work order on report work page");

		// Search the task work order
		logger.info("Search with taskWoNum");
		assertTrue(assignedWorkPage.search(taskWoNum));
		// and click chevron to open task work order details page.
		assignedWorkPage.openCardDetails(cardId);

		// Click to open report work page.
		ReportWorkPage reportWorkPage = workOrderDetailsPage.clickReportWorkButton();

		// Click on "+" icon to add actual labor, Materials and tools.
		reportWorkPage.clickPlusLaborButton();
		// Task field should not be displayed on add actual labor, materials and tools
		// sliding drawers.
		logger.info("Validate actual labor, material and tools");
		assertFalse(reportWorkPage.isTaskExistInLabor());
		
		reportWorkPage.saveLabor();
		reportWorkPage.clickBackChevron();
		workOrderDetailsPage.clickBackChevron();
		assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.clickClearButton();
		
		// search again for parent work order
		logger.info("Search with woNumKey");
		assertTrue(assignedWorkPage.search(woNumKey));
		
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);
		// Click to open report work page.
		reportWorkPage = workOrderDetailsPage.clickReportWorkButton();
		
		// When user adds actual labor, materials and tools in any task work order, it
		// should update details in actual labor, material and tools section of parent
		// work order.
		// TODO need refresh device
//		assertEquals(reportWorkPage.getLaborName(), labor);
		
		reportWorkPage.clickPlusLaborButton();
		reportWorkPage.changeLabor(labor2, getLaborIdFromDB(labor2));
		reportWorkPage.saveLabor();
		reportWorkPage.clickBackChevron();
		workOrderDetailsPage.clickBackChevron();
		assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.clickClearButton();
		
		// search task work order
		logger.info("Search with taskwoNum after adding labor");
		assertTrue(assignedWorkPage.search(taskWoNum));
		// open the work order details page.
		assignedWorkPage.openCardDetails(cardId);
		// Click to open report work page.
		reportWorkPage = workOrderDetailsPage.clickReportWorkButton();

		// When user adds any actual labor, materials and tools for parent work
		// order(task field value is not provided), it should not be displayed in task
		// work order report work page.
		logger.info("Validate 2ndLabor should not be displayed");
		assertFalse(reportWorkPage.is2ndLaborExisting());
		
		//Click back and clear search data
		reportWorkPage.clickBackChevron();
		workOrderDetailsPage.clickBackChevron();
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

	/**
	 * Get labor Id by labor Code via database
	 * 
	 * @param laborCode
	 * @return
	 */
	protected String getLaborIdFromDB(String laborCode) {
		String sqlString = "SELECT L.LABORID FROM MAXIMO.LABOR L WHERE L.LABORCODE='" + laborCode + "'";
		logger.info(sqlString);
		Object[] resultsObjects = jdbcConnection.executeSQL(sqlString);
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		String laborId = resultArray1[0].toString();
		logger.info("labor id from db>" + laborId);
		return laborId;
	};
}
