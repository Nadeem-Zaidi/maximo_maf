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
import PostRequestUtil from "./PostRequestUtil";

const TAG = "CommonUtil";

const STDSERVICE = "STDSERVICE";
const RECEIPT = "RECEIPT";
const RETURN = "RETURN";
const TRANSFER = "TRANSFER";
const VOIDRECEIPT = "VOIDRECEIPT";
const WINSP = "WINSP";
const COMP = "COMP";
const WASSET = "WASSET";

const RECEIVE_PAGE = "receivepage";
const INSPECT_PAGE = "inspectpage";
const ASSET_PAGE = "assetpage";
const RETURN_PAGE = "returnpage";
const VOID_PAGE = "voidpage";
const RECEIPT_PAGE = "receiptpage";

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

const computedOthersRemaining = async (data, ponum) => {
  const result = {};
  result[RETURN_PAGE] = [];
  result[VOID_PAGE] = [];
  result[ASSET_PAGE] = [];
  result[RECEIPT_PAGE] = [];
  const matrectransds = data.matrectransds;
  const isMaximoMobile = data.isMaximoMobile;
  const mobilerecds = data.mobilerecds;
  const polineitems = data.polineitems;
  // const mobilerotrecds = data.mobilerotrecds;

  const matreclist = [];
  const localmatreclist = [];
  const externalRef = [];
  let localReceiptTransactions;

  matrectransds.items.forEach((receipt) => {
    matreclist.push(receipt);
    // istanbul ignore else
    if (receipt.status_maxvalue && receipt.status_maxvalue !== TRANSFER) {
      //result[RECEIPT_PAGE].push(
      buildReceiptItem(
        receipt,
        receipt.description,
        receipt.matrectransid,
        result[RECEIPT_PAGE],
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
      (i) => i.ponum === ponum && (!i.errored || i.errored === 0)
    );
    localReceiptTransactions.forEach((receipt) => {
      // istanbul ignore else
      if (
        !externalRef.includes(`${receipt.sourcesysid}|${receipt.externalrefid}`)
      ) {
        localmatreclist.push(receipt);

        let lines = polineitems.filter(
          (i) => i.ponum === receipt.ponum && i.polinenum === receipt.polinenum
        );
        //result[RECEIPT_PAGE].push(
        buildReceiptItem(
          receipt,
          lines[0].description,
          receipt.externalrefid,
          result[RECEIPT_PAGE],
          true
        );
        //);
      }
    });
  }
  calculateQuantity(
    matrectransds.items,
    localmatreclist,
    false,
    polineitems,
    result
  );

  // istanbul ignore else
  if (isMaximoMobile) {
    calculateQuantity(
      localmatreclist,
      localmatreclist,
      true,
      polineitems,
      result
    );
  }
  return result;
};

const calculateQuantity = (
  matreclist,
  localmatreclist,
  local,
  polineitems,
  result
) => {
  //let assetcount = 0;
  matreclist.forEach((matrec) => {
    // Get the main record that has not been synchronized and fetched from the server and calculte the return quantity
    // istanbul ignore else
    if (
      [RECEIPT, TRANSFER].includes(matrec.issuetype) &&
      ((!matrec.orgrcvexternalrefid && !matrec.receiptref) ||
        (matrec.orgrcvexternalrefid &&
          matrec.orgrcvexternalrefid === matrec.externalrefid))
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

      lines = polineitems.filter(
        (i) => i.ponum === matrec.ponum && i.polinenum === matrec.polinenum
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
          [RETURN, VOIDRECEIPT].includes(localmatrec2.issuetype)
        ) {
          //Return and Void record should be considered when calculate the return qty
          matreclocalchecklist.push(localmatrec2);
        }
        //get the local follow up transaction for the master matrectrans record and calulate the return quantity
        // istanbul ignore else
        if (isFollowup) {
          if (
            localmatrec2.issuetype !== RETURN &&
            localmatrec2.issuetype !== VOIDRECEIPT
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
          } else if (localmatrec2.issuetype === RETURN) {
            qtyToBeReturnedlocal -= Number(localmatrec2.receiptquantity);
            qtyToBeVoidlocal -= Number(localmatrec2.receiptquantity);
            inspectquantitysum -= Number(localmatrec2.receiptquantity);
          } else {
            // istanbul ignore else
            if (localmatrec2.issuetype === VOIDRECEIPT) {
              qtyToBeReturnedlocal += Number(localmatrec2.receiptquantity);
              qtyToBeVoidlocal += Number(localmatrec2.receiptquantity);
              inspectquantitysum += Number(localmatrec2.receiptquantity);
            }
          }
        }
        // istanbul ignore else
        if (isFollowup && localmatrec2.issuetype === RETURN) {
          canvoid = false;
        }
      });
      //for the item inspection is not required can be returned too
      if (
        local &&
        (!matrec.inspectionrequired || matrec.inspectionrequired === false) &&
        matrec.issuetype === RECEIPT
      ) {
        qtyToBeReturned += Number(matrec.receiptquantity);
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
            [RETURN, VOIDRECEIPT].includes(matrec2.issuetype)
          ) {
            //Return and Void record should be considered when calculate the return qty
            matreclocalchecklist.push(matrec2);
            // istanbul ignore else
            if (
              matrec2.receiptref === matrec.matrectransid &&
              matrec2.issuetype === RETURN
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
        // //Calculate return quantity for the master record
        // if (matreclocalchecklist.length !== 0) {
        //   let receiptSum = 0;
        //   matreclocalchecklist.forEach((localmatreccheck) => {
        //     receiptSum += Number(localmatreccheck.receiptquantity);
        //   });
        //   qtyToBeReturned = qtyToBeReturned - receiptSum * -1;
        //   if (canvoid) qtyToBeVoid = qtyToBeVoid - receiptSum * -1;
        // }
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
        result[RETURN_PAGE].push(
          buildReturnVoidItem(lines[0], qtyToBeReturned, matrec, tempid)
        );
      }
      // istanbul ignore else
      if (qtyToBeVoid > 0 && canvoid) {
        result[VOID_PAGE].push(
          buildReturnVoidItem(lines[0], qtyToBeVoid, matrec, tempid)
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
  result[RECEIVE_PAGE] = [];
  result[INSPECT_PAGE] = [];
  const matrectransds = data.matrectransds;
  const isMaximoMobile = data.isMaximoMobile;
  const mobilerecds = data.mobilerecds;
  // const mobilerotrecds = data.mobilerotrecds;

  let receiptQty = item.orderqty;
  const externalRef = [];
  const inspectrefMap = {};

  // istanbul ignore else
  if (item.linetype_maxvalue !== STDSERVICE) {
    let localReceiptTransactions = {};
    // istanbul ignore else
    if (isMaximoMobile) {
      // const apireceiptDS = getDatasourceCopy(
      //   `${item.ponum}-${item.polinenum}`,
      //   mobilerecds
      // );
      // await apireceiptDS.initializeQbe();
      // apireceiptDS.setQBE("ponum", "=", item.ponum);
      // //apireceiptDS.setQBE("positeid", "=", item.positeid);
      // apireceiptDS.setQBE("polinenum", "=", item.polinenum);
      // localReceiptTransactions = await apireceiptDS.searchQBE();
      localReceiptTransactions = mobilerecds.items.filter(
        (i) =>
          i.ponum === item.ponum &&
          i.polinenum === item.polinenum &&
          (!i.errored || i.errored === 0)
      );
    }

    // istanbul ignore else
    if (isMaximoMobile) {
      matrectransds.items.forEach((receipt) => {
        // istanbul ignore else
        if (receipt.polinenum === item.polinenum) {
          externalRef.push(`${receipt.sourcesysid}|${receipt.externalrefid}`);
        }
      });
    }

    matrectransds.items.forEach((receipt) => {
      // istanbul ignore else
      if (receipt.polinenum === item.polinenum) {
        let conversionFactor = receipt.conversion;
        // istanbul ignore else
        if (conversionFactor === 0) {
          conversionFactor = 1;
        }
        // istanbul ignore else
        if (
          [RECEIPT, RETURN, VOIDRECEIPT].includes(receipt.issuetype_maxvalue)
        ) {
          receiptQty -= receipt.quantity / conversionFactor;
        }

        // istanbul ignore else
        if (receipt.status_maxvalue === WINSP) {
          inspectrefMap[receipt.matrectransid] = buildInspectItem(
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
              // istanbul ignore else
              if (apireceipt.inspected && apireceipt.rejectqty) {
                receiptQty = Number(receiptQty) + Number(apireceipt.rejectqty);
              }
              // istanbul ignore else
              if (apireceipt.issuetype === RETURN) {
                receiptQty =
                  Number(receiptQty) + Number(apireceipt.receiptquantity);
              }
              // istanbul ignore else
              if (apireceipt.issuetype === VOIDRECEIPT) {
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
                  [RECEIPT, VOIDRECEIPT].includes(apireceipt.issuetype) &&
                  apireceipt.inspectionrequired === true)
              ) {
                tempcount =
                  tempcount -
                  Number(apireceipt.acceptedqty) -
                  Number(apireceipt.rejectqty);
                // istanbul ignore else
                if (apireceipt.issuetype === VOIDRECEIPT) {
                  tempcount = tempcount - apireceipt.receiptquantity * -1;
                }

                if (tempcount > 0) {
                  inspectrefMap[receipt.matrectransid] = buildInspectItem(
                    item,
                    tempcount,
                    apireceipt.inspectedqty,
                    apireceipt.conversion,
                    receipt.externalrefid,
                    apireceipt.matrectransid,
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
            if ([RECEIPT, RETURN, VOIDRECEIPT].includes(receipt.issuetype)) {
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
                  [RECEIPT, RETURN, VOIDRECEIPT].includes(receipt2.issuetype)
                ) {
                  // istanbul ignore else
                  if (receipt2.inspected) {
                    receiptQty = receiptQty * 1 + receipt2.rejectqty * 1;
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
                  // istanbul ignore else
                  if (receipt2.issuetype === RETURN) {
                    receiptQty += Number(receipt2.receiptquantity);
                  }
                  // istanbul ignore else
                  if (receipt2.issuetype === VOIDRECEIPT) {
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
              inspectrefMap[tempid] = buildInspectItem(
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
      result[RECEIVE_PAGE].push(buildReceiveItem(item, receiptQty));
    }

    for (const key in inspectrefMap) {
      // istanbul ignore else
      if (inspectrefMap[key]) {
        result[INSPECT_PAGE].push(inspectrefMap[key]);
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

const buildAssetItem = (item, id) => {
  return {
    ...item,
    _id: id,
  };
};

const buildReceiveItem = (item, quantity) => {
  return {
    ...item,
    positeid: item.siteid,
    porevisionnum: item.revisionnum,
    receiptquantity: quantity,
    receiptquantity_old: quantity,
  };
};

const buildReturnVoidItem = (item, quantity, matrec, id) => {
  return {
    ...item,
    positeid: item.siteid,
    qtyrequested: quantity,
    inspecasntedqtydsply: item.asn,
    orgrcvexternalrefid: matrec.externalrefid,
    tolot: matrec.tolot,
    actualdate: matrec.actualdate,
    conditioncode: matrec.conditioncode,
    _id: id,
  };
};

const buildInspectItem = (
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
    positeid: item.siteid,
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

const buildReceiptItem = (
  item,
  description,
  id,
  result_RECEIPT_PAGE,
  isFromMXRecept
) => {
  let itemStatus = item.status;
  let objReturned = {
    ...item,
    description: description,
    status: itemStatus,
    _id: id,
  };
  let needsAdditionalRecord = false;
  if (isFromMXRecept) {
    if (item.issuetype === RECEIPT) {
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
            existingrec.actualdate = item.actualdate;
          }
        }
        // istanbul ignore else
        if (Number(item.acceptedqty) > 0) {
          result_RECEIPT_PAGE.push({
            ...item,
            issuetype: TRANSFER,
            description: description,
            status: COMP,
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
            issuetype: RETURN,
            description: description,
            status: COMP,
            receiptquantity: rejectqty,
            _id: PostRequestUtil.generateUniqueIDDefault(),
          });
        }
      } else {
        if (!item.orgrcvexternalrefid) {
          // for receive transaction
          if (item.inspectionrequired) {
            itemStatus = WINSP;
          } else {
            itemStatus = COMP;
          }
          result_RECEIPT_PAGE.push({
            ...item,
            description: description,
            status: itemStatus,
            _id: id,
          });
        }
      }
    } else if (item.issuetype === RETURN || item.issuetype === VOIDRECEIPT) {
      // For Return.
      itemStatus = item.issuetype;
      let qty = item.receiptquantity;
      if (item.issuetype === RETURN) {
        qty = qty * -1;
      }
      result_RECEIPT_PAGE.push({
        ...item,
        description: description,
        status: COMP,
        receiptquantity: qty,
        _id: id,
      });
    }
  } else {
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
  buildReceiveItem,
  buildInspectItem,
  buildAssetItem,
  buildReturnVoidItem,
  buildReceiptItem,
  calculateReturnQty,
  loadjsonds,
  resetDataSource,
};

export default functions;
