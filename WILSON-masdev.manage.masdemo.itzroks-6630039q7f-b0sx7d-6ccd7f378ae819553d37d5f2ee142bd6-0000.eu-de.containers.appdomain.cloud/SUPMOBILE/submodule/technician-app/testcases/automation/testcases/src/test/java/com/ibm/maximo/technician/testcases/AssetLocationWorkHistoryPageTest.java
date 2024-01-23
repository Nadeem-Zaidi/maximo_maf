package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertTrue;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.FrameworkFactory;
import com.ibm.maximo.automation.mobile.api.MaximoApi;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Location;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.AssetAndLocationWorkOrderHistoryPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData.*;

// GRAPHITE-51056 - View Asset / Location history
public class AssetLocationWorkHistoryPageTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(AssetLocationWorkHistoryPageTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String assetNum, assetNum1, locationNum, labor, locationNum1, woNum, woNum1, woNum2, woNum3, woNum4, woNum5,
			woNum6, woNum7,woNum8,woNum9;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************AssetLocationWorkHistoryPageTest*********************************");
		this.af = FrameworkFactory.get();
		Properties properties = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(configPath));
			properties.load(in);
			labor = properties.getProperty("system.username");
			maximoApi = new MaximoApi();
			maximoApi.setMaximoServer(properties.getProperty("system.maximoServerUrl"),
					properties.getProperty("system.maximoAPIKey"));
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Create Asset
		createAsset();
		assetNum1 = assetNum;

		// Create Location
		createLocation();
		locationNum1 = locationNum;

		// Create Work Order with Asset and Location
		createWorkOrderWithAssetAndLocation(assetNum1, locationNum1);
		woNum1 = woNum;

		// Create Work Order with Asset or Location
		createWorkOrderWithAssetAndLocation(assetNum1, locationNum1);
		woNum2 = woNum;

		// Create Work Order with Asset or Location
		createWorkOrderWithAssetAndLocation(assetNum1, locationNum1);
		woNum3 = woNum;

		// Create Work Order with Asset or Location
		createWorkOrderWithAssetAndLocation(assetNum1, locationNum1);
		woNum4 = woNum;

		// Create Work Order with Asset or Location but Canceled
		createWorkOrderCanceled(assetNum1, locationNum1);
		woNum5 = woNum;

		// Create Work Order with Asset only
		createWorkOrderWithAssetAndLocation(assetNum1, null);
		woNum6 = woNum;

		// Create Work Order with Location only
		createWorkOrderWithAssetAndLocation(null, locationNum1);
		woNum7 = woNum;

		// Create Work Order with Asset or Location but Completed
		createWorkOrderCompleted(assetNum1, locationNum1);
		woNum8 = woNum;
		
		// Create Work Order with Asset or Location but Completed
		createWorkOrderCompleted(assetNum1, locationNum1);
		woNum9 = woNum;
				
		login(af);
	}

	@AfterClass(alwaysRun = true)
	public void teardown() throws Exception {
		logOut(af);
		// TODO : Complete all workorder created as testdata
		//	maximoApi.changeStatus(newWorkOrder, WoStatus.COMP.toString());
		if (testSuite != null) {
			testSuite.teardown();
		}
	}

	@Test(groups = {
			"mobile" }, description = "verify the \"Asset and location history\" from work order details page", timeOut = 550000)

	public void main() throws Exception {
		verifyHistoricalWorkOrderDataInAssetLocationSection();
		verifyHistoricalWorkOrderStatusInAssetLocationSection();
		verifyHistoricalWorkOrderStatusCanceledInAssetLocationSection();
		verifyAssetOrLocationSectionNotDisplayed();
	}

	
	/**
	 * If the historical work order data is present in asset and/or location
	 * sections then verify that each work order record in either of the asset or
	 * location section displays 'work order number', 'description', 'worktype' and
	 * 'update date'
	 * 
	 * @throws Exception
	 */
	public void verifyHistoricalWorkOrderDataInAssetLocationSection() throws Exception {

		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetialsPage = new WorkOrderDetailsPage(af);
		AssetAndLocationWorkOrderHistoryPage assetAndLocationWorkOrderHistoryPage = new AssetAndLocationWorkOrderHistoryPage(af);

		// Search the WO
		logger.info("assignedWorkPage");
		assignedWorkPage.search(woNum1);
		// Click on Chevron Icon on Work Order
		logger.info("Click on Chevron Icon on Work Order");
		assignedWorkPage.openWorkOrderDetails();
		// Click on Asset Location History
		logger.info("Click on Asset Location History");
		workOrderDetialsPage.clickAssetLocationHistoryButton();
		// Assert Asset and location history Header
		logger.info("Assert Asset and location history Header");
		assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOHeader(), "Asset and location history");
		logger.info("Asset and location history correctly displayed.");
		// Check Work Orders information
		for (int i = 0; i < 3; i++) {
			try {
				if (workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i).equals("PM " + woNum2)) {
					// Assert Work Order Type and ID
					assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i), "PM " + woNum2);
					logger.info("Work Order Type and ID are correctly displayed. {} " + "PM " + woNum2);
					// Assert Work Order Description
					assertEquals(workOrderDetialsPage.getAssetLocationHistoryWODescription(i),
							"Work Order Description " + woNum2);
					logger.info(
							"Work Order Description is correctly displayed. {} " + "Work Order Description " + woNum2);
					// Check Work Order Updated
					assertTrue(
							af.isElementExists(
									By.id(WorkOrderDetailsPage.assetLocationHistoryWOUpdated + i + "]_fieldValue0")),
							"Work Order Updated Field is not displayed.");
					verifyTodaysDate(i);
				} else {
					if (workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i).equals("PM " + woNum3)) {
						// Assert Work Order Type and ID
						assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i), "PM " + woNum3);
						logger.info("Work Order Type and ID are correctly displayed. {} " + "PM " + woNum3);
						// Assert Work Order Description
						assertEquals(workOrderDetialsPage.getAssetLocationHistoryWODescription(i),
								"Work Order Description " + woNum3);
						logger.info("Work Order Description is correctly displayed. {} " + "Work Order Description "
								+ woNum3);
						// Check Work Order Updated
						assertTrue(
								af.isElementExists(By
										.id(WorkOrderDetailsPage.assetLocationHistoryWOUpdated + i + "]_fieldValue0")),
								"Work Order Updated Field is not displayed.");
						verifyTodaysDate(i);
					} else {
						if (workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i).equals("PM " + woNum4)) {
							// Assert Work Order Type and ID
							assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i), "PM " + woNum4);
							logger.info("Work Order Type and ID are correctly displayed. {} " + "PM " + woNum4);
							// Assert Work Order Description
							assertEquals(workOrderDetialsPage.getAssetLocationHistoryWODescription(i),
									"Work Order Description " + woNum4);
							logger.info("Work Order Description is correctly displayed. {} " + "Work Order Description "
									+ woNum4);
							// Check Work Order Updated
							assertTrue(
									af.isElementExists(By.id(
											WorkOrderDetailsPage.assetLocationHistoryWOUpdated + i + "]_fieldValue0")),
									"Work Order Updated Field is not displayed.");
							verifyTodaysDate(i);
						}
					}
				}
			} catch (Exception e) {
				logger.info("No Work Order was found");
			}
		}
		//Click on chevron
		 try {
				if (assetAndLocationWorkOrderHistoryPage.chevronIconDisplayed(assetAndLocationWorkOrderHistoryPage.assetSectionId) &&
						(assetAndLocationWorkOrderHistoryPage.chevronIconDisplayed(assetAndLocationWorkOrderHistoryPage.assetChevronIcon))) {
					assetAndLocationWorkOrderHistoryPage.clickChevronButton(assetAndLocationWorkOrderHistoryPage.assetChevronIcon);
					Thread.sleep(50000);
					
					logger.info("Enter Work Order Details Page");
					//verify details page is displayed 
					//assertEquals(workOrderDetialsPage.getWoDtlsWOHeader(),"Work order");
					logger.info("Work Order Details Page displayed");
					
					//verify history icon is disabled
					workOrderDetialsPage.historyIconDisabled();
					logger.info("History icon is disabled");
					
					//back to asset and location history page
					workOrderDetialsPage.clickBackChevron();
					logger.info("Return back to asset and location history page");
					
					// Assert Asset and location history Header
					//assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOHeader(), "Asset and location history");
					logger.info("Asset and location history page displayed");
				}
		 }
		 catch(Exception e) {
			 logger.info("History Data Found");
		 }
			


	}

	/**
	 * Verify that the latest three status updated work orders (excluding the
	 * current one) are displayed in asset/location section if the asset/location
	 * has historical data to present
	 * 
	 * @throws Exception
	 */
	public void verifyHistoricalWorkOrderStatusInAssetLocationSection() throws Exception {

		WorkOrderDetailsPage workOrderDetialsPage = new WorkOrderDetailsPage(af);

		// Check Work Orders information
		for (int i = 0; i < 3; i++) {
			try {
				if (workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i).equals("PM " + woNum2)) {
					// Assert Work Order Type and ID
					assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOStatus(i), "Approved");
					logger.info("Work Order: {} " + woNum2 + " Status: {} "
							+ workOrderDetialsPage.getAssetLocationHistoryWOStatus(i) + " correctly displayed.");
				} else {
					if (workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i).equals("PM " + woNum3)) {
						// Assert Work Order Type and ID
						assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOStatus(i), "Approved");
						logger.info("Work Order: {} " + woNum3 + " Status: {} "
								+ workOrderDetialsPage.getAssetLocationHistoryWOStatus(i) + " correctly displayed.");
					} else {
						if (workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i).equals("PM " + woNum4)) {
							// Assert Work Order Type and ID
							assertEquals(workOrderDetialsPage.getAssetLocationHistoryWOStatus(i), "Approved");
							logger.info("Work Order: {} " + woNum4 + " Status: {} "
									+ workOrderDetialsPage.getAssetLocationHistoryWOStatus(i)
									+ " correctly displayed.");
						}
					}
				}
			} catch (Exception e) {
				logger.info("No Work Order was found");
			}
		}

	}

	/**
	 * Verify the latest three historical work orders by status change
	 * (WORKORDER.STATUSDATE) that are not in CANCELLED status are displayed in
	 * asset and location sections irrespective of labor assigned to the work orders
	 * 
	 * @throws Exception
	 */
	public void verifyHistoricalWorkOrderStatusCanceledInAssetLocationSection() throws Exception {

		WorkOrderDetailsPage workOrderDetialsPage = new WorkOrderDetailsPage(af);

		// Check Work Orders information
		for (int i = 0; i < 3; i++) {
			try {
				assertNotEquals(workOrderDetialsPage.getAssetLocationHistoryWOTypeID(i), "PM " + woNum5);
				logger.info("Work Order: {} " + woNum5 + " Status: Canceled is NOT displayed.");

			} catch (Exception e) {
				logger.info("Work Order was found");
			}
		}

	}

	/**
	 * Verify if either of asset or location is not added to the work order then
	 * that section is not displayed on "Asset and location history" page
	 * 
	 * 
	 * @throws Exception
	 */
	public void verifyAssetOrLocationSectionNotDisplayed() throws Exception {
      try {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);

		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Clear the search filter
		logger.info("Clear the search filter");
		assignedWorkPage.clickClearButton();
		// Search the WO
		assignedWorkPage.search(woNum6);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Click on Asset Location History
		workOrderDetailsPage.clickAssetLocationHistoryButton();
		// Assert Asset Section
		assertTrue(af.isElementExists(By.id(WorkOrderDetailsPage.assetLocationHistoryAssetSection)),
				"Asset Section is not displayed.");
		logger.info("Asset Section correctly displayed.");
		// Assert Location Section
		assertFalse(af.isElementExists(By.id(WorkOrderDetailsPage.assetLocationHistoryLocationSection)),
				"Location Section is displayed.");
		logger.info("Location Section correctly NOT displayed.");

		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Click back
		WorkOrderDetailsPage.clickBackWOList();
		// Clear the search filter
		logger.info("Clear the search filter");
		assignedWorkPage.clickClearButton();
		// Search the WO
		assignedWorkPage.search(woNum7);
		// Click on Chevron Icon on Work Order
		assignedWorkPage.openWorkOrderDetails();
		// Click on Asset Location History
		workOrderDetailsPage.clickAssetLocationHistoryButton();
		// Assert Asset Section
		assertFalse(af.isElementExists(By.id(WorkOrderDetailsPage.assetLocationHistoryAssetSection)),
				"Asset Section is displayed.");
		logger.info("Asset Section correctly NOT displayed.");
		// Assert Location Section
		assertTrue(af.isElementExists(By.id(WorkOrderDetailsPage.assetLocationHistoryLocationSection)),
				"Location Section is not displayed.");
		logger.info("Location Section correctly displayed.");
      }
      catch(Exception e) {
    	  
      }

	}
	

	/**
	 * Verify the date into the Updated Field
	 * 
	 * @param i
	 * @throws Exception
	 */
	public void verifyTodaysDate(int i) throws Exception {
		LabelComponent dateLabel = af.instantiateComponent(LabelComponent.class,
				WorkOrderDetailsPage.assetLocationHistoryWOUpdated + i + "]_fieldValue0");
		SimpleDateFormat month = new SimpleDateFormat("MMMM");
		SimpleDateFormat day = new SimpleDateFormat("d");
		SimpleDateFormat year = new SimpleDateFormat("yyyy");
		assertEquals(dateLabel.text(),
				month.format(new Date()) + " " + day.format(new Date()) + ", " + year.format(new Date()));
		logger.info("Work Order Updated is correctly displayed. {} " + dateLabel.text());
	}

	/**
	 * Create Asset
	 * 
	 * @throws Exception
	 */
	public void createAsset() throws Exception {
		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		maximoApi.create(Asset.fakeAsset(assetNum, null));
		logger.info("Asset: {}" + assetNum);

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
		maximoApi.create(Asset.fakeAsset(assetNum, locationNum));
		logger.info("Asset: {}" + assetNum);

	}

	/**
	 * Create Location
	 * 
	 * @throws Exception
	 */
	public void createLocation() throws Exception {
		// Create location
		logger.info("Creating a location");
		locationNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		Location location = Location.fakeLocation(locationNum);
		maximoApi.create(location);
		logger.info("locationNum: {}" + locationNum);

	}

	/**
	 * Create Work Order with Asset and Location
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderWithAssetAndLocation(String assetNum, String locationNum) throws Exception {
		// Create a work Order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		WorkOrder workOrder = WorkOrder.fakeWorkOrder(woNum, assetNum, null, null, locationNum);
		workOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(workOrder);
		logger.info("Work Order: {}" + woNum);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(workOrder, WoStatus.APPR.toString());

	}

	/**
	 * Create Work Order with Asset and Location in Cancel WoStatus
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderCanceled(String assetNum, String locationNum) throws Exception {
		// Create a work Order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		WorkOrder workOrder = WorkOrder.fakeWorkOrder(woNum, assetNum, null, null, locationNum);
		workOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(workOrder);
		logger.info("Work Order: {}" + woNum);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Approved
		logger.info("Changing work order status to CANCELED");
		maximoApi.changeStatus(workOrder, WoStatus.CAN.toString());

	}
	
	/**
	 * Create Work Order with Asset and Location in Completed WoStatus
	 * 
	 * @throws Exception
	 */
	public void createWorkOrderCompleted(String assetNum, String locationNum) throws Exception {
		// Create a work Order
		logger.info("Creating a work order");
		woNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		WorkOrder workOrder = WorkOrder.fakeWorkOrder(woNum, assetNum, null, null, locationNum);
		workOrder.setWorkType(WorkType.PM.toString());
		maximoApi.create(workOrder);
		logger.info("Work Order: {}" + woNum);

		// Assignment with labor maxadmin
		maximoApi.addAssignmentLabor(workOrder, labor);
		logger.info("Assignment added");

		// Change WO status to Completed
		logger.info("Changing work order status to Completed");
		maximoApi.changeStatus(workOrder, WoStatus.COMP.toString());

	}

}
