import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ListItem from 'react-toolbox/lib/list/ListItem';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import { METRIC } from '../configs/constants';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';

const REFRESH_INTERVALS = [
    { value: 30 * 60 * 1000, label: '30 mins' },
    { value: 45 * 60 * 1000, label: '45 mins' },
    { value: 60 * 60 * 1000, label: '1 hr' },
    { value: 120 * 60 * 1000, label: '2 hrs' },
];

const handleShowChange = (value, ev) =>
    Actions.setSetting({ showWeather: value });

const handleUnitChange = (value, ev) =>
    Actions.setSetting({ unit: value });

const handleRefreshIntervallChange = (value, ev) =>
    Actions.setSetting({ refreshInterval: parseInt(value, 10) });

const UnitsComponent = ({ className, unit, showWeather }) => (
    <RadioGroup
        className={className}
        value={unit}
        disabled={!showWeather}
        onChange={handleUnitChange} >

        <RadioButton
            className="settings__inlineItem"
            label="Celsius"
            value={METRIC.CELSIUS} />
        <RadioButton
            className="settings__inlineItem"
            label="Fahrenheit"
            value={METRIC.FAHRENHEIT} />

    </RadioGroup>
);

const RefreshIntervalDropdown = ({ className, refreshInterval, showWeather }) => (
    <Dropdown
        className={className}
        label="Refresh Interval"
        value={refreshInterval}
        source={REFRESH_INTERVALS}
        disabled={!showWeather}
        onChange={handleRefreshIntervallChange} />
);

class SettingsContainer extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(false), 0);
    }

    render() {
        const { showWeather, unit, refreshInterval } = this.props;

        return (
            <List selectable ripple>
                <ListSubHeader caption="Weather" />
                <ListCheckbox
                    caption="Show Weather"
                    legend="Show the weather widget."
                    checked={showWeather}
                    onChange={handleShowChange} />
                <ListItem
                    itemContent={
                        <div>
                            <UnitsComponent
                                className="settings__inlineItem"
                                unit={unit}
                                showWeather={showWeather} />
                            <RefreshIntervalDropdown
                                className="settings__inlineItem"
                                refreshInterval={refreshInterval}
                                showWeather={showWeather} />
                        </div>
                    }
                    ripple={false}
                    selectable={false} />
            </List>
        );
    }
}

export default ConnectedStoreHOC(SettingsContainer);
