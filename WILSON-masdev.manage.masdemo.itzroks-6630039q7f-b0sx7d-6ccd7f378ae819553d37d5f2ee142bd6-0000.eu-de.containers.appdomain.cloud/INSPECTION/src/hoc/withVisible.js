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
const hocAttribute = 'visible';

/**
 * `withVisible` is a HOC to include auxiliary attribute to identify visible item and notify changes.
 */
function withVisible(WrappedComponent) {
    class WithVisible extends React.Component {

        constructor(props) {
            super(props);
            this.registerChangeCallback = this.registerChangeCallback.bind(this);
            this.registerInstance = this.registerInstance.bind(this);
            this.updateInstance = this.updateInstance.bind(this);
            this.invokeCallback = this.invokeCallback.bind(this);
            this.setValue = this.setValue.bind(this);
            this.state = { isVisible : true };
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
            if (value !== this.state.isVisible) {
                this.updateInstance(value);
                this.invokeCallback(value);
                this.setState({isVisible : value});
            }
        }

        render() {
            return <WrappedComponent 
                isVisible={this.state.isVisible} 
                setVisible={this.setValue}
                registerVisibleChangeCallback={this.registerChangeCallback} 
                registerVisibleInstance={this.registerInstance}
                {...this.props} />;
        }

    }

    WithVisible.displayName = `WithVisible(${getDisplayName(WrappedComponent)})`;
    return WithVisible;
}

export default withVisible;

/**
 * Returns the Display name for the given react element.
 *
 * @param {Element} WrappedComponent - React element from which to get the display name.
 */
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
