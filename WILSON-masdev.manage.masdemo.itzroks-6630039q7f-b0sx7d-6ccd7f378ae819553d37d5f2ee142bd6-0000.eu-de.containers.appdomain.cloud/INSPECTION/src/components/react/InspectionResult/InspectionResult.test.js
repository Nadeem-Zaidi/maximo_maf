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
import InspectionResult from './InspectionResult';
import refStore from '../../../stores/refStore';

const setup = ({inspection, updateDS, executor = {}, showInfo} = {}) => {

    const wrapper = mount(
        <InspectionResult id={`inspectionResult1`} 
            inspection={inspection} updateDS={updateDS} 
            executor={executor} showInfo={showInfo} />
    );
    return wrapper;
};

it('should render without errors', () => {
    let wrapper = setup();
    const container = wrapper.find('InspectionResult');
    expect(container.length).toBe(1);

    expect(() => container.props().updateDS()).not.toThrow();
});

it('should throw error when no executor provided', () => {
    expect(() => setup({executor: null})).toThrowError()
});

it('should save after update', () => {

    const inspection = {};
    const mockCallback = jest.fn();
    const wrapper = setup({inspection, updateDS: mockCallback});

    const container = wrapper.find('InspectionResult');
    container.instance().updateResponse({});

    expect(mockCallback.mock.calls.length).toBe(1);
});

it('should prevent duplicate entry based on inspfieldnum', () => {

    const inspection = {};
    const mockCallback = jest.fn();
    const wrapper = setup({inspection, updateDS: mockCallback});

    const container = wrapper.find('InspectionResult');
    const instance = container.instance();
    instance.updateResponse({inspfieldnum: 1});
    instance.updateResponse({inspfieldnum: 1});

    expect(mockCallback.mock.calls.length).toBe(2);
});

describe('getNewField - test method that generates field result templates', () => {

    let instance;

    beforeEach(() => {
        const wrapper = setup({inspection: {
            inspformnum: 'FORM001',
            revision: 1,
            resultnum: 'RES001',
            orgid: 'ORG1',
            siteid: 'SIT1',
        }});
        const container = wrapper.find('InspectionResult');
        instance = container.instance();
    });

    it('should provide a function', () => {
        const response = instance.getNewField();
        expect(typeof response).toBe('function');
    });

    it('should throw error when no parameters provided', () => {
        const setField = instance.getNewField();
        expect(() => { setField()}).toThrowError();
    });

    it('should get object when parameters provided', () => {
        const setField = instance.getNewField();
        expect(setField('1','1')).toEqual(
            expect.objectContaining({
                inspfieldnum: '1',
                inspquestionnum: '1',
            }),
        );
    });

});

describe('getShowInfo - test closure that holds inspection details', () => {

    let instance;
    const mockCallback = jest.fn();

    beforeEach(() => {
        const wrapper = setup({showInfo: mockCallback});
        const container = wrapper.find('InspectionResult');
        instance = container.instance();
    });

    it('should provide a function', () => {
        const response = instance.getShowInfo();
        expect(typeof response).toBe('function');
    });

    it('should get object when parameters provided', () => {
        const showInfo = instance.getShowInfo();
        showInfo();
        expect(mockCallback.mock.calls[0].length).toBe(1);
    });

})


describe('test form title', () => {
    let wrapper, container;
    
    it('should have no title', () => {
        wrapper = setup();
        container = wrapper.find('Label');
        expect(container.text()).toEqual('');
    });

    it('should contain asset details in title', () => {
        wrapper = setup({
            inspection: {
                assets: [{ assetnum: 100123 }]
            }
        });
        container = wrapper.find('Label');
        expect(container.text()).toEqual('100123');
    });

    it('should contain location details in title', () => {
        wrapper = setup({
            inspection: {
                locations: [{ location: 'LOC001', description: 'warehouse' }]
            }
        });
        container = wrapper.find('Label');
        expect(container.text()).toEqual('LOC001 warehouse');
    });

    it('should take asset precedent over location in title', () => {
        wrapper = setup({
            inspection: {
                locations: [{ location: 'LOC001', description: 'warehouse' }],
                assets: [
                    {
                    assetnum: 'PMP991',
                    description: 'Water Pump 00991'
                    },
                ]     
            }
        });
        container = wrapper.find('Label');
        expect(container.text()).toEqual('PMP991 Water Pump 00991');
    });
});

describe('Manage inspection ref', () => {
  let wrapper;
  let getSpy;
  let removeSpy;

  beforeAll(() => {
    getSpy = jest.spyOn(refStore, 'getInspectionRef');
    removeSpy = jest.spyOn(refStore, 'removeInspectionRef');
    wrapper = setup();
  });

  afterAll(() => {
    getSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should unregister itself at unmount', () => {
    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalled();
  });
});
