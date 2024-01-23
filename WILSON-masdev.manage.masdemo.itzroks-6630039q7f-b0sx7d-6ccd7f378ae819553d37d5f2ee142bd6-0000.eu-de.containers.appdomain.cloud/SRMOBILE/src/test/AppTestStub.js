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


import 'regenerator-runtime/runtime'
import { Datasource } from '@maximo/maximo-js-api';
import { JSONDataAdapter } from '@maximo/maximo-js-api';
import { Dialog } from '@maximo/maximo-js-api';
import { Application } from '@maximo/maximo-js-api';
import { PlatformFactory } from '@maximo/maximo-js-api';
import { LookupManager } from '@maximo/maximo-js-api';
import { Browser } from '@maximo/maximo-js-api';
import { BootstrapInspector } from '@maximo/maximo-js-api';
import { Page } from '@maximo/maximo-js-api';
import AppController from '../AppController';
import CategoryDataController from '../CategoryDataController';
import SRDataController from '../SRDataController';
import AttachmentDataController from '../AttachmentDataController';
import SRPageController from '../SRPageController';
import SRDetailsController from '../SRDetailsController';
import AttachmentController from '../AttachmentController';
import AttachmentJSONDataAdapter from '../AttachmentJSONDataAdapter';
import MapLocationController from '../MapLocationController';
import MapAssetController from '../MapAssetController';
import CreateSRController from '../CreateSRController';
import NavigatorController from '../NavigatorController';
import SubCategoryController from '../SubCategoryController';
import TKTemplateController from '../TKTemplateController';const PagesPages = ()=>'';
const PageMain = ()=>'';
const SlidingDrawerSrIndexWorkLogDrawer = ()=>'';
const DialogSysMsgDialog_srpage = ()=>'';
const StackedPanelQzfnmComponent = ()=>'';
const PageSrDetails = ()=>'';
const DialogSrDetailsDialog = ()=>'';
const SlidingDrawerSrWorkLogDrawer = ()=>'';
const RepeatJp37v = ()=>'';
const RichTextViewer = ()=>'';
const PageAttachments = ()=>'';
const PanelM6v23Component = ()=>'';
const PageCreateSR = ()=>'';
const IncludeRabp7 = ()=>'';
const IncludeX5x4z = ()=>'';
const IncludeK8qq9 = ()=>'';
const IncludeWxgpv = ()=>'';
const IncludeGmx2z = ()=>'';
const IncludeB_d87 = ()=>'';
const RepeatNmk94 = ()=>'';
const DataListCreateSRLocationDrilldown = ()=>'';
const DataListCreateSRAsset = ()=>'';
const ButtonGroupA8ra3Component = ()=>'';
const PanelQe5bdComponent = ()=>'';
const LookupAlnLookup = ()=>'';
const LookupStateProvinceLookup = ()=>'';
const LookupPersonLookup = ()=>'';
const LookupWithFilterLocationLookup = ()=>'';
const LookupWithFilterLocationDrilldownLookup = ()=>'';
const LookupWithFilterAssetLookup = ()=>'';
const LookupWithFilterTableDomainLookup = ()=>'';
const DialogConfirmSubmitYesNo = ()=>'';
const DialogCannotSubmit = ()=>'';
const DialogMapDialog = ()=>'';
const DialogSysMsgAssetMismatchDialog = ()=>'';
const DialogSysMsgLocationMismatchDialog = ()=>'';
const PageNewRequest = ()=>'';
const PanelJ5y_5Component = ()=>'';
const PanelGnmjgComponent = ()=>'';
const PageSubCategory = ()=>'';
const PanelAkax9Component = ()=>'';
const PanelMj6w3Component = ()=>'';
const PageTktemp = ()=>'';
const PanelX7knyComponent = ()=>'';
const defaultLabels = {};
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
      name: "srmobile",
      type: "",
      theme: "touch",
      isMaximoApp: true,
      masEnabled: false,
      
      labels: {},
      defaultMessages: {"Details":"Details","ContactPerson":"Contact person","Location":"Location","Asset":"Asset","ServiceAddress":"Service Address","Attachment":"Attachment","sr_cannot_cancel_msg":"Can not cancel. There are related work orders","srCreated_msg":"Request {0} submitted","srCreated_nonumber_msg":"Request submitted","srCancelled_msg":"Request {0} was cancelled","srCancelled_nonumber_msg":"Request was cancelled","assetLocationMismatch":"The asset you selected does not reside in the current location. Would you like to update the location to the asset's location?","locationAssetMismatch":"The location you entered does not contain the current asset. Would you like to update the asset with the asset that resides in this location?","cluster":"Cluster","inprg":"In Progress","others":"Others","new":"New","operating":"Operating","invalidLocation":"Location is invalid","invalidAsset":"Asset is invalid","mapUnavailableOfflineError":"Maps can't be used while offline.","mapRetrieveLocationError":"There was an error to retrieve location.","mapClusterCannotBeSelected":"A cluster is not a valid selection.","locationButtonMap":"Map","locationButtonScan":"Scan","locationButtonSearch":"Search","assetButtonEdit":"Edit","assetButtonErase":"Erase","assetNotFound":"Asset not found","noCompletedRequests":"No completed requests","noUnsyncedRequests":"No unsynced requests","noActiveRequests":"No active requests"},
      messageGroups: 'viewmanager',
      systemProps: ["mxe.mobile.travel.prompt","mxe.mobile.travel.radius","mxe.mobile.travel.navigation","sr.default.classstructureid","sr.default.priority","sr.high.priority","sr.filter.site"],
      hasCustomizations: false,
      forceJsonLocalizer: undefined,
      useBrowserRouter: false,
      hideMaximoMenus: false,
      sigoptions: {},
      walkmeConfig: undefined
    };

    bootstrapInspector.onNewAppOptions(appOptions);

    let platform = PlatformFactory.newPlatform(appOptions, window.location.href);
    bootstrapInspector.onNewPlatform(platform);
    await platform.configure(appOptions);

    //load default lookups and merge in custom lookups
    bootstrapInspector.onNewLookupOptions(customLookups);
    LookupManager.get().addLookup(customLookups);

    let app = await platform.newApplication(appOptions);

    if(false){
      app.titleResolver = () => {return }
    } else {
      app.title = "Service Requests";
    }

    bootstrapInspector.onNewApp(app);
    let eventManager = app;
    app.setState(bootstrapInspector.onNewState({"cacheExpiryMs":10000,"maxvarCoordinate":"XY","isMobileContainer":false,"selectedTopCategory":"","topcategorydesc":"","selectedSubCategory":"","subcategory":"","subcatDisplayIcon":"","currSubCategoryID":"","currSubCategoryDesc":"","backPageName":"","isback":false,"isUpdateFromBack":false,"isFromDescribleReq":"N","pagelist":"{[]}","lastCurrSelectedID":0,"lastCurrSelectedDesc":"","isMapValid":false,"attachCount":0,"valuesaved":false,"refreshActiveRequests":false,"sysProp":{"filterSite":"0","defaultPriority":3,"highPriority":2,"defaultClassstructure":""},"synonym":{"loading":false,"newSRStatus":"","srClass":"","activeSrStatusList":"","completedSrStatusList":""},"canLoad":{"sr":false,"doclinks":false,"worklog":false,"ticketspec":false,"categories":false,"assignedto":false},"selectedSR":""}, 'app'));
    setAppInst(app);

    app.registerController(bootstrapInspector.onNewController(new AppController(), 'AppController', app));
    let page;

    
      // setup the 'main' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'main', clearStack: true, parent: app, route: '/main/*', title: app.getLocalizedLabel("main_title", "My active requests"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedSwitch":0,"selectedDropdown":"activerequests","firstLogin":false,"previousPage":"","emptystring":""}, 'page'), {});

        
              {
                let controller = new SRPageController();
                bootstrapInspector.onNewController(controller, 'SRPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - unsyncedrequests
                {
                  let options = {
  name: `unsyncedrequests`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `ticketid`,
      id: `vvnmy`
    },
    {
      name: `ticketuid`,
      'unique-id': `true`,
      id: `a5x82`
    },
    {
      name: `assetnum`,
      id: `pepxk`
    },
    {
      name: `location`,
      id: `ga3w2`
    },
    {
      name: `description`,
      id: `z5vz6`
    },
    {
      name: `description_longdescription`,
      id: `mx6gn`
    },
    {
      name: `computedSRStatusPriority`,
      local: (true),
      id: `z7wg3`
    },
    {
      name: `computedSRDescription`,
      local: (true),
      id: `p9_4q`
    },
    {
      name: `status_description`,
      id: `xkxe8`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `ticketuid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `ticketid,ticketuid,assetnum,location,description,description_longdescription,status_description`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new SRDataController();
bootstrapInspector.onNewController(controller, 'SRDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - unsyncedrequests

                
          
                // begin dialog - srIndexWorkLogDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `srIndexWorkLogDrawer`,
  configuration:   {
    id: `srIndexWorkLogDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerSrIndexWorkLogDrawer slidingDrawerProps={props} id={"srIndexWorkLogDrawer_slidingdrawer_container"}  />
    );
  })
  ),
    appResolver: (() => app)
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - srIndexWorkLogDrawer
                

                // begin dialog - sysMsgDialog_srpage
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `sysMsgDialog_srpage`,
  configuration:   {
    id: `sysMsgDialog_srpage`,
    dialogRenderer: ((props => {
    return (
      <DialogSysMsgDialog_srpage id={"sysMsgDialog_srpage_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - sysMsgDialog_srpage
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'srDetails' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'srDetails', clearStack: false, parent: app, route: '/srDetails/*', title: app.getLocalizedLabel("srDetails_title", "Service Request"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"worklogCount":0,"doclinksCount":0}, 'page'), {});

        
              {
                let controller = new SRDetailsController();
                bootstrapInspector.onNewController(controller, 'SRDetailsController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - srDetailSpecDSui
                {
                  let options = {
  name: `srDetailSpecDSui`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - srDetailSpecDSui

                
          
                // begin dialog - srDetailsDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `srDetailsDialog`,
  configuration:   {
    id: `srDetailsDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSrDetailsDialog id={"srDetailsDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - srDetailsDialog
                

                // begin dialog - srWorkLogDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `srWorkLogDrawer`,
  configuration:   {
    id: `srWorkLogDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerSrWorkLogDrawer slidingDrawerProps={props} id={"srWorkLogDrawer_slidingdrawer_container"}  />
    );
  })
  ),
    appResolver: (() => app)
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - srWorkLogDrawer
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'attachments' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'attachments', clearStack: false, parent: app, route: '/attachments/*', title: app.getLocalizedLabel("attachments_title", "Attachments"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new AttachmentController();
                bootstrapInspector.onNewController(controller, 'AttachmentController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'createSR' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'createSR', clearStack: false, parent: app, route: '/createSR/*', title: app.getLocalizedLabel("createSR_title", "New request"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"splitViewIndex":0,"contactrequiredState":false,"detailrequiredState":false,"locationrequiredState":false,"assetrequiredState":false,"addressrequiredState":false,"contactdetail":"","contactdetails":"","lastcategorydesc":"","ishighpriority":false,"siteid":"","srdescription":"","location":"","locationdesc":"","assetnum":"","assetdesc":"","assetwhere":"","formattedaddress":"","streetaddress":"","city":"","stateprovince":"","latitudey":"","longitudex":"","mapIsForAsset":false,"mapSelectDisabled":true,"mapValueSelected":"","newTicketSpecSRC":"{[]}","useConfirmDialog":true,"assetlocationmismatch":false,"hasInvalidAsset":false,"hasInvalidLocation":false,"canLoadPage":false,"canLoadLocationJsonMap":false,"canLoadAssetJsonMap":false,"captureCoordinatesInProg":false,"instructions":"","isAssetEditEnabled":false}, 'page'), {});

        
              {
                let controller = new CreateSRController();
                bootstrapInspector.onNewController(controller, 'CreateSRController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - srattchds
                {
                  let options = {
  name: `srattchds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  src:   [

  ],
  schemaExt:   [
    {
      name: `href`,
      title: (app.getLocalizedLabel("g7vxz_title", "href")),
      type: `STRING`,
      searchable: `true`,
      id: `g7vxz`
    },
    {
      name: `localref`,
      title: (app.getLocalizedLabel("x9pne_title", "localref")),
      type: `STRING`,
      id: `x9pne`
    },
    {
      name: `describedBy`,
      title: (app.getLocalizedLabel("zqa32_title", "describedBy")),
      id: `zqa32`
    },
    {
      name: `filedata`,
      title: (app.getLocalizedLabel("e58p6_title", "filedata")),
      id: `e58p6`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `href`,
  loadingDelay: 0,
  query:   {
    searchAttributes:     [
`href`
    ],
    select: `href,localref,describedBy,filedata`,
    src:     [

    ]
  },
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  autoSave: false,
  watch:   [

  ],
  expiryTime: NaN,
  trackChanges: true,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new AttachmentJSONDataAdapter(options), options, 'AttachmentJSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - srattchds

                

                // begin datasource - personDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `personDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIPERSON`,
    savedQuery: `SERVICEREQUEST`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `personDS`,
    searchAttributes:     [
`personid`,
`firstname`,
`lastname`,
`displayname`,
`department`
    ],
    indexAttributes:     [
`personid`,
`firstname`,
`lastname`,
`displayname`,
`department`
    ],
    select: `personid,firstname,lastname,displayname,loctoservreq,primaryphone,primaryemail,department`
  },
  objectStructure: `MXAPIPERSON`,
  idAttribute: `personid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `personid`,
      searchable: `true`,
      'unique-id': `true`,
      id: `pmzye`
    },
    {
      name: `firstname`,
      searchable: `true`,
      id: `pz3vn`
    },
    {
      name: `lastname`,
      searchable: `true`,
      id: `pv65p`
    },
    {
      name: `displayname`,
      searchable: `true`,
      id: `m8qq6`
    },
    {
      name: `loctoservreq`,
      searchable: `false`,
      id: `v82jq`
    },
    {
      name: `primaryphone`,
      searchable: `false`,
      id: `y7v42`
    },
    {
      name: `primaryemail`,
      searchable: `false`,
      id: `az7e9`
    },
    {
      name: `department`,
      searchable: `true`,
      id: `v82jp`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - personDS

                

                // begin datasource - locationLookupDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 15,
  debounceTime: 100,
  query:   {
    pageSize: 15,
    selectionMode: `single`,
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationLookupDS`,
    searchAttributes:     [
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`location`,
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    select: `locationsid,location,description,failurecode,glaccount,locpriority,parent,locationchildren,syschildren._dbcount--childcount,locsystem.primarysystem--primarysystem,syschildren._dbcount--childcount,systemid,syschildren._dbcount--childcount,type,syschildren._dbcount--childcount,status,syschildren._dbcount--childcount,siteid,syschildren._dbcount--childcount,orgid,syschildren._dbcount--childcount,autolocate,syschildren._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},syschildren._dbcount--childcount,serviceaddress.latitudey,syschildren._dbcount--childcount,serviceaddress.longitudex,syschildren._dbcount--childcount,rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},syschildren._dbcount--childcount`
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `locationsid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `menw3`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `dprab`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xg7p9`
    },
    {
      name: `failurecode`,
      id: `w_p4x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `wa5y4`
    },
    {
      name: `locpriority`,
      searchable: `false`,
      id: `kaxzm`
    },
    {
      name: `parent`,
      searchable: `false`,
      id: `pxj85`
    },
    {
      name: `locationchildren`,
      'child-relationship': `syschildren`,
      id: `k7mpn`
    },
    {
      name: `locsystem.primarysystem--primarysystem`,
      id: `pg4_y`
    },
    {
      name: `systemid`,
      id: `eyj5w`
    },
    {
      searchable: `true`,
      name: `type`,
      id: `anrp6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `anrp6`,
      lookup:       {
        name: `listLocationType`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      searchable: `true`,
      name: `status`,
      id: `gxzyp`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gxzyp`,
      lookup:       {
        name: `locationstatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x9_rg`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pnyry`
    },
    {
      name: `autolocate`,
      id: `vxy3g`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `a7ek5`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `xqjpg`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `xn4yj`
    },
    {
      name: `rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `yq2wn`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - locationLookupDS

                

                // begin datasource - locationDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 15,
  debounceTime: 100,
  query:   {
    pageSize: 15,
    selectionMode: `multiple`,
    offlineImmediateDownload: true,
    lookupData: true,
    select: ("locationsid,location,description,failurecode,glaccount,locpriority,parent,locationchildren,syschildren._dbcount--childcount,locsystem.primarysystem--primarysystem,syschildren._dbcount--childcount,systemid,syschildren._dbcount--childcount,type,syschildren._dbcount--childcount,status,syschildren._dbcount--childcount,siteid,syschildren._dbcount--childcount,orgid,syschildren._dbcount--childcount,autolocate,syschildren._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},syschildren._dbcount--childcount,serviceaddress.latitudey,syschildren._dbcount--childcount,serviceaddress.longitudex,syschildren._dbcount--childcount,rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},syschildren._dbcount--childcount"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationLookupDS`,
    indexAttributes:     [
`location`,
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ]
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `locationsid`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `menw3`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `dprab`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xg7p9`
    },
    {
      name: `failurecode`,
      id: `w_p4x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `wa5y4`
    },
    {
      name: `locpriority`,
      searchable: `false`,
      id: `kaxzm`
    },
    {
      name: `parent`,
      searchable: `false`,
      id: `pxj85`
    },
    {
      name: `locationchildren`,
      'child-relationship': `syschildren`,
      id: `k7mpn`
    },
    {
      name: `locsystem.primarysystem--primarysystem`,
      id: `pg4_y`
    },
    {
      name: `systemid`,
      id: `eyj5w`
    },
    {
      searchable: `true`,
      name: `type`,
      id: `anrp6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `anrp6`,
      lookup:       {
        name: `listLocationType`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      searchable: `true`,
      name: `status`,
      id: `gxzyp`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gxzyp`,
      lookup:       {
        name: `locationstatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x9_rg`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pnyry`
    },
    {
      name: `autolocate`,
      id: `vxy3g`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `a7ek5`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `xqjpg`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `xn4yj`
    },
    {
      name: `rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `yq2wn`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `locationLookupDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - locationDS

                

                // begin datasource - locationMapDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationMapDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 5000,
  debounceTime: 100,
  query:   {
    pageSize: 5000,
    offlineImmediateDownload: true,
    lookupData: true,
    hasPosition: true,
    select: ("locationsid,location,description,failurecode,glaccount,locpriority,parent,locationchildren,syschildren._dbcount--childcount,locsystem.primarysystem--primarysystem,syschildren._dbcount--childcount,systemid,syschildren._dbcount--childcount,type,syschildren._dbcount--childcount,status,syschildren._dbcount--childcount,siteid,syschildren._dbcount--childcount,orgid,syschildren._dbcount--childcount,autolocate,syschildren._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},syschildren._dbcount--childcount,serviceaddress.latitudey,syschildren._dbcount--childcount,serviceaddress.longitudex,syschildren._dbcount--childcount,rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},syschildren._dbcount--childcount"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    selectionMode: `single`,
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationLookupDS`,
    indexAttributes:     [
`location`,
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ]
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `locationsid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `menw3`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `dprab`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xg7p9`
    },
    {
      name: `failurecode`,
      id: `w_p4x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `wa5y4`
    },
    {
      name: `locpriority`,
      searchable: `false`,
      id: `kaxzm`
    },
    {
      name: `parent`,
      searchable: `false`,
      id: `pxj85`
    },
    {
      name: `locationchildren`,
      'child-relationship': `syschildren`,
      id: `k7mpn`
    },
    {
      name: `locsystem.primarysystem--primarysystem`,
      id: `pg4_y`
    },
    {
      name: `systemid`,
      id: `eyj5w`
    },
    {
      searchable: `true`,
      name: `type`,
      id: `anrp6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `anrp6`,
      lookup:       {
        name: `listLocationType`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      searchable: `true`,
      name: `status`,
      id: `gxzyp`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gxzyp`,
      lookup:       {
        name: `locationstatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x9_rg`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pnyry`
    },
    {
      name: `autolocate`,
      id: `vxy3g`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `a7ek5`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `xqjpg`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `xn4yj`
    },
    {
      name: `rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `yq2wn`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `locationLookupDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - locationMapDS

                

                // begin datasource - locationHierarchyDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationHierarchyDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 15,
  debounceTime: 100,
  query:   {
    pageSize: 15,
    offlineImmediateDownload: true,
    lookupData: true,
    select: ("locationsid,location,description,failurecode,glaccount,locpriority,parent,locationchildren,syschildren._dbcount--childcount,locsystem.primarysystem--primarysystem,syschildren._dbcount--childcount,systemid,syschildren._dbcount--childcount,type,syschildren._dbcount--childcount,status,syschildren._dbcount--childcount,siteid,syschildren._dbcount--childcount,orgid,syschildren._dbcount--childcount,autolocate,syschildren._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},syschildren._dbcount--childcount,serviceaddress.latitudey,syschildren._dbcount--childcount,serviceaddress.longitudex,syschildren._dbcount--childcount,rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},syschildren._dbcount--childcount"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    selectionMode: `single`,
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationLookupDS`,
    indexAttributes:     [
`location`,
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ]
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `locationsid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `menw3`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `dprab`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xg7p9`
    },
    {
      name: `failurecode`,
      id: `w_p4x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `wa5y4`
    },
    {
      name: `locpriority`,
      searchable: `false`,
      id: `kaxzm`
    },
    {
      name: `parent`,
      searchable: `false`,
      id: `pxj85`
    },
    {
      name: `locationchildren`,
      'child-relationship': `syschildren`,
      id: `k7mpn`
    },
    {
      name: `locsystem.primarysystem--primarysystem`,
      id: `pg4_y`
    },
    {
      name: `systemid`,
      id: `eyj5w`
    },
    {
      searchable: `true`,
      name: `type`,
      id: `anrp6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `anrp6`,
      lookup:       {
        name: `listLocationType`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      searchable: `true`,
      name: `status`,
      id: `gxzyp`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gxzyp`,
      lookup:       {
        name: `locationstatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x9_rg`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pnyry`
    },
    {
      name: `autolocate`,
      id: `vxy3g`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `a7ek5`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `xqjpg`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `xn4yj`
    },
    {
      name: `rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `yq2wn`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `locationLookupDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - locationHierarchyDS

                

                // begin datasource - locationJsonMapDS
                {
                  let options = {
  name: `locationJsonMapDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 5000,
  schemaExt:   [
    {
      name: `_id`,
      id: `kx67p`
    },
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `w9dme`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `yjzgq`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `gk2n4`
    },
    {
      name: `status_maxvalue`,
      id: `x42_4`
    },
    {
      name: `autolocate`,
      id: `awk5_`
    },
    {
      name: `distance`,
      type: `NUMBER`,
      id: `mmygk`
    },
    {
      name: `latitudey`,
      id: `zm3x4`
    },
    {
      name: `longitudex`,
      id: `qvndx`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `locationsid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `distance`,
    searchAttributes:     [
`location`,
`description`
    ],
    select: `_id,locationsid,location,description,status_maxvalue,autolocate,distance,latitudey,longitudex`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  canLoad: (()=>(page.state.canLoadLocationJsonMap)),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new MapLocationController();
bootstrapInspector.onNewController(controller, 'MapLocationController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - locationJsonMapDS

                

                // begin datasource - assetLookupDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `assetLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 15,
  debounceTime: 100,
  query:   {
    pageSize: 15,
    selectionMode: `single`,
    objectStructure: `MXAPIASSET`,
    savedQuery: `MOBILEASSET`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLookupDS`,
    searchAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assethealth`,
`assettag`,
`assettype`,
`binnum`,
`itemnum`,
`location`,
`location.description`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount`,
`parent`,
`status`,
`failurecode`,
`serviceaddress.formattedaddress`
    ],
    indexAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assethealth`,
`assettag`,
`assettype`,
`binnum`,
`itemnum`,
`location`,
`location.description--locationdesc`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount--locglaccount`,
`parent`,
`status`,
`failurecode`,
`serviceaddress.formattedaddress--formattedaddress`
    ],
    select: `itemnum,assetuid,assetnum,description,assethealth,assettag,assettype,binnum,isrunning,itemnum,location,location.description--locationdesc,manufacturer,priority,serialnum,siteid,vendor,assetchildren,children._dbcount--childcount,location.glaccount--locglaccount,children._dbcount--childcount,autolocate,children._dbcount--childcount,parent,children._dbcount--childcount,status,children._dbcount--childcount,failurecode,children._dbcount--childcount,location.locpriority--locpriority,children._dbcount--childcount,location.failurecode--locfailurecode,children._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},children._dbcount--childcount,rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},children._dbcount--childcount,serviceaddress.formattedaddress--formattedaddress,children._dbcount--childcount,serviceaddress.latitudey,children._dbcount--childcount,serviceaddress.longitudex,children._dbcount--childcount,classstructure.hierarchypath,children._dbcount--childcount,asset_parent.description--parentassetdesc,children._dbcount--childcount,statusdesc.description--assetstatusdesc,children._dbcount--childcount,assetmeter._dbcount--assetmetercount,children._dbcount--childcount,children._dbcount--childcount,rel.assetspec{assetattrid,measureunitid,numvalue,alnvalue,assetattribute.description--assetattributedesc,displaysequence},children._dbcount--childcount,assetspec._dbcount--assetspeccount,children._dbcount--childcount,children._dbcount--childcount`
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetuid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      searchable: `true`,
      id: `zj7q5`
    },
    {
      name: `assetuid`,
      'unique-id': `true`,
      id: `dwj59`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `k4vr_`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `npn25`
    },
    {
      name: `assethealth`,
      searchable: `true`,
      id: `nq6d6`
    },
    {
      searchable: `true`,
      name: `assettag`,
      id: `wk63p`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wk63p`,
      lookup:       {
        name: `assettag`,
        attributeMap:         [
          {
            datasourceField: `assettag`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assettag`,
            lookupField: `value`
          }
        ],
        attributeNames: `assettag`
      }
    },
    {
      searchable: `true`,
      name: `assettype`,
      id: `ypg3j`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ypg3j`,
      lookup:       {
        name: `assettype`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `n4524`
    },
    {
      name: `isrunning`,
      searchable: `false`,
      id: `dqbj6`
    },
    {
      searchable: `true`,
      name: `itemnum`,
      id: `zm3_3`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `zm3_3`,
      lookup:       {
        name: `assetitemnum`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `itemnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `itemnum,description,lottype,imageref,itemsetid`
      }
    },
    {
      searchable: `true`,
      name: `location`,
      id: `jnx97`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `jnx97`,
      lookup:       {
        name: `assetloc`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationDS`
    },
    {
      name: `location.description--locationdesc`,
      searchable: `true`,
      id: `genjm`
    },
    {
      searchable: `true`,
      name: `manufacturer`,
      id: `kz4z3`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `kz4z3`,
      lookup:       {
        name: `assetmanufacturer`,
        attributeMap:         [
          {
            datasourceField: `name`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `company`,
            lookupField: `value`
          }
        ],
        attributeNames: `company,name,type`
      }
    },
    {
      name: `priority`,
      searchable: `true`,
      id: `vvj78`
    },
    {
      searchable: `true`,
      name: `serialnum`,
      id: `mk2_2`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `mk2_2`,
      lookup:       {
        name: `assetserialnum`,
        attributeMap:         [
          {
            datasourceField: `serialnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `serialnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `serialnum`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `ew2db`
    },
    {
      name: `vendor`,
      searchable: `true`,
      id: `dn6y4`
    },
    {
      name: `assetchildren`,
      'child-relationship': `children`,
      id: `z7vm3`
    },
    {
      name: `location.glaccount--locglaccount`,
      searchable: `true`,
      id: `ynjy8`
    },
    {
      name: `autolocate`,
      id: `krpvd`
    },
    {
      name: `parent`,
      searchable: `true`,
      id: `yjv9q`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `jzndw`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `jzndw`,
      lookup:       {
        name: `assetstatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `failurecode`,
      searchable: `true`,
      id: `n78mv`
    },
    {
      name: `location.locpriority--locpriority`,
      id: `r6ykk`
    },
    {
      name: `location.failurecode--locfailurecode`,
      id: `geexx`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `yx4jk`
    },
    {
      name: `rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `zp6y9`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `jq27r`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `g2xj2`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `vjbxj`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `jr5_x`
    },
    {
      name: `asset_parent.description--parentassetdesc`,
      id: `gbdn7`
    },
    {
      name: `statusdesc.description--assetstatusdesc`,
      id: `zd3bm`
    },
    {
      name: `assetmeter._dbcount--assetmetercount`,
      id: `wy_a8`
    },
    {
      name: `rel.assetspec{assetattrid,measureunitid,numvalue,alnvalue,assetattribute.description--assetattributedesc,displaysequence}`,
      id: `g2xqm`
    },
    {
      name: `assetspec._dbcount--assetspeccount`,
      id: `brmkj`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - assetLookupDS

                

                // begin datasource - assetMapDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `assetMapDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 5000,
  debounceTime: 100,
  query:   {
    pageSize: 5000,
    offlineImmediateDownload: true,
    lookupData: true,
    hasPosition: true,
    select: ("itemnum,assetuid,assetnum,description,assethealth,assettag,assettype,binnum,isrunning,itemnum,location,location.description--locationdesc,manufacturer,priority,serialnum,siteid,vendor,assetchildren,children._dbcount--childcount,location.glaccount--locglaccount,children._dbcount--childcount,autolocate,children._dbcount--childcount,parent,children._dbcount--childcount,status,children._dbcount--childcount,failurecode,children._dbcount--childcount,location.locpriority--locpriority,children._dbcount--childcount,location.failurecode--locfailurecode,children._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},children._dbcount--childcount,rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},children._dbcount--childcount,serviceaddress.formattedaddress--formattedaddress,children._dbcount--childcount,serviceaddress.latitudey,children._dbcount--childcount,serviceaddress.longitudex,children._dbcount--childcount,classstructure.hierarchypath,children._dbcount--childcount,asset_parent.description--parentassetdesc,children._dbcount--childcount,statusdesc.description--assetstatusdesc,children._dbcount--childcount,assetmeter._dbcount--assetmetercount,children._dbcount--childcount,children._dbcount--childcount,rel.assetspec{assetattrid,measureunitid,numvalue,alnvalue,assetattribute.description--assetattributedesc,displaysequence},children._dbcount--childcount,assetspec._dbcount--assetspeccount,children._dbcount--childcount,children._dbcount--childcount"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assethealth`,
`assettag`,
`assettype`,
`binnum`,
`itemnum`,
`location`,
`location.description`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount`,
`parent`,
`status`,
`failurecode`,
`serviceaddress.formattedaddress`
    ],
    selectionMode: `single`,
    objectStructure: `MXAPIASSET`,
    savedQuery: `MOBILEASSET`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLookupDS`,
    indexAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assethealth`,
`assettag`,
`assettype`,
`binnum`,
`itemnum`,
`location`,
`location.description--locationdesc`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount--locglaccount`,
`parent`,
`status`,
`failurecode`,
`serviceaddress.formattedaddress--formattedaddress`
    ]
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetuid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      searchable: `true`,
      id: `zj7q5`
    },
    {
      name: `assetuid`,
      'unique-id': `true`,
      id: `dwj59`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `k4vr_`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `npn25`
    },
    {
      name: `assethealth`,
      searchable: `true`,
      id: `nq6d6`
    },
    {
      searchable: `true`,
      name: `assettag`,
      id: `wk63p`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wk63p`,
      lookup:       {
        name: `assettag`,
        attributeMap:         [
          {
            datasourceField: `assettag`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assettag`,
            lookupField: `value`
          }
        ],
        attributeNames: `assettag`
      }
    },
    {
      searchable: `true`,
      name: `assettype`,
      id: `ypg3j`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ypg3j`,
      lookup:       {
        name: `assettype`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `n4524`
    },
    {
      name: `isrunning`,
      searchable: `false`,
      id: `dqbj6`
    },
    {
      searchable: `true`,
      name: `itemnum`,
      id: `zm3_3`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `zm3_3`,
      lookup:       {
        name: `assetitemnum`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `itemnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `itemnum,description,lottype,imageref,itemsetid`
      }
    },
    {
      searchable: `true`,
      name: `location`,
      id: `jnx97`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `jnx97`,
      lookup:       {
        name: `assetloc`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationDS`
    },
    {
      name: `location.description--locationdesc`,
      searchable: `true`,
      id: `genjm`
    },
    {
      searchable: `true`,
      name: `manufacturer`,
      id: `kz4z3`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `kz4z3`,
      lookup:       {
        name: `assetmanufacturer`,
        attributeMap:         [
          {
            datasourceField: `name`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `company`,
            lookupField: `value`
          }
        ],
        attributeNames: `company,name,type`
      }
    },
    {
      name: `priority`,
      searchable: `true`,
      id: `vvj78`
    },
    {
      searchable: `true`,
      name: `serialnum`,
      id: `mk2_2`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `mk2_2`,
      lookup:       {
        name: `assetserialnum`,
        attributeMap:         [
          {
            datasourceField: `serialnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `serialnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `serialnum`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `ew2db`
    },
    {
      name: `vendor`,
      searchable: `true`,
      id: `dn6y4`
    },
    {
      name: `assetchildren`,
      'child-relationship': `children`,
      id: `z7vm3`
    },
    {
      name: `location.glaccount--locglaccount`,
      searchable: `true`,
      id: `ynjy8`
    },
    {
      name: `autolocate`,
      id: `krpvd`
    },
    {
      name: `parent`,
      searchable: `true`,
      id: `yjv9q`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `jzndw`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `jzndw`,
      lookup:       {
        name: `assetstatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `failurecode`,
      searchable: `true`,
      id: `n78mv`
    },
    {
      name: `location.locpriority--locpriority`,
      id: `r6ykk`
    },
    {
      name: `location.failurecode--locfailurecode`,
      id: `geexx`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `yx4jk`
    },
    {
      name: `rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `zp6y9`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `jq27r`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `g2xj2`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `vjbxj`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `jr5_x`
    },
    {
      name: `asset_parent.description--parentassetdesc`,
      id: `gbdn7`
    },
    {
      name: `statusdesc.description--assetstatusdesc`,
      id: `zd3bm`
    },
    {
      name: `assetmeter._dbcount--assetmetercount`,
      id: `wy_a8`
    },
    {
      name: `rel.assetspec{assetattrid,measureunitid,numvalue,alnvalue,assetattribute.description--assetattributedesc,displaysequence}`,
      id: `g2xqm`
    },
    {
      name: `assetspec._dbcount--assetspeccount`,
      id: `brmkj`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `assetLookupDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - assetMapDS

                

                // begin datasource - assetJsonMapDS
                {
                  let options = {
  name: `assetJsonMapDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 5000,
  schemaExt:   [
    {
      name: `_id`,
      id: `bj8jq`
    },
    {
      name: `assetuid`,
      'unique-id': `true`,
      id: `k79ma`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `b6dmk`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ben3w`
    },
    {
      name: `status_maxvalue`,
      id: `jre6r`
    },
    {
      name: `autolocate`,
      id: `x4e43`
    },
    {
      name: `distance`,
      type: `NUMBER`,
      id: `jp5q3`
    },
    {
      name: `latitudey`,
      id: `ny8p8`
    },
    {
      name: `longitudex`,
      id: `rqq96`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `assetuid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `distance`,
    searchAttributes:     [
`assetnum`,
`description`
    ],
    select: `_id,assetuid,assetnum,description,status_maxvalue,autolocate,distance,latitudey,longitudex`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  canLoad: (()=>(page.state.canLoadAssetJsonMap)),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new MapAssetController();
bootstrapInspector.onNewController(controller, 'MapAssetController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - assetJsonMapDS

                

                // begin datasource - SRListds
                {
                  let options = {
  name: `SRListds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `label`,
      id: `pqyvz`
    },
    {
      name: `viewindex`,
      id: `k8k8k`
    },
    {
      name: `value`,
      id: `j7eq7`
    },
    {
      name: `requiredstate`,
      id: `vampr`
    },
    {
      name: `closehide`,
      id: `gxg4p`
    },
    {
      name: `showvaluefield`,
      id: `pk2we`
    },
    {
      name: `showbutton1field`,
      id: `m_4vy`
    },
    {
      name: `showdescfield`,
      id: `qmp7a`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `label,viewindex,value,requiredstate,closehide,showvaluefield,showbutton1field,showdescfield`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListds

                

                // begin datasource - SRListDetailsDS
                {
                  let options = {
  name: `SRListDetailsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListDetailsDS

                

                // begin datasource - SRListContactDS
                {
                  let options = {
  name: `SRListContactDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListContactDS

                

                // begin datasource - SRListLocationDS
                {
                  let options = {
  name: `SRListLocationDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListLocationDS

                

                // begin datasource - SRListAssetDS
                {
                  let options = {
  name: `SRListAssetDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListAssetDS

                

                // begin datasource - SRListSaDS
                {
                  let options = {
  name: `SRListSaDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListSaDS

                

                // begin datasource - SRListAttachDS
                {
                  let options = {
  name: `SRListAttachDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `label`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - SRListAttachDS

                

                // begin datasource - newTicketSpecJDS
                {
                  let options = {
  name: `newTicketSpecJDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `ticketid`,
      id: `v9qn6`
    },
    {
      name: `templateid`,
      type: `STRING`,
      id: `n_8gr`
    },
    {
      name: `tktemplatespecid`,
      'unique-id': `true`,
      id: `znab8`
    },
    {
      name: `assetattrid`,
      id: `pjq54`
    },
    {
      name: `assetattrid_description`,
      id: `wzke2`
    },
    {
      name: `assetattribute.description`,
      id: `bbvqz`
    },
    {
      name: `classstructureid`,
      id: `axjad`
    },
    {
      name: `refobjectid`,
      id: `z27az`
    },
    {
      name: `refobjectname`,
      id: `xrerb`
    },
    {
      name: `mandatory`,
      id: `b2a8m`
    },
    {
      name: `displaysequence`,
      id: `e7yqa`
    },
    {
      name: `alnvalue`,
      'sub-type': `ALN`,
      id: `gx4yk`
    },
    {
      name: `numvalue`,
      'sub-type': `DECIMAL`,
      id: `qyyk5`
    },
    {
      name: `tablevalue`,
      id: `wzg7v`
    },
    {
      name: `datevalue`,
      'sub-type': `DATE`,
      id: `eg576`
    },
    {
      name: `assetattributedesc`,
      id: `kqm4g`
    },
    {
      name: `assetattributedatatype`,
      id: `jmn5z`
    },
    {
      name: `assetattributedatatype_maxvalue`,
      id: `p79jn`
    },
    {
      name: `assetattributedomainid`,
      id: `nxyma`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `tktemplatespecid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `displaysequence asc`,
    select: `ticketid,templateid,tktemplatespecid,assetattrid,assetattrid_description,assetattribute.description,classstructureid,refobjectid,refobjectname,mandatory,displaysequence,alnvalue,numvalue,tablevalue,datevalue,assetattributedesc,assetattributedatatype,assetattributedatatype_maxvalue,assetattributedomainid`,
    src: (page.state.newTicketSpecSRC)
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - newTicketSpecJDS

                
          
                // begin dialog - alnLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `alnLookup`,
  configuration:   {
    id: `alnLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupAlnLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupAlnLookup {...props} />
    );
  })
  ),
    resetDatasource: false
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - alnLookup
                

                // begin dialog - stateProvinceLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `stateProvinceLookup`,
  configuration:   {
    id: `stateProvinceLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupStateProvinceLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupStateProvinceLookup {...props} />
    );
  })
  ),
    resetDatasource: true
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - stateProvinceLookup
                

                // begin dialog - personLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `personLookup`,
  configuration:   {
    id: `personLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupPersonLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupPersonLookup {...props} />
    );
  })
  ),
    resetDatasource: true
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - personLookup
                

                // begin dialog - locationLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `locationLookup`,
  configuration:   {
    id: `locationLookup`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterLocationLookup {...props} />
    );
  })
  ),
    resetDatasource: false
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - locationLookup
                

                // begin dialog - locationDrilldownLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `locationDrilldownLookup`,
  configuration:   {
    id: `locationDrilldownLookup`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterLocationDrilldownLookup {...props} />
    );
  })
  ),
    resetDatasource: false
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - locationDrilldownLookup
                

                // begin dialog - assetLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `assetLookup`,
  configuration:   {
    id: `assetLookup`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterAssetLookup {...props} />
    );
  })
  ),
    resetDatasource: false
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - assetLookup
                

                // begin dialog - tableDomainLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `tableDomainLookup`,
  configuration:   {
    id: `tableDomainLookup`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterTableDomainLookup {...props} />
    );
  })
  ),
    resetDatasource: true
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - tableDomainLookup
                

                // begin dialog - confirmSubmitYesNo
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `confirmSubmitYesNo`,
  configuration:   {
    id: `confirmSubmitYesNo`,
    dialogRenderer: ((props => {
    return (
      <DialogConfirmSubmitYesNo id={"confirmSubmitYesNo_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - confirmSubmitYesNo
                

                // begin dialog - cannotSubmit
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `cannotSubmit`,
  configuration:   {
    id: `cannotSubmit`,
    dialogRenderer: ((props => {
    return (
      <DialogCannotSubmit id={"cannotSubmit_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - cannotSubmit
                

                // begin dialog - mapDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `mapDialog`,
  configuration:   {
    id: `mapDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogMapDialog id={"mapDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - mapDialog
                

                // begin dialog - sysMsgAssetMismatchDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `sysMsgAssetMismatchDialog`,
  configuration:   {
    id: `sysMsgAssetMismatchDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSysMsgAssetMismatchDialog id={"sysMsgAssetMismatchDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - sysMsgAssetMismatchDialog
                

                // begin dialog - sysMsgLocationMismatchDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `sysMsgLocationMismatchDialog`,
  configuration:   {
    id: `sysMsgLocationMismatchDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSysMsgLocationMismatchDialog id={"sysMsgLocationMismatchDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - sysMsgLocationMismatchDialog
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'newRequest' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'newRequest', clearStack: true, parent: app, route: '/newRequest/*', title: app.getLocalizedLabel("newRequest_title", "newRequest"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new NavigatorController();
                bootstrapInspector.onNewController(controller, 'NavigatorController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'SubCategory' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'SubCategory', clearStack: false, parent: app, route: '/SubCategory/*', title: 'SubCategory', usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"initLastSelectedID":0,"initLastSelectedDesc":""}, 'page'), {});

        
              {
                let controller = new SubCategoryController();
                bootstrapInspector.onNewController(controller, 'SubCategoryController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'tktemp' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'tktemp', clearStack: false, parent: app, route: '/tktemp/*', title: app.getLocalizedLabel("tktemp_title", "Type"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new TKTemplateController();
                bootstrapInspector.onNewController(controller, 'TKTemplateController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

    app.setRoutesForApplication(() => {return [
  {
    id: `main_w6_yq`,
    label: (app.getLocalizedLabel("w6_yq_label", "Service Requests")),
    icon: ("maximo:service--request"),
    application: `srmobile`,
    name: `main`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'main' }, event)}),
    page: `main`,
    content: (app.getLocalizedLabel("w6_yq_label", "Service Requests"))
  },
  {
    id: `newRequest_e8w5x`,
    label: (app.getLocalizedLabel("e8w5x_label", "Create Service Request")),
    icon: ("maximo:add--record"),
    application: `srmobile`,
    name: `newRequest`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'newRequest' }, event)}),
    actionType: `add`,
    page: `newRequest`,
    content: (app.getLocalizedLabel("e8w5x_label", "Create Service Request"))
  },
  {
    id: `startcenterapp`,
    label: (app.getLocalizedLabel("startcntr_route_label", "Start Center")),
    icon: ("maximo:start-center"),
    application: `srmobile`,
    name: `startCenter`,
    hidden: (!(app?.options?.isMaximoApp && !app.device.isMaximoMobile && app.options.theme==="touch")),
    onClick: ((event)=>{app.appSwitcher.gotoApplication('STARTCNTR', null, {ignoreCheck: true, preserveCurrentState: false});}),
    page: `startCenter`,
    content: (app.getLocalizedLabel("startcntr_route_label", "Start Center"))
  }
];});
    
                // begin datasource - synonymdomainDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `synonymdomainDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `mxapisynonymdomain`,
    savedQuery: `MOBILEDOMAIN`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `synonymdomainDS`,
    searchAttributes:     [
`maxvalue`,
`domainid`,
`valueid`,
`siteid`,
`orgid`,
`defaults`
    ],
    indexAttributes:     [
`maxvalue`,
`domainid`,
`valueid`,
`siteid`,
`orgid`,
`defaults`
    ],
    select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
  },
  objectStructure: `mxapisynonymdomain`,
  idAttribute: `valueid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      id: `xp2e9`
    },
    {
      name: `maxvalue`,
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
      'unique-id': `true`,
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
      searchable: `true`,
      id: `avz96`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - synonymdomainDS

                

                // begin datasource - alndomainDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `alndomainDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `alndomainDS`,
    searchAttributes:     [
`value`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`value`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    select: `value,description,domainid,valueid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `valueid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      searchable: `true`,
      id: `xpbp2`
    },
    {
      name: `description`,
      id: `naa79`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `gngyn`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `rjex4`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `pnw5r`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `k5jyd`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - alndomainDS

                

                // begin datasource - stateProvinceList
                {
                  let options = {
  platform: `maximoMobile`,
  name: `stateProvinceList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: `domainid="STATEPROVINCE"`,
    mobileQbeFilter: ({'domainid': '=STATEPROVINCE'}),
    select: `value,description,domainid,valueid,siteid,orgid`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`value`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `alndomainDS`,
    indexAttributes:     [
`value`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ]
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `valueid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      searchable: `true`,
      id: `xpbp2`
    },
    {
      name: `description`,
      id: `naa79`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `gngyn`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `rjex4`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `pnw5r`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `k5jyd`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `alndomainDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `mobileQbeFilter`,
      lastValue: ({'domainid': '=STATEPROVINCE'}),
      check: (()=>{return {'domainid': '=STATEPROVINCE'}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - stateProvinceList

                

                // begin datasource - tableDomainDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `tableDomainDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 5000,
  debounceTime: 100,
  query:   {
    pageSize: 5000,
    cacheExpiryMs: NaN,
    selectionMode: `single`,
    objectStructure: `MXAPITABLEDOMAIN`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `tableDomainDS`,
    searchAttributes:     [
`value`,
`description`
    ],
    indexAttributes:     [
`value`,
`description`
    ],
    select: `value,description,domainid,siteid,orgid`
  },
  objectStructure: `MXAPITABLEDOMAIN`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      searchable: `true`,
      id: `e93yv`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xabb_`
    },
    {
      name: `domainid`,
      id: `q5b8d`
    },
    {
      name: `siteid`,
      id: `rx9nd`
    },
    {
      name: `orgid`,
      id: `er7gn`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - tableDomainDS

                

                // begin datasource - defaultSetDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `defaultSetDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `mxapiorganization`,
    savedQuery: `MOBILEORG`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `defaultSetDs`,
    searchAttributes:     [
`orgid`
    ],
    indexAttributes:     [
`orgid`
    ],
    select: `itemsetid,orgid,rel.maxvars{*}`
  },
  objectStructure: `mxapiorganization`,
  idAttribute: `orgid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemsetid`,
      id: `x4pne`
    },
    {
      name: `orgid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `mr8av`
    },
    {
      name: `rel.maxvars{*}`,
      id: `yd8ea`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - defaultSetDs

                

                // begin datasource - tktemplateds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `tktemplateds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    cacheExpiryMs: NaN,
    orderBy: `sortorder`,
    objectStructure: `mxapitktemplate`,
    savedQuery: `SERVICEREQUESTTKTEMPLATE`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `tktemplateds`,
    searchAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`description`
    ],
    indexAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`classstructureid`,
`description`,
`templateid`
    ],
    select: `class,class_description,classstructureid,description,ownergroup,sortorder,status,templateid,tktemplateid,instractions--instructions,instractions_longdescription--longinstructions,rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid},orgid`
  },
  objectStructure: `mxapitktemplate`,
  idAttribute: `tktemplateid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `class`,
      searchable: `true`,
      id: `w6nvg`
    },
    {
      name: `class_description`,
      searchable: `true`,
      id: `d3gzw`
    },
    {
      name: `classstructureid`,
      searchable: `true`,
      index: `true`,
      id: `peq2n`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ry4xb`
    },
    {
      name: `ownergroup`,
      id: `pyavb`
    },
    {
      name: `sortorder`,
      id: `zd7_9`
    },
    {
      name: `status`,
      id: `vv7x6`
    },
    {
      name: `templateid`,
      'unique-id': `true`,
      index: `true`,
      id: `eaa3j`
    },
    {
      name: `tktemplateid`,
      'unique-id': `true`,
      id: `kp84b`
    },
    {
      name: `instractions--instructions`,
      id: `p4n36`
    },
    {
      name: `instractions_longdescription--longinstructions`,
      id: `k5gkv`
    },
    {
      name: `rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid}`,
      id: `m85zw`
    },
    {
      name: `orgid`,
      id: `p8x53`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - tktemplateds

                

                // begin datasource - checktktds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `checktktds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    offlineImmediateDownload: true,
    lookupData: true,
    savedQuery: `SERVICEREQUESTTKTEMPLATE`,
    selectionMode: `single`,
    orderBy: `sortorder`,
    cacheExpiryMs: NaN,
    select: ("class,class_description,classstructureid,description,ownergroup,sortorder,status,templateid,tktemplateid,instractions--instructions,instractions_longdescription--longinstructions,rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid},orgid"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`description`
    ],
    objectStructure: `mxapitktemplate`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `tktemplateds`,
    indexAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`classstructureid`,
`description`,
`templateid`
    ]
  },
  objectStructure: `mxapitktemplate`,
  idAttribute: `tktemplateid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `class`,
      searchable: `true`,
      id: `w6nvg`
    },
    {
      name: `class_description`,
      searchable: `true`,
      id: `d3gzw`
    },
    {
      name: `classstructureid`,
      searchable: `true`,
      index: `true`,
      id: `peq2n`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ry4xb`
    },
    {
      name: `ownergroup`,
      id: `pyavb`
    },
    {
      name: `sortorder`,
      id: `zd7_9`
    },
    {
      name: `status`,
      id: `vv7x6`
    },
    {
      name: `templateid`,
      'unique-id': `true`,
      index: `true`,
      id: `eaa3j`
    },
    {
      name: `tktemplateid`,
      'unique-id': `true`,
      id: `kp84b`
    },
    {
      name: `instractions--instructions`,
      id: `p4n36`
    },
    {
      name: `instractions_longdescription--longinstructions`,
      id: `k5gkv`
    },
    {
      name: `rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid}`,
      id: `m85zw`
    },
    {
      name: `orgid`,
      id: `p8x53`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `tktemplateds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - checktktds

                

                // begin datasource - tktempds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `tktempds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    offlineImmediateDownload: true,
    lookupData: true,
    savedQuery: `SERVICEREQUESTTKTEMPLATE`,
    selectionMode: `single`,
    cacheExpiryMs: NaN,
    select: ("class,class_description,classstructureid,description,ownergroup,sortorder,status,templateid,tktemplateid,instractions--instructions,instractions_longdescription--longinstructions,rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid},orgid"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`description`
    ],
    orderBy: `sortorder`,
    objectStructure: `mxapitktemplate`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `tktemplateds`,
    indexAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`classstructureid`,
`description`,
`templateid`
    ]
  },
  objectStructure: `mxapitktemplate`,
  idAttribute: `tktemplateid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `class`,
      searchable: `true`,
      id: `w6nvg`
    },
    {
      name: `class_description`,
      searchable: `true`,
      id: `d3gzw`
    },
    {
      name: `classstructureid`,
      searchable: `true`,
      index: `true`,
      id: `peq2n`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ry4xb`
    },
    {
      name: `ownergroup`,
      id: `pyavb`
    },
    {
      name: `sortorder`,
      id: `zd7_9`
    },
    {
      name: `status`,
      id: `vv7x6`
    },
    {
      name: `templateid`,
      'unique-id': `true`,
      index: `true`,
      id: `eaa3j`
    },
    {
      name: `tktemplateid`,
      'unique-id': `true`,
      id: `kp84b`
    },
    {
      name: `instractions--instructions`,
      id: `p4n36`
    },
    {
      name: `instractions_longdescription--longinstructions`,
      id: `k5gkv`
    },
    {
      name: `rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid}`,
      id: `m85zw`
    },
    {
      name: `orgid`,
      id: `p8x53`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `tktemplateds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - tktempds

                

                // begin datasource - typeValidationDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `typeValidationDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    offlineImmediateDownload: true,
    lookupData: true,
    savedQuery: `SERVICEREQUESTTKTEMPLATE`,
    selectionMode: `single`,
    cacheExpiryMs: NaN,
    select: ("class,class_description,classstructureid,description,ownergroup,sortorder,status,templateid,tktemplateid,instractions--instructions,instractions_longdescription--longinstructions,rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid},orgid"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`description`
    ],
    orderBy: `sortorder`,
    objectStructure: `mxapitktemplate`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `tktemplateds`,
    indexAttributes:     [
`class`,
`class_description`,
`classstructureid`,
`classstructureid`,
`description`,
`templateid`
    ]
  },
  objectStructure: `mxapitktemplate`,
  idAttribute: `tktemplateid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `class`,
      searchable: `true`,
      id: `w6nvg`
    },
    {
      name: `class_description`,
      searchable: `true`,
      id: `d3gzw`
    },
    {
      name: `classstructureid`,
      searchable: `true`,
      index: `true`,
      id: `peq2n`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ry4xb`
    },
    {
      name: `ownergroup`,
      id: `pyavb`
    },
    {
      name: `sortorder`,
      id: `zd7_9`
    },
    {
      name: `status`,
      id: `vv7x6`
    },
    {
      name: `templateid`,
      'unique-id': `true`,
      index: `true`,
      id: `eaa3j`
    },
    {
      name: `tktemplateid`,
      'unique-id': `true`,
      id: `kp84b`
    },
    {
      name: `instractions--instructions`,
      id: `p4n36`
    },
    {
      name: `instractions_longdescription--longinstructions`,
      id: `k5gkv`
    },
    {
      name: `rel.tktemplatespec{*,assetattribute.description--assetattributedesc,assetattribute.datatype--assetattributedatatype,assetattribute.domainid--assetattributedomainid}`,
      id: `m85zw`
    },
    {
      name: `orgid`,
      id: `p8x53`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `tktemplateds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - typeValidationDS

                

                // begin datasource - tktemplatedsui
                {
                  let options = {
  name: `tktemplatedsui`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - tktemplatedsui

                

                // begin datasource - allcategoryds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `allcategoryds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 25,
  debounceTime: 100,
  query:   {
    pageSize: 25,
    selectionMode: `single`,
    orderBy: `sortorder`,
    objectStructure: `mxapitkclass`,
    savedQuery: `MOBILECLASSSTRUCTURE`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `allcategoryds`,
    searchAttributes:     [
`classificationid`,
`classificationdesc`,
`description`,
`parent`
    ],
    indexAttributes:     [
`classificationid`,
`classificationdesc`,
`classstructureid`,
`description`,
`parent`,
`parent`,
`classusewithsr._exists--usewithsr`
    ],
    select: `classificationid,classificationdesc,classstructureid,classstructureuid,description,haschildren,show,sortorder,useclassindesc,_id,_imagelibref,siteid,orgid,parent,rel.classusewith{objectname},hierarchypath,classusewithsr._exists--usewithsr`
  },
  objectStructure: `mxapitkclass`,
  idAttribute: `classstructureid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `classificationid`,
      searchable: `true`,
      id: `en5e5`
    },
    {
      name: `classificationdesc`,
      searchable: `true`,
      id: `wa5x6`
    },
    {
      name: `classstructureid`,
      'unique-id': `true`,
      index: `true`,
      id: `jgp6e`
    },
    {
      name: `classstructureuid`,
      id: `jd3ar`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `kwe8r`
    },
    {
      name: `haschildren`,
      id: `q5d5x`
    },
    {
      name: `show`,
      id: `r37za`
    },
    {
      name: `sortorder`,
      id: `zg2xx`
    },
    {
      name: `useclassindesc`,
      id: `zw82r`
    },
    {
      name: `_id`,
      id: `r_k_d`
    },
    {
      name: `_imagelibref`,
      id: `v2dw7`
    },
    {
      name: `siteid`,
      id: `qavrg`
    },
    {
      name: `orgid`,
      id: `qdyd3`
    },
    {
      name: `parent`,
      index: `true`,
      searchable: `true`,
      id: `qdye8`
    },
    {
      name: `rel.classusewith{objectname}`,
      id: `en5e2`
    },
    {
      name: `hierarchypath`,
      id: `en5ex`
    },
    {
      name: `displayIcon`,
      local: (true),
      id: `ad68d`
    },
    {
      name: `classusewithsr._exists--usewithsr`,
      index: `true`,
      id: `d7re7`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.isMobileContainer||app.state.canLoad.categories)),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CategoryDataController();
bootstrapInspector.onNewController(controller, 'CategoryDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - allcategoryds

                

                // begin datasource - subcategoryds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `subcategoryds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 25,
  debounceTime: 100,
  query:   {
    pageSize: 25,
    offlineImmediateDownload: true,
    lookupData: true,
    savedQuery: `MOBILECLASSSTRUCTURE`,
    selectionMode: `single`,
    orderBy: `sortorder`,
    cacheExpiryMs: NaN,
    select: ("classificationid,classificationdesc,classstructureid,classstructureuid,description,haschildren,show,sortorder,useclassindesc,_id,_imagelibref,siteid,orgid,parent,rel.classusewith{objectname},hierarchypath,classusewithsr._exists--usewithsr"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`classificationid`,
`classificationdesc`,
`description`,
`parent`
    ],
    objectStructure: `mxapitkclass`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `allcategoryds`,
    indexAttributes:     [
`classificationid`,
`classificationdesc`,
`classstructureid`,
`description`,
`parent`,
`parent`,
`classusewithsr._exists--usewithsr`
    ]
  },
  objectStructure: `mxapitkclass`,
  idAttribute: `classstructureid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `classificationid`,
      searchable: `true`,
      id: `en5e5`
    },
    {
      name: `classificationdesc`,
      searchable: `true`,
      id: `wa5x6`
    },
    {
      name: `classstructureid`,
      'unique-id': `true`,
      index: `true`,
      id: `jgp6e`
    },
    {
      name: `classstructureuid`,
      id: `jd3ar`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `kwe8r`
    },
    {
      name: `haschildren`,
      id: `q5d5x`
    },
    {
      name: `show`,
      id: `r37za`
    },
    {
      name: `sortorder`,
      id: `zg2xx`
    },
    {
      name: `useclassindesc`,
      id: `zw82r`
    },
    {
      name: `_id`,
      id: `r_k_d`
    },
    {
      name: `_imagelibref`,
      id: `v2dw7`
    },
    {
      name: `siteid`,
      id: `qavrg`
    },
    {
      name: `orgid`,
      id: `qdyd3`
    },
    {
      name: `parent`,
      index: `true`,
      searchable: `true`,
      id: `qdye8`
    },
    {
      name: `rel.classusewith{objectname}`,
      id: `en5e2`
    },
    {
      name: `hierarchypath`,
      id: `en5ex`
    },
    {
      name: `displayIcon`,
      local: (true),
      id: `ad68d`
    },
    {
      name: `classusewithsr._exists--usewithsr`,
      index: `true`,
      id: `d7re7`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `allcategoryds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CategoryDataController();
bootstrapInspector.onNewController(controller, 'CategoryDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - subcategoryds

                

                // begin datasource - categoryValidationDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `categoryValidationDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 25,
  debounceTime: 100,
  query:   {
    pageSize: 25,
    offlineImmediateDownload: true,
    lookupData: true,
    savedQuery: `MOBILECLASSSTRUCTURE`,
    cacheExpiryMs: NaN,
    select: ("classificationid,classificationdesc,classstructureid,classstructureuid,description,haschildren,show,sortorder,useclassindesc,_id,_imagelibref,siteid,orgid,parent,rel.classusewith{objectname},hierarchypath,classusewithsr._exists--usewithsr"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`classificationid`,
`classificationdesc`,
`description`,
`parent`
    ],
    selectionMode: `single`,
    orderBy: `sortorder`,
    objectStructure: `mxapitkclass`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `allcategoryds`,
    indexAttributes:     [
`classificationid`,
`classificationdesc`,
`classstructureid`,
`description`,
`parent`,
`parent`,
`classusewithsr._exists--usewithsr`
    ]
  },
  objectStructure: `mxapitkclass`,
  idAttribute: `classstructureid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `classificationid`,
      searchable: `true`,
      id: `en5e5`
    },
    {
      name: `classificationdesc`,
      searchable: `true`,
      id: `wa5x6`
    },
    {
      name: `classstructureid`,
      'unique-id': `true`,
      index: `true`,
      id: `jgp6e`
    },
    {
      name: `classstructureuid`,
      id: `jd3ar`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `kwe8r`
    },
    {
      name: `haschildren`,
      id: `q5d5x`
    },
    {
      name: `show`,
      id: `r37za`
    },
    {
      name: `sortorder`,
      id: `zg2xx`
    },
    {
      name: `useclassindesc`,
      id: `zw82r`
    },
    {
      name: `_id`,
      id: `r_k_d`
    },
    {
      name: `_imagelibref`,
      id: `v2dw7`
    },
    {
      name: `siteid`,
      id: `qavrg`
    },
    {
      name: `orgid`,
      id: `qdyd3`
    },
    {
      name: `parent`,
      index: `true`,
      searchable: `true`,
      id: `qdye8`
    },
    {
      name: `rel.classusewith{objectname}`,
      id: `en5e2`
    },
    {
      name: `hierarchypath`,
      id: `en5ex`
    },
    {
      name: `displayIcon`,
      local: (true),
      id: `ad68d`
    },
    {
      name: `classusewithsr._exists--usewithsr`,
      index: `true`,
      id: `d7re7`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `allcategoryds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CategoryDataController();
bootstrapInspector.onNewController(controller, 'CategoryDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - categoryValidationDS

                

                // begin datasource - srDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `srDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 5,
  debounceTime: 100,
  query:   {
    pageSize: 5,
    selectionMode: `single`,
    orderBy: `reportdate desc`,
    autoSave: false,
    objectStructure: `mxapisr`,
    savedQuery: `SERVICEREQUEST`,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `srDS`,
    searchAttributes:     [
`ticketid`,
`description`,
`status`,
`location`,
`assetnum`,
`reportedpriority`,
`serviceaddress.formattedaddress`
    ],
    indexAttributes:     [
`ticketid`,
`description`,
`status`,
`location`,
`assetnum`,
`reportedpriority`,
`serviceaddress.formattedaddress--formattedaddress`
    ],
    select: `ticketid,ticketuid,class,orgid,siteid,reportdate,targetfinish,description,description_longdescription,status,status_description,status_maxvalue,historyflag,classstructureid,templateid,rel.ticketspecclass{*},location,location.description--locationdesc,autolocate,assetnum,asset.description--assetdesc,assetorgid,assetsiteid,reportedby,reportedbyid,reportedbyname,reportedphone,reportedemail,affectedperson,affectedphone,affectedemail,reportedpriority,reportedpriority_description,serviceaddress.formattedaddress--formattedaddress,serviceaddress.streetaddress--streetaddress,serviceaddress.city--city,serviceaddress.stateprovince--stateprovince,serviceaddress.latitudey--latitudey,serviceaddress.longitudex--longitudex,relatedwo._exists--relatedwoexists,uxworklog._dbcount--worklogcount,doclinks_srmobile._dbcount--doclinkscount`
  },
  objectStructure: `mxapisr`,
  idAttribute: `ticketuid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `ticketid`,
      searchable: `true`,
      id: `pgmxz`
    },
    {
      name: `ticketuid`,
      'unique-id': `true`,
      searchable: `false`,
      id: `a763x`
    },
    {
      name: `class`,
      searchable: `false`,
      id: `z8x9a`
    },
    {
      name: `orgid`,
      searchable: `false`,
      id: `zj9_a`
    },
    {
      name: `siteid`,
      searchable: `false`,
      id: `n3pjg`
    },
    {
      name: `reportdate`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      id: `k8av2`
    },
    {
      name: `targetfinish`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      id: `qm_je`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `description_longdescription`,
      searchable: `false`,
      id: `b4aw4`
    },
    {
      name: `computedSRDescription`,
      'computed-function': `computedSRDescription`,
      id: `e7qm4`,
      computed: (true),
      local: (true)
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wdbj8`
    },
    {
      name: `status_description`,
      searchable: `false`,
      id: `nxdbv`
    },
    {
      name: `status_maxvalue`,
      id: `j6wea`
    },
    {
      name: `historyflag`,
      id: `x8a6q`
    },
    {
      name: `classstructureid`,
      id: `dzzab`
    },
    {
      name: `templateid`,
      id: `yjgbb`
    },
    {
      name: `rel.ticketspecclass{*}`,
      id: `dxbrb`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `aj6be`
    },
    {
      name: `location.description--locationdesc`,
      searchable: `false`,
      id: `egx54`
    },
    {
      name: `autolocate`,
      id: `j8ada`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `m3z5g`
    },
    {
      name: `asset.description--assetdesc`,
      searchable: `false`,
      id: `pr9vv`
    },
    {
      name: `assetorgid`,
      id: `d_r6v`
    },
    {
      name: `assetsiteid`,
      id: `pv6px`
    },
    {
      name: `reportedby`,
      id: `ndqkv`
    },
    {
      name: `reportedbyid`,
      id: `de4gj`
    },
    {
      name: `reportedbyname`,
      id: `rk_8j`
    },
    {
      name: `reportedphone`,
      id: `x3rq2`
    },
    {
      name: `reportedemail`,
      id: `j4rrr`
    },
    {
      name: `affectedperson`,
      id: `m64qp`
    },
    {
      name: `affectedphone`,
      id: `a_k59`
    },
    {
      name: `affectedemail`,
      id: `jxav_`
    },
    {
      name: `reportedpriority`,
      searchable: `true`,
      id: `ge9nk`
    },
    {
      name: `reportedpriority_description`,
      searchable: `false`,
      id: `bw9r8`
    },
    {
      name: `computedSRStatusPriority`,
      'computed-function': `computedSRStatusPriority`,
      id: `mgz7e`,
      computed: (true),
      local: (true)
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `b2wr8`
    },
    {
      name: `serviceaddress.streetaddress--streetaddress`,
      id: `q32g8`
    },
    {
      name: `serviceaddress.city--city`,
      id: `xvv25`
    },
    {
      name: `serviceaddress.stateprovince--stateprovince`,
      id: `b3qwk`
    },
    {
      name: `serviceaddress.latitudey--latitudey`,
      id: `a7da6`
    },
    {
      name: `serviceaddress.longitudex--longitudex`,
      id: `gw62x`
    },
    {
      name: `relatedwo._exists--relatedwoexists`,
      id: `znn8z`
    },
    {
      name: `uxworklog._dbcount--worklogcount`,
      id: `w74m3`
    },
    {
      name: `doclinks_srmobile._dbcount--doclinkscount`,
      id: `eyjrv`
    },
    {
      name: `computedWorklogCount`,
      'computed-function': `computedWorklogCount`,
      id: `x9v9e`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDoclinksCount`,
      'computed-function': `computedDoclinksCount`,
      id: `zrw8x`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedSRDescription:     {
      computedFunction: ((item, datasource) => datasource.callController('computedSRDescription', item))
    },
    computedSRStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedSRStatusPriority', item))
    },
    computedWorklogCount:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorklogCount', item))
    },
    computedDoclinksCount:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDoclinksCount', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoad.sr)),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new SRDataController();
bootstrapInspector.onNewController(controller, 'SRDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - srDS

                

                // begin datasource - worklogDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `worklogDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `uxworklog`,
    objectName: `worklog`,
    dependsOn: `srDS`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: NaN,
    select: `createdate,description,description_longdescription,createby,logtype,clientviewable,worklogid,anywhererefid,person.displayname--displayname`,
    dsParentObject: `mxapisr`
  },
  objectStructure: `mxapisr`,
  idAttribute: `worklogid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `createdate`,
      id: `qmebe`
    },
    {
      name: `description`,
      id: `gmkmb`
    },
    {
      name: `description_longdescription`,
      id: `gmb4n`
    },
    {
      name: `createby`,
      id: `xgxmj`
    },
    {
      name: `logtype`,
      id: `k7vz6`
    },
    {
      name: `clientviewable`,
      id: `zg64j`
    },
    {
      name: `worklogid`,
      'unique-id': `true`,
      id: `gmdye`
    },
    {
      name: `anywhererefid`,
      id: `n7wzy`
    },
    {
      name: `person.displayname--displayname`,
      id: `qe78e`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `srDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoad.worklog)),
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - worklogDS

                

                // begin datasource - attachmentDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `attachmentDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    attachment: true,
    relationship: `doclinks`,
    dependsOn: `srDS`,
    selectionMode: `none`,
    select: `*`,
    dsParentObject: `mxapisr`
  },
  objectStructure: `mxapisr`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `*`,
      id: `yyb44`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `srDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoad.doclinks)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new AttachmentDataController();
bootstrapInspector.onNewController(controller, 'AttachmentDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - attachmentDS

                

                // begin datasource - tkServiceAddressDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `tkServiceAddressDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `serviceaddress`,
    objectName: `txserviceaddress`,
    dependsOn: `srDS`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: NaN,
    select: `ticketid,tkserviceaddressid,class,formattedaddress,streetaddress,city,stateprovince,latitudey,longitudex`,
    dsParentObject: `mxapisr`
  },
  objectStructure: `mxapisr`,
  idAttribute: `tkserviceaddressid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `ticketid`,
      id: `b7p_x`
    },
    {
      name: `tkserviceaddressid`,
      'unique-id': `true`,
      id: `qvap2`
    },
    {
      name: `class`,
      id: `yggkw`
    },
    {
      name: `formattedaddress`,
      id: `qw7my`
    },
    {
      name: `streetaddress`,
      id: `n2xng`
    },
    {
      name: `city`,
      id: `kpk78`
    },
    {
      name: `stateprovince`,
      id: `pv7dr`
    },
    {
      name: `latitudey`,
      id: `yxdyd`
    },
    {
      name: `longitudex`,
      id: `bjjav`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `srDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - tkServiceAddressDS

                

                // begin datasource - srSpecDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `srSpecDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    objectName: `ticketspec`,
    selectionMode: `none`,
    relationship: `ticketspecclass`,
    dependsOn: `srDS`,
    cacheExpiryMs: NaN,
    select: `ticketid,ticketspecid,assetattrid,assetattribute.description,alnvalue,numvalue,tablevalue,datevalue`,
    dsParentObject: `mxapisr`
  },
  objectStructure: `mxapisr`,
  idAttribute: `ticketspecid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `ticketid`,
      id: `w33gw`
    },
    {
      name: `ticketspecid`,
      'unique-id': `true`,
      id: `b_zdv`
    },
    {
      name: `assetattrid`,
      id: `kzad7`
    },
    {
      name: `assetattribute.description`,
      id: `m4xqy`
    },
    {
      name: `alnvalue`,
      id: `bkder`
    },
    {
      name: `numvalue`,
      id: `azva2`
    },
    {
      name: `tablevalue`,
      id: `agx7g`
    },
    {
      name: `datevalue`,
      id: `r2_ev`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `srDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoad.ticketspec)),
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - srSpecDS

                

                // begin datasource - srOwnerPersonDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `srOwnerPersonDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `ownerperson`,
    dependsOn: `srDS`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: NaN,
    select: `displayname,_imagelibref,_id`,
    dsParentObject: `mxapisr`
  },
  objectStructure: `mxapisr`,
  idAttribute: `_id`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `displayname`,
      id: `a8w8z`
    },
    {
      name: `_imagelibref`,
      id: `qrxwy`
    },
    {
      name: `_id`,
      'unique-id': `true`,
      id: `rp94m`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `srDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoad.assignedto)),
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - srOwnerPersonDS

                

                // begin datasource - srOwnerGroupDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `srOwnerGroupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `srpersongroup`,
    dependsOn: `srDS`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: NaN,
    select: `description,persongroup`,
    dsParentObject: `mxapisr`
  },
  objectStructure: `mxapisr`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      id: `q_a8m`
    },
    {
      name: `persongroup`,
      id: `jmyyg`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `srDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoad.assignedto)),
  watch:   [
    {
      name: `cacheExpiryMs`,
      lastValue: (app.state.cacheExpiryMs),
      check: (()=>{return app.state.cacheExpiryMs})
    }
  ],
  autoSave: false,
  expiryTime: NaN,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - srOwnerGroupDS

                
    
  
  return app;
}

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
    client.getSystemProperty = (p) => client.systemProperties[p];

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
    if (type === 'RESTDataAdapter' || type === 'AutoMaximoDataAdapter' ||
      (this.options.datasources && this.options.datasources[options.name] && this.options.datasources[options.name].data) ) {
      return new JSONDataAdapter(options);
    }
    return da;
  }

  onNewDatasourceOptions(options) {
    if (this.options.datasources && this.options.datasources[options.name]) {
      if (!options.query) options.query = {};
      if (this.options.datasources[options.name].data) {
        options.query.src = this.options.datasources[options.name].data;
      }
      if (options.query.src && options.query.src.member) {
        options.items = 'member';
      }
      if (
        options.query.src &&
        options.query.src.responseInfo &&
        options.query.src.responseInfo.schema
      ) {
        options.schema = 'responseInfo.schema';
      }
    }

    if (!options.query.src) {
      options.query.src = [];
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
  Object.keys(options).filter(k => k.startsWith('onNew')).forEach(k => {
    bootstrap.wrap(k, options[k]);
  });

  resp.initializeApp = async (args) => {
    if (args) throw new Error('initializeApp does not accept parameters.  Perhaps you mean to pass them to newTestStub instead.');
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
      