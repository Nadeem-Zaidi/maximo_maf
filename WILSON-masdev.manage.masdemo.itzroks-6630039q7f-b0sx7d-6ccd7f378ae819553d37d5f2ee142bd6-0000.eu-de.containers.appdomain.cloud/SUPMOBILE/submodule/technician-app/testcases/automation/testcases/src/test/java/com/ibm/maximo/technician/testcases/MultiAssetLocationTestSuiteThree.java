package com.ibm.maximo.technician.testcases;

import static org.junit.Assert.assertTrue;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.openqa.selenium.By;
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
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.LocationMeter;
import com.ibm.maximo.automation.mobile.api.json.Meter;
import com.ibm.maximo.automation.mobile.api.json.MultipleAssetsLocationsCIs;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspField;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspFieldOption;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspForm;
import com.ibm.maximo.automation.mobile.api.json.Inspection.InspQuestion;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.InspectionsPage;
import com.ibm.maximo.technician.page.MetersPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

//GRAPHITE-51073 - Multi asset and location and Corresponding touchpoints(Meters, Inspections)
public class MultiAssetLocationTestSuiteThree extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(MultiAssetLocationTestSuiteThree.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String locationNum, labor, locationNum1, locationNum2, locationNum3, locationNum4, assetNum, meterName;
	public static String form, form1, form2;
	public static String woNum, woNum1, woNum2;
	private WorkOrder workOrder, workOrder1, workOrder2;
	public static String inspFormNum, inspFormNum1, inspFormNum2;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************MultiAssetLocationTestSuiteThree*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			maximoApi = new MaximoApi();
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));

			// create Form
			createDefaultForm();
			// Get inspFormNum
			inspFormNum1 = inspFormNum;
			form1 = form;
			// Create Location
			createLocationWithDescription("Location for mobile automation test 1");
			locationNum1 = locationNum;
			createLocationWithDescription("Location for mobile automation test 2");
			locationNum2 = locationNum;
			createLocationWithDescription(null);
			locationNum3 = locationNum;

			// Create Multi Assets
			createAssetWithLocation(locationNum1);
			createAssetWithLocation(locationNum2);
			createAssetWithLocation(locationNum3);
			// Create Work Order with Multiple Locations
			createWorkOrderWithMultiLocation(locationNum1, locationNum2, locationNum3);
			woNum1 = woNum;
			workOrder1 = workOrder;	

			// Create Location with Meters
			createLocationWithMeters();
			locationNum4 = locationNum;
			// Create Multi Assets
			createAssetWithLocation(locationNum4);
			// Create Work Order with Multiple Locations
			createWorkOrderWithMultiLocation(locationNum4, null, null);
			woNum2 = woNum;
			workOrder2 = workOrder;

		} catch (Exception e) {
			e.printStackTrace();
		}
		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		
		logger.info("Change Status to complete for Workorder " + workOrder1.getWoNum());
		maximoApi.changeStatus(workOrder1, WoStatus.COMP.toString());
		
		logger.info("Change Status to complete for Workorder " + workOrder2.getWoNum());
		maximoApi.changeStatus(workOrder2, WoStatus.COMP.toString());
		
		//TODO : Complete WorkOrder which is created as testdata
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = { "mobile" }, description = "verify Inspection Integration", timeOut = 500000)

	public void inspectionIntegration() throws Exception {
		navigateBackToWorkOrderDetailsPage();
		verifyMetersTouchPoint();
		verifyMetersTouchPointNotDisplayed();

	}

	/**
	 * Navigate back to Work Order Details Page
	 * 
	 * @throws Exception
	 */
	public void navigateBackToWorkOrderDetailsPage() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Search the WO
		assignedWorkPage.search(woNum1);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Click on Inspection touchpoint.
		assignedWorkOrderDetailsPage.clickInspectionButton();
		// Verify that user is navigated to Inspections app and inspection form assigned
		// to work order is displayed for conducting inspection.
		assertEquals(InspectionsPage.getInfo(), "Inspections");
		logger.info("Inspections Page is correctly displayed.");
		// Check the Form displayed
		assertEquals(InspectionsPage.getFormName(), form1);
		logger.info("Form: " + form1 + " is correctly displayed.");
		// Click back from inspections page to work order
		InspectionsPage.clickBackFromInspectionToWorkOrderButton();
		// Make sure it is back to Work Order page
		assertTrue(WorkOrderDetailsPage.getTextWODescription().contains("Work Order Description " + woNum1));
		logger.info("Navigation back to work order details page in Technician app done correctly.");

	}

	/**
	 * Verify the meters touch-point is displayed, When assets and locations with
	 * meters are added to work order
	 * 
	 * @throws Exception
	 */
	public void verifyMetersTouchPoint() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage assignedWorkOrderDetailsPage = new WorkOrderDetailsPage(af);
		MetersPage metersPage = new MetersPage(af);

		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Search the WO
		assignedWorkPage.search(woNum2);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Verify the meters touch-point is displayed in asset of WO details page
		Thread.sleep(3000);
		assertTrue(af.isElementExists(By.id(WorkOrderDetailsPage.meterButton)));
		logger.info("Meters touch-point is displayed.");
		// Click on meters touch-point in asset/location section and Verify sliding
		// drawer opens
		assignedWorkOrderDetailsPage.clickMeterButton();
		logger.info("Meters touch-point is clicked.");
		assertEquals("Meters", metersPage.getMeterHeader());
		logger.info("Meters Page is displayed.");
		metersPage.XClick();
	}

	/**
	 * Verify the meters touch-point is displayed, When assets and locations with
	 * meters are added to work order
	 * 
	 * @throws Exception
	 */
	public void verifyMetersTouchPointNotDisplayed() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);

		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Clear the search filter
		logger.info("Clear the search filter");
		assignedWorkPage.clickClearButton();
		// Search the WO
		assignedWorkPage.search(woNum1);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Verify the meters touch-point is NOT displayed in asset of WO details page
		assertFalse(af.isElementExists(By.id(WorkOrderDetailsPage.meterButton)));
		logger.info("Meters touch-point is NOT displayed.");
	}

	/**
	 * Create Location with Description
	 * 
	 * @throws Exception
	 */
	public void createLocationWithDescription(String description) throws Exception {
		// Create location
		logger.info("Creating a location");
		locationNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();
	
		newlocation.setLocationId(locationNum);
		newlocation.setDescription(description);
		newlocation.setSiteId(SetupData.SITEID);
	
		maximoApi.create(newlocation);
		logger.info("locationNum: {}" + locationNum);

	}

	/**
	 * Create Asset with Location
	 * 
	 * @throws Exception
	 */
	public void createAssetWithLocation(String locationNum) throws Exception {
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
	
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
	
		newAsset.setAssetNum(assetNum);
		newAsset.setSiteId(SetupData.SITEID);
		newAsset.setLocation(locationNum);
	
		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

	}

	/**
	 * Create Work Order with Multiple Locations
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderWithMultiLocation(String multiAssetLocCI1, String multiAssetLocCI2,
			String multiAssetLocCI3) throws Exception {
		
		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		workOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		workOrder.setWoNum(woNum);
		workOrder.setSiteId(SetupData.SITEID);
		workOrder.setWorkType(WorkType.PM.toString());
		workOrder.setDescription("Work Order Description " + woNum);
		workOrder.setInspFormNum(inspFormNum);
		maximoApi.create(workOrder);
		logger.info("Work Order: {}" + woNum);

		// Create Multiple Locations
		List<MultipleAssetsLocationsCIs> amalc = new ArrayList<MultipleAssetsLocationsCIs>();
		amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI1, null));
		if (multiAssetLocCI2 != null) {
			amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI2, null));
		}
		if (multiAssetLocCI3 != null) {
			amalc.add(new MultipleAssetsLocationsCIs(null, multiAssetLocCI3, null));
		}
		workOrder.setMultiassetlocci(amalc);
		maximoApi.update(workOrder);
		logger.info("Multiple Locations added");

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(workOrder, WoStatus.APPR.toString());

	}

	/**
	 * Create Form
	 * 
	 * @throws Exception
	 */
	public void createDefaultForm() throws Exception {
		logger.info("Creating default inspection form");
		logger.info("getting the next id available");
		// Get the next id
		String result = maximoApi.retrieve(new InspForm(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		InspForm inspForm = new Gson().fromJson(result, InspForm.class);

		form = AbstractAutomationFramework.randomString(5).toUpperCase();
		inspForm.setName(form);
		inspForm.setDescription("Automated Test Form");

		// Create the draft
		logger.info("creating draft");
		maximoApi.create(inspForm);

		// Get inspFormNum
		inspFormNum = inspForm.getInspFormNum();

		logger.info("adding questions");
		inspForm.setInspQuestion(getDefaultInspQuestions());

		// Add questions
		maximoApi.update(inspForm);

		// Activate
		logger.info("activating form");
		maximoApi.changeStatus(inspForm, "ACTIVE", "changeFormStatus");
		logger.info("Form: {}" + form);

	}

	/**
	 * Adding questions to the Form
	 * 
	 * @return inspQuestions
	 */
	private List<InspQuestion> getDefaultInspQuestions() {
		List<InspQuestion> inspQuestions = new ArrayList<>();

		// First question
		InspQuestion inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 1 - Date and time");
		inspQuestion.setSequence(1);
		inspQuestion.setGroupSeq(1);
		inspQuestion.setAction("Add");

		InspField inspField = new InspField();
		inspField.setFieldtypeMaxvalue("DT");
		inspField.setFieldType("DT");
		inspField.setDescription("Enter date and time");
		inspField.setRequired(true);
		inspField.setSkipOption(false);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);
		inspField.setSequence(1);
		inspField.setAction("Add");

		List<InspField> inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		// Second question
		inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 2 - Numeric");
		inspQuestion.setSequence(2);
		inspQuestion.setGroupSeq(2);
		inspQuestion.setAction("Add");

		inspField = new InspField();
		inspField.setFieldtypeMaxvalue("SE");
		inspField.setFieldType("SE");
		inspField.setDescription("Enter a number");
		inspField.setRequired(true);
		inspField.setSkipOption(false);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);
		inspField.setSequence(1);
		inspField.setAction("Add");

		inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		// Third question
		inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 3 - Single Choice");
		inspQuestion.setSequence(3);
		inspQuestion.setGroupSeq(3);
		inspQuestion.setAction("Add");

		inspField = new InspField();
		inspField.setFieldtypeMaxvalue("SO");
		inspField.setFieldType("SO");
		inspField.setDescription("Select an option");
		inspField.setRequired(false);
		inspField.setSkipOption(true);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);

		List<InspFieldOption> inspFieldOptions = new ArrayList<>();
		InspFieldOption inspFieldOption = new InspFieldOption();
		inspFieldOption.setDescription("Option 1");
		inspFieldOption.setSequence(1);
		inspFieldOption.setAction("Add");
		inspFieldOptions.add(inspFieldOption);

		inspFieldOption = new InspFieldOption();
		inspFieldOption.setDescription("Option 2");
		inspFieldOption.setSequence(2);
		inspFieldOption.setAction("Add");
		inspFieldOptions.add(inspFieldOption);

		inspField.setInspFieldOption(inspFieldOptions);
		inspField.setSequence(1);
		inspField.setAction("Add");

		inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		// Fourth question
		inspQuestion = new InspQuestion();
		inspQuestion.setDescription("Question 4 - Text response");
		inspQuestion.setSequence(4);
		inspQuestion.setGroupSeq(4);
		inspQuestion.setAction("Add");

		inspField = new InspField();
		inspField.setFieldtypeMaxvalue("TR");
		inspField.setFieldType("TR");
		inspField.setDescription("Type something here");
		inspField.setRequired(false);
		inspField.setSkipOption(true);
		inspField.setVisible(true);
		inspField.setShowDate(false);
		inspField.setShowTime(false);
		inspField.setSequence(1);
		inspField.setAction("Add");

		inspFields = new ArrayList<>();
		inspFields.add(inspField);

		inspQuestion.setInspField(inspFields);

		inspQuestions.add(inspQuestion);

		return inspQuestions;
	}

	protected String[] createLocationWithMeters() throws Exception {
		logger.info("Creating Location with Meters");

		String[] vetorMeterName = new String[3];
		String result = maximoApi.retrieve(new Meter(), "addid=1&internalvalues=1&action=system:new&addschema=1");

		// GAUGE Meter
		Meter newMeterGauge = new Gson().fromJson(result, Meter.class);
		newMeterGauge.setMetername("MG" + newMeterGauge.getMeterid());
		meterName = newMeterGauge.getMetername();
		newMeterGauge.setMetertype(MeterType.GAUGE.toString());
		newMeterGauge.setDescription("my meter " + newMeterGauge.getMeterid());
		// Creates Meter Gauge
		maximoApi.create(newMeterGauge);
		logger.info("GAUGE Meter: {}" + newMeterGauge.getMeterid());
		vetorMeterName[0] = meterName;

		// CONTINUOUS Meter
		Meter newMeterContinuous = new Gson().fromJson(result, Meter.class);
		newMeterContinuous.setMetername("MCO" + newMeterContinuous.getMeterid());
		meterName = newMeterContinuous.getMetername();
		newMeterContinuous.setMetertype(MeterType.CONTINUOUS.toString());
		newMeterContinuous.setDescription("my meter " + newMeterContinuous.getMeterid());
		newMeterContinuous.setReadingtype(ReadingType.DELTA.toString());
		// Creates Meter CONTINUOUS
		maximoApi.create(newMeterContinuous);
		logger.info("CONTINUOUS Meter: {}" + newMeterContinuous.getMeterid());
		vetorMeterName[1] = meterName;

		// CHARACTERISTIC Meter
		Meter newMeterCharacteristic = new Gson().fromJson(result, Meter.class);
		newMeterCharacteristic.setMetername("" + newMeterCharacteristic.getMeterid());
		newMeterCharacteristic.setMetertype(MeterType.CHARACTERISTIC.toString());
		newMeterCharacteristic.setDescription("my meter " + newMeterCharacteristic.getMeterid());
		newMeterCharacteristic.setDomainid(MaxDomain.RAIL_WEAR.toString());
		// Creates Meter CHARACTERISTIC
		maximoApi.create(newMeterCharacteristic);
		meterName = "" + newMeterCharacteristic.getMeterid();
		logger.info("CHARACTERISTIC Meter: {}" + meterName);
		vetorMeterName[2] = meterName;

		// Create the LOCATION
		logger.info("Creating a Location");
		locationNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newLocation = new Location();
		newLocation.setLocationId(locationNum);
		newLocation.setSiteId(SetupData.SITEID);
		
		List<LocationMeter> meterList = new ArrayList<LocationMeter>();

		// Add GAUGE Meter
		logger.info("Add GAUGE Meter");
		LocationMeter locationMeterGauge = new LocationMeter();
		locationMeterGauge.setMetername(newMeterGauge.getMetername());

		logger.info("Add Gauge Meter to the list");
		meterList.add(locationMeterGauge);
		
		// Add CONTINUOUS Meter
		LocationMeter locationMeterContinuous = new LocationMeter();
		locationMeterContinuous.setAvgcalcmethod(AverageMethod.ALL.toString());
		locationMeterContinuous.setMetername(newMeterContinuous.getMetername());

		logger.info("Add Continous meter to the list");
		meterList.add(locationMeterContinuous);
		
		// Add CHARACTERISTIC Meter
		LocationMeter locationMeterCharacteristic = new LocationMeter();
		locationMeterCharacteristic.setMetername(newMeterCharacteristic.getMetername());
		logger.info("Add Characteristic meter to the list");
		meterList.add(locationMeterCharacteristic);
		
		// Add location meter to workorder
		newLocation.setLocationmeter(meterList);

		maximoApi.create(newLocation);
		logger.info("Location: {}" + locationNum);
		return vetorMeterName;

	}
}
