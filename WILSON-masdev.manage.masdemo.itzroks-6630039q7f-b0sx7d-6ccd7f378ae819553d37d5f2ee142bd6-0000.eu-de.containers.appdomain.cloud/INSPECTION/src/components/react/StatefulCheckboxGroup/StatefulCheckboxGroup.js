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

import {BaseComponent, CheckBoxGroup} from '@maximo/react-components';

class StatefulCheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      options: props.initialOptions.sort((optionA, optionB) => {
        if (optionA.id < optionB.id) {
          return -1;
        }
        return 1;
      }),
      optionMap: this.mapOptions(props.initialOptions)
    };
  }

  mapOptions(options) {
    let map = {};
    options.forEach((option, index) => {
      map[option.id] = index;
    });
    return map;
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialOptions !== prevProps.initialOptions) {
      this.setState({
        options: this.props.initialOptions,
        optionMap: this.mapOptions(this.props.initialOptions)
      });
    }
  }

  handleChange(checkbox) {
    let options = [...this.state.options];
    const currentCheckbox = options[this.state.optionMap[checkbox.innerId]];
    currentCheckbox.checked = checkbox.checked;

    //assign inspectorfeedback to be passed on onChange callback
    checkbox.inspectorFeedback = currentCheckbox.inspectorFeedback;
    checkbox.value = currentCheckbox.value;
    this.setState({
      options: options
    });
    if (!checkbox.deselectAction) {
      this.props.onChange(checkbox);
    }
  }

  render() {
    let options = [...this.state.options];
    return (
      <CheckBoxGroup
        {...this.props}
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

// Set default props
StatefulCheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  initialOptions: PropTypes.array,
  onChange: PropTypes.func
};

// Set default props
StatefulCheckboxGroup.defaultProps = {
  initialOptions: [],
  onChange: () => {}
};

export default BaseComponent(StatefulCheckboxGroup);
