package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;

public class AssetAndLocationWorkOrderHistoryPage {
	
	public final String assetChevronIcon= "n2pmd[0]";
	public final String assetSectionId = "kdr4w_items_datalistWrapper";
	public final String locationSectionId = "d_vkm_items_datalistWrapper";
	public final String locationChevronIcon = "wp9zm[";
	public final String infoLocator = "workOrderDetails_1_field_fieldValue0";

	
	private AbstractAutomationFramework af;
	
	public AssetAndLocationWorkOrderHistoryPage(AbstractAutomationFramework af) {
		this.af = af;
	}
	
	
	/**
	 * Click chevron button to go to wo details page of History work order
	 * 
	 * @throws Exception
	 */
	public void clickChevronButton(String elementId) throws Exception {
		af.waitForElementToBePresent(By.id(elementId), af.DEFAULT_TIMEOUT_MS * 3);
		af.instantiateComponent(ButtonComponent.class, elementId).click();
	}
	
	
	
	
	/**
	 * Method checking chevron button is displayed or not
	 *
	 * @return boolean
	 * @throws Exception
	 */
	public boolean chevronIconDisplayed(String elementId) throws Exception {
		return af.isElementExists(By.id(elementId));
	}
	
}
