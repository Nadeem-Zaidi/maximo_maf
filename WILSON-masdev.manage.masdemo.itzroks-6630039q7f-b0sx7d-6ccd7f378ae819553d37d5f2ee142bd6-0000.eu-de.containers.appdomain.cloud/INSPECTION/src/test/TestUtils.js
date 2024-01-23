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


export const generate = (count, attrs, rowFunc, dataFunc) => {

    const data = {
        items: [],
        schema: {
            properties: {
                itemnum: {
                    type: 'string',
                    title: 'Item Number',
                    persistent: true
                }
            }
        }
    }

    for (let index = 0; index < count; index++) {
        let item = {
            itemnum: `mckd_${index.toFixed(5)}`,
            inspectionresultid: index,
            inspfieldresult: [
                {
                    href: 'temp',
                    inspformnum: '1',
                    revision: '1',
                    resultnum: '1',
                    orgid: 'ibm',
                    siteid: 'test',
                    inspfieldnum: '1',
                    inspquestionnum: '1',
                    txtresponse: null,
                    numresponse: null,
                    enteredby:  'test',
                    entereddate: new Date(),
                    inspfieldresultselection: []
                  }
            ],
            _id: index
        };

        data.items.push(item);
    }
    return data;
}
