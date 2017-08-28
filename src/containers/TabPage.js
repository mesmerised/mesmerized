import React, { Component } from 'react';
import Layout from 'react-toolbox/lib/layout/Layout';
import { Container as BackgroundContainer } from '@modules/background';
import SettingsIcon from '@components/SettingsIcon';

class TabPage extends Component {
    render() {
        return (
            <Layout>
                <BackgroundContainer />
                <SettingsIcon />
            </Layout>
        );
    }
}

export default TabPage;
