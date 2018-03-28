import React, { Component } from 'react';
import ClockComponent from '../components/Clock';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';

class ClockContainer extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(), 0);
    }

    render() {
        const {
            tewelveHourFormat,
            blinkForSeconds,
            showDate,
            showClock
        } = this.props;
        const props = { tewelveHourFormat, blinkForSeconds, showDate };

        if (!showClock) return null;

        return (
            showClock && <ClockComponent {...props} />
        );
    }
}

export default ConnectedStoreHOC(ClockContainer);
