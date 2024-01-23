/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import newTestStub from './test/AppTestStub';
import sinon from 'sinon';



it('can use the app stub', async () => {
	let spies = {};
	let initializeApp = newTestStub({
		onNewApp: (app) => {
			spies.initSpy = sinon.spy(app, 'initialize');
		},
	});

	await initializeApp();
	expect(spies.initSpy.callCount).toBe(1);
});
