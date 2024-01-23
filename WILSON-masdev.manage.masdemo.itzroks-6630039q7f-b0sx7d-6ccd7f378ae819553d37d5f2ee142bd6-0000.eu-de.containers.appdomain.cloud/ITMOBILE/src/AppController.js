/* eslint-disable no-console */
import { log } from "@maximo/maximo-js-api";
const TAG = "Issues and Transfers app";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, "Issues and Transfers app is initialized");

    // Sets the mxapiinvuse datasource name
    this.app.state.selectedInvUseDSName = "invUseDS";
    if (this.app.device.isMaximoMobile) {
      this.app.state.selectedInvUseDSName = "invUseDS4Cal_local";
    }

    this.app.state.invUseDSTotalCount = 0;

    this.app.allinvuses = [];
    this.app.allreserveditems = [];
    this.app.state.reservationLoaded = false;
    this.app.state.isFromReservedItemsPage = true;

    this.setupIncomingContext();
  }

  onContextReceived() {
    this.setupIncomingContext();
  }

  setupIncomingContext() {
    const incomingContext = this?.app?.state?.incomingContext;
    //istanbul ignore else
    if (incomingContext) {
      //istanbul ignore else
      if (incomingContext.page && incomingContext.href) {
        this.app.setCurrentPage({
          name: incomingContext.page,
          resetScroll: true,
          params: {
            itemhref: incomingContext.href,
          },
        });
      }
    }
  }
}
export default AppController;
