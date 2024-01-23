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
import withVisible from './withVisible';

describe('withCompletion should render', () => {
    
    let WithVisibleComponent;
    let mockedComponent;

    beforeEach(() => {
        mockedComponent = jest.fn();
        WithVisibleComponent = withVisible(mockedComponent);
    });

    it('should render without error', () => {
        const wrapper = shallow(<WithVisibleComponent/>);
        expect(wrapper.find(mockedComponent.name).length).toBe(1);
    });

    it('should provide register for member and change callback', () => {
        const wrapper = shallow(<WithVisibleComponent/>);
        expect(wrapper.props()).toEqual(
            expect.objectContaining({
                registerVisibleChangeCallback: expect.any(Function),
                registerVisibleInstance: expect.any(Function),
            }),
        );
    })

    it('should invoke changeHandler after mutating state', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithVisibleComponent/>);
        wrapper.props().registerVisibleChangeCallback(mockCallBack);

        wrapper.props().setVisible(false);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    })

    it('should mutate instance attribute', () => {
        const member = {};
        const wrapper = shallow(<WithVisibleComponent/>);

        wrapper.props().registerVisibleInstance(member);
        wrapper.props().setVisible(false);

        expect(member).toHaveProperty('visible', false);
        expect(wrapper.props().isVisible).toBe(false);
    });

    it('should not invoke notification function when setting same value', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithVisibleComponent/>);
        wrapper.props().registerVisibleChangeCallback(mockCallBack);

        wrapper.props().setVisible(false);
        wrapper.props().setVisible(false);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    });

    it('should have a display name', () => {
        const expected = expect.stringMatching(/^WithVisible/);
        expect(WithVisibleComponent.displayName).toEqual(expected);
    });

});
