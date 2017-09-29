import React from 'react';
import './assets/react-toolbox/theme.css';
import './assets/styles/base.css';
import theme from './assets/react-toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

const App = ({ children }) => (
    <ThemeProvider theme={ theme }>
        {children}
    </ThemeProvider>
);

export default App;
