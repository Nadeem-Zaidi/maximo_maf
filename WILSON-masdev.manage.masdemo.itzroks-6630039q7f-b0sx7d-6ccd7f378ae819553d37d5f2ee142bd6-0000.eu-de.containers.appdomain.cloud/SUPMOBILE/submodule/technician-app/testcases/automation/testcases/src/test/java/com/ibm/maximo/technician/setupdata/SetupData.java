package com.ibm.maximo.technician.setupdata;

public class SetupData {
	public enum WoStatus {
		APPR, WPCOND, CAN, CLOSE, COMP, HISTEDIT, INPRG, WAPPR, WMATL, WSCH
	}

	public enum WorkType {
		CAL, CM, CMCAL, CP, EM, EMCAL, EV, PM, PMCAL
	}

	public enum WorkLogType {
		APPTNOTE, CLIENTNOTE, UPDATE, WORK
	}
	
	public enum LocAssetStatus {
		ACTIVE, BROKEN, DECOMMISSIONED, IMPORTED, INACTIVE, LIMITEDUSE, MISSING, OPERATING, SEALED
	}

	public enum MeterType {
		CONTINUOUS, GAUGE, CHARACTERISTIC
	}

	public enum ReadingType {
		ACTUAL, DELTA, RESET
	}

	public enum AverageMethod {
		ALL, STATIC
	}

	public enum MaxDomain {
		RAIL_WEAR
	}

	public enum ItemStatus {
		ACTIVE, OBSOLETE, PENDING, PENDOBS, PLANNING
	}

	public enum LocType {
		COURIER, HOLDING, LABOR, OPERATING, REPAIR, SALVAGE, STOREROOM, VENDOR
	}

	public enum ItemType {
		ITEM, STDSERVICE, TOOL
	}

	public enum LineType {
		ITEM, MATERIAL
	}

	public static final String SITEID = "BEDFORD";
	public static final String STOREROOM = "CENTRAL";
	public static final String ORGID = "EAGLENA";
	public static final String TOOL_DESCRIPTION = "TOOL ADDED";
	public static final String DFLTBIN = "bin101";
	public static final String LATITUDEY = "32.265942";
	public static final String LONGITUDEX = "75.646873";
	public static final String ADDRESSTITLE = "Automation Test Address";
	public static final String ISSUEUNIT = "EACH";
	public static final String ITEMSET = "SET1";
	public static final String GLDEBITACCT = "6000-200-000";
	public static final String MANUFACTURER = "EMI";
	public static final String CURRENCYCODE = "USD";
	public static final String LABORNAME = "Sam Murphy";
	public static final String SECONDLABORNAME = "Mike Wilson";
	public static final String MATERIALNAME = "StoreRoom";
	public static final String ACTUALLABORHOUR = "1";
	public static final String SECONDLABOR = "Sam";
	public static final String ASSETLOCATION = "BR200";
	public static final String SRCLASS = "SR";
	public static final String SRSTATUS = "NEW";
	public static final String OWNERGROUP = "ENG";
	public static final String RELTYPE = "FS";
	public static final String GL_ACCOUNT="6000-200-000";
}
