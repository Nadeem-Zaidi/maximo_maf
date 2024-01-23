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

import { mount } from 'enzyme'
import DisplayResults from './DisplayResults';

const setup = ({items, updateDS} = {}) => {

    const wrapper = mount(
        <DisplayResults id={`displayResults`} 
            updateDS={updateDS} 
            results={items} />
    );
    return wrapper;
};

it('should render without errors', () => {
    let wrapper = setup();
    const container = wrapper.find('DisplayResults');
    expect(container.length).toBe(1);

    expect(() => container.props().updateDS()).not.toThrow();
});


it('should invoke updateDS when click on any button', () => {

    const items = [
        {
            inspfieldresultid: 1,
            txtresponse: 'vini'
        }
    ];
    const mockCallback = jest.fn();
    const wrapper = setup({items, updateDS: mockCallback});

    const container = wrapper.find('DisplayResults');
    const button = container.find(`button`).first();

    button.simulate('click');

    expect(mockCallback.mock.calls.length).toBe(1);
});
