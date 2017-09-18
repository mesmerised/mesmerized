import React, { Component } from 'react';

/**
 * Gets display name of the component.
 *
 * @param  {Component} WrappedComponent     React component
 * @return {String}                         Component name
 */
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component';
}

/**
 * Connects the store to the React component.
 *
 * @example
 *     const Comp = connect(store)(MyComponent);
 *
 * @param  {Object} store      Store instance
 * @return {Function}          HOC factory function
 */
export const connect = (store) => (WrappedComponent) => {
    return class ConnectedComponent extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        state = store.state;

        componentWillMount() {
            this.unsubscribe = store.subscribe(newState => {
                this.setState(newState);
            });
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent { ...this.props } { ...this.state } />
            );
        }
    }
}
