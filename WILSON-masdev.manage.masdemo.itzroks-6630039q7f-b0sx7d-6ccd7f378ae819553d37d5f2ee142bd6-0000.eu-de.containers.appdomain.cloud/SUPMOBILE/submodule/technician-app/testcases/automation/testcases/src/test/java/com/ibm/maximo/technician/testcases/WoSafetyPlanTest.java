package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import com.ibm.maximo.automation.mobile.api.json.Hazard;
import com.ibm.maximo.automation.mobile.api.json.Precaution;
import com.ibm.maximo.automation.mobile.api.json.WoSafetyLink;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

//GRAPHITE-51078: View and Review Safety plan
 
public class WoSafetyPlanTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(WoSafetyPlanTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	public static LoginPage lp;
	private String navigatorClick = "NavigatorMenuButton";
	private String woNum, labor, hazardId, precautionId;
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************WoSafetyPlanTest*********************************");		
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

	@Test(groups = { "mobile" }, description = "Verify Safety Plan functionality when maximo.mobile.safetyplan.review = 0", timeOut = 900000)
	public void viewReviewSafetyPlan1() throws Exception {
		try {
			MySchedulePage assignedWorkPage = new MySchedulePage(af);
			assignedWorkPage.search(woNum);
			
			logger.info("Verify safety plan badge count is available on work order card");
			assertEquals("1", assignedWorkPage.safetyPlanBadgeCount());
			
			// Click on the safety plan touch-point to open safety plan sliding drawer
			assignedWorkPage.openSafetyPlanDrawer();
			
			logger.info("Verify the contents of the safety plan sliding drawer");
			assignedWorkPage.getSafetyPlanDrawerContents(hazardId, precautionId);	
	
			// Click on primary checkmark button in "Review safety plan" section
			assignedWorkPage.reviewSafetyPlan();
			
			logger.info("Verify safety plan is marked reviewed and displays reviewed date along with green checkmark");
			assertEquals("Carbon:checkmark--outline", assignedWorkPage.getGreenSafetyPlanCheckmark());
			assertEquals("Reviewed", assignedWorkPage.getReviewedSafetyPlanText());	
	
			// Date in 'MMMM D, YYYY' format
			SimpleDateFormat month = new SimpleDateFormat("MMMM");
			SimpleDateFormat day = new SimpleDateFormat("dd");
			SimpleDateFormat year = new SimpleDateFormat("yyyy");
			String todayDate = month.format(new Date()) + " " + day.format(new Date()) + ", " + year.format(new Date());
			assertEquals(todayDate, assignedWorkPage.getReviewedDate());
		} catch (Exception e) {
			e.printStackTrace();
		}		
		finally{
			MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
			logOut(maf);
			maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		}		
	}
	
	@Test(groups = { "mobile" }, description = "Verify Safety Plan functionality when maximo.mobile.safetyplan.review = 1", timeOut = 1900000)
	public void viewReviewSafetyPlan2() throws Exception {	
		updateSystemProperties();
		createDefaultObjects();
		reLogin();

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.search(woNum);
		assignedWorkPage.clickStartWorkButton();

		logger.info("Verify that safety plan sliding drawer opens with toast message asking to review the safety plan");
		assertEquals("You must review the safety plan before you start work.", assignedWorkPage.toastMessageDisplayed());
		assertEquals("Safety plan", assignedWorkPage.getSlidingDrawerHeader());
		
		// Click on primary checkmark button in "Review safety plan" section
		assignedWorkPage.reviewSafetyPlan();
		assignedWorkPage.closeSafetyPlanDrawer();
		
		logger.info("Verify that safety plan sliding drawer doesn't open and work order status is changed to INPRG");
		assignedWorkPage.clickStartWorkButton();
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		assertEquals("Work order", woDetails.getInfo());
		assertEquals("In progress", woDetails.verifyChangedStatus());					
	}
	
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		
		// Create a work order
		logger.info("Creating work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription("WO for Safety Plan Test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: {}" + woNum);		
		// Assign the labor 
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
		
		createHazardPrecaution();
		
		// Create a hazard
		List<WoSafetyLink> woSafetyLinkList = new ArrayList<>();
		WoSafetyLink woSafetyLink = new WoSafetyLink();
		woSafetyLink.setHazardId(hazardId);
		woSafetyLink.setSiteId(SetupData.SITEID);
		woSafetyLinkList.add(woSafetyLink);
		newWorkOrder.setWoSafetyLink(woSafetyLinkList);
		maximoApi.update(newWorkOrder);
		logger.info("Hazard created");
		
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());		
	}
	
	protected void createHazardPrecaution() throws Exception {
		logger.info("Creating hazard precautions");
		hazardId = AbstractAutomationFramework.randomString(5).toUpperCase();
		String defaultHazard = maximoApi.retrieve(new Hazard(),
				"addid=1&internalvalues=1&action=system:new&ignorecollectionref=1");
		Hazard hazard = new Gson().fromJson(defaultHazard, Hazard.class);
		hazard.setHazardId(hazardId);
		hazard.setDescription("Hazard description "+hazardId);
		hazard.setPrecautionEnabled(true);
		
		precautionId = AbstractAutomationFramework.randomString(5).toUpperCase();
		Precaution precaution = new Precaution();
		precaution.setPrecautionId(precautionId);
		precaution.setDescription("Precaution description "+precautionId);
		precaution.setSiteId(SetupData.SITEID);
		
		List<Precaution> precautionList = new ArrayList<>();
		precautionList.add(precaution);
		hazard.setPrecaution(precautionList);	
		maximoApi.create(hazard);
		logger.info("Precaution created");
	}
	
	protected void updateSystemProperties() throws Exception {
		logger.info("Set the value of maximo.mobile.safetyplan.review to 1");
		String value = String.valueOf(1);
		maximoApi.setProperty("maximo.mobile.safetyplan.review", "COMMON", null, value);
		logger.info("Properties Set Successfully");
	}

}