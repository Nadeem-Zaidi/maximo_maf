package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.ibm.maximo.components.ChatLogComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.TextAreaComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkLogPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkLogType;

/*
 * GRAPHITE-47694: Eli should be able to start enter work logs to a WO
 * GRAPHITE-31727: Enable Long Description support for the Chat-Log component
 * GRAPHITE-64661: [TECHMOBILE] Worklog :15M,2TA,0A Scenario-2 , Scenario-6
 */

public class AddWorkLog extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(AddWorkLog.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private WorkOrder newWorkOrder1;
	private String assetNum, woNum,woNum1, labor;
	private String noteDescription = "Automation WorkLog Text on WO list page";
	private String noteSummaryText = "Summary for WO";
	private String longDescriptionText = "Long decsription for WO added";
	private String chatLogEditHeadertext = "Add note";
	private String noteDescriptionDetailsPage = "Automation WorkLog Text on WO details page";
	private String noteSummaryText100 = "Lorem ipsum dolor sit amet, consectetuer "
			+ "adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. "
			+ "Sum sociis natoque penatibus et magnis dis parturient montes, "
			+ "nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque"
			+ " eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, "
			+ "fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, "
			+ "imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis "
			+ "pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. "
			+ "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, "
			+ "consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, "
			+ "viverra quis, feugiat a,";
	private String noteDescription1 = "Automation WorkLog Text on WO list page 1";
	private String noteDescription2 = "Automation WorkLog Text on WO list page 2";
	private String saveDiscardText = "To leave this page, you must first discard or save your changes.";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************AddWorkLog*********************************");
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
		maximoApi.changeStatus(newWorkOrder1, WoStatus.COMP.toString());				
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify user is able to add worklog on WO list page and WO details page", timeOut = 480000)
	public void addWorkLog() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkLogPage workLogPage = new WorkLogPage(af);

		// Search the work order
		assignedWorkPage.search(woNum);

		// Verify the availability of "Work log" touch-point on the work order card list
		// page
		assignedWorkPage.clickWorkLogTouchpoint();

		// Assert work log drawer header
		assertEquals("Work log", assignedWorkPage.getWorkLogDrawerHeader());

		// Add work log in the text area
		TextAreaComponent textArea = af.instantiateComponent(TextAreaComponent.class, "g7wpp_ChatLogTextInput");
		textArea.type(noteDescription);

		// Verify that technician can enter work log entry using send key
		ChatLogComponent chatLog = af.instantiateComponent(ChatLogComponent.class, "g7wpp_chatLogSendBtn");
		chatLog.sendText();

		// Assert the date being shown is the current date
		LabelComponent dateLabel = af.instantiateComponent(LabelComponent.class, "chatLogDate_0_date");
		SimpleDateFormat month = new SimpleDateFormat("MMMM");
		SimpleDateFormat day = new SimpleDateFormat("dd");
		SimpleDateFormat year = new SimpleDateFormat("yyyy");
		assertEquals(
				"Today, " + month.format(new Date()) + " " + day.format(new Date()) + ", " + year.format(new Date()),
				dateLabel.text());

		// Assert work log note
		assertEquals(noteDescription, assignedWorkPage.getWorkLogOnWoListPage());

		// Verify "expand" icon/button is displayed on the "Work log" drawer
		workLogPage.clickExpandIcon();

		// verify title of page
		String chatLogEditHeader = workLogPage.getTitle(workLogPage.chatLogTitle);
		assertEquals(chatLogEditHeadertext, chatLogEditHeader);

		// enter summary
		workLogPage.noteSummary(noteSummaryText);

		// enter long description
		workLogPage.enterLongDescription(longDescriptionText);

		assertEquals("Work log type", workLogPage.workLogType());

		// select worklog type
		workLogPage.addWorkLogType(WorkLogType.UPDATE);

		// save worklog details
		workLogPage.saveWorkLog();

		// click on chevron to expand long description
		workLogPage.clickWorkLogChevron();

		assertEquals(longDescriptionText, workLogPage.verifyLongDescription());

		// click on back button to navigate to worklog page
		workLogPage.backButton();

		// click on x button
		workLogPage.closeDrawer();

		// navigate to WO details page
		assignedWorkPage.openWorkOrderDetails();

		// Verify the availability of "Work log" touch-point on the work order details page
		WorkOrderDetailsPage woDetailPage = new WorkOrderDetailsPage(af);
		woDetailPage.clickWorkLogButton();

		// Add work log in the text area
		textArea = af.instantiateComponent(TextAreaComponent.class, "qj2ge_ChatLogTextInput");
		textArea.type(noteDescriptionDetailsPage);

		// Click on send button
		chatLog = af.instantiateComponent(ChatLogComponent.class, "qj2ge_chatLogSendBtn");
		chatLog.sendText();

		// Assert work log note
		assertEquals(noteDescriptionDetailsPage, woDetailPage.getWorkLogOnWoDetailsPage());
		
		woDetailPage.closeDrawer();
		woDetailPage.clickBackChevron();
		
		assignedWorkPage.clickClearButton();
	}
	
	@Test(groups = {
			"priority2" },  description = "Verify the work log entries in the \"Work log\" drawer on work order list and details pages & "
					+ "Verify Save/Discard Dialog Popup when close without saving changes", timeOut = 480000)
	  public void checkWorkLog() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkLogPage workLogPage = new WorkLogPage(af);
		
		//Scenario-2: Verify the work log entries in the \"Work log\" drawer on work order list and details pages
		logger.info("Verify the work log entries in the \\\"Work log\\\" drawer on work order list and details pages");
		
		// Search the work order
		assignedWorkPage.search(woNum1);
		
		// Verify the availability of "Work log" touch-point on the work order card list
		// page
		assignedWorkPage.clickWorkLogTouchpoint();
		
		// Assert work log drawer header
		assertEquals("Work log", assignedWorkPage.getWorkLogDrawerHeader());
		
		// Add work log in the text area
		TextAreaComponent textArea = af.instantiateComponent(TextAreaComponent.class, "g7wpp_ChatLogTextInput");
		textArea.type(noteDescription1);
		
        //Verify that technician can enter work log entry using send key
		ChatLogComponent chatLog = af.instantiateComponent(ChatLogComponent.class, "g7wpp_chatLogSendBtn");
		chatLog.sendText();
		
		workLogPage.closeDrawer();
		assignedWorkPage.checkForUpdateButton();
		assignedWorkPage.clickWorkLogTouchpoint();
		
		// Add work log in the text area
		TextAreaComponent textArea1 = af.instantiateComponent(TextAreaComponent.class, "g7wpp_ChatLogTextInput");
		textArea1.type(noteDescription2);
		
        //Verify that technician can enter work log entry using send key
		ChatLogComponent chatLog1 = af.instantiateComponent(ChatLogComponent.class, "g7wpp_chatLogSendBtn");
		chatLog1.sendText();	
		
		workLogPage.closeDrawer();
		assignedWorkPage.checkForUpdateButton();
		assignedWorkPage.clickWorkLogTouchpoint();
		
		//Check Top work chat log is old
		assertEquals(noteDescription1,workLogPage.getFirstWorkLogOnWoListPage());
		logger.info("work log label 1:" +workLogPage.getFirstWorkLogOnWoListPage());
		
		//Check Bottom work chat log is most recent chat log
		assertEquals(noteDescription2,workLogPage.getSecondWorkLogOnWoListPage());
		logger.info("work log label 2:" +workLogPage.getSecondWorkLogOnWoListPage());
		
		workLogPage.closeDrawer();
		assignedWorkPage.clickClearButton();
		
		//Scenario-6: : Verify the save/discard popup is displayed when technician clicks on back button without saving the data entered in the fields
		logger.info(": Verify the save/discard popup is displayed when technician clicks on back button without saving the data entered in the fields");

		// Search the work order
		assignedWorkPage.search(woNum1);
		
		// Verify the availability of "Work log" touch-point on the work order card list
		// page
		assignedWorkPage.clickWorkLogTouchpoint();
		
		// Add work log in the text area
		TextAreaComponent textArea2 = af.instantiateComponent(TextAreaComponent.class, "g7wpp_ChatLogTextInput");
		textArea2.type(noteDescription1);
		
		// Verify "expand" icon/button is displayed on the "Work log" drawer
		workLogPage.clickExpandIcon();
		
		// enter summary
		workLogPage.noteSummary(noteSummaryText100);

		// enter long description
		workLogPage.enterLongDescription(longDescriptionText);
		
		//Click back button
		workLogPage.clickBackChevron();
		
		//Click on close drawer button
		workLogPage.closeDrawer();
		
		//Check if Save/Discard dialog popups up
		assertTrue(workLogPage.saveDiscardPopup());
		
		//Check save/discard popup text
		logger.info("Save/Discard Popup text : "+ workLogPage.getSaveDiscardPopupText());
		assertEquals(saveDiscardText,workLogPage.getSaveDiscardPopupText());
		
		//Click Discard Button on Dialog
		workLogPage.clickDiscardButton();
		assignedWorkPage.clickClearButton();			
		}

	
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create a work order
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription("WorkOrder for mobile automation test");
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: " + newWorkOrder.getWoNum());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("WO Status Changed");
		
		// Create a work order
		logger.info("Creating Second work order");
		String workOrderResult1 = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder1 = new Gson().fromJson(workOrderResult1, WorkOrder.class);
		newWorkOrder1.setDescription("WorkOrder for mobile automation test");
		maximoApi.create(newWorkOrder1);
		woNum1 = newWorkOrder1.getWoNum();
		logger.info("Work Order: " + newWorkOrder1.getWoNum());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder1, labor);
		logger.info("Assignment added");
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder1, WoStatus.APPR.toString());
		logger.info("WO Status Changed");				

	}
}
