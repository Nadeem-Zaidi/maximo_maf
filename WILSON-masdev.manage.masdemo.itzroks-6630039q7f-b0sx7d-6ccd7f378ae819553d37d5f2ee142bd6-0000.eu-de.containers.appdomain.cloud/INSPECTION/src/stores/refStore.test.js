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
import refStore from './refStore';

it('should state what it is on an output', () => {
    expect(refStore.toString()).toContain('Ref store');
});

it('should provide react refs', () => {
    const spy = jest.spyOn(React, 'createRef');

    const qRef = refStore.getQuestionRef(1, true);
    refStore.getInspectionRef(2, true);

    expect(qRef).toHaveProperty('current');
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
});

it('should not duplicate refs', () => {
    const inspRef = refStore.getInspectionRef(3, true);
    const inspRef2 = refStore.getInspectionRef(3);

    expect(inspRef).toBe(inspRef2);

    const qRef = refStore.getQuestionRef(2, true);
    const qRef2 = refStore.getQuestionRef(2);

    expect(qRef).toBe(qRef2);
});

it('should remove refs', () => {
    let successRemoval;
    
    successRemoval = refStore.removeQuestionRef(1);
    expect(successRemoval).toBeTruthy();

    successRemoval = refStore.removeInspectionRef(2);
    expect(successRemoval).toBeTruthy();

    successRemoval = refStore.removeQuestionRef(10);
    expect(successRemoval).toBeFalsy();

    refStore.getInspFieldResultRef(3, true);
    successRemoval = refStore.removeInspFieldResultRef();
    expect(successRemoval).toBeFalsy();

});
