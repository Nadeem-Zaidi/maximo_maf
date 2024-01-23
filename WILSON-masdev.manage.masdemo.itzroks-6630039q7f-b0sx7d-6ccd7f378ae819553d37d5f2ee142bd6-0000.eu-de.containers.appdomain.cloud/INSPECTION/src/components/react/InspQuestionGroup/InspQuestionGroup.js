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
import QuestionGroup from '../../../container/QuestionGroup/QuestionGroup';
import withCompletion from '../../../hoc/withCompletion';
import withRequired from '../../../hoc/withRequired';
import withVisible from '../../../hoc/withVisible';
import withFiltered from '../../../hoc/withFiltered';
import refStore from '../../../stores/refStore';
import {checkCompletion, resetFiltered} from '../../common/utils';

import {ui03, blue60} from '../../common/palette';

const TAG = 'InspQuestionGroup';

class InspQuestionGroup extends React.Component {
  constructor(props) {
    super(props);
    resetFiltered(props.questionGroup);
    this.childCompletionHandler = this.childCompletionHandler.bind(this);
    this.childRequiredChangeHandler = this.childRequiredChangeHandler.bind(
      this
    );
    this.childVisibleHandler = this.childVisibleHandler.bind(this);
    this.childFilteredHandler = this.childFilteredHandler.bind(this);
    props.registerChangeHandler(() => {});
    props.registerInstance(props.questionGroup);
    props.registerRequiredChangeCallback(() => {});
    props.registerRequiredInstance(props.questionGroup);
    props.registerVisibleChangeCallback(() => {});
    props.registerVisibleInstance(props.questionGroup);
    props.registerFilteredChangeCallback(() => {});
    props.registerFilteredInstance(props.questionGroup);
    this.device = Device.get();
  }

  componentDidMount() {
    this.childCompletionHandler();
    this.childVisibleHandler();
    this.childRequiredChangeHandler();
    this.childFilteredHandler();
  }

  componentDidUpdate() {
    this.childCompletionHandler();
    this.childVisibleHandler();
    this.childRequiredChangeHandler();
    this.childFilteredHandler();
  }

  componentWillUnmount() {
    const {questionGroup} = this.props;
    refStore.removeQuestionRef(questionGroup.inspquestionid);
  }

  /**
   * Handle completed inspquestionchild to call setCompletion callback
   */
  childCompletionHandler() {
    const isComplete = checkCompletion(
      this.props.questionGroup.inspquestionchild
    );
    this.props.setCompletion(isComplete);
  }

  /**
   * Check if there is at least one required inspquestionchild
   * @param {Object} children - inspection inspquestionchild data
   * @returns {Boolean} true if there is at least one required inspquestionchild, false otherwise
   */
  checkRequired(children = []) {
    return children.some(field => field.required === true);
  }

  /**
   * Handle required inspquestionchild to call setRequired callback
   */
  childRequiredChangeHandler() {
    const isRequired = this.checkRequired(
      this.props.questionGroup.inspquestionchild
    );
    this.props.setRequired(isRequired);
  }

  /**
   * Check if all fields are visible
   * @param {Object} children - inspection inspquestionchild data
   * @returns {Boolean} true if all children are not visible, false otherwise
   */
  checkVisible(children = []) {
    return children.length
      ? !children.every(item => item.visible === false)
      : true;
  }

  /**
   * Handle visible inspquestionchild to call setVisible callback
   */
  childVisibleHandler() {
    const isVisible = this.checkVisible(
      this.props.questionGroup.inspquestionchild
    );
    this.props.setVisible(isVisible);
  }
  /**
   * Check if some fields are filtered
   * @param {Object} children - inspection inspquestionchild data
   * @returns {Boolean} true if at least one child is filtered
   */
  checkFiltered(children = []) {
    return children.length
      ? children.some(
          item => item.filtered === true || item.filtered === undefined
        )
      : false;
  }

  /**
   * Handle visible inspquestionchild to call setFiltered callback
   */
  childFilteredHandler() {
    const isFiltered = this.checkFiltered(
      this.props.questionGroup.inspquestionchild
    );
    this.props.setFiltered(isFiltered);
  }

  render() {
    const isEdgeLegacy = this.device.browser.isEdgeLegacy;
    const {questionGroup, showInfo} = this.props;
    const ref = refStore.getQuestionRef(questionGroup.inspquestionid, true);
    const id = `${this.props.id}_qg`;

    log.d(TAG, `Render group ${questionGroup.description}`);

    const questionGroupCore = (
      <QuestionGroup
        questionList={questionGroup.inspquestionchild?.sort((a, b) => a.sequence - b.sequence)}
        completionChanged={this.childCompletionHandler}
        requiredChanged={this.childRequiredChangeHandler}
        visibleChanged={this.childVisibleHandler}
        filteredChanged={this.childFilteredHandler}
        showInfo={showInfo}
        id={id}
      />
    );

    const questionGroupStyle = {
      borderBottom: `1px solid ${ui03}`,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      margin: '0.5rem 0.5rem 0 0.5rem',
      paddingBlockEnd: '1rem'
    };

    return (
      <div
        id={`${questionGroup.inspquestionid}_questionGroup_outer_wrapper`}
        style={{
          display:
            this.props.isVisible && this.props.isFiltered ? '' : 'none',
            width: '100%'
        }}
      >
        <Box
          direction='column'
          backgroundColor={'field-01'}
          horizontalAlign='stretch'
          marginBottom={'0.75'}
          fillParent={true}
          key={questionGroup.inspquestionid}
          id={`${questionGroup.inspquestionid}_questionGroup_box_wrapper`}
          style={{padding: '0.5rem 0 0 0.5rem'}}
        >
          <div
            id={`${questionGroup.inspquestionid}_questionGroup_ref`}
            ref={ref}
            style={{
              scrollMarginTop: !isEdgeLegacy ? '8rem' : '',
              paddingTop: isEdgeLegacy ? '8rem' : '',
              marginTop: isEdgeLegacy ? '-8rem' : '',
            }}
          />
          <div
            id={`${questionGroup.inspquestionid}_questionGroup_wrapper`}
            style={questionGroupStyle}
          >
            <Box
              direction='row'
              verticalAlign='center'
              id={`${questionGroup.inspquestionid}_questionGroup_box_groupseq`}
              manageChildren={false}
              minWidth='3.75rem'
              style={{flexShrink: 0}}
            >
              {this.props.isComplete ? (
                <Icon
                  id={`${questionGroup.inspquestionid}_questionGroup_checkmark_icon`}
                  icon={'carbon:checkmark--outline'}
                  fill='green'
                />
              ) : (
                <Label
                  label={`${questionGroup.groupseq}.`}
                  id={`${questionGroup.inspquestionid}_questionGroup_groupseq_label`}
                  theme={'header-large'}
                  padding='none'
                />
              )}
            </Box>
            <Box
              direction='row'
              verticalAlign='center'
              manageChildren={false}
              id={`${questionGroup.inspquestionid}_questionGroup_box_label`}
              minWidth='1.25rem'
            >
              {this.props.isRequired ? (
                <Box
                  minWidth='1.25rem'
                  id={`${questionGroup.inspquestionid}_questionGroup_box_icon`}
                >
                  <Icon
                    id={`${questionGroup.inspquestionid}_questionGroup_icon`}
                    icon={'maximo:dot'}
                    fill={blue60}
                    size='20'
                  />
                </Box>
              ) : null}
              {questionGroup.description ? (
                <WrappedText
                  label={questionGroup.description}
                  id={`${questionGroup.inspquestionid}_questionGroup_description_label`}
                  size='medium'
                />
              ) : null}
            </Box>

            <Box
              direction='row'
              verticalAlign='center'
              manageChildren={false}
              id={`${questionGroup.inspquestionid}_questionGroup_box_information_icon`}
              style={{marginLeft: 'auto', paddingRight: '0.5rem'}}
            >
              <Button
                id={`${questionGroup.inspquestionid}_questionGroup_info_button`}
                kind='ghost'
                size='small'
                iconName='carbon:information'
                padding={false}
                onClick={() =>
                  showInfo({
                    type: 'question',
                    questionId: questionGroup.inspquestionid
                  })
                }
                hidden={!questionGroup.hasld}
              />
            </Box>
          </div>
          <Box
            direction='column'
            fillChild={true}
            style={{
              paddingInlineStart: '2.5rem',
              paddingInlineEnd: '0.5rem',
              paddingBlockEnd: '0.5rem'
            }}
            id={`${questionGroup.inspquestionid}_questionGroup_question_wrapper`}
          >
            {questionGroupCore}
          </Box>
        </Box>
      </div>
    );
  }
}

InspQuestionGroup.propTypes = {
  questionGroup: PropTypes.object,
  id: PropTypes.string.isRequired,
  showInfo: PropTypes.func
};

// Set default props
InspQuestionGroup.defaultProps = {
  questionGroup: {},
  showInfo: () => {}
};

export default withFiltered(
  withCompletion(withVisible(withRequired(BaseComponent(InspQuestionGroup))))
);
