import CommonUtil from "./CommonUtil";
import invusejsonDS from "../test/test-invusejson-data";
import reservationsData from "../test/test-reservations-data";
import { Application } from "@maximo/maximo-js-api";

describe("CommonUtil", () => {
  it("getTotalQtyUsed", async () => {
    let reserveitem = reservationsData.member[0];
    let app = new Application();

    app.allinvuses = invusejsonDS.member;

    const calQty = CommonUtil.getTotalQtyUsed(reserveitem, app);
    expect(calQty).toBeTruthy();

    app.device.isMaximoMobile = true;
    CommonUtil.getTotalQtyUsed(reserveitem, app, 1);
  });

  it("computeDueDate returns empty string", async () => {
    let app = new Application();

    const computedDueDate = CommonUtil.computeDueDate(undefined, app);
    expect(computedDueDate).toBe("");
  });
});
