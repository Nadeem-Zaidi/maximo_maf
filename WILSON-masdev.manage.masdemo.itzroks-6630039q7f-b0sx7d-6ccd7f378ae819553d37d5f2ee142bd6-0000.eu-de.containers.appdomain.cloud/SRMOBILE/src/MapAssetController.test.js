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
import MapAssetController from './MapAssetController';

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

describe('MapAssetController', function () {
    it('createSymbology single feature OPERATING', () => {
        let mapAssetController = new MapAssetController();
        const params = {
            features: getFeatures(1, 'OPERATING'),
            legends: mapAssetController.retrieveLegends()
        };
        let responseJson = mapAssetController.createSymbology(params);
        expect(responseJson).not.toBeNull();
    });
    it('createSymbology single feature DONE', () => {
        let mapAssetController = new MapAssetController();
        const params = {
            features: getFeatures(1, 'DONE'),
            legends: mapAssetController.retrieveLegends()
        };
        let responseJson = mapAssetController.createSymbology(params);
        expect(responseJson).not.toBeNull();
    });
    it('createSymbology many feature', () => {
        let mapAssetController = new MapAssetController();
        const params = {
            features: getFeatures(2, 'OPERATING'),
            legends: mapAssetController.retrieveLegends()
        };
        let responseJson = mapAssetController.createSymbology(params);
        expect(responseJson).not.toBeNull();
    });
});
