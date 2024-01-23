package com.ibm.maximo.technician.page;

import org.openqa.selenium.By;

import com.ibm.maximo.automation.mobile.AbstractAutomationFramework;
import com.ibm.maximo.components.ButtonComponent;
import com.ibm.maximo.components.LabelComponent;

public class MetersPageWODetail {

	private AbstractAutomationFramework af;
	private String chevronButtonOnAssetMeter = "v7323[0]";
	private String selectReadingValue = "meterReadingLookupDetail_lookup_datalist_1/16_selectionCheckBoxIcon_touch";
	private String enterMeterReadingInFirstAssetMeter = "kz_2d[1]";
	private String enterMeterReadingInSecondAssetMeter = "kz_2d[2]";
	private String saveButton = "v69a__ere89";
	private String cancelButton = "meterReadingDrawerDetail_button";
	private String xButton = "multiMeterReadingDrawer_button";
	private String addMeterReadingsButton = "wk7dq_j79ab";
	private String checkFirstAssetMeterValueSet = "rkpqj[0]_textoverflow_value0";
	private String checkSecondAssetMeterValueSet = "rkpqj[1]_textoverflow_value0";
	private String checkThirdAssetMeterValueSet = "rkpqj[2]_textoverflow_value0";
	private String checkFirstLocationMeterValueSet = "z3ygy[0]_fieldValue0";
	private String checkSecondLocationMeterValueSet = "z3ygy[1]_fieldValue0";
	private String checkThirdLocationMeterValueSet = "z3ygy[2]_fieldValue0";
	private String chevronButtonOnLocationMeter = "wzngx[0]";
	private String enterMeterReadingInFirstLocationMeter = "a8pb5[1]";
	private String enterMeterReadingInSecondLocationMeter = "a8pb5[2]";
	private String meterHeaderLabel = "multiMeterReadingDrawer_headerLabel";

	public MetersPageWODetail(AbstractAutomationFramework af) {
		this.af = af;
	}

	// Method for clicking on chevron Asset Meter button
	public void chevronAssetMeter() throws Exception {
		af.waitForElementToBePresent(By.id(chevronButtonOnAssetMeter));
		af.instantiateComponent(ButtonComponent.class, chevronButtonOnAssetMeter).click();
	}

	// Method for clicking on chevron location meter button
	public void chevronLocationMeter() throws Exception {
		af.waitForElementToBePresent(By.id(chevronButtonOnLocationMeter));
		af.instantiateComponent(ButtonComponent.class, chevronButtonOnLocationMeter).click();
	}

	// Method for clicking on selectCharacteristicReadingValues button
	public void selectCharacteristicReadingValues() throws Exception {
		af.waitForElementToBePresent(By.id(selectReadingValue));
		af.instantiateComponent(ButtonComponent.class, selectReadingValue).click();
	}

	// Method for clicking on save button
	public void save() throws Exception {
		af.waitForElementToBePresent(By.id(saveButton));
		af.instantiateComponent(ButtonComponent.class, saveButton).click();
	}

	// Method for clicking on cancel button
	public void cancel() throws Exception {
		af.waitForElementToBePresent(By.id(cancelButton));
		af.instantiateComponent(ButtonComponent.class, cancelButton).click();
	}

	// Method for clicking on x button
	public void XClick() throws Exception {
		af.waitForElementToBePresent(By.id(xButton));
		af.instantiateComponent(ButtonComponent.class, xButton).click();
	}

	// Method for clicking on add meter readings button
	public boolean addMeterReadings(String value) throws Exception {
		try {

			af.waitForElementToBePresent(By.id(addMeterReadingsButton));
			af.instantiateComponent(ButtonComponent.class, addMeterReadingsButton).click();
			chevronAssetMeter();
			selectCharacteristicReadingValues();
			enterAssetMeterReadingValues(value);
			chevronLocationMeter();
			selectCharacteristicReadingValues();
			enterLocationMeterReadingValues(value);
			save();
			af.waitForElementToNotBePresent(By.id(saveButton),1000);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	// Method for checking meter values
	public boolean checkMeterValueBeforeReading() throws Exception {
		try {
			af.waitForElementToBePresent(By.id(checkFirstAssetMeterValueSet),2);
			af.waitForElementToBePresent(By.id(checkSecondAssetMeterValueSet),2);
			af.waitForElementToBePresent(By.id(checkThirdAssetMeterValueSet),2);
			af.waitForElementToBePresent(By.id(checkFirstLocationMeterValueSet),2);
			af.waitForElementToBePresent(By.id(checkSecondLocationMeterValueSet),2);
			af.waitForElementToBePresent(By.id(checkThirdLocationMeterValueSet),2);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean checkMeterValueAfterReading(String value) throws Exception {
		try {
			boolean a1,a2,a3,l1,l2,l3;
			String sa2,sa3,sl2,sl3;
			
			af.waitForElementToBePresent(By.id(checkFirstAssetMeterValueSet), 2);
			a1=af.isElementExists(By.id(checkFirstAssetMeterValueSet));
			
			af.waitForElementToBePresent(By.id(checkSecondAssetMeterValueSet), 2);
			sa2 = af.instantiateComponent(ButtonComponent.class, checkSecondAssetMeterValueSet).getText();
			a2 = sa2.equalsIgnoreCase(value);
			
			af.waitForElementToBePresent(By.id(checkThirdAssetMeterValueSet), 2);
			sa3 = af.instantiateComponent(ButtonComponent.class, checkThirdAssetMeterValueSet).getText();
			a3 = sa3.equalsIgnoreCase(value);
			
			af.waitForElementToBePresent(By.id(checkFirstLocationMeterValueSet), 2);
			l1 = af.isElementExists(By.id(checkFirstLocationMeterValueSet));
			
			af.waitForElementToBePresent(By.id(checkSecondLocationMeterValueSet), 2);
			sl2=af.instantiateComponent(ButtonComponent.class, checkSecondLocationMeterValueSet).getText();
			l2= sl2.equalsIgnoreCase(value);
			
			af.waitForElementToBePresent(By.id(checkThirdLocationMeterValueSet), 2);
			sl3=af.instantiateComponent(ButtonComponent.class, checkThirdLocationMeterValueSet).getText();
			l3=sl3.equalsIgnoreCase(value);
			
			return a1&&a2&&a3&&l1&&l2&&l3;
		} catch (Exception e) {
			return false;
		}
	}

	// Method for clicking on enterAssetMeterReadingValues button
	public boolean enterAssetMeterReadingValues(String value) throws Exception {
		try {
			af.waitForElementToBePresent(By.id(enterMeterReadingInFirstAssetMeter), 2);
			af.instantiateComponent(ButtonComponent.class, enterMeterReadingInFirstAssetMeter).type(value);
			af.waitForElementToBePresent(By.id(enterMeterReadingInSecondAssetMeter), 2);
			af.instantiateComponent(ButtonComponent.class, enterMeterReadingInSecondAssetMeter).type(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	// Method for clicking on enterAssetMeterReadingValues button
	public boolean enterLocationMeterReadingValues(String value) throws Exception {
		try {
			af.waitForElementToBePresent(By.id(enterMeterReadingInFirstLocationMeter), 2);
			af.instantiateComponent(ButtonComponent.class, enterMeterReadingInFirstLocationMeter).type(value);
			af.waitForElementToBePresent(By.id(enterMeterReadingInSecondLocationMeter), 2);
			af.instantiateComponent(ButtonComponent.class, enterMeterReadingInSecondLocationMeter).type(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getMeterHeader() throws Exception {
		return af.instantiateComponent(LabelComponent.class, meterHeaderLabel).getValue();
	}
}
