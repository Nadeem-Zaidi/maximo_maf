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

import FailureDetailsPageController from "./FailureDetailsPageController";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
  Device,
} from "@maximo/maximo-js-api";
import sinon from "sinon";
import workorderitem from "./test/wo-failure-report-json-data";
import failurelist from "./test/failurelist-json-data";

function newDatasource(
  data = workorderitem,
  items = "member",
  idAttribute = "wonum",
  name = "woDetailsReportWork"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: items,
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });

  return ds;
}

const workorder = {
  _rowstamp: "21550310",
  workorderid: 166498,
  problem: {
    description: "Sticky Key",
    failurelist: {
      failurelist: 2138,
    },
  },
  failurecode: "HARDWARE",
  failurereport: [
    {
      _rowstamp: "21550311",
      type_maxvalue: "PROBLEM",
      localref:
        "http://localhost:9001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80/uxshowfailurereport/0-6173",
      failurecode: {
        description: "Sticky Key",
        failurelist: {
          type_maxvalue: "PROBLEM",
          type: "PROBLEM",
          type_description: "Problem",
          failurelist: 2138,
        },
      },
      $alias_this_attr$failurecode: "KEYSTICK",
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE3Mw--",
      type: "PROBLEM",
      type_description: "Problem",
      line_num: 2138,
    },
    {
      _rowstamp: "21550312",
      type_maxvalue: "CAUSE",
      localref:
        "http://localhost:9001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80/uxshowfailurereport/1-6178",
      failurecode: {
        description: "Worn Key",
        failurelist: {
          type_maxvalue: "CAUSE",
          type: "CAUSE",
          type_description: "Cause",
          failurelist: 2154,
        },
      },
      $alias_this_attr$failurecode: "WORNKEY",
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE3OA--",
      type: "CAUSE",
      type_description: "Cause",
      line_num: 2154,
    },
  ],
  failure: {
    description: "Hardware Failures",
    failurelist: {
      failurelist: 2136,
    },
  },
  problemcode: "KEYSTICK",
  siteid: "BEDFORD",
  href:
    "http://localhost:9001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80",
  faildate: "2020-10-22T11:38:20-04:00",
  orgid: "EAGLENA",
  wonum: "SCRAP_4",
  remarkdesc: "REMARK for workorder",
};
const workorder1 = {
  _rowstamp: "21550310",
  workorderid: 166498,
  problem: {
    description: "Sticky Key",
    failurelist: {
      failurelist: 2138,
    },
  },
  failurecode: "",
  failurereport: [],
  failure: {
    description: "Hardware Failures",
    failurelist: {
      failurelist: 2136,
    },
  },
  problemcode: "",
  siteid: "BEDFORD",
  href:
    "http://localhost:9001/maximo/oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80",
  faildate: "2020-10-22T11:38:20-04:00",
  orgid: "EAGLENA",
  wonum: "SCRAP_4",
  remarkdesc: "REMARK for workorder1",
};

it("should load failure details data with failure report", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const reportWorkPage = new Page({ name: "report_work" });

  app.registerController(controller);
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  const failureLstDS = newDatasource(
    [],
    "",
    "failurelistid",
    "dsfailureDetailsList"
  );
  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  const dsSelectingFailureList = newDatasource(
    [],
    "",
    "failurelistid",
    "dsSelectingFailureList"
  );
  dsFailureList.load();
  app.registerDatasource(dsFailureList);

  let loadStubFailureLstDS = sinon.stub(failureLstDS, "load").callThrough();
  let clearSelStubFailureLstDS = sinon
    .stub(failureLstDS, "clearSelections")
    .callThrough();
  page.registerDatasource(failureLstDS);
  page.registerDatasource(dsSelectingFailureList);

  reportWorkPage.registerDatasource(woReportWorkDs);
  await woReportWorkDs.load();

  app.registerPage(page);
  app.registerPage(reportWorkPage);

  await app.initialize();
  controller.pageInitialized(page, app);
  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;
  await controller.loadRecord();

  expect(page.state.failureListArr.length).toEqual(5);
  expect(page.state.failureRemark).toEqual("REMARK for workorder");
  expect(page.state.failureRemarkMaxLength).toEqual(30);
  expect(loadStubFailureLstDS.called).toBe(true);
  expect(clearSelStubFailureLstDS.called).toBe(true);

  await controller.loadRecord();
  expect(page.state.failureListArr.length).toEqual(5);

  page.params.workorder = workorder1;
  await controller.loadRecord();
  expect(page.state.failureListArr.length).toEqual(5);
  expect(page.state.failureRemark).toEqual("REMARK for workorder1");
  expect(page.state.failureRemarkMaxLength).toEqual(30);
});

it("should load failure details data with failure report in container mode", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const reportWorkPage = new Page({ name: "report_work" });

  app.registerController(controller);
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );

  const failureLstDS = newDatasource(
    [],
    "",
    "failurelistid",
    "dsfailureDetailsList"
  );
  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  const dsSelectingFailureList = newDatasource(
    [],
    "",
    "failurelistid",
    "dsSelectingFailureList"
  );
  dsFailureList.load();
  app.registerDatasource(dsFailureList);

  let loadStubFailureLstDS = sinon.stub(failureLstDS, "load").callThrough();
  let clearSelStubFailureLstDS = sinon
    .stub(failureLstDS, "clearSelections")
    .callThrough();
  page.registerDatasource(failureLstDS);
  page.registerDatasource(dsSelectingFailureList);

  reportWorkPage.registerDatasource(woReportWorkDs);
  await woReportWorkDs.load();

  app.registerPage(page);
  app.registerPage(reportWorkPage);

  await app.initialize();
  Device.get().isMaximoMobile = true;
  controller.pageInitialized(page, app);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;
  await controller.loadRecord();
  expect(page.state.failureListArr.length).toEqual(5);
  expect(page.state.failureRemark).toEqual("REMARK for workorder");
  expect(page.state.failureRemarkMaxLength).toEqual(30);
  expect(loadStubFailureLstDS.called).toBe(true);
  expect(clearSelStubFailureLstDS.called).toBe(true);

  page.params.workorder.problemdelete = true;
  await controller.loadRecord();
  expect(page.state.failureListArr[1].readonly).toEqual(false);
  expect(page.state.failureListArr[2].readonly).toEqual(true);
  expect(page.state.failureListArr[3].readonly).toEqual(true);
  expect(page.state.failureListArr.length).toEqual(5);
  Device.get().isMaximoMobile = false;
});

it("should openFailureList failure list", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const page1 = new Page({ name: "report_work" });
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };
  let eventItem = {
    item: {
      title: "Problem",
      failurecode: "HARDWARE",
      description: "Hardware Failures",
      failurelistid: 0,
      failurelist: 2136,
      type: "FAILURECLASS",
      orgid: "EAGLENA",
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE3Mw--",
      readonly: false,
      _bulkid: "1",
    },
  };
  let eventItem1 = {
    item: {
      title: "Problem",
      failurecode: "KEYSTICK",
      description: "Sticky Key",
      failurelistid: 1,
      failurelist: 2138,
      type: "PROBLEM",
      orgid: "EAGLENA",
      parent: 2136,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE3Mw--",
      readonly: false,
      _bulkid: "1",
    },
  };
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );

  page.state = { workorder: workorder };
  app.registerController(controller);

  const failureLstDS = newDatasource(
    [],
    "member",
    "wonum",
    "dsfailureDetailsList"
  );
  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  const dsSelectingFailureList = newDatasource(
    [],
    "",
    "failurelistid",
    "dsSelectingFailureList"
  );

  await dsFailureList.load();
  app.registerDatasource(dsFailureList);
  page.registerDatasource(failureLstDS);
  page.registerDatasource(dsSelectingFailureList);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;

  app.registerPage(page);
  app.registerPage(page1);

  await app.initialize();

  let sarchQBEStubFailureList = sinon
    .stub(dsFailureList, "searchQBE")
    .callThrough();

  controller.pageInitialized(page, app);
  await controller.openFailureList(eventItem);
  expect(sarchQBEStubFailureList.called).toBe(true);

  await controller.openFailureList(eventItem1);
  expect(dsFailureList.items.length).not.toEqual(0);
});

it("delete failure list", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  let delEvent = {
    index: 2,
    item: {
      title: "Cause",
      failurecode: "WRONGPRI",
      description: "Wrong Network Printer Specified",
      failurelistid: 2,
      failurelist: 2288,
      type: "CAUSE",
      orgid: "EAGLENA",
      parent: 2286,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5NA--",
      readonly: false,
      _bulkid: "2",
    },
  };
  app.registerController(controller);
  let failLisArray = [
    {
      title: "Failure class",
      failurecode: "PRINTER",
      description: "Printer Issues",
      failurelistid: 0,
      failurelist: 2284,
      type: "FAILURECLASS",
      parent: "",
      orgid: "EAGLENA",
      readonly: false,
      href: "oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80",
      _bulkid: "0",
    },
    {
      title: "Problem",
      failurecode: "NOPRINT",
      description: "Print Job Not Printing",
      failurelistid: 1,
      failurelist: 2286,
      type: "PROBLEM",
      orgid: "EAGLENA",
      parent: 2284,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5Mw--",
      readonly: false,
      _bulkid: "1",
    },
    {
      title: "Cause",
      failurecode: "WRONGPRI",
      description: "Wrong Network Printer Specified",
      failurelistid: 2,
      failurelist: 2288,
      type: "CAUSE",
      orgid: "EAGLENA",
      parent: 2286,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5OA--",
      readonly: false,
      _bulkid: "2",
    },
    {
      title: "Remedy",
      failurecode: "SPECLOC",
      description: "Specify Local Printer",
      failurelistid: 3,
      failurelist: 2302,
      type: "REMEDY",
      orgid: "EAGLENA",
      parent: 2288,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5OQ--",
      readonly: false,
      _bulkid: "3",
    },
    {
      title: "Details",
      failurecode: "",
      description: "",
      failurelistid: 4,
      failurelist: "",
      type: "",
      orgid: "",
      parent: "",
      href: "",
      readonly: false,
      _bulkid: "4",
    },
  ];
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };
  const failureLstDS = newDatasource(
    [],
    "",
    "failurelistid",
    "dsfailureDetailsList"
  );
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  const failureListDS = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  const dsSelectingFailureList = newDatasource(
    [],
    "",
    "failurelistid",
    "dsSelectingFailureList"
  );
  page.registerDatasource(dsSelectingFailureList);

  let updatestub = sinon.stub(woReportWorkDs, "update");
  let loadstub = sinon.stub(failureLstDS, "load").callThrough();

  page.registerDatasource(failureLstDS);
  app.registerDatasource(failureListDS);
  app.registerPage(page);

  page.params.workorder = workorder;

  page.state.failureListArr = failLisArray;
  page.woDetailsReportWorkDS = woReportWorkDs;
  page.state.deletFailReportList = [];

  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.deleteFailureList(delEvent);

  expect(loadstub.called).toBe(true);
  expect(updatestub.called).toBe(true);
});

it("updateAndSave failure list", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  let updateEvent = {
    item: {
      parent: 2286,
      _rowstamp: "80319",
      failurelistid: 2,
      type_maxvalue: "CAUSE",
      failurecode: {
        failurecode: "WRONGPRI",
        description: "Wrong Network Printer Specified",
      },
      $alias_this_attr$failurecode: "WRONGPRI",
      href: "oslc/os/mxapifailurelist/_MjI4OC9FQUdMRU5B",
      type: "CAUSE",
      orgid: "EAGLENA",
      type_description: "Cause",
      failurelist: 2288,
      _bulkid: "2288",
    },
  };
  app.registerController(controller);
  let failLisArray = [
    {
      title: "Failure class",
      failurecode: "PRINTER",
      description: "Printer Issues",
      failurelistid: 0,
      failurelist: 2284,
      type: "FAILURECLASS",
      parent: "",
      orgid: "EAGLENA",
      readonly: false,
      href: "oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80",
      _bulkid: "0",
    },
    {
      title: "Problem",
      failurecode: "NOPRINT",
      description: "Print Job Not Printing",
      failurelistid: 1,
      failurelist: 2286,
      type: "PROBLEM",
      orgid: "EAGLENA",
      parent: 2284,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5Mw--",
      readonly: false,
      _bulkid: "1",
    },
    {
      title: "Cause",
      failurecode: "WRONGPRI",
      description: "Wrong Network Printer Specified",
      failurelistid: 2,
      failurelist: 2288,
      type: "CAUSE",
      orgid: "EAGLENA",
      parent: 2286,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5OA--",
      readonly: false,
      _bulkid: "2",
    },
    {
      title: "Remedy",
      failurecode: "SPECLOC",
      description: "Specify Local Printer",
      failurelistid: 3,
      failurelist: 2302,
      type: "REMEDY",
      orgid: "EAGLENA",
      parent: 2288,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5OQ--",
      readonly: false,
      _bulkid: "3",
    },
    {
      title: "Details",
      failurecode: "",
      description: "",
      failurelistid: 4,
      failurelist: "",
      type: "",
      orgid: "",
      parent: "",
      href: "",
      readonly: false,
      _bulkid: "4",
    },
  ];
  // FailList < 4
  let failLisArray1 = [
    {
      title: "Failure class",
      failurecode: "PRINTER",
      description: "Printer Issues",
      failurelistid: 0,
      failurelist: 2284,
      type: "FAILURECLASS",
      parent: "",
      orgid: "EAGLENA",
      readonly: false,
      href: "oslc/os/mxapiwodetail/_QkVERk9SRC9TQ1JBUF80",
      _bulkid: "0",
    },
    {
      title: "Problem",
      failurecode: "NOPRINT",
      description: "Print Job Not Printing",
      failurelistid: 1,
      failurelist: 2286,
      type: "PROBLEM",
      orgid: "EAGLENA",
      parent: 2284,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5Mw--",
      readonly: false,
      _bulkid: "1",
    },
    {
      title: "Cause",
      failurecode: "WRONGPRI",
      description: "Wrong Network Printer Specified",
      failurelistid: 2,
      failurelist: 2288,
      type: "CAUSE",
      orgid: "EAGLENA",
      parent: 2286,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5OA--",
      readonly: false,
      _bulkid: "2",
    },
    {
      title: "Remedy",
      failurecode: "SPECLOC",
      description: "Specify Local Printer",
      failurelistid: 3,
      failurelist: 2302,
      type: "REMEDY",
      orgid: "EAGLENA",
      parent: 2288,
      href: "http://childkey#V09SS09SREVSL0ZBSUxVUkVSRVBPUlQvNjE5OQ--",
      readonly: false,
      _bulkid: "3",
    },
    {
      title: "Details",
      failurecode: "",
      description: "",
      failurelistid: 4,
      failurelist: "",
      type: "",
      orgid: "",
      parent: "",
      href: "",
      readonly: false,
      _bulkid: "4",
    },
  ];
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };
  const failureLstDS = newDatasource(
    [],
    "",
    "failurelistid",
    "dsfailureDetailsList"
  );
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  const dsSelectingFailureList = newDatasource(
    [],
    "",
    "failurelistid",
    "dsSelectingFailureList"
  );
  page.registerDatasource(dsSelectingFailureList);
  let updatestub = sinon.stub(woReportWorkDs, "update");
  let loadStubDsfailureDetailsList = sinon
    .stub(failureLstDS, "load")
    .callThrough();

  page.registerDatasource(failureLstDS);
  app.registerDatasource(dsFailureList);
  app.registerPage(page);

  page.params.workorder = workorder;

  page.state.failureListArr = failLisArray;
  page.woDetailsReportWorkDS = woReportWorkDs;
  page.state.selectedFailCode = {
    item: {
      title: "Cause",
      failurelistid: 2,
      failurelist: "",
      type: "CAUSE",
      failurecode: "",
      description: "",
      orgid: "EAGLENA",
      parent: 2286,
      readonly: false,
      _bulkid: "2",
    },
  };
  page.state.deletFailReportList = [];

  await app.initialize();

  controller.pageInitialized(page, app);
  page.state.selectedFailCode = {
    item: {
      title: "Cause",
      failurelistid: 1,
      failurelist: "",
      type: "CAUSE",
      failurecode: "",
      description: "",
      orgid: "EAGLENA",
      parent: 2286,
      readonly: false,
      _bulkid: "2",
    },
  };
  page.state.failureListArr = failLisArray1;
  await controller.updateAndSaveFailureList(updateEvent);
  expect(updatestub.called).toBe(true);
  expect(loadStubDsfailureDetailsList.called).toBe(true);
});

it("done failure list", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const page1 = new Page({ name: "report_work" });
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };

  app.registerController(controller);

  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  app.registerDatasource(dsFailureList);
  app.registerPage(page);
  app.registerPage(page1);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;

  await app.initialize();

  controller.pageInitialized(page, app);
  await controller.doneFailureEdit();
  expect(page1.state.navigateToReportWork).toBeTruthy();
});

it("setRemarks set remark", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const page1 = new Page({ name: "report_work" });
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  const newRemarkValue = "new remark for workorder";
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };

  app.registerController(controller);

  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  app.registerDatasource(dsFailureList);
  app.registerPage(page);
  app.registerPage(page1);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;

  await app.initialize();

  controller.pageInitialized(page, app);
  controller.setRemarks({
    currentTarget: {
      value: newRemarkValue,
    },
  });

  expect(page.state.failureRemark).toEqual(newRemarkValue);
});

it("saveRemark save remark", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const page1 = new Page({ name: "report_work" });
  const newRemarkValue = "new remark for workorder\n";
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };

  let updatestub = sinon.stub(woReportWorkDs, "update");

  app.registerController(controller);

  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  app.registerDatasource(dsFailureList);
  app.registerPage(page);
  app.registerPage(page1);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;

  await app.initialize();

  controller.pageInitialized(page, app);

  controller.setRemarks({
    currentTarget: {
      value: newRemarkValue,
    },
  });

  await controller.saveRemarks();

  expect(updatestub.called).toBe(true);
});

it("setLongDesc set Long Desc", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const page1 = new Page({ name: "report_work" });
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  const newLongDescValue = "Long desc for workorder";
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };

  app.registerController(controller);

  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  app.registerDatasource(dsFailureList);
  app.registerPage(page);
  app.registerPage(page1);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;

  await app.initialize();

  controller.pageInitialized(page, app);
  controller.setLongDesc({
    currentTarget: {
      value: newLongDescValue,
    },
  });

  expect(page.state.failureRemarkLongDesc).toEqual(newLongDescValue);
});

it("saveLongDesc to save long description", async () => {
  const controller = new FailureDetailsPageController();
  const app = new Application();
  const page = new Page({ name: "failure-details" });
  const page1 = new Page({ name: "report_work" });
  const newLongDescValue = "Long desc for workorder\n";
  const woReportWorkDs = newDatasource(
    workorderitem,
    "member",
    "wonum",
    "woDetailsReportWork"
  );
  let workorder = { wonum: "SCRAP_4", siteid: "BEDFORD", orgid: "EAGLENA" };

  let updatestub = sinon.stub(woReportWorkDs, "update");

  app.registerController(controller);

  const dsFailureList = newDatasource(
    failurelist,
    "member",
    "failurelist",
    "dsFailureList"
  );
  app.registerDatasource(dsFailureList);
  app.registerPage(page);
  app.registerPage(page1);

  page.woDetailsReportWorkDS = woReportWorkDs;
  page.params.workorder = workorder;

  await app.initialize();

  controller.pageInitialized(page, app);

  controller.setLongDesc({
    currentTarget: {
      value: newLongDescValue,
    },
  });

  await controller.saveLongDesc();

  expect(updatestub.called).toBe(true);
});
