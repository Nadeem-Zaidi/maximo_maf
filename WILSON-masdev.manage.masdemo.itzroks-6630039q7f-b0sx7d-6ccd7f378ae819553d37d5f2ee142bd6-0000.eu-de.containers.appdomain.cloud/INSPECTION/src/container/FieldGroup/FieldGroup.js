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

import {log} from '@maximo/maximo-js-api';
import {BaseComponent} from '@maximo/react-components';

import InspField from '../../components/react/InspField/InspField';
import {ResultConsumer} from '../../components/react/context/ResultContext';
import {MetersConsumer} from '../../components/react/context/InspectionAssetLocationMetersContext';
import { Observer } from 'mobx-react';

const TAG = 'FieldGroup';

/**
 * A `FieldGroup` is container to accommodate list of inspection fields.
 */
class FieldGroup extends React.Component {

  render() {
    log.d(TAG, `Render`);
    const {id, fields, fieldChangeHandler, ...passThroughProps} = this.props;

    return (
      <MetersConsumer>
        {metersContextValue => (
          <ResultConsumer>
            {resultContext => {
              const {getNewField, inspResult, updateResponse} =
                resultContext || {};
              return fields.map(field => (
                <Observer key={field.inspfieldid}>
                  {() => {
                    return (
                      <InspField
                        {...passThroughProps}
                        id={`${id}_fieldid${field.inspfieldid}`}
                        key={field.inspfieldid}
                        field={field}
                        getNewField={getNewField}
                        inspectionResult={inspResult}
                        onAnswerUpdate={updateResponse}
                        onChange={fieldChangeHandler}
                        meters={metersContextValue}
                      />
                    );
                  }}
                </Observer>
              ));
            }}
          </ResultConsumer>
        )}
      </MetersConsumer>
    );
  }
}

// Set default props
FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.array,
  fieldCompletionHandler: PropTypes.func
}

// Set default props
FieldGroup.defaultProps = {
  fields: [],
  fieldCompletionHandler: () => {}
};

export default BaseComponent(FieldGroup);
