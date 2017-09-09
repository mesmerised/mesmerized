import React, { Component } from 'react';
import ClockComponent from '../components/Clock';
import Settings from '../settings';

class Clock extends Component {
    render() {
        const props = {
            is12hours: Settings.tewelveHourFormat,
            blinkForSeconds: Settings.blinkForSeconds,
        };
        return (
            <ClockComponent { ...props } />
        );
    }
}

export default Clock;
