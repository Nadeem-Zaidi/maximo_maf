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

import 'regenerator-runtime/runtime';
import categorydata from './test/test-category-data.js';
import subcategorydata from './test/test-subcategory-data.js';
import tktmp from './test/test-sr-tktemp-data.js';
import newTestStub from './test/AppTestStub';



async function getApp() {
	let initializeApp = newTestStub({
		currentPage: 'SubCategory',
		datasources: {
			allcategoryds: {
				data: categorydata
			},
			subcategoryds: {
				data: subcategorydata
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



it('should open the subcategory page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.selectedSubCategory = "1138";

	app.state.isback = true;
	await controller.pageResumed(page);
});



it('should go to detail page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.pagelist = [];

	await controller.gotoDetails();

	app.state.isUpdateFromBack = true;

	await controller.gotoDetails();
});



it('should be able to navigate between pages', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.selectedSubCategory = "1138";

	app.state.pagelist = [];

	await app.datasources.subcategoryds.load();

	let items = app.datasources.subcategoryds.dataAdapter.items;

	//item[0] has children is true.
	let event1 = items[0];
	event1.displayIcon = "maximo:select--end";
	await controller.subcategoryLayer(event1);
	expect(app.state.subcategory).toBe('HR');
	expect(app.state.pagelist.length).toBe(1);

	//item[1] has children is false, but tktexist !==0.
	let event2 = items[1];
	event2.displayIcon = "carbon:arrow--right";
	await controller.subcategoryLayer(event2);
	expect(app.state.selectedtkt).toBe('Terminate Employee');
	expect(app.state.selectedSubCategory).toBe('1155');
	expect(app.state.pagelist.length).toBe(2);

	//item[4] has children is false, and tktexist===0.
	let event3 = items[4];
	event3.displayIcon = "maximo:select--end";
	await controller.subcategoryLayer(event3);
	expect(app.state.subcategory).toBe('Transfer');
	expect(app.state.pagelist.length).toBe(3);

	//Verify the go back functions.
	controller.goBack();
	expect(app.state.pagelist.length).toBe(2);
	controller.goBack();
	expect(app.state.pagelist.length).toBe(1);
	controller.goBack();
	expect(app.state.pagelist.length).toBe(0);
	controller.goBack();
	expect(app.state.navigateBack).toBeTruthy();

	// Covers the code in pageResumed.
	app.state.selectedSubCategory = '1143';
	app.state.subcategory = 'HR';
	app.state.currSubCategoryID = '1155';
	app.state.currSubCategoryDesc = 'Terminate Employee';
	await controller.pageResumed(page, app);

	// Covers test for go back to newRequest page.
	app.state.pagelist.push({
		pagename: 'newRequest',
		id: ''
	});
	controller.goBack();
	expect(app.state.navigateBack).toBeTruthy();

	await app.datasources.subcategoryds.search("123");
	app.state.isback = true;
	await controller.subcategoryLayer(event1);

	// Test ignore clicks while category hierarchy is being validated (display icon empty)
	event1.displayIcon = "";
	let pagelistLengthBeforeLoadingTest = app.state.pagelist.length;
	await controller.subcategoryLayer(event1);
	expect(app.state.pagelist.length).toBe(pagelistLengthBeforeLoadingTest);

	// Test go back from createSR page
	app.lastPage = { name: 'createSR' };
	await controller.pageResumed();
}); 



it('should load children of subcategory', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.selectedSubCategory = "1138";

	app.state.pagelist = [];

	await app.datasources.subcategoryds.load();

	let items = app.datasources.subcategoryds.dataAdapter.items;

	let event = items.find((item) => item.classstructureid === '1154');
	event.displayIcon = "carbon:arrow--right";
	await controller.subcategoryLayer(event);
	expect(app.datasources.subcategoryds.items.length).toBe(1);
	expect(app.datasources.subcategoryds.items[0].classstructureid).toBe('91154');
});
