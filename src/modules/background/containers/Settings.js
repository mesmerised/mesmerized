import React from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import { setSetting } from '../utils/actions';

const handleFetchFromServerChange = (value, ev) =>
    setSetting({fetchFromServer: value});

const SettingsContainer = ({ fetchFromServer }) => (
    <List selectable ripple>
        <ListSubHeader caption="Background Photos" />
        <ListCheckbox
            caption="Load Fresh"
            legend="If disabled, it will cycle through a list of locally stored wallpapers only."
            checked={ fetchFromServer }
            onChange={ handleFetchFromServerChange } />
    </List>
);

export default ConnectedStoreHOC(SettingsContainer);
