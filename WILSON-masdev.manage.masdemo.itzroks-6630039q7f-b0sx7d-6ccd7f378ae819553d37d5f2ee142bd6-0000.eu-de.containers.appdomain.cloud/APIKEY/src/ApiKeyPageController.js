/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2021, 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


class ApiKeyPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    }

  pageResumed(page) {
    this.page = page;
  }

  async handleCreateApiKey() {
		this.page.datasources.useridlookupds.clearSelections();
    await this.page.datasources.apikeyds.addNew();
    this.page.showDialog('createapikeydialog');
  }

  async handleCreateNewApiKey() {
		await this.page.datasources.apikeyds.save();
		this.page.datasources.apikeyds.popNewItem()
		await this.page.datasources.apikeyds.forceReload();
  }

	// istanbul ignore next
  handleCopyApiKey(event) {
    var value = event.item.apikey;
		this.app.toast(this.app.getLocalizedMessage(
			'apikey',
			'copiedtoclipboard',
			"Copied to clipboard"
		));
		if (window.clipboardData && window.clipboardData.setData) {
			return window.clipboardData.setData("Text", value);
		} 
		else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
			var dummy_input = document.createElement('INPUT');
			dummy_input.setAttribute('id', 'dummy_input_copy');
			dummy_input.setAttribute('type', 'text');
			dummy_input.setAttribute('value', value);
			document.body.appendChild(dummy_input);
		
			var justForCopy = document.getElementById('dummy_input_copy');
			justForCopy.select();

			try {
				var copy = document.execCommand("copy");
				return copy;
			} 
			catch (ex) {
				console.warn("Copy to clipboard failed.", ex);
				return false;
			} 
			finally {
				document.body.removeChild(dummy_input);
			}
		}
  }

  async handleDeleteApiKey(event) {
    await this.page.datasources.apikeyds.delete(event.item);
    await this.page.datasources.apikeyds.forceReload();
  }
}

export default ApiKeyPageController;