/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import CountBookLineInvBalDetailPageController from './CountBookLineInvBalDetailPageController';
import countBookLineData from './test/test-countbookline-data';
import newTestStub from './test/AppTestStub.js';
import sinon from 'sinon';

it('Load page with AppTestStub', async () => {
  let initializeApp = newTestStub({
    currentPage: 'countBookLineInvBalDetail',
    datasources: {
      countBookDetailDS4MaterialDetail: {
        data: require('./test/test-countbookline-data.js'),
      },
      countbooklineinvbaldetailjsonds: {
        data: require('./test/test-countbookline-data.js'),
      }
    },
  });
  
  let app = await initializeApp();
  let page = app.currentPage;
  let countBookLineInvBalDetailPageController = new CountBookLineInvBalDetailPageController(); 
  page.registerController(countBookLineInvBalDetailPageController);
  app.registerController(countBookLineInvBalDetailPageController);

  let countBookDetailItemDS = page.findDatasource('countBookDetailItemDS');
  sinon.stub(countBookDetailItemDS, 'load');
  
  let countBookDetailds = page.findDatasource('countBookDetailDS4MaterialDetail');
  countBookDetailds.getItems = sinon.spy(() => {
    return countBookLineData.member;
  });
  countBookDetailds.load = sinon.spy(() => {
    return countBookLineData.member;
  });

  page.params.countbooklineid = 267;
  app.state.param_countbookid = 102;
  app.state.param_countbooknum = '1008';
  app.state.param_countbooksiteid = 'BEDFORD';

  await countBookLineInvBalDetailPageController.pageInitialized(page, app); 
  await countBookLineInvBalDetailPageController.pageResumed(page, app);

  app.setCurrentPage = sinon.spy(() => {
    return 1;
  }); 
  countBookLineInvBalDetailPageController.goBack();
});