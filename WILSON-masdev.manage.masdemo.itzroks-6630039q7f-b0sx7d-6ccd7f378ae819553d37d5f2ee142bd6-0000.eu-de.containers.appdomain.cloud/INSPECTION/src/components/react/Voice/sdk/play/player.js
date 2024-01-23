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

import logger from "../logger";
import { AUDIO_FORMAT } from '../common';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 */
class Player {
  constructor(sdk, config) {
    this.sdk = sdk;
    this.config = config || {};
    logger.info("player config: ", JSON.stringify(this.config));

    this.playing = false;
  }

  init() {
    logger.debug('player init ...');

    /**
     * TTS supported audio formats
     * https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-audio-formats
     */
    return new Promise((resolve, reject) => {
      this.audio = new Audio();
      let mimeType = '';

      if (MediaRecorder.isTypeSupported(AUDIO_FORMAT.OGG)) {
        // Firefox (deault: "audio/ogg")
        mimeType = AUDIO_FORMAT.OGG;

      } else if (MediaRecorder.isTypeSupported(AUDIO_FORMAT.WEBM)) {
        // Chrome (default: "audio/webm;codecs=opus")
        mimeType = AUDIO_FORMAT.WEBM;

      } else {
        // Safari (default: "audio/mp4")
        mimeType = AUDIO_FORMAT.MPEG;
      }

      this._registerEventHandler();
      logger.debug('player init success: mimeType=' + mimeType);
      resolve({
        type: 'play',
        playFormat: mimeType
      });
    });
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
   */

  _registerEventHandler() {
    this.audio.onplay = (event) => {
      logger.debug('player start');
      this.playing = true;
      this.sdk._onPlayStart(this.msg);
    };

    this.audio.onended = (event) => {
      logger.debug('player stop');
      this.playing = false;
      this.sdk._onPlayStop(this.msg);
    };

    this.audio.onerror = (event) => {
      logger.error('player error: ' + event.error);
      this.playing = false;
      this.sdk._onPlayError(this.msg, event.error);
    };
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#methods
   */


  /**
   * msg: {
   *  type: 'blob' | 'base64'
   *  data: {
   *    index: 0,
   *    buffer: []
   *  }
   * }
   */
  start(msg) {
    if (this.playing) {
      logger.debug('player already start');
      return;
    }

    this.playing = true;
    this.msg = msg;
    const type = msg.type || 'blob';

    if (type === 'blob') {
      this.audio.src = global.URL.createObjectURL(msg.data.buffer);
      this.audio.play();

    } else if (type === 'base64') {
      this.audio.src = msg.data.buffer;
      this.audio.play();
    }
  }


  stop() {
    if (!this.playing) {
      logger.debug('player already stop');
      return;
    }

    this.playing = false;
    this.audio.pause();
  }


  base64ToBlob(base64, fileType) {
    const arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1];
    let bstr = arr[1].toString('base64'), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

}

export default Player;
