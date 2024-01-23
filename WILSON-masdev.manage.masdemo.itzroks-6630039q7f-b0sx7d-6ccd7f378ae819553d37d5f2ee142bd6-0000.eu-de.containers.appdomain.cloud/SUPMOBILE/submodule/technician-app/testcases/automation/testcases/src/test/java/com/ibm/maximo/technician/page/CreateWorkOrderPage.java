package com.ibm.maximo.technician.page;


import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.DropDownComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.NumberInputComponent;
import com.ibm.maximo.components.RichTextEditorComponent;
import com.ibm.maximo.components.SearchComponent;
import com.ibm.maximo.components.TextAreaComponent;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.technician.setupdata.SetupData.*;
import com.ibm.maximo.technician.testcases.CreateWorkOrderTest;

public class CreateWorkOrderPage {

	private final static Logger logger = LoggerFactory.getLogger(CreateWorkOrderTest.class);
	private String navigatorClickButton = "NavigatorMenuButton";
	private String addRouteLocator = "navigator_addRoute";
	private String createWOLocator = "navigator_addRoute_menu_menu_actionType_0";
	private String addDescriptionLocator = "j3d2k";
	private String enterLongDescription = "a_x43";
	private String addLongDescriptionLocator = "ggvjj";
	private String saveDiscardDialogSaveButton = "saveDiscardDialogCreatePage_button_group_saveDiscardDialogCreatePage_primary_button";
	private String longDescriptionCloseButton = "longdsEditDialog_close_button";
	private String priorityLocator = "j8265";
	private String workOrderCreationButtonClick = "kngx7-pageheader_buttongroup_mjbgg";
	private String scheduledDateStartLocator = "va287_date";
	private String scheduleStartTimeLocator = "va287_time";
	private String scheduleDateFinishLocator = "j288g_date";
	private String scheduleTimeFinishLocator = "j288g_time";
	private String estDurLocator = "vp7qm";
	private String estDurHrsLocator = "vp7qm_hour";
	private String estDurMinsLocator = "vp7qm_minute";
	private String workType = "k62p3";
	private String threeDotClickForAsset = "dxkr5_actionbuttongroup_overflow";
	private String searchButtonLocator = "openAssetLookup_lookup_datalist_search_searchButton";
	
	private String threeDotClickForLocation = "awegq_actionbuttongroup_overflow";
	private String searchIconClickAsset = "dxkr5_actionbuttongroup_overflowMenu_dxkr5_actionbuttongroup_a9367_icon";
	private String searchIconClickLocation = "awegq_actionbuttongroup_overflowMenu_awegq_actionbuttongroup_wxry5_icon";
	private String sendTextinSearchForAsset = "openAssetLookup_lookup_datalist_search_searchInput";
	private String sendTextinSearchForLocation = "openLocationLookup_lookup_datalist_search";
	private String assetOfFirstElementInList = "nyb3q";
	private String selectTickLocator = "kngx7-pageheader_buttongroup_mjbgg_icon";
	private String assetTextWOPage = "de6m3";
	private String locationTextWOPage = "yzqaa_value";
	private String dropdownSelect = "rzvz4";
	private String modalHeaderLocator = "MXlookup_modal_Page_Header_icon";

	private AbstractAutomationFramework af;

	public CreateWorkOrderPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Click on Navigator
	 * 
	 * @throws Exception
	 */
	public void navigatorClick() throws Exception {
		af.instantiateComponent(ButtonComponent.class, navigatorClickButton).clickJs();
		af.waitForElementToNotBePresent(By.id(navigatorClickButton), 3000);
	}

	/**
	 * Method for click on plus icon on Navigator
	 * 
	 * @throws Exception
	 */
	public void getplusiconClick() throws Exception {
		af.instantiateComponent(ButtonComponent.class, addRouteLocator).click();
	}

	/**
	 * Select Create WorkOrder
	 * 
	 * @throws Exception
	 */
	public void selectCreateWO() throws Exception {
		af.instantiateComponent(ButtonComponent.class, createWOLocator).click();
	}

	/**
	 * Enter description of work order
	 * 
	 * @param descriptionStr
	 * @throws Exception
	 */
	public void insertDescriptionOfWorkOrder(String descriptionStr) throws Exception {
		af.waitForElementToBePresent(By.id(addDescriptionLocator), af.DEFAULT_TIMEOUT_MS * 3);
		TextInputComponent textArea = af.instantiateComponent(TextInputComponent.class, addDescriptionLocator);
		textArea.setText(descriptionStr);
	}

	/**
	 * Enter Long Description
	 * 
	 * @param longDescriptionStr
	 * @throws Exception
	 */
	public void enterLongDescription(String longDescriptionStr) throws Exception {
		af.instantiateComponent(ButtonComponent.class, addLongDescriptionLocator).click();
		RichTextEditorComponent richTextEditor = af.instantiateComponent(RichTextEditorComponent.class,
				enterLongDescription);
		richTextEditor.type(longDescriptionStr);
		af.instantiateComponent(ButtonComponent.class, longDescriptionCloseButton).click();
		af.instantiateComponent(ButtonComponent.class, saveDiscardDialogSaveButton).click();
	}

	/**
	 * Enter priority field
	 * 
	 * @param priority
	 * @throws Exception
	 */
	public void priorityEnter(String priority) throws Exception {
		logger.info("enter priority");
		NumberInputComponent numberInputComponent = af.instantiateComponent(NumberInputComponent.class,
				priorityLocator);
		numberInputComponent.typeInNumberInput(priority);
	}

	/**
	 * Enter start date and time
	 * 
	 * @param year
	 * @param month
	 * @param date
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void scheduledStartDateAndTime(int year, int month, int date,int hrs, int min) throws Exception {
		af.waitForElementToBePresent(By.id(scheduledDateStartLocator), 2);
		((MobileAutomationFramework) af).setDate(By.id(scheduledDateStartLocator), year, month, date);
		af.waitForElementToBePresent(By.id(scheduleStartTimeLocator), 2);
		((MobileAutomationFramework) af).setTime(By.id(scheduleStartTimeLocator), hrs, min, true);
	}

	/**
	 * Enter finish date and time
	 * 
	 * @param year
	 * @param month
	 * @param date
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void scheduledFinishDateAndTime(int year, int month, int date, int hrs, int min) throws Exception {
		af.waitForElementToBePresent(By.id(scheduleDateFinishLocator), 2);
		((MobileAutomationFramework) af).setDate(By.id(scheduleDateFinishLocator), year, month, date);
		af.waitForElementToBePresent(By.id(scheduleTimeFinishLocator), 2);
		((MobileAutomationFramework) af).setTime(By.id(scheduleTimeFinishLocator), hrs, min, true);
	}

		/**
	 * Enter Estimated duration hrs
	 * @param hrs 
     * @throws Exception
     */
	public void estDurHrsLocator(String hrs) throws Exception {
		logger.info("enter estimated hours");
		af.waitForElementToBePresent(By.id(estDurHrsLocator), 2);
		NumberInputComponent durationInputBox = af.instantiateComponent(NumberInputComponent.class, estDurHrsLocator);
		durationInputBox.typeAndSendDurationHourKey(hrs, Keys.TAB);
	}

	/**
	 * Enter Estimated duration mins
	 * @param min 
     * @throws Exception
     */
	public void estDurMinsLocator(String min) throws Exception {
		logger.info("enter estimated minutes");
		af.waitForElementToBePresent(By.id(estDurMinsLocator), 2);
		NumberInputComponent durationInputBox = af.instantiateComponent(NumberInputComponent.class, estDurMinsLocator);
		durationInputBox.typeAndSendDurationMinuteKey(min, Keys.ENTER);
	}

	/**
	 * Select work type
	 * 
	 * @param query
	 * @throws Exception
	 */
	public void changeWorkType(WorkType query) throws Exception {
		af.instantiateComponent(ButtonComponent.class, workType).click();
		String locator = "workTyLookup_lookup_datalist_" + query + "_selectionCheckBoxIcon_touch";
		
		af.instantiateComponent(ButtonComponent.class, locator).click();
	}

	/**
	 * Click on Save Work order
	 * 
	 * @throws Exception
	 */
	public void saveWO() throws Exception {
		logger.info("click started");
		af.instantiateComponent(ButtonComponent.class, selectTickLocator).click();
	}

	/**
	 * Search for asset and select the expected one
	 * 
	 * @param query
	 * @return
	 * @throws Exception
	 */
	public boolean searchForAssets(String query) throws Exception {

		af.waitForElementToBePresent(By.id(threeDotClickForAsset), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, threeDotClickForAsset).click();
		af.instantiateComponent(ButtonComponent.class, searchIconClickAsset).click();
		try {
			if (af.isElementExists(By.id(sendTextinSearchForAsset))) {
				// Wait
				af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);
				if (af.isElementExists(By.id(sendTextinSearchForAsset))) {

					// Set text in the input field
					logger.info("Set text in the input field");
					af.waitForElementToBePresent(By.id(sendTextinSearchForAsset));
					TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, sendTextinSearchForAsset);
					tic.setText(query);

					// Click on the search button
					logger.info("Click on the search button");
					af.waitForElementToBePresent(By.id(searchButtonLocator));
					ButtonComponent searchActionButton = af.instantiateComponent(ButtonComponent.class,
							searchButtonLocator);
					searchActionButton.click();

					// Wait
					af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);

				}

			}
			af.instantiateComponent(ButtonComponent.class, assetOfFirstElementInList).click();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Search for Location
	 * 
	 * @param query
	 * @return
	 * @throws Exception
	 */
	public boolean searchForLocation(String query) throws Exception {
		af.waitForElementToBePresent(By.id(threeDotClickForLocation), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, threeDotClickForLocation).click();
		af.instantiateComponent(ButtonComponent.class, searchIconClickLocation).click();
		try {
			SearchComponent searchField = af.instantiateComponent(SearchComponent.class, sendTextinSearchForLocation);
			searchField.typeAndSendEnterKey(query);
			af.waitForElementToBePresent(By.id(modalHeaderLocator)).click();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Save Work Order
	 * 
	 * @throws Exception
	 */
	public void clickWorkOrderCreate() throws Exception {
		af.instantiateComponent(ButtonComponent.class, workOrderCreationButtonClick).click();
	}

	/**
	 * Method to get text on WO page for asset
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAssetTextWOPage() throws Exception {
		return af.instantiateComponent(FieldComponent.class, assetTextWOPage).getValue();
	}

	/**
	 * Method to get text on WO page for location
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getLocationTextWOPage() throws Exception {
		return af.instantiateComponent(FieldComponent.class, locationTextWOPage).getValue();
	}

	/**
	 * Click on Assigned work native dropdown
	 * 
	 * @param index
	 * @throws Exception
	 */
	public void openNativeDropdown(int index) throws Exception {
		af.waitForElementToBePresent(By.id(dropdownSelect), 2000);
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class, dropdownSelect);
		dropDownComponent.selectItemByIndex(index);
	}

	/**
	 * Click on Assigned work native dropdown
	 *
	 * @param text
	 * @throws Exception
	 */
	public void openNativeDropdown(String text) throws Exception {
		af.waitForElementToBePresent(By.id(dropdownSelect), 2000);
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class, dropdownSelect);
		dropDownComponent.selectItemByDescription(text);
	}

}
