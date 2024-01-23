/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log, Device, ShellCommunicator } from "@maximo/maximo-js-api";
import { Browser } from "@maximo/maximo-js-api/build/device/Browser";
import WOTimerUtil from "./utils/WOTimerUtil";
import WOUtil from "./utils/WOUtil";
import "regenerator-runtime/runtime";
import MapPreLoadAPI from "@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI";
import SynonymUtil from "./utils/SynonymUtil";
import commonUtil from "./utils/CommonUtil";
const TAG = "SchedulePageController";

//symbol for highlighting wo pin on map
let highlightSymbol = {
  url:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSI2NXB4IiB2aWV3Qm94PSIwIDAgMzMgNjUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfYWN0aXZlX3NlbGVjdGVkPC90aXRsZT4KICAgIDxnIGlkPSJXb3JrLW9yZGVyLC1tYXAtdmlldy0odXBkYXRlZC1zMzMpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFwLWljb25zLS0tc29saWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjUuMDAwMDAwLCAtMjIwMS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9InBpbi13b3JrLW9yZGVyX2FjdGl2ZV9zZWxlY3RlZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA5LjA1MDE4OSwgMjIwMS40OTk1MDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMiwwIEM0MC44MzY1NTYsMCA0OCw3LjE2MzQ0NCA0OCwxNiBMNDgsMzUgTDQ3Ljk4MTYxMzYsMzUuMDAwMjUzNSBDNDcuOTkxMTg3OSwzNS4xOTI0NDYxIDQ3Ljk5NzMzNjgsMzUuMzg1NTYxNyA0OCwzNS41Nzk1NDE1IEM0Ny45OTY0NzAxLDM4LjgyOTY4MDMgNDYuOTU5MjU0LDQxLjk5MDc3MjkgNDUuMDQzOTcyMiw0NC42MDc5ODMxIEw0NC44LDQ0LjkzMjI2ODggTDMyLDYzLjYzNzcyMzMgTDE5LjIsNDQuOTMyMjY4OCBDMTcuMTI4OTc1Myw0Mi4yNTQwNDI3IDE2LjAwMzY3NywzOC45NjUxMDI4IDE2LDM1LjU3OTU0MTUgQzE2LjAwMjY2MzIsMzUuMzg1NTYxNyAxNi4wMDg4MTIxLDM1LjE5MjQ0NjEgMTYuMDE4Mzg2NCwzNS4wMDAyNTM1IEwxNiwzNSBMMTYsMTYgQzE2LDcuMTYzNDQ0IDIzLjE2MzQ0NCwwIDMyLDAgWiIgaWQ9IlBhdGgiIGZpbGw9IiMwRjYyRkUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJyZWFkeSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNiwwIEMyNC44MzY1NTYsLTEuNjIzMjQ5ZS0xNSAzMiw3LjE2MzQ0NCAzMiwxNiBMMzIsMjIgTDMyLDIyIEwwLDIyIEwwLDE2IEMtMS4wODIxNjZlLTE1LDcuMTYzNDQ0IDcuMTYzNDQ0LDEuNjIzMjQ5ZS0xNSAxNiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iIzBGNjJGRSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtQ29weS00IiBmaWxsPSIjRkZGRkZGIiBjeD0iMTYiIGN5PSIxMyIgcj0iNSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjAwMDAwMCwgMjIuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDAwMDAwLCA1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy41NjI1LDEuMjQ5OTY0NTIgQzYuMzYzODg3NTQsMS4yNDU5MjEwMSA1LjE5MDQxOTUsMS41OTM2MTUyNCA0LjE4NzUsMi4yNSBMOC4xODc1LDYuMjUgQzguNDU2NjI2MjUsNi40Nzk2MjIzMSA4LjYyMTY2MDI0LDYuODA4MTY0MzUgOC42NDUxOTI4Nyw3LjE2MTE1MzgxIEM4LjY2ODcyNTUsNy41MTQxNDMyNiA4LjU0ODc2Mzc2LDcuODYxNjg1MDMgOC4zMTI1LDguMTI1IEM4LjA0OTE4NTAzLDguMzYxMjYzNzYgNy43MDE2NDMyNiw4LjQ4MTIyNTUgNy4zNDg2NTM4MSw4LjQ1NzY5Mjg3IEM2Ljk5NTY2NDM1LDguNDM0MTYwMjQgNi42NjcxMjIzMSw4LjI2OTEyNjI1IDYuNDM3NSw4IEwyLjMxMjUsNCBDMS41OTkzMDgxNyw1LjA0OTQ1OTQgMS4yMjgxODEwMyw2LjI5MzgyNjg2IDEuMjUsNy41NjI1IEMxLjI2MzcwMzMzLDExLjA0MzEwNTYgNC4wODE4OTQ0MiwxMy44NjEyOTY3IDcuNTYyNSwxMy44NzUgQzguMTA5NzMxNDMsMTMuODc3OTk0IDguNjU1MzMwMjEsMTMuODE1MDQwMyA5LjE4NzUsMTMuNjg3NSBMMTMuMzc1LDE3Ljg3NSBDMTQuNjAwMzgxOCwxOS4xMDAzODE4IDE2LjU4NzExODIsMTkuMTAwMzgxNyAxNy44MTI1LDE3Ljg3NSBDMTkuMDM3ODgxNywxNi42NDk2MTgyIDE5LjAzNzg4MTgsMTQuNjYyODgxOCAxNy44MTI1LDEzLjQzNzUgTDEzLjYyNSw5LjI1IEMxMy43NTI1NDAzLDguNzE3ODMwMjEgMTMuODE1NDk0LDguMTcyMjMxNDMgMTMuODEyNSw3LjYyNSBDMTMuODQ2MDg5OCw1Ljk0NTg0NjE0IDEzLjIwMjQ2ODIsNC4zMjM4MzE2IDEyLjAyNjcwNTQsMy4xMjQ1NTM1NiBDMTAuODUwOTQyNiwxLjkyNTI3NTUxIDkuMjQxOTg5NzYsMS4yNDk2NjQwNyA3LjU2MjUsMS4yNDk5NjQ1MiBaIE0xMi41NjI1LDcuNTYyNSBDMTIuNTYxNTgzMSw4LjAwNjYwODE4IDEyLjQ5ODQ3LDguNDQ4Mzk5NCAxMi4zNzUsOC44NzUgTDEyLjE4NzUsOS41NjI1IEwxMi42ODc1LDEwLjA2MjUgTDE2Ljg3NSwxNC4yNSBDMTcuMjM1NDM5MywxNC41OTEyMzQyIDE3LjQzODk3ODIsMTUuMDY2MTU4MyAxNy40Mzc1LDE1LjU2MjUgQzE3LjQ1MTc0MTEsMTYuMDYxMzU2NiAxNy4yNDYwNjI1LDE2LjU0MTI3MzUgMTYuODc1LDE2Ljg3NSBDMTYuNTMyOTAzOCwxNy4yMzQyMDEgMTYuMDU4NTM5NCwxNy40Mzc1IDE1LjU2MjUsMTcuNDM3NSBDMTUuMDY2NDYwNiwxNy40Mzc1IDE0LjU5MjA5NjIsMTcuMjM0MjAxIDE0LjI1LDE2Ljg3NSBMMTAuMDYyNSwxMi42ODc1IEw5LjU2MjUsMTIuMTg3NSBMOC44NzUsMTIuMzc1IEM4LjQ0ODM5OTQsMTIuNDk4NDcgOC4wMDY2MDgxOCwxMi41NjE1ODMxIDcuNTYyNSwxMi41NjI1IEM2LjIzNDQyMDU2LDEyLjU1ODgxMTMgNC45NTg3MjA5OCwxMi4wNDQwNTUzIDQsMTEuMTI1IEMzLjAxOTU2MjY3LDEwLjIwMjQ2MDUgMi40NzQ3MzQzNyw4LjkwODQ5MzM0IDIuNSw3LjU2MjUgQzIuNTAwODYxOTUsNy4wOTc4NTMxOSAyLjU2MzkyMiw2LjYzNTQxMjggMi42ODc1LDYuMTg3NSBMNS40Mzc1LDguOTM3NSBDNS45MDY4OTQ1Nyw5LjQ0ODI5NDM4IDYuNTYxNzM4MzIsOS43NDkyMTIxMyA3LjI1NTA1NjI5LDkuNzcyNzE0NDMgQzcuOTQ4Mzc0MjYsOS43OTYyMTY3MyA4LjYyMjA5MjU3LDkuNTQwMzM0OTkgOS4xMjUsOS4wNjI1IEM5LjYwMjgzNDk5LDguNTU5NTkyNTcgOS44NTg3MTY3Myw3Ljg4NTg3NDI2IDkuODM1MjE0NDMsNy4xOTI1NTYyOSBDOS44MTE3MTIxMyw2LjQ5OTIzODMyIDkuNTEwNzk0MzgsNS44NDQzOTQ1NyA5LDUuMzc1IEw2LjI1LDIuNjI1IEM2LjY1NDIxNTI0LDIuNDk3MTYwMjYgNy4wNzYwNjYyLDIuNDMzODgyNjEgNy41LDIuNDM3MzUzMjQgQzguODI4MDc5NDQsMi40NDExODg3IDEwLjEwMzc3OSwyLjk1NTk0NDY3IDExLjA2MjUsMy44NzUgQzEyLjAyMjEwNDQsNC44NjI5MjI5NSAxMi41NTk5OTg5LDYuMTg1MjQ2OTEgMTIuNTYyNSw3LjU2MjUgTDEyLjU2MjUsNy41NjI1IFoiIGlkPSJGaWxsIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
  color: "",
  offsetx: 16,
  offsety: 56,
  width: 36,
  height: 70,
  scale: 1,
};

//symbol for highlighting wo cluster on map
let highlightSymbolCluster = {
  url:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSI0NXB4IiB2aWV3Qm94PSIwIDAgNDMgNDUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLWNsdXN0ZXJfc2VsZWN0ZWQ8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSI2Li1CYWRnZXMtKy1UYWdzL0xvY2F0aW9uLVBpbnMvMzJweC9kYXJrLUNvcHktNTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMC45NDk4MTEsIC05LjUwMDUwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzUuMDU5NzEyNiwxMCBMMzcuMjc5NDE0NCwxMC4wMDIxNzg0IEM0NS44ODIyODg0LDEwLjEwNDk2NjggNTIuODgxMjIwNywxNy4wNTM5MTYgNTMsMjUuNzA5NTM5NCBDNTIuOTk2NDc5NiwyOC45NTI0NDg1IDUxLjk3Mjc4NzYsMzIuMTA3NDM0OSA1MC4wODA5MTAyLDM0LjczMDA3OTggTDQ5Ljc3NSwzNS4xMzk2OTI5IEwzNi44NzUsNTQgTDMzLjQ4NTAyNzcsNDkuMDQ0NTc1NCBMNDEuNjgzMjQ2NSwzNy4wNTgxNjEgTDQxLjk0MjIyOTMsMzYuNzE1MDgxMSBDNDQuMjY2MjQ3NSwzMy41MjI0ODIxIDQ1LjUyNDQ1MDYsMjkuNjcxODI1NCA0NS41Mjg3NDgxLDI1LjcxMzEwMiBDNDUuNDM4ODUxNywxOS4xNDYwNTI5IDQxLjk0MjIyOTMsMTIuNzIwNDg1NCAzNS4wNTk3MTI2LDEwIFogTTQzLjI1LDI1LjcwOTUzOTQgQzQzLjI0NjQ3OTYsMjguOTUyNDQ4NSA0Mi4yMjI3ODc2LDMyLjEwNzQzNDkgNDAuMzMwOTEwMiwzNC43MzAwNzk4IEw0MC4wMjUsMzUuMTM5NjkyOSBMMjcuMTI1LDU0IEwxNC4yMjUsMzUuMTM5NjkyOSBDMTIuMTM3Nzk1NCwzMi40MzkyOTUyIDExLjAwMzcwNTcsMjkuMTIzMTI3OSAxMSwyNS43MDk1Mzk0IEMxMS4xMTg3NzkzLDE3LjA1MzkxNiAxOC4xMTc3MTE2LDEwLjEwNDk2NjggMjYuNzIwNTg1NiwxMC4wMDIxNzg0IEwyNy4xMjUsMTAuMDAyMzk0MSBDMzUuOTExODkyLDkuODg4MjI4ODMgNDMuMTI5MzY0OCwxNi45MTg2NzE5IDQzLjI1LDI1LjcwOTUzOTQgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjMEY2MkZFIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSJOdW1iZXItb3ItaWNvbj8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTAuMDAwMDAwKSI+PC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
  color: "",
  offsetx: 17,
  offsety: 53,
  width: 45,
  height: 70,
  scale: 1,
};

class SchedulePageController {
  pageInitialized(page, app) {
    log.t(TAG, "Page Initialized");
    this.app = app;
    this.page = page;
    
    try {
      this.mapPreloadAPI = new MapPreLoadAPI();
    } catch(error) {
      log.t(TAG, error);
    }
  
    let device = Device.get();
    this.page.state.mapWOListHeight = "35%";
    if (device.isTablet || device.isIpad) {
      this.page.state.mapPaddingRight = "1rem";
      this.page.state.mapPaddingLeft = "0.5rem";
      this.page.state.mapWOListHeight = "25%";
      this.page.state.mapWOCardHeight = "40%";
    }
    this.page.state.mapPaddingBottom = "calc(100vh - 9rem)";
    if (device.isMaximoMobile) {
      this.page.state.mapPaddingBottom = "calc(100vh - 5rem)";
      this.page.state.mapWOCardHeight = "50%";
    }
    this.getTravelSystemProperties();
  }

  /**
   * Method implemented in controller itself.
   */
  constructor() {
    this.onUpdateDataFailed = this.onUpdateDataFailed.bind(this);
    this.saveDataSuccessful = true;
    ShellCommunicator.get().on("TRANSACTION_UNDONE", this.handleDeleteTransaction.bind(this));
  }

  /**
   * Get systemproperties and store in a state.
   */
  async getTravelSystemProperties() {   
    if (this.app.client && typeof this.app.client.getSystemProperties === 'function'){
      this.app.state.systemProp = await this.app.client.getSystemProperties('mxe.mobile.travel.prompt,mxe.mobile.travel.radius,mxe.mobile.travel.navigation,maximo.mobile.usetimer,maximo.mobile.statusforphysicalsignature,maximo.mobile.completestatus,mxe.mobile.navigation.windows,mxe.mobile.navigation.android,mxe.mobile.navigation.ios,maximo.mobile.allowmultipletimers,maximo.mobile.safetyplan.review,maximo.mobile.gotoreportwork');
    }    
  }

  /**
   * Called when map is initialized
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  onMapInitialized(map) {
    this.app.map = map;
  }

  /**
   * Redirects to details page
   * @param {Object} listItem - clicked item from list
   */
  showWODetail(item) {
    // istanbul ignore else
    if (item && (item.wonum || item.href)) {
      this.app.setCurrentPage({
        name: "workOrderDetails",
        resetScroll: true,
        params: {
          wonum: item.wonum,
          siteid: item.siteid,
          href: item.href,
          firstLogin: this.page.state.firstLogin,
        },
      });
    }
  }

  /**
   * Compute sliding drawer title
   * Return array to be used in localized label
   * @param {Object} item datasource item
   * @returns {Array} tuple with label id and fallback label
   */
  getDrawerLabel({ toolcount = null, materialcount = null }) {
    const hasTools = toolcount;
    const hasMaterial = materialcount;

    let label = ["materialsAndToolsLabel", "Materials and tools"];
    if (hasTools && !hasMaterial) {
      label = ["toolsLabel", "Tools"];
    }
    if (hasMaterial && !hasTools) {
      label = ["materialsLabel", "Materials"];
    }
    return label;
  }

  /**
   * Function to open a sliding-drawer dialog to show Materials and Tools for the Work Order
   * @param event should contain
   * item - The Work Order selected.
   * datasource - The Datasource to filter Materials and Tools listed in the Dialog.
   */
  async openDrawer(event) {
    await event.datasource.load({ itemUrl: event.item.href });
    const [labelId, fallback] = this.getDrawerLabel(event.item);
    this.page.state.dialogLabel = this.app.getLocalizedLabel(labelId, fallback);
    this.page.showDialog("slidingwomaterials");
  }

  /**
   * Function to open a sliding-drawer dialog to show Work Log for the Work Order with Long Description in Expanded View
   * @param event - should contain
   * event - event containing information about current item.
   * datasource - The Synonymdata Datasource to filter logType
   * item - The Work ORder Selected
   */
  async openWorkLogDrawer(event) {
    // Initialized Loader on Button when Work Log Drawer Icon Clicked
    this.page.state.currentItem = event.item.wonum;
    this.page.state.chatLogLoading = true;
    // Filter Logtype data from synonydomain Datasource which passed in Chat-log Component
    const synonymDs = this.app.datasources["synonymdomainData"];
    synonymDs.clearState();
    await synonymDs.initializeQbe();
    synonymDs.setQBE('domainid', '=', 'LOGTYPE');
    await synonymDs.searchQBE();

    const wodetails = this.page.datasources["wodetails"];
    await wodetails.load({ noCache: true, itemUrl: event.item.href });
    this.page.state.workLogItem = event.item;
    this.page.state.defaultLogType = "!CLIENTNOTE!";

    await this.page.datasources["woWorklogDs"].load().then((response) => {
        this.page.state.chatLogGroupData = response;
    });

    

    let woWorklogDs = this.page.datasources["woWorklogDs"];
    // istanbul ignore if
    if (Device.get().isMaximoMobile && woWorklogDs.options.query.relationship) {
      //Get schema of childdatasource.
      woWorklogDs.schema =
        woWorklogDs.dependsOn.schema.properties[
          Object.entries(woWorklogDs.dependsOn.schema.properties)
            .filter(
              (item) =>
                item[1].relation &&
                item[1].relation.toUpperCase() ===
                  woWorklogDs.options.query.relationship.toUpperCase()
            )
            .map((obj) => obj[0])[0]
        ].items;
    }

    let schemaLogType = woWorklogDs.getSchemaInfo("logtype");
    let schemaDescription = woWorklogDs.getSchemaInfo("description");
    // istanbul ignore else
    if (schemaLogType) {
      this.page.state.defaultLogType = schemaLogType.default;
      this.page.state.initialDefaultLogType = schemaLogType.default;
    }

    // istanbul ignore else
    if (schemaDescription) {
      this.page.state.chatLogDescLength = schemaDescription.maxLength;
    }

    // Open Work Log Drawer once all Data Loaded
    this.page.showDialog("workLogDrawer");
    // Stop Loading of Chat Log Icon touchpoint once all data loaded
    this.page.state.chatLogLoading = false;
  }

  /**
  * Validate before closing sliding drawer.
  * @param {validateEvent} validateEvent
  */
  workLogValidate(validateEvent) {
    if (this.page.state.isWorkLogEdit) {
      validateEvent.failed = true;
      this.page.showDialog('saveDiscardWorkLog');
    } else {
      validateEvent.failed = false;
    }
  }

  /**
  * This method calls when click save button on save discard prompt.
  */
  saveWorkLogSaveDiscard() {
    // Save Entered Data to chat Log
    if (!this.page.state.workLogData?.sendDisable) {
      this.saveWorkLog(this.page.state.workLogData);
    }
  }

  /**
  * This method calls when click discard button on save discard prompt.
  */
  closeWorkLogSaveDiscard() {
    // Close Work Log Drawer
    this.page.findDialog('workLogDrawer')?.closeDialog();
  }

  /**
  * This method is called when any changes done on work log screen and return value as Object with all field value.
  * @param {value} value
  */
  watchChatLogChanges(value) {
    // Clear Debounce Timeout
    clearTimeout(this.page.state.workLogChangeTimeout);
    // Set Debounce Timeout
    this.page.state.workLogChangeTimeout = setTimeout(() => {
      if (value?.summary || value?.longDescription || value?.logType?.value !== this.page.state.initialDefaultLogType?.replace(/!/g, "") || value?.visibility) {
        this.page.state.isWorkLogEdit = true;
        this.page.state.workLogData = value;
        // Clear Debounce Timeout
        clearTimeout(this.page.state.workLogChangeTimeout);
      } else {
        this.page.state.isWorkLogEdit = false;
        this.page.state.workLogData = null;
        // Clear Debounce Timeout
        clearTimeout(this.page.state.workLogChangeTimeout);
      }
    }, 500);
  }

  /*
   * Method to add new work log
   */
  async saveWorkLog(value) {
    let longDescription = value.longDescription;
    let summary = value.summary;
    let longType = value.logType?.value? value.logType.value : this.page.state.defaultLogType;
    let woWorklogDs = this.page.datasources["woWorklogDs"];
    // istanbul ignore else
    let workLog = {
      createby: this.app.client.userInfo.personid,
      createdate: new Date(),
      logtype: longType,
      description: summary,
      anywhererefid: new Date().getTime(),
      description_longdescription: longDescription,
      clientviewable: value.visibility
    };
    let option = {
      responseProperties:
        "anywhererefid,createdate,description,description_longdescription,person.displayname--createby,logtype",
      localPayload: {
        createby:
          this.app.client.userInfo.displayName ||
          this.app.client.userInfo.personid,
        createdate: new Date(),
        description: summary,
        logtype: longType,
        anywhererefid: workLog.anywhererefid,
        description_longdescription: longDescription,
      }
    };
    let response;
    try {
      this.app.userInteractionManager.drawerBusy(true);
      this.page.state.chatLogLoading = true;
      this.saveDataSuccessful = true;

      woWorklogDs.on("update-data-failed", this.onUpdateDataFailed);
      response = await woWorklogDs.update(workLog, option);

      // istanbul ignore if
      if (response) {
        woWorklogDs.off("update-data-failed", this.onUpdateDataFailed);
      }

      this.page.state.chatLogGroupData = await this.page.datasources[
        "woWorklogDs"
      ].forceReload();
    } catch {
    } finally {
      this.app.userInteractionManager.drawerBusy(false);
      this.page.state.chatLogLoading = false;
      //Reset default Logtype
      let schemaLogType = this.page.datasources["woWorklogDs"].getSchemaInfo(
        "logtype"
      );
      // istanbul ignore else
      if (schemaLogType) {
        this.page.state.defaultLogType = schemaLogType.default;
      }
    }
    //If no error happen then re-open the drawer
    // istanbul ignore else
    if (this.saveDataSuccessful) {
      this.page.showDialog("workLogDrawer");
    }
  }

  /*
   * Method to open the Change Status slider-drawer. This is called from
   * multiple pages.
   *
   * @param event should contain
   * item - The Work Order selected.
   * datasource - The Datasource for synonymdomain.
   * referencePage - The Page which calls this controller.
   *
   */
  async openChangeStatusDialog(event) {
    this.page.state.statusMemo = "";
    let statusArr = [];
    let workType = [];
    const workTypeDs = this.app.findDatasource("dsworktype");
    const {longitudex, latitudey} = event.item.serviceaddress || {};
    const lastLabTransData = event.item.labtrans ? event.item.labtrans[event.item.labtrans.length - 1] : null;
    const maxVal = event.item.status_maxvalue;
    // istanbul ignore else
    if(event.item.worktype) {
      workType = workTypeDs.items.filter(
        (item) => item.worktype === event.item.worktype
      );
    }  

    statusArr = await commonUtil.getOfflineAllowedStatusList(this.app, event, false);
    log.t(
      TAG,
      "openChangeStatusDialog : statusArr --> " + JSON.stringify(statusArr)
    );

    let statusLstDS = this.page.datasources["dsstatusDomainList"];
    statusLstDS.clearSelections();

    // istanbul ignore else
    if(event.item.flowcontrolled) {
      let filterValues= []
      
      let workTypeStartMaxVal = workType && workType.length && workType[0].startstatus ? workType[0].startstatus_maxvalue : '';
      let workTypeEndMaxVal = workType && workType.length && workType[0].completestatus ? workType[0].completestatus_maxvalue : '';
      if(!event.item.worktype || !workTypeStartMaxVal) {
        if(maxVal !== 'COMP') {
          filterValues = ['CLOSE', 'COMP']; 
        }
        
        // istanbul ignore else
        if(maxVal === 'INPRG') {
          filterValues = ['CLOSE', 'COMP', 'WMATL', 'WAPPR']; 
        }

      } else if(event.item.worktype && event.item.flowcontrolled && workType && workType.length) {
        // istanbul ignore else
        if(workTypeEndMaxVal === 'COMP') {
          filterValues = ['CLOSE'];
        } else if(workTypeEndMaxVal === 'CLOSE') {
          filterValues = ['CLOSE'];
        } else if(workTypeEndMaxVal === 'INPRG') {
          filterValues = ['CLOSE','COMP', 'INPRG'];
        }
        // istanbul ignore next
        if(workTypeStartMaxVal) {
          if(workTypeStartMaxVal === 'APPR' || workTypeStartMaxVal === 'WMATL' || workTypeStartMaxVal === 'WSCH') {
            if (maxVal !== 'COMP') {
              filterValues = [...filterValues, 'WAPPR', 'COMP'];
            } else {
              filterValues = ['WAPPR'];
            }
          }
          // istanbul ignore if
          if(workTypeStartMaxVal === 'INPRG' &&  maxVal === 'INPRG') {
            filterValues = [...filterValues, 'WMATL', 'WAPPR', 'COMP'];
          }
        }
      }

      // istanbul ignore else
      if(maxVal === 'COMP' && longitudex && latitudey) {
        filterValues = ['WAPPR', 'CLOSE'];
      }

      // istanbul ignore else
      if(filterValues && filterValues.length) {
        statusArr = statusArr.filter(item => filterValues.indexOf(item.maxvalue) === -1);
      }
    } else {
      // istanbul ignore else
      if(longitudex && latitudey && lastLabTransData?.timerstatus_maxvalue === 'ACTIVE') {
        statusArr = statusArr.filter(item => ['CLOSE'].indexOf(item.maxvalue) === -1);
      }
    }

    await statusLstDS.load({ src: statusArr, noCache: true });

    // set maximum length of comment text-area in changestatus through checking datasource schema
    const selectedDS = event.selectedDatasource;
    if (selectedDS) {
      const commentsMaxLength = event.selectedDatasource.getFieldSize(
        "wostatusmemo"
      );
      if (commentsMaxLength !== -1) {
        this.page.state.memoMaxLength = commentsMaxLength;
      }
    }
    let signatureAttachment = this.app.findDatasource("signatureAttachment");
    let woDetailDs = this.app.findDatasource("wodetails");
    this.page.state.disableDoneButton = true;
    this.page.state.enableSignatureButton = false;
    this.page.state.woItem = event.item;
    this.page.state.appVar = this.app;
    this.page.state.signatureDs = signatureAttachment;
    this.page.state.referenceDS = event.datasource;
    this.page.state.referencePage = event.referencePage;
    this.page.state.statusDialog = "woStatusChangeDialog";

    if (
      !woDetailDs.items.length ||
      (woDetailDs.items &&
        woDetailDs.items.length &&
        woDetailDs.items[0].wonum !== event.item.wonum)
    ) {
      await woDetailDs.load({ noCache: true, itemUrl: event.item.href });
    }

    this.page.showDialog("woStatusChangeDialog", { parent: this.page });
  }

  /*
   * validate workorder status with respect to sigoption.
   */
  validateWoStatus(statusobj){
    let validWoStatus = true;      
    Object.entries(JSON.parse(this.app.state.woStatSigOptions)).forEach(([key, value]) =>{
       //istanbul ignore next
      if(value === statusobj.maxvalue){       
        validWoStatus = this.app.checkSigOption(`MXAPIWODETAIL.${key}`)? true :false ;        

      }
    });
    return validWoStatus;
  }

  /*
   * Opens the meter detail for the corresponding workorder record.
   */
  async openMeterDrawer(event) {
    //let wods = this.page.datasources.wodetails;
    let wods = this.app.findDatasource("woDetailds");
    this.page.state.itemUrl = event.item.href;
    let response = await wods.load({
      noCache: true,
      itemUrl: event.item.href,
    });
    // istanbul ignore next
    if (response) {
      this.page.state.assetMeterHeader = WOUtil.getAssetName(event.item);
      this.page.state.locationMeterHeader = WOUtil.getLocationName(event.item);
      if (response && response[0].asset && response[0].asset.length > 0) {
        this.page.state.currentAssetHref = response[0].asset[0].href;
      }

      this.page.showDialog("meterReadingDrawer");
    }
  }

  /*
   * Load Work order list data on the basis of selection from dropdown.
   */
  async loadWOListData(evt) {
    //istanbul ignore else
    if (evt.selectedItem.id !== "Unspecified") {
      let seldatasource = this.page.datasources[evt.selectedItem.id];
      //istanbul ignore else
      if (seldatasource) {
        seldatasource.clearState();
        seldatasource.resetState();
        this.page.state.woItems = undefined;
        this.page.state.woItems = await seldatasource.load({ noCache: true, itemUrl: "" });
      }
    }
  }

  /**
   * This method is called by clicking on start work or stop work button on work order list page
   * and start/stop timer for specific work order accordingly.
   * @param {event} event
   */
  async startStopTimer(event) {
    const wolistds = this.page.datasources[this.page.state.selectedDS];
    const woLaborDetailDS = this.page.datasources["woLaborDetaildsOnSchedule"];

    await this.page.datasources.wodetails.load({
      noCache: true,
      itemUrl: event.item.href,
    });

    this.page.state.currentItem = event.item.wonum;

    await WOTimerUtil.clickStartStopTimer(
      this.app,
      this.page,
      event,
      event.worktype,
      wolistds,
      woLaborDetailDS,
      "woConfirmLabTimeOnSchedule"
    );
  }

  /**
   * This method is called by clicking edit labor button on confirm dialog.
   */
  async onClickEditLabor() {
    let wodetails = this.page.datasources["wodetails"];
    const woLaborDetailDS = this.page.datasources["woLaborDetaildsOnSchedule"];
    woLaborDetailDS.item.wonum = wodetails.item.wonum;
    await WOTimerUtil.clickEditLabor(
      this.app,
      wodetails.item.href,
      woLaborDetailDS.item
    );
  }

  /**
   * This method is called by clicking send button on confirm dialog.
   * @param {event} event
   */
  async onClickSendLabTrans(event) {
    const wodetails = this.page.datasources["wodetails"];
    const wolistds = this.page.datasources[this.page.state.selectedDS];
    const woLaborDetailDS = this.page.datasources["woLaborDetaildsOnSchedule"];
    await WOTimerUtil.clickSendLabTrans(
      this.app,
      this.page,
      event.action,
      wodetails,
      woLaborDetailDS
    );
    
    //set the updated wo list
    let response = await wolistds.forceReload();
    this.page.state.woItems = response; 
  }

  /*
   * save meter dialog.
   */
  async saveUpdateMeterDialog() {
    let item = this.app.findDatasource("woDetailds").item;
    //istanbul ignore else
    if (!this.isRollover) {
      let assetNumData =
        item.asset && item.asset.length > 0
          ? item.asset[0].assetnum
          : undefined;
      let locationData = item.locationnum
        ? item.locationnum
        : undefined;
      
      //Call save on button click
      let assetMeterDs = this.app.findDatasource("woassetmeters");
      let locationMeterDs = this.app.findDatasource("wolocationmeters");
      
      //istanbul ignore if
      if (this.page.state.oldReading) {
        this.validateMeterDate();
        this.validateMeterTime();
      }
      
      if (!this.page.state.invalidDateTime && !this.page.state.hasAnyReadingError) {
        await WOUtil.saveMeterReadings(
          {},
          this.app,
          assetMeterDs,
          locationMeterDs,
          this.page
        );
        this.validatemeter = false;
        await WOUtil.closeUpdateMeterDialog(
          this,
          this.page,
          assetNumData,
          locationData,
          item.siteid,
          "update_meterReading_drawer",
          this.app
        );
      }
    } else if(this.isRollover) {
      this.page.showDialog("rollOverDialog");
      return;
    }
  }
  
  /*
   * Save meter from save and discard dialog.
   */
   //istanbul ignore next
  async onCustomSaveTransition() {
    if (!this.isRollover) {      
      //istanbul ignore if
      if (this.page.state.oldReading) {
        this.validateMeterDate();
        this.validateMeterTime();
      }
      
      //Re open the meter dialog if has any error
      if (this.page.state.invalidDateTime || this.page.state.hasAnyReadingError) {
        window.setTimeout(() => {
          this.page.showDialog("update_meterReading_drawer");
        }, 100);
        
        return;
      }
      
      let assetMeterDs = this.app.findDatasource("woassetmeters");
      let locationMeterDs = this.app.findDatasource("wolocationmeters");
      
      let assetNumData = assetMeterDs.item.assetnum || undefined;
      let locationData = locationMeterDs.item.locationnum || undefined;
      
      this.page.state.showSaveDialog = true;
      
      if (!this.page.state.invalidDateTime && !this.page.state.hasAnyReadingError) {
        await WOUtil.saveMeterReadings(
          {},
          this.app,
          assetMeterDs,
          locationMeterDs,
          this.page
        );
        
        await WOUtil.closeUpdateMeterDialog(
          this,
          this.page,
          assetNumData,
          locationData,
          assetMeterDs.item.siteid,
          "update_meterReading_drawer",
          this.app
        );
      }
    } else if(this.isRollover) {
        window.setTimeout(() => {
          this.page.showDialog("update_meterReading_drawer");
        }, 100);
        
        this.page.showDialog("rollOverDialog");
        return;
    }
  }
  
  /*
   * close meter dialog.
   */
  async closeUpdateMeterDialog(event) {
    this.page.state.useConfirmDialog = true;
  }
  
  /**
   * Save rollover readings based on user confirmation.
   * @param {*} userConfirmation
   */
  async saveRollOverReadings(userConfirmation) {
    this.isRollover = false;
    //istanbul ignore else
    if (this.page.state.rollOverData && this.page.state.rollOverData.length > 0) {
      let self = this;
      self.page.state.rollOverData.forEach((element,index) => {
        if ((element.item.assetmeterid === self.page.state.meterid) || (element.item.locationmeterid === self.page.state.meterid)) {
          if (userConfirmation) {
            self.page.state.rollOverData[index].dorollover = true;
          } else {
            self.page.state.rollOverData[index].dorollover = false;
            return;
          }
        }
      });      
      this.page.state.meterid = undefined;
    }
  }

  /*
   * save new meter readings.
   */
  async saveMeterReadings(changeObj) {
    let assetMeterDs = this.app.findDatasource("woassetmeters");
    let locationMeterDs = this.app.findDatasource("wolocationmeters");
    await WOUtil.saveMeterReadings(
      changeObj,
      this.app,
      assetMeterDs,
      locationMeterDs,
      this.page
    );
  }

  /*
   * Opens Enter meter drawer for the corresponding workorder record.
   */
  async openEnterReadingDrawer(event) {
    //reset newreading to undefined when transitioning into enter metering drawer
    let assetMeterDs = this.app.findDatasource("woassetmeters");
    await this.clearValues(assetMeterDs);

    let response = await this.app.findDatasource("woDetailds");
    let locationMeterDs = this.app.findDatasource("wolocationmeters");
    await WOUtil.openEnterReadingDrawer(
      this.page,
      response.item,
      response,
      assetMeterDs,
      locationMeterDs,
      "update_meterReading_drawer",
      event.readingType,
      this.app);
  }


  async clearValues(datasource) {
    datasource?.items?.forEach((value) => {
      if (value.newreading) {
        value.newreading = "";
        value.newreadingFlag = false;
      }
      datasource.clearWarnings(value, "newreading");
    });
  }

  /*
   * Open meter lookup with new readings on the basis of meter domainid.
   */
  async openMeterLookup(event) {
    let dnewreadingDS = this.app.findDatasource("dsnewreading");
    await WOUtil.openMeterLookup(
      this.page,
      event.item,
      dnewreadingDS,
      event.datasource,
      "meterReadingLookup"
    );
  }

  /*
   * clear new characterstic meter readings.
   */
  async clearCharacterMeterReaing(event){
     //istanbul ignore else
    if(event && event.item) {
      event.item["newreading"] = event.newreading;
    }
    WOUtil.enableDisableSaveBtn(this.page);
  }

  /*
   * save new characterstic meter readings.
   */
  async saveCharactersticMeterReading(event) {
    //istanbul ignore else
    if (event) {
      if(this.page.state.updateCharecteristicMeterReadingItem) {
        this.page.state.updateCharecteristicMeterReadingItem["newreading"] = event.value;
      }
      
      WOUtil.enableDisableSaveBtn(this.page);
    }
  }

  /*
   * Method to resume the page
   */
  async pageResumed(page) {
    let reportWork = this.app.findPage('report_work');
    reportWork.state.fieldChangedManually = false;
    page.state.meterAccess = this.app.checkSigOption('MXAPIWODETAIL.ENTERREADINGS');
    page.state.statusAccess = this.app.checkSigOption('MXAPIWODETAIL.STATUS');
    page.state.createWo = this.app.checkSigOption('MXAPIWODETAIL.CREATENEWWO');
    this.trackUserLogin(page);

    //On firstLogin the wolist should get synced with server
    if (page.state.firstLogin && this.app.state.networkConnected && this.app.state.refreshOnSubsequentLogin !== false) {
      this.page.state.woItems = await this.page.datasources[page.state.selectedDS]?.forceSync();
    } else {
      this.page.state.woItems = await this.page.datasources[page.state.selectedDS]?.forceReload();
    }

    let incomingContext = this.app.state.incomingContext;
    // istanbul ignore else
    if (
      incomingContext &&
      incomingContext.breadcrumb &&
      incomingContext.breadcrumb.enableReturnBreadcrumb
    ) {
      // istanbul ignore next
      this.page.state.breadcrumbWidth =
        this.app.state.screen.size === "sm" ? 68 : 50;
    }
    // istanbul ignore else
    if (this.app.geolocation) {
      this.app.geolocation.updateGeolocation();
      //set geolaction enabled state to false
      let geolocationState = this.app.geolocation.state;
      //istanbul ignore next
      if (
        geolocationState &&
        ((geolocationState.latitude === 0 &&
          geolocationState.longitude === 0) ||
          geolocationState.hasError)
      ) {
        geolocationState.enabled = false;
      } else {
        geolocationState.enabled = true;
      }
    }
    
    //Get system properties again.
    this.getTravelSystemProperties();
  }

  async pagePaused() {
    this.page.findDialog('workLogDrawer')?.closeDialog();
    this.page.findDialog('slidingwomaterials')?.closeDialog();
    this.page.findDialog('woStatusChangeDialog')?.closeDialog(); 
    this.page.findDialog('meterReadingDrawer')?.closeDialog();
    this.page.findDialog('slidingwohazard')?.closeDialog(); 
  }

  /*
   * Method to store and load the user login detail
   */
  trackUserLogin(page) {
    let browser = Browser.get();
    let firstLoginData = browser.loadJSON('FirstLoginData', false);
    let firstLogoutDate = this.app.client && this.app.client.userInfo.user.logouttracking.attemptdate;
    let newDate = this.app.dataFormatter.convertISOtoDate(new Date());
    if (!firstLoginData || !firstLoginData.date) {
      firstLoginData = { date: newDate, isFirstLogIn: true };
    } else {
      if (this.app.dataFormatter.convertISOtoDate(firstLoginData.date) > this.app.dataFormatter.convertISOtoDate(firstLogoutDate)) {
        firstLoginData.isFirstLogIn = false;
      } else {
        firstLoginData.date = newDate;
        firstLoginData.isFirstLogIn = true;
      }
    }
    browser.storeJSON("FirstLoginData", firstLoginData, false);
    page.state.firstLogin = firstLoginData.isFirstLogIn;
  }

  /**
   * Redirects to Wo Card on Map view
   * @param {Object} item - clicked item from list
   */
   async openWOCard(event) {
    // istanbul ignore else
    if (event.item) {
      let datasource = this.page.datasources[this.page.state.selectedDS];
      await datasource.load({ itemUrl: event.item.href });
      this.page.state.showMapOverlay = 1;
      this.page.state.previousPage = event.prevPage;
      // istanbul ignore next
      if (!this.app.map) {
        setTimeout(() => {
          this.openMap(event);
        }, 2000);
      } else {
        this.openMap(event);
      }
    }
  }

  openMap(event) {
    // istanbul ignore else
    if (this.app.map) {
      this.handleItemClick(event.item);
    }
  }

  /**
   * Redirects to Wo List on Map view
   * @param {Object} item - clicked item from list
   */
  async openPrevPage(event) {
    // istanbul ignore else
    // istanbul ignore next
    // ignoring as for map openlayers cannot be emulated
    if (this.page.state.previousPage === "mapwolist") {
      this.page.state.showMapOverlay = 0;
      this.app.map.clearFeatureStyle();
      await this.resetDatasource();
    } else if (this.page.state.previousPage === "schedulecardlist") {
      this.page.state.selectedSwitch = 0;
      await this.resetDatasource();
      this.page.state.showMapOverlay = 0;
      this.page.state.mapOriginPage = "";
    } else if (this.page.state.previousPage === "wodetail") {
      let wodtlPage = this.app.findPage("workOrderDetails");
      if (wodtlPage) {
        this.app.setCurrentPage(wodtlPage);
        if (this.page.state.mapOriginPage === "wodetail") {
          this.page.state.previousPage = "schedulecardlist";
        }
      }
    }
  }

  /**
   * resets datasource
   */
  async resetDatasource() {
    let datasource = this.page.datasources[this.page.state.selectedDS];
    await datasource.reset(datasource.baseQuery);
  }

  /**
   * Function to load card view of a selected work order on map-overlay
   */
  openMapPage(event) {
    this.page.state.selectedSwitch = 1;
    this.openWOCard(event);
  }

  /**
   * Redirects to Wo Crd List from Map view
   */
  async showCardList(event) {
    this.page.state.showMapOverlay = 0;
    const datasource = this.page.datasources[this.page.state.selectedDS];
    await datasource.reset(datasource.baseQuery);
  }

  async updateMeterDatasources(inputData) {  
     if (!Device.get().isMaximoMobile) {
      let wodetailsDS = this.app.findDatasource("woDetailds");
      await wodetailsDS.forceReload();
    }
    
    //istanbul ignore else
    if (inputData.assetNum) {
      let assetMeterDS = this.app.findDatasource("woassetmeters");
      await assetMeterDS.load();
    }
    //istanbul ignore else
    if (inputData.location) {
      let locationMeterDS = this.app.findDatasource("wolocationmeters");
      await locationMeterDS.load();
    }
  }

  /**
   * Sets default state
   */
  setDefaults() {
    this.page.state.selectedSwitch = 0;
  }

  /**
   * Filters datalist on the basis of pin/cluster being clicked
   * @param {*} item item record (wo record) for the pin/cluster being clicked
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async handleMapClick(item) {
    let maximoAttributes;
    const datasource = this.page.datasources[this.page.state.selectedDS];
    if (
      item.hasFeature &&
      item.featuresAndLayers &&
      item.featuresAndLayers.length > 0
    ) {
        const layer = item.featuresAndLayers[0].layer;
      if (
        item.featuresAndLayers[0].feature.values_.features &&
        item.featuresAndLayers[0].feature.values_.features.length > 1
      ) {
        let featureCluster = item.featuresAndLayers[0].feature;
        let styleCluster = this.app.map.getNewStyle(highlightSymbolCluster);
        
        this.app.map.changeFeatureStyle(
          featureCluster, 
          styleCluster, {
            layer: item.featuresAndLayers[0].layer,
            autoHideOriginalStyle: false
          }
        );

        let wonums = [];
        let features = featureCluster.values_.features;
        maximoAttributes = features[0].get("maximoAttributes");
        let layerds = item.featuresAndLayers[0].layer.get('datasource');
        if (layerds) {
          for (let i = 0; i < features.length; i++) {
            wonums.push(features[i].get("maximoAttributes").wonum);
          }
          await datasource.initializeQbe();
          datasource.setQBE("wonum", "in", wonums);
          datasource.setQBE("siteid", "=", maximoAttributes.siteid);
          await datasource.searchQBE(undefined, true);
        } else {
          datasource.clearQBE();
          await datasource.searchQBE(undefined, true);
        }
      } else {
        const isMarkerLayer = layer.get('isMarkerLayer');
        const feature = item.featuresAndLayers[0].feature;
        const wasFeatureHighlighted = this.app.map.isFeatureHighlighed(feature);
        const style = this.app.map.getNewStyle(highlightSymbol);

        this.app.map.changeFeatureStyle(
          feature, 
          style, 
          {
            autoRestoreOnZoom: false,
            layer: item.featuresAndLayers[0].layer,
            autoHideOriginalStyle: false
          }
        );
        if (
          (feature.values_ &&
          feature.values_.features &&
          feature.values_.features.length > 0) || isMarkerLayer
        ) {
          const singleFeature = isMarkerLayer
          ? feature
          : feature.get('features')[0];
          if (wasFeatureHighlighted) {
            datasource.clearQBE();
            await datasource.searchQBE(undefined, true);
          } else {        
            maximoAttributes = singleFeature.get(
              "maximoAttributes"
            );
            datasource.setQBE('wonum', '=', maximoAttributes.wonum);
            datasource.searchQBE();  
          }          
        }
      }
    } else {
      this.page.state.showMapOverlay = 0;
      this.app.map.clearFeatureStyle();
      datasource.clearQBE();
      await datasource.searchQBE(undefined, true);
      await this.resetDatasource();
    }
  }

  /**
   * Highlights the pin on map for the record which was clicked in datalist
   * @param {*} item record for the item which was clicked in datalist
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleItemClick(item) {
    if(!item.autolocate) {
      return;
    }
    let itemGeometry = this.app.map.parseGeometry(item.autolocate);
    let center = this.app.map.getGeometryCenter(itemGeometry);
    let centerCoordinates = center.getCoordinates();
    let itemSpatialReference = this.app.map.getLayerSpatialReference(
      "WORKORDER"
    );
    let basemapSpatialReference = this.app.map.getBasemapSpatialReference();
    if (itemSpatialReference !== basemapSpatialReference) {
      centerCoordinates = this.app.map.convertCoordinates(
        centerCoordinates,
        itemSpatialReference,
        basemapSpatialReference
      );
    }
    let feature = this.app.map.getFeatureByGeo({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: centerCoordinates
      }
    }, "geojson");
    let style = this.app.map.getNewStyle(highlightSymbol);
    if (feature.featuresAndLayers.length > 0) {
      this.app.map.changeFeatureStyle(
        feature.featuresAndLayers[0].feature,
        style,
        { autoRestoreOnZoom: false }
      );
      this.app.map.centerTo(
        centerCoordinates[0],
        centerCoordinates[1],
        false
      );
    }
  }

  /**
   * loads offline map data
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  onAfterLoadData(dataSource, items) {
    log.i(TAG, "Loading offline tiles!");

    let validMap = this.app.state.isMapValid;
    if (
      validMap &&
      items &&
      Device.get().isMaximoMobile &&
      this.page.state.selectedSwitch === 1
    ) {
      this.mapPreloadAPI.loadOfflineData(
        items,
        3,
        16,
        "autolocate",
        "4326",
        this.app,
        false
      );
    }
    if (dataSource.name === 'wodetails' && items.length) {
      this.setupWoCostData(dataSource, {'app': this.app, 'page': this.page});
    }
  }

  /**
   * resets mapoverlay for map content
   */
  showMapList() {
    this.page.state.showMapOverlay = 0;
  }

  /**
   * invoke readings validation if user focus on the field.
   *
   * @param {object} event
   * @returns
   */

  onFocusReadings(event) {    
    //istanbul ignore else
    if (event.newreading) {
        let valType = typeof event.newreading;
        //istanbul ignore else
        if (valType === "number") {
          this.page.state.disableSave = false;
          //setting flag to true before save
          this.validatemeter = true;
          //setting default rollover flag to false
          this.isRollover = false;
          this.validateMeterReadings({
            change: { object: event },
            newValue: event.newreading,
            datasource: { name: event.assetmeterid ? "woassetmeters" : "wolocationmeters" },
            item: {
              href: event.href,
              assetnum: event.assetnum,
              location: event.location,
              assetmeterid: event.assetmeterid,
              locationmeterid: event.locationmeterid
            },
            dorollover: event.dorollover,
          });
          
          this.page.state.readingChangeInvoked = true;
        }
    }
  }
  
  /*
   * validate newreading value.
   */
  async onValueChanged(changeObj) {
    // istanbul ignore else
    if (changeObj.field === "newreading") {
      let valType = typeof changeObj.newValue;
      
      //istanbul ignore else
      if (valType === "number" && changeObj.newValue) {
        //setting flag to true before save
        this.validatemeter = true;
        //setting default rollover flag to false
        this.isRollover = false;
      }
      
      //istanbul ignore next
      if (valType === "string" && !changeObj.newValue) {
        await WOUtil.popMeterReadingErrors(changeObj, this.page);
      }
      
      let assetMeterds = this.app.findDatasource("woassetmeters");
      let hasAssetAnyNewReading = false;let hasLocationAnyNewReading = false;
      let locationMeterDs = this.app.findDatasource("wolocationmeters");
      
      // istanbul ignore else
      if (assetMeterds && assetMeterds.items) {
        hasAssetAnyNewReading = assetMeterds.items.some((item) => (item.newreading));
      }
      
      // istanbul ignore else
      if (locationMeterDs && locationMeterDs.items) {
        hasLocationAnyNewReading = locationMeterDs.items.some((item) => (item.newreading));
      }
      
      if (hasAssetAnyNewReading || hasLocationAnyNewReading) {
        await WOUtil.enableDisableSaveBtn(this.page);
        this.page.state.useConfirmDialog = true;
      } else {
        this.page.state.useConfirmDialog = false;
      }
      
      if ((hasAssetAnyNewReading || hasLocationAnyNewReading) && !this.page.state.hasAnyReadingError) {
        this.page.state.readingChangeInvoked = false;
      } else {
        this.page.state.disableSave = true;
      }
    }
        
    if (this.page.state.newReading) {
      let date = new Date();
      changeObj.item.computedMeterCurDate = undefined;
      changeObj.item.computedMeterCurTime = undefined;
      
      changeObj.item.computedMeterCurDate = date;
      changeObj.item.computedMeterCurTime = date;
    }
  }

  /**
   * Validate reading data before submission.
   * @param {*} changeObj
   */
  validateMeterReadings(changeObj) {
    WOUtil.validateMeterReadings(changeObj, this);
  }

  /**
   * Set the Log Type from the Lookup
   */
  async setLogType(event) {
    this.page.state.defaultLogType = event.value;
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
  onUpdateDataFailed() {
    this.saveDataSuccessful = false;
  }

  validateMeterDate() {
    WOUtil.validateMeterDate(this.app, this.page, "woassetmeters");
  }

  validateMeterTime() {
    WOUtil.validateMeterTime(this.app, this.page, "woassetmeters");
  }
  
  /**
   * Handle Delete transaction
   */
   async handleDeleteTransaction(event) {
    // istanbul ignore else
    if (event && event.app === this.app.name &&
      (this.app.currentPage.name === this.page.name || this.app.lastPage.name === this.page.name)
    ) {
      this.page.state.woItems = await this.app.findDatasource(this.page.state.selectedDS).forceReload();
    }
  }

  /**
   * open safetyplan drawer
   */
  async openHazardDrawer(event) { 
    WOUtil.openWOHazardDrawer(this.app, this.page, event, "slidingwohazard");
  }
  
  /**
   * Review the safetyplan
   */
   async reviewSafetyPlan() {
    WOUtil.reviewSafetyPlan(this.app);
  }

  /**
   * Callback method from map when we do longpress
   * @param {data} map data 
   */
  handleMapLongPress(data) {
    let createAccess = this.app.checkSigOption('MXAPIWODETAIL.CREATEWO');
    // istanbul ignore if
    if(!createAccess) {
      return
    }
    
    // istanbul ignore else
    if (typeof data === 'object' && data.coordinate) {
      this.app.state.currentMapData = data;
    }
  }

  /**
   * Set create workorder page
   */
  goToCreateWoPage() {
    // istanbul ignore else
    if (this.app.state.currentMapData) {
      this.app.setCurrentPage({
        name: 'createwo',
        resetScroll: false,
      });
    }
  }


  /**
   * Changes status of selected work order. This method is being used in approvals app
   * @param {Object} item 
   */
   async changeWorkorderStatus(inputData) {

    this.page.state.loading = true;
    this.page.state.currentItem = inputData.item.wonum;

    let dataFormatter = this.app.dataFormatter;
    let currDate = dataFormatter.convertDatetoISO(new Date());
    let approvalWOListDS = this.page.datasources['todaywoassignedDS'];
    let approvedStatus = await SynonymUtil.getSynonym(this.app.findDatasource('synonymdomainData'), 'WOSTATUS', inputData.status);
    let action = 'changeStatus';
    let item = inputData.item;

    let option = {
      record: item,
      parameters: {
        status: approvedStatus.value,
        date: currDate,
      },
      headers: {
        'x-method-override': 'PATCH'
      },
      responseProperties: 'status',
      localPayload: {
        href: item.href,
        status: approvedStatus.value,
        status_maxvalue: approvedStatus.maxvalue,
        status_description: approvedStatus.description,
        workorderid: item.workorderid
      },
      query: {interactive: false},
      waitForUpload: true,
      esigCheck: 0
    };
    if (this.checkEsigRequired(approvedStatus.value)) {
      option.esigCheck = 1;
    }
    await approvalWOListDS.invokeAction(action, option);
    await approvalWOListDS.forceReload();
    this.page.state.loading = false;
  }

  /**
   * In system properties we would get list of flag on which we have to ask for eSigCheck
   * if current status matches in list we would pass esigCheck 1 and on based of it graphite component
   * will handle to show prompt of esig
   * @returns 1 or 0 (boolean numeric value)
   */
  checkEsigRequired(status) {
    const esigCheck = this.app.state.systemProp && this.app.state.systemProp["maximo.mobile.wostatusforesig"];
    const allowedSignature = esigCheck
      .split(',')
      .map((status) => status.trim());
      const addEsig = allowedSignature.length > 0 &&
      allowedSignature.indexOf(status) > -1;
    return (addEsig) ? 1 : 0;
  }

  /**
   * Opens the cost detail for the corresponding workorder record.
   * @param {Object} event workorder item
   */
  async openWoTotalCostDrawer(event) {
    let newTool = WOUtil.computedEstTotalCost(event.item);
    let jwoTotal = this.app.findDatasource('jsondsWoTotal');
    this.page.state.costDrawerOpen = true;
    jwoTotal.clearState();
    jwoTotal.resetState();
    await jwoTotal.load({ src: newTool });
    this.page.state.woCostDrawerTitle = this.app.getLocalizedLabel(
      "woCostDrawerTitle_lable",
      "Cost"
    );
    this.page.showDialog("woCostDrawer");
    this.page.state.costDrawerOpen = false;
  }
}

export default SchedulePageController;
