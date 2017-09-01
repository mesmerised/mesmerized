import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';
import Tooltip from 'react-toolbox/lib/tooltip';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import Settings from '../settings';
import './Settings.css';

const FontIconTooltip = Tooltip(FontIcon);
const HelpIcon = ( { className = '' } ) => (
    <FontIconTooltip
        className={ className }
        value="help"
        tooltipPosition="right"
        tooltip="Load fresh wallpapers from the server. If disabled, it will cycle through a list of local wallpapers only."
    />
);

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
            <div className="settingsOption">
                <Switch
                    className="settingsOption__option"
                    checked={ fetchFromServer }
                    label="Fresh Backgrounds"
                    onChange={ this.handleChange } />
                <HelpIcon className="settingsOption__helpIcon"/>
            </div>
        );
    }
}

export default SettingsContainer;
