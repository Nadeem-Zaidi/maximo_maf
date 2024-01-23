package com.ibm.maximo.technician.testcases;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;

import com.ibm.maximo.automation.mobile.FrameworkFactory;

public class TestSuite  {
	private final Logger logger = LoggerFactory.getLogger(TestSuite.class);
	
	@BeforeTest(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************TestSuite*********************************");
		FrameworkFactory.init(configPath);
	}

	@AfterTest(alwaysRun = true)
	public void teardown() throws Exception {
		FrameworkFactory.stopAll();
	}
}