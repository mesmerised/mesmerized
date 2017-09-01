import React from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import IconButton from 'react-toolbox/lib/button/IconButton';

const IconButtonTooltip = Tooltip(IconButton);
const openSettingsPage = () => chrome.runtime.openOptionsPage();

const SettingsIcon = () => (
    <IconButtonTooltip
        tooltip="Settings"
        icon="settings"
        onClick={ openSettingsPage } />
);

export default SettingsIcon;
