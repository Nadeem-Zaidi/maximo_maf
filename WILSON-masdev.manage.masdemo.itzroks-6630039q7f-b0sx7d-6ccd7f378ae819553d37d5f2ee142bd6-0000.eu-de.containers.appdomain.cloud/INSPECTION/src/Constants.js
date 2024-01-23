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

export const STATUS = {
    CAN: 'CAN',
    COMPLETED: 'COMPLETED',
    INPROG: 'INPROG',
    PENDING: 'PENDING',
    REVIEW: 'REVIEW'
}

export const FIELDS = {
    FORMATTED_GROUP_SEQ:'formattedGroupSeq',
    COMPLETED: 'completed',
    REQUIRED: 'required',
    INVALID: 'invalid',
    VISIBLE: 'visible',
    FILTERED:'filtered',
    ID: '_id',
    REJECTED: 'rejected',
    INFERENCESTATUS: 'inferencestatus',
    NEWURL: 'newurl'
}

export const INSPECTION_RESPONSE_PROPS ={
    responseProperties: 'inspfieldresultid,href,inspfieldresultselection{txtresponse,inspfieldresultselectionid,anywhererefid},anywhererefid,errorflag,errormessage,inspfieldnum,inspfieldresultnum,inspformnum,inspquestionnum,orgid,resultnum,revision,siteid,txtresponse,numresponse,dateresponse,timeresponse,readconfirmation,rolloverflag,doclinks{*},actionrequired,plussgeojson,metername,inspectionimageinference{*}'
};