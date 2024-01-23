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
import { windowOrGlobal } from '@maximo/maximo-js-api/build/Constants';
import logger from '../logger';


/**
 * https://www.npmjs.com/package/cordova-plugin-speech
 */
class SpeakerCordova {
  constructor(sdk, config) {
    this.sdk = sdk;
    this.config = config || {};
    this.config.lang = config.lang || 'en-US';
    this.config.pitch = config.pitch || 1;
    this.config.rate = config.rate || 1;
    logger.info('speaker config:', JSON.stringify(this.config));
    
    this.speaking = false;
  }

  init() {
    logger.debug('speaker init ...');
    
    return new Promise((resolve, reject) => {
      windowOrGlobal.Speech.getSupportedVoices((voices) => {
        logger.debug('speaker init success, use local tts.');
        resolve({
          type: 'speak',
          serverTts: false
        });

      }, (error) => {
        logger.error(error);
        logger.debug('speaker init failed, use server tts.');
        resolve({
          type: 'speak',
          serverTts: true
        });
      });
    });
  }

  /**
   * msg: {
   *  unread: true,
   *  data: {
   *    text: text
   *  }
   * }
   */
  start(msg) {
    logger.debug('speaker start ...');

    if (this.speaking) {
      logger.debug('speaker already started');
      return;
    }

    this.speaking = true;
    this.msg = msg;
    const option = {
      pitchRate: this.config.pitch,
      speechRate: this.config.rate,
      language: this.config.lang
    };

    windowOrGlobal.Speech.speakOut(this.msg.data.text, (result) => {
      if (result === 'tts-start') {
        this.onStarted();
        
      } else if (result === 'tts-end') {
        this.onStopped();
      }

    }, (error) => {
      this.onError(error);

    }, option);
  }

  onStarted() {
    logger.debug('speaker started');
    this.speaking = true;
    this.sdk._onSpeakStart(this.msg);
  }

  onStopped() {
    logger.debug('speaker stopped');
    this.speaking = false;
    this.sdk._onSpeakStop(this.msg);
  }

  onError(error) {
    logger.error('speaker error: ' + error);
    this.speaking = false;
    this.sdk._onSpeakError(this.msg, error);
  }

  stop() {
    logger.debug('speaker stop ...');

    if (!this.speaking) {
      logger.debug('speaker already stopped');
      return;
    }

    this.speaking = false;
  }

}

export default SpeakerCordova;
