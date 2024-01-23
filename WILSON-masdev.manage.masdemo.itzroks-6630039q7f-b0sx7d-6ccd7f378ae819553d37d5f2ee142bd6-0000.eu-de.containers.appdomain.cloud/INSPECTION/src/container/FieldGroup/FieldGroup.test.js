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

import { ResultProvider } from '../../components/react/context/ResultContext';
import FieldGroup from './FieldGroup';

const setup = ({fields = [], inspectionResult = {}} = {}) => {

    const contextValue = {
        getNewField: () => {},
        inspResult: inspectionResult
    }

    const wrapper = mount(
        <ResultProvider value={contextValue}>
            <FieldGroup id={`fieldgroup1`} fields={fields}/>
        </ResultProvider>
    );
    return wrapper;
};

it('should render without errors', () => {
    let wrapper = setup();
    const container = wrapper.find('FieldGroup');
    expect(container.length).toBe(1);
    expect(() => {
        container.find('FieldGroup').props().fieldCompletionHandler();
    }).not.toThrow();
});

it('should render a list of InspField', () => {
    const fields = [{inspfieldid: '1'}, {inspfieldid: '2'}, {inspfieldid: '3'}]
    let wrapper = setup({fields});
    const container = wrapper.find('InspField');
    expect(container.length).toBe(3);
});

it('should found a matching response field', () => {
    const fields = [{inspfieldid: '1'}, {inspfieldid: '2'}, {inspfieldid: '3'}]
    const inspectionResult = {inspfieldresult: [{inspfieldnum: '1'},{inspfieldnum:'2'},{inspfieldnum:'3'}]};
    let wrapper = setup({fields, inspectionResult});
    const container = wrapper.find('InspField');
    expect(container.length).toBe(3);
});
