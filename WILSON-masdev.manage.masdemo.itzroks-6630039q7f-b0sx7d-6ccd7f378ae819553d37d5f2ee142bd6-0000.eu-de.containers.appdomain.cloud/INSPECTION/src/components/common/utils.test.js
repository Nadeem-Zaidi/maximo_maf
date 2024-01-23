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

import { isGroupQuestion, getSelectSlice, respectiveClosingBracketIndex, resetFiltered, getMergedDateTimeValue, getInspFieldDS, createInspFieldDS, checkRejection, filterValidChildren, checkCompletion } from './utils';

describe('isGroupQuestion function', () => {

    it('should throw error when no input passed', () => {
        expect(() => isGroupQuestion()).toThrowError('You must provide an object.');
    });

    it('should identify input as non-group', () => {
        const response = isGroupQuestion({});
        expect(response).toBe(false);
    });

    it('should identify object input as non-group', () => {
        const response = isGroupQuestion({ inspquestionchild: '' });
        expect(response).toBe(true);
    });

});

describe('getSelectSlice function', () => {

    it('should return null when null provided', () => {
        expect(getSelectSlice(null, null)).toBe(null);
    });

    it('should return parameter when no match', () => {
        const response = getSelectSlice('test1,test2', 'test3');
        expect(response).toBe('test1,test2');
    });

    it('should get only string if no attributes provided', () => {
        const response = getSelectSlice('test1,test2', 'test1');
        expect(response).toBe('test1');
    });

    it('should get attributes along with string', () => {
        const response = getSelectSlice('attr1,field{att2,attr3},attr4', 'field');
        expect(response).toBe('field{att2,attr3}');
    });

    it('should get attributes correctly inside multiple brackets', () => {
        const response = getSelectSlice('attr1,field{att2{attr3{attr4}}attr5},attr4', 'field');
        expect(response).toBe('field{att2{attr3{attr4}}attr5}');
    });

});

describe('respectiveClosingBracketIndex function', () => {

    it('should get index correctly inside multiple brackets', () => {
        const index = respectiveClosingBracketIndex('attr1,field{att2{attr3{attr4}}attr5},attr4', 12);
        expect(index).toBe(30);
    });

});

it('resetFiltered should change filtered to true', () => {
    let item = { filtered: true };
    resetFiltered(item);
    expect(item.filtered).toBeTruthy();

    item = { filtered: false };
    resetFiltered(item);
    expect(item.filtered).toBeTruthy();

    item = { filtered: undefined };
    resetFiltered(item);
    expect(item.filtered).toBeTruthy();

    item = {};
    resetFiltered(item);
    expect(item.filtered).toBeTruthy();

    //shoul run without errors
    resetFiltered();
});

it('getMergedDateTimeValue should return date part from dateresponse and time part from timeresponse', () => {
    const dateresponse = '2021-08-08T00:00:00-03:00';
    const timeresponse = '1970-01-01T11:00:00-03:00';
    const mergedDateTimeValue = getMergedDateTimeValue(dateresponse, timeresponse);
    expect(mergedDateTimeValue).toBe('2021-08-08T11:00:00-03:00');
})

it('getChildDatasource ', async () => {
    let ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: false
                    }
                }
            }
        },
        items: [{ href: 'test' }],

        getChildDatasource: () => {
            return {
                state: { test: 'test' },
                getSchema: () => { },
                load: () => { },
                initializeQbe: () => { }
            }
        },
        getSchema: () => true

    }

    let temp = await getInspFieldDS(ds);
    expect(temp).not.toBe(undefined);
    expect(temp.state.idAttribute).toBe('href');


    ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: true
                    }
                }
            }
        },
        items: [{ href: 'test' }],

        getChildDatasource: () => {
            return {
                state: { test: 'test' },
                getSchema: () => { },
                load: () => { },
                initializeQbe: () => { }
            }
        }

    }
    temp = null;
    temp = await getInspFieldDS(ds);
    expect(temp).not.toBe(undefined);


    ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: true
                    }
                }
            }
        },

        getChildDatasource: async () => {
            return {
                state: {
                    test: 'test'
                },
                name: 'testds',
                getSchema: () => { },
                initializeQbe: () => { }
            }
        }

    }
    temp = null;
    temp = await getInspFieldDS(ds);
    expect(temp).toBe(undefined);
})


it('createInspFieldDS ', async () => {
    let ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: false
                    }
                }
            }
        },
        items: [{ href: 'test' }],
        childDatasources: {},
        getChildDatasource: async () => {
            return {
                state: {
                    test: 'test'
                },
                name: 'testds',
                getSchema: () => { },
                initializeQbe: () => { },
                dataAdapter: {
                    options: {
                        response: {
                            member: [{ i: 1 }, { i: 2 }, { i: 3 }, { i: 4 }]
                        }
                    }
                },
                dataWindows: {},
                setItems: (items) => { ds.items = items },
                itemInstrumenter: () => { },
            }
        }

    }

    let temp = await getInspFieldDS(ds);
    expect(temp).not.toBe(undefined);
    expect(temp.state.idAttribute).toBe('href');



    ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: false
                    }
                }
            }
        },
        items: [{ href: 'test' }],
        childDatasources: {},
        getChildDatasource: async () => {
            return {
                state: {
                    test: 'test'
                },
                name: 'testds',
                getSchema: () => { },
                initializeQbe: () => { },
                dataAdapter: {
                    options: {
                        response: {
                            member: [{ i: 1 }, { i: 2 }, { i: 3 }, { i: 4 }]
                        }
                    }
                },
                dataWindows: {},
                setItems: (items) => { ds.items = items },
                itemInstrumenter: () => { },
                items: [],
                load: () => { }
            }
        }

    }

    temp = await getInspFieldDS(ds, true);
    expect(temp).not.toBe(undefined);
    expect(temp.state.idAttribute).toBe('href');


    ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: true
                    }
                }
            }
        },
        items: [{ href: 'test' }],
        childDatasources: {},
        get: () => { },
        getChildDatasource: async () => {
            return {
                state: {
                    test: 'test'
                },
                getSchema: () => { },
                load: () => { },
                initializeQbe: () => { },
                name: 'testds',
                dataAdapter: {
                    options: {
                        response: {
                            member: [{ i: 1 }, { i: 2 }, { i: 3 }, { i: 4 }]
                        }
                    }
                },
                dataWindows: {},
                setItems: (items) => { ds.items = items },
                itemInstrumenter: () => { },
                items: []
            }
        }

    }
    temp = null;
    temp = await createInspFieldDS(ds, true);
    expect(temp).not.toBe(undefined);


    ds = {
        options: {
            query: {
                select: 'test'
            },
            appResolver: () => {
                return {
                    device: {
                        isMobile: true
                    }
                }
            }
        },
        childDatasources: {},

        getChildDatasource: async () => {
            return {
                state: {
                    test: 'test'
                },
                name: 'testds',
                getSchema: () => { },
                initializeQbe: () => { }
            }
        }

    }
    temp = null;
    temp = await getInspFieldDS(ds);
    expect(temp).toBe(undefined);
})


it('filterValidChildren', () => {
    expect(filterValidChildren([]).length).toBe(0);
    expect(filterValidChildren([{ visible: true, required: true }]).length).toBe(1);
})

it('checkCompletion', () => {
    expect(checkCompletion([])).toBe(false);
    expect(checkCompletion([{ visible: true, required: true, completed: true }])).toBe(true);
    expect(checkCompletion([{ visible: true, required: true }])).toBe(false);
})



it('checkRejection', () => {
    expect(checkRejection([])).toBe(false);
    expect(checkRejection([{ visible: true, required: true, rejected: true }])).toBe(true);
    expect(checkRejection([{ visible: true, required: true }])).toBe(false);
})