/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import React from 'react';
import {
  Label,
  BaseComponent,
  BorderLayout,
  Box,
  Icon,
  MenuButton,
  MenuItem,
  NumberInput,
  AttachmentList,
  DateInput,
  DateTimeInput,
  SignatureButton,
  Image,
  TimeInput,
  UIBus,
  Button,
} from '@maximo/react-components';
import {
  log,
  Localizer,
  Debouncer,
  AppSwitcher,
  Device
} from '@maximo/maximo-js-api';
import PropTypes from 'prop-types';
import refStore from '../../../stores/refStore';
import conditionsStore from '../../../stores/ConditionsStore';
import StatefulTextInput from '../StatefulTextInput/StatefulTextInput.js';
import StatefulCheckboxGroup from '../StatefulCheckboxGroup/StatefulCheckboxGroup.js';
import { StatusConsumer } from '../context/StatusContext';
import { resetFiltered, getMergedDateTimeValue } from '../../common/utils';

import executionStore from '../context/ExecutionStore';
import { optionsMap } from '../AdaptiveSelectorInput/SelectorUtils';

import './InspField.scss';
import AdaptiveSelectorInput from '../AdaptiveSelectorInput/AdaptiveSelectorInput';

const TAG = 'Field';
const defaultMax = 9999999999999;
const defaultMaxLength = 250;
/**
 * Reassigns module to variable so reference is not lost after babel for debugging
 * https://stackoverflow.com/questions/30161123/es6-module-import-is-not-defined-during-debugger
 */
const conditions = conditionsStore;
const msgFormatter = Localizer.get();

class InspField extends React.Component {
  constructor(props) {
    super(props);
    resetFiltered(props.field);
    this.myChange = this.myChange.bind(this);
    this.inputAttachmentHandler = this.inputAttachmentHandler.bind(this);
    this.deleteAttachmentHandler = this.deleteAttachmentHandler.bind(this);
    this.attachmentHandler = this.attachmentHandler.bind(this);
    this.getResultField = this.getResultField.bind(this);
    this.openPreviousResultsDrawer = this.openPreviousResultsDrawer.bind(this);
    this.createDoclinksDS = this.createDoclinksDS.bind(this);
    this.fieldInput = this.fieldInput.bind(this);
    this.updateField = this.updateField.bind(this);
    this.getCompletion = this.getCompletion.bind(this);
    this.getRejection = this.getRejection.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.initialFormState = this.initialFormState.bind(this);
    this.showCurrentSignature = this.showCurrentSignature.bind(this);
    this.inputTextHandler = this.inputTextHandler.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
    this.checkMOHandler = this.checkMOHandler.bind(this);
    this.checkReadConfirmation = this.checkReadConfirmation.bind(this);
    this.inputNumberHandler = this.inputNumberHandler.bind(this);
    this.inputDateTimeHandler = this.inputDateTimeHandler.bind(this);
    this.rollOverCheckHandler = this.rollOverCheckHandler.bind(this);
    this.onAnswerUpdateHandler = this.onAnswerUpdateHandler.bind(this);
    this.setSavingProcess = this.setSavingProcess.bind(this);
    this.getInspFieldOptions = this.getInspFieldOptions.bind(this);
    this.isSingleChoiceBehavior = this.isSingleChoiceBehavior.bind(this);
    this.isMultipleChoiceBehavior = this.isMultipleChoiceBehavior.bind(this);
    this.isValidAnswer = this.isValidAnswer.bind(this);
    this.setDoclinksStatus = this.setDoclinksStatus.bind(this);
    this.setDoclinksURL = this.setDoclinksURL.bind(this);
    this.isNotDateOrDateTime = this.isNotDateOrDateTime.bind(this);
    this.prepareInspfieldDS = this.prepareInspfieldDS.bind(this);
    this.refreshInspField = this.refreshInspField.bind(this);
    this.refreshDockLinkDS = this.refreshDockLinkDS.bind(this);
    // this.prepareDockLinkDSToMobile =this.prepareDockLinkDSToMobile.bind(this);

    conditions.storeDefaults(props.field, this.isValidAnswer);
    // Class variable that holds either brand new response or persisted response (with href)
    this.response = null;
    this.mutation = null;
    this.state = {
      attachmentsds: null,
      multipleselectds: null,
      readOnly: false,
      visibility: true,
      message: null,
      currentSignature: null,
      alert: null,
      MVIAnalyzeIcon: null,
      loading: false
    };

    // 400ms deboucer instance
    this.debouncer = new Debouncer(1000);
    this.app = AppSwitcher.get().currentApp;
    this.device = Device.get();
  }

  /**
   * Set filter attribute and call onChange callback
   * based on inMemoryFilterFunc (filters for completed/required)
   */
  setFilter() {
    let matchesFilter = true;
    let datasource = this.props.context?.datasource;
    if (datasource && datasource.inMemoryFilterFunc) {
      matchesFilter = datasource.inMemoryFilterFunc(this.props.field);
      if (this.state.visibility !== matchesFilter) {
        this.setState({ visibility: matchesFilter });
        this.props.field.filtered = matchesFilter;
        this.props.onChange({ filter: datasource.inMemoryFilterFunc });
      }
    }
  }

  /**
   * Computes the initial state/view for the form
   * (conditionals, completed, visible and required)
   */
  initialFormState() {
    this.getMeterValidation(this.props);

    const conditionMutation = conditions.processConditions(this.props.field);
    const completeMutation = this.getCompletion(this.props, this.state);
    const rejectMutation = this.getRejection(this.props);
    let response = this.getResultField();

    /* istanbul ignore next */
    let selectedOptions = response?.inspfieldresultselection?.map(
      option => option.txtresponse
    );

    //istanbul ignore else
    if (response) {
      const responseValue = this.getResponseValue(response, selectedOptions);
      const sideEffect = conditions.checkSideEffect(
        response.inspfieldnum,
        responseValue
      );
      this.updateField(sideEffect);
    }

    this.mutation = {
      ...this.mutation,
      ...completeMutation,
      ...conditionMutation,
      ...rejectMutation
    };
  }

  /**
   * Returns the inspection result related to the current field
   * @returns {object | null} the existing inspection result or a new result computed by getNewField
   */
  getResultField() {
    let inspfieldresult = null;
    let inspfieldresultds = this.props.context?.inspfieldresultDS;
    if (inspfieldresultds) {

      //istanbul ignore else
      if (this.props.field) {

        let inspfieldresults = inspfieldresultds.items ? inspfieldresultds.items : [];

        inspfieldresult = inspfieldresults.find(
          i => i.inspfieldnum === this.props.field.inspfieldnum
        );
        //istanbul ignore else
        if (!inspfieldresult) {
          //if there is already a response, return it
          if (this.response) {
            inspfieldresult = this.response;
          }
          //otherwise create a new one
          //istanbul ignore else
          else if (
            this.props.field?.inspquestionnum &&
            this.props.field?.inspfieldnum
          ) {
            inspfieldresult = this.props.getNewField(
              this.props.field.inspquestionnum,
              this.props.field.inspfieldnum
            );
            this.response = inspfieldresult;
          }
        }
      }
    }
    return inspfieldresult;
  }

  getCurrentInspfieldResult(inspfieldresult) {
    const response = this.getResultField();
    let currentInspfieldresult = inspfieldresult?.item
      ? inspfieldresult.items.find(
        i => i.inspfieldnum === response.inspfieldnum
      )
      : null;
    //istanbul ignore next
    if (!currentInspfieldresult) {
      currentInspfieldresult = response;
    }
    return currentInspfieldresult
  }

  async componentDidMount() {
    UIBus.on('update-field', this.updateField);
    UIBus.on('update-field-refresh', this.refreshInspField);
    UIBus.on('inspections-field-reset', this.prepareInspfieldDS);
    // istanbul ignore next
    this.onReloadInspectionblock = () => {
      this.setState({ readOnly: true }); 
    } 
    // istanbul ignore next
    UIBus.on('inspection-block', this.onReloadInspectionblock);

    let { context } = this.props;
    if (context?.datasource) {
      this.prepareInspfieldDS();
      context.datasource.on('inpections-apply-custom-filter', this.setFilter);
    }
    this.initialFormState();

    //istanbul ignore else
    if (this.mutation) {
      this.notifyFieldUpdates(this.mutation);
      this.mutation = null;
    }


    let inspfieldresultds = this.props.context?.inspfieldresultDS;

    this.onReloadInsField = datasource => {
      this.setDoclinksStatus(inspfieldresultds, this.state.attachmentsds);
    };

    //istanbul ignore next
    inspfieldresultds?.on('inspections-reload-inspfield', this.onReloadInsField);
  }

  async componentDidUpdate() {
    const rejectMutation = this.getRejection(this.props);
    //istanbul ignore next
    if (rejectMutation) {
      this.mutation = {
        ...this.mutation,
        ...rejectMutation
      };
    }

    //istanbul ignore next
    if (this.mutation) {
      this.notifyFieldUpdates(this.mutation);
      this.mutation = null;
    }
  }

  //istanbul ignore next
  componentWillUnmount() {
    UIBus.off('update-field', this.updateField);
    UIBus.off('update-field-refresh', this.refreshInspField);
    let { context } = this.props;
    if (context?.datasource) {

      this.props.context.datasource.off('inpections-apply-custom-filter', this.setFilter);
      let inspfieldresultds = this.props.context?.inspfieldresultDS;
      inspfieldresultds?.off('inspections-reload-inspfield', this.onReloadInsField);
    }

    let response = this.getResultField();
    if (response) {
      refStore.removeInspFieldResultRef(response.inspfieldresultid);
    }

    // istanbul ignore next
    UIBus.off('inspections-field-reset', this.prepareInspfieldDS);
    UIBus.off('inspection-block', this.onReloadInspectionblock);
    this.props.context?.datasource.off('inpections-apply-custom-filter', this.setFilter);
  }

  /**
   * Listener function to be called after updateResponse function from ConditionsStore is called
   * Calls updateResponse in the end to validate (for chained conditions scenario)
   * @param {object} payload - object containing the mutation for all fields. Key is the inspfieldnum,
   * and the values are the attributes (visible, required, etc)
   */
  updateField(payload) {
    let response = this.getResultField();
    const fieldNum = this.props?.field?.inspfieldnum;
    //istanbul ignore else
    if (fieldNum && Object.keys(payload).includes(fieldNum)) {
      //istanbul ignore else
      if (payload[fieldNum].isSrc) {
        //handles properties that only affect source fields
        //istanbul ignore else
        if ('message' in payload[fieldNum]) {
          const payloadMessage = payload[fieldNum].message.join(',');
          //istanbul ignore else
          if (this.state.message !== payloadMessage) {
            this.setState({
              message: payloadMessage
            });
          }
        }

        //istanbul ignore next
        if ('alerts' in payload[fieldNum]) {
          const payloadAlerts = payload[fieldNum].alerts.join(',');
          //istanbul ignore else
          if (this.state.alert !== payloadAlerts) {
            this.setState({
              alert: payloadAlerts
            });
          }
        }

        if ('requireaction' in payload[fieldNum]) {
          let response = this.getResultField();
          //istanbul ignore else
          if (response) {
            response.actionrequired = payload[fieldNum].requireaction;
          }
        }
      } else {
        this.setFilter();
        this.forceUpdate();
        this.props.onChange({
          ...payload[this.props.field.inspfieldnum],
          filter: this.props.context?.datasource?.inMemoryFilterFunc
        });

        //istanbul ignore else
        if (response) {
          let inspfieldresult = this.props.context?.inspfieldresultDS;
          let currentInspfieldresult = inspfieldresult?.item
            ? inspfieldresult.items.find(
              i => i.inspfieldnum === response.inspfieldnum
            )
            : null;

          //istanbul ignore else
          if (!currentInspfieldresult) {
            currentInspfieldresult = response;
          }

          let selectedOptions =
            currentInspfieldresult?.inspfieldresultselection?.map(
              option => option.txtresponse
            );

          //istanbul ignore else
          if (response?.isvisible !== payload[fieldNum].visible) {
            response.isvisible = payload[fieldNum].visible;
          }
          const responseValue = this.getResponseValue(
            response,
            selectedOptions
          );
          conditions.updateResponse(response.inspfieldnum, responseValue);
        }
      }
    }
  }

  /**
   * Notify mutation to parent
   * @param {*} mutation
   */
  notifyFieldUpdates(mutation) {
    //istanbul ignore else
    if (mutation) {
      this.props.onChange({
        ...mutation,
        filter: this.props.context?.datasource?.inMemoryFilterFunc
      });
    }
  }

  /**
   * Handle answered fields to call onComplete callback
   * @param {Boolean} completeValue - true if field is answered, false otherwise
   */
  getCompletion({ field }, state) {
    let mutation = null;
    let response = this.getResultField();

    //istanbul ignore else
    if (field && field.invalid) {
      field.completed = true;
      mutation = { complete: true };
      return mutation;
    }

    //istanbul ignore else
    if (!field || !response) {
      return mutation;
    }

    const isComplete = InspField.hasAnswer({ field, response }, state);
    //istanbul ignore else
    if (field.completed !== isComplete) {
      field.completed = isComplete;
      mutation = { complete: isComplete };
    }

    return mutation;
  }

  /**
   * Handle answered fields to call onComplete callback
   * @param {Boolean} completeValue - true if field is answered, false otherwise
   */
  getRejection({ field }) {
    let mutation = null;
    let response = this.getResultField();

    if (!field || !response || !field.visible) {
      return mutation;
    }

    // const isAnswered = InspField.hasAnswer({field, response}, state);
    // const isRejected = isAnswered && conditions.hasActiveRejection(response.inspfieldnum);
    const isRejected = conditions.hasActiveRejection(response.inspfieldnum);
    if (field.rejected !== isRejected) {
      field.rejected = isRejected;
      mutation = { rejected: isRejected };
    }

    return mutation;
  }

  isNotDateOrDateTime() {
    return (this.props.field.fieldtype_maxvalue !== 'DT' && this.props.field.fieldtype_maxvalue !== 'DO');
  }


  /**
   * Opens Previous Results Drawer for this field
   * @returns {Function} returns callback function to open Previous Results Drawer
   */
  openPreviousResultsDrawer(inspfield) {
    return this.props.context.openPreviousResultsDrawer(inspfield);
  }

  /**
   * Get invalid mutation when there isn't
   * available meter for meter type field
   * @param {object} props - instance properties
   * @param {object} props.field - inspection field
   * @param {array} props.meters - available meters
   * @returns {object | null} mutation
   */
  getMeterValidation({ field, meters }) {
    let mutation = null;

    if (!field || !meters || field.fieldtype_maxvalue !== 'MM') {
      return mutation;
    }

    const isInvalid = !InspField.hasMeter(field.metername, meters);
    //istanbul ignore else
    if (field && field.invalid !== isInvalid) {
      field.invalid = isInvalid;
    }
  }

  /**
   * Check if current meter field is available
   * @param {string} - field meter name
   * @param {array} - available meters
   * @returns {boolean} - true when field meter matches any available meter
   */
  static hasMeter(fieldMeter = '', meters = []) {
    //istanbul ignore else
    if (!fieldMeter || !meters.length) {
      return false;
    }
    const fieldMeters = meters.filter(i => i.metername === fieldMeter);
    return Boolean(fieldMeters.length);
  }

  /**
   * Check if the field is answered based on the respective response type
   * @returns {Boolean} true if has asnwer, false otherwise
   */
  static hasAnswer({ field, response }, state) {
    let answered = false;
    //istanbul ignore next
    if (!response || !field) {
      return answered;
    }

    const { fieldtype_maxvalue: fieldTypeMx } = field;
    const { txtresponse, numresponse, timeresponse, dateresponse } = response;

    switch (fieldTypeMx) {
      case 'TR':
      case 'SO':
      case 'SOD':
        answered = txtresponse ? Boolean(txtresponse.trim()) : false;
        break;
      case 'MO':
      case 'MOD':
        let checked = false;
        if (!state?.multipleselectds && response?.inspfieldresultselection) {
          //istanbul ignore next
          checked = response.inspfieldresultselection?.find(item =>
            Boolean(item.txtresponse)
          );
        } else if (state?.multipleselectds) {
          const curretInspfieldresult = state?.multipleselectds?.item
            ? state.multipleselectds.items.find(
              i => i.inspfieldnum === field.inspfieldnum
            )
            : null;

          checked = curretInspfieldresult?.inspfieldresultselection?.find(
            item => Boolean(item.txtresponse)
          );
        } /* else {
          checked = response.inspfieldresultselection?.find(item =>
            Boolean(item.txtresponse)
          );
        } */
        answered = checked ? true : false;
        break;
      case 'SE':
        if (typeof numresponse === 'number') answered = true;
        break;
      case 'MM':
        //istanbul ignore next
        if (field.metertype_maxvalue === 'CHARACTERISTIC') {
          answered = txtresponse ? Boolean(txtresponse.trim()) : false;
        } else {
          answered = typeof numresponse === 'number';
        }
        break;
      case 'FU':
      case 'SIG':
        //istanbul ignore else
        if (!state.attachmentsds) {
          answered = Boolean(response.doclinks?.member?.length);
        } else {
          answered = Boolean(
            state && state.attachmentsds && state.attachmentsds.items.length
          );
        }
        break;
      case 'DO':
        answered = Boolean(dateresponse);
        break;
      case 'DT':
        answered = Boolean(timeresponse && dateresponse);
        break;
      case 'TO':
        answered = Boolean(timeresponse);
        break;
      // istanbul ignore next
      default:
        log.e(TAG, `Field type ${fieldTypeMx} not specified`);
        break;
    }

    return answered;
  }

  // istanbul ignore next
  async deleteAttachmentHandler(ev) {
    this.attachmentHandler(ev);
  }

  // istanbul ignore next
  async inputAttachmentHandler(ev) {
    await this.attachmentHandler(ev);
    this.myChange({});
  }

  /**
   * Handle attachment input event to call notifyFieldUpdats
   * @param {Object} ev - attachment file description
   */
  //istanbul ignore next
  async attachmentHandler(ev) {

    const completeChange = this.getCompletion(this.props, this.state);
    this.mutation = { ...this.mutation, ...completeChange };
    await this.refreshDockLinkDS();
    if (this.mutation) {
      this.notifyFieldUpdates(this.mutation);
      this.setFilter();
      this.mutation = null;
      this.props.context.updateDialog();

      if (this.props.field.fieldtype_maxvalue === 'SIG') {
        this.showCurrentSignature();
      }
    }

  }

  /* istanbul ignore next */
  async refreshDockLinkDS() {
    let doclinksDS = this.state.attachmentsds;
    if (doclinksDS) {
      await doclinksDS.load();
      this.setState({ attachmentsds: doclinksDS });
      this.setDoclinksURL(doclinksDS);
      this.setDoclinksStatus(this.props.context?.inspfieldresultDS, this.state.attachmentsds);
      if (this.props.field.fieldtype_maxvalue === 'SIG') {
        this.showCurrentSignature();
      }
    }
  }

  /**
   * Select last signature attached to attachamentds
   * and update currentSignature state
   */
  showCurrentSignature() {
    //istanbul ignore else
    if (this.state.attachmentsds?.items?.length) {
      const lastPosition = this.state.attachmentsds.items.length - 1;
      let lastSignature = this.state.attachmentsds.items[lastPosition];
      if (this.device.isMaximoMobile) {
        let items = this.state.attachmentsds.items;
        let anywhererefid = null;
        for (let item of items) {
          if (item?.anywhererefid && item.anywhererefid > anywhererefid) {
            anywhererefid = item.anywhererefid;
            lastSignature = item;
          }
        }
      } else {

        let lastRecord = this.app?.dataFormatter?.convertISOtoDate(lastSignature.describedBy.created);
        let items = this.state.attachmentsds.items;

        for (let item of items) {
          let temp = this.app?.dataFormatter?.convertISOtoDate(item.describedBy.created);
          //istanbul ignore next
          if (temp > lastRecord) {
            lastSignature = item;
          }
        }
      }

      if (lastSignature?.href) {
        this.setState({
          currentSignature: this.state.attachmentsds.resolveCompleteURL(
            lastSignature?.href
          )
        });
      } else if (lastSignature?.anywhererefid) {
        //istanbul ignore next
        this.setState({
          currentSignature: this.state.attachmentsds.resolveCompleteURL(
            lastSignature?.anywhererefid
          )
        });
      }
    }
  }

  /**
   * Handle text input event to call myChange function
   * @param {Object} ev - input text event
   */
  inputTextHandler(ev) {
    const value = ev.target.value;
    this.myChange({ value });
  }

  /**
   * Handle checkbox input event to call myChange function
   * @param {Object} ev - checkbox input event
   */
  checkHandler(ev) {
    let response = this.getResultField();
    response.readconfirmation = false;
    const { checked } = ev;
    const value = checked ? ev.value : null;
    // istanbul ignore else
    if (this.isSingleChoiceBehavior(this.props.field.fieldtype_maxvalue)) {
      let answeredOption = this.getInspFieldOptions(this.props.field).find(
        option => option.value === ev.value
      );

      if (answeredOption?.requireaction) {
        response.actionrequired = checked;
      } else {
        if (response.actionrequired) {
          response.actionrequired = false;
        }
      }
    }
    this.myChange({ value });
  }

  /**
   * Handle checkbox input event to call myChange function
   * @param {Object} ev - checkbox input event
   */
  async checkMOHandler(ev) {
    this.setState({ readOnly: true });
    this.setSavingProcess(true);
    let response = this.getResultField();
    response.readconfirmation = false;
    const { checked, value } = ev;

    let inspfieldresult = this.props.context?.inspfieldresultDS;

    //istanbul ignore next
    let curretInspfieldresult = inspfieldresult?.item
      ? inspfieldresult.items.find(
        i => i.inspfieldnum === this.props.field.inspfieldnum
      )
      : null;
    //istanbul ignore next
    if (!curretInspfieldresult) {
      curretInspfieldresult = response;
      //this.setState({readOnly: false});
      //this.setSavingProcess(false);
      //return;
    }

    //istanbul ignore else
    if (!curretInspfieldresult.inspfieldresultselection) {
      curretInspfieldresult.inspfieldresultselection = [];
    }

    let option = curretInspfieldresult
      ? curretInspfieldresult.inspfieldresultselection.find(
        item => item.txtresponse === value
      )
      : null;

    if (checked) {
      //istanbul ignore else
      if (!option) {
        let firstEmpty = curretInspfieldresult?.inspfieldresultselection.find(
          item =>
            !Object.keys(item).includes('txtresponse') ||
            item.txtresponse === ''
        );
        //istanbul ignore next
        if (firstEmpty) {
          firstEmpty.txtresponse = value;
          option = firstEmpty;
        } else {
          option = {
            txtresponse: value
          };
          curretInspfieldresult.inspfieldresultselection.push(option);
        }
      }
    } else {
      //istanbul ignore else
      if (option) {
        option.txtresponse = '';
      }
    }

    //check if it's requireaction
    const { field } = this.props;
    //istanbul ignore else
    if (this.getInspFieldOptions(field)) {
      let answeredOption = this.getInspFieldOptions(field).find(
        option => option.description === value
      );

      if (answeredOption?.requireaction) {
        if (checked) {
          response.actionrequired = true;
        } else {
          let otherRequireActionList = this.getInspFieldOptions(field).filter(
            option =>
              option.requireaction === true && option.description !== value
          );
          let selectedItems = [];
          for (let item of otherRequireActionList) {
            let aux = curretInspfieldresult.inspfieldresultselection.find(
              selection => selection.txtresponse === item.description
            );
            //istanbul ignore next
            if (aux) {
              selectedItems.push(aux);
            }
          }

          //istanbul ignore next
          if (selectedItems && selectedItems.length > 0) {
            response.actionrequired = true;
          } else {
            response.actionrequired = false;
          }
        }
      }
    }
    this.myChange({ checked: checked, value: curretInspfieldresult.inspfieldresultselection });
  }

  /**
   * Handle read confirmation checkbox input event to call onAnswerUpdate
   * function to update the readconfirmation value on database
   * @param {Object} ev - checkbox input event
   */
  checkReadConfirmation(ev) {
    const { checked } = ev;
    let response = this.getResultField();
    response.readconfirmation = checked;
    this.onAnswerUpdateHandler(response);
  }

  /**
   * Handle numeric input event to call myChange function
   * myChange to be called with 400ms debounce
   * @param {Object} ev - input numeric event
   */
  inputNumberHandler(ev) {
    const value = ev.target.value;
    this.myChange({ value });
  }

  /**
   * Handle datetime input event to call myChange function
   * @param {Object} ev - input datetime event
   * @param {Object} invalid - true if ev has an invalid value
   */
  inputDateTimeHandler(ev, invalid) {
    //istanbul ignore else
    if (invalid || ev === this.oldValue || this.state?.loading) {
      return;
    }

    //istanbul ignore else
    if (this.oldValue === undefined && this.props.field && (this.props.field.fieldtype_maxvalue === 'DO' || this.props.field.fieldtype_maxvalue === 'DT') && !ev) {
      return;
    }
    this.setState({ loading: true });
    this.oldValue = ev;
    const value = ev;
    this.myChange({ value, invalid });
  }

  /**
   * Handle rollover checkbox update
   * @param {Object} ev - checkbox input event
   */
  rollOverCheckHandler(ev) {
    const { checked } = ev;

    let response = this.getResultField();
    response.errormessage = '';
    response.errorflag = 0;

    response.rolloverflag = checked;
    this.onAnswerUpdateHandler(response);
  }

  /**
   * Notify the execution page that save operation is running or not
   * @param {Boolean} isSaving  - Flag to idicate if the save is running
   */
  setSavingProcess(isSaving) {
    if (this.app?.currentPage?.state) {
      this.app.currentPage.state.isSaving = isSaving;
    }
  }

  /**
   * Retrieve the field options list
   * @param {Object} field  - current field
   * @returns  - field options list
   */
  getInspFieldOptions(field) {
    let result;
    if (field?.inspfieldoption) {
      result = field?.inspfieldoption.map(item => {
        let newItem = JSON.parse(JSON.stringify(item));
        newItem.value = item.description;
        return newItem;
      });
    } else if (field?.domain?.length) {
      let domainType = '';
      let domainId = '';
      if (field?.domain[0].alndomainvalue) {
        domainType = 'alndomainvalue';
        domainId = 'alndomainid';
      } else if (field?.domain[0].synonymdomain) {
        domainType = 'synonymdomain';
        domainId = 'synonymdomainid';
      }

      result = field.domain[0][domainType].map(item => {
        return {
          value: item.value,
          description: item.description ? `${item.description}` : '',
          inspfieldoptionid: item[domainId],
          requireaction: false
        };
      });

      let optionNodes = [];
      let keys = [];
      result.forEach(element => {
        // istanbul ignore else
        if (
          keys.length === 0 ||
          keys.find(i => i === element.inspfieldoptionid) === undefined
        ) {
          optionNodes.push(element);
        }
        keys.push(element.inspfieldoptionid);
      });
      result = optionNodes;

      //istanbul ignore next
      result.sort(function (a, b) {
        //istanbul ignore else
        if (a.description.toUpperCase() > b.description.toUpperCase()) {
          return 1;
        }
        //istanbul ignore else
        if (a.description.toUpperCase() < b.description.toUpperCase()) {
          return -1;
        }
        return 0;
      });
    }
    return result;
  }

  /**
   * Return existing response value from object
   * @param {object} response
   * @param {array} selectedOptions
   * @returns
   */
  getResponseValue(response = {}, selectedOptions) {
    const { txtresponse, numresponse } = response;

    if (txtresponse) {
      return txtresponse;
    } else if (numresponse || numresponse === 0) {
      return numresponse;
    } else if (selectedOptions) {
      return selectedOptions;
    }
    return undefined;
  }

  /**
   * Set inputs to readonly while save is being processed
   * @param {Object} response - inspfieldresult response
   */
  onAnswerUpdateHandler(response) {
    let startSave = { loading: true };
    let endSave = { loading: false };
    if (this.isNotDateOrDateTime()) {
      startSave.readOnly = true;
      endSave.readOnly = false;
    }
    
    this.setState(startSave);
    this.setSavingProcess(true);

    let inspfieldresult = this.props.context?.inspfieldresultDS;

    //istanbul ignore next
    const currentInspfieldresult = inspfieldresult?.item
      ? inspfieldresult.items.find(
        i => i.inspfieldnum === response.inspfieldnum
      )
      : null;

    //istanbul ignore next
    let selectedOptions = currentInspfieldresult?.inspfieldresultselection?.map(
      option => option.txtresponse
    );

    const responseValue = this.getResponseValue(response, selectedOptions);
    let sideEffect = conditions.checkSideEffect(
      response.inspfieldnum,
      responseValue
    );
    this.updateField(sideEffect);

    this.props
      .onAnswerUpdate(response)
      .then(() => {
        const responseValue = this.getResponseValue(response, selectedOptions);
        conditions.updateResponse(response.inspfieldnum, responseValue);
      })
      .catch(() => { 
        this.setState(endSave);
        this.setSavingProcess(false)}
      ).finally(() => {
        this.setFilter();
      });
    
  }

  /**
   * Disable inputs to readonly 
   * @param {Object} response - inspfieldresult response
   */
  //istanbul ignore next
  async refreshInspField(evt) {
    const { field } = this.props;
    //istanbul ignore next
    if (evt.response.inspfieldnum === field.inspfieldnum) {
      let endSave = { loading: false }
      if (this.isNotDateOrDateTime()) {
        endSave.readOnly = false;
      }

      this.prepareInspfieldDS();
      this.setState(endSave);
      this.setSavingProcess(false);
    }
  }

  /**
   * Handle events to call onComplete and onChange callbacks
   * @param {Object} event - contains value and invalid attributes
   * @returns if inputted value is the same as the saved response
   */
  myChange(event) {
    this.setSavingProcess(true);
    const { value } = event;

    //for date, time and datetime inputs
    //istanbul ignore next
    if (event.invalid) {
      return;
    }
    const { field } = this.props;
    let response = this.getResultField();
    let sameResponse = null;
    const numResponseMax =
      executionStore.getAttribute('numresponse', 'max') ?? defaultMax;

    //istanbul ignore else
    if (field && response) {
      const { fieldtype_maxvalue: fieldTypeMx } = field;
      if (
        fieldTypeMx === 'TR' &&
        !InspField.hasAnswer({ field, response }) &&
        !value.trim()
      ) {
        this.setSavingProcess(false);
        return;
      }
      switch (fieldTypeMx) {
        case 'TR':
          sameResponse = response.txtresponse === value.trim();
          response.txtresponse = value.trim();
          break;
        case 'SO':
        case 'SOD':
          sameResponse = response.txtresponse === value;
          response.txtresponse = value;
          break;
        case 'MO':
        case 'MOD':
          response.inspfieldresultselection = value;
          break;
        case 'SE':
          if (value > numResponseMax || value < -numResponseMax) {
            return;
          }
          sameResponse = response.numresponse === value;
          response.numresponse = value;
          break;
        case 'MM':
          response.metername = field.metername;
          //istanbul ignore else
          if (field.metertype_maxvalue === 'CHARACTERISTIC') {
            sameResponse = response.txtresponse === value;
            response.txtresponse = value;
          } else {
            if (value > numResponseMax || value < -numResponseMax) {
              return;
            }
            sameResponse = response.numresponse === value;
            response.numresponse = value;
          }
          response.errormessage = '';
          response.errorflag = 0;
          break;
        case 'DO':
          response.dateresponse = value;
          break;
        case 'DT':
          response.dateresponse = value;

          //do not send date on timeresponse
          const idx = value.indexOf('T');
          const timePart = value.substring(idx + 1);
          response.timeresponse = timePart;
          break;
        case 'TO':
          response.timeresponse = value;
          break;
        //istanbul ignore next
        default:
          log.e(TAG, `Field type ${fieldTypeMx} not specified`);
          break;
      }

      if (sameResponse) {
        this.setSavingProcess(false);
        return;
      }

      let geoLocationJSON = this.getGeoLocation();

      //istanbul ignore next
      if (geoLocationJSON) {
        response.plussgeojson = geoLocationJSON;
      }

      const completeChange = this.getCompletion(this.props, this.state);
      const rejectionChange = this.getRejection(this.props);

      this.mutation = { ...this.mutation, ...completeChange, ...rejectionChange };

      this.onAnswerUpdateHandler(response);
    }
  }

  /**
   * check if the field has single choice behavior
   * @param {String} type
   * @returns   true in positive case
   */
  isSingleChoiceBehavior(type) {
    return type === 'SO' || type === 'SOD';
  }

  /**
   * check if the field has multiple choice behavior
   * @param {String} type
   * @returns   true in positive case
   */
  isMultipleChoiceBehavior(type) {
    return type === 'MO' || type === 'MOD';
  }

  /**
   * check if the answer is valid to  single or multiple choice field.
   * the orther field types aren't validated
   * @param {String} type
   * @returns   true in positive case
   */
  isValidAnswer(answer) {
    if (
      this.isMultipleChoiceBehavior(this.props.field.fieldtype_maxvalue) ||
      this.isSingleChoiceBehavior(this.props.field.fieldtype_maxvalue)
    ) {
      const options = this.getInspFieldOptions(this.props.field);
      return options.find(option => option.value === answer) !== undefined;
    }
    return true;
  }

  /**
   * Get inspectorfeedback value from response
   * @param {Array} inspfieldoption - inspfieldoption array from inspfield
   * @param {Object} response - response data
   * @returns {String|Null} inspectorfeedback if found on response, otherwise null
   */
  getInspectorFeedback(inspfieldoption, response) {
    let inspectorFeedback = null;
    const { field } = this.props;
    if (this.isSingleChoiceBehavior(field.fieldtype_maxvalue)) {
      let answeredOption = inspfieldoption.find(
        option => option.value === response?.txtresponse
      );
      if (answeredOption) {
        inspectorFeedback = answeredOption.inspectorfeedback;
      }
    } else {
      let inspfieldresult = this.isMultipleChoiceBehavior(
        field.fieldtype_maxvalue
      )
        ? this.props.context?.inspfieldresultDS
        : '';

      let answeredArray = [];

      let item = inspfieldresult?.item
        ? inspfieldresult.items.find(
          i => i.inspfieldnum === this.props.field.inspfieldnum
        )
        : null;
      // istanbul ignore else
      if (!item?.inspfieldresultselection?.length) {
        item = response;
      }

      if (item && item.inspfieldresultselection?.length) {
        for (let one of item.inspfieldresultselection) {
          let aux = inspfieldoption.find(
            option => option.value === one.txtresponse
          );
          if (aux) answeredArray.push(aux);
        }

        //istanbul ignore else
        if (answeredArray) {
          let auxArray = [];
          for (let answer of answeredArray) {
            //istanbul ignore else
            if (answer.inspectorfeedback) {
              auxArray.push(answer.inspectorfeedback);
            }
          }
          //istanbul ignore else
          if (auxArray) inspectorFeedback = auxArray.join(' - ');
        }
      }
    }
    return inspectorFeedback;
  }

  /**
   * Build field inputs based on fieldtype
   * @param {Object} field - inspectionfield data
   * @param {Object} response - object to build the response data
   * @returns {Object} all field inputs builded
   */
  fieldInput(field) {
    let nodeField = null;
    let answer = null;
    let response = this.getResultField();

    //istanbul ignore next
    if (!response) {
      return;
    }

    let readonly = this.props.context
      ? (this.props.context.status !== 'INPROG' &&
        this.props.context.status !== 'REVIEW') ||
      (response && response.errorflag) === 2 ||
      this.state.readOnly
      : false;
    //istanbul ignore next
    if (this.props.context?.editTrans) {
      readonly = false;
    }
    const numResponseMax =
      executionStore.getAttribute('numresponse', 'max') || defaultMax;

    const invalidText = this.state.alert || this.props.i18n.invalidText;

    const id = `${this.props.id}`;

    const { fieldtype_maxvalue: fieldTypeMx } = field;

    switch (fieldTypeMx) {
      //Text Response
      case 'TR':
        answer = response ? response.txtresponse : '';
        const maxLength =
          executionStore.getAttribute('txtresponse', 'maxLength') ??
          defaultMaxLength;
        nodeField = (
          <StatefulTextInput
            label={`${field.description ?? ''}`}
            placeholder={this.props.i18n.placeholder}
            id={`${id}_txt`}
            onBlur={this.inputTextHandler}
            value={answer}
            readonly={readonly}
            required={field.required}
            maxLength={maxLength}
            unbound={true}
          />
        );
        break;

      //Single Option
      case 'SO':
      case 'MO':
      case 'SOD':
      case 'MOD':
        let inspfieldresult = this.props.context?.inspfieldresultDS;

        //   this.isMultipleChoiceBehavior(fieldTypeMx)
        //   ? this.props.context?.inspfieldresultDS
        /// : '';
        const curretInspfieldresult = inspfieldresult?.item
          ? inspfieldresult.items.find(
            i => i.inspfieldnum === this.props.field.inspfieldnum
          )
          : null;
        let isMoChecked;
        // multipleselectds is a child datasource used only
        //when the field type is MO - multiple option
        //get response from parent while multipleselectds isn't available
        if (
          !this.props.context?.inspfieldresultDS?.items?.length &&
          response?.inspfieldresultselection
        ) {
          //istanbul ignore next
          isMoChecked = option =>
            response?.inspfieldresultselection &&
            response?.inspfieldresultselection.some(
              elem => elem.txtresponse === option.value
            );
        } else {
          isMoChecked = option =>
            curretInspfieldresult?.inspfieldresultselection &&
            curretInspfieldresult?.inspfieldresultselection?.some(
              elem => elem.txtresponse === option.value
            );
        }
        const isSoChecked = option =>
          response?.txtresponse && response?.txtresponse === option.value;
        const isChecked = this.isSingleChoiceBehavior(fieldTypeMx)
          ? isSoChecked
          : isMoChecked;

        const selectionHandler = this.isMultipleChoiceBehavior(fieldTypeMx)
          ? this.checkMOHandler
          : this.checkHandler;
        const isSingle = this.isSingleChoiceBehavior(fieldTypeMx);
        const options = this.getInspFieldOptions(field)
          ? this.getInspFieldOptions(field)
          : [];

        const mapFn = optionsMap(id, isChecked);
        const optionNodes = options.map(mapFn);

        let feedback = this.getInspectorFeedback(options, response);
        let formReadConfirmation = this.props.context
          ? this.props.context.readconfirmation
          : false;
        let readConfirmationResponse = response && response.readconfirmation;
        nodeField = (
          <>
            <AdaptiveSelectorInput
              id={`${id}_choice`}
              options={optionNodes}
              singleSelect={isSingle}
              label={field.description}
              readonly={readonly}
              selectionChangeHandler={selectionHandler}
              required={field.required}
            />
            {feedback && (
              <>
                <Label
                  id={`${id}_inspector_feedback`}
                  label={feedback}
                  padding='none'
                  wrap={true}
                />
                {formReadConfirmation && (
                  <StatefulCheckboxGroup
                    large={true}
                    id={`${id}_checkboxGroup_readconfirmation`}
                    innerId={`${id}_checkboxGroup_readconfirmation`}
                    initialOptions={[
                      {
                        id: `checkbox_readconfirmation`,
                        innerId: `checkbox_readconfirmation`,
                        label: 'Confirm',
                        checked: Boolean(readConfirmationResponse)
                      }
                    ]}
                    disabled={readonly}
                    onChange={this.checkReadConfirmation}
                  />
                )}
              </>
            )}
          </>
        );
        break;

      //Numeric reponse
      case 'SE':
        answer = response ? response.numresponse : '';
        nodeField = (
          <>
            <NumberInput
              label={`${field.description ?? ''}`}
              id={`${field.inspfieldid}`}
              onBlur={this.inputNumberHandler}
              readonly={readonly}
              required={field.required}
              value={answer}
              max={numResponseMax}
              min={-numResponseMax}
              invalidText={invalidText}
              invalid={field.rejected}
            />
            {this.state.message && (
              <Label
                id={`${id}_inspector_feedback`}
                label={this.state.message}
                padding='none'
                wrap={true}
              />
            )}
          </>
        );
        break;
      // Meters response (Gauge, Continuous, Characteristic)
      case 'MM':
        const metertype = field.metertype_maxvalue;

        const fieldMeters = this.props.meters.filter(
          i => i.metername === field.metername
        );
        const hasMeter = Boolean(fieldMeters.length);
        const invalidMeterMessage = msgFormatter.replaceParams(
          this.props.i18n.meterNotAvailable,
          [field.metername]
        );
        readonly = readonly || !hasMeter;

        //istanbul ignore else
        if (metertype === 'CHARACTERISTIC') {
          answer = response ? response.txtresponse : null;
          const optionsMM = field.alndomain ? field.alndomain : [];

          // TODO reuse SelectorUtils to generate options

          const temp = optionsMM.map(option => {
            return {
              id: `optionid${option.value}`,
              label: option.value,
              value: option.value,
              checked: Boolean(answer && option.value === answer)
            };
          });
          let optionNodesMM = [];
          let keys = [];
          temp.forEach(element => {
            //istanbul ignore else
            if (
              keys.length === 0 ||
              keys.find(i => i === element.id) === undefined
            ) {
              optionNodesMM.push(element);
            }
            keys.push(element.id);
          });

          // TODO replace by AdaptiveSelectorInput
          nodeField = (
            <StatefulCheckboxGroup
              large={true}
              singleSelect={true}
              label={`${field.description ?? ''}`}
              initialOptions={optionNodesMM}
              id={`${id}_metercharac`}
              innerId={`${id}_metercharac`}
              disabled={readonly}
              required={field.required}
              onChange={this.checkHandler}
            />
          );
        } else if (metertype === 'CONTINUOUS') {
          answer = response ? response.numresponse : '';
          nodeField = (
            <>
              <Label
                label={field.measureunitid ? `${field.metername} (${field.measureunitid})` : `${field.metername}`}
                color={'gray60'}
                padding={'top'}
              />
              <NumberInput
                id={`${id}_${field.inspfieldid}_metercont`}
                label={field.description ?? ''}
                required={field.required}
                readonly={readonly}
                value={answer}
                onBlur={this.inputNumberHandler}
                invalidText={invalidText}
                invalid={field.rejected}
                max={numResponseMax}
                min={-numResponseMax}
              />
            </>
          );
        } else {
          // metertype === 'GAUGE'

          answer = response ? response.numresponse : '';
          nodeField = (
            <>
              <Label
                label={field.measureunitid ? `${field.metername} (${field.measureunitid})` : `${field.metername}`}
                color={'gray60'}
                padding={'top'}
              />
              <NumberInput
                id={`${id}_${field.inspfieldid}_metergauge`}
                label={field.description ?? ''}
                required={field.required}
                readonly={readonly}
                value={answer}
                onBlur={this.inputNumberHandler}
                invalidText={invalidText}
                invalid={field.rejected}
                max={numResponseMax}
                min={-numResponseMax}
              />
            </>
          );
        }
        const invalidMeterMsgNode = !hasMeter ? (
          <InvalidMeterMessage
            id={id}
            invalidMeterMessage={invalidMeterMessage}
          />
        ) : response.errormessage ? (
          <InvalidMeterMessage
            id={id}
            invalidMeterMessage={response.errormessage}
          />
        ) : null;

        const hasRollOver = fieldMeters.reduce(
          (acc, curr) => !Number.isNaN(Number(curr.rollover)) || acc,
          false
        );
        const rollOver = hasRollOver ? (
          <RollOverCheckBox
            id={id}
            checked={response.rolloverflag}
            onChange={this.rollOverCheckHandler}
            disabled={readonly}
          />
        ) : null;

        const message =
          (metertype === 'CONTINUOUS' || metertype === 'GAUGE') &&
            this.state.message ? (
            <Label
              id={`${id}_inspector_feedback`}
              label={this.state.message}
              padding='none'
              wrap={true}
            />
          ) : null;
        nodeField = (
          <>
            {nodeField}
            {rollOver}
            {message}
            {invalidMeterMsgNode}
          </>
        );

        break;

      //Attachment response
      case 'FU':
        let maxFileSize =
          this.app?.client?.systemProperties?.['mxe.doclink.maxfilesize'];
        maxFileSize = Number(maxFileSize);

        let validTypes =
          this.app?.client?.systemProperties?.[
          'mxe.doclink.doctypes.allowedFileExtensions'
          ];

        let enableMvi = (this.app?.state?.mviIntegration && this.props.field.selectedmodel && (this.props.field.selectedmodel !== '')) ? true : false;

        //istanbul ignore else
        if (this.state.attachmentsds) {
          nodeField = (
            <>
              <Button
                id={`${field.inspfieldid}_loadingAttachment`}
                label=''
                hidden={!this.state.isMVIProcessing}
                loading={this.state.isMVIProcessing}
                kind="ghost"

              />

              <AttachmentList
                id={`${field.inspfieldid}_attachment_list`}
                additionalActionTagLabel="inferencestatus"
                datasource={this.state.attachmentsds}
                isEditable={this.props.context.status !== 'CAN'}
                showAddOption={!readonly}
                showSearch={false}
                hideWhenEmpty={false}
                hideNoDataLabel={true}
                onFileUpload={this.inputAttachmentHandler}
                onFileDelete={this.deleteAttachmentHandler}
                addOptionLabel={this.props.i18n.uploadFile}
                validTypes={validTypes}
                recordMarkerFieldName={'getlatestversion'}
                recordMarkerFieldValue='true'
                maxAttachmentSize={maxFileSize}
                recordMarkerIcon={
                  this.state.MVIAnalyzeIcon ? this.state.MVIAnalyzeIcon : ''
                }
                additionalOptionsMenu={
                  <MenuButton
                    id={`${field.inspfieldid}_Menu_button`}
                    icon='carbon:overflow-menu--vertical'
                    kind='ghost'
                    disabled={this.state.readOnly}
                  >
                    <MenuItem
                      id={`${field.inspfieldid}_failed`}
                      label={this.props.i18n.analyzeButtonLabel}
                      icon='carbon:image--search'
                      kind='ghost'
                      hidden={!enableMvi}
                      onClick={
                        /* istanbul ignore next */
                        item => this.setAnalyzeRequest(item, this.getResultField())
                      }
                    />
                    <MenuItem
                      id={`${field.inspfieldid}_ChangeDialog`}
                      label={'View results'}
                      icon='carbon:edit'
                      kind='ghost'
                      hidden={!enableMvi}
                      onClick={
                        /* istanbul ignore next */
                        async item => {
                          const inspfieldresult = this.props.context?.inspfieldresultDS;
                          //istanbul ignore else
                          if (!inspfieldresult.items) {
                            await inspfieldresult.forceReload();
                          }
                          const currentInspfieldresult =
                            this.getCurrentInspfieldResult(inspfieldresult);
                          this.app.currentPage.state.hideDetails = false;

                          this.app.currentPage.state.inferenceResultIndex =
                           currentInspfieldresult.inspectionimageinference?.findIndex(
                              inference =>
                                inference?.doclinksid?.toString() === item?.describedBy?.identifier?.toString()
                            );

                          if (item.inferencestatus !== this.props.i18n.success) {
                            this.app.toast(
                              this.props.i18n.noMVI,
                              'error',
                              null,
                              null,
                              false
                            );
                          } else {
                            UIBus.emit('show-image-inference-edit', {
                              app :this.app,
                              activeImageRef :item.newurl,
                              LoadedObject:currentInspfieldresult});
                          }
                        }}
                    />
                  </MenuButton>
                }
              />
            </>
          );
          //istanbul ignore next
          if (field.required) {
            nodeField = (
              <div className='mx--button-touch-required'>{nodeField}</div>
            );
          }
        } else {
          nodeField = (
            <Button
              id={`${field.inspfieldid}_loadingAttachment`}
              label=''
              loading={true}
              kind="ghost"

            />

          )
        }
        break;

      case 'SIG':
        if (this.state.attachmentsds) {
          nodeField = (
            <BorderLayout
              id={`${field.inspfieldid}_box_signature_wrapper`}
              padding={true}
              fillParent={true}
              top={
                <Label
                  id={`${field.inspfieldid}_signature_description_label`}
                  label={field.description ?? ''}
                  required={field.required}
                  padding={'none'}
                  wrap={true}
                  theme={'small'}
                />
              }
              start={
                <BorderLayout
                  id={`${field.inspfieldid}_box_signature_input`}
                  start={
                    <>
                      <SignatureButton
                        id={`${field.inspfieldid}_signature_button`}
                        datasource={this.state.attachmentsds}
                        disabled={readonly}
                        heading={this.props.i18n.signatureDialogHeader}
                        iconName={'carbon:add'}
                        onUpload={this.inputAttachmentHandler}
                        kind={'secondary'}
                        imageFormat={'image/png'}
                        filename={`${field.inspfieldid}_signature`}
                      />
                      <Image
                        src={this.state.currentSignature}
                        id={`${field.inspfieldid}_image`}
                        height='128px'
                        width='128px'
                        hidden={!this.state.currentSignature}
                      />
                    </>
                  }
                />
              }
            />
          );
        } else {
          nodeField = (
            <Button
              id={`${field.inspfieldid}_loadingAttachment`}
              label=''
              loading={true}
              kind="ghost"

            />

          );
        }
        break;

      case 'DO':
        answer = response && response.dateresponse ? response.dateresponse : '';
        nodeField = (
          <DateInput
            id={`${field.inspfieldid}_date`}
            label={field.description ?? ''}
            value={answer}
            onChange={this.inputDateTimeHandler}
            required={field.required}
            readonly={readonly}
            loading={this.state.loading}
          />
        );
        break;

      case 'DT':
        let mergedTimevalue = '';
        if (response && response.dateresponse) {
          mergedTimevalue = getMergedDateTimeValue(
            response.dateresponse,
            response.timeresponse
          );
        }
        nodeField = (
          <DateTimeInput
            id={`${field.inspfieldid}_datetime`}
            label={field.description ?? ''}
            value={mergedTimevalue}
            showVerbose={false}
            onChange={this.inputDateTimeHandler}
            readonly={readonly}
            required={field.required}
            loading={this.state.loading}
          />
        );
        break;

      case 'TO':
        answer = response && response.timeresponse ? response.timeresponse : '';
        nodeField = (
          <TimeInput
            id={`${field.inspfieldid}_time`}
            label={field.description ?? ''}
            value={answer}
            onChange={this.inputDateTimeHandler}
            required={field.required}
            readonly={readonly}
          />
        );
        break;
      default:
        log.e(TAG, `Field type ${fieldTypeMx} not specified`);
        return (
          <Label
            label={this.props.i18n.fieldTypeNotFound}
            id={`${id}_label_error`}
          />
        );
    }
    return nodeField;
  }

  async prepareInspfieldDS() {
    let inspfieldresultds = this.props.context?.inspfieldresultDS;
    //istanbul ignore next
    if (inspfieldresultds) {
      if (
        this.props.field.fieldtype_maxvalue === 'FU' ||
        this.props.field.fieldtype_maxvalue === 'SIG'
      ) {
        this.createDoclinksDS(inspfieldresultds);
      }
    }
  }

  /**
   * Create datasource and put it on a attachmentsds state to be used on AttachmentList component
   */
  async createDoclinksDS(inspfieldresultDS) {
    let response = this.getResultField();
    //istanbul ignore else
    if (
      this.props.field.fieldtype_maxvalue === 'FU' ||
      this.props.field.fieldtype_maxvalue === 'SIG'
    ) {
      if (this.state.attachmentsds) {
        return;
      }

      //istanbul ignore else

      //istanbul ignore else
      if (inspfieldresultDS?.items?.length) {
        let currentInspection = inspfieldresultDS.items?.find(
          i => i.inspfieldnum === response.inspfieldnum
        );
        //istanbul ignore next
        if (this.app?.device?.isMobile) {
          if (!currentInspection.anywhererefid && !currentInspection.href) {
            return;
          }
          inspfieldresultDS.currentItem = currentInspection;
        }
        let options = {
          idAttribute: currentInspection.href ? 'href' : 'anywhererefid',
          pageSize: 10000,
          query: { attachment: true }
        }

        let doclinksDS = inspfieldresultDS.getChildDatasource(
          'doclinks',
          currentInspection,
          options
        );

        //istanbul ignore else
        if (doclinksDS) {
          doclinksDS.dataAdapter.itemIdProp = 'href';
          if (!doclinksDS.getSchema()) {
            await doclinksDS.initializeQbe();
          }
          await doclinksDS.load();

          this.setState({ attachmentsds: doclinksDS });
          this.setDoclinksURL(doclinksDS);
          //istanbul ignore else
          if (this.props.field.fieldtype_maxvalue === 'SIG') {
            this.showCurrentSignature();
          }
          this.setDoclinksStatus(this.props.context?.inspfieldresultDS, doclinksDS);
        }
      }
    }
  }



  //istanbul ignore next
  async setDoclinksURL(attachamentds) {
    attachamentds?.items?.forEach(async item => {
      item.newurl = await attachamentds.resolveCompleteURL(item.href);
    });
  }


  setDoclinksStatus(inspfieldresultDS, attachamentds) {

    const currentInspfieldresult = this.getCurrentInspfieldResult(inspfieldresultDS);
    const imageInferences = currentInspfieldresult.inspectionimageinference;
    const statusMap = {
      fail: this.props.i18n.fail,
      failed: this.props.i18n.fail,
      success: this.props.i18n.success,
      pending: this.props.i18n.pending
    };
    //istanbul ignore next
    let doclinks = attachamentds ? attachamentds.items : (currentInspfieldresult?.doclinks?.member ? currentInspfieldresult?.doclinks?.member : '');

    imageInferences?.forEach(imageinference => {
      let doclink = doclinks.find(d => d.describedBy?.identifier?.toString() === imageinference?.doclinksid?.toString());

      //istanbul ignore else
      if (doclink && imageinference.status) {
        doclink.inferencestatus = statusMap[imageinference.status];
      }
    });

    //istanbul ignore next
    if (doclinks) {
      doclinks.forEach(doclink => {
        let attachmentInMemory = this.app?.state?.attachmentsInMemory[doclink.anywhererefid ? doclink.anywhererefid : doclink?.describedBy?.identifier];
        if (!doclink?.describedBy?.identifier && attachmentInMemory) {
          doclink.inferencestatus = statusMap[attachmentInMemory.status];
        } else if (attachmentInMemory) {
          let temp = imageInferences?.find(imageinference => doclink.describedBy?.identifier?.toString() === imageinference?.doclinksid?.toString());
          if (!temp) {
            doclink.inferencestatus = statusMap[attachmentInMemory.status];
          } else {
            let inferenceDate = this.app?.dataFormatter?.convertISOtoDate(temp.changedate);
            let changedate = this.app?.dataFormatter?.convertISOtoDate(attachmentInMemory.changedate);
            if (inferenceDate < changedate) {
              doclink.inferencestatus = statusMap[attachmentInMemory.status];
            }
          }
        }
      });
    }

    //istanbul ignore else
    if (attachamentds) {
      this.setState({ attachamentds: attachamentds });
    }
  }
  setAnalyzeRequest(attachment, field) {
    const app = this.app;
    const format = attachment?.describedBy?.format?.label;
    const idx = format.indexOf('/');
    const type = format.substring(idx + 1);
    const validAnalyzeType = ['png', 'jpeg', 'jpg'];

    if (validAnalyzeType.includes(type)) {
      let model = this.props.field.selectedmodel;
      this.imageAnalysis(field, model, attachment);
    } else {
      app.toast(
        this.props.i18n.invalidMVIFile,
        'error',
        null,
        null,
        false
      );
    }
  }

  async imageAnalysis(field, model, attachment) {
    this.setState({ readOnly: true });
    this.setState({ isMVIProcessing: true });
    /* istanbul ignore next */

    await this.sendImageForInference(field, model, attachment);
    this.setState({ readOnly: false });
    this.setState({ isMVIProcessing: false });
    //await this.refreshAnalysisResult();
  }


  /** Function to send image to MVI Analysis */
  /* istanbul ignore next */
  async sendImageForInference(field, model, attachment) {
    let action = 'postInspInferenceByModel';

    let inspectionresultds =
      this.app.currentPage.datasources?.executeInspections;
    const record = this.props.inspectionResult;

    //let href = attachment.href;
    let objectname = attachment.describedBy.description;
    let doclinksid = attachment?.describedBy?.identifier;
    let anywhererefid = attachment?.anywhererefid;

    let option = {
      record: record,
      parameters: {
        inspectionresult: record,
        modelid: model,
        doclinksid: doclinksid,
        anywhererefid: anywhererefid,
        objectname: objectname,
        changedate: this.app?.dataFormatter?.convertDatetoISO(new Date())
      },
      headers: {
        'x-method-override': 'PATCH',
        patchtype: 'MERGE'
      }
    };

    let inspfieldresult = this.props.context?.inspfieldresultDS;
    let doclinksDS = this.state.attachmentsds;

    if (doclinksid || anywhererefid) {
      try {
        //istanbul ignore else
        this.app.state.attachmentsInMemory[anywhererefid ? anywhererefid : doclinksid] = { status: 'pending', changedate: this.app?.dataFormatter?.convertDatetoISO(new Date()) };
        sessionStorage.setItem(
          'attachmentsInMemory',
          JSON.stringify(this.app.state.attachmentsInMemory))
        this.setDoclinksStatus(inspfieldresult, doclinksDS);
        const result = await inspectionresultds.invokeAction(action, option);



        if ((result.return === 'success') || (this.app.device.isMobile && result[0]._responsemeta.status === 202)) {
          this.app.toast(msgFormatter.replaceParams(
            this.props.i18n.mviSuccess,
            [objectname]
          ));
        }
        else if (result.return === 'failed' || result.return === 'fail' || this.app.device.isMobile) {
          this.app.state.attachmentsInMemory[anywhererefid ? anywhererefid : doclinksid] = { status: 'fail', changedate: this.app?.dataFormatter?.convertDatetoISO(new Date()) };
          this.app.toast(
            msgFormatter.replaceParams(this.props.i18n.mvifail, [objectname]),
            'error',
            null,
            null,
            false
          );
        }
      } catch (error) {
        log.e(TAG, error);
        this.app.toast(`${error.message}`, 'error', null, null, false);
      } finally {
        this.setState({ readOnly: false });
        this.setState({ isMVIProcessing: false });
        if (!this.app?.device?.isMobile) {
          inspfieldresult.dataAdapter.options.response= null;
          await inspfieldresult.forceReload();
          this.setDoclinksStatus(inspfieldresult,doclinksDS);
          this.setDoclinksURL(doclinksDS);
        }
      }
    }
  }

  /**
   * Save Geographical location
   * */
  getGeoLocation() {
    //if the system property is enabled and there's a geoLocation information from the device, record the information in the db
    let savegeolocation = this.app?.state?.savegeolocation;
    let geolocation = this.app?.geolocation;

    /* istanbul ignore next */
    if (savegeolocation && geolocation) {
      this.app.geolocation.updateGeolocation();

      let geolocationState = this.app.geolocation.state;

      if (
        geolocationState &&
        ((geolocationState.latitude === 0 &&
          geolocationState.longitude === 0) ||
          geolocationState.hasError)
      ) {
        geolocationState.enabled = false;
        return;
      } else {
        geolocationState.enabled = true;

        let geolocationlong = this.app.geolocation.state.longitude;
        let geolocationlat = this.app.geolocation.state.latitude;

        let coordinates = [geolocationlat, geolocationlong];

        let obj = {
          coordinates: [],
          type: 'Point'
        };

        obj.coordinates = coordinates;

        return JSON.stringify(obj);
      }
    }
  }

  render() {
    const isEdgeLegacy = this.device.browser.isEdgeLegacy;
    let response = this.getResultField();
    const { field } = this.props;
    const ref = response
      ? refStore.getInspFieldResultRef(response.inspfieldresultid, true)
      : null;

    log.d(TAG, `Render field`);

    let input = null;
    if (field && this.props.context?.inspfieldresultDS) {
      input =
        (field.visible !== false || field.required) && this.state.visibility ? (
          <div
            id={`${field.inspfieldid}_field_ref`}
            ref={ref}
            style={{
              scrollMarginTop: !isEdgeLegacy ? '8rem' : '',
              paddingTop: isEdgeLegacy ? '8rem' : '',
              marginTop: isEdgeLegacy ? '-8rem' : '',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div
              id={`${field.inspfieldid}_field_input_wrapper`}
              style={{
                width: '100%'
              }}
            >
              {this.fieldInput(field, response)}
            </div>
            <MenuButton
              id={`${field.inspfieldid}_Menu_button`}
              icon='carbon:overflow-menu--vertical'
              kind='ghost'
              hidden={
                field.fieldtype_maxvalue === 'FU' ||
                field.fieldtype_maxvalue === 'SIG'
              }
            >
              <MenuItem
                id={`${field.inspfieldid}_open_previous_results_drawer_button`}
                label={this.props.i18n.fieldMenuButtonLabel}
                icon='carbon:help'
                kind='ghost'
                onClick={() => this.openPreviousResultsDrawer(field)}
                hidden={
                  field.fieldtype_maxvalue === 'FU' ||
                  field.fieldtype_maxvalue === 'SIG'
                }
              />
            </MenuButton>
          </div>
        ) : null;
    }
    return input;
  }
}

const RollOverCheckBox = ({ id, checked, onChange, disabled }) => (
  <StatefulCheckboxGroup
    large={true}
    id={`${id}_rollover_checkbox`}
    innerId={`${id}_rollover_checkbox`}
    initialOptions={[
      {
        id: `rollover_checkbox_option`,
        innerId: `rollover_checkbox_option`,
        label: 'Rollover',
        checked: Boolean(checked)
      }
    ]}
    disabled={disabled}
    onChange={onChange}
  />
);

const InvalidMeterMessage = ({ id, invalidMeterMessage }) => (
  <Box
    id={`${id}_invalid_meter_message`}
    margin={0.5}
    verticalAlign={'center'}
    horizontalAlign={'center'}
    manageChildren={false}
  >
    <Icon
      id={`${id}_message_box_icon`}
      icon={'carbon:warning--alt'}
      size={'24'}
    />
    <Label
      id={`${id}_meter_not_available`}
      label={invalidMeterMessage}
      padding='none'
      wrap={true}
    />
  </Box>
);

//function to wrap the component with StatusConsumer
const withContext = Component => {
  return props => {
    return (
      <StatusConsumer>
        {context => <Component {...props} context={context} />}
      </StatusConsumer>
    );
  };
};

InspField.defaultProps = {
  i18n: {
    placeholder: 'Enter answer',
    fieldTypeNotFound: 'Field type not found',
    invalidText: 'Number is not valid.',
    meterNotAvailable:
      'The meter {0} is not available in the selected asset or location.',
    uploadFile: 'Upload a file',
    fieldMenuButtonLabel: 'Previous results',
    signatureDialogHeader: 'Add signature',
    analyzeButtonLabel: 'Analyze photo',
    fail: 'Failed',
    success: 'Completed',
    pending: 'Pending',
    invalidMVIFile: 'Only .jpeg, .jpg, and .png files can be sent for analysis and set as the default.',
    noMVI: 'No analysis exists to edit.',
    mviSuccess: `Photo {0} analyzed.`,
    mvifail: `Error analyzing {0}. Retry the analysis.`,
  },
  field: null,
  response: null,
  meters: [],
  onAnswerUpdate: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
    finally: PropTypes.func.isRequired
  }),
  onChange: () => { }
};

InspField.propTypes = {
  field: PropTypes.object,
  response: PropTypes.object,
  onAnswerUpdate: PropTypes.func,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  meters: PropTypes.array,
  i18n: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    fieldTypeNotFound: PropTypes.string.isRequired,
    invalidText: PropTypes.string.isRequired,
    meterNotAvailable: PropTypes.string.isRequired,
    uploadFile: PropTypes.string.isRequired,
    fieldMenuButtonLabel: PropTypes.string.isRequired,
    signatureDialogHeader: PropTypes.string.isRequired,
    analyzeButtonLabel: PropTypes.string.isRequired,
    fail: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    pending: PropTypes.string.isRequired,
    invalidMVIFile: PropTypes.string.isRequired,
    noMVI: PropTypes.string.isRequired,
    mviSuccess: PropTypes.string.isRequired,
    mvifail: PropTypes.string.isRequired
  })
};

InspField.displayName = 'InspField';

export default withContext(BaseComponent(InspField, 'InspField'));
