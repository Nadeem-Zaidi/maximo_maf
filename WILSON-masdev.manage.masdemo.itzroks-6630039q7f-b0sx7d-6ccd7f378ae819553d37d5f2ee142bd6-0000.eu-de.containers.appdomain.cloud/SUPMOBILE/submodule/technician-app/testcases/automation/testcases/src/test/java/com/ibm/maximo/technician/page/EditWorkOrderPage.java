package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openqa.selenium.WebElement;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.FilterComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.NumberInputComponent;
import com.ibm.maximo.components.RichTextEditorComponent;
import com.ibm.maximo.components.TextAreaComponent;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.technician.setupdata.SetupData.*;

public class EditWorkOrderPage {

	private final static Logger logger = LoggerFactory.getLogger(EditWorkOrderPage.class);
	private String priority = "yqkzy";
	private String description = "k2_mb";
	private String longDescription = "mandz";
	private String enterLLongDescription = "wg72g";
	private String workType = "edp_e";
	private String startDate = "kga47_date";
	private String startTime = "kga47_time";
	private String finishDate = "y8pqz_date";
	private String finishTime = "y8pqz_time";
	private String woDetaislEditClosebutton = "woDetailsEditDialog_close_button";
	private String saveDiscardDialogSaveButton = "saveDiscardDialog_button_group_saveDiscardDialog_primary_button";
	private String saveEditWO = "bzk2e-pageheader_buttongroup_e297p";
	private String estimatedHrs = "yqpzj";
	private String estimatedMinutes = "yqpzj_minute";
	private String assetId = "va5we_lookup_buttongroup";
	private String locationId = "av_qz_lookup_buttongroup";
	private String workTypeLookupSearchInput = "workTypeLookup_lookup_datalist_search_searchInput";
	private String workTypeLookupSearch = "workTypeLookup_lookup_datalist_search";
	private String threeDotClickForAsset = "va5we_actionbuttongroup_overflow";
	private String searchIconClickAsset = "va5we_actionbuttongroup_overflowMenu_va5we_actionbuttongroup_a72w_";
	private String failureLabel="failurecode_46_label";
	private String locationLabel = "location_48_label";
	private String rotatingItemLabel = "itemnum_17_label";
	private String serialLabel = "serialnum_27_label";
	private String typeLabel = "assettype_40_label";
	private String vendorLabel = "vendor_36_label";
	private String selectAllRecords = "filter_datalist_TouchSelectAll_filter_datalist_button";
	private String backIcon = "pageHeaderTemplate_icon";
	private String resetFilterIcon = "reset_filter";
	private String vendorBadge = "vendor_36_badge";
	private String serialNumberBadge = "serialnum_27_badge";
	private String filterIcon = "openCreadWOAssetLookup_lookup_datalist_actionbuttongroup_undefined";
	private String txtErrorMsgPriority="yqkzy-error-msg";
	private String editWOBackButton="bzk2e-pageheader_breadcrumb_icon";
	private String discardButton="graphite_unsaved_changes_button_group_graphite_unsaved_changes_secondary_button";
	private String typeNumberBadge = "assettype_40_badge";
	
	private AbstractAutomationFramework af;

	public EditWorkOrderPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Save Edited WO Details
	 *
	 * @throws Exception
	 */
	public void saveEditedWODetails() throws Exception {
		af.waitForElementToBePresent(By.id(saveEditWO), af.DEFAULT_TIMEOUT_MS * 3).click();
	}

	/**
	 * Enter Description
	 * 
	 * @param value
	 * @throws Exception
	 */
	public void enterDescription(String value) throws Exception {
		TextAreaComponent textArea = af.instantiateComponent(TextAreaComponent.class, description);
		textArea.clearField();
		textArea.type(value);
	}

	/**
	 * Enter Priority
	 * 
	 * @param value
	 * @throws Exception
	 */
	public void enterPriority(String value) throws Exception {
		logger.info("enter priority");
		NumberInputComponent numberInputComponent = af.instantiateComponent(NumberInputComponent.class, priority);
		numberInputComponent.typeInNumberInput(value);
	}

	/**
	 * Enter Long Description
	 * 
	 * @param value
	 * @throws Exception
	 */
	public void enterLongDescription(String value) throws Exception {
		logger.info("enter long description");
		af.instantiateComponent(ButtonComponent.class, longDescription).click();
		RichTextEditorComponent richTextEditor = af.instantiateComponent(RichTextEditorComponent.class,
				enterLLongDescription);
		richTextEditor.type(value);
		af.instantiateComponent(ButtonComponent.class, woDetaislEditClosebutton).click();
		af.instantiateComponent(ButtonComponent.class, saveDiscardDialogSaveButton).click();
	}

	/**
	 * Enter scheduled start date and time
	 * 
	 * @param year
	 * @param month
	 * @param date
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void scheduledStartDateAndTime(int year, int month, int date, int hrs, int min) throws Exception {
		((MobileAutomationFramework) af).setDate(By.id(startDate), year, month, date);
		((MobileAutomationFramework) af).setTime(By.id(startTime), hrs, min, true);// true means AM
	}

	/**
	 * Enter Finish Date and Time
	 * 
	 * @param year
	 * @param month
	 * @param date
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void scheduledFinishDateAndTime(int year, int month, int date, int hrs, int min) throws Exception {
		((MobileAutomationFramework) af).setDate(By.id(finishDate), year, month, date);
		((MobileAutomationFramework) af).setTime(By.id(finishTime), hrs, min, true);// true means AM
	}

	/**
	 * Enter Estimated Duration
	 * 
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void estimatedDuration(String hrs, String min) throws Exception {
		af.instantiateComponent(NumberInputComponent.class, estimatedHrs).typeAndSendDurationHourKey(hrs, Keys.TAB);
		af.instantiateComponent(NumberInputComponent.class, estimatedMinutes).typeAndSendDurationMinuteKey(min,
				Keys.TAB);
	}

	/**
	 * Enter Asset
	 * 
	 * @param assetNum
	 * @throws Exception
	 */
	public void assetNumber(String assetNum) throws Exception {
		TextInputComponent textInput = af.instantiateComponent(TextInputComponent.class, assetId);
		textInput.clearField();
		textInput.typeText(assetNum);
	}

	/**
	 * Enter Location
	 * 
	 * @param location
	 * @throws Exception
	 */
	public void locationNumber(String location) throws Exception {
		TextInputComponent textInput = af.instantiateComponent(TextInputComponent.class, locationId);
		textInput.clearField();
		textInput.typeText(location);
	}

	public void changeWorkType(WorkType worktype) {
		af.instantiateComponent(ButtonComponent.class, workType).click();
		String locator = "workTypeLookup_lookup_datalist_" + worktype + "_selectionCheckBoxIcon_touch";
		af.instantiateComponent(ButtonComponent.class, locator).click();
	}

	/**
	 * Click on assets three dots and click filter icon
	 * 
	 * @return
	 * @throws Exception
	 */
	public boolean searchForAssets() throws Exception {
		af.waitForElementToBePresent(By.id(threeDotClickForAsset), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, threeDotClickForAsset).click();
		af.instantiateComponent(ButtonComponent.class, searchIconClickAsset).click();
		try {
			af.waitForElementToBePresent(By.id(filterIcon), 2000);
			af.instantiateComponent(ButtonComponent.class, filterIcon).click();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * Method to get failure class text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String failureClassText() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, failureLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get location text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String locationLabelText() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, locationLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get rotating item text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String rotatingItemText() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, rotatingItemLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get vendor text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String vendorTextMethod() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, vendorLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get serial text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String serialLabelText() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, serialLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get Type text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String typeLabelText() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, typeLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to select all serial number records
	 * 
	 * @throws Exception
	 */
	public void serialNumberSelectRecords() throws Exception {
		af.waitForElementToBePresent(By.id(serialLabel), 2000);
		af.instantiateComponent(ButtonComponent.class, serialLabel).click();
		af.instantiateComponent(ButtonComponent.class, selectAllRecords).click();
	}

	/**
	 * Method to click back button on filter page
	 * 
	 * @throws Exception
	 */
	public void filterPagebackButton() throws Exception {
		af.waitForElementToBePresent(By.id(backIcon),3000);
		af.instantiateComponent(ButtonComponent.class, backIcon).click();
	}

	/**
	 * Method to select all vendor records
	 * 
	 * @throws Exception
	 */
	public void VendorSelectRecords() throws Exception {
		af.waitForElementToBePresent(By.id(vendorLabel), 2000);
		af.instantiateComponent(ButtonComponent.class, vendorLabel).click();
		af.instantiateComponent(ButtonComponent.class, selectAllRecords).click();
	}

	/**
	 * Method to verify badge displayed for Serial Number
	 * 
	 * @return
	 * @throws Exception
	 */
	public String isBadgeDisplayedforSErialNumber() throws Exception {
		FilterComponent tag = af.instantiateComponent(FilterComponent.class, serialNumberBadge);
		return tag.getTagCount();
	}

	/**
	 * Method to verify badge displayed for vendor
	 * 
	 * @return
	 * @throws Exception
	 */
	public String isBadgeDisplayedforVendor() throws Exception {
		FilterComponent tag = af.instantiateComponent(FilterComponent.class, vendorBadge);
		return tag.getTagCount();
	}

	/**
	 * Method to reset filter button
	 * 
	 * @throws Exception
	 */
	public void resetFilterButtonClick() throws Exception {
		af.waitForElementToBePresent(By.id(resetFilterIcon), 2000);
		af.instantiateComponent(ButtonComponent.class, resetFilterIcon).click();
	}
	
	/**
	 * Method to get error message for wrong priority 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getErrorMsgForWrongPriority() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, txtErrorMsgPriority);
		return labelComponent.getLabel();
	}
	
	
	/**
	 * Method to save button is enabled or disabled when entered wrong values 
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifySaveButton() throws Exception {
		try {
			af.waitForElementToBeEnabled(By.id(saveEditWO));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
	/**
	 * Method to go back to the WO details page
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public void goBackToWODetailsPage() throws Exception {
		af.waitForElementToBePresent(By.id(editWOBackButton), 2000);
		af.instantiateComponent(ButtonComponent.class, editWOBackButton).click();
	}
	
	/**
	 * Method to click on discard button 
	 * 
	 * @throws Exception
	 */
	public void discardButtonClick() throws Exception {
		af.waitForElementToBePresent(By.id(discardButton), 2000);
		af.instantiateComponent(ButtonComponent.class, discardButton).click();
	}
	
	/**
	 * Method to select all type records
	 * 
	 * @throws Exception
	 */
	public void typeRecordSelectMethod() throws Exception {
		af.waitForElementToBePresent(By.id(typeLabel), 2000);
		af.instantiateComponent(ButtonComponent.class, typeLabel).click();
		af.instantiateComponent(ButtonComponent.class, selectAllRecords).click();
	}
	
	/**
	 * Method to verify badge displayed for Type Number
	 * 
	 * @return
	 * @throws Exception
	 */
	public String isBadgeDisplayedforTypeNumber() throws Exception {
		FilterComponent tag = af.instantiateComponent(FilterComponent.class, typeNumberBadge);
		return tag.getTagCount();
	}
}
