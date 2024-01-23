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

import {icons, colors} from '../InspField/IconsAndColors';

/**
 * Default schema used to build options
 * for single and multiple choice field inputs
 */
export const defaultSchema = {
  pk: ['id'],
  properties: {
    id: {
      type: 'string',
      title: 'ID',
      subtype: 'ALN',
      persistent: true,
      searchType: 'WILDCARD',
      remarks: 'Record ID'
    },
    innerid: {
      type: 'string',
      title: 'ID',
      subtype: 'ALN',
      persistent: true,
      searchType: 'WILDCARD',
      remarks: 'Record ID'
    },
    label: {
      type: 'string',
      title: 'Label',
      subtype: 'ALN',
      persistent: true,
      searchType: 'WILDCARD',
      remarks: 'Description to be displayed'
    },
    value: {
      type: 'string',
      title: 'Value',
      subtype: 'ALN',
      persistent: true,
      searchType: 'WILDCARD',
      remarks: 'Record description value'
    },
    inspectorfeedback: {
      type: 'boolean',
      name: 'inspectorFeedback',
      title: 'Feedback',
      subtype: 'YORN',
      persistent: true,
      searchType: 'EXACT',
      default: false,
      remarks: 'Option feedback when selected'
    },
    selectedicon: {
      type: 'string',
      title: 'Selected Icon',
      name: 'selectedIcon',
      subtype: 'ALN',
      persistent: true,
      searchType: 'WILDCARD',
      default: '',
      remarks: 'Icon to display when option is selected'
    },
    unselectedicon: {
      type: 'string',
      title: 'Unselected Icon',
      name: 'unselectedIcon',
      subtype: 'ALN',
      persistent: true,
      searchType: 'WILDCARD',
      default: '',
      remarks: 'Icon to display when option is not selected'
    },
    theme: {
      type: 'string',
      title: 'Theme',
      subtype: 'ALN',
      persistent: false,
      searchType: 'WILDCARD',
      default: '',
      remarks: 'Record theme'
    },
    checked: {
      type: 'boolean',
      title: 'Checked',
      subtype: 'YORN',
      persistent: false,
      searchType: 'EXACT',
      default: false,
      remarks: 'Record selection state'
    }
  }
};

/**
 * Constants used to configure datasource
 */
export const attributes = {
  tagDisplay: 'value',
  selected: 'checked',
  lookup: ['value']
};

/**
 *
 * @param {string} id
 * @param {fn} isCheckedFn
 * @returns function to provide to Array.map API
 */
export const optionsMap = (id, isCheckedFn) => option => {
  const {tagDisplay, selected} = attributes;

  const displayValue = option.value ? option.value : option.description;
  const idSuffix = option?.inspfieldoptionid || displayValue;
  const labelValue = option.description ? option.description : option.value;

  return {
    id: `optionid${idSuffix}`,
    label: labelValue,
    [selected]: isCheckedFn(option),
    [tagDisplay]: displayValue,
    theme: option.color && colors[option.color],
    selectedIcon: option.icon && icons[option.icon].selectedIcon,
    unselectedIcon: option.icon && icons[option.icon].unselectedIcon,
    inspectorFeedback: option.inspectorfeedback
  };
};
