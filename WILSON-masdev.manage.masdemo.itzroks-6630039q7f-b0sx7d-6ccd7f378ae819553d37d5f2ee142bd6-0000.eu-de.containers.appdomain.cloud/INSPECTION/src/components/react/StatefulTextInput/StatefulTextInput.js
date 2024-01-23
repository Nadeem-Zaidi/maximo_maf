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

import {BaseComponent, TextInput} from '@maximo/react-components';

class StatefulTextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.blur = this.blur.bind(this);
    this.state = {
      value: props.value ?? ''
    };
  }

  blur(event) {
    this.setState({value: event.target.value});
    this.props.onBlur(event);
  }

  render() {
    return (
      <TextInput 
        {...this.props} 
        value={this.state.value} 
        onBlur={this.blur} 
      />
    );
  }
}

// Set default props
StatefulTextInput.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func
};

// Set default props
StatefulTextInput.defaultProps = {
  value: '',
  onBlur: () => {}
};

export default BaseComponent(StatefulTextInput);
