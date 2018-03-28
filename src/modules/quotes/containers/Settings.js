import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';

const handleShowChange = (value, ev) =>
    Actions.setSetting({ showQuotes: value });

const handleFetchFromServerChange = (value, ev) =>
    Actions.setSetting({ fetchFromServer: value });

class SettingsContainer extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(), 0);
    }

    render() {
        const { showQuotes, fetchFromServer } = this.props;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Quotes" />
                <ListCheckbox
                    caption="Show Quotes"
                    legend="Show curated list of inspirational quotes."
                    checked={showQuotes}
                    onChange={handleShowChange} />
                <ListCheckbox
                    caption="Load Fresh"
                    legend="If disabled, it will cycle through a list of locally stored quotes only."
                    checked={fetchFromServer}
                    disabled={!showQuotes}
                    onChange={handleFetchFromServerChange} />
            </List>
        );
    }
}
export default ConnectedStoreHOC(SettingsContainer);
