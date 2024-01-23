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

import { mount } from 'enzyme';

import FormGroup from './FormGroup';

const setup = ({items} = [], executor = {}) => {

    const wrapper = mount(
        <FormGroup
            id={'formgroup1'}
            items={items}
            executor={executor}
            />
    );
    return wrapper;
};

it('should render without errors', () => {
    const wrapper = setup();
    const container = wrapper.find('FormGroup');
    expect(container.length).toBe(1);
});

it('should render group and question', () => {
    const items = [
        {
            inspectionresultid: 1,
            executor: {}
        },
    ]
    const wrapper = setup({items});
    const inspections = wrapper.find('InspectionResult');
    expect(inspections.length).toBe(1);
});
