import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Modules from '@modules';

// generate a list of all refresh functions
// for each of the module
const moduleKeys = Object.keys(Modules);
const refreshFunctions = moduleKeys.reduce((arr, m) => {
    const module = Modules[m];
    const refreshFn = module.refresh;

    refreshFn && arr.push(refreshFn);

    return arr;
}, []);

const refreshModules = () => refreshFunctions.forEach(fn => fn());

const RefreshIcon = () => (
    <div className="control__icon">
        <IconButton
            icon="refresh"
            inverse={ true }
            onClick={ refreshModules } />
    </div>
);

export default RefreshIcon;
