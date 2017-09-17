import React, { Component } from 'react';
import ClockComponent from '../components/Clock';
import Store from '../utils/store';

class Clock extends Component {
    state = Store.state;

    componentWillMount() {
        this.unsubscribe = Store.subscribe(newState => {
            this.setState(newState);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { is12hours, blinkForSeconds, showClock } = this.state;
        const props = { is12hours, blinkForSeconds };

        return (
            showClock && <ClockComponent { ...props } />
        );
    }
}

export default Clock;
