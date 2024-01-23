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

import {log} from '@maximo/maximo-js-api';

const TAG = 'VoiceController';

class VoiceController {
  /**
   * Page initialized.
   * @param {*} page page instance
   * @param {*} app app instance
   */
   pageInitialized(page, app) {
    this.app = app;
    this.page = page;

    this.page.state.isDisconnected = false;
    this.page.state.isError = false;

    this.page.state.callback = {
      onConnecting: () => {
        this.page.state.isDisconnected = false;
        this.page.state.isError = false;
      },
      onDisconnect: (reason) => {
        this.page.state.isDisconnected = true;
        this.page.state.isError = true;
      },
      onNotReady: (error) => {
        this.page.state.isError = true;
      },
      onReceivedData: (msg) => {
        /* istanbul ignore else */
        if (msg.data.body.saved) {
          this.app.state.needUpdateInspectionResult = true;
        }
      },
      onError: (name, message) => {
        this.page.state.isError = true;
      }
    }
  }

  /**
   * Page resumed.
   * @param {page} page page instance
   * @param {app} app app instance
   */
   pageResumed(page, app) {
    log.d(TAG, 'pageResumed');
    let assistUrl = sessionStorage.getItem('assist_url');
    //istambul ignore else
    if (!assistUrl) {
      const serverUrl = localStorage.getItem('serverUrl') || '';
      const regex = /\.(.+?)\./g;
      const match = regex.exec(serverUrl);
      //istambul ignore else
      if (match && match.length > 0) {
        assistUrl = serverUrl.replace('.' + match[1] + '.', '.assist.');
      } 
    }

    const assistPort = sessionStorage.getItem('assist_port') || 443;
    const accessToken = sessionStorage.getItem('access_token') || '';
    const apiKey = sessionStorage.getItem('assist_apikey') || '';
    const tenantId = sessionStorage.getItem('tenant_id') || '';

    const configs = {
      server: {
        host: assistUrl,
        port: assistPort,
        ssl: true,
        params: {
          sessionType: 'mxinspect',
          sessionParam: {
            orgId: page.params.orgid,
            formNum: page.params.form_num,
            revision: page.params.revision,
            resultNum: page.params.result_num
          },
          stt: {
            enabled: true,
            forwardText: true
          }
        },
        headers: {
          'x-access-token': accessToken,
          'x-api-key': apiKey,
          'x-tenant-id': tenantId
        }
      }
    };

    this.page = page;
    this.app = app;
    this.page.state.configs = configs;
    this.page.state.muted = false;
    this.page.state.isDisconnected = false;
    this.page.state.isError = false;
    this.app.state.needUpdateInspectionResult = false;
  }

  /**
   * The function for leaving the current page.
   */
  pagePaused() {
    log.d(TAG, 'pagePaused');
    this.page.state.muted = true;
    this.app.state.isBackFromhVoiceInspection = true;
  }

  /**
   * Mute/Unmute the voice.
   */
  toggle() {
    this.page.state.muted = !this.page.state.muted;
  }
}

export default VoiceController;
