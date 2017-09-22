import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const RefreshIcon = () => (
    <div className="control__icon">
        <IconButton
            icon="refresh"
            inverse={ true }
            onClick={ Actions.refreshModules } />
    </div>
);

export default RefreshIcon;
