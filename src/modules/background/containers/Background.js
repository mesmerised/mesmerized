import React, { Component } from 'react';
import FullscreenImage from '../components/FullscreenImage';
import placeholderImage from '../images/placeholder.jpeg';
import { getPhotoUrl, getRandomPrefetchedPhoto, prefetchRandomPhotos } from '../api';

// @todo: make use of the dynamic imports
// to store the local images path in localStorage
// and later retrieve the path directly to be used
// as a fallback image for the selected category
/*
import categories from '../configs/categories.config';

Object.keys(categories).forEach(c => {
    import(`../images/categories/${c}.json`)
        .then(photos => {
            photos.forEach(p => {
                import(`../images/categories/${c}/${p.id}.jpg`)
                    .then(x => console.log('image path', x))
            });
        });
});
*/

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
