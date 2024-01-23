package com.ibm.maximo.technician.testcases;

import static org.testng.Assert.assertTrue;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;

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
import com.ibm.maximo.automation.mobile.api.json.ItemChangeStatus;
import com.ibm.maximo.automation.mobile.api.json.StoreRoom;
import com.ibm.maximo.automation.mobile.api.json.ToolItem;
import com.ibm.maximo.automation.mobile.api.json.WorkOrder;
import com.ibm.maximo.automation.mobile.api.json.WpTool;
import com.ibm.maximo.automation.mobile.common.AppSwitcher;
import com.ibm.maximo.automation.mobile.common.AppSwitcher.App;
import com.ibm.maximo.components.DataListComponent;
import com.ibm.maximo.components.DataListItemComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.page.MaterialsAndToolsPage;
import com.ibm.maximo.technician.page.MySchedulePage;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.*;

/*
 * GRAPHITE-51067: Planned Material and Tools
 */
public class PlannedToolsTest extends TechnicianTest {
	private final Logger logger = LoggerFactory.getLogger(AssetLocationTest.class);
	private AbstractAutomationFramework af;
	private TestSuite testSuite;
	private MaximoApi maximoApi;
	private WorkOrder newWorkOrder;
	private String woNum, labor, itemnum, location;
	private String toolsList = "r6r25_items_datalistWrapper";

	@BeforeClass(alwaysRun = true)
	@Parameters({ "configPath" })
	public void setup(String configPath) throws Exception {
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

	@Test(groups = { "mobile" }, description = "Verify that Eli can select or deselect all tools", timeOut = 800000)
	public void selectDeselectTools() throws Exception {
		MySchedulePage assignedWorkPage = new MySchedulePage(af);
		MaterialsAndToolsPage materialsAndTools = new MaterialsAndToolsPage(af);

		assignedWorkPage.checkForUpdateButton();
		assignedWorkPage.getMaterialsAndToolsClick();
		assertEquals("Tools", materialsAndTools.toolsText());
		materialsAndTools.selectTools();
	}

	@Test(groups = {
			"mobile" }, description = "Verify that associated storeroom name in planned tools should be shown in tools section under Materials and Tools", timeOut = 500000)
	public void storeRoomVisibility() throws Exception {
		// method to verify created store-room number is visible under Materials and tools

		methodforStoreRoom(location);
		assertEquals("StoreRoom " + location, methodforStoreRoom(location));
	}

	/**
	 * Method to create work order and asset
	 * 
	 * @throws Exception
	 */
	protected void createDefaultObjects() throws Exception {

		logger.info("Creating default objects");

		// Create a work order
		logger.info("Creating a work order");
		String workOrderResult = maximoApi.retrieve(new WorkOrder(),
				"addid=1&internalvalues=1&action=system:new&addschema=1");
		newWorkOrder = new Gson().fromJson(workOrderResult, WorkOrder.class);
		newWorkOrder.setDescription("WorkOrder for mobile automation test");
		maximoApi.create(newWorkOrder);
		logger.info("Work Order: " + newWorkOrder.getWoNum());

		// Assign the labor
		maximoApi.addAssignmentLabor(newWorkOrder, labor);
		logger.info("Assignment added");

		// Creating a tool
		logger.info("Creating a tool");
		itemnum = AbstractAutomationFramework.randomString(5).toUpperCase();

		String toolItemResult = maximoApi.retrieve(new ToolItem(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,rotating,lottype,itemtype,status,itemid&addschema=1");
		ToolItem toolItem = new Gson().fromJson(toolItemResult, ToolItem.class);
		toolItem.setItemNum(itemnum);
		toolItem.setDescription(SetupData.TOOL_DESCRIPTION);
		maximoApi.create(toolItem);
		logger.info("ToolItem: " + itemnum);

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
		logger.info("Creating a store room");
		location = AbstractAutomationFramework.randomString(5).toUpperCase();
		String storeRoomResult = maximoApi.retrieve(new StoreRoom(),
				"addid=1&internalvalues=1&action=system:new&oslc.select=itemnum,siteid,description,itemsetid,type,itemtype,status,itemid&addschema=1");
		StoreRoom storeRoom = new Gson().fromJson(storeRoomResult, StoreRoom.class);
		storeRoom.setDescription("StoreRoom " + location);
		storeRoom.setLocation(location);
		maximoApi.create(storeRoom);
		logger.info("storeRoom location::" + location);

		// Add Tool to StoreRoom
		maximoApi.addItemToStoreRoom(itemnum, SetupData.ITEMSET, location, SetupData.SITEID, "false",
				SetupData.ISSUEUNIT, "100", SetupData.DFLTBIN, "", "", "0.0", "1.0", "0.0", "0", "0", "0.0", "0.0",
				"true");
		logger.info("added Item to StoreRoom successfully");

		// Adding Tool to Workorder
		logger.info("Adding wptool");
		WpTool wptool = new WpTool();
		wptool.setItemNum(toolItem.getItemNum());
		wptool.setItemQty(1);
		wptool.setRate(1);
		wptool.setReservereq(true);
		List<WpTool> wpToolArray = new ArrayList<WpTool>();
		wpToolArray.add(wptool);
		newWorkOrder.setWpTool(wpToolArray);
		maximoApi.update(newWorkOrder);

		// Change WO status to Approved
		logger.info("Changing work order status to APPR");
		maximoApi.changeStatus(newWorkOrder, WoStatus.APPR.toString());
		logger.info("WO Status Changed");
	}

	/**
	 * Method to verify storeroom exists
	 * 
	 * @param location
	 * @return
	 * @throws Exception
	 */
	public String methodforStoreRoom(String location) throws Exception {
		DataListComponent list = af.instantiateComponent(DataListComponent.class, toolsList);
		List<DataListItemComponent> tools = list.getChildren();
		int i = tools.size();
		logger.info("size " + tools.size());
		for (int j = 0; j < i; j++) {
			if(tools.get(j).getText().contains(itemnum)) {
				LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, "ekdq8[" + j + "]");
				logger.info("Label " + labelComponent.getLabel());
				return labelComponent.getLabel();

			}
		}
		return null;
	}
}
