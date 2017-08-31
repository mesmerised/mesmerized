import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';
import { getPhotoUrl, getRandomPrefetchedPhoto, prefetchRandomPhotos } from '../api';
import { getLocalPhotoPath, getRandomLocalPhoto } from '../photos.local';
import Settings from '../settings';

let photoUrl;

// if allowed to fetch from server
// begin with assuming we get a
// prefetched photo from the api
if (Settings.fetchFromServer) {
    photoUrl = getPhotoUrl(getRandomPrefetchedPhoto());
}

// prefetched api photo
// or a locally stored photo
// or a fallback placeholder photo
photoUrl = photoUrl
    || getLocalPhotoPath(getRandomLocalPhoto())
    || placeholderImage;

// @todo: update api credits

class Background extends Component {
    componentDidMount() {
        // start prefetching if configured in settings
        Settings.fetchFromServer && prefetchRandomPhotos();
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
