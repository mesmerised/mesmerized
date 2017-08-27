import React from 'react';
import ReactDOM from 'react-dom';
import TabPageContainer from '../TabPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TabPageContainer />, div);
});
