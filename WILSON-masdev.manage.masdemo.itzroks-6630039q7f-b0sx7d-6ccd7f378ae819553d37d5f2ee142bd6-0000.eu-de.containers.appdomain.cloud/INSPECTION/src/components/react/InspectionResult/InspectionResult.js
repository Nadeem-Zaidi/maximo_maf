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
import PropTypes from 'prop-types';
import {log,AppSwitcher} from '@maximo/maximo-js-api';
import {BaseComponent, Label, Box} from '@maximo/react-components';

import {ResultProvider} from '../context/ResultContext';
import refStore from '../../../stores/refStore';
import conditionsStore from '../../../stores/ConditionsStore';
import QuestionGroup from '../../../container/QuestionGroup/QuestionGroup';

/**
 * Compute form header description. Use asset.description if its available, otherwise use locations.description.
 *
 * @param {Object} inspection - inspectionresult object from datasource
 * @returns {String | null} - Returns null if there is no asset and locations description available
 */
const headerDescription = inspection => {
  let description = null;
  //istanbul ignore else
  if (inspection) {
    //istanbul ignore else
    if (inspection.assets && inspection.assets[0].assetnum) {
      description = inspection.assets[0].description
        ? inspection.assets[0].assetnum + ' ' + inspection.assets[0].description
        : inspection.assets[0].assetnum;
    } else if (inspection.locations && inspection.locations[0].location) {
      description = inspection.locations[0].description
        ? inspection.locations[0].location +
          ' ' +
          inspection.locations[0].description
        : inspection.locations[0].location;
    }
  }
  return description ? String(description) : description;
};

const TAG = 'InspectionResult';
const conditions = conditionsStore;
class InspectionResult extends React.Component {
  constructor(props) {
    super(props);
    this.getNewField = this.getNewField.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
    this.ensureFieldResults = this.ensureFieldResults.bind(this);
    this.getShowInfo = this.getShowInfo.bind(this);
    this.getNewField = this.getNewField.bind(this);
    this.ensureFieldResults(props.inspection);
    conditions.initiate(
      props.inspection.inspcascadeoption,
      props.inspection.inspfieldresult
    );
    this.state = {
      contextValue: {
        getNewField: this.getNewField(),
        updateResponse: this.updateResponse,
        inspResult: this.props.inspection
      }
    };
    this.app = AppSwitcher.get().currentApp;
  }

  componentWillUnmount() {
    const {inspection} = this.props;
    refStore.removeInspectionRef(inspection.inspectionresultid);
  }

  /**
   * Create inspfieldresult property if it does not exist yet
   * @param {Object} props
   */
  ensureFieldResults(inspectionResult) {
    // Ensure inspfieldresult
    if (
      !inspectionResult.hasOwnProperty('inspfieldresult') ||
      !inspectionResult.inspfieldresult
    ) {
      inspectionResult.inspfieldresult = [];
    }
  }

  /**
   * Returns a function persisting inspection id
   * to when it gets executed by children
   * @param {String} resultId
   * @returns {Function} Closure that hosts parent id
   */
  getShowInfo(resultId) {
    return payload => {
      this.props.showInfo({...payload, resultId});
    };
  }

  /**
   * Build the inspection inspfieldresult object
   * @returns {Object} returns the result object
   */
  getNewField() {
    const {inspection, executor} = this.props;
    
    const getNewDate  = () => {
      return this.app ? this.app.dataFormatter.convertDatetoISO(new Date()) : new Date();
    };

    if (!executor) {
      const noExecutorMessage = this.props.i18n.error_noExecutor;
      log.e(TAG, noExecutorMessage);
      throw new Error(noExecutorMessage);
    }

    return (questionNum, fieldNum) => {
      if (!questionNum || !fieldNum) {
        const message = this.props.i18n.error_missingRequiredParameters;
        log.e(TAG, `${message} ${JSON.stringify({questionNum, fieldNum})}`);
        throw new Error(message);
      }
      return {
        inspformnum: inspection.inspformnum,
        revision: inspection.revision,
        resultnum: inspection.resultnum,
        orgid: inspection.orgid,
        siteid: inspection.siteid,
        inspfieldnum: fieldNum,
        inspquestionnum: questionNum,
        txtresponse: null,
        numresponse: null,
        enteredby: executor.personid,
        entereddate:  getNewDate(),
        inspfieldresultselection: []
      };
    };
  }

  /**
   * Handle response to trigger updateDS callback
   * @param {Object} response - inspectionresult response object
   */
  async updateResponse(response) {
    const {inspection} = this.props;
    /* istanbul ignore next */
    if (
      inspection.inspfieldresult.findIndex(
        item => item.inspfieldnum === response.inspfieldnum
      ) >= 0
    ) {
      // TODO Update attributes
      log.d(TAG, `Field already exist`);
    }
    await this.props.updateDS(response);
  }

  render() {
    log.d(TAG, `Rendering InspectionResult`);

    const {inspection} = this.props;
    this.ensureFieldResults(inspection);
    const formTitle = headerDescription(inspection);
    const showInfoCallback = this.getShowInfo(inspection.inspectionresultid);
    const ref = refStore.getInspectionRef(inspection.inspectionresultid, true);
    const id = `${this.props.id}_qg`;

    return (
      <div
        className='mx--form-execution-wrapper'
        key={inspection.inspectionresultid}
        ref={ref}
      >
        <Box
          direction='column'
          horizontalAlign='stretch'
          marginBottom='0.5'
          marginStart='0.5'
          marginEnd='0.5'
          id={`${inspection.inspectionresultid}_formExecution_box_wrapper`}
        >
          <Box
            verticalAlign='center'
            childrenHideOverflow={true}
            fillParent={true}
            style={{minHeight: '4rem'}}
            id={`${inspection.inspectionresultid}_formExecution_description_label_box_wrapper`}
          >
            <Label
              label={formTitle}
              theme='header-medium'
              id={`${inspection.inspectionresultid}_formExecution_description_label`}
            />
          </Box>
          <ResultProvider value={this.state.contextValue}>
            <QuestionGroup
              id={id}
              questionList={inspection.inspquestionsgrp?.sort((a, b) => a.groupseq - b.groupseq)}
              isFirstLevel={true}
              showInfo={showInfoCallback}
            />
          </ResultProvider>
        </Box>
      </div>
    );
  }
}

InspectionResult.propTypes = {
  id: PropTypes.string.isRequired,
  executor: PropTypes.object,
  updateDS: PropTypes.func,
  i18n: PropTypes.shape({
    error_noExecutor: PropTypes.string.isRequired,
    error_missingRequiredParameters: PropTypes.string.isRequired
  })
};

// Set default props
InspectionResult.defaultProps = {
  inspection: {},
  updateDS: () => {},
  i18n: {
    error_noExecutor: 'Executor is required to perform an inspection.',
    error_missingRequiredParameters:
      'Question number and field number are required to create an entry.'
  }
};

InspectionResult.displayName = 'InspectionResult';

// Extra `observer` is required to update responses from context
export default BaseComponent(InspectionResult, InspectionResult.displayName);
