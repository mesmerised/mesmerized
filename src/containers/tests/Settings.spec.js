import React from 'react';
import ReactDOM from 'react-dom';
import SettingsContainer from '../Settings';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SettingsContainer />, div);
});
