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
  name: 'form-execution',
  description: 'An element used to display text on the UI.',

  props: {
    id: {
      type: 'string',
      description: 'The unique id name for form-execution.'
    },
    datasource: {
      type: 'string',
      required: true,
      description: 'The name of the datasource.'
    },
    meters: {
      type: 'object',
      required: true,
      description: 'The list of available meters for assets and locations.'
    },
    loading: {
      type: 'bool',
      default: false,
      description: 'Show a loading'
    },
    'choice-display-threshold': {
      type: 'number',
      description: 'Limit to determine rendering of checkbox or lookup.'
    },
    'edit-trans': {
      type: 'bool',
      description: 'Force the edition to be enabled.',
      default: false
    },
    'on-change': {
      type: 'event',
      description:
        'Provide an optional callback method that is called when an input filled.'
    },
    'on-change-arg': {
      type: 'string',
      description: 'Event data to pass to the on-change event.'
    },
    'show-info': {
      type: 'event',
      description: 'Event to show instructions for the Inspection.'
    },
    'open-previous-results-drawer': {
      type: 'event',
      description: 'Event to open previous results drawer from a field.'
    },
    'update-dialog': {
      type: 'event',
      description:
        'Event to set update a state indicating the dialog needs to be updated.'
    },
    'on-load': {
      type: 'event',
      description: 'Event to handle On Load for the Inspection.'
    }
  },
  samples: [
    {
      name: 'Simple Form Execution.',
      source: `<form-execution forms="[{},{}]" />`
    }
  ]
};

module.exports.default = registry;
