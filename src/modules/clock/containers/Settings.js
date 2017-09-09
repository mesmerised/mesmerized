import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';
import Settings from '../settings';

class SettingsContainer extends Component {
    state = {
        tewelveHourFormat: Settings.tewelveHourFormat,
        blinkForSeconds: Settings.blinkForSeconds,
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
        const { tewelveHourFormat, blinkForSeconds } = this.state;

        return (
            <div>
                <div>Clock</div>
                <Switch
                    checked={ tewelveHourFormat }
                    label="12hr Format"
                    onChange={ this.handleHourFormatChange } />
                <Switch
                    checked={ blinkForSeconds }
                    label="Blink For Seconds"
                    onChange={ this.handleBlinkChange } />
            </div>
        );
    }
}

export default SettingsContainer;
