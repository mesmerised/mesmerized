import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';
import { getPhotoUrl, getRandomPrefetchedPhoto, prefetchRandomPhotos } from '../api';

// @todo: use local photos if nothing is available
const photoUrl = getPhotoUrl(getRandomPrefetchedPhoto()) || placeholderImage;

// @todo: update api credits
// @todo: configurable category settings

class Background extends Component {
    componentDidMount() {
        prefetchRandomPhotos();
    }

    render() {
        return (
            <FullscreenImage
                src={ photoUrl }
                placeholder={ placeholderImage }
                timeout={ 1500 } />
        );
    }
}

export default Background;
