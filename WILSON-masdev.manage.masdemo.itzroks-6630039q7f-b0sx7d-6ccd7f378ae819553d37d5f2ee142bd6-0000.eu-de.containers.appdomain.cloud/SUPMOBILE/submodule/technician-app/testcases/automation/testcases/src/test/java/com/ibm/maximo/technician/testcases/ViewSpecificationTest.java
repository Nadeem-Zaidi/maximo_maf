package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;
import java.util.Random;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.LoginFlow;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.automation.mobile.page.login.LoginPage;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WorkType;


/*GRAPHITE-55300:[TECHMOBILE] Specification*/
public class ViewSpecificationTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ReservedItemsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum;
	private String labor;
	private String cardId = "cardtemplate1[0]_chevron";
	public static LoginPage lp;
	private String specificationTitle = "Specifications";
	private String classStructureid;
	private String classsificationid;
	private String assetAttrId;
	private String workOrderId;
	private String numValue = "1";
	private	String woType = WorkType.PM.toString();
	
	// private static final String ASSET_DESCRIPTION = "Asset for mobile automation test";
	private static final String WO_DESCRIPTION = "WorkeOrder for mobile automation test";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************Classified Work Order*********************************");
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

	@Test(groups = { "mobile" }, description = "Verify Specifications drawer open on classfied work order", timeOut = 300000)
	public void ViewSpecifications() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		assertTrue(assignedWorkPage.search(woNum), "Fail : Task Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		// Wait for start work button enabled
		woDetails.startWorkButtonEnabled();
		// Click on Materials and Tools Touch point
		woDetails.clickSpecificationTouchpoint();
		// Verify Specification Title
		assertEquals(specificationTitle, woDetails.specificationTitle());
		// Click on Close Specification Drawer
		woDetails.closeSpecificationTouchpoint();
		// Verify Classification Id Text
		assertEquals(classsificationid, woDetails.classificationIdText());
	}
	
	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");
		// Update System Properties
		this.updateSystemProperties();
		
		// Create a workorder
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription(WO_DESCRIPTION);
		// newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: {}" + woNum);
		
		// Set Specification
		this.setSpecification();
		logger.info("Specification added in Work Order");
		
		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());

		// Assignment with labor wilson
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

	}
	
	protected void updateSystemProperties() throws Exception {
		// Set System Properties
		maximoApi.setProperty("maximo.mobile.usetimer","COMMON",null,"1");
		logger.info("System Properties Set Successfully");
	}
	
	protected void setSpecification() throws Exception {
		try {
			// select class structureid , description and asset attribbute id from classspec
			String query = "SELECT DISTINCT  CST.CLASSSTRUCTUREID ,CST.DESCRIPTION, CSP.ASSETATTRID , CST.CLASSIFICATIONID FROM MAXIMO.CLASSSTRUCTURE CST INNER JOIN MAXIMO.CLASSSPEC CSP ON CST.CLASSSTRUCTUREID = CSP.CLASSSTRUCTUREID";
			Object[] classSpecResult = jdbcConnection.executeSQL(query);
			Object[] resultArray = (Object[]) classSpecResult[0];
			classStructureid = resultArray[0].toString();
			assetAttrId = resultArray[2].toString();
			classsificationid = resultArray[3].toString();

			// assign above class structure id to created asset
			String updateQuery = "update MAXIMO.WORKORDER M set M.CLASSSTRUCTUREID='" + classStructureid + "' where M.WONUM = '" + woNum + "'";
			int updateResult = jdbcConnection.executeUpdateSQL(updateQuery);
			logger.info("=== update work order classstructureid status === ", updateResult);

			Random random = new Random();
			int workOrderSpecId = random.nextInt(10000);
			int rowStamp = random.nextInt(100000);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String currentDate = sdf.format(new Date());
			
			// Get Work Order Id
			String workOrderQuery = "SELECT M.WORKORDERID FROM MAXIMO.WORKORDER M WHERE M.WONUM = '" + woNum + "'";
			Object[] woResult = jdbcConnection.executeSQL(workOrderQuery);
			Object[] woResultArray = (Object[]) woResult[0];
			workOrderId = woResultArray[0].toString();

			String insertQuery = "INSERT INTO MAXIMO.WORKORDERSPEC (WONUM,WORKORDERSPECID,ASSETATTRID,CLASSSTRUCTUREID,NUMVALUE,DISPLAYSEQUENCE,CHANGEDATE,CHANGEBY,SITEID,ORGID,ROWSTAMP,REFOBJECTID,REFOBJECTNAME,MANDATORY) VALUES ('"
					+ woNum + "','" + workOrderSpecId + "','" + assetAttrId + "','" + classStructureid + "','" + numValue + "','1',TO_DATE('" + currentDate + "','YYYY-MM-DD'),'" + 
					labor.toUpperCase() + "','" + SetupData.SITEID + "','" + SetupData.ORGID + "','" + rowStamp + "','" + workOrderId + "','WORKORDER','0')";
					
			int insertResult = jdbcConnection.executeUpdateSQL(insertQuery);
			logger.info("=== insert workorderspec status === ", insertResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
	} 
}