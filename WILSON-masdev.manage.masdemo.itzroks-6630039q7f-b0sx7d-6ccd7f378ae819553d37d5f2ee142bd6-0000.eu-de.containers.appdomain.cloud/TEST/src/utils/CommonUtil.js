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

/**
 * Return System Property Value 
 * @param {Application} app application object
 * @param {String} systemPropName system property Name.
 */
const getSystemProp = async (app, systemPropName) => {
    return app.state.systemProp && app.state.systemProp[systemPropName];
};

/**
 * Return true if system property value is same as expected value else return false 
 * @param {Application} app application object
 * @param {String} systemPropName system property name.
 * @param {String} propValue system property expected value. default value is 1
 */
const checkSystemProp = async (app, systemPropName, propValue = "1") => {
    return app.state.systemProp && app.state.systemProp[systemPropName] === propValue? true : false;
}

/**
 * Return true of false base on allowed property 
 * @param {Application} app application object
 * @param {String} systemPropName system property name for physical Sig.
 * @param {String} statusComp Complete Status name from maximo properties.
 * @param {Boolean} returnType Type of returning value , returnType True will return true/false, returnType false will return 1 or 0
 */
const checkSysPropArrExist = async (app, systemPropName, statusComp, returnType = true) => {
    const sigCheck = await getSystemProp(app, systemPropName);
    const allowedSignature = sigCheck? sigCheck.split(',').map((status) => status.trim()): [];
    const addEsig = allowedSignature.length > 0 && allowedSignature.indexOf(statusComp) > -1;
    if (returnType) {
        return (addEsig) ? true : false;
    } else {
        return (addEsig) ? 1 : 0;
    }
}

/**
 * Return the list of work order status list which is defined in synonymdomain table. 
 * if data already present in state "offlineStatusList" it will prevent repetative calls of synonymdomain
 * @param {app} app application object
 * @param {orgId} orgId Organization Id
 * @param {siteId} siteId Site Id
 */
const getOfflineStatusList = async (app, orgId, siteId) => {
    let filteredDomainValues = [];
    const synonymDomainsDS = app.findDatasource('synonymdomainData');
    
    if (!app.state.offlineStatusList?.length) {
      await synonymDomainsDS.initializeQbe();
      synonymDomainsDS.setQBE('domainid', 'WOSTATUS')
      synonymDomainsDS.setQBE('orgid', orgId);
      synonymDomainsDS.setQBE('siteid', siteId);

      filteredDomainValues = await synonymDomainsDS.searchQBE();

      // istanbul ignore next
      if (filteredDomainValues && filteredDomainValues.length < 1) {
        synonymDomainsDS.setQBE('orgid', '=', orgId);
        synonymDomainsDS.setQBE('siteid', '=', 'null');
        filteredDomainValues = await synonymDomainsDS.searchQBE();

        // istanbul ignore next
        if (filteredDomainValues && filteredDomainValues.length < 1) {
          synonymDomainsDS.setQBE('orgid', '=', 'null');
          synonymDomainsDS.setQBE('siteid', '=', 'null');
          filteredDomainValues = await synonymDomainsDS.searchQBE();
        }
      }
      app.state.offlineStatusList = filteredDomainValues;
      synonymDomainsDS.clearQBE();
    }
    return app.state.offlineStatusList;

    
}

/**
 * Return List of allowed status based on current status of work order
 * @param {statusList} statusList list of offline status
 * @param {event} event datasource event work order object
 * @param {flowControlled} flowControlled work order flow controlled flag
 */

const getOfflineAllowedStatusList = async (app, event) => {
    const statusList = await getOfflineStatusList(app, event.item.orgid, event.item.siteid);
    const statusArr = [];
    statusList.forEach((element) => {
        const isValidTransition = isAllowedStatus(event.item.status_maxvalue, element.maxvalue);
        if (element.value && element.value !== event.item.status && isValidTransition) {
            statusArr.push({
                id: element.value,
                value: element.value,
                description: element.description,
                defaults: element.defaults,
                maxvalue: element.maxvalue,
                _bulkid: element.value
            });
        }
    });
    return statusArr;
}

/** 
 * This method checks status transition based on internal value.
 * @param { from } from from status
 * @param { to } to to status
*/
const isAllowedStatus = (from, to) => {
    let transitionMatrix = {
      WAPPR: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      WPCOND: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      APPR: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      WSCH: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      WMATL: ['COMP','WAPPR','CAN','INPRG','CLOSE','WMATL'],
      INPRG: ['COMP', 'WAPPR','INPRG','CLOSE','WMATL'],
      COMP: ['COMP', 'CLOSE'],
      CLOSE: ['CLOSE'],
      CAN: ['CAN']
    };

    if (!transitionMatrix[from] || transitionMatrix[from].indexOf(to) < 0) {
      return false;
    } else {
      return true;
    }
}

const functions = {
    getSystemProp,
    checkSystemProp,
    checkSysPropArrExist,
    getOfflineStatusList,
    getOfflineAllowedStatusList,
    isAllowedStatus
};
  
export default functions;
  