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

class InspSummaryDataController {
  /**
   * Calculate the 'computedTitle' attribute
   */
  _computeTitle(item) {
    let workorderinfo = '';
    let formname = '';

    if (item){
      if (item.workorder && item.workorder[0] && item.referenceobject === 'PARENTWO') {
        formname = item.workorder[0].description;
        if (item.workorder[0].worktype) {
            workorderinfo = item.workorder[0].worktype + ' ' + item.workorder[0].wonum;
        } else {
            workorderinfo = item.workorder[0].wonum;
        }
      } else {
        formname = item.inspectionform.name;
      }
    }

    if (formname && workorderinfo){
        return formname + ' ' + workorderinfo;
    } else {
        return (formname ? formname : workorderinfo);
    }

  }

  _computeAssetInfo(item){
    let assetinfo = null;
    if (item){
      if (item.assets && item.assets[0] && item.assets[0].assetnum) {
        assetinfo = item.assets[0].description
          ? item.assets[0].assetnum + ' ' + item.assets[0].description
          : item.assets[0].assetnum;
      } 
    } 
    return assetinfo; 
  }

  _computeLocationInfo(item){
    let locationinfo = null;
      if (item){
        if (item.locations && item.locations[0] && item.locations[0].location) {
          locationinfo = item.locations[0].description
            ? item.locations[0].location + ' ' + item.locations[0].description
            : item.locations[0].location;
        } 
      } 
      return locationinfo; 
  }

}
export default InspSummaryDataController;
