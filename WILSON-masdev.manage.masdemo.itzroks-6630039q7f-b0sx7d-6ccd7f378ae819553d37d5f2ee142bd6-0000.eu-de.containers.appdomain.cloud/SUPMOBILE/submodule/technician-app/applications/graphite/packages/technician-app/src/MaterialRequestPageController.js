/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {Device} from '@maximo/maximo-js-api';
import SynonymUtil from './utils/SynonymUtil';
class MaterialRequestPageController {
	
	/**
	 * Function to set flag for 'put-data-failed' event
	 */
	//istanbul ignore next
	onSaveDataFailed() {
		this.saveDataSuccessful = false;
	}

	pageInitialized(page, app) {
		this.app = app;
		this.page = page;

		// Open material request page from material request sliding drawer and set default state
		this.app.on('page-changing', (nextPage, prevPage) => {
			// istanbul ignore next
			if (prevPage.name === 'materialRequest') {
				if(!prevPage.state.disableMrRequestAction) {
					prevPage.state.useConfirmDialog = true;
				} else {
					prevPage.state.useConfirmDialog = false;
				}
			}
		});
	}
	/**
	 * callback function on dialog event
	 * mrRequest function is being called on this callback.
	 */
	async onCustomSaveTransition() {
		let evt	 = {
		page: this.page
		}
		await this.mrRequest(evt);
		return {saveDataSuccessful: this.saveDataSuccessful, callDefaultSave: false};
	}

	/*
	 * Send back to the previous screen.
	 */
	//istanbul ignore next
	goBack() {
		this.app.navigateBack();
	}
	
	pageResumed() {
		this.page.state.reserveitemAccess = this.app.checkSigOption('MXAPIWODETAIL.ACTUALRESERV');
    	this.page.state.materialAccess = this.app.checkSigOption('MXAPIWODETAIL.ACTUALMATERIAL');
		this.page.state.multipleStore = false;
		this.LoadPageResumed();
	}

	async LoadPageResumed() {
		await this.loadMrLineDs(undefined);
		const woMaterialRequestResource = this.page.datasources['woMaterialRequestResource'];
		await woMaterialRequestResource.load({ noCache: true, itemUrl: this.page.params.href });
		// istanbul ignore else
		if(!this.page.params.mr) {
			await this.addNewRecord();
		}
		await this.loadRecords();
		if (this.app.state.incomingContext && this.app.state.incomingContext.page === 'materialRequest'){
			this.app.state.incomingContext = null;
			return;
		}
		if (this.page.params.mr) {
			const mrLineDS = this.page.datasources["mrLineDS"];
			await mrLineDS.initializeQbe();
			mrLineDS.setQBE('mrnum', '=', this.page.params.mr.mrnum);
			let response= await mrLineDS.searchQBE(undefined, true);
			mrLineDS.item.droppoint = response[0].droppoint;
			mrLineDS.item.priority = response[0].priority;
			mrLineDS.item.requireddate = response[0].requireddate;
			await this.loadMrLineDs(response[0].mrline);
		}
	}

	/**
	 * Function to load MR lines
	 * @param {items} mrLine items
	 */
	async loadMrLineDs (items) {
    let mrLineItems = [];
    //istanbul ignore else
    if (items && items.length) {
      mrLineItems = items;
    }
    let mrLineList = this.page.findDatasource("mrLineDsJson");
    mrLineList.clearState();
    mrLineItems.forEach((item, i) => {
      mrLineItems[i].computedItemDescription =
        mrLineItems[i].itemnum + " " + mrLineItems[i].description;
    });
    let newMrLineItems = { mrLineItems: mrLineItems };
    await mrLineList.load({ noCache: true, src: newMrLineItems });
  }
	/**
	 * Function to view MR lines
	 *  @param {evt} mr lines item as event
	 */
	viewMrline(evt) {
		this.page.showDialog('AddItemDrawer');
		this.page.state.isItemSelected = true;
		let mrLineListDS = this.page.findDatasource('mrLineListDS');
		mrLineListDS.item["itemnum"] = evt.item.itemnum;
		mrLineListDS.item["description"] = evt.item.description;
		mrLineListDS.item["storeloc_desc"] = evt.item.storeloc_desc;
		mrLineListDS.item["storeloc"] = evt.item.storeloc;
		mrLineListDS.item["qty"] = evt.item.qty;
		mrLineListDS.item["orderunit"] = evt.item.orderunit;
		mrLineListDS.item["vendor"] = evt.item.vendor;
		mrLineListDS.item["manufacturer"] = evt.item.manufacturer;
		mrLineListDS.item["mrlineid"] = evt.item.mrlineid;
		mrLineListDS.item["conditioncode"] = evt.item.conditioncode;
		mrLineListDS.item["conditioncode_desc"] = evt.item.conditioncode_desc;

		if(this.page.params.mr) {
			this.page.state.editLookup = false;
			this.page.state.mrlineid = '';
		} else {
			this.page.state.editLookup = true;
			this.page.state.mrlineid = evt.item.mrlineid;
		}
	}

	async loadRecords() {
		let materialRequestSynonymDS = this.page.datasources['materialRequestSynonymDS'];
		await materialRequestSynonymDS.initializeQbe();
		materialRequestSynonymDS.setQBE('domainid', 'in', ['ITEMTYPE', 'ITEMSTATUS']);
		materialRequestSynonymDS.setQBE('maxvalue', 'in', ['ITEM', 'ACTIVE', 'PLANNING', 'PENDOBS']);
		await materialRequestSynonymDS.searchQBE();
		const synonymData = [];
		// istanbul ignore next
		if (materialRequestSynonymDS && materialRequestSynonymDS.items.length > 0) {
			materialRequestSynonymDS.items.forEach((item) => {
				synonymData.push(item.value);
			});
		}
		this.page.state.synonymData = synonymData;
		let setDS = this.app.findDatasource('defaultSetDs');
		let itemListDS = await this.page.datasources['itemListDS'];
		await itemListDS.reset(itemListDS.baseQuery);
		await itemListDS.initializeQbe();
		itemListDS.setQBE('itemtype', 'in', this.page.state.synonymData);
		// istanbul ignore else
		if(setDS && setDS.item['itemsetid']) {
			itemListDS.setQBE('itemsetid', '=', setDS.item['itemsetid']);
		}
		itemListDS.setQBE('status', 'in', this.page.state.synonymData);
		await itemListDS.searchQBE();
		await this.page.datasources['inventoryListDS'].load();

		this.page.state.disableMrRequestAction = true;
		this.page.state.storeLocation = '';
		this.page.state.description = '';
		this.page.state.mrLineList = "";
		this.page.state.isMrLineAdded = false;
		this.page.state.useConfirmDialog = false;
		this.page.state.mrLineLists= [];
		// istanbul ignore next
		if (this.app.state.incomingContext && this.app.state.incomingContext.itemnum && this.app.state.incomingContext.itemsetid && this.app.state.incomingContext.page === 'materialRequest' ) {
			await this.setIncomingContext();
		}
	}

	/**
	 * Function to open the material list drawer
	 */
	async openMaterialListDrawer(evt) {
		let mrLineListDS = this.page.datasources['mrLineListDS'];
		mrLineListDS.item['description'] = '';
		mrLineListDS.item['itemnum'] = '';
		mrLineListDS.item['storeloc'] = '';
		mrLineListDS.item['storeloc_desc'] = '';
		mrLineListDS.item['transtype'] = '';
		mrLineListDS.item['qty'] = 1;
		mrLineListDS.item['vendor'] = '';
		mrLineListDS.item['conditioncode'] = '';
		mrLineListDS.item["conditioncode_desc"] = "";
		this.page.state.hasConditionCode = false;
		this.page.state.saveAction = false;
		this.page.state.disableAction = false;
		this.page.state.isItemSelected = false;
		this.page.showDialog('AddItemDrawer');
		this.page.state.editLookup = false;
	}

	/**
	 * Function to open the item lookup
	 */
	async openItemListLookup(evt) {
		let itemsDS = await evt.page.datasources['itemListDS'];
		let selectedItem;
		// istanbul ignore next
		itemsDS.items.forEach((item) => {
			// istanbul ignore else
			if(item.itemnum === evt.page.datasources.mrLineListDS.item.itemnum) {
				selectedItem = item;
			}
		});
		// istanbul ignore next
		if (selectedItem) {
			itemsDS.setSelectedItem(selectedItem, true);
		} else {
			itemsDS.clearSelections();
		}
		evt.page.showDialog('itemsListLookup');
	}

	/**
	 * Function to open the store location lookup.
	 */
	async openStoreRoomListLookup(evt) {
		let itemsDS = await evt.page.datasources['locationListDS'];
		let selectedItem;
		// istanbul ignore next
		itemsDS.items.forEach((item) => {
			// istanbul ignore else
			if(item.location === evt.page.datasources.mrLineListDS.item.storeloc) {
				selectedItem = item;
			}
		});
		// istanbul ignore next
		if (selectedItem) {
			itemsDS.setSelectedItem(selectedItem, true);
		} else {
			itemsDS.clearSelections();
		}
		evt.page.showDialog('storeRoomListLookup');
	}

	/**
	 * Function to set the location when item selected
	 */
	async setStoreRoom() {
		let inventoryDS = await this.page.datasources['inventoryListDS'];
		await inventoryDS.initializeQbe();
		inventoryDS.setQBE('itemnum', '=', this.page.state.itemnum);
		inventoryDS.setQBE('status', 'in', this.page.state.synonymData);
		await inventoryDS.searchQBE();
		const inventoryList = [];

		inventoryDS.items.forEach((item) => {
			inventoryList.push(item.location);
		});
		this.page.datasources.mrLineListDS.item['storeloc_desc'] = '';
		this.page.datasources.mrLineListDS.item['storeloc'] = '';
		// istanbul ignore next
		if (inventoryList.length > 0) {
			let locationDS = await this.page.datasources['locationListDS'];
			await locationDS.initializeQbe();
			locationDS.setQBE('location', 'in', inventoryList);
			let storeRoom = await locationDS.searchQBE();
			this.storeLocation(storeRoom);
		} else {
			this.page.datasources.mrLineListDS.item['storeloc'] = this.app.client.userInfo.defaultStoreroom;
		}
	}
	/**
	 * Function to set storeroom when it has single record;
	 * OR open store room lookup when it has multiple record;
	 */
	// istanbul ignore next
	async storeLocation(storeRoom) {
		if (storeRoom.length === 1) {
			this.chooseStoreRoom(storeRoom[0]);
			this.page.state.multipleStore = false;
		} else {
			this.openStoreRoomListLookup(this);
			this.page.state.multipleStore = true;
		}
	}
	/**
	 * Function to choose the item from lookup
	 */
	async chooseItem(evt) {
		// istanbul ignore else
		if (evt) {
			// istanbul ignore else
			if (!this.page.state.mrLineList) {
				this.page.state.mrLineList = {};
			}
			this.page.datasources.mrLineListDS.item['itemnum'] = evt.itemnum;
			this.page.datasources.mrLineListDS.item['description'] = evt.description;
			this.page.datasources.mrLineListDS.item['orderunit'] = evt.orderunit;
			this.page.datasources.mrLineListDS.item['manufacturer'] = evt.asset.manufacturer;
			this.page.datasources.mrLineListDS.item['vendor'] = evt.asset.vendor;
			this.page.state.itemnum = evt.itemnum;
			this.page.state.itemsetid = evt.itemsetid;
			// istanbul ignore if
			if(!this.page.state.mrLineList){
				this.page.state.mrLineList={}
			}
			this.page.state.mrLineList['description'] = evt.description;
			this.page.state.mrLineList['orderunit'] = evt.orderunit;
			this.page.state.mrLineList['manufacturer'] = evt.asset.manufacturer;
			this.page.state.mrLineList['vendor'] = evt.asset.vendor;
			this.page.state.isItemSelected = true;
			await this.setStoreRoom();
			this.validateMrLines(this);
			await this.loadConditionCodeDS(evt.itemcondition);
		}
	}

	/**
	 * Function to load MR lines
	 * @param {items} condition code items
	 */
	async loadConditionCodeDS(items) {
		let conditionCodeItems = [];
		this.page.state.hasConditionCode = false;
		this.page.state.mrLineList["conditioncode"] ='';
		this.page.state.mrLineList["conditioncode_desc"] = '';
		/* istanbul ignore else */
		if (items && items.length) {
			this.page.state.hasConditionCode = true;
			this.page.state.disableAction = false;
			conditionCodeItems = items;
		}
		let itemConditionDS = this.page.findDatasource("itemConditionDS");
		itemConditionDS.clearState();
		let conditionCode = { conditionCodeItems: conditionCodeItems };
		await itemConditionDS.load({ noCache: false, src: conditionCode });   
	}
	/**
	 * Function to open condition code from lookup
	 */
	openConditionCodeLookup(evt){
		evt.page.showDialog('conditionCodeLookup');
	}

	/**
	 * Function to select the condition code from lookup
	 */
	selectConditionCode(evt){
		/* istanbul ignore else */
		if (evt) {
			this.page.state.disableAction = true;
			this.page.datasources.mrLineListDS.item['conditioncode'] = evt.conditioncode;
			this.page.datasources.mrLineListDS.item["conditioncode_desc"] = evt.description;
			this.page.state.mrLineList["conditioncode"] = evt.conditioncode;
			this.page.state.mrLineList["conditioncode_desc"] = evt.description;
		}
	}
	/**
	 * Function to choose the store room from lookup
	 */
	async chooseStoreRoom(evt) {
		// istanbul ignore else
		if (evt) {
			this.page.datasources.mrLineListDS.item['storeloc_desc'] = evt.description;
			this.page.datasources.mrLineListDS.item['storeloc'] = evt.location;
			this.page.state.storeloc = evt.location;
			this.page.state.mrLineList['storeLocation'] = evt.location;
			this.page.state.mrLineList['storeloc_desc'] = evt.description;
			this.setOrderUnit();
			// istanbul ignore next
			this.validateMrLines(this);
		}
	}

	/**
	 * Function to choose the store room from lookup
	 */
	async setOrderUnit() {
		let inventoryDS = await this.page.datasources['inventoryListDS'];
		await inventoryDS.initializeQbe();
		inventoryDS.setQBE('itemnum', '=', this.page.state.itemnum);
		inventoryDS.setQBE('location', '=', this.page.state.storeloc);
		inventoryDS.setQBE('itemsetid', '=', this.page.state.itemsetid);
		inventoryDS.setQBE('siteid', '=', this.app.client.userInfo.defaultSite);
		let inventoryData = await inventoryDS.searchQBE();
		// istanbul ignore next
		if (inventoryData.length > 0) {
			let orderunit = inventoryData[0].orderunit || inventoryData[0].issueunit;
			this.page.datasources.mrLineListDS.item['orderunit'] = orderunit;
			this.page.state.mrLineList['orderunit'] = orderunit;
		}
	}

	/**
	 * Function to to validate the form
	 * @param {evt} mr line ds as event
	 */
	async validateMrLines(evt) {
		let itemnum = evt.page.datasources.mrLineListDS.item['itemnum'];
		let storeloc = evt.page.datasources.mrLineListDS.item['storeloc'];
		let quantity = evt.page.datasources.mrLineListDS.item['qty'];
		// istanbul ignore else
		if(this.page.state.mrLineList) {
			this.page.state.mrLineList['quantity'] = quantity;
		}
		
		// istanbul ignore next
		if (itemnum && storeloc && quantity > 0) {
			evt.page.state.disableAction = true;
		} else {
			evt.page.state.disableAction = false;
		}
	}
	/**
	 * Function to add MR lines
	 * @param {evt} page state as event
	 */
	async requestMaterialLine(evt) {
		let mrLineListDS = this.page.datasources['mrLineListDS'];
		this.page.state.loadingMaterialRequest = false;
		this.page.state.description = this.page.state.itemnum + ' ' + this.page.state.mrLineList['description'];
		this.page.state.storeloc_desc = this.page.state.mrLineList['storeloc_desc'];
		this.page.state.storeLocation = this.page.state.mrLineList['storeLocation'];
		this.page.state.mrLineList['quantity'] = mrLineListDS.item["qty"];
		// istanbul ignore else
		//istanbul ignore next
		if(this.page.state.editLookup && this.page.state.mrLineLists.length) {
			let id = this.page.state.mrlineid;
			for(let i = 0; i < this.page.state.mrLineLists.length; i++) {
				if(this.page.state.mrLineLists[i].mrlineid === id) {
						this.page.state.mrLineLists.splice(i, 1);
						break;
				}
		}
		}

		this.page.state.mrLineLists.push({
			description: this.page.state.mrLineList['description'],
			itemnum: this.page.state.itemnum,
			qty: this.page.state.mrLineList['quantity'],
			storeloc: this.page.state.mrLineList['storeLocation'],
			orderunit: this.page.state.mrLineList['orderunit'],
			manufacturer: this.page.state.mrLineList['manufacturer'],
			vendor: this.page.state.mrLineList['vendor'],
			mrlineid: new Date().getTime(),
			storeloc_desc: this.page.state.mrLineList['storeloc_desc'],
			conditioncode: this.page.state.mrLineList["conditioncode"],
			conditioncode_desc: this.page.state.mrLineList["conditioncode_desc"]
		});
		evt.page.findDialog('AddItemDrawer').closeDialog();
		await this.loadMrLineDs(this.page.state.mrLineLists);
		this.page.state.isMrLineAdded = true;
		this.validateMrRequest(this);
	}

	/**
	 * function on value changed event
	 */
	// istanbul ignore next
	onValueChanged(changeObj) {
		let field = changeObj.field;
		if (field === 'requireddate' || field === 'priority' || field === 'qty') {
			this.validateMrRequest(this);
			this.validateMrLines(this);
		}
	}
	/**
	 * Function to to validate the form
	 */
	async validateMrRequest(evt) {
		let requireDate = evt.page.datasources.mrLineDS.item['requireddate'];
		let priority = evt.page.datasources.mrLineDS.item["priority"];
		let hasMRLine = this.page.state.isMrLineAdded;
		// istanbul ignore next
		if (requireDate && hasMRLine && priority > 0) {
			evt.page.state.disableMrRequestAction = false;
		} else {
			evt.page.state.disableMrRequestAction = true;
		}
		// istanbul ignore next
		if(!this.page.state.disableMrRequestAction) {
			this.page.state.useConfirmDialog = true;
		} else {
			this.page.state.useConfirmDialog = false;
		}
	}
	/**
	 * Apply schema to child related datasource.
	 * 
	 * @param {*} childDatasource - Child Datasource referenced via a relationship.
	 */
	/* istanbul ignore next */
	updateSchema(childDatasource) {
		if (childDatasource && childDatasource.dependsOn && childDatasource.options && childDatasource.options.query && childDatasource.options.query.relationship) {
		childDatasource.schema = childDatasource.dependsOn.schema.properties[Object.entries(childDatasource.dependsOn.schema.properties)
			.filter(
			item =>
				item[1].relation &&
				item[1].relation.toUpperCase() ===
				childDatasource.options.query.relationship.toUpperCase()
			)
			.map(obj => obj[0])[0]].items;
		}
	}

	/**
	 * Function to add new record
	 */
	// istanbul ignore next
	async addNewRecord() {
		let mrRequestDS = this.page.datasources['mrLineDS'];
		let mrStatus = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'MRSTATUS', 'MRSTATUS|DRAFT');
		let newMaterialReq = await mrRequestDS.addNew();
		let device = Device.get();
		if (device.isMaximoMobile) {
			this.updateSchema(mrRequestDS);
		}
		mrRequestDS.item['mrnum'] = newMaterialReq.mrnum;
		mrRequestDS.item['shipto'] = newMaterialReq.shipto;
		mrRequestDS.item['priority'] = newMaterialReq.priority || this.page.state.mrPriority;
		mrRequestDS.item['droppoint'] = newMaterialReq.droppoint;
		if(newMaterialReq.requireddate){
			mrRequestDS.item['requireddate'] = newMaterialReq.requireddate
		}
		mrRequestDS.item['status'] = newMaterialReq.status || mrStatus.value;
		mrRequestDS.item['status_description'] = newMaterialReq.status_description || mrStatus.description;
		mrRequestDS.item['statusdate'] = newMaterialReq.statusdate || this.app.dataFormatter.convertDatetoISO(new Date());
		mrRequestDS.item['orgid'] = newMaterialReq.orgid || this.app.client.userInfo.insertOrg;
	}
	/**
	 * Function to create MR request
	 */
	async mrRequest(evt) {
		let mrRequestDS = this.page.datasources['mrLineDS'];
		let woMaterialRequestResource = this.page.datasources['woMaterialRequestResource'];
		this.page.state.useConfirmDialog = false;
		let mrLineLists = [];
		// istanbul ignore else
		if(this.page.state.mrLineLists.length) {
			this.page.state.mrLineLists.forEach((item) => {
				mrLineLists.push(
					{
						mrnum: mrRequestDS.item['mrnum'],
						itemnum: item.itemnum,
						qty: item.qty,
						storeloc: item.storeloc,
						orderunit: item.orderunit,
						manufacturer: item.manufacturer,
						vendor: item.vendor,
						description: item.description,
						mrlineid : item.mrlineid,
						storeloc_desc : item.storeloc_desc,
						conditioncode : item.conditioncode
					}
				);
			});
		}
		let mr = {
			mrnum: mrRequestDS.item['mrnum'],
			shipto: mrRequestDS.item['shipto'],
			priority: mrRequestDS.item['priority'],
			droppoint: mrRequestDS.item['droppoint'],
			requireddate: mrRequestDS.item['requireddate'],
			status: mrRequestDS.item['status'],
			status_description: mrRequestDS.item['status_description'],
			mrline: mrLineLists
		};
		let option = {
			responseProperties: 'mrnum, anywhererefid, status',
		};
		const onDataFailedHandler = this.onSaveDataFailed.bind(this);
		try {
			evt.page.state.loadingMaterialRequest = true;
			evt.page.state.disableMrRequestAction = true;
			this.saveDataSuccessful = true;
			mrRequestDS.on('put-data-failed', onDataFailedHandler);
			await mrRequestDS.put(mr, option);
			await mrRequestDS.forceReload();
		} finally {
			evt.page.state.loadingMaterialRequest = false;
			let wodtlPage = this.app.findPage('workOrderDetails');
			// istanbul ignore else
			if (wodtlPage) {
				this.app.setCurrentPage({
					name: 'workOrderDetails',
					resetScroll: true,
					params: {
						wonum: woMaterialRequestResource.item.wonum,
						siteid: woMaterialRequestResource.item.siteid,
						href: woMaterialRequestResource.item.href,
					},
				});
			}
			// istanbul ignore next
			if(this.saveDataSuccessful || Device.get().isMaximoMobile) {
				wodtlPage.showDialog('slidingwodetailsmaterials');
			}
			mrRequestDS.off('put-data-failed', onDataFailedHandler);
		}
	}
	
	/**
	 *  function to search itemListDS with incoming context of itemId
	 */
	async setIncomingContext() {
		let itemListDS;
		try {
			const mrLineDSItem=JSON.parse(sessionStorage.getItem(
				"mrLineDS_item"
			));
			Object.entries(mrLineDSItem).forEach(
				([key, value]) => {
					if(["droppoint","priority","requireddate"].includes(key)){
						this.page.datasources.mrLineDS.item[key] = value;
					}
				}
			);
			sessionStorage.removeItem("mrLineDS_item");
			const mrLineDsJsonItems=JSON.parse(sessionStorage.getItem(
				"mrLineDsJson_items"
			));
			await this.loadMrLineDs(mrLineDsJsonItems);
			sessionStorage.removeItem("mrLineDsJson_items");
			this.page.state.mrLineLists=JSON.parse(sessionStorage.getItem(
				"mrLineLists"
			));
			sessionStorage.removeItem("mrLineLists");

			const context = this.app.state.incomingContext
			itemListDS = this.page.datasources['itemListDS'];
			await itemListDS.initializeQbe();
			itemListDS.setQBE('itemsetid', context.itemsetid);
			itemListDS.setQBE('itemnum', context.itemnum);
			const itemData = await itemListDS.searchQBE();

			await this.openMaterialListDrawer();

			// istanbul ignore next 
			if (itemData && itemData.length > 0) {
				await this.chooseItem(itemData[0]);
				this.page.state.disableAction = true;
			}

			const mrLineListDSItem=JSON.parse(sessionStorage.getItem(
				"mrLineListDS_item"
			));
			Object.entries(mrLineListDSItem).forEach(
				([key, value]) => {
					if(["qty"].includes(key)){
						this.page.datasources.mrLineListDS.item[key] = value;
					}
				}
			);
			sessionStorage.removeItem("mrLineListDS_item");
		} finally {
			// istanbul ignore next 
			if(itemListDS && itemListDS.lastQuery.qbe && JSON.stringify(itemListDS.lastQuery.qbe) !== "{}") {
				itemListDS.clearQBE();
				await itemListDS.searchQBE(undefined, true);
			}
		}
	}

	/**
	*  function to delete requested MR.
	*/
	async deleteMrRequest(){
		let woDetailsPage = this.app.findPage("workOrderDetails");
		const mrDS = woDetailsPage.findDatasource("mrDS");
		let mrStatus = await SynonymUtil.getDefaultExternalSynonymValue(this.app.findDatasource("synonymdomainData"), "MRSTATUS", "CAN");
		let mr = {
			mrnum: this.page.params.mr.mrnum,
			status: mrStatus
		};
		let option = {
			responseProperties: 'mrnum, status, anywhererefid',
			localPayload: {
				mrnum: this.page.params.mr.mrnum,
				status: mrStatus,
				anywhererefid : mrDS.item.anywhererefid
			}
		}
		try {
			this.page.state.loadingDel = true;
			await mrDS.update(mr, option);
			await mrDS.forceReload();
			
			// istanbul ignore else
			if (woDetailsPage){
				this.app.navigateBack();
				woDetailsPage.showDialog("slidingwodetailsmaterials");
			}
		} finally {
			this.page.state.loadingDel = false;
		}
	}

	/**
	 * Function to delete MR lines
	 * @param {evt} page and app as event
	 */
	async deleteMaterialLine(evt) {
		// istanbul ignore else 
		if(this.page.state.mrLineLists.length) {
			let id = this.page.state.mrlineid;
			for(let i = 0; i < this.page.state.mrLineLists.length; i++) {
				// istanbul ignore else
				if(this.page.state.mrLineLists[i].mrlineid === id) {
						this.page.state.mrLineLists.splice(i, 1);
						break;
				}
			}
		}
		// istanbul ignore else
		if(!this.page.state.mrLineLists.length) {
			this.page.state.isMrLineAdded = false;
		}

		evt.page.findDialog('AddItemDrawer').closeDialog();
		await this.loadMrLineDs(this.page.state.mrLineLists);
		this.validateMrRequest(this);
	}

}

export default MaterialRequestPageController;
