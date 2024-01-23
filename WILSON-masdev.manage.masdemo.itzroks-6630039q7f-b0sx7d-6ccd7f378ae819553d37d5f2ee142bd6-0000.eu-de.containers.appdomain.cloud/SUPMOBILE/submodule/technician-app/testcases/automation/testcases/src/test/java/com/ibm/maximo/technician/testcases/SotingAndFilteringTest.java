package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

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
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;

/*
 * GRAPHITE-65464:  CommonUX - Implement sorting in Technician / Approvals app
 * GRAPHITE-65511:  CommonUX - Implement filtering in Technician / Approvals app - Break down
 */
public class SotingAndFilteringTest extends TechnicianTest {

	private final Logger logger = LoggerFactory.getLogger(SotingAndFilteringTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String labor;
	private String woNum;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************SortingAndFilteringTest*********************************");
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
			"priority2" }, description = "Verify Sorting data in the WO list page from selected Sorting list", timeOut = 600000)
	public void verifySortingInWOListPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
				
		//clicks on the sorting icon present on the WO list page
		assignedWorkPage.clickSortingIcon();
		
		//Verify priority sorting is present
		assertEquals("Priority", assignedWorkPage.verifyPrioritySortingPresent());
		
		//click on confirm button to close the slider 
		assignedWorkPage.clickOnConfirmBtnOnSortingPage();
		
		// Verify the priority 1 should be the first  
		assertEquals("Priority 1", assignedWorkPage.verifyProritySortingInWOListPage());		
	}
	
	
	@Test(groups = {
	"priority2" }, description = "Verify Filtering data in the WO list page from selected Filtering list", timeOut = 600000)
     public void verifyFilteringInWOListPage() throws Exception {
		
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		
		//clicks on the filtering icon present on the WO list page
		assignedWorkPage.clickFilteringIcon();
		
		//Click the status filter 
		assignedWorkPage.clickStatusFilter();
		
		//Search for Approved filter 
		assignedWorkPage.searchFilters("Approved");
		
		//Search the first value of the search done
		assignedWorkPage.clickOntheFirstValueofSorting();
		
		//go back to verify badge count 
		assignedWorkPage.goBackFromAllRecordsSliderofFilter();
		
		//Verify Badge count of status after selecting the searched value 
		assertEquals("1", assignedWorkPage.verifyBadgeCount());
		
		//Click on Done button
		assignedWorkPage.clickOnDoneButtonOnFilter();
		
		//Verify with the filter selected (status) on the WO list page 
		assertEquals("Approved", assignedWorkPage.verifyStatusFilterOnWOList());
		
	}

	protected void createDefaultObjects() throws Exception {
		// Create First Work Order
		logger.info("Creating work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		woNum = newWorkOrder.getWoNum();
		newWorkOrder.setDescription("Work Order 1 for Sorting and Filtering US");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		newWorkOrder.setWoPriority(1);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order 1: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
	}
}
