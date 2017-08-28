import React, { Component } from 'react';

import Layout from 'react-toolbox/lib/layout/Layout';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';

class Settings extends Component {
    state = {
        drawerActive : false
    };

    toggleDrawerActive = () => {
        this.setState({drawerActive: !this.state.drawerActive});
    };

    render() {
        return (
            <Layout>
                <NavDrawer
                    active={ this.state.drawerActive }
                    onOverlayClick={ this.toggleDrawerActive } >
                    Different Settings Navigation would go here
                </NavDrawer>
                <Panel>
                    <AppBar leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } />
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        Settings Page
                    </div>
                </Panel>
            </Layout>
        );
    }
}

export default Settings
