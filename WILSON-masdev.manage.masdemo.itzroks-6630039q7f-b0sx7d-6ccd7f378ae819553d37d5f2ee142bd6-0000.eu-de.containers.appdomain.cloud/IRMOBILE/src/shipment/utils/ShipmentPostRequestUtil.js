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
import { v4 as uuidv4 } from "uuid";
const SOURCESYSID = "SHIPRECV";
const ACTIONNAME_SHIPRECEIVE = "SHIPRECEIVE";
const ACTIONNAME_SHIPINSPECT = "SHIPINSPECT";
const ACTIONNAME_SHIPRETURN = "SHIPRETURN";
const ACTIONNAME_SHIPVOIDRECEIPT = "SHIPVOIDRECEIPT";
const LOT = "LOT";

const PROPERTIES = [
  "shipmentnum",
  "orgid",
  "siteid",
  "positeid",
  "shipmentlinenum",
  "itemnum",
  "itemsetid",
  "itemdescription",
  "conditioncode",
  "remark",
  "ponum",
  "revisionnum",
  "polineid",
  "polinenum",
  "fromorgid",
  "fromsiteid",
  "fromstoreloc",
  "fromlot",
  "frombin",
  "toorgid",
  "tostoreloc",
  "tolot",
  "shelflife",
  "useby",
  "packingslipnum",
  "shippedqty",
  "inspectionrequired",
  "rotating",
  "actualdate",
  "invuselineid",
  "invuselinenum",
  "invuselinesplitid",
  "receiptquantity",
];

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
  populateItemProperties(item, selecteditem, app);

  //istanbul ignore else
  if (actionname) {
    if (actionname === ACTIONNAME_SHIPRETURN) {
      item.issuetype = "SHIPRETURN";
      //istanbul ignore else
      if (selecteditem.qtyrequested !== undefined) {
        item.receiptquantity = selecteditem.qtyrequested;
      }
    }
    if (actionname === ACTIONNAME_SHIPVOIDRECEIPT) {
      item.issuetype = "VOIDSHIPRECEIPT";
      //istanbul ignore else
      if (selecteditem.qtyrequested !== undefined) {
        item.receiptquantity = selecteditem.qtyrequested * -1;
      }
    }

    //istanbul ignore else
    if (actionname !== ACTIONNAME_SHIPRECEIVE) {
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
    if (actionname === ACTIONNAME_SHIPINSPECT) {
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
      //istanbul ignore else
      if (selecteditem.quantity !== undefined) {
        item.receiptquantity = selecteditem.quantity;
      }
      item.inspected = true;
    }

    //istanbul ignore else
    if (actionname === ACTIONNAME_SHIPRECEIVE && selecteditem.lottype === LOT) {
      item.tolot = selecteditem.tolot;
      //istanbul ignore else
      if (!selecteditem.tolot) {
        item.tolot = generateUniqueID(8);
      }
    }
    if (!item.issuetype) {
      item.issuetype = "SHIPRECEIPT";
    }
  }

  return item;
};

function populateItemProperties(item, selecteditem, app) {
  PROPERTIES.forEach((prop) => {
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
}

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
  setRealValues2Item,
  setRealValues2AddedNewDSRec,
  generateUniqueID,
  generateUniqueIDDefault,
};

//let saveDataSuccessful = false;

export default functions;
