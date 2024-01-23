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

class MapDatasourceController {
    getStatus(feature) {
        let status = '';
        let maximoAttributes = feature.get('maximoAttributes');
        // istanbul ignore else
        if (maximoAttributes && maximoAttributes.status) {
            status = maximoAttributes.status;
        }
        return status;
    }
    retrieveLegends() {
        return {};
    }
    createSymbology(params) {
        return Object.assign({}, params);
    }
}

export default MapDatasourceController;
