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

import React from 'react';

import {mount} from 'enzyme';

import StatefulTextInput from './StatefulTextInput';

it('value state should be assigned with blur event value', () => {
  const wrapper = mount(<StatefulTextInput id={'textinput1'} />);

  let textInput = wrapper.find('input').first();

  textInput.simulate('blur', {
    target: {
      value: 'new response'
    }
  });
  expect(wrapper.find('StatefulTextInput').state('value')).toBe('new response');
});

it('onBlur callback should be called on blur sending the event', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <StatefulTextInput id={'textinput1'} onBlur={mockCallBack} />
  );

  let textInput = wrapper.find('input').first();

  textInput.simulate('blur', {
    target: {
      value: 'new response'
    }
  });
  expect(mockCallBack.mock.calls.length).toBe(1);
  expect(mockCallBack.mock.calls[0][0].target.value).toBe('new response');
});

it('StatefulTextInput initial state should be initialized by value prop', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <StatefulTextInput
      id={'textinput1'}
      onBlur={mockCallBack}
      value='initial response'
    />
  );

  expect(wrapper.find('StatefulTextInput').state('value')).toBe(
    'initial response'
  );
});

it('StatefulTextInput initial state should be empty string if value prop is passed as null', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <StatefulTextInput
      id={'textinput1'}
      onBlur={mockCallBack}
      value={null}
    />
  );

  expect(wrapper.find('StatefulTextInput').state('value')).toBe(
    ''
  );
});
