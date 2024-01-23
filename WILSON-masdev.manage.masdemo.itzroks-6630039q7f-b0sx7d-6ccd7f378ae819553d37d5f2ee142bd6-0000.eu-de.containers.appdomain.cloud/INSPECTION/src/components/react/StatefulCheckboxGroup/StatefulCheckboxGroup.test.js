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

import { mount, shallow } from 'enzyme';

import StatefulCheckboxGroup from './StatefulCheckboxGroup';

const buildOptions = (options = []) => options.map((item, index) => {
    return typeof item === 'object' ? item : ({id: String(index+1), label: String(item)});
});

const setup = ({options = [], onChange} = {}) => {

    const formalOptions = buildOptions(options);

    const wrapper = mount(
        <StatefulCheckboxGroup 
            id={'cb1'} 
            initialOptions={formalOptions} 
            onChange={onChange}
            singleSelect={true}
            />
    );
    return wrapper;
};
it('should have default onChange', () => {
    const options = [
        {checked: false, id: 'cx1', label: 'Checkbox label 1', deselectAction: true}
    ];
    let wrapper = mount(<StatefulCheckboxGroup initialOptions={options}/>);
    let input = wrapper.find('input').first();

    //calls default onChange - if it does not fail, it called default onChange with success
    input.simulate('change', {target: {checked: true}});
});

it('should render without errors', () => {
    let wrapper = shallow(<StatefulCheckboxGroup id={'cb1'}/>);
    const container = wrapper.find('StatefulCheckboxGroup');
    expect(container.length).toBe(1);

});

it('should render checkbox options', () => {
    const options = [1,2,3];
    const wrapper = setup({options});
    const cbOptions = wrapper.find('input');
    expect(cbOptions.length).toBe(3);
});

it('should render updated checkbox options', () => {
    const options = [1,2,3];
    const wrapper = setup({options});

    const newOptions = buildOptions(['a', 'b', 'c', 'd']);
    wrapper.setProps({initialOptions: newOptions});
    wrapper.update();

    const cbOptions = wrapper.find('input');
    expect(cbOptions.length).toBe(4);
});

it('should receive event after selection', () => {

    const mockCallBack = jest.fn();
    const options = [1,2];
    const wrapper = setup({options, onChange: mockCallBack});

    const firstInput = wrapper.find('input').first();

    firstInput.simulate('change', {target: {checked: true}});

    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockCallBack.mock.calls[0][0].checked).toBe(true);

});

it('should receive event after deselection', () => {
    const mockCallBack = jest.fn();
    const options = [{id: '1', label: '1', checked: true},2];
    const wrapper = setup({options, onChange: mockCallBack});

    const firstInput = wrapper.find('input').first();

    firstInput.simulate('change', {target: {checked: false}});

    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockCallBack.mock.calls[0][0].checked).toBe(false);

});

it('single select - should receive events after selection update', () => {
    const mockCallBack = jest.fn();
    const options = [{id: '2', label: '2', value:'2'}, {id: '1', label: '1', checked: true, value:'1'}];
    const wrapper = setup({options, onChange: mockCallBack});

    const secondInput = wrapper.find('input').at(1);

    secondInput.simulate('change', {target: {checked: true}});

    expect(mockCallBack.mock.calls.length).toBe(1);    
    expect(mockCallBack.mock.calls[0][0].checked).toBe(true);
});
