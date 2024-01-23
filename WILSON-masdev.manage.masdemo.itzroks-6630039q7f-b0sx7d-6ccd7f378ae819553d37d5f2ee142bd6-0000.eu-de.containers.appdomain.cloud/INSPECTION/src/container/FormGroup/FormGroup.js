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

import React from 'react';
import PropTypes from 'prop-types';
import {Observer} from 'mobx-react';
import {BaseComponent} from '@maximo/react-components';
import {log} from '@maximo/maximo-js-api';

import InspectionResult from '../../components/react/InspectionResult/InspectionResult';

const TAG = 'FormGroup';

class FormGroup extends React.PureComponent {

  render() {
    log.d(TAG, `Render ${TAG}`);

    const {items, id, ...passThroughProps} = this.props;
    const itemId = (prev, curId) => `${prev}_resultid${curId}`;

    return items.map(item => (
      <Observer key={item.inspectionresultid}>
        {() => (
          <InspectionResult
            {...passThroughProps}
            id={itemId(id, item.inspectionresultid)}
            key={item.inspectionresultid}
            inspection={item}
          />
        )}
      </Observer>
    ));
  }
}

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

// Set default props
FormGroup.defaultProps = {
  items: []
};

FormGroup.displayName = 'FormGroup';

export default BaseComponent(FormGroup, FormGroup.displayName);
