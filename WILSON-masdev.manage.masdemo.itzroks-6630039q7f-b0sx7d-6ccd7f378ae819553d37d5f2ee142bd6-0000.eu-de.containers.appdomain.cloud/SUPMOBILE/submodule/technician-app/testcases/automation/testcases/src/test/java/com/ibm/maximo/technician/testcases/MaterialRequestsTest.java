package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;
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
import com.ibm.maximo.automation.mobile.api.json.Item;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;

import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;

/*GRAPHITE-51054:[TECHMOBILE] Create and view material requests*/
public class MaterialRequestsTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(MaterialRequestsTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, labor, location;
	private String itemNum, itemId;
	private String cardId = "cardtemplate1[0]_chevron";
	private int year = 2030, month = 11, date = 10;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************MaterialRequestsTest*********************************");
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
			itemIdQueryFromDB();

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

	@Test(groups = { "mobile" }, description = "Create and view material requests", timeOut = 360000)
	public void materialRequestTestFromWorkOrderDetailsPage() throws Exception {

		// Open work order details
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		WorkOrderDetailsPage workOrderDetailsPage = new WorkOrderDetailsPage(af);
		// Search the WO
		assertTrue(assignedWorkPage.search(woNum), "Fail : Search Work Order is not displayed");
		// Navigate to work order details page
		assignedWorkPage.openCardDetails(cardId);
		// Wait for start work button enabled
		workOrderDetailsPage.startWorkButtonEnabled();
		// click on planned materials and tools touchpoint
		workOrderDetailsPage.clickMaterialAndToolTouchpoint();
		// Verify text
		assertEquals(workOrderDetailsPage.getCartRequestMaterials(), "Tap the cart to request materials.",
				"Fail :  Verify that text 'Tap the cart to request materials.' is not displayed");
		// click on materials and tools menu
		workOrderDetailsPage.clickMaterialAndToolMenu();
		// click on shopping cart button
		workOrderDetailsPage.clickShoppingCart();
		// verify material request page opens
		assertTrue(workOrderDetailsPage.addMaterialsDisplayed(), "Fail : Material request is not displayed");
		// Add Material
		workOrderDetailsPage.clickAddMaterialIcon();
		// click on Item chevron
		workOrderDetailsPage.clickItemChevron();
		// search itemNum
		workOrderDetailsPage.searchForItemAndSelectItem(itemNum, itemId);
		// save Add Item
		workOrderDetailsPage.clickSaveAddItem();
		assertFalse(workOrderDetailsPage.addMaterialsDisplayed(), "Fail : add Materials is displayed");
		// send button is disable
		assertFalse(workOrderDetailsPage.sendMaterialRequestEnabled(),
				"Fail : send Material is enabled, expecting send Material to be disabled");
		// Priorty
		assertEquals(workOrderDetailsPage.getPriorityMaterialRequestValue(), "1", "Fail : Priority is not set as 1");
		// Drop to
		workOrderDetailsPage.dropToMaterialRequest("Delhi,India");
		assertEquals(workOrderDetailsPage.getDropToMaterialRequestValue(), "Delhi,India",
				"Fail : Drop to is not set as Delhi,India");
		// Enter Required date under Required details of Material request
		workOrderDetailsPage.requiredDateUnderRequiredDetailsOfMaterialRequest(year, month, date);
		// back before saving on Material Request Page
		workOrderDetailsPage.clickBackBreadcrumbIconOnMaterialRequest();
		// verify a confirmation dialog for "Save or discard changes?" with Discard and
		// Save buttons should be displayed.
		assertTrue(workOrderDetailsPage.verifySaveAndDiscardDialog(),
				"Fail : Save and Discard Dialog box is not displayed");
		// click on close icon on dialog box
		workOrderDetailsPage.clickCloseButtonDialog();
		// Send Material Request
		workOrderDetailsPage.sendMaterialRequest();
		// Verify Requested Material Status list
		assertTrue(workOrderDetailsPage.verifyFirstRequestedMaterialStatus(),
				"Fail : Requested Material Status list is not displayed");
		// click on First Chevron of Requested Material Status
		workOrderDetailsPage.firstChevronOfRequestedMaterialStatus();
		// Delete request
		workOrderDetailsPage.deleteRequest();
		// After deleting Requested Material
		assertFalse(workOrderDetailsPage.verifyFirstRequestedMaterialStatus(),
				"Fail : Requested Material Status list is displayed after deleting first Requested Material Status");

	}

	protected void createDefaultObjects() throws Exception {
		logger.info("Creating default objects");

		// Create an asset
		logger.info("Creating an asset");
		assetNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String assetResult = maximoApi.retrieve(new Asset(), "addid=1&internalvalues=1&action=system:new&addschema=1");
		Asset newAsset = new Gson().fromJson(assetResult, Asset.class);
		newAsset.setAssetNum(assetNum);
		newAsset.setDescription("Asset for mobile automation test");
		maximoApi.create(newAsset);
		logger.info("Asset: " + assetNum);

		// Create a work order
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription("WorkOrder for mobile automation test");
		newWorkOrder.setAssetNum(assetNum);

		maximoApi.create(newWorkOrder);
		woNum = newWorkOrder.getWoNum();
		logger.info("Work Order: " + woNum);

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Creating storeroom
		logger.info("Creating an storeroom");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"lean=1&addid=1&action=system:new&ignorecollectionref=1");
		StoreRoom storeRoom = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		storeRoom.setDescription("StoreRoom " + location);
		storeRoom.setLocation(location);

		maximoApi.create(storeRoom);
		logger.info("storeRoom location::" + location);

		// Creating the item
		logger.info("Creating an item");
		itemNum = AbstractAutomationFramework.randomString(5).toUpperCase();
		String itemResult = maximoApi.retrieve(new Item(),
				"lean=1&addid=1&domainmeta=1&internalvalues=1&action=system:new&oslc.select=itemsetid,lottype,issueunit,orderunit,rotating,itemtype");
		Item item = new Gson().fromJson(itemResult, Item.class);
		item.setItemNum(itemNum);
		item.setDescription("item " + itemNum);
		maximoApi.create(item);
		logger.info("ItemNum::" + itemNum);

		// add Item to StoreRoom
		maximoApi.addItemToStoreRoom(itemNum, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "100", SetupData.DFLTBIN, "", "", "0.0", "1.0", "0.0", "0", "0", "0.0", "0.0", "true");
		logger.info("added Item to StoreRoom successfully");

		// item status change and rolldown
		logger.info("Item status change to Active");
		List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus ics = new ItemChangeStatus();
		ics.setStatus(ItemStatus.ACTIVE.toString());
		ics.setRollDown("true");
		arr.add(ics);
		item.setItemChangeStatus(arr);
		maximoApi.update(item);
		logger.info("Item status changed");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("APPR WO");

	}

	protected String itemIdQueryFromDB() {
		logger.info(
				"select itemid from item where itemnum = '" + itemNum + "' and itemsetid= '" + SetupData.ITEMSET + "'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select itemid from item where itemnum = '" + itemNum + "' and itemsetid= '" + SetupData.ITEMSET + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		itemId = resultArray1[0].toString();
		logger.info("itemId>" + itemId);
		return itemId;
	}

}
