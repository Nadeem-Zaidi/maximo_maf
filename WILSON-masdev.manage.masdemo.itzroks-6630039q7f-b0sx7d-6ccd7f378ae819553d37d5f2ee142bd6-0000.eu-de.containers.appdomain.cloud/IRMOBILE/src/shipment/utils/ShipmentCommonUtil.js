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
import { log, Datasource } from "@maximo/maximo-js-api";
import PostRequestUtil from "./ShipmentPostRequestUtil";

const TAG = "ShipmentCommonUtil";

const STDSERVICE = "STDSERVICE";
const SHIPRECEIPT = "SHIPRECEIPT";
const SHIPRETURN = "SHIPRETURN";
const SHIPTRANSFER = "SHIPTRANSFER";
const TRANSFER = "TRANSFER";
const SHIPVOIDRECEIPT = "VOIDSHIPRECEIPT";
const WINSP = "WINSP";
const COMP = "COMP";
const WASSET = "WASSET";

const SHIPRECEIVE_PAGE = "shipmentreceivepage";
const SHIPINSPECT_PAGE = "shipmentinspectpage";
const ASSET_PAGE = "assetpage";
const SHIPRETURN_PAGE = "shipmentreturnpage";
const SHIPVOID_PAGE = "shipmentvoidpage";
const SHIPRECEIPT_PAGE = "shipmentreceiptpage";

const DATASOURCE_CACHE = {};
const getDatasourceCopy = (name, datasource, options) => {
  log.d(TAG, "get ds copy: %s, options: %o", name, options);
  let newDS = null;
  options = options || {};
  // istanbul ignore else
  if (name) {
    // istanbul ignore if
    if (DATASOURCE_CACHE[name]) {
      newDS = DATASOURCE_CACHE[name];
      log.d(TAG, "get ds copy in cache: %s", name);
    } else {
      const newOptions = {
        ...datasource.options,
        ...options,
      };
      newDS = new Datasource(datasource.dataAdapter, newOptions);
      DATASOURCE_CACHE[name] = newDS;
    }
  }
  return newDS;
};

const computedOthersRemaining = async (data, shipmentnum) => {
  const result = {};
  result[SHIPRETURN_PAGE] = [];
  result[SHIPVOID_PAGE] = [];
  result[ASSET_PAGE] = [];
  result[SHIPRECEIPT_PAGE] = [];
  const shipmentmatrectransds = data.shipmentmatrectransds;
  const isMaximoMobile = data.isMaximoMobile;
  const mobilerecds = data.mobilerecds;
  const shipmentlineitems = data.shipmentlineitems;
  // const mobilerotrecds = data.mobilerotrecds;

  const matreclist = [];
  const localmatreclist = [];
  const externalRef = [];
  let localReceiptTransactions;
  const masterlist = [];
  shipmentmatrectransds.items.forEach((receipt) => {
    if ([SHIPTRANSFER].includes(receipt.issuetype)) {
      masterlist.push(receipt.matrectransid);
    }
  });

  shipmentmatrectransds.items.forEach((receipt) => {
    matreclist.push(receipt);
    // istanbul ignore else
    if (receipt.issuetype && receipt.issuetype !== SHIPTRANSFER) {
      //result[SHIPRECEIPT_PAGE].push(
      buildShipReceiptItem(
        receipt,
        receipt.description,
        receipt.matrectransid,
        result[SHIPRECEIPT_PAGE],
        false
      );
      //);
    }
    // istanbul ignore else
    if (isMaximoMobile) {
      externalRef.push(receipt.sourcesysid + "|" + receipt.externalrefid);
    }
  });
  // istanbul ignore else
  if (isMaximoMobile) {
    // const apireceiptDS = getDatasourceCopy(ponum, mobilerecds);
    // await apireceiptDS.initializeQbe();
    // apireceiptDS.setQBE("ponum", "=", ponum);
    //apireceiptDS.setQBE("positeid", "=", item.positeid);
    //localReceiptTransactions = await apireceiptDS.searchQBE();

    // get all the transaction that hasn't been synchronized and fetched from the server for the PO
    localReceiptTransactions = mobilerecds.items.filter(
      (i) => i.shipmentnum === shipmentnum && (!i.errored || i.errored === 0)
    );
    localReceiptTransactions.forEach((receipt) => {
      // istanbul ignore else
      if (
        !externalRef.includes(`${receipt.sourcesysid}|${receipt.externalrefid}`)
      ) {
        localmatreclist.push(receipt);
        let lines = shipmentlineitems.filter(
          (i) =>
            i.shipmentnum === receipt.shipmentnum &&
            i.shipmentlinenum === receipt.shipmentlinenum
        );
        //result[RECEIPT_PAGE].push(
        buildShipReceiptItem(
          receipt,
          lines[0].description,
          receipt.externalrefid,
          result[SHIPRECEIPT_PAGE],
          true
        );
        //);
      }
    });
  }
  calculateQuantity(
    shipmentmatrectransds.items,
    localmatreclist,
    false,
    shipmentlineitems,
    masterlist,
    result
  );

  // istanbul ignore else
  if (isMaximoMobile) {
    calculateQuantity(
      localmatreclist,
      localmatreclist,
      true,
      shipmentlineitems,
      masterlist,
      result
    );
  }
  return result;
};

const calculateQuantity = (
  matreclist,
  localmatreclist,
  local,
  shipmentlineitems,
  masterlist,
  result
) => {
  //let assetcount = 0;
  matreclist.forEach((matrec) => {
    // Get the main record that has not been synchronized and fetched from the server and calculte the return quantity
    // istanbul ignore else
    if (
      ([SHIPRECEIPT, TRANSFER].includes(matrec.issuetype) &&
        masterlist.includes(matrec.receiptref)) ||
      (!matrec.orgrcvexternalrefid && !matrec.receiptref) ||
      (matrec.orgrcvexternalrefid &&
        matrec.orgrcvexternalrefid === matrec.externalrefid)
    ) {
      let qtyToBeReturned = 0;
      let qtyToBeReturnedlocal = 0;
      let qtyToBeVoidlocal = 0;
      let qtyToBeVoid = 0;
      let canvoid = true;
      let canreturn = true;
      let matreclocalchecklist = [];
      let inspectquantitysum = 0;
      let rejectquantitysum = 0;
      let hasfollowup = false;
      let lines;

      lines = shipmentlineitems.filter(
        (i) =>
          i.shipmentnum === matrec.shipmentnum &&
          i.shipmentlinenum === matrec.shipmentlinenum
      );
      //get the local follow up records for the local master record
      localmatreclist.forEach((localmatrec2) => {
        let isFollowup;
        isFollowup =
          (matrec.externalrefid &&
            localmatrec2.orgrcvexternalrefid === matrec.externalrefid) ||
          (matrec.matrectransid &&
            localmatrec2.receiptref === matrec.matrectransid);

        // istanbul ignore else
        if (isFollowup) {
          hasfollowup = true;
        }
        // istanbul ignore else
        if (
          isFollowup &&
          [SHIPRETURN, SHIPVOIDRECEIPT].includes(localmatrec2.issuetype)
        ) {
          //Return and Void record should be considered when calculate the return qty
          matreclocalchecklist.push(localmatrec2);
        }
        //get the local follow up transaction for the master matrectrans record and calulate the return quantity
        // istanbul ignore else
        if (isFollowup) {
          if (
            localmatrec2.issuetype !== SHIPRETURN &&
            localmatrec2.issuetype !== SHIPVOIDRECEIPT
          ) {
            //for the local record which is in inspection, need to sum the acceptqty and rejectqty, if the result equals receiptquantity
            //this means the inspections is finished and the accept number of this record can be returned
            //also take care of the partially inspect scenario
            inspectquantitysum += Number(localmatrec2.acceptedqty);
            // istanbul ignore else
            if (localmatrec2.rejectqty) {
              canvoid = false;
              rejectquantitysum += Number(localmatrec2.rejectqty);
            }
            // istanbul ignore else
            if (localmatrec2.acceptedqty) {
              canvoid = false;
            }

            // istanbul ignore else
            //you can’t return items you inspected until you have either inspected them all or rejected at least one from the PO Line
            if (localmatrec2.inspected) {
              qtyToBeReturnedlocal = inspectquantitysum;
              qtyToBeVoidlocal = inspectquantitysum;
              if (
                inspectquantitysum + rejectquantitysum ===
                Number(matrec.receiptquantity)
              ) {
                canvoid = false;
                canreturn = true;
              } else {
                if (!rejectquantitysum) {
                  canreturn = false;
                } else {
                  canreturn = true;
                }
              }
            }
          } else if (localmatrec2.issuetype === SHIPRETURN) {
            qtyToBeReturnedlocal -= Number(localmatrec2.receiptquantity);
            qtyToBeVoidlocal -= Number(localmatrec2.receiptquantity);
            inspectquantitysum -= Number(localmatrec2.receiptquantity);
          } else {
            // istanbul ignore else
            if (localmatrec2.issuetype === SHIPVOIDRECEIPT) {
              qtyToBeReturnedlocal += Number(localmatrec2.receiptquantity);
              qtyToBeVoidlocal += Number(localmatrec2.receiptquantity);
              inspectquantitysum += Number(localmatrec2.receiptquantity);
            }
          }
        }
        // istanbul ignore else
        if (isFollowup && localmatrec2.issuetype === SHIPRETURN) {
          canvoid = false;
        }
      });
      //for the item inspection is not required can be returned too, for the inspection is not required rotating item, it can not be void
      if (
        local &&
        (!matrec.inspectionrequired || matrec.inspectionrequired === false) &&
        matrec.issuetype === SHIPRECEIPT
      ) {
        qtyToBeReturned += Number(matrec.receiptquantity);
        // istanbul ignore else
        if (matrec.rotating && matrec.siteid === matrec.fromsiteid) {
          canvoid = false;
        }
        // istanbul ignore else
        if (canvoid) {
          qtyToBeVoid += Number(matrec.receiptquantity);
        }
      } else if (
        !hasfollowup &&
        local &&
        matrec.inspectionrequired &&
        !matrec.acceptedqty
      ) {
        canvoid = true;
        qtyToBeVoid = Number(matrec.receiptquantity);
      }
      // istanbul ignore else
      if (
        (matrec.status_maxvalue &&
          matrec.rotating &&
          ![WINSP, WASSET].includes(matrec.status_maxvalue)) ||
        ([WINSP, WASSET, COMP].includes(matrec.status_maxvalue) &&
          matrec.inspectedqty > 0)
      ) {
        //the record does not finish inspection and the rotating item which is not WINSP or WASSET could not be void
        canvoid = false;
      }

      // istanbul ignore else
      if (!local) {
        // istanbul ignore else
        if (Number(matrec.rejectqty) > 0) {
          canreturn = true;
        }
        matreclocalchecklist = [];
        matreclist.forEach((matrec2) => {
          // istanbul ignore else
          if (
            matrec2.receiptref === matrec.matrectransid &&
            [SHIPRETURN, SHIPVOIDRECEIPT].includes(matrec2.issuetype)
          ) {
            //Return and Void record should be considered when calculate the return qty
            matreclocalchecklist.push(matrec2);
            // istanbul ignore else
            if (
              matrec2.receiptref === matrec.matrectransid &&
              matrec2.issuetype === SHIPRETURN
            ) {
              canvoid = false;
            }
          }
        });

        qtyToBeReturned = calculateReturnQty(
          matrec,
          matreclocalchecklist,
          false
        );
        // istanbul ignore else
        if (canvoid) {
          qtyToBeVoid = calculateReturnQty(matrec, matreclocalchecklist, true);
        }
      }

      qtyToBeReturned += qtyToBeReturnedlocal;
      qtyToBeVoid += qtyToBeVoidlocal;
      let tempid = matrec.matrectransid;
      // istanbul ignore else
      if (!matrec.matrectransid) {
        tempid = matrec.externalrefid;
      }
      // istanbul ignore else
      if (canreturn && qtyToBeReturned > 0 && !matrec.rotating) {
        result[SHIPRETURN_PAGE].push(
          buildShipReturnVoidItem(lines[0], qtyToBeReturned, matrec, tempid)
        );
      }
      // istanbul ignore else
      if (qtyToBeVoid > 0 && canvoid) {
        result[SHIPVOID_PAGE].push(
          buildShipReturnVoidItem(lines[0], qtyToBeVoid, matrec, tempid)
        );
      }
    }
    //Calculate the local asset number to be created
    //will be implemented in later release
    // if (
    //   matrec.status_maxvalue === WASSET &&
    //   matrec.issuetype_maxvalue !== TRANSFER &&
    //   matrec.rotating
    // ) {
    //   let tempcount = 0;
    //   localmatreclist.forEach((localmatrec) => {
    //     //TODO replace the receiptref and matrectransid with localid
    //     if (
    //       localmatrec.orgrcvexternalrefid === matrec.externalrefid &&
    //       matrec.rotassetnum &&
    //       matrec.issuetype_maxvalue === TRANSFER
    //     ) {
    //       tempcount++;
    //     }
    //   });
    //   assetcount = matrec.receiptquantity - tempcount;
    // }
    // if (assetcount > 0) {
    //   for (let i = 0; i < assetcount; i++) {
    //     // FIXME
    //     let id = [matrec.externalrefid, i].join("");
    //     result[ASSET_PAGE].push(buildAssetItem(matrec, id));
    //   }
    // }
  });
};

const computedRecInspRemaining = async (data, item) => {
  const result = {};
  result[SHIPRECEIVE_PAGE] = [];
  result[SHIPINSPECT_PAGE] = [];
  const shipmentmatrectransds = data.shipmentmatrectransds;
  const isMaximoMobile = data.isMaximoMobile;
  const mobilerecds = data.mobilerecds;
  // const mobilerotrecds = data.mobilerotrecds;

  let receiptQty = item.shippedqty;
  const externalRef = [];
  const inspectrefMap = {};

  // istanbul ignore else
  if (item.linetype_maxvalue !== STDSERVICE) {
    let localReceiptTransactions = {};
    shipmentmatrectransds.items.filter((i) => i.issuetype !== SHIPTRANSFER);
    //   shipmentmatrectransds.items.forEach((receipt) => {
    //   if ([SHIPTRANSFER].includes(receipt.issuetype)) {
    //     masterlist.push(receipt.matrectransid);
    //   }
    // });

    // istanbul ignore else
    if (isMaximoMobile) {
      // const apireceiptDS = getDatasourceCopy(
      //   `${item.shipmentnum}-${item.shipmentlinenum}`,
      //   mobilerecds
      // );
      // await apireceiptDS.initializeQbe();
      // apireceiptDS.setQBE("shipmentnum", "=", item.shipmentnum);
      // //apireceiptDS.setQBE("positeid", "=", item.positeid);
      // apireceiptDS.setQBE("shipmentlinenum", "=", item.shipmentlinenum);
      // localReceiptTransactions = await apireceiptDS.searchQBE();

      localReceiptTransactions = mobilerecds.items.filter(
        (i) =>
          i.shipmentnum === item.shipmentnum &&
          i.shipmentlinenum === item.shipmentlinenum
        //&& (!i.errored || i.errored === 0)
      );
    }
    // istanbul ignore else
    if (isMaximoMobile) {
      shipmentmatrectransds.items.forEach((receipt) => {
        // istanbul ignore else
        if (receipt.shipmentlinenum === item.shipmentlinenum) {
          externalRef.push(`${receipt.sourcesysid}|${receipt.externalrefid}`);
        }
      });
    }

    shipmentmatrectransds.items.forEach((receipt) => {
      // istanbul ignore else
      if (receipt.shipmentlinenum === item.shipmentlinenum) {
        let conversionFactor = receipt.conversion;
        // istanbul ignore else
        if (conversionFactor === 0) {
          conversionFactor = 1;
        }
        // istanbul ignore else
        if (
          [SHIPRECEIPT, SHIPVOIDRECEIPT].includes(receipt.issuetype_maxvalue)
        ) {
          receiptQty -= receipt.quantity / conversionFactor;
        }
        // istanbul ignore else
        if (receipt.status_maxvalue === WINSP) {
          inspectrefMap[receipt.matrectransid] = buildShipInspectItem(
            item,
            receipt.quantity,
            receipt.inspectedqty,
            receipt.conversion,
            receipt.externalrefid,
            receipt.matrectransid,
            receipt.conditioncode,
            receipt.href,
            receipt.matrectransid
          );
        }

        // istanbul ignore else
        if (isMaximoMobile) {
          let tempcount =
            Number(receipt.receiptquantity) - Number(receipt.inspectedqty);

          localReceiptTransactions.forEach((apireceipt) => {
            //The record is received online, but the inspect record has not been sync, the quantity of the receive recored should be recalcultated
            // istanbul ignore else
            if (
              !externalRef.includes(
                `${apireceipt.sourcesysid}|${apireceipt.externalrefid}`
              ) &&
              ((receipt.matrectransid &&
                apireceipt.receiptref === receipt.matrectransid) ||
                (receipt.externalrefid &&
                  apireceipt.orgrcvexternalrefid === receipt.externalrefid))
            ) {
              //The rejected quantity should not be added back to Receive page
              // istanbul ignore else
              // if (apireceipt.inspected && apireceipt.rejectqty) {
              //   receiptQty = Number(receiptQty) + Number(apireceipt.rejectqty);
              // }
              // istanbul ignore else
              //The return quantity should not be added back to Receive page
              // if (apireceipt.issuetype === SHIPRETURN) {
              //   receiptQty =
              //     Number(receiptQty) + Number(apireceipt.receiptquantity);
              // }
              // istanbul ignore else
              if (apireceipt.issuetype === SHIPVOIDRECEIPT) {
                receiptQty =
                  Number(receiptQty) + Number(apireceipt.receiptquantity) * -1;
              }

              //The inspect recored need to be calculated, updated the inspect quantity or remove the recored from the inspec list
              // istanbul ignore else

              if (
                (apireceipt.inspected &&
                  receipt.matrectransid &&
                  apireceipt.receiptref === receipt.matrectransid) ||
                (receipt.externalrefid &&
                  apireceipt.orgrcvexternalrefid === receipt.externalrefid &&
                  [SHIPRECEIPT, SHIPVOIDRECEIPT].includes(
                    apireceipt.issuetype
                  ) &&
                  apireceipt.inspectionrequired === true)
              ) {
                tempcount =
                  tempcount -
                  Number(apireceipt.acceptedqty) -
                  Number(apireceipt.rejectqty);
                // istanbul ignore else
                if (apireceipt.issuetype === SHIPVOIDRECEIPT) {
                  tempcount = tempcount - apireceipt.receiptquantity * -1;
                }

                if (tempcount > 0) {
                  inspectrefMap[receipt.matrectransid] = buildShipInspectItem(
                    item,
                    tempcount,
                    apireceipt.inspectedqty,
                    apireceipt.conversion,
                    receipt.externalrefid,
                    receipt.matrectransid,
                    receipt.conditioncode,
                    apireceipt.href,
                    receipt.matrectransid
                  );
                } else {
                  delete inspectrefMap[receipt.matrectransid];
                }
              }
            }
          });
        }
      }
    });
    // istanbul ignore else
    if (isMaximoMobile) {
      localReceiptTransactions.forEach((receipt) => {
        // Verify the transaction hasn't been synchronized and fetched from the server
        // istanbul ignore else
        if (
          !externalRef.includes(
            `${receipt.sourcesysid}|${receipt.externalrefid}`
          )
        ) {
          let tempid = receipt.matrectransid;
          // istanbul ignore else
          if (!receipt.matrectransid) {
            tempid = receipt.externalrefid;
          }

          //if the record was inspected, means this inspection record is updated,
          //so we need to remove the inspection record in the original inspection map or update it in the inspection map according to the count
          // istanbul ignore else
          if (
            (!receipt.receiptref && !receipt.orgrcvexternalrefid) ||
            (receipt.orgrcvexternalrefid &&
              receipt.orgrcvexternalrefid === receipt.externalrefid)
          ) {
            // istanbul ignore else
            if (
              [SHIPRECEIPT, SHIPRETURN, SHIPVOIDRECEIPT].includes(
                receipt.issuetype
              )
            ) {
              receiptQty = receiptQty - receipt.receiptquantity;
            }
            //check if there's any inspection data
            //if (item.inspectionrequired) {
            let tempcount = receipt.receiptquantity;
            // istanbul ignore else
            if (receipt.inspectedqty) {
              tempcount = receipt.receiptquantity - receipt.inspectedqty;
            }

            // istanbul ignore else
            if (receipt.rejectqty) {
              tempcount = tempcount - receipt.rejectqty;
            }

            localReceiptTransactions.forEach((receipt2) => {
              // istanbul ignore else
              if (
                (receipt2.receiptref &&
                  receipt2.receiptref === receipt.matrectransid) ||
                (receipt.externalrefid &&
                  receipt2.orgrcvexternalrefid === receipt.externalrefid)
              ) {
                // istanbul ignore else
                if (
                  [SHIPRECEIPT, SHIPRETURN, SHIPVOIDRECEIPT].includes(
                    receipt2.issuetype
                  )
                ) {
                  // istanbul ignore else
                  if (receipt2.inspected) {
                    //The rejected quantity should not be added back to Receive page
                    //receiptQty = receiptQty * 1 + receipt2.rejectqty * 1;
                    //check if there's any inspection data
                    // istanbul ignore else
                    if (receipt2.acceptedqty) {
                      tempcount = tempcount - receipt2.acceptedqty;
                    }
                    // istanbul ignore else
                    if (receipt2.rejectqty) {
                      tempcount = tempcount - receipt2.rejectqty;
                    }
                  }
                  //Return number should not be added back to receive number
                  // istanbul ignore else
                  // if (receipt2.issuetype === SHIPRETURN) {
                  //   receiptQty += Number(receipt2.receiptquantity);
                  // }
                  // istanbul ignore else
                  if (receipt2.issuetype === SHIPVOIDRECEIPT) {
                    receiptQty += Number(receipt2.receiptquantity) * -1;
                    tempcount =
                      tempcount - Number(receipt2.receiptquantity) * -1;
                  }
                }
              }
            });
            if (tempcount > 0 && item.inspectionrequired) {
              // istanbul ignore else
              if (!receipt.matrectransid) {
                tempid = receipt.externalrefid;
              }
              inspectrefMap[tempid] = buildShipInspectItem(
                item,
                tempcount,
                receipt.inspectedqty,
                receipt.conversion,
                receipt.externalrefid,
                receipt.matrectransid,
                receipt.conditioncode,
                receipt.href,
                tempid
              );
            } else {
              delete inspectrefMap[tempid];
            }
          }
        }
      });
    }

    // istanbul ignore else
    if (receiptQty > 0) {
      //push this item to receive json
      result[SHIPRECEIVE_PAGE].push(buildShipReceiveItem(item, receiptQty));
    }

    for (const key in inspectrefMap) {
      // istanbul ignore else
      if (inspectrefMap[key]) {
        result[SHIPINSPECT_PAGE].push(inspectrefMap[key]);
      }
    }
  }
  return result;
};

const calculateReturnQty = (matrec, checklist, isvoid) => {
  let qtyToBeReturned = 0;

  if (checklist.length === 0) {
    let tempcount = Number(matrec.acceptedqty);
    // istanbul ignore else
    if (matrec.rejectqty) {
      tempcount = tempcount + Number(matrec.rejectqty);
    }
    if (
      matrec.status_maxvalue === COMP ||
      (matrec.inspected && tempcount === matrec.receiptquantity)
    ) {
      qtyToBeReturned = Number(matrec.receiptquantity);
    } else if (
      matrec.status_maxvalue &&
      [WINSP, WASSET].includes(matrec.status_maxvalue) &&
      isvoid
    ) {
      qtyToBeReturned = Number(matrec.receiptquantity);
    }
  } else {
    let receiptSum = 0;
    checklist.forEach((matreccheck) => {
      receiptSum += matreccheck.receiptquantity;
    });

    if (matrec.status_maxvalue === WINSP) {
      qtyToBeReturned = Number(matrec.inspectedqty) - receiptSum * -1;
    } else {
      // istanbul ignore else
      if (matrec.status_maxvalue) {
        qtyToBeReturned = Number(matrec.receiptquantity) - receiptSum * -1;
      }
    }
  }

  return qtyToBeReturned;
};

// const buildAssetItem = (item, id) => {
//   return {
//     ...item,
//     _id: id,
//   };
// };

const buildShipReceiveItem = (item, quantity) => {
  return {
    ...item,
    siteid: item.siteid,
    //porevisionnum: item.revisionnum,
    receiptquantity: quantity,
    receiptquantity_old: quantity,
  };
};

const buildShipReturnVoidItem = (item, quantity, matrec, id) => {
  return {
    ...item,
    qtyrequested: quantity,
    qtyrequested_old: quantity,
    //inspecasntedqtydsply: item.asn,
    orgrcvexternalrefid: matrec.externalrefid,
    receiptref: matrec.matrectransid,
    tolot: matrec.tolot,
    actualdate: matrec.actualdate,
    conditioncode: matrec.conditioncode,
    _id: id,
  };
};

const buildShipInspectItem = (
  item,
  quantity,
  inspectedqty,
  conversion,
  externalrefid,
  matrectransid,
  conditioncode,
  href,
  id
) => {
  let receiptquantity_value = quantity,
    inspectedqtydsply_value = quantity;

  // istanbul ignore else
  if (conversion !== undefined && quantity !== undefined) {
    let conversionFactor = conversion;
    // istanbul ignore else
    if (conversionFactor === 0) {
      conversionFactor = 1;
    }
    receiptquantity_value = quantity / conversionFactor;
    inspectedqtydsply_value = quantity / conversionFactor;
    // istanbul ignore else
    if (inspectedqty) {
      inspectedqtydsply_value = receiptquantity_value - inspectedqty;
    }
  }

  return {
    ...item,
    siteid: item.siteid,
    porevisionnum: item.revisionnum,
    rejectqty: 0,
    conversion: conversion,
    inspected: true,
    conditioncode: conditioncode,
    receiptquantity: receiptquantity_value,
    acceptedqty: inspectedqtydsply_value,
    inspectedqty: inspectedqty,
    inspectedqtydsply: inspectedqtydsply_value,
    orgrcvexternalrefid: externalrefid,
    receiptref: matrectransid,
    href: href,
    _id: id,
  };
};

const buildShipReceiptItem = (
  item,
  description,
  id,
  result_RECEIPT_PAGE,
  isFromMXRecept
) => {
  let itemStatus = item.status;

  if (isFromMXRecept) {
    if (item.issuetype === SHIPRECEIPT) {
      // For Receive and Inspect
      let existingrec = result_RECEIPT_PAGE.find(
        (i) => i._id === item.receiptref || i._id === item.orgrcvexternalrefid
      );
      if (existingrec) {
        // for insepct transactions
        // istanbul ignore else
        if (existingrec.inspectedqty === undefined) {
          existingrec.inspectedqty = 0;
        }
        if (existingrec.acceptedtotal === undefined) {
          existingrec.acceptedtotal = 0;
        }
        existingrec.acceptedtotal =
          Number(item.acceptedqty) + Number(existingrec.acceptedtotal);
        existingrec.inspectedqty =
          Number(existingrec.inspectedqty) +
          (Number(item.acceptedqty) + Number(item.rejectqty));

        // istanbul ignore else
        if (
          Number(existingrec.inspectedqty) ===
          Number(existingrec.receiptquantity)
        ) {
          if (item.rotating) {
            existingrec.status = WASSET;
            existingrec.actualdate = item.actualdate;
          } else {
            existingrec.status = COMP;
            existingrec.acceptedqty = existingrec.acceptedtotal;
            existingrec.actualdate = item.actualdate;
          }
        }
        // istanbul ignore else
        if (Number(item.acceptedqty) > 0 && existingrec.status !== WASSET) {
          result_RECEIPT_PAGE.push({
            ...item,
            issuetype: TRANSFER,
            description: description,
            status: COMP,
            orderqty: item.shippedqty,
            receiptquantity: item.acceptedqty,
            _id: PostRequestUtil.generateUniqueIDDefault(),
          });
        }
        // istanbul ignore else
        if (Number(item.rejectqty) > 0) {
          // Needs to add a new record of RETURN type.
          let rejectqty = item.rejectqty * -1;
          result_RECEIPT_PAGE.push({
            ...item,
            issuetype: SHIPRETURN,
            description: description,
            status: COMP,
            rejectqty: rejectqty,
            receiptquantity: item.rejectqty,
            _id: PostRequestUtil.generateUniqueIDDefault(),
          });
        }
      } else {
        if (!item.orgrcvexternalrefid) {
          // for receive transaction
          if (item.inspectionrequired) {
            itemStatus = WINSP;
          } else {
            if (item.siteid !== item.fromsiteid) {
              itemStatus = WASSET;
            } else {
              itemStatus = COMP;
            }
          }
          result_RECEIPT_PAGE.push({
            ...item,
            description: description,
            status: itemStatus,
            orderqty: item.shippedqty,
            acceptedqty: item.receiptquantity,
            receiptquantity: item.receiptquantity,
            _id: id,
          });
        }
      }
    } else if (item.issuetype === SHIPVOIDRECEIPT) {
      let existingrec = result_RECEIPT_PAGE.find(
        (i) => i._id === item.receiptref || i._id === item.orgrcvexternalrefid
      );
      // istanbul ignore else
      if (existingrec) {
        // istanbul ignore else
        if (Number(existingrec.acceptedqty) > 0) {
          existingrec.status = COMP;
        }
      }
      // For Return.
      let qty = item.receiptquantity;
      qty = qty * -1;
      result_RECEIPT_PAGE.push({
        ...item,
        description: description,
        status: COMP,
        receiptquantity: qty,
        orderqty: item.shippedqty,
        _id: id,
      });
    } else if (item.issuetype === SHIPRETURN) {
      // For Return.
      itemStatus = item.issuetype;
      let qty = item.receiptquantity;
      result_RECEIPT_PAGE.push({
        ...item,
        description: description,
        status: COMP,
        receiptquantity: qty,
        orderqty: item.shippedqty,
        _id: id,
      });
    }
  } else {
    let rejectcode = item.rejectcode;
    let existingrec = result_RECEIPT_PAGE.find(
      (i) => i._id === item.receiptref
    );

    // istanbul ignore else
    if (existingrec && item.tostoreloc === existingrec.fromstoreloc) {
      rejectcode = existingrec.rejectcode;
    }
    let acceptedqty = Number(item.receiptquantity) - Number(item.rejectqty);
    let qty = item.receiptquantity;
    // istanbul ignore else
    if (item.issuetype === SHIPRETURN || item.issuetype === SHIPVOIDRECEIPT) {
      qty = qty * -1;
    }
    let objReturned = {
      ...item,
      description: description,
      status: itemStatus,
      acceptedqty: acceptedqty,
      receiptquantity: qty,
      rejectcode: rejectcode,
      _id: id,
    };
    result_RECEIPT_PAGE.push(objReturned);
  }
};

const loadjsonds = async (jsonds, srclist) => {
  let newitem = { items: srclist };
  resetDataSource(jsonds);
  await jsonds.load({ src: newitem });
};

const resetDataSource = (ds) => {
  ds.clearState();
  ds.resetState();
};

const functions = {
  getDatasourceCopy,
  computedRecInspRemaining,
  computedOthersRemaining,
  buildShipReceiveItem,
  buildShipInspectItem,
  //buildAssetItem,
  buildShipReturnVoidItem,
  buildShipReceiptItem,
  calculateReturnQty,
  loadjsonds,
  resetDataSource,
};

export default functions;
