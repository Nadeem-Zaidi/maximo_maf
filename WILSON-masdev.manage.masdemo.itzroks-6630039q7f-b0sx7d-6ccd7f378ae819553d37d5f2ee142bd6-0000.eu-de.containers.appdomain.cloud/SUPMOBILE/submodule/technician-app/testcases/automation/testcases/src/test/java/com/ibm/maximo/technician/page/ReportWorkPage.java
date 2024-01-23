package com.ibm.maximo.technician.page;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.DataListComponent;
import com.ibm.maximo.components.DataListItemComponent;
import com.ibm.maximo.components.DialogComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.NumberInputComponent;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.components.ToastComponent;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;

public class ReportWorkPage {

	private AbstractAutomationFramework af;
	private final static Logger logger = LoggerFactory.getLogger(ReportWorkPage.class);
	private String editButton = "z7ej9";
	private String completeWorkOrder = "gmzj8-pageheader_buttongroup_p6aav";
	private String reportWorkPage = "report_work_content";
	private String getClassValue = "b33g__fieldValue0";
	private String systemMsg = "graphite_dialog_error";
	private String closeSystemMsg = "graphite_dialog_error_close_button";
	private String toastMessage = "UINotificationContainer";
	private String addLabor = "ygndp";
	private String openLaborType = "nj99a";
	private String saveLabor = "zrbke_ngvdg";
	private String closeLaborDrawer = "reportTimeDrawer_button";
	private String editLabor = "wbbj9[0]";
	private String startTimeOfStartedLabor = "pq34x[0]_fieldValue0";
	private String hours = "regularHours_hour";
	private String minutes = "regularHours_minute";
	private String startTime = "startTime";
	private String laborName = "wadr4[0]label";
	private String secondLaborName = "wadr4[1]label";
	private String laborNameOnDrawer = "g5_4e_fieldValue0";
	private String craft = "b9em8_fieldValue0";
	private String skillLevel = "r83pw_fieldValue0";
	private String laborStartDate = "x4qx8[0]";
	private String laborStartTime = "pq34x[1]_fieldValue0";
	private String laborEndDate = "z2k4w[1]";
	private String laborEndTime = "vv6jr[1]_fieldValue0";
	private String laborType = "z_463[1]_fieldValue0";
	private String laborTypeOnDrawer = "wdd_v_fieldValue0";
	private String laborHours = "nv2nk[1]_fieldValue0";
	private String laborTaskChevron = "egq9y";
	private String laborSelectionChevron = "e85dm";
	private String laborCheckmark = "laborLookup_lookup_datalist_search_searchButton";
	private String searchInputLabor = "laborLookup_lookup_datalist_search_searchInput";
	private String endTimeLabor="endTime";
	private String endDateLabor="endDate_dpi";

	private String materialsName = "nnqxy[0]_fieldValue0";
	private String toolsName = "nnxr4[0]_fieldValue0";
	private String startDateOnLaborDrawer = "z9er7";
	private String reportPageBackChevron = "gmzj8-pageheader_breadcrumb_icon";
	// Add materials
	private String addMaterialThreeDots = "nd44n";
	private String addItems = "nd44n_menu_menu_qrxpm";
	private String firstMaterial = "d76q3[0]";
	private String graphite_dialog_error_title = "graphite_dialog_error_title";
	private String graphite_dialog_error_close_button = "graphite_dialog_error_close_button";

	// Add tools
	private String actualLaborHour = "nv2nk[0]_fieldValue0";
	private String toolsAddButton = "pbvjm";
	private String toolAddedIndicator = "x8b42[0]";
	private String btn3DotsAtMaterialsUsed="nd44n";
	private String btnGetSelected="q7r2e-pageheader_buttongroup_rwgaq";

	public ReportWorkPage(AbstractAutomationFramework af) {
		this.af = af;
	}

	/**
	 * Click failure edit button
	 * 
	 * @throws Exception
	 */
	public FailureReportingPage edit() throws Exception {
		af.instantiateComponent(ButtonComponent.class, editButton).click();
		return new FailureReportingPage(af);
	}

	/**
	 * Get failure class value
	 * @throws Exception 
	 */
	public String getFailureClass() throws Exception {
		af.waitForElementToBeEnabled(By.id(getClassValue), 2000);
		return af.instantiateComponent(LabelComponent.class, getClassValue).getLabel();
	}

	/**
	 * Click Complete work button
	 * 
	 * @throws Exception
	 */
	public void completeWorkOrder() throws Exception {
		af.waitForElementToBePresent(By.id(completeWorkOrder), 3000);
		af.instantiateComponent(ButtonComponent.class, completeWorkOrder).click();
	}

	/**
	 * Click Complete work button
	 * 
	 * @throws Exception
	 */
	public void completeWorkOrderButton() throws Exception {
		af.waitForElementToBePresent(By.id(completeWorkOrder), 5000);
		af.instantiateComponent(ButtonComponent.class, completeWorkOrder).click();
	}
	
	/**
	 * Check page is report work page
	 * 
	 * @throws Exception
	 */
	public boolean checkCurrentPage() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(reportWorkPage));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Click Complete work button when WORKTYPE.PROMPTDOWN is checked and physical
	 * signature property is set to COMP
	 * 
	 * @throws Exception
	 */
	public void completeWorkSignature() throws Exception {
		af.instantiateComponent(ButtonComponent.class, "gmzj8-pageheader_buttongroup_kyz55").click();
		af.waitForElementToNotBePresent(By.id("gmzj8-pageheader_buttongroup_kyz55"), 5000);
	}

	/**
	 * Check system message when user clicks on Complete work button and asset
	 * status is Down
	 * 
	 * @return String system message
	 * @throws Exception
	 */
	public String getSystemMsg() {
		DialogComponent dc = af.instantiateComponent(DialogComponent.class, systemMsg);
		return dc.getDialogContentText();
	}

	/**
	 * Click 'X' icon to close system message
	 * 
	 * @throws Exception
	 */
	public void closeSystemMsg() throws Exception {
		af.waitForElementToBePresent(By.id(closeSystemMsg), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, closeSystemMsg).click();
	}

	/**
	 * Method to verify toast message
	 * 
	 * @return Toast Title
	 * @throws Exception
	 */
	public String toastMessageDisplayed() throws Exception {
		ToastComponent tc = af.instantiateComponent(ToastComponent.class, toastMessage);
		tc.waitToastPresent();
		logger.info("Toast Title:" + tc.getContentText());
		return tc.getContentText();
	}

	/**
	 * Click on '+' button after 'Tools used' to open 'Add tool' page
	 *
	 * @return AddToolPage
	 * @throws Exception
	 */
	public AddToolPage clickAddToolButton() throws Exception {
		af.waitForElementToBePresent(By.id(toolsAddButton));
		af.instantiateComponent(ButtonComponent.class, toolsAddButton).click();
		logger.info("Tools used + clicked");
		return new AddToolPage(af);
	}

	/**
	 * Click on '+' button to open add labor drawer
	 *
	 * @throws Exception
	 */
	public void clickPlusLaborButton() throws Exception {
		af.instantiateComponent(ButtonComponent.class, addLabor).click();
		af.waitForElementToBePresent(By.id(addLabor), 5000);
	}

	/**
	 * Change labor type
	 * 
	 * @throws Exception
	 */
	public void changeLaborType(WoStatus type) throws Exception {
		af.instantiateComponent(ButtonComponent.class, openLaborType).click();
		af.instantiateComponent(ButtonComponent.class,
				"transTypeLookup_lookup_datalist_LTTYPE|" + type + "_selectionCheckBoxIcon_touch").click();
	}

	/**
	 * Click blue checkmark to save labor record
	 *
	 * @throws Exception
	 */
	public void saveLabor() throws Exception {
		af.instantiateComponent(ButtonComponent.class, saveLabor).click();
		af.waitForElementToNotBePresent(By.id(saveLabor), 5000);
	}

	/**
	 * Click on 'X' to close labor drawer
	 *
	 * @throws Exception
	 */
	public void closeLaborDrawer() throws Exception {
		af.instantiateComponent(ButtonComponent.class, closeLaborDrawer).click();
	}

	/**
	 * Click pencil button to edit labor record
	 *
	 * @throws Exception
	 */
	public void editLabor() throws Exception {
		af.instantiateComponent(ButtonComponent.class, editLabor).click();
	}

	/**
	 * Get start time of started labor transaction
	 * 
	 * @return start time of started labor
	 * @throws Exception
	 */
	public String getStartTime() throws Exception {
		return af.instantiateComponent(LabelComponent.class, startTimeOfStartedLabor).getValue();
	}

	/**
	 * Enter regular hours
	 *
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void regularHours(String hrs, String min) throws Exception {
		af.instantiateComponent(NumberInputComponent.class, hours).typeAndSendDurationHourKey(hrs, Keys.TAB);
		af.instantiateComponent(NumberInputComponent.class, minutes).typeAndSendDurationMinuteKey(min, Keys.TAB);
	}

	/**
	 * Enter start time on labor drawer
	 *
	 * @param hrs
	 * @param min
	 * @throws Exception
	 */
	public void startTime(int hrs, int min) throws Exception {
		((MobileAutomationFramework) af).setTime(By.id(startTime), hrs, min, true);// true means AM
	}

	/**
	 * Get labor name on saved labor record
	 *
	 * @return String labor name
	 */
	public String getLaborName() {
		return af.instantiateComponent(LabelComponent.class, laborName).getLabel();
	}

	/**
	 * Get labor name on saved labor record
	 * 
	 * @return String labor name
	 */
	public String getSecondLaborName() {
		return af.instantiateComponent(LabelComponent.class, secondLaborName).getLabel();
	}

	/**
	 * Is 2nd labor name existing
	 *
	 * @return String labor name
	 */
	public boolean is2ndLaborExisting() {
		try {
			af.waitForElementToBePresent(By.id(secondLaborName), af.DEFAULT_TIMEOUT_MS);
			return true;
		}
		catch(Exception e) {
			return false;
		} 
	}

	/**
	 * Get labor name on labor drawer
	 *
	 * @return String labor name
	 */
	public String getLaborNameOnDrawer() {
		return af.instantiateComponent(LabelComponent.class, laborNameOnDrawer).getLabel();
	}

	/**
	 * Get craft on labor drawer
	 *
	 * @return String craft value
	 */
	public String getLaborCraftOnDrawer() {
		return af.instantiateComponent(LabelComponent.class, craft).getValue();
	}

	/**
	 * Get skill level on labor drawer
	 *
	 * @return String skill level value
	 */
	public String getLaborSkillOnDrawer() {
		return af.instantiateComponent(LabelComponent.class, skillLevel).getValue();
	}

	/**
	 * Get labor start date on saved labor record
	 *
	 * @return String labor start date
	 */
	public String getLaborStartDate() {
		return af.instantiateComponent(LabelComponent.class, laborStartDate).getValue();
	}

	/**
	 * Get labor start time on saved labor record
	 *
	 * @return String labor start time
	 */
	public String getLaborStartTime() throws Exception {
		return af.instantiateComponent(LabelComponent.class, laborStartTime).getValue();
	}

	/**
	 * Get labor end date on saved labor record
	 *
	 * @return String labor end date
	 */
	public String getLaborEndDate() {
		return af.instantiateComponent(LabelComponent.class, laborEndDate).getValue();
	}

	/**
	 * Get labor end time on labor record
	 *
	 * @return String labor end time
	 */
	public String getLaborEndTime() {
		return af.instantiateComponent(LabelComponent.class, laborEndTime).getValue();
	}

	/**
	 * Get labor type on saved labor record
	 *
	 * @return String labor type
	 */
	public String getLaborType() {
		return af.instantiateComponent(LabelComponent.class, laborType).getValue();
	}

	/**
	 * Get labor type on labor drawer
	 *
	 * @return String labor type
	 */
	public String getLaborTypeOnDrawer() {
		return af.instantiateComponent(LabelComponent.class, laborTypeOnDrawer).getValue();
	}

	/**
	 * Get labor time duration on saved labor record
	 *
	 * @return String labor time duration
	 */
	public String getLaborHours() {
		return af.instantiateComponent(LabelComponent.class, laborHours).getValue();
	}

	/**
	 * Get labor start date is auto-filled when user opens add labor drawer
	 *
	 * @return String labor start date
	 */
	public String getStartDate() {
		return af.instantiateComponent(FieldComponent.class, startDateOnLaborDrawer).getValue();
	}

	/**
	 * Click labor chevron to expand
	 *
	 * @param chevronId
	 * @throws Exception
	 */
	public void laborChevron(String chevronId) throws Exception {
		af.waitForElementToBePresent(By.id(chevronId), af.DEFAULT_TIMEOUT_MS * 5);
		DataListComponent dl1 = af.instantiateComponent(DataListComponent.class, chevronId);
		List<DataListItemComponent> list = dl1.getChildrenTouch();
		DataListItemComponent item1 = list.get(0);
		item1.clickCaretTouch();
	}

	/**
	 * Click back chevron to navigate to wo details page
	 *
	 * @throws Exception
	 */
	public void clickBackChevron() throws Exception {
		af.instantiateComponent(ButtonComponent.class, reportPageBackChevron).click();
	}

	/**
	 * Get Materials Name on Used Materials record
	 * 
	 * @return String Materials Name
	 */
	public String getMaterialName() {
		return af.instantiateComponent(LabelComponent.class, materialsName).getValue();

	}

	/**
	 * Get Tools Name on Used Tools record
	 * 
	 * @return String Tools Name
	 */
	public String getToolsName() {
		return af.instantiateComponent(LabelComponent.class, toolsName).getValue();
	}

	/**
	 * Click on Chevron icon to open First labor reported actual time
	 *
	 * @throws Exception
	 */

	public void firstLaborChevron(String chevronId) throws Exception {
		af.waitForElementToBePresent(By.id(chevronId), af.DEFAULT_TIMEOUT_MS * 5);
		DataListComponent dl1 = af.instantiateComponent(DataListComponent.class, chevronId);
		List<DataListItemComponent> list = dl1.getChildrenTouch();
		DataListItemComponent item1 = list.get(0);
		item1.clickCaretTouch();
	}

	/**
	 * click on Chevron icon to open second labor reported actual time
	 *
	 * @throws Exception
	 */

	public void secondLaborChevron(String chevronId) throws Exception {
		af.waitForElementToBePresent(By.id(chevronId), af.DEFAULT_TIMEOUT_MS * 5);
		DataListComponent dl1 = af.instantiateComponent(DataListComponent.class, chevronId);
		List<DataListItemComponent> list = dl1.getChildrenTouch();
		DataListItemComponent item1 = list.get(1);
		item1.clickCaretTouch();
	}

	/**
	 * Get First Labor actual reported work hour
	 *
	 * @return
	 */
	public String getActualLaborhours() {
		return af.instantiateComponent(LabelComponent.class, actualLaborHour).getValue();
	}

	/**
	 * Method to verify Complete work button is disabled or enabled
	 * 
	 * @return boolean
	 * @throws Exception
	 */

	public boolean verifyCompleteWork() throws Exception {
		try {
			af.waitForElementToBeEnabled(By.id(completeWorkOrder));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Click Three Dots to add Material
	 *
	 * @throws Exception
	 */
	public void addMaterialThreeDots() throws Exception {
		af.instantiateComponent(ButtonComponent.class, addMaterialThreeDots).click();
	}

	/**
	 * Click Add Items
	 *
	 * @throws Exception
	 */
	public void addItems() throws Exception {
		af.waitForElementToBePresent(By.id(addItems), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, addItems).click();
	}

	/**
	 * Method to verify any tool is added or not
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifyToolAdded() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(toolAddedIndicator));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Method to verify any material is added or not
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifyMaterialAdded() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(firstMaterial));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Display error message and return
	 * 
	 * @return boolean whether successful
	 * @throws Exception
	 */
	public boolean showErrorPageAndReturn() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(graphite_dialog_error_title));
			af.instantiateComponent(ButtonComponent.class, graphite_dialog_error_close_button).click();
			return true;
		} catch (Exception e) {
			logger.info("Failed: during error page pops up");
			return false;
		}
	}

	/**
	 * Click on 3 dots at materials used
	 *
	 * @throws Exception
	 */
    public void clickOn3Dotsbutton() throws Exception {
        af.instantiateComponent(ButtonComponent.class, btn3DotsAtMaterialsUsed).click();
        af.waitForElementToBePresent(By.id(btn3DotsAtMaterialsUsed), 5000);
    }

    /**
	 * Method to verify Get Reserved items is disabled or enabled
	 *
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifyGetReservedItemsDisabled() throws Exception{
		try {
			af.waitForElementToBeEnabled(By.id(btnGetSelected));
			return true;
		} catch (Exception e) {
			return false;
		}
	}


	/**
	 * Check in Labor pop up, whether Task field is available
	 *
	 * @return
	 */
	public boolean isTaskExistInLabor() {
		return af.isElementExists(By.id(laborTaskChevron));
	}

	/**
	 * In Labor pop up, select a new labor and return
	 *
	 * @param newLabor
	 * @throws Exception
	 */
	public void changeLabor(String newLabor, String newLaborId) throws Exception {
		// click labor search chevron
		af.waitForElementToBePresent(By.id(laborSelectionChevron));
		af.instantiateComponent(ButtonComponent.class, laborSelectionChevron).click();

		// input in text
		af.waitForElementToBePresent(By.id(searchInputLabor));
		TextInputComponent tic = af.instantiateComponent(TextInputComponent.class, searchInputLabor);
		tic.setText(newLabor);
		logger.info("Search value inputed");

		// click search button
		af.waitForElementToBePresent(By.id(laborCheckmark), af.DEFAULT_TIMEOUT_MS * 30);
		ButtonComponent searchButton2 = af.instantiateComponent(ButtonComponent.class, laborCheckmark);
		searchButton2.click();
		String newLaborIdLocation = "laborLookup_lookup_datalist_" + newLaborId + "_selectionCheckBoxIcon_touch";
		af.waitForElementToBePresent(By.id(newLaborIdLocation), 3000);

		// select row to return
		ButtonComponent searchButton3 = af.instantiateComponent(ButtonComponent.class, newLaborIdLocation);
		searchButton3.click();
	}

	
	/**
	 * Method to save button is enabled or disabled 
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifySaveButtonEnabled() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(completeWorkOrder),af.DEFAULT_TIMEOUT_MS * 5);
			af.waitForElementToBeEnabled(By.id(completeWorkOrder));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

    /**
	 * Method to verify if end date exists
	 * 
	 * @return
	 */
	public boolean isDateExist() {
		return af.isElementExists(By.id(endDateLabor));
	}
	
	/**
	 * Method to verify if end time exists
	 * 
	 * @return
	 */
	public boolean isTimeExist() {
		return af.isElementExists(By.id(endTimeLabor));
	}
}