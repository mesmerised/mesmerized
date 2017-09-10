import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import Settings from '../settings';

class SettingsContainer extends Component {
    state = {
        showQuotes: Settings.showQuotes,
        fetchFromServer: Settings.fetchFromServer,
    };

    handleShowChange = (value, ev) => {
        Settings.showQuotes = value;
        this.setState({showQuotes : value});
    };

    handleFetchFromServerChange = (value, ev) => {
        Settings.fetchFromServer = value;
        this.setState({fetchFromServer : value});
    };

    render() {
        const { showQuotes, fetchFromServer } = this.state;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Quotes" />
                <ListCheckbox
                    caption="Show Quotes"
                    legend="Show curated list of inspirational quotes."
                    checked={ showQuotes }
                    onChange={ this.handleShowChange } />
                <ListCheckbox
                    caption="Load Fresh"
                    legend="If disabled, it will cycle through a list of locally stored quotes only."
                    checked={ fetchFromServer }
                    disabled={ !showQuotes }
                    onChange={ this.handleFetchFromServerChange } />
            </List>
        );
    }
}

export default SettingsContainer;
