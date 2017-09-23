import React from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import { setSetting } from '../utils/actions';

const handleShowClockChange = (value, ev) =>
    setSetting({showClock : value});

const handleShowDateChange = (value, ev) =>
    setSetting({showDate : value});

const handleHourFormatChange = (value, ev) =>
    setSetting({tewelveHourFormat : value});

const handleBlinkChange = (value, ev) =>
    setSetting({blinkForSeconds : value});

const SettingsContainer = ({ showClock, tewelveHourFormat, blinkForSeconds, showDate}) => (
    <List selectable ripple>
        <ListSubHeader caption="Clock" />
        <ListCheckbox
            caption="Show Clock"
            legend="Show the clock with date in the center of the screen."
            checked={ showClock }
            onChange={ handleShowClockChange } />
        <ListCheckbox
            caption="Show Date"
            legend="Show the date below the clock."
            checked={ showDate }
            disabled={ !showClock }
            onChange={ handleShowDateChange } />
        <ListCheckbox
            caption="12hr"
            legend="Show the 12 hour format for the clock."
            checked={ tewelveHourFormat }
            disabled={ !showClock }
            onChange={ handleHourFormatChange } />
        <ListCheckbox
            caption="Blink"
            legend="Blink the center divider every second."
            checked={ blinkForSeconds }
            disabled={ !showClock }
            onChange={ handleBlinkChange } />
    </List>
);

export default ConnectedStoreHOC(SettingsContainer);
