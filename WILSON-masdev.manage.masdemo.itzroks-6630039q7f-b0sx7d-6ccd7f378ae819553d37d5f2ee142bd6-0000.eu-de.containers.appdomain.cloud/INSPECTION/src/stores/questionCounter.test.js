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

import { log } from '@maximo/maximo-js-api';
import questionCounter from './questionCounter';
import sinon from 'sinon';

// import * as sinon from 'sinon';

let clock;
const fooFn = jest.fn();

const setup = () => questionCounter.callbackRegister(fooFn);


beforeEach(() => {
    clock = sinon.useFakeTimers();
});

afterEach(() => {
    clock.restore();
    jest.clearAllMocks();
});

// Order of tests matter
it('should log error when invalid callback provided', () => {
    let logErrorSpy = jest.spyOn(log, 'e');

    questionCounter.callbackRegister();
    questionCounter.callbackRegister({});

    expect(logErrorSpy).toHaveBeenCalledTimes(2);
    expect(logErrorSpy.mock.calls[0][1]).toBe('Callback must be a valid function.');
});

// Order of tests matter
it('should log error after update when no callback', () => {
    let logErrorSpy = jest.spyOn(log, 'e');

    questionCounter.update(1, {visible: true, required: true, complete: false});

    expect(logErrorSpy).toHaveBeenCalled();
    expect(logErrorSpy.mock.calls[0][1]).toBe('No callback registered yet.');
});

// Order of tests matter
it('should register a single callback reference ', () => {
    setup();
    const barFn = jest.fn();
    questionCounter.callbackRegister(barFn);

    questionCounter.update(1, {visible: true, required: false, complete: false});
    clock.tick(500);

    expect(fooFn).toHaveBeenCalledTimes(1);
    expect(barFn).toHaveBeenCalledTimes(0);
});

// Order of tests matter
it('should contain attributes in response object', () => {
    setup();
    questionCounter.update(1, {visible: true, required: true, complete: false});
    clock.tick(500);
    expect(fooFn.mock.calls[0][0]).toEqual(
        expect.objectContaining({
            completedCount: expect.any(Number),
            totalCount: expect.any(Number),
            requiredCompletedCount: expect.any(Number),
            requiredTotalCount: expect.any(Number),
        }),
    );
});

// Order of tests matter
it('should remove map reference', () => {
    setup();
    questionCounter.remove(1);
    clock.tick(500);
    expect(fooFn).toHaveBeenCalledTimes(1);
});

// Order of tests matter
it('should discard not visible items', () => {
    setup();
    questionCounter.update(1, {visible: false, required: false, complete: false});
    clock.tick(500);
    expect(fooFn).toHaveBeenCalledTimes(0);
});

// Order of tests matter
it('should notify the sum of required and regular', () => {
    setup();
    questionCounter.update(1, {visible: true, required: false, complete: false});
    questionCounter.update(2, {visible: true, required: true, complete: false});
    questionCounter.update(3, {visible: true, required: true, complete: true});
    clock.tick(500);

    expect(fooFn).toHaveBeenCalledTimes(1);
    expect(fooFn.mock.calls[0][0]).toHaveProperty('completedCount', 1);
    expect(fooFn.mock.calls[0][0]).toHaveProperty('totalCount', 3);
    expect(fooFn.mock.calls[0][0]).toHaveProperty('requiredTotalCount', 2);
});



// Order of tests matter
it('should not invoke callback when no changes identified', () => {
    setup();
    questionCounter.remove(1);
    questionCounter.update(4, {visible: true, required: false, complete: false});
    expect(fooFn).toHaveBeenCalledTimes(0);
});

// it('should provide react refs', () => {
//     const spy = jest.spyOn(React, 'createRef');

//     const qRef = refStore.getQuestionRef(1, true);
//     refStore.getInspectionRef(2, true);

//     expect(qRef).toHaveProperty('current');
//     expect(spy).toHaveBeenCalledTimes(2);

//     spy.mockRestore();
// });

// it('should not duplicate refs', () => {
//     const inspRef = refStore.getInspectionRef(3, true);
//     const inspRef2 = refStore.getInspectionRef(3);

//     expect(inspRef).toBe(inspRef2);

//     const qRef = refStore.getQuestionRef(2, true);
//     const qRef2 = refStore.getQuestionRef(2);

//     expect(qRef).toBe(qRef2);
// });

// it('should remove refs', () => {
//     let successRemoval;
    
//     successRemoval = refStore.removeQuestionRef(1);
//     expect(successRemoval).toBeTruthy();

//     successRemoval = refStore.removeInspectionRef(2);
//     expect(successRemoval).toBeTruthy();

//     successRemoval = refStore.removeQuestionRef(10);
//     expect(successRemoval).toBeFalsy();
// });
