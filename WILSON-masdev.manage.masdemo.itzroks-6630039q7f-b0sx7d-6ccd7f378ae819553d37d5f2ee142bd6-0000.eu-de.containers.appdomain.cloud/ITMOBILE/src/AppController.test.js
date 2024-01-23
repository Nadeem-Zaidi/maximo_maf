import AppController from "./AppController";

import { Application, Page } from "@maximo/maximo-js-api";

describe("AppController", () => {
  it("loads controller", async () => {
    const controller = new AppController();
    let appInitSpy = jest.spyOn(controller, "applicationInitialized");
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });

  it("setupIncomingContext should call setCurrentPage", async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({ name: "invUsage" });
    app.registerPage(page);
    // mock the setCurrentPage
    const mockSetPage = jest.fn();
    app.setCurrentPage = mockSetPage;

    app.registerController(controller);

    app.device.isMaximoMobile = true;

    app.state.incomingContext = {
      page: "invUsage",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
    };
    await app.initialize();
    controller.onContextReceived();

    expect(mockSetPage.mock.calls[0][0].name).toBe("invUsage");
    expect(mockSetPage.mock.calls[0][0].params.itemhref).toEqual(
      "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE"
    );
  });
});
