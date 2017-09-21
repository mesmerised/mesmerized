import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';

const openSettingsPage = () => chrome.runtime.openOptionsPage();

const SettingsIcon = () => (
    <div className="control__icon">
        <IconButton
            icon="settings"
            inverse={ true }
            onClick={ openSettingsPage } />
    </div>
);

export default SettingsIcon;
