package com.ibm.maximo.technician.framework;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.junit.After;
import org.openqa.selenium.By;
import org.openqa.selenium.logging.LogEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.AppTest;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.api.JdbcConnection;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.LoginFlow;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.automation.mobile.page.MaximoUrlPage;
import com.ibm.maximo.automation.mobile.page.NavigatorPage;

import com.ibm.maximo.automation.mobile.page.ProfilePage;
import com.ibm.maximo.automation.mobile.page.WelcomePage;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.automation.mobile.stub.endpoint.Endpoint;
import com.ibm.maximo.automation.mobile.stub.endpoint.TechnicianEndpoint;
import com.ibm.maximo.technician.ConfigProperties;
import com.ibm.maximo.technician.setupdata.SetupData;

import io.appium.java_client.AppiumDriver;

public abstract class TechnicianTest extends AppTest {

	protected AppiumDriver<?> driver;
	private ConfigProperties config;
	protected TechnicianFramework tf;

	protected String assetNum;
	protected String woNum;
	private MaximoApi maximoApi;
	private final static Logger logger = LoggerFactory.getLogger(TechnicianTest.class);
	private final static Logger applogger = LoggerFactory.getLogger(TechnicianTest.class);
	public AbstractAutomationFramework af;
	public static LoginPage lp;
	private static String continueButtonLocator = "landingScreen_ContinueButton";

	public static JdbcConnection jdbcConnection;

	@BeforeSuite(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setupForEAMMaximoApiKey(String configPath) throws Exception {
		Properties properties = new Properties();
		InputStream in = new BufferedInputStream(new FileInputStream(configPath));
		properties.load(in);
		String masServer = properties.getProperty("system.masServer");
		
		// EAM env
		if(masServer.equals("false")) {
			logger.info("********************maximoAPIKey*********************************");		
			maximoApi = new MaximoApi();
			
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					"");
			String expirationStr = "{\"expiration\":-1}";	
			String maximoAPIKey = maximoApi.generateAPIKEY(expirationStr,properties.getProperty("system.username"),
					properties.getProperty("system.password"));
			logger.info("maximoAPIKey:" + maximoAPIKey);
			
			OutputStream OutputStream = new BufferedOutputStream(new FileOutputStream(configPath));		
			properties.setProperty("system.maximoAPIKey", maximoAPIKey);
			properties.store(OutputStream, "updated maximoAPIKey");
			OutputStream.close();
			
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));
		}
		
	}
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void baseSetup(String configPath) throws Exception {
		FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			jdbcConnection = new JdbcConnection(properties.getProperty("system.maximoDBDriver"),
					properties.getProperty("system.maximoDBURL"), properties.getProperty("system.maximoDBUsername"),
					properties.getProperty("system.maximoDBPassword"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@After
	public void baseTearDown() {
		if (Boolean.valueOf(config.getProperty("showConsoleLogs"))) {
			for (LogEntry entry : driver.manage().logs().get("browser")) {
				logger.info(entry.getMessage());
			}
		}

		if (driver != null) {
			driver.quit();
		}
	}

	public WelcomePage loginIntoTechnician(String username, String password) throws Exception {
		LoginPage lp = LoginPage.getLoginPage(tf);
		lp.setUsername(username);
		lp.setPassword(password);
		return lp.login();
	}

	public LoginPage configureMaximoUrl() throws Exception {
		MaximoUrlPage mup = new MaximoUrlPage(tf);
		// Set the Maximo stub address
		mup.setMaximoUrl(config.getMaximoUrl());
		return mup.clickNextButton();
	}

	public void addAdditionalTechnicianEndpoints(List<Enum<?>> additionalTechnicianEndpoints) {
		config.configureStub(additionalTechnicianEndpoints);
	}

	public List<Enum<?>> getTechnincianBasicEndpoints() {
		List<Enum<?>> endpoints = new ArrayList<>();

		endpoints.add(Endpoint.PING);
		endpoints.add(Endpoint.LOGIN);
		endpoints.add(Endpoint.LOGOUT);
		endpoints.add(TechnicianEndpoint.SAM__WHO_AM_I);
		endpoints.add(Endpoint.SYSTEM_INFO);
		endpoints.add(TechnicianEndpoint.SAM__PERMISSION__ALLOWED_APP_OPTIONS);
		endpoints.add(TechnicianEndpoint.SAM__LICENSE_INFO);
		endpoints.add(Endpoint.SERVICE__SYSTEM);
		endpoints.add(TechnicianEndpoint.GRAPHITE__TECH_MOBILE__BUILD_JSON);

		return endpoints;
	}
	
	public void permission(AbstractAutomationFramework af) throws Exception {
		af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);
		if (af instanceof MobileAutomationFramework) {
			logger.info("is Mobile");
			try {
				((MobileAutomationFramework) af).allowAllPermission();
			} catch (Exception e) {
				// TODO: handle exception
				logger.info("Do not have permission check");
			}
		}
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		tf.maximoApi.create(Asset.fakeAsset(assetNum));
		logger.info("Asset: {}", assetNum);

		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		WorkOrder workOrder = WorkOrder.fakeWorkOrder(woNum, assetNum);
		workOrder.setWorkType("PM");
		tf.maximoApi.create(workOrder);
		logger.info("Work Order: {}", woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		tf.maximoApi.changeStatus(workOrder, "APPR");

		List<Map<String, String>> assignment = new ArrayList<>();
		Map<String, String> assignmentItem = new Hashtable<>();

		// Assignment with labor SAM
		logger.info("Creating the assignment for the work order {}", woNum);
		assignmentItem.put("craft", "ELECT");
		assignmentItem.put("laborcode", "SAM");

		assignment.add(assignmentItem);

		Map<String, Object> a = new Hashtable<>();
		a.put("assignment", assignment);

		tf.maximoApi.addAssignment(workOrder, a);
		logger.info("Assignment added");
	}

	public void logOut(AbstractAutomationFramework framework) throws Exception {
		this.af = framework;
		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		maf.switchToParentFrame();
		WelcomePage wpObj = new WelcomePage(maf);
		NavigatorPage np = wpObj.openNavigatorMenu();
		logger.info("Tap on User Profile Button");
		ProfilePage pp = np.openProfileMenu();
		logger.info("Tap on logout");
		pp.logout();
	}
	
	public static boolean isLoaded(AbstractAutomationFramework af) {
		try {
			af.waitForElementToBePresent(By.id("p_mgw_linkContainer"),af.DEFAULT_TIMEOUT_MS);
			af.waitForElementToBePresent(By.cssSelector("#" + continueButtonLocator),af.DEFAULT_TIMEOUT_MS);
			return (af.isElementExists(By.cssSelector("#" + continueButtonLocator))&&
					af.isElementExists(By.id("p_mgw_linkContainer")));
		} catch (Exception e) {
			return false;
		}
	}	
	
	public void login(AbstractAutomationFramework framework) throws Exception {
		this.af = framework;
		if(isLoaded(af)) {
			LoginFlow loginFlow = new LoginFlow(af);
			loginFlow.login();	
			goToMySchedule(af);
			permission(af);
		}
		else {	
			reLogin();
		}
	}
	
	// Relogin to enter same credentials
	protected void reLogin() throws Exception {
		logger.info("Login again");
		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		lp = LoginPage.getLoginPage(maf);
		Properties props = this.af.getProperties();
		logger.info("Username: " + props.getProperty("system.username"));
		logger.info("Password: " + props.getProperty("system.password"));
		lp.loginDirectly(props.getProperty("system.username"), props.getProperty("system.password"));
		goToMySchedule(af);
	}
	
	// Relogin to enter different credentials
	public void reLoginWithDifferentCredentials() throws Exception {
		logger.info("ReLogin with different user");
		MobileAutomationFramework maf = (MobileAutomationFramework) this.af;
		lp = LoginPage.getLoginPage(maf);
		Properties props = this.af.getProperties();
		logger.info("Username " + props.getProperty("app.username1"));
		logger.info("Password " + props.getProperty("app.password1"));
		lp.loginDirectly(props.getProperty("app.username1"), props.getProperty("app.password1"));
		goToMySchedule(af);
	}
	
	public void goToMySchedule(AbstractAutomationFramework af) throws Exception {
		AppSwitcher appSwitcher = new AppSwitcher(af);
		appSwitcher.switchApp(App.MySchedule);
	}
}
