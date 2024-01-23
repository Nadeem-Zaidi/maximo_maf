package com.ibm.maximo.technician.testcases;

import static org.junit.Assert.assertTrue;
import static org.testng.Assert.assertEquals;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.openqa.selenium.By;
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
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.Task;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspField;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspFieldOption;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspForm;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspQuestion;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.InspectionsPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

// GRAPHITE-51060 - Launch and report inspections
public class InspectionIntegration extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(SearchTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String assetNum, labor, assetNum1, location1;
	public static String form, form1, form2;
	public static String woNum, woNumWithTask;
	public static String inspFormNum, inspFormNum1, inspFormNum2;
	private String refreshButton = "z3w87_cards_searchbuttongroup_z3w87_cards_RefreshButon";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************InspectionIntegration*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			maximoApi = new MaximoApi();
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));

			// create Form
			createDefaultForm();
			// Get inspFormNum
			inspFormNum1 = inspFormNum;
			form1 = form;
			// create random asset
			createAsset();
			// create work order
			createWorkOrder();

			// create Form
			createDefaultForm();
			// Get inspFormNum
			inspFormNum2 = inspFormNum;
			form2 = form;
			// create random asset
			createAsset();
			// create work order
			createWorkOrderWithTask();

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

	@Test(groups = { "mobile" }, description = "verify Inspection Integration", timeOut = 500000)

	public void inspectionIntegration() throws Exception {
		navigateToInspectionsApp();
		navigateBackToWorkOrderDetailsPage();
		navigateToWorkOrderDetailsPageFromInspectionsApp();
		navigateBackToInspectionsApp();
		navigateToInspectionsAppFromTasksPage();
		navigateBackTasksPageFromInspectionsApp();
	}

	/**
	 * Navigate to Inspections App
	 * 
	 * @throws Exception
	 */
	public void navigateToInspectionsApp() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Search the WO
		assignedWorkPage.search(woNum);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Click on Inspection touchpoint.
		assignedWorkOrderDetailsPage.clickInspectionButton();
		// Verify that user is navigated to Inspections app and inspection form assigned
		// to work order is displayed for conducting inspection.
		assertEquals(InspectionsPage.getInfo(), "Inspections");
		logger.info("Inspections Page is correctly displayed.");
		// Check the Form displayed
		assertEquals(InspectionsPage.getFormName(), form1);
		logger.info("Form: " + form1 + " is correctly displayed.");

	}

	/**
	 * Navigate back to Work Order Details Page
	 * 
	 * @throws Exception
	 */
	public void navigateBackToWorkOrderDetailsPage() throws Exception {

		// Click back from inspections page to work order
		InspectionsPage.clickBackFromInspectionToWorkOrderButton();
		// Make sure it is back to Work Order page
		assertEquals(WorkOrderDetailsPage.getTextWODescription(), "Work Order Description " + woNum + WorkType.PM.toString() + " "+woNum);
		logger.info("Navigation back to work order details page in Technician app done correctly.");

	}

	/**
	 * Method to refresh WO records
	 * 
	 * @throws Exception
	 */
	public void checkForUpdateButton() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(refreshButton),af.DEFAULT_TIMEOUT_MS);
			if (af.isElementExists(By.id(refreshButton))) {
				af.instantiateComponent(ButtonComponent.class, refreshButton).click();
			}
		} catch (Exception e) {
			// 'No work orders found' screen has refresh button
			String refreshButton1 = "z3w87_cards_searchbuttongroup_z3w87_cards_RefreshButon";
			af.waitForElementToBePresent(By.id(refreshButton1),af.DEFAULT_TIMEOUT_MS);
			
		}

	}

	/**
	 * Navigate to Work Order Details Page from Inspections App
	 * 
	 * @throws Exception
	 */
	public void navigateToWorkOrderDetailsPageFromInspectionsApp() throws Exception {

		// Open Inspections app
		AppSwitcher appSwitcher = new AppSwitcher(af);
		appSwitcher.switchApp(App.Inspections);
		InspectionsPage conductAnInspection = new InspectionsPage(af);
		// Search for a work order with inspection
		logger.info("Inspection wonum searching", woNum);
		this.checkForUpdateButton();
		assertTrue("Should return the inspection associated to a work order", conductAnInspection.search(woNum));
		// Click Work Order
		InspectionsPage.clickWorkOrderButton();
		// Make sure it goes to Work Order page
		assertEquals(WorkOrderDetailsPage.getTextWODescription(), "Work Order Description " + woNum + WorkType.PM.toString() + " " + woNum);
		logger.info("Navigation to work order details page in Technician app done correctly.");

	}

	/**
	 * Navigate Back To Inspections App
	 * 
	 * @throws Exception
	 */
	public void navigateBackToInspectionsApp() throws Exception {

		InspectionsPage conductAnInspection = new InspectionsPage(af);
		// Click back from inspections page to work order
		WorkOrderDetailsPage.clickBackWOList();
		// Search for a work order with inspection
		assertTrue("Should return the inspection associated to a work order", conductAnInspection.search(woNum));
		// Check the Form displayed
		assertEquals(InspectionsPage.getInspectionCardHeaderText(0), form1);
		logger.info("Form: " + form1 + " is correctly displayed.");

	}

	/**
	 * Navigate To Inspections App From Tasks Page
	 * 
	 * @throws Exception
	 */
	public void navigateToInspectionsAppFromTasksPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);

		AppSwitcher appSwitcher = new AppSwitcher(af);
		appSwitcher.switchApp(App.MySchedule);

		// Search the WO
		assignedWorkPage.search(woNumWithTask);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Click on Task touchpoint.
		assignedWorkOrderDetailsPage.clickTaskButton();
		// Click on Inspection touchpoint.
		assignedWorkOrderDetailsPage.clickInspectionButtonForTasks();
		// Verify that user is navigated to Inspections app and inspection form assigned
		// to work order is displayed for conducting inspection.
		assertEquals(InspectionsPage.getInfo(), "Inspections");
		logger.info("Inspections Page is correctly displayed.");
		// Check the Form displayed
		assertEquals(InspectionsPage.getFormName(), form2);
		logger.info("Form: " + form2 + " is correctly displayed.");

	}

	/**
	 * Navigate Back Tasks Page From Inspections App
	 * 
	 * @throws Exception
	 */
	public void navigateBackTasksPageFromInspectionsApp() throws Exception {

		// Click back from inspections page to work order
		InspectionsPage.clickBackFromInspectionToWorkOrderButton();
		// Make sure it is back to Work Order page
		assertEquals(WorkOrderDetailsPage.getTextTaskDescription(), "WorkOrder Task for mobile automation test");
		logger.info("Navigation back to Tasks page in Technician app done correctly.");

	}

	/**
	 * Create Asset
	 * 
	 * @throws Exception
	 */
	public void createAsset() throws Exception {
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Asset.fakeAsset(assetNum, null));
		logger.info("Asset: {}" + assetNum);

	}

	/**
	 * Create Work Order
	 * 
	 * @throws Exception
	 */
	public void createWorkOrder() throws Exception {
		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		WorkOrder workOrder = WorkOrder.fakeWorkOrder(woNum, assetNum, null, inspFormNum1);
		workOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(workOrder);
		logger.info("Work Order: {}" + woNum);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(workOrder, WoStatus.APPR.toString());

	}

	/**
	 * Create Work Order with Task
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderWithTask() throws Exception {
		// Create a workorder
		logger.info("Creating a work order with a task");
		woNumWithTask = AbstractAutomationFramework.randomString(5).toUpperCase();
		newWorkOrder = WorkOrder.fakeWorkOrder(woNumWithTask, assetNum, null, null);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNumWithTask);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Create an asset for Task
		logger.info("Creating an asset");
		assetNum1 = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Asset.fakeAsset(assetNum1));
		logger.info("Task Asset: {}" + assetNum1);

		// Create a location for Task
		logger.info("Creating a location");
		location1 = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Location.fakeLocation(location1));
		logger.info("Task Location: {}" + location1);

		// Create Task
		logger.info("Task API Call started ");
		List<Task> arr = new ArrayList<>();
		Task task = new Task();
		task.setEstdur(Float.parseFloat("1.5"));
		task.setSiteid(SetupData.SITEID);
		task.setDescription("WorkOrder Task for mobile automation test");
		task.setOwnergroup(SetupData.OWNERGROUP);
		task.setParentchgsstatus(true);
		task.setTaskid(Integer.parseInt("89087"));
		task.setStatus(WoStatus.WAPPR.toString());
		task.setAssetnum(assetNum1);
		task.setLocation(location1);
		task.setInspformnum(inspFormNum2);
		arr.add(task);
		newWorkOrder.setWoactivity(arr);
		maximoApi.update(newWorkOrder);
		logger.info("Tasks added");
	}

	/**
	 * Create Form
	 * 
	 * @throws Exception
	 */
	public void createDefaultForm() throws Exception {
		logger.info("Creating default inspection form");
		logger.info("getting the next id available");
		// Get the next id
		String result = maximoApi.retrieve(new InspForm(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		InspForm inspForm = new Gson().fromJson(result, InspForm.class);

		form = AbstractAutomationFramework.randomString(5).toUpperCase();
		inspForm.setName(form);
		inspForm.setDescription("Automated Test Form");

		// Create the draft
		logger.info("creating draft");
		maximoApi.create(inspForm);

		// Get inspFormNum
		inspFormNum = inspForm.getInspFormNum();

		logger.info("adding questions");
		inspForm.setInspQuestion(getDefaultInspQuestions());

		// Add questions
		maximoApi.update(inspForm);

		// Activate
		logger.info("activating form");
		maximoApi.changeStatus(inspForm, ItemStatus.ACTIVE.toString(), "changeFormStatus");
		logger.info("Form: {}" + form);

	}

	/**
	 * Adding questions to the Form
	 * 
	 * @return inspQuestions
	 */
	private List<InspQuestion> getDefaultInspQuestions() {
		List<InspQuestion> inspQuestions = new ArrayList<>();

		// First question
		InspQuestion inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 1 - Date and time");
		inspQuestion.setSequence(1);
		inspQuestion.setGroupSeq(1);
		inspQuestion.setAction("Add");

		InspField inspField = new InspField();
		inspField.setFieldtypeMaxvalue("DT");
		inspField.setFieldType("DT");
		inspField.setDescription("Enter date and time");
		inspField.setRequired(true);
		inspField.setSkipOption(false);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);
		inspField.setSequence(1);
		inspField.setAction("Add");

		List<InspField> inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		// Second question
		inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 2 - Numeric");
		inspQuestion.setSequence(2);
		inspQuestion.setGroupSeq(2);
		inspQuestion.setAction("Add");

		inspField = new InspField();
		inspField.setFieldtypeMaxvalue("SE");
		inspField.setFieldType("SE");
		inspField.setDescription("Enter a number");
		inspField.setRequired(true);
		inspField.setSkipOption(false);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);
		inspField.setSequence(1);
		inspField.setAction("Add");

		inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		// Third question
		inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 3 - Single Choice");
		inspQuestion.setSequence(3);
		inspQuestion.setGroupSeq(3);
		inspQuestion.setAction("Add");

		inspField = new InspField();
		inspField.setFieldtypeMaxvalue("SO");
		inspField.setFieldType("SO");
		inspField.setDescription("Select an option");
		inspField.setRequired(false);
		inspField.setSkipOption(true);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);

		List<InspFieldOption> inspFieldOptions = new ArrayList<>();
		InspFieldOption inspFieldOption = new InspFieldOption();
		inspFieldOption.setDescription("Option 1");
		inspFieldOption.setSequence(1);
		inspFieldOption.setAction("Add");
		inspFieldOptions.add(inspFieldOption);

		inspFieldOption = new InspFieldOption();
		inspFieldOption.setDescription("Option 2");
		inspFieldOption.setSequence(2);
		inspFieldOption.setAction("Add");
		inspFieldOptions.add(inspFieldOption);

		inspField.setInspFieldOption(inspFieldOptions);
		inspField.setSequence(1);
		inspField.setAction("Add");

		inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		// Fourth question
		inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 4 - Text response");
		inspQuestion.setSequence(4);
		inspQuestion.setGroupSeq(4);
		inspQuestion.setAction("Add");

		inspField = new InspField();
		inspField.setFieldtypeMaxvalue("TR");
		inspField.setFieldType("TR");
		inspField.setDescription("Type something here");
		inspField.setRequired(false);
		inspField.setSkipOption(true);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);
		inspField.setSequence(1);
		inspField.setAction("Add");

		inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		return inspQuestions;
	}
}
