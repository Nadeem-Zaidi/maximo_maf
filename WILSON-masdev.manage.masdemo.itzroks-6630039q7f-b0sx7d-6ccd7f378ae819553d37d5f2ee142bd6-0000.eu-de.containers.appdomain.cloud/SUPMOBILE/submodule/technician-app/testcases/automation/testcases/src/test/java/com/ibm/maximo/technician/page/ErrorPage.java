package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.TextInputComponent;

public class ErrorPage {

	private AbstractAutomationFramework af;
	private final static Logger logger = LoggerFactory.getLogger(ErrorPage.class);
	private String plusiconClick = "navigator_addRoute";
	private String errorBadgeCount = "navigator_errorbadge";
	private String errorMessageText = "b3r6g[0]";
	private String retriveButtonClick = "abdww[0]_emgm8[0]";
	private String deleteButtonClick = "abdww[0]_qxp8y[0]";
	private String noErrorToCorrect = "ajnj6";
	private String getNavigatorMenuButtonClick = "NavigatorMenuButton";
	private String userProfileLocator = "navigator_userProfileprofile-image-wrapper";
	private String descriptionOfAsset = "dxkr5_lookup_buttongroup";

	public ErrorPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Method for click on plus icon
	 * 
	 * @throws Exception
	 */
	public void clickPlusIcon() throws Exception {
		af.instantiateComponent(ButtonComponent.class, plusiconClick).click();
	}

	/**
	 * Method for get Error Count value
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getErrorBadgeCount() throws Exception {
		af.waitForElementToBePresent(By.id(errorBadgeCount), af.DEFAULT_TIMEOUT_MS * 2);
		logger.info(af.instantiateComponent(ButtonComponent.class, errorBadgeCount).getText());
		return af.instantiateComponent(ButtonComponent.class, errorBadgeCount).getText();
	}

	/**
	 * Method to click on error badge
	 * 
	 * @throws Exception
	 */
	public void clickErrorBadge() throws Exception {
		af.instantiateComponent(ButtonComponent.class, errorBadgeCount).click();
		af.waitForElementToBePresent(By.id(retriveButtonClick), af.DEFAULT_TIMEOUT_MS * 3);
	}

	/**
	 * Method for get Error Count value
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getErrorMessageText() throws Exception {
		return af.instantiateComponent(FieldComponent.class, errorMessageText).getValue();
	}

	/**
	 * Method for click on Delete button
	 * 
	 * @throws Exception
	 */
	public void clickDeleteButton() throws Exception {
		af.instantiateComponent(ButtonComponent.class, deleteButtonClick).click();
	}

	/**
	 * Method to get text of error 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getNoErrorToCorrect() throws Exception {
		return af.instantiateComponent(ButtonComponent.class, noErrorToCorrect).getText();
	}

	/**
	 * Method for clicking on Navigator
	 * 
	 * @throws Exception
	 */
	public void clickNavigatorMenu() throws Exception {
		WebElement profile = af.waitForElementToBePresent(By.id(userProfileLocator), 2);
		if (!profile.isDisplayed()) {
			af.instantiateComponent(ButtonComponent.class, getNavigatorMenuButtonClick).click();
		}
	}

	/**
	 * Method for adding asset description
	 * 
	 * @param assetdescription
	 * @throws Exception
	 */
	public void addAssetDescription(String assetdescription) throws Exception {
		TextInputComponent textInput = af.instantiateComponent(TextInputComponent.class, descriptionOfAsset);
		textInput.typeText(assetdescription);
	}
}
