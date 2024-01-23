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
import { log } from "@maximo/maximo-js-api";
import { v4 as uuidv4 } from "uuid";
const TAG = "PostRequestUtil";
const SOURCESYSID = "INVRECEIVE";
const ACTIONNAME_RECEIVE = "RECEIVE";
const ACTIONNAME_INSPECT = "INSPECT";
const ACTIONNAME_RETURN = "RETURN";
const ACTIONNAME_VOIDRECEIPT = "VOIDRECEIPT";
const LOT = "LOT";

/**
 * Get response of the post request
 * @param  {itemlist} itemlist the list of the selected items.
 * @param  {app} app current app object
 * @param  {href} href for post request
 * @param  {reloverride_value} reloverride value for post request
 * @returns {response} JSON object of items list and the boolean emptyquantity
 */
const postRequest = async (itemlist, href, app, reloverride_value) => {
  try {
    let conn = app.client.restclient;
    let csrftoken = conn.getCSRFToken();
    if (reloverride_value) {
      let response = await conn.post(href, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
          "x-method-override": "PATCH",
          patchtype: "MERGE",
          csrftoken: csrftoken,
          reloverride: reloverride_value,
        },
        body: JSON.stringify(itemlist),
      });
      return response;
    } else {
      let response = await conn.post(href, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
          "x-method-override": "PATCH",
          patchtype: "MERGE",
          csrftoken: csrftoken,
        },
        body: JSON.stringify(itemlist),
      });
      return response;
    }
  } catch (error) {
    // istanbul ignore next
    log.t(TAG, error);
  }
};

/**
 * Get response of the post request
 * @param  {selecteditem} selecteditem the selected item with values to be set.
 * @param  {actionname} actionname the name of the action, e.g. RECEIVE, INSPECT
 * @returns {response} JSON object of items list and the boolean emptyquantity
 */
const setRealValues2Item = (selecteditem, actionname, app) => {
  const item = {};
  return setRealValues2AddedNewDSRec(selecteditem, actionname, item, app);
};

/**
 * Get response of the post request
 * @param  {selecteditem} selecteditem the selected item with values to be set.
 * @param  {actionname} actionname the name of the action, e.g. RECEIVE, INSPECT
 * @returns {response} JSON object of items list and the boolean emptyquantity
 */
const setRealValues2AddedNewDSRec = (selecteditem, actionname, item, app) => {
  const properties = [
    "ponum",
    "porevisionnum",
    "orgid",
    "siteid",
    "positeid",
    "polinenum",
    "itemnum",
    "itemsetid",
    "conditioncode",
    "linetype",
    "remark",
    "tolot",
    "shelflife",
    "useby",
    "packingslipnum",
    "receiptquantity",
    "inspectionrequired",
    "rotating",
    "actualdate",
  ];
  properties.forEach((prop) => {
    //istanbul ignore else
    if (prop && selecteditem[prop] !== undefined) {
      item[prop] = selecteditem[prop];
    }
    if (prop === "actualdate") {
      const current = new Date();
      current.setSeconds(0);
      const currentDateString = app.dataFormatter.convertDatetoISO(current);
      //if (!app.state.networkConnected) {
      item[prop] = currentDateString;
      //}
    }
  });

  let uuid = generateUniqueIDDefault();
  item.externalrefid = uuid;
  item.sourcesysid = SOURCESYSID;
  item.issuetype = "RECEIPT";

  //istanbul ignore else
  if (actionname) {
    if (actionname === ACTIONNAME_RETURN) {
      item.issuetype = "RETURN";
      //istanbul ignore else
      if (selecteditem.qtyrequested !== undefined) {
        item.receiptquantity = selecteditem.qtyrequested;
      }
    }
    if (actionname === ACTIONNAME_VOIDRECEIPT) {
      item.issuetype = "VOIDRECEIPT";
      //istanbul ignore else
      if (selecteditem.qtyrequested !== undefined) {
        item.receiptquantity = selecteditem.qtyrequested * -1;
      }
    }
    //istanbul ignore else
    if (actionname !== ACTIONNAME_RECEIVE) {
      //istanbul ignore else
      if (selecteditem.orgrcvexternalrefid !== undefined) {
        item.orgrcvexternalrefid = selecteditem.orgrcvexternalrefid;
      }
      //istanbul ignore else
      if (selecteditem.receiptref !== undefined) {
        item.receiptref = selecteditem.receiptref;
      }
    }

    //istanbul ignore else
    if (actionname === ACTIONNAME_INSPECT) {
      //istanbul ignore else
      if (selecteditem.acceptedqty !== undefined) {
        item.acceptedqty = selecteditem.acceptedqty;
      }
      //istanbul ignore else
      if (selecteditem.rejectqty !== undefined) {
        item.rejectqty = selecteditem.rejectqty;
      }
      //istanbul ignore else
      if (selecteditem.rejectcode !== undefined) {
        item.rejectcode = selecteditem.rejectcode;
      }
      item.inspected = true;
    }
    //istanbul ignore else
    if (actionname === ACTIONNAME_RECEIVE && selecteditem.lottype === LOT) {
      item.tolot = selecteditem.tolot;
      //istanbul ignore else
      if (!selecteditem.tolot) {
        item.tolot = generateUniqueID(8);
      }
    }
  }

  return item;
};

const generateUniqueIDDefault = () => {
  return generateUniqueID(10);
};

const generateUniqueID = (length) => {
  let uuid = uuidv4();
  uuid = uuid.replace(/-/g, "");
  uuid = uuid.substring(0, length);
  return uuid;
};

const functions = {
  postRequest,
  setRealValues2Item,
  setRealValues2AddedNewDSRec,
  generateUniqueID,
  generateUniqueIDDefault,
};

//let saveDataSuccessful = false;

export default functions;
