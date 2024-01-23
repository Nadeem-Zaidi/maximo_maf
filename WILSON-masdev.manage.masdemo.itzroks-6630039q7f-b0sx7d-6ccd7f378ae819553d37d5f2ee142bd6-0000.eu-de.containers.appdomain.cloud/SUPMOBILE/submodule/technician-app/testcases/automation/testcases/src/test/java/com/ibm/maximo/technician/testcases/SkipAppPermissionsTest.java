package com.ibm.maximo.technician.testcases;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.ibm.maximo.automation.mobile.page.NavigatorPage;
import com.ibm.maximo.automation.mobile.page.WelcomePage;
import com.ibm.maximo.technician.TestProperties;
import com.ibm.maximo.technician.framework.TechnicianTest;

public class SkipAppPermissionsTest extends TechnicianTest {
	private TestSuite testSuite;
	
	@BeforeClass(alwaysRun = true)
    public void setup() throws Exception {
		// Login into app, skipping the default wo's creation and skipping the app permission page
		loginApp(TestProperties.MAXIMO_URL, TestProperties.DEFAULT_USERNAME, TestProperties.DEFAULT_PASSWORD);
    }
	
	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		if (testSuite != null) {
			testSuite.teardown();
		}
	}
	
	@Test(groups = { "mobile" }, description = "Verify skip App Permission", timeOut = 100000)
	public void skipAppPermissionsTest() throws Exception {
		// Open My Schedule app
		WelcomePage wp = new WelcomePage(tf);
		NavigatorPage navigator = wp.openNavigatorMenu();
		navigator.openApp("My Schedule");
	}
	
}
