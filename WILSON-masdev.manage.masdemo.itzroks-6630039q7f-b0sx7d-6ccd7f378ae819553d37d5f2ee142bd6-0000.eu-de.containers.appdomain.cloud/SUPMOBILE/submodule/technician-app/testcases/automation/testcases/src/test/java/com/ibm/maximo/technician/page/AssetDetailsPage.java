package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.WrappedTextComponent;

public class AssetDetailsPage {

	private final static Logger logger = LoggerFactory.getLogger(AssetDetailsPage.class);
	private String description = "gpv3_";
	public String pageTitle = "assetDetails_2_field";
	public final  String assetDetailBreadcrumb = "pjw4x-pageheader_breadcrumb_icon";

	private AbstractAutomationFramework af;
	
	public AssetDetailsPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * This is generic getTitle method to get string value of element
	 *
	 * @param elementID {string} value of id to get text value of it
	 * @throws Exception
	 */
	public String getTitle(String elementID) throws Exception {
		af.waitForElementToBePresent(By.id(elementID), af.DEFAULT_TIMEOUT_MS * 3);
		String pageTitle = af.instantiateComponent(FieldComponent.class, elementID).getValue();
		logger.info("pageTitle:" + pageTitle);
		return pageTitle;
	}

	/**
	 * Get asset description
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextAssetDescription() throws Exception {
		af.waitForElementToBePresent(By.id(description), 2000);
		String assetDescription = af.instantiateComponent(WrappedTextComponent.class, description).getParentLabel();
		return assetDescription;
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
	
}
