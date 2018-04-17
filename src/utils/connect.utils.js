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

        state = { data: store.state };

        componentDidMount() {
            this._unsubscribe = store.subscribe(newState => {
                this.setState({ data: newState });
            });

            // handle cases where values could
            // have changed between render and mount
            if (this.state.data !== store.state) {
                this.setState({ data: store.state });
            }
        }

        componentWillUnmount() {
            this._unsubscribe && this._unsubscribe();
        }

        render() {
            return (
                <WrappedComponent {...this.props} {...this.state.data} />
            );
        }
    }
}
