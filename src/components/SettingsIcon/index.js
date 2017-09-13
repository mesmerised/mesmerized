import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import './style.css';

const openSettingsPage = () => chrome.runtime.openOptionsPage();

const SettingsIcon = () => (
    <div className="settingsIcon">
        <IconButton
            icon="settings"
            onClick={ openSettingsPage } />
    </div>
);

export default SettingsIcon;
