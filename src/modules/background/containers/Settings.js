import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import Settings from '../utils/settings';

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
            <List selectable ripple>
                <ListSubHeader caption="Background Photos" />
                <ListCheckbox
                    caption="Load Fresh"
                    legend="If disabled, it will cycle through a list of locally stored wallpapers only."
                    checked={ fetchFromServer }
                    onChange={ this.handleChange } />
            </List>
        );
    }
}

export default SettingsContainer;
