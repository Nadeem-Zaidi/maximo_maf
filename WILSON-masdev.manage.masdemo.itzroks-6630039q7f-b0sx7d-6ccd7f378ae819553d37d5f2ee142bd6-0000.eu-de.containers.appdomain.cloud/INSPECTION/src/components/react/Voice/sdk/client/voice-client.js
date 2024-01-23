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
/* istanbul ignore file */
 import _ from 'lodash';

import SocketClient from './sockets';
import logger from '../logger';
import {
  GATEWAY_EVENT, 
  SOCKET_IO_EVENT,
  EVENT_SOURCE
} from '../common';

class VoiceClient {
  constructor(sdk, config) {
    this.sdk = sdk;
    this.config = config;
    logger.debug('client config:', JSON.stringify(this.config));

    this.sockets = new SocketClient(this.config);
    let events = [];
    events = _.concat(events, _.values(SOCKET_IO_EVENT));
    events = _.concat(events, _.values(GATEWAY_EVENT));
    events.forEach(event => {
      this.sockets.registerEventHandler(
        event, (data) => { 
          this.sdk._handleMessage({ 
            from: EVENT_SOURCE.SERVER, 
            event: event, 
            data: data 
          });
        }
      )
    });

    this.chunkIndex = 0;
  }

  start() {
    this.sdk._onConnecting();
    this.sockets.connect();
  }

  stop() {
    this.sockets.disconnect();
  }

  sendAudio(buffer, duration) {
    // set a empty chunks to stop sending 
    if (_.isNil(buffer) || buffer.byteLength === 0) {
      this.sockets.send(GATEWAY_EVENT.STT_AUDIO, { index: -1, buffer: [] });
      logger.debug('stop sending audio');
      return;
    }

    this.sockets.send(GATEWAY_EVENT.STT_AUDIO, { 
      index: this.chunkIndex, 
      buffer: buffer,
      duration: duration
    });
    logger.debug('sent audio chunk: idx=%i, len=%i, duration=%i', this.chunkIndex, buffer.byteLength, duration);
    this.chunkIndex = this.chunkIndex + 1;
  }

  sendText(text) {
    this.sockets.send(GATEWAY_EVENT.TTS_TEXT, {
      text: text
    });
    logger.debug('sent text: ' + text);
  }

  sendData(data) {
    this.sockets.send(GATEWAY_EVENT.DATA, data);
    logger.debug('sent data: ' + data);
  }

}

export default VoiceClient;
