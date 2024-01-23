/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import React from 'react';

import { mount } from 'enzyme';

import QuestionGroup from './QuestionGroup';

const setup = ({questionList} = [], updateValue = () => {}) => {
  const wrapper = mount(
    <QuestionGroup id={'questionGroupId1'} questionList={questionList} />
  );
  return wrapper;
};

it('should render without errors', () => {
    const wrapper = setup();
    const container = wrapper.find('QuestionGroup');
    expect(container.length).toBe(1);
});

it('should render group and question', () => {
    const questionList = [
        {
            inspquestionnum: 1,
            inspquestionchild: []
        },
        {inspquestionnum: 2}
    ]
    const wrapper = setup({questionList});
    const questions = wrapper.find('InspQuestion');
    const questionGroups = wrapper.find('InspQuestionGroup');
    expect(questions.length).toBe(1);
    expect(questionGroups.length).toBe(1);
});
