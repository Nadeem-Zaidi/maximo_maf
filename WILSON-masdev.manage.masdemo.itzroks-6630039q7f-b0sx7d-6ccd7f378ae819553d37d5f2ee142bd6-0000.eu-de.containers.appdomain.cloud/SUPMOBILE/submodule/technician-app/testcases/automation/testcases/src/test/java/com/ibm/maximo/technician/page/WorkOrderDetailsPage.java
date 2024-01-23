package com.ibm.maximo.technician.page;

import java.util.List;
import java.util.Properties;

import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.api.JdbcConnection;
import com.ibm.maximo.components.ActionTagComponent;
import com.ibm.maximo.components.BaseComponent;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.IconComponent;
import com.ibm.maximo.components.FieldComponent;
import com.ibm.maximo.components.FilterComponent;
import com.ibm.maximo.components.LabelComponent;
import com.ibm.maximo.components.NumberInputComponent;
import com.ibm.maximo.components.RichTextViewerComponent;
import com.ibm.maximo.components.SearchComponent;
import com.ibm.maximo.components.SlidingDrawerComponent;
import com.ibm.maximo.components.TagComponent;
import com.ibm.maximo.components.TagGroupComponent;
import com.ibm.maximo.components.TextAreaComponent;
import com.ibm.maximo.components.TextInputComponent;
import com.ibm.maximo.components.WrappedTextComponent;
import com.ibm.maximo.technician.framework.TechnicianTest;
import com.ibm.maximo.technician.setupdata.SetupData;
import com.ibm.maximo.technician.setupdata.SetupData.WoStatus;

public class WorkOrderDetailsPage {

	private final static Logger logger = LoggerFactory.getLogger(WorkOrderDetailsPage.class);
	private static AbstractAutomationFramework af;
	private String reportWorkButton = "yyb2k_m5kg3";
	private String backOnMaterialRequestPage = "np3ya-pageheader_breadcrumb_icon";
	private String workLogButton = "yyb2k_v8vmq";
	private String inspectionButton = "yyb2k_vqvzp";
	private String inspectionButtonForTask = "qer7r";
	private String taskListButton = "yyb2k_qdn4v";
	private String followUpWorkButton = "vrry3";
	private String deleteRequest = "w3m6r_y9nde";
	public String infoLocator = "workOrderDetails_1_field_fieldValue0";
	private String startWorkButtonWithTimerIconLocator = "em97_-pageheader_buttongroup_e4ppv_icon";
	private String startWorkButtonWithoutTimerIconLocator = "em97_-pageheader_buttongroup_e5ppv_icon";
	private String stopWorkButtonLocator = "em97_-pageheader_buttongroup_dkqr7";
	private String stopTravelButtonLocator = "em97_-pageheader_buttongroup_mrw6w";
	private String sendButtonLocator = "woConfirmLabTime_button_group_woConfirmLabTime_primary_button";
	private String editWorkOrderDetailsIcon = "a7d9q";
	private String woLongDescription = "richtextViewer-stripped-container";
	private String woAssetNumber = "de6m3";
	private String woStartDate = "x94_6";
	private String woFinishDate = "xb4wa";
	private String woEstimatedTime = "z7rk8";
	private String locationName = "agajd";
	private String woAssetName = "yzqaa";
	private String cartRequestMaterials = "p4wy5";
	private static String description = "mwneb";
	private static String taskDescription = "q_k3x[0]";
	private String priority = "j85kz";
	private String clickStatusChange = "j85kz";
	public final String woEditPageTitle = "bzk2e-pageheader_title";
	public final String reportWorkPageTitle = "gmzj8-pageheader_title";
	public final String taskPageTitle = "nr2dj-pageheader_title";
	private String followUpCount = "vrry3_badge";
	private String requiredDate = "y2wwv";
	private String firstChevronOfRequestedMaterialStatus = "bj_by[0]";
	private String closeButtonDialog = "graphite_unsaved_changes_close_button";
	private String saveSignature = "ybkdb";
	private String changedStatusText = "j85kz_0";
	private String dropToMaterialRequest = "p36pa";
	private String cancelSignature = "sig_controller_signature_pad_close_button";
	private String drawerHeader = "startDrawerContainer_slidingDrawerController";
	private String slidingDrawerCloseButtonLocator = "slidingwodetailsmaterials_button";
	private String signatureHeader = "sig_controller_signature_pad_title";
	private String statusChangeComment = "statusMemo";
	private String saveStatusButton = "vpby__k6v2w";
	private String closeStatusChangeDialog = "woStatusChangeDialog_button";
	public final String taskBreadcrumb = "nr2dj-pageheader_breadcrumb_icon";
	public final String workOrderBreadcrumb = "bzk2e-pageheader_breadcrumb_icon";
	public final String reportWorkBreadcrumb = "gmzj8-pageheader_breadcrumb_icon";
	public final String workOrderHeaderText = "workOrderDetails_1_field";
	private String workLogOnWoDetailsPage = "qj2gechatBox_2_borderLayout_sortdesc_slot_bottom";
	private String workLogCloseDrawer = "woWorkLogDrawer_button";
	private String assetUpDown = "byzkj_vq39q";
	private String sendMaterialRequestIcon = "np3ya-pageheader_buttongroup_qgd4k";
	private String assetDownButton = "assetDownBtn";
	private String assetUpButton = "assetUpBtn";
	private String assetStatusDate = "eynwp_date";
	private String assetStatusTime = "eynwp_time";
	private String closeAssetStatusDrawer = "assetStatusDialog_button";
	private String assetUpWidget = "g9beg";
	private String assetDownWidget = "yb_dp";
	private String materialAndToolTouchpoint = "yyb2k_qg3r9";
	private String specificationTouchpoint = "yx2ky_bl";
	private String closeSpecificationTouchpoint = "woSpecificationDrawer_button";
	private String specificationTitleText = "woSpecificationDrawer_headerLabel";
	private String classificationIdLabelText = "amjbe_fieldValue0";
	private String materialAndToolMenu = "e83zj";
	private String shoppingCart = "e83zj_menu_menu_yr2d5";
	private String addMaterialIcon = "pdy3z";
	private String itemChevron = "r8p38";
	private String saveAddItem = "n6_45_wx583";
	private String saveAssetStatus = "ramrx_k57bp";
	private static String backButton = "em97_-pageheader_breadcrumb_icon";
	private String priorityOnMaterialRequest = "qpyjk";
	public String assetAndLocationSection = "qxpdb";
	private String assetField = "de6m3_fieldValue0";
	private String assetDescriptionField = "yzqaa_fieldValue0";
	private String locationDescriptionField = "agajd_fieldValue0";
	public String assetUpArrow = "g9beg";
	public String assetDownArrow = "yb_dp";
	private String assetUpOrDownButton = "byzkj_vq39q";
	private String confirmAssetStatusButton = "ramrx_k57bp";
	private String multiAssetLocationCIID = "mj9jk[";
	private String multiAssetLocationCIDescription = "b2a7p[";
	private String multiAssetLocationCISectionID = "yex9v_fieldValue0";
	private String multiAssetLocationCISectionDescription = "dvxwq_fieldValue0";
	private String multiAssetLocationCISectionUnspecifiedDescription = "dvxwq_unspecifiedFieldValue0";
	public String multiAssetLocationCISectionMarkCompleteButton = "z3x_2";
	public String multiAssetLocationCISectionUndoButton = "y3zg3";
	private String sendTextinSearchForItem = "itemsListLookup_lookup_datalist_search";
	public static String meterButton = "nmkkk_xqx33";
	public static String assetChevronButton = "p949r";
	public static String assetLocationHistoryButton = "byzkj_vde7k";
	public static String assetLocationHistoryHeader = "assetWorkOrder_2_field_fieldValue0";
	public static String assetLocationHistoryWOTypeID = "dr8ne[";
	public static String assetLocationHistoryWODescription = "q48az[";
	public static String assetLocationHistoryWOUpdated = "zpxg3[";
	public static String assetLocationHistoryWOStatus = "j2626[";
	public static String assetLocationHistoryAssetSection = "kdr4w_items_label1";
	public static String assetLocationHistoryLocationSection = "d_vkm_items_label1";
	private static String backButton2 = "br4m9-pageheader_breadcrumb_icon";
	private String multiID;
	private String startWorkButton = "em97_-pageheader_buttongroup";
	private String taskCount = "yyb2k_qdn4v_badge";
	private static String materialsToolsSlidingDrawerHeaderLabel = "slidingwodetailsmaterials_headerLabel";
	private static String materialsToolsSlidingDrawerMaterialsLabel = "wjw5m_items_label1";
	private static String materialsToolsSlidingDrawerToolsLabel = "d7evr_items_label1";
	private static String materialsSlidingDrawerLabel = "qqjw9[";
	private static String materialsStoreroomSlidingDrawerLabel = "gq94g[";
	private static String materialsQtySlidingDrawerLabel = "k9v2m[";
	private static String toolsSlidingDrawerLabel = "zx8nb[";
	private static String toolsHoursSlidingDrawerLabel1 = "g2zdd[";
	private static String toolsHoursSlidingDrawerLabel2 = "]_fieldValue0";
	private static String toolsStoreroomSlidingDrawerLabel = "dv3k6[";
	private static String toolsQtySlidingDrawerLabel = "zbn73[";
	private static String materialRequestAddItemSlidingDrawerQuantityInput = "g_ywm";
	private static String chevronOfRequestedMaterialStatus = "bj_by[";
	private static String materialRequestNumberLabel1 = "pajny[";
	private static String materialRequestDateLabel1 = "mmznz[";
	private static String materialRequestStatusLabel1 = "rwna4[";
	private static String materialRequestNumberLabel2 = "]_fieldValue0";
	private static String materialListItemLabel1 = "vqa2a[";
	private static String materialListItemLabel2 = "]_fieldValue0";
	private static String materialListStoreroomLabel1 = "jy68n[";
	private static String materialListStoreroomLabel2 = "]_fieldValue0";
	private static String materialListUnspecifiedStoreroomLabel1 = "jy68n[";
	private static String materialListUnspecifiedStoreroomLabel2 = "]_unspecifiedFieldValue0";
	private static String materialListQuantityLabel = "qvypz[";
	private static String materialListItemChevron = "q34za[";
	private static String materialRequestFirstItemChevron = "q34za[0]";	
    private static String addItemCloseDrawer = "AddItemDrawer_button";	
    public final String historyIcon = "byzkj_vde7k";	
    public final String historyBackIcon = "br4m9-pageheader_breadcrumb_icon";	
    private final String workOrderDetailsContent = "workOrderDetails_content";	
	// meter readings
	private String meterTouchPad = "byzkj_xpvzw";
	private JdbcConnection jdbcConnection;
	
	
	/**
	 * Check page is work order details page
	 * 
	 * @throws Exception
	 */
	public boolean checkCurrentPage() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(workOrderDetailsContent));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public WorkOrderDetailsPage(AbstractAutomationFramework af) {
		WorkOrderDetailsPage.af = af;

		Properties props = WorkOrderDetailsPage.af.getProperties();

		jdbcConnection = new JdbcConnection(props.getProperty("system.maximoDBDriver"),
				props.getProperty("system.maximoDBURL"), props.getProperty("system.maximoDBUsername"),
				props.getProperty("system.maximoDBPassword"));
	}

	/**
	 * Method for clicking on Asset Location History button
	 *
	 * @throws Exception
	 */
	public void clickAssetLocationHistoryButton() throws Exception {
		this.clickButton(assetLocationHistoryButton);
	}

	/**
	 * Method to get Asset Location History Header
	 * 
	 * @return assetLocationHistoryHeader
	 * @throws Exception
	 */
	public String getAssetLocationHistoryWOHeader() throws Exception {
		af.waitForElementToBePresent(By.id(assetLocationHistoryHeader));
		return af.instantiateComponent(LabelComponent.class, assetLocationHistoryHeader).getValue();

	}
	
	/**
	 * Method to get Work Order Details Header
	 * 
	 * @return workOrderDetailsHeader
	 * @throws Exception
	 */
	public String getWoDtlsWOHeader() throws Exception {
		af.waitForElementToBePresent(By.id(infoLocator));
		return af.instantiateComponent(LabelComponent.class, infoLocator).getValue();

	}

	/**
	 * Method to get Text Tap the cart to request materials.
	 * 
	 * @return Text : Tap the cart to request materials.
	 * @throws Exception
	 */
	public String getCartRequestMaterials() throws Exception {
		af.waitForElementToBePresent(By.id(cartRequestMaterials));
		return af.instantiateComponent(LabelComponent.class, cartRequestMaterials).getValue();

	}

	/**
	 * Method to get Work Order Type and ID
	 * 
	 * @param position
	 * @return assetLocationHistoryWOTypeID
	 * @throws Exception
	 */
	public String getAssetLocationHistoryWOTypeID(int position) throws Exception {
		af.waitForElementToBePresent(By.id(assetLocationHistoryWOTypeID + position + "]"));
		return af.instantiateComponent(LabelComponent.class, assetLocationHistoryWOTypeID + position + "]").getValue();

	}

	/**
	 * Method to get Work Order Description
	 * 
	 * @param position
	 * @return assetLocationHistoryWODescription
	 * @throws Exception
	 */
	public String getAssetLocationHistoryWODescription(int position) throws Exception {
		af.waitForElementToBePresent(By.id(assetLocationHistoryWODescription + position + "]"));
		return af.instantiateComponent(LabelComponent.class, assetLocationHistoryWODescription + position + "]")
				.getValue();

	}

	/**
	 * Method to get Work Order Status
	 * 
	 * @param position
	 * @return assetLocationHistoryWOStatus
	 * @throws Exception
	 */
	public String getAssetLocationHistoryWOStatus(int position) throws Exception {
		af.waitForElementToBePresent(By.id(assetLocationHistoryWOStatus + position + "]_0"));
		return af.instantiateComponent(LabelComponent.class, assetLocationHistoryWOStatus + position + "]_0")
				.getValue();

	}

	/**
	 * Method for clicking on work log button
	 *
	 * @return ReportWorkPage
	 * @throws Exception
	 */
	public ReportWorkPage clickWorkLogButton() throws Exception {
		this.clickButton(workLogButton);
		return new ReportWorkPage(af);
	}

	/**
	 * Method for clicking on inspection button
	 *
	 * @return InspectionPage
	 * @throws Exception
	 */
	public InspectionsPage clickInspectionButton() throws Exception {
		af.waitForElementToBePresent(By.id(inspectionButton));
		clickButton(inspectionButton);
		return new InspectionsPage(af);
	}
	
	// Get work log on WO details page
	public String getWorkLogOnWoDetailsPage() {
		return af.instantiateComponent(LabelComponent.class, workLogOnWoDetailsPage).getLabel();
	}

	/**
	 * Method for clicking on Asset Up or Down button
	 *
	 * @throws Exception
	 */
	public void clickAssetUpOrDownButton() throws Exception {
		af.waitForElementToBePresent(By.id(assetUpOrDownButton));
		clickButton(assetUpOrDownButton);

	}

	/**
	 * Method for clicking on Asset Down button
	 *
	 * @throws Exception
	 */
	public void clickAssetDownButton() throws Exception {
		af.waitForElementToBePresent(By.id(assetDownButton));
		clickButton(assetDownButton);

	}

	/**
	 * Method for clicking on Meter button
	 *
	 * @throws Exception
	 */
	public void clickMeterButton() throws Exception {
		af.waitForElementToBePresent(By.id(meterButton));
		clickButton(meterButton);

	}

	/**
	 * Method for clicking on Confirm Asset Status button
	 *
	 * @throws Exception
	 */
	public void clickConfirmAssetStatusButton() throws Exception {
		af.waitForElementToBePresent(By.id(confirmAssetStatusButton));
		clickButton(confirmAssetStatusButton);

	}

	/**
	 * Method to get on Multi Asset Location CI ID
	 * 
	 * @param position
	 * @return
	 * @throws Exception
	 */
	public String getMultiAssetLocationCIID(int position) throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCIID + position + "]"));
		return af.instantiateComponent(LabelComponent.class, multiAssetLocationCIID + position + "]").getValue();

	}

	/**
	 * Method to get Multi Asset Location CI Description
	 * 
	 * @param position
	 * @return
	 * @throws Exception
	 */
	public String getMultiAssetLocationCIDescription(int position) throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCIDescription + position + "]"));
		return af.instantiateComponent(LabelComponent.class, multiAssetLocationCIDescription + position + "]")
				.getValue();

	}

	/**
	 * Method to get Multi Asset Location CI Description
	 * 
	 * @param position
	 * @return
	 * @throws Exception
	 */
	public String getMultiAssetLocationCISectionID() throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCISectionID));
		return af.instantiateComponent(LabelComponent.class, multiAssetLocationCISectionID).getValue();

	}

	/**
	 * Method to get Multi Asset Location CI Description
	 * 
	 * @param position
	 * @return
	 * @throws Exception
	 */
	public String getMultiAssetLocationCISectionDescription() throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCISectionDescription));
		return af.instantiateComponent(LabelComponent.class, multiAssetLocationCISectionDescription).getValue();

	}

	/**
	 * Method to get Multi Asset Location CI Description
	 * 
	 * @param position
	 * @return
	 * @throws Exception
	 */
	public String getMultiAssetLocationCISectionUnspecifiedDescription() throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCISectionUnspecifiedDescription));
		return af.instantiateComponent(LabelComponent.class, multiAssetLocationCISectionUnspecifiedDescription)
				.getValue();

	}

	/**
	 * Method for clicking on Multi Asset Location CI section
	 * 
	 * @param woNum
	 * @param column
	 * @param iD
	 * @throws Exception
	 */
	public void clickMultiAssetLocationCISection(String woNum, String column, String iD) throws Exception {
		Object[] resultsObjects = TechnicianTest.jdbcConnection
				.executeSQL("select multiid from multiassetlocci where recordkey = '" + woNum + "' and " + column
						+ " = '" + iD + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		multiID = resultArray1[0] + "";
		af.waitForElementToBePresent(By.id("g84j2_items_" + multiID + "_childCaretContainer_touch"));
		af.instantiateComponent(ButtonComponent.class, "g84j2_items_" + multiID + "_childCaretContainer_touch").click();

	}

	/**
	 * Method for clicking on Mark Complete in Multi Asset Location CI section
	 *
	 * @throws Exception
	 */
	public void clickMarkCompleteInMultiAssetLocationCISection() throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCISectionMarkCompleteButton));
		af.instantiateComponent(ButtonComponent.class, multiAssetLocationCISectionMarkCompleteButton).click();

	}

	/**
	 * Method for clicking on Undo in Multi Asset Location CI section
	 *
	 * @throws Exception
	 */
	public void clickUndoInMultiAssetLocationCISection() throws Exception {
		af.waitForElementToBePresent(By.id(multiAssetLocationCISectionUndoButton));
		af.instantiateComponent(ButtonComponent.class, multiAssetLocationCISectionUndoButton).click();

	}

	/**
	 * Method for clicking on inspection button for Tasks
	 *
	 * @return InspectionPage
	 * @throws Exception
	 */
	public InspectionsPage clickInspectionButtonForTasks() throws Exception {
		af.waitForElementToBePresent(By.id(inspectionButtonForTask));
		clickButton(inspectionButtonForTask);
		return new InspectionsPage(af);
	}

	/**
	 * Method for clicking on report work button
	 *
	 * @return ReportWorkPage
	 * @throws Exception
	 */
	public ReportWorkPage clickReportWorkButton() throws Exception {
		this.clickButton(reportWorkButton);
		af.waitForElementToNotBePresent(By.id(reportWorkButton), 2000);
		return new ReportWorkPage(af);
	}

	/**
	 * Method for clicking on task button
	 *
	 * @return TaskPage
	 * @throws Exception
	 */
	public TaskPage clickTaskButton() throws Exception {
		/*
		 * NOTE: click will be intercepted but works normally
		 */
		this.clickButton(taskListButton);
		af.waitForElementToNotBePresent(By.id(taskListButton), 5000);
		return new TaskPage(af);
	}

	/**
	 * Method checking task button displayed
	 *
	 * @return boolean
	 * @throws Exception
	 */
	public boolean taskTouchPointDisplayed() throws Exception {
		return af.isElementExists(By.id(taskListButton));
	}

	/**
	 * Method to get the header info on Work Order Details Page
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getInfo() throws Exception {
		return af.instantiateComponent(LabelComponent.class, infoLocator).getLabel();
	}

	/**
	 * Get stop work icon description
	 * 
	 * @return
	 */
	public String getStopWorkButtonText() {
		return af.instantiateComponent(ButtonComponent.class, stopWorkButtonLocator).getIconDescription();
	}

	
	/**
	 * Get start work button with Timer icon name
	 * 
	 * @return name for start button icon with timer
	 */
	public String getStartWorkTimerButtonIcon() {
		return af.instantiateComponent(IconComponent.class, startWorkButtonWithTimerIconLocator).getIconName();
	}
	
	/**
	 * Get start work button without Timer icon name
	 * 
	 * @return the name for start button icon without timer
	 */
	public String getStartWorkWithoutTimerButtonIcon() {
		return af.instantiateComponent(IconComponent.class, startWorkButtonWithoutTimerIconLocator).getIconName();
	}

	/**
	 * Get stop travel icon description
	 * 
	 * @return
	 */
	public String getStopTravelButtonText() {
		return af.instantiateComponent(ButtonComponent.class, stopTravelButtonLocator).getIconDescription();
	}
	
    //CLick Send Button on Labor Transaction
	public void clickSendButton() {
		af.instantiateComponent(ButtonComponent.class, sendButtonLocator).click();
	}

	// Click on start travel button
	public void clickStopTravelButton() {
		af.instantiateComponent(ButtonComponent.class, stopTravelButtonLocator).click();
	}

	/**
	 * Method for clicking on Edit Work Order button
	 *
	 * @return WorkOrderDetailsPage
	 * @throws Exception
	 */
	public WorkOrderDetailsPage editWorkOrderDetails() throws Exception {
		this.clickButton(editWorkOrderDetailsIcon);
		return new WorkOrderDetailsPage(af);
	}

	/**
	 * Method for clicking on back to Work Order List
	 * 
	 * @throws Exception
	 */
	public static void clickBackWOList() throws Exception {
		if (af.isElementExists(By.id(backButton))) {
			af.instantiateComponent(ButtonComponent.class, backButton).click();
		} else {
			af.instantiateComponent(ButtonComponent.class, backButton2).click();
		}
	}

	/**
	 * This is generic reusable method to click button
	 *
	 * @param buttonId {string} value of id where click element
	 * @throws Exception
	 */
	public void clickButton(String buttonId) throws Exception {
		af.waitForElementToBePresent(By.id(buttonId),12000);
		af.instantiateComponent(ButtonComponent.class, buttonId).click();
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
	 * Get work order description
	 * 
	 * @return String
	 * @throws Exception
	 */
	public static String getTextWODescription() throws Exception {
		return af.instantiateComponent(WrappedTextComponent.class, description).getParentLabel();
	}

	/**
	 * Get task description
	 * 
	 * @return String
	 * @throws Exception
	 */
	public static String getTextTaskDescription() throws Exception {
		return af.instantiateComponent(LabelComponent.class, taskDescription).getValue();
	}

	/**
	 * Get work order priority
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOPriority() throws Exception {
		List<TagComponent> tagList = af.instantiateComponent(TagGroupComponent.class, priority).tagsList();
		return tagList.get(0).getLabel();
	}

	/**
	 * Get work order type
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOType() throws Exception {
		WrappedTextComponent wrappedText = af.instantiateComponent(WrappedTextComponent.class, description);
		return wrappedText.getSubLabel();
	}

	/**
	 * Get Work order Asset Number
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOAssetNum() throws Exception {
		return af.instantiateComponent(FieldComponent.class, woAssetNumber).getValue();
	}

	/**
	 * Get work order Asset Name
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOAssetName() throws Exception {
		return af.instantiateComponent(FieldComponent.class, woAssetName).getValue();
	}

	/**
	 * Get Work order location Name
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOLocationName() throws Exception {
		return af.instantiateComponent(FieldComponent.class, locationName).getValue();
	}

	/**
	 * Get Work order Estimated time
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOEstimated() throws Exception {
		return af.instantiateComponent(FieldComponent.class, woEstimatedTime).getValue();
	}

	/**
	 * Get work order start date
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOStart() throws Exception {
		return af.instantiateComponent(FieldComponent.class, woStartDate).getValue();
	}

	/**
	 * Get Work order finish date
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOFinish() throws Exception {
		return af.instantiateComponent(FieldComponent.class, woFinishDate).getValue();
	}

	/**
	 * Get Work order Long Description
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getTextWOLongDescription() throws Exception {
		RichTextViewerComponent richTextView = af.instantiateComponent(RichTextViewerComponent.class,
				woLongDescription);
		return richTextView.getRichTextViewerStrippedDescription();
	}

	/**
	 * Click on Follow-up work button
	 * 
	 * @return Follow-up work page
	 * @throws Exception
	 */
	public FollowUpWorkPage clickFollowUpWorkButton() throws Exception {
		this.clickButton(followUpWorkButton);
		af.waitForElementToNotBePresent(By.id(followUpWorkButton), 5000);
		return new FollowUpWorkPage(af);
	}

	/**
	 * Method to verify follow-up count
	 * 
	 * @param count
	 * @return follow-up count
	 * @throws Exception
	 */
	public String followUpCountDisplay(String count) throws Exception {
		af.waitForElementToBePresent(By.id(followUpCount), af.DEFAULT_TIMEOUT_MS * 2);
		FilterComponent tag = af.instantiateComponent(FilterComponent.class, followUpCount);
		return tag.getTagCount();
	}

	/**
	 * Method to open WO status drawer
	 * 
	 * @throws Exception
	 */
	public void openWOStatusDrawer() throws Exception {
		af.waitForElementToBePresent(By.id(clickStatusChange), af.DEFAULT_TIMEOUT_MS * 10);
		af.instantiateComponent(ButtonComponent.class, clickStatusChange).click();
	}

	/**
	 * Method to get Drawer Header
	 * 
	 * @return header label
	 * @throws Exception
	 */
	public String getChangeStatusDrawerHeader() throws Exception {
		return af.instantiateComponent(SlidingDrawerComponent.class, drawerHeader).getHeaderLabel();
	}

	/**
	 * Method to close status change dialog
	 * 
	 * @throws Exception
	 */
	public void closeStatusChangeDialog() throws Exception {
		af.instantiateComponent(ButtonComponent.class, closeStatusChangeDialog).click();
	}

	/**
	 * Method to select status
	 * 
	 * @param query
	 * @throws Exception
	 */
	public void selectStatus(WoStatus query) throws Exception {
		String locator = "z4q5w_items_" + query + "_selectionCheckBoxIcon_touch";
		af.instantiateComponent(ButtonComponent.class, locator).click();
	}

	/**
	 * Method to save new status
	 * 
	 * @throws Exception
	 */
	public void saveStatusChange() throws Exception {
		af.instantiateComponent(ButtonComponent.class, saveStatusButton).click();
	}

	/**
	 * Method to save status change when signature enabled
	 * 
	 * @throws Exception
	 */
	public void saveSignatureButton() throws Exception {
		af.waitForElementToBeEnabled(By.id(saveSignature), 3000);
		af.instantiateComponent(ButtonComponent.class, saveSignature).click();
	}

	/**
	 * Method to enter comment while changing status
	 * 
	 * @param descriptionStr
	 * @throws Exception
	 */
	public void addCommentWOStatusChange(String descriptionStr) throws Exception {
		af.waitForElementToBePresent(By.id(statusChangeComment), af.DEFAULT_TIMEOUT_MS * 5);
		TextAreaComponent textArea = af.instantiateComponent(TextAreaComponent.class, statusChangeComment);
		textArea.type(descriptionStr);
	}

	/**
	 * Method to enter Drop to address
	 * 
	 * @param address
	 * @throws Exception
	 */
	public void dropToMaterialRequest(String address) throws Exception {
		af.waitForElementToBePresent(By.id(dropToMaterialRequest));
		af.instantiateComponent(TextInputComponent.class, dropToMaterialRequest).setText(address);
	}

	/**
	 * Method to cancel signature prompt
	 * 
	 * @throws Exception
	 */
	public void signatureCancel() throws Exception {
		af.instantiateComponent(ButtonComponent.class, cancelSignature).click();
	}

	/**
	 * Method to get signature page header
	 * 
	 * @return header text
	 * @throws Exception
	 */
	public String signatureHeaderText() throws Exception {
		af.waitForElementToBePresent(By.id(signatureHeader), 2000);
		return af.instantiateComponent(ButtonComponent.class, signatureHeader).getText();
	}

	/**
	 * Method to get status text on WO Details Page
	 * 
	 * @return
	 * @throws Exception
	 */
	public String verifyChangedStatus() throws Exception {
		af.waitForElementToBePresent(By.id(changedStatusText), 2000);
		return af.instantiateComponent(TagComponent.class, changedStatusText).getLabel();
	}
	
	/**
	 * Method to get Specification Drawer Title Text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String specificationTitle() throws Exception {
		af.waitForElementToBePresent(By.id(specificationTitleText), 2000);
		return af.instantiateComponent(TagComponent.class, specificationTitleText).getLabel();
	}
	
	/**
	 * Method to get classificationid Text
	 * 
	 * @return
	 * @throws Exception
	 */
	public String classificationIdText() throws Exception {
		af.waitForElementToBePresent(By.id(classificationIdLabelText), 2000);
		return af.instantiateComponent(TagComponent.class, classificationIdLabelText).getLabel();
	}
	

	/**
	 * Open asset status drawer
	 * 
	 * @return
	 * @throws Exception
	 */
	public void openAssetStatusDrawer() throws Exception {
		af.waitForElementToBePresent(By.id(assetUpDown), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, assetUpDown).click();
	}

	/**
	 * Click on blue tick to save asset status
	 * 
	 * @return
	 * @throws Exception
	 */
	public void saveAssetStatus() throws Exception {
		af.waitForElementToBePresent(By.id(saveAssetStatus), af.DEFAULT_TIMEOUT_MS * 5);
		af.instantiateComponent(ButtonComponent.class, saveAssetStatus).click();
	}

	/**
	 * Click on 'X' icon to close Asset Status drawer
	 * 
	 * @return
	 */
	public void closeAssetStatusDrawer() {
		af.instantiateComponent(ButtonComponent.class, closeAssetStatusDrawer).click();
	}

	/**
	 * Click on asset up arrow
	 * 
	 * @return
	 */
	public void clickAssetUpButton() {
		af.instantiateComponent(ButtonComponent.class, assetUpButton).click();
	}

	/**
	 * Check fields are removed when user clicks on Up arrow
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean validateFields() throws Exception {
		try {
			af.waitForElementToBePresent(By.id("eynwp"));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Check add Materials displayed on Material Request
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean addMaterialsDisplayed() throws Exception {
		return af.isElementExists(By.id("noDataWrapper"));
	}

	/**
	 * Method to get value of Priority Material Request
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getPriorityMaterialRequestValue() throws Exception {
		return af.instantiateComponent(TextInputComponent.class, priorityOnMaterialRequest).getContents();
	}

	/**
	 * Method to get value of Drop to Material Request
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getDropToMaterialRequestValue() throws Exception {
		return af.instantiateComponent(TextInputComponent.class, dropToMaterialRequest).getContents();
	}

	/**
	 * Check send Material Request Enabled
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean sendMaterialRequestEnabled() throws Exception {
		try {
			af.waitForElementToBeEnabled(By.id(sendMaterialRequestIcon), 1);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Enter asset status date on asset status drawer
	 * 
	 * @param year
	 * @param month
	 * @param date
	 * @throws Exception
	 */
	public void enterAssetStatusDate(int year, int month, int date) throws Exception {
		af.waitForElementToBePresent(By.id(assetStatusDate), af.DEFAULT_TIMEOUT_MS * 7);
		((MobileAutomationFramework) af).setDate(By.id(assetStatusDate), year, month, date);
	}

	/**
	 * Enter asset status time on asset status drawer
	 * 
	 * @param hrs
	 * @param mins
	 * @throws Exception
	 */
	public void enterAssetStatusTime(int hrs, int mins) throws Exception {
		((MobileAutomationFramework) af).setTime(By.id(assetStatusTime), hrs, mins, true);// false means PM , true means AM
	}

	/**
	 * Get asset up status
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getAssetUpStatus() throws Exception {
		af.waitForElementToBePresent(By.id(assetUpWidget), af.DEFAULT_TIMEOUT_MS * 3);
		return af.instantiateComponent(ActionTagComponent.class, assetUpWidget).getLabel();
	}

	/**
	 * Get asset down status
	 * 
	 * @return String
	 * @throws Exception
	 */
	public String getAssetDownStatus() throws Exception {
		af.waitForElementToBePresent(By.id(assetDownWidget), af.DEFAULT_TIMEOUT_MS * 3);
		return af.instantiateComponent(ActionTagComponent.class, assetDownWidget).getLabel();
	}

	/**
	 * Check error message on asset status drawer
	 * 
	 * @return String error message
	 * @throws Exception
	 */
	public String getErrorMsg() throws Exception {
		af.waitForElementToBePresent(By.id(assetStatusDate), af.DEFAULT_TIMEOUT_MS * 5);
		return af.instantiateComponent(TextInputComponent.class, assetStatusDate).getErrorMessage();
	}

	/**
	 * Method to get Asset ID
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAssetID() throws Exception {
		af.waitForElementToBePresent(By.id(assetField), 2000);
		return af.instantiateComponent(LabelComponent.class, assetField).getLabel();
	}

	/**
	 * Method to get Asset Description
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAssetDescription() throws Exception {
		af.waitForElementToBePresent(By.id(assetDescriptionField), 2000);
		return af.instantiateComponent(LabelComponent.class, assetDescriptionField).getLabel();
	}

	/**
	 * Method to get Location Description
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getLocationDescription() throws Exception {
		af.waitForElementToBePresent(By.id(locationDescriptionField), 2000);
		return af.instantiateComponent(LabelComponent.class, locationDescriptionField).getLabel();
	}

	/**
	 * Method to get Asset Up Arrow
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAssetUpArrow() throws Exception {
		af.waitForElementToBePresent(By.id(assetUpArrow), 2000);
		return af.instantiateComponent(TagComponent.class, assetUpArrow).getLabel();
	}

	/**
	 * Method to get Asset Down Arrow
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAssetDownArrow() throws Exception {
		af.waitForElementToBePresent(By.id(assetDownArrow), 2000);
		return af.instantiateComponent(TagComponent.class, assetDownArrow).getLabel();
	}

	/**
	 * Method for clicking on Asset right chevron button
	 *
	 * @throws Exception
	 */
	public void clickAssetChevronButton() throws Exception {
		af.waitForElementToBePresent(By.id(assetChevronButton));
		clickButton(assetChevronButton);
	}

	/**
	 * Method for clicking on Material and Tool Menu then menu will be open
	 *
	 * @throws Exception
	 */
	public void clickMaterialAndToolMenu() throws Exception {
		af.waitForElementToBeEnabled(By.id(materialAndToolMenu));
		clickButton(materialAndToolMenu);
	}

	/**
	 * Method for clicking on shoppingCart Request Materials
	 *
	 * @throws Exception
	 */
	public void clickShoppingCart() throws Exception {
		clickButton(shoppingCart);
	}

	/**
	 * Method for clicking on Add Materials Icon
	 *
	 * @throws Exception
	 */
	public void clickAddMaterialIcon() throws Exception {
		clickButton(addMaterialIcon);
	}

	/**
	 * Method for clicking on Add Materials Icon
	 *
	 * @throws Exception
	 */
	public void clickSaveAddItem() throws Exception {
		clickButton(saveAddItem);
	}

	/**
	 * Method for clicking on First Chevron Of Requested Material Status
	 *
	 * @throws Exception
	 */
	public void firstChevronOfRequestedMaterialStatus() throws Exception {
		af.waitForElementToBePresent(By.id(firstChevronOfRequestedMaterialStatus), 3000);
		clickButton(firstChevronOfRequestedMaterialStatus);
	}

	/**
	 * Method for verify that First Chevron Of Requested Material Status is
	 * displayed on Materials and tools
	 *
	 * @throws Exception
	 */
	public boolean verifyFirstRequestedMaterialStatus() throws Exception {
		logger.info("Verifying First Chevron of Requested Material Status");
		try {
			af.waitForElementToNotBePresent(By.id(sendMaterialRequestIcon), af.DEFAULT_TIMEOUT_MS * 5);
			af.waitForElementToNotBePresent(By.id(deleteRequest), af.DEFAULT_TIMEOUT_MS * 5);
			af.waitForElementToBePresent(By.id(firstChevronOfRequestedMaterialStatus), af.DEFAULT_TIMEOUT_MS * 5);
			return af.isElementExists(By.id(firstChevronOfRequestedMaterialStatus));
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Method for clicking on Delect Request
	 *
	 * @throws Exception
	 */
	public void deleteRequest() throws Exception {
		clickButton(deleteRequest);
	}

	/**
	 * Enter required date under Required details of Material request
	 * 
	 * @param year
	 * @param month
	 * @param date
	 * @throws Exception
	 */
	public void requiredDateUnderRequiredDetailsOfMaterialRequest(int year, int month, int date) throws Exception {
		((MobileAutomationFramework) af).setDate(By.id(requiredDate), year, month, date);
	}

	/**
	 * Method for clicking on send Material Request
	 *
	 * @throws Exception
	 */
	public void sendMaterialRequest() throws Exception {
		clickButton(sendMaterialRequestIcon);
	}

	/**
	 * Method for clicking on planned materials and tools touchpoint
	 *
	 * @throws Exception
	 */
	public void clickMaterialAndToolTouchpoint() throws Exception {
		clickButton(materialAndToolTouchpoint);
	}
	
	/**
	 * Method for closing materials and tools sliding drawer
	 *
	 * @throws Exception
	 */
	public void clickSlidingDrawerCloseButton() throws Exception {
		clickButton(slidingDrawerCloseButtonLocator);
	}
	
	
	/**
	 * Method for clicking on specification touchpoint
	 *
	 * @throws Exception
	 */
	public void clickSpecificationTouchpoint() throws Exception {
		clickButton(specificationTouchpoint);
	}
	
	/**
	 * Method for clicking on close specification touchpoint
	 *
	 * @throws Exception
	 */
	public void closeSpecificationTouchpoint() throws Exception {
		clickButton(closeSpecificationTouchpoint);
	}

	/**
	 * Method for clicking on item Chevron
	 *
	 * @throws Exception
	 */
	public void clickItemChevron() throws Exception {
		clickButton(itemChevron);
	}

	/**
	 * Method for clicking on Back breadcrumb icon on Material Request
	 *
	 * @throws Exception
	 */
	public void clickBackBreadcrumbIconOnMaterialRequest() throws Exception {
		clickButton(backOnMaterialRequestPage);
	}

	/**
	 * Method for clicking on close button dialog
	 *
	 * @throws Exception
	 */
	public void clickCloseButtonDialog() throws Exception {
		clickButton(closeButtonDialog);
	}

	/**
	 * Method for verify that save and discard dialog box displayed
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean verifySaveAndDiscardDialog() throws Exception {
		return af.isElementExists(
				By.id("graphite_unsaved_changes_button_group_graphite_unsaved_changes_secondary_button")) // discard
				&& af.isElementExists(
						By.id("graphite_unsaved_changes_button_group_graphite_unsaved_changes_primary_button")) // save
				&& af.isElementExists(By.id("graphite_unsaved_changes_title")); // Save or discard changes?
	}

	/**
	 * Method to Search Item
	 * 
	 * @param itemNum , itemId
	 * @return true if searched Item was found otherwise false
	 * @throws Exception
	 */
	public boolean searchForItemAndSelectItem(String itemNum, String itemId) throws Exception {
		try {
			af.waitForElementToBePresent(By.id(sendTextinSearchForItem));
			af.instantiateComponent(ButtonComponent.class, sendTextinSearchForItem).click();
			SearchComponent searchField = af.instantiateComponent(SearchComponent.class, sendTextinSearchForItem);
			// TODO clear field to be removed after fixing defect GRAPHITE-54792 -
			// [Technician] - Select Item Search field from Work Order Page > Materials and
			// Tools > Request Materials > Add Item is pre-populated with previous entry
			if (searchField.hasClearSearchButton()) {
				searchField.clearSearch();
			}

			searchField.typeAndSendEnterKey(itemNum);
			logger.info("locator >" + "itemsListLookup_lookup_datalist_" + itemId + "_selectionCheckBoxIcon_touch");
			af.waitForElementToBePresent(
					By.id("itemsListLookup_lookup_datalist_" + itemId + "_selectionCheckBoxIcon_touch")).click();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Wait for Start Work button Enabled
	 * 
	 * @return boolean
	 * @throws Exception
	 */
	public boolean startWorkButtonEnabled() throws Exception {
		return af.waitForElementToBeEnabled(By.id(startWorkButton), af.DEFAULT_TIMEOUT_MS * 3);
	}

	/**
	 * Click Start Work button
	 * 
	 * @throws Exception
	 */
	public void clickStartWorkButton() throws Exception {
		af.waitForElementToBePresent(By.id(startWorkButton), af.DEFAULT_TIMEOUT_MS * 3);
		this.clickButton(startWorkButton);
	}

	/**
	 * Click back chevron to navigate to wo list page
	 * 
	 * @throws Exception
	 */
	public void clickBackChevron() throws Exception {
		af.instantiateComponent(ButtonComponent.class, "em97_-pageheader_breadcrumb_icon").click();
	}

	/**
	 * get Task counter number
	 *
	 * @throws Exception
	 */
	public int getTaskCountDisplay() throws Exception {
		af.waitForElementToBePresent(By.id(taskCount), af.DEFAULT_TIMEOUT_MS * 2);
		FilterComponent tag = af.instantiateComponent(FilterComponent.class, taskCount);
		return Integer.parseInt(tag.getTagCount());
	}

	/**
	 * Get Materials and Tools Sliding Drawer Header Label content
	 * 
	 * @throws Exception
	 */
	public String getMaterialsToolsSlidingDrawerHeaderLabel() throws Exception {
		af.waitForElementToBePresent(By.id(materialsToolsSlidingDrawerHeaderLabel));
		return af.instantiateComponent(LabelComponent.class, materialsToolsSlidingDrawerHeaderLabel).getLabel();
	}

	/**
	 * Method to return Materials and tools Sliding Drawer - Shopping Cart button is
	 * displayed
	 *
	 * @throws Exception
	 */
	public boolean isShoppingCartExist() throws Exception {
		return af.instantiateComponent(ButtonComponent.class, shoppingCart).isDisplayed();
	}

	/**
	 * Get Materials and Tools Sliding Drawer - Materials label content
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getMaterialsToolsSlidingDrawerMaterialsLabel() throws Exception {
		return af.instantiateComponent(BaseComponent.class, materialsToolsSlidingDrawerMaterialsLabel).text();

	}

	/**
	 * Get Materials and Tools Sliding Drawer - Tools label content
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getMaterialsToolsSlidingDrawerToolsLabel() throws Exception {
		return af.instantiateComponent(BaseComponent.class, materialsToolsSlidingDrawerToolsLabel).text();

	}

	/**
	 * Method to verify Item or Material exists, matching when:
	 * 
	 * @param wonum           (mandatory) For Item:
	 * @param itemnum         (mandatory)
	 * @param itemDescription (optional)
	 * @param storeroom       (mandatory)
	 * @param itemqty         (mandatory and 0.00 format) For Material:
	 * @param itemnum         (optional)
	 * @param itemDescription (mandatory)
	 * @param storeroom       (optional)
	 * @param itemqty         (mandatory) --
	 * 
	 * @return
	 * @throws Exception
	 */
	public boolean isMaterialExist(String wonum, String itemnum, String itemDescription, String storeroom,
			String itemqty) throws Exception {

		try {

			logger.info("select count(wpitemid) from wpmaterial where wonum = '" + wonum + "' and siteid = '"
					+ SetupData.SITEID + "'");
			Object[] resultsObjects = jdbcConnection.executeSQL("select count(wpitemid) from wpmaterial where wonum = '"
					+ wonum + "' and siteid = '" + SetupData.SITEID + "'");
			Object[] resultArray1 = (Object[]) resultsObjects[0];
			int count = Integer.parseInt(resultArray1[0] + "");
			logger.info("Count: " + count);

			if (count == 0) {
				logger.info("There is no materials");
				return false;
			}

			for (int i = 0; i < count; i++) {
				logger.info("inside for with index: " + i);
				// Item
				if (itemnum != null && itemDescription != null) {
					if (af.isElementExists(By.id(materialsSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(materialsStoreroomSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(materialsQtySlidingDrawerLabel + i + "]"))) {

						if (af.instantiateComponent(BaseComponent.class, materialsSlidingDrawerLabel + i + "]").text()
								.equals(itemnum + " " + itemDescription)
								&& af.instantiateComponent(BaseComponent.class,
										materialsStoreroomSlidingDrawerLabel + i + "]").text().equals(storeroom)
								&& af.instantiateComponent(BaseComponent.class,
										materialsQtySlidingDrawerLabel + i + "]").text().equals(itemqty)) {
							return true;
						}
					}

					// Item
				} else if (itemnum != null && itemDescription == null) {
					if (af.isElementExists(By.id(materialsSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(materialsStoreroomSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(materialsQtySlidingDrawerLabel + i + "]"))) {

						if (af.instantiateComponent(BaseComponent.class, materialsSlidingDrawerLabel + i + "]").text()
								.equals(itemnum)
								&& af.instantiateComponent(BaseComponent.class,
										materialsStoreroomSlidingDrawerLabel + i + "]").text().equals(storeroom)
								&& af.instantiateComponent(BaseComponent.class,
										materialsQtySlidingDrawerLabel + i + "]").text().equals(itemqty)) {
							return true;
						}
					}
					// Material
				} else if (itemnum == null && itemDescription != null) {
					if (af.isElementExists(By.id(materialsSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(materialsQtySlidingDrawerLabel + i + "]"))) {

						if (af.instantiateComponent(BaseComponent.class, materialsSlidingDrawerLabel + i + "]").text()
								.equals(itemDescription)
								&& af.instantiateComponent(BaseComponent.class,
										materialsQtySlidingDrawerLabel + i + "]").text().equals(itemqty)) {
							return true;
						}
					}
				}
			}
			return false;

		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Method to verify Tool exists
	 * 
	 * @param wonum           (mandatory)
	 * @param tool            (mandatory)
	 * @param toolDescription (optional)
	 * @param hours           (mandatory and format integer)
	 * @param storeroom       (mandatory)
	 * @param itemqty         (mandatory and 0.00 format)
	 *
	 * @return
	 * @throws Exception
	 */
	public boolean isToolExist(String wonum, String tool, String toolDescription, String hours, String minutes,
			String storeroom, String itemqty) throws Exception {

		try {

			logger.info("select count(*) from wptool where wonum = '" + wonum + "' and siteid = '" + SetupData.SITEID
					+ "'");
			Object[] resultsObjects = jdbcConnection.executeSQL("select count(*) from wptool where wonum = '" + wonum
					+ "' and siteid = '" + SetupData.SITEID + "'");
			Object[] resultArray1 = (Object[]) resultsObjects[0];
			int count = Integer.parseInt(resultArray1[0] + "");

			if (count == 0) {
				logger.info("There is no tools");
				return false;
			}

			for (int i = 0; i < count; i++) {
				if (toolDescription == null) {
					if (af.isElementExists(By.id(toolsSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(toolsQtySlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(toolsStoreroomSlidingDrawerLabel + i + "]"))) {

						if (af.instantiateComponent(BaseComponent.class, toolsSlidingDrawerLabel + i + "]").text()
								.equals(tool)
								&& af.instantiateComponent(BaseComponent.class, toolsQtySlidingDrawerLabel + i + "]")
										.text().equals(itemqty)
								&& af.instantiateComponent(BaseComponent.class,
										toolsStoreroomSlidingDrawerLabel + i + "]").text().equals(storeroom)) {

							if (hours != null && minutes != null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals(hours + " hours " + minutes + " minutes")) {
									return true;
								}

							} else if (hours != null && minutes == null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals(hours + " hours")) {
									return true;
								}
							} else if (hours == null && minutes != null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals(minutes + " minutes")) {
									return true;
								}
							} else if (hours == null && minutes == null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals("0 hours")) {
									return true;
								}
							}
						}
					}

				} else {

					if (af.isElementExists(By.id(toolsSlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(toolsQtySlidingDrawerLabel + i + "]"))
							&& af.isElementExists(By.id(toolsStoreroomSlidingDrawerLabel + i + "]"))) {

						if (af.instantiateComponent(BaseComponent.class, toolsSlidingDrawerLabel + i + "]").text()
								.equals(tool + " " + toolDescription)
								&& af.instantiateComponent(BaseComponent.class,
										toolsStoreroomSlidingDrawerLabel + i + "]").text().equals(storeroom)
								&& af.instantiateComponent(BaseComponent.class, toolsQtySlidingDrawerLabel + i + "]")
										.text().equals(itemqty)) {

							if (hours != null && minutes != null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals(hours + " hours " + minutes + " minutes")) {
									return true;
								}

							} else if (hours != null && minutes == null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals(hours + " hours")) {
									return true;
								}
							} else if (hours == null && minutes != null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals(minutes + " minutes")) {
									return true;
								}
							} else if (hours == null && minutes == null) {
								if (af.instantiateComponent(BaseComponent.class,
										toolsHoursSlidingDrawerLabel1 + i + toolsHoursSlidingDrawerLabel2).text()
										.equals("0 hours")) {
									return true;
								}
							}
						}
					}

				}
			}
			logger.info("Tools - ending");
			return false;

		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Enter Quantity on Add Items page from Material Request
	 * 
	 * @param quantity
	 * @throws Exception
	 */
	public void typeQuantityMaterialRequestAddItemSlidingDrawer(String quantity) throws Exception {
		logger.info("Entering Quantity");
		af.waitForElementToBePresent(By.id(materialRequestAddItemSlidingDrawerQuantityInput));
		af.instantiateComponent(TextInputComponent.class, materialRequestAddItemSlidingDrawerQuantityInput)
				.clearField();
		af.instantiateComponent(TextInputComponent.class, materialRequestAddItemSlidingDrawerQuantityInput)
				.type(quantity);

	}

	/**
	 * Method to find and click the Chevron of Material Request that contains the
	 * Material Request Line of a given item
	 * 
	 * @param wonum
	 * @param itemnum
	 * @param storeroom
	 * @return mrnum
	 * @throws Exception
	 */
	public String clickRequestedMaterialListChevron(String wonum, String itemnum, String storeroom) throws Exception {

		logger.info("select count(*) from mr where wonum = '" + wonum + "' and siteid = '" + SetupData.SITEID + "'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select count(*) from mr where wonum = '" + wonum + "' and siteid = '" + SetupData.SITEID + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		int mr = Integer.parseInt(resultArray1[0] + "");

		if (mr > 0) {
			
			String mrnum = getMRNUM(wonum, itemnum, storeroom);
			
			for (int i=0; i<mr; i++) {

				af.waitForElementToBePresent(By.id(materialRequestNumberLabel1 + i + materialRequestNumberLabel2));
				logger.info(af.instantiateComponent(BaseComponent.class,
						materialRequestNumberLabel1 + i + materialRequestNumberLabel2).text());
				if (af.instantiateComponent(BaseComponent.class,
						materialRequestNumberLabel1 + i + materialRequestNumberLabel2).text().equals(mrnum)) {
					clickButton(chevronOfRequestedMaterialStatus + i + "]");
					logger.info("mrnum: " + mrnum);
					return mrnum;

				}
			}

		} else {
			logger.info("There is no Material Request");
			return "";
		}
		return "";
	}

	/**
	 * 
	 * @param wonum           - mandatory
	 * @param mrnum           - mandatory
	 * @param itemnum         - mandatory
	 * @param itemDescription - optional
	 * @param storeroom       - optional while defect is opened
	 * @param storeroomDesc   - optional
	 * @param quantity        - mandatory
	 * @return
	 * @throws Exception
	 */
	// TODO to be refactored after defect is resolved - GRAPHITE-54822 -
	// [Technician] - Material Request - Material List section has misleading
	// information
	public boolean verifyItemOnMaterialList(String wonum, String mrnum, String itemnum, String itemDescription, String storeroom, String storeroomDesc, String quantity) throws Exception {
		logger.info("select count(*) from mrline where refwo = '" + wonum + "' and siteid = '" + SetupData.SITEID + "' and mrnum = '" + mrnum + "'");
		Object[] resultsObjects = jdbcConnection.executeSQL
				   ("select count(*) from mrline where refwo = '" + wonum + "' and siteid = '" + SetupData.SITEID + "' and mrnum = '" + mrnum + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		int mrlines = Integer.parseInt(resultArray1[0] + "");
		logger.info("mrlines: " + mrlines);

		if (mrlines > 0) {
			for (int i = 0; i < mrlines; i++) {
				af.waitForElementToBePresent(By.id(materialListItemLabel1 + i + materialListItemLabel2));

				if (itemDescription == null && storeroomDesc == null) {
					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1 + i + materialListItemLabel2).text().equals(itemnum + " undefined") &&
						af.instantiateComponent(BaseComponent.class,materialListUnspecifiedStoreroomLabel1 + i + materialListUnspecifiedStoreroomLabel2).text().equals("–") &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text().equals(quantity)) {
						
						logger.info(af.instantiateComponent(BaseComponent.class,materialListItemLabel1 + i + materialListItemLabel2).text() + " equals: " + itemnum + " undefined");
						logger.info(af.instantiateComponent(BaseComponent.class,materialListUnspecifiedStoreroomLabel1 + i + materialListUnspecifiedStoreroomLabel2).text() + " equals: -");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text()+ " equals: " + quantity);
						return true;
					}

				} else if (itemDescription != null && storeroomDesc == null) {
					if (af.instantiateComponent(BaseComponent.class,materialListItemLabel1 + i + materialListItemLabel2).text().equals(itemnum + " " + itemDescription) &&
						af.instantiateComponent(BaseComponent.class,materialListUnspecifiedStoreroomLabel1 + i + materialListUnspecifiedStoreroomLabel2).text().equals("–") &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text().equals(quantity)) {
						
						logger.info(af.instantiateComponent(BaseComponent.class,materialListItemLabel1 + i + materialListItemLabel2).text() + " equals: " + itemnum + " " + itemDescription);
						logger.info(af.instantiateComponent(BaseComponent.class,materialListUnspecifiedStoreroomLabel1 + i + materialListUnspecifiedStoreroomLabel2).text() + " equals: -");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text()+ " equals: " + quantity);
						return true;
					}

				} else if (itemDescription != null && storeroomDesc != null) {
					logger.info("inside if");
					logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text() + " equals: " +itemnum+ " " +itemDescription);
					logger.info(af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1+i+materialListStoreroomLabel2).text() + " equals: "+ storeroomDesc);
					logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text() + " equals: " + quantity);

					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1 + i + materialListItemLabel2).text().equals(itemnum + " " + itemDescription) && 
						af.instantiateComponent(BaseComponent.class,materialListStoreroomLabel1 + i + materialListStoreroomLabel2).text().equals(storeroomDesc) &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text().equals(quantity)) {
						logger.info("inside if");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text() + " equals: " +itemnum+ " " +itemDescription);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1+i+materialListStoreroomLabel2).text() + " equals: "+ storeroomDesc);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text() + " equals: " + quantity);

						return true;
					}

				} else if (itemDescription == null && storeroomDesc != null) {

					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1 + i + materialListItemLabel2).text().equals(itemnum + " undefined") &&
						af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1 + i + materialListStoreroomLabel2).text().equals(storeroomDesc) &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text().equals(quantity)) {
						
						logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1 + i + materialListItemLabel2).text() + " equals: " + itemnum + " undefined");
						logger.info(af.instantiateComponent(BaseComponent.class,materialListStoreroomLabel1 + i + materialListStoreroomLabel2).text() + " equals: " + storeroomDesc);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel + i + "]").text()+ " equals: " + quantity);
						
						return true;
					}
				}
			}
		}

		return false;
	}

	/**
	 * Set Priority into Material request
	 * 
	 * @param priority
	 * @throws Exception
	 */
	public void setPriorityOnMaterialRequest(String priority) throws Exception {
		try {
			af.waitForElementToBePresent(By.id(priorityOnMaterialRequest));
			af.instantiateComponent(TextInputComponent.class, priorityOnMaterialRequest).clearField();
			af.instantiateComponent(NumberInputComponent.class, priorityOnMaterialRequest).typeInNumberInput(priority);
		} catch (Exception e) {

		}
	}

	
	/**
	 * Method to get MRNUM for a given Item in a storeroom of a certain workorder
	 * @param wonum
	 * @param itemnum
	 * @param storeroom
	 * @return
	 * @throws Exception
	 */
	public String getMRNUM (String wonum, String itemnum, String storeroom) throws Exception {
		try {
			
			logger.info(
					"select mrnum from mrline where refwo = '"+wonum+"' and siteid = '"+SetupData.SITEID+"' and itemnum = '"+itemnum+"' and storeloc = '"+storeroom+"'");
			Object[] resultsObjects1 = jdbcConnection.executeSQL(
					"select mrnum from mrline where refwo = '"+wonum+"' and siteid = '"+SetupData.SITEID+"' and itemnum = '"+itemnum+"' and storeloc = '"+storeroom+"'");
			Object[] resultArray2 = (Object[]) resultsObjects1[0];
			String mrnum = resultArray2[0]+"";
			logger.info("mrnum: " + mrnum);
			return mrnum;
		
		} catch (Exception e) {
			return "";
		}
		
	}
	/**
	 * Identifying the item in order to click in the correct chevron on Material List sliding drawer
	 * 
	 * @param wonum
	 * @param itemnum
	 * @param itemDescription
	 * @param storeroom
	 * @param storeroomDesc
	 * @param quantity
	 * @throws Exception
	 */
	public void clickItemChevronOnMaterialList (String wonum, String itemnum, String itemDescription, String storeroom, String storeroomDesc, String quantity) throws Exception{
		String mrnum  = getMRNUM (wonum,itemnum,storeroom);
		
		logger.info(
				"select count(*) from mrline where refwo = '"+wonum+"' and siteid = '"+SetupData.SITEID+"' and mrnum = '"+mrnum+"'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select count(*) from mrline where refwo = '"+wonum+"' and siteid = '"+SetupData.SITEID+"' and mrnum = '"+mrnum+"'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		int mrlines = Integer.parseInt(resultArray1[0]+"");
		logger.info("mrlines: " + mrlines);
		
		if (mrlines > 0) {
			for (int i=0; i<mrlines; i++) {
				af.waitForElementToBePresent(By.id(materialListItemLabel1+i+materialListItemLabel2));
				
				if (itemDescription == null && storeroomDesc == null) {
					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text().equals(itemnum+ " undefined") && 
						af.instantiateComponent(BaseComponent.class, materialListUnspecifiedStoreroomLabel1+i+materialListUnspecifiedStoreroomLabel2).text().equals("–") &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text().equals(quantity)) {
						logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text() + " equals: "+ itemnum+ " undefined");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListUnspecifiedStoreroomLabel1+i+materialListUnspecifiedStoreroomLabel2).text() + " equals: -");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text() + " equals: " + quantity);
						af.waitForElementToBeEnabled(By.id(materialListItemChevron+i+"]"));
						logger.info("Clicking on Item details of Material list");
						af.instantiateComponent(ButtonComponent.class, materialListItemChevron+i+"]").click();
						
					}
					
				} else if (itemDescription != null && storeroomDesc == null) {
					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text().equals(itemnum+ " " +itemDescription) && 
						af.instantiateComponent(BaseComponent.class, materialListUnspecifiedStoreroomLabel1+i+materialListUnspecifiedStoreroomLabel2).text().equals("–") &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text().equals(quantity)){
						logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text() + " equals: " +itemnum+ " " +itemDescription);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListUnspecifiedStoreroomLabel1+i+materialListUnspecifiedStoreroomLabel2).text() + " equals: -");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text() + " equals: " + quantity);
						af.waitForElementToBeEnabled(By.id(materialListItemChevron+i+"]"));
						logger.info("Clicking on Item details of Material list");
						af.instantiateComponent(ButtonComponent.class, materialListItemChevron+i+"]").click();
						
					}
					
				} else if (itemDescription != null && storeroomDesc != null) {
					
					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text().equals(itemnum+ " " +itemDescription) && 
						af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1+i+materialListStoreroomLabel2).text().equals(storeroomDesc) &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text().equals(quantity)) {
						logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text() + " equals: " +itemnum+ " " +itemDescription);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1+i+materialListStoreroomLabel2).text() + " equals: "+ storeroomDesc);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text() + " equals: " + quantity);
						af.waitForElementToBeEnabled(By.id(materialListItemChevron+i+"]"));
						logger.info("Clicking on Item details of Material list");
						af.instantiateComponent(ButtonComponent.class, materialListItemChevron+i+"]").click();
						
					}
					
				} else if (itemDescription == null && storeroomDesc != null) {
					
					if (af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text().equals(itemnum+ " undefined") && 
						af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1+i+materialListStoreroomLabel2).text().equals(storeroomDesc) &&
						af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text().equals(quantity)) {
						logger.info(af.instantiateComponent(BaseComponent.class, materialListItemLabel1+i+materialListItemLabel2).text() + " equals: "+ itemnum+ " undefined");
						logger.info(af.instantiateComponent(BaseComponent.class, materialListStoreroomLabel1+i+materialListStoreroomLabel2).text() + " equals: "+ storeroomDesc);
						logger.info(af.instantiateComponent(BaseComponent.class, materialListQuantityLabel+i+"]").text() + " equals: " + quantity);
						af.waitForElementToBeEnabled(By.id(materialListItemChevron+i+"]"));
						logger.info("Clicking on Item details of Material list");
						af.instantiateComponent(ButtonComponent.class, materialListItemChevron+i+"]").click();
						
					}
				}
			}
		}
				
	}
		
	 /**
	  * Get values from MR table in a SQL statement with parameters in a where clause.
	 *  In order to include more values for your needs, add in the end of selection, as well as in the logger to identify the index number.
	 *  
	  * @param mrnum
	  * @param siteid
	  * @return
	  * @throws Exception
	  */
	//	 * defect GRAPHITE-54981 - [Technician] - MR.Description is not generated as expected
	public Object[] getValueFromMRTable (String mrnum, String siteid) throws Exception{
		//get db values from MR table
		logger.info(
				"select description, requestedby, requestedfor, requireddate, priority, droppoint, gldebitacct, wonum, location, assetnum, siteid, orgid, status, statusdate from mr where mrnum = '"+mrnum+"' and siteid = '"+siteid+"'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select description, requestedby, requestedfor, requireddate, priority, droppoint, gldebitacct, wonum, location, assetnum, siteid, orgid, status, statusdate from mr where mrnum = '"+mrnum+"' and siteid = '"+siteid+"'");
		Object[] resultArray = (Object[]) resultsObjects[0];
		
		logger.info("MR description: " + resultArray[0]+"");
		logger.info("MR requestedby: " + resultArray[1]+"");
		logger.info("MR requestedfor: " + resultArray[2]+"");
		logger.info("MR requireddate: " + resultArray[3]+"");
		logger.info("MR priority: " + resultArray[4]+"");
		logger.info("MR droppoint: " + resultArray[5]+"");
		logger.info("MR gldebitacct: " + resultArray[6]+"");
		logger.info("MR wonum: " + resultArray[7]+"");
		logger.info("MR location: " + resultArray[8]+"");
		logger.info("MR assetnum: " + resultArray[9]+"");
		logger.info("MR siteid: " + resultArray[10]+"");
		logger.info("MR orgid: " + resultArray[11]+"");
		logger.info("MR status: " + resultArray[12]+"");
		logger.info("MR statusdate: " + resultArray[13]+"");
		
		return resultArray;
	}
	
	/**
	 * Get values from WORKORDER table in a SQL statement with parameters in a where clause.
	 *  In order to include more values for your needs, add in the end of selection, as well as in the logger to identify the index number.
	 *  
	 * @param wonum
	 * @param siteid
	 * @return
	 * @throws Exception
	 */
	public Object[] getValueFromWORKORDERTable (String wonum, String siteid ) throws Exception{
		
		
		//get db values from WORKORDER table
		logger.info(
				"select glaccount, location, assetnum, siteid, orgid from workorder where wonum = '"+wonum+"' and siteid = '"+siteid+"'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select glaccount, location, assetnum, siteid, orgid from workorder where wonum = '"+wonum+"' and siteid = '"+siteid+"'");
		Object[] resultArray = (Object[]) resultsObjects[0];
		
		logger.info("WO glaccount: " + resultArray[0]+"");
		logger.info("WO location: " + resultArray[1]+"");
		logger.info("WO asset: " + resultArray[2]+"");
		logger.info("WO siteid: " + resultArray[3]+"");
		logger.info("WO orgid: " + resultArray[4]+"");
		
		return resultArray;
	}

	/**
	 * 	Get values from MRLINE table in a SQL statement with parameters in a where clause.
	 *  In order to include more values for your needs, add in the end of selection, as well as in the logger to identify the index number.
	 * @param mrnum
	 * @param itemnum
	 * @param siteid
	 * @return
	 */
	public Object[] getValueFromMRLINETable (String mrnum, String itemnum, String siteid) {
		
		logger.info(
				"select mrlinenum, linetype, itemnum, description, manufacturer, modelnum, catalogcode, qty, orderunit, conversion, unitcost, linecost, currencycode, vendor, storeloc, gldebitacct, inspectionrequired, requireddate, isdistributed from mrline where mrnum = '"+mrnum+"' and itemnum = '"+itemnum+"' and siteid = '"+SetupData.SITEID+"'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select mrlinenum, linetype, itemnum, description, manufacturer, modelnum, catalogcode, qty, orderunit, conversion, unitcost, linecost, currencycode, vendor, storeloc, gldebitacct, inspectionrequired, requireddate, isdistributed from mrline where mrnum = '"+mrnum+"' and itemnum = '"+itemnum+"' and siteid = '"+SetupData.SITEID+"'");
		Object[] resultArray = (Object[]) resultsObjects[0];
		
		logger.info("mrlinenum: " + resultArray[0]+"");
		logger.info("linetype: " + resultArray[1]+"");
		logger.info("itemnum: " + resultArray[2]+"");
		logger.info("description: " + resultArray[3]+"");
		logger.info("manufacturer: " + resultArray[4]+"");
		logger.info("modelnum: " + resultArray[5]+"");
		logger.info("catalogcode: " + resultArray[6]+"");
		logger.info("qty: " + resultArray[7]+"");
		logger.info("orderunit: " + resultArray[8]+"");
		logger.info("conversion: " + resultArray[9]+"");
		logger.info("unitcost: " + resultArray[10]+"");
		logger.info("linecost: " + resultArray[11]+"");
		logger.info("currencycode: " + resultArray[12]+"");
		logger.info("vendor: " + resultArray[13]+"");
		logger.info("storeloc: " + resultArray[14]+"");
		logger.info("gldebitacct: " + resultArray[15]+"");
		logger.info("inspectionrequired: " + resultArray[16]+"");
		logger.info("requireddate: " + resultArray[17]+"");
		logger.info("isdistributed: " + resultArray[18]+"");
				
		return resultArray;
		
	}
	
	/**
	 * Close button on Add Item Sliding Drawer
	 * @throws Exception
	 */
	public void clickAddItemCloseDrawerButton () throws Exception {
		this.clickButton(addItemCloseDrawer);
		
	}
	
	
	
	/**	
	 * Button to open Item Sliding Drawer	
	 * @throws Exception	
	 */	
	public void clickAddItemOpenDrawerButton () throws Exception {	
		this.clickButton(materialRequestFirstItemChevron);	
			
	}
	

	/**
	 * 
	 * @param index
	 * @return
	 * @throws Exception
	 */
	public String[] getRequestedMaterialListChevron(String wonum, String itemnum, String storeroom) throws Exception {
		
		logger.info("select count(*) from mr where wonum = '" + wonum + "' and siteid = '" + SetupData.SITEID + "'");
		Object[] resultsObjects = jdbcConnection.executeSQL(
				"select count(*) from mr where wonum = '" + wonum + "' and siteid = '" + SetupData.SITEID + "'");
		Object[] resultArray1 = (Object[]) resultsObjects[0];
		int mr = Integer.parseInt(resultArray1[0] + "");

		if (mr > 0) {
			
			String mrnum = getMRNUM(wonum, itemnum, storeroom);
			
			for (int i=0; i<mr; i++) {

				af.waitForElementToBePresent(By.id(materialRequestNumberLabel1 + i + materialRequestNumberLabel2));
				logger.info(af.instantiateComponent(BaseComponent.class, materialRequestNumberLabel1 + i + materialRequestNumberLabel2).text());
				if (af.instantiateComponent(BaseComponent.class, materialRequestNumberLabel1 + i + materialRequestNumberLabel2).text().equals(mrnum)) {
					String[] responses = new String[3];
					logger.info("mrnum locato: "+ materialRequestNumberLabel1 + (i) + materialRequestNumberLabel2);
					responses[0] = af.instantiateComponent(BaseComponent.class,
							materialRequestNumberLabel1 + (i) + materialRequestNumberLabel2).text();
					// date value
					logger.info("date locator: " + materialRequestDateLabel1 + i + materialRequestNumberLabel2);
					responses[1] = af.instantiateComponent(BaseComponent.class,
							materialRequestDateLabel1 + (i) + materialRequestNumberLabel2).text();
					// status value
					logger.info("status locator: " + materialRequestStatusLabel1 + i + materialRequestNumberLabel2);
					responses[2] = af.instantiateComponent(BaseComponent.class,
							materialRequestStatusLabel1 + (i) + materialRequestNumberLabel2).text();
					return responses;

				}
			}

		} else {
			logger.info("There is no Material Request");
			return null;
		}
		return null;
		
	}

	/**
	 * 
	 * @param index
	 * @return
	 * @throws Exception
	 */
	public boolean isMrExist(int index) throws Exception {
		// mrnum
			if(af.isElementExists(By.id(materialRequestNumberLabel1 + (index) + materialRequestNumberLabel2))== true)
			{
				return true;
			}
			else{
				return false;
			}
	}

	/**
	 * Check in Labor pop up, whether Meter is available
	 *
	 * @return
	 */
	public boolean isMeterExistInLabor() {
		return af.isElementExists(By.id(meterTouchPad));
	}

	/**
	 * Click meters button
	 *
	 * @return
	 * @throws Exception
	 */
	public MetersPageWODetail clickMetersButton() throws Exception {
		af.instantiateComponent(ButtonComponent.class, meterTouchPad).click();
		return new MetersPageWODetail(af);
	}
	
	/**
	 * Verify Materials and tools touchpoint is present on the work order details page
	 *
	 * @return
	 */
	public boolean verifyMaterialAndToolTouchpoint() {
		return af.isElementExists(By.id(materialAndToolTouchpoint));
	}
	
	/**
	 * Verify worklog touchpoint is present on the work order details page 
	 *
	 * @return
	 */
	public boolean verifyWorkLogTouchpoint() {
		return af.isElementExists(By.id(workLogButton));
	}
	
	/**
	 * Verify edit button touchpoint is present on the work order details page 
	 *
	 * @return
	 */
	public boolean verifyEditIconTouchpoint() {
		return af.isElementExists(By.id(editWorkOrderDetailsIcon));
	}
	
	/**
	 * Method to get Work Order Description
	 * 
	 * @return assetLocationHistoryWODescription
	 */
	public String getTaskOrderDescription() throws Exception {
		af.waitForElementToBePresent(By.id(description));
		return af.instantiateComponent(LabelComponent.class, description ).getValue();
	}	
	
	/**
	 * Click chevron button to go to wo details page of History work order
	 * 
	 * @throws Exception
	 */
	public boolean historyIconDisabled() throws Exception {
		af.waitForElementToBePresent(By.id(historyIcon), af.DEFAULT_TIMEOUT_MS * 3);
		return af.instantiateComponent(ButtonComponent.class, historyIcon).isDisabled();
	}

	/**
	 * Method for clicking on back to Work Order List
	 * 
	 * @throws Exception
	 */
	public void clickHistoryBackIcon() throws Exception {
		 //af.instantiateComponent(ButtonComponent.class, historyBackIcon).click();
		this.clickButton(historyBackIcon);
		}
	
	/**
	 * Click on 'X' to close the work log drawer
	 * 
	 * @throws Exception
	 * 
	 */
	public void closeDrawer() throws Exception {
		af.waitForElementToBePresent(By.id(workLogCloseDrawer));
		af.instantiateComponent(ButtonComponent.class, workLogCloseDrawer).click();
	}

/**
	 * Method to open change status dialogue
	 * 
	 * @throws Exception
	 * 
	 */
	public void openStatusList() throws Exception {
		af.waitForElementToBePresent(By.id(changedStatusText), af.DEFAULT_TIMEOUT_MS * 3);
		af.instantiateComponent(ButtonComponent.class, changedStatusText).click();
	}
}