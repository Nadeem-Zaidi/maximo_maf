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

import React from 'react';
import PropTypes from 'prop-types';
import {BaseComponent} from '@maximo/react-components';
import StatefulCheckboxGroup from '../StatefulCheckboxGroup/StatefulCheckboxGroup';
import StatefulLookupField, {
  SelectModeEnum
} from '../StatefulLookupField/StatefulLookupField';
import {useConfig} from '../context/ConfigContext';

/**
 * Functional component that determines the type of input based on choices.
 * For fields with total options greater than threshold should render lookup, and checkboxes otherwise.
 * @param {object} props
 * @returns {React.Component}
 */
const AdaptiveSelectorInput = ({
  id,
  options,
  singleSelect,
  label,
  readonly,
  selectionChangeHandler,
  required
}) => {
  const context = useConfig();

  const lookupSelectionMode = singleSelect
    ? SelectModeEnum.SINGLE
    : SelectModeEnum.MULTIPLE;

  const render =
    options.length > context.choiceDisplayThreshold ? (
      <StatefulLookupField
        id={`${id}_lookup`}
        lookupHeading={label}
        options={options}
        selectionMode={lookupSelectionMode}
        readonly={readonly}
        showCount={true}
        showSearch={true}
        required={required}
        label={label}
        onChange={selectionChangeHandler}
      />
    ) : (
      <StatefulCheckboxGroup
        id={`${id}_checkbox`}
        innerId={`${id}_checkbox`}
        large={true}
        initialOptions={options}
        singleSelect={singleSelect}
        label={label}
        disabled={readonly}
        onChange={selectionChangeHandler}
        required={required}
      ></StatefulCheckboxGroup>
    );

  return render;
};

AdaptiveSelectorInput.propTypes = {
  options: PropTypes.array,
  singleSelect: PropTypes.bool,
  label: PropTypes.string,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  selectionChangeHandler: PropTypes.func.required
};

AdaptiveSelectorInput.defaultProps = {
  options: [],
  singleSelect: true,
  label: ''
};

export default BaseComponent(AdaptiveSelectorInput);
