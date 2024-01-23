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

const SESSION_TYPE = {
  'NONE': 'none',
  'MXINSPECT': 'mxinspect',
  'M2A2': 'm2a2'
};

const SERVER_STATUS = {
  'CONNECTING': 'connecting',
  'CONNECT': 'connect',
  'DISCONNECT': 'disconnect'
};

// gateway server events (client <-> gateway)
const GATEWAY_EVENT = {
  'READY': 'ready',
  'DATA': 'data',
  'STT_AUDIO': 'stt-audio',
  'STT_TEXT': 'stt-text',
  'TTS_AUDIO': 'tts-audio',
  'TTS_TEXT': 'tts-text',
  'METRIC': 'metric',
  'ERROR': 'error'
};

const SOCKET_IO_EVENT = {
  'CONNECT': 'connect',
  'ERROR': 'connect_error',
  'TIMEOUT': 'connect_timeout',
  'DISCONNECT': 'disconnect'
};

// https://socket.io/docs/v4/client-api/#event-disconnect
const SOCKET_IO_DISCONNECT_REASON = {
  'SERVER_CLOSE': 'io server disconnect',
  'CLIENT_CLOSE': 'io client disconnect',
  'TIMEOUT': 'ping timeout',
  'NETWORK_LOST': 'transport close',
  'NETWORK_ERROR': 'transport error'
};

const EVENT_SOURCE = {
  'SERVER': 'Server',
  'CLIENT': 'You',
  'SYSTEM': 'System'
};

const RECORD_MODE = {
  'AUTO': 0,
  'MANUAL': 1
};

const AUDIO_FORMAT = {
  'WEBM': 'audio/webm',
  'OGG': 'audio/ogg',
  'MPEG': 'audio/mpeg',
  'WAV': 'audio/wav'
};

module.exports = {
  SESSION_TYPE,
  SERVER_STATUS,
  GATEWAY_EVENT,
  SOCKET_IO_EVENT,
  SOCKET_IO_DISCONNECT_REASON,
  EVENT_SOURCE,
  RECORD_MODE,
  AUDIO_FORMAT
}
