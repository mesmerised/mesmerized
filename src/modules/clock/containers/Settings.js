import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import Settings from '../settings';

class SettingsContainer extends Component {
    state = {
        showClock: Settings.showClock,
        tewelveHourFormat: Settings.tewelveHourFormat,
        blinkForSeconds: Settings.blinkForSeconds,
    };

    handleShowClockChange = (value, ev) => {
        Settings.showClock = value;
        this.setState({showClock : value});
    };

    handleHourFormatChange = (value, ev) => {
        Settings.tewelveHourFormat = value;
        this.setState({tewelveHourFormat : value});
    };

    handleBlinkChange = (value, ev) => {
        Settings.blinkForSeconds = value;
        this.setState({blinkForSeconds : value});
    };

    render() {
        const { showClock, tewelveHourFormat, blinkForSeconds } = this.state;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Clock" />
                <ListCheckbox
                    caption="Show Clock"
                    legend="Show the clock in the center of the screen."
                    checked={ showClock }
                    onChange={ this.handleShowClockChange } />
                <ListCheckbox
                    caption="12hr"
                    legend="Show the 12 hour format for the clock."
                    checked={ tewelveHourFormat }
                    disabled={ !showClock }
                    onChange={ this.handleHourFormatChange } />
                <ListCheckbox
                    caption="Blink"
                    legend="Blink the center divider every second."
                    checked={ blinkForSeconds }
                    disabled={ !showClock }
                    onChange={ this.handleBlinkChange } />
            </List>
        );
    }
}

export default SettingsContainer;
