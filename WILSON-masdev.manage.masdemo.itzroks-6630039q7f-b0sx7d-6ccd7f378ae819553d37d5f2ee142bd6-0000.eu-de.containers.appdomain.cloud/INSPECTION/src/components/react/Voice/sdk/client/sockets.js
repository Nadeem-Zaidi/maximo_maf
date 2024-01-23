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
import io from 'socket.io-client';
import logger from '../logger';

class SocketClient {
  constructor(config) {
    let serverHost = config.host;
    if (_.startsWith(serverHost, 'http')) {
      serverHost = _.split(serverHost, '//')[1];
    }
    serverHost = _.replace(serverHost, '/', '');
    
    const protocol = config.ssl ? 'wss://' : 'ws://';
    this.serverUrl = `${protocol}${serverHost}:${config.port}`;
    this.strParams = (_.has(config, 'params')) ? JSON.stringify(config.params) : '{}';
    this.options = {
      path: '/voice-gateway',
      reconnection: false,
      autoConnect: false,
      query: { params: this.strParams },
      extraHeaders: _.get(config, 'headers', {})
    };
    this.socket = io(this.serverUrl, this.options);
  }

  /**
   * Customize event.
   * @param {*} event 
   * @param {*} callback 
   */
  registerEventHandler(event, callback) {
    logger.debug('register event handler: ' + event);
    this.socket.on(event, (data) => {
      callback && callback(data);
    });
  }

  connect() {
    logger.debug('connecting to server ' + this.serverUrl);
    this.socket.open();
  }

  disconnect() {
    logger.debug('disconnecting from server...');
    if (this.socket.connected) {
      this.socket.close();
    }
    this.socket.off();
  }

  /**
   * Send the data to server.
   * @param {*} event 
   * @param {*} callback 
   */
  send(event, data) {
    this.socket.emit(event, data, () => { });
  }
}

export default SocketClient;
