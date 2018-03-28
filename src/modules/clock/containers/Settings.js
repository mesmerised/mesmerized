import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';

const handleShowClockChange = (value, ev) =>
    Actions.setSetting({ showClock: value });

const handleShowDateChange = (value, ev) =>
    Actions.setSetting({ showDate: value });

const handleHourFormatChange = (value, ev) =>
    Actions.setSetting({ tewelveHourFormat: value });

const handleBlinkChange = (value, ev) =>
    Actions.setSetting({ blinkForSeconds: value });

class SettingsContainer extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(), 0);
    }

    render() {
        const {
            showClock,
            tewelveHourFormat,
            blinkForSeconds,
            showDate
        } = this.props;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Clock" />
                <ListCheckbox
                    caption="Show Clock"
                    legend="Show the clock with date in the center of the screen."
                    checked={showClock}
                    onChange={handleShowClockChange} />
                <ListCheckbox
                    caption="Show Date"
                    legend="Show the date below the clock."
                    checked={showDate}
                    disabled={!showClock}
                    onChange={handleShowDateChange} />
                <ListCheckbox
                    caption="12hr"
                    legend="Show the 12 hour format for the clock."
                    checked={tewelveHourFormat}
                    disabled={!showClock}
                    onChange={handleHourFormatChange} />
                <ListCheckbox
                    caption="Blink"
                    legend="Blink the center divider every second."
                    checked={blinkForSeconds}
                    disabled={!showClock}
                    onChange={handleBlinkChange} />
            </List>
        );
    }
}

export default ConnectedStoreHOC(SettingsContainer);
