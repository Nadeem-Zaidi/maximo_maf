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

// Default attribute name
const hocAttribute = 'filtered';

/**
 * `withFiltered` is a HOC to include auxiliary attribute to identify filtered item and notify changes.
 */
function withFiltered(WrappedComponent) {
    class WithFiltered extends React.Component {

        constructor(props) {
            super(props);
            this.registerChangeCallback = this.registerChangeCallback.bind(this);
            this.registerInstance = this.registerInstance.bind(this);
            this.updateInstance = this.updateInstance.bind(this);
            this.invokeCallback = this.invokeCallback.bind(this);
            this.setValue = this.setValue.bind(this);
            this.state = { isFiltered : true };
        }

        /**
         * Register callback to executed when state mutates
         * @param {Function} - callback
         */
        registerChangeCallback(cb) {
            this.changeCallback = cb;
        }

        /**
         * Register member to perform updates
         * @param {Object} object 
         * @param {String} attribute attribute name
         */
        registerInstance(object, attribute = hocAttribute) {
            this.object = object;
            this.attributeName = attribute;
            if (attribute in object) {
                this.setValue(object[attribute]);
            }
        }

        /**
         * Set value to registered member
         * @param {Boolean} value 
         */
        updateInstance(value) {
            if (this.object) {
                this.object[this.attributeName] = value;
            }
        }

        /**
         * Execute callback registered
         * @param {Boolean} state 
         */
        invokeCallback(state) {
            if (typeof this.changeCallback === "function") {
                this.changeCallback(state);
            }
        }

        /**
         * Update state and value from member attribute
         * @param {Boolean} value 
         */
        setValue(value) {
            if (value !== this.state.isFiltered) {
                this.updateInstance(value);
                this.invokeCallback(value);
                this.setState({isFiltered : value});
            }
        }

        render() {
            return <WrappedComponent 
                isFiltered={this.state.isFiltered} 
                setFiltered={this.setValue}
                registerFilteredChangeCallback={this.registerChangeCallback} 
                registerFilteredInstance={this.registerInstance}
                {...this.props} />;
        }

    }

    WithFiltered.displayName = `WithFiltered(${getDisplayName(WrappedComponent)})`;
    return WithFiltered;
}

export default withFiltered;

/**
 * Returns the Display name for the given react element.
 *
 * @param {Element} WrappedComponent - React element from which to get the display name.
 */
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
