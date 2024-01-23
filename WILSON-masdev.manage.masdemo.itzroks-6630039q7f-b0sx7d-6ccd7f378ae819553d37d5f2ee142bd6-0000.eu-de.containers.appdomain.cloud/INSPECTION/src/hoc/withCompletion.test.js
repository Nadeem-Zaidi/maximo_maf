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
import withCompletion from './withCompletion';

describe('withCompletion should render', () => {
    let WithCompletionComponent;
    let mockedComponent;
    beforeEach(() => {
      mockedComponent = jest.fn();
      WithCompletionComponent = withCompletion(mockedComponent);
    });

    it('should render without error', () => {
        const wrapper = shallow(<WithCompletionComponent/>);
        expect(wrapper.find(mockedComponent.name).length).toBe(1);
    });

    it('should provide register for member and change callback', () => {
        const wrapper = shallow(<WithCompletionComponent/>);
        expect(wrapper.props()).toEqual(
            expect.objectContaining({
                registerChangeHandler: expect.any(Function),
                registerInstance: expect.any(Function),
            }),
        );
    });

    it('should invoke changeHandler after mutating state', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithCompletionComponent/>);
        wrapper.props().registerChangeHandler(mockCallBack);

        wrapper.props().setCompletion(true);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    })

    it('should mutate instance attribute', () => {
        const member = {};
        const wrapper = shallow(<WithCompletionComponent/>);

        wrapper.props().registerInstance(member);
        wrapper.props().setCompletion(true);

        expect(member).toHaveProperty('completed', true);
        expect(wrapper.props().isComplete).toBe(true);
    });

    it('should not invoke notification function when setting same value', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<WithCompletionComponent/>);
        wrapper.props().registerChangeHandler(mockCallBack);

        wrapper.props().setCompletion(true);
        wrapper.props().setCompletion(true);

        expect(mockCallBack.mock.calls).toHaveLength(1);
    });

    it('should have a display name', () => {
        const expected = expect.stringMatching(/^WithCompletion/);
        expect(WithCompletionComponent.displayName).toEqual(expected);
    });

});
