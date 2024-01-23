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

class InspectionInformationDataController {


  /**
   * Function to format the Form Info
   * @param should contain item - from the Inspection or from the Form
   */
    _computeFormName(item) {
      let formname = null;
      if (item){
        if (item && item.inspectionform) {
          formname = item.inspectionform.name;
        } else {
          if (item.name) {
            formname = item.name;
          }
        }
      }
      return formname;
    }
  
  /**
   * Function to format the Long Description Info
   * @param should contain item - from the Inspection
   */
    _computeLongDescription(item){
      let longDesc = null;
        if (item){
          if (item  && item.inspectionform) {
            longDesc = item.inspectionform.description_longdescription;
          } 
        }
        
      return longDesc; 
    }
  
  }
  export default InspectionInformationDataController;
  
