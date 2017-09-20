import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import Settings from '../utils/settings';

class SettingsContainer extends Component {
    state = {
        showClock: Settings.showClock,
        tewelveHourFormat: Settings.tewelveHourFormat,
        blinkForSeconds: Settings.blinkForSeconds,
        showDate: Settings.showDate,
    };

    handleShowClockChange = (value, ev) => {
        Settings.showClock = value;
        this.setState({showClock : value});
    };

    handleShowDateChange = (value, ev) => {
        Settings.showDate = value;
        this.setState({showDate : value});
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
        const {
            showClock,
            showDate,
            tewelveHourFormat,
            blinkForSeconds
        } = this.state;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Clock" />
                <ListCheckbox
                    caption="Show Clock"
                    legend="Show the clock with date in the center of the screen."
                    checked={ showClock }
                    onChange={ this.handleShowClockChange } />
                <ListCheckbox
                    caption="Show Date"
                    legend="Show the date below the clock."
                    checked={ showDate }
                    disabled={ !showClock }
                    onChange={ this.handleShowDateChange } />
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
