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

/* Generated File - Do not edit */
/* turn off unused variables that we know we are creating because it is generated code */
/* eslint no-unused-vars: off */
/* turn off lone blocks that we know we are creating because it is generated code due to content switchers */
/* eslint no-lone-blocks: off */
/* turn off === vs == because these are user created == from the MAML file */
/* eslint eqeqeq: off */
/* Turn off React Camel Case warnings, since generated files might not always have proper camel case */
/* eslint react/jsx-pascal-case: off */
/* Turn off React 17 lints in generated code */
/* eslint react/prop-types: off */
/* eslint complexity: off */
/* eslint no-shadow: off */
/* eslint no-duplicate-imports: off */
/* eslint function-paren-newline: off */
/* eslint jsx-quotes: off */
/* eslint dot-notation: off */
/* eslint no-nested-ternary: off */
/* eslint no-implicit-coercion: off */
/* eslint func-style: off */
/* eslint implicit-arrow-linebreak: off */
/* eslint react/jsx-key: off */
/* eslint react/no-children-prop: off */
/* eslint new-cap: off */
/* eslint radix: off */
/* eslint no-empty-function: off */
/* eslint array-bracket-newline: off */
/* eslint no-class-assign: off */
/* eslint init-declarations: off */
/* eslint no-console: off */
/* eslint import/first: off */
/* eslint no-func-assign: off */

import 'regenerator-runtime/runtime';
import {Datasource} from '@maximo/maximo-js-api';
import {JSONDataAdapter} from '@maximo/maximo-js-api';
import {Dialog} from '@maximo/maximo-js-api';
import {Application} from '@maximo/maximo-js-api';
import {PlatformFactory} from '@maximo/maximo-js-api';
import {LookupManager} from '@maximo/maximo-js-api';
import {BootstrapInspector} from '@maximo/maximo-js-api';
import {Page} from '@maximo/maximo-js-api';
import AppController from '../AppController';
import WorkOrderDataController from '../WorkOrderDataController';
import ScheduleDataController from '../ScheduleDataController';
import SchedulePageController from '../SchedulePageController';
import ChangeStatusController from '../ChangeStatusController';
import TaskController from '../TaskController';
import MaterialsPageController from '../MaterialsPageController';
import WorkOrderDetailsController from '../WorkOrderDetailsController';
import MaterialRequestPageController from '../MaterialRequestPageController';
import ReportWorkDataController from '../ReportWorkDataController';
import ReportWorkPageController from '../ReportWorkPageController';
import dataassetds from '.././mocked/asset-detail.js';
import pump from '../assets/pump.png';
import FailureDetailsPageController from '../FailureDetailsPageController';
import AttachmentController from '../AttachmentController';
import RelatedWoController from '../RelatedWoController';
import MapPageController from '../MapPageController';
import AssetWoController from '../AssetWoController';
import WorkOrderEditController from '../WorkOrderEditController';
import WorkOrderCreateController from '../WorkOrderCreateController';
import AssetLocationLookupController from '../AssetLocationLookupController';
import defaultLabels from '../i18n/labels.json';
const PagesPages = () => '';
const PageSchedule = () => '';
const StackedPanelQzfnmComponent = () => '';
const SlidingDrawerSlidingwomaterials = () => '';
const SlidingDrawerWorkLogDrawer = () => '';
const SlidingDrawerWoStatusChangeDialog = () => '';
const SlidingDrawerMeterReadingDrawer = () => '';
const SlidingDrawerUpdate_meterReading_drawer = () => '';
const LookupMeterReadingLookup = () => '';
const DialogRollOverDialog = () => '';
const DialogWoConfirmLabTimeOnSchedule = () => '';
const PageNavigator = () => '';
const PageTasks = () => '';
const DialogPlanTaskLongDesc = () => '';
const DataListQ439v = () => '';
const PageMaterials = () => '';
const PanelN76qgComponent = () => '';
const PanelWz55yComponent = () => '';
const PageWorkOrderDetails = () => '';
const DialogWoDetailsDialog = () => '';
const DialogWoConfirmLabTime = () => '';
const SlidingDrawerWoWorkLogDrawer = () => '';
const SlidingDrawerSlidingwodetailsmaterials = () => '';
const DialogAssetMisMatchDialog = () => '';
const LookupDownTimeCodeLookup = () => '';
const SlidingDrawerAssetStatusDialog = () => '';
const SlidingDrawerMultiMeterReadingDrawer = () => '';
const SlidingDrawerUpdate_multiMeterReading_drawer = () => '';
const LookupMultiMeterReadingLookup = () => '';
const DialogMultiMeterrollOverDialog = () => '';
const ButtonGroupYyb2kComponent = () => '';
const ButtonGroupByzkjComponent = () => '';
const DataListG84j2 = () => '';
const PageMaterialRequest = () => '';
const LookupItemsListLookup = () => '';
const LookupStoreRoomListLookup = () => '';
const SlidingDrawerAddItemDrawer = () => '';
const PanelYrpj2Component = () => '';
const ButtonGroupW3m6rComponent = () => '';
const PageReport_work = () => '';
const PanelR34mkComponent = () => '';
const LookupTransTypeLookup = () => '';
const LookupCraftLookup = () => '';
const LookupLaborLookup = () => '';
const SlidingDrawerReportTimeDrawer = () => '';
const LookupMaterialLookup = () => '';
const LookupStoreRoomLookup = () => '';
const LookupBinLookup = () => '';
const LookupTransactionTypeLookup = () => '';
const LookupRotatingAssetLookup = () => '';
const SlidingDrawerMaterialsDrawer = () => '';
const LookupToolLookup = () => '';
const LookupToolStoreRoomLookup = () => '';
const LookupToolBinLookup = () => '';
const LookupToolRotatingAssetLookup = () => '';
const LookupToolTaskLookup = () => '';
const SlidingDrawerToolsDrawer = () => '';
const PanelG_b4vComponent = () => '';
const PanelEgzq9Component = () => '';
const PanelG4kn4Component = () => '';
const PageAssetDetails = () => '';
const ButtonGroupEnewvComponent = () => '';
const ButtonGroupD55jmComponent = () => '';
const PageFailureDetails = () => '';
const PanelB27__Component = () => '';
const PanelMq6byComponent = () => '';
const DataListQxk5x = () => '';
const DataListXwv_6 = () => '';
const DataListEjq22 = () => '';
const DataListMwj6x = () => '';
const PageAttachments = () => '';
const PanelVn25kComponent = () => '';
const PageRelatedWorkOrder = () => '';
const PanelAgve2Component = () => '';
const PageMap = () => '';
const PageAssetWorkOrder = () => '';
const PanelPw46_Component = () => '';
const PanelM_5y5Component = () => '';
const PageWoedit = () => '';
const DialogWoDetailsEditDialog = () => '';
const LookupWorkTypeLookup = () => '';
const DialogSaveDiscardDialog = () => '';
const LookupWithFilterOpenCreadWOLocationLookup = () => '';
const PanelA_5a4Component = () => '';
const PageCreatewo = () => '';
const DialogLongdsEditDialog = () => '';
const LookupWorkTyLookup = () => '';
const DialogSaveDiscardDialogCreatePage = () => '';
const LookupWithFilterOpenLocationLookup = () => '';
const PanelVba9yComponent = () => '';
const PageAssetLookup = () => '';
const PanelMw2wvComponent = () => '';
const customLookups = {};
const databuildInfo = {};

// istanbul ignore file

// istanbul ignore next - test framework
const appInitialize = async (setAppInst, bootstrapInspector) => {
  if (!bootstrapInspector) {
    bootstrapInspector = new BootstrapInspector();
  }

  // Create the Application
  let appOptions = {
    platform: 'maximoMobile',
    logLevel: 0,
    name: 'techmobile',
    type: '',
    theme: 'touch',
    isMaximoApp: true,
    masEnabled: false,
    labels: defaultLabels,
    messageGroups: 'viewmanager',
    systemProps: [
      'mxe.mobile.travel.prompt',
      'mxe.mobile.travel.radius',
      'mxe.mobile.travel.navigation',
      'maximo.mobile.usetimer',
      'maximo.mobile.statusforphysicalsignature',
      'maximo.mobile.completestatus'
    ],
    hasCustomizations: false
  };

  bootstrapInspector.onNewAppOptions(appOptions);

  let platform = PlatformFactory.newPlatform(appOptions, window.location.href);
  bootstrapInspector.onNewPlatform(platform);
  await platform.configure(appOptions);

  //load default lookups and merge in custom lookups
  bootstrapInspector.onNewLookupOptions(customLookups);
  LookupManager.get().addLookup(customLookups);

  let app = await platform.newApplication(appOptions);
  bootstrapInspector.onNewApp(app);
  let eventManager = app;
  app.setState(bootstrapInspector.onNewState({}, 'app'));
  setAppInst(app);

  app.registerController(
    bootstrapInspector.onNewController(
      new AppController(),
      'AppController',
      app
    )
  );
  let page;

  // setup the 'schedule' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'schedule',
        clearStack: true,
        parent: app,
        route: '/schedule',
        title: app.getLocalizedLabel('schedule_title', 'My Schedule')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          selectedSwitch: 0,
          dialogLabel: '',
          selectedDS: 'todaywoassignedDS',
          assetMeterHeader: '',
          locationMeterHeader: '',
          firstWO: '',
          firstLogin: false,
          showMapOverlay: 0,
          mapWOListHeight: false,
          mapWOCardHeight: false,
          mapPaddingRight: '',
          mapPaddingLeft: '',
          previousPage: '',
          mapOriginPage: '',
          mapPaddingBottom: '',
          compDomainStatus: ''
        },
        'page'
      ),
      {}
    );

    {
      let controller = new SchedulePageController();
      bootstrapInspector.onNewController(
        controller,
        'SchedulePageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - dswolist
    {
      let options = {
        platform: `maximoMobile`,
        name: `dswolist`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapiwodetail`,
          orderBy: `wopriority`,
          savedQuery: `uxtechnicianownerfilter`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `wonum`,
            `description`,
            `location.description`,
            `location.location`,
            `wopriority`,
            `worktype`,
            `status`,
            `asset.description`,
            `asset.assetnum`,
            `serviceaddress.formattedaddress`,
            `siteid`
          ],
          indexAttributes: [
            `wonum`,
            `description`,
            `location.description--locationdesc`,
            `location.location--locationnum`,
            `wopriority`,
            `worktype`,
            `status`,
            `status_maxvalue`,
            `asset.description--assetdesc`,
            `asset.assetnum--assetnumber`,
            `serviceaddress.formattedaddress--formattedaddress`,
            `siteid`
          ],
          select: `autolocate,wonum,description,location.description--locationdesc,location.location--locationnum,wopriority,worktype,schedfinish,status,status_description,status_maxvalue,allowedstates,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,showplanmaterial._dbcount--materialcount,showplantool._dbcount--toolcount,computedWorkType,computedAssetNum,computedIsOverDue,computedDisableButton,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedTimerStatus,hideWOStartButton,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,computedWOStatusPriority,wostatus.memo--wostatusmemo,computedWorkTypeStatus,rel.woactivity{taskid,status},wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,worktype,orgid,woclass,maxvar.downprompt,esttotalcost,istask,wogroup`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `wymyz`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `g4dk9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ej423`
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `d_m_3`
          },
          {
            name: `location.location--locationnum`,
            searchable: `true`,
            id: `gy6zb`
          },
          {
            name: `wopriority`,
            searchable: `true`,
            id: `x3nyj`
          },
          {
            name: `worktype`,
            searchable: `true`,
            id: `dpw__`
          },
          {
            name: `schedfinish`,
            id: `d23z7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `wq39_`
          },
          {
            name: `status_description`,
            id: `mk837`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `v68e9`
          },
          {
            name: `allowedstates`,
            id: `aqyyr`
          },
          {
            name: `asset.description--assetdesc`,
            searchable: `true`,
            id: `z7qd3`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `xn_54`
          },
          {
            name: `asset.assethealth--ahealth`,
            id: `d9b9n`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `g3qg8`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `m_n7b`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `xjpby`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `wz84r`
          },
          {
            name: `serviceaddress.city`,
            id: `zp_ra`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `nkgv2`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `y5vxe`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `zp8w6`
          },
          {
            name: `serviceaddress.country`,
            id: `ve579`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            searchable: `true`,
            id: `exe_8`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `nzbrw`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `ex9_v`
          },
          {
            name: `showplanmaterial._dbcount--materialcount`,
            id: `pjvv3`
          },
          {
            name: `showplantool._dbcount--toolcount`,
            id: `rn2j5`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w8m82_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'w8m82_remarks',
              'Identifies the work order.'
            ),
            id: `w8m82`,
            computed: `true`
          },
          {
            name: `computedAssetNum`,
            'computed-function': `computedAssetNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('yzx7x_title', 'Asset'),
            remarks: app.getLocalizedLabel('yzx7x_remarks', 'Asset Number'),
            id: `yzx7x`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('bzz5w_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'bzz5w_remarks',
              'computedIsOverDue'
            ),
            id: `bzz5w`,
            computed: `true`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `g32ag`,
            computed: `true`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `n9ryw`
          },
          {
            name: `orgid`,
            id: `g_p2y`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `qda4x`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `jg5k2`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `zjy8q`,
            computed: `true`
          },
          {
            name: `computedTimerStatus`,
            'computed-function': `computedTimerStatus`,
            id: `e5_6n`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `m5k5g`
          },
          {
            name: `labtrans`,
            id: `a_n6a`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `xz4k5`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `p2qk4`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `pr7y9`
          },
          {
            name: `computedWOStatusPriority`,
            'computed-function': `computedWOStatusPriority`,
            id: `ewgm6`,
            computed: `true`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `p6e5v`
          },
          {
            name: `computedWorkTypeStatus`,
            'computed-function': `computedWorkTypeStatus`,
            id: `vdqrw`,
            computed: `true`
          },
          {
            name: `rel.woactivity{taskid,status}`,
            id: `g29p_`
          },
          {
            name: `wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum}`,
            id: `vdnby`
          },
          {
            name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
            id: `jdxwr`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `gzwj2`
          },
          {
            name: `uxsynonymdomain.valueid`,
            id: `zypep`
          },
          {
            name: `maxvar.coordinate`,
            id: `mwkdp`
          },
          {
            name: `worktype`,
            id: `wnpqk`
          },
          {
            name: `orgid`,
            id: `mr29q`
          },
          {
            name: `woclass`,
            id: `kpg33`
          },
          {
            name: `maxvar.downprompt`,
            id: `j973v`
          },
          {
            name: `esttotalcost`,
            id: `k3kd2`
          },
          {
            name: `istask`,
            id: `mm8km`
          },
          {
            name: `wogroup`,
            id: `qv3me`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedAssetNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetNum', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedTimerStatus', item)
          },
          computedWOStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOStatusPriority', item)
          },
          computedWorkTypeStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dswolist

    // begin datasource - todaywoassignedDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `todaywoassignedDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `ASSIGNEDWOLIST`,
          mobileQbeFilter: {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'},
          select:
            'autolocate,wonum,description,location.description--locationdesc,location.location--locationnum,wopriority,worktype,schedfinish,status,status_description,status_maxvalue,allowedstates,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,showplanmaterial._dbcount--materialcount,showplantool._dbcount--toolcount,computedWorkType,computedAssetNum,computedIsOverDue,computedDisableButton,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedTimerStatus,hideWOStartButton,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,computedWOStatusPriority,wostatus.memo--wostatusmemo,computedWorkTypeStatus,rel.woactivity{taskid,status},wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,worktype,orgid,woclass,maxvar.downprompt,esttotalcost,istask,wogroup',
          sortAttributes: [],
          searchAttributes: [
            `wonum`,
            `description`,
            `location.description`,
            `location.location`,
            `wopriority`,
            `worktype`,
            `status`,
            `asset.description`,
            `asset.assetnum`,
            `serviceaddress.formattedaddress`,
            `siteid`
          ],
          selectionMode: `single`,
          objectStructure: `mxapiwodetail`,
          orderBy: `wopriority`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `wonum`,
            `description`,
            `location.description--locationdesc`,
            `location.location--locationnum`,
            `wopriority`,
            `worktype`,
            `status`,
            `status_maxvalue`,
            `asset.description--assetdesc`,
            `asset.assetnum--assetnumber`,
            `serviceaddress.formattedaddress--formattedaddress`,
            `siteid`
          ]
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `wymyz`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `g4dk9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ej423`
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `d_m_3`
          },
          {
            name: `location.location--locationnum`,
            searchable: `true`,
            id: `gy6zb`
          },
          {
            name: `wopriority`,
            searchable: `true`,
            id: `x3nyj`
          },
          {
            name: `worktype`,
            searchable: `true`,
            id: `dpw__`
          },
          {
            name: `schedfinish`,
            id: `d23z7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `wq39_`
          },
          {
            name: `status_description`,
            id: `mk837`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `v68e9`
          },
          {
            name: `allowedstates`,
            id: `aqyyr`
          },
          {
            name: `asset.description--assetdesc`,
            searchable: `true`,
            id: `z7qd3`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `xn_54`
          },
          {
            name: `asset.assethealth--ahealth`,
            id: `d9b9n`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `g3qg8`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `m_n7b`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `xjpby`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `wz84r`
          },
          {
            name: `serviceaddress.city`,
            id: `zp_ra`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `nkgv2`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `y5vxe`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `zp8w6`
          },
          {
            name: `serviceaddress.country`,
            id: `ve579`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            searchable: `true`,
            id: `exe_8`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `nzbrw`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `ex9_v`
          },
          {
            name: `showplanmaterial._dbcount--materialcount`,
            id: `pjvv3`
          },
          {
            name: `showplantool._dbcount--toolcount`,
            id: `rn2j5`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w8m82_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'w8m82_remarks',
              'Identifies the work order.'
            ),
            id: `w8m82`,
            computed: `true`
          },
          {
            name: `computedAssetNum`,
            'computed-function': `computedAssetNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('yzx7x_title', 'Asset'),
            remarks: app.getLocalizedLabel('yzx7x_remarks', 'Asset Number'),
            id: `yzx7x`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('bzz5w_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'bzz5w_remarks',
              'computedIsOverDue'
            ),
            id: `bzz5w`,
            computed: `true`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `g32ag`,
            computed: `true`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `n9ryw`
          },
          {
            name: `orgid`,
            id: `g_p2y`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `qda4x`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `jg5k2`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `zjy8q`,
            computed: `true`
          },
          {
            name: `computedTimerStatus`,
            'computed-function': `computedTimerStatus`,
            id: `e5_6n`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `m5k5g`
          },
          {
            name: `labtrans`,
            id: `a_n6a`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `xz4k5`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `p2qk4`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `pr7y9`
          },
          {
            name: `computedWOStatusPriority`,
            'computed-function': `computedWOStatusPriority`,
            id: `ewgm6`,
            computed: `true`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `p6e5v`
          },
          {
            name: `computedWorkTypeStatus`,
            'computed-function': `computedWorkTypeStatus`,
            id: `vdqrw`,
            computed: `true`
          },
          {
            name: `rel.woactivity{taskid,status}`,
            id: `g29p_`
          },
          {
            name: `wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum}`,
            id: `vdnby`
          },
          {
            name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
            id: `jdxwr`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `gzwj2`
          },
          {
            name: `uxsynonymdomain.valueid`,
            id: `zypep`
          },
          {
            name: `maxvar.coordinate`,
            id: `mwkdp`
          },
          {
            name: `worktype`,
            id: `wnpqk`
          },
          {
            name: `orgid`,
            id: `mr29q`
          },
          {
            name: `woclass`,
            id: `kpg33`
          },
          {
            name: `maxvar.downprompt`,
            id: `j973v`
          },
          {
            name: `esttotalcost`,
            id: `k3kd2`
          },
          {
            name: `istask`,
            id: `mm8km`
          },
          {
            name: `wogroup`,
            id: `qv3me`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `dswolist`,
        computedFields: {
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedAssetNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetNum', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedTimerStatus', item)
          },
          computedWOStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOStatusPriority', item)
          },
          computedWorkTypeStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'},
            check: () => {
              return {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - todaywoassignedDS

    // begin datasource - pmduewolistDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `pmduewolistDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `PMWOLIST`,
          where: `schedfinish>="&SYSDAY&" and schedfinish<="&SYSDAY&+7D"`,
          mobileQbeFilter: {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'},
          select:
            'autolocate,wonum,description,location.description--locationdesc,location.location--locationnum,wopriority,worktype,schedfinish,status,status_description,status_maxvalue,allowedstates,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,showplanmaterial._dbcount--materialcount,showplantool._dbcount--toolcount,computedWorkType,computedAssetNum,computedIsOverDue,computedDisableButton,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedTimerStatus,hideWOStartButton,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,computedWOStatusPriority,wostatus.memo--wostatusmemo,computedWorkTypeStatus,rel.woactivity{taskid,status},wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,worktype,orgid,woclass,maxvar.downprompt,esttotalcost,istask,wogroup',
          sortAttributes: [],
          searchAttributes: [
            `wonum`,
            `description`,
            `location.description`,
            `location.location`,
            `wopriority`,
            `worktype`,
            `status`,
            `asset.description`,
            `asset.assetnum`,
            `serviceaddress.formattedaddress`,
            `siteid`
          ],
          selectionMode: `single`,
          objectStructure: `mxapiwodetail`,
          orderBy: `wopriority`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `wonum`,
            `description`,
            `location.description--locationdesc`,
            `location.location--locationnum`,
            `wopriority`,
            `worktype`,
            `status`,
            `status_maxvalue`,
            `asset.description--assetdesc`,
            `asset.assetnum--assetnumber`,
            `serviceaddress.formattedaddress--formattedaddress`,
            `siteid`
          ]
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `wymyz`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `g4dk9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ej423`
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `d_m_3`
          },
          {
            name: `location.location--locationnum`,
            searchable: `true`,
            id: `gy6zb`
          },
          {
            name: `wopriority`,
            searchable: `true`,
            id: `x3nyj`
          },
          {
            name: `worktype`,
            searchable: `true`,
            id: `dpw__`
          },
          {
            name: `schedfinish`,
            id: `d23z7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `wq39_`
          },
          {
            name: `status_description`,
            id: `mk837`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `v68e9`
          },
          {
            name: `allowedstates`,
            id: `aqyyr`
          },
          {
            name: `asset.description--assetdesc`,
            searchable: `true`,
            id: `z7qd3`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `xn_54`
          },
          {
            name: `asset.assethealth--ahealth`,
            id: `d9b9n`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `g3qg8`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `m_n7b`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `xjpby`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `wz84r`
          },
          {
            name: `serviceaddress.city`,
            id: `zp_ra`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `nkgv2`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `y5vxe`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `zp8w6`
          },
          {
            name: `serviceaddress.country`,
            id: `ve579`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            searchable: `true`,
            id: `exe_8`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `nzbrw`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `ex9_v`
          },
          {
            name: `showplanmaterial._dbcount--materialcount`,
            id: `pjvv3`
          },
          {
            name: `showplantool._dbcount--toolcount`,
            id: `rn2j5`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w8m82_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'w8m82_remarks',
              'Identifies the work order.'
            ),
            id: `w8m82`,
            computed: `true`
          },
          {
            name: `computedAssetNum`,
            'computed-function': `computedAssetNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('yzx7x_title', 'Asset'),
            remarks: app.getLocalizedLabel('yzx7x_remarks', 'Asset Number'),
            id: `yzx7x`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('bzz5w_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'bzz5w_remarks',
              'computedIsOverDue'
            ),
            id: `bzz5w`,
            computed: `true`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `g32ag`,
            computed: `true`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `n9ryw`
          },
          {
            name: `orgid`,
            id: `g_p2y`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `qda4x`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `jg5k2`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `zjy8q`,
            computed: `true`
          },
          {
            name: `computedTimerStatus`,
            'computed-function': `computedTimerStatus`,
            id: `e5_6n`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `m5k5g`
          },
          {
            name: `labtrans`,
            id: `a_n6a`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `xz4k5`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `p2qk4`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `pr7y9`
          },
          {
            name: `computedWOStatusPriority`,
            'computed-function': `computedWOStatusPriority`,
            id: `ewgm6`,
            computed: `true`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `p6e5v`
          },
          {
            name: `computedWorkTypeStatus`,
            'computed-function': `computedWorkTypeStatus`,
            id: `vdqrw`,
            computed: `true`
          },
          {
            name: `rel.woactivity{taskid,status}`,
            id: `g29p_`
          },
          {
            name: `wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum}`,
            id: `vdnby`
          },
          {
            name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
            id: `jdxwr`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `gzwj2`
          },
          {
            name: `uxsynonymdomain.valueid`,
            id: `zypep`
          },
          {
            name: `maxvar.coordinate`,
            id: `mwkdp`
          },
          {
            name: `worktype`,
            id: `wnpqk`
          },
          {
            name: `orgid`,
            id: `mr29q`
          },
          {
            name: `woclass`,
            id: `kpg33`
          },
          {
            name: `maxvar.downprompt`,
            id: `j973v`
          },
          {
            name: `esttotalcost`,
            id: `k3kd2`
          },
          {
            name: `istask`,
            id: `mm8km`
          },
          {
            name: `wogroup`,
            id: `qv3me`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `dswolist`,
        computedFields: {
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedAssetNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetNum', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedTimerStatus', item)
          },
          computedWOStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOStatusPriority', item)
          },
          computedWorkTypeStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'},
            check: () => {
              return {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - pmduewolistDS

    // begin datasource - myworkDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `myworkDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `MYWORK`,
          mobileQbeFilter: {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'},
          select:
            'autolocate,wonum,description,location.description--locationdesc,location.location--locationnum,wopriority,worktype,schedfinish,status,status_description,status_maxvalue,allowedstates,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,showplanmaterial._dbcount--materialcount,showplantool._dbcount--toolcount,computedWorkType,computedAssetNum,computedIsOverDue,computedDisableButton,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedTimerStatus,hideWOStartButton,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,computedWOStatusPriority,wostatus.memo--wostatusmemo,computedWorkTypeStatus,rel.woactivity{taskid,status},wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,worktype,orgid,woclass,maxvar.downprompt,esttotalcost,istask,wogroup',
          sortAttributes: [],
          searchAttributes: [
            `wonum`,
            `description`,
            `location.description`,
            `location.location`,
            `wopriority`,
            `worktype`,
            `status`,
            `asset.description`,
            `asset.assetnum`,
            `serviceaddress.formattedaddress`,
            `siteid`
          ],
          selectionMode: `single`,
          objectStructure: `mxapiwodetail`,
          orderBy: `wopriority`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `wonum`,
            `description`,
            `location.description--locationdesc`,
            `location.location--locationnum`,
            `wopriority`,
            `worktype`,
            `status`,
            `status_maxvalue`,
            `asset.description--assetdesc`,
            `asset.assetnum--assetnumber`,
            `serviceaddress.formattedaddress--formattedaddress`,
            `siteid`
          ]
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `wymyz`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `g4dk9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ej423`
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `d_m_3`
          },
          {
            name: `location.location--locationnum`,
            searchable: `true`,
            id: `gy6zb`
          },
          {
            name: `wopriority`,
            searchable: `true`,
            id: `x3nyj`
          },
          {
            name: `worktype`,
            searchable: `true`,
            id: `dpw__`
          },
          {
            name: `schedfinish`,
            id: `d23z7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `wq39_`
          },
          {
            name: `status_description`,
            id: `mk837`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `v68e9`
          },
          {
            name: `allowedstates`,
            id: `aqyyr`
          },
          {
            name: `asset.description--assetdesc`,
            searchable: `true`,
            id: `z7qd3`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `xn_54`
          },
          {
            name: `asset.assethealth--ahealth`,
            id: `d9b9n`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `g3qg8`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `m_n7b`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `xjpby`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `wz84r`
          },
          {
            name: `serviceaddress.city`,
            id: `zp_ra`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `nkgv2`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `y5vxe`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `zp8w6`
          },
          {
            name: `serviceaddress.country`,
            id: `ve579`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            searchable: `true`,
            id: `exe_8`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `nzbrw`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `ex9_v`
          },
          {
            name: `showplanmaterial._dbcount--materialcount`,
            id: `pjvv3`
          },
          {
            name: `showplantool._dbcount--toolcount`,
            id: `rn2j5`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w8m82_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'w8m82_remarks',
              'Identifies the work order.'
            ),
            id: `w8m82`,
            computed: `true`
          },
          {
            name: `computedAssetNum`,
            'computed-function': `computedAssetNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('yzx7x_title', 'Asset'),
            remarks: app.getLocalizedLabel('yzx7x_remarks', 'Asset Number'),
            id: `yzx7x`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('bzz5w_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'bzz5w_remarks',
              'computedIsOverDue'
            ),
            id: `bzz5w`,
            computed: `true`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `g32ag`,
            computed: `true`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `n9ryw`
          },
          {
            name: `orgid`,
            id: `g_p2y`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `qda4x`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `jg5k2`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `zjy8q`,
            computed: `true`
          },
          {
            name: `computedTimerStatus`,
            'computed-function': `computedTimerStatus`,
            id: `e5_6n`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `m5k5g`
          },
          {
            name: `labtrans`,
            id: `a_n6a`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `xz4k5`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `p2qk4`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `pr7y9`
          },
          {
            name: `computedWOStatusPriority`,
            'computed-function': `computedWOStatusPriority`,
            id: `ewgm6`,
            computed: `true`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `p6e5v`
          },
          {
            name: `computedWorkTypeStatus`,
            'computed-function': `computedWorkTypeStatus`,
            id: `vdqrw`,
            computed: `true`
          },
          {
            name: `rel.woactivity{taskid,status}`,
            id: `g29p_`
          },
          {
            name: `wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum}`,
            id: `vdnby`
          },
          {
            name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
            id: `jdxwr`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `gzwj2`
          },
          {
            name: `uxsynonymdomain.valueid`,
            id: `zypep`
          },
          {
            name: `maxvar.coordinate`,
            id: `mwkdp`
          },
          {
            name: `worktype`,
            id: `wnpqk`
          },
          {
            name: `orgid`,
            id: `mr29q`
          },
          {
            name: `woclass`,
            id: `kpg33`
          },
          {
            name: `maxvar.downprompt`,
            id: `j973v`
          },
          {
            name: `esttotalcost`,
            id: `k3kd2`
          },
          {
            name: `istask`,
            id: `mm8km`
          },
          {
            name: `wogroup`,
            id: `qv3me`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `dswolist`,
        computedFields: {
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedAssetNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetNum', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedTimerStatus', item)
          },
          computedWOStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOStatusPriority', item)
          },
          computedWorkTypeStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'},
            check: () => {
              return {status_maxvalue: '!=COMP,CAN,CLOSE,WAPPR'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - myworkDS

    // begin datasource - myworkCreatedLocally
    {
      let options = {
        platform: `maximoMobile`,
        name: `myworkCreatedLocally`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `CREATEDLOCALLY`,
          mobileQbeFilter: {status_maxvalue: '!=COMP,CAN,CLOSE'},
          select:
            'autolocate,wonum,description,location.description--locationdesc,location.location--locationnum,wopriority,worktype,schedfinish,status,status_description,status_maxvalue,allowedstates,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,showplanmaterial._dbcount--materialcount,showplantool._dbcount--toolcount,computedWorkType,computedAssetNum,computedIsOverDue,computedDisableButton,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedTimerStatus,hideWOStartButton,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,computedWOStatusPriority,wostatus.memo--wostatusmemo,computedWorkTypeStatus,rel.woactivity{taskid,status},wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,worktype,orgid,woclass,maxvar.downprompt,esttotalcost,istask,wogroup',
          sortAttributes: [],
          searchAttributes: [
            `wonum`,
            `description`,
            `location.description`,
            `location.location`,
            `wopriority`,
            `worktype`,
            `status`,
            `asset.description`,
            `asset.assetnum`,
            `serviceaddress.formattedaddress`,
            `siteid`
          ],
          selectionMode: `single`,
          objectStructure: `mxapiwodetail`,
          orderBy: `wopriority`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `wonum`,
            `description`,
            `location.description--locationdesc`,
            `location.location--locationnum`,
            `wopriority`,
            `worktype`,
            `status`,
            `status_maxvalue`,
            `asset.description--assetdesc`,
            `asset.assetnum--assetnumber`,
            `serviceaddress.formattedaddress--formattedaddress`,
            `siteid`
          ]
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `wymyz`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `g4dk9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ej423`
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `d_m_3`
          },
          {
            name: `location.location--locationnum`,
            searchable: `true`,
            id: `gy6zb`
          },
          {
            name: `wopriority`,
            searchable: `true`,
            id: `x3nyj`
          },
          {
            name: `worktype`,
            searchable: `true`,
            id: `dpw__`
          },
          {
            name: `schedfinish`,
            id: `d23z7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `wq39_`
          },
          {
            name: `status_description`,
            id: `mk837`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `v68e9`
          },
          {
            name: `allowedstates`,
            id: `aqyyr`
          },
          {
            name: `asset.description--assetdesc`,
            searchable: `true`,
            id: `z7qd3`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `xn_54`
          },
          {
            name: `asset.assethealth--ahealth`,
            id: `d9b9n`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `g3qg8`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `m_n7b`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `xjpby`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `wz84r`
          },
          {
            name: `serviceaddress.city`,
            id: `zp_ra`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `nkgv2`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `y5vxe`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `zp8w6`
          },
          {
            name: `serviceaddress.country`,
            id: `ve579`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            searchable: `true`,
            id: `exe_8`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `nzbrw`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `ex9_v`
          },
          {
            name: `showplanmaterial._dbcount--materialcount`,
            id: `pjvv3`
          },
          {
            name: `showplantool._dbcount--toolcount`,
            id: `rn2j5`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w8m82_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'w8m82_remarks',
              'Identifies the work order.'
            ),
            id: `w8m82`,
            computed: `true`
          },
          {
            name: `computedAssetNum`,
            'computed-function': `computedAssetNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('yzx7x_title', 'Asset'),
            remarks: app.getLocalizedLabel('yzx7x_remarks', 'Asset Number'),
            id: `yzx7x`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('bzz5w_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'bzz5w_remarks',
              'computedIsOverDue'
            ),
            id: `bzz5w`,
            computed: `true`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `g32ag`,
            computed: `true`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `n9ryw`
          },
          {
            name: `orgid`,
            id: `g_p2y`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `qda4x`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `jg5k2`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `zjy8q`,
            computed: `true`
          },
          {
            name: `computedTimerStatus`,
            'computed-function': `computedTimerStatus`,
            id: `e5_6n`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `m5k5g`
          },
          {
            name: `labtrans`,
            id: `a_n6a`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `xz4k5`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `p2qk4`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `pr7y9`
          },
          {
            name: `computedWOStatusPriority`,
            'computed-function': `computedWOStatusPriority`,
            id: `ewgm6`,
            computed: `true`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `p6e5v`
          },
          {
            name: `computedWorkTypeStatus`,
            'computed-function': `computedWorkTypeStatus`,
            id: `vdqrw`,
            computed: `true`
          },
          {
            name: `rel.woactivity{taskid,status}`,
            id: `g29p_`
          },
          {
            name: `wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum}`,
            id: `vdnby`
          },
          {
            name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
            id: `jdxwr`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `gzwj2`
          },
          {
            name: `uxsynonymdomain.valueid`,
            id: `zypep`
          },
          {
            name: `maxvar.coordinate`,
            id: `mwkdp`
          },
          {
            name: `worktype`,
            id: `wnpqk`
          },
          {
            name: `orgid`,
            id: `mr29q`
          },
          {
            name: `woclass`,
            id: `kpg33`
          },
          {
            name: `maxvar.downprompt`,
            id: `j973v`
          },
          {
            name: `esttotalcost`,
            id: `k3kd2`
          },
          {
            name: `istask`,
            id: `mm8km`
          },
          {
            name: `wogroup`,
            id: `qv3me`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `dswolist`,
        computedFields: {
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedAssetNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetNum', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedTimerStatus', item)
          },
          computedWOStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOStatusPriority', item)
          },
          computedWorkTypeStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '!=COMP,CAN,CLOSE'},
            check: () => {
              return {status_maxvalue: '!=COMP,CAN,CLOSE'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - myworkCreatedLocally

    // begin datasource - myWorkOrder
    {
      let options = {
        platform: `maximoMobile`,
        name: `myWorkOrder`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `uxtechnicianstatusfilteredwolist`,
          select:
            'autolocate,wonum,description,location.description--locationdesc,location.location--locationnum,wopriority,worktype,schedfinish,status,status_description,status_maxvalue,allowedstates,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,showplanmaterial._dbcount--materialcount,showplantool._dbcount--toolcount,computedWorkType,computedAssetNum,computedIsOverDue,computedDisableButton,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedTimerStatus,hideWOStartButton,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,computedWOStatusPriority,wostatus.memo--wostatusmemo,computedWorkTypeStatus,rel.woactivity{taskid,status},wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,worktype,orgid,woclass,maxvar.downprompt,esttotalcost,istask,wogroup',
          sortAttributes: [],
          searchAttributes: [
            `wonum`,
            `description`,
            `location.description`,
            `location.location`,
            `wopriority`,
            `worktype`,
            `status`,
            `asset.description`,
            `asset.assetnum`,
            `serviceaddress.formattedaddress`,
            `siteid`
          ],
          selectionMode: `single`,
          objectStructure: `mxapiwodetail`,
          orderBy: `wopriority`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `wonum`,
            `description`,
            `location.description--locationdesc`,
            `location.location--locationnum`,
            `wopriority`,
            `worktype`,
            `status`,
            `status_maxvalue`,
            `asset.description--assetdesc`,
            `asset.assetnum--assetnumber`,
            `serviceaddress.formattedaddress--formattedaddress`,
            `siteid`
          ]
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `wymyz`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `g4dk9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ej423`
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `d_m_3`
          },
          {
            name: `location.location--locationnum`,
            searchable: `true`,
            id: `gy6zb`
          },
          {
            name: `wopriority`,
            searchable: `true`,
            id: `x3nyj`
          },
          {
            name: `worktype`,
            searchable: `true`,
            id: `dpw__`
          },
          {
            name: `schedfinish`,
            id: `d23z7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `wq39_`
          },
          {
            name: `status_description`,
            id: `mk837`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `v68e9`
          },
          {
            name: `allowedstates`,
            id: `aqyyr`
          },
          {
            name: `asset.description--assetdesc`,
            searchable: `true`,
            id: `z7qd3`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `xn_54`
          },
          {
            name: `asset.assethealth--ahealth`,
            id: `d9b9n`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `g3qg8`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `m_n7b`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `xjpby`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `wz84r`
          },
          {
            name: `serviceaddress.city`,
            id: `zp_ra`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `nkgv2`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `y5vxe`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `zp8w6`
          },
          {
            name: `serviceaddress.country`,
            id: `ve579`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            searchable: `true`,
            id: `exe_8`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `nzbrw`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `ex9_v`
          },
          {
            name: `showplanmaterial._dbcount--materialcount`,
            id: `pjvv3`
          },
          {
            name: `showplantool._dbcount--toolcount`,
            id: `rn2j5`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w8m82_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'w8m82_remarks',
              'Identifies the work order.'
            ),
            id: `w8m82`,
            computed: `true`
          },
          {
            name: `computedAssetNum`,
            'computed-function': `computedAssetNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('yzx7x_title', 'Asset'),
            remarks: app.getLocalizedLabel('yzx7x_remarks', 'Asset Number'),
            id: `yzx7x`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('bzz5w_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'bzz5w_remarks',
              'computedIsOverDue'
            ),
            id: `bzz5w`,
            computed: `true`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `g32ag`,
            computed: `true`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `n9ryw`
          },
          {
            name: `orgid`,
            id: `g_p2y`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `qda4x`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `jg5k2`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `zjy8q`,
            computed: `true`
          },
          {
            name: `computedTimerStatus`,
            'computed-function': `computedTimerStatus`,
            id: `e5_6n`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `m5k5g`
          },
          {
            name: `labtrans`,
            id: `a_n6a`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `xz4k5`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `p2qk4`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `pr7y9`
          },
          {
            name: `computedWOStatusPriority`,
            'computed-function': `computedWOStatusPriority`,
            id: `ewgm6`,
            computed: `true`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `p6e5v`
          },
          {
            name: `computedWorkTypeStatus`,
            'computed-function': `computedWorkTypeStatus`,
            id: `vdqrw`,
            computed: `true`
          },
          {
            name: `rel.woactivity{taskid,status}`,
            id: `g29p_`
          },
          {
            name: `wpmaterial{wpitemid,itemqty,itemnum,description,location.description--locationdesc,location.location--locationnum}`,
            id: `vdnby`
          },
          {
            name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
            id: `jdxwr`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `gzwj2`
          },
          {
            name: `uxsynonymdomain.valueid`,
            id: `zypep`
          },
          {
            name: `maxvar.coordinate`,
            id: `mwkdp`
          },
          {
            name: `worktype`,
            id: `wnpqk`
          },
          {
            name: `orgid`,
            id: `mr29q`
          },
          {
            name: `woclass`,
            id: `kpg33`
          },
          {
            name: `maxvar.downprompt`,
            id: `j973v`
          },
          {
            name: `esttotalcost`,
            id: `k3kd2`
          },
          {
            name: `istask`,
            id: `mm8km`
          },
          {
            name: `wogroup`,
            id: `qv3me`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `dswolist`,
        computedFields: {
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedAssetNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetNum', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedTimerStatus', item)
          },
          computedWOStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOStatusPriority', item)
          },
          computedWorkTypeStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - myWorkOrder

    // begin datasource - wodetails
    {
      let options = {
        platform: `maximoMobile`,
        name: `wodetails`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          itemUrl: page.params.href,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `workorderid,wonum,siteid,rel.asset.mxapiasset{assetnum,description},location.location--locationnum,location.description--locationdesc,labtrans,rel.wototal{*}`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `wmkv_`
          },
          {
            name: `wonum`,
            id: `mwjz6`
          },
          {
            name: `siteid`,
            id: `gqb8q`
          },
          {
            name: `rel.asset.mxapiasset{assetnum,description}`,
            id: `z84xw`
          },
          {
            name: `location.location--locationnum`,
            id: `rzrxe`
          },
          {
            name: `location.description--locationdesc`,
            id: `xy3wa`
          },
          {
            name: `labtrans`,
            id: `kzjd2`
          },
          {
            name: `rel.wototal{*}`,
            id: `zj3vb`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - wodetails

    // begin datasource - signatureAttachment
    {
      let options = {
        platform: `maximoMobile`,
        name: `signatureAttachment`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          attachment: true,
          relationship: `doclinks`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          dependsOn: `wodetails`,
          select: `*`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `*`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `*`,
            'unique-id': `true`,
            id: `qgd_5`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - signatureAttachment

    // begin datasource - woWorklogDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `woWorklogDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          selectionMode: `none`,
          relationship: `woworklog`,
          objectName: `worklog`,
          itemUrl: page.params.href,
          select: `createdate,description,description_longdescription,person.displayname--createby,logtype,anywhererefid`,
          dependsOn: `wodetails`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `createdate`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `createdate`,
            'unique-id': `true`,
            id: `jn_ae`
          },
          {
            name: `description`,
            id: `wa58q`
          },
          {
            name: `description_longdescription`,
            id: `y7apk`
          },
          {
            name: `person.displayname--createby`,
            id: `zb66a`
          },
          {
            name: `logtype`,
            id: `ezq9r`
          },
          {
            name: `anywhererefid`,
            id: `em_rn`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woWorklogDs

    // begin datasource - womaterialsds
    {
      let options = {
        platform: `maximoMobile`,
        name: `womaterialsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `showplanmaterial`,
          selectionMode: `none`,
          dependsOn: `wodetails`,
          notifyWhenParentLoads: true,
          itemUrl: page.params.href,
          select: `itemnum,description,itemqty,computedItemNum,location.description--locationdesc,wpitemid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `wpitemid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            id: `zzxbj`
          },
          {
            name: `description`,
            id: `v4e9a`
          },
          {
            name: `itemqty`,
            id: `pvg5x`
          },
          {
            name: `computedItemNum`,
            'computed-function': `computedItemNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('zpjz9_title', 'Item'),
            remarks: app.getLocalizedLabel(
              'zpjz9_remarks',
              'Identifies the item.'
            ),
            id: `zpjz9`,
            computed: `true`
          },
          {
            name: `location.description--locationdesc`,
            id: `q4qj7`
          },
          {
            name: `wpitemid`,
            'unique-id': `true`,
            id: `mp7wv`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {
          computedItemNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedItemNum', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - womaterialsds

    // begin datasource - wotoolsds
    {
      let options = {
        platform: `maximoMobile`,
        name: `wotoolsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `showplantool`,
          selectionMode: `none`,
          dependsOn: `wodetails`,
          notifyWhenParentLoads: true,
          itemUrl: page.params.href,
          select: `itemnum,description,storelocsite,location.location--locationnum,location.description--locationdesc,itemqty,hours,wpitemid,computedItemNum`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `wpitemid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            'unique-id': `true`,
            id: `vepx8`
          },
          {
            name: `description`,
            id: `x8err`
          },
          {
            name: `storelocsite`,
            id: `x4mwj`
          },
          {
            name: `location.location--locationnum`,
            id: `n77mn`
          },
          {
            name: `location.description--locationdesc`,
            id: `xj4xg`
          },
          {
            name: `itemqty`,
            id: `kwnxe`
          },
          {
            name: `hours`,
            id: `nvng_`
          },
          {
            name: `wpitemid`,
            'unique-id': `true`,
            id: `npq6k`
          },
          {
            name: `computedItemNum`,
            'computed-function': `computedItemNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('a3vdy_title', 'Tool'),
            remarks: app.getLocalizedLabel(
              'a3vdy_remarks',
              'Identifies the tool.'
            ),
            id: `a3vdy`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {
          computedItemNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedItemNum', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - wotoolsds

    // begin datasource - woassetmeters
    {
      let options = {
        platform: `maximoMobile`,
        name: `woassetmeters`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `activeassetmeter.mxapiassetmeter`,
          objectName: `assetmeter`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          orderBy: `sequence`,
          itemUrl: page.params.href,
          searchAttributes: [`assetnum`, `active`, `siteid`],
          indexAttributes: [`assetnum`, `active`, `siteid`, `sequence`],
          select: `metername,lastreading,measureunitid,lastreadingdate,assetnum,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,newreadingFlag,siteid,sequence,computedReading,computedReadingDate`,
          dependsOn: `wodetails`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `assetmeterid`,
        selectionMode: `none`,
        sortAttributes: [`sequence`],
        schemaExt: [
          {
            name: `metername`,
            id: `byyav`
          },
          {
            name: `lastreading`,
            id: `a3r62`
          },
          {
            name: `measureunitid`,
            id: `p837_`
          },
          {
            name: `lastreadingdate`,
            id: `n6yma`
          },
          {
            name: `assetnum`,
            searchable: `true`,
            id: `y45pe`
          },
          {
            name: `active`,
            searchable: `true`,
            id: `qjw96`
          },
          {
            name: `newreading`,
            type: `NUMBER`,
            'sub-type': `DECIMAL`,
            id: `bb39n`
          },
          {
            name: `rollover`,
            id: `q47z6`
          },
          {
            name: `remarks`,
            id: `z3en6`
          },
          {
            name: `newreadingdate`,
            id: `nzmez`
          },
          {
            name: `meter.description`,
            id: `zazzy`
          },
          {
            name: `meter.metertype`,
            id: `dz3an`
          },
          {
            name: `meter.domainid`,
            id: `banw_`
          },
          {
            name: `index`,
            id: `mb8mw`
          },
          {
            name: `href`,
            id: `kerxj`
          },
          {
            name: `assetmeterid`,
            'unique-id': `true`,
            id: `mgved`
          },
          {
            name: `dorollover`,
            id: `xj7yp`
          },
          {
            name: `previousreading`,
            id: `dmwqg`
          },
          {
            name: `previousreadingdate`,
            id: `abz4v`
          },
          {
            name: `assetmeterdomain.value`,
            id: `m5p69`
          },
          {
            name: `assetmeterdomain.description`,
            id: `rqkqw`
          },
          {
            name: `readingtype`,
            id: `jvyxr`
          },
          {
            name: `newreadingFlag`,
            type: `BOOL`,
            id: `jd_p7`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `er56v`
          },
          {
            name: `sequence`,
            sortable: `true`,
            id: `zqg_7`
          },
          {
            name: `computedReading`,
            'computed-function': `computedReading`,
            id: `kmkj3`,
            computed: `true`
          },
          {
            name: `computedReadingDate`,
            'computed-function': `computedReading`,
            id: `rejz5`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {
          computedReading: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedReading', item)
          },
          computedReadingDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedReading', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woassetmeters

    // begin datasource - wolocationmeters
    {
      let options = {
        platform: `maximoMobile`,
        name: `wolocationmeters`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `activelocationmeter.mxapilocationmeter`,
          objectName: `locationmeter`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          orderBy: `sequence`,
          searchAttributes: [`location`, `active`, `siteid`],
          indexAttributes: [`location`, `active`, `siteid`, `sequence`],
          select: `metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,locations,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,computedReading,computedReadingDate`,
          dependsOn: `wodetails`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `locationmeterid`,
        selectionMode: `none`,
        sortAttributes: [`sequence`],
        schemaExt: [
          {
            name: `metername`,
            id: `gy4yx`
          },
          {
            name: `lastreading`,
            id: `vzqkn`
          },
          {
            name: `measureunitid`,
            id: `wk7z3`
          },
          {
            name: `lastreadingdate`,
            id: `jp3gq`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `pe4vd`
          },
          {
            name: `active`,
            searchable: `true`,
            id: `axe_q`
          },
          {
            name: `newreading`,
            type: `NUMBER`,
            'sub-type': `DECIMAL`,
            id: `r4nrv`
          },
          {
            name: `rollover`,
            id: `wr2gz`
          },
          {
            name: `remarks`,
            id: `xyw4z`
          },
          {
            name: `newreadingdate`,
            id: `q8yqa`
          },
          {
            name: `meter.description`,
            id: `ed5ax`
          },
          {
            name: `meter.metertype`,
            id: `ka9mz`
          },
          {
            name: `meter.domainid`,
            id: `pbpag`
          },
          {
            name: `domainid`,
            id: `ym8ax`
          },
          {
            name: `href`,
            id: `j77ke`
          },
          {
            name: `index`,
            id: `qv2vy`
          },
          {
            name: `locationmeterid`,
            'unique-id': `true`,
            id: `gegkg`
          },
          {
            name: `locations`,
            id: `m7mkg`
          },
          {
            name: `previousreading`,
            id: `a39jv`
          },
          {
            name: `previousreadingdate`,
            id: `n63v_`
          },
          {
            name: `locationmeterdomain.value`,
            id: `e3v6x`
          },
          {
            name: `locationmeterdomain.description`,
            id: `wgn2b`
          },
          {
            name: `readingtype`,
            id: `rbrwg`
          },
          {
            name: `newreadingFlag`,
            type: `BOOL`,
            id: `vb5xm`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `g9bb3`
          },
          {
            name: `dorollover`,
            id: `q7y2m`
          },
          {
            name: `sequence`,
            sortable: `true`,
            id: `p5j8w`
          },
          {
            name: `computedReading`,
            'computed-function': `computedReading`,
            id: `g37_8`,
            computed: `true`
          },
          {
            name: `computedReadingDate`,
            'computed-function': `computedReading`,
            id: `y3_3p`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {
          computedReading: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedReading', item)
          },
          computedReadingDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedReading', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ScheduleDataController();
      bootstrapInspector.onNewController(
        controller,
        'ScheduleDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - wolocationmeters

    // begin datasource - woLaborDetaildsOnSchedule
    {
      let options = {
        platform: `maximoMobile`,
        name: `woLaborDetaildsOnSchedule`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `labtransid`,
          relationship: `uxshowactuallabor`,
          notifyWhenParentLoads: true,
          dependsOn: `wodetails`,
          searchAttributes: [`timerstatus`, `laborcode`],
          indexAttributes: [`timerstatus`, `laborcode`],
          select: `startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `labtransid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `startdate`,
            id: `dym6j`
          },
          {
            name: `starttime`,
            id: `z4nae`
          },
          {
            name: `startdatetime`,
            id: `z3346`
          },
          {
            name: `finishdate`,
            id: `pym8j`
          },
          {
            name: `finishtime`,
            id: `wee94`
          },
          {
            name: `finishdatetime`,
            id: `b5483`
          },
          {
            name: `regularhrs`,
            id: `d34eb`
          },
          {
            name: `transtype`,
            id: `wme9p`
          },
          {
            name: `labtransid`,
            'unique-id': `true`,
            id: `e3_92`
          },
          {
            name: `timerstatus`,
            searchable: `true`,
            id: `k3ba4`
          },
          {
            name: `laborcode`,
            searchable: `true`,
            id: `xj8ve`
          },
          {
            name: `anywhererefid`,
            id: `a7je9`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `wodetails`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woLaborDetaildsOnSchedule

    // begin datasource - dsnewreading
    {
      let options = {
        platform: `maximoMobile`,
        name: `dsnewreading`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 100,
        debounceTime: 400,
        query: {
          pageSize: 100,
          selectionMode: `single`,
          objectStructure: `mxapialndomain`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`domainid`],
          indexAttributes: [`domainid`],
          select: `value,valueid,description,domainid,siteid,orgid`
        },
        objectStructure: `mxapialndomain`,
        idAttribute: `value`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `value`,
            'unique-id': `true`,
            id: `gv9ge`
          },
          {
            name: `valueid`,
            id: `gx955`
          },
          {
            name: `description`,
            id: `bkqzb`
          },
          {
            name: `domainid`,
            searchable: `true`,
            id: `v64yv`
          },
          {
            name: `siteid`,
            id: `jgbv9`
          },
          {
            name: `orgid`,
            id: `p6_8v`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dsnewreading

    // begin datasource - dsstatusDomainList
    {
      let options = {
        name: `dsstatusDomainList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `statusItems`,
        schemaExt: [
          {
            name: `value`,
            id: `pqyvz`
          },
          {
            name: `description`,
            id: `k8k8k`
          },
          {
            name: `maxvalue`,
            id: `rawnz`
          }
        ],
        sortAttributes: [],
        idAttribute: `value`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `value,description,maxvalue`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dsstatusDomainList

    // begin dialog - slidingwomaterials
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `slidingwomaterials`,
        configuration: {
          id: `slidingwomaterials`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerSlidingwomaterials
                slidingDrawerProps={props}
                id={'slidingwomaterials_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - slidingwomaterials

    // begin dialog - workLogDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `workLogDrawer`,
        configuration: {
          id: `workLogDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerWorkLogDrawer
                slidingDrawerProps={props}
                id={'workLogDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - workLogDrawer

    // begin dialog - woStatusChangeDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `woStatusChangeDialog`,
        configuration: {
          id: `woStatusChangeDialog`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerWoStatusChangeDialog
                slidingDrawerProps={props}
                id={'woStatusChangeDialog_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});
      let controller = new ChangeStatusController();
      bootstrapInspector.onNewController(
        controller,
        'ChangeStatusController',
        dialog
      );
      dialog.registerController(controller);
      page.registerDialog(dialog);
    }
    // end dialog - woStatusChangeDialog

    // begin dialog - meterReadingDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `meterReadingDrawer`,
        configuration: {
          id: `meterReadingDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerMeterReadingDrawer
                slidingDrawerProps={props}
                id={'meterReadingDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - meterReadingDrawer

    // begin dialog - update_meterReading_drawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `update_meterReading_drawer`,
        configuration: {
          id: `update_meterReading_drawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerUpdate_meterReading_drawer
                slidingDrawerProps={props}
                id={'update_meterReading_drawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - update_meterReading_drawer

    // begin dialog - meterReadingLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `meterReadingLookup`,
        configuration: {
          id: `meterReadingLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupMeterReadingLookup {...props} />;
          },
          renderer: props => {
            return <LookupMeterReadingLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - meterReadingLookup

    // begin dialog - rollOverDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `rollOverDialog`,
        configuration: {
          id: `rollOverDialog`,
          dialogRenderer: props => {
            return (
              <DialogRollOverDialog
                id={'rollOverDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - rollOverDialog

    // begin dialog - woConfirmLabTimeOnSchedule
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `woConfirmLabTimeOnSchedule`,
        configuration: {
          id: `woConfirmLabTimeOnSchedule`,
          dialogRenderer: props => {
            return (
              <DialogWoConfirmLabTimeOnSchedule
                id={'woConfirmLabTimeOnSchedule_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - woConfirmLabTimeOnSchedule
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'navigator' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'navigator',
        clearStack: false,
        parent: app,
        route: '/navigator',
        title: app.getLocalizedLabel('navigator_title', 'navigator')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'tasks' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'tasks',
        clearStack: false,
        parent: app,
        route: '/tasks',
        title: app.getLocalizedLabel('tasks_title', 'Tasks')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new TaskController();
      bootstrapInspector.onNewController(controller, 'TaskController', page);
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin dialog - planTaskLongDesc
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `planTaskLongDesc`,
        configuration: {
          id: `planTaskLongDesc`,
          dialogRenderer: props => {
            return (
              <DialogPlanTaskLongDesc
                id={'planTaskLongDesc_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - planTaskLongDesc
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'materials' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'materials',
        clearStack: true,
        parent: app,
        route: '/materials',
        title: app.getLocalizedLabel('materials_title', 'Materials & Tools')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          selectedDS: 'todaywoassignedDS',
          hideMaterial: false,
          hideTool: false,
          hideToolMaterial: true
        },
        'page'
      ),
      {}
    );

    {
      let controller = new MaterialsPageController();
      bootstrapInspector.onNewController(
        controller,
        'MaterialsPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - jtoolsds
    {
      let options = {
        name: `jtoolsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `wptool`,
        schema: `schema`,
        schemaExt: [
          {
            name: `itemnum`,
            id: `dgy62`
          },
          {
            name: `description`,
            id: `y2wmq`
          },
          {
            name: `itemqty`,
            id: `e8xk5`
          },
          {
            name: `location`,
            id: `qz7dd`
          },
          {
            name: `locationDesc`,
            id: `qzdwy`
          },
          {
            name: `wonumDesc`,
            id: `z8_nm`
          },
          {
            name: `locHours`,
            id: `vpgxp`
          },
          {
            name: `itemnumDesc`,
            id: `n9r2v`
          },
          {
            name: `wpitemid`,
            id: `grz5a`
          }
        ],
        sortAttributes: [],
        idAttribute: `wpitemid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `itemnum,description,itemqty,location,locationDesc,wonumDesc,locHours,itemnumDesc,wpitemid`,
          src: []
        },
        autoSave: true,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - jtoolsds

    // begin datasource - jmaterialsds
    {
      let options = {
        name: `jmaterialsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `wpmaterial`,
        schema: `schema`,
        schemaExt: [
          {
            name: `itemnum`,
            id: `aaj7a`
          },
          {
            name: `description`,
            id: `r7znb`
          },
          {
            name: `itemqty`,
            id: `a6v9p`
          },
          {
            name: `locationDesc`,
            id: `a4mwg`
          },
          {
            name: `location`,
            id: `r93xk`
          },
          {
            name: `wonumDesc`,
            id: `vrn6k`
          },
          {
            name: `itemnumDesc`,
            id: `wjp2j`
          },
          {
            name: `wpitemid`,
            id: `my7w6`
          }
        ],
        sortAttributes: [],
        idAttribute: `wpitemid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `itemnum,description,itemqty,locationDesc,location,wonumDesc,itemnumDesc,wpitemid`,
          src: []
        },
        autoSave: true,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - jmaterialsds
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'workOrderDetails' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'workOrderDetails',
        clearStack: false,
        parent: app,
        route: '/workOrderDetails',
        title: app.getLocalizedLabel('workOrderDetails_title', 'Work order')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          sliding_drawer_cgvc: true,
          assetMeterData: null,
          locationMeterData: null,
          assetMeterHeader: '',
          locationMeterHeader: '',
          assetLocation: true
        },
        'page'
      ),
      {}
    );

    {
      let controller = new WorkOrderDetailsController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderDetailsController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - woDetailResource
    {
      let options = {
        platform: `maximoMobile`,
        name: `woDetailResource`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        default: `true`,
        debounceTime: 400,
        query: {
          pageSize: 20,
          cacheExpiryMs: 1,
          objectStructure: `mxapiwodetail`,
          where: `wonum="${page.params.wonum}" and siteid="${page.params.siteid}"`,
          default: true,
          itemUrl: page.params.href,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `autolocate,workorderid,wonum,title,description,description_longdescription,problemcode,failurecode,status,status_description,statusdate,date,duration,type,number,assetlocpriority,wopriority,allowedstates,assetnum,location.description--locationdesc,location.location--locationnum,worktype,parent,pmnum,estdur,workorderid,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.saddresscode,serviceaddress.latitudey,serviceaddress.longitudex,schedstart,schedfinish,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},wpmaterial{wpitemid},wptool{wpitemid},computedDisableButton,reportdate,reportedby.displayname,reportedby.primaryphone,siteid,asset.description--assetdesc,asset.assetnum--assetnumber,asset.assettype--assettype,asset.manufacturer--company,asset.isrunning--assetisrunning,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,computedDisableMeter,computedWorkType,computedWOTimerStatus,hideWOStartButton,doclinks._dbcount--doclinkscount,maxvar.starttimerinprg,maxvar.confirmlabtrans,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href},wostatus.memo--wostatusmemo,computedWODtlStatusPriority,computedWorkTypeButton,relatedrecord._dbcount--relatedrecordcount,owner,actstart,targstartdate,failure.description--failuredesc,classstructure.classificationid--classificationid,jobplan.jpnum--jpnum,jobplan.description--jpdesc,maxvar.coordinate,orgid,woclass,rel.moddowntimehist{*},maxvar.downprompt,onbehalfof,assetuid,istask,wogroup`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `autolocate`,
            id: `yn258`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `p6d4b`
          },
          {
            name: `wonum`,
            id: `q9qmr`
          },
          {
            name: `title`,
            id: `gmp_2`
          },
          {
            name: `description`,
            id: `kq9yq`
          },
          {
            name: `description_longdescription`,
            id: `m75qa`
          },
          {
            name: `problemcode`,
            id: `kn86y`
          },
          {
            name: `failurecode`,
            id: `ka5d_`
          },
          {
            name: `status`,
            id: `g35x5`
          },
          {
            name: `status_description`,
            id: `a33d_`
          },
          {
            name: `statusdate`,
            id: `gjnk4`
          },
          {
            name: `date`,
            id: `b4226`
          },
          {
            name: `duration`,
            id: `awq9y`
          },
          {
            name: `type`,
            id: `rk8_4`
          },
          {
            name: `number`,
            id: `k69_8`
          },
          {
            name: `assetlocpriority`,
            id: `p657z`
          },
          {
            name: `wopriority`,
            id: `ze_za`
          },
          {
            name: `allowedstates`,
            id: `azrd5`
          },
          {
            name: `assetnum`,
            id: `xzaqk`
          },
          {
            name: `location.description--locationdesc`,
            id: `bbj92`
          },
          {
            name: `location.location--locationnum`,
            id: `wak89`
          },
          {
            name: `worktype`,
            id: `p_e6n`
          },
          {
            name: `parent`,
            id: `d5gyx`
          },
          {
            name: `pmnum`,
            id: `va25a`
          },
          {
            name: `estdur`,
            id: `wvee9`
          },
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `p5dwp`
          },
          {
            name: `serviceaddress.streetaddress`,
            id: `rbenx`
          },
          {
            name: `serviceaddress.addressline2`,
            id: `nrdbd`
          },
          {
            name: `serviceaddress.addressline3`,
            id: `jk4rb`
          },
          {
            name: `serviceaddress.city`,
            id: `wgkwq`
          },
          {
            name: `serviceaddress.regiondistrict`,
            id: `dppqa`
          },
          {
            name: `serviceaddress.stateprovince`,
            id: `vm724`
          },
          {
            name: `serviceaddress.postalcode`,
            id: `z9266`
          },
          {
            name: `serviceaddress.country`,
            id: `jp23y`
          },
          {
            name: `serviceaddress.formattedaddress--formattedaddress`,
            id: `qrpjw`
          },
          {
            name: `serviceaddress.saddresscode`,
            id: `qdqkk`
          },
          {
            name: `serviceaddress.latitudey`,
            id: `je2n4`
          },
          {
            name: `serviceaddress.longitudex`,
            id: `jwr58`
          },
          {
            name: `schedstart`,
            id: `g8bj5`
          },
          {
            name: `schedfinish`,
            id: `ybp_9`
          },
          {
            name: `labtrans`,
            id: `r3g6x`
          },
          {
            name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
            id: `a2j3r`
          },
          {
            name: `wpmaterial{wpitemid}`,
            id: `b7q9j`
          },
          {
            name: `wptool{wpitemid}`,
            id: `y4ydy`
          },
          {
            name: `computedDisableButton`,
            'computed-function': `computedDisableButton`,
            id: `a5ame`,
            computed: `true`
          },
          {
            name: `reportdate`,
            id: `xavzp`
          },
          {
            name: `reportedby.displayname`,
            id: `j4nm5`
          },
          {
            name: `reportedby.primaryphone`,
            id: `g3xxa`
          },
          {
            name: `siteid`,
            id: `qvk79`
          },
          {
            name: `asset.description--assetdesc`,
            id: `p2r49`
          },
          {
            name: `asset.assetnum--assetnumber`,
            id: `jvmw9`
          },
          {
            name: `asset.assettype--assettype`,
            id: `v6yaw`
          },
          {
            name: `asset.manufacturer--company`,
            id: `rvwvm`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `r3xq5`
          },
          {
            name: `activeassetmeter._dbcount--assetmetercount`,
            id: `xj6vv`
          },
          {
            name: `activelocationmeter._dbcount--locationmetercount`,
            id: `e5w95`
          },
          {
            name: `computedDisableMeter`,
            'computed-function': `computedDisableMeter`,
            id: `an4mg`,
            computed: `true`
          },
          {
            name: `computedWorkType`,
            'computed-function': `computedWorkType`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('mabr__title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'mabr__remarks',
              'Groups worktype with wonum.'
            ),
            id: `mabr_`,
            computed: `true`
          },
          {
            name: `computedWOTimerStatus`,
            'computed-function': `computedWOTimerStatus`,
            id: `yrbxw`,
            computed: `true`
          },
          {
            name: `hideWOStartButton`,
            id: `wmwy7`
          },
          {
            name: `doclinks._dbcount--doclinkscount`,
            id: `eb8_v`
          },
          {
            name: `maxvar.starttimerinprg`,
            id: `en2mb`
          },
          {
            name: `maxvar.confirmlabtrans`,
            id: `rv5pg`
          },
          {
            name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href}`,
            id: `vap4b`
          },
          {
            name: `wostatus.memo--wostatusmemo`,
            id: `dxxe4`
          },
          {
            name: `computedWODtlStatusPriority`,
            'computed-function': `computedWODtlStatusPriority`,
            id: `bzb4d`,
            computed: `true`
          },
          {
            name: `computedWorkTypeButton`,
            'computed-function': `computedWorkTypeButton`,
            id: `dzvj5`,
            computed: `true`
          },
          {
            name: `relatedrecord._dbcount--relatedrecordcount`,
            id: `v97jw`
          },
          {
            name: `owner`,
            id: `n7n29`
          },
          {
            name: `actstart`,
            id: `epykq`
          },
          {
            name: `targstartdate`,
            id: `xd2pe`
          },
          {
            name: `failure.description--failuredesc`,
            id: `p9k93`
          },
          {
            name: `classstructure.classificationid--classificationid`,
            id: `gd48g`
          },
          {
            name: `jobplan.jpnum--jpnum`,
            id: `nz525`
          },
          {
            name: `jobplan.description--jpdesc`,
            id: `wpbvm`
          },
          {
            name: `maxvar.coordinate`,
            id: `x8x84`
          },
          {
            name: `orgid`,
            id: `ma383`
          },
          {
            name: `woclass`,
            id: `wg2mn`
          },
          {
            name: `rel.moddowntimehist{*}`,
            id: `wrbxe`
          },
          {
            name: `maxvar.downprompt`,
            id: `bw2k4`
          },
          {
            name: `onbehalfof`,
            id: `v752d`
          },
          {
            name: `assetuid`,
            id: `dpz5q`
          },
          {
            name: `istask`,
            id: `y27jd`
          },
          {
            name: `wogroup`,
            id: `ek3yq`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedDisableButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableButton', item)
          },
          computedDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedDisableMeter', item)
          },
          computedWorkType: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkType', item)
          },
          computedWOTimerStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWOTimerStatus', item)
          },
          computedWODtlStatusPriority: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWODtlStatusPriority', item)
          },
          computedWorkTypeButton: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedWorkTypeButton', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `where`,
            lastValue: `wonum="${page.params.wonum}" and siteid="${page.params.siteid}"`,
            check: () => {
              return `wonum="${page.params.wonum}" and siteid="${page.params.siteid}"`;
            }
          },
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new WorkOrderDataController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woDetailResource

    // begin datasource - woDetailsWorklogDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `woDetailsWorklogDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `woworklog`,
          objectName: `worklog`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          cacheExpiryMs: 1,
          select: `createdate,description,description_longdescription,person.displayname--createby,logtype,anywhererefid`,
          dependsOn: `woDetailResource`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `anywhererefid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `createdate`,
            id: `n9_y9`
          },
          {
            name: `description`,
            id: `pb2gg`
          },
          {
            name: `description_longdescription`,
            id: `qjb5w`
          },
          {
            name: `person.displayname--createby`,
            id: `e3np9`
          },
          {
            name: `logtype`,
            id: `d7amj`
          },
          {
            name: `anywhererefid`,
            'unique-id': `true`,
            id: `xge76`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woDetailsWorklogDs
    // begin datasource - woAssetLocationds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woAssetLocationds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `asset`,
          dependsOn: `woDetailResource`,
          cacheExpiryMs: 1,
          select: `assetnum,description,isrunning,_imagelibref,rel.wobyasset{wonum,description,status,statusdate,worktype}`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `assetnum`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `assetnum`,
            'unique-id': `true`,
            id: `jxzdm`
          },
          {
            name: `description`,
            id: `pbpbp`
          },
          {
            name: `isrunning`,
            id: `b8ne6`
          },
          {
            name: `_imagelibref`,
            id: `jr54e`
          },
          {
            name: `rel.wobyasset{wonum,description,status,statusdate,worktype}`,
            id: `w74bm`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woAssetLocationds

    // begin datasource - woLocationds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woLocationds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `wo_location`,
          dependsOn: `woDetailResource`,
          cacheExpiryMs: 1,
          select: `location,description,rel.wobylocation{wonum,description,status,statusdate,worktype}`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `location`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `location`,
            'unique-id': `true`,
            id: `zp6n8`
          },
          {
            name: `description`,
            id: `exe4v`
          },
          {
            name: `rel.wobylocation{wonum,description,status,statusdate,worktype}`,
            id: `n7d8n`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woLocationds

    // begin datasource - woDetailsMaterialds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woDetailsMaterialds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `showplanmaterial`,
          dependsOn: `woDetailResource`,
          selectionMode: `none`,
          cacheExpiryMs: 1,
          select: `description,itemnum,itemqty,computedItemNum,location.description--locationdesc,wpitemid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `itemnum`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            id: `d33xn`
          },
          {
            name: `itemnum`,
            'unique-id': `true`,
            id: `dvyae`
          },
          {
            name: `itemqty`,
            id: `vqj4k`
          },
          {
            name: `computedItemNum`,
            'computed-function': `computedItemNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('k3gvx_title', 'Item'),
            remarks: app.getLocalizedLabel(
              'k3gvx_remarks',
              'Identifies the item.'
            ),
            id: `k3gvx`,
            computed: `true`
          },
          {
            name: `location.description--locationdesc`,
            id: `x2gpr`
          },
          {
            name: `wpitemid`,
            id: `p3mr8`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {
          computedItemNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedItemNum', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new WorkOrderDataController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woDetailsMaterialds

    // begin datasource - woDetailsToolds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woDetailsToolds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `showplantool`,
          dependsOn: `woDetailResource`,
          selectionMode: `none`,
          cacheExpiryMs: 1,
          select: `itemnum,description,storelocsite,location.location--locationnum,location.description--locationdesc,itemqty,wpitemid,hours,computedItemNum`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `itemnum`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            'unique-id': `true`,
            id: `pdjgp`
          },
          {
            name: `description`,
            id: `n4b6q`
          },
          {
            name: `storelocsite`,
            id: `z6nbk`
          },
          {
            name: `location.location--locationnum`,
            id: `jke74`
          },
          {
            name: `location.description--locationdesc`,
            id: `eqgj6`
          },
          {
            name: `itemqty`,
            id: `jx6db`
          },
          {
            name: `wpitemid`,
            id: `z9mmx`
          },
          {
            name: `hours`,
            id: `p7w32`
          },
          {
            name: `computedItemNum`,
            'computed-function': `computedItemNum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('jb3p5_title', 'Tool'),
            remarks: app.getLocalizedLabel(
              'jb3p5_remarks',
              'Identifies the tool.'
            ),
            id: `jb3p5`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {
          computedItemNum: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedItemNum', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new WorkOrderDataController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woDetailsToolds

    // begin datasource - woLaborDetailds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woLaborDetailds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `labtransid`,
          relationship: `uxshowactuallabor`,
          dependsOn: `woDetailResource`,
          cacheExpiryMs: 1,
          select: `startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `labtransid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `startdate`,
            id: `r8d2a`
          },
          {
            name: `starttime`,
            id: `jgzbq`
          },
          {
            name: `startdatetime`,
            id: `x4b7z`
          },
          {
            name: `finishdate`,
            id: `z9rnn`
          },
          {
            name: `finishtime`,
            id: `bdrb7`
          },
          {
            name: `finishdatetime`,
            id: `g6n39`
          },
          {
            name: `regularhrs`,
            id: `kz9nd`
          },
          {
            name: `transtype`,
            id: `nrvpx`
          },
          {
            name: `labtransid`,
            'unique-id': `true`,
            id: `ra5k7`
          },
          {
            name: `timerstatus`,
            id: `pr996`
          },
          {
            name: `laborcode`,
            id: `j8bkv`
          },
          {
            name: `anywhererefid`,
            id: `bxyxv`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woLaborDetailds

    // begin datasource - woServiceAddress
    {
      let options = {
        platform: `maximoMobile`,
        name: `woServiceAddress`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `woserviceaddressid`,
          relationship: `serviceaddress`,
          dependsOn: `woDetailResource`,
          cacheExpiryMs: 1,
          select: `woserviceaddressid,latitudey,longitudex`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `woserviceaddressid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `woserviceaddressid`,
            'unique-id': `true`,
            id: `q_p8z`
          },
          {
            name: `latitudey`,
            id: `awem6`
          },
          {
            name: `longitudex`,
            id: `y_67d`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woServiceAddress

    // begin datasource - woMultiAssetLocationds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woMultiAssetLocationds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `multiid`,
          relationship: `multiassetlocci`,
          orderBy: `sequence`,
          selectionMode: `none`,
          dependsOn: `woDetailResource`,
          searchAttributes: [`assetnum`],
          indexAttributes: [`assetnum`],
          select: `multiid,assetnum,asset.description--assetdescription,location,location.location--location,location.description--locationdesc,progress,siteid,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href},computedAssetLoc,activeassetmeter._dbcount--multiassetmetercount,activelocationmeter._dbcount--multilocationmetercount,computedMultiDisableMeter,rel.activeassetmeter.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid},rel.activelocationmeter.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,locations,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid},rel.asset.mxapiasset{assetnum,description}`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `multiid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `multiid`,
            'unique-id': `true`,
            id: `jbg87`
          },
          {
            name: `assetnum`,
            searchable: `true`,
            id: `ezwjb`
          },
          {
            name: `asset.description--assetdescription`,
            id: `r39aj`
          },
          {
            name: `location`,
            id: `xmwzn`
          },
          {
            name: `location.location--location`,
            id: `q8zrk`
          },
          {
            name: `location.description--locationdesc`,
            id: `vnkq_`
          },
          {
            name: `progress`,
            id: `m45__`
          },
          {
            name: `siteid`,
            id: `z888b`
          },
          {
            name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href}`,
            id: `gn5jr`
          },
          {
            name: `computedAssetLoc`,
            'computed-function': `computedAssetLoc`,
            id: `nvxx3`,
            computed: `true`
          },
          {
            name: `activeassetmeter._dbcount--multiassetmetercount`,
            id: `eg6j3`
          },
          {
            name: `activelocationmeter._dbcount--multilocationmetercount`,
            id: `jymwp`
          },
          {
            name: `computedMultiDisableMeter`,
            'computed-function': `computedMultiDisableMeter`,
            id: `v6nmj`,
            computed: `true`
          },
          {
            name: `rel.activeassetmeter.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid}`,
            id: `ba4n9`
          },
          {
            name: `rel.activelocationmeter.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,locations,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid}`,
            id: `gny9k`
          },
          {
            name: `rel.asset.mxapiasset{assetnum,description}`,
            id: `ewd28`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {
          computedAssetLoc: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedAssetLoc', item)
          },
          computedMultiDisableMeter: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedMultiDisableMeter', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new WorkOrderDataController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woMultiAssetLocationds

    // begin datasource - mrDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `mrDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `mr`,
          dependsOn: `woDetailResource`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          idAttribute: `mrnum`,
          searchAttributes: [`requireddate`, `description`, `status`],
          indexAttributes: [`requireddate`, `description`, `status`],
          select: `mrnum,requireddate,description,status,status_description,anywhererefid,mrid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `mrnum`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `mrnum`,
            'unique-id': `true`,
            id: `ee6na`
          },
          {
            name: `requireddate`,
            searchable: `true`,
            id: `qn456`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `kvdxe`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `em4xy`
          },
          {
            name: `status_description`,
            id: `yankw`
          },
          {
            name: `anywhererefid`,
            id: `jy8r6`
          },
          {
            name: `mrid`,
            id: `eq97v`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - mrDS

    // begin datasource - multidsnewreading
    {
      let options = {
        platform: `maximoMobile`,
        name: `multidsnewreading`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 100,
        debounceTime: 400,
        query: {
          pageSize: 100,
          selectionMode: `single`,
          objectStructure: `mxapialndomain`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`domainid`],
          indexAttributes: [`domainid`],
          select: `value,valueid,description,domainid,siteid,orgid`
        },
        objectStructure: `mxapialndomain`,
        idAttribute: `value`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `value`,
            'unique-id': `true`,
            id: `p8gpm`
          },
          {
            name: `valueid`,
            id: `a2qb9`
          },
          {
            name: `description`,
            id: `jb2pr`
          },
          {
            name: `domainid`,
            searchable: `true`,
            id: `b2v64`
          },
          {
            name: `siteid`,
            id: `ybpaq`
          },
          {
            name: `orgid`,
            id: `dzq4q`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - multidsnewreading

    // begin datasource - downTimeReportAsset
    {
      let options = {
        name: `downTimeReportAsset`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `downTimeItems`,
        schemaExt: [
          {
            name: `statuschangedate`,
            id: `axp27`
          }
        ],
        sortAttributes: [],
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `statuschangedate`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - downTimeReportAsset

    // begin datasource - downTimeCodeLookupDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `downTimeCodeLookupDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 100,
        debounceTime: 400,
        query: {
          pageSize: 100,
          selectionMode: `single`,
          objectStructure: `mxapialndomain`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`domainid`],
          indexAttributes: [`domainid`],
          select: `value,valueid,description,domainid,siteid,orgid`
        },
        objectStructure: `mxapialndomain`,
        idAttribute: `value`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `value`,
            'unique-id': `true`,
            id: `rdby4`
          },
          {
            name: `valueid`,
            id: `ygwbb`
          },
          {
            name: `description`,
            id: `j3y39`
          },
          {
            name: `domainid`,
            searchable: `true`,
            id: `z_wbg`
          },
          {
            name: `siteid`,
            id: `dkqvb`
          },
          {
            name: `orgid`,
            id: `kjrpa`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - downTimeCodeLookupDs

    // begin dialog - woDetailsDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `woDetailsDialog`,
        configuration: {
          id: `woDetailsDialog`,
          dialogRenderer: props => {
            return (
              <DialogWoDetailsDialog
                id={'woDetailsDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - woDetailsDialog

    // begin dialog - woConfirmLabTime
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `woConfirmLabTime`,
        configuration: {
          id: `woConfirmLabTime`,
          dialogRenderer: props => {
            return (
              <DialogWoConfirmLabTime
                id={'woConfirmLabTime_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - woConfirmLabTime

    // begin dialog - woWorkLogDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `woWorkLogDrawer`,
        configuration: {
          id: `woWorkLogDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerWoWorkLogDrawer
                slidingDrawerProps={props}
                id={'woWorkLogDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - woWorkLogDrawer

    // begin dialog - slidingwodetailsmaterials
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `slidingwodetailsmaterials`,
        configuration: {
          id: `slidingwodetailsmaterials`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerSlidingwodetailsmaterials
                slidingDrawerProps={props}
                id={'slidingwodetailsmaterials_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - slidingwodetailsmaterials

    // begin dialog - assetMisMatchDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `assetMisMatchDialog`,
        configuration: {
          id: `assetMisMatchDialog`,
          dialogRenderer: props => {
            return (
              <DialogAssetMisMatchDialog
                id={'assetMisMatchDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - assetMisMatchDialog

    // begin dialog - downTimeCodeLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `downTimeCodeLookup`,
        configuration: {
          id: `downTimeCodeLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupDownTimeCodeLookup {...props} />;
          },
          renderer: props => {
            return <LookupDownTimeCodeLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - downTimeCodeLookup

    // begin dialog - assetStatusDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `assetStatusDialog`,
        configuration: {
          id: `assetStatusDialog`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerAssetStatusDialog
                slidingDrawerProps={props}
                id={'assetStatusDialog_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - assetStatusDialog

    // begin dialog - multiMeterReadingDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `multiMeterReadingDrawer`,
        configuration: {
          id: `multiMeterReadingDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerMultiMeterReadingDrawer
                slidingDrawerProps={props}
                id={'multiMeterReadingDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - multiMeterReadingDrawer

    // begin dialog - update_multiMeterReading_drawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `update_multiMeterReading_drawer`,
        configuration: {
          id: `update_multiMeterReading_drawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerUpdate_multiMeterReading_drawer
                slidingDrawerProps={props}
                id={'update_multiMeterReading_drawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - update_multiMeterReading_drawer

    // begin dialog - multiMeterReadingLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `multiMeterReadingLookup`,
        configuration: {
          id: `multiMeterReadingLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupMultiMeterReadingLookup {...props} />;
          },
          renderer: props => {
            return <LookupMultiMeterReadingLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - multiMeterReadingLookup

    // begin dialog - multiMeterrollOverDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `multiMeterrollOverDialog`,
        configuration: {
          id: `multiMeterrollOverDialog`,
          dialogRenderer: props => {
            return (
              <DialogMultiMeterrollOverDialog
                id={'multiMeterrollOverDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - multiMeterrollOverDialog
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'materialRequest' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'materialRequest',
        clearStack: false,
        parent: app,
        route: '/materialRequest',
        title: app.getLocalizedLabel(
          'materialRequest_title',
          'Material request'
        )
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          isItemSelected: false,
          mrPriority: 1,
          useConfirmDialog: false,
          loadingDel: false
        },
        'page'
      ),
      {}
    );

    {
      let controller = new MaterialRequestPageController();
      bootstrapInspector.onNewController(
        controller,
        'MaterialRequestPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - woMaterialRequestResource
    {
      let options = {
        platform: `maximoMobile`,
        name: `woMaterialRequestResource`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          itemUrl: page.params.href,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `wonum,description,workorderid,siteid,orgid`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `wonum`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `wonum`,
            'unique-id': `true`,
            id: `yz4k2`
          },
          {
            name: `description`,
            id: `brk25`
          },
          {
            name: `workorderid`,
            id: `gb5ed`
          },
          {
            name: `siteid`,
            id: `k5ayd`
          },
          {
            name: `orgid`,
            id: `wpxb7`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.href,
            check: () => {
              return page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woMaterialRequestResource

    // begin datasource - mrLineDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `mrLineDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `mr`,
          dependsOn: `woMaterialRequestResource`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          idAttribute: `mrnum`,
          objectName: `mr`,
          searchAttributes: [`mrnum`, `shipto`, `status`],
          indexAttributes: [`mrnum`, `shipto`, `status`],
          select: `mrid,mrnum,shipto,droppoint,priority,requireddate,status,status_description,rel.mrline{itemnum,description,mrlineid,orderunit,storeloc,locations.description--storeloc_desc,qty,manufacturer,vendor},anywhererefid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `mrnum`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `mrid`,
            id: `zqn2x`
          },
          {
            name: `mrnum`,
            'unique-id': `true`,
            searchable: `true`,
            id: `n3g78`
          },
          {
            name: `shipto`,
            searchable: `true`,
            id: `pdb87`
          },
          {
            name: `droppoint`,
            id: `n499w`
          },
          {
            name: `priority`,
            id: `z87gz`
          },
          {
            name: `requireddate`,
            id: `y48w4`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `prwx7`
          },
          {
            name: `status_description`,
            id: `m_5mw`
          },
          {
            name: `rel.mrline{itemnum,description,mrlineid,orderunit,storeloc,locations.description--storeloc_desc,qty,manufacturer,vendor}`,
            id: `nm_k6`
          },
          {
            name: `anywhererefid`,
            id: `r_7gg`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woMaterialRequestResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - mrLineDS

    // begin datasource - mrLineListDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `mrLineListDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `mrline`,
          dependsOn: `woMaterialRequestResource`,
          selectionMode: `none`,
          notifyWhenParentLoads: true,
          searchAttributes: [`mrnum`],
          indexAttributes: [`mrnum`],
          select: `itemnum,description,mrlineid,orderunit,storeloc,qty,manufacturer,vendor,mrnum`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `mrlineid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            id: `d7amb`
          },
          {
            name: `description`,
            id: `pzw5g`
          },
          {
            name: `mrlineid`,
            'unique-id': `true`,
            id: `baep8`
          },
          {
            name: `orderunit`,
            id: `g__ee`
          },
          {
            name: `storeloc`,
            id: `env4p`
          },
          {
            name: `qty`,
            id: `rpd_y`
          },
          {
            name: `manufacturer`,
            id: `wm597`
          },
          {
            name: `vendor`,
            id: `xb7q7`
          },
          {
            name: `mrnum`,
            searchable: `true`,
            id: `jkkxj`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woMaterialRequestResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - mrLineListDS

    // begin datasource - mrLineDsJson
    {
      let options = {
        name: `mrLineDsJson`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `mrLineItems`,
        schemaExt: [
          {
            name: `itemnum`,
            id: `nxmpd`
          },
          {
            name: `description`,
            id: `zyj6b`
          },
          {
            name: `mrlineid`,
            searchable: `true`,
            'unique-id': `true`,
            id: `mpk43`
          },
          {
            name: `orderunit`,
            id: `a266r`
          },
          {
            name: `storeloc`,
            id: `y9m85`
          },
          {
            name: `qty`,
            id: `m8aq_`
          },
          {
            name: `manufacturer`,
            id: `br4m7`
          },
          {
            name: `vendor`,
            id: `r46jn`
          },
          {
            name: `storeloc_desc`,
            id: `mrv2x`
          },
          {
            name: `computedItemDescription`,
            id: `mpyg5`
          }
        ],
        sortAttributes: [],
        idAttribute: `mrlineid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          searchAttributes: [`mrlineid`],
          select: `itemnum,description,mrlineid,orderunit,storeloc,qty,manufacturer,vendor,storeloc_desc,computedItemDescription`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - mrLineDsJson

    // begin datasource - inventoryListDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `inventoryListDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIINVENTORY`,
          savedQuery: `SHOWINVENTORY`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `inventoryid`,
            `siteid`,
            `itemsetid`,
            `itemnum`,
            `location`,
            `issueunit`,
            `orderunit`,
            `status`,
            `siteid`
          ],
          indexAttributes: [
            `inventoryid`,
            `siteid`,
            `itemsetid`,
            `itemnum`,
            `location`,
            `issueunit`,
            `orderunit`,
            `status`,
            `siteid`
          ],
          select: `inventoryid,siteid,itemsetid,itemnum,location,issueunit,orderunit,status,siteid`
        },
        objectStructure: `MXAPIINVENTORY`,
        idAttribute: `inventoryid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `inventoryid`,
            searchable: `true`,
            'unique-id': `true`,
            id: `k832n`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `gvxz9`
          },
          {
            name: `itemsetid`,
            searchable: `true`,
            id: `x5bvm`
          },
          {
            name: `itemnum`,
            searchable: `true`,
            id: `wvvae`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `dbwjr`
          },
          {
            name: `issueunit`,
            searchable: `true`,
            id: `avpqb`
          },
          {
            name: `orderunit`,
            searchable: `true`,
            id: `wyvr4`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `qw82j`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `mreq4`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inventoryListDS

    // begin datasource - itemListDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `itemListDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIITEM`,
          savedQuery: `SHOWITEMS`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `itemnum`, `orderunit`],
          indexAttributes: [
            `description`,
            `itemnum`,
            `itemid`,
            `orderunit`,
            `status`,
            `itemtype`,
            `itemsetid`
          ],
          select: `description,itemnum,itemid,orderunit,status,itemtype,itemsetid,asset.manufacturer,asset.vendor`
        },
        objectStructure: `MXAPIITEM`,
        idAttribute: `itemid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `rk3qj`
          },
          {
            name: `itemnum`,
            searchable: `true`,
            id: `ygem9`
          },
          {
            name: `itemid`,
            index: `true`,
            'unique-id': `true`,
            id: `w_qgd`
          },
          {
            name: `orderunit`,
            searchable: `true`,
            id: `d2mj8`
          },
          {
            name: `status`,
            index: `true`,
            id: `nd334`
          },
          {
            name: `itemtype`,
            index: `true`,
            id: `eeb_k`
          },
          {
            name: `itemsetid`,
            index: `true`,
            id: `wbvax`
          },
          {
            name: `asset.manufacturer`,
            id: `pvyvd`
          },
          {
            name: `asset.vendor`,
            id: `yxnrb`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - itemListDS

    // begin datasource - locationListDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `locationListDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPILOCATIONS`,
          savedQuery: `SHOWLOCATIONS`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `location`, `siteid`, `orgid`],
          indexAttributes: [`description`, `location`, `siteid`, `orgid`],
          select: `description,location,siteid,orgid`
        },
        objectStructure: `MXAPILOCATIONS`,
        idAttribute: `location`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `vm5rp`
          },
          {
            name: `location`,
            searchable: `true`,
            'unique-id': `true`,
            id: `epx6e`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `kqrxb`
          },
          {
            name: `orgid`,
            searchable: `true`,
            id: `drj24`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - locationListDS

    // begin datasource - materialRequestSynonymDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `materialRequestSynonymDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapisynonymdomain`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `maxvalue`,
            `domainid`,
            `valueid`,
            `siteid`,
            `orgid`
          ],
          indexAttributes: [
            `maxvalue`,
            `domainid`,
            `valueid`,
            `siteid`,
            `orgid`
          ],
          select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
        },
        objectStructure: `mxapisynonymdomain`,
        idAttribute: `valueid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `value`,
            id: `rkk94`
          },
          {
            name: `maxvalue`,
            searchable: `true`,
            id: `y4v_r`
          },
          {
            name: `description`,
            id: `b33jd`
          },
          {
            name: `domainid`,
            searchable: `true`,
            id: `wb98b`
          },
          {
            name: `valueid`,
            'unique-id': `true`,
            searchable: `true`,
            id: `pd_k6`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `em593`
          },
          {
            name: `orgid`,
            searchable: `true`,
            id: `dy4me`
          },
          {
            name: `defaults`,
            id: `an4g9`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - materialRequestSynonymDS

    // begin dialog - itemsListLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `itemsListLookup`,
        configuration: {
          id: `itemsListLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupItemsListLookup {...props} />;
          },
          renderer: props => {
            return <LookupItemsListLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - itemsListLookup

    // begin dialog - storeRoomListLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `storeRoomListLookup`,
        configuration: {
          id: `storeRoomListLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupStoreRoomListLookup {...props} />;
          },
          renderer: props => {
            return <LookupStoreRoomListLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - storeRoomListLookup

    // begin dialog - AddItemDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `AddItemDrawer`,
        configuration: {
          id: `AddItemDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerAddItemDrawer
                slidingDrawerProps={props}
                id={'AddItemDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - AddItemDrawer
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'report_work' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'report_work',
        clearStack: false,
        parent: app,
        route: '/report_work',
        title: app.getLocalizedLabel('report_work_title', 'Report work')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState({groupedByLabor: true}, 'page'),
      {}
    );

    {
      let controller = new ReportWorkPageController();
      bootstrapInspector.onNewController(
        controller,
        'ReportWorkPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - woDetailsReportWork
    {
      let options = {
        platform: `maximoMobile`,
        name: `woDetailsReportWork`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        default: `true`,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          default: true,
          itemUrl: page.params.itemhref
            ? page.params.itemhref
            : page.params.href,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`asset.assetnum`],
          indexAttributes: [`asset.assetnum--assetnumber`],
          select: `workorderid,wonum,location--locationnum,problemcode,failurecode,faildate,failure.description,problem.description,failure.failurelist.failurelist,problem.failurelist.failurelist,problem.failurelist.failurecode,failurereport{type,linenum,failurecode.failurecode,failurecode.description},siteid,orgid,maxvar.labtranstolerance,status,allowedstates,remarkdesc,failureclassdelete,problemdelete,causedelete,remedydelete,maxvar.downprompt,asset.assetnum--assetnumber,asset.isrunning--assetisrunning,istask`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `rnxdv`
          },
          {
            name: `wonum`,
            id: `qbbd8`
          },
          {
            name: `location--locationnum`,
            id: `x2aqe`
          },
          {
            name: `problemcode`,
            id: `gpk5a`
          },
          {
            name: `failurecode`,
            id: `er5rq`
          },
          {
            name: `faildate`,
            id: `a536d`
          },
          {
            name: `failure.description`,
            id: `qav2r`
          },
          {
            name: `problem.description`,
            id: `ax797`
          },
          {
            name: `failure.failurelist.failurelist`,
            id: `mjjjw`
          },
          {
            name: `problem.failurelist.failurelist`,
            id: `wdm7g`
          },
          {
            name: `problem.failurelist.failurecode`,
            id: `d42gz`
          },
          {
            name: `failurereport{type,linenum,failurecode.failurecode,failurecode.description}`,
            id: `pb64d`
          },
          {
            name: `siteid`,
            id: `ab9v6`
          },
          {
            name: `orgid`,
            id: `dggp2`
          },
          {
            name: `maxvar.labtranstolerance`,
            id: `mjyt`
          },
          {
            name: `status`,
            id: `djzv_`
          },
          {
            name: `allowedstates`,
            id: `xyd34`
          },
          {
            name: `remarkdesc`,
            id: `m79p2`
          },
          {
            name: `failureclassdelete`,
            type: `BOOL`,
            'default-value': `false`,
            id: `j9mpp`
          },
          {
            name: `problemdelete`,
            type: `BOOL`,
            'default-value': `false`,
            id: `e8467`
          },
          {
            name: `causedelete`,
            type: `BOOL`,
            'default-value': `false`,
            id: `dqy4n`
          },
          {
            name: `remedydelete`,
            type: `BOOL`,
            'default-value': `false`,
            id: `m6r_j`
          },
          {
            name: `maxvar.downprompt`,
            id: `xapy7`
          },
          {
            name: `asset.assetnum--assetnumber`,
            searchable: `true`,
            id: `z5jbx`
          },
          {
            name: `asset.isrunning--assetisrunning`,
            id: `j95dm`
          },
          {
            name: `istask`,
            id: `dknkg`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.itemhref
              ? page.params.itemhref
              : page.params.href,
            check: () => {
              return page.params.itemhref
                ? page.params.itemhref
                : page.params.href;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ReportWorkDataController();
      bootstrapInspector.onNewController(
        controller,
        'ReportWorkDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woDetailsReportWork

    // begin datasource - reportWorkActualMaterialDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `reportWorkActualMaterialDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `matusetransid`,
          objectName: `matusetrans`,
          relationship: `uxshowactualmaterial`,
          dependsOn: `woDetailsReportWork`,
          selectionMode: `none`,
          select: `matusetransid,siteid,itemnum,description,storeloc,locations.description--locdesc,positivequantity,issuetype,computedItem,anywhererefid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `matusetransid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `matusetransid`,
            'unique-id': `true`,
            id: `a386_`
          },
          {
            name: `siteid`,
            id: `n94v8`
          },
          {
            name: `itemnum`,
            id: `egk5z`
          },
          {
            name: `description`,
            id: `e437y`
          },
          {
            name: `storeloc`,
            id: `bgdw2`
          },
          {
            name: `locations.description--locdesc`,
            id: `e9gnj`
          },
          {
            name: `positivequantity`,
            id: `apwjz`
          },
          {
            name: `issuetype`,
            id: `yqnxz`
          },
          {
            name: `computedItem`,
            'computed-function': `computedItem`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `ygy3j`,
            computed: `true`
          },
          {
            name: `anywhererefid`,
            id: `rz9vj`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailsReportWork`,
        computedFields: {
          computedItem: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedItem', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ReportWorkDataController();
      bootstrapInspector.onNewController(
        controller,
        'ReportWorkDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - reportWorkActualMaterialDs

    // begin datasource - reportWorkActualToolsDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `reportWorkActualToolsDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `tooltransid`,
          objectName: `tooltrans`,
          relationship: `uxshowactualtool`,
          dependsOn: `woDetailsReportWork`,
          selectionMode: `none`,
          select: `tooltransid,siteid,itemnum,toolitem.description,toolqty,toolhrs,computedToolItem,anywhererefid`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `tooltransid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `tooltransid`,
            'unique-id': `true`,
            id: `rnjnz`
          },
          {
            name: `siteid`,
            id: `b_9dm`
          },
          {
            name: `itemnum`,
            id: `b338p`
          },
          {
            name: `toolitem.description`,
            id: `ygwk3`
          },
          {
            name: `toolqty`,
            id: `v6pk_`
          },
          {
            name: `toolhrs`,
            id: `byz23`
          },
          {
            name: `computedToolItem`,
            'computed-function': `computedToolItem`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `w4_vy`,
            computed: `true`
          },
          {
            name: `anywhererefid`,
            id: `r6b63`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailsReportWork`,
        computedFields: {
          computedToolItem: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedToolItem', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ReportWorkDataController();
      bootstrapInspector.onNewController(
        controller,
        'ReportWorkDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - reportWorkActualToolsDs

    // begin datasource - reportworkLabords
    {
      let options = {
        platform: `maximoMobile`,
        name: `reportworkLabords`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `uxshowactuallabor`,
          dependsOn: `woDetailsReportWork`,
          selectionMode: `none`,
          searchAttributes: [`laborcode`],
          indexAttributes: [`laborcode`],
          select: `labtransid,startdate,starttime,finishdate,finishtime,regularhrs,transtype,laborcode,anywhererefid,timerstatus,person.displayname--displayname`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `labtransid`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `labtransid`,
            'unique-id': `true`,
            id: `wbm6w`
          },
          {
            name: `startdate`,
            id: `xxv7j`
          },
          {
            name: `starttime`,
            id: `rzqjk`
          },
          {
            name: `finishdate`,
            id: `e_eda`
          },
          {
            name: `finishtime`,
            id: `zvj85`
          },
          {
            name: `regularhrs`,
            id: `ya8be`
          },
          {
            name: `transtype`,
            id: `jagk6`
          },
          {
            name: `laborcode`,
            searchable: `true`,
            id: `mzdmb`
          },
          {
            name: `anywhererefid`,
            id: `zp6mq`
          },
          {
            name: `timerstatus`,
            id: `q8bjx`
          },
          {
            name: `person.displayname--displayname`,
            id: `g96na`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailsReportWork`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );
      let controller = new ReportWorkDataController();
      bootstrapInspector.onNewController(
        controller,
        'ReportWorkDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - reportworkLabords

    // begin datasource - reportworkLaborDetailds
    {
      let options = {
        platform: `maximoMobile`,
        name: `reportworkLaborDetailds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          idAttribute: `labtransid`,
          objectName: `labtrans`,
          relationship: `uxshowactuallabor`,
          dependsOn: `woDetailsReportWork`,
          searchAttributes: [`labtransid`],
          indexAttributes: [`labtransid`],
          select: `startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,craft,craft.description--craftdescription,craft.craft--craftid,skilllevel,rel.craftskill{skilllevel,description--skillleveldesc},anywhererefid,payrate,timerstatus,person.displayname--displayname,laborcode,taskid,actualtaskid,tasklabor.description--task_description`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `labtransid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `startdate`,
            id: `drgkz`
          },
          {
            name: `starttime`,
            id: `d6bge`
          },
          {
            name: `startdatetime`,
            id: `g_baa`
          },
          {
            name: `finishdate`,
            id: `m2ag8`
          },
          {
            name: `finishtime`,
            id: `enznd`
          },
          {
            name: `finishdatetime`,
            id: `jjpwp`
          },
          {
            name: `regularhrs`,
            id: `rwmdr`
          },
          {
            name: `transtype`,
            id: `r49zx`
          },
          {
            name: `labtransid`,
            'unique-id': `true`,
            searchable: `true`,
            id: `egwkn`
          },
          {
            name: `craft`,
            id: `nwdex`
          },
          {
            name: `craft.description--craftdescription`,
            id: `wqa8m`
          },
          {
            name: `craft.craft--craftid`,
            id: `w66a5`
          },
          {
            name: `skilllevel`,
            id: `md2jm`
          },
          {
            name: `rel.craftskill{skilllevel,description--skillleveldesc}`,
            id: `y8yba`
          },
          {
            name: `anywhererefid`,
            id: `wpkvn`
          },
          {
            name: `payrate`,
            id: `v_gxm`
          },
          {
            name: `timerstatus`,
            id: `mka59`
          },
          {
            name: `person.displayname--displayname`,
            id: `aqaqj`
          },
          {
            name: `laborcode`,
            id: `dr9pv`
          },
          {
            name: `taskid`,
            id: `x9d5w`
          },
          {
            name: `actualtaskid`,
            id: `rxg7m`
          },
          {
            name: `tasklabor.description--task_description`,
            id: `zmzn5`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailsReportWork`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - reportworkLaborDetailds

    // begin datasource - woTaskds
    {
      let options = {
        platform: `maximoMobile`,
        name: `woTaskds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `wo_tasks`,
          idAttribute: `taskid`,
          domainInternalWhere: `status=INPRG,WMATL,APPR,WSCH,WPCOND,COMP`,
          selectionMode: `single`,
          dependsOn: `woDetailsReportWork`,
          searchAttributes: [`taskid`, `description`],
          indexAttributes: [`taskid`, `description`],
          select: `taskid,description`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `taskid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `taskid`,
            searchable: `true`,
            'unique-id': `true`,
            id: `g2v6x`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `ep2d9`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailsReportWork`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woTaskds

    // begin datasource - synonymDSData
    {
      let options = {
        platform: `maximoMobile`,
        name: `synonymDSData`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapisynonymdomain`,
          where: `domainid="ISSUETYP" and maxvalue in ["ISSUE","RETURN"]`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `maxvalue`,
            `domainid`,
            `valueid`,
            `siteid`,
            `orgid`
          ],
          indexAttributes: [
            `maxvalue`,
            `domainid`,
            `valueid`,
            `siteid`,
            `orgid`
          ],
          select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
        },
        objectStructure: `mxapisynonymdomain`,
        idAttribute: `valueid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `value`,
            id: `yv9wg`
          },
          {
            name: `maxvalue`,
            searchable: `true`,
            id: `xv_xe`
          },
          {
            name: `description`,
            id: `m79d9`
          },
          {
            name: `domainid`,
            searchable: `true`,
            id: `wq2dz`
          },
          {
            name: `valueid`,
            'unique-id': `true`,
            searchable: `true`,
            id: `dg_3v`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `m9832`
          },
          {
            name: `orgid`,
            searchable: `true`,
            id: `x2pk4`
          },
          {
            name: `defaults`,
            id: `eze2r`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - synonymDSData

    // begin datasource - inventoryDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `inventoryDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIINVENTORY`,
          savedQuery: `SHOWINVENTORY`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`itemnum`, `location`, `status`, `siteid`],
          indexAttributes: [`itemnum`, `location`, `status`, `siteid`],
          select: `itemnum,location,status,siteid`
        },
        objectStructure: `MXAPIINVENTORY`,
        idAttribute: `itemnum`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            searchable: `true`,
            'unique-id': `true`,
            id: `y6de_`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `ww9n7`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `da37m`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `jrppa`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inventoryDS

    // begin datasource - itemsDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `itemsDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIITEM`,
          savedQuery: `SHOWITEMS`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `itemnum`, `itemid`, `itemsetid`],
          indexAttributes: [`description`, `itemnum`, `itemid`, `itemsetid`],
          select: `description,itemnum,itemid,itemsetid`
        },
        objectStructure: `MXAPIITEM`,
        idAttribute: `itemid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `x3epr`
          },
          {
            name: `itemnum`,
            searchable: `true`,
            id: `wmyjj`
          },
          {
            name: `itemid`,
            searchable: `true`,
            'unique-id': `true`,
            id: `xa5w3`
          },
          {
            name: `itemsetid`,
            searchable: `true`,
            id: `rgp7b`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - itemsDS

    // begin datasource - toolDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `toolDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPITOOLITEM`,
          savedQuery: `USERTOOLLIST`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `itemnum`, `itemid`],
          indexAttributes: [`description`, `itemnum`, `itemid`],
          select: `description,itemnum,itemid`
        },
        objectStructure: `MXAPITOOLITEM`,
        idAttribute: `itemid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `pabqg`
          },
          {
            name: `itemnum`,
            searchable: `true`,
            id: `zer7x`
          },
          {
            name: `itemid`,
            searchable: `true`,
            'unique-id': `true`,
            id: `prkk4`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - toolDS

    // begin datasource - rotatingAssetDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `rotatingAssetDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIASSET`,
          savedQuery: `SHOWROTATINGASSET`,
          lookupData: true,
          offlineImmediateDownload: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `itemnum`,
            `assetnum`,
            `location`,
            `description`,
            `siteid`,
            `binnum`
          ],
          indexAttributes: [
            `itemnum`,
            `assetnum`,
            `location`,
            `description`,
            `siteid`,
            `binnum`
          ],
          select: `itemnum,assetnum,location,description,siteid,binnum`
        },
        objectStructure: `MXAPIASSET`,
        idAttribute: ``,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            searchable: `true`,
            id: `g987x`
          },
          {
            name: `assetnum`,
            searchable: `true`,
            id: `nex38`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `enxnp`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `aw3_r`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `mnz7b`
          },
          {
            name: `binnum`,
            searchable: `true`,
            id: `wkamw`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - rotatingAssetDS

    // begin datasource - locationDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `locationDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPILOCATIONS`,
          savedQuery: `SHOWLOCATIONS`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `location`, `siteid`],
          indexAttributes: [`description`, `location`, `siteid`],
          select: `description,location,siteid`
        },
        objectStructure: `MXAPILOCATIONS`,
        idAttribute: `location`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `wxqde`
          },
          {
            name: `location`,
            searchable: `true`,
            'unique-id': `true`,
            id: `gemj_`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `p66d4`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - locationDS

    // begin datasource - inventbalDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `inventbalDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapiinvbal`,
          savedQuery: `ACTIVEITEMSITE`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `siteid`,
            `itemnum`,
            `location`,
            `binnum`,
            `curbal`,
            `lotnum`
          ],
          indexAttributes: [
            `siteid`,
            `itemnum`,
            `location`,
            `binnum`,
            `curbal`,
            `lotnum`
          ],
          select: `invbalancesid,siteid,itemnum,location,binnum,curbal,lotnum,conditioncode`
        },
        objectStructure: `mxapiinvbal`,
        idAttribute: `invbalancesid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `invbalancesid`,
            'unique-id': `true`,
            id: `nvabm`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `e756b`
          },
          {
            name: `itemnum`,
            searchable: `true`,
            id: `rnpnq`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `nbnnq`
          },
          {
            name: `binnum`,
            searchable: `true`,
            id: `p3neq`
          },
          {
            name: `curbal`,
            searchable: `true`,
            id: `wkn2a`
          },
          {
            name: `lotnum`,
            searchable: `true`,
            id: `v_7q6`
          },
          {
            name: `conditioncode`,
            id: `vz75g`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inventbalDS

    // begin datasource - reportworksSynonymData
    {
      let options = {
        platform: `maximoMobile`,
        name: `reportworksSynonymData`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 100,
        debounceTime: 400,
        query: {
          pageSize: 100,
          selectionMode: `single`,
          objectStructure: `mxapisynonymdomain`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `maxvalue`,
            `domainid`,
            `valueid`,
            `siteid`,
            `orgid`
          ],
          indexAttributes: [
            `maxvalue`,
            `domainid`,
            `valueid`,
            `siteid`,
            `orgid`
          ],
          select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
        },
        objectStructure: `mxapisynonymdomain`,
        idAttribute: `valueid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `value`,
            id: `nkan_`
          },
          {
            name: `maxvalue`,
            id: `ekd_7`,
            searchable: `true`
          },
          {
            name: `description`,
            id: `zjjqa`
          },
          {
            name: `domainid`,
            searchable: `true`,
            id: `pee7e`
          },
          {
            name: `valueid`,
            'unique-id': `true`,
            searchable: `true`,
            id: `yqx2w`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `x5_p9`
          },
          {
            name: `orgid`,
            searchable: `true`,
            id: `pr_jp`
          },
          {
            name: `defaults`,
            id: `wwxqb`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - reportworksSynonymData

    // begin datasource - craftrate
    {
      let options = {
        platform: `maximoMobile`,
        name: `craftrate`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapilaborcraftrate`,
          savedQuery: `LABORSITEMOB`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`craft.description`, `craftskill.description`],
          indexAttributes: [
            `craft.description--craftdescription`,
            `craftskill.description--skillleveldescdata`,
            `laborcode`
          ],
          select: `craft,craft.description--craftdescription,craftskill.skilllevel--skillleveldata,craftskill.description--skillleveldescdata,defaultcraft,rate,laborcraftrateid,laborcode`
        },
        objectStructure: `mxapilaborcraftrate`,
        idAttribute: `laborcraftrateid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `craft`,
            id: `dx85z`
          },
          {
            name: `craft.description--craftdescription`,
            searchable: `true`,
            id: `w3_zv`
          },
          {
            name: `craftskill.skilllevel--skillleveldata`,
            id: `xzn_8`
          },
          {
            name: `craftskill.description--skillleveldescdata`,
            searchable: `true`,
            id: `kr4qn`
          },
          {
            name: `defaultcraft`,
            id: `xade2`
          },
          {
            name: `rate`,
            id: `py985`
          },
          {
            name: `laborcraftrateid`,
            'unique-id': `true`,
            id: `wbjq8`
          },
          {
            name: `laborcode`,
            index: `true`,
            id: `n5wg3`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - craftrate

    // begin datasource - jreportworkLabords
    {
      let options = {
        name: `jreportworkLabords`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        schema: `schema`,
        schemaExt: [
          {
            name: `labtransid`,
            'unique-id': `true`,
            id: `wzmxj`
          },
          {
            name: `startdate`,
            id: `dpvvq`
          },
          {
            name: `starttime`,
            id: `j3k3j`
          },
          {
            name: `finishdate`,
            id: `p534p`
          },
          {
            name: `finishtime`,
            id: `vr537`
          },
          {
            name: `regularhrs`,
            id: `k_jey`
          },
          {
            name: `transtype`,
            id: `a6xd5`
          },
          {
            name: `laborcode`,
            searchable: `true`,
            id: `mwqbe`
          },
          {
            name: `anywhererefid`,
            id: `vbmqk`
          },
          {
            name: `timerstatus`,
            id: `am55j`
          },
          {
            name: `displayname`,
            id: `pnre4`
          },
          {
            name: `groupedlabor`,
            id: `b63k8`
          }
        ],
        sortAttributes: [],
        idAttribute: `labtransid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          searchAttributes: [`laborcode`],
          select: `labtransid,startdate,starttime,finishdate,finishtime,regularhrs,transtype,laborcode,anywhererefid,timerstatus,displayname,groupedlabor`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - jreportworkLabords

    // begin datasource - laborDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `laborDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapilabor`,
          savedQuery: `LABORSITEMOB`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`laborcode`, `person.displayname`],
          indexAttributes: [
            `laborcode`,
            `orgid`,
            `person.displayname--displayname`
          ],
          select: `laborcode,orgid,person.displayname--displayname,laborid,personid`
        },
        objectStructure: `mxapilabor`,
        idAttribute: `laborid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `laborcode`,
            id: `m3ypr`,
            searchable: `true`
          },
          {
            name: `orgid`,
            id: `m3xd5`,
            index: `true`
          },
          {
            name: `person.displayname--displayname`,
            searchable: `true`,
            id: `zvvv6`
          },
          {
            name: `laborid`,
            'unique-id': `true`,
            id: `x4j_b`
          },
          {
            name: `personid`,
            id: `a99qn`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - laborDs

    // begin dialog - transTypeLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `transTypeLookup`,
        configuration: {
          id: `transTypeLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupTransTypeLookup {...props} />;
          },
          renderer: props => {
            return <LookupTransTypeLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - transTypeLookup

    // begin dialog - craftLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `craftLookup`,
        configuration: {
          id: `craftLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupCraftLookup {...props} />;
          },
          renderer: props => {
            return <LookupCraftLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - craftLookup

    // begin dialog - laborLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `laborLookup`,
        configuration: {
          id: `laborLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupLaborLookup {...props} />;
          },
          renderer: props => {
            return <LookupLaborLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - laborLookup

    // begin dialog - reportTimeDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `reportTimeDrawer`,
        configuration: {
          id: `reportTimeDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerReportTimeDrawer
                slidingDrawerProps={props}
                id={'reportTimeDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - reportTimeDrawer

    // begin dialog - materialLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `materialLookup`,
        configuration: {
          id: `materialLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupMaterialLookup {...props} />;
          },
          renderer: props => {
            return <LookupMaterialLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - materialLookup

    // begin dialog - storeRoomLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `storeRoomLookup`,
        configuration: {
          id: `storeRoomLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupStoreRoomLookup {...props} />;
          },
          renderer: props => {
            return <LookupStoreRoomLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - storeRoomLookup

    // begin dialog - binLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `binLookup`,
        configuration: {
          id: `binLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupBinLookup {...props} />;
          },
          renderer: props => {
            return <LookupBinLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - binLookup

    // begin dialog - transactionTypeLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `transactionTypeLookup`,
        configuration: {
          id: `transactionTypeLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupTransactionTypeLookup {...props} />;
          },
          renderer: props => {
            return <LookupTransactionTypeLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - transactionTypeLookup

    // begin dialog - rotatingAssetLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `rotatingAssetLookup`,
        configuration: {
          id: `rotatingAssetLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupRotatingAssetLookup {...props} />;
          },
          renderer: props => {
            return <LookupRotatingAssetLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - rotatingAssetLookup

    // begin dialog - materialsDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `materialsDrawer`,
        configuration: {
          id: `materialsDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerMaterialsDrawer
                slidingDrawerProps={props}
                id={'materialsDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - materialsDrawer

    // begin dialog - toolLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `toolLookup`,
        configuration: {
          id: `toolLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupToolLookup {...props} />;
          },
          renderer: props => {
            return <LookupToolLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - toolLookup

    // begin dialog - toolStoreRoomLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `toolStoreRoomLookup`,
        configuration: {
          id: `toolStoreRoomLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupToolStoreRoomLookup {...props} />;
          },
          renderer: props => {
            return <LookupToolStoreRoomLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - toolStoreRoomLookup

    // begin dialog - toolBinLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `toolBinLookup`,
        configuration: {
          id: `toolBinLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupToolBinLookup {...props} />;
          },
          renderer: props => {
            return <LookupToolBinLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - toolBinLookup

    // begin dialog - toolRotatingAssetLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `toolRotatingAssetLookup`,
        configuration: {
          id: `toolRotatingAssetLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupToolRotatingAssetLookup {...props} />;
          },
          renderer: props => {
            return <LookupToolRotatingAssetLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - toolRotatingAssetLookup

    // begin dialog - toolTaskLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `toolTaskLookup`,
        configuration: {
          id: `toolTaskLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupToolTaskLookup {...props} />;
          },
          renderer: props => {
            return <LookupToolTaskLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - toolTaskLookup

    // begin dialog - toolsDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `toolsDrawer`,
        configuration: {
          id: `toolsDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerToolsDrawer
                slidingDrawerProps={props}
                id={'toolsDrawer_slidingdrawer_container'}
              />
            );
          },
          appResolver: () => app
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - toolsDrawer
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'assetDetails' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'assetDetails',
        clearStack: false,
        parent: app,
        route: '/assetDetails',
        title: app.getLocalizedLabel('assetDetails_title', 'assetDetails')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    // begin datasource - assetds
    {
      let options = {
        name: `assetds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `member`,
        schemaExt: [
          {
            name: `assetnum`,
            id: `z_e4m`
          },
          {
            name: `title`,
            id: `xwyq6`
          },
          {
            name: `description`,
            id: `xj2dj`
          },
          {
            name: `install_date`,
            id: `pydpz`
          },
          {
            name: `status`,
            id: `dqzqe`
          },
          {
            name: `est_end_of_life`,
            id: `zyv5_`
          },
          {
            name: `next_PM`,
            id: `q9qkx`
          },
          {
            name: `next_failure`,
            id: `kne59`
          },
          {
            name: `location`,
            id: `r64w5`
          },
          {
            name: `service_address`,
            id: `j22mw`
          },
          {
            name: `number`,
            id: `ry894`
          },
          {
            name: `priority`,
            id: `k6my8`
          },
          {
            name: `asset`,
            id: `mrd55`
          },
          {
            name: `parent_asset`,
            id: `a6dk8`
          }
        ],
        sortAttributes: [],
        idAttribute: `assetnum`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `assetnum,title,description,install_date,status,est_end_of_life,next_PM,next_failure,location,service_address,number,priority,asset,parent_asset`,
          src: dataassetds
        },
        autoSave: true,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: true,
        srcName: `./mocked/asset-detail.js`
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - assetds
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'failureDetails' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'failureDetails',
        clearStack: false,
        parent: app,
        route: '/failureDetails',
        title: app.getLocalizedLabel('failureDetails_title', 'Failure')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {splitViewIndex: 0, hideDoneBtn: false},
        'page'
      ),
      {}
    );

    {
      let controller = new FailureDetailsPageController();
      bootstrapInspector.onNewController(
        controller,
        'FailureDetailsPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - dsSelectingFailureList
    {
      let options = {
        name: `dsSelectingFailureList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        schemaExt: [
          {
            name: `failurelist`,
            id: `ybenj`
          },
          {
            name: `failurecode`,
            id: `zy_n3`
          },
          {
            name: `failurecode.description`,
            id: `yxpg5`
          },
          {
            name: `orgid`,
            id: `dz348`
          },
          {
            name: `parent`,
            id: `dap68`
          },
          {
            name: `type`,
            id: `rkqjy`
          },
          {
            name: `failurecode.failurecode`,
            id: `x6xxj`
          }
        ],
        sortAttributes: [],
        idAttribute: `failurelist`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `failurelist,failurecode,failurecode.description,orgid,parent,type,failurecode.failurecode`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dsSelectingFailureList

    // begin datasource - dsfailureDetailsList
    {
      let options = {
        name: `dsfailureDetailsList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        schemaExt: [
          {
            name: `failurelistid`,
            'unique-id': `true`,
            id: `abybp`
          },
          {
            name: `failurecode`,
            id: `gz977`
          },
          {
            name: `description`,
            id: `vwakv`
          },
          {
            name: `type`,
            id: `yg2pq`
          },
          {
            name: `failurelist`,
            id: `dn5zx`
          },
          {
            name: `index`,
            id: `kqb6w`
          }
        ],
        sortAttributes: [],
        idAttribute: `failurelistid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `failurelistid,failurecode,description,type,failurelist,index`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dsfailureDetailsList
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'attachments' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'attachments',
        clearStack: false,
        parent: app,
        route: '/attachments',
        title: app.getLocalizedLabel('attachments_title', 'Attachments')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new AttachmentController();
      bootstrapInspector.onNewController(
        controller,
        'AttachmentController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - workOrderAttachmentResource
    {
      let options = {
        platform: `maximoMobile`,
        name: `workOrderAttachmentResource`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        default: `true`,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          default: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `wonum,description,workorderid`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `wonum`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `wonum`,
            'unique-id': `true`,
            id: `xbmn_`
          },
          {
            name: `description`,
            id: `nqz35`
          },
          {
            name: `workorderid`,
            id: `p67dz`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - workOrderAttachmentResource

    // begin datasource - attachmentListDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `attachmentListDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          attachment: true,
          relationship: `doclinks`,
          selectionMode: `none`,
          select: `*`,
          dependsOn: `workOrderAttachmentResource`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `*`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `*`,
            'unique-id': `true`,
            id: `mbqx3`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `workOrderAttachmentResource`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - attachmentListDS
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'relatedWorkOrder' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'relatedWorkOrder',
        clearStack: false,
        parent: app,
        route: '/relatedWorkOrder',
        title: app.getLocalizedLabel('relatedWorkOrder_title', 'Follow-up work')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new RelatedWoController();
      bootstrapInspector.onNewController(
        controller,
        'RelatedWoController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - woDetailRelatedWorkOrder
    {
      let options = {
        platform: `maximoMobile`,
        name: `woDetailRelatedWorkOrder`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        default: `true`,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          default: true,
          itemUrl: page.params.itemhref,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `workorderid,wonum,title,description,status,statusdate,siteid,worktype`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `pba3q`
          },
          {
            name: `wonum`,
            id: `ak5eg`
          },
          {
            name: `title`,
            id: `ekwkq`
          },
          {
            name: `description`,
            id: `rb8ja`
          },
          {
            name: `status`,
            id: `wapd_`
          },
          {
            name: `statusdate`,
            id: `g2ym6`
          },
          {
            name: `siteid`,
            id: `xbxwj`
          },
          {
            name: `worktype`,
            id: `j9knn`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue: page.params.itemhref,
            check: () => {
              return page.params.itemhref;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woDetailRelatedWorkOrder

    // begin datasource - relatedWorkOrderDs
    {
      let options = {
        platform: `maximoMobile`,
        name: `relatedWorkOrderDs`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          relationship: `relatedrecord`,
          dependsOn: `woDetailRelatedWorkOrder`,
          selectionMode: `none`,
          select: `relatedreckey,relatedrecwo.description,cache.SYNDATA:_RELATETYPE_-relatetype`,
          dsParentObject: `mxapiwodetail`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `relatedreckey`,
        selectionMode: `none`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `relatedreckey`,
            'unique-id': `true`,
            id: `qgwrr`
          },
          {
            name: `relatedrecwo.description`,
            id: `x88gb`
          },
          {
            name: `cache.SYNDATA:_RELATETYPE_-relatetype`,
            id: `dddqr`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `woDetailRelatedWorkOrder`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - relatedWorkOrderDs
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'map' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'map',
        clearStack: true,
        parent: app,
        route: '/map',
        title: app.getLocalizedLabel('map_title', 'map')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new MapPageController();
      bootstrapInspector.onNewController(controller, 'MapPageController', page);
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'assetWorkOrder' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'assetWorkOrder',
        clearStack: false,
        parent: app,
        route: '/assetWorkOrder',
        title: app.getLocalizedLabel(
          'assetWorkOrder_title',
          'Asset and location history'
        )
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {workorderLimit: 3, isAsset: false, isLocation: false},
        'page'
      ),
      {}
    );

    {
      let controller = new AssetWoController();
      bootstrapInspector.onNewController(controller, 'AssetWoController', page);
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - assetWorkOrderList
    {
      let options = {
        name: `assetWorkOrderList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `AssetWoItems`,
        schemaExt: [
          {
            name: `wonum`,
            id: `den98`
          },
          {
            name: `description`,
            id: `dw9na`
          },
          {
            name: `status`,
            id: `yebjr`
          },
          {
            name: `status_description`,
            id: `wnr_j`
          },
          {
            name: `worktype`,
            id: `x65mr`
          },
          {
            name: `computedWorkTypeWonum`,
            id: `yjd2z`
          }
        ],
        sortAttributes: [],
        idAttribute: `wonum`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `wonum,description,status,status_description,worktype,computedWorkTypeWonum`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - assetWorkOrderList

    // begin datasource - locationWorkOrderList
    {
      let options = {
        name: `locationWorkOrderList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `LocationWoItems`,
        schemaExt: [
          {
            name: `wonum`,
            id: `yqe76`
          },
          {
            name: `description`,
            id: `ez74d`
          },
          {
            name: `status`,
            id: `bbmwy`
          },
          {
            name: `status_description`,
            id: `rqp_e`
          },
          {
            name: `worktype`,
            id: `py6pq`
          },
          {
            name: `computedWorkTypeWonum`,
            id: `gwqkn`
          }
        ],
        sortAttributes: [],
        idAttribute: `wonum`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `wonum,description,status,status_description,worktype,computedWorkTypeWonum`,
          src: []
        },
        autoSave: true,
        selectionMode: `single`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - locationWorkOrderList
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'woedit' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'woedit',
        clearStack: false,
        parent: app,
        route: '/woedit',
        title: 'woedit'
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {minPriority: 0, maxPriority: 999, useConfirmDialog: true},
        'page'
      ),
      {}
    );

    {
      let controller = new WorkOrderEditController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderEditController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - dsWoedit
    {
      let options = {
        name: `dsWoedit`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        schemaExt: [
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `rbamw`
          },
          {
            name: `wonum`,
            id: `b3aar`
          },
          {
            name: `description`,
            id: `jzyej`
          },
          {
            name: `description_longdescription`,
            id: `wx24_`
          },
          {
            name: `wopriority`,
            id: `rgzm8`
          },
          {
            name: `schedstart`,
            id: `vv6dq`
          },
          {
            name: `schedfinish`,
            id: `nnv6n`
          },
          {
            name: `worktype`,
            id: `d7b3a`
          },
          {
            name: `estdur`,
            id: `gy265`
          },
          {
            name: `orgid`,
            id: `e6pe8`
          },
          {
            name: `woclass`,
            id: `gbq2a`
          },
          {
            name: `assetnum`,
            id: `ed9xp`
          },
          {
            name: `locationnum`,
            id: `qy45w`
          },
          {
            name: `href`,
            id: `mayrx`
          }
        ],
        sortAttributes: [],
        idAttribute: `workorderid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `workorderid,wonum,description,description_longdescription,wopriority,schedstart,schedfinish,worktype,estdur,orgid,woclass,assetnum,locationnum,href`,
          src: []
        },
        autoSave: false,
        selectionMode: `none`,
        computedFields: {},
        notifyWhenParentLoads: true,
        debounceTime: 400,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        trackChanges: true,
        resetDatasource: false,
        qbeAttributes: [],
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        new JSONDataAdapter(options),
        options,
        'JSONDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dsWoedit

    // begin datasource - newWorkOrderds
    {
      let options = {
        platform: `maximoMobile`,
        name: `newWorkOrderds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        default: `true`,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          default: true,
          idAttribute: `workorderid`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `workorderid,wonum,description,description_longdescription,wopriority,schedstart,schedfinish,worktype,estdur,orgid,siteid,woclass,woassetdesc,wolocationdesc,status,status_maxvalue,reportedby`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `workorderid`,
            'unique-id': `true`,
            id: `ydz6z`
          },
          {
            name: `wonum`,
            id: `e642e`
          },
          {
            name: `description`,
            'max-length': `100`,
            id: `k6dp4`
          },
          {
            name: `description_longdescription`,
            id: `v_g74`
          },
          {
            name: `wopriority`,
            id: `n4p5v`
          },
          {
            name: `schedstart`,
            id: `x789n`
          },
          {
            name: `schedfinish`,
            id: `yd8db`
          },
          {
            name: `worktype`,
            id: `nzbb_`
          },
          {
            name: `estdur`,
            id: `k64n9`
          },
          {
            name: `orgid`,
            id: `bw2r_`
          },
          {
            name: `siteid`,
            id: `n2kdv`
          },
          {
            name: `woclass`,
            id: `v9zew`
          },
          {
            name: `woassetdesc`,
            id: `xqvbx`
          },
          {
            name: `wolocationdesc`,
            id: `bz36p`
          },
          {
            name: `status`,
            id: `ge7zm`
          },
          {
            name: `status_maxvalue`,
            id: `ej4bg`
          },
          {
            name: `reportedby`,
            id: `gzqjj`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - newWorkOrderds

    // begin datasource - woCreatelocationDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `woCreatelocationDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPILOCATIONS`,
          savedQuery: `SHOWLOCATIONS`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `location`, `siteid`],
          indexAttributes: [`description`, `location`, `siteid`],
          select: `description,location,siteid`
        },
        objectStructure: `MXAPILOCATIONS`,
        idAttribute: `location`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `rg8yx`
          },
          {
            name: `location`,
            searchable: `true`,
            'unique-id': `true`,
            id: `war98`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `az_mb`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - woCreatelocationDS

    // begin dialog - woDetailsEditDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `woDetailsEditDialog`,
        configuration: {
          id: `woDetailsEditDialog`,
          dialogRenderer: props => {
            return (
              <DialogWoDetailsEditDialog
                id={'woDetailsEditDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - woDetailsEditDialog

    // begin dialog - workTypeLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `workTypeLookup`,
        configuration: {
          id: `workTypeLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupWorkTypeLookup {...props} />;
          },
          renderer: props => {
            return <LookupWorkTypeLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - workTypeLookup

    // begin dialog - saveDiscardDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `saveDiscardDialog`,
        configuration: {
          id: `saveDiscardDialog`,
          dialogRenderer: props => {
            return (
              <DialogSaveDiscardDialog
                id={'saveDiscardDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - saveDiscardDialog

    // begin dialog - openCreadWOLocationLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `openCreadWOLocationLookup`,
        configuration: {
          id: `openCreadWOLocationLookup`,
          isSingleTone: true,
          dialogRenderer: props => {
            return <LookupWithFilterOpenCreadWOLocationLookup {...props} />;
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - openCreadWOLocationLookup
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'createwo' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'createwo',
        clearStack: true,
        parent: app,
        route: '/createwo',
        title: app.getLocalizedLabel('createwo_title', 'Create work order')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {minPriority: 0, maxPriority: 999, useConfirmDialog: true},
        'page'
      ),
      {}
    );

    {
      let controller = new WorkOrderCreateController();
      bootstrapInspector.onNewController(
        controller,
        'WorkOrderCreateController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - dsCreateWo
    {
      let options = {
        platform: `maximoMobile`,
        name: `dsCreateWo`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiwodetail`,
          where: `wonum="0"`,
          autoSave: false,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`workorderid`, `wonum`, `siteid`],
          indexAttributes: [`workorderid`, `wonum`, `siteid`],
          select: `workorderid,wonum,description,description_longdescription,wopriority,schedstart,schedfinish,worktype,estdur,orgid,woclass,siteid,woclass_maxvalue,woclass_description,status,status_maxvalue,status_description,woassetdesc,wolocationdesc,reportedby,reportdate,assetnum,location`
        },
        objectStructure: `mxapiwodetail`,
        idAttribute: `workorderid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `workorderid`,
            searchable: `true`,
            'unique-id': `true`,
            id: `bj6qp`
          },
          {
            name: `wonum`,
            searchable: `true`,
            id: `n52n8`
          },
          {
            name: `description`,
            'max-length': `100`,
            id: `y7g99`
          },
          {
            name: `description_longdescription`,
            id: `r8gpn`
          },
          {
            name: `wopriority`,
            id: `ye34g`
          },
          {
            name: `schedstart`,
            'sub-type': `DATETIME`,
            id: `xd5k8`
          },
          {
            name: `schedfinish`,
            'sub-type': `DATETIME`,
            id: `v6_mw`
          },
          {
            name: `worktype`,
            id: `y6nm_`
          },
          {
            name: `estdur`,
            'sub-type': `DURATION`,
            id: `q27_n`
          },
          {
            name: `orgid`,
            id: `d_5qk`
          },
          {
            name: `woclass`,
            id: `y2xkq`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `b2vn9`
          },
          {
            name: `woclass_maxvalue`,
            id: `njbxd`
          },
          {
            name: `woclass_description`,
            id: `x_j2k`
          },
          {
            name: `status`,
            id: `ykz6e`
          },
          {
            name: `status_maxvalue`,
            id: `g3jwx`
          },
          {
            name: `status_description`,
            id: `g7pjk`
          },
          {
            name: `woassetdesc`,
            id: `g48mq`
          },
          {
            name: `wolocationdesc`,
            id: `nkjbq`
          },
          {
            name: `reportedby`,
            id: `brb_z`
          },
          {
            name: `reportdate`,
            'sub-type': `DATETIME`,
            id: `ba7kj`
          },
          {
            name: `assetnum`,
            id: `gv96g`
          },
          {
            name: `location`,
            id: `jz7n7`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - dsCreateWo

    // begin datasource - locationsDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `locationsDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPILOCATIONS`,
          savedQuery: `SHOWLOCATIONS`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`description`, `location`, `siteid`],
          indexAttributes: [`description`, `location`, `siteid`],
          select: `description,location,siteid`
        },
        objectStructure: `MXAPILOCATIONS`,
        idAttribute: `location`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `description`,
            searchable: `true`,
            id: `k2j28`
          },
          {
            name: `location`,
            searchable: `true`,
            'unique-id': `true`,
            id: `agjpd`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `p6ar6`
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: true
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - locationsDS

    // begin dialog - longdsEditDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `longdsEditDialog`,
        configuration: {
          id: `longdsEditDialog`,
          dialogRenderer: props => {
            return (
              <DialogLongdsEditDialog
                id={'longdsEditDialog_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - longdsEditDialog

    // begin dialog - workTyLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `workTyLookup`,
        configuration: {
          id: `workTyLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupWorkTyLookup {...props} />;
          },
          renderer: props => {
            return <LookupWorkTyLookup {...props} />;
          },
          resetDatasource: false
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - workTyLookup

    // begin dialog - saveDiscardDialogCreatePage
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `saveDiscardDialogCreatePage`,
        configuration: {
          id: `saveDiscardDialogCreatePage`,
          dialogRenderer: props => {
            return (
              <DialogSaveDiscardDialogCreatePage
                id={'saveDiscardDialogCreatePage_dlg_container'}
                key={props.key || props.id}
                onClose={props.onClose}
                zIndex={props.zIndex}
              />
            );
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - saveDiscardDialogCreatePage

    // begin dialog - openLocationLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `openLocationLookup`,
        configuration: {
          id: `openLocationLookup`,
          isSingleTone: true,
          dialogRenderer: props => {
            return <LookupWithFilterOpenLocationLookup {...props} />;
          }
        }
      };
      bootstrapInspector.onNewDialogOptions(options);
      let dialog = new Dialog(options);
      bootstrapInspector.onNewDialog(dialog, options);
      dialog.addInitializer((dialog, parent, app) => {});

      page.registerDialog(dialog);
    }
    // end dialog - openLocationLookup
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'assetLookup' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'assetLookup',
        clearStack: false,
        parent: app,
        route: '/assetLookup',
        title: app.getLocalizedLabel('assetLookup_title', 'Assets')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState({useConfirmDialog: false}, 'page'),
      {}
    );

    {
      let controller = new AssetLocationLookupController();
      bootstrapInspector.onNewController(
        controller,
        'AssetLocationLookupController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - assetsDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `assetsDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIASSET`,
          lookupData: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `assetnum`,
            `description`,
            `siteid`,
            `location.description`,
            `serialnum`
          ],
          indexAttributes: [
            `assetnum`,
            `description`,
            `siteid`,
            `location.description--locationdesc`,
            `serialnum`
          ],
          select: `assetuid,assetnum,description,siteid,location,location.description--locationdesc,_imagelibref,serialnum,assetchildren,children._dbcount--childcount,status`
        },
        objectStructure: `MXAPIASSET`,
        idAttribute: `assetuid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `assetuid`,
            'unique-id': `true`,
            id: `p8k_4`
          },
          {
            name: `assetnum`,
            searchable: `true`,
            id: `bmee9`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `axqxw`
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `apv84`
          },
          {
            searchable: `true`,
            name: `location`,
            id: `x9qjm`,
            lookup: {
              name: `location`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `description`
                },
                {
                  datasourceField: `location`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            name: `location.description--locationdesc`,
            searchable: `true`,
            id: `wegry`
          },
          {
            name: `_imagelibref`,
            id: `zzrzn`
          },
          {
            name: `serialnum`,
            searchable: `true`,
            id: `gyq8j`
          },
          {
            name: `assetchildren`,
            'child-relationship': `children`,
            id: `z7vm3`
          },
          {
            name: `status`,
            id: `x289g`,
            lookup: {
              name: `wostatus`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `description`
                },
                {
                  datasourceField: `value`,
                  lookupField: `value`
                }
              ]
            }
          }
        ],
        qbeAttributes: [],
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        preLoad: false
      };
      bootstrapInspector.onNewDatasourceOptions(options);
      let da = bootstrapInspector.onNewDataAdapter(
        platform.newMaximoDataAdapter(options, app.client.restclient),
        options,
        'AutoMaximoDataAdapter'
      );
      let ds = bootstrapInspector.onNewDatasource(
        new Datasource(da, options),
        da,
        options
      );

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - assetsDS
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  app.setRoutesForApplication(() => {
    return [
      {
        id: `schedule_w6_yq`,
        label: app.getLocalizedLabel('w6_yq_label', 'My Schedule'),
        icon: 'maximo:schedule',
        application: `techmobile`,
        name: `schedule`,
        hidden: undefined,
        onClick: event => {
          eventManager.emit('change-page', {name: 'schedule'}, event);
        },
        page: `schedule`
      },
      {
        id: `materials_r9zjz`,
        label: app.getLocalizedLabel('r9zjz_label', 'Materials & Tools'),
        icon: 'maximo:materialsandtools',
        application: `techmobile`,
        name: `materials`,
        hidden: undefined,
        onClick: event => {
          eventManager.emit('change-page', {name: 'materials'}, event);
        },
        page: `materials`
      },
      {
        id: `map_xb5jv`,
        label: app.getLocalizedLabel('xb5jv_label', 'Map'),
        icon: 'maximo:map',
        application: `techmobile`,
        name: `map`,
        hidden: undefined,
        onClick: event => {
          eventManager.emit('change-page', {name: 'map'}, event);
        },
        page: `map`
      },
      {
        id: `createwo_xv8pg`,
        label: undefined,
        icon: undefined,
        application: `techmobile`,
        name: `createwo`,
        hidden: undefined,
        onClick: event => {
          eventManager.emit('change-page', {name: 'createwo'}, event);
        },
        actionType: `add`,
        page: `createwo`
      }
    ];
  });

  // begin datasource - synonymdomainData
  {
    let options = {
      platform: `maximoMobile`,
      name: `synonymdomainData`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 20,
      debounceTime: 400,
      query: {
        pageSize: 20,
        objectStructure: `mxapisynonymdomain`,
        where: `domainid in ["WOSTATUS","LTTYPE","TIMERSTATUS","ISSUETYP","LINETYPE","ITEMTYPE","ITEMSTATUS","WOCLASS","MRSTATUS","INSPRESULTSTATUS"]`,
        lookupData: true,
        notifyWhenParentLoads: true,
        includeCounts: true,
        resultOutput: `json`,
        trackChanges: true,
        searchAttributes: [
          `maxvalue`,
          `domainid`,
          `valueid`,
          `siteid`,
          `orgid`
        ],
        indexAttributes: [`maxvalue`, `domainid`, `valueid`, `siteid`, `orgid`],
        select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
      },
      objectStructure: `mxapisynonymdomain`,
      idAttribute: `maxvalue`,
      sortAttributes: [],
      schemaExt: [
        {
          name: `value`,
          id: `xp2e9`
        },
        {
          name: `maxvalue`,
          'unique-id': `true`,
          searchable: `true`,
          id: `g58pj`
        },
        {
          name: `description`,
          id: `wwwzq`
        },
        {
          name: `domainid`,
          searchable: `true`,
          id: `m2ebr`
        },
        {
          name: `valueid`,
          searchable: `true`,
          id: `aakrv`
        },
        {
          name: `siteid`,
          searchable: `true`,
          id: `r27qk`
        },
        {
          name: `orgid`,
          searchable: `true`,
          id: `wz5gx`
        },
        {
          name: `defaults`,
          id: `avz96`
        }
      ],
      qbeAttributes: [],
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      clearSelectionOnSearch: true,
      watch: [],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - synonymdomainData

  // begin datasource - woDetailds
  {
    let options = {
      platform: `maximoMobile`,
      name: `woDetailds`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 20,
      debounceTime: 400,
      query: {
        pageSize: 20,
        objectStructure: `mxapiwodetail`,
        notifyWhenParentLoads: true,
        includeCounts: true,
        resultOutput: `json`,
        trackChanges: true,
        select: `wonum,workorderid,title,description--wodesc,failurecode,siteid,href,assetnum,location.description--locationdesc,location.location--locationnum,asset.description--assetdesc,asset.assetnum--assetnumber,asset.assettype--assettype,asset.manufacturer--company,failure.description--failuredesc,classstructure.classificationid--classificationid,jobplan.jpnum--jpnum,jobplan.description--jpdesc,status,status_description,owner,reportdate,schedstart,actstart,targstartdate`
      },
      objectStructure: `mxapiwodetail`,
      idAttribute: `wonum`,
      sortAttributes: [],
      schemaExt: [
        {
          id: `km2bm`,
          name: `wonum`,
          'unique-id': `true`
        },
        {
          name: `workorderid`,
          id: `e697r`
        },
        {
          name: `title`,
          id: `ngym8`
        },
        {
          name: `description--wodesc`,
          id: `yyrnv`
        },
        {
          name: `failurecode`,
          id: `vw_qr`
        },
        {
          name: `siteid`,
          id: `a_g9d`
        },
        {
          name: `href`,
          id: `qz45k`
        },
        {
          name: `assetnum`,
          id: `vpp9n`
        },
        {
          name: `location.description--locationdesc`,
          id: `w26rd`
        },
        {
          name: `location.location--locationnum`,
          id: `ygj7x`
        },
        {
          name: `asset.description--assetdesc`,
          id: `ydp_5`
        },
        {
          name: `asset.assetnum--assetnumber`,
          id: `v3xjq`
        },
        {
          name: `asset.assettype--assettype`,
          id: `eng4z`
        },
        {
          name: `asset.manufacturer--company`,
          id: `beny_`
        },
        {
          name: `failure.description--failuredesc`,
          id: `egd35`
        },
        {
          name: `classstructure.classificationid--classificationid`,
          id: `d9w9y`
        },
        {
          name: `jobplan.jpnum--jpnum`,
          id: `k92rp`
        },
        {
          name: `jobplan.description--jpdesc`,
          id: `r9dmd`
        },
        {
          name: `status`,
          id: `k62e8`
        },
        {
          name: `status_description`,
          id: `qj5nq`
        },
        {
          name: `owner`,
          id: `x473_`
        },
        {
          name: `reportdate`,
          id: `zrx_6`
        },
        {
          name: `schedstart`,
          id: `w9y3q`
        },
        {
          name: `actstart`,
          id: `d_xrk`
        },
        {
          name: `targstartdate`,
          id: `bayp7`
        }
      ],
      qbeAttributes: [],
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      clearSelectionOnSearch: true,
      watch: [],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - woDetailds

  // begin datasource - woPlanTaskDetailds
  {
    let options = {
      platform: `maximoMobile`,
      name: `woPlanTaskDetailds`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 100,
      query: {
        pageSize: 100,
        relationship: `woactivity`,
        orderBy: `taskid`,
        domainInternalWhere: `status=INPRG,WAPPR,WMATL,APPR,WSCH,WPCOND,COMP`,
        selectionMode: `none`,
        searchAttributes: [`status`],
        indexAttributes: [`status`],
        select: `workorderid,taskid,description,description_longdescription,status,status_description,status_maxvalue,inspectionform.name--inspname,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href,status,status_maxvalue,status_description--statusdesc},doclinks{*}`,
        dependsOn: `woDetailds`,
        dsParentObject: `mxapiwodetail`
      },
      objectStructure: `mxapiwodetail`,
      idAttribute: `workorderid`,
      selectionMode: `none`,
      sortAttributes: [],
      schemaExt: [
        {
          name: `workorderid`,
          'unique-id': `true`,
          id: `vv3x7`
        },
        {
          name: `taskid`,
          id: `nywdm`,
          'sub-type': `ALN`
        },
        {
          name: `description`,
          id: `kwee8`
        },
        {
          name: `description_longdescription`,
          id: `g2qxp`
        },
        {
          name: `status`,
          id: `yn47d`,
          searchable: `true`
        },
        {
          name: `status_description`,
          id: `zzvnb`
        },
        {
          name: `status_maxvalue`,
          id: `eygab`
        },
        {
          name: `inspectionform.name--inspname`,
          id: `mk8zk`
        },
        {
          name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href,status,status_maxvalue,status_description--statusdesc}`,
          id: `zzvap`
        },
        {
          name: `doclinks{*}`,
          id: `gg8vy`
        }
      ],
      qbeAttributes: [],
      parentDatasource: `woDetailds`,
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      watch: [],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );
    let controller = new WorkOrderDataController();
    bootstrapInspector.onNewController(
      controller,
      'WorkOrderDataController',
      ds
    );
    ds.registerController(controller);

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - woPlanTaskDetailds

  // begin datasource - dsFailureList
  {
    let options = {
      platform: `maximoMobile`,
      name: `dsFailureList`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 100,
      default: `true`,
      debounceTime: 400,
      query: {
        pageSize: 100,
        selectionMode: `single`,
        objectStructure: `mxapifailurelist`,
        savedQuery: `FAILUREMOB`,
        default: true,
        lookupData: true,
        offlineImmediateDownload: true,
        notifyWhenParentLoads: true,
        includeCounts: true,
        resultOutput: `json`,
        trackChanges: true,
        searchAttributes: [`failurelist`, `orgid`, `parent`, `type`],
        indexAttributes: [`failurelist`, `orgid`, `parent`, `type`],
        select: `failurelist,failurecode,failurecode.description,orgid,parent,type,failurecode.failurecode`
      },
      objectStructure: `mxapifailurelist`,
      idAttribute: `failurelist`,
      selectionMode: `single`,
      sortAttributes: [],
      schemaExt: [
        {
          name: `failurelist`,
          searchable: `true`,
          'unique-id': `true`,
          id: `en5e5`
        },
        {
          name: `failurecode`,
          id: `wa5x6`
        },
        {
          name: `failurecode.description`,
          type: `STRING`,
          'sub-type': `ALN`,
          id: `jgp6e`
        },
        {
          name: `orgid`,
          searchable: `true`,
          id: `jd3ar`
        },
        {
          name: `parent`,
          searchable: `true`,
          id: `by38p`
        },
        {
          name: `type`,
          searchable: `true`,
          id: `kwe8r`
        },
        {
          name: `failurecode.failurecode`,
          id: `gkvk_`
        }
      ],
      qbeAttributes: [],
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      clearSelectionOnSearch: true,
      watch: [],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - dsFailureList

  // begin datasource - dsworktype
  {
    let options = {
      platform: `maximoMobile`,
      name: `dsworktype`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 100,
      debounceTime: 400,
      query: {
        pageSize: 100,
        selectionMode: `single`,
        objectStructure: `mxapiworktype`,
        lookupData: true,
        offlineImmediateDownload: true,
        notifyWhenParentLoads: true,
        includeCounts: true,
        resultOutput: `json`,
        trackChanges: true,
        searchAttributes: [`worktype`, `wtypedesc`, `woclass`, `orgid`],
        indexAttributes: [`worktype`, `wtypedesc`, `woclass`, `orgid`],
        select: `worktype,wtypedesc,woclass,orgid,promptdown`
      },
      objectStructure: `mxapiworktype`,
      idAttribute: `worktype`,
      selectionMode: `single`,
      sortAttributes: [],
      schemaExt: [
        {
          name: `worktype`,
          searchable: `true`,
          'unique-id': `true`,
          id: `rrpez`
        },
        {
          name: `wtypedesc`,
          searchable: `true`,
          id: `w5_zm`
        },
        {
          name: `woclass`,
          searchable: `true`,
          id: `b8w9r`
        },
        {
          name: `orgid`,
          searchable: `true`,
          id: `b_jdj`
        },
        {
          name: `promptdown`,
          id: `n_5q4`
        }
      ],
      qbeAttributes: [],
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      clearSelectionOnSearch: true,
      watch: [],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - dsworktype

  // begin datasource - wpEditSettingDS
  {
    let options = {
      platform: `maximoMobile`,
      name: `wpEditSettingDS`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 20,
      debounceTime: 400,
      query: {
        pageSize: 20,
        objectStructure: `mxapiwpeditsetting`,
        notifyWhenParentLoads: true,
        includeCounts: true,
        resultOutput: `json`,
        trackChanges: true,
        searchAttributes: [`orgid`, `status`],
        indexAttributes: [`orgid`, `status`],
        select: `orgid,status,editasset,editloc`
      },
      objectStructure: `mxapiwpeditsetting`,
      idAttribute: ``,
      sortAttributes: [],
      schemaExt: [
        {
          name: `orgid`,
          searchable: `true`,
          id: `n99wv`
        },
        {
          name: `status`,
          searchable: `true`,
          id: `wwv5g`
        },
        {
          name: `editasset`,
          id: `gymya`
        },
        {
          name: `editloc`,
          id: `jbkae`
        }
      ],
      qbeAttributes: [],
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      clearSelectionOnSearch: true,
      watch: [],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false,
      preLoad: true
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - wpEditSettingDS

  // begin datasource - defaultSetDs
  {
    let options = {
      platform: `maximoMobile`,
      name: `defaultSetDs`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 20,
      debounceTime: 400,
      query: {
        pageSize: 20,
        objectStructure: `mxapiorganization`,
        where: `orgid="${
          app && app.client && app.client.userInfo
            ? app.client.userInfo.defaultOrg
            : undefined
        }"`,
        notifyWhenParentLoads: true,
        includeCounts: true,
        resultOutput: `json`,
        trackChanges: true,
        searchAttributes: [`orgid`],
        indexAttributes: [`orgid`],
        select: `itemsetid,orgid`
      },
      objectStructure: `mxapiorganization`,
      idAttribute: `orgid`,
      sortAttributes: [],
      schemaExt: [
        {
          name: `itemsetid`,
          id: `x4pne`
        },
        {
          name: `orgid`,
          'unique-id': `true`,
          searchable: `true`,
          id: `mr8av`
        }
      ],
      qbeAttributes: [],
      computedFields: {},
      notifyWhenParentLoads: true,
      appResolver: () => app,
      clearSelectionOnSearch: true,
      watch: [
        {
          name: `where`,
          lastValue: `orgid="${
            app && app.client && app.client.userInfo
              ? app.client.userInfo.defaultOrg
              : undefined
          }"`,
          check: () => {
            return `orgid="${
              app && app.client && app.client.userInfo
                ? app.client.userInfo.defaultOrg
                : undefined
            }"`;
          }
        }
      ],
      autoSave: false,
      trackChanges: true,
      resetDatasource: false,
      preLoad: true
    };
    bootstrapInspector.onNewDatasourceOptions(options);
    let da = bootstrapInspector.onNewDataAdapter(
      platform.newMaximoDataAdapter(options, app.client.restclient),
      options,
      'AutoMaximoDataAdapter'
    );
    let ds = bootstrapInspector.onNewDatasource(
      new Datasource(da, options),
      da,
      options
    );

    if (!app.hasDatasource(ds)) {
      app.registerDatasource(ds);
    }
  }
  // end datasource - defaultSetDs

  return app;
};

// istanbul ignore next - test framework
class TestBootstrapInspector extends BootstrapInspector {
  constructor(options = {}) {
    super();
    this.options = options;
  }

  newOfflineApplicationOptions(initOptions = {}, appOptions) {
    const {
      RESTConnection: TestRESTConnection,
      MaximoClient: TestMaximoClient,
      SuccessAuthenticator: TestAuthenticator,
      JSONLocalizationSource: TestLocalizerSource,
      Localizer: TestLocalizer
    } = require('@maximo/maximo-js-api');
    let conn = TestRESTConnection.newInstance(initOptions.connection);

    let client = new TestMaximoClient(
      new TestAuthenticator(),
      conn,
      initOptions.connection
    );

    client.connect = () => {
      client.authenticated = true;
      client.connected = true;
      return true;
    };
    // istanbul ignore next - for testing
    client.login = () => {
      // istanbul ignore next - for testing
      client.connect();
      // istanbul ignore next - for testing
      return true;
    };
    client.disconnect = () => {
      client.authenticated = false;
      client.connected = false;
      return true;
    };
    client.restclient._fetch = initOptions.fetch || (() => {});
    client.fakeClient = true;
    client.systemProperties = initOptions.systemProperties || {};
    client.getSystemProperties = () => client.systemProperties;
    client.getSystemProperty = p => client.systemProperties[p];

    appOptions.client = client;

    appOptions.isMaximoApp = true;
    appOptions.skipInfo = true;
    appOptions.userInfoOnly = false;
    appOptions.forceJsonLocalizer = true;
    appOptions.forceSessionStorage = true;
    appOptions.skipLocaleLabels = true;

    return {...appOptions, client: client};
  }

  onNewAppOptions(options) {
    // setup a completely stubbed out application
    this.newOfflineApplicationOptions(this.options, options);

    // disable logging unless it is set
    options.logLevel = this.options.logLevel || -1;
    return options;
  }

  onNewDataAdapter(da, options, type) {
    if (type === 'RESTDataAdapter' || type === 'AutoMaximoDataAdapter') {
      return new JSONDataAdapter(options);
    }
    return da;
  }

  onNewDatasourceOptions(options) {
    if (this.options.datasources && this.options.datasources[options.name]) {
      options.src = this.options.datasources[options.name].data;
      if (options.src && options.src.member) {
        options.items = 'member';
      }
      if (
        options.src &&
        options.src.responseInfo &&
        options.src.responseInfo.schema
      ) {
        options.schema = 'responseInfo.schema';
      }
    }

    if (!options.src) {
      options.src = [];
    }

    return options;
  }

  applyEventSpies(ob, spies) {
    if (spies) {
      Object.keys(spies).forEach(s => {
        ob.on(s, spies[s]);
      });
    }
  }

  onNewDatasource(ds, da, options) {
    if (this.options.datasources && this.options.datasources[options.name]) {
      this.applyEventSpies(
        ds,
        this.options.datasources[options.name].eventSpies
      );
    }
    return ds;
  }
}

/**
 * Creates a new test stub that when called will initialize the applications.
 *
 * @example <caption>Create and initialize a new test app</caption>
 * let initializeApp = newTestStub({currentPage: 'page3'});
 * let app = await inializeApp();
 *
 * @param {TestInitOptions} options - Test options.
 * @param {number} options.logLevel - Set the log level. -1 is off, 0 is error, 5 is trace.
 * @param {string} options.currenPage - Initialize to the given page name.
 * @param {Datasources} datasources - Datasource configuration
 * @param {DatasourceConfig} datasources.dsname - Datasource configuration for datasource 'dsname'
 * @param {DatasourceData} datasources.dsname.data - Datasource data for datasource 'dsname'
 * @param {DatasourceSpies} datasources.dsname.eventSpies - Event spies for datasource 'dsname'
 * @param {Function} onNewPlatform - Called after the Platform object is created.
 * @param {Function} onNewAppOptions - Called after the Application options are created and before the Application is created.
 * @param {Function} onNewLookupOptions - alled after the Lookup options is created and before the Lookups are created
 * @param {Function} onNewApp - Called after the Application has been created and before it is initialized.
 * @param {Function} onNewState - Called when new default state is created for application, page, dialog and datasources
 * @param {Function} onNewController - Called after a controller has been created and before it is registered with an owner.
 * @param {Function} onNewPageOptions - Called after the page options are created and before the page is created.
 * @param {Function} onNewPage - Called after the page has been created and before it has been initialized.
 * @param {Function} onNewDatasourceOptions - Called with the datasource options and before the datasource has been created.
 * @param {Function} onNewDataAdapter - Called with the DataAdapter instance and before the Datasource is created.
 * @param {Function} onNewDatasource - Called after the Datasource has been created and before it has been registered with a page/app/dialog.
 * @param {Function} onNewDialogOptions - Called with the dialog options and before the dialog is created.
 * @param {Function} onNewDialog - Called with the Dialog instance and before it is registered with a page/app.
 * @returns {Function} A Promise that when called will initialize the test application.
 */
// istanbul ignore next
export function newTestStub(options = {}) {
  // turn off logging until it is turned on
  const {log: testLog} = require('@maximo/maximo-js-api');
  testLog.level = -1;

  // stub out xml http request
  window.XMLHttpRequest = {
    open: url => {},
    send: () => {}
  };
  global.XMLHttpRequest = window.XMLHttpRequest;

  // create the app stub
  let resp = {};
  let bootstrap = new TestBootstrapInspector(options);

  // wire up bootstrap methods.
  Object.keys(options)
    .filter(k => k.startsWith('onNew'))
    .forEach(k => {
      bootstrap.wrap(k, options[k]);
    });

  resp.initializeApp = async args => {
    if (args)
      throw new Error(
        'initializeApp does not accept parameters.  Perhaps you mean to pass them to newTestStub instead.'
      );
    let app = await appInitialize(() => {}, bootstrap);
    if (options.currentPage) {
      app.currentPage = app.findPage(options.currentPage);
    }
    await app.initialize();
    return app;
  };
  return resp.initializeApp;
}

export default newTestStub;
