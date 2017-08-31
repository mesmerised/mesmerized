import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';
import Settings from '../settings';

// @todo add tootip info icon
// to explain the each individual

class SettingsContainer extends Component {
    state = {
        fetchFromServer: Settings.fetchFromServer
    };

    handleChange = (value, ev) => {
        Settings.fetchFromServer = value;
        this.setState({fetchFromServer : value});
    };

    render() {
        const { fetchFromServer } = this.state;

        return (
            <Switch
                checked={ fetchFromServer }
                label="Fresh Backgrounds"
                onChange={ this.handleChange }
            />
        );
    }
}

export default SettingsContainer;
