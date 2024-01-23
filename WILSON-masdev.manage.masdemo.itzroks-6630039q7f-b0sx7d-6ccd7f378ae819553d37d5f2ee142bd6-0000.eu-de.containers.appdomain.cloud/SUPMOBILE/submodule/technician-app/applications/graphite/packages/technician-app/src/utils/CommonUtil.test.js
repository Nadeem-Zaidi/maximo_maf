/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import CommonUtil from './CommonUtil';

let systemProp = {
    "maximo.mobile.completestatus": "COMP",
    "maximo.mobile.statusforphysicalsignature": "COMP,CAN",
    "maximo.mobile.useTimer": "1",
    "maximo.mobile.radius": "0"
}

describe('CommonUtil', () => {
    it('verify getSystemProp called', async () => {
        let app = {
            state: {
                systemProp: systemProp
            }
        };
        let propValue = await CommonUtil.getSystemProp(app, 'maximo.mobile.completestatus');
        expect(propValue).toBe('COMP');
    });

    it('verify checkSystemProp called', async () => {
        let app = {
            state: {
                systemProp: systemProp
            }
        };
        let propValueTrue = await CommonUtil.checkSystemProp(app, 'maximo.mobile.useTimer');
        expect(propValueTrue).toBe(true);
        let propValueFalse = await CommonUtil.checkSystemProp(app, 'maximo.mobile.radius');
        expect(propValueFalse).toBe(false);
    });

    it('verify checkSysPropArrExist called with return type false', async () => {
        let app = {
            state: {
                systemProp: systemProp
            }
        };
        let propValuePositive = await CommonUtil.checkSysPropArrExist(app, 'maximo.mobile.statusforphysicalsignature', 'CAN', false);
        expect(propValuePositive).toBe(1);
        let propValueNagative = await CommonUtil.checkSysPropArrExist(app, 'maximo.mobile.statusforphysicalsignature', 'INPR', false);
        expect(propValueNagative).toBe(0);
        let propValueTrue = await CommonUtil.checkSysPropArrExist(app, 'maximo.mobile.statusforphysicalsignature', 'CAN', true);
        expect(propValueTrue).toBe(true);
    });
});
