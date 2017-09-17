import React, { Component } from 'react';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import * as Modules from '@modules';
import './Settings.css';

const moduleKeys = Object.keys(Modules);
const moduleKeysLastIndex = moduleKeys.length - 1;


// iterate and generate an array of module settings
// container separated by the `ListDivider`
// eg:
//  settingsContainerItems = [
//      <BackgroudSettings />
//      <ListDivider />
//      <ClockSettings />
//      <ListDivider />
//      <QuotesSettings />
//  ]
const settingsContainerItems = moduleKeys.reduce((arr, m, index) => {
    const module = Modules[m];
    const SettingsContainer = module.Settings;

    SettingsContainer && arr.push(<SettingsContainer key={ index } />);
    if (index !== moduleKeysLastIndex) {
        const dividerKey = `${index}-divider`;
        arr.push(<ListDivider key={ dividerKey } />);
    }

    return arr;
}, []);

class Settings extends Component {
    render() {
        return (
            <Layout>
                <Panel>
                    <List selectable ripple>
                        { settingsContainerItems }
                    </List>
                </Panel>
            </Layout>
        );
    }
}

export default Settings
