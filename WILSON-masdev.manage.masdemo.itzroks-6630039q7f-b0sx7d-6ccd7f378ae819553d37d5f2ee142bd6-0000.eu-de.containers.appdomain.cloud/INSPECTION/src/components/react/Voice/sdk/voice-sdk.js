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

import logger from "./logger";
import Player from './play/player';
import Recorder from './record/recorder';
import VoiceClient from './client/voice-client';
import SpeakerFactory from './tts/speaker-factory';

import { BEEP_ALERT } from './play/beep';

import { 
  SERVER_STATUS,
  GATEWAY_EVENT, 
  SOCKET_IO_EVENT, 
  SOCKET_IO_DISCONNECT_REASON,
  RECORD_MODE,
  EVENT_SOURCE
} from './common';

/**
 * Voice client SDK
 */
export class VoiceSDK {

  constructor() {
    this._serverStatus = SERVER_STATUS.DISCONNECT;
    this._inited = false;
  }
  
  // ---------------------------------------------------------------------------------------------- 
  // Interface Methods
  // ---------------------------------------------------------------------------------------------- 

  getServerStatus() {
    return this._serverStatus;
  }

  init(config, sdkCallback) {
    logger.debug('sdk initing');
    this._config = config;
    this._sdkCallback = sdkCallback;
    this._inited = false;
    this._recordFormat = "";
    this._playFormat = "";
    this._serverTts = false;
    
    if (_.isNil(this._config) || !_.has(this._config, 'server')) {
      return Promise.reject('missing server config');
    }

    if (!_.has(this._config, 'speak')) {
      logger.debug('not set speak config: enable by default');
      this._config.speak = {
        enabled: true
      };
    }

    if (!_.has(this._config, 'play')) {
      logger.debug('not set play config: enable by default');
      this._config.play = {
        enabled: true
      };
    }

    if (!_.has(this._config, 'record')) {
      logger.debug('not set record config: enable by default');
      this._config.record = {
        enabled: true
      };
    }

    if (!_.has(this._config, 'record.mode')) {
      this._config.record.mode = RECORD_MODE.AUTO;
      logger.debug('not set record mode: use auto mode by default');
    }

    const initPromises = [];

    if (this._config.speak.enabled) {
      this._speaker = SpeakerFactory.getSpeaker(this, this._config.speak);
      initPromises.push(this._speaker.init());
    } else {
      initPromises.push(Promise.resolve());
    }

    if (this._config.play.enabled) {
      this._player = new Player(this, this._config.play);
      initPromises.push(this._player.init());
    } else {
      initPromises.push(Promise.resolve());
    }

    if (this._config.record.enabled) {
      this._recorder = new Recorder(this, this._config.record);
      initPromises.push(this._recorder.init());
    } else {
      initPromises.push(Promise.resolve());
    }

    return Promise.all(initPromises).then((results) => {
      logger.debug('sdk init: ' + JSON.stringify(results));

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (_.isNil(result) || _.isEmpty(result)) {
          continue;
        }

        if (result.type === 'speak') {
          this._serverTts = result.serverTts;

        } else if (result.type === 'play') {
          this._playFormat = result.playFormat;

        } else if (result.type === 'record') {
          this._recordFormat = result.recordFormat;
        }
      }

      if (this._serverTts) {
        _.set(this._config, 'server.params.tts.enabled', true);
        _.set(this._config, 'server.params.tts.audioFormat', this._playFormat);
      }
      
      if (this._config.record.enabled) {
        _.set(this._config, 'server.params.stt.audioFormat', this._recordFormat);
      }

      this._client = new VoiceClient(this, this._config.server);
      this._inited = true;
      logger.debug('sdk init success');
      return Promise.resolve();

    }).catch((reason) => {
      logger.error('sdk init failed');
      return Promise.reject(reason);
    });
  }

  start() {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    logger.debug('sdk start');
    this._ttsTexts = [];
    this._ttsChunks = [];
    this._playBlobs = [];
    
    this._isStopped = false;
    this._isSpeaking = false;
    this._isPlaying = false;
    this._isMuted = false;
    this._hasError = false;
    this._isCompleted = false;
    this._isServerReady = false;
    this._sessionId = null;

    // connect to server
    this._client.start();
  }

  stop() {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    logger.debug('sdk stop');
    this._isStopped = true;
    this._client.stop();
    this.stopRecord();
    this.stopSpeak();
    this.stopPlay();
    this._ttsTexts = [];
  }

  muted(isMuted) {
    logger.debug('muted:', isMuted);
    this._isMuted = isMuted;

    if (isMuted) {
      this.stopRecord();
    } else {
      this.startRecord();
    }
  }

  switchRecordMode(mode) {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    this._config.record.mode = mode;
    logger.debug('switch mode to: ' + (this._isRecordManualMode() ? 'manual' : 'auto'));

    if (this._isRecordManualMode()) {
      logger.debug('in manual mode: stop record');
      this.stopRecord();
    }
  }

  getRecordMode() {
    return this._config.record.mode;
  }

  addTtsText(text) {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    logger.debug('add tts text');
    this._handleMessage({
      from: EVENT_SOURCE.SYSTEM,
      event: GATEWAY_EVENT.TTS_TEXT,
      data: {text: text}
    });
  }

  startSpeak(msg) {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    if (!this._speaker) {
      logger.debug('speaker not enabled');
      return;
    }

    logger.debug('start speak');

    if (this._canStartSpeak()) {
      this._speaker.start(msg);
    }
  }

  stopSpeak() {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    if (!this._speaker) {
      logger.debug('speaker not enabled');
      return;
    }

    logger.debug('stop speak');
    this._speaker.stop();
  }

  startPlay(msg, force=false) {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    if (!this._player) {
      logger.debug('player not enabled');
      return;
    }

    logger.debug('start play');

    if (this._canStartPlay(force)) {
      this._player.start(msg);
    }
  }

  stopPlay() {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    if (!this._player) {
      logger.debug('player not enabled');
      return;
    }

    logger.debug('stop play');
    this._player.stop();
  }

  startRecord() {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    if (!this._recorder) {
      logger.debug('recorder not enabled');
      return;
    }

    logger.debug('start record');

    if (this._canStartRecord()) {
      this._recorder.start();
    }
  }

  stopRecord() {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    if (!this._recorder) {
      logger.debug('recorder not enabled');
      return;
    }

    logger.debug('stop record');
    this._recorder.stop();
  }

  playBeep() {
    this.startPlay({
      type: 'base64', 
      data: { 
        buffer: BEEP_ALERT
      }
    }, true);
  }

  sendText(text) {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    logger.debug('send text');
    this._client.sendText(text);
  }

  sendData(data) {
    if (!this._inited) {
      logger.warn('sdk not initialized');
      return;
    }

    logger.debug('send data');
    this._client.sendData(data);
  }

  // ---------------------------------------------------------------------------------------------- 
  // Internal Methods
  // ---------------------------------------------------------------------------------------------- 

  _isRecordAutoMode() {
    return (RECORD_MODE.AUTO === this.getRecordMode());
  }

  _isRecordManualMode() {
    return (RECORD_MODE.MANUAL === this.getRecordMode());
  }

  _invokeSdkCallback(method, ...args) {
    if (_.isNil(this._sdkCallback)) {
      logger.warn('sdk event handler not set');
      return;
    }

    if (_.has(this._sdkCallback, method)) {
      _.invoke(this._sdkCallback, method, ...args);

    } else {
      // logger.warn('sdk event handler method not defined: ' + method);
    }
  }

  // ---------------------------------------------------------------------------------------------- Events

  /**
   * for example,
   * msg: {
   *  from: EVENT_SOURCE,
   *  event: GATEWAY_EVENT,
   *  data: {
   *    text: text
   *  }
   * }
   */
  _handleMessage(msg) {
    msg.date = new Date();
    logger.debug('received message: ' + JSON.stringify(msg));

    switch (msg.event) {

      // handle socket.io events
      case SOCKET_IO_EVENT.CONNECT:
        this._onConnected();
        break;

      case SOCKET_IO_EVENT.ERROR:
        this._serverStatus = SERVER_STATUS.DISCONNECT;
        this._onError(msg.event, 'Unable connect to server!');
        break;

      case SOCKET_IO_EVENT.TIMEOUT:
        this._serverStatus = SERVER_STATUS.DISCONNECT;
        this._onError(msg.event, 'Connect to server timed out!');
        break;

      case SOCKET_IO_EVENT.DISCONNECT:
        this._onDisconnect(msg.data);
        break;

      // handle gateway events
      case GATEWAY_EVENT.READY:
        this._onReady(msg);
        break;

      case GATEWAY_EVENT.TTS_TEXT:
        this._onReceivedTtsText(msg);
        break;

      case GATEWAY_EVENT.TTS_AUDIO:
        this._onReceivedTtsAudio(msg);
        break;

      case GATEWAY_EVENT.STT_TEXT:
        this._onReceivedSttText(msg);
        break;

      case GATEWAY_EVENT.DATA:
        this._onReceivedData(msg);
        break;

      case GATEWAY_EVENT.ERROR:
        this._onError(msg.data.name, msg.data.message);
        break;
        
      default:
        break;
    }
  }

  _onConnecting() {
    this._serverStatus = SERVER_STATUS.CONNECTING;
    this._invokeSdkCallback('onConnecting');
  }

  _onConnected() {
    this._serverStatus = SERVER_STATUS.CONNECT;
    this._invokeSdkCallback('onConnected');
  }

  _onDisconnect(reason) {
    this._serverStatus = SERVER_STATUS.DISCONNECT;
    this._isServerReady = false;
    // beep when connection is not closed by client
    if (reason && reason.includes(SOCKET_IO_DISCONNECT_REASON.CLIENT_CLOSE)) {
      logger.debug('client closed this connection: will not beep');
    } else {
      this.playBeep();
    }
    this._invokeSdkCallback('onDisconnect', reason);
  }

  _onReady(msg) {
    this._isServerReady = msg.data.result;

    if (this._isServerReady) {
      // read all texts that received before this event
      this._speakUnreadText();

      this._sessionId = msg.data.sessionId;
      this._invokeSdkCallback('onReady', msg.data.sessionId);

    } else {
      // beep when server is not ready
      this.playBeep();
      this._invokeSdkCallback('onNotReady', msg.data.error?.name, msg.data.error?.message);
    }
  }

  _onError(name, message) {
    logger.error('got error: %s, %s', name, message);

    if (this._isRecordAutoMode()) {
      logger.debug('auto mode: on error, stop record.');
      this.stopRecord();
    }

    // ignore STT error, just restart the record.
    if (_.startsWith(name, 'Stt')) {
      this.startRecord();
      return;
    }

    // only beep one time when error occurred
    if (!this._hasError) {
      this.playBeep();
    }

    this._hasError = true;
    this._invokeSdkCallback('onError', name, message);
  }

  _onReceivedTtsText(msg) {
    this._invokeSdkCallback('onReceivedTtsText', msg);

    if (this._serverTts) {
      logger.debug('received tts text, since using server tts, wait for tts audio chunks');
      return;
    }

    msg.unread = true;
    this._ttsTexts.push(msg);

    // start speak processing
    if (!this._isSpeaking) {
      this._speakUnreadText();

    } else {
      logger.debug('received tts text, but already in processing speak, wait for next loop');
    }
  }

  _onReceivedTtsAudio(msg) {
    this._invokeSdkCallback('onReceivedTtsAudio', msg);

    if (msg.data.index === -1) {
      logger.debug('received all tts audio chunks, create a blob and add it to playlist');

      // https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
      const blob = new Blob(this._ttsChunks, { type: this._playFormat });
      this._playBlobs.push(blob);
      this._ttsChunks = [];

      // start play processing
      if (!this._isPlaying) {
        this._playNextBlob();

      } else {
        logger.debug('received tts blob, but already in processing play, wait for next loop');
      }

    } else {
      this._ttsChunks.push(msg.data.buffer);
    }
  }

  _onReceivedSttText(msg) {
    this._invokeSdkCallback('onReceivedSttText', msg);
  }

  _onReceivedData(msg) {
    this._invokeSdkCallback('onReceivedData', msg);
  }

  _onCompleted() {
    this._invokeSdkCallback('onCompleted');
  }

  // ---------------------------------------------------------------------------------------------- Speak

  _canStartSpeak() {
    if (this._isStopped) {
      logger.warn('cannot start speak now: sdk is stopped');
      return false;
    }

    if (!this._isServerReady) {
      logger.warn('cannot start speak now: server is not ready');
      return false;
    }

    return true;
  }

  _speakUnreadText() {
    logger.debug('try to speak all unread texts...');

    if (!this._speaker) {
      logger.debug('speaker not enabled');
      return;
    }

    if (!this._canStartSpeak()) {
      return;
    }

    this._isSpeaking = true;

    // find the first unread msg
    let idx = -1;
    for (let i = 0; i < this._ttsTexts.length; i++) {
      if (this._ttsTexts[i].unread) {
        idx = i;
        break;
      }
    }

    // all msg were read: stop speak processing
    if (idx === -1) {
      logger.debug('all text were read: total=' + this._ttsTexts.length);
      this._onSpeakAllText();
      return;
    }

    logger.debug('found unread text: idx=%i, total=%i', idx, this._ttsTexts.length);

    this._ttsTexts[idx].unread = false;
    this._speaker.start(this._ttsTexts[idx]);
  }

  _onSpeakAllText() {
    this._isSpeaking = false;

    if (this._isRecordAutoMode()) {
      logger.debug('auto mode: on speak all text, start record.');
      this.startRecord();
    }
  }

  _onSpeakStart(msg) {
    this._invokeSdkCallback('onSpeakStart', msg);

    if (this._isRecordAutoMode()) {
      logger.debug('auto mode: on speak start, stop record.');
      this.stopRecord();
    }
  }

  _onSpeakStop(msg) {
    this._invokeSdkCallback('onSpeakStop', msg);

    // try to speak next unread msg
    this._speakUnreadText();
  }

  _onSpeakError(msg, error) {
    // found error: stop speak processing
    this._isSpeaking = false;
    this._invokeSdkCallback('onSpeakError', msg, error);
  }

  // ---------------------------------------------------------------------------------------------- Play

  _canStartPlay(force=false) {
    if (force) {
      return true
    }

    if (this._isStopped) {
      logger.warn('cannot start play now: sdk is stopped');
      return false;
    }

    if (!this._isServerReady) {
      logger.warn('cannot start play now: server is not ready');
      return false;
    }

    return true;
  }

  _playNextBlob() {
    logger.debug('try to play next blob...');

    if (!this._player) {
      logger.debug('player not enabled');
      return;
    }

    if (!this._canStartPlay()) {
      return;
    }

    this._isPlaying = true;

    // find the next blob
    let blob = null;
    if (this._playBlobs.length > 0) {
      blob = this._playBlobs.shift();
    }

    // all blob were read: stop play processing
    if (!blob) {
      logger.debug('all blob were played');
      this._onPlayAllBlob();
      return;
    }

    logger.debug('found next blob');
    this._player.start({
      type: 'blob',
      data: {
        buffer: blob
      }
    });
  }

  _onPlayAllBlob() {
    this._isPlaying = false;

    if (this._isRecordAutoMode()) {
      logger.debug('auto mode: on play all blob, start record.');
      this.startRecord();
    }
  }

  _onPlayStart(msg) {
    this._invokeSdkCallback('onPlayStart', msg);

    if (this._isRecordAutoMode()) {
      logger.debug('auto mode: on play start, stop record.');
      this.stopRecord();
    }
  }

  _onPlayStop(msg) {
    this._invokeSdkCallback('onPlayStop', msg);

    // try to play next unread blob
    this._playNextBlob();
  }

  _onPlayError(msg, error) {
    this._invokeSdkCallback('onPlayError', msg, error);
  }

  // ---------------------------------------------------------------------------------------------- Record

  _canStartRecord() {
    if (this._isStopped) {
      logger.warn('cannot start record now: sdk is stopped');
      return false;
    }

    if (!this._isServerReady) {
      logger.warn('cannot start record now: server is not ready');
      return false;
    }

    if (this._hasError) {
      logger.warn('cannot start record now: has error');
      return false;
    }

    if (this._isCompleted) {
      logger.warn('cannot start record now: completed');
      return false;
    }

    if (this._isMuted) {
      logger.warn('cannot start record now: muted');
      return false;
    }

    return true;
  }

  _onRecordStart(startTime) {
    this._invokeSdkCallback('onRecordStart');

    if (this._isRecordAutoMode()) {
      logger.debug('auto mode: on record start, stop speak/play.');
      this.stopSpeak();
      this.stopPlay();
    }
  }

  _onRecordData(blob, duration) {
    this._invokeSdkCallback('onRecordData', blob, duration);
    blob.arrayBuffer().then(buffer => {
      logger.debug('onRecordData: convert blob to array buffer, len=%i, duration=%i', buffer.byteLength, duration);
      this._client.sendAudio(buffer, duration);
    }) 
  }

  _onRecordStop(chunks, duration) {
    this._invokeSdkCallback('onRecordStop', chunks, duration);

    // NOTE: we need always send empty data to stt, this will let stt know we have finished talking.
    // this will reopen the stt steam on server side, and avoid to wait for the currently session to be timed out.
    this._client.sendAudio(null);
  }

  _onRecordError(error) {
    this._invokeSdkCallback('onRecordError', error);
  }
}

export default VoiceSDK;
