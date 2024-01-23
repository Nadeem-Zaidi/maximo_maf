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
const hocAttribute = 'required';

/**
 * `withRequired` is a HOC to include auxiliary attribute to identify required item and notify changes.
 */
function withRequired(WrappedComponent) {
    class WithRequired extends React.Component {

        constructor(props) {
            super(props);
            this.registerChangeCallback = this.registerChangeCallback.bind(this);
            this.registerInstance = this.registerInstance.bind(this);
            this.updateInstance = this.updateInstance.bind(this);
            this.invokeCallback = this.invokeCallback.bind(this);
            this.setValue = this.setValue.bind(this);
            this.state = { isRequired : false };
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
            if (value !== this.state.isRequired) {
                this.updateInstance(value);
                this.invokeCallback(value);
                this.setState({isRequired : value});
            }
        }

        render() {
            return <WrappedComponent 
                isRequired={this.state.isRequired} 
                setRequired={this.setValue}
                registerRequiredChangeCallback={this.registerChangeCallback} 
                registerRequiredInstance={this.registerInstance}
                {...this.props} />;
        }

    }

    WithRequired.displayName = `WithRequired(${getDisplayName(WrappedComponent)})`;
    return WithRequired;
}

export default withRequired;

/**
 * Returns the Display name for the given react element.
 *
 * @param {Element} WrappedComponent - React element from which to get the display name.
 */
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
