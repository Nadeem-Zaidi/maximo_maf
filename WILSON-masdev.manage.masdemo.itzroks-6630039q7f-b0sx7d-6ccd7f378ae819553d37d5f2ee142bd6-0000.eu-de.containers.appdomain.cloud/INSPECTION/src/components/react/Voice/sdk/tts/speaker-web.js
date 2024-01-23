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


/**
 * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
 */
class SpeakerWeb {
  constructor(sdk, config) {
    this.sdk = sdk;
    this.config = config || {};
    this.config.lang = config.lang || 'en-US';
    this.config.pitch = config.pitch || 1;
    this.config.rate = config.rate || 1;
    this.config.volume = config.volume || 1;
    logger.info('speaker config:', JSON.stringify(this.config));

    this.utter = new global.SpeechSynthesisUtterance();
    this.utter.lang = this.config.lang;
    this.utter.pitch = this.config.pitch;
    this.utter.rate = this.config.rate;
    this.utter.volume = this.config.volume;

    this.speaking = false;
  }

  init() {
    logger.debug('speaker init ...');

    return this.getSpeakerDevices().then(data => {
      this.voices = data;

      // supporing the old version
      if (!global.speechSynthesis.onvoiceschanged) {
        this.utter.voice = this.voices.filter(
          function (voice) {
            return voice.localService === true && voice.lang === this.utter.lang;
          }.bind(this))[0];
          
      } else {
        global.speechSynthesis.onvoiceschanged = () => {
          this.utter.voice = this.voices.filter(
            function (voice) {
              return voice.localService === true && voice.lang === this.utter.lang;
            }.bind(this))[0];
        };
      }

      this._registerEventHandler();

      logger.debug('speaker init success, use local tts.');
      return Promise.resolve({
        type: 'speak',
        serverTts: false
      });

    }).catch(() => {
      logger.debug('speaker init failed, use server tts.');
      return Promise.resolve({
        type: 'speak',
        serverTts: true
      });
    });
  }

  getSpeakerDevices() {
    return new Promise((resolve, reject) => {
        let times = 0;
        let id = setInterval(() => {
          logger.debug('speaker call global.speechSynthesis.getVoices() on %i/%i times', times+1, 10);
          if (global.speechSynthesis.getVoices().length > 0) {
            clearInterval(id);
            resolve(global.speechSynthesis.getVoices());
            return;
          }

          if (times > 10) {
            clearInterval(id);
            logger.error('speaker init failed: speaker call global.speechSynthesis.getVoices() not return values');
            reject('Failed to initialize speaker deivce!');
            return;

          } else {
            times++;
          }
        }, 100);
      }
    )
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance#events
   */

  _registerEventHandler() {
    this.utter.onstart = (event) => {
      logger.debug('speaker start');
      this.speaking = true;
      this.sdk._onSpeakStart(this.msg);
    };

    this.utter.onend = (event) => {
      logger.debug('speaker stop');
      this.speaking = false;
      this.sdk._onSpeakStop(this.msg);
    };

    this.utter.onerror = (event) => {
      logger.error('speaker error: ' + event.error);
      this.speaking = false;
      this.sdk._onSpeakError(this.msg, event.error);
    };
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#methods
   */

  /**
   * msg: {
   *  unread: true,
   *  data: {
   *    text: text
   *  }
   * }
   */
  start(msg) {
    if (this.speaking) {
      logger.debug('speaker already start');
      return;
    }

    this.speaking = true;
    this.msg = msg;
    this.utter.text = msg.data.text;
    global.speechSynthesis.speak(this.utter);
  }

  stop() {
    if (!this.speaking) {
      logger.debug('speaker already stop');
      return;
    }

    this.speaking = false;
    global.speechSynthesis.cancel();
  }

}

export default SpeakerWeb;
