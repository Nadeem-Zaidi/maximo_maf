import React from 'react';
import StatefulLookupField from './StatefulLookupField';

import {domainOptions as lookupOptions} from '../../../../src/test/data/lookup-data';

const story = {
  title: 'Inspections/StatefulLookupField',
  component: StatefulLookupField,
  argTypes: {
    options: {control: 'object'},
    selectionMode: {
      name: 'Selection mode',
      options: ['single', 'multiple'],
      control: {
        type: 'radio'
      }
    },
    lookupHeading: {
      control: 'text'
    }
  }
};

export default story;

const Template = args => <StatefulLookupField {...args} />;

export const simple = Template.bind({});
simple.args = {
  options: [
    {_id: 'sel', name: 'Seline', lastname: 'Jones'},
    {_id: 'gil', name: 'Gilbert', lastname: 'Martin'}
  ],
  selectionMode: 'single',
  id: 'lookup1'
};
simple.storyName = 'Simple';

export const ALNDomain = Template.bind({});
ALNDomain.args = {
  options: lookupOptions,
  selectionMode: 'multiple',
  id: 'lookup2'
};
ALNDomain.storyName = 'ALN Domain Lookup';
