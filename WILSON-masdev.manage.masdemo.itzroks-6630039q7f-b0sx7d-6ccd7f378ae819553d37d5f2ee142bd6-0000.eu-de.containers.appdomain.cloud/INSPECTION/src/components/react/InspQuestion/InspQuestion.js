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
import {
  Label,
  Box,
  Button,
  Icon,
  WrappedText,
  BaseComponent
} from '@maximo/react-components';
import {Device, log} from '@maximo/maximo-js-api';

import PropTypes from 'prop-types';
import withCompletion from '../../../hoc/withCompletion';
import withRequired from '../../../hoc/withRequired';
import withVisible from '../../../hoc/withVisible';
import withFiltered from '../../../hoc/withFiltered';

import FieldGroup from '../../../container/FieldGroup/FieldGroup';
import questionCounter from '../../../stores/questionCounter';
import refStore from '../../../stores/refStore';
import {
  filterValidChildren,
  checkCompletion,
  checkRejection,
  resetFiltered,
} from '../../common/utils';

import {ui03, blue60} from '../../common/palette';

const TAG = 'InspQuestion';

class InspQuestion extends React.Component {
  constructor(props) {
    super(props);
    resetFiltered(props.question);
    this.childUpdateHandler = this.childUpdateHandler.bind(this);
    this.checkFiltered = this.checkFiltered.bind(this);
    props.registerChangeHandler(props.completionChanged);
    props.registerInstance(props.question);
    props.registerRequiredChangeCallback(props.requiredChanged);
    props.registerRequiredInstance(props.question);
    props.registerVisibleChangeCallback(props.visibleChanged);
    props.registerVisibleInstance(props.question);
    props.registerFilteredChangeCallback(props.filteredChanged);
    props.registerFilteredInstance(props.question);
    this.device = Device.get();
    this.state = {
      reject: false
    };
  }

  componentDidMount() {
    const {question} = this.props;

    const required = this.checkRequired(question.inspfield);
    this.props.setRequired(required);

    const visible = this.checkVisible(question.inspfield);
    this.props.setVisible(visible);

    const isComplete = checkCompletion(question.inspfield);
    this.props.setCompletion(isComplete);

    const isRejected = checkRejection(question.inspfield);
    this.setState({reject: isRejected});

    questionCounter.update(question.inspquestionid, {
      [questionCounter.visibleAtt]: visible,
      [questionCounter.requireAtt]: required,
      [questionCounter.completeAtt]: isComplete,
      [questionCounter.rejectAtt]: isRejected
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {question, isVisible, isRequired, isComplete} = this.props;
    const {reject: isRejected} = this.state;

    questionCounter.update(question.inspquestionid, {
      [questionCounter.visibleAtt]: isVisible,
      [questionCounter.requireAtt]: isRequired,
      [questionCounter.completeAtt]: isComplete,
      [questionCounter.rejectAtt]: isRejected
    });
  }

  componentWillUnmount() {
    const {question} = this.props;
    refStore.removeQuestionRef(question.inspquestionid);
    questionCounter.remove(question.inspquestionid);
  }

  /**
   * Check if there is at least one required field
   * @param {Array} fields - inspection inspfield data
   * @returns {Boolean} true if there is at least one required field, false otherwise
   */
  checkRequired(fields = []) {
    return fields.some(
      field => field.invalid !== true && field.required === true
    );
  }

  /**
   * Check if all fields visible
   * @param {Array} fields - inspection inspfield data
   * @returns {Boolean} true if all fields are not visible, false otherwise
   */
  checkVisible(children = []) {
    return children.length
      ? !children.every(item => item.visible === false)
      : true;
  }

  checkFiltered(children = []) {
    const validChildren = filterValidChildren(children);
    return validChildren.length
      ? validChildren.every(
          item => item.filtered === true || item.filtered === undefined
        )
      : false;
  }

  /**
   * Handle child mutation based on
   * visible, required and complete attributes
   * @param {Object} mutation - mutation object
   * @param {boolean | undefined} mutation.required - required mutation
   * @param {boolean | undefined} mutation.visible - visible mutation
   * @param {boolean | undefined} mutation.complete - complete mutation
   */
  childUpdateHandler(params) {
    const {question} = this.props;
    const {required, visible, complete, filter, rejected} = params;

    const hasMutation = [required, visible, complete, filter, rejected].some(
      i => i !== undefined
    );

    //istanbul ignore else
    if (hasMutation) {
      const isRequired = this.checkRequired(question.inspfield);
      this.props.setRequired(isRequired);

      const isVisible = this.checkVisible(question.inspfield);
      this.props.setVisible(isVisible);

      const isComplete = checkCompletion(question.inspfield);
      this.props.setCompletion(isComplete);

      const isRejected = checkRejection(question.inspfield);
      this.setState({reject: isRejected});

      let isFiltered;
      if (filter) {
        isFiltered = filter(question);
        this.props.setFiltered(isFiltered);
      } else {
        //set initial filtered
        isFiltered = this.checkFiltered(question.inspfield);
        this.props.setFiltered(isFiltered);
      }
    }
  }

  /**
   * Format question group sequence
   * @param {Object} question
   */
  formattedGroupSeq(question) {
    question.formattedGroupSeq = (question.groupid && question.sequence)
      ? `${question.groupid}.${question.sequence}`
      : question.groupseq;
    return question.formattedGroupSeq;
  }

  render() {
    const isEdgeLegacy = this.device.browser.isEdgeLegacy;
    const {question, firstLevel, showInfo} = this.props;
    const {inspfield} = question;

    log.d(TAG, `Render question ${question.description}`);

    const ref = refStore.getQuestionRef(question.inspquestionid, true);

    const id = `${this.props.id}_fg`;

    const fieldGroup = (
      <FieldGroup
        fields={inspfield?.sort((a, b) => a.sequence - b.sequence)}
        fieldChangeHandler={this.childUpdateHandler}
        id={id}
      />
    );

    const questionStyle = {
      borderBottom: `1px solid ${ui03}`,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: firstLevel ? '0 0 1rem 0' : '0.5rem 0 0.5rem 0.5rem',
      margin: firstLevel ? '0.5rem 0.5rem 0 0.5rem' : '0'
    };

    return (
      <div
        id={`${question.inspquestionid}_question_outer_wrapper`}
        style={{
          display: this.props.isVisible && this.props.isFiltered ? '' : 'none',
          width: '100%'
        }}
      >
        <Box
          direction='column'
          backgroundColor={'field-01'}
          horizontalAlign='stretch'
          id={`${question.inspquestionid}_question_box_wrapper`}
          key={`${question.inspquestionid}`}
          fillParent={true}
          style={{padding: '0.5rem'}}
          marginBottom={firstLevel ? '0.75' : '0'}
        >
          <div
            ref={ref}
            id={`${question.inspquestionid}_question_ref`}
            style={{
              scrollMarginTop: !isEdgeLegacy ? '8rem' : '',
              paddingTop: isEdgeLegacy ? '8rem' : '',
              marginTop: isEdgeLegacy ? '-8rem' : ''
            }}
          />
          <div
            id={`${question.inspquestionid}_question_wrapper`}
            style={questionStyle}
          >
            <Box
              direction='row'
              verticalAlign='center'
              id={`${question.inspquestionid}_question_box_groupseq`}
              manageChildren={false}
              minWidth={firstLevel ? '3.75rem' : '4rem'}
              style={{flexShrink: 0}}
            >
              {this.props.isComplete ? (
                <Icon
                  id={`${question.inspquestionid}_question_checkmark_icon`}
                  icon={'carbon:checkmark--outline'}
                  fill='green'
                />
              ) : (
                <Label
                  label={`${this.formattedGroupSeq(question)}.`}
                  id={`${question.inspquestionid}_question_groupseq_label`}
                  theme={firstLevel ? 'header-large' : 'medium'}
                  padding='none'
                />
              )}
            </Box>
            <Box
              direction='row'
              verticalAlign='center'
              manageChildren={false}
              id={`${question.inspquestionid}_question_box_label`}
              style={{whiteSpace: 'pre-wrap'}}
            >
              {question.required ? (
                <Box
                  minWidth='1.25rem'
                  id={`${question.inspquestionid}_question_box_icon`}
                >
                  <Icon
                    id={`${question.inspquestionid}_question_icon`}
                    icon={'maximo:dot'}
                    fill={blue60}
                    size='20'
                  />
                </Box>
              ) : null}
              {question.description ? (
                <WrappedText
                  label={question.description}
                  id={`${question.inspquestionid}_question_description_label`}
                  size='medium'
                />
              ) : null}
            </Box>

            <Box
              direction='row'
              verticalAlign='center'
              horizontalAlign='end'
              manageChildren={false}
              id={`${question.inspquestionid}_question_box_info`}
              style={{marginLeft: 'auto'}}
            >
              <Button
                id={`${question.inspquestionid}_question_info_button`}
                kind='ghost'
                size='small'
                iconName='carbon:information'
                padding={false}
                onClick={() =>
                  showInfo({
                    type: 'question',
                    groupId: !firstLevel ? question.groupid : '',
                    questionId: question.inspquestionid
                  })
                }
                hidden={!question.hasld}
              />
            </Box>
          </div>
          <Box
            fillChild={true}
            horizontalAlign='stretch'
            marginTop={firstLevel ? '0' : '0.5'}
            id={`${question.inspquestionid}_question_field_wrapper`}
            direction='column'
            style={{padding: firstLevel ? '0.5rem' : '0'}}
          >
            {fieldGroup}
          </Box>
        </Box>
      </div>
    );
  }
}

InspQuestion.propTypes = {
  question: PropTypes.object,
  id: PropTypes.string.isRequired,
  showInfo: PropTypes.func
};

// Set default props
InspQuestion.defaultProps = {
  question: {},
  showInfo: () => {}
};

export default withFiltered(
  withVisible(withRequired(withCompletion(BaseComponent(InspQuestion))))
);
