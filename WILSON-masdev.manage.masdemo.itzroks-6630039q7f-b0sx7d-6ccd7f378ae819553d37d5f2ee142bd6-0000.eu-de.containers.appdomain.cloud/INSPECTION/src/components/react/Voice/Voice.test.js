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
import Voice from './Voice';
import {StatusProvider} from '../context/StatusContext';

const setup = ({
  id = 'a0',
  configs = {},
  callback = {},
  muted = false
} = {}) => {
  const wrapper = (
    <StatusProvider
      value={{
        configs: configs,
        callback: callback,
        muted: muted
      }}
    >
      <Voice
        id={id}
        muted={muted}
        configs={configs}
        callback={callback}
      />
    </StatusProvider>
  );
  return wrapper;
};

describe('Voice', () => {
  it('Initialize', () => {
    let wrapper = mount(
      setup({
        configs: {},
        callback: {}
      })
    );
    expect(wrapper.props().muted).toBeFalsy();
    wrapper.unmount();
  });
  it('Muted - Unmuted', () => {
    let wrapper = mount(
      setup({
        muted: true,
        configs: {},
        callback: {}
      })
    );
    let component = wrapper.instance();
    component.componentDidUpdate();
    expect(wrapper.props().muted).toBeTruthy();
    wrapper.unmount();
  });
})
