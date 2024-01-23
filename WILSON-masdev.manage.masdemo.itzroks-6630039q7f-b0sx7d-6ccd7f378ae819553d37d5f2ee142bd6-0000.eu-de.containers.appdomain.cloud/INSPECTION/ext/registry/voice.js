/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

const registry = {
  name: 'voice',
  description: 'An element used to display text on the UI.',

  props: {
    id: {
      type: 'string',
      description: 'The unique id name for voice.'
    },
    type: {
      type: 'string',
      description: 'The type of voice.'
    },
    configs: {
      type: 'object',
      description: 'The configs of voice.'
    },
    callback: {
      type: 'object',
      description: 'The callback of voice.'
    },
    muted: {
      type: 'bool',
      description: 'Muted for voice.'
    }    
  },
  samples: [
    {
      name: 'Voice.',
      source: `<voice type="inspection" muted="false" />`
    }
  ]
};

module.exports.default = registry;
