package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;

/*
 * GRAPHITE-51047: Launch from Navigator (My schedule, maps, tools and materials)
 */

public class NavigatorTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(NavigatorTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************NavigatorTest*********************************");
		this.af = FrameworkFactory.get();
		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" },  description = "Verify that tapping on My Schedule opens the WO List with Assigned work filter", timeOut = 500000)
	public void clickOnMySchedule() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		AppSwitcher appSwitcher = new AppSwitcher(af);
		appSwitcher.switchApp(App.MySchedule);
		// Verify WO List opens with "Assigned work" filter
		logger.info("Verify WO List opens with Assigned work filter");
		assertEquals("Assigned work", assignedWorkPage.getAssignedWorkFilterOnMySchedulePage());
	}

	@Test(groups = {
			"mobile" },  description = "Verify that tapping on Map opens the WO list with Assigned work filter in map view", timeOut = 500000)
	public void tapOnMap() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		AppSwitcher appSwitcher = new AppSwitcher(af);

		// Verify "Map" opens with "Assigned work" filter
		logger.info("Verify Map opens with Assigned work filter");
		appSwitcher.switchApp(App.Map);
		assertEquals("Assigned work", assignedWorkPage.getAssignedWorkFilterOnMapPage());
		assertTrue(af.isElementExists(By.id("r4nev")));
		// Time to load Map in map area
		Thread.sleep(5000);
		assertTrue(af.isElementExists(By.id("vazdy_items_search_searchInput")));

		//Back to WO List
		assignedWorkPage.clickOnWOListIconFromMapView();
	}

	@Test(groups = {
			"mobile" },  description = "Verify that tapping on Materials & Tools opens the planned materials and tools list with Assigned work filter", timeOut = 500000)
	public void tapOnMaterialsAndTools() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		AppSwitcher appSwitcher = new AppSwitcher(af);

		// Verify "Materials & Tools" opens with "Assigned work" filter
		logger.info("Verify Materials & Tools opens with Assigned work filter");
		appSwitcher.switchApp(App.MaterialAndTools);
		assertEquals("Assigned work", assignedWorkPage.getAssignedWorkFilterOnMaterialsToolsPage());
		appSwitcher.switchApp(App.MySchedule);
	}

}
