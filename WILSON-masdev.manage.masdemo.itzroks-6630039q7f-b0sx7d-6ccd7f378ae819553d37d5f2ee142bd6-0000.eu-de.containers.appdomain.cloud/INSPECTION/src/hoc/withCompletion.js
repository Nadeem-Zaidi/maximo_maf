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
const completeAttribute = 'completed';

/**
 * `withCompletion` is a HOC to include auxiliary attribute to identify completion and notify changes.
 */
function withCompletion(WrappedComponent) {
    class WithCompletion extends React.Component {

        constructor(props) {
            super(props);
            this.registerChangeHandler = this.registerChangeHandler.bind(this);
            this.registerInstance = this.registerInstance.bind(this);
            this.updateInstance = this.updateInstance.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.setCompletion = this.setCompletion.bind(this);
            this.state = { isComplete : false };
        }

        /**
         * Register callback to executed when state mutates
         * @param {Function} - callback
         */
        registerChangeHandler(cb) {
            this.changeHandler = cb;
        }

        /**
         * Register member to perform updates
         * @param {Object} object 
         * @param {String} attribute attribute name
         */
        registerInstance(object, attribute = completeAttribute) {
            this.object = object;
            this.completeAttribute = attribute;
            if (attribute in object) {
                this.setCompletion(object[attribute]);
            }
        }

        /**
         * Set value to registered member
         * @param {Boolean} value 
         */
        updateInstance(value) {
            if (this.object) {
                this.object[this.completeAttribute] = value;
            }
        }

        /**
         * Execute callback registered
         * @param {Boolean} state 
         */
        handleChange(state) {
            if (typeof this.changeHandler === "function") {
                this.changeHandler(state);
            }
        }

        /**
         * Update state and value from member attribute
         * @param {Boolean} value 
         */
        setCompletion(value) {
            
            this.setState(state => {
                if (value !== state.isComplete) {
                  this.updateInstance(value);
                  this.handleChange(value);
                  return {isComplete: value};
                }
              });
        }

        render() {
            return <WrappedComponent 
                isComplete={this.state.isComplete} 
                setCompletion={this.setCompletion}
                registerChangeHandler={this.registerChangeHandler} 
                registerInstance={this.registerInstance}
                {...this.props} />;
        }

    }

    WithCompletion.displayName = `WithCompletion(${getDisplayName(WrappedComponent)})`;
    return WithCompletion;
}

export default withCompletion;

/**
 * Returns the Display name for the given react element.
 *
 * @param {Element} WrappedComponent - React element from which to get the display name.
 */
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
