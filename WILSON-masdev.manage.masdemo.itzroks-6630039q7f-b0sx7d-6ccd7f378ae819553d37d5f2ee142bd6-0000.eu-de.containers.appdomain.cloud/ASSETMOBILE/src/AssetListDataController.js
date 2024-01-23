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


const POINT_PROPS = {
  color: '',
  offsetx: 12,
  offsety: 43,
  width: 64,
  height: 64,
  text: {
    offsetXPercentage: 0.31,
    offsetYPercentage: 0.15,
    scalePercentage: 1.25
  }
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
class AssetListDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

   /*
   * Method for asset num and description
   */
  computedAssetDescription(item) {
    let computedAssetDescription = null;
    //istanbul ignore next
    if (item) {
      if (item.assetnum && item.description) {
        computedAssetDescription = item.assetnum + " " + item.description;
      } else {
        if (item.assetnum) {
          computedAssetDescription = item.assetnum;
        } else {
          computedAssetDescription = item.description;
        }
      }
    }
    return computedAssetDescription;
  }

   /**
   * Show/hide the Gauge Meter button on asset list page.  */

   computedDisableMeter(item) {
    return (!item.assetmetercount);
  }

  
  /**
   * Dynamically set the lastreadingdate on the UI.
   * @param {*} item - meter record
   */
   computedReading(item) {
    let computedReadingDate = null;
    let dataFormatter = this.app.dataFormatter;
    
    let lastreadingdate = item.lastreadingdate?dataFormatter.dateWithoutTimeZone(dataFormatter.convertISOtoDate(item.lastreadingdate)) : '';    
    
    //istanbul ignore else
       if (item && item.lastreading) {       
        computedReadingDate = lastreadingdate;
       
      }
      return computedReadingDate;
    
  }

  /**
   * Returns legends for the symbols/pins being used to display workorders on the map
   * urls here are used to define ui for pin/cluster on map
   */
  retrieveAssetLegends() {
    const legends = {
      Cluster: {
        label: this.app.getLocalizedLabel('cluster', 'Cluster'),
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iIzRDNEM0QyIvPg0KPC9zdmc+DQo=',
        scale: 0.5,
        zIndex: 999
      },
      NOT_READY: {
        label: this.app.getLocalizedLabel('not_ready', 'Not Ready'),
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iI0YxQzIxQiIvPg0KPHBhdGggZD0iTTMyIDIzLjI1QzMwLjI2OTQgMjMuMjUgMjguNTc3NyAyMy43NjMyIDI3LjEzODggMjQuNzI0NkMyNS42OTk4IDI1LjY4NjEgMjQuNTc4MyAyNy4wNTI3IDIzLjkxNjEgMjguNjUxNUMyMy4yNTM4IDMwLjI1MDQgMjMuMDgwNSAzMi4wMDk3IDIzLjQxODEgMzMuNzA3QzIzLjc1NTggMzUuNDA0NCAyNC41ODkxIDM2Ljk2MzUgMjUuODEyOCAzOC4xODcyQzI3LjAzNjUgMzkuNDEwOSAyOC41OTU2IDQwLjI0NDMgMzAuMjkzIDQwLjU4MTlDMzEuOTkwMyA0MC45MTk1IDMzLjc0OTYgNDAuNzQ2MiAzNS4zNDg1IDQwLjA4MzlDMzYuOTQ3MyAzOS40MjE3IDM4LjMxMzkgMzguMzAwMiAzOS4yNzU0IDM2Ljg2MTJDNDAuMjM2OCAzNS40MjIzIDQwLjc1IDMzLjczMDYgNDAuNzUgMzJDNDAuNzQ3NCAyOS42ODAyIDM5LjgyNDcgMjcuNDU2MSAzOC4xODQzIDI1LjgxNTdDMzYuNTQzOSAyNC4xNzUzIDM0LjMxOTggMjMuMjUyNiAzMiAyMy4yNVpNMzIgMzkuNUMzMC4wMTA5IDM5LjUgMjguMTAzMiAzOC43MDk4IDI2LjY5NjcgMzcuMzAzM0MyNS4yOTAyIDM1Ljg5NjggMjQuNSAzMy45ODkxIDI0LjUgMzJDMjQuNSAzMC4wMTA5IDI1LjI5MDIgMjguMTAzMiAyNi42OTY3IDI2LjY5NjdDMjguMTAzMiAyNS4yOTAyIDMwLjAxMDkgMjQuNSAzMiAyNC41VjMyTDM3LjMwMDggMzcuMzAwOUMzNi42MDU2IDM3Ljk5ODUgMzUuNzc5NCAzOC41NTE5IDM0Ljg2OTggMzguOTI5M0MzMy45NjAxIDM5LjMwNjcgMzIuOTg0OCAzOS41MDA2IDMyIDM5LjVaIiBmaWxsPSJibGFjayIvPg0KPC9zdmc+DQo=',
        scale: 1
      },
      OPERATING: {
        label: this.app.getLocalizedLabel('operating', 'Operating'),
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iIzE5ODAzOCIvPg0KPHBhdGggZD0iTTMwLjExNzIgMzdMMjQuNDkyMiAzMS4zNzVMMjUuMzc1OSAzMC40OTEyTDMwLjExNzIgMzUuMjMxOEwzOC42MDg0IDI2Ljc0MTJMMzkuNDkyMiAyNy42MjVMMzAuMTE3MiAzN1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==',
        scale: 1
      },
      DECOMMISSIONED: {
        label: this.app.getLocalizedLabel('decommissioned', 'Decommissioned'),
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTZDMTcuNzkwOSAxNiAxNiAxNy43OTA5IDE2IDIwVjQ0QzE2IDQ2LjIwOTEgMTcuNzkwOSA0OCAyMCA0OEgyNkwzMiA1NEwzOCA0OEg0NEM0Ni4yMDkxIDQ4IDQ4IDQ2LjIwOTEgNDggNDRWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwWiIgZmlsbD0iI0RBMUUyOCIvPg0KPHBhdGggZD0iTTMyIDIzLjI1QzI3LjEyNSAyMy4yNSAyMy4yNSAyNy4xMjUgMjMuMjUgMzJDMjMuMjUgMzYuODc1IDI3LjEyNSA0MC43NSAzMiA0MC43NUMzNi44NzUgNDAuNzUgNDAuNzUgMzYuODc1IDQwLjc1IDMyQzQwLjc1IDI3LjEyNSAzNi44NzUgMjMuMjUgMzIgMjMuMjVaTTMyIDM5LjVDMjcuODc1IDM5LjUgMjQuNSAzNi4xMjUgMjQuNSAzMkMyNC41IDI3Ljg3NSAyNy44NzUgMjQuNSAzMiAyNC41QzM2LjEyNSAyNC41IDM5LjUgMjcuODc1IDM5LjUgMzJDMzkuNSAzNi4xMjUgMzYuMTI1IDM5LjUgMzIgMzkuNVoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNMzUuMzc1IDM2LjM3NUwzMiAzM0wyOC42MjUgMzYuMzc1TDI3LjYyNSAzNS4zNzVMMzEgMzJMMjcuNjI1IDI4LjYyNUwyOC42MjUgMjcuNjI1TDMyIDMxTDM1LjM3NSAyNy42MjVMMzYuMzc1IDI4LjYyNUwzMyAzMkwzNi4zNzUgMzUuMzc1TDM1LjM3NSAzNi4zNzVaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=',
        scale: 1
      },
    };
    return legends;
  }

  /**
   * Change the symbol of feature depending on its data
   * (defines how the pins will show on map)
   */
  createAssetSymbology(params) {
    const legends = params.legends;
    let features = params.features;
    let legend = {};
    let geometryType;
    // Is a Cluster
    if (features.length > 1) {
        legend = legends['Cluster'];
        geometryType = 'point';
    } else {
        // Just a single feature
        const feature = features[0];
        let maximoAttributes = feature.get('maximoAttributes');
        let status = maximoAttributes.status_maxvalue ? maximoAttributes.status_maxvalue : maximoAttributes.status;
        let isrunning = maximoAttributes.isrunning;
        geometryType = feature
            .get('geometry')
            .constructor.name.toLowerCase();
        //istanbul ignore else
        if (geometryType === 'point') {
            //istanbul ignore else
          if (status && status.toUpperCase() === 'NOT READY') {
            legend = legends['NOT_READY'];
          } else if (status && (status.toUpperCase() === 'OPERATING' || status.toUpperCase() === 'ACTIVE')) {
            legend = legends['OPERATING'];
          } else if (status && (
            status.toUpperCase() === 'DECOMMISSIONED' || 
              status.toUpperCase() === 'BROKEN' || 
              status.toUpperCase() === 'INACTIVE' ||
              status.toUpperCase() === 'MISSING' || 
              status.toUpperCase() === 'SEALED' ||
              status.toUpperCase() === 'LIMITEDUSE' || 
              status.toUpperCase() === 'IMPORTED' )) {
            legend = legends['DECOMMISSIONED'];
          } else {
            legend = legends['Others'];
          }
        }
    }
    const symbologyProps = SYMBOLOGY_PROPS[geometryType];
    let symbol = Object.assign({}, legend);

    //istanbul ignore else
    if (symbologyProps) {
        symbologyProps.type = geometryType;
        symbol = Object.assign(legend, symbologyProps);
    }

    return symbol;
  }
}

export default AssetListDataController;
