import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';
import { getPhotoUrl, getRandomPrefetchedPhoto, prefetchRandomPhotos } from '../api';
import { getLocalPhotoPath, getRandomLocalPhoto } from '../photos.local';

// prefetched api photo
// or a locally stored photo
// or a fallback placeholder photo
const photoUrl = getPhotoUrl(getRandomPrefetchedPhoto())
    || getLocalPhotoPath(getRandomLocalPhoto())
    || placeholderImage;

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
