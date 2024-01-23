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

import {log} from '@maximo/maximo-js-api';
const TAG = 'MaterialsPageController';
class MaterialsPageController {
    pageInitialized(page, app) {
    log.t(TAG, 'Page Initialized');
    this.app = app;
		this.page = page;
		this.page.datasources['jmaterialsds'].state.loading = true;
		this.page.datasources['jtoolsds'].state.loading = true;
    }

	pageResumed(page) {
		let schedulePage = this.app.findPage('schedule') || this.app.findPage("approvals");
		
		/* istanbul ignore next */
		if (!schedulePage.datasources[page.state.selectedDS]) {
			const schPage = (this.app.findPage("schedule")) ? 'schedule' : 'approvals';
			this.app.setCurrentPage(schPage);
			this.app.setCurrentPage('materials');
		}
		/* istanbul ignore next */
		if (schedulePage.datasources[page.state.selectedDS]) {
			schedulePage.datasources[page.state.selectedDS].forceReload();
		}
    }

	/*
	 * Load planned materials/tools list data on the basis of selection from dropdown.
	 */
	async loadMaterialsToolsData(evt) {
		let schedulePage = this.app.findPage('schedule') || this.app.findPage("approvals");
		schedulePage.datasources[evt.selectedItem.id].forceReload();
	}
	
	/*
	 * On item click or select all button store the selection in session storage.
	 */
	storeSelectedItem(evt) {
		this.page.state[this.page.state.selectedDS+evt.datasource] = this.page.datasources[evt.datasource].getSelectedIds();
	}

	/*
	 * Send back to page where he last visited.
	 */
	goBack() {
		this.app.navigateBack();
	}

	/**
   * Process Materials and tools data to be used as new JSON-DataSource.
   */
	async _processMaterialsTools (items) {
		let materialsPage = this.app.findPage("materials");
		let newMaterialsList = [];
		let newToolsList = [];
		items.forEach((item) => {
			const wonumDesc = item.description;
			/* istanbul ignore else */
			if (item.wpmaterial) {
				item.wpmaterial.forEach((item) => {
					newMaterialsList.push(this._buildItem(item,wonumDesc));
				});
			}

			/* istanbul ignore else */
			if (item.wptool) {
				item.wptool.forEach((item) => {
					newToolsList.push(this._buildItem(item,wonumDesc));
				});
			}
		});

		//istanbul ignore next
		materialsPage.state.hideMaterial = newMaterialsList.length ? false : true;
		//istanbul ignore next
		materialsPage.state.hideTool = newToolsList.length ? false : true;
		//istanbul ignore next
		materialsPage.state.hideToolMaterial = newMaterialsList.length || newToolsList.length ? true : false;

		let newMaterial = { wpmaterial: newMaterialsList };
		let jmaterialsds = this.app.findDatasource('jmaterialsds');
		this._resetDataSource(jmaterialsds);
		await jmaterialsds.load({ src: newMaterial });
		this._setSelected(jmaterialsds);

		let newTool = { wptool: newToolsList };
		let jtoolsds = this.app.findDatasource('jtoolsds');
		this._resetDataSource(jtoolsds);
		await jtoolsds.load({ src: newTool });
		this._setSelected(jtoolsds);
	}

	/**
   * Loop through items and build item for materials/tools
   */
	_buildItem(item, wonumDesc) {
		let newObj ={
			itemqty: item.itemqty,
			description: item.description,
			itemnum: item.itemnum,
			location: item.locationnum,
			locationDesc: item.locationdesc,
			wonumDesc: wonumDesc,
			itemnumDesc : item.description && item.itemnum ? item.itemnum + ' ' + item.description 
			: item.itemnum ? item.itemnum : item.description,
			wpitemid: item.wpitemid,
		};
		
		/* istanbul ignore next */
		if(item.hours !== undefined) {
			newObj.locHours = item.hours;
		}
		return newObj;
	}

	/**
   * Reset DS and set src to load.
   */
	_resetDataSource(ds) {
		ds.clearState();
		ds.resetState();
	}

	/**
   * Load selection of item from the session storage and set back to item.
   */
	_setSelected(ds) {
		let materialsPage = this.app.findPage("materials");
		let selectedItemsId = materialsPage.state[materialsPage.state.selectedDS+ds.name];
		/* istanbul ignore else */
		if(selectedItemsId && selectedItemsId.length > 0) {
			for (let i = 0; i < ds.items.length; i++) {
				/* istanbul ignore else */
        if (selectedItemsId.find(x => x === ds.items[i]["wpitemid"])) {
          ds.items[i]._selected = true;
          ds.setSelectedItem(ds.items[i], true);
        }
      }
		}
	}
}

export default MaterialsPageController;
