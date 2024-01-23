/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

class RelatedWoDataController {  
    /*
     * Create the itemnum along with desc
     */
    computedRelatedRecordDesc(item){
        let data = '';
        //istanbul ignore else
        if(item.relatedreckey && item.relatedwodesc){
          data = item.relatedreckey+ " " +item.relatedwodesc;
        }else if(item.relatedreckey){
          data = item.relatedreckey;
        }else if(item.relatedwodesc){
           data = item.relatedwodesc;
        }else{
          data = '';
        }
        return data;
      }
  
  }
  
  export default RelatedWoDataController;
    
