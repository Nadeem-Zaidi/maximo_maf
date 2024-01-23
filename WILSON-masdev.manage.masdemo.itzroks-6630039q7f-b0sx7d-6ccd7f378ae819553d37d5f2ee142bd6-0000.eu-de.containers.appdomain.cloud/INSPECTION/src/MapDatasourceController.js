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

import {AssetSymbols, LocationSymbols} from './maps/MapUtils';
const POINT_PROPS = {
  color: '',
  offsetx: 10,
  offsety: 40,
  width: 48,
  height: 40
};
const LINE_PROPS = {
  color: 5,
  width: 5
};
const POLYGON_PROPS = {
  color: 5,
  width: 5,
  fillcolor: '#C0C0C0'
};

const SYMBOLOGY_PROPS = {
    point: POINT_PROPS,
    linestring: LINE_PROPS,
    polygon: POLYGON_PROPS,
    multilinestring: LINE_PROPS,
    multipolygon: POLYGON_PROPS
};

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

  retrieveLocationLegends() {
    const legends = Object.assign(LocationSymbols);
        return legends;
    }

    retrieveAssetLegends() {
      const legends = Object.assign(AssetSymbols);
      return legends;
    }

    createSymbology(params) {
        let features = params.features;
        const legends = params.legends;
        let legend = {};

        let geometryType;
        // Is a Cluster
        if (features.length > 1) {
            legend = legends['CLUSTER'];
            geometryType = 'point';
        } else {
            const feature = features[0];
            geometryType = feature
                .get('geometry')
                .constructor.name.toLowerCase();
            // Just a single feature
            let status = this.getStatus(features[0]);
            //istanbul ignore next
            if (geometryType === 'point') {
                if (status.toUpperCase() === 'OPERATING') {
                    legend = legends['OPERATING'];
                } else {
                    legend = legends['OTHERS'];
                }
            }
        }
        const symbologyProps = SYMBOLOGY_PROPS[geometryType];
        let symbol = Object.assign({}, legend);

        if (symbologyProps) {
            symbologyProps.type = geometryType;
            symbol = Object.assign(legend, symbologyProps);
        }
        return symbol;
    }
}

export default MapDatasourceController;
