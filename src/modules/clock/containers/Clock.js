import React, { Component } from 'react';
import ClockComponent from '../components/Clock';
import Settings from '../settings';

class Clock extends Component {
    state = {
        is12hours: Settings.tewelveHourFormat,
        blinkForSeconds: Settings.blinkForSeconds,
        showClock: Settings.showClock,
    };

    render() {
        const { is12hours, blinkForSeconds, showClock } = this.state;
        const props = { is12hours, blinkForSeconds };

        return (
            showClock && <ClockComponent { ...props } />
        );
    }
}

export default Clock;
