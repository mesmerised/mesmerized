import React from 'react';
import MdSettings from 'react-icons/lib/md/settings';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const SettingsIcon = () => (
    <div className="control__icon">
        <IconButton
            icon={ <MdSettings /> }
            inverse={ true }
            onClick={ Actions.openSettingsPage } />
    </div>
);

export default SettingsIcon;
