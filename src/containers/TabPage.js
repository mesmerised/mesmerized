import React, { Component } from 'react';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import { Container as BackgroundContainer } from '@modules/background';
import { Container as QuotesContainer } from '@modules/quotes';
import SettingsIcon from '@components/SettingsIcon';

class TabPage extends Component {
    render() {
        return (
            <Layout>
                <BackgroundContainer />
                <Panel>
                    <SettingsIcon />
                    <QuotesContainer />
                </Panel>
            </Layout>
        );
    }
}

export default TabPage;
