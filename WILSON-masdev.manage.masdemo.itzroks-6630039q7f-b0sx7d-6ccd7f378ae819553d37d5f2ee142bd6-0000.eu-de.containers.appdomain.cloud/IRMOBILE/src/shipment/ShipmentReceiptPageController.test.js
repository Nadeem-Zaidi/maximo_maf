import ShipmentReceiptPageController from "./ShipmentReceiptPageController";

import { Application, Page } from "@maximo/maximo-js-api";

it("Receipt page test", async () => {
  let app = new Application();
  const receiptpage = new Page({
    name: "receiptpage",
    clearStack: false,
  });

  let receiptController = new ShipmentReceiptPageController();
  app.registerController(receiptController);
  await app.initialize();
  app.registerPage(receiptpage);
  receiptpage.registerController(receiptController);
  receiptController.pageInitialized(receiptpage, app);
  receiptController.pageResumed(receiptpage, app);
  receiptController.goBack();
});
