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
import StatefulCheckboxGroup from './StatefulCheckboxGroup';

const story = {
  title: 'Inspections/CheckboxGroup',
  component: StatefulCheckboxGroup,
  argTypes: {
    initialOptions: {control: 'object'},
    singleSelect: {control: 'boolean'}
  }
};

export default story;

const Template = args => <StatefulCheckboxGroup {...args} />;

export const NoCheckboxes = Template.bind({});
NoCheckboxes.args = {
  initialOptions: [],
  singleSelect: false,
  id: 'noCheckboxes'
};
NoCheckboxes.storyName = 'No checkboxes';

export const SingleOption = Template.bind({});
SingleOption.args = {
  initialOptions: [
    {id: 'pineapple', label: 'pineapple 🍍'},
    {id: 'apple', label: 'apple 🍎'},
    {id: 'avocado', label: 'avocado 🥑'}
  ],
  singleSelect: false,
  id: 'singleOption'
};
SingleOption.storyName = 'Single option';
