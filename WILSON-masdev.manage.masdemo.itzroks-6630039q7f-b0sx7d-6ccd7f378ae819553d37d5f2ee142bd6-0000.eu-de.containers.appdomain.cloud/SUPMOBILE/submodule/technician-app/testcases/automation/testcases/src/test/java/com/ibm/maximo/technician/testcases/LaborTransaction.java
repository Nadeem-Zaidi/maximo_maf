package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

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
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.components.TimeInputComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51062: Report work - Add Labor transaction
 */
public class LaborTransaction extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(LaborTransaction.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String woNum, labor, header, reportHeader, todayDate1, todayDate2;
	private WorkOrder newWorkOrder;

	private int startHrs = 10, startMin = 10;
	private String regularHours = "1", startTime = "10:10 AM", endTime = "11:11 AM";
	private String laborName = "Mike Wilson", craft = "Electrician", skill = "FIRSTCLASS",
			laborType1 = "Waiting for materials";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************LaborTransaction*********************************");
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
			"mobile" }, description = "Verify labor transaction functionality on Report work page", timeOut = 8000000)
	public void laborTransaction() throws Exception {
		// Search the work order
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.search(woNum);

		// Navigate to WO details page
		assignedWorkPage.openCardDetails("cardtemplate1[0]_chevron");

		// Start the work order
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		woDetails.clickStartWorkButton();

		// Navigate to Report work page
		woDetails.clickReportWorkButton();

		// Verify confirm dialog is not displayed when technician clicks on "X" button
		// without making any changes on labor sliding drawer
		ReportWorkPage reportWork = new ReportWorkPage(af);
		reportWork.clickPlusLaborButton();
		reportWork.closeLaborDrawer();

		// Verify Report work page header value
		header = woDetails.getTitle(woDetails.reportWorkPageTitle);
		reportHeader = woNum + " Report work";
		assertEquals(header, reportHeader);
		logger.info("Report work Page header verified");

		reportWork.clickPlusLaborButton();
		logger.info("+ Button clicked");

		// Date in 'MM/DD/YY' format
		SimpleDateFormat month = new SimpleDateFormat("M");
		SimpleDateFormat day = new SimpleDateFormat("d");
		SimpleDateFormat year = new SimpleDateFormat("yy");
		todayDate1 = month.format(new Date()) + "/" + day.format(new Date()) + "/" + year.format(new Date());
		logger.info("Start date on add labor drawer: " + todayDate1);

		// Verify Start date on add labor drawer is an auto-filled value
		TextInputComponent startDateAdd = af.instantiateComponent(TextInputComponent.class, "startDate");
		assertEquals(todayDate1, startDateAdd.getContents());

		// Enter labor start time on add labor drawer
		reportWork.startTime(startHrs, startMin);
		logger.info("Time added");

		// Enter labor hours on add labor drawer
		reportWork.regularHours(regularHours, regularHours);
		logger.info("hours added");

		// Verify if two values of Start date and time, Hours, End date and time are
		// provided then third value is calculated accordingly
		TextInputComponent endDateAdd = af.instantiateComponent(TextInputComponent.class, "endDate");
		logger.info("End date on add labor drawer: " + endDateAdd.getContents());
		reportWork.isDateExist();

		TimeInputComponent endTimeAdd = af.instantiateComponent(TimeInputComponent.class, "endTime");
		logger.info("End Time on add labor drawer: " + endTimeAdd.getTimeInput());
		reportWork.isTimeExist();

		// Verify labor record is saved with updated values when technician clicks on
		// "Save" button on labor drawer
		reportWork.changeLaborType(WoStatus.WMATL);
		reportWork.saveLabor();

		// Verify grouped labor name
		logger.info("Grouped Labor name: " + laborName);
		assertEquals(laborName, reportWork.getLaborName());

		// Click chevron to expand labor record
		reportWork.laborChevron("bam2r_items_datalistWrapper");

		// Date in 'MMMM D, YYYY' format
		month = new SimpleDateFormat("MMMM");
		day = new SimpleDateFormat("dd");
		year = new SimpleDateFormat("yyyy");
		todayDate2 = month.format(new Date()) + " " + day.format(new Date()) + ", " + year.format(new Date());

		// Verify updated values on saved labor record
		logger.info("Start date on saved labor record:" + todayDate2);
		assertEquals(todayDate2, reportWork.getLaborStartDate());

		logger.info("End date on saved labor record:" + todayDate2);
		assertEquals(todayDate2, reportWork.getLaborEndDate());

		logger.info("Start time on saved labor record: " + startTime);
		assertEquals(startTime, reportWork.getLaborStartTime().toUpperCase());

		logger.info("End time on saved labor record: " + endTime);
		assertEquals(endTime, reportWork.getLaborEndTime().toUpperCase());

		logger.info("Labor type on saved labor record: " + laborType1);
		assertEquals(laborType1, reportWork.getLaborType());

		String actualEstimated = reportWork.getLaborHours();
		logger.info("Duration on saved labor record: " + actualEstimated);
		assertEquals(actualEstimated, regularHours + " hour " + regularHours + " minute");

		// Get start time of started labor transaction
		String startTime = reportWork.getStartTime().toUpperCase();
		logger.info("Start Time of started labor transaction: " + startTime);

		// Verify availability of edit pencil icon button for started labor time record
		reportWork.editLabor();

		// Verify clicking on edit pencil button opens sliding drawer to modify started
		// labor time record
		logger.info("Labor name on edit labor drawer: " + laborName);
		assertEquals(laborName, reportWork.getLaborNameOnDrawer());

		TextInputComponent startDateEdit = af.instantiateComponent(TextInputComponent.class, "startDate");
		logger.info("Start date on edit labor drawer: " + todayDate1);
		assertEquals(todayDate1, startDateEdit.getContents());

		TimeInputComponent startTimeEdit = af.instantiateComponent(TimeInputComponent.class, "startTime");
		logger.info("Start time on edit labor drawer: " + todayDate1);
		assertEquals(startTime, startTimeEdit.getTimeInput());

		logger.info("Craft on edit labor drawer: " + craft);
		assertEquals(craft, reportWork.getLaborCraftOnDrawer());

		logger.info("Skill level on edit labor drawer: " + skill);

		assertEquals(skill, reportWork.getLaborSkillOnDrawer());
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create work order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		WorkOrder newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WO for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: " + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
	}
}