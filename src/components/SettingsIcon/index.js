import React from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import IconButton from 'react-toolbox/lib/button/IconButton';
import './style.css';

const IconButtonTooltip = Tooltip(IconButton);
const openSettingsPage = () => chrome.runtime.openOptionsPage();

const SettingsIcon = () => (
    <div className="settingsIcon">
        <IconButtonTooltip
            tooltip="Settings"
            icon="settings"
            onClick={ openSettingsPage } />
    </div>
);

export default SettingsIcon;
