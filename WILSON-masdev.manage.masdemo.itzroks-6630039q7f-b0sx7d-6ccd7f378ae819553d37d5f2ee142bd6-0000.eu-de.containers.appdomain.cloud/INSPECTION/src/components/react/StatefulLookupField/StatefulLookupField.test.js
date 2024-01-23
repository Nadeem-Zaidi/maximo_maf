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

import * as mxJSAPI from '@maximo/maximo-js-api';

import * as StatefulLookup from './StatefulLookupField';

import * as SelectorUtils from '../AdaptiveSelectorInput/SelectorUtils';

const attr = SelectorUtils.attributes;
const {default: StatefulLookupField, SelectModeEnum} = StatefulLookup;
const {wait} = mxJSAPI;

const buildOptions = (options = []) =>
  options.map((item, index) => {
    return typeof item === 'object'
      ? item
      : {
          id: item,
          value:item,
          label: '' + item,
          [attr.selected]: false,
          [attr.tagDisplay]: '' + item
        };
  });

const setup = ({
  options = [],
  onChange = () => {},
  readonly = false,
  selectionMode = SelectModeEnum.SINGLE
} = {}) => {
  const wrapper = (
    <StatefulLookupField
      id={'lu1'}
      options={options}
      onChange={onChange}
      selectionMode={selectionMode}
      readonly={readonly}
    />
  );
  return wrapper;
};

it('should render lookup button', () => {
  const options = [];
  const wrapper = mount(setup({options}));
  const button = wrapper.find('button')
  button.simulate('click');
  expect(button.length).toBe(1);
});

it('should disable selector button for readonly field', () => {
  const wrapper = mount(setup({readonly: true}));
  const button = wrapper.find('button');
  const isDisabled = button.getDOMNode().disabled;
  
  expect(button.length).toBe(1);
  expect(isDisabled).toBeTruthy();
});

it('should use callback to report whenever option is selected', async () => {
  const mockCallBack = jest.fn();
  const options = buildOptions(['f' ,'c', 'e', 'b','a', 'd']);
  options[1][attr.selected] = true;
  const wrapper = mount(
    setup({
      options,
      selectionMode: SelectModeEnum.MULTIPLE,
      onChange: mockCallBack
    })
  );
  await wait(200);
  options[0][attr.selected] = true;
  wrapper.find('StatefulLookupField').instance().itemClick(options[0]);
  expect(mockCallBack.mock.calls).toHaveLength(1);
});
