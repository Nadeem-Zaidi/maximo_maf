/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
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


import 'regenerator-runtime/runtime'
import { Datasource } from '@maximo/maximo-js-api';
import { JSONDataAdapter } from '@maximo/maximo-js-api';
import { Application } from '@maximo/maximo-js-api';
import { PlatformFactory } from '@maximo/maximo-js-api';
import { LookupManager } from '@maximo/maximo-js-api';
import { BootstrapInspector } from '@maximo/maximo-js-api';
import { Page } from '@maximo/maximo-js-api';
import AppController from '../AppController';
import SubMenuPageController from '../SubMenuPageController';
import CountBookListDataController from '../CountBookListDataController';
import CountBookPageController from '../CountBookPageController';
import CountBookLineDataController from '../CountBookLineDataController';
import CountBookDetailPageController from '../CountBookDetailPageController';
import CountBookLineInvBalDetailPageController from '../CountBookLineInvBalDetailPageController';
import AdHocDataController from '../AdHocDataController';
import AdHocPageController from '../AdHocPageController';
import InvBalDetailPageController from '../InvBalDetailPageController';
import ReconcileDataController from '../ReconcileDataController';
import ReconcilePageController from '../ReconcilePageController';const PagesPages = ()=>'';
const PageMain = ()=>'';
const DataListD5xry = ()=>'';
const DataListWaqwq = ()=>'';
const PageCountBook = ()=>'';
const IncludeEk32v = ()=>'';
const PageCountBookDetail = ()=>'';
const PanelR7957Component = ()=>'';
const PageCountBookLineInvBalDetail = ()=>'';
const PanelV6ameComponent = ()=>'';
const PageAdHoc = ()=>'';
const PanelYz6rds_Component = ()=>'';
const PageInvBalDetail = ()=>'';
const PanelYxne7Component = ()=>'';
const PageReconcile = ()=>'';
const PanelD7nwqComponent = ()=>'';
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
      name: "icmobile",
      type: "",
      theme: "touch",
      isMaximoApp: true,
      masEnabled: false,
      labels: {},
      defaultMessages: {"Countbooks":"Count books","Adhoccount":"Ad hoc count","Reconciliation":"Reconciliation","invalidinput":"Should be number 0 ~ 1!","exceedlimit":"Exceed the allowable limit!","cntbkCompleted_label":"Count book was completed","updatephyscnt_msg":"Physical count saved","reconcile_update_msg1":"Successfully reconciled ","reconcile_update_msg2":" materials","Rotating":"Rotating","Asset":"Asset","Lot":"Lot","Unit":"Unit","Balance":"Balance","Lastcount":"Last count","Lastcountdate":"Last count date","Calculated":"Calculated","Bin":"Bin","ABCType":"ABC Type","of":"of","counted":"counted","overdue":"overdue","days":"days","day":"day"},
      messageGroups: 'viewmanager',
      systemProps: [],
      hasCustomizations: false,
      forceJsonLocalizer: undefined
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
    app.setState(bootstrapInspector.onNewState({"useConfirmDialog":true,"selectedCountBookDesc":"","param_countbookid":0,"param_countbooknum":"","param_countbooksiteid":"","countbookchanged":false,"param_countbookstatus":"","notcounted_json_items":"{[]}","allitemsidlist":"{[]}","notcountedcountbooklinesidlist":"{[]}","countbookidlist":"{[]}","counteditemidlist4countbook":"{[]}","counteditemvaluelist4countbook":"{[]}","isback":false,"isbackfromLineInvDetail":false,"reconcileback":false,"reconcileloading":false,"countbookds":"countBookDetailDS_JSON","adhocds":"mxapiinvbalds_json","isMobileContainer":false,"canLoadCBDS":false,"countbooktabloading":false,"canLoadAdhocDS":false,"adhoctabloading":false,"invbaldetailloading":true}, 'app'));
    setAppInst(app);

    app.registerController(bootstrapInspector.onNewController(new AppController(), 'AppController', app));
    let page;

    
      // setup the 'main' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'main', clearStack: true, parent: app, route: '/main', title: app.getLocalizedLabel("main_title", "main"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new SubMenuPageController();
                bootstrapInspector.onNewController(controller, 'SubMenuPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - subMenuListDS
                {
                  let options = {
  name: `subMenuListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: true,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - subMenuListDS

                

                // begin datasource - subMenuListDS2
                {
                  let options = {
  name: `subMenuListDS2`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: true,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - subMenuListDS2

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'countBook' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'countBook', clearStack: false, parent: app, route: '/countBook', title: app.getLocalizedLabel("countBook_title", "countBook"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"objectstructure":"","selectedDS":"countBookListDS"}, 'page'), {});

        
              {
                let controller = new CountBookPageController();
                bootstrapInspector.onNewController(controller, 'CountBookPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - countBookListDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    selectionMode: `single`,
    orderBy: `latestdue`,
    idAttribute: `countbookid`,
    resetDatasource: true,
    objectStructure: `mxapicntbook`,
    savedQuery: `MOBILECNTBOOK`,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`siteid`,
`countbooknum`,
`description`,
`latestdue`,
`lastcount`
    ],
    indexAttributes:     [
`siteid`,
`countbooknum`,
`description`,
`latestdue`,
`lastcount`
    ],
    select: `siteid,countbookid,countbooknum,description,status,status_description,latestdue,lastcount,lastcountby,numoverdue,counted,countbookallitm._dbcount--countbookallitmcount,computedCountedMessage,computedCountedIcon,computedTags,computedOverdueMessage,computedOverdueIcon`
  },
  objectStructure: `mxapicntbook`,
  idAttribute: `countbookid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `siteid`,
      searchable: `true`,
      id: `x4b8v`
    },
    {
      name: `countbookid`,
      'unique-id': `true`,
      id: `jxz_k`
    },
    {
      name: `countbooknum`,
      searchable: `true`,
      id: `rnndp`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `mpdv5`
    },
    {
      name: `status`,
      id: `dq349`
    },
    {
      name: `status_description`,
      id: `q5kxd`
    },
    {
      name: `latestdue`,
      searchable: `true`,
      id: `mjpb3`
    },
    {
      name: `lastcount`,
      searchable: `true`,
      id: `v3ar_`
    },
    {
      name: `lastcountby`,
      id: `pqem7`
    },
    {
      name: `numoverdue`,
      id: `m2zzj`
    },
    {
      name: `counted`,
      id: `mrza4`
    },
    {
      name: `countbookallitm._dbcount--countbookallitmcount`,
      id: `vgmk8`
    },
    {
      name: `computedCountedMessage`,
      'computed-function': `computedCountedMessage`,
      id: `v3p9q`,
      computed: `true`
    },
    {
      name: `computedCountedIcon`,
      'computed-function': `computedCountedIcon`,
      id: `dpgz2`,
      computed: `true`
    },
    {
      name: `computedTags`,
      'computed-function': `computedTags`,
      id: `agmxa`,
      computed: `true`
    },
    {
      name: `computedOverdueMessage`,
      'computed-function': `computedOverdueMessage`,
      id: `ak_4x`,
      computed: `true`
    },
    {
      name: `computedOverdueIcon`,
      'computed-function': `computedOverdueIcon`,
      id: `zkw6m`,
      computed: `true`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedCountedMessage:     {
      computedFunction: ((item, datasource) => datasource.callController('computedCountedMessage', item))
    },
    computedCountedIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('computedCountedIcon', item))
    },
    computedTags:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTags', item))
    },
    computedOverdueMessage:     {
      computedFunction: ((item, datasource) => datasource.callController('computedOverdueMessage', item))
    },
    computedOverdueIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('computedOverdueIcon', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: true,
  useWithMobile: false,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CountBookListDataController();
bootstrapInspector.onNewController(controller, 'CountBookListDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookListDS

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'countBookDetail' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'countBookDetail', clearStack: false, parent: app, route: '/countBookDetail', title: app.getLocalizedLabel("countBookDetail_title", "countBookDetail"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedTabIndex":0,"inprogress_selected":true,"counted_selected":false,"count_currentitem":"0","invptol":"0","invmtol":"0","useConfirmDialog":true,"showcomplete":true,"enablesave":false,"completed":false,"dsinitialized":false,"needsetup":false,"isfromsave":false,"counteditem_id_value_map_4countbook":"{[]}","allitems":"{[]}","countBookDetailDSALL_Name":"countBookDetailDSALL"}, 'page'), {"selectedTabIndex":"number","count_currentitem":"object"});

        
              {
                let controller = new CountBookDetailPageController();
                bootstrapInspector.onNewController(controller, 'CountBookDetailPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - countBookDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    selectionMode: `single`,
    idAttribute: `countbookid`,
    objectStructure: `mxapicntbook`,
    savedQuery: `MOBILECNTBOOK`,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`siteid`
    ],
    indexAttributes:     [
`siteid`
    ],
    select: `siteid,countbookid,countbooknum`
  },
  objectStructure: `mxapicntbook`,
  idAttribute: `countbookid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `siteid`,
      searchable: `true`,
      id: `agzj9`
    },
    {
      name: `countbookid`,
      'unique-id': `true`,
      id: `qv79z`
    },
    {
      name: `countbooknum`,
      id: `g356q`
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDS

                

                // begin datasource - countBookDetailDSALL
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookDetailDSALL`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 1000,
  debounceTime: 400,
  query:   {
    pageSize: 1000,
    selectionMode: `single`,
    orderBy: `nextphycntdate,binnum`,
    idAttribute: `countbooklineid`,
    objectStructure: `mxapicntbookline`,
    savedQuery: `MOBILECNTBOOKLINE`,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`countbooknum`,
`siteid`,
`itemnum`,
`item.description`,
`assetnum`,
`asset.serialnum`,
`binnum`,
`physcnt`,
`nextphycntdate`
    ],
    indexAttributes:     [
`countbooknum`,
`siteid`,
`countbooklineid`,
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`assetnum`,
`asset.serialnum--serialnum`,
`binnum`,
`physcnt`,
`nextphycntdate`
    ],
    select: `countbooknum,siteid,countbooklineid,itemnum,item.description--itemdesc,assetnum,asset.serialnum--serialnum,rotating,binnum,physcnt,match,recon,hasphyscnt,physcntdate,inventory.abctype--abctype,lotnum,inventory.issueunit--issueunit,nextphycntdate,curbal,inventory.invptol--invinvptol,inventory.invmtol--invinvmtol,realinvptol,realinvmtol,accuracy,maxvar.allowblindcnt,maxvar.invptol,maxvar.invmtol,conditioncode,errorvalue,glcreditaccount,adjphyscnt,gldebitaccount,lastupdateby,lastupdatedate,orgid,tool,physcntby`
  },
  objectStructure: `mxapicntbookline`,
  idAttribute: `countbooklineid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `countbooknum`,
      sortable: `false`,
      searchable: `true`,
      id: `nq_aj`
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `k_4ej`
    },
    {
      name: `countbooklineid`,
      sortable: `false`,
      'unique-id': `true`,
      index: `true`,
      id: `dmep3`
    },
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `yvq7g`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `b49xw`
    },
    {
      name: `assetnum`,
      sortable: `false`,
      searchable: `true`,
      id: `w6v2m`
    },
    {
      name: `asset.serialnum--serialnum`,
      sortable: `false`,
      searchable: `true`,
      id: `rex8d`
    },
    {
      name: `rotating`,
      sortable: `false`,
      id: `dppav`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `yvr6r`,
      lookup:       {
        name: `cntlinebin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      name: `physcnt`,
      sortable: `false`,
      searchable: `true`,
      id: `w95y8`
    },
    {
      name: `match`,
      sortable: `false`,
      id: `k98j8`
    },
    {
      name: `recon`,
      sortable: `false`,
      id: `rz6yq`
    },
    {
      name: `hasphyscnt`,
      sortable: `false`,
      searchable: `false`,
      id: `ngx8x`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `pwwy9`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `dpkzv`
    },
    {
      name: `lotnum`,
      id: `g2nqj`,
      lookup:       {
        name: `cntlinelotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `v24g6`
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("v3zk5_title", "Count due")),
      searchable: `true`,
      id: `v3zk5`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `pnebk`
    },
    {
      name: `inventory.invptol--invinvptol`,
      sortable: `false`,
      id: `eydyr`
    },
    {
      name: `inventory.invmtol--invinvmtol`,
      sortable: `false`,
      id: `kmm55`
    },
    {
      name: `realinvptol`,
      sortable: `false`,
      id: `n8wqy`
    },
    {
      name: `realinvmtol`,
      sortable: `false`,
      id: `x67be`
    },
    {
      name: `accuracy`,
      sortable: `false`,
      id: `bmpjp`
    },
    {
      name: `maxvar.allowblindcnt`,
      sortable: `false`,
      id: `zmqpz`
    },
    {
      name: `maxvar.invptol`,
      sortable: `false`,
      id: `m8jeg`
    },
    {
      name: `maxvar.invmtol`,
      sortable: `false`,
      id: `y56mw`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `emvdp`
    },
    {
      name: `errorvalue`,
      sortable: `false`,
      id: `vdbm_`
    },
    {
      name: `glcreditaccount`,
      sortable: `false`,
      id: `na44x`
    },
    {
      name: `adjphyscnt`,
      sortable: `false`,
      id: `wg64m`
    },
    {
      name: `gldebitaccount`,
      sortable: `false`,
      id: `qz5kb`
    },
    {
      name: `lastupdateby`,
      sortable: `false`,
      id: `ak8z2`
    },
    {
      name: `lastupdatedate`,
      sortable: `false`,
      id: `v_yjy`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `q8k3d`
    },
    {
      name: `tool`,
      sortable: `false`,
      id: `rv9ka`
    },
    {
      name: `physcntby`,
      sortable: `false`,
      id: `z44ea`
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CountBookLineDataController();
bootstrapInspector.onNewController(controller, 'CountBookLineDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailDSALL

                

                // begin datasource - countBookDetailDSALL4Web
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookDetailDSALL4Web`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    savedQuery: `MOBILECNTBOOKLINE`,
    where: (`countbooknum="${app.state.param_countbooknum}" and siteid="${app.state.param_countbooksiteid}"`),
    mobileQbeFilter: ({'countbooknum': app.state.param_countbooknum, 'siteid': app.state.param_countbooksiteid}),
    orderBy: `nextphycntdate,binnum`,
    idAttribute: `countbooklineid`,
    selectionMode: `single`,
    offlineImmediateDownload: false,
    select: `countbooknum,siteid,countbooklineid,itemnum,item.description--itemdesc,assetnum,asset.serialnum--serialnum,rotating,binnum,physcnt,match,recon,hasphyscnt,physcntdate,inventory.abctype--abctype,lotnum,inventory.issueunit--issueunit,nextphycntdate,curbal,inventory.invptol--invinvptol,inventory.invmtol--invinvmtol,realinvptol,realinvmtol,accuracy,maxvar.allowblindcnt,maxvar.invptol,maxvar.invmtol,conditioncode,errorvalue,glcreditaccount,adjphyscnt,gldebitaccount,lastupdateby,lastupdatedate,orgid,tool,physcntby`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`countbooknum`,
`siteid`,
`itemnum`,
`item.description`,
`assetnum`,
`asset.serialnum`,
`binnum`,
`physcnt`,
`nextphycntdate`
    ],
    objectStructure: `mxapicntbookline`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    indexAttributes:     [
`countbooknum`,
`siteid`,
`countbooklineid`,
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`assetnum`,
`asset.serialnum--serialnum`,
`binnum`,
`physcnt`,
`nextphycntdate`
    ]
  },
  objectStructure: `mxapicntbookline`,
  idAttribute: `countbooklineid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `countbooknum`,
      sortable: `false`,
      searchable: `true`,
      id: `nq_aj`
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `k_4ej`
    },
    {
      name: `countbooklineid`,
      sortable: `false`,
      'unique-id': `true`,
      index: `true`,
      id: `dmep3`
    },
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `yvq7g`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `b49xw`
    },
    {
      name: `assetnum`,
      sortable: `false`,
      searchable: `true`,
      id: `w6v2m`
    },
    {
      name: `asset.serialnum--serialnum`,
      sortable: `false`,
      searchable: `true`,
      id: `rex8d`
    },
    {
      name: `rotating`,
      sortable: `false`,
      id: `dppav`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `yvr6r`,
      lookup:       {
        name: `cntlinebin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      name: `physcnt`,
      sortable: `false`,
      searchable: `true`,
      id: `w95y8`
    },
    {
      name: `match`,
      sortable: `false`,
      id: `k98j8`
    },
    {
      name: `recon`,
      sortable: `false`,
      id: `rz6yq`
    },
    {
      name: `hasphyscnt`,
      sortable: `false`,
      searchable: `false`,
      id: `ngx8x`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `pwwy9`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `dpkzv`
    },
    {
      name: `lotnum`,
      id: `g2nqj`,
      lookup:       {
        name: `cntlinelotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `v24g6`
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("v3zk5_title", "Count due")),
      searchable: `true`,
      id: `v3zk5`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `pnebk`
    },
    {
      name: `inventory.invptol--invinvptol`,
      sortable: `false`,
      id: `eydyr`
    },
    {
      name: `inventory.invmtol--invinvmtol`,
      sortable: `false`,
      id: `kmm55`
    },
    {
      name: `realinvptol`,
      sortable: `false`,
      id: `n8wqy`
    },
    {
      name: `realinvmtol`,
      sortable: `false`,
      id: `x67be`
    },
    {
      name: `accuracy`,
      sortable: `false`,
      id: `bmpjp`
    },
    {
      name: `maxvar.allowblindcnt`,
      sortable: `false`,
      id: `zmqpz`
    },
    {
      name: `maxvar.invptol`,
      sortable: `false`,
      id: `m8jeg`
    },
    {
      name: `maxvar.invmtol`,
      sortable: `false`,
      id: `y56mw`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `emvdp`
    },
    {
      name: `errorvalue`,
      sortable: `false`,
      id: `vdbm_`
    },
    {
      name: `glcreditaccount`,
      sortable: `false`,
      id: `na44x`
    },
    {
      name: `adjphyscnt`,
      sortable: `false`,
      id: `wg64m`
    },
    {
      name: `gldebitaccount`,
      sortable: `false`,
      id: `qz5kb`
    },
    {
      name: `lastupdateby`,
      sortable: `false`,
      id: `ak8z2`
    },
    {
      name: `lastupdatedate`,
      sortable: `false`,
      id: `v_yjy`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `q8k3d`
    },
    {
      name: `tool`,
      sortable: `false`,
      id: `rv9ka`
    },
    {
      name: `physcntby`,
      sortable: `false`,
      id: `z44ea`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `countBookDetailDSALL`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`countbooknum="${app.state.param_countbooknum}" and siteid="${app.state.param_countbooksiteid}"`),
      check: (()=>{return `countbooknum="${app.state.param_countbooknum}" and siteid="${app.state.param_countbooksiteid}"`})
    },
    {
      name: `mobileQbeFilter`,
      lastValue: ({'countbooknum': app.state.param_countbooknum, 'siteid': app.state.param_countbooksiteid}),
      check: (()=>{return {'countbooknum': app.state.param_countbooknum, 'siteid': app.state.param_countbooksiteid}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CountBookLineDataController();
bootstrapInspector.onNewController(controller, 'CountBookLineDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailDSALL4Web

                

                // begin datasource - countBookDetailDSALL4Web_Counted
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookDetailDSALL4Web_Counted`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    savedQuery: `MOBILECNTBOOKLINE`,
    where: (`countbooknum="${app.state.param_countbooknum}" and siteid="${app.state.param_countbooksiteid}"`),
    mobileQbeFilter: ({'countbooknum': app.state.param_countbooknum, 'siteid': app.state.param_countbooksiteid}),
    orderBy: `nextphycntdate,binnum`,
    idAttribute: `countbooklineid`,
    selectionMode: `single`,
    offlineImmediateDownload: false,
    select: `countbooknum,siteid,countbooklineid,itemnum,item.description--itemdesc,assetnum,asset.serialnum--serialnum,rotating,binnum,physcnt,match,recon,hasphyscnt,physcntdate,inventory.abctype--abctype,lotnum,inventory.issueunit--issueunit,nextphycntdate,curbal,inventory.invptol--invinvptol,inventory.invmtol--invinvmtol,realinvptol,realinvmtol,accuracy,maxvar.allowblindcnt,maxvar.invptol,maxvar.invmtol,conditioncode,errorvalue,glcreditaccount,adjphyscnt,gldebitaccount,lastupdateby,lastupdatedate,orgid,tool,physcntby`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`countbooknum`,
`siteid`,
`itemnum`,
`item.description`,
`assetnum`,
`asset.serialnum`,
`binnum`,
`physcnt`,
`nextphycntdate`
    ],
    objectStructure: `mxapicntbookline`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    indexAttributes:     [
`countbooknum`,
`siteid`,
`countbooklineid`,
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`assetnum`,
`asset.serialnum--serialnum`,
`binnum`,
`physcnt`,
`nextphycntdate`
    ]
  },
  objectStructure: `mxapicntbookline`,
  idAttribute: `countbooklineid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `countbooknum`,
      sortable: `false`,
      searchable: `true`,
      id: `nq_aj`
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `k_4ej`
    },
    {
      name: `countbooklineid`,
      sortable: `false`,
      'unique-id': `true`,
      index: `true`,
      id: `dmep3`
    },
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `yvq7g`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `b49xw`
    },
    {
      name: `assetnum`,
      sortable: `false`,
      searchable: `true`,
      id: `w6v2m`
    },
    {
      name: `asset.serialnum--serialnum`,
      sortable: `false`,
      searchable: `true`,
      id: `rex8d`
    },
    {
      name: `rotating`,
      sortable: `false`,
      id: `dppav`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `yvr6r`,
      lookup:       {
        name: `cntlinebin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      name: `physcnt`,
      sortable: `false`,
      searchable: `true`,
      id: `w95y8`
    },
    {
      name: `match`,
      sortable: `false`,
      id: `k98j8`
    },
    {
      name: `recon`,
      sortable: `false`,
      id: `rz6yq`
    },
    {
      name: `hasphyscnt`,
      sortable: `false`,
      searchable: `false`,
      id: `ngx8x`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `pwwy9`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `dpkzv`
    },
    {
      name: `lotnum`,
      id: `g2nqj`,
      lookup:       {
        name: `cntlinelotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `v24g6`
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("v3zk5_title", "Count due")),
      searchable: `true`,
      id: `v3zk5`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `pnebk`
    },
    {
      name: `inventory.invptol--invinvptol`,
      sortable: `false`,
      id: `eydyr`
    },
    {
      name: `inventory.invmtol--invinvmtol`,
      sortable: `false`,
      id: `kmm55`
    },
    {
      name: `realinvptol`,
      sortable: `false`,
      id: `n8wqy`
    },
    {
      name: `realinvmtol`,
      sortable: `false`,
      id: `x67be`
    },
    {
      name: `accuracy`,
      sortable: `false`,
      id: `bmpjp`
    },
    {
      name: `maxvar.allowblindcnt`,
      sortable: `false`,
      id: `zmqpz`
    },
    {
      name: `maxvar.invptol`,
      sortable: `false`,
      id: `m8jeg`
    },
    {
      name: `maxvar.invmtol`,
      sortable: `false`,
      id: `y56mw`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `emvdp`
    },
    {
      name: `errorvalue`,
      sortable: `false`,
      id: `vdbm_`
    },
    {
      name: `glcreditaccount`,
      sortable: `false`,
      id: `na44x`
    },
    {
      name: `adjphyscnt`,
      sortable: `false`,
      id: `wg64m`
    },
    {
      name: `gldebitaccount`,
      sortable: `false`,
      id: `qz5kb`
    },
    {
      name: `lastupdateby`,
      sortable: `false`,
      id: `ak8z2`
    },
    {
      name: `lastupdatedate`,
      sortable: `false`,
      id: `v_yjy`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `q8k3d`
    },
    {
      name: `tool`,
      sortable: `false`,
      id: `rv9ka`
    },
    {
      name: `physcntby`,
      sortable: `false`,
      id: `z44ea`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `countBookDetailDSALL`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`countbooknum="${app.state.param_countbooknum}" and siteid="${app.state.param_countbooksiteid}"`),
      check: (()=>{return `countbooknum="${app.state.param_countbooknum}" and siteid="${app.state.param_countbooksiteid}"`})
    },
    {
      name: `mobileQbeFilter`,
      lastValue: ({'countbooknum': app.state.param_countbooknum, 'siteid': app.state.param_countbooksiteid}),
      check: (()=>{return {'countbooknum': app.state.param_countbooknum, 'siteid': app.state.param_countbooksiteid}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CountBookLineDataController();
bootstrapInspector.onNewController(controller, 'CountBookLineDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailDSALL4Web_Counted

                

                // begin datasource - countBookDetailDS_JSON
                {
                  let options = {
  name: `countBookDetailDS_JSON`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  items: `cbLineItems`,
  schemaExt:   [
    {
      name: `countbooknum`,
      searchable: `true`,
      id: `jbyz3`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `kev32`
    },
    {
      name: `countbooklineid`,
      'unique-id': `true`,
      index: `true`,
      id: `awz3x`
    },
    {
      name: `itemnum`,
      index: `true`,
      searchable: `true`,
      id: `zzqj6`
    },
    {
      name: `item.description--itemdesc`,
      searchable: `true`,
      id: `wmj7n`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `jk886`
    },
    {
      name: `asset.serialnum--serialnum`,
      searchable: `true`,
      id: `q8rn5`
    },
    {
      name: `rotating`,
      id: `db_nx`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `d7q_5`,
      lookup:       {
        name: `cntlinebin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      name: `physcnt`,
      type: `NUMBER`,
      searchable: `true`,
      id: `jwjn9`
    },
    {
      name: `match`,
      searchable: `true`,
      id: `d9xjb`
    },
    {
      name: `recon`,
      searchable: `true`,
      id: `jaay3`
    },
    {
      name: `hasphyscnt`,
      type: `NUMBER`,
      searchable: `true`,
      id: `bnk94`
    },
    {
      name: `physcntdate`,
      id: `jzag3`
    },
    {
      name: `inventory.abctype--abctype`,
      id: `pv2y8`
    },
    {
      name: `lotnum`,
      id: `ey8rv`,
      lookup:       {
        name: `cntlinelotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `inventory.issueunit--issueunit`,
      id: `d5kav`
    },
    {
      name: `nextphycntdate`,
      searchable: `true`,
      id: `dvx_w`
    },
    {
      name: `curbal`,
      id: `np2p2`
    },
    {
      name: `inventory.invptol--invinvptol`,
      id: `wg2kr`
    },
    {
      name: `inventory.invmtol--invinvmtol`,
      id: `jnvk8`
    },
    {
      name: `realinvptol`,
      id: `rvnd8`
    },
    {
      name: `realinvmtol`,
      id: `xgkm2`
    },
    {
      name: `accuracy`,
      id: `bp8p8`
    },
    {
      name: `maxvar.allowblindcnt`,
      id: `b746a`
    },
    {
      name: `maxvar.invptol`,
      id: `wevaq`
    },
    {
      name: `maxvar.invmtol`,
      id: `e663g`
    },
    {
      name: `haswarning`,
      type: `BOOL`,
      id: `njxbm`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `countbooklineid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`countbooknum`,
`siteid`,
`itemnum`,
`item.description`,
`assetnum`,
`asset.serialnum`,
`binnum`,
`physcnt`,
`match`,
`recon`,
`hasphyscnt`,
`nextphycntdate`
    ],
    select: `countbooknum,siteid,countbooklineid,itemnum,item.description--itemdesc,assetnum,asset.serialnum--serialnum,rotating,binnum,physcnt,match,recon,hasphyscnt,physcntdate,inventory.abctype--abctype,lotnum,inventory.issueunit--issueunit,nextphycntdate,curbal,inventory.invptol--invinvptol,inventory.invmtol--invinvmtol,realinvptol,realinvmtol,accuracy,maxvar.allowblindcnt,maxvar.invptol,maxvar.invmtol,haswarning`,
    src: ([])
  },
  autoSave: true,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoadCBDS)),
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
                  let controller = new CountBookLineDataController();
bootstrapInspector.onNewController(controller, 'CountBookLineDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailDS_JSON

                

                // begin datasource - countBookDetailDSCounted_JSON
                {
                  let options = {
  name: `countBookDetailDSCounted_JSON`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  items: `cbLineItems`,
  schemaExt:   [
    {
      name: `countbooknum`,
      searchable: `true`,
      id: `r8rbx`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x5nab`
    },
    {
      name: `countbooklineid`,
      'unique-id': `true`,
      index: `true`,
      id: `v8z74`
    },
    {
      name: `itemnum`,
      index: `true`,
      searchable: `true`,
      id: `bpkpa`
    },
    {
      name: `item.description--itemdesc`,
      searchable: `true`,
      id: `rpr4v`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `bjpyn`
    },
    {
      name: `asset.serialnum--serialnum`,
      searchable: `true`,
      id: `y7485`
    },
    {
      name: `rotating`,
      id: `w2k8p`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `p6bnq`,
      lookup:       {
        name: `cntlinebin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      name: `physcnt`,
      type: `NUMBER`,
      searchable: `true`,
      id: `ng7v2`
    },
    {
      name: `match`,
      searchable: `true`,
      id: `ng7__`
    },
    {
      name: `recon`,
      searchable: `true`,
      id: `yjy2m`
    },
    {
      name: `hasphyscnt`,
      type: `NUMBER`,
      searchable: `true`,
      id: `gxpa3`
    },
    {
      name: `physcntdate`,
      id: `xqdrb`
    },
    {
      name: `inventory.abctype--abctype`,
      id: `x86xv`
    },
    {
      name: `lotnum`,
      id: `gkxd3`,
      lookup:       {
        name: `cntlinelotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `inventory.issueunit--issueunit`,
      id: `y29zn`
    },
    {
      name: `nextphycntdate`,
      searchable: `true`,
      id: `wp2en`
    },
    {
      name: `curbal`,
      id: `zvgem`
    },
    {
      name: `inventory.invptol--invinvptol`,
      id: `wwa6w`
    },
    {
      name: `inventory.invmtol--invinvmtol`,
      id: `pjn7p`
    },
    {
      name: `realinvptol`,
      id: `njgjd`
    },
    {
      name: `realinvmtol`,
      id: `am49v`
    },
    {
      name: `accuracy`,
      id: `ye52v`
    },
    {
      name: `maxvar.allowblindcnt`,
      id: `ye45m`
    },
    {
      name: `maxvar.invptol`,
      id: `kxgxk`
    },
    {
      name: `maxvar.invmtol`,
      id: `z4q9a`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `countbooklineid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`countbooknum`,
`siteid`,
`itemnum`,
`item.description`,
`assetnum`,
`asset.serialnum`,
`binnum`,
`physcnt`,
`match`,
`recon`,
`hasphyscnt`,
`nextphycntdate`
    ],
    select: `countbooknum,siteid,countbooklineid,itemnum,item.description--itemdesc,assetnum,asset.serialnum--serialnum,rotating,binnum,physcnt,match,recon,hasphyscnt,physcntdate,inventory.abctype--abctype,lotnum,inventory.issueunit--issueunit,nextphycntdate,curbal,inventory.invptol--invinvptol,inventory.invmtol--invinvmtol,realinvptol,realinvmtol,accuracy,maxvar.allowblindcnt,maxvar.invptol,maxvar.invmtol`,
    src: ([])
  },
  autoSave: true,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoadCBDS)),
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
                  let controller = new CountBookLineDataController();
bootstrapInspector.onNewController(controller, 'CountBookLineDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailDSCounted_JSON

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'countBookLineInvBalDetail' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'countBookLineInvBalDetail', clearStack: false, parent: app, route: '/countBookLineInvBalDetail', title: app.getLocalizedLabel("countBookLineInvBalDetail_title", "countBookLineInvBalDetail"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"param_countbooklineid":0,"countbookinvbal_currentitem":"0","allowblindcnt":"0"}, 'page'), {"param_countbooklineid":"number","countbookinvbal_currentitem":"object"});

        
              {
                let controller = new CountBookLineInvBalDetailPageController();
                bootstrapInspector.onNewController(controller, 'CountBookLineInvBalDetailPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - countBookDetailDS4MaterialDetail
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookDetailDS4MaterialDetail`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 400,
  query:   {
    pageSize: 50,
    cacheExpiryMs: 1,
    itemUrl: (page.params.itemhref),
    objectStructure: `mxapicntbookline`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`countbooknum`,
`siteid`,
`itemnum`,
`item.description`,
`assetnum`,
`asset.serialnum`,
`binnum`,
`physcnt`,
`match`,
`recon`,
`hasphyscnt`,
`nextphycntdate`
    ],
    indexAttributes:     [
`countbooknum`,
`siteid`,
`countbooklineid`,
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`assetnum`,
`asset.serialnum--serialnum`,
`binnum`,
`physcnt`,
`match`,
`recon`,
`hasphyscnt`,
`nextphycntdate`
    ],
    select: `countbooknum,siteid,countbooklineid,itemnum,item.description--itemdesc,assetnum,asset.serialnum--serialnum,rotating,binnum,physcnt,match,recon,hasphyscnt,physcntdate,inventory.abctype--abctype,lotnum,inventory.issueunit--issueunit,nextphycntdate,curbal,inventory.invptol--invinvptol,inventory.invmtol--invinvmtol,realinvptol,realinvmtol,accuracy,maxvar.allowblindcnt,maxvar.invptol,maxvar.invmtol`
  },
  objectStructure: `mxapicntbookline`,
  idAttribute: `countbooklineid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `countbooknum`,
      searchable: `true`,
      id: `d4rq7`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `b4xg2`
    },
    {
      name: `countbooklineid`,
      'unique-id': `true`,
      index: `true`,
      id: `ydayk`
    },
    {
      name: `itemnum`,
      index: `true`,
      searchable: `true`,
      id: `av2bk`
    },
    {
      name: `item.description--itemdesc`,
      searchable: `true`,
      id: `wbnbr`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j9wjd`
    },
    {
      name: `asset.serialnum--serialnum`,
      searchable: `true`,
      id: `e3zj7`
    },
    {
      name: `rotating`,
      id: `kr24y`
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `bzmwg`
    },
    {
      name: `physcnt`,
      searchable: `true`,
      id: `ege4z`
    },
    {
      name: `match`,
      searchable: `true`,
      id: `peeay`
    },
    {
      name: `recon`,
      searchable: `true`,
      id: `xgmwn`
    },
    {
      name: `hasphyscnt`,
      searchable: `true`,
      id: `r2_7k`
    },
    {
      name: `physcntdate`,
      id: `abmpe`
    },
    {
      name: `inventory.abctype--abctype`,
      id: `xw3j5`
    },
    {
      name: `lotnum`,
      id: `px9z5`
    },
    {
      name: `inventory.issueunit--issueunit`,
      id: `epvqg`
    },
    {
      name: `nextphycntdate`,
      searchable: `true`,
      id: `y5m53`
    },
    {
      name: `curbal`,
      id: `pm42x`
    },
    {
      name: `inventory.invptol--invinvptol`,
      id: `p3qej`
    },
    {
      name: `inventory.invmtol--invinvmtol`,
      id: `zwpxj`
    },
    {
      name: `realinvptol`,
      id: `wk8en`
    },
    {
      name: `realinvmtol`,
      id: `pqz6v`
    },
    {
      name: `accuracy`,
      id: `y3v8x`
    },
    {
      name: `maxvar.allowblindcnt`,
      id: `qybyy`
    },
    {
      name: `maxvar.invptol`,
      id: `x8egv`
    },
    {
      name: `maxvar.invmtol`,
      id: `kawr3`
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
      name: `itemUrl`,
      lastValue: (page.params.itemhref),
      check: (()=>{return page.params.itemhref})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailDS4MaterialDetail

                

                // begin datasource - countBookDetailItemDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `countBookDetailItemDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 400,
  query:   {
    pageSize: 50,
    cacheExpiryMs: 1,
    where: (`itemnum="${page.params.itemnum}"`),
    objectStructure: `mxapiitem`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    select: `_id,_imagelibref`
  },
  objectStructure: `mxapiitem`,
  idAttribute: `_id`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `_id`,
      'unique-id': `true`,
      id: `wregv`
    },
    {
      name: `_imagelibref`,
      id: `rmrd9`
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
      name: `where`,
      lastValue: (`itemnum="${page.params.itemnum}"`),
      check: (()=>{return `itemnum="${page.params.itemnum}"`})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - countBookDetailItemDS

                

                // begin datasource - countbooklineinvbaldetailjsonds
                {
                  let options = {
  name: `countbooklineinvbaldetailjsonds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `_id`,
      id: `re98e`
    },
    {
      name: `label`,
      id: `d52qg`
    },
    {
      name: `value`,
      id: `wp2_r`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `_id,label,value`,
    src: ([])
  },
  autoSave: true,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
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
                // end datasource - countbooklineinvbaldetailjsonds

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'adHoc' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'adHoc', clearStack: false, parent: app, route: '/adHoc', title: app.getLocalizedLabel("adHoc_title", "adHoc"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedTabIndex":0,"containerTabSelected":0,"inprogress_selected":true,"counted_selected":false,"useConfirmDialog":true,"adhocds_mqbe_filter_v":"=null","clearQBERequested":false,"dsinitialized":false,"needsetup":false,"isfromsave":false,"enablesave":false,"counteditem_id_value_map_4adhoc":"{[]}","allitems":"{[]}"}, 'page'), {"selectedTabIndex":"number","containerTabSelected":"number"});

        
              {
                let controller = new AdHocPageController();
                bootstrapInspector.onNewController(controller, 'AdHocPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - mxapiinvbaldsall
                {
                  let options = {
  platform: `maximoMobile`,
  name: `mxapiinvbaldsall`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 1000,
  debounceTime: 400,
  query:   {
    pageSize: 1000,
    orderBy: `nextphycntdate,binnum`,
    idAttribute: `invbalancesid`,
    objectStructure: `mxapiinvbal`,
    savedQuery: `MOBILEINVCNT`,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`itemnum`,
`item.description`,
`binnum`,
`lotnum`,
`nextphycntdate`
    ],
    indexAttributes:     [
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`binnum`,
`lotnum`,
`nextphycntdate`,
`invbalancesid`
    ],
    select: `itemnum,item.description--itemdesc,binnum,lotnum,nextphycntdate,physcnt,adjustedphyscnt,adjustedphyscntdate,invbalancesid,curbal,notmatchindicator,ownersysid,pre_date,externalrefid,stagedcurbal,pre_curbalchange,pre_curbal,pickedqty,sendersysid,orgid,stagingbin,itemsetid,sourcesysid,ownersysid,siteid,inventory.abctype--abctype,inventory.issueunit--issueunit,location,conditioncode,reconciled,physcntdate,pre_calccurbal`
  },
  objectStructure: `mxapiinvbal`,
  idAttribute: `invbalancesid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `meq3k`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `eebep`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `ge6_e`,
      lookup:       {
        name: `invbalbin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      searchable: `true`,
      name: `lotnum`,
      id: `mzg9z`,
      lookup:       {
        name: `invballotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("rev4e_title", "Count due")),
      searchable: `true`,
      id: `rev4e`
    },
    {
      name: `physcnt`,
      sortable: `false`,
      id: `m8n2k`
    },
    {
      name: `adjustedphyscnt`,
      sortable: `false`,
      type: `NUMBER`,
      id: `aan_8`
    },
    {
      name: `adjustedphyscntdate`,
      sortable: `false`,
      id: `qbyd_`
    },
    {
      name: `invbalancesid`,
      sortable: `false`,
      'unique-id': `true`,
      index: `true`,
      id: `agkm8`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `zq4e5`
    },
    {
      name: `notmatchindicator`,
      sortable: `false`,
      id: `dvzan`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `qrgv3`
    },
    {
      name: `pre_date`,
      sortable: `false`,
      id: `qxqja`
    },
    {
      name: `externalrefid`,
      sortable: `false`,
      id: `dbkra`
    },
    {
      name: `stagedcurbal`,
      sortable: `false`,
      id: `kgjjn`
    },
    {
      name: `pre_curbalchange`,
      sortable: `false`,
      id: `yk7vq`
    },
    {
      name: `pre_curbal`,
      sortable: `false`,
      id: `dwbnm`
    },
    {
      name: `pickedqty`,
      sortable: `false`,
      id: `bkn7y`
    },
    {
      name: `sendersysid`,
      sortable: `false`,
      id: `xd_br`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `kn7xa`
    },
    {
      name: `stagingbin`,
      sortable: `false`,
      id: `vjm8y`
    },
    {
      name: `itemsetid`,
      sortable: `false`,
      id: `d6w4z`
    },
    {
      name: `sourcesysid`,
      sortable: `false`,
      id: `rrerr`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `jv55g`
    },
    {
      name: `siteid`,
      sortable: `false`,
      id: `vxxw_`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `dnpv8`
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `xabav`
    },
    {
      name: `location`,
      sortable: `false`,
      id: `n22n4`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `pv_be`
    },
    {
      name: `reconciled`,
      sortable: `false`,
      id: `kpa4e`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `p48j2`
    },
    {
      name: `pre_calccurbal`,
      sortable: `false`,
      id: `ban45`
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new AdHocDataController();
bootstrapInspector.onNewController(controller, 'AdHocDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - mxapiinvbaldsall

                

                // begin datasource - mxapiinvbalds_json
                {
                  let options = {
  name: `mxapiinvbalds_json`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  items: `adhocItems`,
  schemaExt:   [
    {
      name: `itemnum`,
      index: `true`,
      searchable: `true`,
      id: `adhoc_ds_json_itemnum`
    },
    {
      name: `item.description--itemdesc`,
      searchable: `true`,
      id: `adhoc_ds_json_itemdesc`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `adhoc_ds_json_binnum`,
      lookup:       {
        name: `invbalbin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      searchable: `true`,
      name: `lotnum`,
      id: `adhoc_ds_json_lotnum`,
      lookup:       {
        name: `invballotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `nextphycntdate`,
      searchable: `true`,
      id: `adhoc_ds_json_nextphycntdate`
    },
    {
      name: `physcnt`,
      id: `adhoc_ds_json_phycnt`
    },
    {
      name: `adjustedphyscnt`,
      type: `NUMBER`,
      id: `adhoc_ds_json_adjustedphyscnt`
    },
    {
      name: `adjustedphyscntdate`,
      id: `adhoc_ds_json_adjustedphyscntdatee`
    },
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      index: `true`,
      id: `adhoc_ds_json_invbalancesid`
    },
    {
      name: `curbal`,
      id: `adhoc_ds_json_curbal`
    },
    {
      name: `notmatchindicator`,
      id: `adhoc_ds_json_notmatchindicator`
    },
    {
      name: `haswarning`,
      type: `BOOL`,
      id: `ze85n`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `invbalancesid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`itemnum`,
`item.description`,
`binnum`,
`lotnum`,
`nextphycntdate`
    ],
    select: `itemnum,item.description--itemdesc,binnum,lotnum,nextphycntdate,physcnt,adjustedphyscnt,adjustedphyscntdate,invbalancesid,curbal,notmatchindicator,haswarning`,
    src: ([])
  },
  autoSave: true,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoadAdhocDS)),
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
                  let controller = new AdHocDataController();
bootstrapInspector.onNewController(controller, 'AdHocDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - mxapiinvbalds_json

                

                // begin datasource - mxapiinvbaldscounted_json
                {
                  let options = {
  name: `mxapiinvbaldscounted_json`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  items: `adhocItems`,
  schemaExt:   [
    {
      name: `itemnum`,
      index: `true`,
      searchable: `true`,
      id: `adhoc_dscounted_json_itemnum`
    },
    {
      name: `item.description--itemdesc`,
      searchable: `true`,
      id: `adhoc_dscounted_json_itemdesc`
    },
    {
      searchable: `true`,
      name: `binnum`,
      id: `adhoc_dscounted_json_binnum`,
      lookup:       {
        name: `invbalbin`,
        attributeMap:         [
          {
            datasourceField: `binnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `binnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `binnum`
      }
    },
    {
      searchable: `true`,
      name: `lotnum`,
      id: `adhoc_dscounted_json_lotnum`,
      lookup:       {
        name: `invballotnum`,
        attributeMap:         [
          {
            datasourceField: `lotnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `lotnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `lotnum`
      }
    },
    {
      name: `nextphycntdate`,
      searchable: `true`,
      id: `adhoc_dscounted_json_nextphycntdate`
    },
    {
      name: `physcnt`,
      id: `adhoc_dscounted_json_phycnt`
    },
    {
      name: `adjustedphyscnt`,
      type: `NUMBER`,
      id: `adhoc_dscounted_json_adjustedphyscnt`
    },
    {
      name: `adjustedphyscntdate`,
      id: `adhoc_dscounted_json_adjustedphyscntdatee`
    },
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      index: `true`,
      id: `adhoc_dscounted_json_invbalancesid`
    },
    {
      name: `curbal`,
      id: `adhoc_dscounted_json_curbal`
    },
    {
      name: `notmatchindicator`,
      id: `adhoc_dscounted_json_notmatchindicator`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `invbalancesid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`itemnum`,
`item.description`,
`binnum`,
`lotnum`,
`nextphycntdate`
    ],
    select: `itemnum,item.description--itemdesc,binnum,lotnum,nextphycntdate,physcnt,adjustedphyscnt,adjustedphyscntdate,invbalancesid,curbal,notmatchindicator`,
    src: ([])
  },
  autoSave: true,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canLoadAdhocDS)),
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
                  let controller = new AdHocDataController();
bootstrapInspector.onNewController(controller, 'AdHocDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - mxapiinvbaldscounted_json

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'invBalDetail' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'invBalDetail', clearStack: false, parent: app, route: '/invBalDetail', title: app.getLocalizedLabel("invBalDetail_title", "invBalDetail"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"param_invbalancesid":0,"invbal_currentitem":"0","allowblindcnt":"0","isFromReconcile":false}, 'page'), {"param_invbalancesid":"number","invbal_currentitem":"object"});

        
              {
                let controller = new InvBalDetailPageController();
                bootstrapInspector.onNewController(controller, 'InvBalDetailPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - invbalancedetailds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `invbalancedetailds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 400,
  query:   {
    pageSize: 50,
    cacheExpiryMs: 1,
    itemUrl: (page.params.itemhref),
    objectStructure: `mxapiinvbal`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`binnum`
    ],
    indexAttributes:     [
`binnum`,
`invbalancesid`
    ],
    select: `itemnum,item.description--itemdesc,inventory.abctype--abctype,binnum,lotnum,inventory.issueunit--issueunit,curbal,physcnt,physcntdate,pre_curbalchange,pre_calccurbal,invbalancesid,maxvar.allowblindcnt`
  },
  objectStructure: `mxapiinvbal`,
  idAttribute: `invbalancesid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `d_zez`
    },
    {
      name: `item.description--itemdesc`,
      id: `jdb2d`
    },
    {
      name: `inventory.abctype--abctype`,
      id: `apzp2`
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `jkpgp`
    },
    {
      name: `lotnum`,
      id: `v_vy2`
    },
    {
      name: `inventory.issueunit--issueunit`,
      id: `dwjez`
    },
    {
      name: `curbal`,
      id: `n9nnr`
    },
    {
      name: `physcnt`,
      id: `g88mb`
    },
    {
      name: `physcntdate`,
      id: `p33_m`
    },
    {
      name: `pre_curbalchange`,
      id: `k6pvp`
    },
    {
      name: `pre_calccurbal`,
      id: `p7pjj`
    },
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      index: `true`,
      id: `nk392`
    },
    {
      name: `maxvar.allowblindcnt`,
      id: `en2mb`
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
      name: `itemUrl`,
      lastValue: (page.params.itemhref),
      check: (()=>{return page.params.itemhref})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - invbalancedetailds

                

                // begin datasource - invBalDetailItemDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `invBalDetailItemDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 400,
  query:   {
    pageSize: 50,
    cacheExpiryMs: 1,
    where: (`itemnum="${page.params.itemnum}"`),
    objectStructure: `mxapiitem`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    select: `_id,_imagelibref`
  },
  objectStructure: `mxapiitem`,
  idAttribute: `_id`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `_id`,
      'unique-id': `true`,
      id: `dn8py`
    },
    {
      name: `_imagelibref`,
      id: `pwkq3`
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
      name: `where`,
      lastValue: (`itemnum="${page.params.itemnum}"`),
      check: (()=>{return `itemnum="${page.params.itemnum}"`})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - invBalDetailItemDS

                

                // begin datasource - invbaldetailjsonds
                {
                  let options = {
  name: `invbaldetailjsonds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `_idx`,
      id: `nk4d3`
    },
    {
      name: `label`,
      id: `rkv_m`
    },
    {
      name: `value`,
      id: `yd8d9`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `_idx`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `_idx,label,value`,
    src: ([])
  },
  autoSave: true,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 400,
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
                // end datasource - invbaldetailjsonds

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'reconcile' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'reconcile', clearStack: false, parent: app, route: '/reconcile', title: app.getLocalizedLabel("reconcile_title", "reconcile"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"containerTabSelected":0,"reconcileds":"reconciledsmismatched","mismatched_selected":true,"matched_selected":false}, 'page'), {"containerTabSelected":"number"});

        
              {
                let controller = new ReconcilePageController();
                bootstrapInspector.onNewController(controller, 'ReconcilePageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - reconcileds4all
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reconcileds4all`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    orderBy: `pre_curbalchange desc`,
    objectStructure: `mxapiinvbal`,
    savedQuery: `MOBILEINVCNTREC`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`itemnum`,
`item.description`,
`binnum`,
`nextphycntdate`
    ],
    indexAttributes:     [
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`binnum`,
`nextphycntdate`,
`invbalancesid`
    ],
    select: `itemnum,item.description--itemdesc,binnum,nextphycntdate,physcnt,pre_curbalchange,reconciled,invbalancesid,curbal,physcntdate,maxvar.allowblindcnt,notmatchindicator,ownersysid,pre_date,externalrefid,stagedcurbal,pre_curbalchange,pre_curbal,pickedqty,sendersysid,orgid,stagingbin,itemsetid,sourcesysid,ownersysid,siteid,inventory.abctype--abctype,inventory.issueunit--issueunit,location,conditioncode,pre_calccurbal`
  },
  objectStructure: `mxapiinvbal`,
  idAttribute: `invbalancesid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `x9n69`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `brrbr`
    },
    {
      name: `binnum`,
      searchable: `true`,
      sortable: `false`,
      id: `mxr2q`
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("vrp4e_title", "Last count date")),
      searchable: `true`,
      id: `vrp4e`
    },
    {
      name: `physcnt`,
      sortable: `false`,
      id: `mk3n_`
    },
    {
      name: `pre_curbalchange`,
      title: (app.getLocalizedLabel("pjy6x_title", "Variance")),
      id: `pjy6x`
    },
    {
      name: `reconciled`,
      sortable: `false`,
      id: `pympb`
    },
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      sortable: `false`,
      index: `true`,
      id: `jbb2r`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `jdvy2`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `n29d9`
    },
    {
      name: `maxvar.allowblindcnt`,
      sortable: `false`,
      id: `nek4x`
    },
    {
      name: `notmatchindicator`,
      sortable: `false`,
      id: `a88k8`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `g_7xk`
    },
    {
      name: `pre_date`,
      sortable: `false`,
      id: `vjyad`
    },
    {
      name: `externalrefid`,
      sortable: `false`,
      id: `z6ype`
    },
    {
      name: `stagedcurbal`,
      sortable: `false`,
      id: `w62nw`
    },
    {
      name: `pre_curbalchange`,
      sortable: `false`,
      id: `v9rwx`
    },
    {
      name: `pre_curbal`,
      sortable: `false`,
      id: `pvpe2`
    },
    {
      name: `pickedqty`,
      sortable: `false`,
      id: `azrbn`
    },
    {
      name: `sendersysid`,
      sortable: `false`,
      id: `pdazd`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `aqjqy`
    },
    {
      name: `stagingbin`,
      sortable: `false`,
      id: `np424`
    },
    {
      name: `itemsetid`,
      sortable: `false`,
      id: `rxjpw`
    },
    {
      name: `sourcesysid`,
      sortable: `false`,
      id: `ramyx`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `mmn47`
    },
    {
      name: `siteid`,
      sortable: `false`,
      id: `rpdvk`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `zjea_`
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `b7v2j`
    },
    {
      name: `location`,
      sortable: `false`,
      id: `xaab4`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `ye4md`
    },
    {
      name: `pre_calccurbal`,
      sortable: `false`,
      id: `z4d6_`
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReconcileDataController();
bootstrapInspector.onNewController(controller, 'ReconcileDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reconcileds4all

                

                // begin datasource - reconciledsmismatched
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reconciledsmismatched`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    savedQuery: `MOBILEINVCNTREC`,
    where: `pre_curbalchange!=0`,
    select: `itemnum,item.description--itemdesc,binnum,nextphycntdate,physcnt,pre_curbalchange,reconciled,invbalancesid,curbal,physcntdate,maxvar.allowblindcnt,notmatchindicator,ownersysid,pre_date,externalrefid,stagedcurbal,pre_curbalchange,pre_curbal,pickedqty,sendersysid,orgid,stagingbin,itemsetid,sourcesysid,ownersysid,siteid,inventory.abctype--abctype,inventory.issueunit--issueunit,location,conditioncode,pre_calccurbal`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`itemnum`,
`item.description`,
`binnum`,
`nextphycntdate`
    ],
    orderBy: `pre_curbalchange desc`,
    objectStructure: `mxapiinvbal`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    indexAttributes:     [
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`binnum`,
`nextphycntdate`,
`invbalancesid`
    ]
  },
  objectStructure: `mxapiinvbal`,
  idAttribute: `invbalancesid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `x9n69`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `brrbr`
    },
    {
      name: `binnum`,
      searchable: `true`,
      sortable: `false`,
      id: `mxr2q`
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("vrp4e_title", "Last count date")),
      searchable: `true`,
      id: `vrp4e`
    },
    {
      name: `physcnt`,
      sortable: `false`,
      id: `mk3n_`
    },
    {
      name: `pre_curbalchange`,
      title: (app.getLocalizedLabel("pjy6x_title", "Variance")),
      id: `pjy6x`
    },
    {
      name: `reconciled`,
      sortable: `false`,
      id: `pympb`
    },
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      sortable: `false`,
      index: `true`,
      id: `jbb2r`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `jdvy2`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `n29d9`
    },
    {
      name: `maxvar.allowblindcnt`,
      sortable: `false`,
      id: `nek4x`
    },
    {
      name: `notmatchindicator`,
      sortable: `false`,
      id: `a88k8`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `g_7xk`
    },
    {
      name: `pre_date`,
      sortable: `false`,
      id: `vjyad`
    },
    {
      name: `externalrefid`,
      sortable: `false`,
      id: `z6ype`
    },
    {
      name: `stagedcurbal`,
      sortable: `false`,
      id: `w62nw`
    },
    {
      name: `pre_curbalchange`,
      sortable: `false`,
      id: `v9rwx`
    },
    {
      name: `pre_curbal`,
      sortable: `false`,
      id: `pvpe2`
    },
    {
      name: `pickedqty`,
      sortable: `false`,
      id: `azrbn`
    },
    {
      name: `sendersysid`,
      sortable: `false`,
      id: `pdazd`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `aqjqy`
    },
    {
      name: `stagingbin`,
      sortable: `false`,
      id: `np424`
    },
    {
      name: `itemsetid`,
      sortable: `false`,
      id: `rxjpw`
    },
    {
      name: `sourcesysid`,
      sortable: `false`,
      id: `ramyx`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `mmn47`
    },
    {
      name: `siteid`,
      sortable: `false`,
      id: `rpdvk`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `zjea_`
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `b7v2j`
    },
    {
      name: `location`,
      sortable: `false`,
      id: `xaab4`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `ye4md`
    },
    {
      name: `pre_calccurbal`,
      sortable: `false`,
      id: `z4d6_`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `reconcileds4all`,
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReconcileDataController();
bootstrapInspector.onNewController(controller, 'ReconcileDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reconciledsmismatched

                

                // begin datasource - reconciledsmatched
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reconciledsmatched`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  debounceTime: 400,
  query:   {
    pageSize: 20,
    savedQuery: `MOBILEINVCNTREC`,
    where: `pre_curbalchange=0`,
    select: `itemnum,item.description--itemdesc,binnum,nextphycntdate,physcnt,pre_curbalchange,reconciled,invbalancesid,curbal,physcntdate,maxvar.allowblindcnt,notmatchindicator,ownersysid,pre_date,externalrefid,stagedcurbal,pre_curbalchange,pre_curbal,pickedqty,sendersysid,orgid,stagingbin,itemsetid,sourcesysid,ownersysid,siteid,inventory.abctype--abctype,inventory.issueunit--issueunit,location,conditioncode,pre_calccurbal`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`itemnum`,
`item.description`,
`binnum`,
`nextphycntdate`
    ],
    orderBy: `pre_curbalchange desc`,
    objectStructure: `mxapiinvbal`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    indexAttributes:     [
`itemnum`,
`itemnum`,
`item.description--itemdesc`,
`binnum`,
`nextphycntdate`,
`invbalancesid`
    ]
  },
  objectStructure: `mxapiinvbal`,
  idAttribute: `invbalancesid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      index: `true`,
      sortable: `false`,
      searchable: `true`,
      id: `x9n69`
    },
    {
      name: `item.description--itemdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `brrbr`
    },
    {
      name: `binnum`,
      searchable: `true`,
      sortable: `false`,
      id: `mxr2q`
    },
    {
      name: `nextphycntdate`,
      title: (app.getLocalizedLabel("vrp4e_title", "Last count date")),
      searchable: `true`,
      id: `vrp4e`
    },
    {
      name: `physcnt`,
      sortable: `false`,
      id: `mk3n_`
    },
    {
      name: `pre_curbalchange`,
      title: (app.getLocalizedLabel("pjy6x_title", "Variance")),
      id: `pjy6x`
    },
    {
      name: `reconciled`,
      sortable: `false`,
      id: `pympb`
    },
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      sortable: `false`,
      index: `true`,
      id: `jbb2r`
    },
    {
      name: `curbal`,
      sortable: `false`,
      id: `jdvy2`
    },
    {
      name: `physcntdate`,
      sortable: `false`,
      id: `n29d9`
    },
    {
      name: `maxvar.allowblindcnt`,
      sortable: `false`,
      id: `nek4x`
    },
    {
      name: `notmatchindicator`,
      sortable: `false`,
      id: `a88k8`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `g_7xk`
    },
    {
      name: `pre_date`,
      sortable: `false`,
      id: `vjyad`
    },
    {
      name: `externalrefid`,
      sortable: `false`,
      id: `z6ype`
    },
    {
      name: `stagedcurbal`,
      sortable: `false`,
      id: `w62nw`
    },
    {
      name: `pre_curbalchange`,
      sortable: `false`,
      id: `v9rwx`
    },
    {
      name: `pre_curbal`,
      sortable: `false`,
      id: `pvpe2`
    },
    {
      name: `pickedqty`,
      sortable: `false`,
      id: `azrbn`
    },
    {
      name: `sendersysid`,
      sortable: `false`,
      id: `pdazd`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `aqjqy`
    },
    {
      name: `stagingbin`,
      sortable: `false`,
      id: `np424`
    },
    {
      name: `itemsetid`,
      sortable: `false`,
      id: `rxjpw`
    },
    {
      name: `sourcesysid`,
      sortable: `false`,
      id: `ramyx`
    },
    {
      name: `ownersysid`,
      sortable: `false`,
      id: `mmn47`
    },
    {
      name: `siteid`,
      sortable: `false`,
      id: `rpdvk`
    },
    {
      name: `inventory.abctype--abctype`,
      sortable: `false`,
      id: `zjea_`
    },
    {
      name: `inventory.issueunit--issueunit`,
      sortable: `false`,
      id: `b7v2j`
    },
    {
      name: `location`,
      sortable: `false`,
      id: `xaab4`
    },
    {
      name: `conditioncode`,
      sortable: `false`,
      id: `ye4md`
    },
    {
      name: `pre_calccurbal`,
      sortable: `false`,
      id: `z4d6_`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `reconcileds4all`,
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReconcileDataController();
bootstrapInspector.onNewController(controller, 'ReconcileDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reconciledsmatched

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

    app.setRoutesForApplication(() => {return [
  {
    id: `main_y24n4`,
    label: (app.getLocalizedLabel("y24n4_label", "Inventory Counting")),
    icon: ("maximo:bare-metal-server"),
    application: `icmobile`,
    name: `main`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'main' }, event)}),
    page: `main`
  }
];});
    
                // begin datasource - synonymdomainDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `synonymdomainDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 400,
  query:   {
    pageSize: 50,
    where: `domainid="COUNTBOOKSTATUS"`,
    idAttribute: `domainid`,
    objectStructure: `mxapisynonymdomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    searchAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
  },
  objectStructure: `mxapisynonymdomain`,
  idAttribute: `maxvalue`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      searchable: `true`,
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
      searchable: `true`,
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
  useWithMobile: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - synonymdomainDS

                
    
  
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
      
