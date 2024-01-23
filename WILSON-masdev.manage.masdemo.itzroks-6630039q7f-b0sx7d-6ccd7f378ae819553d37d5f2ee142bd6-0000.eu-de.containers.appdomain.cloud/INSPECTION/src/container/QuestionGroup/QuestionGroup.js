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
import PropTypes from 'prop-types';

import {log} from '@maximo/maximo-js-api';
import {BaseComponent} from '@maximo/react-components';

import { isGroupQuestion } from '../../components/common/utils';
import InspQuestionGroup from '../../components/react/InspQuestionGroup/InspQuestionGroup';
import InspQuestion from '../../components/react/InspQuestion/InspQuestion';
import { Observer } from 'mobx-react';


const TAG = 'QuestionGroup';

/**
 * A `QuestionGroup` is container to accommodate list of inspection questions.
 */
class QuestionGroup extends React.Component {

  render() {

    log.d(TAG, `Render`);

    const {id, questionList, isFirstLevel, ...passThroughProps} = this.props;

    return questionList.map(question => 
        <Observer
          key={question.inspquestionid}
        >{() => 
          isGroupQuestion(question) ? 
            <InspQuestionGroup
              {...passThroughProps}
              id={`${id}_questionid${question.inspquestionid}`}
              key={question.inspquestionnum}
              questionGroup={question}
            />
            :
            <InspQuestion
              {...passThroughProps}
              id={`${id}_questionid${question.inspquestionid}`}
              key={question.inspquestionnum}
              question={question}
              firstLevel={isFirstLevel}
            />
        }</Observer>
      )
  }

}

QuestionGroup.propTypes = {
  id: PropTypes.string.isRequired,
  questionList: PropTypes.array.isRequired,
  isFirstLevel: PropTypes.bool
}

// Set default props
QuestionGroup.defaultProps = {
  questionList: [],
  isFirstLevel: false
};


export default BaseComponent(QuestionGroup);
