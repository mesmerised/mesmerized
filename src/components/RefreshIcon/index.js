import React from 'react';
import MdRefresh from 'react-icons/lib/md/refresh';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const RefreshIcon = () => (
    <div className="control__icon">
        <IconButton
            icon={ <MdRefresh /> }
            inverse={ true }
            onClick={ Actions.refreshModules } />
    </div>
);

export default RefreshIcon;
