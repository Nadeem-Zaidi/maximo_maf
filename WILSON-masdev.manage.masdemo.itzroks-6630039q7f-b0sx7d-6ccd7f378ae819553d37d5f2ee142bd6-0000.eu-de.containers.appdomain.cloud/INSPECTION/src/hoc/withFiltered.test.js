/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import React from 'react';
import { shallow } from 'enzyme';
import withFiltered from './withFiltered';

describe('withFiltered should render', () => {
    
    let WithFilteredComponent;
    let mockedComponent;

    beforeEach(() => {
        mockedComponent = jest.fn();
        WithFilteredComponent = withFiltered(mockedComponent);
    });

    it('should render without error', () => {
        const wrapper = shallow(<WithFilteredComponent/>);
        expect(wrapper.find(mockedComponent.name).length).toBe(1);
    });

    it('should provide register for member and change callback', () => {
        const wrapper = shallow(<WithFilteredComponent/>);
        expect(wrapper.props()).toEqual(
            expect.objectContaining({
                registerFilteredChangeCallback: expect.any(Function),
                registerFilteredInstance: expect.any(Function),
            }),
        );
    })

    it('should invoke changeHandler after mutating state', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithFilteredComponent/>);
        wrapper.props().registerFilteredChangeCallback(mockCallBack);

        wrapper.props().setFiltered(false);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    })

    it('should mutate instance attribute', () => {
        const member = {};
        const wrapper = shallow(<WithFilteredComponent/>);

        wrapper.props().registerFilteredInstance(member);
        wrapper.props().setFiltered(false);

        expect(member).toHaveProperty('filtered', false);
        expect(wrapper.props().isFiltered).toBe(false);
    });

    it('should not invoke notification function when setting same value', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithFilteredComponent/>);
        wrapper.props().registerFilteredChangeCallback(mockCallBack);

        wrapper.props().setFiltered(false);
        wrapper.props().setFiltered(false);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    });

    it('should have a display name', () => {
        const expected = expect.stringMatching(/^WithFiltered/);
        expect(WithFilteredComponent.displayName).toEqual(expected);
    });

});
