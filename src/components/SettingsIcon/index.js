import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const SettingsIcon = () => (
    <div className="control__icon">
        <IconButton
            icon="settings"
            inverse={ true }
            onClick={ Actions.openSettingsPage } />
    </div>
);

export default SettingsIcon;
