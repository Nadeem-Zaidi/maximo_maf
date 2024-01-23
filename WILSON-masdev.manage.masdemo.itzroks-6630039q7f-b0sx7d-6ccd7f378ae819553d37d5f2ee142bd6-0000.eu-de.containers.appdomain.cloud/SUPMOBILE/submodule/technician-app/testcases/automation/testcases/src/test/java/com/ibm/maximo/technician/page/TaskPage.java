package com.ibm.maximo.technician.page;

import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

import org.openqa.selenium.By;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.api.JdbcConnection;
import com.ibm.maximo.components.AssistCardTemplateComponent;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.DataListComponent;
import com.ibm.maximo.components.DataListItemComponent;
import com.ibm.maximo.components.IconComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.PictogramComponent;
import com.ibm.maximo.components.TagComponent;
import com.ibm.maximo.technician.testcases.TaskTestSuite;


public class TaskPage {
	
	private String taskStatusChangeDropdownLocator = "//*[text()='Waiting on approval']";
	private String selectCompleteTaskIcon = "zd92m_items_COMP_selectionCheckBoxIcon_touch";
	private String saveStatusChangeButton = "//*[@id='kamve_k4vqy']";
	private static final String TaskCompleteButton = "pb_mv[";// +indexnumber+"]"
	private static final String greenCheckMarkLocator = "cnjkdsu6[";// +indexnumber+"]";
	private String assetLocator = "jy394";
	private String locationLocator = "ds_u8";
	private String assetIcon = "wrrn7";
	private String locationIcon = "cs779";
	private String taskStatus = "gxm55_0";
	private String taskTitle = "e9rgg[";
	private String taskTitle2 = "]";
	private String clickStatusChange = "gxm55";
	private String taskBackChevron = "nr2dj-pageheader_breadcrumb_icon";
	private String doneButton = "qajz4";
	private String closeTaskStatus = "taskStatusChangeDialog_button";
	private String taskLongDesc = "q98gxstrippedRichTextViewer_label";
	private String taskText = "jrqqj";
	private static final String taskExpandLocator1 = "q439v_items_";
	private static final String taskExpandLocator2 = "_datalistWrapper";
	private static final String taskAssetName = "jy394_textoverflow_value0";
	private static final String taskAssetDescription = "bgpk2";
	private static final String taskLocationDescription = "pds6r_fieldValue0";
	private static final String taskDescription = "q_k3x[";
	private static final String expandIcon1 = "q439v_items_";
	private static final String expandIcon2 = "_childCaret_touch";
	private static final String pageTitle = "nr2dj-pageheader_title";
	private static final String expandIconClick2 = "_childCaretContainer_touch";
	
	private AbstractAutomationFramework af;
	private JdbcConnection jdbcConnection;

	public TaskPage(AbstractAutomationFramework af) {
		this.af = af;

		Properties props = this.af.getProperties();

		jdbcConnection = new JdbcConnection(props.getProperty("system.maximoDBDriver"),
				props.getProperty("system.maximoDBURL"), props.getProperty("system.maximoDBUsername"),
				props.getProperty("system.maximoDBPassword"));

	}

	// Save Complete status
	public void saveStatusChange() throws Exception {
		af.waitForElementToBePresent(By.xpath(saveStatusChangeButton), af.DEFAULT_TIMEOUT_MS * 2);
		af.waitForElementToBePresent(By.xpath(saveStatusChangeButton), 1).click();
	}

	// Click on Change Status Drawer
	public void taskStatusChange() throws Exception {
		af.waitForElementToBePresent(By.xpath(taskStatusChangeDropdownLocator), af.DEFAULT_TIMEOUT_MS * 5);
		af.waitForElementToBePresent(By.xpath(taskStatusChangeDropdownLocator), 1000).click();
	}

	// Click on Complete status on Change Status Drawer
	public void selectCompleteTaskStatus() throws Exception {
		af.instantiateComponent(ButtonComponent.class, selectCompleteTaskIcon).click();
		af.waitForElementToBePresent(By.id(selectCompleteTaskIcon), 2000);
	}

	// Get blue checkmark on task page
	public String getBlueCheckmarkOnTaskPage(int indexnumber) throws Exception {
		af.waitForElementToBePresent(By.id(pageTitle), 1000);
		return af.instantiateComponent(ButtonComponent.class, TaskCompleteButton + indexnumber + "]")
				.getIconDescription();
	}

	// Get new Status on Task Page
	public String getGreenCheckmarkOnTaskPage(int indexnumber) throws Exception {
		af.waitForElementToBePresent(By.id(pageTitle), 1000);
		return af.instantiateComponent(IconComponent.class, greenCheckMarkLocator + indexnumber + "]").getIconName();
	}

	// Method to get asset Number
	public String getAssetNum() throws Exception {
		af.waitForElementToBePresent(By.id(assetLocator), 2000);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, assetLocator);
		return labelComponent.getLabel();
	}

	// Method to get Location Number
	public String getLocationNum() throws Exception {
		af.waitForElementToBePresent(By.id(locationLocator), 2000);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, locationLocator);
		return labelComponent.getLabel();
	}

	// Get asset icon on task page
	public String getAssetIcon() throws Exception {
		af.waitForElementToBePresent(By.id(assetIcon), 2000);
		return af.instantiateComponent(ButtonComponent.class, assetIcon).getIconDescription();
	}

	// Get location icon on task page
	public String getLocationIcon() {
		return af.instantiateComponent(ButtonComponent.class, locationIcon).getIconDescription();
	}

	/**
	 * Method to get status text on Task Page
	 * 
	 * @return String task status
	 * @throws Exception
	 */
	public String verifyTaskStatus() throws Exception {
		af.waitForElementToBePresent(By.id(taskStatus), 2000);
		return af.instantiateComponent(TagComponent.class, taskStatus).getLabel();
	}

	/**
	 * Method to get click status dropdown on Task Page
	 * 
	 * @return void task status
	 * @throws Exception
	 */
	public void clickTaskStatus() throws Exception {
		af.waitForElementToBePresent(By.id(taskStatus), 5000);
		af.instantiateComponent(LabelComponent.class, taskStatus).click();
	}

	/**
	 * Method to open task status drawer
	 * 
	 * @throws Exception
	 */
	public void openTaskStatusDrawer() throws Exception {
		af.instantiateComponent(ButtonComponent.class, clickStatusChange).click();
	}

	/**
	 * Method to click back chevron to navigate to WO details page
	 * 
	 * @throws Exception
	 */
	public void clickBackChevron() throws Exception {
		af.waitForElementToBePresent(By.id(taskBackChevron), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, taskBackChevron).click();
	}

	/**
	 * Method to complete task
	 * 
	 * @throws Exception
	 */
	public void completeTask(String blueTickId) throws Exception {
		af.waitForElementToBePresent(By.id(blueTickId), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, blueTickId).click();
	}

	/**
	 * Method to click Done button
	 * 
	 * @throws Exception
	 */
	public void clickDone() throws Exception {
		af.waitForElementToBePresent(By.id(doneButton), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, doneButton).click();
	}

	/**
	 * Method to collapse/expand task
	 * 
	 * @param chevronId, index
	 * @throws Exception
	 */
	public void taskChevron(String chevronId, int index) throws Exception {
		af.waitForElementToBePresent(By.id(chevronId), af.DEFAULT_TIMEOUT_MS * 5);
		DataListComponent dl1 = af.instantiateComponent(DataListComponent.class, chevronId);
		List<DataListItemComponent> list = dl1.getChildrenTouch();
		DataListItemComponent item1 = list.get(index);
		item1.clickCaretTouch();
	}

	/**
	 * Method to close task status change drawer
	 * 
	 * @throws Exception
	 */
	public void closeTaskStatusDrawer() throws Exception {
		af.instantiateComponent(ButtonComponent.class, closeTaskStatus).click();
	}

	/**
	 * Method to get task description
	 * 
	 * @param taskDesc
	 * @return String task description
	 */
	public String getTaskDescription(String taskDesc) {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskDesc);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get task long description
	 * 
	 * @return String task long description
	 */
	public String getTaskLongDescription() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskLongDesc);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get lock icon on task
	 * 
	 * @param lockIcon
	 * @return String lock icon description
	 * @throws Exception
	 */
	public String getLockIcon(String lockIcon) throws Exception {
		return af.instantiateComponent(ButtonComponent.class, lockIcon).getIconDescription();
	}

	/**
	 * Method to get text of locked task status
	 * 
	 * @return String task text
	 */
	public String getLockedTaskText() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskText);
		return labelComponent.getLabel();
	}

	/**
	 * Method to get blue checkmark on task
	 * 
	 * @return String blue checkmark icon description
	 * @throws Exception
	 */
	public String getBlueCheckmark(String id) throws Exception {
		af.waitForElementToBePresent(By.id(pageTitle), 12000);
		return af.instantiateComponent(ButtonComponent.class, id).getIconDescription();
	}

	/**
	 * Method to get green checkmark on task
	 * 
	 * @return String green checkmark icon description
	 * @throws Exception
	 */
	public String getGreenCheckmark(String id) throws Exception {
		af.waitForElementToBePresent(By.id(pageTitle), 12000);
		return af.instantiateComponent(ButtonComponent.class, id).getIconDescription();
	}

	/**
	 * Method to verify done is disabled or enabled
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifyDoneButton() throws Exception {
		try {
			af.waitForElementToBeEnabled(By.id(doneButton));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Method to verify if task exists
	 * 
	 * @return boolean is task existent
	 * @throws Exception 
	 */
	public boolean isTaskExists(int taskPosition) throws Exception {
		return af.isElementExists(By.id(taskTitle + taskPosition + taskTitle2));

	}

	/**
	 * Method to get task title
	 *
	 * @return String task title
	 */
	public String getTaskTitle(int taskPosition) {
		return af.instantiateComponent(LabelComponent.class, taskTitle + taskPosition + taskTitle2).getValue();

	}

	/**
	 * Method to verify if task is expanded
	 * 
	 * @return boolean is task expanded (checks by existent ul element when non
	 *         expanded)
	 * @throws Exception 
	 */
	public boolean isTaskExpanded(String wonum, int taskid) throws Exception {
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select workorderid from workorder where taskid = '" + taskid + "'" + " and parent = '" + wonum + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		String value = resultArray1[0] + "";
		af.waitForElementToBePresent(By.id(pageTitle), 12000);
		return !af.isElementExists(By.id(taskExpandLocator1 + value + taskExpandLocator2));
	}

	/**
	 * Method to click Done task button
	 * 
	 * 
	 */

	public void clickDoneTaskButton(int index) throws Exception {
		af.waitForElementToBePresent(By.id(TaskCompleteButton + index + "]"), 12000);
		af.instantiateComponent(LabelComponent.class, TaskCompleteButton + index + "]").click();
	}

	/**
	 * Method to get task asset
	 * 
	 * @return String task asset
	 */
	public String getTaskAssetName() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskAssetName);
		return labelComponent.getValue();
	}

	/**
	 * Method to get task asset description
	 * 
	 * @return String task asset description
	 */
	public String getTaskAssetDescription() throws Exception {
		af.waitForElementToBePresent(By.id(taskAssetDescription), 2000);
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskAssetDescription);
		return labelComponent.getValue();
	}

	/**
	 * Method to get task location description
	 * 
	 * @return String task location description
	 */
	public String getTaskLocationDescription() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskLocationDescription);
		return labelComponent.getValue();
	}

	/**
	 * Method to get task description
	 * 
	 * @return String task description
	 */
	public String getTaskDescription() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, taskDescription);
		return labelComponent.getValue();
	}

	/**
	 * Method to get task description
	 * 
	 * @return String task description
	 */
	public String getTaskPageTitle() {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, pageTitle);
		return labelComponent.getValue();
	}

	/**
	 * Method to get expand task button description
	 * 
	 * @return String description
	 * 
	 */
	public String taskExpandIconValue(String wonum, int taskid) {
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select workorderid from workorder where taskid = '" + taskid + "'" + " and parent = '" + wonum + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		String value = expandIcon1 + resultArray1[0] + expandIcon2;
		PictogramComponent pc = af.instantiateComponent(PictogramComponent.class, value);
		return pc.getAttribute("description");

	}

	/**
	 * Method to get click chevron icon
	 * @throws Exception 
	 * 
	 */
	public void clickTaskExpandIcon(String wonum, int taskid) throws Exception {
		af.waitForElementToBePresent(By.id(pageTitle), 12000);
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select workorderid from workorder where taskid = '" + taskid + "'" + " and parent = '" + wonum + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		String value = expandIcon1 + resultArray1[0] + expandIconClick2;
		af.instantiateComponent(PictogramComponent.class, value).click();
	}

	// Verify if button is secondary
	public boolean verifyCompleteButtonSecondary(int indexnumber) {
		return af.instantiateComponent(AssistCardTemplateComponent.class, TaskCompleteButton + indexnumber + "]")
				.isChevronSecondary();
	}

	// Verify if button is primary
	public boolean verifyCompleteButtonPrimary(int indexnumber) {
		return af.instantiateComponent(AssistCardTemplateComponent.class, TaskCompleteButton + indexnumber + "]")
				.isChevronPrimary();
	}

}
