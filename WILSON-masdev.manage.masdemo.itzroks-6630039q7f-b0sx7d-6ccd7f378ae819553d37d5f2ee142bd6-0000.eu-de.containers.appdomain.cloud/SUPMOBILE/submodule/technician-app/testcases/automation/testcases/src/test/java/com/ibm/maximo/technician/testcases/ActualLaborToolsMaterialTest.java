package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertEquals;

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
import com.ibm.maximo.automation.mobile.api.json.AddItemToStoreroom;
import com.ibm.maximo.automation.mobile.api.json.Asset;
import com.ibm.maximo.automation.mobile.api.json.Item;
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.LabTrans;
import com.ibm.maximo.automation.mobile.api.json.MatUseTrans;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.ToolItem;
import com.ibm.maximo.automation.mobile.api.json.ToolTrans;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.page.ReportWorkPage;
import com.ibm.maximo.technician.page.WorkOrderDetailsPage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.ItemStatus;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;

/*
 * GRAPHITE-51053: View labor, tools and materials
 */

public class ActualLaborToolsMaterialTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(ActualLaborToolsMaterialTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private String labor, location;
	private String itemNum;
	private String woNum;
	private WorkOrder newWorkOrder;

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
		logger.info("********************ActualLaborToolsMaterialTest*********************************");
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

	@Test(groups = { "mobile" }, description = "View Labor, Materials and tools", timeOut = 500000)
	public void actualLaborToolsAndMaterials() throws Exception {

		// Search the work order
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		assignedWorkPage.search(woNum);

		// Navigate to WO details page
		assignedWorkPage.openWorkOrderDetails();

		// Navigate to Report work page
		WorkOrderDetailsPage woDetails = new WorkOrderDetailsPage(af);
		woDetails.clickReportWorkButton();

		// Verify grouped labor name
		ReportWorkPage reportWork = new ReportWorkPage(af);
		logger.info("Grouped Labor name: " + SetupData.LABORNAME);
		assertEquals(SetupData.LABORNAME, reportWork.getLaborName());

		// Verify second labor name
		logger.info("Grouped Labor name: " + SetupData.SECONDLABORNAME);
		assertEquals(SetupData.SECONDLABORNAME, reportWork.getSecondLaborName());

		// Click chevron to expand first labor record
		reportWork.firstLaborChevron("bam2r_items_datalistWrapper");

		// Verify first labor reported hour
		logger.info("First Labor Reported Actual Hour: " + SetupData.ACTUALLABORHOUR);
		assertEquals(SetupData.ACTUALLABORHOUR, reportWork.getActualLaborhours().substring(0, 1));

		// click on chevron to close first labor record
		reportWork.firstLaborChevron("bam2r_items_datalistWrapper");

		// Click on chevron to expand second labor record
		reportWork.secondLaborChevron("bam2r_items_datalistWrapper");

		// Verify second labor reported hour
		logger.info("Second Labor Reported Actual Hour: " + SetupData.ACTUALLABORHOUR);
		assertEquals(SetupData.ACTUALLABORHOUR, reportWork.getActualLaborhours().substring(0, 1));

		// Verify Materials used Name
		logger.info("Material Used Name: " + SetupData.MATERIALNAME);
		assertEquals(SetupData.MATERIALNAME, reportWork.getMaterialName().substring(0, 9));

		// Verify Tools used Name
		logger.info("Tools Used Name: " + SetupData.TOOL_DESCRIPTION);
		assertEquals(SetupData.TOOL_DESCRIPTION, reportWork.getToolsName());
		
		//Click back and clear search data
		reportWork.clickBackChevron();
		woDetails.clickBackChevron();
		assignedWorkPage.clickClearButton();
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

		// Creating a tool
		logger.info("Creating a tool");
		itemNum = AbstractAutomationFramework.randomString(5).toUpperCase();

		String toolItemResult = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem = new Gson().fromJson(toolItemResult, ToolItem.class);
		toolItem.setItemNum(itemNum);
		toolItem.setDescription(SetupData.TOOL_DESCRIPTION);
		maximoApi.create(toolItem);
		logger.info("ToolItem: " + itemNum);

		// item status change and rolldown
		logger.info("Changing Tool Status");
		List<ItemChangeStatus> arr = new ArrayList<>();
		ItemChangeStatus itemChangeStatus = new ItemChangeStatus();
		itemChangeStatus.setStatus(ItemStatus.ACTIVE.toString());
		itemChangeStatus.setRollDown("true");
		arr.add(itemChangeStatus);
		toolItem.setItemChangeStatus(arr);
		maximoApi.update(toolItem);
		logger.info("Tool API status changed");

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

		// item status change and rolldown
		logger.info("Item status change to Active");
		ItemChangeStatus ics = new ItemChangeStatus();
		ics.setStatus(ItemStatus.ACTIVE.toString());
		ics.setRollDown("true");
		arr.add(ics);
		item.setItemChangeStatus(arr);
		maximoApi.update(item);
		logger.info("Item status changed");

		// Add Item to Storeroom
		AddItemToStoreroom addItemToStoreroom = new AddItemToStoreroom();

		addItemToStoreroom.setItemNum(itemNum);
		addItemToStoreroom.setItemSetID(SetupData.ITEMSET);
		addItemToStoreroom.setStoreroom(location);
		addItemToStoreroom.setSiteID(SetupData.SITEID);
		addItemToStoreroom.setTool(false);
		addItemToStoreroom.setIssueUnit(SetupData.ISSUEUNIT);
		addItemToStoreroom.setCurBal(100);
		addItemToStoreroom.setDfltbin(SetupData.DFLTBIN);
		addItemToStoreroom.setCostType("");
		addItemToStoreroom.setLotNum("");
		addItemToStoreroom.setDeliveryTime(0.0);
		addItemToStoreroom.setOrderQty(1.0);
		addItemToStoreroom.setMinLevel(0.0);
		addItemToStoreroom.setReOrder(0);
		addItemToStoreroom.setCcf(0);
		addItemToStoreroom.setStdCost(0.0);
		addItemToStoreroom.setAvgCost(0.0);
		addItemToStoreroom.setSaveNow(true);

		addItemToStoreroom.setLocationUrl(maximoApi.getMaximoServer() + "/oslc/service/location");

		String addAnItemToStoreroom = "addAnItemToStoreroom";

		maximoApi.updateByService(addItemToStoreroom, addAnItemToStoreroom);

		logger.info("added Item to StoreRoom successfully");

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("APPR WO");

		// Adding Tool to Work order
		logger.info("Adding tooltrans");
		ToolTrans tooltrans = new ToolTrans();
		tooltrans.setItemNum(toolItem.getItemNum());
		tooltrans.setToolQty(1);
		tooltrans.setToolRate(1);
		tooltrans.setLineCost(1);
		tooltrans.setGlDebitAcct(SetupData.GLDEBITACCT);
		List<ToolTrans> toolTransArray = new ArrayList<ToolTrans>();
		toolTransArray.add(tooltrans);
		newWorkOrder.setToolTrans(toolTransArray);

		// Adding Labor to Workorder
		logger.info("Adding laborTrans");
		LabTrans labtrans = new LabTrans();
		labtrans.setLaborCode(labor);
		labtrans.setGlDebitAcct(SetupData.GLDEBITACCT);
		labtrans.setRegularHrs(SetupData.ACTUALLABORHOUR);
		LabTrans seclabtrans = new LabTrans();
		seclabtrans.setLaborCode(SetupData.SECONDLABOR);
		seclabtrans.setGlDebitAcct(SetupData.GLDEBITACCT);
		seclabtrans.setRegularHrs(SetupData.ACTUALLABORHOUR);
		List<LabTrans> labTransArray = new ArrayList<LabTrans>();
		labTransArray.add(labtrans);
		labTransArray.add(seclabtrans);
		newWorkOrder.setLabTrans(labTransArray);

		// Adding Material to Workorder
		logger.info("Adding matusetrans");
		MatUseTrans matusetrans = new MatUseTrans();
		matusetrans.setItemNum(item.getItemNum());
		matusetrans.setStoreLoc(location);
		matusetrans.setPositiveQuantity(1);
		matusetrans.setUnitCost(1);
		matusetrans.setGlDebitAcct(SetupData.GLDEBITACCT);
		List<MatUseTrans> MatUseTransArray = new ArrayList<MatUseTrans>();
		MatUseTransArray.add(matusetrans);
		newWorkOrder.setMatUseTrans(MatUseTransArray);
		logger.info("Work Order Update Started");
		maximoApi.update(newWorkOrder);

	}

}
