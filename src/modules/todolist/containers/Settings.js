import React from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListItem from 'react-toolbox/lib/list/ListItem';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import { setSetting } from '../utils/actions';
import { PURGE_INTERVALS } from '../configs/constants';

const PURGE_INTERVAL_OPTIONS = [
    { value: PURGE_INTERVALS.THREE_DAYS, label: '3 Days' },
    { value: PURGE_INTERVALS.TWO_DAYS, label: '2 Days' },
    { value: PURGE_INTERVALS.ONE_DAY, label: '1 Day' },
];

const handlePurgeIntervalChange = (value, ev) =>
    setSetting({purgeInterval : parseInt(value, 10)});

const PurgeIntervalDropdown = ({ purgeInterval, className }) => (
    <Dropdown
        label="Duration"
        className={ className }
        value={ purgeInterval }
        source={ PURGE_INTERVAL_OPTIONS }
        onChange={ handlePurgeIntervalChange } />
);

const SettingsContainer = ({ purgeInterval }) => (
    <List selectable ripple>
        <ListSubHeader caption="Todo List" />
        <ListItem
            itemContent={
                <div>
                    <p className="settings__inlineItem">Keep completed items for</p>
                    <PurgeIntervalDropdown
                        className="settings__inlineItem"
                        purgeInterval={ purgeInterval } />
                </div>
                }
            ripple={ false }
            selectable={ false } />
    </List>
);

export default ConnectedStoreHOC(SettingsContainer);
