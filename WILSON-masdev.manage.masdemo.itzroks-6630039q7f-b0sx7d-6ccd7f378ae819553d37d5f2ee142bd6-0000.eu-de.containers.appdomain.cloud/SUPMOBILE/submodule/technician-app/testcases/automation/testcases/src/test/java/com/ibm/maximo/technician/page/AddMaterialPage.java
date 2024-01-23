package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.TextInputComponent;

public class AddMaterialPage {

	private AbstractAutomationFramework af;
	private String openAddMaterialLookup = "dmn9g";
	private String searchMaterial = "materialLookup_lookup_datalist_search_searchInput";
	private String searchButton = "materialLookup_lookup_datalist_search_searchButton";
	private String rightChevronforSearchMaterial = "dmn9g";
	private String searchResultList = "materialLookup_lookup_datalist__scroller";

	private String saveMaterial = "g8ga8_abake";
	private String materialQuantity = "mz8_2";
	private String taskChevron = "z4x3r";
	private String selectTypeChevron = "dwpwj";
	private String selectTypeReturnChevron = "transactionTypeLookup_lookup_datalist_ISSUETYP|RETURN_selectionCheckBoxIcon_touch";
	private String assetNumber = "zmvp5_fieldValue0";

	private final static Logger logger = LoggerFactory.getLogger(AddMaterialPage.class);

	public AddMaterialPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Click to Add material Item
	 *
	 * @throws Exception
	 */
	public void rightChevronforSearchMaterial() throws Exception {
		af.waitForElementToBePresent(By.id(rightChevronforSearchMaterial), af.DEFAULT_TIMEOUT_MS * 2);
		af.instantiateComponent(ButtonComponent.class, rightChevronforSearchMaterial).click();
	}

	/**
	 * Select a given material
	 * 
	 * @param query
	 * @return
	 * @throws Exception
	 */
	public boolean search(String query) throws Exception {
		af.waitForElementToBePresent(By.id(searchMaterial));
		ButtonComponent searchconButton = af.instantiateComponent(ButtonComponent.class, searchMaterial);
		searchconButton.click();
		logger.info("Search bar opened");

		TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, searchMaterial);
		tic.setText(query);
		logger.info("Search value inputed");
		af.waitForElementToBePresent(By.id(searchMaterial));
		ButtonComponent searchButton2 = af.instantiateComponent(ButtonComponent.class, searchButton);
		searchButton2.click();
		logger.info("Search button clicked");

		af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);

		return af.isElementExists(By.id(searchResultList));
	}

	/**
	 * Click Select Material
	 *
	 * @throws Exception
	 */
	public boolean clickIdentifiedMaterialFromList(String itemId) throws Exception {
		try {
			String locatorId = "materialLookup_lookup_datalist_" + itemId + "_selectionCheckBoxIcon_touch";
			logger.info("locator >" + locatorId);
			af.waitForElementToBePresent(By.id(locatorId)).click();
			logger.info("Material selected:" + itemId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Click Select Material
	 *
	 * @throws Exception
	 */
	public boolean selectTask(String taskId) throws Exception {
		try {
			// click select task chevron
			af.waitForElementToBePresent(By.id(taskChevron)).click();
			logger.info("task locator >" + "toolTaskLookup_lookup_datalist_" + taskId + "_selectionCheckBoxIcon_touch");
			af.waitForElementToBePresent(
					By.id("toolTaskLookup_lookup_datalist_" + taskId + "_selectionCheckBoxIcon_touch")).click();
			logger.info("task selected:" + taskId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Click save Material
	 *
	 * @throws Exception
	 */
	public void clickSaveButton() throws Exception {
		af.waitForElementToBePresent(By.id(saveMaterial), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, saveMaterial).click();
		logger.info("Save button clicked");
	}

	/**
	 * Click Add Material Lookup
	 *
	 * @throws Exception
	 */
	public void openAddMterialLookup() throws Exception {
		af.instantiateComponent(ButtonComponent.class, openAddMaterialLookup).click();
		af.waitForElementToNotBePresent(By.id(openAddMaterialLookup), 5000);
	}

	/**
	 * Input quantity for the material
	 * 
	 * @param quantity
	 * @throws Exception
	 */
	public void setQuantity(String quantity) throws Exception {
		TextInputComponent textComponent_quantityValue = af.instantiateComponent(TextInputComponent.class,
				materialQuantity);
		textComponent_quantityValue.clearField();
		textComponent_quantityValue.setText(quantity);
	}

	/**
	 * Select RETURN type for the material
	 * 
	 * @throws Exception
	 */
	public void selectTypeAsReturn() throws Exception {
		af.instantiateComponent(ButtonComponent.class, selectTypeChevron).click();
		af.waitForElementToBePresent(By.id(selectTypeReturnChevron), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, selectTypeReturnChevron).click();
	}

	/**
	 * Method to get populated Asset Number
	 * 
	 * @return {String} asset number
	 */
	public String getAssetNumber() throws Exception {
		af.waitForElementToBePresent(By.id(assetNumber), af.DEFAULT_TIMEOUT_MS * 5);
		return af.instantiateComponent(LabelComponent.class, assetNumber).getLabel();
	}
}