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

import { Device } from "@maximo/maximo-js-api";
class AssetDetailsDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }
  /**
   * Function to display Assset status on asset details page.
   */
  computedAssetStatus(item) {
    let assetDetailPage;
    //istanbul ignore next
    if (this.app) {
      assetDetailPage = this.app.findPage("assetDetails");
    }
    //istanbul ignore next
    let assetStatus = {
      label: item?.status_description,
      type: "warm-gray",
      action: true,
      onClick: () => {
        assetDetailPage?.callController("openAssetStatusList");
      },
    };

    return [assetStatus];
  }

  computedDocLinksCount(item) {
    let count;
    if(this.app.state.doclinksCountData[item.assetnum] && this.app.state.doclinksCountDataUpdated) {
      count = this.app.state.doclinksCountData[item.assetnum];
    } else {
      if(Device.get().isMaximoMobile) {
        count = item.doclinks?.member?.length;
      } else {
        count = item.doclinkscount;
      }
    }
    return count;
  }

  computedVendor(item) {
    let vendor = '';

    //istanbul ignore else
    if(item?.vendor) {
      vendor = item?.vendor;
    }
    
    //istanbul ignore else
    if(item?.vendorname) {
      vendor = vendor  + ' ' +  item?.vendorname;
    }
   
    return vendor;
  }

  computedManufacturer(item) {
    let manufacturer = '';

    //istanbul ignore else
    if(item?.manufacturer) {
      manufacturer = item?.manufacturer;
    }

    //istanbul ignore else
    if(item?.manufacturername) {
      manufacturer = manufacturer + ' ' +  item?.manufacturername;
    }
    
    return manufacturer;
  }

  computedFailurecode(item) {
    let failureCode = '';

    //istanbul ignore else
    if(item?.failurecode) {
      failureCode = item?.failurecode;
    }

    //istanbul ignore else
    if(item?.failurecodedesc) {
      failureCode = failureCode +  ' ' + item?.failurecodedesc;
    }
    
    return failureCode;
  }

  computedLocation(item) {
    let location = '';

    //istanbul ignore else
    if(item?.location) {
      location = item?.location;
    }

    //istanbul ignore else
    if(item?.locationdesc) {
      location = location + ' ' +  item?.locationdesc;
    }
    
    return location;
  }

  /**
   * Dynamically set the lastreadingdate on the UI.
   * @param {*} item - meter record
   */
  computedReading(item) {
    let computedReadingDate = null;
    let dataFormatter = this.app.dataFormatter;

    let lastreadingdate = item.lastreadingdate
      ? dataFormatter.dateWithoutTimeZone(
          dataFormatter.convertISOtoDate(item.lastreadingdate)
        )
      : "";

    //istanbul ignore else
    if (item && item.lastreading) {
      computedReadingDate = lastreadingdate;
    }
    return computedReadingDate;
  }
}

export default AssetDetailsDataController;
 