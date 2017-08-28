import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';

const openSettingsPage = () => chrome.runtime.openOptionsPage();

const SettingsIcon = () => (
    <IconButton
        icon="settings"
        onClick={ openSettingsPage } />
);

export default SettingsIcon;
