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
import {BaseComponent} from '@maximo/react-components';
import {log} from '@maximo/maximo-js-api';
import { Observer } from 'mobx-react';


const TAG = 'DisplayResults';

/**
 * This is a component to debug 
 * interaction and integration with inspections response fields 
 * datasource items
 */
class DisplayResults extends React.Component {
    render() {
        log.d(TAG, `Render`);

        const {results, updateDS} = this.props;
        const getNextChar = (text) => {
            const last = text.charCodeAt(text.length-1);
            const nextChar = last + 1;
            return String.fromCharCode(nextChar);
        }
        return (
            <fieldset>
                <legend>Results are</legend>
                <span>Size: {results.length}</span>
                {
                    results.map(item => 
                        <Observer key={item.inspfieldresultid}>{() => 
                            <div>
                            response: {item.txtresponse}, hasHref: {Boolean(item.href).toString()}   
                            <button onClick={(ev) => {
                                item.txtresponse = `${item.txtresponse}${getNextChar(item.txtresponse)}`;
                                updateDS();
                            }}>Add Next Letter</button>
                            </div>
                        }</Observer>
                    )
                }
            </fieldset>
        );
    }
}

DisplayResults.propTypes = {
    results: PropTypes.array,
    updateDS: PropTypes.func
};

// Set default props
DisplayResults.defaultProps = {
    results: [],
    updateDS: () => {}
};

DisplayResults.displayName = 'DisplayResults';

export default BaseComponent(DisplayResults, DisplayResults.displayName);
