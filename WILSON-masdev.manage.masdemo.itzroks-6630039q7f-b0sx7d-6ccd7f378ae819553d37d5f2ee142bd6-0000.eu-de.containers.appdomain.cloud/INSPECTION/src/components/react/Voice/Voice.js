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
import React from "react";
import PropTypes from 'prop-types';
import VoiceSDK from './sdk/voice-sdk';

class Voice extends React.Component {

  /**
   * Voice initialise
   */
   async componentDidMount() {
    try {
      this.voiceSDK = new VoiceSDK();
      await this.voiceSDK.init(this.props.configs, this.props.callback);
      //istanbul ignore next
      this.voiceSDK.start();
      //istanbul ignore next
      this.voiceSDK.muted(this.props.muted);
    } catch(e) {
    }
  }

  /**
   * Voice destory
   */
  componentWillUnmount() {
    this.voiceSDK.stop();
  }

  /**
   * Voice parameters be updated.
   * @param {*} prevProps 
   * @param {*} prevState 
   */
  componentDidUpdate(prevProps, prevState) {
    this.voiceSDK.muted(this.props.muted);
  }

  /**
   * Do nothing.
   */
  render() {
    return (<></>)
  }
}

// Set default props
Voice.propTypes = {
  muted: PropTypes.bool,
  configs: PropTypes.object,
  callback: PropTypes.object
};

// Set default props
Voice.defaultProps = {
  muted: false,
  configs: {},
  callback: {}
};

export default Voice;
