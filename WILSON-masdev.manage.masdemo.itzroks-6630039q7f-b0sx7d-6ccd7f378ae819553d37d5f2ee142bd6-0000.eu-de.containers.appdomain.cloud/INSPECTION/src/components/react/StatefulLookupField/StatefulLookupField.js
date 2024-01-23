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

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  BaseComponent,
  Lookup,
  Button,
  TagGroup,
  Label
} from '@maximo/react-components';

import {
  UserInteractionManager,
  Datasource,
  JSONDataAdapter,
  log,
  AppSwitcher,
  Dialog
} from '@maximo/maximo-js-api';

import {
  defaultSchema,
  attributes
} from '../AdaptiveSelectorInput/SelectorUtils';

const TAG = 'StatefulLookupField';

export const SelectModeEnum = {
  SINGLE: 0,
  MULTIPLE: 1
};

const {
  lookup: attributeArray,
  tagDisplay: tagDisplayAttribute,
  selected: selectedAttribute
} = attributes;

/**
 * StatefulLookup provides lookup plus list of selected options.
 */
class StatefulLookupField extends Component {
  constructor(props) {
    super(props);
    this.getDS = this.getDS.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.loadDS = this.loadDS.bind(this);
    this.state = {
      datasource: this.getDS(),
      selectedItems: []
    };
  }

  componentDidMount() {
    this.loadDS(this.state.datasource, this.props.options);
  }

  /**
   * Load datasource with data provided.
   * In addition, manually selects records
   * @param {*} ds
   * @param {*} options
   */
  async loadDS(ds, options) {
    await ds.load();

    const selected = [];
    // Manual selection to reflect lookup
    for (const index in options) {
      const option = options[index];
      if (option[selectedAttribute] === true) {
        ds.setSelected(index, true);
        selected.push(option);
      }
    }
    this.setState({selectedItems: selected});
  }

  /**
   * Determines type of selection. Single or Multi.
   * @param {number} selectionMode
   * @returns {string} selection mode
   */
  getSelectionMode(selectionMode) {
    const mode =
      selectionMode === SelectModeEnum.SINGLE ? 'single' : 'multiple';
    return mode;
  }

  /**
   * Build a generic datasource to accommodate options provided.
   * @returns
   */
  getDS() {
    const {selectionMode, options, id} = this.props;
    const selectMode = this.getSelectionMode(selectionMode);

    const data = {
      items: options.sort((optionA, optionB) => {
        if (optionA.id < optionB.id) {
          return -1;
        }
        return 1;
      }),
      schema: defaultSchema
    };

    log.i(TAG, `Building Datasource as ${selectMode} mode`);

    let dataSource = new Datasource(new JSONDataAdapter({src: data}), {
      name: `${id}_dummyDS`,
      selectionMode: selectMode,
      idAttribute: 'id',
      selectedAttribute: selectedAttribute,
      clearSelectionOnSearch: false
    });

    return dataSource;
  }

  /**
   * Handles both multiple selection and single
   * @param {*} item
   */
  itemClick(item) {
    const {onChange} = this.props;
    const {datasource} = this.state;

    const selected = datasource.getSelectedItems();

    log.i(TAG, `${selected.length} records selected`);
    this.setState({selectedItems: selected});
    /* istanbul ignore else */
    if (onChange && typeof onChange === 'function') {
      onChange(item);
    }
  }

  /**
   * Handle lookup opening
   * @param {*} item
   */
  openLookup(lookup) {
    const lookupConfig = {
      id: 'lookup1',
      renderer: lookup.lookup1
    };
    const UIM = UserInteractionManager.get();
    const app = AppSwitcher.get();
    const page = app?.currentApp?.currentPage;

    /* istanbul ignore if */
    if (page && !page.hasDialog(lookupConfig.id)) {
      const dialog = new Dialog({
        name: lookupConfig.id,
        configuration: lookupConfig
      });
      page.registerDialog(dialog);
    }
    UIM.showDrawer(lookupConfig);
  }

  render() {
    const {
      id,
      lookupHeading,
      showCount,
      showSearch,
      required,
      label,
      i18n,
      readonly
    } = this.props;
    const {datasource, selectedItems} = this.state;

    const tags = selectedItems.map(selectedItem => ({
      label: selectedItem[tagDisplayAttribute]
    }));

    /* istanbul ignore next */
    const lookup = {
      lookup1: props => {
        return (
          <Lookup
            id={`${id}_lookuplist`}
            datasource={datasource}
            loading={datasource.loading}
            lookupAttributes={attributeArray}
            showSearch={showSearch}
            lookupHeading={lookupHeading}
            itemClick={this.itemClick}
            showCount={showCount}
            align='start'
            {...props}
          />
        );
      }
    };

    const button = (
      <Button
        id={`${id}_button`}
        label={i18n.lookupButton}
        onClick={() => this.openLookup(lookup)}
        disabled={readonly}
      />
    );

    return (
      <>
        <Label
          id={`${id}_label`}
          label={label}
          padding='none'
          theme='small'
          wrap={true}
          required={required}
        />
        <TagGroup
          id={`${id}_tagGroup1`}
          type={'gray'}
          align={'none'}
          tags={tags.length ? tags : null}
          wrap={true}
        ></TagGroup>
        {button}
      </>
    );
  }
}

StatefulLookupField.propTypes = {
  lookupHeading: PropTypes.string,
  options: PropTypes.array,
  selectionMode: PropTypes.number,
  readonly: PropTypes.bool,
  showCount: PropTypes.bool,
  showSearch: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  i18n: PropTypes.shape({
    lookupButton: PropTypes.string.isRequired
  })
};

StatefulLookupField.defaultProps = {
  lookupHeading: '',
  options: [],
  selectionMode: SelectModeEnum.SINGLE,
  readonly: false,
  showCount: false,
  showSearch: true,
  required: false,
  label: '',
  i18n: {
    lookupButton: 'Select'
  }
};

export default BaseComponent(StatefulLookupField, 'statefullookupfield');
