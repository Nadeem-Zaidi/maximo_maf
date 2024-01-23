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
import SpeakerWeb from './speaker-web';
import SpeakerCordova from './speaker-cordova';

class SpeakerFactory {
  static getSpeaker(sdk, config) {
    if ('_cordovaNative' in global) {
      return new SpeakerCordova(sdk, config);
    } else {
      return new SpeakerWeb(sdk, config);
    }
  }
}

export default SpeakerFactory;
