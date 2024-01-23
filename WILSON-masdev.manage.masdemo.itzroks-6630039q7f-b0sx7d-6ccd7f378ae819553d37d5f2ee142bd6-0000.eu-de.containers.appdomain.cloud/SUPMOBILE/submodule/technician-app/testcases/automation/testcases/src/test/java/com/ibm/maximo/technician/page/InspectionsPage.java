package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.BaseComponent;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.CardGroupComponent;
import com.ibm.maximo.components.DropDownComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.TextInputComponent;

public class InspectionsPage {
	private final static Logger logger = LoggerFactory.getLogger(InspectionsPage.class);
	// Page Locators
	private String dropdownMenuLocator = "rzvz4";
	public static String searchIconLocator = "z3w87_cards_searchbuttongroup_searchIconButton";
	private String searchInputLocator = "z3w87_cards_search_searchInput";
	private String searchButtonLocator = "z3w87_cards_search_searchButton";
	private static String clearSearchButtonLocator = "z3w87_cards_search_clearButton";
	private String resultsLabelLocator = "recordlabel";
	public static String inspectionsLabelLocator = "q85ay-pageheader_title";
	private static String formLabelLocator = "yp6vw";
	private static String backFromInspectionToWorkOrder = "q85ay-pageheader_breadcrumb_icon";
	private static String workOrderLocator = "ergz4[0]";
	private static String cardHeaderTextLocator = "akxxd[0]";
	private static String inspectionCardLocatorpt1 = "cardtemplate2[";
	private static String inspectionCardLocatorpt2 = "]_BorderLayoutWrapper";

	private static AbstractAutomationFramework af;

	/**
	 *
	 * @param af
	 * @throws Exception
	 */
	public InspectionsPage(AbstractAutomationFramework af) throws Exception {
		InspectionsPage.af = af;

	}

	/**
	 * 
	 * @return Inspection page title
	 * @throws Exception
	 */
	public static String getInfo() throws Exception {
		af.waitForElementToBePresent(By.id(inspectionsLabelLocator));
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, inspectionsLabelLocator);
		return labelComponent.getLabel();
	}

	/**
	 * 
	 * @return Form name
	 * @throws Exception
	 */
	public static String getFormName() throws Exception {
		af.waitForElementToBePresent(By.id(formLabelLocator));
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, formLabelLocator);
		return labelComponent.getLabel();
	}

	/**
	 * Select Assigned Inspections filter
	 *
	 * @throws Exception
	 */
	public void selectAssignedInspectionsFilter() throws Exception {
		// Open on the drop down menu
		DropDownComponent dropdownMenu = af.instantiateComponent(DropDownComponent.class, dropdownMenuLocator);
		dropdownMenu.click();
		// Select Assigned Inspections
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class, dropdownMenuLocator);
		dropDownComponent.selectItemByIndex(0);
	}

	/**
	 * Select Pending Inspections filter
	 * 
	 * @throws Exception
	 */
	public void selectPendingInspectionsFilter() throws Exception {
		// Open on the drop down menu
		DropDownComponent dropdownMenu = af.instantiateComponent(DropDownComponent.class, dropdownMenuLocator);
		dropdownMenu.click();
		// Select Pending
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class, dropdownMenuLocator);
		dropDownComponent.selectItemByIndex(1);
	}

	/**
	 * Select In Progress Inspections filter
	 * 
	 * @throws Exception
	 */
	public void selectInProgressInspectionsFilter() throws Exception {
		// Open on the drop down menu
		DropDownComponent dropdownMenu = af.instantiateComponent(DropDownComponent.class, dropdownMenuLocator);
		dropdownMenu.click();
		// Select In Progress
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class, dropdownMenuLocator);
		dropDownComponent.selectItemByIndex(2);
	}

	/**
	 * Search for an inspection from any list
	 * 
	 * @param query
	 * @return True if record is found and False if it is not
	 * @throws Exception
	 */
	public boolean search(String query) throws Exception {

		if (af.isElementExists(By.id(searchInputLocator))) {

			if (af.isElementExists(By.id(clearSearchButtonLocator))) {
				// Clear the search filter
				logger.info("Clear the search filter");
				clickClearButton();
			}
			// Wait
			af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);

			// Set text in the input field
			logger.info("Set text in the input field");
			af.waitForElementToBePresent(By.id(searchInputLocator));
			TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, searchInputLocator);
			tic.setText(query);

			// Click on the search button
			logger.info("Click on the search button");
			af.waitForElementToBePresent(By.id(searchButtonLocator));
			ButtonComponent searchActionButton = af.instantiateComponent(ButtonComponent.class, searchButtonLocator);
			searchActionButton.click();

			// Wait
			af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);

			try {
				af.waitForElementToBePresent(By.cssSelector("#" + resultsLabelLocator), 1);
				return true;
			} catch (Exception e) {
				return false;

			}

		} else {

			af.waitForElementToBePresent(By.id(searchIconLocator));
			// Open the search bar
			logger.info("Open the search bar");
			ButtonComponent searchIconButton = af.instantiateComponent(ButtonComponent.class, searchIconLocator);
			searchIconButton.click();

			if (af.isElementExists(By.id(clearSearchButtonLocator))) {
				// Clear the search filter
				logger.info("Clear the search filter");
				clickClearButton();
			}

			// Set text in the input field
			logger.info("Set text in the input field");
			af.waitForElementToBePresent(By.id(searchInputLocator));
			TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, searchInputLocator);
			tic.setText(query);
			// Click on the search button
			logger.info("Click on the search button");
			af.waitForElementToBePresent(By.id(searchButtonLocator));
			ButtonComponent searchActionButton = af.instantiateComponent(ButtonComponent.class, searchButtonLocator);
			searchActionButton.click();
			// Wait
			af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);
			try {
				af.waitForElementToBePresent(By.cssSelector("#" + resultsLabelLocator), 1);
				return true;
			} catch (Exception e) {
				return false;
			}
		}
		// return false;
	}

	/**
	 * Clear the search bar
	 */
	public static void clickClearButton() {
		try {
			af.waitForElementToBePresent(By.id(clearSearchButtonLocator));
		} catch (Exception e) {
			logger.info("clear button not present");

		}
		logger.info("Clear the search bar");
		af.instantiateComponent(ButtonComponent.class, clearSearchButtonLocator).click();

	}

	/**
	 * Click back from Inspections Page to Work Order
	 * 
	 * @throws Exception
	 */
	public static void clickBackFromInspectionToWorkOrderButton() throws Exception {
		af.waitForElementToBePresent(By.id(backFromInspectionToWorkOrder));
		logger.info("Clicking on Back from Inspections Page to Work Order");
		af.instantiateComponent(BaseComponent.class, backFromInspectionToWorkOrder).click();

	}

	/**
	 * Click Work Order ID
	 * 
	 * @throws Exception
	 */
	public static void clickWorkOrderButton() throws Exception {
		af.waitForElementToBePresent(By.id(workOrderLocator));
		logger.info("Clicking on Work Order");
		af.instantiateComponent(ButtonComponent.class, workOrderLocator).click();

	}

	/**
	 * Get the form name displayed in the inspection card header
	 * 
	 * @param position
	 * @return Inspection Card Header Text
	 */
	public static String getInspectionCardHeaderText(int position) {
		logger.info("Get Inspection Card Header Text");
		return af
				.instantiateComponent(CardGroupComponent.class,
						inspectionCardLocatorpt1 + position + inspectionCardLocatorpt2)
				.getCardGroupText(cardHeaderTextLocator);
	}

}
