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
import categorydata from './test/test-category-data.js';
import tktmp from './test/test-sr-tktemp-data.js';
import newTestStub from './test/AppTestStub';



async function getApp() {
	let initializeApp = newTestStub({
		currentPage: 'newRequest',
		datasources: {
			allcategoryds: {
				data: categorydata
			},
			subcategoryds: {
				data: categorydata
			},
			categoryValidationDS: {
				data: categorydata
			},
			tktemplateds: {
				data: tktmp
			},
			checktktds: {
				data: tktmp
			},
			tktempds: {
				data: tktmp
			},
			typeValidationDS: {
				data: tktmp
			}
		}
	});
	let app = await initializeApp();
	app.client.userInfo = {
		defaultSite: "BEDFORD",
		defaultOrg: "EAGLENA",
		personid: 'FITZ',
		displayname: "Fitz Cameron",
		primaryphone: "5582123456789",
		primaryemail: "fitzcam@srmobile.cn"
	};
	app.setCurrentPage = jest.fn();
	return app;
}



it('should go to detail page without default classstructure id', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	controller.gotoDetails(false);
	expect(app.state.topcategorydesc).toBe("");
});



it('should go to detail page with default classstructureid', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.sysProp.defaultClassstructure = "1143";

	controller.gotoDetails(false);
});



it('should go to detail page with top category', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("SECURITY");

	//This is called by goNextLayer
	// controller.gotoDetails(true);

	expect(app.state.topcategorydesc).toBe("Security");
	expect(app.state.selectedSubCategory).toBe("SECURITY");
	expect(app.state.selectedtkt).toBe("");
});



it('should go to subcategory page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("1143");

	expect(app.state.topcategorydesc).toBe("HR");
	expect(app.state.selectedSubCategory).toBe("1143");
	expect(app.state.selectedtkt).toBe("");
});



it('should go to type page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("1202");

	expect(app.state.topcategorydesc).toBe("Reset Password");
	expect(app.state.selectedSubCategory).toBe("1202");
	expect(app.state.selectedtkt).toBe("Reset Password");
});



it('should be able to go back to main page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	expect(page.state.navigateBack).toBeFalsy();
	controller.goBack();
	expect(page.state.navigateBack).toBeTruthy();
});



it('should be able to come back from next page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("RESTROOMS");

	//Simulate the go back from create SR page
	app.state.isback = true;
	app.state.selectedTopCategory = "RESTROOMS";
	await controller.pageResumed(page);
});
