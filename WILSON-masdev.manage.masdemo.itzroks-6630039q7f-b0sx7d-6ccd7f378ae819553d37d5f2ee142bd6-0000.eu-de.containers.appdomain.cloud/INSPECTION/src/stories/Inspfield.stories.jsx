import React from 'react';

import Inspfield from '../components/react/InspField/InspField';

export default {
  title: 'Example/Inspfield',
  component: Inspfield,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

const Template = args => <Inspfield {...args} />;

export const Raw = Template.bind({});
Raw.args = {
  user: {
    name: 'Jane Doe'
  }
};
