package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.ibm.maximo.automation.mobile.page.NavigatorPage;
import com.ibm.maximo.automation.mobile.page.WelcomePage;
import com.ibm.maximo.components.ToastComponent;
import com.ibm.maximo.technician.TestProperties;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.FailureReportingPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;

public class GPSTesting extends TechnicianTest {
	private TestSuite testSuite;
	@BeforeClass(alwaysRun = true)
	public void setup() throws Exception {
		// Login into app
		loginApp(TestProperties.MAXIMO_URL, TestProperties.DEFAULT_USERNAME, TestProperties.DEFAULT_PASSWORD);
	}
	
	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = { "mobile" }, description = "Verify GPS testing", timeOut = 100000)
	public void checkGPSOnDevice() throws Exception {
		
		// Open My Schedule app
		WelcomePage wp = new WelcomePage(tf);
		NavigatorPage navigator = wp.openNavigatorMenu();
		navigator.openApp("My Schedule");
		
		// Open work order details
		MySchedulePage assignedWorkPage = new MySchedulePage(tf);
		assignedWorkPage.search(woNum);
		
		WorkOrderDetailsPage woDetails = assignedWorkPage.openCardDetails("jgyq6_cards_" + woNum + "_LongPress");

		// Open Report Work page
		ReportWorkPage reportWorkPage = woDetails.clickReportWorkButton();

		// Enter failure reporting
		FailureReportingPage failureReporting = reportWorkPage.edit();

		// Choosing failure class
		failureReporting.openFailureClassList();
		failureReporting.chooseFailureClassValue(8);

		// Choosing problem
		failureReporting.chooseProblemValue(2);

		// Choosing cause
		failureReporting.chooseCauseValue(1);

		// Choosing cause
		failureReporting.chooseRemedyValue(0);

		// Add remarks
		failureReporting.addSummary("Summary Test");

		// Click on Save button
		reportWorkPage = failureReporting.save();
		
		// Click on Save button (from report work page)
		reportWorkPage.completeWorkOrder();
		ToastComponent tc = tf.instantiateComponent(ToastComponent.class, "toast-0");
		String toastText = tc.getTitleText();

		// Check the toaster
		assertEquals(true, woNum + " was completed.", toastText);
		// Clear the search field
		assignedWorkPage.clickClearButton();
		
	}
}
