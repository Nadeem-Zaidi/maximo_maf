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

const LOG_PREFIX = '[voice-sdk] ';

class logger {
  static info(...args) {
    args[0] = LOG_PREFIX + args[0];
    // eslint-disable-next-line no-console
    console.info.apply(console, args);
  }
  static debug(...args) {
    args[0] = LOG_PREFIX + args[0];
    // eslint-disable-next-line no-console
    console.debug.apply(console, args);
  }
  static warn(...args) {
    args[0] = LOG_PREFIX + args[0];
    // eslint-disable-next-line no-console
    console.warn.apply(console, args);
  }
  static error(...args) {
    args[0] = LOG_PREFIX + args[0];
    // eslint-disable-next-line no-console
    console.error.apply(console, args);
  }
}

export default logger;
