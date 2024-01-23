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
import withRequired from './withRequired';

describe('withCompletion should render', () => {
    
    let WithRequiredComponent;
    let mockedComponent;

    beforeEach(() => {
        mockedComponent = jest.fn();
        WithRequiredComponent = withRequired(mockedComponent);
    });

    it('should render without error', () => {
        const wrapper = shallow(<WithRequiredComponent/>);
        expect(wrapper.find(mockedComponent.name).length).toBe(1);
    });

    it('should provide register for member and change callback', () => {
        const wrapper = shallow(<WithRequiredComponent/>);
        expect(wrapper.props()).toEqual(
            expect.objectContaining({
                registerRequiredChangeCallback: expect.any(Function),
                registerRequiredInstance: expect.any(Function),
            }),
        );
    })

    it('should invoke changeHandler after mutating state', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithRequiredComponent/>);
        wrapper.props().registerRequiredChangeCallback(mockCallBack);

        wrapper.props().setRequired(true);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    })

    it('should mutate instance attribute', () => {
        const member = {};
        const wrapper = shallow(<WithRequiredComponent/>);

        wrapper.props().registerRequiredInstance(member);
        wrapper.props().setRequired(true);

        expect(member).toHaveProperty('required', true);
        expect(wrapper.props().isRequired).toBe(true);
    });

    it('should not invoke notification function when setting same value', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithRequiredComponent/>);
        wrapper.props().registerRequiredChangeCallback(mockCallBack);

        wrapper.props().setRequired(true);
        wrapper.props().setRequired(true);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    });

    it('should have a display name', () => {
        const expected = expect.stringMatching(/^WithRequired/);
        expect(WithRequiredComponent.displayName).toEqual(expected);
    });

});
