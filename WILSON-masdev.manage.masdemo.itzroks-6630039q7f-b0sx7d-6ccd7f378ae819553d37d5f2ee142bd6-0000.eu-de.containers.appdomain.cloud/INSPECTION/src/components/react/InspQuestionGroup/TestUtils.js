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

export const withTwoQuestions = {
  inspquestionid: 662,
  groupid: 1,
  inspquestionnum: '1053',
  description: 'Question Group 1',
  groupseq: 1,
  inspquestionchild: [
    {
      inspquestionid: 660,
      inspfield: [
        {
          description: 'Field 1',
          fieldtype: 'TR',
          fieldtype_maxvalue: 'TR',
          inspfieldid: 617,
          inspquestionnum: '1049',
          inspfieldnum: '1',
          visible: true
        }
      ],
      inspquestionnum: '1049',
      description: 'Question 1',
      groupseq: 1.01,
      groupid: 1,
      sequence:1
    },
    {
      inspquestionid: 661,
      inspfield: [
        {
          description: 'Field 1',
          fieldtype: 'TR',
          fieldtype_maxvalue: 'TR',
          inspfieldid: 618,
          inspquestionnum: '1050',
          inspfieldnum: '2',
          visible: true
        }
      ],
      inspquestionnum: '1050',
      description: 'Question 2',
      groupseq: 1.02,
      groupid: 1,
      sequence:2
    }
  ]
};

export const getQuestionTemplate = (id = 1, num = '0001') => ({
  inspquestionid: id,
  inspquestionnum: num
});

