import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';

const openSettingsPage = () => chrome.runtime.openOptionsPage();

const SettingsIcon = () => (
    <div className="controlIcon">
        <IconButton
            icon="settings"
            onClick={ openSettingsPage } />
    </div>
);

export default SettingsIcon;
