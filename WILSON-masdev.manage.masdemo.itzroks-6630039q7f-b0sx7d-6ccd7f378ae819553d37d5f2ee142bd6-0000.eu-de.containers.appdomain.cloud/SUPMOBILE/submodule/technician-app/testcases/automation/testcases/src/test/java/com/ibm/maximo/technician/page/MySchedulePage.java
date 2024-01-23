package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.testng.Assert.assertEquals;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.DropDownComponent;
import com.ibm.maximo.components.FilterComponent;
import com.ibm.maximo.components.IconComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.SlidingDrawerComponent;
import com.ibm.maximo.components.TagComponent;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.components.ToastComponent;

public class MySchedulePage {
	private final static Logger logger = LoggerFactory.getLogger(MySchedulePage.class);
	private String infoLocator = "p26j8";
	private String searchIconLocator = "jgyq6_cards_searchbuttongroup_searchIconButton";
	private String searchInputLocator = "jgyq6_cards_search_searchInput"; 
	private String searchButtonLocator = "jgyq6_cards_search_searchButton";
	private String clearSearchButtonLocator = "jgyq6_cards_search_clearButton";
	private String resultsLabelLocator = "recordlabel";
	private String startWorkButtonLocator = "kvd2r[0]_g3wzk[0]";
	private String startTravelButtonLocator = "mj7e5[0]_meerd[0]";
	private String stopWorkButtonLocator = "kvd2r[0]_nxea3[0]";
	private String workOrderChevron = "cardtemplate1[0]_chevron";
	private String workLogTouchpoint = "bxek9[0]_eyw9b[0]";
	private String crossButton = "workLogDrawer_button";
	private String workLogOnWoListPage = "g7wppchatBox_0_borderLayout_sortdesc_slot_bottom";
	private String workLogOnWoDetailsPage = "qj2gechatBox_2_borderLayout_sortdesc_slot_bottom";
	private String backChevron = "logTypeLookup_sliding_drawer_button";
	private String metersButton = "bxek9[0]_vqxv2[0]";
	private String assignedWorkFilterOnMySchedulePage = "rzvz4";
	private String assignedWorkFilterOnMaterialsToolsPage = "nwx5y";
	private String assignedWorkFilterOnMapPage = "rzvz4";
	private String changedStatusText = "vadn6[0]_0";
	private String refreshButton = "jgyq6_cards_searchbuttongroup_jgyq6_cards_RefreshButon";
	private String refreshButtonLoading = "jgyq6_cards_searchbuttongroup_jgyq6_cards_RefreshButon_loading";
	private String openSafetyPlanDrawer = "bxek9[0]_bnprm[0]";
	private String closeSafetyPlanDrawer = "slidingwohazard_button";
	private String drawerHeader = "startDrawerContainer_slidingDrawerController";
	private String blueSafetyPlanCheckmark = "zybvz";
	private String greenSafetyPlanCheckmark = "pd2z_";
	private String reviewedSafetyPlan = "ja8av";
	private String reviewSafetyPlanDate = "a3j5d_fieldValue0";
	private String toastMessage = "UINotificationContainer";
	private String safetyPlanBadge = "bxek9[0]_bnprm[0]_badge";
	private String wOListIconFromMapView = "pageTemplateSwitch_ajv_g_0_icon";
	private String getMaterilAndTools = "p26j8";
	private String sortingIcon="jgyq6_cards_searchbuttongroup_m2bpv";
	private String confirmBtnOnSortingSlider="confirm_button";
	private String getPriorityLabel="vadn6[0]_1";
	private String priorityLabel="active_sorting_start_0";
	private String filterIcon="jgyq6_cards_searchbuttongroup_djzbd";
	private String statusClick="//*[@id='status_23_icon']";
	private String inputTxtSearchInFilter="filter_datalist_search_searchInput";
	private String firstValueOfSorting="filter_option_undefined";
	private String badgeCountForStatusFilter="status_23_badge";
	private String btnDoneOnFilter="pageHeaderTemplate_buttongroup_MXFilter_modal_done_button";
	private String backOptionFromFilters="pageHeaderTemplate_icon";

	private AbstractAutomationFramework af;

	public MySchedulePage(AbstractAutomationFramework af) throws Exception {
		this.af = af;
	}

	public String getInfo() throws Exception {
		logger.info("go to get info method");
		af.waitForElementToBePresent(By.id(infoLocator));
		ButtonComponent buttonComponent = af.instantiateComponent(ButtonComponent.class, infoLocator);
		return buttonComponent.getButtonText();
	}

	/**
	 * Method to refresh WO records
	 * 
	 * @throws Exception
	 */
	public void checkForUpdateButton() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(refreshButton),af.DEFAULT_TIMEOUT_MS);
			if (af.isElementExists(By.id(refreshButton))) {
				af.instantiateComponent(ButtonComponent.class, refreshButton).click();
				af.waitForElementToNotBePresent(By.id(refreshButtonLoading), af.DEFAULT_TIMEOUT_MS * 2);
			}
		} catch (Exception e) {
			// 'No work orders found' screen has refresh button
			String refreshButton1 = "jgyq6_cards_RefreshButon";
			String refreshButtonLoading1 = "jgyq6_cards_RefreshButon_loading";
			af.waitForElementToBePresent(By.id(refreshButton1),af.DEFAULT_TIMEOUT_MS);
			if (af.isElementExists(By.id(refreshButton1))) {
				af.instantiateComponent(ButtonComponent.class, refreshButton1).click();
				af.waitForElementToNotBePresent(By.id(refreshButtonLoading1), af.DEFAULT_TIMEOUT_MS * 2);
			}
		}

	}

	public boolean search(String query) throws Exception {
		checkForUpdateButton();
		
		if (af.isElementExists(By.id(searchInputLocator))) {

			if (af.isElementExists(By.id(clearSearchButtonLocator))) {
				// Clear the search filter
				logger.info("Clear the search filter");
				clickClearButton();
			}
			// Wait
			af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);
			if (af.isElementExists(By.id(searchInputLocator))) {

				// Set text in the input field
				logger.info("Set text in the input field");
				af.waitForElementToBePresent(By.id(searchInputLocator));
				TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, searchInputLocator);
				tic.setText(query);

				// Click on the search button
				logger.info("Click on the search button");
				af.waitForElementToBePresent(By.id(searchButtonLocator));
				ButtonComponent searchActionButton = af.instantiateComponent(ButtonComponent.class,
						searchButtonLocator);
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
		return false;
	}


	// Method for clicking on card details button
	public WorkOrderDetailsPage openCardDetails(String cardId) throws Exception {
		af.instantiateComponent(ButtonComponent.class, cardId).click();
		return new WorkOrderDetailsPage(af);
	}

	// Click on magnify button
	// Click on the search button
	public void clickSearchButton() throws Exception {
		logger.info("Click on the search button or magnify button");
		af.waitForElementToBePresent(By.id(searchButtonLocator));
		ButtonComponent searchActionButton = af.instantiateComponent(ButtonComponent.class,
				searchButtonLocator);
		searchActionButton.click();
	}

	/**
	 * Method to click on WO list Icon from Map View
	 *
	 * @return void
	 */
	public void clickOnWOListIconFromMapView () throws Exception {		
		af.waitForElementToBePresent(By.id(wOListIconFromMapView));
		ButtonComponent icon = af.instantiateComponent(ButtonComponent.class,
				wOListIconFromMapView);
		icon.click();
	}

	/**
	 * Method to get "Work Order number" text
	 * 
	 * @return String Reviewed label
	 */
	public String getWorkOrderNumber() throws Exception {
		return af.instantiateComponent(ButtonComponent.class, "cardtemplate1[0]_BorderLayout1").getText();
	}

	// Clears the search input text
	public void clickClearButton() throws Exception {
		af.waitForElementToBePresent(By.id(clearSearchButtonLocator));
		af.instantiateComponent(ButtonComponent.class, clearSearchButtonLocator).click();
	}

	// Click on checkmark and search input text
	public boolean clearAndSearch(String query) throws Exception {
		af.waitForElementToBePresent(By.id(clearSearchButtonLocator));
		af.instantiateComponent(ButtonComponent.class, clearSearchButtonLocator).click();
		TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, searchInputLocator);
		tic.setText(query);
		ButtonComponent searchButton2 = af.instantiateComponent(ButtonComponent.class, searchButtonLocator);
		searchButton2.click();
		af.waitForElementToNotBePresent(By.cssSelector("#loading0_LongPress"), af.DEFAULT_TIMEOUT_MS * 5);
		try {
			af.waitForElementToBePresent(By.cssSelector("#" + resultsLabelLocator), 1);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	// Click on start work button
	public void clickStartWorkButton() {
		af.instantiateComponent(ButtonComponent.class, startWorkButtonLocator).click();
	}

	// Click on start travel button
	public void clickStartTravelButton() {
		af.instantiateComponent(ButtonComponent.class, startTravelButtonLocator).click();
	}

	// Get stop work icon description
	public String getStopWorkButtonText() {
		return af.instantiateComponent(ButtonComponent.class, stopWorkButtonLocator).getIconDescription();
	}
	
	// Get start travel icon description
	public String getStartTravelButtonText() {
		return af.instantiateComponent(ButtonComponent.class, startTravelButtonLocator).getIconDescription();
	}

	public String getSearchResult() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, resultsLabelLocator);
		return labelComponent.getLabel();
	}

	// Click on chevron Icon from work order
	public void openWorkOrderDetails() throws Exception {
		af.instantiateComponent(ButtonComponent.class, workOrderChevron).click();
		af.waitForElementToNotBePresent(By.id("em97_-pageheader_buttongroup_e4ppv_loading"), 2000);
	}

	public MetersPage clickMetersButton() throws Exception {
		af.instantiateComponent(ButtonComponent.class, metersButton).click();
		return new MetersPage(af);
	}

	// Click on work log touch-point
	public void clickWorkLogTouchpoint() throws Exception {
		af.instantiateComponent(ButtonComponent.class, workLogTouchpoint).click();
	}

	// Get work log drawer header
	public String getWorkLogDrawerHeader() {
		return af.instantiateComponent(SlidingDrawerComponent.class, drawerHeader)
				.getHeaderLabel();
	}

	// Click on back chevron
	public void clickBackChevron() {
		af.instantiateComponent(ButtonComponent.class, backChevron).click();
	}

	// Click on 'X' to close the work log drawer
	public void closeDrawer() {
		af.instantiateComponent(ButtonComponent.class, crossButton).click();
	}

	// Get work log on WO list page
	public String getWorkLogOnWoListPage() {
		return af.instantiateComponent(LabelComponent.class, workLogOnWoListPage).getLabel();
	}

	// Get work log on WO details page
	public String getWorkLogOnWoDetailsPage() {
		return af.instantiateComponent(LabelComponent.class, workLogOnWoDetailsPage).getLabel();
	}

	/**
	 * Get 'Assigned work' filter on My Schedule page
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getAssignedWorkFilterOnMySchedulePage() throws Exception {
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class,
				assignedWorkFilterOnMySchedulePage);
		return dropDownComponent.getSelected();
	}

	/**
	 * Get 'Assigned work' filter on Materials & Tools page
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getAssignedWorkFilterOnMaterialsToolsPage() {
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class,
				assignedWorkFilterOnMaterialsToolsPage);
		return dropDownComponent.getSelected();
	}

	/**
	 * Get 'Assigned work' filter on Maps page
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getAssignedWorkFilterOnMapPage() {
		DropDownComponent dropDownComponent = af.instantiateComponent(DropDownComponent.class,
				assignedWorkFilterOnMapPage);
		return dropDownComponent.getSelected();
	}

	/**
	 * Method to verify status on WO List page
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String verifyChangedStatus() throws Exception {
		af.waitForElementToBePresent(By.id(changedStatusText), 2000);
		return af.instantiateComponent(TagComponent.class, changedStatusText).getLabel();
	}

	/**
	 * Method to open safety plan drawer on work order card in WO list page
	 */
	public void openSafetyPlanDrawer() {
		af.instantiateComponent(ButtonComponent.class, openSafetyPlanDrawer).click();
	}

	/**
	 * Method to click blue checkmark of safety plan drawer to review the safety
	 * plan
	 * 
	 * @throws Exception
	 */
	public void reviewSafetyPlan() throws Exception {
		af.waitForElementToBePresent(By.id(blueSafetyPlanCheckmark), 2000);
		af.instantiateComponent(ButtonComponent.class, blueSafetyPlanCheckmark).click();
	}

	/**
	 * Method to get green checkmark on safety plan drawer
	 * 
	 * @return String green checkmark icon description
	 * @throws Exception
	 */
	public String getGreenSafetyPlanCheckmark() throws Exception {
		af.waitForElementToBePresent(By.id(greenSafetyPlanCheckmark), 2000);
		return af.instantiateComponent(IconComponent.class, greenSafetyPlanCheckmark).getIconName();
	}

	/**
	 * Method to get "Reviewed" text after reviewing Safety Plan
	 * 
	 * @return String Reviewed label
	 */
	public String getReviewedSafetyPlanText() {
		return af.instantiateComponent(LabelComponent.class, reviewedSafetyPlan).getLabel();
	}

	/**
	 * Get date after reviewing safety plan
	 * 
	 * @return String reviewed date
	 * @throws Exception
	 */
	public String getReviewedDate() throws Exception {
		af.waitForElementToBePresent(By.id(reviewSafetyPlanDate), 2000);
		return af.instantiateComponent(LabelComponent.class, reviewSafetyPlanDate).getValue();
	}

	/**
	 * Method to verify toast message on work order list page
	 * 
	 * @return String Toast Title
	 * @throws Exception
	 */
	public String toastMessageDisplayed() throws Exception {
		ToastComponent tc = af.instantiateComponent(ToastComponent.class, toastMessage);
		tc.waitToastPresent();
		logger.info("Toast Title:" + tc.getContentText());
		return tc.getContentText();
	}

	/**
	 * Method to click 'X' to close safety plan drawer
	 */
	public void closeSafetyPlanDrawer() {
		af.instantiateComponent(ButtonComponent.class, closeSafetyPlanDrawer).click();
	}

	/**
	 * Method to get sliding drawer header
	 * 
	 * @return String header title
	 */
	public String getSlidingDrawerHeader() {
		return af.instantiateComponent(SlidingDrawerComponent.class, drawerHeader).getHeaderLabel();
	}

	/**
	 * Method to get badge count on safety plan touch-point
	 * 
	 * @return String badge count
	 */
	public String safetyPlanBadgeCount() {
		FilterComponent tag = af.instantiateComponent(FilterComponent.class, safetyPlanBadge);
		return tag.getAttribute("aria-label");
	}

	/**
	 * Method to get safety plan drawer contents
	 * 
	 * @param hazardId, precautionId
	 */
	public void getSafetyPlanDrawerContents(String hazardId, String precautionId) {
		// Get "Review safety plan" text
		LabelComponent label = af.instantiateComponent(LabelComponent.class, "vqwpm_fieldValue0");
		assertEquals("Review safety plan", label.getLabel());
		// Get "Not reviewed" text
		label = af.instantiateComponent(LabelComponent.class, "vqwpm_label");
		assertEquals("Not reviewed", label.getLabel());
		// "Hazards" label text
		label = af.instantiateComponent(LabelComponent.class, "qrb43_items_label1");
		assertEquals("Hazards", label.getLabel());
		// Get Hazard
		label = af.instantiateComponent(LabelComponent.class, "jrqdn[0]");
		assertEquals("Hazard description " + hazardId, label.getLabel());
		// Get Precaution
		label = af.instantiateComponent(LabelComponent.class, "vpwkj[0]");
		assertEquals("Precaution description " + precautionId, label.getLabel());
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
	 * Method to click on the sorting icon
	 * 
	 * @throws Exception
	 */
	public void clickSortingIcon() throws Exception {
		af.waitForElementToBePresent(By.id(sortingIcon),2000);
		af.instantiateComponent(ButtonComponent.class, sortingIcon).click();
	}
		
	/**
	 * Method to click on the confirm button
	 * 
	 * @throws Exception
	 */
	public void clickOnConfirmBtnOnSortingPage() throws Exception{
		af.waitForElementToBePresent(By.id(confirmBtnOnSortingSlider),2000);
		af.instantiateComponent(ButtonComponent.class, confirmBtnOnSortingSlider).click();	
	}
	
	/**
	 * Method to verify priority on WO list page
	 * 
	 * @throws Exception
	 */
	public String verifyProritySortingInWOListPage() throws Exception{	
		af.waitForElementToBePresent(By.id(getPriorityLabel), 2000);
		return af.instantiateComponent(TagComponent.class, getPriorityLabel).getLabel();		
	}	
	
	/* Method to verify if sorting icon is present
	 * 
	 * @throws Exception
	 */
	public String verifyPrioritySortingPresent() throws Exception {		
		af.waitForElementToBePresent(By.id(priorityLabel), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, priorityLabel);
		return labelComponent.getLabel();	
	}
	
	/**
	 * Method to click on the filtering icon
	 * 
	 * @throws Exception
	 */
	public void clickFilteringIcon() throws Exception {
		af.waitForElementToBePresent(By.id(filterIcon),2000);
		af.instantiateComponent(ButtonComponent.class, filterIcon).click();
	}
	
	/**
	 * Method to click Work Type filter 
	 * 
	 * @throws Exception
	 */
	public void clickStatusFilter() throws Exception {
		logger.info("going into method");
		af.waitForElementToBePresent(By.xpath(statusClick), af.DEFAULT_TIMEOUT_MS * 2);
		af.waitForElementToBePresent(By.xpath(statusClick),1000).click();
	}
	
	/**
	 * Method to search the filters on the right side 
	 * 
	 * @throws Exception
	 */
	public void searchFilters(String text) throws Exception {
		af.waitForElementToBePresent(By.id(inputTxtSearchInFilter));
		TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, inputTxtSearchInFilter);
		tic.setText(text);	
	}
	
	/**
	 * Method to Click on the first value selected after searching the filter value
	 * 
	 * @throws Exception
	 */
	public void clickOntheFirstValueofSorting() throws Exception{
		af.waitForElementToBePresent(By.id(firstValueOfSorting),2000);
		af.instantiateComponent(ButtonComponent.class, firstValueOfSorting).click();		
	}	
	
	/**
	 * Method to go back to verify the bagde count 
	 * 
	 * @throws Exception
	 */
	public void goBackFromAllRecordsSliderofFilter() throws Exception{
		af.waitForElementToBePresent(By.id(backOptionFromFilters),2000);
		af.instantiateComponent(ButtonComponent.class, backOptionFromFilters).click();		
	}	
		
	/**
	 * Method to verify the badge count on the sorting for status 
	 * 
	 * @throws Exception
	 */
	public String verifyBadgeCount() throws Exception{
		af.waitForElementToBePresent(By.id(badgeCountForStatusFilter), af.DEFAULT_TIMEOUT_MS * 2);
		logger.info(af.instantiateComponent(ButtonComponent.class, badgeCountForStatusFilter).getText());
		return af.instantiateComponent(ButtonComponent.class, badgeCountForStatusFilter).getText();	
	}
	
	/**
	 * Method to click on the Done button present on the filter button
	 * 
	 * @throws Exception
	 */
	public void clickOnDoneButtonOnFilter() throws Exception{
		af.waitForElementToBePresent(By.id(btnDoneOnFilter),2000);
		af.instantiateComponent(ButtonComponent.class, btnDoneOnFilter).click();
	}
	
	/* Method to verify if status is filtered 
	 * 
	 * @throws Exception
	 */
	public String verifyStatusFilterOnWOList() throws Exception {		
		af.waitForElementToBePresent(By.id(changedStatusText), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, changedStatusText);
		return labelComponent.getLabel();
	}
}
