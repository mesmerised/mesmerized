import React, { Component } from 'react';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import { Settings as BackgroundSettings } from '@modules/background';
import { Settings as ClockSettings } from '@modules/clock';
import { Settings as QuotesSettings } from '@modules/quotes';
import { Settings as WeatherSettings } from '@modules/weather';
import './Settings.css';

class Settings extends Component {
    render() {
        return (
            <Layout>
                <Panel>
                    <List selectable ripple>
                        <BackgroundSettings />
                        <ListDivider />
                        <QuotesSettings />
                        <ListDivider />
                        <ClockSettings />
                        <ListDivider />
                        <WeatherSettings />
                    </List>
                </Panel>
            </Layout>
        );
    }
}

export default Settings
