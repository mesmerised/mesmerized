import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ListItem from 'react-toolbox/lib/list/ListItem';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';
import { NEW_PHOTO_DURATIONS } from '../configs/constants';

const NEW_PHOTO_INTERVAL_OPTIONS = [
    { value: NEW_PHOTO_DURATIONS.ALWAYS, label: 'Always' },
    { value: NEW_PHOTO_DURATIONS.HOURLY, label: 'Hourly' },
    { value: NEW_PHOTO_DURATIONS.DAILY, label: 'Daily' },
];

const handleFetchFromServerChange = (value, ev) =>
    Actions.setSetting({ fetchFromServer: value });

const handleNewPhotoIntervalChange = (value, ev) =>
    Actions.setSetting({ newPhotoDuration: parseInt(value, 10) });

const NewPhotoIntervalDropdown = ({ refreshInterval, className }) => (
    <Dropdown
        label="Duration"
        className={className}
        value={refreshInterval}
        source={NEW_PHOTO_INTERVAL_OPTIONS}
        onChange={handleNewPhotoIntervalChange} />
);

class SettingsContainer extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(false), 0);
    }

    render() {
        const { fetchFromServer, newPhotoDuration } = this.props;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Background Photos" />
                <ListCheckbox
                    caption="Load Fresh"
                    legend="If disabled, it will cycle through a list of locally stored wallpapers only."
                    checked={fetchFromServer}
                    onChange={handleFetchFromServerChange} />
                <ListItem
                    itemContent={
                        <div>
                            <p className="settings__inlineItem">Show new photo</p>
                            <NewPhotoIntervalDropdown
                                className="settings__inlineItem"
                                refreshInterval={newPhotoDuration} />
                        </div>
                    }
                    ripple={false}
                    selectable={false} />
            </List>);
    }
}

export default ConnectedStoreHOC(SettingsContainer);
