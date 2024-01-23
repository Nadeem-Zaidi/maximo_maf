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
import MapDatasourceController from './MapDatasourceController';

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

describe('MapDatasourceController', function () {
    it('createSymbology single feature INPRG', () => {
        let mapDatasourceController = new MapDatasourceController();
        const params = {
            legends: mapDatasourceController.retrieveLegends()
        };
        let responseJson = mapDatasourceController.createSymbology(params);
        expect(responseJson).not.toBeNull();
        expect(responseJson.legends).not.toBeNull();
    });
    it('getStatus', () => {
        let mapDatasourceController = new MapDatasourceController();
        let status = mapDatasourceController.getStatus(
            getFeatures(1, 'INPRG')[0]
        );
        expect(status).toBe('INPRG');
    });
});
