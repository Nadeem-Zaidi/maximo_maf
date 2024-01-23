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
import logger from '../logger';
import { AUDIO_FORMAT } from '../common';

import AudioRecorder from 'audio-recorder-polyfill';
import mpegEncoder from 'audio-recorder-polyfill/mpeg-encoder';
AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = AUDIO_FORMAT.MPEG;

/**
 * Standard API:
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 * 
 * Polyfill to support recording MP3/WAV audio
 * https://github.com/ai/audio-recorder-polyfill
 */
class Recorder {
  constructor(sdk, config) {
    this.sdk = sdk;
    this.config = config;

    this.config.timeSlice = config.timeSlice || 1000;
    logger.debug('recorder config:', JSON.stringify(this.config));

    this.mediaRecorder = null;
    this.recording = false;
    this.chunks = [];
    this.startTime = 0;
  }

  init() {
    logger.debug('recorder init ...');

    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        const getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        if (!getUserMedia) {
          logger.error('recorder init failed: getUserMedia is not implemented in this browser.');
          return Promise.reject('Your browser does not support recording audio!');
        }

        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }

    return navigator.mediaDevices.getUserMedia({ audio: true })
    .then((mediaStream) => {
      const options = {}
      
      if (MediaRecorder.isTypeSupported(AUDIO_FORMAT.OGG)) {
        // Firefox (deault: "audio/ogg")
        options.mimeType = AUDIO_FORMAT.OGG;
        this.mediaRecorder = new MediaRecorder(mediaStream, options);

      } else if (MediaRecorder.isTypeSupported(AUDIO_FORMAT.WEBM)) {
        // Chrome (default: "audio/webm;codecs=opus")
        options.mimeType = AUDIO_FORMAT.WEBM;
        this.mediaRecorder = new MediaRecorder(mediaStream, options);

      } else {
        // Safari (default: "audio/mp4")
        options.mimeType = AUDIO_FORMAT.MPEG;
        this.mediaRecorder = new AudioRecorder(mediaStream);
      }

      // register event handler for MediaRecorder
      this._registerEventHandler();

      logger.debug('recorder init success: mimeType=' + options.mimeType);
      return Promise.resolve({
        type: 'record',
        recordFormat: options.mimeType
      });
      
    })
    .catch((err) => {
      logger.error('recorder init failed: getUserMedia: ' + err);
      return Promise.reject('Failed to initialize recording device!');
    });
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder#event_handlers
   */

  _registerEventHandler() {
    this.mediaRecorder.addEventListener('start', (event) => {
      this.recording = true;
      this.startTime = new Date().getTime();
      logger.debug('recorder start: startTime=' + this.startTime);
      this.sdk._onRecordStart(this.startTime);
    });

    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      if (!this.recording) {
        return;
      }

      const blob = event.data;
      if (blob.size > 0) {
        let duration = 0;
        if (this.config.timeSlice > 0) {
          duration = this.config.timeSlice;
        } else {
          duration = new Date().getTime() - this.startTime;
        }
        duration = Math.ceil(duration / 1000);

        logger.debug('recorder data: type=%s, len=%i, duration=%i', blob.type, blob.size, duration);
        this.chunks.push(blob);
        this.sdk._onRecordData(blob, duration);
      }
    });

    this.mediaRecorder.addEventListener('stop', (event) => {
      this.recording = false;
      let duration = new Date().getTime() - this.startTime;
      duration = Math.ceil(duration / 1000);
      logger.debug('recorder stop: duration=' + duration);
      this.sdk._onRecordStop(this.chunks, duration);
    });

    this.mediaRecorder.addEventListener('error', (event) => {
      logger.error('recorder error: ' + event.error);
      this.recording = false;
      this.sdk._onRecordError(event.error);
    });
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder#methods
   */

  start() {
    if (this.recording) {
      logger.debug('recorder already start');
      return;
    }

    this.chunks = [];
    this.recording = true;

    if (this.config.timeSlice > 0) {
      this.mediaRecorder.start(this.config.timeSlice);
    } else {
      this.mediaRecorder.start();
    }
  }

  stop() {
    if (!this.recording) {
      logger.debug('recorder already stop');
      return;
    }

    this.recording = false;
    this.mediaRecorder.requestData();
    this.mediaRecorder.stop();
  }

}

export default Recorder;
