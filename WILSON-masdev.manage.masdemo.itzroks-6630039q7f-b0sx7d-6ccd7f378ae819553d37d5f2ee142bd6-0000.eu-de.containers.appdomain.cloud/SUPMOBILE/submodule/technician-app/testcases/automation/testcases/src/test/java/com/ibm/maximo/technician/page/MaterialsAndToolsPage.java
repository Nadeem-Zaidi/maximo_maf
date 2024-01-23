package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.LabelComponent;

public class MaterialsAndToolsPage {

	private final static Logger logger = LoggerFactory.getLogger(MaterialsAndToolsPage.class);
	public String toolsHeader = "r6r25_items_label1";
	private String toolsCheckbox = "r6r25_items_TouchSelectAll_r6r25_items_button";
	private String getMaterilAndTools = "p26j8";
	private String toolstextLocator = "r6r25_items_label1";
	private String getReservedItems = "e83zj_menu_menu_d5d44";
	private String checkbxGetReservedItems = ".mx--datalist-select-btn button";
	private String btnGetSelected = "q7r2e-pageheader_buttongroup_rwgaq";
	private String getReservedItemsAdded = "d76q3[0]_fieldValue0";
	private String txtMaterials="qqjw9[0]";

	private AbstractAutomationFramework af;

	public MaterialsAndToolsPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Method to select/deselect tools
	 * 
	 * @throws Exception
	 */
	public void selectTools() throws Exception {
		af.waitForElementToBePresent(By.id(toolsCheckbox), 3000);
		af.instantiateComponent(ButtonComponent.class, toolsCheckbox).click();
	}

	/**
	 * Method to verify text
	 * 
	 * @return Tools text
	 * @throws Exception
	 */
	public String toolsText() throws Exception {
		af.waitForElementToBePresent(By.id(toolstextLocator), af.DEFAULT_TIMEOUT_MS * 3);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, toolstextLocator);
		return labelComponent.getLabel();
	}

	/**
	 * Method to click Get Materials And Tools
	 * 
	 * @throws Exception
	 */
	public void getMaterialsAndToolsClick() throws Exception {
		af.waitForElementToBePresent(By.id(getMaterilAndTools), 5000);
		af.instantiateComponent(ButtonComponent.class, getMaterilAndTools).click();
	}

	/**
	 * Method to click on 3 dots after opening the Materials and tools POage
	 *
	 * @throws Exception
	 */
	public void clickGetReservedItems() throws Exception {
		af.waitForElementToBePresent(By.id(getReservedItems), 5000);
		af.instantiateComponent(ButtonComponent.class, getReservedItems).click();
	}

	/**
	 * Method to click on the checkbox present on the items page
	 * 
	 * @throws Exception
	 */
	public void checkboxClickOnGetReservedItems() throws Exception {
		af.waitForElementToBePresent(By.cssSelector(checkbxGetReservedItems), 5000);
		af.getWebDriver().findElement(By.cssSelector(checkbxGetReservedItems)).click();
	}

	/**
	 * Method to click on Get Selected button
	 * 
	 * @throws Exception
	 */
	public void clickGetSelected() throws Exception {
		af.waitForElementToBePresent(By.id(btnGetSelected), 5000);
		af.instantiateComponent(ButtonComponent.class, btnGetSelected).click();
	}

	/**
	 * Method to verify the items added in Materials
	 * 
	 * @throws Exception
	 */
	public String verifyGetReservedItemsAddedInMaterials() throws Exception {
		af.waitForElementToBePresent(By.id(getReservedItemsAdded), af.DEFAULT_TIMEOUT_MS * 3);
		logger.info(af.instantiateComponent(LabelComponent.class, getReservedItemsAdded).getValue());
		return af.instantiateComponent(LabelComponent.class, getReservedItemsAdded).getValue().trim();

	}

	/**
	 * Method to verify Get Reserved items is disabled or enabled
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifyGetReservedItemsDisabled() throws Exception {
		try {
			af.waitForElementToBeEnabled(By.id(btnGetSelected));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * This is generic reusable method to click button
	 *
	 * @param buttonId {string} value of id where click element
	 * @throws Exception
	 */
	public void clickButton(String buttonId) throws Exception {
		af.waitForElementToBePresent(By.id(buttonId));
		af.instantiateComponent(ButtonComponent.class, buttonId).click();
	}
	
	/**
	 * Method to verify the item added after Materials And tools touchpoint
	 * 
	 * @throws Exception
	 */
	public String verifyMaterialsAdded() throws Exception {
		af.waitForElementToBePresent(By.id(txtMaterials), af.DEFAULT_TIMEOUT_MS * 3);
		return af.instantiateComponent(LabelComponent.class, txtMaterials).getValue().trim();

	}

}
