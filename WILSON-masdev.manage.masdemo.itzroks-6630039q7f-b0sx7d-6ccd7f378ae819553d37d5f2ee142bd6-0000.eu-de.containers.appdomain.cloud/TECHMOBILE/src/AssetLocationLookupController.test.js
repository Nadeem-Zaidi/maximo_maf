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

//import AssetLocationLookupController from "./AssetLocationLookupController";
import newTestStub from "./test/AppTestStub";

it("Choose item from lookup", async () => {
  let initializeApp = newTestStub({
    currentPage: "assetLookup",
    datasources: {
      dsCreateWo: {
        data: require("./test/wo-detail-json-data.js"),
      },
      dsWoedit: {
        data: require("./test/wo-detail-json-data.js"),
      },
      assetLookupDS: {
        data: require("./test/wo-detail-json-data.js"),
      },
    },
  });

  let app = await initializeApp();
  let evt = {
    assetnum: "10001",
    description: "Test-material",
    asset: { manufacturer: "ATI", vendor: "PLUS" },
  };

  app.state.parentPage = "createwo";
  app.setCurrentPage("createwo");
  app.setCurrentPage("woedit");
  app.setCurrentPage("assetLookup");
  app.currentPage.controllers[0].chooseAssetItem(evt);
  expect(app.findDatasource("dsCreateWo").item.assetnum).toEqual("10001");
});
