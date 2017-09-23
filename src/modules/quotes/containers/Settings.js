import React from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import { setSetting } from '../utils/actions';

const handleShowChange = (value, ev) =>
    setSetting({showQuotes : value});

const handleFetchFromServerChange = (value, ev) =>
    setSetting({fetchFromServer : value});

const SettingsContainer = ({ showQuotes, fetchFromServer }) => (
    <List selectable ripple>
        <ListSubHeader caption="Quotes" />
        <ListCheckbox
            caption="Show Quotes"
            legend="Show curated list of inspirational quotes."
            checked={ showQuotes }
            onChange={ handleShowChange } />
        <ListCheckbox
            caption="Load Fresh"
            legend="If disabled, it will cycle through a list of locally stored quotes only."
            checked={ fetchFromServer }
            disabled={ !showQuotes }
            onChange={ handleFetchFromServerChange } />
    </List>
);

export default ConnectedStoreHOC(SettingsContainer);
