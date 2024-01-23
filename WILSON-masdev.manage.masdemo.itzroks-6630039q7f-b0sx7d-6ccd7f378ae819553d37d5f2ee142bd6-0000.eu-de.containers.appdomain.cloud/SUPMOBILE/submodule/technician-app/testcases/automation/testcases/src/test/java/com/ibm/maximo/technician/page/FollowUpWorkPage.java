package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.SearchComponent;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.components.ToastComponent;

public class FollowUpWorkPage {

	private AbstractAutomationFramework af;
	public final String followUpPageTitle = "relatedWorkOrder_2_field";
	public final String CreateFollowUpPageTitle = "bzk2e-pageheader_title";
	private String clickPlusLocator = "k6je4_m3nvj";
	private String completeFollowUpButton = "bzk2e-pageheader_buttongroup_e297p";
	public final String relatedWorkOrders = "a89dm";
	private String threeDotClickForAsset = "va5we_actionbuttongroup_overflow";
	private String searchIconClickAsset = "va5we_actionbuttongroup_overflowMenu_va5we_actionbuttongroup_a72w__icon";
	private String sendTextinSearchForAsset = "openCreadWOAssetLookup_lookup_datalist_search";
	private String assetOfFirstElementInList = "aamb2[0]_fieldValue0";
	private String backButtonLocator = "zj78m-pageheader_breadcrumb_icon";
	private String toastMessage = "UINotificationContainer";
	private String assetAndLocationText = "vmn3n";
	private String followUpDesc = "gek7p[0]";
	private String followUpWorkChevron = "v8__a[0]";
	private String followUpOriginatingRecord = "q5vn_[0]";
	public String tokenHeader = "xxknj";
	public String tokenNum = "dpg5a[0]";
	public String noRelatedRecordsFound="noDataWrapper";
	public String recordRelatedLabel="bx9g_[0]";
	public String btnPlusLocatorIconToCreateFollowUpWO="k6je4_m3nvj_icon";
	public String btnDoneIcon="zj78m-pageheader_buttongroup_ykwv4_icon";
	private String serviceDesc="ndpna[0]";
	private String assetId = "va5we_lookup_buttongroup";
	private String locationId = "av_qz_lookup_buttongroup";

	public FollowUpWorkPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Click plus button
	 * 
	 * @throws Exception
	 */
	public void clickPlusButton() throws Exception {
		af.waitForElementToBePresent(By.id(clickPlusLocator), af.DEFAULT_TIMEOUT_MS * 3);
		af.instantiateComponent(ButtonComponent.class, clickPlusLocator).click();
	}
	
	/**
	 * Click chevron button
	 * 
	 * @throws Exception
	 */
	public void clickOpenChevron() throws Exception {
		af.waitForElementToBePresent(By.id(followUpWorkChevron), af.DEFAULT_TIMEOUT_MS * 3);
		af.instantiateComponent(ButtonComponent.class, followUpWorkChevron).click();
	}


	/**
	 * Follow up work order displayed
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean followUpWoDisplayed() throws Exception {
		return af.isElementExists(By.id(clickPlusLocator));
	}

	/**
	 * Method to get Header Title
	 * 
	 * @param elementID
	 * @return
	 * @throws Exception
	 */
	public String getTitle(String elementID) throws Exception {
		af.waitForElementToBePresent(By.id(elementID), af.DEFAULT_TIMEOUT_MS * 3);
		String pageTitle = af.instantiateComponent(FieldComponent.class, elementID).getValue();
		return pageTitle;
	}

	/**
	 * Method to create follow-up work order
	 * 
	 * @throws Exception
	 */
	public void clickCreateFollowUp() throws Exception {
		af.instantiateComponent(ButtonComponent.class, completeFollowUpButton).click();
	}

	/**
	 * Method to Search Asset Number
	 * 
	 * @param assetNum
	 * @return true if searched asset was found otherwise false
	 * @throws Exception
	 */
	public boolean searchForAssets(String assetNum) throws Exception {
		af.waitForElementToBePresent(By.id(threeDotClickForAsset), af.DEFAULT_TIMEOUT_MS * 3);
		af.instantiateComponent(ButtonComponent.class, threeDotClickForAsset).click();
		af.instantiateComponent(ButtonComponent.class, searchIconClickAsset).click();
		try {
			SearchComponent searchField = af.instantiateComponent(SearchComponent.class, sendTextinSearchForAsset);
			searchField.typeAndSendEnterKey(assetNum);
			af.instantiateComponent(ButtonComponent.class, assetOfFirstElementInList).click();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Method to return to WO Details Page
	 * 
	 * @throws Exception
	 */
	public void backButton() throws Exception {
		af.waitForElementToBePresent(By.id(backButtonLocator), af.DEFAULT_TIMEOUT_MS * 7);
		af.instantiateComponent(ToastComponent.class, backButtonLocator).click();
	}

	/**
	 * Method to display toast message
	 * 
	 * @return toast content
	 * @throws Exception
	 */
	public String toastDisplayed() throws Exception {
		// af.waitForElementToBePresent(By.id(toastMessage),af.DEFAULT_TIMEOUT_MS*3);
		ToastComponent tc = af.instantiateComponent(ToastComponent.class, toastMessage);
		return tc.getContentText();
	}

	/**
	 * Method to display related work orders label
	 * 
	 * @return related work order text
	 * @throws Exception
	 */
	public String relatedWorkOrdersText() throws Exception {
		af.waitForElementToBePresent(By.id(relatedWorkOrders), af.DEFAULT_TIMEOUT_MS * 3);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, relatedWorkOrders);
		return labelComponent.getLabel();
	}

	/**
	 * Method to display related sr token header label
	 * 
	 * @return related service request token header text
	 * @throws Exception
	 */
	public String relatedTokenHeaderText() throws Exception {
		af.waitForElementToBePresent(By.id(tokenHeader), af.DEFAULT_TIMEOUT_MS * 3);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, tokenHeader);
		return labelComponent.getLabel();
	}

	/**
	 * 
	 * Follow-up work order description
	 * 
	 * @return follow-up work order description
	 * @throws Exception
	 */
	public String relatedSRTokenNum() throws Exception {
		af.waitForElementToBePresent(By.id(tokenNum), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, tokenNum);
		return labelComponent.getLabel();
	}

	/**
	 * 
	 * Work order related record token description
	 * 
	 * @return related record token description
	 * @throws Exception
	 */
	public String followUpDescription() throws Exception {
		af.waitForElementToBePresent(By.id(followUpDesc), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, followUpDesc);
		return labelComponent.getLabel();
	}

		/**
	 * 
	 * Follow Up Originating Record Description
	 * 
	 * @return originating record text
	 * @throws Exception
	 */
	public String originatingRecordText() throws Exception {
		af.waitForElementToBePresent(By.id(followUpOriginatingRecord), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, followUpOriginatingRecord);
		return labelComponent.getLabel();
	}

	/**
	 * Method to display asset/location label
	 * 
	 * @return asset/location label
	 * @throws Exception
	 */
	public String assetLocationText() throws Exception {
		af.waitForElementToBePresent(By.id(assetAndLocationText), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, assetAndLocationText);
		return labelComponent.getLabel();
	}

	/**
	 *
	 * Service request Related
	 * @throws Exception
	 */
	public String getRecordRelatedOnServiceRequest() throws Exception {
		af.waitForElementToBePresent(By.id(recordRelatedLabel), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, recordRelatedLabel);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get text for no related records found
	 *
	 * @throws Exception
	 */
	public String getDescForNoRelatedRecordsFound() throws Exception{
		af.waitForElementToBePresent(By.id(noRelatedRecordsFound), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, noRelatedRecordsFound);
		return labelComponent.getValue();
	}

	/**
	 *
	 * Service Request description
	 * return service request desc
	 * @throws Exception
	 */
	public String serviceReqDescription() throws Exception {
		af.waitForElementToBePresent(By.id(serviceDesc), af.DEFAULT_TIMEOUT_MS * 2);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, serviceDesc);
		return labelComponent.getLabel();
	}

	/**
	 * Enter Asset
	 *
	 * @param assetNum
	 * @throws Exception
	 */
	public void assetNumber(String assetNum) throws Exception {
		TextInputComponent textInput = af.instantiateComponent(TextInputComponent.class, assetId);
		textInput.setText(assetNum);
	}

	/**
	 * Enter Location
	 *
	 * @param location
	 * @throws Exception
	 */
	public void locationNumber(String location) throws Exception {
		TextInputComponent textInput = af.instantiateComponent(TextInputComponent.class, locationId);
		textInput.setText(location);
	}
}