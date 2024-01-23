package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import static org.testng.Assert.assertFalse;

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
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.FollowUpWorkPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.TaskPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

//GRAPHITE-63816 : [TECHMOBILE] TaskWorkOrders Automation
//GRAPHITE-63904 : Improvement of Task workorder test case
public class TaskCardTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(TaskTestSuite.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private WorkOrder newWorkOrder;
	private MaximoApi maximoApi;
	private String assetNum, woNum, taskWo, labor, location, taskNum = "10";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
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

	@Test(groups = { "mobile" },  description = "Verify Task functionality", timeOut = 300000)
	public void taskFunctionality() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		FollowUpWorkPage followUpWorkPage = new FollowUpWorkPage(af);

		logger.info("Scenario 1: task work order should be displayed as 'ParentWO+\"-\"+TaskID");
		// Search the WO
		assertTrue(assignedWorkPage.search(woNum));
		// 2 record is display woNum and taskWo
		assertEquals(assignedWorkPage.getSearchResult(), "2 records");

		logger.info(
				"Scenario 2:Tasks work orders should also be displayed along with normal work orders in the work order list");
		// Navigate to Work Order Details page
		assignedWorkPage.clearAndSearch(taskWo);
		assignedWorkPage.openWorkOrderDetails();
		// WoNum+taskid
		assertTrue(workOrderDetailsPage.getTextWOType().contains(woNum + "-" + taskNum));

		workOrderDetailsPage.clickReportWorkButton();
		// verify Report page title value
		String dynamicTitle = workOrderDetailsPage.getTitle(workOrderDetailsPage.reportWorkPageTitle);
		String expectedTitle = woNum + "-" + taskNum + " Report work";
		assertEquals(expectedTitle, dynamicTitle);
		workOrderDetailsPage.clickButton(workOrderDetailsPage.reportWorkBreadcrumb);

		// click on Edit Work Order
		workOrderDetailsPage.editWorkOrderDetails();
		// verify Work Order page title value
		String dynamicTitle1 = workOrderDetailsPage.getTitle(workOrderDetailsPage.woEditPageTitle);
		String expectedTitle1 = woNum + "-" + taskNum + " Edit work order";
		assertEquals(expectedTitle1, dynamicTitle1);
		workOrderDetailsPage.clickButton(workOrderDetailsPage.workOrderBreadcrumb);

		logger.info("Scenario 3:Task touch-point should not be displayed on the wo details page for task wo");
		// verify Task touch-point should not be displayed on the wo details page for
		// task work orders
		assertFalse(workOrderDetailsPage.taskTouchPointDisplayed(), "Task touch point is present");

		// Follow-up work Tile/Link should not be displayed for the task wo on wo
		// details page
		logger.info("Scenario 4: verify follow-up work tile not display in task work order details page");
		assertFalse(followUpWorkPage.followUpWoDisplayed(), "FollowUp  touch point is present");

		// Work type shouldn't be displayed for the task wo in both wo list and
		// wodetails pages
		logger.info("Scenario 5:verify Work type not displayed for the task wo in both wo list and wo details page");
		logger.info(workOrderDetailsPage.getTextWOType());
		assertNotEquals(workOrderDetailsPage.getTextWOType(), WorkType.PM.toString(),
				"Task worktype is present wo details page");
		workOrderDetailsPage.clickBackChevron();
		
	}
	

	@Test(groups = { "priority2" },  description = "Verify Task workorder is not available on wolist page and task is marked as completed", timeOut = 300000)
	public void taskWorkOrder() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		TaskPage taskPage = new TaskPage(af);
		//FollowUpWorkPage followUpWorkPage = new FollowUpWorkPage(af);
		
		logger.info("Scenario 6:task in parent wo should be displayed as marked completed in task details page");
		logger.info("Scenario 7:task in parent wo should be displayed as marked completed in task details page  and task workorder should not be displayed");
		
		assignedWorkPage.search(woNum);
		assignedWorkPage.openWorkOrderDetails();
		workOrderDetailsPage.clickTaskButton();
		assertEquals("carbon:checkmark", taskPage.getBlueCheckmarkOnTaskPage(0));
		taskPage.clickDoneTaskButton(0);
		taskPage.clickTaskExpandIcon(woNum, 10);
		assertEquals("Completed",taskPage.verifyTaskStatus());
		taskPage.clickBackChevron();
		workOrderDetailsPage.clickBackChevron();
		assignedWorkPage.clearAndSearch(taskWo);
		assertFalse(assignedWorkPage.search(taskWo),"Task workorder is not present");
		
	}	

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset for WO
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Asset.fakeAsset(assetNum));
		logger.info("Asset: {}" + assetNum);

		// Create a work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		newWorkOrder = WorkOrder.fakeWorkOrder(woNum, assetNum, null, null, location);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, "APPR");

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arr = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("WorkOrder for mobile automation test");
		task.setOwnergroup(SetupData.OWNERGROUP);
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt(taskNum));
		task.setStatus(WoStatus.WAPPR.toString());
		arr.add(task);
		newWorkOrder.setWoactivity(arr);
		maximoApi.update(newWorkOrder);
		logger.info("Tasks added");

		String woActivityResult = maximoApi.retrieve(new WorkOrder(), "oslc.where=wogroup=%22" + woNum
				+ "%22%20and%20taskid=10&oslc.select=*&addid=1&internalvalues=1&ignorecollectionref=1");
		JSONObject resultObject = new JSONObject(woActivityResult);
		JSONArray resultArray = resultObject.getJSONArray("member");
		JSONObject workOrderObj = resultArray.getJSONObject(0);
		String woHref = workOrderObj.getString("href");

		WorkOrder taskWorkOrder = new Gson().fromJson(workOrderObj.toString(), WorkOrder.class);
		taskWorkOrder.setLocationUrl(woHref);

		taskWo = taskWorkOrder.getWoNum();
		logger.info("task workorder >>>>>>>>> " + taskWo);

		// Assign the labor
		maximoApi.addAssignmentLabor(taskWorkOrder, labor);
		logger.info("Assignment added to task workorder");

		// Change WO status to Approved
		logger.info("Changing task work order status to APPR");
		maximoApi.changeStatus(taskWorkOrder, WoStatus.APPR.toString());

	}

}