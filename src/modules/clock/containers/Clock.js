import React, { Component } from 'react';
import ClockComponent from '../components/Clock';

class Clock extends Component {
    render() {
        return (
            <ClockComponent { ...this.props } />
        );
    }
}

export default Clock;
