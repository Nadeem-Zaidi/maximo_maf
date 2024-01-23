import React from 'react';
import AdaptiveSelectorInput from './AdaptiveSelectorInput';

const story = {
  title: 'Inspections/AdaptiveSelectorInput',
  component: AdaptiveSelectorInput,
  argTypes: {
    id: {
      description: 'component identification',
      control: 'text'
    },
    options: {control: 'object'},
    singleSelect: {
      label: 'Type of selection',
      control: 'boolean'
    },
    choiceDisplayThreshold: {
      control: 'number'
    }
  }
};

export default story;

const Template = args => <AdaptiveSelectorInput {...args} />;

export const underThresholdSelector = Template.bind({});
underThresholdSelector.args = {
  options: [
    {label: 'one', id: '1'},
    {label: 'two', id: '2'},
    {label: 'three', id: '3'}
  ],
  singleSelect: false
};
underThresholdSelector.storyName = 'Under threshold data';

export const aboveThresholdData = Template.bind({});
aboveThresholdData.args = {
  options: [
    {name: 'Apple', icon: '🍎', id: '🍎'},
    {name: 'orange', icon: '🍊', id: '🍊'},
    {name: 'watermelon', icon: '🍉', id: '🍉'},
    {name: 'banana', icon: '🍌', id: '🍌'},
    {name: 'lemon', icon: '🍋', id: '🍋'},
    {name: 'blueberry', icon: '🫐', id: '🫐'}
  ],
  singleSelect: true
};
aboveThresholdData.storyName = 'Above threshold data';
