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

import AdaptiveSelectorInput from './AdaptiveSelectorInput';
import {ConfigProvider} from '../context/ConfigContext';

import {attributes as attr} from '../AdaptiveSelectorInput/SelectorUtils';

const buildOptions = (options = []) =>
  options.map((item, index) => {
    return typeof item === 'object'
      ? item
      : {
          id: `opt_${index + 1}`,
          label: '' + item,
          [attr.selected]: false,
          [attr.tagDisplay]: '' + item
        };
  });

const setup = ({
  options = [],
  selectionChangeHandler = () => {},
  singleSelect = true,
  label = '',
  displayThreshold = 5
} = {}) => {
  const wrapper = (
    <ConfigProvider
      value={{
        choiceDisplayThreshold: displayThreshold
      }}
    >
      <AdaptiveSelectorInput
        id={'adapSelector1'}
        options={options}
        selectionChangeHandler={selectionChangeHandler}
        singleSelect={singleSelect}
        label={label}
      />
    </ConfigProvider>
  );
  return wrapper;
};

it('should throw error for render without config context', () => {
  expect(() => {
    mount(
      <AdaptiveSelectorInput
        id={'adapSelector1'}
        options={[]}
        selectionChangeHandler={() => {}}
        singleSelect={true}
        label={'exception'}
      />
    );
  }).toThrow();
});

it('should render lookup', () => {
  const options = buildOptions(['a', 'b', 'c']);
  const wrapper = mount(
    setup({
      id: 'inspf1',
      options: options,
      displayThreshold: 2,
      singleSelect: false
    })
  );
  const tagGroup = wrapper.find('TagGroup');
  expect(tagGroup.length).toBe(1);
});

it('should render checkbox', () => {
  const options = buildOptions(['a', 'b', 'c']);
  const wrapper = mount(
    setup({
      id: 'inspf1',
      options: options,
      displayThreshold: 3
    })
  );
  const checkboxes = wrapper.find('Checkbox');
  expect(checkboxes.length).toBe(3);
});
