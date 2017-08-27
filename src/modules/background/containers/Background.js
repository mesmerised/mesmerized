import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';

class Background extends Component {
    render() {
        return (
            <FullscreenImage
                src="https://unsplash.it/2048/1280?random"
                placeholder={ placeholderImage }
                timeout={ 2000 } />
        );
    }
}

export default Background;
