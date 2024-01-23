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
import InspListDataController from '../InspListDataController';
import InspListPageController from '../InspListPageController';
import ChangeStatusController from '../ChangeStatusController';
import TransitionPageController from '../TransitionPageController';
import CreateInspectionsPageController from '../CreateInspectionsPageController';
import ExecutionFormDataController from '../ExecutionFormDataController';
import InspectionInformationDataController from '../InspectionInformationDataController';
import ExecutionFormPageController from '../ExecutionFormPageController';
import DialogController from '../DialogController';
import FormExecution from '../components/react/FormExecution/FormExecution';
import InspSummaryDataController from '../InspSummaryDataController';
import InspSummaryPageController from '../InspSummaryPageController';
import InspCompletionSummaryDataController from '../InspCompletionSummaryDataController';
import InspCompletionSummaryPageController from '../InspCompletionSummaryPageController';
import VoicePageController from '../VoicePageController';
import Voice from '../components/react/Voice/Voice';
const PagesPages = () => '';
const PageMain = () => '';
const DialogDialogmap = () => '';
const SlidingDrawerInspectionStatusChangeDialog = () => '';
const StackedPanelRmn3aComponent = () => '';
const PageTransition_page = () => '';
const PageCreateInspection = () => '';
const LookupLocationLookup = () => '';
const LookupAssetLookup = () => '';
const DialogAssetSelect = () => '';
const DialogLocationSelect = () => '';
const PageExecution_panel = () => '';
const SlidingDrawerDrawer1 = () => '';
const SlidingDrawerDrawer2 = () => '';
const SlidingDrawerPreviousResultsDrawer = () => '';
const PageInspsummary = () => '';
const PageInspcompletionsummary = () => '';
const DataListJ_5_g = () => '';
const PageVoice_inspection = () => '';
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
    name: 'inspection',
    type: '',
    theme: 'touch',
    isMaximoApp: true,
    masEnabled: true,
    labels: {},
    defaultMessages: {
      batch_title: 'Batch',
      batch_inspections: 'Batch inspection {0} of {1}',
      inspections_title: 'Inspections',
      question_of_counter: '{0} of {1}',
      mobile_question_of_counter: '{0}/{1}',
      required_question_of_counter: '{0} required of {1}',
      question_counter: '{0} questions',
      question_counter_single: '{0} question',
      start_inspection: 'Start inspection',
      resume_inspection: 'Resume inspection',
      view_inspection: 'View inspection',
      est_duration: 'Estimated duration: {0}',
      action_executed: 'The action was executed.',
      action_queued:
        'Action was queued and will be executed during the synchronization.',
      return_to_app: 'Returning to {0}',
      records_counter: '{0} records',
      records_counter_single: '{0} record',
      record_not_on_device:
        'This record is not on your device. Try again or wait until you are online.',
      to_do: 'To Do',
      done: 'Done',
      required: 'Required',
      archived: 'Archived'
    },
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
  app.setState(
    bootstrapInspector.onNewState(
      {isMapValid: false, isFormExecutionLoaded: false, inspectionsList: ''},
      'app'
    )
  );
  setAppInst(app);

  app.registerController(
    bootstrapInspector.onNewController(
      new AppController(),
      'AppController',
      app
    )
  );
  let page;

  // setup the 'main' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'main',
        clearStack: true,
        parent: app,
        route: '/main',
        title: app.getLocalizedLabel('main_title', 'main')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          selectedDS: 'assignedworkds',
          selectedDSCards: 'assignedworkds',
          selectedDSMap: 'assignedworkds',
          techmobileAccess: 0,
          selectedSwitch: 0,
          showMapOverlay: 0,
          hideCountSearch: false,
          showClusterList: false,
          inspectionsIdCluster: '',
          itemsCluster: '',
          inspIdForMap: '',
          isMapOpen: false,
          mapListHeight: '45%',
          mapPaddingRight: '',
          mapPaddingLeft: '',
          mapPaddingBottom: '0',
          mapHeight: '',
          mapDialogHeight: '',
          mapCardHeight: 'auto',
          mapCardScroll: false,
          comeFromCluster: false,
          hideBackButton: false
        },
        'page'
      ),
      {}
    );

    {
      let controller = new InspListPageController();
      bootstrapInspector.onNewController(
        controller,
        'InspListPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - allinspectionsds
    {
      let options = {
        platform: `maximoMobile`,
        name: `allinspectionsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `multiple`,
          objectStructure: `mxapiinspectionres`,
          orderBy: `duedate`,
          savedQuery: `INSPRESULTALL`,
          offlineEnabled: false,
          mobileQbeFilter: {historyflag: '!=true'},
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `inspectionform.name`,
            `asset.assetnum`,
            `asset.description`,
            `locations.location`,
            `locations.description`
          ],
          indexAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `status_maxvalue`,
            `duedate`,
            `inspectionform.name`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.location--locationalias`,
            `locations.description--locdesc`,
            `locations.description--locdesc`,
            `historyflag`
          ],
          select: `siteid,orgid,resultnum,location,referenceobject,referenceobjectid,inspectionresultid,status,status_maxvalue,status_description,createdate,duedate,allowedactions,inspectionform.name,inspectionform.inspectionformid,inspectionform.hasrequiredquestion,inspectionform.inspquestionunit._dbcount--totalquestion,sequence,asset.assetnum--assetnumalias,asset.description--assetdesc,rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}},locations.location--locationalias,locations.description--locdesc,rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href},allowedstates,inspresultstatus{href,_bulkid},parent,historyflag,computedTitle,computedWOTitle,computedWONum,computedButtonLabel,computedCompletedDate,computedIsOverDue,computedQuestions,computedDuration,computedAsset,computedLocation,autolocate,computedInspectionStatus`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `multiple`,
        sortAttributes: [
          `duedate`,
          `inspectionform.name`,
          `asset.assetnum--assetnumalias`,
          `asset.description--assetdesc`,
          `locations.location--locationalias`,
          `locations.description--locdesc`
        ],
        schemaExt: [
          {
            name: `siteid`,
            id: `d_8mz`
          },
          {
            name: `orgid`,
            id: `nka7x`
          },
          {
            name: `resultnum`,
            searchable: `true`,
            id: `q__qy`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `vg234`
          },
          {
            name: `referenceobject`,
            id: `r38a5`
          },
          {
            name: `referenceobjectid`,
            searchable: `true`,
            id: `b3wm6`
          },
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `prqkd`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `bq_pg`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `n892b`
          },
          {
            name: `status_description`,
            id: `nagwn`
          },
          {
            name: `createdate`,
            id: `xkznx`
          },
          {
            name: `duedate`,
            sortable: `true`,
            id: `b6xwy`
          },
          {
            name: `allowedactions`,
            id: `z3kq8`
          },
          {
            name: `inspectionform.name`,
            searchable: `true`,
            sortable: `true`,
            id: `p8xp9`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `xek92`
          },
          {
            name: `inspectionform.hasrequiredquestion`,
            id: `y_kwy`
          },
          {
            name: `inspectionform.inspquestionunit._dbcount--totalquestion`,
            id: `m98bg`
          },
          {
            name: `sequence`,
            id: `w3w44`
          },
          {
            name: `asset.assetnum--assetnumalias`,
            sortable: `true`,
            searchable: `true`,
            id: `xnd4x`
          },
          {
            name: `asset.description--assetdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `xkb3x`
          },
          {
            name: `rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `yq7pe`
          },
          {
            name: `locations.location--locationalias`,
            sortable: `true`,
            searchable: `true`,
            id: `mbvwk`
          },
          {
            name: `locations.description--locdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `awjz8`
          },
          {
            name: `rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `eqg5w`
          },
          {
            name: `rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href}`,
            id: `bx78q`
          },
          {
            name: `allowedstates`,
            id: `gnp7w`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `jazrj`
          },
          {
            name: `parent`,
            id: `w6zg2`
          },
          {
            name: `historyflag`,
            index: `true`,
            id: `ry8ga`
          },
          {
            name: `computedTitle`,
            'computed-function': `_computeTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g3_55_title', 'Title'),
            remarks: app.getLocalizedLabel('g3_55_remarks', 'Title'),
            id: `g3_55`,
            computed: `true`
          },
          {
            name: `computedWOTitle`,
            'computed-function': `_computeWOTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g776q_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'g776q_remarks',
              'Work Order type and number'
            ),
            id: `g776q`,
            computed: `true`
          },
          {
            name: `computedWONum`,
            'computed-function': `_computeWONum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('gabwm_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'gabwm_remarks',
              'Identifies the work order'
            ),
            id: `gabwm`,
            computed: `true`
          },
          {
            name: `computedButtonLabel`,
            'computed-function': `_computeButtonLabel`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `ej3w6`,
            computed: `true`
          },
          {
            name: `computedCompletedDate`,
            'computed-function': `_computeCompletedDate`,
            type: `STRING`,
            'sub-type': `DATETIME`,
            title: app.getLocalizedLabel('xqzdv_title', 'Completed Date'),
            remarks: app.getLocalizedLabel('xqzdv_remarks', 'Completed Date'),
            id: `xqzdv`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('mnw4e_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'mnw4e_remarks',
              'computedIsOverDue'
            ),
            id: `mnw4e`,
            computed: `true`
          },
          {
            name: `computedQuestions`,
            'computed-function': `_computeQuestionCount`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('akyrw_title', 'Inspection Questions'),
            remarks: app.getLocalizedLabel(
              'akyrw_remarks',
              'Amount of questions in inspection form'
            ),
            id: `akyrw`,
            computed: `true`
          },
          {
            name: `computedDuration`,
            'computed-function': `_computeDuration`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `k5989`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAsset`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `dv82e`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocation`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `nzb8w`,
            computed: `true`
          },
          {
            name: `autolocate`,
            'computed-function': `_computeAutolocate`,
            id: `zgnm9`,
            computed: `true`
          },
          {
            name: `computedInspectionStatus`,
            'computed-function': `computedInspectionStatus`,
            id: `ewgm6`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeTitle', item)
          },
          computedWOTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWOTitle', item)
          },
          computedWONum: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWONum', item)
          },
          computedButtonLabel: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeButtonLabel', item)
          },
          computedCompletedDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeCompletedDate', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedQuestions: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeQuestionCount', item)
          },
          computedDuration: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeDuration', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAsset', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocation', item)
          },
          autolocate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAutolocate', item)
          },
          computedInspectionStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedInspectionStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {historyflag: '!=true'},
            check: () => {
              return {historyflag: '!=true'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspListDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspListDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - allinspectionsds

    // begin datasource - assignedworkds
    {
      let options = {
        platform: `maximoMobile`,
        name: `assignedworkds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `ASSIGNEDWORKTODAY`,
          mobileQbeFilter: {
            status_maxvalue: '!=COMPLETED',
            historyflag: '!=true'
          },
          select:
            'siteid,orgid,resultnum,location,referenceobject,referenceobjectid,inspectionresultid,status,status_maxvalue,status_description,createdate,duedate,allowedactions,inspectionform.name,inspectionform.inspectionformid,inspectionform.hasrequiredquestion,inspectionform.inspquestionunit._dbcount--totalquestion,sequence,asset.assetnum--assetnumalias,asset.description--assetdesc,rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}},locations.location--locationalias,locations.description--locdesc,rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href},allowedstates,inspresultstatus{href,_bulkid},parent,historyflag,computedTitle,computedWOTitle,computedWONum,computedButtonLabel,computedCompletedDate,computedIsOverDue,computedQuestions,computedDuration,computedAsset,computedLocation,autolocate,computedInspectionStatus',
          sortAttributes: [
            `duedate`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.description--locdesc`
          ],
          searchAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `inspectionform.name`,
            `asset.assetnum`,
            `asset.description`,
            `locations.location`,
            `locations.description`
          ],
          selectionMode: `multiple`,
          objectStructure: `mxapiinspectionres`,
          orderBy: `duedate`,
          offlineEnabled: false,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `status_maxvalue`,
            `duedate`,
            `inspectionform.name`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.location--locationalias`,
            `locations.description--locdesc`,
            `locations.description--locdesc`,
            `historyflag`
          ]
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `multiple`,
        sortAttributes: [
          `duedate`,
          `inspectionform.name`,
          `asset.assetnum--assetnumalias`,
          `asset.description--assetdesc`,
          `locations.location--locationalias`,
          `locations.description--locdesc`
        ],
        schemaExt: [
          {
            name: `siteid`,
            id: `d_8mz`
          },
          {
            name: `orgid`,
            id: `nka7x`
          },
          {
            name: `resultnum`,
            searchable: `true`,
            id: `q__qy`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `vg234`
          },
          {
            name: `referenceobject`,
            id: `r38a5`
          },
          {
            name: `referenceobjectid`,
            searchable: `true`,
            id: `b3wm6`
          },
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `prqkd`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `bq_pg`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `n892b`
          },
          {
            name: `status_description`,
            id: `nagwn`
          },
          {
            name: `createdate`,
            id: `xkznx`
          },
          {
            name: `duedate`,
            sortable: `true`,
            id: `b6xwy`
          },
          {
            name: `allowedactions`,
            id: `z3kq8`
          },
          {
            name: `inspectionform.name`,
            searchable: `true`,
            sortable: `true`,
            id: `p8xp9`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `xek92`
          },
          {
            name: `inspectionform.hasrequiredquestion`,
            id: `y_kwy`
          },
          {
            name: `inspectionform.inspquestionunit._dbcount--totalquestion`,
            id: `m98bg`
          },
          {
            name: `sequence`,
            id: `w3w44`
          },
          {
            name: `asset.assetnum--assetnumalias`,
            sortable: `true`,
            searchable: `true`,
            id: `xnd4x`
          },
          {
            name: `asset.description--assetdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `xkb3x`
          },
          {
            name: `rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `yq7pe`
          },
          {
            name: `locations.location--locationalias`,
            sortable: `true`,
            searchable: `true`,
            id: `mbvwk`
          },
          {
            name: `locations.description--locdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `awjz8`
          },
          {
            name: `rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `eqg5w`
          },
          {
            name: `rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href}`,
            id: `bx78q`
          },
          {
            name: `allowedstates`,
            id: `gnp7w`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `jazrj`
          },
          {
            name: `parent`,
            id: `w6zg2`
          },
          {
            name: `historyflag`,
            index: `true`,
            id: `ry8ga`
          },
          {
            name: `computedTitle`,
            'computed-function': `_computeTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g3_55_title', 'Title'),
            remarks: app.getLocalizedLabel('g3_55_remarks', 'Title'),
            id: `g3_55`,
            computed: `true`
          },
          {
            name: `computedWOTitle`,
            'computed-function': `_computeWOTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g776q_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'g776q_remarks',
              'Work Order type and number'
            ),
            id: `g776q`,
            computed: `true`
          },
          {
            name: `computedWONum`,
            'computed-function': `_computeWONum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('gabwm_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'gabwm_remarks',
              'Identifies the work order'
            ),
            id: `gabwm`,
            computed: `true`
          },
          {
            name: `computedButtonLabel`,
            'computed-function': `_computeButtonLabel`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `ej3w6`,
            computed: `true`
          },
          {
            name: `computedCompletedDate`,
            'computed-function': `_computeCompletedDate`,
            type: `STRING`,
            'sub-type': `DATETIME`,
            title: app.getLocalizedLabel('xqzdv_title', 'Completed Date'),
            remarks: app.getLocalizedLabel('xqzdv_remarks', 'Completed Date'),
            id: `xqzdv`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('mnw4e_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'mnw4e_remarks',
              'computedIsOverDue'
            ),
            id: `mnw4e`,
            computed: `true`
          },
          {
            name: `computedQuestions`,
            'computed-function': `_computeQuestionCount`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('akyrw_title', 'Inspection Questions'),
            remarks: app.getLocalizedLabel(
              'akyrw_remarks',
              'Amount of questions in inspection form'
            ),
            id: `akyrw`,
            computed: `true`
          },
          {
            name: `computedDuration`,
            'computed-function': `_computeDuration`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `k5989`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAsset`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `dv82e`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocation`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `nzb8w`,
            computed: `true`
          },
          {
            name: `autolocate`,
            'computed-function': `_computeAutolocate`,
            id: `zgnm9`,
            computed: `true`
          },
          {
            name: `computedInspectionStatus`,
            'computed-function': `computedInspectionStatus`,
            id: `ewgm6`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `allinspectionsds`,
        computedFields: {
          computedTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeTitle', item)
          },
          computedWOTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWOTitle', item)
          },
          computedWONum: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWONum', item)
          },
          computedButtonLabel: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeButtonLabel', item)
          },
          computedCompletedDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeCompletedDate', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedQuestions: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeQuestionCount', item)
          },
          computedDuration: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeDuration', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAsset', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocation', item)
          },
          autolocate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAutolocate', item)
          },
          computedInspectionStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedInspectionStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '!=COMPLETED', historyflag: '!=true'},
            check: () => {
              return {status_maxvalue: '!=COMPLETED', historyflag: '!=true'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspListDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspListDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - assignedworkds

    // begin datasource - pendingds
    {
      let options = {
        platform: `maximoMobile`,
        name: `pendingds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `INSPRESULTPENDING`,
          mobileQbeFilter: {status_maxvalue: '=PENDING', historyflag: '!=true'},
          select:
            'siteid,orgid,resultnum,location,referenceobject,referenceobjectid,inspectionresultid,status,status_maxvalue,status_description,createdate,duedate,allowedactions,inspectionform.name,inspectionform.inspectionformid,inspectionform.hasrequiredquestion,inspectionform.inspquestionunit._dbcount--totalquestion,sequence,asset.assetnum--assetnumalias,asset.description--assetdesc,rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}},locations.location--locationalias,locations.description--locdesc,rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href},allowedstates,inspresultstatus{href,_bulkid},parent,historyflag,computedTitle,computedWOTitle,computedWONum,computedButtonLabel,computedCompletedDate,computedIsOverDue,computedQuestions,computedDuration,computedAsset,computedLocation,autolocate,computedInspectionStatus',
          sortAttributes: [
            `duedate`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.description--locdesc`
          ],
          searchAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `inspectionform.name`,
            `asset.assetnum`,
            `asset.description`,
            `locations.location`,
            `locations.description`
          ],
          selectionMode: `multiple`,
          objectStructure: `mxapiinspectionres`,
          orderBy: `duedate`,
          offlineEnabled: false,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `status_maxvalue`,
            `duedate`,
            `inspectionform.name`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.location--locationalias`,
            `locations.description--locdesc`,
            `locations.description--locdesc`,
            `historyflag`
          ]
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `multiple`,
        sortAttributes: [
          `duedate`,
          `inspectionform.name`,
          `asset.assetnum--assetnumalias`,
          `asset.description--assetdesc`,
          `locations.location--locationalias`,
          `locations.description--locdesc`
        ],
        schemaExt: [
          {
            name: `siteid`,
            id: `d_8mz`
          },
          {
            name: `orgid`,
            id: `nka7x`
          },
          {
            name: `resultnum`,
            searchable: `true`,
            id: `q__qy`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `vg234`
          },
          {
            name: `referenceobject`,
            id: `r38a5`
          },
          {
            name: `referenceobjectid`,
            searchable: `true`,
            id: `b3wm6`
          },
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `prqkd`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `bq_pg`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `n892b`
          },
          {
            name: `status_description`,
            id: `nagwn`
          },
          {
            name: `createdate`,
            id: `xkznx`
          },
          {
            name: `duedate`,
            sortable: `true`,
            id: `b6xwy`
          },
          {
            name: `allowedactions`,
            id: `z3kq8`
          },
          {
            name: `inspectionform.name`,
            searchable: `true`,
            sortable: `true`,
            id: `p8xp9`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `xek92`
          },
          {
            name: `inspectionform.hasrequiredquestion`,
            id: `y_kwy`
          },
          {
            name: `inspectionform.inspquestionunit._dbcount--totalquestion`,
            id: `m98bg`
          },
          {
            name: `sequence`,
            id: `w3w44`
          },
          {
            name: `asset.assetnum--assetnumalias`,
            sortable: `true`,
            searchable: `true`,
            id: `xnd4x`
          },
          {
            name: `asset.description--assetdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `xkb3x`
          },
          {
            name: `rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `yq7pe`
          },
          {
            name: `locations.location--locationalias`,
            sortable: `true`,
            searchable: `true`,
            id: `mbvwk`
          },
          {
            name: `locations.description--locdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `awjz8`
          },
          {
            name: `rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `eqg5w`
          },
          {
            name: `rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href}`,
            id: `bx78q`
          },
          {
            name: `allowedstates`,
            id: `gnp7w`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `jazrj`
          },
          {
            name: `parent`,
            id: `w6zg2`
          },
          {
            name: `historyflag`,
            index: `true`,
            id: `ry8ga`
          },
          {
            name: `computedTitle`,
            'computed-function': `_computeTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g3_55_title', 'Title'),
            remarks: app.getLocalizedLabel('g3_55_remarks', 'Title'),
            id: `g3_55`,
            computed: `true`
          },
          {
            name: `computedWOTitle`,
            'computed-function': `_computeWOTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g776q_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'g776q_remarks',
              'Work Order type and number'
            ),
            id: `g776q`,
            computed: `true`
          },
          {
            name: `computedWONum`,
            'computed-function': `_computeWONum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('gabwm_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'gabwm_remarks',
              'Identifies the work order'
            ),
            id: `gabwm`,
            computed: `true`
          },
          {
            name: `computedButtonLabel`,
            'computed-function': `_computeButtonLabel`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `ej3w6`,
            computed: `true`
          },
          {
            name: `computedCompletedDate`,
            'computed-function': `_computeCompletedDate`,
            type: `STRING`,
            'sub-type': `DATETIME`,
            title: app.getLocalizedLabel('xqzdv_title', 'Completed Date'),
            remarks: app.getLocalizedLabel('xqzdv_remarks', 'Completed Date'),
            id: `xqzdv`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('mnw4e_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'mnw4e_remarks',
              'computedIsOverDue'
            ),
            id: `mnw4e`,
            computed: `true`
          },
          {
            name: `computedQuestions`,
            'computed-function': `_computeQuestionCount`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('akyrw_title', 'Inspection Questions'),
            remarks: app.getLocalizedLabel(
              'akyrw_remarks',
              'Amount of questions in inspection form'
            ),
            id: `akyrw`,
            computed: `true`
          },
          {
            name: `computedDuration`,
            'computed-function': `_computeDuration`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `k5989`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAsset`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `dv82e`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocation`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `nzb8w`,
            computed: `true`
          },
          {
            name: `autolocate`,
            'computed-function': `_computeAutolocate`,
            id: `zgnm9`,
            computed: `true`
          },
          {
            name: `computedInspectionStatus`,
            'computed-function': `computedInspectionStatus`,
            id: `ewgm6`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `allinspectionsds`,
        computedFields: {
          computedTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeTitle', item)
          },
          computedWOTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWOTitle', item)
          },
          computedWONum: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWONum', item)
          },
          computedButtonLabel: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeButtonLabel', item)
          },
          computedCompletedDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeCompletedDate', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedQuestions: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeQuestionCount', item)
          },
          computedDuration: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeDuration', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAsset', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocation', item)
          },
          autolocate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAutolocate', item)
          },
          computedInspectionStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedInspectionStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '=PENDING', historyflag: '!=true'},
            check: () => {
              return {status_maxvalue: '=PENDING', historyflag: '!=true'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspListDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspListDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - pendingds

    // begin datasource - inprogds
    {
      let options = {
        platform: `maximoMobile`,
        name: `inprogds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `INSPRESULTINPROGRESS`,
          mobileQbeFilter: {status_maxvalue: '=INPROG', historyflag: '!=true'},
          select:
            'siteid,orgid,resultnum,location,referenceobject,referenceobjectid,inspectionresultid,status,status_maxvalue,status_description,createdate,duedate,allowedactions,inspectionform.name,inspectionform.inspectionformid,inspectionform.hasrequiredquestion,inspectionform.inspquestionunit._dbcount--totalquestion,sequence,asset.assetnum--assetnumalias,asset.description--assetdesc,rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}},locations.location--locationalias,locations.description--locdesc,rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href},allowedstates,inspresultstatus{href,_bulkid},parent,historyflag,computedTitle,computedWOTitle,computedWONum,computedButtonLabel,computedCompletedDate,computedIsOverDue,computedQuestions,computedDuration,computedAsset,computedLocation,autolocate,computedInspectionStatus',
          sortAttributes: [
            `duedate`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.description--locdesc`
          ],
          searchAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `inspectionform.name`,
            `asset.assetnum`,
            `asset.description`,
            `locations.location`,
            `locations.description`
          ],
          selectionMode: `multiple`,
          objectStructure: `mxapiinspectionres`,
          orderBy: `duedate`,
          offlineEnabled: false,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `status_maxvalue`,
            `duedate`,
            `inspectionform.name`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.location--locationalias`,
            `locations.description--locdesc`,
            `locations.description--locdesc`,
            `historyflag`
          ]
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `multiple`,
        sortAttributes: [
          `duedate`,
          `inspectionform.name`,
          `asset.assetnum--assetnumalias`,
          `asset.description--assetdesc`,
          `locations.location--locationalias`,
          `locations.description--locdesc`
        ],
        schemaExt: [
          {
            name: `siteid`,
            id: `d_8mz`
          },
          {
            name: `orgid`,
            id: `nka7x`
          },
          {
            name: `resultnum`,
            searchable: `true`,
            id: `q__qy`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `vg234`
          },
          {
            name: `referenceobject`,
            id: `r38a5`
          },
          {
            name: `referenceobjectid`,
            searchable: `true`,
            id: `b3wm6`
          },
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `prqkd`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `bq_pg`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `n892b`
          },
          {
            name: `status_description`,
            id: `nagwn`
          },
          {
            name: `createdate`,
            id: `xkznx`
          },
          {
            name: `duedate`,
            sortable: `true`,
            id: `b6xwy`
          },
          {
            name: `allowedactions`,
            id: `z3kq8`
          },
          {
            name: `inspectionform.name`,
            searchable: `true`,
            sortable: `true`,
            id: `p8xp9`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `xek92`
          },
          {
            name: `inspectionform.hasrequiredquestion`,
            id: `y_kwy`
          },
          {
            name: `inspectionform.inspquestionunit._dbcount--totalquestion`,
            id: `m98bg`
          },
          {
            name: `sequence`,
            id: `w3w44`
          },
          {
            name: `asset.assetnum--assetnumalias`,
            sortable: `true`,
            searchable: `true`,
            id: `xnd4x`
          },
          {
            name: `asset.description--assetdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `xkb3x`
          },
          {
            name: `rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `yq7pe`
          },
          {
            name: `locations.location--locationalias`,
            sortable: `true`,
            searchable: `true`,
            id: `mbvwk`
          },
          {
            name: `locations.description--locdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `awjz8`
          },
          {
            name: `rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `eqg5w`
          },
          {
            name: `rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href}`,
            id: `bx78q`
          },
          {
            name: `allowedstates`,
            id: `gnp7w`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `jazrj`
          },
          {
            name: `parent`,
            id: `w6zg2`
          },
          {
            name: `historyflag`,
            index: `true`,
            id: `ry8ga`
          },
          {
            name: `computedTitle`,
            'computed-function': `_computeTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g3_55_title', 'Title'),
            remarks: app.getLocalizedLabel('g3_55_remarks', 'Title'),
            id: `g3_55`,
            computed: `true`
          },
          {
            name: `computedWOTitle`,
            'computed-function': `_computeWOTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g776q_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'g776q_remarks',
              'Work Order type and number'
            ),
            id: `g776q`,
            computed: `true`
          },
          {
            name: `computedWONum`,
            'computed-function': `_computeWONum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('gabwm_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'gabwm_remarks',
              'Identifies the work order'
            ),
            id: `gabwm`,
            computed: `true`
          },
          {
            name: `computedButtonLabel`,
            'computed-function': `_computeButtonLabel`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `ej3w6`,
            computed: `true`
          },
          {
            name: `computedCompletedDate`,
            'computed-function': `_computeCompletedDate`,
            type: `STRING`,
            'sub-type': `DATETIME`,
            title: app.getLocalizedLabel('xqzdv_title', 'Completed Date'),
            remarks: app.getLocalizedLabel('xqzdv_remarks', 'Completed Date'),
            id: `xqzdv`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('mnw4e_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'mnw4e_remarks',
              'computedIsOverDue'
            ),
            id: `mnw4e`,
            computed: `true`
          },
          {
            name: `computedQuestions`,
            'computed-function': `_computeQuestionCount`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('akyrw_title', 'Inspection Questions'),
            remarks: app.getLocalizedLabel(
              'akyrw_remarks',
              'Amount of questions in inspection form'
            ),
            id: `akyrw`,
            computed: `true`
          },
          {
            name: `computedDuration`,
            'computed-function': `_computeDuration`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `k5989`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAsset`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `dv82e`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocation`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `nzb8w`,
            computed: `true`
          },
          {
            name: `autolocate`,
            'computed-function': `_computeAutolocate`,
            id: `zgnm9`,
            computed: `true`
          },
          {
            name: `computedInspectionStatus`,
            'computed-function': `computedInspectionStatus`,
            id: `ewgm6`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `allinspectionsds`,
        computedFields: {
          computedTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeTitle', item)
          },
          computedWOTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWOTitle', item)
          },
          computedWONum: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWONum', item)
          },
          computedButtonLabel: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeButtonLabel', item)
          },
          computedCompletedDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeCompletedDate', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedQuestions: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeQuestionCount', item)
          },
          computedDuration: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeDuration', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAsset', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocation', item)
          },
          autolocate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAutolocate', item)
          },
          computedInspectionStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedInspectionStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {status_maxvalue: '=INPROG', historyflag: '!=true'},
            check: () => {
              return {status_maxvalue: '=INPROG', historyflag: '!=true'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspListDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspListDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inprogds

    // begin datasource - completedds
    {
      let options = {
        platform: `maximoMobile`,
        name: `completedds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          savedQuery: `INSPRESULTCOMPLETE`,
          select:
            'siteid,orgid,resultnum,location,referenceobject,referenceobjectid,inspectionresultid,status,status_maxvalue,status_description,createdate,duedate,allowedactions,inspectionform.name,inspectionform.inspectionformid,inspectionform.hasrequiredquestion,inspectionform.inspquestionunit._dbcount--totalquestion,sequence,asset.assetnum--assetnumalias,asset.description--assetdesc,rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}},locations.location--locationalias,locations.description--locdesc,rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href},allowedstates,inspresultstatus{href,_bulkid},parent,historyflag,computedTitle,computedWOTitle,computedWONum,computedButtonLabel,computedCompletedDate,computedIsOverDue,computedQuestions,computedDuration,computedAsset,computedLocation,autolocate,computedInspectionStatus',
          sortAttributes: [
            `duedate`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.description--locdesc`
          ],
          searchAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `inspectionform.name`,
            `asset.assetnum`,
            `asset.description`,
            `locations.location`,
            `locations.description`
          ],
          selectionMode: `multiple`,
          objectStructure: `mxapiinspectionres`,
          orderBy: `duedate`,
          offlineEnabled: false,
          mobileQbeFilter: {historyflag: '!=true'},
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          indexAttributes: [
            `resultnum`,
            `location`,
            `referenceobjectid`,
            `status`,
            `status_maxvalue`,
            `duedate`,
            `inspectionform.name`,
            `inspectionform.name`,
            `asset.assetnum--assetnumalias`,
            `asset.assetnum--assetnumalias`,
            `asset.description--assetdesc`,
            `asset.description--assetdesc`,
            `locations.location--locationalias`,
            `locations.location--locationalias`,
            `locations.description--locdesc`,
            `locations.description--locdesc`,
            `historyflag`
          ]
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `multiple`,
        sortAttributes: [
          `duedate`,
          `inspectionform.name`,
          `asset.assetnum--assetnumalias`,
          `asset.description--assetdesc`,
          `locations.location--locationalias`,
          `locations.description--locdesc`
        ],
        schemaExt: [
          {
            name: `siteid`,
            id: `d_8mz`
          },
          {
            name: `orgid`,
            id: `nka7x`
          },
          {
            name: `resultnum`,
            searchable: `true`,
            id: `q__qy`
          },
          {
            name: `location`,
            searchable: `true`,
            id: `vg234`
          },
          {
            name: `referenceobject`,
            id: `r38a5`
          },
          {
            name: `referenceobjectid`,
            searchable: `true`,
            id: `b3wm6`
          },
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `prqkd`
          },
          {
            name: `status`,
            searchable: `true`,
            id: `bq_pg`
          },
          {
            name: `status_maxvalue`,
            index: `true`,
            id: `n892b`
          },
          {
            name: `status_description`,
            id: `nagwn`
          },
          {
            name: `createdate`,
            id: `xkznx`
          },
          {
            name: `duedate`,
            sortable: `true`,
            id: `b6xwy`
          },
          {
            name: `allowedactions`,
            id: `z3kq8`
          },
          {
            name: `inspectionform.name`,
            searchable: `true`,
            sortable: `true`,
            id: `p8xp9`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `xek92`
          },
          {
            name: `inspectionform.hasrequiredquestion`,
            id: `y_kwy`
          },
          {
            name: `inspectionform.inspquestionunit._dbcount--totalquestion`,
            id: `m98bg`
          },
          {
            name: `sequence`,
            id: `w3w44`
          },
          {
            name: `asset.assetnum--assetnumalias`,
            sortable: `true`,
            searchable: `true`,
            id: `xnd4x`
          },
          {
            name: `asset.description--assetdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `xkb3x`
          },
          {
            name: `rel.asset{assetnum, description, autolocate, rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `yq7pe`
          },
          {
            name: `locations.location--locationalias`,
            sortable: `true`,
            searchable: `true`,
            id: `mbvwk`
          },
          {
            name: `locations.description--locdesc`,
            sortable: `true`,
            searchable: `true`,
            id: `awjz8`
          },
          {
            name: `rel.locations{location, description, autolocate, rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `eqg5w`
          },
          {
            name: `rel.workorder.mxapiwodetail{wonum, description, taskid, worktype, schedstart, istask, estdur, autolocate, parent{wonum, description}, href}`,
            id: `bx78q`
          },
          {
            name: `allowedstates`,
            id: `gnp7w`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `jazrj`
          },
          {
            name: `parent`,
            id: `w6zg2`
          },
          {
            name: `historyflag`,
            index: `true`,
            id: `ry8ga`
          },
          {
            name: `computedTitle`,
            'computed-function': `_computeTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g3_55_title', 'Title'),
            remarks: app.getLocalizedLabel('g3_55_remarks', 'Title'),
            id: `g3_55`,
            computed: `true`
          },
          {
            name: `computedWOTitle`,
            'computed-function': `_computeWOTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('g776q_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'g776q_remarks',
              'Work Order type and number'
            ),
            id: `g776q`,
            computed: `true`
          },
          {
            name: `computedWONum`,
            'computed-function': `_computeWONum`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('gabwm_title', 'Work Order'),
            remarks: app.getLocalizedLabel(
              'gabwm_remarks',
              'Identifies the work order'
            ),
            id: `gabwm`,
            computed: `true`
          },
          {
            name: `computedButtonLabel`,
            'computed-function': `_computeButtonLabel`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `ej3w6`,
            computed: `true`
          },
          {
            name: `computedCompletedDate`,
            'computed-function': `_computeCompletedDate`,
            type: `STRING`,
            'sub-type': `DATETIME`,
            title: app.getLocalizedLabel('xqzdv_title', 'Completed Date'),
            remarks: app.getLocalizedLabel('xqzdv_remarks', 'Completed Date'),
            id: `xqzdv`,
            computed: `true`
          },
          {
            name: `computedIsOverDue`,
            'computed-function': `computedIsOverDue`,
            title: app.getLocalizedLabel('mnw4e_title', 'computedIsOverDue'),
            remarks: app.getLocalizedLabel(
              'mnw4e_remarks',
              'computedIsOverDue'
            ),
            id: `mnw4e`,
            computed: `true`
          },
          {
            name: `computedQuestions`,
            'computed-function': `_computeQuestionCount`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('akyrw_title', 'Inspection Questions'),
            remarks: app.getLocalizedLabel(
              'akyrw_remarks',
              'Amount of questions in inspection form'
            ),
            id: `akyrw`,
            computed: `true`
          },
          {
            name: `computedDuration`,
            'computed-function': `_computeDuration`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `k5989`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAsset`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `dv82e`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocation`,
            type: `STRING`,
            'sub-type': `ALN`,
            id: `nzb8w`,
            computed: `true`
          },
          {
            name: `autolocate`,
            'computed-function': `_computeAutolocate`,
            id: `zgnm9`,
            computed: `true`
          },
          {
            name: `computedInspectionStatus`,
            'computed-function': `computedInspectionStatus`,
            id: `ewgm6`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `allinspectionsds`,
        computedFields: {
          computedTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeTitle', item)
          },
          computedWOTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWOTitle', item)
          },
          computedWONum: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWONum', item)
          },
          computedButtonLabel: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeButtonLabel', item)
          },
          computedCompletedDate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeCompletedDate', item)
          },
          computedIsOverDue: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedIsOverDue', item)
          },
          computedQuestions: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeQuestionCount', item)
          },
          computedDuration: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeDuration', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAsset', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocation', item)
          },
          autolocate: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAutolocate', item)
          },
          computedInspectionStatus: {
            computedFunction: (item, datasource) =>
              datasource.callController('computedInspectionStatus', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `mobileQbeFilter`,
            lastValue: {historyflag: '!=true'},
            check: () => {
              return {historyflag: '!=true'};
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspListDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspListDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - completedds

    // begin datasource - jsonclusterinspectionsds
    {
      let options = {
        name: `jsonclusterinspectionsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `items`,
        schemaExt: [
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `djbxa`
          },
          {
            name: `inspectionform.name`,
            id: `kkg_x`
          },
          {
            name: `autolocate`,
            id: `jz567`
          },
          {
            name: `computedTitle`,
            id: `m33pb`
          },
          {
            name: `computedAsset`,
            id: `p7k9q`
          },
          {
            name: `computedLocation`,
            id: `b9z5g`
          }
        ],
        sortAttributes: [],
        idAttribute: `inspectionresultid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `inspectionresultid,inspectionform.name,autolocate,computedTitle,computedAsset,computedLocation`,
          src: []
        },
        autoSave: true,
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
        preLoad: true
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
    // end datasource - jsonclusterinspectionsds

    // begin datasource - jsoncardinspectionsds
    {
      let options = {
        name: `jsoncardinspectionsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `items`,
        schemaExt: [
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `xmmy7`
          },
          {
            name: `inspectionform.name`,
            id: `bp8z8`
          },
          {
            name: `autolocate`,
            id: `r6ymm`
          },
          {
            name: `status`,
            id: `dnzq3`
          }
        ],
        sortAttributes: [],
        idAttribute: `inspectionresultid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `inspectionresultid,inspectionform.name,autolocate,status`,
          src: []
        },
        autoSave: true,
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
        preLoad: true
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
    // end datasource - jsoncardinspectionsds

    // begin datasource - dsstatusDomainList
    {
      let options = {
        name: `dsstatusDomainList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `statusItems`,
        schemaExt: [
          {
            name: `value`,
            id: `yyv5y`
          },
          {
            name: `description`,
            id: `grbwb`
          }
        ],
        sortAttributes: [],
        idAttribute: `value`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `value,description`,
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

    // begin dialog - dialogmap
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `dialogmap`,
        configuration: {
          id: `dialogmap`,
          dialogRenderer: props => {
            return (
              <DialogDialogmap
                id={'dialogmap_dlg_container'}
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
    // end dialog - dialogmap

    // begin dialog - inspectionStatusChangeDialog
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `inspectionStatusChangeDialog`,
        configuration: {
          id: `inspectionStatusChangeDialog`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerInspectionStatusChangeDialog
                slidingDrawerProps={props}
                id={'inspectionStatusChangeDialog_slidingdrawer_container'}
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
    // end dialog - inspectionStatusChangeDialog
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'transition_page' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'transition_page',
        clearStack: false,
        parent: app,
        route: '/transition_page',
        title: app.getLocalizedLabel('transition_page_title', 'transition_page')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new TransitionPageController();
      bootstrapInspector.onNewController(
        controller,
        'TransitionPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - contextredirectds
    {
      let options = {
        platform: `maximoMobile`,
        name: `contextredirectds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiinspectionres`,
          where: `inspectionresultid=${page.params.inspectionresultid}`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `inspectionresultid,resultnum,href,status,allowedstates`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `jem7j`
          },
          {
            name: `resultnum`,
            id: `xg842`
          },
          {
            name: `href`,
            id: `z4w9z`
          },
          {
            name: `status`,
            id: `z4dw9z`
          },
          {
            name: `allowedstates`,
            id: `xjdg8a`
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
            lastValue: `inspectionresultid=${page.params.inspectionresultid}`,
            check: () => {
              return `inspectionresultid=${page.params.inspectionresultid}`;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
    // end datasource - contextredirectds
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'createInspection' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'createInspection',
        clearStack: true,
        parent: app,
        route: '/createInspection',
        title: app.getLocalizedLabel(
          'createInspection_title',
          'createInspection'
        )
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          selected: '',
          splitViewIndex: null,
          asset: '{}',
          assetSelection: 'Select an Asset',
          locations: '{}',
          locationSelection: 'Select a Location'
        },
        'page'
      ),
      {}
    );

    {
      let controller = new CreateInspectionsPageController();
      bootstrapInspector.onNewController(
        controller,
        'CreateInspectionsPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - createInspectionDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `createInspectionDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          objectStructure: `mxapiinspectionres`,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`inspectionform.createdate`],
          indexAttributes: [
            `inspectionform.createdate`,
            `inspectionform.createdate`
          ],
          select: `siteid,orgid,resultnum,revision,inspformnum,referenceobject,referenceobjectid,status,createdate,duedate,inspectionform.name,inspectionform.createdate,inspectionform.inspectionformid,inspectionform.inspformnum,inspectionform.audioguided,inspectionform.revision,inspectionform.status,inspectionform.hasld,inspectionform.readconfirmation,rel.asset{assetnum,description,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}},rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder{wonum, description, taskid, worktype, schedstart, istask, autolocate,parent{wonum, description}},inspresultstatus{href,_bulkid},parent`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: ``,
        sortAttributes: [`inspectionform.createdate`],
        schemaExt: [
          {
            name: `siteid`,
            id: `yjpxr`
          },
          {
            name: `orgid`,
            id: `bmgnk`
          },
          {
            name: `resultnum`,
            id: `eq9gk`
          },
          {
            name: `revision`,
            id: `edde_`
          },
          {
            name: `inspformnum`,
            id: `mn63z`
          },
          {
            name: `referenceobject`,
            id: `v64j3`
          },
          {
            name: `referenceobjectid`,
            id: `a3e4d`
          },
          {
            name: `status`,
            id: `zxq_y`
          },
          {
            name: `createdate`,
            id: `aw664`
          },
          {
            name: `duedate`,
            id: `w_6_b`
          },
          {
            name: `inspectionform.name`,
            id: `dna43`
          },
          {
            name: `inspectionform.createdate`,
            searchable: `true`,
            sortable: `true`,
            id: `y_zwb`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `jpyqp`
          },
          {
            name: `inspectionform.inspformnum`,
            id: `mwxxj`
          },
          {
            name: `inspectionform.audioguided`,
            id: `nye6y`
          },
          {
            name: `inspectionform.revision`,
            id: `e9kdn`
          },
          {
            name: `inspectionform.status`,
            id: `a8yd4`
          },
          {
            name: `inspectionform.hasld`,
            id: `q7rjm`
          },
          {
            name: `inspectionform.readconfirmation`,
            id: `v5va3`
          },
          {
            name: `rel.asset{assetnum,description,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `y8wwz`
          },
          {
            name: `rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `n8yzm`
          },
          {
            name: `rel.workorder{wonum, description, taskid, worktype, schedstart, istask, autolocate,parent{wonum, description}}`,
            id: `xrxem`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `yxr7j`
          },
          {
            name: `parent`,
            id: `yjx7e`
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
        isMaximoMobile: true,
        useWithMobile: false
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
    // end datasource - createInspectionDS

    // begin datasource - locationLookupDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `locationLookupDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIOPERLOC`,
          savedQuery: `MOBILELOCATION`,
          lookupData: true,
          offlineImmediateDownload: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
            `location`,
            `description`,
            `glaccount`,
            `type`,
            `status`,
            `siteid`,
            `orgid`
          ],
          indexAttributes: [
            `location`,
            `location`,
            `description`,
            `glaccount`,
            `type`,
            `status`,
            `siteid`,
            `orgid`
          ],
          select: `locationsid,location,description,failurecode,glaccount,locpriority,rel.asset{assetnum,location,description,priority,failurecode},type,status,siteid,orgid,autolocate,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`
        },
        objectStructure: `MXAPIOPERLOC`,
        idAttribute: `locationsid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `locationsid`,
            'unique-id': `true`,
            id: `vz5rv`
          },
          {
            name: `location`,
            searchable: `true`,
            index: `true`,
            id: `a27m4`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `a3xbd`
          },
          {
            name: `failurecode`,
            id: `zr_k3`
          },
          {
            name: `glaccount`,
            searchable: `true`,
            id: `k6xn7`
          },
          {
            name: `locpriority`,
            searchable: `false`,
            id: `b2rgd`
          },
          {
            name: `rel.asset{assetnum,location,description,priority,failurecode}`,
            id: `q_qpn`
          },
          {
            searchable: `true`,
            name: `type`,
            id: `q8xdp`,
            lookup: {
              name: `listLocationType`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `value`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            searchable: `true`,
            name: `status`,
            id: `bgzny`,
            lookup: {
              name: `locationstatus`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `value`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `rx3k_`
          },
          {
            name: `orgid`,
            searchable: `true`,
            id: `gy5jv`
          },
          {
            name: `autolocate`,
            id: `mmxan`
          },
          {
            name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
            id: `kvyzp`
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
        isMaximoMobile: true,
        useWithMobile: false
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
    // end datasource - locationLookupDS

    // begin datasource - assetLookupDS
    {
      let options = {
        platform: `maximoMobile`,
        name: `assetLookupDS`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `MXAPIASSET`,
          savedQuery: `MOBILEASSET`,
          lookupData: true,
          offlineImmediateDownload: true,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [
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
            `failurecode`
          ],
          indexAttributes: [
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
            `failurecode`
          ],
          select: `itemnum,assetuid,assetnum,description,assethealth,assettag,assettype,binnum,isrunning,itemnum,location,location.description--locationdesc,manufacturer,priority,serialnum,siteid,vendor,_imagelibref,assetchildren,children._dbcount--childcount,location.glaccount--locglaccount,children._dbcount--childcount,autolocate,children._dbcount--childcount,parent,children._dbcount--childcount,status,children._dbcount--childcount,failurecode,children._dbcount--childcount,location.locpriority--locpriority,children._dbcount--childcount,location.failurecode--locfailurecode,children._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},children._dbcount--childcount,rel.assetmeter{metername,active,rollover,lastreading,readingtype},children._dbcount--childcount`
        },
        objectStructure: `MXAPIASSET`,
        idAttribute: `assetuid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `itemnum`,
            searchable: `true`,
            id: `rzqm9`
          },
          {
            name: `assetuid`,
            'unique-id': `true`,
            id: `y6a7w`
          },
          {
            name: `assetnum`,
            searchable: `true`,
            id: `ax6b6`
          },
          {
            name: `description`,
            searchable: `true`,
            id: `mm_5w`
          },
          {
            name: `assethealth`,
            searchable: `true`,
            id: `rp_gd`
          },
          {
            searchable: `true`,
            name: `assettag`,
            id: `nwz6x`,
            lookup: {
              name: `assettag`,
              attributeMap: [
                {
                  datasourceField: `assettag`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `assettag`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            searchable: `true`,
            name: `assettype`,
            id: `y83be`,
            lookup: {
              name: `assettype`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `value`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            name: `binnum`,
            searchable: `true`,
            id: `yngn7`
          },
          {
            name: `isrunning`,
            searchable: `false`,
            id: `n_vzb`
          },
          {
            searchable: `true`,
            name: `itemnum`,
            id: `vkyy2`,
            lookup: {
              name: `assetitemnum`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `itemnum`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            searchable: `true`,
            name: `location`,
            id: `j_p8p`,
            lookup: {
              name: `assetloc`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `displayValue`
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
            id: `gkezk`
          },
          {
            searchable: `true`,
            name: `manufacturer`,
            id: `ezv4p`,
            lookup: {
              name: `assetmanufacturer`,
              attributeMap: [
                {
                  datasourceField: `name`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `company`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            name: `priority`,
            searchable: `true`,
            id: `a86bp`
          },
          {
            searchable: `true`,
            name: `serialnum`,
            id: `b2a32`,
            lookup: {
              name: `assetserialnum`,
              attributeMap: [
                {
                  datasourceField: `serialnum`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `serialnum`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            name: `siteid`,
            searchable: `true`,
            id: `qa6j4`
          },
          {
            name: `vendor`,
            searchable: `true`,
            id: `z349m`
          },
          {
            name: `_imagelibref`,
            id: `np_m8`
          },
          {
            name: `assetchildren`,
            'child-relationship': `children`,
            id: `k6bb2`
          },
          {
            name: `location.glaccount--locglaccount`,
            searchable: `true`,
            id: `zvnp3`
          },
          {
            name: `autolocate`,
            id: `krpvd`
          },
          {
            name: `parent`,
            searchable: `true`,
            id: `xmker`
          },
          {
            searchable: `true`,
            name: `status`,
            id: `ngzmj`,
            lookup: {
              name: `assetstatus`,
              attributeMap: [
                {
                  datasourceField: `description`,
                  lookupField: `displayValue`
                },
                {
                  datasourceField: `value`,
                  lookupField: `value`
                }
              ]
            }
          },
          {
            name: `failurecode`,
            searchable: `true`,
            id: `j8wyv`
          },
          {
            name: `location.locpriority--locpriority`,
            id: `dmarb`
          },
          {
            name: `location.failurecode--locfailurecode`,
            id: `pw595`
          },
          {
            name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
            id: `jrvdr`
          },
          {
            name: `rel.assetmeter{metername,active,rollover,lastreading,readingtype}`,
            id: `zp6y9`
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
        isMaximoMobile: true,
        useWithMobile: false
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
    // end datasource - assetLookupDS

    // begin dialog - locationLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `locationLookup`,
        configuration: {
          id: `locationLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupLocationLookup {...props} />;
          },
          renderer: props => {
            return <LookupLocationLookup {...props} />;
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
    // end dialog - locationLookup

    // begin dialog - assetLookup
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `assetLookup`,
        configuration: {
          id: `assetLookup`,
          type: `lookup`,
          align: `start`,
          dialogRenderer: props => {
            return <LookupAssetLookup {...props} />;
          },
          renderer: props => {
            return <LookupAssetLookup {...props} />;
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
    // end dialog - assetLookup

    // begin dialog - assetSelect
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `assetSelect`,
        configuration: {
          id: `assetSelect`,
          dialogRenderer: props => {
            return (
              <DialogAssetSelect
                id={'assetSelect_dlg_container'}
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
    // end dialog - assetSelect

    // begin dialog - locationSelect
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `locationSelect`,
        configuration: {
          id: `locationSelect`,
          dialogRenderer: props => {
            return (
              <DialogLocationSelect
                id={'locationSelect_dlg_container'}
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
    // end dialog - locationSelect
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'execution_panel' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'execution_panel',
        clearStack: false,
        parent: app,
        route: '/execution_panel',
        title: app.getLocalizedLabel('execution_panel_title', 'execution_panel')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState(
        {
          pageTitle: '',
          disableCompletion: true,
          isSaving: false,
          countLabel: '',
          computedTitle: '',
          computedAsset: '',
          computedLocation: '',
          computedLongDescription: '',
          metersList: '',
          inspectionResultLimit: 5,
          historicFieldDescription: '',
          syncRequested: false
        },
        'page'
      ),
      {}
    );

    {
      let controller = new ExecutionFormPageController();
      bootstrapInspector.onNewController(
        controller,
        'ExecutionFormPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - executeInspections
    {
      let options = {
        platform: `maximoMobile`,
        name: `executeInspections`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          cacheExpiryMs: 1,
          selectionMode: `single`,
          objectStructure: `mxapiinspectionres`,
          itemUrl:
            app && app.state && app.state.inspectionsList
              ? app.state.inspectionsList.currentItem
              : undefined,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          searchAttributes: [`inspectionform.createdate`],
          indexAttributes: [
            `inspectionform.createdate`,
            `inspectionform.createdate`
          ],
          select: `siteid,orgid,resultnum,revision,inspformnum,referenceobject,referenceobjectid,inspectionresultid,inspfieldresult{inspfieldresultid,errorflag,errormessage,inspfieldnum,inspfieldresultnum,inspformnum,inspquestionnum,orgid,resultnum,revision,siteid,txtresponse,numresponse,dateresponse,timeresponse,readconfirmation,rolloverflag,doclinks{*},inspfieldresultselection{txtresponse,inspfieldresultselectionid,anywhererefid},anywhererefid,actionrequired},status,createdate,duedate,inspectionform.name,inspectionform.createdate,inspectionform.inspectionformid,inspectionform.inspformnum,inspectionform.audioguided,inspectionform.revision,inspectionform.status,inspectionform.hasld,inspectionform.readconfirmation,rel.inspcascadeoption{inspcascadeoptionid,requireaction,srcfield,srcquestion,tgtfield,tgtquestion,visible,required,srctxtresponse,number1,number2,operator1,operator2,showmessage,inspectorfeedback},rel.inspquestionsgrp{description,groupid,groupseq,inspquestionid,inspquestionnum, hasld,rel.inspquestionchild{description,groupid,groupseq,inspquestionid,inspquestionnum, hasld,rel.inspfield{description,fieldtype,inspfieldid,inspquestionid,inspquestionnum,inspfieldnum,required,visible, metertype, metername, rel.alndomain{ value, description},rel.inspfieldoption{description,inspfieldoptionid,color,icon,inspectorfeedback,requireaction}}},rel.inspfield{description,fieldtype,inspfieldid,inspquestionid,inspquestionnum,inspfieldnum,required,visible,metertype, metername, lastreading, rel.alndomain{value, description},rel.inspfieldoption{description,inspfieldoptionid,color,icon,inspectorfeedback,requireaction}}},rel.asset{assetnum,description,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}},rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder{wonum, description, taskid, worktype, schedstart, istask, autolocate,parent{wonum, description}},rel.histresults{resultnum,createdate,inspectionresultid,rel.inspfieldresult{inspfieldresultid,inspfieldnum,txtresponse,numresponse,dateresponse,timeresponse,rel.inspfieldresultselection{inspfieldresultselectionid,txtresponse,anywhererefid}}},inspresultstatus{href,_bulkid},parent,allowedstates,computedPageTitle,_computeSlidingDrawerTitle,computedAsset,computedLocation`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `single`,
        sortAttributes: [`inspectionform.createdate`],
        schemaExt: [
          {
            name: `siteid`,
            id: `j3q7y`
          },
          {
            name: `orgid`,
            id: `bz768`
          },
          {
            name: `resultnum`,
            id: `be925`
          },
          {
            name: `revision`,
            id: `gykzn`
          },
          {
            name: `inspformnum`,
            id: `n8_7w`
          },
          {
            name: `referenceobject`,
            id: `qb6b8`
          },
          {
            name: `referenceobjectid`,
            id: `z5p3d`
          },
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `kznm7`
          },
          {
            name: `inspfieldresult{inspfieldresultid,errorflag,errormessage,inspfieldnum,inspfieldresultnum,inspformnum,inspquestionnum,orgid,resultnum,revision,siteid,txtresponse,numresponse,dateresponse,timeresponse,readconfirmation,rolloverflag,doclinks{*},inspfieldresultselection{txtresponse,inspfieldresultselectionid,anywhererefid},anywhererefid,actionrequired}`,
            id: `arx45`
          },
          {
            name: `status`,
            id: `aj82r`
          },
          {
            name: `createdate`,
            id: `qdqe9`
          },
          {
            name: `duedate`,
            id: `ayd_q`
          },
          {
            name: `inspectionform.name`,
            id: `kj344`
          },
          {
            name: `inspectionform.createdate`,
            searchable: `true`,
            sortable: `true`,
            id: `wrmj4`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `rqgae`
          },
          {
            name: `inspectionform.inspformnum`,
            id: `rnaqx`
          },
          {
            name: `inspectionform.audioguided`,
            id: `ez4rn`
          },
          {
            name: `inspectionform.revision`,
            id: `ej88d`
          },
          {
            name: `inspectionform.status`,
            id: `gqj2n`
          },
          {
            name: `inspectionform.hasld`,
            id: `badgx`
          },
          {
            name: `inspectionform.readconfirmation`,
            id: `k9kzz`
          },
          {
            name: `rel.inspcascadeoption{inspcascadeoptionid,requireaction,srcfield,srcquestion,tgtfield,tgtquestion,visible,required,srctxtresponse,number1,number2,operator1,operator2,showmessage,inspectorfeedback}`,
            id: `xeza3`
          },
          {
            name: `rel.inspquestionsgrp{description,groupid,groupseq,inspquestionid,inspquestionnum, hasld,rel.inspquestionchild{description,groupid,groupseq,inspquestionid,inspquestionnum, hasld,rel.inspfield{description,fieldtype,inspfieldid,inspquestionid,inspquestionnum,inspfieldnum,required,visible, metertype, metername, rel.alndomain{ value, description},rel.inspfieldoption{description,inspfieldoptionid,color,icon,inspectorfeedback,requireaction}}},rel.inspfield{description,fieldtype,inspfieldid,inspquestionid,inspquestionnum,inspfieldnum,required,visible,metertype, metername, lastreading, rel.alndomain{value, description},rel.inspfieldoption{description,inspfieldoptionid,color,icon,inspectorfeedback,requireaction}}}`,
            id: `kgxb5`
          },
          {
            name: `rel.asset{assetnum,description,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `axzn4`
          },
          {
            name: `rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `k79an`
          },
          {
            name: `rel.workorder{wonum, description, taskid, worktype, schedstart, istask, autolocate,parent{wonum, description}}`,
            id: `jrkez`
          },
          {
            name: `rel.histresults{resultnum,createdate,inspectionresultid,rel.inspfieldresult{inspfieldresultid,inspfieldnum,txtresponse,numresponse,dateresponse,timeresponse,rel.inspfieldresultselection{inspfieldresultselectionid,txtresponse,anywhererefid}}}`,
            id: `wxvwn`
          },
          {
            name: `inspresultstatus{href,_bulkid}`,
            id: `eb2rq`
          },
          {
            name: `parent`,
            id: `xv_2r`
          },
          {
            name: `allowedstates`,
            id: `xjg8a`
          },
          {
            name: `computedPageTitle`,
            'computed-function': `_computePageTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('pv3z7_title', 'Page title'),
            remarks: app.getLocalizedLabel('pv3z7_remarks', 'Page Title'),
            id: `pv3z7`,
            computed: `true`
          },
          {
            name: `_computeSlidingDrawerTitle`,
            'computed-function': `_computeSlidingDrawerTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('ak_rz_title', 'Page title'),
            remarks: app.getLocalizedLabel(
              'ak_rz_remarks',
              'Sliding Drawer Title'
            ),
            id: `ak_rz`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAsset`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('j7pmn_title', 'Asset'),
            remarks: app.getLocalizedLabel('j7pmn_remarks', 'Asset'),
            id: `j7pmn`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocation`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('qp_2p_title', 'Location'),
            remarks: app.getLocalizedLabel('qp_2p_remarks', 'Location'),
            id: `qp_2p`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedPageTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computePageTitle', item)
          },
          _computeSlidingDrawerTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeSlidingDrawerTitle', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAsset', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocation', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue:
              app && app.state && app.state.inspectionsList
                ? app.state.inspectionsList.currentItem
                : undefined,
            check: () => {
              return app && app.state && app.state.inspectionsList
                ? app.state.inspectionsList.currentItem
                : undefined;
            }
          }
        ],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false,
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
      let controller = new ExecutionFormDataController();
      bootstrapInspector.onNewController(
        controller,
        'ExecutionFormDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - executeInspections

    // begin datasource - inspfieldresult
    {
      let options = {
        platform: `maximoMobile`,
        name: `inspfieldresult`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        query: {
          cacheExpiryMs: 1,
          relationship: `inspfieldresult`,
          select: `inspfieldresultid,inspfieldresultselection{txtresponse,inspfieldresultselectionid,anywhererefid},anywhererefid,errorflag,errormessage,inspfieldnum,inspfieldresultnum,inspformnum,inspquestionnum,orgid,resultnum,revision,siteid,txtresponse,numresponse,dateresponse,timeresponse,readconfirmation,rolloverflag,doclinks{*},actionrequired`,
          dependsOn: `executeInspections`,
          dsParentObject: `mxapiinspectionres`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspfieldresultid`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `inspfieldresultid`,
            'unique-id': `true`,
            id: `xvs_ss2r`
          },
          {
            name: `inspfieldresultselection{txtresponse,inspfieldresultselectionid,anywhererefid}`,
            id: `xvs_sss2r`
          },
          {
            name: `anywhererefid`,
            id: `zeq8a`
          },
          {
            name: `errorflag`,
            id: `zwkyj`
          },
          {
            name: `errormessage`,
            id: `qb64a`
          },
          {
            name: `inspfieldnum`,
            id: `g77pa`
          },
          {
            name: `inspfieldresultnum`,
            id: `vdndz`
          },
          {
            name: `inspformnum`,
            id: `madk2`
          },
          {
            name: `inspquestionnum`,
            id: `x9m6j`
          },
          {
            name: `orgid`,
            id: `pawva`
          },
          {
            name: `resultnum`,
            id: `yvwjd`
          },
          {
            name: `revision`,
            id: `qxq37`
          },
          {
            name: `siteid`,
            id: `rgy7m`
          },
          {
            name: `txtresponse`,
            id: `k2m5p`
          },
          {
            name: `numresponse`,
            id: `yng5v`
          },
          {
            name: `dateresponse`,
            id: `w4qwn`
          },
          {
            name: `timeresponse`,
            id: `y3ymn`
          },
          {
            name: `readconfirmation`,
            id: `p5e2k`
          },
          {
            name: `rolloverflag`,
            id: `r6p_9`
          },
          {
            name: `doclinks{*}`,
            id: `pd79_`
          },
          {
            name: `actionrequired`,
            id: `q95k3`
          }
        ],
        qbeAttributes: [],
        parentDatasource: `executeInspections`,
        computedFields: {},
        notifyWhenParentLoads: true,
        appResolver: () => app,
        watch: [],
        autoSave: false,
        expiryTime: 1,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false,
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
    // end datasource - inspfieldresult

    // begin datasource - inspFormInformation
    {
      let options = {
        platform: `maximoMobile`,
        name: `inspFormInformation`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapiinspectionres`,
          itemUrl:
            app && app.state && app.state.inspectionsList
              ? app.state.inspectionsList.currentItem
              : undefined,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `inspectionresultid,inspectionform.inspectionformid,inspectionform.inspformnum,inspectionform.name,inspectionform.description_longdescription,rel.inspquestion{description,description_longdescription,groupid,groupseq,inspquestionid,inspquestionnum},rel.asset{assetnum,description,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}},rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}},computedFormName,computedLongDescription`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `a2ne_`
          },
          {
            name: `inspectionform.inspectionformid`,
            id: `rr6da`
          },
          {
            name: `inspectionform.inspformnum`,
            id: `km5qb`
          },
          {
            name: `inspectionform.name`,
            id: `mmg68`
          },
          {
            name: `inspectionform.description_longdescription`,
            id: `v9prw`
          },
          {
            name: `rel.inspquestion{description,description_longdescription,groupid,groupseq,inspquestionid,inspquestionnum}`,
            id: `g7jxe`
          },
          {
            name: `rel.asset{assetnum,description,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `qrb88`
          },
          {
            name: `rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `pvvry`
          },
          {
            name: `computedFormName`,
            'computed-function': `_computeFormName`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('eg47v_title', 'Form name'),
            remarks: app.getLocalizedLabel('eg47v_remarks', 'Form name'),
            id: `eg47v`,
            computed: `true`
          },
          {
            name: `computedLongDescription`,
            'computed-function': `_computeLongDescription`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('zzpa2_title', 'Instructions'),
            remarks: app.getLocalizedLabel('zzpa2_remarks', 'Instructions'),
            id: `zzpa2`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedFormName: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeFormName', item)
          },
          computedLongDescription: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLongDescription', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue:
              app && app.state && app.state.inspectionsList
                ? app.state.inspectionsList.currentItem
                : undefined,
            check: () => {
              return app && app.state && app.state.inspectionsList
                ? app.state.inspectionsList.currentItem
                : undefined;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspectionInformationDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspectionInformationDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inspFormInformation

    // begin datasource - previousInspectionResultsList
    {
      let options = {
        name: `previousInspectionResultsList`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `previousInspectionResultsList`,
        schemaExt: [
          {
            name: `inspectionresultid`,
            id: `den98`
          },
          {
            name: `createdate`,
            id: `j_kbw`
          },
          {
            name: `inspfieldresult.response`,
            id: `k5aw7`
          },
          {
            name: `inspfieldresult.format`,
            id: `g96mk`
          },
          {
            name: `fielddescription`,
            id: `kwj4_`
          }
        ],
        sortAttributes: [],
        idAttribute: `inspectionresultid`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `inspectionresultid,createdate,inspfieldresult.response,inspfieldresult.format,fielddescription`,
          src: []
        },
        autoSave: true,
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
    // end datasource - previousInspectionResultsList

    // begin dialog - drawer1
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `drawer1`,
        configuration: {
          id: `drawer1`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerDrawer1
                slidingDrawerProps={props}
                id={'drawer1_slidingdrawer_container'}
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
      let controller = new DialogController();
      bootstrapInspector.onNewController(
        controller,
        'DialogController',
        dialog
      );
      dialog.registerController(controller);
      page.registerDialog(dialog);
    }
    // end dialog - drawer1

    // begin dialog - drawer2
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `drawer2`,
        configuration: {
          id: `drawer2`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerDrawer2
                slidingDrawerProps={props}
                id={'drawer2_slidingdrawer_container'}
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
    // end dialog - drawer2

    // begin dialog - previousResultsDrawer
    /* eslint-disable no-lone-blocks */
    {
      let options = {
        name: `previousResultsDrawer`,
        configuration: {
          id: `previousResultsDrawer`,
          type: `slidingDrawer`,
          align: `start`,
          renderer: props => {
            return (
              <SlidingDrawerPreviousResultsDrawer
                slidingDrawerProps={props}
                id={'previousResultsDrawer_slidingdrawer_container'}
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
    // end dialog - previousResultsDrawer
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'inspsummary' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'inspsummary',
        clearStack: false,
        parent: app,
        route: '/inspsummary',
        title: app.getLocalizedLabel('inspsummary_title', 'Inspection overview')
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new InspSummaryPageController();
      bootstrapInspector.onNewController(
        controller,
        'InspSummaryPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - inspectionsummary
    {
      let options = {
        platform: `maximoMobile`,
        name: `inspectionsummary`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapiinspectionres`,
          itemUrl: page.params.itemhref,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `inspectionresultid,referenceobject,inspectionform.name,inspectionform.description_longdescription,rel.asset{description,assetnum,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}},rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder{wonum, description, worktype,autolocate, parent{wonum, description}},computedTitle,computedAsset,computedLocation`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `aapyn`
          },
          {
            name: `referenceobject`,
            id: `kje3a`
          },
          {
            name: `inspectionform.name`,
            id: `ebam5`
          },
          {
            name: `inspectionform.description_longdescription`,
            id: `nymw4`
          },
          {
            name: `rel.asset{description,assetnum,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `ydb42`
          },
          {
            name: `rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `w7y59`
          },
          {
            name: `rel.workorder{wonum, description, worktype,autolocate, parent{wonum, description}}`,
            id: `rjnme`
          },
          {
            name: `computedTitle`,
            'computed-function': `_computeTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('q_bm2_title', 'Title'),
            remarks: app.getLocalizedLabel('q_bm2_remarks', 'Title'),
            id: `q_bm2`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAssetInfo`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('kg8k2_title', 'Asset'),
            remarks: app.getLocalizedLabel('kg8k2_remarks', 'Asset'),
            id: `kg8k2`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocationInfo`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('v2zpe_title', 'Location'),
            remarks: app.getLocalizedLabel('v2zpe_remarks', 'Location'),
            id: `v2zpe`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeTitle', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAssetInfo', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocationInfo', item)
          }
        },
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
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspSummaryDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspSummaryDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inspectionsummary
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'inspcompletionsummary' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'inspcompletionsummary',
        clearStack: false,
        parent: app,
        route: '/inspcompletionsummary',
        title: app.getLocalizedLabel(
          'inspcompletionsummary_title',
          'inspcompletionsummary'
        )
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(
      bootstrapInspector.onNewState({displayMessage: ''}, 'page'),
      {}
    );

    {
      let controller = new InspCompletionSummaryPageController();
      bootstrapInspector.onNewController(
        controller,
        'InspCompletionSummaryPageController',
        page
      );
      page.registerController(controller);

      // allow the page controller to bind to application lifecycle events
      // but prevent re-registering page events on the controller.
      app.registerLifecycleEvents(controller, false);
    }

    // begin datasource - actionsds
    {
      let options = {
        name: `actionsds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        items: `items`,
        schemaExt: [
          {
            name: `action`,
            'unique-id': `true`,
            id: `g8m7w`
          },
          {
            name: `description`,
            id: `bn7rz`
          }
        ],
        sortAttributes: [],
        idAttribute: `action`,
        loadingDelay: 0,
        refreshDelay: 0,
        query: {
          select: `action,description`,
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
        preLoad: true
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
    // end datasource - actionsds

    // begin datasource - inspcompletionsummaryds
    {
      let options = {
        platform: `maximoMobile`,
        name: `inspcompletionsummaryds`,
        datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
        pageSize: 20,
        debounceTime: 400,
        query: {
          pageSize: 20,
          selectionMode: `single`,
          objectStructure: `mxapiinspectionres`,
          itemUrl:
            app && app.state && app.state.inspectionsList
              ? app.state.inspectionsList.currentItem
              : undefined,
          notifyWhenParentLoads: true,
          includeCounts: true,
          resultOutput: `json`,
          trackChanges: true,
          select: `inspectionresultid,referenceobject,status,inspectionform.name,inspectionform.description_longdescription,inspectionform.inspquestionunit._dbcount--totalquestion,inspfieldresult{actionrequired},rel.inspformscript{autoscript, description},rel.asset{description,assetnum,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}},rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}},rel.workorder{wonum, description, worktype, autolocate,parent{wonum, description}},allowedactions,displaymessage,computedWOTitle,computedAsset,computedLocation,computedQuestions`
        },
        objectStructure: `mxapiinspectionres`,
        idAttribute: `inspectionresultid`,
        selectionMode: `single`,
        sortAttributes: [],
        schemaExt: [
          {
            name: `inspectionresultid`,
            'unique-id': `true`,
            id: `e3xrj`
          },
          {
            name: `referenceobject`,
            id: `vaq2b`
          },
          {
            name: `status`,
            id: `qgdep`
          },
          {
            name: `inspectionform.name`,
            id: `n2k8z`
          },
          {
            name: `inspectionform.description_longdescription`,
            id: `xk568`
          },
          {
            name: `inspectionform.inspquestionunit._dbcount--totalquestion`,
            id: `xbvbd`
          },
          {
            name: `inspfieldresult{actionrequired}`,
            id: `ndgqa`
          },
          {
            name: `rel.inspformscript{autoscript, description}`,
            id: `a33ve`
          },
          {
            name: `rel.asset{description,assetnum,autolocate,rel.assetmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `zg6bx`
          },
          {
            name: `rel.locations{location,description,autolocate,rel.locationmeter{metername,active,rollover,lastreading,readingtype}}`,
            id: `g7y3r`
          },
          {
            name: `rel.workorder{wonum, description, worktype, autolocate,parent{wonum, description}}`,
            id: `jvpw4`
          },
          {
            name: `allowedactions`,
            id: `ebkxg`
          },
          {
            name: `displaymessage`,
            id: `ezy6z`
          },
          {
            name: `computedWOTitle`,
            'computed-function': `_computeWOTitle`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('w2kaa_title', 'Work Order'),
            remarks: app.getLocalizedLabel('w2kaa_remarks', 'Work Order'),
            id: `w2kaa`,
            computed: `true`
          },
          {
            name: `computedAsset`,
            'computed-function': `_computeAssetInfo`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('qpen7_title', 'Asset'),
            remarks: app.getLocalizedLabel('qpen7_remarks', 'Asset'),
            id: `qpen7`,
            computed: `true`
          },
          {
            name: `computedLocation`,
            'computed-function': `_computeLocationInfo`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('k5jwb_title', 'Location'),
            remarks: app.getLocalizedLabel('k5jwb_remarks', 'Location'),
            id: `k5jwb`,
            computed: `true`
          },
          {
            name: `computedQuestions`,
            'computed-function': `_computeQuestionCount`,
            type: `STRING`,
            'sub-type': `ALN`,
            title: app.getLocalizedLabel('wypxr_title', 'Inspection Questions'),
            remarks: app.getLocalizedLabel(
              'wypxr_remarks',
              'Amount of questions in inspection form'
            ),
            id: `wypxr`,
            computed: `true`
          }
        ],
        qbeAttributes: [],
        computedFields: {
          computedWOTitle: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeWOTitle', item)
          },
          computedAsset: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeAssetInfo', item)
          },
          computedLocation: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeLocationInfo', item)
          },
          computedQuestions: {
            computedFunction: (item, datasource) =>
              datasource.callController('_computeQuestionCount', item)
          }
        },
        notifyWhenParentLoads: true,
        appResolver: () => app,
        clearSelectionOnSearch: true,
        watch: [
          {
            name: `itemUrl`,
            lastValue:
              app && app.state && app.state.inspectionsList
                ? app.state.inspectionsList.currentItem
                : undefined,
            check: () => {
              return app && app.state && app.state.inspectionsList
                ? app.state.inspectionsList.currentItem
                : undefined;
            }
          }
        ],
        autoSave: false,
        trackChanges: true,
        resetDatasource: false,
        isMaximoMobile: true,
        useWithMobile: false
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
      let controller = new InspCompletionSummaryDataController();
      bootstrapInspector.onNewController(
        controller,
        'InspCompletionSummaryDataController',
        ds
      );
      ds.registerController(controller);

      if (!page.hasDatasource(ds)) {
        page.registerDatasource(ds);
      }
    }
    // end datasource - inspcompletionsummaryds
  });

  // register the page with the application
  if (!app.hasPage(page)) {
    app.registerPage(page);
  }

  // setup the 'voice_inspection' page
  page = bootstrapInspector.onNewPage(
    new Page(
      bootstrapInspector.onNewPageOptions({
        name: 'voice_inspection',
        clearStack: false,
        parent: app,
        route: '/voice_inspection',
        title: app.getLocalizedLabel(
          'voice_inspection_title',
          'voice_inspection'
        )
      })
    )
  );

  page.addInitializer((page, app) => {
    page.setState(bootstrapInspector.onNewState({}, 'page'), {});

    {
      let controller = new VoicePageController();
      bootstrapInspector.onNewController(
        controller,
        'VoicePageController',
        page
      );
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

  app.setRoutesForApplication(() => {
    return [
      {
        id: `main_zpydr`,
        label: app.getLocalizedLabel('zpydr_label', 'Inspections'),
        icon: 'maximo:inspections',
        application: `inspection`,
        name: `main`,
        hidden: undefined,
        onClick: event => {
          eventManager.emit('change-page', {name: 'main'}, event);
        },
        page: `main`
      },
      {
        id: `createInspection_kjgxd`,
        label: app.getLocalizedLabel('kjgxd_label', 'Create inspection'),
        icon: 'maximo:add--record',
        application: `inspection`,
        name: `createInspection`,
        hidden: undefined,
        onClick: event => {
          eventManager.emit('change-page', {name: 'createInspection'}, event);
        },
        actionType: `add`,
        page: `createInspection`
      }
    ];
  });

  // begin datasource - synonymdomainDataInsp
  {
    let options = {
      platform: `maximoMobile`,
      name: `synonymdomainDataInsp`,
      datasourceLocator: dataSourceName => app.findDatasource(dataSourceName),
      pageSize: 20,
      debounceTime: 400,
      query: {
        pageSize: 20,
        objectStructure: `mxapisynonymdomain`,
        savedQuery: `MOBILEDOMAIN`,
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
          id: `b3x5v`
        },
        {
          name: `maxvalue`,
          'unique-id': `true`,
          searchable: `true`,
          id: `yp2ea`
        },
        {
          name: `description`,
          id: `rbm9n`
        },
        {
          name: `domainid`,
          searchable: `true`,
          id: `nx_mm`
        },
        {
          name: `valueid`,
          searchable: `true`,
          id: `gjwdp`
        },
        {
          name: `siteid`,
          searchable: `true`,
          id: `ye_gk`
        },
        {
          name: `orgid`,
          searchable: `true`,
          id: `n8v_a`
        },
        {
          name: `defaults`,
          id: `wq8jj`
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
      isMaximoMobile: true,
      useWithMobile: false
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
  // end datasource - synonymdomainDataInsp

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
