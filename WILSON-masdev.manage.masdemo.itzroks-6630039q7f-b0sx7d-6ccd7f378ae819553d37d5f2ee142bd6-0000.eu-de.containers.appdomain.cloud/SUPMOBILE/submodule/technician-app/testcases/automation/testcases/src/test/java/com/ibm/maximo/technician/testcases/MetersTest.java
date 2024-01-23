package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
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
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.AssetMeter;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.LocationMeter;
import com.ibm.maximo.automation.mobile.api.json.Meter;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MetersPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*GRAPHITE-47693:[MobileAutomation] Eli should be able to enter meter readings*/
public class MetersTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(MetersTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, labor, location;
	private String enterMeterValue = "123";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************MetersTest*********************************");
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
			"mobile" }, description = "Verify save/checkmark button is enabled when technician enters a valid meter reading in any of the associated meter", timeOut = 250000)
	public void searchForWorkOrderAndEnterMeterReadings() throws Exception {

		// Open work order details
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		MetersPage metersPage = new MetersPage(af);

		// Search the WO
		assertTrue(assignedWorkPage.search(woNum));
		// click on Meters Icon
		assignedWorkPage.clickMetersButton();
		assertFalse(metersPage.checkMeterValueBeforeReading());
		assertTrue(metersPage.addMeterReadings(enterMeterValue));
		assertTrue(metersPage.checkMeterValueAfterReading(enterMeterValue));
		metersPage.cancel();
	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		String result = maximoApi.retrieve(new Meter(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterCharacteristic = new Gson().fromJson(result, Meter.class);

		newMeterCharacteristic.setMetername("MC" + newMeterCharacteristic.getMeterid());
		newMeterCharacteristic.setMetertype(MeterType.CHARACTERISTIC.toString());
		newMeterCharacteristic.setDescription("my meter " + newMeterCharacteristic.getMeterid());
		newMeterCharacteristic.setDomainid(MaxDomain.RAIL_WEAR.toString());

		// Creates Meter CHARACTERISTIC
		maximoApi.create(newMeterCharacteristic);
		logger.info("CHARACTERISTIC Meter: {}" + newMeterCharacteristic.getMeterid());

		String resultGauge = maximoApi.retrieve(new Meter(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterGauge = new Gson().fromJson(resultGauge, Meter.class);

		newMeterGauge.setMetername("MG" + newMeterGauge.getMeterid());
		newMeterGauge.setMetertype(MeterType.GAUGE.toString());
		newMeterGauge.setDescription("my meter " + newMeterGauge.getMeterid());

		// Creates Meter Gauge
		maximoApi.create(newMeterGauge);
		logger.info("GAUGE Meter: {}" + newMeterGauge.getMeterid());

		String resultContinuous = maximoApi.retrieve(new Meter(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		Meter newMeterContinuous = new Gson().fromJson(resultContinuous, Meter.class);

		newMeterContinuous.setMetername("MCO" + newMeterContinuous.getMeterid());
		newMeterContinuous.setMetertype(MeterType.CONTINUOUS.toString());
		newMeterContinuous.setDescription("my meter " + newMeterContinuous.getMeterid());
		newMeterContinuous.setReadingtype(ReadingType.DELTA.toString());

		// Creates Meter CONTINUOUS
		maximoApi.create(newMeterContinuous);
		logger.info("CONTINUOUS Meter: {}" + newMeterContinuous.getMeterid());

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");

		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);

		newAsset.setAssetNum(assetNum);
		newAsset.setDescription("Asset for mobile automation test");
		newAsset.setSiteId(SetupData.SITEID);

		List<AssetMeter> meterList = new ArrayList<AssetMeter>();

		AssetMeter assetMeterCharacteristic = new AssetMeter();
		assetMeterCharacteristic.setMetername(newMeterCharacteristic.getMetername());

		AssetMeter assetMeterGauge = new AssetMeter();
		assetMeterGauge.setMetername(newMeterGauge.getMetername());

		AssetMeter assetMeterContinuous = new AssetMeter();
		assetMeterContinuous.setAvgcalcmethod(AverageMethod.ALL.toString());
		assetMeterContinuous.setMetername(newMeterContinuous.getMetername());

		meterList.add(assetMeterCharacteristic);
		meterList.add(assetMeterGauge);
		meterList.add(assetMeterContinuous);
		newAsset.setAssetMeter(meterList);

		maximoApi.create(newAsset);
		logger.info("Asset: {}" + assetNum);

		// Create a location
		logger.info("Creating a location");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location newlocation = new Location();

		newlocation.setLocationId(location);
		newlocation.setDescription("location for mobile automation test");
		newlocation.setSiteId(SetupData.SITEID);

		List<LocationMeter> locationMeterList = new ArrayList<LocationMeter>();

		LocationMeter locationMeterCharacteristic = new LocationMeter();
		locationMeterCharacteristic.setMetername(newMeterCharacteristic.getMetername());

		LocationMeter locationMeterGauge = new LocationMeter();
		locationMeterGauge.setMetername(newMeterGauge.getMetername());

		LocationMeter locationMeterContinuous = new LocationMeter();
		locationMeterContinuous.setAvgcalcmethod(AverageMethod.ALL.toString());
		locationMeterContinuous.setMetername(newMeterContinuous.getMetername());

		locationMeterList.add(locationMeterCharacteristic);
		locationMeterList.add(locationMeterGauge);
		locationMeterList.add(locationMeterContinuous);
		newlocation.setLocationmeter(locationMeterList);

		maximoApi.create(newlocation);
		logger.info("location: {}" + location);

		// Create a workorder
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setWoNum(woNum);
		newWorkOrder.setDescription("WorkeOrder for mobile automation test");
		newWorkOrder.setSiteId(SetupData.SITEID);
		newWorkOrder.setAssetNum(assetNum);
		newWorkOrder.setWorkType(WorkType.PM.toString());
		newWorkOrder.setLocation(location);
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: {}" + woNum);

		// Change WO status to Approved
		logger.info("Changing work order status to INPRG");
		maximoApi.changeStatus(newWorkOrder, WoStatus.INPRG.toString());
		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");
	}
}
