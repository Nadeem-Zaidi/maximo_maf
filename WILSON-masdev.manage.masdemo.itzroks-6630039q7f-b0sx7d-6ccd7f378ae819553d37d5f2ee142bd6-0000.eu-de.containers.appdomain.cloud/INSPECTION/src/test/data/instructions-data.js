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

export const inspFormInstructions = {
  member: [
    {
      computedFormName: 'Form Instructions Question',
      computedAsset: 'Asset123 AssetDesc',
      computedLocation: '',
      computedLongDescription: '<p>Instructions Form</p>'
    }
  ]
};

export const formInfo = {
  member: [
    {
      computedFormName: 'Form Instructions Question',
      computedAsset: 'Asset123 AssetDesc',
      computedLocation: '',
      inspformnum: '1007',
      computedLongDescription: '<p>Instructions Form</p>'
    }
  ]
};

export const questionInfo = {
  member: [
    {
      inspquestionid: '001',
      description_longdescription: '<p>Instructions Question1</p>',
      inspquestionnum: '1001',
      description: 'Question1',
      groupseq: 1,
      required: false,
      langcode: 'EN',
      sequence: 1
    }
  ]
};

export const inspFormQuestionInfo = {
  member: [
    {
      inspectionresultid: '1001',
      inspectionform: {},
      inspquestionsgrp: [
        {
          inspquestionid: '001',
          groupid: '001',
          description_longdescription: '<p>Instructions Question1</p>',
          description: 'Question1',
          inspquestionchild: [
            {
              inspquestionid: '001',
              groupid: '001',
              description_longdescription: '<p>Instructions Question1</p>',
              description: 'Question1'
            }
          ]
        }
      ]
    }
  ]
};
