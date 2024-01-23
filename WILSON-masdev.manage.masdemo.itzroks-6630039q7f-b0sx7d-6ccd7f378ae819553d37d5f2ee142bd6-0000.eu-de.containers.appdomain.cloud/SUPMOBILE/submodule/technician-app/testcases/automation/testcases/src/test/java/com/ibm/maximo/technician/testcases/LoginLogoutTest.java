package com.ibm.maximo.technician.testcases;
import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ibm.maximo.automation.mobile.page.TermsAndConditionsPage;
import com.ibm.maximo.automation.mobile.page.WelcomePage;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;

public class LoginLogoutTest extends TechnicianTest {
    
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
    public void setup(String configPath) throws Exception {
        // Here we should add any additional endpoints (other than the basic ones) to the stub's contract, if any
    }
    
	@Test(groups = { "mobile" }, description = "Verify login and logout", timeOut = 200000)
    public void loginLogout() throws Exception {
        TermsAndConditionsPage tcp = new TermsAndConditionsPage(tf);
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

        // Disagree
        tcp.disagree();
        
        // Check the popup message
        assertEquals("The use of this app requires agreement to the Terms and Conditions.", tcp.getDisagreePopupMessage());
        
        // Then agree
        tcp.closeDisagreePopupMessage();
        tcp.agree();
        
        // Set the Maximo stub address
        LoginPage lp = configureMaximoUrl();
        
        // Login as sam
        WelcomePage ip = lp.login("sam", "sam");
        
        // Logout
        lp = ip.logout();
        
        // Check if it's logged out
        lp.setUsername("test");
        assertEquals("test", lp.getUsername());
    }
}
