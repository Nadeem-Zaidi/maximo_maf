package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.ChatLogComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.RichTextEditorComponent;
import com.ibm.maximo.components.TextAreaComponent;
import com.ibm.maximo.technician.setupdata.SetupData.WorkLogType;

public class WorkLogPage {
	private final static Logger logger = LoggerFactory.getLogger(WorkLogPage.class);
	private String chatLogTextInputArea = "g7wpp_ChatLogTextInput";
	private String workLogOnWoListPage0 = "g7wppchatBox_0_borderLayout_sortdesc_slot_bottom";
	private String workLogOnWoListPage1 = "g7wppchatBox_1_borderLayout_sortdesc_slot_bottom";
	private String crossButton = "workLogDrawer_button";
	public String chatLogTitle = "dialog_edit_chatlog_title";
	private String enterLongDescription = "g7wpp_chatLogLongDescriptionField";
	private String expandButton = "g7wppchatLogExpandButton";
    private String backChevronButton = "dialog_edit_chatlog_close_button";
	private String backButton = "dialog_1_close_button";
	private String workLogheader ="g7wpp_chatLogTypeLabel_";
	private String longDescriptionText = "dialog_1_strippedRichTextViewer_richTextViewerReadOnly";
	private String workLogChevronBtn = "g7wppchevronright_1";
	private String saveBtn= "g7wpp_chatLogSendBtnExpanded";
	private String noteSummaryText= "g7wpp_chatLogSummaryField";
	private String saveDiscardPopup= "saveDiscardWorkLog";
	private String saveDiscardPopupLabel= "q93dp";
	private String popupDiscardButton = "saveDiscardWorkLog_button_group_saveDiscardWorkLog_secondary_button";

	private AbstractAutomationFramework af;

	public WorkLogPage(AbstractAutomationFramework af) throws Exception {
		this.af = af;
	}
	
	public void chatLogTextInputAreaPresent()throws Exception {
		af.waitForElementToBePresent(By.id(chatLogTextInputArea));
	}

	/**
	 * Add new log and click submit
	 * 
	 * @param note
	 * @throws Exception
	 */
	public void addANote(String note) throws Exception {
		chatLogTextInputAreaPresent();

		// Add work log in the text area
		TextAreaComponent textArea = af.instantiateComponent(TextAreaComponent.class, chatLogTextInputArea);
		textArea.type(note);
		
        //Verify that technician can enter work log entry using send key
		ChatLogComponent chatLog = af.instantiateComponent(ChatLogComponent.class, "g7wpp_chatLogSendBtn");
		chatLog.sendText();
	}

	/**
	 * Click on 'X' to close the work log drawer
	 * 
	 * @throws Exception
	 * 
	 */
	public void closeDrawer() throws Exception {
		af.waitForElementToBePresent(By.id(crossButton));
		af.instantiateComponent(ButtonComponent.class, crossButton).click();
	}
	
	/**
	 * Click back chevron to go back
	 * 
	 * @throws Exception
	 * 
	 */
	public void clickBackChevron() throws Exception {
		af.waitForElementToBePresent(By.id(backChevronButton));
		af.instantiateComponent(ButtonComponent.class, backChevronButton).click();
	}

	/**
	 * Get first work log on WO list page
	 * 
	 * @return
	 */
	public String getFirstWorkLogOnWoListPage() {
		return af.instantiateComponent(LabelComponent.class, workLogOnWoListPage0).getLabel();
	}

	/**
	 * Get second work log on WO list page
	 * 
	 * @return
	 */
	public String getSecondWorkLogOnWoListPage() {
		return af.instantiateComponent(LabelComponent.class, workLogOnWoListPage1).getLabel();
	}

	/**
	 * Check if has 2nd work log
	 * 
	 * @return
	 */
	public boolean hasSecondWorkLogOnWoListPage() {
		return af.isElementExists(By.id(workLogOnWoListPage1));
	}

	/**
	 * This is generic getTitle method to get string value of element
	 *
	 * @param elementID {string} value of id to get text value of it
	 * @throws Exception
	 */
	public String getTitle(String elementID) throws Exception {
		af.waitForElementToBePresent(By.id(elementID), af.DEFAULT_TIMEOUT_MS * 10);
		String pageTitle = af.instantiateComponent(LabelComponent.class, elementID).text();
		logger.info("pageTitle:" + pageTitle);
		return pageTitle;
	}

	/**
	 * Enter Long Description
	 * 
	 * @param longDescriptionStr
	 * @throws Exception
	 */
	public void enterLongDescription(String longDescriptionStr) throws Exception {
		RichTextEditorComponent richTextEditor = af.instantiateComponent(RichTextEditorComponent.class,
				enterLongDescription);
		richTextEditor.type(longDescriptionStr);
	}

	/**
	 * Method to enter note summary
	 * 
	 * @param summary
	 * @throws Exception
	 */
	public void noteSummary(String summary) throws Exception {
		TextAreaComponent textArea = af.instantiateComponent(TextAreaComponent.class, noteSummaryText);
		textArea.type(summary);
	}

	/**
	 * Method to get text for work log type sub-heading
	 * 
	 * @return
	 * @throws Exception
	 */
	public String workLogType() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, workLogheader);
		return labelComponent.getLabel();
	}

	/**
	 * Method to add work log type
	 * 
	 * @param query
	 * @throws Exception
	 */
	public void addWorkLogType(WorkLogType query) throws Exception {
		String locator = "g7wpp_chatLogTypeList_LOGTYPE|" + query + "_selectionCheckBoxIcon_touch";
		af.instantiateComponent(ButtonComponent.class, locator).click();
	}

	/**
	 * Method to save work log
	 * 
	 * @throws Exception
	 */
	public void saveWorkLog() throws Exception {
		af.instantiateComponent(ButtonComponent.class, saveBtn).click();
	}
	
	/**
	 * Method to click work log chevron
	 * 
	 * @throws Exception
	 */
	public void clickWorkLogChevron() throws Exception {
		af.waitForElementToBePresent(By.id(workLogChevronBtn), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, workLogChevronBtn).click();
	}
	
	/**
	 * Method to verify long description text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String verifyLongDescription() throws Exception {
		RichTextEditorComponent richTextEditor = af.instantiateComponent(RichTextEditorComponent.class,
				longDescriptionText);
		return richTextEditor.getText();	
	}
	
	/**
	 * Method to click back button
	 * 
	 * @throws Exception
	 */
	public void backButton() throws Exception {
		logger.info("click started");
		af.waitForElementToBePresent(By.id(backButton), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, backButton).click();
	}

	/**
	 * Method to click expand button on work log drawer
	 * 
	 * @throws Exception
	 */
	public void clickExpandIcon() throws Exception {
	af.instantiateComponent(ChatLogComponent.class, expandButton).click();
	}
	
	/**
	 * Save/Discard Popup on Worklog
	 * @throws Exception
	 */
	public boolean saveDiscardPopup() throws Exception {
		return af.isElementExists(By.id(saveDiscardPopup));
	}
	
	/**
	 * Method to get text of Save/Discard popup
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getSaveDiscardPopupText() throws Exception {
		LabelComponent labelComponent = af.instantiateComponent(LabelComponent.class, saveDiscardPopupLabel);
		return labelComponent.getLabel();
	}
	
	/**
	 * Method to click discard button on Save Discard Dialog
	 * 
	 * @throws Exception
	 */
	public void clickDiscardButton() throws Exception {
	af.instantiateComponent(ButtonComponent.class, popupDiscardButton).click();
	}
}
