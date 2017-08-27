import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';

class Background extends Component {
    render() {
        return (
            <FullscreenImage src="https://unsplash.it/2048/1280?random" />
        );
    }
}

export default Background;
