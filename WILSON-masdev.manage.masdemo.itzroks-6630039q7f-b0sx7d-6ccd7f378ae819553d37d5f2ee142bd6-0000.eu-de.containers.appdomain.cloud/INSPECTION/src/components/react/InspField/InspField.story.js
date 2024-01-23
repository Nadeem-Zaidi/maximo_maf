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

import React from 'react';

import InspField from './InspField';

const story = {
  title: 'Inspections/Field',
  component: InspField,
  argTypes: {
    field: {object: {}},
    onChange: () => {}
  }
};

export default story;

const Template = (args) => <InspField {...args} />;

export const Undefined = Template.bind({});

export const Required = Template.bind({});
Required.args = {
  field: {fieldtype: 'TR', description: 'Requires answer', required:  true}
};

export const Text = Template.bind({});
Text.args = {
  field: { fieldtype: 'TR', description: 'Enter pump tag ID?'},
  onChange: () => { alert('something changed') },
};
