import React, { Component } from 'react';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import { Settings as BackgroundSettings } from '@modules/background';

class Settings extends Component {
    render() {
        return (
            <Layout>
                <Panel>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        <section>
                            <BackgroundSettings />
                        </section>
                    </div>
                </Panel>
            </Layout>
        );
    }
}

export default Settings
