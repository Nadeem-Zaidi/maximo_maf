/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

class AttachmentDataController {
	onDatasourceInitialized(ds, owner, app) {
		this.datasource = ds;
		this.owner = owner;
		this.app = app;
	}

	// istanbul ignore next
	onAfterLoadData(datasource, items, query) {
		if (this.app.state.isMobileContainer) {
			this.app.state.attachCount = items.length;
		}
	}

}

export default AttachmentDataController;
