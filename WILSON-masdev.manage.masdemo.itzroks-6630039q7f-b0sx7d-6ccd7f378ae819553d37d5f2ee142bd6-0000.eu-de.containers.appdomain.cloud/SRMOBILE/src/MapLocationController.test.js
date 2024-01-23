/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2021, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/* eslint-disable max-lines */
/* eslint-disable no-process-env */

// NOTE: this allows test failures to show real line numbers
import MapLocationController from './MapLocationController';

function getFeatures(count, status) {
    let features = [];
    for (let i = 0; i < count; i++) {
        let feature = {
            get: (attr) => {
                return {
                    status: status
                };
            }
        };
        features.push(feature);
    }
    return features;
}

describe('MapLocationController', function () {
    it('createSymbology many feature', () => {
        let mapLocationController = new MapLocationController();
        const params = {
            features: getFeatures(2, 'INPRG'),
            legends: mapLocationController.retrieveLegends()
        };
        let responseJson = mapLocationController.createSymbology(params);
        expect(responseJson).not.toBeNull();
    });
    it('createSymbology single feature OPERATING', () => {
        let mapLocationController = new MapLocationController();
        const params = {
            features: getFeatures(1, 'OPERATING'),
            legends: mapLocationController.retrieveLegends()
        };
        let responseJson = mapLocationController.createSymbology(params);
        expect(responseJson).not.toBeNull();
    });
    it('createSymbology single feature DONE', () => {
        let mapLocationController = new MapLocationController();
        const params = {
            features: getFeatures(1, 'DONE'),
            legends: mapLocationController.retrieveLegends()
        };
        let responseJson = mapLocationController.createSymbology(params);
        expect(responseJson).not.toBeNull();
    });
});
